# 079. Zalando

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | European fashion marketplace (own-retail + partner/marketplace hybrid, 28 country storefronts, private-label portfolio, re-commerce) |
| Primary URL | https://www.zalando.com/ |
| Corpus rank | 079 |
| Benchmark strength (source list) | Returns and sizing guidance |
| Locale / market observed | Primarily en-GB (`zalando.co.uk`); comparative sampling on `zalando.ie` and `en.zalando.de`; market selector at `zalando.com` enumerating 28 markets |
| Platform observed | Web (desktop), legal pages, product detail pages, corporate site |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | EU/UK consumer law is visible throughout: Consumer Contracts / statutory 14-day right to cancel, distance-selling revocation, EU P2B and DSA-style ranking-transparency disclosure, GDPR/UK GDPR privacy notice with named automated-decision uses, e-money exclusion for gift cards (`Zalando Payments GmbH`), EN 301 549 v3.2.1 and WCAG 2.2 AA for accessibility, German jurisdiction with consumer forum election |
| Harvest date | 2026-09-21 |
| Pages inspected | 16 attempted; 11 yielded content; 5 returned chrome only or an empty body |
| Harvest completeness | **Partial — blocked on the help centre.** Zalando's FAQ article bodies are client-rendered on every domain tested (UK, IE, DE-English): the article region returns the bare word `Faq` with no fallback. **Zero verbatim FAQ questions and zero FAQ answers were retrievable.** The standalone size guide does not exist as a page, and the measurement tables sit in a client-rendered modal. Returns-status UI vocabulary is auth-gated. What follows is built from surfaces that *are* server-rendered: legal pages, the accessibility statement, product detail pages, the privacy notice, and the corporate site. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Market selector | https://www.zalando.com/ | 28 markets, no flags, no currency |
| Accessibility statement | https://www.zalando.co.uk/accessibility-statement/ | Named standards, external audit, six open defect classes |
| Terms & Conditions (UK) | https://www.zalando.co.uk/zalando-terms/ | The authoritative returns-window wording |
| Privacy Notice (UK) | https://www.zalando.co.uk/zalando-privacy-policy/ | **The only source of order/return status values** |
| Gift cards | https://www.zalando.co.uk/giftvouchers/ | Five names for one object |
| Women's clothing (category) | https://www.zalando.co.uk/womens-clothing/ | Filter group names, specialty-size vocabulary |
| PDP — Even&Odd jumper | https://www.zalando.co.uk/evenandodd-jumper-mottled-beige-ev421i0jh-b11.html | Apparel `Size & fit` labels |
| PDP — Even&Odd winter boots | https://www.zalando.co.uk/evenandodd-by-zalando-winter-boots-taupe-ev411n0pp-o11.html | Footwear `Size & fit` labels; a live content bug |
| PDP — adidas Samba | (adidas PDP, `zalando.co.uk`) | Marketplace attribution line |
| Corporate — size and fit | https://corporate.zalando.com/en/about-us/what-we-do/how-zalando-leverages-technology-help-customers-find-right-size | **The canonical "true to size" vocabulary** |
| Corporate — returns | https://corporate.zalando.com/en (returns explainer) | Return-grading vocabulary and rate data |
| Help / FAQ (UK) | https://www.zalando.co.uk/faq/ and four article URLs | **Chrome only — no article body** |
| Help / FAQ (IE) | https://www.zalando.ie/faq/ | **Chrome only — renders as `Faq`** |
| Help / FAQ (DE-English) | https://en.zalando.de/faq/what-is-your-return-policy.html | **Chrome only — renders as `Faq`** |
| Size guide | https://www.zalando.co.uk/size-guide/ and `/sizeguide/` | **Empty — no such page exists** |
| Returns portal | https://www.zalando.co.uk/returns/articles?withdrawal=true | **Empty — auth-gated** |

---

## T1 Navigation & IA labels

**Global nav — audience first, then product type** `[observed]`

`Women` · `Men` · `Kids` (audience strip, above the logo)
`Clothing` · `Shoes` · `Accessories` · `Sports` · `Designer` · `Brands` · `Sale` (category strip, below)

`Designer` rather than "Premium" or "Luxury" as the up-market label, and `Brands` as a peer of product categories — brand-led browsing is treated as a first-class axis, which is a marketplace tell.

**Persistent header strip — four promises, one of which is a policy** `[observed]`

`Help and contact` · `Free standard delivery over £39.00 & free returns*` · `30-day return policy` · `Gift Cards`

The returns window is in the **global header of every page**, not in a footer or a PDP module. For a category where a third of returns are size-related (Zalando's own figure), putting the return window at the top of every page is the structural answer to fit uncertainty: the site does not promise you'll get the size right, it promises the cost of getting it wrong is zero.

**Footer group headings — six, two of which are promises** `[observed]`

`Help and Contact` · `Gift Cards` · `About us` · `Our partners` · `Our payment methods` · `Our promises` · `Our services`

`Our promises` contains `Free Delivery*` · `30 days return policy` · `Free Returns`. `Our partners` contains carrier logos only. Naming the carrier and the payment rails as footer sections, with logos linking to the relevant FAQ, is a European-commerce convention and it means the logistics partner is disclosed before checkout.

**Help-and-contact link set — nine links, all task-phrased** `[observed]`

`See all help topics` · `Track your parcel` · `Report a damaged item` · `Delivery information` · `Return an order` · `Find the right size` · `How to reset your password` · `Subscribe to our newsletter` · `Report a vulnerability`

Seven of nine are verb-first (`Track`, `Report`, `Return`, `Find`, `Subscribe`, `Report`). `Find the right size` is the notable inclusion — sizing is promoted to a top-level help link, peer to tracking and returns. And `Report a damaged item` gets its own footer slot rather than living inside a returns article, which means the damaged-goods path is reachable in one click from anywhere.

`Report a vulnerability` (to the corporate security page) sits in the customer help list — unusual placement, but it means a researcher never has to guess.

**Casing is not consistent across markets** `[observed]`. The UK footer uses sentence case (`See all help topics`, `Return an order`, `Our promises`); the Irish footer uses Title Case for the same items (`All Help Topics`, `Return an Order`, `Our Promises`). Same IA, different capitalisation rules, two adjacent markets.

**PDP section headings** `[observed]`: `Delivery` · `Material & care` · `Details` · `Size & fit` · `Product standard`

`Size & fit` as a named PDP module — not "Sizing", not "Fit guide" — and it is where the measurement labels live.

## T2 Value proposition & headline patterns

**The market selector is the bluntest page in this corpus** `[observed]`

> `Zalando is available in the following countries`

That is the entire page: an H1, 28 country links, one `Legal notice` link, and an alt text (`Shoes and fashion online with free shipping by Zalando`). No value proposition, no imagery, no currency, no flags. A functional router with a declarative sentence as its headline.

**PDP headlines are social proof, not claims** `[observed]`

- `This is one of our most popular items this month`
- Badges: `Popular item` · `Top rated` · `New` · `Hot Drops` · `Exclusive` · `Mix and match`
- Rating render: `Good` / `44 Ratings`

`This is one of our most popular items this month` is a full sentence stating an observed fact with a time bound (`this month`). It is a claim Zalando can substantiate from its own data, unlike a superlative. The time bound is what makes it credible.

**Product standards get a two-line module** `[observed]`

> `Standards matter.`
> `This product contains materials meeting third-party standards.`

Two sentences, second one hedged precisely — `contains materials meeting` rather than "is certified". A carefully bounded sustainability claim, and a model for how to say something true about a supply chain you only partly control.

**Newsletter headline uses a line break as punctuation** `[observed]`: `Deals, drops and trends  Straight to your inbox` — a noun list, a gap, a destination. No verb.

**Corporate framing of returns is unusually candid** `[observed]`, from the corporate returns page: `across all our markets, an average of 50 percent of the items ordered are returned` and `Size-related issues account for around a third of all returns.` A retailer publishing its own return rate is rare, and it is the context that makes the whole size-and-fit programme legible.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Add to bag` | PDP primary | `bag`, not "cart" or "basket" |
| `Choose your size` | PDP, unselected state | **The CTA is the blocking instruction** — see T8 |
| `Open size guide` | PDP, **twice per page** | Once above the size selector, once at the foot of `Size & fit` |
| `Find the size that fits your measurements` | PDP, above the size selector | A full sentence used as a link/prompt |
| `See all` | PDP modules | |
| `See more` | Carousels | Second label for the same intent |
| `Follow` | Brand follow | |
| `Report a legal concern` | PDP | DSA-driven; named plainly rather than "Report" |
| `View manufacturing details` | PDP | GPSR-driven transparency link |
| `All reviews` | PDP | |
| `How do ratings and reviews work?` | PDP, beside the rating | Ranking transparency offered at the point of the signal |
| `Outfit inspiration` · `How about these?` · `Often viewed with each other` | PDP recommendation modules | Three differently-phrased module titles |
| `Shop now` | Gift cards | |
| `Filter` · `Show all filters` · `Sort by` | Category | |
| `Track your parcel` · `Report a damaged item` · `Return an order` · `Find the right size` | Footer | Task-phrased |
| `contact our support team` | Accessibility statement | Links to a client-rendered FAQ — a dead end |
| `Sign me up` | Newsletter | |
| `See more (you'll need to sign in)` | Newsletter preferences | **Names the auth cost inside the label** |
| `Skip forwards over the carousel of products` / `Skip backwards over the carousel of products` / `Skip forwards over a carousel of items` | PDP | Carousel bypass controls — **three phrasings of one control** |
| `GO TO TOPGo to top` | Every page | Duplicated accessible text |

**`See more (you'll need to sign in)` is the small standout.** It puts the authentication requirement inside the link label, so the user learns the cost before the click rather than after a redirect. Cheap, honest, and rare.

**`How do ratings and reviews work?` placed adjacent to the rating** is the other one. Ranking and review transparency is a regulatory obligation in the EU; Zalando satisfies it by putting the explanation next to the signal being explained rather than in a policy page.

## T4 Onboarding & getting-started

`[absent]` for account onboarding — no server-rendered signup or getting-started flow was reachable.

**What exists instead is a size-profile onboarding, and it is documented rather than observed** `[documented]`, from the corporate size-and-fit page:

> `Size recommendations provide personal size advice on the basis of several data points: the customers' purchase history including return reasons as well as information they provide in the "your sizes" section of the customer profile. This includes fit feedback on items they have ordered and size reference items that fit customers well, regardless of where they purchased them.`

Three coined onboarding concepts in one sentence: `your sizes` (a named profile section), `fit feedback` (post-purchase input), and `size reference items` — **an item the customer already owns and that fits, used as the calibration anchor regardless of where it was bought.** That last idea is the most interesting content artefact in this file. It reframes the sizing problem from "what are your measurements?" (which most people do not know) to "name something that fits you" (which everyone can answer).

A second, more ambitious flow is described `[documented]`: `They just need to take two pictures with their phones, front, and side, wearing tight clothes, and then we can predict the customer measurements and recommend a specific size.` — named on the returns page as `Size Advice with Body Measurements`.

None of these flows' actual UI strings were retrievable. The fit-assistant entry point is server-rendered on every PDP as a bare link with **no anchor text** — `/assistant?product_id=ern%3Aproduct%3A%3AEV421I0JH-B11` — so the trigger exists in the DOM but carries no accessible name in the fetched HTML. Its copy is client-rendered and is recorded as unreachable.

## T5 Form & field labels

This is the priority section for this product, and it splits cleanly: the **size-selector chrome is server-rendered and fully captured**; the **size chart itself is not**.

**Size selector and size-guide entry** `[observed]`, identical across all three PDPs

| Label (verbatim) | Role |
|---|---|
| `Find the size that fits your measurements` | Prompt above the selector |
| `Open size guide` | The chart trigger — **appears twice per PDP** |
| `Size` | The field |
| `Choose your size` | Unselected-state instruction / blocking CTA |

**Apparel `Size & fit` labels** `[observed]`, Even&Odd jumper

| Label | Value shown |
|---|---|
| `Our model's height:` | `Our model is 5' 9" tall and is wearing size S` |
| `Fit:` | `Loose fit` |
| `Shape:` | `Straight` |
| `Length:` | `Short` |
| `Sleeve length:` | `Long` |
| `Total length:` | `19.0 " (Size S)` |

**Footwear `Size & fit` labels** `[observed]`, Even&Odd winter boots

`Shoe width:` → `Regular` · `Shaft height:` → `8.0 " (Size 4)` · `Shaft width:` → `Slim` · `Shaft height:` → `Ankle` · `Shaft width:` → `12.0 " (Size 4)` · `Total shoe height:` → `2.0 " (Size 4)` · `Heel height:` → `Low` · `Platform height:` → `1.0 " (Size 4)`

adidas Samba: `Shoe width:` → `Regular` · `Heel height:` → `Flat/ultra low`

**The single most transferable convention here: every numeric measurement is stamped with the size it was taken on.** `19.0 " (Size S)`, `8.0 " (Size 4)`, `2.0 " (Size 4)`. A garment measurement without its reference size is useless — the customer cannot tell whether 19 inches is the S or the XL — and almost every retailer omits it. Zalando appends it to every value, as a parenthetical, consistently. **Steal this.**

**A live content bug worth recording** `[observed]`: on the boots PDP, `Shaft height:` and `Shaft width:` each appear **twice with different value types** — once numeric (`8.0 " (Size 4)`, `12.0 " (Size 4)`) and once categorical (`Ankle`, `Slim`). Two fields, four rows, two data models collided in one table. A user reading top to bottom sees the shaft height is both `8.0 "` and `Ankle`.

**Specialty-size vocabulary** `[observed]`

Filter group: `Specialty sizes`. Assortment values: `Standard Clothing` · `Maternity Clothing` · `Plus size Clothing` · `Petite Clothing` · `Tall Clothing`. Tile badges: `Petite` · `Tall` · `Wide` · `Adaptive`. Sub-brand naming carries the fit into the brand name itself: `Even&Odd Petite by Zalando`, `Anna Field Tall by Zalando`, `Anna Field Wide Fit by Zalando`, `Even&Odd Wide Fit by Zalando`.

`Adaptive` as a tile badge — adaptive clothing surfaced in the same badge slot as `Petite` and `Tall`, rather than in a separate accessibility section — is the right structural decision. It is a fit, not a special case.

**Filter group names** `[observed]`, category page, rendered twice with different sets:

Set 1: `Brand` `New in` `Size` `Price` `Campaigns` `Colour` `Specialty sizes` `Show all filters`
Set 2: `Sort by` `Brand` `New in` `Size` `Price` `Campaigns` `Colour` `Specialty sizes` `Material` `Pattern` `Length` `Show all filters`

Two variants (mobile and desktop) exposing different filter counts. **Filter *values* do not server-render** — not a single size-filter value was retrievable.

**Sort options are documented in legal prose, not observable in the control** `[documented]`. The T&Cs' ranking-transparency section states: `You can override the default ranking by using sorting options such as "Price: Low to High", "Customer Ratings", or "Newest First" to tailor the product order to your preferences.` So `Price: Low to High`, `Customer Ratings` and `Newest First` are attested — **but from the terms document, not the UI.** Marked `[documented]` deliberately.

**Newsletter preference labels — and a clean market divergence** `[observed]`

UK / DE: `Item alerts` · `Fashion updates` · `Your brands and creators` · `Size Reminder Confirmation` · `Recommendations` · `Stories` · `Surveys` · `Offers and sales`
IE: `Your item alerts` · `Your fashion fix` · `Your brands and creators` · `Size Reminder Confirmation` · `Your recommendations` · `Stories` · `Surveys` · `Your offers & sales`

Ireland has possessive-ised five of eight labels and rewritten `Fashion updates` as `Your fashion fix`. `Size Reminder Confirmation` is the **only label identical across all three markets** — and it is also the worst-written one in the set, a three-noun stack with no verb. Either it is centrally owned and frozen, or nobody has touched it.

## T6 Status & state language

**This is where the harvest is weakest, and the reason must be stated plainly.** Zalando's returns-tracking flow is auth-gated and its help articles are client-rendered. No returns-status UI screen was reachable.

**One source did yield status values — the Privacy Notice** `[observed]`. Under `1.3 Shopping information`, Zalando enumerates the data it holds and, in doing so, quotes its own status vocabulary:

> `- Delivery and payment status, e.g. "completed" or "dispatched"`
> `- Return status, e.g. "successfully completed"`

So the attested values are: delivery/payment — `completed`, `dispatched`; return — `successfully completed`. All three are given as examples (`e.g.`), so the full ladder is longer than this.

**Stated honestly: no evidence was found for `Return registered`, `Parcel received` or `Refund issued`.** Those strings may well exist in the logged-in returns tracker; they were not observed, are not quoted anywhere reachable, and have not been written into this file. The only return-status string this harvest can vouch for is `successfully completed`.

**Account-area names** `[observed]`, from a `Tip` callout in the same Privacy Notice: `You can view your essential shopping data in your customer account in the areas "My orders", "My returns" and "My address book".` → `My orders` · `My returns` · `My address book`.

**Contract-formation states are named in the T&Cs** `[documented]`

> `Once you have submitted your order, we will immediately send you an e-mail acknowledging your order. This confirms that we have received your order but is not an acceptance of your offer. A binding contract is formed when the items have been dispatched.`

Three states in one paragraph: *submitted*, *acknowledged* (explicitly not acceptance), *dispatched* (= binding). Separating acknowledgement from acceptance is standard EU practice, but stating it in plain sentences rather than legalese is not.

**Out-of-stock / unavailable state** `[documented]`, T&Cs 1.5: `In the event that an item you have ordered is unavailable, we will let you know as soon as we can and, where payment has already been made, make a refund to your payment method without undue delay.` Two commitments (notify, refund) both bounded by soft timing (`as soon as we can`, `without undue delay`).

**Delivery estimates are rendered as date ranges with cost attached** `[observed]`, PDP

- Paid: `Standard delivery` / `Thu 24 Sep – Mon 28 Sep     £3.99` / `Free for orders over £39.00*`
- Free: `Sat 26 Sep – Tue 29 Sep     free`

Weekday-plus-date ranges rather than "3–5 working days" — absolute over relative, removing the user's arithmetic. And the cost sits on the same line as the date, so speed and price are compared in one glance.

**Marketplace attribution is a status of its own** `[observed]`: `Sold and shipped by` `adidas` `.` — rendered as three adjacent fragments on the adidas PDP. The T&Cs formalise the distinction with the terms `Zalando merchandise` and `Zalando partner merchandise`, and give partner items their own returns paragraph.

**Return-grading vocabulary** `[documented]`, corporate returns page: `Over 96% of all returned items are classified as being in "ideal condition" during this process` and `we are able to offer around 98 percent of all fashion items returned to us directly via the Zalando Shop or our shopping club "Lounge by Zalando"`. `ideal condition` is Zalando's internal grading term, quoted in its own quotation marks — a back-of-house state surfaced in public copy.

## T7 Error, failure & recovery

**The returns policy is where recovery is actually written, and it is built on two named rights that Zalando deliberately keeps separate.** `[documented]`

**The statutory right, verbatim:**
> `You have the right to cancel your contract with us within 14 days without giving any reasons. The cancellation period will expire 14 days from the day on which you acquire, or a third party other than the carrier indicated by you acquires possession of the last item in your order.`

**The voluntary right, verbatim (T&Cs 8.1):**
> `Without prejudice to your statutory right to cancel set out above, we offer you the option of returning items ordered from the Zalando.co.uk website within 30 days of you receiving them. This return option allows you to return items to us, even after the 14-day cancellation period has expired`

And the plain-language summary at the top of the terms page distinguishes them again:

- `5. Right of cancellation:` — a statutory right, 14 days, no reasons
- `6. Voluntary right of return:` — `We offer you a voluntary additional right of return, which we grant you voluntarily and independently of the 14-day right of cancellation. Your statutory right of cancellation remains unaffected by this.`

**This two-rights structure is the most transferable compliance-content pattern in this file.** The commercial promise (30 days, in the header of every page) and the legal right (14 days, non-waivable) are genuinely different things with different consequences, and Zalando refuses to collapse them. The phrase `Your statutory right of cancellation remains unaffected by this.` appears so the customer cannot be led to believe the generous policy replaced the legal one. Compare the alternative — advertising "30-day returns" and silently absorbing the statutory right — which is what most retailers do and which is what creates disputes at day 20.

Coined framing: `voluntary right of return`, and section 9 is headed `9. Refunds under the voluntary 30 days return right`.

**Free-versus-paid returns is a single conditional sentence, repeated twice** `[documented]`

> `We will bear the costs of returning the goods provided you use the QR code or the return label for shipment from the country in which delivery was made to you, otherwise you will be required to pay the return shipping costs.`

Note the two conditions bundled: right label *and* right country. The second is easy to miss and is the one that catches cross-border customers. Section 6 then writes the same rule in a softer, second-person register with a fallback route for people without a printer, and closes with a request rather than a threat: `Please help us to avoid unnecessary costs by always using the QR code or the return label when returning merchandise.`

**Two registers for one rule.** The plain-language summary asks; the terms clause obliges. Both are on the same page.

**Return condition** `[documented]`, T&Cs 8.5: `Your exercise of this return option is limited to unworn items that you have worn/tried on only as you would have in a shop. All returned items must be returned in their original condition, intact and undamaged, and in its original packaging.`

The shop analogy (`only as you would have in a shop`) is the whole test, expressed in nine words without a definition of "worn". It transfers the standard the customer already understands from physical retail.

**No exchanges — stated as a flat capability gap** `[documented]`, T&Cs 8.7: `We do not offer exchanges for returned items. If you wish to purchase a new item, please place a new order.` Two sentences: the limitation, then the workaround. No apology.

**Returns-abuse clause, published** `[documented]`, T&Cs 1.9:

> `We hereby reserve the right to exclude customers with conspicuously high (and unusual) product return behaviour from further purchases for a period of up to 12 months. This shall apply, in particular, to repeated, disproportionately high numbers of returns (or instances of return behaviour considered to be 'abusive') that do not correspond to normal buyer behaviour.`

Compare across the batch: ASOS publishes exact thresholds (70%/80% return rate, 3/5 orders) and charges £3.95; Nike discloses a return-activity database with no stated consequence; Zalando reserves a **total exclusion from purchasing for up to 12 months** and defines the trigger only qualitatively (`conspicuously high`, `disproportionately high`, `abusive`). The sanction is the most severe of the three and the threshold the least knowable. That is a real content-design problem: a user cannot self-regulate against an undefined standard.

**Refund routing** `[documented]`: `Any refunds will be made automatically using the original payment method.` and, more specifically, `If you paid by Paypal/credit card, the refund will be sent to your Paypal/credit card account. If you used a gift voucher for your purchase, we will credit the relevant amount to your gift voucher account.`

**Recovery entry points in the footer** `[observed]`: `Report a damaged item` links directly to a dedicated FAQ (`what-if-my-item-is-damaged-or-defective.html`), giving the damaged-goods path a permanent global route. The article body itself was unreachable.

**No error strings, no validation copy, no 404 page were retrievable.** `[absent]` — stated rather than filled.

## T8 Empty states

`[observed]` — thin, and honestly so.

- `No search history` — the search dropdown's empty state, present on every page and every market tested. The only true empty-state string captured.
- `Choose your size` — the PDP's unselected-size state. This is worth a note: Zalando uses the **instruction as the button label** in the unselected state, so the blocked action and the unblocking instruction occupy the same control. The user does not get an error after clicking `Add to bag`; the control never says `Add to bag` until a size is chosen.
- `Filter` with no count shown when nothing is applied (compare Glossier's `Filter ( 0 )`).

Cart, wishlist, order-history and returns empty states are behind authentication. `[absent]`

## T9 Notifications & system messages

**Notification types are enumerated in the newsletter preference centre, which doubles as documentation** `[observed]`: `Item alerts` · `Fashion updates` · `Your brands and creators` · `Size Reminder Confirmation` · `Recommendations` · `Stories` · `Surveys` · `Offers and sales`.

**Reminder triggers are named in the Privacy Notice** `[documented]`:

> `Reminders e.g. when an item on your wishlist is reduced in price, if items in your bag are forgotten or if you asked for a size reminder;`

Three named triggers — price drop on a wishlisted item, abandoned bag, and a **`size reminder`**. That third one is a coined notification type specific to this category: the customer asks to be told when their size is back, and the notification is named after the size rather than the product.

**Consent line is short and states the cost** `[observed]`: `To learn how we process your data, visit our Privacy Notice. You can unsubscribe at any time without costs.` — `without costs` is a Germanism surviving into English copy, and it is doing real work: it pre-empts the "will unsubscribing cost me my discount?" question.

**Automated-decision disclosure** `[documented]`: the Privacy Notice explains that shoe size recommendations use a machine-learning algorithm developed by `Zalando Research`, trained on shoe orders, returns due to sizing, and manufacturer sizing information, `in order to predict which shoe models are too large or too small`. Explaining the model's purpose and training data in a customer-facing notice, in plain sentences, is the good version of an algorithmic-transparency disclosure.

## T10 Disclosures, legal & compliance

**The returns two-rights structure** is covered in T7 and is the headline item.

**Free-delivery thresholds are per-market and formatted per-market** `[observed]`

| Market | Header string (verbatim) |
|---|---|
| UK | `Free standard delivery over £39.00 & free returns*` |
| Ireland | `Free standard delivery over €39.00 & free returns*` |
| Germany (EN) | `Free standard delivery over €34,90 & free returns*` |

Decimal convention follows the market (`39.00` vs `34,90`), confirming per-market number formatting rather than a shared template with a currency swap. The asterisk is present on all three and resolves to the delivery FAQ — which is client-rendered, so **the asterisk leads to an unreadable page**.

**The returns window is stated three different ways on one page** `[observed]`: `30-day return policy` (header) · `30 days return policy` (footer) · `30 day return policy` (PDP). Three hyphenation and pluralisation variants of one policy, all live simultaneously on `zalando.co.uk`. The Irish footer adds a fourth: `30-day Return Policy`.

**Ranking transparency** `[documented]`, T&Cs 12.4.3 `Transparency and User Control`: the terms explain the default ranking and name the override controls. This is a P2B/DSA-driven obligation discharged inside the T&Cs and mirrored in the UI by the `How do ratings and reviews work?` link.

**Gift cards carry an e-money negation** `[documented]`: `Zalando Gift Cards are issued by Zalando Payments GmbH… However, Zalando Gift Cards are not e-money.` — the Wise "state what you are not" pattern, applied to a stored-value instrument. Validity: `Zalando Gift Cards are valid for a limited period of 5 years from the purchase date.` UK cap `GBP 170,-`.

**A live compliance defect** `[observed]`: the UK gift-card terms state a monthly cap of `€ 5.000,-` — euros, on a GBP page, in German numeric convention. A currency mismatch inside a payment limit.

**Jurisdiction, stated with the consumer's option preserved** `[observed]`, T&Cs 13: `These terms are governed by English law. You may bring legal proceedings against Zalando either in Germany or in the courts of your country of residence.` All 28 markets contract with one entity: `Zalando SE, Valeska-Gert-Straße 5, 10243 Berlin`.

**VAT disclosure differs by market** `[observed]`: UK renders `VAT included` on the PDP; the German-English footer renders `All prices include VAT` twice.

**Manufacturing and safety transparency** `[observed]`: PDP links `View manufacturing details` and `Report a legal concern` — GPSR and DSA obligations surfaced as plainly-named PDP links rather than as footer legal pages.

## T11 Help-centre architecture

**This section is a negative finding and must be read as one.** `[absent]` for article content.

The help centre is at `/faq/` with article URLs of the form `/faq/<question-as-slug>.html` and one category-path form (`/faq/Sizing`, `/faq/Payments/how-do-i-pay-by-apple-pay.html`). The URL slugs are themselves the questions, and they are the only help-content signal retrievable:

`what-is-your-return-policy` · `how-can-I-return-my-order` · `where-is-my-parcel` · `what-if-my-item-is-damaged-or-defective` · `what-delivery-options-are-available` · `how-do-I-reset-my-password` · `what-should-i-know-about-the-newsletter` · `gift-cards-and-vouchers-general-info` · `how-to-redeem-a-gift-card` · `how-do-i-pay-by-credit-card` · `how-do-pay-by-paypal` *(sic — missing "i")* · `Sizing` · `My-Account/what-are-zalandos-accessibility-functionalities`

Two named categories are visible in the path structure: `Sizing` and `Payments`, plus `My-Account`.

**On every domain tested — `zalando.co.uk`, `zalando.ie`, `en.zalando.de` — the article region renders as the bare word `Faq` with no server-rendered fallback.** There is no noscript version, no static mirror, no alternate format. For a help centre, that is a significant accessibility and resilience failure in its own right, and it is worth recording as a finding rather than merely as a harvest limitation: any user agent that does not execute Zalando's JavaScript gets a page containing one three-letter word.

The irony compounds: the accessibility statement's own contact route is `contact our support team` → an FAQ article at `/faq/My-Account/what-are-zalandos-accessibility-functionalities.html?_rfl=fr`, which is also client-rendered. **The escalation path published for users experiencing accessibility barriers terminates in a page that renders as `Faq`.** (Note also the stray `?_rfl=fr` locale parameter on a UK page.)

**No standalone size guide exists.** `/size-guide/` and `/sizeguide/` both return an empty body. The measurement tables live behind the `Open size guide` modal and are unreachable without JavaScript.

## T12 FAQs

`[absent]` — **zero FAQ questions and zero FAQ answers were retrievable**, on any of the three domains tested. See T11.

The only question-shaped strings this harvest can attest are:
- URL slugs, which are questions rendered as slugs (listed in T11) — these are evidence of the question set but are **not verbatim UI strings** and have not been reverse-engineered into sentences here.
- One PDP link that is a question: `How do ratings and reviews work?` `[observed]`
- Two category-page filter-adjacent prompts that are not questions.

An authenticated or browser-rendered pass would be required. This is the single largest gap in this file.

## T13 Terminology & glossary

| Term | Zalando's usage | The alternative it rejected |
|---|---|---|
| `Size flags` | Per-product fit indicators | "fit notes", "sizing alerts" |
| `Size recommendations` | Personalised size advice | "size predictor" |
| `size advice` | The umbrella activity | |
| `Size & Fit` | The named in-house team **and** the PDP module | |
| `fitting models` | People employed to try on items and identify sizing issues | "fit models" (industry term) |
| `your sizes` | The customer-profile section holding size data | "size profile", "measurements" |
| `size reference items` | Garments the customer already owns that fit well | — genuinely novel |
| `fit feedback` | Post-purchase input on how an item fitted | "review", "rating" |
| `size reminder` | A notification type: tell me when my size returns | "back in stock alert" |
| `size-related returns` | The measured problem category | "fit returns" |
| `Size Advice with Body Measurements` | The photo-based measurement feature | |
| `virtual fitting room` | The 3D-avatar roadmap item | "virtual try-on" |
| `Specialty sizes` | The filter group for Petite/Tall/Plus/Maternity/Adaptive | "inclusive sizing" |
| `voluntary right of return` | The 30-day commercial policy | "returns policy" |
| `statutory right of revocation` / `right to cancel` | The 14-day legal right | — kept deliberately separate |
| `Withdrawal` | The IE/DE footer label for the same statutory right | — **a third name for the second concept** |
| `ideal condition` | Internal return-grading class, quoted publicly | "resaleable" |
| `Zalando merchandise` / `Zalando partner merchandise` | The own-retail vs marketplace split | "sold by Zalando" / "sold by partner" |
| `bag` | The cart | "basket" (UK convention) |
| `Lounge by Zalando` | The off-price shopping club | "outlet" |
| `ZEOS` · `Connected Retail` · `Zalando Plus` | Named platform and service programmes | |

**The size-and-fit vocabulary is the reason this product is in the corpus, and it is a genuinely designed system.** Five coined terms cover five distinct moments: `Size flags` (what the item does), `Size recommendations` (what you should pick), `your sizes` (what we know about you), `size reference items` (what you already own), `fit feedback` (what happened). Most retailers have one word — "size guide" — for all five.

**The canonical "true to size" framing** `[documented]`, from the corporate page, is the single most quotable passage in this file:

> `Size flags inform customers if an item is true to size or not. Based on this, we provide any necessary advice: "the size runs small so we recommend going one size up", "the size runs large so we recommend going one size down".`

Three attested descriptors: `true to size` · `the size runs small so we recommend going one size up` · `the size runs large so we recommend going one size down`.

Note the construction of the two advice strings: **observation, then recommendation, joined by "so".** Not "Runs small — size up", which is an instruction the user must trust, but a causal sentence where the reason precedes the action. It is longer than it needs to be and that is the point — the customer can evaluate the logic rather than merely obey it.

Also note what Zalando does *not* say: there is no "we recommend" without a stated reason, and no fit descriptor without a corresponding action. Every flag resolves to a decision.

**A naming problem worth recording.** The statutory 14-day right is called `right to cancel` in the UK T&Cs, `right of revocation` in the attached document name (`Information regarding the right of revocation`), and `Withdrawal` in the Irish and German footers. Three names for one non-waivable legal right, across markets that share a language.

**And the gift card has five treatments on one page** `[observed]`: H1 `Gift cards` · `<title>` `Gift Vouchers for Fashion Lovers | ZALANDO` · footer `Gift Cards` · T&Cs `Zalando Gift Cards` · URL `/giftvouchers/`.

## T14 Voice, tone & accessibility

**Person and register.** Second person for the customer, first-person plural for Zalando, used actively in the terms (`We will bear the costs`, `We do not offer exchanges`, `We hereby reserve the right`). The T&Cs are unusually readable for a legal document — short sentences, second person, and a plain-language summary block at the top of the page that restates each section before the clause itself.

**The two-register terms page is the notable structural choice.** Section 6 of the summary asks (`Please help us to avoid unnecessary costs by always using the QR code…`); clause 8 obliges (`otherwise you will be required to pay the return shipping costs`). Same rule, stated as a request for the reader who is scanning and as an obligation for the reader who is litigating.

**Marketing copy is sparse and noun-led.** `Standards matter.` · `Deals, drops and trends` · `Explore what makes this special` · `This is one of our most popular items this month`. Almost no adjectives, no exclamation marks outside the newsletter block.

**Accessibility statement — the most accountable in this batch** `[observed]`

Headings, in order: `Compliance Status` · `Supported Accessibility Features` · `Known Limitations and Areas for Improvement` · `Technical Specifications` · `Feedback`

Named standards, verbatim:
> `We target compliance with the Web Content Accessibility Guidelines (WCAG) Version 2.2 Level AA and the EN 301 549 v.3.2.1 European standard.`

Conformance claim, verbatim:
> `Based on an external audit conducted in May 2026, the Zalando website is currently partially in line with these standards. While many of our core features are fully functional, several criteria are not yet fully met. We are actively addressing these outstanding compliance areas to provide a fully inclusive experience.`

Supported-feature labels: `Screen Reader` · `Keyboard Navigation` · `Bypass Navigation (Skip Links)` · `Text Size and Zoom:` · `Use of Color and Contrast:` — with specifics such as `A "Skip to main content" link is active at the very top of each page` and a commitment that responsive layouts `support browser magnification up to 200%, dynamically reflowing page content to keep text highly readable without truncation, visual overlap, or horizontal scrolling.`

**Known limitations — six named open defect classes**: `Alternative Text for Linked Images` · `Semantic Structure and Heading Hierarchy` · `Form Usability and Error Handling` · `Keyboard Focus and Traps` · `User Preferences` · `Video Content`. Including, verbatim: `We are actively addressing forms that lack proper programmatic labels or clear error feedback. Our focus is on providing explicit, text-based error messages that are directly linked to their corresponding fields` and `We are developing support for a dark mode feature`.

Technical specs: `HTML` · `WAI-ARIA` · `CSS` · `JavaScript`, plus a recommendation of modern browsers with `NVDA, VoiceOver, and Talkback`. Date-stamped: `This statement was last updated on: June 5, 2026`.

**This is the model.** Named standard with version and level; named European standard; an external audit with a month; an honest *partial* conformance claim; six specific open defect classes rather than a generic "we are working on it"; a date stamp. Compare Target, which names no standard at all. **Publishing your own known defects is the thing almost nobody does, and it is what makes the rest of the statement credible.**

**But the statement's own execution undercuts it** `[observed]`:

- The page has **no H1** — it opens on an H2. On a page that names `Semantic Structure and Heading Hierarchy` as a known limitation.
- The feedback route (`contact our support team`) leads to a client-rendered FAQ that renders as `Faq` — the escalation path for accessibility issues is itself inaccessible without JavaScript.
- That link carries a stray `?_rfl=fr` parameter on a UK page.
- The statement is US-spelled (`Color`, `prioritize`, `optimizing`) on a domain that uses `Colour` in its own filter labels — authored centrally and not localised.

**Other accessibility findings** `[observed]`

- Accessibility-label leakage into visible text: `Current Selected colorColour: mottled beige` — the visually-hidden prefix is concatenated with the visible label in the fetched DOM. Note also that it contains both `color` and `Colour`.
- Colour-swatch a11y labels are well-formed: `Selected, black` / `Unselected, red`
- Carousel bypass controls exist but are phrased three ways: `Skip forwards over the carousel of products` / `Skip backwards over the carousel of products` / `Skip forwards over a carousel of items`
- `GO TO TOPGo to top` — duplicated accessible text on the back-to-top control
- Price rendering runs together: `From£99.95`, `From£5.00`, `£23.00£32.99VAT included`
- `zalando.ie`'s `Pre-owned` nav item has `href="#"` — a dead link in the primary navigation
- **The entire help centre renders as the word `Faq` without JavaScript** — see T11

---

## Transferable patterns

1. **Stamp every measurement with the size it was taken on.** `19.0 " (Size S)`, `8.0 " (Size 4)`. A garment dimension without its reference size cannot be acted on. This is the cheapest high-value fix in fit content and almost nobody ships it.
2. **Keep the commercial policy and the statutory right visibly separate.** `voluntary right of return` (30 days, advertised) alongside `statutory right to cancel` (14 days, non-waivable), with the explicit line `Your statutory right of cancellation remains unaffected by this.` Directly applicable to PayPal's buyer protection versus statutory chargeback rights, where conflating the two produces exactly the disputes this structure prevents.
3. **Write fit advice as observation-then-recommendation joined by "so".** `the size runs small so we recommend going one size up` — longer than "Runs small, size up", and better, because the customer can evaluate the reasoning instead of obeying an instruction. Transfers to any recommendation surface where trust is not yet established.
4. **`size reference items` — calibrate against what the user already owns.** Asking "name something that fits you" is answerable; asking for measurements is not. Reframing an unanswerable input question into an answerable one is the general move.
5. **Make the blocking instruction the button label.** `Choose your size` occupies the same control that will become `Add to bag`. No error state is needed because the invalid action is never offered.
6. **Name the auth cost inside the link.** `See more (you'll need to sign in)`.
7. **Publish your own known accessibility defects.** Six named open classes plus an external audit date is what makes a conformance claim believable. But — negative lesson — **ship the statement to its own standard**: a no-H1 accessibility page that lists heading hierarchy as a known defect, with an escalation link that does not render without JavaScript, spends the credibility it just earned.
8. **Negative lesson on returns-abuse copy.** Zalando reserves the harshest sanction in this batch (exclusion from purchasing for up to 12 months) against the vaguest trigger (`conspicuously high`, `abusive`). A user cannot self-regulate against an undefined standard. If the sanction is severe, the threshold must be stated — as ASOS does.

## Caveats & gaps

- **BLOCKED: the entire help centre.** FAQ article bodies are client-rendered on `zalando.co.uk`, `zalando.ie` and `en.zalando.de` alike; the article region returns the bare word `Faq` with no server-rendered fallback. **Zero verbatim FAQ questions and zero FAQ answers are in this file.** T12 is `[absent]` in full.
- **BLOCKED: the size guide.** `/size-guide/` and `/sizeguide/` return empty bodies — no such page exists. The measurement tables are inside a client-rendered modal behind `Open size guide`. The trigger label is captured; the guide is not.
- **BLOCKED: fit-assistant copy.** The entry point is server-rendered as a bare, anchor-text-free link (`/assistant?product_id=…`). None of its strings were retrievable.
- **BLOCKED: returns-status UI.** `/returns/articles` is auth-gated and returned empty. **The only return-status string attested anywhere is `successfully completed`, sourced from the Privacy Notice.** `Return registered`, `Parcel received` and `Refund issued` were specifically looked for and **no evidence was found** — they are not in this file and should not be attributed to Zalando on the basis of it.
- **Filter values and sort labels do not server-render.** Filter *group* names are captured; not one size-filter value was retrievable. The three sort options in T5 come from T&Cs prose and are marked `[documented]`, not `[observed]`.
- **No error strings, no form-validation copy, no 404 page** were reachable. T7's recovery content is entirely policy prose.
- **Locale sampling is shallow.** Three markets of 28 were compared (UK, IE, DE-English). The differences found (thresholds, casing, carrier, payment methods, newsletter labels, footer composition) are real but are a sample, not a survey. No non-English market was examined.
- **Only three PDPs were inspected**, all UK, two of them Zalando private label. Marketplace-partner PDPs may carry different `Size & fit` completeness.
- Most pages in this file were captured through a delegated fetch pass using the same public `web_fetch` route; strings are verbatim as returned but were not re-verified against a second fetch.

## Sources

1. https://www.zalando.com/
2. https://www.zalando.co.uk/accessibility-statement/
3. https://www.zalando.co.uk/zalando-terms/
4. https://www.zalando.co.uk/zalando-privacy-policy/
5. https://www.zalando.co.uk/giftvouchers/
6. https://www.zalando.co.uk/womens-clothing/
7. https://www.zalando.co.uk/evenandodd-jumper-mottled-beige-ev421i0jh-b11.html
8. https://www.zalando.co.uk/evenandodd-by-zalando-winter-boots-taupe-ev411n0pp-o11.html
9. https://corporate.zalando.com/en/about-us/what-we-do/how-zalando-leverages-technology-help-customers-find-right-size
10. https://corporate.zalando.com/en (returns explainer)
11. https://www.zalando.co.uk/faq/ *(chrome only)*
12. https://www.zalando.co.uk/faq/what-is-your-return-policy.html *(chrome only)*
13. https://www.zalando.co.uk/faq/how-can-I-return-my-order.html *(chrome only)*
14. https://www.zalando.co.uk/faq/where-is-my-parcel.html *(chrome only)*
15. https://www.zalando.co.uk/faq/Sizing *(chrome only)*
16. https://www.zalando.ie/faq/ and https://en.zalando.de/faq/what-is-your-return-policy.html *(chrome only)*
