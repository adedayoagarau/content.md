# 051. Mercury

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Startup business banking (fintech / sponsor-bank neobank for businesses) |
| Primary URL | https://mercury.com/ |
| Corpus rank | 051 |
| Benchmark strength (source list) | Business-banking workflows |
| Locale / market observed | en-US |
| Platform observed | Web (desktop marketing), Zendesk help centre, incident.io status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Not a bank.** Mercury is a fintech company; banking services provided through Choice Financial Group and Column N.A., Members FDIC. Sponsor-bank sweep networks give up to $5M FDIC coverage. Mercury Treasury / Mercury Invest offered by **Mercury Advisory, LLC, an SEC-registered investment adviser**; custody at **Apex Clearing Corp** (SEC- and FINRA-regulated broker-dealer), SIPC coverage $500,000 with $250,000 cash sub-limit. IO charge card issued by Patriot Bank, N.A. Subject to KYC/KYB, AML, and OFAC. SOC 2 Type II and PCI referenced. |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Partial — marketing, pricing, security, legal index, status and seven help surfaces captured. In-product status vocabulary is `[documented]` from help bodies, not observed. The pricing comparison matrix is accordion-collapsed and its cell contents were not in server HTML. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://mercury.com/ | Hero, four-pillar product framing, footnote-marker system, footer IA |
| Pricing | https://mercury.com/pricing | Three named plans, "Jump to section" list, 15-question pricing FAQ |
| Spend management | https://mercury.com/spend-management | Richest single source of simulated in-product UI strings |
| Security | https://mercury.com/security | Funds-protection framing, eight-question security FAQ |
| Legal index | https://mercury.com/legal | Document taxonomy by product line |
| Status page | https://status.mercury.com | Eleven named service components |
| Help centre home | https://support.mercury.com/hc/en-us | 18 sections, eight "Suggested articles" |
| Help: Send Money | .../sections/28736357757716-Send-Money | 25 article titles |
| Help: Expense Management | .../sections/31052662843028-Expense-Management | 14 article titles |
| Help: Security | .../sections/28737293858836-Security | 15 article titles |
| Help: Bill Pay | .../sections/28737146093460-Bill-Pay | One article only — a near-empty category |
| Article: Processing times for payments | .../articles/28773186865684-... | Timing vocabulary, cutoff language |
| Article: Sending money overview | .../articles/28772488555668-... | Send flow step sequence |
| Article: Canceling a payment | .../articles/28775812171668-... | Approval-state vocabulary, tab names |
| Article: Tracking missing payments | .../articles/28768209374356-... | Failure/recovery routing |
| Article: Enforcing spend policies with automatic card locking | .../articles/51679267799060-... | Lock states, notification timing |
| Article: Reviewing reimbursements | .../articles/29625685367444-... | Approve / Decline / More |

(17 URLs listed; 14 distinct page fetches plus three article fetches reached via cross-links — see Sources.)

---

## T1 Navigation & IA labels `[observed]`

**Global nav is four nouns plus one price** — `Products` · `Solutions` · `Resources` · `About` · `Pricing`. Pricing is the only flat link; everything else is a menu. Account actions sit to the right as three separate entry points: `Dashboard` · `Log in` · `Open account`. Shipping `Dashboard` *and* `Log in` side by side is unusual — it lets an already-authenticated user skip the login screen, and it means the nav carries two labels for what a visitor may read as one action.

**Footer is organised by user job, not product family** — seven groups:

`Banking` · `Platform` · `Resources` · `Finance Ops` · `Solutions` · `Account` · `About`

`Finance Ops` is the notable grouping name: it addresses the *role* (`Financial Workflows`, `Payments`, `Bill Pay`, `Invoicing`, `Spend Management`, `Books`, `Accounting Integrations`, `SAFEs`) rather than the feature set. `Solutions` is purely vertical-named (`Ecommerce`, `SaaS`, `VC Funds`, `Crypto`, `LLCs`, `Life Science`, `Climate`, `Real Estate & Construction`, `Healthcare Services`). `Status` and `Security` are first-class footer links under `Platform`.

**Help-centre sections — 18 top-level, no descriptions** (https://support.mercury.com/hc/en-us):

`Getting Started` · `Eligibility & Applying` · `Send Money` · `Expense Management` · `Mercury Account` · `Invoicing` · `Manage Money` · `Team` · `Cards` · `Credit` · `Bill Pay` · `1099 Filing` · `Accounting` · `Integrations` · `Capital` · `Treasury & Vault` · `Documents & Data` · `Security` · `Onboarding Guides`

Grammar is mixed and worth recording as a negative finding: imperative verb phrases (`Send Money`, `Manage Money`), bare product nouns (`Invoicing`, `Credit`, `Bill Pay`), organisational nouns (`Team`), compound nouns (`Documents & Data`, `Treasury & Vault`), and a gerund (`1099 Filing`). Compare Wise, where every help category is a gerund phrase. Mercury's IA is object-model-shaped, not activity-shaped, and unlike Wise it ships **no scope line under any category** — the user must guess the boundary from the label alone.

**Depth is very uneven.** `Send Money` holds 25 articles; `Bill Pay` holds exactly one (`Bill Pay overview`). A top-level help section with a single article is a real IA defect — it promises a category and delivers a page.

**Breadcrumb grammar** `[observed]`: `Mercury > Business > Send Money` — an audience tier (`Business`) sits between brand and topic, implying a parallel `Personal` tree.

**In-app navigation named in help bodies** `[documented]`: `Move Money > Send`, `Team Spend > Policies`, `Settings > Notifications`, and page names `Transactions page`, `Payments page`, `Cards page`, `Reimbursements page`, `Checkbooks page`, `Insights page`. Note the split: the marketing site says `Send Money`, the product says `Move Money > Send` — the verb is hoisted into the menu and the object left behind.

## T2 Value proposition & headline patterns `[observed]`

**Hero** — `Radically different banking`, with the word `banking` carrying an inline footnote marker that resolves to the not-a-bank disclosure. The subhead is a time promise plus the same hedge: "Apply online in 10 minutes to experience banking unlike anything that's come before."

This is the single most transferable Mercury pattern: **the disclaimer is attached to the noun, not the page.** Every occurrence of `banking` across the site carries `#footnote-business-not-a-bank-2026`. The claim and its legal bound travel together as one token.

**Section headers are two-beat aphorisms with a turn** — most use a full stop mid-line:

- `Everything you do with money. All in one place.`
- `Banking's been a headache. Now, it's a head start.`
- `Get started fast. And never stop moving.`
- `Stop losing money to fees. Start using it to fuel your growth.`
- `Standard protection stops short. Mercury goes further.`
- `Scale the team. Shrink the paperwork.` (spend-management page)
- `Less admin, more presence.`
- `You're creating something to stand the test of time. So are we.`

The shape is consistent: **negative state, full stop, positive state.** Two of them use sound play (`headache` / `head start`; `Scale` / `Shrink`). This is a much higher-flourish register than Wise.

**Feature sub-headers are imperative or gerund verb phrases naming the outcome:**

`Create cards in a couple of clicks` · `Watch bills pay themselves` · `Get paid without a patchwork of tools` · `Reconcile receipts without the runaround` · `Tackle banking tasks in seconds` · `Accounting on autopilot` · `Set the rules once` · `Smarter with every transaction`

Three of the four homepage feature headers are built on **alliterative negation** — "without a patchwork", "without the runaround". The benefit is framed as the removal of a named chore.

**Four-pillar product framing** (homepage): `Business banking & more` · `Cards & expense management` · `Payments & invoicing` · `Accounting`. Ampersands throughout; each pillar body leads with a number or a fee (`3.91% yield`, `1.5% cashback`, `no fees on USD payments`).

**Numbers as trust devices** `[observed]`: `300K+` entrepreneurs, `1 in 3` startups, `$20B+` monthly transaction volume, `4.9` App Store rating, `20x the usual coverage`, `97%+ of deposits are FDIC-insured`, `Profitable since June 2022`. Each of the first four carries a footnote marker or a press link. `Profitable since June 2022` on a *security* page is a notable move — company solvency presented as a user-safety fact.

**Pricing headline** — `Pricing that fits your business`, subhead: banking and essentials are always $0/mo with more plans as the business grows. Pricing page also carries a `Jump to section:` mini-nav, which treats the fee schedule as a document to be navigated rather than a table to be read.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Open account` | Global nav, hero, every page foot | Primary. Noun-phrase, not "Sign up" |
| `Log in` | Global nav | |
| `Dashboard` | Global nav, left of `Log in` | Destination-named, for returning authenticated users |
| `Launch demo` | Hero, secondary | |
| `Explore demo` | Business card, bottom of homepage | **Near-duplicate of `Launch demo` for the same destination** |
| `Explore spend` | Spend-management hero | Anchor link, not navigation |
| `Contact sales` | Hero secondary, pricing foot | |
| `Get in touch` | Pricing, below plan cards | Softer twin of `Contact sales` |
| `Explore credit cards` / `Explore payments` / `Explore Treasury` / `Explore Insights` / `Explore Command` | Feature blocks | `Explore` + product noun is the house pattern for learn-more |
| `Learn more` | Mercury-for-personal card | **The one bare `Learn more` on the homepage** |
| `Learn how Mercury works` | Security page | Fully specific twin |
| `Read more` | Security, DDA explainer | Bare; the adjacent heading supplies the object |
| `Compare plans` | Pricing | |
| `Expand all` | Pricing comparison matrix | Progressive disclosure control |
| `Sync your accounting` | Spend management | Verb + object |
| `Step into Simone's studio` | Spend management, card-design story | Editorial register inside a product page |
| `Switch in days, not months` | (Ramp comparator — see 052) | n/a |
| `Trust center` | Security | Destination = page title |
| `Subscribe to updates` | Status page | |
| `Contact us` | Status page, help footer | |
| `Message Support` | Help article foot, for logged-in users | |
| `Skip to main content` | Help centre, first in DOM | Accessibility |
| `Opt out` | Email-capture forms | See T5 |

**In-product CTAs named in help bodies** `[documented]`: `Approve` · `Decline` · `More` · `Cancel Request` · `Enable` · `Save` · `Unlock` · `Request temporary unlock` · `Don't have it` · `Continue` · `Done` · `Track this wire` · `Stop Check Payment`.

`Don't have it` is the standout. It is the escape hatch on a receipt-required violation, written as the user's own sentence rather than `Request exception` or `Mark unavailable`. Two words, contraction, no system vocabulary — and it opens a reason-capture form that goes to admin review.

## T4 Onboarding & getting-started

**The headline onboarding promise is a duration, repeated verbatim in three places** `[observed]`: `Apply in 10 minutes` (meta description), `Apply online in 10 minutes` (hero subhead), `Apply online in 10 minutes` (getting-started section header, with body "Free checking and savings accounts — no in-person visits or paperwork").

The differentiator is stated as three absences: no in-person visits, no paperwork, and on the credit card — `no minimums, credit checks, or personal guarantees`. **Onboarding is sold by enumerated negation.**

**Send-money flow, six steps** `[documented]` (https://support.mercury.com/hc/en-us/articles/28772488555668-Sending-money-overview):

1. Go to `Move Money > Send`
2. Add a new recipient, select an existing one, or upload a bill to pay directly
3. Choose an available payment method
4. Enter and confirm the amount, funding account, and send date
5. Review the payment details
6. Submit the payment

Steps 5 and 6 are kept separate — `Review` is a named step, not folded into submission. The article closes with a section headed `A note on timing and errors`, which is unusually candid placement: the happy path ends, then the article itself raises the exception before the user meets it.

**Automatic card locking setup, five steps** `[documented]` — ends with `Optionally, create exemptions for specific employees or departments` *before* `Click Save`. The exemption is offered inside the setup flow rather than as an afterwards-fix.

**Help centre offers `Onboarding Guides` as its own top-level section** and `Eligibility & Applying` as a second — Mercury splits "can I?" from "how do I?" at the category level, which is a sensible move for a product with real eligibility gates.

## T5 Form & field labels

**The email-capture hero form is the only substantive pre-auth form** `[observed]`:

| Element | String |
|---|---|
| Field placeholder | `Enter your email` |
| Submit | `Open account` |
| Consent line | "Mercury will occasionally send you emails with offers, news, and promotions. Check this box if you do not want to receive them." |
| Checkbox label | `Opt out` |

Worth flagging both ways. The consent line is **honest about default-on marketing** and states the mechanism in one sentence rather than burying it. But the construction is a double negative — "Check this box if you do not want" paired with a checkbox labelled `Opt out` — so the user must hold two negations at once to reason about the unchecked state. A content designer should read this as a good instinct in a bad grammar.

**In-product form labels named in help** `[documented]`:

- Categorisation-rule builder uses two **questions as field labels**: `What do you want to happen?` and `When should it happen?`, with `If` as the condition operator and `Create` as the submit. Rule-building written as an interview rather than a form.
- Stop-payment form fields: issuing checking account, check number or check number range, check amount (optional), additional notes (optional). The help body carries an inline format warning — `"001-025" is not the same as "1-25"` — which is validation guidance living in documentation rather than in hint text.
- Budget detail fields `[observed, simulated UI]`: `Spend methods` · `Recent activity` · `Next reset` · `Details` · `Allowed merchant types` · `Current spend`.
- Team table columns `[observed, simulated UI]`: `Name` · `Role` · `Job title` · `Department` · `Status`; filter control `Exclude sub-departments`.

## T6 Status & state language — PRIORITY

Mercury's status vocabulary spans four distinct systems, each with its own register.

### Payment transaction states `[documented]`

| State | Where it appears | Notes |
|---|---|---|
| `Pending` | Transactions page; quoted in two help articles | Capitalised and quoted in the help body — "If the payment's current status is pending" and "If the payment is still \"Pending\"". Treated as the boundary state: tracking IDs appear only once a transaction is "no longer \"Pending\"" |
| `Scheduled` | Payments page tab | |
| `Needs approval` | Payments page tab | See approval states below |
| failed / returned | Named in prose, not as a label | The article says to locate the payment "and look for a **failure reason**" — so the system exposes a reason string per transaction, but the reason vocabulary is not public |
| `canceled` (mailed check) | | "Canceled checks may still be printed and mailed to the recipient — the difference is that your recipient won't be able to deposit them." A cancel that does not stop the physical artefact, and the help copy says so plainly |

**The pattern to steal:** Mercury documents the *gap between cancellation and effect*. A cancelled mailed check still arrives; the state change only removes depositability. Rather than hide that, the help text names the difference in one sentence.

### Approval states `[documented]`

Payments page tabs: `Scheduled` · `Needs approval`. Within `Needs approval` the available actions split by role — an approver sees `Decline`, the creator sees `Cancel Request`. **Two labels for the same destructive outcome, deliberately differentiated by who is acting.** The approver declines someone else's request; the requester cancels their own. This is a precise piece of role-aware state writing.

Reimbursement review states `[documented]`: requests are filtered by "pending review"; actions are `Approve`, `Decline`, `More` (request details from the submitter). Note the third option — **"ask for more information" is a first-class approval state**, not just an approve/reject binary, and it is hidden behind an overflow label (`More`) rather than named.

Post-approval: "Once approved, reimbursements are processed once per business day" — the state change and the money movement are explicitly decoupled.

### Card and policy states `[documented]` / `[observed, simulated UI]`

| State | String |
|---|---|
| Locked | `Locked` badge on card art; "a notice indicates that the card is locked until policy violations are resolved" |
| Warning / pre-lock | "a warning icon appears on the card" if a violation is upcoming or unresolved |
| Temporary unlock | `Request temporary unlock`; first is self-serve, subsequent require admin approval |
| Resolution list header | `Resolve these to unlock your card` |
| Individual violations | `Add category` — `$35.93 at Deli 77 on June 29`; `Upload receipt` — `$80.26 at C Town Supermarkets on June 15` |

The locked-card screen is the best piece of state writing on the site. The heading is an **imperative naming the exit condition** (`Resolve these to unlock your card`), and each blocking item is written as *verb + the exact transaction that caused it*. The user never has to ask which charge is the problem. Compare the generic "Action required" banner this could have been.

Team-member row statuses `[observed, simulated UI]`: `Needs review` · `Active` · `Invite skipped`. `Invite skipped` is unusually specific — it records a deliberate non-action as a state rather than leaving the row blank.

### System / service status `[observed]`

Status page (https://status.mercury.com) headline: `We're fully operational`, with the body "We're not aware of any issues affecting our systems."

**First person plural, present tense, and an epistemic hedge.** "We're not aware of" is materially different from "there are no issues" — it concedes that the status page reports Mercury's knowledge, not reality. That is an honest and reusable formulation for any status surface.

Eleven named components under `System status`: `Account Access` · `Account Management` · `Account Opening` · `Money Movement` · `Cards` · `Bill Pay & Invoicing` · `Check Deposits` · `Mercury Treasury` · `Integrations & API` · `Mercury Personal` · `Support`. `Support` as a monitored component is a good inclusion — the help channel's own availability is a status the user can check.

### Timing language inventory `[documented]`

Mercury's timing copy is dense and almost entirely **range-based with a named cutoff**:

`0-2 business days` · `0-1 business days` · `1-3 business days` · `up to 4 business days` · `up to 5 business days` · `7–10 business days` · `10-14 business days` · `within seconds` · `up to 30 minutes` · `once per business day` · `24 hours`

Cutoffs are given as absolute clock times with a timezone: `12pm PT`, `1:30pm PT`, `9-11am PT`, `3pm PT`. Third-party variance is named with **specific counterparties**: "Wells Fargo: received around 6:00pm PT, Bank of America: received around 9:00pm PT". Naming other banks' posting times in your own help centre is a content-ops decision worth flagging — high utility, high maintenance cost.

Every timing block is bounded: "These timelines are general estimates. Some wires may take longer if they require manual review or if a bank holiday occurs during processing." And on RTP: "Real-time payments are designed to settle in seconds, but instant delivery is not guaranteed in every situation." **Claim, then bound the claim** — the same construction Wise uses, applied to speed rather than price.

One extended metaphor, used once: international wires are "like a flight for your money", with intermediary banks as "layovers". Scare-quoted, glossed immediately with the technical term (correspondent/intermediary banks). Metaphor used as a bridge, then dropped.

## T7 Error, failure & recovery — PRIORITY

### Article-title grammar for failure `[observed]`

Mercury's recovery titles are **gerund-plus-object or bare noun**, never first person:

- `Tracking missing payments`
- `Canceling a payment`
- `Stopping a check payment`
- `Fixing undeliverable addresses`
- `Replacing lost or stolen cards`
- `Freezing or canceling a card`
- `Resetting your password`
- `Resetting your 2-factor authentication (2FA)`
- `Prevent, spot, and respond to Mercury Business card fraud`
- `Filing a Mercury Business card dispute: Eligibility and steps`
- `How to check and manage your Mercury Business card dispute status`
- `Understanding compromised passwords and how we keep Mercury accounts secure`

Compare Wise's `I sent money to the wrong person`. Mercury never writes the panicking user's sentence. The register is administrative throughout. The one exception is a question title — `Why did I get a notification of change (NOC)?` — which is the only place the user's voice appears in the Send Money section, and notably it is attached to an **incoming system message the user did not ask for**.

`Prevent, spot, and respond to ... card fraud` is a three-verb title covering the whole lifecycle in one article, rather than three articles. `Filing a ... dispute: Eligibility and steps` uses a colon to pre-announce that eligibility is a gate — the user learns before clicking that they may not qualify.

### The failure-reason pattern `[documented]`

"If you're encountering errors with a failed/returned payment, we recommend locating the payment on your Transactions page and looking for a **failure reason**." Mercury exposes a per-transaction reason string. The strings themselves are behind auth and are `[absent]` from public surfaces.

### Recovery routing is evidence-gathering, not self-service `[documented]`

`Tracking missing payments` is structured as **what to collect before you contact us**, split by rail:

- ACH: Date sent · Sender name · Amount · ACH trace ID ("You may have to ask the sender, but this will be the fastest way to locate the transaction")
- Domestic wire: Date sent · Sender name · Amount · IMAD/OMAD ("can be obtained by asking the sending bank")
- International wire: date, sender, amount, then "Our support team will then share a secure link you can use to share a copy of your wire receipt or SWIFT confirmation (MT103 or pacs.008)"

Two things worth recording. First, the article **teaches the user the identifier vocabulary** (trace ID, IMAD, OMAD, MT103, pacs.008) rather than hiding it — it assumes a business user who will need to talk to a counterparty's bank. Second, it routes some of the work to third parties ("ask the sender", "ask the sending bank") without apology.

The pre-emptive framing at the top is good practice: "if your transaction was just sent, it might not have been processed yet" — the article opens by suggesting nothing is wrong.

An unrecoverable case is stated flatly: "if the incorrect account details were used, the wire will be returned to sender." No hedging, no apology.

### Cancellation is documented as mostly-impossible `[documented]`

`Canceling a payment` opens with the optimistic case (scheduled payments and payments pending approval are easy) then immediately concedes the common one: "ACH and wire payments are processed quickly and typically can't be canceled." The remedy offered is a **transaction link the user copies and sends to support** — the recovery affordance is a deep link, not a button.

Stop payments: admin-only, submitted through a chat-triggered form, blocked "for six months", confirmation email on creation. The six-month expiry is stated; most products leave stop-payment duration undefined in user-facing copy.

### Pre-emptive failure prevention `[observed]`

- Check review — a named feature for reviewing physical checks *after* deposit, described in the pricing FAQ as fraud prevention
- Robust ACH authorization — "Designate which vendors can initiate ACH debits from your account and receive notifications about any unauthorized payments"
- `Fixing undeliverable addresses` as a standing article title
- International wire guidance: "Make sure you include a purpose/reason for your wire to ensure it processes quickly" — the reason for the field is given at the point the user would skip it

## T8 Empty states `[absent]`

No no-data, no-results, or first-run strings were reachable on public surfaces. The status page's all-clear (`We're fully operational`) is the closest analogue and is recorded under T6. The help-centre search returns results client-side and its zero-result string was not in server HTML.

## T9 Notifications & system messages

**SMS receipt request** `[observed, simulated UI]` (spend-management page):

> "Your transaction at Golden Oak Bakehouse for $21.08 requires a receipt."
> "Reply with a photo of the receipt and we'll match it."

Two sentences. First names the specific transaction and the obligation in passive voice ("requires a receipt" — no actor, no blame). Second gives the exact action and the system's reciprocal promise ("we'll match it"). No greeting, no sign-off, no "Hi!". For an SMS that interrupts someone mid-day about a $21 coffee, this is close to optimal length.

**Card-lock notification schedule** `[documented]`:

- 24 hours before a lock: an email warning that the card will be locked
- At time of lock: an email confirming the card has been locked, with a link to resolve violations

The **warn-then-confirm pair with a 24-hour gap** is the reusable structure. The second email is not merely a notification — it carries the recovery link, so the message that delivers the bad news also delivers the fix.

**Other documented notifications**: notification of change (NOC) — a rail-level event surfaced to the user with its own explainer article; confirmation email on stop-payment creation; unauthorized-ACH-debit alerts; `Real-time notifications` positioned as a product benefit.

**Notification governance** `[documented]`: "To adjust notification preferences, go to **Settings > Notifications**" — the preference path is given inline in the article that describes the notification, which is the right place for it.

**In-page banner** `[observed]`: a site-wide announcement bar — "Introducing Mercury Books, AI-powered accounting software, built into Mercury" — and on Ramp-style promo, "Get Mercury Personal free with any business plan. $240/year, covered."

## T10 Disclosures, legal & compliance — PRIORITY

### The footnote-marker architecture `[observed]`

Mercury's defining compliance-UX decision: **disclosures are anchored to individual words, and the same anchor is reused site-wide.** Named markers observed include:

`#footnote-business-not-a-bank-2026` · `#footnote-business-treasury-rate-of-return-and-condensed-ria` · `#footnote-mercury-venture-debt` · `#footnote-business-io-cashback` · `#footnote-rtp` · `#footnote-business-cards-sans-evolve` · `#footnote-business-fdic-sans-evolve` · `#footnote-business-1-in-3-startups-use-mercury` · `#footnote-business-relationship-manager-disclaimer` · `#footnote-personal-apy` · `#footnote-personal-business-subscription-offer` · `#footnote-paid-subscribers` · `#footnote-business-safety-security-97-deposits-fdic-insured`

All resolve to a single page-foot block headed `Disclaimers and footnotes`. The marker names are semantic and versioned (`-2026`, `-sans-evolve`), which tells you these are managed as a content inventory with lifecycle, not written per page. `-sans-evolve` in particular indicates a disclosure variant maintained for the period after a named sponsor bank was removed.

**Every claim that could mislead carries one.** `banking` carries the not-a-bank marker even inside a testimonial quote. `3.91% yield` carries the Treasury/RIA marker. `1 in 3 startups` carries a substantiation marker. `1.5% cashback` carries a card marker.

### The standing disclosure, quoted verbatim `[observed]`

The same block appears at the foot of every marketing page and inside the hero of several:

> "Mercury is a fintech company, not an FDIC-insured bank. Banking services provided through Choice Financial Group and Column N.A., Members FDIC. Deposit insurance covers the failure of an insured bank."

Three sentences, three jobs: **negate the wrong model, name the real counterparties, bound what the insurance actually does.** The third sentence is the one most products omit — "Deposit insurance covers the failure of an insured bank" quietly tells the user that FDIC coverage protects against bank failure specifically, not against Mercury's own failure or against fraud. It is one clause doing a large amount of expectation-setting.

`not an FDIC-insured bank` is a hyperlink to an explainer, so the negation itself is the entry point to the education.

### Funds-protection framing `[observed]`

Section header: `Standard protection stops short. Mercury goes further.` Then three claims, each with a footnote:

- `20x the usual coverage` — up to $5M FDIC insurance through partner banks' sweep networks
- `97%+ of deposits are FDIC-insured` — "Our customers' checking and savings deposits are almost completely insured"
- `Profitable since June 2022` — "We're focused on sustainable growth"

Sub-headers under `How we keep your funds safe` are declarative sentences, not labels: `Your deposits are held in your name` · `Never lose sight of your funds' protection` · `Diversified by design`.

`Your deposits are held in your name` does the heavy lifting: the body explains the demand deposit account (DDA) structure and contrasts it with FBO accounts, with the phrase "no middleware in between". Mercury is using a **structural-difference argument as a trust claim**, and links to a blog post comparing DDA vs FBO. For a fintech in a post-Synapse market, naming the account structure is the disclosure that matters, and Mercury elevates it above the security features.

### Fee disclosure `[observed]`

Pricing plans: `Mercury` ($0/mo) · `Mercury Plus` ($29.90/mo) · `Mercury Pro` ($299/mo), with `Annual Pricing (15% off)` toggle. Mercury Books listed as `$35/mo, waived until Dec 31, 2026` — **the waiver end-date is stated, not hidden**.

Treasury gating is disclosed as an asterisked line right in the jump-nav: `*Treasury is unlocked with $250K Mercury balance`. The eligibility bar appears in the navigation, before the user invests reading time.

Fees named in the pricing FAQ, plainly: 1% conversion fee on non-USD international wires; international transaction fee on non-USD card transactions; `$1/transaction` ACH debit invoicing on Plus, `$0/transaction` on Pro; Stripe's card processing "typically 2.9% + $0.30"; `$.65 per IRS filing. Free state filing.`

**The SHA/OUR wire disclosure is the best fee explanation on the site** `[observed]`: free USD international wires come in two forms — SHA (standard, free, "may result in intermediary bank fees that are absorbed by your recipient") and OUR (`$15` flat, "any intermediary fees will be charged back to Mercury, making it more likely your recipient will receive the full amount"). Mercury names the SWIFT charge codes, explains who bears the cost under each, and prices the option — and crucially hedges the benefit ("more likely", not "guaranteed"). A separate help article exists: `Covering recipient fees for USD international wires`.

**"How does Mercury make money?" is a published FAQ.** The answer enumerates interest on deposits, FX processing, Treasury and Venture Debt fees, foreign-currency card transactions, interchange (with the mechanism explained — "Visa and Mastercard charge a fee to the merchants — we receive a percentage of this fee, known as interchange"), and subscriptions. Publishing your own revenue model as a user-facing FAQ, with the interchange mechanism glossed, is a strong transparency move.

Third-party cost is disclaimed separately: "if you're sending to or receiving these from an account at another provider, that provider may charge its own fees."

### Investment-product disclosure `[observed]`

Treasury and Invest are kept structurally and legally distinct from banking. The security FAQ states that Treasury accounts are held in the customer's name at **Apex Clearing Corp**, "a FINRA-regulated broker-dealer", regulated by the SEC and FINRA, that "is prohibited from using any of these funds or securities for its own purposes — or from commingling them with its own customers' holdings", and must publish financial statements.

SIPC is described with its actual scope: it "applies in the event that assets are lost or missing from a customer's accounts during the time a financially-troubled or failed brokerage firm is being unwound", protecting `$500,000 worth of securities and cash, with maximum protection for cash of $250,000 and $250,000 in investments`. **SIPC's trigger condition is stated, not just its number** — a common omission elsewhere.

The bankruptcy scenario is named explicitly as a bulleted pair: assets remain transferable in the event of "Mercury bankruptcy, financial instability, sale or acquisition" or "Apex bankruptcy, financial instability, sale or acquisition". Closing line: "Regardless of what happens to Mercury, any funds and securities held at Apex will remain safe and accessible." Writing your own insolvency into the help centre is rare and, for a business-banking product, correct.

Fund-level risk is disclosed by prospectus link, with each fund's holdings summarised (T-bills, agency debt, repos; commercial paper and CDs) and a rating reference ("highest Fitch rating for underlying credit quality and very low sensitivity to market risk"). Legal page footer: "Mercury Treasury is offered by Mercury Advisory, LLC, an SEC-registered investment adviser", with Form ADV and a Customer Relationship Summary (Form CRS) linked as PDFs.

### Regulatory self-description `[observed]`

The FAQ `Is Mercury regulated?` answers by naming obligations rather than a licence: KYC, KYB, AML, and OFAC sanctions, then states that partners "are subject to rules and regulations specific to their business type." Honest about the split-responsibility model without overclaiming.

### Legal document taxonomy `[observed]`

The legal index is organised **by product line, not by document type**: *Mercury Terms* · *Business Banking* · *Personal Banking* · *Mercury IO* · *Treasury* · *Mercury Invest* · *Accounting* · *Referrals* · *Disclosures*. Each sponsor bank gets its own row (`Choice Financial Group Policies & Agreements`, `Column N.A. ...`, `Evolve Bank & Trust ...`), and Business and Personal each get separate Choice and Column entries — so a user can find the agreements that govern *their* account rather than reading a merged document. `Subpoena & law enforcement requests` is given its own card at page foot.

Named documents include `Mercury USA PATRIOT Act Disclosure`, `Mercury SMS Disclosure`, `Mercury Electronic Communications Agreement`, `Mercury ACH Debit Authorization`, `Mercury Auto-Transfers to External Accounts Authorization`.

## T11 Help-centre architecture `[observed]`

Two levels: 18 sections → article lists. No sub-sections, no scope lines, no article-count badges.

**Search-first layout.** The page headline is `How can we help?` with a search box directly under it, then `Suggested articles` (eight, editorially chosen), then `Sections`. The eight suggested articles are a good read on assumed first-week tasks: `Gathering your documents` · `Updating your company's legal address` · `Understanding roles and permissions` · `Using your Mercury debit card at ATMs` · `Qualifying for IO` · `Linking external bank accounts` · `Downloading monthly statements` · `Setting up 2FA and accessing 2FA codes`.

Five of the eight are gerund-led, one is a gerund of eligibility (`Qualifying for IO`), one is `Understanding ...`. `Understanding` is a recurring title verb across the centre — `Understanding roles and permissions`, `Understanding check review`, `Understanding two-factor authentication (2FA) at Mercury`, `Understanding sweep programs`, `Understanding compromised passwords and how we keep Mercury accounts secure`. Mercury uses `Understanding X` where Wise would use `What is X?`. It is a **conceptual-explainer marker** that distinguishes background reading from task articles at a glance.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| Gerund + object (task) | `Sending international payments`, `Freezing or canceling a card` |
| `Understanding` + concept | `Understanding sweep programs` |
| Noun + `overview` | `Sending money overview`, `Reimbursements overview`, `Bill Pay overview`, `Checkbooks overview` |
| `Why …?` (rare) | `Why did I get a notification of change (NOC)?` |

The `X overview` suffix is a consistent entry-point marker — every major section has one and it is always listed first.

Two titles use a **colon to add a scope qualifier**: `Budgets: Setting up team spend`, `Filing a Mercury Business card dispute: Eligibility and steps`, `Team spend: "Mercury Gift" promotion terms`. The colon carries the disambiguation that the noun alone would lose.

**Contact routing at article foot** `[observed]` — headed `Get in touch`, with "We're here to help. Message us anytime." and then a **two-branch split by account status**:

- `Have an account?` → "For fastest support, please log in." → `Message Support`
- `New to Mercury?` → "Send us a question, comment, or poem." → `Contact Us`

The auth-state split is good routing. `Send us a question, comment, or poem` is the one joke in the entire help centre, and it is placed on the lowest-stakes path (prospect, not customer). Register discipline: the joke is nowhere near a failed payment.

**Feedback widget**: `Did you find this article helpful?` / `Yes` / `No` / `Thanks for the feedback!`

## T12 FAQs

### Pricing FAQ `[observed]` — 15 questions, block headed `Pricing FAQ`, placed below plan cards and the comparison matrix

| # | Question (verbatim) |
|---|---|
| 1 | What does it cost to use Mercury for businesses? |
| 2 | How does Mercury make money? |
| 3 | How do you price currency exchange? |
| 4 | Are ACH and domestic wires really free? |
| 5 | Are real-time payments really free? |
| 6 | Does Mercury offer checks/checkbooks? |
| 7 | Is wiring USD internationally really free? |
| 8 | What does it cost to use Mercury debit or IO credit cards? |
| 9 | What does it cost to use Mercury Invoicing? |
| 10 | What does Mercury Bill Pay cost? |
| 11 | What is the difference between using Mercury Bill Pay and sending a payment from your Mercury account? |
| 12 | What does it cost to use Mercury's accounting automations? |
| 13 | Is there a minimum balance requirement for Mercury Treasury? |
| 14 | What does it cost to use Mercury for personal use? |

**The `really` cluster is the structural signal.** Three consecutive questions (4, 5, 7) contain the word `really` — `Are ACH and domestic wires really free?`, `Are real-time payments really free?`, `Is wiring USD internationally really free?`. Mercury is writing the **user's disbelief into the question** rather than asserting the claim again. Each answer opens `Yes —` and then immediately adds the exception (other providers may charge; intermediary fees under SHA). This is the reusable move: when a claim strains credulity, put the credulity strain in the question and let the answer carry the caveat.

Q2 (`How does Mercury make money?`) is a transparency question inside a *pricing* FAQ — it pre-empts "what's the catch" as a structural companion to the `really` questions. Q11 is the only non-cost question in the set: a product-boundary question about two overlapping ways to do the same thing, which is exactly where a user would get stuck.

Ordering: overall cost → business model → FX → rail-by-rail free claims → product-by-product cost → eligibility gate → personal.

### Security FAQ `[observed]` — eight questions, block headed `You have questions. We have answers.`

| # | Question (verbatim) |
|---|---|
| 1 | Where are my funds kept and how are my deposits FDIC-insured? |
| 2 | What is a sweep network? |
| 3 | Is Mercury regulated? |
| 4 | Is my Mercury Treasury account held in my name? |
| 5 | How are my funds in Treasury secured? |
| 6 | What is SOC 2 Type II compliance and what does that mean for Mercury? |
| 7 | Is it secure to use Mercury? |
| 8 | I found a security issue with the site. Who should I talk to about this? |

Q1 is compound (where + how insured) in the Wise manner. Q4 and Q5 use **first-person possessive** (`my Mercury Treasury account`, `my funds`) where the pricing FAQ uses second person or none — the register shifts to ownership language precisely where the anxiety is about ownership. Q6 is a two-part question that pairs the definition with the so-what, which is the right shape for a certification the user has heard of but cannot evaluate. Q8 is written in the **first person as a statement plus question** and is the only entry addressed to a security researcher rather than a customer — a mixed-audience FAQ, honestly placed last.

Answer structure is consistent: direct answer first, then bulleted mechanism, then a link out to a fuller artefact (prospectus, blog post, legal page).

## T13 Terminology & glossary

| Term | Mercury's usage | The alternative it rejected |
|---|---|---|
| `IO` | The credit card product name; `IO credit card`, `IO charge card`, `Qualifying for IO` | "Mercury Credit Card" |
| `Mercury Treasury` / `Mercury Invest` | Two distinct named investment products, separately papered | "Investments" as one bucket |
| `Vault` | Named surface showing FDIC coverage; `Treasury & Vault` as a help section | "Coverage dashboard" |
| `Command` | Natural-language action product | "Assistant", "AI" |
| `Insights` | Analytics surface | "Reports", "Analytics" |
| `Books` | AI accounting product (`Mercury Books`) | "Bookkeeping" |
| `Meridian` | Editorial/content brand, listed above `Blog` in the footer | |
| `Move Money` | In-product parent menu; marketing says `Send Money` | "Transfer", "Payments" |
| `Team Spend` | In-product parent for policies and budgets | "Expense management" (used only on marketing) |
| `Budgets` | The spend-control primitive — a budget, not a card limit | "Spend limits" (used for the card-level control) |
| `spend policies` / `policy violation` | The compliance vocabulary inside expense management | "rules", "exceptions" |
| `automatic card locking` | The enforcement mechanism, named as a feature | "suspension", "freeze" |
| `Freezing` vs `Locking` | **Two distinct concepts**: `Freezing or canceling a card` is user-initiated; `automatic card locking` is policy-initiated | |
| `check review` | Named feature for reviewing deposited physical checks | "check fraud screening" |
| `sweep network` | Regulatory concept retained and given its own FAQ and help article | "deposit distribution" |
| `demand deposit account (DDA)` | Named, abbreviated, and contrasted with FBO structures | "your account" |
| `safeguarded` | **Not used** — Mercury says "held in your name" instead | |
| `recipient` | Consistent for payees | "beneficiary" (appears only inside wire-tracking prose, where the bank term is correct) |
| `SHA` / `OUR` | SWIFT charge codes exposed to the user and explained | hiding the option |
| `trace ID` / `IMAD` / `OMAD` / `MT103` / `pacs.008` | Rail identifiers taught to the user | "reference number" |
| `notification of change (NOC)` | ACH network term surfaced with its own explainer | suppressing it |
| `agent cards` | Cards issued to AI agents; "Issue dedicated agent cards for approved transactions" | |
| `real-time payments (RTP)` | Always expanded on first use, then abbreviated | "instant transfer" |

**Register split:** marketing says `Send Money`, `expense management`, `spend controls`; the product says `Move Money`, `Team Spend`, `spend policies`. As with Wise, the in-task surface uses the shorter, more system-shaped term.

**Coined-term density is high and mostly one-word** (`IO`, `Vault`, `Command`, `Insights`, `Books`, `Meridian`). None of them are self-describing, which is a real cost: `Qualifying for IO` is an unparseable help-article title for a new user. The footnote system partly compensates by binding each product name to a disclosure, but not to a definition.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first person plural for the company, throughout — including in adverse copy ("we'll match it", "we'll block processing", "our team can take a closer look", "We're not aware of any issues"). Mercury never hides behind the passive when it is the actor. The one systematic passive is in violation copy ("requires a receipt", "your transaction ... requires"), where removing the actor removes the blame — a defensible choice.

**Register gradient.** The gradient is steep and well-managed:

- *Marketing*: aphoristic, sound-playing, occasionally grandiose — `Radically different banking`, `Banking's been a headache. Now, it's a head start.`, "the most ambitious entrepreneurs on the planet", "Banking – redesigned from the ground up."
- *Product / simulated UI*: terse, specific, transaction-anchored — `Resolve these to unlock your card`, `Don't have it`
- *Help*: administrative, hedged, numerate — "These timelines are general estimates"
- *Disclosure*: flat, three-clause, no adjectives — "Mercury is a fintech company, not an FDIC-insured bank."

No exclamation marks observed on any surface. No `Oops!`. One joke, correctly located (see T11).

**Reading level rises with stakes**, which is the inverse of the usual advice and here is arguably right: the audience is founders and finance staff, and the wire-tracking article's willingness to say `MT103 or pacs.008` respects that. The risk is the onboarding surface, where `IO` and `Vault` assume knowledge a first-week user does not have.

**Sentence-level habits**: em-dash used for the mechanism clause ("This gives cardholders a clear deadline to resolve issues — like adding a receipt or transaction category — before losing access to their card"). Contractions used freely. Numbers almost always specific rather than rounded (`$29.90`, `3.91%`, `97%+`, `$.65`, `$5M`).

**Accessibility content** `[observed]`

- `Skip to main content` present and first in DOM on help-centre pages. **Not observed on the marketing site**, where the first focusable element is the announcement-bar link.
- Alt text on the marketing site is unusually long and **explains the illustration's meaning, not just its content**:
  - "Illustration of a bar graph demonstrating how much more FDIC coverage Mercury offers compared to traditional banks."
  - "Illustration of three toggle switches, symbolizing controls for permissions, approvals, and access to funds."
  - "Abstract illustration depicting multiple points converging into a single focal point, suggesting simplicity and streamlined finances."
  - "Abstract illustration with three dots at the center, suggesting conversation, guidance, and support."
  - "fingerprint, representing passkey authentication"
  - Logo alt is fully descriptive: "The logo for Mercury, featuring a circular emblem with abstract, interconnected swirling lines on the left, and the word MERCURY in clean, uppercase letters to the right."
  
  The `X, suggesting Y` / `X, symbolizing Y` construction is a defensible house pattern for abstract art — it gives the screen-reader user the same interpretive cue a sighted user gets from the composition. Whether these illustrations warrant alt text at all (several are decorative accompaniments to a heading that already states the point) is arguable; erring long is the less harmful error.
- Testimonial images carry alt that **summarises the adjacent quote** — "Portrait of a man sitting indoors next to a testimonial about Mercury's speed and ease of use." This duplicates content that follows in text. Minor redundancy.
- Several images render with **empty alt and no filename** in the extracted markup (`![]()`), including feature illustrations in the homepage "Get started fast" and "Stop losing money to fees" blocks and most of the spend-management screenshots. If these are decorative, correct; if they are the product screenshots they appear to be, the simulated-UI content is unavailable to screen-reader users. **Flagged as suspected, not confirmed** — extraction may have dropped attributes.
- `Opens in new tab` is appended to link text for external destinations (e.g. `SWIFT network`, `HSTS`, `security@mercury.com`) — an explicit, visible new-window warning rather than an icon.
- **No accessibility statement or VPAT was found** on the marketing site, help centre, legal index, or footer. `[absent]` — notable given the presence of a `Trust center`, a security page, and a published SOC 2 posture.

**Negative findings, recorded honestly**

- `Launch demo` (hero) vs `Explore demo` (page foot) — two labels, one destination, one page.
- `Dashboard` and `Log in` adjacent in nav for overlapping intents.
- The marketing `Send Money` vs product `Move Money > Send` split will cost support deflection.
- Opt-out consent copy is a double negative paired with a checkbox labelled `Opt out`.
- `Bill Pay` is a top-level help section containing a single article.
- Help-centre category grammar is inconsistent across five different shapes with no scope lines.
- The pricing comparison matrix renders as a table of category names with empty cells in server HTML; the actual feature-by-plan content is accordion-gated. A user with JavaScript disabled, or a crawler, sees plan names and nothing else.
- Coined product names (`IO`, `Vault`, `Command`, `Books`) appear in help-article titles without gloss.

---

## Transferable patterns

1. **Bind the disclaimer to the word, not the page.** Mercury's `#footnote-business-not-a-bank-2026` fires on every instance of `banking`, including inside customer testimonials. Managing disclosures as a named, versioned, reusable inventory keyed to vocabulary — rather than as per-page legal blocks — is the strongest operational idea here. Directly applicable to any PayPal surface where a product noun carries a conditional claim.
2. **Bound what the protection actually does.** "Deposit insurance covers the failure of an insured bank" is one clause that prevents a whole class of wrong expectation. For any protection or guarantee claim, add the sentence that names its trigger condition, not just its ceiling. Same move in the SIPC copy ("applies in the event that assets are lost or missing ... during the time a ... failed brokerage firm is being unwound").
3. **Write the exit condition as the heading of a blocked state.** `Resolve these to unlock your card`, followed by verb-plus-exact-transaction line items (`Upload receipt — $80.26 at C Town Supermarkets on June 15`). Never make the user match a blocking rule to the charge that triggered it. Transfers to any compliance hold, limitation, or verification gate.
4. **Differentiate the destructive action by role.** An approver sees `Decline`; the requester sees `Cancel Request`. Same outcome, two labels, chosen by relationship to the object. Cheap to implement, materially clearer in multi-party approval flows.
5. **Put the user's disbelief in the question.** `Are ACH and domestic wires really free?` outperforms `ACH and wire fees` because it names the suspicion the headline created. Answer `Yes —` then attach the exception in the same breath. Condition: only works where the answer really is yes; using `really` on a qualified claim reads as evasion.
6. **Publish your revenue model.** `How does Mercury make money?` inside a pricing FAQ, with interchange explained as a mechanism, converts a suspicion into a disclosure. Transfers wherever a free tier invites "what's the catch".
7. **Warn, then confirm-with-fix.** The 24-hours-before email warns; the at-lock email confirms *and carries the resolution link*. The message delivering the bad news must also deliver the remedy.
8. **Name the account structure, not just the security features.** "Your deposits are held in your name ... with no middleware in between" is a stronger trust claim to a post-Synapse business audience than encryption or SOC 2, and Mercury ranks it above both.
9. **Hedge the status page.** "We're not aware of any issues affecting our systems" concedes the epistemics of monitoring. More defensible than "all systems operational" and no less reassuring.

## Caveats & gaps

- **All in-product status vocabulary is `[documented]`, not observed.** `Pending`, `Needs approval`, `Scheduled`, `Locked`, `Needs review`, `Active`, `Invite skipped` are drawn from help-article bodies or from simulated UI rendered on marketing pages. The simulated UI on `/spend-management` is designed artwork, not a screenshot of live product — strings from it are marked `[observed, simulated UI]` and should be treated as *intended* copy, which may or may not match shipped copy.
- **Error-message strings are entirely absent.** Mercury exposes a per-transaction "failure reason" but the reason vocabulary is behind auth. An authenticated pass would be needed.
- **Empty states: nothing found.** `[absent]`
- **Pricing comparison matrix not captured** — accordion-gated, cells not in server HTML. Plan-level feature naming is therefore incomplete; only the three plan summaries and the jump-nav category names were retrievable.
- **No accessibility statement found.** Looked on the marketing footer, legal index, help centre, and trust centre link. Marked `[absent]` rather than assumed missing — `trust.mercury.com` was not fetched and may host one.
- **Only US surfaces.** Mercury's published market is US; no locale variants were sought.
- **Mobile app copy not harvested** beyond the mobile navigation paths quoted in help articles (`⇄ icon`, `🏠 icon`, `Tasks`).
- **Personal banking surfaces unharvested** — `/personal-banking`, and the Personal help tree, were not opened. The breadcrumb `Mercury > Business > Send Money` implies a parallel Personal help tree that was not inspected.
- **Legal document bodies not opened** — only the legal index taxonomy was captured. The Terms, the IO Charge Card Agreement, and the sponsor-bank agreements were not read.
- Alt-text findings are drawn from extracted markup; several `![]()` occurrences may be an artefact of extraction rather than genuinely empty alt attributes.

## Sources

1. https://mercury.com/
2. https://mercury.com/pricing
3. https://mercury.com/spend-management
4. https://mercury.com/security
5. https://mercury.com/legal
6. https://status.mercury.com
7. https://support.mercury.com/hc/en-us
8. https://support.mercury.com/hc/en-us/sections/28736357757716-Send-Money
9. https://support.mercury.com/hc/en-us/sections/31052662843028-Expense-Management
10. https://support.mercury.com/hc/en-us/sections/28737293858836-Security
11. https://support.mercury.com/hc/en-us/sections/28737146093460-Bill-Pay
12. https://support.mercury.com/hc/en-us/articles/28773186865684-Processing-times-for-payments
13. https://support.mercury.com/hc/en-us/articles/28772488555668-Sending-money-overview
14. https://support.mercury.com/hc/en-us/articles/28775812171668-Canceling-a-payment
15. https://support.mercury.com/hc/en-us/articles/28768209374356-Tracking-missing-payments
16. https://support.mercury.com/hc/en-us/articles/51679267799060-Enforcing-spend-policies-with-automatic-card-locking
17. https://support.mercury.com/hc/en-us/articles/29625685367444-Reviewing-reimbursements
