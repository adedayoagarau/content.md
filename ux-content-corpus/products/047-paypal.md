# 047. PayPal

> Harvested on the same terms as every other product in this corpus. Defects are
> recorded as readily as strengths. This file is being built by a PayPal content
> designer; a flattering PayPal entry would be worthless to them.

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Digital wallet / online payments + consumer BNPL + dispute-resolution platform |
| Primary URL | https://www.paypal.com/ |
| Corpus rank | 047 |
| Benchmark strength (source list) | Transaction status, recovery, disclosures |
| Locale / market observed | en-US (`/us/` path throughout) |
| Platform observed | Web (marketing), web help centre, legal hub, fee pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Not a bank.** Verbatim: "PayPal is a financial technology company, not a bank, and is not FDIC-insured." PayPal Savings is held at **Synchrony Bank, Member FDIC**; the PayPal Debit Mastercard is issued by **The Bancorp Bank, N.A.**; PayPal Cashback Mastercard and PayPal Credit Card issued by **Synchrony Bank**. Pay in 4 lender is **PayPal, Inc. (NMLS# 910457)**, with a CA Financing Law License and RI Small Loan Lender Licensee; NM-specific disclosures; not available in MO. Pay Monthly lender is **WebBank**, serviced by **Bill Me Later, Inc. (NMLS#2296861)**, RI Loan Broker and VT Loan Solicitation licensee, not available in AK/CT/HI/WA. Crypto via **PayPal Digital, Inc.** and **Paxos Trust Company**. Consumer fee page carries a "Last Updated" date and a Policy Updates page. |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — help-centre **topic** pages are client-rendered and return only the topic sidebar, so per-topic article inventories are unavailable. Articles themselves are server-rendered. PayPal Balance product page returned empty. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (consumer) | https://www.paypal.com/us/home | Hero, three-pillar structure, dense footnote stack |
| Shopping & Rewards | https://www.paypal.com/us/digital-wallet/ways-to-pay | Product carousel, FAQ block |
| Security | https://www.paypal.com/us/digital-wallet/security-and-protection | Benefit blocks, FAQ |
| Security Center | https://www.paypal.com/us/security | Emergency-first routing |
| Consumer fees | https://www.paypal.com/us/digital-wallet/paypal-consumer-fees | Full fee schedule, dated, with printable PDF |
| Purchase Protection (legal) | https://www.paypal.com/us/legalhub/paypal/buyer-protection | Claim types, five-step process, timeframes |
| Accessibility | https://www.paypal.com/us/accessibility | Statement |
| Help Center home | https://www.paypal.com/us/cshelp/personal | Recommended articles, six help routes |
| Browse all topics | https://www.paypal.com/us/cshelp/browse-topics | Six top-level topics |
| Where is my refund? | https://www.paypal.com/us/cshelp/article/where-is-my-refund-help130 | Refund Tracker state model |
| Payment on hold | https://www.paypal.com/us/cshelp/article/why-is-my-payment-on-hold-or-unavailable-help126 | Hold causes |
| Dispute/claim status | https://www.paypal.com/us/cshelp/article/how-do-i-check-the-status-of-my-dispute-or-claim-help181 | Case states |
| Account limited | https://www.paypal.com/us/cshelp/article/why-is-my-paypal-account-limited-help534 | Limitation taxonomy |

---

## T1 Navigation & IA labels

**Help centre — six top-level topics, no scope lines** `[observed]`

`Payments and Transfers` · `Disputes and Limitations` · `My Account` · `My Wallet` · `Login & Security` · `Seller Tools`

Compare Wise (six topics, each with a verb-run scope sentence) and Venmo (ten topics, each with a scope line). PayPal ships **labels alone**. The user must infer the boundary between `My Account` and `My Wallet`, and between `My Wallet` and `Payments and Transfers`, with no help from the IA. The possessive prefix `My` appears on two of six and not the others, so even the naming convention is not internally consistent.

`Disputes and Limitations` is the notable pairing. Two very different user situations — *I have a problem with a seller* and *PayPal has restricted me* — are collapsed into one category because they share a back-end surface (the Resolution Center). This is **system-model IA, not user-model IA**: a user whose account has been limited is not looking for a category that starts with the word "Disputes". Contrast Wise's `Where is my money?`.

**"More ways to get help" — six destinations, repeated identically on every help page** `[observed]`

`Browse All Topics` · `Resolution Center` · `Tax Center` · `Message Center` · `Technical Help` · `Business Help`

Three of the six are `<Noun> Center`. `Resolution Center`, `Tax Center` and `Message Center` are all destination-named rather than task-named, and only one of them (`Tax Center`) is self-explanatory to a first-time user. `Message Center` in particular gives no clue that it is where PayPal's replies to you arrive.

**Article breadcrumb pattern** `[observed]`: every article carries its topic plus two audience chips, `Personal` and `Business`, and the literal strings `scroll left` / `scroll right` are exposed in the markup as text. Those two strings appear on every article page in the rendered output — scroll affordances leaking as readable content.

**Homepage structure — three lowercase verb pillars** `[observed]`: `pay smarter`, `send smarter`, `save smarter`, each set lowercase as a design element and each introducing a product block. The parallel construction is clean; the lowercase styling means screen readers and search snippets receive them without the visual emphasis that makes them work.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `Pay, send, and save smarter`

Three verbs and an adverb. No number, no differentiator, no claim that could be falsified. Compare Wise (`International money transfers` + a bolded 0.1% fee) and Chime (`America's #1 Choice for Banking` + three specific benefit lines). PayPal's hero asserts nothing checkable. It is the least informative hero in this five-product batch, and that is a defensible choice for a brand with universal recognition — but it means the hero does zero disclosure work and zero differentiation work.

**Section headers are benefit claims with footnote markers** `[observed]`

- `Earn as you shop` — "Pay how you want, and pay where you want. And earn rewards while you're at it. With PayPal, there's a plus side to your purchases."
- `Pay now or pay over time.` / `It's your choice.`
- `Safety and privacy are our priority`
- `Send money to just about anyone, anywhere8`
- `Make your money work harder. It's easy. Really easy.`
- `Crypto the easy way` — "Crypto curious?"
- `Pay with peace of mind`
- `All in the PayPal app` — "It's your do-it-all digital wallet."

`It's easy. Really easy.` is the register problem in miniature. The repetition-as-emphasis device ("Really easy") appears immediately above a savings product with a variable APY, a partner-bank structure, and a not-FDIC-insured disclosure. The tone does not flatten as the stakes rise — it stays cheerful straight into the footnote.

`Send money to just about anyone, anywhere8` is better practice: **the hedge is inside the headline** ("just about") rather than deferred to the footnote, and the footnote number is still there for the account requirement.

**The "smarter" tic.** `Pay, send, and save smarter` · `pay smarter` · `send smarter` · `save smarter` · `Sign in the smart way with passkey` · "the smarter way to bank" (Chime's line, not PayPal's). Five uses of smart/smarter on the consumer homepage alone. It is the load-bearing adjective and it carries no information.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign Up` | Homepage, security page | |
| `Get the App` / `Get the app` | Homepage ×3, ways-to-pay ×2 | **Two different capitalisations of the same CTA on the same page** |
| `Browse Offers` | Homepage rewards | |
| `Get the Debit Card` | Homepage | Title-case |
| `Learn About the Debit Card` | Ways to pay | Title-case, different verb for the same product |
| `Learn About the Credit Card` | Ways to pay | |
| `Apply for the Credit Card` | Homepage | Third label pointing at credit products |
| `Learn About Pay in 4` | Homepage, ways to pay | |
| `Learn About Pay Monthly` | Homepage | |
| `Learn About Pay Monthly In Store` | Homepage | |
| `Explore Credit Options` | Ways to pay | |
| `Learn More` | Homepage, PayPal Credit block | **Bare `Learn More`, no object** |
| `Add Cards and Banks` | Ways to pay | |
| `Add a Payment Method` | Security page | Same action, different label |
| `Check Out the Offers` | Ways to pay | |
| `See How You're Safe` | Homepage | Second person, unusual and good |
| `Learn About PayPal Security` | Ways to pay | Same destination as above, different label |
| `About Purchase Protection` | Security page | Preposition-led, no verb |
| `Start Saving` | Homepage | Task-named |
| `Explore Crypto` | Homepage | |
| `Send Money` / `Get Paid` / `Start a Pool` | Homepage send block | Clean verb-first triplet |
| `Send and Receive Cash` | Security page | "Cash" — inconsistent with "money" everywhere else |
| `Create a Passkey` | Security page | |
| `PayPal Security Center` | Security page | CTA text = destination name |
| `Report fraud` | Security Center | Lowercase, emergency-first |
| `Report suspicious messages` | Security Center | |
| `Get protection tips` | Security Center | |
| `Learn about your security` | Security Center | Possessive — "your security", not "our security" |
| `Contact us` | Security Center, accessibility | |
| `Know your options` | In-app, held payment | `[documented]` — see T7 |
| `View` | Resolution Center, escalated claim | `[documented]` |
| `Closed Cases` | Resolution Center | `[documented]` |
| `Filters` → `Refunds` | Activity log | `[documented]` |
| `Download printable PDF` | Fee page | Compliance artefact offered as a download |

**Observations.**

- **Capitalisation is not governed.** `Get the App` and `Get the app` appear on the same page. Title Case dominates marketing CTAs (`Learn About the Debit Card`), sentence case dominates the Security Center (`Report fraud`). Two different systems, two different surfaces, no bridge.
- **Three labels for the credit product** across two pages: `Apply for the Credit Card`, `Learn About the Credit Card`, `Learn More`. Wise's near-duplicate-label problem exists here too, at higher volume.
- **`See How You're Safe`** is the best CTA in the set — second person, present tense, answers the user's implicit question rather than naming a page.
- **`Know your options`** (in-app, appearing under a held balance) is the best in-product string recovered. It reframes a restriction screen as a decision point. It is also doing euphemism work — "options" here means "read why we are holding your money" — but it is a good euphemism.

## T4 Onboarding & getting-started

`[absent]` for a stepped onboarding narrative. PayPal's consumer marketing has **no "how it works" sequence** on the pages harvested — no numbered steps, no three-step model, no progress language. The homepage goes hero → product carousels → footnotes. A first-time visitor is never shown what using PayPal consists of.

This is a real gap relative to every other product in this batch: Venmo has `Send / Personalize / Control`, Wise has a three-step personalised narrative, Kuda has `Send / Spend / Save`, Chime has a six-benefit ladder. PayPal has product tiles.

What exists is **eligibility copy in footnotes** rather than onboarding copy `[observed]`:

- "An account with PayPal is required to send and receive money. A PayPal Balance account is required to hold and use a balance."
- "A PayPal Balance account is required to create a pool."
- "An account with PayPal is required to create a link. PayPal links must be created in the PayPal app."
- "You must be 18 years old or older to apply."

The distinction between "an account with PayPal" and "a PayPal Balance account" is load-bearing — it determines whether you can hold money — and it is introduced only in footnote 8, in the smallest type on the page. A two-tier account model is disclosed nowhere in the body copy.

## T5 Form & field labels

Pre-auth form surface is minimal. Recoverable `[documented]` labels from help articles:

| Label | Context | Source |
|---|---|---|
| `Know your options` | Link under the balance, on a held payment | help126 |
| `Activity` | The transaction log | help130 |
| `Filters` → `Refunds` | Activity filter with a named option | help130 |
| `Refund Tracker` | The named three-step tracker component | help130 |
| `Notifications Center` | Where limitation documents are uploaded | help534 |
| `Closed Cases` | Resolution Center tab | help181 |
| `Case ID` | Dispute identifier | help181 |
| `Completed` | Order-status value the seller sets | help126 |
| `For goods and services` / `For friends and family` | The payment-type selector — the single highest-consequence choice in the product | help126 |

**`For goods and services` vs `For friends and family`** is the most important pair of labels PayPal ships. It determines fee liability, protection eligibility, and hold behaviour. The help centre describes it as a thing the sender "selected", and the fee page explains it as a flow location — "initiated from the 'Friends and Family' tab of the 'Send Money' flow" — so the label is variously a tab, a payment type, and a radio option depending on which page you read. Three descriptions of one control.

## T6 Status & state language — PRIORITY

PayPal has the richest published state vocabulary in this batch, and the clearest example of a **named, documented, multi-step status component**.

### The Refund Tracker — a three-step tracker with six state names `[documented]`

Described explicitly as a component: "The **Refund Tracker** is a three-step tracker for your complete checkout transaction refunds funded by banks or cards (full-amount refunds that are not split between payment methods)."

| Step | State names | Gloss as published |
|---|---|---|
| First | `Refund Initiated` | PayPal has started the refund process |
| Second | `Refund Processing` | PayPal is processing it back to the card or bank |
| Second | `Refund Sent` | PayPal has completed its part and handed off to the issuer |
| Third | `Refund Pending` | Now with the card issuer or bank |
| Third | `Refund Completed` | Money should be with you |

**The strongest single piece of status writing in this file** is attached to `Refund Sent`:

> "Note: that the refund has not yet been completed as your card issuer or bank may also take time to process the refund."

This is the Wise "complete ≠ arrived" problem, solved **inline at the state rather than in a separate reconciling article**. PayPal names the state, then immediately tells the user that the state does not mean what it sounds like. And `Refund Completed` is hedged in the same way: "This is **typically** the last step… It means that you **should have** received the funds."

That hedging is correct and honest. It is also a symptom: PayPal needs five state names and two inline disclaimers to describe a refund because the refund genuinely crosses three parties. The content is doing good work on a bad underlying model.

### A second, separate refund-state list on the same page `[documented]`

Lower down, under the heading `Common refund statuses`, the same article lists a **different set of five states**:

`Pending` · `Temporary hold` · `Refunded or Partially Refunded` · `Completed` · `Canceled`

So one article publishes two overlapping state taxonomies. `Pending` here means "the seller has issued the refund, but the money hasn't cleared their bank" — which is not the same as `Refund Pending` in the tracker above ("now pending with your card issuer or bank"). **The same word means two different things in two sections of one article.** A user reading top to bottom is given two incompatible definitions of "pending" within about 600 words.

This is the defect to record most prominently in this file. It is exactly the class of problem PayPal is benchmarked for getting right.

Also note the spelling: `Canceled` (one L) in the status list, against `cancelled`/`Cancelling` conventions elsewhere in the corpus — internally consistent for US English, worth flagging only for localisation.

### Dispute and claim states `[documented]`

Two-phase model, named:

- **`dispute` phase** — "you can exchange messages with the other party to try to solve the problem"
- **`claim` phase** — reached by escalation; "click **View** to see the latest status"
- `open cases` / `Closed Cases` as the two list views
- "If we're already reviewing your claim, you'll see an **estimated resolution date**."

`estimated resolution date` is good — an absolute date rather than a duration, the Wise `by Tuesday` principle applied to a case. And "We'll let you know if we need anything from you" pre-empts the "should I be doing something?" anxiety that drives repeat contacts.

The legal hub adds `temporary refund` as a state with a consequence spelled out: if the dispute is not resolved in the user's favour "the refund amount may be recovered as amounts owed to PayPal, which means we may take actions, including but not limited to debiting your PayPal account accordingly." Then the mitigation: "You will receive at least **5 business days'** advance notice before any such deduction so that you have the opportunity to ensure sufficient funds are available."

Disclosing the notice period *and its purpose* ("so that you have the opportunity to ensure sufficient funds are available") is excellent. It converts a clawback clause into an actionable heads-up.

### Hold states `[documented]`

`on hold` and `unavailable` are treated as one condition in the article title (`Why is my payment on hold or unavailable?`) without ever distinguishing them. Two state words, one explanation. The holds themselves are named by cause rather than by state (see T7).

Related named concepts: `eCheck` — a payment type with its own clearing behaviour and its own article, surfaced inside the refund article as an exception.

### Timing language inventory `[observed]` / `[documented]`

`up to 1 and 2 billing cycles` (with a footnote defining a billing cycle as "28 to 31 days") · `up to 5 business days` · `up to 30 days` · `on the same day` · `7 days` · `at least 5 business days'` · `within 180 days` · `within 30 days` · `within 20 days` · `at least 7 days` · `Send in seconds`.

The billing-cycle footnote is a good instinct — PayPal does not assume the user knows what a billing cycle is, and defines it twice on the same page (once per asterisk). The definition is also honestly fuzzy: "The number of days in each cycle can change, but it should be roughly one month."

**Mixed formatting defect:** the same article writes `*` and `**` as footnote markers for what appears to be the same note, and renders one instance in italics and one not.

## T7 Error, failure & recovery — PRIORITY

### Holds — seven causes, bolded as user-facing statements `[documented]`

The `Why is my payment on hold or unavailable?` article lists causes as **second-person sentences in bold**, each with an explanation and, where possible, a remedy:

| Cause (verbatim, bolded in source) | Note |
|---|---|
| `You're a new seller with PayPal` | "it can take time to build up a positive reputation as a seller" |
| `You haven't sold in a while.` | "When your selling activity has been dormant for a long time…" |
| `Multiple customers reported problems or requested refunds.` | "We recommend working with your customers to solve any problems." |
| `Your selling pattern appears to have changed or seems unusual.` | Enumerates what "unusual" means — surge, business-type change, price change, item type |
| `You're selling higher-risk items.` | Names them: "event tickets, consumer electronics, travel packages, and gift cards" |
| `Your identity verification is not complete, or your video KYC call is still pending.` | |
| `You've received a payment for goods and services instead of payment for friends and family.` | With the exact release rule: "You should get your money **7 days** after confirming the order status as **Completed**." |

**Defining the vague term is the reusable move here.** Rather than leaving "unusual selling pattern" as an unfalsifiable accusation, PayPal enumerates four specific triggers. Same for "higher-risk items" — four named categories. A user can read this and self-diagnose, which is the entire point of a hold explanation.

The article's weakness is its opening: it requires login before it explains anything. "**Log in** to your account and click on **Know your options** under your PayPal balance to learn why we are holding your payment." The user arrives from search, in distress, and is immediately gated. The generic list follows, but the specific answer is behind auth.

Note also: this consumer-facing article is almost entirely about **selling**. Six of seven causes concern seller behaviour, on a page filed under a Personal-account help centre. The audience chips say `Personal` and `Business`, but the content is business content served to both.

### Account limitations — five named reasons `[documented]`

`Regulatory Requirements` · `Acceptable Use Policy` · `Unauthorized Use` · `Higher Risk Activity` · `Inactive Account`

Opens well: "If we've limited your account, we'll send you an email with the reason for the limitation." Then defines the state in plain terms: "A limited account means that you won't be able to do certain things with your PayPal account. For example, you might not be able to send or withdraw money."

`Regulatory Requirements` gives a concrete, non-obvious example: "requesting certain products, like a debit card, can trigger governmental laws." Telling a user that *asking for a product* caused the restriction is genuinely useful and counter-intuitive.

`Acceptable Use Policy` also names specifics: "selling banned items such as prescription drugs or guns."

`Inactive Account` is one sentence: "We may limit your account if you haven't used it much since you signed up." No remedy given for this case specifically.

Three lines deserve individual attention:

1. **"In most cases, our customer service team can't remove your limitation over the phone. Please wait for us to contact you."** — pre-empts the highest-volume, lowest-yield support contact, and is honest about the limits of phone support. Same instinct as Venmo's `Already contacted us?`.
2. **The phishing check built into a limitation article** — "If you received an email stating your account is limited, but don't see a limitation in the Resolution Center, you may have received a fake email." PayPal teaches the user to verify the notification against the app state. Excellent: the highest-anxiety moment is also the highest-risk phishing moment, and the article addresses both at once.
3. **The email address in that instruction is obfuscated to `[email protected]` in the rendered page** (a Cloudflare email-protection artefact). A user reading the article is told to forward the email to an address the page will not show them. That is a functional break in a fraud-reporting instruction, on a fraud-adjacent page.

The remedy ladder is thin: "log in and upload your Proof of Identity (such as a copy of your driver's license or state ID). You can upload this document in your **Notifications Center**." One route, one document type, no alternatives, and no timeline.

### Refund-not-received recovery `[documented]`

Handled by pushing the user outward with a tool: "please reach out to your card issuer or bank to check the progress of the refund using the **bank reference ID** or by referring to the original transaction." Giving the user a **reference ID to take to the third party** is materially better than "contact your bank" alone — it makes the handoff actionable.

Repeated three times on the page (credit card, debit card, checkout transactions), which is redundant but defensible.

Also handled: the canceled-card edge case — "We'll still send a refund to a canceled or prepaid card. Contact your card issuing company to access this money." A genuinely obscure situation, documented.

### Currency-conversion refund shortfall `[documented]`

> "If your payment involved a currency conversion, your refund may differ from the original payment amount. This is due to fluctuations in currency conversion rates."

Then the mechanism in two short sentences, then the conclusion restated: "For this reason, the refunded amount may not be the same as the original payment amount."

Claim → mechanism → restatement. The user gets the bad news, the reason, and the bad news again. This is correct structure for a disclosure the user will dispute.

### Dispute process — five numbered steps with consequences attached `[observed]`

From the legal hub:

1. **`Open a dispute`** — within the applicable timeframe; may open a direct conversation with the seller. "We will place a hold on all funds related to the transaction in the seller's PayPal account until the dispute is resolved or closed."
2. **`Escalate the dispute to a claim`** — within 20 days "or we will automatically close the dispute"
3. **`Respond to PayPal's requests for documentation or other information`**
4. **`Comply with PayPal's shipping requests in a timely manner`** — "PayPal may require you, **at your expense**, to ship the item back"
5. **`PayPal will make a final decision`** — "in its sole discretion"

Each step is a bolded imperative and each carries its failure consequence. Step 2's "or we will automatically close the dispute" is the single most important sentence for a buyer and it is stated plainly.

Two things are told to the user that most platforms bury:
- **Return shipping is not covered.** "PayPal's Purchase Protection program does not entitle you to coverage for the return shipping costs that you may incur." Stated in an `IMPORTANT:` block near the top, not at the bottom.
- **Card chargeback may be better than PayPal's own programme.** "Applicable card chargeback rights may be broader than those available to you under PayPal's Purchase Protection program. For example, if you dispute a transaction with your card issuer, you may be able to recover amounts you paid for unsatisfactory items even if they don't qualify for protection under a Significantly Not as Described claim with us."

PayPal telling users that a competing remedy may serve them better is the strongest disclosure decision in this file. It then states the exclusivity rule ("You can't do both at the same time or seek a double recovery"), the ordering rule (PayPal first, then card issuer — but not the reverse), and a **self-imposed penalty**: if PayPal's delay causes the user to miss the card issuer's deadline, "we will reimburse you for the remainder of your loss."

Committing in public to compensating the user for the company's own slowness is rare and genuinely benchmark-worthy.

### Appeal language `[observed]`

> "PayPal's original determination is considered final, but you may be able to file an appeal of the decision with PayPal if you have new or compelling information not available at the time of the original determination or you believe there was an error in the decision-making process."

Final-but-appealable, with the two grounds named. The construction is legally hedged ("may be able to") but the grounds are concrete and the user knows what to assemble.

## T8 Empty states

`[absent]` — all empty states sit behind authentication. The help-centre search is client-rendered and no no-results string was retrievable.

One near-miss `[observed]`: the help-centre home renders the literal string `You need to enable JavaScript to run this app.` as the first content in the page body. That is the true no-JS state of PayPal's help centre — a developer-default message shipped to users, on the page a user reaches when they need help. Recorded as a defect, not an empty state.

## T9 Notifications & system messages

`[observed]` / `[documented]`:

- `Notifications Center` and the "bell icon at the top of your Dashboard" are named as the destination for limitation actions
- Limitation notification is email-first: "we'll send you an email with the reason for the limitation"
- **Early fraud alerts** are a named, described product: "real-time early fraud alerts" — "We monitor tens of millions of merchant sites in our network to detect early signs of card fraud—often before a costly transaction occurs—and will immediately notify you if we suspect your card info may be compromised."
- Opt-in instruction with a rationale: "Use the PayPal app and enable push notifications to get real-time app notifications and review alert details right away."
- Alert scope is bounded twice, in footnotes 2 and 4 — "Early fraud alerts are limited to unusual activity detected in PayPal accounts and within PayPal's online merchant network. Early fraud alerts are **not yet eligible for PayPal branded cards**."

"not yet eligible for PayPal branded cards" is a notable admission: PayPal's own cards are excluded from PayPal's fraud-alert product. Disclosing that, twice, on the page that markets the feature, is honest. The phrasing "not yet" does some forward-looking softening.

**Cookie banner** `[observed]` — appears in the help-centre markup with three controls, `Accept` · `Decline` · `Close`, and the sentence "If you accept cookies, we'll use them to improve and customize your experience and enable our partners to show you personalized PayPal ads when you visit other sites." A genuine `Decline` at the same level as `Accept` is better than most consent UIs; the third option `Close` is ambiguous in effect and undermines it.

## T10 Disclosures, legal & compliance — PRIORITY

### Fee-page architecture `[observed]`

Anchor-linked table of contents with eleven sections: `Relevant Market/Region` · `Buying with PayPal` · `Selling with PayPal` · `Buying, Selling, and Transferring Cryptocurrencies` · `Receiving and Sending Donations` · `Sending and Receiving Money` · `PayPal Balance` · `Currency Conversions` · `Withdrawals Out of PayPal` · `Other Consumer Fees`.

Four structural strengths:

1. **`Last Updated: May 19, 2026`** stated in the body, plus a link to a `Policy Updates Page` and an instruction for finding it: "You can also get to the Policy Updates Page by clicking 'Legal' at the bottom of any webpage and then selecting 'Policy Updates'." Teaching the navigation path rather than only linking it is good practice for a page users return to.
2. **`Download printable PDF`** — the regulator/record-keeping artefact offered alongside the web view, the same dual-format instinct as Wise's "regulator's standardized format".
3. **Terms defined before they are used.** `Domestic` and `International` each get their own defined-term block at the top: "A transaction occurring when both the sender and receiver are registered with or identified by PayPal as residents of the same market." Then a `Market Code Table` and a `Grouping Table` for the edge cases.
4. **Jargon is introduced with a naming sentence.** "When you accept the User Agreement to buy or sell goods or services or make any other commercial type of transaction, **we call that a 'commercial transaction'**." Same construction for "donation" and for "personal transaction". The `we call that a X` pattern is used three times and is the cleanest terminology device on the page.

**Weaknesses of the same page:**

- It opens with a **Ukraine fee-waiver notice** as the first content block, ahead of any fee. A geopolitically specific, time-bound notice occupies the primary position on the US consumer fee page indefinitely.
- The `Selling with PayPal` section contains **no fees**. It defines "commercial transaction" then says "For the listings of selling rates, please visit our PayPal Merchant Fees Page." A section heading in a fee table that contains no figures is a dead end for anyone who arrived expecting one.
- `PayPal Balance` likewise contains no figures — one sentence and a link to a separate terms document. Two of eleven sections are redirects.
- **Fixed-fee tables are split across two rendered tables** alphabetically (Australian dollar–Mexican peso, then New Taiwan dollar–US dollar) with identical captions. A user scanning for USD must know to look at the second table.
- Number formatting is inconsistent within one table: `25,000.00 USD`, `5000.00 USD`, `15,000.00 USD` — the thousands separator appears, disappears, and reappears across three adjacent rows.
- Currency is written **postfix** throughout (`0.99 USD`, `4.99 USD`, `1.50 USD`) rather than `$0.99`. Internally consistent and correct for a multi-currency document, but it differs from the `$` prefix used on marketing pages, so the same amount is formatted two ways across the site.

**Fee-descriptor writing.** Conditions are attached inline rather than footnoted: `No Fee (when no currency conversion is involved)` appears as the *value* in five separate cells. Putting the condition inside the value cell means a user cannot read "No Fee" without reading the exception. That is a good, cheap pattern.

Minimum/maximum written out longhand: "A minimum international fee of 0.99 USD" / "A maximum international fee of 4.99 USD" rather than "(min $0.99/max $4.99)". More words, less parsing.

**Refundable-fee row** is a rare and good disclosure: the card confirmation fee row ends "This amount will be refunded when you successfully complete the credit card or debit card verification process." The fee is disclosed together with the condition of its own reversal.

**Bank-return fee is `No Fee`** and is still given a full row with a full description of when it would apply. Same instinct as Venmo's `$0.00` decline row — publishing the non-fee.

### Deposit-protection disclosure `[observed]`

Homepage footnote under the Savings block:

> "PayPal is a financial technology company, not a bank, and is not FDIC-insured. FDIC insurance protects against the failure of Synchrony Bank, Member FDIC, not the failure of PayPal. Any cryptocurrencies you hold in your PayPal account are not deposits, are not eligible for pass-through FDIC insurance and may lose value."

Correct structure — what PayPal is not, what the insurance covers, what is excluded. Repeated in the Debit Card footnote in a shortened form: "PayPal is a financial technology company, not a bank. The Card is linked to your PayPal Balance Account."

**Placement problem:** the body copy directly above says "It's free to set up, **FDIC insured** with and held at Synchrony Bank". The body asserts FDIC insurance; the footnote says PayPal is not FDIC-insured. Both are technically accurate (the *account* is insured at Synchrony; *PayPal* is not an insured institution) but the pairing requires the user to hold a distinction that the body copy does nothing to set up. And the body sentence contains a **grammatical error — "FDIC insured with and held at Synchrony Bank"** — a stray "with" in a deposit-protection claim on the consumer homepage.

### BNPL disclosure — and a live cross-page contradiction `[observed]`

**This is the most concrete defect found in the PayPal harvest.**

Homepage, footnote 4:
> "Pay in 4 is available to consumers upon approval for purchases of **$30 to $1,500**."

Shopping & Rewards page, footnote 7:
> "Pay in 4 is available to consumers upon approval for purchases of **$10 to $2,000**."

Two live PayPal.com consumer pages, harvested the same day, state different eligibility ranges for the same regulated credit product. Every other clause in the two footnotes is identical (MO exclusion, soft credit check, 18+, NMLS# 910457, CA Financing Law License, RI Small Loan Lender Licensee, NM disclosures). One of the two is stale. A user comparing the two pages cannot tell which.

Pay Monthly disclosure is, by contrast, exemplary: `Fixed APR is 9.99-35.99%` followed by **three fully worked repayment examples** at different amounts and terms, each giving monthly payment, total interest, and total of payments — e.g. a $600 purchase at 26% APR over 6 months as "$107.76/mo.; $46.57 interest; $646.57 total of payments". Then the variability caveat ("Payments may change based on shipping, taxes, updates to your purchase, or missed payments"), the state exclusions, the credit-impact warning ("Missed payments may have an impact on your credit score"), the lender (WebBank), the servicer, and the VT all-caps solicitation disclosure.

Working the arithmetic for the user at three price points is the right way to disclose an APR. It is also a striking contrast with Pay in 4 on the same page, whose own basic parameters disagree with themselves.

### Purchase Protection — claim taxonomy `[observed]`

Two named claim types, each with a parenthetical gloss at first use:

- "You didn't receive your item from a seller (referred to as an **'Item Not Received' claim**)"
- "You received an item, but the item isn't what you ordered (referred to as a **'Significantly Not as Described' claim**)"

The **plain-language description comes first and the term of art second**, in parentheses. That ordering is correct and is used consistently. The abbreviations INR/SNAD never appear in user-facing text.

A third category is explicitly pushed out of scope with a pointer: "If you believe that a transaction made through your PayPal account was not authorized by you, this type of claim is different from the Purchase Protection program, and is described below under **Liability for Unauthorized Transactions and Other Errors**."

**SNAD eligibility is written as two parallel bulleted lists**, `may be considered` and `may not be considered`, with near-mirrored examples:

| May be SNAD | May not be SNAD |
|---|---|
| "The condition of the item was misrepresented. For example, the item was described as 'new' but the item was used." | "The item has minor scratches and was described as 'used.'" |
| "The item is materially different from the seller's description of it." | "The defect in the item was correctly described by the seller in its description of it." |
| — | "The item was properly described but you didn't want it after you received it." |
| — | "The item was properly described but did not meet your expectations." |

The negative list is where the writing is best — "you didn't want it after you received it" and "did not meet your expectations" name the two real-world situations users most often try to claim under, in the user's own terms, without condescension. Setting the two lists side by side lets a user self-assess before filing.

The register is nevertheless **notably colder than Venmo's equivalent**. Compare PayPal's "The item is materially different from the seller's description of it" with Venmo's "You bought a book, but received a DVD". PayPal describes the item; Venmo describes the disappointment. Venmo's version is more findable, more memorable and more human — and it covers the same ground.

**Ineligible items** run to 20+ bullets including NFTs, gold "(whether in physical form or exchange-traded form)", crowdlending, bill-payment services, custom-made items for SNAD, and "Items intended for resale". The list is exhaustive and dull, which is appropriate.

**Timeframe table** is clean and comparative:

| Claim type | Timeframe |
|---|---|
| Item Not Received | 180 days from payment |
| Significantly Not as Described | 30 days from delivery **or** 180 days from payment, "whichever is sooner" |
| Unauthorized Transactions and Other Errors | Deferred to the user agreement |

`whichever is sooner` is the trap clause and it is stated, not hidden. The third row deferring to another document is a legitimate but user-hostile choice on a page a user reaches specifically to learn their deadline.

`Last updated on January 26, 2026` is stated on the legal page. Dating legal documents is not universal and is worth crediting.

**PayPal World exclusion** appears three times in the document — QR-code payments made in person via PayPal World are excluded. A new product's exclusion propagated consistently through an existing legal page is good compliance hygiene.

### Crypto disclosure `[observed]`

Spread named as a concept: "The exchange rate you'll see before buying or selling crypto will also include a cryptocurrency conversion spread." Tiered fee table (2.20% / 2.00% / 1.80% / 1.50%) with a stated exclusion ("The fees above do not apply to buying and selling PYUSD"). Network fee disclosed at the commit moment: "The network fee will be displayed to you right before you transfer any crypto."

The one-step buy-and-transfer fee explanation introduces a coined term — `combined cryptocurrency purchase amount` — defines it inline, then applies a two-part fee to it. Dense, but the definition precedes the use.

Risk statement is unhedged: "Buying and selling cryptocurrency is subject to a number of risks and may result in significant losses." And advice is disclaimed: "PayPal does not make any recommendations regarding buying or selling cryptocurrency. Consider seeking advice from your financial and tax advisor."

## T11 Help-centre architecture

Two-level and shallow: home → six topics → articles. Article URLs follow `/{market}/cshelp/article/{slug}-help{NNN}`.

**Topic pages return no article list** `[observed]`. `help_disputes_and_limitations_personal` rendered only the six-topic sidebar and the six "more ways to get help" tiles. As with Venmo, the help centre is **not browsable without JavaScript**, and the first body string on every help page is `You need to enable JavaScript to run this app.`

**The ID is authoritative, the slug is decorative** `[observed]`. Requesting `/article/why-is-my-paypal-account-limited-help221` returns an article titled `How do I apply for the charity rate?` — the `help221` ID resolves and the mismatched slug is silently rewritten. This is standard behaviour for ID-keyed help systems, but it means a mistyped or stale link delivers **confidently wrong content with a correct-looking URL**, rather than a 404. For a help centre reached largely through search and support-agent links, silent wrong-article resolution is a meaningful risk.

**`Recommended Articles` on the help home** `[observed]` — five, all questions, and the selection is revealing:

1. `Where is my refund?`
2. `How do I change my password and security questions?`
3. `How do I check the status of my dispute or claim?`
4. `How do I open a dispute with a seller?`
5. `Why is my payment on hold or unavailable?`

**Four of five are failure or anxiety states.** `Where is my refund?` sits first — PayPal's closest equivalent to Wise's `Where is my money?`, and it is the top recommended article on the consumer help centre. That is an honest reflection of demand and the right thing to surface. A `Show more` control follows.

**Article-title grammar — four shapes**

| Shape | Example |
|---|---|
| `Where is…?` | `Where is my refund?` |
| `How do I…?` | `How do I open a dispute with a seller?` |
| `Why is…?` | `Why is my payment on hold or unavailable?` · `Why is my PayPal account limited?` |
| Noun phrase | (rare in the sample) |

More consistent than Venmo's five shapes. The `Why is…?` titles are doing the Wise "explain the adverse outcome" job.

**Routing furniture** is identical on every page — the same six tiles, the same cookie banner, the same audience chips. The `Resolution Center` is offered as a top-level route from every help page, which is correct for the highest-stakes task.

## T12 FAQs

**Two FAQ blocks harvested, both at the foot of marketing pages.**

### Shopping & Rewards page — `Frequently asked questions`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Where can I shop using PayPal? | Tens of millions of merchants, online and offline; both PayPal cards work anywhere Mastercard is accepted, "Even sites where PayPal checkout isn't available." |
| 2 | What are the different ways to pay with PayPal? | Lists card networks, bank, balance, Debit Mastercard, and Pay Later. |
| 3 | Is PayPal a secure payment method? | Encryption; "we don't share your full financial information." |
| 4 | Where can I track my purchases? | Package tracking in the app, "regardless of whether you have used PayPal for the transaction." |
| 5 | What kind of rewards can I get when I pay with PayPal? | Offers → points → redemption. |

Ordering: availability → mechanism → trust → a feature → rewards. Q4's answer contains the most interesting fact on the page (tracking works for non-PayPal purchases) and it is buried as the fourth of five.

**Q2 contains an error in a list that matters**: "you can choose to pay with your Visa, Mastercard (including the PayPal Cashback Mastercard®, Discover, American Express or bank account" — the parenthesis is never closed, so the sentence reads as though Discover and Amex are varieties of the PayPal Cashback Mastercard. A dangling parenthesis in a payment-method list on a live consumer page.

### Security page — `Frequently asked questions`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Do I need to activate wallet monitoring or early fraud alerts? | No; automatic on eligible cards; enable push notifications for real-time alerts. |
| 2 | What exactly is a passkey? | Login standard replacing passwords, using device biometrics. |
| 3 | How long do I have to dispute a transaction? | Account in good standing; "a dispute be filed within 180 days of your purchase or payment." |

`What **exactly** is a passkey?` — the adverb is doing register work, acknowledging that the user has heard the word and still doesn't know. Small, effective.

**Q3 is a real disclosure problem.** It gives a single 180-day answer. The legal hub gives **two different deadlines** — 180 days for Item Not Received, but "30 days of the date of delivery… or 180 days… whichever is sooner" for Significantly Not as Described. A user who reads the security-page FAQ will believe they have 180 days to dispute a wrong-item delivery when they may have 30. The FAQ is not merely incomplete; on the more common claim type it is **misleading in the direction that costs the user their remedy**.

That is the second cross-page disclosure inconsistency in this file (after Pay in 4), and it is the more consequential of the two.

## T13 Terminology & glossary

| Term | PayPal's usage | The alternative it rejected |
|---|---|---|
| `Purchase Protection` | The buyer scheme | "Buyer Protection" — PayPal's own older term, still the URL slug (`/buyer-protection`) |
| `Item Not Received` / `Significantly Not as Described` | The two claim types, always plain-language-first | "INR" / "SNAD" (never surfaced to users) |
| `dispute` → `claim` | Two-phase escalation with distinct names | "case" alone |
| `Resolution Center` | The dispute destination | "Disputes", "Cases" |
| `limitation` / `limited account` | Account restriction | "suspension", "freeze" (Venmo's word), "block" |
| `hold` | Funds retained | "reserve" (used for business accounts elsewhere) |
| `Refund Tracker` | The named three-step component | "refund status" |
| `PayPal Balance` / `PayPal Balance account` | The stored-value product, distinct from "an account with PayPal" | "wallet" |
| `commercial transaction` / `personal transaction` / `donation` | Three fee-bearing categories, each introduced with "we call that a…" | "payment types" |
| `goods and services` vs `friends and family` | The consumer-facing form of the same distinction | — |
| `Pay in 4` / `Pay Monthly` | BNPL product names describing the mechanic | "instalments", "BNPL" |
| `Pool` | Group-collection product | "pot", "group payment" |
| `passkey` | Industry term adopted and then glossed in an FAQ | "biometric login" |
| `early fraud alerts` / `wallet monitoring` | Two names for what the FAQ treats as one feature | — |
| `bank reference ID` | The token the user takes to their bank | "transaction ID" |
| `combined cryptocurrency purchase amount` | Coined term for a fee base, defined at first use | — |
| `PayPal World` | New cross-border QR product, appearing only in exclusions | — |

**Terminology problems recorded:**

- `Purchase Protection` is the brand name but `buyer-protection` is the live URL and `PayPal's Purchase Protection Program` is the page title. Three forms.
- **`early fraud alerts` and `wallet monitoring`** are joined in a single FAQ question ("Do I need to activate wallet monitoring or early fraud alerts?") and then only one of the two is ever explained. The question implies two features; the answer describes one.
- **`money` vs `cash`.** The homepage says `Send Money`; the security page CTA says `Send and Receive Cash`. Same action, and "cash" is actively wrong for a digital transfer.
- **`Savings` vs `PayPal Savings` vs `Start Saving`** — three forms of the same product across one page block.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural in help and legal ("We may hold payments", "we'll send you an email", "we will reimburse you"). The legal hub switches to **third-person "PayPal"** ("PayPal determines, in its sole discretion") precisely where discretion is being asserted. That shift from "we" to "PayPal" at the moment of unilateral power is consistent across the buyer-protection document and is worth noting as a deliberate — or at least revealing — register choice.

**Register does not flatten as stakes rise.** This is the clearest tone finding. `It's easy. Really easy.` sits above a variable-APY savings product. `Crypto curious?` introduces a product whose own disclosure says it "may result in significant losses". `Don't stress out` is Venmo's line, but PayPal's equivalent cheerfulness runs deeper into the funnel than Wise's does. The marketing voice and the legal voice do not meet; there is no intermediate register.

**Sentence-fragment headline style** is used heavily: `Ready when you are` · `Flexible payments` · `Fast, easy checkout` · `Learn how to earn` · `Pay with peace of mind`. Short, rhythmic, contentless. Several are CTA-adjacent captions rather than headings, so a screen-reader user encounters a run of unanchored fragments.

**Numbers as trust devices** are sparse and mostly rates rather than scale: `3.30% APY`, `up to 3% cash back`, `1.5%`, `$1,000` category cap, `9.99-35.99%`. PayPal does not quote user counts, transaction volumes, or fraud-team sizes on these pages — a contrast with Wise (18.9 million, 74%, 301,144 reviews) and Chime (1 million+ reviews, 4,200+ experts, 47K ATMs). For the largest brand in the batch, the absence of scale proof is notable.

**No `Oops!`** anywhere in the harvest. Failure copy is procedural and calm.

**Footnote density.** The consumer homepage carries **twelve numbered footnotes** plus unnumbered trademark and illustrative-image disclaimers. The footnote block is roughly as long as the body copy. Much of the page's actual information — the account-tier model, the BNPL parameters, the lender identities, the state exclusions, the FDIC position — lives only in the footnotes. The body sells; the footnotes inform. A user who reads only the body has not been told how the product works.

**Accessibility** `[observed]`

PayPal publishes an accessibility statement at `/us/accessibility`. It is **one paragraph**. It commits to making content "accessible and user friendly to everyone", invites reports via Contact Us, asks for "a description of the specific feature you feel is not fully accessible", promises to "take your feedback seriously", and encourages third-party vendors to do likewise.

What it does not contain: any standard (no WCAG reference, no level, no version), any conformance claim, any testing statement, any remediation timeline, any dedicated contact address or alternative format, any date. It is a feedback invitation, not an accessibility statement. Chime's, harvested the same day, is **near-identical in wording** — same structure, same "take your feedback seriously", same vendor sentence — but adds a phone number, an email address, and a required subject line (`"Accessible Access"`). Chime's version is more actionable than PayPal's.

Other accessibility observations:
- Alt text where present is descriptive and scene-level: "Two people cuddling and playing with a dog at home", "2 clasped hands in the shape of a heart, illustrating how our Business Resource Center is a source you can trust". The second describes the *rhetorical function* of the image, which is arguably better practice than describing only its content.
- Help-centre images carry the alt text `hc-help-option-img` — a developer placeholder, repeated six times on every help page. Six identical meaningless alt strings on every article page.
- `scroll left` / `scroll right` appear as literal text on every article page.
- `You need to enable JavaScript to run this app.` is the first body content of every help page.
- The homepage rewards figures are rendered as animated digit strings (`01234567%back`, `+012345%back`), which serialise in the DOM as the full digit sequence. A screen reader would announce "zero one two three four five six seven percent back". This is a genuine accessibility defect on the primary consumer homepage.
- The fraud-reporting email address in the account-limitation article renders as `[email protected]`, hiding the address a user is instructed to use.

**Negative findings, recorded honestly**

1. **Pay in 4 range differs across two live pages** — `$30 to $1,500` (homepage) vs `$10 to $2,000` (ways-to-pay). Regulated credit product, same site, same day.
2. **Dispute deadline stated as a flat 180 days in the security FAQ**, against 30-days-from-delivery-or-180-whichever-is-sooner in the legal hub. Misleading in the direction that costs the user the remedy.
3. **`Pending` defined two different ways within one help article** (`Where is my refund?`).
4. **"FDIC insured with and held at Synchrony Bank"** — grammatical error in a deposit-protection claim on the consumer homepage.
5. **Unclosed parenthesis** in the payment-methods FAQ answer, making Discover and Amex read as varieties of the PayPal Cashback Mastercard.
6. `Get the App` / `Get the app` — two capitalisations of one CTA on one page.
7. `Send Money` (homepage) vs `Send and Receive Cash` (security page) for the same action.
8. Three CTA labels pointing at the credit card across two pages.
9. Bare `Learn More` shipped on a credit product block.
10. `hc-help-option-img` alt text, ×6 per help page.
11. Animated digit strings serialising as `01234567%back` for screen readers.
12. Mistyped help URLs resolve silently to unrelated articles rather than 404ing.
13. Two of eleven fee-page sections contain no fees.
14. Accessibility statement contains no standard, no conformance claim and no date.

---

## Transferable patterns

1. **Name the state, then immediately deny the inference.** `Refund Sent` → "Note: that the refund has not yet been completed as your card issuer or bank may also take time." Wise wrote a whole article to reconcile "complete" with reality; PayPal solves it inline at the state. Best practice in this batch, and directly reusable anywhere a status crosses a party boundary.
2. **Tell the user when a competing remedy is better.** "Applicable card chargeback rights may be broader than those available to you under PayPal's Purchase Protection program." Then state the exclusivity rule and the ordering rule. Condition: only credible if paired with the self-imposed penalty PayPal also publishes — reimbursing the user if PayPal's delay costs them the card deadline.
3. **Define the vague accusation.** Do not ship "unusual activity" as a reason; enumerate what unusual means ("an unexpected surge in sales, a change in business type, a change in average selling price, or the type of item being sold"). Applies to every risk, hold, and limitation screen.
4. **Work the arithmetic at three price points.** Pay Monthly's three worked examples (monthly payment, total interest, total of payments) are how an APR should be disclosed. Contrast Pay in 4 on the same page, which cannot agree with itself on its own range.
5. **Give the user a token to take to the third party.** `bank reference ID` converts "contact your bank" from a dismissal into an action.
6. **`we call that a "X"`** as a terminology-introduction device, used three times on the fee page. Plain description first, term of art second, in the same sentence.
7. **Put the condition inside the value, not in a footnote.** `No Fee (when no currency conversion is involved)` as the cell value means the exception cannot be read past.
8. **Build the phishing check into the bad-news article.** "If you received an email stating your account is limited, but don't see a limitation in the Resolution Center, you may have received a fake email." The moment of maximum anxiety is the moment of maximum phishing exposure; address both in one place.
9. **Negative pattern — footnote-dependency.** When the account model, the credit parameters, the lender identity and the deposit-protection position all live only in numbered footnotes, the body copy is not informing the user. Move at least the account-tier distinction into body copy.
10. **Negative pattern — cross-surface disclosure drift.** Two of the three most consequential numbers on these pages (Pay in 4 range, dispute deadline) disagree across surfaces. Any product with regulated parameters needs a single source and a propagation check; PayPal demonstrably does not have one here.

## Caveats & gaps

- **Help topic inventories not retrievable.** Topic pages are client-rendered and returned only navigation. Article titles cited come from the Recommended list and from in-article links, so the sample skews to high-traffic articles.
- **All in-product strings are `[documented]`, not observed.** `Know your options`, `Refund Tracker`, `Closed Cases`, `Notifications Center` and the refund state names are reconstructed from help prose. Where an article bolds a string it is likely accurate; the state names in the second refund list are rendered in quotes rather than bold and may be paraphrase rather than shipped labels.
- **`https://www.paypal.com/us/digital-wallet/manage-money/paypal-balance` returned empty** and was not harvested. The PayPal Balance account model — which determines who can hold funds, create pools, and create links — is therefore documented here only from footnotes.
- **Empty states entirely unreachable.** `[absent]`
- **Merchant, Braintree, and Business help surfaces unharvested.** The consumer fee page redirects to both; neither was followed.
- **User Agreement not harvested.** Several disclosures (unauthorized-transaction timeframes, holds/limitations/reserves, set-off rights) defer to it and are therefore incomplete here.
- **Only en-US harvested.** PayPal serves ~200 markets with materially different regulatory copy; nothing in this file should be treated as precedent for UK, EU, AU, CA or BR surfaces.
- **Mobile app copy out of scope**, and PayPal's own marketing positions the app as the primary surface ("All in the PayPal app"), so the majority of the product's content was not observable.
- The Pay in 4 contradiction is recorded as observed on 2026-09-21. It may be a caching artefact or a mid-rollout state; it is reported as seen, not diagnosed.

## Sources

1. https://www.paypal.com/us/home
2. https://www.paypal.com/us/digital-wallet/ways-to-pay
3. https://www.paypal.com/us/digital-wallet/security-and-protection
4. https://www.paypal.com/us/security
5. https://www.paypal.com/us/digital-wallet/paypal-consumer-fees
6. https://www.paypal.com/us/legalhub/paypal/buyer-protection
7. https://www.paypal.com/us/accessibility
8. https://www.paypal.com/us/cshelp/personal
9. https://www.paypal.com/us/cshelp/browse-topics
10. https://www.paypal.com/us/cshelp/article/where-is-my-refund-help130
11. https://www.paypal.com/us/cshelp/article/why-is-my-payment-on-hold-or-unavailable-help126
12. https://www.paypal.com/us/cshelp/article/how-do-i-check-the-status-of-my-dispute-or-claim-help181
13. https://www.paypal.com/us/cshelp/article/why-is-my-paypal-account-limited-help534
14. https://www.paypal.com/us/cshelp/topic/help_disputes_and_limitations_personal
