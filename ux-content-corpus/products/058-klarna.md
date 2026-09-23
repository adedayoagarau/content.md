# 058. Klarna

> **SUPPLEMENT — 2026-09-23.** `klarna.com/us/payments/pay-in-4/` was unrenderable at
> first harvest and its terms were flagged not-to-be-used-as-precedent. The page has since
> been captured in full through the rendering browser. See
> `_schema/BROWSER-SUPPLEMENTS.md` → *058-klarna.md — Pay in 4 page*. **That flag is lifted.**
> The recovered material supersedes the reconstructed Pay in 4 terms below.


| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | BNPL (pay-in-4 and financing) — extending into card issuing, deposit-taking, cashback, shopping search, and mobile |
| Primary URL | https://www.klarna.com/ |
| Corpus rank | 058 |
| Benchmark strength (source list) | Payment schedules and status |
| Locale / market observed | **en-US primary; en-GB secondary.** Both harvested. Klarna serves 34 market/locale combinations from one switcher |
| Platform observed | Web (desktop marketing site), customer-service hub, policy pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Dual, and materially different by market.** **US:** Klarna Inc., **NMLS #1353190**; monthly financing and one-time-card instalments **issued by WebBank**; balance-account deposits held at **WebBank, Member FDIC** with explicit "Klarna is not an FDIC-insured bank"; California Financing Law licence for CA-resident loans; a mandated **Vermont loan-solicitation notice** in all-caps in every US footer. **UK:** Klarna Financial Services UK Limited, **authorised and regulated by the FCA** — FRN **987889** (regulated consumer credit) and FRN **1021834** (payment services / e-money under the Electronic Money Regulations 2011). Critically, the UK footer states that **Pay in 3, Pay in 30 days, and interest-free/up-to-12-month financing agreements are *not* regulated by the FCA** — the firm is regulated, several of its flagship products are not. Third-party credit bureau used for US checks. Protection plans via Cover Genius / XCover. |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 reachable (of 15 attempted) |
| Harvest completeness | **Partial — significant blocks.** `klarna.com` root, `/us/payments/pay-in-4/`, `/uk/pay-in-3`, `/uk/pay-later/`, `/uk/what-is-klarna/`, and `/us/help/` all returned empty bodies (client-rendered, no server HTML). **The dedicated Pay in 4 page — the single most relevant surface in this corpus to PayPal Pay in 4 — was not retrievable.** Pay in 4 terms were reconstructed from the payments-hub card, the Pay over time FAQ, and footnotes. UK content is correspondingly thin: the UK homepage and customer-service page rendered, the UK product pages did not. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Klarna US home | https://www.klarna.com/us/ | Hero, nav tree, five-pillar benefit block, offering grid, Trustpilot block, 10 numbered footnotes |
| Klarna UK home | https://www.klarna.com/uk/ | **Thin render** — hero and three payment-option cards only |
| Payment methods hub | https://www.klarna.com/us/payments/ | Four payment options, **live payment calculator**, purchase power, 8-question FAQ with answers |
| Pay over time | https://www.klarna.com/us/payments/pay-over-time/ | Financing terms, 3-step how-it-works, 4-question FAQ — **contains the US late-fee disclosure** |
| Pay in 30 days | https://www.klarna.com/us/payments/pay-in-30-days/ | 3-step how-it-works, 5-question FAQ, soft-credit-check disclosure |
| What is Klarna | https://www.klarna.com/us/what-is-klarna/ | Serves identical content to `/us/payments/` with a fuller footnote set |
| Customer service (US) | https://www.klarna.com/us/customer-service/ | AI-first support model, three channels |
| Customer service (UK) | https://www.klarna.com/uk/customer-service/ | Same page, UK-localised, **carries the FCA regulatory statement** |
| Buyer Protection Policy | https://www.klarna.com/us/buyer-protection/ | Claim types, eligibility, exclusions, 4-step claim process — richest dispute-copy source |
| Complaints | https://www.klarna.com/us/complaints/ | Two-question page, 20-business-day commitment |
| Security | https://www.klarna.com/us/security/ | Fraud/scam guidance, 9-question security FAQ |
| Accessibility | https://www.klarna.com/us/accessibility/ | Public accessibility statement |
| *Attempted, returned empty* | `klarna.com`, `/us/payments/pay-in-4/`, `/uk/pay-in-3`, `/uk/pay-later/`, `/uk/what-is-klarna/`, `/us/help/` | Recorded as blocked in Caveats |

---

## T1 Navigation & IA labels

**The nav is no longer a BNPL nav — it is a bank's nav** `[observed]`

Top-level: `Discover Klarna` · `Shop` · `App` · `Help` · `Show more`, with an audience toggle above (`For shoppers` / `For business`).

Inside `Discover Klarna`, four named groups:

| Group | Items |
|---|---|
| `Payment options` | `All payment options` · `Pay in 4` · `Pay over time` · `Pay in 30 days` · `Pay in full` · `OnePay Later at Walmart` · `Apple Pay` · `Google Pay` |
| `Shopping and rewards` | `Store directory` · `Cashback` · `Memberships` |
| `Banking` | `All cards` · `Debit card` · `Credit card` · `Balance` · `Savings account` |
| `Mobile` | `Klarna Mobile` |
| `Resources` | `Articles` · `What is Klarna` |

**The payment-option labels are the central artefact of this file.** All four are `Pay + [structure]`:

`Pay in 4` · `Pay over time` · `Pay in 30 days` · `Pay in full`

Three name a **count or a duration**; one names a **degree** (`in full`). Every label is a complete instruction in three or four words, requires no financial vocabulary, and can be read aloud at a checkout without a gloss. There is no `Klarna Credit`, no `Instalment Plan`, no `Financing` in the consumer nav — `Pay over time` is the consumer-facing name for what the footnotes call `Monthly financing through Klarna issued by WebBank`.

That substitution is the most transferable naming decision here: **the regulated instrument name lives in the footnote, the temporal structure lives in the label.** A user choosing `Pay over time` is choosing a duration, not a credit product, and Klarna only introduces the word "financing" once the APR range is on screen beside it.

Note the ordering. `Pay in 4` is first in the nav but the hub page orders the cards `Pay in 4` → `Pay over time` → `Pay in full today` → `Pay in 30 days`, while the Pay-over-time page's cross-sell block orders them `Pay in 4` → `Pay in 30 days` → `Pay in full today`. **Three different orderings of four options across three surfaces** — inconsistent, and in a regulated set the ordering is itself a form of prominence.

**Footer IA — three columns, and the first one is the company** `[observed]`

| Column | Items |
|---|---|
| `Klarna` | `About us` · `Careers` · `Legal` · `Press` · `Security` · `Privacy` · `Sustainability` · `Auto-Track` · `Accessibility` · `Wikipink` · `Contact` · `Contact for authorities` |
| `Customer` | `Help` · `Log in` · `Shopping app` · `Store Directory` · `Buyer Protection Policy` · `Complaints` · `Your US regional privacy notice` · `Advertising Disclosure` |
| `Business` | `Merchant support` · `Business log in` · `Sell with Klarna` · `Developers portal` · `Operational status` · `Platforms and partners` |

Three footer entries deserve flagging. **`Complaints` as a first-class footer link** — a named route for dissatisfaction, alongside `Help` rather than buried inside it. **`Contact for authorities`** — a separate contact channel for regulators and law enforcement, publicly signposted. And **`Wikipink`** — Klarna's public data-transparency site, given a footer slot next to `Accessibility`.

`Buyer Protection Policy` sits in the `Customer` column, not under Legal. A policy document treated as a customer service.

`Advertising Disclosure` as a footer item is a US-specific artefact reflecting Klarna's shopping-comparison business — it discloses that Klarna may earn commission on the products it surfaces in search.

## T2 Value proposition & headline patterns

**The US hero has abandoned BNPL framing entirely** `[observed]`

> Headline: `Your money treated right`
> Subhead: "Discover a smarter way to pay, save, and stay on top of your money. All in one place with Klarna."
> CTA: `Get the app`

Four words, no product, no number, no instalment. The verb triple (`pay, save, and stay on top of`) puts paying first but saving second — this is a neobank hero. Compare the **UK** hero, which is still recognisably BNPL `[observed]`:

> `Shop now. / Pay later.`
> `Use Klarna at your favourite stores.`
> Framing line: `You shop. So you choose how to pay.`

Two markets, two entirely different value propositions from the same brand in the same session. The UK is selling deferred payment; the US is selling a money app. For a content designer this is the clearest available evidence that **BNPL positioning is market-contingent and regulatory-contingent** — the UK market's copy stays closer to the mechanic because the mechanic is what the FCA regime is about.

**The five-pillar benefit block is adjective-free and mechanism-first** `[observed]`

| Pillar | Body (verbatim) |
|---|---|
| `Designed around you` | "Choose how you pay. In full, later³, or over time³. Always with clear terms and helpful reminders." |
| `Accepted everywhere` | "Pay with Klarna wherever you shop, online and in physical stores." |
| `Built to grow` | "Turn spending into rewards. Earn cashback¹ on purchases, and watch it all stack up." |
| `Clear and simple` | "Track expenses, manage your money, and stay on budget in the app." |
| `Always supported` | "Get instant answers from our 24/7 AI assistant, with real human support when you need it." |

Every pillar heading is a **past participle or adjective phrase, two to three words**, and every one carries a superscript footnote marker where a claim is made. `Designed around you` carries two markers in a fifteen-word body.

The clause **"Always with clear terms and helpful reminders"** is the most important sentence in Klarna's marketing. It makes the *disclosure* and the *dunning* into benefits. Reminders — which exist because people miss payments — are sold as a feature of the product rather than as a consequence of the risk. This is a pattern PayPal BNPL copy could use directly and it is worth being conscious about: it is genuinely user-serving *and* it pre-frames the late-fee mechanism as care.

**Section heads on the payments hub are neutral to the point of being clinical** `[observed]`:
`Flexible ways to pay` · `Payments that suit your budget` · `Pick how you pay` · `Discover more ways to pay` · `Pay your way at your favorite brands` · `How much can you spend with Klarna?`

Note the repetition of `way(s) to pay` four times across one page set. And note `Payments that suit your budget` — a claim about affordability made as a section header, without a supporting affordability mechanism on the same screen.

**Product-page headlines put the benefit as a short imperative pair** `[observed]`:
- Pay in 30 days: `Get it first. Pay 30 days later.` — two sentences, six words, the entire product
- Pay over time: `Get even more / time to pay` — `even more` positions it against Pay in 4 without naming it

`Get it first. Pay 30 days later.` is the best BNPL headline in this batch. It states the sequence, the delay, and the duration, and the full stop between the two clauses enacts the gap.

**Security headline** `[observed]`: `Security comes as standard` — a British-register idiom on the US site.

**Buyer protection headline** `[observed]`: `Shop safely with buyer protection`, and the section head `The benefits of buyer protection`.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get the app` | US hero, primary | The hero CTA is an app install, **not a signup or a product page** |
| `Sign up` | Card block | |
| `Sign in` | Global nav | Not "Log in" |
| `Learn more` | Offering grid (×8), payment cards, security | Bare, very frequent |
| `Shop now` | Offering grid, Shopping tile | |
| `Download the app` | Repeated end-of-page module | |
| `Contact us` | Customer service, referenced in body text | Rendered as a button, referred to in prose as `the "Contact us" button below` |
| `Report a problem` | **Buyer Protection claim flow** | See T7 — the key dispute CTA |
| `Store directory` | Nav, shop panel | |
| `All payment options` | Payments nav group | |
| `Show more` | Global nav overflow | |
| `Log in` | Footer (Customer column) | **Inconsistent with `Sign in` in the nav** — same action, two labels |

**Observation.** Klarna's primary CTA is `Get the app`, not `Sign up` or `Pay with Klarna`. The acquisition target is app installation, because the app is where the payment schedule, the reminders, and the cashback live. Every product page terminates in the same module — `Never miss a payment with the Klarna app` / "Manage your payments and get due date reminders on the go." / `Download the app:`.

That module is placed identically at the foot of `/us/payments/`, `/us/payments/pay-over-time/`, and `/us/payments/pay-in-30-days/`. **The app is positioned as the missed-payment mitigation**, which is a defensible design: the schedule and the reminder live together.

`Report a problem` (Buyer Protection) is the strongest CTA in the file — see T7.

**Negative finding:** `Sign in` (nav) vs `Log in` (footer) for the same action. `Learn more` used bare at least twelve times across the offering grid and payment cards.

## T4 Onboarding & getting-started

**Three-step how-it-works, and the step names are decision points rather than actions** `[observed]`

**Pay over time** (`How Pay over time works`):
1. `Choose Klarna at checkout` — "Click on the pink badge and pay with Klarna at your favorite stores."
2. `Choose Pay over time` — "Choose Pay over time and spread the cost over 6-24 months with interest rates starting at 0.00%.¹"
3. `Complete your purchase` — "You'll receive an email with your payment plan when the store ships your order. From there, you can manage your payments in the app."

**Pay in 30 days** (`How Pay in 30 days works`):
1. `Choose Klarna at checkout` — "At checkout, select Klarna's Pay in 30 option. Klarna will cover the purchase so you can get your items without any upfront cost."
2. `Get 30 days to decide` — "Once the order ships, you have 30 days to decide if you're satisfied with your items. We'll keep you on track with reminders."
3. `Manage everything in one place` — "Complete your payment within 30 days, online or in the app, to avoid any late fees, paying only for the items you choose to keep."

Four structural observations, all directly transferable.

**First, step 1 is identical across products** (`Choose Klarna at checkout`) and step 2 is where they diverge. The two-stage selection — choose Klarna, *then* choose how — is reflected in the onboarding narrative, which means the user learns the shape of the checkout before they reach it.

**Second, `Get 30 days to decide` reframes a payment deadline as a decision window.** The clock is presented as the user's evaluation period for the goods, not as the lender's repayment period. Combined with `Pay only for what you keep`, this positions Pay in 30 as a **try-before-you-buy** mechanism rather than as credit. Powerful, and worth being clear-eyed about: the money is owed either way.

**Third, the shipping trigger is named in both flows.** "when the store ships your order" / "Once the order ships". The schedule does not start at checkout — it starts at dispatch. This is the kind of timing detail that generates support contacts when omitted, and Klarna puts it in step 2 or 3 of the marketing sequence, before commitment.

**Fourth, the reminder promise is embedded in the step copy**, not held back for the help centre: "We'll keep you on track with reminders." And step 3 of Pay in 30 states the *purpose* of paying on time inline — "to avoid any late fees" — inside the how-it-works, at pre-selection stage.

**Eligibility is presented as a six-item checklist, identically, on at least four pages** `[observed]`. Under `To be eligible to use the Klarna Shopping Service you must:`

- `Be a resident of the United States or its territories`
- `Be at least eighteen years old or of legal age in your state of residence.`
- `Have a valid card/bank account.`
- `Have full legal capacity to enter into a contract.`
- `Accurately provide your true and correct personal details.`
- `Be able to receive security verification codes via text message.`

Then a `Good to know:` block: a valid SSN and a linked card or bank account **may** be required for credit-based products including Pay in 4 and banking products.

The pattern to steal is the **`Good to know:` sub-block**. Klarna splits eligibility into *hard requirements* (bulleted, "you must") and *conditional requirements* (a separate labelled block, "may be required"). Most products flatten these into one list and either overstate the barrier or hide the conditional one. Note also the punctuation inconsistency — items 2, 3 and 4 end in full stops, items 1, 5 and 6 do not.

`Be able to receive security verification codes via text message` is an accessibility-relevant eligibility criterion stated plainly. It is also a genuine exclusion for some users, and it is listed as a requirement rather than buried.

## T5 Form & field labels

**The payment calculator is the primary pre-auth form and the most instructive artefact for schedule presentation** `[observed]`

Framing: "With our monthly payment calculator you can set the total amount for a purchase, and see how the costs break down with different payment options.²"

| Element | String |
|---|---|
| Input label | `Your purchase` |
| Input value shown | `$3,000` |
| Option 1 cadence label | `1 payment every 2 weeks` |
| Option 1 structure label | `4 interest-free payments` |
| Option 1 instalment | `$750.00` |
| Option 1 total | `Total cost: $3,000.00` |
| Option 2 label | `6 monthly payments` |
| Option 2 cost-of-credit | `Total interest at 19.99% APR: $177.33` |
| Option 2 instalment | `$529.56` |
| Option 2 total | `Total cost: $3,177.33` |
| Option 3 label | `12 monthly payments` |
| Option 3 cost-of-credit | `Total interest at 19.99% APR: $334.67` |
| Option 3 instalment | `$277.89` |
| Option 3 total | `Total cost: $3,334.67` |

**This is a genuinely good piece of disclosure design and the highest-value single artefact in this file.** Three things it gets right:

1. **`Total cost:` is shown for the interest-free option too** (`Total cost: $3,000.00`). Showing an unchanged total for Pay in 4 is what makes the other two totals legible as *increases*. A cost line that reads the same as the purchase price is doing comparative work.
2. **Interest is named as a standalone line, in dollars, before the total** — `Total interest at 19.99% APR: $177.33`. Both the rate and the money are given. Users who cannot reason about APR can still read $177.33.
3. **The instalment amount and the total move in opposite directions** and both are on screen simultaneously. Longer term → smaller instalment → larger total. This is the single most important trade-off in instalment credit and the calculator makes it visible in one glance rather than requiring the user to hold two screens in memory.

Immediately beneath: "This is an estimate of what your payments could look like, and for illustrative purposes only and **does not constitute a credit offer**. Actual costs may vary depending on your credit application and terms." (Note the garbled conjunction — "and for illustrative purposes only" — a grammatical defect in live disclosure copy.)

**Purchase power** `[observed]`, a second pre-auth concept with its own bounding:
> `How much can you spend with Klarna?` — "Log into your Klarna account to see your estimated purchase power under your profile, or check in the app at any time. Get the flexibility you need to shop responsibly."
> Bounding line: "Purchase power is an estimate of how much you can spend. **Subject to approval at the point of purchase** and dependent on factors such as purchase history, payment history, and purchase amount."

`purchase power` over `credit limit` or `spending limit` is a deliberate lexical choice — see T13. The bounding is the necessary half: a displayed limit that is **subject to approval at the point of purchase** is not a limit, and Klarna says so directly beneath the feature.

Checkout-flow field labels are `[absent]` — not reachable without entering a merchant checkout.

## T6 Status & state language — PRIORITY

**Where each piece of schedule and status language appears in the flow** is as transferable as the wording. Mapping it out:

| Flow position | Surface | What the user is told |
|---|---|---|
| **Pre-selection** (browsing, marketing) | Payment-option cards, calculator | Instalment count, cadence, term range, APR range, `Total cost`, purchase power estimate |
| **At selection** (checkout) | `the pink badge`, option list | `[documented]` only — the option names and `Get an instant approval decision at checkout` |
| **At confirmation** | Email triggered **on merchant shipment**, not on purchase | "You'll receive an email with your payment plan when the store ships your order" |
| **Post-purchase** | Klarna app `Payments` tab | Orders, due dates, amounts; due-date reminders; reschedule option; `Report a problem` |

The **confirmation trigger is the notable one.** Klarna states twice, on two product pages, that the payment plan email arrives *when the store ships* — not at checkout. For Pay in 30 the clock itself starts at shipment ("Once the order ships, you have 30 days"). Any BNPL content design that assumes checkout is the confirmation moment will misdescribe the schedule.

**The instalment vocabulary, consolidated** `[observed]`

Klarna uses **`payments`**, not `instalments`, in all US consumer-facing copy:
- `4 interest-free payments`
- `paid automatically every 2 weeks`
- `smaller monthly payments`
- `6 monthly payments` / `12 monthly payments`
- `1 payment every 2 weeks`
- `payment plan` (the noun for the whole schedule)
- `payment schedule` (the noun for the view of it)
- `upcoming payments`
- `due date` / `due date reminders`
- `first payment` / `down payment`

`instalments` appears only in the **UK** copy (`three equal instalments`) and in Trustpilot review quotes. The US register is deliberately non-technical: *payments*, not *instalments*, not *repayments*, not *drawdowns*.

**`payment plan` vs `payment schedule` are used for different things** and the distinction holds: the *plan* is the agreement ("You'll receive an email with your payment plan", "Check the terms of your payment plan"); the *schedule* is the view ("You can view your payment schedule anytime through the app or website. Your account shows orders, due dates, and amounts").

**Order and payment states named** `[observed] / [documented]`

- `Pending` is not used. The states surfaced are derived from money movement and dispute:
- **`paused`** — the central post-purchase state, from Buyer Protection: "we pause your payments if something goes wrong", "Klarna will **pause your payment** until the issue is solved", "**we pause your payment for 21 days** to allow the store time to process the return"
- **`unsuccessful`** — the failed-collection state: "We'll email you if your payment is **unsuccessful**"
- **`rescheduled` / `extended`** — "you may be able to **reschedule** your Klarna payment", "the option to pay off the balance earlier or **extend the due date** to a later date, if needed"
- **`good standing`** — an account-level eligibility state: "Your Klarna account is in good standing. For example: All your transactions have been paid on time"
- **`in transit` / `shipped`** — the merchant-side state that triggers the schedule

**`paused` is the most reusable state name in this file.** It is temporary by implication, it is non-punitive, it carries no fault attribution to either party, and it maps to a real and common situation (goods disputed, return in flight). It is also stated with a **duration** — `21 days` — and with the **reason for that duration** — "to allow the store time to process the return". A state, a clock, and a justification in one sentence.

**Timing language inventory** `[observed]`, with the pattern behind it:

| Phrase | Type |
|---|---|
| `every 2 weeks` | Cadence — relative |
| `up to 30 days later` | Deadline — bounded relative |
| `6-24 months` | Term range |
| `one month after your order was processed` | Anchor + offset |
| `monthly thereafter on the same date each month` | Recurrence rule |
| `when the store ships your order` | Event-triggered |
| `instant approval decision` | Latency claim |
| `21 days` | Dispute hold |
| `120 days from purchase` | Claim window |
| `20 business days` | Complaint SLA |
| `any time without penalty` | Prepayment right |

The recurrence rule is the well-written one: **"Your first payment will be due one month after your order was processed, and then monthly thereafter on the same date each month (Some orders require a down payment)."** Anchor event, offset, recurrence, and the exception — in one sentence, with the exception parenthesised rather than footnoted. That is a complete schedule specification in 30 words, and it is the model for how to state a repayment rule.

Note also the honest lead-in to that answer: **"That depends on your agreement."** Klarna opens the "when is my first payment due" answer by admitting variability before giving the general rule. Compare products that state a single date and then contradict it in the terms.

## T7 Error, failure & recovery — PRIORITY

The two failure domains — **missed payment** and **disputed order** — are documented very differently, and the asymmetry is itself the finding.

### Missed payment `[documented]`

**The full US missed-payment sequence, as stated on the Pay over time FAQ** — this is the most important paragraph in the file:

> "We'll email you if your payment is unsuccessful. We'll also try one more time to collect it. If we can't collect it a second time, it will be added to your next payment along with a late fee of **up to $7.00**. The aggregate sum of your late fees will never exceed **25% of your order value at the time of purchase**."

Decomposed into the stages a content designer would have to write:

| Stage | Klarna's copy | Actor |
|---|---|---|
| 1. Collection fails | "We'll email you if your payment is unsuccessful" | Klarna notifies |
| 2. Automatic retry | "We'll also try one more time to collect it" | Klarna retries |
| 3. Retry fails | "If we can't collect it a second time" | — |
| 4. Consolidation | "it will be added to your next payment" | The arrears fold forward |
| 5. Fee | "along with a late fee of up to $7.00" | |
| 6. Cap | "The aggregate sum of your late fees will never exceed 25% of your order value at the time of purchase" | |

Five things worth naming. The **retry is disclosed before it happens** — the user learns there is a second attempt, which changes what a failed-payment email means. The **failure is described mechanically** ("unsuccessful", "we can't collect it") with **no blame word** — no "you missed", no "you failed", no "overdue". The **consolidation into the next payment** is stated, which is the detail users are most surprised by. The fee is `up to $7.00`, hedged. And the **cap is expressed as a percentage of the original order value with a time anchor** (`at the time of purchase`), which matters because refunds and partial returns change the order value afterwards.

The whole sequence is written in the **first-person plural active voice with Klarna as the actor at every step**: we'll email, we'll try, we can't collect. The user is never the grammatical subject of the failure. That is a deliberate and copyable choice for dunning copy.

**Placement note, and it is a problem.** This entire disclosure lives inside a **collapsed FAQ accordion on the Pay over time page only** — a page about *financing*, not about Pay in 4. It is **post-selection content presented at pre-selection depth**, and the user who chooses Pay in 4 from the hub page never encounters it. The payments-hub FAQ handles the same territory much more vaguely: "If you choose Pay over time or miss a payment, **interest or fees may apply**. Check the terms of your payment plan to understand what costs you could incur for missing a payment."

That hub sentence is the pre-selection version of the late-fee disclosure and it contains **no number, no cap, and a deferral to a document the user does not yet have** ("check the terms of your payment plan" — which arrives by email after shipment). Recorded as a **negative benchmark on disclosure placement**: the specific, well-written late-fee copy exists, and it is not where the decision is made.

**Credit consequence, stated plainly** `[observed]`, in the payments-hub FAQ `Good to know:` block:
> "If you make late payments or fail to pay, this could have a negative impact on your **creditworthiness** and prevent you from using our payment methods."

Two consequences, in order: credit impact, then loss of access. Note `creditworthiness` rather than `credit score` — technically more accurate, less concrete for the user.

And on the Pay in 30 page, a fuller version `[observed]`:
> "Borrowing more than you can afford or paying late may negatively impact your financial status and ability to obtain credit, **including with Klarna**."

`including with Klarna` is the good clause — it closes the loop that the consequence is not only external.

**Declines, insufficient funds, and expired-card states are `[absent]`** — no public copy found for these, and `/us/help/` did not render.

### Disputed order — the Buyer Protection claim flow `[observed]`

This is where Klarna's failure-path writing is genuinely strong, and it is the richest recovery content in the FIN batch.

**Two named claim types**, each with a plain-language definition:

| Claim type | Definition (verbatim) |
|---|---|
| `"Goods Not Received"` | "You did not receive your order or parts of it." |
| `"Significant Deviation"` | "You received an item, but it significantly deviates from the description." |

Two claim types only. Every dispute the user can have is funnelled into *it didn't arrive* or *it isn't what you said it was*. Naming them in quotes and capitalising them makes them addressable in support conversations.

**The four-step claim process, with the CTA named** `[observed]`

1. `Contact the store to solve the problem` — "Only the store can help you find missing goods or solve issues with damaged goods."
2. `Report the problem to Klarna` — log in, locate the purchase, "Select **'Report a problem'** from the options provided."
3. `Escalation of the claim` — Klarna works with you toward resolution; save documentation (tracking showing non-delivery, photos of damage, copies of communication with the store)
4. `Klarna will review your dispute` — after reviewing the purchase and any documentation from you and/or the store, Klarna decides "whether Klarna will refund your payment/remove your payment obligation or not"

Then the state promise: "Once you've reported a problem following the guide above, **Klarna will pause your payment until the issue is solved.**" And the refund route: "we'll return the funds to the same method of payment you used to make your payment."

Three transferable moves. **Step 1 routes the user away from Klarna first** and gives the reason ("Only the store can help you find missing goods"), which sets expectations and deflects volume honestly rather than obstructively. **Step 3 tells the user what evidence to keep *before* they need it**, listing three concrete artefacts. And **step 4 names both outcomes** — "whether Klarna will refund your payment/remove your payment obligation **or not**". Klarna does not promise a favourable result inside its own process description.

**`Report a problem` as the CTA label** is excellent. Not "Dispute", not "File a claim", not "Raise a case" — the plainest possible phrase, no legal register, no implication that the user must prove anything to press it.

**The exclusions are itemised with worked examples, and this is the standout writing** `[observed]`. Every exclusion is a category plus a concrete instance:

Qualifying as Significant Deviation, summarised with Klarna's own examples: item significantly different from the description (*red instead of green; Small ordered, Large received*); a completely different item (*ordered a t-shirt, got a jacket; ordered apples, got bananas*); condition misrepresented (*sweater described as new with stains*); counterfeit; missing parts (*bought a table, one leg missing*); damaged in shipment (*bought 4 glasses, 2 arrive broken*); unusable and not disclosed as such (*phone does not turn on*).

Not qualifying, with examples: the defect was described by the seller (*phone with a broken screen highlighted in the listing*); food not matching personal expectations but matching common requirements (*ice cream not as creamy as expected; burger doesn't look like the picture*); wrong colour or material chosen on a made-to-order item; quality or performance below expectation but matching the description (*TV image quality lower than hoped*); minor scratches on an item described as "used"; bought in-store; bought online but collected in-store; valid proof of delivery to the correct location.

**The ice-cream example is the best single piece of exclusion writing in this corpus.** "The ice cream is not as creamy as you expected it to be" draws the line between *disappointment* and *misdescription* using an example so trivial it cannot be argued with, and it does the work that three paragraphs of "subjective dissatisfaction does not constitute grounds" would fail to do. The `burger does not look exactly like the advertised picture` example is doing the same job for a universally-recognised grievance.

**Category exclusions** are listed separately and are non-negotiable: payments not made via a Klarna account; consumer-to-consumer purchases; in-store transactions; claims already raised with a card issuer; cases where an alternative resolution was agreed (store credit, replacement); services and events (concert tickets, plane tickets, accommodation, beauty treatments); cash equivalents (gift cards, vouchers, donations, financial products, investments); real estate, utilities, rent; digital mailbox invoices; gold, bitcoin and other cryptocurrencies; gambling and gaming; anything violating Klarna's ethical obligations.

**The claim windows and limits** `[observed]`: `120 days from purchase` for both claim types, counted from the invoice date; "You are not raising a claim for the same order **more than twice**." A per-order claim cap, stated.

**Klarna's discretion is stated three times, verbatim in different forms** `[observed]`: "Klarna determines, **in its reasonable discretion**, whether your claim is eligible"; the same for whether the policy is being used inappropriately; and a standalone heading `Klarna's discretion`. Repetition as emphasis, in a section the user reads while aggrieved.

**And then the rights preservation** — the paragraph that most products omit `[observed]`, summarised: Buyer Protection does not affect the legal and contractual rights between buyer and seller and is separate from them; Klarna is not the agent of either party and decides only the Buyer Protection claim; the seller **can still take legal action against you even if Klarna refunded you**; and **you can still take legal action against the seller even if Klarna declined you.**

That final symmetry is the honest one. A declined claim is explicitly not the end of the user's options, and Klarna says so on the page that declines them.

Also stated: mandatory consumer-protection rights that exceed the policy are unaffected; and if a card was used, the policy does not limit chargeback rights with the issuer. Plus the interaction rule: "If you submit a dispute with us and **also** dispute the charge with your issuing bank, we'll have to cancel your dispute if we receive a chargeback or another form of payment reversal." A conflict between two remedies, named before the user triggers it.

### Complaints `[observed]`

A dedicated `/us/complaints/` page with exactly two questions:
- `I have an issue with my order – What should I do?`
- `I am dissatisfied with Klarna's payment products or service – How can I make a complaint?`

**The page separates a complaint about the merchant from a complaint about Klarna** in its first two headings, which is the correct primary split and the one users most often get wrong.

The commitment, summarised: complaints are handled promptly; the goal is resolution during first contact; if not immediately resolvable Klarna will acknowledge and "strive to investigate and resolve it **within 20 business days**, whenever feasible."

Note the double hedge — `strive to` and `whenever feasible` around a stated SLA. The number is given, then softened twice. Compare the UK regime, where complaint-handling timescales are prescribed.

The submission instructions include a good piece of practical guidance: "Provide us with as much relevant information as possible (e.g., **your statement reference**)" — naming the specific identifier that speeds resolution.

### Fraud and scams `[observed]`

The security page carries a nine-question FAQ written entirely as **user situations requiring action**, summarised: how to tell if a message claiming to be from Klarna is fake (three tests — links to fake sites, requests for sensitive data or ID documents, artificial urgency such as account-suspension threats); what to do with a suspicious email or attachment; what to do if you think you've been scammed (contact Klarna and your bank immediately, **freeze your Klarna account**, change passwords, monitor statements); what to do if a device or card is lost (report, **freeze your card in the app**, change passwords for anything auto-logged-in); what to do about unrecognised account activity; how to handle an unexpected payment request (log in to check for a genuine outstanding payment; verify via an independently-sourced contact method); how to vet an unfamiliar online store; and how to respond to unexpected contact generally.

The recurring instruction across five of the nine answers is **"contact the company using a different, trusted method"** — verify out-of-band. And the recurring self-serve action is **`freeze`** (account or card), an in-app control named in the guidance so the user knows it exists before they need it.

Register note: "Staying aware and vigilant is the best line of defense" and "If something feels off, **trust your instincts**" — the only place on the site where the user is advised to act on feeling rather than on a rule.

## T8 Empty states

`[absent]` — all behind auth. No search surface rendered (the `/us/help/` page returned empty), so no no-results string was reachable.

## T9 Notifications & system messages

`[documented]` and `[observed]` in promise form rather than as actual strings.

**Reminders are the load-bearing notification and are sold as a product benefit** `[observed]`, repeated across at least four surfaces:
- `Never miss a payment with the Klarna app` — "Manage your payments and get **due date reminders** on the go."
- "Always with clear terms and **helpful reminders**"
- "We'll keep you on track with **reminders**" (Pay in 30, step 2)
- "with reminders to help you stay on schedule" (payments-hub FAQ)

Four phrasings of one mechanism. The module heading `Never miss a payment with the Klarna app` is the sharpest — it names the failure the notification prevents, in the imperative, as the app's reason to exist.

**Transactional email is named at two moments** `[observed]`:
- On shipment: "you will receive an email from Klarna **outlining your payment**" (Pay in 30) / "You'll receive an email with your **payment plan**" (Pay over time)
- On failed collection: "We'll email you if your payment is unsuccessful"

**Proactive alerting, as features** `[observed]`, from the security page: `Instant activity alerts` — "Get real-time notifications for any suspicious transactions or login attempts, so you can shop with peace of mind." And `Stay on top of your purchases` — an inbox-connection feature that emails every purchase, "**even those not made with Klarna**."

Actual notification body strings are `[absent]`.

## T10 Disclosures, legal & compliance — PRIORITY

### Where each disclosure sits in the flow

| Disclosure | Pre-selection | At selection | At confirmation | Post-purchase |
|---|---|---|---|---|
| Instalment count and cadence | ✅ card label, nav label | ✅ (documented) | ✅ email | ✅ app |
| Term range (6–24 months) | ✅ card, hero | ✅ "Choose your preferred timeline" | ✅ | ✅ |
| APR range (0.00%–35.99%) | ✅ hero subline + footnote 1 | ✅ (documented, at application) | ✅ | — |
| Worked total cost | ✅ calculator only | — | — | — |
| **Late fee amount ($7)** | ⚠️ **Pay over time FAQ accordion only** | ❌ | ❌ | — |
| **Late fee cap (25%)** | ⚠️ same accordion | ❌ | ❌ | — |
| Credit-check type (soft/hard) | ✅ FAQ, both pages | ✅ "A credit check will be performed" | — | — |
| Credit-impact warning | ✅ `Good to know:` blocks | — | — | — |
| Lender identity (WebBank) | ✅ footnote + FAQ | — | ✅ | — |
| Eligibility criteria | ✅ six-item list, 4 pages | — | — | — |
| Purchase-power caveat | ✅ inline under feature | ✅ "Subject to approval at the point of purchase" | — | — |
| FCA status (UK) | ✅ every UK page footer | — | — | — |

The pattern: **everything except the late fee is disclosed at pre-selection.** The late-fee amount and cap exist in exactly one collapsed accordion on one product page. That is the finding of this section.

### US disclosures

**APR and financing terms, verbatim** `[observed]`:
> `Financing plans range from 6-24 months with interest rates ranging from 0.00%-35.99% APR¹`

Placed as a **standalone line directly beneath the Pay over time hero subhead**, in the same visual block as the value proposition rather than in a footer. The range is given at both ends. `0.00%` is written with two decimal places to match `35.99%`, which prevents the zero reading as an absence.

**Representative example, footnote 1** `[observed]`:
> "A $1,000 purchase might cost $173.53 per month over 6 months at 13.99% APR. Rate ranges from 0.00%-35.99% APR based on creditworthiness, term length, and subject to credit approval, resulting in, for example, 3 equal monthly payments of $333.33 at 0.00% APR to $353.52 at 35.99% APR per $1,000 borrowed. Minimum purchase amount and down payment may be required. Estimation of monthly payment excludes potential tax and shipping costs. Monthly financing through Klarna issued by WebBank."

This is a US-format representative example doing what a UK SECCI would do. Note it gives **three different scenarios** (a 6-month at 13.99%, and both ends of a 3-month range), which is more informative than a single representative APR but also harder to parse. The exclusions are stated (`excludes potential tax and shipping costs`) and so are the conditions (`Minimum purchase amount and down payment may be required`).

**There is a visible inconsistency between the footnote and the calculator**: the footnote's worked example uses `13.99% APR`, the on-page calculator uses `19.99% APR`, and the headline range is `0.00%-35.99%`. Three different rates on two adjacent surfaces. Defensible individually; confusing together.

**Late fee, verbatim** `[observed]` (Pay over time FAQ):
> "a late fee of **up to $7.00**. The aggregate sum of your late fees will never exceed **25% of your order value at the time of purchase**."

**Credit-check disclosure is the best-structured item on the site** `[observed]`. The payments-hub FAQ answers "does Klarna check my credit" with a three-part table structure in prose:

- **What is checked, and why**: "we verify your identity using the details you provided and we look at information from your credit report to understand your financial behavior and evaluate your creditworthiness"
- **We will *not* perform a credit check when:** `Signing up to use Klarna` · `Downloading the [app]`
- **We will perform a soft credit check when you:** [list truncated in render]
- **Consequence**: "Soft credit checks do not affect your credit score and will not be visible to other lenders."

**Leading with the negative list — the situations that do *not* trigger a check — is the transferable move.** It removes the barrier at the point of signup, where the anxiety is highest and the check is not happening anyway. Most products only enumerate when they *do* check, leaving the user to assume it is always.

Then the exception, stated plainly on the Pay over time FAQ: **"Please note: A credit check will be performed when you apply for our Pay over time option."** Unhedged, on the page for the product it applies to.

And the prequalification carve-out: "Using the prequalification feature will not affect your credit score in any way, **whatever the outcome**." The final clause is the reassuring one — it pre-empts "but what if I'm declined?"

**Klarna also routes credit-report disputes to the bureau rather than absorbing them** `[observed]`: "Our third party credit checks are performed by [bureau]. If you have questions regarding their services, your credit score, or the data provided as part of a credit check we advise you to reach out to them directly."

**Deposit-insurance disclosure, footnote 5** `[observed]`, summarised: balance-account deposits are held at WebBank, Member FDIC; **Klarna is not an FDIC-insured bank** and the insurance covers only WebBank's failure; deposits are eligible for **pass-through** coverage if conditions are met; funds may be made available before WebBank receives them (`"early availability funds"`) and **those may not be FDIC insured until received**; and "Loans that you obtain using the Klarna Card are **not insured by the FDIC and are not deposits**."

Two strong moves. The **"state what you are not" pattern** (Klarna is not an FDIC-insured bank) appears before the coverage description. And **`early availability funds` is a named, quoted term for an in-between state with different protection** — the same good practice observed at Betterment with funds in transit. Users who get paid early are told that the early money is differently protected.

The final clause — loans on the card are not deposits — separates two things that sit in the same app and the same balance.

**The Vermont notice, in full caps in every US footer** `[observed]`:
> "VT Consumers: For WebBank Loan Products (One-Time Cards, Financing, Klarna Card): THIS IS A LOAN SOLICITATION ONLY. KLARNA INC. IS NOT THE LENDER. INFORMATION RECEIVED WILL BE SHARED WITH ONE OR MORE THIRD PARTIES IN CONNECTION WITH YOUR LOAN INQUIRY. THE LENDER MAY NOT BE SUBJECT TO ALL VERMONT LENDING LAWS. THE LENDER MAY BE SUBJECT TO FEDERAL LENDING LAWS."

A single US state's mandated wording shown to **all** US visitors rather than geo-targeted. The all-caps is the state's requirement, not Klarna's choice. Worth recording as the cost of not geo-gating: every US user reads Vermont's warning.

**Footnote architecture** `[observed]`: ten superscript-numbered footnotes on the US homepage, markers placed inline at the claim (`cashback¹`, `over time³`, `perks⁴`, `Balance⁵`, `AT&T⁶`, `buyer protection¹⁰`). Consistent and well-anchored — each marker sits on the specific word that carries the claim, not at the end of the sentence.

### UK disclosures

**The UK regulatory statement, verbatim** `[observed]` — appears in the footer of every UK page:

> "Klarna Financial Services UK Limited is authorised and regulated by the Financial Conduct Authority ("FCA") for carrying out regulated consumer credit activities (firm reference number **987889**) and the provision of payment services and the issuing of electronic money under the Electronic Money Regulations 2011 (firm reference number **1021834**). Klarna Financial Services UK Limited offers both regulated and unregulated products. **Klarna's interest free and pay up to 12 months Financing agreements, Pay in 3 instalments and Pay in 30 days agreements are not regulated by the FCA.** Incorporated in England (company number 14290857), with its registered office at 10 York Road, London, SE1 7ND."

This paragraph is the most important regulated-copy artefact in the file and its structure is worth dissecting:

1. The entity is named and its **authorisation is stated** with two separate FRNs for two separate permissions
2. Then the pivot sentence: **"offers both regulated and unregulated products"**
3. Then the **explicit enumeration of which products are unregulated** — by name: interest-free financing, pay-up-to-12-months financing, Pay in 3, Pay in 30 days
4. Then the corporate identifiers

Step 3 is the one most firms would fight to avoid. Klarna names its three highest-volume UK consumer products as outside the FCA perimeter, in plain product names, in the footer of every page. This is the disclosure that prevents a user inferring "FCA authorised" as blanket protection over everything the brand sells.

For PayPal Pay in 3 UK work this is the directly comparable precedent, and the lesson is structural: **an authorisation statement and a perimeter statement are two different disclosures, and shipping only the first is misleading by omission.**

**UK product terms observed** `[observed]`, from the (thin) UK homepage:
- `Pay now.` — "Pay by card directly at the checkout. No lengthy forms, no passwords, no worries."
- `Pay later.` — "Shop now, pay later. Klarna lets you pay **14 or 30 days after delivery** or in **three equal instalments - interest-free**."
- `Slice it.` — "Spread the cost of your purchase into equal monthly payments."

**`Slice it.` is the UK financing product name** and it is a striking choice — a two-word imperative with no reference to credit, interest, term, or money. Compare the US `Pay over time`, which at least names the temporal mechanism. `Slice it.` is the least informative product label in this batch, and it sits directly above the footer that discloses which products are unregulated.

Note also `14 or 30 days after delivery` — the UK Pay later anchors to **delivery**, while the US Pay in 30 anchors to **shipment**. Different trigger events for structurally similar products in two markets.

**UK-market absences.** No representative APR, no SECCI reference, no total-amount-payable, no `late fees` figure, and no affordability language were retrievable from the UK pages that rendered. `/uk/pay-in-3` and `/uk/pay-later/` both returned empty. **The UK regulated product copy is therefore substantially unharvested** and is the single largest gap in this file.

### Buyer Protection as a disclosure

Covered in detail in T7. Worth restating here as a compliance artefact: Klarna publishes the policy's **effective date** (`This policy is in effect for eligible Klarna purchases made after 05.08.2023`), its **exclusion list**, its **claim windows**, its **per-order claim cap**, and an explicit statement that **mandatory consumer-protection rights and card-network chargeback rights are unaffected**. That last item is the one that turns a marketing promise into an honest policy.

## T11 Help-centre architecture

**Substantially blocked.** `/us/help/` returned an empty body and no category tree was retrievable. `[absent]`

What *is* observable is the **support model itself**, which is unusual enough to record `[observed]`. The customer-service pages (US and UK, near-identical) present a three-channel model in a fixed escalation order:

| Channel | Heading | Promise |
|---|---|---|
| 1 | `Instant 24/7 support` (US) / `Instant support, 24/7` (UK) | "Our AI assistant speaks any language of your choice and solves over 300,000 customer queries every week." |
| 2 | `Chat with us` | "You can request a customer service representative anytime. We are available 24/7 to support you via live chat." |
| 3 | `Call us` | "Need to talk to us? We're just a phone call away. Simply request a phone call in the chat or click the 'Contact us' button below." |

Page furniture: `Questions? Let's chat!` (hero, repeated twice in the render) · three bullets — `Get immediate support` / `24/7 help in any language` / `Chat with us or request a callback` · `How it works` · `Frequently asked questions` · `More ways we can help` · `Get support anytime, anywhere`.

**Three observations.** The AI assistant is **channel one, named as such, with a volume statistic attached** (`over 300,000 customer queries every week`) — Klarna is not hiding the automation, it is using the scale as the credibility argument. The human channel is described as something you **request** ("You can request a customer service representative"), not something you select. And **phone is not a number** — it is a callback requested inside the chat, so the escalation ladder cannot be skipped.

The gate is stated up front: "If you need help with your account and transactions, **sign in first**." Authentication is required before account-specific help, and that is said before the user attempts it.

`More ways we can help` routes to three policy pages — `Privacy policy`, `Security at Klarna`, `Buyer protection` — treating policy documents as support content. Note a **content defect**: on the UK page, `Security at Klarna` carries the *privacy policy's* description ("Learn how we handle your data and keep your personal information safe") — a duplicated line. The US page has it correct ("Learn how we help you shop securely by protecting your money and data"). Two markets, one copy bug.

**The app is positioned as the primary self-service surface** `[observed]`, with the same module on both pages: `Solve your problems with the Klarna app` — "Track your delivery, handle returns and manage your payments in the Klarna app. Get 24/7 help in our chat, **come and go, you'll never miss a message.**"

`come and go, you'll never miss a message` is a persistence promise written colloquially — it addresses the specific anxiety of losing a chat thread.

## T12 FAQs

FAQs are **per-product and per-topic**, with no central FAQ. Five sets captured. Question text was reliably retrievable; answers rendered in full on most pages.

### Payment methods hub / What is Klarna `[observed]`

Framing line: "Questions on Klarna payment options? Find your answers below. For any further help or troubleshooting, please contact customer support."

Eight questions were answered in the render; the question headings themselves were not exposed as separate strings by the fetch, but the answers map to: what Klarna is and how it works · eligibility criteria · what flexible payments are · which options are interest-free and what costs apply if you miss a payment · whether payments can be rescheduled · where to view your payment schedule · how Klarna assesses ability to pay and what credit checks it runs · how payment data is kept secure.

**The sequence is the artefact**: identity → eligibility → category explainer → **cost of failure** → rescheduling → schedule visibility → credit checks → security. Cost-of-failure is the fourth item of eight, before the convenience features. For a BNPL FAQ that ordering is defensible and better than most.

### Pay over time `[observed]`

Framing: "Questions on how to use Pay over time? Find your answers below. For any further help or troubleshooting, please contact customer support."

Four answers, covering: how Pay over time works (a five-step bulleted sequence — `Select the Pay over time option in the checkout` · `Choose your preferred timeline from the available options` · `Follow the steps to complete the application` · `Get an instant decision` · `Complete your purchase`) · eligibility · **what happens if a payment is missed** · when the first payment is due and thereafter.

The five-step sequence uses `application` and `instant decision` — the only place the credit-application register surfaces in consumer copy.

### Pay in 30 days `[observed]`

Five answers: what Pay in 30 days is (including that the app offers "the option to pay off the balance earlier or extend the due date to a later date, if needed") · how to use it and when the email arrives · whether there is a credit check (`Yes, but only a soft credit check`) · which cards are accepted · eligibility.

**`Yes, but only a soft credit check`** is model answer-writing: direct answer, qualifier, in six words, before any explanation.

### Security `[observed]`

Framing: "Run into a potential security issue? Here are some tips on what to do."

Nine scenario-based answers (summarised in T7). **Every one is a situation the user is already in**, not a concept to understand. The framing line uses the past tense of a problem already encountered — "Run into a potential security issue?" — which is the correct register for a page people reach in distress.

### Complaints `[observed]`

Two questions, both verbatim:
- `I have an issue with my order – What should I do?`
- `I am dissatisfied with Klarna's payment products or service – How can I make a complaint?`

**The grammar here is distinctive and good**: a **first-person statement of the situation, an en-dash, then the question**. `I have an issue with my order – What should I do?` is closer to the Wise first-person confession pattern than anything else in this batch, and it is used at exactly the right moment — on the complaints page, where the user has already decided something is wrong.

### Buyer Protection `[observed]`

Three answers: what to do if you are unhappy with Klarna's resolution (contact the seller, take legal action if necessary — Buyer Protection "only offers an additional possibility for dispute resolution") · how Buyer Protection interacts with a card chargeback (choose one; a chargeback cancels the Klarna dispute) · what to do about suspected fraud (routes to Fraud Liability Protection).

## T13 Terminology & glossary

| Term | Klarna's usage | The alternative it rejected |
|---|---|---|
| `Pay in 4` | The pay-in-4 product | "instalment plan", "split payment", "BNPL" |
| `Pay over time` | Monthly financing, 6–24 months | **"financing"** — which is the word used in the footnotes and by WebBank |
| `Pay in 30 days` | Deferred single payment | "invoice", "Pay later" (the UK name) |
| `Pay in full` / `Pay in full today` | Immediate card payment | "Pay now" (the UK name) |
| `Slice it.` **(UK only)** | UK monthly financing | "Pay monthly", "Pay over time" — **the US and UK names for the same structure do not match** |
| `Pay later` **(UK only)** | UK umbrella for 14/30-day and Pay in 3 | |
| `Pay in 3` **(UK only)** | UK three-instalment product | `Pay in 4` (the US count) |
| `payments` | The instalment unit, US | **`instalments`** — used only in UK copy |
| `payment plan` | The agreement | "credit agreement", "loan" |
| `payment schedule` | The view of due dates | |
| `purchase power` | Estimated spendable amount | **"credit limit"**, "spending limit" |
| `flexible payments` | The category | "BNPL" — Klarna defines BNPL in an FAQ answer but does not use it as a label |
| `the pink badge` | The checkout affordance | "the Klarna button" — Klarna names it by **colour**, not by brand |
| `Buyer Protection` | The dispute policy | "purchase protection", "dispute resolution" |
| `Goods Not Received` / `Significant Deviation` | The two claim types, quoted and capitalised | "non-delivery", "item not as described" |
| `Report a problem` | The dispute CTA | "File a claim", "Open a dispute" |
| `paused` | The held-payment state | "suspended", "on hold", "frozen" |
| `unsuccessful` | Failed collection | "declined", "failed", "missed" |
| `good standing` | Account eligibility state | |
| `Klarna Balance` | The deposit account | "wallet" |
| `early availability funds` | Quoted, defined, protection-flagged | |
| `creditworthiness` | The credit-impact noun | "credit score" |
| `freeze` | The self-serve security control | "lock", "suspend" |
| `Wikipink` | Klarna's public data-transparency site | "transparency report" |
| `Klarna Max` / `Memberships` | Paid tiers | |

**Three terminology findings worth flagging.**

**`purchase power` over `credit limit`.** This is the most consequential single word choice in the file. `credit limit` frames the number as an entitlement extended by a lender; `purchase power` frames it as an attribute of the user. It is warmer, it is less likely to be read as a hard entitlement, and — critically — it is *more* accurate to the mechanism, since the figure is explicitly "subject to approval at the point of purchase". A credit limit that isn't guaranteed is a badly-named credit limit; purchase power is honestly named. Directly transferable.

**`the pink badge`.** Klarna instructs users to "Look for the pink badge at checkout" and "Click on the pink badge". Naming the affordance by its **colour rather than its brand** is unusual and smart: it survives merchant-side variation in button labelling, and it is the attribute the user actually scans for. Worth testing against accessibility, though — a colour-only instruction is exactly the kind of thing WCAG 1.4.1 exists to prevent, and Klarna's own accessibility statement claims "our services never depend on seeing color". Recorded as a tension between the accessibility statement and the marketing instruction.

**The US/UK naming divergence is total.** `Pay in 4` / `Pay in 3`; `Pay over time` / `Slice it.`; `Pay in full` / `Pay now`; `Pay in 30 days` / `Pay later`. Four products, eight names, zero overlap. Some of this is regulatory (three instalments vs four) and some is market convention, but `Slice it.` versus `Pay over time` is a pure brand-voice divergence for an identical structure. For a content designer working across markets this is the cautionary example: a global product can end up with no shared vocabulary at all.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for Klarna, and — importantly — **Klarna is the grammatical subject of every adverse action**: "We'll email you", "We'll also try one more time to collect it", "If we can't collect it", "we pause your payments", "Klarna will review your dispute", "we'll have to cancel your dispute". The user is never made the subject of a failure. This is consistent enough across pages to be a deliberate rule, and it is the most valuable tonal finding in the file for dunning and dispute copy.

**Register.** Short, plain, low-adjective. Contractions throughout (`you'll`, `we'll`, `don't`, `we're`). Sentence case. **No exclamation marks anywhere in the payment, fee, or dispute copy** — the only ones found are in support furniture (`Questions? Let's chat!`) and in quoted Trustpilot reviews.

**The register does not flatten as stakes rise — it was already flat.** Unlike Wise or Acorns, Klarna has no colloquial upper register to drop. `Your money treated right` and `Built to grow` are about as warm as it gets, and the Buyer Protection page reads in exactly the same voice as the homepage. This is defensible for a regulated payments product but it means there is no tonal signal to the user that they have moved into consequential territory.

The two exceptions, both in support content: `come and go, you'll never miss a message` and `If something feels off, trust your instincts.`

**Numbers as trust devices** `[observed]`: `119M` / `114+ million` users worldwide (**two different figures on two pages of the same site in one session** — see negative findings), `1m+` merchants, `20 years of experience`, `4.5` Trustpilot with `557,967 reviews`, `150+ fraud prevention specialists`, `over 300,000 customer queries every week`. The review count is given to the unit, which is a specificity device.

**Quoted executive** `[observed]`: "At Klarna, security isn't just a feature, it's a commitment" — attributed to the CTO by name and title. A named human as the guarantor of the security claim.

**Testimonial disclosure** `[observed]`: "Customer reviews reflect their personal experience and opinion. **Showing our 5-star reviews.**" The second sentence is the honest one — Klarna states that the displayed sample is selected, on the same line, in five words. Compare Betterment's "Views may not be representative." Klarna's is more specific about *how* it is unrepresentative.

**Accessibility content** `[observed]`

Klarna publishes a `Public accessibility statement` at `/us/accessibility/`, linked from the footer of every page. Summarised, it commits to accessible and inclusive digital services; states that services are offered in formats accessible regardless of ability; names the assistive technologies supported — **screen readers, keyboard navigation, and speech recognition software**; states that font size, contrast settings, and zoom can be adjusted "without losing functionality or clarity of content"; says accessibility is integrated "from design to deployment" and that internal reviews are supported by **audits and usability testing**; and provides a feedback email route.

Strengths: it names **specific assistive technologies** and **specific user-adjustable properties**, which is more concrete than most statements. It mentions audits and usability testing. It is written in plain language and is clearly current (unlike Acorns' 2020 statement).

Gaps:
- **No conformance standard is named.** No WCAG version, no level (A/AA/AAA), no EN 301 549, no EAA, no ADA reference. Klarna operates in the EU where the **European Accessibility Act** applies to payment services, and does not cite it. Compare Lemonade (060), which names WCAG 2.2 Level AA and the EAA explicitly. Klarna's statement is more *descriptive* than Acorns' and less *accountable* than Lemonade's
- No audit date, no audit body, no conformance report
- No `Skip to content` link was found in the source of any Klarna page inspected
- **The `pink badge` instruction conflicts with the statement's own claim.** "Look for the pink badge at checkout" and "Click on the pink badge" are colour-only instructions, while the accessibility statement is the document that would normally forbid them. Flagged as a tension between two Klarna-published sources

**Alt text observed** is descriptive and scene-level where present: "Person with a Klarna keychain and app home screen animation" · "Hand holding a device showing Klarna's payment methods with **Pay over time selected**" · "Arm holding pink headphones with a 'Pay with Klarna' badge on top" · "3 Klarna Cards in various colors" · "Illustration of a calendar with 30 days marked" · "Illustration of choosing 'Pay in full'".

The Pay-over-time hero alt is the good one — it names **which option is selected in the screenshot**, so a screen-reader user gets the state, not just the object. The same standard as Betterment's best alt text.

However, a large number of images render with **raw asset filenames as their accessible text** rather than alt text: `SimplifiedScreen_Web_Financing_1x1_US`, `Web_Body_Device_SimplifiedScreen_PaymentsTab_Nero_1x1_US`, `SimplifiedSnippet_Email_Split_PayIn30_ChooseKlarna_3x2_Global`, `Email_DefaultMain_Simplifiedscreen_Purchasepower_Balloon_1x1_US_EN_001`, `Web_Generic1_Brand_Cashback_9PercentBoosted_Custom`, and roughly twenty more. **Every step image in both how-it-works sequences falls into this category**, meaning the onboarding illustrations are announced to screen-reader users as DAM identifiers. This is the most widespread accessibility defect found in this batch and it affects the priority content (the payment-schedule explainers) specifically.

**Other negative findings, recorded honestly:**
- **Multiple product pages return empty server HTML**, including `/us/payments/pay-in-4/` — the flagship product's own page. Users with JS disabled, some assistive setups, and all crawlers get nothing
- `Sign in` (nav) vs `Log in` (footer) for one action
- User-count claim rendered as both `119M` and `114+ million` on two pages in the same session; both appear with animation artefacts in the source (`119M0M`, `1m+0m+`, `200 years of experience` where the intended figure is 20)
- Three different APR figures across adjacent surfaces: `0.00%-35.99%` (range), `13.99%` (footnote example), `19.99%` (calculator)
- Four payment options presented in three different orders across three pages
- `Security at Klarna` carries the privacy policy's description on the UK customer-service page
- "This is an estimate of what your payments could look like, and for illustrative purposes only" — garbled conjunction in live disclosure copy
- `Learn more` used bare 12+ times
- Several FAQ answers render with **empty link targets mid-sentence** ("Read our [ ] for more information", "You can view your payment schedule anytime through the [ ] or website"), so the routing destination is lost — including in the eligibility and credit-check answers, which are compliance-relevant

---

## Transferable patterns

1. **Name the temporal structure, not the credit instrument.** `Pay in 4` / `Pay in 30 days` / `Pay over time` / `Pay in full`. Every label is a complete instruction with a count or a duration in it, and the regulated name (`Monthly financing through Klarna issued by WebBank`) lives in the footnote. Directly applicable to Pay in 3 / Pay in 4 / Pay Monthly labelling. **Condition:** the footnote must actually exist and be adjacent, or the pattern becomes concealment.
2. **A calculator that shows `Total cost:` for the free option too.** Klarna's payment calculator displays `Total cost: $3,000.00` for Pay in 4 beside `Total cost: $3,177.33` for 6 months. The unchanged total is what makes the other totals legible as increases. Show interest as its own dollar line before the total, and put the shrinking instalment and the growing total on screen together — that trade-off is the decision the user is actually making.
3. **`paused` as the dispute state, with a duration and a reason.** "we pause your payment for 21 days to allow the store time to process the return." Temporary by implication, non-punitive, no fault attribution, and the clock is justified in the same sentence. Better than "on hold", "suspended", or "under review" for any disputed-payment state.
4. **Klarna is the subject of every adverse sentence.** "We'll email you if your payment is unsuccessful. We'll also try one more time to collect it. If we can't collect it a second time…" The user is never the grammatical subject of the failure, and there is no blame vocabulary (`missed`, `failed to`, `overdue`). Adopt as a rule for dunning copy.
5. **Disclose the retry before it happens.** Telling the user there is a second collection attempt changes what a failed-payment notification means and prevents a duplicate manual payment. Most BNPL copy omits the retry entirely.
6. **Lead the credit-check disclosure with what does *not* trigger a check.** "We will not perform a credit check when: Signing up to use Klarna · Downloading the app." Removes the barrier at the highest-anxiety moment. Follow with the soft-check list and the "does not affect your credit score and will not be visible to other lenders" consequence.
7. **Publish the perimeter, not just the authorisation.** The UK footer states the FRNs, then says "offers both regulated and unregulated products", then **names the unregulated products individually**. An authorisation statement without a perimeter statement is misleading by omission. This is the single most directly applicable precedent in the file for UK Pay in 3 work.
8. **Exclusions written as concrete micro-examples.** "The ice cream is not as creamy as you expected it to be." "You ordered apples but got bananas." "You bought a table and one leg is missing." Each exclusion category paired with an instance so trivial it cannot be argued with. Transfers to any coverage, eligibility, or dispute-scope copy.
9. **Name both outcomes inside your own process description.** "Klarna will make a decision on the dispute, that is, whether Klarna will refund your payment/remove your payment obligation **or not**" — and then preserve the user's rights on the page that declines them ("you can still take legal action against the seller if you have not been successful").
10. **`purchase power` instead of `credit limit`**, paired with "Subject to approval at the point of purchase". If the number is not guaranteed, do not use a word that implies it is.
11. **Negative benchmark — the late-fee disclosure is in the wrong place.** The `$7.00` fee and the `25% of order value` cap are well written and live in a collapsed accordion on the *financing* page. A user selecting Pay in 4 encounters only "interest or fees may apply. Check the terms of your payment plan" — where the plan arrives by email after shipment. **The specific disclosure must sit where the specific choice is made.** This is the finding most worth carrying into PayPal BNPL disclosure placement review.
12. **Negative benchmark — asset filenames as alt text.** Every step illustration in both how-it-works sequences is announced as a DAM identifier (`SimplifiedSnippet_Email_Split_PayIn30_ChooseKlarna_3x2_Global`). The payment-schedule explainers are precisely the content that must survive assistive technology.

## Caveats & gaps

- **Six URLs returned empty server HTML and are recorded as blocked**: `https://www.klarna.com/` (root), `https://www.klarna.com/us/payments/pay-in-4/` (attempted twice, including with a cache-busting parameter), `https://www.klarna.com/uk/pay-in-3`, `https://www.klarna.com/uk/pay-later/`, `https://www.klarna.com/uk/what-is-klarna/`, and `https://www.klarna.com/us/help/`. These are client-rendered; no alternative retrieval route was attempted per the brief.
- **The Pay in 4 product page — the most directly relevant single surface in this corpus to PayPal Pay in 4 — was not retrievable.** All Pay in 4 terms in this file are reconstructed from the payments-hub card, cross-sell blocks, and footnotes: `Split your purchase into 4 interest-free payments, paid automatically every 2 weeks`, plus footnote 1 ("See payment terms. A higher initial payment may be required for some consumers"). **The Pay in 4 down-payment rule, its specific late-fee schedule, its eligibility copy, and its own FAQ are all unharvested.** Any Pay in 4 claim in this file that is not quoted above should be treated as absent rather than inferred.
- **The $7.00 late fee and 25% cap are sourced from the Pay over time FAQ.** It is not confirmed that identical figures apply to Pay in 4, and they are not stated on any Pay in 4 surface that rendered. **Do not use these figures as Pay in 4 precedent without re-verification.**
- **UK regulated copy is substantially unharvested.** Only the UK homepage (thin) and UK customer-service page rendered. No UK representative APR, no total amount payable, no SECCI, no UK late-fee figure, no UK affordability or creditworthiness-assessment copy, and no UK Pay in 3 product page were reachable. Given that the brief flags UK regulated wording as the priority, **this is the largest gap in the file.**
- **The help centre is entirely absent.** No category tree, no article titles, no self-service IA. T11 covers the support *model* only. This removes the single richest source of task phrasing and state vocabulary available for Klarna.
- **Checkout-flow copy is `[documented]` at best.** The "at selection" and "at confirmation" columns in the T10 placement table are reconstructed from how-it-works descriptions, not observed. In-checkout strings, the payment-option picker, the schedule preview shown before commitment, and the confirmation email body are all unharvested and would require a merchant checkout or an authenticated session.
- **All in-product states are inferred.** The app's `Payments` tab, order list, due-date display, reminder copy, and `Report a problem` flow are described in marketing and policy copy but were not observed. T6 and T8 are marked accordingly.
- **Several compliance-relevant FAQ answers render with empty link targets** mid-sentence (in the eligibility, credit-check, and payment-schedule answers), so the destinations of those routings — including "Read our [terms and conditions]" — are lost.
- **Figures conflict across surfaces** harvested in one session: user counts (`119M` vs `114+ million`), APRs (`0.00%-35.99%` / `13.99%` / `19.99%`), and animation artefacts in the source (`200 years of experience` for an intended `20`). No statistic from this file should be used without re-verification.
- **Mobile app copy not harvested.** Klarna's hero CTA is `Get the app` and the app is where the schedule, reminders, and dispute flow live — so the majority of this product's payment-status UI is outside the public web surface.
- Only 12 of 15 attempted pages rendered. Unharvested even among reachable surfaces: `/us/legal/`, `/us/terms-of-use/`, `/us/klarna-card/`, `/us/credit-card/`, `/us/klarna-balance/`, `/us/savings-account/`, `/us/memberships/`, `/us/cashback/`, `/us/wikipink/`, `/us/advertising-disclosure/`, and the Fraud Liability Protection policy referenced from two pages.

## Sources

1. https://www.klarna.com/us/
2. https://www.klarna.com/uk/
3. https://www.klarna.com/us/payments/
4. https://www.klarna.com/us/payments/pay-over-time/
5. https://www.klarna.com/us/payments/pay-in-30-days/
6. https://www.klarna.com/us/what-is-klarna/
7. https://www.klarna.com/us/customer-service/
8. https://www.klarna.com/uk/customer-service/
9. https://www.klarna.com/us/buyer-protection/
10. https://www.klarna.com/us/complaints/
11. https://www.klarna.com/us/security/
12. https://www.klarna.com/us/accessibility/

**Attempted, returned empty (blocked):**
13. https://www.klarna.com/
14. https://www.klarna.com/us/payments/pay-in-4/
15. https://www.klarna.com/uk/pay-in-3
16. https://www.klarna.com/uk/pay-later/
17. https://www.klarna.com/uk/what-is-klarna/
18. https://www.klarna.com/us/help/
