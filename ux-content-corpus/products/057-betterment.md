# 057. Betterment

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Robo-adviser (automated investing) with cash management, self-directed brokerage, and 401(k) administration |
| Primary URL | https://www.betterment.com/ |
| Corpus rank | 057 |
| Benchmark strength (source list) | Goals and risk explanations |
| Locale / market observed | en-US only |
| Platform observed | Web (desktop marketing site, HubSpot CMS), help centre, pricing |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **SEC-registered investment adviser** (Betterment LLC), self-described **fiduciary**. Brokerage and custody via Betterment Securities (SEC-registered broker-dealer, **Member FINRA/SIPC**) and Apex Clearing Corporation. SIPC to $500K including $250K cash. 401(k) administration via Betterment for Business LLC. Checking via nbkc bank, Member FDIC. Cash Reserve runs through a **Cash Sweep Program** into FDIC-insured Program Banks. Explicit repeated legend: `No Betterment entity is a bank.` and `Betterment is not FDIC-insured.` Form CRS, Form ADV Part II, a standalone fee-disclosure page, and FINRA BrokerCheck all linked in footer. Payment for order flow disclosed. |
| Harvest date | 2026-09-21 |
| Pages inspected | 4 |
| Harvest completeness | Partial — **the two highest-value surfaces are accordion-collapsed and their answer bodies are not in server HTML.** Pricing-page FAQ questions and help-centre "Common questions" questions were captured verbatim; their answers were not retrievable. Homepage FAQ answers *were* in the DOM and are summarised. All in-product goal/risk UI is behind auth. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.betterment.com/ | Rotating hero, product grid, three "plan cards", trust block, 4-question FAQ with expanded answers, very long disclosure footer |
| Pricing | https://www.betterment.com/pricing | Two-price fee model, jump nav, Premium tier, 6-question FAQ (collapsed) |
| Help Centre — Common questions | https://www.betterment.com/help/tag/common-questions | 4 sections, 16 questions (collapsed) |
| Automated investing | https://www.betterment.com/investing | Redirect target of `/goals`; four-pillar benefit block, goal-name tabs, review carousel |

---

## T1 Navigation & IA labels

**Three-audience courtesy nav sits above everything** `[observed]`

`Individuals` · `Employers` · `Advisors`

Rendered twice — once at the top of the page and once at the foot, where it is reachable via a dedicated skip link, `Skip to audience navigation`. Betterment ships **three skip links** in total (`Skip to main content`, `Skip to footer`, `Skip to audience navigation`), which is the most deliberate skip-link set in the FIN batch.

**Primary nav is by money-behaviour verb, not product family** `[observed]`

`Invest` · `Cash` · `Retirement` · `Premium` · `Offers` · `Resources`

Two of the six are single-syllable behaviour nouns (`Cash`, `Invest`); `Premium` is a tier name sitting at the same level as a behaviour, which is a monetisation seam in the IA. `Offers` as a top-level nav item is unusual for an RIA and signals how promotional this surface has become.

**Every nav item carries a sentence-length gloss — the strongest sub-nav writing in the batch** `[observed]`

| Item | Gloss (verbatim) |
|---|---|
| `Automated investing` | "Globally diversified with all trading, rebalancing, and tax management done for you." |
| `Self-directed investing` | "Trade stocks and ETFs with tax insights you won't find anywhere else." |
| `IRAs` | "Save for retirement with a tax-advantaged traditional, Roth, or SEP IRA." |
| `Crypto investing` | "A managed portfolio of Bitcoin and Ethereum ETFs." |
| `Bond investing` | "Stable income, diversification, and reduced risk from Goldman Sachs and BlackRock." |
| `High-yield cash` | "No fees or minimums. FDIC insured up to $8M (joint). Unlimited withdrawals. Variable APY." |
| `Checking` | "Everyday spending with no foreign transaction or ATM withdrawal fees." |
| `Solo 401(k)` | "Retirement account with a high contribution limit for self-employed individuals." |
| `Premium` | "Get 1:1 advice from a CFP® along with exclusive benefits, investing options, and more." |
| `Tax-saving technology` | "Get the same tax tech used by high-net-worth investors at no extra cost." |
| `Portfolio options` | "Explore portfolios built with low-cost ETFs." |
| `Historical performance` | "See how well our portfolios perform." |
| `Securities lending` | "Earn extra income by lending your stocks and ETFs." |
| `Rollover support` | "Free expert guidance to consolidate your retirement." |

The `High-yield cash` gloss is the pattern worth stealing: **four fragment sentences, three of which are disclosures** (`No fees or minimums`, `FDIC insured up to $8M (joint)`, `Variable APY`). Betterment puts the fee status, the insurance ceiling, and the rate-variability warning **into the navigation label itself**. A user can decide whether this product is for them without leaving the dropdown. Compare Klarna and Afterpay, where the equivalent disclosures live several screens down.

`Crypto investing` is glossed as "A managed portfolio of Bitcoin and Ethereum **ETFs**" — the ETF wrapper named in the nav so no user arrives expecting to hold coins.

**Footer groupings — six columns, and the last one is a single word** `[observed]`

`Accounts` · `Tools` · `Service` · `Resources` · `About` · `Rewards` · `Disclosures`

`Disclosures` contains exactly one link (`Legal`). Giving compliance material its own footer column, even a one-item column, is a small signalling decision worth noting.

Under `Tools`: `Goal tracker` · `All-in-one dashboard` · `Portfolio options` · `Historical performance` · `Tax savings` · `Securities lending` · `Charitable giving` · `Socially responsible investing (SRI)`. Under `Service`: `Talk to an advisor` · `Premium` · `Rollover support` · `Retirement advice`. The `Service` column is named for the *human* offering specifically, separating it from `Resources` (self-serve).

**A notable IA absence.** `/goals` — linked from the footer as `Goal tracker` — **redirects to `/investing`**. The goals surface, which is the product's flagged benchmark strength, has no dedicated public page at the URL the footer advertises. Recorded as a routing defect and as the central gap in this harvest.

## T2 Value proposition & headline patterns

**Hero is a three-slide rotator, and only the first slide is the brand promise** `[observed]`

> Slide 1 headline: `Build wealth with confidence and ease`
> Subhead: "Investing and saving shouldn't take over your life. Betterment automates the work for you."
> Checklist: `Invest the way you want` · `Helps you save on taxes` · `Trusted by 1M+ customers`

Slides 2 and 3 are promotional (`Invest and earn up to $2,000 on us`, `Get a 0.75% APY boost on your cash`). The brand headline competes for the same slot as two acquisition offers — a real tension, and the offers carry longer disclaimer blocks than the brand slide carries copy.

The subhead's construction is the reusable bit: **name the user's fear, then name the remedy.** "Investing and saving shouldn't take over your life" is a permission statement ("you are allowed not to care about this") before the feature claim.

**Every hero slide ships its own bounded claim** `[observed]`. Slide 1: `Image is illustrative.` Slide 2: `Terms apply. New customers only. See offer details. Image is illustrative.` Slide 3: a full paragraph naming the base APY, the boost, the cap, the expiry, and the condition. The boundedness scales with the specificity of the claim — a defensible gradient.

**Section headers are short declaratives with full stops** `[observed]`

`Get started with an account in minutes.` · `Invest the way you want.` · `Your cash should work harder.` · `Your money's protected and your interests come first.` · `Investing made easy` · `Investing that fits your needs.` · `Investing that can help lower your taxes.` · `Common questions. Real answers.` · `Ready to start building wealth?`

Note the punctuation inconsistency: most carry a terminal full stop, `Investing made easy` and `Investing that can help lower your taxes.` are mixed, and the questions carry question marks. Minor, but a style-guide gap.

`Common questions. Real answers.` is the best FAQ heading in the batch — two fragments, and the second one is a defensive claim about the *quality* of the answers, implicitly conceding that most FAQ sections are evasive.

**The three plan cards use a tooltip-style "who does the work" tag above each heading** `[observed]`

| Tag (verbatim) | Card heading |
|---|---|
| `You're in control` | `Self-directed investing` |
| `Let us handle it` | `Automated investing` (badged `Most popular`) |
| `You build it, we manage it` | `Custom portfolios` (badged `New`) |

This is the strongest content pattern on the site. The three tags form **a spectrum of delegation**, and they are written as complete sentences in plain speech rather than as feature labels. A user self-selects on the tag alone; the product name is secondary. The middle tag, `Let us handle it`, is four words and does more positioning work than the paragraph beneath it.

Compare Acorns (056), which sells "automatic" as an absolute. Betterment sells **a choice about how much automation you want**, which is a harder story and is told entirely in three short tags.

**Pricing headline frames the fee as reciprocal** `[observed]`: `A low fee that works for you`, and the supporting head `How inexpensive is automated investing?` — a question the company asks on the user's behalf, with an adjective already loaded into it.

Then: `Grow your money at a price worth paying.` and the section head `Investing in yourself should pay for itself.` The whole pricing page argues that the fee is recovered rather than that it is small.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav, hero, plan cards, retirement block, cash block, page foot | The default; used at least 8× per page |
| `Log in` | Global nav | |
| `Learn more` | Plan cards, nav promos, securities lending, several inline | Bare, and frequent |
| `Activate offer` | Hero slides 2 and 3 | Promotional verb distinct from `Claim offer` |
| `Claim offer` | Nav promo panels | **Near-duplicate of `Activate offer`** for the same offers |
| `Start investing` | Pricing, self-directed section | Task-named |
| `Start saving` | Pricing, cash section | Task-named |
| `Start spending` | Pricing, checking section | Task-named — completes a `Start [verb]` set |
| `View our portfolios` | Investing page | |
| `Read more reviews` | Investing page | |
| `See how Betterment makes money.` | Pricing, under fee table | **Full sentence with a terminal full stop, as a link** |
| `See additional pricing information.` | Pricing, below fee figures | Routes to the collapsed FAQ |
| `See more` | Award and stat disclaimers | Routes to award disclosures |
| `Talk to an advisor` | Footer | |
| `Skip to main content` / `Skip to footer` / `Skip to audience navigation` | Top of DOM | Three skip links |
| `Download` / `Continue` | App-vs-browser interstitial | Paired with `Betterment App` / `Stay in browser` |
| `Jump to Section` | Pricing | A select element, not a link |

**Observation.** `See how Betterment makes money.` is the single best CTA in this file. It is a full sentence, it is phrased as the *user's* suspicion rather than the company's disclosure, it sits directly under the fee figures, and it routes to a dedicated fee-disclosure page. Most products bury revenue-model disclosure in a legal directory; Betterment makes it a curiosity-satisfying link at the point of price.

The homepage footnote it complements is equally direct: "Betterment primarily earns revenue through advisory fees (AUM-based or flat monthly fees). Betterment also earns revenue from **cash sweep program banks, securities lending activities, and payment for order flow**." Payment for order flow named in the homepage footer.

**Negative finding.** `Activate offer` and `Claim offer` are used for the same two offers on the same page. `Get started` links to at least four distinct destinations depending on placement (generic signup, and three `signup_motivation=` variants: `direct_trading`, `general_investing`, `custom-portfolios`). The label does not distinguish them — the *card* supplies the object, which is defensible on a plan card but weak when `Get started` also appears bare in the nav.

**Interstitial pattern worth noting** `[observed]`: after `Get started`, a dialogue appears headed `Get started on` with two options — `Betterment App` → `Download`, and `Stay in browser` → `Continue`. The browser option is named as an explicit choice (`Stay in browser`) rather than as a dismissal, which is better practice than the usual "continue to mobile site" dark pattern.

## T4 Onboarding & getting-started

**No step-numbered how-it-works sequence exists on any page inspected.** `[absent]` This is a real difference from Acorns, Klarna, and Afterpay, all of which ship a 3-step block. Betterment instead answers the process question inside the homepage FAQ.

**The process narrative lives in the FAQ answer to `How does Betterment work?`** `[observed]`. Summarised: Betterment covers cash management, guided investing, and retirement planning; it states the fiduciary standard; it then describes a sequence — you sign up and answer questions about yourself, you optionally connect outside accounts, and Betterment then helps you **set financial goals and assigns an investment portfolio to each goal**. It separates long-term needs (retirement, next year's vacation, a down payment) from daily saving and spending, routing the latter to Checking and Cash Reserve.

That is the goals model in one paragraph: **goal → portfolio → adjustable risk profile tied to goal type and time horizon.** Verbatim mechanism phrase: "an adjustable risk profile based on your goal type and how long you plan to invest."

**Goal names appear as tab labels on the investing page** `[observed]` — the only place the goal taxonomy is visible pre-auth:

`Pay for a wedding` · `Save for education` · `Buy a home` · `Build wealth`

Four goals, all verb-first, three of them naming a **concrete life event** and one a generic accumulation (`Build wealth` as the catch-all). Note that retirement is *not* in this set despite being the product's largest use case — it is promoted to its own section (`Retirement accounts with personalized tracker and advice.`) rather than treated as a goal among goals.

**Friction-reduction numbers are used as onboarding copy** `[observed]`: `Get started with an account in minutes.` · `$10 to get started` · `No fees or minimums` · `$10 min deposit for base APY`. The `$10` figure appears as a stat tile alongside `$70B+` AUM and `1M+` customers — pairing the tiny entry price with the enormous scale in one row is a deliberate juxtaposition.

## T5 Form & field labels

Very thin pre-auth. `[observed]`

- `Jump to Section` — a select with options `Please select` / `Investing` / `Cash` / `Premium`. The null option is `Please select` (polite imperative) rather than the more common "Select an option"
- `Please select` is the only placeholder string recoverable
- Accordion affordance is labelled by an icon with the accessible name `Caret Down Icon`, repeated on every FAQ row across both the pricing page and the help centre — **the same non-descriptive name on ~22 controls per page**, conveying the glyph rather than the action or the target. Recorded as an accessibility defect (see T14)
- `Close Icon` used similarly on the jump-nav and interstitial

No signup or quote form was entered. Full field inventory `[absent]`.

## T6 Status & state language

`[absent]` for transaction states — nothing observable pre-auth, and unlike Wise, Betterment's public help IA does not expose a state vocabulary through article titles.

**What *is* named, all `[observed]` on marketing surfaces:**

- **Balance-band states that change your price**: `$0 - $24K balance` and `$200+ monthly recurring deposit or $24K - $1M balance`. These are rendered as **eyebrow labels above the price**, which is unusual — the qualifying condition is given typographic priority over the number
- The transition between them is described as automatic: "You **automatically switch** to an annual price of 0.25% … by setting up recurring monthly deposits or transfers totalling $200 or more or reaching a balance of $24,000 or more"
- `progressive fee discounts` — the named state for balances over $1M
- Account-type states: `eligible balances`, `eligible cash`, `eligible investment accounts` — `eligible` is the recurring gating adjective and it is always footnoted
- Fund-location states in the Cash Sweep disclosure: funds are `in transit to or from Program Banks` versus `once the funds reach one or more Program Banks`, with different protections attaching to each. **This is a genuinely useful piece of state writing** — it names an in-between state that most products pretend does not exist, and tells the user which protection applies during it
- `Variable APY` / `APY is variable` — repeated as a state descriptor, never as a footnote alone

**Timing language inventory** `[observed]`: `in minutes` · `daily` (fee calculation) · `assessed monthly` · `five days per week` (support availability) · `through 1/15/2027` and `through 2/15/2027` (offer expiries — **two different dates for the same offer on two pages**, see T14) · `as of 12/12/2025` (rate vintage).

The fee-timing sentence is precise and worth copying: "Fees are calculated **daily** based on your balance and assessed **monthly**. They are automatically deducted from your investing account." Three facts — cadence of calculation, cadence of charge, and mechanism of collection — in two short sentences.

## T7 Error, failure & recovery

The **thinnest category in this file.** `[absent]` for error states, and notably thin even in documentation.

**The only failure-adjacent public content** `[observed]`, both in the help centre's `Financial security` section and available as questions only:

- `What happens to my money if Betterment closes?`
- `How do you keep my money safe?`

`What happens to my money if Betterment closes?` is the standout. A company-failure scenario given a first-class help-centre slot, phrased bluntly ("closes", not "in the unlikely event of"). Most fintechs answer this only inside a SIPC boilerplate paragraph.

**The homepage answer to `Is my money safe at Betterment?`** is the closest thing to recovery copy and its structure is instructive `[observed]`. Summarised, in order: SIPC membership and the $500K/$250K split → then, immediately, a plain-language risk caveat ("Accounts are subject to market risks and changes. These risks are inherent in investing are tradeoffs you make to pursue investment returns") → then FDIC coverage for cash → then FDIC coverage for Checking → then a routing link.

The pattern is **protection, then the limit of that protection, then the next protection**. Betterment refuses to let the SIPC number sit unqualified. Note also a **grammatical error preserved in live copy**: "These risks are inherent in investing are tradeoffs you make" — two verbs, no conjunction. Recorded as an observed defect.

**Eligibility-denial language** `[documented]` via question titles only: `Who is eligible to use Betterment?` and `Does Betterment do a credit check?`. The latter is a notable question for an RIA to pre-empt — it is answering an anxiety imported from lending products.

No decline, failed-deposit, rejected-transfer, or verification-failure copy was recoverable.

## T8 Empty states

`[absent]` — all behind auth. No search on the help centre surface inspected, so no no-results string was reachable.

## T9 Notifications & system messages

`[observed]` — banner and promo copy only.

**Site-wide announcement bar** on the investing page:
> `**New: Custom portfolios** let you pick your own stocks and ETFs while we handle the rest.` + `Learn more` + a `Close Icon`

Feature-launch banner written as a **complete sentence with the feature name bolded in place**, rather than the usual "Introducing X!" construction. The clause "while we handle the rest" reprises the plan-card positioning.

**Offer banners inside the nav dropdowns** `[observed]`, each a heading plus one line:
- `New customer offer: 4.00% APY` — "Unlock our highest variable rate of the year!"
- `Start investing with Betterment today and earn up to $2,000!`
- `Double dip on rewards when you refer a friend!`
- `Free financial advice, for the busiest season of your life` — "Unlock live chats with a licensed financial specialist, then get help moving beyond the basics of investing."

The last one is the only non-transactional promo and the only one without an exclamation mark. `the busiest season of your life` is an unexplained seasonal reference (tax season) that will read as a non-sequitur to anyone arriving off-season — a **time-bound phrase with no time named**.

`Unlock` is used three times as the promo verb (`Unlock our highest variable rate`, `Unlock a discounted mortgage rate`, `Unlock live chats`, plus `Unlock more with Premium.` as a pricing section head). A consistent promo verb, arguably overused.

In-product notification copy `[absent]`.

## T10 Disclosures, legal & compliance

Extremely strong, and structurally different from Acorns: where Acorns numbers its disclosures into an addressable table, Betterment **attaches disclosure to the claim it qualifies, inline, everywhere**, and then repeats a very long standard block in the footer of every page.

**The fee model is two prices with the qualifying condition given visual priority** `[observed]`

| Eyebrow (the condition) | Price | Cadence |
|---|---|---|
| `$0 - $24K balance` | `$5` | `Monthly` |
| `$200+ monthly recurring deposit or $24K - $1M balance` | `0.25%` | `Annually` |

Then: "The base price for investing accounts is $5/month. You automatically switch to an annual price of 0.25% on your investing account balance by setting up recurring monthly deposits or transfers totalling $200 or more or reaching a balance of $24,000 or more across your Betterment investing accounts—including Cash Reserve."

Two observations. First, `Cash Reserve` counts toward the $24,000 threshold, and that inclusion is stated inline with an em-dash rather than footnoted — a genuinely helpful disclosure since it is the kind of detail that usually hides. Second, the **$5/month flat fee has the same small-balance drag problem as Acorns' $4** (on a $500 balance, $60/year is 12%), and Betterment likewise never states the percentage. Unlike Acorns, however, Betterment gives the user a **stated, achievable route out of the flat fee** ($200/month recurring), and puts that route in the eyebrow rather than the footnote. That is materially better practice, and it is the difference worth recording.

**Premium tier pricing, with tiering disclosed inside a collapsed accordion** `[observed]`:
- `0.65%` `annual management fee`
- Positioning: "Access to an advisor when you want along with Premium benefits for a 0.65% advisory fee—a fraction of what traditional financial advisors cost."
- Minimum, stated in the homepage FAQ: "an additional 0.40% on your invested balances (with a minimum investing account balance requirement of **$100,000** across eligible balances)"
- Progressive discounts, from the `*How does Premium pricing work?` accordion: `$1–$2M: 0.15%`, `$2M+: 0.10%`, with the clarifying line **"Premium benefits still apply, without the added cost, for dollars over $1M."**
- Exclusion list, stated: "balances in self-directed investing, checking, Cash Reserve, 401(k), and HSA accounts are excluded"

Note the arithmetic inconsistency across surfaces: the pricing page presents Premium as a `0.65%` all-in fee; the homepage FAQ presents it as `an additional 0.40%` on top of the 0.25% base. Both resolve to the same number but they are **two different mental models of the same price on two pages of the same site.** Recorded as a negative finding.

**Fee-recovery claims are made and then immediately sourced** `[observed]`. The pricing page argues twice that the fee pays for itself:
- "Though our fee is low, not paying it is even better. Thanks to tax-saving technology, your fee could pay for itself, and then some."
- A percentage stat on tax-loss-harvesting fee coverage, qualified with "Fee coverage and estimated tax savings based on **Betterment internal calculations**." + `See more in disclosures.`
- A second stat on automated deposits, same qualifier

Naming the figures as **internal calculations** rather than implying third-party verification is the honest move here, and it is placed directly beneath the number rather than in the footer.

**Performance disclosure is dense and complete** `[observed]`. Under the plan cards:

> "As of 12/31/2025. Composite annual time-weighted returns: 20.06% over 1 year, 9.32% over 5 years, and 10.06% over 10 years. Composite performance calculated based on the dollar-weighted average of actual client time-weighted returns for the Core portfolio at 90/10 allocation, net of fees, includes dividend reinvestment, and excludes the impact of cash flows. **Performance not guaranteed, investing involves risk.**"

Seven distinct qualifications in one paragraph: as-of date, calculation method, which portfolio, which allocation, net-of-fees status, what is included, what is excluded. Then the terminal warning. This is the model for how to present a return figure — the reader can reconstruct what the number does and does not mean without leaving the sentence.

**The "past performance" boilerplate, verbatim** `[observed]`:
> "Past performance does not guarantee future results and the likelihood of investment outcomes are hypothetical in nature."
> `Not FDIC Insured • Not Bank Guaranteed • May Lose Value.`

Note the bullet-separated triple-negative legend, rendered with `•` rather than commas. And note again a **grammatical error preserved in live legal copy** ("the likelihood of investment outcomes **are**").

**The `No Betterment entity is a bank.` line is bolded and given its own paragraph** `[observed]`, after the four "Who Provides What Service?" sub-paragraphs. The footer disclosure is organised under bolded interrogative sub-heads:

`Who Provides What Service?` · `Let's Talk About Risk:` · `Who Provides the Market Data?`

Writing the legal footer's section heads **as questions the user might ask** — and one of them (`Let's Talk About Risk:`) in the first-person plural with a colon — is a small but real register choice inside an otherwise untouchable compliance block. It is the only conversational register that survives into the legal text.

**Cash Sweep Program disclosure names the in-transit gap** `[observed]`, summarised: client funds go into one or more FDIC-insured Program Banks; assets earn variable interest; brokerage funds are SIPC-protected but Program Bank funds are FDIC-insured to $250K per depositor per bank, aggregating to $4M individual / $8M joint; **funds in transit to or from Program Banks are generally not FDIC-insured but are covered by SIPC**; and FDIC limits count all accounts at that bank, not just sweep funds.

That last clause is the one most products omit — it tells the user that their *existing* deposits elsewhere erode the coverage being advertised. Stated plainly.

**Conflict disclosures, two distinct ones** `[observed]`:
- Revenue model, homepage: advisory fees, cash sweep program banks, securities lending, **payment for order flow** — named, with a `Learn more` to the fee-disclosure page
- Concierge team, pricing page: "The Licensed Concierge Team is eligible to receive incentive compensation based on funds transferred to Betterment. Betterment's revenue varies across offerings, which creates an incentive to recommend the offering resulting in the greatest revenue. **Regardless of this conflict, Team members are required to act in the client's best interest.**"

The second is a model conflict disclosure: state the incentive, state the resulting bias, then state the countervailing obligation. Three clauses, no hedging.

**`Image is illustrative.` / `All screenshots are for illustrative purposes only.`** appears beneath every product screenshot on every page — seven or more instances. Rigorously applied.

**Rate disclosure, verbatim** `[observed]`: "Annual percentage yield (variable) is 3.25% as of 12/12/2025, plus a 0.75% boost ("APY Boost") on balances up to $1M for new clients with a qualifying deposit. $10 min deposit for base APY. [Terms apply]; **if the base APY changes, the Boosted APY will change.**"

The final clause is the good one — it explains the *dependency* between the two advertised numbers rather than just marking both as variable.

**Tax-loss-harvesting disclaimer** `[observed]`: "Betterment does not provide tax advice. TLH is not suitable for all investors." Two short sentences beneath every TLH claim, including the abbreviation on second reference.

## T11 Help-centre architecture

Help lives at `/help/tag/<topic>` — a **tag-based** rather than hierarchical structure, which means there is no browsable category tree from the surfaces inspected. The `Common questions` page is reached from the footer under the label `FAQ`, so **the same destination is called `FAQ` in the footer, `Support` in the nav, and `Common questions` on the page itself.** Three names for one thing.

**`Common questions` page structure** `[observed]`: a breadcrumb (`Help Center`), an H1, a scope line — "Explore frequently asked questions by new customers" — and a `Table of content` jump nav with four sections:

`Company information` · `Financial security` · `Getting started` · `Managing my account`

The ordering is the artefact. It runs **company → safety → product → account**, meaning a first-time visitor is answered about *who Betterment is* and *whether their money is safe* before anything about the product. For a category where trust is the primary conversion barrier, that ordering is the right call and is the inverse of most SaaS help centres.

Note the mixed person in the section names: `Company information` and `Financial security` are impersonal; `Getting started` is neutral; `Managing my account` switches to **first person**. The switch happens exactly at the point where the content becomes about the user's own stuff.

`Table of content` is a typo for "Table of contents" and is rendered as live UI. Recorded.

**Sharing affordances on a help page** `[observed]`: `Betterment on Facebook`, `Betterment on LinkedIn`, and a clipboard copy control with the confirmation string `Copied!`. Social-share buttons on an FAQ page is an unusual choice.

**Routing furniture** `[observed]`: help articles route out to `Contact us` / `Support` (a `/contact` page), and separately to `Talk to an advisor` (paid). The free/paid distinction is maintained in the label.

## T12 FAQs

Three FAQ surfaces, with **very different retrievability**.

### Homepage — `Common questions. Real answers.` (answers present in DOM) `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How does Betterment work? |
| 2 | Will I have access to real humans? |
| 3 | Is my money safe at Betterment? |
| 4 | Who are the experts behind the scenes? |

Four questions only. The selection is unusually confident — no pricing question, no "how do I sign up", no product-comparison question. Instead: mechanism, humans, safety, credibility.

**Q2, `Will I have access to real humans?`, is the standout question in this file.** It names the automation anxiety in the user's own words, uses "real humans" rather than "customer support" or "advisors", and the answer does not dodge: it states support is available **five days per week** (not 24/7 — a limitation given plainly), then routes to the paid Premium tier with its price (`an additional 0.40%`) and its minimum (`$100,000`) **inside the FAQ answer**. A question that could have been a soft reassurance instead delivers the availability limit and the paywall.

Q4's answer summarised: portfolio decisions are made by an internal investing team with help from an external committee of economists, PhDs, and industry experts; the same team develops the Tax Smart technology and cash analysis tools. The phrase `behind the scenes` in the question does light anthropomorphic work — it presumes the user suspects there is no one there.

### Pricing page — `Questions about our pricing:` (answers collapsed, not in server HTML) `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How are the fees taken from my account? |
| 2 | Are there discounts if I hold a high balance? |
| 3 | *How does Premium pricing work? |
| 4 | **What counts towards the minimum balance for Premium? |
| 5 | Are there fees on deposits, withdrawals, or ETFs? |
| 6 | Does it cost more to get additional help if I need it? |

**Note the asterisk prefixes in questions 3 and 4** (`*`, `**`). These are footnote *anchors rendered into the question text itself* — the `*` beside `eligible balances` higher on the page links down to Q3. Using an FAQ entry as the target of a legal asterisk is a genuinely interesting pattern: the footnote's content is the answer to a question the user would ask anyway, so it lives in the FAQ rather than in a footer block. The cost is that the question text reads oddly out of context.

Q5 is the **"what else will you charge me" catch-all**, enumerating three specific fee surfaces rather than asking "are there other fees?". Q6 is a euphemistic rendering of "does advice cost extra" — the only soft-pedalled question in the set.

Answers were not retrievable; Q3's content was partially exposed (the `$1–$2M: 0.15%` / `$2M+: 0.10%` tiering and the "Premium benefits still apply, without the added cost, for dollars over $1M" line), which is why those figures appear in T10.

### Help centre — `Common questions` (answers collapsed, not in server HTML) `[observed]`

**Company information**
1. Is Betterment a regulated financial institution?
2. How is Betterment different?
3. How does Betterment compare to other financial companies?
4. Who are the experts behind Betterment?
5. What is your Mission Statement?

**Financial security**
6. How do you keep my money safe?
7. What happens to my money if Betterment closes?

**Getting started**
8. What are Betterment's fees?
9. How is a Betterment investment account different from a traditional online brokerage account?
10. Who is eligible to use Betterment?
11. What is Betterment and how does it work?
12. Does Betterment do a credit check?

**Managing my account**
13. What accounts can I open with Betterment?
14. Where can I find account statements?
15. Who is available to support me when I need one-on-one advice?
16. What mobile platforms does Betterment support?

**Structural notes.** Sixteen questions, and **five of them are about the company rather than the product** — an unusually high ratio, consistent with the trust-first ordering noted in T11. Q1 (`Is Betterment a regulated financial institution?`) is a yes/no question about regulatory status given the first slot on the page, which is a direct answer to the "is this a real financial company or an app?" anxiety.

Q5 (`What is your Mission Statement?`) is the odd one — corporate boilerplate in a customer FAQ, and the only question addressed to the company in the second person (`your`) rather than about it in the third.

Q3 and Q9 are both comparison questions, asked at different altitudes (company vs account type). Q2, Q3, and Q11 overlap substantially with each other and with the homepage's Q1; there is **duplication between the homepage FAQ and the help-centre FAQ** with no cross-linking observed.

Q12 (`Does Betterment do a credit check?`) is the most interesting inclusion: an RIA pre-empting a question that properly belongs to lending. It exists because users arrive with fintech-general anxieties, not RIA-specific ones — a reminder that FAQ selection should follow what users actually fear rather than what the product actually does.

## T13 Terminology & glossary

| Term | Betterment's usage | The alternative it rejected |
|---|---|---|
| `Automated investing` | The flagship product noun | "robo-advisor" — used by the *awards* Betterment cites (`Best Overall Robo Advisor`) but never in its own copy |
| `Self-directed investing` | Brokerage trading | "DIY investing", "active trading" |
| `Custom portfolios` | User-selected holdings inside a managed wrapper | "build your own" |
| `Core portfolio` | The default allocation, used in performance disclosure | |
| `goal` / `Goal tracker` | The organising unit of the account | "bucket" — though `buckets` appears in the site meta description ("set buckets for your goals"), a **term used in metadata but not in live copy** |
| `Cash Reserve` | The high-yield cash product | "savings account" — deliberately avoided, since Betterment is not a bank |
| `High-yield cash` | The nav label for Cash Reserve | "savings" |
| `Cash Sweep Program` (`CSP`) | The FDIC mechanism | |
| `Program Banks` | Capitalised, defined, linked | "partner banks" |
| `Tax Smart technology` / `Tax-saving technology` | The TLH feature family | **two names for one thing** |
| `Tax-loss harvesting` / `TLH` | Abbreviated on second reference in disclaimers | |
| `fiduciary` | Used and immediately glossed: "which means we're legally required to act in your interest" | left unglossed |
| `Premium` | The advised tier | "Advisor", "Plus" |
| `Licensed Concierge Team` | The rollover-support humans | "sales team" |
| `rollover` | Retained as the industry term | |
| `Socially responsible investing (SRI)` | Full phrase with abbreviation in parentheses | "ESG" — avoided entirely |
| `progressive fee discounts` | Tiered fee reduction | "volume discount" |
| `APY Boost` | Capitalised, quoted, defined in the disclosure | "bonus rate" |
| `eligible` | The universal gating adjective, always footnoted | |
| `Pursue Better` | A resources sub-brand | |

**The `fiduciary` gloss is the single best terminology moment in the file** `[observed]`:
> `We're a fiduciary.` — "Betterment is a registered investment adviser, which means we're legally required to act in your interest. **We only make money when you make money.**"

A regulatory status → a plain-language consequence → a one-line restatement in the user's own economic terms. Three escalating simplifications of the same fact. (The third claim is arguably inaccurate given the flat $5/month tier and the payment-for-order-flow disclosure elsewhere on the same page — recorded as a tension, not a finding of fact.)

**Register split.** Marketing says `automated investing`; the awards Betterment displays say `robo advisor`; the legal text says `internet-based advisory services`. Three registers for one product, and Betterment controls only the first and third.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, and the company is a visible, continuous actor: "We manage all the trading", "We build an investing portfolio around what you want", "we'll coordinate them", "We're always working to help grow your money". Present tense and present continuous dominate — the automation is described as *ongoing* rather than as a one-time setup, which is the tonal equivalent of the product claim.

**Register.** Short declaratives, sentence case, frequent full stops on fragment headings. Contractions used freely (`you'll`, `we're`, `don't`, `shouldn't`). Very few adjectives per sentence. Exclamation marks appear **only inside promotional offer panels** — a clean separation between the product voice and the acquisition voice.

**Possessive-pronoun headlines are a house device** `[observed]`: `Your cash should work harder.` · `Your money's protected and your interests come first.` · `Build your wealth with automated investing` · `Investing in yourself should pay for itself.` The modal `should` appears twice, framing the headline as an entitlement the user already holds rather than a benefit the product confers.

**Numbers as trust devices, all dated** `[observed]`: `$70B+` AUM (as of 5/10/2026), `1M+` customers (as of 8/18/2026), `$10` to get started, `4.8 rating | 78.1K reviews`, `11X more than the average bank account`, `$500K` SIPC, `$8M (joint)` / `$4M (individual)` FDIC. Every claim carries an as-of date or a `See more` routing to one.

`11X more than the average bank account` is footnoted to the FDIC's published national average with a date — a competitive claim sourced to a regulator rather than to the company.

**Testimonials are short, bolded-phrase fragments** `[observed]`: "Excellent place to **make your money work** for you." · "It's a good '**set-it-and-forget-it**' investing tool for my family." · "Saves the stress and hassle of **managing retirement** savings myself." Attributed to first name plus surname initial (`KATHRYN H.`). Disclosure: "Clients. Views may not be representative." — a **two-word sentence fragment** doing the attribution and then a qualification. Compare Acorns (056), which states the payment amount and names the bias mechanism. Betterment's is the weaker endorsement disclosure of the two.

**Accessibility content** `[observed]`

Strengths:
- **Three skip links**, first in DOM: `Skip to main content`, `Skip to footer`, `Skip to audience navigation`. The third is unusual and genuinely useful given the persistent audience switcher
- Descriptive, content-bearing alt text on product screenshots — the best in the FIN batch: "Product interface for an automated investing account showing a $50,460.82 balance with a growth chart and a Betterment Core portfolio callout of 10% average annual returns since 2016" · "Product interface for a custom portfolio showing a MSFT weight slider at 21% and an allocation of 76.9% stocks, 18.3% bonds, and 4.8% alternatives" · "An illustration of a portfolio donut chart with customization slider." These convey the *data* in the screenshot, not just its existence
- Photographic alt text is scene-level: "A father paddling a canoe on a lake while his daughter holds their dog wrapped in a towel"
- Social links named by destination and purpose: `Betterment on Instagram`, `Betterment on X`
- Award images carry the award name in alt: `Best Overall Robo Advisor 2025 — WSJ | Buy Side`
- `Open menu` / `Close menu` as explicit state-toggle labels

Gaps and defects:
- **`Caret Down Icon` as the accessible name on every accordion control** — roughly 22 identically-named controls across the pricing and help pages, conveying the glyph instead of the action or its target. This is the most consequential accessibility defect found, because the accordions are where the disclosure content lives
- `Close Icon` used the same way
- **No public accessibility statement was found** on any page inspected, and no `Accessibility` link appears in the footer. This is a notable absence for an SEC-registered adviser and puts Betterment behind Lemonade (WCAG 2.2 AA + EAA), Klarna (statement with assistive-tech detail), and even Acorns (a stale but extant statement)
- Decorative check-mark and icon images carry no alt and no explicit empty alt in the extracted source
- CTAs rendered as **images** (HubSpot CTA graphics, e.g. `![Get started]`) — the label is alt text on an image rather than a text button, which affects zoom, high-contrast, and text-resize behaviour
- Several large stat tiles are duplicated in the DOM (responsive variants) with the second copy's images unlabelled — screen-reader users may encounter the `$70B+` / `1M+` / `$10` / rating set twice. Flagged as suspected, not confirmed

**Other negative findings, recorded honestly:**
- **Offer figures differ across pages harvested in the same session**: the homepage and pricing page show `4.00% APY` with the offer running `through 1/15/2027`; the help centre and investing page show `4.25% APY` running `through 2/15/2027`. Same offer, two live figures, two live dates. A caching or rollout seam, and exactly the kind of inconsistency that is dangerous in rate advertising
- **Premium priced two ways**: `0.65%` all-in (pricing page) vs `an additional 0.40%` (homepage FAQ)
- **`Tax Smart technology`** vs **`Tax-saving technology`** vs **`Tax savings`** (footer) for one feature family
- `/goals` redirects to `/investing` while the footer advertises it as `Goal tracker` — the benchmark-strength surface has no page
- One destination named `FAQ` (footer), `Support` (nav), and `Common questions` (page H1)
- `Activate offer` vs `Claim offer` for identical offers
- `Table of content` — typo in live UI
- Two grammatical errors preserved in live copy: "These risks are inherent in investing are tradeoffs you make" and "the likelihood of investment outcomes are hypothetical"
- `buckets` used in the page meta description but nowhere in live copy

---

## Transferable patterns

1. **Put the qualifying condition above the price, not below it.** `$0 - $24K balance` as an eyebrow over `$5 Monthly`. The user reads "does this apply to me" before "how much", which is the order they actually think in. Directly applicable to any tiered, thresholded, or conditional PayPal fee.
2. **Give a flat fee a stated exit.** Betterment's `$5/month` has the same small-balance drag as Acorns' `$4/month`, but Betterment names the escape condition (`$200+ monthly recurring deposit`) in the price block itself. If you must charge a flat fee, ship the route out of it at the same altitude as the fee.
3. **`See how Betterment makes money.` as a link under the price.** A full-sentence CTA phrased as the user's suspicion, routing to a real revenue-model disclosure that names payment for order flow. Transfers to any product where the user reasonably wonders what the catch is.
4. **Three-tag delegation spectrum.** `You're in control` / `Let us handle it` / `You build it, we manage it`. Sell the *degree of control* as the differentiator between variants, in plain sentences above the product names. Applies to any product with manual/assisted/automatic modes.
5. **Trust-first help ordering.** `Company information` → `Financial security` → `Getting started` → `Managing my account`, with `What happens to my money if Betterment closes?` as a named article. In a category where the barrier is credibility rather than usability, answer *who are you* and *what if you fail* before *how do I use it*.
6. **Name the in-between state.** "Funds in transit to or from Program Banks are generally not FDIC-insured but are covered by SIPC." Most products describe only the resting states. Naming the gap — and which protection applies during it — is directly relevant to settlement, hold, and pending-transfer copy.
7. **Conflict disclosure in three clauses: incentive → bias → obligation.** "The Licensed Concierge Team is eligible to receive incentive compensation… which creates an incentive to recommend the offering resulting in the greatest revenue. Regardless of this conflict, Team members are required to act in the client's best interest."
8. **Gloss the regulatory term twice, descending in abstraction.** `fiduciary` → "legally required to act in your interest" → "We only make money when you make money." Condition: the third restatement must actually be true, and here it is arguably strained by the flat-fee tier — so test the folk restatement against the fee schedule before shipping it.
9. **Alt text should carry the data, not the noun.** "…showing a MSFT weight slider at 21% and an allocation of 76.9% stocks, 18.3% bonds, and 4.8% alternatives" rather than "product screenshot". Betterment's product-screenshot alt text is the best in this batch and is a directly copyable standard.
10. **Negative benchmark — accordion controls named for their glyph.** `Caret Down Icon` ×22 per page, on the controls that gate every pricing disclosure. If the disclosure is behind an accordion, the accordion's accessible name is part of the disclosure.

## Caveats & gaps

- **The benchmark strength is only partially evidenced.** `/goals` redirects to `/investing`, and the goals model was recoverable only from (a) the homepage FAQ answer to `How does Betterment work?`, (b) four tab labels (`Pay for a wedding`, `Save for education`, `Buy a home`, `Build wealth`), and (c) the footer label `Goal tracker`. The in-product goal-creation flow, goal-naming conventions, progress language, and on-track/off-track states are **all behind auth and are `[absent]` here.**
- **Risk explanations are likewise under-evidenced.** The nav advertises `Understanding risk and return` but routes it to `/bonds-investing`, which was not fetched. The risk-questionnaire copy, the allocation-slider labels, and the risk-level names (beyond the `90/10 allocation` figure in a disclosure) were not reachable. The `/investments`, `/performance`, and `/bonds-investing` pages would be the highest-value follow-up.
- **Two of three FAQ surfaces have unretrievable answers.** The pricing FAQ (6 questions) and the help-centre `Common questions` (16 questions) are client-rendered accordions; only the questions are in server HTML. Homepage FAQ answers were present and are summarised.
- **Live figures conflicted between pages fetched minutes apart** (4.00% vs 4.25% APY; 1/15/2027 vs 2/15/2027). No rate, APY, offer amount, or expiry from this file should be used as precedent without re-verification.
- **No accessibility statement found.** Searched the footers of all four pages; none present. This is recorded as an absence, not as a claim that none exists elsewhere on the domain.
- **Only four pages inspected**, and one of them was a redirect. Unharvested: `/legal/fee-disclosure` (the destination of the best CTA in the file), `/investments`, `/performance`, `/premium`, `/cash-reserve`, `/taxes`, `/contact`, `/adv`, `/legal/form-crs`, `/cash-portfolio`, and the entire `/work` and `/advisors` audience trees.
- **Mobile app copy not harvested.** An app-vs-browser interstitial was observed but not followed.
- No signup, quote, or form submission was attempted, so T5 is effectively empty and honestly marked.

## Sources

1. https://www.betterment.com/
2. https://www.betterment.com/pricing
3. https://www.betterment.com/help/tag/common-questions
4. https://www.betterment.com/goals (redirects to https://www.betterment.com/investing)
