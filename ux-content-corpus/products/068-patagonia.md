# 068. Patagonia

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Outdoor apparel (values-led); resale, repair and trade-in |
| Primary URL | https://www.patagonia.com/ |
| Corpus rank | 068 |
| Benchmark strength (source list) | Product care, repair, and brand values |
| Locale / market observed | en-US (US storefront; site offers a locale switcher) |
| Platform observed | Web — `www.patagonia.com` (Salesforce Commerce Cloud) and `wornwear.patagonia.com` (Shopify, "Powered by Trove") |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product. Disclosure estate visible in footer: California Transparency in Supply Chains Act, Statement on Modern Slavery in Supply Chain, Climate Risk Report, two active product recalls |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 (8 reachable, 2 blocked) |
| Harvest completeness | Partial — `help.patagonia.com` (the Salesforce help centre) and `www.patagonia.com/guarantee` both returned empty bodies. The Ironclad Guarantee text is captured `[documented]` via the Worn Wear FAQ, which quotes it in full. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Worn Wear home | https://wornwear.patagonia.com/ | Resale storefront; hero, trade-in pitch, footer IA |
| Worn Wear FAQ | https://wornwear.patagonia.com/pages/faq | **Richest single source** — 9 categories, ~30 questions |
| Worn Wear Repairs | https://wornwear.patagonia.com/pages/repairs | "If it's broke, fix it"; DIY-vs-pro routing |
| Trade In | https://www.patagonia.com/trade-in/ | Valuation ranges, eligibility lists, online/in-store tabs |
| Product Care & Repair | https://www.patagonia.com/repairs/ | Video and guide hub; care register |
| Start a Repair | https://www.patagonia.com/start-repair/ | **The four-step repair intake flow** — best T4 source |
| Returns & Exchanges | https://www.patagonia.com/returns.html | Routing hub |
| Web Accessibility Statement | https://www.patagonia.com/web-accessibility.html | WCAG 2.1 A/AA, named audit partner |
| Help Center | https://help.patagonia.com/s/ | **Blocked** — empty body |
| Ironclad Guarantee | https://www.patagonia.com/guarantee (and `help.patagonia.com/s/article/Ironclad-Guarantee`) | **Blocked** at source; text captured via quotation in the Worn Wear FAQ |

---

## T1 Navigation & IA labels

**Global nav — commerce and values sit at the same level** `[observed]`

Shop tiers: `Men's` · `Women's` · `Kids'` · `Packs & Gear` · `Food & Beer` · `Sports`
Non-commerce tiers, in the same bar: `Activism` · `Stories` · `Worn Wear`

That is the structural decision that defines this file. Three of the nine top-level nav items
sell nothing. `Worn Wear` — the *used* product — is a peer of `Men's` and `Women's`, not a
sub-item of a sustainability page.

**Activism sub-nav is verb-first and directive** `[observed]`

Under `Act Now`: `Patagonia Action Works` · `Find an Organization` · `Sign a Petition` ·
`Attend an Event` · `Donate` · `Volunteer Your Skills`
Under `Campaigns`: `Protect America's Arctic` · `Protect the Ocean` · `Climate Justice` ·
`Protect Nature` · `Environmental Justice`

Campaign labels are imperative verb + object (`Protect the Ocean`), identical in grammar to
the shopping CTAs elsewhere on the site. The register does not soften when the subject
changes from a jacket to a marine protected area.

**Worn Wear sub-nav distinguishes three verbs** `[observed]`:
`Shop Used` (with the same gender/category tree as new product) and, under `More`,
`Trade-In Program` · `Repairs` · `Care & Repair Guides`.

**The five-icon values strip appears at the foot of every `patagonia.com` page** `[observed]`.
Each is a first-person-plural declarative sentence paired with a CTA:

| Statement (verbatim) | CTA (verbatim) |
|---|---|
| `We guarantee everything we make.` | `View Ironclad Guarantee` |
| `We take responsibility for our impact.` | `Explore Our Footprint` |
| `We support grassroots activism.` | `Visit Patagonia Action Works` |
| `We keep your gear in play.` | `Visit Worn Wear` |
| `We give our profits to the planet.` | `Read Our Commitment` |

Five sentences, all `We [verb] …`, all under six words, all with a named destination. This
is the single most reusable artefact in the file: **a values footer where every claim is a
sentence and every sentence has a page behind it.** Note that the guarantee — the most
transactional of the five — leads.

**Footer groupings** `[observed]`: `Need Help?` and `More Info`.

Under `Need Help?`: `Help Center` · `Order Status` · `Size & Fit Guide` ·
`Returns & Exchanges` · `DIY Care & Repair` · `Trade In. Get Credit.` · `Login` ·
`Accessibility Statement`, followed by a screen-reader fallback line offering a phone number.

`Trade In. Get Credit.` is the only footer link punctuated as two sentences — benefit stated
immediately after the action, inside a nav label.

Under `More Info`, alongside the expected corporate links: `Our Core Values`,
`Progress Report`, `Business Unusual`, `Climate Goals`, `1% For The Planet®`, `How We Fund`,
`Statement on Modern Slavery in Supply Chain`, `Climate Risk Report`, and — notably —
`UPF Recall` and `Infant Product Recall` as **permanent footer links**.

**Worn Wear runs its own, smaller IA** `[observed]`. Its `Need Help?` block is
`Order & Trade-In Status` · `FAQs` · `Contact Us` · `Returns & Exchanges` ·
`Product Care & Repair` · `Do not sell or share my personal information`. `Contact Us` and
`FAQs` point at the same URL — a routing shortcut worth flagging.

## T2 Value proposition & headline patterns

**Persistent site-wide message rail — three rotating messages, one commercial** `[observed]`

| Headline | Body (summarised) | CTA |
|---|---|---|
| `Free Shipping on Orders Over $99` | Ships in 1–2 business days, arrives in 3–10; flexible options exist "if you need it sooner" or are "concerned about the environmental impact" | `More Details` |
| `Earth Is Now Our Only Shareholder` | Ownership-change statement; framed as "what we can do" with the resources available | `Read Yvon's Letter` |
| `Our Vote's on Earth` / `Vote Big` | Election-season signup | `Sign Up` |

The shipping message is the instructive one. It is the **only place on the site where an
environmental concern is offered as a reason to choose a slower option** — "Concerned about
the environmental impact?" sits in the same sentence as "Need it sooner?", as two equal user
motivations. Values are not a separate page here; they are an option in a delivery selector.

**Worn Wear hero** `[observed]` — https://wornwear.patagonia.com/

> `Secondhand, First Choice`

A four-word chiasmus that reverses the default hierarchy of used vs new. The subhead
(summarised) frames used gear as lower-priced, one-of-a-kind, and with "plenty of miles to
go" — benefit, scarcity, remaining life. CTA: `Shop New Arrivals` — *new arrivals* of *used*
goods, which the brand lets stand without explanation.

**Trade-in hero** `[observed]` — https://www.patagonia.com/trade-in/

> `Trade in your used Patagonia gear.`
> Subhead (summarised): we buy back gently used clothing and packs so they "stay in play and
> out of the landfill."

The headline is a plain imperative. The differentiation is in the subhead, and the reason
given is disposal avoidance, not money. Compare Apple Trade In (069), whose headline is
`Trade in. Upgrade. Save. Or recycle it for free.` — Apple leads with the user's gain and
puts recycling last; Patagonia leads with the action and puts the landfill in the first
subhead. Same programme category, inverted emphasis.

**Section headers on trade-in and repair are one-line and possessive** `[observed]`:
`Your gear deserves credit.` · `Let's keep a great thing going.` ·
`Not ready to give up your gear?` · `If it's broke, fix it` · `Have more questions?` ·
`More for Your Gear`

`Your gear deserves credit.` is a pun that carries real information (merchandise credit) and
attributes agency to the object rather than the owner. `If it's broke, fix it` is deliberately
ungrammatical vernacular, and it is the headline of the repair programme.

**Returns page headline and opening** `[observed]` — https://www.patagonia.com/returns.html

> `Returns & Exchanges`
> "At Patagonia, our business is building the best product. If something isn't working for
> you, we want to help."

Eighteen words. Restates the company's purpose, then pivots to the user's problem, then
offers help. No apology, no `Oops!`, no blame allocation.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Shop New Arrivals` | Worn Wear hero | New arrivals of used goods |
| `Trade In` | Worn Wear hero panel and nav | Two words, matches the programme name exactly |
| `Start Your Trade-In` | Trade-in page, both tabs | Possessive — the flow belongs to the user |
| `Track Your Trade-In` | Trade-in page, beside the start CTA | Start and track offered side by side |
| `Start a Return` | Returns page | Indefinite article |
| `Start an Exchange` | Returns page | Parallel construction |
| `Questions?` | Beside both of the above | **Pre-emptive help at the decision point** |
| `Start a Repair` | Repairs, returns, trade-in, Worn Wear | Appears on four surfaces |
| `Browse Our Guides` | Worn Wear repairs, DIY route | |
| `Get Started` | Care & Repair hub | Bare, no object — rare here |
| `Watch` | Every repair video | One word, used consistently |
| `Find a Store` / `Find a Patagonia Store` | Two surfaces | **Two labels for one destination** |
| `Shop Used` | Trade-in page, nav | |
| `View Ironclad Guarantee` | Values strip, every page | CTA names the artefact, not the action |
| `Explore Our Footprint` | Values strip | |
| `Read Our Commitment` | Values strip | |
| `Read Yvon's Letter` | Message rail | **Names the author by first name** |
| `Discover` | Progress Report rail | |
| `More Details` | Shipping rail | |
| `Next: Repair Details` | Repair form, step 1 | **CTA names the destination step** |
| `Proceed To Checkout` | Repair form, step 2 | Checkout — for a repair |
| `Edit` | Repair form, completed step | |
| `Sign Me Up` | Newsletter | |
| `Notify Me` | Worn Wear PDP, out of stock | |
| `Skip to main content` | Top of DOM | |
| `initiate your return now.` | Worn Wear FAQ, inline | Sentence-case link text with a trailing full stop |

**Observation.** Patagonia almost never ships a bare `Learn more`. The two places it comes
closest are `Get Started` and `Discover`, both sitting directly beneath a heading that
supplies the object. The dominant pattern is **verb + the user's noun**: `Start Your
Trade-In`, `Track Your Trade-In`, `View Ironclad Guarantee`.

## T4 Onboarding & getting-started

### The repair intake flow — four named steps `[observed]`

https://www.patagonia.com/start-repair/ exposes a progress indicator with four labels:

> `Product Info` → `Repair Details` → `Checkout` → `Shipping Label`

Step names are nouns describing *what the system will hold*, not what the user must do. The
forward CTA names the next step explicitly (`Next: Repair Details`), so the progress bar and
the button agree.

**Before the form, five expectation-setting blocks** — this is the best content-design
artefact in the file. Each is a short heading plus a short paragraph, and each one *lowers*
expectations:

| Heading (verbatim) | What it does |
|---|---|
| `We can repair many but not all issues` | States the limit before the promise; links to a "current list of unrepairable items" |
| `Repaired items may not look like new` | Pre-empts the cosmetic disappointment; explains the trade-off (integrity over colour match) |
| `Repairs require a small fee` | Names the number before the form |
| `If we can't repair your item, what would you like to do with it?` | Converts the failure case into a user choice, asked up front |

Above them, the turnaround is given before anything else: `up to 10 weeks on average` — and
it is a **link**, to a dedicated turnaround article. A ten-week wait is stated in the first
sentence of the page, hyperlinked so it can be justified rather than buried.

Then a precondition stated as a consequence: clean your product first, "or the item will be
returned to you to wash." The consequence is specific and the sentence is nine words.

Fee structure `[observed]`: `$15.00` round-trip shipping on all repairs; the repair work "(in
most cases)" is covered by Patagonia; non-warranty wetsuit repairs range `$20.00 to $80.00`
depending on the issue.

**The ordering is the pattern worth stealing.** Turnaround → cleaning precondition → scope
limit → cosmetic limit → fee → failure-case choice → *then* the first form field. Every
reason a user might later be disappointed is surfaced before they invest any effort.

### Trade-in — a four-step mail-in sequence, stated twice `[observed]`

https://www.patagonia.com/trade-in/, under `How does trade-in work?`:

1. Watch the Trade In video "to make sure your gear is ready."
2. Use the online `Trade In quiz` to see if your gear is eligible.
3. Print the shipping label and return authorization slip.
4. Mail us your gear.

Processing expectation, stated in the same block: allow `7–10 business days` after receipt,
and "Processing may take longer during peak times or trade in promotions." The bound and its
exception in the same breath.

Worn Wear states a near-identical four-step version, differing mainly in step 1
(`Inspect your gear` rather than `Watch our Trade In video`). Two surfaces, two step-1
framings, same flow.

**The eligibility gate is a quiz, and the copy names it as one** `[observed]`:
"Take our quiz to see if your gear is eligible. If it's a go, print the $7 shipping label…"
`If it's a go` is the informal conditional doing the work of a system state.

### The repair routing decision, written as two headed options `[observed]`

https://wornwear.patagonia.com/pages/repairs presents exactly two paths:

- `Start a DIY repair.` — "Through our partnership with the pros at iFixit, we've created more
  than 100 easy care and repair guides for Patagonia gear." → `Browse Our Guides`
- `Need help?` — Our repair techs can try to fix it; mail it in or bring it to a store; if
  beyond repair, "we'll recycle your item so it stays out of the landfill." →
  `Start a Repair` / `Find a Store`

Note `can try to fix` rather than "will fix". The verb is hedged in the very sentence that
sells the service.

### A counter number used as onboarding `[observed]`

> `You've helped keep more than 583,000 items out of landfills.`

Second person, past perfect, specific figure. The user is credited with a collective outcome
before being asked to do anything. Contrast with the fact directly beneath it —
`85% of clothing ends up in landfills or gets incinerated.*` — carrying an asterisk resolved
to "Annual rate in the US, Environmental Protection Agency, 2018". **The alarming statistic
is sourced and dated; the flattering one is not.** Recorded as an asymmetry.

## T5 Form & field labels

`[observed]` — https://www.patagonia.com/start-repair/

**Step 1 — `Product Info`**

| Field | Notes |
|---|---|
| `Product Type` | Select. Options are garment categories: `Dresses & Skirts`, `Fleece`, `Hats & Accessories`, `Jackets & Vests`, `Overalls & Jumpsuits`, `Packs & Gear`, `Pants, Leggings & Jeans`, `Shirts`, `Shorts & Boardshorts`, `Snow & Alpine Pants`, `Sweaters`, `Sweatshirts & Hoodies`, `Waders & Fishing Gear`, `Waxed Cotton`, `Wetsuits`, and — last — **`Others (not repairable)`** |
| `Style Number (optional)` | Hint: "The style number is a five-digit number printed on the garment tag inside of your item." |

`Others (not repairable)` as a dropdown option is the standout. The **ineligible answer is
offered inside the picker** rather than producing a downstream error. A user who does not see
their item can self-disqualify in the first field, at zero cost.

The `Style Number` hint does three things in one sentence: tells you the format
(five digits), where it is (the garment tag) and where that is (inside the item).

**Step 2 — `Repair Details`**, headed `Let's dig into the details.`

| Field | Notes |
|---|---|
| `Type of Repair` | Select |
| `What needs to be repaired? Please give us more details.` | **Free text; the label is two sentences — a question plus a request** |
| `Where is the repair located? (optional)` | Optional marked inline |
| `If we can't repair your item, what would you like us to do with it?` | Two options, both written as full sentences from the user's point of view: `Recycle it. We may offer you a merchandise credit or discount code.` and `Send it back to me unrepaired.` |

The failure-case radio group is the richest single control here. The options are **sentences,
not labels**; one of them carries its own conditional benefit (`We may offer you a
merchandise credit or discount code.`); and the word `unrepaired` is used plainly rather than
softened.

Completed steps collapse to a summary with an `Edit` affordance — `Product Info` reappears as
a heading with `Product Type` and `Style Number` beneath it.

## T6 Status & state language

`[observed]` — Worn Wear's condition grades are a **three-tier vocabulary with a
plain-English gloss for each**, shown on the PDP after size selection:

| Grade | Gloss (verbatim) |
|---|---|
| `Excellent condition` | "Looks and feels like it never left the closet." |
| `Great condition` | "Shows small signs of visible wear." |
| `Good condition` | "Shows some signs of normal wear and/or repair." |

Three adjectives that are near-synonyms in ordinary use, disambiguated entirely by their
glosses. This is how a resale grading scale becomes legible: **the label carries the ranking,
the gloss carries the meaning.** Note that `Good condition` openly admits prior repair.

Other state vocabulary `[observed]`:
`Worn Wear Price` (a named price type, shown against the strike-through original) ·
`Sale` · `Out of stock` → `Notify Me` · `Available Sizes` ·
`Order & Trade-In Status` (one lookup for two object types) ·
`30-minute cancellation period` / `30-minute cancellation window` (**two phrasings in one
FAQ answer**) · `return authorization slip` · `merchandise credit` vs `Worn Wear merchandise
credit` vs `gift card` (three adjacent value instruments, only loosely distinguished).

Timing states `[observed]`: `3–4 business days` to ship · `5–7 business days` in transit ·
`5–7 business days` for a refund to post · `5–10 business days` to appear on a statement ·
`7–10 business days` for trade-in processing · `up to 10 weeks on average` for a repair.
Every one is a range, and every one names business days rather than calendar days.

## T7 Error, failure & recovery

Patagonia's distinctive move is that **failure is designed into the intake, not the aftermath.**

`[observed]` — failure paths named *before* the user commits:

- `We can repair many but not all issues` — with a link to the current unrepairable list
- `Repaired items may not look like new`
- `If we can't repair your item, what would you like to do with it?` — asked as a form field
- `Others (not repairable)` — an ineligible option inside the first dropdown
- "please clean your product before sending it in, or the item will be returned to you to
  wash" — the failure consequence stated as a precondition
- `Will I get a credit for everything I send in?` — answered `We do not accept everything.`
  Four words, no hedging.
- `What if I'm not happy with the credit I receive?` — the answer (summarised) declines to
  offer recourse and instead routes back to the pre-submission valuation page

That last pair is unusually honest FAQ writing: the question anticipates dissatisfaction, and
the answer says plainly that no remedy exists, while pointing at the step that would have
prevented it.

`[observed]` — recovery furniture: `Questions?` links sit immediately beside `Start a Return`
and `Start an Exchange`, before any failure. Compare Wise's `Trouble logging in?` beside
`Log in` (041) — same pre-emptive-help pattern, different surface.

Two permanent footer links are recall notices: `UPF Recall` and `Infant Product Recall`.
A product-safety failure given a standing place in the global IA rather than a banner that
expires. `[observed]`

## T8 Empty states

`[observed]`, sparse:

- Worn Wear cart: `Cart (0)` with `Loading...`, `Subtotal`, `$0 USD`, and
  `Shipping` / `Calculated at checkout`
- Out-of-stock PDP doubles as the empty state, with a genuinely useful redirect printed on
  every product card: `Can't find your size?` / "Visit patagonia.com for new gear in all
  sizes and color." **The resale store routes you to the full-price store when it cannot
  serve you** — and the FAQ explains why, in terms of the inventory model: stock comes from
  customer trade-ins, so availability cannot be predicted.
- Back-in-stock is bounded rather than promised: "Back-in-stock email notifications do not
  hold inventory or guarantee the availability of an item."

Other empty states are behind auth or client-rendered. `[absent]`

## T9 Notifications & system messages

`[observed]`

- **Migration banner**, persistent on every Worn Wear page:
  `Trade In has moved to Patagonia.com. Get credit for your eligible used gear here.`
  A programme relocation announced in the global chrome of the *origin* site, with the
  eligibility qualifier ("eligible") retained even inside the banner.
- Shipping-delay and shipping-offer messages rotate in the top rail (see T2)
- Newsletter opt-in and its success state: `You have been successfully subscribed.`
- Newsletter value proposition, Worn Wear version: `Trade-in offers, repair tips, events,
  original stories and more.` — repair tips listed second, ahead of stories
- SMS activism opt-in with full carrier boilerplate: `Text "ACT" to 71333`, followed by
  "Don't worry, we'll only contact you about activism here." The reassurance precedes the
  legally required HELP/STOP text.
- Order communications `[documented]`: a shipping confirmation email containing tracking is
  described in the FAQ, as is an emailed return confirmation and an emailed shipping label
  plus return authorisation slip.

## T10 Disclosures, legal & compliance — guarantee, valuation, sustainability

### The Ironclad Guarantee `[documented]`

Source of the text used here: the Worn Wear FAQ, under `Are Worn Wear items backed by the
Patagonia Ironclad Guarantee?`, which quotes the guarantee in full. The canonical page at
`help.patagonia.com/s/article/Ironclad-Guarantee` was **not reachable during this harvest**.

The guarantee is four clauses in a single sentence:

> "We guarantee everything we make. If you are not satisfied with one of our products at the
> time you receive it, or if one of our products does not perform to your satisfaction, return
> it to the store you bought it from or to Patagonia for a repair, replacement or refund.
> Damage due to wear and tear will be repaired at a reasonable charge."

Four structural points worth recording.

1. **No time limit is stated.** There is no window, no receipt requirement, and no
   registration step in the guarantee text.
2. **The trigger is subjective twice over** — "not satisfied" and "does not perform to your
   satisfaction". The standard is the user's, not the company's.
3. **Repair is named first** in the remedy list, ahead of replacement and refund. The cheapest
   outcome for the planet is the default-ordered one.
4. **The exclusion is in the same paragraph, not a footnote**, and it is priced rather than
   refused: wear and tear "will be repaired at a reasonable charge." `reasonable` is
   undefined — the one soft word in an otherwise hard promise.

The Worn Wear answer opens with a single word — `Absolutely.` — before restating the terms.
Used goods carry the same guarantee as new, and the answer says so before it explains.

### Trade-in valuation — how a conditional estimate is bounded `[observed]`

Two different numeric formats are published for the same programme, which is itself a finding.

On `https://www.patagonia.com/trade-in/` the estimate is given as **dollar ranges by category**:
`Sweaters: $10 - $60` · `Jackets: $10 - $200` · `Dresses: $10 - $20` ·
`Boardshorts: $10 - $15` · `Shorts: $5 -$25` · `Pants: $10 - $60` ·
`Wheeled Bags: $45 - $90` · `Duffel Bags: $15 - $75`

On `https://wornwear.patagonia.com/pages/faq` the same question is answered as **percentages
of MSRP**: Sweaters, Dresses, Boardshorts, Shorts and Pants at `15%`; Wheeled Bags at `23%`;
Duffel Bags at `25%`.

Both surfaces open with the same baseline: "We estimate most items' trade-in value to be
around 20% of the MSRP (manufacturer's suggested retail price)" — with the acronym expanded
inline on first use, every time.

The bounding language is the reusable part, and it appears identically on both surfaces:

> "Please complete the Trade In quiz for a more specific estimated credit value.
> **Your exact credit will be determined after we receive and inspect each item.**"

Claim → route to a personalised figure → state the condition on which the final number
depends. The same three-beat structure Wise (041) uses for transfer speed, applied to a
valuation. Patagonia adds a fourth beat the others do not: the deduction is disclosed at the
same moment — `$7` shipping label cost "which will be deducted from the value of the credit
issued for any accepted gear", and a ceiling, "merchandise credit **up to $180**".

Compare Apple Trade In (069), which bounds its estimate with a 14-day receipt window and an
explicit revised-offer accept/reject mechanism. Patagonia bounds by inspection and offers no
appeal — and its FAQ says so (see T7).

### Eligibility, written as an exclusion list `[observed]`

The trade-in eligibility copy is unusually blunt. What is accepted gets five bullet points.
What is not accepted gets **sixteen**, alphabetised, including `Items made before 2007 (with
some exceptions)`, `Bras`, `Embroidered items`, `Factory seconds`, `Ski patrol jackets/vests`,
`T-shirts`, `Underwear`, `Waders`, `Wetsuits`.

Condition exclusions are grouped under four plain headings — `Damaged or showing signs of
heavy wear`, `Excessive hair/fur`, `Customized or embroidered items`, `Items that are
incomplete or missing essential components` — with concrete instances beneath each:
`delamination`, `material bubbling`, "if the item is singed (lightly burned)", fleece
`pilling` (defined inline as "when knitted fabric forms small balls or fluff on the surface of
the garment"), "A down item with significant down loss", and `Tenacious Tape® that's peeling`
with a hard limit: "we're unable to accept items that have more than two patches".

**Two content-design decisions worth naming.** First, domain jargon is defined at the point of
use (`pilling`, `singed`), so the exclusion list doubles as a garment-care glossary. Second,
the list is framed with "Examples include but are not limited to" — the legal hedge is
present, but it follows the specifics rather than substituting for them.

Two eligibility lists on the same page differ: the online list excludes
`Items made before 2007` and `Items bearing corporate logos`; the in-store list excludes
`Embroidered items` instead. **Same programme, two channels, two rule sets, no explanation of
the difference.** Recorded as a negative finding.

### Returns, refunds and shipping `[observed]`

Worn Wear: returns accepted "at any time"; items must be in the condition received; the
customer pays return shipping; `$7` is deducted if the provided label is used; returns
received **more than 180 days** after purchase "may be refunded with a Worn Wear merchandise
credit". A PayPal-specific clause states a `180-day refund window`. International and US
territory returns are not supported. Flat-rate shipping is `$7.50`.

Main site: `Free Shipping on Orders Over $99`, `Start a Return` and `Start an Exchange` both
routing to a Narvar-hosted flow, with "free shipping both ways" stated for exchanges only.

### Environmental claims are ratio-based, sourced, and used to justify the programme `[observed]`

Under `What about all that shipping?` — a question the brand asks itself — the answer
(summarised) concedes that shipping has an impact, then reframes by proportion: product
transportation is around **10 percent** of annual total emissions, while raw-materials
manufacturing is about **85 percent**. The conclusion drawn is that keeping gear in use
matters more than shipping it.

This is the strongest disclosure pattern in the file: **raise the objection to your own
programme as an FAQ question, concede it, then answer with a ratio that puts it in scale.**
It does not deny the cost; it sizes it.

A parallel move appears in the recycling FAQ: "Recycling your old gear is voluntary; we don't
compensate you for sending items in to be recycled." — the absence of reward stated plainly
before the emotional benefit ("you'll have the satisfaction of knowing…").

### How values copy sits beside transactional copy

The brief asks specifically how Patagonia keeps values copy from displacing transactional
copy. Four observable mechanisms:

1. **Values live in fixed furniture, not in the flow.** The five-statement strip and the
   rotating rail are chrome. The repair form, the trade-in eligibility list and the returns
   page contain almost no values language at all — the `start-repair` page's entire
   environmental content is one clause about recycling inside a radio-button label.
2. **Values copy is the *reason* for a transactional rule, never a substitute for it.**
   "stay in play and out of the landfill" appears after, not instead of, the $7 fee and the
   7–10 day processing time.
3. **The register hardens as the stakes rise.** `If it's broke, fix it` (marketing) →
   `We can repair many but not all issues` (intake) → `We do not accept everything.` (FAQ).
   Three registers, decreasing warmth, increasing precision.
4. **Essay-length values writing is routed off-site.** `Read Yvon's Letter`,
   `Our Core Values`, `Business Unusual`, `Progress Report` are all links away from the
   transaction. The long-form exists; it is never in the path.

## T11 Help-centre architecture

The canonical help centre at `help.patagonia.com/s/` was **not reachable** during this
harvest. `[absent]`

What can be established `[observed]`:

- It is topic-based, with URLs of the form `/s/topic/<id>/repairs` and
  `/s/article/<Slug>` — article slugs are title-cased and human-readable
- Article titles referenced by links from reachable pages, verbatim:
  `Ironclad Guarantee` · `Return Policy` · `How to Make an Exchange` · `Repair Turnaround` ·
  `How do I know if my item can be repaired` · `What can I expect my completed repair to look like` ·
  `Mailing in a Repair` · `What If My Item Is Not Repaired` ·
  `How can I recycle a Patagonia or Worn Wear item`
- **Article-title grammar is mixed**: noun phrases (`Ironclad Guarantee`, `Return Policy`,
  `Repair Turnaround`), gerund phrases (`Mailing in a Repair`), and first-person user
  questions without question marks (`How do I know if my item can be repaired`,
  `What can I expect my completed repair to look like`). The question-form titles are the ones
  linked from inside the repair flow — **the help article is titled as the question the form
  provokes**, and linked at the exact point it provokes it.

Worn Wear runs a **separate, flat FAQ** at `/pages/faq` with nine category headings, all
ALL-CAPS, all nouns: `WORN WEAR®` · `ORDERS` · `RETURNS` · `PAYMENT` · `SHIPPING` ·
`ENVIRONMENT` · `TRADE IN` · `PRODUCTS` · `TOUR`.

Two of those nine are not support categories in any conventional sense. `ENVIRONMENT` holds
two questions about the programme's own environmental logic, and `TOUR` holds one question
about where to find the Worn Wear truck. **The FAQ IA has a slot for the brand's argument and
a slot for its roadshow**, sitting between `Shipping` and `Products`.

`CONTACT US` sits at the top of the page, above every category, with an email address, a
phone number and hours for weekdays and weekends stated separately. Human contact first,
self-service second — the inverse of the Wise ordering (041).

## T12 FAQs

Two FAQ estates. Questions verbatim; answers summarised.

### Worn Wear FAQ — https://wornwear.patagonia.com/pages/faq

| Category | Questions (verbatim) |
|---|---|
| `WORN WEAR®` | What is Worn Wear®? |
| `ORDERS` | How do I track my order? · How long will it take to process my order? · Can I cancel my order? · Order & Trade-In Status |
| `RETURNS` | What is your return policy? · How do I return my purchase? · Can I make a return from outside the 50 United States? · How will I receive my refund? · Are Worn Wear items backed by the Patagonia Ironclad Guarantee? |
| `PAYMENT` | Where do I enter a gift card or merchandise credit? |
| `SHIPPING` | Where do you ship? · Do you charge for shipping? · When will my order arrive? |
| `ENVIRONMENT` | Why buy used? · What about all that shipping? |
| `TRADE IN` | How does trade in work? · Can I trade in any type of Patagonia product? · Can I trade in items I purchased on Worn Wear®? · Where can I trade in my used Patagonia gear? · What condition do the items need to be in before I trade them in? · How does trade in by mail work? · Is there a charge to send in items for trade-in? · What are my items' estimated trade-in values? · Will I get a credit for everything I send in? · What if I'm not happy with the credit I receive? · Will you send back the items that are deemed ineligible? · Where can I use the credit I receive from my traded in items? · Is Worn Wear available outside the U.S.? |
| `PRODUCTS` | What is the quality of Worn Wear items? · How can I tell what size I am? · What if my size or color is not available? · How do I care for my Worn Wear piece? · How can I recycle my Worn Wear® piece? · How can I give feedback about my Worn Wear item? |
| `TOUR` | Where can I find the Worn Wear® truck? |

**Structural notes.** Thirteen of the roughly thirty questions are about trade-in — the
category is nearly half the FAQ, because it is the half where the user is being asked to
predict a system's judgement of their belongings. Four consecutive questions
(`Will I get a credit for everything I send in?` → `What if I'm not happy…?` →
`Will you send back the items that are deemed ineligible?`) are all about rejection, and
**two of them receive substantially the same answer**, which reads as accretion rather than
design.

`Order & Trade-In Status` is an FAQ entry that is not a question — a heading has been filed
in a question list. Recorded as an inconsistency.

`Why buy used?` is the one question whose answer is an argument rather than an instruction,
and it leads with the planet, then price, then the shopping benefit ("a great way to find
past-season colors and prints") — in that order.

### Trade-in FAQ — https://www.patagonia.com/trade-in/

| Question (verbatim) |
|---|
| How does trade-in work? |
| What's eligible for trade-in? |
| What condition do my items need to be in to trade in? |
| How much will I get for my trade-in? |
| Will I get credit for everything I send in? |
| Can I send in items to be recycled? |

Six questions, in decision order: mechanism → eligibility → condition → value → rejection
risk → the alternative if none of it applies. **The last question offers an exit from the
programme** — recycling, explicitly uncompensated — rather than ending on the sale.

`What's eligible for trade-in?` and `How much will I get for my trade-in?` each appear
**three times on the same page** (online tab, in-store tab, and the FAQ block), with the
online and in-store versions carrying different exclusion lists. Duplication as a
tab-scoping device, with a governance failure inside it.

## T13 Terminology & glossary

| Term | Patagonia's usage | The alternative it rejected |
|---|---|---|
| `Worn Wear®` | Registered trademark for the whole resale/repair/trade-in ecosystem | "pre-owned", "refurbished", "outlet" |
| `Ironclad Guarantee` | The named warranty | "warranty", "returns policy" |
| `Trade In` / `Trade-In` | The buy-back programme — **hyphenated inconsistently across surfaces** | "sell back", "buy-back" |
| `in play` | Recurring verb phrase for continued use: "keep your gear in play", "get your gear back in play" | "in circulation", "in use" |
| `merchandise credit` | The trade-in payout instrument | "store credit", "cash" |
| `Excellent` / `Great` / `Good condition` | Three-tier resale grading, each glossed | A–D or star ratings |
| `Worn Wear Price` | A named price type on resale PDPs | "sale price", "used price" |
| `1% For The Planet®` | Registered giving programme | "donations" |
| `Patagonia Action Works™` | Trademarked activism platform | "get involved" |
| `Earth Is Now Our Only Shareholder` | The ownership statement, used as a headline | "B Corp", "purpose trust" |
| `Business Unusual` | Footer link for the business-model story | "About us" |
| `Progress Report` / `Work in Progress Report` | The impact report — **two names for one artefact** | "sustainability report", "ESG report" |
| `Tenacious Tape®` | Own-brand repair tape, named inside an exclusion rule | "patch" |
| `pilling` | Garment-care term, defined inline on first use | "bobbling" |
| `Service Center` | The Reno recycling and repair destination | "warehouse", "returns centre" |
| `Silent sports` | In meta keywords, not visible copy | "outdoor sports" |
| `the closest match possible` | Repair colour-matching bound | "exact match" |

**Register split.** Marketing says `Worn Wear®` and `in play`; the intake form says
`unrepaired`, `not repairable`, and `return authorization slip`. The vernacular lives where
the user is being persuaded; the precise words live where the user is committing.

## T14 Voice, tone & accessibility

**Person and tense.** First-person plural for the company throughout, and the company is a
visible actor in adverse copy as well as favourable: `We do not accept everything.` ·
`We can repair many but not all issues` · `we'll recycle your item`. The company never hides
behind a passive construction when delivering bad news.

**Register gradient.** Jauntiest in the DIY-repair hub, where it is close to whimsical:
"A quirky repair video is good for your soul. You'll laugh, learn many useful repair tricks
to make your grandma proud and finally discover what a sweater stone is." Flattest in the
intake form and the eligibility lists. The tonal distance between `If it's broke, fix it` and
`Others (not repairable)` is deliberate and maps exactly onto the distance between browsing
and committing.

**Video and guide titles use a single grammar** `[observed]`: `How to Fix Leaky Waders` ·
`How to Better Your Sweater` · `How to Patch Your Insulation` · `How to Fix Your Button` ·
`How to Fix Your Zipper Slider` · `How to Fix Your Buckle`. Five of six begin
`How to Fix Your …`; the sixth verbs an adjective (`Better Your Sweater`) for the one topic
that is maintenance rather than repair. The CTA on every one is the single word `Watch`.

Section decks in the care hub each open with a sensory or comic hook before the instruction:
"Laundry, stains and fabrics that are sometimes pains." · "Tell everyone you fixed it
yourself." · "Ever pick up an old sweater and wonder what it would tell you if it could talk?"

**Numbers as trust devices** `[observed]`: `583,000 items`, `85%`, `10 percent`, `more than
100 easy care and repair guides`, `up to 10 weeks on average`, `$7`, `$7.50`, `$15.00`,
`up to $180`, `more than two patches`. Specific rather than rounded. The one statistic with a
source and date attached is the unflattering one.

**Accessibility statement** `[observed]` — https://www.patagonia.com/web-accessibility.html

This is a genuinely competent statement and a useful contrast with Allbirds (067):

- Names the standard and the level in the first sentence: **WCAG 2.1, Level A and AA**
- Names the legal regime: ADA effective communication requirements
- **Names the third-party partner** administering the programme and states that the programme
  is ongoing rather than a one-off audit
- States that the evaluating team includes "users of assistive technologies"
- Describes a free assistive application with its capabilities listed concretely: mouse and
  keyboard replacements, voice recognition, speech enablement, hands-free/touch-free navigation
- Invites barrier reports: "We want to hear from you if you encounter any accessibility
  barriers on our digital properties." — second person, active, no form required, phone number
  given

**Gaps in it**, recorded honestly: no audit date, no VPAT link, no remediation timeline, no
email route (phone only), and the linked assistive-technology vendor URL still uses the
partner's former brand name while the body text uses the current one.

**Accessibility observations from the markup** `[observed]`

- `Skip to main content` present, first in DOM
- A screen-reader fallback appears in the footer of **every** page: "If you are using a
  screen reader and having difficulty please call us at 1-800-638-6464". Placing it in global
  furniture rather than only on the accessibility page is good practice.
- The values-strip icons carry descriptive alt: `Patagonia Ironclad Guarantee Icon`,
  `Patagonia Worn Wear Icon`, `Patagonia Footprint Icon`
- `Accessibility Statement` is a first-class footer link under `Need Help?`, grouped with
  order status and returns rather than exiled to a legal row
- **Negative finding:** a long run of icon-sprite text (`burgerburgercaption light…`) renders
  as visible text at the top of the DOM on `www.patagonia.com` pages. A screen reader
  encountering it before `Skip to main content` would announce a stream of meaningless tokens.
  Flagged as observed in server HTML; behaviour after CSS/JS was not verified.
- **Negative finding:** several Worn Wear hero images ship empty alt while carrying the only
  visual context for the adjacent headline.

---

## Transferable patterns

1. **Front-load every disappointment.** The repair intake states turnaround, cleaning
   precondition, scope limit, cosmetic limit, fee and failure-case choice *before* the first
   form field. Condition: only works when the offer survives the honesty. If your programme
   cannot bear its own limits being read first, the limits are the problem, not the copy.
2. **Put the ineligible answer inside the picker.** `Others (not repairable)` lets a user
   self-disqualify in field one at zero cost, instead of discovering it at submission.
   Directly applicable to eligibility-gated flows — BNPL, KYC, warranty claims.
3. **Grade with a label, explain with a gloss.** `Excellent / Great / Good condition`, each
   with a one-sentence plain-English gloss, makes three near-synonyms rankable. Any condition,
   tier, risk or severity scale can use this.
4. **Bound a conditional valuation in three beats plus a deduction.** Range → "complete the
   quiz for a more specific estimate" → "your exact credit will be determined after we receive
   and inspect each item" → and disclose the fee that will be subtracted, in the same block.
   Transfers to trade-in, part-exchange, settlement offers and instant-quote products.
5. **Ask the objection to your own programme as an FAQ question, then answer with a ratio.**
   `What about all that shipping?` concedes the impact and sizes it against the 85% that comes
   from materials. Scale, not denial. Reusable wherever a green or ethical claim has an
   obvious counter-argument.
6. **Values as furniture, not as flow.** Five `We [verb] …` sentences in a persistent strip,
   each with a real destination; essay-length values writing routed off-site; the transactional
   pages left almost free of it. This is the mechanism that lets a values-led brand ship a
   fee schedule without diluting either.
7. **The company stays the grammatical subject of bad news.** `We do not accept everything.`
   No passive voice, no "items may not qualify". Four words. Condition: requires the
   organisation to actually own the decision.
8. **Title the help article as the question the form provokes, and link it where it provokes
   it.** `What can I expect my completed repair to look like` is linked from the paragraph
   that raises the worry.

## Caveats & gaps

- **The Ironclad Guarantee's canonical page was not reachable.** Both
  `help.patagonia.com/s/article/Ironclad-Guarantee` and `www.patagonia.com/guarantee` returned
  empty bodies to this harvest. The guarantee text quoted in T10 is taken verbatim from the
  Worn Wear FAQ's own quotation of it, and is marked `[documented]` rather than `[observed]`.
  Any use of it as precedent should be re-verified against the canonical page.
- **The entire Salesforce help centre (`help.patagonia.com`) is unharvested.** Article titles
  in T11 are those linked from reachable pages only; no article bodies were read, and the
  category tree is inferred from URL structure. This is the largest single gap in the file.
- **No product detail page on `www.patagonia.com` was harvested**, so per-product material
  copy, the Fair Trade Certified™ and recycled-content labelling, and the Footprint
  Chronicles-style supply-chain disclosure are all absent from this file.
- The `Progress Report`, `Ownership`/`Yvon's Letter`, `Our Core Values`, `Climate Goals` and
  `Business Unusual` pages were not fetched. Patagonia's long-form values writing is therefore
  characterised here structurally — by where it sits and how it is linked — rather than
  analysed as prose.
- **Two surfaces disagree and both are recorded**: online vs in-store trade-in exclusion lists,
  and dollar-range vs percentage-of-MSRP valuation formats. Neither is treated as canonical.
- Checkout, account, order tracking and the Narvar returns flow are behind auth or on
  third-party domains and were not attempted.
- The Worn Wear store is operated by a third party ("Powered by Trove"), so some of its copy
  may be platform-supplied rather than Patagonia-authored. No attempt was made to separate
  the two.
- Mobile app and in-store copy are out of the public web surface.

## Sources

1. https://wornwear.patagonia.com/
2. https://wornwear.patagonia.com/pages/faq
3. https://wornwear.patagonia.com/pages/repairs
4. https://www.patagonia.com/trade-in/
5. https://www.patagonia.com/repairs/
6. https://www.patagonia.com/start-repair/
7. https://www.patagonia.com/returns.html
8. https://www.patagonia.com/web-accessibility.html
9. https://help.patagonia.com/s/article/Ironclad-Guarantee (blocked — empty body)
10. https://www.patagonia.com/guarantee (blocked — empty body)
