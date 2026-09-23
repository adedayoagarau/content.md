# Browser-pane supplements

Pages that `web_fetch` could not render (client-side JS), recaptured through the
Claude browser pane. Each entry names the file it belongs to and the gap it closes.

---

## 010-monday.md — pricing page and FAQ block

**Gap closed:** harvest agent recorded `monday.com/pricing` as never fetched.
Browser pane rendered it fully on 2026-09-21.

**Source:** https://monday.com/pricing

### Plan-page framing `[observed]`

- Headline: `Plans for every team, people and agents included.`
  — "and agents included" places AI agents inside the seat model as a *pricing*
  claim, not a feature claim.
- Sub: `Start free, no credit card needed.`
- CTA: `Get Started`
- Control label: `Choose team size:` with a seat stepper (`10 Seats`, `3 Seats`)
- Billing toggle: `Yearly SAVE 18%` | `Monthly` — the discount rides on the
  toggle label itself rather than sitting beside it. CRM variant shows
  `SAVE 33%`, so the same control carries a different number per product line.

### Four separately priced product lines on one page `[observed]`

`monday work management` (implicit, first block) · `monday CRM pricing` ·
`monday service pricing` · `monday dev pricing`

Each repeats the same seat picker, billing toggle, and tax footnote. The
repetition is the pattern: monday treats the pricing page as four stacked
pricing pages rather than one matrix.

### Tax and final-price disclosure, repeated verbatim four times `[observed]`

> "Prices do not include tax. The price is determined by the user's billing
> country. The final price can be seen on the purchase page before payment is
> completed."

Three separate claims in three sentences: exclusion, determinant, and the
promise of a pre-commitment reveal. Directly comparable to PayPal's
pre-transaction fee-disclosure obligations — worth holding up as a compact model
for "the number you see here is not the number you will pay, and here is where
the real one appears."

### FAQ block — 14 questions, answers now retrieved `[observed]`

| # | Question (verbatim) | Answer shape |
|---|---|---|
| 1 | What are AI credits? | Longest answer on the page. Defines credits, justifies variable pricing ("credits reflect the complexity of each task, meaning you only pay for the work actually done"), then gives a **worked calibration** — a typical 3-person team uses ~800–1,200/month; 1,000 credits ≈ 50 resume screenings, 5 hours of meeting summaries, hundreds of workflow updates. Ends with real-time tracking and self-serve top-up. |
| 2 | Is there a free version of monday.com? | Names who the free plan is for ("freelancers and individual professionals"), then the 14-day Pro trial and which three product lines it covers. |
| 3 | How much does monday.com cost? | Refuses a single number; names the two determinants, the 3-user floor, and the 40-user ceiling above which you must request a quote. |
| 4 | Can you pay for monday.com monthly? | Yes, then immediately advises against it — "The monthly plan is not discounted so if you are looking to save, we recommend the yearly plan." |
| 5 | Which pricing plan is right for me? | Acknowledges variance, points up-page, routes to an article and to sales. |
| 6 | How does our pricing work? | **First person plural in the question** — the only question written from the company's side. Two factors, then payment cadence, then the upfront-installment caveat. |
| 7 | What if I change my mind? | 30-day partial refund on yearly, automatic, self-serve from Admin. |
| 8 | Do you offer any discounted plans? | 18% yearly. |
| 9 | Does monday.com offer plans to nonprofits and NGOs? | |
| 10 | How can I manage my billing? | |
| 11 | Can I change my plan? | States the unfavourable term plainly: "past the refund period, we offer no refunds for downgrades", then the click path. |
| 12 | How secure is monday.com? | ISO/IEC 27001 and 27018 named, annual audits. |
| 13 | What payment methods do you accept? | Enumerates eight card schemes, **excludes debit cards explicitly**, names PayPal, bounds by location, adds Enterprise invoicing with a minimum. |
| 14 | Do you have mobile apps? | |

### Patterns worth extracting

1. **Q1 is the calibration pattern.** For a metered unit the user has no
   intuition for, monday gives a typical monthly consumption *and* converts the
   unit into three recognisable tasks. This is the best answer in the batch to
   "how do you price something the user cannot estimate" — directly applicable
   to any consumption-based or credit-based PayPal product.
2. **Q4 and Q11 argue against the company's short-term interest** — recommending
   the cheaper annual plan, and stating the no-refund-on-downgrade rule without
   softening. Placed inside the FAQ rather than the terms.
3. **Q6 breaks person.** Thirteen questions are the user's; one
   ("How does our pricing work?") is the company's, unremarked. A consistency
   defect, recorded.
4. **Exclusions stated as exclusions.** "excluding debit cards" sits inside the
   accepted-methods answer rather than in a footnote.

### Defect recorded `[observed]`

Plan tier names and per-seat prices render inside a client-side component that
produces no text layer even in the browser pane — the page text jumps from the
billing toggle straight to the tax footnote. So the *prices* on monday's pricing
page are unavailable to text extraction, and by extension to any assistive
technology relying on the accessibility tree in the same way. Flagged as a
suspected accessibility problem requiring an axe-style audit to confirm, not as
a confirmed WCAG failure.

**Corpus note:** this is the same failure class the harvest agent flagged for
Airtable (tier cards client-rendered) and ClickUp (accessible-label prefixes
leaking into the text layer). Three of ten productivity products cannot expose
their own prices as text. That is a finding for the master `content.md`.

---

## 058-klarna.md — Pay in 4 page — **PRIORITY GAP CLOSED**

**Gap closed:** the harvest agent recorded `klarna.com/us/payments/pay-in-4/` as
unrenderable after two attempts, called it "the single most PayPal-relevant
surface in the corpus", and flagged the reconstructed Pay in 4 terms as
**not-to-be-used-as-precedent**. The browser pane rendered the page in full on
2026-09-23. That flag can now be lifted for everything below.

**Source:** https://www.klarna.com/us/payments/pay-in-4/

### Headline and proposition `[observed]`

- H1: `Split the cost. Pay in 4, interest-free.`
- Sub: "Pay in 4 lets you buy now and pay later by splitting your purchase into
  4 interest-free payments¹, offering a simple and flexible way to manage your
  spending."
- CTA: `Shop now` — not "Apply", not "Get started". The credit decision is
  never named as an action the user takes.

The superscript `¹` fires on the *first* use of "interest-free" in the subhead,
which is the correct placement — the qualifier attaches to the claim, not to the
page.

### The four benefit lines `[observed]`

`Split the cost of your purchase.` · `No fees when you pay on time.` ·
`Payments are collected automatically every 2 weeks.` ·
`Get more control over your cash flow.`

Note line 2: **"No fees when you pay on time"** rather than "No fees". The
condition is inside the claim, in the same four words. This is the same
construction PayPal uses well in its fee table (`No Fee (when no currency
conversion is involved)`) and it is the single most portable sentence on the page.

Note line 3 states the mechanic as passive and automatic — "are collected" —
which is honest about who initiates.

### Three-step how-it-works `[observed]`

1. `Choose Klarna at checkout` — "Click on the pink badge and pay with Klarna at your favorite stores."
2. `Make your first payment` — "Choose Pay in 4, and your first payment will be collected when your order is shipped."
3. `No fees when you pay on time` — "The next three payments are automatically charged every 14 days. We'll keep you on track with reminders and updates."

**Step 3 is not a step.** Steps 1 and 2 are user actions; step 3 is a condition
plus a system behaviour, reusing benefit line 2 verbatim as a heading. A user
scanning the numbered list is told what to do, what to do, and then a promise.

Also worth recording: the payment trigger is **shipment, not purchase** ("when
your order is shipped"), stated in both step 2 and the FAQ. And the interval is
written as `every 2 weeks` in four places and `every 14 days` in one — same
period, two units, one page.

### FAQ — six questions, answers now retrieved `[observed]`

| # | Question (verbatim) | Substance |
|---|---|---|
| 1 | How does Pay in 4 work? | Three numbered steps; names the funding instrument ("credit card, debit card or bank account"); trigger is shipment |
| 2 | Who can use Klarna? | Five bulleted eligibility conditions, then a separate `Good to know:` block |
| 3 | Where can I Pay in 4 with Klarna? | Geographic exclusions |
| 4 | What happens if I miss a payment? | The retry mechanic and the fee cap |
| 5 | Does Klarna Pay in 4 affect my credit score? | Opens with `No.` |
| 6 | Is using Klarna Pay in 4 interest free? | Opens with `Yes,` then restates the condition |

**Q4 is the best answer on the page** and closes the corpus's largest BNPL gap:

> "We'll email you if your payment is unsuccessful. We'll also try one more time
> to collect it. If we can't collect it a second time, it will be added to your
> next payment along with a late fee of up to $7.00. The aggregate sum of your
> late fees will never exceed 25% of your order value at the time of purchase."

Five facts in four sentences, in the order the user experiences them:
notification → **retry** → consolidation onto the next instalment → the fee →
the aggregate cap. The retry is the part most BNPL copy omits, and it is the part
that tells the user they have not yet been charged a fee. The cap is stated as a
percentage of a named base ("your order value **at the time of purchase**"),
which forecloses the obvious ambiguity.

The harvest agent's finding that this copy is buried on the *financing* page and
invisible to a Pay in 4 user is **now corrected**: it is present on the Pay in 4
page itself, in the FAQ, as of this date.

**Q5 resolves the credit-reporting direction:**

> "No. We will perform a soft credit check when you use Pay in 4. Soft credit
> checks do not affect your credit score and will not be visible to other
> lenders."

Bare `No.` first word, then the mechanism, then two separate consequences
(score, visibility) stated as distinct facts. **This is the clean version of the
statement that Clearpay UK contradicts itself on** (059 records the same page
saying a soft check both "is visible to other lenders" and "is not visible to
other lenders"). Klarna states it once, unambiguously. Direct paired exhibit.

**Q2's `Good to know:` block** is a structural device worth stealing — it
separates hard eligibility (resident, 18+, valid account, legal capacity,
accurate details, can receive SMS codes) from conditional requirements that only
bite for some products: "A valid Social Security Number (SSN) and a linked card
or bank account **may be required** to use certain Klarna products, such as Pay
in 4…". Five absolutes, then the maybes, visually separated.

**Q3's exclusions** are named rather than gestured at: "available nationwide,
except for Hawaii, US Territories (excluding Puerto Rico), or for customers with
APO/FPO/DPO addresses." The exception-to-the-exception (Puerto Rico) is inline.

### Six numbered footnotes `[observed]`

Klarna runs a numbered footnote system, not asterisks, with each marker bound to
a specific claim:

1. CA Financing Law licence, NMLS # 1353190 — fires on "interest-free" and on Pay in 30 days
2. Visa acceptance, merchant restrictions, virtual-card non-acceptance, physical card gated to a paid membership
3. Apple Pay device and software requirements; **"Use Klarna's plans for a service fee, loans issued by WebBank. Loans not offered by Apple."**
4. Cashback as points, balance account required, issuance "may be affected by cookie settings, combining offers, product exclusions, or other factors beyond our control"
5. Buyer protection exclusions, routed to a URL
6. The APR worked example

**Footnote 6 is the disclosure benchmark on this page:**

> "A $1,000 purchase might cost $173.53 per month over 6 months at 13.99% APR.
> Annual Percentage Rate (APR) ranges from 0.00%-35.99% APR based on
> creditworthiness, term length, and subject to credit approval, resulting in,
> for example, 3 equal monthly payments of $333.33 at 0.00% APR to $353.52 at
> 35.99% APR per $1,000 borrowed. Minimum purchase amount and down payment may be
> required. Estimation of monthly payment excludes potential tax and shipping
> costs. Monthly financing through Klarna issued by WebBank."

A worked example at the midpoint, then the full range, then **both endpoints
worked** so the user can see the spread, then the two exclusions from the
estimate (tax, shipping), then the lender. This is the same quality as PayPal's
Pay Monthly three-example disclosure — and it sits under a Pay in 4 page whose
own instalment total is never worked at all.

**Footnote 3 is the best single compliance sentence:**
`Loans not offered by Apple.` Four words, pre-empting the exact wrong inference a
user makes when a credit product appears inside Apple Pay.

### Adjacent product framing `[observed]`

- `Pay in full today` — "Every eligible Klarna transaction comes with buyer protection and advanced fraud prevention.⁵"
- `Pay in 30 days` — "Shop now and get the flexibility to pay up to 30 days later, with no late fees or interest when you pay on time. **Pay only for what you keep.**¹"
- `Pay over time` — "Spread the cost over 3–24 months. Best for bigger purchases like travel, tech or home. **Interest may apply.**⁶"

`Pay only for what you keep.` is the returns-aware line — it tells a user that
returning an item reduces what they owe, which is the single most common BNPL
anxiety. `Interest may apply.` as the closing sentence of the third card is the
only place on the page where interest is admitted without a qualifier attached.

### Defects recorded `[observed]`

- `Pay in 4 is is currently available nationwide` — doubled verb in FAQ Q3.
- `every 2 weeks` (×4) vs `every 14 days` (×1) on one page.
- Step 3 of the how-it-works is a condition, not a step, and duplicates a benefit line verbatim.
- The Pay in 4 instalment amount is **never worked through** anywhere on the Pay in 4 page, while the financing product gets three worked figures in footnote 6. The simpler product gets the weaker disclosure.

### Corpus actions

1. **Lift the not-to-be-used-as-precedent flag** on Klarna Pay in 4 terms.
2. `content.md` §9 ("Regulation, not editorial capability, sets the disclosure
   floor") should be read with this correction: Klarna's US late-fee numbers
   *are* on the Pay in 4 page. The Afterpay UK-vs-US contrast in that section is
   unaffected and stands.
3. Pair Klarna Q5 against Clearpay UK's self-contradiction (059) as a
   before/after exhibit on soft-credit-check wording.

---

## 045-cashapp.md — help centre IA — **BLOCKED SURFACE RECOVERED**

**Gap closed:** the harvest agent recorded `cash.app/help` and all article URLs
as client-rendered Next.js shells with no server HTML, and recovered article
titles only from a search index, labelled as such. The browser pane rendered the
help home on 2026-09-23.

**Source:** https://cash.app/help

### Help-centre structure `[observed]`

Header: `How can we help?`
Then: `Personalized help is one step away` / "Log in to get articles and support
suggestions specific to your account." → `Log in`

Same ordering as Wise (041): personalisation offered first, self-service second,
human contact last. Three products in the FIN domain now share this exact shape.

### `Popular Topics` — ten items, verbatim, in published order `[observed]`

| # | Title |
|---|---|
| 1 | Protecting You from Social Engineering Attacks |
| 2 | How Do I Access an Old Account? |
| 3 | Where is my Withdrawal? |
| 4 | What is a $Cashtag? |
| 5 | How Do I Cancel a Payment? |
| 6 | My Payment was Canceled |
| 7 | My Cash App Card was Lost or Stolen |
| 8 | Recognize and Report Phishing Scams |
| 9 | Keeping Your Cash App Secure |
| 10 | CFPB Consent Order |

**Four of ten are security or fraud** (1, 7, 8, 9), and position 1 is a scam
article. For comparison, Canva's equivalent front-door row leads with tasks and
Wise's leads with topics. Cash App's front door leads with "someone may be trying
to trick you."

**Position 10 is remarkable.** `CFPB Consent Order` — a regulatory enforcement
action, published as a Popular Topic in the consumer help centre, with no
euphemism in the title. Most products would place this in a legal annexe if they
published it at all. Recorded as a finding, not endorsed: a consent order is
typically required to be communicated, so the disclosure may be obligatory rather
than voluntary. The *placement* is still a choice.

**Position 3 is the Wise pattern, independently arrived at:**
`Where is my Withdrawal?` — the user's anxious question, with a question mark, as
a title. Wise's is `Where is my money?` as a whole category. Two unrelated
fintechs converging on the same interrogative shape is evidence the pattern is
right.

**Positions 5 and 6 are the intent pair:** `How Do I Cancel a Payment?`
(I want to) and `My Payment was Canceled` (it happened to me). Same event, two
directions, two articles, adjacent. That adjacency is the good bit — a user
scanning does not have to know which of the two situations they are in before
they find their article.

**Title-case drift, recorded:** `How Do I Access an Old Account?` (title case) ·
`Where is my Withdrawal?` (sentence case with a capitalised noun) ·
`My Cash App Card was Lost or Stolen` (mixed). Three casing conventions in ten
titles.

### `Browse` — thirteen categories `[observed]`

`Receiving a Payment` · `Sending a Payment` · `Add Money` · `Withdraw` ·
`Cash App Card` · `Account Settings` · `Cash Offers` · `Bitcoin` ·
`Direct Deposit` · `Investing` · `Cash App Taxes Help Center` ·
`Tax Reporting for Cash App` · `Sponsored Accounts Overview`

**Grammatical inconsistency across one list:** two gerund phrases
(`Receiving a Payment`, `Sending a Payment`), two bare imperatives
(`Add Money`, `Withdraw`), and nine noun phrases. Wise's six help categories are
uniformly gerunds; Cash App's thirteen use three shapes.

`Withdraw` is also the only single-word category and the only one that is a verb
with no object, sitting directly beneath `Add Money` which has one.

Two separate tax categories (`Cash App Taxes Help Center`,
`Tax Reporting for Cash App`) with no scope line to distinguish them — one is a
product, one is a topic, and nothing on the page says which is which.

### `Contact us` — channel copy `[observed]`

- `Start a Chat` — "Open your mobile app to chat 24/7"
- `Call us at (800) 969-1940` — "Available daily, 8 AM-9:30 PM ET"

The chat CTA is on the **web** page and instructs the user to leave it for the
app. The hours are stated with the timezone, which the corpus found is often
omitted. `24/7` for chat against bounded hours for phone, both stated where the
user chooses.

### Corpus action

Update `products/045-cashapp.md`: the help-centre IA, the ten Popular Topics and
the thirteen Browse categories can move from search-index-derived to
`[observed]`, sourced to https://cash.app/help, 2026-09-23.

