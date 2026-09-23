# 045. Cash App

> **SUPPLEMENT — 2026-09-23.** `cash.app/help` was a client-rendered shell at first harvest
> and its article titles were recovered from a search index. The help home has since been
> captured through the rendering browser. See `_schema/BROWSER-SUPPLEMENTS.md` →
> *045-cashapp.md — help centre IA*. The help IA, ten Popular Topics and thirteen Browse
> categories there are `[observed]` and supersede the search-derived titles below.


| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | P2P payments and stock/bitcoin brokerage (non-bank financial services platform, sponsor-bank model) |
| Primary URL | https://cash.app/ |
| Corpus rank | 045 |
| Benchmark strength (source list) | Minimal transaction language |
| Locale / market observed | en-US (`/us/en-us/` in legal and help paths) |
| Platform observed | Web (marketing), Atlassian Statuspage, legal paths. Help centre is client-rendered and was not retrievable |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Explicitly not a bank, stated in a sentence repeated on every page.** The canonical string is: "**Cash App is a financial services platform, and not an FDIC-insured bank.**" A shorter variant leads most pages: "Cash App is a financial services platform, not a bank. Banking services are provided by Cash App's bank partner(s)." Card issuance: "Prepaid debit cards issued by **Sutton Bank, Member FDIC**. Cash App Visa® Debit Flex Cards issued by **Sutton Bank, Member FDIC, and The Bancorp Bank, N.A.**, pursuant to a license from Visa U.S.A. Inc." Deposit insurance is **pass-through and conditional**: "With a Cash App Card your money is eligible for FDIC pass-through insurance through **Wells Fargo Bank, N.A., Sutton Bank, and/or The Bancorp Bank, N.A.**, Members FDIC, for up to $250,000 per customer when aggregated with all other deposits held in the same legal capacity at each bank, if certain conditions are met." Brokerage: "**Cash App Investing LLC, member FINRA/SIPC**, subsidiary of Block, Inc." Bitcoin: Block, Inc., "licensed to engage in virtual currency business activity by the **New York State Department of Financial Services**" (operating in NY as Block of Delaware). Lending: "Borrow loans issued and serviced by **Square Financial Services, Inc.**"; "Afterpay loans originated by **First Electronic Bank**", serviced by Square Capital, Inc. Identity verification grounded in the **Bank Secrecy Act and FinCEN regulations**. State licences at `block.xyz/legal/licenses`. |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 fetched + 2 search-index passes |
| Harvest completeness | **Partial — help centre blocked.** `cash.app/help` and every help-article URL return a client-rendered Next.js shell with no server HTML, so no help-article body or category tree could be fetched. Help-article *titles* in T7/T11 were recovered from the public search index and are marked as such. Marketing, fees, security and status pages fetched cleanly. No accessibility statement found. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://cash.app/ | Hero, six feature sections, full legal footer |
| Security | https://cash.app/security | Three-part protection model, nine-question FAQ, fraud numbers |
| Bank | https://cash.app/bank | Competitor fee comparison table, eleven-question FAQ |
| No fees | https://cash.app/bank/no-fees | The fee disclosure page — seven-question FAQ |
| Send | https://cash.app/send | P2P feature set, eight-question FAQ |
| Savings | https://cash.app/savings | Interest tiering, APY education FAQ |
| Card | https://cash.app/card | Card features, eleven-question FAQ |
| Access cash | https://cash.app/access-cash | Borrow / Afterpay / overdraft / early pay |
| Outsmart scams | https://cash.app/learn/outsmart-scams | Seven-article scam-education index |
| Status | https://status.cash.app/ | 16 named services, live and historical incidents |
| Help centre (blocked) | https://cash.app/help | Client-rendered shell; no content in server HTML |
| Help articles (blocked) | e.g. `/help/3042-payment-pending`, `/help/us/en-us/90131-…` | Same; titles recovered via search index only |

---

## T1 Navigation & IA labels

**There is no conventional top nav.** `[observed]` The header carries only the logo, `Sign up` and `Log in`. Navigation is a flat, expandable list whose items are **complete sentences with an implied verb**, not category labels:

`Bank* on your terms` · `Order a Cash App Card` · `Send money for free` · `Save for your goals` · `Know your money is safe` · `Get Cash App for families` · `Pay over time with Afterpay on Cash App` · `Save on everyday spending` · `Buy stocks with no commission fees` · `Buy and sell bitcoin easily` · `File your taxes for free` · `Deposit your paychecks`

**Every one of the twelve is a verb phrase, and seven of them contain a benefit or a price inside the label** (`for free`, `with no commission fees`, `on your terms`, `easily`, `for your goals`). This is the most aggressive example of CTA-as-navigation in the corpus so far: the nav is doing conversion work, not wayfinding work.

`Bank* on your terms` carries an **asterisk inside a navigation label** — pointing at the "not a bank" disclosure. A footnote marker in a nav item is a compliance artefact leaking into the IA, and it is the single most revealing detail on this site: Cash App cannot use the word `Bank` anywhere, even in a menu, without qualifying it.

**A second, quieter nav block is headed `Learn more`** `[observed]`: `Cash App Basics` · `Outsmart scams` · `Press` · `Reviews` · `Help` · `Careers`

`Outsmart scams` sits second, above `Press` and `Help`. Scam education is promoted above the help centre itself.

**Footer** `[observed]`: `Careers` · `Press` · `Help` · `Status` · `Legal` · `Licenses` · `Privacy Notice` · `Your Privacy Choices`

Eight single-word or two-word links. `Licenses` points off-domain to `block.xyz/legal/licenses` — the state money-transmitter licences live on the parent company's site, not Cash App's. `Your Privacy Choices` is the CCPA-mandated opt-out label.

**Phone support is in the footer as plain text** `[observed]`: `1 (800) 969-1940` with `Available daily 8AM to 9:30PM ET`. The hours are given in a single timezone with no conversion.

**Section headers on product pages act as the real IA** `[observed]`, e.g. on `/security`: `How Cash App helps keep you protected` → `What Cash App does` / `What you can do` / `Help when you need it`, each with an anchor CTA (`Explore security features→`, `Explore safety controls→`, `Explore support features→`).

**That three-way split is the best IA decision on the site.** Security is organised by **who acts** — the platform, the user, or support — rather than by feature type. A user who wants to know "what am I supposed to do about this" can go straight to the middle column.

**Help centre IA** `[blocked]` — not retrievable. Article URLs use a numeric-ID-plus-slug pattern (`/help/us/en-us/3042-payment-pending`, `/help/us/en-us/6552-cash-card-dispute-status-and-lifecycle`) with a locale segment, and accept a `?searchText=` parameter, implying search-first routing. Category structure could not be observed.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The way money should work`
> Subhead: "From getting paid to growing what you've got, Cash App makes managing your money effortless and instant—without all the fees."
> CTA: `Get started`

Six words, no product noun, no brand name in the headline. `should` is doing the work — it positions everything else as broken without naming a competitor. The subhead spans the full lifecycle (`getting paid` → `growing what you've got`) and ends on the differentiator with an em-dash: `—without all the fees`.

**`without all the fees` is the site's spine.** The exact phrase or a near-variant appears as: `Manage your money without all the fees` (bank page header), `Bank without all the fees` (no-fees page H1), `Manage your money without all the fees` (explore-more card, twice), and in the hero. The word `all` is load-bearing and slightly weaselly — it concedes that some fees exist while framing the alternative as worse.

**Section headers are declarative sentences with a verb** `[observed]`

`Cash App Card is the debit card that works for you` · `Access cash when you need it` · `Meet the all-new Cash App Tags` · `Make your money go even further` · `Sending money is fast, free, and made for you` · `Security built into every swipe, tap, and send` · `The money app trusted by 59 million+ active accounts` · `Earn, save, and do more with Cash App Green` · `Get extra cash, right when you need it` · `Made to help between paydays` · `Save money with high interest and no hidden fees` · `Cash App helps you keep your money safe from fraud`

`Security built into every swipe, tap, and send` is the strongest — a tricolon of the three physical gestures of the product, ending on the one that is unique to Cash App.

`Made to help between paydays` (over Borrow, Afterpay, overdraft and early pay) is a remarkably direct statement of who the product is for. Most lending marketing avoids naming the cashflow gap it exists to fill; Cash App puts it in an H2.

**Three-part triples recur** `[observed]`: `effortless and instant`, `fast, free, and made for you`, `swipe, tap, and send`, `Earn, save, and do more`, `send, spend, save, and invest`, `save, spend, and invest`.

**Sub-headers are bullet-like fragments, four to eight words** `[observed]`: `No hidden or monthly fees ever` · `Weekly custom cash back offers` · `Real-time transaction alerts` · `Card designs you can fully personalize` · `Personalize payments with stickers and text` · `Collect money from a group with pools` · `Sync your contacts to pay friends easily` · `Send money confidently with Security Lock`

**Eyebrow labels are set in small caps and name the feature** `[observed]`: `NO MONTHLY FEES` · `ATMs` · `NO OVERDRAFT FEES` · `CASH APP CARD` · `DEPOSIT MONEY` · `SAVINGS` · `SEND MONEY` · `NO HIDDEN FEES` · `FREE OVERDRAFT COVERAGE` · `CASH APP GREEN` · `BORROW` · `AFTERPAY` · `DIRECT DEPOSIT` · `CUSTOM OFFERS` · `EXCLUSIVE ACCESS` · `SECURITY LOCK` · `POOLS` · `ACTIVITY TRACKING` · `PERSONALIZED PAYMENTS` · `SAVINGS GOALS` · `AUTOMATIC WAYS TO SAVE` · `ENCRYPTION` · `IDENTITY VERIFICATION`

**Three of the eyebrows are negations** (`NO MONTHLY FEES`, `NO OVERDRAFT FEES`, `NO HIDDEN FEES`). Naming the absence of a fee as if it were a feature, in the label position, is the house move.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Hero | The single most prominent CTA; no product noun |
| `Sign up` / `Sign up now→` | Header, repeated page-foot module | The `→` is part of the label |
| `Log in` | Header | |
| `Download Cash App` | QR-code block on `/bank/no-fees` | With a scannable QR whose alt text is `Scan to Download Cash App` |
| `Learn about Green` | Home, Green section | |
| `Meet Cash App Card` | Home, card page, explore-more cards | **`Meet` as a CTA verb** — introduces a product as a person |
| `Explore tags` · `Explore Afterpay` · `Explore savings` · `Explore offers` · `Explore investing` · `Explore Cash App Green` · `Explore features` · `Explore ways to save` | Feature sections and explore-more grids | `Explore` + noun is the house secondary CTA |
| `Explore security features→` · `Explore safety controls→` · `Explore support features→` | Security page, three-column block | Anchor links within the page, arrow included |
| `Learn how to save and grow` · `Learn about security` · `Learn about sending money` · `Learn about bitcoin` · `Learn about overdraft coverage` · `Learn how Borrow works` · `Learn how to outsmart scams→` | Throughout | **Never a bare `Learn more`** — every instance names the object |
| `Send money` | Home, P2P section | |
| `Save on fees` | Bank page | |
| `Get coverage` | Bank page, overdraft | |
| `How direct deposit works` · `How pools work` · `How to get extra cash` · `How Cash App Pay works` | Explore-more cards | CTA text = the question the destination answers |
| `Report a scam→` | Security page | |
| `Start a chat→` | Security page | |
| `Lock your card→` | Security page | Imperative safety action as a CTA |
| `Review your security settings→` · `Review your notification settings→` | Security page | Both deep-link into the app via `click.cash.app` |
| `Check for presales` | Card page | |
| `Read reviews` | Home, access-cash, savings | |
| `View historical uptime.` | Status page | Includes the full stop |
| `Subscribe to Incident` | Status page | |
| `Your Privacy Choices` | Footer | CCPA-mandated |

**Observations.** Cash App **never ships a bare `Learn more`** — unusual, and the opposite of Monzo. Every learning CTA carries its object (`Learn about bitcoin`, `Learn how Borrow works`). This is the single most disciplined CTA practice in this four-product set.

`Lock your card→` on a marketing page is a **live protective action offered to an unauthenticated visitor**, deep-linking into the app. So is `Report a scam→`. Cash App treats its security marketing page as an emergency console, not as a brochure.

`Meet Cash App Card` / `Meet the all-new Cash App Tags` — `Meet` appears three times as a CTA or header verb. It frames hardware as a character.

## T4 Onboarding & getting-started

`[documented]` and `[absent]` mix. **There is no published step sequence.** No numbered onboarding, no "how it works" ladder, no time promise — a striking contrast with N26 (six steps), Monzo (three steps, 10 minutes) and Revolut (five-rung recovery ladder).

**What is disclosed about joining:**

- **Eligibility by geography**: "Only residents of the United States can create Cash App accounts."
- **Eligibility by age**: "If you're 18 or older, you can order a Cash App Card. If you're between 13 and 17, you can order a Cash App Card with a sponsored account." Elsewhere: `Available to 6+` (Cash App Tags), and `sponsored accounts` appear throughout as the under-18 mechanism.
- **Address requirement**: "You also need to have a physical mailing address, not a P.O. Box."
- **No bank account required**: "No, you don't need a bank account to create a Cash App account or add money to your Cash balance."
- **No minimum balance**: "When you have a Cash App Card, there are no minimum balance or activity requirements."
- **Card delivery**: "Your card should arrive in the mail within 10 business days. When you get it, you can activate it with the app. While you wait, you may be able to access your card details from the Card tab for online purchases, or to link to Apple or Google Pay."

That last one is the only genuinely well-made onboarding paragraph on the site: it gives a bounded expectation (`within 10 business days`), the next action on arrival (`activate it with the app`), and a **parallel path during the wait** (virtual card details for online and wallet use). The hedge `may be able to` is doing eligibility work without explaining itself.

**Recipient onboarding is documented, with a deadline and a reversal** `[observed]` — the best onboarding-adjacent copy on the site:

> "If they're not already a Cash App customer, they'll be asked to create an account and verify their phone number or email by entering a one-time passcode to accept the payment. If they don't create their account and verify their phone number or email within 14 days, the payment gets returned to you."

The sender learns, before sending, what the recipient will be asked to do, what the deadline is (`14 days`), and what happens if it lapses. **Documenting the counterparty's onboarding inside the sender's flow** is a directly transferable pattern for any invite-to-transact product.

**Why identity verification is required, explained as law rather than policy** `[observed]`, under the FAQ `Why does Cash App need my Social Security number?`:

> "Federal law requires financial platforms to verify your identity. Under the Bank Secrecy Act and FinCEN regulations, we're required to confirm who you are before you can send, receive, or withdraw money. This keeps your account safer and helps prevent fraud. Your Social Security number is encrypted and never shared with other customers."

Four moves in four sentences: cite the law, name the statute, restate the user benefit, and close the specific privacy worry (`never shared with other customers`). Asking for an SSN is the highest-friction moment in a US fintech signup, and this is a model answer.

**Earning `Cash App Green` is the *real* onboarding ladder** `[observed]` — a three-step progression published on the savings page:

1. "Confirm some info for tax purposes to start earning 1.5% interest"
2. "Spend $500 each month with your Cash App Card to earn Green status"
3. "Earn 3.5% interest every month you have Green status"

Steps, numbered, with the reward stated at each rung. Cash App has no signup walkthrough but does publish a **status-earning walkthrough** — the activation journey that matters commercially is the one that got the step treatment.

## T5 Form & field labels

`[absent]` for real forms. Observable proxies:

**In-app navigation described as literal paths** `[documented]`

- "Open Cash App, go to your activity feed, select the transaction, and tap **Report**." (scam reporting)
- "Open Cash App. Tap the **Card** tab. Under '**Manage card**,' tap **Design a new card**. Follow the instructions."
- "Open Cash App. Tap the **Profile** icon. Select **Linked banks > Link bank**. Follow the instructions."

Named surfaces: `activity feed`, `Card tab`, `Profile icon`, `Manage card`, `Linked banks`, `Link bank`, `Design a new card`, `Limits section in the settings section of your app`.

`activity feed` — not "transaction history", not "activity list" — is the app's term for the payment log, and it is social-media vocabulary applied to money.

**Identifier field concepts** `[observed]`: "Enter a phone number, email, or $cashtag". The three-way identifier is stated as one label. `$cashtag` carries the dollar sign as part of the token.

**Comparison-table row labels** `[observed]`, from the Chase / Bank of America / Wells Fargo table: `Monthly fee` · `Overdraft fee` · `No-fee ATMs` · `APY`. Four rows only — the table is deliberately minimal, and three of the four are fee rows.

**Content-policy constraint stated as a field rule** `[observed]`, on card customisation:

> "Some customizations, like obscene and profane language, hate speech, and intellectual property of others, aren't allowed. When you're customizing your card, design one that you'd be proud to show off anywhere."

The rule is followed by a **standard framed as self-interest** rather than as enforcement — "design one that you'd be proud to show off anywhere". That is a well-judged piece of moderation copy.

## T6 Status & state language

**PRIORITY SECTION.**

**System status vocabulary — the only directly observed status set on the site** `[observed]`, from status.cash.app:

Severity labels: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, with narrative variants in the history (`had a major outage.`, `had a partial outage.`, `No downtime recorded on this day.`, `No data exists for this day.`).

Incident lifecycle labels: `Investigating` → `Identified` → `Monitoring` → `Resolved`. (Standard Atlassian Statuspage vocabulary, but Cash App uses all four rungs including `Monitoring`, which many teams skip.)

**16 named services** `[observed]`, and the naming is the point:

`Send & Receive Money` · `Cash App Card` · `Cash App Pay` · `Direct Deposit` · `Offers` · `Add Cash` · `Cash Out` · `Investing` · `Bitcoin` · `Settings` · `In-App Alert` · `Cash App Taxes` · `Log In` · `Savings` · `Lending`

Every one is a **thing the user does or a tab they can see**. `Add Cash` and `Cash Out` are the in-app button labels, used verbatim as service names. `In-App Alert` was showing `Degraded Performance` at harvest — a user who had not received an expected alert could diagnose it from this page.

**Transaction-state vocabulary** `[documented via search index]` — help bodies were not retrievable, so the following are article *titles* recovered from the public search index, and the states are inferred from the titles themselves:

| State | Evidence (help article title, via search index) |
|---|---|
| `pending` | `Payment Pending` · `Understand Cash App Pay Transaction Phases` |
| `failed` | referenced inside the `Payment Pending` article's indexed summary |
| `declined` | `Check your Activity feed to see why your Cash App Card was declined.` · `Cash App Declined for Security Support` |
| `dispute` lifecycle | `Cash App Card Dispute Status and Lifecycle` |
| `refund` | `Merchant Refunds` · `Cash App Pay Refunds` |
| `closed` (account) | `Close Account` · `Your account was closed` |
| `inactive` (account) | `Our approach to inactive accounts` |
| `delayed` (deposit) | `Common Delays with Direct Deposits` · `Missing Direct Deposit` |

**`Cash App Card Dispute Status and Lifecycle`** is the most interesting title — it indicates a **published, named state machine for disputes**. Neither Monzo, Revolut nor N26 titles an article that way; all three describe the dispute *process* rather than naming its states.

**`Understand Cash App Pay Transaction Phases`** similarly names `phases` as a first-class concept.

**`Check your Activity feed to see why your Cash App Card was declined.`** is an article title that is **an instruction ending in a full stop** — the title tells the user where to look, so a search result alone resolves the question. Same device as N26's `Vishing: This Could Be a Scam Call — End It Immediately`.

**Timing language** `[observed]`

- `instant` / `instantly` used constantly as the default: "send & receive money instantly", "Sending money is fast, free", "typically completed within minutes" (instant transfers)
- Standard transfers: "no fees for standard transfers, which typically take up to 3 business days" (send page) and "Standard transfers are always free and arrive in 1–3 business days" (no-fees page) — **two different ranges for the same product on two pages**
- Direct deposit: `up to 2 days early`
- Card delivery: `within 10 business days`
- Recipient acceptance window: `within 14 days`
- Dispute notification deadline: "no later than 60 days after a suspicious charge appears on your account"
- Support hours: `Available daily 8AM to 9:30PM ET` (phone) vs `24/7` (chat) — the chat/phone asymmetry is stated consistently: "Our support team is available 24/7 through in-app chat… Prefer to talk? Reach our phone support team at 1 (800) 969-1940, available 7 days a week."

**`no phone trees or runaround`** `[observed]` — the chat CTA copy names the incumbent failure mode it avoids. Two nouns, both colloquial, both instantly legible to a US consumer.

**Fee-rounding as a state disclosure** `[observed]`: "For these fees, Cash App uses banker's rounding to round up or down to the penny, as applicable. Banker's rounding rounds numbers ending in 5 to the nearest even integer." A named rounding algorithm, defined at the point of use. Only N26 does anything comparable, and N26 does not name the algorithm.

## T7 Error, failure & recovery

**PRIORITY SECTION — and the section most affected by the blocked help centre.** Article titles below were recovered from the public search index; **no article body was fetched.** Everything from the marketing pages is `[observed]`.

**Help-article titles indicating the error taxonomy** `[documented via search index]`

`Payment Pending` · `You may need to take action to complete a payment` (GB locale variant of the same numeric ID) · `Check your Activity feed to see why your Cash App Card was declined.` · `Cash App Declined for Security Support` · `Cash App Card Dispute Status and Lifecycle` · `Dispute a Cash App Card transaction` · `Dispute an Original Credit Transaction` · `Merchant Refunds` · `Cash App Pay Refunds` · `Common Delays with Direct Deposits` · `Missing Direct Deposit` · `Understand Cash App Pay Transaction Phases` · `Blocking a business` · `Close Account` · `Your account was closed` · `Our approach to inactive accounts` · `Change your $Cashtag` · `How to Claim a $Cashtag` · `Account limits` · `Free overdraft coverage` · `Cash Card ATM limits` · `Order Cash App Card` · `Add bank account` · `Paper money deposit`

**Two title-shape families are visible even from titles alone:**

1. **Instructional titles that resolve the question in the title** — `Check your Activity feed to see why your Cash App Card was declined.` and `You may need to take action to complete a payment`. Both are full sentences; both tell a user scanning search results what to do without opening the article.
2. **Bare noun phrases** — `Payment Pending`, `Merchant Refunds`, `Close Account`, `Account limits`. Terse to the point of being label-like. This is the "minimal transaction language" the benchmark names: a two-word title where Monzo would write `A bank transfer I sent hasn't arrived`.

**`Your account was closed`** is written in **passive past tense with no agent** — the one place where Cash App's minimalism is actively unhelpful. Compare N26's `I received a notification that my account was closed. What should I do?` (narrative, user-voiced, action-seeking) and Monzo's whole `Closed Accounts` category. `Your account was closed` states the fact and names nobody.

**Locale-divergent titling for one article** `[documented via search index]`: the numeric ID `3042` renders as `Payment Pending` on `/us/` and as `You may need to take action to complete a payment` on `/gb/`. Same content, two title philosophies — one naming the state, the other naming the user's next move. The GB title is measurably better, which makes the US default a deliberate choice for brevity.

**Recovery copy on marketing surfaces** `[observed]`

The security page's `Help when you need it` column is the recovery hub, and it is three actions, in escalating cost:

1. `Report a scam right in the app` — "If something looks wrong, report it directly in Cash App. We'll review it and take action."
2. `Chat with us anytime, day or night` — "Our support team is available 24/7 through in-app chat, with no phone trees or runaround."
3. `Call us 7 days a week` — "Prefer to talk? Reach our phone support team at 1 (800) 969-1940, available 7 days a week."

**The reimbursement answer is the most carefully written paragraph on the site** `[observed]`, under `Will Cash App refund money if scammed?`:

> "We don't issue refunds from the recipient, but we do reimburse eligible claims directly. If your claim is eligible, you may be entitled to some reimbursement. For claims of unauthorized transfers, we will investigate and reimburse in line with our dispute resolution requirements as outlined in our Terms of Service. Report the issue as soon as possible through the app or by contacting our support team. We review every report and take action to help protect your account. Reporting quickly helps us take action sooner."

Structure: **what we will not do** (claw money back from the recipient) → **what we will do** (reimburse eligible claims) → **the hedge** (`eligible`, `may be entitled to some`) → **the legal basis** → **the user's action** → **why speed matters, twice**. Leading with the refusal is the right order; a user who reads only the first clause is not misled. The repetition of the speed instruction at the end is deliberate reinforcement.

**Error-prevention copy on the send flow** `[observed]`: "Get alerts for potential scams and when you pay someone new" — `when you pay someone new` names the specific risk moment. And `Send money confidently with Security Lock`.

**Declined-payment logic stated positively as a protection** `[observed]`, under `Are there overdraft fees on Cash App?`:

> "We don't charge overdraft fees. If you ever spend more than you have in your Cash balance with your Cash App Card, your transaction will be declined instead."

**Reframing a decline as the alternative to a fee** is the sharpest content move on the fee page. The decline is the product benefit. Reinforced on the card page: "No, paying with your Cash App Card can't make your Cash balance go negative. Some other debit cards can cause accounts to go negative, which can result in overdraft fees from banks."

**Card-lock recovery** `[observed]`: "Lock Cash App Card instantly from the app. Transactions get declined automatically until you unlock it." — states the consequence of the protective action, so the user is not surprised by subsequent declines.

**Status-page incident copy** `[observed]` — the best worked examples of incident writing in this four-product set:

*Email delays (`Investigating`):* "We're aware that some Cash App emails, including verification codes and login emails, are arriving later than usual. Our team is actively working to resolve the delay. **If you're waiting on a verification code via email, please try SMS verification as an alternative**, or wait a few minutes and try again. **Push notifications and text messages are not affected.**"

*Same incident (`Monitoring`):* "We've identified and addressed the issue… Emails are now delivering normally. **If you didn't receive a previous request, please try again.** We're continuing to monitor and appreciate your patience."

*Cash App Pay disruption (`Investigating`):* "We're investigating reports of issues with Cash App Pay. Some customers may be unable to complete purchases using Cash App Pay at this time. **If you're unable to complete a purchase with Cash App Pay, please try one of these alternative payment methods:** • Tap your Cash App Card (in person) • Enter your card number (online) • Use Apple Pay"

*Connection issues (`Identified`):* "We're currently experiencing an issue that may prevent some customers from adding or sending money or contributing to Pools. **As a workaround, customers can try linking a different debit card to complete the transaction.**"

**Every single incident update names a workaround and a blast radius.** The pattern is consistent across all four: *what is broken* → *who is affected* (`some customers`, `may be`) → **what still works** → **what to do instead** → *we're on it*. `Push notifications and text messages are not affected` is the detail most incident copy omits, and it is the one that stops a user abandoning the whole product.

The `Monitoring` update's `If you didn't receive a previous request, please try again` is a **retroactive instruction** — it tells users who gave up during the incident what to do now. Very rarely written.

## T8 Empty states

`[observed]` — status page only:

`No incidents reported today.` · `No incidents reported.` · `No downtime recorded on this day.` · `No data exists for this day.`

The distinction between *no downtime* and *no data* is preserved rather than collapsed — the same discipline Monzo shows. `No incidents reported today.` vs `No incidents reported.` differentiates the current day from historical days.

All in-product empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[observed]` and `[documented]` mix.

**Named notification types** `[observed]`

- `Real-time transaction alerts` — appears as a bullet on five separate pages, always in the same three-item security triple (`Real-time transaction alerts` / `24/7 fraud monitoring` / `Card lock and security lock`)
- `Real-time alerts when it counts` — "Cash App sends alerts for sign-ins, large transactions, and changes to your account settings." **Three named trigger events**, which tells the user exactly what will and will not generate an alert.
- `Get alerts for potential scams and when you pay someone new`
- `In-App Alert` — a named *service* on the status page, so alerts have their own uptime
- Scam warnings as a measurable intervention: "Our real-time scam warnings have blocked $2B+ in P2P scams since 2020" and, in the footnote, the precise definition of what was counted: "the minimum dollar amount of highly probable payment scams Cash App prevented **where customers did not complete the payment due to our scam warning** since August 2020."

**That footnote is the most rigorous metric definition in this four-product set.** The claim is not "we prevented $2B of fraud" — it is "customers abandoned $2B of highly probable scam payments *after seeing our warning*". The mechanism of attribution is stated.

**Anti-phishing promise** `[observed]`: "Cash App will never ask you for your sign-in code or PIN. If someone contacts you claiming to be from Cash App and asks for personal information, don't respond. Report it directly in the app."

Three beats: the absolute never, the recognition rule, the action. No hedging.

**Notification settings offered to logged-out visitors** `[observed]`: `Review your notification settings→` and `Review your security settings→` both deep-link into the app from the marketing page.

**Incident subscription** `[observed]`: `Subscribe to Incident` — "Subscribe to updates for **Email Notifications Delayed** via . You'll receive ." Note the **two empty interpolation slots** in the server HTML (`via .` and `You'll receive .`) — the channel and frequency are injected client-side. A rendering defect visible in the source, and the same class of bug as Wise's empty-quotes no-results string.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION. This is the richest disclosure surface in the four-product set, because Cash App has the weakest regulatory position and therefore the most to qualify.**

**The "not a bank" statement, in four escalating forms** `[observed]`

1. *Nav label with an asterisk*: `Bank* on your terms`
2. *Page-top qualifier, above the fold on every product page*: "Cash App is a financial services platform, not a bank. Banking services are provided by Cash App's bank partner(s)."
3. *Footer, canonical form*: "**Cash App is a financial services platform, and not an FDIC-insured bank.**"
4. *FAQ, answered as a direct question*: `Is Cash App a bank?` — "No, Cash App is not a bank. It's a financial services platform. We partner with banks to provide banking services." And separately: `What bank is Cash App?` and `Is Cash App Sutton Bank?` — "No, Cash App is not Sutton Bank. Sutton Bank is one of Cash App's partner banks and issues Cash App Cards, but it's a separate company."

**Publishing `Is Cash App Sutton Bank?` as a standalone FAQ is the most granular sponsor-bank disclosure I have seen.** The user's actual confusion — "my card says Sutton Bank, who am I dealing with?" — is named and answered. Three separate FAQs (`Is Cash App a bank?`, `What bank is Cash App?`, `Is Cash App Sutton Bank?`) attack the same misconception from three angles.

**FDIC disclosure is conditional and the condition is stated in the headline** `[observed]`

Headline: `FDIC insurance for up to $250,000` — but the body immediately conditions it: "**When you have a Cash App Card**, your money is eligible for FDIC pass-through insurance through our partner banks, subject to terms."

The full footnote is the precise version: "With a Cash App Card your money is eligible for FDIC **pass-through** insurance through Wells Fargo Bank, N.A., Sutton Bank, and/or The Bancorp Bank, N.A., Members FDIC, for up to $250,000 per customer **when aggregated with all other deposits held in the same legal capacity at each bank, if certain conditions are met**. **The FDIC insures your balance only in the event that the bank(s) identified above holding your funds fails.**"

Four distinct qualifications: (a) requires a Cash App Card, (b) it is *pass-through*, not direct, (c) the $250k is aggregated with the user's other deposits at the same bank — so a user who already banks with Wells Fargo may have less headroom than they think, and (d) it covers **bank failure only**, not fraud, not loss, not Cash App's own failure.

**Point (d) is the disclosure most consumer fintech omits**, and Cash App states it in one sentence. The number of users who believe FDIC insurance covers being scammed is large; this sentence is the correction.

**The negative disclosure for non-deposit products is equally explicit** `[observed]`:

- "Securities products are not insured by the FDIC or any federal government agency, are not bank deposits, are not obligations of or guaranteed by any bank and are subject to investment risks, including possible loss of the principal amount invested."
- "Investing and bitcoin are non-deposit, non-bank products that are not FDIC insured and involve risk, including monetary loss."
- "Bitcoin is a non-deposit, non-bank product that is not FDIC insured and involves risk, including monetary loss."
- "Cash App Investing does not trade bitcoin and Block, Inc. is not a member of FINRA or SIPC." — **the entity that handles bitcoin is explicitly excluded from the investor-protection regime that covers stocks.** A user who assumes SIPC covers their bitcoin is corrected in one clause.
- "Bitcoin services are not licensable activity in all U.S. states and territories." — a geographic availability caveat stated in the same footnote as the risk warning.

**Fee disclosure — the `no fees` claim and its seven exceptions** `[observed]`

The no-fees page is headed `Bank without all the fees` / `There are no hidden fees when you bank through Cash App`, then discloses seven actual fees through its own FAQ:

| Fee | Disclosure (verbatim, shortened) |
|---|---|
| Monthly | "Cash App does not charge any monthly fees." |
| Overdraft | "We don't charge overdraft fees… your transaction will be declined instead." |
| ATM | "There's a **$2.50 fee per ATM withdrawal**, but you can withdraw from in-network ATMs for free if you direct deposit $300 or more in paychecks or spend $500 or more with your Cash App Card each month." (Card page states the same $2.50 "plus any out-of-network fees charged by the ATM operator.") |
| Send / receive | "sending and receiving money on Cash App is always free… You'll never pay to split rent, pay back a friend, or accept a payment." |
| Credit-card send | "Cash App charges a **3% fee** to send money from a linked credit card." (send page — **not** repeated on the no-fees page) |
| Instant transfer | "Instant transfers to your linked debit card or bank account cost **0.5%–2.5%** of the total, with a **$0.25-$1 minimum**. The maximum fee shall not exceed **$75**." (no-fees page) vs "**0.5%-1.75%, minimum of $0.25**" (send page) |
| Foreign transaction | "there's a **3% foreign transaction fee**, but this fee is waived for in-person card transactions if you (a) spend $500 or more in Qualifying Purchases or (b) receive $300 or more in Qualifying Deposits each month." |

**Two defects recorded.** The instant-transfer fee is stated as `0.5%–2.5%` with a `$0.25-$1` minimum and a `$75` cap on one page, and as `0.5%-1.75%, minimum of $0.25` with no cap on another. And the **3% credit-card send fee is absent from the dedicated fee page** while being present on the send page — the page a user goes to specifically to learn about fees omits one.

**The honesty sentence at the end of the fee FAQ is the redeeming move** `[observed]`, under `Is Cash App really free to use?`:

> "Yes, most people use Cash App without ever paying a fee. If there are ever fees for something like instant transfers or ATM withdrawals, **you'll know about them before you continue**."

`most people`, not "it's free". And the promise is about **disclosure timing at the point of transaction**, which is the thing that actually matters. This is the correct way to defend a "no fees" claim that has exceptions.

**Competitor comparison table** `[observed]` — four rows, four columns (`Cash App`, `Chase`, `Bank of America`, `Wells Fargo`), showing `$0` / `Up to $34` / `Up to $35` / `Up to $35` for monthly fee, and so on. **Sourced and dated**: "Sources: Data from Bank of America, Wells Fargo, Chase, and Capital One websites as of September 2025." (Capital One is named in the source line but does not appear as a column — a small inconsistency.) Naming and dating competitor fee data is the defensible way to run a comparison table.

**Eligibility conditions are consistently expressed as a spend-or-deposit either/or** `[observed]`: "Customers can qualify for Cash App Green by spending **$500 in Qualifying Purchases** using your Cash App Card or Cash App Pay per month, or by depositing **$300 of Qualifying Deposits** per month." The capitalised `Qualifying Purchases` / `Qualifying Deposits` signal defined terms, which are defined in the ToS rather than inline — a gap.

**Savings-interest disclosure** `[observed]`: "Cash App will pass through a portion of the interest paid on your savings balance held in an account for the benefit of Cash App customers at **Wells Fargo Bank, N.A., Member FDIC**." — **`a portion of`** is the honest phrase. Cash App states that it keeps some of the interest. Plus: "Savings yield rate is subject to change", "Cash for Business accounts aren't eligible to earn interest", and a tax explanation: "If you earn $10 or more in interest in a calendar year, you'll receive a Form 1099-INT… These tax forms are sent out by January 31."

**Lending disclosure** `[observed]`, for `Borrow`:
- "Borrow up to $500 for a flat fee with no credit checks." — `flat fee` is named but **the amount is never stated on any harvested page**. Recorded as a gap: a lending product whose price is not on its marketing page.
- "Unlock Borrow limits up to $400 for first time borrowers, and get limit increases of up to $300. $500 limit includes Cash App Green limit increase."
- **A published average, not just a maximum**: "As of October 1, 2025, the **average limit for first time borrowers who are spend actives is $153**." Publishing the average alongside the "up to $500" headline is a genuinely unusual anti-overclaim move.
- "Borrow eligibility and limits depend on several factors and are not guaranteed."
- **State exclusions named**: "Borrow is not available in **Colorado, Iowa, or Oregon**."
- Afterpay: "Eligibility is based on several factors and is not guaranteed. Afterpay is not available in all states. Afterpay loans issued by First Electronic Bank, serviced by Square Capital, Inc." Plus a feature-interaction caveat: "Overdraft Coverage and Round Ups are not supported by Afterpay on Cash App Card."

**Zero Fraud Liability, with the user's obligation stated** `[observed]`: "you won't be held responsible for unauthorized charges if your card is lost, stolen, or used without your permission. Keep an eye on your card transactions and promptly report any suspicious charges. Terms Apply. **You must notify Cash App immediately - and no later than 60 days after a suspicious charge appears on your account** - of any unauthorized Cash App Card use."

The protection and its forfeiture condition are in the same footnote, with the deadline in a specific number of days.

**Statistical claims with defined methodology** `[observed]`

- `$2B+ in scam losses` — defined as payments customers abandoned after a warning, since August 2020, "Based on Cash App internal data and calculation as of June 2025."
- `99.99% of Cash App transactions are scam-free` — "Scam-free transaction data based on Cash App internal data and calculation as of November 2024", with a link to a Block PDF.
- `59 million+ active accounts` (home) vs `57+ million people trust Cash App with their money` (bank page) — **two different figures and two different units** (`active accounts` vs `people`) on the same site.

**`Cash App Tags are financial instruments linked to your Cash App Card, and NOT toys. Available to 6+. Use responsibly.`** `[observed]` — a product-safety disclaimer on a physical payment token, with `NOT` in caps. The collision of "whimsical" marketing ("It's a more whimsical way to tap to pay") and a toy-safety warning in the same section is a live tension in the copy.

## T11 Help-centre architecture

**`[blocked]`.** `cash.app/help` and all help-article URLs return a Next.js shell with no server-side content. No category tree, no article body, no search-results copy could be fetched.

**What is inferable from URL structure and the search index** `[documented]`

- Pattern: `cash.app/help/{locale}/{numeric-id}-{slug}`, e.g. `/help/us/en-us/3042-payment-pending`, `/help/us/en-us/6552-cash-card-dispute-status-and-lifecycle`, `/help/us/en-us/309115-cash-card-dispute-purchase`
- A locale-less form (`/help/3042-payment-pending`) **redirects** to the `/us/en-us/` form
- Multiple locales exist: `/us/en-us/`, `/gb/en-us/` (note: `en-us` language code under a `gb` region)
- Search is a query parameter (`?searchText=send`, `?searchText=limits`, `?searchText=overdraft`), and marketing pages link into help **with the search term pre-filled** — e.g. the card page links to `3086-cash-card-atm-limits?searchText=limits`. That implies help is search-primary, with the query preserved for analytics and for the in-page context.
- Numeric IDs are non-sequential and range from 3-digit-plus (`3042`, `3080`, `3099`, `3112`, `3128`, `3132`, `3139`) to 5- and 6-digit (`6480`, `6536`, `6543`, `6551`, `6552`, `6569`, `8009`, `17382`, `65091`, `80091`, `90131`, `110812`, `309114`, `309115`). Low IDs cluster on core payment topics; high IDs on newer products (Afterpay, Cash App Pay phases, business blocking).

**Help is linked from three places** `[observed]`: the `Learn more` nav block, the footer, and inline from FAQ answers — always with a specific article deep-link, never a generic "visit help". Every FAQ answer that could be deeper points at a named article (`sending a payment`, `Accounts Limits support page`, `free overdraft coverage`, `how to get a debit card`, `add a bank account`).

**Recorded as blocked in Caveats.** Any future pass needs a browser-rendered fetch to capture the category tree, article bodies, search no-results copy, and the article-feedback furniture.

## T12 FAQs

**FAQs are the primary content vehicle on Cash App's site**, carrying most of the explanatory and disclosure load that other products put in help centres. Six of the ten pages fetched end in an accordion, and — critically — **the answers are in server HTML**, unlike Wise.

**`/security` — nine questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Does Cash App help keep my account safe from fraud? |
| 2 | Does Cash App help keep your account secure? |
| 3 | Is Cash App FDIC insured? |
| 4 | Will Cash App refund money if scammed? |
| 5 | How secure is Cash App from hackers? |
| 6 | What security features does Cash App have? |
| 7 | Why does Cash App need my Social Security number? |
| 8 | How do P2P scams work? |
| 9 | How do I report a scam on Cash App? |

**Q1 and Q2 are the same question with a pronoun swap** (`my account` / `your account`), and their answers substantially overlap. Q5 (`How secure is Cash App from hackers?`) and Q6 (`What security features does Cash App have?`) are a third and fourth restatement. This is **SEO long-tail coverage**, not an information architecture — four questions, one answer, phrased as a user might type it. Worth recording honestly: the redundancy serves search, not comprehension, and a user reading the accordion top to bottom encounters the same three facts four times.

Q4 and Q7 are the two that carry unique content and they are the two best-written answers on the site (see T4 and T7).

**`/bank/no-fees` — seven questions** `[observed]`: `Does Cash App charge monthly fees?` · `Are there overdraft fees on Cash App?` · `Is there a fee to withdraw cash from an ATM?` · `Does Cash App charge for sending or receiving money?` · `What is the fee for an instant transfer?` · `Are there any fees for using Cash App internationally?` · `Is Cash App really free to use?`

**All seven are fee questions and six are yes/no.** The block is a fee schedule disguised as an FAQ — and it is the *only* fee schedule Cash App publishes. There is no fee table equivalent to Monzo's `Fee information` or Revolut's plan matrix. Recorded as a structural observation: **a conversational FAQ is doing the work of a regulated fee disclosure document.**

**`/bank` — eleven questions, split into two tabs** `[observed]`: `Online banking with Cash App` and `Online banking basics`.

Tab 1 (product): `Do you need a bank account for Cash App?` · `Are there limits for transfers, deposits, or withdrawals on Cash App?` · `What is a Cash App bank account?` · `How do I link my bank account to Cash App?` · `How does Cash App keep my money safe?` · `What bank is Cash App?` · `Is Cash App a bank?` · `Is Cash App Sutton Bank?`

Tab 2 (generic education): `What is online banking?` · `How to create a bank account online` · `How does online banking work?`

**The two-tab split is a good pattern.** Product-specific answers and category-education answers are separated rather than interleaved, so a user who knows what online banking is does not wade through a definition.

**`/savings` — same two-tab structure** (`Savings with Cash App` / `Savings basics`), and the education tab carries a **repeated disclaimer on every generic answer**: "*Cash App is a financial platform, not a bank. Savings basics FAQ for educational purposes only.*"

**Repeating the not-a-bank disclaimer inside each individual educational answer** — rather than once at the top of the tab — is a deliberate over-disclosure. It reads as slightly defensive, and it is almost certainly correct: a non-bank explaining "what is a savings account?" needs the disclaimer adjacent to each definition, not once above them.

The education answers are genuinely good plain-English definitions: `What is APY (Annual Percentage Yield)?` — "the percentage of interest you can earn on your money over a year, including the effect of compounding… higher APY means more growth through interest." And `What is the difference between interest rate and APY?` — "The interest rate is the base percentage your money earns. APY includes compounding, meaning you earn interest not just on your original balance, but also interest that has already been added."

**`/send` — eight questions** `[observed]`: `How do I send money on Cash App?` · `How much money can you send on Cash App?` · `Do I need a balance before I can transfer money?` · `Is there a fee to send money on Cash App?` · `Does Cash App charge a fee to withdraw money?` · `Can I send money to someone who's not on Cash App?` · `How does Cash App keep my account safe?`

Note the **person shift within one block**: `How do I send money…` (first person) and `How much money can you send…` (second person). Both forms appear across the site; there is no consistent FAQ voice.

**`/card` — eleven questions, two tabs** (`Cash App Card` / `Debit card basics`), with the education tab carrying `What's a debit card?` and `What's the difference between a debit card and credit card?`

**Structural observation across all six blocks:** Cash App's FAQs are written as **search queries, not as a curriculum**. They are redundant, occasionally contradictory across pages (the instant-transfer fee), and person-inconsistent — but each one is individually well answered, and the disclosure content inside them is more rigorous than most products' legal pages.

## T13 Terminology & glossary

| Term | Cash App's usage | The alternative it rejected |
|---|---|---|
| `$cashtag` / `$Cashtag` | The username identifier, dollar sign included, **capitalised inconsistently** (`$cashtag` on /send, `$Cashtag` in help titles) | "@handle", "username", "payment ID" |
| `Cash balance` | The spendable balance — **not** "account balance", because it is not a bank account | "account balance", "wallet" |
| `Cash Out` | Withdrawing to a linked bank/card; a status-page service name and an in-app label | "withdraw", "transfer out" |
| `Add Cash` | The reverse; also a status-page service name | "top up", "deposit" |
| `Cash App Green` | The activity-based status tier | "Premium", "Plus", "Gold" |
| `Cash App Tags` | Physical NFC payment tokens, "a more whimsical way to tap to pay" | "keyring", "payment sticker" |
| `Pools` | Group collection | "split the bill", "group payment" |
| `Round Ups` | Spare-change saving into stocks or bitcoin | "micro-investing" |
| `Borrow` | Short-term lending, capitalised as a product noun | "loan", "advance", "cash advance" |
| `Security Lock` | Biometric/PIN gate before sending | "payment confirmation", "2FA" |
| `Card Lock` / `Lock your card` | Card freeze | "freeze" (which Monzo, Revolut and N26 all use) |
| `Zero Fraud Liability` | Title-cased protection promise | "fraud protection" |
| `Qualifying Purchases` / `Qualifying Deposits` | Capitalised defined terms in eligibility copy | lowercase description |
| `banker's rounding` | Named and defined rounding algorithm | unstated |
| `pass-through insurance` | The precise FDIC mechanism | "FDIC insured" |
| `activity feed` | The transaction log | "transaction history", "statement" |
| `sponsored account` | The under-18 account structure | "child account", "junior account" |
| `financial services platform` | The self-description used in every disclaimer | "app", "neobank", "fintech" |
| `bank partner(s)` | The sponsor banks, always with the parenthetical plural | "our bank", "issuing bank" |
| `direct deposit` | US payroll term, used as the gateway to nearly every benefit | |
| `spend actives` | Appears in a public footnote: "the average limit for first time borrowers who are **spend actives**" | **Internal segmentation jargon leaking into a consumer disclosure** |

**`Cash Out` and `Add Cash` are the terminology decision that defines the product.** Both are imperative verb phrases built on `Cash`, both are used as in-app labels *and* as status-page service names, and neither uses banking vocabulary. `Cash Out` in particular does work that "Withdraw" cannot: it implies the money was never in a bank in the first place, which is accurate.

**`Cash balance` over "account balance"** is similarly precise. Cash App consistently avoids the word `account` for the money itself — you have a `Cash App account` (a relationship) and a `Cash balance` (funds). The separation matches the legal reality.

**`spend actives`** in the Borrow footnote is a genuine defect — a product-analytics segment name published in a consumer-facing lending disclosure, with no definition anywhere on the site.

**Register split**: marketing uses `whimsical`, `effortless`, `no phone trees or runaround`, `nickel and dime` (in a testimonial). Disclosure uses `pass-through insurance`, `aggregated`, `in the same legal capacity`, `Qualifying Deposits`. FAQ sits between the two and is where most of the real explanation happens.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, and used freely in adverse copy: "We don't issue refunds from the recipient", "We don't charge overdraft fees", "we're required to confirm who you are", "We review every report". Present tense dominates. Contractions throughout, including in the FDIC and fraud answers.

**Register.** The flattest and most declarative of the four products. Very little wordplay: `Meet the all-new Cash App Tags`, `a more whimsical way to tap to pay`, `no phone trees or runaround`, `The way money should work`, and the testimonial-sourced `Cash App doesn't nickel and dime me` are close to the full inventory. Sentences are short. Lists are frequent. Paragraphs rarely exceed three sentences.

**This is what "minimal transaction language" means in practice** — and the minimalism is a *consistent register*, not just short strings. `Payment Pending`, `Add Cash`, `Cash Out`, `Merchant Refunds`, `Close Account`, `Account limits` are all title-as-label. Compare Monzo's `A bank transfer I sent hasn't arrived`.

**Where the minimalism is a strength**: status-page incident updates, the send-flow feature bullets, the eyebrow labels, the FDIC condition placed inside the headline sentence.

**Where it fails**: `Your account was closed` (passive, agentless, no next step); `Payment Pending` (state name only, where the GB variant `You may need to take action to complete a payment` is measurably better); `flat fee` used for Borrow with no amount attached.

**Tone gradient.** Unlike Monzo, there is no published doctrine, but the gradient is observable:

- *Hero and feature sections*: confident, short, benefit-forward, occasional whimsy.
- *FAQ*: plain, procedural, occasionally repetitive; this is where the real explanation lives.
- *Footnotes*: dense, legally precise, and — unusually — **more informative than the body copy above them**. The FDIC footnote, the $2B methodology footnote, and the Borrow average-limit footnote all contain material the visible copy omits.
- *Status page*: the most disciplined register on the site. No apology inflation, no jargon, workaround always present.
- *Scam education*: instructional and unsentimental.

**The footnote-is-better-than-the-body pattern is worth flagging as a negative.** A user who reads only the headline `FDIC insurance for up to $250,000` has a materially wrong belief; the corrections are all below the fold.

**Numbers as trust devices** `[observed]`: `59 million+ active accounts` / `57+ million people` (conflicting), `$2 billion+`, `99.99%`, `9.9m+ reviews`, `4.5★ Trustpilot`, `5★ Editor's Choice`, `40,000 in-network ATMs`, `up to 3.5%`, `$500`, `$200`, `$300`, `$250,000`, `$153` (average Borrow limit), `$75` (instant-transfer cap), `10 business days`, `14 days`, `60 days`. The hedges are consistent (`up to`, `most people`, `may be eligible`, `not guaranteed`).

**Scam-education content** `[observed]` — `/learn/outsmart-scams` indexes seven articles, all dated `August 4, 2026`, all under the category `Protect Your Money`:

`How to avoid scams on Facebook & social media` · `Survey scams: how to spot them before you share anything` · `The most common types of scams and how they actually work` · `How to spot a fake giveaway (and what to do about one)` · `Cash flip scams: what you need to know` · `What to do if you get scammed (and how to get your money back)` · `How to spot and avoid scams`

Title grammar is consistent: `How to <verb>` or `<scam name>: <what you need>`. Two use parentheticals to add the recovery half (`(and what to do about one)`, `(and how to get your money back)`) — **the prevention article and the recovery article are merged into one title**, so a user who has already been scammed does not need a different entry point.

`Cash flip scams` is named because it is the scam most specific to Cash App's own brand — the "$cashtag flip" fraud. Naming your own brand's signature scam in your own education hub is the right call.

**Accessibility content** `[observed]` — **no accessibility statement exists.** No `/accessibility` route is linked from any footer, nav or page harvested. `[absent]` — this is the weakest accessibility posture of the four products.

**Observable accessibility practice, mixed:**

- **No `Skip to content` link** was observed in the fetched markup of any cash.app page. (Monzo has one on every page; N26 has one on its support subdomain.)
- **Alt text is largely absent or a filename.** Product imagery on the home page carries empty alt (`![]`). Card designs carry descriptive alt (`Cash App Glitter Card Design`, `Cash App Card Black Design`). Security and feature icons carry **asset-pipeline filenames as alt** — e.g. `ct-QuickHits_pf-SEC_c-Summer26Update_d-Icon-security-overdraft.png`. A screen-reader user on the security page hears a build-system string.
- One image carries a **useful functional alt**: `Scan to Download Cash App` on the QR code. That is the correct pattern and it is applied exactly once.
- **Video-only feature explanations.** Several home-page sections (`Cash App Green`, `Cash App Tags`, savings, P2P, security, testimonial) are carried by `.mp4`/`.webm` files with **no transcript, no captions reference, and no text equivalent** in the markup beyond the section heading. The product's newest feature (`Tags`) is explained primarily by a silent video.
- **`Your Privacy Choices`** is present in the footer with `href="#"` — the CCPA opt-out link does not resolve in the server HTML, presumably bound client-side. A keyboard or no-JS user cannot exercise the opt-out from the rendered page.
- **`Explore security features→`** and similar include the arrow glyph inside the link text, which will be announced.
- **Two empty interpolation slots** in the status-page subscribe copy ("via ." / "You'll receive .").
- The status page is Atlassian Statuspage, which brings its own reasonable baseline; severity is conveyed by both text and colour.

**Negative findings, recorded honestly**

- **Instant-transfer fee stated two different ways**: `0.5%–2.5%`, `$0.25-$1` minimum, `$75` cap (`/bank/no-fees`) vs `0.5%-1.75%`, `minimum of $0.25`, no cap (`/send`).
- **Standard-transfer timing stated two ways**: "up to 3 business days" (`/send`) vs "1–3 business days" (`/bank/no-fees`).
- **User count stated two ways**: `59 million+ active accounts` (home) vs `57+ million people` (bank).
- **The 3% credit-card send fee is missing from the dedicated fee page.**
- **`flat fee` for Borrow is never quantified** on any harvested page.
- **`spend actives`** — internal segmentation jargon in a consumer lending footnote.
- **`$cashtag` vs `$Cashtag`** — inconsistent capitalisation between marketing and help titles.
- **Capital One is cited in the comparison table's source line but is not a column.**
- **Help centre is unreachable without JavaScript** — the entire support corpus is invisible to any non-JS client, including some assistive and low-bandwidth contexts.
- **`Your account was closed`** — passive, agentless title for the most consequential event in the product.
- **Four near-duplicate security FAQs** answering the same three facts.
- **The `Cash App Tags` section** pairs "whimsical" marketing with "NOT toys. Available to 6+. Use responsibly."
- **No accessibility statement, no skip link, filename alt text, and video-only feature explanations.**

---

## Transferable patterns

1. **State the FDIC/deposit-protection condition inside the sentence, and say what it does *not* cover.** "The FDIC insures your balance only in the event that the bank(s) identified above holding your funds fails." One sentence that corrects the single most common consumer misconception in US fintech. Equally applicable to FSCS, e-money safeguarding, and any pass-through arrangement.
2. **Answer the sponsor-bank confusion by name.** `Is Cash App Sutton Bank?` as a standalone FAQ. Any product whose card says a different company's name on it should publish this question with that company's name in the title.
3. **Reframe the decline as the benefit.** "We don't charge overdraft fees… your transaction will be declined instead." The failure state is the feature. Transfers to any product that chooses a hard limit over a penalty.
4. **Defend a "free" claim with disclosure timing, not with absolutism.** "most people use Cash App without ever paying a fee. If there are ever fees… you'll know about them before you continue."
5. **Publish the average next to the maximum.** "$500" headline, "$153 average limit for first time borrowers" in the footnote. The cheapest available correction for an over-claiming headline number.
6. **Define what a prevention metric actually counted.** The $2B footnote — "where customers did not complete the payment due to our scam warning" — turns an unfalsifiable claim into a measurable one.
7. **Every incident update must name a workaround and state what still works.** "Push notifications and text messages are not affected." / "please try SMS verification as an alternative" / a bulleted list of alternative payment methods. Cash App does this on all four incidents observed, without exception. This is the strongest single practice in the file.
8. **Write a retroactive instruction into the recovery update.** "If you didn't receive a previous request, please try again." Users who abandoned during the incident need telling.
9. **Document the counterparty's onboarding inside the sender's flow**, with the deadline and the reversal: "If they don't create their account and verify… within 14 days, the payment gets returned to you."
10. **Justify a high-friction data request with the statute and close the specific worry.** The SSN answer — federal law, named statute, user benefit, `never shared with other customers`.
11. **Split product FAQs from category-education FAQs into tabs**, and repeat the status disclaimer inside each educational answer if you are not the institution you are explaining.
12. **Name the rounding algorithm.** "Cash App uses banker's rounding… rounds numbers ending in 5 to the nearest even integer."

## Caveats & gaps

- **The help centre is blocked and this is the largest gap in the file.** `cash.app/help` and every help-article URL return a client-rendered shell with no server HTML. `web_fetch` retrieved only `meta-next-head-count: 6` and a viewport tag. Per the harvest rules, no alternative retrieval route was attempted. **All help-article titles in T6, T7 and T11 were recovered from the public search index and are labelled `[documented via search index]`.** No help-article body, category tree, search no-results string, or article furniture was captured. A browser-rendered pass is required.
- **No fee schedule document exists to harvest.** Cash App's only fee disclosure outside the Terms of Service is an FAQ accordion. The Terms of Service (`/legal/us/en-us/tos`) was not fetched and would be the authoritative source for `Qualifying Purchases`, `Qualifying Deposits`, the Borrow flat fee, and the Cash App Green conditions.
- **The two fee contradictions and the two timing contradictions are quoted exactly as found.** No attempt has been made to determine which figure is correct. Verify against the ToS before reuse.
- **All in-product strings are `[documented]` or inferred.** The only strings quoted with confidence as in-app labels are those Cash App's own copy names: `Report`, `Card` tab, `Manage card`, `Design a new card`, `Profile` icon, `Linked banks`, `Link bank`, `activity feed`, `Add Cash`, `Cash Out`, `Security Lock`, `Card Lock`.
- **No accessibility statement exists**, and none is linked from any footer. Recorded as `[absent]`, not "not found".
- **No onboarding step sequence is published** on any public surface. T4 is reconstructed from scattered FAQ answers.
- **Video content is unharvestable.** Six home-page sections and several feature explanations are carried by `.mp4`/`.webm` with no text equivalent in the markup. A meaningful share of Cash App's product explanation is in video and is outside this harvest.
- **Unharvested surfaces**: `/stocks`, `/bitcoin`, `/afterpay`, `/borrow`, `/taxes`, `/families`, `/spend`, `/tags`, `/cash-app-pay`, `/bank/direct-deposit`, `/bank/overdraft`, `/bank/cash-app-green`, `/reviews`, `/learn` (the full basics hub), and all 7 scam-education article bodies.
- **Legal library not opened**: Terms of Service, card agreements (Sutton prepaid, Sutton debit flex, Bancorp debit flex), Bitcoin disclosures, Cash App Investing disclosures, House Rules, Privacy Notice, and the Block licences page.
- **Mobile app copy out of scope.** Cash App is app-first; the great majority of its transaction language is unreachable from the public web, which makes the "minimal transaction language" benchmark only partially verifiable from this harvest.

## Sources

1. https://cash.app/
2. https://cash.app/security
3. https://cash.app/bank
4. https://cash.app/bank/no-fees
5. https://cash.app/send
6. https://cash.app/savings
7. https://cash.app/card
8. https://cash.app/access-cash
9. https://cash.app/learn/outsmart-scams
10. https://status.cash.app/
11. https://cash.app/help — **blocked (client-rendered; no server HTML)**
12. https://cash.app/help/us/en-us/3042-payment-pending — **blocked**
13. https://cash.app/help/us/en-us/90131-understand-cash-app-pay-transaction-phases — **blocked**
14. https://cash.app/help/us/en-us/3128-contact-cash-support — **blocked**

Help-article titles cited in T6, T7 and T11 were recovered from the public search index via two `site:cash.app/help` searches and are attributed as `[documented via search index]` at each point of use. The URLs surfaced were:
`/help/3042-payment-pending` · `/help/us/en-US/6536-cash-app-card-transaction-security` · `/help/gb/en-us/3042-payment-pending` · `/help/us/en-US/6480-cash-app-pay-refunds` · `/help/us/en-us/65091-using-cash-app-afterpay-at-online-checkout` · `/help/us/en-us/90131-understand-cash-app-pay-transaction-phases` · `/help/us/en-us/3099-cash-card-declined` · `/help/us/en-us/110812-blocking-a-business` · `/help/us/en-us/6569-common-direct-deposit-delays` · `/help/us/en-us/3112-missing-direct-deposit` · `/help/us/en-us/3139-close-account` · `/help/us/en-US/8009-your-account-is-closed` · `/help/us/en-US/80091-our-approach-to-inactive-accounts` · `/help/us/en-us/6552-cash-card-dispute-status-and-lifecycle` · `/help/us/en-us/309115-cash-card-dispute-purchase` · `/help/us/en-US/17382-dispute-an-original-credit-transaction` · `/help/309114-merchant-refunds` · `/help/us/en-us/3132-cashtags` · `/help/us/en-us/5504-cashtag-requirements`
