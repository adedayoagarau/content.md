# 041. Wise

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Cross-border remittance / multi-currency e-money account |
| Primary URL | https://wise.com/ |
| Corpus rank | 041 |
| Benchmark strength (source list) | Fee, exchange-rate, and timing transparency |
| Locale / market observed | en-GB and en-US (site serves both; `/gb/` and `/us/` paths) |
| Platform observed | Web (desktop), help centre, pricing |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | FCA (Electronic Money Regulations 2011, FRN 900507); FinCEN MSB in US; **explicitly not FDIC-insured** as a bank, card issued via sponsor banks member FDIC; Wise Assets entity varies by location |
| Harvest date | 2026-09-21 |
| Pages inspected | 4 |
| Harvest completeness | Partial — FAQ answer bodies are accordion-collapsed and not in server HTML; questions captured verbatim, answers not retrievable without expansion |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Send money (product) | https://wise.com/gb/send-money/ | Hero, live calculator, how-it-works, FAQ block, comparison tables |
| Pricing | https://wise.com/us/pricing/ | Fee table, disclosure framing, regulator-format link |
| Help centre home | https://wise.com/help/ | Six top-level topics with descriptions |
| Help topic: Sending money | https://wise.com/help/topics/5bVKT0uQdBrDp6T62keyfz/sending-money | 11 sub-sections, ~90 article titles — richest single source of task phrasing |

---

## T1 Navigation & IA labels

**Global nav — three audience tiers, not feature tiers** `[observed]`

`Personal` · `Business` · `Platform` · locale selector · `Help` · `Log in` · `Sign up`

Each tier expands to the same four sub-groupings, which is the notable pattern:
`Features` → `Pricing` → (Business adds `Solutions`, `Resources`; Platform adds
`Industries`, `Events`, `Developers`).

**Feature labels are verb-first and near-identical across tiers** `[observed]`

`Send money` · `Send large amounts` · `Receive money` ·
`Get a Wise Multi-Currency Card` · `Receive interest` · `Manage team finances` ·
`Connect accounting software`

**Help centre top level — six topics, each with a scope sentence** `[observed]`

| Topic | Scope line (verbatim) |
|---|---|
| `Sending money` | "Setting up, paying for, editing, and cancelling transfers." |
| `Managing your account` | "Setting up your account and getting verified." |
| `Holding money` | "Holding balances, setting up Direct Debits, and using Interest & Stocks." |
| `Wise card` | "Ordering, activating, spending, and troubleshooting." |
| `Receiving money` | "Using your account details to receive money." |
| `Wise Business` | "Multi-user access, accounting and using our API." |

Pattern worth stealing: every category label is a **gerund phrase naming the
user's activity**, and every scope line is a **comma-run of the verbs inside
it**, ending with the unhappy path (`cancelling`, `troubleshooting`). The user
can self-route on the scope line alone.

**Footer groupings** `[observed]`: `Products` · `Wise Personal` · `Resources` ·
`Company and team` · `Help`. Notably `Service status` and
`Feature availability checker` sit in the footer as first-class links.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `International money transfers`
> Subhead: "Join over 18.9 million people sending money abroad — with fees **as low as 0.1%**."

The headline is the *task*, not a slogan. Differentiation is pushed entirely
into the subhead, and the number is bolded inline.

**Three-benefit pattern — adjective label + em-dash + mechanism** `[observed]`

- `Low fees` — "fees get cheaper the more you send"
- `Lightning fast` — "money typically arrives in seconds"
- `Perfectly predictable` — "lock in an exchange rate for your international transfer"

Each carries a footnote that immediately undercuts the claim with a caveat —
"This is an average based on past transfer speeds. Use the calculator to get a
personalised estimate." and "Duration varies by route." This self-qualifying
construction is the single most transferable Wise pattern: **claim, then bound
the claim, then route to a personalised figure.**

**Section headers are user questions or user goals** `[observed]`

`How to send money internationally from the UK` ·
`Larger transfers. Lower fees. Premium support.` ·
`How we keep your money safe` ·
`Best ways to send money internationally with WISE` ·
`Cheapest way to send money abroad from the UK` ·
`Fastest way to send money abroad from the UK`

`Cheapest way` / `Fastest way` are also used as **tab labels**, so the same
words serve as navigation and as headline.

**Pricing page headline** `[observed]`: `Wise is built to save you money`,
followed by a direct competitor contrast: "Other providers hide fees in the
exchange rate to charge you more. Not Wise."

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav | Primary acquisition |
| `Log in` | Global nav | |
| `Register` | Help centre nav | **Inconsistent with `Sign up` in main nav** — same action, two labels |
| `Open an account` | Hero, below benefit list | Noun-phrase framing |
| `Send money` | Calculator submit | Matches the task name exactly |
| `Create free account now` | End of how-it-works | Price + urgency stacked |
| `Sign up today` | End of pricing page | |
| `Learn more about sending large amounts` | Inline, fee-discount card | Fully specific, no "Learn more" alone |
| `Learn about large transfers` | Large-transfer section | Near-duplicate of the above, shorter |
| `How we keep your money safe` | Security section | CTA text = destination page title |
| `Read more reviews on Trustpilot` | Social proof | Names the third party |
| `Download Wise` | App section | |
| `Switch to Wise Business` | Pricing page | Audience switch, not a purchase |
| `View in the regulator's standardized format` | Below fee table | Compliance artefact offered as a user choice |
| `Show more` | Country list | Progressive disclosure |
| `Skip to content` | Top of DOM | Accessibility |
| `Contact us` | Help centre, under "Still need help?" | Deliberately last |
| `Trouble logging in?` | Help centre, beside `Log in` | Pre-empts the failure at the point of failure |

**Observation:** Wise almost never ships a bare `Learn more`. The one place it
comes close (`Learn more` beside "Getting account details to receive in 22
currencies") is inside a dense fee table where the surrounding row supplies
the object.

## T4 Onboarding & getting-started

**Three-step how-it-works, each step a complete imperative sentence** `[observed]`

1. `Enter amount to send in USD.` — "Pay in USD with your debit card or credit card, or send the money from your online banking."
2. `Choose your recipient.` — "Select who you want to send money to and which pay-out method to use."
3. `Send USD, receive EUR.` — "The recipient gets money in EUR directly from Wise's local bank account."

Two things to note. The step headings are **punctuated with full stops** despite
being fragments-as-headings. And the currency codes are **injected dynamically**
from the calculator state, so step 1 and step 3 change with the user's selection
— the onboarding narrative is personalised to the route before signup.

Step 3 also quietly explains the mechanism (local bank account), which is how
Wise justifies its rate claim without a separate explainer.

## T5 Form & field labels

**Calculator — the primary pre-auth form** `[observed]`

| Label | Notes |
|---|---|
| `You send exactly` | The adverb "exactly" is doing disclosure work — it signals the send amount is fixed and fees are inclusive |
| `Recipient gets` | Second person for the sender, third person for the payee |
| Currency selectors | Flag icon + ISO code (`USD`, `EUR`) |
| `Arrives` | Result field, not "Delivery estimate" |
| `Total fees` | Result field |

**Result-area copy** `[observed]`

- Under `Total fees`: `Included in USD amount`, then the figure `88.83 USD`
- Strikethrough-and-replace for discounts: `4.91 USD volume discount`
- Rate line rendered as an equation: `1 USD = 0.8722 EUR`
- Arrival rendered as a weekday, not a duration: `by Tuesday`

`by Tuesday` over "2 business days" is a deliberate choice — absolute date
language removes the user's arithmetic. Compare `in seconds` used for the
faster rail in the same table, where relative language is *more* informative.

## T6 Status & state language

Transfer states are not directly observable pre-auth, but the help IA names
them `[documented]`:

- Transfer status is a first-class concept — `How do I check my transfer's status?`
- `complete` is a known-confusing state, with a dedicated article:
  `Why does it say my transfer's complete when the money hasn't arrived yet?`
- `cancelled` is a state with its own causes article: `Why was my transfer cancelled?`
- `scheduled` is a state: `What are scheduled transfers?`
- Verification is modelled as a state that affects timing, not a blocking gate:
  `How does verification affect my transfer's speed?`

**Pattern:** Wise writes help articles for the *gap between system state and user
reality*. "Complete" is technically true and experientially false, and rather
than rename the state they wrote the reconciling article. A content designer can
read the help IA as a map of where the status vocabulary leaks.

**Timing language inventory** `[observed]`:
`in seconds` · `by Tuesday` · `in under 20 seconds` · `in less than a day` ·
`typically arrives in seconds`. Percentages attached: "74% of transfers arrive
in under 20 seconds, and 95% in less than a day."

## T7 Error, failure & recovery

Richest category in the corpus for this product, all `[documented]` via help titles.

**Recovery articles are written in the user's first person, as a confession** `[observed]`

- `I entered the wrong reference`
- `I sent money to the wrong person`
- `I sent the wrong amount`
- `I forgot the reference`
- `I got my recipient's bank details wrong`
- `I spelt my recipient's name wrong`
- `I entered my recipient's email incorrectly`
- `I want a refund to my Wise account`

This is the standout pattern. Where most help centres write
"Correcting a recipient's details", Wise writes the sentence the panicking user
would actually type or say. First person, past tense, no hedging, no blame
softening — and critically, **no "Oops!"**. The register is calm and factual.

**Problem articles use a bare noun-phrase pattern** `[observed]`

- `Problems paying by bank transfer`
- `Problems paying with my bank card`
- `Problems paying with your connected bank account (ACH) in the US`
- `My payments with Crédit Agricole and Le Crédit Lyonnais cards get declined`
- `Incompatible accounts and payments`

Note the named-bank article: Wise ships a help article for a *specific issuer's*
decline behaviour. That level of specificity is a content-ops decision worth
flagging.

**"Why" articles explain adverse outcomes rather than just fixing them** `[observed]`

- `Why was I charged extra?`
- `Why is my transfer taking longer than the estimate?`
- `Why can cancelling transfers increase fees?`
- `Why do I need to prove where my money comes from?`
- `Why can't I set up guaranteed rate transfers anymore?`

The last one is a removed-feature article — Wise documents the *withdrawal* of a
capability, which most products silently drop.

**Pre-emptive recovery in the UI** `[observed]`: `Trouble logging in?` placed
immediately beside `Log in` on the help centre, before any failure occurs.

## T8 Empty states

`[observed]` — one only, in help search:

> `Sorry, we couldn't find any articles with "" in it`

This is a **defect worth recording**: with an empty query the string renders with
empty quotes, and the grammar ("with X in it") reads awkwardly even when
populated. A useful negative example — even strong content practices leak at the
no-results state, and the interpolation-with-empty-value case is the classic
miss.

Other empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]` — notification design is itself documented as a user-facing topic:

- `How do you notify me about a transfer?` — an article explaining the
  notification model to the user, which is unusual and good practice
- `Real-time notifications` (app benefit): "Know exactly what you've spent, as soon as you spend it."
- `Track exchange rates` / `Rate alerts` — an opt-in alerting product with its own
  footer entry

**In-page contextual banner** `[observed]` — a discount notice fires inside the
calculator when the amount crosses a threshold:

> `You're sending a lot so we discounted our fee`
> "Savings on this transfer, and eligible transfers for the rest of the month."

Colloquial ("sending a lot"), leads with the user's action, states the benefit,
then bounds its duration. No exclamation mark.

## T10 Disclosures, legal & compliance

The strongest category for PayPal-transferable practice.

**Inline claim-bounding footnotes** `[observed]` — every speed or price claim
carries an immediate qualifier in smaller text rather than a page-foot asterisk:

- "This is an average based on past transfer speeds. Use the calculator to get a personalised estimate."
- "Duration varies by route. Use the calculator for your personalised lock-in time."
- "Fee varies by currency" / `From 0.23%`

**Fee table language** `[observed]`

- Section labels are gerunds: `Registering with Wise`, `Sending money`,
  `Spending with your card`, `Holding money in your account`, `Receiving money`
- `Free` used as an explicit value, not an omission
- `No subscription fees` stated as a line item beside a one-off `9 USD` charge
- Threshold rules written as full sentences: "ATM withdrawals up to a total of
  250 USD per calendar month will not have an ATM withdrawal fee." followed by
  "1.95 USD + 1.95% fee applies to each ATM withdrawal after you withdraw 250 USD
  in a calendar month."
- Third-party cost disclaimed separately: "ATM operators may charge their own fees."
- `Fixed fee per payment` used as a qualifier row

**Dual-format disclosure** `[observed]`:
`View in the regulator's standardized format` — Wise publishes both a
user-optimised fee table and the regulator-mandated format, and treats the
regulatory version as an optional deeper view rather than the primary artefact.
This is a genuinely reusable compliance-UX pattern.

**Status-of-institution disclosure** `[observed]` — the US footer states what
Wise *is not* before what it is:

> "Wise is a Money Service Business ("MSB") registered with FinCen, not an
> FDIC-insured bank."

Followed by the sponsor-bank structure, state-licensing caveat
("authorized to operate as a MSB in most states"), card-issuance chain, and
eligibility bounding ("available to eligible consumers and commercial entities.
Not available in all countries.").

**Safeguarding explained in plain language** `[observed]`:
`Your money, not ours` — "Your money is safeguarded, and held completely
separate from ours, so it's available to you all the time." A regulatory concept
(safeguarding) rendered as a possessive contrast the user can hold onto.

**Named disclosure topics in help** `[documented]`:
`Remittance Tax` · `What are dynamic charges?` · `When do price changes apply to me?` ·
`Do I need to pay any tax on transfers?` · `Why do I need to prove where my money comes from?` ·
`Licences and regulators when holding money as different assets` ·
`Accessibility at Wise` · `Wise intellectual property` · `How do I make a complaint`

`When do price changes apply to me?` is a notable one — the second person in a
pricing-governance article.

## T11 Help-centre architecture

Two-level: six topics → named sub-sections → article lists. The **sub-section
names inside `Sending money`** are the real artefact:

1. `Sending money basics`
2. `Where is my money?`
3. `Mistakes and editing your transfer`
4. `Cancellations and refunds`
5. `We support these countries and currencies`
6. `Ways to pay`
7. `Verifying your transfer`
8. `Sending money from your Wise account`
9. `Sending large transfers`
10. `Managing your recipients`
11. `Rates and fees`

Three of the eleven are phrased from the user's emotional position rather than
the system's object model: `Where is my money?` (a question, with a question
mark, as a category heading), `Mistakes and editing your transfer` (naming the
user's error as the category), and `We support these countries and currencies`
(first-person-plural, answering an unasked eligibility question).

`Where is my money?` as a top-level support category is the single most
quotable IA decision in this file.

**Article-title grammar — four consistent shapes:**

| Shape | Example |
|---|---|
| `How do I …?` | `How do I cancel my transfer?` |
| `Why …?` | `Why was my transfer cancelled?` |
| `I <did wrong thing>` | `I sent the wrong amount` |
| Gerund/noun topic | `Paying by Open Banking`, `Sending with Swift` |

**Routing furniture** `[observed]`:
`Log in for personalised support` → then `Explore all topics` → then
`Still need help?` / `Contact us`. Personalisation is offered first, self-service
second, human contact last and smallest.

## T12 FAQs

Placement: accordion block near the foot of the `send-money` product page,
under the heading `Frequently asked questions`. **Answers are collapsed and not
present in server HTML — questions verbatim below, answers not retrieved.**

| # | Question (verbatim) |
|---|---|
| 1 | Does the new US remittance tax apply to my Wise transfers? |
| 2 | How can I send money internationally from the USA? |
| 3 | How long does an ACH transfer take and is the exchange rate guaranteed? |
| 4 | What is the Wise wire transfer fee from the US? |
| 5 | How long does a wire transfer take, and what can delay it? |
| 6 | Is it possible to send money using a credit card? |
| 7 | Can I send money internationally using Google Pay? |
| 8 | Can I send money internationally using Apple Pay? |
| 9 | Are there limits on how much I can send from the US? |
| 10 | What information do I need about my recipient? |
| 11 | Is there any other information I need to know? |
| 12 | Who can I send US dollar (USD) to? |

**Structural notes.** Twelve questions, ordered roughly: regulatory change →
core how → timing and rate → fees → timing and failure → payment methods
(three consecutive) → limits → data needed → catch-all → eligibility.

Q3 and Q5 are **compound questions** ("how long … and is the rate guaranteed",
"how long … and what can delay it") — Wise pairs the expectation with the
exception in a single question rather than splitting them. Q11
(`Is there any other information I need to know?`) is an explicit catch-all
slot, which is a real pattern rather than laziness: it gives the writer a home
for residual caveats without a thirteenth specific question.

Q1 leads on a live regulatory change, so the FAQ block is being used as a
**currency-of-policy surface**, not a static evergreen list.

## T13 Terminology & glossary

| Term | Wise's usage | The alternative it rejected |
|---|---|---|
| `mid-market exchange rate` | Named and defined as "the fairest rate" and "the one you can check on Google" | "interbank rate", "real rate" alone |
| `Wise Account` | The product noun | "wallet" |
| `Wise Multi-Currency Card` | Always in full on marketing | "Wise card" — used in the *help centre* topic name, so the register differs by surface |
| `balance` / `Holding money` | Activity-named, not object-named | "Accounts", "Funds" |
| `recipient` | Consistent throughout | "payee", "beneficiary" (the banking term) |
| `pay-out method` | Hyphenated, used for the delivery rail | "disbursement" |
| `volume discount` | Used for large-amount fee reduction | "tiered pricing" |
| `guaranteed rate` vs `live rate transfers` | Two named rate modes with separate help articles | |
| `dynamic charges` | Named concept with its own article | |
| `account details` | What you share to receive money | "IBAN/routing number" alone |
| `Wisers` | Internal-facing term that leaks into public copy: "Super smart Wisers have built our industry-leading security systems" | |
| `Assets` | Umbrella for `Interest & Stocks` | "Investments" |
| `safeguarded` | Regulatory term retained, then immediately glossed | |

**Register split worth noting:** marketing says `Wise Multi-Currency Card` and
`international money transfer`; help says `Wise card` and `transfer`. The
shorter forms live where the user is already inside the task.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout for the user, first-person plural
for the company ("We use the mid-market exchange rate", "we run millions of
checks", "We support these countries"). The company is a visible actor rather
than a passive system, including in adverse copy.

**Register.** Plain, short, declarative. Contractions used freely
("It's cheapest", "you'll get", "we don't"). Em-dashes used structurally in
benefit lines. One exclamation-free page set — no `Oops!`, no `Great news!`.

**Numbers as trust devices.** `18.9 million`, `0.1%`, `74%`, `95%`,
`301,144 reviews`, `4.3 / 5`, `over 1,000 anti-fraud specialists`,
`over the last 12 years`. Specific rather than rounded, and each attached to a
claim it substantiates.

**Colloquialism is rationed.** "Lightning fast", "Rock-solid technology",
"Super smart Wisers", "It's that easy", "You're sending a lot" — clustered in
security and app sections, absent from the fee table and disclosures. The tone
gets flatter as the stakes rise.

**Accessibility content** `[observed]`

- `Skip to content` link present, first in DOM
- Alt text is descriptive and scene-level rather than decorative:
  "A group of friends at a table drinking coffee and using a Wise Multi-Currency
  Card to pay." · "A group of people working together in an office." ·
  "A city skyline at golden hour." · `QR code for Wise app`
- A public `Accessibility at Wise` article, linked from the footer on every page
- Several decorative illustrations carry empty alt (`![]`) — correct practice
- **Gap:** the currency-flag images in the long country list appear to have empty
  alt while carrying meaning adjacent to the link text; link text supplies the
  country name, so this is defensible rather than clearly wrong

**Negative findings, recorded honestly**

- `Sign up` (main nav) vs `Register` (help nav) for the same action
- `Learn more about sending large amounts` vs `Learn about large transfers` —
  two labels for one destination on one page
- The empty-query no-results string renders with empty quotes
- Hero content duplicates in the DOM (responsive variants), which screen-reader
  users may encounter twice depending on CSS handling — flagged as suspected, not
  confirmed

---

## Transferable patterns

1. **Claim, bound, personalise.** Never ship a speed or price claim without an
   adjacent qualifier and a route to the user's own figure. Transfers directly to
   PayPal BNPL and payout-timing copy, where a headline estimate and a
   route-specific reality diverge.
2. **`Where is my money?` as a support category.** Name at least one help
   category in the user's own anxious question rather than the system's object.
   Applies straight to disputes, refunds, and pending-payment IA.
3. **First-person confession titles for recovery.** `I sent money to the wrong
   person` outperforms `Correcting a mistaken payment` for findability and for
   tone. Condition: only works where the user genuinely made the error — do not
   use it for system failures, which would read as blame-shifting.
4. **Dual-format disclosure.** Publish the user-optimised fee view as primary and
   the regulator-mandated format as an explicit secondary link. Relevant to
   SECCI, PayPal Credit, and Pay-in-3 disclosure work where the compliant
   artefact and the comprehensible artefact conflict.
5. **State what you are not, first.** "not an FDIC-insured bank" precedes the
   description of what Wise is. For products with sponsor-bank or e-money
   structures, leading with the negation pre-empts the wrong mental model.
6. **Tone flattens as stakes rise.** Colloquialism in security and app copy,
   zero colloquialism in the fee table. A defensible register gradient rather
   than one voice applied uniformly.
7. **Absolute over relative timing where the user would otherwise do arithmetic**
   (`by Tuesday`), relative where it is more vivid (`in seconds`). Pick per
   magnitude, not per style rule.

## Caveats & gaps

- **FAQ answers not captured.** Accordion content is client-rendered; only the
  twelve questions are in server HTML. An authenticated or browser-rendered pass
  would be needed for answer bodies.
- **All in-product states are inferred from help documentation**, not observed.
  Transfer status names, empty states, toasts, and validation messages are
  `[documented]` at best. Marked as such throughout.
- **Locale mixing.** The `/gb/` send-money page served US-defaulted calculator
  state and US footer disclosures during this harvest, so some strings labelled
  from that page are en-US in register. Any UK-specific claim from this file
  should be re-verified on a UK-geolocated session before use as UK precedent.
- **Only four pages inspected.** The card, receive-money, business, and platform
  surfaces are unharvested, as are the other five help topics.
- **Mobile app copy not harvested** — app-store and in-app strings are out of
  the public web surface.
- Help-article *bodies* were not opened; titles only. Article titles are
  high-signal for IA and task phrasing but say nothing about answer structure.

## Sources

1. https://wise.com/gb/send-money/
2. https://wise.com/us/pricing/
3. https://wise.com/help/
4. https://wise.com/help/topics/5bVKT0uQdBrDp6T62keyfz/sending-money
