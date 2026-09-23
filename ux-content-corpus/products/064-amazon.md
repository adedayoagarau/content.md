# 064. Amazon

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | General retail marketplace (1P retail + 3P marketplace + owned logistics network) |
| Primary URL | https://www.amazon.com/ |
| Corpus rank | 064 |
| Benchmark strength (source list) | Delivery tracking and issue recovery |
| Locale / market observed | en-US (`sell.amazon.com` defaulting to `English - US` / `United States`) |
| Platform observed | Seller marketing site (`sell.amazon.com`) only. Consumer help (`amazon.com/gp/help/*`) **blocked**; Seller Central help hub (`sellercentral.amazon.com/help/*`) serves a JavaScript shell with no article content. |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not surfaced on the reachable pages beyond `Terms of Service`, `Privacy Policy` and a survey-level `Privacy statement` ("Personal or sensitive data are not necessary to complete this survey and should not be provided."). Seller registration requires "Proof of residential address dated from the last 180 days" and identity verification. No consumer-protection, delivery or refund disclosure was reachable. |
| Harvest date | 2026-09-21 |
| Pages inspected | 6 reachable (4 substantive), 4 blocked |
| Harvest completeness | **Blocked — the benchmark strength could not be harvested.** Every `www.amazon.com/gp/help/customer/display.html?nodeId=*` request returned an empty response body, including the returns-policy node that Amazon's own seller pages link to. `www.amazon.com/` itself returned only a fragment of merchandising strings with no nav, no footer and no chrome. `www.amazon.co.uk/gp/help/...` also returned empty, so the block is not US-specific. `sellercentral.amazon.com/help/hub/reference/external/G201889410` returned the page frame plus the literal string `You need to enable JavaScript to run this app.` **Delivery tracking, order status and A-to-z claim-filing documentation — the exact targets for this product — are absent from this file.** What follows is what the seller-facing marketing estate serves. No workaround was attempted. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Sell on Amazon (home) | https://sell.amazon.com/ | Hero, nav IA, incentives, FBM/FBA framing |
| Selling with Amazon: Frequently Asked Questions | https://sell.amazon.com/learn/faq | **52 questions in 6 sections** — the single richest reachable page |
| Standard selling fees | https://sell.amazon.com/pricing | Plan comparison, 36-row referral-fee table |
| Fulfilled by Merchant (FBM) | https://sell.amazon.com/programs/fulfilled-by-merchant | **7-step operational lifecycle**, the only order/return state vocabulary reachable |
| Amazon.com (home) | https://www.amazon.com/ | Degraded fragment only — merchandising strings, no nav/footer/chrome |
| Seller Central help hub | https://sellercentral.amazon.com/help/hub/reference/external/G201889410 | JS shell; `You need to enable JavaScript to run this app.` |
| **Blocked** | https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7 | Empty body (Amazon's *own* return policy, linked 3× from the FBM page) |
| **Blocked** | https://www.amazon.com/gp/help/customer/display.html?nodeId=508510 | Empty body (help home) |
| **Blocked** | https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7&ref_=hp_left_v4_sib | Empty body |
| **Blocked** | https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7 | Empty body |

---

## T1 Navigation & IA labels

**Seller-site nav — five items, all single words, all verbs-or-nouns of the selling job** `[observed]`

`Start` · `Pricing` · `Brands` · `Services` · `Resources` · `Log in` · `Start selling`

Each expands to a section heading that is a **verb phrase in the imperative**, followed by items that are also verb phrases:

| Nav item | Section heading | Items |
|---|---|---|
| `Start` | `Start selling` | `Learn how to sell` · `Register as a seller` · `List products` · `Price products` · `Fulfill customer orders` · `Get over $50K in new seller incentives` |
| `Pricing` | `Review fees and costs` | `Standard selling fees` · `Fulfillment by Amazon (FBA) costs` · `Optional costs` · `Get an estimate for a product` |
| `Brands` | `Build and protect your brand` | `Enroll in Brand Registry` · `Create engaging listings` · `Get product reviews` · `Unlock brand analytics` · `Create a Brand Store` · `Authenticate products` |
| `Services` | `Programs to help you grow` | `Fulfillment by Amazon (FBA)` · `Fulfilled by Merchant (FBM)` · `Advertise` · `Sell B2B` · `Sell globally` · `Find apps and service providers` |
| `Resources` | `Learning` | `Seller University` · `Blog` · `How to sell online` · `What is dropshipping?` · `How to sell new products` · `How to build an online store` |

**Every nav item is a verb + object with a one-line gloss beneath it** `[observed]`. E.g. `Register as a seller` — "Review steps for creating a seller account"; `Enroll in Brand Registry` — "Unlock a suite of brand-building tools and protection benefits". The gloss is not a description of the page; it is a description of *what you will be able to do after reading it*. This is the most consistent verb-first nav in the corpus — five menus, ~28 items, essentially no bare nouns.

**Two persistent CTAs repeated at the foot of every one of the five menus** `[observed]`:
`Not sure where to start? Take our business quiz` · `Review our FAQ`

An escape hatch for the undecided, present in all five dropdowns. Uncommon and worth noting: the nav contains a route out of the nav.

**Footer — five columns** `[observed]`: `Sell with Amazon` · `Selling programs` · `Amazon for brands` · `Resources` · `Tools`. Note `Resources` and `Tools` are separate columns with different contents from the `Resources` nav menu — a learning/doing split maintained in the footer but not in the header.

**Breadcrumbs** `[observed]`: `Home` › `Programs` › `Fulfilled by Merchant` · `Home` › `Learn` › `Selling FAQ`.

**Consumer-side IA** `[absent — blocked]`. The consumer help tree, `Your Orders` navigation, and the A-to-z Guarantee hub were not reachable.

## T2 Value proposition & headline patterns

**Hero — an ambition claim built from a comparative** `[observed]`

> `Sell more with Amazon`
> `Get 10% back on your first $50,000 in branded sales`
> CTA: `Sign up*`

The hero leads with a **financial incentive, not a capability**. Compare Shopify (`Be the next AI all-star`, identity) and Etsy (`Millions of shoppers can't wait to see what you have in store`, demand). Amazon leads with a rebate percentage and a dollar ceiling. That is a different bet about what moves a seller — and it is asterisked immediately: "*A Professional selling account is $39.99/month + selling fees."

**Section headers are questions or outcome claims, and every claim carries a number** `[observed]`

- `Why sell on Amazon?`
- `Put your products in front of millions of shoppers` — "reach **hundreds of millions of shoppers** actively searching for products like yours."
- `Accelerate growth with built-in AI` — "Independent sellers accept the recommended actions of Seller Assistant **over 90% of the time**."
- `Convert more with a shopping experience customers trust` — "your products appear in one of the **most trusted stores**"
- `Deliver products faster and save 70%` — "Shipping with FBA costs **70% less per unit** than comparable premium options offered by other major US carriers."
- `More than 75,000 independent sellers surpassed $1 million in sales in 2025`
- `Not sure where to begin?` / `Answer three questions to learn how you can start selling with Amazon.`
- `Start selling with Amazon` / `Try selling in a store that customers trust using high-impact tools and programs.`

**Every statistical claim carries a numbered footnote** `[observed]`: superscript `1` → "2025 Amazon Small Business Empowerment Report"; `2` → "Amazon selling stats". The footnote resolves to a named, dated source document. This is the claim-then-bound pattern, executed with citation rather than caveat — Wise bounds a claim with a qualifier; Amazon bounds it with a link to the study.

**The interactive qualifier in the hero flow** `[observed]`

> `Not sure where to begin?`
> `Answer three questions to learn how you can start selling with Amazon.`
> `Question 1 of 3`
> `Where is your business based?` → `In the US` / `Outside the US`

A three-question quiz embedded *above the fold*, with a progress indicator (`Question 1 of 3`) and a binary first question. Segmentation performed as an interaction rather than as a navigation choice.

**Testimonial pattern — logo, quote, headshot, name, title, CTA** `[observed]`

> "Since launching our brand on Amazon, we became a bestseller in all our core product categories on Amazon and have averaged double-digit growth year over year." — Jyssica Batiste, Vice President of Ecommerce [Zesty Paws] → `Read Zesty Paws' story`
> "Our sales have more than doubled every single year. We started as a brand no one had heard of, with zero reviews. Now we're top 10 in our category." — Mikey Kim, Founder and CEO [Hemlock Park] → `Read Hemlock Park's story`
> "There's no question Amazon is the most efficient place in the world to reach new customers. It's more than 50% cheaper for us to acquire a new customer through Amazon than it is elsewhere." — Dewar Gaines, Founder & CEO [Gaines Family Farmstead] → `Read case study`

The quotes are selected for **numeric content** — "double-digit growth", "more than doubled", "top 10", "more than 50% cheaper". Even the social proof is quantified. Note the logo alt text reads `Gaines Family Farms logo` while the attribution reads `Gaines Family Farmstead` and the name is spelled `Dewer Gaines` in the alt text and `Dewar Gaines` in the caption — two mismatches in one testimonial block.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up*` | Hero, closing block | **Asterisk is part of the label**, resolving to the $39.99/month footnote |
| `Start selling` | Header, mobile nav, sticky bar, pricing | |
| `Start selling*` | Pricing page hero | Asterisked variant of the same action |
| `Sign up for Individual` / `Sign up for Professional` | Plan comparison | Plan name inside the button |
| `Sign up to become an individual seller` | Under "Just have a few items to sell?" | Fourth variant of the signup action |
| `Log in` | Header | |
| `Learn how` | Incentives banner | |
| `Explore incentives` | Pricing page | |
| `Not sure where to start? Take our business quiz` | All five nav menus | |
| `Review our FAQ` | All five nav menus | |
| `Get started` | FBM, for existing sellers | |
| `Watch overview` | FBM | |
| `Compare selling plans` | FAQ | |
| `Use our Revenue Calculator to estimate fulfillment costs and profits` | FAQ | Full sentence as link text |
| `Compare fulfillment options with the Amazon revenue calculator` | Pricing | Near-duplicate of the above |
| `Learn more about <X>` ×~20 | Throughout | Always specific: `Learn more about FBA`, `Learn more about AWD`, `Learn more about MCF`, `Learn more about Buy Shipping`, `Learn more about Seller Central`, `Learn more about Brand Registry`, `Learn more about Amazon Transparency`, `Learn more about Automate Pricing`, `Learn more about seller-fulfilled returns`, `Learn more about Buyer-Seller Messaging`, `Learn more about the Fulfillment Insights Dashboard`, `Learn more about Account Health`, `Learn more about Premium Shipping`, `Learn more about Seller Fulfilled Prime` |
| `Learn more` (bare) | Pricing footnote, incentives | Two instances only |
| `Get the New Seller Guide` · `Get started with Amazon Handmade` · `Start advertising with Amazon` | Programme entries | |
| `Review our seller registration guide` · `Review more Amazon selling stats` | FAQ | `Review` as a link verb, twice |
| `See referral fees` | Fee-table expander | |
| `Subscribe now` | Newsletter, under `Wondering what it's like to sell on Amazon?` | |
| `Rate this page` / `Submit` / `Select subject` | Feedback widget | |
| `Feedback` | Persistent tab | |
| `Explore selling on Amazon around the world` | Locale switcher heading | |

**Observation.** Amazon almost never ships a bare `Learn more` — ~20 instances are all `Learn more about <named thing>`, matching Wise's discipline and exceeding Etsy's. The failure mode here is the opposite: **four different labels for "create an account"** (`Sign up*`, `Start selling`, `Sign up for Professional`, `Sign up to become an individual seller`) on a single page, plus a fifth (`Start selling*`) on the pricing page.

**The asterisk-in-the-label pattern** `[observed]` is worth flagging as a genuine device: `Sign up*` carries the price disclosure into the button itself rather than placing it adjacent. The user cannot read the CTA without seeing that a condition exists. Whether that is good practice is arguable — it is certainly deliberate, and it is used consistently on every primary conversion CTA.

## T4 Onboarding & getting-started

**Seven steps, from the FAQ** `[documented]`, in answer to `How do I sell my product in the Amazon store?`:

1. choose a selling plan
2. create a selling account
3. enroll your brand
4. list and price products in Seller Central
5. pick a fulfillment method
6. advertise
7. grow

**Five steps, for registration** `[documented]`, in answer to `How do I register to sell in the Amazon store?` — preceded by a required-documents list, including verbatim: "Proof of residential address dated from the last 180 days, like a bank or credit card statement" and ending in "identity verification". Note the page's own typos in this section: `Create a selling accoun t` and `Verify your identify` — two errors in a five-step list.

**The FBM lifecycle — seven named steps, and the most valuable reachable content on Amazon** `[observed]`

| Step | Heading (verbatim) |
|---|---|
| `Step 1.` | `Sign up for a selling account` |
| `Step 2.` | `List your products` |
| `Step 3.` | `Configure shipping and return settings` |
| `Step 4.` | `Manage inventory and fulfill customer orders` |
| `Step 5.` | **`Handle cancellations, returns, refunds, and customer service`** |
| `Step 6.` | `Monitor your shipping performance` |
| `Step 7.` | `Try advanced shipping options` |

Three findings. (1) **Step 5 is the unhappy path, and it is a numbered step of the main flow**, not an appendix — the four failure modes are named in the step heading itself. (2) Step 3 puts *return settings* before the first order exists: "You should check your return settings and make adjustments, if necessary." Recovery configuration precedes transaction. (3) Step 7 is gated on performance — "After meeting performance requirements, you may be eligible to enroll in…" — so the onboarding sequence ends in an earned state rather than a completed one.

**A cancellation mechanism introduced inside setup** `[observed]`: "Consider setting up a **cancellation window** to reduce the number of order-cancellation requests you receive from buyers." A named configurable that reduces future support load, surfaced at step 3.

**Plan-switch reversibility stated at the point of choice** `[observed]`: "**Note:** After completing seller registration, you can switch or cancel your selling plan at any time." Placed directly beneath the plan-comparison table, above the two signup buttons. Reversibility disclosed where the decision is made.

**Publishing onboarding, with a speed promise** `[documented]`: Kindle Direct Publishing — "get them on Kindle stores worldwide in **24 to 48 hours**."

## T5 Form & field labels

`[documented]` unless noted. All consumer-facing form copy is `[absent — blocked]`.

Seller-configurable fields named on the FBM page `[observed]`:

- `handling time` · `transit time` · `capacity limit` — "define a handling time, transit time, and capacity limit that match your operations"
- `automated handling time`
- `cancellation window`
- `return settings` / `return policies`
- `Notification Preferences` — "Set Notification Preferences for email or text alerts on customer orders"
- `Manage Inventory` · `Manage Orders` · `Manage Returns` · `Manage Stores` · `Manage Your Services` · `Account management` · `Account Overview` — seven named Seller Central destinations, all `Manage <noun>` or `Account <noun>`

**Consumer-facing button labels, quoted secondhand in the seller FAQ** `[documented]`:
> "the offer at the top of a product detail page with **Buy Now** and **Add to Card** buttons"

`Add to Card` is a live typo for `Add to Cart` on `sell.amazon.com/learn/faq`, in a sentence defining the Featured Offer.

**Gift options** `[documented]`: "customers can select/pay for gift wrap per item and add gift messages per item or order" — two granularities named (per item / per order) for two adjacent features.

**Feedback widget fields** `[observed]`: `Rate your experience with this page` · `Feedback subject` · `Select subject` → `Suggestion` / `Compliment` / `Website content` / `Technical issue` / `Other` · `Please tell us the reason for your rating` · `500characters remaining` (no space between number and word) · `Privacy statement` · `Submit` · `Thanks for the feedback!` / "Your feedback helps us continually improve our website experience."

The five-option subject taxonomy includes `Compliment` as a peer of `Technical issue` — a positive-feedback channel given equal weight, which is unusual.

## T6 Status & state language — PRIORITY (mostly blocked)

**This section is materially incomplete and the reason is a block, not an absence of content.** Amazon's order-status, delivery-tracking and shipment-state vocabulary lives entirely on `www.amazon.com/gp/help/customer/display.html`, which returned empty bodies on every attempt. The reachable seller marketing estate contains **no order-status vocabulary at all** — the delegated full-text extraction of `sell.amazon.com/learn/faq` confirmed zero occurrences of `order status`, `out for delivery`, `Pending`, `Shipped`, `Unshipped`, `Delivered`, `Active`, `Inactive`, `Suppressed` or `Stranded`, and the only use of the word "status" on that page is in an unrelated sense ("manufacturer or brand status").

What *is* reachable:

### Return-request states (seller-side verbs)

`[observed]`, from the FBM page, Step 5:

> "Customer return requests that fall outside Amazon's return policy or are category exempt are sent to you for review. You need to respond to all return requests **within 24 hours** using `Manage Returns`. **You can authorize, close, or complete a return.**"

Three named terminal actions on a return object: `authorize` · `close` · `complete`. And two named return classes: **automatically authorised** (meets policy) vs **sent to you for review** (outside policy, or `category exempt`). The auto-authorisation is disclosed as a default the seller is enrolled into: "we automatically enroll sellers in our **prepaid returns label program** for US sales and authorize all return requests that meet our policy."

### Cancellation state

`[observed]`: `buyer-requested cancellations` — "Check regularly for buyer-requested cancellations using `Manage Orders`." A buyer-initiated state the seller must poll for, plus the `cancellation window` configurable that governs it.

### Shipment confirmation as a two-source truth

`[observed]`:
> "you can review it, **confirm shipping**, and provide tracking information using `Manage Orders`. Make sure you **confirm shipment within your stated handling time**."
> "Your order will be **confirmed and tracked automatically**" (when using Amazon Buy Shipping)
> "**ship on time (considered the moment of the carrier's first scan)**"

Three definitions of "shipped" in one page: a seller action (`confirm shipment`), an automatic system action (Buy Shipping), and a carrier event (`first scan`) — the last of which is the one that governs eligibility for claim protection. Identical to eBay's use of `the carrier's first scan` as the operative definition.

### Account-health metrics (seller-side state)

`[observed]`: "You can track your rates for **order defects, late shipments, pre-fulfillment cancellations, and valid tracking**."

Four named metrics, three of which are failure counts and one of which is a compliance rate. `pre-fulfillment cancellations` is the notable coinage — a cancellation classified by *when in the lifecycle* it occurred.

`Fulfillment Insights Dashboard` is described in terms of a gap between two states: "comparing **promised and actual delivery times** to diagnose gaps". Promised vs actual is the same duality eBay formalises as `estimated` vs `actual delivery date`.

### Listing state

`[documented]`: "temporarily **deactivate** your Amazon listings" (via `Account Overview`) vs "**permanently close** your selling account" (via `Account management`) — two reversibility levels, two destinations, stated together.

### Delivery-speed vocabulary

`[observed]`: `two-day delivery` · `two-day shipping` · `same-day, one-day, and two-day delivery` (Seller Fulfilled Prime) · `one- and two-day shipping speeds` · `two-to-five-day delivery` (Amazon Shipping) · `ground shipping services` · `Prime badge`.

`Prime badge` is a **listing-level state earned by fulfilment method**, not a delivery status: "Available to sellers enrolled in FBA or Seller Fulfilled Prime." It is the only consumer-visible state token reachable in this harvest.

### `[absent — blocked]`

Order placed · confirmed · processing · dispatched · out for delivery · delivered · delayed · returned · refunded — **none of Amazon's consumer order-state names were reachable.** Amazon is widely understood to have one of the most granular delivery-tracking vocabularies in commerce; none of it can be evidenced here and none is invented.

## T7 Error, failure & recovery — PRIORITY (mostly blocked)

**The A-to-z Guarantee is named but not described.** The full extent of Amazon's own explanation of its consumer protection programme on any reachable page is one sentence:

> `What's the A-to-z Guarantee?`
> "The Amazon A-to-z Guarantee ensures that customers have a consistent experience when making purchases across the Amazon store."

That is the entire answer. It states no covered failure modes, no eligibility conditions, no time windows, no claim-filing steps and no refund mechanics. It is followed by a `Learn more` link to `sellercentral.amazon.com/help/hub/reference/external/G27951`, which is behind the JavaScript-only help hub.

**This is a finding in its own right.** Compare the same moment across the three marketplaces:

| Programme | Public coverage statement |
|---|---|
| eBay Money Back Guarantee | Three named failure modes, six action/timeframe tables, three exclusion tables, loss-of-coverage section — ~13 minutes of reading, fully public |
| Etsy Purchase Protection | Four named conditions, three case types, five named clocks, $250 seller cap — fully public across two articles |
| **Amazon A-to-z Guarantee** | **One sentence, containing no operative detail, on a seller marketing page** |

Amazon's protection programme is the least publicly legible of the three on the surfaces reachable without JavaScript. Whether the detail exists behind the block is not in question — it certainly does — but its *public discoverability* is materially worse, and that is an observable, non-invented comparison.

### Named claim types

`[observed]`, from the FBM page's Amazon Buy Shipping block:

- **`A-to-z claims`** — "Get **6x more Amazon-paid refunds** for A-to-z claims"
- **`SAFE-T claim`** — "**1.5x more SAFE-T claim reimbursements** for orders managed through Customer Service by Amazon and Seller Fulfilled Prime"
- `delivery claims` / `delivery-related claims` / `delivery-related issues`

Two distinct named claim objects (`A-to-z`, `SAFE-T`), each with its own reimbursement mechanism, and a generic `delivery claims` category. `SAFE-T` is never expanded on any reachable page.

### The claim-protection eligibility footnote — the densest recovery content reachable

`[observed]`, verbatim from the FBM page footnote:

> "To be eligible for **A-to-z claim protection**, you must purchase the shipping label through Amazon Buy Shipping, **ship on time (considered the moment of the carrier's first scan)**, and **respond to any customer inquiry in Buyer-Seller Messaging within 48 hours**.
> To be eligible for a **SAFE-T claim reimbursement**, you must purchase the shipping label through Amazon Buy Shipping and ship on time…"

Three conditions for one claim type, two for the other, with the difference being the 48-hour response obligation. The *comparison* is stated in the footnote — "Compared to claims received for orders shipped on time not using Amazon Buy Shipping" — so the `6x` and `1.5x` multipliers are bounded against a named control group. That is a well-constructed claim.

**The 48-hour seller response SLA** is the same number Etsy uses (`You responded to the buyer's Help with Order message within 48 hours`) and it appears in both as a protection *eligibility condition* rather than as a rule. Two marketplaces independently landing on 48 hours as the threshold at which a seller's silence forfeits their coverage.

### Refund-and-return vocabulary

`[observed]`

- `Simplify returns and refunds` (benefit heading) — "Use tools to streamline returns and refunds, and engage with buyers when they have questions or need support. **Fulfilled by Merchant can be an opportunity to put a personal touch on the post-order experience.**"
- `prepaid returns label program`
- `Buyer-Seller Messaging` — the named channel for "customer service inquiries"
- FBA framed as outsourced recovery: "we pick, pack, and ship customer orders while also **managing returns and customer service**" · "Outsource shipping, **returns**, and customer service"

**`put a personal touch on the post-order experience`** is the one warm line in the entire reachable estate, and it is positioned as the *compensating advantage* of not using FBA. The failure path is reframed as a relationship opportunity — a defensible move when selling the self-service option against the outsourced one.

### `What is Amazon's return policy?`

`[observed]`, the FBM FAQ's fifth question, answered in full:

> "Review our **return policy** anytime."

A nine-word answer whose only content is a link — to `www.amazon.com/gp/help/customer/display.html/?nodeId=GKM69DUUYKQWKWX7`, which is **the blocked URL**. Amazon's seller-facing FAQ answers the return-policy question by pointing at a page that does not serve.

The same nodeId is linked three times from the FBM page: once in step 3 ("You can create additional return policies for your business that **match or exceed Amazon's policy**"), once in step 5 ("authorize all return requests that meet **our policy**"), once in the FAQ. The policy is load-bearing across the seller lifecycle and publicly unreadable.

### `[absent — blocked]`

Item-not-received flow · damaged-item flow · wrong-item flow · refund-failure copy · consumer-facing error titles · consumer escalation steps · A-to-z claim-filing steps and windows · delivery-delay messaging. **None of these were reachable and none is reconstructed.**

## T8 Empty states

`[absent]` on the reachable surfaces. No search, no results list, no no-data state on `sell.amazon.com`.

The degraded `www.amazon.com` fragment contained only merchandising strings (`The latest listens`, `Homeroom to homework`, `Explore more`, `Everyday essentials you might like`, `Customers also bought`, `See more`, `Cooking magazines`) with no chrome; it is not a legitimate empty state and is not recorded as one.

## T9 Notifications & system messages

`[documented]`, thin.

- **Notification model disclosed as a seller-configurable**: `How will I know when I have a sale?` → "Set **Notification Preferences** for email or text alerts on customer orders."
- `Buyer-Seller Messaging` — the named two-way channel, with a 48-hour response obligation attached to claim eligibility.
- Banner `[observed]`, persistent across every seller page: "**Unlock $50K in new seller credits, bonuses, and exclusive benefits.** `Learn how`" — and a variant on Seller Central: "**Get over $50K in potential incentives when you start selling with Amazon.** `Learn how`". Note `$50K in new seller credits` vs `over $50K in potential incentives` vs `over $50,000 in credits` vs `over $50,000 in automatic referral-fee waivers` — **four phrasings of the same offer** across four surfaces, with `potential` appearing in only one of them.
- Feedback confirmation `[observed]`: `Thanks for the feedback!` / "Your feedback helps us continually improve our website experience."
- JS-required message `[observed]`: `You need to enable JavaScript to run this app.` — the entire content of the Seller Central help hub page.

Consumer-facing notification, email and push copy is `[absent — blocked]`.

## T10 Disclosures, legal & compliance

**The fee table is the strongest disclosure artefact reachable** `[observed]` — 36 product categories × `Referral fee percentage` × `Referral fee minimum amount`, with tiered rules written as inline bullet lists inside the cells. Examples, verbatim:

- `Clothing and Accessories` — "5% for products with a total sales price of $15.00 or less · 10% for products with a total sales price greater than $15.00 and less than or equal to $20.00 · 17% for products with a total sales price greater than $20.00"
- `Jewelry` — "20% for the portion of the total sales price up to $250.00, and 5% for any portion of the total sales price greater than $250.00"
- `Fine Art` — four tiers plus "(with a minimum Referral Fee of $1.00)"
- `Pet Supplies` — "15%, **except 22% for veterinary diets**"
- `Watches` — "16% for the portion … up to $1,500.00 · 3% for any portion … greater than $1,500.00"

Two distinct tiering grammars are used and the difference is material: **"for products with a total sales price of X"** (whole-order rate) vs **"for the portion of the total sales price up to X"** (marginal rate). Amazon uses both, in adjacent rows, and the phrasing is the only signal of which applies. This is precise and easy to misread — worth recording as a case where correctness and comprehensibility are in tension.

**Six footnotes beneath the table** `[observed]`, including:
- "**Note:** A product's fee category may not be the same as the category that appears to customers in the Amazon store." — a first-line disclosure that the taxonomy the seller is billed under is not the taxonomy the buyer browses
- "An item's total price includes its **list price, as well as shipping costs and any gift-wrapping charges**."
- "In addition to the referral fee, media items incur a **closing fee $1.80 per item**." (note the missing "of")
- "The `Everything Else` category is available to sellers for products that do not clearly fit within existing categories. **Do not list items in the Everything Else category that appropriately fall within another category.**"

That last footnote is a *rule* inside a fee table — the disclosure doubles as policy enforcement.

**Plan pricing, stated four ways on one page** `[observed]`: `Individual` `$0.99` `/ item sold` and `Professional` `$39.99` `/ month` in the comparison table; "The Professional selling plan costs $39.99 per month plus a per-item referral fee that varies by category" in the FAQ; "*A Professional selling account is $39.99/month + selling fees" in the asterisk footnote; and the decision rule "If you plan to sell **fewer than 40 items a month**, the Individual plan may be best for you."

**The 40-item break-even is the useful string** — a threshold that lets the seller self-select without arithmetic. ($39.99 ÷ $0.99 ≈ 40.) Publishing the derived answer rather than the inputs.

**Handmade referral fee** `[documented]`: "For each Handmade sale, there is a **15% referral fee**."

**Payout mechanics** `[documented]`: "Amazon deposits settled positive balances to a bank account via **ACH**; no credit cards or online payment systems." · "It can take up to **five business days** for the money to appear in your bank account after Amazon initiates a payment."

**Brand-policy disclosure with a self-implicating statistic** `[documented]`, from `What are the standards for brands selling in the Amazon store?`: the answer explains the `Standards for Brands` policy including **when Amazon sources and sells high-recognition brands itself**, and quantifies the scope: "High-recognition brands … account for **less than 0.01% of brands in our store**." Amazon discloses that it competes with its own sellers in a named category, and bounds the size of that category.

**Currency and international** `[documented]`: `Amazon Currency Converter` — "deposit to a US bank, or use a local bank account abroad." `Amazon Global Selling` lists 27 country storefronts under `Explore selling on Amazon around the world`.

**Consumer-facing disclosure** `[absent — blocked]`: delivery guarantees, Prime terms, return windows, refund timelines, A-to-z eligibility, price-accuracy and tax disclosure were all unreachable.

## T11 Help-centre architecture

**`[absent — blocked]` for the consumer help centre.** `sellercentral.amazon.com/help/hub/reference/external/*` is a single-page JavaScript application serving only a frame; `www.amazon.com/gp/help/customer/display.html` serves nothing.

What is observable is the **seller learning estate**, which is structured as marketing rather than as help `[observed]`:

`Seller University` · `Blog` (`Selling Partner Blog`) · `Seller FAQs` · `Seller Central Help` · `Amazon Seller Events` · `New Seller Guide` · `Seller registration guide` · `Seller stories` / `case-studies` · `business quiz`

Nine content types, none of which is a searchable article tree. The routing model is: **quiz → programme page → FAQ → deep link into Seller Central help**. The FAQ is the hub, not a leaf.

**FAQ page architecture** `[observed]` — a jump list at the top, six section anchors, and `BACK TO TOP` as the first item:

`BACK TO TOP` · `Getting started with Amazon` · `Amazon Prime` · `Fulfillment` · `Advertising with Amazon` · `Amazon Stores` · `Other Amazon services`

Each section has a one-line sub-heading in the second person:
- `Getting started with Amazon` — "Find out how to start your selling journey."
- `Amazon Prime` — "Understand this popular customer program, which we celebrate each year with Prime Day."
- `Fulfillment` — "Discover options for fulfillment—how items are stored, packed, and shipped to customers."
- `Advertising with Amazon` — "Explore tools for advertising in and beyond the Amazon store."
- `Amazon Stores` — "Find out how enrolled brands create their own storefront with Amazon."
- `Other Amazon services` — "Explore essential tools and optional programs that can take your business to the next level."

Six sections, six different opening verbs (`Find out`, `Understand`, `Discover`, `Explore`, `Find out`, `Explore`) — the variation is cosmetic and two repeat. The `Fulfillment` sub-heading is the best of them because it **glosses the jargon inline with an em-dash**: "options for fulfillment—how items are stored, packed, and shipped to customers." Defining the term in the navigation label is a good habit.

## T12 FAQs

**Placement: a dedicated page, `sell.amazon.com/learn/faq`, titled `Selling with Amazon: Frequently Asked Questions`.** `[observed]`

Deck: "You can sell just about anything online, from dog toys to quirky T-shirts. But how does it all work? Here are answers to some frequently asked questions about selling with Amazon."

**52 questions across 6 sections.** Verbatim, in order:

**Getting started with Amazon (21)**
1. What is selling on Amazon?
2. Why should I sell on Amazon?
3. How do I sell my product in the Amazon store?
4. What can I sell in the Amazon store?
5. Can I list my products in all Amazon categories?
6. What products can't be sold in the Amazon store?
7. How do I register to sell in the Amazon store?
8. How much does it cost to sell with Amazon?
9. Is being an Amazon seller profitable?
10. How do I get paid?
11. How will I know when I have a sale?
12. What sells the most in the Amazon store?
13. How do I manage my selling account?
14. How do I add inventory?
15. How do I sell books in the Amazon store?
16. How do I publish a book with Amazon?
17. How can I increase Amazon sales?
18. What is the Featured Offer?
19. What are the differences between the Professional and Individual selling plan?
20. Can I switch from a Professional selling plan to an Individual selling plan?
21. What's the A-to-z Guarantee?

**Amazon Prime (3)**
22. What is Amazon Prime?
23. How do I get the Prime badge?
24. How much does it cost to get the Prime badge?

**Fulfillment (9)**
25. How much does it cost to ship items to customers?
26. What does "FBA" stand for?
27. What is an Amazon FBA business?
28. How does Fulfillment by Amazon (FBA) work?
29. How much does FBA cost?
30. What is Amazon Supply Chain Services?
31. What's the difference between Amazon Warehousing and Distribution (AWD) and Fulfillment by Amazon (FBA)?
32. What is Fulfilled by Merchant?
33. Can I use Fulfillment by Amazon (FBA) to fulfill customer orders from other sales channels?

**Advertising with Amazon (4)**
34. How do I advertise with Amazon?
35. How much does it cost to advertise with Amazon?
36. What does "sponsored" mean in the Amazon store?
37. How do I get a sponsored ad in the Amazon store?

**Amazon Stores (2)**
38. What is an Amazon storefront?
39. How do I create an Amazon store?

**Other Amazon services (13)**
40. What is Seller Central?
41. What is Amazon Brand Registry?
42. What is Amazon Transparency?
43. What are the standards for brands selling in the Amazon store?
44. Can I sell in other countries with Amazon?
45. What can I do with the Amazon Seller app?
46. How do I sell with Amazon Handmade?
47. What is the New Seller Guide?
48. What is Amazon Business?
49. Can I get paid in US dollars if I sell with Amazon in other countries?
50. What is Automate Pricing?
51. Can I offer gift wrap and gift messaging services to customers?
52. How do I close my Amazon selling account?

**Structural notes.** Four question shapes dominate: `What is <X>?` (17), `How do I <verb>?` (13), `How much does it cost to <verb>?` (4), `Can I <verb>?` (6). The `What is X?` questions are overwhelmingly **glossary entries for Amazon's own product names** — `Seller Central`, `Brand Registry`, `Transparency`, `Amazon Business`, `Automate Pricing`, `Amazon Supply Chain Services`, `Amazon Prime`, `Featured Offer`, `New Seller Guide`, `FBA`, `FBM`, `AWD`. **Roughly a third of the FAQ is a proper-noun dictionary.** That is what happens when a platform ships 40+ named programmes: the FAQ becomes the glossary of last resort.

Cost questions recur four times in four different sections (Q8, Q25, Q29, Q35) rather than being collected — the FAQ is organised by *programme*, so price is asked once per programme. Defensible, but it means a seller comparing total cost must read four answers in four places.

**Q52 (`How do I close my Amazon selling account?`) is the last question**, and it is answered fully, with both reversibility levels: permanent closure via `Account management` "after cancelling listings and resolving transactions", and temporary deactivation via `Account Overview`. Ending a seller-acquisition FAQ with the exit route, answered properly, is good practice.

**Q21 (`What's the A-to-z Guarantee?`) is the weakest answer on the page** and the most consequential — see T7.

**Also observed**: an FBM-specific four-question FAQ on `sell.amazon.com/programs/fulfilled-by-merchant`: `What is Fulfilled by Merchant?` · `Why should I use Fulfilled by Merchant services?` · `How much does it cost to use Fulfilled by Merchant services?` · `How do I get started with Fulfilled by Merchant?` · `What is Amazon's return policy?` — five, with the return-policy question appended out of pattern and answered with a nine-word link (T7).

## T13 Terminology & glossary

| Term | Amazon's usage | The alternative it rejected |
|---|---|---|
| `the Amazon store` | **The marketplace, always singular, always "the … store"** — "sell in the Amazon store", "products in the Amazon store", "one of the most trusted stores" | "Amazon.com", "the marketplace", "the platform" |
| `Featured Offer` | The winning offer on a detail page | **`Buy Box`** — which appears *only inside a URL* (`/blog/buy-box-featured-offer`) and never in visible copy. A deliberate, completed rename |
| `selling plan` / `selling account` | The subscription and the identity, distinct | "plan", "account" |
| `Professional` / `Individual` | The two plans | "Pro"/"Basic", "Business"/"Personal" |
| `referral fee` | Amazon's commission | "commission", "transaction fee", "take rate" |
| `closing fee` | Per-item media surcharge | |
| `Fulfillment by Amazon (FBA)` / `Fulfilled by Merchant (FBM)` | The two fulfilment models; note the **grammatical asymmetry** — one is a noun phrase, one is a past participle | |
| `Multichannel Fulfillment (MCF)` · `Amazon Warehousing and Distribution (AWD)` · `Amazon Supply Chain Services (ASCS)` · `Amazon Managed Service` | Four further logistics products under one umbrella | |
| `Seller Fulfilled Prime` · `Premium Shipping` · `Prime badge` | Earned delivery-speed states | |
| `Shipping Settings Automation` · `Multi-Location Inventory` · `Amazon Buy Shipping` · `Amazon Shipping` · `Veeqo` | Five named shipping tools, two of which (`Amazon Buy Shipping`, `Amazon Shipping`) are near-identical names for different things | |
| `A-to-z Guarantee` / `A-to-z claims` | Consumer protection programme | "Buyer Protection", "Money Back Guarantee" |
| `SAFE-T claim` | Seller reimbursement claim, never expanded | |
| `order defects` · `late shipments` · `pre-fulfillment cancellations` · `valid tracking` | The four account-health metrics | |
| `Account Health` | The seller-performance dashboard | "seller rating", "performance dashboard" |
| `Seller Assistant` | The AI agent | "Copilot", "Assistant" |
| `Seller University` · `New Seller Guide` · `Selling Partner Blog` · `Selling Partner Appstore` | Learning and ecosystem brands; note `Selling Partner` as a formal synonym for seller | |
| `Brand Registry` · `Transparency` · `Amazon Vine` · `Brand Analytics` · `A+ Content` · `Brand Store` | Six brand-tier programmes | |
| `Standards for Brands Selling in the Amazon Store` | The policy, title-cased in full | |
| `Amazon Handmade` · `Amazon Business` · `Amazon Global Selling` · `Amazon Local Selling` · `Amazon Currency Converter` · `Automate Pricing` · `Product Opportunity Explorer` · `Revenue Calculator` | Eight more named products | |
| `Kindle Direct Publishing (KDP)` | | |
| `independent sellers` | The preferred descriptor in claims | "third-party sellers" (used once, in a footnote) |
| `customers` | Always — never "buyers" in marketing copy | "buyers" (used only in operational FBM copy: `Buyer-Seller Messaging`, `buyer-requested cancellations`) |

**The `customers` / `buyers` split is systematic.** Marketing and FAQ copy says `customers` ("put your products in front of customers", "customer orders", "Customer Service by Amazon"). Operational tooling says `buyers` (`Buyer-Seller Messaging`, `buyer-requested cancellations`, "engage with buyers"). Amazon's shopper is a *customer* of Amazon and a *buyer* from the seller — two words for the same person depending on whose transaction is being described. That is a consistent and defensible register split.

**`the Amazon store`** is the most distinctive terminology choice here. It is used relentlessly — dozens of instances — in preference to "Amazon.com", "our marketplace" or "the platform". Singular, definite, physical. It positions a marketplace of millions of sellers as one shop, which is the whole 1P/3P blur expressed in three words.

**`Featured Offer` over `Buy Box`** is a completed terminology migration, visible because the old term survives in a URL slug. Sellers universally say "Buy Box"; Amazon's copy has stopped. Worth recording as an example of a rename that the documentation has fully absorbed while the user community has not.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the seller throughout; `we`/`our` for Amazon, used freely and possessively — "our tools", "our catalog", "our AI-powered tools", "we pick, pack, and ship", "**we automatically enroll sellers**", "**We recommend using a Professional selling account**". Amazon speaks as an operator that acts on the seller's behalf, and the verbs are physical (`pick`, `pack`, `ship`, `store`, `enroll`).

**Register.** Brisk, declarative, benefit-first, heavy on numerals. Sentences are short and front-loaded. Almost no hedging, almost no softening, **no apology copy anywhere**, **no exclamation marks** except the feedback confirmation `Thanks for the feedback!`. The tone is uniform — there is no observable gradient between marketing copy and operational copy, unlike Wise, Etsy and eBay. Even the account-closure answer (Q52) reads in the same efficient register as the hero.

**Numbers dominate.** `$50K` · `over $50,000` · `$39.99/month` · `$0.99/item` · `fewer than 40 items a month` · `$375,000` average annual sales · `75,000` sellers over `$1 million` · `11,000` sellers growing `10X` · `70% less per unit` · `over 31% lower` · `up to 5% back` · `6x more` refunds · `1.5x more` reimbursements · `10% more units` · `6x more first-year sales` · `over 90% of the time` · `less than 0.01% of brands` · `15%` · `20%` · `45%` · `180 days` · `five business days` · `24 to 48 hours` · `48 hours` · `24 hours` · `five minutes` · `two-day`. Nearly every sentence in the value-proposition sections contains a figure.

**Footnote discipline is good; label discipline is not.** Every statistical claim resolves to a numbered, named source. But the same offer is described as `$50K in new seller credits`, `over $50K in new seller incentives`, `over $50K in potential incentives`, `over $50,000 in credits`, and `over $50,000 in automatic referral-fee waivers` across five surfaces — and only one of those five carries the word `potential`.

**Accessibility content** `[observed]`

- **No `Skip to content` link** was observed in the DOM of any `sell.amazon.com` page.
- Icon alt text is descriptive of the *image*, not of its meaning: `A screen displaying equalizer settings representing customization` · `A price tag with a currency symbol` · `A building and warehouse representing a fulfillment center` · `A hand pointing to a box` · `A wristwatch` · `A hand holding a floating dollar symbol` · `Two stars depicting artificial intelligence` · `Amazon box with 3 lines simulating fast delivery` · `Desktop outline with a price tag in the center`. These are decorative icons carrying alt text that describes the drawing rather than the concept — for a screen-reader user, "A wristwatch" above a heading about fulfilling specialty products is noise. Several other images carry an empty alt (`""`) correctly.
- The `warning icon` alt is attached to a green star image used for a *promotional* callout, twice: `![warning icon](…star-green.svg "warning icon")`. **Semantically wrong alt text on a non-warning element**, repeated.
- A `Privacy statement` is embedded in the feedback widget with an explicit data-minimisation instruction: "Personal or sensitive data are not necessary to complete this survey and should not be provided. By submitting my feedback, I represent and warrant that no personal or sensitive data (e.g., names, addresses, telephone numbers or e-mail addresses) have been included in my responses." Good practice, badly placed (below the submit button).
- **No accessibility statement was found** on any reachable Amazon surface. `[absent]`
- Language switcher: `Select your preferred language` — three locales on `sell.amazon.com` (`English - US`, `Español - US`, `中文 - CN`), fourteen on Seller Central.

**Negative findings, recorded honestly**

- **`Add to Card`** for `Add to Cart`, in the definition of the Featured Offer.
- **`Create a selling accoun t`** — stray space, in the five-step registration list.
- **`Verify your identify`** for `Verify your identity`, same list.
- **`Learn how to become the Feature Offer`** — missing `d`, and the anchor points at `/blog/buy-box-featured-offer`.
- **`a fully automated set services`** — missing `of`.
- **`closing fee $1.80 per item`** — missing `of`.
- **`500characters remaining`** — missing space.
- **`Gaines Family Farms logo` / `Gaines Family Farmstead`** and **`Dewer Gaines` / `Dewar Gaines`** — brand name and person name each spelled two ways in one testimonial block.
- **Five phrasings of the $50K incentive**, one of which adds `potential`.
- **Four labels for the signup action** on one page.
- **`warning icon`** alt text on a promotional star icon.
- **No skip link, no accessibility statement.**
- **The FBM page links three times to a return policy that does not serve.**

Eight copy defects on a four-page harvest of a flagship marketing estate is a notably high rate, and several are in load-bearing definitional sentences.

---

## Transferable patterns

1. **Put the price disclosure inside the CTA label.** `Sign up*` with the asterisk resolving to "$39.99/month + selling fees". The user cannot read the button without seeing that a condition exists. Arguable as practice; unambiguous as a technique for unavoidable disclosure.
2. **Publish the derived threshold, not the inputs.** "If you plan to sell **fewer than 40 items a month**, the Individual plan may be best for you." Amazon does the division so the reader doesn't. Applicable to any two-tier pricing decision.
3. **Name the unhappy path as a numbered step of the main flow.** FBM `Step 5. Handle cancellations, returns, refunds, and customer service` — four failure modes in a step heading, sitting between fulfilment and performance monitoring. Recovery as part of the lifecycle, not an appendix.
4. **Configure recovery before the first transaction.** Return settings and the cancellation window are set at step 3, before any order exists. Front-loading the unhappy-path configuration is a structural choice most onboarding flows defer.
5. **Bound a comparative claim with a named control group.** "6x more Amazon-paid refunds … Compared to claims received for orders shipped on time not using Amazon Buy Shipping." The multiplier is meaningless without the control; Amazon supplies it in the footnote.
6. **Gloss the jargon in the navigation label.** "Discover options for fulfillment—how items are stored, packed, and shipped to customers." The term is defined where it is first encountered, in the label, with an em-dash.
7. **`the Amazon store` — collapse a marketplace into a singular definite noun.** Three words doing the entire 1P/3P positioning job. Condition: only defensible if the platform genuinely stands behind third-party transactions, which is what the A-to-z Guarantee is for.
8. **Split `customers` from `buyers` by whose transaction is being described.** Marketing says customers of Amazon; operational tooling says buyers from the seller. Consistent, defensible, and it keeps the platform's ownership of the relationship visible in the grammar.
9. **Negative finding worth carrying: a protection programme that is named everywhere and explained nowhere public.** The A-to-z Guarantee's entire unauthenticated description is one content-free sentence. Whatever the internal documentation looks like, the *public legibility* of Amazon's buyer protection is materially worse than eBay's or Etsy's. For any team writing a protection programme, the eBay MBG is the model and this is the counter-example.

## Caveats & gaps

- **THE BENCHMARK STRENGTH IS UNHARVESTED.** "Delivery tracking and issue recovery" was the reason 064 is in this corpus, and the pages that carry it are blocked. T6 and T7 — the two priority sections — contain only what the seller marketing estate incidentally reveals. No Amazon consumer order state, delivery state, tracking string, error title or recovery step is quoted in this file, because none was observed.
- **Four blocked URLs, all returning empty response bodies**: `www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7` (Amazon's own return policy), `?nodeId=508510` (help home), the same return-policy node with a `ref_` parameter, and `www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7`. The UK attempt confirms the block is not geography-specific. **No workaround was attempted** — no alternate client, no archive, no cached view.
- **`sellercentral.amazon.com/help/hub/reference/external/*` is JavaScript-only.** The page frame, nav and footer render; the article body is replaced by the literal string `You need to enable JavaScript to run this app.` Every `Learn more` link from the seller FAQ into detailed policy (including the A-to-z Guarantee at `G27951`, fee guidelines at `G6F7CN3EQS7MEGCN`, returns at `G200708210`) terminates there.
- **`www.amazon.com/` returned a degraded fragment** — merchandising strings only, no navigation, no footer, no search, no chrome. It is listed as inspected but yielded nothing usable for any taxonomy category, and no consumer-facing nav labels are claimed from it.
- **`sell.amazon.com/learn/faq` exceeded the fetch size limit** and was read by a delegated sub-agent from a persisted file. All 52 questions and the programme-term list in T13 come from that extraction. Question text is high confidence (quoted directly); answer summaries are the sub-agent's one-line précis and are marked as summaries throughout, never quoted as Amazon's words.
- **`sell.amazon.com/pricing` also exceeded the limit on a first attempt** but was successfully retrieved inline on a second; the fee table in T10 is observed directly.
- **Amazon's consumer estate is entirely unrepresented**: no product detail page, no cart, no checkout, no Your Orders, no tracking page, no Prime terms, no accessibility statement, no consumer help IA.
- **Everything in this file describes the seller audience.** Amazon is a two-audience marketplace and only one register was reachable. Any comparison between 064 and 062/063 on consumer tone or consumer recovery is invalid on this evidence.
- Locale is en-US throughout.

## Sources

1. https://sell.amazon.com/
2. https://sell.amazon.com/learn/faq
3. https://sell.amazon.com/pricing
4. https://sell.amazon.com/programs/fulfilled-by-merchant
5. https://www.amazon.com/ *(degraded fragment — merchandising strings only)*
6. https://sellercentral.amazon.com/help/hub/reference/external/G201889410 *(JS shell — "You need to enable JavaScript to run this app.")*
7. https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7 *(BLOCKED — empty response)*
8. https://www.amazon.com/gp/help/customer/display.html?nodeId=508510 *(BLOCKED — empty response)*
9. https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7&ref_=hp_left_v4_sib *(BLOCKED — empty response)*
10. https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7 *(BLOCKED — empty response)*
