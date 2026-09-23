# 073. Uber Eats

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Restaurant delivery marketplace with white-label logistics (Uber Direct); three-sided (eater / courier / merchant) inside a four-sided parent platform |
| Primary URL | https://www.ubereats.com/ |
| Corpus rank | 073 |
| Benchmark strength (source list) | Delivery status and recovery |
| Locale / market observed | en-US (`/us/en/` paths). Language picker offers `English, English` · `Chinese, 简体中文` · `Spanish, Español (Internacional)` |
| Platform observed | Web storefront, merchant marketing site, developer docs, courier marketing, corporate accessibility |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Visible in copy: NYC credit-card processing fee carve-out; motor-vehicle minimum age varying by state ("21 years old in California and New York State"); alcohol delivery escalation rules; `Do not sell or share my personal information` (CCPA) |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 reachable, 7 blocked |
| Harvest completeness | **Partial — `help.uber.com` is a client-rendered SPA and returned an HTTP 200 with a completely empty body on every request**, across all three audience hubs and all deep article URLs. Article *titles* are recoverable verbatim from search listings (they are the `<title>` tag); article *bodies* are not. Everything derived from titles is marked `[documented]`; nothing from a search engine's paraphrase has been promoted to a quoted string. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Eater storefront | https://www.ubereats.com/ | SSR shell; nav, footer, address form, JS fallback |
| Merchant marketing home | https://merchants.ubereats.com/us/en/ | Nav, solution naming, signup form |
| **Merchant order errors** | https://merchants.ubereats.com/us/en/order-errors/ | **Richest single page in this file** — the full failure taxonomy, priced |
| Merchant pricing | https://merchants.ubereats.com/us/en/pricing/ | Plan names, commission rates, the customer Delivery Fee explained to merchants |
| Merchant FAQ | https://merchants.ubereats.com/us/en/faq/ | Tablet flow, order acceptance |
| Uber Direct | https://merchants.ubereats.com/us/en/services/uber-direct/ | Five-step white-label flow |
| Eats API intro | https://developer.uber.com/docs/eats/ | Order-lifecycle operation names |
| Eats webhooks guide | https://developer.uber.com/docs/eats/guides/webhooks | Complete `event_type` enum |
| Eats sandbox | https://developer.uber.com/docs/eats/guides/sandbox | `order.current_state` field named |
| Accessibility statement | https://www.uber.com/us/en/about/accessibility/ | Six principles, WCAG 2.1 AA claim |
| Courier marketing | https://www.uber.com/us/en/deliver/ | Hero, earnings model, how-it-works |
| Courier support | https://www.uber.com/us/en/deliver/basics/before-you-start/how-to-get-support/ | |
| Driver app guide | https://www.uber.com/us/en/deliver/driver-app/ | In-app control names via alt text |
| Courier failure-mode blog | https://www.uber.com/us/en/blog/how-to-solve-unexpected-delivery-issues/ | **The courier's failure taxonomy** |
| **Blocked** | https://help.uber.com/ubereats · /en/driving-and-delivering · /merchants · and 4 deep article URLs | Empty body on every attempt |

---

## T1 Navigation & IA labels

**Four estates, four domains, and a deliberate asymmetry** `[observed]`

`www.ubereats.com` (eater) · `merchants.ubereats.com` (merchant) · `www.uber.com/us/en/deliver/` (courier, inside the parent brand) · `developer.uber.com` (integrator) · `help.uber.com` (all audiences, path-segmented).

Note the courier does not get an `ubereats.com` subdomain — delivery recruitment lives under `uber.com/deliver`, shared with the ride-hailing driver funnel. The courier is an Uber worker who may do Eats, not an Uber Eats worker.

**Eater global nav** `[observed]`: `Create a business account` · `Add your restaurant` · `Sign up to deliver` · `Get a ride` · `Log in` · `Sign up`

**Three of the six top-level eater nav items recruit a different audience.** Before an eater can find food they are offered a business account, a restaurant listing, a delivery job, and a taxi. The consumer nav is a cross-sell rail.

**Eater footer, group 1** `[observed]`: `Get Help` · `Buy gift cards` · `Add your restaurant` · `Sign up to deliver` · `Create a business account` · `Promotions`
**Group 2**: `Restaurants near me` · `View all cities` · `View all countries` · `Pickup near me` · `About Uber Eats` · `Shop groceries` · `English`
**Legal row**: `Privacy Policy` · `Terms` · `Pricing` · `Do not sell or share my personal information` · `© 2026 Uber Technologies Inc.`

`Pricing` as a consumer footer link is notable — most delivery apps do not surface a fee page in the footer at all.

**Merchant nav** `[observed]`: `Why Uber` · `Solutions` · `Business types` · `Resources` · `Pricing` · `Get support` · `Log in` · `Get started`

Solutions submenu carries a label + one-line scope, verbatim:
- `Get listed on Uber Eats` — "Reach new customers with delivery and pickup options on the Uber Eats app."
- `Deliver from your own channels` — "Offer same-day delivery from your website, app, or by phone with Uber Direct."
- `Create your online store` — "Use online ordering to convert website traffic into sales."
- `Integrate your system` — "Easily manage orders with trusted point of sale and tech partners."

Each label is a **verb phrase naming what the merchant does**, and each scope line names the channel. But the footer renames the first one `Marketplace` — nav and footer disagree on the product's name.

**Courier sub-nav** `[observed]`: `Sign up` · `Getting started` · `Using the app` · `Earnings` · `Uber Eats Pro` · `Safety` · `What's new` · `Support`

**Parent-brand nav** `[observed]`: `Ride` · `Earn` (→ `Drive`, `Deliver`) · `Business` · `Uber Eats` · `About` · `Help` · `Log in` · `Sign up`. In the footer's `Products` group, the eater app is listed as **`Eat`** — a single-syllable verb, matching `Ride` and `Drive`. The consumer product has two names depending on which nav you are in.

**Help-centre paths, inferred from links** `[documented]`: `/ubereats` (eaters) · `/driving-and-delivering` (couriers **and drivers, shared**) · `/merchants-and-restaurants` (merchants) · `/riders`. Legacy aliases `/restaurants/` and `/partners/` are still linked from live production pages.

Eater help sections observed in link structure: **`Ongoing order`** and **`Past order`** as siblings, plus `Help with an order`, `Account`, `Payments`.

**`Ongoing order` / `Past order` is the key eater-IA decision.** The support tree is organised by *temporal position relative to the order*, not by problem type. The first question the IA asks is "is this still happening?" — which is also the first question that determines whether a remedy is possible.

## T2 Value proposition & headline patterns

**Eater hero** `[observed]`

> `Order delivery near you`

Four words, no adjective, no brand voice. It is the search query, not a slogan. Compare DoorDash's `Everything you crave, delivered.` and Deliveroo's `Restaurants, takeaways, supermarkets and shops. Delivered.` Uber Eats' consumer hero is the flattest in the batch by a wide margin — the page is a utility, and the copy knows it.

**Merchant headlines are consultative and em-dash-heavy** `[observed]`

`Take the next step with Uber Eats` · `Find the right delivery solution` · `From day one to peak demand—Uber helps you deliver with confidence` · `Built for every kind of business` · `More than a platform—a partner` · `Ready to deliver your way?`

Value bullets: `Make smarter decisions with global and local insights` · `Build stronger customer connections` · `Move faster with flexible, easy-to-integrate tools` — three comparative adverbs (smarter, stronger, faster) in parallel construction.

**The order-errors page headline set is the most interesting in the file** `[observed]`

> `Managing order errors efficiently`
> "Mistakes happen—here's how we support you and your customers when things don't go as planned."
>
> `When things go wrong, we want to make it right`
>
> `We're always here for your business`

Read those three in sequence and then read what the page actually does: it explains the circumstances under which money is deducted from the merchant's payout. The page is a liability schedule headed `we want to make it right`. That framing gap is the single most quotable artefact on the merchant surface.

**Courier headlines are autonomy-framed** `[observed]`: `Deliver with a car, with a bike, or on foot` / `Flexibility to earn on your terms.` · `Your earnings, your way` · `How food delivery driving works` · `Deliver your way in the app`. Benefit chips: `Upfront fares` · `Get paid quickly` · `Many delivery options`.

**Accessibility hero** `[observed]`: `Move freely, accessibly` / "Everyone should have the freedom to move on their own terms." — the adverb-pair headline construction is unique on the estate and clearly a separate content team.

**The em dash is a merchant-voice marker.** `From day one to peak demand—Uber helps you deliver`, `More than a platform—a partner`, `Mistakes happen—here's how we support you`, `Pay a fee per delivery—no commissions`. It barely appears in eater or courier copy. Register is being signalled by punctuation.

## T3 CTA inventory

| CTA (verbatim) | Context | Audience | Notes |
|---|---|---|---|
| `Log in` | Eater nav | Eater | |
| `Sign In` | Eater address block, `Or Sign In` | Eater | **Different label and capital I for the same action, on the same page** |
| `Sign up` | Eater nav | Eater | |
| `Get Help` | Eater footer | Eater | |
| `Get a ride` | Eater nav | Eater | Cross-product |
| `Get started` | Merchant, repeated | Merchant | Primary, used many times for several destinations |
| `Continue my application` | Merchant signup | Merchant | Resume-state CTA — rare and good |
| `Submit a dispute` | Merchant order errors | Merchant | |
| `Explore Uber Eats` / `Explore Uber Direct` / `Explore all success stories` / `Explore our partners` / `Explore marketing strategies` | Merchant | Merchant | **Five `Explore X` CTAs on one estate** |
| `Check out the Uber advantage` | Merchant | Merchant | |
| `Call our team for help` | Merchant | Merchant | Names the channel and the actor |
| `Already have an account? Sign in` | Courier | Courier | **A full-sentence CTA** — notably warmer than the eater site's bare `Log in` |
| `Download the Driver app` / `Scan to download` | Courier | Courier | |
| `Submit your question` / `Go to the Help Center` | Courier support | Courier | |
| `Go` | Courier app, go online | Courier | |
| `Accept` | Courier app, Exclusive request | Courier | |
| **`Match`** | Courier app, Trip Radar request | Courier | **A different verb for a multi-courier offer** — the courier is matched, not accepting |
| `I have the order` | Courier app, swipe at pickup | Courier | First person, past-tense-adjacent, stated as fact |
| `leave at door` / `take photo` | Courier app, dropoff | Courier | |
| `Manage Order` / `Cancel order` / `Confirm` / `Print` | Merchant tablet | Merchant | |
| `Skip to content` | Eater DOM | All | `#main-content` |
| `Skip to main content` | Merchant + uber.com DOM | All | `#main` — **two labels, two anchor IDs, one company** |

**Observation:** Uber ships a `Match` button where every competitor ships `Accept`. `Match` describes the *system's* action (a courier is matched to a trip) rather than the courier's. A courier tapping `Match` is agreeing to be allocated, not choosing an order. Given that Trip Radar offers go to several couriers at once, `Accept` would have been a lie — someone made a considered choice here.

## T4 Onboarding & getting-started

**Courier, `How food delivery driving works`** `[observed]` — four steps, and the first is a question:

1. `Already a driver on the Uber platform?`
2. `Log in`
3. `Deliver orders`
4. `Earn money`

Step 1 is not a step. It is a branch condition rendered as a step, which is what happens when a driver funnel and a courier funnel share a page. The in-app path is published verbatim: `Account > Work Hub > Add "Food Delivery"`.

**Courier, `Taking trips`** `[observed]` — three stages: `Pickup` → `Verify your items` → **`Dropoff`**. Spelled as one word, no hyphen, throughout. (Compare DoorDash's `Drop-off issues` and its `Dropp-off` typo.)

`Verify your items` is a named stage of its own, with the instruction "verify that you have all the items in the order (unless it's already sealed), especially **frequently missed items, like drinks**." Missing-item prevention is built into the courier's flow as a *named step*, and drinks are called out by name. That is the cheapest possible intervention in the batch's most expensive failure mode.

**Courier app IA** `[observed]`: `Home` · `Discover` · `Earnings` · `Inbox` · `Menu`, with Menu children `Profile` · `Help` · `Safety` · `Settings` · `More ways to earn` · `Manager` · `Money` · `Resources`.

**Uber Direct, five steps** `[observed]`: `Step 1: Sign up or integrate` · `Step 2: Receive orders` · `Step 3: Dispatch with Uber` · `Step 4: Courier completes the delivery` · `Step 5: Track and optimize`

Step 4 is the only one with a third-person subject — the courier does it, the merchant watches. Note the alt text preserves older wording (`Step 1: Sign up and integrate`, `Step 5: Track & optimize`), a real drift between visible label and alt text.

**Merchant order-acceptance sequence** `[observed]`, verbatim: "Tap the flashing green screen to view new order information." → hand off to kitchen → **"Choose Confirm after the kitchen has begun preparing the new order. This will notify the customer that their order is being prepared."** → package and hold for the courier.

That third step is the merchant-side twin of the eater's "preparing" state, and it contains an instruction the eater never sees: **confirm only once cooking has actually started**. The eater's tracker chip is defined by a merchant's tap, and Uber tells the merchant exactly when to tap it.

Hard constraints stated literally: merchants must accept or deny **"within 11.5 minutes. Otherwise the order will time out and auto-cancel."** and "a robocall will be triggered if no Accept/Deny is posted after 90 seconds."

## T5 Form & field labels

`[observed]`

- Eater: `Enter delivery address` · `Deliver now` (time selector) · `Search here` · divider `Or`
- Merchant signup: `Store name or address` (appears twice) · `Get started` · divider `or` · `Continue my application`
- Merchant login: `username` · `password` · **`4-digit PIN`**
- Language selector heading: `Select your preferred language`, options rendered as native+English pairs (`Chinese, 简体中文`)
- Courier FAQ: a bare `Search` field under `Still have questions?`

`Deliver now` as the **default value of a time selector** is worth noting — the field's resting state is an assertion of immediacy, and switching to scheduled delivery means overriding a word that already sounds like a promise.

No checkout, cart, tip or refund-claim field labels were reachable — all behind auth, and `ubereats.com` serves only a JS shell past the address gate. `[absent]`

## T6 Status & state language — PRIORITY

### The honest gap, stated first

**The eater-facing tracker strings could not be verified.** The live tracker is in-app, and every help article describing it returned an empty body. No `Preparing your order`, no `On the way`, no `Arriving now` string is quoted in this file, because none was observed. A search-result paraphrase suggested the tracker shows two labelled times — an estimated delivery time and a **latest-arrival guarantee** — which would be a genuinely interesting two-time pattern, but the label strings were not retrievable and are therefore excluded.

What *is* fully recoverable is the state vocabulary for the other three audiences, and the comparison is the point.

### System / integrator states `[observed]`

Complete `event_type` enum, from the webhooks guide, with Uber's own descriptions:

| Event | Description (verbatim) |
|---|---|
| `orders.notification` | "Sent whenever an order is created." |
| `orders.scheduled.notification` | "Sent whenever a scheduled order is created." |
| `orders.failure` | "Sent when an order is cancelled. (Only applies to stores configured on API version 1.0.0.)" |
| `orders.cancel` | "Sent when an order is cancelled. (Only applies to stores NOT configured on API version 1.0.0.)" |
| `orders.release` | "(If fast order release is enabled) Sent when an order is configured for Fast Order Release and courier has reached geo-fence." |
| `order.fulfillment_issues.resolved` | "Sent whenever a customer has confirmed change on Resolve Order Fulfillment endpoint." |
| `store.status.changed` | "Notification when a store's online status has changed." |
| `store.provisioned` / `store.deprovisioned` | |

Two further events are named on the API intro page but absent from the webhooks guide: **`orders.failed`** ("Notification event for failed orders") and **`delivery.state_changed`** ("Notification event when the delivery state of an order changes"). The sandbox page shows a handler reading **`order.current_state`** — so that is the real field name — but **no page enumerates its values**. The order-state enum is not published.

**Two distinct events, `orders.failure` and `orders.cancel`, mean the identical thing and are selected by API version.** Uber shipped a second name for cancellation rather than migrate the first. The word "failure" for a cancellation is itself a register artefact: at the API layer, a cancelled order is a failed one.

Order-lifecycle operation names `[observed]`: `Order Acceptance` · `Order Denial` · `Cancel Order` · **`Resolve Fulfillment Issues`** ("Resolve fulfillment issues due to cart issues") · **`Mark Order Ready`** · `Adjust Order Price` ("Adjust the order price based on customer contacting restaurant") · **`Update Ready Time`** · `Delivery Partner Feedback` · `Update Delivery Partner Count` ("Request multiple delivery partners") · `POST Location` ("Ingest real-time courier location data for **BYOC (Bring-Your-Own-Courier)** partners").

### Merchant-facing failure states — the canonical taxonomy `[observed]`

The order-errors page names **five chargeable failure states** and defines each:

| State | Definition (verbatim) |
|---|---|
| `Missing items` | "Customer did not receive an item, or part of an item, that was ordered." |
| `Incorrect items` | "Customer received an item, or part of an item, that was not as ordered." |
| `Incorrect orders` | "Customer received incorrect order." |
| `Undelivered orders` | "Customer never received their order" (plus fault conditions) |
| `Late deliveries` | Defined only for merchant self-delivery |

And **six non-chargeable states**, also named: `Late customer reports` · `Fraudulent activity` · `Suspicious deliveries` · `Damaged orders` ("Customer damage complaints (e.g., tampered packaging, spilled liquids)") · **`Food condition`** ("e.g., food arriving cold") · **`Food quality`** ("e.g., food taste or integrity").

**`Food condition` and `Food quality` are two separate named categories.** Cold food and bad food are different events with different liability. Almost nobody makes that distinction in writing, and it is exactly right: one is a logistics failure, the other is a cooking failure.

Note also that `Missing items` and `Incorrect items` both include the phrase **"or part of an item"** — the partial-item case, named twice, in the definitions rather than in a footnote.

The icon filenames on that page leak the internal design-system vocabulary for these states: `missing_glyph_filled`, `package_stacked_filled`, `delivery_bag_alert_filled`, `delivery_bag_remove_filled`, `clock_add_filled`, `hourglass_filled`, `circle_slash_filled`, `car_clock_filled`, `cloche_filled`.

### Courier-facing states — trip states, not order states `[observed]`

The courier's object model is entirely different. They work on **trips**, not orders.

Vocabulary: `delivery requests` · `trip requests` · **`Exclusive requests`** · **`Trip Radar requests`** · `Pickup` · `Verify your items` · `Dropoff` · `You're offline.` · `It's busy`. The handoff is a swipe labelled `I have the order`. After the drop: "you can then prepare to accept another trip request or go offline."

**Courier failure taxonomy** `[observed]`, from the delivery-issues blog — six named situations:

| Situation | Uber's instruction (abridged, key phrases verbatim) |
|---|---|
| `Restaurant is closed` | "please do not cancel the order in the app because another courier would be dispatched to the same closed restaurant. Instead, call Support" |
| `Restaurant is too far away` | |
| `Customer can't be reached` | "Call and message the customer." → "If the customer doesn't answer, tap the banner that appears." → "Then tap the button to notify the customer that you've arrived." → **"A countdown clock will begin."** → "If the customer doesn't contact you by the time it runs out, follow the prompts for ending the delivery." |
| `Dropoff address is changed` | |
| `Dropoff is inaccessible` | "If the customer's dropoff location is gated or inaccessible but their delivery preferences ask you to deliver to their door" |
| `App failure` | |

**There is no named state for "courier can't find the address."** Uber frames it entirely as `Customer can't be reached` or `Dropoff is inaccessible` — the failure is attributed to *reachability* or to *the location*, never to the courier's navigation. That is a deliberate blame-allocation choice, visible only when you compare it with Instacart, which ships `shopper could not find address` as an explicit cancellation type.

The `Restaurant is closed` instruction is the best piece of courier copy on the estate: it tells the courier **not** to take the obvious action, and explains the system-level reason ("another courier would be dispatched to the same closed restaurant"). Giving a worker the reason a locally rational action is globally wrong is a genuinely hard content problem, solved in one sentence.

### Eater-facing status article titles `[documented]` — bodies blocked

- `Check the status of my order`
- `My order is taking longer than expected`
- **`Delayed Order Arrival`** — but the slug is `my-order-is-taking-longer-than-expected-what-you-need-to-know`, so the slug preserves an older title
- `Delivery by merchant's staff: My order is taking longer than expected`
- **`Contact the Delivery Partner`** — slug is `contact-the-delivery-person`. **Direct evidence of an in-flight terminology migration: the title says "Delivery Partner", the URL says "delivery-person".**

## T7 Error, failure & recovery — PRIORITY

### The merchant side is fully documented and it is the most precise failure content in this batch

`[observed]`, all from the order-errors page.

**Stated time limits, quoted literally:**

| Rule | Verbatim |
|---|---|
| Merchant immunity | `Late customer reports: Errors reported more than 96 hours after order was placed.` |
| Merchant dispute window | "we require you to use the dispute button in the Orders tab in Uber Eats Manager to submit a dispute request **within 30 days of the order date**. We aim to resolve disputes within about an hour" |
| Undelivered-order liability | charged "because your store had closed (despite you initially accepting the order) when the delivery person arrives **within 30 mins after menu closing time**." |
| Late-delivery liability | "When using your own delivery staff, customers received their order **approximately 70 minutes or more** past merchant's estimated delivery time." |

**`approximately 70 minutes or more` is an unusual number to publish.** It is not a round figure, which is what makes it credible — it reads like a threshold derived from data rather than chosen for a policy document. Also note `approximately` attached to a threshold that triggers a charge: the hedge and the precision are doing opposite work in one phrase.

**Fraud-control categories, named** `[observed]`: `Excessive refund request rates` · `Photo evidence required` ("We require photos to be submitted in many cases as evidence before making a refund decision.") · `Escalation circumstances` · `Minimum satisfaction ratings` · `Excessive missing item rates`.

Escalation triggers listed verbatim: "Not filed in a reasonable time frame" / "For high-value orders" / "For orders with alcohol items" / "For first-time customers". **First-time customers are an escalation trigger** — a new eater's first complaint gets extra scrutiny. Published, on a merchant page.

**Named outcomes** `[observed]`: `Customer may be compensated` ("sometimes issuing **Uber credits** or providing **refunds**") and `Partners may be charged`.

The coined policy term is **`order error adjustments`** — "the eligible customer refund costs that are deducted from stores' payouts for circumstances within merchants' control, and after fraud checks."

**`order error adjustment` is a three-noun compound describing money being taken from a merchant, on a page headed `Mistakes happen—here's how we support you`.** The deduction is named an *adjustment* and framed as *support*. This is the euphemism to put in front of anyone writing adverse-outcome copy: it is technically accurate, completely opaque, and it works.

**The carve-out that reveals the economics** `[observed]`: "we retain the full Uber Service Fee for the entire order" — Uber keeps its cut on a refunded order — paired with "You will *not* be responsible for any delivery fees* or bag fees charged to the customer." Both sentences in the same block.

**Prevention checklist, merchant-facing** `[observed]`: `Up-to-date menu` · `Printed receipts` · `Tamper-evident materials` · `Order number` ("Write the 5-digit order number on the bag for easy identification") · `Number the bags` ("'1 of 2' and then '2 of 2,' etc.") · `Handoff`.

**Where the error surfaces back to the merchant** `[observed]`: an **`Order Errors (Transaction) report`** (CSV), the Payment Details report, the Payments tab where "you'll see a **red indicator box that says Order Error** next to the relevant orders", and a **weekly Payment Summary** email. Four surfaces for one event.

### Eater-facing failure article titles `[documented]`

The title grammar is overwhelmingly **first-person eater voice**:

- `My order never arrived` — **two distinct nodeIds**, one under `/ubereats/stores/`, one under `/ubereats/restaurants/`
- `Order never arrived` — a **third-person variant of the same article**, separately published
- `Missing Items` / `Wrong or missing items` — note the title-case inconsistency between the two
- `Cancel my order` (two nodeIds) / `I want to cancel my order`
- `Why was my order cancelled?`
- **`My order was canceled FAQ`** — **"canceled" (US) here, "cancelled" (UK) in the sibling article above. Both live simultaneously on the same help centre.**
- `I was charged for cancelling my order` / `I was charged for cancellation` — two articles, one topic
- `What is the Uber Eats cancellation policy?`
- `I have an outstanding charge on my account`

Merchant-facing: `Managing refunds for missing or incorrect orders` · `How do I cancel an order?` · **`Do we get paid for canceled or unfulfilled orders?`** — first-person *plural*, written for a restaurant team rather than an individual.

Courier-facing: **`Couldn't find customer or other delivery issue`** — and the slug is `i-couldnt-find-the-eatereater-was-late`. **The deprecated term "eater" survives in the URL while the visible title has been rewritten to "customer".** This is the single best artefact of Uber's terminology migration in the whole harvest. Also `What if the order I was delivering gets cancelled?` and `What if I need to cancel a delivery request I've accepted?`

### The three-way grammar split

This is the most transferable finding in this file.

| Audience | Pattern | Examples |
|---|---|---|
| Eater | **First-person possessive statement of a problem** | `My order never arrived` · `My order was canceled FAQ` · `I was charged for cancelling my order` · `I have an outstanding charge on my account` |
| Eater | First-person question | `Why was my order cancelled?` · `Am I expected to leave a tip?` · `What fees might my order include?` |
| Eater | Imperative task | `Cancel my order` · `Change tip` · `Check the status of my order` |
| Courier | **Conditional / hypothetical** | `What if the order I was delivering gets cancelled?` · `What if I need to cancel a delivery request I've accepted?` |
| Merchant | **Gerund process, or first-person plural** | `Managing refunds for missing or incorrect orders` · `Managing order errors efficiently` · `Do we get paid for canceled or unfulfilled orders?` |

**The eater is given a voice to report. The courier is addressed in terms of contingencies they must handle. The merchant is addressed as an organisation running a process.** Note `the order I was delivering` — the courier's possessive attaches to the *labour*, not to the goods.

## T8 Empty states

`[observed]` — one only, in the nav search on `uber.com` and `merchants.ubereats.com`: **`No results`**. Two words, no apology, no suggestion.

The eater JS-disabled fallback is the nearest thing to a true blocked state `[observed]`:

> `Javascript disabled`
> "Javascript is needed to run Uber Eats. You can try enabling it or visiting the website with a browser that supports Javascript."

Note **`Javascript`**, not `JavaScript`, twice. And the remedy is a genuine two-option choice ("try enabling it **or** visiting the website with a browser that supports it") rather than a dead end — good practice in a state most products ship as a bare error.

## T9 Notifications & system messages

`[observed]`

- Merchant new-order alert: "your Uber Eats Order Manager screen will **flash green and a sound will play**"; "Check the circled number on the flashing green screen to confirm the number of new orders"
- Merchant in-app error flag: "you'll see a **red indicator box that says Order Error**"
- Merchant payout: a **weekly Payment Summary** email with an order-errors section at the bottom
- Courier Inbox carries "active messages about a delivery summary and a **cancellation fee**" — so `cancellation fee` is a courier-facing notification type
- Courier map states: **`You're offline.`** (with a full stop) and **`It's busy`** (without one)
- Courier: `Weekly Quest available.`
- Courier escalation: "call our **Safety Incident Reporting Line**, 24/7, or tap the **blue shield** in the driver app."

**A colour and a sound are the merchant's primary order notification, and both are described in the help copy** — "flash green and a sound will play". Content for a non-verbal alert.

## T10 Disclosures, legal & compliance — fee itemisation

### Merchant-side fee names, fully verified `[observed]`

| Fee | Rate |
|---|---|
| `Marketplace Fee` | 20% (`Lite`) / 25% (`Plus`) / 30% (`Premium`) |
| `Pickup Fee` | 7% "With validated in-store pricing", else 10% |
| `Self-delivery Fee` | 15% |
| `order processing fee` | Webshop: "2.5% order processing fee + $0.29 per order" |
| `Uber Service Fee` | Named in the order-errors page |
| `bag fees` | |
| Uber Direct `Fee` | "Starts at $7.99 per delivery." |

Plan names: `Lite` · `Plus` · `Premium` · `Self-delivery`. Intro offer: `0% intro rate` for 30 days.

### The customer Delivery Fee, explained to merchants — the most consequential disclosure in this file

`[observed]`, verbatim: "Uber Eats charges customers a Delivery Fee on each order. That fee is calculated using various factors, which may include customer location, availability of nearby delivery people, and current volume of activity on the platform, among others." Plus: "the Delivery Fee is dynamic based on market conditions" — and higher-tier merchant plans mean "you can expect your customers to pay a **lower Delivery Fee**".

**The eater's delivery fee is partly a function of the merchant's commission tier.** A restaurant on `Premium` gets its customers a cheaper delivery fee than a restaurant on `Lite`. That is stated plainly on the merchant pricing page — and it is almost certainly not stated anywhere the eater will read it. Two audiences, one number, one explanation.

### Eater-side fee names `[documented]` — titles only, bodies blocked

Article titles verbatim: `What fees might my order include?` · `What fees may apply to my order?` (a **near-duplicate with a different nodeId** — two live variants of one question) · `Fees charged for ordering with Uber Eats` · `How does the delivery charge work on Uber Eats?` · `How do the charges work on Uber Eats?` · **`What's estimated pricing?`** · `How do customer delivery fees work?` (merchant section)

**No eater fee line-item name is recorded in this file.** Search paraphrases named a service fee, a small order fee, and a "delivery adjustment fee", but none was observed on a fetched page, so none is quoted here. **There is no evidence at all of a regulatory-response fee or a surge/busy-area fee on any Uber Eats surface** — do not import those from DoorDash's schedule.

### Footnote machinery `[observed]`

The merchant pricing page carries **eight numbered footnotes plus asterisks**, and a numbering bug: `0% intro rate⁴` in the Plus card and `0% intro rate³` in the Premium card, both apparently pointing at the same 30-day provision. The courier page footnotes "²Motor vehicle driver minimum age is 21 years old in California and New York State" against body copy saying "Be at least 19 years old²", and carries a promotional block opening "This is a promotional offer and not a guarantee of future earnings."

**Two variants of the same disclaimer boilerplate** `[observed]`: "The **material** provided on this web page is intended for informational purposes only…" (courier) and "The **information** provided on this web page is intended for informational purposes only…" (support). One word apart, both live.

**Merchant-relationship disclosure** `[observed]`, verbatim: **`Please note: we can't partner with every merchant that applies.`** A rejection-possibility disclosure placed in the FAQ, before the application. Blunt, and worth copying anywhere an application can fail.

## T11 Tipping

`[observed]`, courier-facing only — the eater-facing tip UI is behind auth.

- "customers have the option to tip in-app, and **100% of tips are yours to keep**."
- "Your total earnings come from base fare, promotions, and tips (**you keep 100% of your tips**)."
- Fares "include base fare and any **upfront tip** that the customer may add while placing the order."

**`upfront tip` is the term to record.** It signals that pre-delivery tipping is the designed default, and it does so in the courier's earnings copy rather than in the eater's checkout. The word "upfront" is doing double duty — it is also the brand term for `Upfront fares`, so the tip is positioned as part of the same visible-before-you-commit system.

**Eater tipping article titles** `[documented]`: `How to add a tip` · `How do I tip my delivery person?` · `Change tip` · `Add or change tip amount for a past order` · **`Am I expected to leave a tip?`**

That last title is remarkable to ship. It is the awkward question, asked in the eater's voice, hosted rather than dodged. Most products route this into a fees page or omit it. **No tip default amount or preset percentage was found anywhere public** — do not supply one.

## T12 FAQs

Uber Eats does not use a consumer FAQ accordion; questions are standalone help articles (see T7 and T10 for the title inventory). The merchant FAQ is the only true FAQ surface reached, and its questions are operational rather than commercial — order acceptance, tablet login, PIN entry, printing, cancellation. `[observed]`

The eater question set is recoverable only as titles. Its shape is worth noting: of the titles captured, **six are about being charged** (`I was charged for cancelling my order`, `I was charged for cancellation`, `I have an outstanding charge on my account`, `What fees might my order include?`, `What fees may apply to my order?`, `How do the charges work on Uber Eats?`). Money, not food, dominates the eater help surface.

## T13 Terminology & glossary

No published glossary. Terms harvested from usage `[observed]`.

**The terminology migration, and the evidence it is incomplete**

| Concept | Eater surface | Courier surface | Merchant surface | API |
|---|---|---|---|---|
| Person delivering | "delivery person"; **`Delivery Partner`** in one title; **"eater"** survives in a courier URL slug | "courier", "delivery driver", "delivery person", "driver" — **all four on one page** | "delivery people", "delivery person", "couriers", "delivery staff" | "Delivery Partner", "courier" |
| Person ordering | (implicit "you") | **"customer"** consistently; "eater" only in a legacy slug | "customer" | **`Eater`** — "minimize Eater cancellations" |
| Business | "restaurant", "store" | "Restaurant", "store" | "merchant", "store", "business", "partner", "merchant partner" | "store", "merchant" |
| The job | "delivery" | **"trip"**, "delivery request", "trip request" | "order" | "order", "delivery" |

**"Eater" is deprecated in the UI and alive in three places**: the courier help-centre slug `i-couldnt-find-the-eatereater-was-late`, live API documentation prose ("Order acceptances should be posted as quickly as possible to minimize **Eater** cancellations"), and the corporate IA generally. Meanwhile `Delivery Partner` vs `delivery person` is unresolved *within a single article* (title vs slug).

And the courier marketing page uses **"courier", "delivery person", "delivery driver" and "driver" interchangeably in adjacent sentences** — "As a **courier**, grab your car, bike, scooter…", "you'll need to sign up to be a **delivery person**", "When you're ready to start being a **delivery driver**". Four terms, one role, one page. The meta description names "delivery jobs" and "food delivery jobs", so this is almost certainly SEO-driven — terminological discipline traded for search coverage, and a legitimate trade to have made, but one that should be recorded as a trade rather than an accident.

**Coined terms** `[observed]`: `order error adjustments` · `Order Errors (Transaction) report` · `Uber Eats Manager` · `Menu Maker` · `Uber Eats Order Manager` · `Uber Direct` · `Webshop` · `Marketplace` · `Uber Eats Pro` · **`Trip Radar`** · **`Exclusive requests`** · `Upfront fares` · `upfront tip` · `Instant Pay` · `Work Hub` · `Safety Toolkit` · `Uber One` · **`BYOC (Bring Your Own Courier)`** · `Fast Order Release` · `Virtual Restaurants` · `Shop & Deliver` · `proof of delivery` · `Only on Uber` · `Merchant Academy` · `Insights hub` · `acceptance rate` / `cancellation rate` / `satisfaction rate`.

## T14 Voice, tone & accessibility

**Register by audience.** Eater copy is terse and nearly affectless — `Order delivery near you`, `Enter delivery address`, `Deliver now`. Courier copy is second-person, autonomy-forward and mildly motivational (`Flexibility to earn on your terms`, `Your earnings, your way`, "help is just a tap away!" — the only exclamation mark found anywhere on the estate). Merchant copy is consultative B2B with em-dash constructions.

**The register inverts against the stakes.** The eater — who has the least at risk — gets the flattest copy. The merchant, who is being told money will be deducted, gets the warmest framing (`we want to make it right`, `We're always here for your business`). That is the opposite of the Wise gradient, where tone flattens as stakes rise, and it is worth flagging as the less defensible pattern.

**Accessibility statement** `[observed]`, at `uber.com/us/en/about/accessibility/`. Title `Move freely, accessibly`. Six named principles: `Independence` · `Safety` · `Dependability` · `Fairness` · `Choice` · `Compliance`.

- Standard claimed, verbatim: **"We proactively build, test, and resolve barriers to meet WCAG 2.1 Level AA guidelines."**
- "We work proactively to design an accessible platform and fix barriers identified in tests and through user reports."
- Screen readers named: "Uber's web and mobile platforms are accessible to VoiceOver and TalkBack."
- Resource labels: `Safety features` · `Resources for users who are blind or have low vision` · `Traveling with a service animal` · `Features for drivers who are deaf or hard of hearing (HOH)` · `Using wheelchairs and mobility devices` · `Earning on the platform` · `Learn about Uber's web accessibility strategy` · `Need more support?`
- Feedback route: `Provide feedback related to platform accessibility`

**The statement is Rides-weighted.** There is no Uber Eats-specific accessibility content on it, and no Eats-specific statement was found. `[absent]`

**Alt text — genuinely mixed, and the contrast is the finding** `[observed]`

Best in the batch, on the accessibility page hero: "A mosaic tile showing 4 people of different lived experiences. The left tile shows an older man who is getting into a vehicle. The top-center tile shows a driver in a vehicle, smiling and using sign language…" — long, specific, names disability without euphemism.

Also strong on the courier app screenshots, and these are one of the only sources of real in-app string names: "Delivery app interface showing drop-off details for Joséfina B., order RBC35 with 3 items, options to leave at door, take photo, and a button to complete dropoff."

Against that, the same estate ships `"2"`, `"1"`, `"car"`, `"live chat"`, `"message"`, `"phone"` as alt text on the support page, and **raw asset filenames** on the order-errors and pricing pages: `UberEatsPackaging`, `badgesCashInHandGreen`, `" missing_glyph_filled"` (leading space), `checkYellow`, `" alert_filled"`. Carousel controls are exposed as bare text: `Chevron left small` · `Chevron right small` · `1 / 2` · `Down Small` · `X small` · `Arrow launch` · `Three lines`.

**Uber's accessibility statement claims WCAG 2.1 AA, and its flagship accessibility page meets it, while the merchant marketing estate does not.** Filename alt text is a straightforward AA failure. The contrast between one exemplary page and a non-conforming estate is itself the useful benchmark artefact: an accessibility commitment held by a team rather than by a system.

**Live defects recorded honestly**

1. `Log in` (nav) vs `Sign In` (address block) — same action, two labels, one page.
2. `Skip to content` → `#main-content` on `ubereats.com` vs `Skip to main content` → `#main` on `merchants.ubereats.com` and `uber.com`.
3. `Delivery Partner` (title) vs `delivery-person` (slug) in one article.
4. `canceled` and `cancelled` both live in the same help centre.
5. `Missing Items` (title case) vs `Wrong or missing items` (sentence case) in adjacent articles.
6. `My order never arrived` and `Order never arrived` published as separate articles; `What fees might my order include?` and `What fees may apply to my order?` likewise.
7. Footnote numbering bug on the pricing page (`⁴` vs `³` for the same provision).
8. Alt text drift on Uber Direct steps (`Sign up and integrate` in alt vs `Sign up or integrate` visible).
9. `Javascript` (twice) rather than `JavaScript`.
10. The nav calls the marketplace product `Get listed on Uber Eats`; the footer calls it `Marketplace`.
11. Carousels on the order-errors page emit `1/3`, `1/2`, `1/1`, `1/1` with empty panels between — slots with no content.
12. Legacy help paths `/restaurants/` and `/partners/` still linked from live production pages; the `/en/` locale prefix is inconsistently present.

---

## Transferable patterns

1. **Name the two failures that look the same and are not.** `Food condition` ("food arriving cold") and `Food quality` ("food taste or integrity") are separate categories because one is a logistics failure and the other is a cooking failure. Splitting a complaint type along the fault line rather than along the symptom is the move.
2. **Tell the worker not to take the locally rational action, and say why.** "please do not cancel the order in the app because another courier would be dispatched to the same closed restaurant. Instead, call Support." One sentence that gives a system-level reason for a counter-intuitive instruction.
3. **Build the prevention step into the flow and name it.** `Verify your items` is a stage of the courier's trip, with "especially frequently missed items, like drinks" attached. Naming the commonest failure at the moment it can still be prevented beats writing a recovery article about it later.
4. **Use a different verb when the user's action is not what the verb implies.** `Match` instead of `Accept` for a multi-courier offer, because the courier is not the only one deciding. Condition: only worth it when the conventional verb would be actively misleading.
5. **Organise the support tree by temporal position first.** `Ongoing order` / `Past order` as the top split asks the one question that determines which remedies exist. Transfers to disputes, refunds, and anything where "can this still be changed?" is the gating fact.
6. **Publish the rejection possibility before the application.** "Please note: we can't partner with every merchant that applies."
7. **Host the awkward question in the user's own words.** `Am I expected to leave a tip?` — a title most products would never ship.
8. **Negative pattern: watch the euphemism gradient.** `order error adjustment` is a payout deduction called an adjustment, on a page headed `Mistakes happen—here's how we support you`. It is accurate and opaque. If you find yourself writing a compound noun for a thing that takes money from someone, check whether the surrounding page is framing it as a service.
9. **Negative pattern: SEO-driven synonym sprawl has a content cost.** Four words for "courier" on one page buys search coverage and loses the ability to write a consistent instruction. Make it a decision with a stated owner, not a drift.
10. **Do not let a terminology migration live half-done in URLs.** `i-couldnt-find-the-eatereater-was-late` is an artefact that will outlive everyone who remembers what "eater" meant.

## Caveats & gaps

- **`help.uber.com` is entirely unharvested for article bodies.** Every URL — the three audience hubs, the localised `/en/` variants, and deep article URLs with nodeIds — returned HTTP 200 with a completely empty body. This is client-side rendering, not a bot-check and not a 403. Article titles are recoverable verbatim from search-result `<title>` tags and are quoted; bodies are not, and no search-engine paraphrase has been promoted to a quoted string anywhere in this file.
- **No eater-facing tracker state string is recorded.** `Preparing`, `On the way`, `Arriving` and any "latest arrival by" label were not observed. Do not fill them in.
- **The `order.current_state` enum is not published.** `delivery.state_changed` and `order.current_state` are both named in Uber's own docs, but no page enumerates the values. The per-endpoint API reference pages may carry them; they were not fetched.
- **No eater-facing fee line-item name is recorded.** Article titles confirm a fee page exists; its contents were not retrievable. **No regulatory-response fee and no surge/busy-area fee were found on any Uber Eats surface** — absent, not merely unverified.
- **No eater refund window is recorded.** Only the merchant-side figures (96 hours, 30 days, 30 minutes, 70 minutes) were observed. Search paraphrases suggested a 48-hour eater reporting window and a 10-minute out-of-stock response window; neither was verified and both are excluded.
- **No tip default or preset percentages found** on any public surface.
- **Checkout, cart, tip selector and account form labels are all behind auth**; `ubereats.com` serves only a JS shell past the address gate.
- **No Uber Eats-specific accessibility statement exists.** The corporate statement is Rides-weighted and contains no Eats content.
- **No public Uber content style guide, glossary, or voice-and-tone documentation** was located on any surface.
- A browser-rendered or authenticated pass would unlock the eater tracker strings, the eater fee names, the eater refund windows, and the tip UI — which is where essentially all the remaining value on this product sits.

## Sources

1. https://www.ubereats.com/
2. https://merchants.ubereats.com/us/en/
3. https://merchants.ubereats.com/us/en/order-errors/
4. https://merchants.ubereats.com/us/en/pricing/
5. https://merchants.ubereats.com/us/en/faq/
6. https://merchants.ubereats.com/us/en/services/uber-direct/
7. https://developer.uber.com/docs/eats/
8. https://developer.uber.com/docs/eats/guides/webhooks
9. https://developer.uber.com/docs/eats/guides/sandbox
10. https://www.uber.com/us/en/about/accessibility/
11. https://www.uber.com/us/en/deliver/
12. https://www.uber.com/us/en/deliver/basics/before-you-start/how-to-get-support/
13. https://www.uber.com/us/en/deliver/driver-app/
14. https://www.uber.com/us/en/blog/how-to-solve-unexpected-delivery-issues/
15. https://help.uber.com/ubereats — **blocked, empty body**
16. https://help.uber.com/en/driving-and-delivering — **blocked, empty body**
17. https://help.uber.com/merchants — **blocked, empty body**
18. https://help.uber.com/ubereats/article/uber-eats-pricing — **blocked, empty body**
19. https://help.uber.com/en/ubereats/stores/article/my-order-never-arrived — **blocked, empty body**
20. https://help.uber.com/en/ubereats/stores/article/missing-items — **blocked, empty body**
21. https://help.uber.com/en/merchants-and-restaurants/article/managing-refunds-for-missing-or-incorrect-orders — **blocked, empty body**
