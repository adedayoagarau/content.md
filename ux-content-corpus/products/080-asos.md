# 080. ASOS

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | UK/global online fashion retail (own-brand + multi-brand + marketplace "Brand Partners", app-first, subscription delivery, behaviour-tiered loyalty) |
| Primary URL | https://www.asos.com/ |
| Corpus rank | 080 |
| Benchmark strength (source list) | Sizing, delivery, and returns |
| Locale / market observed | en-GB (`asos.com` UK experience; Channel Islands, Isle of Man and Northern Ireland handled as named sub-markets) |
| Platform observed | Web (desktop), Customer Care help centre. App copy captured only as quoted inside help articles |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | UK consumer law is explicit throughout: The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 is named in five places and has its own help article; statutory rights are reserved in the returns and fair-use policies; WEEE recycling policy; hygiene-seal restrictions on returns; third-party credit via Klarna, Clearpay, PayPal Pay in 3 and a Capital One-issued ASOS card |
| Harvest date | 2026-09-21 |
| Pages inspected | 16 |
| Harvest completeness | Full for returns, refunds, delivery, order issues and sizing — ASOS's Customer Care centre is server-rendered end to end, including full answer bodies. Partial for the storefront: product-detail pages and the Fit Assistant UI were not opened, so size-chart tables and fit-questionnaire strings are `[documented]` only. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Storefront home | https://www.asos.com/ | Category nav only; product grids client-rendered |
| Customer Care hub | https://www.asos.com/customer-care/ | 7 topics × 3 links, Popular FAQs |
| Returns & Refunds (index) | https://www.asos.com/customer-care/returns-refunds/ | 8 FAQs; the `Oops!` error block |
| Returns Policy | https://www.asos.com/customer-care/returns-refunds/what-is-your-returns-policy/ | 28-day window, condition rules, exchanges |
| How to return from the UK | https://www.asos.com/customer-care/returns-refunds/how-do-i-return-something-to-you-from-the-uk/ | Return reasons, QR mechanics, carrier limits |
| How will I get my refund | https://www.asos.com/customer-care/returns-refunds/how-will-i-get-my-refund/ | Refund routing by payment rail |
| Fair Use Policy | https://www.asos.com/customer-care/returns-refunds/what-is-your-fair-use-policy/ | **Return Rate thresholds, published** |
| Delivery (index) | https://www.asos.com/customer-care/delivery/ | 8 FAQs |
| How ASOS delivery works | https://www.asos.com/customer-care/delivery/how-does-the-asos-delivery-service-work/ | Nine named delivery options |
| Where is my order | https://www.asos.com/customer-care/delivery/what-should-i-do-if-my-order-hasnt-been-delivered-yet/ | **`It's Ordered` — the only named order state** |
| Order issues (index) | https://www.asos.com/customer-care/order-issues/ | 4 FAQs |
| Something's wrong with my item | https://www.asos.com/customer-care/order-issues/somethings-wrong-with-my-item/ | Faulty / incorrect / wrong-size paths |
| Amend or cancel order | https://www.asos.com/customer-care/order-issues/can-i-amend-or-cancel-my-order/ | Cancel windows by delivery method |
| Product & Stock (index) | https://www.asos.com/customer-care/product-stock/ | 14 FAQs; pagination-count bug |
| Help me find the right size | https://www.asos.com/customer-care/product-stock/can-you-help-me-find-the-right-size/ | **The three-step sizing model** |
| ASOS.WORLD tiers & benefits | https://www.asos.com/customer-care/asos-world/asosworld-tiers-and-benefits/ | Four tiers, return-rate gate |

---

## T1 Navigation & IA labels

**Help centre is called `Customer Care`, not Help** `[observed]` — and the URL says so too (`/customer-care/`). A softer noun than "Support" or "Help Centre", and it sets the register for everything inside.

**Seven FAQ topics, each with three surfaced questions plus `View All`** `[observed]`

| Topic | The three surfaced questions |
|---|---|
| `Delivery` | `Where's my order?` · `Delivery Options` · `Deliveries with ASOS Brand Partners` |
| `Returns & Refunds` | `Returns Policy` · `How do I return?` · `Returns with ASOS Brand Partners` |
| `Order issues` | `Amend or cancel order` · `Something's wrong with my item` · `Missing Item` |
| `Product & Stock` | `Help with sizing` · `Save for later` · `Sale terms` |
| `Payment, Promos & Gift Vouchers` | `Payment Types` · `Promo codes` · `Gift Vouchers` |
| `Technical` | `ASOS Account` · `ASOS App` · `ASOS Notifications` |
| `ASOS.WORLD` | `ASOS.WORLD` · `Tiers and Benefits` · `Shopping and Returns` |

**The surfaced link labels are not the article titles.** `Where's my order?` links to an article titled `Where is my order?`; `How do I return?` links to `How do I return something to you from the UK?`; `Help with sizing` links to `Can you help me find the right size?`. ASOS shortens for the hub and expands for the page — a deliberate two-length system, though it means the apostrophised `Where's` and the full `Where is` are both live for one destination.

**Two of seven topics are named after the marketplace model.** `Deliveries with ASOS Brand Partners` and `Returns with ASOS Brand Partners` occupy one of the three precious slots in both Delivery and Returns. The single biggest source of confusion on the site — that some items are shipped and returned by third parties — is given top-billing in both places rather than buried in an exceptions paragraph.

**`Popular FAQs` — three, and all three are the same anxiety** `[observed]`

`What is your Returns Policy?` · `How do I return something to you from the UK?` · `Where is my order?`

Two returns questions and one tracking question. For a fashion retailer with a ~50% return norm, that ranking is the business model showing through the IA.

**Footer legal trio** `[observed]`: `Privacy & Cookies` · `Ts&Cs` · `Accessibility`. `Ts&Cs` rather than "Terms & Conditions" — the brand's compression habit applied to a legal label.

**Category nav includes fit as a shopping axis** `[observed]`: `Curve & Plus Size` (women), `Plus Size` (men) sit in the primary category navigation rather than inside a size filter.

**Every article carries the same three footers** `[observed]`: `Related FAQs` (one or two links), the full `FAQ topics` list, `Need to Search for it?`, and `Need to get in touch?` → `Contact us now`. Lateral navigation is available from every leaf, so the IA is flat in practice.

## T2 Value proposition & headline patterns

ASOS's help centre does almost no value-proposition work; its headlines are questions. What is interesting is the **register of the answer openers**, which carry the brand voice that the titles do not.

**Answers open by validating the feeling, then state the rule** `[observed]`

- `We get it - sometimes something just doesn't work for you and you want your money back.` (opening the Returns Policy)
- `Don't worry – it can take a few days for tracking information to appear.` (no tracking updates)
- `We're really quick at preparing your order, so we can't make any changes once you've placed it.` (amend/cancel)
- `Hygiene and our customers' safety is super important, so certain items can't be returned for refunds`
- `We're not responsible for any items that are returned to us by mistake (it happens!).`

The construction is consistent: **empathy clause, then the constraint, joined by a connective.** `We're really quick at preparing your order, so we can't make any changes` is the model — the limitation is presented as a *consequence of a strength*. It is a rhetorical move, and it is doing real work, because the underlying message ("you cannot change your order at all") is one of the least popular sentences in e-commerce.

**Section headings inside articles are the user's next question** `[observed]`, from the returns articles:

`The basics` · `After that?` · `Original Condition` · `Responsibility` · `Want to exchange an item?` · `Returning a faulty or incorrect item?` · `Did you order an ASOS Brand Partner product?` · `Packing your return` · `Dropping off your return` · `Cancelling your return` · `Waiting for your refund`

Five of eleven are gerunds naming the user's activity (`Packing`, `Dropping off`, `Cancelling`, `Waiting`, `Returning`); three are questions; three are nouns. `Waiting for your refund` is the standout — naming *waiting* as a stage of the process, with its own heading and its own timings, rather than treating the refund as instantaneous once the parcel is scanned.

**`After that?` as a heading** is a two-word transition that carries the whole consequence of missing the window. Minimal, and it works because it sits directly under the paragraph that states the window.

## T3 CTA inventory

| CTA / control (verbatim) | Context | Notes |
|---|---|---|
| `Contact us now` | Foot of every article, under `Need to get in touch?` | Deliberately last |
| `Need to Search for it?` | Foot of every article | A search prompt phrased as a question |
| `View All` | Each hub topic | |
| `RETRY` | Error block (see T7/T8) | All caps |
| `Create Return` | Quoted in-app/web control | On the order in `My Orders` |
| `Place Return` | Quoted control | The submit step |
| `Cancel/View` | Quoted control | **One button, two actions, slash-joined** |
| `Track parcel` | Quoted control | In `My Orders` |
| `My Account` · `My Orders` · `My Returns` | Named account areas | |
| `Faulty` · `Faulty/Broken` | Return-reason values | **Two labels for one reason, across two articles** |
| `Incorrect Item Received` | Return-reason value | |
| `Too big/Too long` · `Too small/Too short` | Return-reason values | The two that unlock exchange |
| `Fastest Delivery` | Checkout option during busy periods | |
| `START` (text to 205-502-4104) | SMS troubleshooting keyword | |
| `Get App` · `View in App` | App banner | |
| `Sign in to your account` · `Download the app` · `Get in touch` | Capital One card block | Third-party CTAs inside ASOS's own footer |

**`Cancel/View` is worth flagging.** A single control that either cancels or merely displays, depending on whether the order is still cancellable — and the help article uses its absence as the diagnostic: `If this button is not available, it's too late to cancel the order before it will be shipped.` Same pattern as Nike's missing-cancel-button copy, but ASOS's control is more ambiguous because the label promises two different outcomes.

## T4 Onboarding & getting-started

**The returns flow is the onboarding, and it is written as six numbered steps** `[documented]`

1. `Go to 'My Account' and open 'My Orders'. Select 'Create Return' on the order you want to return.` — with an inline caveat that the button is absent if every item was shipped by a Brand Partner, and a sub-note headed **`Returning items from multiple orders`?** explaining that all returnable items appear together but must fit one parcel, and that `Each parcel you're returning has to be registered separately.`
2. Select items and reasons; on web and iOS a comment box appears — `This helps us improve our future products.`
3. On web, `you'll also see an estimated refund when placing your return. Please note: this is an estimate only`
4. Search for a drop-off point, then `Place Return`. `You'll receive a QR code by email – you can also find it in 'My Returns'.`
5. `Place your return in a single parcel. You can use any packaging you like – doesn't have to be the one you received your order in - as long as it's secure.`
6. Take parcel and QR code to the drop-off point `and they'll take care of the rest.`

Three content decisions stand out. **Step 2 explains why it is asking** (`This helps us improve our future products`) — a reason attached to an optional field. **Step 3 pre-bounds its own number** (`this is an estimate only`) before the user has seen it. And **step 5 gives permission** (`You can use any packaging you like`) against the most common unstated assumption in returns, that the original box is required.

An asterisked footnote then discloses a real system limit: when combining returns, only orders delivered in the last 14 days appear together; items from orders delivered 14–28 days ago are still returnable but must be started from their own order. A partial-functionality caveat stated rather than hidden.

**The guest path is separated and degraded honestly** `[documented]`: guests are sent to a third-party returns platform, told that `Available return carriers and drop-off points depend on your location`, warned that some carriers require a printed label, and told each guest order must be registered separately.

## T5 Form & field labels

**The three-step sizing model is the priority artefact in this file** `[documented]`, from `Can you help me find the right size?`

> `Finding the right size is made easier with these three steps.`

**Step 1 — `Check how the item fits`**, containing two named PDP modules:

- `Model Wears` — "Check the model's height and the size of the item they're wearing under the images for a quick visual guide on how the item fits."
- `Size Guide` — opening to two named charts:
  - `Body Measurements` — "Compare your own measurements with the chart to understand which size could fit you best." With a candid coverage caveat: `this chart isn't available for everything yet, but we're working on adding it to more items!`
  - `International Conversions` — "If you usually shop in a different sizing system (like US, UK, or EU), use this chart to find the matching size in this brand's sizing."

**Step 2 — `See what we and other shoppers say about the product`**

- `Product Details` — "Check the 'Product Details' tab to learn about the fit (for example, regular or oversized), fabric, and key features. This will help you decide whether to size up or down."
- `Customer Reviews` — read what shoppers thought about `the fit, comfort, and quality`.

**Step 3 — `Find your best size match`**

- `Fit Assistant` — `Log in to use our Fit Assistant for a personalised size recommendation based on your height, weight, fit preferences, and order history.` Located by `the blue Fit Assistant icon near the size drop-down`. Once entered, `your recommended size will appear automatically each time you shop.` Coverage caveat again: `This feature isn't available for all products yet, but we're working on it!`
- Edit routes are given per platform: `On desktop: click 'Fit Assistant' and edit your details.` / `In the app: tap 'Your details' in the Fit Assistant window.`
- Third-party disclosure: `Fit Assistant is powered by a third party called Fit Analytics.`

**Attested Fit Assistant input fields** `[documented]`: `height`, `weight`, `fit preferences`, `order history`. Named UI elements: `Fit Assistant` icon, `Your details`, `size drop-down`.

**The structure is the lesson.** ASOS's answer to "what size am I?" is not a chart — it is a **three-tier escalation from cheapest signal to most personal**: look at the model (free, zero input), read the details and reviews (free, some reading), then log in and give us four data points (personal, but automatic thereafter). Each tier is offered with its own limits stated. Compare Zalando, which leads with the personalised recommendation, and Nike, which offers no prediction at all and sells a 60-day trial instead. **Three retailers, three different answers to one problem, and ASOS's is the only one that ranks the methods by cost to the user.**

Note also that both automated tiers carry an honest coverage disclaimer (`isn't available for everything yet`). Admitting patchy coverage is what prevents a user from concluding the feature is broken when it does not appear.

**Return-reason values** `[documented]` — the controlled vocabulary, partial but attested:

`Too big/Too long` · `Too small/Too short` · `Faulty` · `Faulty/Broken` · `Incorrect Item Received`

The first two are the interesting pair. They are the **only reasons that unlock an exchange**: `If you've chosen 'Too big/Too long' or 'Too small/Too short' as your reason when placing your return, you may now see an option to swap it for a different size`. A reason code that changes the available remedy — the taxonomy is doing routing work, not just analytics.

Note also the compound labels: `Too big/Too long` bundles two dimensions because a trouser can be the wrong waist or the wrong leg and the customer should not have to pick.

**Wrong-size diagnosis before return** `[documented]`, from `Something's wrong with my item`: `Some brands use non-UK sizing. Before returning, please check:` → `The size on the label (EU/US/UK conversions can vary).` · `The brand's size guide.` A multi-brand retailer pre-empting the case where the customer *thinks* they received the wrong size but received the correct one in a different system.

**Parcel size limits, given per carrier** `[documented]`: `Royal Mail`: 20kg, 61x46x46cm · `InPost lockers and shops`: 15kg, 41cm x 38cm x 64cm · `Jersey Post` / `Guernsey Post` / `Isle of Man Post`: 20kg, 61x46x46cm.

## T6 Status & state language

**One named order state is attested, and it is the pre-dispatch one** `[observed]`

> `If your order status in 'My Account' shows 'It's Ordered', we're still preparing your items. This is normal during busy periods and won't affect your estimated delivery date.`

`It's Ordered` — a contraction, in the brand's voice, used as a **system status**. Most order-state vocabularies are participles (`Processing`, `Dispatched`, `Delivered`); ASOS's is a sentence fragment with an apostrophe. And the help article exists specifically to reassure the user who is stuck on it — the Wise reconciling-article pattern again, applied to a state that is technically fine and experientially alarming.

Two things are bundled into that one sentence: what the state means, that it is normal, and that it has no consequence for the promised date. Three reassurances in twenty-five words.

**Named delivery options — nine, with sub-variants** `[observed]`

| Option | Cost | Timing |
|---|---|---|
| `Standard Delivery` | `£4.50`; free over £40 or with ASOS Premier | `2-4 working days*` |
| `Standard (OA)` | as above | `6 working days*` to Outer Areas |
| `Next Day Delivery` | `£5.95`; free with Premier over £15 | Next day, cut-offs shown at checkout |
| `Next Day (NI)` | as above | Northern Ireland, Mon–Sat; hazardous items excluded |
| `Next Day (OA)` | as above | Isle of Wight and Outer Areas, Mon–Sat |
| `Standard Click & Collect` | `£4.50`; free over £40 or Premier | `2-4 working days*` |
| `Express Click & Collect` | `£5.95`; free with Premier over £15 | `2 working days*`, InPost only |
| `Next Day Click & Collect` | `£5.95`; free with Premier over £15 | Next day |
| `Nominated Day Delivery` | `£5.95`; free with Premier over £15 | A chosen day, bookable 10 days ahead |
| `ASOS Instant AM` | `£7.95` (excluded from Premier) | Order by 8pm (or 7pm Sat) for delivery `until 12:00 pm` |
| `ASOS Instant Evening` | `£7.95` (excluded from Premier) | Order by 10am for `6pm and 10pm` same day, London only |

Plus `ASOS Premier` — `free delivery for a whole year. For just £9.95` — and `Fastest Delivery`, a checkout label that appears when Next Day is suspended: `Next Day Delivery could be switched during busy periods - when this happens, choose 'Fastest Delivery' as the quickest delivery option.`

**Eleven distinct named delivery states.** The `(OA)` and `(NI)` parenthetical suffixes are the interesting device — rather than creating separate products, ASOS appends a geography code to the base name and explains it in the row. It keeps the option list short at checkout while preserving the exception at the point the exception applies. But it also means the customer sees a bracketed acronym (`Standard (OA)`) that is only expanded in a help article, not at checkout.

**Return timing is a two-stage clock, stated twice** `[observed]`

- `It takes up to 10 calendar days for a returned parcel to reach our warehouse and be processed.`
- `Once we've processed your return, your refund may take up to 10 working days to reach your account (this depends on your bank or payment provider)`

Note **calendar days for ASOS's stage, working days for the bank's stage.** The unit changes with who controls the delay, and each is attributed. That is a small, precise disclosure decision and it is repeated verbatim across two articles.

A third number sits in the policy: `We aim to refund you within 14 days of receiving the returned item.` So three timing statements coexist — 10 calendar days to arrive and process, 14 days as the refund aim, 10 working days for the money to land. Correct, but the user must assemble them.

**A pre-emptive answer to the most common tracking complaint** `[observed]`:

> `Return tracking showing it's delivered, but you didn't get an email yet? We need the full timeframe above to process all incoming returns, especially during busy periods.`

The question is posed as the user would ask it, in the second person, as a heading-like sentence inside the body. It names the exact contradiction — carrier says delivered, ASOS is silent — and answers it without defensiveness.

**Cancellation windows differ by delivery method** `[documented]` — a status vocabulary expressed as time:

- `Next Day Delivery`, `ASOS Instant` and `Standard Delivery and Express delivery to an InPost Locker`: **15 minutes**
- `Standard Delivery`: **60 minutes**
- Items sold and shipped by an ASOS Brand Partner: **10 minutes**
- `Nominated Day Delivery`: **up to 2 days before** the chosen date
- Gift vouchers: **30 minutes**

Five different cancellation windows in one article, each tied to how fast that rail starts picking. The logic is sound and the article states it plainly rather than quoting a single simplified number.

**Tier states** `[documented]`, ASOS.WORLD: `Stylist (tier 1)` · `Curator (tier 2)` · `Icon (tier 3)` · `A-Lister (tier 4)`, with a latency disclosure: `It may take up to 60 minutes for your tier change to be reflected in your account.`

## T7 Error, failure & recovery

**The Fair Use Policy is the most consequential piece of content on this site, and ASOS publishes its thresholds.** `[observed]`

> `Our Fair Use Policy exists to ensure we can continue offering free returns to the vast majority of our customers.`

The mechanics, verbatim where short:

- `Your Return Rate – the value of items you return compared with what you spend overall (for example, if you order £100 worth of items and return £50 worth, your Return Rate will be 50%)`
- Assessed over a rolling 12 months, `updated every time you place a new order`, with `a 30-day delay before any changes to your status, so all returns have time to be processed`
- `You can view your Return Rate anytime in 'My Account'`
- **Tier 1**: Return Rate ≥70% **and** 3+ orders → `£3.95` deducted per returned parcel, `unless you keep more than £40 of your order`
- **Tier 2**: Return Rate ≥80% **and** 5+ orders → the same deduction **plus** an additional `£3.95` handling fee on orders
- ASOS Premier: ≥70% and 3+ orders blocks purchase or renewal of Premier; existing benefits run to expiry but the deduction applies
- `If your Return Rate decreases, you'll automatically go back to enjoying free returns`
- Notification commitment: `we'll send you a notification with the details. You'll also see reminders at checkout before you place your order, and in the case of the returns deduction, when placing your return.`
- Exemption: `You can continue to make free returns for products that are faulty or where we have sent you a product that you did not order. These returns will be excluded from your Return Rate calculation.`
- Anti-gaming clause: if a customer selects `Faulty` or `Incorrect Item Received` falsely, ASOS reserves the right to apply the deduction — `The return deduction may also apply if you're returning other items in the same parcel with the faulty or incorrect item.`
- `This section doesn't affect your statutory rights.`

**This is the best-designed behavioural-penalty content in this batch, and the comparison is instructive.** Zalando reserves a 12-month purchasing ban against an undefined trigger (`conspicuously high`). Nike discloses a return-activity database with no stated consequence. ASOS publishes the **metric, the formula, a worked example, both thresholds, the order-count qualifier, the escape hatch (`unless you keep more than £40`), the reversal condition, the measurement lag, where to check your own number, and three separate notification points**. A user can self-regulate against it. That is the difference between a policy and a threat.

The £40 escape hatch is the subtlest part: a customer who orders five things, keeps two worth £50 and returns three is not penalised regardless of their percentage. The rule targets the customer who returns nearly everything, not the customer who buys a lot and returns a lot.

**Recovery articles use the user's phrasing** `[observed]`

- `Something's wrong with my item, what should I do?` *(contraction, compound, second clause is the ask)*
- `I'm missing an item from my order, what do I do?` *(first person)*
- `Where is my order?`
- `Why was my parcel returned?`
- `Why have I received an email saying the item I've ordered is out of stock?`
- `What should I do if my order hasn't been delivered yet?`

**Faulty-item paths are separated by *when* the fault appeared** `[documented]`: `My item arrived damaged in transit` and `My item became faulty after use` are separate sub-headings with different instructions. The second one carries an unusually direct condition — check the care label to confirm it was washed correctly — and then a blunt warning:

> `Worn your favourite items too many times? Please remember that all items are inspected on return and those showing wear and tear or damage from incorrect care may not be refunded and may be returned to you.`

Colloquial opener (`Worn your favourite items too many times?`), hard consequence. The register does not soften the rule; it softens the approach to it.

**Blocked-action diagnosis, as a checklist** `[observed]`

> `Unable to create a return for your faulty item?` Check the following:
> - If the item is outside the return window.
> - If the item is marked as non-returnable.
> - If the item was shipped by an ASOS Brand Partner.

Three named causes for one missing affordance, then a human route with a required artefact: `please get in touch with Customer Care with a photo of the item`. Telling the user what to bring *before* they contact support is what keeps that contact from becoming two contacts.

**Cancellation impossibility, stated with the reason** `[observed]`: `If this button is not available, it's too late to cancel the order before it will be shipped.` And for guests: `Checked out as a guest? You won't be able to cancel your order after placing it.` — followed immediately by the statutory alternative (14-day cancellation under the 2013 Regulations) and the practical alternative (return for a refund). **A "no" that ships with two yeses.**

**Authorisation-hold explanation** `[observed]`: `if you cancelled your order through 'My Account', we wouldn't have charged you for it, but the funds may have been reserved by your payment provider. It may take up to 10 working days for the funds to become available again.` The single most-disputed post-cancellation fact, explained and bounded.

**Refund-disputes section written as the user's assertion** `[observed]`: the heading is `I think my refund is incorrect` — not "Refund amounts" or "Why your refund may differ". Then two causes: a promo code prorated across the order, and delivery charges being refundable only in three named circumstances.

**Responsibility is allocated explicitly, twice** `[observed]`: `Returned items are your responsibility until they reach us, so make sure they're packed up properly and can't get damaged on the way!` and `As the parcel remains your responsibility until it arrives back to us, please ensure that you get proof of postage`. Stating the liability boundary *and* the action that protects the user against it, in the same sentence.

**A live error string, captured** `[observed]` — rendered on the Returns & Refunds and Delivery index pages:

> `Oops!`
> `Sorry this page is unavailable right now. Tap this message to retry.`
> `RETRY`

Three problems in four lines. `Oops!` is the exclamation this corpus's strongest performers avoid. `Tap this message to retry` assumes touch, on a desktop page. And the whole block renders **beneath a fully-populated, working FAQ list** — so it is a failed sub-component announcing total page failure, on a page that plainly loaded.

## T8 Empty states

**A pagination counter used as a completeness signal** `[observed]`

- `You've viewed 8 of 8 FAQs` (Returns & Refunds, Delivery)
- `You've viewed 12 of 14 FAQs` (Product & Stock)

The second-person past-perfect construction (`You've viewed`) is unusual and good — it tells the user they have reached the end of the list rather than leaving them to infer it from absence. It is the positive counterpart of an empty state: a *complete* state, named.

**But the Product & Stock instance is a defect** `[observed]`: the page states `12 of 14` while rendering twelve items and offering no way to reach the other two. The completeness signal is announcing incompleteness with no remedy.

**No true no-data states were reachable** — search results, empty bag, no orders, no returns are all behind authentication or client rendering. `[absent]`

The `Oops!` block described in T7 is the closest thing to an error-as-empty-state on the public surface.

## T9 Notifications & system messages

**Notification design is documented as a user-facing topic** `[documented]` — `ASOS Notifications` is one of the three surfaced questions under `Technical`, linking to `ASOS subscriptions and notifications`. Referenced from the refunds article: `You can also set up push notifications in the ASOS App to keep an eye on updates about your refunds`.

**The Fair Use notification chain is specified in three places** `[observed]`: a notification when a deduction or fee begins to apply, a reminder **at checkout before you place the order**, and a reminder **when placing the return**. Warning the user at the two moments where the money is at stake, not just once when the status changes.

**Tier notifications** `[documented]`: `You will receive an email or a push notification to let you know if you've been upgraded to a new tier with more benefits.` With an honest exclusion: `If you aren't opted in to our marketing communications, you won't hear about when a new benefit is live (e.g. Early Access to Sale).` ASOS states the consequence of opting out rather than implying full coverage.

**Delivery-partner messaging disclosed** `[documented]`: `If you have a valid mobile number saved on your ASOS account, our delivery partner may also text updates about your delivery.` Conditional, hedged (`may`), and attributed to the partner rather than to ASOS.

**Per-order email commitments** `[documented]`: shipping details and tracking link on dispatch; confirmation on delivery or collection-readiness; a QR code by email when a return is placed; and — a good detail — `Returned multiple orders in one parcel? We process every order separately, so you'll receive a separate email about each order you sent back, even if they were returned in the same parcel.` Pre-empting the "why did I get three emails?" question and the "why only one email?" question at once.

**Out-of-stock notification has its own article** `[documented]`: `Why have I received an email saying the item I've ordered is out of stock?` — the *notification itself* is the subject of a help article, which is the right place for it.

## T10 Disclosures, legal & compliance

**The returns window and its conditions** `[observed]`

- `You have 28 days from the day of delivery or the day the order becomes available for collection at your nominated store or collection point to return an item to us for a refund.`
- Delivery-cost refund is a **separate, shorter window**: `If you've paid for delivery and return your entire order back to us within 14 days of receiving your order or it being available for collection, and it aligns with our Original Condition and Fair Use policy, we will also refund you the cost of standard delivery fees.`
- `If you checked out as a guest, a £3.95 returns fee applies to all returns and will be automatically deducted from your refund.`
- `We aim to refund you within 14 days of receiving the returned item.`
- Extenuating circumstances: if you create a return in time but cannot send it, get in touch — `but any refund will be at our discretion.`

**Two windows, two remedies, clearly separated** — 28 days for the refund, 14 days for the delivery-cost refund. Like Zalando's two-rights structure, ASOS refuses to collapse a generous commercial window into the statutory one, and it states the statutory right first:

> `Please note that nothing in this Returns Policy affects your statutory rights, including your right to cancel your entire order under The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.`

The 2013 Regulations are named **five times** across the returns, cancellation and refund articles, and have their own dedicated help article titled with the full statute name. For a retailer whose commercial policy is more generous than the law, repeatedly signposting the law is a deliberate trust decision.

**Hygiene exclusions, itemised with the specific seal condition** `[observed]`

> `Hygiene and our customers' safety is super important, so certain items can't be returned for refunds, including:`
> - `Face + Body products if opened, used or the protective seal is not intact.`
> - `Underwear if the hygiene seal is not intact or any labels have been broken.`
> - `Swimwear if the hygiene seal is not intact or any labels have been broken.`
> - `Pierced jewellery if the seal has been tampered with or is broken.`
> - `Face coverings if the seal has been tampered with or is broken.`

Five categories, each with its own trigger condition. Not "certain items are non-returnable" but a list where the customer can check their own item against a physical test.

**The try-on standard, in one sentence** `[observed]`: `It's fine to try on an item like you would in a store, but please don't wear it too long.` Same shop analogy as Zalando, phrased more loosely (`don't wear it too long` is not a standard) but paired with the concrete inspection consequence in the next clause.

**Refund routing by payment rail — five named paths** `[observed]`

- Card: `All refunds go to the original card used to pay for the order – we can't refund you to a different card.` If the card is closed, the refund still lands on the account behind it, provided the account is open.
- Gift voucher/card: credited to the ASOS account, spendable immediately. Mixed payment refunds the alternative method first. `Your replacement gift voucher will have the same expiry date as your original gift voucher.`
- `Klarna`: ASOS notifies Klarna, who adjust the outstanding invoice within 24 hours. `ASOS aren't able to extend your invoice.`
- `Clearpay`: upcoming payments cancelled, paid amounts refunded to the card, remaining instalments adjusted.
- `PayPal Pay in 3`: if the refund exceeds the remaining balance the PayPal account is refunded; if less, `your refund will be split equally across the remaining 2 instalments`.

**The BNPL refund copy is the standout compliance-UX artefact here.** Three credit products, three genuinely different refund mechanics, each explained in three or four sentences, each ending with a handoff to the provider's own support. `ASOS aren't able to extend your invoice.` is a limitation of ASOS's authority stated plainly so the customer stops asking the wrong party. For anyone writing BNPL-adjacent refund copy, this is the reference implementation.

**Accessibility support delegated, with the limits named** `[observed]`, from the delivery article:

> `Accessibility support may be available from your carrier, including delivery instructions, safe-place preferences and extra time to answer the door. Visit your carrier's website for the latest information and support available in your area. Available options vary by carrier and location.`

Three named accommodations (`delivery instructions`, `safe-place preferences`, `extra time to answer the door`), an honest hedge (`may be available`), a route, and a variance caveat. ASOS does not control the doorstep and says so — but it names what to ask for, which is the part the customer would not know.

**Marketplace liability split** `[observed]`: `The return policy for orders sold and shipped by an ASOS Brand Partner is at the discretion of the brand.` and `Remember that only items shipped by our Brand Partners need to be returned directly to the brand.` The split is stated in the Returns Policy, the how-to-return article, the fair-use policy and both hub topics — five repetitions of one exception, because it is the one that generates the most failed returns.

**Delivery exclusions given as raw postcode lists** `[observed]`: Outer Areas, Northern Ireland exclusions for hazardous goods, Nominated Day exclusions and ASOS Instant AM exclusions are each published as complete postcode prefix lists (`AB31, AB36–AB38, AB41–AB43, AB45, BT, DG14, FK18–FK21, G83, GY, HS, IM, IV, JE, KA18, KA27–KA28, KW, PA, PH, SA72 and ZE`). Unglamorous and exactly right — a customer in KW17 can check definitively rather than discover at checkout.

**Address immutability, stated twice on one page** `[observed]`: `Double-check the delivery address at checkout as we're unable to change the address once an order has been placed.` — placed in the `Things to know` list at the top of the delivery article, and repeated as its own FAQ answer. A constraint that costs money when missed, so it is said before and after.

## T11 Help-centre architecture

Three levels: hub (`/customer-care/`) → topic index (`/customer-care/<topic>/`) → article (`/customer-care/<topic>/<question-slug>/`). **URL slugs are the article titles**, lightly normalised — `what-is-your-returns-policy`, `how-do-i-return-something-to-you-from-the-uk`, `somethings-wrong-with-my-item`, `im-missing-an-item-from-my-order-what-do-i-do`. Question-as-URL, which is good for search and good for support agents sharing links.

**Topic indexes are plain lists with a count** `[observed]`: H1 = topic name, `## 8 FAQs`, the list, then `You've viewed 8 of 8 FAQs`. No descriptions, no scope lines. The question titles are expected to carry all the signal — and because they are full sentences, mostly they do.

**Every article has an in-page anchor table of contents** `[observed]`, and the anchor labels are shorter than the headings they point to:

`The basics` · `Exchanges` · `Placing your return with an ASOS account` · `Placing your return as a guest` · `Packing your return` · `Dropping off your return` · `Cancelling your return` · `Waiting for your refund`

For a 60-line article this is the difference between a policy document and a usable page. The anchor list also functions as a **summary of the process** — a user can read the eight labels and know the shape of the journey before reading a word of body copy.

**Article-title grammar — four shapes** `[observed]`

| Shape | Example |
|---|---|
| `What is your …?` | `What is your Returns Policy?` · `What is your Fair Use Policy?` |
| `How do I …?` / `How can I …?` / `How will I …?` | `How do I return something to you from the UK?` · `How will I get my refund?` |
| `Can I / Can you …?` | `Can I amend or cancel my order?` · `Can you help me find the right size?` |
| `Why / Where …?` | `Why was my parcel returned?` · `Where is my order?` |

`How will I get my refund?` is the one worth noting — future tense, first person, which is exactly the tense a user anxious about money would use. Not "Refund information", not "How refunds work".

**Two articles are named after third parties** `[observed]`: `Returning an item sold and shipped by New Balance` and `How can I donate clothes to charity using the DPD ReLove scheme?`. Like Wise's named-issuer decline article, these are content-ops decisions to write for a single partner's exception rather than generalise it.

**Routing furniture** `[observed]`: `Related FAQs` (one or two, tightly chosen) → the full seven-topic list → `Need to Search for it?` → `Need to get in touch?` / `Contact us now`. Self-service first, search second, human contact last and smallest — the same descending order as the Wise exemplar.

## T12 FAQs

The help centre *is* FAQs; there is no other article format. Verbatim question inventories by topic:

**Returns & Refunds — 8** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What is your Returns Policy? |
| 2 | What is your Fair Use Policy? |
| 3 | How do returns work with ASOS Brand Partners? |
| 4 | Returning an item sold and shipped by New Balance |
| 5 | How do I return something to you from the UK? |
| 6 | How can I arrange a collection for my return in the UK? |
| 7 | How will I get my refund? |
| 8 | How can I donate clothes to charity using the DPD ReLove scheme? |

**Ordering note:** policy → penalty policy → marketplace exception → single-brand exception → the actual how-to. The two policy documents are placed **above** the instructions, and the Fair Use Policy sits second. That is an unusual and deliberate ranking: ASOS wants the customer to encounter the return-rate rule before the return mechanics. Item 4 is not a question at all — a gerund title in a list of interrogatives.

**Delivery — 8** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Where is my order? |
| 2 | How does delivery work with ASOS Brand Partners? |
| 3 | What is your ASOS Premier service? |
| 4 | How do deliveries with ASOS work in the UK? |
| 5 | How can I collect my order? |
| 6 | Why was my parcel returned? |
| 7 | Can I have my order delivered to a non-residential address? |
| 8 | Why are products shipped from different warehouses? |

Q1 is the anxiety question and it is first. Q8 (`Why are products shipped from different warehouses?`) explains a system artefact that produces a confusing experience (split deliveries, multiple tracking numbers) — writing an article about your own fulfilment architecture because the customer can see its consequences.

**Order issues — 4** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can I amend or cancel my order? |
| 2 | Something's wrong with my item, what should I do? |
| 3 | I'm missing an item from my order, what do I do? |
| 4 | The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 |

Four entries: two conversational, one first-person, and one that is **the full name of a statutory instrument**. The register range inside a four-item list runs from `Something's wrong with my item` to a 2013 Act. Jarring, and probably correct — a customer searching for their legal rights will search the statute name.

**Product & Stock — 14 (12 listed)** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can you give me more information about your products? |
| 2 | Can you help me find the right size? |
| 3 | Can I save an item for later? |
| 4 | Where can I find your care instructions? |
| 5 | Why have I received an email saying the item I've ordered is out of stock? |
| 6 | What are your adhesive product guidelines? |
| 7 | Can I have items sent to someone as a gift? |
| 8 | What do your sale terms mean? |
| 9 | What do all of the different sustainability symbols on my ASOS packaging mean? |
| 10 | How do product reviews work? |
| 11 | How are products ranked on ASOS? |
| 12 | What is your policy on recycling of electrical and electronic products in the UK? |

Q11 (`How are products ranked on ASOS?`) is the ranking-transparency obligation discharged as a customer FAQ rather than buried in terms — the same regulatory driver as Zalando's, answered in a more findable place. Q9 explains packaging symbols, Q12 covers WEEE. Three of twelve are compliance obligations written as questions a shopper might plausibly ask.

**ASOS.WORLD tiers article — 4 question headings** `[observed]`: `Where can I find the benefits for my tier?` · `How long do I have in my current tier?` · `How do I move between tiers?` · `What happens if I don't spend enough in a year to stay in my tier?` · `Why haven't I received my tier-specific birthday discount?`

That fourth one is the reassurance slot, and its answer opens `Don't worry, you'll still be part of ASOS.WORLD!` — a downgrade softened by reaffirming membership before stating the consequence.

## T13 Terminology & glossary

| Term | ASOS's usage | The alternative it rejected |
|---|---|---|
| `Customer Care` | The help centre | "Help", "Support", "Help Centre" |
| `guest` | An unauthenticated purchaser — **who pays £3.95 to return** | "non-member" |
| `ASOS Brand Partner` | Marketplace seller | "third-party seller", "marketplace" |
| `Return Rate` | The published behavioural metric, capitalised | "return ratio", "abuse score" |
| `Fair Use Policy` | The returns-penalty policy | "returns abuse policy" |
| `return deduction` / `handling fee` | The two charges, named separately | "returns fee" |
| `Original Condition` | The named condition standard, capitalised | "resaleable condition" |
| `ASOS Premier` | The £9.95/year delivery subscription | "ASOS Plus", "Prime" |
| `ASOS.WORLD` | The loyalty programme, full caps with a dot | "ASOS Rewards" |
| `Stylist` / `Curator` / `Icon` / `A-Lister` | The four tiers | Bronze/Silver/Gold/Platinum |
| `Fit Assistant` | The personalised size tool | "size finder", "fit predictor" |
| `Model Wears` | The PDP module showing model height and worn size | "model info" |
| `Body Measurements` / `International Conversions` | The two named size charts | "size chart" |
| `It's Ordered` | The pre-dispatch order state | "Processing" |
| `Fastest Delivery` | The substitute option when Next Day is suspended | "Express" |
| `Standard (OA)` / `Next Day (OA)` / `Next Day (NI)` | Geography-suffixed delivery variants | separate product names |
| `ASOS Instant AM` / `ASOS Instant Evening` | Same-day and next-morning options | "Morning delivery" |
| `Ts&Cs` | Terms and conditions | "Terms & Conditions" |
| `Too big/Too long` · `Too small/Too short` | Return reasons that unlock exchange | "Wrong size" |

**Two terminology observations worth carrying out of this file.**

First, **`guest` is monetised here.** At Target `guest` means every customer; at Nike it is a neutral peer to `Member`; at ASOS it is a state that costs £3.95 per return, blocks exchanges, blocks cancellation, blocks tier progression and hides return tracking. The word is identical, the meaning is adversarial. Anyone importing "guest" as a friendly synonym for "not signed in" should look at this first.

Second, **the tier names are aspirational identities, not metals.** `Stylist` → `Curator` → `Icon` → `A-Lister` describes who the customer becomes, not what the tier is worth. It fits the category, and it also means the ladder is not self-explaining — a customer cannot tell from the name that `Icon` outranks `Curator`, which is why the help article has to list them with `(tier 1)` through `(tier 4)` appended. **Identity names buy resonance and cost ordinality**; ASOS pays for both by publishing the numbers alongside.

**Inconsistencies recorded** `[observed]`: `Faulty` vs `Faulty/Broken` for one return reason across two articles · `Where's my order?` (hub link) vs `Where is my order?` (article title) · `Returns Policy` (capitalised) vs `returns policy` (lower-case, in body) · `ASOS.WORLD` vs `ASOSWORLD` (in the URL slug `asosworld-tiers-and-benefits`).

## T14 Voice, tone & accessibility

**Person and register.** Second person throughout, first-person plural for ASOS, contractions everywhere (`we're`, `you'll`, `doesn't`, `won't`, `aren't`). The register is conversational-professional and holds steady across topics — notably it does **not** flatten as much as Wise's or Glossier's does. `Hygiene and our customers' safety is super important` uses `super` in a hygiene-restriction paragraph; `We're not responsible for any items that are returned to us by mistake (it happens!)` puts a parenthetical joke in a liability clause.

**The house device is the empathy-then-constraint sentence.** `We get it - sometimes something just doesn't work for you and you want your money back.` · `We're really quick at preparing your order, so we can't make any changes once you've placed it.` · `Don't worry – it can take a few days for tracking information to appear.` The connective varies (dash, `so`, comma) but the shape does not: acknowledge, then restrict.

**Dashes are the dominant punctuation.** Spaced hyphens and en dashes appear throughout in place of colons and semicolons — `Returns from the UK are free for qualifying orders for ASOS account holders.` sits in a bulleted list where four of seven bullets use a dash mid-sentence. It keeps the tone informal in documents that are, functionally, policy.

**Bold is used as a scanning aid, not emphasis.** Every number, deadline and named option is bolded: **28 days**, **£3.95**, **up to 10 calendar days**, **Faulty**, **Create Return**, **My Orders**. A reader scanning only the bold text of the returns article gets the window, the fee, the two clocks and the control names. That is a deliberate second reading layer and it is the most practically useful formatting decision in this file.

**Questions used as in-body headings.** `Using our website or the iOS App? You may see an option to exchange your item!` · `Something's not quite right with an item you received?` · `Unable to create a return for your faulty item?` · `Return tracking showing it's delivered, but you didn't get an email yet?` · `Want to book a collection instead?` · `Worn your favourite items too many times?` — six conditional questions acting as section headers, each letting the reader self-select out of a paragraph that does not apply to them. In articles this long, that is the mechanism that makes them navigable.

**Platform-conditional copy is explicit** `[observed]`: `Using our website or the iOS App?` · `If you're placing your return through our website or iOS App, you'll also see a comment box` · `If you're using our website, you'll also see an estimated refund` · `On desktop: click 'Fit Assistant'` / `In the app: tap 'Your details'`. ASOS names which platform has which feature rather than describing a unified experience that does not exist. Honest, and it prevents the "I can't find the button" ticket — though it also reveals that iOS has features Android does not.

**Accessibility content** `[observed]`

- An `Accessibility` link in the global footer, as one of three legal links
- Carrier-level accessibility accommodations named in the delivery article (see T10) — `delivery instructions`, `safe-place preferences` and `extra time to answer the door` — which is the only place in this batch where a retailer names specific doorstep accommodations
- Third-party data disclosure attached to the Fit Assistant, with both privacy policies linked and a standing disclaimer about third-party sites
- An image carrying a genuine descriptive alt: `Image of the Fit Assistant icon`

**Negative findings, recorded honestly**

- **The `Oops!` error block** renders on at least two index pages *beneath a working FAQ list*: `Sorry this page is unavailable right now. Tap this message to retry.` / `RETRY`. Wrong tone (`Oops!`), wrong input assumption (`Tap`, on desktop), wrong scope (a component failure announcing page failure), and contradicted by the content above it.
- `You've viewed 12 of 14 FAQs` while showing twelve and offering no route to the other two
- `Faulty` vs `Faulty/Broken` — one return reason, two labels, two articles
- `Where's my order?` vs `Where is my order?` — one destination, two labels
- `Cancel/View` — one control promising two outcomes, with the label giving no indication of which you will get
- `Standard (OA)` and `Next Day (NI)` expose unexpanded acronyms to customers; the expansion (`Outer Areas`, `Northern Ireland`) lives only in the help article
- The ASOS Brand Partner exception is restated in five separate places, which is a sign the naming has not solved the comprehension problem
- Three refund timings (10 calendar days, 14 days, 10 working days) that the reader must assemble into one expectation
- Capital One credit-card marketing (`Got the card already?`, `Sign in to your account`, `Download the app`, `Get in touch`) is embedded in the footer of every Customer Care page, including the Fair Use Policy page that explains why the reader is being charged £3.95

---

## Transferable patterns

1. **Publish the metric, the formula, a worked example and both thresholds.** ASOS's `Return Rate` is the reference implementation for behaviour-based penalties: `if you order £100 worth of items and return £50 worth, your Return Rate will be 50%`, plus 70%/3-orders and 80%/5-orders thresholds, a £40 escape hatch, a reversal condition, a 30-day measurement lag and a self-service place to check your own number. Compare Zalando's undefined `conspicuously high`. **If the sanction is real, the threshold must be knowable.**
2. **Rank sizing methods by cost to the user.** Look at the model → read the details → log in and give four data points. Each tier ships with its own honest coverage caveat (`isn't available for everything yet`). Transfers to any progressive-personalisation flow: offer the zero-input answer first, and say where each tier stops working.
3. **Let the reason code change the remedy.** `Too big/Too long` and `Too small/Too short` are the only two reasons that surface an exchange option. A taxonomy that routes rather than merely reports.
4. **Change the time unit with the party who controls the delay.** `up to 10 calendar days` for ASOS's stage, `up to 10 working days` for the bank's, each attributed. Precise, and it tells the user where to chase.
5. **Explain each credit rail's refund mechanics separately.** Klarna, Clearpay and PayPal Pay in 3 behave genuinely differently on a partial refund, and ASOS writes three short explanations plus a handoff, including the limit of its own authority (`ASOS aren't able to extend your invoice`). Directly applicable to PayPal Pay in 3 and BNPL refund copy.
6. **Use conditional questions as in-body headings.** `Unable to create a return for your faulty item?` lets a reader skip a paragraph that does not apply. In a long policy article this is what converts a document into a tool.
7. **Bold every number and control name** so a scan of the bold text alone yields the window, the fee, the clocks and the buttons. A second reading layer at zero extra copy cost.
8. **Name the accommodations you do not control.** ASOS cannot deliver to the door itself, but it names `safe-place preferences` and `extra time to answer the door` so the customer knows what to ask the carrier for. Naming the right question is a service even when you cannot answer it.
9. **Negative lesson: `Oops!` on a page that loaded.** A failed sub-component announcing total page failure, in a chirpy register, with a touch instruction on desktop. Error copy should name the scope of what failed and match the input method it is asking for.

## Caveats & gaps

- **No product detail page was opened.** The `Size Guide`, `Body Measurements` and `International Conversions` charts, the `Model Wears` module, the `Fit Assistant` icon and questionnaire, and the size-drop-down itself are all `[documented]` from the sizing help article, **not observed**. No measurement labels, no chart column headers and no fit-questionnaire strings are in this file.
- **The storefront homepage rendered nav only**; product grids, badges and merchandising strings are client-rendered and were not captured. There is therefore no ASOS equivalent of the availability-badge inventories recorded for Glossier and Zalando.
- **All in-account copy is `[documented]`.** `My Account`, `My Orders`, `My Returns`, `Create Return`, `Place Return`, `Cancel/View`, `Track parcel` and the Return Rate display are quoted inside help articles describing the UI; none were seen.
- **Order-state vocabulary is thin.** `It's Ordered` is the only state name attested. A full status ladder almost certainly exists in `My Orders` and is not in this file. Nothing was inferred.
- **Six of sixteen possible Customer Care topics were sampled in depth**; `Payment, Promos & Gift Vouchers`, `Technical`, and most of `ASOS.WORLD` were not opened. Two Product & Stock FAQs were not even listed by the index (see T8).
- **UK only.** International returns (`How do I return something to you?`), the international delivery articles and any non-GB market were not harvested. Every fee, window and postcode list in this file is UK-specific.
- **No error, validation or empty-state strings beyond the `Oops!` block** were reachable; T8 is honestly thin.

## Sources

1. https://www.asos.com/
2. https://www.asos.com/customer-care/
3. https://www.asos.com/customer-care/returns-refunds/
4. https://www.asos.com/customer-care/returns-refunds/what-is-your-returns-policy/
5. https://www.asos.com/customer-care/returns-refunds/how-do-i-return-something-to-you-from-the-uk/
6. https://www.asos.com/customer-care/returns-refunds/how-will-i-get-my-refund/
7. https://www.asos.com/customer-care/returns-refunds/what-is-your-fair-use-policy/
8. https://www.asos.com/customer-care/delivery/
9. https://www.asos.com/customer-care/delivery/how-does-the-asos-delivery-service-work/
10. https://www.asos.com/customer-care/delivery/what-should-i-do-if-my-order-hasnt-been-delivered-yet/
11. https://www.asos.com/customer-care/order-issues/
12. https://www.asos.com/customer-care/order-issues/somethings-wrong-with-my-item/
13. https://www.asos.com/customer-care/order-issues/can-i-amend-or-cancel-my-order/
14. https://www.asos.com/customer-care/product-stock/
15. https://www.asos.com/customer-care/product-stock/can-you-help-me-find-the-right-size/
16. https://www.asos.com/customer-care/asos-world/asosworld-tiers-and-benefits/
