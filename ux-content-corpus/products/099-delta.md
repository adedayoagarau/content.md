# 099. Delta Air Lines

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | US legacy network airline (global hub-and-spoke carrier, SkyTeam) |
| Primary URL | https://www.delta.com/ |
| Corpus rank | 099 |
| Benchmark strength (source list) | Trip status and self-service rebooking |
| Locale / market observed | en-US (`/us/en/` path) |
| Platform observed | Web (desktop) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US DOT — **Customer Service Plan published under 14 CFR §259.5 in 12 numbered points, dated `Effective October 24, 2024`**; refunds under 14 CFR Part 260; Serious Communicable Disease credits under 14 CFR Part 262; oversales under 14 CFR Part 250; baggage delivery under 14 CFR §260.5; ACAA/14 CFR Part 382 with named **Complaint Resolution Officials (CROs)**; separate Contracts of Carriage for US, Canada and International; Warsaw and Montreal Convention liability limits published; Canada APPR and Canada Accessibility Plan surfaced as distinct legal notices |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial — all policy, disruption, baggage, fare-rule and accessibility surfaces rendered fully and are captured in depth. The **homepage returned a `<title>` only** (client-rendered), so hero, booking-widget labels and promotional copy are absent. Flight Status, My Trips, check-in and the booking funnel are authenticated or SPA-rendered, so live flight-state vocabulary and in-product rebooking UI are `[documented]` at best. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.delta.com/ | `<title>` only — no body |
| **Customer Service Plan** | https://www.delta.com/us/en/legal/customer-commitment | 12 numbered commitments, dated; the single richest page in this batch |
| Delayed or Canceled Flight | https://www.delta.com/us/en/change-cancel/delayed-or-canceled-flight | Disruption taxonomy, thresholds, 8 accordion panels |
| Schedule Changes | https://www.delta.com/us/en/change-cancel/schedule-changes | The >72h counterpart; 7 named change types |
| Change or Cancel Overview | https://www.delta.com/us/en/change-cancel/overview | Two 3×3 fare-rule matrices |
| Baggage & Travel Fees | https://www.delta.com/us/en/baggage/overview | Fee figures, 8 regional change/cancel fee tables, travel services |
| Damaged, Delayed or Lost Baggage | https://www.delta.com/us/en/baggage/delayed-lost-damaged-baggage | 4-state bag taxonomy, claim procedures, liability limits, 5 FAQs |
| Accessible Travel Services | https://www.delta.com/us/en/accessible-travel-services/overview | Request paths, CROs, 3 FAQs, 9-item section nav |
| Help Center | https://www.delta.com/us/en/need-help/overview | Retrieved; oversized, used for nav confirmation only |

---

## T1 Navigation & IA labels

**The global nav is a five-group mega-menu, and its grouping is by *life stage of the trip*, not by product** `[observed]`. Flattened, the groups are:

| Group (inferred from ordering) | Members |
|---|---|
| Travel info | `Travel Planning Center` · `Ticket Changes & Refunds` · `Airline Partners` · `Baggage` · `Check-in & Security` · `Delta Sky Club®` · `Airport Maps & Locations` · `Flight Deals` · `Flight Schedules` · `Destinations` · `Onboard Experience` · `Delta Cruises` · `Aircraft` · `Delta Vacations` · `Delta Car Rentals` · `Delta Stays` · `Onboard Wi-Fi` · `Delta Trip Protection` |
| SkyMiles | `How to Earn Miles` · `Ways to Redeem Miles` · `Buy or Transfer Miles` · `Travel with Miles` · `SkyMiles Partners & Offers` · `SkyMiles Award Deals` · `SkyMiles Credit Cards` · `SkyMiles Airline Partners` · `SkyMiles Program Overview` · `How to Get Medallion Status` · `Benefits at Each Tier` · `News & Updates` |
| Need help | `Help Center` · `Travel Planning FAQs` · `Receipts` · `Certificates & eCredits` · `Accessible Travel Services` · `Child & Infant Travel` · `Pet Travel` · `Special Circumstances` · `SkyMiles Help` · `Mobile` · `Comment/Complaint` |
| Utility | `BOOK` (caps) + three unlabelled icon links → My Trips, check-in, Flight Status |

**`Ticket Changes & Refunds` is the second item in the primary nav**, ahead of Baggage, Check-in and everything else except the Travel Planning Center. For a legacy carrier, promoting the *change your mind / something went wrong* path to position two is a deliberate statement about where traffic actually goes.

**`Special Circumstances` and `Comment/Complaint` are both top-level nav entries.** `Comment/Complaint` is unusual — most carriers route complaints through a contact form buried in support. Delta names the negative outcome in the navigation label itself, with a slash, and repeats it in the footer.

**Three unlabelled icon links** sit at the end of the utility bar (My Trips, PCC/check-in, Flight Status). In the served markup these render as empty link text. Flagged as a probable accessibility defect — the three highest-frequency day-of-travel actions have no text accessible name in the serialised output.

**Footer — 22 flat links, no grouping headers** `[observed]`

`About Us` · `Careers` · `News Hub` · `Investor Relations` · `Business Travel` · `Travel Agents` · `Mobile App` · `Delta Shop` · `Help Center` · `Message Us` · `Comment/Complaint` · `Login Help` · `Site Map` · `Browser Compatibility` · `Accessibility` · `Booking Information` · `Customer Service Plan` · `Tarmac Delay Plan` · `Legal` · `Sustainability` · `Contract of Carriage` · `Cookies, Privacy & Security` · `Combatting Modern Slavery (PDF)`

Ungrouped and long, but note the sequencing: `Help Center` → `Message Us` → `Comment/Complaint` → `Login Help` is a deliberate support ladder embedded mid-footer, and the four regulatory artefacts (`Customer Service Plan`, `Tarmac Delay Plan`, `Legal`, `Contract of Carriage`) run consecutively. `Browser Compatibility` and `Accessibility` sit adjacent, which is a reasonable pairing.

**Legal section nav — the compliance IA is itself a content artefact** `[observed]`:

`Legal Notices` (→ `Advertising Terms` · `Accessibility Notice` · `Canada Passenger Rights` · `Canada Accessibility Plan & Feedback Process` · `Personal Information Retention` · `Canada Accessibility Plan 2025 Progress Report` · **`Passengers with Disabilities Bill of Rights`** · **`Sexual Assault or Harassment`**) · `Terms of Use` · `Booking Policy` (→ `Booking Policy Definitions` · `Booking Violations FAQs` · `Booking Violations` · `Cost Recovery Fee` · `Notice of Enforcement Definitions`) · `Privacy and Security` · `Contract of Carriage: U.S.` · `Contract of Carriage: Canada` · `Contract of Carriage: International` · `Imprint` · `Contingency Plan for Lengthy Tarmac Delays` · **`AI Terms of Use`**

Three observations. First, **`Sexual Assault or Harassment` as a named legal notice** — a safety-reporting policy given peer status with advertising terms. Second, **`Passengers with Disabilities Bill of Rights`** is published as a distinct artefact, separate from the accessible-travel content. Third, **`AI Terms of Use`** exists as a legal notice, indicating Delta has shipped consumer-facing AI features requiring their own terms.

The `Booking Policy` sub-tree (`Booking Violations`, `Cost Recovery Fee`, `Notice of Enforcement Definitions`) is an enforcement regime against passengers — hidden-city ticketing and similar — given five pages of its own. A rare case of an airline publishing its *anti-customer* rules at length.

**Section navs are phase-ordered.** `Change or Cancel` reads: `Overview` → `Change Your Flight` → `Same-Day Flight Changes` → `Cancel or Refund Your Flight` → `Exit European Union Compensation` → `Exit Israel Compensation` → `How to Cancel or Change Your Flight` → `How to Rebook Using an eCredit` → `Schedule Changes` → `Delayed or Canceled Flight`. Voluntary actions first, involuntary last. `Exit European Union Compensation` and `Exit Israel Compensation` sit as named, jurisdiction-specific compensation pages inside a self-service section.

`Baggage Info` nav: `Baggage Overview` → `Checked Baggage` (8 children) → `Carry-On Baggage` → `Special Items` (7) → `TSA Prohibited Items, Restrictions & Regulations` (9) → `Damaged, Delayed or Lost Baggage` → `Additional Baggage Information` (5). The failure node (`Damaged, Delayed or Lost Baggage`) sits at level one, not buried under `Additional`.

`Accessible Travel Services` nav — nine peers: `Overview` · `Cognitive & Invisible Disabilities` · `Wheelchairs, Scooters & Assistive Devices` · `Medical Devices and Medication` · `Trained Service Animals` · `Blind, Low Vision, Deaf or Hard of Hearing Travelers` · `Allergies and Dietary Needs` · `Additional Assistance` · `Delta's Advisory Board on Disability`.

**`Cognitive & Invisible Disabilities` placed second, immediately after Overview and ahead of wheelchairs**, is a notable ordering choice. So is `Trained Service Animals` — the qualifier `Trained` is doing regulatory work in the nav label itself.

## T2 Value proposition & headline patterns

The homepage did not render, so hero copy is unavailable. What the policy surfaces show is a distinct and consistent headline grammar:

**Page titles are the user's own question or the user's own state** `[observed]`

- `Am I Experiencing a Delayed or Canceled Flight?` — a first-person question as an H1
- `Am I Experiencing a Schedule Change?` — the same construction on the sibling page
- `Damaged, Delayed or Lost Baggage`
- `Change or Cancel Overview`

`Am I Experiencing …?` is the strongest headline pattern in this batch. It does two things at once: it acknowledges that the user may not know which situation they are in, and it makes the page's first job *diagnosis* rather than instruction. Both pages then open with a definitional bulleted list so the reader can self-classify before reading any remedy.

**The 72-hour split is announced in the headline logic itself** `[observed]`:

> Delayed/Canceled page: "If your itinerary is changed by the airline **less than 72 hours** before your departure, it's likely you're experiencing one of the following:"
> Schedule Changes page: "If your itinerary is changed by the airline **more than 72 hours** before your originally scheduled departure, it's likely you're experiencing a schedule change."

Each page cross-links to the other in its opening paragraph: "**If your flight departs in less than 72 hours**, you may be experiencing a delayed or canceled flight. Please visit our Delayed or Canceled Flights page… Otherwise, continue reading." **Two pages, one variable, reciprocal routing on that variable.** This is the cleanest disambiguation architecture in the corpus batch.

**Empathy-then-pivot opening on schedule changes** `[observed]`: "We value your time and sincerely apologize for any inconvenience if a schedule change has impacted your upcoming trip. While our goal is to always get you to your final destination on time, occasionally adjustments to our flight schedule become necessary and affect your itinerary creating a disruption. **Rest assured, we are committed to helping you manage the disruption.**"

Three beats: apologise → normalise → reassure. `Rest assured` appears twice on the site in near-identical position (also in the accessibility-adjacent meta description). The apology is conditional (`if a schedule change has impacted`), which is careful but slightly undercuts it.

**Section headers are gerund-led guidance labels** `[observed]`: `Keeping You Informed` · `Managing a Delay` · `Managing a Canceled or Significantly Delayed Flight` · `Managing Your Checked Bags` · `Requesting a Refund` · `Requesting Reimbursement` · `Requesting Accommodations` · `When You Should Call` · `Managing a Schedule Change` · `Managing a Significant Schedule Change`.

Every panel is `<Gerund> <object>`, and the set covers the whole recovery journey in the order it happens. `Keeping You Informed` is first — before any remedy, Delta describes its own notification obligation. `When You Should Call` is last and is the only one framed as a condition rather than a task.

**Baggage page opens on preparedness, not on policy** `[observed]`: "When you travel with us, we want to help you feel prepared and that includes understanding everything you need to know about your baggage — before, during and after your trip."

**Accessibility page opens on a principle** `[observed]`: "**We believe travel is for everyone.** It's our priority to deliver the best service and ensure accessibility for all Delta customers. Before boarding, in the air, at your destination and anywhere in between, our gate agents and attendants will be available to assist." Four-beat spatial enumeration (`Before boarding, in the air, at your destination and anywhere in between`) mirrors the temporal enumeration on the baggage page (`before, during and after your trip`). A house construction.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `BOOK` | Global nav, all caps | The only all-caps nav item |
| `Find Alternative Flight` | Delayed/Canceled page, **twice** | Appears under a `NEXT STEPS` label before any explanation — the remedy is offered above the reading |
| `Change Flight` | Schedule Changes page, twice | Sibling page uses a different verb for the same action |
| `Begin Claim` | Baggage claims, **four times** on one page | One label, four claim types behind it |
| `Start a Mishandled Bag Claim` | Same page, twice | **A fifth and sixth button to the same destination under a different label** |
| `Report Lost Item , opens in new window` | Lost & found | Note the space before the comma — a string-concatenation defect |
| `Check Reimbursement Status` | Delayed/Canceled | |
| `Check Refund Status` (as link text `check your refund status`) | Delayed/Canceled, Schedule Changes | Inline, lowercase |
| `GO TO MY TRIPS` | Accessibility page, all caps | |
| `Message Us` | Bolded inline across many pages, and in footer | Rendered as bold text rather than a link in several places |
| `Expand All` / `Collapse All` | Every accordion block | Consistent |
| `Skip to main content` | First in DOM | Present |
| `Learn more about change and cancel fees.` | Baggage page | Full stop inside the link |
| `Next <Page Title>` | Foot of every policy page | e.g. `Next Contingency Plan for Lengthy Tarmac Delays`, `Next Change or Cancel Overview`, `Next Cognitive & Invisible Disabilities` — sequential reading path through a policy section |
| `Find Alternative Flights` | Quoted in-product control | `[documented]` — "Select 'Find Alternative Flights' to browse and book a different flight" |
| `Change or Add Flights` | Quoted in-product control | `[documented]` — **the schedule-change page quotes a different button label than the delay page** for the same step |
| `Track My Bags` | Quoted in-product feature | `[documented]` |
| `Share Item Location` | Quoted Apple Find My control | `[documented]` |

**The `Next <Page Title>` pattern is the standout.** Every policy page ends with a forward link naming the next page in the section sequence. It turns a reference section into a readable document — a user who lands on `Customer Service Plan` is offered `Next Contingency Plan for Lengthy Tarmac Delays`, which is exactly the right follow-on. Cheap to implement, and it makes a compliance corpus navigable.

**The counter-pattern, on the same site:** the baggage claims page ships **six buttons to one destination under two labels** (`Begin Claim` ×4, `Start a Mishandled Bag Claim` ×2). And the two disruption sibling pages quote **two different in-product button labels** for the equivalent action (`Find Alternative Flights` vs `Change or Add Flights`), and use **two different CTA verbs** for their own page-level action (`Find Alternative Flight` vs `Change Flight`). Delta's own copy cannot decide what the rebooking button is called.

## T4 Onboarding & getting-started

No signup flow observable. The equivalent artefact is the **numbered how-to sequence**, which Delta uses consistently across three different tasks `[observed]`:

**Changing a flight after a disruption** (4 steps):
1. `Review your flight details on the Fly Delta app, My Trips or at a Delta kiosk`
2. `Select "Find Alternative Flights" to browse and book a different flight or choose to remain on your current one`
3. `Complete the flight change`
4. `Receive confirmation of your rebooked flight`

Step 2 names the control in quotation marks *and* names the do-nothing option in the same sentence. Step 4 is not an action — it is the system's response, included so the sequence terminates on a confirmation rather than on the user's last click. Both are good.

**How the change fee works** (3 steps) `[observed]`:
1. `Visit My Trips on delta.com or the Fly Delta app to review and select a new flight.`
2. `Pay the change fee based on the class of service and your flight's origin and destination.`
3. `Pay any applicable fare difference between your original ticket and your new flight.`
Then: "After completing these steps, you'll receive your new flight confirmation via email."

**Two payment steps are given separate numbers.** Delta does not fold "fee plus fare difference" into one line — the two charges are enumerated because they are conceptually different and because conflating them is how customers get surprised. This is the single most transferable structural decision on the pricing side.

**Damaged baggage claim** (4 steps) with a sub-step carrying the deadline `[observed]`:
1. `Visit the Delta Baggage Service Office to report your damaged bag` — `a. You must report damages within 6 hours* of arrival for domestic tickets and within 7 days of arrival for international tickets or your claim will not be accepted.`
2. `Keep the file reference number provided by the Delta Baggage Service Office – you'll need it to fill out your claim.`
3. `Select "Begin Claim" below to start the claims process.`
4. `Select "Damaged Bag Claim" on the claim form and include any relevant receipts`

Step 2 explains *why* to keep the reference number in the same breath as the instruction — the `– you'll need it to` construction appears three times across the baggage page. The consequence of missing the deadline is stated inside step 1a (`or your claim will not be accepted`), not deferred to a footnote.

**Apple Find My integration** gets its own 5-step sequence `[documented]`, with an unprompted privacy paragraph: "Item location sharing is completely optional. It will automatically end as soon as you are reunited with their bag, can be stopped by you at any time and automatically expires after seven days." Three termination conditions stated for a voluntary data share. (Note `reunited with their bag` — a pronoun-agreement error in an otherwise careful paragraph.)

## T5 Form & field labels

Almost entirely behind auth or SPA-rendered. `[absent]` for real field labels.

What is named `[documented]`:
- `Accessibility Service Request form` — in My Trips, and a separate web form at `/contact-us/accessibility-service-request` for requests more than 7 days out
- `Travel Resolution Form` — the catch-all for refund/eCredit requests outside the automated path
- `Reimbursement Request form`
- `Comment and Complaint form`
- Four named claim types selectable on one form: `Damaged Bag Claim` · `Out-of-Pocket Expense Claim` · `Potential Property Loss Claim` · `Pilfered (Stolen) Item Claim`
- Receipt field requirements, enumerated as a list `[observed]`: `Merchant name` · `Date of purchase` · `Itemized list of goods` · `Total amount` · `Method of payment`
- The complaint-form path is given as a literal click sequence `[observed]`: "Select 'Submit Feedback' → Select 'File a Complaint' and 'Checked Bags' → Choose the appropriate issue for your situation → Complete the form and submit"

**`Pilfered (Stolen) Item Claim`** is worth flagging as terminology: Delta uses the industry term and glosses it in parentheses in the same string, every time it appears — including in the heading `Missing or Stolen (Pilfered) Items from Checked Bags`. Gloss-in-place rather than a glossary link.

**Nonrefundable as a rendered field value** `[observed]`: "If your ticket is non-refundable, you will see the word '**Nonrefundable**' next to the cabin name in My Trips. If you do not see 'Nonrefundable,' your ticket may be a refundable ticket." Delta tells the user what string to look for and what its absence means. Note the copy spells it `non-refundable` in prose and `Nonrefundable` as the UI value — correctly distinguishing the two.

## T6 Status & state language

The priority category, and Delta's disruption vocabulary is the most precisely defined in this batch.

### The four-state disruption taxonomy, with numeric thresholds `[observed]`

| State (verbatim) | Definition (verbatim thresholds) |
|---|---|
| `delay` | "departure fewer than 3 hours earlier or arrival fewer than 3 hours later for domestic itineraries, or, fewer than 6 hours for international itineraries" |
| `significant delay` | "departure or arrival **3 hours or more** earlier or later for domestic itineraries, or **6 hours or more** for international itineraries" |
| `flight cancellation` | (no threshold — categorical) |
| `schedule change` | Same 3h/6h thresholds, but applied **more than 72 hours** before departure |
| `significant schedule change` | Same thresholds, >72h window |

**One threshold pair (3h domestic / 6h international) governs four of the five states.** Delta has collapsed what could be a dozen rules into a single number pair applied across two time windows, and it repeats the parenthetical definition verbatim every time the term appears — five times across two pages. That repetition is deliberate: `significant delay` is a term of art with money attached, and Delta never uses it without its definition attached.

**Seven named schedule-change types** `[observed]`, beyond the time thresholds:

- `A schedule change resulting in a missed connecting flight`
- `A change in operating carrier`
- `A change in origin or destination airport`
- `A downgrade to the purchased class of service`
- `Added connections`

Each is a link to a footnote. `Added connections` as a named adverse state — the airline inserting a stop into your itinerary — is one most carriers do not name at all.

**The superseded-threshold footnote appears five times** `[observed]`: "*For tickets issued before October 28, 2024, for travel on or after Oct. 28, 2024, if your originally scheduled departure or arrival time was impacted by a significant delay of **more than 120 minutes**, you are eligible to cancel your ticket and request a refund."

Delta is running two definitions of `significant` simultaneously — 120 minutes for old tickets, 3 hours for new — and publishes both, dated, on every page where the term appears. Most carriers would silently apply the new rule. (Note the date is written `October 28, 2024` in one clause and `Oct. 28, 2024` in the next, within a single sentence, on five separate pages.)

### The auto-rebooking default, and the 24-hour clock `[observed]`

The core state mechanic, stated on both disruption pages:

> "Where possible, Delta will **automatically rebook you** on an updated itinerary and provide you with the new schedule information. Your updated itinerary can be found in My Trips."

> "If you're not satisfied with your flight change, you can: search for alternative flight options … or cancel the rebooked flight and receive a refund of the unflown portion of your ticket and any pre-paid seat upgrade or Preferred Seat, or an eCredit valid for 5 years from issuance."

> "**If none of these actions are taken within 24 hours, we'll automatically issue a refund back to your original form of payment.**"

Three states in sequence: *auto-rebooked* → *user reviews* → *auto-refunded on a 24-hour timeout*. The final sentence is the important one. Delta publishes a **failure-to-act default that resolves in the customer's favour**, with a stated clock. The phrasing varies slightly across its three appearances ("If none of these actions are taken within 24 hours, we'll automatically issue a refund back to your original form of payment" / "If we can't rebook you and you take no action within 24 hours, we'll automatically refund your original payment method" / "If we can't rebook you and you take no action within 24 hours, we'll automatically refund to your original payment method") — three phrasings of one commitment, and only the first two are logically equivalent.

### The "usually do nothing" advice `[observed]`

For the sub-threshold states, both pages give the same counsel:

> "If your flight has a delay (fewer than 3 hours for domestic itineraries, or fewer than 6 hours for international itineraries), **usually the best option is to remain on your current flight.**"

An airline explicitly advising the customer *not* to act is rare and is the right advice — churn on a short delay usually makes the outcome worse. `usually` is the correct hedge.

### Baggage states — four, each with a threshold `[observed]`

| State | Defining condition |
|---|---|
| `Damaged Baggage` | "damaged in transit" — report within 6 hours domestic / 7 days international |
| `Delayed Baggage` | "not at baggage claim when you arrive"; sub-split at **5 days or less** vs **6 days or more (Potential Property Loss)** |
| `Lost Baggage` | "If your checked bag isn't found within **21 days** of your arrival, it is likely lost" |
| `Missing or Stolen (Pilfered) Items from Checked Bags` | items missing after arrival — report within 24 hours domestic / 7 days international |

**`Delayed` becomes `Potential Property Loss` at day six and `Lost` at day 21.** A bag moves through three named states on a published clock, and the intermediate state has a distinct claim type. `it is likely lost` rather than "it is lost" — Delta hedges even at day 21, because bags do come back.

The copy for the in-between period is notably humane `[observed]`: "If you've already submitted a property loss claim and it hasn't been 21 days yet, **we are still searching for your bag and no further action is required.**" A state whose entire content is *stop worrying, stop doing things*.

### Other named states `[observed]`

- `oversold flight` — "we cannot accommodate one or more passengers with confirmed reservations"
- `involuntarily denied boarding` / `voluntarily give up your seat` — the two oversale branches, with different remedies
- `misconnected` / `misconnect` — used as both verb and noun ("or you have misconnected", "When a delay, misconnect or cancellation is within our control")
- `irregular operation` — the industry term, used once in the CSP and glossed by its context
- `diversions` — named in commitment 2 alongside delays and cancellations
- `Serious Communicable Disease` — a formally defined term with a regulatory citation (see T10)
- `eCredit` — the residual-value instrument, `valid for 5 years from issuance`
- `Nonrefundable` — a literal UI string the user is told to look for

## T7 Error, failure & recovery

Delta's recovery content is organised as **expandable panels, one per user need, in journey order**, and it is the most complete self-service disruption documentation in this batch.

### The eight panels on `Delayed or Canceled Flight` `[observed]`

| Panel | What it does |
|---|---|
| `Keeping You Informed` | States Delta's notification obligation and channels **before** offering any remedy |
| `Managing a Delay` | Tells the user to do nothing |
| `Managing a Canceled or Significantly Delayed Flight` | The auto-rebook → review → refund/eCredit → 24h timeout sequence, plus the 4-step change procedure |
| `Managing Your Checked Bags` | Bag rerouting is not guaranteed; BSO; file reference number; fee refund eligibility; `Track My Bags` |
| `Requesting a Refund` | Eligibility, the Travel Resolution Form for edge cases, and three explicit refund **restrictions** |
| `Requesting Reimbursement` | The controllable/uncontrollable distinction, with named exclusions |
| `Requesting Accommodations` | Hotel, ground transport, meal vouchers — conditional on "within our control" |
| `When You Should Call` | Four named cases where self-service will not work |

**Panel ordering is the artefact.** *Tell them what we'll tell them* → *tell them to relax* → *tell them what we already did* → *bags* → *money back* → *money for what it cost you* → *a bed* → *when to give up on self-service*. That is the actual sequence of a stranded passenger's concerns.

### The weather-vs-controllable distinction — the highest-value content in this file `[observed]`

Delta draws the line in three places with increasing specificity.

**In the Customer Service Plan (commitment 12):**
> "**When a delay, misconnect, or cancellation is within Delta's control, we will:** Provide complimentary hotel accommodations at Delta-contracted facilities, based on availability, as well as complimentary ground transportation to and from the hotel, if you are inconvenienced overnight while away from your home or destination. If a Delta-contracted hotel accommodation is unavailable and you book your own accommodations while inconvenienced overnight away from your home or destination, **Delta will reimburse reasonable costs** for your hotel room and ground transportation to and from the hotel. If accommodations are unavailable, we will compensate you with a credit commensurate in value with the Delta-contracted hotel rate."
> "Provide **a meal or meal vouchers**, if a cancellation or delay results in waiting **3 or more hours** beyond the scheduled departure time."

**On the reimbursement panel:**
> "If you are a resident of the U.S. or Canada and your flight was canceled or significantly delayed by 3 hours or more **because of an issue caused by Delta (within our control)**, please submit a reimbursement request … for reasonable meal expenses, or for any reasonable hotel and transportation to/from the hotel if you were inconvenienced overnight while away from your home or destination."

**Then the exclusions, named as a list:**
> "we're unable to provide reimbursement for delays or cancellations arising from factors **outside of our control**, such as: `Air Traffic Control delays` · `Weather delays`"
> "In addition, Delta does not reimburse the following types of expenses: `Prepaid expenses, including hotels and activities at your destination` · `Alternative transportation to your final destination` · `Lost wages`"

**Three structural decisions worth stealing.**

1. **The controllable/uncontrollable boundary is stated as a parenthetical gloss on plain language** — "because of an issue caused by Delta (within our control)". The regulatory phrase is given *after* the human phrase, in brackets. Most carriers lead with the term of art.
2. **The excluded causes are enumerated, not gestured at.** Two items: ATC and weather. A short, closed list is far more trustworthy than "circumstances beyond our control".
3. **The excluded *expense types* are a second, separate list** — and `Lost wages` is on it. Naming the three things customers most often claim for and most often lose on, up front, prevents a whole class of denied claims.

The fallback ladder in commitment 12 is also exemplary: *we book the hotel* → *if none available, you book and we reimburse* → *if still unavailable, we credit you at our contracted rate*. Three tiers, each with a stated trigger, ending in a monetary equivalent rather than in nothing.

### Refund restrictions, stated as a closed list `[observed]`

> "Please note, we cannot issue refunds for: `Non-refundable tickets that have not experienced a cancellation, significant delay or significant schedule change` · `Tickets already used for travel` · `Tickets purchased through travel agencies or third-party travel sites (please contact them directly)`"

Item 1 is the important one: it restates that a non-refundable ticket *does* become refundable under the three named conditions. The restriction is written so that it also functions as an entitlement.

### `When You Should Call` — naming the limits of self-service `[observed]`

Four cases, each with a specific number:
- unaccompanied minor tickets → `800-325-8847 (dial 711 for relay services)`
- Delta Vacations bookings → `800-800-1504`
- third-party/agency tickets → "refer directly to your travel agent"
- (schedule-change page adds) "If you're not satisfied with the alternative flight options when searching in My Trips, our representatives **may be able to help you**."

`may be able to` is honest hedging. Every case is given its own number rather than a single switchboard, and the relay-service instruction is inline rather than in a footnote.

### Baggage recovery `[observed]`

The bag-fee refund entitlement is quantified by flight length — a three-tier table most passengers never see:

> "For domestic travel: bags not delivered within **12 hours** of arriving at the gate · For international travel, flights of 12 hours or less: bags not delivered within **15 hours** · For international travel, flights of more than 12 hours: bags not delivered within **30 hours**"

Followed immediately by three named exceptions, including "You **voluntarily agreed to separate** from your bag" — and then a carve-out on the exception: "a. You may still be eligible for a refund if your bag is lost or pilfered." An exception to an exception, stated rather than omitted.

**Out-of-pocket reimbursement scope is defined by purpose, not by list** `[observed]`: "Reimbursement is generally intended to cover **basic interim needs** during a baggage delay while you are away from home and are awaiting delivery of your bag. Reasonable purchases may include essential clothing items, toiletries and personal care items. **Purchase only what you need to address essential, short-term needs** and keep all itemized receipts."

Then the assessment criteria are published `[observed]`: "We consider **necessity and reasonableness of replacement items purchased, timing and location of purchases, duration of the bag delay, and documentation provided.**" Publishing the adjudication rubric is unusual and is the fairest possible version of a discretionary process. Closing warning: "If your bag remains lost after 21 days, reimbursements will be deducted from your final settlement."

### The 404 page `[observed]`

> `Whoops! Looks Like This Page Had a Gate Change`
> "We're sorry, it seems that this page has changed to something different than you were expecting due to a possible URL change or a promotion ending. Not to worry though, we'll do our best to get you where you need to be."

A domain-metaphor error headline (`Gate Change`), an apology, two named plausible causes, and a promise. Then four cards (`Travel Planning Center`, `Help Center`, `Baggage & Travel Fees`, `Destination Requirements`) each opening with a verb (`Plan`, `Learn`, `Find`, `Explore`), plus search and home links, and finally a feedback hook: "Please let us know what information you were looking for or how we could better assist you."

`Whoops!` is the only exclamation-and-interjection on any harvested Delta page, and it is on the lowest-stakes surface. The metaphor is apt (`Gate Change` = the thing moved, not the thing broke) and the recovery offers four named destinations rather than a generic "go home". Asking the user what they were looking for turns a 404 into a content-ops input.

## T8 Empty states

`[absent]` for true product empty states — My Trips, search results and eCredit lookup are all authenticated.

Two adjacent captures `[observed]`:
- The 404 page (T7) is a full not-found treatment and is the only unauthenticated "nothing here" surface.
- The no-eligibility state is written as a conditional rather than an empty state: "If you do not see 'Nonrefundable,' your ticket may be a refundable ticket." — absence of a string is given meaning.

## T9 Notifications & system messages

**Commitment 2 is a published notification SLA** `[observed]` — the single most quotable piece of notification governance in the batch:

> "We will provide full and timely information on the status of known delays, cancellations, and diversions **within 30 minutes of Delta becoming aware of the change in the status of the flight**:
> - By making announcements in the boarding gate area and through the use of **Gate Information Display screens (GIDS)** where available.
> - Through **Flight Information Display screens (FIDS)** where available.
> - Upon request, through our telephone reservation system (800-221-1212).
> - On delta.com at Flight Status & Updates.
> - Through **flight notification subscription service**."

Five channels, one clock, and the clock is anchored to *Delta's* awareness rather than to the event — which is both honest and the only measurable version. `GIDS` and `FIDS` are internal acronyms expanded on first use for a consumer audience.

**Commitment 10 sets a second, different clock** `[observed]`: "We will attempt to contact you, via contact information provided in your reservation, about changes in your travel itinerary **when the event is known at least one hour before departure.**" — a pre-departure cut-off beyond which proactive contact is not promised.

**Disruption notification channels, restated on the operational pages** `[observed]`: "we will first try to rebook you at no additional cost and do our best to notify you via 1 or more of the following methods: `Email` · `Text message or phone call` · `The Fly Delta app`" (delayed/canceled) and "`Email` · `My Trips` · `The Fly Delta app`" (schedule changes). **Two different channel lists for two disruption types**, and `Text message or phone call` is bundled as one item on one list and absent from the other.

**In-flight disruption comms** `[observed]`, commitment 12: "If you are onboard a Wi-Fi enabled aircraft, you can access delta.com **free of charge** to check arrival and departure gates, as well as rebooking options, **prior to landing**. Upon landing, the flight crew will advise when the use of cell phones is permitted. At that time, you can call 800-221-1212 for connecting-flight status (U.S./Canada originations only)."

Rebooking made free and available *before* the aircraft lands is a genuine operational commitment expressed as a content promise, and the `(U.S./Canada originations only)` bound is placed inline rather than footnoted.

**Complaint-response SLA** `[observed]`, commitment 11: "We will **acknowledge receipt** of written customer complaints **within 30 days** of their receipt, and will send a **substantive response within 60 days**. **Disability-related complaints will receive a dispositive response within 30 days.**" Three different clocks, three different words for the response type (`acknowledge` / `substantive` / `dispositive`), and the disability case gets the fastest.

**Promotional banner** `[observed]`, baggage page: `ENJOY FIRST AND SECOND CHECKED BAGS FREE — Enjoy your first and second checked bags free on domestic Delta flights and earn bonus miles with an eligible Delta SkyMiles® Amex Card. Minimum purchase required to earn welcome offers. Terms apply.` A card upsell placed at the top of the fee table it undercuts.

## T10 Disclosures, legal & compliance

The strongest category in the batch, and worth extended treatment.

### The Customer Service Plan — 12 numbered commitments, dated

`[observed]` — structure and scope line: "We have outlined our responsibilities and how we will fulfill them in **12-key points, known as our Customer Service Plan.**" Scope note: "applies to our covered flights operating to, from, or within the U.S." Dated `Effective October 24, 2024` at the foot.

| # | Commitment (verbatim heading, abbreviated where long) |
|---|---|
| 1 | `Offering the lowest fare available` |
| 2 | `Notifying consumers of known delays, cancellations, and diversions` |
| 3 | `Delivering baggage on time` |
| 4 | `Risk-Free Cancellation, allowing reservations to be cancelled without penalty for 24-hours after the reservation is made.` |
| 5 | `Providing ticket and ancillary service fee refunds within 7 business days for credit card purchases, and refunds within 20 days for purchases made with cash, check, or other forms of payment` |
| 6 | `Properly accommodating passengers with disabilities and children traveling alone, including during tarmac delays.` |
| 7 | `Meeting customers' essential needs during lengthy tarmac delays as required by regulation and our contingency plan` |
| 8 | `Handling "bumped" passengers with fairness and consistency in the case of an oversold flight` |
| 9 | `Disclosing refund policies as required by 14 CFR part 260, cancellation policies, loyalty program rules, aircraft configuration, and lavatory availability` |
| 10 | `Notifying you in a timely manner of changes in your travel itinerary` |
| 11 | `Ensuring responsiveness to customer complaints` |
| 12 | `Identifying the services Delta provides to mitigate passenger inconveniences resulting from delays, cancellations, and misconnects` |

**Commitment 1 is the most candid paragraph Delta publishes** `[observed]`:

> "Please note our commitment is to help match you with the best fare product that meets your specific travel needs, **which may not always be the lowest fare available.**"
> "When shopping on delta.com or the Fly Delta app, **in some cases you may need to select a flight and cabin before the lowest available published price for that itinerary is displayed for purchase.**"
> "Although combining separate one-way tickets usually results in a higher total fare … **it is sometimes possible to find two or more one-way fares at a combined cost that is lower than the lowest fare Delta offers** for the connecting itinerary. **We do not search for or quote these options to you**, because this increases the likelihood that you could experience customer service failures such as lost baggage and missed connections."

Three admissions in one commitment: the recommendation is not the cheapest; the UI hides the cheapest until you drill in; and a cheaper construction exists that Delta declines to show you — with a stated rationale. **Disclosing a known dark pattern in your own search UI, inside a compliance document, is extraordinary.** The rationale for the third point is plausible but self-serving, and Delta does not pretend otherwise.

**Commitment 8 explains overbooking mechanically before defending it** `[observed]`: "Because passengers with confirmed reservations on a flight frequently fail to show, we are permitted by federal regulations to sell more tickets for travel than there are seats on the aircraft **to reduce the number of empty seats on our flights.**" Cause → permission → purpose. Then the six-item handling list, in which `Requesting volunteers for denied boarding before using any other boarding priority` comes first and `Rebooking you on the first available Delta flight to your ticketed destination if you are involuntarily denied boarding` is an explicit obligation.

### Fare families — the `Experience` model

Delta's current architecture is a **two-axis matrix**: cabin × experience. `[observed]` from the change/cancel fee tables.

**Cabins named**: `Delta Main` · `Delta Comfort` · `Delta Premium Select` · `Delta First` · `Delta One` (plus `Business` in the Basic Business fee row).
**Experiences named**: `Basic` · `Classic` · `Extra` · `Refundable`.

Combined, the fee tables reference: `Delta Main Basic`, `Delta Main Classic`, `Delta Comfort Basic`, `Delta Comfort Classic`, `Delta Premium Select Basic`, `Delta Premium Select Classic`, `Delta First Basic`, `Delta One Classic`, `Basic Business`. Delta glosses the legacy term once, in parentheses: **`Delta Main Basic (Basic Economy)`**.

**The experience tier survives a change** `[observed]`: "While many aspects of your ticket can be changed, **your experience (Extra, Classic, or Basic if changeable) will remain the same when changing your ticket.**" The experience is an attribute of the ticket, not of the transaction.

**Basic Economy restrictions, stated across three surfaces** `[observed]`:
- "You may change or cancel a Basic ticket in most cases, but **a fee will be deducted from the value of your ticket. The remaining value will be issued back to you as an eCredit.**"
- "Same-Day Confirmed is **not available for Delta Basic Experiences**." / "Same-Day Standby is **not available for Delta Basic Experiences**."
- "`Basic ticket experiences are not eligible for Same Day Standby or Same Day Confirmed programs.`"
- Award Basic: "the ticket can be changed or canceled for **a fee assessed in miles**."

The restriction set is: fee on change/cancel (not prohibition), no same-day confirmed, no same-day standby, value returns as eCredit not cash, and a mileage-denominated fee on award tickets. Delta states each separately rather than as a bundled "restrictions apply".

**The change/cancel fee matrix — 8 regional tables, and the ranges are disclosed up front** `[observed]`:

> "Review the change and cancel fees below **(ranging from $0 to $500)** based on your origin, destination and ticket type. **There is no change fee for Classic, Extra or Refundable tickets originating from the United States and Canada.**"

US/Canada origin fees `[observed]`:

| Ticket type | US/Canada/Mexico/Caribbean/Central America | Long-haul |
|---|---|---|
| `Extra and Refundable tickets` | free | free |
| `Classic tickets` | free | free |
| `Delta First Basic` | $300 | $300 |
| `Delta Premium Select Basic` | $400 | $400 |
| `Basic Business` | $500 | $500 |
| `Delta Comfort Basic, Delta Main Basic` | $99* | $199* |

**The fee scales with cabin, not with distance, for Basic fares** — $99/$199 in Main, $300 in First, $400 in Premium Select, $500 in Business. A Basic Business ticket carries a $500 change fee. That inversion (more expensive cabin, more expensive change) is counter-intuitive and is published plainly.

Seven further tables cover origins in the Caribbean, Mexico, Central America, South America, Europe/Morocco/Tunisia/Algeria, the UK, Africa/Middle East/India, and Asia/Pacific, in local currency where applicable (`€300`, `£200`, `400,000KRW`, `4,000,000 IDR`). **Every table carries a dated grandfathering footnote**, with at least nine distinct effective dates in play: `March 21, 2024`, `September 26, 2024`, `October 9, 2024`, `October 18, 2024`, `June 26, 2025`, `November 5, 2025`, `November 6, 2025`, `January 23, 2026`, plus `October 28, 2024` for the delay threshold.

This is simultaneously **the most complete and the least usable** fee disclosure in the batch. Every figure is present, dated and jurisdictionally scoped; and a customer cannot determine their own fee without knowing their origin region, destination region, cabin, experience tier, and purchase date against nine cut-offs. The honest summary is: Delta has solved the compliance problem completely and the comprehension problem not at all.

**Named exceptions carried inside footnotes** `[observed]`: "For Delta Main Classic through Delta One Classic tickets originating from **Israel, South Africa, Ghana, Nigeria and Senegal**, there are no change or cancel fees." and "changes or cancellations to tickets are not permitted where the destination is Israel, Ghana, Senegal, Nigeria and South Africa." Two rules about the same five countries, pointing opposite ways, in adjacent footnotes on the same page.

### Baggage fees `[observed]`

> `$45 USD` — "For your **first standard checked bag** under 50 lbs. (23 kg), each way — +1 Free Carry-On Bag and 1 Personal Item"
> `$55 USD` — "For your **second standard checked bag** under 50 lbs. (23 kg), each way"

Scope line, stated before the figures: "The baggage fees shown below are for **Delta Comfort and Delta Main customers traveling on domestic flights within the U.S.**, without a Delta SkyMiles American Express Card, Medallion Status or Active Military exceptions."

Size rule: "Baggage size must not exceed **62 inches (157 cm)** when you total LENGTH + WIDTH + HEIGHT" — the formula is written out in caps rather than assumed.

Weight rule split by product: "Delta Main, Delta Comfort and Delta Premium Select passengers should follow the standard **50 lb.** limit per piece. Delta One and Delta First passengers should follow the **70 lb.** limit per piece."

Other named fees: `Unaccompanied Minors` **$150 each way for up to 4 children** (ages 5–14, or 15–17 by request) with a barcoded-wristband description; `Infant in Arms` free US/Canada, **10% of the cost of an adult fare** internationally; `Direct Ticketing` **$25–$35 USD** round trip for tickets issued in 14 named European countries, `FREE` for all other origins, "waived for phone reservations on request"; `$100 processing fee` on Serious Communicable Disease cancellations.

**Currency-conversion and third-party disclosures** `[observed]`: "CAD or EUR base amounts will be charged when exiting Canada or Europe, respectively, and converted to local currency"; "All Delta airport locations within the US and most international locations are designated 'cashless' and do not accept cash"; and a fraud warning — "Delta does not sell baggage in advance through third parties, including travel agencies. **Any third party charging a fee for any kind of checked baggage … for travel on Delta is not authorized to do so.**"

**Embargo micro-rules named with precision** `[observed]`: "All passengers traveling to or from **Key West, Florida** are limited to one checked bag. **This supersedes all exceptions.**" · "Boxes are accepted as checked baggage to/from Central or South America ONLY if they are in the original, factory-sealed box." · "Exception – Boxes are NOT permitted to/from Brazil, Mexico, and Chile at any time of the year." Airport-level and country-level carve-outs published in the general fee page rather than hidden in a route tool.

### Baggage liability limits `[observed]`

| Type of Liability | Liability Limits |
|---|---|
| `Domestic Liability Limits` | `$4,700 per ticketed passenger` |
| `International Liability Limit (governed by the Warsaw Convention)` | `$9.07 per lb. up to $640 per bag (U.S. Dollars)` |
| `International Liability Limit (governed by the Montreal Convention)` | `1,519 SDR (Special Drawing Rights) per ticketed passenger` |

With `SDR` glossed in a footnote ("an International Monetary Fund unit of currency") and a conversion rule ("SDRs will be converted to U.S. dollars using the rate in effect on the mishandled bags settlement date"). Then five restrictions, including "**Maximum liability is not automatic — damage or loss value must be proven**" and "**No maximum liability applies to wheelchairs or assistive devices.**"

That second line matters: the one category where Delta publishes *unlimited* liability is mobility equipment. It is stated in a bullet list among four limitations, without emphasis.

### Serious Communicable Disease — a defined term with a citation `[observed]`

Commitment 5 contains a formal definition: "**Serious Communicable Disease** means a communicable disease as defined in 42 CFR 70.1 that can cause serious health consequences (e.g., breathing problems, organ damage, neurological difficulties, death) and can be easily transmitted by casual contact in an aircraft cabin environment (i.e., **sitting next to someone, shaking hands, talking to someone, or touching communal surfaces**)."

A regulatory definition followed by four everyday examples of transmission. The four qualifying scenarios are then enumerated (government prohibition; quarantine exceeding 50% of trip length; declared public health emergency plus medical advice; medical advice that the passenger poses "a direct threat to the health of others"), each with a timing condition (`issued after the customer has purchased a ticket`). Remedy: a transferable credit not expiring for five years, or a refund at Delta's discretion, minus the $100 processing fee.

### Accessibility disclosure `[observed]`

Commitment 6 enumerates six categories of assistance, then adds a refund entitlement most carriers do not publish:

> "offering a refund to passengers with disabilities **and individuals in the same reservation** as the individual with a disability who do not want to continue travel without the individual with a disability, where you are: (1) an individual with a disability who is **downgraded to a lower class of service that results in one or more accessibility features needed by you becoming unavailable**; (2) … scheduled to travel through **one or more connecting airports different from the original itinerary**; or (3) … scheduled to travel on **substitute aircraft on which one or more accessibility features needed by you are unavailable.**"

Three trigger conditions, all defined in terms of *accessibility features becoming unavailable* rather than in terms of the disability, and the refund extends to companions. This is the correct framing — the harm is the loss of the feature, not the existence of the disability.

**Complaint Resolution Officials** are named, defined and located `[observed]`: "we designate **Complaint Resolution Officials (CROs)** in all airports who are responsible for ensuring services are properly implemented for our customers with disabilities. You may request a CRO by contacting a Delta agent." Repeated on the accessibility page under the heading `Real-Time Resolution at the Airport` with the explanation "specially trained to resolve issues related to Department of Transportation (DOT) disability regulations and Delta policies on disability."

**`Real-Time Resolution at the Airport`** as a section heading is a strong piece of naming — it tells the passenger that a same-day, in-person escalation path exists, which is the thing they need to know.

**Accessibility request routing has three tiers by lead time** `[observed]`: My Trips self-service → phone `404-209-3434` (with `Dial 711 for Relay Services`) → "complete our Accessible Service Request form online **if you are more than 7 days away from travel**". The 7-day boundary determines which channel is appropriate, and is stated.

Four assistance categories are presented as icon cards `[observed]`: `Nuts or Other Allergies` · `Wheelchairs and Mobility Devices` · `Blind or Low Vision` · `Deaf or Hard of Hearing`.

### Other disclosure practices `[observed]`

- **24-hour cancellation worked as an example**: "You may cancel and refund your ticket in full until midnight, one day after the reservation is made. **For example, a ticket purchased anytime on Monday can be cancelled and refunded until midnight on Tuesday.** If the reservation is made on the date of travel, you may cancel and refund your paid ticket in full until midnight that day **or travel starts, whichever is first.**"
- **Refund-eligibility disclosure obligation**: "If you are eligible for a refund, Delta **will disclose your refund eligibility when you are offered any alternative transportation, travel credit, voucher, or other compensation in lieu of a refund.**" — a commitment not to let an eCredit offer obscure a cash entitlement.
- **No processing fee on refunds**: "We will not retain a processing fee for issuing refunds that are due."
- **International bank-timing caveat**: "international bank processing times vary by country depending on the local banking system. Therefore, it can take up to 2 billing cycles."
- **Compensation discretion published**: "Delta representatives are **empowered with the flexibility and discretion** to issue the following forms of compensation for passenger inconvenience when individual circumstances warrant doing so: cash equivalents (e.g., gift cards), travel credits/vouchers, and/or miles for SkyMiles members."
- **Volunteer compensation named as a product**: "Offering compensation via the **Delta Choice Gift Card Program** if you voluntarily give up your seat … These gift cards are subject to varying expiration dates and are **fully transferrable**."

## T11 Help-centre architecture

Delta does not run a conventional article-based help centre. The architecture is **a set of policy sections, each with its own section nav, its own accordion panels, and a `Next <page>` chain**, plus a `Help Center` hub and an inline messaging channel.

1. **Policy pages are the help centre.** `Change or Cancel`, `Baggage Info`, `Accessible Travel Services` and `Legal` each carry a left-rail nav of 8–10 siblings. There is no search-first, article-list model; the user navigates a document tree.
2. **Accordions are the article unit.** `Expand All` / `Collapse All` appears on every policy page, and each panel is effectively an article with a gerund title. This keeps the whole policy on one URL — good for linking, bad for deep-linking to a single answer (the anchors are machine-generated, e.g. `#expander-image-panel-tent_parsys_expander_3`).
3. **`Next <Page Title>` creates a linear reading path** through each section (see T3). The compliance corpus is readable front-to-back.
4. **Contact ladder**: `Help Center` → `Message Us` → `Comment/Complaint` → named phone numbers per case. `Message Us` is rendered as **bold text rather than a link** in multiple places across the delayed/canceled and accessibility pages — a probable component defect on the primary escalation affordance.
5. **Footnote links carry their own instruction**: anchors render as `[significant delay, Go to footer note]` and `[Access to Alaska Lounge*, Go to footer note]`-style strings. The phrase `, Go to footer note` is appended to the accessible name of every footnote reference — verbose, but explicit about where the link goes. Visible in the serialised output as literal text, which suggests it may be rendering on-screen rather than only to assistive tech.

**Heading grammar across the corpus** `[observed]`:

| Shape | Example |
|---|---|
| `Am I Experiencing …?` | `Am I Experiencing a Delayed or Canceled Flight?`, `Am I Experiencing a Schedule Change?` |
| `<Gerund> <object>` | `Keeping You Informed`, `Managing a Delay`, `Requesting a Refund`, `Requesting Accommodations` |
| `When You Should …` | `When You Should Call`, `When to Contact Us` |
| Noun phrase | `Damaged, Delayed or Lost Baggage`, `Common Baggage Fees`, `Travel Changes` |
| `How the <thing> Works` | `How the Change Fee Works` |
| `How to <verb>` | `How to Change Your Flight`, `How to Share Your Item's Location` |

Note `When You Should Call` and `When to Contact Us` are the same heading concept in two grammatical forms on two pages.

## T12 FAQs

Three FAQ sets harvested. All answers present in server HTML.

**Baggage FAQs — 5 questions** `[observed]`

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | If I forgot to get my file reference number at the Baggage Service Office (BSO), can I still make a baggage claim? | `Yes` + a four-step click path through the feedback form |
| 2 | How much will Delta pay for damaged, delayed or lost bags? | The three-row liability table, the SDR gloss, five restrictions, and a Contract of Carriage pointer |
| 3 | What if I made mistakes in my claim form? | One sentence; a phone number |
| 4 | What if my bag was damaged or delayed while I was on a different airline? | File with the operating carrier of the final leg; **then a 30-day backstop** — "If you booked your ticket with Delta and the final carrier has not responded to your claim within 30 days, please contact us so we can assist" |
| 5 | What if I don't report my damaged bag on time? | Restates both deadlines and the four exception categories, then: "**your damaged bag claim will be denied.**" |

Q1 is the model FAQ: it takes the user's own procedural failure (*I forgot the reference number*), answers `Yes` immediately, and supplies the workaround. Q4 solves an interline problem by naming a specific escalation window rather than disclaiming responsibility. Q5 ends on a blunt consequence with no softening.

**Accessible Travel FAQs — 3 questions** `[observed]`

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | How do I make arrangements for assistance? | Best at booking; more information = better preparation; three channels |
| 2 | What's the difference between wheelchair and electric cart service? | A genuine service-distinction answer — push chair with an associate vs. an electric cart, and **the cart's three limitations** (select airports only, cannot cross concourses or terminals, makes stops at gates as needed) |
| 3 | What if I encounter a problem? | CROs, how to find one, feedback form, and **a postal address** |

Q2 is the standout. Two services the customer might assume are interchangeable are distinguished, and the *worse* option's constraints are enumerated. An airline telling a passenger with mobility needs that the electric cart **cannot take them between terminals** is precisely the information that prevents a missed connection.

Q3 supplying a postal address (`Delta Air Lines, P.O. Box 20980, Atlanta, Georgia 30320-2980`) alongside a web form is an accessibility consideration in itself — not every complainant can use a form.

**Baggage-page expanders — 4** `[observed]`: `Direct Ticketing` · `Cashless Airports` · `Checked Baggage Update` (the third-party fraud warning) · `Processing Fee for Serious Communicable Disease Cancellations`. Noun-phrase labels rather than questions; these are notices filed as FAQ furniture.

**Across all three sets, the shapes are `How do I …?`, `What's the difference between …?`, `What if …?` and `How much will …?`.** The `What if …?` shape carries every failure case, and it is used four times. `What if I made mistakes in my claim form?` is the only one written in the user's admitted error — the Wise first-person-confession pattern, appearing once.

## T13 Terminology & glossary

| Term | Delta's usage | The alternative it rejected |
|---|---|---|
| `customer` | The passenger, in the CSP and help copy | `passenger` survives in regulatory contexts (`passengers with disabilities`, `"bumped" passengers`, `per ticketed passenger`); Alaska's `guest` is not used |
| `experience` | The fare tier: `Basic` / `Classic` / `Extra` / `Refundable` | "fare family", "branded fare" — a deliberate abstraction away from price |
| `Delta Main Basic (Basic Economy)` | The restricted fare, glossed once | The industry term is retained only as a parenthetical |
| `Delta Main` / `Delta Comfort` / `Delta Premium Select` / `Delta First` / `Delta One` | Cabins, all brand-prefixed | `Economy`, `Premium Economy`, `Business` |
| `significant delay` / `significant schedule change` | Terms of art, always shipped with their numeric definition | "major delay", "lengthy delay" |
| `misconnect` (n. and v.) | The missed-connection event | "missed connection" — Delta uses the operations term in customer copy |
| `irregular operation` | The umbrella term, used once | `IROPS` (the internal acronym) is not exposed |
| `diversions` | Named alongside delays and cancellations in the notification commitment | |
| `eCredit` | Residual value instrument | `travel credit` and `voucher` both appear as glosses: "eCredits (i.e., travel credits)", "travel credit that is transferrable" |
| `oversold flight` / `involuntarily denied boarding` | The overbooking vocabulary | `bumped` appears **only in scare quotes** in commitment 8's heading — the colloquialism is acknowledged, then dropped |
| `Risk-Free Cancellation` / `24-Hour Risk-Free Cancellation` | The 24-hour window, branded | "free cancellation period" |
| `Same-Day Confirmed` / `Same-Day Standby` | Two distinct day-of products | |
| `Pilfered (Stolen) Item` | Missing contents | Glossed in place, every time |
| `Potential Property Loss` | Bag delayed 6+ days | An intermediate state between delayed and lost |
| `Baggage Service Office (BSO)` | The airport counter, acronym expanded on first use | |
| `file reference number` | The claim identifier | "claim number", "reference ID" |
| `Complaint Resolution Official (CRO)` | DOT-mandated role, expanded and explained | |
| `GIDS` / `FIDS` | Gate and Flight Information Display screens, both expanded | |
| `Serious Communicable Disease` | Formally defined term with CFR citation | |
| `Delta Choice Gift Card Program` | Volunteer compensation, branded | "denied boarding compensation" |
| `Medallion` / `SkyMiles` / `Delta Sky Club®` | Loyalty vocabulary | |
| `Delta Connection®` | Regional operating partner | |
| `Cost Recovery Fee` / `Booking Violations` / `Notice of Enforcement` | The anti-abuse enforcement vocabulary | "hidden city ticketing", "throwaway ticketing" |
| `cashless` | Airports not accepting cash | In scare quotes on first use: `designated "cashless"` |
| `20-Minute Bag Guarantee` | A named baggage SLA product | Present in nav; page not harvested |

**Register notes.** Delta's vocabulary is **operations-derived and glossed**, not consumer-derived and simplified. `misconnect`, `GIDS`, `BSO`, `pilfered`, `SDR`, `irregular operation` are all internal or technical terms shipped to customers **with a gloss attached on first use**. The bet is that a precise term plus a definition beats an imprecise plain-language substitute. On the whole it works — `Potential Property Loss` is more useful than "still missing" because it names a distinct claim type.

The counter-example is `experience`. `Delta Comfort Basic` is a cabin-plus-tier compound that requires the reader to hold two independent taxonomies, and the fee tables are unreadable without doing so.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the customer, first-person plural for the airline. **The airline is the subject of every commitment sentence** — "We will provide", "We will make every reasonable effort", "we will rebook you", "We will not retain a processing fee", "we'll automatically issue a refund". The CSP is written almost entirely in first-person-plural future, which is the correct grammar for a promise document and is sustained across all twelve commitments without lapsing into passive voice.

Where Delta cannot promise, it says so in the same voice: "we will make **every reasonable effort**", "We will **attempt to** contact you", "we will **do our best** to notify you", "**Where possible**, Delta will automatically rebook you", "our representatives **may be able to** help you", "usually the best option". The hedges are visible and consistent rather than hidden in qualifiers.

**Register gradient, three bands.**
- *Warm* in disruption openers: "We're here to support you every step of the way", "We value your time and sincerely apologize", "Rest assured, we are committed to helping you manage the disruption", "We're sorry you're experiencing an issue with a checked bag and apologize for the inconvenience", "We apologize for the inconvenience of a delayed bag and we're here to help", "we regret to share that the bag is likely lost"
- *Neutral-procedural* in the numbered steps and tables
- *Flat and regulatory* in the CSP and footnotes, with CFR citations inline

The apologies are frequent (at least five distinct apology openers across four pages) and they are consistently placed **first in the panel, before the procedure**. `we regret to share that the bag is likely lost` is the softest construction on the site and sits at the worst moment — appropriate calibration.

**One tonal oddity**: "You serve us, and we're delighted to serve you." (military baggage) — a chiasmus in the middle of a fee table, and the only rhetorical flourish in the baggage corpus.

**Numbers as trust devices** `[observed]`, and the density is the point: `12-key points`, `30 minutes`, `12 hours`, `15 or 30 hours`, `7 business days`, `20 days`, `2 billion cycles`(sic — `2 billing cycles`), `24-hours`, `3 hours`, `6 hours`, `72 hours`, `120 minutes`, `5 years`, `21 days`, `6 hours`, `7 days`, `5 days`, `6 days`, `30 days`, `60 days`, `$45`, `$55`, `$150`, `$100`, `$99–$500`, `$4,700`, `$9.07 per lb.`, `$640`, `1,519 SDR`, `62 inches (157 cm)`, `50 lbs. (23 kg)`, `70 lb.`, `4 bags`, `20 bags`, `10%`, `50%`. Dual units given for every measurement. Almost nothing is rounded or hedged.

**Accessibility content** `[observed]`

- `Skip to main content` first in DOM on every rendered page. Correct.
- **A published `Accessibility Notice`** in the legal tree, plus `Canada Accessibility Plan & Feedback Process`, a `Canada Accessibility Plan 2025 Progress Report`, and a `Passengers with Disabilities Bill of Rights` — four distinct accessibility governance artefacts, two of them jurisdiction-specific and one of them a dated progress report.
- **`Delta's Advisory Board on Disability`** published as a peer page in the accessible-travel nav — governance surfaced to customers.
- Relay-service instructions inline with every phone number: `dial 711 for Relay Services`, `Dial 711 for Relay Services`, `dial 711 for relay services` — **three different casings of the same instruction across three pages.**
- Icon alt text is descriptive: `6 star medical icon with exclamation point`, `Wheelchair icon`, `Eye icon`, `Ear icon`, `icon of a plane flying around the world`, `icon of a suitcase with a ticket`, `question mark inside of a circle`, `image of a world map on a laptop computer`, `damaged baggage`, `delayed baggage`, `lost baggage`, `missing items from checked baggage`. The 404 cards' alt text describes the *drawing* rather than the destination, which is arguably the wrong level for a navigational icon paired with a text label.
- **Every icon appears twice in the markup** (mobile and desktop variants, identical alt) — a duplication screen-reader users may encounter as two identical images per card.
- **Footnote references append `, Go to footer note` to their link text** — explicit, but appearing as literal visible text in the serialised output.
- **Three unlabelled nav links** (My Trips, check-in, Flight Status icons) render with empty link text.
- **`Message Us` rendered as bold text rather than a link** in several places — the primary escalation affordance may not be operable in those positions. Flagged as suspected from serialised output, not confirmed against the live DOM.
- The comparison and fee tables use text values (`free`, `$300`, `not permitted`), not icons.

**Negative findings, recorded honestly**

- Two CTA labels for one action across sibling pages (`Find Alternative Flight` / `Change Flight`), and two quoted in-product button names for the same step (`Find Alternative Flights` / `Change or Add Flights`)
- Six buttons to one baggage-claim destination under two labels
- Three phrasings of the 24-hour auto-refund commitment, one of which differs in meaning
- `October 28, 2024` and `Oct. 28, 2024` in a single sentence, repeated on five pages
- Nine grandfathering dates active across the fee tables simultaneously
- Two adjacent footnotes giving opposite rules for the same five countries
- `Message Us` not rendered as a link in several locations
- Three unlabelled icon links in the global utility nav
- `dial 711` relay instruction in three different casings
- `Report Lost Item , opens in new window` — space before comma
- `reunited with their bag` — pronoun agreement error in the Find My privacy paragraph
- Every icon duplicated in markup with identical alt text
- The 404 headline (`Whoops!`) is the only interjection on the site; it is correctly placed, but the page's alt text describes drawings rather than destinations

---

## Transferable patterns

1. **Make the page's first job diagnosis, not instruction.** `Am I Experiencing a Delayed or Canceled Flight?` followed by a definitional list, with reciprocal routing to the sibling page on a single variable (72 hours). A user who does not know which situation they are in cannot follow a remedy; Delta solves that before anything else.
2. **Ship a term of art with its definition attached, every single time.** `significant delay (departure or arrival 3 hours or more earlier or later for domestic itineraries, or 6 hours or more for international)` appears five times in full. Where money attaches to a word, never use the word alone.
3. **Publish a failure-to-act default that resolves in the customer's favour, with a clock.** "If none of these actions are taken within 24 hours, we'll automatically issue a refund back to your original form of payment." Directly applicable to disputes, unclaimed refunds and abandoned recovery flows.
4. **Enumerate the excluded causes and the excluded expense types as two short closed lists.** `Air Traffic Control delays` / `Weather delays`, then `Prepaid expenses` / `Alternative transportation` / `Lost wages`. Two lists of two and three beat one paragraph of "circumstances beyond our control".
5. **Publish the adjudication rubric for a discretionary process.** "We consider necessity and reasonableness of replacement items purchased, timing and location of purchases, duration of the bag delay, and documentation provided." Tells the claimant how to succeed and makes a subjective decision auditable.
6. **Number the fee and the price difference as two separate steps.** Conflating them is how customers feel deceived; separating them costs one line.
7. **Build a fallback ladder that ends in money, not in nothing.** We book the hotel → you book and we reimburse → we credit you at our contracted rate. Every tier has a trigger and the terminal state is still a remedy.
8. **Disclose the limitation of the *better-sounding* option.** The electric-cart answer tells a passenger with mobility needs that carts cannot cross terminals. The information that prevents harm is usually about the option the customer would otherwise assume is superior.
9. **Advise the customer not to act when acting would make it worse.** "usually the best option is to remain on your current flight."
10. **`Next <Page Title>` at the foot of every policy page.** Turns a compliance reference tree into a readable document at near-zero cost.
11. **Anti-pattern: complete disclosure that defeats comprehension.** Delta's change-fee corpus is eight tables, five currencies and nine grandfathering dates. Every figure is correct; no customer can find theirs. Completeness and usability are separate problems and solving one does not solve the other.

## Caveats & gaps

- **The homepage returned a `<title>` only.** No hero, no booking-widget field labels, no promotional copy, no search-form microcopy. T2 and T5 are correspondingly thin for the acquisition surface.
- **No live flight-state vocabulary was observable.** Flight Status, My Trips, check-in and the booking funnel are authenticated or SPA-rendered. The words a Delta customer actually sees on a status board — `On Time`, `Boarding`, `Delayed`, `Departed`, `Canceled` — are **not captured**. T6 documents the *policy* vocabulary of disruption, which is a different artefact from the *display* vocabulary. For a product whose benchmark strength is "trip status and self-service rebooking", this is a material limitation and is stated rather than papered over.
- **The rebooking UI is `[documented]` only.** Button labels (`Find Alternative Flights`, `Change or Add Flights`, `Track My Bags`) are quoted from help prose; the actual screens, error states and confirmation copy were not observed — and the two quoted labels conflict, so at least one quotation is stale.
- **The Help Center hub page was retrieved but exceeded the practical read limit** and was used only to confirm navigation. Its topic tree and any article inventory are unharvested.
- **Contract of Carriage (US, Canada, International), Contingency Plan for Lengthy Tarmac Delays, Booking Violations, Cost Recovery Fee, AI Terms of Use, Passengers with Disabilities Bill of Rights, Sexual Assault or Harassment, Canada Passenger Rights, and the two EU/Israel compensation pages were not opened.** Several of these are named in this file from nav labels only.
- **Sub-pages of the accessible-travel section** (`Wheelchairs, Scooters & Assistive Devices`, `Trained Service Animals`, `Cognitive & Invisible Disabilities`, `Blind, Low Vision, Deaf or Hard of Hearing Travelers`) were not opened. T14's accessibility content is from the overview, the CSP and the legal nav only.
- **`20-Minute Bag Guarantee`, `First Checked Bag Free`, carry-on sizing, Medallion and military allowances** are named in nav but their pages are unharvested — so the carry-on dimension rules and the status-based fee waivers are not recorded.
- **The Customer Service Plan is dated `Effective October 24, 2024`** and is being read on 2026-09-21. It is very likely still current (Delta versions this document explicitly) but has not been re-verified against a newer revision.
- **The fee tables contain grandfathering dates that have now passed**, so several footnotes describe rules for ticket cohorts that no longer travel. Figures taken from this file should be checked against the live page before use.
- **Accessibility findings are from served HTML**, not a rendered accessibility tree. The `Message Us` link defect and the unlabelled nav icons are flagged as suspected.
- Non-US locales and the Fly Delta app are out of scope for this pass.

## Sources

1. https://www.delta.com/ (title only — client-rendered)
2. https://www.delta.com/us/en/legal/customer-commitment
3. https://www.delta.com/us/en/change-cancel/delayed-or-canceled-flight
4. https://www.delta.com/us/en/change-cancel/schedule-changes
5. https://www.delta.com/us/en/change-cancel/overview
6. https://www.delta.com/us/en/baggage/overview
7. https://www.delta.com/us/en/baggage/delayed-lost-damaged-baggage
8. https://www.delta.com/us/en/accessible-travel-services/overview
9. https://www.delta.com/us/en/need-help/overview (retrieved; used for navigation confirmation only)
