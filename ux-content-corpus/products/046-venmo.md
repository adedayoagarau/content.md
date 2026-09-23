# 046. Venmo

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | P2P payments / social payment feed + prepaid-style stored-value account |
| Primary URL | https://venmo.com/ |
| Corpus rank | 046 |
| Benchmark strength (source list) | Payments, social context, privacy |
| Locale / market observed | en-US (US-only product; help centre has an `/hc/es` Spanish path, not harvested) |
| Platform observed | Web (marketing), web help centre, fee/legal pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Venmo is a PayPal service. **Not a bank.** Verbatim: "PayPal is not a bank, does not take deposits and is not FDIC insured." Pass-through FDIC insurance via "Program Banks" only for balances triggered by specific activities (cash-a-check, crypto, Direct Deposit, or an issued Venmo Mastercard). Debit card issued by **The Bancorp Bank, N.A.** (Mastercard); credit card issued by **Synchrony Bank** (Visa), Utah law. Crypto: **NYDFS** virtual currency licence; custody/trading via **Paxos Trust Company, LLC**; not available in Hawaii. Prepaid-account disclosure routes complaints to the **CFPB** (1-855-411-2372 / cfpb.gov/complaint). |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — help-centre **topic** pages are client-rendered and return only a global "Featured Articles" list, so the per-topic article inventory could not be enumerated. Individual articles are server-rendered and were captured directly. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://venmo.com/ | Hero, product carousel, footnote stack |
| How it works | https://venmo.com/send-receive/start | Three-step model, inline fee list, FAQ block |
| Fees | https://venmo.com/resources/our-fees | Full fee schedule + CFPB prepaid disclosure + credit-card Schumer box |
| Security | https://venmo.com/about/security | Older-style security page |
| Trust & safety | https://venmo.com/about/us/trust-and-safety | Newer marketing security page |
| Purchase Protection | https://venmo.com/purchaseprotection | Dual buyer/seller FAQ page |
| Help centre home | https://help.venmo.com/cs/home | Ten topics with scope lines |
| Manage privacy settings | https://help.venmo.com/cs/articles/manage-your-venmo-privacy-settings-vhel351 | Core privacy-vocabulary source |
| Changing payment privacy | https://help.venmo.com/cs/articles/changing-payment-privacy-hiding-past-payments-vhel191 | Retroactive-privacy rules |
| Common scams | https://help.venmo.com/cs/articles/common-scams-on-venmo-vhel167 | Eleven named scam patterns |
| Payment pending | https://help.venmo.com/cs/articles/my-personal-venmo-payment-is-pending-vhel276 | State taxonomy |
| Payment declined | https://help.venmo.com/cs/articles/payment-declined-vhel228 | Decline recovery |
| Cancel payment | https://help.venmo.com/cs/articles/cancel-payment-vhel148 | Scenario-routing article |
| Frozen account | https://help.venmo.com/cs/articles/frozen-account-vhel251 | Restriction language |
| Frozen from failed payments | https://help.venmo.com/cs/articles/temporarily-frozen-account-from-failed-payments-vhel296 | Loss-recovery language |
| Opening a dispute | https://help.venmo.com/cs/articles/opening-a-dispute-vhel113 | Dispute flow |

---

## T1 Navigation & IA labels

**Help-centre top level — ten topics, each with a scope line** `[observed]`

| Topic | Scope line (verbatim) |
|---|---|
| `Accounts, Profiles & Settings` | "Updating your Venmo Profile" |
| `Payments & Transfers` | "All about money movement on Venmo" |
| `Troubleshooting` | "Frozen accounts & other concerns" |
| `Security & Privacy` | "Learn how to stay safe on Venmo" |
| `Getting Started` | "Learn how Venmo works and sign up" |
| `Wallet` | "Manage banks, cards, & Crypto" |
| `Disputes` | "Open & manage disputes" |
| `Buying & Selling with Venmo` | "Venmo online, instores, & more" |
| `Business Profiles & Charity Profiles` | "Payments for business or charity" |
| `Tax Center` | "All about taxes on Venmo" |

Two things worth recording. First, the scope lines are grammatically **inconsistent in a way Wise's are not** — some are gerund phrases ("Updating your Venmo Profile"), some are imperatives ("Learn how to stay safe"), some are bare noun phrases ("Frozen accounts & other concerns"), and one is a fragment with a typo: `Venmo online, instores, & more` (missing space in "in stores"). A ten-item list with four grammatical shapes and a typo is a visible content-ops gap.

Second, `Troubleshooting` leads its scope line with **`Frozen accounts`**. Naming account freezing as the headline example of "other concerns" is an unusually frank admission of the most common support driver, and it is the Venmo equivalent of Wise's `Where is my money?`.

**In-app navigation path, repeated verbatim across many articles** `[documented]`

> `Me` > `Settings` > `Get Help` > `Chat With Us`

This exact four-step string appears identically in the scams, disputes, cancel-payment, and frozen-account articles. The tab is `Me`, not "Account" or "Profile" — a first-person navigation label, which is rare and is the social-product tell.

**Marketing nav sections** `[observed]`: `Debit` · `Credit` · `Checkout` as a three-tab carousel on the homepage; `Send` · `Personalize` · `Control` as the three-step model on the how-it-works page.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Venmo everything`
> Subhead: "Send money to friends, pay businesses, and check out with Venmo when you shop."
> Footnote, immediately below: "*Venmo purchase restrictions apply."

`Venmo everything` is a **verbed brand name used as an imperative** — the headline asserts that the noun has become a verb, which is Venmo's actual cultural position. The subhead then does the ordinary work of naming three tasks. The asterisked restriction sits directly under the hero rather than at the page foot, which partially bounds the "everything" claim at the point of the claim.

**Section headers are imperative triplets or possessive claims** `[observed]`

- `Send. Split. Gift.` — three imperatives, full-stopped, no conjunction
- `More ways to pay`
- `Your rewards era starts with Stash`
- `Purchase crypto`
- `Grow a business`
- `Get the app`

`Your rewards era starts with Stash` is the outlier in register — "era" is borrowed internet-vernacular and is the only line on the page written in a distinctly young voice.

**Trust & safety page uses a two-line split headline** `[observed]`

> `A safe way to pay` / `and get paid`
> `Send dollars, not` / `financial details`

`Send dollars, not financial details` is the strongest single line in the Venmo corpus: it states the product's security value as a substitution, in five words, with no jargon.

**How-it-works hero** `[observed]`: `The simple way to send` — "Split costs, schedule payments, send gift cards, and manage group expenses. With no hidden fees."

Note `With no hidden fees.` as a **separate sentence fragment**, not a clause. On the same page, three fee lines then immediately disclose a 3% credit-card fee. So "no hidden fees" is defensible (the fee is disclosed) but sits three inches above a fee — a juxtaposition worth flagging rather than copying.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download the Venmo app` | Homepage, repeated in footer | Dominant CTA — Venmo pushes to app, not to web signup |
| `Send with Venmo` | How-it-works hero | Task-named |
| `See how it works` | Homepage, Send/Split/Gift block | |
| `Get the Venmo Debit Card` | Debit tab | Noun-phrase, product-named |
| `Apply now` | Credit tab | **Bare `Apply now` with no object** — the only fully unanchored CTA on the page |
| `Explore ways to pay` | Checkout tab | |
| `Learn about Stash` | Rewards block | |
| `Learn more about crypto` | Crypto block | |
| `Learn more about fees` | How-it-works, under the fee lines | |
| `See ways to get paid` | Business block | Audience-switched verb ("get paid" not "sell") |
| `I'm a buyer` / `I'm a seller` | Purchase Protection page | **First-person role-selection tabs** — unusual and good |
| `See terms and limitations` | Purchase Protection, repeated 4× | The same link label used four times on one page |
| `Learn about Purchase Protection` | Trust & safety | |
| `Learn about security` | How-it-works | |
| `Take Back` | In-app, pending payment | `[documented]` — the single best Venmo string (see T6) |
| `Restore your account` | In-app, frozen account | `[documented]` |
| `Need Help?` | In-app, transaction detail | `[documented]` — entry to dispute flow |
| `Submit Issue` | In-app, dispute flow | `[documented]` |
| `Submit a Ticket` | In-app, Get Help menu | `[documented]` |
| `Add more` / `Add` | In-app, multi-transaction dispute | `[documented]` |
| `Report This Transaction` | *(not Venmo — see Kuda file)* | — |

**Observation.** Venmo ships several bare `Learn more` variants and one bare `Apply now`. Where Wise almost never leaves a CTA unanchored, Venmo does so routinely on the marketing surface. The in-app strings recovered from help articles are much better than the marketing CTAs — `Take Back`, `Restore your account`, `Need Help?` are all concrete and short.

## T4 Onboarding & getting-started

**Three-step model, single-word headings** `[observed]`

1. `Send` — "Easily see the people and places you pay the most. Or search for them by name or phone number."
2. `Personalize` — "Add personality to your payment by choosing an optional Venmoji or GIF."
3. `Control` — "Set the privacy level for each payment: **Private**, **Visible to friends**, or **Public**."

This is the structurally important finding in the file. Venmo's three-step onboarding narrative devotes **one of three steps to privacy**, and names the three privacy values inline in the step body. Privacy is positioned not as a setting but as a step in the payment itself.

Note also the **ordering inversion**: the how-it-works page lists the values most-private-first (`Private`, `Visible to friends`, `Public`), while the help centre lists them most-public-first (`Public`, `Friends only`, `Private`). See T13 for the label mismatch.

**Signup eligibility** `[documented]` — not stated on public marketing; the identity-verification requirement is framed as legal obligation: "In accordance with federal law, we ask all users to confirm their identity in the app."

## T5 Form & field labels

Pre-auth form surface is minimal — Venmo has no public calculator. What is recoverable is `[documented]` from help articles:

| Label / control | Source article | Notes |
|---|---|---|
| `Me` tab | Multiple | Navigation, not a field, but the anchor for every task instruction |
| `Settings` gear | Privacy articles | Described as "the Settings gear in the top right corner" |
| `Privacy` | Privacy articles | Settings sub-menu |
| `Find Me` | vhel351 | Sub-setting with two toggles: `On Venmo` and `On PayPal` |
| `Transactions` feed | vhel276 | The feed name; distinct from the public "feed" |
| `Pay` button | vhel167 | Business profiles show "Eligible items covered by Purchase Protection" beneath it |
| `Allow transactions` | *(Chime — not Venmo)* | — |

**Notable microcopy placement** `[documented]`: the Purchase Protection eligibility notice is rendered **under the `Pay` button** — "Approved business accounts will say 'Eligible items covered by Purchase Protection' under the 'Pay' button." Putting protection status adjacent to the commit control, at the moment of commit, is a reusable pattern.

## T6 Status & state language — PRIORITY

Venmo's transaction-state vocabulary is small, and the interesting content work is in the **disambiguation of a single overloaded state**.

**Named states** `[documented]`

| State | Meaning as documented | Source |
|---|---|---|
| `Pending` | Two entirely different conditions share this one label (below) | vhel276 |
| `Completed` | Money has reached the recipient | vhel276, vhel148 |
| `Frozen` | Account restricted; two distinct causes, two distinct recovery paths | vhel251, vhel296 |
| `Suspended` | Used interchangeably with `frozen` in the same article title/body | vhel251 |
| `Declined` | Payment blocked at attempt time | vhel228 |
| `Authorizations` | Merchant holds on card purchases; named as its own concept | vhel356 (referenced) |
| `Expire` | Unclaimed pending payments auto-expire at 30 days | vhel276 |

**The `Pending` overload — the central finding** `[documented]`

Venmo uses one status word for two unrelated situations, and the help centre has to open by disambiguating them:

> "There are two reasons why a payment may show as pending on Venmo:" — bank clearance (3–5 business days), or the recipient's phone/email being unverified.

The consequences diverge sharply. In the bank-clearance case the money has left the sender and the recipient cannot be reached; cancellation requires contacting **the sender's own bank**, not Venmo. In the unclaimed case the sender can cancel in-app via `Take Back`.

The article headings are structured as the user's questions and are the strongest writing on the page:

- `Why is my Venmo payment "Pending?"` — note the question mark **inside** the quotation marks around the status word
- `When will the recipient receive the payment?`
- `Can I cancel or expedite my pending payment?`
- `How do I complete a pending payment?`
- `How do I cancel a pending payment?`
- `What happens when I take back a Pending payment?`

**`Take Back` as a state-transition verb** `[documented]`. Venmo did not call this "Cancel". It is `Take Back` — two short Anglo-Saxon words describing the physical act rather than the system operation. It also correctly signals that the money left and is being retrieved, which "cancel" would not. The article then bounds it: "The option to take back a payment is only available if the recipient's phone number or email address is not associated with an active Venmo account."

**Reversal timing given per funding source, absolutely** `[documented]`
- Venmo balance: "you should see the refund reflected right away"
- Bank account: "up to 5 business days"
- Credit or debit card: "up to 7 business days"
- Closing bound: "These timelines can depend on external factors and cannot be expedited."

That last sentence does two jobs — it pre-empts the follow-up question and it removes the false hope of escalation. Good practice.

**Irreversibility stated first, not buried** `[documented]`. The `Cancel Payment` article opens with the bad news:

> "When you send a payment on Venmo, the money will be sent to the recipient right away. There isn't a way to cancel a payment once it's sent."

No hedging, no apology, no "unfortunately". The scenario list follows.

## T7 Error, failure & recovery — PRIORITY

This is Venmo's deepest content territory and the richest section in the file.

### Decline language `[documented]`

The `Payment Declined` article names only two causes and refuses to over-claim knowledge:

- "Your bank or card issuer is declining the transaction (outside of Venmo)"
- "The payment attempt has triggered one of Venmo's automated security flags"

Parenthetical `(outside of Venmo)` is doing real work — it tells the user which system to go argue with. The recovery ladder is ordered by user effort:

1. Follow the specific error message if one was shown
2. Add money to the Venmo balance and pay from balance
3. Use a different bank account or card
4. "If these suggestions don't resolve the issue, try making the payment at a later time."

Step 4 is a genuine content decision. Rather than escalate to support, Venmo tells the user to wait — an honest admission that the security flag is time-based and that support cannot override it.

### Frozen-account language — two articles, two registers `[documented]`

**Cause-unknown freeze** (`Frozen Account`, vhel251) is written in cautious, agentless prose: "your account may be frozen or suspended for a variety of reasons. We may place restrictions on certain payments and/or request certain documentation." It never says why. It routes to email: "check your email inbox (including Spam/Junk folders)".

The strongest line here is a pre-emptive de-escalation heading:

> `Already contacted us?` — "Please refer to our previous emails for any requested information or next steps. We're actively reviewing your account and will email you as soon as there's an update."

Writing a help-article section for *the user who already asked* is a support-load pattern most products skip.

**Failed-payment freeze** (vhel296) is concrete by contrast. It names the money, the timeline, and offers partial payment:

- Recovery CTA: `Restore your account`
- "It's fastest to use a debit card to fund the recovery payment."
- "If you're unable to pay back the full amount right now, you can make a partial payment by editing the repayment amount."
- "Any payments you receive on your Venmo account will automatically be applied to the amount you owe to Venmo."
- Cause section heading: `Why did my original payment fail?` — answered with an admission: "**Venmo doesn't have visibility into the specific reason your transaction failed**, your bank should be able to tell you exactly why."

Offering a partial repayment path inside the recovery flow, and admitting the company cannot see the cause, are both unusually candid for a restriction screen.

### The bank-reversal trap, repeated twice in bold `[documented]`

The same warning appears in two articles, in the same emphatic form:

> "**This option ONLY applies to payments that show as Pending with an estimated completion date on Venmo.** If you contact your bank to cancel or stop a Completed Venmo payment, this will create a loss on your Venmo account, which you will need to pay back."

`create a loss on your Venmo account` is the euphemism to note — it names the accounting event rather than the user experience (you will owe Venmo money and be frozen). The all-caps `ONLY` is the only shouting in the corpus and is deployed on the single action that causes the worst outcome.

### Dispute flow `[documented]`

Opens with an exclusion, in bold, before any instruction:

> "**Venmo Debit Card transactions and online purchases cannot be disputed or reported as unauthorized in the Venmo app.**"

Then the eight-step in-app flow: `Me` tab → select transaction → `Need Help?` → "Select the statement that best describes your situation" → `Add more` / `Add` → `Next` → add information → `Submit Issue` → "If prompted, reset your Venmo password."

Two notes. "Select the statement that best describes your situation" implies a **pre-written statement picker** rather than a free-text field — a taxonomy the user chooses from, which is a content artefact in itself. And step 8, resetting the password inside the dispute flow, silently couples fraud reporting to credential rotation without explaining why.

Jurisdiction is split and stated: Venmo Credit Card disputes go to **Synchrony Bank**, not Venmo.

The related-article set reads as a complete unhappy-path IA: `Following up on a Dispute` · `Canceling a Dispute` · `Dispute Documentation for Sellers` · `Dispute Filing Timeframes`.

### Scenario-routed recovery — the `Cancel Payment` pattern `[documented]`

Rather than one answer, the article is a **router keyed on what the user actually did**, each with a distinct remedy:

| Scenario (verbatim heading) | Remedy offered |
|---|---|
| `Payment is Pending:` | Diagnose which of two pending causes |
| `Payment sent to a stranger:` | Gather details, contact Support |
| `Payment sent to wrong friend:` | "Ask your friend to pay you back" |
| `Issues with an international payment:` | Route to the cross-border article |
| `Accidental duplicate payment:` | "Ask the recipient to pay you back for the extra payment" |
| `Paid for a scam:` | Contact Support |
| `Received payment from a stranger:` | Contact Support — "Do not attempt to pay the stranger back on your own" |

Two of the seven remedies are **"ask the other person"** — Venmo openly declines to intervene in social-payment mistakes and tells the user to handle it interpersonally. That is a product-truthful content decision, and it is the clearest expression of the social-payments model in the whole file. The last row is the only one with a negative instruction, and it is there because the naive helpful action (paying the stranger back) is exactly the scam.

### Scam taxonomy — eleven named patterns `[observed]`

`Fake Prize or Cash Reward` · `Call Pretending To Be Venmo` · `Text Messages Pretending to be Venmo` · `When You're Buying Something From A Stranger` · `When You're Selling Something To A Stranger` · `Call Pretending To Be Tech Support` · `Someone Pretends To Be Your Friend And Sends or Requests Money` · `Payments from Strangers` · `Paper Check Scam` · `Romance Scam` · `Examples Of Other Situations That Could Be Scams`

Each is structured `Details:` → `How to avoid this scam:` → sometimes `What it might sound like:`.

**`What it might sound like:` is the standout pattern in this file.** Venmo writes a scripted, in-character impersonation of the scammer — for example the tech-support script opens "Hello, thank you for calling (major company name) Support." Giving the user a sample of the attack's *voice*, not just its shape, is a recognition aid that rule-lists cannot deliver. It is also a nerve-racking thing to ship, because writing convincing scam copy is itself a risk. Worth stealing with care.

The never-list is written as an absolute anaphora — six consecutive sentences beginning "Venmo will never…": ask for the code, ask to access your device remotely, ask you to install a third-party app, create an account on your behalf, direct you to send money via a different platform, ask you to send money to "verify" your account. Repeating the subject-verb frame six times makes the list memorisable, which a bulleted mix of grammatical shapes would not.

Crucially, the friend-impersonation entry **links privacy settings as a fraud control**: "Update the privacy settings for your friends list and your transaction history." Venmo explicitly frames the public feed as the attack surface it is — "Using information visible in the public feed, the scammer either sends money then requests it back…". This is the one place where Venmo's marketing framing of privacy (personal expression) and its security framing (attack surface) are reconciled.

## T8 Empty states

`[absent]` — all empty states sit behind authentication. No no-results or first-run copy was reachable on public surfaces. The help-centre search is client-rendered and its no-results string was not retrievable.

## T9 Notifications & system messages

`[documented]`, mostly recoverable as described behaviour rather than as strings:

- Completion notification is two-sided: "When the payment is completed, Venmo will notify you and the recipient."
- Unfreeze notification: "You'll receive an email when your account unfreezes."
- Estimated-completion surfacing: "you'll see an estimated completion date in the Venmo app"
- Seller notification on protection election: "As the seller, you'll receive a notification when this happens and pay a fee of 2.99% per transaction."
- Fee page line: `Real-time alerts` — "$0.00 … No fee to receive real-time alerts on your phone. Standard text message & data rates may apply."

**Channel-authenticity rule as user-facing content** `[observed]`: "Venmo will only email you from an email address ending in 'venmo.com'" and "Our multi-factor authentication message does not contain a link for you to click." The second is a promise about Venmo's own message *design* published as a security control — the product commits to a content constraint and tells users to treat violation as proof of fraud. That is a content-design decision with a security function, and it is rare.

Dedicated articles exist for `Unexpected Emails from Venmo` and `Reporting Fake or Suspicious Messages or Emails`.

## T10 Disclosures, legal & compliance — PRIORITY

### Fee-schedule architecture `[observed]`

Six activity-named sections, each a gerund or noun phrase naming what the user is doing:

`Opening and holding an account` · `Spending or sending money` · `Adding money to your account and receiving payments` · `Transferring money from your account` · `Buying, selling, or transferring cryptocurrencies` · `More information` · `Using the Venmo Mastercard® (optional)`

**Three-column grammar: activity → figure → full-sentence restatement.** Every row restates its own number as a sentence. Examples:

- `Account setup` | `$0.00` | "No fee to setup an account."
- `Sending money to a Venmo account or U.S. PayPal account using your credit card` | `3.00%` | "There's a 3.00% fee for sending money to a Venmo account or U.S. PayPal account using your credit card."

This is **deliberate redundancy**: the number is given once as a value and once inside a sentence. It costs a lot of words and it makes each row independently quotable and screen-reader-legible. Note the typo `setup` used as a verb in the very first row.

**`$0.00` used as an explicit value, never as omission.** Fifteen-plus rows carry `$0.00`. Two are notable as trust signals rather than fees:
- `Transaction declines due to insufficient funds` | `$0.00` | "No fees for declines due to insufficient funds."
- `Customer service (live agent)` | `$0.00` | "No fee to call a Customer Service agent."

Publishing "we do not charge you for being declined" and "we do not charge you to speak to a human" as **line items in a fee table** turns the absence of a predatory fee into a disclosed feature. That is the single most transferable thing on the page.

**Conditional-failure bounding inside the fee line** `[observed]`: the cash-a-check rows end "No fee if your check can't be added." The fee's own row states the refund condition. Compare the `(optional)` suffix in the section heading `Using the Venmo Mastercard® (optional)` — optionality disclosed in the heading, not in a footnote.

**Third-party cost disclaimed separately** `[observed]`: "You may be charged an additional amount by the ATM owner even if you don't complete a transaction." The "even if you don't complete a transaction" clause anticipates the exact edge case a user would dispute.

### Deposit-protection disclosure — conditional, and honest about it `[observed]`

The FDIC paragraph is **conditional on activity**, and Venmo writes the condition out in full before making any protection claim. Paraphrasing its structure: *if* you have used cash-a-check, or hold/have received crypto, or you or a Teen User hold an un-cancelled Venmo Mastercard, or you have used Direct Deposit — *then* funds are placed with Program Banks where they "will, subject to certain conditions, be eligible for pass-through FDIC insurance up to applicable limits."

Then the negations, in sequence:

> "FDIC insurance protects against the failure of a Program Bank, not the failure of PayPal which provides the Venmo service. PayPal is not a bank, does not take deposits and is not FDIC insured."
> "Any other Venmo account funds and all cryptocurrencies are not held in FDIC-insured bank deposits. Cryptocurrencies may lose value."

The order — **eligibility condition, then scope of the protection, then what the company is not, then what is excluded** — is the correct order and is worth copying verbatim as a structure. "Any other Venmo account funds" quietly tells the majority of users that their balance is *not* covered, which is the accurate and uncomfortable fact.

The homepage footnote states it more bluntly and earlier: "Venmo is not a bank, does not take deposits and is not FDIC insured."

### Prepaid-account regime `[observed]`

The fee page carries the CFPB prepaid-account disclosure furniture: postal address, phone number, "For general information about prepaid accounts, visit cfpb.gov/prepaid", and a complaint route to the CFPB with its phone number. Venmo publishes the regulator's complaint line on its own fee page — the same dual-channel instinct as Wise's regulator-format fee table, arrived at by mandate rather than choice.

### Credit-card Schumer box `[observed]`

The Venmo Visa rates table is reproduced in full: purchase APR expressed as `prime rate plus` three tiered spreads by "Account Type 1/2/3"; cash-advance APR; `Penalty APR and When it Applies` with the sub-question `How Long Will the Penalty APR Apply?` answered "may remain in effect indefinitely"; `Minimum Interest Charge` of $2.00; late and returned payment fees "Up to $41.00"; `Paper Statement Fee` $1.99/month; balance method "daily balance". Accuracy is dated — "accurate as of June 27, 2024" — with a postal address to write to for changes.

The tiering by unnamed "Account Type" is worth noting as a legibility problem: the user cannot tell from the table which APR applies to them.

### The Purchase Protection contradiction — recorded as a defect `[observed]`

Two live Venmo pages say opposite things.

`venmo.com/about/security` states: "**Venmo does not offer buyer or seller protection.**" and "Avoid payments to people you don't know, especially if it involves a sale for goods and services".

`venmo.com/purchaseprotection` and `venmo.com/about/us/trust-and-safety` market Purchase Protection at length, with eligible/ineligible example lists and a `We've got your back` headline.

The security page is evidently stale and was not retired when Purchase Protection shipped. A user landing on it from search would be told the protection they are entitled to does not exist. This is the most consequential content defect found in this harvest — it is a **protection claim inverted**, on a page the user reaches by searching for security.

The same page also still routes to the legacy `help.venmo.com/hc/en-us/articles/…` URL pattern, while current articles use `help.venmo.com/cs/articles/…-vhelNNN`. Several current articles also still link to the legacy pattern internally (e.g. the scams article links to `/hc/en-us/articles/210413717-Payment-Activity-Privacy`, a title that no longer matches the live article name `Changing Payment Privacy & Hiding Past Payments`). Two help-centre generations are cross-linked in production.

### Purchase Protection eligibility copy `[observed]`

Eligible examples are written as **second-person mini-narratives**, not as categories:

- "You bought a book, but received a DVD"
- "You put a deposit down for a photography session, but the photographer doesn't show up"
- "You purchased an item described as authentic, but received a knockoff"
- "You purchased three items but only received two"

Every one is `You <did X>, but <Y happened>` — a two-clause contrast with the disappointment in the second clause. This is markedly more usable than the equivalent PayPal legal list (see 047), which uses the passive "The item is materially different from the seller's description of it."

Ineligible examples revert to category nouns: donations, vehicles, real estate, "Financial products or investments of any kind", gambling. The register drops from narrative to list exactly where the answer is "no" — the opposite of the gradient you would want.

Cost is disclosed as a **transfer of cost, not an absence of cost**: "Purchase Protection is available for eligible transactions with no fees to the buyer… a transaction fee of 2.99% of the sale is charged to the seller." Naming who pays, on the buyer-facing page, is good practice.

### Crypto and currency disclosures `[observed]`

- Spread disclosed as a concept, not just a number: "the exchange rate includes a spread that is earned on each purchase and sale"
- Currency conversion: `4.00%` spread on sending money that converts, with the escape clause "or such other lower amount as may be disclosed to you during the transaction"
- Network fee disclosed at commit time: "Such network fee will be displayed to you right before you transfer any cryptocurrency."
- Risk stated without softening: "Buying and selling cryptocurrency is subject to a number of risks and may result in significant losses."
- Advice disclaimed: "Venmo does not make any recommendations regarding buying and or selling cryptocurrency." (note the ungrammatical "buying and or selling")
- Geographic exclusion named: "not available in Hawaii and where prohibited by law"
- Illustrative-data caveat: "All cryptocurrency prices shown are for illustrative purposes only."

Entity naming is precise and shifts between surfaces: the fee page attributes crypto services to "PayPal Digital, Inc (doing business as Venmo Digital)"; the homepage attributes custody to "Paxos Trust Company, LLC"; PYUSD is disclaimed as "issued by Paxos, not Venmo".

## T11 Help-centre architecture

Two generations coexist. Current: `help.venmo.com/cs/…` with topic pages, article pages (`-vhelNNN` suffix), and a `Contact Us` page. Legacy: `help.venmo.com/hc/en-us/articles/NNNNNN-Title-Case-Slug`, still linked from live pages.

**Topic pages are client-rendered and return no article list** `[observed]`. Every topic URL fetched (`security_privacy`, `troubleshooting`, `disputes`, `payments_transfers`) returned the identical nine-item `Featured Articles` block plus the ten-topic sidebar. For an unauthenticated crawler — and for any user with JavaScript disabled — the help centre has **no browsable article inventory**. The featured list is also not topic-scoped: the Disputes topic page surfaces `Venmo Tax FAQ` and `Venmo Debit Card Shipping & Arrival Time`.

**Article-title grammar — five shapes**

| Shape | Example |
|---|---|
| Bare noun phrase | `Cancel Payment` · `Frozen Account` · `Opening a Dispute` · `Transaction History` |
| `What do I do if…?` | `What do I do if there's an unauthorized charge on my account?` |
| `What should I do if…?` | `What should I do if I am not satisfied with a Venmo Debit Card purchase?` |
| First-person statement | `I accidentally paid a stranger on Venmo` |
| Quoted-state title | `My personal Venmo payment is "Pending"` |

`I accidentally paid a stranger on Venmo` is the Wise-style confession title and is the only one in the featured set. `My personal Venmo payment is "Pending"` is the more characteristic Venmo move — **the status word is quoted inside the title**, signalling that the article exists because the word itself is the problem.

The redundancy between `What do I do if…` and `What should I do if…` for adjacent problems is a consistency gap.

**Routing furniture** `[observed]`: every article ends with the same chat path and the same fallback sentence — "You can check out **Connect with Support** on the Contact Us page for other options." Then a five-item `Related Articles` block. Human contact is offered first (chat), not last — the inverse of Wise's ordering, and consistent with a product whose support driver is account freezes.

## T12 FAQs

**Placement:** three-question accordion at the foot of the how-it-works page, under `Frequently asked questions`. Answers are present in server HTML (unlike Wise).

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | How much does it cost to send money with Venmo? | Balance, linked bank and debit are free; 3% on linked credit card; no monthly or signup fee; links to the fee page. |
| 2 | Can I control who can see my Venmo transactions? | Yes; names `Public`, `Friends`, `Private`; explains the scope of each in one clause; closes with the more-restrictive rule. |
| 3 | What are Venmo Groups and how do they work? | Describes shared-expense groups: create, add expenses over time, adjust shares, Venmo computes the settle-up. |

Three questions is a short FAQ, and the ordering is `cost → privacy → group feature`. Privacy occupies one of three slots, again confirming its status as a first-order objection rather than a settings topic. Q1 is a price objection, Q2 is a trust objection, Q3 is feature explanation — objection, objection, then sell.

The Purchase Protection page carries a **second, larger FAQ set duplicated across two audience tabs** (`I'm a buyer` / `I'm a seller`), with four of the six questions identical in wording between tabs but answered differently: `What is Purchase Protection?` · `What issues could Purchase Protection help me with?` · `How do I file a Purchase Protection claim?` · `Where do I go if I have more questions?` The last two receive **identical answers in both tabs** — a duplication that makes the tab split feel less earned than it looks.

## T13 Terminology & glossary

| Term | Venmo's usage | The alternative it rejected |
|---|---|---|
| `Take Back` | Recovering an unclaimed pending payment | "Cancel", "Recall", "Reverse" |
| `Me` | The account tab | "Account", "Profile", "You" |
| `Venmoji` | Branded emoji for payment notes | "emoji" |
| `Venmo Groups` | Shared-expense container | "Split group", "Pot" |
| `Stash` | The rewards programme | "Rewards", "Cashback" |
| `payment note` | The free-text message on a payment | "memo", "description", "reference" |
| `Program Banks` | The FDIC pass-through structure | "partner banks", "sponsor bank" |
| `personal payments` vs `goods and services` | The two payment types, with different fees and different protection | "P2P" vs "commercial" |
| `business profile` / `charity profile` | Account variants | "merchant account", "nonprofit account" |
| `creates a loss on your Venmo account` | Euphemism for "you now owe Venmo money" | "negative balance", "debt" |
| `Purchase Protection` | The buyer/seller scheme | "Buyer Protection" (PayPal's older term) |
| `Connect with Support` | The contact-route heading | "Contact us" |
| `Restore your account` | Unfreezing CTA | "Reactivate", "Appeal" |
| `Find Me` | Discoverability setting | "Searchability", "Who can find you" |

### The privacy-label inconsistency — three surfaces, three sets of labels `[observed]`

This matters more than the individual terms, because privacy is this product's benchmark strength.

| Surface | Labels used |
|---|---|
| How it works (venmo.com/send-receive/start) | `Private` · `Visible to friends` · `Public` |
| How-it-works FAQ (same page) | `Public` · `Friends` · `Private` |
| Help: Manage your Venmo privacy settings (vhel351) | `Public` · `Friends only` · `Private` |
| Help: Changing Payment Privacy (vhel191) | `Public` · `Friends` · `Private` |

The middle value has **three different labels** — `Visible to friends`, `Friends`, `Friends only` — and two of them appear on the same page. The ordering also flips between the step copy and the FAQ directly below it. For the product most publicly scrutinised over its privacy defaults, a three-way label drift in the core control vocabulary is a material finding, and a cautionary one: the in-product label (whichever it is) has not been propagated to the pages that explain it.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout; first-person plural for the company, used freely in adverse contexts — "We may place restrictions", "we can help reverse the payment", "Venmo doesn't have visibility into the specific reason". The company stays a visible actor when delivering bad news, which is the right choice.

**Register gradient.** Playful at the top of the funnel (`Venmo everything`, `pep up your payment`, `Your rewards era`, `Don't stress out, check out`), flattening steadily toward the fee table and disappearing entirely in the FDIC paragraph. `Don't stress out, check out` is the only rhyme in the corpus and sits on a protection page, which is arguably one surface too deep for a joke.

**No `Oops!`.** Not one instance across all failure articles. Failure copy is declarative and unapologetic — "There isn't a way to cancel a payment once it's sent." No apology, no exclamation mark, no softening adverb.

**Emphasis convention.** Bold is used for in-app UI strings inside instructions (`Me`, `Settings`, `Get Help`, `Take Back`, `Submit Issue`), which is a consistent and screen-reader-friendly convention across articles. All-caps is reserved for exactly one word (`ONLY`) on exactly one warning.

**Numbers as trust devices** are largely absent — Venmo does not quote user counts, review scores, or fraud-team sizes on the pages harvested. The one quantified claim is `up to 5% cash back` with an immediate spend condition: "5% requires $1,500 in qualifying monthly spend."

**Accessibility** `[observed]`
- No accessibility statement was found on any venmo.com surface harvested. The Venmo footer routes to PayPal-level pages for legal but no Venmo accessibility page surfaced. `[absent]`
- Alt text on the marketing pages was not present in the fetched markup for most images; decorative images returned empty.
- The Contact Us page and phone number (1-855-812-4430) are published on the fee page as part of the prepaid disclosure, which incidentally makes a phone route discoverable without login.
- Deaf/hard-of-hearing or non-English routing: a Spanish help path (`help.venmo.com/hc/es`) is linked from the trust-and-safety page, but the link points at the **legacy** `/hc/` pattern while the English help centre has moved to `/cs/` — a likely broken or stale localisation route. Flagged as suspected, not confirmed.

**Negative findings, recorded honestly**
- `venmo.com/about/security` states Venmo offers no buyer or seller protection, contradicting two other live pages. Most serious defect found.
- Privacy value labels differ across three surfaces; the "friends" value has three labels.
- Help topic pages return no article list without JavaScript; featured articles are not topic-scoped.
- Legacy `/hc/` and current `/cs/` help URLs are cross-linked in production; at least one legacy link carries a superseded article title.
- `Venmo online, instores, & more` — missing space in a top-level IA scope line.
- "No fee to setup an account" — `setup` used as a verb in the first row of the fee table.
- "buying and or selling" — missing slash or comma in a homepage legal footnote.
- `Apply now` shipped as a bare, object-less CTA in a credit-product context.
- `See terms and limitations` used four times as identical link text on one page, pointing at the same anchor — a screen-reader link-list would show four undifferentiated entries.

---

## Transferable patterns

1. **`Take Back` over `Cancel`.** When the system state is "money left but has not landed", name the action as retrieval, not as cancellation. Condition: only works where the funds genuinely return to source; using it where the money is irrecoverable would be a lie. Directly relevant to PayPal unclaimed-payment and pending-transfer copy.
2. **Put the privacy control inside the task, not in settings.** Venmo's three-step how-it-works spends step three on `Control` and names the privacy values inline. Any product where a user action has an audience should name the audience at the moment of the action.
3. **`What it might sound like:`** — give the user a scripted sample of the attacker's voice, not just a rule. Strongest fraud-recognition pattern in this batch. Condition: requires legal comfort with publishing plausible scam scripts.
4. **Disclose the absence of predatory fees as line items.** `Transaction declines due to insufficient funds — $0.00` and `Customer service (live agent) — $0.00` convert a non-fee into a disclosed trust signal. Cheap to do, and only possible if you actually don't charge.
5. **Scenario-routed recovery articles.** Instead of one answer, key the article on what the user did (`Payment sent to wrong friend`, `Accidental duplicate payment`), and allow "ask the other person" to be a legitimate published remedy where the product genuinely does not intervene.
6. **Write a help section for the user who already contacted you.** `Already contacted us?` — "We're actively reviewing your account and will email you as soon as there's an update." Deflects the second contact without appearing to.
7. **Admit the limits of your own visibility.** "Venmo doesn't have visibility into the specific reason your transaction failed, your bank should be able to tell you exactly why." Honest, and routes the user to the system that can actually answer.
8. **Negative pattern to avoid:** do not let a legacy security page outlive the protection product it describes. Audit protection claims across all surfaces whenever coverage changes.

## Caveats & gaps

- **Help topic inventories not retrievable.** Topic pages are client-rendered; the full article list per topic is unavailable without a browser-rendered pass. Article titles cited here come from featured lists and related-article blocks, so the sample is skewed toward high-traffic articles.
- **All in-product strings are `[documented]`, not observed.** Status names, button labels, and validation text are reconstructed from help-article prose. Where an article bolds a UI string it is likely accurate; where it paraphrases, it may not match the shipped label — the privacy-label divergence (T13) is direct evidence that help copy and product copy have drifted.
- **Empty states entirely unreachable.** `[absent]`
- **No accessibility statement found** on venmo.com. Either it does not exist or it lives on a PayPal-level page not reached in this harvest.
- **Spanish-locale help not harvested**; the one link found points at the legacy URL pattern.
- **Mobile app copy out of scope** — Venmo is app-first and the majority of its interface was not observable.
- **Teen Account, Venmo Groups, business profile, and Tax Center surfaces unharvested.**
- The Venmo Credit Card rates table is dated "accurate as of June 27, 2024"; figures quoted from it may be stale relative to the 2026 harvest date and are recorded as published, not as current.

## Sources

1. https://venmo.com/
2. https://venmo.com/send-receive/start
3. https://venmo.com/resources/our-fees
4. https://venmo.com/about/security
5. https://venmo.com/about/us/trust-and-safety
6. https://venmo.com/purchaseprotection
7. https://help.venmo.com/cs/home
8. https://help.venmo.com/cs/articles/manage-your-venmo-privacy-settings-vhel351
9. https://help.venmo.com/cs/articles/changing-payment-privacy-hiding-past-payments-vhel191
10. https://help.venmo.com/cs/articles/common-scams-on-venmo-vhel167
11. https://help.venmo.com/cs/articles/my-personal-venmo-payment-is-pending-vhel276
12. https://help.venmo.com/cs/articles/payment-declined-vhel228
13. https://help.venmo.com/cs/articles/cancel-payment-vhel148
14. https://help.venmo.com/cs/articles/frozen-account-vhel251
15. https://help.venmo.com/cs/articles/temporarily-frozen-account-from-failed-payments-vhel296
16. https://help.venmo.com/cs/articles/opening-a-dispute-vhel113
