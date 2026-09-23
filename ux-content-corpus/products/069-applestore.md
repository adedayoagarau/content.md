# 069. Apple Store

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Consumer electronics retail (first-party, configure-to-order + trade-in + lease) |
| Primary URL | https://www.apple.com/store |
| Corpus rank | 069 |
| Benchmark strength (source list) | Configuration and trade-in guidance |
| Locale / market observed | en-US (US storefront; global locale switcher present) |
| Platform observed | Web (desktop, server-rendered HTML); the configure-to-order widget itself is client-rendered |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Consumer-lease disclosure (Apple Upgrade, leased through a third-party lender); 0% APR instalment disclosure with a stated variable-APR range; sales-tax estimation disclosure; state-specific iPhone tax rules; ADA/accessibility; explicit non-bank disclaimer on the payments entity |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 (13 with server-rendered content, 1 empty, 1 auth-gated and not attempted) |
| Harvest completeness | **Partial in one specific, important way.** The CTO widget's step rail, option-group headings, price deltas, `Add to Bag`, the AppleCare+ selector and the live delivery estimate are client-rendered and were **not** retrieved. Configuration vocabulary below is reconstructed from SKU link labels and from Apple's own prose description of the flow, and is labelled as such. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Store | https://www.apple.com/store | Storefront; `The Apple Store difference.` |
| Shopping Help index | https://www.apple.com/shop/help | 13-topic tree |
| Shipping & Pickup | https://www.apple.com/shop/help/shipping_delivery | Text notifications, carrier options |
| Viewing & Changing Orders | https://www.apple.com/shop/help/viewing_changing_orders | **The full order-status table** — best T6 source |
| Payment & Pricing | https://www.apple.com/shop/help/payments | Tax, decline ladder |
| Returns & Refunds | https://www.apple.com/shop/help/returns_refund | 14-day standard policy |
| Online Exclusives | https://www.apple.com/shop/help/online_store_exclusives | **`Customize Your Mac`** and engraving — best T4 source |
| Shopping Experience | https://www.apple.com/shop/help/shopping_experience | Checkout step labels, Bag, `Your Saves` |
| Apple Trade In | https://www.apple.com/shop/trade-in | Valuation bounding, 28-question FAQ |
| Apple Upgrade | https://www.apple.com/shop/apple-upgrade | Consumer-lease disclosure |
| Certified Refurbished | https://www.apple.com/shop/refurbished | Warranty and process copy |
| Delivery & Pickup | https://www.apple.com/shop/shipping-pickup | |
| Buy MacBook Pro / Mac mini / iPhone 17 | https://www.apple.com/shop/buy-mac/macbook-pro · /buy-mac/mac-mini · /shop/buy-iphone/iphone-17 | SKU permutation labels; FAQ blocks |
| Accessibility (overview) | https://www.apple.com/accessibility/ | |
| Accessibility Features | https://www.apple.com/accessibility/features/ | **43 features** — best T14 source |
| Accessibility Store | https://www.apple.com/shop/browse/home/accessibility_store | **Empty body** |

---

## T1 Navigation & IA labels

**Global nav — product lines, not categories** `[observed]`

`Store` · `Mac` · `iPad` · `iPhone` · `Watch` · `Vision` · `AirPods` · `TV & Home` ·
`Entertainment` · `Accessories` · `Support`

`Store` sits first, ahead of every product. The bag is rendered as a counter reading `0+`.

**Store quick links** `[observed]`: `Find a Store` · `Order Status` · `Shopping Help` ·
`Returns` · `Your Saves`. Off-site destinations carry the suffix `(Opens in a new window)`
throughout the help estate — a convention applied with near-total consistency.

**Shopping Help topic tree — 13 siblings, one flat level** `[observed]`

`iPhone` · `Your Account` · `Payment & Pricing` · `Returns & Refunds` · `Shipping & Pickup` ·
`Viewing & Changing Orders` · `Shopping Experience` · `Online Exclusives` · `Policies` ·
`Apple Software` · `Questions & Answers` · `Gifting` · `Apple Recycling Program`

Then `View all topics`. Note the first item is a **product name** sitting in a list of
task names. iPhone gets its own help topic because carrier activation, eSIM and service
cancellation make it the only product whose purchase has a second contract attached.

**Footer — ten groupings, five of them audience-scoped** `[observed]`

`Shop and Learn` · `Apple Wallet` · `Account` · `Entertainment` · `Apple Store` ·
`For Business` · `For Education` · `For Healthcare` · `For Government` · `Apple Values` ·
`About Apple`

The `Apple Store` group is the commerce IA spine and is worth reading as a list, because it
is the complete inventory of Apple's retail programme names: `Find a Store`, `Genius Bar`,
`Today at Apple`, `Apple Camp`, `Apple Store App`, `Certified Refurbished`, `Apple Upgrade`,
`Apple Trade In`, `Financing`, `Carrier Deals at Apple`, `Order Status`, `Shopping Help`.

`Apple Values` — `Accessibility` first, alphabetically and otherwise — sits at the same level
as `For Business`. Compare Patagonia (068), which puts values in the *global nav*; Apple puts
them in the footer but gives `Accessibility` the lead position within it.

Breadcrumbs are numbered lists: `Mac > Mac mini > Buy Mac mini`, `Help > Shipping & Pickup`.
The buy-flow breadcrumb uses the verb `Buy` while the page H1 uses `Shop` — a minor mismatch.

## T2 Value proposition & headline patterns

**Storefront section headings are noun phrases terminated with a full stop** `[observed]`

| H2 | Subhead |
|---|---|
| `Store` (H1) | "The best way to buy the products you love." |
| `The latest.` | "Take a look at what's new." |
| `Accessories.` | "Essentials that pair perfectly with your favorite products." |
| `Help is here.` | "Whenever and however you need it." |
| `The Apple Store difference.` | "Even more reasons to shop with us." |
| `The Apple experience.` | "Do even more with Apple products and services." |
| `Savings and offers.` | "Exclusive deals, special stores, and more." |

Every one is a fragment with a terminal period, and every one is followed by a single-line
subhead that is also a fragment with a terminal period. The pattern is so rigid that
`Accessories.` — a bare category noun plus a full stop — reads as a headline.

`Help is here.` / "Whenever and however you need it." is the one to note: two-thirds of a
typical support-hours statement, with the specifics deferred, and no apology for needing help.

**Other landing headlines** `[observed]`

- Certified Refurbished: `Designed for an encore.` and
  `Tested, certified, guaranteed. Check, check, and check.`
- Apple Upgrade: `Love it. Lease it. Upgrade it.`, with section heads
  `We've put the ease in lease.` · `Thank you, next upgrade.` ·
  `Add AppleCare. Stay covered from every angle.` · `Have questions? Get answers.`
- Delivery & Pickup: `Get the products you want, the way you want.`
- Apple Trade In: `Trade in. Upgrade. Save. Or recycle it for free.`

`Designed for an encore.` for refurbished is the single best line in the file — it converts
"previously returned" into "a second performance by something that was good the first time",
in four words, without ever using the word *used*.

`Trade in. Upgrade. Save. Or recycle it for free.` is four clauses, three of them the user's
gain, and the fourth introduced by `Or` — the non-monetising path presented as an equal
option in the headline. Compare Patagonia's trade-in headline (068),
`Trade in your used Patagonia gear.`, which leads with the action and puts the landfill in
the subhead. **Two identical programme categories, opposite emphases: Apple leads with the
user's benefit, Patagonia leads with the object's fate.**

**Buy-flow H1 grammar** `[observed]`: `Shop MacBook Pro`, `Shop iPhone 17`, and for
unreleased stock `Pre-order Mac mini` with the eyebrow `New` and the line
"Available starting 9.22." — date given as a bare numeric, no month name.

**Merch eyebrows are ALL CAPS and name the *programme*, not the offer** `[observed]`:
`NEW` · `PRE-ORDER` · `OFFER ENDS 9.24` · `APPLE SPECIALIST` · `PERSONAL SETUP` ·
`CARRIER DEALS AT APPLE` · `CERTIFIED REFURBISHED` · `EDUCATION` · `SMALL BUSINESS` ·
`GOVERNMENT` · `VETERANS AND MILITARY` · `APPLECARE` · `APPLE STORE APP`

**Almost never a question in a headline.** The two exceptions are both deliberate:
`Which iPhone is right for you?` (the comparison module) and `Have questions? Get answers.`
(the FAQ block). Apple reserves the interrogative for the two places where the user is
genuinely undecided.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Select` | Product tiles, entry into the buy flow | **Not "Buy" or "Shop now"** — names the act of choosing, not purchasing |
| `Add to Bag` | End of configuration | `Bag`, never "cart" |
| `Save for later` | Product page and Bag | Routes to `Your Saves` |
| `Continue Shopping` | Bag review | |
| `Check Out Now` | Bag review | |
| `Place Order Now` | Final checkout step | **Three escalating commitment CTAs**, each with `Now` on the last two |
| `Add Engraving` | Engraving flow | |
| `Save` | Engraving preview | |
| `Enroll` | Apple Upgrade nav, hero and close | Repeated three times on one page |
| `Shop now` | Education module | |
| `Learn more` | Delivery, returns, environment, AppleCare cards | The default secondary CTA |
| `Learn more about Personal Setup` | Buy-flow assistance module | Descriptive form used where ambiguity exists |
| `Learn more about Apple Card Monthly Installments` | Payment FAQ | |
| `Explore your options for iPhone with Apple Upgrade` | Programme-sunset module | Nine words |
| `Find an Apple Store` | Delivery & Pickup; footer | |
| `Browse all` | Refurbished local nav | |
| `Explore all accessories.` | Store accessories section | **Terminal period inside the link text** |
| `Edit` | Order details — engraving, `Delivers to`, contact info | Single-word inline edit |
| `Cancel Item` | Order details | Item-level, not order-level |
| `View Invoice` | Order details | |
| `Track Shipment` | Order details | Deep-links to the carrier |
| `Connect with ASL Interpreter` | SignTime | |
| `View all topics` | Shopping Help local nav | |

**Observation.** `Select` as the entry CTA is the deliberate choice. A tile that says `Buy`
promises a transaction; `Select` promises a *step*, which is accurate, because a
configurable Mac is three or four decisions away from a purchase. The same honesty appears in
Warby Parker's `Select lenses and buy` (066) — both retailers whose product requires
configuration warn the user in the button.

The bag→order sequence is `Add to Bag` → `Check Out Now` → `Place Order Now`. The irreversible
action is the only one with an unambiguous verb.

Apple *does* ship bare `Learn more`, but selectively: it appears on cards whose heading
supplies the object, and the descriptive form (`Learn more about Personal Setup`) is used
wherever the surrounding text does not.

## T4 Onboarding & getting-started — configure-to-order and guided shopping

### What was and was not retrievable `[observed]` / `[absent]`

The buy pages return the flow as a **flat list of SKU permutation links** plus FAQ and merch
chrome. Requesting a deep configuration slug returns a body byte-identical to the parent.

**Not retrieved, and not reconstructed:** the step or progress rail labels, the option-group
headings (whether the label is literally "Chip", "Memory", "Storage"), the radio-tile price
deltas in `+$…` form, the in-flow `Add to Bag` button, the AppleCare+ selector, the engraving
input field, the sticky summary panel, and the live delivery estimate string. `[absent]`

Everything below is either (a) SKU link text, which mirrors the option-tile labels, or
(b) **Apple's own prose description of its CTO flow**, published in Shopping Help. The second
source is unusually valuable: it is a retailer documenting its own configurator in writing.

### Configuration axis labels, from SKU link text `[observed]`

**MacBook Pro** — axis order as written:
size (`14-inch` / `16-inch`) → chip (`M5 Chip, 10-core CPU, 10-core GPU`;
`M5 Pro Chip, 15-core CPU, 16-core GPU`; `M5 Max Chip, 18-core CPU, 40-core GPU` …) →
colour (`Space Black` / `Silver`) → display (`Standard display` / `Nano-texture display`) →
memory (`16GB memory` … `48GB memory`) → storage (`1TB storage` / `2TB storage`).

A complete configuration renders as one comma-delimited string:
"MacBook Pro, 14-inch, M5 Max Chip, 18-core CPU, 32-core GPU, Space Black, Standard display,
36GB memory, 2TB storage".

Two things are notable. The chip label **carries its own core counts inline** rather than
splitting into three controls — one decision instead of three. And the unit is **suffixed to
the value** (`16GB memory`, `2TB storage`) rather than being a separate group label, so each
tile is self-describing when read out of context.

**iPhone 17** — display size → capacity (`256GB` / `512GB`, each carrying `Footnote 1`) →
finish (`Mist Blue` · `Lavender` · `Black` · `White` · `Sage`) → connectivity
(`AT&T` / `T-Mobile` / `Verizon` / **`Connect on your own later.`**).

`Connect on your own later.` is the unlocked option, and it is the best option label in this
batch. It replaces the jargon ("Unlocked", "SIM-free") with a **description of what the user
will do**, in five words, with a terminal period. And it is the only tile on the carrier axis
that shows a price — carrier-attached tiles show none — so the label and the price together
explain the trade-off without a sentence of body copy.

### Apple's own description of the CTO flow `[observed]`

Section head `Customize Your Mac`, opening: "apple.com makes it easy to build the Mac that's
right for you."

- `Models That Can Be Customized`: `MacBook Air`, `MacBook Pro`, `Mac mini (hardware only)`,
  `iMac`, `Mac Studio`, `Mac Pro` — with the exclusion stated in the same block:
  "we are unable to customize refurbished Mac computers."
- `Hardware Options`: `Processor`, `Memory`, `Graphics card`, `Storage type and capacity`,
  `Keyboard and mouse`. Then a transition line — **"Why stop there? You can add any of
  these:"** — introducing `Display`, `AppleCare+`, and
  `Cables, adapters, and other accessories`.
- `How to Customize`, three steps, each a complete imperative sentence:
  1. "Select the Mac notebook or desktop computer you want."
  2. "On the Customize page, select the configuration options you'd like."
  3. "When you are finished building your Mac, click the Add to Bag button."

**The price-delta convention, stated in Apple's own words:**

> "The dollar amount that will be added to or subtracted from your subtotal is listed next to
> each option."

Apple describes deltas as **signed amounts against the running subtotal**, not as a premium
over a base price. That is a meaningfully different mental model: it implies the user can go
*down* as well as up, and it anchors on the number they will actually pay rather than on a
headline price they will exceed. The live rendering could not be captured, so this file does
not assert a `+$200` form.

**The live-update promise names exactly three things:**

> "The subtotal, shipping time frame, and specifications summary at the top right of the
> screen will update as you choose options."

Subtotal, **shipping time frame**, spec summary. Putting the delivery estimate inside the
persistent configuration summary — not at checkout — is the decision worth stealing, because
the trade-off users most often get wrong is spending more for a configuration that ships
weeks later. Apple states the consequence elsewhere in the same estate: "While many Mac
configurations are ready to ship or pick up in a store, **some customized selections may
impact your delivery estimates and options.**"

**A human escape hatch closes the section:** "You can also call our Specialists at
1‑800‑MY‑APPLE, and we'll be glad to help you build the Mac that's right for you." — the same
phrase, "the Mac that's right for you", that opened it.

### Engraving `[observed]`

Section head: `Engrave Your iPad or Air Tags, or Apple Pencil` (the malformed spacing in
"Air Tags" is verbatim).

- Offer: "Make it your own — or a gift they'll never forget — with free laser engraving."
- Eligibility: "You can add a message to any new iPad, AirPods, AirTag, or Apple Pencil
  (2nd generation)."
- Channel restriction: "This service is only available online and is not offered on
  refurbished products."
- Flow, four sentences: select product → `Add Engraving` → "Type in text and choose emojis to
  craft your own special message. **You'll see a preview of the engraving as you enter it.**"
  → "Then Save it and Add to Bag."
- **Mutability gate tied to a status string**: "You may be able to make changes to the
  engraved text or cancel your item if online Order Status indicates that it has
  `Not yet shipped`."

The mutability rule is the pattern. A personalisation that becomes irreversible is bounded by
**a named order status the user can go and look at**, rather than by a time window they would
have to compute. And the corresponding edit affordance is documented on the order page: look
for the `Engraving` section "below your item and select `Edit`".

`No Engraving` exists as a standing policy heading on the refurbished page — a feature's
*absence* given its own heading in the product's terms.

### Comparison and assistance `[observed]`

**Comparison module**, iPhone only: `Which iPhone is right for you?` — per-model columns with
name, tagline, `From $1999`, screen size, and spec rows grouped under `Case materials`,
`Battery`, `Rear camera`. Absent features are rendered with an em-dash prefix —
**`— No Action button`** — so a missing capability is stated rather than left as a blank cell.
That is a small, genuinely good decision: an empty cell is ambiguous; "— No Action button" is
not.

**There is no literal "Help me choose" string.** `[absent]` The guided-shopping equivalent is
a cluster of *human* offers under `Help is here.`:

- `APPLE SPECIALIST` — "Shop one on one with a Specialist. Online or in a store."
- "Shop with a Specialist over video. Choose your next device in a guided, one-way video
  session." — **"one-way"** is doing precise disclosure work: the user is not on camera
- `PERSONAL SETUP` — "Set up your new device with help from a Specialist. Let us guide you
  through data transfer, the latest features, and more in an online, one-on-one session."
- `Today at Apple` — "Join free sessions at your Apple Store."
- "Get expert service and support at the Genius Bar."

Every buy page repeats: "When you buy directly from Apple, you can get help transferring your
data and making the most of your new device with our free online Personal Setup sessions." —
the benefit is explicitly conditioned on buying *direct*, which is the commercial point of the
module.

**`The Apple Store difference.`** is the storefront's reasons-to-buy block, and every item is
a two-sentence or one-sentence pair naming a programme:

- "Trade in your current device. Get credit toward a new one."
- "Enjoy two-hour delivery from an Apple Store, free delivery, or easy pickup."
- "Pay in full, pay monthly, or lease and upgrade at the end of your term."
- "Make them yours. Engrave a mix of emoji, names, and numbers for free."
- "Customize a Mac and style an Apple Watch just for them."

`Pay in full, pay monthly, or lease and upgrade at the end of your term.` is the three-way
payment frame compressed to twelve words, and it appears again in the Mac FAQ as
"You can buy with a one-time payment, finance with Apple, or lease an eligible Mac with Apple
Upgrade." One concept, two registers, both under twenty words.

### Checkout step labels `[observed]`

Five numbered, imperative, sentence-case steps: 1 `Review your bag` ·
2 `Sign in or continue as a guest` · 3 `Enter shipping and billing information` ·
4 `Select a payment method` · 5 `Complete checkout`.

Step 2's label **names both paths in the step title**, so guest checkout is not a link the
user has to find.

## T5 Form & field labels

`[observed]`

| Label / string | Surface | Notes |
|---|---|---|
| `Delivers to` | Order details, shipping section | **Not "Shipping address"** — names the outcome, third person singular |
| `Engraving` | Order details section, with `Edit` | |
| `Contact Information` | Order details | |
| `Security codes` | Payment help | Defined inline: "a unique three or four digit number printed on the front (American Express) or back (Visa/MasterCard/Discover) of your card" |
| Input hygiene instruction | Payment help | "Remove dashes or spaces from the account number." |
| Pickup contact | Help | "You must provide their name and email address." |
| Text opt-in | Shipping help | "Just add your mobile number at checkout to receive these notifications." |
| Apple Upgrade application | Apple Upgrade | "your legal name, date of birth, phone number, email address, billing address, and Social Security number." |

`Delivers to` is the standout. Most retailers label the field for the *data* ("Shipping
address"); Apple labels it for the *event* ("Delivers to"), which is what the user is actually
checking when they look at it.

The security-code help does three things in one sentence: gives the length range, gives the
location, and **disambiguates by issuer** — front for one network, back for the others.

**Negative finding** `[observed]`: the guest order-lookup help says users can sign in "with
your order number, along with the **post code** or email address" — a UK-ism left in the
US-storefront page, where every other reference is `ZIP code`.

## T6 Status & state language

**This is the strongest section in the file.** Apple publishes its complete item-status
vocabulary, with the customer-facing message for each, inside a help article. `[documented]`

| Status | Message |
|---|---|
| `Order Placed` | "We've received your order and payment information and will start preparing your item shortly." |
| `Processing` | "As soon as the item is ready, we'll send you an update and prepare the shipment." |
| `Preparing to Ship` | "We're completing some final details before we ship your order. As soon as it ships, we'll email you the delivery information." |
| `Shipped` | "Your item is on the way. Tracking information will be available within 24 hours." |
| `Delivered` | "The package has been delivered to the shipping address specified in your order." |
| `Shipping to Store` | "Your item has shipped and is on the way to the Apple Store." |
| `Check in Today` | "Your item will be available at the Apple Store later today." |
| `Ready for Pickup` | "Your item is ready to be picked up. Please make sure to bring a valid government-issued photo ID and your order number to the Apple Store." |
| `Picked up` | "Your item has been picked up from the Apple Store." |

Plus two terminal states: `Canceled` and `Pickup Canceled`. And one status used purely as a
permission gate: `Not yet shipped`.

**Five things to take from this table.**

1. **Statuses are item-level, not order-level.** Each item in a multi-item order carries its
   own progress bar and message. `Items ship as they become available.` is stated separately.
2. **Delivery and pickup are two parallel tracks** that share `Order Placed` and `Processing`
   and then diverge into five delivery states and four pickup states. The two tracks never
   reuse a name.
3. **Every message states the next system action and who performs it.** `Processing` does not
   describe processing; it says "we'll send you an update and prepare the shipment". The
   status is the label, the message is the promise.
4. **`Shipped` bounds its own incompleteness**: "Tracking information will be available within
   24 hours." This pre-empts the classic complaint — a tracking number that returns nothing —
   inside the status that generates it. Compare Wise's help article reconciling "complete" with
   "not arrived" (041): Wise wrote an article, Apple wrote it into the status message.
5. **`Ready for Pickup` carries the requirements**, not just the state: photo ID and order
   number, named in the same sentence.

**Status is used as the permission model, and the copy says so** `[observed]`:

- "You may be able to edit the item if the status reads `Order Placed` or `Processing`."
- "If your order is in `Processing`, you may be able to edit your shipping address."
- "If your item is in `Processing`, you can cancel it online before it ships."
- "Once your order has prepared for shipment or has shipped, we are unable to change the
  shipping address."

The user is told which state permits which action, in advance, using the same strings they
will see on the page. That is the reusable pattern: **publish the state machine's edit rules
in the same vocabulary as the states.**

**Negative finding** `[observed]`: `Picked up` is sentence case in a table where every other
status is Title Case. A capitalisation inconsistency inside Apple's own published status list.

## T7 Error, failure & recovery

`[documented]`, and notably systematic.

**Card decline is written as a four-step self-diagnosis ladder**, ordered cheapest-check-first:

1. "If your card is new or recently reissued, make sure it has been activated."
2. "Double check the card type…, the account number and expiration date."
3. "Remove dashes or spaces from the account number."
4. "If everything seems to be correct, call the card issuer's customer service 800 number on
   the back of your card."

Step 4 hands the user to a third party and tells them **where to find the number** — on the
back of the card in their hand. Three self-service attempts, then a human, then a specific
location for that human's number.

**Failure modes named that most retailers leave the user to discover** `[observed]`:

- "Most debit and check cards have daily spending limits that may substantially delay the
  processing of an order — **even if there is enough money in an account.**" The clause after
  the em-dash is the whole value of the sentence: it pre-empts the user's certainty that they
  have the funds.
- "we may have an incorrect email address or the emails might be stuck in your spam or junk
  mail folder."
- "If you are unable to cancel your item online, you may be able to return it." — a fallback
  that converts one failed action into a different available one.
- Missed delivery: "After the first delivery attempt, you can request to pick up your package
  at our carrier's local facility."
- Pickup: "screenshots/photos of the email with the QR code or Wallet pass will not be
  accepted." — a rejection rule published *before* the user arrives at the store.
- Trade-in mismatch: "If your device doesn't match the condition you described, you'll receive
  an email with next steps."
- Activation lock: "If these features were activated and cannot be disabled by the person in
  possession, Apple may refuse the return or exchange."
- Unclaimed pickup: "If you don't pick up your order, Apple may cancel it."
- Cookies disabled: "If you'd like to place an order on apple.com without enabling cookies,
  please call 1‑800‑MY‑APPLE."

**Every failure path terminates in a named human channel** `[observed]` —
`1‑800‑MY‑APPLE`, an `Apple Specialist`, an `Apple Card Specialist`, an `AppleCare Advisor`,
or Apple Support for refurbished orders, each with its own number. The recovery architecture
is: try this, try this, try this, then call *this specific* person.

## T8 Empty states

`[absent]` — and this is worth recording rather than filling.

No empty-bag string is server-rendered anywhere. The bag exists only as the counter `0+`. The
nearest reachable analogues `[observed]`:

- A keep-shopping nudge at the bag step: "If there are other items you want to purchase, click
  the `Continue Shopping` button."
- A persistence promise for abandoned configurations: "this progress will be saved as well,
  allowing you to pick up where you left off and either complete your customization or
  purchase your item." — **an abandoned CTO configuration is treated as saved state, not as an
  empty state.**
- `Your Saves` is the named container: "Items you've saved and lists you've created can be
  found in Your Saves, located in Account."

No empty-bag copy has been reconstructed. Do not source one from this file.

## T9 Notifications & system messages

**Five email types, each a proper noun, in lifecycle order** `[documented]`

| Email | Content (summarised) |
|---|---|
| `Order Acknowledgement` | Item summary; delivery address and a clickable delivery date, or the store and pickup contact |
| `Shipment Notification` | Sent when the item leaves the warehouse; carrier name, tracking number, delivery date |
| `Pickup Notification` | Sent when items are available at the store |
| `Pickup Reminder` | Sent if the item is still waiting |
| Gift-card notification | Sent when an electronic gift card goes to the recipient |

Naming the emails as objects — rather than describing them — lets help articles refer to them
precisely ("Your `Shipment Notification` email will tell you whether a signature is required").

**Negative findings** `[observed]`: `Order Acknowledgement` and `Order Acknowledgment` are both
published, on different pages. And the sales policy contains "We'll also send you reminder or
two, just in case it slips your mind." — a missing article, verbatim.

**Text notifications are disclosed by volume, which is unusual** `[observed]`

Under `Text Notifications` / `What to Expect`:

- "We send updates by text message, so you can stay updated on your delivery or pickup order."
- "The number of messages you'll receive will vary depending on the orders you placed."
- **"You may receive 1-4 text messages per item on your order."**
- "This will include your order number and a link to the tracking or pickup store information."

Telling a user *how many* messages to expect, before they opt in, is a genuinely good
consent pattern — the commonest reason people regret an SMS opt-in is volume, not content.

**Negative finding** `[observed]`: the same disclosure is published as "per item" on one page
and "per shipment on your order" on another. For a multi-item order those are materially
different numbers.

**Pickup notification is gated with an explicit instruction not to travel** `[observed]`:
"we'll send an email and mobile notification with a QR code when your order is scheduled to be
picked up. **Please wait for this notification before coming to the store.**"

**Carrier handoff is disclosed rather than hidden** `[observed]`: "Apple chooses which carrier
will deliver your shipment, and some of our shipments require a signature. Your Shipment
Notification email will tell you whether a signature is required." Third-party services are
named (`FedEx Delivery Manager`, `UPS MyChoice`), and the ID requirements for collecting from a
carrier depot are listed to the level of "Second ID with your name on it".

**Apple Upgrade in-product alert**, captured from image alt text `[observed]`:
`Psst...It's time to upgrade. You are eligible for your next iPhone` — with the opt-out route
stated on the same page: "You can opt out of these notifications in the Apple Store app
notification settings."

## T10 Disclosures, legal & compliance — trade-in valuation, warranty and lease

### Trade-in: how a conditional estimate is worded and bounded

**This is the section the brief asked for, and it is the best worked example in the corpus.**

The estimate is framed as a **self-report contract** from the first sentence `[observed]`:

> "Just answer a few questions about your device and its condition. **Based on what you tell
> us**, we'll provide an estimated trade-in value."

"Based on what you tell us" relocates the accuracy burden to the user before any number
appears. The FAQ repeats the logic with the consequence attached: "Answer a few questions
accurately, and once we receive the device within the specified time frame and verify its
condition, you'll most likely receive the full amount of the estimated refund." —
**"most likely"**, not "will".

The footnote then stacks the conditions, and the order is instructive `[observed]`:

1. "Trade-in values will vary based on the condition, year, and configuration of your eligible
   trade-in device." — the **three variables named first**
2. "Not all devices are eligible for credit."
3. "You must be at least the age of majority to be eligible…"
4. "Trade-in value may be applied toward qualifying new device purchase, or added to an Apple
   Gift Card."
5. **The core valuation caveat:** "Actual value awarded is based on receipt of a qualifying
   device matching the description provided when estimate was made."
6. "Sales tax may be assessed on full value of a new device purchase." — a tax consequence
   most users would not predict
7. "Offer may not be available in all stores, and may vary between in-store and online
   trade-in."
8. "Apple or its trade-in partners reserve the right to refuse, cancel, or limit quantity of
   any trade-in transaction for any reason."
9. "Restrictions and limitations may apply."

**The two time bounds are stated in body copy, not only in the footnote** `[observed]`:

- "we need to receive your trade-in device within **14 days** of when you receive your new
  device, and the condition of your trade-in needs to match what you told us."
- "Generally it takes **2 to 3 weeks**." and "It may take 3 to 5 business days for your credit
  to be processed."
- "Your trade-in estimate is valid for 14 days after you receive your new device."

**Channel divergence is stated plainly rather than buried** `[observed]`: "A Specialist will
evaluate your device on the spot, so the trade-in credit you get in the store may differ from
the estimated trade-in value you received online if the condition doesn't match what you
described."

**The revised-offer mechanism is the standout, because it gives the user a decision rather
than a verdict** `[observed]`:

> "If the condition of your device is different from what you described, we'll provide a
> revised value. If the revised value is lower than the initial estimate, you can either accept
> or reject it. If you accept it, we'll continue with the trade-in and either charge or credit
> the difference in value to the card you provided. **If you reject it, we'll cancel the
> trade-in, return your old device, and charge the original trade-in value to your card.**
> If the revised value increases, we'll automatically increase your trade-in credit."

Four branches, all named, all with their financial consequence attached, including the
rejection path — which is the one most products leave unwritten. And the asymmetry is
deliberate and disclosed: a *lower* revision requires consent; a *higher* one is applied
automatically. The user is only asked to decide when the change is against them.

Compare Patagonia's trade-in (068), which bounds the same kind of estimate with
"Your exact credit will be determined after we receive and inspect each item" and whose FAQ
explicitly offers **no** recourse if the user is unhappy with the credit. Same product
category, two philosophies: Patagonia sets the expectation and closes the loop; Apple builds an
accept/reject gate. Both are defensible; Apple's costs more to operate.

**Cancellation is worded as an absence of action** `[observed]`: "If you haven't dropped off
or shipped your device yet, you can cancel your trade-in by simply **keeping your device**."
No form, no button, no support call — the cancellation is doing nothing. That is the cleanest
"how do I get out of this" answer in the batch.

**The recycling alternative is priced at zero and stated wherever trade-in is stated**
`[observed]`: "If your device isn't eligible for credit, we'll recycle it — and any accessories
you no longer use — securely and for free." Battery-shipping guidance is then given as six
concrete bullets ("Do not ship loose batteries", "Discharge the unit to less than 30%",
"surround the product with at least 2.5 inches of suitable filler material") — safety
compliance rendered as packing instructions.

### Refurbished warranty `[observed]`

- Landing claim: "Apple Certified Refurbished products include a **one‑year warranty**, full
  functional testing, and savings up to 15%."
- Help definition, which does something most refurb programmes avoid — it **admits what the
  units are**: "pre-owned Apple products that undergo Apple's stringent refurbishment process
  prior to being offered for sale. **While only some units are returned due to technical
  issues**, every unit is evaluated to ensure it meets Apple's quality standards. We back these
  products with our standard one-year limited warranty."
- `Refurbishment Process` is six bullets, each beginning with a verb in the passive, and two of
  them are the trust-carrying ones: "is repackaged (including appropriate manuals, cables, and
  new boxes)" and "is given a new refurbished part number and serial number."
- Exclusions are headings in their own right: `Sales to End Users Only`, `Defective Items`,
  `No Engraving`.
- Return window for refurbished is stated separately: request a return "within 14 calendar days
  of when you receive the item."
- Price display is a clean triple with a visually-hidden prefix for screen readers:
  `Now $1,439.00` `Was $1,599.00` `Save $160.00`

"Tested, certified, guaranteed. Check, check, and check." is the marketing line above a
paragraph that concedes the units are pre-owned. **Claim in the headline, concession in the
body** — the inverse of the usual arrangement, and more credible for it.

### Standard returns `[observed]`

- **14 calendar days** from receipt, direct purchases only, "repackaged with all the cords,
  adapters and documentation that were included"
- Ineligible items listed, including `Opened software*` with the asterisk resolved immediately
  beneath rather than at page foot
- Exchange exceptions named precisely: "The only exchange exceptions are personalized items
  (such as engraved iPad or AirPods) and Macs that have been custom-configured." — **the two
  things this retailer's own differentiators produce are the two things it cannot exchange**,
  and it says so
- Refund routing is written as a four-branch list by original payment method, including the
  edge case where an account balance is "at or near the maximum limit"
- Wireless-service cancellation is flagged as a **separate contract the return does not
  touch**: "Returning your iPhone or iPad may not automatically cancel or reset your wireless
  account"

### Price protection `[observed]`

> "Should Apple reduce the price on any Apple-branded product within **14 calendar days** from
> the date you receive your product… request a refund or credit of the difference in price."

Bounded by: "This excludes limited-time price reductions and special sales events, such as
Black Friday. Price protection is limited to 10 units of a particular product and we may
require that you have the product with you and/or have proof of possession to use it."

A voluntary consumer protection, published with its exclusions, a unit cap and an evidence
requirement. Note that the excluded event is **named** (Black Friday) rather than left as
"certain promotions".

### Pricing and tax `[observed]`

- **"The tax listed during checkout is only an estimate."** followed by "Your invoice will
  reflect the final total tax." — a five-word disclosure that pre-empts an invoice
  discrepancy, placed where the number is shown.
- State-specific rule stated plainly: "In California and Rhode Island, sales tax is collected
  on the unbundled price of the iPhone."
- Charge timing separates authorisation from capture: "Apple receives authorization to charge
  your account prior to shipping your item(s). However, your card will only be charged after
  your order has shipped. If your order contains multiple items and they ship at different
  times, you may see multiple charges…"
- **Order acceptance is explicitly disclaimed**: "Your receipt of an order confirmation does
  not signify acceptance of your order or constitute confirmation of our offer to sell; we are
  simply confirming that we received your order."
- Capacity footnote appended to every Mac buy page:
  "1GB = 1 billion bytes and 1TB = 1 trillion bytes; actual formatted capacity less."
- Geolocation notice in **every** page footer: "We approximate your location from your internet
  IP address by matching it to a geographic region or from the location entered during your
  previous visit to Apple."

### Instalments and the consumer lease `[observed]`

**ACMI** (`Apple Card Monthly Installments`) — the disclosure pairs the 0% headline with the
non-0% reality in adjacent sentences: "ACMI is a 0% APR payment option…" then
"Taxes and shipping on items purchased using ACMI are subject to your Apple Card's variable
APR, **not** the ACMI 0% APR." A named variable-APR range is published with an effective date,
and the final-payment mechanic is spelled out: "The last month's payment for each product will
be the product's purchase price, less all other payments at the monthly payment amount."
The entity disclaimer is blunt: "Neither Apple Inc. nor Apple Payments Services LLC is a bank."

**Apple Upgrade** — the disclosure opens by **denying the wrong mental model first**:

> "This offer is for a **consumer lease, not a purchase or loan**."

Then names the third-party lender and the term lengths, gives a worked numeric example, and
follows with the consequences in plain sentences:

- "**You will not own your device at the end of your lease unless you pay the amount due to
  exercise the purchase option.**"
- "You may incur a substantial charge up to the amount of your remaining lease payments if you
  terminate your lease before the end of your initial lease term."
- "the lease will convert to a month-to-month lease for up to six months. Your monthly payments
  may increase during the month-to-month period."
- "**Advertised monthly payment amount may not include a trade-in device's estimated value.**"
- "Upgrades are not guaranteed and are subject to eligibility and approval."
- "The application process involves a soft credit check that won't impact your credit score."
- Cost ceiling: "If you return your device in good working condition, you will not pay more
  than the full price of the device."

And the FAQ asks the question directly, and answers it in three words:
`Do I own my device at the end of my lease term?` — "No, you do not."

**This is the strongest single disclosure pattern in the file: lead with what the product is
not.** Identical in shape to Wise's "not an FDIC-insured bank" (041). A lease marketed
alongside purchases, in the same tiles, at a monthly price that looks like an instalment, has
exactly one thing it must say first.

### Footnote conventions `[observed]`

Apple uses **a symbol ladder for commercial disclosures and Arabic numerals for technical
claims**. Symbols observed on the storefront, in source order: `◊` `∆` `§` `◊◊` `±` `†` `‡`
`※` `#` `¶` `**`, then `1.`–`4.`.

**The same symbol maps to different footnotes on different pages** — `§` is financing on one
page, AppleCare service coverage on another, trade-in on a third. Symbols are page-scoped, not
global, which is defensible for a site this size but means a symbol carries no meaning on its
own.

In the accessible markup the marker renders as the literal words `Footnote §` — the symbol is
announced with a preceding word, so a screen-reader user hears "Footnote section-sign" rather
than an unexplained glyph. A small and genuinely good accessibility decision inside a legal
convention.

**The discipline is asymmetric, and the asymmetry is principled:** every number, percentage
and timeframe carries a marker; marketing superlatives ("The best way to buy the products you
love.") carry none, because they are treated as non-factual.

## T11 Help-centre architecture

Two levels, with a consistent third `[observed]`:

**13 sibling topic pages** (see T1) → each with an on-page **`Choose a topic:`** jump list →
H2 sections → H3/H4 sub-sections.

| Help page | `Choose a topic:` anchors |
|---|---|
| Shipping & Pickup | `Delivery Options` · `Apple Pickup` · `What's Next?` · `Text Notifications` · `Carrier Delivery Options` · `Shipping Policies` |
| Viewing & Changing Orders | `Online Order Status` · `Check Order Status` · `Track Your Order` · `Edit Your Order` · `Cancel Your Order` · `View or Print Invoice` |
| Payment & Pricing | `Payment` · `Tax` · `Education Pricing` · `U.S. Government Pricing` · `Promotions, Rebates, and Coupons` |
| Online Exclusives | `Engrave Your iPad or Air Tags, or Apple Pencil` · `Customize Your Mac` · `Buy a Certified Refurbished Product` |
| Shopping Experience | `Shop Apple.com` · `Signing Out` · `Experience the Apple Store app` · `Find an Apple Retail or Reseller Store` |

**Article-title grammar follows one rule, applied consistently:**

| Shape | Used when | Examples |
|---|---|---|
| **Imperative verb phrase** | The user performs the action | `Edit Your Order`, `Cancel Your Order`, `Track Your Order`, `Customize Your Mac`, `Check Order Status` |
| **Noun phrase** | The section is informational | `Delivery Options`, `Text Notifications`, `Shipping Policies`, `Tax` |
| **Gerund / how-to noun** | Sub-sections | `Enabling Cookies`, `Saving Items for Later`, `Checking Out`, `Changing Text Message Preferences`, `Refurbishment Process` |

`What's Next?` is the only interrogative H2 in the estate, and it is used for the one section
that answers a question the user asks at a moment of uncertainty (after ordering).

Every help page opens with **a one-sentence orientation paragraph containing the primary task
link** — "Want to view or edit an order? You can check order status, track a delivery, view
pickup details, edit your delivery or email address, print an invoice, and more…" — so the
first sentence doubles as a table of contents.

**Negative finding, and a significant one** `[observed]`: every help page **appends the full
Sales and Refunds Policy as an unlabelled tail** — `Purchase Quantity`, `Returns`,
`Pricing and Price Reductions/Corrections`, `Order Acceptance/Confirmation`, `Audit Rights`
and the rest. A user reading about text-message preferences reaches, with no transition, an
education-pricing audit clause. The same several thousand words of policy are duplicated
across thirteen pages.

## T12 FAQs

**Every FAQ across the estate is written in the first-person user voice**, and the answers are
second person `[observed]`. This is the most consistent thing about Apple's FAQ writing:
`Can I…`, `How do I…`, `What happens if I…`, `Do I own…` — never "How do you…".

**Apple Trade In** — 28 questions. Consumer set opens with eligibility and value:
`What devices are eligible for trade-in?` · `Can I trade in an engraved device?` ·
`How much will I get for my device?` · `Can I get an estimate online, then trade in at an
Apple Store?` · `How long does the online trade-in process take?` ·
`How quickly should I return my device?` · `Do I need to return accessories to get the full
trade-in value?` · `How do I send back my device?` · `How do I turn off Find My?` ·
`Is there a way to track my trade-in status?` · `Can I cancel a trade-in?` ·
**`Why did I receive a revised trade-in value offer?`** ·
`According to an email, my gift card or my credit was issued, but I haven't received it. What
do I do?` · `Does Apple offer recycling?` · `How do I prepare my device for recycling?`

Two are worth singling out. `Why did I receive a revised trade-in value offer?` is a
**post-hoc adverse-event question** — the user has already been told bad news and is looking
for the rule. And the gift-card question is written as **two sentences describing a
contradiction the user is experiencing** ("According to an email… but I haven't received it")
rather than as a topic — the same grammar as Wise's "Why does it say my transfer's complete
when the money hasn't arrived yet?" (041).

A separate five-question business block follows, and it is scoped by its own question
grammar — `How does the Apple Business Trade In process work?`, `Is there a minimum or maximum
number of devices?` — with a hard rule stated as an answer: "A minimum of five devices is
required for initial trade-ins."

**Mac buy pages** — 9 questions, and the first is not about a Mac:
`I'm switching from a PC to a Mac. Is it easy to set up my new Mac and transfer my files?`
The FAQ block opens on the **switching anxiety**, not on a product attribute. Then:
education discount · fastest delivery · additional displays · how to pay · Apple Upgrade ·
Apple Trade In · AppleCare · `Can I return or exchange my Mac?`

Order of the nine: reassurance → price → speed → capability → payment → payment → payment →
protection → exit. **The FAQ ends on the return policy**, which is the last objection.

**iPhone 17** — 14 questions, six of which are about carriers, eSIM, unlocking and
international use. `What is eSIM?` is question one. The FAQ volume maps precisely onto the one
part of the purchase Apple does not control.

**Apple Upgrade** — 22 questions, and the block is titled `Have questions? Get answers.`
Several are questions a lender would rather not be asked, published anyway:
`Will my application for an Apple Upgrade lease impact my credit score?` ·
`What happens if I change my mind after enrolling in Apple Upgrade?` ·
`How much will it cost to upgrade, leave the program, or buy the leased device?` ·
`What if my device is damaged?` · `Do I own my device at the end of my lease term?` ·
`Will I pay more than the full price of the device over my lease term?` · `Who is Klarna?`

`Who is Klarna?` is an FAQ about the counterparty. A product sold under Apple's name, financed
by someone else, publishes a question introducing that someone else.

**Answers lead with a bare yes or no wherever one exists** `[observed]`: "No, you do not." ·
"No, you cannot add a down payment." · "Yes. However, you will need to apply for and lease each
product separately." The qualification follows the answer; it never replaces it.

## T13 Terminology & glossary

| Apple's term | Usage | The alternative it rejects |
|---|---|---|
| `Bag` | The cart, everywhere: `Add to Bag`, `Review your bag` | "cart", "basket" |
| `Your Saves` | The saved-items container | "wishlist", "favourites" |
| `Select` | The entry CTA on a product tile | "Buy", "Shop now" |
| `Customize` | The CTO action, in user-facing copy | **`Configure`** — which survives only in the IA/URL layer |
| `Apple Trade In` | The buy-back programme | "sell your device" |
| `Apple Upgrade` | The lease programme | "financing", "loan" — explicitly denied in the disclosure |
| `Certified Refurbished` | The refurb programme — though the definition says "pre-owned" | "used", "open box" |
| `Specialist` | The human who helps you buy | "sales associate", "agent" |
| `Genius Bar` | The service counter | "tech support desk" |
| `Personal Setup` | Free post-purchase onboarding session | "onboarding", "tutorial" |
| `Today at Apple` | In-store sessions | "workshops" |
| `Apple Account` | Migrated from `Apple ID`, with the change stated in copy | |
| `Apple Account Balance` | Stored value | "store credit", "wallet" |
| `Apple Gift Card` | Consolidated from two predecessor cards, with the supersession stated | |
| `Apple Card Monthly Installments` / `ACMI` | The 0% instalment option | "BNPL" |
| `Daily Cash` | The cashback mechanic | "cashback", "rewards" |
| `Order Acknowledgement` | The first email | "order confirmation" |
| `Shipment Notification` / `Pickup Notification` / `Pickup Reminder` | Named email objects | generic "dispatch email" |
| `Apple Pickup` | Collect-in-store | "click and collect", "BOPIS" |
| `Pickup contact` | The third party you nominate | "authorised collector" |
| `Delivers to` | The shipping-address field | "Shipping address" |
| `Connect on your own later.` | The unlocked-iPhone tile | "Unlocked", "SIM-free" |
| `Nano-texture display` | A display finish | "matte screen" |
| `SignTime` | ASL/BSL video interpreting for support and shopping | "video relay service" |
| `AppleCare+` / `AppleCare One` / `AppleCare Advisor` | The protection family | "extended warranty", "insurance" |

**The `Customize` / `Configure` split is the notable one.** Apple's IA, URLs and industry
vocabulary all say *configure*; the user-facing copy says `Customize Your Mac`,
`the Customize page`, `Customized Macs`. *Configure* is what the system does; *customise* is
what the user does. The register split is deliberate and consistent.

`Bag` over "cart" is the other. Apple is a retailer whose stores hand you a bag; the digital
metaphor matches the physical one rather than the ecommerce convention.

Note also that Apple **states its own renames in user-facing copy** — "your Apple ID Balance is
now your Apple Account Balance", "The Apple Store Gift Card has been replaced with the Apple
Gift Card." A terminology migration documented for the user rather than executed silently.

## T14 Voice, tone & accessibility

**Two registers, no blending** `[observed]`

Marketing sentences run 3–8 words and are frequently verbless: `Magichromatic.` ·
`Love it. Lease it. Upgrade it.` · `Tested, certified, guaranteed.` · `Mmmmm. Power.` ·
`A battery you can't outrun.`

Help sentences run 12–25 words, one idea each, heavy on `If X, you can Y` conditionals.

Legal footnotes run 30–60+ words with stacked subordinate clauses.

The boundaries are policed. **Playful devices — alliteration, pun, pop-culture riff,
onomatopoeia — appear in marketing and in section headings, and never once in a status message
or an error string.** `We've put the ease in lease.` is a section heading on the same page
whose disclosure says "You may incur a substantial charge up to the amount of your remaining
lease payments". The gap between those two sentences is the house style.

**Person.** Apple is `we`, the customer is `you`, in both registers: "we'll send you a text
message", "we'll mail you a free trade-in kit", "we'll be glad to help you build the Mac
that's right for you." Contractions are standard throughout, including in legal-adjacent help
copy. The passive voice is confined almost entirely to the sales-policy appendix and the
footnotes — "Title in the products shall pass to you…", "Trade-in values will vary based on…"
— which is to say: **Apple uses the passive precisely where it is disclaiming.**

### Accessibility content — a genuine benchmark

`Accessibility Features` (H1), with the deck **`All our accessibility features. / All in one
place.`** — 43 features. `[observed]`

**Feature-name grammar falls into three deliberate classes:**

1. **Coined compound proper nouns, no article, title case** — `VoiceOver`, `AssistiveTouch`,
   `Switch Control`, `Voice Control`, `Live Speech`, `Personal Voice`, `Live Listen`,
   `Live Captions`, `Music Haptics`, `Eye Tracking`, `Head Tracking`, `Braille Access`,
   `Accessibility Reader`, `Assistive Access`, `Guided Access`, `Background Sounds`,
   `Vocal Shortcuts`, `Vehicle Motion Cues`, `Sound & Name Recognition`, `Zoom`, `Magnifier`,
   `Sensory Alerts`, `Real-Time Text (RTT)`, `Share Accessibility Settings`
2. **Lower-cased "settings" bundles** — a sub-class signalling *a group of toggles, not a named
   feature*: `Read & Speak settings`, `Display settings & Text Size`, `Motion settings`,
   `Hover settings`, `Audio settings`, `Made for iPhone hearing devices`
3. **Nested sub-features** under accordions, named at full length rather than abbreviated:
   `Invert Colors, Color Filters, Reduce White Point, and Reduce Bright Effects` ·
   `Reduce Transparency, Increase Contrast, and Differentiate Without Color` ·
   `Display Pulse Smoothing (PWM)` · `Prefer Non-Blinking Cursor` · `Dim Flashing Lights`

The distinction between class 1 and class 2 is the finding. **Capitalisation is being used as
a semantic signal**: title case means "this is a thing with a name you can search for";
lower case means "this is a group of settings". A user who learns the convention can predict,
from the label alone, whether they are looking for a switch or a pane.

**One-line description grammar — a single sentence, no subject, third-person verb or
appositive noun phrase, terminal period, 8–16 words** `[observed]`:

*Verb-first (the feature is the agent):*
"Enlarges anything on your screen." (Zoom) · "Verbally describes every scene in a movie."
(Audio Descriptions) · "Takes your typed words and speaks them out loud." (Live Speech) ·
"Listens for specific sounds and notifies you when they are detected."
(Sound & Name Recognition) · "Helps passengers reduce motion sickness while using their device
in a car." (Vehicle Motion Cues)

*Appositive noun phrase (the feature is a thing):*
"A screen reader that describes what's on your screen, including in braille." (VoiceOver) ·
"A digital magnifying glass that zooms in on, detects, and describes what's in view around
you." (Magnifier)

*User-facing imperative (a minority, used where the feature is an activity):*
"Control your device with just your eyes." (Eye Tracking) · "Create a voice that sounds like
you." (Personal Voice) · "Play calming sounds to help you focus or rest." (Background Sounds)

Forty-three descriptions, three grammars, and the grammar is chosen by what the feature *is* —
a tool, a thing, or an activity. This is the most disciplined microcopy set in the corpus.

**Grouping is by need, not by impairment label** `[observed]`

The page does not use static Vision / Hearing / Speech / Mobility / Cognitive section
headings. Grouping is a filter taxonomy with **three orthogonal facets per feature**:

- `categories`: `vision` · `hearing` · `speech` · `mobility` · `cognitive`
- `needs`: `blindness` · `low-vision` · `motion-sensitivity` · `deafness` · `hard-of-hearing` ·
  `atypical-speech` · `nonspeaking` · `alternative-input` · `dexterity` · `limb-difference` ·
  `comprehension` · `attention` · `communication`
- `devices`: `iphone` · `ipad` · `mac` · `apple-watch` · `apple-tv` · `homepod` · `headphones` ·
  `apple-vision-pro` · `carplay`

And features are **deliberately multi-categorised**: Siri sits in all five categories;
`Live Captions` is both `hearing` and `cognitive`; `Switch Control` is both `speech` and
`mobility`; `Shortcuts app` sits in all five categories and all thirteen needs.

Two decisions worth naming. First, the **`needs` facet is finer-grained than the `categories`
facet and uses functional language** — `alternative-input`, `dexterity`, `comprehension`,
`attention` — rather than diagnostic labels. A user can filter by what is hard rather than by
what they have been diagnosed with. Second, **the refusal of one-feature-one-bucket** means a
captioning feature is findable by someone with an attention difficulty, not only by someone
who is deaf.

**Change markers**: `Updated` and `New`, rendered immediately before the feature name.
Seventeen of forty-three carried `Updated` at harvest. A concise, non-shouty convention for a
page that is republished annually.

**Alt text is hand-written, describes content and state, and glosses marketing colour names**
`[observed]`. This is the single best alt-text practice in the batch:

- "Apple Watch Series 12, aluminum case, dark bronze color, connected to Sport Band, olive
  color (earthy green)" — and the same pattern elsewhere: "burgundy color (dark red)",
  "gris color (metallic gray)", "noir color (black)". **The marketing colour name is given,
  then a literal equivalent in parentheses.** A screen-reader user is told both what the brand
  calls it and what it looks like.
- Alt text that **transcribes text inside the image**: "iPhone screen, notification alert at
  top reads: Psst...It's time to upgrade. You are eligible for your next iPhone"
- Hero video alt is a full sequential description of the motion, with a matching reduced-motion
  still
- "iPhone Duo, various folded positions: tent mode, book mode, laptop mode" — names the states
  the image is demonstrating
- Decorative images and tracking pixels correctly carry empty alt

**Other accessibility conventions** `[observed]`

- Visually-hidden text disambiguates prices: a hidden `Now ` prefix before the discounted
  figure, so a screen reader hears "Now $1,439.00" rather than two unlabelled numbers
- External links suffixed `(Opens in a new window)`; video links "opens in new tab"
- Footnote markers voiced as `Footnote §` rather than a bare glyph
- Icon-only controls expose text
- `SignTime` — support and **shopping** sessions via a sign-language interpreter, with numbered
  imperative steps and the CTA `Connect with ASL Interpreter`. Language variants are named
  individually (Auslan, BSL, LSF, DGS, LIS, JSL, KSL, LSE), and a data notice discloses what
  session information is collected. **A retail accessibility channel, not only a support one.**
- The accessibility footer names four distinct routes: `Contact Us`, `SignTime`,
  `Regulatory Information` (VPATs, the European Accessibility Act) and `Media Services`

**Negative findings, recorded** `[observed]`

- `https://www.apple.com/shop/browse/home/accessibility_store` returns **an empty body**. The
  accessible-shopping store surface could not be harvested.
- Several buy-page merch images and all Apple Upgrade product-tile images ship **empty alt with
  an empty href**
- The `Shop now` CTA duplicates its own heading inside the link text
  ("Shop now Students and educators — save on a new Mac.") — a belt-and-braces accessible-name
  pattern that reads redundantly
- Monthly-price tiles render as "From $1199 or $49.95/mo. per month for 24 mo.months" — a
  dual-length responsive string token collision that would be read aloud as
  "twenty-four mo dot months"
- `Picked up` breaks the Title Case of the status table
- `Order Acknowledgement` / `Order Acknowledgment` — both spellings published
- "1-4 text messages **per item**" vs "per **shipment**" — two different volume disclosures
- "post code" on a US page
- "We'll also send you reminder or two" — missing article
- "Engraved products and Customized Macs **adds** a bit more time" — subject–verb disagreement

---

## Transferable patterns

1. **Publish the state machine, and publish its edit rules in the same vocabulary.** Nine
   named statuses, each with its customer-facing message, plus explicit statements of which
   status permits editing, address change and cancellation. Condition: requires the statuses
   to be stable enough to document. Directly applicable to payments, disputes, KYC and any
   flow where "can I still change this?" is the dominant question.
2. **Make the status message a promise about the next system action, not a description of the
   current one.** `Processing` says "we'll send you an update and prepare the shipment".
   The label names the state; the message names what happens next and who does it.
3. **Bound a status inside its own message.** `Shipped` → "Tracking information will be
   available within 24 hours." Pre-empts the dead-tracking-number complaint at the exact moment
   it is created.
4. **Put the delivery estimate inside the configuration summary, not at checkout.** Subtotal,
   shipping time frame and spec summary update together as options change. The trade-off users
   most often regret is price-versus-lead-time, and it is invisible if the estimate only
   appears two steps later.
5. **Frame a conditional valuation as a self-report contract, then build an accept/reject gate
   for the revision.** "Based on what you tell us" → estimate → "Actual value awarded is based
   on receipt of a qualifying device matching the description provided" → a four-branch revised-
   offer mechanism where a *lower* revision requires consent and a *higher* one is applied
   automatically. Transfers to any instant-quote, part-exchange or settlement product.
6. **Make cancellation an absence of action where it truly is one.** "you can cancel your
   trade-in by simply keeping your device."
7. **Lead with what the product is not.** "This offer is for a consumer lease, not a purchase
   or loan." Same move as Wise's "not an FDIC-insured bank" (041). Mandatory wherever a product
   sits visually alongside a different kind of product at a comparable monthly price.
8. **Use capitalisation as a semantic signal in a feature taxonomy.** Title case = a named,
   searchable feature; lower case = a bundle of settings. Cheap to implement, learnable in one
   exposure.
9. **Group accessibility content by functional need, not by diagnosis, and refuse
   one-item-one-bucket.** `alternative-input`, `dexterity`, `comprehension`, `attention` as
   filter values; a captioning feature tagged both `hearing` and `cognitive`.
10. **Gloss marketing colour names in alt text.** "olive color (earthy green)". Two words of
    extra alt text; the difference between a brand reference and an actual description.
11. **Name an option by what the user will do, not by the jargon for it.**
    `Connect on your own later.` beats "Unlocked".
12. **Negative pattern — do not append a full legal policy to every help page.** Thirteen
    duplicated copies of the sales policy, with no transition heading, destroys the reading
    experience of every article it is bolted to.

## Caveats & gaps

- **The configure-to-order widget itself was not retrieved.** The step rail, option-group
  headings, price-delta strings, the in-flow `Add to Bag`, the AppleCare+ selector, the
  engraving input, the sticky summary panel and the live delivery estimate are all
  client-rendered. Deep configuration slugs return a body identical to the parent page.
  Configuration vocabulary in T4 is reconstructed from SKU link text and from Apple's own prose
  documentation, and is labelled as such. **No `+$…` string has been asserted** — Apple's own
  description says deltas are "added to or subtracted from your subtotal", and the rendered
  form is unknown.
- **The accessible-shopping store surface returned an empty body** and could not be harvested.
  SignTime copy was recovered from an Apple Support article instead.
- **Empty-bag copy does not exist in this file.** No empty-state string was reachable; none has
  been invented.
- **Order Status is behind sign-in and was not attempted.** The entire status vocabulary in T6
  is `[documented]` — quoted from Apple's own help article describing those strings — not
  `[observed]` in the live interface. Verbatim fidelity is high because the help article
  reproduces the messages, but the rendering, ordering and progress-bar labels were not seen.
- **The Accessibility Features fetch was truncated.** Roughly eight of the forty-three feature
  accordions are named in the page's embedded taxonomy but their one-line descriptions were not
  captured. Their names are recorded; their descriptions are not.
- Overlay endpoints referenced from the storefront (specialist, personal, genius, tradein,
  delivery, financing, engraving, CTO) were not fetched.
- Product model names and prices quoted here reflect the live 2026 US catalogue at harvest and
  will date quickly. They are included only where they illustrate a copy pattern.
- Apple Store app copy, in-store copy, and non-US storefronts are unharvested.

## Sources

1. https://www.apple.com/store
2. https://www.apple.com/shop/help
3. https://www.apple.com/shop/help/shipping_delivery
4. https://www.apple.com/shop/help/viewing_changing_orders
5. https://www.apple.com/shop/help/payments
6. https://www.apple.com/shop/help/online_store_exclusives
7. https://www.apple.com/shop/help/returns_refund
8. https://www.apple.com/shop/help/shopping_experience
9. https://www.apple.com/shop/trade-in
10. https://www.apple.com/shop/apple-upgrade
11. https://www.apple.com/shop/refurbished
12. https://www.apple.com/shop/shipping-pickup
13. https://www.apple.com/shop/buy-mac/macbook-pro
14. https://www.apple.com/shop/buy-mac/mac-mini (and a deep configuration slug, which returned an identical body)
15. https://www.apple.com/shop/buy-iphone/iphone-17
16. https://www.apple.com/accessibility/
17. https://www.apple.com/accessibility/features/
18. https://support.apple.com/en-us/101572 (SignTime)
19. https://www.apple.com/shop/browse/home/accessibility_store (empty body)
