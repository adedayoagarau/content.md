# 082. Booking.com

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Accommodation OTA / multi-vertical travel marketplace (stays, flights, cars, taxis, attractions) |
| Primary URL | https://www.booking.com/ |
| Corpus rank | 082 |
| Benchmark strength (source list) | Dense decision and availability content |
| Locale / market observed | en-US (consumer), en-US / en-GB (partner) |
| Platform observed | Web (desktop) consumer storefronts; Partner Hub (partner.booking.com) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not directly observed in the harvested copy. The consumer terms page (`/content/terms.html`) was retrieved but exceeded the analysis budget and was **not read**, so no regulatory or disclosure claims are made from it. |
| Harvest date | 2026-09-21 |
| Pages inspected | 20 attempted / 10 usable |
| Harvest completeness | **Partial — consumer host substantially degraded.** `www.booking.com` returns heavily stripped text: headings, FAQ question labels and, critically, **the brand token "Booking.com" itself are removed from the extracted body**, producing broken sentences. Eleven consumer URLs returned empty. `partner.booking.com` is fully readable and carries the richest policy content, so the partner side is over-represented in this file relative to the consumer side. Treat all consumer-side quotes with the caveat in T14. |

## Pages inspected

| Label | URL | Result |
|---|---|---|
| Homepage | https://www.booking.com/ | **Degraded** — only carousel/banner strings survived |
| Customer Service | https://www.booking.com/customer-service.html | **Partial** — eight FAQ *answers* extracted; the questions were stripped |
| Genius loyalty | https://www.booking.com/genius.html | Partial — tier names and benefit lines survived |
| Car rentals storefront | https://www.booking.com/cars/index.html | **Good** — full FAQ answers, trust bar, price-inclusion copy |
| Airport taxis storefront | https://www.booking.com/taxi/index.html | Good — three-benefit block, three-step flow, vehicle-card labels |
| Attractions storefront | https://www.booking.com/attractions/index.html | Partial — three-benefit block only |
| Consumer terms | https://www.booking.com/content/terms.html | Retrieved but oversized; **not read** — no claims made from it |
| Partner Hub home | https://partner.booking.com/en-gb/help | Partial — "Featured articles" / "Browse by topic" scaffolding only |
| Setting up cancellation policies | https://partner.booking.com/en-us/help/policies-payments/policies/setting-cancellation-policies | **Full** |
| Cancellation, deposit, and prepayment policies | https://partner.booking.com/en-us/solutions/cancellation-deposit-and-prepayment-policies | **Full** — the richest single source in this file |
| Handling cancellation fees and commission | https://partner.booking.com/en-us/help/reservations/reduce-cancellations/handling-cancellation-fees-and-commission | **Full** |
| Setting up a non-refundable rate | https://partner.booking.com/en-us/help/rates-availability/rates-special-offers/setting-non-refundable-rate | **Full** |
| Can [we] help me with an overbooking? | https://partner.booking.com/en-us/help/reservations/overbookings-no-shows/can-bookingcom-help-me-overbooking | **Full** |
| Help centre (secure host) | https://secure.booking.com/help.html | Empty |
| Help content (en-GB) | https://www.booking.com/content/help.en-gb.html | Empty |
| About | https://www.booking.com/content/about.html | Empty |
| How we work | https://www.booking.com/general.html?tmpl=docs/how_we_work | Empty |
| Third-party-inventory FAQ | https://www.booking.com/tpi_faq.html | Empty |
| Accessibility | https://www.booking.com/accessibility.html | Empty (URL guessed; may not exist) |
| Reviews | https://www.booking.com/reviews.html | Empty (URL guessed; may not exist) |
| Trips | https://www.booking.com/trip/index.html | Empty |
| Partner: reservations topic | https://partner.booking.com/en-gb/help/reservations | Empty |
| Partner: guest cancellation requests | https://partner.booking.com/en-us/help/reservations/reduce-cancellations/handling-cancellations-and-guest-cancellation-requests | Empty |
| Partner: double-bookings | https://partner.booking.com/en-us/help/reservations/overbookings-no-shows/all-you-need-know-about-double-bookings | Empty |

---

## T1 Navigation & IA labels

**Consumer vertical set** `[observed]`, reconstructed from the reachable
storefront URLs and their own self-references: Stays · Flights · Car rentals ·
Airport taxis · Attractions. Each is a separate `index.html` under a vertical
path (`/cars/`, `/taxi/`, `/attractions/`, `/flights/`), which is an IA fact in
itself — the verticals are separate storefronts sharing a header, not tabs on one
search surface.

> **Caveat:** the consumer global nav did not survive extraction. The vertical
> names above are taken from page titles and body copy
> (`Car rentals for any kind of trip`, `Attractions, activities, and experiences`,
> `Airport transportation made easy`), not from the nav component itself.

**Customer Service page IA** `[observed]` — four routes, each a card with a
one-line scope statement. This is the most complete consumer IA artefact that
survived:

| Route | Scope line (verbatim) |
|---|---|
| `Send us a message` | "Contact our agents about your booking, and we'll reply as soon as possible." |
| `Call us` | "For anything urgent, you can call us 24/7 at a local or international phone number." |
| `Contact the property` | "For details about your stay, they usually know best." |
| `Our Help Center` | (no scope line) |

Two things to steal. First, **the property is offered as a peer channel to
Booking's own agents**, not as a fallback — and its scope line concedes
superiority on a defined class of question: "For details about your stay, they
usually know best." An OTA telling the user that the supplier is the better
contact for most of their questions is commercially costly and editorially
honest. Second, the routes are **triaged by urgency and by question type**, not
by channel preference: `Call us` is explicitly scoped to "anything urgent",
which sets the phone line's expectation before anyone dials.

The page header is `Customer Service` with the availability promise
`How can we help? We're available 24 hours a day.` — the scope of "24 hours"
is repeated in the `Call us` card as `24/7`, two formats for one fact on one page.

**Partner Hub top-level scaffolding** `[observed]`:
`Partner Help` → `Featured articles` → `Browse by topic`. Partner help URLs
expose the real topic tree in their paths:
`policies-payments/policies/` · `reservations/reduce-cancellations/` ·
`reservations/overbookings-no-shows/` · `rates-availability/rates-special-offers/`.

`reduce-cancellations` and `overbookings-no-shows` are the notable path segments.
The partner IA is organised around **commercial outcomes the partner wants**
(reduce cancellations) and **failure modes** (overbookings, no-shows), not around
the objects in the system. A guest-side IA would call the same territory
"Changing or cancelling"; the partner side calls it "reduce cancellations",
because the partner's goal and the guest's goal are opposed.

**The Extranet is the partner's product noun** `[observed]`. Every partner
how-to begins "Log in to the Extranet" and the navigation is quoted as a
click-path: `Property` → `Policies`; `Rates & Availability` → `Rate plans`.
`Extranet` is a 1990s-vintage B2B term that Booking has never retired, and it
sits oddly beside the consumer side's plain language — see T13.

## T2 Value proposition & headline patterns

**Three-benefit blocks, repeated across every vertical, with a fixed shape:
short noun/adjective label + one qualifying sentence** `[observed]`

Car rentals:
- `We're here for you` — "Providing customer support in over 30 languages"
- `Free cancellation` — "On most bookings, up to 48 hours before pick-up"
- `5 million+ reviews` — "By verified customers"

Airport taxis:
- `Flight tracking` — "Your driver will track your flight and wait for you if it's delayed"
- `One clear price` — "Your price is confirmed up front – no extra costs, no cash required"
- `Tried and true service` — "We work with professional drivers and have 24/7 customer care"

Attractions:
- `Explore top attractions` — "Experience the best of your destination with attractions, tours, activities, and more"
- `Fast and flexible` — "Book tickets online in minutes, with free cancellation on many attractions"
- `Support when you need it` — (brand token stripped) "…global Customer Service team is here to help 24/7"

**Every benefit label is immediately bounded by its own subline.** This is the
defining Booking pattern and it is applied with real discipline:

- `Free cancellation` → "On **most** bookings, **up to 48 hours** before pick-up"
- `5 million+ reviews` → "By **verified** customers"
- `Fast and flexible` → "free cancellation on **many** attractions"
- `One clear price` → "confirmed up front – **no extra costs, no cash required**"

The quantifiers do the work. `most`, `many`, `up to`, `verified` — each headline
claim is narrowed in the very next line rather than in a footnote or an asterisk.
`One clear price` is the only one bounded by *negations* rather than by a
quantifier, and the negations are the two things a taxi passenger actually fears:
a surprise supplement and a cash-only driver.

**Loyalty headline plays on the programme name** `[observed]`:
`Discover the Genius way to travel` and the closing CTA block
`So simple, it's Genius`. A programme named after an adjective, then used as
both noun and adjective in the same page. The subhead does the eligibility work:
"Unlock a world of travel rewards at over 390,000 properties. Sign in or create
an account to get free lifetime access."

`free lifetime access` is repeated at each tier and is the hook: the programme
promises the *tier* is permanent, which pre-empts the standard loyalty anxiety
about status expiry.

**Storefront headlines are plain and functional** `[observed]`:
`Car rentals for any kind of trip` — "Great deals at great prices, from the
biggest car rental companies" · `Attractions, activities, and experiences` —
"Discover new attractions and experiences to match your interests and travel
style" · `Airport transportation made easy`.

`for any kind of trip` is a reach-claim used to avoid segmenting, and it appears
verbatim on more than one vertical.

**Homepage promotional banners** `[observed]`, degraded but legible:
`Seize the moment!` — "Save 15% or more when you book and stay before October 1, 2024" ·
`Fly away to your dream vacation` — "Get inspired – compare and book flights with flexibility" ·
`Trending destinations` — "Most popular choices for travelers from the United States" ·
`Travel more, spend less` / `Sign in, save money` —
"Save 10% or more at participating properties – just look for the blue Genius label".

Two observations. `Seize the moment!` carries an offer expiring **October 1, 2024**
on a page harvested in September 2026 — a stale promotional banner live on the
homepage (see T14). And the Genius line ends with a *visual* instruction —
"just look for the blue **Genius label**" — teaching the user to recognise a badge
rather than describing the benefit abstractly.

**Partner-side headlines are benefit + reassurance in a two-part deck** `[observed]`:

> `Cancellation, deposit, and prepayment policies`
> `Clarity for your guests, guaranteed revenue for you`

A chiasmus that assigns one benefit to each party in eight words. This is the
single best headline in the file: it names the guest benefit (`clarity`) and the
partner benefit (`guaranteed revenue`) and makes them co-dependent, which is
exactly the argument the page then spends 400 words making.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign in to save` | Genius page, top and bottom | Value-first sign-in prompt — names the *reason*, not the action |
| `Sign in now` | Car rentals, Genius upsell | |
| `Sign in to save time` | Attractions | **Third variant of the same CTA**, promising a different benefit |
| `Sign in to save 10% with Genius` | Car rentals | Fourth variant, fully specific with a number |
| `Send us a message` | Customer Service | |
| `Call us` | Customer Service | |
| `Contact the property` | Customer Service | Routes away from Booking |
| `Our Help Center` | Customer Service | Possessive |
| `Skip to main content` | Top of DOM, Customer Service and Car rentals | Accessibility |
| `See more FAQs on our help page` | Airport taxis, foot of page | |
| `Learn more about our airport taxi service` | Airport taxis | Fully specific, no bare "Learn more" |
| `Explore more destinations` | Attractions | |
| `Explore more options to rent a car for cheap` | Car rentals | SEO-shaped CTA |
| `Create new cancellation policy` | Partner Extranet (quoted in help) | |
| `Add non-refundable rate` | Partner Extranet (quoted in help) | |
| `Activate rate plan` | Partner Extranet (quoted in help) | |
| `Review rate plan` / `Save rate plan` | Partner Extranet (quoted in help) | Object-specific save labels |
| `Apply changes` | Partner Extranet (quoted in help) | Distinct from `Save` — a second commit step |
| `Go to the Extranet` | Foot of partner help articles | |
| `Is this article helpful?` | Foot of partner help articles | |
| `What do you think of this page?` | Foot of partner solutions pages | **Different feedback prompt for a different page type** |

**Observation — the sign-in CTA has four labels.** `Sign in to save` ·
`Sign in to save time` · `Sign in now` · `Sign in to save 10% with Genius`.
Read charitably this is per-context benefit framing, and `save` cleverly carries
both "save money" and "save time" across two of them. Read strictly it is four
labels for one action across four pages of one site. The best of the four is
`Sign in to save 10% with Genius`, which names the benefit, the number and the
programme.

**Observation — the partner Extranet separates `Save` from `Apply changes`.**
The rate-plan flow is `Select … then click Save` followed by `Click Apply changes`.
A deliberate two-stage commit where the first verb persists the edit and the
second publishes it. The labels are distinct enough that the distinction is
learnable, which is more than most staged-publish UIs manage.

## T4 Onboarding & getting-started

**Airport taxis: a three-card narrative, each card a gerund heading with a
one-sentence promise** `[observed]`

1. `Booking your airport taxi` — "Confirmation is immediate. If your plans change, you can cancel for free up to 24 hours before your scheduled pickup time"
2. `Meeting your driver` — "You'll be met on arrival and taken to your vehicle. The driver will track your flight, so they'll be waiting if it's delayed"
3. `Arriving at your destination` — "Get to your destination quickly and safely – no long lines for a taxi, no navigating public transit"

The step headings are **gerunds naming the user's action**, not the system's.
And step 1 puts the *cancellation window inside the how-it-works*, not in a
policy footer: "you can cancel for free up to 24 hours before your scheduled
pickup time". Putting the escape route into step one of the onboarding narrative
is a confidence move — it says the commitment is reversible before asking for it.

Step 3 is written entirely as **negations of known pain**: "no long lines for a
taxi, no navigating public transit". The benefit is defined by the alternatives
it removes.

**A second, more granular five-step strip sits below** `[observed]`, under the
heading `How does it work?`:

`Book online` → `Receive confirmation` → `Meet your driver` → `Arrive at your destination` → `Enjoy your trip!`

Bare imperatives, no bodies. Step 5 (`Enjoy your trip!`) is not a step at all —
it is a sign-off, and it carries the page's only exclamation mark.
**Two how-it-works components on one page** with different granularity and
different grammar (gerunds vs imperatives) is a content-architecture smell.

**Genius onboarding is three adjectival promises** `[observed]`, under
`How Genius works`: `Easy to get` · `Easy to keep` · `Easy to grow`.

Three parallel `Easy to <verb>` phrases covering acquisition, retention and
progression. `Easy to keep` is the differentiator — it addresses status-expiry
anxiety head-on, and pairs with the `free lifetime access` claim. Bodies for the
three cards did not survive extraction.

**Partner onboarding is a numbered Extranet click-path** `[observed]`, and it is
the cleanest instructional writing in the file:

> 1. Log in to the Extranet
> 2. Click **Property** and then click **Policies**
> 3. Click **Create new cancellation policy**
> 4. Select whether you want to offer a free cancellation period, and if so, how long before arrival the guest can cancel for free
> 5. Specify how much you'll charge the guest if they either no-show or cancel after the free cancellation period ends (or if there's no free cancellation period).
> 6. Click **Save**

Steps 1–3 and 6 are mechanical clicks; steps 4–5 are the two **decisions**. The
decisions are written as full sentences with all the conditionals spelled out
("and if so, how long"; "or if there's no free cancellation period"), while the
clicks are terse. Density is allocated to where the thinking happens.

Step 5 is also where the whole cancellation-policy model is defined in one
sentence: *how much you charge, for a no-show or a late cancellation*. The setup
flow doubles as the conceptual explainer.

The article then flags the scoping rule before the steps rather than after:
"The new policy will only apply to bookings you receive after you set it up."

**A second, explicitly two-stage flow** `[observed]`: "To set up a cancellation
policy, first you need to **create the policy**, then **connect it to one or more
of your Rate Plans**." The two-noun model (`policy` and `Rate Plan`) and their
relationship is stated in one sentence before either is explained.

**Branching onboarding by prior state** `[observed]` — the non-refundable-rate
article splits into `Scenario 1: It's your first time setting up a fully
non-refundable rate for your property` and `Scenario 2: You previously set up a
non-refundable rate for your property`. Naming the branch by *what the reader has
already done* rather than by a feature flag, in a full sentence, lets the reader
self-select without understanding the system.

Scenario 1 also describes a guided flow in the user's terms: "A short list of
questions will appear to guide you through the set-up. Select the answers that
best match your property's needs" — and warns about variability honestly:
"Depending on your previous selections, this may be the final step. Additional
messages may appear to guide you through any extra steps."

## T5 Form & field labels

**Consumer form labels did not survive extraction** — the search widgets on all
storefronts rendered as empty. `[absent]` for this pass.

**Partner-side labels quoted inside help articles** `[observed]`:

| Label | Context |
|---|---|
| `Property` → `Policies` | Extranet nav path |
| `Rates & Availability` → `Rate plans` | Extranet nav path |
| `Cancellations and prepayment policies` | Extranet section heading (note: **plural "Cancellations"**) |
| `Cancellation and prepayment policies` | The *same* section, quoted **singular** in a different article |
| `Cancellation policies` | Extranet sub-heading |
| `Is there a period when the guest can cancel free of charge?` | **A settings control written as a question with Yes/No** |
| `Policy` → `Edit` | Rate-plan editor |
| `Driver details` | Taxi booking form (named in the cars FAQ: "Just put their info on the 'Driver details' form when booking the car.") |
| `Payment page` | Named as the location of the full price breakdown |
| `House rules` | Property-page section where pet policies live |
| `Special requests` | Booking-form free-text box, named in the FAQ answer about third-party cards |

**`Is there a period when the guest can cancel free of charge?`** is the standout.
A boolean setting labelled as a **complete question in natural language**, with
`Yes` / `No` as the control. Most settings UIs would ship `Free cancellation
period` with a toggle. Writing the setting as the question it answers removes the
need for hint text entirely, and it makes the resulting policy self-documenting
when read back.

**`Special requests` is doing unintended compliance work** `[observed]`. From the
customer-service FAQ on third-party cards: "confirm the card holder's name and
that you have permission to use their card in the 'Special requests' box when
booking." A free-text field designed for "late check-in please" is the designated
place to record a payment-authorisation attestation. That is a real content-design
failure worth recording — a legal-ish declaration routed through a convenience
field.

## T6 Status & state language — **PRIORITY**

Booking's guest-facing status vocabulary did not survive the consumer-host
extraction, so almost everything here is `[documented]` from the partner side or
from FAQ answer bodies. **No status name has been invented.**

**Confirmed states and state-like nouns** `[observed]`, all quoted:

| State / concept | Verbatim source | Which side |
|---|---|---|
| `confirmed stays` | "We charge commission on **confirmed stays**, regardless of whether or not a guest stays at your property." | Partner |
| `no-show` / `no-shows` | "how much you'll charge the guest if they either **no-show** or cancel after the free cancellation period ends"; "non-refundable or partially refundable **no-shows** or cancellations" | Partner |
| `overbooking` | "If you have more than one guest confirmed for the same room for the same date, this is considered an **overbooking**." | Partner |
| `double-bookings` | Used as a separate article title alongside overbookings | Partner |
| `canceled` (booking) | "After the guest has been relocated to the right accommodations, **we'll cancel the original booking**." | Partner |
| `cancellation request` | "25% of all **cancellation requests** are made within this period" — a request is a distinct object from a cancellation | Partner |
| `Confirmation is immediate` | Airport taxis step 1 | Consumer |
| `booking confirmation` (email) | "Be sure to check your email inbox, spam, and junk folders. If you still can't find your confirmation…" | Consumer |

**`confirmed stays` is a deliberately load-bearing phrase.** The commission rule
is "We charge commission on confirmed stays, regardless of whether or not a guest
stays at your property." A *confirmed stay* is therefore a commercial state, not
a physical event — it survives the guest never arriving. Booking chose a noun
that sounds like an event and then immediately disclaimed the event reading in the
same sentence. Clear, but only because of the disclaimer clause; the term alone
would mislead.

**`overbooking` is defined before it is discussed** `[observed]`:

> "If you have more than one guest confirmed for the same room for the same date, this is considered an overbooking."

A one-sentence operational definition using only the partner's own nouns (guest,
room, date), with no reference to inventory systems or channel managers. And note
the article **title is a question in the partner's voice** — `Can [Booking.com]
help me with an overbooking?` — rather than "Managing overbookings".

**Separate vocabularies for separate concepts.** `overbooking` (one room, two
guests) and `double-bookings` (its own article) are kept as distinct topics, as
are `overbookings-no-shows` (one URL path) and `reduce-cancellations` (another).
The taxonomy of ways a booking can go wrong is carved into at least four named
buckets.

**Booking modification vocabulary** `[observed]` — the customer-service FAQ answer
lists exactly what "make changes" means, as an eleven-item menu:

> Change check-in/out times · Change dates · Cancel booking · Edit credit card details ·
> Change guest details · Select bed type · Change room type · Add a room · Add a meal ·
> Make a request · Contact the property

Three verbs do all the work: `Change` (five items), `Add` (two), and then
`Edit` / `Select` / `Cancel` / `Make` / `Contact` once each. `Cancel booking` is
listed as the third item in a list of *changes* rather than being separated out —
cancellation is framed as one modification among many, which lowers its
psychological weight. The whole list is preceded by the bound
"Depending on the property's policy, you can do the following" — capability is
conditional on the supplier, and that is stated before the list, not after.

**Money states** `[observed]`, from the customer-service FAQ on unexpected charges.
This is the best status-disambiguation copy on the consumer side and it names
three distinct states for what the user sees as one charge:

- **`Pre-authorization`** — "just a validity check that temporarily blocks an amount roughly equivalent to the cost of your reservation on your credit card. The amount will be unblocked after a certain amount of time. How long this takes will depend on the property and your credit card provider."
- **`Deposit or prepayment`** — "Some properties require a deposit or prepayment at the time of reservation. This policy is clearly highlighted during the reservation process… If your reservation allows for free cancellation, this amount is returned to you if you choose to cancel it."
- **`test payment`** — "a temporary hold, that's used to validate your card and guarantee your booking. **Unlike a real charge, this test payment will be returned to your card.**"

Three named states, each with its reversal condition attached, opened by the
framing line "The charge you see could be any one of the following:". The
`test payment` entry is the sharpest: it contrasts explicitly with "a real
charge", which is the distinction the anxious user is actually trying to make.

`pre-authorization` also appears on the partner side as a configurable behaviour:
"With **pre-authorization preferences**, you can show guests whether you'll
pre-authorize their cards or not, as well as how much and when you'll
pre-authorize." The same concept is a *state* to the guest and a *setting* to the
partner, and both sides get copy for it.

**Vehicle/inventory card labels** `[observed]`, airport taxis:

> `Volkswagen Jetta or similar` · `3 passengers` · `2 standard bags` ·
> `Meet & Greet included` · `Free cancellation`
> `Full-size sedan` / `Mercedes-Benz E-Class or similar`

`or similar` is the honesty token — the specific model is an illustration, not a
guarantee, and the qualifier is attached to the model name itself rather than
footnoted. `Meet & Greet included` uses `included` to pre-empt the "is that
extra?" question inline.

## T7 Error, failure & recovery — **PRIORITY**

The consumer-side recovery content did not survive extraction. The partner side,
which did, is unusually candid — it is written for a supplier who has just
failed a guest.

### Overbooking and relocation

`[observed]`, in full, from the overbooking article. The escalation is a clean
three-tier ladder with a cost assignment at each rung:

> "Although this situation isn't ideal, we understand that mistakes can happen.
> The best—and easiest—way to resolve this is to try and accommodate the guest in
> another of your rooms, **of a similar or better category**.
>
> If this isn't possible, we recommend you **cover the cost** of relocating the
> guest to nearby accommodations of a similar (or better) standard. If you need
> help with this, you can contact our Customer Service Team through your Extranet
> inbox **24 hours a day**.
>
> After the guest has been relocated to the right accommodations, **we'll cancel
> the original booking**."

Five things worth lifting:

1. **The opening concedes before it instructs.** "Although this situation isn't ideal, we understand that mistakes can happen." Two clauses: acknowledge severity, then absolve intent. Then it moves immediately to action. No blame, no lecture — and crucially no minimising either, because "isn't ideal" is understated enough not to insult a partner who knows they have a problem.
2. **`of a similar or better category` / `of a similar (or better) standard`** is the substitution standard, stated twice with the same "or better" floor. A one-directional quality rule expressed in four words.
3. **The money question is answered without being asked.** "we recommend you cover the cost" — the article does not wait for the partner to ask who pays.
4. **The support channel is named with its availability inline** ("through your Extranet inbox 24 hours a day") rather than in a separate contact section.
5. **The last sentence closes the system loop.** "After the guest has been relocated… we'll cancel the original booking." The partner is told what *Booking* will do, and when, so they do not cancel it themselves and trigger a penalty. This is the sentence most products forget.

Note also the softeners: `we recommend` rather than "you must", and
"It's always your choice whether you accept these requests" elsewhere. The
partner-facing register is **advisory, not directive**, even on obligations —
which is a commercial-relationship choice, not a content one, but it is applied
consistently.

### Accidental bookings and cancellation-fee waivers

`[observed]` — the most interesting recovery content in the file, because it
documents a deliberate exception-handling mechanism built on behavioural data:

> "Even if a guest booked a non-refundable rate, they can ask to cancel this for
> free. Our research shows that guests are most likely to cancel **accidental
> bookings within 24 hours**. In fact, **25% of all cancellation requests are made
> within this period**."

The argument is built as: *the user's mistake is predictable* → *here is the
number* → *here is a tool that automates forgiveness*. The tool is named:

**`Cancellation Fee Exceptions tool`** — "The tool enables you to automatically
allow free cancellation if the guest requests it during a certain period, such as
within 24 hours of booking."

The persuasion that follows is a model of how to argue for generosity to a party
whose incentive runs the other way:

> "Even though we always explain the booking conditions to guests, **waiving fees
> is a friendly gesture that may help prevent complaints and encourage satisfied
> guests to book with you in the future**. Of course, it's entirely up to you
> whether you use the Cancellation Fee Exceptions tool and waive cancellation fees."

Three moves: defend the partner's position first ("we always explain the booking
conditions"), then give a *self-interested* reason to be generous (fewer
complaints, repeat business), then return control explicitly ("entirely up to
you"). No appeal to fairness or to the guest's feelings — the whole case is made
in the partner's own currency.

**The manual fallback is described with its friction intact** `[observed]`:
"If you haven't set this tool up or a guest asks us to cancel their reservation
after your chosen time period expires, **we'll reach out to ask if you'll agree to
waive the fee**." The not-configured path is a human negotiation, and Booking
says so rather than implying the automated path is the only one.

**A downstream system effect is stated as a benefit** `[observed]`:
"When you use the Cancellation Fee Exception tool, your calendar will update and
the canceled rooms or units will **become available for bookings again
immediately**." The inventory consequence of a cancellation, framed as recovered
revenue rather than as a state change.

> **Note the singular/plural drift:** `Cancellation Fee Exceptions tool` and
> `Cancellation Fee Exception tool` both appear in the same article.

### Guest-side recovery, from FAQ answers

`[observed]`, all from `/customer-service.html` (questions were stripped; answers
survived):

- **Lost confirmation:** "Be sure to check your email inbox, spam, and junk folders. If you still can't find your confirmation, go to [link] and we'll resend it to you." — Three named folders in escalation order, then a system remedy. The instruction is specific enough to be actionable ("spam, and junk" as two separate named locations, because different clients use different words).
- **Unexpected charge:** the three-state disambiguation quoted in T6, opened by "The charge you see could be any one of the following:" — a framing that legitimises the user's confusion before resolving it.
- **Who charged me:** "Generally, the property is responsible for charging your card. If payment is instead handled by [brand stripped], this will be stated clearly in your booking confirmation."

**The single most important consumer-side disclosure** `[observed]`, repeated in
two separate FAQ answers with near-identical wording:

> "Any cancellation fees are determined by the property, and **you'll pay any additional costs to the property**."

Booking states twice that (a) it does not set the fee and (b) the money does not
flow through it. For a marketplace, naming which party you are *not* is the same
move Wise makes with "not an FDIC-insured bank" — and Booking places it in the
answer to the two highest-volume cancellation questions rather than in the terms.

## T8 Empty states

`[absent]`. No no-results, no-data or first-run copy survived extraction from any
reachable surface. Search-results pages were not loaded (that would have required
entering a destination and dates, which was out of scope).

## T9 Notifications & system messages

`[documented]`, thin:

- Booking confirmation is an emailed artefact and is resendable — "we'll resend it to you".
- Taxi confirmation is immediate: "Confirmation is immediate."
- Partner-side, Booking initiates contact on fee waivers: "we'll reach out to ask if you'll agree to waive the fee."
- Partner-side channel: "contact our Customer Service Team through your **Extranet inbox** 24 hours a day." The partner has an in-product inbox distinct from email.
- A partner-side third-party warning appears at the foot of a how-to: "If you use a **Channel Manager**, your provider may require you to take additional steps to map your new rate plan." Flagging an integration side-effect at the end of the flow it affects.

No toast, banner, push or alert copy was observed. `[absent]` for in-product
notification strings.

## T10 Disclosures, legal & compliance — **PRIORITY**

### The free-cancellation framing

Booking's headline flexibility promise is `Free cancellation`, and it is
**never shipped unbounded**. Every instance found:

| Surface | Verbatim | The bound |
|---|---|---|
| Car rentals, trust bar | `Free cancellation` / "On most bookings, up to 48 hours before pick-up" | `most` + `48 hours` |
| Car rentals, FAQ | "Free cancellation up to 48 hours before pick-up time on most bookings." | Same, restated inline |
| Attractions | "Book tickets online in minutes, with free cancellation on **many** attractions" | `many` |
| Airport taxis, how-it-works | "you can cancel for free up to 24 hours before your scheduled pickup time" | `24 hours` |
| Airport taxis, vehicle card | `Free cancellation` | **Unbounded on the card** — the window appears elsewhere on the page |
| Customer Service FAQ | "If you have a free cancellation booking, you won't pay a cancellation fee." | Conditional on booking type |

**The window differs by vertical — 48 hours for cars, 24 hours for taxis** — and
the quantifier differs too (`most` for cars, `many` for attractions). Booking does
not harmonise the promise across verticals; it states each one locally. That is
the honest choice and it is worth noting as a deliberate rejection of a single
brand-level claim.

The car-rentals FAQ also adds a **verification instruction** rather than relying
on the page: "We recommend confirming your exact cancellation window on the
selected hotel's details page" is Expedia's version; Booking's equivalent is
routing the user to the per-booking policy — "any cancellation fees are
determined by the property and listed in **your cancellation policy**."

The possessive — `your cancellation policy` — is doing quiet work. It frames the
policy as an attribute of the user's own booking rather than as a document they
must go and find.

### The conditional structure of every cancellation answer

`[observed]`, the consumer FAQ answer in full:

> "If you have a free cancellation booking, you won't pay a cancellation fee. If
> your booking isn't free to cancel anymore **or** is non-refundable, you may
> incur a cancellation fee. Any cancellation fees are determined by the property,
> and you'll pay any additional costs to the property."

Three sentences, three jobs: the happy path, the two unhappy paths, then the
money mechanics. Note `isn't free to cancel **anymore**` — the answer
acknowledges that free cancellation is a state that **expires**, not a property
of the booking. One adverb captures the whole time dimension. And the two unhappy
paths are joined with `or` because they have different causes (window elapsed vs
rate type) but the same consequence.

### Partner-side policy taxonomy

`[observed]` — this is the definitive artefact and it is fully readable.

**Two policy families, named:**

- **`Cancellation policies`** — "Let guests know if they can cancel their bookings free of charge, and, if so, until when. Generally speaking, we recommend allowing guests to cancel for free until 1 or 2 days before check-in. Alternatively, you can select **non-refundable** policies where guests won't get their money back if they cancel."
- **`Deposit and prepayment policies`** — "Let guests know if they should expect any charges before arrival, and, if so, when and how much they'll be charged."

Both definitions use the identical construction: **`Let guests know if … and, if
so, <when/how much>`**. The policy is defined by *what the guest is told*, not by
what the partner collects. Two policy types, one grammatical frame, guest-first
in both. That is a deliberate editorial decision and it is the reason the page
works.

**Cancellation policy shapes, named:**

| Name | Verbatim definition |
|---|---|
| `fully flexible policy` | "your guests will only pay when staying at your property and can cancel free of charge during a time frame of your choice prior to check-in" |
| `customized policy` | "you decide how long before check-in guests can cancel for free, and how much they'll be charged if they do cancel after that point. You can also set up a prepayment before check-in… On top of that, you can apply different policies to different room types." |
| `non-refundable` | "With a non-refundable rate, guests pay the full price if they cancel, make changes, **or no-show**." |
| `partially refundable` | Used as a category in the commission rules |

**The recommendation is explicit and numeric** `[observed]`:
"Generally speaking, we recommend allowing guests to cancel for free **until 1 or
2 days before check-in**." Booking publishes its own opinion about what the
partner should choose, with a number, hedged by "Generally speaking". Platforms
rarely commit to a recommended default in writing.

**The non-refundable definition is a three-item trigger list** — cancel, change,
**or no-show**. Including `no-show` in the definition of non-refundable is the
detail most definitions omit, and it is the one that causes disputes.

**Payment instrument taxonomy** `[observed]`, three named things with distinct
mechanics:

- **A deposit** — "Guests pay a certain amount up front, usually by bank transfer, which they'll get back if they cancel within the free (flexible) cancellation period. However, if they cancel after that, they won't get the deposit back."
- **Prepayment** — "guests use their cards to pay for part of a reservation, often just the first night. Prepayment is usually for partially refundable or non-refundable bookings. So if the guest cancels, they won't get that amount back."
- **Pre-authorization** — "You hold a certain amount to verify a guest's card, with the plan to charge it fully at a later date. You can hold this amount as a guarantee in case the guest no-shows, or just return it to the guest immediately."

Each is defined by *mechanism + typical use + what happens on cancellation*.
Three parallel definitions with the same three slots. The deposit entry even
glosses its own term mid-sentence — "within the **free (flexible)** cancellation
period" — reconciling the consumer word and the partner word in a parenthesis.

Also note the deposit's stated rationale: "Deposits are usually paid by bank
transfer, so this is especially useful **if you can't charge credit cards**." The
feature is justified by the constraint it relieves.

### Commission disclosure

`[observed]` — an unusually direct piece of money copy, structured as
*we charge* / *you also pay* / *you don't pay*:

> "We charge commission on confirmed stays, regardless of whether or not a guest stays at your property."
>
> "You also pay commission when:
> • You charge guests for non-refundable or partially refundable no-shows or cancellations
> • You charge guests who cancel after the free cancellation period ended"

The `You don't have to pay commission when:` list was present as a heading but its
items did not render — recorded as a gap, not filled in.

The rule stated plainly is that **Booking takes commission on money the partner
keeps from a guest who never arrived**. That is a commercially awkward fact and it
is the first sentence of the article, in the active voice, with "regardless of
whether or not" leaving no room to hope otherwise.

### Price-inclusion disclosure

`[observed]`, car rentals FAQ — the clearest drip-pricing disclosure in the file:

> "The price you see includes the car, **mandatory coverage** (e.g. Theft
> Protection, Collision Damage Waiver), and fees that, **if they apply, are usually
> payable at pick-up** (e.g. any one-way fees, airport surcharges, or local taxes).
>
> It also includes any extras you already added (e.g. GPS, baby seats).
>
> **It doesn't include any extra coverage you buy when you get to the rental counter.**
>
> Tip: There's a full price breakdown on the Payment page."

The structure is: what's in (twice), what's out (once, as its own paragraph), then
where to see the detail. The **exclusion gets its own paragraph** and names the
exact moment of the upsell — "when you get to the rental counter" — which is the
one place a car-rental customer reliably gets surprised. Three worked examples per
category throughout. And the closing `Tip:` routes to the authoritative breakdown
rather than asking the reader to trust the summary.

Compare the taxi promise: `One clear price` — "Your price is confirmed up front –
no extra costs, no cash required". Same company, different vertical, and the
difference in confidence is visible in the grammar: the taxi claim is absolute
(`no extra costs`) because Booking controls the supply chain; the car claim is
hedged and itemised because it does not.

### Genius tier disclosure

`[observed]` — each benefit carries its own basis-of-calculation:

- `10% discount` — "You get a 10% discount on the price of your stay **before taxes and charges are applied**"
- `10%–15% discounts` — "This is a 10% or 15% discount applied to the price **before taxes and fees**"
- `Free breakfast` — "Enjoy complimentary breakfasts at your Genius stays"
- `Free room upgrade` — "Get the most of your stay with a free upgrade"

**The discount base is disclosed inline, at every occurrence** — "before taxes and
charges", "before taxes and fees". Note the two are **not identical phrasings**
("charges" vs "fees") on the same page, which is a consistency miss on an
otherwise strong disclosure.

Eligibility is stated as a gate with a threshold:
`Genius Level 1` — "Sign in to unlock **free lifetime access** to Genius Level 1 discounts at **participating properties**."
`Genius Level 2` — "**Complete 5 stays in 2 years** to unlock free lifetime access to travel rewards at participating properties."

`participating properties` is repeated at both tiers, and the homepage banner adds
the scale figure elsewhere ("over 390,000 properties") plus the recognition cue
("just look for the blue Genius label"). Three different bounds on one benefit —
eligibility, property scope, and a visual identifier — none of them asterisked.

### Rental eligibility and age disclosure

`[observed]`, car rentals FAQ:

> "Most companies will let you rent a car if you're **at least 21**, and some will
> even rent to younger drivers. However, **if you're under 25, you might have to
> pay a 'young driver fee.'**"

The surcharge is named in quotation marks as the industry term the user will see
at the counter, so it is recognisable when it appears. And the document-requirement
list is split by *when you need it* — "When you're booking a car, all you need is
a debit or credit card. **At the rental counter, you'll need:** …" — two moments,
two lists, which is the right decomposition for a two-stage transaction.

Closed with a hedge that names the failure modes:

> "**Important:** Check the car's rental terms as well, because each company has
> its own rules. For example, they might need to see extra ID, might not accept
> certain types of credit cards, or might not rent to anybody who hasn't held
> their driver's license for 36 months, etc."

Three specific, plausible refusal reasons rather than a generic "terms apply".
The `etc.` at the end is lazy, but the three examples before it are not.

## T11 Help-centre architecture

**Consumer help centre: `[absent]` for this harvest.** Every attempt to reach it
(`secure.booking.com/help.html`, `/content/help.en-gb.html`, `/tpi_faq.html`)
returned empty. What survived is the **Customer Service routing page**, which sits
above the help centre and offers `Our Help Center` as one of four options
alongside message, phone and the property.

That routing order is itself the finding: **self-service is the fourth card**, and
the three ahead of it are all forms of contact. Booking routes to humans first —
the inverse of Wise's "personalisation, then self-service, then contact". For an
OTA whose failures are time-critical and supplier-mediated, that is arguably
correct, but it is the opposite of the usual deflection-first design.

**Partner Hub architecture** `[observed]` — two distinct content types under one
roof, with different URL namespaces, different lengths, different registers and
**different feedback prompts**:

| Type | Path | Character | Foot-of-page prompt |
|---|---|---|---|
| Help articles | `/help/<topic>/<subtopic>/<slug>` | Task-based, numbered click-paths, 2–3 min read | `Is this article helpful?` |
| Solutions pages | `/solutions/<slug>` | Conceptual, persuasive, sub-headed | `What do you think of this page?` |

The split is clean and worth copying: **"how do I do it" and "why would I do it"
are different content types with different URLs.** `setting-cancellation-policies`
(help) tells you which buttons to press; `cancellation-deposit-and-prepayment-policies`
(solutions) argues why you should care and explains the model. Neither duplicates
the other, and the help article does not waste words on motivation.

The solutions page even has its own internal IA: `What policies are available?` →
`Deposit and prepayment policies` → `How can your business benefit from
cancellation and prepayment policies?` → `Overview: How it works`. Three of those
four headings are **questions the partner would ask**, and the fourth is labelled
`Overview:` to signal it is the detailed part.

**Help-article metadata** `[observed]`: every partner article carries
`Updated <n> months/years ago | <n> min read time`. The corpus sample shows
`Updated 2 years ago | 3 min read`, `Updated 8 months ago | 3 min read`,
`Updated 5 months ago | 2.5 min read`. Two observations: the freshness is
**relative** (a two-year-old cancellation-policy article is visibly stale, and
Booking does not hide it), and the read time is given to **half a minute**
(`2.5 min read`), which is false precision.

**`In this article` jump lists** appear on longer partner articles
(`Commission and canceled bookings` · `How the Cancellation Fee Exceptions tool
works` · `How to use the Cancellation Fee Exceptions tool`). Note the shape: a
noun-phrase topic, then `How X works`, then `How to use X` — concept before
procedure, consistently.

**Cross-linking is soft and unlabelled** `[observed]`: "To find out more about
when you can cancel a reservation, take a look at **this article**." A bare
"this article" link with no destination title — a findability miss in otherwise
careful copy.

**Partner-side benefit sub-headings are three-word outcomes** `[observed]`, under
`How can your business benefit…`:

- `Secure revenue` — "Make sure you're covered whenever guests cancel."
- `Reduce cancellations` — "When guests have a clear idea of what to expect, they're less likely to cancel."
- `Manage guest expectations` — "Clearly stated policies reduce the surprises that can have a negative impact on guest experience."

Verb + noun, one sentence each, and the argument moves from the partner's money
(secure revenue) outward to the guest's experience (manage expectations). The
middle one is the bridge and it states the causal claim plainly: clarity reduces
cancellations.

## T12 FAQs

**Car rentals FAQ — the fullest FAQ block harvested** `[observed]`, under the
heading `Frequently asked questions`. **The question labels were stripped by the
extractor; the answers survived.** Reconstructed topic sequence, from the answers:

1. Weekly cost — "Based on the average daily cost of $54, a week will cost about $378."
2. Monthly cost — "Based on the average daily cost of $54, a month will cost about $1,620."
3. Most popular car group — "Premium is the most popular car group to rent in the United States, followed by SUV and medium."
4–6. Per-group daily prices — Premium `$61`, SUV `$60`, Medium `$47`
7. Supplier count — "there are 93 car rental companies available in the United States, including: Dollar · Budget · Avis"
8. Cheapest suppliers — named with prices: "RC - Advantage for an average daily price of $14 · Dash … $16 · RC - Nextcar … $17"
9. Popular pick-up locations — Orlando · Orlando International Airport · El Segundo
10. One-way rentals — "It's usually possible to return rental cars to a different location, but it depends on each company's policy and might cost extra."
11. Cheapest time to book — "within the same week of your trip for an average price of $49 a day."
12. What we offer — three bullets incl. `Support in 30+ languages`
13. What you need to book / at the counter — two-list split (see T10)
14. Minimum age — `at least 21`, `young driver fee` under 25
15. Additional drivers — "Just put their info on the 'Driver details' form when booking the car."
16. How to choose a car — three tips with sub-headings
17. What the price includes — the inclusion/exclusion block (see T10)

**This is a data-generated FAQ, and it is the densest decision content on the
site.** Roughly ten of seventeen answers are computed from Booking's own booking
data and rendered as complete sentences with figures ("Based on the average daily
cost of $54, a week will cost about $378."). The construction is always
*basis → calculation → result*, so the number is never presented without its
derivation.

The supplier-pricing answer is the striking one: Booking names **three specific
cheapest suppliers with their average daily prices**, including small brands
(`RC - Advantage`, `Dash`, `RC - Nextcar`). A marketplace publishing a ranked
cheapest-supplier list on its own storefront is unusual, and the `RC -` prefix
leaking into user-facing copy is a data-hygiene failure (see T14).

**Choosing-a-car tips use bolded imperative leads** `[observed]`:
- "**Think about where you're going.** An SUV might be great for cruising down a Texas freeway, but a smaller car will be a lot easier for getting around Rome."
- "**See what other people think.** You'll find lots of reviews and ratings on our site, so check out what other customers liked (and didn't like) about each company."
- "**Don't forget the transmission.** In some countries, almost everyone drives manual cars, while automatics are the norm in other ones. Make sure you rent a car you can drive!"

Each is imperative + concrete contrast. The first names two real cities to make
the size trade-off vivid. The second explicitly invites negative reviews —
"what other customers liked (**and didn't like**)". The third ends on the page's
only other exclamation mark and a genuine safety consideration phrased as a
practicality.

**Customer Service FAQ — eight answers, questions stripped** `[observed]`.
Reconstructed topics: cancellation fees exist and who sets them · whether you pay
a fee · who charges your card and when · what changes you can make (the
eleven-item list) · finding a lost confirmation · booking without a card /
with someone else's card · what an unexpected charge is (three states) ·
pet policies ("Pet policies are always displayed on the property's page under
'House rules.'").

The sequence is: money → money → money → control → recovery → payment edge cases →
money anxiety → one practical. Seven of eight are about **money or things going
wrong**, which is an accurate read of what an OTA's customer-service page is for.

The final answer is the shortest and best-formed: "Pet policies are always
displayed on the property's page under 'House rules.'" — it does not answer the
pet question at all; it teaches the user where the answer always lives. An FAQ
answer that generalises to every property beats one that answers for none.

## T13 Terminology & glossary

| Term | Booking's usage | The alternative it rejected |
|---|---|---|
| `property` | The universal supply noun — never "hotel" in policy copy | "hotel", "accommodation", "supplier" |
| `partner` | The supply-side audience; the whole B2B site is `Booking.com for Partners` | "host", "owner", "merchant" |
| `guest` | The demand side, on **both** sides of the marketplace — partners' customers are "guests", not "customers" | "customer", "traveller" |
| `Extranet` | The partner's admin product | "dashboard", "partner portal" |
| `Genius` | The loyalty programme; used as noun and adjective (`the Genius way`, `Genius stays`, `Genius label`, `Genius Level 1`) | "Rewards", "Plus" |
| `Genius Level 1` / `Level 2` | Numeric tiers, not metal names | "Silver / Gold" |
| `Rate Plan` / `rate plan` | The sellable commercial object — **capitalisation is inconsistent within one article** | "product", "offer" |
| `fully flexible policy` | Named policy shape | "free cancellation policy" |
| `customized policy` | Named policy shape | "custom", "bespoke" |
| `non-refundable rate` | A rate type, not a policy name | "prepaid rate", "advance purchase" |
| `free cancellation` | The consumer-facing promise | "flexible booking" |
| `free (flexible) cancellation period` | The partner-facing gloss that reconciles the two registers in a parenthesis | |
| `Cancellation Fee Exceptions tool` | Named automation — also appears singular as `Cancellation Fee Exception tool` | "auto-approve waivers" |
| `pre-authorization` / `pre-authorization preferences` | A guest-facing *state* and a partner-facing *setting* | "card hold" |
| `test payment` | Consumer-facing gloss for the same mechanic | |
| `overbooking` vs `double-bookings` | Two separately documented failure modes | |
| `no-show` | Used as a verb (`if they either no-show or cancel`) and as a noun (`no-shows`) | "failure to arrive" |
| `relocating` / `relocated` | The remedy verb for an overbooked guest | "walking a guest" (the trade term) |
| `Channel Manager` | Third-party integration category, capitalised | |
| `Meet & Greet` | Taxi service level, ampersand retained | |
| `or similar` | Attached to every named vehicle model | |
| `House rules` | Property-page section name | "policies" |
| `Special requests` | Free-text booking field | |
| `travel providers` | *Not* used — this is Skyscanner's term; Booking says `property` or names the company | |

**The register gap between the two sites is the headline terminology finding.**
Consumer surfaces are plain and second-person ("you can cancel for free up to 24
hours before your scheduled pickup time"). Partner surfaces run on trade nouns —
`Extranet`, `Rate Plan`, `Channel Manager`, `no-show`, `pre-authorization` — with
essentially no glossing. The one place Booking bridges the two is the parenthesis
in `free (flexible) cancellation period`, which is a single-word acknowledgement
that the two audiences use different words for the same thing.

**`relocating` rather than the trade term.** The hotel industry calls this
"walking" a guest. Booking's partner help uses `relocating the guest`, a neutral
logistics verb that does not carry the industry's euphemism. Choosing the plain
word over the insider word, in insider-facing content, is the right call.

## T14 Voice, tone & accessibility

**Person.** Consumer copy is second person to the traveller. Partner copy is
second person to the **partner**, with the guest in third person throughout
("how much you'll charge **the guest** if **they** no-show"). Booking is
consistently first-person plural on both sides ("We charge commission…",
"we'll cancel the original booking", "we recommend", "Our research shows").

**Register.** Consumer: short, warm, contraction-heavy, occasional exclamation
("Enjoy your trip!", "Make sure you rent a car you can drive!"). Partner:
advisory and hedged — `we recommend`, `Generally speaking`, `it's entirely up to
you`, `It's always your choice`. Booking almost never issues a partner-facing
imperative about a commercial decision; it recommends and then returns control.
The one place the register hardens is commission: "We charge commission on
confirmed stays, **regardless of whether or not** a guest stays at your property."

**Tone flattens as stakes rise**, same gradient as the rest of the domain:
`Seize the moment!` and `So simple, it's Genius` in promotion; "Any cancellation
fees are determined by the property, and you'll pay any additional costs to the
property" in disclosure. No jokes appear anywhere near money.

**Em-dashes and en-dashes.** "The best—and easiest—way to resolve this" (em-dash,
partner) vs "Your price is confirmed up front – no extra costs, no cash required"
(spaced en-dash, consumer) vs "Travel more, spend less" (comma splice as a
headline). Three different punctuation conventions for the same
claim-then-qualifier move, split roughly by site.

**Numbers as trust devices** `[observed]`: `over 390,000 properties` ·
`5 million+ reviews` · `over 30 languages` / `30+ languages` (two formats) ·
`93 car rental companies` · `25% of all cancellation requests` ·
`Complete 5 stays in 2 years` · `48 hours` · `24 hours` · `24/7`.

**Typographic apostrophes are inconsistent in partner copy** `[observed]`:
"itʼs just as important", "youʼll charge them", "theyʼll get back" — these use
U+02BC (modifier letter apostrophe) rather than U+2019, mixed with correct
curly apostrophes in the same paragraph. A CMS import artefact visible in
production copy.

### Accessibility content

- **`Skip to main content`** present on Customer Service and Car rentals. `[observed]`
- Logo images carry brand-name alt text: `Dollar logo`, `Budget logo`, `Avis logo`, `Fox logo`, `Thrifty logo`, `Alamo logo`, `Sixt logo`, `Hertz logo`, `Payless logo`. `[observed]` — correct practice for a logo wall where the brand name is the content.
- Illustrative photography carries descriptive alt: "Two people chatting by the pool", "A woman arriving at a hotel lobby", "A guest checking in at hotel reception", "Gift boxes wrapped in paper and ribbon". `[observed]` — scene-level, appropriate for decorative-but-meaningful imagery.
- **No accessibility statement was found.** `https://www.booking.com/accessibility.html` was guessed and returned empty; no accessibility link survived in any reachable footer. Recorded as **not found on the reachable surface**, not as absent from the product.
- Partner-side asset alt text is raw: `policies header teaser`. `[observed]` — an internal asset name surfacing as alt text.

### Negative findings, recorded honestly

- **A promotional banner on the live homepage reads "Save 15% or more when you book and stay before October 1, 2024"** — an offer that expired roughly two years before the harvest date, still rendering.
- **`RC - Advantage`, `RC - Nextcar`, `RC - Budget`, `RC - Hertz`** appear in consumer-facing FAQ answers. `RC -` is an internal supplier-code prefix leaking into published copy.
- **`Cancellation Fee Exceptions tool` / `Cancellation Fee Exception tool`** — singular and plural in one article.
- **`Cancellations and prepayment policies` / `Cancellation and prepayment policies`** — the same Extranet section name quoted two ways in two articles.
- **`before taxes and charges` / `before taxes and fees`** — two phrasings of one discount basis on one page (Genius).
- **`over 30 languages` / `30+ languages`** — two formats for one figure on one page (Car rentals).
- **`Rate Plan` / `rate plan`** — inconsistent capitalisation within a single help article.
- **Two how-it-works components on the taxi page** with different granularity and different grammar (three gerund cards, then a five-step imperative strip ending in a non-step).
- **Four labels for the sign-in CTA** across four storefronts.
- **A bare `this article` link** with no destination title in the commission article.
- **`2.5 min read`** — false precision in read-time metadata; alongside `Updated 2 years ago` on a live cancellation-policy article.
- **Non-standard apostrophe characters** (U+02BC) mixed with correct ones in partner solutions copy.
- **`Special requests` is used to capture a payment-authorisation attestation** — a legal-ish declaration routed through a convenience free-text field.
- **Extraction defect, not a product defect:** the brand token "Booking.com" is stripped from the consumer-host body text, producing sentences like "at, we're committed to making sustainable travel easier" and "Support when you need it's global Customer Service team is here to help 24/7". **No string in this file has been quoted from a sentence where a stripped brand token would change its meaning**, except where explicitly flagged.

---

## Transferable patterns

1. **Bind every flexibility claim with a quantifier in the very next line.** `Free cancellation` / "On **most** bookings, **up to 48 hours** before pick-up". Never a bare promise, never an asterisk — the bound sits in the subline where the claim is read. And do not harmonise the bound across products if the products differ: Booking ships 48h for cars and 24h for taxis and says so locally.
2. **Write boolean settings as complete questions.** `Is there a period when the guest can cancel free of charge?` with Yes/No beats `Free cancellation period` with a toggle. The setting becomes self-documenting when read back, and needs no hint text.
3. **Define a policy by what the guest is told, not by what you collect.** "Let guests know if they can cancel their bookings free of charge, and, if so, until when." One frame, reused for every policy type, guest-first even in B2B copy.
4. **Name three money states and attach each one's reversal condition.** `Pre-authorization` / `Deposit or prepayment` / `test payment`, each with what happens to the money and when it comes back, opened by "The charge you see could be any one of the following:". Directly applicable to PayPal's authorisation-vs-capture-vs-hold explanations.
5. **Argue for generosity in the other party's own currency.** The fee-waiver case is made entirely as "fewer complaints, more repeat bookings", never as fairness — then hands control back explicitly ("entirely up to you"). The template for any copy asking one side of a marketplace to absorb a cost.
6. **Close the system loop in the recovery instruction.** "After the guest has been relocated… **we'll cancel the original booking**." Tell the user what *you* will do and when, so they don't do it themselves and cause a second failure.
7. **Split "how do I" from "why would I" into different content types with different URLs and different feedback prompts.** Booking's `/help/` (numbered click-paths, `Is this article helpful?`) and `/solutions/` (conceptual argument, `What do you think of this page?`) never duplicate each other.
8. **Give the exclusion its own paragraph and name the moment it bites.** "It doesn't include any extra coverage you buy **when you get to the rental counter**." Naming the moment of the upsell is more useful than naming the category.
9. **Offer the supplier as a peer support channel and concede where they are better.** "Contact the property — For details about your stay, **they usually know best**." Costly to say, and it routes the user correctly.
10. **Answer a specific question with the general rule about where the answer lives.** "Pet policies are **always** displayed on the property's page under 'House rules.'" One answer that works for every property, instead of one that works for none.
11. **Publish your recommended default, with a number.** "Generally speaking, we recommend allowing guests to cancel for free until 1 or 2 days before check-in." Hedged opinion beats no opinion when the reader has to choose a configuration.

## Caveats & gaps

- **`www.booking.com` is substantially blocked for text extraction.** Eleven consumer URLs returned empty bodies, and the pages that did return are missing headings, FAQ question labels and the brand token. **The consumer-side content in this file is therefore a partial sample, weighted toward the secondary verticals (cars, taxis, attractions) that happened to render.** The Stays storefront — the core product — contributed almost nothing.
- **All consumer FAQ questions are absent.** Question *labels* were stripped on both `/customer-service.html` and `/cars/index.html`; only answers survived. T12 therefore inverts the schema's normal rule (questions verbatim, answers summarised): here the answers are quotable and the questions are not. Topic sequences in T12 are **reconstructed from the answers and labelled as such** — they are not verbatim question text.
- **The consumer help centre was never reached.** Category tree, article titles and self-service routing are `[absent]`. Only the Customer Service routing page above it was captured.
- **No booking-status vocabulary was observed on the consumer side.** Guest-facing state names (whatever Booking shows in `Trips` — confirmed, cancelled, completed, or otherwise) are **not recorded in this file because they were not seen.** Everything in T6 is either partner-side or from an FAQ answer body. No state name has been inferred.
- **Consumer terms of service not analysed.** `/content/terms.html` returned ~87,000 characters, exceeding the analysis budget for this pass. It was not read, and no claim in this file derives from it. The `Regulatory posture` row is left empty for that reason.
- **No accessibility statement found.** Two guessed URLs returned empty and no footer link survived. This is a gap in the harvest, not a confirmed absence.
- **No empty states, no in-product notifications, no validation copy.** `[absent]`.
- **No search-results page was loaded** on any vertical, so filter labels, sort labels, availability-pressure copy ("Only 2 rooms left"), review-score labels and the price-breakdown panel are all unharvested. Booking's benchmark strength is *dense decision and availability content*, and that content lives almost entirely on the results page — **this is the most significant gap in the file.**
- **Partner side is over-represented.** Five of the ten usable pages are `partner.booking.com`. Conclusions about Booking's voice should not be generalised from the partner register, which is a distinct product with a distinct audience.
- Three partner articles that search identified as relevant (guest cancellation requests, double-bookings, relocating guests) returned empty.
- **Mobile app copy** is out of the public web surface.

## Sources

1. https://www.booking.com/
2. https://www.booking.com/customer-service.html
3. https://www.booking.com/genius.html
4. https://www.booking.com/cars/index.html
5. https://www.booking.com/taxi/index.html
6. https://www.booking.com/attractions/index.html
7. https://www.booking.com/content/terms.html *(retrieved, not read)*
8. https://partner.booking.com/en-gb/help
9. https://partner.booking.com/en-us/help/policies-payments/policies/setting-cancellation-policies
10. https://partner.booking.com/en-us/solutions/cancellation-deposit-and-prepayment-policies
11. https://partner.booking.com/en-us/help/reservations/reduce-cancellations/handling-cancellation-fees-and-commission
12. https://partner.booking.com/en-us/help/rates-availability/rates-special-offers/setting-non-refundable-rate
13. https://partner.booking.com/en-us/help/reservations/overbookings-no-shows/can-bookingcom-help-me-overbooking

**Attempted and returned empty (recorded as blocked):**
https://secure.booking.com/help.html ·
https://www.booking.com/content/help.en-gb.html ·
https://www.booking.com/content/about.html ·
https://www.booking.com/general.html?tmpl=docs/how_we_work ·
https://www.booking.com/tpi_faq.html ·
https://www.booking.com/accessibility.html ·
https://www.booking.com/reviews.html ·
https://www.booking.com/trip/index.html ·
https://partner.booking.com/en-gb/help/reservations ·
https://partner.booking.com/en-us/help/reservations/reduce-cancellations/handling-cancellations-and-guest-cancellation-requests ·
https://partner.booking.com/en-us/help/reservations/overbookings-no-shows/all-you-need-know-about-double-bookings
