# 050. Kuda

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Digital microfinance bank, Nigeria — retail current account, savings, overdraft, bill payments, US-stock investing |
| Primary URL | https://kuda.com/ |
| Corpus rank | 050 |
| Benchmark strength (source list) | Clear banking onboarding |
| Locale / market observed | **Nigerian English** (`og:locale: en_GB`; currency ₦/naira; market-specific institutions throughout) |
| Platform observed | Web (WordPress marketing), Intercom-hosted help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **A licensed bank**, unlike every other product in this batch. Footer, on every page: "Kuda Microfinance Bank Limited is incorporated in Nigeria (**RC No: 796975**) and is licensed by the **Central Bank of Nigeria as a National Microfinance Bank**. Deposits are insured by the **Nigerian Deposit Insurance Corporation**." Two trust marks render in the hero and on product pages: `Fully licensed by the CBN` and `Deposits insured by NDIC`. Identity regime is **BVN** (Bank Verification Number, CBN-owned database) and **NIN**, with tiered account limits determined by which is supplied. Tax disclosures cover **stamp duty** and **7.5% VAT on transaction fees**. A `CBN 24 Hour Rule for New Accounts` article exists. Note a corporate-entity split: the marketing site is operated by Kuda Microfinance Bank Limited (Nigeria) while the help centre footer reads "© 2026 **Kuda Technologies Ltd (Company No.11472232)**" — a UK company number. |
| Harvest date | 2026-09-21 |
| Pages inspected | 8 |
| Harvest completeness | Partial — help centre is Intercom-hosted and fully server-rendered (browsable, unlike Venmo/PayPal). Collection inventories captured for Payments and Security; the other twelve collections were listed but not opened. No consolidated fee schedule page exists; fees are distributed across the FAQ, the transfers page and a comparison table. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.kuda.com/ | Hero, three-verb model, competitor comparison table, trust marks |
| FAQ | https://www.kuda.com/faq/ | Three tabs (General / Kuda Business / Open API), ~60 questions |
| Transfers | https://www.kuda.com/transfers/ | Fee disclosure, product claims |
| Security | https://www.kuda.com/security/ | Ten named protections |
| Scam & Fraud Awareness | https://www.kuda.com/scam-awareness/ | Channel-authenticity model, scam taxonomy |
| Help centre landing | https://www.kuda.com/help-center/ | Six-route hub |
| Help centre home | https://help.kuda.com/en/ | Fourteen collections with scope lines and article counts |
| Help: Payments | https://help.kuda.com/en/collections/8357620-payments | 26 article titles |
| Help: Security | https://help.kuda.com/en/collections/8357590-security | 18 article titles |
| Help: Transaction Status | https://help.kuda.com/en/articles/11484257-transaction-status | Six-state model |
| Help: What Happens When You Send Money | https://help.kuda.com/en/articles/8954174-what-happens-when-you-send-money | NIBSS mechanism explainer |

---

## T1 Navigation & IA labels

**Global nav — audience toggle, then product groupings** `[observed]`

Top level: `Personal` / `Business` toggle, plus `Help` and `Sign in`, with `Join Kuda` as the persistent CTA.

Each audience tier expands to a **descriptor sentence plus a product grid**:

> Personal: "Kuda is the digital bank built for Nigerians who want more from life."
> Business: "Kuda Business is the all-in-one business manager for Nigerian entrepreneurs."

Putting a **positioning sentence inside the nav dropdown** is unusual and effective — the user gets the proposition while browsing the menu rather than only on the landing page.

**Personal product labels, each with a one-line scope** `[observed]`

| Label | Scope line (verbatim) |
|---|---|
| `Transfers` | "Get 25 free transfers to any bank, every month." |
| `Borrowing` | "Access loans and overdrafts when you need them." |
| `Savings` | "Save with a range of products earning up to 20% per year." |
| `Kuda Premium` | "Unlock cashback, discounts, and priority support." |
| `Kuda Card` | "Order a physical or virtual card for safe payments." |
| `Investments` | "Invest in top US stocks from as little as ₦20,000." |

Every scope line **carries a number or a concrete noun**: 25, 20%, ₦20,000, "physical or virtual". Compare Wise's scope lines, which are verb-runs, and Chime's, which are task lists. Kuda's are **claim-bearing** — the nav itself is doing selling. Four of six begin with an imperative verb (`Get`, `Access`, `Save`, `Unlock`, `Order`, `Invest`), so the menu reads as a list of things the user can do.

`Borrowing` as a label is notable: a gerund naming the user's activity rather than "Loans" naming the product. Kuda uses the same instinct for `Payments`, `Collections`, `Send`, `Rewards`, `Credit` as business sub-groupings — all activity nouns.

**Bill-payment labels are bare category nouns** `[observed]`: `Airtime` · `Betting` · `Cardless Payments` · `Electricity` · `Gift Cards` · `Internet` · `Transport` · `TV`.

`Airtime`, `Betting` and `Transport (Cowry)` are market-specific: airtime top-up is a core Nigerian banking utility, betting payments are a mainstream category, and Cowry is the Lagos transport card. A Nigerian user reads this list as complete; a non-Nigerian reads it as idiosyncratic. Including `Betting` as a first-class nav item — on a bank — is a market-truthful IA decision most Western banks would not make.

**Help IA — three layers, and they do not agree** `[observed]`

1. `kuda.com/help-center/` — a six-tile hub: `Help articles` · `Self help` · `Contact us` · `Scam awareness` · `FAQs` · `Security`
2. `kuda.com/faq/` — a separate three-tab FAQ
3. `help.kuda.com/en/` — the actual Intercom help centre with fourteen collections

So a user seeking help encounters **three distinct answer stores** with overlapping content and no stated division of labour. The `help-center` page is a router with six links and nothing else; it contains no content of its own.

**Help-centre collections — fourteen, each with a scope line and an article count** `[observed]`

| Collection | Scope line | Articles |
|---|---|---|
| `Add Money` | "How to add money to your Kuda account" | 5 |
| `Accounts` | "Statements, Account levels and Rules" | 16 |
| `Security` | "Keeping your account safe" | 18 |
| `Cards` | "Make more payments with your Kuda Card" | 9 |
| `Payments` | "Transfers, Account Limits and more" | 26 |
| `Privacy` | "Data tracking and privacy" | 1 |
| `Savings` | "Automate your saving to meet your goals" | 8 |
| `Overdraft` | "Everything you need to know about Kuda Overdrafts" | 4 |
| `Bills` | "Airtime, eSIMs, Bills and Utilities" | 16 |
| `FAQs` | "Frequently Asked Questions" | 3 |
| `Apps` | "Devices that are not supported" | 1 |
| `Rewards` | "Kuda premium and more" | 10 |
| `Investments` | "Invest in US Stocks" | 7 |
| `Get help` | "Support, Report a payment, Self-help" | 4 |

**Publishing the article count per collection is the standout IA decision here.** The user can see before clicking that `Payments` has 26 articles and `Privacy` has 1. It sets expectations, and it exposes the shape of the content estate — including its gaps.

And the gaps are visible: **`Privacy` has one article and `Apps` has one article**, whose scope line is not a topic but a symptom — "Devices that are not supported". A one-article collection whose description is a known limitation is a collection created to host a single FAQ. `FAQs` as a collection *inside* a help centre, containing three articles, sitting alongside a separate site-level FAQ page, compounds the three-store problem.

**Scope-line grammar is inconsistent**: some are noun lists (`Statements, Account levels and Rules`), some gerunds (`Keeping your account safe`), some imperatives (`Make more payments with your Kuda Card`), one is a bare restatement (`Frequently Asked Questions`), one is a limitation (`Devices that are not supported`).

**Footer groupings** `[observed]`: `Personal Banking` · `Business Banking` · `Help` · `Company` · `Transparency` · `Social Media` · `Email Us` · `Visit Us`.

`Transparency` — the same label Nubank uses for its legal group — contains `Cookie Policy` · `Disclaimers` · `Information Security Policy` · `Privacy Policy` · `Terms & Conditions` · `Vulnerability Disclosure Policy` · `Whistleblowing Policy`. Publishing an **Information Security Policy**, a **Vulnerability Disclosure Policy** and a **Whistleblowing Policy** in the consumer footer is above-market practice.

**`Visit Us`** lists two physical addresses, one of which reads:

> **Abuja**
> Branch opening soon
> Wuse 2, Abuja

Publishing a **not-yet-open branch** in the footer address block, on every page, is a real content decision — it signals physical presence to a market that values it, while the "opening soon" does the honest work. It has presumably been there some time.

**No accessibility link anywhere in the footer.** `[absent]`

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `The digital bank built for Nigerians`
> `More from your money, More for your life`
> "Send money fast, spend with confidence, and save automatically with Kuda."
> CTA: `Download Kuda`

Three things.

**(a) The audience is in the headline.** Not the task (Wise), not a rank (Chime), not a verb list (PayPal) — the *people*. `built for Nigerians` is a nationality claim as a product claim, and it recurs in the nav descriptor ("built for Nigerians who want more from life"), the meta description ("the digital bank built for Nigerians"), and the title tag ("The bank built for more"). For a market served historically by banks that were built for someone else, naming the audience is the differentiator.

**(b) `More from your money, More for your life`** — a two-clause parallel with a capital M mid-sentence after a comma. Grammatically it should be a semicolon, an em-dash or a lowercase second clause. As shipped it reads as two headlines fused. The `more` theme is load-bearing across the site: `The bank built for more` (title tag), `want more from life` (nav), `Switch to more rewarding banking` (section header), `Explore Products and Services` → "get more from their money every day" (app block). Five uses.

**(c) The site calls itself `the digital bank`** and is entitled to — unlike every other product in this batch, Kuda holds a banking licence. That entitlement is then evidenced immediately by the two trust marks.

**Trust marks as hero furniture** `[observed]`

> `Fully licensed by the CBN` [+ CBN logo]
> `Deposits insured by NDIC` [+ NDIC logo]

Placed directly under `Join over 8 million customers`, above the fold, on the homepage **and repeated on product pages** (observed on `/transfers/`). Leading with the regulator and the deposit insurer — as graphical trust marks, not footnotes — is the single clearest structural difference between this file and the three US fintech files, where the equivalent content is a negation buried in small type.

`Fully licensed` is doing slight rhetorical work (`fully` adds nothing legally) but the claim is substantiated by the RC number and licence description in the footer.

**Three-verb product model** `[observed]`

| Verb | Copy |
|---|---|
| `Send` | "Send money fast, schedule payments, and get 25 free transfers every month." |
| `Spend` | "Scan to pay, get a physical or virtual debit card, and earn Kuda Coins as you spend." |
| `Save` | "Save automatically with Spend+Save, set savings goals, and earn up to 20% interest." |

One-syllable imperatives, each followed by a three-item list, each list ending on the benefit. This is the cleanest value-prop structure in the batch — compare Venmo's `Send. Split. Gift.` (three verbs, no detail) and Chime's six blocks (detail, heavier). Kuda's three-plus-three is the right density for a hero-adjacent block.

**Benefit claims with the number attached** `[observed]`: `Rated 4.8 stars on the App Store` · `Over 8 million customers` · `Rated 4.5 stars on Google Play` · `Awarded 'Inclusive Financial Product' 2024 by the CBN` · `Invest in top US stocks from as little as ₦20,000` · `earn up to 20% interest`.

**The CBN award is the interesting one** — `Awarded 'Inclusive Financial Product' 2024 by the CBN`. The regulator appears twice in the trust furniture: once as licensor, once as awarder. Citing your regulator as a source of praise is a move only available to a licensed entity, and Kuda uses it.

**Section headers** `[observed]`: `Unlock rewards with Kuda Premium` · `Pay bills with less stress` · `Switch to more rewarding banking` · `Download the app` · `Your questions, answered` · `How Kuda protects you` · `The bank of the free`.

`Pay bills with less stress` names the emotional problem (stress) rather than the functional one (time, fees). `The bank of the free` is a compressed, slightly odd pun — "free" as in free-of-charge and free-as-in-liberty — heading the transfer-fee disclosure.

**The competitor comparison table** `[observed]`

Headed `Switch to more rewarding banking`, a seven-row table with columns `Kuda` and `Other banks`:

| Row | Kuda | Other banks |
|---|---|---|
| Alerts | Free instant notifications | Charge for SMS alerts |
| Annual savings rates | Up to 20% | Up to 5% |
| Bill payment fees | Free | Up to ₦100 per bill |
| Card delivery | Yes | Not always |
| Card maintenance fees | Free | Up to ₦50 per quarter |
| Instant reversals | Yes | No |
| Maintenance fees | No | Yes |

Direct competitor comparison with **specific naira figures attributed to unnamed competitors** is aggressive and legally exposed — "Other banks" is an unattributed aggregate, and "Instant reversals: No" is a categorical claim about an entire sector. There is no footnote, no date, no methodology and no source anywhere on the page.

It is also, as content, extremely effective for the audience: every row names a charge Nigerian bank customers recognise and resent (SMS alert fees, quarterly card maintenance, per-bill charges). `Instant reversals` is the row that matters most — failed-transfer reversal delay is the defining pain of Nigerian interbank transfers, and Kuda puts it in a comparison table. See T6/T7 for how the product content handles it.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Join Kuda` | Global nav, footer, sticky — dominant CTA | **Membership framing**, not "Sign up" or "Open an account" |
| `Download Kuda` | Hero, transfers page | Brand-as-object |
| `Send money` / `Get started` / `Start saving` | Three-verb blocks | Task-matched per block — good |
| `Explore Products and Services` | Nav, bill block | |
| `Explore Personal` / `Explore Business` | Footer | |
| `Explore Premium` / `Upgrade to Premium` | Premium blocks | Two labels, one destination-family |
| `Explore Overdrafts` / `Explore Investments` | Feature blocks | |
| `Learn more` | Transfers page ×2, promo banner ×1 | **Bare, object-less, ×3** |
| `Visit our Help Center` | FAQ page foot | |
| `Help` | Nav | |
| `Sign in` | Nav | |
| `Contact Us` / `Contact us` | Footer / help hub | Two capitalisations |
| `Dismiss` | Cookie/promo banner | |
| `Download logo PNG` / `Download press kit ZIP` | Nav area | Press assets exposed in the consumer nav |
| `Report This Transaction` | In-app, transaction detail | `[documented]` — see T7 |
| `Add Money` → `Add By Card` / `Add By Deposit` | In-app funding | `[documented]` |
| `More` → `Statements & Reports` | In-app | `[documented]` |
| `More` → `Chat With Us` | In-app support | `[documented]` |
| `Sign up with Kuda` / `Sign up with email` | Business onboarding | `[documented]` |
| `Freelancer Account` / `Full Business` | Business account-type selection | `[documented]` |
| `Hub` → `POS` | Business in-app | `[documented]` |
| `Get` | Statement download | `[documented]` |

**Observations.**

- **`Join Kuda` over "Sign up"** is the same membership framing as Nubank's `Quero ser Nubank` and Chime's `member`. Three of five products in this batch avoid transactional signup language.
- **The three-verb blocks have three different CTAs** — `Send money`, `Get started`, `Start saving` — all pointing at the same app-download link. Two of three are task-matched to their block; `Get started` in the `Spend` block is the odd one out and should have been "Get a card" or similar.
- `Learn more` ×3 bare, including twice on the transfers page where both instances point at the same app-download link and neither actually leads to more information. **A `Learn more` that goes to an app store is a mislabelled CTA.**
- `Explore` is used six times as a verb across different objects. It is the house verb, as `Conheça` is Nubank's.
- **`Download logo PNG` / `Download press kit ZIP`** render in the consumer header area. Press assets in the main nav is a build artefact leaking into the consumer surface.

## T4 Onboarding & getting-started — PRIORITY (benchmark strength)

Kuda is benchmarked for clear banking onboarding, and the strength is concentrated in the **FAQ's eligibility and account-tier content**, not in a stepped narrative.

### The tiered-account explanation — the best onboarding disclosure in this batch `[observed]`

`What kind of account will I get?`

> "If you sign up with your name, phone number and BVN (Bank Verification Number), you'll get an account limited to a **maximum balance of 300,000 naira**, a **maximum deposit of 50,000 naira at a time** and a **maximum transfer of 50,000 naira at a time**.
> If you add a government-issued ID (like your driver's license, national ID card or international passport) to your Kuda profile, **we'll remove those limits from your account**."

Why this is exemplary:

1. **The limits are stated in full before the user signs up**, with three separate figures, not "limits apply".
2. **The upgrade path is in the same answer**, framed as removal of a restriction rather than unlocking a reward — "we'll remove those limits" is more honest than "upgrade to Tier 3".
3. **The ID examples are enumerated**, so the user can check whether they have one before starting.
4. The question itself is phrased from the user's uncertainty (`What kind of account will I get?`) rather than as a policy heading ("Account tiers and limits").

This is KYC tiering — a CBN regulatory structure — translated into two sentences a user can act on. Most banks publish a tier table; Kuda publishes the consequence.

### Requirements, stated minimally `[observed]`

`What do I need to open a Kuda account?`

> "To open a Kuda account, you must be **at least 16 years old** and you must have an **email address** and a **phone number**."

Three requirements. **Age 16** — the lowest threshold in this batch (Chime and PayPal require 18). Notable for an inclusion-positioned product, and it goes unremarked in the copy.

Note the requirement list **omits the BVN**, which the very next FAQ treats as effectively mandatory ("We ask you to confirm your BVN so we can be sure no one is pretending to be you") and which the security page states as universal: "We ask everyone who opens a Kuda account to give us their BVN… and a valid ID issued by the government." Three pages give three different pictures of what is actually required: *email + phone*, *BVN required*, *BVN and government ID required*. See T10.

### The BVN answer — trust objection handled in three sentences `[observed]`

`Why do you need my BVN?`

> "We ask you to confirm your BVN so we can be sure **no one is pretending to be you**.
> When you confirm your BVN, we match your details with the information on the national BVN database owned by the Central Bank.
> **We won't use your BVN to access your other bank account(s).**"

Purpose → mechanism → **negation of the specific fear**. The third sentence is the one that matters: BVN reluctance in Nigeria is driven by the belief that sharing it exposes your other accounts. Kuda names and denies that exact inference. Structurally identical to Nubank's permissions answer ("None of these permissions authorises Nubank to access the content of your conversations").

The denial is repeated on the security page: "we don't use your BVN to access any other bank account(s) you may have." Saying it twice, on two surfaces, is correct for the objection's weight.

### `How does Kuda make money?` — published voluntarily `[observed]`

> "We make money by **using collective deposits to make investments and issue credit**.
> We also make money from commission on airtime purchases and from **service fees sellers pay us when people like you shop with their Kuda Card**."

**No other product in this batch answers this question at all.** Kuda explains fractional-reserve banking and interchange in two sentences, in a consumer FAQ, unprompted by any regulation. For a product whose headline claim is "free", pre-empting "then how do you make money?" — the natural suspicion — is the right move and the honest one.

`people like you` in the second sentence is a small register slip (it distances the reader from the transaction they are actually in) but the disclosure itself is exemplary.

### Business onboarding — two account types, requirements enumerated `[observed]`

`What kinds of accounts does Kuda Business offer?` distinguishes:

- **`Freelancer Account`** — "for individuals running very small-scale businesses or freelancing, who need business banking services that can help them set up quickly."
- **`Full Business Account`** — "for a fully registered company running large-scale operations… Kuda currently serves Business Names and Limited Liability Companies."

Then `What are the requirements for opening a Kuda Business account?` lists documents **per account type and per legal form**: the Freelancer needs four items; a Business Name needs five (TIN, CAC number, Certificate of Incorporation, CAC BN/1, proof of address); an LLC needs six including Memorandum and Articles, CAC 7/7A or 1.1, CAC 2/2A or 1.1, and a **Board Resolution** — which then gets its own two FAQs (`What is a board resolution?` / `How do I submit a board resolution?`).

Defining the document you are demanding, in the same FAQ set, is the pattern. A sole trader who has never seen a board resolution is told what one is: "a resolution passed in a board meeting authorising certain people in a company to open and operate a bank account for the company."

The four enrolment paths (`on my phone` / `on a browser`, × two account types) are given as **four separate six-step numbered lists**, nearly identical. Redundant, but it means a user never has to translate between surfaces.

**And the pending state is given a timeframe**: `Why is my Full Business Account application pending after submission?` — "We'll let you know if your application is approved or not in the next **72 working hours**." Note `working hours`, not "business days" — an unusual and slightly ambiguous unit.

### What is missing `[absent]`

There is **no stepped personal-account onboarding narrative** on any marketing page — no "how it works", no numbered sequence for opening a personal account. The three-verb block (`Send` / `Spend` / `Save`) is a product summary, not an onboarding sequence. The strength is entirely in FAQ prose, which means it is only reachable by a user who already has a question.

Contrast the business side, which has four explicit numbered flows. The personal onboarding — the higher-volume journey — is the less documented one.

## T5 Form & field labels

Public form surface is nil; there is no web signup, only app-store links. `[documented]` labels from FAQ and help articles:

| Label / path | Context |
|---|---|
| `Add Money` → `Add By Card` / `Add By Deposit` | Funding options, each with its own instruction set |
| `More` → `Statements & Reports` | Personal statement request |
| `More` → `Account Statement` | Business statement request — **different label, same function** |
| `More` → `Chat With Us` | Support entry |
| `Hub` → `POS` | Business POS dashboard |
| `Report This Transaction` | On a transfer in account history |
| `Sign up with Kuda` / `Sign up with email` | Business enrolment fork |
| `Get` | Statement download confirm |
| `Kuda Username` | Account-number-free transfer identifier |
| `Pay ID` | Cardless online-payment identifier |
| `sign-in PIN` / `transaction PIN` / `card PIN` | **Three distinct PINs**, see below |
| `6-digit passcode` / `four-digit PIN` | Two credential lengths |

**Three PINs plus a password plus a passcode plus a passkey.** The security page enumerates: a password ("any combination of letters, numbers and special characters"), a "unique six-digit PIN" for sign-in, a transaction PIN, and a four-digit card PIN. The help centre adds `Change Your 6-digit Passcode`, `Create A Transaction PIN`, `Change Your Password`, `Change Your Transaction PIN`, and four passkey articles.

That is **six named credential types**. The security page's own sentence is hard to parse: "Every Kuda account is secured with a unique six-digit PIN that only the account holder should have access to. You can't use your Kuda account without first setting your sign-in PIN." Two sentences, and it is unclear whether "six-digit PIN" and "sign-in PIN" are the same thing — the help centre calls it a "6-digit passcode", a third name.

Compare Nubank, which names credentials by their length and nothing else (`senha de 4 dígitos`, `senha de 8 dígitos`) and thereby avoids the whole problem. Kuda's credential vocabulary is the weakest terminology area in this file and it sits on the security surface.

**`Statements & Reports` (personal) vs `Account Statement` (business)** for the same task, in the same FAQ page, three answers apart.

## T6 Status & state language — PRIORITY

Kuda ships the **most explicit, best-documented transaction-status model in this five-product batch**, and it is worth setting out in full.

### The six-state model `[documented]`

From `Transaction Status`, subtitled "Track your transfers like a Pro!":

| State | Gloss as published |
|---|---|
| `Initiated` | "You made a transaction." |
| `Sent` | "A transfer is on its way." |
| `Completed` | "A transaction has been processed successfully." |
| `Failed` | "A transaction wasn't processed successfully; you'll get a full refund (also known as a reversal)." |
| `Reversed` | "You've gotten a refund for a failed transaction." |
| `Transaction Review` | "A transaction is being looked at by our customer experience team." |

**Five observations.**

**(a) Each state is one sentence, present perfect or present continuous, subject-first.** `Initiated` is glossed as "**You** made a transaction" — the user is the actor. `Reversed` is "**You've** gotten a refund". Two of six states are written from the user's side rather than the system's. That is a deliberate inversion of the normal status-gloss convention ("the transaction has been initiated") and it makes the states legible as events in the user's life.

**(b) `Failed` contains its own remedy.** "you'll get a full refund (also known as a reversal)" — the failure state promises the money back *in the definition of the failure state*, and glosses the industry term inline. A user seeing `Failed` does not have to find out what happens next; it is in the label's explanation.

**(c) `Reversed` is a separate state from `Failed`.** Most systems would collapse these. Separating them means the user can distinguish "it broke" from "it broke and you have been made whole", which is exactly the distinction that determines whether they need to contact support.

**(d) `Transaction Review` names the team.** "being looked at by our **customer experience team**" — a human department, not "under review" or "processing". It tells the user a person is involved and therefore that a timeline is human-scale.

**(e) `Sent` vs `Completed` is the ambiguity Kuda inherits and does not fully resolve.** "A transfer is on its way" vs "processed successfully" — the gap between them is the NIBSS round trip (see T7), and the status model does not tell the user how long `Sent` may persist.

### The framing copy around the states `[documented]`

The article opens in the user's voice:

> "Ever sent money or bought airtime and thought, *"Wait… did that go through?"* 😅. We get it can be stressful not knowing if your money landed where it should."

Then the promise:

> "You'll see a clear status that tells you **exactly what's going on**, so you know if your money has moved, is still processing, or didn't go through.
> **No confusing messages. No, should you call customer service? Just peace of mind.** 😌"

And the benefits section is written as **support-deflection stated openly**:

- "You'll know **if a vendor has really received your payment**, especially useful for transfers."
- "Bought airtime but didn't receive it? Status will guide you — whether to reach out to Kuda or your network provider."
- "No more **waiting in chat queues** just to confirm if your transaction worked!"

**Assessment.** The *intent* is correct and unusually well-articulated: Kuda identified that ambiguous status drives support contacts and shipped states to remove them, then explained the feature in terms of the anxiety it removes. `did that go through?` in quotation marks is the user's actual sentence.

The *register* is the problem. Two emoji (😅, 😌), an exclamation mark, "like a Pro!", and a malformed sentence — "No, should you call customer service?" is missing a word (presumably "No wondering, should you call…"). This is content about **money not arriving**, and it is written in a tone appropriate to a feature launch. Compare Chime's dispute articles, which are flat and unemoji'd. Kuda's own scam-awareness page (T7) is correctly sombre; the payments help is not.

### Timing language `[documented]`

`up to two hours` (automatic retry window) · `one minute apart` (NIBSS responses) · `72 working hours` (business application) · `8:00 am and 5:00 pm on weekdays` (phone support, per one FAQ).

The **two-hour window** is the notable one — it is a precise, publicly committed automatic-retry period, stated before the user needs it (see T7).

## T7 Error, failure & recovery — PRIORITY

### `What Happens When You Send Money` — the mechanism explainer `[documented]`

This is the strongest single help article in the Kuda file. It explains the interbank rail, in four steps, to a consumer:

1. "We move the money from your account to **NIBSS**, the Nigeria Interbank Settlement Scheme, which is responsible for moving money between banks."
2. "NIBSS sends **two responses** back to us **one minute apart**: The first response lets us know if the money has gone through to the receiving bank or not. The second response is a confirmation of the first response."
3. "If the money gets to the receiving bank, it'll show up in the beneficiary account. If the money doesn't get to the receiving bank, **we'll reverse it into your account automatically**."
4. Then the heading: **`But it's not always that simple.`**

The fourth section is what makes the article:

> "Sometimes, NIBSS **doesn't give us a definite response** that the transfer went through or did not go through. If this happens, we'll keep trying to complete or reverse the transfer automatically for **up to two hours**.
> If we can't complete or reverse the transfer automatically within two hours, we'll **queue it for a manual reversal** into your account.
> If your transfer isn't completed or reversed in two hours, feel free to **report the transfer** (tap the transfer in your account history then tap the **Report This Transaction** button) or send us a message on the app."

**Six things worth recording.**

1. **Kuda names the third-party rail and explains it.** NIBSS is expanded on first use and its function stated. Most banks would say "your transfer is being processed".
2. **It discloses that the rail is sometimes indeterminate.** "NIBSS doesn't give us a definite response" is an admission that the underlying infrastructure produces ambiguous outcomes — a structural failure of the national payment system, published in a consumer help article.
3. **It commits to a bounded automatic-retry window (two hours)** and states what happens after it (manual reversal queue).
4. **It gives the user a threshold for acting.** "If your transfer isn't completed or reversed in two hours" — the user knows exactly when waiting stops being reasonable. Compare Chime's "45 or 90 days" with no rule for which.
5. **It names the in-app control**: `Report This Transaction`, with the path to reach it.
6. **`But it's not always that simple.`** as a section heading is a small piece of excellent writing — it signals the pivot from the happy path to the real one, in six words, and prepares the reader to be told something unwelcome.

`feel free to report the transfer` is the one soft note; "feel free to" understates the user's entitlement at the two-hour mark.

**This article is the direct answer to the homepage comparison table's `Instant reversals: Yes` claim.** The marketing asserts instant reversals; the help article explains that reversals are automatic where NIBSS responds, retried for up to two hours where it does not, and manual thereafter. The two are reconcilable but not identical, and a user who reads both will notice.

### The `Payments` collection — 26 titles as an unhappy-path inventory `[observed]`

Failure and recovery titles, in the order they appear:

- `Pending Or 'Hanging' Transfers`
- `Why You Sometimes Get A 'Duplicate Transaction' Error`
- `Spending Limits On Your Upgraded Account` — sub-line: "Transfers, withdrawals and card payments."
- `What Happens When You Send Money` — sub-line: "Everything you need to know about transfers to other banks."
- `Transaction Status` — sub-line: "Track your transfers like a Pro!"
- `An Important Update About Stamp Duty` — sub-line: "Updated Stamp Duty Charge"
- `What The 7.5% VAT On Transaction Fees Really Means`

**`Pending Or 'Hanging' Transfers`** is the outstanding title. **`Hanging`** is the Nigerian colloquial term for a transfer stuck in limbo — the word users actually say and search. Kuda puts the formal term first and the vernacular term second, in quotation marks, **in the article title**. That is deliberate SEO-and-empathy work: the article is findable by the official word and by the real one, and the quotation marks signal "we know what you call it".

This is the Kuda equivalent of Wise's `Where is my money?` and Nubank's `E agora?` — the product meeting the user in their own register at the moment of anxiety. It is also the best argument in this corpus for writing help titles in market vernacular rather than in style-guide English.

**`Why You Sometimes Get A 'Duplicate Transaction' Error`** does the same for an error string — it quotes the literal error text the user saw, so a user searching the error message finds the article. Quoting your own error string in your help title is a small, cheap, underused technique.

**`What The 7.5% VAT On Transaction Fees Really Means`** — `Really Means` signals that the official announcement was unclear and this article is the translation. A help article positioned explicitly as a plain-language gloss on a tax change.

Other titles worth noting: `Direct Debits` (sub-line: "Pay bills, loans, Investments automatically" — note the stray capital I), `Kuda To Kuda Transfers` ("Send to any Kuda Account for free"), `CBN 24 Hour Rule for New Accounts` (a regulatory restriction on new accounts, documented — and the only title in the collection not in Title Case).

**Title-case inconsistency is systematic.** The collection uses Title Case On Every Word (`Set Your Daily Transfer Limit`, `Share A Transaction Receipt`) including on articles and prepositions — `A`, `To`, `On`, `Or` are all capitalised. Then two titles break it: `CBN 24 Hour Rule for New Accounts` and `What The 7.5% VAT On Transaction Fees Really Means` (mixed). Capitalising `A` and `To` is a real readability cost across 26 titles.

### The `Security` collection — 18 titles `[observed]`

- `How Kuda Protects You`
- `Why We Block Accounts`
- `Block Your Account` — sub-line: **"Think someone has access to your account? Don't wait."**
- `Protect Yourself From Fake Transaction Alerts`
- `Use Private Mode`
- `Safety Mode`
- `How to Hide Your Savings and Investment Balance`
- `Take Screenshots On Kuda For Android`
- `Passkeys` / `Setting Up a Passkey on Your Device` / `Passkeys FAQ – Everything You Need to Know` / `Switching Devices with Passkeys`
- `The Kuda Whistleblowing Policy`

**`Block Your Account` with the sub-line "Think someone has access to your account? Don't wait."** is the best emergency microcopy in the file. Question, then two-word imperative. `Don't wait.` is doing the work — it overrides the hesitation that costs money in an account-takeover.

**`Why We Block Accounts`** — first-person-plural, explaining the company's own adverse action, sitting immediately above the article that tells you how to do it yourself. Pairing "why we do this to you" with "how you do this yourself" in adjacent articles is a good arrangement.

**`Protect Yourself From Fake Transaction Alerts`** is market-specific and important: fake credit alerts (SMS or screenshot) used to defraud sellers are a common Nigerian scam. The article exists because the threat exists locally.

**`Take Screenshots On Kuda For Android`** and `Use Private Mode` are a related pair — Kuda blocks screenshots by default (a privacy protection) and has to document how to allow them. A protection that generates its own help article.

Four of eighteen security articles are about passkeys, including one titled `Passkeys FAQ – Everything You Need to Know` with the sub-line "All You Need to Know About Kuda Passkeys" — **the title and the sub-line say the same thing twice**.

### Scam and fraud content `[observed]`

The `Scam And Fraud Awareness` page is structured around a single strong idea: **document every legitimate way Kuda will contact you, so anything else is fraud by elimination.**

`How we may contact you off your Kuda app` enumerates:

**Emails** — "All emails from us will always come from addresses that end in 'kuda.com' e.g. kuda.com, news.kuda.com and alerts.kuda.com." Then five named message types: transaction alerts, announcements, device change, password change, account statement.

**SMS** — four named types (phone confirmation, BVN confirmation, card payment confirmation, overdraft marketing and repayment reminders), plus: "every SMS we send you will have a clear and consistent sender name – **Kuda**."

**Phone calls** — reasons enumerated ("to follow up on a complaint or transaction dispute, to give you important information… to share a survey with you, or just to check up on you"), then the promise: "we'll tell you who is calling and why we're calling, and we'll never ask you for confidential account details like your password, passcode, transaction PIN, card CVV… or your Pay ID."

**Social media** — official accounts listed, with a warning: "Please, look out for spam social media accounts that pretend to be Kuda."

**WhatsApp** — and this is the standout line:

> "We sometimes send overdraft repayment reminders through WhatsApp, but **we never use WhatsApp for customer support. There is no public Kuda WhatsApp number.**"

**Declaring the non-existence of a channel is the single most useful anti-fraud sentence in this file.** WhatsApp impersonation is the dominant Nigerian bank-fraud vector; "there is no public Kuda WhatsApp number" converts every WhatsApp approach into a provable fake. It is also an operational commitment the company has bound itself to publicly.

The page also gets the register right — no emoji, no exclamation marks, short declaratives, and it opens with the never-share list rather than with reassurance:

> `Personal information you must never share`
> - Your Kuda password, passcode and transaction PIN.
> - Your card PIN and CVV (the three-digit number on the back of your debit card).
> - Your Pay ID.

CVV is glossed inline, every time it appears.

**Scam identification** is split into `Common payment scams` (four scenarios) and `How to identify a scam` (four signals), the latter including a fake URL example — "eg. nameofbank.agent.direct-link.com" — which is more useful than "check the link looks right".

And the **consequence of reporting is disclosed**:

> "If you report a suspicious transaction or a suspected scam, **we may restrict your account temporarily to protect your money while we investigate your report.**"

Telling a victim in advance that reporting may freeze their account is essential and almost never done. Without it, the freeze reads as punishment for reporting.

There is also a social-media instruction with its reason: "Don't post details of suspected scams or suspicious transactions on social media because **we will not be able to respond to you there for security reasons.**"

### Contact-route contradiction `[observed]`

Within a single FAQ page, two answers give different support hours and different numbers:

- `Does Kuda have a physical branch I can visit?` → "You can also reach us at selfhelp.kuda.com, email help@kuda.com, or call **0700022555832**."
- `What should I do if I need help?` → "You can also send an email to help@kuda.com or call **01 633 5832** between **8:00 am and 5:00 pm on weekdays**."
- Scam page → "please call **0700022555832** or send an email to fraud@kuda.com or help@kuda.com"

**Two different phone numbers**, one of which comes with restrictive weekday business hours and one of which comes with none, in adjacent answers on one page. For a bank whose fraud page instructs users to call "immediately", an ambiguous emergency number is a material defect.

## T8 Empty states

`[absent]` — all empty states sit behind authentication. The help centre's search renders as a `Search⌘K` control with no retrievable results state.

## T9 Notifications & system messages

`[observed]` / `[documented]`:

- **Transaction alerts are positioned as a competitive differentiator**, not a feature: the comparison table's first row is `Alerts — Free instant notifications` vs `Charge for SMS alerts`. In a market where banks bill per SMS alert, free notification is a headline benefit.
- Security page: "We send you **real time alerts** (in the form of app notifications and emails) for transactions on your account. This keeps you up to date on what's happening with your money." Both channels named, purpose stated.
- **3D Secure explained as a notification**: "When paying with your card online, we'll send you a code by SMS and/or email to authorise the payment." The user is told which channels to expect a code on — which is also an anti-phishing control.
- The five email types and four SMS types enumerated on the scam page (see T7) constitute a **published notification inventory**, which is simultaneously a feature list and a fraud defence.
- Dispute/report outcome: `Transaction Review` status is the notification-equivalent — the state itself tells the user a human is involved.
- Promo banner, site-wide: "Premium customers: earn 20% a year on a 3-month Locked Savings plan. **Limited availability.** Learn more." — a persistent top-of-page promotional bar with a scarcity claim and a `Dismiss` control.

**Unsaved-beneficiary confirmation — the best-explained friction in the file** `[observed]`

From the security page:

> "When you're sending money to a beneficiary you haven't saved, we ask you to confirm that you're sure you want to make the transfer. We do this to **give you some time to double check that you're not being scammed – completed transfers are almost impossible to reverse.**"

The confirmation step is justified by its reason, and the reason includes the hard truth: **completed transfers are almost impossible to reverse.** Explaining deliberate friction — rather than apologising for it or leaving it unexplained — makes the user a participant in the control rather than an obstacle to it. Compare Nubank's `aviso de risco` answer, which does the same job from the other direction.

## T10 Disclosures, legal & compliance — PRIORITY

### The licensing disclosure — positive, not negative `[observed]`

Kuda is the only product in this batch that can make an affirmative regulatory claim, and it structures it accordingly.

**Footer, every page:**
> "Kuda Microfinance Bank Limited is incorporated in Nigeria (RC No: 796975) and is licensed by the Central Bank of Nigeria as a National Microfinance Bank. Deposits are insured by the Nigerian Deposit Insurance Corporation. Our registered office address is 1-11 Commercial Avenue, Yaba, Lagos, Nigeria."

Four elements: **legal name**, **registration number**, **licence type and licensor**, **deposit insurer**, plus a physical address. That is a complete regulatory identity in one sentence-pair.

**Hero trust marks:** `Fully licensed by the CBN` and `Deposits insured by NDIC`, with both logos, repeated on product pages.

**FAQ:** `Is Kuda a registered bank?` → "Yes, we have a national microfinance banking license from the Central Bank of Nigeria. Our registration number is RC 796975."

**Security page:** "We insure all deposits you make into your Kuda Microfinance Bank account with the National Deposit Insurance Commission (NDIC)."

**FAQ:** "For extra protection, we insure every deposit you make into your Kuda account with the **Deposit Insurance Fund** of the National Deposit Insurance Commission (NDIC)."

**Assessment, and the defects.**

The disclosure is prominent, repeated and evidenced — a structural inversion of the US fintechs, where the equivalent content is a negation in small type. A Nigerian user learns from the hero that this is a licensed bank with insured deposits.

But three problems:

1. **The NDIC's name is wrong in two of four instances.** It is the Nigerian Deposit Insurance **Corporation**. The security page and one FAQ both render it "National Deposit Insurance Commission" — wrong in both the first word and the last. The footer gets it right. **A deposit-insurance body misnamed on the security page of a licensed bank** is the most serious factual defect in this file.
2. **No coverage limit is stated anywhere.** NDIC insurance is capped per depositor per institution. Every instance says deposits are insured; none says up to how much. Compare Chime, which states `$250,000 per depositor, per insured bank, per ownership category` in four separate places. "We insure **all** deposits" and "we insure **every** deposit" are, without a cap, overstatements.
3. **"we insure" attributes the insurance to Kuda.** The NDIC insures the deposits; Kuda is the insured institution. "We insure every deposit you make" reads as though Kuda is the insurer. The footer's passive construction ("Deposits are insured by the Nigerian Deposit Insurance Corporation") is correct; the security page's active one is not.

The **microfinance bank** licence class is also never explained. A National Microfinance Bank is a different regulatory category from a commercial bank, with different permitted activities and different NDIC treatment. The site says "the digital bank" throughout and discloses the licence class only in the footer's legal line, without glossing what it means.

### Fee disclosure — distributed, with no schedule `[observed]`

**There is no fee page.** Fees appear in three places:

**Transfers page:**
> "We move money fast and offer unlimited free transfers from your Kuda account to other Kuda accounts. For those not on Kuda you can transfer **25 times for free**, and after that we charge a low fee of **₦10 per transfer**."

**FAQ, `What fees do you charge?`:**
> "You can make unlimited free transfer from your Kuda account to other Kuda accounts.
> We'll give you **25 free transfers to any other bank every month if you sign up with your Bank Verification Number (BVN) or National Identification Number (NIN)**.
> Extra transfers will cost you **10 naira each**."

**Comparison table:** `Transfer fees — 25 free transfers every month` vs `Up to ₦50 plus VAT`.

Four observations:

1. **The 25-free-transfer allowance is conditional on BVN or NIN**, and that condition appears **only in the FAQ**. The hero, the nav scope line ("Get 25 free transfers to any bank, every month"), the transfers page and the comparison table all state the allowance unconditionally. One of five surfaces carries the condition.
2. **The transfers page omits "every month".** "you can transfer 25 times for free, and after that we charge ₦10" reads as a lifetime allowance. The nav and the FAQ both say monthly. The page dedicated to transfers is the one that drops the renewal period.
3. **Currency notation is inconsistent**: `₦10` on the transfers page, `10 naira` in the FAQ, `₦50` in the comparison table, `₦20,000` in the nav, `300,000 naira` / `50,000 naira` in the account-tier FAQ. Symbol and word alternate with no pattern, sometimes within one page.
4. **VAT is disclosed only in the competitor's column.** The comparison table says other banks charge "Up to ₦50 plus VAT" while Kuda's cell says "25 free transfers every month" — but Kuda's own ₦10 fee is also subject to the 7.5% VAT that has its own help article (`What The 7.5% VAT On Transaction Fees Really Means`). The table presents VAT as a competitor problem.

Grammar defect in the FAQ answer: "You can make unlimited free **transfer**" (singular).

**Other fees found:** "opening a Kuda Business account is free, but you might need to pay a **legal search fee** when opening a Full Business account" — a third-party cost disclosed at the point it applies, with no figure. `Does Kuda charge an account maintenance fee on corporate accounts?` → "No, we don't charge an account maintenance fee **at the moment**." The hedge is honest and unusual.

`Is there a minimum balance?` → "No, we don't have a minimum account balance."

### Tax disclosures `[observed]`

Two dedicated help articles: `An Important Update About Stamp Duty` (sub-line "Updated Stamp Duty Charge") and `What The 7.5% VAT On Transaction Fees Really Means`.

Both are **regulatory pass-through charges** — Kuda does not set them — and both are documented in the user-facing help centre rather than left to a terms document. The VAT article's title (`Really Means`) positions it as a translation of an official announcement.

### Security disclosures — ten named protections `[observed]`

The security page, headed `How Kuda protects you`, enumerates: `Your identity documents` · `Your facial identity` · `Your password` · `Your PINs` · `Biometrics` · `Confirming your unsaved beneficiaries` · `Transaction alerts` · `Card control` · `3D Secure (3DS) card payments` · `Your personal information` · `Insuring your money`.

**The possessive framing is the pattern** — seven of eleven headings begin with `Your`. The protections are described as things belonging to the user that Kuda safeguards, not as company capabilities. Contrast Chime's `Security frameworks` / `Teams of experts` / `Leading infrastructure`, which describe the company.

Standouts:
- **`Card control`** — "you can choose where your Kuda Card works – POS, online and/or ATM." Three independent channel toggles, named.
- **`Your facial identity`** — "It's mandatory for anyone opening a Kuda account to take a photo of their face during the account opening process so that we can confirm they're opening the account themselves." Mandatory stated plainly, purpose given.
- **`Your personal information`** — "We use the highest level of encryption… We don't share your information with unauthorised third parties, **we would never sell your information** and we don't use your BVN to access any other bank account(s) you may have." Three commitments, the middle one absolute.

`the highest level of encryption` is an unfalsifiable claim and the one weak line in an otherwise concrete list. Chime, by contrast, names `128-bit AES`, `NIST CSF`, `ISO 27001`, `PCI-DSS`, `SOC2` and links a certificate.

### Requirement contradiction across three surfaces `[observed]`

| Surface | What is required to open an account |
|---|---|
| FAQ `What do I need to open a Kuda account?` | Age 16+, email address, phone number |
| FAQ `What kind of account will I get?` | Name, phone, BVN → limited account; + government ID → unlimited |
| Security page `Your identity documents` | "We ask **everyone** who opens a Kuda account to give us their BVN **and** a valid ID issued by the government" |

The security page states as universal what the FAQ presents as an optional upgrade. A prospective customer reading the requirements FAQ is told three things are needed; reading the security page, five. These are reconcilable (the security page describes the full-KYC state) but no page reconciles them.

### Governance disclosures `[observed]`

The `Transparency` footer group publishes `Information Security Policy`, `Vulnerability Disclosure Policy` and `Whistleblowing Policy` alongside the usual privacy/cookies/terms. The whistleblowing policy also appears **as a help-centre article** inside the `Security` collection (`The Kuda Whistleblowing Policy`) — surfacing a governance document in the consumer help centre, where a customer might actually encounter it.

`Disclaimers` is a separate footer item.

### Entity split, unexplained `[observed]`

Marketing footer: "Kuda Microfinance Bank Limited is incorporated in Nigeria (RC No: 796975)".
Help-centre footer: "© 2026 **Kuda Technologies Ltd (Company No.11472232)**." — a UK company number format.

Two different legal entities across two properties a user moves between, with no explanation of the relationship. The help centre — where account, security and dispute guidance lives — is copyright a UK entity that the regulatory disclosure never mentions.

## T11 Help-centre architecture

**Intercom-hosted, server-rendered and fully browsable** — the only help centre in this batch besides Chime's that returns complete article inventories without JavaScript. Fourteen collections, each with a scope line and an article count, each opening to a full titled list.

Article URLs: `help.kuda.com/en/articles/{id}-{slug}`. Collections: `/en/collections/{id}-{slug}`.

**Article metadata is exposed** `[observed]`: every article shows `Written by Anietie` and a date (`August 5, 2026`). Both the Payments and Security collections show **"By Anietie · 1 author"** — a single named human wrote all 44 articles across the two collections harvested.

Publishing the author's first name on financial help content is a deliberate humanising choice. It is also a **single-point-of-failure disclosure**: the help estate has one author, and the collection pages say so.

An `On this page` contents block appears on longer articles, and each ends with **`Did this answer your question?`** plus three reaction controls rendered as text: `Disappointed Reaction` · `Neutral Reaction` · `Smiley Reaction`. The accessible names are tolerable; "Smiley Reaction" as the positive option is oddly informal for a banking help centre.

A **`Copy for LLM`** control appears on article pages — Intercom's affordance for copying article text in a machine-readable form. Worth noting as a 2026 artefact: help centres are now explicitly instrumented for AI consumption.

**Article-title grammar — five shapes**

| Shape | Example |
|---|---|
| Imperative | `Block Your Account` · `Set Your Daily Transfer Limit` · `Change Your Password` |
| `Why We/You…` | `Why We Block Accounts` · `Why You Sometimes Get A 'Duplicate Transaction' Error` |
| `What Happens When/If…` | `What Happens When You Send Money` |
| `How To / How Do I…` | `How to Hide Your Savings and Investment Balance` |
| Bare noun phrase | `Transaction Status` · `Passkeys` · `Direct Debits` · `Safety Mode` |

Imperatives dominate, which suits a task-oriented help centre. The `Why We…` shape (Kuda explaining its own adverse actions) and the quoted-vernacular shape (`'Hanging'`, `'Duplicate Transaction'`) are the two distinctive moves.

**Sub-lines are used well** — roughly a third of titles carry a one-line elaboration that changes the article's meaning: `Block Your Account` + "Think someone has access to your account? Don't wait." · `What Happens When You Send Money` + "Everything you need to know about transfers to other banks." · `Spending Limits On Your Upgraded Account` + "Transfers, withdrawals and card payments."

**Routing furniture** `[observed]` — the contact block is identical on every marketing page foot and every help page:
- `Email Us` — help@kuda.com
- `Visit Us` — two branch addresses (one "opening soon")
- Social — six platforms

The help hub (`kuda.com/help-center/`) routes to six destinations including `Self help` (`selfhelp.kuda.com`, not harvested) — a separate self-service portal, making **four** distinct help properties in total.

**The three-store problem, restated.** `kuda.com/faq/`, `help.kuda.com`, and `selfhelp.kuda.com` all exist, plus the `help-center` router page. The FAQ page's own closing CTA is `Visit our Help Center` under the heading "Didn't find an answer to your question?" — so the FAQ positions itself as the first tier and the help centre as the second, but nothing on the help centre reciprocates, and the Intercom collection literally named `FAQs` (3 articles) duplicates the relationship a third time.

## T12 FAQs

**Site FAQ page — three tabs, ~60 questions total** `[observed]`. Answers are in server HTML.

Heading: `Your questions, answered` — possessive, passive, and better than "Frequently asked questions". Intro: "We've gathered some of the most frequently asked questions we get and added our answers. If you can't find what you need our Help Center has more information or you can contact us." (Missing comma after "need".)

Tabs: `General` · `Kuda Business` · `Open API` — **a developer API FAQ sits on the same consumer page as "Is my money safe with Kuda?"**. Three audiences, one page, one tab control.

### General tab — 16 questions

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Is Kuda a registered bank? | Yes; national microfinance licence from CBN; RC 796975. |
| 2 | How is Kuda different from other banks? | Digital-first; lists what you'd otherwise queue for; no unnecessary fees; branch address. |
| 3 | Does Kuda have a physical branch I can visit? | Yes; Yaba address; plus self-help, email, phone. |
| 4 | What fees do you charge? | Free Kuda-to-Kuda; 25 free interbank monthly with BVN or NIN; ₦10 after. |
| 5 | How does Kuda make money? | Deposits invested and lent; airtime commission; merchant service fees. |
| 6 | Do you give loans? | Overdrafts now; "Term loans are launching very soon." |
| 7 | What do I need to open a Kuda account? | 16+, email, phone. |
| 8 | What kind of account will I get? | Tiered limits; ID removes them. |
| 9 | Why do you need my BVN? | Identity matching; won't access other accounts. |
| 10 | Is there a minimum balance? | No. |
| 11 | Is my money safe with Kuda? | Encryption; NDIC deposit insurance. |
| 12 | How will I get my card? | Delivered anywhere in Nigeria, or branch pickup. |
| 13 | How can I add money to my Kuda account? | Bank transfer; debit card; cash at partner banks. |
| 14 | Will I get account statements? | Yes; in-app path given. |
| 15 | Where's your office? | Yaba address. |
| 16 | What should I do if I need help? | In-app chat; email; phone with weekday hours. |

**Ordering analysis.** The sequence is: **legitimacy → differentiation → physical presence → cost → business model → credit → eligibility → limits → identity → minimum → safety → card → funding → statements → office → help.**

Questions 1, 3 and 15 are all *"are you real?"* — licence, branch, office. **Three of sixteen slots** address the question of whether the bank physically and legally exists, and two of them give the same Yaba address. For a digital-only bank in a market with a history of failed institutions and app-based fraud, that allocation is market-correct even though it is editorially redundant.

Q1 leading with licensing, and Q5 (`How does Kuda make money?`) appearing at position five, are both strong. Q5 in particular is the trust question nobody else in this batch answers.

Q6's "Term loans are launching very soon" is an undated roadmap promise in a permanent FAQ — it will age, and there is no date to tell the reader how long it has already been "very soon".

**Q2 and Q3 partially duplicate** (both end with the branch address and contact routes), and the two give different phone numbers — see T7.

### Kuda Business tab — ~30 questions

Grouped loosely: account types → requirements → four enrolment flows → application status → signatories → limits → transfers → payroll → statements → sub-accounts → POS.

`What are the minimum and maximum daily transaction limits?` and `What are the minimum and maximum single transaction limits?` are answered with four concrete figures (₦10m/₦250m daily; ₦5m/₦25m single) split by account type. Both answers open by dismissing the minimum — "There's no minimum limit for transactions, but…" — which is the right way to answer a compound question whose first half is trivially "none".

Several answers are a flat "No" with a workaround: `Can I change my personal Kuda account to a Kuda Business account?` → "No, you can't. You'll need to open a separate business account. **However**, you can use your personal Kuda account credentials to open a Kuda Business account much faster." No → consequence → mitigation, in three sentences.

`Does Kuda Business assign account officers to customers?` → "No, we don't assign account officers to customers **but our customer service team is available to attend to you.**" This answers a specifically Nigerian expectation (the relationship manager) and manages the loss.

### Open API tab — ~12 questions

Consumer-page placement aside, the copy is notably weaker: lowercase `kuda` mid-sentence ("access to the kuda internal system"), lowercase `kyc`/`kyb` used without expansion, and one answer that contradicts itself — `Are there any limitations while using the APIs?` → "There are really no limitations when using the APIs. **We have set regulations on transfers out of a kuda virtual account.**" The first sentence says none; the second names one.

`I have an app and I want to connect the API to test out my product. What do I need?` → "We do not have an option to allow developers to 'test out applications'. **Alternatively**, you can register a profile and test out your app in our sandbox." The refusal and the offer describe the same activity.

## T13 Terminology & glossary

| Term | Kuda's usage | The alternative it rejected |
|---|---|---|
| `Kuda Username` | Account identifier replacing the account number for Kuda-to-Kuda transfers | "@handle", "tag" |
| `Pay ID` | Identifier for cardless online payment from the account | "account pay", "bank transfer checkout" |
| `Pay With Bank` | The cardless online payment method | "direct debit checkout" |
| `Kuda Coins` | Spend-based reward unit | "points" |
| `Spend+Save` | Automatic savings triggered by spending | "round-ups" (Chime's term) |
| `Locked Savings` | Fixed-term savings with a rate | "term deposit", "fixed deposit" |
| `Kuda Premium` | Paid/qualified tier | "Plus", "Gold" |
| `Freelancer Account` / `Full Business Account` | The two business tiers, named by who they are for | "Tier 1 / Tier 2", "Starter / Pro" |
| `Team Banking` / `Expense Accounts` / `Merchant Suite` | Business feature names | — |
| `Hanging` (transfers) | Vernacular for stuck transfers, quoted in a help title | — |
| `Transaction Review` | The human-review transaction state | "under investigation", "on hold" |
| `Report This Transaction` | In-app escalation control | "Dispute", "Get help" |
| `Safety Mode` / `Private Mode` | Two named privacy/security modes | — |
| `Join Kuda` | Signup CTA | "Sign up", "Open an account" |
| `The bank of the free` | Transfer-fee section header | — |
| `NIBSS` | Named and expanded on first use in a consumer article | "the payment network" |
| `BVN` / `NIN` | Expanded on first use in the FAQ | — |
| `CVV` | Glossed every time: "the three-digit number on the back of your debit card" | — |
| `Kuda Coins` vs `Cashback` vs `Perks` vs `Balance Rewards` | Four reward constructs across personal and business | — |

**`Pay ID` is the terminology problem.** It appears in two incompatible roles:
- As a **product feature**: "Pay directly from your Kuda account on online stores with Pay ID, no card needed."
- As a **secret**: listed under `Personal information you must never share` alongside PINs and CVV, and in the never-ask list — "we'll never ask you for confidential account details like your password, passcode, transaction PIN, card CVV… or your Pay ID."

A user who reads the transfers page learns Pay ID is how you pay online; a user who reads the scam page learns it is a credential you must never disclose. Neither page reconciles the two, and nothing explains how you use a secret to pay a merchant. For a security-critical identifier, that is a real comprehension gap.

**`Safety Mode` and `Private Mode`** are two separately-named security features with adjacent help articles and no comparative article explaining the difference — the same gap Nubank fills with `Qual é a diferença do Modo Rua para o limite Pix?`.

**Credential naming** (see T5) is the weakest area: six named credential types with overlapping descriptions (`password`, `six-digit PIN`, `sign-in PIN`, `6-digit passcode`, `transaction PIN`, `card PIN`, plus `passkey`).

**Other terminology inconsistencies recorded:**
- `Kuda Card` — the nav and footer link both `/cards/` and `/kuda-card/`, with `Kuda Card` as link text for both.
- `Statements & Reports` (personal) vs `Account Statement` (business).
- `Loan App` appears in the footer linking to `/personal-loan/`, while the FAQ says "Term loans are launching very soon" — a footer nav item for a product the FAQ says is not launched.
- `Contact Us` / `Contact us` capitalisation.
- `naira` / `₦` used interchangeably.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, consistently and warmly: "We'll even deliver your debit card to any address in Nigeria", "We give overdrafts", "we won't charge you unnecessary fees". The company is a visible, willing actor.

**Register — Nigerian English, and it is the right choice.** `Please, note that…` and `Please, look out for…` with the **comma after "Please"** appear repeatedly. This is standard Nigerian and West African English punctuation, not an error, and its consistency across the FAQ and scam pages indicates a deliberate house style rather than drift. The brief mentions recording locale honestly: this is the clearest locale marker in the copy and it should not be "corrected" in any reuse.

Other locale markers: `airtime`, `POS` as an everyday consumer noun, `betting` as a mainstream bill category, `Cowry` (Lagos transport card), `NIBSS`, `BVN`, `NIN`, `CAC`, `TIN`, `FIRS`, `stamp duty`, `naira`/`₦`, `'hanging'` transfers, `legal search fee`.

**Register gradient — mostly correct, one clear failure.**

Correct: the scam page is sombre and declarative, with no emoji and no exclamation marks. The security page is plain. The FAQ is neutral and factual.

Failure: the `Transaction Status` help article uses two emoji (😅, 😌), an exclamation mark, "like a Pro!", and a broken sentence — on content about money not arriving. `What Happens When You Send Money` is better but still says "feel free to report the transfer" at the point where a user's money has been missing for two hours. The payments help centre is written in a launch-announcement voice; the security content is written in the right one.

**Numbers as trust devices**: `8 million customers` · `4.8 stars` App Store / `4.5 stars` Google Play (**two different ratings published side by side** — honest, and unusual; most brands quote only the higher) · `25 free transfers` · `up to 20%` · `₦20,000` · `RC 796975` · `CBN 'Inclusive Financial Product' 2024`.

**No `Oops!`** anywhere.

**Accessibility** `[observed]`

- **No accessibility statement was found on any Kuda surface.** No footer link, no policy entry, no WCAG reference, no conformance claim, no accessibility contact. Of the five products in this batch, Kuda and Nubank are the two with no statement — though Nubank at least ships a Libras channel and a Braille card. `[absent]`
- **Alt text is largely absent or a filename fragment.** Observed examples: `kuda card to pos machine` (the og:image alt), `CBN`, `NDIC`, `Google Store`, `App Store`, `buy electricity online`. Many images render with **empty alt inside an empty link** — the pattern `![]()![](url)` recurs throughout, indicating a duplicated image element where the first instance has no alt and no src.
- The trust marks `CBN` and `NDIC` carry only the acronym as alt text. A screen-reader user hears "CBN" and "NDIC" with no expansion, so the two most important trust signals on the homepage are inaccessible in substance. Compare Chime, whose equivalent badge alt text carries the full disclosure sentence.
- **Section-heading markup is inconsistent** — the FAQ page renders question headings as `### **Is Kuda a registered bank?**` (an H3 whose entire content is bold), and elsewhere `#### Personal information you must never share` sits above `##### Emails`. Bolded headings and skipped levels both degrade heading navigation.
- The homepage renders several **video files as bare links** (`https://www.kuda.com/wp-content/uploads/2026/07/SEND-corrected.mp4`) with the URL as the link text. A filename containing `-corrected` is also a build artefact leaking into production.
- `1`, `2`, `3` render as bare text carousel controls on the three-verb block.
- `Previous slide` / `Next slide` equivalents are not exposed; the carousel controls are numeric only.
- `Dismiss` is the only label on the promotional banner control.
- The help centre (Intercom) is better: it carries a **`Skip to main content`** link, a proper `Search ⌘K` control, breadcrumbs (`All Collections › Payments › Transaction Status`), and an `On this page` block. The three feedback controls have text names. The social icons in the help footer, however, render as **empty links with no accessible name**.
- `viewport` meta on the marketing site includes `maximum-scale=1.0, user-scalable=no` — **pinch-zoom is disabled**. This is a well-known WCAG 1.4.4 failure and it affects every marketing page on the site.

**Negative findings, recorded honestly**

1. **NDIC misnamed** as "National Deposit Insurance Commission" on the security page and in one FAQ answer (correct name: Nigerian Deposit Insurance Corporation). Correct only in the footer.
2. **No NDIC coverage limit stated anywhere**, while the copy says "all deposits" and "every deposit".
3. **"We insure every deposit"** attributes the insurance to Kuda rather than to the NDIC.
4. **Two different support phone numbers** in adjacent FAQ answers, one with weekday business hours and one without; the scam page's emergency number matches only one of them.
5. **`Pay ID` is both a payment feature and a never-share secret**, unreconciled across two pages.
6. **25-free-transfers condition (BVN or NIN) stated on one of five surfaces**; the transfers page also omits "every month".
7. **Account-opening requirements differ across three surfaces** (email+phone / +BVN / +BVN and government ID).
8. `user-scalable=no` disables pinch-zoom sitewide.
9. No accessibility statement; trust-mark alt text is acronym-only; widespread empty alt and empty-link image patterns.
10. Competitor comparison table makes seven specific claims about "Other banks" with no source, date or methodology.
11. `Learn more` ×3 bare, two of which lead to an app store rather than to information.
12. Three (arguably four) separate help properties with overlapping content and no stated division.
13. Title-case inconsistency across 26 help titles, including capitalised articles and prepositions.
14. Open API tab contradicts itself on limitations and on sandbox testing; lowercase `kuda`, `kyc`, `kyb`.
15. Six named credential types with overlapping descriptions.
16. `Loan App` in the footer for a product the FAQ says is not yet launched; "launching very soon" undated.
17. Entity split (Kuda Microfinance Bank Limited / Kuda Technologies Ltd, UK company number) unexplained.
18. Press-kit download links in the consumer header.
19. Emoji and "like a Pro!" on transaction-failure content.
20. Grammar: "unlimited free transfer" (singular); "More from your money, More for your life" (capital M after comma); `Passkeys FAQ – Everything You Need to Know` with a sub-line saying the same thing.

---

## Transferable patterns

1. **State the tier limits in full, before signup, and frame the upgrade as removal.** "a maximum balance of 300,000 naira, a maximum deposit of 50,000 naira at a time… If you add a government-issued ID… we'll remove those limits." KYC tiering translated into consequences the user can act on. Directly applicable to any verification-gated product.
2. **Answer "how do you make money?" voluntarily.** Two sentences, naming deposits-and-lending plus interchange. The natural suspicion behind every "free" claim, pre-empted. No other product in this batch attempts it.
3. **Negate the specific fear, not the general policy.** "We won't use your BVN to access your other bank account(s)" — said twice, on two surfaces, because that is the actual objection. Same construction as Nubank's permissions copy.
4. **Declare the channels you do not use.** "we never use WhatsApp for customer support. **There is no public Kuda WhatsApp number.**" Publishing a channel's non-existence turns every impersonation on it into a provable fake. The strongest anti-fraud sentence in this batch.
5. **Publish the complete legitimate-contact inventory** — five email types, four SMS types, the sender name, the call reasons — so that anything outside it is fraud by elimination.
6. **Explain the rail, including its indeterminacy.** Naming NIBSS, describing the two-response protocol, and admitting "NIBSS doesn't give us a definite response" — then committing to a two-hour automatic retry and telling the user when to escalate. A bounded window plus a named escalation control (`Report This Transaction`) is the complete pattern.
7. **Put the user's vernacular in the help title.** `Pending Or 'Hanging' Transfers` and `Why You Sometimes Get A 'Duplicate Transaction' Error` — quote the word the user says and the error string they saw. Cheap, and it doubles findability.
8. **Justify friction by stating the hard truth.** "we ask you to confirm… to give you some time to double check that you're not being scammed – **completed transfers are almost impossible to reverse.**"
9. **Disclose that reporting may restrict the account.** "we may restrict your account temporarily to protect your money while we investigate your report." Without this, the freeze reads as retaliation.
10. **Publish article counts per help category.** Sets expectations before the click and exposes the shape of the estate — including, honestly, where it is thin.
11. **Pair "why we do this to you" with "how you do this yourself".** `Why We Block Accounts` adjacent to `Block Your Account` + "Don't wait."
12. **Negative pattern — never misname the deposit insurer.** The NDIC is wrong in two of four instances, on the security page of a licensed bank, with no coverage limit given. Regulatory-body names and coverage caps need a single source and a verification step; this is the failure mode a content designer should take from this file.

## Caveats & gaps

- **No consolidated fee schedule exists.** Fees are distributed across the transfers page, the FAQ and a comparison table, and the three disagree on conditions and renewal period. Any fee figure in this file should be re-verified in-app before reuse.
- **`selfhelp.kuda.com` not harvested** — a fourth help property referenced from two pages.
- **Twelve of fourteen help collections not opened.** `Accounts` (16 articles), `Bills` (16), `Rewards` (10), `Cards` (9), `Savings` (8), `Investments` (7), `Add Money` (5), `Get help` (4), `Overdraft` (4), `FAQs` (3), `Privacy` (1), `Apps` (1) are listed by title and count only.
- **Only two help article bodies were read** (`Transaction Status`, `What Happens When You Send Money`). The other 42 titles in the two harvested collections are cited for IA and title-grammar evidence only; their contents are unverified.
- **All in-product strings are `[documented]`, not observed.** `Report This Transaction`, `Add By Card`, `Statements & Reports`, the six transaction states and the credential names are reconstructed from help prose. The credential-naming inconsistency (T5/T13) is direct evidence that this prose has drifted from the product.
- **Empty states entirely unreachable.** `[absent]`
- **No accessibility statement exists to harvest.** `[absent]`
- **Terms & Conditions, Privacy Policy, Disclaimers, Information Security Policy, Vulnerability Disclosure Policy and Whistleblowing Policy not harvested** — all are footer-linked and would carry further disclosure language.
- **Kuda Business and Open API surfaces sampled only via the FAQ tabs**; the business product pages were not opened.
- **Nigerian-market context is load-bearing.** `BVN`, `NIN`, `NIBSS`, `NDIC`, `CBN`, `CAC`, `TIN`, `FIRS`, stamp duty, airtime, Cowry, POS-as-consumer-noun and `'hanging'` transfers are all local institutions or usages. Patterns transfer as structural moves, not as strings; the effectiveness of the NIBSS explainer depends on a rail that exists only in Nigeria.
- **`Please,` with a comma is Nigerian English house style**, not an error, and is recorded as observed. Any reuse outside the market should not treat it as a defect to fix.
- **Mobile app copy out of scope**; Kuda is app-first with no web signup, so the great majority of the product's interface was not observable.
- The entity split (Kuda Microfinance Bank Limited vs Kuda Technologies Ltd) is recorded as observed in two footers. Its legal significance was not investigated and no inference should be drawn from it beyond the inconsistency itself.

## Sources

1. https://www.kuda.com/
2. https://www.kuda.com/faq/
3. https://www.kuda.com/transfers/
4. https://www.kuda.com/security/
5. https://www.kuda.com/scam-awareness/
6. https://www.kuda.com/help-center/
7. https://help.kuda.com/en/
8. https://help.kuda.com/en/collections/8357620-payments
9. https://help.kuda.com/en/collections/8357590-security
10. https://help.kuda.com/en/articles/11484257-transaction-status
11. https://help.kuda.com/en/articles/8954174-what-happens-when-you-send-money
