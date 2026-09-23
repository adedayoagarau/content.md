# 086. KAYAK

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Travel metasearch (flights, stays, cars, packages, cruises) — a comparison layer that is explicitly **not** the merchant of record |
| Primary URL | https://www.kayak.com/ |
| Corpus rank | 086 |
| Benchmark strength (source list) | Filters and fare distinctions |
| Locale / market observed | en-US (`United States (English)`), with a 70+ locale switcher present |
| Platform observed | Web (desktop): consumer help centre, `Travel Hacker Blog`, Trips and Flight Tracker front doors, KAYAK for Business help centre, accessibility statement |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | CCPA (`Do Not Sell or Share My Info`, opt-out toggle on every page); European Accessibility Act; WCAG 2.2 and EN 301 549 cited as conformance targets; owned by `Booking Holdings, Inc. (NASDAQ: BKNG)`; partner vetting via `Know Your Partner (KYP)` and a `Supplier Code of Conduct` |
| Harvest date | 2026-09-21 |
| Pages inspected | 18 URLs retrieved (15 distinct destinations; 3 were 301s onto already-covered pages); 5 blocked |
| Harvest completeness | **Partial — significant.** The live search-results surface, where fares are actually filtered and compared, was not reachable. `/flights`, `/c/help/search/` and `/airline-fees` all exceeded the fetch size limit; `/price-alerts` and `/bookings` returned empty client-rendered shells. Filter and fare-type vocabulary below is drawn from help copy and a blog explainer, i.e. **KAYAK describing its own UI**, not from the UI |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help centre index | https://www.kayak.com/c/help/ | 5 category cards + a `Links` card; hero; feedback prompts |
| Help: Pricing & Price Alerts | https://www.kayak.com/c/help/pricing/ | Richest single page — fee disclosure, `Fee Assistant`, `Fare Comparer`, `Hacker Fare`, Price Forecast |
| Help: Booking & checkout | https://www.kayak.com/c/help/bookings/ | Failure-recovery FAQs, refunds, chargebacks, "not the merchant" copy |
| Help: About KAYAK | https://www.kayak.com/c/help/about/ | Ranking-and-revenue disclosure, services list, scam content |
| Help: Account management & Trips | https://www.kayak.com/c/help/account-trips/ | Notification taxonomy, sharing states, currency/region |
| Accessibility statement | https://www.kayak.com/c/accessibility-statement/ | WCAG 2.2 / EN 301 549 commitments, three pillars, testing stack |
| Blog: flight classes | https://www.kayak.com/news/flight-classes/ | Cabin classes, fare classes, booking codes, four-column inclusion table |
| Blog: flight filters | https://www.kayak.com/news/flight-filters/ | Named filter facets — the closest thing to a live filter rail |
| Blog: basic economy change fees | https://www.kayak.com/news/no-change-fees-basic/ | Basic Economy vs standard economy change-fee divergence |
| K4B help home | https://www.kayak.com/business/help-center/ | Two-branch audience IA |
| K4B: For Admins | https://www.kayak.com/business/help-center/admins/ | 8 admin guides |
| K4B: For Travelers | https://www.kayak.com/business/help-center/travelers/ | 6 traveller guides in 2 groupings |
| K4B: Changes & Cancellations | https://www.kayak.com/business/help-center/travelers/changes-cancellations/ | `Unused Tickets`, `Biz+` vocabulary |
| Trips front door | https://www.kayak.com/trips | Real global nav + full footer; signed-out zero state |
| Flight Tracker | https://www.kayak.com/tracker | The only live search form retrieved |
| (301) Price trend | https://www.kayak.com/price-trend-explanation | → `/c/help/pricing/` |
| (301) Company | https://www.kayak.com/c/company | → `/c/help/about/`, but served an **SEO title variant** — see T12 |
| (301) Trips help | https://www.kayak.com/help/tripshelp | → `/c/help/account-trips/` |
| **BLOCKED** Flights landing | https://www.kayak.com/flights | Oversized (~60,700 chars) |
| **BLOCKED** Help: Search & discovery | https://www.kayak.com/c/help/search/ | Oversized (~74,100 chars) — the category most likely to hold filter and sort copy |
| **BLOCKED** Airline fees | https://www.kayak.com/airline-fees | Oversized (~136,200 chars) — significant loss for baggage-fee disclosure |
| **BLOCKED** Price alerts | https://www.kayak.com/price-alerts | Empty client-rendered shell |
| **BLOCKED** Bookings | https://www.kayak.com/bookings | Empty client-rendered shell, auth-gated |

---

## T1 Navigation & IA labels

**Global primary nav — six verticals, one of which is a capability** `[observed]`
(https://www.kayak.com/trips, https://www.kayak.com/tracker)

`Flights` · `Stays` · `Cars` · `Packages` · `Cruises` · `Plan with AI`

Five are inventory nouns; the sixth is a verb phrase. `Plan with AI` sits in the
same row as `Flights` because KAYAK is asserting AI as a vertical rather than a
feature — a positioning decision expressed purely through nav placement.

`Stays` (not "Hotels") is the nav label, while `/hotels` paths and the phrase
`Hotels & Stays` appear in body copy and the services list. Three surfaces, three
names for one vertical.

**Global secondary nav** `[observed]`:
`Plan your trip` · `Airfare Trends` · `Monthly Flight Deals` · `Explore` ·
`Flight Tracker` · `Travel tips`

**Utility** `[observed]`: `Ask AI` · `Sign in` · `Trips` · `English` ·
`United States (English)`. `Ask AI` appears on `/trips` but not on `/tracker` —
inconsistent placement of the AI entry point.

**Footer — three groupings, plus a legal strip** `[observed]`

| Group | Items |
|---|---|
| `Company` | `About` · `Careers` · `Mobile` · `Blog` · `How we work` |
| `Contact` | `Help/FAQ` · `Press` · `Affiliates` · `Hotel owners` · `Partners` · `Advertise with us` |
| `More` | `Airline fees` · `Airlines` · `Low fare tips` · `Badges & Certificates` · `Security` |
| Legal strip | `©2026 KAYAK` · `Do Not Sell or Share My Info` · `Privacy` · `Terms & Conditions` · `Ad Choices` |

`Help/FAQ` filed under `Contact` rather than in its own group is a revealing
placement: support is modelled as a contact channel, not as a self-service
library. And `How we work` / `Low fare tips` are **friendlier footer synonyms for
help-centre pages whose own titles are drier** — the footer is doing editorial
work the help centre is not.

**Help-centre top level — five categories, each with a scope deck** `[observed]`
(https://www.kayak.com/c/help/)

| Category | Deck (verbatim) |
|---|---|
| `Search & discovery` | "Help with flight, hotel & car searches, plus our app, Explore & AI tools." |
| `Pricing & Price Alerts` | "General pricing, Price Forecast & Price Alert FAQs." |
| `Booking & checkout` | "Answers about bookings, payments & changing plans." |
| `About KAYAK` | "Who we are, what we do & how we protect your data." |
| `Account management & Trips` | "Trips, passwords, currency & account help." |

Plus a sixth `Links` card holding `KAYAK for business` · `Airlines` · `Careers` ·
`KAYAK awards` — a nav-overflow bucket dressed as a category.

The decks follow one grammar: a comma-run of contents ending in a plural noun.
They are genuinely useful for self-routing — but they are also where the
ampersand problem starts.

**Negative finding — four naming systems for five categories** `[observed]`

| Surface | Rendering |
|---|---|
| Index cards | `Search & discovery`, `Pricing & Price Alerts`, `Booking & checkout` |
| In-page side nav | `Search and discovery`, `Pricing and price alerts`, `Booking and checkout` — but `Account management & trips` keeps the ampersand |
| Page H1 | `Pricing and Price Alerts.`, `Booking and checkout.`, `About KAYAK.`, `Account management and Trips.` — all terminated with a full stop |
| KAYAK for Business | Title Case throughout: `How to Book`, `Booking Paths`, `Changes & Cancellations` |

Ampersand vs "and", sentence case vs Title Case, and capitalisation of the second
noun all vary between the card, the side nav and the H1 **for the same category on
the same page**. This is the clearest governance failure in the file.

**In-page help nav labels** `[observed]`: `Navigation` · `FAQ Home` · `Categories`.
`FAQ Home` is a third name for the help centre, after `Help/FAQ` (footer) and
`Help Center` (K4B).

**KAYAK for Business — audience-split IA** `[observed]`
(https://www.kayak.com/business/help-center/): `Help Center Home` · `For Admins` ·
`For Travelers`. Two audiences, two branches, no shared content. A clean
structure that the consumer estate does not use.

## T2 Value proposition & headline patterns

**House style: declarative headings terminated with a full stop, even as fragments** `[observed]`

`Browse by category.` · `Questions & feedback.` · `Booking process.` ·
`Manage your booking.` · `Payments.` · `Refunds.` · `Price Alerts.` ·
`Price Forecast.` · `Understanding prices.` · `Saving money with KAYAK.` ·
`Accessibility at KAYAK.` · `Ways we make KAYAK accessible.` · `Bottom line.` ·
`Flight classes explained: Airline fare differences to know.`

A single-word H2 with a full stop (`Payments.`, `Refunds.`) is a deliberate and
unusual choice. It reads as a label rather than a heading, and it is applied
consistently enough across help and blog that it is clearly a documented style
rule rather than drift.

**Help centre hero** `[observed]`: H1 `How can we help?` — the generic form, with
the differentiation pushed into a summary line about accounts, bookings and tools.
The page furniture does more work than the headline: `From searching to saving,
we've got you.`

**Trips positioning is built on two disclosures, not two benefits** `[observed]`
(https://www.kayak.com/trips)

> H1: `An easier way to manage your trips`
> `We make it super easy to schedule, organize and travel with friends or family.`
> `Trips is free — and available to use no matter where you book.`

The second line is the whole argument, and both halves of it are concessions:
*free*, and *works even if you booked elsewhere*. For a metasearch product whose
core anxiety is "why would I use the middleman", leading with the absence of
lock-in is the correct move.

Section headers continue in benefit-clause form: `Trips keeps all your plans in
one place for a stress-free adventure.` · `Stay informed about unexpected
changes` · `Collaborate together` · `Get ready for your next adventure`.

**Accessibility page headers are commitments, not features** `[observed]`:
`Our commitment to inclusive access.` · `Ways we make KAYAK accessible.` ·
`Continuous monitoring and improvements.` · `Help us get better.`

The last one inverts the usual direction — an accessibility page ending by asking
the user for help rather than by listing what has been done.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign in to plan better` | Trips hero, repeated at page foot | Benefit is stated **in the button**, not beside it |
| `Find my bookings` | Trips hero, secondary | First-person possessive |
| `Start planning` · `Start collaborating` | Trips panels | Verb + gerund |
| `Add your bookings automatically` | Trips panel | The adverb is the selling point |
| `Track Flight` | Flight Tracker submit | Title Case; the verb repeats the page name |
| `Get in touch` | Foot of every help page | |
| `Notify us about a price issue.` | Help-centre footer, bolded, **with a full stop** | A CTA punctuated as a sentence |
| `Contact us` | Accessibility statement | Different label, same action as `Get in touch` |
| `Find cheap flight deals` · `Search flights on KAYAK` · `Start your search` | Inline and end-of-article blog CTAs | Three labels for one destination |
| `Browse our admin guides` · `Browse our traveler guides` | K4B home | Audience named in the button |
| `Sign up` | Newsletter | |
| `Search` / `Search articles and guides` | Blog search | |
| `Discover all` | Blog mega-menu, once per category | Repeated ~6 times in one menu, no object |
| `More` | End of K4B article | Bare expander |
| `Skip to main content` | First link on every page | **Two different anchor targets** — see T14 |
| `Do not sell my info` (toggle, state `ON`) | Privacy banner | See T10 |

**In-product button names, as KAYAK describes them in help copy** `[documented]`:
`Track prices` (flight results toggle) · `Set Price Alert` (hotel results, top
right) · `Book` · `Book on KAYAK` · `Manage Booking` · `Merge into another trip` ·
`Share` / `share this Trip` · `May edit this trip` ·
`Automatically share new trips with…` · `Add nearby airports` · `Show` ·
`Delete Account` · `Sign out` · `Ask your question` · `Price Alerts` (account menu)
· `confirm` (email verification) · `unsubscribe` (email footer).

**Observation.** KAYAK's best CTAs put the *reason* in the label
(`Sign in to plan better`, `Add your bookings automatically`,
`Browse our admin guides`). Its worst repeat a bare `Discover all` six times in
one menu. The discipline is present in product surfaces and absent in editorial ones.

## T5 Filter & search-field labels — PRIORITY

This is the benchmark strength and it is the section most damaged by the blocked
pages. Read the evidence markers carefully.

**Live form labels actually observed** `[observed]` — only one form was retrievable:

| Label | Source |
|---|---|
| `Flight number` | https://www.kayak.com/tracker |
| `Airport` | https://www.kayak.com/tracker |
| `YYYY-MM-DD` (date placeholder) | https://www.kayak.com/tracker |
| `Track Flight` (submit) | https://www.kayak.com/tracker |
| `Email address` (newsletter) | `/news/*` |
| `Search for` / `Search articles and guides` | `/news/flight-filters/` |
| `Search for a country or language` | Locale switcher, `/trips`, `/tracker` |

The flights, stays and cars search forms are `[absent]` from this harvest.

**Flight filter facets — named as H2s in KAYAK's own filter explainer** `[documented]`
(https://www.kayak.com/news/flight-filters/)

| Facet | Deck KAYAK wrote for it |
|---|---|
| `Stops` | "Minimize (or maximize) your layovers." |
| `Times` | "When timing is everything." |
| `Layover Airports` | "Turn your stopover into a mini vacation." |
| `Flight Duration` | (body calls it the `Duration filter`) |
| `Airlines` and `Booking Sites` | "Decide who to book with." |
| `Price` and `Cabin Class` | "When all you care about is price." (body: `Cabin filter`) |
| `Wi-Fi` | "When you need to stay connected." |

Two things worth extracting. First, **`Stops` is decked with "Minimize (or
maximize)"** — KAYAK acknowledges that a filter most products treat as
one-directional (fewer stops = better) is actually bidirectional, because a long
layover can be the point. That parenthetical is the whole insight.
`Layover Airports` gets the same treatment: "Turn your stopover into a mini
vacation" reframes a cost as an opportunity. Filter decks that argue *why you
would use this* are rare and are the reusable move here.

Second, **the same facet has two names in one article**: `Flight Duration` in the
heading vs `Duration filter` in the body; `Cabin Class` in the heading vs
`Cabin filter` in the body. Even the explainer is not internally consistent.

**Filter and sort dimensions named in help copy** `[documented]`

- Flights: filter and sort by `airline`, `price`, `stops`, `duration`,
  `baggage allowance` (`/c/help/pricing/`); refine by `price`, `flight duration`,
  `travel class` (`/c/help/about/`) — note `travel class` here vs `Cabin Class`
  in the blog, a third term for the same facet
- Hotels: sort by `price`, `hotel class`, `review score`, `distance`; filter by
  `price`, `star rating`, `distance`, `amenities` (`/c/help/about/`) — `hotel
  class` in the sort list and `star rating` in the filter list are the same thing
- Packages: `Sort by price, star rating, or guest reviews`;
  `Filter by amenities, location, or property type`
- Cars: `car type`, `transmission`; price sorts `lowest price` / `highest price`
- Hotels amenity path: `Amenities` → `Services` → `Airport shuttle`

**Sort labels** `[documented]` (`/c/help/about/`): flights default to
`"Best" or "Recommended"`; hotels and packages default to `"Recommended"`; cars
have **no** default ranking — "without applying a specific default ranking like
'Recommended' or 'Best.'" `Best` is defined as "the best trade-off between price
and convenience". A `Quickest` sort label is `[absent]` — looked for, not found on
any page retrieved.

**Search-form inputs named in help copy** `[documented]`: `origin`, `destination`,
`dates`, `number of guests/passengers`, `cabin class`. Limits stated as
`9 passengers` at a time, rising to `up to 16 travelers when including children`.

## T5b Fare-type vocabulary — HIGHEST PRIORITY

**Cabin class names** `[documented]` (https://www.kayak.com/news/flight-classes/)

`Economy Class` · `Premium Economy` · `Business Class` · `First Class`, with short
forms `Economy` / `Premium` / `Business` / `First` used inside the pricing table.
KAYAK glosses Economy with its synonyms — `standard or main cabin seats`, and
parenthetically `(and, previously, coach)` — which is the right instinct: naming
the retired term stops an older traveller from thinking a different product is
meant. Business + First are grouped as `premium class travel`.

**Fare-type names, as distinct from cabin names** `[documented]`

| Term | Where |
|---|---|
| `Basic Economy` | `/news/flight-filters/`, `/news/flight-classes/`, `/news/no-change-fees-basic/`, `/c/help/pricing/` |
| `Basic Economy Fares` | The filter-facing plural: `Choose to see only Basic Economy Fares` |
| `standard economy` | `/news/no-change-fees-basic/` — lowercase, the deliberate contrast term |
| `Economy` as the contrast to Basic | `/c/help/pricing/`: `your fare options (like Basic Economy vs Economy)` |
| `branded fares` | `/c/help/about/`, in the KAYAK for Business feature `Compare branded fares` |
| `Full-fare Economy-Class ticket` etc. | `/news/flight-classes/` |
| `Main Cabin` | **`[absent]`** — not seen on any KAYAK URL retrieved |

Note the casing: `Basic Economy` is capitalised as a proper fare-brand name;
`standard economy` is lowercase as a descriptive category. That distinction is
correct — one is a product airlines sell, the other is a class of products — and
it is maintained consistently across three pages.

**Fare class / booking-code vocabulary** `[documented]` (`/news/flight-classes/`)

KAYAK teaches the underlying airline vocabulary rather than hiding it:
`fare classes`, `booking codes`, `booking classes`, `fare basis code`,
`one-letter codes`. Four codes are given verbatim:

| Code | Meaning |
|---|---|
| `Y:` | `Full-fare Economy-Class ticket` |
| `W:` | `Full-fare Premium Economy Class ticket` |
| `J:` | `Full-fare Business-Class ticket` |
| `F:` | `Full-fare First-Class ticket` |

Economy sub-classes are listed (`Y, M, K, and L in Economy`) with the note that
`some carriers use P or E instead` for Premium Economy. The fare basis code is
said to govern five things, listed as a clean parallel set: `Possibility for a
refund` · `Cancellation or change penalties` · `Advance purchase requirements` ·
`Seasonal pricing rules` · `Upgrade eligibility`.

**The bounding caveat is the important string**: `you can't directly compare
booking codes between airlines.` KAYAK teaches a vocabulary and then immediately
disables the wrong inference a reader would draw from it. That claim-then-bound
move is the same shape as Wise's footnotes, applied to terminology rather than to
numbers.

**What a fare includes and excludes — the row labels are the inclusion taxonomy** `[documented]`

From the four-column comparison table at `/news/flight-classes/`, the seven rows
are: `Seat type` · `Space` · `Meals` · `Baggage` · `Lounge access` ·
`Boarding and check-in` · `Extras`.

Economy exclusion phrases, verbatim and short:

- `Narrow seats, limited recline (2–3 inches), last to board`
- `28–32" pitch, limited legroom, often no early seat selection`
- `Carry-on + personal item; checked bags often extra on domestic`
- `Not included (unless via status or paid)` — lounge access
- `Last to board; limited check-in flexibility`
- `seat choice often paid`

Against Premium Economy (`1–2 checked bags usually included; priority baggage`,
`Priority boarding and check-in`), Business (`2 checked bags standard, priority
handling`) and First (`2–3 checked bags, top priority handling`,
`Dedicated check-in line, fastest boarding, minimal wait time`).

**The exclusion copy is hedged, and deliberately.** `often extra`,
`usually included`, `often no early seat selection`, `often paid`,
`unless via status or paid`. KAYAK is describing an industry, not a product it
controls, and the hedges are doing honest work — a flat "not included" would be
wrong for some carriers. The cost is that the user cannot act on any single row
without checking their specific fare. `Not included (unless via status or paid)`
manages this best: it states the default and names both escape hatches in four words.

**The fare-choice moment, named and productised** `[documented]` (`/c/help/pricing/`)

- Tool name: `Fare Comparer` — a side-by-side breakdown of what each fare includes
- The three dimensions it compares: `checked bags, seat selection and flexibility`
- The framing of the hand-off, verbatim: "with a clear list of what's included and
  what's not, before sending you off to book."
- Add-on comparability names `luggage allowances, change fees, and other services`
- Add-ons enumerated repeatedly as `checked bags, carry-ons (on some airlines),
  seat selection and pet accommodations`

`before sending you off to book` is a striking admission to put in the middle of
a benefit sentence. KAYAK names the exact point at which it stops being
responsible, inside the sentence describing the value it adds.

**Basic Economy restrictions** `[documented]`

- `Some discounted fares, such as Basic Economy tickets, may earn reduced or even zero miles.`
- `some discounted or sale fares are ineligible for upgrades.`
- The general rule, stated as a principle:
  `Generally, the cheaper the fare class, the more restrictions it comes with.`
- `/news/no-change-fees-basic/` is built entirely on the divergence: airlines
  ended the extension of `"no change fees"` policies to basic economy while
  retaining them for standard economy and above. **KAYAK puts the airlines'
  policy name in quotation marks** — signalling it is a marketing phrase being
  reported, not a guarantee being made.
- The decision framing: "we'll show you what fare classes are available, allowing
  you to compare and decide if the price difference is worth the extra perks."

**`Fee Assistant` and its disclaimer** `[documented]` (`/c/help/pricing/`)

The tool estimates baggage and payment fees from the provider's own pricing. The
disclaimer is prefaced with the label `**Important:**` and is two flat sentences:

> `Fee Assistant does not add baggage to your reservation.`
> `It's a planning tool only.`

This is the correct handling of a metasearch capability gap. The tool looks like
it manages your bags; it does not; the copy says so in seven words, twice, before
anything else. `It's a planning tool only.` is the single most transferable
sentence in this file for any product that shows a number it does not control.

## T6 Status & state language

All `[documented]` — no live status UI was reachable.

**Price Alert states** (`/c/help/pricing/`): `active` · `expire` /
`expiration email` · `pause an alert temporarily` · `delete a Price Alert
completely` · `delivery settings` · `Real-time alerts` · `Daily`.

The pause/delete pair is worth noting: two distinct terminal actions with
different words (`pause` + `temporarily`, `delete` + `completely`), each carrying
a redundant adverb that removes the ambiguity a bare verb would leave.

**Trip and flight status — the notification taxonomy is the state vocabulary** `[documented]`
(`/c/help/account-trips/`)

`24-hour check-in reminder` · `3-hour on-time departure reminder` ·
`Flight delays and cancellations` · `Gate and terminal changes` ·
`Connection information` · `On-time arrival updates` · `Baggage claim information`

Seven notification types, and the ordering is chronological across the journey —
check-in, departure, disruption, gate, connection, arrival, bags. A user reading
the settings list is reading their own trip in sequence, which makes the list
self-explaining.

**Sharing states** (`/c/help/account-trips/`): `View access` — glossed inline as
"They can see the trip but not make changes" — vs `Edit access`, with
`private by default` and `collaborator`. Naming the permission and then glossing
it in plain words on the same line is the right pattern for any access control.

**Business booking states** (`/business/help-center/travelers/changes-cancellations/`):
`Unused Tickets` · `unused ticket credits` · `rebookable voucher` ·
`cancel or reschedule` · `before expiry` · `Biz+`.

The state is surfaced to the user as a capability, not as a label:
`The trip will indicate if you can cancel or reschedule the booking.` The user is
told what the screen will tell them, rather than being given a status word to
interpret.

**Account states**: `verification codes` (replacing passwords), `passkey`,
`Sign out`, `Delete Account`.

## T7 Error, failure & recovery — PRIORITY

No error UI was reachable, but the help-centre article titles **are** the error
vocabulary, and they are unusually good.

**First-person, problem-first titles** `[observed]` (`/c/help/bookings/`)

- `I didn't get my booking confirmation. What now?`
- `I entered the wrong email address when booking. Help.`
- `My card was charged but I didn't get a confirmation. What should I do?`
- `I was overcharged. What should I do?`
- `Where is my car rental reservation?`
- `My receipt isn't showing up. What should I do?` (`/c/help/account-trips/`)

Three shapes, all in the user's voice. The standout is
`I entered the wrong email address when booking. Help.` — a two-sentence title
whose second sentence is the single word `Help.` That is a person's actual
utterance, and it is a better findability token than any keyword phrase.

`My card was charged but I didn't get a confirmation` is the other model title:
it names **two facts and the contradiction between them**, which is exactly how
the user holds the problem. Most help centres would file this as "Missing
confirmation".

**"Why doesn't X match Y" titles for the metasearch-specific failure** `[observed]`

- `Why doesn't the price on the provider website match the price on KAYAK?`
- `Why doesn't the price on the provider website match the price on KAYAK Explore?`
- `How do I report an inaccurate price?`
- `Why can't I see the Price Forecast graph in my search results?`

Price mismatch is KAYAK's signature failure and it gets two articles, split by
surface. The recovery copy is the interesting part:

> `These price differences aren't fraud – they're just part of how travel pricing works.`

KAYAK names the accusation the user is privately making and denies it directly.
Most products would write "prices are subject to change". Naming `fraud` — the
word in the user's head — and then reframing is a genuinely bold choice, and it is
the right one when the alternative is the user assuming a bait-and-switch.

**Recovery micro-strings** `[observed]` (`/c/help/bookings/`)

`First, check your spam folder.` · `Not sure who the provider is?` ·
`Not sure which provider you booked with? Here's how to find out:` ·
`Report an inaccurate price form` · `Price inaccuracy feedback form`

The two `Not sure…?` strings are **pre-emptive branch points**: the article
anticipates that the user cannot complete the instruction it just gave (contact
the provider) because they do not know who the provider is, and forks there.
That is the right place for a question — immediately after the instruction that
will fail.

**The hard disclosure inside a recovery path** `[observed]`:
`KAYAK can cancel any travel reservation if you file a chargeback` — stated under
the heading `Thinking about a credit card chargeback?`. A consequence warning
placed in the article for the action it warns against, phrased as a question in
the user's own deliberation.

**`[absent]`**: no-results copy, validation messages, and every in-product error
string. The two surfaces that would carry them (`/price-alerts`, `/bookings`)
returned empty shells.

## T8 Empty states

One captured `[observed]`, and it is a signed-out zero state rather than a true
empty state: the Trips front door (https://www.kayak.com/trips) replaces the trip
list with `Sign in to plan better` / `Find my bookings`, under the section header
`Get ready for your next adventure`.

The pattern worth noting: the zero state offers **two doors** — authenticate, or
recover bookings you may already have without realising. For a product that
ingests bookings from email, `Find my bookings` is the more valuable of the two
and is correctly given secondary rather than tertiary placement.

All other empty states `[absent]` — see Caveats.

## T9 Notifications & system messages

**Price Alert notification design, disclosed to the user** `[documented]`
(`/c/help/pricing/`)

- Trigger threshold, verbatim: `typically a 10% increase or drop, since your last update.`
- Bundling, verbatim: `We bundle all your active alerts into one email or push notification`
- Timing: `usually sent in the early morning.`
- Expiry warning: `We'll send an expiration email ahead of time as a heads-up.`
- Channels: `email or push notification`, `Push notifications`, `Text messages`,
  `real-time Price Alerts`
- Opt-out: `Reply STOP to any KAYAK text message`

Publishing the **numeric trigger threshold** (`10%`) and the **bundling rule** is
unusual and good. A user who gets no alert for a week can work out why without
contacting support, and a user who gets one alert covering six routes understands
it is not a bug.

**Banners observed** `[observed]`

- Privacy banner, every page: heading `We value your privacy`, toggle
  `Do not sell my info` shown in state `ON`, footnote opening
  `The definition of "sale" under the California Consumer Privacy Act…`
- Nearby-airports prompt (`/c/help/pricing/`):
  `Look for the "Add nearby airports" option or banner` → `Click "Show"`
- Help-centre persistent footer prompt: `Found a price that doesn't match up?` →
  `Notify us about a price issue.`
- Newsletter banner (`/news/*`): `Want to know the world better? We got you covered.`

## T10 Disclosures, legal & compliance

KAYAK's disclosure estate is the strongest part of its content and also the most
inconsistent. Both facts matter.

**Taxes and fees — stated as four separate rules, one per vertical** `[observed]` (`/c/help/pricing/`)

- `All flight prices on KAYAK include applicable taxes and fees.`
- `Flight prices shown on KAYAK do not include baggage fees.`
- `The displayed prices cover the base fare, applicable taxes and mandatory fees`
- `Car rental prices on KAYAK don't automatically include taxes, airport fees or insurance.`
- `Explore prices include taxes and fees but may not include baggage fees charged by carriers.`

The **include / do-not-include pair for flights, stated as two adjacent
sentences**, is the model. One sentence cannot carry both, and splitting them
means neither is subordinate to the other.

**Fee ownership disclaimed explicitly** `[observed]`:
`KAYAK does not collect baggage fees.` followed by
`These charges go directly to the airline or booking provider you choose.`
Again a two-sentence structure — the negation first, the destination second.

**Explore recency framing** `[observed]`: prices are `prices that other users
found in the last 48 hours` and are `snapshots of recent deals rather than
guaranteed fares.` `Snapshots` is doing precise work: it concedes staleness
without conceding unreliability.

**The "we are not the merchant" disclosure — six phrasings** `[observed]`

Across `/c/help/bookings/`, `/c/help/about/` and `/c/help/pricing/`:

- `KAYAK is a search engine, not a booking agent.`
- `KAYAK is a travel search engine, not a travel agent.`
- `KAYAK is a metasearch engine, not a booking site.`
- `KAYAK is a search engine, not the seller.`
- `KAYAK is a search engine, not a travel agency or merchant`
- `KAYAK is not the booking or service provider.`

Plus the supporting lines `We don't handle bookings or payments directly` and
`You never pay KAYAK directly for flights or hotels`, and the named exception
`This is listed as the "Book on KAYAK" option in the search results.`

**This is the sharpest consistency defect in the harvest.** The *structure* is
right — the Wise "state what you are not, first" pattern, applied to a business
model rather than a licence. Every instance leads with the negation. But six
formulations of one legally-significant claim, each pairing a different subject
noun with a different contrast noun, means no single form can be trusted as the
canonical one, and the exception (`Book on KAYAK`) contradicts several of them.

**Commercial and ranking disclosure — unusually candid** `[observed]` (`/c/help/about/`)

- `Does KAYAK charge commission?` → `No, KAYAK does not charge you a commission or any extra fees.`
- `KAYAK may earn a commission from that partner.` / `This doesn't cost you extra.`
- `Commission models include per-click or per-booking.`
- Sponsored content: `sponsored listings, which are always clearly labeled.`
- **Ranking bias, stated as a ranking factor**: `And sometimes our expected revenue`
  — listed alongside price and popularity. For hotels:
  `Average revenue potential for KAYAK`. For packages: `We also factor in the
  average revenue potential for us from each package result.`
- The counter-incentive, verbatim:
  `Providers that aren't upfront about fees are less likely to be recommended.`
- Coverage bound: `results may not always reflect all available deals.`

Disclosing revenue as a ranking input is the strongest disclosure in this file.
Note the construction: `And sometimes our expected revenue` is appended to a list
of user-serving factors, sentence-initially, as an afterthought — which softens it
considerably. The content is honest; the placement is not neutral.

`Providers that aren't upfront about fees are less likely to be recommended.` is
worth stealing outright: it converts a ranking policy into a public incentive
aimed at suppliers, in one sentence, on a consumer help page.

**Forecast disclaimer** `[observed]` (`/c/help/pricing/`):
`Predictions based on past history can never be perfect, so we can't guarantee
they'll be correct`, mitigated by `we also let you know the confidence of the
statistical analysis.` Claim, bound, then route to a per-instance confidence
figure — the Wise pattern exactly.

**Regulatory strings** `[observed]`

- CCPA: `California consumers have the right to opt out of the sale* of their
  personal information.` (asterisk in original) + footer `Do Not Sell or Share My Info`
- `This accessibility statement applies to the portions of our platform covered by
  the European Accessibility Act.` — a **scoping** sentence, conceding the
  statement does not cover everything
- Standards named: `Web Content Accessibility Guidelines (WCAG) 2.2`, `EN 301 549`, `W3C`
- Ownership: `owned by Booking Holdings, Inc. (NASDAQ: BKNG)`
- Partner vetting: `Know Your Partner (KYP)`, `Supplier Code of Conduct`

## T11 Help-centre architecture

**Consumer: five categories, each a single long page.** Article "titles" are H3s
on that page, not separate URLs. This is a deliberate SEO-and-scannability
trade-off: everything about pricing is on one scrollable page, so no routing
decision is required once the category is chosen, but there is no deep-linkable
article and no per-article feedback.

**Article-title grammar — five shapes** `[observed]`

| Shape | Example |
|---|---|
| `How do I …?` | `How do I create a Price Alert?` · `How do I report an inaccurate price?` |
| `How does KAYAK …?` | `How does KAYAK rank flights?` · `How does KAYAK get prices?` |
| `What is/are …?` | `What's a Hacker Fare?` · `What is KAYAK Trips?` |
| `I <did/experienced X>. <Question>.` | `I was overcharged. What should I do?` |
| `Why …?` / `Where …?` | `Why doesn't the price… match…?` · `Where is my car rental reservation?` |

The `How does KAYAK …?` cluster is the distinctive one — five articles
(`rank cars`, `rank flights`, `rank hotels`, `rank Packages`, `get prices`) about
the company's own mechanics, filed under `Content recommendation and ranking.`
A metasearch product's central trust question is "why am I seeing this result",
and KAYAK has built an IA branch for it.

**KAYAK for Business — the audience split done properly** `[observed]`

`For Admins` (8 cards, each with a deck): `Step-by-step setup guide`
("Get help with the initial setup for your account.") · `Admin configuration
settings` · `Corporate membership programs` · `Manage users via CSV upload` ·
`Create and launch an event` · `Setting event permissions` ·
`Single Sign-on (SSO) Integrations` · `Travel Tracker` ("Report on your team's
active, upcoming, and past travel plans.")

`For Travelers`, in two groupings:
- `Learn the basics`: `Get Started` ("Suggested steps for a more personalized
  experience.") · `How to Book` ("Learn to book online or over the phone.")
- `Managing your travel`: `Booking Paths` ("Learn to book for yourself, your
  colleagues, or guests.") · `Approvals` ("Understand how to receive approval to
  book.") · `Changes & Cancellations` ("Modify your bookings online or over the
  phone.") · `Virtual Credit Cards for Hotel Payment` ("Use a shared company
  credit card at a hotel.")

Note `Approvals` — "Understand how to receive approval to book." The traveller's
deck describes a constraint imposed by the admin, framed from the traveller's
side as something to understand rather than to comply with. That is the
register-divergence artefact in KAYAK's two-audience estate: the admin branch is
configuration verbs (`Manage`, `Create`, `Setting`), the traveller branch is
learning verbs (`Learn`, `Understand`, `Get Started`). Same system, two
grammatical moods.

K4B carries a `Last updated Jun 26, 2024` metadata string; the consumer help
centre carries no dates at all.

**Blog IA** `[observed]`: `Home` · `Travel inspiration` · `Flying` ·
`Car rentals` · `Hotels + stays` · `Budget travel` · `Newsroom`, each with a
`Discover all` child plus topic children (`Flying` → `All about flights`,
`Airports`, `Luggage`, `Travel documents`). Note `Hotels + stays` — a fourth
rendering of the stays/hotels vertical, this time with a plus sign.

**Content defects recorded** `[observed]`

- `How does KAYAK get reviews and moderate content?` appears **twice, fully
  duplicated**, on `/c/help/about/`
- `How does KAYAK rank Packages?` capitalises `Packages` against its siblings
  `rank cars` / `rank flights` / `rank hotels`
- Three articles on `/c/help/account-trips/` (`How do I delete my KAYAK account?`,
  `How to sign out of your KAYAK account?`, `How do I book a search result saved
  to KAYAK Trips?`) each end with a block of text duplicated from the preceding
  article — stray paste errors in production
- `How to create a KAYAK account?` and `How to share Trips with other people?`
  pair an imperative construction with a question mark, inconsistent with the
  `How do I…?` siblings

## T12 FAQs

The help-centre H3s in T11 are themselves the FAQ set. Two additional blocks:

**`FAQ: Flight classes explained.`** (https://www.kayak.com/news/flight-classes/) —
questions verbatim, answers in one clause:

| # | Question (verbatim) | Answer, one clause |
|---|---|---|
| 1 | Is First Class worth it on short-haul flights? | Probably not, unless lounge access during a long layover justifies it |
| 2 | Economy vs. Premium Economy: What are the differences? | Bigger seats and better meals |
| 3 | Business vs. First Class: Is it worth it to pay extra? | First adds showers and restaurant-quality meals; Business is usually enough |
| 4 | How do upgrades work? | Airlines prioritise loyalty status; some discounted fares are ineligible |
| 5 | Can I earn more miles in higher classes? | Usually yes, since miles scale with fare and cabin |

Three of five are `Is it worth it` / `worth it to pay extra` questions. The FAQ is
not explaining the taxonomy — that is done in the article body — it is helping
the reader make a **spend decision**. Q1 and Q3 both answer against the upsell,
which is credible precisely because KAYAK does not sell the ticket.

In-article question headers from the same URL: `What are the differences between
flight classes?` · `What are airline cabin classes?` · `How much does each flight
class cost? A breakdown by cabin type.` · `What are airline fare classes and what
do they mean?` · `What is the fare basis code?` ·
`Are booking codes standardized across airlines?`

**Other FAQ questions captured verbatim**

- `/news/no-change-fees-basic/`: `What if I already booked a basic economy flight?`
  (pre-cutoff bookings keep fee-free changes)
- `/c/help/pricing/`: `How reliable is the "buy now" recommendation?` ·
  `Can I use Price Forecast on the KAYAK app?` ·
  `What's not included in car rental prices?` ·
  `How to check what's included in your rental price.`
- `/c/help/bookings/`: `Does KAYAK accept Apple Pay, PayPal, Affirm or Klarna?`
  (depends on the booking provider; Affirm powers a BNPL option on some bookings) ·
  `Who handles refunds?` · `Who handles your cancellation?` · `Who to contact.` ·
  `What KAYAK can and cannot do.` · `Thinking about a credit card chargeback?` ·
  `Why prices differ.` · `Is there a customer service email or phone number?`
  (no — feedback form or chat only)
- `/c/help/about/`: `Is KAYAK a reliable travel site?` · `How does KAYAK make money?` ·
  `Why you might not see a specific airline.` · `Where do reviews come from?` ·
  `What happens before reviews are published?` · `When reviews stop showing.` ·
  `Why are payment requests always scams?`

`What KAYAK can and cannot do.` is the best FAQ heading in the file — a header
that promises a boundary rather than an answer, on a page where the boundary is
the answer.

**SEO title variant observed** `[observed]`: `https://www.kayak.com/c/company`
301s to `/c/help/about/` but served a variant in which
`What differentiates KAYAK from other metasearch engines?` was instead titled
`What makes KAYAK different from other travel search engines, such as Expedia or
Skyscanner?`. The same variant listed a feature named `Ask AI` where the canonical
version listed `KAYAK AI Mode`. **Two versions of one help article, differing in
title and in product name, served from two URLs.**

## T13 Terminology & glossary

| Term | KAYAK's meaning | Notes / alternative rejected |
|---|---|---|
| `Hacker Fare` / `Hacker Fares` | Two one-way tickets, often on different airlines, combined instead of a round-trip | The coinage of the file. "Split ticket", "mix and match" rejected |
| `Price Forecast` | Predicts whether a fare will rise or fall | See defect below |
| `Price Trend` | Given explicitly as an alias: `The Price Forecast (also called Price Trend) graph` | |
| `Price Trends` | A **third** variant, plural, in the refunds answer | |
| `Price Alerts` | Change notifications for flights, hotels, cars | |
| `Price Calendar` | `a free tool that shows you flight prices by date` | |
| `Fare Comparer` | Side-by-side breakdown of fare inclusions | |
| `Fee Assistant` | Baggage/payment fee estimator; `It's a planning tool only.` | |
| `Best` / `Recommended` | Default sort: `the best trade-off between price and convenience` | `Quickest` `[absent]` |
| `Private Deals` | `Unlock great rates by signing in to your KAYAK account.` | |
| `Explore` | Destinations within a budget, filtered by flight length, date, interests | |
| `Trips` | `A personal travel assistant` for itineraries and flight status | |
| `Flight Tracker` | Worldwide flight tracking: times, cancellations, gates | |
| `KAYAK AI Mode` / `Ask AI` / `Plan with AI` | **Three names** for the AI surface, across help, utility nav and primary nav | |
| `KAYAK.ai` | `(beta)`; `our innovation sandbox` / `public innovation lab` | |
| `Book on KAYAK` | Complete a third-party booking without leaving KAYAK | The named exception to "we're not the seller" |
| `Booking receipts` | Both a page name and a Trips settings section | |
| `Biz+` | The K4B tier permitting in-platform changes | |
| `Travel Tracker` | K4B admin reporting on active/upcoming/past travel | Collides conceptually with consumer `Flight Tracker` |
| `Unused Tickets` | Credits from cancelled Biz+ travel | |
| `Know Your Partner (KYP)` | Partner vetting process, acronym expanded on first use | |
| `Travel Hacker Blog` | The blog's own brand name | Echoes `Hacker Fare` — a consistent house metaphor |

**Terminology defects** `[observed]`

1. `Price Forecast` / `Price Trend` / `Price Trends` — three names, one feature.
2. **A live factual contradiction**: `/c/help/pricing/` states the forecast window
   as **seven days**; `/c/help/about/` states **30 days**. Two help pages, same
   feature, different number.
3. `KAYAK AI Mode` / `Ask AI` / `Plan with AI` — three names for the AI surface.
4. `Stays` (nav) / `Hotels` (body links) / `Hotels & Stays` (services list) /
   `Hotels + stays` (blog nav) — four renderings of one vertical.
5. `Cabin Class` (blog heading) / `Cabin filter` (blog body) / `travel class`
   (help) — three names for one filter.

## T14 Voice, tone & accessibility

**Register.** Second person, contraction-heavy, conversational, with a recurring
"let me level with you" construction:

`From searching to saving, we've got you.` · `Here's the thing: KAYAK is a search
engine, not the seller.` · `Here's the reality:` · `Here's the key thing to know:`
· `Bottom line.` · `That's it. Your account is ready to use.` ·
`Did someone say road trip?` · `Got that right.` ·
`Listen, some of us just want to step off a plane…` · and a first-person aside
that slips through in blog copy, `(I know I have)`.

**Tone risk worth recording.** The `Here's the thing:` opener is used on
money-loss articles — `I was overcharged`, `My card was charged but I didn't get a
confirmation` — where it prefaces a refusal to help, because KAYAK is not the
merchant. A breezy conversational marker immediately before "this is not our
problem" is the sharpest register mismatch in the file. Compare the `Fee
Assistant` disclaimer, which drops all voice (`It's a planning tool only.`) and is
better for it. KAYAK's tone does **not** flatten as stakes rise; it should.

**Accessibility statement — substantive, and self-contradicted** `[observed]`
(https://www.kayak.com/c/accessibility-statement/)

Three pillars, each with named commitments:

| Pillar | Commitments (verbatim) |
|---|---|
| `Visual Accessibility` | `High contrast between text and background` · `Support for zoom and responsive font scaling` · `Avoidance of colour as the sole means of conveying information` |
| `Screen Reader Support` | `Proper use of semantic HTML elements` · `ARIA roles and attributes to enhance screen reader interpretation` · `Text alternatives for all meaningful images and icons` |
| `Keyboard Accessibility` | `Full functionality available via keyboard` · `Making sure there are no keyboard traps` · `Logical tab order and skip navigation links` |

Testing stack named openly: `JAWS, NVDA, and VoiceOver`, keyboard-only
navigation, `Contrast analysers and accessibility validation tools`,
`A11Y bug dashboards`, `full WCAG 2.2 QA checks`. Training is committed for
`design, content, engineering and testing teams` — content named as an
accessibility discipline, which is rare.

Philosophy line: `accessibility isn't a one-time task – it's an ongoing journey.`

The statement uses British spellings (`colour`, `analysers`) on a `.com` US page.

**Alt text as actually shipped — the headline negative finding** `[observed]`

The page committing to `Text alternatives for all meaningful images and icons` is
itself carrying:

- `theme_people_resort_hotel_pool_gettyimages-1213840216_universal_within-usage-period_77728-4`
  — a raw stock-photo filename, on the accessibility statement
- `visual-accessibility`, `screen-reader-support`, `keyboard-accessibility` —
  slugs as alt on the three pillar icons

Elsewhere:

- `icon placeholder` — a literal placeholder string shipped to production beside
  `About KAYAK` on the help-centre index, alongside `icon search`,
  `icon badge-cheapest`, `icon check-alt2`, `icon user`, `icon link`
- `divider` — a decorative rule given non-empty alt instead of `alt=""`
- `illustration-entertainment-q-a-questions-chat-slide` — filename-as-alt
- `f9e28cf5c9faf9f7fbf78a7620130004` — a bare hash as alt on the K4B home
- `k4b-help-icon-document`, `k4b-help-icon-filter`, `k4b-help-icon-sso` etc. —
  component names as alt

**The exception proves the ownership problem**: alt text on `/news/*` editorial
images is genuinely good — `A male passenger with earphones smiling while taking a
look at his smartphone on the plane's window seat.` ·
`Woman passenger sleeping at the business class of airplane in comfortable single
seat` · `Child on plane watching a movie with food tray`. Editorial images go
through a content workflow that writes alt; product and help images go through a
build pipeline that emits the asset name. The same company ships both.

Hero/LCP images on `/news/*` and `/trips` carry **empty alt**, which for a
decorative hero is correct.

**Other a11y-relevant strings** `[observed]`

- Link `title` attributes used as accessible names, with full stops:
  `Go to Help Center.` · `Go to Travel Hacker Blog.` ·
  `Go to the Flying category archives.` · `Follow on Facebook` ·
  `Download on the App Store`
- `Skip to main content` present on every page — but with **two different anchor
  targets**: `#main-content` on `/c/*`, `/news/*` and `/business/*`, and `#main` on
  `/trips` and `/tracker`. Two front-end stacks under one brand.
- The locale switcher's 70+ options each render the label twice
  (`United States (English) United States (English)`), which a screen reader will
  announce twice per option.

**Negative findings, consolidated**

- Six phrasings of the "not the merchant" disclosure
- Seven-day vs 30-day Price Forecast contradiction between two help pages
- Three names for the price-prediction feature; three for the AI surface; four for
  the stays vertical
- `icon placeholder` and a raw Getty filename in production alt text — the latter
  on the accessibility statement
- One FAQ fully duplicated; three articles with pasted-in text from their neighbours
- Ampersand/"and" and sentence/Title Case inconsistency across card, nav, H1 and K4B
- Two skip-link anchor targets
- Two versions of one help article served from two URLs with different titles and
  different product names

---

## Transferable patterns

1. **`It's a planning tool only.`** When a product displays a number it does not
   control and cannot act on, say so in a sentence, prefaced by `Important:`, before
   anything else. `Fee Assistant does not add baggage to your reservation.` names
   the exact wrong inference rather than hedging generically. Directly applicable to
   any estimator, calculator or forecast.
2. **Teach the vocabulary, then disable the wrong inference.** KAYAK explains fare
   basis codes in detail and then states `you can't directly compare booking codes
   between airlines.` Education without that bound would make users more confident
   and more wrong.
3. **Filter decks that argue why, not what.** `Stops` — "Minimize (or maximize)
   your layovers." The parenthetical concedes the filter is bidirectional. A
   one-line rationale under each facet converts a filter rail into a decision aid.
4. **Name the accusation.** `These price differences aren't fraud – they're just
   part of how travel pricing works.` Using the word the user is thinking, then
   reframing, beats "prices are subject to change". Condition: only where the
   accusation is genuinely unfounded.
5. **Fork the article at the step that will fail.** `Not sure which provider you
   booked with? Here's how to find out:` placed immediately after "contact your
   provider". Put the branch where the instruction breaks, not in a separate article.
6. **Publish the notification rule, not just the setting.** `typically a 10%
   increase or drop` plus `We bundle all your active alerts into one email` lets the
   user debug their own alert behaviour.
7. **Disclose revenue as a ranking input.** `And sometimes our expected revenue`
   alongside `Providers that aren't upfront about fees are less likely to be
   recommended.` The second sentence earns the first. Note the placement caveat:
   appending the revenue factor sentence-initially as an afterthought softens it.
8. **Two audiences, two moods.** K4B's admin branch uses configuration verbs
   (`Manage`, `Create`, `Setting`); the traveller branch uses learning verbs
   (`Learn`, `Understand`). Same system, and the grammatical mood carries the
   relationship each audience has to it.
9. **Negative lesson: pick one form for a legally-significant claim.** Six
   phrasings of "we are not the merchant" means the writer had no canonical string
   to reach for, and the `Book on KAYAK` exception now contradicts several of them.

## Caveats & gaps

- **The live search-results surface was never reached.** This is the central gap
  for a product whose flagged strength is "filters and fare distinctions".
  `/flights` and `/c/help/search/` both exceeded the fetch size limit and were not
  chased; `/hotels` and `/cars` were not attempted. **Every filter name, sort label
  and fare label in T5 and T5b is `[documented]` — KAYAK describing its own UI in
  help copy or in a blog explainer — not `[observed]` as live interface.** Several
  come from a blog article whose internal naming is itself inconsistent.
- **`/airline-fees` was oversized and not retrieved.** Per-airline baggage-fee
  tables and the airline-fee disclosure wording are unharvested — a significant
  loss for T10.
- **`/price-alerts` and `/bookings` returned empty client-rendered shells.** These
  are precisely the two surfaces most likely to carry real empty-state and
  no-results copy, so T8 is thin and T7 has no in-product error strings.
- `Main Cabin` as a KAYAK-rendered fare label: looked for on every page retrieved,
  **not found**. A third-party description of a `Basic Economy` / `Main Cabin`
  dropdown exists but was not corroborated on a KAYAK URL and is therefore not
  recorded as KAYAK copy.
- `Quickest` as a sort label: looked for, **not found**.
- A dedicated seat-selection page exists — title captured verbatim from a link as
  `Airline seat selection fees: when to pay and when not to.` — but was not fetched.
- **Help articles are undated** on the consumer side, so the 7-day/30-day forecast
  contradiction cannot be resolved by recency. Only K4B carries a `Last updated` string.
- **Locale is en-US only.** A 70+ locale switcher exists; no other market was
  inspected, and fee-disclosure obligations differ materially in the EU.
- **Mobile app copy not harvested** — outside the public web surface.
- `/c/company` served a variant of `/c/help/about/`; where the two differ, this
  file records both and says so, but the canonical version cannot be determined
  from the public surface.

## Sources

1. https://www.kayak.com/c/help/
2. https://www.kayak.com/c/help/pricing/
3. https://www.kayak.com/c/help/bookings/
4. https://www.kayak.com/c/help/about/
5. https://www.kayak.com/c/help/account-trips/
6. https://www.kayak.com/c/accessibility-statement/
7. https://www.kayak.com/news/flight-classes/
8. https://www.kayak.com/news/flight-filters/
9. https://www.kayak.com/news/no-change-fees-basic/
10. https://www.kayak.com/business/help-center/
11. https://www.kayak.com/business/help-center/admins/
12. https://www.kayak.com/business/help-center/travelers/
13. https://www.kayak.com/business/help-center/travelers/changes-cancellations/
14. https://www.kayak.com/trips
15. https://www.kayak.com/tracker
16. https://www.kayak.com/price-trend-explanation (301 → 2)
17. https://www.kayak.com/c/company (301 → 4; served a title variant)
18. https://www.kayak.com/help/tripshelp (301 → 5)

**Blocked:** https://www.kayak.com/flights (oversized) ·
https://www.kayak.com/c/help/search/ (oversized) ·
https://www.kayak.com/airline-fees (oversized) ·
https://www.kayak.com/price-alerts (empty client-rendered shell) ·
https://www.kayak.com/bookings (empty client-rendered shell, auth-gated)
