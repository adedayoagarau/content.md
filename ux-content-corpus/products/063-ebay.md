# 063. eBay

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Auction and fixed-price marketplace (C2C + B2C, two-sided, with managed payments) |
| Primary URL | https://www.ebay.com/ |
| Corpus rank | 063 |
| Benchmark strength (source list) | Listing, bidding, and purchase guidance |
| Locale / market observed | en-US (`ebay.com`); policy text names sibling programme brands on DE/AT/CH and FR/IT/ES sites |
| Platform observed | Web — help centre (`/help/*`), policy hub, resolution routing |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Consumer-marketplace. eBay Money Back Guarantee is a **contractual** programme, not a statutory one, and the policy says so by naming its regional equivalents (`eBay Buyer Protection`, `eBay Customer Guarantee`). Payment disputes/chargebacks are explicitly carved out to the financial institution. `Payments Terms of Use` sits in the global footer alongside `User Agreement` and `User Privacy Notice`; `Consumer Health Data` and `CA Privacy Notice` are separately linked. |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Full for T6/T7/T11 — the Money Back Guarantee policy alone is a 13-minute article with six action/timeframe tables and yielded the densest state-and-deadline vocabulary in the corpus. Partial for T2/T5/T8 — no marketing home page, no listing page, no checkout surface harvested. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Customer Service home | https://www.ebay.com/help/home | Six-category IA, "Suggestions for you", assistant widget |
| **eBay Money Back Guarantee policy** | https://www.ebay.com/help/policies/ebay-money-back-guarantee-policy/ebay-money-back-guarantee-policy?id=4210 | **13 min article.** Six action/timeframe tables, three exclusion tables, loss-of-coverage section |
| Returns and refunds | https://www.ebay.com/help/returns-refunds | Three-way split incl. `Where's my item?` |
| Shipping and tracking | https://www.ebay.com/help/ship-track | Buyer/seller split |
| Expected delivery dates for buyers | https://www.ebay.com/help/buying/shipping-delivery/expected-delivery-dates-buyers?id=4025 | EDD calculation, `Estimated between` vs `Get it by` |
| Check the status of your request | https://www.ebay.com/help/buying/resolving-issues-sellers/check-status-request?id=4667 | Request lifecycle, auto-close |
| Get help with an item that hasn't arrived | https://www.ebay.com/help/buying/returns-items-not-received-refunds-buyers/get-help-item-hasnt-arrived?id=4042 | **The INR recovery flow, verbatim steps** |
| How bidding works | https://www.ebay.com/help/buying/bidding/bidding-items?id=4003 | Auction vocabulary + 6-question FAQ |
| Buying | https://www.ebay.com/help/buying | 9 sections, ~50 article titles |
| Selling | https://www.ebay.com/help/selling | 10 sections, ~60 article titles |

---

## T1 Navigation & IA labels

**Help centre top level — six categories, and one of them is not a noun** `[observed]`

`Buying` · `Selling` · `Account` · `Returns and refunds` · `Shipping and tracking` · `Fees and billing`

Two audience categories (`Buying`, `Selling`), one identity category, three cross-cutting task categories. Note that `Returns and refunds` and `Shipping and tracking` are pulled *out* of `Buying`/`Selling` and given peer status, then **re-split internally by audience**. So the same content is reachable by two routes: audience-first (`Buying → Resolving buying problems`) or topic-first (`Returns and refunds → Where's my item?`). eBay maintains both trees with duplicate article entries rather than choosing one.

**`Where's my item?` as a section name** `[observed]`

Inside `Returns and refunds`, the three sections are:

| Section | Character |
|---|---|
| **`Where's my item?`** | The buyer's anxious question, verbatim, with a question mark |
| `Returning items` | Gerund + object |
| `How sellers manage returns and refunds` | A full clause naming the other audience |

This is the eBay equivalent of Wise's `Where is my money?` — the one category in the whole IA phrased from the user's emotional position rather than the system's object model. It sits first. The three siblings are in three different grammatical registers (question / gerund / clause), which reads as inconsistent but is actually audience-signalling: the question is for the panicking buyer, the gerund for the deliberate buyer, the clause for the seller who has wandered in.

**`Buying` — nine sections** `[observed]`

`Buying items` · `How bidding works` · `Resolving buying problems` · `Payments` · `Shipping and tracking items` · `Finding items and managing purchases` · `Feedback` · `Buying limits` · `Working with sellers`

**`Selling` — ten sections** `[observed]`

`Getting started` · `Listing your item` · `Completing a sale` · `Shipping` · `Returns and refunds` · `Seller performance` · `Feedback` · `Selling tools` · `Your eBay Store` · `Advertising`

The asymmetry is the finding. The buyer tree has `Resolving buying problems` and `Working with sellers` — two sections about the counterparty and the failure mode. The seller tree has `Seller performance` — a section about being measured. Buyers are taught to cope with people; sellers are taught to be graded.

`How bidding works` is a section *name* as well as an article title — the same string serving two levels of the hierarchy.

**Global nav (persistent on every help page)** `[observed]`

`Sign in` · `register` · `Deals` · `Brand Outlet` · `Gift Cards` · `Help & Contact` · `Sell` · `Watchlist` · `My eBay` · `Notifications` · Cart

**`My eBay` dropdown — 17 items, the richest in-product IA visible unauthenticated** `[observed]`

`Summary` · `Recently Viewed` · `Bids/Offers` · `Watchlist` · `Purchase History` · `Buy Again` · `Selling` · `Saved Feed` · `Saved Searches` · `Saved Sellers` · `Payments` · `My Garage` · `Preferences` · `My Collection` · `Messages` · `PSA Vault` · **`Issue Resolution Center`**

`Issue Resolution Center` is a top-level destination in the account menu, on its own subdomain (`resolution.ebay.com`). Disputes are not buried in help — they are a named place in the product. `Bids/Offers` as a single slash-joined item is the auction DNA surfacing in the nav. `My Garage` (vehicle fitment) and `PSA Vault` (graded trading cards) are category-specific destinations promoted to global nav.

**Footer** `[observed]`: `Accessibility` · `User Agreement` · `Privacy` · `Consumer Health Data` · `Payments Terms of Use` · `Cookies` · `CA Privacy Notice` · `Your Privacy Choices` · `AdChoice`. `Accessibility` is first, before the legal instruments.

## T2 Value proposition & headline patterns

`[absent]` for marketing-page value proposition — no eBay home page or category landing page was harvested.

What is observable is the **help centre's own value framing** `[observed]`:

> `How can we help you today?`
> `Suggestions for you`
> `Select an action or article to learn more`
> `Get personalized help and see your recent orders` → `Sign in` / `Don't have an account?` `Register now`

`Get personalized help and see your recent orders` is the sign-in prompt written as a benefit pair — one support benefit, one convenience benefit — rather than as an instruction. Same move as Wise's `Log in for personalised support`.

**Article-level headline pattern — every article ends with a `Top Takeaway`** `[observed]`. This is eBay's signature content structure and it is unusual: a single bolded sentence at the *foot* of the article, after all the procedure, summarising the one thing to remember.

- `Get help with an item that hasn't arrived` → "If your item doesn't arrive by the expected delivery date, the seller is the best person to help. You can ask us to step in if they don't provide a solution within 3 business days."
- `Expected delivery dates for buyers` → "You'll see a more precise expected delivery date after you select your preferred shipping option and confirm your delivery address during checkout."
- `How bidding works` → "When bidding on an auction, enter the maximum bid you feel comfortable with and we'll place bids for you, up to that limit."

Each `Top Takeaway` restates the article as a single conditional or instruction, and each is written to survive out of context. Placing it last rather than first is a deliberate reversal of the inverted pyramid — eBay assumes the reader arrived to *do* something, walks them through it, then gives them the sentence to carry away.

**Reading-time labels on every link** `[observed]`: `4 min article` · `2 min article` · `1 min article` · `3 min overview` · `8 min article` · `13 min article` · `9 min article` · `10 min article` · `4 mins article` (typo — plural `mins` on the tax article). Note two content types: `article` and `overview`, differentiated in the label.

Each help-index link is a **title + full-sentence description + duration** triple. The descriptions are complete sentences that answer the question before the click:

> "`Get help with an item that hasn't arrived` If the estimated delivery date for your order has passed and your item hasn't arrived, you can let the seller know by reporting that you didn't receive it. 4 min article"

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| **`Ask eBay to step in and help`** | The escalation action, everywhere | The defining string of this product. A full clause as a button label |
| `Ask eBay to step in` | Same action, shortened in prose | Two lengths for one action |
| `Take action` | Menu item preceding the escalation | |
| `Report an item you didn't receive` | INR entry, action-page link | First person past tense in a button |
| `Report that your item hasn't arrived` | Same action, section heading | |
| `I didn't receive it` | The literal menu item in Purchase History | **First-person confession as a UI control** |
| `I'd like a refund` / `I'd still like the item` | Two radio options on the INR form | The outcome choice, in the buyer's voice |
| `Check the status of my request` | Persistent `Quick tip` button | First person possessive |
| `Go to your open requests` · `Go to Purchases` · `Check delivery information` | Deep links, all verb-first | |
| `See request details` | Purchase-history action | |
| `Close your request` / `Close request` / `Confirm` | Closing flow, three labels in four steps | |
| `Send request` | INR submission | |
| `Contact the seller` | Order page | |
| `Track your item` | Delivery article | |
| `Start a return request` · `Return an item for a refund` | Returns entry | |
| `Help a buyer with an item that hasn't arrived` · `How to handle a return request` | Seller-side twins of the buyer CTAs | |
| `Sign in` · `register` · `Register now` | Three registration labels across two pages | |
| `Go to Help home` | Assistant widget fallback | |
| `Skip to main content` | First in DOM | Accessibility |
| `- opens in new window or tab` | **Appended to every external/new-tab link** | See T14 |
| `Was this article helpful for you?` | Foot of every article | Feedback prompt as a heading |

**`Ask eBay to step in and help` is the most quotable CTA in the corpus.** Nine words, naming the actor (eBay), the action (step in) and the intent (help). It concedes that eBay was *not* previously in the conversation — the buyer and seller were — and frames arbitration as joining rather than adjudicating. The same phrase is used for both audiences (`Ask eBay to step in and help for buyers` / `…for sellers`), so neither party feels the platform is the other's.

**`I didn't receive it` as a menu item** `[documented]` — from the steps: "Select **More actions** beside the item and then **I didn't receive it**." First-person past-tense as an in-product control, not a help-article title. This is the Wise confession-title pattern moved *into the UI*, which is a step further than Wise goes.

**`I'd like a refund` / `I'd still like the item`** — the outcome choice, phrased as the buyer would say it, with the contraction intact. Two options, both in first person, one of which is *not* a refund. Offering "I'd still like the item" first-class prevents the flow from being a refund funnel.

## T4 Onboarding & getting-started

Seller-side, `[observed]` from section indexes:

`Start selling on eBay` — "Whether you want to make some extra cash, clear out unwanted items from around the house, or even start a business, it's easy to start selling on eBay."

Three-tier ambition in one sentence (extra cash → declutter → business), the same audience-spanning move Shopify makes with its hero rotator, compressed into a subordinate clause.

`Registering as a seller` — "When you register as an eBay seller, we'll confirm your identity, checking account or debit card details for payouts, and business details if applicable." KYC named up front, as on Etsy.

`Start getting paid on eBay` · `Updating your checking account details for payouts` · `Listing tips overview` · `Selling internationally` · `Pricing your items`

Buyer-side onboarding is `[absent]` as a sequence — eBay does not publish a "getting started buying" flow. `Buying as a guest` is the closest, and it is framed as a *loss*: "You can shop for most things on eBay without needing an eBay account, **but you'll miss out on the benefits of being a member.**" Guest checkout documented with its downside stated in the same sentence.

**The guest penalty is made concrete in the recovery flow** `[documented]`: `Get help if you bought as a guest` is a separate 3-minute article, and the MBG requires an account for case escalation. eBay tells you the cost of guest checkout at the point of purchase *and* gives it a dedicated recovery article — both ends of the consequence.

## T5 Form & field labels

`[documented]` unless noted.

- `More actions` / `More Actions` — **two capitalisations of the same menu in one article**
- `I didn't receive it` — menu item
- `I'd like a refund` · `I'd still like the item` — checkbox pair; the article says "Check the box beside", i.e. checkboxes, not radios, for a seemingly exclusive choice
- `See request details` · `Close your request` · `Ask eBay to step in and help` — action-menu items
- `Take action` — action-menu item
- Reason selectors, described not labelled: "Select your reason for closing the request from the dropdown, and add details if you want to." · "Select a reason from the dropdown menu, then select **Confirm**."
- `Doesn't fit my vehicle` — a named return reason (eBay Guaranteed Fit)
- Item-condition values: `New with tags/box` · `New without tags/box`
- `6-digit pickup code` · "scan the buyer's QR code" — in-store pickup verification
- `Order details` · `Purchase history` — named pages used as evidence locations in policy text

**Delivery-estimate field labels on listings** `[observed]`, the load-bearing distinction:

> "**`Estimated between`** delivery dates are calculated by eBay, whereas **`Get it by`** delivery dates are indicated by the seller."

Two field labels whose *difference is who computed the number*, disclosed in one sentence. The buyer can tell from the label alone whether they are reading eBay's model or the seller's promise. This is an outstanding piece of provenance microcopy and the single most transferable string in T5 across the whole corpus — it solves the "whose estimate is this?" problem with two words of label rather than a tooltip.

## T6 Status & state language — PRIORITY

eBay's state model is unusual: rather than a status enum on the order, the vocabulary is built around **two named objects with lifecycles** (`request` and `case`) plus a **date-resolution rule**.

### `request` → `case`: one object that is renamed when the platform joins

`[observed]` — the transition is documented as a *label change*, twice, in two different articles:

> "If you had already asked eBay to step in, **you'll see 'case' rather than 'request'.** You can still close it if things are resolved."
> "If you've already asked eBay to step in, you'll see 'case' rather than 'request'. You can still close it if things are resolved."

This is the cleanest state-naming pattern in the corpus. The same underlying object carries two user-facing nouns depending on whether eBay is a participant. The user is told the rename will happen and told that their capabilities are unchanged ("You can still close it"). Most products would either use one word throughout (losing the signal that the platform is now involved) or change the word silently (producing a support ticket).

### Request/case lifecycle states

`[documented]`

| State | Evidence |
|---|---|
| open | "check your **open request**", "Go to your open requests" |
| awaiting seller response | "If it's been less than 3 business days since you opened the request and the seller hasn't responded yet…" |
| escalated | "Once you've asked us to step in, we'll review all the details and respond to you and the seller within 48 hours." |
| resolved / closed by buyer | "If your item has arrived, or you no longer want to return it, you can close your request." |
| **auto-closed for inactivity** | "Requests that show **no activity for 21 business days** are closed automatically." |
| closed automatically on refund | `[documented]` via MBG: full refund closes the case |
| under appeal | "you can appeal by providing new information within **30 calendar days** of the case being closed" |

**Irreversibility stated twice, in two registers** `[observed]`:
> "You can't reopen a return or case after you close it, and you can't submit a new one for the same transaction."
> `Tip` — "You won't be able to re-open the request or case once it's closed."

One as flat prose, one as a `Tip` callout. Same fact, two placements, because it is the fact most likely to be missed.

### Delivery-date resolution — a three-row rule, not a status

`[observed]` — the MBG resolves which date governs, and publishes the rule as a table:

| Condition | Governing date |
|---|---|
| "When tracking shows the item was delivered/collected **before** the estimated delivery date" | `Actual delivery/collection date` |
| "…**after** the estimated delivery date" | `Estimated delivery date` |
| "When no tracking information is available" | `Estimated delivery date` |

Two defined terms sit under this: `estimated delivery date` — "(the latest date in the estimated delivery range that was provided to the buyer at checkout)" — and `actual delivery date` — "(the date that tracking confirms the item was delivered, or the date that an item was collected)". The compound `estimated or actual delivery/collection date` then appears throughout the policy as a single operator.

The rule is buyer-favourable in every row: whichever date is *later* governs, so all the buyer's clocks start as late as possible. eBay does not say this out loud; it publishes the table and lets the reader derive it.

### Delivery / tracking states named

`[documented]`: `delivered` · `attempted delivery` · `in transit` (implied via "follow your package online all the way to your shipping address") · `Pre-transit` (n/a — Etsy's term) · carrier `first scan` ("shipping on time is considered the moment of the carrier's first scan").

**`the carrier's first scan`** is used as the legal definition of "shipped" for seller-protection eligibility — a physical event, externally verifiable, substituted for a seller-declared state. Compare Etsy, where `Shipped` means the seller pressed a button.

### Listing / bidding states

`[observed]` — the auction vocabulary, which no other product in this domain has:

`auction-style listing` · `starting price` · `reserve price` · `highest bidder` · `automatic bidding` · `maximum bid` · `bid retraction` · `Second Chance Offer` · `bid sniping` · `shill bidding` · `private listing` · `ended early` · `relisted`

Three state-adjacent findings:

1. **A live experiment is disclosed in the help article**: "We're testing **extended bidding** on select Trading cards and Vehicles auctions. If a bid is placed in the final minute of an auction, the remaining time will reset to 60 seconds until all bidding stops." A behavioural change to a core mechanic, announced in help rather than in a release note, scoped to named categories.
2. **A deliberate delay is explained by its purpose**: "payment will be taken automatically **after 1 hour** (or instantaneously if shopping on eBay Live)… The one hour autopayment delay gives buyers time to update details such as their payment method or shipping address, add coupons or giftcards, or opt-in to optional services such as PSA Vault or Authenticity Guarantee." A system latency documented as a *feature*, with four named uses for the hour.
3. **`Why did the item I was bidding on disappear?`** — a state change with two causes, one of which incriminates eBay: "The seller may have ended the listing early – **although this is something we strongly discourage.** Or, if the seller breached one of our policies, we may have had to cancel the listing."

`Buying limits and restrictions` is a named account state: "we occasionally place limits or restrictions on a member's buying activity."

`Transaction holds` is a named seller money state: "Funds from your eBay sales may be placed on hold until a transaction has been completed successfully, or while we confirm information about your account."

## T7 Error, failure & recovery — PRIORITY

The eBay Money Back Guarantee is the most structurally sophisticated recovery document in the corpus. Its architecture is the finding.

### The three covered failures, named as clauses about the counterparty

`[observed]` — "eBay Money Back Guarantee applies when:"

- `The buyer doesn't receive an item`
- `The item received by the buyer doesn't match the listing` — with two named sub-cases: "The seller sent the wrong item, or" / "The item arrives broken, damaged, or faulty"
- `The seller doesn't fulfill their return policy` — "as stated in the listing"

All three are **full clauses with a grammatical subject**, and the subject alternates: buyer, item, seller. The third is the interesting one — a failure of the *seller's own stated policy*, which makes the seller's listing text contractually enforceable through the platform. That is a different class of protection from "item not received" and most marketplaces do not offer it.

The one-line summary (meta description and intro) compresses all three: "buyers can get their money back if an item **didn't arrive, is faulty or damaged, or doesn't match the listing**."

### The policy is organised by failure mode, and each mode gets the same five sub-sections

`[observed]` — the structural pattern, repeated three times:

1. `When the buyer doesn't receive an item` → `Actions & time frames…` → `Deciding the outcome…` → `Exclusions and special coverage…`
2. `When the item received by the buyer doesn't match the listing` → same three
3. `When the seller doesn't fulfill their return policy` → `Actions & time frames for "remorse" returns` → `Deciding the outcome…`

**Actions → outcome → exclusions**, in that order, for every failure mode. The reader learns what to do, then how it will be judged, then when it won't apply. Publishing the *decision criteria* between the procedure and the exclusions is the move worth stealing: most policies give procedure then exclusions and leave adjudication opaque.

### The action/timeframe table — a two-column contract between three parties

`[observed]` — headers `**Action**` | `**Time frame**`. For item-not-received:

| Action (verbatim row label) | Time frame (verbatim) |
|---|---|
| `The buyer reports that the item hasn't arrived or was not available for collection` | Earliest: "Once the estimated or actual delivery/collection date has passed" · Latest: "**30 calendar days** after the estimated or actual delivery/collection date has passed" |
| `The seller responds to the buyer's report` | Latest: "**3 business days** after the report date" |
| `Ask eBay to step in` | Earliest: "**3 business days** after the report date" · Latest: "**21 business days** after the report date" |

For not-as-described:

| Action | Time frame |
|---|---|
| `The buyer requests a return` | "**30 calendar days** after the estimated or actual delivery date **or within the seller's stated returns window, whichever is longer**" |
| `The seller responds to the buyer's request` | "**3 business days** after the request date" |
| `The buyer sends the item back` | "The latest date to ship the return will be shown in an email sent by eBay to the buyer, as well as within the return request" |
| `The seller issues a refund` | "**2 business days** after receiving the returned item." |
| `Ask eBay to step in` | Earliest: "Once the seller has accepted the return, or 3 business days after the request date" · Latest: "**21 business days** after the request date, if the seller never responded" **or** "**10 business days** after the refund deadline has passed, if the seller is issuing a refund" |

**Every actor's obligation has a deadline, including eBay's own** ("we'll… respond to you and the seller within 48 hours"). The table is symmetrical: it is as much a promise to the seller about how long the buyer has, as to the buyer about how long the seller has.

Note the **two conditional latest-dates** for asking eBay to step in — the deadline depends on which failure path you're on (seller silent vs seller refunding). A single "latest" would have been simpler and wrong.

`eBay may hold the return request open for up to **35 business days** after the date the return was accepted.` — a platform-side extension disclosed alongside the user-side deadlines.

**Category-specific window compression** `[observed]`: "Trading cards, bullion, coins, paper money, and items that are sold as not working or for parts only" — "the buyer must request a return **no later than 3 calendar days** after the estimated or actual delivery date". Thirty days becomes three for fungible/gradeable goods. Event tickets get the opposite treatment: "**30 calendar days** after the estimated or actual delivery date **or 7 calendar days after the event date, whichever is later**."

`30 calendar days` vs `3 business days` vs `21 business days` vs `2 business days` vs `35 business days` vs `10 business days` vs `48 hours` vs `3 calendar days` — **eBay distinguishes calendar days from business days consistently and never once writes a bare "days".** That discipline is the baseline every deadline-bearing product should meet.

### The INR recovery flow, in the buyer's own words

`[observed]` — `Get help with an item that hasn't arrived` is structured as four sections mapping to the buyer's actual sequence:

`Check if your item is on its way` → `Report that your item hasn't arrived` → `Ask eBay to step in and help` → **`If your order arrives after you've reported it`**

The fourth section is the one most products omit: what to do when the failure resolves itself mid-dispute. eBay gives three branches:

- "**If there's a problem with the item or you want to return it**, you'll need to close your item not received request, and open a return request instead."
- "**If you've already received a refund**, get in touch with the seller about what to do next. For example, you could: `Send the item back and keep the refund` · `Keep the item and arrange to reimburse the seller`"

Offering the buyer two *ethically framed* options for an over-refund — and letting them choose — rather than automatically clawing back, is a genuine trust decision rendered as two bullet points.

**De-escalation before escalation** `[observed]`:
> `Tip` — "If the tracking for your item shows that it's been delivered, check with a neighbor in case you weren't home when the package arrived and they took delivery of it for you."
> "If it's been less than 3 business days since you opened the request and the seller hasn't responded yet, **give them a little more time. Most sellers are happy to help once they know there's an issue.**"
> "You don't need to ask us to step in as soon as the order is eligible though. If you and the seller are still talking, you can give them a bit longer to sort things out."

Three separate instances of eBay actively slowing the buyer down, each with a reason. "Most sellers are happy to help once they know there's an issue" is a claim about the counterparty's good faith, used as de-escalation copy. Then immediately bounded: "**Don't wait too long though.** Requests that show no activity for 21 business days are closed automatically."

Slow down → here's why → but here's the hard limit. That three-beat structure is the best de-escalation pattern in the corpus.

### Partial-delivery disambiguation with a worked example

`[observed]` — `What to do if you've only received some of the items you've purchased`:

> "If you bought more than one item from the same seller, but one of them was missing when your order arrived, you can use the button above to report that you didn't receive an item.
> **For sets and bundles, if something's missing, you need to open a return request instead.** For example, if you bought a set of six paintbrushes but only received four, you can return the set for a full refund or the seller may offer to let you keep the ones you received and give you a partial refund."

Two superficially identical situations routed to two different flows, with a concrete six-paintbrushes example to make the distinction stick. The example also names both possible outcomes (full refund on return, or keep-and-partial-refund).

### Exclusions written as condition → verdict pairs

`[observed]` — the exclusion tables pair a circumstance with a bare `Covered` / `Not covered`, and several rows are **split**:

- `Items collected by a third party on behalf of the buyer` → `Not covered`
- `The buyer arranged their own shipping method, such as a courier pickup` → `Not covered`
- `The buyer provided an invalid or incorrect address at checkout` → `Not covered`
- `The item was sent to another address after original delivery` → covered if forwarded via an eBay programme; "Not covered: The buyer used **third-party freight forwarding or mail redirection**"
- `The item was shipped internationally and couldn't be delivered because import charges … weren't paid` → "Not covered: The buyer didn't pay applicable import charges **for any other reason**"
- `The buyer chose an In-store pickup` → "Not covered: The buyer was notified that the item was ready for collection, but did not collect it within the specified time frame"
- `The buyer refused delivery of the item` → "Not covered: The buyer refused delivery **for any other reason**"
- **`The buyer returned the item used or damaged`** → "**Covered:** The use was necessary to determine the quality or functioning of the item, or the damage was the result of that use"
- `There are strong indicators that the item is counterfeit` → `Covered`
- `The item arrived after the latest estimated delivery date` → `Covered`
- `The item no longer has value` → enumerated: "A perishable item that has expired" · "A ticket for a cancelled event" · "A live animal that has expired"

The used-or-damaged row is remarkable: eBay carves out an exception *in the buyer's favour* inside an exclusion list, for the reasonable act of testing the item. And "A live animal that has expired" is a clause no content designer wants to write, written plainly.

**Excluded item categories** `[observed]`: `Real Estate, Websites, Businesses for Sale` · `Digital content, Intangible goods, Non-fungible tokens (NFTs) including physical items combined with or attached to NFTs` · `Classified Ads` · `Services` · `Sports trading card case breaks, box breaks, and pack breaks that are sold by pre-approved sellers` · `Travel tickets or vouchers` · `Industrial equipment and heavy machinery` · `Motor vehicles, including recreational vehicles, aircraft and boats`.

**Excluded payment method, stated as a single rule** `[observed]`: "Items paid for where **any part of the payment was completed outside of eBay** (such as bank transfer, cash, money orders, escrow services)". "Any part" closes the partial-off-platform loophole in three words.

### Loss of coverage — protection framed as forfeitable

`[observed]` — "buyers can lose protection if they:" `Voluntarily close a request or case, or` · `Open duplicate claims using other resolution methods, or` · `Engage in fraudulent or abusive buying behavior, or` · `Violate an eBay policy`

Then `Fraudulent or abusive buyer behavior`, "This includes, but is not limited to:"

`Colluding with a seller to wrongly declare an item's value for customs` · `Filing a chargeback after receiving a refund` · `Claiming an item was not received when there is proof of delivery to the address provided on the Order details page` · `Falsely claiming an item was not as described` · `Opening duplicate cases using other buyer protection programs` · `Returning an item other than the original item received` · `Using or damaging an item and then returning it`

Seven named abuses, each a gerund phrase naming the act. **`Using or damaging an item and then returning it`** sits in direct tension with the exclusion-table row that *covers* returning a used item — the difference is intent, and the policy leaves the reader to reconcile them. Recorded as a genuine ambiguity in an otherwise precise document.

### Routing CTAs split by audience, inline in the policy

`[observed]`: "Need to report a problem or not sure about the next steps?" → `For buyers:` `Get help with an item that hasn't arrived` · `Return an item for a refund` → `For sellers:` `Help a buyer with an item that hasn't arrived` · `How to handle a return request`

A policy document that ships its own action links, labelled by audience, mid-article.

### Refund mechanics and timing

`[observed]`: "If you're getting a refund, it will go back to your original payment method. **Refunds are typically available within 3-5 business days.**" · `Tip` — "If the seller promised a refund but hasn't issued it, you can ask eBay to step in and help."

Return-shipping responsibility as a two-row table `[observed]`:

| Reason for return | Who is responsible for return shipping |
|---|---|
| `Items that don't match the listing` | `Seller` |
| `"Remorse" or "change of mind" returns` | `Per the seller's return policy in the listing ("free returns" or "buyer pays")` |

Two rows. The entire cost-allocation question answered in a table a buyer can read in four seconds.

## T8 Empty states

`[observed]` — one, in the help-centre search widget:

> "We're sorry, we couldn't find any results that match your search. Please try again."
> "To help you find what you're looking for:"
> `Try different search terms` · `Use more general search terms` · `Make sure all words are spelled correctly`

Apology, then three concrete remedies ordered from cheapest to most effortful. The remedies are specific ("more general search terms") rather than the usual "try again with different keywords".

Also present in the same widget `[observed]`: `Browse Help Articles` and `Need more help?` → `Go to Help home` — the no-results state offers a *different modality* (browse) rather than only re-searching.

Other empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]` unless noted.

- eBay-sent return deadline email: "The latest date to ship the return will be shown in **an email sent by eBay to the buyer**, as well as within the return request." — the same fact surfaced in two places by design.
- eBay decision SLA: "we'll review all the details and respond to you and the seller **within 48 hours**, though occasionally it might take longer if we need more information."
- Guest order confirmation: "If you bought as a guest, the expected delivery date will be in your order confirmation email."
- Seller-side notification named: `Sending invoices to buyers`
- `Notifications` is a global-nav item with a `Loading...` placeholder in server HTML `[observed]`.

**In-article callout types, named** `[observed]`: `Quick tip` · `Tip` · `Top Takeaway` · `On this page` · `Need more help?` · `Was this article helpful for you?` · `Related help topics` · `You might also be interested in:` · `Helpful links`.

`Quick tip` and `Tip` are distinct: `Quick tip` appears at the *top* of an article carrying an action button; `Tip` appears inline, carrying advice. The distinction is consistent across the articles harvested.

**Assistant widget copy** `[observed]`: `Suggested Articles` · `Suggested queries` (rendered twice consecutively) · **`The more details you provide, the better i can understand and assist you,`** — note the lowercase `i` and the trailing comma. A defect in the AI-assistant prompt copy, live on the help home and on multiple article pages.

## T10 Disclosures, legal & compliance

**The programme has three regional brand names, disclosed in the policy itself** `[observed]`: `eBay Money Back Guarantee` (US/UK etc.) · `eBay Buyer Protection` (DE/AT/CH) · `eBay Customer Guarantee` (FR/IT/ES/befr.ebay.be). One policy document, three market-facing names, all stated in the text. Any content designer working on a multi-market protection programme should note that eBay chose to *publish* the name variance rather than serve three isolated pages.

**Related named programmes** `[observed]`: `eBay Authenticity Guarantee` · `Global Shipping Program` · `eBay International Shipping` · `eBay Guaranteed Fit` · `eBay Business Equipment Purchase Protection` · `eBay Vehicle Protection` · `payment dispute seller protections` · `Seller protections` · `Abusive buyer policy` · `Condition of returned items policy` · `Images, video and text policy` · `signature confirmation requirements` · `Unpaid item policy` · `Non-binding bid policy` · `Shill bidding policy` · `Order cancellation policy` · `Feedback policy` · `Feedback manipulation policy` · `Global seller performance policy` · `Seller standards policy`.

**Threshold-triggered requirements** `[observed]`: "Signature confirmation, on orders with a total cost of **$750 or more**" — stated twice in the policy plus once more for returns. A single dollar threshold changing the evidentiary standard.

**Media closing fee disclosed in a footnote** `[observed]`: "In addition to the referral fee, media items incur a closing fee **$1.80 per item**." (n/a — Amazon). eBay's equivalent: `Unpaid item policy` — "Buyers must pay for the items they purchase on eBay **within 4 calendar days**."

**Final-sale carve-out** `[observed]`: "eBay Money Back Guarantee does not cover **final sale** purchases on the basis that the item doesn't match the listing." with a linked `Final sale definitions by product category`.

**Binding-contract disclosure at the point of bidding** `[observed]`:
> `Tip` — "Remember, a bid is a **binding contract**. When you bid on an item in an auction, you're committing to buy it if you win."

And enforced in the FAQ: "Whenever you place a bid, you're committing to buy the item if you win the auction. For that reason, **we don't allow buyers to cancel orders after winning an auction.**" Legal concept → consequence → policy, in three sentences, at the moment of the action rather than in terms.

**`Non-binding bid policy`** exists as a counterpart: "there are some categories where bids don't create a formal contract between the buyer and seller." The exception to the binding rule has its own named policy.

**Tax disclosure written as a dependency list** `[observed]`: "Whether the tax is included in the listing price, added at checkout, charged at the border, or paid directly by the buyer **depends on the seller's status, the order price, the item's location, and your shipping address.**" Four outcomes, four variables, one sentence — rather than a jurisdiction table.

**Free-shipping claim, bounded** `[observed]`: "If you see a free shipping message in a listing, you can expect to receive your item **within 4 business days** and you won't be charged for delivery. You'll see free 1, 2, 3, or 4 day shipping in the listing, as well as the date you can expect to get your order by." Claim, ceiling, and the promise that the specific number is shown.

**Appeals window** `[observed]`: "the buyer or seller may submit an appeal **within 30 calendar days** of eBay's decision" — symmetrical, named for both parties, with matching articles (`Appeal the outcome of a case as a buyer` / `…as a seller`).

## T11 Help-centre architecture

Three-level with a duplicated cross-tree: **category → section → article**, where `Returns and refunds` and `Shipping and tracking` exist both as top-level categories and as sections inside `Buying`/`Selling`. Article IDs (`?id=4042`) are stable across paths, so the same article is legitimately reachable at several URLs — and the breadcrumbs differ accordingly. Observed: `Get help with an item that hasn't arrived` sits under `Customer Service › Returns and refunds › Where's my item?` on one route and under `Customer Service › Buying › Resolving buying problems` on another.

**Article-title grammar — four shapes:**

| Shape | Examples |
|---|---|
| Verb-first imperative/gerund (dominant) | `Get help with an item that hasn't arrived` · `Return an item for a refund` · `Check the status of your request` · `Ask eBay to step in and help for buyers` · `Appeal the outcome of a case as a buyer` · `Tracking your item` · `Refunding buyers` |
| `How <noun> works` / `How to <verb>` | `How bidding works` · `How to handle a return request as a seller` · `How buyers can cancel an order` · `How sellers can cancel an order` |
| Noun phrase | `Expected delivery dates for buyers` · `Return shipping for buyers` · `Seller performance overview` · `Transaction holds` · `Buying limits and restrictions` |
| `<X> for buyers` / `<X> for sellers` suffix | `Return shipping for buyers` / `Return shipping for sellers` · `Shipping rates for buyers` / `Shipping rates for sellers` · `Delivery date options for sellers` · `Ask eBay to step in and help for buyers` / `…for sellers` |

**The `for buyers` / `for sellers` suffix is eBay's audience-disambiguation device**, and it is used systematically — at least eight title pairs. Where Etsy segments by URL parameter and a toggle, eBay segments **in the title string**. Both work; eBay's is more robust to deep links and worse for title length.

**Cross-audience pointers inside articles** `[observed]`:
> "Are you a seller looking for information about expected delivery dates? Read our article on `delivery date options for sellers`"
> "Are you a seller looking to help a buyer with an item that hasn't arrived? Read our article on `responding to an item not received case`"

A one-line question at the top of the article that ejects the wrong audience immediately. Placed above the fold, before the content. This is the low-tech version of Etsy's segment toggle and arguably more discoverable.

**Article furniture, in order** `[observed]`: `<N> min article` → H1 → `On this page` (anchor list) → intro sentence → sign-in prompt (where relevant) → `Quick tip` with action button → cross-audience pointer → H2 sections → `Top Takeaway` → `Was this article helpful for you?` → `Related help topics` → `See other articles in:` → `You might also be interested in:` (three to five full title+description+duration triples).

Five distinct routing layers after the content ends. No `Contact us` on article pages at all — human contact is reachable only via `Help & Contact` in the global nav and the `Issue Resolution Center` in `My eBay`.

**Help home routing** `[observed]`: `How can we help you today?` (search) → assistant widget → `Suggestions for you` → sign-in prompt → six `Popular article` links with durations → `Browse help articles` (the six categories). Personalisation offered, then popular articles, then the tree — the same precedence order as Wise.

## T12 FAQs

**Placement: inside articles, under `Frequently Asked Questions`, as an accordion with answers present in server HTML.** `[observed]` — from `How bidding works`:

| # | Question (verbatim) | Answer covers (summarised) |
|---|---|---|
| 1 | Where can I find my bidding history? | `My eBay` → `Bids/Offers`; shows current bids, lost auctions and Best Offers; items can be checkbox-selected and deleted |
| 2 | What is private bidding? | Sellers can make listings private so bidders and buyer stay anonymous; a note appears on such listings |
| 3 | Why did the item I was bidding on disappear? | Seller ended it early (discouraged), or eBay cancelled it for a policy breach |
| 4 | Why am I getting a message to contact the seller when trying to place a bid? | Seller-set buyer requirements, e.g. shipping destination; contact them and they may change it |
| 5 | Why can't I bid in my friend's auction? | Shill bidding is prohibited; links the policy |
| 6 | Why can't I cancel my order after winning an auction? | Bids are binding; links the order cancellation policy |

**Structural notes.** Six questions, **five of which begin `Why`** — and all five `Why` questions are about something the user *cannot do* or something that *went wrong*. Q1 is the only "where/how" question, and it is first.

This is a **grievance FAQ**, not a how-to FAQ. Every entry after the first answers a blocked action. Ordered: capability → privacy concept → disappearance → block → block → block. The three consecutive `Why can't I…` questions at the end form an escalating sequence of prohibitions, each answered with a named policy link rather than an apology.

Q5 (`Why can't I bid in my friend's auction?`) is the standout: a question no seller would write, phrased exactly as a confused user would, answering an accusation the user doesn't know they're under. The answer opens with a principle ("It's important to us that auctions are always fair and honest") before naming the offence.

## T13 Terminology & glossary

| Term | eBay's usage | The alternative it rejected |
|---|---|---|
| `request` → `case` | One object, renamed at the moment eBay joins | a single term throughout |
| `Ask eBay to step in and help` | The escalation, for both audiences | "escalate", "file a claim", "arbitrate" |
| `eBay Money Back Guarantee` | The umbrella programme | "Buyer Protection" — reserved for the DE/AT/CH brand |
| `item not received` / `INR` | The non-delivery case, always spelled out in user copy | the acronym (used only in internal links) |
| `doesn't match the listing` | The SNAD case, in plain words | "not as described" (Etsy's phrase; eBay uses it only in passing) |
| `"remorse" returns` | Change-of-mind returns, **in scare quotes, every time** | "buyer's remorse", "voluntary return" |
| `estimated delivery date` vs `actual delivery date` | Two defined terms with a published resolution rule | one "delivery date" |
| `Estimated between` vs `Get it by` | Two listing labels distinguished by **who computed them** | one estimate label |
| `handling time` | Seller's prepare-to-ship span | "processing time" (Etsy's word) |
| `the carrier's first scan` | The operative definition of "shipped on time" | seller-declared dispatch |
| `Featured Offer` (n/a) | — | |
| `Second Chance Offer` | Post-auction offer to a losing bidder | "runner-up offer" |
| `bid sniping` · `shill bidding` · `reserve price` · `automatic bidding` · `maximum bid` | The auction lexicon, each with its own article | |
| `binding contract` | Used plainly, at the point of bidding | softened language |
| `Issue Resolution Center` | The named destination for disputes | "Disputes", "Support" |
| `payment dispute` | Buyer-initiated chargeback via their bank, distinct from a `case` | "chargeback" (used, but the eBay-facing noun is `payment dispute`) |
| `defect` · `late shipment` · `seller level` | Seller-performance vocabulary, all negatives | |
| `Seller Hub` · `Promoted Listings` · `Promoted Offsite` · `Promoted Stores` · `Discounts Manager` · `eBay Labels` · `eBay Live` · `PSA Vault` · `My Garage` | Named tools and surfaces | |
| `final sale` | A listing state that removes SNAD coverage | "no returns" |
| `good standing` (n/a) | — | |
| `member` | The person, in policy and trust copy ("a member's buying activity") | "user", "customer" |

**Register split by audience is explicit and systematic.** The same concept gets two article titles and two vocabularies: `Return shipping for buyers` ("Who pays the cost of return shipping depends on the seller's return policy and the reason for the return") vs `Return shipping for sellers` ("Who pays for return shipping—**you or the buyer**—depends on…"). The buyer version is impersonal; the seller version puts the seller's money in an em-dash aside. Same fact, two grammatical positions.

**`"remorse" returns` in quotation marks, consistently** — eBay is flagging that this is the industry's term rather than a judgement it endorses. A tiny piece of typographic distancing, applied uniformly.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the reader; `we`/`us` for eBay as an active participant — "we'll review all the details", "**we'll aim to resolve it in the fairest way possible**", "we may have had to cancel the listing", "this is something we strongly discourage". eBay talks about itself in the first person even when admitting intervention, and uses `we` for value statements ("It's important to us that auctions are always fair and honest").

The seller and buyer are referred to in the **third person inside policy** (`The buyer reports…`, `The seller responds…`) and in the **second person inside help articles** (`you can ask us to step in`). The policy is a neutral instrument; the help article is a conversation. Both exist for the same events.

**Register.** Plain, warm-neutral, contraction-heavy. Mild reassurance is used deliberately at friction points — "give them a little more time", "Most sellers are happy to help", "Don't wait too long though", "we'll aim to resolve it in the fairest way possible". No exclamation marks observed. No `Oops!`. **No apology copy** except in the search no-results state ("We're sorry, we couldn't find any results…").

Tone flattens sharply inside the MBG policy: tables, bare `Covered`/`Not covered` verdicts, no second person, no reassurance. The gradient between the help article and the policy covering the same event is the steepest in the corpus.

**Numbers.** Almost all of eBay's numbers are **deadlines rather than boasts**. The only marketing-style figures observed are `31% lower` (n/a — Amazon) and eBay's `4 business days` free-shipping ceiling and `$750` signature threshold. In a corpus where every other product leads with user counts, eBay's public help surface is numerically dominated by time limits. That is a defensible identity for a dispute-heavy marketplace.

**Accessibility content** `[observed]`

- `Skip to main content` first in DOM on every page.
- `Accessibility` is the **first link in the global footer**, before `User Agreement` and `Privacy`, linking out to `ebayinc.com/accessibility/`.
- **`- opens in new window or tab` appended as visible text to every new-tab link**, dozens of times per page (`Purchases - opens in new window or tab`, `Bids/Offers - opens in new window or tab`). This is a correct and increasingly rare practice — warning the user of a context change in the link text itself rather than relying on an icon. The cost is visual noise; eBay has accepted it consistently.
- Expandable-control labels are exposed as text: `Expand Watch List`, `Expand My eBay`, `Expand Cart`.
- `skip top articles` and `skip topics` skip-links are provided **inside** the help index pages, letting a screen-reader user jump past each article list. Multiple in-page skip targets (`#lTwoCate0` … `#lTwoCate10`) — a level of within-page navigation most sites do not provide.
- `On this page` anchor lists on every article.

**Negative findings, recorded honestly**

- **`The more details you provide, the better i can understand and assist you,`** — lowercase `i`, trailing comma. Live on the help home and multiple article pages, inside the AI assistant widget. Two defects in one twelve-word string.
- **`Suggested queries` rendered twice consecutively** in the same widget.
- **`4 mins article`** — plural `mins` on the tax article link, against `min` everywhere else.
- **`More actions` vs `More Actions`** — the same menu, two capitalisations, in one article.
- **Sign-in prompt renders as `Hi ! Hi!`** in the unauthenticated global nav on every page — an unpopulated name interpolation plus a duplicate greeting.
- **Duplicated breadcrumb structure**: on some article pages the breadcrumb renders as a nested list producing `Home` then a sub-list of `Customer Service` / `Shipping and tracking`, rather than a flat trail.
- **Article reachable at multiple URLs with different breadcrumbs**, e.g. `Get help with an item that hasn't arrived` under both `Returns and refunds › Where's my item?` and `Buying › Resolving buying problems`. The related-links blocks then point at yet another path form (`/help/returns-refunds/returning-item-purchased/start-return?id=4041`) for the same `id`.
- **Internal tension in the MBG**: `Using or damaging an item and then returning it` is listed as abusive behaviour, while an exclusion row explicitly covers "The use was necessary to determine the quality or functioning of the item". Both are correct; neither references the other.
- The `Actions & time frames` content renders as a proper markdown table for the item-not-received case but **as a bullet list with a literal `**Action** **Time frame**` first bullet** for the not-as-described and remorse cases — an inconsistent component for identical content.

---

## Transferable patterns

1. **Rename the object when the platform joins the conversation.** `request` → `case`, with the rename disclosed to the user and capabilities explicitly unchanged. One of the cleanest state-communication patterns available. Directly applicable to PayPal's dispute → claim transition, which currently carries the same semantics with less explanation.
2. **`Ask eBay to step in and help` as the escalation label.** Names the actor, the action and the intent; concedes the platform was absent; uses the identical string for both audiences so neither feels ganged up on. Nine words that do the work of a policy paragraph.
3. **Label the estimate by who produced it.** `Estimated between` (platform-calculated) vs `Get it by` (seller-stated). Two words of label solve the provenance question that tooltips usually fail to. Reusable anywhere a promise is sourced from more than one party.
4. **Publish decision criteria between the procedure and the exclusions.** Every MBG failure mode runs `Actions & time frames` → `Deciding the outcome` → `Exclusions`. Telling the user how they will be judged, before telling them when they won't be covered, is the structural choice that makes the document feel fair.
5. **Never write a bare "days".** `30 calendar days` / `3 business days` / `48 hours` / `35 business days`, without exception, across a document containing more than a dozen distinct clocks. The baseline discipline for any deadline-bearing content.
6. **Give every actor a deadline, including yourself.** The action/timeframe table binds buyer, seller and eBay symmetrically. Neither side can read it as one-sided, which is why it can be published to both.
7. **Slow the user down, with a reason, then state the hard limit.** "Give them a little more time. Most sellers are happy to help once they know there's an issue." → "Don't wait too long though. Requests that show no activity for 21 business days are closed automatically." Three beats: de-escalate, justify, bound.
8. **Document the resolution path.** `If your order arrives after you've reported it` — the section covering what happens when the failure fixes itself mid-dispute, including two ethically framed options for an over-refund. Almost universally omitted elsewhere.
9. **`- opens in new window or tab` as visible link text.** Correct, consistent, unfashionable. Worth defending in any accessibility review.
10. **`Top Takeaway` at the foot, not the head.** One bolded sentence that survives out of context, placed after the procedure rather than before it, on the assumption that the reader came to act rather than to learn.

## Caveats & gaps

- **No marketing surface harvested.** `ebay.com` home, category pages, the listing/item page and checkout were not fetched. T2 is therefore `[absent]` for value proposition, and T5 is missing all checkout and listing-form field labels. The `Estimated between` / `Get it by` labels in T5 are `[documented]` from a help article, not observed on a listing.
- **The MBG policy was retrieved via a persisted large-output file and read by a delegated sub-agent**, not read inline. Every quoted string in T6/T7/T10 sourced from that policy is attributed to that extraction; spot-checking of the surrounding context was limited. The extraction explicitly flagged two rendering artefacts (a bullet-list rendering of two of the six tables) which may mean some row-to-column pairings in this file are reconstructed rather than observed. Treat the "not as described" and "remorse" timeframe pairings as slightly lower confidence than the "item not received" table.
- **All in-product UI is `[documented]`.** Button labels (`I didn't receive it`, `Take action`, `More actions`), form fields and menu items come from help-article step lists describing the signed-in experience.
- **`Issue Resolution Center` (resolution.ebay.com) not harvested** — it is the actual dispute surface and would be the single highest-value addition to this file.
- **Seller-side depth is thin.** `Selling` section titles and descriptions were captured but no seller article body was opened. `Seller protections` (9 min), `Seller standards policy` (9 min) and `Handling payment disputes` (3 min) would materially deepen T6 and T10.
- **No FAQ outside `How bidding works`.** Other articles may carry FAQ accordions; only one was sampled.
- **No empty states beyond search**, no validation copy, no toast copy, no email copy observed directly.
- Locale is en-US. The policy names `eBay Buyer Protection` and `eBay Customer Guarantee` as the DE/AT/CH and FR/IT/ES equivalents; neither was inspected, and no claim here should be treated as EU precedent.

## Sources

1. https://www.ebay.com/help/home
2. https://www.ebay.com/help/policies/ebay-money-back-guarantee-policy/ebay-money-back-guarantee-policy?id=4210
3. https://www.ebay.com/help/returns-refunds
4. https://www.ebay.com/help/ship-track
5. https://www.ebay.com/help/buying/shipping-delivery/expected-delivery-dates-buyers?id=4025
6. https://www.ebay.com/help/buying/resolving-issues-sellers/check-status-request?id=4667
7. https://www.ebay.com/help/buying/returns-items-not-received-refunds-buyers/get-help-item-hasnt-arrived?id=4042
8. https://www.ebay.com/help/buying/bidding/bidding-items?id=4003
9. https://www.ebay.com/help/buying
10. https://www.ebay.com/help/selling
