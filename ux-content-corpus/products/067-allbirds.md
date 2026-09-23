# 067. Allbirds

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | DTC footwear (sustainability-led) |
| Primary URL | https://www.allbirds.com/ |
| Corpus rank | 067 |
| Benchmark strength (source list) | Product choice and material explanations |
| Locale / market observed | en-US |
| Platform observed | Web (desktop server-rendered HTML) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product; privacy layer cites US state privacy laws, Global Privacy Control, California "Shine the Light", California Transparency in Supply Chains Act |
| Harvest date | 2026-09-21 |
| Pages inspected | 20 |
| Harvest completeness | **Partial — and the gap is the headline finding.** The per-product carbon-footprint label that made Allbirds a benchmark is **no longer published**. Search, cart and several interactive states are client-rendered and unharvestable. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.allbirds.com/ | Hero, category tiles, global pre-footer triad |
| Men's collection | https://www.allbirds.com/collections/mens | Filter/sort/facet vocabulary — richest single source for T4 |
| Terralux collection | https://www.allbirds.com/collections/mens-terralux-cl | Hand-built collection for the newest material |
| PDP — Tree Runner NZ | https://www.allbirds.com/products/mens-tree-runner-nz-medium-grey | Materials & Sustainability accordion |
| PDP — Cruiser Terralux | https://www.allbirds.com/products/mens-cruiser-terralux-anthracite | INNOVERA™ material explanation |
| PDP — Wool Runner NZ Waterproof | https://www.allbirds.com/products/mens-wool-runner-nz-waterproof | Merino + membrane claims |
| Our Story | https://www.allbirds.com/pages/our-story | Founding narrative, B Corp claim |
| Our Materials (hub) | https://www.allbirds.com/pages/materials | Material chooser |
| Materials & Making | https://www.allbirds.com/pages/materials-making | Lifecycle carousel; `/pages/sustainability` redirects here |
| Shoe Care | https://www.allbirds.com/pages/shoe-care | Care instruction register |
| Help | https://www.allbirds.com/pages/help | The entire help centre — one FAQ category |
| Returns & Exchanges | https://www.allbirds.com/pages/returns-exchanges | Shell around third-party Redo portal |
| Accessibility | https://www.allbirds.com/pages/accessibility | Live but orphaned from footer |
| Legacy material pages | https://www.allbirds.com/pages/our-materials-tree · https://www.allbirds.com/pages/our-materials-sugar | HTTP 200, but render the generic hub body |

---

## T1 Navigation & IA labels

**Global header** `[observed]` — https://www.allbirds.com/collections/mens

Announcement bar carries two stacked messages: `Free ground shipping on orders over $100` and
`Due to increased demand, orders may take up to 30 days to ship.`
Skip link: `Skip to Content`.
Top level is unusually short: `New Arrivals` · `Shop All` · `Men` · `Women` · `Search`.

**Gendered drawers are near-mirrors with one asymmetry** `[observed]`

| Men's drawer | Women's drawer |
|---|---|
| `New Arrivals`, `Bestsellers`, `LEATHER ALTERNATIVES` | same featured row |
| `Men's Shoes`: `Shop All`, `Sneakers`, `Slip Ons`, `Sandals`, `Active`, `All-Weather` | `Women's Shoes`: `Shop All`, `Trainers`, `Sneakers`, `Flats`, `Sandals`, `Slip Ons`, `Active`, `All-Weather` |
| `Customer Favorites` | `Popular Picks` |

The same module is called `Customer Favorites` for men and `Popular Picks` for women. Two
labels, one component — a gendered voice split with no apparent rationale.

**Footer groupings** `[observed]`: three accordions whose triggers ship the glyphs in the
accessible name — `Help + -`, `Shop + -`, `Company + -`.

- Help: `help@allbirds.com`, `FAQ/Contact Us`, `Returns/Exchanges`
- Shop: `Men's Shoes`, `Women's Shoes`, `Men's Apparel`, `Women's Apparel`
- Company: `Our Story`, `Our Materials`, `Materials & Making`, `Shoe Care`, `Press`,
  `Allbirds Responsible Disclosure Program`, `California Transparency Act`,
  `Community Offers`, `Our Blog`, `Patents`
- Social heading: `Follow The Flock`
- Legal: `©AB DNAM LLC 2026 . All Rights Reserved`, `Refund policy`, `Privacy policy`,
  `Terms of service`, `Do Not Sell My Personal Information`, `Last Updated: August 6, 2026`

**IA collapse worth recording.** There is **no sustainability link in the footer**, no
accessibility link, and no help-centre link beyond `FAQ/Contact Us`. `/pages/accessibility`
is live but orphaned. For a brand whose entire proposition was environmental, the removal of
sustainability from the primary IA is the single loudest structural signal in this file.

**Breadcrumb defect** `[observed]`: PDPs render `Home / mens / Men's Tree Runner NZ` — the
middle segment is the raw lowercase collection handle, while the collection page itself
renders `Home / Men's Shoes`.

## T2 Value proposition & headline patterns

**Homepage hero** `[observed]` — https://www.allbirds.com/

> Eyebrow: `All New Dasher NZ Collection`
> H1: `Wildly Comfortable. Super Natural.`

Two two-word clauses, both adverb + adjective, separated by a full stop. Comfort first,
nature second — the ordering matters, because it is the inverse of the pre-2024 Allbirds
hierarchy, where the environmental claim led.

**The global pre-footer triad appears on every single page fetched** `[observed]` —
homepage, PDPs, collections, help, shoe care, accessibility:

| Label | Body (summarised) |
|---|---|
| `Wear All Day Comfort` | Lightweight, bouncy; slip in, lace up or slide on |
| `DESIGNED FOR EVERYDAY WEAR` | Daily routines, weekends, travel |
| `Materials From The Earth` | Replaces petroleum-based synthetics with wool, tree fibre, sugarcane |

Note the casing inconsistency inside a single three-item component: title case, ALL CAPS,
title case. The third closes with `win, win, win.` — the only place the sustainability claim
appears sitewide outside dedicated pages, and it is delivered as a throwaway.

**Section headers are alliterative or antithetical pairs** `[observed]`

`Better Things` / `Better Ways` (Our Story) · `LOOK GOOD` / `FEEL GOOD` / `DO GOOD`
(Terralux PDP) · `Look Buttoned-Up. Feel Out-of-Office.` · `You Won't Believe It's Not Leather.` ·
`Weather? Whatever` · `Our Loftiest Goal? Zilch.`

`Our Loftiest Goal? Zilch.` is the cleverest line on the site and the most instructive: a
question-and-one-word-answer construction where the answer is a slang synonym for zero, doing
double duty as self-deprecation and as the actual numeric claim (net zero). It is also,
tellingly, one of the last places a number survives.

**Collection page headline + deck** `[observed]` — https://www.allbirds.com/collections/mens

> `Men's Shoes` / "Sustainable, supportive, and wildly comfortable, our sneakers are always ready when you are."

Three adjectives, environmental one first, then a second-person availability promise.

**Materials hub** `[observed]` — https://www.allbirds.com/pages/materials

> Eyebrow: `Wildly Comfortable materials`
> H1: `Nature You Can Feel`

`Nature You Can Feel` is the pivot of the whole rebrand: it relocates the environmental claim
from something you *verify* (a number) to something you *sense* (texture). That is a
deliberate and consequential content-design decision and the most transferable finding here.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `SHOP MEN` / `SHOP WOMEN` | Homepage hero | All-caps reserved for hero only |
| `Shop Men` / `Shop Women` | Category tiles; material cards on hub | Title case at lower hierarchy — a deliberate gradient |
| `Shop All` | Nav drawer, favourites module | |
| `Add to Cart` | Collection product cards | No price |
| `Add to Cart - $100` | PDP primary button | **Price interpolated into the button label** |
| `Add to Cart -` | PDP sticky bar, before size chosen | Ships with dangling hyphen and no price — copy bug |
| `Select A Size` | PDP, replaces Add to Cart when no size picked | Title-cased `A` |
| `Notify Me` | PDP, variant out of stock | |
| `Get Notified` | Back-in-stock modal submit | **Different verb from the trigger** |
| `Fit Guide` | PDP, under size grid | |
| `Filter and Sort` | Collection facet drawer trigger | |
| `Apply filters` | Same drawer, submit | Sentence case — inconsistent with its own trigger |
| `Learn More` | PDP brand panel | Bare "Learn more", no object |
| `LEARN MORE ABOUT OUR MATERIALS` | Our Story → `/pages/materials` | |
| `LEARN MORE ABOUT SUSTAINABILITY` | Our Story → `/pages/materials-making` | **Label says "sustainability", destination is titled "Materials & Making"** |
| `Get yourself a fresh new pair` | Shoe Care, after insole pitch | Imperative sell inside a care article |
| `Contact Us` | Returns & Exchanges | |
| `Previous Image` / `Next Image` | PDP gallery | Correctly labelled |
| `Previous` / `Next` | Our Story carousel | Same component, unlabelled — inconsistent |
| `HERE` | Help FAQ, starts a return | **Bare deictic link text** |
| `Skip to Content` | Global | |

**Observation.** The CTA set is small and mostly clean, but the three defects cluster in one
place: the point where a user commits. `Add to Cart -`, `Select A Size` vs `Add to Cart`,
`Notify Me` vs `Get Notified`, and `Filter and Sort` vs `Apply filters` are all
trigger/target verb mismatches at moments of decision.

## T4 Onboarding & getting-started — guided product choice

Allbirds has no onboarding flow. Its guided-shopping surface is the **material chooser** plus
the **facet vocabulary**, and the two disagree with each other, which is the most useful
finding in this section.

**Material chooser — tagline + material name, four cards** `[observed]` —
https://www.allbirds.com/pages/materials, under `Explore Products By Material`:

| Tagline | Material name |
|---|---|
| `Smooth & Breezy` | `Tree` |
| `SOFT & STRONG` | `Wool` |
| `LIGHT & DURABLE` | `Organic Cotton Canvas` |
| `POLISHED & PLANT-BASED` | `Terralux™` |

The construction is **two sensory adjectives joined by an ampersand, then a one-word natural
noun.** `Tree` rather than "TENCEL Lyocell". `Wool` rather than "ZQ Merino". This is the
technical-claim-to-comprehensible-word move the brief asked about, and it happens at the
naming layer, before any explanation is attempted. Each card deep-links into a pre-filtered
collection URL.

**The same four materials, named four different ways across four surfaces** `[observed]`:

| Surface | Name used for the leather alternative |
|---|---|
| Nav drawer | `LEATHER ALTERNATIVES` |
| Materials hub | `POLISHED & PLANT-BASED` / `Terralux™` |
| PDP | `INNOVERA™` |
| Collection filter | `alternative-leather` |

The filter values are **raw un-humanised metafield slugs**: `alternative-leather`, `canvas`,
`corduroy`, `cotton`, `sugar`, `tree`, `wool`. `sugar` as a filter label for the material the
marketing calls `SweetFoam®` is the clearest instance. A content designer can read this as a
governance failure: the material lexicon was rewritten at the marketing layer and never
propagated to the merchandising metadata.

**Facet vocabulary** `[observed]` — https://www.allbirds.com/collections/mens

- `Sort By`: `Featured`, `Most relevant`, `Best selling`, `Alphabetically, A-Z`,
  `Alphabetically, Z-A`, `Price, low to high`, `Price, high to low`, `Date, old to new`,
  `Date, new to old` — **the untouched Shopify defaults**
- `Size` with a genuinely useful helper line: "Most of our shoes only come in full sizes. If
  you're a half size, select your nearest whole size too."
- `Color`: `black`, `grey`, `white`, `beige`, `brown`, `green`, `blue` — all lowercase
- `Price`: `Under $75`, `$76 - $100`, `$101 - $125`, `$126 - $150`, `Over $150`
- `Product Type`: `Everyday Sneakers`, `High Tops`, `Hiking Shoes`, `Running Shoes`,
  `Slip Ons`, `Slippers`, `Water-Repellent Shoes`

`Product Type` is the one facet written by a human, and it is use-case-named
(`Everyday Sneakers`, `Water-Repellent Shoes`) rather than form-named. It is also the facet
most likely to help someone choose.

**Fit guidance — PDP** `[observed]`

- `The Tree Runner NZ fits true-to-size for most customers.` — claim bounded by
  "for most customers" in the same sentence
- Fit Guide modal axes: `Average Width`, `Average Length`
- `Our Shoes are Unisex` with a conversion rule stated as two worked examples rather than a
  table: "If you wear a women's size 11.5-12, try a men's size 10.5-11. If you wear a men's
  size 7-7.5, try a women's size 8-8.5."
- Unit tabs: `US`, `UK`, `cm`
- Cross-sell line: `Also available in: Women's Sizes`

**PDP spec block** `[observed]`: `Weight:` `8.9oz (M9), 7.1oz (W7)` · `Stack Height:`
`Heel: 20mm Toe: 10.2mm` · `Heel/Toe Drop:` `9.8mm` · `Country of Origin:` `Vietnam`.
Also a `Best for` chip row. Note that **weight is given per size with the size named in
parentheses** — a precision convention the sustainability copy no longer matches.

## T5 Form & field labels

`[observed]`

| Label / string | Surface |
|---|---|
| `Notify me when back in stock` | Back-in-stock modal heading |
| `Email` | Same modal |
| `Get Notified` | Same modal submit |
| `You can opt out any time.` | Same modal, beside `Privacy Policy` |
| `Subscribe to our emails` / `Sign Up` | Footer |
| `Sign up for our newsletter` | Shoe Care |
| `Be the first to know about new products, sales, and more.` | Shoe Care |
| `Note: You can opt-out at any time. See our Privacy Policy and Terms.` | Shoe Care |
| `Added to Cart`, `Subtotal` | Cart drawer |
| `Where are we shipping to?` | Geo modal |
| `Select a size` | Size modal heading |
| `Color ( edition)` | **PDP variant label with an unfilled variable slot** |

`Color ( edition)` renders literally, with an empty interpolation, followed by the value
`Tree`. Alongside `Add to Cart -` and `Spend  more to earn free shipping!` (double space where
the remaining amount belongs), this is a **cluster of three broken template slots**, all of
which a screen-reader user would hear as incomplete labels. Recorded as a negative finding.

## T6 Status & state language

`[observed]` — the same shipping offer is expressed three different ways on one page:

- `Free ground shipping on orders over $100` (announcement bar)
- `Free Shipping on Orders over $100` (PDP, under price)
- `+ Free shipping` (inline beside price)

Other states: `Sale` · `Out of stock` · `NEW` · `New Color` · `final sale*` ·
`Final Sale items cannot be returned, canceled, or exchanged` ·
`Due to increased demand, orders may take up to 30 days to ship.`

The delay notice is worth flagging: a **30-day ship estimate shipped as a permanent-looking
banner**, with a cause ("increased demand") and no date bound. It sits directly above a
free-shipping promise, so the two most prominent logistics messages on the page pull in
opposite directions.

## T7 Error, failure & recovery

Thin, and thin in an instructive way. Only two error strings are server-rendered `[observed]`:

- `Oops! Something went wrong. Please try again.` — back-in-stock modal failure. Generic; no
  cause, no alternative path, and it uses the `Oops!` register that the rest of the site
  otherwise earns.
- `Please enter a valid email address` — newsletter validation

No 404 copy, no payment-failure copy, and no search-failure copy is server-rendered.
`/search?q=zzzzqqqq` returns an empty body to a non-JS request. `[absent]`

**The recovery copy that does exist is punitive rather than helpful** `[observed]`:

> `Rejected Returns:` "Returns that do not meet our return requirements may be rejected.
> Rejected returns are **non-refundable and forfeited**"

And a hard cutover with email as the only path: "If you placed your order **before June 11th
2026**, please contact help@allbirds.com". A user whose order predates a systems migration is
routed to an inbox with no expectation of response time.

## T8 Empty states

`[absent]` in server HTML, with two partial exceptions `[observed]`:

- No "no products match your filters" string exists in collection markup
- The cart drawer renders `Added to Cart` and `Subtotal` with no distinct empty-cart message
- The **out-of-stock state doubles as the empty state**, and it is the one place Allbirds
  writes well under pressure. `Out of stock` → `Notify Me` → modal, softened by a rationale:
  "Once limited edition colors sell out, they're gone for good. But on the upside, new colors
  aren't far behind."

That construction — *state the bad news, name why it is permanent, then supply the next
opportunity* — is the strongest single piece of microcopy on the site.

## T9 Notifications & system messages

`[observed]`

- Back-in-stock success: `It's Official` — "We got your info, and we're rooting for you."
  A coined success-state headline rather than "Thanks!", and it commits to the relationship
  ("rooting for you") rather than the transaction.
- Newsletter success: `Thank you for signing up!`
- Cart: `Added to Cart`
- Geo redirect modal: `Where are we shipping to?` — rationale summarised: buying from your own
  country's site is framed as the best way to "connect your feet to the world's most
  comfortable shoe", i.e. a routing interruption written as a brand line
- Privacy signal: the policy states GPC is recognised as a valid opt-out request

## T10 Disclosures, legal & compliance — sustainability and material claims

**This is the priority section, and its headline is an absence.**

### The per-product carbon footprint label is gone `[absent]`

Allbirds was the benchmark case for per-product carbon labelling — a kg CO₂e figure printed
on every product page. **No carbon number, no `kg CO2e`, and no `Carbon Footprint` label
appears on any current product detail page inspected.** Verified across three live PDPs
(Tree Runner NZ, Cruiser Terralux, Wool Runner NZ Waterproof). `/pages/sustainability`
301-redirects to `/pages/materials-making`, whose `<title>` tag is stale legacy — it still
reads "Our Carbon Footprint, How We Measure up" — while the rendered body contains no figures.
The word "carbon" survives on that page only inside a laundry instruction.

The only quantified carbon claim still published anywhere is **editorial, not a label**: the
`Our Loftiest Goal? Zilch.` panel describing `M0.0NSHOT Zero` as "the world's first net zero
carbon shoe", plus a linked blog post. No claim about *why* the programme was retired appears
on the site; this file records the absence, not a reason.

**Corporate-identity context, recorded because it bears on the copy.** The footer reads
`©AB DNAM LLC 2026`; the privacy policy opens with a section headed
`1. Change in Ownership and Operation`; and the accessibility page still names
`Allbirds, Inc.` The material lexicon, the sustainability IA, and the entity name are all
mid-migration, and the copy shows the seams.

### What replaced the number `[observed]`

**(a) A per-component accordion on the PDP** — `Materials & Sustainability`, structured
component → material → one-sentence claim:

- `UpperTree Knit` — eucalyptus-derived TENCEL™ Lyocell (tree fibre) and recycled polyester blend
- `MidsoleSweetFoam®` — sugarcane-based EVA foam, "light on the planet"
- `LacesRecycled Polyester` — 100% recycled polyester from plastic bottles

**(b) An alliterative unnumbered triad** on the PDP brand panel
`Better Things in a Better Way`: `Responsible Energy` · `Renewable Materials` ·
`Regenerative Agriculture`. Three R-words, no figures attached to any of them.

**(c) Narrative lifecycle prose** at `/pages/materials-making`, a four-step carousel:

| Step | Register (summarised) |
|---|---|
| `01 Materials` | Chosen "for how they feel, how they wear, and how they're grown rather than made" |
| `02 MANUFACTURING` | Opens with a candid admission; then relocates the claim from output to supplier choice |
| `03 Transportation` | Names returns and exchanges as part of the footprint |
| `04 PRODUCT USE` | Puts part of the footprint on the user's laundry habits |
| `Looking Ahead` | Continues to "evaluate ways to reduce" — no target, no date |

The `02 MANUFACTURING` opener is the most interesting sentence Allbirds currently publishes:
*"The truth is, making things takes energy. There's no version of this that doesn't."* It is a
**pre-emptive concession** — the brand states the strongest objection to its own claim before
making the claim, and then narrows the claim to what it actually controls. That is a
legitimate and highly transferable disclosure pattern, and it is doing the load-bearing work
the number used to do.

### How a technical material claim is made comprehensible `[observed]`

The consistent device is **trademark immediately glossed by a plain noun**:

| Coined / trademarked term | Plain gloss supplied alongside |
|---|---|
| `TENCEL™ Lyocell (tree fiber)` | "tree fiber", in parentheses, **every single time** |
| `SweetFoam®` | "sugarcane-based EVA foam" |
| `Featherbed™` | "memory foam insole" |
| `INNOVERA™` | "plant-based proteins, biopolymers, and post-consumer waste" |
| `C-Zero DWR` | "water repellent" |
| `Terralux™` | "LEATHER ALTERNATIVES" (nav) |
| `M0.0NSHOT Zero` | "the world's first net zero carbon shoe" |

The parenthetical gloss is never dropped, even on the third mention within one page. That
discipline is the mechanism by which a fibre-science term becomes a shoppable category.

### Hedges that carry the claim now `[observed]`

- `certified B Corp` — the **only** third-party certification named on any consumer page
- "prioritizing progress over perfection" (Our Story) — the explicit hedge
- "with a lighter footprint" (Terralux PDP) — unquantified replacement for the old figure
- "with over 80% renewable carbon content" — a **renewable-content percentage, not an
  emissions figure**, and the only percentage on any PDP. Worth flagging as a case where a
  number that looks like a carbon claim is measuring something else.
- "Our wool lining meets high standards of animal welfare, environmental care, and social
  sustainability" — **no scheme named**. The old site named ZQ; the current site does not.
  The string `ZQ` does not appear on any PDP inspected; wool is described only as
  `responsibly-sourced Merino wool`.

### Return and guarantee disclosure `[observed]`

- Standard window: **30 days** from delivery, unworn and unwashed with original tags
- Socks, undies and accessories: packaging must be unopened
- Customer pays return shipping **unless return coverage is opted into at checkout** — a paid
  add-on, disclosed at point of sale
- Refunds to original payment method only; returns only in the country of purchase
- `Final Sale` items = gift cards, insoles, and items tagged final sale
- `Rejected Returns` are "non-refundable and forfeited"

Two starred clauses under `Terms & Conditions` reserve the right to suspend policies for
suspected resellers and for accounts with "a high return rate", and to "limit, decline, or
reject any sales, returns, and orders for any reason". **No wear-test guarantee, no warranty
period, and no take-back or recycling programme copy exists anywhere on the current site** —
all three were previously associated with the brand. `[absent]`

## T11 Help-centre architecture

`[observed]` — **there is effectively no help centre.**

https://www.allbirds.com/pages/help is a single page containing:

1. `How Can We Help?`
2. `Email us at help@allbirds.com`
3. Exactly **one** category heading: `Returns Policy FAQ`
4. Four accordion questions
5. `Terms & Conditions` with two starred clauses

There is no shipping FAQ, no order-tracking FAQ, no sizing FAQ, no product-care FAQ, no
account FAQ and no payments FAQ. `/pages/returns-exchanges` is a shell around a third-party
Redo portal whose only native copy is `Still have questions?` / `Contact Us`.

**Legacy material deep pages are hollowed out rather than removed** `[observed]`.
`/pages/our-materials-tree` and `/pages/our-materials-sugar` both return HTTP 200 at their own
URLs but render the generic `/pages/materials` body. Only the stale `<title>` and meta
description survive — the sugar page's meta still carries a specific sourcing claim about
rainwater-fed Brazilian sugarcane that appears **nowhere in visible page copy**. Meanwhile the
waterproof PDP still links `Read more about our materials` to `/pages/our-materials-wool`.
The site is linking to pages whose content has been emptied.

## T12 FAQs

Placement: accordion under `Returns Policy FAQ` at https://www.allbirds.com/pages/help.
Four questions, and only four.

| # | Question (verbatim) | Answer (summarised) |
|---|---|---|
| 1 | What is your return policy? | 30 days from delivery; unworn/unwashed with tags; socks, undies, accessories unopened; final sale excluded; customer pays return shipping unless coverage opted into; refunds to original payment method; country-of-purchase only; rejected returns forfeited |
| 2 | How do I return a gift? | Returnable within 30 days using the order number from the shipping label or the back of the gift note |
| 3 | What items are final sale? Can I return them? | Gift cards, insoles, and items tagged final sale; other exclusions may apply |
| 4 | How do I send back my return? | Customer pays return shipping; link labelled `HERE` starts the return; orders before 11 June 2026 must email support |

**Structural note.** All four questions are about returns. Q1 and Q4 overlap substantially —
Q4 restates most of Q1's shipping terms before giving the actual instruction. Q2's answer is
copied verbatim from the intro paragraph directly above it. This is an FAQ block that has
been maintained by accretion rather than edited.

## T13 Terminology & glossary

| Term | Allbirds' usage | The alternative it rejected |
|---|---|---|
| `Tree` | The consumer-facing material name | "TENCEL Lyocell", "lyocell", "eucalyptus fibre" |
| `Wool` | Consumer-facing name | "ZQ Merino" — **no longer used on PDPs** |
| `SweetFoam®` | Trademarked midsole foam | "sugarcane EVA" alone |
| `Featherbed™` | Trademarked insole | "memory foam insole" alone |
| `Terralux™` | The leather-alternative platform | "vegan leather", "PU" |
| `INNOVERA™` | The Modern Meadow material inside Terralux | "bio-leather" |
| `M0.0NSHOT Zero` | The net-zero flagship | "carbon-neutral shoe" |
| `Follow The Flock` | Social CTA | "Follow us" |
| `It's Official` | Signup success headline | "Thanks!", "You're all set" |
| `Better Things in a Better Way` | Brand-values umbrella | "Sustainability" |
| `Responsible Energy` / `Renewable Materials` / `Regenerative Agriculture` | The unnumbered triad | Quantified targets |
| `pilling` | Named and defined in the care register | — |
| Colour names | `Blizzard Sole`, `Dark Gum Sole`, `Mushroom`, `Toasted Coconut` | Hex-adjacent descriptors |

**Terms a content designer would expect and will not find:** `ZQ Merino`, `Trino®`,
`Puddle Guard`, `kg CO2e`, `Carbon Footprint`. All previously core to the brand lexicon; none
present on any page inspected. `ZQRX` survives only inside a blog excerpt syndicated onto Our
Story.

## T14 Voice, tone & accessibility

**Register.** Second person, heavy on sentence fragments and self-aware asides. Representative:
"Not your color? Not to worry." · "Fresh again." · "Weather? Whatever" ·
"(pro tip: a pillowcase works too)" · "win, win, win."

**The tone gradient runs the opposite way to most brands.** Allbirds is jauntiest in care
instructions and out-of-stock states, and flattest — deliberately hedged — in sustainability
copy. "The truth is, making things takes energy" and "prioritizing progress over perfection"
are written in a register of qualified candour that the rest of the site never uses. Where
Wise flattens tone as financial stakes rise, Allbirds flattens tone as *claim risk* rises.

**Accessibility statement** `[observed]` — https://www.allbirds.com/pages/accessibility

- H1: `Our Commitment to Accessibility`
- Routing: call Customer Service or email with **`Disabled Access`** in the subject line, and
  describe the specific feature or suggest an improvement. The instruction to name a specific
  feature is good practice.
- **No WCAG version, no conformance level, no audit date, no VPAT, no remediation timeline.**
- The entity named is `Allbirds, Inc.`, which contradicts the current footer owner. The page
  is stale and unlinked from the footer.

Compare Patagonia (068), which names WCAG 2.1 A and AA and an audit partner in its first
sentence. The gap is large.

**Accessibility observations from the markup** `[observed]`

- `Skip to Content` present
- Product images carry descriptive alt including colourway:
  "Men's Tree Runner NZ - Medium Grey (Blizzard Sole)"
- PDP gallery controls correctly labelled `Previous Image` / `Next Image`; the Our Story
  carousel uses bare `Previous` / `Next`
- Many images ship empty alt, including Our Story carousel slides whose *entire content is the
  link text*
- Return-flow link text is the bare word `HERE`
- Three unfilled template slots would be read aloud as incomplete labels: `Color ( edition)`,
  `Add to Cart -`, `Spend  more to earn free shipping!`
- Filter values are lowercase raw slugs (`alternative-leather`, `sugar`) and read poorly aloud
- Footer accordion triggers expose `+ -` glyphs inside the accessible name

---

## Transferable patterns

1. **Trademark, then gloss, every time.** `TENCEL™ Lyocell (tree fiber)` never drops the
   parenthetical, even on repeat mention within a page. Condition: works where the
   trademark is genuinely unfamiliar and the gloss is genuinely shorter. Directly applicable
   to any product naming a proprietary technology a user has no reason to know.
2. **Name the material with a sensory adjective pair, not a spec.**
   `Smooth & Breezy / Tree` beats "TENCEL Lyocell upper" at the choosing moment. The spec
   still exists, one level down, in the `Materials & Sustainability` accordion. Two registers,
   two depths, one taxonomy.
3. **Pre-emptive concession before a contested claim.** "The truth is, making things takes
   energy. There's no version of this that doesn't." State the strongest objection first, then
   narrow the claim to what you actually control. Transfers straight to any sustainability,
   security, or performance claim that cannot survive an absolute framing.
4. **When you retire a quantified claim, retire the IA that promised it.** Allbirds did the
   opposite — it removed the numbers but left the stale `<title>` ("How We Measure up"), the
   CTA labelled `LEARN MORE ABOUT SUSTAINABILITY`, and inbound links to emptied pages. The
   negative lesson is sharper than most positive ones: **a claim withdrawn without an IA pass
   leaves a trail of promises the content can no longer keep.**
5. **Bad news, cause, next opportunity.** The out-of-stock modal states the permanence
   ("gone for good"), gives the reason (limited edition), then supplies the alternative (new
   colours coming). Three beats, no apology, no `Oops!`.
6. **Watch the trigger/target verb pairs.** `Notify Me` → `Get Notified`,
   `Filter and Sort` → `Apply filters`, `Select A Size` → `Add to Cart`. Each mismatch is
   individually trivial; together they are a governance signal that no one owns the CTA
   inventory.
7. **Negative pattern — the marketing lexicon must reach the merchandising metadata.**
   One material is `Terralux™`, `LEATHER ALTERNATIVES`, `POLISHED & PLANT-BASED`, `INNOVERA™`
   and `alternative-leather` depending on which component renders it. Rebrands that stop at
   the marketing layer leak through facets, breadcrumbs and filters.

## Caveats & gaps

- **The benchmark strength named in the brief is only partly verifiable today.** "Product
  choice and material explanations" remains strong; **"carbon-footprint labelling" no longer
  exists on the consumer site.** This file records the absence as observed fact and makes no
  claim about why.
- Historic Allbirds carbon figures circulate widely in search snippets and secondary sources.
  **None of them appear on any live consumer page** and none have been written into this file.
  Do not treat externally-quoted kg CO₂e values as current Allbirds copy.
- **Search, cart interior, checkout and account are client-rendered** and were not harvestable.
  `/search` returns an empty body to a non-JS request, so no search empty state exists in this
  file. T7 and T8 are thin for this reason, not because Allbirds lacks those states.
- `/pages/our-materials-wool` was not fetched directly. It is linked from a live PDP and is
  suspected to be hollowed out like its tree and sugar siblings, but that is **not confirmed**.
- Investor-relations ESG pages and any product-carbon-footprint methodology PDFs on
  `cdn.allbirds.com` were not opened and are out of scope for this file.
- The site is mid-ownership-migration (`Allbirds, Inc.` → `AB Dnam, LLC`). Several
  inconsistencies recorded here may be transitional rather than settled. Any Allbirds string
  used as precedent should be re-verified before reuse.
- Apparel PDPs, women's-specific surfaces, the blog, and international storefronts are
  unharvested.

## Sources

1. https://www.allbirds.com/
2. https://www.allbirds.com/collections/mens
3. https://www.allbirds.com/collections/mens-terralux-cl
4. https://www.allbirds.com/products/mens-tree-runner-nz-medium-grey
5. https://www.allbirds.com/products/mens-cruiser-terralux-anthracite
6. https://www.allbirds.com/products/mens-wool-runner-nz-waterproof
7. https://www.allbirds.com/pages/our-story
8. https://www.allbirds.com/pages/shoe-care
9. https://www.allbirds.com/pages/materials
10. https://www.allbirds.com/pages/materials-making
11. https://www.allbirds.com/pages/sustainability (301 → 10)
12. https://www.allbirds.com/pages/our-materials-tree
13. https://www.allbirds.com/pages/our-materials-sugar
14. https://www.allbirds.com/pages/help
15. https://www.allbirds.com/pages/returns-exchanges
16. https://www.allbirds.com/pages/accessibility
17. https://www.allbirds.com/products/mens-wool-runners (301 → 2)
18. https://www.allbirds.com/products/mens-tree-runners (301 → 2)
19. https://www.allbirds.com/search?q=zzzzqqqq (empty response)
20. https://www.allbirds.com/blogs/the-perch/moonshot-explained (excerpt only, as syndicated onto 7)
