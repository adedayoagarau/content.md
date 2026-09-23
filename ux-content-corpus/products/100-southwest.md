# 100. Southwest Airlines

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | US low-cost carrier (point-to-point; mid-transition to a bundled-fare, assigned-seat, bag-fee model) |
| Primary URL | https://www.southwest.com/ |
| Corpus rank | 100 |
| Benchmark strength (source list) | Fare clarity and trip management |
| Locale / market observed | en-US |
| Platform observed | Web (desktop `southwest.com`), Salesforce-backed help centre (`support.southwest.com`), PDF |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US DOT — **Customer Service Plan issued under 14 CFR §259.5**, published as a PDF, versioned `Rev #26-01`, `Effective: 06/04/2026`, with named executive accountability ("Our Senior Vice President & Chief Customer Officer bears the ultimate responsibility"); refunds under 14 CFR Part 260; serious-communicable-disease credits under Part 262; oversales under Part 250; ACAA / 14 CFR Part 382; separate Contract of Carriage which **explicitly overrides the CSP on conflict** |
| Harvest date | 2026-09-21 |
| Pages inspected | 8 |
| Harvest completeness | Partial, with one significant integrity caveat. All fare, fee, disruption and help-centre surfaces rendered fully and are captured in depth, including the complete Customer Service Plan PDF. **The homepage did not return its own markup** — it returned what appears to be a machine-generated descriptive surrogate (see Caveats). No homepage string in this file is treated as verbatim UI copy. Booking, check-in, Flight Status and Manage Reservations are SPA/authenticated. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.southwest.com/ | **Surrogate content returned — not usable as observed UI copy.** See Caveats |
| **Customer Service Plan (PDF)** | https://www.southwest.com/swa-resources/pdfs/corporate-commitments/customer-service-plan.pdf | 14 numbered commitments, versioned and dated; full text retrieved |
| Fare Types and Benefits | https://www.southwest.com/airfare-types-benefits/ | Four fare bundles, 14 numbered fare-rule footnotes |
| Optional Travel Charges | https://www.southwest.com/html/customer-service/travel-fees.html | Four dated fee tables, 20 footnotes |
| Help Center home | https://support.southwest.com/helpcenter/ | Four pathways + six additional topics; two live banners |
| Delays, Cancellations, or Schedule Revisions | https://support.southwest.com/helpcenter/pathway/delays-cancellations-or-schedule-revisions | Three-state taxonomy, six quick links |
| Southwest canceled my flight. What are my options? | https://support.southwest.com/helpcenter/article/options-if-southwest-cancels-flight | Four numbered options |
| Southwest significantly delayed my flight. What are my options? | https://support.southwest.com/helpcenter/article/options-if-flight-is-delayed | Four numbered options + six refund triggers |

---

## T1 Navigation & IA labels

**Global nav — product-first, with an unusually deep `Flight` menu** `[observed]` (from the help-centre chrome, which carries the full site nav):

`Home` · `Flight` · `Car` · `Hotel` · `Vacations` · `Cruises` · `Business Travel` · `Buy Points` · `Earn Points` · `Redeem Points` · `Special Offers` · `Flying Southwest` · `Help Center` · `Gift Cards` · `Cargo & Charters`

`Flight` expands to fourteen items, and the ordering is diagnostic `[observed]`:

`Book a Flight` · `Low Fare Calendar` · `Check in` · `Track Checked Bags` · `Flight Status` · `Flight Schedules` · `Manage Reservations` · `Upgrade My Fare` · `Change or Upgrade Seats` · `Priority Boarding` · `Check Travel Funds` · `Route Map` · `Buy Carbon Offsets` · `Fare Types and Benefits`

Three of the first five are day-of-travel actions. **`Track Checked Bags` sits at position four**, ahead of `Flight Status` — for an airline that until recently gave bags away free, promoting bag-tracking above flight-status in the primary flight menu is a notable signal about where the new fee model has moved customer anxiety.

`Upgrade My Fare` and `Change or Upgrade Seats` as two separate nav entries confirms the two-axis monetisation (fare bundle and seat) that the fare page describes.

**Footer is a thin legal strip, not an IA** `[observed]`:

`Terms & Conditions` · `Privacy Policy` · `Trademarks` — then a second line: `Contract of Carriage` · `Customer Service Plan` — then `Do Not Sell/Share My Info`.

**`Contract of Carriage` and `Customer Service Plan` are given their own footer line, set apart from the other legal links.** Both are PDFs. Southwest treats the two DOT artefacts as a pair, visually separated from terms and privacy — a small but deliberate hierarchy decision that makes the regulatory documents findable without hunting.

**Help Centre IA — four "pathways" plus six "additional topics"** `[observed]`

Primary pathways, each with a scope line:

| Pathway | Scope line (verbatim) |
|---|---|
| `Planning & Booking` | "Get all the information you need to book your next trip" |
| `Getting Ready` | "Flight check-in, changes, and cancellations - we are here to help" |
| `Day of Travel` | "Fly through your travel day with ease" |
| `Delays, Cancellations, or Schedule Revisions` | "Options if your flight has been changed or canceled" |

Additional topics:

| Topic | Scope line (verbatim) |
|---|---|
| `Baggage` | "Learn more about our checked and carryon baggage policies" |
| `Travel Funds, Refunds, Reimbursements, & Receipts` | "Learn about our travel funds policies, request a refund or reimbursement, or obtain a receipt" |
| `Rapid Rewards®` | "Learn how to take advantage of all the benefits of our program and manage your account" |
| `Disability-Related Accommodations` | "Learn how we can support your accessible assistance needs" |
| `Assigned Seats` | "All Southwest flights feature assigned seating!" |
| `Contact Us` | "Submit an account change, refund, or receipt request. Recognize an Employee or share a complaint." |

**The four-pathway taxonomy is a journey, and its fourth stop is failure.** `Planning & Booking` → `Getting Ready` → `Day of Travel` → `Delays, Cancellations, or Schedule Revisions`. Disruption is not a sub-topic of day-of-travel; it is the fourth phase of the trip, given equal visual weight to the other three. That is the right structural claim — a disrupted trip *is* a different journey.

**Every category carries a scope sentence**, which is the practice Wise models and which Alaska and Delta both omit. A user can self-route from the index without opening anything. Two of the scope lines do real work: `Delays, Cancellations, or Schedule Revisions` → "Options if your flight has been changed or canceled" promises *options*, not explanations; and `Contact Us` → "**Recognize an Employee** or share a complaint" puts praise before complaint in the same sentence.

`Fly through your travel day with ease` is the only pun in the IA, and it is on the lowest-stakes pathway.

**Two persistent banners sit above the pathways** `[observed]`, both labelled by topic rather than by urgency:

- `Power banks/portable chargers` — "Review important updates for Customers traveling with a power bank/portable charger."
- `Assigned seats` — "All Southwest flights now have assigned seats! Learn more"

The second is a **business-model-change announcement running as standing help-centre furniture**, which is what you do when the single biggest source of customer confusion is that the product changed.

**Category tags render as metadata on articles** `[observed]`: `Day of Travel`, `Travel preparation and expectations`, `Changes and Cancellations`. One article carries two tags at different taxonomy levels (`Category` and `SubCategory`), so the help centre has a faceted layer beneath the pathway tree.

**A routing inconsistency** `[observed]`: the article `Southwest significantly delayed my flight. What are my options?` breadcrumbs to a pathway called `Take Action on my Trip`, which does **not** appear in the help-centre index. Its sibling article breadcrumbs to `Delays, Cancellations, or Schedule Revisions`, which does. Two articles about the same event live under two different parents, one of which is not surfaced anywhere.

## T2 Value proposition & headline patterns

**The fare page headline is the product's whole strategic problem in five words** `[observed]`

> `Get to know our fares.`
> "With so many options, it all comes down to what kind of travel experience you're looking for. No matter which bundle you choose, every flight comes with our one-of-a-kind inflight experience—friendly service and a warm welcome on board."

An airline historically known for having essentially one fare now opens its fare page with an instruction to *learn* them, and concedes the complexity in the first clause (`With so many options`). The second sentence is a reassurance that the thing being taken away (simplicity) has been replaced by something that has not changed (`friendly service and a warm welcome on board`). This is transition copy, and it is doing exactly what transition copy should: acknowledge the change, then anchor on continuity.

**Each fare bundle gets a bolded two-to-three-word tagline and a one-line positioning sentence** `[observed]`

| Fare | Tagline | Positioning line |
|---|---|---|
| `Basic` | **`Go for less`** | "Our lowest fare bundle that'll get you there for less, with some restrictions." |
| `Choice` | **`Top pick`** | "Our best-value fare bundle that balances flexibility and savings." |
| `Choice Preferred` | **`Earlier access`** | "Our advanced fare bundle for those who want more comfort and benefits." |
| `Choice Extra` | **`All in`** | "Our most premium fare bundle for those who want the best of everything." |

The taglines are two-word idioms; the positioning lines are strictly parallel (`Our <superlative> fare bundle that/for …`). **`Top pick` is a merchandising label, not a description** — it is the only tagline that tells you what Southwest wants you to buy rather than what the product is, and it sits on the second-cheapest tier. `Earlier access` is the only tagline naming a concrete benefit; `All in` and `Go for less` are pure register.

**`Basic`'s positioning line ends on its own restriction** — "with some restrictions" — in the same sentence as the benefit. Four words, unhedged, before any footnote.

**The stacking construction is the fare page's structural device** `[observed]`: `Choice Preferred` closes with "**AND** all the benefits of **Choice**"; `Choice Extra` closes with "**AND** all the benefits of **Choice Preferred**". Each tier inherits the one below, stated explicitly, so the reader does not have to diff four bullet lists. This is a genuinely good solution to the fare-matrix comprehension problem and it costs two words per tier.

**The Customer Service Plan opens with a greeting** `[observed]`: after three paragraphs of scope and precedence language, the document says simply `Welcome to Southwest Airlines.` and then begins the numbered commitments. A one-line human interjection between the legal preamble and the obligations — the only such moment in any of the three carriers' CSPs in this batch.

**Help-centre headline is a question in the second person** `[observed]`: `What do you need help with?` with the sub-line "Choose one of the topics below to get started". Interrogative, not declarative, and it asks about the *user's* need rather than announcing the *site's* contents.

**Disruption pathway opens on acknowledgement before options** `[observed]`

> "We know that airline-imposed delays, cancellations, and schedule changes can have an impact on **an important moment in your life**. We appreciate your understanding during situations like this. **Our goal is to equip you with options when things don't go as planned.**"

Three moves: name the stakes in human terms (`an important moment in your life`), ask for grace (`We appreciate your understanding`), then state the content's purpose (`equip you with options`). `airline-imposed` is a precise and slightly unusual adjective — it distinguishes these events from changes the customer made, which is the distinction the whole page turns on.

**Article openers are apologies with the state named** `[observed]`:
- "We're sorry your flight was canceled by Southwest®."
- "We're sorry your flight was **significantly delayed** (generally a delay of three hours or more for domestic flights and six hours or more for international flights)."

The second one puts the threshold definition inside the apology sentence, in parentheses. Apology and eligibility test in one breath.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Book a Flight` | Nav | |
| `Check in` | Nav | Sentence case, against `Book a Flight` title case |
| `Upgrade My Fare` | Nav | Possessive — the only `My` in the flight menu |
| `Change or Upgrade Seats` | Nav | |
| `Check Travel Funds` | Nav | |
| `Track Checked Bags` | Nav | |
| `Buy Carbon Offsets` | Nav | |
| `Change your flight` | Both disruption articles, primary button | |
| `Cancel your flight` | Both disruption articles, secondary button | Paired, always in this order |
| `rebook your flight` | Inline, disruption pathway, ×3 | Lowercase inline link; **a third verb for the same action** |
| `I want to rebook my flight due to a delay or cancellation` | Quick link, disruption pathway | **A full first-person sentence used as a link** |
| `I want to cancel my flight` | Quick link | First person |
| `Southwest canceled my flight. What are my options?` | Quick link | Two sentences as a link |
| `Southwest significantly delayed my flight. What are my options?` | Quick link | |
| `Request voucher due to a significant delay or cancellation` | Quick link | Names the instrument and the trigger |
| `Request reimbursement due to a significant delay or cancellation` | Quick link | Distinguished from voucher |
| `See details` | Disruption pathway, ×3 | Bare, but the surrounding bullet supplies the object |
| `Review important details` | Partner-itinerary warning, ×2 | |
| `Learn more` | Assigned-seats banner; fare-page footnotes | |
| `Show More` | Help-centre additional topics | Progressive disclosure |
| `Need more assistance? Find the best way to get in touch with us.` | Foot of every article | A sentence, not a button |
| `Give Feedback` | Nav | Routes to a survey domain |
| `Skip to content` | First in DOM | Present — note `content`, not `main content` |
| `View full site` | Help-centre footer | Suggests the help centre is served from a mobile-first template |

**The quick-link block on the disruption pathway is the standout CTA pattern in this batch.** Six links, four of which are complete first-person sentences:

> `I want to rebook my flight due to a delay or cancellation`
> `I want to cancel my flight`
> `Southwest canceled my flight. What are my options?`
> `Southwest significantly delayed my flight. What are my options?`
> `Request voucher due to a significant delay or cancellation`
> `Request reimbursement due to a significant delay or cancellation`

Two are the user's **intention** (`I want to …`), two are the user's **situation plus question** (`Southwest canceled my flight. What are my options?`), and two are **named remedies with their triggers attached**. A stranded customer scanning this block finds their own sentence. This is the Wise first-person pattern extended from article titles to navigation, and applied at the exact moment of distress.

Note that `voucher` and `reimbursement` are given separate links rather than being folded into one "compensation" entry — two different instruments, two different forms, named distinctly.

**Against that:** Southwest ships three verbs for rebooking on one page — the button says `Change your flight`, the inline link says `rebook your flight`, and the quick link says `I want to rebook my flight`. And `Check in` (nav) vs `check in` (article) vs `online check-in` (article title) is three renderings of one action.

## T4 Onboarding & getting-started

No signup flow observable. The equivalent artefact is the **four-option recovery menu**, which Southwest uses identically on both disruption articles and which functions as a decision-onboarding sequence `[observed]`:

| # | Cancellation article | Delay article |
|---|---|---|
| `Option #1` | **`Continue with your travel plans`** — "In most cases, if Southwest cancels your flight, you will be automatically rebooked… If Southwest texts or emails you with a new itinerary, your new reservation is confirmed, and **you don't need to do anything else.**" | **`Continue with your travel plans`** — "If you want to continue your travel as scheduled, **you don't need to do anything.** We will do our best to get you on your way" |
| `Option #2` | **`Change your flight`** — "you can change your flight date and/or time by up to **14 days** from your original travel date at no additional cost… visit Southwest.com/rebook and enter your name and confirmation number." | **`Change your flight`** — automatic rebook, then "you can change your flight at no additional cost"; then an airport/phone fallback |
| `Option #3` | **`Cancel your reservation and choose flight credit`** | Same |
| `Option #4` | **`Cancel your reservation and choose a method-of-payment refund`** | Same, plus six named refund triggers |

**Four things make this structure work.**

1. **Option #1 is "do nothing", and it is stated twice as an explicit instruction** (`you don't need to do anything else`, `you don't need to do anything`). The default is named as a choice rather than left implicit.
2. **The options are ordered from least to most effort**, and simultaneously from most to least likely. A customer reads until their situation matches and stops.
3. **Option #2 gives the precise self-service path**, including the shortcut URL and the exact two inputs: "visit **Southwest.com/rebook** and enter your name and confirmation number." A URL and a two-field form, named in the copy.
4. **The 14-day window is a plain number** — "change your flight date and/or time by **up to 14 days** from your original travel date at no additional cost." Southwest's self-service rebooking window is twice Alaska's (7 days) and is stated without conditions.

**The no-show rule is attached to every option** `[observed]`, in near-identical wording, four times across two articles: "**You must cancel your reservation at least 10 minutes before the flight's original scheduled departure.** Reservations that are not flown and not canceled are subject to our no-show policy."

`10 minutes` appears **nine times** across the harvested Southwest pages — in both disruption articles, in five fare-page footnotes, and in the fee page. It is the single most repeated number in the file, and it is the one that costs a customer their entire ticket. That repetition is deliberate and correct.

## T5 Form & field labels

Almost all behind SPA or auth. `[absent]` for real field labels.

What is named `[documented]`:
- The rebooking form's two inputs: "enter your **name and confirmation number**"
- `Southwest.com/rebook` and `Southwest.com/DelayForm` — two task-specific shortcut URLs published in consumer copy
- Named forms: `Notice of Denied Boarding` (a written notice, not a form the customer completes), `mishandled baggage report`
- A help-centre search field labelled only `Search`, appearing three times per page (header, in-article, footer)

**One observable field-adjacent instruction** `[observed]`, from the CSP: "For an international itinerary, **if you do not provide contact information at the time of booking, you will not receive automated notifications.**" A consequence-of-omission statement about an optional field, published in the commitment document rather than at the field.

## T6 Status & state language

**Southwest's disruption taxonomy has three states, and the third is defined by a time window rather than by an event** `[observed]`:

| State | Definition |
|---|---|
| `Flight delays` | Threshold for entitlement: "significantly delayed (generally a delay of **three or more hours domestically and six or more hours internationally**)" |
| `Flight cancellations` | Categorical |
| `Schedule changes (8+ days prior to scheduled departure)` | "significant (generally resulting in a delay of three or more hours domestically and six or more hours internationally)" |

**The schedule-change state is named with its window inside the heading**: `Schedule changes (8+ days prior to scheduled departure)`. Compare Delta, which splits the same concept at 72 hours and puts the threshold in body copy. Southwest's `8+ days` boundary is also **inconsistent with its own CSP**, which uses **seven days** as the dividing line in two places:

> CSP §2: "Notifying Customers of known delays and cancellations (including those related to diversions) for flights **within seven days of departure**"
> CSP §12: "Notifying Customers in a timely manner of changes in travel itineraries (**more than seven days from departure**)"
> CSP §12 closing: "For changes within seven days of departure, refer to Section 2 above."

**Seven days in the regulatory document, eight-plus days in the help centre.** Both describe the same boundary and they do not agree. This is the clearest cross-surface inconsistency found in this batch and it sits on the definition that determines which remedy a customer gets.

**The controllable/uncontrollable distinction is the core state variable** `[observed]`, and Southwest defines both sides by example:

> "**within our control** (e.g., mechanical problems, aircraft swap)"
> "**not within our control** (e.g., weather, Air Traffic Control, safety/security-related events, FAA-required crew duty limitations, infrastructure/utility problems)"

Five named uncontrollable causes against two named controllable ones. `FAA-required crew duty limitations` is the notable inclusion — crew timing out is classified as outside Southwest's control, which is a contestable classification stated plainly rather than hidden.

**A third, unnamed state exists in the copy**: `Southwest-initiated cancellations`. The phrase appears five times in CSP §14 and is always paired with a controllability qualifier (`Southwest-initiated cancellations that are within our control`). Southwest distinguishes *the flight was cancelled* from *we cancelled it* — a distinction that matters when the cause is a diversion or an ATC ground stop.

**Named instruments and their states** `[observed]`:

| Instrument | Definition / state |
|---|---|
| `flight credit` | "can only be used by the original ticketed Passenger"; Basic fare credits expire **6 months** from booking |
| `Transferable Flight Credit™` | "can be transferred **once** between Rapid Rewards® Members"; expires **12 months** from booking; trademarked |
| `Southwest LUV Voucher®` | Compensation instrument, "fully transferable", minimum **$75** |
| `travel funds` | The umbrella term, used in the nav (`Check Travel Funds`) and the help topic |
| `method-of-payment refund` | Cash back to original form of payment |
| `no-show` | "Reservations that are not flown and not canceled" |
| `oversale` | "the number of Customers holding reservations exceeds the available seating capacity" |
| `involuntarily denied boarding` | Triggers a `Notice of Denied Boarding` |

**Credit expiry is the key state variable and it is fare-dependent** `[observed]`: 6 months for Basic, 12 months for the three Choice tiers — **except** in disruption, where "If your flight is canceled by Southwest and you choose a flight credit when canceling your reservation, your flight credit will be valid for **five years**." A credit created by Southwest's failure lasts ten times longer than one created by the customer's change of mind, and the exception is stated in both disruption articles.

Boarding states `[observed]`: `Last to board` (Basic) · `General boarding` (Choice) · `Group 3-4 boarding` (Choice Preferred) · `Group 1 boarding` (Choice Extra), with elite overrides — "A-List Preferred Members board before Group 1, A-List Members board in Group 1, and Rapid Rewards® Credit Cardmembers board no later than Group 5." A five-group ladder in which the fare buys a range and status overrides it.

Live flight-status display states (`On Time`, `Departed`, etc.) are not observable. `[absent]`

## T7 Error, failure & recovery

The priority category, and Southwest's material is strong on structure and weak on internal consistency.

### The Customer Service Plan's disruption commitment (§14) `[observed]`

Headed `Identifying the services we offer to help mitigate inconveniences of Customers traveling on confirmed reservations during irregular operations`, and structured as a **controllable branch and an uncontrollable branch with different entitlements**:

**Within Southwest's control:**
- **Rebooking**: "For flight delays of three (3) hours or longer that are within our control or Southwest-initiated cancellations that are within our control (e.g., mechanical problems, aircraft swap), we will **rebook you on the next available Southwest flight(s) with seats available to your ticketed destination at no additional cost.**"
- **Meals**: "we will provide a **meal voucher upon request** at the airport for participating vendors within the airport or, if participating vendors and/or vouchers are not available, **we will honor reasonable requests for reimbursement for meals purchased**." Plus: "Additionally, we may provide complimentary snacks and beverages."
- **Lodging**: "we will arrange lodging accommodations **upon request if available**, or will honor reasonable requests for reimbursement for lodging accommodations (**provided you do not reside locally**)." Plus ground transport: "If the lodging accommodation we arrange does not provide shuttle service to/from the airport, we will offer a voucher upon request or honor reasonable requests for reimbursement for ground transportation."
- **Compensation**: "you may be eligible for a **fully transferable Southwest LUV Voucher (of at least $75)**" against three stated conditions.

**Not within Southwest's control:**
- Rebooking only: "we will rebook you on the next available Southwest flight(s) with seats available to the Customer's ticketed destination at no additional cost." No meals, no lodging, no voucher.

**The single most transferable feature here is the `upon request` construction.** It appears five times in §14: `meal voucher upon request`, `lodging accommodations upon request`, `voucher upon request … for ground transportation`, `honor reasonable requests for reimbursement`. Southwest is explicit that care is **pull, not push** — the customer must ask. That is less generous than Delta's phrasing ("Provide complimentary hotel accommodations") but it is more honest about how the entitlement actually works at a gate, and a customer who has read it knows to ask.

**The LUV Voucher conditions are a three-part conjunctive test, published as a list** `[observed]`:

> "Effective for travel beginning **April 30, 2024**, for significant flight delays or Southwest-initiated cancellations that are within our control, you may be eligible for a fully transferable Southwest LUV Voucher (of at least $75) if the following conditions are met:
> - Southwest canceled and/or delayed your flight **within seven days of the scheduled departure**; **and**
> - You arrived at your final destination **three or more hours after the scheduled arrival time**; **and**
> - You submit a request for the Southwest LUV Voucher via **Southwest.com/DelayForm** no later than **one (1) year after the flight in question.**"

Three conditions, each with a number, joined by explicit `and`s, with the claim URL and the claim deadline in the third. Then an anti-double-dipping clause: "If Southwest has already issued a voucher for a Customer for the same delay or cancellation, that satisfies Southwest's commitment to issue the voucher, and an additional voucher will not be provided."

**Publishing a compensation entitlement as a testable three-condition list with a named form and a one-year deadline is best-in-batch.** A customer can determine their own eligibility without contacting anyone. Delta's equivalent is discretionary ("Delta representatives are empowered with the flexibility and discretion"); Southwest's is a rule.

**Note the arithmetic tension:** the voucher requires arrival `three or more hours` late, and the meal/lodging entitlements require a delay of `three (3) hours or longer`. The three-hour figure governs three different entitlements measured against two different reference points (departure delay vs arrival delay). Both are stated; the relationship between them is not.

### The four-option recovery menu `[observed]`

Covered structurally in T4. The content differences between the cancellation and delay versions are the interesting part:

**Cancellation, Option #4** is unconditional: "When you cancel your reservation, you will be presented with the option to receive a refund of your unused airfare."

**Delay, Option #4** is conditional and publishes **six named refund triggers** `[observed]`:

> "you are eligible for a method-of-payment refund if any of the following apply to the change Southwest® initiated to your scheduled itinerary:
> - You are now scheduled to depart **three hours or more** for domestic itineraries and six hours or more for international itineraries **earlier** than your original scheduled departure time.
> - You are scheduled to **arrive** at your destination airport three hours or more / six hours or more **later** than your original scheduled arrival time.
> - You are scheduled to **depart from a different airport or arrive at a different destination airport** than originally scheduled.
> - You are scheduled to travel on an itinerary with **more connection points** than your original itinerary.
> - You are **downgraded to a lower class of service**.
> - **You have a disability** and are scheduled to travel through one or more connecting airports different from the original itinerary."

Six triggers, and two of them are not about time at all. **Trigger 1 covers being moved *earlier*** — a case most passengers do not realise is compensable, and which airlines rarely volunteer. **Trigger 6 lowers the threshold for passengers with disabilities**: a routing change through a different connecting airport, which for a non-disabled passenger requires no remedy, is by itself a refund trigger for a disabled passenger. That carve-out is published in a consumer help article, not only in the CSP, and it is the strongest piece of accessibility-aware disruption content in this batch.

### Baggage failure `[observed]`, CSP §3

> "We make reasonable efforts to load the items you entrust into our care onto the same plane you board and return them to you promptly at your destination. If delayed, we make reasonable efforts to return your luggage to you within **12 hours for domestic flights and within 15-30 hours for international flights**."
> "If you paid a baggage fee to Southwest and your checked bag was delayed **12 or more hours** (domestic) or **15 or more hours** (international) or was not recovered, we will **refund the applicable fee(s) paid so long as you filed a mishandled baggage report.**"

`the items you entrust into our care` is the only figurative phrase in the CSP and it is a custodial framing — the bag is a trust, not cargo. The fee-refund entitlement is conditioned on having filed a report, and the condition is stated in the same sentence as the entitlement.

### Oversales `[observed]`, CSP §10

> "Southwest may attempt to take **proactive steps to avoid an oversale situation**. In the event of an oversale at the airport, our Customer Service Agents will **ask Customers booked on the flight if they are willing to volunteer** to take a later flight, typically in exchange for a voucher."
> "If we do not receive enough volunteers… we have to involuntarily deny boarding to Customers in accordance with our boarding priorities. If you are involuntarily denied boarding, **you will be given a written Notice of Denied Boarding** to help understand our policies, compensation, and travel alternatives."

The written notice is named as an artefact with a stated purpose (three things it helps you understand). `we have to` rather than "we will" — a small modal choice that frames the involuntary path as forced rather than chosen.

### Partner-itinerary carve-out `[observed]`

Both disruption articles and the pathway page carry the same interjection: "**Traveling on an itinerary involving a partner airline? Review important details.**" Placed in the opening paragraph, before any option. Southwest's interline partnerships are new relative to its brand, and the copy intercepts the wrong-assumption case before the customer reads four options that may not apply.

Two further audience carve-outs are repeated on every disruption surface: `Getaways by Southwest™ Customers: review your options` and `Southwest Groups travel reservations: contact Group Travel Services`, the latter with an out-of-hours fallback ("If a delay occurs outside of Group Travel Services' hours of operation, you may request assistance from a Southwest® Customer Service Agent at the airport"). **Naming the fallback for a closed support channel** is a small, good detail.

## T8 Empty states

`[absent]` — no product empty states reachable. Travel Funds lookup, Manage Reservations and search results are all SPA or authenticated.

One adjacent capture `[observed]`: the help-centre article footer renders `Need more assistance? Find the best way to get in touch with us.` as a standing no-answer-found affordance beneath every article — an escalation state rather than an empty state, but occupying the same slot.

## T9 Notifications & system messages

**CSP §2 is a published notification SLA and it names the system** `[observed]`:

> "If your flight experiences a **delay of 30 minutes or more** or is canceled, **we use an automated system** and will make reasonable efforts to notify you **within 30 minutes after we become aware** of such a flight status change. **Unless you opt-out**, you will be notified by **email or text**, depending on the selection made at the time the reservation was booked."
> "At the airport, including the departure gate and Flight Information Display screens under our control, we will make reasonable efforts to notify Customers of the updated status of the flight within 30 minutes."
> "**Flight statuses are subject to change. Customers are encouraged to plan their airport arrival based on the scheduled departure time.**"

Four details worth recording. **A 30-minute delay is the notification trigger** — lower than the 3-hour entitlement threshold, so customers are told about delays long before any remedy attaches. **Notification is opt-out, not opt-in.** `Flight Information Display screens under our control` is a careful hedge about airport-operated boards. And the closing warning — *don't use the delay to arrive late, the delay may evaporate* — is a genuine operational caution that prevents a real failure mode, published unprompted.

**§12 sets a second clock for the other side of the seven-day line** `[observed]`: "We will notify you **as far in advance as practicable** of any change to your itinerary, including **routing, departure time, and/or arrival time**. We will attempt to notify you **within 48 hours of our becoming aware** of the change." Three named change types, a 48-hour attempt window, and then the entitlement: "you may choose an alternate flight/date **within a 14-day parameter** of your original travel or cancel your trip without penalty and receive a refund."

**Complaint-response SLA** `[observed]`, §13: "Written complaints will receive an **acknowledgment in writing** indicating receipt of the complaint **within 30 days** of receipt. You will also receive a **substantive response no later than 60 days** after our receipt of your complaint." Opened by a genuinely warm line: "**Compliments, complaints, or questions about service? Email, call, or write to us.**" — compliments first, three channels named.

**Confirmation messaging is treated as state** `[observed]`: "If Southwest **texts or emails** you with a new itinerary, **your new reservation is confirmed**, and you don't need to do anything else." The notification *is* the confirmation — Southwest tells the customer that receipt of the message ends their obligation.

**Standing banners** (T1) act as persistent system messages: the power-bank advisory and the assigned-seats change announcement.

## T10 Disclosures, legal & compliance

The strongest category, and the one where Southwest's business-model transition is most visible.

### The four fare bundles — full observed contents

`[observed]` from the fare page. Reproduced in full because the *structure* of the bundle is the artefact:

**`Basic` — `Go for less`**
- `Standard seat assigned at check-in`
- `Extra Legroom and Preferred seat for purchase, if available`
- `Last to board`
— then a rule line —
- `2x Rapid Rewards® points per dollar`
- `No cancel fee`
- `Flight credit expiration: 6 months`
- `Flight changes allowed with fare upgrade`
- `Free Inflight Entertainment (on select aircraft)`
- `Checked bag fees may apply`

**`Choice` — `Top pick`**
- `Choose a Standard seat at booking`
- `Extra Legroom and Preferred seat for purchase, if available`
- `General boarding`
- `6x Rapid Rewards points per dollar`
- `Transferable Flight Credit™ expiration: 12 months`
- `Flight changes allowed; fare difference applies`
- `Free same-day change/standby (taxes and fees may apply)`
- `Free Inflight Entertainment (on select aircraft)`
- `Checked bag fees may apply`

**`Choice Preferred` — `Earlier access`**
- `Choose a Preferred seat (or any Standard seat) at booking`
- `Extra Legroom seat for purchase, if available`
- `Group 3-4 boarding`
- `10x Rapid Rewards points per dollar`
- `Refundable`
- `Flight changes allowed; fare difference applies`
- `Free Inflight Entertainment (on select aircraft)`
- `Priority Lane and Express Lane`
- `Checked bag fees may apply`
- **AND all the benefits of `Choice`**

**`Choice Extra` — `All in`**
- `Choose an Extra Legroom seat (or any seat) at booking`
- `Group 1 boarding`
- `14x Rapid Rewards points per dollar`
- **`Two free checked bags`**
- `Flight changes allowed; fare difference applies`
- `Free Inflight Entertainment (on select aircraft)`
- `Premium drink (select flights 251 miles or more)`
- **AND all the benefits of `Choice Preferred`**

**Three observations.**

1. **`Checked bag fees may apply` appears on three of four bundles.** The airline whose historical identity was *bags fly free* now prints a bag-fee line on 75% of its fare cards. It is stated as a plain bullet, not hidden, and the one bundle that escapes it (`Choice Extra`) makes `Two free checked bags` a headline benefit. The transition is handled without euphemism.
2. **The points multiplier is the most aggressive differentiator**: 2x → 6x → 10x → 14x. A 7× spread between the cheapest and dearest bundle, which is a far steeper gradient than the physical benefits justify. The loyalty currency is doing most of the upsell work.
3. **Only `Choice Preferred` is marked `Refundable`** — and `Choice Extra`, the more expensive bundle, inherits it only via the `AND all the benefits of Choice Preferred` stacking. Refundability is therefore **not stated on the card of the most expensive fare**. A reader scanning only `Choice Extra` would not learn it is refundable.

### The current baggage-fee position `[observed]`

Southwest publishes **two dated fee tables for the same product**, side by side:

| Fare / status | Carryon + Personal Item | 1st Checked Bag | 2nd Checked Bag |
|---|---|---|---|
| **Booked before April 9, 2026** | | | |
| `Basic Fare` / `Choice Fare` / `Choice Preferred Fare` | `Free` | `$35` | `$45` |
| `Choice Extra Fare` | `Free` | `Free` | `Free` |
| **Booked/changed on or after April 9, 2026** | | | |
| `Basic Fare` / `Choice Fare` / `Choice Preferred Fare` | `Free` | **`$45`** | **`$55`** |
| `Choice Extra Fare` | `Free` | `Free` | `Free` |
| `Active-duty military Customers` (both tables) | `Free` | `Free` | `Free` |

Status overrides `[observed]`: `Rapid Rewards® A-List Preferred Members` get both bags free; `A-List Members` get the first free and pay `$35` for the second (unchanged across both tables — the A-List second-bag price did **not** rise with the general increase); `Rapid Rewards® Credit Cardmembers` get the first free and pay the standard second-bag rate.

**A fee increase published as two complete tables with an effective date, rather than as a single table with a footnote, is the right call** — a customer who booked in March can find their own price without arithmetic. Both tables are held on the page simultaneously, which is more honest than replacing one with the other.

Excess/oversize/overweight fees `[observed]`, identical across both mainland tables: `3rd+ Checked Bag $150` · `Oversized (63"-80") $200 + Standard Fee` · `Overweight (51-70 lbs.) $100 + Standard Fee` · `Overweight (71-100 lbs.) $200 + Standard Fee` · `Oversized & Overweight $200 + Standard Fee`. **The oversize fee ($200) exceeds the 3rd-bag fee ($150) and is more than four times the standard bag fee** — a steep penalty structure stated plainly.

**Special-item carve-outs are generous and named** `[observed]`: for `Sports Equipment`, `Musical Instruments` and `Large Media Camera Equipment`, the oversize fee is `Waived` (up to 115", 150" and 110" respectively), and camera equipment gets a reduced `3rd+ Checked Bag $75`. Three named categories receiving an explicit fee exemption, with dimension limits attached.

**Interisland Hawaii runs a fourth, separate fee regime** `[observed]`, with `Hawaii Residents` receiving two free bags ("Must include Rapid Rewards® account number at the time of booking") and non-residents paying `$30`/`$40` post-April-2026 (up from `$15`/`$20`). Residency is defined administratively: "Hawaii residency is based on the primary mailing address of the Rapid Rewards Member and must be a valid United States Postal Hawaii mailing address." A second footnote adds "(P.O. Boxes are not permitted)". **The residency test is published as a data rule**, which is both precise and a small privacy disclosure.

A legacy-benefit sentence survives in that footnote `[observed]`: "**Two bags continue to fly free between the islands for Hawaii residents; this still includes your surfboards.**" The word `continue` and the word `still` are both carrying the old brand promise, preserved for one market, in a fee-table footnote.

### Other optional fees `[observed]`

| Fee | Amount |
|---|---|
| `Change Fee` | `$0` |
| `Cancellation Fee` | `$0` |
| `Paid seat upgrades` | `$4-$250 per segment, per Customer` |
| `Priority Boarding` | `$10-$75 per segment, per Customer` |
| `Unaccompanied Minor (UM)` | `$100 one-way per UM (ages 5-11)` mainland; `$35` interisland |
| `Pets: One-way Carryon Pet Charge` | `$125 per Pet carrier` mainland; `$35` interisland |
| `WiFi Internet Access` | `$8 (free for Rapid Rewards® Members)` |
| `Beer` / `Wine` / `Hard Seltzer and Ready to Drink Cocktails` / `Liquor` | `$7` / `$8` / `$9` / `$9` |
| `Tote Bag` / `Wax Box` / `Wine/Beer Bag` / `Pet Carrier` / `Car Seat/Stroller Bag` | `$25` / `$10` / `$5` / `$58` / `$17` |

**`Change Fee $0` and `Cancellation Fee $0` are printed as the first two rows of the "Other Fees" table.** Southwest leads its fee table with two zeros. The surviving differentiator is given the most prominent position in the document that otherwise catalogues its erosion. That is a defensible and well-executed piece of transition content design.

`Items for Purchase at the Ticket Counter` — a `Wax Box` at `$10` — is the most Southwest line in the corpus: a named, priced, airport-counter product for shipping wax that exists because surfers fly to Hawaii.

### The Customer Service Plan — structure and precedence

`[observed]` — the preamble does three things most CSPs do not:

1. **Cites its own regulatory basis**: "issued by Southwest Airlines pursuant to **14 CFR § 259.5**"
2. **Disclaims contractual force, then establishes precedence**: "The CSP reflects Southwest Airlines' dedication to high-quality Customer Service, but **is not a contract and does not create any contractual obligations** on the part of the Carrier. In addition, **if there is any conflict between the language of the SWA CSP and the Southwest Airlines Contract of Carriage, the Contract of Carriage shall govern.**"
3. **Names an accountable executive**: "**Our Senior Vice President & Chief Customer Officer bears the ultimate responsibility for our compliance with the SWA CSP.**"

Point 3 is unusual and worth stealing. Neither Delta's nor Alaska's published plan names an accountable role. A compliance document that says *this person owns it* is more credible than one that does not, and it costs one sentence.

The document is **versioned in its running header**: `Rev #26-01` / `06/04/2026` / `Page | 1`. A consumer-facing policy PDF with a revision number and a page count is treating policy as a controlled document — findable, citable and diffable across revisions.

The fourteen commitments `[observed]`, abbreviated:

| # | Commitment |
|---|---|
| 1 | `Offering the lowest fare available` |
| 2 | `Notifying Customers of known delays and cancellations (including those related to diversions) for flights within seven days of departure` |
| 3 | `Delivering baggage on time` |
| 4 | `Canceling your reservation(s) without penalty within 24 hours of booking` |
| 5 | `When a refund is due, providing it promptly` |
| 6 | Disclosing refund entitlement when offering alternatives; disclosing material restrictions on credits and vouchers |
| 7 | `Providing, upon request, flight credits that can be transferred and do not expire for at least five years … due to a serious communicable disease` |
| 8 | `Properly accommodating Customers with disabilities` |
| 9 | `Meeting Customer needs during lengthy tarmac delays` |
| 10 | `Handling "bumped" Passengers with fairness and consistency in the case of oversales` |
| 11 | `Disclosing cancellation policies, frequent flyer rules, aircraft seating configuration, and lavatory availability` |
| 12 | `Notifying Customers in a timely manner of changes in travel itineraries (more than seven days from departure)` |
| 13 | `Ensuring responsiveness to Customer complaints` |
| 14 | `Identifying the services we offer to help mitigate inconveniences … during irregular operations` |

**Fourteen against Delta's twelve.** The two extra come from splitting the refund-disclosure obligation (§6) and the serious-communicable-disease credit (§7) into standalone commitments, where Delta folds both into its §5.

**§1's lowest-fare commitment is channel-differentiated** `[observed]`: "When you inquire about a fare **over the phone** with a Southwest Representative or at a Southwest **ticket counter**, we will quote you the price for the fare that you request, such as the lowest available fare. **When you make a reservation on our website or mobile app, we offer the lowest available fare.**" Two different promises for two channel types — *quote what you ask for* by phone, *offer the lowest* online. Then the standard disclosure and a product plug: "Try our **low fare calendar** at Southwest.com to quickly find our lowest fares."

**§4's 24-hour rule carries a condition Delta's does not** `[observed]`: "We allow you to cancel your **unchanged** reservation(s) without penalty within 24 hours of the initial booking for a full refund **if the reservation is made one week or more prior to a flight's departure.**" Two qualifiers — the reservation must be unchanged, and made at least a week out. Southwest's 24-hour window is narrower than the headline suggests, and both limits are in the sentence.

**§8's accessibility refund mirrors Delta's** `[observed]`, with the same three triggers (downgrade removing an accessibility feature; different connecting airports; substitute aircraft lacking a needed feature) and the same companion extension ("any individual(s) in the same reservation as the Customer with a disability who does not want to continue travel without the Customer with a disability"). Contact channels are named including `TTY at 1(800) 533-1305`.

**§11 answers by linking rather than by stating** `[observed]`: "Information about our refund policies, cancellation policies, frequent flyer rules, aircraft-seating configuration, and lavatory availability is available over the phone… or by following the links to Southwest.com below: `Refunds` · `Cancellation of confirmed reservations` · `Rapid Rewards Frequent Flyer Program` · `Our Airplanes`". Four link labels doing the work of a disclosure.

### Fare-rule footnotes `[observed]`

Fourteen numbered footnotes on the fare page (numbered 1–15 with **no footnote 13** — a visible gap in the sequence). The consequential ones:

- **`1Basic Fare`**: "Basic fares are non-refundable except as allowed by our 24-hour cancellation policy. Flight changes are allowed but **require a fare upgrade**. Customers may be eligible for a flight credit if canceled at least 10 minutes prior."
- **`5No cancel fee`**: "**All fare types are eligible for cancellations without a fee.**" Then a genuinely gnarly constraint: "For roundtrip reservations, **if one or both flight segments is booked with a Basic fare, cancellations are only permitted if either a) both flight segments are canceled or b) the Basic fare segment(s) is upgraded.**"
- **`7Changes`**: "you'll only pay the difference in fare for Choice, Choice Preferred, and Choice Extra fares (if one applies). **For Basic fares, you may upgrade the fare to Choice, Choice Preferred or Choice Extra.**"
- **`11Free same-day change/standby`**: a dense conditions block — 10 minutes before original departure, **60 minutes (domestic) / 90 minutes (international)** before the new flight if using app or mobile web, government taxes payable but refunded, "**Your original seat and boarding group is not guaranteed.**"
- **`2Seat`**: "When seats are purchased separately from a fare, **the seat cannot be canceled unless you cancel the flight, too.** You'll receive a flight credit for the seat. Seat exchanges are permitted; price difference may apply. **Seats purchased separately are refundable back to the original form of payment only when exchanged for a higher priced seat.**"

**Footnote 5 is the most important disclosure on the page and the least readable.** `No cancel fee` is printed as a Basic-fare benefit; the footnote reveals that a mixed round-trip containing a Basic segment **cannot be cancelled at all** unless you cancel both legs or pay to upgrade the Basic leg. A headline benefit that is conditionally unavailable, with the condition at footnote depth.

**Footnote 2's seat rule is similarly inverted**: a separately purchased seat is refundable to cash **only if you exchange it for a more expensive one**. Refundability increases with spend.

### Other disclosures `[observed]`

- **Carry-on dimensions published**: "one carryon bag (e.g., roller bag, garment bag, tote bag) that **does not exceed external dimensions of 10 x 16 x 24**; and one smaller, personal type item (e.g., purse, briefcase, laptop computer case, backpack, small camera)". Examples given for both categories.
- **A 20-bag ceiling**: "a Customer is limited to check **20 pieces of checked baggage per flight.**"
- **Right-to-amend**: "Southwest reserves the right to amend pricing listed above at any time."
- **Credit-card benefit disclaimers**, repeated across six footnotes: "Chase is not responsible for the provision of or failure to provide the stated benefits and services" and "Cardmembers should allow up to **14 days** for card status to be updated in their Rapid Rewards account."
- **Alcohol disclosure** includes a Surgeon General warning inline: "According to the U.S. Surgeon General, women who are pregnant or who may become pregnant should not drink alcoholic beverages because of the risk of birth defects." Plus "Customers will not receive a beverage with a cap."
- **Points-earning exclusions enumerated** in footnote 4: "Qualifying Flights **exclude** reward flights, charter flights, nonrevenue travel, Companion Pass® travel, vacation packages booked through online travel agencies, and tickets booked through online travel agencies where the operating carrier is not disclosed before purchase." Six named exclusions.

## T11 Help-centre architecture

Two-level: **pathway → article**, with a faceted `Category`/`SubCategory` tag layer and a `Related Articles` block on every page.

1. **Pathways are phases, and every pathway carries a scope sentence** (T1). The four-phase model with disruption as phase four is the structural claim.
2. **Articles within a pathway are titled in the user's voice.** The disruption pathway's six quick links are first-person sentences or situation-plus-question constructions (T3). This is the most user-shaped IA in the batch.
3. **`Contact Us` is a topic, not furniture**, and its scope line defines four distinct request types plus employee recognition.
4. **`Related Articles` blocks are tagged, not curated by topic proximity.** Under `Southwest canceled my flight`, the related articles are `I missed my flight. What should I do?`, `I want to check the status of my flight` and `I want to check in and get my boarding pass` — all tagged `Day of Travel`. The first is genuinely adjacent; the other two are tag-matches, not need-matches. A user reading about a cancellation is offered check-in instructions.
5. **Search appears three times per page** (header, in-article `Search our help options and FAQs`, footer).
6. **A broken breadcrumb** (T1): `Take Action on my Trip` is a parent pathway that exists in breadcrumbs but not in the index.
7. **Escalation is a sentence, not a button**: `Need more assistance? Find the best way to get in touch with us.` — soft, and less prominent than Lime's persistent `Submit a request`.

**Article-title grammar — four shapes, with the first-person shape dominant on failure** `[observed]`:

| Shape | Example |
|---|---|
| `I want to <verb>` | `I want to rebook my flight due to a delay or cancellation`, `I want to cancel my flight`, `I want to check the status of my flight`, `I want to check in and get my boarding pass`, `I want to know what to do when I get to the airport lobby` |
| `<Situation>. What are my options?` | `Southwest canceled my flight. What are my options?`, `Southwest significantly delayed my flight. What are my options?` |
| `I <did/experienced X>` | `I missed my flight. What should I do?` |
| `<Question>?` | `What identification do I need for travel?`, `What can I expect at the airport when traveling with a pet?`, `Can I change my flight if I booked through a travel agency?`, `What's Southwest's No-Show Policy` |
| Imperative | `Request voucher due to a significant delay or cancellation` |

**`Southwest canceled my flight.` names Southwest as the agent of the failure, in the article title, in the past tense.** Not "your flight was canceled" — the airline puts its own name in the subject position of the sentence describing its failure. That is the single most quotable content decision in this file.

## T12 FAQs

No dedicated FAQ block was harvested. The help-centre articles *are* the FAQ — question-shaped titles with structured answers — and the fare and fee pages carry numbered footnote stacks in place of FAQs.

Question-form article titles observed across the harvested pages, as a set `[observed]`:

| Question (verbatim) |
|---|
| `Southwest canceled my flight. What are my options?` |
| `Southwest significantly delayed my flight. What are my options?` |
| `I missed my flight. What should I do?` |
| `What identification do I need for travel?` |
| `What can I expect at the airport when traveling with a pet?` |
| `Can I change my flight if I booked through a travel agency?` |
| `What's Southwest's No-Show Policy` |

**Structural note.** Five of seven are day-of-travel or disruption questions. `What's Southwest's No-Show Policy` is the only one **without a question mark** — a real punctuation inconsistency, and it is the article linked most often from other pages (four times across the two disruption articles and the fee page). The most-referenced help article on the disruption path is also the only one that is not punctuated as a question.

Both `What are my options?` articles answer with the identical four-option structure (T4), so the FAQ answer format is templated across the disruption set — a user who reads one has learned the shape of the other.

## T13 Terminology & glossary

| Term | Southwest's usage | The alternative it rejected |
|---|---|---|
| `Customer` — **capitalised mid-sentence** | The passenger, throughout every surface including the CSP | `passenger` survives only in regulatory contexts (`"bumped" Passengers`, and `Passengers` is also capitalised) |
| `Employee` — capitalised | Staff (`Recognize an Employee`) | |
| `fare bundle` | The unit of purchase | "fare family", "fare class", "branded fare" |
| `Basic` / `Choice` / `Choice Preferred` / `Choice Extra` | The four bundles | Note three of four share a stem, so the cheapest fare is the odd one out by name as well as by content |
| `Transferable Flight Credit™` | Trademarked credit instrument | Distinguished from plain `flight credit` by transferability and expiry |
| `Southwest LUV Voucher®` | Compensation instrument, registered mark | "denied boarding compensation", "goodwill voucher" |
| `travel funds` | Umbrella term for residual value | Used in nav and help topic; **a third term alongside `flight credit` and `Transferable Flight Credit™`** |
| `Rapid Rewards®` / `A-List` / `A-List Preferred` / `Companion Pass®` | Loyalty vocabulary, all marked | |
| `Getaways by Southwest™` | Vacation packages | **Replaces `Southwest Vacations`**; both names appear on the site |
| `Standard` / `Preferred` / `Extra Legroom` seat | Three seat products | |
| `Priority Lane` / `Express Lane` | Check-in lane and security lane respectively — **two different lanes with near-identical names**, disambiguated only in footnote 14 |
| `oversale` (n.) | The overbooking event | `"bumped"` appears only in scare quotes in the §10 heading |
| `Southwest-initiated cancellation` | Distinguishes the cause | |
| `irregular operations` | The umbrella term (CSP §14 heading) | Not glossed |
| `no-show policy` | The forfeiture rule | Referenced by name eight times across the harvested pages |
| `significantly delayed` | The 3h/6h entitlement threshold | Always shipped with its definition |
| `Qualifying Flights` | Defined term in the points footnote | Capitalised and defined in place |
| `mishandled baggage report` | The claim artefact | "lost luggage claim" |
| `Notice of Denied Boarding` | A written notice, named | |
| `Wax Box` | A $10 ticket-counter product | |
| `SWA CSP` | The plan's own acronym, used in its preamble | |

**The capitalisation of `Customer`, `Employee` and `Passengers` mid-sentence is the clearest voice marker in the file.** It is a Southwest brand convention of long standing and it survives into a DOT compliance PDF: "**Our Senior Vice President & Chief Customer Officer bears the ultimate responsibility**", "Written complaints will receive an acknowledgment", "we have to involuntarily deny boarding to **Customers**". Capitalising the customer in a regulatory document is a small, consistent act of register.

**The residual-value vocabulary is the weakest area**, as it is for Alaska: `flight credit`, `Transferable Flight Credit™`, `travel funds`, `Southwest LUV Voucher®` and `method-of-payment refund` are five instruments with overlapping names, and a customer on the disruption path may be offered three of them in four paragraphs. Southwest does at least define the difference between the first two precisely (transferability, expiry) every time they co-occur.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the Customer, first-person plural for the airline, and — notably — **Southwest names itself in the subject position of its own failures**: `Southwest canceled my flight`, `Southwest significantly delayed my flight`, `Southwest-initiated cancellations`, `airline-imposed delays`. Where Delta writes "if your flight is canceled", Southwest writes "if Southwest cancels your flight". The agent is named. That is the most distinctive voice property in the file and it runs consistently from article titles into the CSP.

**Register gradient, three bands, well separated.**
- *Warm and slightly folksy* in help-centre framing: "We know that airline-imposed delays… can have an impact on an important moment in your life", "We appreciate your understanding", "We're sorry your flight was canceled by Southwest®", "Compliments, complaints, or questions about service?", "Fly through your travel day with ease", "Welcome to Southwest Airlines."
- *Neutral-procedural* in the four-option menus and fee tables
- *Flat and conditional* in footnotes: "cancellations are only permitted if either a) both flight segments are canceled or b) the Basic fare segment(s) is upgraded"

The CSP is the interesting case — it maintains the warm register inside a compliance document (`Welcome to Southwest Airlines.`, `Compliments, complaints, or questions about service? Email, call, or write to us.`, `the items you entrust into our care`) while still citing CFR parts. It is the least legalistic of the three carriers' plans in this batch without being less specific.

**Hedging is visible and consistent**: `we make reasonable efforts` (×4), `will make reasonable efforts` (×5), `Southwest may attempt to`, `we will do our best to get you on your way`, `as far in advance as practicable`, `upon request if available`, `generally a delay of`, `In most cases`. Southwest hedges more than Delta does and the hedges are all in the same register, which makes them read as honesty rather than evasion.

**Trademark density is very high.** `Southwest®`, `Rapid Rewards®`, `A-List Preferred`, `Transferable Flight Credit™`, `Getaways by Southwest™`, `Companion Pass®`, `Southwest LUV Vouchers®`, `Southwest.com®`, `Southwest Airlines®` — the registered mark appears on `Southwest` mid-sentence in running help copy ("We're sorry your flight was canceled by Southwest®."). An apology sentence containing a registered trademark symbol is a small tonal cost paid for legal consistency.

**Numbers as trust devices** `[observed]`: `10 minutes` (×9), `14 days`, `7 business days`, `10 business days`, `20 calendar days`, `30 minutes`, `48 hours`, `24 hours`, `30 days`, `60 days`, `three (3) hours`, `12 hours`, `15-30 hours`, `seven days`, `8+ days`, `five years`, `12 months`, `6 months`, `one (1) year`, `$75`, `$45`/`$55`, `$150`, `$200`, `10 x 16 x 24`, `20 pieces`, `251 miles`, `2x`/`6x`/`10x`/`14x`. Numerals are written out in parentheses in the CSP (`three (3) hours`, `one (1) year`) — a legal-drafting convention that survives into the consumer document.

**Accessibility content** `[observed]`

- `Skip to content` first in DOM (note: `content`, not `main content`).
- `Disability-Related Accommodations` is a named top-level help topic with the scope line "Learn how we can support your **accessible assistance needs**" — an awkward compound (*accessible* modifying *assistance* rather than the service).
- **The disability refund trigger in the delay article** (T7) is the strongest accessibility content found: a routing change through a different connecting airport is by itself a refund trigger for a passenger with a disability. Published in a general consumer article, not only in the CSP.
- CSP §8 names `TTY at 1(800) 533-1305` alongside the voice number and cites the Air Carrier Access Act and 14 CFR Part 382 by name.
- **Empty link markers in the article markup**: both disruption articles contain a construction rendering as `Review important details**[](…)**` — a bold-wrapped link with **no link text**, duplicating the adjacent labelled link to the same URL. An empty anchor is announced as a bare link by screen readers. This appears on both articles, so it is a template defect, not a one-off.
- The help-centre header renders two stray strings, `first` and `last`, immediately after the page title — likely pagination or carousel labels leaking into the DOM.
- `View full site` in the help-centre footer, alongside `ref=LinkMobileWeb` parameters throughout, indicates the desktop help centre is served from a mobile template. Consequences for responsive behaviour unassessed.
- Cookie banner offers `Accept all cookies`, `Reject all`, `Confirm my choices` — a genuine reject-all at the top level. However, all four cookie categories (`Strictly Necessary`, `Functional`, `Performance`, `Targeting`) are labelled `Always Active`, including `Targeting`. **A consent UI presenting targeting cookies as always-active while offering a reject button is internally contradictory** and is recorded as observed.
- Fee and fare tables use text values, not icons.

**Negative findings, recorded honestly**

- **`seven days` (CSP §2, §12) vs `8+ days` (help centre) for the same boundary** — the most consequential inconsistency in the file
- Three verbs for rebooking on one page (`Change your flight` / `rebook your flight` / `I want to rebook`)
- `Check in` / `check in` / `online check-in` — three renderings
- Breadcrumb parent `Take Action on my Trip` does not exist in the help-centre index
- Footnote sequence on the fare page skips 13
- `Refundable` is stated only on `Choice Preferred` and reaches `Choice Extra` only by inheritance
- Footnote 5 contains a constraint that can make the headline `No cancel fee` benefit unusable
- `Priority Lane` and `Express Lane` are two different lanes disambiguated only in a footnote
- Empty bold-wrapped anchor duplicated on both disruption articles
- `What's Southwest's No-Show Policy` lacks a question mark; it is the most-linked article on the disruption path
- Stray `first` / `last` strings in the help-centre header
- Cookie categories labelled `Always Active` including `Targeting`, alongside a `Reject all` control
- `Southwest Vacations` and `Getaways by Southwest™` both in use
- Registered trademark symbol inside an apology sentence

---

## Transferable patterns

1. **Name yourself as the agent of your own failure, in the article title.** `Southwest canceled my flight. What are my options?` — not "your flight was canceled". Applies anywhere a system failure is currently described in the passive voice. Condition: only for failures that genuinely are yours.
2. **Make "do nothing" Option #1, and say so twice.** "you don't need to do anything else." Most recovery content assumes the user must act; naming inaction as the first and most likely option removes the largest source of unnecessary contacts.
3. **Write navigation as the user's own sentence at the moment of distress.** `I want to rebook my flight due to a delay or cancellation` as a link. Two of the six quick links are intentions, two are situations, two are named remedies with triggers attached.
4. **Publish compensation as a testable conjunctive list with a form and a deadline.** Three `and`-joined conditions, each with a number, plus `Southwest.com/DelayForm` and a one-year claim window. A customer can self-assess eligibility without contacting anyone — and that is the difference between a commitment and a gesture.
5. **Be explicit that care is pull, not push.** `meal voucher upon request`, `lodging accommodations upon request`. Less generous-sounding than the alternative, more accurate, and it teaches the customer to ask.
6. **Publish a fee increase as two complete dated tables, not one table with a footnote.** Both cohorts find their own price with no arithmetic, and holding both on the page is more honest than replacing one.
7. **Lead the fee table with the fees you do not charge.** `Change Fee $0` / `Cancellation Fee $0` as rows one and two.
8. **State tier inheritance explicitly rather than repeating bullet lists.** "AND all the benefits of Choice Preferred." Two words replace a diff.
9. **Name an accountable executive role in the compliance document.** One sentence, materially more credible.
10. **Version and date the policy PDF in its running header.** `Rev #26-01 / 06/04/2026` makes policy citable and diffable.
11. **Lower the threshold for passengers with disabilities and publish it in the general article.** A connecting-airport change that triggers nothing for other passengers triggers a refund here.
12. **Anti-pattern: a headline benefit whose disabling condition lives at footnote depth.** `No cancel fee` is printed on all four fare cards; footnote 5 reveals a mixed Basic round-trip cannot be cancelled at all without upgrading. If a benefit is conditionally unavailable, the condition belongs on the card.
13. **Anti-pattern: two numbers for one boundary across two surfaces.** Seven days in the CSP, 8+ days in the help centre. Where a threshold determines a remedy, it must have exactly one published value.

## Caveats & gaps

- **The homepage did not return its own markup.** The fetch resolved to a document that reads as a machine-generated descriptive surrogate — it contains headings such as "About This Page", "Page type: Airline Homepage", "What You Can Do on This Page" and a statement that its contents are "consistent with the live experience at https://www.southwest.com/". **This is not observed UI copy and none of it has been used in this file.** Two consequences: (a) no homepage hero, booking-widget label, nav microcopy or promotional string is recorded; (b) the surrogate contained factual assertions about Southwest's product — including "a customer-friendly bag policy" and "No change fees on most fares" — **at least one of which is contradicted by Southwest's own current fee page**, which charges for checked bags on three of four fare bundles. Treated as untrusted and excluded. Any homepage harvest requires a browser-rendered pass.
- **The global nav was captured from the help-centre chrome**, not from southwest.com itself, so nav labels may differ on the main site.
- **No live flight-status vocabulary.** Flight Status, Manage Reservations, check-in, Book a Flight and Travel Funds lookup are SPA or authenticated. T6 documents the *policy* vocabulary of disruption, not the *display* vocabulary a customer sees on a status page — a real limitation for a product benchmarked on "trip management".
- **Assigned seating is newly launched** and is running as a standing help-centre banner. Seat-selection UI, seat-map labels and the upgrade flow are unharvested, and any seat-related copy captured here is from fare-page bullets and footnotes only.
- **The Contract of Carriage was not opened** — and the CSP explicitly states the Contract governs on conflict, so the authoritative text of several commitments is unharvested.
- **`Baggage`, `Travel Funds, Refunds, Reimbursements, & Receipts`, `Rapid Rewards®`, `Disability-Related Accommodations`, `Assigned Seats` and `Contact Us` pathways were not opened.** The disability pathway in particular is named in this file only from its index scope line and from CSP §8; Southwest's substantive accessibility content is unharvested.
- **The `What's Southwest's No-Show Policy` article was not opened**, despite being the most-linked article on the disruption path and the article that governs the `10 minutes` rule repeated nine times.
- **Fee tables are dated and will move.** Both the pre- and post-April-2026 tables were live at harvest; the pre-April table describes a cohort that is shrinking. Figures should be re-verified before use.
- **The CSP is `Rev #26-01`, effective `06/04/2026`.** A search result also surfaced a `Rev #25-03 09/10/2025` revision at a parameterised URL, so Southwest maintains prior revisions online — a diff across revisions was not attempted but would be a high-value follow-up.
- **The seven-day / 8+ day discrepancy was not resolved.** Both values are quoted from their sources; which governs is not determinable from the public surfaces.
- **Accessibility findings are from served HTML**, not a rendered accessibility tree. The empty-anchor defect is confirmed present in the markup of both disruption articles; its runtime behaviour is not verified.

## Sources

1. https://www.southwest.com/ (**surrogate content returned — not used**)
2. https://www.southwest.com/swa-resources/pdfs/corporate-commitments/customer-service-plan.pdf
3. https://www.southwest.com/airfare-types-benefits/
4. https://www.southwest.com/html/customer-service/travel-fees.html
5. https://support.southwest.com/helpcenter/
6. https://support.southwest.com/helpcenter/pathway/delays-cancellations-or-schedule-revisions
7. https://support.southwest.com/helpcenter/article/options-if-southwest-cancels-flight
8. https://support.southwest.com/helpcenter/article/options-if-flight-is-delayed
