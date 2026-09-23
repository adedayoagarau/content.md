# 078. Target

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Mass-market omnichannel retail (big-box store network + e-commerce + named fulfilment products + paid membership + third-party marketplace) |
| Primary URL | https://www.target.com/ |
| Corpus rank | 078 |
| Benchmark strength (source list) | Pickup and delivery status |
| Locale / market observed | en-US only (no market switcher; Alaska and Hawaii carry named exclusions) |
| Platform observed | Web (desktop), help centre, category landing pages. Target app copy captured only as quoted inside help articles |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for financial regulation. Visible regimes: CA Transparency in Supply Chains Act, CA Proposition 65, CA Abandoned Shopping Cart Retrieval, state recycling and mattress take-back laws, SNAP/EBT online purchasing rules, state and local single-use bag mandates, CPSC product recalls, NYC and CA per-delivery statutory fees |
| Harvest date | 2026-09-21 |
| Pages inspected | 17 reached; 5 URL guesses 404'd; 1 returned an empty body |
| Harvest completeness | Full for fulfilment, returns and Circle 360. Partial for accessibility — the statement is short and names no standard. `help.target.com/help/subcategoryarticle` returned zero bytes and is recorded as blocked. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help hub | https://www.target.com/help | Task-card grid; `Popular Pages` renders empty |
| Contact Us | https://www.target.com/help/contact-us | The cleanest help-category taxonomy on the site |
| Drive Up & Order Pickup (help) | https://www.target.com/help/articles/delivery-options/drive-up-order-pickup | 50 FAQs — the highest-value page in this file |
| Same Day Delivery (help) | https://www.target.com/help/articles/delivery-options/same-day-delivery | 24 FAQs, fee and window vocabulary |
| About Target Circle 360 (help) | https://www.target.com/help/articles/target-circle/about-target-circle-360 | 19 entries, membership mechanics |
| Returns (help) | https://www.target.com/help/articles/returns-exchanges/returns | 29 FAQs; the return-reason controlled list |
| Return policy (help) | https://www.target.com/help/articles/policies-guidelines/return-policy | A one-line redirect stub |
| Price Match Guarantee | https://www.target.com/help/articles/policies-guidelines/price-match-guarantee | 13 FAQs, refusal string |
| Accessibility | https://www.target.com/help/articles/compliances/accessibility | Aira, accessible self-checkout; no standard named |
| Target Return Policy (landing) | https://www.target.com/returns | Return-window tiles, method tabs |
| Order Pickup (category) | https://www.target.com/c/order-pickup/-/N-ng0a0 | `Or switch to Drive Up in the app.` |
| Drive Up (category) | https://www.target.com/c/drive-up/-/N-9d42z | Two three-step how-it-works sequences |
| Same Day Delivery (category) | https://www.target.com/c/same-day-delivery/-/N-bswkz | `You order / We shop / We deliver` |
| Drive Up, Pickup & Delivery hub | https://www.target.com/c/shipping-order-services/-/N-551st | The fulfilment marketing hub |
| Target Circle 360 (landing) | https://www.target.com/l/target-circle-360/-/N-2rguk | Benefit card naming, pricing footnotes |
| Single-FAQ article (hold period) | https://www.target.com/help/article/000062599 | A numeric-ID article form |
| Single-FAQ article (unclaimed order) | https://www.target.com/help/article/000062601 | |

**Blocked / not found**: `help.target.com/help/subcategoryarticle` returned an empty body. Five guessed URLs under `/help/articles/shipping-delivery/*` returned Target's 404 page — the real category slug is `delivery-options`, which the displayed name (`Delivery & Pickup`) does not predict.

---

## T1 Navigation & IA labels

**Global nav is fulfilment-first** `[observed]`: `Categories` · `Deals` · `Pickup & delivery`. Three items, and one of the three is a fulfilment method. For a retailer with twenty-plus merchandise categories, promoting *how you get it* to peer status with *what you buy* is the structural expression of Target's whole positioning.

Note the label reads `Pickup & delivery` but points at `/c/order-pickup/`, while the destination hub's H1 is `Drive Up, Pickup & Delivery` and the canonical URL is `/c/pickup-delivery/`. **Four names, one destination.**

**Footer `Services` group is the fulfilment product catalogue** `[observed]`

`Target Circle™` · `Target Circle™ Card` · `Target Circle 360™` · `Target App` · `Registry` · `Same Day Delivery` · `Order Pickup` · `Drive Up` · `Free 2-Day Shipping` · `Shipping & Delivery` · `More Services`

Five separately-named fulfilment products in one list. This is the artefact that puts Target in the corpus: `Order Pickup`, `Drive Up`, `Same Day Delivery` and `Free 2-Day Shipping` are not modes of a single "delivery" concept — they are products with their own landing pages, their own status vocabularies, their own hold windows and their own help articles.

**Help-centre category tree — 12 groups, each with a scope sentence** `[observed]`, from `/help/contact-us`. This is the cleanest taxonomy on the site:

| Category | Scope line (verbatim) |
|---|---|
| `Target.com order experience` | "Get help with your Target.com orders, including tracking, returns, and cancellations." |
| `Store experience` | "Find information about in-store services, returns, and store policies." |
| `Registries & lists` | "Manage your registries and shopping lists or find a registry to shop from." |
| `Target Circle™` | "Learn about Target Circle™ benefits, rewards, and FAQs." |
| `Target Circle™ Card` | "Get details about the Target Circle™ Card, including management and FAQs." |
| `Target Circle 360™` | "Explore the benefits and FAQs of Target Circle 360™." |
| `Target GiftCard` | "Find help with Target GiftCards, including balance checks and fraud prevention." |
| `Pharmacy & clinic` | "Access pharmacy and clinic services, including CVS Pharmacy and Minute Clinic." |
| `Product safety & quality` | "Learn about product recalls and safety resources." |
| `Corporate information` | "Find corporate information, including careers, news, and investor details." |
| `Accessibility & belonging` | "Explore how we create inclusive, accessible experiences for all." |
| `Security concerns` | "Report security concerns, including suspicious contacts or fraud." |

Two observations. The top-level split is **channel-based** (`Target.com order experience` vs `Store experience`) rather than task-based — a rare and honest admission that the two channels have genuinely different policies. And `Accessibility & belonging` as a customer-facing support category, sitting between corporate info and security, is unusual; most retailers file accessibility under legal.

**But this taxonomy does not match the URL taxonomy.** Help articles live at `/help/articles/<category-slug>/<subcategory-slug>` where the slugs are: `delivery-options`, `returns-exchanges`, `policies-guidelines`, `compliances`, `target-circle`, `news-safety`. The *breadcrumb* shows a third set of names again — `Delivery & Pickup: Drive Up & Order Pickup`, `Compliance: Accessibility`, `Policies & Guidelines: Return policy`. So `delivery-options` (URL) is `Delivery & Pickup` (breadcrumb) is `Target.com order experience` / `Store experience` (contact taxonomy). Three incompatible category systems in one help centre.

**Help hub is a task-card grid, label + description** `[observed]`

`Track my order` — `How to check your order status` · `Manage my account` — `Settings, preferences` · `Returns & receipts` — `Start a return or find a receipt` · `Price Match guarantee` — `Determine if you are Price Match eligible` · `Check my gift card balance` — `Use our self-service experience` · `View current promotions` — `See current special offers and deals` · `Create or manage a registry` — `Access your registries and/or wish lists` · `Manage Target Circle™ Card` — `Pay and manage` · `Product recalls` — `Search or view recent recalls`

The card labels are in the user's first person (`Track my order`, `Manage my account`, `Check my gift card balance`) while the descriptions are in the second or imperative. A consistent possessive-first pattern — and `Returns & receipts` is the only card that breaks it, using a noun pair instead.

## T2 Value proposition & headline patterns

**Section headings are user-benefit clauses, not feature names** `[observed]`, from the fulfilment hub:

`Order pickup or drive up: your choice` · `Same-day delivery, easier than ever` · `Your order, shipped home` · `Returns made easy` · `Get 90 days for returns`

The colon construction in the first (`: your choice`) is doing the work of an explainer — Target's core problem on this page is that it has two near-identical pickup products, and the heading resolves that by naming the difference as *agency* rather than as a feature comparison.

**Card headings are three-to-five-word imperatives or promises** `[observed]`

- `Get everything you need faster` — `Place your order now & we'll get it ready for pickup.`
- `Pick up & keep going` — `Order ahead & we'll have it waiting for you in store.`
- `Coffee on the go` — `Add a Starbucks treat to your order in the app & enjoy.`
- `Let us know you're on your way` — `Just tap to tell us in the app & we'll start prepping for a quicker Drive Up.`
- `Tell us the number of your parking space` — `so it's easier to find you & bring your order to your car.`
- `Order today, get it today` — `Start a free 14-day trial or pay $9.99 for same-day delivery of all your faves.`
- `Hand-picked for you` — `A Shipt shopper will select your items & text you if they have any questions.`
- `Delivered right to your door` — `Get your order on time, just as planned.`
- `Know when to expect your order` — `Check the product page, cart or checkout to find delivery eligibility & order-by times.`

Every body line uses `&` rather than "and" — a house style applied consistently across marketing surfaces and dropped entirely in help articles. Note `Tell us the number of your parking space` is a *heading* that is also an instruction the user will later perform in the app: the marketing page is teaching the interaction vocabulary before the user reaches it.

**A live typo in a heading** `[observed]`: `Change of plans, happen` — verbatim, comma included.

**Circle 360 hero is a possession claim** `[observed]`

> `The membership that unlocks the best of Target`
> `Get free, fast shipping1, same-day delivery2 & monthly freebies.`

Superscript footnote markers are inline in the running text (`shipping1`, `delivery2`) — the bounding is present but rendered as digits jammed against words.

**Returns landing leads with an emotion** `[observed]`: `Feel good about every purchase with fast, easy returns.` The headline is `Target Return Policy` — a policy document title above a reassurance sentence. The mismatch is deliberate: the SEO title and the human framing coexist.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start a return` | Returns landing, help articles | |
| `Start a Return` | Returns help article, quoted as the in-app control | **Casing differs from the landing-page CTA** |
| `Start your order` | Same Day Delivery card | |
| `Learn more` | Many | |
| `Learn how` | Order Pickup: `Or switch to Drive Up in the app. Learn how` | Shorter variant |
| `Learn more about Drive Up` | Drive Up page foot | Fully specific — links to the blocked host |
| `View return policy` / `View exception policy` | Returns landing | Paired |
| `Read all FAQs` | Returns landing | |
| `Explore benefits` | Returns landing, Circle 360 | |
| `Schedule a pickup` | Returns landing, large items | |
| `Visit dashboard` | Registry returns | |
| `View recent recalls` | Returns landing | |
| `Contact us` / `View our contact options` | Help hub, articles | Two labels, one destination |
| `Browse all help` | Help hub and every article | |
| `Sign up here` / `Join Now` | Circle 360 | Two labels, one action |
| `Sign in with Target Circle 360` | Shipt Marketplace handoff | Names both parties |
| `Download the App` | Returns landing | |
| `Add to cart` | Product grids | |
| `Report an issue` (web) / `Fix an issue` (app) | Same Day Delivery returns | **Two labels for one action, split by platform** |
| `Rate & tip your shopper` / `Rate & Tip` | Same Day Delivery | |
| `Print a gift receipt` | Returns | |
| `Was this information helpful?` / `Yes` / `No` | Foot of every help article | |
| `Have more questions?` | Foot of every help article | |
| `Skip to next aisle` | Category page section skip | **A skip link named in store language** |
| `skip to main content` / `skip to footer` | Top of DOM | |

**In-app controls quoted inside help and marketing copy** `[documented]` — this is where Target's fulfilment vocabulary actually lives:

`Switch to Drive Up` · `Switch to in-store pickup` · `I'm on my way` · `I'm here` · `Start a return` · `Drive Up return` · `Submit` · `Show pickup barcode` · `View barcode` · `Add` (pickup person) · `Edit` · `Remove` · `Send Invite` · `resend invitation` · `Deliver it` · `Pick it up` · `Don't substitute` · `Substitute with best available` · `Substitute with your pick` · `Text me` · `Choose for me`

**`Skip to next aisle` deserves its own note.** It is a page-section skip control on category pages, and Target has named it in the vocabulary of a physical store rather than the vocabulary of a document. It is the only place in this batch where an accessibility affordance has been given brand voice, and it works because the metaphor is literally true — the sections are merchandise aisles.

## T4 Onboarding & getting-started

Target ships **three separate three-step "how it works" sequences**, one per fulfilment product. Comparing them is the most instructive thing in this file, because the same company solved the same content problem three times with three different grammars.

**Same Day Delivery — alternating subject, two words per step** `[observed]`

1. `You order` — `Select same-day delivery on Target.com or the Target app & choose your delivery time at checkout.`
2. `We shop` — `A shopper will hand-select your order & text you with any questions.`
3. `We deliver` — `The order will be brought right to your door.`

Pronoun + verb, nothing else. The alternation (`You` / `We` / `We`) tells the user exactly how much work is theirs: one third. This is the tightest of the three and the most reusable.

**Drive Up pickup — compound instructions, ampersand-joined** `[observed]`

1. `Find items choose your store & shop` *(verbatim — the missing comma is in the source)*
2. `Switch to Drive Up & tell us you're coming`
3. `Tell us you're here & wait in your vehicle`

Each step bundles two actions. Steps 2 and 3 both begin with a **telling** verb, which is the key insight of the Drive Up interaction model: the user's job is not to do anything physical, it is to *signal*. The copy makes signalling the named action.

**Drive Up return — parallel structure to the pickup flow** `[observed]`

1. `Start your return in the Target app`
2. `Fill in the details of your return`
3. `Bring it back & we'll handle the rest`

And a second, four-step version inside the help article, written in a looser register:

1. `Put return items in your car.` — `The trunk is easiest, but you can pick a different place too.`
2. `Tell us you're on the way!` — `Use the app to give us a heads up that you're coming before you leave for the store.`
3. `Drive to the store.` — `Follow the instructions in the app for navigating to the store and parking.`
4. `Wait for a team member.` — `Once you arrive and say you're here, a team member will arrive shortly to complete your return.`

`The trunk is easiest, but you can pick a different place too.` is the standout line — it gives a recommendation and then immediately releases the user from it. A one-sentence default-plus-permission pattern.

**So Target has, for one product family: a two-word step grammar, a compound-ampersand grammar, a three-step return grammar, and a four-step return grammar with full-stop-terminated imperatives.** The variation is not random — the marketing pages compress, the help article expands — but the two return sequences describe the same journey with different step counts, which a user moving between surfaces would notice.

## T5 Form & field labels

**Substitution preferences — the richest controlled vocabulary on the site** `[documented]`

Pickup / Drive Up options: `Don't substitute` · `Substitute with best available` · `Substitute with your pick`
Same Day Delivery options: `Text me` (default) · `Choose for me` · `Don't substitute`
Field names: `Substitution Preferences` / `Substitution Preference` *(both forms live)*

Two different option sets for one concept, split by fulfilment method — and correctly so. In pickup, nobody can ask you in the moment, so the choice must be pre-declared (`Substitute with your pick`). In delivery, a human shopper is in the aisle with a phone, so `Text me` becomes available and is the default. **The option list is shaped by whether a human is present at decision time.** That is a genuinely well-reasoned design and the copy exposes it cleanly.

Note the register: `Choose for me` and `Text me` are written in the user's voice as instructions *to Target*, while `Substitute with best available` is written in Target's voice about its own process. Three options, two grammars.

**Bag preferences** `[documented]`: a checkout option named `Bag preferences`, described as declining Target bags and indicating you are bringing your own, framed as avoiding bag fees and reducing waste. The mechanic is disclosed: ten bags are pre-authorised and then adjusted to actual usage.

**Pickup-person fields** `[documented]`: `Pickup person` · `alternate pickup person` · `Shopping Partners` / `shopping partner` · `Linked accounts`

**Purchase-history toggle** `[documented]`: `Online` / `In-Store` — a two-state segmented control that governs which return flow you get. Named explicitly in both return step sequences: `From the toggle at the top of the page, select Online to view your orders.`

**Return-method tabs** `[observed]`, returns landing: `Drive Up` · `In-store` · `Mail-in`. Three tabs where the underlying products are named `Return with Drive Up`, `Return in store`, `Return by mail` in the card headings on the same page — tab labels compressed, card labels expanded.

**Return-reason list** — see T7; it is the most complete controlled vocabulary in this file.

## T6 Status & state language

**This is the reason Target is in the corpus.** Five fulfilment products, each with its own status vocabulary, readiness phrasing and hold rules.

**Named fulfilment options and methods** `[observed]` / `[documented]`

`Drive Up` · `Order Pickup` · `Drive Up & Order Pickup` · `Same Day Delivery` / `Same-day delivery` · `Ship to home` · `Free 2-Day Shipping` · `Free, fast shipping` · `Order Pickup Via Ship To Store` · `To-the-Door Delivery` · `Drop-off delivery` · `Drive Up with Starbucks` · `Pay per delivery` · `Shipt Marketplace` · `Return with Drive Up` / `Drive Up return` · `Return in store` · `Return by mail` · `Return pickup` · `Online Return Center` · `In-store` · `Mail-in`

**Order / pickup / delivery status and readiness phrases** `[documented]`

| Phrase (verbatim) | Role |
|---|---|
| `Ready for Pickup` | The formal status, capitalised: "when your order is in **Ready for Pickup** status" |
| `Ready for pickup` | Lower-case variant in the CarPlay section — **same state, two casings** |
| `your order is ready` / `ready for you to pick up` | Prose variants |
| `I'm on my way` | Pre-arrival signal, user-initiated |
| `I'm here` | Arrival signal, user-initiated |
| `Switch to Drive Up` / `Switch to in-store pickup` | Method-change controls, available only once ready |
| `being shopped` / `when your order is shopped` | Same Day Delivery in-progress state |
| `pickup window` · `hold period` · `hold window expiring` | The expiry concepts |
| `canceled automatically` | The terminal state for an unclaimed order |
| `Out of stock` / `unavailable` | Item-level failure |
| `delayed` / `if the delivery window changes` | Delivery failure |
| `declined` | Return-level failure |
| `Drive Up barcode` · `Order Pickup barcode` · `return barcode` · `Wallet barcode` | Four named barcodes for four flows |

**The `I'm on my way` / `I'm here` pair is the standout artefact in this file.** Target has taken two internal system events — "begin staging" and "dispatch runner" — and expressed them as **first-person sentences the customer says**. The user is not setting a status; they are speaking. That is why the marketing copy can say `Let us know you're on your way` and `Tell us you're here` and have those read as natural language rather than as UI instructions.

Note the register consistency: every surface that references these uses a *telling* verb. `Tell us you're coming` · `Let us know you're coming` · `Tell us you're on the way!` · `Tell us when you arrive` · `Let us know when you're on the way`. Five phrasings, one concept, all built on tell/let-know. The phrasing varies (which is a consistency problem) but the *verb family* never does (which is why it still coheres).

**Hold and readiness windows, by product** `[documented]`

| Rule (verbatim where quoted) | Product |
|---|---|
| `Your Drive Up or Order Pickup order will usually be ready for pickup within 2 hours after you place your order.` | Both pickup products; select stores up to 6 hours |
| `Most Drive Up and Order Pickup orders are held for three days.` | Both |
| `If you don't pick up your order within the store's hold period, it will be canceled automatically.` | Both |
| Fresh and frozen grocery held only until close of the next business day | Pickup, grocery |
| Starbucks Café items kept fresh 30 minutes after ordering, then discarded | Drive Up with Starbucks |
| Pickup window extendable by three more days, only before the initial window ends, never for fresh/frozen | Pickup |
| Drive Up returns stay open 7 days, or less if the item's own return policy expires sooner | Drive Up return |
| Shopping-partner invitations expire after 7 days | Shopping Partners |
| `Deliveries can be scheduled for a one-hour window.` | Same Day Delivery |
| Editable or cancellable `up to one hour before your chosen delivery window` | Same Day Delivery |
| Arrive within 30 minutes of confirming `I'm on my way` | Drive Up with Starbucks |

**Four different hold periods across one fulfilment family** (3 days / next business day close / 30 minutes / 7 days), each tied to a product characteristic rather than to a policy tier. Perishability drives the grocery rule; barista throughput drives the Starbucks rule. Target writes the rule *and* the reason together, which is what stops four numbers from reading as arbitrary.

**Return windows form a tiered ladder** `[observed]`, returns landing tiles:

`365 days for Target brand items with a receipt` · `90 days for most items sold by Target` · `30 days for most items` · `Get an extra 30 days when you have a membership or pay with`

That last tile is **truncated in the live page** — it ends on "pay with" with no object. A shipped copy defect on the highest-traffic policy page.

The help article adds the fuller ladder `[documented]`: 90 days standard · 30 days `Target Plus™` · 365 days / one year Owned Brand with receipt · +30 days for Circle Card and Circle 360 · 120 days for beauty with a Circle Card · 30 days electronics and entertainment · 14 days Apple® and Beats, and Order Pickup mobile phones · 90 days EBT · one year after the event date for registries, 90 days for wish lists.

**Refund timing by rail** `[documented]`: Target Circle Card up to 2 days · third-party card up to 5 days · Online Return Center 7–10 additional business days · Visa/Mastercard/Amex gift cards typically 7–10 days · bag refunds up to 5 business days.

## T7 Error, failure & recovery

**The 404 page is the best error copy in this file** `[observed]`

> H1: `Page not found`
> `We're sorry! This page is currently unavailable. Please try again later.`
> `Not finding what you need? Check out some of our popular help articles below.`
> `Popular Pages`

Three moves in three lines: apology, cause-neutral statement, recovery offer. But it is also **self-contradicting** — "currently unavailable, please try again later" is a temporary-outage message rendered on a permanent 404. Retrying later will not help a URL that does not exist. And the recovery offer fails: the `Popular Pages` heading renders **over an empty list**. A recovery path that promises articles and shows none.

Worse, the same `Popular Pages` empty heading also renders on the live help hub at `/help`. The empty state is not a 404 artefact; it is shipped on the front door of the help centre.

**Return-reason vocabulary — a complete, high-value controlled list** `[documented]`, split by whether shipping is refunded:

*Eligible for shipping refund*: `Damaged / Broken upon arrival` · `Not as pictured on website` · `Wrong item received` · `Recalled item` · `Not as described / Insufficient information on website` · `Item doesn't work` · `Arrived after estimated delivery date` · `Missing parts` · `Difficulties with assembly` · `Received empty package` · `Return item lost in transit` · `Free replacement request` · `Missing item or shipment` · `No reason provided` · `Poor quality` · `Undeliverable`

*Not eligible for shipping refund*: `Fabric doesn't meet expectations` · `Quality doesn't meet expectations` · `Wrong size` · `Not compatible with existing systems` · `Found lower price elsewhere` · `Ordered by mistake` · `Changed mind` · `Doesn't fit` · `Purchased multiple items with intent to return`

This list is worth studying closely. **The division is fault-based and Target publishes the division.** Reasons where Target or the carrier erred refund shipping; reasons where the customer changed their mind do not. Two reasons name the customer's own conduct without euphemism — `Ordered by mistake` and, most strikingly, `Purchased multiple items with intent to return`. A retailer offering the customer a reason code that describes bracketing behaviour is unusual; it means the system is asking the customer to self-identify an activity the retailer would rather discourage.

Note also `No reason provided` and `Poor quality` both sit in the shipping-refunded column — Target defaults ambiguity in the customer's favour.

Two near-duplicates live in the same list: `Wrong size` and `Doesn't fit`, both in the non-refunded column. A real taxonomy redundancy.

**Decline reasons are published verbatim** `[documented]`, from `Why was my return declined by the online return center?`

- `Your return was outside of the return window.`
- `The item appears worn or used.`
- `The item was opened.`
- `The item is final sale including items that are opened.`
- `The online return center wasn't able to locate the order number or other information needed to process the return.`
- `The item is not a Target.com item.`

Six plain sentences, each naming a single condition, all notified by email. Publishing the complete refusal set in advance is the honest counterpart to Nike's return-database disclosure.

**And the consequence of a declined return is stated without softening** `[documented]`, from `What happens if my online return is declined?`: Target may charge back a refund it has already issued, may not send a replacement, and **does not keep ineligible items**. Three unwelcome facts in three clauses.

**First-person failure titles** `[observed]`

- `What happens if I forgot my Drive Up return item(s)?` → items you brought are returned, the rest are canceled, and you can restart later if still eligible
- `Why was my Drive Up or Order Pickup item canceled?` → out of stock, payment issue, or the hold window expired
- `What happens if I don't pick up my Drive Up or Order Pickup order?` → canceled automatically
- `Why am I not able to use my shopping partner?` → the invitation expires after 7 days and shows as pending, expired or rejected
- `Why was I charged a different amount from the original total for my pickup or Same Day Delivery order?` → out-of-stock items, substitutions, special requests and added items can move the charge **up or down**

That last one is the strongest. It is the single highest-volume billing confusion in a substituted-fulfilment model, it has its own article, it is cross-posted into **both** the pickup and delivery help pages, and the answer explicitly allows for the charge going down — most such explanations only address the increase.

**Delay copy that names the operational cause** `[documented]`: `Why is my Same Day Delivery order delayed?` → high volume and shopper availability; Shipt sends an automated message if the window changes. Paired with a genuinely unusual entry: `Why is there a delay in getting help through to your guest services?` — Target has written a help article apologising for the wait to reach help. Meta, and honest.

**Price-match refusal string** `[observed]`: `If Target is not able to verify the lower price, we may decline the request.` Paired with an unusually firm evidence rule: the live price must be shown on the customer's mobile device and verified by a team member — `screenshots and pictures are not accepted`.

**Recall handling is a three-step imperative sequence** `[documented]`: `Stop using the product immediately.` · `Search for the recalled product on Target's product recall page.` · `Follow the directions listed in the Take Immediate Action section.` Safety-first ordering, with the named page section (`Take Immediate Action`) doing the routing.

## T8 Empty states

`[observed]` — one, and it is a defect:

> `Popular Pages`

The heading renders on both the help hub and the 404 page **with no child items**. On the 404 it breaks the promise made one line above it (`Check out some of our popular help articles below`). This is the mirror of the Wise exemplar's empty-query bug: an empty state caused by a data-population failure rather than by a written string, and therefore invisible to a copy review.

`See price in cart` `[observed]` — the merchandising unavailable-price string, used where a price cannot be displayed on the grid.

Genuine no-data states (empty cart, no orders, no registries) are behind authentication. `[absent]`

## T9 Notifications & system messages

**Order-status notification model is documented to the user** `[documented]`, from `How will I receive order status notifications for my Drive Up or Order Pickup item(s)?`: an automatic email when the order is ready, plus `Order Details` tracking in the app, plus opt-in push notifications with per-OS setup paths spelled out. Naming all three channels and telling the user how to switch the third on is good practice.

**Shopping-partner notification** `[documented]`: `How will my shopping partner know when my order is ready for them to pick up?` → email to their Target account address, plus in-app notification for Drive Up. Target has thought about notifying a **third party** to the transaction and written the article for it.

**Shopper-to-customer messaging is disclosed as part of the product** `[observed]`: `A shopper will hand-select your order & text you with any questions.` and `A Shipt shopper will select your items & text you if they have any questions.` The inbound SMS is positioned as a feature on the marketing page, before the user encounters it.

**SMS troubleshooting exposed** `[documented]`: `To troubleshoot automated messaging text START to 205-502-4104.` A raw keyword-and-shortcode instruction inside a help answer.

**Tier-change latency disclosed** `[documented]`, Circle 360 bonus mechanics and Circle Rewards expiry: `Target Circle Rewards expire one year from the date they are earned if not redeemed.` · `Trial memberships are not eligible.`

**Per-article feedback widget** `[observed]`: `Was this information helpful?` / `Yes` / `No`, then `Have more questions?` → `Browse all help`. Every article, same position.

## T10 Disclosures, legal & compliance

**Fees that exist because a jurisdiction requires them are named after the jurisdiction** `[observed]`

- `A CA Shipt Shopper Benefit Fee is charged on all Same Day Delivery orders in California.`
- `A NYC Operating Cost Fee is charged on all Same Day Delivery orders in New York City.`

This is the compliance-UX standout for Target. Rather than folding statutory costs into a generic "service fee", the fee carries the name of the law that caused it. The customer can tell, from the line item alone, that this is not Target's margin. **Transferable to any market-specific regulatory cost — interchange caps, FX levies, local taxes — where an unexplained line item generates disputes.**

**Bag-fee mechanics disclosed before the charge** `[documented]`: bag fees may apply per bag by local or state mandate; ten bags are pre-authorised and then adjusted down to actual usage; refunds typically take up to 5 business days. The pre-auth-then-adjust pattern is exactly the kind of thing that produces "why was I charged more?" tickets, and Target pre-empts it.

**Membership pricing is a matrix, disclosed in full** `[observed]`: free 14-day trial · `$99 a year ($8.25/month)` · `$10.99 a month` · `$49` per year with a Target Circle Card · `$4.99/month` for verified students and government-assistance recipients. Plus the renewal risk stated plainly: the rate reverts to `$10.99/month or $99/year` if eligibility lapses. And `Limit one per guest.`

Verified-audience labels: `Target Circle Card` · `Teachers` · `College Students` · `Military Members` · `Govt. Assistance Recipients`, under `Available to Target Circle members verified in a community below.` — note `community` rather than "category" or "segment".

**Cancellation route published with a phone number** `[observed]`: cancellation must complete before renewal, via the Membership section or by calling Guest Services at `1-800-591-3869`. Publishing the cancellation phone number on the acquisition page is a subscription-UX good practice and rare.

**Benefit exclusions attached to the benefit, not to a footer** `[observed]`: the `No rush returns` benefit (`Get an extra 30 days to return your items.4`) carries a footnote excluding Target Optical, non-returnable items, contract mobile phones and SNAP/EBT online purchases. The "no markups" claim carries its own exclusion of select alcohol retailers and items.

**Non-returnable categories named specifically** `[observed]`: `Certain items can't be returned, including gift cards, trading cards, digital downloads and open breast pumps.` A concrete four-item list rather than "certain items". Trading cards have a dated cutoff in the help article (not returnable since January 30, 2023) and breast pumps get a manufacturer-contact table instead of a refusal.

**Price-match terms** `[observed]`: `Price matches may be requested at time of purchase or within 14 days after purchase.` · rain checks valid `for the next 30-45 days (varies by state)` · `Price match of items sold by Target.com or prices through the Target app are not available in Alaska and Hawaii.` · `We reserve the right to deny purchase and limit quantities per guest.`

**Age and weight gates** `[documented]`: `You must be 21 years of age or older to purchase or consume alcohol`; `Items over 40 lbs.` excluded from Same Day Delivery; return pickup `typically reserved for items weighing more than 150 pounds`, with an 8-hour pickup window and a signature required from someone 18 or older unless To-the-Door Delivery.

**Restocking fee** `[documented]`: up to `$35` for phones — the only restocking charge named.

## T11 Help-centre architecture

Three-level: hub → category → article, with three parallel naming systems (see T1) and **two URL forms**: the slug form `/help/articles/<category>/<subcategory>` and a numeric form `/help/article/000062599` that renders a single FAQ as its own page.

The numeric form is an interesting content-ops artefact. `How long will a store hold my Drive Up or Order Pickup order?` exists both as FAQ #26 inside the 50-question Drive Up article **and** as a standalone page at `/help/article/000062599`, with the question as the H1. So Target maintains a granular FAQ inventory with stable IDs and composes topic pages from it. That is the right architecture — it means a search result or a support agent can deep-link a single answer — but it also means the same content is indexable twice.

**Article density is extreme.** `Drive Up & Order Pickup` carries **50 FAQs**; `Returns` carries 29; `Same Day Delivery` 24; `Price Match Guarantee` 13; `About Target Circle 360` 19. These are not article sets; they are single scrolling pages. The 50-question page covers, in one scroll: what the products are, how to order, discounts, bags, substitutions, charging, readiness, switching method, notifications, cancellation, holds, parking, Starbucks, receipts, four return topics, and twelve questions about the Shopping Partners feature.

**Twelve of fifty questions on the fulfilment page are about Shopping Partners** — a feature that lets you add up to ten other Target guests to share pickup activity. That ratio is a signal: a social-sharing feature grafted onto a fulfilment flow generates a disproportionate support load, and the help IA has absorbed it rather than giving it its own home.

**Sibling navigation is exposed at the foot of every article**, which is how the category taxonomy is actually discoverable. Under `Delivery & Pickup`: `Drive Up & Order Pickup` · `Target Circle 360` · `Same Day Delivery` · `Ship to home`. Under `Returns & Exchanges`: `Returns` · `Replacements & exchanges`. Under `Policies & Guidelines`: `Coupon policy` · `Corporate responsibility` · `Price Match Guarantee` · `Solicitation policy` · `Product reviews` · `Target Plus™ Reviews`. Under `Compliance`: nine state-law and safety topics.

**A stub article worth recording** `[observed]`: `/help/articles/policies-guidelines/return-policy` has the H1 `Return policy`, one FAQ (`Where can I find information about returns?`) and a single line pointing at the real Returns page via `visit our Returns help page`. A redirect implemented as content, presumably to preserve an inbound link.

## T12 FAQs

FAQ *is* the article format here — Target does not write prose help articles, it writes question collections. Selected verbatim questions, chosen for what they reveal:

**The fulfilment page's most revealing questions** `[observed]`

| Question (verbatim) |
|---|
| What is Drive Up? |
| What is Order Pickup? |
| Can I place a Drive Up order on Target.com? |
| Can I switch between Drive Up and Order Pickup after the order is placed? |
| What do I need to bring to pick up my Order Pickup order? |
| What do I need for my Drive Up order? |
| How will I receive order status notifications for my Drive Up or Order Pickup item(s)? |
| Why was I charged a different amount from the original total for my pickup or Same Day Delivery order? |
| How long will a store hold my Drive Up or Order Pickup order? |
| What happens if I don't pick up my Drive Up or Order Pickup order? |
| Where do I park for Drive Up? |
| Why do I have to complete my return with Drive Up within 7 days? |
| Why do I need the item's tag, sticker or barcode for a return with Drive Up? |
| What happens if I forgot my Drive Up return item(s)? |
| What is a shopping partner? |
| Can my shopping partner view my order history or account information? |

Two structural observations.

**Questions 1 and 2 are `What is X?` for two products that sit side by side.** Target has to define both, in sequence, because the difference is genuinely non-obvious — and question 3 (`Can I place a Drive Up order on Target.com?` → no, app only) and question 19 (`Can I switch…?` → yes, once ready) exist purely to resolve the confusion the pairing creates. **Four of the first twenty questions are load-bearing for one naming decision.** That is the cost of shipping two similarly-named fulfilment products, paid in help content.

**`Where do I park for Drive Up?`** is the question most retailers would never write, because it is about the physical world rather than the product. It is also exactly what a first-time user needs. The answer names the artefact: the designated `Drive Up parking signs` near the front of the store.

**A privacy question inside a convenience feature** `[observed]`: `Can my shopping partner view my order history or account information?` → no to both order history and payment information. Anticipating the privacy objection to a sharing feature, and answering it with two flat noes, inside the feature's own FAQ.

**Same Day Delivery — an empty-state question** `[observed]`: `How can I place an order if there are no available delivery windows?` The answer is genuinely thin (check frequently), but writing the question at all acknowledges a state the product can enter.

**A near-duplicate spelling in a live question** `[observed]`: `When will my Drive Up or Order Pick Up order be ready for me to pick up?` — `Order Pick Up` (three words) for a product named `Order Pickup` (two), in the question's own title.

**Question ordering is not topical.** On the 50-question page, the Starbucks questions (28–31) sit between parking (27) and receipts (32); substitutions (13–16) are split from the related charging question (11) by two unrelated entries. The page reads as accreted rather than structured — the cost of a single page absorbing five years of feature launches.

## T13 Terminology & glossary

| Term | Target's usage | The alternative it rejected |
|---|---|---|
| `guest` / `guests` | The customer, in all policy and benefit prose | "customer", "shopper", "member" |
| `Guest Services` | The in-store and phone support function | "Customer Service" |
| `team member` | Store staff | "associate", "employee" |
| `Drive Up` | Curbside pickup to vehicle, app-only | "curbside", "Buy Online Pick Up In Store" |
| `Order Pickup` | In-store collection at a desk | "click and collect", "BOPIS" |
| `Same Day Delivery` | Shipt-fulfilled delivery from a local store | "instant delivery", "rapid delivery" |
| `Ship to home` | Parcel shipping | "delivery", "standard shipping" |
| `Target Run` | The shared-shopping activity a Shopping Partner joins | "shopping trip" |
| `Shopping Partners` / `shopping partner` | Up to ten linked guests | "household", "family account" |
| `alternate pickup person` | A one-off collector | "authorised person" |
| `Monthly freebies` | Circle 360 monthly gift | "monthly perk", "reward" |
| `No rush returns` / `no-rush returns` | The +30-day return extension | "extended returns" |
| `merchandise return card` / `MRC` | Store credit for non-receipted returns | "gift card", "store credit" |
| `Target Wallet` | In-app payment and receipt store | |
| `My Target` | The account entry point | "My Account" |
| `Target Plus™` | The third-party marketplace | "Marketplace" |
| `Target Owned Brand` | Private label, with a 365-day return window | "own brand", "private label" |
| `rain check` | A promise to honour a price on an out-of-stock item | |
| `Expect More. Pay Less.®` | The brand promise, quoted inside the accessibility statement | |
| `Aira` | Third-party visual-interpreter service, named | |
| `EFW` | A delivery carrier, used as a bare acronym in two FAQ titles | |

**`guest` is the term to study, and it is used more carefully than it first appears.** Target uses `guest` in *policy and benefit prose* — `We believe all guests should be able to easily shop Target`, `Limit one per guest.`, `All Target guests are eligible to add a shopping partner.` — but **never addresses the reader as "guest" in second person**. The UI says "you" throughout. `Guest Services` is the only guest-formed label a customer ever sees.

So `guest` functions as the *third-person noun for the class of customer*, not as a term of address. That distinction is what keeps it from feeling twee. Casing is inconsistent (`Guest Services` vs `guest services` vs `Guest Service counter`), and one FAQ title uses it in lower case in a question heading: `Why is there a delay in getting help through to your guest services?`

**Cross-corpus note.** `guest` means three incompatible things across this batch: at Target it means *every customer*; at Nike it means *an unauthenticated purchaser, peer to a Member*; at ASOS it means *an unauthenticated purchaser who pays £3.95 to return*. Three retailers, one word, three referents — a useful caution for anyone importing the term.

**Casing and hyphenation drift, recorded** `[observed]`: `Ready for Pickup` / `Ready for pickup` · `Same Day Delivery` / `Same-day delivery` · `Order Pickup` / `Order Pick Up` · `Start a return` / `Start a Return` · `Substitution Preferences` / `Substitution Preference` · `No rush returns` / `no-rush returns` · `Report an issue` (web) / `Fix an issue` (app).

## T14 Voice, tone & accessibility

**Person and register.** Second person for the customer, first-person plural for Target, and — distinctively — **first person singular for the customer's own signals**: `I'm on my way`, `I'm here`. Three grammatical persons in one flow, each assigned a role: *you* for instructions, *we* for Target's actions, *I* for the customer's declarations.

**Ampersand is a surface marker.** `&` throughout marketing and category copy (`Order ahead & we'll have it waiting for you in store.`); "and" throughout help articles. The split is clean enough to be a rule, though it means the same concept renders two ways across the site.

**Exclamation marks are rationed to reassurance.** `Tell us you're on the way!` in the return steps; absent from every policy, fee and decline string. The tone flattens as the stakes rise, consistently.

**Permission-giving is a recurring move.** `The trunk is easiest, but you can pick a different place too.` · `you can pick a different place` · `Don't worry, you'll still be part of ASOS.WORLD` has its Target analogue in the Circle 360 tier answers. The pattern is: state the recommended path, then explicitly release the user from it.

**Accessibility content** `[observed]`

- `skip to main content` and `skip to footer` — **two skip links**, both present at the top of the DOM
- `Skip to next aisle` — section-skip controls on category pages, named in store vocabulary
- A customer-facing `Accessibility` help article, linked from the global footer, under the `Compliance` category
- A dedicated support category in the contact taxonomy: `Accessibility & belonging`

**Statement substance** (summarised): a commitment framed as `accessibility, diversity and inclusion`; the belief that all guests should be able to shop Target on Target.com, in the apps and across other digital properties; explicit naming of the assistive technologies in scope — `a screen reader, a magnifier, voice recognition software or switch technology`; the brand promise (`Expect More. Pay Less.®`) invoked as the reason. Two concrete programmes are described: free **Aira** visual-interpreter access, in store (activated automatically when the app is opened in a store) and free for online shopping on target.com; and an accessible self-checkout kiosk, labelled `Coming soon`, described as the first in retail, showcased at the National Federation of the Blind convention, with rollout over the next year and activation via wired earbuds with a `standard 3.5 MM headphone connector` in a tactile keypad on the left of the screen. Feedback route: `Visit target.com/accessibility for more information or to share your feedback.`

**An important negative finding, stated plainly** `[observed]`: **no WCAG version, no ADA reference, no Section 508, no VPAT, no accessibility phone number and no accessibility email appear anywhere on this page.** The only named external entities are Aira and the NFB. The statement is a *programme announcement* rather than a conformance statement.

This is worth holding against the batch. Zalando names WCAG 2.2 AA and EN 301 549 v3.2.1, publishes an external audit date, and enumerates six open defect classes. Nike names WCAG 2.1 AA and gives a direct mailto. Target describes two initiatives and gives a URL. **The most operationally impressive accessibility work in the batch (a physical accessible kiosk, funded interpreter access) is paired with the least accountable statement.** The content decision — lead with what we built rather than what we conform to — is defensible as brand communication and weak as an accessibility statement, because a user cannot tell from it what to expect or how to escalate.

**Negative findings, recorded honestly**

- `Popular Pages` renders empty on both the help hub and the 404 page, breaking the 404's own recovery promise
- The returns-landing tile is truncated: `Get an extra 30 days when you have a membership or pay with` — no object
- `Change of plans, happen` — live typo in a card heading
- `When will my Drive Up or Order Pick Up order be ready…` — product name misspelt in its own FAQ title
- `Ready for Pickup` / `Ready for pickup` casing drift for one status
- `Report an issue` vs `Fix an issue` for one action, split by platform, with no explanation
- `Learn more about Drive Up` links to `help.target.com/help/subcategoryarticle`, a **different host** that returned an empty body
- The help-centre URL slug (`delivery-options`) does not match the breadcrumb name (`Delivery & Pickup`) or the contact taxonomy (`Target.com order experience` / `Store experience`) — three category systems
- `EFW` used as a bare, unexpanded acronym in two customer-facing FAQ titles
- Two questions in the returns list describe the same condition: `Wrong size` and `Doesn't fit`

---

## Transferable patterns

1. **Express system events as first-person customer speech.** `I'm on my way` and `I'm here` turn two backend triggers into sentences the user says. Everything downstream — `Let us know you're coming`, `Tell us when you arrive` — then reads as natural language instead of UI instruction. Applies to any flow where the user's action is a *signal* rather than a task: appointment arrival, delivery readiness, queue check-in.
2. **Name a statutory fee after the statute.** `CA Shipt Shopper Benefit Fee`, `NYC Operating Cost Fee`. The customer can tell from the line item alone that this is not the merchant's margin. Directly applicable to market-specific payment fees and levies.
3. **Shape an option list around whether a human is present at decision time.** Pickup gets `Substitute with your pick`; delivery gets `Text me` as the default, because a shopper is in the aisle with a phone. The same concept, two option sets, one honest reason.
4. **Publish the complete refusal set.** Six plain decline reasons, in advance, plus the consequences (chargeback of an issued refund, no replacement, item not retained). Users who know the rules dispute less than users who discover them.
5. **Write the rule and the reason in the same sentence.** Four different hold periods (3 days / next business day / 30 minutes / 7 days) read as arbitrary until each is tied to perishability, barista throughput or an item-level policy. Never ship a number without its cause.
6. **Give the physical-world question a help article.** `Where do I park for Drive Up?` is not a product question and it is the one a first-timer actually has. Any flow that crosses into physical space needs its wayfinding written down.
7. **Two similarly-named products cost you four FAQs each.** `Drive Up` vs `Order Pickup` requires two `What is X?` articles plus a "can I do X on the website?" plus a "can I switch?" That is the measurable content debt of a naming decision — worth quantifying before shipping the second product, not after.
8. **Negative lesson: accessibility programme ≠ accessibility statement.** Target's actual accessibility work is the strongest in this batch and its published statement is the least accountable, naming no standard, no conformance level and no escalation contact. Announce the programme *and* state the conformance target.

## Caveats & gaps

- **`help.target.com/help/subcategoryarticle` returned an empty body** and is recorded as blocked. It is the destination of the `Learn more about Drive Up` CTA, so one advertised route into the fulfilment help was unreachable.
- **Five guessed URLs 404'd** before the real category slug (`delivery-options`) was discovered by following a link. The 404 body is itself recorded as evidence in T7.
- **All in-app copy is `[documented]`, not observed.** `I'm on my way`, `I'm here`, `Switch to Drive Up`, the substitution option labels and the purchase-history toggle are all quoted inside help articles describing the Target app. No app surface was inspected.
- **No authenticated states.** Order status screens, `Order Details`, purchase history, the Circle 360 dashboard, the returns flow and the `Popular Pages` module's intended contents are all unobserved.
- **Empty states are effectively unharvestable** beyond the two defects recorded; T8 is honestly thin.
- **Roughly 21 numeric single-FAQ articles were identified but not opened**, including `000061980` (full return policy) and `000061982` (return exceptions). The return-exception detail in T6 comes from the composed `Returns` article, not from those.
- **`/help/articles/delivery-options/ship-to-home` and `/help/articles/delivery-options/shipt` were link-verified but not fetched.** Ship-to-home status vocabulary is therefore under-sampled relative to pickup and same-day.
- **US-only.** No locale variation exists to record; Alaska and Hawaii exclusions are noted where seen.
- Most pages in this file were captured through a delegated fetch pass using the same public `web_fetch` route; strings are verbatim as returned but were not re-verified against a second fetch.

## Sources

1. https://www.target.com/help
2. https://www.target.com/help/contact-us
3. https://www.target.com/help/articles/delivery-options/drive-up-order-pickup
4. https://www.target.com/help/articles/delivery-options/same-day-delivery
5. https://www.target.com/help/articles/target-circle/about-target-circle-360
6. https://www.target.com/help/articles/returns-exchanges/returns
7. https://www.target.com/help/articles/policies-guidelines/return-policy
8. https://www.target.com/help/articles/policies-guidelines/price-match-guarantee
9. https://www.target.com/help/articles/compliances/accessibility
10. https://www.target.com/returns
11. https://www.target.com/c/order-pickup/-/N-ng0a0
12. https://www.target.com/c/drive-up/-/N-9d42z
13. https://www.target.com/c/same-day-delivery/-/N-bswkz
14. https://www.target.com/c/shipping-order-services/-/N-551st
15. https://www.target.com/l/target-circle-360/-/N-2rguk
16. https://www.target.com/help/article/000062599
17. https://www.target.com/help/article/000062601
