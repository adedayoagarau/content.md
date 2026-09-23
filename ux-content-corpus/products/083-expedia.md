# 083. Expedia

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Full-service OTA (flights, stays, cars, packages, cruises, activities) with a cross-brand loyalty layer |
| Primary URL | https://www.expedia.com/ |
| Corpus rank | 083 |
| Benchmark strength (source list) | Itinerary management and recovery |
| Locale / market observed | en-US, USD (one `expedia.ie` link leaked into the US accessibility page — see T14) |
| Platform observed | Web (desktop), Help Center shell, legal/policy landing pages, vertical storefronts |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **WCAG 2.2 AA** named explicitly as the design standard (a step beyond the 2.1 AA cited by peers); a published `Accessibility Policy` PDF; DSA-style content-moderation obligations visible in the Content Guidelines (notice-and-action, reporting flag, moderation-outcome notification); `Your rights as a flights traveler` shipped as a permanent footer link; California Seller of Travel registration in the footer (`CST# 2029030-50`); `Your privacy choices` / `/dnsmpi` (CCPA) |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | **Partial — help-article bodies are unreachable.** The Help Center renders server-side but every `?articleId=NNNNN` URL returns the same category shell; article content is fetched client-side. Four separate article IDs were tried, including the `pwaDialog=article-dialog` deep-link form. **Six help-article titles are captured verbatim from the site footer; none of their bodies.** Partner-side (Expedia Partner Central) was not opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help Center | https://www.expedia.com/service/ → /helpcenter | Full 12-category tree, greeting, sign-in prompt |
| Cancel your hotel or vacation rental booking | https://www.expedia.com/helpcenter/?articleId=12326 | **Shell only** — body client-rendered |
| Cancel your flight | https://www.expedia.com/helpcenter/?articleId=12324 | **Shell only** |
| Refund basics | https://www.expedia.com/helpcenter/?articleId=15253 | **Shell only** |
| Your rights as a flights traveler | https://www.expedia.com/helpcenter/?pwaDialog=article-dialog&…&articleId=40090 | **Shell only** — deep-link form also fails |
| Web Accessibility Policy | https://www.expedia.com/p/info-other/web-accessibility-policy → /lp/b/accessibility-policy | Full |
| Content guidelines | https://www.expedia.com/lp/b/content-guidelines | Full — the richest single source in this file |
| Flights storefront | https://www.expedia.com/Flights | Full — search-form labels, FAQ, Price Drop Protection |
| Stays storefront | https://www.expedia.com/Hotels | Full — search-form labels, refundability framing, FAQ |
| Hotels with free cancellation | https://www.expedia.com/lp/b/free-cancellation → /deals/free-cancellation | Full — the free-cancellation framing and T&C block |
| Book Now, Pay Later Hotels | https://www.expedia.com/lp/b/book-now-pay-later | Full — **live price-display strings and review-score labels** |
| Join One Key | https://www.expedia.com/welcome-one-key | Empty body (title and meta only) |

---

## T1 Navigation & IA labels

**Global nav is a two-tier split: a shop menu and a manage strip** `[observed]`

Tier one sits under the label `Shop travel` and lists the six verticals as plain
plural nouns:

`Stays` · `Flights` · `Cars` · `Packages` · `Things to do` · `Cruises`

Then a divider, then a second group of five commercial/editorial links:
`Deals` · `Groups & meetings` · `Expedia Magazine` · `One Key credit cards` · `Open app`

Tier two is the account strip:
`List your property` · `Support` · `Trips` · `Communication Center` · `Sign in`

Three observations. `Stays` rather than "Hotels" is the primary label even though
the URL is `/Hotels` and the page title is "Hotels, Accommodation & Cheap Hotel
Deals" — the nav has moved to the supply-neutral noun while the SEO surface has
not. `Things to do` is the only multi-word conversational label in an otherwise
one-word set, and it beats the industry's "Activities" / "Experiences" on
plainness. And `Shop travel` as the menu label frames the whole product as
**retail**, not as search or booking.

**`Trips` and `Communication Center` are peers in the nav** `[observed]`. The
itinerary surface and the message surface sit side by side at top level, both
pre-auth. `Communication Center` is a heavy, institutional label for what is
functionally an inbox — see T13.

**`Support` is the nav label; `Help Center` is the page title.** `[observed]`
Two words for one destination, and the underlying path is `/helpcenter/` while
the marketing link on the Stays page calls it "the **service** page"
("you'll have 24/7 access to support through the service page"). Three names,
one destination (see T14).

**Help Center IA — twelve flat categories, no hierarchy** `[observed]`

| Category | Internal `productId` |
|---|---|
| `Flights` | `flight` |
| `Refunds & Charges` | `refunds-and-charges` |
| `Packages` | `packages` |
| `Stays` | `lodging` |
| `Cars` | `car` |
| `Cruises` | `cruise` |
| `Things to do` | `destination-services` |
| `Account` | `account` |
| `Privacy` | `privacy2` |
| `Security` | `security` |
| `Travel Alerts` | `travel-alerts` |
| `Loyalty & Rewards` | `loyalty` |

The structure is **product-line-first**, which is the obvious choice for a
multi-vertical OTA and the opposite of Wise's activity-named categories. A user
whose problem spans two verticals (a package where the flight changed) has no
obvious entry point.

Two categories break the product pattern and are the interesting ones.
**`Refunds & Charges`** is slotted *second*, above four of the six verticals — a
money category promoted above most of the product categories, which is an honest
read of support demand. And **`Travel Alerts`** is a first-class help category for
disruption events, which very few help centres carry.

The internal IDs leak the real data model: `lodging` for `Stays`,
`destination-services` for `Things to do`, and `privacy2` — a versioned key
surfacing in a public URL. These appear in the href, so a user hovering a link
sees `?product=Stays&productId=lodging`.

**The category ordering is not stable.** `[observed]` Across two fetches of the
same Help Center, `Loyalty & Rewards` and `Travel Alerts` swapped positions
(…Security → Travel Alerts → Loyalty & Rewards, vs …Security → Loyalty & Rewards
→ Travel Alerts). Either randomised or personalised; either way the IA is not
learnable by position.

**Footer IA — four groups** `[observed]`: `Company` · `Explore` · `Policies` · `Help`.

`Help` is a **curated six-link set**, not a link to the help centre, and this is
the most useful IA artefact on the site:

1. `Support`
2. `Cancel your hotel or vacation rental booking`
3. `Cancel your flight`
4. `Refund basics`
5. `Use an Expedia coupon`
6. `International travel documents`
7. `Your rights as a flights traveler`

**Four of the seven are about undoing or being compensated for a booking.**
Expedia has decided that the most valuable thing to put in a persistent,
every-page footer is *how to cancel* — twice, split by product — plus refunds and
passenger rights. That is a remarkable prioritisation for a commerce site and the
single clearest signal of where this product's support demand actually sits.

`Refund basics` is the standout title: `basics` promises an explainer, not a
procedure, and it sits as a peer to the two task-shaped `Cancel your…` links.

`Policies` group: `Privacy` · `Cookies` · `Terms of use` · `One Key™ terms and
conditions` · `Vrbo terms and conditions` · `Accessibility` ·
`Your privacy choices` · `Content guidelines and reporting content`.

The last is a compound label — `Content guidelines **and reporting content**` —
which advertises the notice-and-action mechanism in the nav label itself rather
than burying it inside the policy.

**Breadcrumbs: `[absent]`.** Neither the Help Center shell nor the legal landing
pages carry a breadcrumb trail.

## T2 Value proposition & headline patterns

**The storefront headline is the task, in two words** `[observed]`:
`Search flights` · `Search stays`. No slogan, no proposition. The `<h1>` is the
verb the user came to perform.

The marketing claim is then carried entirely by **inline strips beneath the search
widget**, each one sentence:

Stays:
- "**Most hotels are fully refundable. Because flexibility matters.**"
- "As a One Key member you can save 10% or more on over 100,000 hotels worldwide."
- "Save up to 30% when you add a hotel to your flight as a One Key member."
- `Add a flight to Bundle & Save*`

Flights:
- "Add Price Drop Protection and Expedia will pay you back if your flight gets cheaper.*"
- "Expedia One Key members get automatic alerts when the price drops with free Price Tracking for flights."
- "Save up to 30% when you add a hotel to your flight as a One Key member"
- `Add a stay to Bundle & Save*`

**"Most hotels are fully refundable. Because flexibility matters." is the
signature construction.** A bounded claim (`Most`) in sentence one, then a
**sentence fragment beginning with "Because"** as sentence two. The fragment is
grammatically incomplete on purpose: it supplies the motive without a subject, so
it reads as the brand's reasoning rather than as a further claim. Expedia reuses
the same word as a heading elsewhere — `Flexibility matters: Explore deals with
free cancellation options` — making `flexibility` the brand's one-word
territory across both surfaces.

`Most` is the honest part and it is doing the same work as Booking's `most
bookings`. Neither company ships an unqualified refundability promise.

**Every promotional claim carries an asterisk that is actually resolved.**
`[observed]` `Bundle & Save*` and `Price Drop Protection…*` both terminate in a
real footnote at the page foot — for Price Drop Protection:
"*Available for a fee on select flights. Terms apply." Two bounds in eight words:
it costs money, and it is not on everything. A "protection" product whose
footnote leads with `Available for a fee` is being unusually straight about the
fact that it is a paid add-on.

**Section headers on the storefronts are questions or imperatives** `[observed]`:
`Ideas for your next trip` · `Explore stays in trending destinations` ·
`Popular airlines` · `Popular flight destinations` · `Flight deals departing near you` ·
`Tips on booking cheap flights` · `Tips for Booking a Hotel with Expedia`
(note the inconsistent capitalisation between the two Tips headings — see T14).

**Deal-card headings are question + imperative pairs** `[observed]`:

- `Time to get away?` → "Grab a deal on last-minute travel"
- `Stays with flexibility` → "See hotels with free cancellation"
- `Sale: Members save up to 30%` → "Our 30th anniversary sale is on—members save on select stays. Plus, find deals on packages, cars, flights, and more. **Book by October 7.**"

The third is the model promotional card: offer, scope (`select stays`), breadth,
and a **hard deadline as its own short sentence**. Compare Booking's homepage,
which was still running a 2024 deadline in 2026.

Flights uses the same pattern with rhetorical questions that are almost
grammatically broken:
`Looking for a weekend getaway ?` · `Where are you dreaming of going ?` ·
`Experience the luxury of traveling ?` — each with a **space before the question
mark**, and the third is not a question at all (see T14).

**The Book Now Pay Later page is the one place the register goes purple** `[observed]`:

> "Imagine securing your slice of paradise without the immediate financial pinch…"
> "It's not just a booking; it's a **promise of future fun without the financial fuss**."
> "Booking a hotel and embracing the 'pay later' philosophy is a **breeze**."
> "The 'book now, pay later' feature is your **passport to a world of hotels** that cater to forward-thinking travellers."

Heavy alliteration (`financial fuss`, `future fun`), a metaphor per paragraph, and
`travellers` spelled British on a `.com` US page. This is SEO copy operating under
different editorial rules from the rest of the site, and the seam is visible.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Search` | Flights and Stays search widgets | Bare verb, matches the `<h1>` |
| `Done` | Traveller/room picker, closes the popover | Not `Apply` or `Confirm` |
| `Sign in` | Header, repeated in dropdown | |
| `Sign in for Member Price` | On every hotel card with a member rate | **Benefit-specific sign-in, priced** |
| `Not right now` | Help Center, beside `Sign in` | **A named decline option, not an X** |
| `Learn more about One Key` | Header sign-in dropdown | |
| `Shop Deals Now` | Book Now Pay Later hero | Title Case, only occurrence |
| `Add a flight to Bundle & Save*` | Stays widget | CTA containing its own footnote marker |
| `Add a stay to Bundle & Save*` | Flights widget | Mirror of the above |
| `See hotels with free cancellation` | Stays deal card | Fully specific |
| `Grab a deal on last-minute travel` | Stays deal card | |
| `Need to book 9 or more rooms?` | Room picker | **Threshold stated in the link text**, routes to a partner (HotelPlanner) |
| `Open app` | Header | |
| `Skip to main content` | First in DOM | Accessibility |
| `Feedback` | Header dropdown, last item | |
| `Show previous card` / `Show next card` | Carousel controls | Accessible names |
| `Previous image` / `Next image` | Hotel image gallery | |
| `Decrease the number of adults in room 1` | Stepper control | **Fully-qualified accessible name including the room index** |
| `see more information about Standard Rate` | Appended to every struck-through price | Explains the comparator (see T10) |
| `Sign in` / `Not right now` | Help Center interstitial | |

**Three observations.**

`Not right now` is the best small string on the site. The Help Center's sign-in
interstitial (`Sign in for customized help`) offers a named, human, non-permanent
decline — not `Skip`, not `Maybe later`, not a close icon. It concedes the user
may want this eventually without pressing.

`Need to book 9 or more rooms?` puts the **eligibility threshold inside the link
text**, so nobody clicks it and discovers they don't qualify. The same page also
carries a second, nearly identical link (`Groups & meetings` in the header) to the
same third party — two labels, one destination.

The stepper accessible names are fully qualified —
`Decrease the number of adults in room 1` / `Increase the number of children in
room 1` — naming the operation, the quantity, the traveller type **and the room
index**. In a multi-room form this is the difference between usable and unusable
with a screen reader, and most products ship `−` / `+`.

## T4 Onboarding & getting-started

**No guest onboarding sequence exists on the public storefronts.** `[absent]` for
a numbered "how it works" on Flights or Stays.

**The one numbered flow is on the Book Now Pay Later landing page** `[observed]`,
and it is a three-step with bolded step labels:

- **`Step 1: find your ideal hotel`** — browse or search, "use the filters on the search page… On each hotel's page, you can find out if they have a stay now, pay later option, where you only pay at check-in. Alternatively, you can also use the **'Reserve now, pay later'** filter."
- **`Step 2: confirm your payment choice`** — "If you want to pay at check-in, make sure to click **'Pay at Property'**. This means you won't have to pay until you get there."
- **`Step 3: get ready for your vacation`** — "All you need to do now is sit back, relax and get ready for your vacation."

Steps 1 and 2 each name the **exact UI control** the user must find —
`'Reserve now, pay later'` (the filter) and `'Pay at Property'` (the payment
option) — in quotation marks. That is the correct way to write a how-to for a
flow the reader will execute in another surface: quote the label, don't
paraphrase it. Step 3 is a non-step (nothing to do) and says so.

Note the terminology drift *within the same step*: the feature is called
`book now, pay later` in prose, `stay now, pay later` one clause later,
`Reserve now, pay later` as the filter label, and `Pay at Property` as the
payment option. Four names in one paragraph (see T13).

**`Tips on booking cheap flights` and `Tips for Booking a Hotel with Expedia`**
`[observed]` are the real getting-started content — long-form Q&A blocks that
function as decision guides rather than onboarding. Covered in T12.

**One Key enrolment framing** `[observed]`, from the Stays tips block:
"You can become a member of our **One Key Loyalty Rewards** program for free and
enjoy even more discounts." — the programme's full formal name appears only here;
everywhere else it is `One Key`.

## T5 Form & field labels

**Flights search form** `[observed]`

| Label | Notes |
|---|---|
| `Roundtrip` / `One-way` / `Multi-city` | Trip-type toggle, `Roundtrip` closed up as one word |
| `Economy` / `Premium economy` / `Business class` / `First class` | Cabin selector — **`class` appears on two of four labels** |
| `Leaving from` | **Gerund phrase, not "From" or "Origin"** |
| `Going to` | **Gerund phrase, not "To" or "Destination"** |
| `Dates` | Single control for both dates |
| `Travelers` | Not "Passengers" |
| `Adults` | |
| `Children` — `Ages 2 to 17` | Age range as hint text |
| `Infants on lap` — `Younger than 2` | |
| `Infants in seat` — `Younger than 2` | |
| `Done` | Closes the picker |
| `Search` | Submit |

**`Leaving from` / `Going to` is the strongest field-label pair in the travel set
after Airbnb's `Where`/`When`/`Who`.** Both are present-participle phrases
describing *what the traveller is doing*, not what the system stores. They are
also unambiguous under truncation and in voice contexts, where "From"/"To" are
not. And they read correctly when the user has entered a value: "Leaving from
Boston" is a sentence; "From: Boston" is a record.

**The four passenger types are distinguished by physical arrangement, not by
fare class** — `Infants on lap` vs `Infants in seat`, both hinted
`Younger than 2`. Two rows with identical age criteria and different labels,
because the distinction the airline cares about is seating, not age. The hint text
carries the qualifying rule so the label can carry the distinction.

`Ages 2 to 17` under `Children` closes the gap between the infant rows and the
adult row, so the three age bands tile without overlap. That is a small piece of
genuinely careful form content.

**Stays search form** `[observed]`

| Label | Notes |
|---|---|
| `Where to?` | **Interrogative with a question mark**, matching Airbnb's register |
| `Dates` | |
| `Travelers` | |
| `Room 1` | Section heading, numbered |
| `Adults` | |
| `Children` — `Ages 0 to 17` | **Note: `0 to 17` here, `2 to 17` on Flights** |
| `Add another room` | |
| `Need to book 9 or more rooms?` | |
| `Done` | |

**The child age band differs between the two verticals in the same session** —
`Ages 2 to 17` (Flights) and `Ages 0 to 17` (Stays). Both are correct for their
domain (hotels count infants as children; airlines don't), but it means the same
label carries two definitions on one site with no signal that it has changed.

**Book Now Pay Later page uses a third label set** `[observed]`:
`Going to` · `Check-in` · `Check-out` · `Guests` — where the Stays storefront uses
`Where to?` · `Dates` · `Travelers`. **Two hotel search widgets, six labels,
zero overlap.** `Guests` vs `Travelers` and `Check-in`/`Check-out` vs `Dates` are
the same concepts under different names on two pages of one site.

**Named UI controls quoted in prose** `[observed]`: the `'fully refundable' filter`,
the `'Reserve now, pay later'` filter, `Pay at Property`, `'price high to low'`
and `'Guest rating + our choice'` (sort options), the `'Walt Disney World® Resort'`
filter, `'report review'` flag, and filter categories
`Family-friendly` · `All-Inclusive` · `LGBTQ-welcoming` · `Business-friendly`.

`Guest rating + our choice` is a genuinely unusual sort label: it names the
algorithm as a **blend of an objective signal and Expedia's own judgement**, using
a plus sign and the possessive `our`. Most products would call this
"Recommended" and hide the editorial hand. Naming it `+ our choice` is a small act
of algorithmic disclosure in a control label.

## T6 Status & state language — **PRIORITY**

Expedia's itinerary-status vocabulary lives behind `/trips` and inside help
articles that did not render. What *is* observable is the **pricing and
refundability state system on the search card**, which is where Expedia does its
real status work pre-booking, plus a set of booking-lifecycle states named
incidentally in the Content Guidelines.

**Rate and refundability states** `[observed]`

| State | Verbatim | Where |
|---|---|---|
| `Fully Refundable` / `fully refundable` | "each that qualifies will be marked with **'fully refundable' in green letters**" | Stays tips |
| | "several fully refundable flights are available and will be **labeled as such right on your search results page in green text**" | Flights FAQ |
| | "Just look for options marked **'Fully Refundable.'**" | Free-cancellation LP |
| `Reserve now, pay later` | Filter label | Book Now Pay Later |
| `Pay at Property` | Payment option | Book Now Pay Later |
| `Member Price available` | Card badge | Book Now Pay Later |
| `VIP Access` | Property badge | Book Now Pay Later |
| `Standard Rate` | The comparator behind every struck-through price | Book Now Pay Later |
| `19% off` / `18% off` / `22% off` | Discount badge, integer percentage | Book Now Pay Later |

**Expedia documents the *colour* of its own status label, three times, in three
different places.** "marked with 'fully refundable' in green letters",
"labeled as such right on your search results page in green text", and
"Just look for options marked 'Fully Refundable.'" Teaching the user to recognise
a visual token — its wording *and* its colour — is the same move as Booking's
"look for the blue Genius label", and Expedia does it more thoroughly. It is also
an accessibility flag: content that instructs users to identify state by colour
implies colour is carrying meaning (see T14).

Note the casing is inconsistent across the three mentions: `fully refundable`
(lower, in quotes), `Fully Refundable` (title, in quotes), `fully refundable`
(unquoted, running text). The label itself is presumably one of these.

**`Member Price available` is a state, not a price** `[observed]`. The card shows
`Member Price available` as a badge and then `Sign in for Member Price` as the
action — so the card is declaring *the existence of a better state you are not
currently in*. The price shown is the non-member price. This is a two-tier price
display made legible by naming the tier rather than showing a blurred number, and
the badge and the CTA use the identical noun phrase (`Member Price`).

**Booking-lifecycle states, named in the Content Guidelines** `[observed]` —
these are the only itinerary states captured, and they appear because they define
review eligibility:

> "Travelers who attempted to fulfil their booking or participate in their activity can still leave a review. This may include a traveler who:
> - **Was not offered a room when they arrived at the property** or was unable to access the property.
> - **Left earlier than their scheduled departure day.**
> - Had their **booking cancelled mid-stay**/activity.
> - Had their **booking cancelled by the property partner within 24 hours of check-in.**"

Four named failure states, each written as a thing that *happened to the
traveller*. `Was not offered a room when they arrived` is the walked-guest
scenario in plain language — no "relocation", no "overbooking", just the moment
from the traveller's side. `cancelled mid-stay` and `cancelled by the property
partner within 24 hours of check-in` are two distinct, separately-named
late-cancellation states with a time bound on the second.

The review-eligibility framing is what makes these quotable: Expedia defines the
category as `Travelers who **attempted to fulfil** their booking`, which
generalises all four into one concept — attempt, not completion, is the
qualifying event.

**Review-score labels are a six-band named scale over a 10-point number** `[observed]`

| Score | Label |
|---|---|
| `9.4` | `Exceptional` |
| `9.2` | `Wonderful` |
| `9.0` | `Wonderful` |
| `8.8` | `Excellent` |
| `8.2` | `Very Good` |

Rendered as `9.4 out of 10, Exceptional, (18,166 reviews)` — number, comma, word,
comma, count. The band names are all **positive**: `Very Good` is the floor
observed at 8.2, and nothing in the sample carries a neutral or negative word.
The scale is compressed into its top two points and the vocabulary escalates
through four superlatives. `Wonderful` sitting *below* `Exceptional` and *above*
`Excellent` is a ranking most readers could not reproduce — the words do not
carry an intuitive order.

The methodology is disclosed in the Content Guidelines: travellers score
**1–5**, "we convert all scores received to a score out of 10 and then add up all
the published reviews and divide that by the total number of published review
scores." So the displayed 10-point score is a **transformation of a 5-point
input**, disclosed in a policy document that no one reads, and never on the card.

**Sub-scores are a separate submission** `[observed]`: "The overall scores and
these sub-scores are submitted by travelers separately, so they may be different."
Expedia pre-empts the "why doesn't the cleanliness score match the total" question
by stating the independence of the inputs.

**Score provenance is a labelled state** `[observed]` — four distinct kinds of
review, each with its own on-card marker:

- Verified, submitted to Expedia: the default
- `Unverified reviews` — "Any reviews not submitted directly to us and verified by us are **clearly labelled**."
- Viator / Get Your Guide activity reviews — "clearly marked as originating from Viator or Get Your Guide"
- Third-party property scores — "Any review scores imported from a third-party travel site are clearly marked… If a review score is provided on a scale of 1 to 5, **we may double it** to align with our review scoring"
- `incentivized` — "we will also **clearly label the published review as incentivized**"

Five provenance states for one content type, each with a published labelling
commitment. The phrase `clearly labelled` / `clearly marked` recurs five times,
which is either disciplined consistency or boilerplate depending on whether the
labels actually ship.

## T7 Error, failure & recovery — **PRIORITY**

**This is the weakest section of the Expedia harvest, and the reason is
structural: the recovery content exists and is prominently linked, but its bodies
are client-rendered and unreachable.**

**Expedia puts recovery in the persistent footer, which is the finding** `[observed]`

The `Help` footer group on every page:

- `Cancel your hotel or vacation rental booking`
- `Cancel your flight`
- `Refund basics`
- `Your rights as a flights traveler`

Two separate cancel articles, **split by product**, both as imperative second-person
tasks (`Cancel your…`), both permanently in the footer. Not "Cancellations", not
"Manage your booking" — the verb the panicking user is looking for, with the
object named. And splitting hotel from flight at the link level means neither
article has to open with "which product are you cancelling?"

`Your rights as a flights traveler` is the unusual one. A **passenger-rights
article shipped as a standing footer link by the intermediary**, not by the
airline, not buried in terms. Its deep link (`pwaDialog=article-dialog&
product=Flight&productId=flight&articleId=40090`) shows it is a dialog inside the
Flights help category, surfaced globally.

`Refund basics` completes the set: cancel (×2) → get your money back → know your
entitlements.

**`Travel Alerts` as a help category** `[observed]` — a top-level category for
disruption events. No article titles were retrievable.

**Recovery content observed in full: the review-removal and dispute mechanism**
`[observed]`, from the Content Guidelines. This is the one complete recovery
process in the file, and it is a two-sided one:

> "Where reviews are rejected by our moderation processes, **the author is informed
> by email that the review has been rejected because it does not comply with these
> content guidelines. In some cases, the author also has an opportunity to
> re-submit their review for re-moderation.**"

Rejection is notified, the reason is stated, and a re-submission path exists.
Three properties most moderation systems lack, described in one sentence.

Partner-side dispute: "that partner may either **submit a review dispute form** to
us via their partner services tools, or contact Customer Service." Two named
channels.

And a boundary condition stated bluntly as its own one-sentence paragraph:

> "**We do not remove reviews simply because they contain negative content.**"

Eight words of policy that answer the single most common partner request. Placed
at the end of the removal-grounds list, so it reads as the closing rule rather
than as a defence.

**Named prohibited behaviours, with the failure mode spelled out** `[observed]`:

- "Travelers may not **threaten to use a review against a partner to obtain refunds or additional compensation.**"
- "Partners may not **request a positive review in exchange for refunds** or ask a guest to revise a review in order to receive additional compensation."
- "Partners must not submit, or ask travelers to submit, **negative reviews of competitors** in order to lower their review ratings."

Three specific extortion patterns, two directions, named as behaviours rather than
as principles. The first is the notable one — a platform publicly telling
travellers that leveraging a review for a refund is prohibited is commercially
awkward and rarely stated.

**AI is named as a failure mode twice** `[observed]`:

- "Your review must relate to your genuine, first-hand experience and **must not be generated using AI.**"
- "Content that uses generative AI to mislead, misrepresent, or fabricate information, to including by using AI-generated or AI-edited content to misrepresent a property, or to create false allegations of **traveler damage or wrongdoing**."

The second clause is malformed ("to including by using" — see T14) but the
substance is sharp: it anticipates partners using AI-edited images to fabricate
damage claims against guests. That is a forward-looking failure mode most content
policies have not yet reached.

**Expedia's one observable in-product failure-prevention line** `[observed]`,
Flights FAQ: "Just make sure to check the specific policy for each flight before
booking." An instruction to verify, placed at the end of the refundability answer,
in the same position Booking uses ("We recommend confirming your exact
cancellation window…"). Both companies decline to let the summary stand alone.

> **Honest gap:** no error titles, no validation messages, no failure-state copy,
> no rebooking flow language and no itinerary-change wording were observed. Given
> that this product's stated benchmark strength is *itinerary management and
> recovery*, **T7 is materially incomplete** and would need a browser-rendered
> pass over `/helpcenter/` to fill.

## T8 Empty states

`[absent]`. No no-results, no-data or first-run copy on any reachable surface.
The Help Center's `Search` field renders with no result region; the `Trips` and
`Communication Center` surfaces are behind auth.

## T9 Notifications & system messages

`[documented]`, from the Content Guidelines and storefront strips:

- **Review-solicitation, described per vertical and per trigger moment:**
  - Accommodation: "we will send you an **email or a push notification** inviting you to review your stay."
  - Car hire: "we will send you an email or a push notification inviting you to review your experience **after you have picked up your car**." — triggered at pick-up, not at return
  - Activities: "**after you have completed your activity**"

  Three verticals, three explicitly different trigger points, same two channels.
  The car-hire trigger is the interesting one: Expedia asks about the pick-up
  experience while it is fresh, rather than waiting for the return.

- **Auto-submission is a notified system behaviour** `[observed]`: "each completed
  section (such as sub-scores for cleanliness or service) will be **progressively
  auto submitted** to us. If you do not complete all sections of the review, it
  will be **auto submitted for publication after 21 days**." A partial review
  publishes itself on a timer — disclosed, with the number.

- **Moderation rejection is emailed with a reason** (quoted in T7).

- **Price Tracking / price-drop alerts** `[observed]`: "Expedia One Key members get
  **automatic alerts** when the price drops with free Price Tracking for flights."
  Alerts gated behind loyalty membership, and the feature (`Price Tracking`) named
  separately from the product (`Price Drop Protection`).

- **The Vrbo two-way review system runs on a visible clock** `[observed]`:
  "Once either the traveler or partner submits a review, **the other party has 14
  days to submit a review**. We publish each review… **at the same time**. If, after
  14 days… the other party has not submitted their own review, we will publish the
  submitted review (and no additional reviews can be submitted in relation to the
  stay)." A blind-review mechanism described in three sentences with one number
  and a stated terminal condition.

No toast, banner, inline-validation or confirmation-email copy was observed.

## T10 Disclosures, legal & compliance — **PRIORITY**

### Price display — the live strings

`[observed]`, from hotel cards on the Book Now Pay Later landing page. This is the
most complete price-display string set captured in the travel set:

```
VIP Access
9.4 out of 10, Exceptional, (18,166 reviews)
Fontainebleau Las Vegas, MICHELIN Key Award Hotel
Las Vegas
Member Price available
$386 nightly
Price is $1,500
$1,500 total
Price was $1,828, see more information about Standard Rate.
$1,828   ← struck through
Total with taxes and fees
```

Seven price-related strings on one card. Unpack them:

- **`$386 nightly`** — the per-night figure, adverb not preposition (`nightly`, not "per night")
- **`Price is $1,500`** / **`$1,500 total`** — the same number twice: one as a screen-reader sentence, one as the visible token. Same accessible-name-construction technique Airbnb uses on listing cards.
- **`Price was $1,828, see more information about Standard Rate.`** — the struck-through comparator, with **an explanation of what the comparator is appended to the accessible name**
- **`Total with taxes and fees`** — the inclusion statement, rendered **twice** per card in the DOM

**`Price was $1,828, see more information about Standard Rate.` is the single
best price-disclosure string in the corpus.** A was/now claim that carries, in
its own accessible name, (a) the fact that this is a prior price, (b) a named
comparator concept (`Standard Rate`), and (c) a route to the methodology. Most
was/now UIs ship a struck-through number and nothing else. Expedia names the
thing the number came from.

**`Total with taxes and fees`** is the counterpart and it is the phrase Expedia
has settled on for all-in pricing — note it is a **statement about what the
number contains**, not a label like "Total price". It answers the question the
label would provoke.

**`Member Price available`** vs the displayed price: the card shows the public
price and advertises the existence of a lower one. No blurring, no "from",
no fake strikethrough — an honest two-tier display.

**Discount badges are integer percentages** (`19% off`, `18% off`, `22% off`) and
appear only on cards *without* `Member Price available` — the two discount
mechanics are mutually exclusive in the sample.

### Free cancellation framing

`[observed]`, the full block from `/deals/free-cancellation`:

> **`Flexibility matters: Explore deals with free cancellation options`**
>
> "It's always a good idea to ensure you can make changes to your travel plans,
> just in case. To help you get started, we've gathered a great selection of
> hotels to shop below—**all offering free cancellation up to 24 hours before your
> trip**. **We recommend confirming your exact cancellation window on the selected
> hotel's details page.** Searching elsewhere on our site? **Just look for options
> marked 'Fully Refundable.'**"

Four moves in one paragraph:

1. **State the window** — `up to 24 hours before your trip` — and scope it to the curated set on this page (`all offering`), not to the site.
2. **Immediately tell the user not to trust it** — "We recommend confirming your exact cancellation window on the selected hotel's details page." The page's own headline claim is subordinated to the per-property record. This is the same pattern as Airbnb's "please refer to the reservation details for the booking" and Booking's "your cancellation policy": **all three OTAs refuse to let an aggregate claim stand as the authority.**
3. **Distinguish `free cancellation` (the marketing promise) from `Fully Refundable` (the UI label).** These are two different strings for one concept and the copy explicitly bridges them — "Searching elsewhere on our site? Just look for options marked 'Fully Refundable.'" Naming the fact that the label differs from the promise, rather than hoping nobody notices, is the right call even though the underlying inconsistency should not exist.
4. **Teach the recognition token** — quoted, capitalised, and elsewhere colour-specified.

The word `exact` in "your **exact** cancellation window" is doing the heavy
lifting: it concedes that the 24-hour figure is approximate without saying so.

### The promotional terms block

`[observed]`, numbered, at the foot of the free-cancellation page:

> `*Excludes taxes and fees.`
> 1. These offers are only available to Expedia One Key members and Expedia App users who are logged in.
> 2. Prices displayed include the promotional discount and are **per room based on two people sharing a room**.
> 3. Blackout periods may apply and a minimum hotel stay may be required.
> 4. Please check individual hotel for details. Offers are subject to limited availability and may be discontinued without notice.
> 5. Expedia's usual booking terms and conditions apply.
> 6. Promoter: Expedia Inc., 1111 Expedia Group Way W., Seattle, WA 98119, USA.

Six numbered conditions in a legible order: **eligibility → basis of calculation →
restrictions → availability → incorporation by reference → promoter identity.**
Item 2 is the one that matters and is usually missing: the displayed price is
*per room, two sharing*. A solo traveller reading the headline number is reading
the wrong number, and item 2 says so.

Note the tension with the price cards: the asterisk says `*Excludes taxes and fees`
while the cards say `Total with taxes and fees`. Both can be true (the promotional
% excludes tax; the displayed total includes it) but the two statements sit on
adjacent surfaces and appear to contradict.

The Book Now Pay Later page carries a parallel, unnumbered block with an
additional honest line: "Sample hotel prices are for the stated travel period per
night, based on **twin share of the lowest price room type**, excluding taxes and
other fees." — `lowest price room type` is the qualifier that explains why the
advertised number will not match the user's basket.

### Data-claim methodology footnotes

`[observed]`, Flights page. Every data-driven claim carries an asterisk resolving
to a dated methodology statement:

> "*All average ticket pricing data and 24-hour destinations are based on bookings
> made on Expedia .com **from December 2024 – November 2025**, with any comparison
> metrics compared to **December 2023 – November 2024**"
>
> "*Most popular and trending destinations based on searches made on Expedia.com
> from December 2024 – November 2025, compared to searches made December 2023 –
> November 2024"

Two twelve-month windows, a named source (own bookings / own searches), and an
explicit year-on-year comparator. `Expedia .com` carries a stray space (see T14).

The in-text claims themselves are hedged and bounded far more carefully than the
equivalents on peer sites:

- "Friday is **generally** the cheapest day to buy airline tickets… with **around a 3% price difference**."
- "**Based on 2024 and 2025 global flight data**, the most affordable time to book a domestic economy flight is **usually 15 to 30 days** before you travel"
- "Prices **often shift based on demand and remaining seat inventory**"
- "Flight tickets **can sometimes** be cheaper at the last minute, **but it largely depends on** how close to departure you book, your destination, and the fare type."
- "Keep in mind, however, that these are **general trends rather than strict rules**."

`these are general trends rather than strict rules` is the model disclaimer for
data-driven advice: it names the epistemic status of everything above it in eight
words, without retracting any of it.

### Accessibility policy

`[observed]`, `/lp/b/accessibility-policy`. Opens with a **downloadable PDF link**
(`Expedia Accessibility Policy PDF`) — the dual-format disclosure pattern.

> "we have incorporated the World Wide Web Consortium's (W3C) Web Content
> Accessibility Guidelines (**WCAG) 2.2 AA** … into our product design methodology"

**2.2 AA, not 2.1** — a version ahead of Airbnb's stated 2.1 AA. And the verb is
`incorporated … into our product design methodology`, which claims a process
rather than a conformance outcome (compare Airbnb's `strives to conform`).

**A named assistive-technology support matrix** `[observed]` — rare in a public
accessibility statement:

| Assistive Technology | Operating System | Browser |
|---|---|---|
| Voiceover | iOS and OSX | Safari |
| NVDA | Windows 11 | Firefox |
| JAWS | Windows 11 | Chrome |
| Talkback | Android | Chrome |

Prefaced with the scope claim: "We have prioritized supporting the screen reader
and browser combinations **that our travelers use most commonly**". Naming the
tested combinations — and admitting by implication that untested combinations
exist — is far more useful to a disabled user than a conformance badge.

**Organised by disability, not by WCAG principle** `[observed]`:
`Using our platforms with visual disabilities` · `…with hearing disabilities` ·
`…with motor disabilities` · `…with motion/animation sensitivity`. Each section
gives **device-level settings the user can change themselves** (increase text
size, high-contrast mode, `differentiate without color`, closed captions, switch
control, voice commands, keyboard-only navigation, `reduce motion`) and then links
to a per-disability section of a `Digital Accessibility help article`.

That inversion is the transferable idea: an accessibility statement that spends
most of its length telling the user **what they can do**, rather than what the
company has done.

The quality-assurance half names four testing modes ("Automated scans at various
stages of product development · Manual testing by experienced developers and
product teams · Periodic assessments by in-house accessibility subject matter
experts · **Annual website and native application evaluations and testing**") and,
under `Resources`, a `UI Toolkit with pre-built accessible buttons, menus, dialogs
and design patterns` — the closest thing to a published design-system artefact
found on this site.

Contact: `accessibility@expediagroup.com`, plus Live Chat.

### Content guidelines

`[observed]` — `Last updated: 24 August 2026`, with a linked PDF
(`[UPDATED]ContentGuidelines-EN_US-ROW-Aug2026.pdf`) and a stated revision
convention: "These guidelines are updated from time to time and the last date of
revisions is stated at the top of this page."

Opens by explaining **why the policy exists in the user's terms**, not the
company's: "We know our traveler community values reviews and content created by
other travelers and our partners. That's why it is important to us **and to our
travelers** that content on our site and app is truthful, helpful and safe."

Three adjectives — `truthful, helpful and safe` — as the standard, stated once and
then operationalised through the rest of the document.

**Quantified review rules**, all verbatim:

- Submission window: "**within six months** of your stay, car hire, or activity"
- Duplicate handling: "If you submit more than one review for the same property, we'll use the **most recent** one."
- Self-review ban: "You may not review a property that you own, manage, or are otherwise associated with."
- Evidence: "If requested, you must provide us with satisfactory evidence of your experience"
- Auto-submit: "**after 21 days**"
- Scoring: 1–5 in, converted to /10 out
- Accommodation review retention: "we remove accommodation reviews **after three years** (except in cases where a property has only a limited number of reviews)"
- Car-hire review retention: "we remove car hire reviews **after 12 months**"
- Vrbo two-way window: **14 days**

**Two different retention periods for two verticals, both published, both with a
stated rationale** ("To ensure reviews are relevant and helpful to travelers").
The three-year rule even carries its own exception for thin-review properties.
Publishing the shelf-life of user-generated content, per product line, with the
edge case, is rare.

**Moderation is described as a process with named actors** `[observed]`:
"We have a range of processes in place (**automated tools and/or manual human
moderation**)", "We **moderate all reviews** submitted to us and we take reasonable
steps to ensure that only those who have booked or provided a travel service…
can post a review", and the neutrality commitment "We publish and display **all
reviews (both positive and negative)**, as long as they comply" plus
"**We do not edit or otherwise modify reviews or responses** on a partner or
traveler's behalf."

**Prohibited-content list** `[observed]` — twelve bullets, of which the
travel-specific ones are the interesting ones:

- "Advertising of Expedia Group competitor products or services"
- "Unapproved HTML tags, URLs, links, QR codes, #hashtags, or social media handles" — **QR codes** named explicitly, which dates the policy usefully
- "**Property rates, rate ranges or other pricing information in reviews.**"

The last is the one worth flagging: travellers may not publish what they paid.
Defensible (prices are dynamic and a stale price misleads) and also commercially
convenient. Expedia states the rule without giving the reason.

**Guidance for writers is four plain imperatives** `[observed]`:
"Focus on your experience. Be honest, informative, unique and detailed." ·
"Use good grammar, spelling and common sense." ·
"**Reviews and comments on reviews, are not the place to ask for help or voice
frustration with us or our service.**" ·
"Don't use plagiarized content or the experiences of others."

The third redirects a known misuse — reviews used as a support channel — and
names the correct destination ("please reach out to our Customer Support"). Note
the spurious comma in that sentence (see T14).

**Photo requirements are given as raw technical constraints** `[observed]`:
"Images must be in BMP, PNG, GIF or JPEG format. File size must be 5mb or less.
Image must be at least 60 pixels tall. Image must be at least 60 pixels wide."
Four sentences with identical structure, `5mb` lower-cased, and the height/width
split into two sentences that could have been one.

**Reporting mechanism** `[observed]`: "If you are logged into our site or app, you
are also able to report any concerning reviews by clicking on the **'report
review' flag** provided next to individual published reviews." The control is
named and located.

### Other disclosures

- **Seller-of-travel registration** in every footer: `CST# 2029030-50`. `[observed]`
- **Corporate identity separation**: "© 2026 Expedia, Inc., **an Expedia Group company**" and separate T&Cs for `One Key™` and `Vrbo`. The trademark symbol appears on `One Key™` in the footer and nowhere else.
- **Groups routing to a third party**: `Need to book 9 or more rooms?` and `Groups & meetings` both link to `hotelplanner.com` — an off-platform handoff with no on-page disclosure that the user is leaving.

## T11 Help-centre architecture

**One level, twelve categories, no visible sub-structure.** `[observed]` The
Help Center is a flat grid of category tiles over a search field. No topic pages,
no article lists, no breadcrumbs were rendered server-side.

**The page greets by name-slot** `[observed]`:

> `Help Center`
> `Hi, Traveler`
> `How can we help?`
> `Search`

`Hi, Traveler` is a **personalisation fallback rendering for an unauthenticated
user** — the slot expects a first name and ships the role noun instead. It is
not wrong, but it reveals the template. (Compare Airbnb's `Hi, how can we help?`,
which has no name slot at all.)

**The sign-in interstitial is the notable component** `[observed]`:

> `Sign in for customized help`
> [`Sign in`] [`Not right now`]

An illustrated card, placed **between the greeting and the categories**,
promising `customized help` in exchange for authentication. Same priority order
as Wise (`Log in for personalised support` → browse → contact), and with a better
decline label. `customized` is vague enough to be unfalsifiable, but the
placement — before the user has failed to find anything — is a deliberate
deflection-to-personalisation move.

**Help-article titles, six captured verbatim from the footer:**

| Title | Shape |
|---|---|
| `Cancel your hotel or vacation rental booking` | Imperative + compound object |
| `Cancel your flight` | Imperative + object |
| `Refund basics` | Noun + `basics` |
| `Use an Expedia coupon` | Imperative + branded object |
| `International travel documents` | Bare noun phrase |
| `Your rights as a flights traveler` | Possessive + role |

Four grammatical shapes across six titles. Three are imperative tasks, one is an
explainer (`basics`), one is a reference topic, one is an entitlement statement.
The set is coherent because each shape matches its content type, but there is no
single house style.

`Cancel your hotel or vacation rental booking` carries the supply-type split
(`hotel or vacation rental`) in the title, which is Vrbo-inheritance showing:
Expedia sells two lodging types with different cancellation mechanics and the
title refuses to collapse them.

**Three names for one destination** `[observed]`: nav says `Support`, page says
`Help Center`, and the Stays marketing copy says "24/7 access to support through
the **service** page" (matching the legacy `/service/` URL, which redirects).

**Feedback routes** `[observed]`: a `Feedback` link in the header dropdown
(`/p/info-other/feedback.htm`), separate from support.

## T12 FAQs

Expedia's FAQ content is **long-form SEO Q&A appended below the fold on each
storefront**, not accordion blocks. Two sets were captured in full.

### Flights — `Tips on booking cheap flights`

Twelve questions, verbatim `[observed]`:

| # | Question |
|---|---|
| 1 | Which day of the week is the best day to buy cheap airline tickets? |
| 2 | When is the best time to buy airline tickets? |
| 3 | Which are the cheapest days to fly? |
| 4 | Which is the cheapest month to fly? |
| 5 | How can I find the cheapest flights on Expedia? |
| 6 | How can I save money on flights? |
| 7 | How can I get cheap last-minute flight deals? |
| 8 | How do I book with Expedia? |
| 9 | What should I look out for when booking flights? |
| 10 | Where's the cheapest place to travel? |
| 11 | Where can I fly for cheap? |
| 12 | Is it cheaper to buy flights last minute? |
| 13 | **Are fully refundable flights available?** |
| 14 | Why should I book my flight with Expedia? |

**Structural notes.** The sequence is: *when to buy* (Q1–2) → *when to fly* (Q3–4)
→ *how to save* (Q5–7) → *how to use the product* (Q8–9) → *where to go* (Q10–11)
→ back to *when to buy* (Q12) → **refundability** (Q13) → brand close (Q14).

Q12 (`Is it cheaper to buy flights last minute?`) duplicates Q7
(`How can I get cheap last-minute flight deals?`) with a different framing, and
both are answered with substantially the same hedge. Q10 and Q11 are also near
duplicates. This is SEO keyword-targeting shaping the question set — four of
fourteen questions exist to catch query variants rather than to answer distinct
user needs.

**Q13 is the one that earns its place.** In a block otherwise entirely about
price, one question is about **getting your money back**, and its answer is the
most operationally useful text on the page: "several fully refundable flights are
available and will be labeled as such right on your search results page in green
text. You may also filter for fully refundable flights specifically… Just make
sure to check the specific policy for each flight before booking." Label
recognition, filter location, and a verification instruction.

**Answers lead with the number, then bound it.** Q1: "Friday is generally the
cheapest day to buy airline tickets, while Sunday is typically the most expensive,
**with around a 3% price difference**." The hedge adverbs (`generally`,
`typically`, `around`) and the small honest magnitude (3%) together make a weak
claim that is nonetheless worth stating, rather than a strong claim that isn't
true.

Q4 chains three internal links into one sentence and is barely readable as a
result — the answer is built around the anchor text rather than the other way up.

### Stays — `Tips for Booking a Hotel with Expedia`

Eleven questions, verbatim `[observed]`:

| # | Question |
|---|---|
| 1 | How to book a hotel on Expedia? |
| 2 | What are the most important things when choosing a hotel? |
| 3 | How far in advance should I book a hotel? |
| 4 | How can I find the cheapest hotels? |
| 5 | How can I find some of the best deals on hotels? |
| 6 | Why should I book a hotel with Expedia? |
| 7 | **Are hotels fully refundable on Expedia?** |
| 8 | What types of accommodation can I find on Expedia? |
| 9 | Is it possible to filter accommodations based on specific amenities? |
| 10 | How can I explore different star-rated accommodations and accommodation brands? |
| 11 | Are there accommodations located near popular points of interest or in specific neighborhoods? |
| 12 | Do you cater to different types of travelers, such as business or leisure travelers? |

Q1 is ungrammatical as a question (`How to book a hotel on Expedia?` — an infinitive
phrase with a question mark). Q9–Q12 are all "can the product do X?" questions
answered "yes, here's the filter" — a run of four capability confirmations that
read as feature listing rather than as user questions.

**Q2's answer uses bolded label-and-gloss bullets**, the best-structured answer
in either block:

- "**Amenities**: think about what kind of amenities you need to have…"
- "**Location**: the location can also play a major role in your experience…"
- "**Price & Reviews**: you'll want to find a balance between affordability and positive reviews…"

Three decision factors, the third a deliberate pairing of two that trade off
against each other.

**Q3's answer contains a genuinely specific, falsifiable pricing narrative**
`[observed]`: "You can see what's available **up to 40 days in advance**… Prices
tend to go down the closer it gets to the date, especially around the **21-day
mark**. 21 days from your check-in, prices are generally somewhat normal, with
prices often falling, then briefly rising, then falling again." The
fall-rise-fall description is unusually candid about non-monotonic pricing —
most OTAs flatten this into "book early".

It then contradicts itself two sentences later: "you should generally book a hotel
room **between 1 and 3 months** before you travel." Forty days versus one-to-three
months, in one answer (see T14).

### Book Now Pay Later — `FAQs`

Seven questions `[observed]`: `Do you pay for hotels before or after?` ·
`Can you book a hotel and pay later?` · `What does pay later mean when booking a
hotel?` · `How can I book a hotel and pay later?` · `What hotels can you book now,
pay later?` · `Where can I book a hotel and pay later?` · `Can I pay cash at a
hotel after online booking?`

**Six of seven are the same question.** `Can you book a hotel and pay later?` /
`How can I book a hotel and pay later?` / `Where can I book a hotel and pay
later?` / `What hotels can you book now, pay later?` differ only in the
interrogative word. This is keyword-matching at the expense of the reader, and
the answers are correspondingly padded ("Absolutely, and it's a game-changer.").

Q7 (`Can I pay cash at a hotel after online booking?`) is the only one with real
content, and its answer is properly hedged: "Yes, paying cash at the hotel after
booking online is possible, **depending on the hotel's specific policies**…
**Always check the hotel's payment options when you're booking** to ensure that
you can pay in cash on arrival."

## T13 Terminology & glossary

| Term | Expedia's usage | The alternative it rejected |
|---|---|---|
| `Stays` | Primary nav label for lodging; URL is still `/Hotels`, internal ID is `lodging` | "Hotels", "Accommodation" |
| `Things to do` | Activities vertical; internal ID `destination-services` | "Experiences", "Activities", "Attractions" |
| `traveler` / `Traveler` | The user noun throughout, incl. the greeting `Hi, Traveler` | "customer", "guest", "passenger" |
| `partner` / `property partner` | The supply side | "hotel", "supplier", "host" |
| `One Key` / `One Key™` | Cross-brand loyalty programme (Expedia, Hotels.com, Vrbo); full formal name `One Key Loyalty Rewards` appears once | "Rewards" |
| `OneKeyCash` | The currency, closed up, no space | "points", "credits" |
| `Member Price` / `Member Prices` | The logged-in rate; both forms used | "member rate" |
| `VIP Access` | Property quality tier badge | "Preferred", "Premium" |
| `Standard Rate` | The comparator behind a struck-through price | "regular price", "rack rate" |
| `Total with taxes and fees` | The all-in price statement | "Total price" |
| `nightly` | Per-night adverb (`$386 nightly`) | "per night" |
| `Fully Refundable` / `fully refundable` | The UI label; casing varies | "free cancellation" (which is the *marketing* word) |
| `free cancellation` | The marketing promise — **deliberately bridged to `Fully Refundable` in copy** | |
| `Reserve now, pay later` | The filter | |
| `book now, pay later` / `stay now, pay later` / `pay-after-stay` | Three prose variants of the same feature | |
| `Pay at Property` | The payment option | "Pay at hotel", "Pay on arrival" |
| `Bundle & Save` | Cross-sell programme, ampersand, always asterisked | "Package deal" |
| `Price Drop Protection` (paid) vs `Price Tracking` (free, member) | Two distinct named price products | |
| `Communication Center` | The message inbox | "Messages", "Inbox" |
| `Trips` | The itinerary surface | "Bookings", "My trips" |
| `Travel Alerts` | Help category for disruption | "Service updates" |
| `Guest rating + our choice` | A sort label that names its own editorial input | "Recommended" |
| `incentivized` | Labelled review state | "sponsored" |
| `Unverified reviews` | Labelled provenance state | |
| `Exceptional` / `Wonderful` / `Excellent` / `Very Good` | Score bands | numeric only |
| `Expedia Magazine` | Editorial property | "Blog", "Inspiration" |
| `Open app` | App CTA | "Download" |

**`Total with taxes and fees` is the terminology decision worth copying.** It is
not a label; it is a **sentence fragment asserting the composition of the adjacent
number**. Compare Airbnb's `total price` and Booking's silence. The phrase
survives being read aloud out of context and cannot be misread as "total before
tax".

**The pay-later feature has four names in production** — `Reserve now, pay later`
(filter), `Pay at Property` (payment option), `book now, pay later` (prose and
page title), `stay now, pay later` (prose). Plus `pay-after-stay` once. This is
the clearest terminology failure on the site, and it sits on a landing page whose
entire job is explaining the feature.

**Register split.** Search and booking surfaces are terse and functional
(`Search`, `Done`, `Leaving from`). Policy surfaces are formal and complete
("We take reasonable steps to ensure that only those who have booked or provided
a travel service… can post a review"). SEO surfaces are florid
("your slice of paradise", "a promise of future fun without the financial fuss").
Three registers, and the third does not belong to the same product.

## T14 Voice, tone & accessibility

**Person.** Second person to the traveller, first-person plural for the company
("we've gathered a great selection", "We moderate all reviews", "We do not remove
reviews simply because they contain negative content"). The Content Guidelines
switch to third person for partners ("that partner may either submit a review
dispute form"), keeping "you" for the traveller even in a two-sided document.

**Register.** Storefront and form copy is plain, short and imperative. Policy copy
is formal but not legalistic — full sentences, no defined-terms schedule, no
sub-clauses. SEO copy is a different voice entirely.

**Sentence fragments used deliberately as brand voice**: "Because flexibility
matters." · "Stays with flexibility" · "Time to get away?" Each is incomplete and
each works.

**Em-dash used for the promotional turn**: "our 30th anniversary sale is on—members
save on select stays" (unspaced em-dash) vs "we've gathered a great selection of
hotels to shop below—all offering free cancellation" (unspaced em-dash) vs
"Skip the lines, forget the frustration, and head on your way" (asyndeton). The
em-dash convention is at least internally consistent.

**Numbers as trust devices** `[observed]`: `over 100,000 hotels worldwide` ·
`over 500,000 hotels worldwide` (**two different figures for the same claim on two
pages**) · `up to 30%` · `10% or more` · `up to 20% on select hotels` ·
`18,166 reviews` · `9 or more rooms` · `21 days` · `14 days` · `six months` ·
`three years` · `12 months` · `5mb` · `60 pixels`.

**Tone flattens as stakes rise**, sharply: "your slice of paradise" on the pay-later
page; "Sample hotel prices are for the stated travel period per night, based on
twin share of the lowest price room type, excluding taxes and other fees" in the
terms block **on the same page**. The two are perhaps 800 words apart.

### Accessibility content

- **`Skip to main content`** first in DOM on every page. `[observed]`
- **WCAG 2.2 AA** named as the design standard — the highest version claimed in this domain set. `[observed]`
- **A published assistive-technology support matrix** naming Voiceover/Safari, NVDA/Firefox, JAWS/Chrome, Talkback/Chrome. `[observed]`
- **Accessibility statement organised by disability**, with device-level self-help settings for each. `[observed]`
- **A downloadable policy PDF** alongside the web version — dual-format disclosure. `[observed]`
- **Fully-qualified accessible names on stepper controls**: `Decrease the number of adults in room 1` / `Increase the number of children in room 1`. `[observed]`
- **Dual-rendered price strings**: `Price is $1,500` (screen-reader sentence) alongside `$1,500 total` (visible token); `9.4 out of 10, Exceptional, (18,166 reviews)` as one spoken string. `[observed]`
- **Comparator explanation inside the accessible name**: `Price was $1,828, see more information about Standard Rate.` `[observed]`
- **Named carousel and gallery controls**: `Show previous card` / `Show next card` / `Previous image` / `Next image`. `[observed]`
- **Descriptive alt text on destination photography**: "A beach with palm trees, lounge chairs, and a hammock." · "A cityscape with a river, bridges, and a red tram." · "A sunny street lined with historic buildings, a 'ONE WAY' sign, and a flagpole with flags." `[observed]` — scene-level, and the third transcribes a sign in the image.
- **Hotel gallery alt text is amenity metadata, not description** `[observed]`: "8 bars/lounges, 2 poolside bars" · "Seasonal outdoor pool, open 8:00 AM to 6:00 PM, cabanas (surcharge)" · "55-inch flat-screen TV with cable channels, TV, pay movies" · "Premium bedding, in-room safe, desk, laptop workspace". These are database fields serialised into the `alt` attribute. They convey *information* but do not describe the image, and several are internally redundant ("flat-screen TV with cable channels, **TV**, pay movies").
- **Empty alt on gallery images**: several hotel gallery entries render `![...](<>)` — an alt string with **no image source**. A broken asset reference reaching production.
- **The QR-code image has an empty src** but a correct alt: `![QR code to download the app]()` on three separate pages. `[observed]`

### Negative findings, recorded honestly

- **Help-article bodies are entirely client-rendered.** Four article IDs and the `pwaDialog` deep-link form all return the same category shell. For a product benchmarked on *itinerary management and recovery*, the recovery content is structurally unreachable without a browser.
- **`over 100,000 hotels worldwide` (Stays) vs `over 500,000 hotels worldwide` (free-cancellation LP)** — the same One Key discount claim, two figures, 5× apart.
- **The pay-later feature has four production names** (`Reserve now, pay later` / `Pay at Property` / `book now, pay later` / `stay now, pay later`), all on one page.
- **Two hotel search widgets with disjoint label sets**: `Where to?`/`Dates`/`Travelers` (Stays) vs `Going to`/`Check-in`/`Check-out`/`Guests` (Book Now Pay Later).
- **`Ages 2 to 17` (Flights) vs `Ages 0 to 17` (Stays)** for the same `Children` label.
- **Three names for the support destination**: `Support` (nav), `Help Center` (page), "the service page" (Stays copy).
- **Help Center category order is unstable** — `Loyalty & Rewards` and `Travel Alerts` swapped between two fetches.
- **Internal IDs in public URLs**: `productId=lodging`, `productId=destination-services`, **`productId=privacy2`**.
- **`expedia.ie` links on the US accessibility page** — all four `Digital Accessibility help article` links point to the Irish domain from `expedia.com`.
- **`Expedia .com`** with a stray space, in the Flights methodology footnote.
- **A space before the question mark**: `Looking for a weekend getaway ?` · `Where are you dreaming of going ?` · `Experience the luxury of traveling ?` — and the third is an imperative punctuated as a question.
- **Q3 of the Stays FAQ contradicts itself**: "available up to 40 days in advance" and "generally book… between 1 and 3 months before you travel".
- **Six of seven Book Now Pay Later FAQs are the same question** with different interrogatives.
- **Malformed clause in the Content Guidelines**: "Content that uses generative AI to mislead, misrepresent, or fabricate information, **to including by using** AI-generated or AI-edited content…"
- **Spurious comma**: "Reviews and comments on reviews, are not the place to ask for help"
- **British spellings on the US site**: `travellers`, `fulfil`, `labelled`, `hire car`, `holiday rental` (Content Guidelines and pay-later page); mixed with `traveler`, `labeled`, `canceled` elsewhere. The Content Guidelines PDF filename (`…-EN_US-ROW-Aug2026`) suggests a single US/Rest-of-World document is being served to both, which explains it.
- **`$5mb`-style casing**: `5mb` rather than `5 MB`.
- **Inconsistent heading capitalisation**: `Tips on booking cheap flights` (sentence case) vs `Tips for Booking a Hotel with Expedia` (title case).
- **`Fully Refundable` / `fully refundable` / `'fully refundable'`** — three casings/quotings of one label across three pages.
- **Refundability state is taught by colour**: "marked with 'fully refundable' in green letters" / "in green text". If colour is the primary carrier, this is a WCAG 1.4.1 (Use of Colour) concern on a site that claims 2.2 AA. The label text itself is presumably also present, but the copy instructs users to look for the colour.
- **Broken image sources in hotel galleries** (`![alt](<>)`) and on the QR code (`![QR code to download the app]()`).
- **The `*Excludes taxes and fees` asterisk sits on the same page as `Total with taxes and fees` card labels** — resolvable, but confusing adjacency.
- **Off-platform handoff undisclosed**: `Need to book 9 or more rooms?` and `Groups & meetings` both route to hotelplanner.com with no on-page notice.

---

## Transferable patterns

1. **State what the number contains, not what the number is.** `Total with taxes and fees` beats "Total price" because it answers the question the label would provoke, and it survives being read aloud out of context.
2. **Explain the comparator inside the accessible name of a struck-through price.** `Price was $1,828, see more information about Standard Rate.` A was/now claim that names the prior-price concept and routes to its methodology. Directly applicable to any promotional-price, FX-rate or fee-comparison surface.
3. **Put the escape hatch in the persistent footer.** `Cancel your hotel or vacation rental booking` · `Cancel your flight` · `Refund basics` · `Your rights as a flights traveler` — four of seven footer help links are about undoing a purchase, on every page. A deliberate, costly, correct prioritisation.
4. **Gerund field labels beat prepositions.** `Leaving from` / `Going to` read as sentences when populated, are unambiguous under truncation and in voice, and describe the traveller's action rather than the system's record.
5. **Fully qualify stepper accessible names.** `Decrease the number of adults in room 1` — operation, quantity, type, and index. The difference between usable and unusable in a multi-room form.
6. **Name a decline option instead of shipping an X.** `Not right now` beside `Sign in` concedes the user may want it later without pressing now.
7. **Put the eligibility threshold in the link text.** `Need to book 9 or more rooms?` — nobody clicks and then discovers they don't qualify.
8. **Subordinate your own aggregate claim to the per-record source.** "all offering free cancellation up to 24 hours before your trip. **We recommend confirming your exact cancellation window on the selected hotel's details page.**" All three OTAs in this set do this; Expedia's version is the most explicit, and `exact` does the conceding.
9. **Bridge the marketing word to the UI label out loud.** "Searching elsewhere on our site? Just look for options marked 'Fully Refundable.'" If `free cancellation` and `Fully Refundable` must both exist, say so rather than hoping the user maps them.
10. **Number the promotional conditions and lead with eligibility, then the basis of calculation.** Item 2 — "per room based on two people sharing a room" — is the condition that reframes the headline number, and it is stated second, not last.
11. **Publish the shelf-life of user-generated content, per vertical, with the edge case.** Three years for accommodation reviews, twelve months for car hire, "except in cases where a property has only a limited number of reviews", each with a stated reason.
12. **Write the accessibility statement around what the *user* can do.** Expedia's is organised by disability, not by WCAG principle, and most of its length is device-level settings the reader can change today. The named assistive-technology support matrix is worth more than a conformance badge because it also says what is untested.
13. **Label the epistemic status of data-driven advice in one sentence.** "Keep in mind, however, that these are **general trends rather than strict rules**." Retracts nothing, calibrates everything.

## Caveats & gaps

- **The Help Center is a rendered shell only.** Category names, the greeting, the sign-in interstitial and the search field are server-side; **every article body is client-fetched and was not retrieved**. Four article IDs were attempted, including the documented `pwaDialog=article-dialog` deep-link. The six help-article *titles* in this file come from the footer, not from the help centre itself.
- **T7 is materially incomplete.** No error titles, validation messages, rebooking language, change-flow copy, disruption wording or `Travel Alerts` content was observed. This is the product's stated benchmark strength and the harvest does not reach it. A browser-rendered pass over `/helpcenter/` is required.
- **No itinerary status names were observed.** Whatever Expedia shows in `Trips` (confirmed, ticketed, cancelled, refunded, pending, or otherwise) is **not recorded in this file, because it was not seen.** The four booking-lifecycle states in T6 are quoted from the Content Guidelines' review-eligibility rules and describe events, not UI labels. **No status name has been inferred.**
- **`/welcome-one-key` returned an empty body.** The loyalty programme's own explainer — tier structure, earn rates, OneKeyCash mechanics — is unharvested. `One Key` terminology in this file is assembled from incidental mentions on other pages.
- **Partner side not opened.** `apps.expediapartnercentral.com` and `partner.expediagroup.com` were not fetched, so the property-partner register, the Extranet-equivalent vocabulary and the supply-side help centre are absent. The brief asked for multi-audience coverage and this file delivers the traveller side plus the *policy* treatment of partners (Content Guidelines), not the partner product.
- **No search-results page was loaded.** Filter labels, sort labels, availability-pressure copy, the fare-rules panel, the price-breakdown drawer and the `Fully Refundable` badge in situ are all unharvested. Entering a destination or dates was out of scope.
- **No empty states, no in-product notifications, no validation copy, no confirmation-email copy.** `[absent]`.
- **Price and review strings in T6/T10 come from one landing page** (`/lp/b/book-now-pay-later`) rendering a live hotel carousel. They are genuine production strings but represent one card template; other surfaces may differ.
- **Terms of use, One Key terms and Vrbo terms were not fetched.**
- **The Content Guidelines is a US/Rest-of-World combined document** (per its PDF filename), which explains the British spellings. Any claim in this file drawn from it should be understood as ROW-inclusive, not US-specific.
- **Mobile app copy** is out of the public web surface.

## Sources

1. https://www.expedia.com/service/ → https://www.expedia.com/helpcenter
2. https://www.expedia.com/helpcenter/?articleId=12326 *(shell only)*
3. https://www.expedia.com/helpcenter/?articleId=12324 *(shell only)*
4. https://www.expedia.com/helpcenter/?articleId=15253 *(shell only)*
5. https://www.expedia.com/helpcenter/?pwaDialog=article-dialog&product=Flight&productId=flight&articleId=40090 *(shell only)*
6. https://www.expedia.com/p/info-other/web-accessibility-policy → https://www.expedia.com/lp/b/accessibility-policy
7. https://www.expedia.com/lp/b/content-guidelines
8. https://www.expedia.com/Flights
9. https://www.expedia.com/Hotels
10. https://www.expedia.com/lp/b/free-cancellation → https://www.expedia.com/deals/free-cancellation
11. https://www.expedia.com/lp/b/book-now-pay-later
12. https://www.expedia.com/welcome-one-key *(empty body)*
