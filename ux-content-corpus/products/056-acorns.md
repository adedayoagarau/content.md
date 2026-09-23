# 056. Acorns

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Micro-investing / round-ups — subscription robo-adviser with bundled neobank and kids' money app |
| Primary URL | https://www.acorns.com/ |
| Corpus rank | 056 |
| Benchmark strength (source list) | Novice investing guidance |
| Locale / market observed | en-US only (no locale switcher present) |
| Platform observed | Web (desktop marketing site), Zendesk-style help centre, legal/disclosure pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **SEC-registered investment adviser** (Acorns Advisers, LLC). Brokerage via Acorns Securities, LLC — SEC-registered broker-dealer, **Member FINRA/SIPC**, SIPC coverage to $500,000. Banking is *not* Acorns: "Acorns is not a bank" — deposits issued by Lincoln Savings Bank or nbkc bank, Members FDIC, with pass-through/deposit-network structure. Standard SEC triple-negative legend used throughout: `NOT FDIC INSURED, NOT BANK GUARANTEED, and MAY LOSE VALUE`. Form CRS, Wrap Fee Brochure, and FINRA BrokerCheck all linked from every page footer. Third-party benefits (tax filing, wills, life insurance) disclaimed to April, Trust & Will, and Avibra. |
| Harvest date | 2026-09-21 |
| Pages inspected | 6 |
| Harvest completeness | Partial — marketing, pricing, disclosures, and accessibility fully captured. Help-centre **category names and 20 featured article titles** captured from the support index, but individual help articles and their bodies were not opened. All in-product states (portfolio screens, Round-Ups ledger, errors, empty states) are behind auth. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.acorns.com/ | Hero, product carousel, "Why Acorns" block, Potential calculator, testimonials, full disclosure footer |
| Plans & Pricing | https://www.acorns.com/pricing | Three tiers, needs-based tier selector, per-feature accordions, APY explainer modal |
| Help Center home | https://support.acorns.com/ | 8 category names with scope lines, 20 featured article titles |
| Important Disclosures | https://www.acorns.com/important-disclosures/ | 40 numbered disclosures in 5 sections; "The Fine Print of Acorns" index of ~50 legal docs |
| Accessibility Statement | https://www.acorns.com/accessibility/ | Two-heading page, last updated 2020 |
| Acorns Invest (product) | https://www.acorns.com/invest/ | Round-Ups mechanics, ETF explainer, Custom Portfolios explainer, 3-question FAQ |

---

## T1 Navigation & IA labels

**Global nav is split by *who the money is for*, not by product type** `[observed]`

Two dropdowns: `For You` and `For Your Family`. Inside each, every item is a **verb phrase over a noun gloss** — a two-line label where line 1 is the job and line 2 is the account type:

| Label (line 1 — the job) | Gloss (line 2 — the instrument) |
|---|---|
| `Invest for every day` | `Brokerage account` |
| `Invest for retirement` | `IRA account` |
| `Bank smarter` | `Checking & savings` |
| `Automate your money` | `Money Manager` |
| `Earn bonus investments` | `Cashback invested` |
| `Invest for your kids` | `UGMA/UTMA` |
| `Build kids' money skills` | `Debit card & learning app` |

This is the single most transferable IA decision in the file. Acorns never makes a novice choose between "UGMA/UTMA" and "Brokerage account" as primary labels — the jargon is demoted to a subtitle where it functions as *confirmation for people who already know the term* and is safely ignorable for people who do not. `Cashback invested` as the gloss for `Earn bonus investments` is doing particularly hard work: it pre-empts the "is this real money I can spend?" question in two words.

Flat nav items: `Plans & Pricing` · `Our Pledge` · `Learn` · `Support` · `Log in` · `Get started`.

**Footer groupings** `[observed]`: `Products` · `Who we are` · `Why start now`. The third is a heading written as a *user motivation* rather than a content type, and it contains exactly one link (`Learn`). A one-item category named as a persuasion beat.

Footer product links repeat the two-line pattern, bolding the brand word: `**Invest** for your future`, `**Later** starts today`, `**Earn** extra money`, `**Early** investors`, `**Bank** smarter`. Note `Later starts today` — a deliberate paradox used as a link label.

**Help centre — 8 categories, each with a scope sentence** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting Started` | "Learn about the Acorns platform." |
| `Account Management and Login` | "Everything you need to know about your Acorns account and log in, including how to reset your password." |
| `Round-Ups® and Linked Accounts` | "Step-by-step articles on setting up and how Round-Ups® work, and linking bank accounts." |
| `Investing With Acorns` | "Articles you can use regarding your investment (Acorns Invest), retirement (Acorns Later), and custodial (Acorns Early) accounts." |
| `Acorns Banking (Checking, Emergency Fund, Mighty Oak Card)` | "Step-by-step articles on the most common questions about your Acorns Checking account, Mighty Oak Card, Emergency Funding, setting up direct deposit, paycheck split and more." |
| `Earn Rewards, Referrals, and Promotions` | "Everything you need to know about referral bonuses, Earn Rewards, finding jobs, and more." |
| `Account Statements and Tax Forms` | "Learn how to access your account statements, tax forms, and confirmations." |
| `GoHenry` | "Learn more about GoHenry and how to take advantage of this unique platform." |

Two things worth flagging. The registered-trademark symbol is carried into the **category label itself** (`Round-Ups®`), which is unusual — most products drop the ® in navigation. And the banking category name carries a **parenthetical product list inside the category name**, which is a symptom of sub-brand proliferation the IA hasn't absorbed (`Acorns Banking (Checking, Emergency Fund, Mighty Oak Card)`). Compare the clean gerund categories elsewhere.

`GoHenry` sits as a top-level help category with no explanation of its relationship to Acorns — a legacy-acquisition seam visible in the IA.

## T2 Value proposition & headline patterns

**Hero — the verb pair, not the differentiator** `[observed]`

> Headline: `Acorns helps you save and invest`
> Subhead: "Grow your savings, invest your spare change, and build toward your future — automatically."

The headline is a plain declarative sentence naming the company as the subject and the user as the object. No metaphor, no number, no claim. The subhead carries the mechanism (`spare change`) and the single differentiator (`automatically`), set off by an em-dash as its own beat.

**"Automatically" is the load-bearing word across the entire site** `[observed]`. It recurs as: `automatically` (hero), `Automatic Recurring Investments`, `Automatic Portfolio Rebalancing`, `Automatic Dividend Reinvesting`, `Automatic splits`, `easy and automatic`, `Easy and automatic saving and investing`, `automated allowance`, `on autopilot`. The `Automatic -` word is even rendered as a scrolling marquee on the Invest page. This is a product whose value proposition is the *absence of user decisions*, and the copy is built to make inaction feel like progress.

**Section headers are user-anxiety rebuttals** `[observed]`

- `Money tools for every stage of life` — answers "is this for someone like me?"
- `Easy and automatic saving and investing` — "No confusing charts or investing tools."
- `All-in-one money app` — answers fragmentation
- `Invest wisely, not wildly` — answers the meme-stock frame
- `Security as strong as oak` — the brand metaphor deployed on trust
- `No hidden fees. No commissions.` — a headline made of two negations

`Invest wisely, not wildly` is the standout. It positions against a *competitor behaviour* (retail day-trading) rather than a competitor company, in four words, without naming anyone. Its supporting line — "It takes more than money to grow — money skills matter, too" — converts a product limitation (you cannot pick stocks) into a pedagogical virtue.

**Pricing headline is a claim of simplicity, hyphen-broken** `[observed]`:
`Simple, / transparent plans.` followed by a paragraph ending "No hidden costs or transaction fees — just one, transparent monthly payment to start growing your oak."

**The oak metaphor is a consistent, bounded system** `[observed]`: `Grow your oak!` (CTA block), `growing your oak` (pricing), `Security as strong as oak`, `Mighty Oak Card`, `Acorns`, `Round-Ups`. Crucially, the metaphor is **absent from every disclosure and every fee statement** — the register flattens completely below the fold.

**Product sub-brand naming follows a strict `Acorns + [time/role word]` pattern** `[observed]`:
`Acorns Invest` · `Acorns Later` · `Acorns Early` · `Acorns Earn` · `Acorns Learn` · `Acorns Checking` · `Acorns Money Manager`. Six of seven are single syllables. `Later` = retirement. `Early` = kids. The temporal pair carries the whole family-lifecycle story without an explainer.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav, hero, several product cards | Primary acquisition verb |
| `Get the app` | Mobile-nav slot and sticky footer | Different label for the *same* destination as `Get started` |
| `Sign up today` | Pricing tier cards, end-of-page CTA | Urgency adverb appended |
| `Log in` | Global nav | |
| `Learn more` | Product carousel (×11), Round-Ups block | **Bare `Learn more`, repeated 11+ times.** See note below |
| `Support` | Global nav | |
| `Contact support` | Above footer, under `Have any questions?` | |
| `Find my subscription` | Pricing tier selector submit | First-person possessive — the user speaking, not the system |
| `Reset selections` | Pricing tier selector | |
| `Show my potential` | Calculator submit | First person again |
| `Want Acorns Early only?` | Gold tier card | A question used as a CTA, offering the *unbundled* option mid-pricing-table |
| `Read our ETF prospectuses` | Invest page, ETF section | Names the compliance artefact as a user choice |
| `Terms apply.` | Under Later Match offer | A disclosure rendered as a link |
| `TAP HERE` | Site-wide promo ribbon | All-caps imperative |
| `Copy link` / `Share` | Potential calculator result | Social amplification of a projection |

**Observation — the bare `Learn more` problem.** Acorns ships `Learn more` as the CTA on eleven consecutive carousel slides, each for a different product. Because the slides are a carousel, screen-reader and keyboard users encounter eleven identically-labelled links with no programmatic distinction from the adjacent heading. This is the clearest accessibility-adjacent content defect on the site and the direct opposite of the Wise pattern (`Learn more about sending large amounts`). Recorded as a **negative benchmark**.

Against that, `Find my subscription` and `Show my potential` are genuinely good: both are written in the **user's first person**, so the button completes the sentence the user is already thinking.

## T4 Onboarding & getting-started

**Round-Ups explained as a three-line mechanism with worked arithmetic** `[observed]`

On the Invest page, under `Invest your spare change with Round-Ups®`:

1. `Link all of your credit or debit cards`
2. `We'll set aside your spare change from every purchase`
3. `And invest the change once it reaches at least $5`

Three imperatives, each a single clause, with the **subject alternating between "you" and "we"** — the user does step 1, Acorns does steps 2 and 3. That split is the onboarding promise made structural.

Step 3 states the $5 threshold **in the onboarding copy itself**, not in a footnote. This is the mechanic most likely to generate a "where's my money?" support contact, and Acorns front-loads it.

**Worked examples with real prices carry the concept** `[observed]`, from the pricing page:

> "$2.50 fries? That's $0.50 invested. $7.25 sandwich? That's $0.75 invested."

Two examples, both under $10, both food, both with the arithmetic already done. The rhetorical shape is `[price] [item]? That's [amount] invested.` — a question-answer pair that models the user's own mental calculation. Then the aggregate: "All together, Acorns customers have invested over $7,300,000,000 in spare change alone!" — the number written **in full digits rather than "$7.3 billion"**, so the zeros do the work.

**The needs-based tier selector is the best onboarding artefact on the site** `[observed]`

Pricing page opens with `I want Acorns to help me...` and `(select all that apply)`, followed by 14 multi-select options, all written as **lowercase verb phrases completing the stem sentence**:

`invest easily` · `invest for my retirement` · `invest for my family` · `invest in companies & ETFs I like` · `invest my spare change` · `bank smarter` · `save for emergencies` · `get smarter with money` · `manage my money` · `participate in live money Q&As` · `teach my kids about money` · `get my kids their own debit card` · `manage my kids' allowance & chores` · `get life insurance` · `plan my will`

Submit: `Find my subscription`.

Two design decisions worth stealing. First, the options are **lowercase because they are sentence continuations, not labels** — typographically signalling that the user is completing a thought. Second, the whole widget is immediately bounded: "This tool is provided for educational purposes only and is not a recommendation of any account type or investment strategy." A recommendation engine that disclaims being a recommendation, placed directly beneath it rather than in the footer.

Preamble: "Not sure which subscription is right for you? Let us help you decide!" — the only exclamation mark in the pricing flow.

## T5 Form & field labels

**Potential calculator — the primary pre-auth interactive** `[observed]`

| Label | Notes |
|---|---|
| `Initial deposit` | Prefixed `$` |
| `Contributions` | Prefixed `$`, paired with a frequency toggle |
| Frequency toggle | `Annual` · `Monthly` · `Weekly` · `Daily` |
| `Years to Invest` | Suffixed `years` — unit repeated outside the field |
| `Average annual return` | Suffixed `%` |
| Submit | `Show my potential` |
| Result label | `Potential Future Balance:` |

The result label uses `Potential` twice (feature name and modifier) plus `Future` — three hedges stacked into a four-word label. Redundant as English, defensible as compliance.

**Share-state microcopy** `[observed]`: `Share Copied!` with a checkmark icon; options `Copy link`, `Twitter`, `Facebook`. Note `Twitter` is still the label while the footer icon has been updated to X — a **stale-label inconsistency** between two surfaces of the same page.

Full field inventory for account opening is behind `signup.acorns.com` and was not entered. `[absent]`

## T6 Status & state language

Almost entirely `[documented]` rather than observed, and thinner than the category deserves.

**Account states named in help article titles** `[observed]` on the support index:
- `My account is locked, how do I get it unlocked?` — `locked` is a first-class state with its own recovery article
- `How do I get my 1099 tax form when my account is closed?` — `closed` is a state that still has user needs attached, and Acorns wrote for it

**Money-movement states named in disclosures** `[documented]`:
- `Pending Round-Ups®` — the accumulation state before the $5 threshold fires
- "Real-Time Round-Ups® investments accrue instantly for investment during the **next trading window**" — `trading window` is the settlement-latency concept, named but not defined for the user
- "Custom portfolios are **not instant trading**" — a negation used as a state description, followed by a routing sentence: "Clients wanting more control over order placement and execution may need to consider alternative investment platforms"

That last line is notable. In a disclosure, Acorns tells a segment of its prospective users to **go somewhere else**. That is a rare and honest piece of expectation-setting, and it is the kind of sentence a content designer can point at when arguing for naming a product's limits.

**Match states** `[documented]`: the Later Match and Early Invest Match both have a hold period and a clawback, expressed as `subject to recapture`. `recapture` is an accounting term surfaced directly to consumers with no gloss — a terminology miss.

**Timing language inventory** `[observed]`: `instantly` · `in minutes` · `real-time` · `every time you make a purchase` · `each time you get paid` · `up to 2 days earlier than the scheduled payment date` · `during the next trading window`. The last two are the honest ones, and both live in footnotes rather than in the benefit copy.

## T7 Error, failure & recovery

`[documented]` only — no error states are reachable pre-auth.

**Recovery articles surfaced in the help centre's featured list** `[observed]`:
- `My account is locked, how do I get it unlocked?`
- `How can I reset my password?`
- `Why did I not receive any tax forms from Acorns this year?`
- `How do I get my 1099 tax form when my account is closed?`

The title grammar here is `[problem statement], [how do I fix it]?` — a **comma-joined compound** (`My account is locked, how do I get it unlocked?`) rather than either a clean question or a clean first-person confession. It is a comma splice, and it is consistent, so it is a house style rather than an error. It reads less sharply than the Wise `I <did wrong thing>` pattern but does put the symptom first, which is what search needs.

`Why did I not receive any tax forms from Acorns this year?` is a **negative-expectation article** — written for the user whose problem is that nothing happened. Products routinely fail to write these.

**The only failure-mode copy on the public marketing surface** `[observed]` is a disclosure, not UI:

> "If you do not maintain an adequate amount of funds in your funding source sufficient to cover your Round-Ups® investment, you could incur **overdraft fees with your financial institution**."

Acorns names a harm caused by its own core feature and attributes the fee to a third party. Correct and necessary; buried at disclosure 12 of 40.

**Market-downturn copy is the closest thing to an emotional-recovery state** `[observed]`, on the Invest page FAQ:

> `What should I consider when the market is down?`

The answer leads with the portfolio's design intent, then an italicised `*Remember:*` block, then routes to three `Learn` articles. It ends by immediately bounding its own reassurance: "Past performance does not guarantee future results." A reassurance-then-caveat pattern that is worth copying for any product that has to write during adverse conditions.

## T8 Empty states

`[absent]` — every empty state is post-auth. The Potential calculator's pre-submit state shows the placeholder `$XX,XX5` in the result slot, which is a **masked-value placeholder rather than an empty state**, and an odd one: five characters with a real digit in the final position.

## T9 Notifications & system messages

`[observed]` — two site-level banners:

**Promotional ribbon**, pinned above the header on every page:
> `Lost a bet? Want it back? TAP HERE — we'll match it up to $50 and invest it for you.`

Two questions, an all-caps imperative, an em-dash, then the offer with its cap inline. `up to $50` is bounded in the banner itself rather than in the linked terms.

**APY-change explainer modal** `[observed]`, triggered from the pricing table's asterisk:
> `Why is APY subject to change?`

The body explains Federal Reserve rate mechanics in two sentences without jargon ("the USA's central bank" glossed inline). This is a strong pattern: rather than only disclaiming `* APY subject to change`, Acorns ships a **tap-to-understand explanation of why the disclaimer exists**. The disclaimer becomes an education surface.

In-product notification copy is `[documented]` only via feature names: `real-time alerts`, `real-time spending notifications`, `due date reminders`.

## T10 Disclosures, legal & compliance

The strongest and most structured category, and the one with direct PayPal transferability.

**The fee model is stated as a flat monthly price, and the small-balance problem is never addressed in the marketing copy** `[observed]`

Three tiers, each with a one-line positioning sentence:

| Tier | Price | Positioning line (verbatim) |
|---|---|---|
| `Acorns Bronze` | `$4/mo.` | "Investing tools to get you started on your financial journey." |
| `Acorns Silver` | `$8/mo.` | "Level up your saving and investing skills with even more tools." |
| `Acorns Gold` | `$12/mo.` | "Full suite of saving, investing, and learning tools for you and your family." |

This is the file's most important finding for a content designer. **A flat $4/month fee on a $100 balance is a 48% annual drag, and nowhere in the marketing copy is that arithmetic surfaced.** The only place the subscription fee is connected to returns is inside the Potential-calculator disclaimer:

> "Does not include Acorns' monthly subscription fees (min $4/mo), which would reduce returns over time"

That sentence is doing the entire job of disclosing the central economic risk of the product, and it appears in 9pt grey beneath a tool designed to project growth. Record as a **negative benchmark**: the disclosure is technically present, accurate, and placed exactly where it cannot influence the decision.

Contrast the *framing* of `No hidden fees. No commissions.` as a headline. Both statements are true. Together they produce a mental model in which the fee is small.

**The advisory-fee unbundling is disclosed with unusual precision** `[observed]`, disclosure 28:
> "Managed accounts with greater than $0 as of the subscription fee date are subject to a **$0.10 advisory fee**, paid in arrears and allocated to Acorns Advisers by Acorns Grow from the Subscription Fee. **The total Subscription Fee will be the same regardless of whether an advisory fee is charged.**"

The second sentence is the user-facing one and it is well written: it pre-empts "am I being charged twice?" before the question forms. A regulatory internal-allocation detail converted into a reassurance.

**Disclosure architecture — five named sections, forty numbered items** `[observed]`

`I. Banking` · `II. Investment Products (Acorns Invest, Acorns Later, and Acorns Early Invest)` · `III. Acorns Early App` · `IV. Rewards, Partners & Fees` · `V. Statistics & Rankings`

Section II is further sub-divided: `II.A. Products & Portfolios`, `II.B. Round-Ups® & Automated Features`, `II.C. Acorns Early Invest (Custodial Accounts)`, `II.D. General Market Risks, Definitions & Hypotheticals`.

The numbering is the point. Footnote markers across the marketing pages (`3`, `4`, superscripts) resolve to these numbers, so the disclosure page functions as an **addressable reference table** rather than a wall. Section V existing at all — a separate numbered home for every statistic and award claim, each with an "as of" date — is a genuinely reusable pattern for any product whose marketing carries stats.

**Page title for the legal index is written in brand voice** `[observed]`: `The Fine Print of Acorns`. Roughly 50 documents listed, overwhelmingly promotion terms. Worth noting that a user looking for the Program Agreement must scroll past ~30 promotional T&Cs to reach it — **findability of the substantive legal documents is degraded by the promotional ones sharing the index.**

**Standard legends, verbatim** `[observed]`:
- `Investing involves risk, including the loss of principal.`
- `NOT FDIC INSURED, NOT BANK GUARANTEED, and MAY LOSE VALUE.`
- `Past performance is no guarantee of future results.` (disclosure 18)
- `It is not possible to invest directly in an index.` (disclosure 18)
- `Acorns is not a bank.` — bolded, leading the banking section, and repeated as `Acorns Early is not a bank.`

The **"state what you are not, first"** pattern (seen in the Wise exemplar) is present here too: the banking disclosure opens with the negation before describing the sponsor-bank structure.

**Conflict-of-interest disclosure is written in plain, almost uncomfortable English** `[observed]`, disclosures 26 and 29:

The substance, summarised: Acorns is paid by the brands in Acorns Earn; that payment gives Acorns a reason to promote those brands over ones that pay it nothing; this may mean a non-partner's product is better for you; you do not have to buy anything. Two near-identical disclosures say this twice, once for Earn and once for general promotions.

The closing sentence in both — "Customers are not required to purchase any products and services Acorns promotes." — is the transferable bit. A conflict disclosure that ends by telling the user what they are free *not* to do.

**Hypothetical-return boilerplate is bounded in four moves** `[observed]`, disclosure 22/23. The pattern, in order: state the assumptions → name the variables that change the result → exclude the fees → deny predictive value → deny the specific number. The final clause — "No guarantee investment return will achieve 8% or any annual returns" — negates both the figure used and the category.

Disclosure 23 additionally confesses the arbitrariness of its own input: "8% annual return was selected as an arbitrary figure to show the potential of long-term investing" and "Actual customers will achieve investment results **materially different** from those portrayed." Calling your own illustration arbitrary is rare.

**Renaming disclosed as a numbered item** `[observed]`, disclosure 31:
> "On August 21, 2024, Acorns changed the names of its Subscription Plans from "Personal," "Personal Plus," and "Premium" to "Bronze," "Silver," and "Gold." No other changes were made to the Subscription Plans at that time."

A product-naming migration given a permanent disclosure slot, with an explicit "nothing else changed" clause. Any product that renames tiers should copy this — it is the single sentence that stops a support queue.

However, the **help centre has not caught up**: featured articles still read `What are the benefits of the Premium Tier Price Changing to $12?` and `What are the benefits of the Personal Plus Tier Price Changing to $6?`, using the retired names *and* a $6 price that does not match the current $8 Silver tier. A visible content-ops debt on the most prominent help surface.

**Regulatory routing links, present in every page footer** `[observed]`:
`Acorns Wrap Fee Brochure` | `Form CRS` | `FINRA's BrokerCheck` | `Unaudited Statement of Financial Condition as of June 30, 2026` | `Audited Statement of Financial Condition as of December 31, 2025` | `Business Continuity Plan`

Naming the financial statements with their **as-of dates in the link text** is good practice — the user knows the vintage before clicking.

## T11 Help-centre architecture

Single-level: 8 categories → article lists, plus a flat `Featured Articles` list of 20 on the index. Search prompt: `Ask us anything!`

**Featured-article composition is a live diagnostic of the support load** `[observed]`. Of the 20 featured titles, the clustering is:
- Pricing changes (4): `What are the benefits of the Premium Tier Price Changing to $12?`, `Why is the Premium Tier Price Changing to $12?`, and the matching pair for Personal Plus at $6
- Later Match (5): `What is Later Match?`, `How does Later Match work?`, `How do I get a Later Match?`, `What contributions count toward Later Match?`, `Can I withdraw IRA matches from my Acorns Later retirement account?`
- Tax forms (5): `Will I be provided with the proper tax forms?`, `What is a 1099-DIV/B tax form?`, `Why did I receive a 1099 tax form?`, `Why did I not receive any tax forms from Acorns this year?`, `How do I get my 1099 tax form when my account is closed?`
- APY / Mighty Oak (4)
- Access recovery (2)

Two observations. The price-change cluster pairs `What are the benefits of X?` with `Why is X?` — Acorns writes **a benefit article and a justification article as a matched set** for every unpopular change. That pairing is worth copying: the "why" article absorbs the complaint, the "benefits" article gives the retention argument, and neither has to do both jobs.

The tax cluster covers all four quadrants — got one and confused, didn't get one, got the wrong kind, account closed. Complete coverage of a seasonal failure mode.

**Article-title grammar — four shapes** `[observed]`:

| Shape | Example |
|---|---|
| `What is X?` | `What is Later Match?` |
| `How do I …?` | `How do I get the Mighty Oak Card?` |
| `Why …?` | `Why did I receive a 1099 tax form?` |
| `[Symptom], how do I …?` | `My account is locked, how do I get it unlocked?` |

The fourth is the house idiosyncrasy — comma-spliced symptom-plus-question.

## T12 FAQs

FAQs are **distributed per product page** rather than centralised. Three placements observed.

**Invest page — heading `Frequently asked`** (not "asked questions"; the noun is elided) `[observed]`:

| # | Question (verbatim) |
|---|---|
| 1 | Where is my money invested? |
| 2 | How do I choose an Investment Portfolio? |
| 3 | What should I consider when the market is down? |

Only three questions, and the selection is telling: *what am I holding* → *how was it chosen* → *what do I do when it falls*. Q1's answer names the five `Acorns Core portfolios`, glosses ETF in one clause ("An ETF is made of broad holdings of stocks and/or bonds"), then lists ~22 named funds with direct prospectus links. Q2's answer discloses the inputs to the recommendation (`age, time horizon, income, goals, and risk tolerance`) and then adds an unprompted tax warning about switching. Q3 is the behavioural-coaching one described in T7.

Answering "where is my money invested?" with a full ticker list *and* live prospectus links, on a marketing page, for a product whose whole pitch is not having to think about this — that is a deliberate trust move.

**Pricing page** carries no FAQ; the accordions are feature descriptions instead. **Homepage** carries no FAQ.

**Pricing page accordion structure** `[observed]`: each tier expands into named benefit groups — `Investing`, `Banking`, `Earning`, `Learning`, plus Gold-only `Money Manager`, `Acorns Early money app & debit card`, `Exclusive Acorns Gold benefits`. Gerund category names for the first four, noun phrases for the Gold-only ones. Exclusivity is marked inline with a trailing tag: `Gold plan exclusive`, `Gold subscription exclusive`, `Silver and Gold subscription exclusive`, `Available with Acorns Gold.` — **four different phrasings of the same concept on one page.** Recorded as an inconsistency.

## T13 Terminology & glossary

| Term | Acorns' usage | The alternative it rejected |
|---|---|---|
| `Round-Ups®` | Trademarked, used as the feature noun and in the help category name | "spare change investing", "micro-investing" |
| `Real-Time Round-Ups®` | Separately trademarked for the debit-card variant | "instant round-ups" |
| `Invest the Change` | Registered trademark, largely retired from live copy | |
| `Invest Spare Change®` | App-icon tagline | |
| `Acorns Later` | Retirement | "IRA", "retirement account" — both demoted to nav glosses |
| `Acorns Early` | Kids | "custodial", "UGMA/UTMA" — demoted to nav gloss |
| `Potential` | The projection feature, capitalised as a product noun | "calculator", "projection", "forecast" |
| `Base Portfolio` / `Custom Portfolio` | The two halves of a split Invest account | "core" vs "satellite" (the industry terms) |
| `Acorns Core portfolios` | The five expert-built allocations | note: `Core` used here but `Base` on the split-portfolio explainer — **two words for the adjacent concept** |
| `Money Manager` | The paycheck-splitting engine | "budgeting", "allocation" |
| `Paycheck split` | Lowercase, descriptive | "direct deposit allocation" |
| `Milestones` | Progress markers in Money Manager | "goals" |
| `Mighty Oak Card` | The checking debit card | |
| `Emergency Savings` | Capitalised as a product | "high-yield savings" |
| `bonus investments` | Cashback paid as securities | "cash back", "rewards" — deliberately avoided |
| `Money Missions` | Kids' education modules | "lessons", "courses" |
| `expert-built` | The recurring adjective for portfolios | "professionally managed" |
| `grow your oak` | The lifecycle metaphor | |
| `recapture` | Match clawback (disclosures only) | **unglossed jargon** |
| `trading window` | Settlement latency (disclosures only) | **unglossed jargon** |

**Register split.** Marketing says `Acorns Later`; disclosures say `an Individual Retirement Account (either Traditional, Roth or SEP IRA)`. The nav's two-line label is the bridge between the two registers, and it is the reason the split works rather than confusing.

**`bonus investments` over `cash back`** is the sharpest terminology choice on the site. It is accurate (the reward is securities, not cash), it reinforces the product thesis, and it pre-empts a withdrawal expectation. Directly transferable to any rewards programme that pays in something other than spendable cash.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, and the company is an *active* agent in the benefit copy: "we'll recommend", "We'll adjust your Base portfolio", "We'll put our money into your future", "we do the hard part for you". In the disclosures the voice switches to third person and the passive ("Investment products and services offered by Acorns Advisers, LLC"). A clean two-register split.

**Register gradient.** Colloquial and warm above the fold (`Grow your oak!`, `life's unexpected hiccups`, `Acorns-easy`, `Money doesn't grow on trees`, `Invest wisely, not wildly`), completely flat in the disclosures. `Acorns-easy` is a coined compound adjective. `life's unexpected hiccups` is the tone applied to an emergency fund — arguably too light for the use case, since the events it euphemises are job loss and medical bills.

**Numbers as trust devices, all dated** `[observed]`: `over 16 million all-time customers`, `over $33 billion invested since inception`, `over $7,300,000,000 in spare change alone`, `55,000+ fee-free ATMs`, `450+ in-app partner brands`, `11,000+ partners`, `over 1.2 million children served`, `$55` average monthly Round-Ups per customer. Every one carries an "as of" date in Section V. The `$7,300,000,000` full-digit rendering is a deliberate scale device used once.

**Testimonial disclosure is the most rigorous element of the tone system** `[observed]`. Every one of the nine testimonials carries, immediately below it:

> "Customer received $5,000, which provides incentive to recommend Acorns and therefore all opinions within material may be biased.
> Testimonials not representative of all customers and are not guarantees of future performance or success."

The payment amount is stated (`$5,000`, and `$15,000` for one), the **mechanism of bias is named** ("provides incentive to recommend"), and the conclusion is drawn for the reader ("may be biased"). Most products disclose "compensated endorsement" and stop. Acorns walks the reader through why that matters. This is a directly transferable pattern for any incentivised-review surface.

**Accessibility content** `[observed]`

- A public `Accessibility Statement`, linked from the footer of every page, with two headings: `Our Commitment to Accessibility` and `Need Assistance or Have Feedback?`
- Reporting route: email with `"Disabled Access"` in the subject line
- The honesty line: "We can't promise that we'll make the changes you suggest, but we can assure you that we take your input seriously" — candid, and unusual in an accessibility statement
- A third-party accessibility-widget icon (EqualWeb) sits in the footer with alt text `Wheelchair icon`

**Accessibility gaps, recorded honestly:**
- **The statement is dated `Updated April 13, 2020`** — six years stale at harvest, and it names **no conformance standard at all**. No WCAG version, no level, no audit. Compare Lemonade (060), which names WCAG 2.2 AA and the EAA. This is the weakest accessibility statement in the FIN batch.
- No `Skip to content` link found in the page source of any page inspected
- Alt text is largely functional but repetitive and template-generated: `Image of Acorns Later`, `Image of Round-Ups®`, `Image of New at acorns`, `Logo of a company supporting Acorns` (used for three *different* award badges, so the award names are not conveyed)
- Several images render with empty or broken alt targets (`![Image of Acorns Money Manager](<>)`) across the homepage carousel
- The footer accessibility icon has alt `Wheelchair icon` — describing the glyph rather than the function
- `Learn more` ×11 in the carousel (see T3)
- Carousel controls have alt `Left Arrow` / `Right Arrow` — glyph-naming again, no indication of what they navigate

**Other negative findings:**
- `Get started` vs `Get the app` for the same destination in adjacent nav slots
- `Twitter` as a share-button label beside an X-logo footer icon
- `Base Portfolio` (Invest page) vs `Acorns Core portfolios` (Invest FAQ) for closely adjacent concepts
- Four phrasings of tier-exclusivity on one pricing page
- Help centre still uses retired tier names (`Premium`, `Personal Plus`) and a `$6` price not present in current pricing
- `Money Manager` carousel slide ships with an **empty `Learn more` href** (`[Learn more](<>)`)

---

## Transferable patterns

1. **Two-line nav labels: job on top, instrument below.** `Invest for your kids` / `UGMA/UTMA`. Lets one label serve both the novice and the person who already knows the term, without a glossary and without dumbing down. Transfers directly to any PayPal surface where a regulated product name (Pay in 3, PayPal Credit) is the *only* thing on the label today.
2. **Worked micro-arithmetic instead of feature description.** "$2.50 fries? That's $0.50 invested." Price, item, question mark, answer. For instalment copy the analogue is obvious and stronger than "split into 4 payments" — show the sum with a real basket value.
3. **Pair a "why" article with a "benefits" article for every unpopular change.** Acorns ships `Why is the Premium Tier Price Changing to $12?` alongside `What are the benefits of…`. The why-article absorbs the grievance so the benefit-article can do retention. Applies to any fee change, feature removal, or term revision.
4. **Disclose the renaming as a permanent numbered item.** "No other changes were made at that time" is the clause that stops the support queue. Condition: only works if the help centre is migrated at the same time — Acorns' wasn't, and the stale titles undercut it.
5. **Explain *why* the disclaimer exists, not just the disclaimer.** The `Why is APY subject to change?` modal converts a compliance asterisk into an education surface. Transfers to variable-rate, promotional-rate, and eligibility-subject-to-approval copy.
6. **Name the mechanism of bias in endorsement disclosures.** "Customer received $5,000, which provides incentive to recommend Acorns and therefore all opinions within material may be biased." Draw the inference for the reader instead of stating the fact and stopping.
7. **Reject the adjacent-but-wrong word deliberately.** `bonus investments` not `cash back`, because the reward is securities and cannot be spent. Pick the term that pre-empts the wrong mental model even when the familiar term would convert better.
8. **Negative benchmark — a flat fee needs a percentage somewhere.** `$4/mo.` with `No hidden fees. No commissions.` above it, and the only fee-drag statement buried in a calculator footnote. If a fee's impact varies by an order of magnitude across the user base, stating only the absolute number is technically complete and practically misleading. Directly relevant to any fixed-fee or minimum-fee PayPal product.

## Caveats & gaps

- **Help-article bodies not opened.** Category names, scope lines, and 20 featured titles were captured from the support index only. Article structure, answer shape, and any in-product strings quoted inside them are unharvested.
- **All in-product states are absent, not documented.** Unlike Wise, Acorns' help IA does not expose a rich state vocabulary from titles alone. Transaction statuses, empty states, validation messages, and toasts were not recoverable. T6 and T8 are correspondingly thin and honestly marked.
- **Signup flow not entered.** No account creation or form submission was attempted, so T5 covers only the two public calculators and the tier selector.
- **Mobile app copy not harvested.** Acorns is app-first — `Customers are required to download the app` is not stated here as it is for Lemonade, but the sticky `Get the app` CTA and the in-app-only features (Money Manager, Custom Portfolios, Potential screen) mean the majority of this product's UI copy is outside the public web surface.
- **Rates and figures are point-in-time.** APYs (`3.35%`, `2.18%`), tier prices, and match percentages all carry as-of dates in the source and are explicitly variable. Any figure quoted from this file must be re-verified before use as precedent.
- **Only six pages inspected.** The Later, Early, Early Invest, Banking, Earn, Money Manager, Learn, Security, Our Pledge, and Program Agreement pages are unharvested. The Program Agreement and Wrap Fee Brochure in particular would carry the substantive fee and advisory-relationship language.
- **Award badges could not be identified.** Three award images share the alt text `Logo of a company supporting Acorns`, so the issuing bodies were not recoverable from the source and are not recorded here.

## Sources

1. https://www.acorns.com/
2. https://www.acorns.com/pricing
3. https://support.acorns.com/
4. https://www.acorns.com/important-disclosures/
5. https://www.acorns.com/accessibility/
6. https://www.acorns.com/invest/
