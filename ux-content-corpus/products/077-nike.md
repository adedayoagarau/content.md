# 077. Nike

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Athletic apparel and footwear (DTC + free membership programme + scarcity/launch platform) |
| Primary URL | https://www.nike.com/ |
| Corpus rank | 077 |
| Benchmark strength (source list) | Product selection and membership |
| Locale / market observed | en-US (`nike.com` default; ~100 market/language pairs enumerated in the footer) |
| Platform observed | Web (desktop), help centre, SNKRS web (`nike.com/launch`), accessibility hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for financial regulation. Visible regimes: CA Supply Chains Act statement, "Your Privacy Choices" (US state privacy), per-market accessibility statements across 37 European market/language pairs |
| Harvest date | 2026-09-21 |
| Pages inspected | 18 |
| Harvest completeness | Full for the help centre, membership and SNKRS rules. Partial for SNKRS product surfaces — drop-state strings (countdown, entry, sold-out) are client-rendered and were not retrievable. Size-chart tables live at `nike.com/size-fit/*` and were not opened; no measurement labels captured. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help hub | https://www.nike.com/help | Six "Quick Assists" groups; the top-level help IA |
| Size charts | https://www.nike.com/help/a/size-charts | Fit-finding guidance; links out to the actual charts |
| Return policy | https://www.nike.com/help/a/returns-policy | 60-day window, exclusions, return-database disclosure |
| How to return | https://www.nike.com/help/a/how-to-return | Member/Guest return split, UPS QR mechanics |
| Refund info | https://www.nike.com/help/a/refund-info | Refund timing by payment method |
| Order tracking | https://www.nike.com/help/a/order-tracking | Richest source of shipping-state vocabulary |
| Shipping & delivery | https://www.nike.com/help/a/shipping-delivery | Named shipping tiers and Member/Guest price pairs |
| Store pickup | https://www.nike.com/help/a/store-pickup | Pickup flow, hold window, QR/Member Pass |
| Change or cancel order | https://www.nike.com/help/a/change-cancel-order | 30-minute cancel window; unavailable-state string |
| SNKRS Draw (how to join) | https://www.nike.com/help/a/nike-snkrs-draw | Draw mechanics and FAQ |
| SNKRS Draw rules | https://www.nike.com/help/a/nike-launch-drawing | Nine-rule terms block |
| SNKRS Pass | https://www.nike.com/help/a/nike-snkrs-pass | Reservation states, ID requirements, geofencing |
| Membership | https://www.nike.com/membership | Benefit naming, tier-free structure, FAQ |
| SNKRS launch calendar | https://www.nike.com/launch | Feed/In Stock/Upcoming tabs; release-date card grammar |
| Accessibility | https://www.nike.com/accessibility | WCAG claim, EasyOn, alt-text exemplar |
| Shipping info hub | https://www.nike.com/help/a/shipping-delivery-info-all | Question-as-navigation hub |
| Returns info hub | https://www.nike.com/help/a/returns-info-all | Question-as-navigation hub |
| Member benefits (help) | https://www.nike.com/help/a/member-benefits | Membership explained inside the help centre |

---

## T1 Navigation & IA labels

**Global nav is audience-and-brand, not category** `[observed]`

`Men` · `Women` · `Kids` · `Jordan` · `NikeSKIMS` · `Sport` · `Sportswear`

Note the mixed logic: three demographics, two sub-brands, one activity umbrella, one product line. `Sport` expands to a sport list (`Basketball`, `Court`, `Soccer`, `Training`, `Running`, `Golf`, `More Sports`, `Locker Room`, `All Conditions Gear`) while `Men` expands to product types. Two different mental models live one click apart.

**Utility nav names the membership as a verb** `[observed]`: `Find a Store` · `Help` · `Join Us` · `Sign In`. `Join Us` rather than `Sign Up` or `Register` — the acquisition CTA is phrased as an invitation to a group, consistent with the membership framing throughout.

**Help centre top level — six groups, called `Quick Assists`** `[observed]`

`Returns & Exchanges` · `Shipping & Delivery` · `Orders & Payment` · `Shopping` · `Nike Membership & Apps` · `Company Info`

Each group holds exactly three questions plus a `View all`. The constraint is visible and useful: Nike has decided that three questions answer most of each topic, and everything else is one click down. The section label `Quick Assists` is a coined term for what most sites call "Popular questions".

Each group's scope line is a single sentence: "Answers to our most frequently asked questions are just one click away."

**Casing inconsistency across two sibling hubs** `[observed]`: the same tile set renders as `Orders & Payments` on `/shipping-delivery-info-all` and `Orders & Payment` on `/returns-info-all`. One is wrong; both shipped.

**SNKRS has its own IA** `[observed]`: `Feed` · `In Stock` · `Upcoming` · `Maps`, with the header identifying the surface as `Nike SNKRS Web` and offering `Visit Nike.com` as an escape hatch. Treating SNKRS as a separate property with its own nav, its own sign-in prompt (`Join / Log In`) and a link *back* to the main store is a deliberate separation of the scarcity experience from the catalogue experience.

## T2 Value proposition & headline patterns

**The membership hero is a comparative, not a claim** `[observed]`

> `IT'S BETTER AS A MEMBER`
> `Move, Shop, Customize and Celebrate with the best of Nike.`

The headline does not say what membership *is*; it says the same thing you were already going to do is improved. The subhead is four verbs, capitalised, matching the four benefit categories below.

**Benefit cards use `<Name>` + `<Verb> With Us`** `[observed]`

- `Sports & Wellness` — `Move With Us`
- `Member Product` — `Shop With Us`
- `Member Rewards` — `Celebrate With Us`
- `Nike By You` — `Create With Us`
- `SNKRS` — `Explore With Us`

Five nouns, five verb phrases, all ending `With Us`. This is a rigid template and it works: the card name tells you the category, the tagline tells you the posture. `Celebrate With Us` for a rewards programme is the standout — it reframes a discount as an occasion.

**Second-tier benefits are named, then defined in one sentence** `[observed]`

- `Free Shipping` — `Members score free delivery on every $50+ order.`
- `Wear Test` — `Not sure? Try it for 60 days—return if it's not a fit.`
- `Receiptless Returns` — `Return or exchange receipt-free in-store or in the Nike App.`
- `Member Experiences` — `Join your community for live, Member-only events.`
- `Nike Experts` — `Members can get sport and style advice from experts.`

`Wear Test` is the most transferable naming decision on the page. Nike has taken a returns policy (60 days) and given it a **product name that describes the user's activity rather than the company's concession**. The same 60 days framed as "60-day returns" is a refund policy; framed as `Wear Test` it is a feature. The definition line then opens with the user's actual thought: `Not sure?`

**Help-article titles are the user's question, in full** `[observed]`

`What Is Nike's Return Policy?` · `Where Is My Nike Order?` · `Where Is My Refund?` · `Can I Cancel or Change My Nike Order?` · `How Do I Find the Right Size and Fit?` · `Can I Buy Online and Pick Up at a Nike Store?` · `What Is Nike SNKRS Pass?` · `How Can I Join a SNKRS Draw?`

Title Case throughout, always a complete interrogative, always including the brand noun (`my Nike order`, not `my order`). The brand noun is doing SEO work but it also disambiguates for a user who has several retailers' packages in flight.

**Shipping options get three-word promo headings** `[observed]`: `Ship It Free` · `Get It Fast` · `Pick It Up` — imperative, three syllables each, arranged as a rhythmic set. Below them, the *actual* option names are flat: `Standard Shipping`, `Faster Shipping`, `Fastest Shipping`. **Two registers on one page**: marketing headings for the browse state, plain comparatives for the decision state.

`Standard / Faster / Fastest` is itself notable — a comparative ladder where most retailers use `Standard / Express / Overnight`. It communicates relative speed without promising an absolute, which avoids a claim Nike would have to bound.

## T3 CTA inventory

The dominant pattern is **Member/Guest CTA pairing** — nearly every transactional action ships as two buttons.

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Check Member Order Status` / `Check Guest Order Status` | Order tracking | Paired |
| `Cancel Member Order` / `Cancel Guest Order` | Cancel article | Paired |
| `Return a Member Order` / `Return a Guest Order` | Returns hub | Paired |
| `Start a Free Member Return or Exchange` / `Start a Guest Return` | How-to-return | Paired — and note the Member version advertises `Free` inside the button |
| `Join Us` | Global nav | Acquisition |
| `Sign Up` | Membership page (×4), help hub | Second label for the same action as `Join Us` |
| `Sign In` | Global nav, shipping article | |
| `Explore` | Membership app cards | |
| `Celebrate` | Nike By You card | Verb varies by card |
| `View Nike Size Charts` | Size-charts article | Object named |
| `Shop Nike` | Several articles | |
| `Find a Nike Store` / `Find a Store` | Returns, help footer | **Two labels for one destination** |
| `Learn How To Return or Exchange` | Return policy | Long, fully specific |
| `Go to Checkout` | Store pickup | |
| `Shop Your Store` | Store pickup (heading and CTA) | Possessive — the store is the user's |
| `Learn More` | Shipping promo cards (×2) | The bare CTA |
| `Load More` | SNKRS feed | |
| `Skip to main content` | Top of DOM | Accessibility |
| `Accessibility at Nike` | Header, every page | An accessibility statement linked from the *header*, not the footer |
| `Email Accessibility at Nike` | Accessibility page | mailto: accessibility@nike.com |
| `Shop the Collection` | Accessibility page, EasyOn | |
| `Explore Careers at Nike` | Accessibility page | |
| `Send Us Feedback` / `Site Feedback` | Help nav / footer | Two labels, one anchor |

**Named in-product controls quoted inside help copy** `[documented]`: `View or Manage` · `Track Shipment` · `Start a Return or Exchange` · `View Return` · `UPS Dropoff` · `Get a QR Code` · `Cancel Order` · `Pick Up` (checkout delivery method) · `Pick Up Today` (browse toggle) · `Pickup` (product-page section) · `Size Guide` (product-page link).

**Observation:** Nike ships `Learn More` bare in exactly two places, both on the shipping page where the adjacent card heading supplies the object. Everywhere else the CTA names its destination. But it also ships `Find a Nike Store` and `Find a Store` on the same page, and `Join Us` / `Sign Up` for the same action in the same session.

## T4 Onboarding & getting-started

Nike has no signup wizard on public surfaces. The onboarding content is entirely **mechanism explanation for scarcity products**, which is where the interesting work is.

**SNKRS Draw — five numbered steps, each a full sentence** `[documented]`

1. Future draws appear in the `"Upcoming"` feed; push notifications fire to Members who enabled them when the draw opens.
2. Desktop entrants must be signed in to their Nike Member profile.
3. `Each Draw is only open for a limited time. The product page will display a countdown clock to show how much time is left.`
4. Choose shoe and size; payment info must be current `so we can pre-authorize your purchase should you be selected. You'll only be charged if you are selected.`
5. `Once the countdown clock hits zero, within 24 hours we'll email purchase information and order confirmations to those who were selected. We'll also let you know if you weren't selected.`

Three content decisions worth isolating. **The charge model is stated at the step where the anxiety is** (step 4, at the moment payment details are requested) rather than in a footnote. **The losing outcome is explicitly promised a message** — `We'll also let you know if you weren't selected` — which is the single most important sentence in a scarcity flow and the one most often omitted. And **the time bound is given twice**, once as a mechanism (countdown clock) and once as a commitment (`within 24 hours`).

**SNKRS Pass — a reservation flow with named screens** `[documented]`

Offers surface in the `SNKRS Feed` → a limited window to `submit your size request` if a participating location is within radius → random selection → the `"Reserved for Pickup"` screen → on pickup day it converts to an `active SNKRS Pass` containing a QR code → present QR, valid photo ID and payment at the store.

`Reserved for Pickup` is a genuinely well-named intermediate state: it tells the user they have won *and* that they have not yet bought. Most systems would use "Congratulations" or "Confirmed", both of which overstate.

**Store pickup — flow stated as consequences, not steps** `[documented]`: select `Pick Up` at checkout → choose a participating store and confirm contact info → `items are generally ready for pickup within two hours` → `we'll email you a QR code when it's ready` → collect within seven days at `the store's pickup desk` with `your photo ID and the code to scan`.

## T5 Form & field labels

The public help surface exposes few live form controls; what it does expose is **the minimum identity a guest must supply**.

| Label / field (verbatim) | Context | Notes |
|---|---|---|
| `What can we help you with?` | Help search, rendered twice per page | Search placeholder as a question |
| `order number` + `email address` | Guest lookup, quoted across five articles | The universal guest key |
| `Size Guide` | Product-page link name | The entry to the chart |
| `size section` | Named region of a product page | Nike refers to page regions by name in help copy |
| `Pick Up` | Checkout delivery-method option | |
| `Pick Up Today` | Browse filter toggle | |
| `Substitutions` | — | `[absent]` — no such concept |
| Size chart columns / measurement labels | — | `[absent]` — the charts live at `nike.com/size-fit/*`, not opened this pass |

**Sizing guidance in lieu of a form** `[documented]`. The `How Do I Find the Right Size and Fit?` article routes by audience — `men, women, unisex, kids, and accessories` — and answers four sub-questions rather than presenting a single chart: `What size bra do I need?`, `Where do I find a Jordan size chart?`, `Where do I find a Converse size chart?`, `Where can I find soccer size and fit resources?`

The Converse answer carries the only fit-warning language captured: it warns that some styles run large, and says any half-size-down advice appears in the product's own size section. Nike puts the **per-product fit exception on the product**, not in the global guide — the guide's job is routing.

**Note the absence.** For a footwear brand, there is no public fit questionnaire, no "true to size" flag, no fit-assistant equivalent to ASOS's or Zalando's. The `Wear Test` benefit is doing that work instead: rather than predicting fit before purchase, Nike removes the cost of getting it wrong. That is a content-strategy choice with a business model behind it, and it is the sharpest contrast in this batch.

## T6 Status & state language

**Shipping and order states** `[documented]`, from the order-tracking article — the richest status page in this file.

| State / phrase (verbatim) | Notes |
|---|---|
| `label created` | Quoted in Nike's own quotation marks, twice. A carrier-system state leaking into customer UI |
| `estimated delivery date` | Given at checkout, in the confirmation email, and at tracking |
| `delivered` | `If your entire order shows as delivered…` |
| `delivery notification` | The event, distinct from the state |
| `shipping confirmation email` | |
| `tracking number` · `carrier` | |
| `initial authorization` · `temporary hold on funds` | Payment states, named in the cancellation article |
| `Reserved for Pickup` | SNKRS Pass, capitalised, quoted |
| `active SNKRS Pass` | The converted state |
| `size request` / `submit your size request` | SNKRS Pass pre-selection state |
| `pickup window` · `pickup date and location` | |
| `submission` · `winning submissions` | SNKRS Draw |
| `In Stock` · `Upcoming` · `Release Date` | SNKRS feed tabs and card grammar |

**The `label created` article is the standout, and it is the Wise reconciling-article pattern executed precisely** `[observed]`:

> `My order tracking information says "label created," but it isn't updating—why not?`

Nike's answer: the label is generated at packing, the carrier has not yet scanned it, `which can take up to 72 hours`. Rather than rename the state, Nike wrote the article that reconciles a technically-true system state with the user's experience of nothing happening — and bounded the wait with a number.

**Timing vocabulary inventory** `[documented]`: `within two hours` (store pickup ready) · `up to 72 hours` (carrier first scan) · `within 24 hours` (SNKRS Draw result, and gift-card refund) · `within six business days` (return processing) · `Up to 10 additional days` (card/Apple Pay/PayPal refund) · `within 30 minutes` (cancel window) · `within 21 days` (UPS return drop-off) · `seven days` (pickup hold) · `60 days` (return window) · `between 30-45 days` (APO/FPO military mail).

**Refund timing is tabulated by payment method** `[documented]`:
- `Once we receive your return, we'll process it and issue a refund within six business days.`
- `Credit and debit cards, Apple Pay, and PayPal: Up to 10 additional days`
- `Nike gift cards and Nike product vouchers: Usually within 24 hours`
- `Klarna: If you paid with Klarna, they will issue your refund`

Note the last row breaks the pattern — it gives no timing at all and instead hands off (`please contact Klarna directly with refund questions`). Honest, and better than inventing a number Nike does not control.

**Named shipping and fulfilment options** `[observed]`: `Standard Shipping` · `Faster Shipping` · `Fastest Shipping` · `Nike Store Pickup` · `Ship to a Pickup Location` · `USPS Military Mail`. Each of the first three carries a paired Member/Guest price:

- Standard — `Nike Members: Free for orders of $50 or more, $5 for orders less than $50` / `Guests: Free for orders of $75 or more, $8 for orders less than $75`
- Faster — `Nike Members: $15` / `Guests: $20`
- Fastest — `Nike Members: $25` / `Guests: $30`

**Return options** `[documented]`: `UPS return QR code` / `UPS return code` *(two names, one object)* · `Printed label` · `The UPS Store` · `UPS Access Point` · `schedule a UPS pickup (for a fee)` · `pre-paid label` · `return order number`.

## T7 Error, failure & recovery

**The single clearest unavailable-state string** `[documented]`, from the cancellation article:

> `If you don't see the cancel button, your order is no longer eligible to be canceled.`

This is exemplary. It names the **absent affordance** as the diagnostic. The user's actual experience is "I can't find the button"; Nike converts that into a definitive answer rather than making them hunt. It is followed by an unusually blunt closure: `After 30 minutes, even our Nike representatives cannot cancel the order.` — pre-empting the escalation attempt by naming the escalation path and closing it.

**Failure articles name the cause list** `[documented]`, from `Why is my order delayed?`: high order volume, severe weather, incomplete address, regional service delays. Four causes, no apology paragraph, no "we're sorry for any inconvenience".

**The delivered-but-missing case has a bounded waiting instruction** `[documented]`: `What should I do if my order status indicates it's been delivered but I didn't receive it?` → wait up to 24 hours past the notification or the estimated date, check delivery locations (`front porch, mailbox, etc.`), then contact. The waiting period is specified rather than implied, which is what keeps it from feeling like a brush-off.

**Partial-delivery failure is pre-explained** `[documented]`: `Why was only part of my order delivered?` — multiple items can ship separately; check all delivery locations; then contact.

**Wrong / damaged / missing item** `[documented]`: `What should I do if I receive the wrong item, or if an item is damaged or missing?` — a **compound question covering three distinct failures in one title**. The answer differentiates: for wrong or damaged, return the delivered item and reorder (Members may be able to exchange); for missing, first check whether it shipped in a second parcel, then contact.

Worth flagging: the remedy for "wrong item" is **return and reorder**, not "we'll send the right one." Nike is honest that the system has no swap primitive, which is a real content-design constraint disclosed rather than hidden.

**Recovery friction disclosed at the point of the constraint** `[documented]`: `Can orders be returned without using the Nike return shipping label?` → yes, `but write the return order number on at least two sides of the package to avoid delays.` A workaround plus the specific manual step that makes it work.

**Scarcity-specific failure copy** `[documented]` — the hardest register problem in this file, because the failure is a loss and Nike caused it deliberately:

- `What happens if I'm not selected?` → `You won't be able to purchase the shoes if you're not selected.` Then: keep an eye on the `"Upcoming"` feed, enable push notifications, bookmark SNKRS.
- `What if I don't see any pickup locations nearby - can I still enter for the SNKRS Pass?` → if no nearby locations are listed, you are not eligible for that Pass.
- `What happens if I miss my SNKRS Pass pickup window?` → the Pass expires and you lose access to the shoes.
- `Once I join a SNKRS Pass drawing, can I change the shoe size or store location?` → no; update your profile *before* submitting.
- `Can I change the shoe size I requested?` → `Sizing can't be changed once your entry has been submitted. Be sure to choose carefully before entering.`

The register here is **flat, immediate, and never consoling**. No "unfortunately", no "we know this is disappointing", no alternative offered as a softener. The recovery offered is always the same: the next drop. For a scarcity product this is correct — sympathy would read as insincere from the party that manufactured the scarcity — but it is the sharpest example in this corpus of tone flattening as emotional stakes rise.

**Pre-emptive recovery at the point of irreversibility** `[documented]`: `Be sure to choose carefully before entering.` and, for the ID-name mismatch case, `Names must match exactly; edit your SNKRS profile before submitting.` Both are warnings placed in the FAQ that *answers the mistake*, which is late. A content designer would want these in the entry flow.

**Live markup defect flagged as a genuine error state** `[observed]`: on `/help/a/shipping-delivery-info-all`, the question link `How do I get free shipping on Nike orders?` renders as **three adjacent link fragments** — `How do I get free shi` / `pping on Nike o` / `rders?` — all pointing to the same URL. To a screen reader this is three links with meaningless names.

## T8 Empty states

`[absent]` for true no-data states — these live behind authentication (empty bag, no orders, no favourites) and were not observable.

Two adjacent findings:

- **Bag count as accessible name** `[observed]`: the bag link's accessible name is `Bag Items: 0` — the zero state is expressed in the control's label rather than as separate copy.
- **SNKRS drop states not retrievable** `[observed]`: the `/launch` feed server-renders card titles and release dates but no drop-state strings (countdown, `Notify Me`, entered, sold out). Those are client-rendered on product detail pages. No strings invented.

## T9 Notifications & system messages

**Push notification is positioned as a prerequisite, not a preference** `[documented]`. Across the SNKRS articles, enabling notifications is stated as the mechanism by which the user finds out a draw has opened:

- `download the SNKRS App and enable notifications to make sure you don't miss out`
- `When the Draw opens, we'll send push notifications to Members who have notifications enabled.`
- `Keep an eye on the "Upcoming" feed in the SNKRS App and enable push notifications to make sure you don't miss the next SNKRS Draw.`

The conditional clause (`who have notifications enabled`) is repeated each time — Nike is bounding its own commitment rather than implying everyone gets told.

**Device permission is explained by its purpose** `[documented]`: SNKRS Pass uses the device's GPS, so location services and push must be enabled. The permission ask is justified by the geofence requirement (`You must live within a certain location radius of the store to be able to join.`) rather than asserted.

**Transactional emails named as the notification channel** `[documented]`: shipping confirmation email with tracking link; a separate email when a store-pickup order is ready, containing the QR code; an email reminder before the seven-day pickup window lapses; draw results emailed `within 24 hours` to selected entrants and, separately, to those not selected.

**Contact block is repeated on every help page, with hours** `[observed]`

> `Need more help? Contact us.`
> `Chat with Us` — `Products & Orders` / `4 am - 11 pm PT` / `7 days a week`
> `Call Us` — `1-800-806-6453` / `4 am - 11 pm PT` / `7 days a week`
> `Find a Store`

Three routes, each with its scope and hours stated inline. Chat first, phone second, store third — and unlike most help centres, the phone number is printed rather than gated.

**Defect** `[observed]`: the icon labels render as literal text in the DOM — `Chat Icon`, `Phone Icon`, `Store Icon` — which a screen reader will announce as content.

## T10 Disclosures, legal & compliance

**The return window is reframed as a product** `[observed]`

> `We give you 60 days to try out your Nike purchase to make sure it works for you.`
> `So go ahead, shop with confidence and enjoy your 60-day trial.`

Nike calls it a `60-day trial` and, on the membership page, `Wear Test`. Three names for the return window across two pages (`return policy`, `60-day trial`, `Wear Test`) — which is a naming inconsistency, but a deliberate one: the policy name in the policy article, the benefit name in the benefit page.

**Policy exclusions are single-sentence bullets** `[observed]`

- `Proof of purchase is required to return.`
- `Custom Jersey By You soccer jerseys cannot be returned or exchanged.`
- `Nike x LEGO® brick sets must be sealed and unopened to return.`
- `Returns are free for Nike Members.`

Then a footnote that redirects the out-of-channel case: `*Please note, if you purchased Nike items at another retailer, you'll need to return the purchase to that retailer.*` — repeated identically on both returns articles.

**A return-surveillance disclosure most retailers omit** `[observed]`, under the heading `Other Terms`. Summarised: Nike may require and electronically capture consumer identification information for returns and exchanges, maintains a database of return activity used only to authorise returns, states it does not sell that data, and reserves the right to limit returns and exchanges with or without receipts.

This is the compliance-UX standout for Nike. Publishing the existence of a return-activity database, stating its single permitted use, and explicitly disclaiming resale is the transparent version of a practice usually buried in terms of sale. Compare ASOS, which discloses the *consequences* of a high return rate (a fee) but frames it as fairness; Nike discloses the *data collection* and does not attach a fee to it.

**Shipping-fee disclosures are bounded claims** `[observed]`

- `Expedited shipping options may not be available for every order.`
- `Shipping fees are not refundable unless you receive an incorrect item.`
- `Shipping fees are calculated based on the order total after any discounts or promotions and before taxes.`

That third line resolves the single most common billing dispute (did my discount change my shipping threshold?) in fourteen words, before it is asked.

**Scope limits stated plainly** `[documented]`: no international shipping; no shipping to US territories, re-shippers or freight forwarders; no PO boxes (`Can I ship to a PO box?` → no, use a pickup location instead); standard and expedited times do not apply to `Nike By You` and `Converse Custom` orders; `Nike gift cards are not eligible for store pickup`; `SNKRS App orders are not eligible for store pickup`.

**SNKRS Draw rules — nine short sentences, all obligations** `[observed]`

- `A Nike Member profile, valid email address, and verified mobile phone number are required.`
- `One submission per person per launch product.`
- `We reserve the right to cancel winning submissions.`
- `Once submitted, a submission to the draw cannot be modified.`
- `Winning submissions are valid only for the consumer information, product, and size.`
- `Winning submissions are valid only during the specified timeframe on the launch date.`
- `You'll get free shipping on all winning orders of $50 or more and free 60-day returns.`
- `Submissions are not transferable.`
- `The drawing process is subject to change at any time at Nike's sole discretion.`

Eight of nine constrain the user; one (`You'll get free shipping…`) is a benefit, placed seventh — buried in the middle of the restrictions rather than led with. The last rule is the escape clause, placed last.

**The binding-commitment disclosure is stated in the FAQ, not the rules** `[documented]`: `Can I decline to purchase the shoes if I'm selected in the draw?` → `By joining the drawing, you are explicitly agreeing to purchase the shoes, should you be chosen.` This is the most consequential term in the whole draw mechanic and it lives in an accordion, not in the nine-rule list. Worth flagging as a placement problem.

**SNKRS Pass identity requirements** `[documented]`: `Driver's license`, `Student ID`, `Passport`, `Military ID`; one reservation and pickup per person per shoe style; reservations cannot be made at multiple stores; `Stores are not able to ship SNKRS Pass sneakers.`; `the SNKRS Pass is only valid on the device the reservation was originally made.`; `payment is collected during pickup at the store`.

## T11 Help-centre architecture

Two levels. Hub (`/help`) → six `Quick Assists` groups, three questions each plus `View all` → topic hubs (`/help/a/<topic>-info-all`) → articles (`/help/a/<slug>`).

**The topic hubs are navigation made entirely of questions** `[observed]`. `/help/a/returns-info-all` contains no prose at all — just `Return a Member Order` / `Return a Guest Order` / `Find a Nike Store` and five question links:

`What is Nike's return policy?` · `How do I return or exchange my Nike order?` · `Where is my refund?` · `Can I return Nike By You sneakers?` · `What is the Nike Member price adjustment policy?`

Plus a cross-link tile row: `Membership & Apps` · `Shopping` · `Shipping & Delivery` · `Orders & Payment` · `Company Info`. Every article in the centre carries this tile row, so the user can hop laterally without returning to the hub — a flat routing model rather than a tree.

**Article internal structure is consistent**: H1 as the question in Title Case → prose answer with sub-headings → `FAQs` accordion of related questions → `Related` link list → the sitewide contact block. The FAQ accordion inside an article that is itself an answer to a question is the interesting structural choice: the article answers the primary question, the accordion catches the six-to-twelve adjacent questions the answer provokes. `What Is Nike SNKRS Pass?` carries **twelve** accordion questions, which is where the real content density sits.

**Typos observed in live article titles** `[observed]`: `How long are the SNKR Pass pickup windows?` (missing S) and `Could the store to sell out of the shoes after I receive a SNKRS Pass?` (stray "to"). Both shipped.

## T12 FAQs

FAQ blocks are ubiquitous — every help article carries one, plus the membership page.

**Membership page FAQ — three questions, bolded** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What is Nike Membership? |
| 2 | Am I a Nike Member? |
| 3 | Is Nike Membership free? |

Three is unusually few, and the middle one is the reason the block exists. `Am I a Nike Member?` is a question almost no other loyalty programme answers, because most assume the user knows. Nike's answer — if you have ever logged into a Nike app, you already are — resolves a real ambiguity created by having five apps under one identity. **Asking the user's confusion as the question, rather than describing the enrolment rule, is the move.**

Q3 (`Is Nike Membership free?`) pre-empts the objection that the word "Membership" creates. Nike chose a word that implies a fee and then spends an FAQ slot undoing it.

**SNKRS Pass FAQ — twelve questions, ordered by anxiety** `[observed]`

Eligibility (`What if I don't see any pickup locations nearby…`) → irreversibility (`can I change the shoe size or store location?`) → payment mechanics (`Can I pay for the shoes in the SNKRS App?`) → the pickup checklist (`What do I need for pickup?`) → three identity edge cases (name mismatch, someone else picking up, multiple pairs) → three failure cases (store sells out, missed window, window length) → and finally the reassurance (`If I win the SNKRS Pass, am I obligated to purchase the shoes?` → no).

Ending an anxiety-ordered FAQ on the one question whose answer is reassuring is a deliberate sequencing choice, and it directly contradicts the SNKRS *Draw*, where the equivalent question (`Can I decline to purchase…`) is answered **yes you are obligated**. Two adjacent scarcity mechanics with opposite commitment models, and the difference is only discoverable by reading both FAQs.

**SNKRS Draw FAQ — five questions** `[observed]`: `Can I get free shipping for my Draw order?` · `Can I decline to purchase the shoes if I'm selected in the draw?` · `Can I change the shoe size I requested?` · `Can I enter the draw for different shoes?` · `What happens if I'm not selected?`

All five are `Can I …?` or `What happens if …?` — the two shapes a user reaches for when a system has taken control away from them.

**Size-charts FAQ — four questions, all routing** `[observed]`: `What size bra do I need?` · `Where do I find a Jordan size chart?` · `Where do I find a Converse size chart?` · `Where can I find soccer size and fit resources?` — three `Where do I find…` and one `What size…`. The article is a router, and its FAQ admits that.

## T13 Terminology & glossary

| Term | Nike's usage | The alternative it rejected |
|---|---|---|
| `Nike Member` / `Membership` | The free account tier, capitalised as a proper noun | "account holder", "customer" |
| `Guest` | The unauthenticated purchaser — used as a peer of Member, not a lesser state | "non-member", "unregistered" |
| `Join Us` | The signup CTA | "Create account", "Register" |
| `Wear Test` | The 60-day return window, as a benefit | "60-day returns" |
| `Receiptless Returns` | Returns without proof of purchase for Members | "no-receipt returns" |
| `Member Pass` | The in-app identity token used in store | "digital receipt", "loyalty card" |
| `Quick Assists` | The help hub's popular-questions module | "Popular topics", "FAQs" |
| `SNKRS Draw` | The lottery mechanic | "raffle", "ballot" |
| `SNKRS Pass` | The reservation-for-in-store-pickup mechanic | "reservation" |
| `submission` | A draw entry | "entry", "ticket" |
| `Reserved for Pickup` | The won-but-not-yet-purchased state | "Confirmed", "Congratulations" |
| `Nike By You` | Customisation service | "custom", "personalise" |
| `Custom Jersey By You` | Sub-branded customisation | |
| `Converse Custom` | The parallel Converse service — **not** "Converse By You" |
| `Nike EasyOn` / `EasyOn Collection` | Adaptive footwear line | "adaptive", "accessible" |
| `Standard / Faster / Fastest Shipping` | Speed tiers as comparatives | "Express / Overnight" |
| `Nike Clearance stores` | A named exclusion class, appearing in five articles | |
| `athlete*` | The asterisked brand construction on the accessibility page | "customer", "everyone" |
| `Shop Your Store` | Localised browse | "Shop in-store availability" |
| `Nike Disability & Friends Network` | Employee resource group | |
| `Enabling Accessibility` | Named internal programme | |

**The Member/Guest binary is the organising terminology of the whole site**, and it is worth dwelling on. `Guest` is used as a neutral peer term, not a downgrade — every transactional CTA ships in both forms, guests get their own order-lookup route keyed on `order number` + `email address`, and guest limitations are stated as facts rather than as pressure to convert. The upsell is carried entirely by the price pairs (`Members: Free for orders of $50 or more` / `Guests: Free for orders of $75 or more`), which let the differential do the persuading. No interstitials, no "sign up to continue".

Compare Target, which uses `guest` to mean *all* customers, and ASOS, where `guest` carries an explicit £3.95 returns fee. Three retailers, three incompatible meanings for one word.

## T14 Voice, tone & accessibility

**Person and register.** Second person for the user; first-person plural for the company, used actively in adverse copy (`We reserve the right to cancel winning submissions`, `we'll let you know if you weren't selected`). Title Case for headings and article titles; sentence case for body. Contractions used freely.

**Sport-register bleed.** The brand voice leaks into functional copy in a few controlled places: `If you score the W` (SNKRS Pass), `Ready to get in the game?` (SNKRS Draw), `Members score free delivery`, `As the heat index of a SNKRS release goes up, the competition to grab our most exclusive styles goes up even more.` It is dense on the SNKRS surfaces and **absent from returns, refunds and cancellation copy**. A clean register gradient.

**The fairness frame around scarcity** `[observed]`. Nike repeats one justification: `We use SNKRS Draw to give Nike Members a fair chance to reserve and buy a pair of these limited-edition shoes.` and `to give all Nike Members a fair chance to grab pair` (meta description, missing "a" — verbatim). The lottery is not presented as a marketing device but as the *remedy* for a demand problem. Whether or not one accepts that, it is the consistent framing, and it is what licenses the flat, unapologetic loss copy elsewhere.

**Accessibility content — the strongest in this batch** `[observed]`

- `Accessibility at Nike` is linked in the **header** of every page, adjacent to the skip link — not buried in the footer
- `Skip to main content` present, first in DOM
- Named standard, verbatim: `WCAG 2.1 AA`, as a section heading, with the statement that Nike measures its digital assets against it as the international standard
- Page headings: `Compliance Status`-equivalent sections are `Striving Towards Global Regulations Compliance`, `Digital Accessibility Strategy and Actions`, `Accessibility Statements Around the World`
- Statement substance: regular testing to maintain conformance; product, design and engineering teams integrating accessibility proactively plus a dedicated cross-discipline team; usability studies with people with disabilities used to prioritise issues; commitment to equal access and opportunity for applicants, candidates and employees with disabilities
- Direct contact: `Email Accessibility at Nike` → accessibility@nike.com
- Per-market accessibility statements linked for 37 European market/language pairs
- Product-level accessibility: `EasyOn Collection` with the feature labels `Easy to Put On`, `Easy to Take Off`, `Lace Free` — three plain-language labels doing the work that "adaptive footwear technology" would obscure
- H1 of the accessibility page: `IF YOU HAVE A BODY YOU ARE AN ATHLETE.` — the brand's founding line repurposed as an inclusion statement

**Alt text is the best sample in this corpus** `[observed]`. Scene-level, specific, and describing the disability context without euphemism:

- `Person running with a black prosthetic blade on the left leg and a white Nike running shoe with red and blue accents on the right, wearing a neon green sock and black Nike shorts`
- `Person velcroing their Nike Easy On Air Max sneaker with a white, gray, and black upper, green swoosh, and visible air unit, while standing on grass in bright orange socks.`
- `Blind employee, Geoff walking at Nike World Headquarters`
- `Nike employee competing in a one-mile race alongside runners, wearing an orange racing outfit and helmet, crossing the finish line in a racing wheelchair.`
- `The digital accessibility team walking together`

**Negative findings, recorded honestly**

- **The alt text is excellent on the accessibility page and poor everywhere else.** On `/help/a/shipping-delivery-info-all` and `/returns-info-all`, the hero image and all five topic tiles carry the identical non-descriptive alt `Shipping & Delivery Info | Nike Help` / `Nike Returns Info | Nike Help`. Six images, one string, zero information. The page that talks about accessibility practises it; the pages that do not, do not.
- A literal `<br>` tag appears **inside an alt attribute** on the membership hero: `Nike Membership, IT'S BETTER AS <br>A MEMBER`
- Icon labels render as text content: `Chat Icon`, `Phone Icon`, `Store Icon`, `searchIcon`, `Caret Down Icon`
- `How do I get free shipping on Nike orders?` split into three link fragments (see T7)
- `Orders & Payments` vs `Orders & Payment` on two sibling hubs
- `Find a Nike Store` vs `Find a Store`; `Join Us` vs `Sign Up`; `UPS return QR code` vs `UPS return code`; `Send Us Feedback` vs `Site Feedback`
- Live typos: `SNKR Pass`, `Could the store to sell out…`, and `a fair chance to grab pair` in a meta description
- SNKRS release-card link text concatenates the accessible label with the visible name: `Air Jordan 1 Low OG 'Garden' (IR0088-001) Release DateAir Jordan 1 Low OGGarden`

---

## Transferable patterns

1. **Name the concession as a feature.** `Wear Test` instead of "60-day returns" converts a cost centre into a benefit card. Condition: the name must describe what the *user does* (test the wear), not what the company permits. Directly applicable to PayPal's buyer-protection and dispute-window copy, where the same period is currently named after the company's obligation.
2. **Ship every transactional CTA in a Member/Guest pair.** `Check Member Order Status` / `Check Guest Order Status` removes the "do I need an account?" decision from the user's head at the exact moment they are anxious about a package. Let the price differential carry the upsell instead of an interstitial.
3. **Write the article that reconciles a system state with lived reality.** `My order tracking information says "label created," but it isn't updating—why not?` — quote the offending string in the title, explain the mechanism, and bound the wait with a number (`up to 72 hours`). The Wise "complete" pattern, confirmed as generalisable.
4. **Name the absent affordance.** `If you don't see the cancel button, your order is no longer eligible to be canceled.` Users diagnose by what they cannot find; write for that. Then close the escalation explicitly: `even our Nike representatives cannot cancel the order.`
5. **In scarcity flows, promise the losing message.** `We'll also let you know if you weren't selected.` is the sentence that makes an unfair-feeling mechanic tolerable, and it is the one most often dropped. Applies to any queue, waitlist, allocation or eligibility decision.
6. **Disclose the surveillance, not just the rule.** Nike publishes the existence of its return-activity database, names its single permitted use, and disclaims resale. For any product that scores or rate-limits users on behaviour, this is the honest version.
7. **Register gradient, sharply enforced.** `If you score the W` on SNKRS; zero colloquialism in refunds, cancellation and returns. And the negative lesson: Nike's alt-text quality follows the same gradient, which is not defensible — practice should not vary with topic the way voice does.
8. **Two adjacent mechanics must not disagree silently.** SNKRS Draw binds the winner to purchase; SNKRS Pass does not. Both answers live in accordions on separate pages. When two similar flows have opposite commitment models, the difference belongs in the entry copy, not only in the FAQ.

## Caveats & gaps

- **Size-chart tables were not opened.** They live at `nike.com/size-fit/*`, linked from the size-charts article. No measurement labels, no column headers, no size-selector strings were captured. T5 is correspondingly thin and is marked `[absent]` where appropriate.
- **SNKRS drop-state strings are not in server HTML.** The `/launch` feed returns card titles, colourways and `Release Date` labels, but countdown, entry, entered, and sold-out states are client-rendered on product detail pages. Nothing was invented for these.
- **No authenticated states observed.** Order status screens, `My Returns`, the Member profile, the Nike App and SNKRS App in-product copy are all `[documented]` at best.
- **Empty states are effectively unobservable** on this product without sign-in; T8 is honestly thin.
- **No fit-prediction content exists to harvest.** Unlike ASOS and Zalando, Nike ships no public fit assistant, no "true to size" flag, and no fit questionnaire. This is recorded as a finding, not a gap in the harvest.
- **Locale coverage is US-only.** The footer enumerates ~100 market/language pairs and the accessibility page links 37 European accessibility statements; none were opened. Any claim in this file should be re-verified before use as non-US precedent.
- Several strings on pages 1–10 and 12–15 were captured through a delegated fetch pass using the same public `web_fetch` route; they are verbatim as returned but were not re-verified against a second fetch.

## Sources

1. https://www.nike.com/help
2. https://www.nike.com/help/a/size-charts
3. https://www.nike.com/help/a/returns-policy
4. https://www.nike.com/help/a/how-to-return
5. https://www.nike.com/help/a/refund-info
6. https://www.nike.com/help/a/order-tracking
7. https://www.nike.com/help/a/shipping-delivery
8. https://www.nike.com/help/a/store-pickup
9. https://www.nike.com/help/a/change-cancel-order
10. https://www.nike.com/help/a/nike-snkrs-draw
11. https://www.nike.com/help/a/nike-launch-drawing
12. https://www.nike.com/help/a/nike-snkrs-pass
13. https://www.nike.com/help/a/member-benefits
14. https://www.nike.com/membership
15. https://www.nike.com/launch
16. https://www.nike.com/accessibility
17. https://www.nike.com/help/a/shipping-delivery-info-all
18. https://www.nike.com/help/a/returns-info-all
