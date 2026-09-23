# 072. DoorDash

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Restaurant delivery marketplace, extended to grocery, convenience and retail (three-sided: customer / Dasher / merchant, plus corporate and advertiser) |
| Primary URL | https://www.doordash.com/ |
| Corpus rank | 072 |
| Benchmark strength (source list) | Order status and issue resolution |
| Locale / market observed | en-US. Locale switcher offers `English (US)` · `Español (US)` · `English (CA)` · `Français (CA)` · `English (AU)` · `English (NZ)` |
| Platform observed | Web storefront, help centre (all five audiences), corporate accessibility page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Visible in copy: a named `Regulatory Response Fee` for local/state regulation; a NYC-specific tipping rule dated `December 4, 2023`; `Seattle Sick Pay` and `NYC Earning Standards` as Dasher help subcategories; alcohol delivery age rules; `Service Provider Platform Access Policy` (deactivation) |
| Harvest date | 2026-09-21 |
| Pages inspected | 22 |
| Harvest completeness | Full for the help centre — `help.doordash.com` and `about.doordash.com` server-render completely and nothing was blocked. Partial for the consumer app itself: the live order tracker is behind auth, and DoorDash **does not publish a complete tracker state machine**. Only three customer-facing stages exist in public copy. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Storefront | https://www.doordash.com/ | Hero, category IA, footer, audience CTAs |
| Help centre index | https://help.doordash.com/en-us/consumers | **All five audience trees rendered on one page** |
| Your DoorDash Order (category) | https://help.doordash.com/en-us/consumers/category/your-doordash-order | 17 article titles — the core failure IA |
| Troubleshooting (category) | https://help.doordash.com/en-us/consumers/category/troubleshooting | Only 2 articles, both about the app itself |
| Where is my order? | https://help.doordash.com/en-us/consumers/article/customer-where-is-my-order | **The only published tracker states** |
| Why was my order cancelled? | https://help.doordash.com/en-us/consumers/article/why-was-my-order-cancelled | Cause list + remedy |
| What can I do if I did not receive my order? | https://help.doordash.com/en-us/consumers/article/i-never-received-my-doordash-order | Issue-picker path |
| What can I do if my food was delivered late? | https://help.doordash.com/en-us/consumers/article/what-can-i-do-if-my-food-was-delivered-late | Report-only path |
| Missing or incorrect item | https://help.doordash.com/en-us/consumers/article/my-order-was-missing-an-item-incorrect-order | Taxonomy table + photo-evidence rules |
| How do I cancel my order? | https://help.doordash.com/en-us/consumers/article/how-do-i-cancel-my-order | **Refund-by-state matrix** |
| Credit or Refund status | https://help.doordash.com/en-us/consumers/article/how-can-i-check-the-status-of-my-credit-or-refund | Refund timing windows |
| DoorDash Grocery Orders | https://help.doordash.com/en-us/consumers/article/doordash-customer-grocery-orders | Substitution/out-of-stock, customer side |
| What fees do I pay on Caviar and DoorDash? | https://help.doordash.com/en-us/consumers/article/what-fees-do-i-pay | **Seven named fees, two parallel regimes** |
| Tip adjustment | https://help.doordash.com/en-us/consumers/article/can-i-adjust-the-tip-i-provide-to-my-dasher | |
| What is DashPass? | https://help.doordash.com/en-us/consumers/article/what-is-dashpass | |
| DashPass (category) | https://help.doordash.com/en-us/consumers/category/dashpass | |
| Accessibility (category) | https://help.doordash.com/en-us/consumers/category/accessibility | **Contains one article, unrelated to accessibility** |
| Accept and Complete Deliveries | https://help.doordash.com/en-us/dashers/category/accept-and-complete-deliveries | 15 subcategory names |
| Customer unavailable (Dasher) | https://help.doordash.com/en-us/dashers/article/how-to-complete-a-delivery-when-the-customer-is-unavailable | Failure ladder + deactivation warnings |
| Item has run out/is unavailable (Dasher) | https://help.doordash.com/en-us/dashers/article/item-has-run-out-is-unavailable | Substitution picker, courier side |
| Managing Orders (merchant) | https://help.doordash.com/en-us/merchants/category/receiving-and-fulfilling-orders | |
| Understanding Error Charges and Disputes | https://help.doordash.com/en-us/merchants/article/what-are-order-error-adjustments | **The same event, priced** |
| Accessibility statement | https://about.doordash.com/en-us/accessibility | WCAG 2.2 AA claim |

---

## T1 Navigation & IA labels

**One domain, five audiences, two switchers per page — the defining IA decision** `[observed]`

Unlike Uber and Deliveroo, which split audiences across domains, DoorDash hosts customer, Dasher, merchant, corporate and advertiser help on a single host with an explicit switcher. The help index renders **all five category trees on one page**, stacked.

The switcher appears twice per page in **two different grammars**:

| Position | Heading | Labels |
|---|---|---|
| Top | `I'm looking for other Support` | `Dasher Support` · `Merchant Support` · `Business Support` · `Ads Support` |
| Bottom | (no heading) | `I'm a Merchant` · `I'm a Dasher` · `I'm a Customer` · `I'm a Corporate Customer` · `I'm an Advertiser` |

The top switcher names the *destination*; the bottom switcher names the *reader*. Both are on every page. And both are **audience-relative** — the current audience is omitted from the top list.

Masthead label per audience: `for Customers` · `for Dashers` · `for Merchants`. Breadcrumb root is always `DoorDash Help Center` then the audience name.

**Customer help categories (11)** `[observed]`: `Accessibility` · `Alcohol Orders` · `Customer Support` · `DashPass` · `General` · `Get Started with DoorDash` · `Manage Your Account` · `Payments` · `Promotions` · `Troubleshooting` · `Your DoorDash Order`

**Dasher help categories (14)** `[observed]`: `Accept and Complete Deliveries` · `Access Special Order Types` · `Account Updates` · `Become a Dasher` · `DoorDash Crimson` · `Earn and Get Paid` · `Enjoy Dasher Perks` · `General` · `Dasher App` · `Get Support and Troubleshooting` · `Legal` · `Maintain Great Ratings` · `Start Dashing` · `Stay Protected In COVID-19`

**Merchant help categories (12)** `[observed]`: `Account Management` · `Financials` · `General` · `Hardware` · `Managing Orders` · `Marketing` · `Menu` · `Merchant Portal` · `POS Integrations` · `Reporting` · `Retail Stores` · `Software`

**The grammar of the three category sets is the artefact.** Customer categories are **possessive noun phrases about the reader's stuff** (`Your DoorDash Order`, `Manage Your Account`). Dasher categories are **imperative verb phrases telling the reader what to do** (`Accept and Complete Deliveries`, `Start Dashing`, `Maintain Great Ratings`, `Enjoy Dasher Perks`). Merchant categories are **bare abstract nouns** (`Financials`, `Menu`, `Hardware`, `Reporting`). The customer owns things, the Dasher performs actions, the merchant operates systems — encoded in the part of speech before a single article is opened.

`Stay Protected In COVID-19` is still a live Dasher category in 2026. `Enjoy Dasher Perks` is the only category in any of the three sets whose verb describes an *emotion*.

**Dasher subcategories inside `Accept and Complete Deliveries`** `[observed]`: `Accept Order` · `Pickup` · **`Dropp-off`** (sic — live typo) · `Alcohol Order` · `Gift Deliveries` · `Customer Unavailable` · `Accident Policy` · `PIN Deliveries` · `Dash Location` · `Hotspots` · `Getting More Orders` · **`HSL`** (unexpanded internal acronym shipped as a navigation label) · `Item Unavailable` · `Weighted Items` · `General`

**Merchant subcategories inside `Managing Orders`** `[observed]`: `Deliveries` · `Cancellations & Refunds` · `Dasher Relations` · `Pickup Orders` · `General` · `Drive On-Demand` · `Online Ordering` · `Self-Delivery (Flexible Fulfillment)`

`Dasher Relations` as a merchant help subcategory is a small, telling piece of naming: the courier is a category of *relationship management* to the restaurant.

**Storefront footer groupings** `[observed]`: `Get to Know Us` · `Let Us Help You` · `Doing Business`. The help-centre footer adds `Sites`, which lists the five audience homes: `Consumers` · `Dashers` · `Merchants` · `Advertisers` · `Businesses` — note `Consumers` here against `Customer Support` everywhere else.

## T2 Value proposition & headline patterns

**Storefront hero** `[observed]`

> `$0 DELIVERY FEE ON FIRST ORDER`
> `Other fees apply`

The disclaimer is three words, set immediately beneath a shouted all-caps offer. That pairing — a maximal claim and a minimal bounding phrase, adjacent — is the entire fee-disclosure posture of the product in miniature.

**Section headers are noun-phrase promises, one per vertical** `[observed]`

`Everything you crave, delivered.` · `Your favorite local restaurants` · `DashPass is delivery for less` · `Get grocery and convenience store essentials` · `Grocery delivery, exactly how you want it.` · `Convenience stores at your doorstep` · `Beauty essentials from top brands` · `Flowers for any occasion` · `Restock the minibar` · `What your pets need, and want`

`What your pets need, and want` is the only one with a comma-and-turn. `Restock the minibar` is the only imperative. The set is otherwise uniformly declarative and possessive.

**Two audience-recruitment blocks sit inside the consumer homepage** `[observed]`, under the eyebrow `Unlocking opportunity for Dashers and businesses`:

- `Sign up to dash and get paid` — "Deliver with the #1 Food and Drink App in the U.S. As a delivery driver, you'll make money and work on your schedule."
- `Grow your business with DoorDash` — "Businesses large and small partner with DoorDash to reach new customers, increase order volume, and drive more sales."

Note the slippage: the consumer-facing recruitment copy says **"delivery driver"**, a term DoorDash never uses anywhere else. Everywhere else the word is `Dasher`.

**Help-article openers are apologies, and they are formulaic** `[observed]`

- `First and foremost, we're sorry! While we strive to make both your order and delivery experience perfect every time, sometimes mistakes happen. And when they do, we're here to make things right.` (missing/incorrect item; near-identical on never-received)
- `First and foremost, we're sorry that your order is taking longer than expected!` (where is my order)
- `We're sorry we couldn't get you your order on-time. We know how important it is to have your food delivered at the expected time.` (late)
- `Getting hungry and wondering where your food is? We've got you covered.` (where is my order, opening line)

The template is **apology → universal-failure concession → remedy promise**, and the concession sentence ("sometimes mistakes happen") is reused verbatim across at least two articles. It is a good sentence, and it is doing the work of never naming who made the mistake.

## T3 CTA inventory

| CTA (verbatim) | Context | Audience |
|---|---|---|
| `Sign In` / `Sign Up` | Storefront header | Customer |
| `Get DashPass` | Storefront DashPass block, and the DashPass page title **and** its button | Customer |
| `Get $0 delivery fees with DashPass` | App account menu | Customer |
| `Get Free Deliveries` | Desktop DashPass entry — **a third label for the same action** | Customer |
| `Find restaurants` · `Shop Groceries` · `Shop Now` · `Shop beauty` · `Send Flowers` · `Shop Alcohol` · `Get Pet Supplies` | Vertical blocks, one verb each | Customer |
| `Get the app` · `Start earning` · `Sign up for DoorDash` · `Become a Partner` · `Become a Dasher` | Cross-audience blocks on the consumer homepage | Mixed |
| `Help` | Order detail — **the single entry point for every failure path** | Customer |
| `Order Issues` → `Missing or incorrect items` | Mobile issue picker | Customer |
| `Order Issues` → `Missing items` / `Items made incorrectly` | **Desktop** issue picker — the desktop split is finer than mobile | Customer |
| `Delivery Issues` → `Order never arrived` | Issue picker | Customer |
| `Delivery Issues` → `Order Arrived late` / `Order arrived late` | Issue picker — **casing differs between the mobile and desktop steps on one page** | Customer |
| `Cancel Order` | Help menu and Order Details section | Customer |
| `Add Tip` (progress screen) / `Add tip` (Orders tab) | Two casings, one action | Customer |
| `View Receipt` | Orders tab | Customer |
| `Add` | Grocery order tracking page, mid-shop | Customer |
| `Make adjustments to this order` | Order tracker `Help` menu — the only named order-modification control | Customer |
| `Chat with Us in the DoorDash App` · `Call Us at 855-431-0459` · `Automated help system` | Every help page footer | Customer |
| `Was this article helpful?` → `Yes` / `No` | Every article footer | All |
| `Help` → `Drop-off issues` → `Reached drop-off location` → `Can't reach customer` | Dasher failure ladder | Dasher |
| `Leave the Order` | Dasher, after timer expiry | Dasher |
| `complete delivery steps` → `complete delivery` | Dasher arrival | Dasher |
| `Handed order directly to customer` / `handed order directly to customer` | Dasher — two casings in one article | Dasher |
| `The item has been substituted` / `The item is unavailable` | Dasher out-of-stock picker | Dasher |
| `Issue with Order` → `Yes, Cancel this Order` | Merchant tablet | Merchant |
| `Mark out of stock` / `Replace item` / `Refund item` / `Add charge` | Merchant tablet out-of-stock flow | Merchant |
| `Confirm Order` · `Rate Dasher` → `Block Dasher` · `Pause All Ordering Channels` | Merchant tablet | Merchant |
| `Chat with us on Business Manager App` · `Call us at 855-222-8111` | Merchant footer — **a different number and lower-case "us"** | Merchant |

## T4 Onboarding & getting-started

`[absent]` for the consumer signup flow. What is public is the **merchant acquisition promise**, verbatim: `Attract new customers and grow sales, starting with 0% commissions for up to 30 days.`

**Dasher order-acceptance flow** `[documented]`: "When you get an offer, you will receive a notification, and the delivery or task details will appear in your app." Then the hard constraint: **"You have 50 seconds to choose to accept the offer (unless otherwise stated in the app)."** Repeated for stacked work: "If you're already on an account and you are offered a new one, you'll have 50 seconds to decline or accept it."

**Merchant order-fulfilment flow** `[documented]`: `Live Orders` → `Order Details` → `Confirm Order`. Automatic safety valve stated verbatim: "If your store has high avoidable wait times, DoorDash will automatically pause orders to your store for up to 30 minutes, allowing you time to catch up on orders."

The two flows sit at opposite ends of a pressure gradient: the Dasher gets **50 seconds**, the merchant gets **30 minutes** of grace. Both numbers are published.

## T5 Form & field labels

Thin — checkout and cart are behind auth. What is named `[documented]`:

- `Fulfillment type` (merchant portal column), value `Customer Pickup`
- `Store Availability` (merchant setting)
- Out-of-stock duration options, merchant Business Manager app, verbatim: `For a few hours` · `Until the end of the day` · **`Indefinitely (the item will automatically become available again after the selected time)`**

That third option is self-contradictory as written — "indefinitely" followed by an automatic restore. A real copy defect in a merchant-critical control.

- Photo-evidence guidance on the customer issue form, verbatim headers: `Original, clear photos of the items you received` · `A photo of the receipt (if available)` · `A photo that directly supports your reported issue`

## T6 Status & state language — PRIORITY

### The three published customer stages — and nothing else

`[documented]`, from `Where is my order?`, introduced by "After check-out, your order will go through different stages:"

1. **`In the process of being confirmed`**
2. **`At the restaurant`**
3. **`The Dasher is on the way to you`**

That is the complete published list. DoorDash calls them "the three stages described above" and says the status "includes the estimated time of arrival and one of the three stages".

**These are not status labels. They are sentence fragments describing where the order is.** Compare Instacart's `Shopping in progress` / `Out for delivery` / `Delivered`, which are nominalised states. DoorDash's are prepositional and progressive — `In the process of being confirmed` is a seven-word passive construction, and `The Dasher is on the way to you` is a full clause with a subject, a verb and a second-person object.

There is **no published `Preparing`, no `Picked up`, no `Out for delivery`, no `Delivered`**. There is no named `Cancelled` tracker state. Any corpus entry claiming those for DoorDash would be invented.

**Supporting tracker vocabulary** `[documented]`: entry is the `Orders` tab or `Orders` button; desktop path is `Help` → `Order Status`. `text` and `call` buttons sit "below the status bar on your order". The map appears only "If a Dasher has already agreed to deliver your order".

**The pre-assignment state is deliberately unnamed.** Instead of a label, DoorDash ships a sentence: **`Please bear with us as we may be more busy than usual`**. A state that has no name gets an apology instead.

**The tracker screen has three names across three articles** `[documented]`: `the progress screen` (tipping article), `the order tracking page` (grocery article), `the order tracker page` (Dasher item-unavailable article). Three names, one screen, three authors.

**Named exception state** `[documented]`: **`This store delivers its own orders`** — a store-page/checkout message, with the consequence stated plainly: "DoorDash is unfortunately not able to track your delivery." The degraded-tracking case is named on the storefront rather than discovered at the tracker.

### Dasher-side state vocabulary — a different object model entirely

`[documented]`. The Dasher does not work on *orders*; they work on **offers**.

- `offer` — the unit of assignment. `batched offers` — "during peak times, you may receive multiple offers at once"
- `Dash` — capitalised proper noun for a shift: "Once signed into your Dash"
- Two delivery modes, set in caps in source: **`NO-CONTACT`** and **`HAND IT TO ME`**
- Arrival: `complete delivery steps` → `complete delivery` → `Handed order directly to customer` → `Mark the order as delivered`
- Failure ladder: `Help` → `Drop-off issues` → `Reached drop-off location` → `Can't reach customer` → "Your app will show a timer" → `Leave the Order`
- Customer-requested variants the Dasher sees: `no-contact`, `contactless`, `leave at my door` — three names for one preference

### Merchant-side state vocabulary — a ledger, not a journey

`[documented]`. `Live Orders` · `Order History` · `Order Details` · `Issue with Order` · `Confirm Order` · `Out of stock` / `Out of Stock` · `Store Availability` → `Pause All Ordering Channels` · `Rate Dasher` → `Block Dasher`.

And the states that only exist for merchants, because only merchants can be charged: **`Dispute under review`** (yellow tag) · **`Dispute approved`** (green) · **`Dispute denied`** (red) · transaction filter value **`Error charge`**.

### Failure causes, published as lists

**Delay causes** `[documented]`, verbatim: "The Dasher may be stuck in traffic" / "The Dasher may need to take a detour" / "The restaurant may be busy".

**Cancellation causes** `[documented]`, verbatim: "The restaurant is closed" / "The restaurant is out of an item" / "The restaurant is no longer accepting takeout orders".

**All six causes point away from DoorDash.** Two blame traffic or the Dasher's route, three blame the restaurant, one blames the restaurant's stock. The article title is `Why was my order cancelled?` — passive — and the body says "if it is cancelled by a party other than you". DoorDash is never the grammatical agent of a failure in its own customer copy.

## T7 Error, failure & recovery — PRIORITY

### The missing/wrong-item taxonomy, published as a two-column table

`[documented]` — this is DoorDash's clearest single content artefact:

| `Missing Items` | `Incorrect Items` |
|---|---|
| Whole item ordered is missing | Wrong size received |
| Part of an item (i.e. side of fries from combo meal) is missing | Incorrect menu item received |
| | Special instructions or request for additional ingredients was not followed |
| | Item contained unexpected ingredients or differed from menu description |

Two things to note. **"Part of an item" is a named category** with a worked example — the side of fries from a combo. Partial-item failure is the commonest real grocery/restaurant complaint and almost nobody names it. And **unmet special instructions are filed under "incorrect", not under "quality"** — a definitional choice that determines who pays.

**A routing rule is shipped as a note at the bottom**, verbatim: "If you received the wrong order (i.e. all item(s) were not what you ordered), please follow the above instructions but report as `Order never arrived` under `Order Issues`." The whole-wrong-order case is deliberately routed to the *non-delivery* path rather than the wrong-item path, because the remedy differs. Explicit cross-routing between two failure taxonomies, written for the user.

### The issue picker — and its mobile/desktop divergence

`[documented]`. Top-level category: `Order Issues` for item problems, `Delivery Issues` for non-delivery and lateness.

| Platform | Item options |
|---|---|
| Mobile | `Missing or incorrect items` — **one combined option** |
| Desktop | `Missing items` **or** `Items made incorrectly` — **two options** |

The same product asks a different question depending on the device. And `Delivery Issues` renders as `Delivery Issues,` (with a trailing comma) in the mobile steps and `Delivery issues` in the desktop steps of the *same article*.

### Named remedies — deliberately vague at the moment of choice

`[documented]`. The self-serve promise names three: "our full suite of resolution options that a support representative can provide depending on the specific circumstances, which may include a **Credit, Refund, or Redelivery** of your missing/incorrect items (when available)."

But the actual step copy refuses to name any:
- Never-arrived: **"Follow the prompts on the screen to either select a resolution or chat with an agent who will help provide the best resolution for you"**
- Late: **"Follow the prompts on the screen to report the issue to our team"**

**The late path offers no resolution at all — only reporting.** That is a real and deliberate register difference between two failure types on adjacent pages, and it tells you exactly which failure DoorDash is willing to pay for.

Elsewhere only two remedies are named: `Credits:` and `Refund:` are treated as two distinct objects with their own headings in the refund-status article. Cancellation promises "a full credit or refund".

### The cancellation refund matrix — the best fee-transparency artefact in this file

`[documented]`. A four-row table mapping order state to refund outcome, introduced by "Generally, for orders that are not late:"

| `Order Status` | `Refund` |
|---|---|
| Restaurant has not confirmed order and a Dasher has not been assigned | `Full Refund` |
| Restaurant has not confirmed order but a Dasher has been assigned | `Partial Refund` |
| Restaurant has confirmed order but a Dasher has not been assigned | `Partial Refund` |
| Restaurant has confirmed order and a Dasher has been assigned | `No Refund` |

This is a **truth table for the user's money**, and it names exactly the two variables the customer cannot see on the tracker (merchant confirmation, Dasher assignment). The table is more informative about the order's true state than the three-stage tracker is. It is immediately followed by the disclaimer "Decisions to provide any refunds or credits are in DoorDash's sole discretion" — a precise table and a total discretion clause, stacked.

### Every literally-stated time window

`[documented]`. The asymmetry across audiences is the finding.

| Window | Verbatim | Audience |
|---|---|---|
| Tip adjustment | `up to 30 days after` (stated twice) | Customer |
| Pending charge removal | `one to three business days` | Customer |
| Posted refund | `five to seven business days` | Customer |
| Escalation trigger | "If it has been more than seven business days … please contact Support" | Customer |
| Credits | "Credits are available immediately and will automatically be applied to your next order." | Customer |
| **Reporting deadline** | **none published** | Customer |
| Offer acceptance | `50 seconds` | Dasher |
| Post-delivery photo reply | "for up to 30 minutes after the delivery" | Dasher |
| Merchant error-charge immunity | "If errors are reported by customers **72 hours or more** after delivery, we absorb the cost and do not issue error charges to merchants" | Merchant |
| Merchant dispute window | "the delivery must have occurred within the **last 14 days**" | Merchant |
| Dispute SLA | "a resolution will be provided on the Merchant Portal within a few hours" | Merchant |
| Dispute-button lockout | "The dispute button will usually get re-enabled within 72 hours." | Merchant |
| Store auto-pause | "pause orders to your store for **up to 30 minutes**" | Merchant |
| Merchant↔customer call connect | "DoorDash will connect the call within 30 seconds" | Merchant |

**The customer is given no reporting deadline anywhere; the merchant is given a hard 14 days.** The 72-hour figure is a *merchant-side immunity threshold*, not a customer window, and must not be relabelled as one.

### The same event, priced — the merchant view of "my order was wrong"

`[documented]`, from `Understanding Error Charges and Disputes`. Verbatim: "When a customer reports an item from their order as missing, incorrect, or of substandard quality, DoorDash issues a refund and/or credit to customers on your behalf. Depending on the situation, you may be charged a partial or full fee to cover the cost of reimbursement." And: "the restaurant may be charged **between 25% to 100%** of the applicable item price + tax."

The merchant-side lifecycle is published as five named stages: **`Error Reported:`** → **`Error Evaluated:`** → **`Error charge issued if applicable:`** → **`Opportunity to dispute:`** → **`Dispute evaluated:`**

And the exclusions are named, verbatim: "For situations outside your control, e.g., **late deliveries, no-shows, and temperature issues**, DoorDash refunds the customer, and we typically do not issue error charges."

**`no-shows` and `temperature issues` are merchant-only vocabulary that never appears on the customer surface.** The customer has no way to report a "temperature issue" as such — but the merchant's liability schedule has a name for it.

### Photo evidence as a content requirement

`[documented]`. DoorDash publishes an explicit evidence standard on the customer-facing article, with three named headers and worked examples: "If you're reporting a missing item, such as fries, show the opened bag with the fries missing. If you received an incorrect item, include a photo of what you received instead." Justification sentence: "Providing appropriate photo evidence helps us better understand your concern and reach a resolution more quickly."

The framing is **speed, not suspicion**. The evidence requirement is sold as a way to get a faster answer rather than as an anti-fraud gate — even though the merchant-side article confirms it is both.

## T8 Empty states

`[absent]` for the consumer app. The only adjacent string is the meta description used on Dasher subcategory pages: **`Just search to find your answer`** — a zero-state instruction shipped as page metadata.

## T9 Notifications & system messages

`[documented]`

- `This store delivers its own orders` — store-page notice, customer
- `Please bear with us as we may be more busy than usual` — unnamed waiting state, customer
- `Hang tight and we will find a Dasher for your order and have your order delivered to you!` — grocery confirmation lag, customer
- "We can also send you notifications about any important updates regarding your order - just make sure you've opted into notifications." — opt-in nudge, customer
- "Please check your email for the updated charges and refunds." — grocery billing, customer
- Refund email contains "the **refund issue date and refunded amount**"
- Delivery photo is dual-channel and automatic: "the photo you took and submitted will automatically be texted and emailed to the customer to help them find their order" — and the customer can reply to it "for up to 30 minutes after the delivery"
- Out-of-stock: "A notification will be automatically sent to the customer"
- **Deactivation warnings to the Dasher**, verbatim: `A text or email notification to let you know a customer reported an incomplete delivery` and `A warning notice once your account has been flagged for deactivation.`
- Merchant inbound alert: "you'll see a notification or yellow badge on the order ticket" then a `Reply` button
- Merchant caller ID masking: "Your phone number will be masked, and the caller ID will appear as DoorDash."
- Article-footer furniture on every page: `Was this article helpful?` / `Yes` / `No`; `Continue exploring helpful resources`; `Can't find what you are looking for?`

## T10 Disclosures, legal & compliance — fee itemisation

### Seven named fees, published twice, because of a live rollout

`[documented]`, from `What fees do I pay on Caviar and DoorDash?`. The page splits the US into two regimes under two verbatim H2s:

- `DoorDash Fees in markets where fee updates are rolling out starting in Late July 2026.`
- `DoorDash Fees in markets where fee updates are not rolled out at this time.`

The excluded-market list is stated in both sections: "California, Chicago, Colorado, the District of Columbia, Massachusetts, Minnesota, New York City, Puerto Rico, and Seattle".

**Publishing two complete fee schedules side by side, with the geography of each stated, is an unusually honest way to handle a staged pricing change.** Most products ship the new schedule and leave the old markets to discover the mismatch.

| Fee name (verbatim) | Definition (verbatim, abridged) |
|---|---|
| `Service Fee:` | New: "A variable fee that helps cover the cost of facilitating your delivery and that varies with factors like distance and order size. A flat, minimum service fee may apply." Old: "may vary but is 15% of your subtotal for most orders (and 5% for most eligible DashPass restaurant orders)" |
| `Delivery Fee:` | New: "A **fixed** fee per order that varies by merchant." Old: "A **flat** fee per order that varies by merchant." |
| `Long Distance Fee:` | "You may have the option to place longer distance orders, and this fee helps cover the cost of completing the delivery." |
| `Regulatory Response Fee:` | "DoorDash may charge this fee when a local or state regulation leads to increased operating costs… flat fees that vary based on region." |
| `Small Order Fee` | "this fee is charged to enable us to make small transactions worthwhile to fulfill. A fee may be charged if your order subtotal is below a certain amount." **No threshold stated.** |
| `Weather Impact Fee:` | "Occasionally during major weather events, DoorDash may charge an additional fee to support Dashers for their efforts" |
| `Optional Express Delivery Fee:` | "On some orders in some areas, you can choose Express delivery for an additional fee." |

Closing hedge on both lists: **`Note: This list may be subject to change.`**

### The "not a fee" carve-out

`[documented]`. A separate sub-head, verbatim `Other charges you may see:`, holds three items deliberately excluded from the fee list:

- `Estimated Tax:` — "Calculated based on local regulations and your order subtotal. The finalized tax appears on your order receipt."
- `Optional Dasher Tip:` — "Every dollar you tip goes to your Dasher… Dashers receive 100% of customer tips, and tipping is always optional."
- `Bag, Bottle, and Other Mandatory Fees:` — "government authorities require DoorDash to charge certain fees on bags and bottles… These are applied as required by law."

**The third item is called a "fee" in its own label and filed under "other charges", not under "fees".** The taxonomy is doing rhetorical work: fees DoorDash chose are `Fees`; fees the government imposed are `Other charges`. Note also that the tip — the one line the customer fully controls — is grouped with tax and statutory levies rather than with the discretionary items.

### Destination-of-funds statement

`[documented]`, repeated as a standalone sentence in both regime blocks: **`These fees go to DoorDash.`** Four words. Expanded once: "These fees go to DoorDash to help us cover our costs of fulfilling your order, paying Dashers, operating DoorDash, and enabling us to provide the best service possible."

Rationale for the reprice, verbatim: fees should "better reflect how far an order travels and how much effort it takes to deliver it, in addition to the size of your order."

**`These fees go to DoorDash.` is the most quotable fee sentence in this batch.** It pre-empts the "does the restaurant get this?" question that the entire category suffers from, in one declarative clause, before any justification.

Caviar adds: "There are no service fees on pickup orders." and promises "a receipt showing a breakdown of the order subtotal, applicable taxes, fees, and gratuity."

**`expanded range fee` does not exist in DoorDash's published list.** The nearest real name is `Long Distance Fee`. **No `Small Order Fee` dollar threshold is published on the consumer page** — do not supply one.

### DashPass

`[documented]`. Positioning: `DashPass is DoorDash's membership program.`

Benefits, new regime, under "Under the updated fee structure, members continue to get:"
- `$0 delivery fees on eligible orders;`
- `A reduced service fee on eligible orders; and`
- `$0 Long Distance Fee on eligible restaurant orders that meet a subtotal minimum.`

The third is new-regime only. Also: "Subscribers enjoy exclusive member benefits, like priority customer support and DashPass-only promotions." Savings claim: "DashPass subscribers save an average of $4-5 per eligible order." Pricing: "just $9.99/month with the monthly plan or $96/year ($8/month) with the Annual Plan"; "it's a subscription without the commitment - you can cancel anytime."

The eligibility marker has **three names on one page**: `the green DashPass icon`, `the green checkmark`, and `(look for the checkmark)`.

Unauthorised-charge section heading, verbatim: **`I see an unauthorized charge of $9.99.`** — a help heading written in the customer's suspicious voice, with the exact amount in it. A rare and good move: the heading matches what the customer would type into search after seeing a line on their statement.

## T11 Help-centre architecture

Two-level, `category` → `article`, with a `subcategory` tier on the Dasher and merchant sides. Every article carries a read-time estimate (`3 min read`, `2 min read`), an `In this article` jump-link list, a `Was this article helpful?` widget, and a `Related Articles` block headed `Continue exploring helpful resources`.

**Article-title grammar — a clean three-way split matching the category grammar**

| Audience | Pattern | Examples |
|---|---|---|
| Customer | **First-person interrogative**, sentence case, ends in `?` | `Where is my order?` · `Why was my order cancelled?` · `What can I do if I did not receive my order?` · `Can I adjust the tip I provide to the Dasher?` · `How can I check the status of my Credit or Refund?` · `What fees do I pay on Caviar and DoorDash?` |
| Customer, exception | Product-name noun phrase | `DoorDash Grocery Orders` · `What is the Packages tab in my Orders?` |
| Dasher | **Mixed** — Title Case imperative, sentence-case question, and bare status label | `How to Accept an Offer` · `How do I complete a delivery or task if the customer is unavailable?` · **`Item has run out/is unavailable`** · `No-Contact Delivery Requests` |
| Merchant | **Gerund/noun phrase, Title Case, zero question marks** | `Understanding Error Charges and Disputes` · `Cancelling Orders on Your DoorDash Tablet` · `How to Accept and Fulfill Orders on DoorDash` |

**The customer is asked questions, the Dasher is given instructions, the merchant is given documentation.** Not one merchant title in the set ends in a question mark.

`Item has run out/is unavailable` is worth singling out: a Dasher article titled with a **bare status string containing a slash** — neither a question nor an instruction, just the condition the Dasher is standing in.

**`Your DoorDash Order` category, 17 titles** `[observed]`, the failure IA in full: `Can I adjust the tip I provide to the Dasher?` · `Can I order from different restaurants at the same time?` · `DoorDash Grocery Orders` · `How can I report a missing or incorrect item from my order?` · `How do I cancel my order?` · `How do I receive a receipt for my order?` · `How do I specify special instructions when placing my order?` · `I accidentally placed a duplicate order` · `I want to add or remove items in my order` · `This delivery was damaged` · `What are single-use accessories?` · `What can I do if I am not satisfied with my food quality?` · `What can I do if I did not receive my order?` · `What can I do if my food was delivered late?` · `What is the Packages tab in my Orders?` · `Where is my order?` · `Why was my order cancelled?`

Two of the seventeen break the interrogative pattern into **first-person declarative confessions**: `I accidentally placed a duplicate order` and `I want to add or remove items in my order`. And one is a bare third-person statement: `This delivery was damaged`. Three different first-person registers inside one category.

**Two IA defects worth recording** `[observed]`:
1. The customer `Accessibility` category contains **one article, and it is not about accessibility**: `Country and Language Availability for Consumer` (note the ungrammatical trailing "for Consumer"). There is no customer-facing accessibility guidance in the help centre at all; the real content lives off-site at `about.doordash.com`.
2. The fees article is filed under `Get Started with DoorDash`, not under `Payments`. The `Payments` category lists seven articles, none about fees.

**Support channels are split by audience, and the promise differs** `[observed]`:
- Customer: "Our chat and call support are available 24/7" · `Chat with Us in the DoorDash App` · `Call Us at 855-431-0459` · plus a second block, `Have a delivery issue? / Get a fast resolution with guided support / Automated help system`
- Dasher: same 24/7 line, same number, `Chat with Us in the Dasher App`, plus a **commercial** block: "Looking for Dasher gear? / Get Dasher essentials like Red Cards, hot bags, pizza bags, and stickers / Visit the Dasher Store online"
- Merchant: **no 24/7 promise**. Split into `My account` (email + "Submit the Merchant Portal Help Form") and `Live order issues` (`Chat with us on Business Manager App` · `Chat with us on Tablet` · `Call us at 855-222-8111`)

The merchant gets a different phone number, no round-the-clock commitment, and lower-case "us" where the customer gets `Chat with Us`.

## T12 FAQs

DoorDash does not use an FAQ accordion; every question is a standalone article, so T11 carries the question inventory. The nearest true FAQ block is the grocery article, whose H2s function as questions `[observed]`:

| # | Question (verbatim) |
|---|---|
| 1 | Why did my order not have all the items I ordered? |
| 2 | What happens if the store doesn't have an item I requested? |
| 3 | What happens if the store doesn't have exactly the quantity of an item I requested? |
| 4 | Can I ask my Dasher to pick up other items not on my initial order? |

*Answers summarised:* stores run out; unfound items are automatically refunded; quantity shortfalls are refunded as the difference at the end of delivery; and yes, items can be added mid-shop via an `Add` control on the tracking page while the Dasher is still shopping.

Q3 is the interesting one — it names the **partial-quantity** failure (ordered three limes, got two) as a distinct case with its own remedy, which most delivery products fold silently into "missing item".

## T13 Substitutions and out-of-stock — three vocabularies for one event

`[documented]`. DoorDash is the clearest case in this batch of one event carrying three incompatible names.

**Customer**: the word "substitution" barely appears, and **the default outcome is a refund, not a replacement**. Verbatim: "we will automatically refund your card on the items we weren't able to fulfill" · "If we can't find an item or the store is out of stock, you will receive a refund for any missing items." · "we will refund you the difference at the end of the delivery" (quantity shortfall). Substitution appears only as something the Dasher might phone about: "Your Dasher will be notified and will contact you if they have any questions or need you to approve any potential substitutions."

**There is no customer-facing substitution-preference setting described anywhere.** No "choose a replacement", no saved preference, no approve/refund picker. Compare Instacart, which ships all three. This is the sharpest product-content difference in the batch.

**Dasher**: gets the actual two-option picker, reached via "the 3 dots next to the item name on the pickup screen" —
- **`The item has been substituted`**
- **`The item is unavailable`**

With the consequence stated: "A notification will be automatically sent to the customer and if there is no substitution, the customer will receive a refund. Additionally, the merchant's menu is updated to show that the item is currently unavailable so no other customers will have this experience."

The Dasher is instructed to seek **"an item of the same value"**. Anything else routes the customer to `Help` → `Make adjustments to this order`. Hard rule: Dashers must not modify orders on anyone's behalf, "Otherwise, we will not be able to track the appropriate charges."

**Merchant**: gets four options with duration control — `Mark out of stock:` ("Runs until end of day, for four hours, or indefinitely") · `Replace item:` ("Use when a suitable replacement is available") · `Refund item:` ("Refund for items you can't provide") · `Add charge:` ("Up to $5 for special requests; only available if special requests are enabled").

Summary: customer = *out of stock / refund*; Dasher = *substituted / unavailable*; merchant = *mark out of stock / replace / refund*. Only the merchant and the Dasher have a word for the swap. The customer's vocabulary contains only the loss.

## T13b Terminology & glossary

DoorDash publishes no glossary. Terms harvested from usage `[observed]`:

| Term | Usage | The alternative it rejects |
|---|---|---|
| `Dasher` | Always capitalised, used on **all** surfaces including customer-facing. The act is "dashing"; a shift is a `Dash` | `driver`, `courier` — except in one consumer-homepage recruitment line that says "delivery driver" |
| `offer` | The unit of Dasher work at assignment time — not "order" | `order`, `job`, `request` |
| `Customer` vs `consumer` | Every visible label says **Customer**. `consumer` survives only in URL paths (`/consumers/`), footer legal (`Consumer Privacy`), and one leaked title, `Country and Language Availability for Consumer` | |
| `Merchant` vs `restaurant` | `Merchant` is the platform-side term (Merchant Portal, `I'm a Merchant`); customer copy overwhelmingly says `restaurant` or `the store`. The fees article leaks `merchant` into customer copy ("varies by merchant") | |
| `Service Provider` | The legal third name for a Dasher, used only in `Service Provider Platform Access Policy` (the deactivation policy) | `contractor`, `Dasher` |
| `error charge` | The merchant-side name for a customer's refund | `chargeback`, `deduction` |
| `avoidable wait time` | Merchant metric triggering auto-pause | |
| `Shop & Deliver` | The grocery/convenience product | `shopping orders` |
| `DashPass` · `DoubleDash` · `Hotspots` · `Peak Pay` · `Fast Pay` · `Challenges` · `Red Cards` · `DoorDash Crimson` · `PIN Deliveries` · `Weighted Items` · `Time Earnings Mode` · `Drive On-Demand` · `Self-Delivery (Flexible Fulfillment)` · `Storefront` | Coined product names | |
| `HSL` | A Dasher help subcategory, **never expanded anywhere** | |
| `no-shows` / `temperature issues` | Merchant-only failure vocabulary | |
| `partners` | Used by the platform for **all three sides at once**: "We do our best to be fair and transparent to all partners — merchants, customers, and Dashers." | |

That last one is the interesting one: DoorDash calls its *customers* "partners" inside a fairness statement in the merchant error-charge article. The word is doing equalising work in a document about who pays.

## T14 Voice, tone & accessibility

**Register by audience — a three-step ladder**

*Customer:* warm, apologetic, food-flavoured, exclamation-heavy. "Getting hungry and wondering where your food is? We've got you covered." · "First and foremost, we're sorry!" · "Still have questions? We're here for you!" · "Hang tight" · "Please bear with us". Contractions throughout. **The customer is never blamed and is never told about downstream consequences to a Dasher or a merchant.**

*Dasher:* procedural second-person imperative, with explicit jeopardy interleaved. Encouraging in places — "If you find the customer, great! You can give them the food" — while the same articles carry deactivation warnings. The tone oscillates between buddy and compliance notice inside a single page. Customer-facing copy also carries a Dasher-protective line: "Please note that Dashers need to stay safe and obey the rules of the road. If a Dasher does not answer immediately, they may be driving."

*Merchant:* financial, hedged, quantified. "While we're confident that our policies and principles for order errors are robust, we're always willing to review cases where you feel there may have been mistakes." Percentages everywhere ("25% to 100%", "reduce accuracy errors by 20% to 50%"). Best-practice guidance in italicised imperative headings: `*Optimize your menu:*`, `*Label bags:*`, `*Check off items on the receipt:*`.

**The sharpest register split in the corpus.** One investigation, described twice:

> **To the customer:** "Please know that we take reports of orders that have not been delivered very seriously. We investigate every order that is reported as never delivered to find the root cause and can ensure this doesn't happen again in the future."
>
> **To the Dasher:** `What happens if a customer reports they didn't receive the order?` — "When a customer reports that you have not delivered an order, we will review the delivery or task details… In cases where you have not completed these steps, **your account will be eligible for deactivation**."

Same process, opposite affect: *root-cause analysis* for one reader, *deactivation risk* for the other. Neither sentence is false. A content designer should be able to name which one their product ships and to whom.

**Accessibility statement** `[observed]`, at `about.doordash.com/en-us/accessibility`. Three headings: `Our policy & commitment` · `Continuous improvement` · `Contact`.

- Standard claimed, verbatim: "we are striving to make our websites and online services accessible for everyone, regardless of ability, and to follow the **W3C's WCAG 2.2 AA** (Web Content Accessibility Guidelines) and other applicable web accessibility laws." — **2.2 AA is one version ahead of the industry norm**, and the strongest claim in this batch.
- Practice named: "This includes **annual accessibility audits**, regular training for our staff, implementing new accessibility features, and staying up-to-date with the latest standards and guidelines."
- Channel: "We want to hear from you." plus a dedicated line **1-855-300-8985** and **accessibility-feedback@doordash.com**
- Opening: "At DoorDash, we take customer obsession and accessibility of our products very seriously" — note the statement covers all five audiences but is authored in consumer voice.

**Alt text — poor, and the failure is inverted relative to audience size** `[observed]`

Many customer-facing help images carry alt text that is a **migration artefact**, verbatim e.g. `Migrated from Salesforce: https://figment.file.force.com/servlet/rtaImage?eid=ka02L000000ERjE&feoid=…`. This appears on `Where is my order?`, the never-received article, the late-delivery article, the refund-status article, `What is DashPass?`, and three Dasher articles. A screen-reader user asking where their food is gets a Salesforce URL read aloud instead of a description of the tracker.

Merchant pages, by contrast, carry real structured alt: `Mx - Tablet - Issue with Order`, `Mx - Portal - Settings - Account Settings - Pickup Instructions`, `Mx - Business Manager App - Out Of Stock (GIF)`. Not prose, but meaningful.

**The consumer surface — the largest audience — has the worst alt text, on the pages people reach when something has gone wrong.** And two tipping-article images carry empty alt while being screenshots of the `Add Tip` control, so they are not decorative. The accessibility page's own images are filename-style: `a11y-header-image-icon`, `design team2`, `Dx AU Army Dashers Melbourne ` (trailing space).

**Live defects recorded honestly**

1. `Dropp-off` — typo in a Dasher subcategory navigation label.
2. `reduced services fee` — typo, DashPass article.
3. `order subto-tal` — stray hyphen, merchant error-charge article.
4. `Review the Fulfillment type column doe orders labeled Customer Pickup` — "doe" for "for", merchant article.
5. `Select the 'Orders' button in the bottom top left-hand corner` — "bottom top", never-received article. The parallel late article says "bottom left-hand corner".
6. `DashPass Gifting FAQ's` — greengrocer's apostrophe in a category listing.
7. Duplicated table cells in the tipping article (rows 1 and 4 repeat identically across both columns).
8. Within-page casing conflicts: `Order Arrived late`/`Order arrived late`; `Delivery Issues`/`Delivery issues`; `Add Tip`/`Add tip`; `Out of stock`/`Out of Stock`; `Handed order directly to customer`/`handed order directly to customer`.
9. Spelling clash across audiences: customer title uses British `cancelled`; merchant title uses `Cancelling` and merchant body uses American `Canceling`. Three spellings, two audiences.
10. Internal jargon shipped to customers: `Amazon Prime x McDonald's BOGO LTO June 2026` as a DashPass article title; `HSL` as a Dasher nav label.
11. `Indefinitely (the item will automatically become available again after the selected time)` — self-contradictory merchant option.
12. Three names for the tracker screen; three names for the DashPass eligibility marker; three labels for the DashPass signup CTA.
13. URL slugs frequently disagree with H1s (`i-never-received-my-doordash-order` → "What can I do if I did not receive my order?"; `what-if-i-cannot-fulfill-an-order` → "Cancelling Orders on Your DoorDash Tablet"; `receiving-and-fulfilling-orders` → "Managing Orders"). **Key a corpus on the H1, not the slug.**

---

## Transferable patterns

1. **Publish the refund truth table.** DoorDash's four-row cancellation matrix keys the refund outcome to two system facts the customer cannot otherwise see (merchant confirmed? Dasher assigned?). It is more informative about the order's real state than the tracker is. Any product where a user's remedy depends on an invisible internal state should consider shipping the table rather than the prose.
2. **`These fees go to DoorDash.`** Four words, placed before any justification, answering the category's most persistent suspicion. Transfers directly to any intermediated fee — payment processing, marketplace commission, FX margin.
3. **Cross-route between failure taxonomies explicitly.** "If you received the wrong order… report as `Order never arrived` under `Order Issues`." Telling the user to use a counter-intuitive path, and why, beats silently mis-routing them.
4. **Name the partial failure.** `Part of an item (i.e. side of fries from combo meal) is missing` and the quantity-shortfall case (three limes, two received) are both named categories with worked examples. Most products collapse these into "missing item" and then mishandle the remedy.
5. **Two switcher grammars for two jobs.** A destination label (`Dasher Support`) for people who know where they're going; an identity claim (`I'm a Dasher`) for people who don't. DoorDash ships both on every page and it is defensible — though the duplication should be a decision, not an accident.
6. **Write the unnamed waiting state as a sentence, not a label.** `Please bear with us as we may be more busy than usual` occupies the slot where a status chip would be. When you have no honest state name, an honest sentence is better than a fake one.
7. **Publish both pricing regimes during a staged rollout, with the geography of each.** Two complete fee schedules and a named market list beats one schedule and a footnote.
8. **Sell the evidence requirement as speed.** "Providing appropriate photo evidence helps us better understand your concern and reach a resolution more quickly" — a fraud gate written as a service.
9. **Audit the same process described to each audience, side by side.** "We investigate to find the root cause" vs "your account will be eligible for deactivation" is the test case. If you cannot defend both sentences as descriptions of one event, one of them is wrong.
10. **Negative pattern: do not let the apology template carry the whole failure taxonomy.** "Sometimes mistakes happen" is a good sentence that never names an agent. Used once it is grace; reused across every failure article it becomes the reason no one ever learns what went wrong.

## Caveats & gaps

- **DoorDash does not publish a complete customer tracker state machine.** Only three stages exist in public copy. Any corpus entry claiming `Preparing`, `Picked up`, `Out for delivery`, `Delivered` or a named `Cancelled` tracker state for DoorDash would be invented.
- **No customer-facing reporting deadline is published anywhere.** The 72-hour and 14-day figures are merchant-side only (immunity threshold and dispute window respectively) and must not be relabelled as customer refund windows.
- **`expanded range fee` does not exist**; the real name is `Long Distance Fee`. **No `Small Order Fee` dollar threshold is published** on the consumer page — a search snippet attributed "$2.00 / subtotal under $10.00" to merchant terms, but that was not verified on a fetched page and is excluded from this file.
- **No tip-reduction path is documented.** The governing rule is `You can only tip once per order`; every described mechanism is *add*, not decrease, despite the article title asking about "adjust".
- **The customer `Accessibility` help category is effectively empty** — one article, about country and language availability. This is a real IA finding, not a harvest failure. Customer-facing accessibility guidance does not exist in the help centre.
- **Category pages under-render their article lists.** Dasher `Accept and Complete Deliveries` shows 15 subcategory headings but only one article link; `Earn and Get Paid` shows 18 headings and 3 links; merchant `Managing Orders` shows 8 headings and 4 links. Missing articles are recoverable via `/subcategory/` URLs, which were spot-checked but not exhaustively enumerated. The article inventories in T11 are therefore complete only for the customer `Your DoorDash Order` category.
- Not fetched: merchant `Cancellations & Refunds` subcategory articles, merchant Operations Quality articles, the Dasher `Maintain Great Ratings` category, and the consumer `Payments` articles.
- **Checkout, cart, tip selector and live tracker are behind auth.** All T5 field labels and T6 customer states are `[documented]` from help-article prose, not `[observed]` in the UI.
- Legacy Salesforce-era URLs (`help.doordash.com/consumers/s/article/<Name>?language=en_US`) still surface in search. The current canonical pattern is `help.doordash.com/en-us/<audience>/article/<slug>`; slugs frequently disagree with titles.
- No published content style guide or voice-and-tone documentation was found on any DoorDash surface.

## Sources

1. https://www.doordash.com/
2. https://help.doordash.com/en-us/consumers
3. https://help.doordash.com/en-us/consumers/category/your-doordash-order
4. https://help.doordash.com/en-us/consumers/category/troubleshooting
5. https://help.doordash.com/en-us/consumers/article/customer-where-is-my-order
6. https://help.doordash.com/en-us/consumers/article/why-was-my-order-cancelled
7. https://help.doordash.com/en-us/consumers/article/i-never-received-my-doordash-order
8. https://help.doordash.com/en-us/consumers/article/what-can-i-do-if-my-food-was-delivered-late
9. https://help.doordash.com/en-us/consumers/article/my-order-was-missing-an-item-incorrect-order
10. https://help.doordash.com/en-us/consumers/article/how-do-i-cancel-my-order
11. https://help.doordash.com/en-us/consumers/article/how-can-i-check-the-status-of-my-credit-or-refund
12. https://help.doordash.com/en-us/consumers/article/doordash-customer-grocery-orders
13. https://help.doordash.com/en-us/consumers/article/what-fees-do-i-pay
14. https://help.doordash.com/en-us/consumers/article/can-i-adjust-the-tip-i-provide-to-my-dasher
15. https://help.doordash.com/en-us/consumers/article/what-is-dashpass
16. https://help.doordash.com/en-us/consumers/category/dashpass
17. https://help.doordash.com/en-us/consumers/category/accessibility
18. https://help.doordash.com/en-us/dashers/category/accept-and-complete-deliveries
19. https://help.doordash.com/en-us/dashers/article/how-to-complete-a-delivery-when-the-customer-is-unavailable
20. https://help.doordash.com/en-us/dashers/article/item-has-run-out-is-unavailable
21. https://help.doordash.com/en-us/merchants/category/receiving-and-fulfilling-orders
22. https://help.doordash.com/en-us/merchants/article/what-are-order-error-adjustments
23. https://about.doordash.com/en-us/accessibility
