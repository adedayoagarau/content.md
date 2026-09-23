# 055. Robinhood

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Retail brokerage (self-directed equities, options, futures, crypto, prediction markets, plus banking, cards and managed portfolios) |
| Primary URL | https://robinhood.com/ |
| Corpus rank | 055 |
| Benchmark strength (source list) | Progressive disclosure and investing education |
| Locale / market observed | en-US (`/us/en/`; a US flag locale switcher is present) |
| Platform observed | Web (desktop marketing), custom help centre at `/us/en/support/`, Robinhood Learn, Disclosure Library |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Eight named affiliated entities, each with its own regulator and its own protection status.** *Brokerage:* **Robinhood Financial LLC (RHF)**, registered broker-dealer, **member SIPC**, member **FINRA**; clearing by **Robinhood Securities, LLC (RHS)**, registered broker-dealer, **member SIPC**. *Advisory:* **Robinhood Asset Management, LLC (RAM / "Robinhood Strategies")**, **SEC-registered investment adviser**. *Futures and cleared swaps:* **Robinhood Derivatives, LLC (RHD)**, registered **FCM with the CFTC**, **NFA member** — "**RHD is not FDIC insured or SIPC protected.**" *Crypto:* **Robinhood Crypto, LLC (RHC)**, **NMLS ID 1702840**, licensed for virtual currency business activity by the **NYSDFS** — "**Cryptocurrency held through Robinhood Crypto is not FDIC insured or SIPC protected.**" *Spending:* **Robinhood Money, LLC (RHY)**, **NMLS ID 1990968**, licensed money transmitter — "**RHY is not a member of FINRA**", no SIPC, **FDIC pass-through** only, contingent on recordkeeping. *Cash Card:* prepaid, issued by **Sutton Bank, Member FDIC**. *Credit:* **Robinhood Credit, Inc. (RCT)**, cards issued by **Coastal Community Bank** — "RCT is a financial technology company, not a bank." *Subscription:* **Robinhood Gold, LLC (RHG)**. All eight are wholly-owned subsidiaries of **Robinhood Markets, Inc.**; "**RHF, RHS, RAM, RHD, RHC, RHY, RCT, and RHG are not banks.**" Options governed by the OCC **Characteristics and Risks of Standardized Options**. Margin subject to **FINRA intraday margin standards**, which replaced **Pattern Day Trading (PDT)** on **June 4, 2026**. Reg BI disclosure and Form CRS published. |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Strong on the flagged strength — risk disclosure, margin, PDT/intraday margin, options assignment and Robinhood Learn's structure are all captured in depth. Partial elsewhere: **the help-centre home (`/us/en/support/`) is client-rendered and returned an empty shell**, so the category-tile IA was not captured (the full left-nav category list *was* recovered from article pages). Two support articles and one Learn article returned empty at the slugs tried. No fee figures beyond those quoted in help bodies — the fee schedules are PDFs and were not opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://robinhood.com/us/en/ | Hero, product modules, the ~600-word standing footer disclosure |
| Support home | https://robinhood.com/us/en/support/ | Client-rendered; category tiles not retrievable |
| Disclosure Library | https://robinhood.com/us/en/about/legal/ | **~90 named disclosure documents, each date-stamped** |
| Robinhood Learn | https://robinhood.com/us/en/learn/ | Five-track educational IA |
| Options (product) | https://robinhood.com/us/en/about/options/ | Per-module disclosure links; Gold cross-sell |
| Article: What's margin investing? | .../support/articles/margin-overview/ | Profit/loss worked examples; six-bullet risk list |
| Article: What does it mean if I get a margin call? | .../support/articles/margin-calls/ | Notification ladder; resolution paths |
| Article: Day trading | .../support/articles/day-trading/ (via `pattern-day-trading`) | **PDT → intraday margin transition, documented** |
| Article: With margin investing enabled, why do I have an account deficit? | .../support/articles/why-do-i-have-an-account-deficit-margin/ | Early assignment, ACH reversal, fee-driven deficits |
| Article: patterns-day-trades (empty) | .../support/articles/patterns-day-trades/ | Returned empty — recorded as not-found |
| Learn article: navigating exercise and assignment (empty at slug tried) | .../learn/options/navigating-exercise-and-assignment/ | Title confirmed from the Learn index; body not retrieved |

---

## T1 Navigation & IA labels `[observed]`

**The nav is a flat product list under four group headings** — `What We Offer` · `Agentic` · `Crypto` · plus standalone `Predict`, `Gold`, `Legend`, `Learn`, `Support`, and a `🇺🇸 US` locale switcher.

`What We Offer` holds 14 items: `Invest` · `IPO Access` · `Strategies` · `Retirement` · `Options` · `Futures` · `Trading` · `Custodial` · `Ventures` · `Social` · `Banking` · `Gold Card` · `Platinum Card` · `Concierge`.

**Three observations.** `Agentic` is a top-level nav group in 2026, holding `Agentic Trading` and `Agentic Credit Card` — AI-agent products promoted above crypto. `Social` sits in the same list as `Retirement`, which is a striking adjacency for a brokerage. And `Invest`, `Trading` and `Options` are three separate destinations whose boundaries are not obvious from the labels alone.

**Footer is three columns** — `Product` (28 entries, the fullest inventory), `Legal & Regulatory`, `Company` — plus four sitemaps and two tagline lockups.

`Legal & Regulatory` as a named footer group containing five entries (`Terms & Conditions`, `Disclosures`, two separate privacy statements, `Law Enforcement Requests`, `Your Privacy Choices`) is notable: **two distinct privacy statements are listed side by side** — `Robinhood US User Privacy Statement` and `Robinhood Markets US Web Visitor Privacy Statement` — because a site visitor and an account holder are governed by different documents, and Robinhood refuses to merge them.

**Two trademarked taglines appear in the footer**: `DEMOCRATIZE FINANCE FOR ALL™` and `PARTICIPATION IS POWER™`. Both are mission statements rather than product claims, and both sit immediately above the risk disclosure block. The juxtaposition — a democratisation slogan directly above "All investing involves risk" — is the T14 tension rendered as page layout.

**Help-centre category tree** `[observed]`, recovered from the left nav of article pages — 21 categories:

`Getting started` · `Account and login` · `Investing` · `Agentic trading and cards` · `Robinhood Gold` · `Robinhood Strategies` · `Robinhood Crypto` · `Robinhood Ventures` · `Robinhood Legend` · `Robinhood Derivatives` · `Retirement` · `Robinhood Concierge` · `Bank transfers and linking` · `Robinhood Banking` · `Robinhood Platinum Credit Card` · `Robinhood Gold Credit Card` · `Spending` · `Robinhood Wallet` · `Robinhood Chain` · `Documents and taxes` · `General questions`

**Thirteen of twenty-one categories are brand-prefixed** (`Robinhood X`), which mirrors the legal-entity structure — each product is a separate company, and the help IA inherits that. It makes the tree long and repetitive to scan, but it is honest: a user in `Robinhood Derivatives` is dealing with a different regulator than a user in `Investing`.

**Sub-categories are descriptive phrases, not nouns** `[observed]`: `Investing with margin`, `Investing with stocks: Special cases`. The second is the more interesting — **a category explicitly named for edge cases**, holding `Day trading`, `Trading fees on Robinhood`, `About Regulation T calls`, `Wash sales`, `American Depositary Receipts`. Five topics that share nothing except that each will surprise a retail investor. Naming a category `Special cases` and filling it with the things that go wrong is a clean solution to the "where do I put the weird stuff" problem.

**Breadcrumbs are present and three-deep** `[observed]`: `Help Center > Investing > Investing with margin`.

## T2 Value proposition & headline patterns `[observed]`

**No single stable hero.** The homepage leads with a rotating set of campaign and product modules rather than one value proposition:

- `HOOD Summit '26 Engines of Creation` — an event livestream, with `Add to calendar`
- `Send your agent / to the market` — a two-line headline for `Agentic Trading`
- `Agentic Credit Card` — "A virtual credit card built for your AI agent, with 3% cash back and controls you define."
- `Build your strategy and track market trends, seamlessly`
- `Get started with Robinhood Crypto Trade crypto 24/7`
- `Your portfolio, handled by the pros`
- `Join a new generation of investors`

**`Join a new generation of investors` is the closest thing to a thesis**, and it is a *membership* claim rather than a product claim — the proposition is belonging, not returns. `Democratize finance for all™` does the same work in the footer.

**Headlines on the options page are three-word fragments with full stops:**

- `Seamless. Intuitive. Options trading.`
- `Powerful. Smooth. Trades.`
- `Fine-tune your trading strategy`
- `Plan, build, and execute strategies`
- `Discover options without trading`
- `Put your collateral to work`
- `More Options. Lower Fees.`
- `Level up your options strategies`

**This is the single most important stylistic finding in the file.** `Seamless. Intuitive. Options trading.` and `Powerful. Smooth. Trades.` apply the vocabulary of consumer software — seamless, intuitive, smooth — to a derivatives product whose own regulator-mandated disclosure, five lines below, says it "may involve the potential of losing the entire investment in a relatively short period of time."

`Level up` appears twice on the options page (`Level up with Robinhood Gold`, `Level up your options strategies`), and `Get started with options` is the Learn module title. `Level up` is game vocabulary, and Robinhood also operates a literal **option trading level** system (the Strategy Builder copy: "**Depending on your trading level**, you can build vertical spreads, calendar spreads, strangles, straddles, and more"). The gamified phrase and the regulatory permissioning concept share a word, which is either an unusually elegant pun or an unusually unfortunate one.

`Discover options without trading` (the Watchlist feature — "Save and monitor options contracts to see their **hypothetical returns**") is the most defensible piece of options marketing on the page: a paper-trading affordance framed as discovery.

**Benefit copy is numeric and rate-led**: `3.6% APY with high-yield Cash`, `Bigger Instant Deposits` ("Trade right away with deposits up to 3× your portfolio value"), `Get your first $1k of margin interest-free` ("Then enjoy margin rates between 4.2% and 5.25%.**"), `No contract fees or commissions for all stock and ETF options.`

`Trade right away with deposits up to 3× your portfolio value` is worth recording: instant credit on an unsettled deposit, sold on immediacy, and the failure mode (ACH reversal creating an account deficit) is documented only in a help article three clicks away. See T7.

**The Protection Guarantee block** `[observed]` — four first-person-plural promises with illustration icons:

- `We work hard to keep your data safe and secure.`
- `We protect your account from unauthorized activity.`
- `We provide multi-factor authentication on all accounts.`
- `We've got your back. We're available to you 24/7.`

Note the hedge in the first: **`We work hard to`** rather than "We keep". And note what the block is *not* about — it is headed `Robinhood Protection Guarantee` but covers only account security, not investment loss. A user scanning for "is my money protected" gets a data-security answer. The actual protection answer (SIPC on brokerage, nothing on crypto or futures) is in the footer block.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Nav, repeated | Primary |
| `Log in` | Nav | |
| `Get started` | Homepage, options page ×2, agentic modules ×2 | Dominant |
| `Learn more` | Campaign banner, trading module, crypto module, referral banner | Four bare `Learn more`s |
| `Add to calendar` | HOOD Summit module | Event CTA on a brokerage homepage |
| `Start earning with Gold` | Options page, Gold module | |
| `Sign up to access Robinhood Learn` | Homepage Learn module | **Educational content gated behind signup** — see T11 |
| `See Investing Articles` / `See Options Articles` / `See Crypto Articles` / `See Futures Articles` / `See Prediction Markets Articles` | Learn, one per track | Consistent `See <Track> Articles` pattern |
| `See Library` | Learn, catch-all | |
| `View important disclosures` | Footer, every page | Expands the disclosure block |
| `Options Disclosures` / `Advanced Charts Disclosures` / `Strategy Builder Disclosures` / `Watchlist Disclosures` / `Index Options Disclosure` / `Terms and disclosures` | Options page, **one per feature module** | See T10 — the standout pattern |
| `Crypto Risk Disclosures` | Homepage crypto module | Same pattern on the homepage |
| `Was this article helpful?` | Foot of every help article | Feedback |
| `Contact Robinhood Support` | Foot of every help article, under `Still have questions?` | |
| `Customer Relationship Summaries` / `FINRA's BrokerCheck` | **Footer of every page, above the social links** | Regulatory artefacts as permanent footer furniture |

**`FINRA's BrokerCheck` in the site footer of every single page** is the detail worth stealing. BrokerCheck is the regulator's own public record of a broker's disciplinary history — linking to it permanently, unprompted, is the strongest available trust signal precisely because Robinhood does not control what it says.

**In-product paths named in help bodies** `[documented]`: `Account (person icon) → Investing → Margin investing`, `Menu (3 bars)`, `Margin investing settings`, `Disable margin investing`, `Investing → Buying power`, `Account → History`, `Account → Robinhood Gold`. Robinhood consistently gives **both the web path and the app path in one line** — "`Account` (person icon) → in the app, `Menu` (3 bars)" — rather than splitting the article into two procedures.

## T4 Onboarding & getting-started

**Margin application is a gated, four-step flow, and the gate is stated before the steps** `[documented]`:

> "Margin investing access isn't automatic. **You must apply** and will only get access if you meet eligibility requirements."

Then, after the steps, the threshold: "**Note:** You must meet eligibility requirements and have a minimum portfolio value of **$2,000** before you can access margin investing."

The steps themselves are three lines (`Account` → `Investing` → `Margin investing` → follow the on-screen instructions), so the article is **mostly gate and mostly risk**, with the mechanics as an afterthought. For a feature that can produce losses exceeding deposits, that ratio is correct.

**A suitability question is asked as an article section heading** `[documented]`:

> **`When would I consider margin investing?`**
> "You have to determine whether margin investing is consistent with your investment strategy. You should consider your own investment experience, goals, and sensitivity to risk. **By enabling margin investing for your investing account, Robinhood isn't recommending the use of margin investing.**"

Three moves: hand the decision to the user, name the three factors to weigh, and **explicitly disclaim that making the feature available constitutes a recommendation**. That last sentence is a Reg BI-shaped disclaimer written in plain language and placed inside a help article rather than a PDF.

**Options onboarding is level-gated** `[observed]`: "Depending on your **trading level**, you can build vertical spreads, calendar spreads, strangles, straddles, and more." A permissioning tier named but not explained on the marketing page.

**Incentive onboarding** `[observed]`: `Invite friends, get up to $15K of stock: Bring your friends in and get rewarded. Terms apply.` and `It's officially HOOD month. See how you can get rewarded. Terms apply. Subscription may apply.` — both carry `Terms apply` inline in the banner, and the second adds `Subscription may apply`, disclosing that the reward may require a paid tier.

**The `Get started` → `Sign up` path is short**; no public account-requirements page was found. `[absent]`

## T5 Form & field labels

Public forms are `[absent]` — account opening is behind `/signup/`.

**In-product values named in help bodies** `[documented]` — the margin dashboard is described field by field:

| Field | Definition (verbatim, trimmed) |
|---|---|
| `Total margin` | "the maximum margin that your investing account is allowed to have based on your portfolio value (excluding any crypto positions) and the nature of your holdings" |
| `Margin used` | "The portion of your margin available that you're currently using (i.e., **your debit balance**)" |
| `Borrowing limit` | "The maximum limit you set on the amount of margin you can use" |
| `Buying power` | Tracked under `Investing → Buying power` |
| `Total maintenance requirement` | The equity floor below which a call is triggered |

`Margin used` glossed as "**i.e., your debit balance**" is a good bridge: the friendly label is given, then the accounting term the user will see on a statement. Both vocabularies, one line.

**`Borrowing limit` is a user-set self-restraint control** `[documented]`, and the copy frames it that way: "You can set a borrowing limit to help you **control how much money you're investing on margin**. By setting a limit, you can restrict the amount of margin you have to the amount that **you feel comfortable using**." A voluntary ceiling, described in terms of comfort rather than compliance. Then the honest caveat: "There are **some scenarios** where the margin used **could go above the borrowing limit**. For example, if you get early assignment on an option spread or a bank deposit is reversed after using Instant Deposits."

**A self-imposed limit that the system can breach, with the two breach conditions named.** Most products would ship the limit and stay quiet.

**Pre-filled deposit amounts, disclaimed** `[documented]` — the margin-call flow offers a suggested deposit, and the copy immediately undercuts it:

> "you may see a pre-filled or optional deposit amount that we expect will help keep your portfolio value above your total maintenance requirement. **However, depositing the suggested amount doesn't guarantee that you won't get a margin call.** Any pre-filled or optional deposit amount is provided solely for your reference, is subject to change, and **isn't a recommendation**. You can always enter a different deposit amount or sell stocks..."

A default value in a money field, with three disclaimers attached: not a guarantee, not a recommendation, and an alternative offered. This is the correct treatment for any pre-filled financial input.

## T6 Status & state language — PRIORITY

Robinhood's state vocabulary is **regulatory rather than workflow-shaped** — the states that matter are account conditions defined by FINRA and the Fed, not steps in a pipeline.

### Account deficit and margin states `[documented]`

| State | Definition (verbatim, trimmed) |
|---|---|
| `margin maintenance call` | "when your portfolio value decreases to less than your total maintenance requirement" |
| `total maintenance requirement` | The equity floor; "Robinhood Financial can change its maintenance requirements at any time without prior notice" |
| `account deficit` | Triggered by a fall below the maintenance requirement, by ACH reversal, by fees, or by early assignment |
| `intraday margin deficit (IMD)` | "Occurs when your account equity decreases to less than the maintenance requirement" — monitored **in real time** |
| `Account restriction` | "Repeated failures to meet requirements can lead to further restrictions" |
| `Regulation T call` | A named article in `Special cases` |
| `PDT flag` / `day trade call` / `day trade restrictions` | **Retired** on 2026-06-04 |

**The `$2,000` regulatory minimum and the `$25,000` PDT minimum are both named**, and the article tells the user which survived the rule change.

### The PDT → intraday margin transition, documented as a change `[documented]`

`Day trading` (the article formerly at `pattern-day-trading`) opens not with a definition but with **a dated regulatory change and a three-bullet "what this means for you"**:

> "On June 4, 2026, FINRA's new **intraday margin** standards will replace Pattern Day Trading (PDT). What this means for you starting on June 4th:
> - No more day trade restrictions or day trade calls with your Robinhood margin account.
> - If you had a pattern day trading (PDT) flag or restrictions on your account, **they'll be removed. You will now be eligible for the High-Yield Cash Program and Stock Lending.**
> - You will no longer need to maintain a $25,000 minimum portfolio value to day trade in your margin account. **Keep in mind that the $2,000 margin minimum equity requirement will still apply.**"

**This is the best-structured regulatory-change communication in the corpus sample.** Four things it does right: it dates the change; it leads with what is *removed* rather than what is added; it tells previously-restricted users about **a second-order benefit they would not have thought to look for** (eligibility for two other products they were locked out of); and it closes by naming the requirement that did *not* change, pre-empting the over-reading of "no more minimum".

The replacement regime is then defined in three labelled terms — `Margin maintenance requirement`, `Intraday margin deficit`, `Account restriction` — each a bolded label followed by a one-sentence definition. Bold-label-then-definition is the house pattern across Robinhood's help content.

The mechanism is stated plainly: "we monitor accounts **in real-time** to prevent your account activity from creating or increasing intraday margin deficits."

### The hard consequence, stated four different ways `[documented]`

Across three articles, the liquidation warning appears in four formulations, escalating in specificity:

- "you risk Robinhood closing some or all of your securities positions, **with or without your prior approval**"
- "**We can sell some or all of your securities or other assets without consulting you** to pay off your margin debt"
- "**You're not entitled to choose which securities we sell** from your account to cover your margin debt"
- "Unresolved deficits **may result in Robinhood liquidating some or all of your positions** to cover the outstanding balance **without prior notice to you**"

Second person, active voice, Robinhood as the subject of the verb `sell`. No passive, no "positions may be closed". **The company names itself as the actor in the action the user will hate most.**

And the third bullet is the one most brokers omit: not just *that* we will sell, but that **you do not get to pick what we sell**.

### Crypto exclusion, repeated as a state rule `[documented]`

A single fact is repeated in a `Note` box **four separate times** across three articles:

> "Crypto holdings are not factored in when issuing margin calls because they aren't securities and are held with our affiliate, Robinhood Crypto, LLC."

**Deliberate redundancy on a cross-entity boundary.** A user watching their total portfolio value fall would reasonably expect their crypto to count toward their margin cushion. It does not, because it sits in a different legal entity. Robinhood repeats the fact at every point where the user might be looking at the wrong number — and each repetition gives the *reason* (not securities, different affiliate), not just the rule.

A second, related rule: "Crypto positions **can't be traded on margin**. They're not accounted for in your portfolio value..."

Then a countervailing detail, in the resolution section: "you may also sell **non-marginable positions, such as options or crypto** to cover your maintenance call." Crypto cannot help you avoid a call but can help you resolve one. Both halves stated.

### Options expiry states `[documented]`

`exercise`, `assignment`, `early assignment`, `in-the-money`, `long leg`, `short leg`, `spread`. The deficit article explains the assignment failure mode in a paragraph:

> "If you're trading an options spread, your long leg generally covers your short leg. **However, you may have an account deficit if the short leg of your options spread is assigned prior to the expiration date.** If you're assigned early on a short leg, it can lead to margin being used if it overspends your available buying power..."

Then the brokered outcome: "An account deficit due to early assignment **might result in a margin call**. In these cases, **our brokers are likely to take action to cover your position for you.**"

`our brokers are likely to take action to cover your position for you` is a carefully hedged sentence describing a forced transaction as a service. It is accurate — the broker will close the position — and the framing (`for you`, `cover`) is softer than the four liquidation warnings quoted above. **Recorded as a register inconsistency on the same consequence.**

### Instant Deposits reversal as a state `[documented]`

> "If you spend some or all of your Instant Deposits and your scheduled ACH transfer is canceled (your transfer is reversed), the amount of the reversed deposits will be deducted from your buying power, **potentially causing you to have an account deficit**."

The marketing says `Trade right away with deposits up to 3× your portfolio value`. The help article says that if the deposit fails after you have traded, you owe the money. Both are true; they are four clicks apart.

### Timing `[documented]`

`Resolve your account deficit **by the end of the trading day**` · interest "calculated **daily at the end of the day** based on settled margin balances" · "charged to your investing account **every 30 days** at the end of your billing cycle" · "**first 30 days are free**" (Gold) · "**24/5**" (extended-hours stocks) · "**24/7**" (crypto).

And a bounded non-entitlement: "**You're not entitled to an extension of time on a margin call.**"

## T7 Error, failure & recovery — PRIORITY

### The six-bullet margin risk list `[documented]`

The single densest piece of risk copy on the site, under the question heading `What are the risks of margin investing?`:

> "Margin investing is risky and it's not appropriate for everyone. Before considering margin investing, you should fully understand the risks involved:
> - **You can lose more money than you deposit**
> - You'll be responsible for any deficit if falling prices reduce the value of your securities below the total maintenance requirement, and you may have to deposit additional funds to your investing account **on short notice** to cover market losses
> - We can sell some or all of your securities or other assets **without consulting you** to pay off your margin debt
> - You're not entitled to choose which securities we sell from your account to cover your margin debt
> - We can change maintenance requirements **at any time** and aren't required to provide you advance written notice
> - **You're not entitled to an extension of time on a margin call**"

Six bullets. The first is the headline loss. The middle four are all **things the user cannot control or refuse**. Two begin `You're not entitled to` — a phrase that appears nowhere in the marketing copy and is the most legally precise construction in the file. There is no softening clause, no "however", no reassurance at the end of the list.

Immediately before it, a sentence that explains the *mechanism* of amplification rather than just asserting it:

> "If the security loses value, **the losses will be deducted from your account value—not the funds you borrowed**—so it's possible for margin to amplify your losses."

That em-dashed interjection is the whole of leverage explained in eleven words. **The loan does not absorb the loss; you do.** Most margin explainers never say this.

### Symmetric worked examples — the standout educational pattern `[documented]`

The margin article gives two parallel scenarios, `Profit example` and `Loss example`, with **identical opening conditions** ($5,000 cash + $5,000 margin, 100 shares at $100), diverging only at the price move ($125 vs $75), and both ending with the same comparison to the unleveraged case:

- Profit: "there's an unrealized profit of **$2,500** as opposed to **$1,250** if you didn't invest on margin"
- Loss: "there's an unrealized loss of **$2,500** as opposed to **$1,250** if you didn't invest on margin"

**Same numbers, opposite signs, presented as equals.** The symmetry is the argument: leverage doubles both directions, and the article refuses to show the upside without the matching downside at identical magnitude. Placing them adjacent, with the same structure and the same counterfactual, is a much stronger piece of risk education than any warning paragraph — because the user does the arithmetic themselves and the two outcomes look equally plausible.

This is the most transferable single artefact in this file.

### Prevention before recovery `[documented]`

`How do I avoid a margin call?` precedes `How to resolve a margin call`. The prevention section opens with a jarring register shift — "**Margin calls are no fun, so we're happy to give you some tips on how to avoid them**" — colloquial, first-person-plural, cheerful, in an article whose risk list says you can lose more than you deposit. Recorded as a tone inconsistency.

The tips themselves are good: a **deep link to the live comparison** (`compare your portfolio value to your total maintenance requirement with this link`), the notification schedule (see T9), and the disclaimed pre-filled deposit (see T5).

### Resolution paths, ranked and alternative-first `[documented]`

`How to resolve a margin call` offers two routes, and the second is framed as the way to avoid the first:

1. "Deposit additional funds or initiate an account transfer..."
2. "Close some of your securities positions to cover the required amount. The proceeds from closing positions can help cover your margin call. **This may allow you to avoid depositing additional funds.**"

**Telling a user in distress how not to send you more money** is the right instinct. And the non-marginable escape hatch is named: "you may also sell non-marginable positions, such as options or crypto to cover your maintenance call."

`How do I stop investing on margin?` gives three ways to unwind the debt before giving the four-step toggle to disable the feature — **fix the position, then turn off the tap**, in that order. With a closing caveat: "If you're approved for options trading, **margin may be required to satisfy an exercise or assignment even if margin investing is disabled.**" Turning the feature off does not fully exit the exposure, and the article says so.

### Deficit causes, enumerated `[documented]`

`With margin investing enabled, why do I have an account deficit?` is organised by **cause**, with four section headings:

`Margin requirements` · `ACH reversals after using Instant Deposits` · `Fees or charges` · `Option exercise and assignment`

`Fees or charges` names the two commonest culprits specifically: "**Robinhood Gold subscription charges** and fees associated with **American Depositary Receipts (ADRs)**." A $5 subscription fee tipping an account into deficit is an unglamorous, real, and easily-missed cause — and it is named ahead of the exotic ones.

The article also opens with a **routing line for the wrong reader**: "**Before you begin** — If you aren't using the margin investing feature, check out *I'm not using the margin investing feature. Why do I have an account deficit?*" Two near-identical articles for two account types, cross-linked at the top of each.

Cross-account contagion is documented: "If you have multiple individual margin accounts, a margin call or deficit in one account **can limit your buying power across all of them.**" And joint-account liability: "For joint investing account deficits, **both owners are equally responsible** for resolving them."

### Failure prevention offered as a separate article `[documented]`

`How to prevent bank transfer reversals` is linked from the deficit article — a preventive article for the cause, not just a remedial one for the effect.

### What is missing `[absent]`

No order-rejection, order-failure, or error-message copy was reachable. The states a user meets when a trade does not go through (`Rejected`, `Cancelled`, `Partially filled`, insufficient buying power) are behind auth.

## T8 Empty states `[absent]`

No no-data, no-results, or first-run strings were reachable. The support home, where a zero-results search state would live, is client-rendered.

## T9 Notifications & system messages

**The margin-call notification ladder, published** `[documented]`:

> "Look out for updates from us when your portfolio value is getting close to your investing account's total maintenance requirement. You'll typically receive an **in-app message when you're close to receiving a margin call**, and **after you get a margin call, you'll receive an email**."

**Two stages, two channels, deliberately split.** The pre-warning is in-app, where the user is already looking at their portfolio and can act immediately; the call itself is email, which is durable, timestamped and on the record. Channel chosen by the job the message has to do — the same reasoning Coinbase applies to its status subscriptions.

The hedge `typically` is honest: real-time market moves mean the warning is not guaranteed to arrive before the call.

**Notification content is disclaimed** — the pre-filled deposit amount that accompanies these messages is explicitly "provided solely for your reference, is subject to change, and isn't a recommendation" (see T5).

**Campaign banners** `[observed]`, site-wide, each with inline qualifiers:

- `It's officially HOOD month. See how you can get rewarded. **Terms apply. Subscription may apply.**`
- `Invite friends, get up to $15K of stock: Bring your friends in and get rewarded. **Terms apply.**`

**`Terms apply` inside the banner text**, not as a superscript — the qualifier is in the sentence the user reads, at the same size. Small, and better practice than the footnote model.

**Article feedback**: `Was this article helpful?` plus a **`Reference No.`** on every help article (`Reference No. 5933680`, `5801488`, `5502791`, `4753078`) and a compliance ID on every marketing page (`4784959`, `5762469`). Publishing a per-article reference number is a regulated-industry habit — it lets a support agent, a compliance reviewer, or a regulator pin a conversation to an exact published version.

**Contact routing**: `Still have questions? Contact Robinhood Support` at the foot of every article, plus `Robinhood Concierge` as a named premium support product in the nav and help tree.

## T10 Disclosures, legal & compliance — PRIORITY

The strongest and most systematic disclosure practice in this corpus sample.

### Per-module disclosure links — the standout pattern `[observed]`

On the options page, **every feature module carries its own disclosure link, sitting directly under that module's copy**:

| Module | Disclosure link |
|---|---|
| Hero (`Seamless. Intuitive. Options trading.`) | `Options Disclosures` |
| Advanced Charts | `Advanced Charts Disclosures` |
| Strategy Builder | `Strategy Builder Disclosures` |
| Watchlist | `Watchlist Disclosures` |
| Robinhood Gold | `Terms and limitations apply` |
| Index Options | `Index Options Disclosure` |
| Gold (main) | `Terms and disclosures` |

And on the homepage, the crypto module carries `Crypto Risk Disclosures`.

**This is the correct answer to the problem Coinbase gets wrong.** Rather than one superscript resolving to a block 1,500 words away, each claim has a disclosure attached at the point of the claim, named for the feature it qualifies. A user reading about Strategy Builder does not have to know that a footnote exists or scroll to find it.

Several modules go further and carry **inline** qualifier text rather than only a link:

- Hero: "Options are risky and aren't suitable for all investors. To learn more, read the **Options Disclosure Document**."
- Strategy Builder: "Certain complex options strategies carry additional risk. **Not a recommendation of a strategy.**"
- No-fee claim: "**Other fees, like index options contract fees, may apply.**" — immediately under `No contract fees or commissions for all stock and ETF options.`
- Gold APY: "*Terms apply. Rate subject to change."
- Competitive claim: "Competitor data as of **02/14/2025**." — a comparative claim with its data date

The Gold margin footnote is the most candid: "For margin enabled customers, to earn interest through the High-Yield Cash program, **a cash balance is needed. If you have a margin balance, there is no cash balance to earn interest.**" Two Gold benefits are mutually exclusive, and the footnote says so.

And the AI disclaimer: "**Robinhood Cortex features use generative artificial intelligence and are provided for informational purposes only. They shouldn't be viewed as research or a recommendation to buy, sell, or hold a security or asset.**"

### The standing footer block — eight entities, one at a time `[observed]`

Roughly 600 words on every page, opening with a bolded four-word sentence:

> **All investing involves risk.**

Then **one bolded paragraph per legal entity**, each following the same template — *what the service is*, *which entity provides it*, *what that entity is registered as*, *what protection applies*:

- "**Brokerage services** are offered through Robinhood Financial LLC, ('RHF') a registered broker dealer (member SIPC), and clearing services through Robinhood Securities, LLC, ('RHS') a registered broker dealer (member SIPC)."
- "**Futures and cleared swaps trading** is offered by Robinhood Derivatives, LLC, ('RHD') a registered futures commission merchant with the Commodity Futures Trading Commission (CFTC) and a Member of the National Futures Association (NFA). **RHD is not FDIC insured or SIPC protected.**"
- "**Cryptocurrency services** are offered through an account with Robinhood Crypto, LLC ('RHC') (NMLS ID: 1702840)... **Cryptocurrency held through Robinhood Crypto is not FDIC insured or SIPC protected.**"
- "**The Robinhood spending account** is offered through Robinhood Money, LLC ('RHY') (NMLS ID: 1990968), a licensed money transmitter."
- "**Robinhood Gold Card** is subject to credit approval and underwriting... **RCT is a financial technology company, not a bank.**"

Then the aggregate negation:

> "RHF, RHS, RAM, RHD, RHC, RHY, RCT, and RHG are affiliated entities and wholly owned subsidiaries of Robinhood Markets, Inc. **RHF, RHS, RAM, RHD, RHC, RHY, RCT, and RHG are not banks. Investing products offered by RHF are not FDIC insured and involve risk, including possible loss of principal.**"

**Listing all eight abbreviations twice in one sentence** is legally exhaustive and rhetorically deadening — but the structure works, because a user who wants to know about one product can find its paragraph.

**The pass-through insurance qualification** matches Coinbase's precision:

> "RHY is not a member of FINRA, and products are not subject to SIPC protection, **but funds held in the Robinhood spending account and Robinhood Cash Card account may be eligible for FDIC pass-through insurance**..."
> "Funds held in your Robinhood Cash Card account at Sutton Bank are eligible for FDIC insurance up to $250,000 **and will not accrue or pay any interest**. **The availability of FDIC insurance is contingent upon Robinhood maintaining records acceptable to the FDIC, as receiver, if Sutton Bank should fail.** FDIC insurance limits apply collectively to all of your deposits held at Sutton Bank."

Four qualifications on one protection claim: *may be eligible*, *will not pay interest*, *contingent on Robinhood's recordkeeping*, and *limits apply collectively across all deposits at that bank*. The last is the one most users would miss — a customer with a separate Sutton Bank account shares one $250,000 ceiling.

### The options risk paragraph — the boilerplate, verbatim `[observed]`

The closing paragraph of the footer block, present on every page:

> "Options trading entails significant risk and is not appropriate for all customers. Customers must read and understand the **Characteristics and Risks of Standardized Options** before engaging in any options trading strategies. Options transactions are often complex and may involve the potential of **losing the entire investment in a relatively short period of time**. Certain complex options strategies carry additional risk, including the potential for **losses that may exceed the original investment amount**."

This is the OCC-mandated disclosure. Its placement — the last paragraph of a 600-word grey block at the foot of a page headed `Seamless. Intuitive. Options trading.` — is the structural fact this product is in the corpus to illustrate.

### The Disclosure Library — ~90 documents, each date-stamped `[observed]`

`robinhood.com/us/en/about/legal/` is titled **`Disclosure Library`** and lists roughly ninety PDFs, **each with a last-updated date and time** (e.g. `RHF and RHS Margin Disclosure Statement — Aug 28, 2026, 04:11 PM`; `RHD Perpetual Futures Risk Disclosure — Sep 16, 2026, 03:43 PM`).

**Timestamping every legal document to the minute, publicly, is exceptional practice.** It lets a user — or a regulator, or a journalist — establish exactly which version governed a given date without a subpoena.

Risk-specific documents named in the library:

`Characteristics and Risks of Standardized Options` · `Robinhood Crypto Risk Disclosures` · `RHD Futures Risk Disclosure Statement` · `RHD Perpetual Futures Risk Disclosure` · `Event Contracts Risk Disclosure` · `Initial Public Offering Risk Disclosures` · `Special Purpose Acquisition Companies: Risk Disclosure Statement` · `RHF and RHS Margin Disclosure Statement` · `RHF Use and Risk Disclosures` · `Extended Hours Trading Disclosure` · `RHF Low-Priced Securities Disclosure` · `RHF-RHS Market Volatility Overview` · `Reg BI Disclosure` · `RHF SEC Rule 606 and 607 Disclosure` · `RHF SIPC and Account Protection` · `RHF and RHS Business Continuity Plan Summary` · `RHS Audited Statement of Financial Condition` / `RHS Unaudited Statement of Financial Condition`

**Two entries are the most striking in the whole corpus sample:**

- **`RHD Low Experience Risk Disclosure`** (Feb 12, 2026)
- **`RHD Low Income Risk Disclosure`** (Feb 12, 2026)

Two separate futures risk disclosures, published the same day, **targeted at users identified as inexperienced or low-income.** Segmenting a risk disclosure by the customer's own vulnerability — and publishing both in a public library — is a genuinely unusual piece of disclosure design. It concedes that one warning does not serve all readers, and that suitability is a property of the person, not only of the product.

Also notable: **`Cortex Assistant Disclosure`**, **`Custom Indicators and Scans Disclosure`**, **`Scanner Disclosure`** — separate disclosures for AI and for screening tools, because a scanner that surfaces securities is arguably making a recommendation.

And **`Robinhood App Use Standards`**, **`Robinhood Crypto Customer Code of Conduct`**, **`Robinhood Social User Agreement`**, **`Standard Social Media Disclosures`** — a brokerage with a social feed needs conduct rules and social-post disclosure standards, and it has published all four.

`RHF Jurisdictions` and `RHF Funds Availability` round out the eligibility disclosures.

### Educational-content disclaimers `[observed]`

Robinhood Learn carries **three stacked disclaimer paragraphs** at the foot of its index, and the Learn-specific one is the sharpest sentence on the site:

> "**This information is educational, and is not an offer to sell or a solicitation of an offer to buy any security. This information is not a recommendation to buy, hold, or sell an investment or financial product, or take any action. This information is neither individualized nor a research report, and must not serve as the basis for any investment decision.**"

`neither individualized nor a research report` and `must not serve as the basis for any investment decision` do the work Reg BI requires: the education is general, it is not advice, and acting on it alone is the user's own decision.

Plus source hedging: "Information is from sources deemed reliable on the date of publication, **but Robinhood does not guarantee its accuracy.**"

Per-asset-class disclaimers follow: crypto ("Trading and owning digital assets involves significant risk, including the risk of **substantial loss**"), futures ("**Please carefully consider if it's appropriate for you in light of your personal financial circumstances**"), and event contracts (routing to the `Event Contract Risk Disclosure`).

### Margin disclosures inside help articles `[documented]`

Every margin help article ends with a `## Disclosures` section repeating four paragraphs — the hypothetical-examples disclaimer, the suitability instruction, the maintenance-requirement warning, and the variable-rate disclosure — and then routes to **FINRA's own investor alert**:

> "For more information, review **FINRA's Investor Alert** [*Investing with Borrowed Funds: No "Margin" for Error*] and Robinhood Financial's Customer Relationship Summary, Margin Disclosure Statement, and Margin Agreement."

**Linking the regulator's warning about your own product, from inside your own help article, is the strongest form of this pattern.** Robinhood does not control what FINRA says and links to it anyway.

The rate-change disclosure is unusually direct: "**The margin interest rate may change at any time without notice and at Robinhood Financial's discretion.**" And: "The formulas used to calculate the margin interest rate are **subject to change at Robinhood Financial's discretion.**"

### Fee disclosure `[observed]` / `[documented]`

Fee schedules are PDFs (`RHF Fee Schedule`, `RHC Fee Schedule`, `RHD Fee Schedule`, `Robinhood Money Fee Schedule`) and were not opened. Figures visible in HTML:

- `Gold subscription $5/month`; "Your first 30 days are free"
- Margin: "**first $1,000** of margin investing is included with your subscription fee" (Gold); rates "between **4.2% and 5.25%**"; a **worked interest calculation** in the help article — "`$3,000 * (5.25% / 360) = $0.44 per day`", and the Gold variant "`$2,000 * (5.25% / 360) = $0.29`"
- `3.6% APY` on eligible brokerage cash (Gold); `3.6% interest on short puts and eligible multi-leg strategies`
- `No contract fees or commissions for all stock and ETF options`, qualified by "Other fees, like index options contract fees, may apply."
- Strategies: "Robinhood Gold members get **zero management fees on every dollar over $100K**"

**Showing the interest formula with real numbers**, twice, once with and once without the Gold allowance, is the right way to explain a daily-accrual charge. The `/360` day-count convention is exposed rather than hidden.

## T11 Help-centre architecture

### Help centre `[observed]` (partial)

The support home is client-rendered and returned an empty shell (`Hello! How can we help?` plus 21 blank `View all` tiles). **The 21 category names were recovered from the persistent left nav on article pages** and are listed in T1.

**Article structure is rigorously consistent** across all four articles captured:

1. Title as a **question or a noun phrase**
2. Optional `Before you begin` routing box
3. Optional `Note` / `Keep in mind` callout
4. `##` sections, each with an anchor link and a duplicated heading
5. Expandable Q&A blocks under `## FAQ`
6. `## Disclosures` — always last, always substantial
7. `Was this article helpful?`
8. `Reference No. NNNNNNN`
9. `Still have questions? Contact Robinhood Support`

**Article-title grammar — three shapes, and the dominant one is a question:**

| Shape | Examples |
|---|---|
| **Question in the user's voice** | `What's margin investing?` · `What does it mean if I get a margin call?` · `How do I know when I'm investing on margin?` · `How much money do I need in my account to invest on margin?` · `Can I increase my available investable margin?` · `Why can't I use all of my buying power?` · `What's the total maintenance requirement?` · `What's margin withdrawal?` · `With margin investing enabled, why do I have an account deficit?` |
| Noun phrase | `Short selling` · `Day trading` · `Wash sales` · `American Depositary Receipts` |
| `About X` | `About Regulation T calls` |

**Nine of fourteen margin articles are questions, and the questions are written as a user would ask them** — contracted (`What's`), first person (`Why can't I use all of my buying power?`), and framed around confusion rather than function. `Why can't I use all of my buying power?` is the model: it names the exact wrong expectation the user has arrived with.

`With margin investing enabled, why do I have an account deficit?` puts **the qualifying condition first**, so the reader self-selects before the question. Its sibling — `I'm not using the margin investing feature. Why do I have an account deficit?` — uses the same construction with a first-person statement. Two articles distinguished entirely by a leading clause, cross-linked at the top of each.

**Contractions throughout titles** (`What's`, `can't`, `I'm`) is a consistent register choice and unusual for a regulated brokerage.

### Robinhood Learn — five tracks, each with a fixed shape `[observed]`

`robinhood.com/learn` is headed **`Your financial journey starts here`** and is organised into five asset-class tracks, each with an identical internal structure: a track name, a one-line scope, three featured articles with descriptions, a `There's more to learn` list, and a `See <Track> Articles` link.

| Track | Scope line (verbatim) |
|---|---|
| `Investing basics` | "The building blocks of your financial journey — What you need to know about investing from the get-go." |
| `Options trading essentials` | "Curious about options? **Learn the ins and outs from the pros before making your move.**" |
| `Crypto explained` | "Learn all about crypto, from how blockchains work to popular assets." |
| `Futures fundamentals` | "New to futures? We got you." |
| `Prediction Markets Explained` | "Learn how to trade event contracts based on real-world events." |

**`before making your move` in the options scope line is doing suitability work in four words** — the track is positioned as a prerequisite, not a companion, to trading.

**The featured-three-plus-more shape is the progressive-disclosure mechanism**, and within each track the three featured articles are ordered easiest-first:

*Investing basics*: `Investing 101` ("A good place to start. Get the low-down before you dive in.") → `What is an investment?` → `What is the stock market?` → `What is a stock?`

*Options*: `Getting started with options` ("What's the buzz about Options? Take a peek behind the curtain and get a preview of what they're about.") → `A big, little primer on options` ("Before you start trading, take a moment to learn about calls and puts.") → **`Risk management`** ("Options trading can be risky business, and it's important for any trader to have a handle on their personal risk management strategy.")

**Risk management is the third of three featured options articles — promoted to the same level as the primer.** Not buried in the `more to learn` list, not a footnote. For a product whose regulator requires a 180-page disclosure document, putting risk management on the front page of the options track is the right structural decision.

The `There's more to learn` list for options is the intermediate tier: `The long & short of trading` · `Trading calls & puts` · **`Navigating exercise & assignment`** · `Volatility explained`.

`Navigating exercise & assignment` is the article the brief asked about. Its title is the interesting part: **`Navigating`** frames assignment as something the user moves through rather than something that happens to them, which is a generous framing of a process that is largely involuntary. (The body was not retrievable at the slug tried — see Caveats.)

The futures track's `more to learn` list includes `How does futures margin work?` and **`Futures risk management`**; the prediction-markets list includes **`Profit vs. payout: understanding gains and losses in event contracts`** and **`Managing risk when trading event contracts`**.

**Every track has at least one explicit risk-management article.** Across five tracks that is a deliberate editorial rule, not a coincidence.

`Profit vs. payout: understanding gains and losses in event contracts` is the best title in the set — it names a distinction (what you make vs what the contract pays) that a new event-contract trader will otherwise learn the expensive way.

**Track copy is warm and short**: `New to futures? We got you.` (ungrammatical, deliberately). `A good place to start. Get the low-down before you dive in.` `Take a peek behind the curtain.` Register is explicitly conversational, several steps below the reading level of the disclosures on the same page.

**Additional Learn surfaces**: `Investor's Guild` (linked from the investing track), `The library` ("There's always more to learn when it comes to investing. Check out our entire library."), and `Snacks` (linking out to `sherwood.news`, Robinhood's separate media property).

### The gating problem `[observed]`

The homepage module promoting Learn says:

> **`Become a better investor on the go, right in the app`**
> "Here's a preview of the things you can learn when you sign up."
> `Sign up to access Robinhood Learn`

But `robinhood.com/learn` is fully public. **The in-app Learn experience is gated behind signup; the web Learn is not.** The homepage copy implies the education requires an account, which is the wrong incentive ordering for a product whose educational content is its stated differentiator — a prospective investor is told to open a brokerage account in order to learn whether they should open a brokerage account.

Recorded as the sharpest structural criticism available from public surfaces.

## T12 FAQs

### In-article FAQ blocks `[documented]` — the dominant FAQ surface

Robinhood has **no marketing FAQ block** on the homepage or the options page. `[absent]` there. The FAQ work is done inside help articles, under a `## FAQ` heading.

**`What's margin investing?` — eight FAQ questions:**

| # | Question (verbatim) |
|---|---|
| 1 | What are the risks of margin investing? |
| 2 | How to apply for margin investing? |
| 3 | When would I consider margin investing? |
| 4 | How much does it cost to use margin investing? |
| 5 | How do I stop investing on margin? |
| 6 | How much money can I borrow by investing on margin? |
| 7 | Where can I find how much I've borrowed and set a borrowing limit? |
| 8 | How is my interest rate calculated? |
| 9 | How does margin investing work with multiple accounts? |

**Ordering is the finding: `What are the risks` is Q1, ahead of `How to apply`.** The risk question precedes the enablement question inside the article that sells the feature. Q3 (`When would I consider margin investing?`) is a **suitability question as an FAQ**, and Q5 (`How do I stop investing on margin?`) is an **exit question placed fifth of nine** — before the two questions about borrowing more.

Risk → apply → suitability → cost → **exit** → borrow more → track → rate → multi-account. A user who reads in order encounters the off-ramp before the accelerator.

**`What does it mean if I get a margin call?` — section headings as questions**: `How do I avoid a margin call?` · `Why is my buying power unavailable when I have a deficit in another account?` · `How to resolve a margin call`. Avoidance before resolution, and a question about a *side effect in a different account* — the kind of cross-object confusion that generates support tickets.

Q9's answer contains a constraint most users would not guess: "Regardless of how many individual investing accounts you have open, **only 1 of them can be a margin account**. However, you can have multiple cash accounts."

### Register split

The FAQ questions are contracted and conversational (`What's`, `I've`, `How to apply for margin investing?` — the last being ungrammatical as a question but natural as a search query). The answers are longer and flatter. The gradient is right: the question is written for findability and recognition, the answer for accuracy.

## T13 Terminology & glossary

| Term | Robinhood's usage | The alternative it rejected |
|---|---|---|
| `margin investing` | **The feature name — never "margin trading" or "borrowing"** | "margin", "leverage" |
| `Margin used` | The debt, glossed "i.e., your debit balance" | "loan balance" |
| `Total margin` / `Borrowing limit` | Ceiling imposed vs ceiling chosen | |
| `total maintenance requirement` | The equity floor | "maintenance margin" |
| `intraday margin deficit (IMD)` | The post-PDT state, abbreviated on first use | |
| `account deficit` | The umbrella failure state, with four documented causes | "negative balance" |
| `buying power` | Spendable capacity | "available funds" |
| `Instant Deposits` | Credit against unsettled ACH | "advance", "provisional credit" |
| `Robinhood Strategies` | The managed-portfolio product (entity RAM) | "robo-advisor" |
| `Robinhood Legend` | The advanced desktop platform | "pro", "terminal" |
| `Robinhood Cortex` | The generative-AI assistant | |
| `Agentic Trading` / `Agentic Credit Card` | AI-agent products, `Agentic` as a nav group | |
| `Predict` / `prediction markets` / `event contracts` | **Three registers for one product** — nav, category, instrument | |
| `Gold` | The $5/month subscription (entity RHG) | "Premium" |
| `Concierge` | Named premium support | |
| `IPO Access` / `Ventures` / `Social` / `Chain` / `Connect` | One-word product names | |
| `Snacks` | Media brand, now `sherwood.news` | |
| `trading level` | The options permissioning tier | "approval level" |
| `long leg` / `short leg` / `early assignment` / `in-the-money` | Options terms used without gloss in help | |
| `wash sales` / `Regulation T` / `American Depositary Receipts` | Regulatory terms as article titles | |
| `Special cases` | Category for edge conditions | "Advanced topics" |
| `democratize finance for all™` / `participation is power™` | Trademarked mission statements | |

**`margin investing` is the term to argue about.** Every competitor says *margin trading* or simply *margin*. `Investing` is the softer word — it connotes patience and long horizons, where `trading` connotes activity and risk. Applying it to a leveraged, interest-bearing, liquidation-exposed facility is a deliberate softening, and it is used consistently in the feature name, the settings label (`Margin investing settings`), the help category (`Investing with margin`), and the toggle (`Disable margin investing`).

Set against that: the same articles say `You can lose more money than you deposit` and `You're not entitled to choose which securities we sell`. **The noun is soft and the verbs are hard.** That is the tension in one word.

**`Predict` / `prediction markets` / `event contracts`** is a three-tier register: the nav uses the shortest and most playful, the category page the descriptive middle, and the risk disclosure the precise instrument name. The Learn track covers all three and has an article explicitly bridging the last two (`What are event contracts?`).

## T14 Voice, tone & accessibility

### The register tension — the reason this product is in the corpus

Robinhood maintains **three distinct registers on the same page**, and the distance between the outer two is the largest in this corpus sample.

| Register | Where | Example |
|---|---|---|
| **Consumer-software** | Product headlines, nav, Learn track intros | `Seamless. Intuitive. Options trading.` · `Powerful. Smooth. Trades.` · `Level up your options strategies` · `New to futures? We got you.` · `Take a peek behind the curtain` |
| **Instructional-plain** | Help-article bodies, Learn article copy | "the losses will be deducted from your account value—not the funds you borrowed—so it's possible for margin to amplify your losses" |
| **Regulatory-flat** | Footer block, `## Disclosures`, Learn foot | "Options transactions are often complex and may involve the potential of losing the entire investment in a relatively short period of time." |

**How the two extremes sit together, evidenced precisely:**

- On the **options page**, the hero reads `Seamless. Intuitive. Options trading.` The line immediately beneath it reads "Options are risky and aren't suitable for all investors." **These are adjacent.** The mitigation is real and it is one line away.
- The same page's foot carries the full OCC boilerplate, ~600 words down, in the standing block.
- On the **homepage**, `DEMOCRATIZE FINANCE FOR ALL™` and `PARTICIPATION IS POWER™` sit directly above `All investing involves risk.` and the eight-entity disclosure.
- Across the site, **every product module carries a named disclosure link** (`Options Disclosures`, `Strategy Builder Disclosures`, `Crypto Risk Disclosures`) positioned inside the module, not at the page foot.
- In **help content**, the gradient collapses: the margin article's risk list and the liquidation warnings are in the same plain register as the instructions, with no softening.

**The honest assessment from the evidence:** Robinhood's disclosure *placement* is materially better than Coinbase's — per-module links, inline qualifiers, `Terms apply` inside banner text, a fully date-stamped Disclosure Library, FINRA's own alert linked from help. What persists is **lexical**, not structural: the words chosen for the products themselves (`Seamless`, `Smooth`, `Level up`, `margin investing`, `Predict`) belong to a register of ease and play, while the words chosen for their consequences (`losing the entire investment`, `not entitled to`, `without consulting you`) belong to a register of hazard. Both are present, both are near each other, and they do not share a vocabulary.

Two local failures of that gradient are worth recording:

1. **`Margin calls are no fun, so we're happy to give you some tips on how to avoid them`** — cheerful, colloquial, inside the article whose risk list says you can lose more than you deposit. The register drops at exactly the point the stakes peak.
2. **`our brokers are likely to take action to cover your position for you`** — a forced liquidation described as a service, in the same document set that elsewhere says `We can sell some or all of your securities without consulting you`. Two registers for one event.

### Other voice characteristics

**Person.** Second person for the user, first-person plural for Robinhood — and Robinhood is consistently the *subject* of the adverse verb (`We can sell`, `We can change`, `Robinhood liquidating`). No agentless passives in the liquidation copy.

**Contractions everywhere**, including in titles (`What's margin investing?`, `Why can't I use all of my buying power?`) and in disclosures (`doesn't constitute investment advice`, `isn't a recommendation`). Unusual for a broker-dealer and a real accessibility gain.

**Bold-label-then-definition** is the house pattern for any set of terms (margin dashboard fields, intraday margin concepts, notification stages).

**Worked examples with real numbers** are the primary teaching device: the symmetric profit/loss pair, the two interest calculations, the spread-assignment walkthrough.

**Callout boxes come in two registered flavours** — `Note` (factual qualification) and `Keep in mind` (consequence or caveat) — used consistently enough to carry meaning.

**Compliance IDs and reference numbers** on every page and article (`4784959`, `5762469`, `Reference No. 5933680`).

### Accessibility content

- **No `Skip to content` link observed** on any page. `[absent]` — notable given that Coinbase ships two.
- **No accessibility statement or VPAT found.** Searched the footer's `Legal & Regulatory` group, the Disclosure Library's ~90 entries, and the Company column. `[absent]` — and the Disclosure Library's completeness makes the omission conspicuous: Robinhood publishes a Children's Privacy Notice, a Vendor Code of Conduct, and a CCPA Metrics Report, but no accessibility statement.
- **Alt text is mixed.** Some images carry **the full sentence of adjacent copy** as alt — `alt="Give your agent a dedicated Robinhood account to trade in, then monitor activity and performance right in the app."` and `alt="No contract fees or commissions for all stock and ETF options"` — which duplicates content the screen reader will encounter again immediately. Others carry asset names or bare product labels (`alt="phone"`, `alt="Trading Tools"`, `alt="Gold icon"`, `alt="gold icon 2"`, `alt="Options Retirement"`, `alt="Robinhood Options "` with a trailing space). One carries a **stale value contradicting the live copy**: `alt="3.35% APY"` on an image in a module whose text says `3.6% APY`.
- **The Protection Guarantee icons** carry alt identical to their captions (`alt="We work hard to keep your data safe and secure."`), so the four claims are announced twice each.
- **A CSS fragment leaks into link text** in the extracted nav: `[.cls-1fill:#FFF;stroke-width:0px;](https://robinhood.com)` — the site logo's inline SVG style is being exposed as the accessible name of the home link. If confirmed in the live DOM, a screen-reader user hears a CSS declaration where the home link should be. **Flagged as suspected, not confirmed.**
- The `🇺🇸 US` locale switcher is an emoji flag plus a country code, with no visible label.
- Video assets (`.webm`, `.mp4`) appear without captions, transcripts, or pause controls in the extracted markup.
- **Positive**: the help-article structure (heading hierarchy, anchored sections, consistent callouts, plain-language questions as headings) is genuinely navigable by heading. And the `Before you begin` routing boxes give a screen-reader user the same early exit a sighted user gets.

### Negative findings, recorded honestly

- **No skip link, no accessibility statement**, on a site with ~90 published legal documents.
- `alt="3.35% APY"` contradicting `3.6% APY` in the adjacent copy.
- CSS declaration appearing as the home link's text.
- Alt text duplicating adjacent copy verbatim on at least six images.
- **`Sign up to access Robinhood Learn`** — signup framed as the gate to education that is already free on the web.
- Four bare `Learn more` links.
- `Invest` / `Trading` / `Options` as three separate nav destinations with unclear boundaries.
- The support home renders empty without JavaScript; the category IA is invisible to a crawler or a text browser.
- `Margin calls are no fun` in the margin-risk article.
- `our brokers are likely to take action to cover your position for you` vs `We can sell some or all of your securities without consulting you` — two registers, one event.
- `margin investing` as the name for leveraged trading.
- `Trade right away with deposits up to 3× your portfolio value` on the marketing page; the ACH-reversal deficit consequence documented only in a help article.
- Footer navigation duplicated in the DOM (responsive variants), so the entire ~600-word disclosure block appears **three times** in the extracted markup of most pages.

---

## Transferable patterns

1. **Symmetric worked examples.** `Profit example` and `Loss example` with identical opening conditions, identical structure, identical magnitude, and the same unleveraged counterfactual in both. The reader does the arithmetic and sees that the two outcomes are equally available. Stronger than any warning paragraph, and directly applicable to BNPL, credit, FX, and any product with asymmetric marketing.
2. **Explain the mechanism of loss, not just its possibility.** "the losses will be deducted from your account value—**not the funds you borrowed**—so it's possible for margin to amplify your losses." Eleven words that make leverage legible.
3. **Attach a named disclosure to each module, inside the module.** `Options Disclosures`, `Strategy Builder Disclosures`, `Watchlist Disclosures`, `Crypto Risk Disclosures`. Not one superscript resolving to a page-foot block — one link per claim, named for the thing it qualifies.
4. **Put `Terms apply` inside the banner sentence**, at the same size, not as a superscript.
5. **Order the FAQ so the risk question and the exit question come before the "borrow more" question.** Risk (Q1) → apply → suitability → cost → **how do I stop** (Q5) → how much can I borrow (Q6).
6. **Disclaim that availability is not recommendation.** "By enabling margin investing for your investing account, **Robinhood isn't recommending the use of margin investing.**" One sentence that separates a capability from an endorsement.
7. **Name yourself as the actor in the worst outcome.** "We can sell some or all of your securities **without consulting you**." "**You're not entitled to choose which securities we sell.**" Active voice, company as subject, no hedging, and the second-order consequence (you don't pick) stated as well as the first.
8. **Disclaim the pre-filled value in a money field.** "depositing the suggested amount **doesn't guarantee** that you won't get a margin call ... provided solely for your reference, is subject to change, and **isn't a recommendation**."
9. **Ship a user-set limit and admit the system can breach it.** The `Borrowing limit`, plus "There are some scenarios where the margin used could go above the borrowing limit. For example, if you get early assignment..."
10. **Communicate a regulatory change by what is removed, plus the benefit the user wouldn't have looked for, plus the requirement that did not change.** The PDT → intraday-margin article is the template.
11. **Repeat a cross-entity boundary rule at every point the user might misread it — with the reason attached.** The crypto-not-counted note appears four times, each time with "because they aren't securities and are held with our affiliate."
12. **Link the regulator's warning about your own product.** FINRA's `Investing with Borrowed Funds: No "Margin" for Error` from inside the margin help article; `FINRA's BrokerCheck` in every page footer.
13. **Date-stamp every legal document publicly, to the minute.** The Disclosure Library's ~90 entries. Establishes which version governed which day without a records request.
14. **Segment the risk disclosure by the reader's vulnerability.** `RHD Low Experience Risk Disclosure` and `RHD Low Income Risk Disclosure` as separate published documents. Concedes that one warning does not serve all readers.
15. **Promote risk management to the same tier as the primer** in an educational track. Options track: getting started → primer → **risk management**, all three featured.
16. **Give both the web path and the app path in one line.** "`Account` (person icon) → in the app, `Menu` (3 bars)" — one procedure, two platforms, no article fork.
17. **Name a help category for edge cases and fill it honestly.** `Investing with stocks: Special cases` → day trading, Reg T calls, wash sales, ADR fees.

## Caveats & gaps

- **Help-centre home IA not captured.** `/us/en/support/` is client-rendered and returned 21 blank tiles. The 21 category names were recovered from article left-nav, but the tile groupings, featured articles, and search behaviour are **unknown**, not absent.
- **Two support articles and one Learn article returned empty** at the slugs tried: `/support/articles/patterns-day-trades/`, `/support/articles/exercise-and-assignment/`, and `/learn/options/navigating-exercise-and-assignment/`. The canonical Day trading article was reached via a redirect from `pattern-day-trading`. The exercise-and-assignment content — the brief's named example — is therefore **documented only by title and by the assignment paragraph inside the deficit article**. A correct slug for `Expiration, exercise, and assignment` is referenced in-body (`/support/articles/expiration-exercise-and-assignment/`) but was not fetched.
- **No fee schedule figures beyond those in HTML.** `RHF Fee Schedule`, `RHC Fee Schedule`, `RHD Fee Schedule` and `Robinhood Money Fee Schedule` are PDFs and were not opened. No per-trade or per-contract fee is asserted in this file except those quoted verbatim from page copy.
- **No risk-disclosure PDF was read.** `Characteristics and Risks of Standardized Options`, `Robinhood Crypto Risk Disclosures`, `RHD Futures Risk Disclosure Statement`, `RHD Perpetual Futures Risk Disclosure`, `Event Contracts Risk Disclosure`, `RHF and RHS Margin Disclosure Statement`, `RHD Low Experience Risk Disclosure` and `RHD Low Income Risk Disclosure` are catalogued by title and date from the Disclosure Library; **none of their contents are quoted or characterised here** beyond what the library entry states. The two vulnerability-segmented disclosures in particular would repay a dedicated pass.
- **All in-product state vocabulary is `[documented]`** from help-article bodies. No live UI string was observed.
- **No order-status, order-rejection or error-message copy.** `[absent]` — the states a user meets when a trade fails are entirely behind auth.
- **Empty states: nothing found.** `[absent]`
- **No public status or incident page found.** Not linked from any surface inspected. Not marked absent, only not-found.
- **Crypto, futures, prediction-markets, banking, retirement, Strategies and Legend product pages unharvested.** Their risk copy is likely to be substantial and was not sampled; only their nav labels, Learn track scope lines, and footer entity disclosures were captured.
- **Robinhood Learn article bodies not opened.** The track structure, scope lines, article titles and card descriptions were captured from the index; no Learn article's prose was read. Claims in T11 about Learn's *structure* are evidenced; claims about its *explanatory quality* are not made.
- **Only the US site.** A locale switcher is present; no non-US surface was sought.
- **Mobile app copy not harvested** beyond the app paths quoted in help articles.
- Alt-text and CSS-in-link-text findings are from extracted markup; ARIA state and live DOM behaviour cannot be confirmed from extraction.

## Sources

1. https://robinhood.com/ (→ https://robinhood.com/us/en/)
2. https://robinhood.com/us/en/support/
3. https://robinhood.com/us/en/about/legal/
4. https://robinhood.com/us/en/learn/
5. https://robinhood.com/us/en/about/options/
6. https://robinhood.com/us/en/support/articles/margin-overview/
7. https://robinhood.com/us/en/support/articles/margin-calls/
8. https://robinhood.com/us/en/support/articles/pattern-day-trading/ (→ .../articles/day-trading/)
9. https://robinhood.com/us/en/support/articles/why-do-i-have-an-account-deficit-margin/
10. https://robinhood.com/us/en/support/articles/patterns-day-trades/ — empty response
11. https://robinhood.com/us/en/support/articles/exercise-and-assignment/ — empty response
12. https://robinhood.com/us/en/learn/options/navigating-exercise-and-assignment/ — empty response
