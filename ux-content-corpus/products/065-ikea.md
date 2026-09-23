# 065. IKEA

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Furniture retail (omnichannel) — large-format store network + e-commerce + assembly/installation services |
| Primary URL | https://www.ikea.com/ (US market: `https://www.ikea.com/us/en/`) |
| Corpus rank | 065 |
| Benchmark strength (source list) | Inventory, fulfillment, product information |
| Locale / market observed | en-US (`ENUSEnglish`, USD, continental-US-only delivery) |
| Platform observed | Web — customer service hub, FAQ, order tracking, returns, warranties, product support, accessibility |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Consumer retail. Visible regimes: **state mattress-recycling laws** (CA, CT, OR, RI — recycling fee and free removal mandated by state), **CPSC-style product recalls** (dedicated recall page + children's product registration), **CPAI-84 flammability requirements** (cited for children's tents), **WCAG 2.0 A/AA** (accessibility statement), California Notice at Collection, state privacy law. Warranty text carries the US-specific carve-out "some states do not allow the limitation or exclusion of incidental or consequential damage". |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Full for T6 (order status), T10 (warranty), T12 (139-question FAQ) and T13. Partial for T3/T5/T8 — no product detail page, cart or checkout was harvested, so the inventory-badge strings that are IKEA's stated benchmark strength are `[documented]` from the FAQ rather than observed on a listing. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Customer service (hub) | https://www.ikea.com/us/en/customer-service/ | 8-item service nav, 3 surfaced Q&As, footer IA |
| **Track and manage your order** | https://www.ikea.com/us/en/customer-service/track-manage-order/ | **The five named order states, verbatim** |
| Return policy | https://www.ikea.com/us/en/customer-service/returns-claims/ | 365/180/90-day windows, exclusions |
| Missing and damaged orders | https://www.ikea.com/us/en/customer-service/returns-claims/troubleshooting/ | Two-route recovery, 100 words total |
| **Frequently asked questions** | https://www.ikea.com/us/en/customer-service/faq/ | **139 questions, 22 sub-sections** |
| Shipping and Delivery service | https://www.ikea.com/us/en/customer-service/services/delivery/ | Four named delivery tiers, price ladders, 7-question FAQ |
| IKEA product support | https://www.ikea.com/us/en/customer-service/product-support/ | Product-family support IA |
| Product stock availability | https://www.ikea.com/us/en/customer-service/stock-availability/ | Three how-to blocks, back-in-stock alerts |
| Limited warranties | https://www.ikea.com/us/en/customer-service/returns-claims/guarantee/ | 6 room categories, warranty durations 2–25 years + lifetime |
| Website accessibility | https://www.ikea.com/us/en/customer-service/accessibility/ | **Three sentences total** |

---

## T1 Navigation & IA labels

**Global nav — five items, and none of them is "Shop"** `[observed]`

`Products` · `Rooms` · `Deals` · `Design & ideas` · `Services`

Two taxonomies in parallel (`Products` = object tree, `Rooms` = space tree), one commercial (`Deals`), one editorial (`Design & ideas`), one operational (`Services`). `Rooms` as a peer of `Products` is the physical-store floorplan reproduced in the nav — IKEA sells by room in the building and by room on the site.

Utility strip `[observed]`: `Skip to main content` · `Accessibility` · `ENUSEnglish` · **`Enter ZIP code`** · **`Select store`** · `Search` · `Hej! Log in or sign up` · `Favorites` · `Shopping bag`

Three findings. (1) **`Enter ZIP code` and `Select store` are in the global header on every page**, before login — location is a prerequisite, not a preference, because stock and delivery price both depend on it. (2) **`Accessibility` is the second link in the DOM**, immediately after the skip link and before the language switcher. (3) **`Hej!`** — Swedish greeting in the US login prompt, the only piece of brand-language leakage in the navigation.

`Favorites` (not "wishlist") and `Shopping bag` (not "cart") — both are deliberate non-American choices in an en-US locale.

**Customer service sub-nav — eight items, mixing task and object** `[observed]`

`Track & Manage My Order` · `Services` · `Product information` · `How to shop at IKEA` · `Expert shopping assistance` · `FAQ` · `Privacy & Security` · `IKEA apps`

`Track & Manage My Order` is first, uses an ampersand, and is the only item in **first-person possessive** (`My Order`). Everything else is neutral. The one thing an anxious customer wants is the one label written from inside their head.

`How to shop at IKEA` is the outlier worth recording: a retailer publishing an instruction manual for the act of shopping in its own stores. It exists because the IKEA store is a directed one-way route with a self-serve warehouse at the end — a genuinely unfamiliar retail interaction that needs documentation.

**Footer — four columns** `[observed]`

| Column | Items |
|---|---|
| `Help` | `Customer service` · `FAQ` · **`My orders`** · `Contact Us` · `Product Recalls` · `Return Policy` · `Warranties` · `Feedback` |
| `Shop & Learn` | `Find a Location` · `IKEA Services` · `IKEA Family` · `IKEA for Business` · `IKEA Planning Tools` · `IKEA Brochures` · `Buying guides` · `Payment options` · `Gift Cards` · `IKEA Credit Card Management` · `IKEA Credit Cards` · `Cash App Afterpay` · `Explore the New IKEA App` |
| `About IKEA` | `This is IKEA` · `Careers` · `Newsroom` · `Life at Home` · `IKEA Foundation` · `Safety at Home` |
| `Legal` | `Privacy & Security` · `Privacy policy` · `Terms and conditions` · `IKEA Children's Product Registration` · `Accessibility` · `IKEA SMÅLAND Privacy notice` |

**`Product Recalls` sits in the `Help` column, third from the identity-critical items** — above `Return Policy` and `Warranties`. A furniture retailer that has had a major recall treats recall information as primary help navigation rather than as a legal appendix. `Safety at Home` appears in `About IKEA`, and `IKEA Children's Product Registration` in `Legal`. Safety is threaded through three of the four footer columns.

Note the same destination has **two labels in two places**: `Track & Manage My Order` (sub-nav) vs `My orders` (footer).

**Two persistent membership prompts above the footer** `[observed]`, both with identical structure:
- `Join IKEA Family` — "Bring your ideas to life with special discounts, inspiration, and lots of good things in store. It's all free." → `See more` / `Join or log in`
- `Join IKEA Business Network` — "Enjoy a number of unique benefits to create a better life at work." → `See more` / `Join or log in`

"lots of good things in store" is a pun (retail sense + idiomatic sense) and "a better life at work" is a B2B rewrite of IKEA's actual vision statement ("a better everyday life at home"). Both are on every page.

## T2 Value proposition & headline patterns

IKEA does not run a value-proposition block on customer-service pages. The proposition appears instead as **service-page headers written as the customer's relief** `[observed]`:

> `Shipping and Delivery service`
> "IKEA delivery buys you time and energy to do what you want — like set-up your new purchase or relax and enjoy your new space without having to bring it home yourself. Whether you order a new sofa or a complete bedroom makeover, **let IKEA do the heavy lifting** with convenient and affordable delivery options."

"buys you time and energy" — the benefit is denominated in the customer's resources, not in the service's attributes. "do the heavy lifting" is a pun on furniture delivery used without comment.

**The return-policy headline is the best line on the site** `[observed]`:

> `It's OK to change your mind!`

Five words, an exclamation mark, and it is the H2 above the 365-day policy — repeated verbatim lower on the same page ("It's OK to change your mind! Learn how to return or exchange your product…"). It reframes a returns policy as **permission** rather than as a procedure or a concession. The meta description calls the same policy a "**365-day no-nonsense return policy**" and the mattress policy the "**90-day love or exchange it**" policy — two informal, memorable programme names that never appear in the page body.

**Failure framed with a shrug, then immediate commitment** `[observed]`:

> `Missing and damaged orders`
> "**Sometimes things don't go as planned.** If your order arrived incomplete, contained damaged products, or didn't even show up, we're here to help."

Three failure modes enumerated in ascending severity inside one sentence, the third given the colloquial "**didn't even show up**". The whole page is under 100 words.

**Warranty section opener** `[observed]`: "We are confident in the quality of our products and many items are covered by warranties." — the hedge (`many`, not `all`) is in the first sentence, before the list.

**Recurring section header used as a navigational refrain** `[observed]`: **`How can we help you?`** — "Want to check the status of your order? Want to know how to return a product? We can help." This identical block appears on the customer-service hub, the tracking page, the delivery page, the stock-availability page and inside the FAQ. Two questions, both the top two intents, then a three-word promise. IKEA has one help-entry block and ships it everywhere.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Track order` | Tracking page, primary | Two words, no possessive |
| `See all your orders` | Tracking page, secondary | The signed-in alternative |
| `Track and Manage` / `Track & Manage My Order` / `Track & manage my order` / `My orders` / `track your order` | **Five labels for one destination** | See T14 |
| `Learn more` (bare) | ~10 instances across hub, returns, delivery | The dominant link label — no object |
| `Read more` | Hub, FAQ teaser | Sixth variant of "go deeper" |
| `Find your store` / `Find a Location` | Store finder, two labels | |
| `Contact us` / `Contact Us` | Two capitalisations | |
| `Join IKEA Family` / `Join or log in` / `Join today for free` / `join for free` / `Join here today.` | **Five variants of the membership CTA** | |
| `See more` | Membership blocks | |
| `Shop new arrivals` / `Shop college essentials for every budget` | Header promo slot, rotating | |
| `Skip to main content` | First in DOM | |
| `Skip product categories list` | Customer-service hub | A second, page-specific skip link |
| `Clear the search input field` | Search | Accessible label exposed as text |
| `Cookie settings` | Footer | |
| `See details` / `See warranty details` / `See warranty info` | Warranty accordions — **three labels for one control on one page** | |
| `Open PDF (291.62 KB)` | Warranty downloads | **File size in the link label** |
| `notify me` / `check other IKEA stores` | Product-page stock controls | `[documented]` |
| `Order spare or missing parts` / `self service spare part portal` | Spare parts | |
| `Click to print this page.` | Gift card | |
| `Hej! Log in or sign up` | Global header | |

**Observation.** IKEA's CTA discipline is the weakest in this domain cohort. `Learn more` appears bare roughly ten times; the order-tracking destination has five labels; the membership prompt has five; the warranty accordion control has three on a single page. Against that, two things are done well:

1. **`Open PDF (291.62 KB)`** — format and weight in the link text, every time, across six warranty PDFs (`291.62 KB`, `41.08 KB`, `170.58 KB`, `169.83 KB`, `292.37 KB`, `178.3 KB`, `200.66 KB`, `171.69 KB`, `100.72 KB`, `170.36 KB`). Telling a user what they are about to download and how big it is, consistently, is good practice and rare.
2. **`Clear the search input field`** rendered as visible text — an accessible label surfaced rather than icon-only.

## T4 Onboarding & getting-started

IKEA has no account onboarding flow on the reachable surfaces. What it has instead is **shopping onboarding** — documentation of how to perform the transaction `[observed]`:

- `How to shop at IKEA` (customer-service nav item)
- `Expert shopping assistance` (customer-service nav item)
- `Planning Tools` — "Create your perfect storage and living room solutions"
- `Buying guides` — "Shop with confidence."

**The stock-availability page is an onboarding document in disguise** `[observed]` — three numbered procedures teaching the customer how to read IKEA's inventory system:

> `How to find product stock availability for online purchases`
> 1. "Add your Zip code into the "My location" to the right of the search bar."
> 2. "Then enter the product name into the search bar and hit search."
> 3. "Add it to your bag."
> 4. "**Once in checkout, you will be able to see stock availability, delivery and pick-up options.**"

> `How to find your local store product stock availability online`
> 1–2. (same ZIP + search steps)
> 3. "On the product page, you will find if the product is available in the store for purchase."
> 4. "If the product is not available at your local store, you can check other stores on the product page."

> `Get notified when it's back in stock`
> "If the product you are looking for is not available for purchase online on in-store, you can sign up to get notified when it is back in stock **via SMS or email**. You will receive the SMS or email when the product is back in stock. Simply sign up on the product page."

Step 4 of the first procedure is a significant disclosure: **online stock availability is only fully visible at checkout.** IKEA documents a friction it has not designed away — you must add to bag and reach checkout before the system tells you whether it can fulfil. The help page exists because the product does not answer the question earlier.

Note `not available for purchase online on in-store` — a typo for `or in-store`, in the sentence introducing the back-in-stock alert.

**Kitchen-service onboarding is a named five-service ladder** `[documented]`: `Measuring service` · `In-store planning (free)` · `Online planning (free)` · `Kitchen validation (online planning) (free)` · `Kitchen installation`, with a sequencing rule — "schedule your measurement appointment **at least one (1) week before** your planning appointment" — and duration promises for each ("a 2-hour appointment", "up to 2 hours with an additional 30-minute follow-up session", "a 30-minute online appointment", "up to 45 minutes", "typically require 2-3 days to complete").

## T5 Form & field labels

`[documented]` unless noted.

**Order lookup — the anonymous-access credential pair** `[observed]`:

> "Check the status of your order online. You will need **your order number as well as the email or phone number** you used to complete the order. If you used your IKEA Family login when making your purchase, you can also see all your previous orders."

Two-factor-ish lookup without an account (number + contact), plus a signed-in alternative. Both routes given equal visual weight (`Track order` / `See all your orders`).

**Named fields and controls** `[documented]`:
- `My location` — the ZIP-code field label, quoted in the stock instructions
- `alternate collector` — the named field for nominating a pickup proxy
- `Who is the gift card for` → `For Me` tab
- `Shipping Method`
- `Est. Delivery` (n/a — Etsy's label)
- `notify me` · `check other IKEA stores` — product-page stock controls
- `Few in stock` — **a quoted product-page status label**: "Products that show the status 'Few in stock'"

**Identifier formats disclosed as field constraints** `[observed]` — IKEA teaches the customer its own numbering scheme so they can use it in a support call:
- "**8-digit article numbers** of the products delivered"
- "Hardware listed in our assembly instructions with a **6-digit part number**"
- "using the **last 4 digits** of the card used" (receipt retrieval)
- "you must have the **4-digit PIN** associated with the card" (gift card)
- "the 3-digit number printed on the signature panel on the back of your card" (CVV)
- "please enter **5555** as your card security code" — the documented workaround for plastic-less AMEX accounts

Publishing a literal placeholder value (`5555`) for a card security field is unusual and worth recording: a field the user cannot satisfy, given a documented bypass, in a public FAQ.

## T6 Status & state language — PRIORITY

### The five order states

`[observed]`, from `Track and manage your order` under the heading **`Understand your order status`** — preceded by "Thank you for completing your order. **Here's what happens next.**"

| Status | Definition (verbatim, complete) |
|---|---|
| **`Preparing order`** | "We have received your order and will process it as soon as possible. **You can still cancel an order and change the delivery date.**" |
| **`Picking order`** | "Your order is being processed and completed. **It's too late to cancel the order, but you can return any unwanted item once you receive it.** Learn more about our Return Policy." |
| **`Preparing delivery`** | "Your order is on its way." |
| **`On its way`** | "Your order has been sent from our dispatcher and is on its way to you." |
| **`Delivered`** | "Your order has been successfully delivered." |

**This is the single best piece of order-status writing in the corpus, and the reason is that every state answers "what can I do now?" rather than "where is my parcel?"**

- `Preparing order` states two live capabilities (cancel, change date).
- `Picking order` states the **loss** of one capability and immediately substitutes another — "It's too late to cancel the order, **but** you can return any unwanted item once you receive it" — with a link to the policy that makes the substitute real. The point of no return is announced *at* the point of no return, with the alternative in the same sentence.
- `Preparing delivery` and `On its way` are the two weak states (see below).
- `Delivered` is the only state with no capability attached.

**The `Picking order` line is the transferable artefact.** Most systems let a cancel button silently disappear. IKEA names the state, names the lost action, names the reason it is lost (implicitly: picking has begun), and names the replacement path — in 29 words. Directly applicable to any payment, order or booking flow with an irreversibility threshold.

**Two findings against the set:**

1. **`Preparing delivery` and `On its way` are near-duplicates.** `Preparing delivery` is defined as "Your order is on its way" — which is the *name* of the next state. So state 3 is defined using state 4's label, and state 4's definition ("has been sent from our dispatcher and is on its way to you") is the more literal reading of state 3's definition. The two states are genuinely distinguishable operationally (picked-and-staged vs handed to carrier) but the copy does not distinguish them.
2. **The vocabulary is warehouse-derived.** `Picking` is a fulfilment-centre verb — the act of a worker collecting items from racking. IKEA exposes it to the customer unglossed. It happens to be intelligible (people infer "someone is gathering my things"), and it carries a useful connotation of physical irreversibility that "Processing" would not. A rare case of internal jargon working better than the consumer-facing alternative.

**Notably absent from the set**: no `Confirmed`, no `Processing`, no `Out for delivery`, no `Delayed`, no `Returned`, no `Refunded`. Five states only, and the post-delivery half of the lifecycle has no status vocabulary at all — returns are handled as a separate process, not as order states. Compare Shopify, which models return status as a fourth parallel axis on the order.

### Delivery sub-states and time windows

`[observed]`

- `You can opt-in to receive texts about your delivery status.`
- "The independent delivery provider will notify you of your **4-hour time window the night before your delivery**." (Scheduled Doorstep, Scheduled In-Home)
- "You will receive a separate notification when your delivery date is selected by **the independent delivery provider**." (Standard Delivery)
- "Delivery will be made **within the date range you choose**." (Standard)
- "You choose your delivery date, which can be as early as **tomorrow**." (Scheduled Doorstep)
- "Get your order as early as **tomorrow**" (Express In-Home)

**`the independent delivery provider`** is used consistently, four times, instead of "our delivery team" or a carrier name. IKEA names the third party's independence in the same sentence as the promise — an expectation-setter and a liability signal simultaneously.

The estimate is bounded honestly `[observed]`: "The earliest estimated dates for your area will be provided prior to completing your order at check-out. ***Please note that this is not a guaranteed delivery date for your order.*** Once your order ships, our delivery provider will contact you to confirm your scheduled delivery date and a 4-hour time window." — Claim, explicit non-guarantee, then the mechanism by which certainty arrives later. Textbook claim-bound-route.

### Stock / availability states

`[documented]` / `[observed]`

`in stock` · `Few in stock` (a quoted product-page label) · `out of stock` · `temporarily out of stock` · `back in stock` · `limited stock` · `discontinued` · `final sale` ("As-Is items are final sale.") · **`maximum order capacity`** — a checkout warning: "you'll receive a 'maximum order capacity' warning in checkout"

**Refresh cadence published** `[observed]`: "We update stock status for our products **every few hours**." and, on the stock page's meta description, "We update stock availability **several times per hour**. That means that every time an item is sold, its sale is registered and stock status is updated accordingly."

**Two different refresh rates for the same system on two pages** — "every few hours" (FAQ) vs "several times per hour" (stock page meta). One of these is wrong and a customer deciding whether to trust a stock badge would reach opposite conclusions.

**Two distinct causes of a false out-of-stock, both disclosed** `[documented]`: daily per-item sales caps for Collect at IKEA ("Daily per-item sales caps or limited stock make it show as out of stock at checkout") and daily service-slot limits ("Daily service slot limits trigger a 'maximum order capacity' warning"). IKEA tells the customer that "out of stock" sometimes means "capacity exhausted for today", which is a genuinely different thing.

### Pickup states

`[documented]`: `ready for pick up` / `ready for pick-up` / `ready to be collected` (three spellings), `still processing`, `Once the order ships`, `marked as delivered`.

## T7 Error, failure & recovery — PRIORITY

### The recovery page is 100 words and offers two doors

`[observed]` — `Missing and damaged orders` in full:

> "Sometimes things don't go as planned. If your order arrived incomplete, contained damaged products, or didn't even show up, we're here to help."
>
> **`Visit your closest store`** — "**Regardless of your issue, you can always visit your local IKEA store and we will find a solution for you.** If your item is damaged, bring you damaged item and proof of purchase. If you are missing an item, bring you order confirmation." → `Find your store`
>
> **`Visit our Contact Us page`** — "Call one of our agents. We will help you find a solution." → `Contact us`

**"Regardless of your issue, you can always visit your local IKEA store and we will find a solution for you"** is the omnichannel promise stated as an unconditional. It is the structural advantage IKEA has over every pure-play in this domain — a physical escalation path that does not require classifying the problem first — and the copy leads with it.

Note the recovery instruction is **bring the right artefact**: damaged → item + proof of purchase; missing → order confirmation. Two failure modes, two different documents, stated in eleven words each.

(`bring you damaged item` / `bring you order confirmation` — `you` for `your`, twice in one paragraph.)

### The `Missing Items` / `Damaged Items` / `Missing Parts or Hardware` triad

`[observed]` — the FAQ splits post-delivery failure into three sub-sections, and the third is furniture-specific:

**`Missing Items`** (6 questions) — whole items absent
**`Damaged Items`** (2 questions) — item broken
**`Missing Parts or Hardware`** (6 questions) — **a screw is missing from a flat-pack**

The third category has no analogue in any other product in this domain, and it is the largest of the three by article count. Its questions are the most human in the corpus:

- `If screws are missing in the package, can you send them to me?`
- `If parts of my product are missing, what should I do?`
- `The assembly instructions are missing from the package. Where can I find them?`
- `I purchased an item from IKEA years ago, but I need replacement parts. What should I do?`
- `I misplaced hardware from an item that I purchased several years ago, can I get a replacement?`
- `Can I get replacement parts for a product that I purchased from the As-Is department?`

**`I misplaced hardware from an item that I purchased several years ago`** is a first-person confession title in the Wise mould — the user admitting their own error, years after the fact, phrased exactly as they would say it aloud. IKEA answers it without reproach.

**A dedicated named recovery channel exists for this failure class** `[observed]`: the **`self service spare part portal`**, with a documented eligibility rule — "Hardware listed in our assembly instructions with a **6-digit part number**" can be ordered; larger parts are "at store discretion with possible fees".

### The `SKORVA` answer — a product-decision explained as a recovery

`[observed]` — FAQ question: `I don't have the middle support of my bed. Was it missing from the package?`

Answer: the SKORVA midbeam is **sold separately in store but included in the online bed-frame price**. A customer who buys in store and online gets a different bill of materials for the same bed. IKEA publishes this rather than letting it present as a packing error. That is a help article whose only job is to distinguish a *deliberate product decision* from a *fulfilment failure* — a category of content most retailers never write.

### Escalation windows, all short and all physical

`[observed]`

- "please give us a call at 1-888-888-4532 **within 24 hours** of your visit" (item left at the register — appears twice, for merchandise and for personal property)
- "the Mattress Removal service is only available **within 30 days** of receiving your new mattress"
- "cosmetic damage … **reported within 30 days** from the date of purchase" (appliance warranty carve-out)
- "**5 days** from the date your order arrives at the pick-up location to retrieve it" · "If you are unable to pick up your package within 5 days of the scheduled date" → "the order is returned and refunded to the original payment method"
- "Product reimbursement should be received approximately **2 weeks** after the item has arrived at the store"
- "Refunds typically process to the original method of payment **within 5-7 business days**"

The Collect Near You expiry is the well-formed one: window, consequence, and automatic remedy (return + refund) stated together.

### Appliance failure routed to a named third party, by date

`[observed]`: "If the appliance was purchased **within 365 days**, please visit your closest store location" → "For appliance help **outside of 365 days**, please contact **Whirlpool** directly" → "If your appliance was purchased in **2021**, please contact our Service Provider [named separately]".

Three branches on one failure, split by purchase date, two of which hand the customer to someone else. IKEA names the external party rather than saying "contact the manufacturer".

### The As-Is dead end, stated plainly

`[observed]`: "**As-Is items are final sale.**" and, for parts, "Available at store management discretion; visit the store with product and receipt." A whole product category with no return right, named in three words.

### Order-change recovery

`[observed]` — four questions, and the answers are mostly refusals:

- `My order was rescheduled, and I no longer want delivery. Can I pick up my order from my nearest store location instead?` → "Service can't be changed after payment; the delivery order must be cancelled."
- `Can I add items to my order?` → "Not after payment; a separate new order may be possible but same-day delivery isn't guaranteed."
- `Can I remove items from my order?` → "Possible for a refund **while the order is still processing**, not after it ships."
- `What do I do if I need to cancel or reschedule my online order?` → cancel via Track & Manage; **reschedule via chat or phone**.

The asymmetry is the finding: **cancelling is self-service, rescheduling is not.** A customer who wants to keep their order but move it has to talk to a human; a customer who wants to abandon it can do so alone. That is backwards from a retention standpoint and IKEA documents it without comment.

### No dispute, claim or protection programme

`[absent]`. IKEA has no `A-to-z`, no `Money Back Guarantee`, no `Purchase Protection`, no case system, no arbitration, no appeals window. Because it is a first-party retailer there is no counterparty to adjudicate between — the recovery path is store, phone, or warranty. **This is the structural contrast that makes 065 valuable next to 062–064:** three marketplaces need named protection programmes and a dispute lifecycle; the retailer needs a shop you can walk into and a 365-day mind-change window. The content follows the business model exactly.

## T8 Empty states

`[absent]` on the reachable surfaces. No search-results page, no filtered catalogue, no order-history view was harvested.

The nearest artefact `[observed]` is the **out-of-stock recovery**, which functions as a designed empty state: `notify me` (SMS or email), `check other IKEA stores`, and the guidance "Check the product page periodically, sign up for stock alerts, or call for restock info." Three exits from a dead end — wait, look elsewhere, ask a human.

`Clear the search input field` is present as an accessible label `[observed]` but the resulting state was not reached.

## T9 Notifications & system messages

`[documented]` unless noted.

- **Order confirmation**: "Once your order is placed, you will receive an order confirmation."
- **Shipping notification with tracking**: "Once your order is shipped, you will receive an email with your tracking number(s)."
- **Delivery-date notification** (Standard): "You will receive a separate notification when your delivery date is selected by the independent delivery provider."
- **4-hour window notification**: "The independent delivery provider will notify you of your 4-hour time window **the night before** your delivery."
- **Opt-in SMS**: "You can opt-in to receive texts about your delivery status."
- **Pickup-ready email**: "An email confirms when the order is ready for collection." · "Email/SMS notifies readiness; **order number and valid government issued photo ID required**."
- **Back-in-stock alert**: "sign up to get notified when it is back in stock via SMS or email."
- **Gift card delivery/viewed receipts**: "Delivery and viewed confirmation emails" · "If the Gift Card goes un-viewed for **15 days** after delivery" → options offered.
- **Birthday coupon**: "IKEA Family birthday coupons are sent out **the week before your birthday month**."

**The gift-card `un-viewed for 15 days` notification is the most interesting item here** — a system that detects a *non-event* (recipient never opened the card) and proactively offers the sender remedies. Very few products instrument the absence of an action.

**In-page notice** `[observed]`, Collect at IKEA section: "If you are shopping at Las Vegas or Merriam, please read these FAQs." — a store-specific exception surfaced inline, naming two locations.

No toast, banner or in-product alert copy was observable.

## T10 Disclosures, legal & compliance

### The return policy — three windows, two conditions, one exclusion list

`[observed]`

> "If you're not totally satisfied with your IKEA purchase you can return **new and unopened products within 365 days**, together with your proof of purchase, for a full refund. You may also return **open products within 180 days**, with your proof of purchase, for a full refund."
> "Refunds will be made in the same form of payment originally used to make the purchase."
> "Mattress purchases may be exchanged for another mattress **one time within 90 days**."

**365 / 180 / 90, gated on product condition and category, in three sentences.** The unopened/opened split is the mechanism most retailers hide inside terms; IKEA puts it in the second and third sentences of the policy.

**Exclusions, bolded** `[observed]`: "**We do not accept returns on plants, cut fabric, custom countertops and as-is products**. We are unable to refund or exchange your items if your merchandise is found to be **modified from its original form when purchased, dirty, stained, or damaged**. We apologize for any inconvenience."

Four excluded categories, four disqualifying conditions, and then — uniquely in this corpus — **an actual apology attached to an exclusion**: "We apologize for any inconvenience." No other product in this domain apologises for a policy limit.

**Additional conditions** `[observed]`:
- "You must have your receipt **and valid government issued photo ID** in order to return or exchange your product. **Information from your ID will be retained in a company-wide database to be used only for authorizing returns.**"
- "Only the net purchase price as shown on receipt will be refunded."
- "Returns are not accepted at IKEA Planning Studio or IKEA Pick Up Point locations."
- "When a promotional item included in the original transaction is not returned, **the value of the promotional item will be deducted from the refund amount**."

The ID-retention disclosure is a genuine privacy notice embedded in a returns policy — it states the collection, the storage ("company-wide database") and the purpose limitation ("only for authorizing returns") in one sentence, at the point of collection. That is better data-protection copy than most privacy policies manage.

### The warranty estate — the deepest disclosure artefact in the corpus

`[observed]` — `Limited warranties`, organised by **room**, not by product type: `Bathroom` · `Bedroom` · `Kitchen` · `Living room` · `Storage systems` · `Workspace and office furniture`. The room taxonomy from the global nav reused as a legal-document IA.

**Durations observed**: `2-year` · `3-year` · `5-year` · `10-year` · `15 years` (knives, cookware — expressed as a functional promise, not a warranty term) · `25-year` · **`Limited residential lifetime warranty`** (LOCKEBO custom countertops).

**Six `General Conditions` sub-headings, all phrased as user questions** `[observed]`:

`What is covered under the Limited Warranty?` · `Duration of Limited Warranty:` · **`What will be done to correct the problem?`** · `Conditions for the Limited Warranties:` · `Exclusions:` · `Care instructions:` · `General legal rights:` · **`How to reach us if you need service:`**

`What will be done to correct the problem?` is the remedy clause written as the customer's question, and its answer is a decision tree stated plainly: "IKEA will examine the product and decide if it's covered … IKEA will then, **at its choice**, either repair the defective product or replace it with the same or a comparable product." Followed by cost allocation ("IKEA will be responsible for the costs of repairs, spare parts, labor and travel for repair staff"), a boundary ("**provided that the product is accessible for repair without IKEA incurring additional expenditure to gain access**"), a property rule ("Any defective parts removed in the course of repair works will become the property of IKEA"), and a discontinuation rule ("If the item is no longer sold by IKEA, IKEA will provide an appropriate replacement. **IKEA will decide at its discretion, what will constitute an appropriate replacement.**").

Five distinct commercial questions answered in one paragraph, each in a single sentence, and twice conceding that the discretion is IKEA's.

**`General legal rights:`** — "This limited warranty gives you specific legal rights. **This limited warranty does not, in any way, affect the rights given to you by law.**" The statutory-rights preservation clause, stated affirmatively rather than as a disclaimer.

**The exclusion sentence, repeated verbatim across every product category** `[observed]`: "The limited warranties do not apply to products that have been **stored or assembled incorrectly, used inappropriately, abused, misused, altered, or cleaned with wrong cleaning methods or wrong cleaning products.**" Six failure causes, in one clause, reused unchanged in at least eight warranty sections. Consistent boilerplate is the correct choice here — a customer comparing two warranties can diff them instantly because the shared clause is identical.

**A per-product exclusion list, itemised** `[observed]` — the seating-furniture warranty lists ~55 product names that *are* covered, then names six things that are not: "fabric covers · leather covers · coated fabric covers · POÄNG cushions · seating furniture made of rattan, bamboo, or other natural fibers · some recliners · pouffes". **`some recliners`** is the notable entry — an admitted imprecision inside a legal exclusion list.

**US-specific statutory carve-out** `[observed]`, repeated in every category: "For customers in the US only: some states do not allow the limitation or exclusion of incidental or consequential damage, so this limitation or exclusion may not apply to you."

### Delivery pricing — a five-variable ladder

`[observed]` — four named tiers, each with a member price, a non-member price, and two regional overrides:

| Tier | IKEA Family | Non-member | CT/MA/NJ/RI/NY | SF/DC/N.VA/S.MD |
|---|---|---|---|---|
| `Standard Delivery` | from `$19` | from `$29` | `$39` / `$49` | `$29` / `$39` |
| `Scheduled Doorstep Delivery` | from `$29` | from `$39` | `$49` / `$59` | `$39` / `$49` |
| `Scheduled In-Home Delivery` | from `$59` | from `$69` | `$69` / `$79` | — |
| `Express In-Home Delivery` | from `$69` | from `$79` | `$79` / `$89` | — |

Plus `Small order shipping` (IKEA Family save `$5`, max `50 lbs`, Hawaii "starts at `$80` for all customers").

Every tier carries the identical qualifying sentence: "Requires a minimum **$35** merchandise subtotal to qualify for delivery, **after discounts, coupons, credits, and promotions and before taxes, gift card purchases, and any service fees**." — the base of the calculation defined with six inclusions/exclusions, stated the same way four times.

**Weight thresholds as routing rules** `[observed]`: "Orders over 50 lbs do not qualify for small order delivery." · "For orders under 300 lbs." (Standard) · "Orders over 500 lbs can only be delivered by Scheduled In-Home Delivery or Express In-Home Delivery where available."

**Structural constraints stated as flat facts** `[observed]`: "Someone **18 years or older** must be present for Large item delivery." · "Cannot deliver to PO Boxes or APO addresses." (twice) · "All **large item delivery** orders must be delivered within the continental US." · "Not all shipping and delivery options are available in all zip codes." · "Shipping and Delivery prices do not include tax."

### State-law-driven variation, disclosed by state

`[observed]` — mattress recycling:

> "IKEA follows all state laws with respect to mattress removal – including those states (**CA, CT, OR, or RI**) where removal is free of charge with the purchase of a delivery."
> "State-mandated recycling fee in CA, CT, OR, RI; the standard $25 removal fee is waived."
> "**In CA or CT**, the Recycling fee and Removal Service apply to all purchases of new mattresses, futons & box springs with the purchase of a delivery. **In OR or RI**, the Recycling fee and Removal Service apply to all purchases of **certain** new mattresses & box springs…"

Four states named, then **split into two sub-groups with different product scopes** (futons included in CA/CT, excluded in OR/RI; "certain" qualifying the OR/RI set). This is the most granular jurisdictional disclosure in the corpus and it is delivered in consumer FAQ prose rather than in terms.

**Contradiction, recorded** — see T14: the removal fee is `$25` on the FAQ page and `$30` on the delivery page, on the same site, on the same day.

### Financing disclosure

`[documented]` — two named credit products with distinct mechanics: `IKEA Visa credit card` (`5%` IKEA / `3%` dining-grocery-utility / `1%` everywhere; rewards "redeemed in **$15 increments** on your billing statement and are **valid for the next 45 days**") and `IKEA Projekt credit card` (IKEA-only; promotional financing auto-assigned by amount — "`$500.00-$1,499.99` → 6-month plan", "`$1,500.00`–`$4,999.99` → 12 month plan", "`$5,000+` → 24 month plan"; legacy "`4.99% APR` 60-month plan" preserved for existing balances).

**Auto-assignment disclosed with an opt-out pointer** `[observed]`: "plans are assigned automatically by purchase amount, with **opt-out details on the first statement**." The customer is told they will be enrolled and where the escape route will appear.

**A capability explicitly denied** `[observed]`: `Can I switch my current promotional plan to one of the new plans available?` → "No; prior purchases stay on the 4.99% APR 60-month plan." A flat no, published, with the reason implicit in the numbers.

**Business financing** `[documented]`: `Slope via Mastercard` — "extended **30 day** terms", named as `buy now pay later financing for business customers` and `invoice to pay solutions`.

## T11 Help-centre architecture

**Two-level and unusually flat: hub → topic page.** There is no article tree, no search-first help interface, no article IDs, and no per-article feedback widget. Content lives in **long topic pages with accordion sections**, and the FAQ is a single 139-question page rather than a corpus of articles.

**Hub → four featured cards** `[observed]`, each with a scope line and a CTA:
- `Planning Tools` — "Create your perfect storage and living room solutions" → `Learn more`
- `Return or change products` — "Find out how to return or exchange your products" → `Learn more`
- `Taskrabbit Assembly` — "Find flexible and affordable ways to get your to-dos done" → `Learn more`
- `Need an extra part?` — "Order spare or missing parts" → `Read more`

Three noun-phrase labels and one **question** (`Need an extra part?`), with the odd one out also being the only `Read more`. The question is the flat-pack-specific need, again given the human phrasing.

**The FAQ page is the real help centre** `[observed]` — 139 questions across 22 question-bearing sub-sections, under six H2 groupings:

`How to check stock availability` (no questions, guidance only) · `Orders` (`General`, `Missing Items`, `Damaged Items`, `Missing Parts or Hardware`, `Order Changes`, `Minimum Order Quantity`, `Minimum Order Value`) · `Services` (`Delivery`) · `Services` **(a second H2 with the same title)** (`Mattresses`, `Assembly`, `Kitchen Services`) · `Collect at IKEA` (`Collect Near You (Pick-up from a Third Party)`) · `Payment` (`Payment`, `Coupons & Offers`, `Gift Cards`, `Gift Registry`, `IKEA Financing`) · `Product Information` (`Product Questions`, `Product Availability`, `Product Warranties`, `Product Recalls`, `Return Policy`, `IKEA Stores`, `Other`)

**Two H2s titled `Services`**, separated by other content, is a genuine structural defect — the anchor navigation and the visual hierarchy both break.

**Distribution is revealing**: `Gift Cards` has **25 questions**, `IKEA Financing` has 20, `Product Questions` has 12. The single largest sub-section in IKEA's entire FAQ is gift cards. Meanwhile `Damaged Items` has 2 and the whole `Delivery` section has 9. Question volume tracks *support-call cost*, not customer frequency — gift cards and credit generate expensive, hard-to-resolve calls, so they get exhaustive documentation.

**Article-title grammar — overwhelmingly first-person questions:**

| Shape | Examples |
|---|---|
| `How do I / How can I …?` | `How can I check the status of my order?` · `How do I know if an item is in stock?` · `How can I purchase just one of a minimum order quantity product?` |
| `Can I …?` | `Can I add items to my order?` · `Can I alter my IKEA products?` · `Can I bring my pet to the store?` · `Can I film in your stores?` |
| `What should I do if …?` | `What should I do if items are missing from my delivery order?` · `What should I do if my item is damaged?` · `What should I do if my order is marked as delivered but I didn't receive it?` |
| `Why …?` / `Why can't I …?` | `Why can't I place an order for delivery online?` · `Why is my item out of stock?` · `Why was my favorite IKEA product discontinued?` · `Why are there only photos in IKEA assembly instructions?` |
| `I <did / have> <thing>` | `I lost my receipt. What should I do?` · `I misplaced hardware from an item that I purchased several years ago, can I get a replacement?` · `I left a product at the store after checking out. What should I do?` |
| `What is …?` | `What is IKEA Family?` · `What is Taskrabbit?` · `What is minimum order value?` · `What is an IKEA Planning Studio?` |

**The `I <did thing>. What should I do?` shape is IKEA's signature** and it is the Wise confession pattern at scale — `I lost my receipt`, `I misplaced hardware`, `I left a product at the store after checking out`, `I left an item that I purchased at the store`, `I lost a personal item (keys, wallet, card etc.) at the store`. Five questions in the user's own voice, all admitting the user's own mistake, all answered without reproach.

**`Why are there only photos in IKEA assembly instructions?`** is a question about a design decision, answered as a design rationale ("Photo diagrams keep instructions understandable worldwide"). A retailer explaining its own documentation philosophy in its FAQ.

**Product-support IA is a third structure** `[observed]` — organised by **product family**, not by problem: `Household appliances` · `PAX wardrobes` · `VIDGA curtains` · `Outdoors furniture` · `IKEA Home Smart App and Hubs` · `SYMFONISK WiFi speakers` · `Bluetooth speakers` · `Smart lighting` · `Smart blinds` · `Air purifiers and accessories` · `TRÅDFRI gateway & IKEA Home smart 1 app`, plus `General support` (`Assembly Guides`, `Product recalls`, `Buying guides`).

Each carries a benefit line rather than a description — `VIDGA curtains`: "It's time for brightness and time for darkness." · `Outdoors furniture`: "Our outdoor furniture is designed to last every BBQ and garden party, but there are a few ways you can help it live for longer." Support pages written in marketing voice.

**`Look further`** — the footer routing block on product support: `Return policy` · `Limited warranties` · `Spare parts` · `Design and planning` · `Product stock availability`. Five destinations, no descriptors.

## T12 FAQs

**Placement: a dedicated 139-question page at `/customer-service/faq/`, plus a 7-question FAQ embedded on the delivery page, plus a 3-question teaser on the customer-service hub.** `[observed]`

**The hub teaser — three questions in explicit `Q:` / `A:` format** `[observed]`, the only place on the site using that convention:

| Q (verbatim) |
|---|
| `Q: What do I do if I need to cancel or reschedule my online order?` |
| `Q: Is Click & Collect available for all IKEA stores?` |
| `Q: How long do I have to pick up my Click & Collect Order?` |

Three questions surfaced to the hub, and **two of the three are about Click & Collect**. The teaser is a support-volume signal: pickup is the intent IKEA most wants to deflect.

Their answers are the weakest content on the site. `Q: Is Click & Collect available for all IKEA stores?` → "Click & Collect is available." — an answer that does not answer the question asked (all stores?) before pivoting to instructions. `Q: How long do I have to pick up my Click & Collect Order?` → "Click & Collect is available. We have adjusted the pick-up process, please see our Click & Collect page for more details." — **the same non-answer opening sentence, then a redirect, with the actual duration (5 days, per the main FAQ) never given.** Two of three hub FAQs fail to answer their own question.

**The delivery-page FAQ — 7 questions** `[observed]`, with a visible defect running through four of them:

| # | Question as displayed (collapsed) | Question as it appears in the expanded answer |
|---|---|---|
| 1 | If I place my order online, how long will it take to be delivered? | — |
| 2 | Do you offer mattress removal with a purchase of a mattress? | — |
| 3 | How do I know what time the local delivery company will delivery my order? | — |
| 4 | If I place my order online, how much are shipping and delivery? | — |
| 5 | I live in **CA, RI or CT** and purchased a mattress, how do I request mattress removal? | "I live in **CA, CT, OR, or RI** and purchased a mattress…" |
| 6 | I live in **CA, RI or CT** and purchased a mattress with delivery in the past… | "I live in **CA, CT, OR, or RI** and purchased a mattress with delivery in the past…" |
| 7 | If I live in **CA, RI or CT**, what products are included…? | "If I live in **CA, CT, OR, or RI**, what products are included…?" |
| 8 | If I don't live in **CA, RI or CT** can I still get Mattress Removal…? | "If I don't live in **CA, CT, OR, or RI** can I still get Mattress Removal…?" |

**Four questions list three states in the heading and four states in the body.** The accordion label was written before Oregon was added and never updated; the corrected question is restated inside the answer, so both versions render, one above the other. A customer in Oregon scanning the headings concludes they are not covered. This is the most consequential content defect found in this harvest.

Question 3 also contains `will delivery my order` for `will deliver my order`.

**The main FAQ's 139 questions** — notable entries verbatim, by section:

*Orders › General*: `How can I check the status of my order?` · `Why can't I place an order for delivery online?` · `Can I place an order online to be delivered outside of the US?`

*Missing Items*: `What should I do if my order is marked as delivered but I didn't receive it?` · `I don't have the middle support of my bed. Was it missing from the package?` · `I purchased an item in the store location, but I left it at the register. What should I do?`

*Order Changes*: `Can I add items to my order?` · `Can I remove items from my order?`

*Minimum Order Quantity*: `What is minimum order quantity?` · `Which products will have a minimum order quantity?` · `How can I purchase just one of a minimum order quantity product?`

*Collect at IKEA*: `Is there a charge to pick-up my order at IKEA?` · `Why can't I place an order for pick-up at IKEA?` · `Can I change the pickup person listed on my order?` · `The product I am interested in is available at the store but for not for Collect at IKEA. Why?` *(note `but for not for`)*

*Collect Near You*: `What is Collect Near You?` · `Can someone else pick up my order?` · `How long do I have to pick up my order?` · `What happens if I can't pick up my order on the date it was scheduled?`

*Product Availability*: `How do I know if an item is in stock?` · `Why is my item out of stock?` · `What can I do if an item is out of stock?` · `Why was my favorite IKEA product discontinued?` · `The product I want is only available in another country. Can I purchase this product on their website?`

*Product Questions*: `Do your products contain lead?` · `Do you products contain formaldehyde?` *(note `Do you products`)* · `Are flame retardants used in IKEA products?` · `Are your products BPA free?` · `Does IKEA perform quality testing on their products?` · `Do your products have tested weight limits?` · `Does IKEA offer products through third-party sellers?`

*Product Recalls*: `How do I know if a product I've purchased has been recalled?` · `My product has been recalled. What do I do?` · `Is my IKEA dresser included in the 2016 Chest of Drawers recall?`

*IKEA Stores*: `Can I bring my pet to the store?` · `What is your firearm policy?` · `Can I film in your stores?` · `Are Wheelchairs and motorized scooters available to customers?`

**Structural notes.** The `Product Questions` cluster is a **chemical-safety FAQ inside a retail help page** — lead, formaldehyde, flame retardants, BPA, weight limits, quality testing — each answered with a date or a standard ("As of 2010, all IKEA products have been manufactured without lead"; "The phase out was made in 2006 and 2012 respectively"; flame retardants "avoided" except where legally required in "mattresses, stitch bond/zippers, and children's tents"). For a furniture retailer this is the trust surface, and it is placed in the FAQ rather than in a CSR microsite.

`Does IKEA offer products through third-party sellers?` → "No; third-party listings are unauthorized resellers." — a four-word market-position statement answering an anti-counterfeiting concern.

`What is your firearm policy?` and `Can I bring my pet to the store?` sit beside `How can I request an IKEA catalog?`. The FAQ is doing the job of store signage.

## T13 Terminology & glossary

| Term | IKEA's usage | The alternative it rejected |
|---|---|---|
| `Preparing order` · `Picking order` · `Preparing delivery` · `On its way` · `Delivered` | The five order states | `Processing`, `Dispatched`, `Out for delivery` — **none of which IKEA uses** |
| `Picking` | Warehouse verb exposed to the customer | "Processing", "Preparing" |
| `Shopping bag` | The cart | **`cart`** — never used |
| `Favorites` | The saved list | "wishlist", "saved items" |
| `Hej!` | The login greeting | "Hi", "Welcome" |
| `article number` (8-digit) · `part number` (6-digit) | Two distinct identifier types, both taught to the customer | "SKU", "item number" |
| `As-Is` / `As-is` / `as-is products` / `As-Is department` / `As-Is area` | The clearance category — **five capitalisations** | "clearance", "outlet", "bargain corner" |
| `Click & Collect` / `Click and Collect` / `click and collect service` | Pickup — three forms | |
| `Collect at IKEA` vs `Collect Near You` | **Two distinct pickup products**: IKEA-branded store vs third-party point | "in-store pickup" / "partner pickup" |
| `alternate collector` | The nominated pickup proxy | "authorized pickup person" |
| `minimum order quantity` / `minimum order value` | Two separate, separately-documented constraints | |
| `maximum order capacity` | A checkout-level throttle, surfaced as a warning string | |
| `IKEA Family` · `IKEA Business Network` | Consumer and B2B loyalty programmes | "rewards", "membership" |
| `SMÅLAND` | The in-store childcare, with its own privacy notice | "kids' play area" |
| `Taskrabbit` / `Taskers` | The assembly partner and its workers, named | "assembly technicians" |
| `the independent delivery provider` | The third-party carrier, four times | "our delivery team", carrier name |
| `Planning Studio` vs `Pick Up Point` vs store | **Three location types with different capabilities** — returns accepted at none but the store | |
| `SKORVA` · `PAX` · `KOMPLEMENT` · `SEKTION` · `ENHET` · `BESTÅ` · `BROR` · `UTRUSTA` · `MAXIMERA` · `TRÅDFRI` · `DIRIGERA` · `SYMFONISK` · `VIDGA` · `LOCKEBO` · `POÄNG` | Product-system names used as primary nouns throughout support content | generic descriptions |
| `Limited warranty` (always "limited") | Never "guarantee" in body copy — **but the URL is `/guarantee/` and the footer label is `Warranties`** | |
| `365-day no-nonsense return policy` · `90-day love or exchange it` | Informal programme names appearing **only in the meta description and a URL slug**, never in the page body | |
| `Recycling fee` vs `Removal Service` | Two separately-named charges on one mattress transaction | |
| `proof of purchase` | The requirement, always this phrase | "receipt" (used interchangeably, inconsistently) |
| `net purchase price` | The refundable amount | "purchase price" |

**`Collect at IKEA` vs `Collect Near You`** is the cleanest naming decision here: two pickup products distinguished by **where**, with the brand name in one and the proximity promise in the other. The customer can tell which is which from the label alone, and the fee structure differs ($2 or free with IKEA Family vs variable, $35 minimum).

**The `365-day no-nonsense return policy` finding is instructive.** That phrase — memorable, on-brand, tonally perfect — exists only in the `<meta description>` and nowhere in the visible page. The body copy says "It's OK to change your mind!" instead. Two good lines competing for the same job, one of which is only visible to search engines.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the customer; `we`/`our` for IKEA as a present actor — "We have received your order", "we will find a solution for you", "We can help", "We are confident in the quality of our products", "we're here to help", "We apologize for any inconvenience". IKEA uses `we` more warmly and more often than any other product in this cohort, and it uses it in the order-status definitions themselves ("**We** have received your order"), which most systems write impersonally.

**Register.** Warm, plain, occasionally exclamatory — **the only product in this domain cohort that uses exclamation marks in body copy**: `It's OK to change your mind!` · `Don't lift a finger!` · `Hej!` · `music to your ears!` · `Try it today!` · `Join IKEA Family!` The tone is closer to retail signage than to software documentation, which is consistent with a company whose primary channel is a building.

**Tone flattens in the warranty document** and only there. The warranty text is dense, legal, repetitive and discretion-heavy ("at its choice", "at its discretion"). Everywhere else — including the returns policy, which is legally operative — the register stays conversational.

**Idiom and pun are tolerated**: "let IKEA do the heavy lifting" (furniture), "lots of good things in store" (retail/idiomatic), "Don't lift a finger!" (in-home delivery), "It's time for brightness and time for darkness" (curtains), "Take a deep breath" (air purifiers), "Wake up gradually" (blinds).

**Numbers are operational, not promotional.** `365` · `180` · `90` · `30` · `24` · `5` · `2-3` · `$35` · `$19`–`$89` · `50 lbs` · `300 lbs` · `500 lbs` · `4-hour` · `18 years or older` · `8-digit` · `6-digit` · `25-year`. There is **no user-count, revenue or scale claim anywhere** in the harvested estate — no "millions of customers", no "X countries". IKEA's public help surface makes no bragging claims at all, which is a notable contrast with all four other products in this domain.

**Accessibility content** `[observed]`

- `Skip to main content` first in DOM on every page.
- **`Accessibility` is the second link in the DOM**, before the language switcher, on every page — and it appears again in the footer `Legal` column.
- `Skip product categories list` — a second, page-specific skip link on the customer-service hub, skipping the horizontal service-nav carousel.
- `Clear the search input field` rendered as visible/accessible text.
- **The accessibility statement is three sentences long** — the entire page body:
  > "IKEA values the importance of equal access and is committed to providing an accessible browsing experience for people with disabilities that visit our U.S. website. Web content produced by IKEA is intended to meet **WCAG 2.0 Level A and Level AA** success criteria as a guide for doing so."
  
  No conformance report, no testing method, no contact channel, no alternative formats, no remediation commitment, no date. **`WCAG 2.0`** — two major versions behind Shopify's stated `WCAG 2.2`. And "as a guide for doing so" is a hedge that stops short of claiming conformance. Placed prominently and saying almost nothing.
- Image alt text on support pages is descriptive and scene-level: `Scale model kitchen with appliances.` · `Open PAX wardrobe with storage solutions.` · `Close-up of VIDGA curtain track system​.` · `Patio corner with outdoors seating and table​.` · `DIRIGERA hub for smart products from IKEA lying on a side table.` · `A beige and green high-rise apartment building with corner balconies and windows against a cloudy sky.` · `A white truck unloading packages with a delivery co-worker.` · `people carrying box` — good quality overall, though several contain **zero-width characters** (`system​.`, `table​.`) and one (`people carrying box`) is lowercase and unpunctuated against the others' sentence case.
- Decorative icons carry bracket-empty links: `[Icon of store front](<>)` · `[Icon of phone](<>)` · `[two people talking](<>)` · `[man walking up stairs](<>)` — **decorative images wrapped in empty anchors**, which produce focusable, unlabelled links for keyboard users. Flagged as a likely real defect on the returns-troubleshooting and delivery pages.

**Negative findings, recorded honestly**

- **THE MATTRESS REMOVAL FEE CONTRADICTS ITSELF.** The FAQ page says "our standard **$25** mattress removal fee is waived" and "mattress removal for an additional **$25** fee when you purchase a **mattress, futon or box spring** with delivery". The delivery page says "Visit your local store to book Removal for **$30**" and "We offer mattress removal for an additional **$30** fee when you purchase a **mattress or box spring** with delivery **from your local store**." Two prices and two product scopes for one service, on one site, on one day. The delivery page additionally restricts the service to store purchases ("not available with purchases made online") in a way the FAQ does not.
- **STOCK REFRESH RATE CONTRADICTS ITSELF.** "We update stock status for our products **every few hours**" (FAQ) vs "We update stock availability **several times per hour**" (stock-availability page meta description).
- **FOUR DELIVERY-PAGE FAQ HEADINGS LIST `CA, RI or CT`** while their answers list `CA, CT, OR, or RI`. Oregon customers reading the headings would conclude they are excluded.
- **Two H2 headings both titled `Services`** on the FAQ page.
- **Five labels for the order-tracking destination**: `Track & Manage My Order` · `Track and Manage` · `Track & manage my order` · `My orders` · `track your order`.
- **Five labels for the IKEA Family join action**; **three labels for the warranty accordion control** (`See details` / `See warranty details` / `See warranty info`) on one page.
- **Five capitalisations of `As-Is`.**
- **Three spellings of pickup-ready** (`ready for pick up` / `ready for pick-up` / `ready to be collected`).
- Typos: `bring you damaged item` and `bring you order confirmation` (for `your`, twice in one paragraph) · `not available for purchase online on in-store` (for `or`) · `will delivery my order` · `Do you products contain formaldehyde?` · `but for not for Collect at IKEA` · `Why was my payment been declined?` · `Gift CarFFds` · `limied warranty` · `code chalenge` · `our lives' easier`.
- `Preparing delivery` is defined using the literal name of the next state (`On its way`).
- Decorative icons wrapped in empty anchors.
- Accessibility statement cites WCAG 2.0 and makes no conformance claim.
- Zero-width characters in several alt-text strings.

Eleven typos and five substantive inconsistencies across ten pages is a high defect rate — comparable to Amazon's — and unlike Amazon's, **two of IKEA's are price and policy contradictions that a customer could act on.**

---

## Transferable patterns

1. **Write order states as capability statements, not location statements.** `Preparing order` — "You can still cancel an order and change the delivery date." `Picking order` — "It's too late to cancel the order, **but** you can return any unwanted item once you receive it." Each state tells the user what they can do now. This is the single most reusable pattern in this file and it applies directly to any payment, booking or order flow.
2. **Announce the point of no return at the point of no return, with the substitute in the same sentence.** IKEA does not let the cancel affordance vanish silently; it names the loss and hands over the replacement path in 29 words. Condition: the substitute must be real and linked, or the sentence becomes a brush-off.
3. **`Regardless of your issue, you can always visit your local IKEA store and we will find a solution for you.`** An unconditional human escalation offered *before* the problem is classified. Any product with a physical or high-touch channel should lead with it — it collapses a decision tree into a door.
4. **Name the third party's independence in the promise.** "the independent delivery provider will notify you" — expectation-setting and liability-signalling in one adjective, used consistently.
5. **`Open PDF (291.62 KB)`** — format and weight in every download link, without exception. Cheap, respectful, almost never done.
6. **Embed the privacy notice in the collection moment.** "Information from your ID will be retained in a company-wide database to be used only for authorizing returns." Collection, storage and purpose limitation, in one sentence, inside the returns policy where the ID is actually demanded.
7. **Structure a warranty around the customer's questions, including `What will be done to correct the problem?`** and answer the remedy, the cost allocation, the access boundary, the property rule and the discontinuation rule in one paragraph of single sentences.
8. **Write a help article whose only job is to distinguish a product decision from a defect.** The SKORVA midbeam answer prevents a support contact by explaining a deliberate packaging choice that looks exactly like a packing error.
9. **First-person confession FAQ titles, at scale.** `I lost my receipt.` · `I misplaced hardware from an item that I purchased several years ago` · `I left a product at the store after checking out.` Five of them, all admitting user error, none answered with reproach. IKEA runs the Wise pattern more consistently than Wise does.
10. **Negative finding worth carrying: reconcile prices across surfaces before shipping either.** The $25/$30 mattress-removal contradiction is the kind of defect that costs a refund and a trust hit, and it survives because the delivery page and the FAQ page have different owners. Any content estate with duplicated pricing needs a single source.

## Caveats & gaps

- **No product detail page, cart or checkout harvested.** IKEA's stated benchmark strength is "Inventory, fulfillment, product information", and the inventory *badges* (`Few in stock`, `notify me`, `check other IKEA stores`, the store-availability module) are `[documented]` from FAQ and help prose rather than observed on a live listing. The product page is the highest-value missing surface.
- **`Track order` leads to a lookup form that was not submitted.** The five order states are `[observed]` from the help page that documents them; the live status UI, its badges, timestamps and any intermediate states were not seen. No order was placed or looked up.
- **The 139-question FAQ was read by a delegated sub-agent from a persisted large-output file.** All question text is quoted verbatim from that extraction and is high confidence; answer content is the sub-agent's one-line précis and is summarised, never quoted as IKEA's words, except where a fragment is explicitly marked verbatim.
- **Warranty PDFs (10 documents) not opened.** The on-page summaries are harvested; the booklet text, which is where per-product conditions actually live, is not.
- **`How to shop at IKEA`, `Expert shopping assistance`, `Contact Us`, `Product Recalls`, `Terms and conditions`, `Click & Collect` and the `services` index were not fetched.** `Product Recalls` in particular would likely be the richest safety-communication artefact on the site.
- **No search-results, no empty states, no validation copy, no email or SMS copy** observed directly. T8 is genuinely thin.
- **Assembly instructions themselves were not harvested** — IKEA's wordless pictorial instruction system is arguably its most famous content artefact and is entirely absent from this file. The FAQ answer explaining *why* they are wordless is captured; the artefact is not.
- **Locale is en-US only.** IKEA operates in ~60 markets with market-specific return windows, delivery products and legal text. Nothing here should be treated as precedent for any other market — the 365/180/90 windows in particular are US-specific.
- **Two internal contradictions were found and are recorded rather than resolved** (mattress removal fee, stock refresh rate). Neither was verified against a third source.

## Sources

1. https://www.ikea.com/us/en/customer-service/
2. https://www.ikea.com/us/en/customer-service/track-manage-order/
3. https://www.ikea.com/us/en/customer-service/returns-claims/
4. https://www.ikea.com/us/en/customer-service/returns-claims/troubleshooting/
5. https://www.ikea.com/us/en/customer-service/faq/
6. https://www.ikea.com/us/en/customer-service/services/delivery/
7. https://www.ikea.com/us/en/customer-service/product-support/ *(reached via /customer-service/product-information-pub43d0a640/)*
8. https://www.ikea.com/us/en/customer-service/stock-availability/
9. https://www.ikea.com/us/en/customer-service/returns-claims/guarantee/
10. https://www.ikea.com/us/en/customer-service/accessibility/
