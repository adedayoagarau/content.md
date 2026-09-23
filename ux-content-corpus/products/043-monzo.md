# 043. Monzo

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | UK digital bank (full banking licence) / app-first current account |
| Primary URL | https://monzo.com/ |
| Corpus rank | 043 |
| Benchmark strength (source list) | Friendly but clear financial language |
| Locale / market observed | en-GB (site is UK-only; a `🇬🇧United Kingdom \| English` locale switcher is present but single-option) |
| Platform observed | Web (desktop), help centre, legal document library, published writing principles |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Full UK banking licence.** Footer on every page: "Monzo Bank Limited is a company registered in England and Wales (No.09446231). Monzo Bank Limited is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority. Our financial Services Register number is 730427." Deposit protection stated as "Your eligible money in Monzo is protected by the FSCS up to £120,000 per person", with a dedicated versioned **FSCS Information Sheet** (v2.0, 23 December 2025) carrying limit, joint-account treatment, temporary high balances, payout mechanics and an exclusions list. Also publishes: CMA-mandated service-quality survey results, PSR APP-fraud reimbursement reference, FCA PS17/26 `Information about our Personal Current Account Services`, quarterly Open Banking uptime statistics, and Current Account Switch Guarantee. Credit products carry representative APR (`29% APR (variable)` Flex, `64.2% APR (variable)` Aura). |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Full for tone, fees, legal and help IA. Partial for in-product strings (`[documented]` only). The app-performance page was too large to read whole; only its summary section was read. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://monzo.com/ | Hero, product grid, plan strip, FSCS/CASS badges, CMA survey block |
| Monzo Writing Principles | https://monzo.com/tone-of-voice | **The primary artefact.** Three principles, channel dial settings, worked rationale |
| Help centre home | https://monzo.com/help | ~50 emoji-prefixed categories |
| Help: Payments: troubleshooting | https://monzo.com/help/payments-troubleshooting | 6 sub-groups, 21 article titles |
| Help article: transfer not arrived | https://monzo.com/help/payments-troubleshooting/transfer-not-arrived | Full body — recovery language |
| Help: The legal stuff | https://monzo.com/help/legal-stuff | Complaints, data, tax, FSCS |
| Help article: Making a complaint | https://monzo.com/help/legal-stuff/make-complaint-web | Five numbered steps, FOS escalation |
| FSCS Information Sheet | https://monzo.com/legal/fscs-information | Versioned legal doc, exclusions list |
| Fee information | https://monzo.com/legal/fee-information | Versioned (v1.11), full fee schedule incl. future-dated changes |
| Compare plans | https://monzo.com/current-account/plans | Extra / Perks / Max, feature matrix, FAQ block |
| Fraud | https://monzo.com/fraud | Scam typology, protection checklist |
| Money worries | https://monzo.com/money-worries | Financial difficulty, economic abuse, signposting |
| Accessibility | https://monzo.com/accessibility | Sign language, Share with us, Mental Health Accessible |
| App performance | https://monzo.com/service-information | Quarterly uptime/error-rate disclosure (summary read only) |

---

## T1 Navigation & IA labels

**Global nav — two audiences, then a benefit-named mega-menu** `[observed]`

`Personal` / `Business`, with `Sign up` at the right. Inside `Personal`, the sections are:

`Current accounts` · `Plans` · `Why Monzo?` · `Savings and ISAs` · `Investments and pensions` · `Credit cards and loans` · `Insurance` · `Mobile plans` · `Help and support` · `Refer a friend` · `Switch to Monzo`

Each section carries a **scope line in the menu itself**, which is the transferable move:

| Section | Scope line (verbatim) |
|---|---|
| `Current accounts` | "It all starts with our personal current account" |
| `Plans` | "Upgrade your personal account from £3 a month" |
| `Why Monzo?` | "Bank on an award-winning app" |
| `Savings and ISAs` | "Put your money to work with flexible ways to save." |

`Plans` states its price in the navigation. That is a pricing disclosure inside a nav label.

**`Why Monzo?` items are verb-first user activities, not features** `[observed]`

`Organise with Pots` · `Earn cashback` · `Travel without fees` · `Spend with friends` · `Get paid into Monzo` · `Protect your money` · `Connect your mortgage` · `Pay and get paid`

`Pay and get paid` is the most Monzo-ish of these — a plain two-verb pair where most banks would write "Payments".

**Footer groupings** `[observed]`: `Products` · `Company` · `Using Monzo` · `Help and security` · `Site and app information`

`Using Monzo` is the unusual one. It holds `Web app login`, `Accessibility`, `Additional support`, `Life events`, `Terms and Conditions`, `Information about our current account services`, `Savings hub`, `Personal loan calculator`, `Currency Converter`, `1p Savings Challenge`. Accessibility and life events sit alongside tools and T&Cs, under a heading framed by the **user's activity** rather than by document type.

`Help and security` groups `Help centre` · `FAQs` · `Fraud protection` · `Security at Monzo` · `Money worries` · `FSCS information`. Putting `Money worries` and `FSCS information` in the same footer group as fraud is a deliberate widening of "security" to mean *financial* safety, not just account safety.

**Help-centre categories are emoji-prefixed** `[observed]` — ~50 categories, each `emoji + Name + scope line`:

`🚪Opening a Monzo account` · `📱App help and mobile payments` · `🔒Account Security` · `📊Pots, budgeting and saving` · `🏦Overdrafts and loans` · `🤑Cashback` · `🚨Emergencies` · `💳Monzo card and PIN` · `👤Monzo account and profile` · `💰Payments: getting started` · `🤔Payments: troubleshooting` · `🕵️Fraud and staying safe online` · `💑Monzo with Friends` · `💯Switching to Monzo` · `✈Travelling with Monzo` · `👭Joint accounts` · `❤️Helping us understand your needs` · `📲Logging in` · `⚖️The legal stuff` · `💬Closed Accounts` · `🇺🇸Monzo US` · `📖The Book of Money`

Five observations worth recording:

1. **`🚨Emergencies`** — "Lost phone or card, blocked PIN..." — a category named for the user's emotional state, with the siren emoji. This is Monzo's equivalent of Wise's `Where is my money?`.
2. **`🤔Payments: troubleshooting`** carries a *thinking-face* emoji, i.e. the emoji encodes the user's puzzlement rather than the content type.
3. **`❤️Helping us understand your needs`** — "Accessibility, health issues, life events..." — accessibility and vulnerability filed under a **heart**, and phrased as something the user does *for* Monzo ("Helping us"), which reframes disclosure as collaboration rather than as a request for accommodation.
4. **`🇺🇸Monzo US`** — "We've said goodbye to our US customers". Monzo keeps a help category for a **discontinued market** and names the discontinuation in the scope line. Most products silently delete.
5. **`⚖️The legal stuff`** — "Complaints, data and information sharing, tax..." The casual `stuff` sits over genuinely legal content, and the scale emoji does the formality work the words decline to do.

**A single high-urgency card sits above the category grid** `[observed]`:
> `Lost/Stolen Device or Card`
> "Check your balance and freeze your card"
> CTA: `Protect your account` → web.monzo.com

The emergency path is **web-first**, deliberately, because the user's phone is the thing that is missing. That is a genuinely well-reasoned IA decision.

**Breadcrumb grammar** `[observed]`: `Help / Payments: troubleshooting / A bank transfer I sent hasn't arrived` — full first-person article title retained in the breadcrumb.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Spend your money on life, not your life on money`
> Subhead: "Your salary sorted into Pots. Your spare change turned into savings. Your money, doing what it should with Monzo."
> CTA: `Open a free Monzo account`
> Immediately below: `UK residents. Ts&Cs apply.` plus three badges — Which? Recommended Provider, Current Account Switch Guarantee, `FSCS protected`.

The headline is a **chiasmus** (spend money on life / life on money). The subhead is three sentence fragments, all beginning `Your`, moving from concrete (salary, spare change) to abstract (your money). This is Monzo's `Everyday magic` principle operating at the highest-stakes position on the site — and note that the eligibility and T&C line is placed directly under it rather than in a footer.

**Section headers are idiomatic, often with an internal twist** `[observed]`

`Get the most out of Monzo` · `Quit the app juggling act` · `It all starts with a Hot Coral card` · `The bank made for travel` · `Save like a superhero` · `Make payday twice as nice` · `A regulated bank with 24/7 support` · `Which? recommended 2 years in a row` · `Apply for an account in 10 minutes` · `Security you can bank on`

`A regulated bank with 24/7 support` is the tonal pivot — the one section header on the home page with no wordplay at all, and it is the one carrying FSCS, cash deposits, fees and support. **The register flattens exactly where the regulatory content starts.** That is the single clearest demonstration of Monzo's channel-dial doctrine visible on a live page.

**Sub-headers inside the travel section** `[observed]`

`Fee-free spending abroad` · `Live exchange rates` · `No surprises at checkout` · `Card freeze` · `Multi-trip travel cover`

with bodies that permit one flourish each: "No waiting, no guessing, and no more napkin maths." and "Freeze and unfreeze your card at any time if it goes exploring without you."

`if it goes exploring without you` is warm wit applied to a *lost card* — a small, defensible risk: it is gentle about the object, not about the user's loss, and the functional instruction (`Freeze and unfreeze your card at any time`) leads.

**Plan positioning lines** `[observed]`

| Plan | Price line | Positioning (verbatim, shortened) |
|---|---|---|
| `Monzo` (base) | `Free` | "Our signature Hot Coral current account that fits your finances." |
| `Extra` | `£3 a month` | "Unlock advanced tools that let you see your other bank accounts in one place, dig into your credit health, multiply spare change, and more." |
| `Perks` | `£9 a month` | "Get everything in Extra, as well as partner perks worth over £300 a year." |
| `Max` | `From £19 a month` | "Get everything in Extra and Perks, plus worldwide travel and phone insurance, and UK & Europe breakdown cover." |

Each plan card carries its own eligibility line: `Age 18+`, `Ages 18-69`, `3 months minimum`, `UK residents`. **Eligibility is presented as part of the price, not as a footnote.**

Plans page hero: `Make Monzo a bit more you` / "Upgrade your account based on what's important to you — from £3 a month." / `UK residents aged 18+ (18-69 for Max) • Ts&Cs apply.`

**The self-aware table header** `[observed]`: `Compare our plans` followed by the sub-line `(This bit's for table fans)`. An aside in brackets, at the top of the densest part of the page — exactly the "smart asides, not cheap puns" instruction in Monzo's own principles, deployed to lower the intimidation of a feature matrix.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav | |
| `Open a free Monzo account` | Hero, and repeated ~6 times down the home page | `free` carried inside the CTA, not beside it |
| `Apply for a Monzo account` | Help page foot, plans page foot | **Different verb** — `Apply` where the surrounding copy is about eligibility |
| `Learn more` | Every product card on the home grid | Bare `Learn more`, repeatedly — the card title supplies the object |
| `Explore Salary Sorter` · `Explore Pots` · `Explore cashback` · `Explore investments` · `Explore travel` · `Explore savings` · `Explore Double Payday` · `Explore plans` | Feature sections | `Explore` + named feature is the house pattern for secondary CTAs |
| `Get Monzo` · `Get Extra` · `Get Perks` · `Get Max` | Plan comparison columns | Verb + plan name, one per column |
| `Switch to Monzo` | Nav and CASS section | |
| `Protect your account` | Lost/stolen card panel, help centre | Emergency CTA phrased as the user's goal |
| `How we protect your money` | Home security section | CTA text = destination page purpose |
| `Find out more here` | CASS section | |
| `Read more` / `Learn more` | Fraud page, per scam type | |
| `Take the test` — *not used*; Monzo uses `Tell us more` | Share with us flows | |
| `Tell us more` | Bottom of accessibility/mental-health help articles | The doorway into the Share with us specialist route |
| `Contact us directly here` | Money worries | |
| `View full results for Great Britain` / `…for Northern Ireland` | CMA survey block | |
| `Download as PDF` | Legal documents | |
| `Was this article helpful?` → `Yes` / `No` | Every help article | |
| `Skip to Content` | First element in DOM on every page | Accessibility |
| `Accept all` / `Reject all` / `Customise` | Cookie banner | Three equal-weight options |

**Observations.** Monzo ships bare `Learn more` freely — the opposite of Wise. It works because every `Learn more` sits inside a card with a bold noun title (`Savings`, `Credit`, `Investments`, `Pensions`, `Homeownership`), so the accessible name is recoverable from context but **not from a screen-reader link list**, which is the standard failure mode. This is a real accessibility cost accepted in exchange for a cleaner visual grid.

The `Open a free Monzo account` / `Apply for a Monzo account` split is meaningful: `Open` on aspirational surfaces, `Apply` where creditworthiness and eligibility are in play.

## T4 Onboarding & getting-started

**Three named steps on the home page, under `Apply for an account in 10 minutes`** `[observed]`

| Step | Label (verbatim) | Body, summarised |
|---|---|---|
| `Step 1` | `Open a free Monzo account` | 10 minutes to apply; features help you manage money. |
| `Step 2` | `Fill out a few questions` | Questions to set up the account; explicitly "no lengthy paperwork"; "only takes a few minutes". |
| `Step 3` | `Add your Hot Coral card to your digital wallet` | Once open, "you can start using your card straight away with your digital wallet." |

Three things to note. The step labels are **imperative verb phrases with no full stops**. Step 2 is negatively framed against the incumbent experience ("there's no lengthy paperwork to fill in") rather than positively described. And step 3 is not "wait for your card" — the physical card is removed from the critical path entirely and the step becomes an action the user takes today.

**The time promise is in the section header, not the body**: `Apply for an account in 10 minutes`, restated in step 1 as "It takes just 10 minutes to apply". The duration is repeated rather than assumed.

**Switching has its own named apparatus** `[observed]`: `Switching to Monzo` (help category), `Switch to Monzo` (nav + CTA), Current Account Switch Guarantee badge on the hero, and the reassurance line "The Current Account Switch Service means moving payments or making Monzo your main account is a breeze."

**Signup gates disclosed up front** `[observed]` on the plans page and product cards: `UK residents`, `Age 18+`, `Aged 18-69` (Max), `Ages 6-15` (Under 16s, with "18+ parent/guardian account needed first"), `3-month minimum term`, `Eligibility criteria & Ts&Cs apply`, `Missed payments may negatively impact credit scores`.

**Help article names the onboarding entry** `[observed]`: `How to open a Monzo Personal Account`, linked from the accessibility page with the framing "**Ready to join Monzo?** You can find out how here" — the onboarding link is offered from within the accessibility page, so a disabled user reading about support does not have to navigate back out to convert.

## T5 Form & field labels

`[absent]` for the in-app application form. Observable proxies:

**Fee-schedule line items read as labelled fields** `[observed]` — the FCA-mandated format produces a label/value list:

`Maintaining the account: £0` · `Refusing a payment when you don't have enough money: £0` · `Allowing a payment when you don't have enough money: £0` · `Direct Debit: £0` · `Standing order: £0` · `Sending money within the UK: £0` · `Receiving money in pounds (GBP): £0` · `Issuing a debit card: £0` · `Debit card payment in pounds: £0` · `Debit card payment in foreign currency: £0` · `Arranged overdraft:` / `Unarranged overdraft: £0` · `Cancelling a cheque: Not applicable` · `Package of services: Not applicable`

`Refusing a payment when you don't have enough money` and `Allowing a payment when you don't have enough money` are the regulator's own labels, and they are far better plain English than "unpaid item fee" / "paid item fee". Monzo keeps them. Both are `£0`.

**Complaint intake channels are enumerated, not form-fielded** `[observed]`: "chat with us in the app; call us on 0800 088 4040 (or +44 203 872 0620 from abroad); email complaints@monzo.com; write to Complaints Team Monzo, Broadwalk House, 5 Appold Street, London EC2A 2AG."

**In-app navigation paths are given as literal tap sequences** `[documented]`, repeatedly:
- "Tap the **Help** icon in the menu bar / Search **A bank transfer I sent hasn't arrived** / Tap **Get in touch with us** under the **If you used the right details** section"
- "Tap the Help icon in the menu bar of your Monzo app / Search **'Talking to us about your mental health'** / Tap '**Tell us more**' at the bottom of the article"
- "Head to 'Privacy & security' in Settings by tapping your profile in the top left of the Home screen."

**Pattern:** Monzo's help articles route the user by **naming the exact string to type into in-app search**. The help site and the app search index are treated as one system. That only works if article titles are stable and identical across surfaces — a content-ops commitment, not a writing trick.

## T6 Status & state language

**PRIORITY SECTION.**

**Named payment states** `[documented]`, from help-article titles and bodies:

| State / concept | Evidence |
|---|---|
| `pending` | `Pending payments` (article) |
| `declined` | `Troubleshooting declined contactless card payment` · `Card payment declined but I was charged` |
| `failed` | `Failed Direct Debit` · `Failed standing order` |
| `frozen` | `Paying with a frozen card` · `Card freeze` (feature) |
| `blocked` | `Recovering your PIN` (slug: `monzo-card-blocked`) |
| `active card check` | `Active card checks` — a named zero-value authorisation |
| `offline` | `Offline payments` |
| `unrecognised` | `Reporting an unrecognised payment` |
| `dispute` / `chargeback` | `How the dispute process works` · `Being overcharged / items not arriving` |
| `closed` | `💬Closed Accounts` (whole help category) |

**The state vocabulary is deliberately small.** Where Revolut carries `pending`, `declined`, `failed`, `reverted`, `returned` and `delayed (offline)`, Monzo carries essentially `pending`, `declined`, `failed`, `frozen`. There is no `reverted`. Money that comes back is described in ordinary verbs, not as a state.

**`Card payment declined but I was charged`** is the highest-value title in the set. It names the exact contradiction the user is staring at — the system says declined and the balance says otherwise — rather than explaining authorisation holds under a title like "Understanding pending authorisations". Compare Wise's `Why does it say my transfer's complete when the money hasn't arrived yet?`: same move, same reasoning. **Write the article for the gap between system truth and user reality, and title it with the contradiction.**

**`Balance looks wrong`** — three words, no hedging, filed under its own `Balance` sub-group with exactly one article in it. Monzo gave a sub-heading to a single article because the user's search term is "balance", not "payments".

**Timing language** `[observed]`

- "the money should arrive in seconds" — modal `should`, not `will`
- "it can take up to one working day for them to put the money in the account" — attributes the delay to the receiving bank, named as `them`
- "get your salary one business day early" (Bacs)
- "get paid early with direct deposit" (US-style phrasing does not appear; UK copy says `one business day early`)
- "Add cash to your account at any PayPoint or Post Office (£1 per deposit)"
- Complaints: "generally it'll take us between 15 days and 8 weeks, depending on what your complaint's about"
- FSCS: "FSCS will typically return deposits within seven business days"
- Fees: "a rolling 30-day period", "a rolling 35-day period", "a rolling 8-month period"

`rolling` is used consistently and correctly across all three windows — a small terminology discipline that prevents the classic "does the month reset on the 1st?" support ticket.

**Uptime disclosure as a status surface** `[observed]` — Monzo has **no live status page**. Instead, `App performance` publishes quarterly statistics: `Uptime`, `Average Request Time`, `Error Rate`, split across `Monzo App`, `Open Banking Account Information`, `Open Banking Payment Initiation`, `Open Banking CBPII Confirmation of Funds`, with a per-day table. Q2 2026 summary: app uptime `100.000%`, average request time `154ms`, error rate `0.00%`.

This is a **regulatory artefact used as a trust artefact**. The page header is `Performance of our App and Open Banking Services` and the opening line is "We publish statistics every three months about how our app and Open Banking services are performing." It does not tell a user whether payments are working *right now* — recorded as a genuine IA gap, since the footer link is labelled `App performance` and a user in an outage would reasonably click it.

## T7 Error, failure & recovery

**PRIORITY SECTION.**

**`Payments: troubleshooting` is the error taxonomy, grouped by object** `[observed]`

*`Approving payments`* — `Approving online payments` (slug: `3ds-fail-online-payment`) · `Authorising different payments`
*`Balance`* — `Balance looks wrong`
*`Bank transfers`* — `A bank transfer I sent hasn't arrived` · `HSBC transfer hasn't arrived`
*`Card payments`* — `Reporting an unrecognised payment` · `Troubleshooting declined contactless card payment` · `Card payment declined but I was charged` · `Recovering your PIN` · `Paying with a frozen card` · `Refund hasn't arrived` · `Active card checks` · `Offline payments` · `Pending payments` · `Monzo cards and Section 75` · `Being overcharged / items not arriving` · `How the dispute process works`
*`Direct Debits & standing orders`* — `Failed Direct Debit` · `Failed standing order`
*`Monzo payments`* — `Troubleshooting Nearby Friends`

**`HSBC transfer hasn't arrived` is the standout.** Monzo ships a help article for **one named counterparty bank's** transfer behaviour — the same content-ops decision Wise makes with its Crédit Agricole decline article. It is expensive to maintain and unambiguously user-centred. Worth flagging to any content team that pushes back on "too specific" articles.

**Title grammar — three shapes, and the mix is informative** `[observed]`

| Shape | Examples | When Monzo uses it |
|---|---|---|
| First-person / possessive statement of the problem | `A bank transfer I sent hasn't arrived` · `Refund hasn't arrived` · `Balance looks wrong` · `Card payment declined but I was charged` · `HSBC transfer hasn't arrived` | When the user has a symptom |
| Gerund task | `Reporting an unrecognised payment` · `Approving online payments` · `Recovering your PIN` · `Making a complaint` · `Paying with a frozen card` | When the user has an intention |
| Bare concept noun | `Active card checks` · `Offline payments` · `Pending payments` · `Failed Direct Debit` | When the user needs a definition |

The discipline here is that **symptom titles are never converted into task titles**. Monzo does not write "Resolving a missing bank transfer"; it writes the sentence a user would say out loud. But it also does not over-apply first person: `Reporting an unrecognised payment` stays gerund because reporting is a decision, not a symptom.

**Worked example — the full body of `A bank transfer I sent hasn't arrived`** `[observed]`, structure analysed rather than reproduced:

1. **Expectation, then the exception, in one paragraph.** "When you send a payment, the money should arrive in seconds. If the receiving bank need to perform additional checks, it can take up to one working day for them to put the money in the account." Normal case first, named cause of the abnormal case second, the responsible party named (`the receiving bank`).
2. **Cheapest self-check next.** Verify the account number and sort code — both the recipient's supply of them and the user's entry of them.
3. **Branch on the diagnosis.** If details are wrong → names the remedy as a product: "we can try to recover the money by raising what is called a Credit Payment Recovery (CPR)." The phrase `what is called` glosses the jargon as jargon.
4. **Separates mistake from crime.** "If you think you've sent money to the wrong account due to a scam, rather than a mistake, we need to follow a different process." — a one-sentence fork that routes fraud away from the recovery path, and says explicitly that the process differs.
5. **If details are right** → gives the user a **named, shareable identifier**: tap `Something wrong? Get help` and share the `Tracking reference (FPID)` with the recipient, "They can check with their bank using this reference."
6. **Exact escalation route**, as an in-app search string.

Point 5 is the most transferable detail in this file. Monzo **hands the user an artefact to take to the third party** rather than absorbing the whole investigation. `Something wrong? Get help` is also a well-made in-product label: symptom question + offer, four words.

**Register on serious errors is flat.** No apology, no "Oops", no exclamation mark anywhere in the article. Monzo's own principles explain why: "Sometimes we have to give people news they won't like, but we haven't done anything wrong. In those cases, we shouldn't say sorry. It can come across as insincere and frustrating for the reader."

**Account closure is a whole category, not an article** `[observed]`: `💬Closed Accounts` — "All things regarding closed accounts". Monzo keeps a support surface for people who are no longer customers, alongside `Getting full transaction history for closed Monzo accounts` under `The legal stuff`.

**Complaints as a numbered five-step process** `[observed]`, each step a first-person-plural promise:

1. `Submit your complaint` (four channels listed)
2. `We'll acknowledge your complaint within 3 business days after we receive it`
3. `We'll look into what's happened` — "We'll check to make sure our teams did everything they should've done."
4. `We'll tell you what we've found` — introduces the term: "We'll send you what's called a 'final response'"
5. `If you're not happy` — FOS, 6-month window, address, two phone numbers, consumer leaflet link.

Steps 2-4 are **headed with the promise itself**, so the headings alone read as a commitment sequence. Step 5 is headed with the user's emotional state (`If you're not happy`) rather than "Escalation" or "Referring to the Ombudsman". Step 3's "did everything they should've done" uses a contraction inside a compliance process and names Monzo's own teams as the subject of scrutiny.

**Fraud-specific recovery** `[observed]`, at the top of the fraud page: "If you've been tricked by a fraudster into sending them money, chat to us in the app or call us on 0800 802 1281, or +44 20 3872 0620 if you're abroad."

`tricked by a fraudster` places agency on the criminal, not the user. This is the load-bearing word choice on the whole page: it is neither "if you've been scammed" (passive, vague) nor "if you made a payment to a fraudster" (implies user error).

## T8 Empty states

`[absent]` for in-product empty states — all behind auth.

**One observed degraded-content state**, on the accessibility page, where the embedded Convo video cannot load:

> `Video is temporarily unavailable`
> "We're working to get things back up. Please reload the page or try again in a little while."

and a consent-gated variant:

> `Update cookie preferences`
> "To play this video, we need your consent to use **Advertising** and **Analytics** cookies."
> CTA: `Update preferences`

Both are well made. The first states the condition, the owner's action, and two user actions, with `in a little while` instead of a fake ETA. The second explains **exactly which cookie categories** are required and why, rather than a generic "accept cookies to view".

**Status page zero-state** `[observed]`: `No incidents reported today.` / `No incidents reported.` — but note this is Monzo's quarterly stats page context; per-day rows read `No downtime recorded on this day.` and `No data exists for this day.` The distinction between *no downtime* and *no data* is maintained rather than collapsed into a single dash.

## T9 Notifications & system messages

**Named notification products** `[observed]`

- `Instant notifications` — "Get notified the second you spend, so you're in the know wherever you go." (internal rhyme; this is `Everyday magic` in a feature label)
- `Real-time alerts` / `Real-time transaction alerts`
- **`Call status`**, badged `Industry first` — "This feature tells you if you're really speaking to Monzo, or if it could be a scammer. It helps prevent around 1,000 fraud attempts a month." The in-app label is `Monzo Call Status`, reachable via "'Privacy & security' in Settings". Instruction: "If it says we're not talking to you, hang up and report it to us."
- `Emergency logout` — "If your phone's lost or stolen, log into your account from another device to freeze and unfreeze your accounts and remotely log out of all your devices."
- `Extra security controls`, also `Industry first` — "Use known locations, a secret QR code or trusted contacts to verify it's you."

**Bill notifications with a named lead time and a named exception** `[observed]`: "If you pay bills through Monzo we'll remind you the day before they're due to go out and warn you if you need to move money around to cover the full cost. We also tell you if they're different from month to month, so you can keep track of things like shifting energy prices."

Three distinct notification types in one sentence — a reminder, a shortfall warning, and a *variance* alert — with the variance alert justified by a real-world cause the reader recognises.

**Anti-phishing promise, stated as an absolute** `[observed]`: "We'll never call you out of the blue or ask you to move your money. Check it's us and hang up if you're not sure."

`Check it's us and hang up if you're not sure` puts the verification action before the abort action, which is the correct order — a user told only to hang up loses the ability to act on a genuine call.

**Money-worries contact framing** `[observed]`: "In the meantime, we might be trying to reach you via messaging as we want to help you as soon as possible." — the bank explains *its own* outbound contact attempts in advance, reducing the chance a genuine collections message is mistaken for a scam. That is a rare and good piece of cross-topic thinking.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

**Legal documents are versioned, dated, downloadable and archived** `[observed]`. Every legal page carries: a version number (`Version 2.0`, `Version 1.11`), an effective date (`23 December 2025`, `18 August 2026`), a table of contents, a `Download as PDF` link, and a `Past versions` list linking every prior version (`Version 1.11` back to `Version 1.0`, twelve versions for the fee schedule).

**Publishing the full version history of a fee schedule is the strongest disclosure pattern in this file.** A user can see exactly what changed and when, without asking. The legal library nav lists 22 documents by name: `Terms & Conditions`, `FSCS Information`, `Privacy Notice`, `Cookie Notice`, `Fee Information`, `Complaints Data`, `Overdraft Information`, `Loan Information`, `Cashback on Your Loan`, `Making decisions using Open Banking Terms and Conditions`, `Making decisions using Open Banking Privacy Notice`, `Monzo Plus`, `Monzo Premium`, `Referral Scheme`, `Referral Variable Reward Scheme`, `Our Tax Strategy`, `Browser Support Policy`, `Attributions`, `Mobile Operating System Support Policy`, `Credit Insights`, `Joint Account Terms & Conditions`, `Joint Overdraft Information`.

`Complaints Data` published as a first-class legal document is worth noting — Monzo exposes its own complaint volumes.

**FSCS statement — three tiers of specificity** `[observed]`

1. *Home page badge*: `FSCS protected`
2. *Home page body*: "Your eligible money in Monzo is protected by the FSCS up to £120,000 per person."
3. *FSCS Information Sheet*, which goes considerably further:
   - `Limit of protection` — "£120,000 per depositor per bank, building society or credit union."
   - **A worked example of loss**: "if you hold a savings account with £80,000 and a current account with £50,000, FSCS will pay you £120,000 and you may lose £10,000."
   - `Joint and group accounts` — £120,000 each, "giving a total of £240,000"; business accounts treated as a single depositor.
   - `Temporary high balances` — six months of extended cover, with the triggering events enumerated (house sale/purchase; "death, your marriage or civil partnership, divorce, retirement, redundancy, disability or incapacity"; personal-injury or wrongful-conviction compensation).
   - `How the FSCS will pay you` — "typically return deposits within seven business days by cheque or electronic payment into an alternative account."
   - An operational ask: "To ensure the FSCS can pay you promptly please ensure that Monzo has your up-to-date contact details including your email address."
   - A full `Exclusions List`.

**The worked loss example is the transferable move.** Most FSCS pages state the limit; Monzo shows a customer losing £10,000. Stating the *downside* concretely is more useful than stating the *coverage* abstractly, and it is what prompts the reader to check their own aggregate.

**Fee disclosure is honest in the specific places fee tables usually cheat** `[observed]`

- **Future-dated changes are published in the current document.** Two headed sections coexist: `International bank transfers until 31 October 2026` and `International bank transfers from 1 November 2026`. The user can see the change before it lands.
- **Ranges rather than a headline rate**: current international fee is "a fixed amount and a variable amount"; "The fixed amount will be no more than £9 and the variable amount will be between 0% and 1.80%." From 1 November: "For most currencies, the fee is less than £0.80, but it may be up to £11 in some cases."
- **Caps are stated**: EUR/foreign-currency receipts incur "1% currency conversion fee (capped at £1,000)".
- **Pre-transaction visibility is promised explicitly**: "You'll always see the exchange rate and the exact charge which will apply in your app before making an international payment."
- **Third-party costs disclaimed separately**: "You may have to pay other costs, taxes or charges related to your Monzo account, which are outside of our control and not charged by us. For example, other banks may charge you for sending money to your Monzo account."
- **A competitor is recommended where Monzo cannot serve**: "If there's a currency we can't support, you can get more information at the Wise website." Naming and linking a rival inside your own fee schedule is a genuinely unusual disclosure choice.

**Tiered-eligibility fees are stated as a named, testable criterion** `[observed]`. The ATM and replacement-card allowances depend on `our replacement card and ATM fee criteria`, and the criteria are enumerated:

- "At least £500 was paid into a Monzo account in your name over the last rolling 35-day period, and you have at least one active Direct Debit on the same account in the same period." (with the exclusion: payments from other Monzo *personal* and joint accounts don't count; business accounts do)
- eligible DWP or Department for Communities payment in the last rolling 35 days
- a student loan payment in the last rolling 8 months
- "You're sharing a Monzo Joint Account with someone who has done at least one of the above."

Then a failure route for the algorithm: "If you receive a DWP or DFC payment which you think we haven't matched, contact us to apply for higher limits." **Naming the automated matching, admitting it can miss, and publishing the appeal route** is the correct handling of an eligibility rule that affects benefit claimants.

**Credit disclosure** `[observed]`: `Representative 29% APR (variable)` (Flex), `Representative 64.2% APR (variable), includes monthly fee` (Aura — the `includes monthly fee` clause is the disclosure that matters), and the repeated risk line `Missed payments may negatively impact credit scores`.

**Investment disclosure** `[observed]`, bolded on the home page: "**The value of investments and pensions could go up or down, and you could get back less than you invest.**" Plus prerequisite disclosure: "UK current account needed for: investments, pensions, savings accounts, mortgage tool, and Flex."

**Savings rate disclosure** `[observed]`: every rate carries `AER (variable)` and payment frequency (`paid monthly`); tier-dependent rates are shown per plan (`2.75%` / `3.00%` / `3.25%` / `3.50%` AER); Select Access carries a conditional asterisk defined at the foot of the table: "*When you make 2 (or fewer) withdrawals per year. £500 minimum deposit."

**Prize-draw and promotional disclosure** `[observed]`: Double Payday — "There are 10 lucky customers every month", "you won't pay tax on your winnings", "Eligibility based on previous month's salary", with linked `Double Payday Ts&Cs`. Billsback™ — trademarked, with the mechanic disclosed: "At least 1,000 bills will be chosen each month through a random draw", "up to £150 per bill", "There's nothing you need to do to enter!"

**Regulator-mandated comparative disclosure, displayed rather than buried** `[observed]` — the CMA service-quality block sits on the home page, with the regulatory framing stated ("As part of a regulatory requirement, independent surveys were conducted…"), the ranking chart, and both `Great Britain` and `Northern Ireland` results. The chart's **alt text carries the full data table in prose**, including competitor names and scores.

**APP fraud disclosure** `[observed]`, headed `Authorised push payment (APP) fraud rankings in 2024`: defines the term ("Authorised push payment (APP) scams happen when someone is tricked into transferring money to a fraudster's bank account"), then points to the PSR's own report for pre-October-2024 performance. Monzo defines the term before linking the data — and the definition reuses `tricked`, consistent with the fraud page.

**Accessible T&Cs as a published commitment** `[observed]`: "We've put in a lot of work to make sure our Personal account terms and conditions are accessible. They're just over 3,000 words, and hopefully nice and easy to follow." **Stating the word count of your T&Cs** is a disclosure move I have not seen elsewhere in this corpus.

## T11 Help-centre architecture

Two levels: **category → article**, with a third organising layer of unlabelled sub-groups inside category pages (`Approving payments`, `Balance`, `Bank transfers`, `Card payments`, `Direct Debits & standing orders`, `Monzo payments`).

**Header** `[observed]`: `How can we help you today?` — first person plural, second person, and `today`, which narrows the question to this session's problem.

**Routing furniture, in order of appearance** `[observed]`:
1. Emergency card (`Lost/Stolen Device or Card`) — above everything.
2. The ~50-category grid.
3. **Regulatory pointers**, in a distinct block: "If you're looking for our `PS17/26`, a document from the Financial Conduct Authority, see `Information about our Personal Current Account Services`." Plus PSD2 and EU payment-rights leaflets. Monzo anticipates that some arrivals are looking for a *regulatory document* and routes them without making them use the search box.
4. `Get in touch with us in app`, then a phone table (`From the UK` / `From abroad`).
5. A cost caveat on the phone route: "We're free to call, but if you're calling from abroad, please be aware that you may be charged by your phone provider."
6. A scope caveat: "The number above is only for customer support queries and we won't be able to help with other questions."
7. Conversion block (`Open a free current account`).

**Per-article furniture** `[observed]`: breadcrumb, body, `Was this article helpful? Yes / No`, `Related articles`, cookie-preferences panel, full site footer.

**Sub-group naming is by object, with one exception.** `Approving payments`, `Balance`, `Bank transfers`, `Card payments`, `Direct Debits & standing orders` are all objects; `Monzo payments` is the odd one (it holds only `Troubleshooting Nearby Friends`). The category *names* at the top level, by contrast, are mixed: objects (`Monzo card and PIN`), activities (`Switching to Monzo`, `Travelling with Monzo`), states (`Emergencies`, `Closed Accounts`) and relationships (`Monzo with Friends`, `Joint accounts`).

## T12 FAQs

**Placement**: plans page (under `Common Questions`), home page product cards carry disclosure lines rather than questions, and a separate `FAQs` link sits in the footer.

**Plans page — five questions, verbatim** `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What is Billsback™? | Explains the monthly random draw, the £150 per-bill cap, the ≥1,000 bills paid, eligibility by plan, joint-account handling, and that no action is needed to enter. |
| 2 | What is a packaged bank account? | Defines the *category*, then positions Monzo's three plans inside it, with the price range. |
| 3 | What are virtual cards? | Two concrete use cases (a budget-capped `Pastries` Pot; a disposable card for online shopping), then the hard limits: up to 5 live, up to 9 per 30 days, 100 per year. |
| 4 | What are connected banks and credit cards? | What you can see and do, encryption, removal at any time, Open Banking named and attributed to FCA regulation, and the 90-day reconnection requirement with its reason. |
| 5 | Which banks and credit cards do you connect with? | Full alphabetical list of ~20 supported providers, plus a testing list reachable via `Monzo Labs`. |

Two structural notes. **Q2 defines a generic industry term before selling against it** — "Packaged bank accounts let you add additional benefits… for a monthly fee. Extra, Perks and Max are our take on packaged accounts." Monzo names the category it belongs to rather than claiming to be unlike anything else. And **Q3 answers a product question with a scenario** ("Only want to spend a certain amount on croissants this month?") before giving the limits — magic first, constraint second, in a low-stakes context where that order is safe.

Q5 includes `Revolut`, `Starling Bank` and `Wise` in the supported list — competitors named in a product FAQ.

**Home-page FAQ equivalents** `[observed]` — the `A regulated bank with 24/7 support` block is four assertions with no questions: `24/7 support` · `Deposit cash and cheques` · `No hidden fees` · `FSCS protected`, each with one explanatory sentence. `Deposit cash and cheques` includes the cost inline ("£1 per deposit") — the fee is inside the reassurance, not a footnote to it.

## T13 Terminology & glossary

| Term | Monzo's usage | The alternative it rejected |
|---|---|---|
| `Pots` | The core savings/organisation primitive, always capitalised | "sub-accounts", "envelopes", "buckets" |
| `Salary Sorter` | Splits income into Pots automatically | "income allocation", "payday rules" |
| `Hot Coral` | The card colour, used as a proper noun and as brand shorthand ("It all starts with a Hot Coral card") | "the Monzo card" |
| `Blue coral` / `Burnt coral` | Higher-tier card colours — the brand colour is inflected by tier | |
| `Round up` / `Advanced roundups` | Spare-change saving | "micro-saving" |
| `Monzo Payday` / `Double Payday` | Early-salary and prize-draw features | "early direct deposit" |
| `Billsback™` | Trademarked bill-refund draw | |
| `Monzo Split` | Splitting with friends | "request money" |
| `Extra` / `Perks` / `Max` | The three paid plans — **all common adjectives/nouns, no invented words** | "Plus/Premium/Metal" (Revolut's ladder) |
| `Flex` / `Flex Build` / `Aura` | Credit cards; `Flex Build` names credit-building as the purpose | "credit builder card" |
| `Share with us` | The vulnerability-disclosure tool — "a way for our customers to tell us what additional support they need discreetly, with no phone calls involved and no chat log history" | "self-declaration", "vulnerability form" |
| `Call status` / `Monzo Call Status` | Anti-impersonation indicator | "verified call" |
| `Credit Payment Recovery (CPR)` | Misdirected-payment recovery, glossed at first use with "what is called" | left unexplained |
| `Tracking reference (FPID)` | The Faster Payments identifier, given to the user as a shareable artefact | hidden internal ID |
| `Active card check` | Zero-value authorisation | "£0 authorisation", "pre-auth" |
| `final response` | The complaints outcome letter, introduced with "what's called a 'final response'" | used unglossed |
| `tricked by a fraudster` | The standard phrasing for APP fraud victims | "you were scammed", "you authorised the payment" |
| `Money worries` | The financial-difficulty surface | "financial hardship", "collections" |
| `economic abuse` | Used alongside `financial abuse`, with the statutory definition cited | only "financial abuse" |
| `Connected banks and credit cards` | Open-banking aggregation | "linked accounts" |
| `The Book of Money` | A content property, with its own help category | |
| `Monzo Labs` | Opt-in beta features | "experimental features" |

**Register split by surface.** Marketing says `Hot Coral`, `Salary Sorter`, `Save like a superhero`. Help says `card`, `payment`, `transfer`. Legal says `depositor`, `eligible deposits`, `rolling 35-day period`. The plan names (`Extra`, `Perks`, `Max`) are the clearest evidence of the doctrine: three ordinary English words where the category convention is invented luxury tiers.

## T14 Voice, tone & accessibility

**Monzo publishes its own doctrine, which makes this the most analysable tone case in the corpus.** `[observed]` — https://monzo.com/tone-of-voice, titled `Monzo Writing Principles`. The page opens by rejecting the label it is best known by: "You might be here looking for the Monzo tone of voice – this is it! But 'tone of voice' is ironically copywriting jargon, and it undersells what these principles are about."

**The three principles, verbatim, with their stated scope:**

| Principle | Definition (verbatim, shortened) | Where it applies (verbatim) |
|---|---|---|
| `Straightforward kindness` | "We're clear, inclusive and focused on the reader. We go out of our way to make complex things simple." | "This applies all the time, to all the writing we do." |
| `Everyday magic` | "We transform the mundane with moments of unexpected delight. We celebrate and commiserate…" | "mainly applies to our brand and marketing writing." |
| `Warm wit` | "Humour is a delicate seasoning in our writing. We want people to feel part of the joke, not the target of it." | "almost exclusively in our brand and marketing writing, with the occasional surprise in the app." |

**The channel dial — this is the mechanism that answers the brief's question about where the register flattens** `[observed]`. Monzo publishes an explicit per-channel setting for each principle:

| Channel | Straightforward kindness | Everyday magic | Warm wit |
|---|---|---|---|
| `Operational comms` (emails, legal docs, web pages, notifications, in-app) | **Maxed out** | Low | **None** |
| `Customer service` (in-app chat, Help content, self-serve flows) | High | Low | **None** |
| `Marketing comms` | High | Medium | Medium |
| `Campaigns` | High | High | High |
| `Paid social` | High | High | High |
| `Organic social` | High | High | **Maxed out** |

The two channels with `Warm wit: None` are the two that carry money and problems. The rationale is stated for customer service: "Customer service often means dealing with sensitive or difficult situations, so there's no place for warm wit – the risk of getting it wrong is greater than the benefit of getting it right."

And for operational comms, the default-to-plain rule: "If the news could be considered in any way negative, or if you're in any doubt, just keep it simple."

That single sentence is the answer to "how does Monzo stay warm without becoming flippant about money": **the humour is not moderated case by case; it is switched off by channel, with doubt resolving to off.**

**Named sub-rules under `Straightforward kindness`** `[observed]`

- `Focus on what matters to readers` — "We're often tempted to explain why we've done something before what it actually is – especially if it's an uncomfortable message… We can explain our reasoning, but need to explain the impact first." **Impact before rationale** is the stated ordering rule for bad news.
- `Be welcoming to everyone` — inclusive language; explicitly names avoiding "gendered or ableist language, cultural appropriation, or terms that have a history rooted in structural racism"; uses `blocklist`/`allowlist` over `blacklist`/`whitelist`, and justifies it with the Boroditsky crime-framing experiment.
- `Swap formal words for normal ones` — read-aloud test: "Does it sound like language you'd ever actually use face to face?" Explicitly permits starting sentences with `but`, `and`, `so`, `because`: "There's never been a rule against it… We do it all the time when we talk, so it makes our writing feel more natural, too."
- `When we have to say sorry, say it sincerely` — **"It's never 'We'd like to apologise', it's 'We're sorry'."** Plus the over-apology rule ("we say sorry once like we mean it, and then we focus on what we're doing to make things better") and the no-fault rule (don't apologise for news you didn't cause). Plus the warning that matters most for this benchmark: "When we're talking about difficult subjects or bad news, watch out for your language getting more formal too. When the subject is sensitive, that's even more reason to focus on being warm and easy to understand."
- `Serious isn't the same as formal` — supported by the Flammer plain-English/legalese study (judges preferred plain English 66% to 34%).
- `Watch out for jargon` — "there's no room at all for unexplained financial jargon"; cites Pinker's "curse of knowledge".
- `Avoid ambiguity: write in the active voice` — "There's a funny thing that happens to our writing when we're giving bad news… we slip into what's called the 'passive' voice, which basically means we don't say who's responsible for something. We use the passive voice partly because we're unconsciously distancing ourselves from the message."

**Named sub-rules under `Everyday magic`**: `Celebrate the little wins` · `Use vivid words & delightful wordplay` (vivid word choice — "Why *pay your bills more easily* when you can *tame* them"; metaphors that don't alienate non-native speakers; alliteration and internal rhyme, "although it's important not to overdo it") · `Draw on relatable money moments` · `Contribute to big cultural moments & conversations` · `Make references most people would understand` · `Avoid empty adjectives & marketing cliches` · `Don't make literal references to magic`.

**The guardrail inside `Everyday magic` is the one that answers the flippancy question directly** `[observed]`, under the heading `We handle deeper emotions with care`:

> "People often find money incredibly stressful. It can trigger feelings of failure or shame, or impact their mental health. We always handle those feelings with care and never make light of them."

with an authorship rule attached: those stories are "best shared by a customer in their own words, or led by a member of our vulnerable customers team."

**Named sub-rules under `Warm wit`**: `Make people feel they're in on the joke – don't punch down` · `Add a pinch of humour, not a dollop` · `Smart asides, not cheap puns and cliches` (with specific bans: "'*Eggcellent*' at Easter, things '*all wrapped up*' at Christmas, and '*no tricks, just treats*' at Halloween are all off limits") · `Be self-assured, but never arrogant` ("we don't look down on our customers") · `Contextual moments, not stereotypical tropes`.

Two lines here are load-bearing for a bank. First: "we don't want to make ourselves out to be a victim. We're a big bank, we protect people's money, and we shouldn't come across like we're reckless or not capable of handling that responsibility." Second: "We can crack a joke about how much you're going to Greggs as part of Year in Monzo, because it's a light-hearted experience where you're expecting to see jokes. Making the same observation unprovoked at 3am wouldn't feel the same." **Humour is gated on the user's expectation at that moment, not on the topic alone.**

**Does the live copy obey the doctrine?** Largely, and the failures are informative.

*Obeys.* The home hero is a chiasmus; the fee schedule contains no jokes at all; `A bank transfer I sent hasn't arrived` contains no apology; the money-worries page contains no wordplay whatsoever; the economic-abuse section quotes the statutory definition; the fraud page's scam descriptions are flat and instructional.

*Tension.* The help-centre category emojis (`🤑Cashback`, `🍩Monzo Perks`, `💯Switching to Monzo`) apply `Everyday magic` to the navigation layer of `Customer service`, which the dial rates `Everyday magic: Low`. The money-face emoji on a cashback category is benign; the same emoji system sits two rows away from `🚨Emergencies` and `⚖️The legal stuff`. Recorded as an observed inconsistency rather than a failure — the dial says Low, not None.

*The clearest tonal seam.* `Save like a superhero` (marketing) and "Your eligible money in Monzo is protected by the FSCS up to £120,000 per person" (operational) appear on the same page, roughly one screen apart. The seam is visible and, per the doctrine, intentional.

**Person and tense.** Second person for the user; first-person plural for the bank, used as an actor in adverse copy ("We'll check to make sure our teams did everything they should've done", "we might be trying to reach you via messaging", "We don't charge overdraft fees"). Contractions everywhere, including in legal pages. Present and future tense dominate; the complaints page is entirely future-tense promises.

**Numbers as trust devices** `[observed]`: `16 million personal and business customers`, `£120,000`, `10 minutes`, `3,000 words` (T&Cs), `around 1,000 fraud attempts a month` (call status), `100.000%` uptime, `154ms`, `79%` / `82%` CMA scores, `2-10% cashback`, `£667.95` (savings challenge target). The hedged ones are hedged (`around 1,000`, `up to £150`).

**Accessibility content** `[observed]` — the most substantial in this four-product set.

- `Skip to Content` is the **first element in the DOM** on every page fetched.
- A dedicated `/accessibility` page **plus** a separate linked `accessibility statement` (`Read our full accessibility statement`).
- **Sign language support via Convo**: "an online interpreting service", with a three-step how-to (create a profile → search for Monzo in the directory → click to call and be connected to an accredited interpreter in real time) and stated hours ("7 am to 8 pm Monday to Sunday").
- **`Mental Health Accessible`** — Monzo states it worked with the Money and Mental Health Policy Institute and was "the first bank in the UK to take part in its Mental Health Accessible Lite programme". Capability described concretely: "We can adapt how we communicate with you and provide tools to support you in blocking spending that can impact your wellbeing."
- **`Share with us`** — the discreet disclosure tool, with its properties named as reassurances: "with no phone calls involved and no chat log history". Reachable from three named help articles: `Talking to us about your accessibility needs`, `Talking to us about your mental health`, `Telling us about your situation`, each ending in a `Tell us more` button.
- **`Listening Sessions`** — user research with disabled customers since 2019, with a named outcome: "making sure that customers know they can use sign language when signing up."
- **Tone framed as an accessibility feature**: "From embedding our tone of voice in everything from emails to error messages, to making sure customers know they can use sign language when signing up…" — Monzo explicitly counts error-message writing as accessibility work.
- **Signposting page** (`Signposting to external organisations`) framed with an unusually honest sentence: "We understand that your situation might require more than just help from us as your bank."
- **Alt text is genuinely descriptive**, including on complex images: the CMA chart's alt text contains the full ranking and percentages; illustration alt text is scene-level ("Man holding a bag of eucalyptus and a Monzo Flex card in his hand with his phone.", "A curtain blowing in the breeze next to an open window showing trees outside", "An exclamation mark in a circle next to a sad star", "A large hand holding a tiny trophy surrounded by sparkles"). Decorative UI screenshots carry functional alt ("UI showing Monzo's call status feature.").
- **Cookie banner offers `Accept all`, `Reject all` and `Customise` as three peers**, with the categories explained on a second panel ("We use 4 types of cookie. You can choose which cookies you're happy for us to use."). The banner's own copy contains the one joke in the operational layer: "We're not talking about the crunchy, tasty kind."

**Negative and mixed findings, recorded honestly**

- **Bare `Learn more` × 6** on the home product grid. Fine visually, poor in a screen-reader link list.
- **Content duplication in the DOM** — the `A regulated bank with 24/7 support` block, the security feature carousel, and the plan card list each appear two or three times consecutively in the fetched markup (responsive variants). Screen-reader users may encounter them repeatedly. Flagged as suspected, consistent with markdown extraction.
- **No live status page.** The footer link `App performance` leads to a quarterly regulatory statistics page, not to current incident state. A user in an outage clicking `App performance` gets a table of 2026-Q2 daily uptime percentages.
- **`Monzo Plus` and `Monzo Premium` persist in the nav and help centre** alongside the current `Extra` / `Perks` / `Max` ladder, and the legal library still lists `Monzo Plus` and `Monzo Premium` terms. Two generations of plan vocabulary coexist.
- **Emoji in a customer-service IA** where the published dial says `Everyday magic: Low`.
- The accessibility page contains a typo in its own body: "the diiferent tools we have to help you."
- `Which? Recommended Provider for Current Accounts, November 2025.` appears as alt text and as a badge; the adjacent heading says "Which? recommended 2 years in a row" — two different attribution formats for the same award on one page.

---

## Transferable patterns

1. **Set the tone by channel, not by judgement, and resolve doubt to plain.** Monzo's published dial gives `Warm wit: None` to operational comms and customer service, with the rule "if you're in any doubt, just keep it simple." This is the mechanism — not talent — that keeps a warm brand from being flippant about money. Directly adoptable: publish a per-surface setting, so the decision is made once rather than argued per string.
2. **Impact before rationale on bad news.** "We can explain our reasoning, but need to explain the impact first." Applies to declines, fee changes, account restrictions, and outage comms.
3. **Never `We'd like to apologise`. And don't apologise for news you didn't cause.** The second half is the harder discipline and the one that prevents sympathy-inflation from eroding real apologies.
4. **Watch the formality reflex on sensitive topics.** "When the subject is sensitive, that's even more reason to focus on being warm and easy to understand." Most teams get this backwards and reach for legalese exactly when the reader is most stressed.
5. **Title the article with the contradiction.** `Card payment declined but I was charged` and `Balance looks wrong` name the thing the user is staring at. Condition: only works if you accept the title will look "unprofessional" in an index.
6. **Hand the user a shareable artefact.** The `Tracking reference (FPID)` lets the user pursue the receiving bank themselves. Generalises to any multi-party failure: give the user the ID, tell them who to give it to, and say what that person will do with it.
7. **Publish the version history of your fee schedule, and future-date the changes inside the current document.** `International bank transfers until 31 October 2026` / `from 1 November 2026` in one page, with twelve prior versions linked.
8. **Show the loss, not just the limit.** The FSCS worked example ("you may lose £10,000") makes a £120,000 cap actionable in a way the number alone does not.
9. **Name the algorithm, admit it can miss, publish the appeal.** The DWP/DFC payment-matching rule for fee eligibility. Any automated eligibility gate should ship with this trio.
10. **Route regulatory-document seekers explicitly.** The help centre's `PS17/26` pointer assumes some arrivals want a compliance artefact, not an answer, and serves them without search.

## Caveats & gaps

- **In-product strings are `[documented]`, not observed.** Payment statuses, toasts, validation errors and empty states are reconstructed from help-article titles and bodies. Only four in-app labels are quoted with confidence because the help copy quotes them directly: `Something wrong? Get help`, `Tracking reference (FPID)`, `Monzo Call Status`, `Tell us more`.
- **Only two help-article bodies were read in full** (`A bank transfer I sent hasn't arrived`, `Making a complaint`). The other ~70 titles captured are titles only.
- **`App performance` page was too large to read whole.** Only the Q2 2026 summary table and the first ~100 days of the uptime table were read. Any claim about the rest of that page is out of scope.
- **The full accessibility statement was not opened** — only the `/accessibility` hub. No WCAG conformance level, audit date or feedback route was captured; they may be on the statement page.
- **No live incident copy captured**, because Monzo appears not to publish a live status page. If one exists under another URL it was not found from the footer.
- **Business banking, credit cards, loans, pensions, investments, insurance, ISAs and Under-16s surfaces are unharvested** — roughly two thirds of the product estate.
- **Terms and Conditions body not read.** The "just over 3,000 words" claim is Monzo's own, quoted, not verified.
- **Mobile app copy out of scope.** Monzo is an app-first bank; the majority of its UX content is unreachable from the public web.
- **The tone-of-voice page is a statement of intent.** Where this file compares doctrine to live copy, the comparison is drawn only from the 14 pages listed. A wider sample could find more seams.

## Sources

1. https://monzo.com/
2. https://monzo.com/tone-of-voice
3. https://monzo.com/help
4. https://monzo.com/help/payments-troubleshooting
5. https://monzo.com/help/payments-troubleshooting/transfer-not-arrived
6. https://monzo.com/help/legal-stuff
7. https://monzo.com/help/legal-stuff/make-complaint-web
8. https://monzo.com/legal/fscs-information
9. https://monzo.com/legal/fee-information
10. https://monzo.com/current-account/plans
11. https://monzo.com/fraud
12. https://monzo.com/money-worries
13. https://monzo.com/accessibility
14. https://monzo.com/service-information
