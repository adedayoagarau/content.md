# 075. Sephora

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Beauty retail (omnichannel) — own e-commerce, own stores, shop-in-shop (Sephora at Kohl's), third-party delivery resale (Instacart / DoorDash / Uber Eats / Shipt), and TikTok Shop |
| Primary URL | https://www.sephora.com/ |
| Corpus rank | 075 |
| Benchmark strength (source list) | Discovery and product-fit guidance |
| Locale / market observed | en-US. Canadian policy is carried inline on the same pages (`Canadian Returns`, sephora.ca spend counting toward US tiers) |
| Platform observed | Web storefront, customer-service hub, buying-guide network, PLPs |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a as a retailer. Adjacent regimes visible in copy: `Restricted Hazardous Items` (aerosol/alcohol ground-shipping rules), `FSA/HSA FAQs`, `Sephora Text Messaging Terms & Conditions` and `Quiet Hours` (TCPA-adjacent), BNPL via `Klarna` / `Afterpay`, ID verification for returns |
| Harvest date | 2026-09-21 |
| Pages inspected | 24 reachable, 3 empty |
| Harvest completeness | Partial — the customer-service, policy and buying-guide estate is fully server-rendered and was captured completely. **PLP facet *values*, the basket, search results, and the Beauty Insider dashboard are client-rendered or gated and did not return.** So facet group labels are `[observed]` but their option lists are not. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Storefront | https://www.sephora.com/ | Partial — carousels JS-rendered |
| Customer Service hub | https://www.sephora.com/beauty/customer-service | Full IA, 6 categories / 53 articles |
| Beauty Insider hub | https://www.sephora.com/beauty/beauty-insider | Thin stub |
| **Beauty Insider FAQs** | https://www.sephora.com/beauty/loyalty-program | **41 questions, full tier and points rules** |
| BI Account Information | https://www.sephora.com/beauty/beauty-insider-account | |
| **Returns & Exchanges** | https://www.sephora.com/beauty/returns-exchanges | Full policy, 8 jump-links |
| Order Status & History | https://www.sephora.com/beauty/order-status | **Named states, labelled pairs** |
| Shipping Information | https://www.sephora.com/beauty/shipping-information | Full published rate card |
| Finding Products | https://www.sephora.com/beauty/find-products | |
| Samples & Promotions | https://www.sephora.com/beauty/samples-promotion | |
| Accessibility | https://www.sephora.com/beauty/accessibility | One paragraph |
| BOPIS FAQs | https://www.sephora.com/beauty/in-store-pick-up-faq | 17 questions |
| Fast Delivery FAQs | https://www.sephora.com/beauty/same-day-delivery-faq | 28 questions; **live rename in progress** |
| **Buying Guides hub** | https://www.sephora.com/beauty/best-beauty-products | **Richest single page** |
| Foundation PLP | https://www.sephora.com/shop/foundation-makeup | Facet group names + SEO prose taxonomy |
| Moisturizers PLP | https://www.sephora.com/shop/moisturizing-cream-oils-mists | Facet group names |
| Fragrance PLP | https://www.sephora.com/shop/fragrance | Facet group names |
| Fragrance Families | https://www.sephora.com/shop/fragrance-families-notes | Four families with counts |
| Find My Shade | https://www.sephora.com/beauty/foundation-shade-finder | **Five-step translation flow** |
| Shade Finder | https://www.sephora.com/beauty/makeup-color-match | Thin; tool is JS |
| Find the Right Foundation & Concealer | https://www.sephora.com/beauty/best-foundations | **Four parallel fit tools** |
| Smart Skin Scan | https://www.sephora.com/beauty/skin-analysis-tool | Seven-concern taxonomy |
| Clean + Planet Aware | https://www.sephora.com/beauty/clean-planet-aware | Badge definitions |
| Healthy Hair guide | https://www.sephora.com/beauty/best-hair-products-for-every-hair-type | |
| **Empty body** | /beauty-insider · /shop/hair · /shop/shampoo-conditioner-hair-products | No CAPTCHA, no WAF — just no content |

---

## T1 Navigation & IA labels

**Global header** `[observed]`: `Search` · `Shop` · `Store & Delivery` / `Choose your store & location` · `Services & Events` · **`Sign In for FREE Shipping 🚚`** · `Home` · `Offers` · `Gallery` · `My Store` · `Track Order`

**The emoji is inside the header string.** `Sign In for FREE Shipping 🚚` puts a truck glyph in persistent global navigation — the only product in this batch to do so. It is also a CTA that names its reward rather than its action: "Sign In" is the verb, "FREE Shipping" is the reason, and the reason is in all caps.

**Customer-service top level, six categories** `[observed]`: `Shopping Sephora.com` · `Orders & Returns` · `My Account Help` · `Beauty Insider` · `Beauty Insider Community` · `About Sephora`

Note `Beauty Insider` and `Beauty Insider Community` as **two separate top-level categories**. The loyalty programme and the user-generated-content forum are peers in the support IA — a measure of how much weight the community carries.

**`Popular Topics` tiles, ordered** `[observed]`: `Billing, Canceling & Modifying Orders` · `Order Status & History` · `Payment Methods` · `Returns & Exchanges` · `Shipping Information` · `Beauty Insider Terms & Conditions` · `Account Information` · `Account Registration, Sign In & Password` · `Beauty Insider FAQs`

`Beauty Insider Terms & Conditions` ranking sixth in "Popular Topics" — above account registration — is a real signal about what customers arrive wanting to check.

**Breadcrumb grammar is a consistent three levels** `[observed]`: `Customer Service > [Category] > [Article]`. Commerce breadcrumbs are category paths (`Makeup > Face > Foundation`; `Fragrance > Shop by Fragrance Family`). Buying-guide breadcrumbs use a distinct root: `Buying Guides > Makeup > Find My Shade`, `Buying Guides > Shop Other Guides > Clean + Planet Aware at Sephora`.

**Three parallel IA roots — `Shop`, `Buying Guides`, `Customer Service` — with their own breadcrumb trails.** The discovery layer is architecturally separate from the catalogue, not a facet of it. That is the structural reason Sephora's fit content is stronger than a filter rail alone would allow.

**Recurring module** `[observed]`: `Related Content:` at the foot of every content page.

## T2 Value proposition & headline patterns

**Storefront** `[observed]`

> `New week, new you, Beautiful. 🙌`
> `Join Beauty Insider to earn points with every purchase.`

`Beautiful` used as a **vocative** — the customer is addressed by an adjective as if it were their name. Comma-spliced, emoji-terminated, and it precedes the loyalty pitch. This is the most familiar-register hero in the batch by a distance.

Other storefront headers `[observed]`: `Top Complexion Picks—Only at Sephora` / `Exclusives hit different.` · `Oil-Balancing Hydration` / `These blemish-safe moisturizers won't clog pores.` · badge `ONLY AT SEPHORA`

**Customer service** `[observed]`: H1 `Sephora Customer Service`, subhead **`Browse help topics or chat with a Beauty Advisor`**, then `Popular Topics` · `Chat with Us` · `Call Us` · `All Topics`.

The subhead offers a self-service route and a human route in one seven-word sentence, and names the human by role rather than as "an agent".

**Discovery headlines are promises with a bounded scope** `[observed]`

- `The Guide to Getting Foundation Right`
- `Find the Right Foundation & Concealer` — "Get the perfect shade, coverage, and finish with our tools and free samples."
- `Find My Shade` — "Not sure which shade is right for you? Use our tool to discover your perfect match."
- `Shade Finder` — "Take a quiz to find the perfect-for-you shade match."
- `Smart Skin Scan` — "Our AI-powered tool detects your needs for personalized product recommendations."
- `Healthy Hair Isn't Luck, It's Science` / `Transformative products that make it happen.`

**The `Finding Products` page opens by conceding the problem** `[observed]`: "Sephora offers thousands of products and hundreds of brands. **Finding the right product to fit your needs can be challenging.**" A retailer naming its own catalogue size as a difficulty, in the first two sentences of its help article about finding things. That concession earns the tools that follow.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `SHOP NOW ▸` | Hero slides, promo tiles | **The caret is part of the string** |
| `LEARN MORE ▸` / `LEARN MORE` | Clean + Planet Aware tiles | Two forms |
| `Show More Products` | PLP pagination | |
| `Show more` | Guide carousels | **Different casing, different scope, same page family** |
| `View all` | Guide hub section headers | |
| `Quicklook` | Every product tile | Coined single word, no space |
| `Find your shade▸` | Shade Finder hero | **No space before the caret** |
| `FIND MY SHADE` | The button on any foundation PDP | All caps |
| `Choose a Foundation ⏵` | Step 6 tile | **A third caret glyph** (`⏵` vs `▸`) |
| `Download the app ▸` | Smart Skin Scan hero | |
| `Click here to start or track a return` | Returns page → Narvar | "Click here" — a legacy pattern, and the link text names two actions |
| `Back to Top` | End of every long article | |
| `Email when in stock` | PDP alert | |
| `email me` | **Same feature, different name, same page** | |
| `View Details` | Order list → order details | |
| `Changed your mind? Cancel your order.` | Order Summary | **A question plus an imperative as one CTA** |
| `Schedule a Delivery Window` / `choose a different time` / `confirm` | Fast Delivery | Casing inconsistent |
| `Personalized Recommendations` / `Edit Your Profile` | BI profile | |
| `Online Order Pickup` | In-store wayfinding sign | Physical-world string documented in help copy |

**`Changed your mind? Cancel your order.` is the best cancel affordance in this batch.** It supplies the reason before the action, in the customer's own framing, and it does not shame. Compare every other product's bare `Cancel Order`.

**Terminology flag — `Basket`, never `Cart` or `Bag`** `[observed]`. Confirmed at `/basket`, and in "Enter the code on the Basket page during Checkout", "added to your Shopping Basket", "add a Reward to your online basket". **No instance of `Add to Bag` or `Add to Cart` appears on any fetched page** — notable in a category where "Bag" is the convention.

## T4 Onboarding & getting-started

**Beauty Insider join framing** `[observed]`: `Join Beauty Insider to earn points with every purchase.` Programme self-description: "The Beauty Insider Program is our free rewards program in the United States and Canada that lets you earn points on all your merchandise purchases and redeem those points for rewards ('Rewards')."

The enrolment flow itself is behind `/profile/BeautyInsider`. `[absent]`

**`Beauty Profile` is a named, editable self-description that drives the whole discovery layer** `[observed]`: "You can update your answers to the Beauty Profile questions at any time… The answers to these beauty questions help us personalize the recommendations we make for you."

**The house how-it-works pattern is `Step N` + one imperative sentence** `[observed]`

*Find My Shade — 5 steps plus a navigation tile:*
1. `Click the FIND MY SHADE button on any foundation product page.`
2. `Find the brand of foundation you currently use.`
3. `Choose the formula you're using.`
4. `Select the shade you wear.`
5. `Get your match in your new foundation!`
6. `Choose a Foundation ⏵`

*Smart Skin Scan — 3 steps:*
1. `Open the Sephora app and navigate to Smart Skin Scan. Take a well-lit selfie when prompted.`
2. `Get your personalized skin analysis within seconds.`
3. `Receive a four-step recommended skincare routine customized for your results.`

*Skincare framing:* `The Skin You Want in 4 Steps` — `Cleanse, treat, hydrate, and protect.`

Four verbs, one comma-run, one sentence. The entire skincare category reduced to a four-word sequence — and it is the same construction Wise uses for help-category scope lines.

## T5 Form & field labels

Thin — most inputs are JS-rendered. Observed `[observed]`:

- `Search` (header)
- `Sort` and its current value `Sort by: Relevance`
- **Sort live-region helper, verbatim:** `Choosing sorting option will automatically update the products that are displayed to match the selected sorting option`
- `In Store` and `Fast Delivery` — two toggles sitting **above** the facet list on every PLP
- `Security Question` (password recovery)
- Search-query guidance from `/beauty/find-products`, describing rather than labelling: "You can be as broad as 'red lipstick' or as specific as 'dry skin moisturizer.'"

That last line is doing real work: it teaches query breadth by showing both ends of the range with two concrete examples. Most search help says "try different keywords".

## T6 Order & fulfilment status language

**Named states, published as labelled pairs** `[observed]` — Sephora publishes both the internal stage name and the customer-facing value:

| Stage label | Customer-facing status |
|---|---|
| `Order Submitted` | `"Placed"` |
| `Order Processing` | `"In Progress"` |
| `Order Delivery` | `"Shipped"` |
| `Order Delivery` | `"Partially Shipped"` |
| `Order Returned` | `"Returned"` |

**Publishing the stage name and the status value side by side is unusual and useful.** Two states share one stage (`Order Delivery` → `Shipped` / `Partially Shipped`), which the pairing makes visible. Trigger conditions are stated: `Placed` once the card is authorised; `In Progress` at the warehouse ("Please allow 1 - 2 business days"); `Shipped` once a tracking number is assigned and the package has left; `Partially Shipped` when one of multiple shipments has gone.

`Partially Shipped` as a first-class named state is the kind of thing most retailers hide behind a generic "Shipped" and then field calls about.

**Pickup (BOPIS) states, as named in notification copy** `[observed]`: `"Order Ready for Pickup"` (the forwardable email, carrying a **pickup barcode**) and `"Your Order Is Ready"` (the email that also flags out-of-stock items). In-store wayfinding: `Online Order Pickup`.

Two email names for one event, one of which additionally carries the bad news. `[observed]`

**Fast Delivery states** `[observed]`: a confirmation email on receipt; a second confirmation "once the order is en route to your location"; an app alert "when your order is out for delivery". Scheduled slots surface as `"Today/Tomorrow, Date, Time"`.

**Other named conditions** `[observed]`: `Partially Canceled Orders` · `Order Details page` · `Order Confirmation page` · `Order Confirmation email` · `Shipping Confirmation email` · `Gift Receipt email` · `Order Summary` · `post-purchase notifications`.

**A live inconsistency** `[observed]`: the returns page says returns take **up to 30 days** to process; the order-status page says **up to 2 weeks**. Two published figures for one process.

## T7 Error, failure & recovery

### The return window — 30 days, stated identically nine times

`[observed]`. **`within 30 days of purchase`**, repeated verbatim across Sephora.com mail returns, Sephora.com store returns, in-store purchases, BOPIS, Same-Day Delivery, Instacart/DoorDash/Uber Eats resale, TikTok Shop, and Sephora at Kohl's.

The condition phrase is consistently **`new or gently used`** — that exact pairing, dozens of occurrences. `gently used` is a remarkable licence for a beauty retailer to publish, and repeating it unchanged across every channel is a discipline most policies fail.

Policy effective date stated in caps: `THIS POLICY IS EFFECTIVE FOR ALL PURCHASES MADE ON AND AFTER APRIL 24, 2025.` Page stamp: `Last Updated: September 2, 2026`.

**Returns jump-links** `[observed]`: `Returns Policy` · `Sephora.com Purchases` · `Sephora.com Returns by Mail` · `Sephora.com Returns to a Store Location` · `Gift Returns` · `Sephora In-store Purchases` · `Sephora at Kohl's Returns` · `Canadian Returns`

Two numbered recovery routes: `1. Sephora.com Returns by Mail` and `2. Sephora.com Returns to Store Location`. Mail mechanics named: `Prepaid Return Label` · **`printerless FedEx Mobile Return Code`** · `original packing slip` · `Click here to start or track a return`.

`printerless FedEx Mobile Return Code` names the specific obstacle it removes. Naming the constraint in the feature name ("printerless") is more informative than "mobile return code" would have been.

### Enforcement copy, verbatim

`[observed]` — all under 15 words:
- `Items shipped to Sephora outside of the returns window… may not be credited back or returned to you.`
- `Sephora monitors return activity for abuse and reserves the right to limit returns`
- `All returns are subject to validation and approval at Sephora's discretion.`
- `We may ask you for a driver's license or government ID to verify your identity.`
- `Any products not verifiable within our system will be ineligible for a refund, exchange, or credit.`
- `Sephora is not responsible for lost or stolen packages.`

**Parcel-forwarding carve-out, stated twice identically** `[observed]`: "We will not offer replacements or refunds for orders or items that are reported missing or damaged that we reasonably believe to have been delivered to a parcel forwarding company."

### The samples no-remedy statement — an unusual and honest exclusion

`[observed]`. Sephora states it is "unable to reship free samples if they arrive damaged, if you receive free samples that are different from the samples you chose… or if one or more free samples is missing."

**Three failure modes named, and all three explicitly refused.** Most retailers stay silent on sample failures and absorb the support contacts. Sephora names each case and says no. The tone is flat and the construction is "unable to", not "will not" — but the content is a clear denial, published.

### Fast Delivery recovery FAQ — the strongest failure-title set

`[observed]`, verbatim:
- `What can I do if I entered the wrong address on my Fast Delivery order?`
- `What does it mean when some of my items are unavailable?`
- `What can I do if the item delivered is faulty?`
- `What can I do if some of my Fast Delivery items are missing?`
- `What if I don't receive my delivery?`
- **`My order delivery window has passed and my order has not arrived. What should I do?`**

That last one is the only **two-sentence, narrative-scenario title** on the Sephora estate — the customer states the situation, then asks. Its answer opens `We're sorry that your order is running late!` — **the only explicit apology string found anywhere in this harvest of Sephora.** One apology, in one place, for one failure.

Compare DoorDash, which opens three separate articles with "First and foremost, we're sorry!" Sephora rations the apology to near-zero. Whether that is discipline or coldness depends on the reader, but it is a deliberate and auditable position.

### Cancellation and expiry rules, literally stated

`[observed]`

| Rule | Verbatim / stated figure |
|---|---|
| Modification | `Once your order is placed, it cannot be modified.` |
| Standard cancel | "most orders can be canceled up to an hour after being placed" |
| Fast Delivery cancel | **15 minutes** |
| BOPIS cancel | any time before the pickup window ends |
| BOPIS expiry | five full days, then `your order will be cancelled and your items will be restocked` |
| BOPIS extension | **`We are not able to extend pickup windows.`** |
| Returns processing | `up to 30 days` (returns page) / `up to 2 weeks` (order status page) — **conflicting** |

`Once your order is placed, it cannot be modified.` is seven words with no hedge, no "generally", no "may". Most commerce products soften this into uselessness.

**Out-of-stock recovery** `[observed]`: partial cancellation plus an email notification; and the free-shipping threshold is honoured **even if the order drops below it after cancellation**. A goodwill rule stated as policy, not as a discretionary gesture. Related named article: `Item Substitution FAQs`.

## T8 Empty states

`[absent]` — `/basket` and search results require JS/session. The only adjacent inventory-absence strings are on PDPs, quoted in `/beauty/find-products`: products may read `"coming soon"` or `"temporarily out of stock"`, with the recovery affordance named as `"Email when in stock"` — also called `"email me"` on the same page. **Two names for one control, in one article.**

## T9 Discovery & product-fit guidance — PRIORITY

This is Sephora's strongest content surface, and the interesting part is the *architecture*, not the vocabulary.

### 9.1 Four parallel fit mechanisms, presented as a chooser

`[observed]`, on `/beauty/best-foundations` — four tools side by side, each with a name, a one-line promise, and a `Learn More About…` link:

| Tool | Promise (verbatim) |
|---|---|
| `AI Beauty Chat` | `Find formulas you'll love with personalized help.` |
| `Shade Finder Tool` | `Know your shade in one foundation? Get more matches from other brands.` |
| `Free Samples` | `Pick 3 foundation and concealer samples with $25+ spend.* Mix, match, and find your perfect shade.` |
| `In-Store Shade Matching` | `Get help in person with our FREE skin-scanning technology.` |

**Sephora does not pick a winner.** It ships four routes to one answer — algorithmic, translational, physical-trial, and human-in-store — and lets the shopper choose by disposition rather than by product. Nobody else in this corpus offers a tool chooser at all.

### 9.2 The flagship tool is a translator, not a quiz — the key insight

`Find My Shade` does **not** ask "what is your undertone?". It asks what you already own and maps it: `Find the brand of foundation you currently use.` → `Choose the formula you're using.` → `Select the shade you wear.` → `Get your match in your new foundation!`

**This sidesteps self-diagnosis entirely.** The hardest content problem in shade matching is that the customer cannot reliably answer questions about themselves. Sephora's answer is to ask a question the customer *can* answer — what is on your bathroom shelf — and do the translation server-side.

The word `quiz` is used, but only on the lighter entry page: `Take a quiz to find the perfect-for-you shade match.` and `Take a quick quiz to find the perfect-for-you shade match.` Note the coined hyphenated compound **`perfect-for-you`**, used in both.

**A real terminology collision** `[observed]`: the hub lists `Shade Finder` (→ `/makeup-color-match`) and `Find My Shade` (→ `/foundation-shade-finder`) as **two separate buying guides with separate promise lines**, and they cross-link to each other under "Related Content". `FIND MY SHADE` is also the literal PDP button name. Two names, two URLs, two guide tiles, one function.

**`Smart Skin Scan` is the diagnostic counterpart, and it is framed as detection rather than self-report** `[observed]`: "utilizes deep-learning technology to provide real-time skin analysis"; "complete results for **all skin types and tones** across seven skin concerns in seconds". Gated: `Available for all Beauty Insiders.`

**`AI Beauty Chat`** `[observed]`: "Always here to answer your beauty questions, provide product recs, and build a step-by-step routine tailored to you." Note the clipped **`recs`** — the most informal register anywhere in the Sephora corpus, and it appears in an AI product description.

**Human-advisor framing** `[observed]`: the role is consistently **`Beauty Advisor`** (`chat with a Beauty Advisor`, `Ask a Beauty Advisor to sample any brand in any shade`, `notify a Beauty Advisor that you're picking up an order`). Staff generally are `Cast Member` (once, in the birthday-gift FAQ) and `beauty experts` (Kohl's FAQ). Customers are `clients` and `guests` in policy voice, `you` in UI voice.

### 9.3 The facet rail — 21 group labels, globally shared

`[observed]`. The rail is a **single global facet set reordered by category relevance**, not a per-category set. Irrelevant groups still render — the fragrance PLP shows `Hair Texture`; the moisturiser PLP shows `Coverage`.

**Full distinct set:** `Your Beauty Preferences` · `Price Range` · `Brand` · `Rating` · `Skin Concerns` · `Skin Type` · `Coverage` · `Finish` · `Formulation` · `Benefits` · `Ingredient Preferences` · `Age Range` · `Sun Protection` · `Shopping Preferences` · `Size` · `Color Family` · `Hair Concerns` · `Hair Type` · `Hair Texture` · `Fragrance Type` · `Fragrance Family` — plus boolean chips `New` / `Sale` and the two rail-top toggles `In Store` / `Fast Delivery`.

**`Your Beauty Preferences` sits first on every PLP.** A personalisation facet, fed by the stored Beauty Profile, placed above price and brand. Sephora treats the shopper's own saved self-description as the **primary** narrowing axis. That is an architectural statement about what filtering is for.

Three group names are worth isolating:
- **`Ingredient Preferences`** — not "free from", not "avoid list", not "exclusions". Framing an exclusion filter as a *preference* removes the implicit claim that the excluded ingredient is bad. A genuinely careful piece of naming in a category full of unregulated health implication.
- **`Shopping Preferences`** — holds `samplesAvailable`, i.e. "can I try this first" is a shopping preference, not a product attribute.
- **`Color Family`** — not "shade family", not "tone group".

### 9.4 Facet values — recorded honestly, tokens kept separate from labels

**The expanded option lists did not render.** What follows are **param tokens** verified inside Sephora's own SEO cross-links, shown alongside the **anchor text actually presented to users**. These are not always the same and have not been conflated.

| Group | Param token (verified in URL) | User-facing anchor text seen |
|---|---|---|
| `coverage` | `light` / `medium` / `full` | `Light Coverage Foundations`, `Full Coverage Foundations`, `Full Coverage` |
| `skinType` | `drySk` / `oilySk` / `comboSk` / `sensitiveSk` | `Hydrating Foundations`, `Foundations for Combination Skin`, `Face Creams for Dry Skin` |
| `skinConcerns` | `acneBlemishes` | `Moisturizers for Acne-Prone Skin` |
| `finish` | `matte` | `Matte Foundations`, `Matte Finish` |
| `formulation` | `liquid` / `cream` / `lotion` / `pressedPowder` / `stick` | `Liquid Foundations` |
| `benefits` | `longWearing` / `hydrating` | `Long-lasting`, `Hydrating` |
| `ingredientPreferences` | `cleanAtSephora` / `crueltyFree` / `nonComedogenic` | `Clean Foundations`, `Clean`, `Cruelty-Free`, `Noncomedogenic` |
| `shoppingPreferences` | `samplesAvailable` / `makeupArtistFounded` | `THE MAKEUP EXPERT EDIT` |
| `sizeRefinement` | `value` | `Jumbo Size`, `Value Size Hair` |

**The skin-type taxonomy, stated in Sephora's own prose with a fit rationale attached to each** `[observed]`:

- `Dry skin prefers hydrating foundations` — "maintain a glow and fight flakiness"
- `Oily skin responds well to mattifying foundations` — "counter shininess and oil production"
- `Combination skin benefits from a foundation that can combat dry patches and an oily t-zone.`
- `Normal skin achieves the elusive ideal level of oil production`
- `Sensitive skin may benefit from a clean foundation` — "feel-good ingredients that can prevent irritation"

Note the grammar: **the skin type is the sentence's subject and it has a verb of preference.** "Dry skin prefers", "Oily skin responds well", "Combination skin benefits". The attribute is animate; the customer is absent. That is a subtle and effective way to give advice without telling anyone what they are.

**Coverage definitions, verbatim fragments** `[observed]`:
- Light: `provides a "your skin, but better" look with a sheer finish.` — **Sephora scare-quotes its own category idiom**
- Medium: `provides more even-looking skin while letting some natural skin features peek through.`
- Full: `covers it all.` / `Best for concealing blemishes, discoloration, and sometimes even tattoos`
- Elsewhere: full = `flawless, photo-ready finish`; medium = `buildable coverage`; light = `the next best thing to going makeup-free`
- Durability: `humidity-proof and transfer-resistant`

**The skin-concern taxonomy — exactly seven, verbatim** `[observed]`: `fine lines and wrinkles, dark spots, uneven texture, redness, dryness, pores, and blemishes` — explicitly scoped `for all skin types and tones`.

Seven named concerns is the most precise fit vocabulary in this file. Other concern terms appear in guide titles: `Acne and Breakouts`, `dullness, breakouts`, `hydration, redness, longevity, and smoothing`, and **`Stressed Skin`** / `Skincare for Stress` — "Choose a stress-caused concern to shop our top solves". Note the coined noun **`solves`**, used twice (`most-trusted solves`).

**Fragrance families — exactly four, with counts** `[observed]`: `Floral (577)` · `Warm & Spicy (514)` · `Fresh (273)` · `Earthy & Woody (317)`. Sub-axis is notes, not sub-families: `Fragrance Notes` — `Shop by key notes like vanilla, rose, and citrus.` Concentration axis is `Fragrance Type` (`Eau de Parfum`, `Eau de Parfum Intense`, `Eau de Toilette`). Audience facets as category children: `Women` · `Men` · **`Unisex / Genderless`** · `Vegan` · `Mini Size` · `Value & Gift Sets` · `Candles & Home Scents`.

Four families, with counts attached, is a deliberately small taxonomy. The industry's olfactive wheels run to dozens of categories; Sephora ships four and pushes granularity into notes.

**Hair vocabulary** `[observed]`: concern section heads `For Damaged Hair` ("Target breakage, split ends, and beyond"), `For Thinning Hair` ("Visibly thickening serums, masks, and more for fine hair."), `For Dry Hair` ("Quench dryness with hydrating hair masks, oils, and more."). Prose concern list: `dryness, damage, frizz, and thinning hair`. Texture guides: `Curly, Coily, Textured Hair-Care Guide`, plus separate `Coily Hair Product Guide`, `Curly Hair Product Guide`, `Wavy Hair Product Guide`. Axis coverage stated as: **`Find solutions for every texture, type, color, and concern.`**

**Shade range is expressed as a count, not as descriptors** `[observed]`: `51 Colors`, `57 Colors`, `46 Colors`, `24 Colors`; sizes as `4 Sizes`, `2 Sizes`.

### 9.5 Badge vocabulary

`[observed]`

| Badge | Definition (verbatim) |
|---|---|
| `Clean at Sephora` | `The beauty you want, minus the ingredients you might not.` |
| `Planet Aware at Sephora` | `Brands that have made meaningful environmental commitments.` |
| `Clean + Planet Aware at Sephora` | `Beauty backed by environmental commitments and formulated with carefully selected ingredients.` |

**`The beauty you want, minus the ingredients you might not.`** is the most carefully hedged badge definition in this corpus. It makes no health claim, no safety claim, no "natural" or "non-toxic" assertion. It names a *preference* ("you might not") rather than a property. Given the legal and scientific minefield around "clean beauty", that sentence is doing enormous defensive work in eleven words — and it still reads as a benefit.

Rendered on tiles as `Clean at Sephora` and **`Clean plus Planet Aware`** — the `+` is spoken as "plus" in the alt text, which is correct for speech.

Clean is scoped per category with four sub-guides: `Clean at Sephora Skincare` · `Clean at Sephora Makeup` · `Clean at Sephora Hair Care` · `Clean at Sephora Fragrance`. Hair variant hedges further: "products that follow Clean at Sephora **guidelines**".

**Other tile badges** `[observed]`: `BLACK OWNED AT SEPHORA` · `Sephora Quality Great Value` · `ONLY AT SEPHORA` / `Only at Sephora` · `New` · `Limited Edition` · `Sponsored` · `best of beauty 2026` · `allure 2024 Best of Beauty Award Winner`

### 9.6 Guide-title grammar

`[observed]`. Every tile is `Buying Guide` + title + one-line subhead. Four title shapes:

| Shape | Examples |
|---|---|
| Superlative / utility | `Best Shampoos & Conditioners` · `Our Favorite Mascaras` · `The Best of Retinol` · `Best Colognes for Men` |
| Second-person promise | `Your Healthiest Hair—Ever` · `Your Skin Concerns, Our Top Picks` · `Your Weekly Hair Reset` · `Step Up Your Moisturizer` |
| Playful / coined | `The Matte Renaissance` · **`Set Your Skintention`** (portmanteau) · `Skincare Benefits, Makeup Energy` · `Great Hair Energy` · `Buttery, Silky, Juicy Makeup` · `Skin Happens, Science Saves It` · `Now Starring: Your Hair` |
| Fit-explicit | `Skincare by Skin Type` ("Love the skin you're in with a skincare routine that meets your unique needs.") · `Essential Skincare Ingredients` ("Find the just-right solutions for your top concerns.") · `Healthy Scalp Care Guide` |

`Your Skin Concerns, Our Top Picks` is the whole transaction in five words: you bring the problem, we bring the shortlist.

House intensifier: **`just-right`** (`there's a just-right fit for you`, `just-right solutions`, `just-right prices`), alongside `perfect-for-you`. Two hyphenated compound adjectives doing the same job.

### 9.7 Sampling as the fit mechanism, stated outright

`[observed]`: **"One of the best ways to find the right foundation and concealer is by sampling."** In store: `Ask a Beauty Advisor to sample any brand in any shade.` Online: "You can also find your shade match from home by selecting three free foundation or concealer samples online with minimum spend." Offer: `Pick 3 foundation and concealer samples with $25+ spend.*` with `*Exclusions/terms apply.` Facet route: `filters[shoppingPreferences]=samplesAvailable`.

**Sephora's published answer to shade fit is physical trial, not algorithmic prediction — and it says so in the same paragraph as its AI tools.** A retailer with an AI skin scanner telling you that the best method is to try three of them is unusually honest positioning.

## T10 Loyalty programme language — PRIORITY

### Three tiers

`[observed]`. `Insider` · `VIB` · `Rouge`.

- `Insider` — appears as `Insiders, VIB and Rouge receive 1 Beauty Insider point` and `Insider, VIB or Rouge only events`
- `VIB` — expanded exactly once, verbatim: **`Very Important Beauty Insider status`**
- `Rouge` — `Rouge status`, `Rouge members`, `Rouge Reward`. **Never expanded, never explained.**

Members collectively are `Beauty Insider members` / `Insiders`.

**The naming strategy per tier is the artefact.** `Insider` is inclusive and describes membership. `VIB` is an acronym whose expansion is published once and then abandoned — **the abbreviation is the brand**, and the expansion ("Very Important Beauty Insider") is slightly ridiculous when spelled out, which is presumably why it is spelled out once. `Rouge` is a French colour word carrying premium connotation **by assertion rather than by description** — no gloss, no explanation, no English equivalent offered. Three completely different naming mechanisms in one three-tier ladder.

### Thresholds — literally stated

| Tier | Statement |
|---|---|
| `Insider` | **No spend threshold exists.** Entry is free enrolment: "our free rewards program in the United States and Canada" |
| `VIB` | `To achieve Very Important Beauty Insider status, spend $350 in a calendar year` |
| `Rouge` | `To achieve Rouge status, spend $1,000 in a calendar year` |

Both are qualified identically — spend counts across sephora.com, sephora.ca, Sephora stores, Sephora at Kohl's (US only), kohls.com, Instacart, DoorDash, Uber Eats. Both carry the same exclusion: `Orders placed on Sephora TikTok Shop do not qualify for … status at this time.`

**"at this time" is the hedge to note** — a channel exclusion written as temporary rather than permanent, in a programme document.

### Points vocabulary

`[observed]`

- Earn rate: "For every U.S. or Canadian dollar you spend … Insiders, VIB and Rouge receive **1 Beauty Insider point**" — **flat across all tiers.** Tier does not accelerate earn, which is a genuinely unusual loyalty design and is stated without comment.
- **`Beauty Bank`** — the points-balance container. Also rendered `beauty bank` lowercase in one FAQ and `current point bank` in another.
- **`My Beauty Bag`** — purchase history. Two coined containers, both using a physical-object metaphor.
- `current points balance` · `year-to-date activity` · `point activity` · `bonus point events` / `bonus points event` · `Point Multiplier Event`
- Live promo seen on the fragrance PLP: `4X POINTS†† ON FRAGRANCE` / `Earn more points on purchases with code NEWSCENTS`
- **Negative balances are explicitly possible:** `It is possible your account could have a negative balance after merchandise is returned.`
- **Expiry, literally stated:** `All unredeemed points expire when you have not engaged in point activity … for 12 months or more.`
- Earning exclusions, verbatim: `e-gift cards, gift cards, a FLASH Shipping subscription, tickets for special Sephora-sponsored events, taxes and/or shipping`. In-store services **do** earn: `Dry Bar Services and Brow Bar Services`.

Publishing "your account could have a negative balance" is the kind of disclosure most loyalty programmes leave to be discovered.

### Rewards

`[observed]`

| Reward | Literal value stated |
|---|---|
| `Rewards Bazaar` (full: `Beauty Insider Rewards Bazaar`) | Rewards `ranging from 50 points to 100,000 points` |
| `Beauty Insider Cash` | `redeem 500 points for $10 off their purchase`; once per transaction; purchase must be `$10 or greater` |
| `Rouge Reward` | `a non-transferable $100 reward available to Rouge members in exchange for redemption of 2,500 Beauty Insider points` |
| 100-point reward | "you may continue to redeem one deluxe-size sample for 100 points" |
| Bundled | `choose three 100-point rewards for 250 points, receiving a 50-point discount` — US online only |
| `Birthday Gift` | `one Birthday Gift per year during the month of their birthday` |

**The redemption threshold that changes behaviour, stated literally:**
- `Rewards valued from 50 to 749 points and all require a merchandise purchase if redeemed online.`
- `Rewards valued from 750 points to 100,000 points offered online do not require a merchandise purchase and are provided with free standard shipping.`
- Above 750 without merchandise: "not eligible for free samples and cannot be used in conjunction with other promotion codes or discounts during checkout."

**A 750-point line in the sand, with three consequences on each side, published as a rule.** Most programmes bury this in terms; Sephora puts it in the FAQ with the exact numbers.

Limits: "you can only redeem one unit of any particular Reward … in a given redemption transaction"; "you may not redeem more than 10 of the same type of Reward SKU per year".
Rouge Reward expiry: `Rouge Rewards expire 90 days from the date of the confirmation email`; confirmation `within 24 hours`; escalate if not received `within 48 hours`.
Cadence: `the Rewards Bazaar will continue to be updated with new and exciting rewards on Tuesdays and Thursdays at 9am PT.`

**Publishing the restock schedule down to the day and hour** is a small thing that converts a lottery into an appointment.

Tier-differentiated benefits, verbatim: `VIB and Rouge members also have access to exclusive Rewards such as full-size products, and Rouge members have access to a Rouge Reward valued at $100.`

Non-refundability: `Rewards are non-transferable, have no cash value (unless required by law) and cannot be exchanged, sold or returned.` Items bought with a Rouge Reward "cannot be returned to Sephora stores or Sephora.com" — exchange only, in store, for the identical item.

### Register per tier

**Sephora does not differentiate voice by tier.** The loyalty FAQ is uniformly neutral-procedural for all three. Tier personality lives entirely in the naming (see above). Rouge is the only tier with a named, monetised, expiring benefit and the only one with dedicated marketing pages (`Rouge Preview`). Marketing voice (`New week, new you, Beautiful. 🙌`) appears on the storefront and guide tiles and **never inside the loyalty FAQ** — a clean register boundary between acquisition and administration.

## T11 Fees, shipping & disclosures

**The published shipping rate card** `[observed]` — Sephora publishes the full table, which almost no US retailer does:

| `Shipping Method` | `Costs` |
|---|---|
| `Standard 1-3 Day Shipping (Beauty Insiders)` | `FREE` |
| `Standard 1-3 Day Shipping (Guest Checkout Orders $50 and Over)` | `FREE` |
| `Standard 1-3 Day Shipping (Guest Checkout Orders Under $50)` | `$6.95` |
| `Guaranteed 2 Business Day Shipping` | `$12.95` |
| `Guaranteed 1 Business Day Shipping` | `$16.95` |
| `USPS Priority` | `$7.95` |
| `Gift Cards` | `FREE` |
| `eGift Cards` | `FREE` |

Headline: `We offer FREE Standard 1-3 Day Shipping on all US merchandise orders for Beauty Insider members, no minimum purchase required.`

**The method names carry their own eligibility conditions inside the label.** `Standard 1-3 Day Shipping (Guest Checkout Orders Under $50)` is a shipping method whose name is a customer segment. Ungainly, but unambiguous — the table is self-documenting and needs no footnotes.

`Guaranteed` on the two expedited tiers, against no qualifier on Standard, is a precise word choice: one is a promise, the other is an estimate.

**Fast Delivery fee** `[observed]`: `The Fast Delivery fee starts at $2.95` · `No, there is no minimum spend required to place a Fast Delivery order.` Requires a Beauty Insider account. Partners named: `Uber, Doordash, and Shipt`. Tips are stated to be **included in the driver base rate** — Sephora resells three of the products in this very corpus and absorbs their tipping model into a flat fee.

**Fulfilment option names** `[observed]`: `Buy Online, Pick Up In Store` (also `Buy Online & Pick Up In Store`, `BOPIS` in URLs) · `Buy Online & Pick Up Curbside` · `Ship to FedEx Pickup Location` · `Same-Day Unlimited` · `Third Party Delivery` · `Auto-Replenish` · `Fast Delivery`.

**A live rename in progress** `[observed]`: the FAQ is titled `Fast Delivery FAQs`, but the page H1, URL, and meta all still say `Same-Day Delivery`.

**Disclosure mechanics** `[observed]`: heavy footnote laddering — `*`, `**`, `***`, `****`, `†`, `^`, `††`, `(a)`, `(†††)` all appear as live markers. Standard tails: `*Exclusions/terms apply.` · `Valid while supplies last.` · `This offer is subject to change, alteration, or termination by Sephora at its sole discretion at any time.`

**Restricted goods** `[observed]`: `Restricted Hazardous Items` / `hazmat items` — aerosols and alcohol-based products, ground-only, no expedited, no AK/HI/PR, and **`Apple Pay is not available for orders containing items with this shipping restriction.`** A payment-method restriction derived from a shipping restriction, stated plainly.

**Payment methods named** `[observed]`: `Apple Pay` · `Google Pay` · `PayPal` · `Venmo` · `Klarna` · `Afterpay` · `Paze` · `Happy Cards` · `Sephora gift card` · `Sephora online credit` · `Sephora store credit` · `Sephora Merchandise Credit` · `Sephora Credit Card` · `Beauty Insider Cash` · `Credit Card Rewards`. BNPL is grouped under **`Shop Now, Pay Later`** with the guide title `Flexible Payments` ("Split your purchase into convenient payments.").

**Four distinct Sephora-money instruments** — `Sephora online credit`, `Sephora store credit`, `Sephora Merchandise Credit`, `Beauty Insider Cash` — all named separately in one payment list. The distinctions are load-bearing (different origins, different redemption rules) and the naming does not help the customer tell them apart.

**Stale copy** `[observed]`: the shipping page still carries `due to delays related to demand and COVID-19` in 2026.

## T12 Help-centre architecture

**Two-level tree, 6 categories, 53 articles.** Full inventory `[observed]`:

**`Shopping Sephora.com`** (8): `Accessibility` · `International Websites` · `Purchases` · `Beauty Services FAQs` · `Finding Products` · **`"My Lists" (formerly Loves)`** · `Sephora at Kohl's` · `FSA/HSA FAQs`

**`Orders & Returns`** (25): `Payment Methods` · `Sephora Credit Card FAQs` · `Shop Now, Pay Later FAQs` · `Gift Cards & eGift Cards FAQs` · `Gift Card Scam Awareness` · `Paze FAQs` · `Happy Cards` · `Billing, Canceling & Modifying Orders` · `Shipping Information (US)` · `Returns & Exchanges` · `Buy Online & Pick Up In Store FAQs` · `Ship to FedEx Pickup Location` · `Buy Online & Pick Up Curbside FAQs` · `Third Party Delivery FAQ's` · `Fast Delivery FAQs` · `Same-Day Unlimited FAQs` · `Same Day Unlimited Terms & Conditions` · `Item Substitution FAQs` · `Samples & Promotions` · `Corporate Gifts` · `Corporate Gift Cards FAQs` · `Gift Messaging` · `Final Sale` · `Auto-Replenish FAQ` · `Auto-Replenish Terms & Conditions`

**`My Account Help`** (6): `Account Registration, Sign In & Password` · `Order Status & History` · `Address Book` · `Email Subscriptions` · `Payments & Credits` · `Account Closure`

**`Beauty Insider`** (3): `Beauty Insider FAQs` · `Account Information` · `Terms & Conditions`

**`Beauty Insider Community`** (2): `Beauty Insider Community FAQs` · `Content Submission Guidelines`

**`About Sephora`** (8): `Contact Us` · `Terms of Use` · `Privacy Policy` · `Sephora Text Messaging Terms & Conditions` · `Sephora Text Messaging Promo FAQs` · `Sephora Applicant Privacy Policy` · `Sephora Affiliates` · `Quiet Hours`

**25 of 53 articles sit in `Orders & Returns`** — nearly half the entire help estate is about money, fulfilment and getting things back. The discovery content, by contrast, lives entirely outside the help centre in the Buying Guides tree.

**Article-title grammar — six shapes** `[observed]`:

1. **Noun phrase + `FAQs`** — dominant for feature topics (`Paze FAQs`, `Item Substitution FAQs`)
2. **Coordinated noun pair** — `Returns & Exchanges`, `Order Status & History`, `Samples & Promotions`, `Payments & Credits`
3. **Gerund series** — `Billing, Canceling & Modifying Orders`; `Account Registration, Sign In & Password`
4. **Bare noun** — `Address Book`, `Final Sale`, `Accessibility`, `Purchases`
5. **Imperative verb phrase** (rare) — `Ship to FedEx Pickup Location`
6. **Legacy-rename parenthetical** — `"My Lists" (formerly Loves)`

**Not one title is a question.** The entire Sephora help centre is noun-phrase-titled, whereas the questions live *inside* the articles as `##` headings. That is the exact inverse of DoorDash (every title a question) and Uber Eats (every title a first-person statement). Sephora's help IA is a **filing cabinet**; theirs are conversations.

Shape 6 deserves its own note: `"My Lists" (formerly Loves)` carries the legacy term **inside the navigation label**, permanently. `Loves` also survives in the URL `/beauty/loves`. A rename documented in the nav rather than in a changelog.

In-page navigation is a consistent **jump-link bar under the H1**, then `##` question headings, then `Back to Top`. Long policy pages carry `Last Updated: [Month D, YYYY]`.

**Support channels** `[observed]`: `Chat with Us` — `Live representatives are available: MON-FRI: 5am - 9pm PT / SAT-SUN: 6am - 9pm PT`. `Call Us` — `1-877-SEPHORA (1-877-737-4672)` `(US or Canada)`. Email `customerservice@sephora.com`. Accessibility routing: `Deaf and Hard-of-Hearing/TTY see Accessibility`.

**Publishing the vanity number alongside the digits** (`1-877-SEPHORA (1-877-737-4672)`) is correct practice — one form is memorable, the other is dialable, and a screen reader can handle the second.

## T13 FAQs

**Beauty Insider — 41 questions.** Verbatim selection `[observed]`: `What is the Beauty Insider Program?` · `How do I earn Beauty Insider points?` · `How do I achieve VIB Status?` · `How do I achieve Rouge Status?` · `What types of merchandise count for collecting Beauty Insider points?` · `Can I earn Beauty Insider points on Sephora TikTok Shop?` · `What happens to my points when I return items?` · `How does Beauty Insider Cash work?` · `What is the Beauty Insider Rewards Bazaar?` · `What are Rewards?` · `Can I return Rewards?` · `Will I earn points when redeeming my Rouge Reward?` · `What if a reward I selected is no longer available?` · **`I am having trouble redeeming this reward. What should I do?`** · `Can I give my Rouge Reward code to someone else?` · `Does my Rouge Reward Expire?` · `Do Points expire?`

*Answers summarised:* free US/CA programme; 1 point per dollar flat across tiers; VIB at $350/yr, Rouge at $1,000/yr; points deducted on return and balances can go negative; 500pts = $10 off, once per transaction, $10 minimum; Rewards Bazaar spans 50–100,000 points with a purchase requirement below 750; Rouge Reward is $100 for 2,500 points with 90-day expiry, non-transferable, no stacking; points expire after 12 months of inactivity.

`I am having trouble redeeming this reward. What should I do?` is the only two-sentence narrative-scenario question in the set, and it is the only one written from inside a failure.

**Note a live defect** `[observed]`: **two Q&A pairs are duplicated verbatim** on the page (the Beauty Insider Cash combining question and the return question each appear twice).

**BOPIS — 17 questions.** Verbatim selection `[observed]`: `When can I pick up my items?` · `Where do I go when I arrive?` · `How long will the store hold my pickup order?` · `Can I extend the pickup window?` · `Can I have someone else pick up my order?` · **`What if I don't have my barcode handy when I come in to pick up my order?`** · `What if some or all items are no longer in stock after I place my reservation?` · `What happens if I don't pick up my order?` · `Can I get samples in my pickup order?` · `Have more questions?`

*Summarised:* ready typically within four hours; five-day hold then auto-cancel and restock; the barcode is forwardable so a proxy can collect, with government ID as the fallback; no samples on pickup orders; Beauty Insider Cash and Credit Card Rewards work at pickup checkout but **Rouge Rewards do not**; returns in store only, within 30 days of pickup.

`Where do I go when I arrive?` is a physical-world wayfinding question in an e-commerce FAQ — the omnichannel tell.

**Fast Delivery — 28 questions.** Selection `[observed]`: `What is Fast Delivery?` · `Is there a minimum for Fast Delivery?` · `How will I know the driver is on the way?` · `Is there a delivery fee?` · `Who will be delivering my Fast Delivery order?` · `What if I am not available when the delivery partner arrives?` · `Do delivery partners accept tips? If so, how do I tip mine?` · `What is scheduled Fast Delivery?` · `How soon can I schedule an order?` · `How far in advance can I schedule an order?`

*Summarised:* same/next-day via Uber, DoorDash and Shipt; BI account required; no minimum; fee from $2.95; 15-minute cancel window; contactless drop; no samples; two-hour scheduled windows bookable roughly three to four hours out through the next evening; tips are included in the driver's base rate.

`Who will be delivering my Fast Delivery order?` is a question a retailer only has to answer because it resells someone else's logistics — and Sephora answers it by naming all three partners.

## T14 Terminology & glossary

No published glossary. Harvested from usage `[observed]`.

**Coined / proprietary:** `Beauty Insider` · `Insider` · `VIB` / `Very Important Beauty Insider` · `Rouge` · `Rouge Reward` · `Beauty Insider Cash` · `Rewards Bazaar` · `Beauty Bank` · `My Beauty Bag` · `Beauty Profile` · `Beauty Advisor` · `Cast Member` · `Clean at Sephora` · `Planet Aware at Sephora` · `Shade Finder` · `Find My Shade` · `Smart Skin Scan` · `AI Beauty Chat` · `Buying Guides` · `Your Beauty Preferences` · `Color Family` · `Ingredient Preferences` · `Shopping Preferences` · `Fast Delivery` · `Same-Day Unlimited` · `FLASH Shipping` · `Auto-Replenish` · `My Lists` · `Beauty (Re)Purposed` · `Sephora Texts` · `Quiet Hours` · `Sephora Collection` · `Sephora Favorites` · `Sephora Quality Great Value` · `Only at Sephora` · `Quicklook` · `solves` (n.) · `perfect-for-you` · `just-right`

**Chosen vs not used anywhere in the corpus:**

| Chosen | Not used |
|---|---|
| `Basket` | Cart, Bag |
| `Beauty Advisor` | Associate, Consultant, Sales assistant |
| `Rewards Bazaar` | Rewards catalog, Rewards store |
| `Beauty Bank` | Points balance (as a container) |
| `Fast Delivery` | Rapid delivery, Express delivery |
| `Clean at Sephora` | Natural, Organic, Non-toxic |
| `Ingredient Preferences` | Free-from, Avoid list |
| `Color Family` | Shade family, Tone group |
| `new or gently used` | Unused, Lightly used, Like new |
| `Fragrance Family` | Scent category, Olfactive family |
| `solves` | solutions (in guide copy) |
| `clients` / `guests` | customers (in policy voice) |

**Two explicit renames evidenced live**: `"My Lists" (formerly Loves)` carried in the nav label, and `Same-Day Delivery` → `Fast Delivery` mid-migration (H1 renamed, URL/title/meta not).

**Internal inconsistencies recorded** `[observed]`:
1. `Shade Finder` vs `Find My Shade` — two names, two URLs, two guide tiles, one function
2. `Email when in stock` vs `email me` — one control, two names, one page
3. Return processing: `up to 30 days` vs `up to 2 weeks`
4. `Auto-Replenish FAQ` (singular) beside sibling `…FAQs` titles; **`Third Party Delivery FAQ's`** carries a greengrocer's apostrophe
5. `Beauty Bank` / `beauty bank` / `point bank` within one FAQ page
6. Duplicated Q&A blocks on the Beauty Insider FAQ
7. Three caret glyphs in CTAs: `▸` (with and without a preceding space) and `⏵`

## T15 Voice, tone & accessibility

**Three cleanly separated voices** `[observed]`

1. **Storefront / marketing** — exclamatory, emoji-bearing, sentence fragments: `New week, new you, Beautiful. 🙌` · `Exclusives hit different.` · **`Go on, induldge.`** (live typo on the Buying Guides hub) · `Everyone's obsessed. You're next.` · `JUST DROPPED. MUST HAVE. ONLY AT SEPHORA. Make 'em yours.` · `Ahhhhh.` · `We won't tell.` · `so worth it.` · `a more chill you.`
2. **Guidance / help** — warm, first-person-plural: `Let us assist you in finding exactly what you're looking for.` · `we're here to help.` · `Choosing foundation and concealer that meets your beauty goals can be intimidating, which is why we're here to help.` · `We don't believe in gatekeeping great hair.`
3. **Policy / legal** — third person, `Sephora` as grammatical subject: `Sephora monitors return activity for abuse and reserves the right to limit returns` · `at Sephora's sole discretion` · `We regret that we are unable to…` (recurring softener, roughly eight occurrences)

**The transition between (2) and (3) is abrupt and worth flagging.** The Returns page opens warmly — "If you are not completely satisfied with a Sephora purchase or gift for any reason, Sephora welcomes you to return…" — and shifts to enforcement language *within the same paragraph*. A register cliff, not a gradient.

**`Choosing foundation … can be intimidating, which is why we're here to help.`** is the best sentence on the estate. It names the emotion (intimidating), does not minimise it, and attaches the remedy with a causal connector rather than a but-clause.

**Inclusivity signals** `[observed]`: `for all skin types and tones` (Smart Skin Scan) · `Unisex / Genderless` as a first-class fragrance facet · `Diversity & Inclusion` as a top-level Buying Guides category containing `Honoring Hispanic Heritage Month Together`, `Beauty for Self-Love` ("Stand by LGBTQIA+ brands with products that celebrate you."), `Try It, Love It` (Black-owned brands), `Women-Founded Brands`, `Hearts Not Hate` ("We're creating safe, inclusive online spaces where all feel welcome.").

### Accessibility — the weakest statement in this batch, and a contradiction in the markup

**Accessibility statement** `[observed]`, at `/beauty/accessibility` — **one paragraph**. Conformance claimed against `Web Content Accessibility Guidelines ("WCAG") 2.0, Level A and AA success criteria`, hedged as **`substantially conforms`**. Contact `accessibility@sephora.com`. Telephone support routes Deaf/HoH/TTY users via `see Accessibility`.

**WCAG 2.0, in 2026.** Deliveroo aims at 2.1 AA with 2.2 as a practical benchmark; DoorDash claims 2.2 AA; Uber claims 2.1 AA. Sephora claims 2.0 — two versions behind — and does so in a single paragraph with no scope statement, no AT list, no audit disclosure, and no remediation commitment.

**And the markup contradicts the claim.** `meta-viewport` on **every** page is `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`. **`maximum-scale=1.0, user-scalable=no` blocks pinch-zoom — a WCAG 1.4.4 (Resize Text) failure** that is present even in the 2.0 criteria the statement claims. This is the single most significant accessibility finding in this harvest: a stated conformance claim directly contradicted by a site-wide meta tag.

**Alt text, by contrast, is genuinely good — the best in this batch** `[observed]`:

- `Advertisement showing a K18 FutureIQ hair serum bottle beside before-and-after close-ups of hair. Text highlights "Less Gray," "More Hair," "Only at Sephora," and notes results from a 12-week clinical study.`
- `Beauty ad on a purple gradient background featuring a tube of Saie beauty product, a Westman Atelier foundation bottle, and an open eyeshadow palette.`
- `Pink promotional graphic featuring three fragrance bottles and a Beauty Insider badge labeled 4X points per dollar.`
- `Image of curly hair model and dark blonde model.` · `Clean At Sephora Seal` · `Banner image with sponsored content`

**Promotional alt text embeds the on-image copy in quotation marks** (`"THE MAKEUP EXPERT EDIT" "Pro picks for pro results." "SHOP NOW"`) — a deliberate and effective pattern giving screen-reader users parity with visual promos, including the CTA. Badge alt renders `+` as the word `plus` (`Clean plus Planet Aware`), correct for speech.

Other a11y strings: the sort control's live-region announcement `Choosing sorting option will automatically update the products that are displayed to match the selected sorting option`.

**So Sephora has the best alt text and the worst accessibility statement in the batch, plus a site-wide zoom block.** Alt text is authored by content people; viewport meta tags and conformance statements are not. The gap is organisational, and it is visible from the outside.

**Meta discipline** `[observed]`: `<title>` pattern is `[Page Name] | Sephora` throughout.

**Live defects recorded honestly**

1. `user-scalable=no` on every page, contradicting the stated WCAG 2.0 AA claim.
2. `Go on, induldge.` — typo on the Buying Guides hub.
3. Duplicated Q&A pairs on the Beauty Insider FAQ.
4. `Third Party Delivery FAQ's` — greengrocer's apostrophe in a live category listing.
5. Return processing stated as both `up to 30 days` and `up to 2 weeks`.
6. `Shade Finder` / `Find My Shade`; `Email when in stock` / `email me`; `Beauty Bank` / `beauty bank` / `point bank`.
7. `Same-Day Delivery` → `Fast Delivery` rename half-complete (H1 renamed; URL, `<title>` and meta not).
8. `due to delays related to demand and COVID-19` still live on the shipping page in 2026.
9. Three different caret glyphs across CTAs, with inconsistent preceding spaces.
10. Facet rail renders irrelevant groups (`Hair Texture` on a fragrance PLP, `Coverage` on a moisturiser PLP).

---

## Transferable patterns

1. **Ask the question the customer can actually answer.** `Find My Shade` asks what foundation you already own, not what your undertone is. When self-diagnosis is unreliable, translate from a known artefact instead of interrogating the user about themselves. This is the strongest single idea in the file and it transfers to risk profiling, sizing, plan selection, and any "which one is right for me" flow.
2. **Ship a tool chooser, not a tool.** Four named routes — AI, translation, physical sample, in-store human — with a one-line promise each, and no default. Lets the user pick by disposition.
3. **Name an exclusion filter as a preference.** `Ingredient Preferences`, not "Free from" or "Avoid". It removes the implicit health claim while keeping the filter useful.
4. **Hedge the badge definition to the preference, not the property.** `The beauty you want, minus the ingredients you might not.` Eleven words carrying enormous legal weight without making a single claim about the ingredients.
5. **Put the stored self-description first in the filter rail.** `Your Beauty Preferences` above `Price Range` and `Brand` is an architectural statement that personalisation is a narrowing axis, not a garnish.
6. **Make the attribute the subject and give it a verb of preference.** "Dry skin prefers hydrating foundations." Advice without telling the reader what they are.
7. **Publish the full rate card with eligibility inside the method name.** `Standard 1-3 Day Shipping (Guest Checkout Orders Under $50)` is ugly and completely unambiguous. A self-documenting table beats a clean table plus footnotes.
8. **Publish the restock schedule.** "updated with new and exciting rewards on Tuesdays and Thursdays at 9am PT" turns a lottery into an appointment.
9. **Say no explicitly where you mean no.** The samples no-remedy statement names three failure modes and refuses all three. `We are not able to extend pickup windows.` `Once your order is placed, it cannot be modified.` Unhedged refusals reduce support load and respect the reader.
10. **Supply the reason inside the cancel CTA.** `Changed your mind? Cancel your order.`
11. **Embed on-image copy in alt text, in quotation marks, including the CTA.** Screen-reader parity with visual promos, done properly.
12. **Negative pattern: audit the viewport meta tag against the accessibility statement.** `user-scalable=no` sitewide alongside a published WCAG AA claim is the clearest example in this corpus of a commitment that content people wrote and engineering did not implement.
13. **Negative pattern: three naming mechanisms in one tier ladder confuses the ladder.** `Insider` (descriptive) → `VIB` (acronym, expanded once) → `Rouge` (undefined French noun) does not read as a progression. Compare four separately-named money instruments (`online credit` / `store credit` / `Merchandise Credit` / `Beauty Insider Cash`) that the customer cannot distinguish.

## Caveats & gaps

- **PLP facet *values* did not render.** All 21 facet group labels are `[observed]`; the option list inside each is client-rendered. The values in T9.4 are verified from live filter params in Sephora's own SEO cross-links, and **param tokens are kept visually distinct from user-facing anchor text** rather than presented as UI labels. Do not treat `drySk` or `cleanAtSephora` as UI strings.
- **`Color IQ` was not found anywhere.** The nearest live equivalents are `In-Store Shade Matching` ("Get help in person with our FREE skin-scanning technology.") and `Smart Skin Scan`. Treat Color IQ as retired or absent from public web content as of this harvest — do not write it into the corpus.
- **Undertone vocabulary was not found.** No `warm`, `cool`, `neutral`, `olive`, or `undertone` appeared as a shade descriptor on any fetched page. This is almost certainly deliberate (see T9.2) but it means the corpus has no Sephora undertone strings.
- **Shade-depth descriptors were not found.** No `fair`, `light`, `medium`, `tan`, `deep`, `rich`. Shade range is expressed only as a count (`51 Colors`).
- **`Virtual Artist` was not found.** The AR try-on tool by that name did not appear. The live AI/AR tools are `Smart Skin Scan` and `AI Beauty Chat`.
- **No dedicated fragrance-finder quiz exists.** Fragrance discovery is browse-based (`Shop by Fragrance Family`, `Fragrance Notes`) with no equivalent to `Shade Finder`. A genuine asymmetry in the fit-tool coverage, not a harvest gap.
- **Empty-state copy was not obtained.** `/basket` and search results require JS/session.
- **The full per-tier benefit matrix is behind `/profile/BeautyInsider`.** The public FAQ states VIB/Rouge get "exclusive Rewards such as full-size products" and the $100 Rouge Reward; the complete grid was not reachable.
- **`Insider` has no spend threshold** — it is enrolment-based. Only VIB ($350) and Rouge ($1,000) have literal thresholds. Do not invent one for Insider.
- **Three URLs returned an empty body**: `/beauty-insider` (the vanity path; the real page is `/beauty/beauty-insider`), `/shop/hair`, `/shop/shampoo-conditioner-hair-products`. No CAPTCHA or WAF challenge was served at any point.
- Not individually fetched, identified by exact title and URL in T12: `Buy Online & Pick Up Curbside FAQs`, `Ship to FedEx Pickup Location`, `Same-Day Unlimited FAQs`, `Item Substitution FAQs`, `Auto-Replenish FAQ`, `Sephora at Kohl's FAQ`.
- No published content style guide, voice-and-tone documentation, or design-system content guidance was found on any Sephora surface.

## Sources

1. https://www.sephora.com/
2. https://www.sephora.com/beauty/customer-service
3. https://www.sephora.com/beauty/beauty-insider
4. https://www.sephora.com/beauty/loyalty-program
5. https://www.sephora.com/beauty/beauty-insider-account
6. https://www.sephora.com/beauty/returns-exchanges
7. https://www.sephora.com/beauty/order-status
8. https://www.sephora.com/beauty/shipping-information
9. https://www.sephora.com/beauty/find-products
10. https://www.sephora.com/beauty/samples-promotion
11. https://www.sephora.com/beauty/accessibility
12. https://www.sephora.com/beauty/in-store-pick-up-faq
13. https://www.sephora.com/beauty/same-day-delivery-faq
14. https://www.sephora.com/beauty/best-beauty-products
15. https://www.sephora.com/shop/foundation-makeup
16. https://www.sephora.com/shop/moisturizing-cream-oils-mists
17. https://www.sephora.com/shop/fragrance
18. https://www.sephora.com/shop/fragrance-families-notes
19. https://www.sephora.com/beauty/foundation-shade-finder
20. https://www.sephora.com/beauty/makeup-color-match
21. https://www.sephora.com/beauty/best-foundations
22. https://www.sephora.com/beauty/skin-analysis-tool
23. https://www.sephora.com/beauty/clean-planet-aware
24. https://www.sephora.com/beauty/best-hair-products-for-every-hair-type
25. https://www.sephora.com/beauty-insider — **empty body**
26. https://www.sephora.com/shop/hair — **empty body**
27. https://www.sephora.com/shop/shampoo-conditioner-hair-products — **empty body**
