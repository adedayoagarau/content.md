# 098. Alaska Airlines

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | US network airline (mid-size, oneworld member; mid-merger with Hawaiian Airlines) |
| Primary URL | https://www.alaskaair.com/ |
| Corpus rank | 098 |
| Benchmark strength (source list) | Itinerary and disruption communication |
| Locale / market observed | en-US / USD (site offers en-AU, en-NZ, en-GB, es-US, fr-PF, it-IT, ja-JP, ko-KR with paired currencies) |
| Platform observed | Web (desktop) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US DOT — 14 CFR §259.5 Customer Service Plan (published as a set of named "Customer Commitments"), Contract of Carriage, tarmac-delay contingency plan; ACAA / 14 CFR Part 382 accessible services; **Canada APPR** and **EU/UK 261** both surfaced as separate named passenger-rights pages in the global footer |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | **Partial — significant blockage.** alaskaair.com is a client-rendered SPA. The homepage returned a `<title>` only. Seven of thirteen pages returned full navigation, footer and `<head>` metadata but **no body content**, including every Customer Commitment sub-page, the baggage pages and the accessible-services page. Four pages rendered fully (Help center, Travel Advisories, Travel experiences, Saver fares) and carry almost all extracted copy. The DOT commitment text — the highest-value target in this batch — was **not retrievable**; only its page titles, footer labels and `<meta description>` strings were. Marked throughout. |

## Pages inspected

| Label | URL | Rendered? | Notes |
|---|---|---|---|
| Homepage | https://www.alaskaair.com/ | **No** | `<title>` only — no nav, no body |
| Help center | https://www.alaskaair.com/content/about-us/help-contact | **Yes** | Full topic tree and eight Q&A blocks |
| Travel Advisories | https://www.alaskaair.com/content/advisories/travel-advisories | **Yes** | Disruption copy, two live waivers, advisory taxonomy |
| Travel experiences | https://www.alaskaair.com/content/travel-info/flight-experience | **Yes** | Four cabins, two comparison matrices, upgrade FAQ |
| Saver fares | https://www.alaskaair.com/content/travel-info/flight-experience/saver | **Yes** | Limitations list, eight-tab FAQ incl. a disruption tab |
| Customer Service Commitment (index) | .../about-us/customer-commitment/customer-commitment-overview | Nav + meta only | Body not rendered |
| Choices During a Delay | .../customer-commitment/customer-commitment-delay-choices | Nav + meta only | Body not rendered |
| Care During a Delay | .../customer-commitment/customer-commitment-delay-care | Nav + meta only | Body not rendered |
| Care During a Delay (AU locale) | /en-au/.../customer-commitment-delay-care | Nav + meta only | Re-tried in a second locale; same result |
| Optional services and fees | .../travel-info/optional-services-fees | Nav + meta only | **Baggage fee table not retrievable** |
| Baggage policies | .../travel-info/baggage/overview | Nav + meta only | |
| Accessible services | .../travel-info/accessible-services/airport-accessibility | Nav + meta only | |
| Our Policies | .../travel-info/policies/policies-overview | Nav + meta only | |

---

## T1 Navigation & IA labels

**Primary nav — five items, and the second one is a question the user is asking** `[observed]`

`Book` · `Trips` · `Where we fly` · `Traveling with us` · `Atmos™ Rewards`

Plus persistent utility links: `Travel Advisories` (with its own icon slot, top-right, *above* Search), `Search`, `Language and Currency`, `Sign in`, `Join now`.

**`Travel Advisories` promoted to the top-level utility bar** is the single most important IA decision on this site. It sits beside Search, outside any dropdown, on every page. Most carriers bury advisories in a help subsection; Alaska treats "is my trip affected?" as a persistent global concern rather than a situational one.

**`Book` dropdown splits into three labelled groups** `[observed]`:

| Group | Members |
|---|---|
| `Reservations` | `Flights` · `Deals` · `Group travel` · `Flight Pass` |
| `Trip planner` | `Trip inspiration with AI` · `Travel insurance` · `Hotels & rentals` · `Cars` · `Package deals` · `Cruises` |
| `Trip credits` | `Credit certificates` |

`Trip credits` as a peer group to `Reservations` is unusual — the residual value of a broken trip is given the same structural weight as booking a new one. That is disruption-aware IA.

**`Traveling with us` splits into three groups that map to trip phase** `[observed]`:

| Group | Members |
|---|---|
| `Fly Alaska` | `Travel experiences` · `Suites` · `First Class` · `Premium Class` · `Main Cabin` · `Saver fare` · `Food and beverage` · `Alaska Lounge` |
| `Policies and services` | `Baggage` · `Infants and children` · `Accessible services` · `Pets` · `Sustainability` · `Our aircraft` · `All policies` |
| `Upcoming travel` | `Check-in options` · `Mobile app` · `Travel tips` · `Travel documents` · `Flight schedule` · `Airport guides` |

Note `Sustainability` filed under `Policies and services` between `Pets` and `Our aircraft` — a corporate-responsibility topic shelved among operational policies.

**Footer — four groups, and the `Customer service` group is the artefact** `[observed]`

| Group | Members |
|---|---|
| `About Alaska` | `Who we are` · `Careers` · `Newsroom` · `Investor relations` · `Alaska Star Ventures` · `Legal` · `Contract of Carriage` · `Privacy notice` |
| `Customer service` | `Help center` · `Feedback and complaints` · `Travel advisories` · `Receipts` · `Customer service commitment` · `Canadian air travel rights` · `EU/UK 261 air passenger rights` · `Tarmac delay plan` · `Site map` |
| `Products and services` | `Optional services and fees` · `Corporate travel` · `Atmos for Business` · `Travel agents` · `Cargo` · `Travel insurance` |
| `Get deals` / `Feedback` | `Sign up now` / `Give feedback` |

**Four of nine `Customer service` links are regulatory artefacts** — `Customer service commitment`, `Canadian air travel rights`, `EU/UK 261 air passenger rights`, `Tarmac delay plan` — and they are filed under *customer service*, not under *legal*. `Contract of Carriage` sits in `About Alaska` instead. Alaska has drawn the line between "rules that constrain us on your behalf" (customer service) and "the contract" (corporate), which is a defensible and unusual split.

**A label mismatch worth recording** `[observed]`: the footer link `Tarmac delay plan` resolves to `customer-commitment-extended-delays`, whose page title is `Comfort During Extended Delays Commitment`. The regulatory name and the brand name for the same document differ, and the footer uses the regulatory one — probably correctly, since that is what a user in distress would search for.

**Help-centre IA is organised by trip phase, four buckets** `[observed]`

| `Plan your travel experience` | `Manage travel` | `Day of travel` | `Post travel` |
|---|---|---|---|
| `Book travel` | `Change or cancel a reservation` | `Baggage information & fees` | `Receipts` |
| `Points` | `Upgrades` | `Check-in information` | `Delayed, lost or damaged baggage` |
| `Travel Credits` | `Traveling with a pet` | `Airport Guides` | `Items left onboard` |
| `Discount & Companion Fare codes` | `Wheelchair & mobility devices` | `Same day flight changes` | `Adding points for past travel` |
| `Children traveling alone` | `Seats` | `Lounge location and hours` | |
| `Lap Infants` | `Traveling with a Service Animal` | `Traveling with children` | |
| `Travel experiences & fare types` | `Additional accessible services` | `Children traveling alone checklist` | |
| `Infant Basinets` | | | |

`Post travel` as a named phase is the notable one — most airline help trees stop at arrival. It holds the two things that only surface after landing: your bag didn't, and your points didn't.

Two defects visible in this tree `[observed]`: `Infant Basinets` (misspelling of *bassinets*), and inconsistent title casing within a single column (`Travel Credits` and `Lap Infants` title-cased; `Book travel` and `Children traveling alone` sentence-cased).

## T2 Value proposition & headline patterns

**Help-centre opener leads with an emotional claim, then a routing instruction** `[observed]`

> "At Alaska Airlines, we care about empowering you to have the best travel experience possible. Got a question or need a hand? Explore our most popular help topics below, or quickly browse our help pages by category to find the information you need."

`Got a question or need a hand?` is the register marker — clipped, colloquial, contraction-free but elliptical. It is the most conversational sentence on any harvested Alaska page.

**Travel-experiences headline counts the options** `[observed]`

> `4 ways to fly here, there, and everywhere in between.`
> "Whether it's a business trip or the ultimate vacation, there's a travel experience tailored towards your needs from departure to arrival."

Numeric headline (`4 ways`) plus a three-beat rhythm (`here, there, and everywhere in between`). The subhead's `from departure to arrival` bounds the promise to the flight itself.

**Each cabin gets a two-line identity: an evaluative tagline, then a mechanism sentence** `[observed]`

| Cabin | Tagline | Positioning line |
|---|---|---|
| `FIRST CLASS/SUITES` | `The most spacious seating in any U.S. domestic airline` | "Our most luxurious travel experience with the most legroom in any U.S. domestic airline in its class, lie-flat seats, Suites on the 787, priority boarding, and a dedicated flight attendant." |
| `PREMIUM CLASS` | `A new benchmark for accessible luxury` | "Premium Class elevates the Main Cabin travel experience with benefits like early boarding and extra legroom." |
| `MAIN CABIN` | `The award-winning classic` | "The travel experience that won countless awards, enjoy an unrivaled inflight service and no change fees on Main fares." |
| `SAVER FARE` | `The budget-friendly essentials` | "For spontaneous travelers and friend seekers. Saver fare unbundles seat selection and limited flight changes while providing Main Cabin inflight amenities at our lowest rates." |

The comparison matrix repeats these as compressed epithets: `Budget-friendly essentials` · `Award-winning classic` · `The elevated standard` · `Alaska's luxury experience`. Note `Premium Class` has **two different taglines** on one page (`A new benchmark for accessible luxury` in the card, `The elevated standard` in the matrix) — a real inconsistency in a comparison artefact where consistent naming is the whole point.

**The First Class claim carries its own qualifier, and the qualifier moves** `[observed]`: the tagline says "the most spacious seating in **any U.S. domestic airline**"; the body says "the most legroom in any U.S. domestic airline **in its class**". The unqualified superlative is the headline and the bounded one is the body — the reverse of best practice.

**Saver's hero is the most interesting voice on the site** `[observed]`

> `Saver fares`
> "Make friends, save a bunch of money, and meet incredible inflight crews."
> Section head: `We're all about you going places.`
> Later: `Keep calm, and bring a carry-on.` · `All the right fares, at all the right places` · `Make your feed binge worthy.`

A basic-economy product marketed on *sociability* (`Make friends`, `friend seekers`, `meet incredible inflight crews`) rather than on price alone. `Keep calm, and bring a carry-on.` is a meme borrow. `Make your feed binge worthy.` addresses a social-media motive. This is the only Alaska surface written for a young leisure audience, and the register shift is abrupt relative to the rest of the site.

**The Saver `<meta description>` contains the positioning claim that the page itself never makes** `[observed]`: "Learn all about our new Saver fare, the cheapest ticket on Alaska Airlines. **It's even better than basic economy**, offering the same comfortable, friendly Main Cabin inflight experience you've come to expect." The competitive claim against the category name (`basic economy`) lives only in the meta description — which is a search-results and social-card string, not on-page copy. Worth flagging: the sharpest line in the fare-family content is invisible to anyone already on the page.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign in` · `Join now` | Global nav | `Join now` rather than `Sign up` or `Register` |
| `Explore offers` | Sub-nav credit-card banner (`Earn up to 70,000 Bonus Points`) | |
| `Explore First` / `Explore Suites` / `Explore Premium Class` / `Explore Main Cabin` / `Explore Saver fare` | Cabin cards | Consistent verb + product name; **never a bare `Learn more`** |
| `Compare domestic travel` / `Compare international travel` | Matrix tabs | Tabs written as imperatives |
| `View travel experiences comparison chart` | Saver page | Names the destination artefact |
| `View all travel experiences` | Saver page footer | Near-duplicate of the above, on the same page |
| `View Saver fare limitations` | Saver page, under the differences question | Anchors to `#limitations` — routes *toward* the bad news |
| `Browse our lowest prices.` | Saver hero | Full stop on a CTA |
| `Book now` | Saver mid-page | |
| `Explore flight deals` | Saver page | |
| `Pre-order food` | Saver page | |
| `Get your receipt` | Saver page | |
| `Manage your trip` | Help centre | |
| `Check in online` | Help centre | |
| `Book a flight` | Help centre | |
| `Explore Atmos Rewards` | Help centre | |
| `TSA PreCheck FAQs` | Help centre | Link text = destination title |
| `Contact us` | Help centre, under `Can't find what you're looking for?` | Last, and smallest |
| `Give feedback` | Footer and help centre (`Share your thoughts`) | |
| `Hawaiian Airlines Help Center` | Help centre, near top | Cross-brand routing during the merger |
| `View details` | Travel advisories, pet embargo notice | |
| `Skip to main content` | First in DOM on every rendered page | Present and correct |

**Observation.** Alaska almost never ships a bare `Learn more` — the cabin cards all use `Explore <product name>`, and the help centre uses the destination's own title as link text. The exception is the Saver page, which ships **two near-identical links to the same comparison chart** (`View travel experiences comparison chart` and `View all travel experiences`) plus a third entry point from the matrix tabs.

`View Saver fare limitations` deserves separate note: it is a CTA whose entire job is to route the user to the restrictions on the product they are about to buy, and it is placed inside the answer to `How is Saver fare different than Main Cabin?`. Most carriers make the customer hunt for that list.

## T4 Onboarding & getting-started

No signup or first-use flow is publicly observable. The nearest analogue is the **help-centre self-service block**, headed with a promise and a hedge `[observed]`:

> `Common questions, quick answers: These solutions cover the questions we hear most often. Check here first — you might find exactly what you're looking for.`

`you **might** find` is a deliberately modest claim for a self-service module. Eight blocks follow, each a **bolded task label ending in a colon**, then 1–3 sentences, then a CTA:

| Task label (verbatim) | Answer shape |
|---|---|
| `Change, cancel, or update your flight:` | Sign in → Trips page; or look up by confirmation code; **then tells you where to find the code** ("in the email you received after booking, or on the Trips page") |
| `Learn more about Atmos™ Rewards:` | Routes to FAQ; then the settings path for profile edits |
| `Online check-in:` | 24-hour window; then the fallback ("If you aren't able to check in, an Alaska agent can assist you at the airport") |
| `Learn more about TSA PreCheck®:` | Names three sub-topics (applications, Known Traveler Numbers, adding KTNs) |
| `To book a flight using points:` | Search → `'Use points'` toggle; **then an unprompted expectation-setter** (below) |
| `Adding bags to your reservation` | Two windows: up to 24 hours before during check-in; after check-in via Trips |
| `Using travel credits, gift certificates, Companion Fare, and discount codes:` | Routes to two destinations |
| `Account access:` | Routes |

Two of these are unusually good content decisions:

1. **The confirmation-code block tells you where to find the thing it just asked you for.** "You'll find your confirmation code in the email you received after booking, or on the Trips page." One sentence that removes the most common dead end in airline self-service.
2. **The points block pre-empts a support contact and disarms a workaround.** "Our Reservations team sees the same availability as our website and won't be able to offer additional options. Try checking back later if you can't find the flights or seats you're looking for — partner airlines add more inventory at different times." This tells the user (a) calling won't help, (b) why, and (c) what actually might. Naming the limit of your own phone channel, in the self-service module, is the best paragraph in Alaska's harvested content.

Note the **inconsistent colon usage** — six of eight labels end in a colon, `Adding bags to your reservation` and one other do not.

## T5 Form & field labels

Almost nothing observable — booking, check-in and Trips are all SPA-rendered or authenticated. `[absent]`

Two fragments `[observed]`:
- The points-booking toggle is quoted in help copy as `'Use points'` — single quotes in body copy.
- Upgrade paths reference in-product labels: `'Trips'` tab, `'Seats'`, `'Manage/Change'`, `'Premium Class'`, `'Upgrade to First Class'`, `'Business'`, `'Upgrade to Business Class'`. Quoted with single quotes throughout the upgrade FAQ — a consistent convention for naming in-product controls in help prose.

## T6 Status & state language

**The disruption vocabulary is a four-term ladder, and the terms are used precisely** `[observed]`, from Travel Advisories and the Saver FAQ:

| Term | What it denotes | Copy |
|---|---|---|
| `schedule change` | An airline-initiated time change | "If your flight is affected by a schedule change, we will move you to the next available flight." |
| `changed by more than one hour` | The threshold that unlocks rider options | "If your new flight schedule was changed by more than one hour, you have some options" |
| `canceled` | Flight removed | "If your flight was canceled, we will move you to the next available flight." |
| `delayed` | Held, not removed | Used in the notification and waiver copy ("Flights may be delayed or canceled. Please monitor your flight status regularly.") |

**The critical structural pattern:** both the schedule-change and cancellation blocks open with the *system's remedial action already taken*, phrased identically —

> "we will move you to the next available flight. **If your new flight works for you, great! We'll see you onboard.**"

— and only then offer alternatives. The default state is *already rebooked*. The user is not asked to act; they are asked to accept or override. `If your new flight works for you, great! We'll see you onboard.` is the warmest sentence in Alaska's disruption content and it is doing real work: it tells the anxious reader that the most likely outcome is that nothing more is required of them.

**The two branches then diverge on one variable only: how far you may move** `[observed]`

| Trigger | Self-service rebooking window |
|---|---|
| Schedule change > 1 hour | "Change your flight online to one that better suits your schedule - **up to 1 day earlier or later**." |
| Cancellation | "Change your flight online to one that better suits your schedule—**up to 7 days earlier or later**." |

A 1-day window for a schedule change and a 7-day window for a cancellation, both self-serve, both stated as plain numbers. This is the clearest quantified self-service entitlement in the batch and it is stated **without a fee discussion and without a phone number**.

Note the **en-dash/hyphen inconsistency** between the two otherwise-parallel sentences (`- up to 1 day` vs `—up to 7 days`).

**Flight-status states themselves are not observable** — `Flight Status` is an authenticated/SPA surface. `[absent]`

**Fare-state language** `[observed]`: `Saver tickets appear as fare class (X) on your flight confirmation details.` — the internal RBD letter is disclosed to the passenger as an identification method. That is a rare instance of an airline exposing its own inventory code as user-facing content, and it solves a real problem (*how do I know which fare I bought?*).

## T7 Error, failure & recovery

The priority category, and the one most damaged by the rendering blockage. What is retrievable is nonetheless substantial.

### The named commitment set `[documented]`

Alaska publishes its DOT §259.5 plan not as a numbered list but as **separately titled, separately URL'd "Customer Commitments"**. Titles observed in page `<title>` elements and in search-result titles:

| Commitment (page title) | URL slug | `<meta description>` (verbatim, observed) |
|---|---|---|
| `Customer Service Commitment` | `customer-commitment-overview` | "At Alaska and Hawaiian Airlines, we're committed to providing the best service possible to all of our customers. Read more about our customer commitments here." |
| `Choices During a Delay Customer Commitment` | `customer-commitment-delay-choices` | "Whether in the air or on the ground, we are committed to providing the most current and accurate information about flight delays or cancellations." |
| `Care During a Delay Customer Commitment` | `customer-commitment-delay-care` | "We realize the inconvenience a delayed flight can case. In case your flight is delayed, we can provide some amenities to make your wait easier." |
| `Comfort During Extended Delays Commitment` | `customer-commitment-extended-delays` | (not retrieved) — footer labels this `Tarmac delay plan` |
| `Flexible Booking Customer Commitment` | `customer-commitment-flexibility` | (not retrieved) |
| `Rule and Policy Disclosure Customer Commitment` | `customer-commitment-rules-disclosure` | (not retrieved) |

**This naming scheme is the single most transferable artefact in the file.** Compare Delta and Southwest, which publish the same regulatory obligations as a numbered list of twelve or fourteen items (`2. Notifying consumers of known delays, cancellations, and diversions`). Alaska has instead:

- **given each obligation a name a passenger would recognise** — `Choices During a Delay`, `Care During a Delay`, `Comfort During Extended Delays`;
- **built a three-word taxonomy around the passenger's experience of time**: *choices* (what can I do), *care* (what will you give me), *comfort* (what happens when it goes on too long);
- **given each its own URL**, so a gate agent or a support reply can link to exactly one commitment;
- **kept the regulatory phrase as the footer label** (`Tarmac delay plan`) where findability matters more than framing.

`Choices` / `Care` / `Comfort` as an escalating triad is genuinely good information architecture applied to a compliance document. It converts "here are our fourteen obligations" into "here is what you get, in the order you will want it."

**A defect in the highest-stakes string** `[observed]`: the `Care During a Delay` meta description reads "We realize the inconvenience a delayed flight can **case**." — a typo for *cause*, in the description of a DOT commitment page, served to search engines and social cards. Recorded as observed.

### Live disruption copy `[observed]`

The Travel Advisories page carries the only fully-rendered disruption content, and it is structured as a six-tab taxonomy:

`Overview` · `My flight was changed or canceled` · `Flexible Travel Policies` · `Country Advisories` · `Airport Advisories` · `Airport check-in` · `Seasonal baggage limits`

**`My flight was changed or canceled` as a tab label** is the Wise `Where is my money?` move applied to aviation — the category is named in the user's sentence, in the past tense, from their position. It sits second, immediately after `Overview`.

**Recovery options are a three-item menu with a closing reassurance** `[observed]`:

- "Change your flight online to one that better suits your schedule"
- "Cancel your trip online and receive a refund* to your original form of payment."
- "Contact us to cancel your trip and receive future travel credit."

Then: "And remember, **if your plans change at any time, there are no fees to change or cancel Main and First Class fares.** A fare difference may apply."

Two things. First, the ordering is *change → refund → credit*, i.e. best outcome for the passenger first, worst last, with the credit option being the only one requiring a phone call. Second, the closing line pivots from *our disruption* to *your change of plans* — and immediately bounds itself with `A fare difference may apply.` A four-word qualifier that prevents the no-fee promise from being heard as a no-cost promise.

**The refund eligibility footnote is an unusually blunt exclusion** `[observed]`:

> "*Please note: To qualify for a refund to your original form of payment, you must have an active reservation on the impacted flight. **If you voluntarily canceled your trip and received a future travel credit before the flight cancelation, you are not eligible for a refund.**"

This describes a real and painful edge case — you cancelled pre-emptively, then the airline cancelled anyway, and you are now worse off than if you had waited. Alaska states it plainly rather than burying it. (Note `cancelation` single-L here against `canceled`/`cancellation` elsewhere on the same page.)

### The flexible-travel-policy (waiver) template `[observed]`

Two live waivers were on the page at harvest — `Typhoon Dujuan` and `Hurricane Lowell` — and they share a rigid template worth recording in full, because it is a reusable disruption-communication structure:

1. **Opening offer**: "We are offering a flexible travel policy if you would like to change or cancel your flight."
2. **Expectation set**: "Flights may be delayed or canceled. Please monitor your flight status regularly."
3. **Channel enrolment**: "Sign up for flight notifications and we'll notify you of any last-minute delays, cancellations, or gate changes on your flights by email or text message." — note the three named event types.
4. **Adjacent risks**: "Check airport guides for possible advisories regarding minors 17 and under traveling without an adult and pets traveling in the baggage compartment." — unaccompanied minors and pets flagged unprompted.
5. **Four-field scope block**: `Travel To/From:` · `Tickets Purchased On / Before:` · `Original Travel Dates:` · `New Travel Dates:`
6. **`Exception Policy`** — the conditions: change/cancel before original departure; third-party bookings must go to the agency; rebooking limited to "Alaska, Hawaiian, Horizon, or SkyWest as Alaska flights".
7. **Fare-scope sentence**: "If you purchased a nonrefundable First Class, Main, Saver, or award ticket, you may:" — then no-fee change with no fare difference in the same cabin, or no-fee cancel into "your Account wallet, or receive a credit certificate for future travel."
8. **Ticket-stock identification**: "This waiver is valid only for tickets issued by Alaska Airlines, which you can identify by a **13-digit ticket number that begins with Alaska Airlines code '027'**."
9. **`Information for Travel Agents`** — `Waiver code: KJPNSTORM0926` / `KLIHSTORM0926`

Points 8 and 9 are the standouts. **Teaching the passenger to identify their own ticket stock by prefix** is a piece of genuinely technical self-service that resolves the single most common waiver dispute. And **publishing the trade waiver code on the consumer page** means a passenger can hand it to their travel agent directly — the B2B artefact is exposed to the B2C reader rather than hidden. The Hurricane Lowell waiver adds a route-flex concession ("change your itinerary to another Hawaiian island (HNL, ITO, KOA, OGG) at no additional cost"), showing the template flexes for geography.

The empty-state string for this block is also captured `[observed]`: `Currently, there are no flexible travel policies in place.` — present on the same page, below two live waivers, because the component renders both a list and its own empty state. A minor rendering artefact, and a rare chance to capture a live empty-state string (see T8).

### Saver-specific disruption treatment `[observed]`

The Saver FAQ carries a dedicated tab, `Flight delays, cancellations, and schedule changes`, with two questions:

- `What happens if I'm flying on a Saver fare and my flight is delayed or canceled?` → "you will be provided **the same choices as a guest on a Main fare**."
- `What happens if I book a Saver fare and then Alaska changes my itinerary or reschedules the flight?` → "We will accommodate you on a different flight and **waive any change or cancellation fees**."

**Disruption entitlement is explicitly decoupled from fare family.** A basic-economy passenger is told, on the basic-economy page, that they are treated identically when the airline fails. Both answers then route to `customer service commitment`. This is the right answer to the question every restricted-fare buyer actually has, and most carriers leave it unanswered.

Against that, Saver's *voluntary* failure modes are brutal and stated plainly `[observed]`:

- "If a guest is a **no-show** for any flight during a trip, all other flights within that trip are automatically canceled, with no refund available."
- "If you miss your flight while traveling on a Saver fare, **all segments on your itinerary will be automatically canceled and the total fare will be forfeited**."

The same rule, stated twice on one page, in the `Limitations` list and again under `Check-in/boarding`. Deliberate redundancy on the most expensive mistake a Saver passenger can make.

## T8 Empty states

`[observed]` — one, and it is a genuine capture:

> `Currently, there are no flexible travel policies in place.`

Rendered on the Travel Advisories page **beneath two active waivers**, indicating the component's empty state is being emitted alongside populated content. The string itself is well-formed: `Currently` bounds it in time, and `in place` reads as operational rather than as an absence of data. It is arguably better than "No results" for a surface where absence is good news.

The same page also carries a suspended-state string `[observed]`: "*Contact Tracing is currently suspended until further notice." — an asterisked footnote *contradicting* the paragraph above it, which still instructs travellers to "provide contact tracing details" and to "complete this information prior to arriving at the airport." **The live instruction and the footnote that cancels it sit in the same block.** This is a content-decay defect on an advisory page, and it is the clearest one found on the site.

All other empty states (no trips, no points activity, no results) are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]`, and specific about event types:

- **Flight notifications**, opt-in: "Sign up for flight notifications and we'll notify you of any **last-minute delays, cancellations, or gate changes** on your flights by **email or text message**." Three named events, two named channels. Repeated verbatim in both live waivers.
- **`Travel Advisories`** — a persistent global nav entry acting as a standing broadcast surface.
- **Embargo banner** `[observed]`, inline on the advisories page: "July 31 – Sep 30: French and English Bulldogs can't travel in the cargo hold. Pets in Cabin travel is unaffected. View details." — date range first, restriction second, **carve-out third**. Naming what is *not* affected in the same two-line notice prevents a whole class of unnecessary contacts.
- **`Service` / rebooking notice**: "we will move you to the next available flight" — the system action is described but the notification copy itself is not quoted.
- Upgrade receipts: "Receipts will be sent to the email used on the reservation. If your email is not on the reservation, you can send a copy to the email of your choice."

No toast, banner or push copy is directly observable. `[absent]`

## T10 Disclosures, legal & compliance

**The baggage fee table was not retrievable.** `Optional services and fees` and `Baggage policies` both returned navigation and `<meta>` only. **No Alaska baggage fee figure is recorded in this file.** This is the most significant gap and it is stated here rather than filled.

What is retrievable:

**Fare-family entitlements as two comparison matrices** `[observed]`. Alaska publishes a domestic matrix and a separate international (787) matrix — the same four products with different contents, which is an honest way to handle a fleet where the product genuinely differs.

*Domestic travel benefits* — rows, in the order Alaska chose:

| Benefit | `Saver fare` | `Main Cabin` | `Premium Class` | `First Class` |
|---|---|---|---|---|
| `Carry on included` | yes | yes | yes | yes |
| `Earn Atmos Rewards points` | `Ends August 1, 2026` | yes | yes | yes |
| `Seat selection` | no | yes | yes | yes |
| `Board and deplane early` | no | no | yes | yes |
| `Extra legroom` | no | no | yes | yes |
| `Free beer, wine, and cocktails` | no | no | yes | yes |
| `Complimentary food and drinks` | no | no | no | yes |
| `Dedicated flight attendant` | no | no | no | yes |
| `Access to Alaska Lounge*` | no | no | no | yes |
| `Two free checked bags` | no | no | no | yes |

**Row 1 is `Carry on included` and it is `yes` across all four.** Alaska opens its fare matrix on the thing that is *not* stripped out of its cheapest fare — a direct, unstated contrast with ultra-low-cost carriers that charge for carry-on. `Board and deplane early` (row 4) is the only two-verb row, and `deplane` matters as much as `board` to the passenger.

The international matrix `[observed]` adds `Personal TV`, `Blanket and pillow` (upgrading to `Premium bedding` in Suites), `Complimentary meal`, `Complimentary beer and wine`, `Complimentary cocktails and spirits`, `Private suite with closing door`, `Comfort kit` (→ `Premium amenity kit`), and **quantified baggage rows split by region**: `Checked bag (Rome and London)` = 1/1/1/2, `Checked bag (Japan and Korea)` = 2/2/2/2, with weight limits inline (`up to 50lbs` / `up to 70lbs`). Naming the cities and countries rather than saying "varies by route" is the right call.

**The Saver `Limitations` list — seven bullets, no softening** `[observed]`:

- `Seats will be assigned at check-in.`
- `We can't guarantee that parties of two or more will be seated together.`
- `Same-day confirmed changes allowed for an additional fee when eligible. Other changes are not allowed.`
- `No standby is allowed for Saver fares, even for Atmos Rewards status guests.`
- `If a guest is a no-show for any flight during a trip, all other flights within that trip are automatically canceled, with no refund available.`
- `Saver fares cannot be combined with any other fare types on the same itinerary.`
- `Saver fares are non-transferable.`

Introduced with a line that uses the word twice: "Saver fares **do include some limitations** on booking, refunds, changes, and seat selection." The heading is `Limitations` — not "Good to know", not "Things to consider". Four of seven bullets are pure negations. `even for Atmos Rewards status guests` pre-empts the elite passenger's assumption that status overrides fare rules, which is exactly the assumption that generates gate disputes.

**The Saver cancellation rule is a partial-credit mechanic stated as a number** `[observed]`: "Saver fares are eligible for a **50% credit if canceled at least 14 days before departure** of the first flight on the ticket. No other changes or refunds are allowed to Saver fares outside of our 24-hour cancellation policy and same-day confirmed policies."

A 50%/14-day partial credit is unusual in US basic economy (most carriers allow nothing). Stating it as a single sentence with both variables, followed immediately by a closed-list exclusion, is clean disclosure.

**The points-earning disclosure is a live, dated policy withdrawal handled in four places** `[observed]`. Alaska is removing points earning from Saver fares, and the copy shows the seams:

| Surface | Wording |
|---|---|
| Cabin card | "Earn Atmos Rewards points until August 1, 2026." + "Please note: Saver fares booked after June 11, 2026 and flying on or after August 1 will no longer be eligible to earn points." |
| Comparison matrix | `Ends August 1, 2026` |
| Saver hero | `Enjoy select Atmos benefits` |
| Saver body | "Earn points on Saver fares for flights through **July 31, 2026**." |
| Saver FAQ | Three dated cases: "Fly by July 31, 2026: Saver fares earn 30% of the points flown." / "Booked before June 11, 2026: You will still earn points (30%), but please allow 4–6 weeks…" / "Booked after June 11, 2026 and flying on/after August 1, 2026: These fares are not eligible to earn Atmos Rewards points or status points. However, 100% of miles flown … will count as lifetime flown miles toward achievement of Million Miler." |

Five statements of one rule, using **two different end dates** (`August 1, 2026` and `July 31, 2026` — arguably the same boundary expressed two ways, but presented inconsistently), and only the FAQ discloses the actual earn rate (`30% of the points flown`) which appears nowhere in the matrix. The FAQ version is the good one: three dated cases, an explicit processing-delay warning (`4–6 weeks`), and a compensating concession (`lifetime flown miles`) offered in the same breath as the withdrawal. **Documenting the removal of a benefit, with dated cases and a partial consolation, is a pattern worth stealing** — but shipping it at four different levels of precision across one page is not.

As at harvest date (2026-09-21) all of these dates have passed, so the card and hero copy are describing a benefit that no longer exists. Recorded as a **currency defect**.

**Accessibility as a fare-rule carve-out** `[observed]` — the Saver FAQ's `Accessibility services` tab explicitly overrides three Saver restrictions:

- "Certain seats are **reserved for guests with disabilities**. Call reservations after you've booked your flight to request a seat assignment. Your request must be made at least **24 hours** before the scheduled flight." (overrides "seats assigned at check-in")
- "Yes. Notify the gate agent if you need additional time to board the aircraft." (overrides "board last, in boarding group F")
- "Yes. You may carry your assistive device aboard." (overrides carry-on constraints)

Placing the disability carve-outs **inside the restricted fare's own FAQ**, rather than only on a separate accessibility page, is the right location — it answers the question at the point of the worry.

**Regional/regulatory disclosure surfaces named in the footer** `[observed]`: `Contract of Carriage`, `Canadian air travel rights`, `EU/UK 261 air passenger rights`, `Tarmac delay plan`, `Customer service commitment`, `Legal` (→ `consumer-notices`). Four passenger-rights regimes exposed as peer links.

**Advisory-page disclosures** `[observed]`: a CDC Ebola screening directive naming three countries and a mandated arrival airport (IAD) with differentiated guidance for US nationals vs non-US nationals; and a **Japan fuel surcharge** disclosure with an explicit numeric trigger — "if the yen equivalent of Singapore kerosene exceeds 6,000 yen, the surcharge will be applied. If the average price falls below 6,000 yen, the surcharge will not be applied." Publishing the index, the threshold and both branches of the condition is unusually transparent fee-mechanics disclosure.

## T11 Help-centre architecture

Single-level by trip phase (`Plan` → `Manage` → `Day of travel` → `Post travel`), with a `Common questions, quick answers` self-service module above it and `Contact us` beneath. Structure in T1; architectural notes:

1. **Phase-based, not object-based.** The tree is organised by *when in the journey you are*, not by *what you are asking about*. `Baggage information & fees` sits under `Day of travel`, `Delayed, lost or damaged baggage` under `Post travel` — the same object split across two phases because the user's question differs.
2. **Accessibility gets three separate entries** in `Manage travel`: `Wheelchair & mobility devices`, `Traveling with a Service Animal`, `Additional accessible services`. Three top-level slots out of seven in that column. That is a deliberate allocation.
3. **Routing order is self-service → search-by-category → contact → feedback.** `Can't find what you're looking for?` → `Contact us` → `Share your thoughts` / `Give feedback`. Human contact is second-to-last and feedback is last — the Wise ordering.
4. **Cross-brand routing is handled explicitly and early** `[observed]`: "Flying on Hawaiian Airlines? For assistance regarding travel on Hawaiian airlines, please visit the Hawaiian Airlines Help Center." Placed at the top of the help centre, before the topic tree. Mid-merger, the highest-frequency wrong-door problem is wrong-brand, and Alaska intercepts it first. Note `Hawaiian airlines` lowercase-a in the body against `Hawaiian Airlines` in the heading.
5. **A stray debug artefact** `[observed]`: `#### Session ID:` renders as a visible heading with no value at the foot of the help centre. A support-diagnostic field leaking into the public page.

**Article-title grammar** — only topic labels were retrievable, not article titles. The topic labels are overwhelmingly **noun phrases** (`Baggage information & fees`, `Airport Guides`, `Lap Infants`) with a minority of gerund phrases (`Traveling with a pet`, `Children traveling alone`) and one imperative (`Change or cancel a reservation`). No question-form labels at all — a contrast with Lime and Wise, both of which put user questions in the IA.

## T12 FAQs

Two FAQ sets harvested, with different structures.

**Travel experiences — upgrade FAQ, nine questions** `[observed]`. Answers present in server HTML.

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | How do I upgrade? | Three sub-headed paths — `On the website`, `On the mobile app`, `On the Day of travel` — each naming the exact controls |
| 2 | What types of upgrades are there? | Four named products (`Main Preferred`, `Premium Class`, `First Class`, `International Business Class`) each with its entry point |
| 3 | Can I pay for an upgrade for one person in my travel party? | Yes for Premium/Main Preferred (per-passenger); **no for First Class** — "all members of your party will be upgraded for the entire trip" |
| 4 | What about complimentary status upgrades? | Routes out |
| 5 | Can I cancel just the upgraded portion of the seat and receive a refund? | "In most cases, seat upgrades are non-refundable" + a conditional path |
| 6 | How do I get the receipt for my upgrade purchase? | Email on reservation, or send elsewhere |
| 7 | What are the differences in benefits between the International Business Class, First Class, Premium Class, and Main Preferred? | Defines `Main Preferred` as the same benefits in better locations |
| 8 | Can I use my Atmos™ Rewards points to purchase seat upgrades? | `No, you cannot use points for seat upgrades at this time.` |
| 9 | How many points do I earn when I upgrade? | Base + bonus + Status points by upgraded fare class |
| 10 | Can I upgrade into First Class if I originally booked Main cabin? | Yes, pay the fare delta |
| 11 | I received a First Class "Last Minute Upgrade" message, what is that? | Defines the 48-hour discounted upgrade **and its exclusions** |

Q11 is the standout: **an FAQ written to decode a notification the user has already received**, quoting the notification's own label back at them (`"Last Minute Upgrade"` in quotation marks). It then states what the cheap upgrade does *not* include ("these discounted upgrades do not include bonus points or lounge access for long-distance flights"). An FAQ entry whose trigger is a push message is a pattern worth stealing for any product that sends offers.

Q8's answer is the flat negation `No, you cannot use points for seat upgrades at this time.` — `at this time` is the only hedge, and it is the right one.

Q7 supplies the definition of `Main Preferred` that the comparison matrix omits: "Main Preferred has the same benefits as Main Cabin, in more favorable locations. Some seats also have additional legroom, **but do not include additional benefits.**" A named product that exists only in the FAQ and not in the four-cabin structure — a taxonomy gap papered over by an FAQ answer.

**Saver fares — eight-tab FAQ** `[observed]`, tabs: `Limitations` · `Purchasing` · `Seating` · `Check-in/boarding` · `Baggage/carry-ons` · `Accessible services` · `For Atmos™ Rewards members` · `Flight delays, cancellations, and schedule changes`.

**Ordering is the artefact.** `Limitations` is tab one — the restricted fare's FAQ opens on its restrictions, before purchasing. Tabs 2–5 are the mechanics. Tabs 6–8 are the three audiences most likely to be disadvantaged: passengers with disabilities, elite members, and passengers whose flight breaks. **The last tab is disruption**, and its answer is "the same choices as a guest on a Main fare." A basic-economy FAQ that ends by telling you the airline will not treat you worse when it fails is a strong closing beat.

Q shapes across both sets: predominantly `How do I …?` and `Can I …?`, with three first-person statements (`I received a First Class "Last Minute Upgrade" message, what is that?`, `I have a disability that limits my seating options when I travel. Can I still purchase a Saver ticket?`, `I need additional time and assistance to board the flight. Can I still pre-board with a Saver fare?`). **The first-person shape is reserved for the accessibility questions and the notification-decoding question** — i.e. for the moments where the user has a situation, not just a query. That is a coherent allocation.

## T13 Terminology & glossary

| Term | Alaska's usage | The alternative it rejected |
|---|---|---|
| `guest` | The passenger, throughout marketing and FAQs | "passenger", "customer" — though `customer` survives in `Customer Service Commitment`, `customer care representatives`, and the help-centre intro |
| `travel experience` | The umbrella noun for a cabin/fare bundle | "cabin", "fare class", "product" |
| `Saver fare` | The restricted fare family | "Basic Economy" — **explicitly positioned against it in the meta description** |
| `Main Cabin` / `Main fares` / `Main` | Standard economy | "Economy", "Coach" |
| `Main Preferred` | Better-located Main seats | Defined only in an FAQ |
| `Premium Class` | Premium economy | "Economy Plus", "Comfort+" |
| `First Class` / `Suites` | Domestic front cabin / 787 lie-flat | `Suites` used as a standalone cabin name in the international matrix |
| `Atmos™ Rewards` | The loyalty programme | Replaces **Mileage Plan**; trademark symbol retained inline in body copy and nav |
| `points` / `Status points` / `lifetime flown miles` | Three distinct currencies | Note `points` replaces `miles` for earning, while `miles` survives in `lifetime flown miles` and `Million Miler` |
| `Million Miler` | Lifetime tier | Legacy `miles` vocabulary preserved in a tier name |
| `Companion Fare` | The named discount benefit | |
| `Flight Pass` | Subscription product | |
| `credit certificate` / `Account wallet` / `Travel Credits` | **Three names for residual trip value** | `Wallet` in nav, `credit certificate` in waiver copy, `Travel Credits` in the help tree |
| `flexible travel policy` | Alaska's name for a disruption waiver | "travel waiver", "exception policy" — though `Exception Policy` appears as a sub-heading *inside* a flexible travel policy |
| `Waiver code` | The trade-facing identifier, published to consumers | |
| `Customer Commitment` | The DOT plan, chunked and named | "Customer Service Plan" (Delta/Southwest's term) |
| `Choices During a Delay` / `Care During a Delay` / `Comfort During Extended Delays` | The three disruption commitments | A numbered list |
| `travel advisories` | Standing disruption surface | "alerts", "travel notices" |
| `Seasonal baggage limits` | Peak-period embargo | "embargo" (Delta's term) |
| `Wine Flies Free™` | Trademarked route perk | |
| `Atmos for Business` | SME programme | |
| `Trip inspiration with AI` | A nav item | The only AI-labelled feature on the site |

**Register split.** Marketing and help say `guest`; the regulatory and support-infrastructure layer says `customer` (`Customer Service Commitment`, `Customer service` footer group, `customer care representatives`). The split tracks the compliance boundary rather than surface formality — Alaska is a *guest* company until it is being regulated, at which point it becomes a *customer* company. Consistent, if unintentional.

**The residual-value vocabulary is the weakest area.** A passenger with a cancelled trip may encounter `Travel Credits` (help tree), `credit certificate` (waiver copy), `Account wallet` (waiver copy), `Wallet` (account nav) and `future travel credit` (advisory copy) — five labels for money you already paid. This is the same class of defect as Turo's `host`/`Owner` split, and it sits on the disruption path.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the guest; first-person plural for the airline, consistently as an actor in adverse copy ("we will move you to the next available flight", "We will accommodate you on a different flight and waive any change or cancellation fees", "We are offering a flexible travel policy"). Future tense is used for commitments, present for state. The airline is never a passive system in disruption copy — every remedial sentence has `we` as its subject.

**Register gradient, four bands.**
- *Warm-conversational* in help routing and disruption reassurance: `Got a question or need a hand?`, `If your new flight works for you, great! We'll see you onboard.`, `And remember, …`
- *Playful* on Saver only: `Make friends, save a bunch of money`, `Keep calm, and bring a carry-on.`, `Make your feed binge worthy.`, `friend seekers`, `start your party early`
- *Neutral-instructional* in the FAQs and matrices
- *Flat and absolute* in `Limitations` and the refund footnote: `Saver fares are non-transferable.`, `the total fare will be forfeited`, `you are not eligible for a refund`

The gradient is well controlled with one exception: the Saver page sets a jokey tone in its hero and then, four screens later, tells you that missing one flight forfeits your entire ticket. The tonal distance between `Make friends` and `the total fare will be forfeited` on a single page is the largest in the file.

**One unguarded sentence** `[observed]`: "Want to protect your trip from cancellations, lost baggage, and **other nasties**? Explore Trip Insurance." — `other nasties` is the only slang on any harvested page, and it is attached to an upsell for a paid product, placed on the page of the fare least able to absorb disruption. Tonally and commercially the weakest moment observed.

**Numbers as trust devices** `[observed]`: `4 ways`, `up to 1 day earlier or later`, `up to 7 days earlier or later`, `50% credit`, `14 days`, `24 hours`, `2 hours prior to departure`, `4–6 weeks`, `30% of the points flown`, `13-digit ticket number`, `code "027"`, `6,000 yen`, `up to 50lbs` / `up to 70lbs`, `5" of extra legroom`, `at least 2,000 miles`, `1,000+ worldwide destinations`, `30+ airline partners`, `70,000 Bonus Points`. Dense and mostly specific. `countless awards` (Main Cabin) is the one unfalsifiable claim.

**Accessibility content** `[observed]`

- `Skip to main content` is **first in the DOM on every rendered page**. Correct.
- **Two named link-behaviour notices in the footer**, as persistent text: "Notice indicator that this external link may not follow the same accessibility or privacy policies as Alaska Airlines." and "Notice indicator to alert users that action will result in the browser opening a new tab or window." These are the screen-reader-only legends for icon indicators used throughout the site. Publishing an explicit, sentence-length explanation of both an external-link and a new-window indicator — and naming *accessibility policies* as one of the reasons external links are flagged — is better practice than the usual bare "(opens in new window)".
- Inline `(opens in new window)` appears in visible link text (`Flight Pass (opens in new window)`, `Cars (opens in new window)`, `Package deals (opens in new window)`) — belt and braces alongside the icon.
- Icon images carry descriptive alt: `Blanket and pillow icon`, `cocktail icon`, `laying down icon`, `slippers icon`, `Question mark icon`, `plane icon`, `Alaska Airlines Logo`, `Alaska Airlines Tail`, `Oneworld`. Photographic images carry scene-level alt: `Passenger loading carry-on`, `Passenger being served hot coffee`, `Tablet device behind the seat`, `Inflight fruit and cheese platter`, `Passenger enjoying inflight text messaging on their mobile phone.` Good, and the last one is a full sentence with a full stop.
- **The comparison matrices use `yes`/`no` text, not icons**, in the serialised output — if that is the rendered content rather than an icon's alt text, it is the accessible choice for a dense table.
- The language/currency switcher pairs both values in the link text (`English (US) - USD`, `日本語 (JP) - JPY`) — one control, two dimensions, disclosed.
- **Defects:** `Infant Basinets` misspelling in the help tree; `#### Session ID:` debug heading rendered publicly; a visible raw URL used as link text on the homepage-equivalent pattern (`https://www.alaskaair.com/enroll` appearing as link text on the Saver page).
- The `Atmos™` trademark symbol is repeated in running body copy (`Atmos™ Rewards points`, `Atmos™ Silver, Atmos™ Gold, Atmos™ Platinum, and Atmos™ Titanium`) — four trademark symbols in one sentence, which screen readers may announce.

**Negative findings, recorded honestly**

- `Premium Class` carries two different taglines on one page (`A new benchmark for accessible luxury` / `The elevated standard`)
- Saver points-withdrawal stated five times with two different end dates, and the earn rate (`30%`) appears in only one of the five
- As at harvest, the Saver points copy describes a benefit whose stated end dates have passed
- Contact-tracing instruction and its own "currently suspended" footnote co-exist in one block
- `cancelation` vs `cancellation` vs `canceled` on one page
- Hyphen/em-dash inconsistency between two parallel disruption sentences
- Five names for residual trip value (`Travel Credits` / `credit certificate` / `Account wallet` / `Wallet` / `future travel credit`)
- `Care During a Delay` meta description contains a typo (`can case`) in a DOT-commitment description
- `Infant Basinets` misspelling; `#### Session ID:` debug artefact
- `Main Preferred` is a named purchasable product absent from the four-cabin taxonomy and defined only in an FAQ answer
- `Seated E-Scooter`-equivalent gap: `Suites` appears as a distinct cabin in the international matrix and in nav, but the "4 ways to fly" headline counts four
- `other nasties` in an insurance upsell on the Saver page
- Mixed title/sentence casing within single help-tree columns

---

## Transferable patterns

1. **Chunk a compliance document into separately named, separately linkable commitments, and name them for the passenger's experience of time.** `Choices During a Delay` → `Care During a Delay` → `Comfort During Extended Delays`. The regulatory list becomes a legible escalation ladder, and an agent can link to exactly one clause. Directly applicable to any regulated disclosure set currently shipped as a numbered list.
2. **Lead disruption copy with the remedy already applied.** "we will move you to the next available flight. If your new flight works for you, great! We'll see you onboard." The default is *done*; the user's job is to accept or override, not to initiate. Transfers to any recovery flow where the system can act first.
3. **Quantify the self-service window as a plain number, and let it differ by severity.** `up to 1 day earlier or later` for a schedule change; `up to 7 days` for a cancellation. Two numbers, no fee discussion, no phone number.
4. **Teach the user to identify their own artefact.** "a 13-digit ticket number that begins with Alaska Airlines code '027'" and "Saver tickets appear as fare class (X) on your flight confirmation details." Exposing an internal code as a self-identification method resolves eligibility disputes before they start.
5. **Publish the B2B code to the B2C reader.** `Waiver code: KJPNSTORM0926` on the consumer advisory page lets a passenger hand the identifier straight to their agent. Condition: only where the intermediary is a normal part of the journey.
6. **Put the disability carve-outs inside the restricted product's own FAQ.** Alaska answers "can I still buy the cheap fare?" on the cheap fare's page, three times, all `Yes.` Answering at the point of the worry beats answering on a dedicated page.
7. **Decouple disruption entitlement from fare family, and say so on the cheapest fare's page.** "the same choices as a guest on a Main fare." One sentence that removes the restricted-fare buyer's largest unspoken fear.
8. **Name what is *not* affected in the same notice as the restriction.** "French and English Bulldogs can't travel in the cargo hold. **Pets in Cabin travel is unaffected.**" Two lines, one avoided support contact.
9. **Anti-pattern: stating one rule at five levels of precision across one page.** The Saver points withdrawal is accurate in the FAQ and misleading in the matrix, the card and the hero. One rule, one canonical statement, everything else links to it.

## Caveats & gaps

- **The Customer Commitment bodies — the single highest-value target for this product — were not retrievable.** alaskaair.com renders body content client-side; every `customer-commitment-*` URL returned navigation, footer and `<head>` only, in both `en-US` and `en-AU`. **No meal-voucher threshold, hotel commitment, notification-timing promise, rebooking obligation or compensation figure from Alaska's DOT plan is recorded in this file.** The commitment *names*, *URLs*, *footer labels* and three `<meta description>` strings are all that could be captured, and they are marked `[documented]`. An authenticated or browser-rendered pass is required.
- **No Alaska baggage fee figure is recorded.** `Optional services and fees` and `Baggage policies` both failed to render bodies. Where the international matrix states baggage *allowances* (1 or 2 bags, 50lb/70lb), those are captured; the *fee* table is not.
- **The accessible-services page did not render.** T14's accessibility content is drawn from footer notices, alt text and the Saver FAQ's accessibility tab, not from Alaska's substantial ACAA disclosure. The page that did resolve under `accessible-services/` is titled `Boarding flights using jet bridges and ramp stairs` — a sub-topic, not the overview — suggesting the nav link points into the middle of the section.
- **The homepage returned a title only.** No hero, no search form, no booking-widget labels. T2 and T5 are correspondingly thin.
- **Flight Status, Trips, check-in and the booking flow are all SPA or authenticated.** No flight-state vocabulary (`On time`, `Boarding`, `Departed`, `Delayed`) was observable. T6 covers the *disruption-policy* vocabulary only, not the status-display vocabulary — a meaningful distinction for a product whose benchmark strength is "itinerary and disruption communication".
- **Live waiver content is ephemeral.** `Typhoon Dujuan` and `Hurricane Lowell` were active on 2026-09-21 and the template is recorded, but the specific dates, cities and waiver codes will not persist.
- **Merger state.** Alaska and Hawaiian are mid-integration; `Atmos™ Rewards` has replaced Mileage Plan, and several nav and footer strings still route to `/content/mileage-plan/` paths. Some vocabulary captured here is transitional and should be re-verified before use as precedent.
- **Saver points-earning copy is past its own stated end dates** at harvest, so that section documents a benefit that has likely lapsed. Recorded as observed with the dates attached.
- Non-US locales, the Contract of Carriage, `Canadian air travel rights`, `EU/UK 261 air passenger rights`, airport guides and the mobile app are unharvested.

## Sources

1. https://www.alaskaair.com/ (title only — client-rendered)
2. https://www.alaskaair.com/content/about-us/help-contact
3. https://www.alaskaair.com/content/advisories/travel-advisories
4. https://www.alaskaair.com/content/travel-info/flight-experience
5. https://www.alaskaair.com/content/travel-info/flight-experience/saver
6. https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-overview (nav + metadata only)
7. https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-delay-choices (nav + metadata only)
8. https://www.alaskaair.com/content/about-us/customer-commitment/customer-commitment-delay-care (nav + metadata only)
9. https://www.alaskaair.com/en-au/content/about-us/customer-commitment/customer-commitment-delay-care (nav + metadata only)
10. https://www.alaskaair.com/content/travel-info/optional-services-fees (nav + metadata only)
11. https://www.alaskaair.com/content/travel-info/baggage/overview (nav + metadata only)
12. https://www.alaskaair.com/content/travel-info/accessible-services/airport-accessibility (nav + metadata only)
13. https://www.alaskaair.com/content/travel-info/policies/policies-overview (nav + metadata only)
