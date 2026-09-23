# 076. Glossier

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | DTC cosmetics (skincare, colour cosmetics, fragrance; Shopify storefront + owned retail) |
| Primary URL | https://www.glossier.com/ |
| Corpus rank | 076 |
| Benchmark strength (source list) | Product education and voice |
| Locale / market observed | en-US (US storefront; ~180-country selector present, UK served by a separate help instance) |
| Platform observed | Web (desktop), Gorgias-hosted help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for financial regulation. Consumer-facing regimes visible: EU Right of Withdrawal (14 days), US DOT hazmat rules for fragrance shipping, Leaping Bunny cruelty-free certification, CA/US state privacy notices |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 |
| Harvest completeness | Full for storefront and help centre. Partial for two client-rendered widgets: the order-tracking lookup form and the per-step product options in the Custom Skincare Set builder. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Storefront home | https://www.glossier.com/ | Nav IA, hero, bestseller grid, cart drawer, back-in-stock modal, locale modal |
| Help centre (all categories) | https://help.glossier.com/en-US | 11 categories, ~90 FAQs with full answer bodies — the single richest source |
| Boy Brow (PDP) | https://www.glossier.com/products/boy-brow | Shade selector, ingredients, HOW TO USE, subscription block |
| Cloud Paint Plush Blush (PDP) | https://www.glossier.com/products/cloud-paint-plush-blush | Shade vocabulary, coined ingredient tech, gTEAM Tip |
| Futuredew (PDP) | https://www.glossier.com/products/futuredew | Best category-explanation copy; clinical-studies module |
| Balm Dotcom (PDP) | https://www.glossier.com/products/balm-dotcom | Flavour selector, clinical claims, voice-heavy usage steps |
| Glossier You (PDP) | https://www.glossier.com/products/glossier-you | Fragrance-note vocabulary, engraving CTA variant |
| About | https://www.glossier.com/pages/about | Brand philosophy, trademarked ethos |
| Accessibility | https://www.glossier.com/pages/accessibility | WCAG statement; sharpest voice discontinuity on the site |
| Membership | https://www.glossier.com/pages/membership | 3-step how-it-works, benefit framing, first-person FAQs |
| Custom Skincare Set | https://www.glossier.com/a/pages/custom-skincare-set | 5-step routine builder — best step-education copy |
| Track your order | https://www.glossier.com/pages/tracking | Shipping FAQ block; lookup widget not server-rendered |
| Contact us | https://www.glossier.com/pages/contact-us | Question-as-headline; mailto-only routing, no form |
| All Skincare (collection) | https://www.glossier.com/collections/skincare | Filter/sort taxonomy and the full product-descriptor corpus |
| Fragrance layering | https://www.glossier.com/pages/fragrance-layering | Scent-note field labels; category education for a wardrobe concept |

Note: `https://www.glossier.com/pages/international` **301-redirects** to the help centre, despite being linked from every page's shipping banner as "our international page."

---

## T1 Navigation & IA labels

**Global nav — category nouns, not benefits** `[observed]`

`Skincare` · `Makeup` · `Balms` · `Body` · `Fragrance` · `Glossier Goods` · `Sets` · `Shop All`

Two things are unusual. `Balms` is a top-level category for a single product family (Balm Dotcom), which is a merchandising decision expressed as IA — the hero product gets its own shelf. And `Glossier Goods` is the merch category, which the help centre calls `GlossiWEAR` and the collection URL calls `/collections/glossiwear`. **Three names for one thing across three surfaces.**

Every category submenu ends with the same two-item tail: `Save with sets` then `All <Category>`. The discount route is offered before the completeness route.

**Footer groups are questions and objects mixed** `[observed]`

`How can we help?` · `About Glossier` · `Stores` · `Social`

`How can we help?` as a footer group heading (with question mark) rather than `Support` or `Help` is the notable choice — the same phrasing the help centre uses as its hero (`How can we help?`).

Support links under it: `Contact` · `Track my package` · `Returns & exchanges` · `Help & FAQ` · `Student Discount` · `International` · `Responsible disclosure` · `Authorized retailers`

`Track my package` uses **package**, while the page it links to is titled `Track your order` and the help FAQ says **order**. Three nouns (`package`, `order`, `shipment`) for one object.

**Help-centre categories — 11 flat topics, plain nouns** `[observed]`

`Shipping` · `Products` · `Returns & Exchanges` · `International` · `Stores` · `Billing` · `Orders` · `Subscriptions` · `Membership` · `Engraving` · `Code Of Conduct`

No scope lines, no nesting, no gerunds — the opposite of the Wise model. The whole help centre is a single scrolling page with an anchor jump-list, so the "IA" is really a table of contents. `Code Of Conduct` sitting as a peer of `Billing` is the standout: a values document filed as a support topic.

**Collection filter taxonomy** `[observed]` — `Skin Type Filters`: `Combination` · `Dry` · `Normal` · `Oily` · `Sensitive`. `Skin Concern Filters`: `Acne + blemishes` · `Dark spots + hyperpigmentation` · `Dryness` · `Dullness` · `Irritation + redness` · `Pores` · `Uneven skin tone + texture`. Note the concern list is written as **the customer's words for the problem**, not the product's claim.

## T2 Value proposition & headline patterns

**The tagline is a compliment, and it is attached to the logo** `[observed]`

> `Glossier` / `You look good.`

The logo's accessible link text is literally `Glossier You look good.` — a second-person sentence where a brand name would normally sit. This single move propagates everywhere:

- Footer paragraph: "No matter where you are in your beauty journey, you look good."
- About page section: `YOU LOOK GOOD`
- Fragrance module heading: `YOU SMELL GOOD`
- **Empty cart: `Your bag is empty, but you still look good.`**

**Pattern worth stealing: turn the neutral or negative UI moment into flattery.** The empty state is the proof — most brands write "Your bag is empty. Start shopping." Glossier writes a compliment with a `but` clause that acknowledges the emptiness and then refuses to treat it as a problem.

**Product headlines are metaphors with no verb** `[observed]`

- `Glossier in a bottle.` (Futuredew)
- `Put your head in the clouds.` (Cloud Paint Plush Blush)
- `Skin's puffer jacket` (After Baume editorial tile)
- `A Wardrobe of Fragrances` (fragrance layering)
- `you smell rich.` (homepage fragrance hero, lowercase)
- `Take a bite out of the Big Apple.` (Balm Dotcom I ❤️ NY)
- `Our little love letter to New York.` (sticker sheet)

The construction is: noun phrase, full stop, no claim. The claim lands in the sentence underneath.

**Claim sentences are short and mechanism-free** `[observed]`

- `The original, every-day essential for all brows.`
- `A pillowy-soft powder blush that blends and builds seamlessly for a soft-matte flush.`
- `Instant nourishment with addictive taste.`
- `The ultimate personal fragrance.`
- `A skincare–makeup hybrid that's a one-step shortcut to the glow of a 12-step routine.`

That last one is the best line on the site. It defines an unfamiliar category (`skincare–makeup hybrid`) by naming the **effort** it replaces rather than the ingredient it contains.

**Brand philosophy is trademarked and repeated verbatim** `[observed]`: `Skin First. Makeup Second™` appears on the About page, in the global footer paragraph, and in help copy. The About page's origin line is the sharpest: `It's where we realized that beauty shouldn't be built in a boardroom—it should be built by you.`

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Add to bag` | PDP, collection card, cart | Never "Add to cart" — but the URL is `/cart` and the drawer heading is `Shopping Bag` |
| `Add to bag $22` | PDP primary | **Price is inside the button label**, not beside it |
| `Notify me` | Out-of-stock variant | Replaces `Add to bag` in place |
| `See details` | Collection card | Not "View product" |
| `See full page` | PDP cross-sell card | Different label, same intent as `See details` — inconsistent |
| `Choose set` | Set upsell card | |
| `Engrave it +` | Most PDPs | |
| `New Engrave +$10` | Glossier You PDP only | **Different label and format for the same action on one product** |
| `Show More` | Truncated description | |
| `Full ingredients list` | Ingredients module | CTA text = destination heading |
| `See testing details` / `See full clinical trial` | Clinical modules | Two labels, same class of action, two products |
| `Skip` / `Next step` | Custom Skincare Set builder | |
| `Create an account` | Membership page (×3) | |
| `Shop now` · `Shop all` · `Shop all Makeup` · `Shop all Skincare` · `Shop Bestsellers` | Various | Object is always named |
| `Take a peek` | Homepage campaign module | |
| `Learn more` | Several modules | The one bare CTA on the site |
| `Continue shopping` | Welcome/locale modal | |
| `Change shipping country` | Welcome modal | |
| `Checkout` | Cart drawer | |
| `Current openings here` | Contact page | |
| `Skip To Main` | Top of DOM | Accessibility. Note: not the conventional "Skip to main content" |

**Observation:** the price-in-button pattern (`Add to bag $22`) is unusual and load-bearing — on a site where shade selection changes nothing about price, it keeps the commitment visible at the moment of commitment. But it also means the button label changes length between variants, and the set cards degrade into `Add to bag , Discounted price: $65 , Original price: $105` — an accessible name assembled from three fields with stray commas.

## T4 Onboarding & getting-started

**Membership — three steps, each an imperative verb phrase** `[observed]`

1. `Join` — `Create an account on glossier.com, if you haven't already.`
2. `Get rewarded` — `Claim your free Membership Keychain (your first free gift!) with your next order.`
3. `Enjoy perks` — `Look out for super-exclusive, member-only perks in your inbox!`

Step names are one or two words; the body does the work. Step 2 parenthesises the reassurance (`your first free gift!`) rather than stating it as a separate benefit — a compression trick.

**Custom Skincare Set — a five-step routine builder, and the best category-education copy on the site** `[observed]`

Step labels: `01 Cleanse` · `02 Treat` · `03 Moisturize` · `04 Sunscreen` · `05 Add-ons`, each with the unselected placeholder `(Select Product)` and a requirement label: `Select one or more` (01–03) or `Optional` (04–05).

The per-step helper text is written for someone who does not have a routine:

- 01: `A proper cleanse is critical to ensuring skin is effectively clean and prepped to absorb the rest of your routine.`
- 02: `Effective serums and treatments formulated to target specific skin concerns.`
- 03: `All skin types need hydration (yes, even oily). Choose a moisturizer based on your skin needs, the season, and climate.`
- 04: `No rest days for SPF. Finish your routine with our fully transparent SPF to prevent sun damage and neutralize free radicals.`
- 05: `Meet your personal skin goals with our masks or oil serum hybrid—the perfect finishing touch to your routine.`

Two of the five carry a **pre-emptive objection**: `(yes, even oily)` answers the reader who was about to skip step 3, and `No rest days for SPF` answers the reader who uses sunscreen occasionally. Neither is a product claim. This is the transferable move — put the objection-handling inside the step description, not in a separate FAQ.

Framing line: `Your skin is unique and no one knows its needs better than you.` Glossier declines to diagnose. The builder is explicitly not a quiz — there are no questions, only a sequence with permission to skip.

## T5 Form & field labels

**Purchase Options block (every PDP)** `[observed]`

| Label | Notes |
|---|---|
| `Purchase Options` | Section |
| `One-time purchase` | Default |
| `Subscribe and save 10%` | Benefit stated in the option label itself |
| `Subscribe + save` | Second label for the same concept on the same page |
| `How often do you want to re-up your subscription?` | Frequency question, Boy Brow / Futuredew / Balm Dotcom |
| `How often do you want to re-up your routine?` | **Same field, different noun, on Cloud Paint** |
| `Ship every month` / `Ship every 2 months` / … / `Ship every 5 months` | Options — verb-first, not "Every 2 months" |
| `Quantity:` | Trailing colon |
| `Limited to 20 per customer` | Inline constraint, stated as a fact not a warning |
| `Limited to 5 per customer` | Fragrance |

`re-up` is slang doing a functional job. It is the only slang in the transactional area of the page, and it is inconsistently paired (`subscription` vs `routine`).

**Shade / variant selectors** `[observed]`

Selector label is `Shade` implicitly (the selected value is displayed, e.g. `Dark Brown`), with the out-of-stock state appended as a second line: `Dark Brown` + `Out of stock`. Size selectors are bare chips: `100 ml` `50 ml` `8 ml`.

Per-shade description lines are a single sentence, present tense, no adjective stacking: `Float is a rosy mauve.` · `Puff is a light pink.` · `NEW I ❤️ NY: Juicy apple flavor with a clear tint.`

**Scent-note field labels** `[observed]` — `Scent impact` · `Scent notes` · `Top` / `Heart` / `Base`. `Scent impact` is a coined field name and each value is an instruction, not a description: `Layer for a bit of creamy solar warmth.` · `Layer for a woody, spicy twist.` · `Layer for a lush, gourmand element.` · `Layer for an ethereal floral feel.`

**Back-in-stock modal** `[observed]`

`Get notified` · `Close (esc)` · `Email` · `(Required)` · `Notify me` · and two near-identical helper strings that appear to be two variants of one message:
- `Enter your email to be notified first when this item is available again.`
- `Enter your email to be notified first when this item becomes available.`

**Collection controls** `[observed]`: `View Options`: `Product` / `Shade` · `Filter ( 0 )` · `Filters` · `Cancel` · `Apply` · `Sort Options`: `Featured` · `Most relevant` · `Best selling` · `Price low to high` · `Price high to low` · `Newest first`.

**Absent** `[absent]`: the order-tracking lookup form on `/pages/tracking` is client-rendered; no field labels were retrievable. There is **no contact form anywhere on the site** — `/pages/contact-us` routes entirely through mailto links.

## T6 Status & state language

**Merchandising / availability badges** `[observed]`

`Coming soon` · `Best Seller` · `Top-rated` · `NEW` · `Out of stock` · `Sold out` · `Free Keychain` · `Free Beauty Bag` · `MIX + MATCH` · `Engrave it` · `Save 38%` / `Save 16%` / `Save 15%` / `Save 11%` · `Sale price $72 Regular price $90`

Both `Out of stock` and `Sold out` are live on the same collection page for the same class of condition — a genuine duplication.

**Defect worth recording** `[observed]`: on `/collections/skincare`, `Coming soon` renders in the markup on **all 18 cards**, including in-stock items. It is a hidden template slot, not a live badge — but it is in the accessible name tree.

**Order states are documented, not observed** `[documented]` — the help centre names them obliquely rather than as a status vocabulary:

- A one-hour self-cancel window: "You'll have the option to cancel your order directly from your confirmation email within one hour." The control is found under a section the email labels `"Changed Your Mind?"` — a state expressed as a question.
- `Store Pickup` orders and gift cards are named as **not self-cancellable**.
- Cancellation is confirmed by a second email: "you'll receive another email once the order has been successfully been cancelled."
- Pickup readiness is an email event, not an in-app status: "You'll receive an email with pickup details from gTEAM@glossier.com once your order is ready."
- Pickup expiry is stated as a hard rule: orders held **7 days**, then "automatically be canceled and refunded."

**Shipping timing vocabulary** `[documented]`: `1-3 business days` (processing) · `7-10 business days` (Standard) · `an additional 3 business days` (engraving) · `5–10 business days` (credit-card refund) · `right away` (gift-card refund).

**International duty/tax states — a small controlled vocabulary** `[observed]`, from the shipping table:

`Included` · `Not included – payable at checkout` · `Partially included` · `Optional` · `Express only` · `Standard only` · `Fees apply` · `Rest of World`

`Partially included` (Canada) and `Optional` (Philippines) are unusually honest values for a duty column — most retailers collapse this to a binary.

## T7 Error, failure & recovery

The help centre is where recovery lives, and its title grammar is **the customer's first-person confession** — the same pattern the Wise exemplar flagged, executed here in a consumer-retail context. `[observed]`

- `I accidentally selected in-store pick-up, what should I do?`
- `I selected the wrong store location for my order, what should I do?`
- `I'm unable to pick up my order, what should I do?`
- `I accidentally canceled my order, can I resume it?`
- `I canceled my order, but I'm not sure it went through. Can you confirm it has been canceled?`
- `I forgot to edit/cancel/skip my Glossier Top Shelf Subscription order, can you help?`
- `I forgot to add my birthday when I signed up. Can I still get my birthday gift?`
- `I didn't receive my keychain code, what should I do?`
- `I already have an account, can I still receive the keychain?`
- `I used to have store credit in my Glossier account, but I can't find it anymore. How can I use it?`
- `My tracking details aren't working, Can you help?` *(comma splice and capitalised "Can" are verbatim)*
- `I have a weird question and I want to talk to a person about it.`

Note the **compound structure**: every one is `<what I did>, <what do I do now?>`. The confession and the ask are a single sentence. That last one — `I have a weird question and I want to talk to a person about it.` — is not a question at all; it is a help-centre entry written as the sentence a frustrated person would say aloud, and its answer is `We've got people who love that kind of thing!`

**Recovery answers lead with reassurance, then a single route** `[observed]`. The openers are formulaic and deliberately warm: `We got you!` · `We're always here to help!` · `we're happy to help!` · `we'll take care of the rest.` · `We know taxes and duties can be confusing!` · `We'd love to help`. Almost every recovery path terminates at one email address (`gTEAM@glossier.com`) rather than a form or a phone tree.

**Failure copy that names the cause rather than blaming the user** `[observed]`, from `What can I do if my payment is declined?`: the answer names the two checkable things (billing details, expiry), then states plainly that the card issuer declined it and **"They don't tell us the reason for this, so it's best to check with them."** Admitting the merchant cannot see the decline reason is the right call and rarely made.

**A hard failure explained without apology** `[observed]`, from `Why was my order canceled when I did not request a cancellation?`: the answer states that orders are subject to acceptance, that Glossier reserves the right to reject orders it believes are not for personal use, and that the payment is refunded. No softening, no "unfortunately". The register flattens completely when the stakes are commercial.

**Negative recovery states** `[observed]`: `If you receive a notification that your order is not eligible for an online return…` — the help article names a specific in-product error message and gives the fallback (email or visit a store). This is the reconciling-article pattern: the UI says no, the help centre explains what to do next.

**Validation** `[observed]`: `Please enter a valid email address.` (back-in-stock modal) — the only form-validation string on the public surface.

## T8 Empty states

**The signature string** `[observed]`, cart drawer:

> `Your bag is empty,`
> `but you still look good.`

Rendered on two lines, comma-then-`but`. It is the brand tagline reused as an empty state, and it is the single most quotable string in this file. The recovery CTA below it is `Shop all`.

**Search** `[observed]`: the search panel renders `Search our site` with `Search` and `Clear` controls. No no-results string was reachable.

**Collection filter** `[observed]`: `Filter ( 0 )` — the zero-state is rendered as a count in the control label rather than as separate copy.

**Progressive-disclosure empty state** `[observed]`: `More quick links off-screen` — an accessible-name string for a horizontally scrolling nav, describing content the sighted user can see but the screen-reader user cannot reach yet.

## T9 Notifications & system messages

**Cart-drawer threshold messaging is a two-state pair** `[observed]`

- Achieved: `Congrats! You get free standard shipping`
- Not yet: ` away from free standard shipping` *(prefixed by an interpolated amount)*

**A live template defect** `[observed]`: the same drawer renders `Shipping (Free standard shipping over {{threshold_with_currency}})` — an **unrendered Liquid variable, on every page of the site**. A second instance appears on the Glossier You PDP as `Limited to {{ limit }} per customer`. Two shipped interpolation failures in the highest-traffic component.

**Locale interception on first visit** `[observed]`

> `Welcome to Glossier` / `You're shopping in United States` / `Easy, 30-day returns.` / `Continue shopping` / `Change shipping country`

The modal leads with a welcome, states the inferred market, offers a **reassurance** (`Easy, 30-day returns.`) rather than a warning, and puts the passive option first. Compare the more common pattern of leading with "You appear to be in X — switch?"

**Promotional banner rotation** `[observed]`: the header cycles ~20 shipping-threshold variants, one per market, each ending with the identical sentence "For more information on shipping rates and timelines, please visit our international page" — a link that **301-redirects to the help centre**. A broken promise in the most-repeated string on the site.

**Notification model is documented to the user** `[documented]`: for subscriptions, "You'll receive email and SMS notifications for subscription confirmations, upcoming charge reminders, out-of-stock items, payment issues, and cancellation confirmations." Naming the full notification set in a help article is good practice.

**Out-of-stock pre-emption** `[documented]`: "If an item in your subscription order is out of stock, we'll reach out to you before your subscription order is set to process to give you a heads-up." The message fires *before* the failure, not after.

## T10 Disclosures, legal & compliance

**Claim chips are single words, stacked** `[observed]`: `Thickening` · `Conditioning` · `Flexible` · `Nourishing` · `Enhancing` · `Longwearing` · `Moisturizing` · `Up to 8hr Wear` · `Water-Resistant` · `Sweat-Resistant` · `Humidity-Resistant` · `Transfer-Resistant` · `Cruelty Free` / `Cruelty-Free` / `Cruelty-free.` *(three casings/punctuations of one claim)*

**Testing disclosures are full sentences, appended after the chips** `[observed]`:
- `Dermatologist-tested, ophthalmologist-tested, suitable for contact lens wearers, good for all skin types`
- `Cruelty-free, vegan, dermatologist-tested, suitable for sensitive skin, non-comedogenic, suitable for all skin types (including sensitive skin).`

**Clinical claims carry sample-size footnotes inline** `[observed]`: `*In an independent study of 33 people.` and, for Futuredew, a disclosure naming a third-party facility, 31 participants aged 18–45, plain packaging, and four measurement points. The CTA is `See testing details` — the methodology is offered as an optional deeper view, the Wise dual-format pattern applied to efficacy rather than fees.

**But Glossier also parodies its own claim genre** `[observed]`, Boy Brow:

> `In an unofficial study (aka we asked some friends), Boy Brow took an average of 6.3 seconds to apply—and looks amazing.`

The construction mimics the clinical module exactly — named study type, a decimal statistic — and then undercuts it with `(aka we asked some friends)`. This only works because the real clinical modules elsewhere are rigorous. **Condition for transfer: you can only joke about your evidence format if you also ship the serious version of it.**

**Ingredient-list volatility disclaimer** `[observed]`: an italicised paragraph stating that ingredient lists may change as the portfolio evolves, directing the reader to the package they receive as the authority, and giving an email. Honest about the limits of the web page as a source of truth.

**Returns and withdrawal** `[documented]`: 30-day window from receipt, refund to original payment method excluding delivery cost, with an option to take a Glossier gift card instead via self-service. Final-sale categories named explicitly: "sweatshirts, merchandise, engraved items, and gift cards are final sale." Separately, EU customers get `14 days of delivery– no reason needed` under a dedicated `How do I exercise my EU right of withdrawal?` article, with personalised (engraved) goods and opened sealed-hygiene products named as exclusions.

**Shipping-restriction disclosure is regulatory and specific** `[documented]`: fragrance is Hazardous Material under US DOT rules, therefore ground-only, therefore not shippable to Alaska, Hawaii, US Territories, PO Boxes, or APO/FPO. Naming the regulator and the causal chain — rather than saying "some items cannot be shipped to your address" — is the good pattern.

**Purchase limits framed as fairness, not restriction** `[documented]`: "We enforce a limit of 3 per customer on our merchandise… 20 per customer on beauty and skincare items to protect inventory levels and make sure everyone has a chance to enjoy our products." The rationale is supplied in the same sentence as the rule.

**Cart-level tax hedge** `[observed]`: `Sales tax amount shown in checkout is a best estimate and may differ from amount actually charged and shown on Order Confirmation email.` A claim-bounding footnote in the cart, which most Shopify stores omit.

## T11 Help-centre architecture

Single-page Gorgias help centre at `help.glossier.com/en-US`, hero `How can we help?`, H1 `FAQs`, with a `Go to category...` select plus a parallel link list — **two navigation controls for the same 11 anchors**, rendered adjacently.

**Article-title grammar — four shapes** `[observed]`

| Shape | Example |
|---|---|
| `How do I …?` / `How can I …?` | `How can I cancel an order?` · `How do I place a return or exchange?` |
| `What / Where / Why …?` | `Where does Glossier ship?` · `Why was my order canceled when I did not request a cancellation?` |
| `Can I …?` | `Can I return a product I received as a gift?` · `Can I buy online, and pick up in-store?` |
| `I <did thing>, <ask>` | `I accidentally selected in-store pick-up, what should I do?` |

The `Can I …?` shape dominates the Stores and Subscriptions categories — appropriate, because those topics are mostly eligibility questions.

**Notable structural choice:** answers are fully server-rendered and present in the page. Unlike most accordion help centres (and unlike the Wise exemplar), the entire ~90-answer corpus is readable in one fetch. Good for search, good for scanning, and it means the register is auditable end-to-end.

**Routing is a single funnel.** There is no ticket form, no phone number, no chat widget in the public surface. Every route terminates at `gTEAM@glossier.com`, named on the Contact page with an explanation of who they are rather than what the queue is.

**Market split in the help IA** `[observed]`: UK customers are handed off to a separate instance (`glossieruk.gorgias.help`) via an inline link inside a US answer. The `International` category then duplicates four of the `Returns & Exchanges` questions with different answers — `What's your return policy?`, `How do I place a return or exchange?`, `How long does it take to receive a refund?`, `What should I do if I receive the wrong product?` all appear twice on the same page with market-divergent bodies. Defensible, but it means a search hit could land on the wrong one.

## T12 FAQs

FAQs appear in three placements: the help centre (~90, full answers), a shipping-only block on `/pages/tracking` (5 questions), and a membership block on `/pages/membership` (6 questions).

**Membership FAQ — all six in the customer's first person or direct address** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What is the Glossier Membership? |
| 2 | How do I sign up for Membership? |
| 3 | How do I get a Membership Keychain? |
| 4 | I already have an account, can I still receive the keychain? |
| 5 | I didn't receive my keychain code, what should I do? |
| 6 | I forgot to add my birthday when I signed up. Can I still get my birthday gift? |

Structural note: the ordering is **definition → action → reward → three failure modes**. Half the FAQ block is dedicated to things going wrong with a free keychain. That ratio is a deliberate signal that the failure cases are the volume drivers, and it is unusual to see a benefit page give half its FAQ space to its own breakage.

**Tracking-page FAQ** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | When can I expect to receive my Glossier package— are there currently processing or shipping delays? |
| 2 | Where does Glossier ship? |
| 3 | Are taxes and duties included in my order total? |
| 4 | Do you ship to PO Boxes? |
| 5 | My tracking details aren't working, Can you help? |

Q1 is a **compound question with a live-operations second half** (`are there currently processing or shipping delays?`) — the FAQ is being used as a status surface. Note the missing space before the em dash, verbatim.

**Answer openers are the signature** `[observed]`: `We offer multiple shipping speeds that vary across countries because sometimes you can wait, and sometimes you can't.` · `We can! However, we can only ship to PO Boxes with Standard shipping.` · `We got you!` · `Still not seeing Glossier where you live? Tag us @Glossier to let us know!`

That first one is the most interesting: a shipping-options answer that opens by naming the **customer's psychology** (sometimes you can wait) rather than the service tiers. The tiers follow.

## T13 Terminology & glossary

| Term | Glossier's usage | The alternative it rejected |
|---|---|---|
| `bag` | The cart, everywhere in UI (`Add to bag`, `Bag (0)`, `Shopping Bag`) | "cart" — though the URL is `/cart` |
| `gTEAM` | The customer-service team, as a proper noun, lowercase g | "Support", "Customer Care" |
| `gTEAM Tip:` | An inline advice callout on PDPs | "Pro tip", "Did you know" |
| `Editors` | In-store staff | "associates", "beauty advisors" |
| `Skin First. Makeup Second™` | The brand philosophy, trademarked | an untrademarked tagline |
| `Glossier Goods` / `GlossiWEAR` | Merch — **two names, one category** | |
| `Glossier Top Shelf Subscriptions` | The subscription programme | "Auto-replenish", "Subscribe & Save" |
| `re-up` | Subscription frequency verb | "renew", "reorder" |
| `Memory Cloud Texture` | Coined formula technology | a chemical name |
| `Phyto-Antioxidant Blend` | Coined ingredient group | |
| `skin-scent enhancing` | Fragrance category descriptor | "eau de parfum" alone |
| `do-everything lip balm` | Category descriptor for Balm Dotcom | "multipurpose balm" |
| `Membership Keychain` / `Applebaby Keychain` | Named free gifts | "gift with purchase" |
| `Into The Gloss` | The predecessor media property, named in About | |
| `+` | The house conjunction | "and", "&" |

**The `+` system is worth isolating.** It runs through descriptors (`Hyaluronic acid + vitamin b5 serum`), filters (`Acne + blemishes`, `Uneven skin tone + texture`), claims (`lips look + feel intensely moisturized`), scent notes (`Ambrette + Ambrox`), merchandising (`MIX + MATCH`), sets (`Boy Brow + Lash Slick + Stretch Balm Concealer`) and even contact routing (`Business + Partnerships`). It is a typographic decision applied as a terminology rule, and it makes multi-item names scannable at a glance.

**The descriptor system is the most transferable artefact here.** Every product carries a two-or-three-word category line under its name, and they are written to be *comprehensible before the product is*:

`Grooming pomade` · `Seamless cheek color` · `Skincare-makeup hybrid` · `Nourishing lip balm` · `Conditioning face wash` · `Moisture barrier recovery cream` · `Oil-control gel cream` · `Waterproof makeup remover` · `Hyaluronic acid + vitamin b5 serum` · `Niacinamide + zinc serum` · `Exfoliating skin perfector` · `Nourishing gel-balm makeup remover` · `Sheer skin enhancer` · `Film form mascara` · `Glassy plush shine` · `Cooling, creamy lip oil` · `Liquid highlighter` · `Glistening eye glow` · `Perfect glide eyeliner` · `Oil-serum illuminator`

Three formulas are in play: **adjective + category** (`Nourishing lip balm`), **actives + format** (`Niacinamide + zinc serum`), and **effect-as-category** (`Sheer skin enhancer`, `Glassy plush shine`). The third is the risky one — it names a result rather than an object — and Glossier only uses it for products whose category is genuinely novel.

One descriptor breaks the system entirely: the Digital Gift Card is `let them pick!` — fully lowercase, exclamatory, in a field of sentence-case nouns.

## T14 Voice, tone & accessibility

**Person.** Second person throughout, first-person plural for the company. The company is a visible actor and an explicitly informal one: `we asked some friends`, `We got you!`, `we're happy to help!`, `Tag us @Glossier`.

**The joke lives inside the instruction, not beside it.** This is the defining tonal habit:

- `Reapply throughout the day if you need extra hydration, or you know, you just miss us.` (step 2 of 3)
- `Repeat on your other brow, unless that's the look you're going for.` (final step)
- `Lips shouldn't get to have all the fun!` (closing a usage step)
- `All skin types need hydration (yes, even oily).` (inside step 3)
- `No rest days for SPF.` (opening step 4)

The jokes never replace the instruction; they are appended to a complete instruction or parenthesised inside one. A user who skips the humour still has the full procedure. That constraint is what makes the voice shippable.

**Tone flattens as stakes rise — with one clean exception.** Colloquialism is dense on PDPs and in the help centre's shipping and subscription answers, and absent from the cancellation-policy answer, the purchase-limit answer, and the ingredient disclaimer. **The accessibility page abandons the voice entirely**: third-person, legal register (`Glossier has committed`, `Glossier is dedicated`), no second person except in the feedback paragraph. This is the sharpest voice discontinuity on the site, and it is a defensible gradient — but see the defect below.

**Casing is a system.** All-caps eyebrows (`KEY INGREDIENTS`, `HOW TO USE`, `GET THE LOOK`, `SCENT NOTES`, `CLINICAL STUDIES`, `YOU SMELL GOOD`, `CONTACT US`, `BECOME A MEMBER`) sit above Title Case module names (`Save With Sets`, `Purchase Options`, `Select Your Cleanser`) above sentence-case body. Lowercase is used as a deliberate break: `you smell rich.`, `let them pick!`, `vitamin b5`, `vitamin c`.

**Emoji are rationed by surface.** Almost absent from the storefront; used freely in the help centre (🐇 for cruelty-free, 👀 for upcoming launches, 💕 and ✨ for reassurance, `Yes! 💕`). The register loosens where the interaction is most conversational.

**Accessibility content** `[observed]`

- Skip link present, first in DOM, labelled `Skip To Main` — **not** the conventional "Skip to main content"
- A public `Accessibility` page linked in the global footer, with a `Website Accessibility Statement` heading
- Named standard, verbatim: `the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0, 2.1 and 2.2 at Levels A and AA ("WCAG")` — naming three WCAG versions simultaneously is unusual and arguably clearer than a single-version claim
- Statement substance: commitment to an experience "full and equal to the experience provided to customers without disabilities"; substantial conformance rather than full conformance; acknowledges standards change over time; names use of external accessibility consultants, ongoing staff training, and recurring assessment "including the use of assistive technology (such as screen readers and screen magnifiers)"
- Feedback ask is specific and actionable: `please be sure to specify the Web page/URL in your email`
- Descriptive alt text on lifestyle imagery follows a consistent `<Name> wears <Product> in <Shade>.` template: `Alison wears Cloud Paint Plush Blush in Float.` · `Bruna wears Futuredew.` · `Chris wears I ❤️ NY Balm Dotcom + Lip Line in Bit.` — model-named alt text is a strong practice for a shade-driven category
- Icon-only controls carry accessible names: `Chevron icon pointing to the left` / `…right`, `Open gallery modal`, `Toggle Bag`, `Close cart drawer`, `Open submenu`, `Opens in a new tab`

**Negative findings, recorded honestly**

- **The accessibility page routes to `legal@glossier.com`** while every other contact route on the site is `gTEAM@glossier.com`. The one page written for users who may be encountering barriers sends them to the legal inbox.
- Alt text `Balm Dotcom in Wild Fig.` is applied to **all twelve** Balm Dotcom shade swatches — the swatch that distinguishes the variants is undistinguished to a screen reader
- The Milky Oil product card's alt begins `Bottle of Milky Jelly` — wrong product
- Alt typo `priming moisurizer balance`, twice
- One product link exposes its raw href `/products/balm-dotcom?variant=48390723731701` as its accessible name
- Malformed pipe-delimited alt: `default | Alison wears Cloud Paint Plush Blush in Float. | Alison wears Cloud Paint Plush Blush in Float.`
- Empty alt on the Custom Skincare Set hero, both skincare editorial tiles, and the fragrance-layering hero — defensible if decorative, but the editorial tiles carry text in-image
- `{{threshold_with_currency}}` and `{{ limit }}` shipped unrendered
- `Designed to be Layered` (H1) vs `Designed to be layered` (nav promo) for one page
- `8mL` vs `50 mL` / `100 mL` in a single size string
- Contact page leaks raw markdown: `brand@glossier.com [mailto:brand@glossier.com](mailto:brand@glossier.com)Press: press@glossier.com`
- `Interested in our skincare philosophy?Learn more` — missing space
- About page: `individuality , and having fun` — stray space before comma
- Futuredew clinical bullet: `96% said they saw improvement in the appearance of skin texture and radiance. after four weeks of consistent use.` — stray mid-sentence full stop
- `I ❤️ NY` (emoji) and `I Love NY` (plain text) coexist as names for the same shade in the same selector

---

## Transferable patterns

1. **Turn the negative UI moment into the brand promise.** `Your bag is empty, but you still look good.` works because the tagline is a compliment and the empty state is where a compliment is most welcome. Condition: only transfers if your brand promise is *about the user*. A promise about the product ("fast, reliable") produces a worse empty state, not a better one.
2. **Put the objection inside the step description.** `All skin types need hydration (yes, even oily)` and `No rest days for SPF` pre-empt the two ways a reader skips a step, without a separate FAQ or a modal. Directly applicable to any multi-step flow where users drop out at a predictable step — KYC, payment-method setup, security setup.
3. **Define an unfamiliar category by the effort it replaces.** `a one-step shortcut to the glow of a 12-step routine` beats any ingredient claim. For PayPal, the analogue is defining an unfamiliar product by the friction it removes rather than the mechanism it uses.
4. **A short category descriptor under every product name.** Two or three words, comprehensible before the product is. Cheap to write, expensive to omit — it is what makes a 200-SKU grid scannable to a newcomer.
5. **Claim, then parody your own claim format — but only if you also ship the real one.** `In an unofficial study (aka we asked some friends)` is only funny and only trustworthy because the neighbouring products carry genuine third-party clinical modules with named sample sizes and a `See testing details` link. Do not transfer the joke without the rigour.
6. **First-person confession titles as compound sentences.** Glossier extends the Wise pattern by fusing the confession and the ask: `I accidentally selected in-store pick-up, what should I do?` A single string that is both findable by search and answerable in one route.
7. **Tone gradient by surface, not by rule.** Slang in subscription frequency (`re-up`), flat declarative in cancellation policy, legal register in accessibility. The gradient is right; the accessibility page's `legal@` contact shows that the gradient can be taken one step too far — the *register* may flatten, but the *routing* should not.

## Caveats & gaps

- **Two client-rendered widgets were not retrievable**: the order-tracking lookup form on `/pages/tracking` (no field labels captured) and the per-step product options inside the Custom Skincare Set builder. No strings were reconstructed for either.
- **No authenticated states were observed.** Order status, `My Returns`, the self-service returns portal, the subscription management screen (`Manage Subscription` / `Manage this Subscription` / `Address & Payment Details` / `Cancel subscription`) are all named *inside help articles only* and are marked `[documented]` throughout.
- **Order-state vocabulary is thin and inferred from help prose.** Glossier does not appear to expose a named order-status ladder on public surfaces. Do not assume states beyond those quoted.
- **UK and EU copy is under-sampled.** The UK help instance (`glossieruk.gorgias.help`) was not harvested. The EU right-of-withdrawal article was read on the US instance and may differ in the EU-facing storefronts.
- **In-store and app copy are out of scope.** `Editors`, the in-store testing experience, and any app strings are known only from help-article descriptions.
- Product-page copy was captured for five PDPs out of a catalogue of roughly sixty; the descriptor corpus is complete for skincare but partial for makeup and body.
- Several strings on pages 4, 5, 9–14 were captured through a delegated fetch pass using the same public `web_fetch` route; they are verbatim as returned but were not re-verified against a second fetch.

## Sources

1. https://www.glossier.com/
2. https://help.glossier.com/en-US
3. https://www.glossier.com/products/boy-brow
4. https://www.glossier.com/products/cloud-paint-plush-blush
5. https://www.glossier.com/products/futuredew
6. https://www.glossier.com/products/balm-dotcom
7. https://www.glossier.com/products/glossier-you
8. https://www.glossier.com/pages/about
9. https://www.glossier.com/pages/accessibility
10. https://www.glossier.com/pages/membership
11. https://www.glossier.com/a/pages/custom-skincare-set
12. https://www.glossier.com/pages/tracking
13. https://www.glossier.com/pages/contact-us
14. https://www.glossier.com/collections/skincare
15. https://www.glossier.com/pages/fragrance-layering
16. https://www.glossier.com/pages/international (301 → help centre)
