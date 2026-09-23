# 081. Airbnb

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Short-term rental marketplace (two-sided: guest / host / co-host) |
| Primary URL | https://www.airbnb.com/ |
| Corpus rank | 081 |
| Benchmark strength (source list) | Trust, booking, hosting, status |
| Locale / market observed | en-US, USD |
| Platform observed | Web (desktop), help centre, community-policy pages, host marketing |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US total-price-display law (drives a mandatory, non-toggleable fee-inclusive price in the US); EU **European Accessibility Act** and WCAG 2.1 AA cited in the digital accessibility statement; VAT/JCT/GST and local occupancy-tax collection disclosed per jurisdiction; insurance disclaimers ("AirCover is not an insurance policy", "Host Damage Protection … is not insurance") |
| Harvest date | 2026-09-21 |
| Pages inspected | 20 |
| Harvest completeness | Near-full — one critical article (`Understanding your reservation status`, article 363) is an accordion whose section bodies are not in server HTML; the four *group* names were captured but individual status names inside them were not. `airbnb.design` now 301-redirects to the homepage, so the published design-system material is not reachable. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.airbnb.com/ | Nav, search-bar field labels, listing-card grammar, badge copy, footer IA |
| Help centre home | https://www.airbnb.com/help | Full two-audience category tree (Guest / Host tabs) |
| AirCover for guests | https://www.airbnb.com/aircover → /help/article/3218 | Trust product; scope, exclusions, 4-step recovery sequence |
| Cancellation policies for your home | https://www.airbnb.com/help/article/3735 → /help/article/475 | **Named policy inventory with exact windows and refund splits** (host-facing) |
| Understanding home cancellation policies as a guest | https://www.airbnb.com/help/article/4052 | Same domain, guest register — direct comparison |
| Major Disruptive Events Policy | https://www.airbnb.com/help/article/1320 | Covered/not-covered lists, activation model |
| Rebooking and refund policy for homes | https://www.airbnb.com/help/article/2868 | Defines the coined term "Reservation Issue" |
| Host Cancellation Policy for homes | https://www.airbnb.com/help/article/990 | Host-side penalties, fee tiers, "responsible for a cancellation" |
| Reservation status (topic) | https://www.airbnb.com/help/topic/1596 | Five status articles |
| Understanding your reservation status | https://www.airbnb.com/help/article/363 | Four status *groups*; bodies collapsed |
| What is the "pending" status for a reservation? | https://www.airbnb.com/help/article/2810 | Pending / Declined / Expired, with the 24h and 12h clocks |
| Cancellations (topic) | https://www.airbnb.com/help/topic/1367 | Three named sub-sections incl. host-initiated |
| Issues with your reservation (topic) | https://www.airbnb.com/help/topic/1374 | Three sub-sections; Resolution Center cluster |
| Pricing and fees (topic) | https://www.airbnb.com/help/topic/1355 | Seven fee articles |
| How pricing works for homes | https://www.airbnb.com/help/article/125 | Fee taxonomy |
| Pricing display in the United States | https://www.airbnb.com/help/article/3610 | **Total-price display under US law; toggle disabled** |
| Review basics for everyone | https://www.airbnb.com/help/topic/1410 | Reviews/trust IA |
| Accessibility at Airbnb | https://www.airbnb.com/accessibility | Statement + accessibility-feature search filters + alt-text sample |
| Host your home on Airbnb | https://www.airbnb.com/host/homes | Host-side value prop, FAQ set, AirCover for Hosts disclaimer |
| airbnb.design | https://airbnb.design/ | **301 to www.airbnb.com** — design-system site retired |

---

## T1 Navigation & IA labels

**Global nav is a product-type switcher, not a feature menu** `[observed]`

`All` · `Homes` · `Experiences` · `Services` — four tabs, each with an animated icon,
each a noun for a *thing you buy*. `Experiences` and `Services` are Airbnb's own
coinages sitting beside the generic `Homes`. The default tab is `All`, which is
notable: the search entry point does not pre-commit the user to a product.

Beside them: `Become a host` · locale/currency selector · `Help Center` ·
`Log in or sign up`. Under `Become a host`: `Find a co-host` · `Gift cards`.

**Help centre is explicitly two-audience, with a tab switch** `[observed]`

The help home renders `Browse articles` then `Guest` (and a Host counterpart).
Guest-side top level:

| Group | Category labels (verbatim) |
|---|---|
| `Searching and booking` | `Search tips` · `Booking places to stay` · `Booking Airbnb Experiences` · `Booking Airbnb Services` · `Booking for someone else` · `Booking Airbnb.org stays` · `Messaging` · `Travel insurance` |
| `Your reservations as a guest` | `Reservation status` · `Changes as a guest` · `Cancellations` · `Checking in` · `Checking out` · `Preparing for an Airbnb Experience` · `Issues with your reservation` |
| `Payments and pricing` | `Paying for a reservation` · `Guest refunds and reimbursements` · `Pricing and fees` · `Coupons, credits, and gift cards` · `Invoices and receipts` · `Taxes for guests` |
| `Your account` | `Setting up your account` · `Identity verification` · `Managing your account` · `Account security` |
| `Reviews` | `Review basics for everyone` · `Understanding reviews as a host` · `Reviewing your host` · `After a review is submitted` |
| `Safety` | `Safety concerns` · `Safety tips and guidelines` · `Reporting issues` · `Accessibility and inclusion` |
| `About Airbnb` | `Getting started` · `How Airbnb works` · `Our community policies` · `Partnerships` · `Contact info and feedback` |

Two structural choices worth stealing. First, **`Reservation status` is a
top-level help category in its own right** — status is treated as a user-facing
concept with its own IA node, not as an implementation detail. Second, the group
names carry the audience marker inline (`Your reservations as a guest`,
`Understanding reviews as a host`), so a label pulled out of context still says
who it is for.

**Breadcrumbs are four to six levels deep and fully spelled out** `[observed]`

`Home > All topics > Searching and booking > Booking places to stay > Booking basics > AirCover for guests`
and
`Home > All topics > Managing your home listing > Booking settings and Instant Book > Booking settings > Cancellation policies for your home`.

The second is the tell: the *guest-facing* named cancellation policies live under
a **host** branch of the IA, buried under `Booking settings`. A guest who wants
the definitive Flexible/Moderate/Firm windows has to read a host article.

**Every help article carries a type + audience chip** `[observed]`

`How-to • Guest` · `How-to • Host` · `How-to • Home host` · `Guide • Guest` ·
`Community policy` · `Community policy • Home host` · `Legal terms • Guest`.
Five article types, three audience values, combined as a two-part stamp above the
title. `Community policy` with no audience suffix signals "binds both sides".

**Footer groupings** `[observed]`: `Support` · `Hosting` · `Airbnb`.
`Cancellation options` sits in `Support` but links to the *Extenuating
Circumstances / COVID-19* article slug — a stale link target, see T14.

## T2 Value proposition & headline patterns

**The guest homepage has no hero headline at all** `[observed]`

There is no slogan and no value-prop sentence above the fold. The page opens
directly into the search bar and then straight into location-personalised
carousels. The proposition is carried entirely by the meta description —
`8 million vacation rentals → 2 million Guest Favorites → 220+ countries and regions worldwide`
— which never appears on screen. Airbnb is confident enough in the brand to
spend zero pixels explaining itself to a guest.

**Carousel headings are a location + availability statement** `[observed]`

`Popular homes in Hocking Hills State Park` · `Available in Gatlinburg this weekend` ·
`Stay in Cleveland` · `Great hotels for your next trip`

Three different grammatical shapes for the same component: a superlative
(`Popular homes in X`), an availability claim (`Available in X this weekend`),
and a bare imperative (`Stay in X`). Only one carries a subhead —
"Plus, get Airbnb credit when you stay at a featured hotel." — which is where
the commercial offer lives.

**The host page, by contrast, leads with a conditional earnings claim** `[observed]`

> `Your home could make money on Airbnb`

`could` is doing careful work: a modal verb rather than "makes" or "will make",
paired with an adjustable nights slider and the link `Learn how we estimate earnings`.
The claim is hedged in the verb and then routed to a methodology page.

**Three-benefit block: possessive/contraction headline + one sentence** `[observed]`

- `It's easy` — "Create a listing in just a few steps, and get 1-1 support from experienced hosts at any time."
- `It's worth it` — "Getting started is free. You set your price, and we only collect a fee after you've gotten paid."
- `You're protected` — "Peace of mind for your home and belongings every time you host on Airbnb."

All three headlines are contractions of a subject + copula. The middle one is
the interesting one: `It's worth it` is an *answer to an objection*, not a
feature name, and its body sentence is three clauses of fee mechanics rather
than benefit language.

**Section headers on the host page are declarative reassurances** `[observed]`

`Join millions of hosts on Airbnb` · `A co-host can help you get started` ·
`When you host, you're protected` · `Your place looks great on Airbnb` ·
`Hosting isn't only for homeowners` · `Your questions, answered`

`Hosting isn't only for homeowners` is a negation-first header aimed squarely at
the renter segment — the same "state what you are not first" move Wise uses in
its regulatory disclosure, applied here to eligibility.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Log in or sign up` | Global nav | **One combined label for two actions** — avoids the sign-up/register split seen elsewhere |
| `Become a host` | Global nav | Role-change, not purchase |
| `Get started` | Host page, sticky top and bottom | Generic; the only bare-generic CTA found |
| `Let's talk` | Host page, "Curious about hosting?" | Conversational, low-commitment |
| `Ask about hosting` | Host page form | Paired with an AI disclosure (see T10) |
| `Find a co-host` | Nav and host page | Verb + coined role noun |
| `See all` | End of every homepage carousel | |
| `Show more` | Long SEO link list | Progressive disclosure |
| `Learn how we estimate earnings` | Beside the earnings slider | Methodology link at the point of claim |
| `Learn about AirCover` | Host protection block | Names the product, not "Learn more" |
| `See details and exclusions` | Under the AirCover table | **Leads with "exclusions"** — unusually candid for a protection CTA |
| `Learn more` | Airbnb-friendly apartments block | Bare generic, duplicated twice adjacently in the DOM |
| `Download the Airbnb app` | Host page | |
| `Contact us` | Help centre, under "Need to get in touch?" | Placed last |
| `Skip to content` | First in DOM | Accessibility |
| `Yes` / `No` | Foot of every help article, under `Did this article help?` | Two-word feedback, no scale |
| `Log in or sign up` | Foot of every help article | Repeated with the sub-line "Get help with your reservations, account, and more." |

**Observation.** On help articles the sign-in prompt appears *twice* at the foot
(a heading-plus-button pair, then a bare button), and the `Learn more` on the
host page also renders twice consecutively. Both are responsive-variant
duplicates; screen-reader users may encounter each twice.

## T4 Onboarding & getting-started

`[observed]` — Airbnb does not ship a numbered "how it works" for guests on the
public homepage. The guest onboarding narrative is instead pushed into the search
bar's own field labels (see T5) and into help articles.

**Host getting-started is framed as questions, not steps** `[observed]`

The host page's `Top questions` carousel is seven cards, each a question that
links to a Resource Center article:

1. `Is my place right for Airbnb?`
2. `How does hosting work?`
3. `How do I get started?`
4. `How do I get my space ready?`
5. `How often do I have to host?`
6. `How does Airbnb protect hosts?`
7. `Are there any hosting regulations?`

Ordered as: eligibility → mechanism → first action → preparation → **commitment**
→ protection → legal risk. Q5 (`How often do I have to host?`) and Q7
(`Are there any hosting regulations?`) are the two that address the real
objections — fear of lock-in and fear of illegality — and Airbnb puts them in
the primary getting-started set rather than hiding them in help.

Two further sub-tabs sit below: `Hosting basics` · `Co-hosts`.

**The guest-side equivalent lives in help** `[documented]`:
`Getting started` · `How Airbnb works` under `About Airbnb`.

**AirCover's recovery sequence is the one genuinely numbered flow** `[observed]`
— see T7.

## T5 Form & field labels

**The search bar is the product's primary pre-auth form, and it is three
question-words** `[observed]`

| Label | Placeholder / hint |
|---|---|
| `Where` | (empty) |
| `When` | `Add dates` |
| `Who` | `Add guests` |

This is the most quotable string set in the file. The labels are bare
interrogatives — `Where`, `When`, `Who` — and the placeholders are imperatives
that name the object (`Add dates`, `Add guests`). Question above, instruction
below. No "Destination", no "Check-in / Check-out", no "Guests". The interrogative
framing means the control reads as a conversation rather than a database query,
and it survives translation and truncation better than compound noun labels.

**Listing-card grammar is a fixed six-slot template** `[observed]`

1. Badge: `Guest favorite`
2. Title: `<Property type> in <Place>` — `Cave in South Bloomingville`, `Tiny home in Logan`, `Townhouse in Edgewater`
3. Price: `$1,222`
4. Price qualifier: `for 2 nights`
5. Combined string for screen readers: `$1,222 for 2 nights`
6. Rating: `4.99 out of 5 average rating` then the visible `4.99`

The title slot is **generated, not authored**: property type plus neighbourhood.
Hotels break the template and use their trade name instead (`The Hoxton, Chicago`,
`Staypineapple, An Iconic Hotel, The Loop`), which is a visible seam where a
new supply type was bolted onto an existing card component.

The price is always rendered twice in the DOM — once split across elements for
visual layout, once as a single concatenated string. Same for the rating
(`4.99 out of 5 average rating` + `4.99`). This is a deliberate
accessible-name pattern: build the sentence for the screen reader separately
from the visual fragments.

**Accessibility filter labels** `[observed]`, from the alt text describing the
filter sheet: a `Accessibility Features` section heading, features grouped by
area such as `Guest entrance and parking`, and individual features written as
measurable facts: `step-free guest entrance`, `guest entrance wider than 32 inches`.
Numeric thresholds rather than adjectives — "wider than 32 inches", not
"wide entrance".

## T6 Status & state language — **PRIORITY**

Airbnb models reservation status as a first-class, documented, user-facing object
with its own help category. This is the richest status vocabulary in the travel
set.

**The status taxonomy is organised by trip phase, not by system state** `[observed]`

`Understanding your reservation status` (article 363) opens with
"Here's every reservation status you might encounter as a host or guest, what it
means, and what action—if any—you should take." and then splits into four
accordion groups:

1. `Pre-trip statuses`
2. `During-trip status` *(singular — there is exactly one)*
3. `Post-trip statuses`
4. `Canceled, declined, or expired statuses`

The singular in group 2 is a content decision with real information value: it
tells the reader before they expand anything that once a stay begins there is
only one state to be in. Group 4 bundles the three *terminal negative* states
under one heading rather than distributing them chronologically.

The framing clause — "what action—if any—you should take" — is the
transferable part: a status article that commits up front to telling the user
whether the state requires anything of them.

> **Gap, recorded honestly:** the individual status names inside these four
> groups are accordion-collapsed and not present in server HTML. The group names
> above are verbatim; the member states are not retrievable from this surface.

**Named states confirmed elsewhere** `[observed]`, all quoted directly from
article 2810 and the topic pages:

| State | Verbatim framing | Clock |
|---|---|---|
| `Pending` | "A reservation may be 'Pending' because a host needs to respond to a reservation request or because of identity verification." | Host has **24 hours** to accept or decline; identity verification has **12 hours** from booking |
| `Declined` | "the booking status will be updated as 'Declined' or 'Expired,' and your payment will be refunded" | Set by host action |
| `Expired` | same sentence as above | Set by the 24-hour timer lapsing |
| `Confirmed` | Implied throughout: "Once you have a confirmed reservation, your host has 24 hours to respond." | |
| `Canceled` | Used as a state across cancellation IA | |
| Instant Book | "You'll be charged once a host accepts your reservation request, or immediately if you use Instant Book" | Names the *absence* of a pending state |

**`Pending` is deliberately overloaded, and Airbnb documents the overload
rather than splitting the state.** One label covers two completely different
causes (host hasn't answered / you haven't verified) with two different clocks
(24h vs 12h) and two different outcomes (refund vs auto-cancellation). Rather
than shipping `Awaiting host` and `Verification needed`, Airbnb keeps one state
and writes an article whose entire job is disambiguating it. The article's two
H2s are the disambiguation: `The host needs to respond to your request` and
`You need to complete identity verification` — both written in second person,
both naming *who* must act.

The article closes with an affordance note rather than a warning:
"While a reservation is in 'Pending' status, you can cancel it at any time on
the booking details page." The pending state is framed as *escapable*, which
defuses the anxiety the state creates.

**Status is findable from three surfaces** `[documented]` —
`Find your reservation status as a guest` ("in your messages or by going to Trips"),
`Where hosts can check the status of a reservation`
("Today tab, messages, or calendar"). Guests get `Trips`; hosts get a `Today` tab.
The same concept, two different home surfaces, two different nouns.

**Related state-adjacent vocabulary** `[documented]`:
`trip request` (the pre-confirmation object — distinct from `reservation`),
`trip change request` (the alteration object, host-approved),
`confirmation code`, `itinerary`, `adjustment` (the host-earnings deduction
object: "what an adjustment on your earnings means"), `payout`,
`blocked calendar` (the punitive state applied to a host's listing after a
cancellation), and `Superhost status` (a revocable account state).

**A listing can be hidden while a reservation stays live** `[documented]` —
`If you can't find the place you booked on the site`:
"If you have a confirmed reservation with the host, your reservation is active,
even if the host turns off the listing to hide it from search results."
This is a *reconciling* article of exactly the kind Wise writes for
"complete" — it exists because two system states (listing visibility,
reservation validity) are independent and the user assumes they are not.

## T7 Error, failure & recovery — **PRIORITY**

Airbnb's recovery content is unusually well developed because the failure modes
are social (a human host cancels on you) rather than technical.

**The core coined term: `Reservation Issue`** `[observed]`

From the *Rebooking and refund policy for homes* (article 2868, Effective Date
February 6, 2025):

> The term **"Reservation Issue"** refers to these situations:

A capitalised, quoted, explicitly-defined term with a closed list. The list is
the interesting part because it mixes categories:

- `Host cancels the reservation prior to check-in.`
- `Host fails to provide their guest access to the accommodations.`
- Accommodations `not habitable at check-in` — sub-bulleted as
  `Not reasonably clean and sanitary.` and `Contain safety or health hazards.`
- Accommodations `significantly different than advertised` — sub-bulleted as
  `Inaccurate space type`, `Inaccurate type or number of rooms`,
  `Inaccurate location of the accommodations`, failure to disclose that a host,
  another person or a pet will be present, and a `Special amenity or feature`
  advertised but absent or non-functional

Note `significantly different` — the same adjective is reused as the link text
on the AirCover page (`significantly different`). One adjective, one threshold,
one policy anchor. Content designers can lift this: pick one threshold word for
the "not as described" failure and never vary it.

**The threshold is also expressed in the negative, with an example** `[observed]`

> AirCover for guests doesn't include more minor inconveniences, like a broken toaster.

A single concrete, slightly comic noun does the work that a paragraph of
qualification would. `a broken toaster` is the most efficient exclusion sentence
in this corpus: it is memorable, it is obviously trivial, and it lets the reader
calibrate every other case against it without a list.

**The recovery sequence is four numbered imperatives with bolded verb labels** `[observed]`

1. **`Document the issue`**: "Take photos or videos as evidence."
2. **`Contact your host`**: "Notify your host within 72 hours of discovery, describing the problem and seeking a resolution."
3. **`Contact us`**: "If your host is unresponsive or unable to resolve the issue, contact us immediately."
4. **`AirCover for guests support`**: help finding comparable accommodation, or a full or partial refund.

The escalation order is host → Airbnb, and the *evidence* step comes first. Step 4
breaks the imperative pattern (it is a noun phrase, not a verb) because it is the
only step the user does not perform.

**The 72-hour clock is stated three times in three registers** `[observed]` —
"Notify your host within 72 hours of discovery" (AirCover, instructional),
"Guests must report Reservation Issues within 72 hours after discovery" (policy,
obligation), and "must contact us or their host within 72 hours after discovery
of the Reservation Issue" (policy, procedural). Same window, three grammatical
frames matched to three reading contexts.

**Host-cancels-before-check-in is the marquee failure, and it gets a named
remedy with a mechanism** `[observed]`

> If a host cancels a reservation prior to check-in, their guest is entitled to a
> full refund, and where appropriate, Airbnb will help the guest find a similar
> place, depending on availability at comparable pricing.

Then the mechanism, which is the genuinely rare bit:

> Airbnb will generally convert the guest's original payment into a **travel
> credit** to facilitate immediate rebooking, but guests can always request a
> refund to their original payment method instead. If the travel credit is unused
> after 72 hours, the amount of the credit will be refunded to the guest's
> original payment method.

Three moves in one paragraph: (a) name the default behaviour, (b) name the
opt-out in the same breath — "but guests can always request a refund to their
original payment method instead" — and (c) put an automatic expiry on the
default so inaction is safe. Most products would ship (a) alone. The phrase
`to facilitate immediate rebooking` explains *why* the default exists, pre-empting
the "you kept my money" reading.

**Recovery article titles are second-person conditionals, not first-person
confessions** `[observed]`

- `If your host cancels your home reservation`
- `If your host asks you to cancel`
- `If your host cancels your service or experience`
- `If you can't find the place you booked on the site`
- `What to do if a host isn't responding`
- `What to do if you accidentally made a booking or booked the wrong dates`
- `What to do if you forgot something during a home stay, service, or experience`

This is the opposite of Wise's `I sent the wrong amount`. Airbnb uses
`If your <other party> <does bad thing>` — the failing actor is named in the
title. The one article where the *guest* is at fault switches shape to
`What to do if you accidentally…`, softening with `accidentally` before naming
the user's error. **The grammar encodes fault**: `If your host cancels…` vs
`What to do if you accidentally…`. Two different title shapes for two different
blame assignments, applied consistently.

**The single best line in the recovery set** `[observed]`, from
`If your host asks you to cancel`:

> "If your host can't accommodate your reservation, don't cancel for them—it's their responsibility to cancel."

An imperative negative plus the reason, in one sentence with an em-dash. It
protects the guest from a known host-side manipulation (get the guest to cancel
so the host avoids the penalty) by naming the manipulation and the correct
counter-behaviour. Very few marketplaces will write copy that tells one side
their counterparty may be gaming them.

**Host-side failure content is punitive and quantified** `[observed]`, from the
*Host Cancellation Policy for homes* (Effective date October 9, 2023). The opening
sentence is a rhetorical structure worth studying:

> "Although cancellations by hosts are rare, and some cancellations are beyond a
> host's control, cancellations by hosts can disrupt guest plans and undermine
> confidence in our community."

Concede (rare), concede again (sometimes blameless), *then* state the harm — and
the harm is framed as harm to the guest and the community, not to Airbnb. The
policy then justifies its own fees: the consequences "are intended to reflect the
costs and other impacts of these cancellations on guests, the broader host
community, and Airbnb."

Fee tiers, verbatim (minimum `$50 USD`):

| When cancelled | Fee |
|---|---|
| 48 hours or less before check-in, or after check-in | 50% of the reservation amount for the nights not stayed |
| Between 48 hours and 30 days before check-in | 25% of the reservation amount |
| More than 30 days before check-in | 10% of the reservation amount |

With a defined base: "the reservation amount includes the base rate, cleaning fee,
and any pet fees, but excludes taxes and guest fees."

**`found to be responsible for a cancellation`** is a separate coined state — a
host can incur the penalty without having pressed cancel. The examples are named:
"double-booking a Listing, substituting another property for the Listing booked
by the guest, or gross Listing inaccuracies that materially disrupt a guest stay,
like advertising a pool when no pool is available for use by guests."

And the obligation is stated as a positive duty with a consequence ladder:
"Hosts are obligated to cancel a reservation if their listing is uninhabitable or
is inconsistent with what the guest booked. Failure to do so may result in
listing suspension, cancellation of existing reservations, and refunds to guests
until the listing is habitable…"

**Non-punitive escape hatch, named** `[documented]`:
`Canceling a reservation as a host without adverse consequences` — the phrase
`valid reasons` is a defined category with its own article (2022), examples
including "major damage to a listing".

**Post-trip disagreement has a named venue** `[observed]`: the `Resolution Center`,
with four articles — `How the Resolution Center helps you`,
`Request or send money in the Resolution Center`, `Find your Resolution Center requests`,
and `After your home stay, service, or experience: Handling disagreements`.
The last title is the register tell: **`disagreements`**, not "disputes",
"claims", or "complaints". A deliberately de-escalated noun for a money fight.

## T8 Empty states

`[absent]` on the public surfaces harvested. The homepage carousels render
`0 of 0 items showing` as a live-region status string before hydration — that is
a loading state, not an authored empty state. All true empty states
(no trips, no messages, no listings, no search results) are behind auth or
require a live search that was not performed.

## T9 Notifications & system messages

`[documented]` — notification behaviour is described inside help rather than
shown:

- `How long a host has to respond to your trip request` — "You'll be updated by email with the status."
- `If your host cancels your service or experience` — "you'll be notified immediately and you'll be refunded in full."
- `Finding the booking confirmation for an Experience` — "we'll send you an email confirmation after you book"
- Reservation confirmation is described as retrievable from `Messages` or `Trips`, and the confirmation email is a distinct artefact from the in-app record.

**In-page system banner** `[observed]`, non-JS fallback on every page:

> "We're sorry, some parts of the Airbnb website don't work properly without JavaScript enabled."

Apology-first, scope-bounded ("some parts"), no instruction on how to fix it.

**Live-region strings** `[observed]`: `0 of 0 items showing` on carousels;
`Show previous card` / `Show next card` as control names.

## T10 Disclosures, legal & compliance — **PRIORITY**

### The named cancellation policies

This is the highest-value artefact in the travel domain and Airbnb publishes it
in full. All verbatim from article 475 (reached via `/help/article/3735`).
**Every window and percentage below is quoted, not inferred.**

Framing rules that apply to *all* standard policies `[observed]`:

- "Your standard cancellation policy applies to all reservations of **27 or fewer consecutive nights**."
- "A **24-hour cancellation period** applies to all standard cancellation policies for shorter stays (less than 28 nights). This allows guests to cancel for a full refund including taxes for up to 24 hours after the reservation is confirmed, **as long as the reservation was confirmed at least 7 days before check-in**."
- "**'Full refund' refers to the price that you set for your listing including taxes.**" — the term is defined before it is used, in a bullet titled `Important things to know about cancellation policies`.
- "Cancellation and booking confirmation times are always based on the **local time zone for the listing**."
- "Certain non-refundable hotel listings are exempt from the 24-hour free standard cancellation period."

**Standard policies for shorter stays** — each written as a two- or three-bullet
`if/then` from the **host's** point of view (the "you" is the host):

| Policy name | Free-cancellation window | After that |
|---|---|---|
| `Flexible` | "Guests can cancel until **24 hours before check-in** for a full refund including taxes, and you won't be paid" | "they'll receive a refund of pro-rated taxes, and you'll be paid for each night they stay, **plus one additional night**" |
| `Moderate` | "until **5 days before check-in** for a full refund including taxes" | "pro-rated taxes, and you'll be paid for each night they stay, plus one additional night, **plus 50% for all unspent nights**" |
| `Limited` *(available for reservations booked on or after October 1, 2025)* | "until **14 days before check-in** for a full refund including taxes" | "between **7 and 14 days** before check-in, but after the 24-hour cancellation period, they'll receive a **50% refund including full taxes**"; "**less than 7 days** before check-in … refund of pro-rated taxes, and you'll be paid **100% for all nights**" |
| `Firm` | "until **30 days before check-in** for a full refund including taxes" | "between **7 and 30 days** before check-in … **50% refund including full taxes**"; "**less than 7 days** … pro-rated taxes, you'll be paid **100% for all nights**" |

**By-invitation-only policies** — prefaced with
"These cancellation policies are only available to certain hosts by invitation from Airbnb:"

| Policy name | Terms (verbatim) |
|---|---|
| `Strict` | "If guests cancel **7 or more days** before check-in, but after the 24-hour cancellation period, they'll receive a **50% refund including full taxes**"; "less than 7 days … pro-rated taxes, and you'll be paid 100% for all nights" |
| `Super strict 30 days` | "at least **30 days** before check-in … 50% refund including full taxes"; "less than 30 days … pro-rated taxes … 100% for all nights" |
| `Super strict 60 days` | "at least **60 days** before check-in … 50% refund including full taxes"; "less than 60 days … pro-rated taxes … 100% for all nights" |

**Long-term policies for monthly stays** (28+ consecutive nights) — only two
names, and both names are **reused** from the short-stay set with different terms:

| Policy name | Terms (verbatim) |
|---|---|
| `Firm` (long-term) | "To receive a full refund including taxes, guests must cancel **at least 30 days before check-in**"; after that "you'll be paid 100% for all nights spent, **plus 30 additional nights**"; if fewer than 30 nights remain, pro-rated tax refund and 100% of remaining nights |
| `Strict` (long-term) | "guests must cancel **within 48 hours of booking**, and the cancellation must occur **at least 28 days before check-in**"; after that "100% for the nights already spent, **plus the next 30 nights** from the reservation" |

**This name reuse is the single biggest content-design defect in the set.**
`Firm` means "30 days before check-in" in both systems but the penalty structures
diverge completely, and `Strict` means "7 days" in one system and "48 hours from
booking" in the other. A guest who has learned `Strict` on a weekend booking will
be wrong about `Strict` on a monthly one. The only signal that the term has been
redefined is the H2 above it.

**The non-refundable option is an add-on, not a policy name** `[observed]`

> "The non-refundable option lets guests book at a discounted rate that's not
> subject to your standard cancellation policy. If they cancel, they won't be
> refunded."

Crucially, the 24-hour floor still applies: "the non-refundable option is still
subject to the 24-hour cancellation period that applies to all bookings for
shorter stays, with the exception of certain non-refundable hotel listings."
Airbnb keeps one inviolable floor under every commercial variant, then names the
one exception. That floor-plus-named-exception structure is highly transferable.

**Override language is explicit and named** `[observed]`

The article has a section headed `When your cancellation policy may be overridden
for a guest refund` naming exactly two overrides: a `Major Disruptive Event`, and
an issue covered under the `Refund and Rebooking Policy for Homes`. The policy
hierarchy is then stated as a precedence rule: "When this Policy applies, it
controls and takes precedence over the reservation's cancellation policy."

And the money consequence for the host is spelled out rather than left implicit:
"An adjustment will be automatically deducted from the next scheduled payout."

**Jurisdictional carve-outs are listed, not buried** `[observed]`, under
`Special cases in which a different cancellation policy may apply`: Italy
(pre-1 Oct 2025), South Korean guests at Strict listings, Germany, and
"a 24-hour free cancellation period for reservations in California."

**The honesty clause** `[observed]` — a section headed
`If your cancellation policy isn't described in this article`:

> "We sometimes test new cancellation policies. If you can't find your
> cancellation policy described in this article, please refer to the reservation
> details for the booking."

A policy document that admits it may be incomplete because of live
experimentation, and routes the reader to the authoritative per-booking record.
Rare and worth copying: it acknowledges that A/B testing creates documentation
drift instead of pretending it doesn't.

**Guest-side register on the same subject is visibly softer** `[observed]`,
from article 4052:

> "You can find the cancellation policy displayed on the listing page, when you
> confirm and pay, and in your confirmation email, so you'll know exactly what to
> expect if your plans change."

Note what changes. No windows, no percentages, no named policies at all. The guest
article names *three surfaces where the policy is shown* instead of naming the
policies. And it adds a rule the host article does not state plainly:

> "The cancellation policy for your stay is based on the **check-in date**, not how many nights you book"
> (shipped without a full stop — see T14)

Plus an alteration-consequence table:
- **`Check-in date change:`** "A different cancellation policy may apply"
- **`Only checkout date changes:`** "The cancellation policy remains unchanged"

And a refund-timing triplet that separates the two actors:
- "Refunds follow the cancellation policy that applies when you cancel"
- "**Airbnb processes refunds right away; your bank controls how soon the money posts**"
- "If a host cancels, you get a full refund and help finding a similar place, **no matter the policy**"

The middle bullet is the model sentence for refund-timing copy anywhere:
one semicolon, two named actors, two clearly divided responsibilities, no hedging
adverbs. Elsewhere Airbnb gives the number — "most refunds arrive within 15 days,
but for some payment methods and regions, it might take longer."

**Paid flexibility is a product** `[observed]`:
`Get more flexibility with an extended cancellation option` —
"Extended cancellation is an option that allows you to **pay Airbnb** to extend
the listing's free cancellation window up to 24 hours before check-in." The
article is explicit that "the additional reservation cost is paid to Airbnb",
disclosing who receives the money.

### Major Disruptive Events Policy

`[observed]` — renamed from the older "Extenuating Circumstances" policy.
Structure: `Overview` → `What events are covered` → `What happens if a
reservation is impacted by a covered Event` → `What is not covered` → `How this
policy affects hosts` → `Other things to be aware of`.

The **negative** sections are longer and more specific than the positive ones,
which is the correct weighting for an exclusion-heavy policy.

Covered events, each a bolded noun phrase followed by scope and then an immediate
carve-out:

- **`Declared public health emergencies and epidemics.`** — "This does not include diseases that are endemic (for example, the flu) or commonly associated with an area (for example, malaria in Thailand). **COVID-19 is not covered under this Major Disruptive Events Policy.**"
- **`Government travel restrictions.`** — "such as an evacuation order or shelter-in-place order. This does not include non-binding travel advisories and similar government guidance."
- **`Military actions and other hostilities.`**
- **`Large-scale outages of essential utilities.`** — "impacting the vast majority of homes in a given location."
- **`Unforeseeable natural disasters and severe weather events.`** — "like earthquakes and tsunamis, and unforeseeable severe weather events, like tornadoes."

**Every covered category carries its exclusion in the same paragraph.** The
pattern is: name the category in bold, give one sentence of scope, then
immediately narrow it with "This does not include…" and a worked example. The
worked examples are what make it usable — "malaria in Thailand", "the flu" — and
the COVID-19 exclusion is stated in bold-adjacent plain text rather than hidden,
which is the harder editorial choice.

The foreseeability test is defined by example rather than by rule:

> "Weather or natural conditions that are common enough to be foreseeable in a
> given location, such as **hurricanes in Florida during hurricane season** or
> **winter weather in the northern hemisphere during winter months**"

Two examples, two hemispheres, one principle. Then the exception to the exception:
"—unless the event triggers a covered Event that prevents completion of the
reservation, such as government-issued mandatory travel restrictions."

Not covered — a seven-item list whose first entry is the conceptual key:

> "Events that impact a guest or their ability to travel, but not the reservation location"

That single line is the whole policy in one sentence: **the location is the
subject, not the traveller.** It is placed first, before the specific examples
(injury, jury duty, event cancellation, airline insolvency, flight cancellations,
transportation strikes, road closures).

The activation model is described as an operational process, not a right:
"we assess the situation to determine whether the Major Disruptive Events Policy
applies. If it does, we **activate the Policy for the impacted area and
timeframe** … We continuously monitor these situations and adjust coverage as
needed." A policy that is switched on per geography and per date window, and says
so.

And where the policy does *not* apply, it sets expectations about who is
responsible rather than going silent:

> "we encourage guests and hosts to find a mutually acceptable arrangement…
> Note that any refunds outside of the reservation's cancellation policy are at
> the host's discretion. **Airbnb does not take part in or guarantee such refunds.**"

**Three separate "this is not insurance" disclaimers** `[observed]`:
"The Major Disruptive Events Policy is not an insurance policy." ·
"AirCover for guests is not an insurance policy." ·
"This Policy is not insurance and no premium has been paid by any guest or host."
Plus, on the host page: "Host Damage Protection reimburses for certain guest
damages during Airbnb stays. **It's not insurance** and may apply if guests don't
pay. Liability insurance is provided by 3rd parties."

The last one is doing three disclosures in two sentences: not insurance,
conditional ("may apply if guests don't pay"), third-party underwritten.

**Statutory-rights preservation appears in every policy** `[observed]`:
"This Policy does not limit your rights under local regulations, and any decisions
made by Airbnb under this Policy do not affect your statutory rights." ·
"Our decisions under this Policy are binding, but do not affect other contractual
or statutory rights that may be available."

### Price, fee and tax display

**Total-price display, current wording** `[observed]`, from
`Pricing display in the United States` (article 3610):

> "Laws in the United States set requirements for the way fees and taxes are displayed to US guests."
>
> "Guests in the US will see a **fee-inclusive total price before taxes** on all listings. **The setting to turn total price display on or off has been disabled for these guests.** Taxes which Airbnb collects will be displayed before booking, and the details of the price can still be found in the price breakdown during checkout."

Three things to note. The article **leads with the law**, not with the benefit —
"Laws in the United States set requirements…" — attributing the change to
regulation rather than claiming it as a product improvement. It states plainly
that a user control has been **removed** ("has been disabled"), which most
products would omit. And the precise scope is `fee-inclusive total price
**before taxes**`, not "total price" — the qualifier is load-bearing and is not
dropped.

The tax caveats are then unusually candid about the limits of the display:

- "Taxes which Airbnb does not collect will not be displayed before booking. **Additional taxes not reflected at booking may apply in these jurisdictions.**"
- "If a host has an obligation to collect taxes for a listing in a jurisdiction where Airbnb doesn't collect taxes, the total price won't separately display the taxes to the guest. **The host is encouraged to display or include the tax they're collecting in their nightly price and not charge the tax separately to the guest (e.g., on check-in).**"

The second bullet admits the failure mode — a surprise tax demand at check-in —
and states Airbnb's position on it as an *encouragement* to hosts rather than a
rule. Honest about the gap, honest about the limited enforcement.

**Fee taxonomy** `[observed]`, from article 125. Each fee is a bolded noun phrase
followed by one sentence naming who charges it:

- **`Cleaning fee:`** "Charged by some hosts to cover the cost of cleaning their space after the stay."
- **`Extra guest fee:`** "Charged by some hosts for each additional guest beyond a set number."
- **`Pet fee:`** "Some hosts allow pets to stay in their listings for an additional charge which may be separate from cleaning fees."
- **`Security deposit:`** "Select software-connected hosts may set a security deposit using the appropriate fee field."
- **`Value Added Tax (VAT, JCT, and GST):`** "Charged to guests on the Airbnb service fee who are located in certain countries"
- **`Local taxes:`** "Charged to guests who make bookings in certain locations based on the location of the host's listing"
- **`Airbnb service fee:`** "Depending on the listing, guests may be charged a service fee by Airbnb as part of the total price. **Where hosts have moved to the single fee structure, no guest service fee is charged.**"

Every line answers *who sets this* — host or Airbnb — which is the question a
marketplace fee list actually has to answer. The service-fee line discloses that
two fee architectures run in parallel.

Plus a closing exception, flagged as a `Note:`
"There are a few cases where a host may collect other fees outside Airbnb, but
this should be disclosed in the listing." Backed by a policy article,
`Collecting fees outside Airbnb` — "Hosts may not collect any additional fees or
charges outside the Airbnb platform unless expressly authorized by Airbnb."

**Anti-dark-pattern rule, published** `[observed]`, from `Why some prices are crossed out`:

> "We cross out prices to show that the Host is offering a deal. **A price will only be crossed out if it's a true discount—it has to be at least 10% lower than usual.**"

A numeric threshold for when a strikethrough is permitted, published to users.
This is the rarest kind of disclosure in the set — a product publishing the rule
that constrains its *own* persuasive UI. Directly transferable to any
was/now pricing surface.

**Charge timing** `[observed]`: "You'll be charged once a host accepts your
reservation request, or immediately if you use Instant Book."

**AI disclosure on a lead-gen form** `[observed]`, host page:

> "By selecting Ask about hosting, I acknowledge the Privacy Policy and that I will start chatting with an AI model."

First-person acknowledgement construction, naming the button by its own label,
and disclosing the AI counterpart *before* the conversation starts.

**Co-Host Network disclosure** `[observed]` — a footnote block that qualifies its
own social proof: "Hosts on the Co-Host Network typically have high ratings, low
cancellation rates, and established Airbnb hosting experience. **Ratings are based
on guest reviews for listings they host or co-host and may not represent the
co-host's unique services.**" Followed by the corporate-entity chain
(Airbnb Global Services Limited, Airbnb Living LLC, Airbnb Plataforma Digital Ltda)
and an availability bound ("Available in select locations only.").

## T11 Help-centre architecture

**Three-to-five levels**: `Home` → `All topics` → group → topic → (sub-section) →
article. Each level is a real, linkable, breadcrumbed page.

**The help home leads with three "I" statements, not with search** `[observed]`

Above the category tree sit three illustrated shortcut cards, each written in the
user's first person and present tense:

- `I need help verifying my identity`
- `I can't get into my account`
- `I need to send or request money`

This *is* the Wise confession pattern, but reserved for exactly three
high-volume, high-anxiety tasks and used as top-of-page routing rather than as
the general article-title grammar. Two of the three are account-access failures;
the third is money. Note they are `I need…` / `I can't…` — statements of need and
of blockage, not questions.

**Article-title grammar — six consistent shapes:**

| Shape | Example |
|---|---|
| `How to <verb>` / gerund | `Cancel your home reservation as a guest`, `Leave a review` |
| `If <bad thing happens>` | `If your host cancels your home reservation` |
| `What to do if <bad thing happens>` | `What to do if a host isn't responding` |
| `What is/are <term>?` | `What is the "pending" status for a reservation?` |
| `Understanding <concept>` | `Understanding your reservation status`, `Understanding home cancellation policies as a guest` |
| Policy noun phrase | `Major Disruptive Events Policy`, `Host Cancellation Policy for homes`, `Ground rules for home hosts` |

`Understanding X` is Airbnb's signature explanatory shape and it is always paired
with an audience qualifier when the concept differs by side
(`…as a guest`, `…as a host`).

**Every article carries a one-line summary under the title, written as a
standalone answer** `[observed]` — and these are reused verbatim as the
description in article lists and as the meta description. Examples:

- "You can check the status of your reservation in your messages or by going to Trips and finding your reservation."
- "If your host can't accommodate your reservation, don't cancel for them—it's their responsibility to cancel."
- "While they are issued almost immediately, most refunds arrive within 15 days, but for some payment methods and regions, it might take longer."

Several of these summaries **answer the question outright**, so the user need not
open the article. That is the correct economics for a support index and it is
applied consistently.

**Sub-section names inside topics are plain, functional groupings** `[observed]`.
`Cancellations` splits into `Canceling a reservation` · `Host-initiated cancellations` ·
`Cancellation policies`. `Issues with your reservation` splits into
`Communicating with your host` · `Confirmed reservation help` · `Post-trip help`.
Both are rendered as a comma-run beneath the topic title —
"Communicating with your host; Confirmed reservation help; Post-trip help" —
using **semicolons**, which is an odd choice and reads as a machine-generated
join rather than authored copy.

`Host-initiated cancellations` is the notable label: the marketplace names the
supply side's failure as a first-class support category, in the guest's IA.

**Routing furniture** `[observed]`: three "I" cards → category tree →
`Need to get in touch?` with the reassurance "We'll start with some questions and
get you to the right place." → `Contact us`. Human contact is last, and the
promise made about it is about *triage*, not about speed.

## T12 FAQs

**Guest-side: `[absent]`.** There is no FAQ block on the homepage. The help
centre is the FAQ.

**Host page `Top questions` — seven, verbatim** `[observed]` (full list in T4).
Placement: a horizontally-scrolling card carousel under the heading
`Your questions, answered`, each card an image plus a question, each linking out
to the Resource Center rather than expanding in place. Answers were therefore not
retrieved.

`Your questions, answered` as the section heading is a small, good choice:
possessive + past participle, no "FAQ" acronym, and it promises completion.

**Accessibility page FAQ — six, verbatim** `[observed]`, under `We're here to help`:

| # | Question (verbatim) |
|---|---|
| 1 | How do I use search filters? |
| 2 | How does Airbnb review accessibility features? |
| 3 | Can I bring my access provider or the person who supports me on an experience? |
| 4 | Can I bring my service animal with me? |
| 5 | How can hosts support guests with accessibility needs? |
| 6 | How can hosts add accessibility features to listings? |

Structurally: two guest how-tos, two guest permission questions, two host
questions — **both audiences in one six-item accordion**, with the guest half
first. Q3's phrasing is the standout: `my access provider or the person who
supports me` offers the reader two registers for the same role, the
sector-standard term and the plain-language one, joined by `or`. Most products
pick one and alienate half the audience.

Answers are accordion-collapsed and not in server HTML.

## T13 Terminology & glossary

| Term | Airbnb's usage | The alternative it rejected |
|---|---|---|
| `Homes` / `Experiences` / `Services` | The three product nouns, capitalised as tabs | "Listings", "Activities", "Add-ons" |
| `host` / `Home host` / `co-host` | Lower-case in running text, capitalised only as an audience chip. `Home host` distinguishes from experience/service hosts | "owner", "landlord", "property manager" |
| `Co-Host Network` | Capitalised programme noun | "marketplace of managers" |
| `guest` | Never "customer", "traveller", or "renter" | |
| `Reservation` / `reservation request` / `trip request` | Three distinct objects: the confirmed thing, the ask, and the pre-confirmation ask | "order" |
| `Trips` (guest) vs `Today` tab (host) | Two different homes for the same status information | |
| `Reservation Issue` | Capitalised, quoted, closed-list defined term | "complaint", "claim" |
| `AirCover` / `AirCover for guests` / `AirCover for Hosts` | One brand, two audience variants, and note the **inconsistent capitalisation of "Hosts"** | "guarantee", "protection plan" |
| `Guest favorite` | Listing badge, sentence case | "Top rated", "Recommended" |
| `Superhost status` | A revocable account state | "Premium seller" |
| `Major Disruptive Events Policy` | Current name; replaced "Extenuating Circumstances" | |
| `Ground rules` | The behavioural-standards document, for both sides | "code of conduct", "terms" |
| `Resolution Center` | The money-dispute venue | "claims portal" |
| `disagreements` | Used in the post-trip article title | "disputes" |
| `adjustment` | Money clawed back from a host payout | "chargeback", "penalty" |
| `payout` | Money to the host | "payment" |
| `blocked calendar` | Punitive listing state | |
| `travel credit` | The default refund vehicle after a host cancellation | "voucher", "store credit" |
| `Airbnb credit` | A promotional balance (hotels offer) — **a second, different credit concept** | |
| `extended cancellation option` | Paid flexibility | "cancellation insurance" |
| `non-refundable option` | Explicitly an *option*, not a policy name | "non-refundable rate" |
| `total price` / `fee-inclusive total price before taxes` | The precise form is kept in disclosure contexts | "all-in price" |
| `single fee structure` | The host-pays-all fee architecture | "merchant model" |
| `Airbnb-friendly apartments` | Buildings that permit subletting | "landlord-approved" |
| `Airbnb your home` | **The brand used as a verb**, in the footer | "List your home" |

`Airbnb your home` / `Airbnb your experience` / `Airbnb your service` is the
boldest terminology move on the site: a three-item footer set that verbs the
brand consistently across all three product lines.

**Register split by surface.** Marketing says `Airbnb your home`; help says
`Managing your home listing`. Marketing says `You're protected`; policy says
`Host Damage Protection … is not insurance`. The gradient is steep and matches
Wise's — colloquial in acquisition, flat in consequence.

## T14 Voice, tone & accessibility

**Person.** Second person to the reader throughout, first-person plural for the
company ("we'll help you get rebooked", "we're here to help", "We sometimes test
new cancellation policies"). In the host-facing cancellation-policy article, the
"you" is the **host** and the guest becomes third person ("Guests can cancel…
and **you** won't be paid"). Same document family, inverted pronoun assignment —
consistently, without slipping.

**Register.** Plain, short, declarative. Contractions used freely in help and
marketing ("you'll", "we'll", "doesn't", "can't"), and retained even inside
community policies ("it's their responsibility to cancel", "Although
cancellations by hosts are rare"). Policies read as prose, not as clauses — there
are no numbered sub-clauses, no "hereinafter", and no defined-terms schedule apart
from the single quoted `"Reservation Issue"`.

**Em-dashes carry the reasoning.** "don't cancel for them—it's their
responsibility to cancel" · "It's a different type of home–a private room instead
of an entire home" · "what action—if any—you should take". Note the second one
uses an **en-dash where an em-dash is used elsewhere** — an inconsistency.

**No exclamation marks** were found on any harvested page. No `Oops!`, no
`Great news!`, no `Sorry!` beyond the neutral JS-fallback apology.

**Numbers as trust devices** `[observed]`: `8 million vacation rentals`,
`2 million Guest Favorites`, `220+ countries and regions`,
`over 5 million hosts`, `Up to $3M damage protection`, `Up to $1M liability insurance`,
`24-hour safety line`, `at least 10% lower than usual`, `wider than 32 inches`,
`4.99 out of 5`. Specific rather than rounded, and the protection figures carry
`Up to`.

**Tone flattens as stakes rise**, measurably. Marketing: "Peace of mind for your
home and belongings". Policy on the same product: "Host Damage Protection
reimburses for certain guest damages … It's not insurance and may apply if guests
don't pay." Same feature, two registers, with the qualifier count rising from
zero to three.

### Accessibility content

**A digital accessibility statement with a named standard and a named contact** `[observed]`:

> "Airbnb strives to conform with the **European Accessibility Act** and the
> **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** for our website and
> mobile applications."

`strives to conform` is the hedge — not "conforms", not "is compliant". The
statement then lists five process commitments under `How we work` (design and
engineering practice, employee training, internal and external QA testers, a
cross-functional monitoring team, and training for **customer support agents** on
digital accessibility issues). The last is unusual and worth noting: most
accessibility statements cover product teams only.

Feedback route: a dedicated address, `digital-accessibility@airbnb.com`, with an
explicit routing instruction — "For any other queries apart from digital
accessibility reach out to Airbnb Community Support." Separating the
accessibility inbox from general support, and saying so, prevents the inbox
filling with unrelated tickets.

**`Listen to Airbnb's digital accessibility statement`** `[observed]` — the
statement is offered as audio. A heading that names the modality as the action.

**Three collapsed sections** carry the granular commitments:
`Usability for browsers, assistive technology, and devices` ·
`Limitations and alternatives` · `Accessibility features`.
`Limitations and alternatives` as a published section name is the honest one —
it presupposes there *are* limitations. Bodies not retrievable (accordion).

**Named partner organisations** are shown with logos and descriptive alt text:
United Spinal Association, National Council on Independent Living, American
Association of People with Disabilities, Red Costarricense de Turismo Accesible.
The fourth is Costa Rican — the accreditation set is not US-only.

**Alt text is scene-level and often long** `[observed]`. The accessibility page
carries the best examples in the corpus, because the alt text describes a *UI
screenshot* in full:

> "A mobile phone displays the More filters overlay, which is one of many search
> filters. There is a section heading that reads 'Accessibility Features.' Below
> that accessibility features are grouped by areas like 'Guest entrance and
> parking.' There are checkboxes where you can select as many features as you want."

And one that reproduces a conversation:

> "A mobile phone displays messages between the Host who describes their listing
> as accessible and a guest who wants to know more about the space. The guest's
> message reads: 'Hi Shea, is the ramp at the front or back entrance to your
> house?' The Host's response reads: 'Hello Adam, the ramp is at the front. Thank
> you!'"

This is the transferable practice: when the image *is* the explanation, the alt
text must contain the explanation, including the words shown inside the image.
Most products write "Screenshot of messaging feature" here.

Elsewhere, scene-level alt is used for photography — "Three generations of a
family are smiling and laughing in an accessible Airbnb home. In front of the
oldest family member is a wheelchair." · "A person stands by a four-poster bed,
making the bed with a red bedspread atop white sheets." — and the AirCover logo
carries "The logo for AirCover, in red and white letters, on a black background."

**Accessible-name construction** `[observed]`: listing cards emit both the
visual fragments and a concatenated string (`$1,222 for 2 nights`;
`4.99 out of 5 average rating`). Currency and rating are spelled out for the
screen reader while the visual shows the glyph and the numeral.

**`Skip to content`** is first in the DOM on marketing pages.

### Negative findings, recorded honestly

- **`Firm` and `Strict` are reused as policy names across the short-stay and long-stay systems with materially different terms.** The highest-risk naming collision in this file.
- **`Cancellation options`** in the site footer links to `/help/article/2701/extenuating-circumstances-policy-and-the-coronavirus-covid19` — a stale slug pointing at a superseded policy name, on every page of the site, while the live policy is the Major Disruptive Events Policy.
- **`airbnb.design` 301-redirects to `www.airbnb.com`.** The published design-language material is no longer available at its known address.
- The guest-facing definitive cancellation windows live in a **host-branch** help article (`Managing your home listing > Booking settings and Instant Book > Booking settings`). The guest article deliberately omits them.
- "The cancellation policy for your stay is based on the check-in date, not how many nights you book" ships **without a terminal full stop**.
- `AirCover for guests` vs `AirCover for Hosts` — inconsistent capitalisation of the audience noun within one brand lock-up, on the same footer.
- `Learn more` appears twice consecutively in the DOM on the host page (responsive variants); the help-article sign-in prompt likewise duplicates.
- Topic sub-section lists are joined with **semicolons**
  ("Communicating with your host; Confirmed reservation help; Post-trip help"),
  reading as a machine join rather than authored copy.
- Mixed en-dash / em-dash usage in otherwise identical constructions.
- Homepage carousels expose `0 of 0 items showing` pre-hydration — a live-region
  string a screen reader may announce before any content exists.

---

## Transferable patterns

1. **Interrogative field labels with imperative placeholders.** `Where` / `When` / `Who`, each over `Add dates` / `Add guests`. Question above, instruction below. Shortest possible labels, no compound nouns, translation-robust. Condition: works where the user's intent is already known; it would fail on a form with many similar fields.
2. **Bound an exclusion with one memorable trivial example.** "doesn't include more minor inconveniences, **like a broken toaster**." One concrete noun replaces a paragraph of threshold-setting and lets the reader calibrate every other case. Directly usable for PayPal dispute-eligibility and Buyer Protection scope copy.
3. **Name the default, name the opt-out, and expire the default — in one paragraph.** The host-cancellation refund flow converts to `travel credit` by default, says "but guests can always request a refund to their original payment method instead" in the same breath, and auto-refunds after 72 hours if unused. Most products ship only the default. Transfers to any balance-vs-original-payment-method refund decision.
4. **Let the title grammar encode fault.** `If your host cancels your home reservation` (their fault, named) vs `What to do if you accidentally made a booking` (your fault, softened by an adverb). Two consistent shapes for two blame assignments. The inverse of Wise's first-person confession titles — and the right choice where the counterparty, not the user, caused the failure.
5. **Publish the rule that constrains your own persuasive UI.** "A price will only be crossed out if it's a true discount—it has to be at least 10% lower than usual." A numeric threshold on your own was/now pricing, told to users. Immediately applicable to any promotional-price or savings-claim surface.
6. **Attribute a display change to the law, and admit the control you removed.** "Laws in the United States set requirements…" then "The setting to turn total price display on or off **has been disabled** for these guests." Neither claims credit nor hides the loss of user control. The model for any compliance-forced UI change.
7. **Split refund-timing responsibility across one semicolon.** "Airbnb processes refunds right away; **your bank controls how soon the money posts**." Two actors, two duties, no weasel adverbs, no "up to". The best single sentence in the corpus for payout- and refund-timing copy.
8. **Carry the exclusion in the same paragraph as the inclusion.** Every covered event in the Major Disruptive Events Policy states its own "This does not include…" with a worked example, rather than deferring all exclusions to a later section. Readers who stop after the first bullet still leave correctly calibrated.
9. **Admit that live experimentation makes your documentation incomplete.** "We sometimes test new cancellation policies. If you can't find your cancellation policy described in this article, please refer to the reservation details for the booking." Routes to the authoritative per-record source instead of pretending the doc is exhaustive.
10. **Offer two registers for a contested role noun.** "my access provider **or** the person who supports me". Where a community is split on terminology, the `X or Y` construction serves both without picking a side.
11. **When the image is the explanation, put the explanation in the alt text** — including the words rendered inside the image. Airbnb's accessibility-page alt text transcribes the filter headings and the sample message thread in full.

## Caveats & gaps

- **Individual reservation-status names were not captured.** Article 363's four group headings (`Pre-trip statuses`, `During-trip status`, `Post-trip statuses`, `Canceled, declined, or expired statuses`) are in server HTML; the states inside them are accordion-collapsed and are not. `Pending`, `Declined`, `Expired`, `Confirmed` and `Canceled` are confirmed from other articles; any further state names would need a browser-rendered or authenticated pass. **No status name has been inferred.**
- **All in-product UI is `[documented]`, not `[observed]`.** Toasts, validation messages, confirmation screens, the Trips list, the Today tab, the price breakdown at checkout, and the cancellation flow's refund preview were not seen. Where strings appear in this file they are quoted from help articles describing the UI, and marked as such.
- **Empty states: none found.** Marked `[absent]`.
- **FAQ answers not captured** on either the host page (links out) or the accessibility page (accordion).
- **No search-results page was loaded.** Filter labels, sort labels, `Guest favorite` explanation copy, the price-breakdown panel, and the "total price" toggle itself are therefore unharvested. Entering a destination or dates would have required interacting with a search form, which was out of scope for this pass.
- **Host help centre not opened.** The help home exposes a Guest/Host tab switch; only the Guest tree was captured in full. Host-side category labels are inferred from breadcrumbs (`Managing your home listing`, `Your reservations as a home host`, `Booking settings and Instant Book`) rather than from the tab itself.
- **Experiences and Services help trees** were listed but not opened.
- **Reviews and verification content is thin.** Only the `Review basics for everyone` topic index was captured — five article titles including `Authentic and trustworthy reviews` and `Review tags and highlights`. Article bodies, the `Guest favorite` criteria, and identity-verification copy were not retrieved. Given that trust content is this product's stated benchmark strength, this is the most significant gap in the file.
- **`airbnb.design` is dead** (301 to the homepage). No published design system or content style guide was reachable.
- **Locale is en-US/USD throughout.** Jurisdictional variants (Italy, Germany, South Korea, California) are named in the policy but were not opened, and the EU price-display regime was not checked.
- **Mobile app copy** is out of the public web surface.

## Sources

1. https://www.airbnb.com/
2. https://www.airbnb.com/help
3. https://www.airbnb.com/help/article/3218 (via https://www.airbnb.com/aircover)
4. https://www.airbnb.com/help/article/475 (via https://www.airbnb.com/help/article/3735)
5. https://www.airbnb.com/help/article/4052
6. https://www.airbnb.com/help/article/1320
7. https://www.airbnb.com/help/article/2868
8. https://www.airbnb.com/help/article/990
9. https://www.airbnb.com/help/topic/1596
10. https://www.airbnb.com/help/article/363
11. https://www.airbnb.com/help/article/2810
12. https://www.airbnb.com/help/topic/1367
13. https://www.airbnb.com/help/topic/1374
14. https://www.airbnb.com/help/topic/1355
15. https://www.airbnb.com/help/article/125
16. https://www.airbnb.com/help/article/3610
17. https://www.airbnb.com/help/topic/1410
18. https://www.airbnb.com/accessibility
19. https://www.airbnb.com/host/homes
20. https://airbnb.design/ (redirects to https://www.airbnb.com/)
