# 071. Instacart

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Grocery delivery marketplace (three-sided: customer / shopper / retailer), plus white-label commerce platform |
| Primary URL | https://www.instacart.com/ |
| Corpus rank | 071 |
| Benchmark strength (source list) | Substitutions and delivery states |
| Locale / market observed | en-US (fr_CA declared as an alternate locale on shopper pages, not fetched) |
| Platform observed | Developer/retailer docs (`docs.instacart.com`), shopper-facing corporate web (`company.instacart.com`) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for the consumer surface. Adjacent regimes visible in copy: SNAP EBT as a payment method; alcohol age verification at delivery; state/local pay laws affecting shopper earnings ("Some regions have state or local laws that change how Instacart operates") |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 reachable (3 further URLs blocked) |
| Harvest completeness | Partial — **`www.instacart.com` returned an empty body on every request**, including the homepage and the entire consumer Help Center. All consumer-facing content below is therefore reconstructed from Instacart's *retailer-facing product documentation*, which quotes the consumer UI strings, and from shopper-facing corporate pages. Marked `[documented]` throughout. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Order Status page (concept) | https://docs.instacart.com/connect/post-checkout_guide/concepts/order_status_page | **The canonical customer state table.** Six states with descriptions and permitted actions |
| Replacements flow | https://docs.instacart.com/connect/post-checkout_guide/concepts/replacement_flow | Approve/Refund interaction, `Review changes` |
| Certified delivery flow | https://docs.instacart.com/connect/post-checkout_guide/concepts/certified_delivery_flow | High-value-item signature flow |
| Customer notifications (API ref) | https://docs.instacart.com/connect/api/fulfillment/communications/customer_notifications | **Richest single source in this file** — ~50 customer SMS templates with example content |
| Event callbacks (webhooks) | https://docs.instacart.com/connect/api/fulfillment/communications/event_callbacks | System-side event names + full cancellation-reason taxonomy |
| Replacements (Storefront) | https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/replacements | The three substitution-preference options |
| Checkout (Storefront) | https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/checkout | Field labels, shipping option names |
| After checkout | https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/after_checkout | Batching handoff |
| Order status (Storefront) | https://docs.instacart.com/storefront/learn_about_your_storefront/fulfillment/order_status | Two surfaces: page and banner |
| Delivery flow | https://docs.instacart.com/storefront/learn_about_your_storefront/fulfillment/delivery_flow | `On the way` / `Order complete` — a *different* state vocabulary from the Connect docs |
| Storefront FAQ | https://docs.instacart.com/storefront/learn_about_your_storefront/faq | One question only |
| Glossary | https://docs.instacart.com/glossary | ~60 defined terms with explicit "compare with" pairs |
| Shopping quality (shopper) | https://company.instacart.com/shoppers/shopping-quality | Shopper-side replacement vocabulary + 13-question FAQ |
| Shopper earnings | https://company.instacart.com/shoppers/shopper-earnings | Tipping copy from the earner's side |
| Replacements announcement (shopper blog) | https://company.instacart.com/shopper-community/providing-a-more-straightforward-replacements-experience | The 2025 redesign of the substitution flow |
| **Blocked** | https://www.instacart.com/ · /help · /help/section/360007902791 | Empty body, every attempt |

---

## T1 Navigation & IA labels

**Three separate estates, three separate domains** `[observed]`

Instacart does not run one site. It runs `www.instacart.com` (customer), `company.instacart.com` (shopper + corporate + enterprise marketing), `shoppers.instacart.com` (shopper acquisition and shopper help), `docs.instacart.com` (retailer/developer), and `partner-docs.instacart.com` (shopper app docs, **behind auth**). The audience split is enforced at the DNS level before it is enforced in the copy.

**`company.instacart.com` global nav** `[observed]`: `Get Started` · `Products` · `Earn` · `Company` · `News & Insights` · `Support` · `Get Groceries`

The nav is segmented by *what you want to do with Instacart*, and each segment opens into audience-named groups: `Grow your Business`, `Advertise on Instacart`, `Become a Shopper`, `Partner on Health`, `Shop for your business`. Note `Earn` as a first-class top-level nav item — the shopper audience gets equal billing with customers in the corporate IA.

**Shopper sub-nav, split into two register bands** `[observed]`

| Band | Labels |
|---|---|
| `Onboard` | `Become a Shopper` · `Our Promise to Shoppers` · `Using the Shopper App` |
| `Resources` | `How Earning Works` · `Access Batches` · `Delivering Quality` · `Cart Star Rewards` · `Shopper Rewards Card` · `Shopper Blog` |

`Our Promise to Shoppers` in the nav resolves to a page titled `Instacart's Commitments to Shoppers` elsewhere in the same menu — two labels for one destination, one in first-person-plural and one in third person.

**`docs.instacart.com` nav — organised by *where the software runs*, not by audience** `[observed]`

`Cross-platform` · `Storefronts` · `In-Store Solutions` · `Ads` · `Site Integrations` · `Marketplace Integrations` · `Glossary` · `Support`

**Consumer footer groupings** `[observed]` (rendered inside `company.instacart.com` pages): `Get deliveries with Instacart` · `Top Departments` · `Top Cities` · `For Shoppers` · `For CPG's & Brands` · `Resources` · `More Departments` · `More Cities` · `Instacart Programs` · `Enterprise`

`Top Cities` under a consumer footer link to **shopper job pages** (`shoppers.instacart.com/instacart-jobs-in-chicago-il`), not to city grocery pages. The consumer footer is doing shopper recruitment.

## T2 Value proposition & headline patterns

Consumer hero copy is unreachable. What is observable is the **shopper-facing** and **retailer-facing** value proposition, which is where the interesting register work is.

**Shopper page headlines are second-person and autonomy-framed** `[observed]`

- `How earning with Instacart works` → `Earn what you need, when you need it`
- `The choice is yours` — "How much you work, which batches you take, and how far you drive — it's all up to you."
- `Shopping with quality` → `Shop and deliver with care to make your customer's day.`
- `Know how you're doing`
- `Get clarity into the quality of your shopping`

**The shopper-quality page uses a "we have your back" construction repeatedly** `[observed]`

- `We have your back if items are out of stock` — "We adjust your score up if items were typically harder to find at the stores and times you shop."
- `What helps your score` / `What hurts your score` — a paired positive/negative header set
- `Only verified issues are reflected`

This is the most transferable pattern on the shopper surface: a performance-scoring system explained in **four headers that answer the worker's four actual questions** (how is it shown, what protects me, what helps, what hurts), with the protection header placed *second*, before the punitive one.

**Section headers on the replacements announcement are benefit-first** `[observed]`

`Improved in-app experience` · `Improved recommendations you can count on` · `Less guesswork when comparing replacement options` · `Seamless Updates for Effortless Communication` · `More resources to support delivering excellence` · `What to expect`

Note the casing break: five sentence-case headers and one Title Case (`Seamless Updates for Effortless Communication`) in a single article.

**Retailer/docs headlines are flat and descriptive** `[observed]`: `Order Status page`, `Replacements flow`, `Certified delivery flow`, `After checkout`, `Delivery flow`. No persuasion at all. The register gradient across the three audiences is steep and consistent: persuasive → procedural → declarative.

## T3 CTA inventory

| CTA (verbatim) | Context | Audience | Notes |
|---|---|---|---|
| `Review changes` | Order Status page, `Shopping in progress` and `Review replacements` states | Customer | The single most important CTA in the product. Neutral verb — not "Approve replacements", not "Fix my order" |
| `Approve` | Review changes page, beside each suggested replacement | Customer | |
| `Refund` | Review changes page, beside each suggested replacement | Customer | **`Refund` is offered as a peer of `Approve`, not as a fallback.** Two buttons, equal weight, no default styling described |
| `Replace with specific item` | Replacements dialog | Customer | Preference-setting, not in-flight |
| `Replace with best match` | Replacements dialog | Customer | Pre-selected default when no preference saved |
| `Refund this item` | Replacements dialog | Customer | |
| `Continue to checkout` | Checkout aisle → checkout | Customer | |
| `Place an order` | Checkout page submit | Customer | Article + singular noun, an unusual construction vs the conventional "Place order" |
| `Offers and promo codes` | Checkout page, expandable | Customer | |
| `Get Groceries` | Corporate nav | Customer | |
| `Sign up to be a Shopper` | Corporate nav | Shopper | |
| `How to improve` | Shopper app, `Your stats` screen | Shopper | |
| `View all lessons` | Shopper app, Carrot Academy entry | Shopper | |
| `Skip to main content` | Docs, first in DOM | All | |
| `✨ Ask AI` / `✨ Ask` | Docs header | Retailer | Two labels for one control, side by side |
| `Reply STOP to unsubscribe` | Every SMS notification | Customer | |
| Reply `<approval letter>` | Replacement/refund SMS | Customer | **Approval by single-letter SMS reply** — the lowest-friction approval affordance in this batch |

## T4 Onboarding & getting-started

`[absent]` for the consumer signup flow — behind the blocked domain.

**Shopper onboarding is expressed as a five-item upfront-disclosure list** `[observed]`, under `The choice is yours` and the promise "you'll always see the key details upfront, including:"

1. `Upfront pay`
2. `Store`
3. `Delivery distance`
4. `Number of items and units`
5. `Batch earnings and expected tip`

Followed by a no-penalty guarantee stated as a full sentence: "Choose the batch that's right for you — you're never penalized for not accepting a batch."

**The shopper learning curriculum is itself published, with numbered lessons and one-line scope** `[observed]` — `Shop & Deliver 101`, "The essential skills to nail your first batch":

`01 Finding the right items` · `02 Choosing quality items` · `03 Selecting great replacements` · `04 Seamless checkout` · `05 Smart bagging & insulated bags` · `06 Safely packing your vehicle` · `07 Delivering the order`

Each has a subhead that names the *outcome*, not the content: "Shop smart and track down every item on the list down." (sic — duplicated "down", live typo), "Follow helpful guidance when items are sold out.", "Finish strong with a smooth delivery to your customer's door."

**Replacement-instruction entry points are enumerated as a journey, not a screen** `[documented]` — customers can set replacement instructions "On the product details page · In their shopping cart · At checkout · After checkout · On the order status page". Five moments, spanning pre- and post-purchase. This is the structural reason Instacart's substitution content is stronger than its competitors': the preference is collectable at five points instead of one.

## T5 Form & field labels

**Checkout, delivery order** `[documented]`

| Label | Note |
|---|---|
| `Delivery address` | Validation behaviour documented: if current location is "more than 1 mile from where they want their order delivered, a notification prompts them to confirm the delivery address" |
| `Delivery instructions` | Example values given verbatim as *Go to the side door* and *Leave order at the door*. Also doubles as the phone-number field: "Customers can also add their phone number here" |
| `Membership subscription` | A toggle. **Default-on for trial-eligible customers**, and stateful: "If a customer turns the toggle off, it remains off for future sessions" |
| `Shipping` | Three named options: `Priority`, `Fast`, `Schedule and save` |
| `Payment method` | "A credit card or debit card is required" |

**Checkout, pickup order** `[documented]`: `Store` · `Pickup time` · `Membership subscription` · `Payment method`

Note that the delivery/pickup split is expressed as **tabs** (`Delivery` / `Pickup`), and the retailer can hide the unused tab entirely.

**`Shipping` is a mislabel worth recording.** The three values under it — `Priority`, `Fast`, `Schedule and save` — are same-day delivery speed tiers, not shipping. `Schedule and save` is also the only one of the three that names a benefit rather than a speed, which quietly makes the cheapest option sound like the considered choice.

## T6 Status & state language `[documented]` — PRIORITY

### The three-register problem, stated plainly

Instacart names the same six moments **three different ways** depending on who is reading. This is the core artefact of the file.

| Moment | Customer — Order Status page title | Customer — SMS body | System — webhook callback |
|---|---|---|---|
| Order received | `We got your order` | "We got your order! You can add or edit items before shopping begins." | `Brand new` |
| Shopper assigned | (not a page state) | "We found a shopper for you! Your Shopper is getting your items." | `Acknowledged` |
| Picking started | `Shopping in progress` | "Casey just started shopping — we'll let you know if any item replacements need your approval." | `Picking` |
| Approval needed | `Review replacements` | "Rob replaced: `<order item>`. Reply `<approval letter>` to approve this replacement" | `Order item replacement` |
| Paid for | `Shopping complete` | "Casey has checked out. We'll send you an update when your order is on its way." | `Checkout` |
| In transit | `Out for delivery` | "Your order is on the way! Delivery estimate: ~4:45pm" | `Delivering` |
| Arrived | `Delivered` | "Thanks for using `<retailer>`! Your delivery is complete." | `Delivered` |

Three observations.

**1. The page titles are system-voiced; the SMS is human-voiced.** `Shopping in progress` versus "Casey just started shopping". The page names a *process*; the message names a *person doing a thing*. Instacart shipped both, and the difference is clearly deliberate — the page is a state, the text is an update from someone.

**2. `We got your order` is the only page title that is a sentence.** Every other state title is a noun phrase or past participle (`Shopping complete`, `Out for delivery`, `Delivered`). The first state — the one where the customer is most anxious that the order registered at all — is the one written as a first-person-plural reassurance.

**3. Instacart ships two incompatible consumer state vocabularies simultaneously.** The Connect docs give `Out for delivery` and `Delivered`. The Storefront docs, describing the *same* order status page, give **`On the way`** and **`Order complete`**. Both are current (both last updated 2026-05-14). A content designer reading the docs cannot tell which strings ship.

### Permitted actions per state `[documented]`

The state table also names what the customer *may do*, which is the real information architecture:

| State | Possible actions |
|---|---|
| `We got your order` | `Add or edit items until shopping starts.` |
| `Shopping in progress` | `Review changes.` |
| `Review replacements` | `Review changes.` |
| `Shopping complete` | `None` |
| `Out for delivery` | `None` |
| `Delivered` | `None` |

**Agency collapses to zero at `Shopping complete`.** The copy is honest about this — three consecutive states explicitly labelled `None`. Most trackers pad the terminal states with fake affordances; Instacart writes `None`.

Within `Shopping in progress` the item list is itself segmented into four named buckets `[documented]`: **`found`, `replacements`, `in progress`, and `refunded`** — and the summary line quoted in the docs is "5 found, 1 replacement, and 1 refund". Note the count line switches to singular nouns (`1 replacement`) while the bucket names are plural. A running tally of *what has gone wrong so far* is surfaced as a neutral count, not an alert.

### Failure and exception states `[documented]`

Named separately from the happy path, and only visible in the notification catalogue:

| Failure | Named as | Customer copy |
|---|---|---|
| No shopper available | `Order Canceled (Unbatchable)` | "due to demand in your area, your order can't be fulfilled at this time. Please check back for availability." |
| Store shut early | `Order Canceled (Limited Hours and Inventory)` | "due to shortened store hours, your order could not be fulfilled." |
| Running late | `Late Delivery` | "Your order is now expected to arrive by 10:30 AM. We're sorry for the delay and any inconvenience it causes." |
| Customer unreachable at door | `Customer Missing` | "Your order is here, but your shopper has been unable to get a hold of you. Can you please meet them outside?" |
| Customer unreachable at kerb | `Unable to Find Customer` | "We're unable to find you at `<retailer>`. Let us know when you arrive to pick up your order" |
| No one to run the order out | `Runner Not Found` | "We're sorry, no one is available to bring your order out at the moment. Please pick up your order inside the store." |
| Rescheduled, no slot | `Delivery Rescheduled Unbatchable` | "Due to high demand, your order will be delivered by the first available shopper." |
| Late with no ETA | `Late Pickup (No ETA)` | "your order is running late because no shopper is currently available. We'll update you as soon as your order is ready" |

`Customer Missing` is the standout. The **internal** name blames the customer; the **customer-facing** copy does not — it says the shopper "has been unable to get a hold of you" and then asks a question ("Can you please meet them outside?") rather than issuing an instruction. The fault-assigning noun stays in the webhook; the request-shaped sentence goes to the phone.

### The cancellation taxonomy — 6 reasons × ~40 types `[documented]`

`cancellation_reason` is a closed six-value enum: `customer_driven` · `instacart_driven` · `retailer_driven` · `shopper_driven` · `unbatchable` · `other`. Each expands into named `cancellation_type` values. A selection, verbatim:

- `customer_driven` → `customer mia` (note: the *shopper* reports it, but it is filed as customer-driven), `customer requested since order is early`, `change payment method`, `incorrect customer information (phone/address)`
- `instacart_driven` → `fraudulent customer`, `manual_fraud`, `related accounts abuse`, `system error`, `unauthorized account usage`
- `retailer_driven` → `store early closure`, `too many out of stock items`, `single item order out of stock`, `card decline on reauth`
- `shopper_driven` → `shopper unable to complete order`, **`shopper could not find address`**, `unable to access location`
- `unbatchable` → `unbatchable`, `unable to reschedule as no option found`
- `other` → `too many replacements`, `item and replacement issues`, `pre-picking`, `store outage`, `wrong store hours`, `mass cancellation`, `unknown`, `none`

Two findings. **`shopper could not find address` exists as a named cancellation type** — the "courier can't find the address" state that the brief asked for, and the only place in this whole batch where it is named as a first-class enum value rather than described in prose. And **`too many replacements`** is a cancellation cause: the substitution mechanism can escalate into order death, and Instacart names that threshold.

Note also that `retailer_driven` contains `shopper initiated out of stock` — an event triggered by a shopper, attributed to the retailer. The attribution taxonomy is about *who bears the cost*, not who pressed the button. A content designer reading these enums is reading a liability map.

## T7 Error, failure & recovery `[documented]` — PRIORITY

### The substitution flow, end to end — the flagged benchmark strength

Instacart's answer to the hardest content problem in grocery is a **preference set collected before the failure, a proposal at the moment of failure, and a one-tap adjudication**. Each stage has its own vocabulary.

**Stage 1 — the preference, collected pre-emptively** `[documented]`

Three options, and the exact wording matters:

| Option (verbatim) | Mechanic | Default behaviour |
|---|---|---|
| `Replace with specific item` | "Customers can select up to three backup replacement items from a list of recommended options. Customers can also search for a specific item. Customers must select at least one item to set a specific replacement." | |
| `Replace with best match` | "The shopper will select an item which will be sent to the customer for review." | **Pre-selected**: "For items where a customer hasn't saved a replacement preference, this option is preselected on the replacements screen before checkout." |
| `Refund this item` | "The customer will be refunded for this item if the shopper cannot find it." | |

The three options are a clean **delegation ladder**: *I'll decide now* → *you decide, I'll review* → *don't decide, give me my money*. Each is one short imperative sentence, verb-first, and each names the actor who does the work. The word "substitution" never appears in the customer-facing option names — Instacart says **`replacement`** throughout the consumer product and reserves "substitute" for the glossary definition ("Items that can be substituted for preferred items"). `Replacement` is a thing you receive; `substitution` is a thing done to you.

Note `up to three backup replacement items` — a stated cap. And the preference persists: "Customers' replacement items are saved so that they don't have to choose the replacement the next time they buy these items."

**Stage 2 — the proposal** `[documented]`

When the shopper finds the item gone, the customer's order status page flips to `Review replacements` with "a message inviting the customer to review replacements" and a `Review changes` button. Clicking it opens a page with three sections: the **`Replacement`** section, a **`Refund`** section, and a **`Still shopping for`** section.

`Still shopping for` is the quietly excellent one. It tells the anxious customer which items are *not yet resolved*, so the screen reads as a live snapshot rather than a verdict.

**Stage 3 — adjudication, and the timeout rule** `[documented]`

Two buttons, `Approve` and `Refund`. Then the rule that makes the whole design work, stated in one sentence: **"If the shopper hasn't received a request to refund a replaced item by the time they reach the cashier, the replacement item is purchased."**

That is a **silence-equals-consent timeout anchored to a physical event** (the shopper reaching the till) rather than to a clock. The customer is never told a number of minutes, because the number doesn't exist. This is a genuinely unusual and defensible way to write a deadline, and it transfers anywhere the deadline is determined by someone else's task rather than by a timer.

**Stage 4 — the notification, with reply-to-approve** `[documented]`

> `Rob replaced: <order item>. Reply <approval letter> to approve this replacement, or see more options here: https://…`
>
> `Rob refunded: <order item>. Reply <approval letter> to approve this replacement, or see more options here: https://…`

**These two templates have the same second clause.** The refund notification says "Reply to approve this **replacement**" when no replacement has occurred. A live copy defect in a transactional message, and exactly the class of error that comes from templating two events off one string.

Both lead with the **shopper's first name as the sentence subject** — `Rob replaced:` — attributing the change to a named human rather than to "your order". Compare the upstream state page, which says `Review replacements` with no actor at all.

**Stage 5 — the shopper's side of the same moment** `[observed]`

The shopper never sees the word "substitution" either. They see a decision they are scored on:

- "we'll provide replacement recommendations or suggest a refund based on your customer's preferences"
- "Scan up to three available replacement options that you think your customer would like. We'll suggest which one to choose, or if you should refund"
- "We'll send all scanned options to your customer so they know what else is available in case they'd prefer something else."
- `rating protection` — "any customer rating below 5 stars will be removed if the customer reports a recommended or pre-approved replacement"

The incentive is stated explicitly and in the second person: following the recommendation "counts as a replaced item towards your shopping quality score"; a customer-requested refund "counts as a requested refund towards your score"; but an **`unrequested refund`** damages it.

**`requested refund` vs `unrequested refund` is the single most consequential coinage in this file.** Verbatim definition: "If a customer's original item is unavailable and they don't want a replacement, or Instacart suggests a refund, this will count as a requested refund. If the customer didn't request a refund and Instacart recommends a replacement, making a refund will count as an unrequested refund." A refund is a good outcome or a bad one depending on whether anyone asked for it — and the *platform's own recommendation* counts as a request. Instacart has defined its own algorithmic suggestion as a form of customer consent.

### The "my order was wrong" path `[observed]`

Only reachable from the shopper side, where the verification process is described in detail:

- Reported categories, verbatim: **"damaged, wrong, and missing item issues"** and separately **"Verified item issues"**
- Evidence standard: "Customers must provide unit-level details and submit real-time photo proof of issues as part of their report."
- Adjudication: "deep reviews of receipts and photos from customers are completed to verify the accuracy. Only verified issues will reflect in your shopping quality."
- Stated window: **"it can take up to 7 days from the time you complete an order to when a verified issue is reflected in your shopping quality."**

Note what this tells a content designer: the customer-facing complaint form demands *unit-level details* and *real-time photo proof*, and there is a **7-day** verification lag before consequences land. No customer-facing statement of either requirement was reachable.

### Rating forgiveness — adverse-outcome copy written as protection `[observed]`

Ratings below 5 stars are auto-removed for a named list of causes, verbatim:

`Severe weather events` · `Low stock availability` · `App outages` · `If we suspect customer fraud` · `If a customer routinely gives low ratings` · `If a customer reports issues on Instacart-recommended replacements.`

Plus a stated quota: "We forgive the 2 lowest ratings out of every 100 rated orders and forgive 1 rating if you have fewer than 100 rated orders." And a community-norms sentence that does real work: "As part of a community built on best intent, it's important that customers recognize the effort and care shoppers provide and assume the best of their shoppers."

The last bullet is the interesting one — Instacart removes the rating penalty when the shopper followed *Instacart's own* recommendation and it went wrong. The platform underwrites the consequences of its own algorithm, and says so in the shopper's performance copy.

## T8 Empty states

`[absent]` — no empty-state string was reachable. `www.instacart.com` search, cart, and order-history empty states are all behind the blocked domain. The nearest adjacent copy is the shopper FAQ's answer to a zero-results-style case: "If you are only able to find a few units of a customer's item because it's sold out, the item will count as found." — a partial-fulfilment rule, not an empty state.

## T9 Notifications & system messages `[documented]`

The SMS catalogue is the single best artefact in this file: ~50 templates, each with a named message type, example content, and the callback that fires it. Patterns worth recording.

**Emoji are used, and only in three places.** `🎉` on `Acknowledged` ("🎉 Good news, your delivery should arrive today by 3:00 pm."), `🎉`+`🤗` on `Shopper Arriving (No Alcohol)`, `🎉`+`🍷🍺` on the alcohol variant, and `🏃` on `Customer Acknowledged` ("🏃 Tyra is collecting your bags."). Zero emoji appear in any cancellation, late-delivery, or customer-missing message. **The emoji budget is spent entirely on good news.**

**The customer's first name is interpolated only in the arrival messages**: "🎉 Great news Michael!", "🎉 Great news Luis!" — and the shopper's first name in the progress messages: "Casey just started shopping", "Rob replaced:", "🏃 Tyra is collecting your bags", "Jimmy will be picking up your order". Names appear at the two moments where a stranger is about to be at your door.

**Compensation is stated inline, with the amount, in the same sentence as the apology** `[documented]`:

> "We've saved your items for next time. We apologize and have credited $5 to your account to make it right."

Two variants of every cancellation message exist — one with appeasement, one without — under distinct names (`Order Canceled (Unbatchable)` vs `Order Canceled (Unbatchable With Appeasement)`). **"Appeasement" is Instacart's internal noun for a goodwill credit**, and it is visible in the public API documentation.

**Safety and compliance riders are appended, not separated** `[documented]`:
- Alcohol: "This delivery includes alcohol, so please have your ID ready for age verification."
- Bulky: "As a reminder, your order contains large or heavy items." — appended to *three* different messages (confirmation, delivery started, arriving), so the same reminder fires three times per order
- Masks: "For safety, we ask all shoppers and customers to wear masks at the time of delivery." — **stale COVID-era copy still live in the current template catalogue**

**Temperature control is named as a benefit in the waiting states** `[documented]`: "Items temperature controlled until you arrive.", "We'll keep your items temperature controlled until 10:30 PM." Deployed exactly where the customer's anxiety is *"is my food going off while I'm late?"*.

**The pickup-window expiry ladder is four escalating messages** `[documented]`: `Pickup Ready` → `Pickup Reminder` → `Pickup Window Closing Soon` → `Pickup Window Closed` → `Pickup Last Chance Reminder`. And `Pickup Window Closed` does not say no: "You can still pick up your order today. `<retailer>` will keep your order temperature controlled until 10:00 PM." A state named "Closed" whose copy says "you can still". The state name is for the system; the sentence is for the human.

**Unattended delivery bundles three asks into one message** `[documented]`: "Casey left your order at the door based on your instructions. Rate, tip, and tell us anything we should know." The rating, the tip, and the feedback prompt arrive together, and "based on your instructions" pre-empts the "why did they leave it?" complaint.

**SMS compliance boilerplate** `[documented]`: "Reply STOP to unsubscribe. Message frequency varies with Order frequency. Message & data rates may apply." Note `Order frequency` capitalised mid-sentence. Named reply keywords: `STOP`, `HELP`, `INFO`.

## T10 Disclosures, legal & compliance — fees and tipping

### Consumer fee itemisation `[absent]`

**Not reachable.** No consumer-facing fee line-item names (service fee, delivery fee, heavy-order fee, priority fee, bottle deposit) could be retrieved — they live on `www.instacart.com`, which returned nothing. The corpus should not carry any Instacart consumer fee name. What *is* documented adjacent to fees: the three checkout `Shipping` tiers `Priority` / `Fast` / `Schedule and save`, described only as "different price points relative to how soon an order can be delivered", and `Instacart+` membership, defined in the glossary as providing "benefits, such as free delivery and reduced service fees". So `service fee` and `delivery fee` exist as concepts; their line-item labels were not observed.

### Tipping `[observed]` — from the earner's side only

The customer-facing tip prompt was not reachable. Instacart's *shopper* pages describe the customer's tipping UI in unusual detail, and the rules are the artefact:

- Mechanism: "Customers can select a percentage of their basket size or input a specific dollar amount for a tip."
- Consequence of the percentage model, stated plainly: "If they select a percentage, the tip will vary from the initial batch screen if replacements or refunds are granted." — **the substitution flow moves the tip.** No other product in this batch connects those two mechanics in writing.
- **Asymmetric adjustment windows**: "Customers can increase their tip for up to 14 days after delivery, but can't decrease it after 2 hours." Fourteen days to raise, two hours to lower.
- `Tip protection for zeroed out tips` — "If a customer zeroes out their tip without reporting an issue with their order, Instacart will cover the amount of the tip that the customer removed, up to $10." A named product feature whose entire purpose is to absorb a customer behaviour.
- Share: "Shoppers always get 100% of the tips customers give." / "If a batch is fulfilled by more than one shopper, the tip will be split evenly between the shoppers."
- `Customer education` is a named subsection of the earnings page, and it describes the nudges: "we send reminders if they haven't yet tipped on an order. We also prompt customers to increase their tip anytime they rate a shopper 5 stars". Plus `Bad weather tips` — "Instacart encourages customers to tip more during times of bad weather."

**The tipping ask is documented to the earner, not to the payer.** Instacart publishes a full account of how it nudges customers to tip — on the page read by the people who receive the tips. That is a deliberate transparency move toward one audience about the persuasion applied to another.

### Pay disclosure `[observed]`

`Batch pay` + `Promotions` + `Tips` = `Total earnings`, rendered as an equation. Named components: `Boosts` ("extra pay added to some batches when there aren't enough shoppers in the area"), `Heavy pay` ("always at least $2", qualifying threshold stated: "items in the batch that weigh 8+ lbs must total 50 lbs or more").

Two non-discrimination sentences appear verbatim in the batch-pay explainer — "Batch pay is based solely on job-related criteria… It is never influenced by a shopper's protected demographics or characteristics. Shoppers who are offered the same batch at the same time will always see the same batch pay." A fairness disclosure placed inside a pay-calculation explainer rather than in a policy page.

Guarantee construction worth stealing: **"The batch pay you see upfront will never decrease as long as the batch is completed as accepted"** — a price promise bounded by a condition, in one sentence.

Standard disclaimer: `Actual earnings may vary. Terms apply.*`

## T11 Help-centre architecture

`[absent]` for the consumer help centre — `instacart.com/help` returned an empty body, so the consumer category tree, article titles, and task phrasing are all unharvested. This is the biggest gap in the file.

**What is observable is that Instacart runs at least four separate help systems** `[observed]`, each named differently in the footer:

| Audience | Label | Destination |
|---|---|---|
| Customer | `Help Center` | `www.instacart.com/help` |
| Shopper | `Shopper help` | `shoppers.instacart.com/help/help_center/login` — **requires login** |
| Advertiser | `Ads Help Center` | a third-party KnowledgeOwl instance |
| Retailer | `Support` / `Enterprise Service Desk` | `docs.instacart.com` + a separate service desk |

The shopper help centre is gated behind authentication at the URL level. The shopper's route to it is documented as an in-app gesture instead: "Tap the ? icon in the top right-hand corner of any screen."

**In-app learning is a named product** `[observed]`: `Carrot Academy`, "a library of optional lessons". The navigation path is published as four numbered taps: `Your stats` → `How to improve` → `View all lessons`.

**Retailer docs IA** `[observed]` is organised by lifecycle verb: `Get started` · `Learn about your storefront` · `Enhance your storefront` · `Manage your storefront` · `Integrate with your storefront` · `Releases`. Four of the six are gerund-free imperative verbs applied to the same possessive noun — a tidy, highly copyable pattern for any docs set whose reader owns the thing being documented.

## T12 FAQs

**Retailer FAQ — one question** `[observed]`, at `/storefront/learn_about_your_storefront/faq`:

> `Why can units of measurement be different for similar products? For example, why might one box of raspberries be "1 each" while another is "1 lb container"?`

*Answer summarised:* catalogue data is inherited from multiple sources; Instacart normalises unit abbreviations but does not convert between units, so brands may differ. A single-question FAQ page is itself a finding — it is the one question retailers ask often enough to warrant a page.

**Shopper FAQ — 13 questions across four tabs** `[observed]`. Tab names: `Shopping quality score` · `Ratings` · `Support and resources`.

| # | Question (verbatim) |
|---|---|
| 1 | What orders are included in my shopping quality? |
| 2 | How often does my score update? |
| 3 | What should I do if an item is sold out at the store? |
| 4 | How does Instacart know when items are hard to find? |
| 5 | What is the difference between an unrequested and requested refund? |
| 6 | Is an unrequested refund going to have a significant negative impact on my shopping quality score? |
| 7 | How does Instacart verify issues? |
| 8 | How long does it take to verify issues? |
| 9 | Why is my shopping quality "Standard" if I don't have any verified order issues? |
| 10 | How do ratings work? |
| 11 | What happens if a customer gives me a low rating for something out of my control? |
| 12 | How is the customer rating different from shopping quality? |
| 13 | Where can I access more resources to improve my shopping quality? |

*Answers summarised:* 90-day window, daily refresh; sold-out items count as found if partially available; availability is benchmarked against other shoppers at the same store and hour; requested vs unrequested refunds defined; issues verified from receipts and customer photos within up to 7 days; ratings below 5 stars forgiven for named causes.

**Q9 is the standout.** `Why is my shopping quality "Standard" if I don't have any verified order issues?` is a question written in the voice of a worker looking at a score they believe is unfair, with the disputed value quoted back at them. It is Instacart's equivalent of Wise's `Why does it say my transfer's complete when the money hasn't arrived yet?` — an article whose entire job is to reconcile a system state with the reader's sense of reality. And the answer ends with a three-bullet remedy rather than a justification: "Double check the item's location · Look nearby, or ask a store associate for help · Consider making a replacement by following recommendations in the app."

**Shopper earnings FAQ — 8 questions** `[observed]`, including `What happens if the batch is canceled?` (answer: compensated for time if the customer cancels after work started) and `Is pay the same in every region?` (answer routes to the in-app Help Center rather than answering — a deliberate non-answer on a legally sensitive question).

## T13 Terminology & glossary

Instacart publishes a **~60-term glossary with explicit "Compare with" cross-references** — the single most useful terminology artefact in this batch.

| Term | Instacart's usage | The alternative it rejects |
|---|---|---|
| `shopper` | The person who picks and/or delivers. Three named tasks: pick; pick and deliver; "Collect a last mile delivery order and deliver" | `driver`, `courier`, `picker` |
| `customer` vs `guest` | Explicitly contrasted: a customer "has created a customer account"; a guest "hasn't signed in" | `user` — which is **reserved for admin-tool operators**: "Users of a storefront are referred to as guests or customers" |
| `shop / shopping` vs `pick / picking` | **The same physical act, split by who performs it.** "Customers browse the storefront and fill their cart" vs "A shopper or store associate picks the ordered items off the shelf" | Using one verb for both |
| `check out (v.)` vs `checkout (n./adj.)` | Two separate glossary entries, part-of-speech tagged | |
| `replacement items` | "Items that can be substituted for preferred items" | `substitution` (retained only inside the definition), `alternative` |
| `batch` | "A collection of orders… Shoppers accept batches through the Instacart Shopper app" | `job`, `run`, `trip`, `shift` |
| `full-service` | "a shopper is using the Instacart Shopper app while picking items" | |
| `partner pick` | Store associates picking with the Shopper app | |
| `store associate` | "Formerly retail employee or retailer employee" — **the glossary records its own rename** | `retail employee` |
| `banner` vs `retailer banner` | Two meanings disambiguated in adjacent entries, one UI element and one store brand. `retailer banner` is also "Also known as a *warehouse* in Instacart client configuration" | |
| `Instacart+` | "Formerly Instacart Express" | |
| `Instacart Storefront` | "Formerly Powered by Instacart (PBI)" — PBI retains its own glossary entry pointing to the new name | |
| `Instacart Platform Portal` | "Formerly Instacart Retailer Platform" | |
| `service option` | Four values: `priority ETA`, `standard ETA`, `scheduled`, `immediate` | `delivery speed` |
| `service area` | Defined *against* the obvious alternative: "This approach results in more serviceable addresses than using only postal codes" | postcode-based zones |
| `mixed cart` | "An order that contains groceries and prescriptions" | |
| `staging area` | "The area in a store where orders are put for pick up or last mile delivery" | |
| `prepared meals` vs `order ahead meals` | Split on lead time, explicitly compared | |
| `appeasement` | Internal term for a goodwill credit, leaked into the public notification catalogue | `goodwill credit`, `compensation` |
| `requested` vs `unrequested refund` | Policy-bearing distinction; see T7 | |
| `Cart Star` | Shopper rewards tier programme | |
| `Carrot Academy` / `Carrot Ads` / `Carrot Tags` | The `Carrot` prefix is Instacart's B2B sub-brand | |

**Four glossary entries record a *former* name.** Instacart treats terminology migration as documentable rather than silent, and keeps a stub at the old term pointing forward. That is a content-ops practice worth copying outright.

**Register split across surfaces:** docs say `shopper`, `customer`, `order`; SMS says `your shopper`, `your order`, and the shopper's *first name*; shopper pages say `batch`, `your customer`, `units`. The customer is never "the user" anywhere.

## T14 Voice, tone & accessibility

**Person.** Customer messages are first-person-plural for the company ("We got your order", "We'll send you an update", "we have your back") and second person for the reader. The shopper is addressed as "you" and their customer as "your customer" — a possessive that assigns relationship ownership to the worker. Retailer docs are second person about the retailer's own product ("your storefront", "your customers").

**Register gradient by audience, steepest in this batch.** Shopper marketing carries exclamation marks, testimonial quotes with a delivery count attached (`Kristina / 4264 deliveries`), and colloquialism ("nail your first batch", "Level up your bagging game", "we have your back!"). Customer SMS carries emoji and names. Retailer docs carry neither — no contractions in the state table, no adjectives in the flow descriptions. And the shopper *scoring* copy sits in between: it keeps the second person but drops the exclamation marks entirely.

**Apology construction is consistent and short**: "We're sorry for the delay and any inconvenience it causes." / "We're sorry for the inconvenience, but your order is running late". Apology, then cause, then what happens next — never apology alone.

**Numbers as trust devices** `[observed]`: `approximately 600,000 shoppers`, `more than 2,200 national, regional, and local retail banners`, `nearly 100,000 stores`, `more than 15,000 cities`. Hedged with `approximately` / `more than` / `nearly` rather than rounded silently.

**Accessibility** `[observed]`

- `Skip to main content` present and first in DOM on every docs page
- **Alt text on the docs site is exemplary and worth quoting as a positive benchmark.** The screenshots carry full scene descriptions: "The image shows the Review replacements page in a browser view. On the left is the delivery date and time, the status, a message inviting the customer to review replacements, and the items in the order with 5 found, 1 replacement, and 1 refund. On the right is the map with the customer location, the shopper's name Amida, and a delivery address of 501 Belt Line Rd." That alt text is the *only* reason the consumer UI copy in this file is recoverable at all. Descriptive alt text on product screenshots is a documentation practice with a second-order benefit: it makes the UI legible to anyone who cannot load the image, including machines.
- Docs images carry rendering-hint suffixes in the src (`#border#mobile`, `#border#modal`) — presentation instructions smuggled into the asset path, not an a11y issue but a maintenance smell
- Shopper-page alt text is much weaker: `shopping excellence` repeated five times across five different testimonial portraits; multiple empty alt on non-decorative product images
- Shopper video content is embedded as `.webm` with **no captions or transcript mentioned anywhere**, on a page whose whole purpose is to explain a scoring system. A genuine gap.
- No public accessibility statement was reachable (the footer link goes to `www.instacart.com`, which returned nothing) — `[absent]`

**Live defects recorded honestly**

1. Two incompatible consumer state vocabularies shipped simultaneously (`Out for delivery`/`Delivered` vs `On the way`/`Order complete`), both docs dated 2026-05-14.
2. The refund SMS says "Reply `<approval letter>` to approve this **replacement**" when the event is a refund — wrong noun in a transactional message.
3. Stale COVID copy live in the current template catalogue: "we ask all shoppers and customers to wear masks at the time of delivery."
4. `✨ Ask AI` and `✨ Ask` render adjacently in the docs header — two labels, one control.
5. Live typo in shopper lesson copy: "Shop smart and track down every item on the list down."
6. Casing break within one article's header set (`Seamless Updates for Effortless Communication` among five sentence-case siblings).
7. `Our Promise to Shoppers` (nav) vs `Instacart's Commitments to Shoppers` (same menu, same destination).
8. The bulky-item reminder "As a reminder, your order contains large or heavy items." fires in three separate messages per order.

---

## Transferable patterns

1. **Collect the failure preference before the failure, at every touchpoint on the way in.** Instacart gathers replacement instructions at five points (PDP, cart, checkout, post-checkout, order status). By the time the item is missing, most customers have already answered. Applies directly to any flow with a predictable partial-failure mode — backup payment method, fallback delivery address, alternative payout rail.
2. **Write the delegation ladder, not the binary.** `Replace with specific item` / `Replace with best match` / `Refund this item` maps to *I decide now* / *you decide, I review* / *don't decide*. Three levels of delegated authority, each one short imperative sentence naming who acts. Far better than "substitute Y/N".
3. **Anchor a deadline to someone else's task, not to a clock, when that is the truth.** "If the shopper hasn't received a request to refund a replaced item by the time they reach the cashier, the replacement item is purchased." No fake countdown. Condition: only works when the anchoring event is one the user can picture.
4. **Keep the blaming noun in the system and send the asking sentence to the human.** The webhook is `Customer Missing`; the SMS is "your shopper has been unable to get a hold of you. Can you please meet them outside?" Never let the internal event name leak into the message.
5. **Label the terminal states' affordances `None` rather than padding them.** Three consecutive states in Instacart's own table say `None` under "Possible actions". Honest, and it stops designers inventing filler CTAs for moments where the user genuinely cannot act.
6. **Spend the emoji budget entirely on good news.** Zero emoji in any cancellation, late, or missing-customer message; four in the arrival and progress messages. A defensible, auditable rule.
7. **State the asymmetric window in one sentence, both halves together.** "Customers can increase their tip for up to 14 days after delivery, but can't decrease it after 2 hours." Do not split the generous half and the restrictive half into two places.
8. **Publish the rename.** Four glossary entries carry "Formerly X" and keep a stub at the old term. Terminology migration documented rather than silently completed.
9. **Explain a scoring system in four headers that answer the worker's four questions, and put the protection before the punishment.** `Shopping quality is displayed on a range` → `We have your back if items are out of stock` → `What helps your score` → `What hurts your score` → `Only verified issues are reflected`.
10. **Write descriptive alt text on product screenshots in documentation.** Instacart's docs alt text is detailed enough to reconstruct the UI. It serves screen-reader users, search, and — as this harvest demonstrates — anyone who can only reach the docs.

## Caveats & gaps

- **`www.instacart.com` is entirely unharvested.** The homepage, the consumer Help Center index, every help section URL attempted, and the terms/privacy pages all returned an HTTP response with an empty body. No bot-check page was served; the domain simply returned nothing to `web_fetch`. This removes: the consumer hero and value prop, the entire consumer help IA and article titles, all consumer FAQ questions, the fee page, and any consumer-facing error or empty-state copy.
- **Consumer fee line-item names are absent and must not be inferred.** `service fee` and `delivery fee` are confirmed to exist as concepts (glossary, Instacart+ definition) but their UI labels were not observed. Do not write them into the corpus.
- **`partner-docs.instacart.com/shopper_app/` redirects to an auth service.** The Shopper app documentation — the richest likely source of courier-side in-app strings — is gated. The shopper-side strings in this file come from marketing and blog pages, not from the app's own docs.
- **`shoppers.instacart.com/help/help_center/login` is auth-gated**, so the shopper help-centre category tree and article titles are unharvested. The three-way help-IA comparison in T11 is therefore incomplete on the shopper side.
- **All consumer UI strings in T5, T6, T7 and T9 are `[documented]`, not `[observed]`** — they are quoted inside retailer-facing product documentation describing the consumer product. Instacart may customise them per retailer: the docs say "If you want to customize the messages for your use cases, contact your Instacart representative" and "To customize the page's colors and add your logo… contact your Instacart representative." The strings recorded here are the **defaults**, and a given retailer's storefront may differ.
- The two conflicting state vocabularies (`Out for delivery`/`Delivered` vs `On the way`/`Order complete`) could not be resolved. Both are recorded; neither is asserted as canonical.
- Article *bodies* in the help systems were not opened because the help systems were not reachable. The FAQ answers summarised here are from marketing pages.
- No published content style guide, voice-and-tone documentation, or design-system content guidance was found on any Instacart surface.

## Sources

1. https://docs.instacart.com/connect/post-checkout_guide/concepts/order_status_page
2. https://docs.instacart.com/connect/post-checkout_guide/concepts/replacement_flow
3. https://docs.instacart.com/connect/post-checkout_guide/concepts/certified_delivery_flow
4. https://docs.instacart.com/connect/api/fulfillment/communications/customer_notifications
5. https://docs.instacart.com/connect/api/fulfillment/communications/event_callbacks
6. https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/replacements
7. https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/checkout
8. https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/after_checkout
9. https://docs.instacart.com/storefront/learn_about_your_storefront/fulfillment/order_status
10. https://docs.instacart.com/storefront/learn_about_your_storefront/fulfillment/delivery_flow
11. https://docs.instacart.com/storefront/learn_about_your_storefront/faq
12. https://docs.instacart.com/glossary
13. https://company.instacart.com/shoppers/shopping-quality
14. https://company.instacart.com/shoppers/shopper-earnings
15. https://company.instacart.com/shopper-community/providing-a-more-straightforward-replacements-experience
16. https://www.instacart.com/ — **blocked, empty body**
17. https://www.instacart.com/help — **blocked, empty body**
18. https://partner-docs.instacart.com/shopper_app/ — **redirects to authentication**
