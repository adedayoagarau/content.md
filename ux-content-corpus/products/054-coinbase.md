# 054. Coinbase

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Crypto exchange (retail + institutional), now also a broker-dealer equities, derivatives and prediction-markets venue |
| Primary URL | https://www.coinbase.com/ |
| Corpus rank | 054 |
| Benchmark strength (source list) | Risk education and transaction states |
| Locale / market observed | en-US (the US site; EEA entities named in the accessibility statement) |
| Platform observed | Web (desktop marketing), help centre (`help.coinbase.com`), Coinbase Learn, legal hub, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Split by product line, and the split is the whole story.** *Crypto:* offered by **Coinbase Inc. (NMLS# 1163082)**, "licensed to engage in virtual currency business activity by the New York Department of Financial Services", plus state-by-state money-transmitter licences (a published table naming the licence number and the supervising regulator's address for each state). **Digital currency is not legal tender, not backed by the government, and not insured or guaranteed by the FDIC or SIPC.** *Securities:* "All securities and investments are offered by **Coinbase Capital Markets Corp, member FINRA/SIPC**" — execution, clearing and custody by **Apex Clearing Corporation**. *Futures/swaps/prediction markets:* offered by **Coinbase Financial Markets ("CFM"), a NFA member firm**; prediction markets not available in Nevada. *Cash balances:* pooled custodial accounts at FDIC-insured banks or NCUSIF-insured credit unions with **pass-through** insurance up to **$250,000 per depositor** — five named institutions. *EEA:* **Coinbase Ireland Limited** (EMI, Central Bank of Ireland), **Coinbase Luxembourg S.A.** (CASP, CSSF), **Coinbase Germany GmbH** (BaFin), **Coinbase Financial Services** (CIF, CySEC). Public company; quarterly financials and annual third-party audit. Accessibility governed by the **European Accessibility Act (Directive (EU) 2019/882)**. |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Partial — very strong on disclosure, fees, incident language and the accessibility statement. **Weak on the help centre: `help.coinbase.com/en` is client-rendered and returned an almost empty shell**, so the help IA (category tree, article-title inventory) could not be captured; individual help articles reached by deep link did render. Coinbase Learn's index page returned metadata only; the `crypto-basics` category page rendered fully. `/legal/risk-disclosures` returned an empty response. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.coinbase.com/ | Hero, product carousel, **the four-part superscript disclosure block** |
| Legal hub | https://www.coinbase.com/legal (→ `/legal/us`) | Document taxonomy; the four-question **Legal FAQs** — the single richest risk artefact |
| Digital Asset Disclosures | https://www.coinbase.com/legal/digital-asset-disclosures | NYDFS-driven conflict-of-interest table, ~700 assets |
| Licenses and Regulatory Disclosures | https://www.coinbase.com/legal/licenses | State-by-state money-transmitter licence table with regulator addresses |
| Accessibility Statement | https://www.coinbase.com/legal/accessibility-statement | EAA-compliant; names four EEA regulators as escalation routes |
| Security | https://www.coinbase.com/security | Six trust claims; scam-education video library |
| Coinbase Learn — Crypto basics | https://www.coinbase.com/learn/crypto-basics | ~70 article cards with type labels |
| Learn: How to keep your crypto secure | .../learn/crypto-basics/how-to-secure-crypto | By-lined by Head of Security Operations |
| Help: Pricing and fees disclosures — crypto | https://help.coinbase.com/en/coinbase/trading-and-funding/pricing-and-fees/fees | The fee schedule; spread explained |
| Help: Send and receive troubleshooting | .../cryptocurrency-trading-pairs/send-and-receive-troubleshooting | **Status-branched troubleshooting** |
| Help centre home | https://help.coinbase.com/en | Client-rendered; only fragments retrievable |
| Coinbase Learn index | https://www.coinbase.com/learn | Metadata only |
| Status page | https://status.coinbase.com | ~200 components; two weeks of incident copy |

---

## T1 Navigation & IA labels `[observed]`

**The nav is segmented by customer type, four tiers deep**: `Individuals` · `Businesses` · `Institutions` · `Developers` · `Company`, plus a flat `Cryptocurrencies` link. Within `Individuals`, two sub-groups — `Trade` and `Earn` — which is the notable split: **Coinbase separates "put money at risk" from "make money on what you hold" at the navigation level.**

`Trade` holds eight items, four of them badged `New`: `Crypto` · `Prediction markets` `New` · `Derivatives` `New` · `Stocks` `New` · `Token sales` `New` · `Advanced` · `Coinbase One` · `Coinbase Wealth`.

Every nav item carries a **one-line scope description**, and several of those descriptions are risk-bearing:

| Item | Description (verbatim) |
|---|---|
| `Crypto` | "Buy and sell cryptocurrencies" |
| `Prediction markets` | "Trade on sports, crypto, politics, and more" |
| `Derivatives` | "**Amplify your trades** with futures and perpetual-style futures" |
| `Stocks` | "Commission-free 24/5 stock trading" |
| `Token sales` | "Get early access to upcoming tokens" |
| `Advanced` | "Professional-grade trading tools" |
| `Credit Card` | "Earn up to 4% Bitcoin back on every purchase. **Terms apply.**" |
| `Borrow` | "Get a crypto-backed loan up to $1M" |
| `Base App` | "Trade to win, onchain" |

`Amplify your trades` is the leverage product's nav description — the word for the mechanism is the word for the benefit, and the loss side appears only in the page-foot footnote. `Trade to win, onchain` is a gambling-adjacent construction sitting in a financial product's navigation. Both are recorded because they are precisely the register the T14 tension is about.

**`Terms apply.` inside a nav description** is unusual and worth flagging as good practice — the qualifier travels with the claim even in a menu.

**Footer is nine columns**, the widest in this corpus sample: `Company` · `Learn` · `Support` · `Individuals` · `Businesses` · `Institutions` · `Developers` · `Asset prices` · `Stock prices`. `Learn` is a footer column in its own right with 12 entries, including five named explainer articles (`What is Bitcoin?`, `What is crypto?`, `What is a blockchain?`, `How to set up a crypto wallet?`, `How to send crypto?`) plus `Crypto glossary` and `Taxes`. **Educational content given the same footer weight as products** is a deliberate IA decision and the structural expression of the "risk education" strength.

`Digital Asset Disclosures` sits in the **Company** footer column, adjacent to `Do Not Sell or Share My Personal Information` — a compliance artefact promoted to a top-level footer link rather than buried inside Legal.

**Legal hub taxonomy** `[observed]` — seven groups: *Retail User Agreement* · *Service Specific Terms* (10 named products) · *Additional Terms and Disclosures* · *Privacy and Other Important Information* · *Developer Platform* · *Coinbase Futures* · *Decentralized Protocol Integrations*.

The `Service Specific Terms` group deep-links to **anchors inside a single user agreement** (`#staking-services`, `#coinbase-card`, `#advanced-trading`, `#usdc-rewards`, `#coinbase-one-card`, `#coinbase-token-sale-platform`). **One document, ten product-named doors.** A user who only stakes can reach the staking clause without reading the whole agreement. `Arbitration Agreement` gets its own card at the top level, deep-linking to `#appendix-5-arbitration-agreement` — the clause most consequential to the user is given a front door rather than left as an appendix.

**Security section has its own sub-nav** `[observed]`: `Overview` · `Security Tips` · `Phishing Attacks` · `Login Security` · `Coinbase Wallet`. Three of five are named after **attack types**, not features.

**Skip links**: `Skip to content` and `Skip to site index` — two, both first in DOM, on every marketing page. Shipping a second skip link to the footer index is above the usual standard.

## T2 Value proposition & headline patterns `[observed]`

**Hero** — `Trusted by millions worldwide`, with the sub-line `Sign up and get up to $2,000 in crypto.¹`

The headline is a **trust assertion with no product noun at all**, and the only concrete thing on the screen is an incentive carrying a superscript. That ordering — trust, then money, then a footnote — is the shape of the whole site.

**Section headers are imperative or possessive, short, and full-stopped:**

- `Trade stocks around the clock`
- `Trade more with less`
- `Explore millions of tokens and stocks, all in one place.`
- `Turn your insights into trades.`
- `Powerful tools, designed for the advanced trader.`
- `Zero trading fees, more rewards.`
- `Trade to win, onchain.`
- `The financial institution for a digital asset future.`
- `Take control of your money.`

`Trade more with less` is the leverage headline. Four words, and the elision is total: *more* means more exposure, *less* means less capital, and the mechanism that makes that possible is the mechanism that can lose more than you put in. The disclosure is present — footnote ³ says "Leverage in futures trading can work for you or against you. The risk of loss using leverage can exceed your initial investment amount" — but it is 1,500 words down the page in 10-point grey. **This is the clearest instance in the corpus of a headline and its legally-required qualifier being maximally separated on one page.**

**Security page headline** — `The most trusted crypto exchange`, with the section header `The proof is in our platform.` and the line `Here's why you can trust us:`. Six claims follow, each with its own sub-header:

`We're a public company, built in the USA` · `We hold our customers' assets 1:1` · `We respect your rights over your personal information` · `We use state-of-the-art encryption and security` · `We offer the finest tools to protect your account` · `Get the help you need, when you need it`

**Five of six start with `We`**, which is the correct person for a trust page — the company is the actor, and it is making promises in its own voice. `Your crypto is your crypto. It's that simple.` is the strongest line: a tautology used as a custody claim, immediately followed by the operative commitment ("Coinbase doesn't lend or take any action with your assets without your permission"). In a market shaped by exchange failures caused by rehypothecation, that sentence is the whole argument, and it is written at a fifth-grade reading level.

`We're a public company, built in the USA` uses **regulatory obligation as a feature**: "we publish financial statements quarterly and we're audited annually by an independent third-party **as required by law**." Being compelled to disclose is reframed as a reason to trust.

**Live price data is used as ambient copy** — the homepage renders live tickers with percentage moves (`Bitcoin $86,936.84 ▼7.19%`) under tabs `Tradable` · `Top gainers` · `New on Coinbase`. `Top gainers` as a default browse tab is a recency-and-momentum framing that an investor-protection reviewer would scrutinise; it is recorded as observed, without inference about intent.

An image disclaimer sits under the stocks screenshot: "Image is for informational purposes. Prices shown may not reflect current price." **A screenshot of prices disclaimed as not-current** — small, correct, and easy to forget.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Nav, hero, repeated | Primary |
| `Sign in` | Nav | |
| `Sign up now` | Security page, legal hub | Urgency variant |
| `Create your account` | Nav flyout | Third variant |
| `Get started` | Homepage, Learn article foot | Fourth variant |
| `Start trading` | Stocks block, Advanced block | Action-named |
| `Trade now` | Derivatives block | **The shortest, most urgent CTA on the site — attached to the leverage product** |
| `Learn more` | Prediction markets, Wallet, Prime, Business, Bug bounty | Five bare `Learn more`s |
| `Claim free trial` | Coinbase One | |
| `Download app` | Nav flyout | |
| `See Full Terms` | Incentive footnote ¹ | |
| `Discover more` | Security page | Resolves to the signup flow, not to information |
| `Subscribe to Updates` | Status page | |
| `Submit a complaint` | Help footer | A named complaints route in the footer |
| `Skip to content` / `Skip to site index` | First in DOM | Accessibility |
| `View on block explorer` | Help article, transaction status screen | See T6 |
| `Contact us` | Help articles, accessibility statement | |
| `Get started 󰐲` | Learn article inline card | With the sub-line "It's free and takes 2 minutes or less." |

**Two observations.** `Trade now` — two words, imperative, present-tense — is attached to `Trade more with less`, the leverage product. Every other product gets `Learn more` or `Start trading`. The urgency gradient runs the wrong way relative to the risk gradient.

And `Discover more` on the security page resolves to `accounts.coinbase.com/pick-your-account` — a **CTA labelled as information that is actually account creation**. Recorded as a negative finding.

## T4 Onboarding & getting-started

Pre-auth onboarding surfaces are thin; the flow is gated at `accounts.coinbase.com`. What is public:

**Eligibility, stated in the accessibility statement** `[observed]` — the clearest account-requirements copy on the site, and it is in an accessibility document rather than a signup page: "In order to use our services, you must be at least 18 years old and reside in a country in which the relevant services are available. In order to use our services, you will need to register for a Coinbase account which will require you to provide certain details, including your name, email address and a password, and to complete certain verification procedures."

**Time-to-value promises** `[observed]`: "It's free and takes 2 minutes or less." (Learn article inline card); "Buy Bitcoin in just a few minutes" (Learn page foot).

**Incentive terms, footnoted in full** `[observed]` — footnote ¹ is worth quoting in structure because it is unusually complete for a promotional line:

> "Valid for new users who make a cryptocurrency purchase of at least $50 or more on Coinbase. Limited while supplies last or Coinbase revokes this incentive at its sole discretion. Coinbase reserves the right to change the terms, for any reason. Void where prohibited or if Coinbase determines that the customer is not eligible. **Average reward is approximately $25.** See Full Terms"

The headline says `up to $2,000`. The footnote says the **average is approximately $25** — an 80× gap between the promoted maximum and the disclosed mean, both on the same page. Publishing the average at all is a real disclosure (most "up to" offers never do), and the asymmetry between where the two numbers sit is the pattern to record. A content designer reviewing an incentive claim should note both halves: the average is disclosed, and it is disclosed in the smallest type on the page.

**Coinbase Learn functions as the onboarding surface** for the domain rather than the product. See T11.

## T5 Form & field labels

Almost entirely behind auth. `[absent]` for the trading flows.

**Public form labels observed** `[observed]` — the status-page subscription flow, which is a genuinely well-built form:

`Email address:` · `Enter OTP:` · `Country code:` · `Phone number:` · `Webhook URL:` with hint text "The URL we should send the webhooks to" · second `Email address:` with hint "We'll send you email if your endpoint fails" · `Change number` · `Edit number` · `Send OTP` · `Resend OTP` · `Resend OTP in: 30 seconds` · `Didn't receive the OTP? Resend OTP` · `Subscribe to Incident`

Two good details. **Hint text explains why the second email field exists** ("We'll send you email if your endpoint fails") — a field whose purpose is non-obvious gets a reason rather than a label alone. And the resend control is offered **with its own countdown state** (`Resend OTP in: 30 seconds`) plus the pre-emptive question `Didn't receive the OTP?` — the failure is anticipated in the UI before it happens.

A consent line sits under the SMS branch: "Message and data rates may apply. By subscribing you agree to the Atlassian Terms of Service, and the Atlassian Privacy Policy." — and a second, smaller instruction resolves the flow's ambiguity: "To receive SMS updates, please verify your number. **To proceed with just email click 'Subscribe'**". The escape from an optional step, stated at the step.

**Documented in-product fields** `[documented]`: `slippage tolerance` (DEX order preview), `price details` / `fee breakdown` (order preview), `order preview screen`, `trade preview screen`.

## T6 Status & state language — PRIORITY

### Transaction states are minimal — two, and the help article branches on them `[documented]`

From `Send and receive troubleshooting`:

> "If you sent someone crypto from your Coinbase account but they haven't received it, check the status by selecting the individual transaction... **If the transaction status is:**"
>
> **`Pending`** — Wait at least 30 minutes (most transactions complete within this time). Select **View on block explorer** ... and check the number of confirmations. "If the number is stuck at 0, contact us."
>
> **`Completed`** — Verify the recipient's address is correct. Confirm the recipient's expected network matches the network you used to send.

**This is the most transferable structure in the file.** The troubleshooting article is organised **by the state the user is looking at**, not by the problem they have. The user reads their own screen, finds the matching heading, and gets a different procedure. Two states, two procedures, no prose in between.

And the `Completed` branch is the one that matters. `Completed` normally means "you are fine". Here it means **"the failure has already happened and is irreversible"** — the money left, went to the wrong address or the wrong network, and is gone. Coinbase writes the recovery path for a *successful* transaction, because on a blockchain success and disaster are the same state.

The consequence is stated without hedging:

> "**Coinbase can't recover funds sent on the wrong network.**"

Six words, subject-verb-object, no apology, no "unfortunately", no passive. It is the single most important sentence in crypto UX and Coinbase writes it as a flat fact. Compare the banking products in this corpus, where an irreversible action still has a support-ticket escape hatch.

### Confirmations as the real status `[documented]`

`Pending` is not self-explanatory on a blockchain, so the article routes the user **off the platform to the authoritative source**: `View on block explorer` → count confirmations → "(search for 'confirmation' if you have trouble finding it)".

That parenthetical is a small masterpiece of honest help writing: Coinbase is sending the user to a **third-party page it does not control and cannot style**, and rather than pretend the page is legible, it tells them to use ctrl-F. Then it gives the escalation threshold — **`stuck at 0` → contact us** — so the user has a decision rule rather than a vague "if it takes too long".

### Receives are a different state machine `[documented]`

The `Receives` branch does not use status names at all. It gives five ordered actions, and the fourth is the one that matters:

> "Review account messages or alerts from Coinbase for details about **missing requirements or necessary actions.** Complete requested tasks, such as verifying identity (proof of address, ID, etc.) or updating account information (nationality, phone number, etc.). Once actions are completed, crypto receives should be credited within **3-5 business days**."

**A compliance hold surfaced as a missing-crypto problem.** The user thinks the network failed; the real cause is an unmet KYC requirement, and the article tells them where to look and what completing it costs in time. Naming `nationality` and `phone number` as things that can block an incoming transfer is specific and useful.

Also: "in periods of high network congestion, it may take longer for a transaction to complete" — the external cause named before the user blames the platform.

### Service status — ~200 named components `[observed]`

The Statuspage is grouped into: platform surfaces (`Coinbase - Website`, `Coinbase - Mobile`, `Coinbase - Advanced Trade`, `US Derivatives`, `International Derivatives`, `Coinbase - API`, `Coinbase Wallet - Extension`, `Base app (formerly Coinbase Wallet) - Mobile`, `Deribit - Website`), then **`Digital Currencies` with a status per asset** (~120 entries from `Bitcoin` to `Stacks (STX)`), then **`Payment Methods`** (~20, including `SEPA Transfers`, `UK Faster Payments`, `EU Debit / Credit Cards (3DS)`, `PayID (Australia)`, `FAST (Singapore)`, `Interac (Canada)`, `PIX (Brazil)`, `Blik (Poland)`, `IMPS (India)`), then `Customer Support`, `2FA`, `User Proofing`, `Proof of Address`, `ID verification`, `ID authentication (Japan)`, and product lines.

**Per-asset and per-payment-rail status is the right granularity for this product** — a Solana delay is irrelevant to a Bitcoin holder, and a user in Poland needs to know about `Blik` specifically. `2FA`, `Proof of Address` and `ID verification` as monitored components is notable: **the onboarding gates themselves have an uptime status**, which is exactly what a user blocked at verification needs.

Status values: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Several components carry a `?` tooltip marker, so individual components have their own explanatory text.

Live at harvest: `Coinbase - Website Degraded Performance` and `Coinbase - Mobile Degraded Performance`, with everything else operational.

### Incident copy is formulaic, and the formula is good `[observed]`

Incident titles are **`<Impact> - <Asset or Surface>`**: `Delayed Sends and Receives - EGLD (MultiversX)` · `Delayed Sends - Solana Network` · `Delayed Sends - DOT` · `Delayed Transactions - Optimism` · `TAO - Delayed Sends & Receives` · `Degraded Performance - Prediction Markets` · `Degraded Performance — Customer Support Response Times` · `Payments Degraded Performance` · `WMTX-USD to Limit Only` · `Scheduled Bank Maintenance - India (INR)`.

Lifecycle labels: **`Investigating` → `Identified` → `Monitoring` → `Resolved`**, plus `Scheduled` → `In progress` → `Completed` for maintenance. Each is a bolded prefix on a timestamped line.

The incident body is a **four-move template**, and every instance follows it:

1. Awareness and scope — "We are aware that some users may be experiencing delayed sends and receives for Bittensor (TAO)."
2. **What is NOT affected** — "Buys, Sells, and Fiat withdrawals/deposits are not affected."
3. Action and commitment — "We are investigating this issue and will provide an update shortly."
4. **Reassurance about funds** — "Rest assured, your funds are safe."

**Move 2 is the reusable idea.** In an exchange incident, the user's first question is "is my money moving or stuck?" — and naming the unaffected paths converts an outage notice into a usable instruction. A user who wanted to sell can still sell; the notice tells them so in the second sentence.

**Move 4 appears in almost every incident**, in three near-identical variants: `Rest assured, your funds are safe.` · `Rest assured your funds are safe.` · `Your funds are safe.` For a crypto exchange, that sentence is doing enormous work, and its consistency is the point — after enough incidents it becomes a recognised signal. (The inconsistent comma across variants is a small style-guide failure in a sentence that should be locked.)

Resolution copy is terse and identical every time: `This incident has been resolved.` / `A fix has been implemented and we are monitoring the results.` / `The issue has been identified and a fix is being implemented.`

The `WMTX-USD to Limit Only` incident is the most interesting, because it is a **trading restriction announced as an incident**:

> "We've paused deposits and moved our WMTX-USD trading pair to limit-only mode on Coinbase Exchange and Coinbase Advanced following a third-party security incident involving the token. **Limit orders can be placed and canceled, and matches may occur. Market orders cannot be submitted.** The asset issuer is actively investigating this issue."

Exactly what still works, exactly what does not, and **the cause attributed to a named third party** ("a third-party security incident involving the token", "the asset issuer is actively investigating"). Coinbase restricts a market and declines to take responsibility for the token in the same paragraph, without disparaging it. That is a hard piece of writing and it is done in four sentences.

Scheduled maintenance carries the same non-impact clause: "INR deposits and withdrawals via bank transfer may be delayed during the scheduled maintenance window. **Crypto trading is not impacted.**"

### Fee and price states `[documented]`

`order preview screen` / `trade preview screen` is the named disclosure surface: "Before submitting your transaction, you can view the fees in the trade preview screen." For DEX trades: "the quoted price is an **estimate** and the final price may vary based on the execution price on the DEX. The execution price will not increase more than the **slippage tolerance** displayed prior to placing your order." A named bound on how wrong the estimate can be, shown before commitment.

## T7 Error, failure & recovery — PRIORITY

### The irreversibility triad `[documented]`

Three statements, across two articles, that together define Coinbase's failure posture:

1. "**Coinbase can't recover funds sent on the wrong network.**"
2. "If the number is stuck at 0, contact us." — the only escalation, and it is conditional on a specific observable
3. "Coinbase will never ask you for passwords, 2FA codes, PIN numbers or for remote access to your computer."

None of the three softens. There is no "unfortunately", no "we understand this is frustrating", no apology. For a product where most losses are caused by the user and are permanent, **the register is factual rather than consoling**, and that is the right call: false comfort in an irreversible-loss context would be worse than bluntness.

### Recovery is routed to the user's counterparty, not to support `[documented]`

The `Receives` procedure asks the user to do five things, three of which involve someone else:

- "Confirm the sender used the network you're expecting to receive the funds on and the correct address."
- "**Ask the sender to provide the transaction's block explorer link** to confirm the correct address and network were used."
- Complete any outstanding verification tasks

Plus two device-level fixes first: "Close and re-open your app or browser." / "Update your app to the latest version (if necessary)." **The cheapest fixes are listed first**, then the counterparty, then the compliance gate, then support.

### Fee recovery has a price `[documented]`

The asset-recovery fee is an unusually honest piece of failure pricing:

> "If you sent an unsupported cryptocurrency to your Coinbase account, it may be eligible for recovery. We'll charge a network fee for the recovery attempt. For recoveries with an estimated value of over $100, we'll also charge a **5% recovery fee** on the amount over $100. The estimated value of the recovery may differ from the actual market value of the recovery."

Note `recovery **attempt**` — the network fee is charged whether or not it works. And the last sentence bounds the valuation. Three caveats in three sentences, on a page about fixing the user's own mistake.

### Scam education as the primary failure surface `[observed]`

Because the dominant failure mode is social engineering rather than system error, Coinbase's error content is **anti-fraud content**, and it is extensive.

The security page's `Security Resources` block is six videos, five of them named after an attack: `Top 5 Cryptocurrency Security Tips` · `Tech Support Scams` · `Phishing Scams` · `Trust Trading Scams` · `Sim Swapping Scams` · `Our Commitment to Security by Philip Martin`. Each is credited to "Trust and Safety experts at Coinbase" — **the internal team is named as the source**, which is a small authority signal that costs nothing.

The Learn article `How to keep your crypto secure` is **by-lined**: "*By Matt Muller, Head of Security Operations, Coinbase*". A named human with a relevant job title, on the highest-stakes educational page. Compare the rest of Coinbase Learn, which is unattributed.

Its structure is a model for threat education:

1. **Name the attack and define the jargon in the same sentence** — "When someone is able to log into one of your accounts to perform fraudulent activity, this is called an 'account takeover', or 'ATO' for short."
2. **Explain the mechanism in plain narrative** — the SIM-swap explanation walks through what the fraudster actually does ("contact your wireless carrier pretending to be you, and persuade the customer service agent to redirect your cell service to a different device"), with the name's etymology glossed in a parenthesis.
3. **Concede the weakness of your own advice** — "We also believe that using SMS-based two-factor authentication (2FA) is better than using no 2FA at all." Coinbase supports SMS 2FA, has just explained why it fails, and says both things.
4. **Rank the remedies** — hardware key → authenticator app → SMS with per-login codes → "**If an organization doesn't offer any of these options, consider not using that service.**" A ladder with a floor, and the floor is "leave".
5. **Generalise beyond the product** — "apply them to **all** the accounts they care about — not just their Coinbase accounts."

The negative-commitments list is the most operationally useful content on the site:

> "Coinbase will never ask you for passwords, 2FA codes, PIN numbers or for remote access to your computer."
> "Coinbase will never ask you to create test accounts on other platforms or provide your ID or banking information over email or social media. **We do not offer Facebook support chat and we will never call you by phone.**"
> "And remember, Microsoft, Google, and Apple will never call you about your computer."

**A list of things we will never do is a better anti-phishing control than a list of things to watch out for**, because it gives the user a falsifiable test. Naming the absent channel (`We do not offer Facebook support chat`) closes a specific, real impersonation vector. And the last line extends the same protection to three other companies — free, accurate, and useful.

The URL-checking advice is concrete rather than generic: "If we emailed you and include a link, **copy the link and paste it into a text editor** before entering it into your browser to make sure you know where the link is really taking you."

And one behavioural instruction that is not about technology at all: "**Don't brag about your cryptocurrency holdings online, just like you wouldn't advertise inheriting $50 million.**" Operational-security advice delivered through an analogy the reader already understands.

(The 2FA help article carries the same discipline: "**Note:** Brex will never call you..." — sorry, Coinbase's equivalent appears on the security page; and the security page flags "You should always exercise caution when installing browser extensions" alongside "Coinbase doesn't require installation or download of a browser extension to access your account.")

### Insurance failure, disclosed `[observed]`

The `How is my crypto insured?` answer contains the clearest statement of a limit in the file:

> "our policy does **not** cover any losses resulting from unauthorized access to your personal Coinbase or Coinbase Pro account(s) due to a breach or loss of your credentials."

And then the bound on the insurance itself:

> "In case of a covered security event, we will endeavor to make you whole; **however, total losses may exceed insurance recoveries so funds may still be at risk.**"

`we will endeavor to make you whole` is a promise, and the clause immediately after it withdraws the guarantee. Publishing the sentence that says the insurance may not be enough is the correct disclosure and most products would not write it. See T10.

## T8 Empty states `[absent]`

No no-data or no-results strings were reachable. The help centre, where a search-zero-results state would live, is client-rendered and returned only fragments (`85% of users resolve issues using search`, `Self-serve links`, `Most Helpful`, `Support by topic`, `Suspicious activity`, `STILL NEED HELP`).

The status page's positive-empty state is the closest analogue: **`No incidents reported.`** under a date heading — three words, no decoration, repeated for quiet days.

## T9 Notifications & system messages

**Status subscription offers five channels** `[observed]`: email, SMS, Slack, webhook, and Atom/RSS feed — with the **trigger events spelled out per channel**:

- Email: "whenever Coinbase **creates**, **updates** or **resolves** an incident"
- SMS: "whenever Coinbase **creates** or **resolves** an incident"
- Webhook: "whenever Coinbase **creates** an incident, **updates** an incident, **resolves** an incident or **changes** a component status"

**Three channels, three different event sets, all disclosed at the point of subscription.** SMS deliberately omits `updates` — a channel that costs money and interrupts gets fewer triggers, and the user is told so before subscribing rather than discovering the gap later. This is the notification-design pattern to steal: **publish the trigger set per channel and vary it by channel cost.**

The webhook branch adds a failure-notification field with explanatory hint text (see T5) — a notification about the notification pipeline.

**Help-centre notification copy** `[documented]`: "Review account messages or alerts from Coinbase for details about missing requirements or necessary actions" — account-level alerts are a named surface carrying compliance tasks.

**Site-wide promotional banner** `[observed]`: `Earn up to $2,000 when you buy $50 in crypto¹` — persistent across marketing pages, with the superscript resolving to the incentive terms discussed in T4.

**Sign-in prompt on the help centre** `[observed]`, one of the few fragments that rendered:

> "Sign in for the best experience"
> "We'll be able to identify your account and resolve your issue more quickly."
> `Sign in` / `I can't sign in`

`I can't sign in` placed immediately beside `Sign in` is the same pre-emptive-failure pattern as Wise's `Trouble logging in?` — the escape hatch sits at the point of failure, not in a help article. And the reason for signing in is given as a **benefit to the user** ("resolve your issue more quickly") rather than a system requirement.

## T10 Disclosures, legal & compliance — PRIORITY

The strongest category on this product, and the reason it is in the corpus.

### The four-superscript homepage block `[observed]`

Coinbase's central disclosure device: a single block at the page foot carrying an unnumbered general disclaimer plus three numbered footnotes, each anchored to a specific claim above.

**The unnumbered block** opens the sequence and is the "investing involves risk" boilerplate:

> "This webpage is for informational purposes only and does not constitute the provision of investment advice. Products and features may not be available in all regions. The customer assumes full responsibility for its trading activity and should consult its advisors for its specific situation."

then, in the same paragraph:

> "**All investments involve risk and the past performance of a security, or financial product does not guarantee future results or returns. There is always the potential of losing money when you invest in securities, or other financial products.** Investors should consider their investment objectives and risks carefully before investing."

**Placement**: page foot, below the final CTA, above the footer nav. It is the last prose a scrolling reader meets and the first thing a reader who jumps to the footer meets. It is not repeated near any individual claim.

**`¹` — the incentive.** Covered in T4. The `Average reward is approximately $25` line against an `up to $2,000` headline.

**`²` — the securities/crypto boundary.** The most consequential footnote on the site, and structurally the best:

> "All securities and investments are offered by Coinbase Capital Markets Corp, member FINRA/SIPC. **Securities services offered by Coinbase Capital Markets Corp are separate from digital asset services provided by Coinbase Inc., and any affiliates. SIPC does not apply to digital assets or cash held in your Coinbase Inc. account.**"

Three moves: name the regulated entity and its memberships; **separate it from the crypto entity**; then state the negative — SIPC does not reach the crypto side. It continues with BrokerCheck ("Additional information about your broker ... can be found on FINRA's BrokerCheck"), names Apex Clearing for execution/clearing/custody, bounds the 24/5 claim ("Extended hours for stocks (24/5) available for **eligible symbols**"), and closes with the crypto entity's own licensing: "Cryptocurrency services offered by Coinbase Inc. (NMLS# 1163082). Coinbase Inc. is licensed to engage in virtual currency business activity by the New York Department of Financial Services."

The footnote marker `²` is attached to the word `stocks` in the nav flyout and in body copy — so **the boundary disclosure fires wherever the two asset classes appear together.** A user who reads "Trade crypto, stocks,² and more" is one glance from learning that SIPC covers one of those and not the other.

**`³` — derivatives and prediction markets.** The strongest risk language on the site:

> "Prediction markets not available in Nevada. Listed futures and swaps are offered by Coinbase Financial Markets ("CFM"), a NFA member firm. **Trading prediction contracts involve substantial risk and may result in the loss of your entire investment. Contracts pay out only if the specified event occurs. Trade only if you understand the product and believe it is appropriate for your financial situation and objectives.** Leverage in futures trading can work for you or against you. **The risk of loss using leverage can exceed your initial investment amount.** For informational purposes only. Not investment advice or recommendation to purchase a particular asset or security or to employ a particular investment strategy."

Five distinct disclosures in one footnote: geographic exclusion, entity and regulator, total-loss risk, the binary payout mechanism, a suitability instruction, and the above-initial-investment leverage warning. `Contracts pay out only if the specified event occurs` is the one that actually teaches — it explains the instrument in eight words to someone who has only seen "Turn your insights into trades."

`Trade only if you understand the product and believe it is appropriate for your financial situation and objectives` is a **conditional instruction rather than a warning** — it tells the user what to do, not just what to fear.

### The Legal FAQs — four questions, and two of them are the corpus's best risk copy `[observed]`

On the legal hub, an accordion headed `Legal FAQs`:

| # | Question (verbatim) |
|---|---|
| 1 | How is my crypto insured? |
| 2 | How is my cash insured? |
| 3 | Are there any restrictions on how I can use my Coinbase account? |
| 4 | Who do I contact if I have a dispute with Coinbase or for other legal matters? |

**Q1 and Q2 are separated because the answers are completely different**, and that separation is itself the disclosure. A user who asks "is my money safe at Coinbase" has asked two questions without knowing it.

**Q1 — `How is my crypto insured?`** The answer is a four-step descent from reassurance to the flat negation, and the ordering is deliberate:

1. Crime insurance exists and covers "a portion of digital assets held across our storage systems against losses from theft, including cybersecurity breaches" — note `a portion`, not "your assets"
2. The exclusion: "**our policy does not cover any losses resulting from unauthorized access to your personal Coinbase ... account(s) due to a breach or loss of your credentials**" — i.e. the commonest loss is not covered
3. Responsibility transferred: "It is your responsibility to use a strong password and maintain control of all login credentials"
4. **The core negation**, quoted verbatim:

> "**Digital currency is not legal tender and is not backed by the government. Coinbase is not an FDIC-insured bank and digital currency is not insured or guaranteed by the Federal Deposit Insurance Corporation ("FDIC") or Securities Investor Protection Corporation ("SIPC"), and may lose value.**"

Five negations in two sentences: not legal tender, not government-backed, not an FDIC-insured bank, not FDIC-insured, not SIPC-insured — then the affirmative risk, `may lose value`. Both acronyms are expanded on first use. This is the **no-FDIC-protection disclosure** in its clearest published form.

Then the closing sentence, which is the one most companies would cut:

> "In case of a covered security event, we will endeavor to make you whole; **however, total losses may exceed insurance recoveries so funds may still be at risk.**"

**A promise, a semicolon, and the withdrawal of the promise.** The insurance may not be enough. Very few financial products publish that sentence.

**Q2 — `How is my cash insured?`** is a masterclass in disclosing an uncertain structure without overclaiming.

- The mechanism first: US customer balances are pooled with other customers' (plus some Coinbase cash "for operational reasons") and either held in custodial accounts at US financial institutions **or** invested in "liquid U.S. Treasuries, USD denominated money market funds, or other permissible investments in accordance with state money transmitter laws"
- Then the honest refusal to specify: "**Funds could be held in any one of these manners so customers should not assume that funds are being held in one manner over the other.**" Telling the user they cannot know which is more truthful than implying they can
- Segregation stated as a commitment: "Coinbase will neither use these funds for its operating expenses or any other corporate purposes"
- **Pass-through insurance, correctly qualified.** "Our custodial accounts have been established in a manner to allow Coinbase to make a claim against pass-through FDIC or NCUSIF insurance for each customer up to the per-depositor coverage limit then in place (currently **$250,000 per depositor**). Pass-through insurance **may be available** to protect funds ... should any insured financial institution(s) where we maintain custodial accounts fail. **Pass-through coverage is contingent upon Coinbase maintaining accurate records and on determinations of the relevant federal regulator as receiver at the time of a receivership of a bank holding a custodial account.**"

That last sentence is the whole thing. Pass-through FDIC coverage is routinely marketed as if it were direct deposit insurance; Coinbase names **both conditions on which it actually depends** — Coinbase's own recordkeeping, and a regulator's determination at the moment of a bank failure. `may be available` rather than `is available`. `currently` on the $250,000 figure. **This is the single most transferable disclosure in the file**, and it is the correct model for any fintech claiming sweep or pass-through coverage.

- The five banks are then **named**, with a dated snapshot: JPMorgan Chase · Cross River Bank · Customers Bank · VyStar Credit Union (Retail and Business customer funds only) · Pathward (previously known as MetaBank) — followed by `[as of May, 2025]`
- Finally, the user is sent to the regulator's own explainer: the FDIC's crypto fact sheet and the NCUA share-insurance page. **Routing to the regulator rather than paraphrasing it.**

**Q4 — dispute routing, three branches** `[observed]`: `Disputes:` (complaint help page), `Criminal matters:` (a law-enforcement portal), `Civil matters:` (registered agent for service of process, with a linked CSC address list and a physical Oakland address). A legal-contact FAQ that serves customers, police, and opposing counsel from one accordion, labelled so each self-selects.

Q3 is the outlier and is recorded as a negative finding: `Are there any restrictions on how I can use my Coinbase account?` is answered with an editorial aside about tech-company censorship ("it has become increasingly common for tech companies to censor customers... Luckily, as a crypto business we don't face this issue as frequently as a social network does") before linking the Prohibited Use Policy. **An opinion where a policy summary belongs**, inside a legal FAQ.

### The NYDFS conflict-of-interest disclosure `[observed]`

`Digital Asset Disclosures` is a regulator-driven artefact rendered as a public table — roughly 700 rows across two sections (`US (incl. NY) Trading Assets` and `Coinbase Custody Trust Company`), four columns: `Asset Name` · `Ticker` · `Coinbase Holding` · `Commercial Engagement`.

The preamble defines its own key term broadly and says so: "The term '**Commercial Engagement**' is construed broadly to capture business activities such as financial engagements (e.g., Coinbase Ventures agreements), business engagements (e.g., custody arrangements), or other similar engagements with a digital asset or an affiliated party."

Then the conflict is stated, not minimised: "For a variety of reasons, including to better serve our customers, **Coinbase holds on our balance sheet many of the assets that we support for trading.**" With a commitment to currency: "Coinbase will update these disclosures on a quarterly basis and will add new assets to this page as they are supported."

**A per-asset conflict-of-interest register, published, dated, and committed to a refresh cadence.** Whether a retail user can act on 700 rows of Yes/No is doubtful — the artefact is compliant more than it is usable — but the *existence* of a public, asset-level answer to "does the exchange own this?" is a genuinely strong transparency pattern, and the quarterly commitment makes it maintainable rather than a one-off.

Jurisdiction bounded at the foot: "This Site is hosted in the United States and is intended for and directed to customers in the United States only."

### Fee disclosure `[observed]` — long, specific, and honest about its own variability

The `Pricing and fees disclosures - crypto` page is one of the more complete fee documents in this corpus.

Opens with a global caveat: "Please note that all fees and charges are subject to change, and it is recommended to review the most up-to-date fee information on the Coinbase platform."

**Named fees, verbatim figures:**

| Item | Fee |
|---|---|
| Cash and Hosted Cryptocurrency balance | "free of charge" |
| User-to-user primary balance transfer | "without any charges" |
| Lightning Network processing fee | `0.2%` of the amount transferred |
| USDT withdrawal processing fee | `0.01%`, max `20 USDT`, plus a separate network fee |
| USDC processing fee | `0.10%` on net conversion above a `$5 million` threshold in a 30-day rolling period |
| BTC collateral liquidation | "flat fee of **2%** of the total transaction" |
| Limit order execution fee | `1%` per limit buy and limit sell |
| Coinbase fee on limit orders | "may also charge a **1.875%** Coinbase fee (varies by payment method)" |
| Staking commission | `35%` standard for eight named assets; `31.75%` / `28.5%` / `25.25%` by Coinbase One tier |
| Asset recovery | network fee, plus `5%` on value over `$100` |
| Coinbase Card | "no transaction fees" — but a spread applies |

**The spread explanation is the most important passage.** Coinbase separates `fee` from `spread` and explains the latter as a distinct cost:

> "When you place simple buy and sell orders, Coinbase includes a spread in the quoted price. The spread is also included in the exchange rate when converting from one cryptocurrency to another."

Then **tells the user exactly where to look for it**: "You can see the spread in the order preview screen ... Buy and sell orders: tap on the tooltip next to your asset's price line item to view the spread. Convert orders: tap on the tooltip next to your quoted exchange rate."

Then justifies it, and discloses the upside asymmetry: "The spread helps increase the likelihood of a successful transaction and allows Coinbase to lock in your quoted price temporarily while processing your order. **Coinbase may retain any excess spread from a transaction.** Please note that **the spread may vary for similar transactions.**"

**Naming a cost that is embedded in the price, telling the user which tooltip reveals it, and admitting that the company keeps the excess** is the strongest fee-transparency move on the page. The same admission is repeated for DEX service fees ("Coinbase may retain any excess service fee") and for third parties ("the DEX aggregators that route your trade **may retain any price improvement** over the quoted price as a fee").

Two further disclosures worth recording:

- **Network-fee estimation is disclosed as an estimate that may not match reality, in Coinbase's favour**: "the final fee that Coinbase pays may differ from the estimated fee due to factors such as batching transactions or changes in network congestion levels" and, under its own heading `Efficiency gains and network fees`, "**the aggregate amount of estimated network fees paid by users within a given batch may exceed the final network fee paid by Coinbase.**" Users may collectively pay more in estimated fees than Coinbase pays out. Published, under its own heading.
- **`Coinbase does not have any payment for order flow (PFOF) relationships with market makers.`** A negative competitive disclosure, unprompted, in the fee document.
- **Changes are disclosed as experiments**: "Coinbase occasionally tests changes to fees and spread. These changes may be rolled out across different regions, assets, order sizes, and types of trades." A/B testing of pricing, disclosed.
- **The Coinbase One zero-fee benefit is bounded three times**: "with certain limitations"; "members may still have a spread included in their quoted prices"; "The zero trading fee benefit does not apply to the 1% limit order execution fee."

Card issuance and third-party costs: "The Coinbase Card is issued by **Pathward, N.A., Member FDIC**, pursuant to a license from Visa U.S.A. Inc. The Coinbase Card is powered by Marqeta." / "You may be charged fees by an ATM operator."

### Licensing register `[observed]`

The `Licenses` page is a **state-by-state table** giving, per US state, the licence name and number and the supervising regulator's name and full postal address — e.g. "Alabama - SC Money Transmitter License 509" with the Alabama Securities Commission; "Arizona Money Transmitter, MT-0928767"; "Colorado - DOB Money Transmitters License, 500252"; "Delaware Check Seller, Money Transmitter License, 019214". Publishing the regulator's address alongside the licence number is the small detail that makes a licence register actionable: it tells a user **who to complain to**, not just that a licence exists.

## T11 Help-centre architecture

### The help centre proper `[absent]` / partially observed

`help.coinbase.com/en` is client-rendered and returned an almost empty shell. Retrievable fragments only:

`Hi there,` / `How can we help?` · `Sign in for the best experience` · "We'll be able to identify your account and resolve your issue more quickly." · `Sign in` / `I can't sign in` · **`85% of users resolve issues using search`** · `SELF-SERVE` · `Self-serve links` · `Most Helpful` · `Support by topic` · `Suspicious activity` · `STILL NEED HELP`

Three things survive and are worth recording. **`85% of users resolve issues using search`** is a statistic shown to the user to steer behaviour — social proof deployed as deflection, and unusually direct about it. **`Suspicious activity`** as a top-level entry point alongside `Support by topic` gives fraud its own door rather than filing it under a category. And **`STILL NEED HELP`** in caps as the last section reproduces the self-service-first ordering seen across this corpus (Wise: `Still need help?`; Ramp: `Need help? Contact Ramp Support`).

Individual help articles reached by deep link render fully, carry `meta-keywords` lists (the fees article lists 12 keyword variants including "does coinbase charge fees", "how much are fees", "will I pay a fee"), and end with a compact footer containing `Submit a complaint` and `Status`.

**Article structure** `[observed]` in the two articles captured: `# Title` → `## Section` → bolded status or concept → bulleted procedure, with inline cross-links. The troubleshooting article's two-column logic (`Sends` / `Receives`, then branch on status) is described in T6.

### Coinbase Learn — the real IA achievement `[observed]`

Four top-level sections, named in the footer: `Crypto basics` · `Tips & tutorials` · `Crypto glossary` · `Market updates`.

The `Crypto basics` index renders ~70 article cards, **each tagged with a content-type label**:

| Label | What it signals | Examples |
|---|---|---|
| `Beginner's Guide` / `Beginner's guide` | Long-form explainer | `What is Bitcoin?`, `What is cryptocurrency?`, `How to keep your crypto secure` |
| `Key term` / `Key Term` | Short definition | `What is mining?`, `What is market cap?`, `What is a fork?`, `What is an ETF?` |
| `Advanced Guide` | Harder material | `Why do stablecoins depeg?`, `Is quantum computing a threat for crypto?` |
| `Glossary` | Terminology collection | `The ultimate NFT glossary...`, `Don't let FUD give you FOMO or you'll end up REKT — crypto slang, explained` |
| `Tax guide` | Tax-specific | `Understanding your crypto taxes` |
| `Crypto resources` | Curated external | `What to read, watch, and stream` |

**Labelling every card by depth and type is the reusable idea.** A newcomer can filter to `Beginner's Guide`, a user who needs one word can look for `Key term`, and the `Advanced Guide` tag warns before the click. The labels are visible *before* the title in each card, so the depth signal arrives first.

**Casing is inconsistent** (`Beginner's Guide` / `Beginner's guide`, `Key term` / `Key Term`) — recorded as a defect in an otherwise well-designed taxonomy.

**Title grammar — three shapes:**

| Shape | Example |
|---|---|
| `What is X?` (dominant) | `What is a blockchain?`, `What is a stablecoin?`, `What is a memecoin?`, `What is a crypto wallet?` |
| `What are X?` | `What are gas fees?`, `What are crypto whales?`, `What are digital assets?` |
| `X vs. Y: what's the difference?` | `APY vs. APR: What's the difference?`, `Proof of Work (PoW) vs. Proof of Stake (PoS): what's the difference?`, `Utility tokens vs. security tokens: what are the differences?`, `Forex trading vs. crypto: which is right for you?` |

**The comparison shape is doing specific work.** Four articles exist solely to disambiguate pairs a beginner will conflate, and `Forex trading vs. crypto: which is right for you?` goes further — a decision article rather than a definition article, ending in a choice.

**Risk-adjacent educational content is present and named as such**: `7 biggest Bitcoin myths` · `Why do stablecoins depeg?` (tagged `Advanced Guide`) · `What is blockchain network congestion?` · `Is quantum computing a threat for crypto?` · `What are the pros and cons of investing in NFTs?` — described as "NFTs present unique ownership and potential for royalties, but they also come with risks s..." · `What is a bull or bear market?` · `Understanding your crypto taxes`.

**`Why do stablecoins depeg?` is the strongest title in the set** — it asks why a product fails, not what it is, and it is tagged `Advanced Guide` so the reader knows it is not introductory. A product-failure article as first-class educational content.

**Card descriptions are truncated mid-word** on the index ("They are typica...", "Bitcoin and Ethereum are both digital assets, but they aim to serve different purposes and..."). Functional, but the truncation frequently cuts before the qualifying clause — the NFT pros-and-cons card ends at "they also come with risks s...", losing exactly the half that justifies the title.

**One broken card**: an entry rendering as `[undefined](https://www.coinbase.com/learn/undefined)` sits inline in the grid. A content-pipeline failure in a live index.

**Article furniture** `[observed]` on `How to keep your crypto secure`: breadcrumb (`Learn > Crypto Basics`), by-line, an on-page contents list repeating the three H2s, a mid-article inline signup card ("Create account — It's free and takes 2 minutes or less."), a `Further reading` block with three related cards, a `Popular cryptocurrencies` grid, and a closing CTA ("Buy Bitcoin in just a few minutes"). **The educational article is heavily monetised** — signup prompt mid-article, a live price grid, and a buy CTA at the foot of a page about not getting robbed.

## T12 FAQs

### Legal FAQs `[observed]` — four questions

Covered in full in T10. Placement: accordion at the foot of the legal hub, below the document taxonomy and above the `Legal Blog`. Ordering: crypto insurance → cash insurance → account restrictions → legal contacts.

**The placement is the finding.** The most important risk copy on the site — the no-FDIC/no-SIPC negation and the pass-through-insurance qualification — lives in an **accordion on a legal page a retail user has no reason to visit**. Nothing on the homepage, the security page, or Coinbase Learn links to it prominently. The disclosure is excellent; its discoverability is poor.

### Other FAQ surfaces `[absent]`

No FAQ block was found on the homepage, the security page, or Coinbase Learn. The fee article functions as a de-facto FAQ (its `meta-keywords` are twelve question-shaped phrases: "does coinbase charge fees", "how much are fees", "will I pay a fee") but is structured as a document with headings rather than as questions.

Compare Mercury (15-question pricing FAQ, 8-question security FAQ) and Brex (15 + 15): Coinbase's public FAQ footprint is far smaller, and what exists is legal rather than commercial.

## T13 Terminology & glossary

| Term | Coinbase's usage | The alternative it rejected |
|---|---|---|
| `Primary balance` | The custodied wallet the user trades from | "account", "wallet" |
| `Hosted Cryptocurrency balance` | The formal name for custodied crypto | "your crypto" |
| `self-custody wallet` | Coinbase Wallet / Base App | "non-custodial" (used less) |
| `spread` | The embedded price cost, distinguished from `Coinbase fee` | rolling both into "fee" |
| `Coinbase fee` | The explicit, itemised charge | |
| `network transaction fees` / `miner fees` / `gas fees` | Three registers for one concept, all glossed | |
| `slippage tolerance` | Named bound on DEX price movement | |
| `Commercial Engagement` | NYDFS conflict term, **defined broadly and the breadth stated** | |
| `pass-through` insurance | The correct technical term, with both contingencies named | "FDIC insured" |
| `account takeover` / `ATO` | Defined in-line on first use | "hacked" |
| `SIM-swap` | Attack named, mechanism narrated, etymology glossed | |
| `Trust and Safety experts` | Internal team named as content source | |
| `limit-only mode` | Incident term, with the consequences spelled out | "restricted" |
| `Degraded Performance` | Statuspage severity band | "partial outage" (also present, distinct) |
| `Rest assured, your funds are safe.` | Fixed reassurance clause in incident copy | |
| `confirmations` | The real status of a blockchain send | "processing" |
| `on-ramp` / `off-ramp` | Glossed in Learn (`What are fiat "on-ramps" and "off-ramps"?`) | |
| `FUD` / `FOMO` / `REKT` / `diamond hands` / `the flippening` | Community slang given a dedicated glossary article | ignoring it |
| `prediction contracts` | The instrument, in the risk footnote | `prediction markets` (the marketing name) |
| `perpetual-style futures` | Hedged product naming in the nav | "perps" (used in Wallet copy) |
| `Amplify your trades` | The nav phrase for leverage | "leverage", "margin" |
| `cryptoeconomy` / `crypto economy` | Coined, both spellings in use | |
| `Coinbase One` | Subscription tier, with `Basic` / `Preferred` / `Premium` sub-tiers | |

**The `spread` / `Coinbase fee` split is the most consequential terminology decision on the site.** Keeping them as two named costs — rather than one blended "fee" — is what makes the fee page honest, and it is why the page can then say "Coinbase may retain any excess spread".

**Register split between marketing and disclosure is total.** Marketing says `prediction markets`, `Turn your insights into trades`, `Amplify your trades`. The footnote says `prediction contracts`, `substantial risk`, `loss of your entire investment`, `can exceed your initial investment amount`. **The same product has two vocabularies, and they do not overlap on a single word.** This is the T14 tension in lexical form.

**Slang is taken seriously** — a dedicated article (`Don't let FUD give you FOMO or you'll end up REKT — crypto slang, explained`, "we break down 11 of the most popular pieces of crypt...") on the assumption that a beginner will encounter the community's language before they encounter Coinbase's. Teaching the vernacular is a legitimate part of risk education: a user who does not know what `REKT` means cannot read the forums where they are being pitched.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for Coinbase, heavily — the security page runs five consecutive `We` headers, the incident template is `We are aware` / `We are investigating` / `We will provide an update`. The security article is the only by-lined first-person-singular content (`our Security team here at Coinbase has seen...`).

**The register tension, evidenced.** This product's defining characteristic is that it maintains two non-overlapping registers on the same page:

| Surface | Register | Example |
|---|---|---|
| Hero / nav / product blocks | Short, imperative, aspirational, present-tense | `Trade more with less`, `Turn your insights into trades.`, `Trade to win, onchain.`, `Amplify your trades` |
| Footnote block, page foot | Long, hedged, conditional, subjunctive | "Trading prediction contracts involve substantial risk and may result in the loss of your entire investment." |

They coexist on the homepage separated by roughly a full screen of scroll and a font-size step. **Neither register is wrong on its own; the finding is the distance between them.** The risk language is present, accurate, and unusually specific — Coinbase does not water it down. It is simply never adjacent to the claim it qualifies, except via a superscript.

Contrast Wise's practice, recorded in the exemplar: claim, then bound the claim *immediately*, in adjacent smaller text. Coinbase uses the same superscript mechanism but resolves it 1,500 words away. The one counter-example is `Earn up to 4% Bitcoin back on every purchase. **Terms apply.**` in the nav — a qualifier travelling with its claim.

**Where the register is right, it is very right.** The `Legal FAQs`, the incident template, and the security article are all written at a much plainer level than the marketing copy, with no jargon left unglossed. The tone gets flatter and more concrete as the stakes rise — the same gradient Wise shows — but only within those surfaces.

**Sentence-level habits**: acronyms always expanded on first use (`Federal Deposit Insurance Corporation ("FDIC")`, `Securities Investor Protection Corporation ("SIPC")`, `account takeover", or "ATO"`, `optical character... ` n/a). Bold used for status names and for the operative clause of a warning. Em-dashes for parenthetical mechanism. `Please note that` appears repeatedly in the fee document. No exclamation marks in disclosure or incident copy; two in the security article ("apply it to the rest of your digital life as well!").

**Plain-language commitment, published** `[observed]` — from the accessibility statement, under its own heading:

> "**Plain Language.** We use clear and concise language following plain English principles to describe processes such as account creation, how to complete transactions, and account details. Complex terminology is avoided or clearly explained. We also ensure that key information is brought to the attention of users."

And the EAA obligation it answers to, quoted in the same document: "ensuring that the information is understandable, **without exceeding a level of complexity superior to level B2 (upper intermediate) of the Council of Europe's Common European Framework of Reference for Languages.**"

**A CEFR B2 readability ceiling as a legal requirement for consumer banking services.** That is a concrete, testable content standard — not "write clearly" but "no harder than B2" — and Coinbase publishes it. For any content team that has struggled to get a readability target adopted, this is the precedent: the EAA makes it a compliance obligation, not a style preference. Whether the derivatives footnote meets B2 is a separate question.

**Accessibility content** `[observed]` — the strongest in this corpus sample.

- **Two skip links, first in DOM, on every marketing page**: `Skip to content` and `Skip to site index`.
- **A full Accessibility Statement**, dated `Last Updated: October 24, 2025`, linked from the Legal hub's sub-nav and its `Privacy and Other Important Information` group.
- **Contact routes given twice, including a phone number**: "please contact us here or at +1 (888) 908-7930" — a telephone number in an accessibility statement is the right inclusion for users for whom the web form is the barrier.
- **Scope declared explicitly**: the public website, the mobile application, and "our customer-facing interfaces for accessing crypto-asset services, e-money accounts and related payment services". Naming the *in-product* surfaces, not just the marketing site.
- **Standard named with version and level**: "Our websites and app are guided by **Web Content Accessibility Guidelines (WCAG) 2.2 AA**." Note the hedge `guided by` rather than `conform to` — accurate, and weaker than a conformance claim.
- **Five specific features listed** rather than a generic commitment: clear keyboard focus indicators; content reflow on zoom/text increase; no keyboard traps; page titles and language conveyed clearly; contrast standards supported. Each maps to a named WCAG criterion.
- **Support services covered**: "we provide information, in accessible modes of communication, on the accessibility of our services and those services' accessibility with assistive technologies."
- **Escalation routed to four named EEA regulators with websites and postal addresses** — Central Bank of Ireland, Competition and Consumer Protection Commission, CSSF (Luxembourg), BaFin (Germany), CySEC (Cyprus). A user whose accessibility complaint is mishandled is told exactly who to escalate to. **This is the pattern to copy**: an accessibility statement that ends in a regulator, not in a mailbox.
- The full EAA general requirements are reproduced, including the multi-sensory-channel obligations and the B2 readability ceiling.

**Alt text on marketing pages is weak and inconsistent.** Several images carry a **single space** as alt (`![ ]`) on the security page — technically non-empty, announced as nothing useful. Others carry the filename or a generic string. The homepage tile images are unlabelled in the extraction. The Learn index cards carry genuinely descriptive alt on some images — "The Bitcoin logo, held up by a hand, to demonstrate secure peer-to-peer transactions.", "Six blocks in a blockchain, the technology powering cryptocurrencies.", "Graphs depicting bear market trending downwards and bull market trending upwards", "A cryptocurrency blockchain, forking into two different branches", "A scale weighing a stack of crypto coins" — and one card carries an **entire paragraph** as alt text (a ~60-word definition of a seed phrase on the `What are digital assets?` card), which is a misuse of the attribute.

Icon fonts render as private-use Unicode glyphs throughout the nav (`󰨂`, `󰧶`, `󰙸`). If these are not `aria-hidden`, a screen reader may announce garbage between every nav item. **Flagged as suspected, not confirmed** — extraction cannot show ARIA state.

**Negative findings, recorded honestly**

- `Sign up` / `Sign up now` / `Create your account` / `Get started` — four labels for account creation.
- `Discover more` (security page) is labelled as information and resolves to account creation.
- `Trade now` — the most urgent CTA on the site — is attached to the leverage product.
- `up to $2,000` headline vs `Average reward is approximately $25` footnote, same page.
- Five bare `Learn more` links.
- `Rest assured, your funds are safe.` / `Rest assured your funds are safe.` / `Your funds are safe.` — three punctuations of one fixed reassurance.
- `Beginner's Guide` / `Beginner's guide` and `Key term` / `Key Term` casing drift in the Learn taxonomy.
- A live `[undefined]` card in the Coinbase Learn index.
- Learn card descriptions truncate mid-word, sometimes cutting the risk half of a balanced claim.
- The most important risk copy on the site sits in an accordion on a legal page.
- Q3 of the Legal FAQs answers a policy question with an editorial opinion about tech-company censorship.
- Single-space alt attributes on the security page; a 60-word paragraph as alt on a Learn card.
- `help.coinbase.com` is client-rendered to the point that the help IA is invisible without JavaScript.

---

## Transferable patterns

1. **Branch the troubleshooting article on the status the user is looking at.** "If the transaction status is: `Pending` → ... `Completed` → ..." Two headings, two procedures. The user matches their screen to a heading instead of reading prose. Transfers to any support content for a stateful object.
2. **Write the recovery path for the "successful" state.** `Completed` is where crypto's worst failures live. Wherever a terminal success state can coincide with user disaster, the help content must cover it — and must say plainly what cannot be undone. "Coinbase can't recover funds sent on the wrong network." Six words, no apology.
3. **Qualify pass-through insurance properly.** "Pass-through insurance **may be available** ... **contingent upon Coinbase maintaining accurate records and on determinations of the relevant federal regulator as receiver** at the time of a receivership." Both conditions named, the verb hedged, the limit marked `currently`, and the partner banks listed with a date. The correct model for any sweep or pass-through claim.
4. **State what the protection is not, in a list of negations, with acronyms expanded.** "Digital currency is not legal tender and is not backed by the government. Coinbase is not an FDIC-insured bank and digital currency is not insured or guaranteed by the FDIC or SIPC, and may lose value."
5. **Publish the sentence that says the insurance may not be enough.** "we will endeavor to make you whole; however, total losses may exceed insurance recoveries so funds may still be at risk."
6. **Separate the entities in the footnote that sits under the claim that mixes them.** Footnote ² — name the broker-dealer, separate it from the crypto entity, then state that SIPC does not reach the crypto side. Fire it wherever the two asset classes appear together.
7. **Name what is NOT affected in the second sentence of an incident notice.** "Buys, Sells, and Fiat withdrawals/deposits are not affected." The user's real question is whether their money can move; answering it converts an outage notice into an instruction.
8. **A fixed reassurance clause, used every time.** `Your funds are safe.` Lock the wording, including punctuation, and repeat it until it is a recognised signal.
9. **Publish a list of things you will never do.** "Coinbase will never ask you for passwords, 2FA codes, PIN numbers or for remote access to your computer. We do not offer Facebook support chat and we will never call you by phone." A falsifiable test beats a list of red flags, and naming the absent channel closes a specific vector.
10. **Concede the weakness of your own supported option.** "We also believe that using SMS-based two-factor authentication is better than using no 2FA at all" — said immediately after explaining how SIM-swap defeats it. Then rank the remedies, with a floor: "consider not using that service."
11. **Tag every educational card by depth and type, before the title.** `Beginner's Guide` / `Key term` / `Advanced Guide` / `Glossary`. The reader self-selects before clicking.
12. **Ship a product-failure explainer as first-class education.** `Why do stablecoins depeg?`, tagged `Advanced Guide`.
13. **Vary the notification trigger set by channel cost, and publish both.** Email gets create/update/resolve; SMS gets create/resolve only; webhook gets everything including component changes — each stated at the subscription point.
14. **End the accessibility statement at a regulator.** Name the supervising authority, its website, and its postal address, per jurisdiction, so an unresolved complaint has somewhere to go. And adopt the EAA's **CEFR B2 readability ceiling** as a concrete, testable content standard.
15. **Name the embedded cost, say which tooltip reveals it, and admit you keep the excess.** "You can see the spread in the order preview screen ... Coinbase may retain any excess spread from a transaction."

## Caveats & gaps

- **Help-centre IA not captured.** `help.coinbase.com/en` is client-rendered; the category tree, article-title inventory, and search behaviour are **unknown**, not absent. Only two articles (reached by deep link) and a handful of homepage fragments were retrieved. This is the largest gap in the file and materially limits T11.
- **`/legal/risk-disclosures` returned an empty response.** A dedicated risk-disclosure page may exist at that or another path and was not captured. All risk language in this file comes from the homepage footnote block, the Legal FAQs, and the fee article.
- **Coinbase Learn index (`/learn`) returned metadata only.** The `crypto-basics` category rendered fully; `Tips & tutorials`, `Crypto glossary` and `Market updates` were not opened. The full Learn taxonomy is therefore partial.
- **User Agreement not read.** The Legal hub's deep-link anchors were catalogued, but no clause text from `/legal/user_agreement/united_states` was retrieved — including the arbitration appendix, the staking terms, and the Coinbase One terms. This is a significant omission for a T10-priority product.
- **Licenses page captured but only sampled.** The state table was confirmed to exist and four rows were read; the full register was not transcribed.
- **All transaction-state vocabulary is `[documented]`** from two help articles. Only `Pending` and `Completed` were named. The live order-entry flow, the order preview screen, the spread tooltip, and any error strings are behind auth.
- **No in-product error strings.** `[absent]`
- **Empty states: nothing found.** `[absent]`
- **Derivatives, prediction-markets, stocks and staking product pages were not opened** — only their nav descriptions and the footnote ³ risk language were captured. The pages where a margin call, a liquidation, or an options-style assignment would be explained are unharvested, and those are exactly where this product's deepest risk copy is likely to sit.
- **No margin-call, liquidation, or pattern-day-trader copy was found** on the surfaces inspected. Coinbase's equities offering runs through Coinbase Capital Markets Corp / Apex; whether PDT rules are explained anywhere public was not established. Recorded as not-found rather than absent.
- **Only the US site.** The EEA entities are named in the accessibility statement; no EEA-localised marketing or risk page was sought, and EU risk disclosure (MiCA-driven) would likely differ materially.
- **Mobile app copy not harvested.**
- Alt-text and icon-font findings come from extracted markup; ARIA state cannot be confirmed from extraction.
- The `Digital Asset Disclosures` table was captured in full but is summarised structurally rather than reproduced; individual Yes/No values are not quoted.

## Sources

1. https://www.coinbase.com/
2. https://www.coinbase.com/legal (→ https://www.coinbase.com/legal/us)
3. https://www.coinbase.com/legal/digital-asset-disclosures
4. https://www.coinbase.com/legal/licenses
5. https://www.coinbase.com/legal/accessibility-statement
6. https://www.coinbase.com/security
7. https://www.coinbase.com/learn
8. https://www.coinbase.com/learn/crypto-basics
9. https://www.coinbase.com/learn/crypto-basics/how-to-secure-crypto
10. https://help.coinbase.com/en
11. https://help.coinbase.com/en/coinbase/trading-and-funding/pricing-and-fees/fees
12. https://help.coinbase.com/en/coinbase/trading-and-funding/cryptocurrency-trading-pairs/send-and-receive-troubleshooting
13. https://status.coinbase.com
