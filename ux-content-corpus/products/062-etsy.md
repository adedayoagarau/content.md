# 062. Etsy

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Handmade / vintage / craft-supply marketplace (two-sided, independent-seller) |
| Primary URL | https://www.etsy.com/ |
| Corpus rank | 062 |
| Benchmark strength (source list) | Marketplace trust and transaction states |
| Locale / market observed | en-US (`US United States`, USD); help centre offers 12 languages and 5 English variants |
| Platform observed | Web (marketing + marketplace), Zendesk-hosted help centre, legal/policy hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Consumer-marketplace rather than financial. Visible regimes: California & other state privacy laws (personalised-advertising opt-out framed as a "sale" or "sharing"), sanctions/trade restrictions (`Sanctions Policy`), EU-style content moderation (`Content Moderation at Etsy`), customs and import duties pushed to the buyer. Etsy Payments is the processor; Standalone PayPal is carved out with a separate 180-day dispute route. |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 reachable (1 policy URL redirected) |
| Harvest completeness | Full for T6/T7/T11/T13; partial elsewhere — the marketplace homepage is heavily client-rendered, and the `Cases Policy` / `Buyer Policy` full texts were not opened (only the policy index). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketplace home | https://www.etsy.com/ | Nav, hero, "What is Etsy?" block, footer, cookie modal |
| Help Center home | https://help.etsy.com/hc/en-us | **Two-audience switch**, 12 category cards |
| Your Orders › After You Purchase | https://help.etsy.com/hc/en-us/sections/360000067247-After-You-Purchase | 7 article titles |
| Your Orders › Order Issues & Returns | https://help.etsy.com/hc/en-us/sections/360000066548-Order-Issues-Returns | 9 article titles |
| What's the Status of My Order? | https://help.etsy.com/hc/en-us/articles/115015521948 | **Shipping status vocabulary, verbatim** |
| What is an Estimated Delivery Date? | https://help.etsy.com/hc/en-us/articles/360020601674 | EDD formula, case-eligibility clocks |
| How to Get Help with An Order | https://help.etsy.com/hc/en-us/articles/4402660818583 | The seller-first escalation ladder |
| How to Open a Case | https://help.etsy.com/hc/en-us/articles/5745586898199 | **Case types, windows, refund mechanics** |
| Etsy's Purchase Protection Program | https://help.etsy.com/hc/en-us/articles/7471925990807 | Buyer-side programme copy |
| What is Etsy's Purchase Protection for Sellers? | https://help.etsy.com/hc/en-us/articles/5850122619287 | Seller-side, $250 cap, eligibility list |
| Selling › Orders & Shipping › Manage Orders | https://help.etsy.com/hc/en-us/sections/360000066887 | 14 seller article titles |
| Selling › Orders & Shipping › Reviews & Cases | https://help.etsy.com/hc/en-us/sections/360000067027 | 4 seller article titles |
| Selling › Etsy Shop Basics › Setting Up Your Shop | https://help.etsy.com/hc/en-us/sections/4410109121431 | 11 onboarding article titles |
| Our House Rules › Buyers | https://www.etsy.com/legal/section/buyers | 13 named buyer policies |
| Sell on Etsy | https://www.etsy.com/sell | Seller marketing, fee table, 5-question FAQ |
| *(attempted, redirected)* | https://www.etsy.com/legal/policy/etsy-purchase-protection-program/1030698493118 | → `/legal?archived=true` |

---

## T1 Navigation & IA labels

**The help centre's defining move: a persistent two-audience toggle** `[observed]`

`Shopping on Etsy` · `Selling with Etsy`

These sit immediately under the `Etsy Help Center` wordmark on *every* help page, and they are implemented as a URL parameter (`?segment=shopping` / `?segment=selling`) that persists across links. The same help domain serves two registers and lets the reader declare which one they are in. Etsy then goes further: within-article links carry the segment explicitly (`…?segment=shopping`), so a buyer reading about cases never lands in seller docs by accident.

This is the single most transferable IA decision in the file. Most two-sided marketplaces either split into two help domains (losing cross-links) or merge into one (losing register). Etsy keeps one domain, one URL space, and a declared audience state.

**Help centre categories — buyer side** `[observed]`

| Card | Children |
|---|---|
| `Buying on Etsy` | `Shopping & Gifting` · `Searching for Items` · `Buying Safely` |
| `Cart & Payment` | `Using Gift Cards & Coupons` · `Taxes & Customs Fees` · `Checkout` · `Payment Options` |
| `Your Orders` | `After You Purchase` · `Order Issues & Returns` |
| `Your Etsy Account` | `Sign In & Password` · `Account Settings` · `Regional Settings` · `Contacting Etsy` · `Account Safety & Privacy` |

**Help centre categories — seller side** `[observed]`

| Card | Children |
|---|---|
| `Shop Management` | `Shop Management Tools` · `Etsy Rules & Regulations` · `Communicating with Buyers` · `Growing Your Shop` |
| `Orders & Shipping` | `Order Processing Times` · `Manage Orders` · `Shipping Labels` · `Shipping Rates` · `Reviews & Cases` |
| `Listings` | `Creating a Listing` · `Listing Management` · `Listing Photos` · `Optimizing Your Listings for Etsy Search` |
| `Finances` | `Taxes on Sales, Imports & Fees` · `Deposit Issues` · `Fees & Billing` · `Getting Paid` |
| `Marketing & Promotions` | `Discounts & Promotions` · `Etsy Ads & Offsite Ads` · `Stats & Analytics` · `Social Media & SEO` · `The Etsy Community` |
| `Etsy Shop Basics` | `Setting Up Your Shop` · `Your Shop's Appearance` · `Pattern` · `Etsy Plus` |

**The two registers, visible in the category names.** Buyer categories are possessive and temporal — `Your Orders`, `After You Purchase`, `Order Issues & Returns`. Seller categories are operational and plural — `Manage Orders`, `Listing Management`, `Shipping Labels`. The buyer owns things; the seller operates things. `Your Etsy Account` is the one card that appears identically in both columns, which is correct: identity is the shared surface.

Two buyer categories are framed from an emotional position rather than an object: **`Buying Safely`** and **`Account Safety & Privacy`**. `Buying Safely` as a sibling of `Shopping & Gifting` is the trust theme surfacing in the IA itself.

**Global marketplace nav** `[observed]`: `Categories` · `Gifts` · `Fresh Finds for Fall` · `Home Favorites` · `Fashion Finds` · `Vintage` · `Registry` · `Gift Cards` · `Sign in` · `Cart`. Note the nav is mostly *seasonal editorial*, not taxonomy — only `Categories` and `Vintage` are structural.

**Footer groupings** `[observed]`: `Shop` · `Sell` · `About` · `Help`, under the standalone line **`We're on a mission to keep commerce human.`** The help-centre footer carries the shorter form `Keep Commerce Human` beside the wordmark — a tagline that exists in two lengths for two surfaces.

**Legal hub IA** `[observed]`: `Our House Rules` — "Get to know Etsy's legal terms and policies" — split three ways by audience, each with a scope line:

- `Buyers` — "Shopping, communicating with sellers, ordering and more"
- `Sellers` — "What you can sell, your responsibilities and details on fees"
- `Third parties` — "IP holders, API developers, affiliates and anyone requesting information"

`Our House Rules` is a deliberate softening of "Legal" — a domestic metaphor for a policy hub, consistent with `Keep Commerce Human`.

## T2 Value proposition & headline patterns

**There is no product hero.** The marketplace home leads with seasonal merchandising (`Your best spooky season yet starts here` / `Shop Halloween`), then a themed-interest carousel, then — near the foot — a value-proposition block titled as a question:

> `What is Etsy?`
> `Read our wonderfully weird story`

Three sub-blocks, each an outcome noun phrase `[observed]`:

- `A community doing good` — "Etsy is a global online marketplace, where people come together to make, sell, buy, and collect unique items."
- `Support independent creators` — "There's no Etsy warehouse – just millions of people selling the things they love."
- `Peace of mind` — "Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support."

**`There's no Etsy warehouse`** is the strongest line on the site: the differentiator stated as a negation of the competitor's infrastructure. It does the work of three paragraphs of positioning, and it doubles as an expectation-setter for delivery times — the same sentence that sells the brand also explains why an order takes three weeks.

**`we are always ready to step in for support`** is worth flagging: "step in" is the exact verb eBay uses for its escalation (`Ask eBay to step in and help`). Etsy uses it in marketing prose; eBay uses it as a literal button label.

**Seller-side hero is the volume claim** `[observed]`

> `Millions of shoppers can't wait to see what you have in store`
> Sub-hero: `Join the creative marketplace where millions of shoppers spend billions each year purchasing directly from creative entrepreneurs like you.`

Then three benefit cards, adjective-noun: `Great value` · `Powerful tools` · `Support and education`, each with a `Learn more` anchor. Note `Learn more` appears bare here, three times — the seller page is less disciplined about link text than the help centre.

**A four-item trust strip with no elaboration** `[observed]`: `No additional monthly fees` · `Secure transactions` · `Automatic deposits` · `Seller protection` — under the header `Simple & secure`. Three of the four are negations or reassurances rather than features.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get help with an order` | Help centre hero, **twice, side by side** | Two adjacent buttons with identical labels pointing to `/your/purchases` and `/your/purchases/select_order` — a duplication defect (see T14) |
| `Help with an order` | Help centre "Didn't find what you needed?" block, **also twice** | Same defect, shorter label |
| `Choose your order` | `Quick answer` block at the top of four different articles | The consistent entry point into the recovery flow |
| `Help with Order` / `Help with order` | Quoted as the in-product button on the Purchases page | **Two capitalisations of the same button** across articles |
| `Open a case` | The escalation action, always bold | |
| `Submit to Etsy` | Final step of the case form | Names the recipient, not the action |
| `Send help request` (web) / `Submit help request` (app) | Same action, two platforms, two verbs | `[documented]` |
| `Message seller` | App path | |
| `Track Package` | Beside an order with supported-carrier tracking | Title case, both words |
| `Track your package` | Same action inside the guest-checkout confirmation email | Sentence case — third variant of the tracking CTA |
| `View Receipt` | Fallback when the carrier isn't Etsy-supported | |
| `View case` · `Close` | Case management | |
| `Contact Etsy Support` · `Contact support` · `Contact Etsy` | Three labels for one destination across three surfaces | |
| `Read our Policies` · `Get the ins and outs of buying and selling on Etsy` | Help footer — link + descriptor pair | |
| `Ask in the forums` — `Learn from our large and knowledgeable community` | Help footer | |
| `Check out the Etsy Journal` — `Explore ideas and inspiration for creative living` | Help footer | |
| **`See how you're protected`** — `Find out more about safety and security in our marketplace` | Help footer | The trust CTA written in second person passive |
| `Go to Help Center` | Marketplace home, under `Have a question? Well, we've got some answers.` | |
| `Get started` · `Open your Etsy Shop` · `Open your Etsy shop` · `Start selling today` | Seller page, **four variants of one action on one page** | |
| `Skip to content` / `Skip to Content` | Both capitalisations exist across the two domains | |

**Observation.** Etsy's CTA discipline is markedly worse than its IA discipline. The `Get help with an order` duplication, the `Help with Order` / `Help with order` split, three tracking-CTA capitalisations and four shop-opening variants are all real. What Etsy *does* do consistently is the **link-plus-descriptor pair** in the help footer — every escalation route gets a label and a one-line explanation of what you'd find there, which is how a user picks between "forums" and "support".

**The `Quick answer` block is the best CTA pattern here** `[observed]`. Four separate articles open with an identical bolded `Quick answer` block containing the same `Choose your order` button and a two-sentence conditional. The reader gets the action *before* the explanation, and the same block is recognisable across articles.

## T4 Onboarding & getting-started

**Seller onboarding is stated as a six-item run-on sentence** `[observed]`, in the `/sell` FAQ:

> "Create an Etsy account (if you don't already have one), set your shop location and currency, choose a shop name, create a listing, set a payment method (how you want to be paid), and finally set a billing method (how you want to pay your Etsy fees)."

Note the two parentheticals glossing `payment method` and `billing method` — two near-identical terms that would otherwise collide, disambiguated inline at the point of first use. That is a small, excellent piece of terminology work.

**Time promise stated twice, differently** `[observed]`: `In just a few minutes your shop can be open for business.` (seller page close) vs. `It's easy to set up a shop on Etsy.` (FAQ answer opener).

**Onboarding help articles — the ordering is the interesting part** `[observed]`, from `Setting Up Your Shop`:

1. `Identity Verification with Persona on Etsy`
2. `How to Verify Your Identity on Etsy`
3. `How to Open an Etsy Shop`
4. `What Can I Sell on Etsy?`
5. `Why Can't I Open a Shop in My Country?`
6. `How to Set Up Your Shop Policies`
7. `What to Do After You Sell an Item`
8. `How to Ship Your Items on Etsy`
9. `What's the Link for My Shop?`
10. `How to Return to Your Shop After a Break`
11. `How to Refer a Friend to Sell on Etsy`

**Identity verification is items 1 and 2 — before "How to Open an Etsy Shop".** The KYC gate is the first thing in the onboarding section, and a named third party (`Persona`) is in the title. Item 5 is an eligibility rejection article (`Why Can't I Open a Shop in My Country?`) sitting inside the getting-started section rather than in a troubleshooting bucket, and item 10 (`How to Return to Your Shop After a Break`) covers re-onboarding after dormancy. So the "getting started" section spans **gate → start → restriction → restart**, not just the happy path.

**A one-time fee disclosed as a conditional the seller can't yet resolve** `[observed]`

> `One-time shop set up fee` — "Once you've opened your shop, please note that you may be charged a one-time shop set-up fee. If you are required to pay this fee, you will see the amount due before completing your final shop set-up steps."

The amount is not given; the *moment you will learn the amount* is. Recorded as an ambiguous pattern — honest about the conditionality, unhelpful about the number. The block is rendered **twice, consecutively and identically** on the page.

## T5 Form & field labels

`[documented]` unless noted.

**Case-opening form** — the field labels are the most quotable:

- `What do you need help with?` — the option-set prompt on the buyer's help request
- `Request help with an order issue` — the app-side equivalent prompt
- **`Let us know what went wrong`** — the free-text box label on the case form
- Refund-method selector, described but not labelled: "Select how you'd prefer to receive your refund, if one is issued."
- `Etsy credit` — one named refund-destination option

`Let us know what went wrong` is the standout. It is permissive rather than interrogative, uses `us` (Etsy, not the seller), and presupposes that something did go wrong rather than asking the user to classify it first. Compare with the preceding step, which *does* force classification (`Select the reason you need help from the list of options`) — so Etsy asks for the taxonomy and the narrative separately, in that order.

**An irreversibility warning attached to a field** `[observed]`: "Your selection can't be changed later." — placed on the refund-method step, inline, not in a confirmation dialog.

**Listing-page field labels the buyer sees** `[documented]`:
- Web: `Shipping and return policies` → **`Order today to get by`** + date range
- App: `Shipping & policies` → `Est. Delivery` or `Estimated delivery:` + date range

`Order today to get by` is a conditional promise compressed into five words — it binds the estimate to an action the buyer hasn't taken yet. The app shows two different labels (`Est. Delivery` / `Estimated delivery:`, one with a colon) for the same field.

**Navigation field labels** `[documented]`: `Your account` → `Purchases and reviews` (web) · `You` → `Purchases` (app). The web label bundles two nouns; the app splits them.

## T6 Status & state language — PRIORITY

### The shipping-status vocabulary (5 values)

`[documented]`, all from `What's the Status of My Order?`, which carries the sub-heading **`What do the shipping statuses mean?`** — Etsy writes a dedicated section whose only job is to gloss its own state names.

| Status | Definition (verbatim) |
|---|---|
| `Not Shipped` / `Not shipped` | "the seller hasn't completed the order yet **or didn't update the order on Etsy**" |
| `Shipped` | "means that the seller has completed the order on Etsy and is on its way." |
| `Pre-transit` | "The seller added a tracking number and it is pending scanning at the shipping facility." |
| `In Transit` | "The seller has shipped your order and is on its way to you." |
| `Delivered` | "The package has arrived, and you can now leave a review for your order." |

Five findings:

1. **`Not Shipped` is defined as two different realities with one label** — the order genuinely hasn't shipped, *or* the seller shipped it and forgot to update Etsy. Etsy states the ambiguity in the status definition itself rather than pretending the status is reliable. This is the Wise "complete-but-not-arrived" problem, handled inline instead of in a separate article.
2. **The vocabulary is a hybrid of seller-action and carrier-scan states.** `Shipped` means *the seller pressed a button*. `Pre-transit` and `In Transit` mean *the carrier scanned something*. `Not Shipped`, `Shipped` and `Delivered` are Title Case in the source; `Pre-transit` and `In Transit` are carrier-derived and typographically inconsistent (`Pre-transit` lowercase `t`, `In Transit` capital `T`). The seam between the two systems shows in the capitalisation.
3. **`Shipped` and `In Transit` have near-identical definitions** — both end "and is on its way (to you)". The only real difference is whether a tracking number exists. Two states, one meaning, distinguished by data availability rather than by what happened to the parcel.
4. **`Delivered` is defined by what the buyer can now do**, not by the parcel's location: "you can now leave a review for your order." The terminal state is written as an unlock.
5. **Grammatical defect in `Shipped`**: "the seller has completed the order on Etsy and is on its way" — the subject of "is on its way" is `the seller`. Same fault in `In Transit`. Recorded as-is.

**Explicit no-tracking states** `[documented]`:
- "Some international or cross-border shipments won't show tracking once the order leaves the departing country. The tracking status should update when the package arrives in the destination country."
- `My order doesn't have a tracking number` — a named sub-heading; "Not all shipping methods include tracking information."

Etsy documents the *absence* of state as its own condition, with two distinct causes. Most marketplaces leave this silent.

### The Estimated Delivery Date as a computed, named object

`[documented]` — EDD is not a display value, it is a defined construct with a published formula:

> **`Processing time + Carrier transit time = Estimated Delivery Date`**

Rendered as a display equation in the help article, followed by a worked example: "If the processing time for an item you purchased is 3-5 days, and the transit time for the shipping method you chose is usually 2-4 days, your estimated delivery date is 5-9 days from today."

And it recalculates: "If the seller completes the order earlier than the expected ship date, the estimated delivery date will be recalculated accordingly."

`processing time` is itself glossed in the same sentence — "(how long it takes the seller to create and prepare them for shipment)" — because on a handmade marketplace the item may not exist yet at purchase. That parenthetical is the whole business model in nine words.

**`maximum estimated delivery date`** is a distinct named quantity from `estimated delivery date`, and it is the one that all the case clocks run from. Etsy is explicit that it is the upper bound of a range: "the latest date in the estimated delivery range" is eBay's phrasing; Etsy's is "the maximum estimated delivery date window provided at checkout".

**Absence disclosed**: `Why don't I see an estimated delivery date for my order?` — "Not all orders will have estimated delivery dates. Estimated delivery dates depend on the order's shipping settings, which are set by the seller."

### Payment state

One article title only `[documented]`: `Why Is the Payment for My Purchase Still Processing?` — `Processing` is a named payment state, surfaced as a user question rather than a status table.

### Stock / listing state

`[documented]`: listings are "active for four months, or until they sell" (`$0.20 Listing fee` — "Listings are active for four months, or until they sell."). Duration-plus-event as the expiry rule.

## T7 Error, failure & recovery — PRIORITY

This is Etsy's strongest category and the reason it earns its benchmark line.

### The escalation ladder, stated identically in four places

`[observed]` — the same `Quick answer` block opens `What's the Status of My Order?`, `How to Get Help with An Order`, `How to Open a Case` and `What is an Estimated Delivery Date?`:

> `Choose your order`
> "If you contacted the seller more than **48 hours** ago, choose **Open a case** so Etsy can help you. For qualifying orders, you'll receive a refund for any item that **doesn't arrive, arrives damaged, or doesn't match the item description or photos**."

Three-clause coverage formula, repeated verbatim across the whole help centre with only minor variation. A buyer who lands on any of four pages gets the same 40-word answer before any prose. **This is the most disciplined piece of content reuse in the corpus so far.**

### The seller-first principle, stated as a sentence about people

`[observed]`: "If you need help with an order, **the seller you purchased your order from is the best person to help you.**"

Not "contact the seller first" (procedural) but "the seller is the best person" (a claim about who can actually solve it). The article then lists what the seller can do, in five bare infinitives:

`Check your order status` · `Update your shipping address` · `Make a change to your order` · `Request a refund, return, or exchange` · `Request a cancellation`

### Three named case types — the marketplace's failure taxonomy

`[documented]`, presented as a three-row table:

| Case type | Definition (short, verbatim) |
|---|---|
| `Non-delivery` | "You placed an order and submitted payment, but didn't receive the item, or received it **7+ days after the estimated delivery date window**…" |
| `Not as described` | "The color, design, or model is different from what was displayed in the listing description and photos. You received the incorrect quantity. The condition of the item is misrepresented." |
| `Item arrived damaged` | "You received the item, but it was damaged." |

Note the asymmetry in length and form. `Non-delivery` is a noun (system-side). `Not as described` is a participial phrase (comparative). `Item arrived damaged` is a **complete sentence in past tense** — subject, verb, state. Three grammatical registers in a three-row table, and arguably the right choice: the damaged case is the one a distressed buyer scans for, and the sentence form matches how they'd say it.

`Not as described` is defined by **enumeration with an explicit escape hatch** — "This can include (but isn't limited to):" — three examples, then open. The other two are closed definitions.

### The eligibility clocks, stated as conditions not deadlines

`[documented]` — Etsy expresses windows as *what must be true before you can act*, which is the inverse of eBay's deadline table:

- Physical items and immediate-download digital items — **both** must hold: "The estimated delivery date for your order provided at the time of purchase has passed, **and** 48 hours have passed since you sent the seller a Help with order request."
- Made-to-order digital items: "You downloaded the item; **or** 7 days have passed since you purchased the item, **and** 48 hours have passed since you sent the seller a Help with order request."
- Non-delivery specifically: "**7+ days** must have passed since the maximum estimated delivery date."
- Not as described / damaged: "The maximum estimated delivery date must have passed."
- Closing window: "**30 days** from your order's estimated delivery date."
- Refund ceiling: "Refunds processed by Etsy must take place within **180 days** of the date of the transaction. After 180 days have passed, Etsy is unable to support a refund for your order."
- Standalone PayPal route: "open a dispute with PayPal within **180 days** of the purchase date."
- Seller response SLA (eligibility condition): "You responded to the buyer's Help with Order message **within 48 hours**."

### The "too early" state is designed, named and given a countdown

`[observed]` — the standout recovery-UX finding:

> `I don't see the option to open a case`
> "If you don't see the option to open a case, you might instead see information that it is **too early, too late**, or a **Help with order** message needs to be sent to the seller."
>
> "If it is still too early for you to open a case, **a callout displaying the date and time you can start the case process** will be shown in the **Still need help?** section of your Help with order request."
>
> "The callout also shows **how long you'll have to open a case** before that order is no longer eligible…"

Three things here. (1) The disabled state has three named causes, and the doc lists them rather than leaving the user to guess. (2) The blocked user is given an **absolute date and time**, not "check back later". (3) The same callout carries *both* boundaries — when the window opens and when it closes — so the user never has to hold two dates in their head. `Still need help?` is the named container.

### Coaching the user on how to write their own complaint

`[observed]` — a help article teaching message-writing:

> `What should I say in my message to the seller?`
> "…let them know why you're reaching out and **what your desired resolution would be**. Give as many details as you can about your order, and provide photos if the item is damaged or different from what you ordered."

Asking the complainant to state their desired outcome up front is a resolution-rate intervention delivered as microcopy. Directly transferable to any dispute intake.

### Recovery-article titles — the buyer side is first-person and anxious

`[observed]`

- `Why Can't I Find My Order in My Account?`
- **`I Can't Find My Refund for an Order`**
- `Why Is the Payment for My Purchase Still Processing?`
- `How to Connect a Guest Order to an Etsy Account`
- `When Can I Leave a Review for My Order?`
- `Chargebacks on Etsy`
- `How to Return or Exchange an Item on Etsy`

`I Can't Find My Refund for an Order` is the Wise-style first-person confession title — the only one in the set, and it is about the user's *inability to find*, not their error. Note the asymmetry: Etsy uses `Why Can't I…?` for system-caused problems and `I Can't…` for search failures.

### Recovery-article titles — the seller side is instructional and consequence-aware

`[observed]`

- `How to Resolve a Case from a Buyer`
- `What to Do if You Receive a Negative Review`
- `How to Report a Review`
- `What if My Buyer's Package Gets Lost?`
- `How to Complete Orders if Your Shop is Closed or Suspended`
- `How to Help a Buyer With a Return`
- `How to Change a Buyer's Shipping Address`
- `Refunds, Returns, and Exchanges for Sellers`

**`How to Complete Orders if Your Shop is Closed or Suspended`** is the outlier worth recording: Etsy documents how to keep serving buyers while under enforcement. A help article for the state where the platform has acted against you.

**`How to Help a Buyer With a Return`** — the verb is `Help`, not `Process` or `Manage`. The seller-side vocabulary keeps the buyer as a person in the title.

### Pre-emptive de-escalation

`[observed]` — before the refund process, the buyer is given five things to try:

> "We recommend that you try to locate the package before you start the refund process:"
> `See if someone else in your household or office accepted the package.` · "If the item you purchased isn't time-sensitive, **try waiting a day**." · `Contact your local post office or shipping center…` · `Reach out to neighbors in case the package got delivered to their address by mistake.`

Then a second, forward-looking list headed **"Optional steps we recommend to help ensure a smoother delivery for future orders"** — delivery instructions, rescheduling, signature requests, lockers, video doorbells. Marked `Optional` and scoped to *future* orders, so it reads as advice rather than as blame for this one. That labelling is doing real tonal work: the same five bullets without "Optional" and "for future orders" would read as "this was your fault".

### Terminal and irreversible states, stated plainly

`[documented]`

- "A case will close automatically when: A full refund is issued. You've contacted your card provider or PayPal to dispute the charge."
- "If you filed a chargeback for an order or otherwise disputed a charge with your financial institution, **the seller can't issue a refund on Etsy and you won't be able to open a case. This is because only one method of credit can be issued.**"

The chargeback lock-out is explained with a reason ("only one method of credit can be issued"), not just asserted. A user who understands *why* they're locked out is less likely to escalate again.

### The gift card

`[observed]`: "If you're worried your gift may not arrive on time, you can **print and share this card** to let the recipient know that something special is on the way."

A printable placeholder card, offered inside a support article, for the emotional failure mode (the gift is late) rather than the transactional one. There is no refund or resolution attached — it is pure face-saving. Genuinely unusual and worth flagging as a pattern: *service recovery for the social consequence, not the financial one*.

## T8 Empty states

`[observed]` — one, in the help-centre search:

> "We're sorry, we couldn't find any results that match your search. Please try again."
> "To help you find what you're looking for:" · `Try different search terms` · `Use more general search terms` · `Make sure all words are spelled correctly`

*(Note: this string was observed on eBay's help surface during the same harvest and is a Zendesk/standard pattern; Etsy's own no-results string was not reached and is recorded as `[absent]`.)*

Other empty states are behind auth. `[absent]`

One near-empty-state `[observed]` on the help home: `Didn't find what you needed? Try these.` — the routing block is framed as a failure recovery, which is a soft empty-state for the whole page.

## T9 Notifications & system messages

`[documented]` unless noted.

**Named transactional emails**

- `email shipping notification from Etsy` — "Once the seller has completed the order and is ready to ship, you'll get an email shipping notification from Etsy."
- Guest-checkout confirmation: "you'll receive a confirmation email once your order has shipped" with `Track your package` at the top
- `the receipt that was emailed to you after purchase` — and the guest recovery route is **reply to it**: "you can still reach out to the seller by replying to the receipt that was emailed to you after purchase."
- Refund confirmation: "Once your refund eligibility is confirmed, Etsy sends you a confirmation email."
- Case outcome: "When Etsy makes a final decision, we'll let you and the seller know."
- Seller dispute outcome: "You'll get a final decision via email **within 1-3 business days**."

**The case log as a named channel** `[documented]`: "After you open a case, **all communication with the agent will take place in your case log.**" — `case log` is a first-class noun with its own URLs (`/your/cases`, `/your/cases/shop/open`). Etsy names the container for the conversation rather than calling it "messages".

**In-page toast observed** `[observed]`, help centre: `Thanks for your message! We'll be in touch soon.`

**Feedback widget copy** `[observed]` — appears at the foot of every help article and is unusually well-designed:

> `Did this resolve the issue?` [Yes] [No]
> `Thanks! Anything you'd like to add?` → `Submit feedback`
> On No: **`Why wasn't this article helpful? (select all that apply)`**
> `The steps don't match what's on the site` · `The information was hard to find` · `There wasn't enough information here` · `There was too much information here`
> `Thanks for your feedback!`

Two things worth stealing. First, the question is **`Did this resolve the issue?`** rather than "Was this helpful?" — it asks about outcome, not sentiment. Second, the four failure reasons are a genuine diagnostic taxonomy: staleness, findability, under-writing, **over-writing**. Most feedback widgets have no option for "too much information", which is the single most common failure of help content.

## T10 Disclosures, legal & compliance

**Named buyer policies** `[observed]`, from `Our House Rules › Buyers`:

`Buyer Policy` ("Your rights and obligations as a buyer on Etsy") · `Cases Policy` · `Community Policy` ("Requirements for participating in community spaces") · `Harassment Policy` ("Behavior we prohibit on Etsy") · `Discrimination and Hateful Content Policy` ("Behavior we prohibit on Etsy") · `Sanctions Policy` ("Your responsibilities regarding sanctions and trade restrictions") · `Minor Safety Policy` · `Off-Platform Transactions` ("Buy and sell items safely and securely on Etsy.") · `Content Moderation at Etsy` · `United States Regional Privacy Policy` · `Round Up Donation Feature Terms and Conditions` · `Purchase Reward Terms` · `Etsy Insider - Closed Beta Program Terms`

Two policies share the identical scope line `Behavior we prohibit on Etsy`. Policies are labelled by *what they govern* rather than by legal instrument type.

**The Purchase Protection coverage formula** — four bullets, buyer-facing `[observed]`:

> "…you'll receive a full refund for qualifying orders when your item:"
> `Doesn't arrive` · `Arrives damaged` · `Arrives 7+ days after the maximum estimated delivery date window provided at checkout` · `Differs significantly from the item description or photos (for example, the wrong material or color)`

Four verb-first fragments, all starting with the item as subject. The item is the actor; the buyer is absent from the grammar. Compare the seller-facing version of the same four conditions, where **the buyer becomes the subject**:

> `A buyer never received their package (for example, if it was lost in transit)` · `Their item arrived 7+ days after its estimated delivery date window` · `Their item arrived damaged (for the first instance per calendar year)` · **`Their item matches the listing description and photos, but a buyer claims it does not`**

The fourth seller-side bullet has no buyer-side counterpart, and it is remarkable: Etsy explicitly covers the case where **the seller is right and the buyer is wrong**. The programme is described to each audience from inside that audience's sense of grievance. That is the sharpest register-split finding in this file.

**The $250 cap, disclosed on the seller side only** `[observed]`

> "Etsy will cover up to **$250** of a refund (or the converted equivalent in your local currency), and any remaining amount will be charged to the seller. **You won't need to issue the refund yourself.**"
> "…Etsy will cover up to $250 … of the refund amount, **even if the order total exceeds $250**."
> "To help protect the full order value, consider **purchasing shipping insurance** for orders over $250."

Cap → consequence → mitigation, in that order, three times on one page. The buyer-facing article never mentions $250; the buyer is told "full refund" without qualification. Both statements are true (the buyer does get a full refund; the *seller* absorbs the excess) but the cap is invisible to one side. Recorded as a deliberate audience-scoped disclosure, not an error.

**Named exclusions** `[observed]`

- Force majeure, enumerated: "Items that arrive late due to forces outside the seller's control, such as a **carrier strike, severe weather event, war, civil unrest or similar event**, as determined by **Etsy in its sole discretion**, do not qualify…" — stated in *both* the buyer and seller articles, verbatim.
- Customs: "Buyers are responsible for paying any customs duties, import duties, or other charges imposed by their country's government, payable on delivery. Items that arrive late or are not received due to **buyer delay or refusal to pay charges owed upon delivery**, do not qualify…"
- Third-party insurance takes precedence: "You obtain insurance from a third-party source, or have carrier and/or payment processor coverage. We ask that you first submit a claim to your **primary source of coverage** instead."
- Shop standing: "Your shop is not in good standing for violating Etsy policies."

**Seller eligibility as an eight-item checklist** `[observed]` — the conditions under which protection applies, each independently verifiable: shipped within stated processing time · valid tracking or Etsy-purchased label · listing has an estimated delivery date · item matches photos and description · meets customer service standards · responded within 48 hours · first damaged instance in the calendar year · duties included upfront for US-inbound.

**A temporal policy boundary, dated** `[observed]`: "For cases opened prior to **May 7, 2026**, refer to the Etsy Purchase Protection policy in effect at that time." — Etsy versions its protection policy by case-open date and links the superseded version.

**Reassurance attached to the enforcement mechanism** `[observed]`, from the buyer article's section `What happens to the seller if I request a refund?`:

> "**An occasional case opened against a seller will not negatively impact them or their shop.**"

A buyer-facing paragraph whose only purpose is to reduce the buyer's guilt about harming a small seller. It exists because the marketplace is handmade and the buyer knows the seller is a person. This is a trust-content decision with no analogue on Amazon or eBay.

**Fee disclosure** `[observed]`, seller page: `$0.20 Listing fee` · `6.5 % Transaction fee, 3% + $0.25 payment processing fee*` · `15% Offsite Ads Fee*` · `2.5% Currency Conversion fee`. Each with a one-line gloss. Footnoted: "Listing fees are billed for $0.20 USD, so the amount in your currency may vary based on changes in the exchange rate." and "Offsite advertising is optional for most sellers, but **may be required based on how much you make in sales** on Etsy in a 12 month period." — an opt-out that stops being optional above a threshold, disclosed.

**Cookie consent** `[observed]`: `Required Cookies & Technologies` — `Always on`; `Personalized Advertising` — with the legal framing spelled out: "Personalized advertising may be considered a 'sale' or 'sharing' of information under California and other state privacy laws, and you may have a right to opt out." And a realistic expectation-setter: "Turning off the personalized advertising setting **won't stop you from seeing Etsy ads**, but it may make the ads you see less relevant or more repetitive."

That last clause — "less relevant **or more repetitive**" — is an honest description of the downside of opting out, rather than the usual silence. Good practice.

## T11 Help-centre architecture

Four-level: **audience segment → category → section → article**, with segment carried in the URL.

**Article-title grammar — five shapes, and the mix is itself the pattern:**

| Shape | Examples |
|---|---|
| `How to <verb>` (dominant) | `How to Open a Case` · `How to Return or Exchange an Item on Etsy` · `How to Cancel an Order on Etsy` · `How to Get Help with An Order` · `How to Add Tracking and Complete an Order` |
| `What is / What's …?` | `What is an Estimated Delivery Date?` · `What's the Status of My Order?` · `What is Etsy's Purchase Protection for Sellers?` · `What Can I Sell on Etsy?` |
| `Why …?` / `Why Can't I …?` | `Why Can't I Find My Order in My Account?` · `Why Is the Payment for My Purchase Still Processing?` · `Why Can't I Open a Shop in My Country?` |
| `I <can't do thing>` | `I Can't Find My Refund for an Order` |
| `What if / What to Do if` | `What if My Buyer's Package Gets Lost?` · `What to Do if You Receive a Negative Review` · `What to Do After You Sell an Item` |

Titles are **Title Case throughout**, which is unusual in 2026 and consistent. Question marks are used freely. The buyer side skews to questions; the seller side skews to `How to`. That is the register split made visible in grammar: buyers ask, sellers are instructed.

**Within-article furniture** `[observed]`: `Quick answer` (top) → `Jump to a section:` (anchor list) → H2 sections → `Did this resolve the issue?` → `Related articles` → **`Still have questions?` / `Contact support`**.

Human contact is last and smallest, after five self-service layers. Identical placement discipline to Wise.

**Cross-platform instruction pairing** `[observed]` — every procedural article gives web and app steps as two numbered lists under `On Etsy.com:` and `On the Etsy app:`, with the *labels* differing between them (`Your account` / `You`; `Purchases and reviews` / `Purchases`; `Send help request` / `Submit help request`). Etsy documents the divergence rather than harmonising the copy, which is honest but is also the source of half the CTA inconsistencies in T3.

**Routing block at the foot of the help home** `[observed]` — five destinations, each a link plus a descriptor:
`Help with an order` · `Contact Etsy Support` · `Read our Policies` / "Get the ins and outs of buying and selling on Etsy" · `Ask in the forums` / "Learn from our large and knowledgeable community" · `Check out the Etsy Journal` / "Explore ideas and inspiration for creative living" · `See how you're protected` / "Find out more about safety and security in our marketplace".

## T12 FAQs

**Placement: `/sell` (seller marketing), under `Frequently Asked Questions` with the lead-in "Here are some common questions about selling on Etsy."** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do fees work on Etsy? |
| 2 | What do I need to do to create a shop? |
| 3 | How do I get paid? |
| 4 | How does Etsy protect sellers? |
| 5 | What can I sell on Etsy? |

**Structural notes.** Five questions, ordered: cost → setup → income → risk → eligibility. Money comes first and *twice* (Q1 fees out, Q3 money in), bracketing the setup question. Eligibility is last, which is a choice — a prospective seller whose product isn't allowed reads four irrelevant answers first.

Q4 (`How does Etsy protect sellers?`) is answered in four sentences that bury the cap entirely: "Eligible purchases made using Etsy Payments qualify for Etsy Purchase Protection. This means that Etsy will refund buyers and **you'll keep your earnings** if a qualifying order is damaged or doesn't arrive. **Terms apply.**" — "you'll keep your earnings" is the seller's actual concern, answered directly; `Terms apply` carries the $250 cap by reference.

Every answer ends with a `Learn more` link, and three of the five link to help-centre articles rather than to other marketing pages — the FAQ is a routing layer into the help centre, not a terminal surface.

**Also present**: `What can you sell on Etsy?` as a *section heading* on the same page, distinct from FAQ Q5 of near-identical wording. The page asks the same question twice in two formats.

**Marketplace-home FAQ prompt** `[observed]`: `Have a question? Well, we've got some answers.` → `Go to Help Center`. The `Well,` is doing a lot of tonal work — a conversational filler word in a heading, deliberately informal, and a small hedge ("some answers", not "the answers").

## T13 Terminology & glossary

| Term | Etsy's usage | The alternative it rejected |
|---|---|---|
| `shop` | The seller's storefront, always | "store" (Shopify's word), "seller page" |
| `listing` | The unit of inventory, with its own lifecycle and fee | "product", "SKU", "item page" |
| `item` | What the buyer receives | "product", "goods" |
| `case` | The formal dispute object, with `case type`, `case log`, `open`/`close` verbs | "claim" (Amazon), "request" (eBay), "dispute" |
| `Help request` / `Help with order` | The **pre-case** contact with the seller — a distinct, named, required step | "message", "enquiry" |
| `Open a case` / `close a case` | The verbs | "file", "raise", "submit" |
| `Purchase Protection` / `Etsy's Purchase Protection program` | The umbrella programme, one name for both audiences | "Buyer Protection" — pointedly *not* used, because it also protects sellers |
| `Purchase Protection for Sellers` | The seller-side view of the same programme | a separate programme name |
| `Non-delivery` · `Not as described` · `Item arrived damaged` | The three case types | "INR", "SNAD" (eBay's internal shorthand, never surfaced) |
| `Estimated Delivery Date` / `maximum estimated delivery date` | Two distinct, defined quantities | "delivery window", "ETA" |
| `processing time` | Seller's make-and-prepare span | "handling time" (eBay's word), "lead time" |
| `Pre-transit` | Tracking created, not yet scanned | "Label created", "Awaiting collection" |
| `Etsy credit` | A named refund destination | "store credit", "wallet balance" |
| `Etsy Payments` vs `Standalone PayPal` | Two processor paths with different dispute routes | |
| `good standing` | The seller-eligibility state | "compliant", "in good standing with policies" |
| `Creativity Standards` | The policy defining what may be sold: "made, designed, handpicked, or sourced" | "product policy", "prohibited items" |
| `Our House Rules` | The legal hub | "Legal", "Terms & Policies" |
| `Keep Commerce Human` / `We're on a mission to keep commerce human.` | Tagline, two lengths for two surfaces | |
| `Pattern` | The seller's standalone website product | |
| `Etsy Plus` · `Etsy Insider` · `Etsy Registry` · `Etsy Journal` · `Seller Handbook` · `Offsite Ads` · `Etsy Ads` | Named sub-products | |
| `Taskers` (n/a) | — | |
| `creative entrepreneurs` / `makers` / `independent creators` | Three names for sellers in marketing | "vendors", "merchants" |

**The four-verb definition of what belongs on Etsy** `[observed]`: "Everything listed for sale on Etsy must be **made, designed, handpicked, or sourced** by a seller". Four verbs covering handmade, custom, vintage and supplies in eight words, repeated verbatim on both `/sell` and the `What can I sell` FAQ. A single sentence doing the whole catalogue-policy job.

**Register split by audience, not by surface.** Buyer copy uses `item`, `order`, `shop`, `seller`. Seller copy uses `listing`, `sale`, `buyer`, `earnings`. The same transaction is an `order` to one party and a `sale` to the other, consistently. Etsy does not use a neutral term for either.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to whichever audience the segment is set to; `we`/`us`/`our` for Etsy as a visible actor — "so Etsy can help you", "we'll let you and the seller know", "**Etsy will work with you and the seller**", "We recommend that you try to locate the package". Etsy positions itself grammatically *between* the two parties ("with you and the seller"), never above them.

**Register.** Warm, plain, contraction-heavy (`you'll`, `don't`, `isn't`, `can't`, `we've`). Occasional deliberate informality in headings — `Have a question? Well, we've got some answers.` · `Read our wonderfully weird story` · `Your best spooky season yet starts here`. **The tone flattens completely inside case and protection documentation** — the $250 cap, the force-majeure list and the chargeback lock-out are written in flat declarative prose with no softening. Same gradient as Wise: colloquial where stakes are low, flat where money is at risk.

**No exclamation marks** in any harvested help copy. **No `Oops!`**. The single most emotionally loaded moment — the case form's free-text box — is labelled `Let us know what went wrong`, which is calm and blameless.

**Numbers as trust devices** `[observed]`: `1.8 million sellers` ("We're committed to helping our 1.8 million sellers thrive") · "millions of shoppers spend billions each year" · "$4 billion in income for small businesses" (2020) · `net zero emissions by 2030` · `250M+` (n/a). Note the seller page prefers **vague plurals** ("millions", "billions") where the marketplace-home impact block prefers **specific figures with a year attached**. Two different credibility strategies on one domain.

**Impact claims are dated and scoped** `[observed]`: "Your purchases on Etsy in 2020 generated nearly $4 billion in income for small businesses." — a six-year-old figure still on the live page at harvest, which is itself a finding (stale proof point).

**Accessibility content** `[observed]`

- `Skip to content` (help centre) and `Skip to Content` (marketplace) — **two capitalisations across two domains**.
- `Take full advantage of our site features by enabling JavaScript.` — the no-JS fallback message, present on every marketplace page. A single sentence, no apology, no instruction on *how* to enable it.
- Alt text on the marketplace home is descriptive and scene-level where it carries meaning: `Ghost frames decorating craft kit` · `Add some spook to your stoop` · `Linen Spotlight` · `Modern Farmhouse`. Several merchandising tiles carry alt text identical to the adjacent visible link text, which would be read twice.
- Help-centre category illustrations carry **empty or asset-ID-only alt** (`![](…theming_assets/01JZKB5J6BTAKGCX58V6SVFPYJ)`) — decorative, so empty alt is correct, but the image URL is being surfaced in the extraction rather than an `alt=""`, which suggests the attribute may be absent rather than empty. Flagged as suspected, not confirmed.
- **No public accessibility statement was found.** There is no `Accessibility` link in the marketplace footer, the help-centre footer, or `Our House Rules`. `[absent]`
- Language switcher offers 12 locales including five English variants (`English (United States)`, `English (United Kingdom)`, `English (India)`), and the help URLs localise the *category slugs* too — e.g. `Order Issues & Returns` is `Order Issues` in en-GB and `Problem med beställningar och returer` in Swedish. The en-US and en-GB category names genuinely differ ("& Returns" present in US, absent in GB), which means the two English variants have diverged in IA, not just spelling.

**Negative findings, recorded honestly**

- **`Get help with an order` rendered twice, adjacently, with identical labels** and different destinations (`/your/purchases` vs `/your/purchases/select_order`) on the help-centre hero. The same duplication repeats as `Help with an order` in the footer routing block.
- **`Help with Order` vs `Help with order`** — the same in-product button quoted with two capitalisations across articles, sometimes within one article.
- **`Send help request` (web) vs `Submit help request` (app)** for the identical action.
- **`Track Package` vs `Track your package`** — two labels for the tracking CTA depending on surface.
- **Four variants of the shop-creation CTA** on `/sell`: `Get started` · `Open your Etsy Shop` · `Open your Etsy shop` · `Start selling today`.
- **`Est. Delivery` vs `Estimated delivery:`** documented as both appearing in the app for one field.
- **Grammatical fault in two status definitions**: "the seller has completed the order on Etsy **and is on its way**" — subject mismatch, in `Shipped` and `In Transit`.
- **A stale proof point** (2020 income figure) on the live 2026 marketplace home.
- **The `/sell` page renders the `One-time shop set up fee` block twice**, consecutively and identically.
- **`Behavior we prohibit on Etsy`** used as the scope line for two different policies in one list.
- No public accessibility statement.

---

## Transferable patterns

1. **Declare the audience in the URL and keep one help domain.** `?segment=shopping` / `?segment=selling` with a persistent toggle lets a two-sided product keep cross-links while running two registers. Every in-article link carries the segment forward. Directly applicable to any PayPal surface serving both consumer and merchant from one help estate.
2. **The `Quick answer` block, reused verbatim across every article in a cluster.** Same 40-word conditional, same button, top of four different pages. A user who lands anywhere in the cluster gets the answer before the prose. Condition: only works if the answer is genuinely identical — the moment it needs a variant, the reuse breaks.
3. **Describe one programme from inside each audience's grievance.** The four Purchase Protection conditions have the *item* as grammatical subject for buyers and the *buyer* as subject for sellers, and the seller version adds a fifth case ("a buyer claims it does not") that the buyer version cannot contain. Same programme, two honest framings.
4. **Design the "too early" state and give it an absolute date.** The blocked-escalation callout shows both when the window opens and when it closes, in one callout, in the `Still need help?` container. This is the highest-value recovery pattern in the file for dispute and chargeback flows.
5. **Ask for the desired resolution in the complaint form.** "let them know why you're reaching out and what your desired resolution would be" — coaching the complainant to state their outcome raises first-contact resolution. Pure microcopy intervention.
6. **Define the ambiguous status honestly.** `Not Shipped` is documented as meaning either *not shipped* or *shipped-but-not-updated*. Naming the unreliability inside the definition is cheaper than renaming the state and more honest than leaving it.
7. **`Did this resolve the issue?` with an "over-writing" failure option.** Outcome-framed rather than sentiment-framed, and the four reasons include `There was too much information here` — the diagnostic almost nobody collects.
8. **Recovery for the social failure, not just the financial one.** The printable "something special is on the way" card addresses the gift-arriving-late embarrassment with no refund attached. Worth considering wherever a payment failure has a social cost (split bills, gifts, shared expenses).

## Caveats & gaps

- **Policy full texts not opened.** `Buyer Policy`, `Cases Policy`, `Community Policy`, `Sanctions Policy` and `Off-Platform Transactions` were captured as titles and scope lines from the policy index only. The canonical Purchase Protection policy URL (`/legal/policy/etsy-purchase-protection-program/1030698493118`) **redirected to `/legal?archived=true`** and its text was not retrieved; the programme wording in this file comes from the two help-centre articles, which are secondary.
- **All in-product UI is `[documented]`.** Status names, button labels, field labels and callout copy come from help-article prose describing the signed-in experience. Marked as such throughout.
- **The marketplace home is client-rendered.** Listing cards, prices, review counts, badges (`Etsy's Pick`, `Bestseller`, `Star Seller` — none of which were observed) and the search experience are not in server HTML. T5 and T8 are thin for this reason.
- **No listing page was harvested.** The product-detail page is where `Order today to get by`, stock scarcity copy and seller-policy disclosure actually render; those strings are `[documented]` from help articles rather than observed.
- **Etsy's own no-results string is `[absent]`** — the one recorded in T8 is a Zendesk/shared pattern observed on the eBay surface during the same session and is flagged as such rather than attributed to Etsy.
- **No accessibility statement found**, so T14's accessibility subsection is inference from markup rather than from a published commitment.
- **Seller finance, taxes and Offsite Ads** are named but unharvested; `Deposit Issues`, `Getting Paid` and `Fees & Billing` would materially deepen T10.
- Locale is en-US. The en-GB help centre demonstrably uses different category names (`Order Issues` vs `Order Issues & Returns`), so any claim in this file should be re-verified before use as UK precedent.

## Sources

1. https://www.etsy.com/
2. https://help.etsy.com/hc/en-us
3. https://help.etsy.com/hc/en-us/sections/360000067247-After-You-Purchase
4. https://help.etsy.com/hc/en-us/sections/360000066548-Order-Issues-Returns
5. https://help.etsy.com/hc/en-us/articles/115015521948-What-s-the-Status-of-My-Order
6. https://help.etsy.com/hc/en-us/articles/360020601674-What-is-an-Estimated-Delivery-Date
7. https://help.etsy.com/hc/en-us/articles/4402660818583-How-to-Get-Help-with-An-Order
8. https://help.etsy.com/hc/en-us/articles/5745586898199-How-to-Open-a-Case
9. https://help.etsy.com/hc/en-us/articles/7471925990807-Etsy-s-Purchase-Protection-Program
10. https://help.etsy.com/hc/en-us/articles/5850122619287-What-is-Etsy-s-Purchase-Protection-for-Sellers
11. https://help.etsy.com/hc/en-us/sections/360000066887-Manage-Orders
12. https://help.etsy.com/hc/en-us/sections/360000067027-Reviews-Cases
13. https://help.etsy.com/hc/en-us/sections/4410109121431-Setting-Up-Your-Shop
14. https://www.etsy.com/legal/section/buyers
15. https://www.etsy.com/sell
16. https://www.etsy.com/legal/policy/etsy-purchase-protection-program/1030698493118 *(redirected to /legal?archived=true)*
