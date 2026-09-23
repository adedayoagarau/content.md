# 060. Lemonade

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Insurtech — renters / homeowners / car / pet / term life, AI-first quoting and claims |
| Primary URL | https://www.lemonade.com/ |
| Corpus rank | 060 |
| Benchmark strength (source list) | Conversational quotes and claims |
| Locale / market observed | en-US. Switcher exposes DE (de/en), NL (nl/en), FR (fr/en), UK — none harvested |
| Platform observed | Web (desktop marketing site), FAQ, claims, Giveback, accessibility |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Licensed insurer and licensed agency, with a multi-carrier underwriting stack.** P&C underwritten by **Lemonade Insurance Company (LIC)** and **Metromile Insurance Company (MIC)**; home policies in 29 named states underwritten instead by member companies of **Homesite Group, Inc.** (Homesite Insurance Company of the Midwest, Homesite Insurance Company, Homesite Indemnity Company, Homesite Insurance Company of Florida); Texas car policies by **Home State County Mutual Insurance Company**; term life by **Banner Life Insurance Company** (49 states + DC, **not New York**), with Lemonade acting as agent via **Lemonade Life Insurance Agency, LLC**. Agencies **LIA** and **MIS** are compensated on premium. State-by-state availability and coverage variation disclosed on every page. Financial Stability Rating® of **A-Exceptional** cited. Corporate: **Public Benefit Corporation**, certified **B Corp**, **NYSE: LMND**. Telematics has its own terms of service. Accessibility conformance stated to **WCAG 2.2 Level AA** with reference to the **European Accessibility Act**. |
| Harvest date | 2026-09-21 |
| Pages inspected | 5 |
| Harvest completeness | Partial — the FAQ (161 questions across 7 product sections, answers present) was fully captured, as were claims, Giveback, and accessibility. The **onboarding chat itself — the "conversational quote" that is half the flagged benchmark strength — is at `/onboarding/start` and was deliberately not entered**, since it collects personal details. Conversational copy is therefore `[documented]` via FAQ answers rather than observed. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.lemonade.com/ | Hero, five product cards with prices, social proof, `How Lemonade Works` pizza diagram, trust block, full carrier disclosure |
| Claims | https://www.lemonade.com/claims | Three stats, five-step claims sequence, claims reviews, incentive-alignment argument |
| FAQ | https://www.lemonade.com/faq | **161 questions in 7 sections with sub-groups; answers present.** The richest single source in this file |
| Giveback | https://www.lemonade.com/giveback | Giveback mechanism, B Corp framing, five impact stats, Neighborhood Fund |
| Accessibility | https://www.lemonade.com/accessibility | WCAG 2.2 AA statement with a per-journey accessibility commitment |

---

## T1 Navigation & IA labels

**Global nav is five product nouns and one concept** `[observed]`

`Renters` · `Homeowners` · `Car` · `Pet` · `Life` · `Giveback` · `My Account`

Six items, five of which are single words naming the insured thing. No "Insurance" suffix, no "Products", no "Coverage". `Renters` rather than "Renters insurance" — the category is assumed and the noun does the work.

**`Giveback` sits in the primary nav beside the products.** A charitable mechanism given equal navigational weight to the revenue lines. That placement is the strongest possible statement that Giveback is positioned as a product feature rather than as corporate social responsibility, and it is consistent with the claims argument (see T7 and T10).

`My Account` rather than `Log in` — the noun of the destination, not the verb of the action.

**Footer is organised by product, then by function** `[observed]`

Seven groups: `renters` · `car` · `pet` · `homeowners` · `life` · `resources` · `features` · `company`. Rendered in lowercase.

Each product group follows an **identical six-to-seven-item template**, which is the notable IA decision:

| Slot | Renters | Homeowners | Pet |
|---|---|---|---|
| 1. Product page | `Renters Insurance` | `Homeowners Insurance` | `Pet Insurance` |
| 2. Hub | `Renters Insurance Hub` | `Home Insurance Hub` | `Pet Insurance Hub` |
| 3. Definition | `What is Renters Insurance` | `What is Homeowners Insurance` | — |
| 4. Coverage | `Renters Insurance Coverage` | `Homeowners Insurance Coverage` | `Pet Insurance Coverage` |
| 5. Cost | `Renters Insurance Cost` | `Homeowners Insurance Cost` | `Pet Insurance Cost` |
| 6. How-to / sizing | `How to Get Renters Insurance` | `How Much Home Insurance Do I Need` | `Compare Pet Insurance` |
| 7. Bundle | `Car and Renters Bundle` | `Car and Home Bundle` | — |

**The template is `[product]` → `[hub]` → `what is it` → `what does it cover` → `what does it cost` → `how much / how do I get it` → `bundle`.** That sequence is a complete novice journey rendered as an SEO footer, and it is repeated for five products. The slot-3 and slot-6 labels are written as **unpunctuated questions** (`What is Renters Insurance`, `How Much Home Insurance Do I Need`), which is a deliberate search-query shape.

`features` group: `Claims` · `Giveback` · `Policy 2.0` · `API` · `Vet Clinics`. **Claims is a feature**, listed first, alongside an API. Naming the loss event as a product feature is the whole positioning in one IA decision.

`resources`: `Blog` · `FAQ` · `Where We're Live` · `Insurance Dictionary` · `Sitemap`.

**`Where We're Live`** is the availability page, named in the **first-person plural present continuous** — a sentence fragment as a nav label. Compare "Availability" or "States we serve". And **`Insurance Dictionary`** links to `/insuropedia/` — the URL carries a coined brand name the label does not (see T13).

`company`: `Join the Team` · `Partners Program` · `Investor Relations` · **`Transparency`** · `Reviews`. `Transparency` as a named company page, in the footer of an insurer, alongside Investor Relations.

**FAQ page IA — two-level, seven sections, sub-grouped** `[observed]`

Sections: `General` · `Homeowners Insurance` · `Renters Insurance` · `Car Insurance` · `Pet Health Insurance` · `Life Insurance` · `Giveback`

Each product section is sub-grouped with a near-consistent template:

| Section | Sub-groups (in order) |
|---|---|
| Homeowners | `Policy` · `Coverage` · `Extra Coverage` · `Payments` · `Availability` · `Switching to Lemonade` · `Claims` |
| Renters | `Policy` · `Coverage` · `Extra Coverage` · `Payments` · `Availability` · `Switching` · `Landlords` · `Claims` |
| Car | `Policy` · `Coverage` · `Payments` · `Availability` · `Claims` · `Environmentalism` |
| Pet | `Policy` · `Coverage` · `Policy Add-ons` · `Payments` · `Availability` · `Claims` |
| Life | `Policy` · `Coverage` · `Trust` · `Availability` · `Switching` |

**`Claims` is the last sub-group in every section that has one.** The IA puts the loss event at the end of the product journey — after policy, coverage, payments and availability — which is chronologically correct and commercially conventional. Given that claims is Lemonade's flagged strength, its terminal position is worth noting.

**Three sub-group names are section-specific and reveal the product's real edge cases**: `Landlords` (Renters only — the "can I add my landlord as an interested party" problem), `Trust` (Life only — a section that exists solely to answer `Will you be around in 40 years?`), and `Environmentalism` (Car only).

**`Trust` as a named FAQ sub-group containing one question** is the standout IA decision on the page. Term life asks a customer to believe a nine-year-old company will pay out in four decades, and Lemonade gives that anxiety its own heading rather than burying it in `Policy`.

**Sidebar/body mismatch, recorded** `[observed]`: the sidebar nav does not match the in-body headings. Sidebar `General` expands to `About us` · `Getting Lemonade` · `Lemonade Product` · `Reinsurance` · `Availability` · `Financial rating` · `Contacting us` · `Confidentiality` · `What's a B Corp?` — nine labels for a section whose body has no sub-headings at all. Sidebar Pet shows `Accident and Illness` and `Preventive and Wellness`; the body shows `Policy Add-ons`. Sidebar Renters omits `Landlords`, which exists in the body. **Two taxonomies for one page.**

The sidebar Giveback labels are the best-written in the set: `Giveback` · `Donation period` · `Causes` · `Changing causes` · `Suggesting causes` · `Cancellations` — six nouns covering the full lifecycle including the exit.

## T2 Value proposition & headline patterns

**Hero — a command to forget the category** `[observed]`

> Headline: `Forget everything you know about insurance`
> Subhead: `Instant everything. Incredible prices. Big heart.`
> CTA: `Check our Prices`

The headline is an imperative addressed to the user's *existing knowledge*, not to a need. It presupposes that what the user knows about insurance is bad, and it does not say what to replace it with — the subhead does that in three two-word fragments.

**`Instant everything. Incredible prices. Big heart.`** is a three-beat rhythm covering speed, price, and ethics. `Big heart` is doing the Giveback work in two words. Note the escalating register: `Instant` (mechanical) → `Incredible` (evaluative) → `Big heart` (affective).

**Product cards pair a noun with a plain-English scope line and a from-price** `[observed]`

| Product | Scope line (verbatim) | Price |
|---|---|---|
| `Renters` | "Coverage for your stuff, in and out of your home" | `From $5/mo` |
| `Homeowners` | "Protection for your home and stuff" | `From $25/mo` |
| `Car` | "Protect your car, passengers, and the planet" | `as low as $30/mo` |
| `Pet` | "Health insurance for furry family members" | `From $10/mo` |
| `Term Life` | "Protecting the people you love" | `From $8/mo` |

**`your stuff`** is the key lexical choice — repeated twice, in place of "personal property", "contents", or "belongings". Renters insurance is a category most renters do not think they need, and `stuff` is the word they would use.

`in and out of your home` in five words pre-empts the single biggest misconception about renters cover (that it stops at the front door). `furry family members` does the same job for pet. `Protecting the people you love` is the only scope line that names no object at all.

**Price format inconsistency, recorded** `[observed]`: four products say `From $X/mo`, car says `as low as $30/mo`. Five products, two price formulas, lowercase on the outlier.

**Section heads are declaratives or user questions** `[observed]`:

`Incredible Prices. Pay Monthly. Bundle Discounts.` · `Amazing savings when you bundle` · `The (Almost) 5 Star Insurance Company` · `Instant everything` · `Already insured? We'll help you switch!` · `How Lemonade Works`

**`The (Almost) 5 Star Insurance Company`** is the best headline in this file and one of the best in the corpus. A parenthetical self-deprecation inside a superlative claim, which simultaneously makes the boast and proves the honesty. The supporting line delivers the actual number: "Lemonade has earned 4.9 stars in the App store, and is also top-rated by Supermoney, Clearsurance, and others."

**Claiming 4.9 and calling it "almost 5" is a claim-bounding device made of punctuation.** Compare Wise's footnote-based bounding. Lemonade puts the qualifier *inside* the headline where it cannot be skipped, and converts a compliance necessity into a joke. Directly transferable to any near-superlative claim.

**Claims page hero** `[observed]`:
> `The Secret Behind Lemonade's Claims`
> "Claims are handled by our AI and devoted team. File a claim quickly and hassle-free with the Lemonade app."

`The Secret Behind…` is a curiosity headline on a claims page, and the "secret" turns out to be the fee structure (see T10). The subhead names **both** actors — AI and humans — in the first clause, before any speed claim.

**Giveback headline is a question used as a section head** `[observed]`: `What is the Lemonade Giveback?` — the FAQ question promoted to a page heading.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Check our Prices` | Homepage hero | **First-person plural possessive** — "our prices", not "your quote" |
| `check prices` | Product cards (×5) | Lowercase |
| `check our prices` | Product cards, second instance (×5) | **Lowercase variant of the hero CTA, on the same page** |
| `Check prices and switch` | Switching block | Compound action |
| `Check Our Prices` | Claims page foot | **Title-cased variant** — third casing of the same string |
| `Get insured and giveback` | Giveback page foot | **`giveback` as a verb, one word** |
| `Start` | Neighborhood Fund nomination | Single word, routes off-site to a form |
| `'File a Claim' button` | Quoted in 4 FAQ answers | `[documented]` in-app CTA — see T7 |
| `"Ask Us Anything"` | Quoted in FAQ | `[documented]` in-app support entry |
| `My Account` | Global nav | |
| `Skip to main content` | Top of DOM, all pages | Accessibility |
| `Manage Cookies` | Footer | |
| `Do not share my personal information` | Footer | CCPA control, full sentence |
| `Learn more` | Homepage bundle block | Bare |
| `Ready to try it out? Click here` | Quoted in FAQ | `[documented]` — weak deixis |
| `need help now, click here` | Quoted in FAQ | `[documented]` — weak deixis |

**Observation — `Check our Prices` is an unusual and good primary CTA.** Not "Get a quote", not "Get started", not "See your price". `Check our Prices` puts the burden on Lemonade's pricing to withstand inspection, and it implies a browse rather than a commitment — which matters when the next screen is a chatbot that will ask for personal details. It also quietly signals that the user is not yet in an application.

**Casing is inconsistent across three instances of the same string**: `Check our Prices` (hero) / `check our prices` (cards) / `Check Our Prices` (claims page). Recorded.

**`Get insured and giveback`** treats the brand noun as a verb and closes the Giveback page by fusing the commercial and charitable actions into one imperative. Grammatically it should be two words; as a brand device it is deliberate.

## T4 Onboarding & getting-started

**The conversational quote flow is the product's signature and it was not entered.** `/onboarding/start` collects personal details and starting it would breach the harvest constraints. What follows is `[documented]` from FAQ answers and marketing claims.

**The speed claims, as the onboarding promise** `[observed]`, homepage:
> `Instant everything` — "We use AI to craft the perfect policy for you, and to pay out claims. It couldn't be easier or faster"
> Signup: `As little as 90 seconds`
> Claim: `3 seconds to get paid`

Two numbers, rendered as a before-and-after pair with directional arrows between them. **`As little as`** bounds the first; the second is unbounded in the graphic but bounded on the claims page as `3sec` / `Our fastest recorded claim` — see T6.

**The bot has a name, and it is surfaced only in the FAQ** `[documented]`:
> `Maya will guide you through the steps…`

**`Maya`** appears in the answer to the address-change question, not on any marketing page, not on the claims page, and not in the nav. A named conversational agent that the marketing surface never introduces. For a product whose benchmark strength is "conversational quotes", the persona is effectively undocumented publicly.

**The only step-by-step in-product sequence on the public site** `[documented]`, from `I'm moving to a new place. How do I change the address on the policy?`:
1. `Tap the menu icon in the top left corner`
2. Open `"Ask Us Anything"`
3. Say `"I'm moving to a new place"`
4. `Maya will guide you through the steps…`

**The user is instructed to type a natural-language phrase.** `"I'm moving to a new place"` is given as the literal input — a documented intent string. This is the clearest evidence in the harvest of how the conversational interface actually works: the help content teaches the user the *utterance*, not the menu path. That is a genuinely distinctive help-content pattern for a conversational product, and it is transferable to any chat-first flow.

**App download is mandatory, and stated as such** `[documented]`, from `How do I get Lemonade insurance?`:
> "Customers are **required to download the app** in order to manage their policy, get help from our team, and file claims."

An unusually direct statement of a hard product constraint, given in the FAQ rather than discovered after purchase. It also explains why so little of this product's UI is in the public web surface.

**`How Lemonade Works` — the pizza diagram** `[observed]`, homepage. Three slices:
1. `A flat fee to run everything`
2. `We pay claims super fast`
3. `Good luck and good behavior let us give back to causes`

Then the narrative, summarised: Lemonade is built on the idea that insurance should take care of people when they need it most and do some good along the way; when you get your first policy you choose a cause; Lemonade donates to nonprofits supporting those causes; good luck and responsible behaviour can lead to fewer losses and larger Giveback donations; and "Knowing that outcomes matter helps align us around **honesty and fairness, especially at claims time**."

Asterisked immediately: "Subject to board discretion and the company meeting certain financial standards. **This section does not apply to Life insurance.**"

**A three-part business-model explainer rendered as a pizza, with the qualification attached to the diagram.** The pizza metaphor makes the flat-fee structure legible without a percentage: a fixed slice is taken, the rest pays claims, leftovers go to causes. The disclaimer that Life is excluded is in the same visual block.

## T5 Form & field labels

Almost entirely `[absent]` — the quote flow was not entered and all policy management is in-app.

`[documented]` strings only:

| String | Source | Type |
|---|---|---|
| `"Ask Us Anything"` | FAQ | In-app support entry point |
| `"I'm moving to a new place"` | FAQ | **A documented natural-language input** |
| `'File a Claim'` | FAQ ×4 | In-app button |
| `Tap the menu icon in the top left corner` | FAQ | Navigation instruction |
| `tap your policy, and look for the option to add an interested party` | FAQ | Navigation instruction |
| `interested party` | FAQ | The field name for a landlord on a renters policy |
| `primary beneficiary` / `contingent beneficiary` | FAQ (Life) | Field names |

**`interested party`** is the insurance term of art for a landlord who must be notified of the policy, and Lemonade uses it as the in-app field name while the FAQ question that routes to it is written in plain language: `Can I add my landlord as an interested party?` — **the question contains both registers**, so the user searching "landlord" finds the article and learns the field name in the same title.

No validation, error, placeholder, or hint text was recoverable. Full form inventory `[absent]`.

## T6 Status & state language

Insurance has three distinct state domains here — **claim state, coverage state, and policy state** — and Lemonade names them very unevenly.

### Claim states — described in prose, not named

**This is the central finding of the section.** Lemonade ships **no explicit claim status labels** on any public surface. There is no "Submitted", "In review", "Approved", "Paid", "Denied". Claim progression is described entirely as narrative `[observed]`:

| Described state | Verbatim phrasing | Source |
|---|---|---|
| Instant approval | "If your claim is **instantly approved**, our AI will pay it in seconds" | Claims page |
| Handover to humans | "Otherwise, our AI **hands over your claim** to our devoted team of **humans** to handle ASAP" | Claims page |
| Paid | "Once your claim is approved, we'll issue payment" | FAQ |
| Fast-path | "paid **almost instantly**" | FAQ |
| Full review | "we'll need to **fully review the incident** to approve the claim" | FAQ |
| Manual assessment | "our team will need extra time to **manually assess the incident**" | FAQ |
| Further review | "will most likely **get in touch with you for further review**" | FAQ |
| Extended settlement | "may take longer to **settle**" | FAQ |
| External dependency (car) | "we'll need to wait for **external reviews and appraisals** before we can approve a claim" | FAQ |
| Reimbursement (pet) | "Our pet health insurance is on a **reimbursement basis**, so we will reimburse you for our part of approved claims" | FAQ |

**The AI/human handover is the only state transition Lemonade names explicitly**, and it names it as an *action by the AI* ("our AI hands over your claim") rather than as a status the claim enters. That is a deliberate agency choice: the system is described as doing something, not as the claim being in a condition.

`~40% of claims handled instantly` (claims page stat) is the honest complement — **60% of claims go to humans**, and Lemonade publishes the ratio rather than leaving "instant" to imply universality.

**The absence of named claim states is a real gap for a product whose benchmark strength is claims.** A user mid-claim has no vocabulary to describe where they are, and no public page tells them what the app will show. Recorded as `[absent]` for the state labels themselves.

### Coverage states — well named, with clocks

`[documented]`, from the Pet section, and this is the strongest state writing in the file:

> `When does my coverage kick in?` — waiting periods of **`2 days for accidents`**, **`14 days for illnesses`**, **`30 days for orthopedic conditions`**, **`6 months for cruciate ligament events`**. And: **"Routine vet care coverage is not subject to any waiting period."**

Four different waiting periods, each attached to a named condition class, plus the zero case stated explicitly. Then the consequence, verbatim: **"We can only offer reimbursement for your claim after the applicable waiting period ends."**

**Stating the zero-waiting-period case explicitly** (`not subject to any waiting period`) is the move worth copying — a user reading four durations will otherwise assume a fifth.

Other coverage states `[documented]`:
- `Extra Coverage only kicks in after your items have been submitted and approved by our team` — a two-condition gate
- `All changes are subject to our underwriting team's approval.` — pending-underwriting state, named
- `30-day free look period` (Life) — the cooling-off state

**`kick in`** is used twice as the coverage-commencement verb, in place of "commences", "attaches", or "becomes effective". Colloquial, unambiguous, and consistent.

### Policy states

`[documented]`: `active policies` (Giveback eligibility), `cancel`, `switch`, and the dunning ladder (see T7). `Lemonade only pays a Giveback with respect to **active policies**` ties a state to an entitlement.

### Timing language inventory

`[observed]` / `[documented]`

| Phrase | Domain |
|---|---|
| `As little as 90 seconds` | Signup |
| `3 seconds to get paid` / `3sec` | Claim payout |
| `Our fastest recorded claim` | **The bound on the above** |
| `~40% of claims handled instantly` | Claim routing |
| `almost instantly` | Claim payout, typical |
| `ASAP` | Human handover |
| `2 days` / `14 days` / `30 days` / `6 months` | Pet waiting periods |
| `30-day free look period` | Life cooling-off |
| `12 months prior to your policy period's start date` | Pet medical-history window |
| `24/7` | Emergency response |
| `less than a week` | A testimonial, not a claim |
| `Since 2017` | Giveback tenure |

**`3sec` labelled `Our fastest recorded claim`** is the model claim-bounding on this site. The number is extraordinary and would be misleading unbounded; the label converts it from a promise into a record. Compare the homepage's `3 seconds to get paid`, which carries **no such label** — the same figure, bounded on one page and unbounded on another. Recorded as an inconsistency, and as the reason the claims page is the better-written of the two.

## T7 Error, failure & recovery

Strong in places, and the strength is concentrated in **exclusions** rather than in error states.

### The claims entry point

`[documented]`, identical answer given four times (Homeowners, Renters, Car, Pet):
> `How do I file a claim?` — "Just open the Lemonade app and hit the **'File a Claim'** button. We will guide you through the rest of the short process there."

`hit the button` (not "tap", not "select"), `the rest of the short process` (bounding the effort), and `We will guide you` (the company as the actor). Fourteen words of reassurance around a one-step instruction.

**The same answer verbatim across four product sections** is worth noting as a deliberate consistency choice rather than a duplication error — the claims entry point does not vary by product, and the copy does not pretend it does.

### The video statement — a friction justified

`[observed]`, given its own FAQ in all four P&C sections:
> `Why does Lemonade ask me to record a video during the claims process?`

Answer summarised: it lets you describe the incident in your own words; it only takes a minute; and — verbatim — **"We'll use your video solely for the process of handling or reviewing your claim."** Plus `It only takes a minute to shoot the video.`

**A FAQ that exists solely to explain an unusual and slightly uncomfortable requirement.** It gives a user-benefit rationale ("in your own words"), bounds the effort ("a minute"), and bounds the data use ("solely for…"). It does not mention fraud detection, which the claims page separately names ("Our AI runs dozens of anti-fraud algorithms") — so the two explanations of the video's purpose live on different surfaces and do not reference each other. Recorded.

### Emergency handling — the best failure copy on the site

`[observed]`, `What's considered a claim emergency?`

Definition, verbatim: **"We define an emergency as an event that requires immediate assistance or temporary housing as a result of fire, ongoing water damage, or any other structural damage that leaves your home exposed."**

Then, summarised: the response team will call you to assess the situation; services named include `water or fire damage cleanup` and `temporary housing`; a `designated specialist` is assigned. Closing: **`We have your back, 24/7.`**

Three things. **The definition leads with the user's need** (immediate assistance or temporary housing) and only then lists the causes — the reverse of how a policy document would order it. **`leaves your home exposed`** is a plain-language catch-all doing the work of a much longer clause. And **`our response team will call you`** — the company initiates contact, stated as a promise, which is the single most important thing to tell someone whose house is on fire.

Emergency phone number `(844) 733-8666` is published in the answer.

### Missed premium payment — the dunning copy

`[observed]`, `What if I miss a premium payment?` (Homeowners, Car, Pet). Summarised: if the card is declined you'll be asked for another; then escalating contact; then cancellation. Verbatim:

> **"We'll keep bugging you to settle your tab, but eventually, we'll have to cancel your policy. We'll warn you first."**

**This is the most distinctive tonal choice in the file and it is worth dissecting.** `keep bugging you` is self-deprecating about the company's own dunning. `settle your tab` is bar vocabulary applied to an insurance premium. `we'll have to` frames cancellation as reluctant obligation. And `We'll warn you first.` is a four-word promise that does the actual reassurance work.

The register is very light for a consequence — loss of insurance coverage — that is severe. Against the BNPL comparisons in this batch (058, 059), which are uniformly flat in fee and arrears copy, Lemonade is the outlier: **its tone does *not* flatten as stakes rise.** Recorded as a genuine finding rather than a criticism; `We'll warn you first.` is good, and `settle your tab` is a choice a regulated insurer made deliberately.

Note that renters has **no** `What if I miss a premium payment?` question — the dunning copy exists for three of four P&C products.

### Declination — Life

`[observed]`, the bluntest copy on the site, and it is one sentence:
> `I was declined. Why?` — "Sadly, not everyone can be approved for a term life policy - whether that's due to your health background or lifestyle factors."

**The question is written in the first person, past tense, as a statement plus a bare "Why?"** — the Wise confession pattern, applied to a rejection the user did not cause. The answer opens with `Sadly`, gives the two reason categories, and **offers no appeal, no alternative product, and no next step.**

That is the gap. The question is excellently framed and the answer is a dead end. For a declined applicant there is no routing to a different product, no explanation of how to find out which factor applied, and no reconsideration path. Recorded as the clearest recovery-copy failure in this file.

### Extra Coverage rejection — the reassurance done right

`[observed]`, `What happens if Lemonade does not approve my item?` (Homeowners and Renters)

Summarised: the team reviews each item to determine eligibility for Extra Coverage; if the item is not approved it is either already covered under the base policy or needs specialist coverage. Then, verbatim: **"In any case, your base policy will not be affected."**

**The closing sentence is the pattern.** A user rejected for an add-on will immediately fear that the rejection has consequences for what they already hold. Lemonade answers the unasked question in eight words. Any product with an approval-gated upgrade should ship this sentence.

### Exclusions — where Lemonade's failure writing is genuinely strong

`[observed]`, and the register is unusual.

**The framing device, used in both Homeowners and Renters:**
> **"Unfortunately, insurance doesn't cover e-v-e-r-y annoying thing that can happen."**

Hyphenating `e-v-e-r-y` for emphasis in an exclusions answer is a tonal choice most insurers would not make. It concedes the limitation cheerfully and pre-empts the "so what's the point" reaction.

**The routing device, repeated across sections:**
> `These breeds can be found in the 'not covered' section of your policy.`

**`the 'not covered' section of your policy`** — Lemonade names a section of the policy document in quotes, in plain language. The user is told *where in the contract* to look, using the section's colloquial name. That is a small but excellent piece of document-navigation copy.

**Specific exclusions stated plainly** `[observed]`:
- `We also don't cover personal property that gets mistakenly lost or broken.`
- `your policy doesn't cover loss or breakage if you drop it!` — with an exclamation mark
- `(FYI, your base policy does not cover stuff that gets lost.)` — parenthesised, inside the Extra Coverage pitch
- `Keep in mind, a stolen pet is not covered under any of our policies.`
- Life: `Term life doesn't cover death from suicide in the first 2 years of your policy.`
- Life: `if any inaccurate or false information was provided when signing up for life insurance, we can't cover the claim.`
- Roommates: `Unfortunately not.` (Renters) / `No, you can't share a pet health insurance policy with your roommate.` (Pet)

**Car exclusions are given as a plain list** `[observed]`: `a car or driver that should've been listed on your policy and wasn't` · `damage from racing` · `something that's the result of nuclear waste` · `Wear and tear` · `Accidents that happen when actively using your car for ridesharing` · `Freezing` · `Damage done intentionally` · `Damage to any custom parts to the car over $1k`

The first item is the useful one — it names a **user omission** as an exclusion (`should've been listed… and wasn't`), which is a foreseeable and correctable failure. `nuclear waste` is standard policy boilerplate surfaced without rewriting, sitting incongruously between wear and tear and ridesharing.

**Pet exclusions** `[observed]`: `pre-existing conditions, dental care, elective surgeries not related to an accident/illness, or anything that happens as a result of your neglect`. Plus: **`We made some cheat sheets of what's not covered`** — exclusions packaged as a `cheat sheet`, which reframes a defensive document as a user aid.

**The suicide exclusion is stated in one plain sentence with a duration.** Most life insurers bury the contestability and suicide clauses. Lemonade gives it a sentence in a FAQ.

### Dispute and appeal

`[absent]` — no public content found on disputing a claim decision, appealing a denial, or complaint escalation. For a product whose claims process is the flagged strength, **the absence of any appeal route is a significant gap.** The only adjacent content is the Life declination dead-end above.

## T8 Empty states

`[absent]` — all in-app. No search surface on the FAQ, so no no-results string was reachable.

## T9 Notifications & system messages

Thin. `[documented]` in promise form only.

- **Dunning sequence** — "We'll keep bugging you to settle your tab" and **`We'll warn you first.`** (see T7). The warning-before-cancellation is the only notification promise on the site
- **Emergency callback** — `our response team will call you to assess the situation`. An inbound-to-outbound switch, promised
- **Claims outcome** — "we'll issue payment" / "will most likely get in touch with you for further review". Contact is promised for the slow path
- `We have your back, 24/7.` — availability as a notification-adjacent promise

No toast, banner, email, or push copy was recoverable. `[absent]`

## T10 Disclosures, legal & compliance

Two very different disclosure registers coexist: a **conversational business-model explainer** on the marketing surface, and a **dense multi-carrier legal footer** on every page.

### The incentive-alignment argument — the central disclosure

This is Lemonade's signature compliance-adjacent move, and it appears in three escalating forms.

**On the claims page** `[observed]`:
> "Unlike any other insurance company, we take a **flat fee** from your premium, use the rest to pay claims, and **give back** what's left to causes you care about. **We gain nothing by delaying or denying claims**, so we handle them quickly and fairly"

**In the FAQ** `[documented]`, `How is Lemonade's business model different from that of a traditional insurance carrier?` — summarised: traditional insurers profit from claims they do not pay, which creates a conflict; Lemonade takes a fixed percentage and routes leftover funds to nonprofits instead. Key phrase: **`we're not incentivized to deny claims`** and `a flat fee from all premiums`.

**On the homepage**, as the pizza diagram (see T4).

**The structure is: name the industry's conflict of interest → state your different structure → draw the conclusion for the user.** It is the same three-move shape as a good conflict disclosure (see Betterment, 057), but run in reverse — Lemonade uses the *absence* of a conflict as the selling proposition.

**And it is bounded, twice:**
- `* Subject to board discretion and the company meeting certain financial standards. This section does not apply to Life insurance.` (homepage, attached to the pizza)
- `Note: The Lemonade Giveback program doesn't apply to the life insurance product.` (FAQ)
- `Note: Giveback doesn't apply to life insurance.` (FAQ, second instance — **two phrasings of one carve-out**)

**Giveback is not guaranteed, and Lemonade says so in a one-word answer** `[observed]`:
> `Is the Giveback guaranteed?` — **"No."**

Then, summarised: in some years customers' claims **depleted the Giveback pool**; **"Paying claims is our top priority, and in extreme circumstances could come at the expense of Giveback."**

**A one-word "No." opening the answer to a question about the company's flagship ethical feature.** Followed by a priority statement that puts claims above donations. This is the most honest single exchange in the file, and the priority ordering (`Paying claims is our top priority`) is also the correct regulatory answer.

Two further Giveback bounds `[observed]`:
- `Lemonade only pays a Giveback with respect to active policies.`
- `canceling your policy will eliminate any potential Giveback associated with your policy.`

The cancellation consequence is given its own FAQ (`What happens to my Giveback if I cancel my policy?`) under the sidebar heading `Cancellations` — a charitable entitlement with a stated forfeiture condition.

### Giveback substantiation

`[observed]`, Giveback page. Summarised: since 2017 Lemonade has donated **over $12M**; Lemonade is a **Public Benefit Corporation and a certified B Corp**, "legally committed to making a positive social impact", assessed comprehensively **every three years**; funds not needed for claims are directed to nonprofits customers support; it is **"ongoing support, not a single annual donation."**

Five impact statistics, each with a category heading, a number, and a unit of outcome:

| Heading | Figure | Outcome |
|---|---|---|
| `Support Families In Need` | `769,220 meals` | "delivered to high-need communities." |
| `Rescue Animals` | `128,568 animals` | "received life-saving care." |
| `Uplift Communities` | `91,997 veterans` | "supported with PTSD training." |
| `Protect The Planet` | `44,866 people` | "given safe drinking water for life." |
| `Emergency Response` | `167,910 people` | "received life-saving medical care." |

**Every figure is given to the unit** (`769,220`, not "over 750,000") and **every one is paired with a verb phrase naming what was actually done.** No figure is presented as a dollar amount except the aggregate. The specificity is the credibility device.

**Nonprofit vetting is disclosed** `[documented]`: selection criteria include `transparency, financial practices, and high ratings from Charity Navigator`. Naming the external rating body rather than asserting internal diligence.

### The carrier stack — the densest disclosure in the file

`[observed]`, in the footer of every page. Summarised, with the structure preserved:

P&C is provided by **Lemonade Insurance Company (LIC)** and **Metromile Insurance Company (MIC)**. Home policies in **29 named states** (Alabama through Wyoming, listed individually) are instead underwritten by **member companies of Homesite Group, Inc.**, with four Homesite entities named. Home features, prices, coverages and discounts "may vary by state and are subject to qualifications"; coverage is "subject to policy terms and conditions and may not be available in all states."

**Lemonade Insurance Agency, LLC (LIA)** and **Metromile Insurance Services LLC (MIS)** are licensed agents appointed by LIC and MIC, and **"both LIA and MIS receive compensation based on the premiums for the insurance policies each sells."**

**Lemonade Life Insurance Agency, LLC (LLIA)** acts as agent of **Banner Life**, whose products are underwritten and issued by **Banner Life Insurance Company, Urbana, MD**, distributed in 49 states and DC, and **"not authorized as an insurer and does not do business in New York."** Policy forms cited (`ICC21-DTCV`, `RiseTerm Form #ICC24-DTCV3 & ICC23-DT1-SCH`) with state variations; six underwriting classes named; and — verbatim — **"Policy descriptions provided here are not a statement of contract."**

Texas car policies are underwritten by **Home State County Mutual Insurance Company**.

**Three observations.**

**The agency-compensation disclosure is stated plainly**: LIA and MIS are paid on premium. A user is told that the entity selling them the policy is remunerated by its size.

**"Policy descriptions provided here are not a statement of contract"** is the sentence that governs the entire marketing site. Every plain-language coverage description on every product page is disclaimed against the policy forms by this one line. It is the honest and necessary counterweight to `your stuff` and `furry family members`.

**The state-by-state and carrier-by-carrier variation is total.** A user in one of the 29 named states buying home insurance is not buying a Lemonade-underwritten policy at all. The brand experience is uniform; the risk carrier is not. That gap between brand and carrier is disclosed only in the footer.

### Product-level disclosures

`[observed]` / `[documented]`

- **Financial strength**: `Financial Stability Rating® of A-Exceptional` (FAQ, `Are you financially rated?`), and homepage `A-Rated and Backed by Giants` — "Lemonade is A-rated, fully regulated and reinsured by the most trusted names on the planet." Note `fully regulated` as an unqualified claim, and the reinsurers unnamed
- **Public-company status**: `NYSE:LMND` — "Lemonade is a publicly traded company, listed on the New York Stock Exchange under the LMND stock symbol"
- **B Corp**: `Designed for Social Impact` — "Lemonade Inc. is a Public Benefit Corporation and certified B-Corp. Social impact is part of our **legal mission and business model - not just marketing fluff**"
- **Life cooling-off**: `30-day free look period`
- **Pet claim basis**: `reimbursement basis` — stated as a mechanism, not buried
- **Credit and pricing**: `If I report a loss or have bad credit, will my premium be affected?` and `Will my credit score be affected by applying for a policy?` — **both questions appear in four product sections**, so credit anxiety is answered per product rather than once
- **Telematics**: a separate `Telematics Terms of Service` in the footer, distinct from the main ToS
- **CCPA**: `Do not share my personal information` as a footer control, written as a full imperative sentence

**`not just marketing fluff`** inside a corporate-status disclosure is the tone bleeding into the compliance layer — the only instance of it doing so.

### Footer legal inventory

`[observed]`: `Terms of Service` · `Telematics Terms of Service` · **`Legal Stuff`** · **`Privacy Pledge`** · `Accessibility` · `Manage Cookies` · `Do not share my personal information`

**`Legal Stuff`** and **`Privacy Pledge`** are the two renamed artefacts. `Legal Stuff` is a deliberately casual label for the legal hub. `Privacy Pledge` replaces "Privacy Policy" with a commitment noun — reframing a compliance document as a promise. Both are brand-voice decisions applied to compliance furniture, and `Privacy Pledge` in particular is worth noting as a pattern: **rename the document to describe what it is for, not what it is.**

## T11 Help-centre architecture

**Lemonade has no help centre.** `[absent]` There is no `support.lemonade.com`, no article-based knowledge base, and no `Help` link in nav or footer.

The public self-service surface is **the FAQ page alone**, supplemented by an `Insurance Dictionary` (`/insuropedia/`) and product "explained" hubs in the footer. Everything else routes into the app.

**The routing model** `[observed]`, from `How can I reach you?`: existing and former policyholders are routed to a self-serve link; otherwise the app or website. Phone `(844) 733-8666` is published. A network of `emergency response and repair partners` is referenced.

**The architecture is therefore: FAQ (public, 161 questions) → app chat (`"Ask Us Anything"`, authenticated) → phone (emergency).** With the app download **mandatory** for policy management and claims, the public FAQ is doing the entire job of a help centre for anyone not yet a customer, and doing very little for anyone who is.

**The product "explained" hubs** (`/renters/explained/`, `/car/explained/`, etc.) are the SEO knowledge layer and follow the footer template noted in T1 — `What is X`, `X Coverage`, `X Cost`, `How much X do I need`. Not opened in this harvest.

`Insuropedia` as the URL for `Insurance Dictionary` is the coined term (see T13).

## T12 FAQs

**The FAQ is the single richest artefact in this file: 161 questions across 7 sections, with answers present in the DOM.** Questions are reproduced verbatim below; answers are summarised in T6, T7, T10 and T13.

Page H1: `Lemonade Insurance FAQs`

### General (11)

1. How is Lemonade's business model different from that of a traditional insurance carrier?
2. How are you using my premium dollars?
3. How is Lemonade structured?
4. How do I get Lemonade insurance?
5. What kind of policies does Lemonade offer?
6. Is Lemonade reinsured?
7. When can I expect Lemonade to be available in my state?
8. Are you financially rated?
9. How can I reach you?
10. How do you keep my information private?
11. What does being a public benefit corporation and B-Corp mean?

*(The section opens with a non-question heading, `About Lemonade`.)*

**The first three questions are all about the business model**, before anything about buying or covering. Q1 and Q2 ask the same thing from two angles — *how is your model different* and *what do you do with my money* — which is the trust question asked twice. Q6 (`Is Lemonade reinsured?`) is a technical solvency question given a consumer FAQ slot.

### Homeowners Insurance (39)

**Policy** — 1. How do you calculate the cost of a Lemonade Homeowners policy? · 2. How can I lower my homeowners policy price? · 3. I'm buying a new home, how do I change the address on my Lemonade policy? · 4. If I report a loss or have bad credit, will my premium be affected? · 5. Will my credit score be affected by applying for a policy? · 6. What if the closing date of my new home changes? · 7. How do I cancel my Lemonade Homeowners policy? · 8. Great prices? I got a quote that's higher than my old insurer, what gives?

**Coverage** — 9. What does a Lemonade Homeowners policy cover? · 10. Can I increase or decrease Lemonade Homeowners coverages? · 11. Is my spouse covered under my Lemonade Homeowners policy? · 12. Is my significant other covered under my Lemonade Homeowners policy? · 13. What kinds of things am I covered for with my home insurance policy? · 14. Am I covered if something I own gets stolen outside of my home or apartment? · 15. What kinds of things are not covered under a Lemonade policy? · 16. Is my laptop covered? · 17. If my dog bites someone, am I covered? · 18. Is my self-storage locker covered under a renters or homeowners policy? · 19. Do you offer earthquake coverage? · 20. What is a hurricane deductible? · 21. What is liability protection?

**Extra Coverage** — 22. How do I add Extra Coverage for my expensive items? · 23. Why should I get Extra Coverage for my personal property? · 24. When can I add Extra Coverage? · 25. What kind of items can I add? · 26. What happens if Lemonade does not approve my item?

**Payments** — 27. How do I pay for my Lemonade insurance? · 28. What if I miss a premium payment?

**Availability** — 29. Where is Lemonade Homeowners insurance available? · 30. Where is Lemonade condo insurance available?

**Switching to Lemonade** — 31. Can I switch to Lemonade if I already have an active homeowners insurance policy? · 32. Can I sign up over the phone?

**Claims** — 33. How do I file a claim? · 34. How will I get paid for a claim? · 35. How fast will a claim be paid? · 36. Why does Lemonade ask me to record a video during the claims process? · 37. What's considered a claim emergency? · 38. What documentation do you need from me? Do I need to take an inventory? · 39. How do you calculate the value of my personal property during a claim?

### Renters Insurance (35)

**Policy** — 1. How do you calculate the cost of a Lemonade Renters policy? · 2. How can I lower my renters policy price? · 3. I'm moving to a new place. How do I change the address on the policy? · 4. If I report a loss or have bad credit, will my premium be affected? · 5. How do I cancel my Lemonade Renters policy? · 6. Great prices? I got a quote that's higher than my old insurer, what gives?

**Coverage** — 7. What does a Lemonade Renters insurance policy cover? · 8. Are roommates covered under Lemonade Renters policies ? *(verbatim — note the space before the question mark)* · 9. Is my spouse covered? · 10. Is my significant other covered under my Lemonade Renters policy? · 11. What specific kinds of things am I covered for with a Lemonade Renters policy? · 12. Am I covered if something I own gets stolen outside of my home or apartment? · 13. What kinds of things are not covered under a Lemonade renters policy? · 14. Is my laptop covered? · 15. If my dog bites someone, am I covered? · 16. Do you offer earthquake coverage? · 17. How can I increase or decrease Lemonade Renters policy coverages? · 18. Is my self-storage locker covered under a renters policy? · 19. What is liability protection?

**Extra Coverage** — 20–24 *(identical to Homeowners 22–26)*

**Payments** — 25. How do I pay for my Lemonade Renters policy?

**Availability** — 26. Where is Lemonade Renters insurance available?

**Switching** — 27. Can I switch to Lemonade if I already have a renters policy elsewhere?

**Landlords** — 28. Can I add my landlord as an interested party?

**Claims** — 29–35 *(identical to Homeowners 33–39, minus the personal-property valuation variant wording)*

### Car Insurance (27)

**Policy** — 1. How do you calculate the cost of a Lemonade Car policy? · 2. How can I lower my car insurance policy price? · 3. I'm buying a new car, how do I get it insured? · 4. How does Telematics know if I'm driving… and what if it's wrong? · 5. How do you track my FSD miles? · 6. Can I get Lemonade Autonomous Car insurance? · 7. If I report a loss or have bad credit, will my premium be affected? · 8. Will my credit score be affected by applying for a policy? · 9. How do I cancel my Lemonade Car policy? · 10. Great prices? I got a quote that's higher than my old insurer, what gives?

**Coverage** — 11. What does a Lemonade Car policy cover? · 12. Can I increase or decrease Lemonade Car coverages? · 13. Who is covered under my Lemonade Car policy? · 14. Does my significant other need their own Lemonade Car policy? · 15. What kinds of things am I covered for with my car insurance policy? · 16. What kinds of things are not covered under a Lemonade Car policy? · 17. What is liability protection?

**Payments** — 18. How do I pay for Lemonade? · 19. What if I miss a premium payment?

**Availability** — 20. Where is Lemonade Car insurance available?

**Claims** — 21. How do I file a claim? · 22. How will I get paid for a claim? · 23. How fast will a claim be paid? · 24. Why does Lemonade ask me to record a video during the claims process? · 25. How do you calculate the value of my car during a claim? · 26. Are claims handled differently if I'm using FSD?

**Environmentalism** — 27. How is Lemonade Car working to reduce damage to the environment?

### Pet Health Insurance (32)

**Policy** — 1. How do I know what my policy covers? · 2. How do you calculate my premium? · 3. Does Lemonade require my pet's medical history? · 4. Can I go to any vet? · 5. What if I want to cancel my policy? · 6. Can I sign up over the phone? · 7. Great prices? I got a quote that's higher than my old insurer, what gives? · 8. How do I change my address for my Lemonade policy? · 9. If I report a loss or have bad credit, will my premium be affected?

**Coverage** — 10. Can I change my coverage after purchase? · 11. When does my coverage kick in? · 12. What is a deductible? · 13. What is co-insurance? · 14. Is my roommate covered? · 15. Can my significant other use this policy? · 16. What kinds of bad things am I covered for with pet health insurance? · 17. What kinds of things are not covered under a Lemonade policy? · 18. Can I extend coverage on my pet health insurance policy? · 19. Why should I add preventative care or add-ons to my pet health insurance policy? · 20. If my dog bites someone, am I covered?

**Policy Add-ons** — 21. What are the optional add-ons for a pet health insurance policy? · 22. What's included in Lemonade's preventative pet health plans?

**Payments** — 23. How do I pay for Lemonade? · 24. How do claim payments work? · 25. What if I miss a premium payment?

**Availability** — 26. Where is Lemonade pet health insurance available?

**Claims** — 27. How do I file a claim? · 28. How will I get paid for a claim? · 29. How fast will a claim be paid? · 30. What's considered a claim emergency? · 31. Will my credit score be affected by applying for a policy? · 32. What documentation do you need from me?

*(Note Q31 — a credit question misfiled under Claims.)*

### Life Insurance (20)

**Policy** — 1. How does term life insurance work at Lemonade? · 2. Who can apply for coverage? · 3. I was declined. Why? · 4. What kind of life insurance does Lemonade offer? · 5. Is a medical exam required? · 6. What happens when the policy term ends? · 7. Can I cancel at any time? · 8. How much does life insurance cost at Lemonade? · 9. Will my price change over the years? · 10. Is my information kept confidential? · 11. What about beneficiaries? · 12. Can I change my policy?

**Coverage** — 13. Who should I list as my beneficiary if something happens to me? · 14. What kinds of things are not covered under a term life policy? · 15. What's the difference between term life and whole life insurance? · 16. Where can I find more coverage details?

**Trust** — 17. Will you be around in 40 years?

**Availability** — 18. Where is Lemonade's term life offering available?

**Switching** — 19. Can I switch to Lemonade if I already have an active life insurance policy? · 20. I have term life insurance through work. Is that enough?

### Giveback (7)

1. What is the Lemonade Giveback?
2. When do you pay the Giveback?
3. How do you choose which nonprofits to give back to?
4. How often can I change causes?
5. How can I add my cause to your Giveback program?
6. Is the Giveback guaranteed?
7. What happens to my Giveback if I cancel my policy?

---

### Structural analysis

**161 questions, with heavy deliberate duplication.** `How do I file a claim?` appears four times. `Great prices? I got a quote that's higher than my old insurer, what gives?` appears four times. `If I report a loss or have bad credit, will my premium be affected?` appears four times. `What is liability protection?` three times. `If my dog bites someone, am I covered?` three times.

**The duplication is a design decision, not an error.** A user arrives in one product section and must not have to leave it. Lemonade repeats the universal questions inside every product rather than building a shared "general" section and cross-linking. The cost is 161 entries where perhaps 100 would do; the benefit is that no product section is incomplete.

**`Great prices? I got a quote that's higher than my old insurer, what gives?`** is the most remarkable question in this corpus. It is:
- **A self-directed objection** — it quotes Lemonade's own marketing claim (`Great prices?`) back at the company with a question mark
- **Written in the user's colloquial register** — `what gives?`
- **Placed in the `Policy` sub-group of four separate product sections**, so it cannot be missed
- **An admission that the headline claim does not hold universally**

A company publishing the sentence "your marketing says great prices and my quote went up" as an FAQ question, four times, is doing something most brands' legal and marketing functions would jointly prevent. It is the single most copyable item in this file: **write the FAQ question in the form of the complaint the user would actually make, including the part where they throw your own claim back at you.**

**`Will you be around in 40 years?`** is its equal. Six words, first person implied, existential, and given its own sub-group (`Trust`). Term life's real barrier is not price or coverage — it is institutional longevity — and Lemonade names it.

**Other standout question constructions:**
- `I was declined. Why?` — confession plus a bare interrogative
- `How does Telematics know if I'm driving… and what if it's wrong?` — **a compound question with an ellipsis**, pairing the mechanism with its failure mode in one line. The same "expectation plus exception" shape Wise uses
- `What kinds of bad things am I covered for with pet health insurance?` — **`bad things`** instead of "perils" or "covered events"
- `I have term life insurance through work. Is that enough?` — a statement of the user's actual situation, then the real question
- `What about beneficiaries?` — a fragment, the way someone would actually interrupt
- `Is my laptop covered?` — the single most-asked renters question, given its own entry rather than folded into "what's covered"
- `Do I need to take an inventory?` — appended to the documentation question, pre-empting the dreaded task

**Ordering within sections is consistent**: cost → how to lower it → life-change admin → credit → cancel → the price objection. **`How do I cancel…?` is placed in the `Policy` sub-group, near the top, in every P&C section.** Cancellation is not hidden.

## T13 Terminology & glossary

| Term | Lemonade's usage | The alternative it rejected |
|---|---|---|
| `your stuff` | Personal property, in product scope lines | "contents", "personal property", "belongings" |
| `furry family members` | Pets | "your pet" |
| `bad things` | Covered perils, in a FAQ question | "perils", "covered events", "losses" |
| `Giveback` | The charitable mechanism, capitalised, nav-level | "donation programme", "charitable giving" |
| `giveback` (verb) | `Get insured and giveback` | — |
| `Giveback pool` | The residual fund | "surplus" |
| `Extra Coverage` | Scheduled personal property | **"scheduled items", "floater", "rider"** |
| `Policy 2.0` | The open-source policy document | "policy wording" |
| `Insuropedia` | The glossary (URL); labelled `Insurance Dictionary` | "glossary" |
| `Maya` | The conversational agent | "chatbot", "assistant" |
| `"Ask Us Anything"` | The in-app support entry | "Help", "Contact us" |
| `'File a Claim'` | The claims CTA | "Report a loss", "Start a claim" |
| `interested party` | Landlord on a renters policy | — *(term of art, retained)* |
| `the 'not covered' section of your policy` | A named policy section | "exclusions" |
| `cheat sheets` | Exclusion summaries | "exclusions summary" |
| `kick in` | Coverage commencement | "attaches", "becomes effective" |
| `Makers` | Lemonade employees | "employees", "team" |
| `Privacy Pledge` | The privacy policy | "Privacy Policy" |
| `Legal Stuff` | The legal hub | "Legal", "Terms" |
| `Where We're Live` | Availability page | "Availability", "Coverage map" |
| `Neighborhood Fund` | Customer/employee-nominated grants | "community fund" |
| `contribution` | **Pet's word for the deductible portion** | `deductible` — used for Home and Car |
| `co-insurance` | Pet cost-share, glossed in its own FAQ | |
| `Loss of Use` · `Dwelling Coverage` · `Other Structures` · `Personal Property` · `Coverage C` | Standard ISO coverage names, retained | |
| `hurricane deductible` | Retained, with its own FAQ | |
| `30-day free look period` | Life cooling-off | |
| `primary beneficiary` / `contingent beneficiary` | Retained, with a dedicated footer page | |
| `FSD` | Full Self-Driving (Tesla) | |
| `Financial Stability Rating®` | The rating, with the ® | |

**`Extra Coverage` is the best renaming on this site.** The industry terms — *scheduled personal property*, *floater*, *rider*, *endorsement* — are all opaque. `Extra Coverage` is two common words, it is unambiguous about what it does, and it scales (`How do I add Extra Coverage for my expensive items?`). It also survives translation into a question a user would type.

**But the register is not consistent.** Lemonade retains `Coverage C`, `Loss of Use`, `Other Structures`, `hurricane deductible`, `co-insurance`, `contingent beneficiary` and `interested party` unchanged. The pattern appears to be: **rename the things the user buys; retain the things the policy document names.** That is a defensible rule, and it means the plain-language layer is a marketing and FAQ layer sitting on an unmodified contractual vocabulary — which is exactly what `Policy descriptions provided here are not a statement of contract` discloses.

**`contribution` vs `deductible` is a genuine inconsistency.** The claim-payment answers read `minus the amount of your deductible` for Home and Car, `minus the amount of the deductible on your renters policy` for Renters, and **`minus the amount of your contribution`** for Pet. Three phrasings, and the Pet one uses a different noun for the same concept — while the Pet section separately runs a FAQ titled `What is a deductible?`. A user reading both will not know whether contribution and deductible are the same thing.

**Pet plan naming is actively contradictory** `[observed]`. The current answer names `Routine Vet Care`, `Routine Vet Care Plus`, and `Life Essentials`. Elsewhere on the same page the older names `Preventative`, `Preventative+`, `Preventative and Wellness package`, and `Extended Accident and Illness package` are still in use. The sidebar adds `Accident and Illness` and `Preventive and Wellness` — note `Preventive` there and `Preventative` in the body. **A renaming that has been applied to one answer and not to the page around it**, with a spelling variant on top. Recorded as the clearest content-ops debt in this file.

**`Makers`** is the internal employee term that leaks into public copy — "Globally, our **Makers** are involved in diverse impact initiatives" — the same phenomenon as Wise's `Wisers`.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, and the company is a continuously visible actor in both good and bad news: "We'll keep bugging you", "We will guide you", "our response team will call you", "we can't cover the claim", "we'll have to cancel your policy". Present and future tense dominate.

**Register — and the striking thing is that it does not flatten.** Across the FIN batch, the pattern has been colloquialism in marketing and flatness in disclosure (Wise, Acorns, Klarna, Afterpay). Lemonade breaks it. The exclusions copy contains `e-v-e-r-y annoying thing`; the dunning copy contains `settle your tab`; the corporate-status disclosure contains `not just marketing fluff`; the exclusion routing contains `cheat sheets`; and the coverage answer uses `kick in`.

**Lemonade applies one voice to everything**, and only the carrier footer escapes it. Whether that is admirable consistency or misjudged register depends on the reader; as a finding it is unambiguous and it is the opposite of the exemplar's "tone flattens as stakes rise".

**Punctuation and typographic devices are used as tone carriers** `[observed]`:
- `e-v-e-r-y` — hyphenation for emphasis
- `The (Almost) 5 Star Insurance Company` — parenthetical self-correction inside a claim
- `How does Telematics know if I'm driving… and what if it's wrong?` — ellipsis as a beat
- `(FYI, your base policy does not cover stuff that gets lost.)` — parenthetical aside
- `your policy doesn't cover loss or breakage if you drop it!` — exclamation mark on an exclusion
- `*Remember:*`-style emphasis and bolded mini-headings inside answers (`Better coverage`, `No deductible`)

**Exclamation marks appear in exclusion copy**, which is unusual. They also appear in `Already insured? We'll help you switch!`

**Social proof is tweets, verbatim, including profanity** `[observed]`. Nine embedded posts on the homepage, unedited, one containing `holy shit I love your app`. Attribution is handle plus display name. **No representativeness disclaimer of any kind** — compare Acorns (056), which discloses payment amounts and names the bias mechanism, and Betterment (057), which at least states "Views may not be representative." Lemonade publishes nine unqualified endorsements. Recorded as the weakest endorsement disclosure in this batch.

The claims page adds six more reviews, including `Wow. Just filed a claim with @Lemonade_Inc and got paid in literally 7 seconds` — a **speed claim made by a third party**, sitting on the same page as the bounded `3sec / Our fastest recorded claim` stat. The testimonial performs the unbounded version of the claim Lemonade itself bounds.

**Numbers as trust devices** `[observed]`: `4.9 stars`, `3sec`, `+4.9 claims rating`, `~40% of claims handled instantly`, `over $12M` donated, `769,220 meals`, `128,568 animals`, `91,997 veterans`, `44,866 people`, `167,910 people`, `Since 2017`. The impact figures are given to the unit; the ratings are given to one decimal; `~40%` carries a tilde.

**`~40% of claims handled instantly` is the honest one** — publishing the proportion that is *not* instant, beside a `3sec` headline.

### Accessibility content

**The strongest accessibility statement in the FIN batch** `[observed]`, at `/accessibility`, linked from every footer.

Opening: `Our Commitment to Accessibility` — "We're committed to making insurance a breeze, for everyone. Rebuilding insurance as a social good means our services and website are designed to be usable by everyone—**including people with disabilities, learning differences, and other limitations.**"

**Naming `learning differences` alongside disabilities** is broader than the legal minimum and is reflected in the commitments below.

`What do we mean by accessibility?` — "Creating easy-to-understand and use insurance services." **Comprehension is named as an accessibility concern**, not just perceivability. For an insurer, that is the right framing.

`How do we make our services accessible?` — **"We follow recognized standards like the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA"**, then six named commitments:

| Commitment | Substance |
|---|---|
| `Clear, simple information` | "We use straightforward language and explain legal or complex terms." |
| `Multiple ways to connect` | "Manage your policy or get support by website, app, phone, or email—your choice." |
| `Digital accessibility` | Works with screen readers; text size and colour adjustable; "Information is tagged for voiceover tech with readable fonts." |
| `Accessible media` | Descriptions, subtitles or transcripts "where possible", and "you'll never find **flashing or fast-changing visuals** on Lemonade interfaces." |
| `More than just color` | "Our services never depend on seeing color in order to use them." |
| `Easy online management` | Arranging insurance, making changes, or filing claims online designed to be simple and accessible |

`How do we keep improving?` — regular platform review, feedback from customers including those with disabilities, tracking of legal changes "especially those outlined in the **European Accessibility Act (EAA)**", work with regulators, and accessibility checks and surveys.

**`Accessibility at every step`** — the standout section, and the pattern worth stealing. Four journey stages, each with the available channels:

- `Browsing and signing up:` Explore coverages and sign up via web or app
- `Managing your insurance:` Update details or ask questions via web, app, phone, or email
- `Making a claim:` File a claim through the Lemonade app, via phone, or through digital assistance from our support team
- `Cancelling your policy:` Cancel online, via phone, or email, and **receive confirmation in your preferred format**

**An accessibility statement organised by user journey rather than by WCAG principle**, with the channel alternatives named per stage — including cancellation, and including format choice for the confirmation. This is a materially better structure than a conformance table, because it answers the question a disabled user actually has: *can I do the thing I need to do, and how.*

Feedback route: phone `(844) 733-8666` and email, under `Need help or spot an accessibility issue?`

**Tension worth recording.** `Making a claim:` lists app, phone, or digital assistance — but the FAQ states that **"Customers are required to download the app in order to manage their policy, get help from our team, and file claims."** The accessibility statement offers a phone route to claims that the FAQ appears to foreclose. Two Lemonade-published sources disagree about whether the app is mandatory.

**Observed accessibility implementation** `[observed]`:
- `Skip to main content` present and first in DOM on every page inspected
- `meta google: notranslate` set site-wide — **this suppresses browser translation**, which is an accessibility and comprehension barrier for non-English readers, on a site that offers only English in the US market
- Alt text on the one instructional GIF is functional: `Lemonade app, car insurance id card`
- Social icons alt-labelled by platform (`facebook`, `X`, `instagram`, `linkedin`, `youtube`, `tiktok`) — **glyph-naming rather than destination-naming**; compare Betterment's `Betterment on Instagram`
- Locale-switcher images carry alt that is **duplicated into the visible link text** — e.g. `Select your language - Germany (Deutsch)Germany (Deutsch)` — so screen-reader users hear each locale name twice
- Decorative hero illustrations (house, cat, car, guy) carry empty alt where present; several impact and how-it-works SVGs carry the section heading as alt (`Support Families In Need`, `Rescue Animals`), duplicating the adjacent visible heading
- `arrow image` as alt on a directional graphic — glyph-naming
- Footer product columns are **duplicated in the DOM** (desktop/mobile variants), so the ~40-link product footer may be traversed twice. Flagged as suspected, not confirmed
- The FAQ renders questions and group headings **at the same heading level**, so the question/section distinction is not conveyed structurally — only by content. On a 161-item page, this is a significant navigation problem for heading-based screen-reader traversal
- No ARIA labels, roles, `aria-expanded`, or accordion state strings were found in the FAQ source; no focus-visible or screen-reader-only text; no "was this helpful" control; no breadcrumbs

**Other negative findings:**
- Three casings of the primary CTA: `Check our Prices` / `check our prices` / `Check Our Prices`
- `From $X/mo` ×4 vs `as low as $30/mo` ×1
- `3 seconds to get paid` (homepage, unbounded) vs `3sec / Our fastest recorded claim` (claims page, bounded)
- `contribution` (Pet) vs `deductible` (Home, Car, Renters) for the same concept, on a page that also asks `What is a deductible?`
- `Preventative` vs `Preventive` in body and sidebar; `Routine Vet Care` / `Life Essentials` vs `Preventative+` / `Extended Accident and Illness package` — a half-completed renaming
- `Note: Giveback doesn't apply to life insurance.` vs `Note: The Lemonade Giveback program doesn't apply to the life insurance product.` — two phrasings of one carve-out
- FAQ sidebar taxonomy does not match body headings (`Landlords` missing; `Accident and Illness` / `Preventive and Wellness` vs `Policy Add-ons`; nine sidebar labels for a `General` section with no body sub-headings)
- `Are roommates covered under Lemonade Renters policies ?` — space before the question mark, live
- `Commitment To We Accessibility | Lemonade` — **the accessibility page's `og:title` reads "To We" where the `<title>` reads "To Web"**. A typo in the social-share title of the accessibility page
- Pet FAQ Q31 (`Will my credit score be affected by applying for a policy?`) is filed under `Claims`
- Nine testimonials with no representativeness disclaimer
- Email addresses obfuscated by Cloudflare across all pages, so published contact addresses for Giveback, claims and accessibility are not recoverable from source

---

## Transferable patterns

1. **Put the qualifier inside the headline where it cannot be skipped.** `The (Almost) 5 Star Insurance Company` bounds a 4.9-star claim with a parenthesis and turns compliance into charm. Compare footnote-based bounding: same honesty, better read-rate.
2. **Write the FAQ question as the complaint, including the part that quotes your own marketing back.** `Great prices? I got a quote that's higher than my old insurer, what gives?` — placed in four product sections. Naming the gap between the promise and the individual outcome, in the user's register, is the highest-trust move available to a marketing surface.
3. **Give the real anxiety its own section heading.** `Trust` as a FAQ sub-group containing one question — `Will you be around in 40 years?` For long-dated or high-commitment products, the institutional-longevity question deserves structural prominence, not a paragraph in "About us".
4. **Answer the unasked consequence question.** `In any case, your base policy will not be affected.` after an add-on rejection. Any approval-gated upgrade needs this sentence.
5. **Exclusions as concrete micro-examples with a named policy section.** `These breeds can be found in the 'not covered' section of your policy.` — tell the user *where in the contract* to look, using the section's colloquial name. Pair with example-driven exclusions (`if you drop it`, `stolen pet`, `should've been listed and wasn't`).
6. **State the zero case explicitly when you list durations.** Four pet waiting periods followed by `Routine vet care coverage is not subject to any waiting period.` A user reading four numbers will otherwise infer a fifth.
7. **Publish the proportion that is not instant.** `~40% of claims handled instantly` beside a `3sec` headline. Publishing the ratio converts a best-case number into a credible one, and `Our fastest recorded claim` as a stat label is the reusable bounding device.
8. **Answer a flagship-feature guarantee question with "No."** `Is the Giveback guaranteed?` → `No.` → and then the priority order (`Paying claims is our top priority`). A one-word negative buys more credibility than three paragraphs of qualification.
9. **Organise the accessibility statement by user journey, with channel alternatives per stage.** `Browsing and signing up` / `Managing your insurance` / `Making a claim` / `Cancelling your policy` — including cancellation, and including `receive confirmation in your preferred format`. Better than a conformance table because it answers what the user can actually do. **Condition:** the channels listed must be real — Lemonade's own FAQ contradicts the phone-claims route.
10. **Rename what the user buys; retain what the contract names.** `Extra Coverage` replaces *scheduled personal property*; `Coverage C` and `Loss of Use` stay. Then disclose the gap: `Policy descriptions provided here are not a statement of contract.`
11. **Teach the utterance, not the menu path.** For a conversational interface, help content that says *say "I'm moving to a new place"* is more useful than a click-path. Directly applicable to any chat-first or agent-mediated flow.
12. **Negative benchmark — a well-framed question with a dead-end answer.** `I was declined. Why?` is perfectly constructed and its answer offers no appeal, no alternative, and no next step. A rejection FAQ that does not route the user somewhere is worse than no FAQ, because it confirms the dead end.
13. **Negative benchmark — no named claim states.** For a product whose differentiator is claims, there is no public vocabulary for where a claim *is*. "Instantly approved", "handed over to humans", "further review" are prose descriptions, not statuses. A user mid-claim cannot say what state they are in, and cannot search for it.
14. **Negative benchmark — nine unqualified endorsements.** Embedded tweets with no representativeness disclaimer, on a regulated insurance page, including a third-party speed claim (`paid in literally 7 seconds`) that is more aggressive than the bounded claim the company makes itself.

## Caveats & gaps

- **The conversational quote flow was deliberately not entered.** `/onboarding/start` collects personal details, so the chat UI — half the flagged benchmark strength — is `[absent]`. Everything recorded about the conversational register is `[documented]` from FAQ answers: `Maya`, `"Ask Us Anything"`, and the single documented utterance `"I'm moving to a new place"`. **The quote-flow question wording, the bot's turn-taking, its error handling, its confirmations, and its disclosure placement are all unharvested**, and they are the most valuable missing content in this file.
- **No named claim states were recoverable.** Claim progression is described in prose only. Status labels, progress indicators, and the in-app claim timeline are behind auth and behind the mandatory app download.
- **No appeal or dispute route was found.** Nothing public on challenging a claim decision, escalating a complaint, or state insurance-department routing. For a claims-benchmark product this is a material absence.
- **The app is mandatory and therefore most of this product's UI is out of scope.** The FAQ states customers are required to download the app to manage a policy, get help, or file claims — so T5, T6, T8 and T9 are structurally thin and honestly marked.
- **Only five pages inspected.** Unharvested: all five product pages (`/renters`, `/homeowners`, `/car`, `/pet`, `/life`), the ~35 "explained" hub articles listed in the footer, `/insuropedia/` (the glossary — likely the richest terminology source on the site), `/policy-two` (Policy 2.0, an open-source policy document and probably the most interesting plain-language-contract artefact Lemonade publishes), `/transparency`, `/reviews`, `/legal-stuff`, `/terms-of-service`, `/privacy-policy`, and `/lemonade-goes-global`.
- **Four non-US markets are exposed in the switcher and none were harvested.** DE, NL, FR and UK each operate under different insurance regimes; the UK page in particular would carry FCA-regulated wording. No claim in this file should be treated as applying outside en-US.
- **Two Lemonade-published sources contradict each other on whether claims can be filed by phone** (accessibility statement says yes; FAQ says the app is required). Not resolved here.
- **Pet plan naming is mid-migration** and the page contains both old and new names plus a spelling variant. Any pet product name from this file should be re-verified.
- **Prices (`From $5/mo` etc.), stats, and the Giveback total are point-in-time** and explicitly vary by state and qualification. The carrier footer discloses that home policies in 29 states are underwritten by Homesite rather than Lemonade, so even coverage descriptions are not uniform across the brand.
- **Email addresses are Cloudflare-obfuscated throughout**, so the published contact addresses for Giveback, claims, and accessibility feedback are not recoverable from source.
- The FAQ's 161 questions were captured in full with answers present; answers are summarised throughout per the quotation rules, with short verbatim strings quoted where they are load-bearing.

## Sources

1. https://www.lemonade.com/
2. https://www.lemonade.com/claims
3. https://www.lemonade.com/faq
4. https://www.lemonade.com/giveback
5. https://www.lemonade.com/accessibility
