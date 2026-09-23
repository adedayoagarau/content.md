# 074. Deliveroo

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Restaurant and grocery delivery marketplace (three-sided: customer / rider / restaurant partner), plus own-operated grocery (Deliveroo HOP) and delivery-only kitchens (Editions) |
| Primary URL | https://deliveroo.co.uk/ |
| Corpus rank | 074 |
| Benchmark strength (source list) | Order states and support |
| Locale / market observed | en-GB. Footer country list: `United Arab Emirates` · `Belgium` · `France` · `Ireland` · `Italy` · `Kuwait` · `United Kingdom` |
| Platform observed | Customer web, rider hub, merchant marketing + Intercom help centre, partner policies |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | UK consumer law visible throughout: statutory-rights savers (`This does not affect your legal rights.`), 14-day cooling-off, UK/EU change-of-mind cancellation right with perishable/hygiene carve-outs, Klarna FCA-style credit warning, Challenge-25-style age verification, EAA (Directive (EU) 2019/882) and Equality Act 2010 in the accessibility statement, EHRC enforcement route named. Legal entity disclosed as `Roofoods Limited`. |
| Harvest date | 2026-09-21 |
| Pages inspected | 22 reachable, 1 blocked |
| Harvest completeness | Partial — **`deliveroo.co.uk/legal` returned a completely empty body** (client-rendered), removing all customer contractual language. The live order tracker is behind login, so **no verbatim customer order-state label was obtained**. The customer-side state vocabulary in T6 is therefore reconstructed from rider and merchant surfaces, which is itself the finding. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Customer storefront | https://deliveroo.co.uk/ | Hero, four-section value prop, footer |
| **Customer FAQ** | https://deliveroo.co.uk/faq | **The entire customer help estate — one flat page, 14 anchors** |
| Merchant help centre home | https://help.deliveroo.com/en/ | Intercom-hosted; **merchant-only despite generic branding** |
| Merchant: Managing live orders | https://help.deliveroo.com/en/collections/2612285-managing-live-orders-and-deliveries | 28 articles, 6 sub-collections |
| Merchant: cancelled orders | https://help.deliveroo.com/en/articles/8871153-what-are-cancelled-orders-and-how-can-i-avoid-them | Rejection vs Cancellation |
| Merchant: prep times | https://help.deliveroo.com/en/articles/2152581-how-do-prep-times-work | **EOD formula** |
| Merchant: Order ready / Need more time | https://help.deliveroo.com/en/articles/7048177-what-are-the-order-ready-need-more-time-buttons-and-how-do-they-work | |
| Merchant: Rider Receipt Scanning | https://help.deliveroo.com/en/articles/8663042-what-is-rider-receipt-scanning-and-how-does-it-work | |
| Merchant marketing | https://restaurants.deliveroo.com/ → https://merchants.deliveroo.com | 301 redirect |
| **Merchant Partner Policies** | https://merchants.deliveroo.com/legal/policies | **Cancellations, Customer Compensation, Value Programme — the richest single page** |
| Rider hub | https://riders.deliveroo.co.uk/ → https://rider.deliveroo.co.uk | 301 redirect (plural → singular) |
| Rider support index | https://rider.deliveroo.co.uk/support | 13 topics |
| Rider support: Orders | https://rider.deliveroo.co.uk/support/orders | |
| Rider support: Money | https://rider.deliveroo.co.uk/support/money | |
| Rider: customer not at door | https://rider.deliveroo.co.uk/support/orders/getting-to-the-customer11 | **The 5-minute ladder** |
| Rider: tipping | https://rider.deliveroo.co.uk/support/orders/can-customers-tip-me | |
| Rider: return order | https://rider.deliveroo.co.uk/support/orders/what-is-a-return-order | |
| Rider apply | https://rider.deliveroo.co.uk/apply | Three-step how-it-works |
| Deliveroo Plus | https://deliveroo.co.uk/plus | Tier cards |
| Deliveroo HOP | https://deliveroo.co.uk/deliveroo-hop | **A separate register entirely** |
| Accessibility Statement | https://deliveroo.co.uk/accessibility-statement | **Best in this batch** |
| Contact | https://deliveroo.co.uk/contact | Three-audience routing |
| **Blocked** | https://deliveroo.co.uk/legal | Empty body — all customer T&Cs lost |

---

## T1 Navigation & IA labels

**Three domains, three help systems, and the customer footer points at the legacy hostnames** `[observed]`

Customer = `deliveroo.co.uk`. Rider = `rider.deliveroo.co.uk` (the footer links `riders.` plural, which 301s). Merchant = `merchants.deliveroo.com` (the footer links `restaurants.`, which 301s) plus `help.deliveroo.com` for support. **Both non-customer audiences are reached from the customer footer via URLs that redirect.**

**Customer footer, four groups** `[observed]`

| Group | Members |
|---|---|
| `Products and services` | `Deliveroo Plus` · `Deliveroo for Work` · `Deliveroo Students` · `Deliveroo HOP` · `Gift cards` |
| `Browse` | `All brands` · `All cuisines` · `All deals and offers` · `All cities` |
| `Work with us` | `Rider` · `Restaurant` · `Grocery` · `Retail` · `Developer` · `Careers` |
| `Company` | `About us` · `Newsroom` · `Investors` · `Deliveroo Design` · `Deliveroo Engineering` · `FAQs` · `Contact` · `Terms and conditions` · `Privacy` · `Cookies` · `Modern Slavery Statement` · `Tax Strategy` · `Section 172 Statement` · `Public Authority Requests` · `Accessibility Statement` |

`Work with us` is the cleanest audience-router label in this batch — four single-noun audience names (`Rider`, `Restaurant`, `Grocery`, `Retail`) and no verbs. Compare Uber Eats, which spreads the same routing across four different verb phrases in the consumer nav.

`Deliveroo Design` and `Deliveroo Engineering` are first-class footer links on a consumer site — unusual, and a signal that the design estate is treated as public-facing.

**Customer FAQ top-level categories, in order** `[observed]`: `About Deliveroo` · `My order` · `Deliveroo Plus` · `Using Deliveroo` · `Payments/refunds` · `Food Safety` · `Rider Complaints` · `Multi Partner Shopping` · `Variable Weight Orders` · `Anything else?` · `Community Guidelines` · `Deliveroo Freshness Promise on selected grocery items` · `Public authority requests` · `App Account Data Deletion Requests`

Note the **casing is not normalised**: `Food Safety` and `Rider Complaints` are title case; `My order` and `Public authority requests` are sentence case. And `Anything else?` sits as a category name with a question mark — the catch-all slot, made explicit, exactly as Wise does with its twelfth FAQ question.

`Rider Complaints` as a customer-facing help category is notable. Deliveroo gives its customers a named, first-class route to complain **about a worker**, and publishes the fields it wants.

**Rider global nav** `[observed]`: `News` · `Support` · `Perks` · `Apply to be a rider` · `Kit Store` · **`Respect Charter`**

`Respect Charter` in the top nav of the rider site is a rider-only coined artefact and the only place in this batch where a platform puts a behavioural covenant in a worker's primary navigation.

**Merchant help-centre top-level, with article counts** `[observed]`: `Getting started on Deliveroo` (43) · `Manage your business in Partner Hub` (70) · `Managing live orders and deliveries` (28) · `Payments & Invoices` (18) · `Troubleshooting and technical support` (7) · `Learn how to grow your business on Deliveroo` (1) · `Contact us` (12)

Publishing the article count per collection is good practice — it sets expectations about depth before the click. `Learn how to grow your business on Deliveroo` containing exactly one article is a visible gap the count exposes.

## T2 Value proposition & headline patterns

**Customer hero** `[observed]`

> `Restaurants, takeaways, supermarkets and shops. Delivered.`

A four-item asyndetic list, full stop, then a single past participle as its own sentence. It is the most confident hero in this batch — the verb is held back to the end and given its own sentence. Compare Uber Eats' flat `Order delivery near you` and DoorDash's `Everything you crave, delivered.`

Search prompt: `Enter a postcode to see what we deliver:` — a colon, and the promise is inverted (you tell us where, we tell you what).

**Section headers are audience-routing blocks with a benefit line each** `[observed]`

- `Download the app` — "Quick and easy orders, exclusive savings and tracking in your pocket."
- `Partner with us` — "Join Deliveroo and reach more customers than ever. We handle delivery, so you can focus on the food."
- `Ride with us` — "The freedom to fit work around your life. Plus great fees, perks and discounts."
- `Deliveroo for Work` — "From team lunches to meal allowances for your late night workers, we've got your workplace meals covered."
- `Gift Cards` — "Looking for an easy way to treat your friends and family?"

**Deliveroo HOP is a register jump, and it is the most interesting tonal artefact in the file** `[observed]`

> H1: `Welcome to Deliveroo HOP. Groceries delivered in minutes. BOOM.`
>
> Section headers: `It's fast…like really fast` · `Bags of choice` · `Open early 'til late` · **`No substitutions`** · `Smooth operator` · `Food to those who need it`
>
> Body: "Just like magic ✨" · "Bliss!" · "Job done."

HOP is a different voice on the same domain — shoutier, younger, emoji-bearing, ellipsis-heavy. And `No substitutions` is a **section header selling the absence of a feature**. Deliveroo's own-operated grocery sells "we will never swap your item" as a headline benefit, which is the exact inverse of Instacart's entire substitution product. Two companies, one problem, opposite answers, both written as benefits.

**Rider** `[observed]`: `Deliveroo Rider: deliver, earn and get the support you need` · `Why ride with Deliveroo?` · `Earn on your terms.` · `Find work that suits you` · `We're always here for you`. Benefit chips: `Work when you want to` · `Reach your earnings goals` · `Get round-the-clock support`.

**Merchant** `[observed]`: `Grow your business with Deliveroo` · `Why choose Deliveroo?` with three pillars `Reach exclusive customers` / `Manage your delivery operations` / `Accelerate your business growth` · `We're there from order prep to doorstep delivery` · `Ready to grow your business?`

**Contact page H1** `[observed]`: `Let's Chat.` — with a full stop. Two words, contraction, terminal punctuation on a fragment. The full-stop-on-a-fragment habit runs right through the estate (`Delivered.`, `BOOM.`, `Job done.`, `Earn on your terms.`).

## T3 CTA inventory

| CTA (verbatim) | Context | Audience | Notes |
|---|---|---|---|
| `Search` | Postcode submit, homepage and HOP | Customer | |
| `Log in for recent addresses` | Homepage | Customer | |
| `Log in for your recent addresses.` | HOP | Customer | **Trailing full stop, and "your" added — same CTA, two forms** |
| `Log in` / `Sign up` / `Sign up or log in` / `Account` | Header, varies by page | Customer | Four states for one auth control |
| `Get started` | Homepage, **used four times for four different destinations** | Mixed | Partner, Ride, Work, Gift Cards — a fully non-disambiguating CTA |
| `T&Cs` | Offer disclosure | Customer | |
| **`Order Help`** | Named in FAQ as the in-product control | Customer | **The single entry point for every customer failure** |
| `Get Help` | The unrecognised-charge form | Customer | A second help control with a different name |
| `Add code` · `Submit` · `Switch plans` · `Switch to [Plan Name]` · `Claim with Amazon Prime` · `Use Voucher` · `Delete account` | Named in FAQ body | Customer | |
| `Log in to check availability` · `Link your Amazon Prime account` | Plus page | Customer | |
| `Become a rider now` | Rider hero | Rider | |
| `Apply now` | Rider, **twice, to two different URLs** (`/signup/journey` and `/signup/quiz`) | Rider | |
| `See all FAQs` (per topic) · `Change topic` | Rider support | Rider | |
| `Start selling` · `Become a partner` · `Visit our Learning Centre` | Merchant | Merchant | |
| `Order ready` · `Need more time?` · `Busy mode` · `Open Reminder` · `Live Orders` | Merchant in-product, named in help | Merchant | |
| `Did this answer your question?` → `Disappointed Reaction😞` / `Neutral Reaction😐` / `Smiley Reaction😃` | Merchant help, every article | Merchant | **Emoji options labelled in text — correct a11y practice** |
| `Download Deliveroo in the App Store` / `Get Deliveroo on Google Play` | Footer | Customer | **See defect below** |

**A real, repeated defect** `[observed]`: the Android footer button is labelled `Download Deliveroo in the App Store` on `/faq`, `/plus`, `/contact`, `/accessibility-statement` and `/deliveroo-hop`. Only the homepage hero uses `Get Deliveroo on Google Play`. The wrong store name ships on five of six pages, in both link text and alt.

## T4 Onboarding & getting-started

**Rider `How it works` — three steps, and the third breaks the pattern** `[observed]`, preamble "Once you've joined Deliveroo, here's what to expect."

1. **`Accept and go`** — "While you're online, we'll offer you orders to deliver. Tap to accept the order."
2. **`Collect the order`** — "You'll see a map with a route to the restaurant. Show a staff member your screen to get your packed order."
3. **`Make a customer's day – deliver their food!`** — "Next, we'll show you a suggested route to the customer. After you've delivered their food, you're ready to accept a new order."

Steps 1 and 2 are imperative verb phrases. Step 3 is an exhortation with an en dash and an exclamation mark. A live consistency break, and a revealing one: the step where the rider meets a human is the step that stops being procedural.

**Rider `What you'll need`** `[observed]`: `Scooter, bike, cargo bicycle or car (with licence and insurance)` · `Safety equipment (e.g. helmet)` · `Smartphone with iOS 17.0 / Android 8 or above with NFC (near-field communication), front and rear-facing cameras` · `Proof of your right to work self-employed in the UK` · `Age 18+`

Note `(near-field communication)` glossed inline — Deliveroo expands NFC for an audience it cannot assume knows the acronym. And "right to work **self-employed**" states the employment status inside the eligibility list rather than in a legal footnote.

**Customer task steps are published as navigation paths** `[observed]`. Plus plan switching: "Go to the 'Deliveroo Plus' section in the app." → "Select 'My Subscription'." → "Choose 'Switch plans'." → "Tap '`Switch to [Plan Name]`' to confirm your choice."

Note the **four different verbs for four taps** — Go to, Select, Choose, Tap. Most products use one verb throughout; Deliveroo varies it, which reads more naturally and is harder to maintain.

## T5 Form & field labels

Logged-out surfaces expose almost no inputs. What is there `[observed]`:

- `Enter a postcode to see what we deliver:` / `Search`
- `Deliveroo Hop — enter your address to find options nearby.` / `Search`
- Merchant help search placeholder: `Search for articles...`

**The fullest field list on any public surface is the unrecognised-charge form**, named in the FAQ `[observed]`: `Last four digits of the card number` · `The card issuing company (eg. Visa, Mastercard)` · `Expiry date of the card` · `Dates and amounts of transaction` · `Country and currency the card is registered to` · **`Debiting party (eg. Deliveroo.co.uk, Deliveroo.Fr)`** · `Email address associated with the Deliveroo account`

`Debiting party` with two worked examples is the standout — a technical banking term glossed by showing the two strings the customer will actually see on their statement. That is the right way to ask for a value the user must read off another system.

**Food-safety claim question sets** `[observed]` — three distinct sets, each a de facto form:

- Illness: `What symptoms did you have?` · `What did you order?` · `When did your symptoms appear and how long did they last for?` · `Did you seek medical attention?` · `Was your meal shared with someone else?`
- Foreign object: `What was the object you found in your order?` · `Where did you find the object?` · `Did you consume the affected item?`
- Allergy: `What are your allergies?` · `Did you let the partner know about your allergies?` · `Did you have access to the allergy information before checkout?`

These are written as **questions a person would be asked, not as field labels**. `Was your meal shared with someone else?` is an epidemiological question in plain English. The allergy set's third question — "Did you have access to the allergy information before checkout?" — is Deliveroo asking whether its own UI failed, inside a complaint form.

**Rider complaint fields** `[observed]`: `A short description of the incident` · `Location of the incident (town, city, street)` · `Time and date of the incident` · `The rider's vehicle type (Bike, Scooter, Motorbike etc.)` · `Anything else that can help us identify the rider`

## T6 Status & state language — PRIORITY

### The honest gap, stated first

**No verbatim customer order-tracker state label was obtained.** The tracker is behind login and `/legal` returned nothing. No `Order placed`, `Confirmed`, `Preparing`, `Rider assigned`, `On the way`, `Arriving` or `Delivered` string is quoted in this file, because none was observed.

**But the gap is itself the finding.** Deliveroo's customer surface names the *feature* and describes the *sequence* in prose, while its rider and merchant surfaces name every state precisely. The customer has the least state vocabulary of any of the three audiences.

### Customer-facing `[observed]`

Feature name: **`Order Tracker`** — "You can check the status of your order using the Order Tracker feature in the Deliveroo app or on the website."

The sequence, described rather than labelled: "Once you checkout and your order has been confirmed, you'll be able to see live updates from when the partner starts preparing your order, to when the rider picks it up and is on their way to you."

So the customer's conceptual model is **confirmed → partner preparing → rider picks up → on their way**. Those are Deliveroo's FAQ words, not tracker chips.

One near-state string is quotable: **"we will let you know when your order is on the way"** — used for the Marketplace+ case.

**The degraded-state disclosure is explicit and good** `[observed]`: "it's not possible to follow your rider's journey when ordering from partners that arrange their own delivery." Deliveroo tells customers, in the FAQ, that the tracker **stops working** for a whole class of orders. Most products let you discover that at the tracker.

**The customer lifecycle is split into exactly two named phases** `[observed]`: **`Completed Orders`** and **`Live Orders`**. Both route to the same control, `Order Help`. A two-state model where the rider has eight and the merchant has a dozen.

Named sub-states and order types `[observed]`: `top-up orders` ("a timer will appear showing how long you have to place this second order without paying another service fee") · `Multi Partner Shopping` ("separate deliveries from different riders"; "You'll be able to track the delivery per store") · `Variable Weight Orders` (price is "an estimate" until "the actual weight picked") · `scheduled orders` · `pick-up orders` · `redeliveries`.

### Rider-facing `[observed]` — eight named states and an in-app string

| State / control | Verbatim |
|---|---|
| Offer | `Accept and go` — "Tap to accept the order" |
| Collection | `Collect the order` |
| Arrival at merchant | `check in at the restaurant` / **`Rider Check-in`** / `Rider Check-in point` — NFC-tag based |
| Possession | marked **`collected`** after scanning the 4-digit order ID |
| Release | `un-assign myself from the order` |
| Decline | `rejecting orders` |
| Multiple | `stacked order` |
| **Undeliverable terminal state** | **`return order`** — "if you can't complete the delivery to the customer, you'll receive an extra fee to return it to the shop – this is called a return order." In-app string on the order card: **`Return if required`**, "with a note under the customer address" |

**`Return if required` is the best in-app string in this file.** Three words on an order card, placed under the customer's address, that pre-arm the rider for a failure that has not happened yet. It is conditional, it is neutral, and it appears *before* the delivery attempt rather than after it.

**The customer-unreachable ladder — the most specific timing copy on any public surface in this batch** `[observed]`:

> "your app will let you send a **'leaving soon' alert** to their phone. **5 minutes** after you've sent this alert you'll be able to complete the delivery and leave their order in a safe place."

Rider waits → uses `Chat` or calls → sends the `'leaving soon' alert` → five minutes → safe-place drop with photo proof ("Take a photo of the order in the rider app"). Age-restricted exception stated: "If the order contains age-restricted items these should be removed before leaving it and safely disposed of afterward."

**The alert is named from the rider's perspective and sent to the customer.** `'leaving soon'` is what the rider is about to do, not what the customer should do. Compare Instacart's `Customer Missing` (internal, blaming) and DoorDash's `Can't reach customer` (rider's failure). Deliveroo's string is the only one of the three that is a *warning about an intention* rather than a report of a condition.

### Merchant-facing `[observed]` — the richest named vocabulary

- **`Live Orders`** (Partner Hub) and **`Order Manager`** (the newer app)
- **`prep time`** — "Prep time is our term for how long it takes restaurants to get an order ready for pickup by a rider." Note "our term for" — Deliveroo flags its own coinage.
- **`estimated order duration (EOD)`** — "the estimated order duration (EOD) we show to customers on the restaurant list". Formula published verbatim: **"EOD = time to prep food + time to load vehicle with food + time to travel to customer."** Worked example: "EOD 25 mins = 15 mins prep time + 3 mins loading + 7 mins travel."
- **`'prep for' time, sometimes referred to as the 'pick-up time'`** — Deliveroo explicitly documents its own unresolved synonym, inside the Cancellations Policy
- **`Order ready`** — "Pressing the button will also send a notification to the rider that accepts the order to let them know it's ready to collect immediately"
- **`Need more time?`** — "operates at the order level, and can still be used after an order has been placed. Busy mode only applies to orders that have not yet been placed."
- `Busy mode` · `auto-open` · `auto-accept` · `Open Reminder`
- **`'Are you still there?' Nudge`** — and the two article titles spell it differently: `Understand the 'Are you still there?' Nudge in Order Manager` vs `What is the 'Are you still there'? nudge and how does it work?` (misplaced question mark, lower-case nudge)
- **`Rejection` vs `Cancellation`, formally distinguished** — verbatim: "**Rejection:** when the order is declined at the initial stage, when it is first sent to the tablet or Point Of Sale (POS) system. Partners have 10 minutes to accept or reject the order, or the system will automatically reject it." / "**Cancellation:** when the order is initially accepted, and then declined at a later stage (e.g. the dish is no longer available)."
- `Spoiled Food` · `Multi-Site Stacking` · `Fleet Switching` · `item substitutions` · `mark items as unavailable` · `Pickup` · `last orders`

**Publishing the EOD formula as an equation is the single most transferable thing on the merchant surface.** The number the customer sees on the restaurant list is decomposed into its three components, with a worked example, on a page the merchant can act on. It converts an opaque estimate into three levers.

**Merchant timing rules, stated literally** `[observed]`: 10 minutes to accept or reject before auto-rejection; "partners need to remain open for up to 15 minutes after the 'prep for' time"; "a rider should not have to wait any longer than **5 minutes** to collect the order"; the Rider Wait Time metric triggers when food is ready "more than 5 minutes after the expected pick-up time".

## T7 Error, failure & recovery — PRIORITY

### One control, three descriptions

Every customer failure funnels to **`Order Help`**. The route is given three different ways on two pages `[observed]`:

1. "go to the person icon in the top right, navigate to 'Orders', select the relevant order, and then report the issue you experienced by tapping on 'Order Help'" (completed orders)
2. "tap the person icon in the top right, go to 'Orders', select the relevant order, and choose 'Order Help'" (live orders)
3. "Go to Order History, select a recent order and then use Order Help." (contact page)

Three verbs for the first tap (go to / tap / —), two names for the destination (`Orders` / `Order History`), three verbs for the final action (tapping on / choose / use). One path, three authors.

**Live-order amendment options** `[observed]`, verbatim: "From here, you can request to cancel your order, modify your delivery details or change the items you've ordered." Immediately hedged: "we can't always guarantee this, as the partner may have already started preparing your order and assigned a rider to it."

The hedge names **the two system conditions that block the change** — prep started, rider assigned — which is the same pair DoorDash puts in its refund matrix. Deliveroo states them in prose; DoorDash states them in a table. The table is better, but the prose at least names them.

### The three named remedies

`[observed]`, from the merchant-side Customer Compensation Policy, stated twice: **"Compensation for an order may take the form of re-delivery, credit or a refund."** And: "We offer re-deliveries where possible to ensure the best outcome for the customer."

**Re-delivery is named first and prioritised explicitly.** Deliveroo is the only product in this batch that says, in policy, that it prefers to send the food again rather than send the money back. The self-service tool is named `the Self-Serve tool in the Deliveroo app`; contact channels are `Call`, `Live Chat`, `In-App Self-Help`.

### The customer issue taxonomy — four claim reasons

`[observed]`, from the Value Programme definition of the **`Order Inaccuracy`** metric: "the percentage of orders resulting in a customer claim for one or more of **Missing Items, Incorrect Order, Cooked Incorrectly or Dietary Requirements not met**".

For Marketplace+ partners, an additional metric: **`Missing/Late orders:` "the percentage of orders reported missing or late by customers."**

**`Cooked Incorrectly` and `Dietary Requirements not met` are the two that no other product in this batch names.** Uber Eats has `Food quality` (taste/integrity); nobody else has a claim reason for a dietary requirement being missed. Given that the allergy question set in T5 asks "Did you have access to the allergy information before checkout?", Deliveroo is tracking dietary failure as a distinct, countable, merchant-scored event.

Note these four labels come from a **merchant metric definition**, not from the customer's picker. The customer-facing issue menu is in-app and was not reachable.

### The cancellation taxonomy — eight named scenarios

`[observed]`, from the Cancellations Policy, "Last Updated and Effective from 30th September 2025". Verbatim scenario headings:

1. `The Partner cancels the order`
2. `The Partner hands the order to the wrong rider and cancels the order rather than opting to remake`
3. `Deliveroo cancels the order because the partner closed too early`
4. `Deliveroo cancels the order because they were unable to fulfill the delivery` — "Deliveroo may cancel an order if, for example, it is unable to find a rider to deliver the items."
5. `The customer cancels the order before it was accepted by the Partner`
6. `The customer requests a cancellation, and the Partner agrees`
7. `Customer cancels as the order is running over 15 minutes late *and* there is no rider currently assigned to the order`
8. `Customer cancels as the order is running over 60 minutes late`

**Every scenario names its agent in the heading.** `The Partner cancels` / `Deliveroo cancels` / `The customer cancels`. Compare DoorDash's `Why was my order cancelled?` (passive, agent unnamed) and Uber Eats' `orders.failure`. Deliveroo's cancellation policy is the only document in this batch where **Deliveroo is the grammatical subject of its own failures**, twice.

Scenario 2 is extraordinarily specific — a partner handing food to the wrong rider and choosing to cancel rather than remake. That is a real operational event with a real cost allocation, named in a heading.

Note `fulfill` (US) in scenarios 3 and 4 against British spellings elsewhere on the same page.

### Every literally-stated time window

`[observed]` — quoted only where a number actually appears.

| Rule | Verbatim | Audience |
|---|---|---|
| Late-cancel right, 15 min | "a customer can cancel an order if it is 15 minutes late, calculated from the top estimated delivery time provided during order placement… Cancellation is only possible if a rider has not yet been assigned" | Customer |
| Late-cancel right, 60 min | "a customer can cancel an order if it is running 60 minutes late… cancellation is permitted even if a rider has been assigned" | Customer |
| Freshness Promise refund | "you can request a refund or credit on the Deliveroo app or website **within 48 hours** of your order" | Customer |
| Plus cooling-off | "You can request a full refund within the first **14 days** of your paid period." + **"This does not affect your legal rights."** | Customer |
| Plus Diamond On-Time Promise | "if an order is more than **15 minutes** late, you can claim credit for your order value, **up to £100** on restaurant orders and **£5** on orders from grocery and retail"; "claim your credit **within 30 days**"; "you have **three months** to redeem"; "Fraud checks may take up to **five business days**" | Customer |
| Cancelled-charge clearing | "it can take a few days for the transaction to disappear… If you still see the transaction after **three working days**, please contact us via Order Help." | Customer |
| Refund visibility | "processed within **eight hours**, your payment will show as voided… The transaction should appear on your bank statement within **72 hours**." | Customer |
| Merchant cancellation dispute | "you will be able to dispute these charges **up to 4 weeks** after the invoice statement date. Any disputes after these 4 weeks will be instantly rejected." | Merchant |
| Merchant refund dispute | "log into Hub **within 7 days** of our refund email notification." | Merchant |
| Merchant returns email | "must be responded to **within 48 hours** of receipt of the email." Consequence: "Any emails which are not responded to within this timeframe will result in the customer being refunded and you will continue to bear the cost." | Merchant |
| Accessibility reports | "We aim to acknowledge accessibility reports within **14 working days**" | All |

**The 15/60-minute cancellation right is the best-written window in this batch.** It is two-tier, and the tiers are separated by *whether a rider has been assigned* — the same variable that governs everything else. At 15 minutes you may cancel only if no rider is on it; at 60 minutes you may cancel regardless. Both come with worked examples ("6:30 PM order, 7:00–7:15 PM window → considered 15 minutes late at 7.30 PM", "60 minutes late at 8:15 PM"). Two thresholds, one variable, two worked sums.

**There is no publicly stated general customer refund window for missing or wrong items.** The 48 hours applies only to the Freshness Promise on selected grocery items. Do not generalise it.

### Refund mechanics — a genuinely rare disclosure

`[observed]`, verbatim: "Our refunds reflect the ratio of Deliveroo credit to card payment that is used to place your order. For example, if 50% of an order was paid by credit, then 50% of any refund on that order will return to your Deliveroo account as credit."

**A proportional-refund rule, stated as a rule and then shown as a worked percentage.** This is the question every credit-carrying wallet product fails to answer, and Deliveroo answers it in two sentences.

### Failure-prevention copy aimed at merchants `[observed]`

"Put a checklist with common missing items at the dispatch area, **for example drinks**." and "You should ensure that you pack your orders in a dedicated area, securely seal the bags, write the number of individual order items on the bag."

Drinks again — the same item Uber Eats names in its courier verification step. Two independent products converged on naming the same physical object as the commonest failure.

**A duplication worth flagging:** the identical remedy copy appears in one policy under the heading `Minimising missing items` and in another under `Minimising inaccurate orders`. Same sentences, two labels.

Merchant target stated literally: `(4) Px fault Cancellations: Cancel fewer than 4.5% of the orders you receive`.

## T8 Empty states

`[absent]` — no empty-state string was reachable. The customer basket, search results and order history are all behind login.

## T9 Notifications & system messages

`[observed]`

**Customer:** post-delivery tip push ("we'll send them a push notification after you deliver the order letting them know they can tip you through the app") · the rider-sent `'leaving soon'` alert · Multi Partner unavailability ("If an item becomes unavailable from one store, only that store's order will be affected. We will notify you in app.") · the top-up order timer · Plus switch confirmations ("You'll see a confirmation message at the bottom of the screen"; upgrade and downgrade get **different** confirmation messages) · On-Time Promise outcome ("You'll be notified of the outcome of your claim in the Deliveroo website and/or app.") · Credit Back email.

**Rider:** tip-received push ("we'll send you a push notification so you know when your great service has stood out") · order-ready push · scan feedback ("If the Rider scans the wrong ID, they will receive feedback to try again.")

**Merchant:** `Open Reminder` · `'Are you still there?' Nudge` · a daily refund email ("We will send an email to you if there have been any refunds you are responsible for on the day they are processed") **with the caveat "we are no longer monitoring responses to the daily refund email notification"** · Value Score notification ("Deliveroo will notify you of the resulting Value Score for your site on or around the 5th calendar day of the following month via Restaurant Hub, email or otherwise via the platform.")

That merchant caveat is worth recording: Deliveroo ships a notification and simultaneously documents that replying to it goes nowhere. Honest, and a notification-design smell.

**Payment-failure behaviour**, stated twice (duplicated in the FAQ) `[observed]`: "If we encounter any issues trying to take payment for your Deliveroo Plus subscription, we'll attempt to take payment from one of the back-up cards on your account."

## T10 Disclosures, legal & compliance — fee itemisation

### Exactly four customer fees, and Deliveroo says so

`[observed]`, verbatim: "you will generally see **up to four types of fees**: a delivery fee, an extended delivery fee, a service fee, and a small order fee."

**Stating the cardinality before the list is the move.** "Up to four types" bounds the customer's expectation before a single fee is named. No other product in this batch tells you how many fees exist.

| Fee | Explanation (key phrases verbatim) |
|---|---|
| `delivery fee` | "based on your location and will vary depending on your distance from the restaurant. Some parters use their own delivery drivers. In that case, the partner sets its own delivery fee." (sic — "parters" typo live) |
| `extended delivery fee` | "when you place an order with a partner that's further away from your address. These long distance orders aren't eligible for free delivery as **our riders need to go the extra mile** to get them to you" |
| `service fee` | "Collecting this fee allows us to develop new app features, increase our selection of restaurants, and provide you with 24-hour customer support." |
| `small order fee` | "will only be applied to your basket if the total is less than the restaurant's minimum spend… **You can remove this fee by adding more items to your basket** to meet the minimum order value." |

Three observations. **The `extended delivery fee` justification uses a pun** — "go the extra mile" in a fee disclosure about distance. **The `service fee` is justified by reinvestment**, naming three specific things it buys, which is a stronger move than DoorDash's `These fees go to DoorDash.` but less blunt. And **the `small order fee` is the only fee in this entire batch with an explicit escape route written into its explanation** — Deliveroo tells the customer how to make the fee go away, in the sentence that introduces it.

**The transparency promise is repeated three times, in three different wordings** `[observed]`:
- "Any **feeds** will be clearly listed alongside your total order price before you check out, so you always know exactly what you're paying." (sic — "feeds" typo live in the fees section)
- "We're committed to ensuring that all fees are clearly listed at **checkout** before you confirm your payment"
- "Any fees for your order are clearly listed at **check-out** before you confirm your payment"

Three spellings of the same moment — `check out`, `checkout`, `check-out` — and a typo in the first. A promise of clarity, stated three times inconsistently.

**The disclosure affordance is named** `[observed]`: "You can also get additional information by clicking on the **'i' symbol** when you're at checkout."

### Deliveroo Plus

`[observed]`. Tiers: `Plus Silver` · `Plus Gold` · `Plus Diamond`.

- `Plus Gold` — "£4.99/month"; `Free delivery` "over £10.00 at restaurants and £15.00 at shops"; `Save up to 60% on service fees`; `Exclusive offers and rewards`
- `Plus Silver` — "Only available through partners"; `Free delivery` "over £15.00 at restaurants and £25.00 at shops"
- Sub-features: `Priority Delivery` ("guarantees that your rider will deliver your order to you before delivering any other Deliveroo orders on their route") · `On-Time Promise` · `Credit Back` · `Plus Rewards` · `Premium Care`

Surviving-fee disclosure, verbatim: **"Orders placed with Plus will be subject to service fees, and small order fees if applicable."** A subscription page that names what the subscription does *not* cover.

**A real pricing inconsistency** `[observed]`: the `/plus` page says Plus Gold is "£4.99/month"; the FAQ says "either £4.99 per month or £49.90 per year" in one place and "either £4.99/month (not available as an annual plan) or £7.99 per month/£79.90 per year" in another. **Three different price statements for one tier across two pages.** Plus a shops/stores wobble inside a single card ("at restaurants and £15.00 at shops" vs "at restaurants and £15.00 at stores").

`Priority Delivery` is worth flagging as a content-ethics artefact: it "guarantees that your rider will deliver your order to you before delivering any other Deliveroo orders on their route" — a paid benefit whose mechanism is explicitly reordering other customers' food. Stated plainly rather than hidden.

### UK-specific regulatory copy `[observed]`

- Consumer-rights saver: **`This does not affect your legal rights.`**
- Statutory-rights saver, merchant policy: "Nothing in this policy limits any rights a customer may have under applicable consumer protection laws, including in relation to faulty, misdescribed or unsatisfactory quality items."
- Change-of-mind right with carve-outs: "This right does not usually apply to certain items, including **perishable goods, personalised goods, or sealed hygiene/health items once unsealed**."
- **Klarna FCA-style credit warning**, verbatim: "Borrowing more than you can afford or paying late may negatively impact your financial status and ability to obtain credit. Subject to status. Ts&Cs and late fees apply."
- Promotional small print: `Subject to availability. Participating restaurants only. Service/delivery fees apply. T&Cs`
- Age verification, Challenge-25 style: "we may ask for a customer's date of birth if an age restricted item is added to their basket… In some cases, all customers will be asked and in others, only customers who appear to be under the age of 25." With a privacy assurance: **"Scanning is only done to read your date of birth and no image of your ID is captured or retained."**
- CBD disclosure: five "not suitable for" bullets plus "The UK Food Standards Agency recommends that healthy adults should consume no more than 70mg of CBD per day."
- Legal entity, italicised on the contact page: `Registered Office: Roofoods Limited 1 Cousin Lane London EC4R 3TE`

**The ID-scanning privacy assurance is the pattern to steal** — a one-sentence statement of what the scan reads and what it does not retain, placed inside the flow that asks for the ID rather than in a privacy policy.

## T11 Tipping

`[observed]` — rider-side only; the customer tip UI is in basket/checkout and post-delivery push.

- "Yes, customers can either tip you when they place their order, or after you've delivered it."
- "If the customer didn't tip you when they placed their order, we'll send them a push notification after you deliver the order letting them know they can tip you through the app."
- **"Customers can either tip a fixed amount, or a percentage of the total cost of their order - that's why sometimes you'll see unusual, non-rounded amounts (like £2.47)."**
- **"You keep 100% of the amount the customer tips you."** (bold in source)
- "If more than one rider helps complete an order… the customer's tip will be automatically split between all the riders who completed the order."

**That third bullet is the best piece of tipping copy in this batch.** It explains an anomaly the rider will notice (a tip of £2.47) by naming its cause (percentage-based tipping), pre-empting a suspicion that would otherwise become a support ticket. Explaining the *odd-looking number* rather than the *policy* is the move.

Two further rider articles exist and were not opened: `Can customers still tip me before I've delivered their order?` and **`Should I ask the customer to tip me when I deliver their order?`** — the existence of the second title implies a published policy on riders soliciting tips.

**No default tip value, default percentage, pre-selection behaviour, or tip-prompt wording was observed.** `[absent]`

## T12 FAQs

The customer FAQ is a **single flat page** with 14 anchors, no article granularity, no per-article URLs, no search, and no feedback widget. Question sub-headings are bold sentence-case. Verbatim selection `[observed]`:

`Where is my order?` · `What fees do you charge?` · `How do I check the status of my refund?` · `Why do I still see a charge for a cancelled order?` · `What is Klarna?` · `How do I invite my friends to use Deliveroo?` · **`What is the weight the partner actually gives me is less than what I ordered?`** (sic — should read "What if")

*Answers summarised:* order status via the Order Tracker, with a degraded-tracking caveat for partner-delivered orders; four fee types with a transparency promise; refund status via Order Help with bank-timing expectations; cancelled-order charges clear in about three working days; Klarna explained with an FCA-style warning; referrals via a code; variable-weight shortfalls refunded as the difference.

**`Where is my order?` as a customer FAQ heading** is the same instinct as Wise's `Where is my money?` as a support category — the user's anxious question used as the label. Deliveroo puts it inside a category called `My order`, so the possessive appears twice in the path.

**Merchant help articles use a different grammar** `[observed]`: `What are cancelled orders and how can I avoid them?` · `How do I know if my restaurant is rejecting orders?` · `How do I avoid rejecting orders?` · `What is Spoiled Food and how can I avoid it?` · `What is Rider Receipt Scanning and how does it work?` · `When can I request an additional rider for a large order?`

The recurring shape is **`What is X and how can I avoid it?`** — definition plus prevention in one title. Three of the six titles contain "avoid". The merchant's help centre is a risk-mitigation manual.

**Rider article titles are long narrative scenarios** `[observed]`: **`I arrived at the customer on time, but they didn't come to the door for 10 minutes. What should I do?`** · `Should I un-assign myself from the order if I don't think I can get to the customer in time?` · `If I don't arrive when the app tells me to, will I be offered fewer orders?` · `A customer doesn't have ID for an order containing alcohol. What should I do?` · **`My phone doesn't have NFC enabled so I can't check in at the restaurant.`** (no question mark) · `If there's an emergency while I'm on an order, what should I do?`

**These read like a rider's own account of a problem, with the circumstances included.** "I arrived at the customer on time, but they didn't come to the door for 10 minutes" carries a defensive clause ("on time") that the rider would themselves supply. It is the first-person-confession pattern from the Wise exemplar, extended into full narrative — and applied to a *worker*, not a customer, which is where it is hardest to get right and most valuable.

## T13 Terminology & glossary

No published glossary. Terms harvested from usage `[observed]`.

| Term | Deliveroo's usage | The alternative it rejects |
|---|---|---|
| `rider` | **Never "driver" or "courier"** for Deliveroo's own workers. Exception: SEO copy on the apply page reaches for search terms — "the perfect, flexible alternative to traditional part-time **delivery driver** jobs, **courier** roles, temporary work or seasonal gigs" | `driver`, `courier` |
| `delivery drivers` | Reserved for **Marketplace+ merchants' own staff**: "Some parters use their own delivery drivers" — the distinction is maintained | |
| `customer` | Used on all three surfaces, including rider- and merchant-facing copy. "consumers" appears only in a corporate mission sentence | `user`, `consumer` |
| `partner` / `Partner` | The merchant. Capitalised in legal policy, lower-case in marketing | `restaurant` (used customer-side), `merchant` |
| `site` | The merchant's physical location, and the unit of account in the Value Programme ("sites must receive at least 20 Orders in a month") | `store`, `branch`, `location` |
| `fees` | Used for **both** what the customer pays and what the rider earns. Riders are never paid "wages", "pay" or "salary" — always `fees` | `pay`, `wages`, `earnings` (though `earnings goals` appears) |
| `commission` | What the merchant is charged | |
| `return order` | The rider's undeliverable terminal state, with an extra fee attached | `failed delivery`, `undeliverable` |
| `prep time` | "our term for how long it takes restaurants to get an order ready" — **self-flagged coinage** | |
| `Marketplace+` / `Marketplace +` / `M+` | **Three renderings live simultaneously** (policies / footer nav / help sub-collection) | |
| `Order Inaccuracy` | The merchant metric covering all four claim reasons | `error rate` |
| `Deliveroo HOP` / `Deliveroo Hop` / `HOP` | **Cased three ways on one page** | |
| `Partner Hub` / `Restaurant Hub` / `Hub` | **Three names for one product, all live** | |
| Coined | `Deliveroo Plus` (`Silver`/`Gold`/`Diamond`) · `Editions` · `Deliveroo Express` · `Deliveroo for Work` · `Deliveroo Students` · `Deliveroo's Choice` · `Freshness Promise` · `Full Life` · `Value Programme` / `Value Score` · `Order Manager` · `Menu Manager` · `Rider Check-in` · `Receipt Scanning` · `Fleet Switching` · `Multi-Site Stacking` · `Multi Partner Shopping` · `top-up orders` · `Variable Weight Orders` · `Busy mode` · `Open Reminder` · `Spoiled Food` · `stacked order` · `Respect Charter` · `Kit Store` · `cash out` · `challenges` · `fee boosts` | |

`Deliveroo's Choice` carries a published methodology `[observed]`: "great service", "4.5 stars or higher on the past 400 orders", "Prices matched to those in-store on up to 20 of the most popular items", and critically **"Partners can't pay to be featured on this list."** A badge that publishes both its criteria and its non-purchasability.

`Value Score` uses a five-point named scale `[observed]`: **`Action, Improve, Okay, Good or Great`**. Note the bottom rung is `Action` — a noun that is an instruction, not a grade.

## T14 Voice, tone & accessibility

### The three-sided-marketplace sentence — the single best artefact in this file

`[observed]`. The same sentence, repointed per audience.

> **Merchant help:** "Cancelled orders have an impact on all three sides of our marketplace - you may have already prepared the order, we may have already sent a rider, and the customer may have already laid the table."
>
> **Policy version:** "**Partners** may have already prepared the order, **Deliveroo** may have already sent a rider, and the **customer** may have already laid the table."

One sentence, two renderings, with the second person swapped for a named party depending on who is reading. And **"the customer may have already laid the table"** is a concrete domestic image doing the emotional work that no abstraction could. It is the clearest single demonstration of multi-audience content strategy in this batch.

### Register by audience

**Customer:** warm, contraction-heavy, food-punning. `Savour the savings`, `tasty benefits`, `Need a midweek pick-me-up?`, `Run out of milk for your morning cereal?`. Full stops on fragments throughout. **HOP is a further jump again** — `BOOM.`, `Bliss!`, `Job done.`, `Just like magic ✨`.

**Rider:** direct, second-person, procedural, safety-forward, explicitly reassuring about money. `You keep 100% of the amount the customer tips you.` `We're always here for you.` Numbered how-to lists throughout.

**Merchant:** shifts from marketing second person (`Grow your business`) to quasi-legal third person in policies (`The Partner bears responsibility and will not receive payment for the order`). The merchant surface is the only one that discusses money moving *away* from the reader, and it does so with an explicit fairness frame `[observed]`: **"We believe it's only fair to ask those at fault to cover the costs of cancelled orders. When we're at fault, we'll cover the cost, and when you're at fault, we'll ask you to cover it."**

That sentence is the honest counterpart to Uber Eats' `order error adjustments`. Same economics, stated as a reciprocal rule with Deliveroo included in it.

### Community Guidelines in three parallel versions

`[observed]`. Cross-linked from the customer FAQ: a customer version (three rules — **`Be respectful`**, **`Be prompt`**, **`Be honest`**), a rider version at `riders.deliveroo.co.uk/en/news/community`, and a partner version at `help.deliveroo.com/en/articles/4057576`. Plus the rider-only `Respect Charter` in the rider nav.

Three-word imperative rules, one document per audience, cross-linked. Riders are called **"the heart of Deliveroo"** in the *customer-facing* guidelines — the platform advocating for one audience inside another audience's document.

### Cross-audience routing on one page

`[observed]`. `deliveroo.co.uk/contact` splits into exactly three sections — `Customers` · `Riders and Applicants` · `Partners` — each with a different channel (in-app Order Help / rider support link / "the 'Help' section of your hub portal"). `Applicants` is treated as a distinct quasi-audience, with its own help topic (`Applicant events`).

### British English — mostly

Confirmed en-GB `[observed]`: `neighbourhood`, `personalised`, `minimise`/`Minimising`, `prioritising`, `Centre` (`Help Centre`, `Learning Centre`), `colour`, `cancelled`/`cancelling` (double-L), `labelling`, `licence` (noun), `programme`.

**en-GB defects, all live** `[observed]`:
- `fulfill` (US) in two Cancellations Policy headings against `fulfilled` in the same document's body
- `program` / `ongoing improvement program` (US) in the Accessibility Statement against `Value Programme` (UK) in the merchant policy
- `driving license` (US) in the customer FAQ age-verification list, against `licence` used correctly on the rider requirements list
- `canceled` (single-L) once in the Cancellations Policy

**Production typos** `[observed]`: "Some **parters** use their own delivery drivers" · "Any **feeds** will be clearly listed" · "they may not be complete the delivery of age restricted items" · "**What** is the weight the partner actually gives me is less than what I ordered?" · "API integrated **parter**"

### Accessibility — the best statement in this batch

`[observed]`, at `deliveroo.co.uk/accessibility-statement`, dated `Last reviewed and updated: June 2026`.

- **Scope named precisely:** "the Deliveroo websites and the Deliveroo apps for iOS and Android, including browsing, account management, ordering and checkout, order tracking, and customer support."
- **Standard:** "We aim to meet EN 301 549 V3.2.1… which incorporates WCAG 2.1 Level AA. We are also using **WCAG 2.2 Level AA as a practical benchmark**".
- **Conformance admitted honestly:** "Our website and apps are **partially conformant** with WCAG 2.1 Level AA. This means most of the service meets the standard, but some parts do not yet fully conform."
- **Third-party auditor named:** "we instructed independent accessibility audits of our mobile applications from **TetraLogical**".
- **Fixed-issue list names the ordering flow:** keyboard navigation and screen-reader labelling on "the home feed (e.g. carousel titles, tile information), store page, basket and checkout". Deliveroo is publicly confirming its checkout had AT-blocking defects.
- **AT support listed:** `VoiceOver (iOS and macOS)` · `TalkBack (Android)` · `NVDA and JAWS (Windows screen readers)` · `Your browser and device zoom and text-size settings`
- **Authentication accessibility — a strong, reusable pattern:** "Because more than one method is always available, users are never required to depend on a single approach that relies on a particular sensory or cognitive ability." Methods named: email+password, "a one-time passcode sent by SMS or a secure 'magic link' sent by email", social sign-in, device biometrics.
- **Human-fallback commitment:** "If an accessibility barrier prevents you from completing something, such as placing or changing an order, **we will help you complete it another way**." Channel: `accessibility@deliveroo.co.uk`. SLA: 14 working days.
- **Social model stated:** "We recognise that disability arises when products, services and environments create barriers."
- **Legal basis named:** "the European Accessibility Act (Directive (EU) 2019/882)… and the Equality Act 2010 in the UK", plus the EHRC draft Code of Practice. Enforcement route named: EHRC, County Court, Sheriff Court.

**`partially conformant` is the word.** Deliveroo is the only product in this batch that declines to claim full conformance, names its auditor, lists what was broken, and commits to completing the task by another route when the product fails. Uber claims 2.1 AA, DoorDash claims 2.2 AA, Sephora claims 2.0 AA — Deliveroo claims *partial* 2.1 AA and is almost certainly the most accurate of the four.

**Caveat, recorded honestly:** parts of the statement read as boilerplate from an older document — "disabled users can vary the text size by using your browser's text resize option (usually View > Text size)" (person-switch mid-sentence, and a menu path that no longer exists) and "The use of JavaScript has been kept to a minimum" on a Next.js app whose own `/legal` page returned zero text without JS. An excellent statement with a stale section.

**Accessibility content syndicated into rider operations** `[observed]` — the same three-sentence block appears verbatim in at least two rider articles:

> "Everyone should be able to use Deliveroo easily. Before you arrive, please check the customer's delivery notes and follow any instructions they have shared. Some customers may need extra support and may not be able to come to the door, for example because they have a mobility need, hearing impairment or other accessibility requirement. Taking a moment to read and follow their notes can make a real difference."

**Customer-need copy embedded in worker operational guidance.** This is a genuine multi-audience accessibility content pattern and almost nobody does it: the accessibility commitment reaches the person standing at the door.

**Markup findings** `[observed]`: the customer homepage skip link is `Skip to:` → **`Footer`** (it skips *to the footer*, which is unusual and arguably wrong); `help.deliveroo.com` uses `Skip to main content` → `#main-content`; **the rider surface showed no skip link at all**.

Alt text is uneven. Good on the rider surface: `An image of Deliveroo riders`, `a jar of coins icon`, `a chart with an upward trend icon`, `a rider kit icon`, `Deliveroo rider chat support`. Poor on the merchant site: `featured logo`, `column` (×2), `arrow` (×3, on category cards for Restaurants/Grocers/Retailers), and **`partner icon` ten times for ten different named brand logos** — Dishoom, Waitrose, Boots and Asda are all indistinguishable to a screen reader. The rider apply page emits empty alt alongside populated alt in a triple-render pattern that would read duplicated to AT. HOP body copy carries a bare emoji mid-sentence (`Just like magic ✨`) with no text alternative.

Positive: the merchant help feedback widget labels its emoji options in text — `Disappointed Reaction😞` · `Neutral Reaction😐` · `Smiley Reaction😃`.

**Other live defects** `[observed]`

1. `Download Deliveroo in the App Store` used for the Google Play button on five of six pages.
2. `Get started` used four times on the homepage for four different destinations.
3. Three price statements for Plus Gold across two pages.
4. `Log in for recent addresses` vs `Log in for your recent addresses.`
5. `Marketplace+` / `Marketplace +` / `M+`; `Partner Hub` / `Restaurant Hub` / `Hub`; `Deliveroo HOP` / `Deliveroo Hop` / `HOP`.
6. Duplicate rider article: `What is a stacked order?` listed twice with two URLs (`/what-is-a-stacked-order` and `/what-is-a-stacked-order1`).
7. `Understand the 'Are you still there?' Nudge` vs `What is the 'Are you still there'? nudge` — misplaced question mark, casing drift.
8. `© 2026 Deliveroo` on customer and rider surfaces; `© 2025 Deliveroo` on the merchant site.
9. The customer footer `Investors` link points to **ir.doordash.com** — corporate ownership visible in consumer IA.
10. `help.deliveroo.com` brands itself generically ("Help Centre", "Advice and answers from the Deliveroo Team") but is **merchant-only**. A customer landing there finds nothing for them.

---

## Transferable patterns

1. **Write one sentence and repoint it per audience.** "Partners may have already prepared the order, Deliveroo may have already sent a rider, and the customer may have already laid the table." Swap the second person for the named party. One editorial artefact, three audiences, no duplication drift.
2. **Give the fee an escape route in the sentence that introduces it.** "You can remove this fee by adding more items to your basket to meet the minimum order value." The only fee in this batch whose explanation tells the user how to avoid it.
3. **State the cardinality before the list.** "you will generally see up to four types of fees" bounds the anxiety before the first name lands.
4. **Ship a conditional in-app string before the failure happens.** `Return if required`, under the customer's address, on the rider's order card. Pre-arming beats recovering.
5. **Name the agent in every failure heading.** `The Partner cancels the order` / `Deliveroo cancels the order because they were unable to fulfill the delivery` / `The customer cancels…`. Deliveroo is the subject of its own failures twice; nobody else in this batch does that.
6. **Explain the odd-looking number, not the policy.** "that's why sometimes you'll see unusual, non-rounded amounts (like £2.47)". Pre-empting the specific confusion beats restating the rule.
7. **Two-tier a cancellation right on the one variable that matters, and show both sums.** 15 minutes if no rider assigned, 60 minutes regardless, each with a worked example.
8. **Publish the proportional-refund rule with a worked percentage.** "if 50% of an order was paid by credit, then 50% of any refund… will return to your Deliveroo account as credit."
9. **Admit partial conformance, name the auditor, list what was broken, and promise a human fallback.** `partially conformant` plus "we will help you complete it another way" is a more credible accessibility statement than any full-conformance claim in this batch.
10. **Syndicate accessibility content into the worker's operational guidance.** The three-sentence delivery-notes block reaches the person at the door, which is where the accessibility commitment either holds or fails.
11. **Negative pattern: a flat FAQ page is not a help centre.** The customer gets one page with 14 anchors, no search, and no article URLs, while the merchant gets a 209-article Intercom instance. The audience with the most users has the least infrastructure.
12. **Negative pattern: audit your app-store button labels.** `Download Deliveroo in the App Store` on the Android button, on five of six pages, in link text and alt.

## Caveats & gaps

- **`deliveroo.co.uk/legal` returned a completely empty body** (client-rendered SPA). This holds the customer Terms & Conditions, Plus T&Cs, referral terms and credit terms. **All customer contractual language is absent from this harvest.**
- **No verbatim customer order-tracker state label was obtained.** The tracker requires an active order behind login. The customer state sequence in T6 is Deliveroo's own FAQ prose describing the tracker, not the tracker's chips. Do not treat "confirmed → preparing → picked up → on their way" as UI strings.
- **The customer issue-reason picker was not observed.** The four claim reasons (`Missing Items`, `Incorrect Order`, `Cooked Incorrectly`, `Dietary Requirements not met`) come from a *merchant metric definition*, not from the customer's menu. They may or may not be the customer-facing labels.
- **No general customer refund window for missing or wrong items is published.** Only the 48-hour Freshness Promise window (selected grocery items) and the 14-day Plus cooling-off. Do not generalise.
- **No tip default, default percentage, pre-selection behaviour, or tip-prompt wording was observed.**
- **Basket, checkout, the fee-breakdown UI, the `'i' symbol` explainer and the tip selector are all behind login.** No T5 checkout field labels.
- **`Roobox` was not found on any page fetched** — do not assume it is live.
- **No published content-design documentation or terminology rationale was located.** `deliveroo.design` is linked from the footer but was not fetched; it is the likeliest route to rejected-alternative evidence.
- Both task-supplied non-customer URLs were legacy hostnames: `riders.deliveroo.co.uk` → `rider.deliveroo.co.uk`, `restaurants.deliveroo.com` → `merchants.deliveroo.com`. Partner help is `help.deliveroo.com/en/`, **not** a `restaurants.deliveroo.com` path.
- Not fetched, available for a second pass: `merchants.deliveroo.com/what-we-offer/editions` and `/deliveroo-express`; the rider and partner Community Guidelines (which would complete the three-way parallel-document comparison in T14); the two remaining rider tipping articles; `help.deliveroo.com/en/collections/1873159-contact-us`.
- No bot-check, CAPTCHA or 403 was encountered anywhere. The single blocked URL was a client-rendering failure, not a defence.

## Sources

1. https://deliveroo.co.uk/
2. https://deliveroo.co.uk/faq
3. https://deliveroo.co.uk/plus
4. https://deliveroo.co.uk/deliveroo-hop
5. https://deliveroo.co.uk/accessibility-statement
6. https://deliveroo.co.uk/contact
7. https://help.deliveroo.com/en/
8. https://help.deliveroo.com/en/collections/2612285-managing-live-orders-and-deliveries
9. https://help.deliveroo.com/en/articles/8871153-what-are-cancelled-orders-and-how-can-i-avoid-them
10. https://help.deliveroo.com/en/articles/2152581-how-do-prep-times-work
11. https://help.deliveroo.com/en/articles/7048177-what-are-the-order-ready-need-more-time-buttons-and-how-do-they-work
12. https://help.deliveroo.com/en/articles/8663042-what-is-rider-receipt-scanning-and-how-does-it-work
13. https://merchants.deliveroo.com/ (via https://restaurants.deliveroo.com/)
14. https://merchants.deliveroo.com/legal/policies
15. https://rider.deliveroo.co.uk/ (via https://riders.deliveroo.co.uk/)
16. https://rider.deliveroo.co.uk/support
17. https://rider.deliveroo.co.uk/support/orders
18. https://rider.deliveroo.co.uk/support/money
19. https://rider.deliveroo.co.uk/support/orders/getting-to-the-customer11
20. https://rider.deliveroo.co.uk/support/orders/can-customers-tip-me
21. https://rider.deliveroo.co.uk/support/orders/what-is-a-return-order
22. https://rider.deliveroo.co.uk/apply
23. https://deliveroo.co.uk/legal — **blocked, empty body**
