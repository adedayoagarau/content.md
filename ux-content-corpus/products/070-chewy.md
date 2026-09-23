# 070. Chewy

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | Pet supplies and pharmacy (retail + licensed veterinary pharmacy + telehealth + insurance) |
| Primary URL | https://www.chewy.com/ |
| Corpus rank | 070 |
| Benchmark strength (source list) | Pet-centered purchase and service content |
| Locale / market observed | en-US (a Canada switcher exists; not harvested) |
| Platform observed | Web (desktop, server-rendered HTML); help centre, CarePlus and Chewy Vet Care are client-rendered SPAs |
| Regulatory posture | **Licensed veterinary pharmacy** — entity named as `Chewy Pharmacy KY, LLC`, licensed in all 50 states; NABP and LegitScript accredited; PCAB-accredited compounding lab; FDA-approved medications; vet authorisation required on all Rx items; state-by-state telehealth scope-of-practice limits; Alabama Simplified Sellers Use Tax; pet insurance sold via a separate licensed agency entity |
| Harvest date | 2026-09-21 |
| Pages inspected | 21 (13 with full server-rendered content, 8 empty or SPA-shell) |
| Harvest completeness | **Partial.** The modern help centre (`/customer-care/*`), CarePlus and Chewy Vet Care are all client-rendered and returned `Loading...` or empty bodies. A **legacy server-rendered CMS FAQ** at `cms.chewy.com` is still live and supplied much of the equivalent Q&A — it is demonstrably out of date in places and is treated here as a historical layer, flagged throughout. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.chewy.com/ | Hero, species picker, membership promo |
| Autoship & Save | https://www.chewy.com/b/autoship-save-15682 | **Best T4 source** — setup, management, 6-question FAQ |
| Chewy Pet Pharmacy (how it works) | https://www.chewy.com/b/pharmacy-15697 | Three-step Rx flow, accreditation badges |
| Learn about compounding | https://www.chewy.com/b/learn-about-compounding-169822 | PCAB copy |
| Connect with a Vet | https://www.chewy.com/b/connect-vet-16616 | **Best T10 source** — scope-of-practice limits |
| Chewy Gives Back | https://www.chewy.com/g/give-back | |
| Forever Loved (pet-loss hub) | https://www.chewy.com/education/forever-loved | The bereavement hub |
| How To Cope With the Loss of a Pet | https://www.chewy.com/education/dog/general/how-to-cope-with-the-loss-of-a-pet | |
| What To Say When Someone Loses a Pet | https://www.chewy.com/education/cat/general/what-to-say-when-someone-loses-a-pet | **The strongest bereavement artefact** |
| Memorials & Keepsakes | https://www.chewy.com/b/pet-memorials-15474 | Bereavement commerce |
| Chewy Accessibility | https://www.chewy.com/app/content/accessibility-information | WCAG 2.1 AA commitment |
| Legacy CMS FAQ | https://cms.chewy.com/cms/help/customer/faq.html | Server-rendered; 26 questions; stale in places |
| Help centre | https://www.chewy.com/customer-care | **SPA — `Loading...` only** |
| CarePlus | https://www.chewy.com/pet-insurance/ | **Empty body** |
| Chewy Vet Care | https://www.chewy.com/vet-care | **Chrome and footer only** |

---

## T1 Navigation & IA labels

**Primary nav — species first, then services** `[observed]`

`Dog` · `Cat` · `Other Animals` · `Pharmacy` · `Services` · `Education` · `Give Back` ·
`New Arrivals` · `Deals` · `Halloween Shop`

The taxonomy is asymmetric by design: two species get their own top-level entry, everything
else is collapsed into `Other Animals` — a bucket that contains horses, chickens, livestock,
wild birds, small animals, pet birds, fish and reptiles. Merchandising volume, not zoology,
decides the IA.

Four of the ten top-level items are **not shopping**: `Pharmacy`, `Services`, `Education` and
`Give Back`. Chewy's nav asserts that it is a healthcare provider, a publisher and a charitable
actor alongside being a shop, and it does so before it gets to `Deals`.

**Global header** `[observed]`

Skip links `Skip to search` and `Skip to main content`. Utility bar: `USA` · `Use App` ·
**`24/7 Help`** · `Account` · `Cart`. The help flyout heading is
`Get help from our experts 24/7` with the phone number directly beneath.

Putting `24/7 Help` and a phone number in the persistent utility bar — ahead of `Account` — is
the clearest single statement of Chewy's positioning. Most retailers put support in the footer.

Account entry is a single combined label, `Sign In or Create Account`, rather than two.
The geo interstitial reads `Not in the U.S?` (missing full stop, verbatim).

**Service and Give Back menus use one card pattern throughout**: title + one-line descriptor +
CTA `[observed]`

| Card title | Descriptor | CTA |
|---|---|---|
| `Connect with a Vet` | "Chat for free with a licensed vet tech." | `Learn more` |
| `CarePlus Pet Insurance & Wellness Plans` | "Give your pet the best possible health coverage with pet insurance and wellness plans." | `Learn more` |
| `Chewy Vet Care` | "Exceptional in-person routine and urgent care from our compassionate veterinary teams." | `Schedule a visit` |
| `How We Give Back` | "We've donated more than $100M in products to rescue animal centers." | `Learn more` |
| `Donate to a Rescue` | "You can help us make an impact by donating items to your local shelter." | `Find a Rescue` |
| `Find Pets to Adopt` | "Search thousands of pets from shelters and rescues in Chewy's network." | `Find Pets` |
| `Join Our Network` | "Join our network to access benefits and resources that'll help more pets." | `Join Now` |

The three service cards are differentiated by **one word each in the descriptor**:
"for free" (chat), "coverage" (insurance), "in-person" (clinic). That is how a user
distinguishes three overlapping health products in a dropdown.

**Pharmacy menu is organised by condition, not by product type** `[observed]`. Under each of
`Dog`, `Cat` and `Horse`: `Prescription Flea & Tick`, `Heartworm Prevention`,
`Pain Relief & Arthritis`, `Antibiotics & Antifungals`, `Allergy Relief`,
`Anxiety & Calming`, `Ear & Skin Conditions`, `Eye Drops & Ointments`,
`Urinary & Kidney`, `Diabetes Care & Insulin`, `Thyroid & Hormone`.

A pet owner does not know the drug class; they know what is wrong. The navigation is written
from the symptom.

**Footer** `[observed]`: `About` · `Investor Relations` · `Affiliates` · `Jobs` · `FAQs` ·
`Learn` · `Give Back` · `Gift Cards` · `Sell on Chewy`, and a legal cluster of
`Terms of Use` · `Privacy Policy` · `Interest-Based Ads` · **`Accessibility`** ·
`California Supply Chains Act` · `Vendor Compliance`. Plus `We're here 24/7`,
`Chat Live with Us`, `Our experts are available 24/7:`, `Back to Top`.

`Accessibility` sits in the legal cluster as a first-class footer item — the same placement
Patagonia uses (068) and better than Allbirds, which orphans its statement entirely (067).

**Two casing systems coexist** `[observed]`: the shop nav uses Title Case with ampersands
(`Health & Pharmacy`); the help centre uses sentence case with "and" spelled out
(`Orders, payments, and promotions`). Same company, two conventions, adjacent surfaces.

## T2 Value proposition & headline patterns

**Homepage** `[observed]`

> `Welcome to Chewy` (H1) · `Hey, friend!` (sign-in prompt) ·
> **`Who are you shopping for today?`** · `Explore popular categories` ·
> `Pet parenting made easy` · `Halloween is creeping up`

`Who are you shopping for today?` is the homepage's organising question, and it is answered by
eleven species tiles beginning `Dog`, `Cat`, **`Pet Parent`**. The third tile is the human.
Chewy's homepage asks who you are buying for and offers *yourself* as a valid answer to a
question about pets — which is also where the bereavement merchandise lives (see below).

The `Pet parenting made easy` block is four links that are all services, not products:
`Award-winning 24/7 customer care` · `Chat free with our licensed vet team` ·
`Prescription meds, delivered fast` · `Discover pet insurance`.

**Section headline grammar: benefit-first, second person, contractions** `[observed]`

`Autoship & Save` · `Why You'll Love Autoship` · `It's easy to get started with Chewy Pharmacy` ·
`Order in three simple steps` · `The pharmacy you can count on` ·
`We have all the brands you trust` · `Find the meds they need` · `Any questions?` ·
`Peace of mind from home` · `Free online vet chat for quick advice` ·
`Highly rated & trusted by pet parents` · `Helping More People Bring Love Home` ·
`It's Never Been Easier To Give Back` · `You Give Hope, We Give Back` ·
`We're Here for All Pet Parents` · `Forever Loved`

`Find the meds they need` is the pharmacy headline, and the pronoun does the work: `they` is
the pet. Chewy writes about a third party who cannot speak for themselves, so the second
person (`you`) is the buyer and the third person (`they`, `your pet`) is the patient. That
split runs through every health surface.

**The benefit-card pattern is the most reusable structural artefact here** `[observed]` —
three or four cards, each a short heading plus one sentence of eight to fourteen words:

| Heading | Sentence |
|---|---|
| `Savings every time` | "Save 5% off eligible items with every Autoship order." |
| `Set your own schedule` | "Choose a frequency that works for you. Change or cancel anytime." |
| `Get first dibs` | "You'll get priority access to popular items and essentials." |
| `Easy refills & add-ons` | "Never miss a dose, and easily add one-time items." |

Note card two: the benefit and the **exit** are in the same nine-word sentence.
"Change or cancel anytime" is not in a footnote; it is half of the value proposition. For a
recurring-billing product, putting cancellation inside the sell is the whole trick.

And card four, `Never miss a dose`, is the only place the emotional stake of a subscription
appears — it is not about convenience, it is about a pet going without medication.

**Superlatives are rationed to one surface** `[observed]`:
`Medicine Made Just for Your Pet, From America's #1 Pet Pharmacy`. The only ranked claim in
the pages harvested, and it sits on the compounding page, where authority is what is being
sold.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| **`Yes, make my life easy.`** | Checkout, Autoship opt-in | **A consent label written as a full sentence in the customer's own voice, with a full stop** |
| `Add to Autoship` | Product page | |
| `Ship Once With Next Autoship` | Product page, when the item is not repeat-eligible | Elsewhere rendered `Ship once with next Autoship` — casing inconsistency |
| `Skip Shipment` | Manage Autoship, secondary | |
| `Order Now` | Manage Autoship, primary | The page explicitly names the button colours |
| `Cancel This Autoship` | Foot of the Autoship detail page | Definite and scoped — "This", not "my" |
| `Change` / `Change Date` | Frequency and Next Order sections | Desktop/mobile variants |
| `Remove` | Per-item in Autoship | |
| `Chat now` | Connect with a Vet, repeated 3× | Lowercase "now" — inconsistent with Title Case CTAs elsewhere |
| `Shop compounded meds` | Pharmacy benefit card | |
| `Get prescription help` | Pharmacy `Any questions?` block | **Routes to the help centre, not to chat** |
| `How it works` | Pharmacy mega-nav | The only explanatory nav CTA in a transactional menu |
| `Learn about compounding` | Pharmacy mega-nav | |
| `Schedule a visit` | Chewy Vet Care card | The only in-person CTA |
| `Find a Rescue` / `Find Pets` / `Find a Pet` | Give Back nav and page | **`Find Pets` in nav, `Find a Pet` on the page** |
| `Shop Wish List` | Give Back donate module | `Wish List` is the coined term for a shelter's needs registry |
| `Join Now` | Join Our Network | |
| `Personalize` | Product tile, customisable memorial items | |
| `Add to Cart` | Product tile | |
| `View Item Details` | Product tile **when the item is out of stock** | **CTA swaps on unavailability** rather than greying out |
| `Start free trial` | Membership promo (image alt) | |
| `Learn more` | Services cards ×2, Give Back card | Reused generically |
| `Show More` / `Read More` / `See More +` | Progressive disclosure, three surfaces | Three labels for one behaviour |
| `Chat Live with Us` | Footer | |
| `Sign in` | Empty-cart recovery | |

**`Yes, make my life easy.`** is the single most distinctive string in this batch and is worth
stating plainly: it is a **subscription opt-in written as the customer's sentence rather than
the system's label**. It is a complete declarative sentence, it begins with the answer, and it
names the benefit in the same breath as the consent. Compare a conventional
"Subscribe & Save 5%". The risk is obvious — a cute label on a recurring-billing commitment —
and Chewy mitigates it by putting "Change or cancel anytime" in the value proposition above.

`View Item Details` replacing `Add to Cart` on an out-of-stock tile is the other good one:
instead of a disabled button, the user gets a working action that is still useful to them.

## T4 Onboarding & getting-started — guided purchase and prescription approval

### A. The prescription flow — three steps, with the burden transferring on step three `[observed]`

https://www.chewy.com/b/pharmacy-15697, under `Order in three simple steps`:

| Step | Heading (verbatim) | Body (summarised) |
|---|---|---|
| 1 | `Add your pet's meds with a click` | Add the vet-prescribed item to the cart |
| 2 | `Enter a few quick details` | At checkout, supply pet info and vet clinic details so Chewy can verify with the vet |
| 3 | **`Relax, we'll do the rest`** | Chewy contacts the vet; a licensed pharmacy team reviews for safety and accuracy; delivery follows approval, stated as 3–5 days; Chewy sends updates and reaches out if more is needed |

**Steps one and two are imperatives addressed to the user. Step three is a reassurance
imperative that moves the work to Chewy.** `Relax, we'll do the rest` is the hinge of the whole
flow, and it is doing something structurally unusual: a step in a numbered sequence whose
instruction to the user is *do nothing*. For a process the user cannot control — a third-party
veterinarian responding to a fax — naming the waiting as a step, and naming who is working
during it, is the correct design.

Compare Apple's `Processing` status message (069), which likewise describes what *Apple* will
do next rather than what the user should do. Same principle, different surface: Apple puts it
in a status, Chewy puts it in a step name.

**The paper-prescription branch is disclosed as its own block** `[observed]`, headed
`Mailing a paper prescription?`:

- The checkout option is labelled `mail in prescription`
- Chewy covers overnight shipping, or the customer can post it themselves
- Once received, the order typically ships within 1–2 days
- Two hard constraints, both stated: include the order number to avoid delays, and
  **"We require the original paper prescription, not a copy."**
- **A separate mailing address for a single named drug**: `For Gabapentin orders only:` with a
  different fulfilment centre

That last item is the finding. A controlled-substance handling rule has surfaced directly into
consumer UX copy as a second postal address labelled with the drug name. Most retailers would
bury this in a help article; Chewy puts it inline, in the block where the user is about to
address an envelope. **A regulatory constraint rendered as a logistics instruction at the
moment it applies.**

### B. Autoship setup — four moves, narrated rather than numbered `[observed]`

Shop and add to cart → at checkout choose `Yes, make my life easy.` → choose a frequency →
place the order. Then: an email when it ships, and a reminder email before the next order.
Management lives at `Manage Autoship`.

**Frequency choice is the honest part** `[observed]`. The FAQ `How do I choose a frequency?`
points to per-item duration guidance on product pages and then **admits it takes trial and
error**. A subscription product conceding that the user will probably get the interval wrong
the first time — and that this is expected — removes the anxiety from the one decision the
user has no data for.

The management vocabulary is four verbs, and they are the four things a user actually wants:
`Skip Shipment` · `Order Now` · `Change` (frequency or date) · `Cancel This Autoship`.
Skipping and ordering early are given equal prominence to cancelling. The page even names the
button colours in its own copy, which implies the help text was written against the interface
rather than the spec.

### C. Connect with a Vet — two paths, distinguished by whether scheduling exists `[observed]`

- **Free chat**: `With free chat, you'll connect instantly` — no scheduling step; a free
  account is required to share photos and videos
- **Virtual visit**: schedule an appointment → receive a join link → video visit with a
  licensed veterinarian

Three bullets set expectations under the hero:
`Chat with licensed virtual vet techs` · `Share photos and videos over chat` ·
`Clear answers and next steps`

The third bullet is the promise that matters. A worried owner is not buying a conversation;
they are buying a decision about whether to get in the car. `Clear answers and next steps`
names that outcome in five words.

## T5 Form & field labels

Thin, because checkout, account and the help centre are all behind JS or auth. Verified
`[observed]` / `[documented]`:

| Label / string | Surface |
|---|---|
| `Yes, make my life easy.` | Checkout, Autoship opt-in |
| `mail in prescription` | Checkout, prescription-method option |
| `Sign In or Create Account` | Global header — one combined entry |
| `Update your active Autoships to use this credit card` | Payment-method checkbox `[documented]` |
| `Update your active Autoships to use this address` | Address checkbox `[documented]` |
| `Sort By` / `Sort` / `Filter` | PLP controls |

Named account surfaces referenced as destinations: `Manage Autoship`, `Payment Methods`,
`Addresses`, `Orders`, **`Pet Profile`**.

The two "update your active Autoships" checkboxes are a good pattern: when a user changes a
card or an address, the system asks explicitly whether the change should propagate to standing
orders, rather than deciding silently. For a recurring-billing product, a silent propagation
either way is a support ticket.

**`Pet Profile` is a mandatory form, and the copy grounds it in law** `[documented]`. Chewy
states it is required by law to know the pet's medical issues, allergies, weight, breed and
age in order to dispense safely. The field list is justified, once, with the reason —
rather than being presented as onboarding.

Exact checkout field labels: `[absent]`.

## T6 Status & state language

`[observed]` / `[documented]`

**Autoship lifecycle**: `Next Order` · `Frequency` · `Skip Shipment` · `Order Now` ·
`Cancel This Autoship`, with cancellation defined in copy as stopping "all future shipments".

**Prescription lifecycle** — the vocabulary exists but is not formalised as named states:
a prescription is *verified*, *confirmed* or *approved*; a customer may have
`valid prescription or remaining refills on file`; a prescription may be `expiring soon`; the
vet gives *authorization*; and an order is *cancelled* after failed vet outreach.

**Payment state** `[documented]`: a `pending charge` may appear **as early as 24 hours before
the scheduled ship date** — a pre-emptive explanation of a bank-statement line the user has not
yet been charged for.

**Product state** `[observed]`: `Out of Stock` · `Product status:Deal` ·
`Rated 4.5 out of 5 stars.` · `Chewy Price` · `Price per unit`

**`Loading...`** is rendered literally to non-JS clients across the entire help centre. It is
the help centre's only server-side content.

**A formal order-status enumeration (Processing / Shipped / Delivered) was not found on any
renderable Chewy surface.** `[absent]` This is a notable gap against Apple (069), which
publishes its full nine-state table with the customer-facing message for each. Chewy's order
states exist but are not documented publicly.

## T7 Error, failure & recovery

**The vet-outreach failure path is published as a procedure with a count** `[documented]`:

Chewy faxes the veterinarian first, then telephones, then makes **three additional attempts**;
if there is still no response, the order is cancelled.

A named escalation ladder with a specific number of retries, published to the customer, for a
process the customer cannot see and does not control. And the recovery is **Chewy-initiated,
not user-initiated** — the customer is contacted only if information is needed *from them*.
That division of labour is stated explicitly in the Autoship FAQ: if no authorisation is
received or the prescription is expiring soon, a team member contacts the vet.

**Clinical risk is routed away from Chewy, deliberately and repeatedly** `[documented]`:

- Adverse reaction: the instruction is to contact your veterinarian immediately
- Emergency: `Connect with a Vet` copy repeatedly instructs going to the nearest clinic or
  emergency vet for life-threatening situations, and **lists example emergencies** — severe
  trouble breathing, excessive bleeding, uncontrolled seizures, toxins

Listing the examples is the important half. "Contact your vet in an emergency" assumes the
owner can recognise one; naming four specific presentations tells them.

**Prescription returns are excluded, with a carve-out** `[documented]`: returns and exchanges
are not accepted on prescription medications, but incorrect or damaged medication is exchanged
or refunded case by case. The exclusion and its exception are stated together.

**Accessibility failure reporting** `[observed]`: an explicit invitation to report a blocking
bug, a named channel (`accessibility@chewy.com`), and a stated commitment to treat
accessibility bugs at the same priority as any other bug. The commitment is operational, not
aspirational.

**Chewy's own error pages are brand-voiced** `[observed, from indexed page title]`:
`403 error - No treats beyond this point - Chewy`. A pet pun in place of a status explanation.
The body copy and any recovery CTA were not rendered. `[absent]`

**A legacy framing that sits badly** `[documented]`: the lost-package answer on the legacy CMS
FAQ is written as a **risk-of-loss legal statement** — risk and title pass to the customer on
delivery to the carrier — rather than as a recovery flow. For a company whose reputation rests
on service recovery, this is the one place the published copy reads as though it were written
by the opposing party. Recorded as a negative finding, and flagged as legacy-layer content.

Inline validation, 404 body copy, and payment-decline copy: `[absent]`.

## T8 Empty states

**One empty state was directly observable, and it is a textbook three-part construction**
`[observed]` — the cart flyout, present on every page:

> `Your cart is empty.`
> `Something missing? Sign in to see items you may have added from another computer or device.`

Three moves in two sentences:

1. **A flat statement of the state.** Four words, full stop, no apology, no illustration-driven
   whimsy.
2. **A hypothesis about why the user might be surprised.** `Something missing?` addresses the
   specific person who expected to find something there, and only that person.
3. **One recovery action, with the reason it would help.** `Sign in` — and then the
   *mechanism*: a cart from another device.

Most empty carts say "Your cart is empty" and link to a category page. Chewy's second sentence
does the work: it diagnoses the one scenario in which the empty state is a *bug from the
user's point of view*, and offers the fix for exactly that scenario. This is the strongest
empty-state artefact in the batch.

Other empty and zero states — empty Autoship, no orders, no search results, no prescriptions on
file — are behind auth or the SPA. `[absent]`

Adjacent: `Showing 1-6 of 6 articles` is the result-count string that would degrade into a
zero-results state.

## T9 Notifications & system messages

`[observed]`

- Site-wide promo bar: `Free $25 eGift card with your $49+ order`
- Pharmacy promo: `Save 50% on first Pharmacy order` / `Set up a prescription Autoship`
- Autoship promo: `Save 35% on first order` / `Set up an Autoship`
- Membership promo:
  `Chewy+ membership. Free shipping plus 5% rewards. Savings that really add up. Start free trial.`
- PLP shipping badge: `Free 1-3 day delivery on first-time orders over $35`
- PLP returns badge: **`Free 365-day returns`**
- Carousel affordance: `Swipe to explore`
- Social proof: `4.9/5`, `1 million+ consultations`
- Brand promo tiles written as full sentences with code and exclusion:
  `Code: PURINA. Shop now. Exclusions apply.`
- Autoship emails, described in copy: a ship-confirmation email and a pre-order reminder email

**A named paid membership exists and is promoted in image alt text only.** The string
`Chewy+ membership. Free shipping plus 5% rewards. Savings that really add up. Start free
trial.` was observed on the homepage as the alt text of a banner linking to a membership
signup path. **No membership page copy was harvested**, and the legacy CMS FAQ still answers
`Is there a membership fee?` in the negative. Both layers are live. Recorded as an
unreconciled contradiction, not resolved.

**Threshold copy is inconsistent across live surfaces** `[observed]`: `$49` for free shipping
(site meta and legacy FAQ), `$49+` for the eGift promotion, and `$35` for
`Free 1-3 day delivery on first-time orders over $35`. These are genuinely different offers,
but nothing at badge level disambiguates them, so three dollar thresholds compete for the same
mental slot.

## T10 Disclosures, legal & compliance — pharmacy, telehealth and guarantee

**This is the richest regulatory-copy section in the batch, and it is richest precisely because
Chewy sells medicine.**

### Pharmacy licensure and accreditation `[observed]` / `[documented]`

The legacy FAQ answers it as two direct questions:

- `Is Chewy a licensed pharmacy?` — answered by naming the entity:
  "`Chewy Pharmacy KY, LLC` is a pharmacy licensed to dispense prescription drugs" in all
  50 states
- `Is Chewy Pharmacy accredited?` — confirming **NABP** (National Association of Boards of
  Pharmacy) and **LegitScript** accreditation

Naming the licensed legal entity, in a consumer FAQ answer, is the move. The consumer brand is
`Chewy Pharmacy`; the licence belongs to `Chewy Pharmacy KY, LLC`; and the answer gives both
so the user can verify one against a state board register.

Four trust badges on the pharmacy page, rendered as images with these alt texts `[observed]`:
`NABP Accredited` · `Legit Script Certified` · `PCAB Accredited` ·
`Forbes Best Customer Service`

**`VIPPS` does not appear anywhere.** Chewy uses NABP accreditation generically rather than the
VIPPS seal name. `[absent]`

**PCAB is explained rather than asserted** `[observed]`, on the compounding page:
section header `Our high-quality compounding lab is accredited by PCAB`, with the card
`Quality & safety` → "Prescriptions are made in our PCAB-accredited lab, meeting national
quality standards." The body then glosses what PCAB accreditation means — rigorous standards,
high-quality ingredients, precise formulations, strict safety standards.

**And the compounding page declines to recommend** `[observed]`. The `Vet trusted` card frames
compounded medication as a reliable alternative, then instructs the reader to **ask their vet
whether it is right for their pet**. A retailer selling a product, on the product's own page,
routing the decision to a third-party prescriber. That is the correct answer and it costs
conversion.

Also: `We sell the same FDA-approved meds as veterinary clinics.` — a single-sentence
neutralisation of the "is online pet medication real medication" objection.

### Vet authorisation and prescription control `[documented]`

- All prescription items require veterinary authorisation. Chewy can contact the vet on the
  customer's behalf, or the customer can send the prescription.
- Outreach sequence: **fax first, then phone, then three additional attempts**, then
  cancellation
- **Food prescriptions may be faxed or emailed; medication prescriptions must be mailed** — a
  materially different rule per product class, stated as such
- Mailed prescriptions are typically processed within 24–48 hours of receipt
- An account is mandatory to order prescription items
- A `Pet Profile` is mandatory, and the requirement is grounded in law
- Disposal guidance defers to the customer's veterinary clinic and links to FDA guidance
- Rx identification: `All prescription items are marked with an 'Rx' badge next to the item
  name.`

The `Rx` badge sentence is small and important: it tells the user, in advance, how to recognise
which items will trigger the whole vet-authorisation apparatus — so the friction is
predictable from the product listing, not discovered at checkout.

### Telehealth scope-of-practice — the strongest regulatory-boundary copy in this batch `[observed]`

https://www.chewy.com/b/connect-vet-16616:

- A parenthetical **directly under the hero**:
  `no diagnoses, prescriptions, or vet diet authorizations`
- Vet techs explicitly cannot prescribe medications and cannot authorise refills
- Chewy veterinarians cannot authorise refills originally prescribed by a non-Chewy
  veterinarian, but may create new prescriptions at professional discretion
- Free chat is available in every state **except three named ones**
- Virtual visits with a licensed veterinarian are restricted to **seven named states**
- Species limit: dogs and cats only
- Hours given precisely for each mode, plus `365 days a year, including holidays`
- Price: `$49.99 per visit (one pet per visit)` — the per-pet limit inside the price string
- A legacy-customer carve-out for insurance customers who bought before a named date
- **Testimonial methodology disclosed**: `testimonial reviews are based on an NPS scale of 10`
  converted to a 5-point scale

Two things to take from this. First, **the scope limit is in the hero, in a parenthetical,
before any benefit claim** — `no diagnoses, prescriptions, or vet diet authorizations` is the
second thing a user reads. Second, **the testimonial disclosure**: publishing the conversion
methodology behind a star rating is rare, and it is the kind of disclosure that costs nothing
and buys a great deal.

**A live contradiction on one page** `[observed]`: the hero states three excluded states; the
FAQ on the same page adds Puerto Rico to the exclusion list. For a service gated by
professional licensure, two different availability statements on one page is a governance
failure of the same class as Warby Parker's two eligibility lists (066).

### Return window and guarantee — two layers, two answers `[observed]` / `[documented]`

- **`Free 365-day returns`** — a product-tile badge. This is the only Chewy-owned surface on
  which the 365-day window was verifiable.
- The legacy CMS FAQ answers `What is your return policy?` with `Our policy is simple:` and the
  condition `if you're not 100% unconditionally satisfied` — and states the promise **with no
  time limit at all**.

So Chewy's own estate states its guarantee two ways: a 365-day window on the modern shop, and
an unbounded satisfaction promise on the legacy help layer. Recorded; neither is treated as
canonical.

The legacy page also carries a title/risk disclosure — Chewy does not take title to returned
items until they arrive, and may at its discretion refund without requiring a return, in which
case it does not take title — and **renders a stray `Legal` token where the company name
should be**. A live content defect in a policy answer.

### Shipping, tax and other `[documented]`

Orders over `$49` ship free; other orders ship at a flat `$4.95`; orders placed by 4PM ET
usually ship the same day; most customers receive orders in 1–2 days; prescription-approval or
personalisation orders may take longer; **contiguous US only — no P.O. boxes, APO/FPO or
international**.

Sales tax: 43 taxing states listed by abbreviation, plus a specific Alabama disclosure naming
the Simplified Sellers Use Tax and stating that Chewy remits it on the customer's behalf to the
state Department of Revenue.

Autoship promotional footnote `[observed]`: `Maximum $20 savings on 35% off Autoship
promotion.` plus `For Autoship-eligible items only. Some exclusions apply.` and a link to
`Autoship Terms` — the cap stated as a dollar figure rather than left implicit in the
percentage.

### Pet insurance — **not harvested** `[absent]`

`https://www.chewy.com/pet-insurance/` returned metadata and an **empty body**. CarePlus is a
separate JS application. **No underwriter disclosure, no policy terms, no exclusions and no
claims copy were captured, and none have been reconstructed.** The only CarePlus strings in
this file are the mega-nav label `CarePlus Pet Insurance & Wellness Plans` and its descriptor.

For a product sold under a retailer's brand but underwritten by third parties, the underwriter
disclosure is the single most important string, and it is the one this harvest could not reach.
Flagged for an authenticated or browser-rendered pass.

### Impact claims contradict each other three ways `[observed]`

The mega-nav says "more than $100M in products"; the Give Back page hero says `$183M+ of Pet
Supplies Donated` `Since 2012`; and a stale bullet list **further down the same page** gives a
figure in the sixties of millions. Three mutually inconsistent totals, two of them on one page.

## T11 Help-centre architecture

**Chewy runs three parallel help architectures simultaneously.** That is the finding.

### 1. The modern help centre — `/customer-care/*` `[absent]` in body, structure recoverable

A client-rendered SPA. Every fetch returned chrome plus `Loading...`. Category structure is
recoverable from URL paths and page titles:

Top level: `/autoship` · `/orders-payments-and-promotions` · `/returns` ·
`/shipping-and-tracking` · `/prescriptions-and-veterinary-diets` · `/health-services/careplus`

Three-level depth confirmed — **category / task-group / article**:
`/returns/making-a-return/start-a-return` ·
`/autoship/creating-or-updating-autoship/manage-a-discontinued-autoship-item` ·
`/orders-payments-and-promotions/payments/send-a-chewy-egift-card` ·
`/health-services/careplus/check-my-claim-status`

**Category grammar**: sentence case, plural nouns, "and" spelled out —
`Orders, payments, and promotions`, `Shipping and tracking`,
`Prescriptions and veterinary diets`.

**Task-group grammar**: gerund-led — `making-a-return`, `creating-or-updating-autoship`.

`creating-or-updating-autoship` is the interesting one: the task group **pairs the creation
verb with the maintenance verb**, because for a subscription those are the same user's two
jobs.

**Article-title grammar**: predominantly `How to <verb phrase> | Chewy Help` —
`How to Start a Return | Chewy Help` · `How to Start a New Autoship | Chewy Help` ·
`How to Check Your CarePlus Claim Status | Chewy Help` — with sentence-case exceptions
(`Manage a discontinued Autoship item`, `Send a Chewy eGift card`) and noun-phrase entries
(`About Chewy Pharmacy`).

**Negative finding** `[observed]`: category index pages fall back to the undifferentiated
title `Chewy Help`. Every category index has the same `<title>`, which is both an SEO defect
and a screen-reader defect — a user navigating by page title cannot tell the categories apart.

### 2. The legacy CMS FAQ — `cms.chewy.com` `[observed]`

Still live, still indexed, fully server-rendered. A flat single-page accordion with six
implicit sections, only one of which carries an explicit heading — `Prescription Items`.
Deck: `You got questions? We got answers!`

It contradicts the modern estate in at least four places (see the inconsistency list below) and
contains two live content defects: two answers render empty or truncate mid-sentence, and one
renders a stray `Legal` token in place of the company name.

### 3. Per-page FAQ accordions `[observed]`

Several commercial pages carry their own FAQ blocks with a `Close` control per item —
Autoship (6 questions), Connect with a Vet (9), Memorials & Keepsakes (5).

**The consequence.** A user asking "how far in advance can I change my Autoship date?" can
reach two Chewy-owned answers giving two different numbers, on two live domains, from two
different help systems. The per-page accordions are the best-written layer, the SPA is the
canonical layer, and the legacy CMS is the one search engines still serve.

## T12 FAQs

### Autoship — `Frequently Asked Questions` `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How does Autoship work? |
| 2 | Can I order prescription medications or veterinary diet items with Autoship? |
| 3 | How do I choose a frequency? |
| 4 | How can I add or remove items in my Autoship? |
| 5 | How do I reschedule or delay my Autoship? |
| 6 | How do I cancel my Autoship? |

Six questions in commitment order: how it works → can I put the important thing on it →
how do I set it → how do I change it → how do I delay it → how do I leave. **The last question
is cancellation, asked plainly, and answered with a single button location.** Q5 and Q6 are
adjacent, which means the two exit routes — delay and cancel — sit together, so a user looking
for the door finds the gentler option first.

Q2 is the load-bearing one for this product: it confirms prescription medication can go on
Autoship *with* a valid prescription or refills on file, notes that vet-diet items need
authorisation before shipping, and states that Chewy contacts the vet if authorisation is
missing or expiring. The recurring-billing product and the regulated product are reconciled in
one answer.

### Connect with a Vet `[observed]`

Nine questions: `What is Connect with a Vet?` · `What can the Connect with a Vet telehealth
team help with?` · `How do I connect online with the Chewy vet team?` · `When is the vet team
available on Connect with a Vet?` · `Where is Connect with a Vet available?` · `Which types of
pets can I talk to an online vet or vet tech about?` · `Who should I contact for more
information?` · `Can Chewy online vets prescribe medication?` · `Can I get a prescription
refill through Connect with a Vet?`

**Four of the nine are about limits** — where, which pets, can they prescribe, can they refill.
Nearly half of a telehealth FAQ is devoted to what the service cannot do. Q2's answer draws the
line explicitly: chat can triage urgency and advise on seeking in-person or emergency care;
vaccines, diagnostics and lab work still require in-person care.

The question-wording style repeats the product name inside the question
(`When is the vet team available on Connect with a Vet?`) — verbose, but it makes every
question self-contained and scannable out of context.

### Memorials & Keepsakes `[observed]`

Five questions: `How do you honor a deceased pet?` · `What types of pet memorials are
available?` · `How can I personalize a pet memorial?` · `What's a good gift for someone who lost
a pet?` · `How long does it take to create and receive a custom pet memorial?`

Q5 is the one that earns its place: two to eight weeks depending on vendor, with more detail
meaning longer, plus shipping. A bereaved person ordering a memorial needs to know whether it
will arrive before a burial or a gathering, and this is the only place that question is
answered.

**Q1 uses the clinical word `deceased` on a page whose body copy says `fur baby`.** See T14.

### Legacy CMS FAQ `[observed]`

Twenty-six questions across six sections. Representative verbatim:
`How do I contact customer service?` · `What are your customer service hours?` ·
`Do you charge sales tax?` · `Do you work with shelters and other pet-related organizations?` ·
`What is Autoship?` · `Is there a membership fee?` · `When will my credit card be charged?` ·
`How much is shipping?` · `Who will be delivering my order?` ·
`Do I need to be there to sign for it?` · `What happens if my package gets lost?` ·
`What is your return policy?` · `Is Chewy a licensed pharmacy?` ·
`Is Chewy Pharmacy accredited?` · `How do I know which items require a prescription?` ·
`Do prescription items require authorization from my vet?` · `How will you contact my vet?` ·
`Can I fax or email my prescription?` ·
`Who do I contact if my pet has a negative reaction to the medication?`

`Do you work with shelters and other pet-related organizations?` sitting in a general
customer-service FAQ is a small signal worth noting — the giving programme is treated as a
support question, not only as marketing.

**Two answers are broken in production**: `How can I tell if medications have expired?` renders
empty, and the pharmacy-contact answer truncates mid-sentence with the email address missing.

## T13 Terminology & glossary

| Term | Chewy's usage | The alternative it rejected |
|---|---|---|
| **`Autoship`** | Noun, verb-object and modifier: `an Autoship`, `Manage Autoship`, `Add to Autoship`, `Autoship-eligible`, `your active Autoships` | **"subscription"** — never once used in customer-facing copy |
| **`pet parent`** | The customer: `We're Here for All Pet Parents`, `Pet Parent Supplies`, and as a breadcrumb category | **"owner"** |
| `Cat parent` / `Dog parent` | Testimonial attribution, used as a role label | "customer", "reviewer" |
| `Connect with a Vet` | The telehealth product | "telehealth", "televet" — both used only as in-FAQ glosses |
| `Chewy Vet Care` | The in-person clinic brand | "clinic", "practice" |
| `CarePlus` | Umbrella over both insurance and wellness plans | "pet insurance" alone |
| `Chewy Pharmacy` / `Chewy Pharmacy KY, LLC` | Consumer brand vs licensed entity | |
| `Rx` badge | The prescription-required marker | "prescription required" |
| `Wish List` | A shelter's needs registry | "registry", "needs list" |
| `Chewy Gives Back` | The giving programme | "CSR", "corporate giving" |
| **`Forever Loved`** | The pet-loss content hub | "bereavement resources", "pet loss support" |
| `Chewy Picks` | Editorial curation rail | "editor's choice" |
| `Chewy Design System` | Named publicly in the accessibility statement | — |
| **`fur baby`** | Bereavement and memorial copy | "pet" |
| **`rainbow bridge`** | The primary death euphemism in pet-loss copy | "died", "passed away" |
| `Made by Chewy` / `Brands by Chewy` | **Two live labels for one concept** | "private label", "own brand" |

**`Autoship` is the strongest coined term in this batch.** It is a full part of speech in
Chewy's grammar — you can have one, manage one, add to one, be eligible for one, and cancel
one — and the word "subscription" appears nowhere in customer-facing copy. The substitution is
not cosmetic: "subscription" implies a thing you pay for, "Autoship" implies a thing that
ships. For a product whose whole objection is "am I being locked into a payment", the noun
does load-bearing work.

**`pet parent` is the second.** It sets up the third-person patient (`your pet`, `they`), it
justifies a shop category for the human (`Pet Parent Supplies`), and it is the reason the
bereavement merchandise has a defensible home in the IA.

**Register choices worth logging** `[observed]`: `vet` overwhelmingly over `veterinarian` in
headings, with `licensed veterinarian` reserved for scope-of-practice statements; `meds` in
marketing headings (`Shop compounded meds`, `Add your pet's meds with a click`) but
`medications` in regulatory answers; `Customer Care` in the modern help centre versus
`customer service` in the legacy layer. **The word gets longer and more formal exactly where
the liability rises.**

**`Chewy+` — recorded with a caveat.** The string
`Chewy+ membership. Free shipping plus 5% rewards. Savings that really add up. Start free
trial.` was observed as homepage banner alt text linking to a membership signup path. **No
membership page copy was harvested**, and the legacy FAQ still answers `Is there a membership
fee?` in the negative. Both are live. Do not treat either as settled.

## T14 Voice, tone & accessibility

**Register.** Second person for the buyer, third person for the pet. First-person plural for
the company. Contractions are the default, including in regulatory-adjacent copy. Benefit-card
sentences run eight to fourteen words. Imperatives lead CTAs.

Distinctive voice markers `[observed]`:

- Consent written as the customer's own words: `Yes, make my life easy.`
- Reassurance used as a step name: `Relax, we'll do the rest`
- Colloquial deck on the legacy FAQ: `You got questions? We got answers!`
- Error pages brand-voiced with pet puns: `No treats beyond this point`
- Casual idiom in benefit cards: `Get first dibs`
- Greeting rather than prompt in the header: `Hey, friend!`

### How an emotionally loaded category is handled — the central finding

Chewy's governing move across both health and grief is: **name the hard thing, then transfer
the effort away from the customer.** In pharmacy, the hard thing is anxiety about a sick
animal, and the resolution is `Relax, we'll do the rest`. In telehealth, it is not knowing
whether to panic, and the resolution is `Clear answers and next steps`. In bereavement, it is
grief, and the resolution is a dedicated hub that does not sell first.

**But the estate contains a clear register split on grief, and Chewy's own editorial guidance
is contradicted by Chewy's own UI copy.** `[observed]`

- **Editorial** (`/education/*`) is expert-sourced, careful, and **explicitly
  anti-euphemism**. The `What To Say` article quotes a licensed clinical social worker advising
  transparency with children, warning that euphemisms cause confusion, worry, self-blame and
  harder grieving, and naming "put to sleep" as a phrase to avoid.
- **The hub itself** (`/education/forever-loved`) opens on the euphemism —
  the standfirst turns on pets crossing "the rainbow bridge".
- **Commerce** (`/b/pet-memorials-15474`) uses the clinical `deceased pet` in an FAQ question
  and the sentimental `fur baby` in body copy **on the same page**.

Three registers — clinical, sentimental, euphemistic — coexisting on one subject, with the
brand's own published guidance sitting on one side of the argument and the brand's own
interface on the other. This is the most exploitable inconsistency in the file.

### Accessibility — https://www.chewy.com/app/content/accessibility-information `[observed]`

H1 `Chewy Accessibility`, deck `We're Here for All Pet Parents`. Section headings, in order:

`Setting Our Goals High` · `How We're Creating an Accessible Experience` ·
`Understanding User Needs First` · `Making Accessibility Part of Every Stage` ·
`Building a Consistently Accessible Experience` · `Prioritizing Accessibility Bugs` ·
`Optimizing Our Learning and Education` · `Proactively Seeking External Validation` ·
`Accessibility Features` · `Site Structure` · `Text Equivalents` ·
`Keyboard and Gesture Access` · `Consistency` · `Assistance and Feedback`

Substance (summarised): target is **WCAG 2.1 Level AA** for web and mobile apps; research with
users with disabilities precedes design; accessibility specialists are involved at every
lifecycle stage; the named `Chewy Design System` is the consistency mechanism, with each
component tested for screen readers, screen magnifiers, speech input and keyboard access;
**accessibility bugs are prioritised like any other bug**; third-party vendors supply testing
tools and periodic manual audits. Interaction consistency is justified explicitly in terms of
reducing **cognitive overload**.

Two routes are given, and they are correctly separated: a phone number for shopping assistance
("Our experts are available 24/7.") and `accessibility@chewy.com` for reporting technical
issues.

**This is the second-best accessibility statement in the batch**, behind Apple's feature estate
and ahead of Patagonia's. It beats Patagonia's by describing **process** (research first,
specialists at every stage, bug triage parity, external validation) rather than only
conformance, and by naming the internal system that enforces consistency. It shares
Patagonia's gap: no audit date, no VPAT, no remediation timeline.

The page also makes a framing move worth recording: it justifies the commitment partly by
noting that pets themselves provide safety, confidence and independence to people with
emotional, cognitive and physical impairments. **The accessibility statement argues from the
product's relationship to disability, not only from compliance.**

**Accessibility practice observed in the markup** `[observed]`

Good: skip links on every page (`Skip to search`, `Skip to main content`); the cart control
carries a descriptive accessible name including the item count
(`Cart Shopping Cart, 0 items`); carousels expose `Swipe to explore`; product images carry
slide-position alt text.

Bad, and significant:

- **Major marketing headlines and entire benefit blocks are baked into images**, with the sales
  copy living only in alt text. The Autoship hero offer
  (`Get 35% off your first Autoship order. No fees, always flexible`) and the entire
  `Chewy+ membership` proposition exist **only** as image alt. Same failure as Warby Parker
  (066) — and as there, the qualifiers travel with the offer into the alt layer
  (`Exclusions apply.`).
- Help-centre category pages all fall back to the non-descriptive title `Chewy Help`
- **The entire help centre and the entire CarePlus site are unusable without JavaScript** —
  which, for a licensed pharmacy publishing prescription and insurance information, is a more
  serious finding than it would be for a general retailer

---

## PET-LOSS AND BEREAVEMENT

The brief flagged this as the priority. Here is what is and is not published.

### 1. A dedicated, named hub exists: `Forever Loved` `[observed]`

https://www.chewy.com/education/forever-loved · H1 and hub label: `Forever Loved`
Standfirst label: `Pet Loss and Memorial Resources for Pet Parents and Family:`
Listing controls: `Explore all Forever Loved`, and the count `Showing 1-6 of 6 articles`.

The hub name is the pattern. `Forever Loved` is a **statement about the pet, not about the
reader's condition** — compare "Grief Support" or "Bereavement Resources", which name the
reader's state. It also works as a product-adjacent phrase without being one.

The opening line leads with the rainbow-bridge euphemism and then makes a direct support
statement. See T14 for why that choice is in tension with the hub's own contents.

**The hub is small and partly mis-scoped** `[observed]`. Six articles, one of which — an
article about choosing family-friendly pets — has no bereavement relevance and appears to be a
taxonomy error. It also aggregates articles that live canonically under species sections, so it
is a cross-cutting view rather than a real section. Article titles:

- `Do Dogs Feel Grief? 5 Ways To Help a Grieving Dog`
- `How To Cope With the Loss of a Pet`
- `What To Say When Someone Loses a Pet`
- `13 Pet Memorial Ideas for Remembering Your Fur Baby`
- `How to Help Your Grieving Cat`
- (plus the mis-scoped item)

Note that **two of the six are about the surviving animal's grief**, not the human's. That is a
genuine insight about this audience: a household that loses one pet often still contains
another, and no other retailer in this batch has a content slot for it.

### 2. `How To Cope With the Loss of a Pet` `[observed]`

Section headings: `Why Does Losing a Pet Hurt So Much?` · `6 Ways to Cope With the Loss of a
Pet` · `FAQs About How To Cope With the Loss of a Pet`

Step names: `1. Let Yourself Grieve` · `2. Don't Dwell on the Bad Times` ·
`3. Reach out To Loved Ones` · `4. Attend a Support Group` · `5. Memorialize Your Pet` ·
`6. Take Care of Yourself`

Emotions are given as a bare bulleted list: Sadness, Anger, Shock, Guilt, Anxiety, Fear.
Naming the emotions as a list, without prose, lets a reader find their own state without
reading a paragraph that might not describe it.

FAQ questions: `How do I get over the grief of losing a pet?` ·
`Why does losing a pet hurt so much?` · `How long does it take to cope with the loss of a pet?`

Sourced to two named experts — a veterinarian who founded a hospice practice, and a licensed
mental health counsellor specialising in animal grief.

**Four content-design decisions worth naming** (all summarised, not quoted):

1. It states explicitly that grief is **not linear**
2. It **rejects the goal implied by its own FAQ question** — the article declines the framing
   of "getting over" the loss and offers integration instead, while still publishing
   `How do I get over the grief of losing a pet?` as the question, because that is what people
   type
3. It **pre-empts guilt** as a normal and often undeserved response, and tells the reader their
   options were constrained by real limits including money and time
4. It **sets a threshold for escalation** — if active mourning continues for months to years,
   consider a grief counsellor

It also covers the **anticipatory** case, for readers whose pet is still alive and who are
preparing for euthanasia. Very few commercial bereavement surfaces address the before.

### 3. `What To Say When Someone Loses a Pet` — the strongest artefact `[observed]`

Section headings: `What To Say When Someone Loses a Pet` ·
`What To Say to Children After a Pet's Death` · **`What Not To Say When Someone Loses a Pet`** ·
`What To Do When Someone Loses a Pet`

**This is effectively a phrasebook with an explicit do-not-say list**, sourced to three named
clinicians. Short example lines from the "what to say" set include
`I'm here for whatever you need.` and `I'm so sorry for this tremendous loss.` The
euthanasia-specific line acknowledges the difficulty of the decision and affirms it was right.

The "what not to say" section names the clichés to avoid — minimising the pet's species, asking
when they will get a new one, telling them the pet is in a better place or that time heals all
wounds.

**Its anti-euphemism guidance is the part a content designer should read**: be transparent with
children, avoid euphemisms, say the pet *died* rather than that it was put to sleep, went on
vacation, or left us. Chewy publishes, in its own voice, the argument against the register its
own hub and merchandise pages use.

### 4. Commerce: `Memorials & Keepsakes` `[observed]`

https://www.chewy.com/b/pet-memorials-15474

**The IA placement is the good decision.** Breadcrumb: `Pet Parents` → `Memorials & Keepsakes`.
Bereavement merchandise is filed under the **human-focused** shop, not under `Dog` or `Cat`.
A grieving owner is not shopping for their pet any more, and the taxonomy reflects that.

Subcategory chips: `Keepsakes` · `Urns` · `Picture Frames & Prints` · `Stones` · `Caskets`.
Plain, clinical nouns — no euphemism at the navigation layer.

The body copy opens by naming saying goodbye as the hardest part of having a pet, then presents
four memorial formats as bolded definition items — `Stones:`, `Urn:`, `Memorial picture frame:`,
`Memory box:` — each with one line on what it can hold or commemorate. **Definition-first,
because a person who has never bought one of these does not know what the categories are.**

Product names carry the emotional register themselves: `Paws On Our Hearts` ·
`Forever In Our Hearts` · `In Loving Memory` · `Always In My Heart` · `Where I'll Always Be` ·
`Walk Beside Us` · `If Love Could Have Saved You`. One keepsake is called `Forever Loved` —
colliding with Chewy's own hub name.

**The significant gap**: standard commerce chrome is applied **unmodified** to this category.
`Sort` · `Filter` · `Bestselling` · `Most Reviewed` · `Chewy Price` · `Free 365-day returns` ·
star ratings · review counts. A bereaved person sorting urns by `Bestselling` and seeing a
`Free 365-day returns` badge on a casket is the clearest tonal failure identified in this
harvest — not because any string is wrong, but because **no string was reconsidered.**

### 5. Editorial-commerce adjacency `[observed]`

The `What To Say` grief article carries a `Recommended Products` rail **inside the article**,
surfacing a personalised garden stone, a breed memorial necklace, a pawprint collar frame kit
(shown `Out of Stock`) and a memorial hinged frame, with `Personalize` and `Add to Cart` CTAs
and visible prices. No hedging, no separation, no "when you're ready" framing.

### 6. **Chewy's famous condolence practice has no UI content footprint at all** `[absent]`

The widely reported behaviour — sending flowers, handwritten cards and commissioned pet
portraits to bereaved customers, and refunding food without requiring a return — is documented
**only in press coverage**. There is **no Chewy-owned page, help article, policy statement,
form or CTA for it**. There is no "my pet passed away" self-service path, no bereavement
contact route, and no bereavement category in the help centre. The only route is the generic
24/7 phone and chat.

**For a UX-content benchmark this is the headline finding.** The service behaviour most
associated with this brand is deliberately unwritten. It is an agent-discretion gesture that
depends on a human hearing the news in a conversation, and surfacing it as a UI affordance —
a form, an eligibility rule, a claim path — would destroy the thing that makes it work.

The published bereavement estate is therefore: six editorial articles, one hub page, and a
merchandise category running unmodified commerce chrome.

**No sympathy-gesture string, eligibility rule or refund term from press coverage has been
written into this file. None exists in Chewy's own content.**

---

## Transferable patterns

1. **The three-part empty state.** State → hypothesis about why the user is surprised →
   one recovery action with the reason it helps. `Your cart is empty.` /
   `Something missing? Sign in to see items you may have added from another computer or device.`
   Directly reusable anywhere a zero state might actually be a sync failure.
2. **Name the waiting as a step, and name who is working during it.**
   `Relax, we'll do the rest` as step three of three, for a process gated on a third party.
   Transfers to any flow with an external approval — KYC, underwriting, prescription, credit
   decision.
3. **Publish the escalation ladder with a retry count.** Fax, then phone, then three further
   attempts, then cancel. A user who cannot see the process can still know its shape and its
   end.
4. **Put the exit inside the value proposition.** "Choose a frequency that works for you.
   Change or cancel anytime." — one sentence, benefit and exit. Mandatory for recurring
   billing; the alternative is a footnote nobody believes.
5. **Concede that the user will get the setting wrong.** The frequency FAQ says it takes trial
   and error. Removes the anxiety from the one decision the user has no data for.
6. **Surface the regulatory constraint as an instruction at the point it applies.**
   `For Gabapentin orders only:` with a second postal address, inside the block where the user
   is addressing an envelope.
7. **Put the scope limit in the hero.** `no diagnoses, prescriptions, or vet diet
   authorizations` is the second thing a telehealth visitor reads. The limit precedes the
   claim.
8. **Name the licensed entity in the consumer answer.** `Chewy Pharmacy KY, LLC` in a plain-
   language FAQ, so the user can verify against a register. Applies to any regulated product
   sold under a consumer brand.
9. **Disclose the methodology behind a rating.** Publishing that testimonials derive from a
   10-point NPS scale converted to five stars costs nothing and is almost never done.
10. **Write the consent as the customer's sentence.** `Yes, make my life easy.` — condition:
    only defensible when the exit is equally prominent, which here it is.
11. **Swap the CTA rather than disabling it.** `View Item Details` replaces `Add to Cart` when
    out of stock, so the control still does something useful.
12. **Negative pattern — a bereavement category needs its own chrome review.** Every string on
    the memorials PLP is individually correct and collectively wrong. `Bestselling` urns,
    `Most Reviewed` caskets, a returns badge on a keepsake. Sorting, filtering, badging and
    review furniture should all be reconsidered, not inherited.
13. **Negative pattern — do not run three help systems.** Two live Chewy surfaces give two
    different Autoship cut-offs and two different guarantee terms. The best-written layer is
    the one nobody canonicalises.

## Caveats & gaps

- **The modern help centre was not harvested.** `/customer-care/*` is a client-rendered SPA
  returning `Loading...`. The category tree in T11 is reconstructed from URL paths and page
  titles; **no article body was read.**
- **The legacy CMS FAQ is treated as a historical layer, not as current truth.** It
  demonstrably contradicts the modern estate on the Autoship date-change cut-off, the
  recurring discount rate, the membership question and the guarantee term. Every string sourced
  from it is marked `[documented]` and should be re-verified before use as precedent.
- **CarePlus was not harvested at all.** `/pet-insurance/` returned an empty body. **No
  underwriter disclosure, policy term, exclusion or claims-process string exists in this file**,
  and none has been reconstructed. Widely circulated underwriter names were deliberately not
  written in. This is the single largest gap.
- **Chewy Vet Care was not harvested.** Only chrome and footer rendered — no hero, no service
  list, no booking copy, no clinic-locator strings.
- **No formal order-status enumeration was found.** Chewy's order states exist but are not
  publicly documented on any renderable surface. T6 is thin for this reason.
- **`Chewy+` is recorded from image alt text only.** No membership page was harvested, and the
  legacy FAQ still says there is no membership fee. Both layers are live; neither is treated as
  settled.
- A third-party grief support line is reportedly referenced in Chewy editorial content. **It
  was not found on either grief article rendered in full**, and no number has been written into
  this file.
- Inline validation copy, 404 body copy and payment-decline copy are all `[absent]` — behind
  JS or auth.
- **Chewy's condolence practice is unwritten by design** and is recorded as an absence, not
  reconstructed from press coverage.
- Ten live inconsistencies were identified across Chewy's own surfaces and are recorded
  individually above rather than reconciled. Any Chewy string used as precedent should be
  checked against the layer it came from.
- Canada storefront, mobile app copy, and authenticated surfaces are unharvested.

## Sources

1. https://www.chewy.com/
2. https://www.chewy.com/b/autoship-save-15682
3. https://www.chewy.com/b/pharmacy-15697
4. https://www.chewy.com/b/learn-about-compounding-169822
5. https://www.chewy.com/b/connect-vet-16616
6. https://www.chewy.com/g/give-back
7. https://www.chewy.com/education/forever-loved
8. https://www.chewy.com/education/dog/general/how-to-cope-with-the-loss-of-a-pet
9. https://www.chewy.com/education/cat/general/what-to-say-when-someone-loses-a-pet
10. https://www.chewy.com/b/pet-memorials-15474
11. https://www.chewy.com/app/content/accessibility-information
12. https://cms.chewy.com/cms/help/customer/faq.html (legacy layer)
13. https://www.chewy.com/customer-care (SPA — `Loading...` only)
14. https://www.chewy.com/customer-care/prescriptions-and-veterinary-diets (SPA shell)
15. https://www.chewy.com/app/content/return-policy → /customer-care/returns/making-a-return/start-a-return (metadata only)
16. https://www.chewy.com/app/content/returns-policy (empty)
17. https://www.chewy.com/app/content/shipping-policy (empty)
18. https://cms.chewy.com/cms/help/customer/return.html (empty)
19. https://cms.chewy.com/cms/help/customer/shipping.html (empty)
20. https://www.chewy.com/pet-insurance/ and /pet-insurance/cat (empty bodies)
21. https://www.chewy.com/vet-care (chrome and footer only)
