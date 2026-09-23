# 042. Revolut

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Neobank / super-app (banking + FX + investing + crypto + eSIM + travel) |
| Primary URL | https://www.revolut.com/ |
| Corpus rank | 042 |
| Benchmark strength (source list) | Action-first financial labels |
| Locale / market observed | en-GB (primary); en-US (`/en-US/`) sampled for regulatory contrast |
| Platform observed | Web (desktop marketing), help centre, legal pages, status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Entity-split, stated in every page footer.** `Revolut Bank UK Ltd` — "Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and Prudential Regulation Authority (Financial Services Register No. 981170)"; FSCS protection stated as "up to £120,000 per person". `Revolut Ltd` — FCA-authorised e-money and payment services under the Electronic Money Regulations 2011 (FRN 900562), plus FCA cryptoasset registration under MLR 2017. `Revolut Trading Ltd` — FCA FRN 933846. Commodities explicitly carved out: "not regulated by the Financial Conduct Authority… not protected or covered by the Financial Ombudsman Service, or the Financial Services Compensation Scheme". **US is a different posture entirely**: "Revolut is not a bank"; cards issued by Lead Bank, Member FDIC; savings via Cross River Bank / Sutton Bank; Revolut Securities Inc. member FINRA/SIPC; Revolut Wealth Inc. SEC-registered adviser. |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — all marketing/help/legal pages fetched cleanly. In-product strings are `[documented]` only. Status-page severity labels render client-side (only the aggregate headline was in server HTML). No Revolut accessibility *statement* page exists; accessibility content lives inside the vulnerability page. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home (UK) | https://www.revolut.com/ | Hero, feature sections, plan strip, full legal footer |
| Home (US) | https://www.revolut.com/en-US/ | Different value prop, different regulatory stack |
| Compare plans | https://www.revolut.com/our-pricing-plans/ | Five-tier fee/benefit matrix, ~30 footnoted rows |
| Help centre home | https://help.revolut.com/help | 14 top-level topics, 3 promoted articles each |
| Help: Transfers | https://help.revolut.com/help/transfers/ | 9 sub-sections, ~55 article titles — richest error/status source |
| Help: Card payments and cash withdrawals | https://help.revolut.com/help/card-payments-withdrawals/ | 6 sub-sections, ~45 article titles |
| Help article: transfer declined | https://help.revolut.com/help/transfers/outbound-transfers/having-an-issue-with-sending-money/whys-my-transfer-been-declined/ | Full decline-reason taxonomy |
| Fraud and scams | https://www.revolut.com/about-fraud-and-scam/ | Scam typology table, four-signal checklist |
| How we protect your money | https://www.revolut.com/how-we-keep-your-money-safe/ | Revolut Secure, FSCS line, feature naming |
| Complaints Policy | https://www.revolut.com/legal/complaints-policy/ | Timelines, FOS escalation, CIFAS marker route |
| Life Challenges & Wellbeing | https://www.revolut.com/customer-vulnerability/ | Vulnerability, gambling block, accessibility commitments |
| System status | https://www.revolut.com/system-status/ | 28 named services |

---

## T1 Navigation & IA labels

**Global nav — audience-first, four items only** `[observed]`

`Personal` · `Business` · `Kids & Teens` · `Company`, with `Log in` / `Sign up` at the right. Note `Kids & Teens` sits at the same level as `Business` — a demographic segment promoted to top-level IA alongside a customer type.

**Footer is grouped by *what money does*, not by product family** `[observed]`

`Crypto` · `Mobile & Connectivity` · `Investments` · `Company` · `Global Finances` · `Revolut AI` · `Help` · `Security & Protection` · `Plans` · `Accounts` · `Smart Spending`

`Smart Spending` and `Global Finances` are the two that carry the most weight — `Smart Spending` holds `Cards`, `Send & Receive`, `Money Management`, `RevPoints`, `Linked Accounts`, `Shops`. The grouping names are evaluative adjectives (`Smart`, `Global`) rather than neutral categories, which is unusual in a footer.

**`Security & Protection` is a first-class footer group** `[observed]`, containing five links that are all imperative or descriptive of *actions and artefacts*, not features:
`How We Protect Your Money` · `Report Lost Device` · `Learn About Fraud & Scams` · `Security Bugs` · `Consumer Security Insight Report`

`Report Lost Device` in a marketing footer is a notable choice — an emergency task placed where a logged-out, panicking user can reach it.

**Help centre top level — 14 topics** `[observed]`

`Profile` · `Plans and benefits` · `Security and fraud` · `Cards` · `Card payments and cash withdrawals` · `Accounts` · `Transfers` · `Crypto` · `Adding money` · `Invest` · `Credit and loans` · `RevPoints` · `Insurance` · `Referrals` · `Other topics`

Two structural observations. First, `Cards` and `Card payments and cash withdrawals` are **separate top-level topics** — the object and the activity are split, which is an unusual and arguably confusing division (card ordering vs card spending). Second, each topic card promotes exactly three articles then `View all`, so the home page doubles as a most-common-problems index rather than a pure taxonomy.

**Help sub-section names inside `Transfers`** `[observed]`

`Bank transfer basics` · `Bank transfer not received` · `Other issues with bank transfers` · `Transfers between Revolut customers` · `Sending a transfer to a card number` · `Group Bills` · `Payment links` · `Scheduled transfers` · `More help with transfers` · `Transfers in other countries & currencies`

`Bank transfer not received` is promoted to **sub-section level, not article level** — the single most common failure gets its own branch of the tree. Compare Wise's `Where is my money?`: Revolut states the same concept in system language rather than the user's voice.

## T2 Value proposition & headline patterns

**UK hero** `[observed]`

> Headline: `Banking & Beyond`
> Subhead: "This is your bank, redefined. Get powerful daily banking and global freedom. Sign up for free in a tap."

**US hero** `[observed]`

> Headline: `Change the way you money`
> Subhead: "Home or away, local or global — move freely between countries and currencies. Sign up for a Standard account with no monthly fees."

The US headline verbs the noun (`you money`); the UK headline does not. Same brand, two different levels of linguistic risk — and the market where Revolut *is not a bank* is the one that gets the playful line, while the market where it holds a banking licence gets the sober `Banking & Beyond`.

**Section headers follow a two-noun collision pattern** `[observed]`

`Your salary, reimagined` · `Life, meets savings` (UK) / `Life, meet savings` (US) · `Elevate your spend` · `Go virtual` · `Your money's safe space` · `Ask, and AIR makes it happen` · `Explore 5,000+ stocks and ETFs`

`Life, meets savings` is a **grammatical error in the UK copy** — the US variant `Life, meet savings` is the correct imperative/introduction form ("Reader, meet savings"). The UK page conjugates it as a third-person verb, breaking the construction. Recorded as an observed defect.

**Security/plan headlines use rhythmic fragments** `[observed]`

`Security you can bank on` · `Looking for a sign? This is it` · `Secure from the second you sign up` · `A-list algorithms that make spending (even) safer` · `Superpowers for spending online` · `Nothing to see here` · `Cards that freeze, fast` · `Safe, even when you're sleeping` · `Know if it's really us`

`Nothing to see here` is the header for the numberless card. `Cards that freeze, fast` uses comma-for-emphasis rather than an adverb clause. This register is dense with wordplay in a way the fee tables never are.

**Plan naming is a ladder of nouns with a benefit clause** `[observed]`

| Plan | Price | Positioning line (verbatim, shortened) |
|---|---|---|
| `Standard` | `Free` | "For the financial basics…" |
| `Plus` | `£3.99/month` | "For the smart spender…" |
| `Premium` | `£7.99/month` | "For elevating every day…" |
| `Metal` | `£14.99/month` | "For the global travellers and traders…" |
| `Ultra` | `£55/month` | "For those seeking the best of Revolut…" |

Every tier line starts with `For` + a persona noun phrase. The persona, not the feature, is the differentiator in the label.

**Pricing page hero** `[observed]`: `Choose your perfect plan`, with `Plans comparison` as an eyebrow and the immediate disclosure link `Paid Plan Terms apply.`

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav | |
| `Log in` | Global nav | |
| `Download the app` | Hero, and repeated at page foot | The primary conversion is an app install, not an account |
| `Move your salary` | Salary section | **Verb + the user's own asset** — not "Switch accounts" |
| `Explore Savings` | Savings section | |
| `Start earning` | RevPoints section | Present participle framing of benefit |
| `Create a card` | Virtual cards | |
| `Learn more` | AIR, Revolut Secure | Bare `Learn more` does appear — unlike Wise |
| `Try it out` | Stocks, Robo-Advisor | Low-commitment framing for a regulated product |
| `Join Revolut` | Security page | Membership framing instead of account framing |
| `Bank with peace of mind` | Security page | Verb `bank` + emotional object |
| `Pick your plan` | Pricing hero | |
| `Get` | Each plan column in the comparison table | **One-word CTA** — the column header supplies the object |
| `Report fraud` | Fraud page, security page | |
| `Report a scam` | Security page | Separate label from `Report fraud` — matches their own fraud/scam distinction |
| `Take the test` | Fraud page (Fraud 101), vulnerability page (debt, mood, GamCare tests) | Reused across three very different contexts |
| `Visit Help Centre` | Fraud page | |
| `Contact us` | Security page, complaints | |
| `Start budgeting` | Vulnerability page | |
| `Compare Plans` | Footer | |
| `View all` | Every help-centre topic card | |
| `Download PDF` | Complaints Policy | Regulatory artefact offered as a download |
| `History` | Complaints Policy, beside the title | Version history of a policy, exposed to users |

**Observation.** `Get` as a standalone CTA in the plan table is the most economical label in the file — it works only because it sits directly under a column headed `Metal£14.99/month`. It is also the label that would fail hardest out of context for a screen-reader user moving by button list.

**`Report fraud` vs `Report a scam`** are deliberately distinct, because the page above them defines the two terms differently (see T13). Most products collapse these.

## T4 Onboarding & getting-started

`[documented]` / `[observed]` mix. Revolut does not publish a numbered signup walkthrough on the marketing site; onboarding is named inside the help IA and inside recovery flows.

**Help-centre onboarding entry points** `[observed]`
`Getting started with Revolut` · `What is Revolut ID?` · `Submitting requested documents` · `Crypto account onboarding requirements` · `Glossary of onboarding terms` · `What does the new crypto onboarding flow consist of?`

Two things stand out. First, `Glossary of onboarding terms` — Revolut ships a **glossary specifically scoped to the onboarding flow**, an admission that the crypto KYC vocabulary is opaque. Second, `Submitting requested documents` is phrased as the user's task even though the request originates from Revolut; the passive-voice `requested` avoids naming who is asking.

**The most complete step sequence on the public site is a *recovery* flow, not a signup flow** `[observed]` — from the fraud page, under `My account has been compromised`:

1. "Head to the app's login screen and enter the phone number associated with your Revolut account."
2. Select `Forgot your passcode?`
3. "Verify your identity with a quick photo."
4. "You'll then be able to create a new password."

Followed by a cascading fallback ladder under `If this doesn't work:` — selfie fails after 4 submissions → partial physical card number → submit ID → manual verification by the team → open a chat. Five successive fallbacks, each naming the exact trigger for the next.

**Pattern worth stealing:** publish the *failure ladder*, not just the happy path. Most products document step 1-4 and stop; Revolut documents what happens at each rung of degradation, including "If all else fails".

**Post-signup immediacy is the recurring onboarding promise** `[observed]`: "Create and add virtual cards to your Apple Wallet or Google Wallet to start paying right away." and, on the security page, "Your physical card must be activated in your app. That's the only place your PIN is available, too."

## T5 Form & field labels

`[absent]` for in-product forms — everything is behind the app. What is observable pre-auth:

**Plan-comparison row labels double as field-like descriptors** `[observed]`

`Fee-free ATM withdrawals` · `Save on international transfer fees` · `Currency exchange with no additional fees` · `Additional weekend currency exchange fees` · `Commission-free trades` · `Commodities services costs` · `Savings Account (GBP)` · `Airport lounge access` · `Brand subscriptions included`

Each row carries a **sub-label explaining the mechanism** before the per-tier values, e.g. under `Fee-free ATM withdrawals`: "A fee of 2% (or minimum fee £1) applies per transaction after your rolling monthly limit, with no withdrawal fees charged by us". The qualifier "charged by us" is doing precise work — it scopes the claim to Revolut's own fee and leaves ATM-operator fees outside.

**Complaints email intake — an explicit five-item field list** `[observed]`

> "Your full name; The phone number and email address associated with your account; What the issue is; When the problem arose; and How you'd like us to put the matter right for you."

The fifth item is the interesting one: `How you'd like us to put the matter right for you` asks the complainant to state their desired remedy. That is a field label most complaint forms omit, and it materially changes the interaction.

**Gambling Block is documented as a settings path** `[observed]`:
"From the Home screen, tap your profile icon in the top-left corner (your profile picture or initials) → 'Security' → toggle on Gambling Block."

## T6 Status & state language

**PRIORITY SECTION.** Revolut's transaction-state vocabulary is recoverable almost entirely from help-article titles.

**Named states, from help titles** `[documented]`

| State | Evidence (verbatim article title) |
|---|---|
| `pending` | `Why is my incoming transfer pending?` · `Why is my transfer to a bank account still pending?` · `My transfer to another Revolut customer is pending` · `Why is my card transfer still pending?` · `My card payment is pending` · `Why is my ATM withdrawal pending?` · `Why is my refund pending?` (in-URL) |
| `declined` | `Why has my card payment been declined?` · `Why was my ATM withdrawal declined?` · `Why has my card transfer failed or been declined?` |
| `failed` | `Why has my card transfer failed or been declined?` · `Insufficient funds for scheduled transfer` |
| `reverted` | `Why was the transfer to my account reverted?` · `Why was my outbound bank transfer reverted?` · `Why has my card payment been reverted?` |
| `returned` | in-URL for the outbound-reverted article (`why-was-my-outbound-bank-transfer-returned`) |
| `delayed (offline)` | `Delayed (offline) card payments` |
| `scheduled` | `Scheduled transfers` (sub-section), `Manage scheduled transfers` |
| `restricted` (account) | `My account has been restricted` |
| `compromised` (account) | `My account has been compromised` |

**`pending` appears in seven distinct article titles across five different rails.** That is the clearest possible signal that a single status word is carrying too much explanatory load. Revolut's response is not to rename the state but to ship a per-rail article for each instance — the same content-ops decision Wise makes, at larger scale.

**`reverted` is Revolut's distinctive state word** `[documented]`. Three separate articles use it (`transfer to my account reverted`, `outbound bank transfer reverted`, `card payment been reverted`), yet the URL slug for one of them says `returned`. So the user-facing label is `reverted` and the internal/legacy label is `returned` — a live inconsistency visible in the URL layer. `reverted` is also a poor plain-English choice: money is *returned*, code is *reverted*.

**System status vocabulary** `[observed]` — headline reads `All systems are operational`, over 28 named services:

`Sign up` · `Sign in` · `Card payments` · `Topping up via bank card` · `Transfers` · `ATM withdrawals` · `Currency exchange` · `Stock trading` · `Identity verification` · `Live support chat` · `Revolut website` · `Internal transfers` · `Cryptocurrency` · `Vault access` · `Card order` · `Card details view` · `Sign-up for Business` · `Log-in for Business` · `Business transfers out` · `Business API` · `Business mobile app` · `Business web app` · `Merchant API payments` · `Merchant Payment` · `Sandbox environment` · `Premium` · `RevPoints`

The service names are **user tasks, not infrastructure** — `Card details view`, `Topping up via bank card`, `Identity verification`. A user can map an error they just hit onto a status line without knowing anything about Revolut's architecture. `Vault access` persists as a status line even though `Vaults` has been superseded by `Savings` in the marketing copy — a stale term surviving in the status surface.

**Timing language** `[observed]`: `in a tap` · `in seconds` (`We freeze out thieves in seconds`) · `immediately` · `24/7` · `instant` ("Activating the gambling block is instant, but it takes 48 hours to be disabled"). That last one is the best timing sentence on the site: a **deliberately asymmetric delay, stated plainly, with the friction on the dangerous direction.**

## T7 Error, failure & recovery

**PRIORITY SECTION.** This is Revolut's deepest content layer.

**Declined-transfer taxonomy** `[observed]` from the article titled `I can't send a transfer or create a recipient`. Three grouped headings, each with named causes:

*`Possible reasons for failed transfers`*
- "Compliance reasons: Revolut must complete necessary checks in accordance with the law to validate the security of the transfer process"
- "Locked or unverified account: if your account has restrictions or is not verified, transfers may be declined."
- "Insufficient funds: standing orders (recurring transfers) commonly face this problem."

*`Problems with the recipient account or details provided`* — `Unsupported recipient`, `Incorrect recipient details`, `Recipient account closed`.

*`I can't create a recipient`* — `Account number is invalid`, `Postal code or address isn't valid`, `IBAN is invalid`, each with a one-clause fix ("reach out to the recipient to double-check their details", "change the postal code to a correct one").

Two content decisions worth extracting. First, the **reassurance sentence is placed immediately after the failure list, not at the end**: "If the transfer failed, the funds haven't left your account, and you won't need to wait for their reversal. They should be available instantly." The user's real question — *where is my money right now* — is answered before the causes are elaborated. Second, the causes are written as **label + colon + explanation**, so a scanning user gets the diagnosis from the bolded label alone.

**The error-article title grammar is four-shaped** `[documented]`

| Shape | Examples |
|---|---|
| `Why …?` (adverse outcome) | `Why did I receive less money?` · `Why did my recipient receive less money?` · `Why was I charged extra?` (pattern) · `Why was my transfer sent via an intermediary bank?` · `Why did my payment amount change?` · `Why was my card payment declined if I have enough funds?` · `Why aren't my contactless payments working?` · `Why haven't I received my Referrals reward?` |
| `I <did / want / can't>` (first person) | `I want to cancel a bank transfer` · `I sent a transfer to the wrong Revolut customer` · `I can't send a transfer or create a recipient` · `I'm unable to send money to another Revolut customer` · `I received a transfer from an unknown sender` · `I was asked for additional information about my transaction` · `I lost access to my passkey` · `I was invited and I need help` |
| Noun-phrase problem | `Bank transfer not received` · `Other issues with bank transfers` · `Issues with my card` · `Lost or stolen cards` · `Problems with a refund` · `Difficulty joining a group` · `Declined card payment isn't visible` · `Insufficient funds for scheduled transfer` |
| Task | `Locate a bank transfer sent to my Revolut account` · `Dispute a card payment` · `How to cancel a dispute` |

`Why did I receive less money?` **paired with** `Why did my recipient receive less money?` is the standout pair — the same event written twice, once from each side of the transfer. Very few help centres bother to write the counterparty's version.

`I was asked for additional information about my transaction` is a first-person title for something *Revolut* did to the user. The construction keeps the user as grammatical subject even when they are the object of the action — worth flagging as a deliberate voice choice rather than an accident.

**Four adverse-state triage cards, repeated verbatim on two pages** `[observed]` (fraud page and security page), each headed in the first person:

`I've spotted a suspicious transaction` · `I think I've been a victim of a scam` · `My phone has been stolen` · `My account has been restricted` · `My account has been compromised`

Each card gives: the immediate action first, then the mechanism, then a CTA. Example, `My account has been restricted`: "If your account is temporarily restricted, provide any information we request in-app, as this will help resolve the issue much faster." — the recovery instruction leads, the explanation of *why* the restriction exists is never given on this surface (it is deferred to a blog post, `Why does Revolut restrict accounts?`). **Deferring the "why" of an account restriction to a blog rather than a help article is a notable gap.**

**Dispute lifecycle is named and exposed** `[documented]`:
`Dispute a card payment` · `Update on my chargeback case` · `How to cancel a dispute` · `Dispute process and timelines` · `Problems with a refund`

`Update on my chargeback case` written as a **noun phrase the user would type into search** rather than "Checking your dispute status".

**Decline-cause specificity** `[documented]`: `My card payment was declined by the security system` and `What is the location-based security feature?` (URL slug: `payment-declined-due-to-geolocation-mismatch`) — Revolut writes a dedicated article for the case where *its own* fraud system caused the decline, and names the feature responsible. That is unusually candid: most issuers hide behind "your bank declined this".

**Complaint failure path** `[observed]` — the Complaints Policy opens by trying to *deflect* the complaint into chat, in bold:
"If you'd just like to speak to someone about an issue that's concerning you, please contact us through the Revolut app (Profile Icon→Help)… We can usually settle matters quickly through the app."
Then the formal routes. Then timelines, then FOS. The deflection is transparent rather than hidden, and the phrase `an issue that's concerning you` is softer than "a complaint" — it gives the user permission to raise something without escalating it.

## T8 Empty states

`[absent]` on public surfaces. The status page's zero-incident state is the only observable one: `All systems are operational` — a full sentence with `are`, rather than the terser "All systems operational" most status pages use.

Everything else is behind auth.

## T9 Notifications & system messages

`[documented]` and `[observed]` mix.

**In-app warning copy is described but not quoted by Revolut itself** `[observed]`, on the fraud page:
"If a transfer looks suspicious, we'll provide in-app warnings. Please take these seriously."
and on the security page: "If we send you a fraud or scam warning, take note, take action, then breathe easy."

`take note, take action, then breathe easy` is a three-beat instruction that ends on reassurance. The construction — two imperatives then a permission — is the house pattern for security copy.

**The call-verification banner** `[observed]`, under the heading `Know if it's really us`:
"Our in-app banner lets you confirm every call is from us, stopping fraudsters in their tracks. If the call is fake, the warning is real."

`If the call is fake, the warning is real` is the single best line of copy on the Revolut site — a chiasmus that carries the whole feature.

**The shield as a persistent status signal** `[observed]`: "When you see the shield, it's a reminder that we're active." and `Looking for a sign? This is it`. Revolut has turned an ambient icon into a named notification channel (`Revolut Secure`).

**Pre-emptive scheduled-payment warning** `[documented]`: "If you don't have enough funds, you should receive a notification 24 hours before the scheduled payment which will remind you to add money in time for the payment." A named lead time attached to a named failure mode.

**Named notification-adjacent articles** `[documented]`: `Messages`-style routing is not exposed publicly, but `Report a card payment as a scam or fraud`, `Report a fraudulent transfer`, and `Block or report another Revolut customer` all exist as user-initiated message flows.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

**Entity disclosure is repeated in full on every single page footer** `[observed]` — home, pricing, help centre, help article, status, complaints. Four paragraphs naming four entities and their distinct permissions. The structure is always: bank entity first (PRA/FCA, FSR 981170) → e-money entity (EMR 2011, FRN 900562) → crypto registration (MLR 2017) → **the carve-out** ("Commodities services are provided by Revolut Ltd and are not regulated by the Financial Conduct Authority") → investment entity (FRN 933846).

**The carve-out is the interesting part.** Revolut states what is *not* covered in the same breath as what is, and repeats it in a second, stronger form on the pricing page footnote:

> "Revolut Ltd's commodities service is not regulated by the FCA and it is not protected or covered by the Financial Ombudsman Service, or the Financial Services Compensation Scheme."

Both the ombudsman and the compensation scheme are named as *absent*. That is the correct construction and a directly transferable pattern: **name the specific protections that do not apply, rather than saying "unregulated".**

**FSCS statement** `[observed]`, on the security page under `Protect funds`:
> "As a bank, accounts are protected by the Financial Services Compensation Scheme (FSCS) with up to £120,000 per person."

It leads with the qualifier `As a bank` — the protection is presented as a *consequence of the licence*, not as a standalone feature. It links out to fscs.org.uk rather than to a Revolut-authored explainer.

**Which-entity routing is a user-facing FAQ** `[observed]`, linked from every footer:
`Which Revolut companies provide me with services?` — Revolut treats "which legal entity am I dealing with" as a supportable user question rather than a footnote.

**Fee disclosure structure on the plans page** `[observed]`

- Every comparison row carries a grey explanatory sub-line before the per-tier values.
- Fees are stated with both a percentage and a floor: `0.99% (minimum fee £1)`, `0.49% (minimum fee £1)`, `2% (or minimum fee £1)`.
- `Free` is used as an explicit cell value.
- Discounts are expressed as percentages off Revolut's own fee, with the scope named: `20% discount`, `40% discount`, "Discounts on fees charged by us".
- Limits are expressed as rate-plus-window: `£200/month or 5 withdrawals`, `£1,000/month limit, Mon-Fri`, `No fair usage limit`.
- **`Fair usage` is a named, defined concept** with its own footnote: "each month you can exchange Currency, Crypto, and Commodities up to a combined limit of £1,000. If you exceed the limit, we charge an additional fair usage fee of 1% for Standard customers, and 0.5% for Plus customers on any exchange in addition to regular fees or weekend mark-ups."
- **`weekend mark-ups` are disclosed as their own row**: `Additional weekend currency exchange fees` — `1%` / `0.5%` / `No fees`. Most FX products bury weekend spread; Revolut gives it a table row.

**Benefit-value claims are footnoted with a methodology** `[observed]` — the "worth £9,000 a year" style claims carry a ~200-word footnote explaining exactly how the number was derived: retail prices of fixed benefits summed, plus modelled fee savings versus Standard, "using data from customers using that specific benefit", calculated over a named window ("between October 2025 and April 2026"). **Publishing the calculation method for a marketing number is a genuinely reusable compliance-UX pattern** — the claim, the method, and the date range in one place.

**Interest disclosure** `[observed]`: AER is expanded and explained inline every time ("The Annual Equivalent Rate (AER) shows the interest you can earn over 1 year. AER is compounded, so you'll earn interest on interest already earned"), and the tiering is stated as a blend, not a headline: "Interest is paid at 4% AER (variable) on balances below £200,000, and 3.51% AER (variable) on balances above £200,000. A blended rate applies when your balance exceeds £200,000."

**Investment risk disclosure** `[observed]`: `Capital at risk.` used as a standalone two-word sentence next to CTAs, expanded into the full non-advised/execution-only paragraph in the footer. US equivalent: `Brokerage Products: Not FDIC Insured • No Bank Guarantee • May Lose Value` — the mandated three-part bullet, rendered with interpuncts.

**US "what we are not" statement** `[observed]`: "Revolut is not a bank. Savings account services provided by Cross River Bank, Member FDIC, insured up to $250,000." Placed directly under the savings APY claim, not in the footer. The negation sits adjacent to the claim it qualifies.

**Complaints timelines, stated as maxima** `[observed]`

- Acknowledgement: "we'll acknowledge your complaint within three business days"
- "Payment services-related complaints will generally take up to 15 business days or, in exceptional circumstances, 35 business days."
- "Non-payment related complaints may take up to eight weeks."
- Final response letter contents enumerated: "A summary of events; Details of our investigation; Our view and decision; and If applicable, information on how to refer your complaint to the Financial Ombudsman Service."
- FOS window: "within 6 months from the date we sent (or should have sent) our final response" — note `(or should have sent)`, which protects the user against Revolut's own failure to respond.
- CIFAS marker disputes get their own named route and SLA: "Our team aims to review your request in 5 business days and issue a Final Decision letter."

**Named disclosure topics in help** `[documented]`: `How do regulatory limits affect my usage?` · `What is Dynamic Currency Conversion (DCC)?` · `Which merchants are not supported by Revolut?` · `Can I cover intermediary bank fees upfront?` · `Trading orders execution, fees and limits` · `What fees will I be charged for my trading?`

`How do regulatory limits affect my usage?` is the best of these — it frames a compliance constraint entirely in terms of the user's experience of it.

## T11 Help-centre architecture

Three levels: **topic → sub-section → article**, with the topic page promoting three articles plus `View all`.

**Header and search prompt** `[observed]`:
> `Need a hand?`
> "Just pop your question below to get an answer."

`Need a hand?` and `pop your question` are both colloquial British register at the top of a support surface. Compare the register of the same site's fee footnotes — the gradient is steep.

**Audience toggle inside help** `[observed]`: `Personal` / `Business` tabs sit above the topic grid, so the whole taxonomy switches rather than mixing business articles into consumer categories.

**Article-title grammar** — see T7. Across ~100 titles sampled, the dominant shapes are `Why …?`, `I <did/can't> …`, task-noun (`Card order and delivery`), and `How to …` / `How do I …?`. Revolut mixes `How to withdraw cash from an ATM` and `How do I withdraw cash?` (the second is the URL slug of the first) — **title and slug disagree**, another visible inconsistency in the layer between IA and content.

**`More help with …` as a terminal node** `[observed]`: `More help with transfers` · `More help with card payments` · `More help with Referrals` · `More help with a payment link` · `More help with a scheduled transfer`. A repeatable catch-all naming convention at the bottom of each branch — the structural equivalent of Wise's `Is there any other information I need to know?`

**`Other topics`** holds the emotionally heaviest articles, which is a questionable placement: `Reporting vulnerable circumstances to Revolut` · `Support if you're experiencing financial difficulties` · `I lost access to my passkey`. Vulnerability support is filed under a residual category.

## T12 FAQs

Revolut does not run a single FAQ block; questions are distributed. `[observed]`

**On the security/fraud pages, FAQ-like content is framed as definitions rather than questions:**

| Question (verbatim) | Answer, summarised |
|---|---|
| `What is fraud?` | Criminals obtain account or card details and transact without the user's knowledge. |
| `What is a scam?` | Criminals convince the user they are genuine, and the user hands over money or information. |

The two are set side by side under the heading `Fraud or scam?` with the rationale stated: "Understand the difference so you can report an issue efficiently and effectively." **The definitional distinction is justified by its operational consequence** — you will be routed differently.

**The four-signal scam checklist is written entirely as questions** `[observed]`, under `Look for the signs`:

1. `Do you feel rushed?`
2. `Is it out of the blue?`
3. `Is it too good to be true?`
4. `Are they reassuring?`

All four are second-person questions about the user's *own feelings and perceptions*, not about the scammer's behaviour. Q4 is the sophisticated one — it names reassurance itself as a warning sign, inverting the usual advice.

**Scam typology table** `[observed]` — nine named types, each with a concrete scenario:
`Purchase scams` · `Investment scams` · `Impersonation scams` · `Job scams` · `Romance scams` · `Delivery scams` · `Charity scams` · `Rental scams` · `Triangle scams`

The scenarios are dated and specific ("Cheap Taylor Swift tickets or a half-price phone found through social media?", "Found a nice flat on Airbnb, but your host insists on you paying by a bank transfer? Red flag."). Naming real platforms (Airbnb, Facebook-Marketplace-style offers) is a content-ops risk Revolut accepts for the sake of recognisability. `Triangle scams` is the one most users will not have heard of and it gets the longest explanation.

**Plans-page FAQ** `[absent]` — the comparison table carries footnotes instead of a Q&A block.

## T13 Terminology & glossary

| Term | Revolut's usage | The alternative it rejected |
|---|---|---|
| `RevPoints` | The loyalty currency, capitalised, camel-cased | "points", "rewards" |
| `Revtags` | Username-style payment handle | "@handle", "payment ID" |
| `Revolut Secure` | Umbrella brand for the whole security stack, with a shield icon | "Security centre" |
| `Street Mode` | Delays large transfers outside trusted locations | "travel mode", "location lock" |
| `Wealth Protection` | Biometric gate on investment withdrawals | "withdrawal lock" |
| `AIR` | "AI by Revolut, AIR, is your 24/7 personal assistant" — backronym, defined at first use | "Assistant", "Copilot" |
| `Gambling Block` | Title case, treated as a named product feature | "gambling restrictions" |
| `Group Bills` | Shared-expense product | "split the bill", "shared tab" |
| `Vault` / `Vault access` | Legacy savings container, now surviving only on the status page | superseded by `Savings` in marketing |
| `Spaces`-equivalent absent | Revolut uses `Savings`, `Pockets` not used | |
| `fair usage` | A named, defined fee threshold, not a vague policy | "soft limit", "excessive use" |
| `reverted` | Used for money that came back | `returned` (which survives in URLs) |
| `beneficiary` / `recipient` | **Both are used**, sometimes in adjacent articles: `Add, edit, or delete a beneficiary` sits in the same list as `What recipient account details do I need?`, and `My beneficiary has not received my card transfer` vs `I sent a transfer to the wrong Revolut customer` | Wise standardised on `recipient`; Revolut has not |
| `Linked Accounts` | Open-banking aggregation | "connected banks" |
| `Revolut Pro` | Freelancer account | "sole trader account" |
| `Trusted recipients` | Allow-listed payees | "whitelist" |
| `Kids & Teens` | The under-18 product family, top-level nav | "Junior" (which survives in URLs: `/revolut-junior/`) |
| `Life hurdles and wellbeing` | Page H1 for vulnerability support | the page `<title>` says `Life Challenges & Wellbeing`, the nav link says `Customer Vulnerability` — **three different names for one page** |

**The three-names-for-one-page finding is the sharpest negative in this file.** A user arriving from the footer link `Customer Vulnerability` lands on a page headed `Life hurdles and wellbeing` whose browser tab says `Life Challenges & Wellbeing`. The footer label is the institutional/regulatory term, the H1 is the human term, and the title tag is a third compromise. Whatever the intent, it breaks the link between click and destination.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, used assertively in adverse copy: "we verify identity quickly and thoroughly", "we'll take action immediately", "We freeze out thieves in seconds", "we may ask for documentation". Revolut does not hide behind the passive when describing its own enforcement actions — except in `Submitting requested documents`, where `requested` conceals the requester.

**Register gradient.** Steep and mostly deliberate:

- **Marketing / security features:** heavy wordplay — `A-list algorithms`, `Superpowers for spending online`, `Nothing to see here`, `Cards that freeze, fast`, `Safe, even when you're sleeping`, `Looking for a sign? This is it`.
- **Help centre chrome:** colloquial British — `Need a hand?`, "Just pop your question below".
- **Help article bodies:** flat, bulleted, label-colon-explanation. No jokes.
- **Fee tables and footnotes:** entirely neutral, heavily qualified.
- **Vulnerability, gambling, bereavement, financial abuse:** flat, clinical, and correctly so — "Financial abuse is a form of domestic abuse which involves controlling a person's ability to acquire and manage their own money." No metaphor, no reassurance flourish.
- **Complaints policy:** formal but readable, with one softening move (`an issue that's concerning you`).

The one place the gradient slips is the fraud page, where the scam typology uses light conversational openers ("Found a nice flat on Airbnb, but your host insists on you paying by a bank transfer? Red flag.") for content about people losing their savings. `Red flag.` as a two-word verdict is punchy but tonally adjacent to a listicle.

**Numbers as trust devices** `[observed]`: `80+ million customers`, `13 million in the UK`, `4.7 out of 5 on Trustpilot`, `more than 67.5 billion USD`, `£632 million` (fraud prevented in 2024), `more than 95% of attempted scams` detected, `Over 80% of payment fraud starts online`, `more than 10 features` in the security control centre. Most carry a hedge — `we estimate that`, `more than`, `up to`.

**Emergency contact surfaced in plain text** `[observed]`, on the vulnerability page: "We also have an automated phone number where you can block your card if it's been lost or stolen. This number is +44 2033 228352." A self-service emergency action reachable without the app, published on a marketing page.

**Signposting to third parties is extensive and unbranded** `[observed]` — StepChange, National Debtline, Citizens Advice, Refuge, Men's Advice Line, Women's Aid, Galop, Samaritans, Mind, SHOUT, Sane, GamCare, Gamblers Anonymous, Gordon Moody, FRANK, Release, Narcotics Anonymous, AA, Al-Anon, Action Fraud, Victim Support, Bereavement Advice Centre, Cruse, The Compassionate Friends. Each entry gives name, one-line scope, phone number, and URL in a consistent shape. The emergency instruction is unusually well written: "If you or your children are in immediate danger, call the police on 999. If you can't talk, call 999 followed by 55 to indicate you need help, but can't talk." — it anticipates the coerced-user case.

**Accessibility content** `[observed]` — there is **no dedicated accessibility statement page**. Accessibility is a section inside `Life hurdles and wellbeing`, headed `Impairments and disabilities`:

- "our app is fully compatible with screen readers"
- "On iOS, we support VoiceOver, and on Android, we support Talkback"
- Six claimed improvements, each rendered as image + caption: "Including clear labels and instructions with our forms" · "Providing text descriptions for images and videos" · "Ensuring you can navigate our site using just a keyboard" · "Making sure screen readers can access all our content" · "Not relying on shape, size, or colour alone to convey information"
- Phone assistance offered as an alternative channel.

**Accessibility defects observed on that very section:** the six claims are rendered as `<img>` elements whose **alt text is the claim itself**, duplicated by a visible caption — so a screen-reader user hears each claim twice. Two of the six images (`Including clear labels and instructions…` and `Making sure screen readers can access all our content`) are **repeated within the same carousel**, so those are heard four times. A page claiming "Not relying on shape, size, or colour alone" delivers its evidence as pictures of text.

**Other accessibility findings** `[observed]`:
- No `Skip to content` link was present in the fetched markup of the main marketing pages (Monzo and N26 both have one). Recorded as observed-absent rather than confirmed-missing, since the fetch is markdown-converted.
- Marketing hero and feature images across the home page carry **empty alt** (`![]`) even where they carry meaning (product screenshots of the savings UI, card designs).
- Award badges *do* carry descriptive alt: `#3 most downloaded finance app`, `4.7 out of 5 on Trustpilot`, `World's Best Digital Bank`, `Best International Payments Provider 2025`, `Consumer Guardian Badge 2025`. So the alt-text discipline is applied to trust marks and not to product imagery — an inverted priority.
- Content blocks are **duplicated in the DOM** for responsive variants (the `Life, meets savings` block appears three times consecutively; the security feature list appears three times). Screen-reader users may encounter each three times depending on CSS handling. Flagged as suspected, consistent with the markdown extraction.

**Negative findings, recorded honestly**

- `Life, meets savings` (UK) is grammatically wrong; `Life, meet savings` (US) is right.
- `Customer Vulnerability` (footer link) → `Life hurdles and wellbeing` (H1) → `Life Challenges & Wellbeing` (title tag).
- `reverted` (UI/article titles) vs `returned` (URL slug) for the same state.
- `How to withdraw cash from an ATM` (title) vs `how-do-i-withdraw-cash` (slug).
- `beneficiary` and `recipient` used interchangeably within the same help section.
- `Vault access` survives on the status page after `Vaults` was retired from marketing.
- `Cards` and `Card payments and cash withdrawals` as two sibling top-level help topics splits one mental model in half.
- The "why" of an account restriction is documented on the **blog**, not in help.
- `Report fraud` on the fraud page and `Report fraud`/`Report a scam` on the security page point to **two different form IDs** for what the copy describes as the same journey.

---

## Transferable patterns

1. **Name the absent protections, not just the absent regulation.** "not regulated by the FCA and it is not protected or covered by the Financial Ombudsman Service, or the Financial Services Compensation Scheme" is far more useful to a user than "unregulated". Directly transferable to any product with a mixed regulated/unregulated portfolio — crypto, commodities, gift balances, points.
2. **Publish the methodology behind a marketing number.** Revolut's "worth £9,000 a year" carries the full derivation, the data source, and the date window. If a claim survives that treatment it is defensible; if it does not, it should not ship.
3. **Asymmetric friction, stated plainly.** "Activating the gambling block is instant, but it takes 48 hours to be disabled." One sentence that discloses a deliberate dark-pattern-inverse. Applies to any protective toggle — spending limits, freezes, self-exclusion.
4. **Write the counterparty's version of the error.** `Why did I receive less money?` and `Why did my recipient receive less money?` as two separate articles. Condition: only worth it where the two parties have genuinely different information and different remedies.
5. **Publish the failure ladder, not just the happy path.** The account-recovery cascade (selfie → card number → ID → manual review → chat) names the trigger for each fallback. Users abandon at unexplained dead ends, not at long processes.
6. **Status-page service names should be user tasks.** `Topping up via bank card`, `Card details view`, `Identity verification` — a user can match their error to a line without understanding the architecture. Condition: it requires the status feed to be modelled on journeys rather than services, which is an engineering commitment, not a copy change.
7. **Justify a terminology distinction by its consequence.** `Fraud or scam?` is explained as "Understand the difference so you can report an issue efficiently and effectively" — the user is told *why* they should care about the taxonomy. Never ship a definitional pair without the operational reason.
8. **Ask the complainant what remedy they want.** "How you'd like us to put the matter right for you" as a required intake field reframes a complaint as a negotiation rather than a grievance.

## Caveats & gaps

- **All in-product states are `[documented]`, not observed.** Transaction statuses, toasts, validation errors, and empty states are reconstructed from help-article titles and bodies. No string in T6/T8 should be treated as an exact in-app label without an authenticated pass.
- **Status-page severity labels not captured.** The 28 service names were in server HTML; the per-service status chips (presumably `Operational` / `Degraded` / etc.) render client-side. Only the aggregate headline `All systems are operational` is verbatim.
- **Help-article bodies mostly unopened.** One article (`I can't send a transfer or create a recipient`) was read in full; the other ~150 are titles only. Titles are high-signal for IA and task phrasing but say nothing about answer structure or length.
- **Locale.** Everything except the US home page is en-GB. The en-US regulatory stack differs fundamentally (not a bank; sponsor banks; FINRA/SIPC) and the US marketing register is looser. Do not treat any UK string here as US precedent or vice versa.
- **No accessibility statement exists to harvest.** The accessibility claims quoted are from a section of the vulnerability page. There is no WCAG conformance level, no audit date, no feedback route, and no VPAT.
- **Mobile app copy out of scope.** Given that the primary CTA is `Download the app` and the product is app-only, the majority of Revolut's UX content is unreachable from the public web.
- **Business, Crypto, Invest, Insurance, RevPoints and Kids & Teens help topics were not opened.** Six of fourteen top-level help topics are unharvested.
- **Cookie/consent copy not captured** — the fetched markup did not include a consent banner, so it may be geo- or JS-gated.

## Sources

1. https://www.revolut.com/
2. https://www.revolut.com/en-US/
3. https://www.revolut.com/our-pricing-plans/
4. https://help.revolut.com/help
5. https://help.revolut.com/help/transfers/
6. https://help.revolut.com/help/card-payments-withdrawals/
7. https://help.revolut.com/help/transfers/outbound-transfers/having-an-issue-with-sending-money/whys-my-transfer-been-declined/
8. https://www.revolut.com/about-fraud-and-scam/
9. https://www.revolut.com/how-we-keep-your-money-safe/
10. https://www.revolut.com/legal/complaints-policy/
11. https://www.revolut.com/customer-vulnerability/
12. https://www.revolut.com/system-status/
