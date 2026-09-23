# 059. Afterpay

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | BNPL (pay-in-4), with a secondary monthly-instalment product (`Pay Monthly`) and an in-store card |
| Primary URL | https://www.afterpay.com/ |
| Corpus rank | 059 |
| Benchmark strength (source list) | Installment expectations and timing |
| Locale / market observed | **en-US primary; en-GB secondary, where the brand is `Clearpay`.** Both harvested. Also serves AU, NZ, CA-EN, CA-FR |
| Platform observed | Web (desktop marketing site), Zendesk-backed help centre served on-domain, legal agreement pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Two entirely different regimes, and this is the central finding of the file.** **US:** Afterpay US Services, LLC, **NMLS ID 1870854**. Pay in 4 is a closed-end instalment loan with **no finance charge and no interest**; CA loans made or arranged under a **California Finance Lenders Law licence, #60DBO-99995**; loans *with* a finance fee (Pay Monthly) are **underwritten and issued by First Electronic Bank**, with a stated example **APR of 36%**; the Afterpay Card is issued by **Sutton Bank, Member FDIC**. Mandatory state-specific disclosures for CA, GA, MD, ND, OK, SD and RI, plus the **FTC Holder Rule** notice in all caps. Credit reports obtained under the **Fair Credit Reporting Act**. Binding arbitration with a 30-day opt-out. **UK (Clearpay):** Clearpay Finance Limited, **deemed authorised and regulated by the Financial Conduct Authority under the Temporary Permission regime for Regulated Deferred Payment Credit**. From **15 July 2026**, Clearpay Plans became **regulated credit agreements under the Consumer Credit Act 1974**, bringing a **14-day right to withdraw**, **Financial Ombudsman Service** escalation, **Section 75** protection over £100, and mandated creditworthiness and affordability assessments. Credit reference agency: **TransUnion UK**. |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — **exceptionally strong on US legal text, US help-IA, and UK regulated copy**; weak on US marketing (the homepage is client-rendered and returned only fragments) and on help-article bodies (category indexes captured, article bodies not opened). All in-product schedule UI is behind auth. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Afterpay US home | https://www.afterpay.com/ | **Thin render** — app pitch, three benefit blocks, two tiles only |
| How It Works (US) | https://www.afterpay.com/en-US/how-it-works | Hero, three-benefit block, app features, in-store setup, full legal footer |
| Installment Agreement (US) | https://www.afterpay.com/en-US/installment-agreement | 16 sections — the richest legal source in the FIN batch |
| Responsible Spending (US) | https://www.afterpay.com/en-US/responsible-spending | Four guiding principles, three support pillars, 3-question FAQ |
| Help Centre home | https://help.afterpay.com/hc/en-us | Shell only; search and locale switcher |
| Help — I'm a Customer | .../help/360001002192-I-m-a-Customer | **11 top-level category names** |
| Help — Payments | .../help/203376123-Payments | **20 article titles** — the core schedule/failure vocabulary |
| Help — Managing Orders | .../help/115000485786-Managing-Orders | **16 article titles** |
| Help — Hardship | .../help/900000441026-Hardship | 2 article titles |
| Clearpay UK — How it Works | https://www.clearpay.co.uk/en-GB/how-it-works | **13 FAQs with full answers** — the richest UK regulated-copy source in the batch |
| Clearpay UK — Hardship | https://www.clearpay.co.uk/en-GB/hardship | Financial-difficulty policy, debt-charity signposting |
| Clearpay UK — UK BNPL Regulations | .../help/1779754146958-uk-bnpl-regulations | **The new-regulation explainer article** — 10 sub-headed questions |

---

## T1 Navigation & IA labels

**US nav is shopping-first, not finance-first** `[observed]`

`How Afterpay works` · `All Categories` · `For retailers` · `Get the app` · `Get $15 off` · `Login` · `Sign Up`

Five items, and two of them (`All Categories`, `Get $15 off`) are retail-marketplace furniture rather than payment-product navigation. There is **no `Pay in 4` nav item, no `Pay Monthly` nav item, and no pricing or fees item.** Compare Klarna (058), whose entire `Payment options` group is exposed in the nav. Afterpay's payment products are not navigable from the header at all — they are reached only through `How Afterpay works`.

**UK (Clearpay) nav is different again** `[observed]`:

`Clearpay card` · `Get the app` · `How it Works` · `Invite a friend` · `Help` · `Login` · `Sign Up`

`Help` is promoted into the UK primary nav and is absent from the US primary nav (US `Help` lives in the footer only). A support link in the header is a small regulated-market tell.

Shop sub-nav (UK): `All categories` · `Most Popular` · `On sale` · `New` · `Support Small` · `Shop In-Store`.

**US footer — four columns** `[observed]`

| Column | Items |
|---|---|
| `Afterpay` | `Account login` |
| `Support` | `Retailer pages` · `Help` · `Guide` · `Afterpay Access` · `Retailer resources` |
| `Connect` | Facebook · Twitter · Instagram |
| `Afterpay app` | Google Play · Apple App Store |

Then an unlabelled legal row: `Privacy` · `Terms` · **`Installment Agreement`** · **`Installment Payment Authorization`** · `Afterpay Card Account Agreement` · **`Pay Monthly Loan Agreement`** · **`Responsible spending`**.

**Four of the seven legal links name a specific credit instrument.** `Installment Agreement`, `Installment Payment Authorization`, `Pay Monthly Loan Agreement`, and `Afterpay Card Account Agreement` are each separately linked rather than bundled under "Terms". A user can go directly to the agreement governing the product they hold. That is better findability than a single `Legal` link, and it is worth noting that the **word `Loan` appears in a footer label** (`Pay Monthly Loan Agreement`) even though the word never appears in the marketing copy.

`Responsible spending` as a footer link is the BNPL-category convention and Afterpay's version is a real content page, not a policy PDF — see T10.

**UK (Clearpay) footer — five named columns, and the difference is diagnostic** `[observed]`

| Column | Items |
|---|---|
| `Support` | `Account login` · `Help` · `Security` · `Contact us` · **`Hardship`** |
| `Information` | `How it works` · `Single use payments` · `Gift cards` · `Clearpay Card` |
| `Clearpay app` | Google Play · App Store |
| `Social Media` | Instagram · LinkedIn · Facebook · X |
| `Resources` | `Clearpay Access` · `Retailer resources` · `Clearpay API` · `Clearpay for business` · `Partner Program` |

**`Hardship` sits in the UK `Support` column as a first-class, top-level footer link** — alongside `Help` and `Security`, not buried inside them. The US has no `Hardship` footer link at all; US hardship content exists only as a help-centre category. **Promoting financial difficulty to footer-level navigation is a UK regulatory-culture artefact and is the single clearest IA difference between the two markets.**

**Help centre — 11 top-level categories (US)** `[observed]`

`Returns / Refunds` · `Payments` · `Afterpay In-Store` · `Log In / Account Access` · `Hardship` · `Managing Orders` · `Managing Your Account` · `Getting Started With Afterpay` · `Contact Afterpay` · `Other Popular Questions` · `Privacy & Security`

The ordering is the artefact. **`Returns / Refunds` is first and `Payments` is second** — before `Getting Started`, which is eighth of eleven. Afterpay's help IA is ordered by *support volume*, not by user journey, and the top two categories are both post-purchase problems. `Hardship` is fifth, ahead of `Managing Orders` and `Getting Started`.

`Other Popular Questions` is an explicit catch-all category — the same pattern Wise uses as an FAQ slot, here elevated to a category. Honest rather than lazy: it gives orphan articles a home without a false taxonomy.

Category names are gerund-or-noun phrases with one exception: `Contact Afterpay` is imperative. Two use slashes (`Returns / Refunds`, `Log In / Account Access`), which is a hedge against two different search terms.

## T2 Value proposition & headline patterns

**The US positioning is "financial wellness", not "buy now pay later"** `[observed]`

> `Financial wellness is a tap away.`
> "Pay in 4 interest-free installments at partner brands. Budget your spending. Earn rewards when you shop. Discover thousands of brands and millions of products, online and in-store. Do it all in the app, easily and securely."

The headline makes no reference to payment, deferral, or instalments. The product mechanic is the *first clause of the subhead* and then immediately joined by three non-credit propositions (budgeting, rewards, discovery). `Financial wellness` is a category claim that a pay-in-4 lender is making about itself.

Compare the UK `[observed]`:

> `Pay in 4, / interest-free. / Clearpay it.`
> "Download the Clearpay app to buy now and pay in four interest‑free instalments over 6 weeks."

Three lines, and every one of them is the mechanic: the count, the cost, the brand-as-verb. The UK hero names the instalment count, the interest position, and the term (`over 6 weeks`) before anything else. **Two markets, two opposite hero strategies** — US leads with wellness and buries the mechanic; UK leads with the mechanic and has no wellness claim at all.

Directly beneath the UK hero, immediately `[observed]`:
> "Clearpay credit subject to status. Use responsibly as **late fees up to £24 per order apply**, which may impact your future access to credit. T&Cs apply."

**The UK ships the late-fee figure and the credit-impact warning in the hero block.** The US ships neither anywhere above the footer. This single comparison is the most useful artefact in the file for a content designer arguing about disclosure placement.

**`Afterpay it.` / `Clearpay it.` — the brand as a verb** `[observed]`

Used as a headline (`Here's why you should Afterpay it.`), as a hero closer (`Clearpay it.`), and as a section head (`Afterpay it in person.`). Verbing the brand is the oldest trick in payments and Afterpay commits to it fully. Note that it *replaces* the payment vocabulary entirely — `Afterpay it` names no count, no term, and no cost.

**The three-benefit block, US** `[observed]` — and the parentheses are the story:

| Benefit heading | Body |
|---|---|
| `Get everything you need now.` | "Shop thousands of brands and millions of products, online and in-store." |
| `Pay over six weeks.` | "Make the first payment upfront and the rest over time. Always interest-free at partner brands when you pay it in 4." |
| `No late fees when you pay on time (Only for Pay in 4).` | "We'll send you reminders and cap late payments to help you get back on track." |

The third heading carries a **parenthetical product carve-out inside the heading itself**: `(Only for Pay in 4)`. On the homepage the same carve-out appears twice in one block — `No fees when you pay on time. (Only for Pay-in-4)` and "We'll send you reminders and cap late fees (Only for Pay-in-4)". **Three renderings of one carve-out across two pages: `(Only for Pay in 4)`, `(Only for Pay-in-4)`, and a second inline instance.** The hyphenation is inconsistent.

This is a real content problem, and an instructive one. Afterpay now sells two products with different fee structures under one brand, and rather than restructure the benefit copy it has bolted a parenthesis onto the claim. The result is a headline that simultaneously makes a promise and withdraws it from an unnamed portion of the user base. `No late fees when you pay on time (Only for Pay in 4)` requires the reader to know which product they are on before they can evaluate the sentence.

**`Pay over six weeks.` is the good one.** Three words, and it gives the **total term** rather than the instalment count — which is the number users actually need for budgeting. "Pay in 4" tells you how many payments; "Pay over six weeks" tells you when you'll be free of it. Afterpay ships both, adjacently.

**Section heads, US** `[observed]`: `Manage your budget with Afterpay.` · `Stay in control.` · `Get inspired.` · `Afterpay it in person.` · `Get the scoop.` · `Get started with the app.` · `Earn rewards.` · `It's all in the app.`

`Stay in control.` is the responsible-spending tone applied to a feature block; its body is schedule-management copy ("Track your payments and reschedule payment dates, so you can keep your budget in check").

**Section heads, UK** `[observed]`: `Why use Clearpay?` · `The app is where it's at.` · `Here's why you should download the app today:` · `Still got questions?` · `Got more questions?`

The four UK `Why use Clearpay?` cards are each a **complete claim sentence with the qualification inside it**:

- `Sign up in the app.` — "Have your email, phone number, address, DOB and debit/credit card handy. **We'll run a quick check to make sure Clearpay is right for you.**"
- `Smart limits that move with you.` — "Your spend limit is set by Clearpay and **may increase over time with consistent on time payments.**"
- `Accepted online and in-store.`
- `No fees when you pay on time.` — "If you miss a payment, **late fees are capped at £24 or 25% of your order, whichever's lower.** Missing payments may also affect your ability to access credit in the future."

**Card four is the model.** The heading makes the positive claim; the body states the failure case, the fee cap with its formula, *and* the credit consequence — in two sentences, on the marketing page, above the fold area. The US equivalent heading (`No late fees when you pay on time (Only for Pay in 4)`) has a parenthesis where the UK has a number.

**`Smart limits that move with you.`** is a well-made limit-change headline: it frames a variable (and downward-mobile) spend limit as responsive rather than as restrictive, while the body honestly states the *upward* condition. The downward conditions are disclosed later, in the FAQ.

## T3 CTA inventory

| CTA (verbatim) | Market | Context | Notes |
|---|---|---|---|
| `Get the app` | US, UK | Nav, hero, section foot | The primary CTA in both markets |
| `Get the App` | US | `Get started with the app.` block | **Capitalisation inconsistent with `Get the app` elsewhere on the same page** |
| `Sign Up` / `Login` | US, UK | Nav | Title-cased, unlike most other labels |
| `Get $15 off` | US | Nav | A discount offer occupying a primary nav slot |
| `Learn More` | US | In-store section | Title-cased |
| `Visit our Help Center` | US | Under `Got questions?` | Names the destination |
| `Visit Here.` | US | Responsible Spending FAQ | **Bare deixis with a full stop** — the weakest CTA in the batch |
| `Explore Help` | US | Responsible Spending foot | Third label for the help centre on one page set |
| `Help Centre` | UK | Under `Got more questions?` | |
| `Get in touch` | US | Help centre, twice | |
| `Complete form` | UK | Hardship page | Names the artefact |
| `Start a chat` | US, UK | Help contact block | Sub-label: `Open your mobile app to chat 24/7` |
| `Call us at (833) 844-8095` | US | Help contact block | Sub-label: `Available daily, 8 AM–9:30 PM ET` |
| `Call us at +44 20 4572 0628` | UK | Help contact block | Sub-label: `Mon–Fri 8AM–7:30PM, Sat–Sun 9AM–5:30PM` |
| `Explore more options` | UK | Help contact block | Sub-label: `Browse more ways to get help` |
| `Learn more` | UK | BNPL-regulations banner | Bare |
| `Close my account` | UK | Hardship page, quoted as in-app label | `[documented]` in-product string |
| `PAY NOW` | US | Responsible Spending FAQ, quoted as in-app label | `[documented]` — all caps in product |
| `Store my card` | US | Same, quoted | `[documented]` |
| `Add a payment method` | US | Same, quoted | `[documented]` |
| `Skip to main content` | US | Help centre only | Accessibility |

**Observation — the phone number is the CTA.** Both markets render support telephone numbers **as the button label, with opening hours as the sub-label**. `Call us at (833) 844-8095` / `Available daily, 8 AM–9:30 PM ET`. The user sees the number and the availability before committing to the click. This is better than a `Contact us` button that reveals a number on the next screen, and the UK version's split weekday/weekend hours (`Mon–Fri 8AM–7:30PM, Sat–Sun 9AM–5:30PM`) is the more honest of the two.

**Negative findings.** The help centre is called `Visit our Help Center`, `Explore Help`, `Visit Here.`, `Help`, and `Help Centre` across the pages inspected — **five labels for one destination**, two of them on the same page. `Visit Here.` is a bare deictic link with a terminal full stop and no object; it is the clearest CTA defect in this batch.

Additionally, **the entire US homepage and How-It-Works navigation renders with every link pointing to `/en-US`** — `How Afterpay works`, `All Categories`, `For retailers`, `Get the app`, `Get $15 off`, `Login`, `Sign Up` all resolve to the same root URL in the served HTML, and the same is true of the footer's legal links on those pages. The legal agreements are reachable at their real URLs directly, but from the rendered nav they are not. A significant routing defect affecting, among other things, the `Installment Agreement` and `Pay Monthly Loan Agreement` links.

## T4 Onboarding & getting-started

**The US has no numbered how-it-works sequence.** `[absent]` The `How It Works` page is a benefit block and an app pitch. This is a notable gap against Klarna, which ships a three-step sequence per product.

**The UK does, embedded in a FAQ answer** `[observed]`. `How does Clearpay work?` answers, summarised: you pay in 4 instalments over 6 weeks with no interest; you find stores in the Shop Directory and select Clearpay at checkout; for online orders the *merchant* ships the goods and shipping questions go to the merchant; for in-store you set up the Clearpay Card in the app, add it to a digital wallet, open the `In-Store` tab, `select Authorise and pay in-store`, and tap with Apple Pay, Google Pay or Samsung Pay; **you'll pay approx. 25% at the time of purchase** and take the goods that day; you can log in any time to see your payment schedule and pay early, otherwise the money is taken automatically on the due dates.

Then the closer: **"Please note: Clearpay does not approve 100% of orders. We are committed to ensuring we support responsible spending."**

That sentence is the best single piece of expectation-setting in this file. It states, in the *how it works* answer, that **the mechanism can refuse you** — and gives the reason. Most BNPL onboarding copy describes a frictionless path and lets the first decline be a surprise. Afterpay/Clearpay tells you the path has a gate, on the page that teaches you the path.

`approx. 25% at the time of purchase` is the down-payment disclosed as a **percentage rather than as "the first instalment"** — which is more useful, because the user can compute it against any basket.

**US onboarding is stated as a one-line eligibility rule in the legal footer** `[observed]`:
> "You must be 18 or older, a resident of the U.S. and meet **additional eligibility criteria** to qualify. For access to in-store, **additional verification may be required.**"

Two uses of "additional" and no enumeration. Compare the UK.

**The UK eligibility list is fully enumerated** `[observed]`, under `How do I set up a Clearpay account?`:
- `Be at least 18 years old`
- `Have a valid and verifiable email address and phone number`
- `Use a UK bank payment card - Visa or Mastercard Debit or Credit Card (we do not accept prepaid cards)`
- `Be capable of entering into a legally binding contract`
- `Have a verifiable and valid ID`
- `Agree to our Privacy Policy and General Terms`
- `Be a UK resident (England / Wales / Scotland & Northern Ireland). No other UK territories, British Forces Post Offices, Isle of Mann, Isle of Jersey or Isle of Guernsey addresses are allowed`
- `Have your email, phone number, address, DOB and debit/credit card handy. We'll run a quick check to make sure Clearpay is right for you`

Eight items, with **exclusions named specifically** (no prepaid cards; the named excluded territories). The residency exclusion list is the sort of detail that prevents a failed signup rather than explaining one afterwards. (`Isle of Mann` is a misspelling of Isle of Man, preserved in live copy.)

And the failure path is given its own FAQ immediately after: `What happens if my application to use Clearpay is not successful?` — see T7.

**In-store setup is written as a sequence in both markets** `[observed]`. US: "Set up the digital Afterpay Card* in the **In-store tab** in the app and follow the prompts to add it to your **Apple Wallet or Google Wallet**. **Tap to pay and take everything home today.**" The closing clause names the outcome the user wants in seven words.

## T5 Form & field labels

Pre-auth form surfaces are minimal. All in-product labels below are `[documented]` — quoted inside help or policy copy rather than observed.

| String | Source | Type |
|---|---|---|
| `"Add a payment method"` | Responsible Spending FAQ | Section label in `My Account` |
| `"Billings"` | Same | Section name — **note the non-standard plural** |
| `"My Account"` | Same | Screen name |
| `"PAY NOW"` | Same | Button, rendered in caps |
| `"Store my card"` | Same | Checkbox label; guidance says "make sure to **untick** this option before logging out" |
| `In-Store` / `In-store tab` | US how-it-works, UK FAQ | Tab name — **capitalised two ways across markets** |
| `Authorise and pay in-store` | UK FAQ | In-app action label |
| `"Close my account"` | UK Hardship | Option under profile |
| `Down Payment` | Installment Agreement | Defined term in the Payment Schedule |
| `Remaining Payment Schedule` | Installment Agreement | Defined term |
| `Payment Schedule` | Installment Agreement | The two above, together |
| `Final Payment Schedule` | Installment Agreement | The post-purchase superseding document |
| `Maturity Date` | Installment Agreement | Defined term |
| `Payment Method` | Installment Agreement | Defined term |
| `Linked Business` | Installment Agreement | Defined term |
| `Help Icon in My Afterpay` | Installment Agreement, ×4 | The support entry point, named identically each time |

**`Help Icon in My Afterpay in the Afterpay mobile app`** appears four times verbatim in the Installment Agreement — in the payment-arrangements, complaints, billing-error, and dispute sections. A legal document that names the exact in-product affordance, consistently, each time it tells the user to get in touch. That is unusually good legal-to-product wiring.

**`Store my card` with an untick instruction** is worth flagging as a dark-pattern tell: the guidance tells the user to **untick a pre-ticked box before logging out**, which means the default is card retention on a shared-device flow.

No signup, checkout, or quote form was entered. Full field inventory `[absent]`.

## T6 Status & state language — PRIORITY

### Where the schedule appears in the flow

| Flow position | Surface | What the user is told |
|---|---|---|
| **Pre-selection** | Marketing pages, merchant-site badge | US: `Pay in 4 interest-free installments`, `Pay over six weeks`, `Make the first payment upfront`. UK: `pay in four interest-free instalments over 6 weeks`, `approx. 25% at the time of purchase`, and the hero-level late-fee figure |
| **At selection (checkout)** | `Payment Schedule` shown pre-commitment | **Named in the Installment Agreement**: the agreement is accepted against a `Payment Schedule` comprising a `Down Payment` and a `Remaining Payment Schedule`. Amounts shown at this stage are **estimates** |
| **At confirmation** | `Final Payment Schedule`, delivered electronically | "includes the Final Payment Schedule that is sent **after you complete your purchase with the merchant** that will contain your **actual** down payment, payment amounts and due dates. The Final Payment Schedule will **supersede and replace** the Payment Schedule." |
| **Post-purchase** | App `Orders` / payment list | `Viewing Active Orders in your Afterpay App`; `Available to Spend`; reschedule; `PAY NOW` |

**The estimate-then-final two-stage schedule is the most important structural finding in this file.**

Afterpay shows a `Payment Schedule` at checkout and then **replaces it** with a `Final Payment Schedule` after the merchant confirms. The reason is stated in the footer of every US page:

> "Payment amounts shown are **estimates** and depend on eligibility and **exclude taxes and shipping charges, which are added at checkout**."

So the schedule the user agrees to is not the schedule they will pay. The legal text handles this with two defined terms and an explicit supersession clause; the marketing footer handles it with the word "estimates" and a named reason (tax and shipping).

For PayPal Pay in 3 / Pay in 4 content design this is the exact problem: **the instalment figure shown before basket finalisation is provisional, and the copy must survive the revision.** Afterpay's solution — two *named* documents, with the second explicitly superseding the first — is cleaner than showing one number and quietly changing it. The transferable move is **naming the provisional artefact and the final artefact differently.**

**The first instalment is a different size, and it has its own help article** `[observed]`:
> `Why is my first payment amount different than the other three?`

Adjacent, and more interesting: `No payment upfront` — an article title in the Payments category implying a **variant with no down payment**, which directly contradicts the marketing claim "Make the first payment upfront". Recorded as an observed inconsistency between the marketing promise and the help IA. The UK's `approx. 25%` hedge (`approx.`) is the more careful phrasing of the same fact.

### The instalment vocabulary, consolidated

**US uses `installments`; UK uses `instalments`** — correct per market, and both are used in preference to "repayments". The full lexicon:

| Term | Market | Register |
|---|---|---|
| `Installment Payment` | US | Legal — capitalised defined term |
| `installments` | US | Marketing |
| `instalments` | UK | Marketing and legal |
| `Pay in 4` / `pay it in 4` / `Pay-in-4` | US | **Three renderings** |
| `Pay in 4` | UK | Consistent |
| `Payment Schedule` / `Final Payment Schedule` | US | Legal |
| `payment schedule` | UK | Marketing ("see your payment schedule") |
| `Down Payment` | US | Legal |
| `first payment upfront` | US | Marketing |
| `approx. 25% at the time of purchase` | UK | Marketing |
| `due date` / `payment due date` | Both | |
| `Preferred Payment Day` | US | Help article title — a user-settable schedule attribute |
| `Autopay` | US | Help article titles (`How do I enable Autopay?`, `Disabling Autopay?`) |
| `automatic payments` / `direct debit system` | US | **Two names for one mechanism in adjacent article titles** |
| `Maturity Date` | US | Legal only |
| `over six weeks` / `over 6 weeks` | US / UK | The term, stated as duration |
| `Clearpay Plan` | UK | **The post-regulation name for the credit agreement** |

**`Clearpay Plan` is a significant UK coinage.** Since 15 July 2026 these are regulated credit agreements under the Consumer Credit Act, and the consumer-facing noun chosen is `Plan` — not "agreement", not "loan", not "credit". It appears in `Clearpay Plan Terms and Conditions`, `decline a new Clearpay Plan request`, and `fail to make repayments in accordance with your Clearpay Plan`. A regulated credit agreement named as a plan.

### Account and order states

`[observed]` and `[documented]`, largely from help-article titles and UK FAQ bodies:

| State | Evidence | Notes |
|---|---|---|
| **`paused`** | UK: "we will immediately **pause your account** and you won't be able to buy anything else with us until your payments are up to date" | The missed-payment consequence state |
| **`on hold`** | UK Hardship: "we'll place your **account on hold** to help minimise late fees", "we'll place your account on hold while you're in a hardship arrangement" | **A different state from `paused`** — same effect, different cause, different word |
| **`delinquent`** | US Installment Agreement: "If you fail to make any payment when due in the manner required by this Agreement, **you will be delinquent.**" | Legal register only; never used in consumer copy |
| **`default`** | US: "we may … **deem you in default** and accelerate the maturity of this Agreement" | Legal only |
| **`declined`** | Help: `Why is my order being declined?`; `What happens if an automatic payment is declined?` | Used for both orders and collections |
| **`restricted` / `suspended` / `closed`** | UK BNPL article: "restrict or suspend your account", "close your account in certain circumstances" | Three escalating account actions, named together |
| **`up to date`** | UK: "until your payments are **up to date**"; "until your account is brought **up-to-date**" | **Hyphenated inconsistently within one page** |
| **`Available to Spend`** | US help article title | The remaining-limit state, title-cased as a UI label |
| **`spend limit`** | UK, throughout | The UK term |
| **`estimated spend limit`** | US Responsible Spending | The US term — **hedged with "estimated"** |
| **`Active Orders`** | US help: `Viewing Active Orders in your Afterpay App` | |

**`paused` vs `on hold` is a real and useful distinction** `[observed]`. `paused` is what happens *to* you when you miss a payment; `on hold` is what Clearpay does *for* you while a hardship arrangement is being agreed. Same functional outcome — no new purchases — opposite valence. The hardship page states the purpose explicitly: "we'll place your account on hold **to help minimise late fees or payment impacts**."

Using two different words for the punitive and the protective version of the same account state is a sophisticated piece of state naming and is directly transferable.

**`Available to Spend` vs `estimated spend limit`.** The US help centre has a UI-labelled state (`Available to Spend`) while the US marketing page says "check your **estimated** spend limit". The hedge appears in marketing and not in the product label. The UK is more careful in both: `spend limit`, with the whole `Smart limits that move with you.` block explaining that it moves.

**Timing language inventory** `[observed]`

| Phrase | Type | Market |
|---|---|---|
| `over six weeks` / `over 6 weeks` | Total term | US / UK |
| `generally biweekly` | Cadence, **hedged** | US (footnote) |
| `every 2 weeks` | Cadence | — (Klarna's phrasing; Afterpay uses "biweekly") |
| `10 days after the due date` | Grace period | US |
| `usually 10 days unless otherwise noted on your payment schedule` | Grace period, hedged | US |
| `7 days after the due date` | Second-fee trigger | UK |
| `up to 5 days, 3 times a year` | Reschedule allowance | US |
| `120 days after the error appeared on your statement` | Billing-error window | US |
| `at least thirty (30) days` | Pre-arbitration negotiation | US |
| `within 30 days of signing` | Arbitration opt-out | US |
| `minimum of 15 days after your purchase` | CA first-payment protection | US (CA only) |
| `14-day right to withdraw` | Cooling-off | UK |
| `15 July 2026` | Regulation commencement | UK |
| `6 or 12 months` | Pay Monthly term | US |

**`generally biweekly`** is the hedge worth noting — it appears in the US legal footnote ("3 generally biweekly payments") rather than a flat "every two weeks", because the actual dates depend on the Final Payment Schedule.

**`up to 5 days, 3 times a year`** is the best-specified flexibility promise in the batch: a per-instance limit and an annual quota, in eight words. Compare Klarna's "In some cases, you may be able to reschedule your Klarna payment. Options may depend on your payment plan and account status" — which promises less precisely and therefore promises less.

## T7 Error, failure & recovery — PRIORITY

This is the strongest category in the file, and the US/UK divergence runs through all of it.

### Missed payment — UK (Clearpay)

**The fullest and clearest missed-payment copy in this batch** `[observed]`, and it is stated in at least four places on the UK site with consistent figures.

The canonical version, from `What happens if I miss a payment?`:

> "If you miss a payment, a late free of **£6** is applied and we will **immediately pause your account** and you won't be able to buy anything else with us until your payments are up to date. If payment still hasn't been made **within 7 days**, an additional **£6** will be added. Our late fees are **capped at £24 or 25% of the order value, whichever is less**.
>
> You may notice that **your spend limit has decreased too.** This is because Clearpay takes into consideration a range of different factors when determining your spending limit. Your repayment history is a big determining factor.
>
> It is important to note that payments that are overdue for an extended period of time may result in Clearpay **declining the use of our services or restricting your ability to use your account.**"

Decomposed — the consequence stack, in the order Clearpay gives it:

| # | Consequence | Trigger |
|---|---|---|
| 1 | £6 late fee | Missed due date |
| 2 | Account paused — no new purchases | Immediately, same event |
| 3 | Further £6 | Still unpaid after 7 days |
| 4 | Cap: £24 or 25% of order value, whichever is less | Aggregate |
| 5 | Spend limit decreases | Automatic, explained |
| 6 | Service declined / account restricted | Extended non-payment |
| 7 | Reported to Credit Reference Agencies | Stated separately |
| 8 | Referred to a debt collection agency | Stated in footer and regulation article |

**Six of those eight are on the marketing page.** All eight are on the site. There is no equivalently complete consequence stack anywhere in the US content.

**The footer refinement adds a tier the FAQ omits** `[observed]`:
> "Late fees are capped at **£6 for orders under £24** and the lower of £24 or 25% of the order value for orders over £24."

A separate cap for small orders, so a £15 purchase cannot accrue £24 of fees. The FAQ's "£24 or 25% of the order value, whichever is less" already implies this arithmetically, but the footer states it as its own rule. **Stating the small-order case explicitly, rather than leaving it to be derived from a percentage, is the better practice** — a user with a £15 basket should not have to do the sum.

**The consequence is framed as intervention, not punishment** `[observed]`:
> "We want to get you back on track as soon as possible and **we certainly don't want you getting into further financial stress.** That's why if you have an overdue payment we won't let you buy anything else with us until your account is brought up-to-date."

The pause is justified by the user's interest. Whether or not one accepts the framing, the *structure* — state the restriction, then give the reason in terms of the user's welfare — is the correct shape for a consequence that is genuinely protective.

**And the route out is given in the same answer** `[observed]`: "If you are experiencing financial difficulty and are worried you can't make your payments, please contact us here."

### Missed payment — US (Afterpay)

**The legal text is precise; the consumer copy is vague.** Both, verbatim.

Installment Agreement, §3 `Late Payments`:
> "There are no finance charges or interest associated with this Agreement. However, if an Installment Payment is not paid on or prior to the due date specified in the Final Payment Schedule and **remains unpaid for a period of ten (10) days after the due date** (or such additional grace period required by applicable law), the Late Fee indicated in the Payment Schedule (if any) will be imposed, **up to a maximum of $8.00** and which in no event will exceed the maximum late fee permitted by applicable state law. Additionally, **the aggregate sum of Late Fees associated with a particular order will not exceed 25% of the order value at the time of purchase.** Thus, **lower value purchases may be subject to fewer or lesser Late Fees** in the event of late payment."

Responsible Spending page, `What happens if I don't pay on time?`, summarised with key strings: Afterpay considers every purchase application before approving; reminders are always sent; **"As soon as you miss a payment, we will immediately stop you from making any further purchases with Afterpay"** — justified by "our commitment to the high standards we set ourselves for responsible spending"; a late fee may be charged after the grace period (`usually 10 days unless otherwise noted on your payment schedule`); **"We will only ever charge one late fee per installment and the total amount of late fees charged on an order will never exceed 25% of your initial order value."**

Marketing footer: **"Late fees may apply."** Three words, no figure.

Benefit block: **"No late fees when you pay on time (Only for Pay in 4)"** and "We'll send you reminders and **cap late payments** to help you get back on track."

**Two findings here.**

First — **"cap late payments" is wrong.** Afterpay caps late *fees*, not late payments. On the homepage the same sentence appears as "cap late fees", which is correct. The How-It-Works page says "cap late payments", which is not. A one-word error in the most-read description of the consumer-protective mechanism, live on the product's main explainer page. Recorded as an observed defect.

Second — **the US never puts the number where the decision is made.** `$8.00` appears once, in §3 of the Installment Agreement. The 25% cap appears in §3 and in the Responsible Spending FAQ. The marketing pages and the footer say only "Late fees may apply." The UK puts `£24` in the hero. **Same company, same product structure, one market discloses the figure at the top of the page and the other discloses it in clause 3 of a 16-section agreement.**

That comparison is the single most useful thing in this file for a disclosure-placement argument, because it isolates the variable: the difference is regulatory, not editorial capability.

**`We will only ever charge one late fee per installment`** is a good clause — it forecloses the fear of compounding per-day charges, and it is the US analogue of the UK's "do not compound over time".

**The delinquency and default ladder, US** `[observed]`, Installment Agreement §4:
> "If you fail to make any payment when due in the manner required by this Agreement, **you will be delinquent**. If you are delinquent, have filed or have instituted against you bankruptcy or insolvency proceedings or are in breach any other material term of this Agreement, we may, to the extent and at the time permitted by applicable law, **deem you in default and accelerate the maturity** of this Agreement and all payments due hereunder. If you fail to make a payment required under this Agreement, we reserve the right to **limit, restrict, suspend or terminate your access** to your Afterpay account."

Four escalating account actions (`limit, restrict, suspend or terminate`) and two named credit states (`delinquent`, `default`). **Neither `delinquent` nor `default` appears anywhere in Afterpay's consumer-facing copy.** The words the user will encounter if this happens are not words they have been taught.

### Declined orders and failed collections

`[documented]` via help-article titles. The Payments category (20 articles) and Managing Orders category (16 articles) between them constitute the richest failure-path IA in this batch:

**From `Payments`:**
- `I missed a payment. What happens to my account?`
- `What happens if an automatic payment is declined?`
- `Why have I been charged a late fee?`
- `I've been charged an amount different to what I was expecting`
- `Billing Error`
- `Why is my first payment amount different than the other three?`
- `What happens if my card is lost / stolen or cancelled by the bank?`
- `Can I change a payment due date?`
- `Can I make a partial payment?`
- `Capital One Credit Cards`

**From `Managing Orders`:**
- `Why is my order being declined?`
- `I haven't received my goods. How do I raise a dispute?`
- `What should I do if my goods haven't arrived or have arrived damaged/faulty?`
- `My gift card has not been received. What should I do?`
- `Amazon | Issues with the order being placed`
- `Why can't I purchase gift cards that were previously available to me?`
- `I used to be able to purchase gift cards, but now I can't. Why?`

**Four observations on this IA.**

**`Capital One Credit Cards` as a standalone article title** is the Afterpay equivalent of Wise's named-issuer decline article. A specific bank's behaviour gets its own help article because that issuer blocks BNPL transactions. Shipping issuer-specific content is a content-ops decision worth flagging — it is expensive, and it is the right call when one issuer generates disproportionate contact volume. `Amazon | Issues with the order being placed` is the merchant-specific equivalent, using a pipe delimiter.

**The gift-card pair is a removed-capability article, written twice.** `Why can't I purchase gift cards that were previously available to me?` and `I used to be able to purchase gift cards, but now I can't. Why?` are **the same article written in two grammatical registers** — one as a question, one as a first-person statement with a trailing "Why?". Afterpay has duplicated the content to catch two different search phrasings. Inelegant as IA; effective as findability. And like Wise's removed-feature article, it documents a *withdrawal* rather than silently dropping it.

**Title grammar — four shapes, and the first-person one is present:**

| Shape | Example |
|---|---|
| `I <did/experienced X>. <Question>?` | `I missed a payment. What happens to my account?` · `I haven't received my goods. How do I raise a dispute?` · `I need help with my payments` |
| `Why <adverse thing>?` | `Why is my order being declined?` · `Why have I been charged a late fee?` |
| `What happens if <X>?` | `What happens if an automatic payment is declined?` · `What happens if my card is lost / stolen or cancelled by the bank?` |
| `Can I <X>?` | `Can I make a partial payment?` · `Can I change a payment due date?` |

**`I missed a payment. What happens to my account?`** is the best-constructed title in the file. It is the Wise first-person-confession pattern *plus* the user's actual next question, joined by a full stop. The confession gives findability; the question gives scope. The consequence-focus (`What happens to my account?`) rather than remedy-focus is correct — a user who has just missed a payment wants to know the damage before the fix.

**`What happens if…` is the pre-emptive variant** of the same shape, written for the user who has not yet had the problem. Having both the retrospective (`I missed a payment`) and the prospective (`What happens if an automatic payment is declined?`) forms is deliberate coverage.

### Application declined — UK

`[observed]`, given its own FAQ: `What happens if my application to use Clearpay is not successful?`

Summarised: several factors are reviewed including the credit report, which is **provided by TransUnion UK, a trusted credit reference agency**; if the application cannot be approved, "**we'll let you know**"; and if the reason relates to the credit report, the user is directed to contact TransUnion via the "Contact Us" directions on their website.

**Naming the credit reference agency and routing the dispute to it** is the pattern. Clearpay does not attempt to explain or defend the third party's data; it names it, links it, and hands over. The same move Klarna makes with its bureau.

The related answer, `Does Clearpay perform credit checks?`, enumerates the account-action triggers explicitly:
- "information from affordability or creditworthiness assessments indicates we should not provide further credit;"
- "we identify adverse information from your credit report;"
- "you repeatedly breach your Clearpay Plan Terms and Conditions; or"
- "you fail to make repayments in accordance with your Clearpay Plan."

And then the notification commitment: **"Where appropriate, we'll let you know if we take action on your account and what this means for your ability to use Clearpay."**

`Where appropriate` is a hedge, but the second half — telling the user **what the action means for them**, not just that it happened — is the standard worth holding.

### Hardship — the strongest recovery content in the batch

**UK Clearpay `Hardship` page** `[observed]`, with a dedicated footer link.

Heading: **`We're here to support you`**

Opening, summarised: life can throw unexpected challenges — losing a job, illness, a difficult personal period; **"it's okay to need a little help"**; if you are struggling to keep up, reach out; "We're here to listen and work with you on a plan that gives you **some breathing room**."

Then `What is financial hardship?` — defined as having trouble keeping up with repayments because circumstances have changed, temporarily or longer term, with six named causes:

`Job loss or reduced hours` · `Injury or illness` · **`Family or domestic violence`** · `The death of a loved one` · `Relationship breakdown` · `Unexpected or urgent expenses`

Closer: **"Whatever the reason, you're not alone — and you don't need to navigate this alone either."**

**Including `Family or domestic violence` in a published list of hardship causes** is the most consequential content decision on this page. It is not a financial event; it is a safety issue with financial consequences, and naming it tells a specific user that their situation is recognised and that disclosure will be understood. Most hardship policies stop at job loss and illness.

`How we can help` names three contact routes (a **secure form** with a specific ticket-form ID, in-app Help, phone) and then **names the remedies before the user asks for them**:
- `Adjusting your payment schedule`
- `Waiving late fees`
- `Setting up a payment plan`

Plus: "If we need time or information to agree on the best way to support you, we'll **place your account on hold** to help minimise late fees or payment impacts."

**Listing the available remedies publicly is the key move.** A user in difficulty does not know what to ask for. Telling them that fee waiver and rescheduling are on the table, before contact, changes whether the contact happens at all.

`What happens next?` is honest about the cost of the arrangement: the account goes on hold and **"you won't be able to use your Clearpay account to make any new purchases during this time."** Then two named exits:
- **`Returning to Clearpay:`** — "If you feel financially ready, you can contact us to ask about using Clearpay again. We review each request individually, and while **we can't guarantee reinstatement or an immediate return to your previous spend limit**, we'll always consider your circumstances."
- **`Closing your account:`** — do it in the app or web login via `"Close my account"` under your profile

**`we can't guarantee reinstatement`** is the sentence most companies would omit. It is placed inside the reassurance, not after it, and it is paired with "we'll always consider your circumstances". Honest without being cold.

**`Free support services`** — Clearpay signposts three independent UK debt charities with URLs, phone numbers, and opening hours:
- `StepChange` — www.stepchange.org, 0800 138 1111, Mon-Fri 8am-8pm, Sat 8am-4pm
- `PayPlan` — www.payplan.com, 0800 316 1833, Mon-Fri 8am-8pm, Sat 9am-3pm
- `MoneyHelper` — www.moneyhelper.org.uk, 0800 138 7777, Mon-Fri 9am-5pm

Described as "free, confidential and impartial debt advice" from organisations giving "non-judgemental, practical guidance". **Routing a user in difficulty to a third party that will advise them against using your product** is the correct thing to do and is a UK regulatory expectation. Including the opening hours is the detail that makes it actionable.

**US hardship is a help category with two articles** `[observed]`: `I need help with my payments` and `What is financial hardship?` — no dedicated page, no footer link, no remedy list, no charity signposting. The Responsible Spending page mentions it in one sentence: "Our **Financial Hardship Policy** has been with us from the very beginning because we understand that your circumstances may change."

`I need help with my payments` as an article title is the right first-person framing. But the US has roughly one-tenth of the UK's hardship content.

### Complaints and dispute rights — US

`[observed]`, Installment Agreement §8 and §9.

§8 `Complaints` routes three ways: complaints about the agreement → Afterpay via the Help Icon or help.afterpay.com; complaints about **delivery or quality of goods** → "contact the merchant using the details posted on the merchant's website"; general complaints → Afterpay.

§9 `What To Do If You Find A Mistake On Your Statement` is a **Regulation Z-style billing-error notice** rendered in consumer register. Summarised: contact Afterpay as soon as possible, within **120 days**, providing `Account information`, `Dollar amount`, and `Description of Problem`. Then the protections during investigation, as a three-item list — Afterpay cannot try to collect the disputed amount or report you delinquent on it; the charge may remain on your statement; and **"if we determine that we made a mistake, you will not have to pay the amount in question or any interest or other fees related to that amount"**; but you remain responsible for the rest of the balance.

**`Your Rights If You Are Dissatisfied With Your Afterpay Purchases`** is the FTC/Reg-Z claims-and-defenses notice, and Afterpay renders it as a **three-condition checklist** rather than a paragraph: the purchase must have been made in your home state or within 100 miles of your mailing address and cost more than $50 (with a parenthetical exception for mail advertisements or Afterpay-owned sellers); you must have used Afterpay; and you must not yet have fully paid.

Then the honest closer: "After we finish our investigation, we will tell you our decision. At that point, **if we think you owe an amount and you do not pay, we may report you as delinquent.**"

**Converting a mandated legal notice into a numbered eligibility checklist** is a genuinely good compliance-UX move — the user can self-assess against three conditions instead of parsing a sentence with four embedded clauses.

**The FTC Holder Rule notice** `[observed]`, in all caps at the end of the agreement:
> "**NOTE: ANY HOLDER OF THIS CONSUMER CREDIT CONTRACT IS SUBJECT TO ALL CLAIMS AND DEFENSES WHICH THE DEBTOR COULD ASSERT AGAINST THE SELLER OF GOODS OR SERVICES OBTAINED WITH THE PROCEEDS HEREOF. RECOVERY HEREUNDER BY THE DEBTOR SHALL NOT EXCEED AMOUNTS PAID BY THE DEBTOR HEREUNDER.**"

### Refunds and returns

`[observed]`, Installment Agreement §6, and it is the clause most likely to surprise a user. Summarised:

Refunds, exchanges and modifications are **at the merchant's discretion**; **"Afterpay is unable to override merchant return, refund and exchange policies"**; and critically — **if you return goods and request a refund, "you will remain obligated to make all payments still outstanding under this Agreement when due."** When the merchant returns money to Afterpay, Afterpay retains it and credits it against the outstanding balance, or refunds already-paid amounts. **"In the event of a partial refund, the credit will be applied against your last payment first."**

**Three facts most users do not know, all in one clause:** the payments continue during a return; the credit lands when the *merchant* processes the return, not when you post the parcel; and a partial refund reduces your *final* instalment, not your next one.

`Returns / Refunds` is the **first** help-centre category, which confirms this is the highest-volume confusion. The last-payment-first credit rule is precisely the kind of mechanic that needs a plain-language explanation in the app at the moment a return is initiated.

**Subscriptions are handled with a matching warning** `[observed]`, §2, summarised: cancelling a subscription requires contacting the merchant directly *and* unlinking the merchant from `Linked Businesses` in the app; and if Afterpay makes a subscription payment on your behalf before you cancel, or before the merchant notifies Afterpay with enough time to act, **you remain obligated to pay the down payment and each instalment for that payment.** A two-step cancellation with a stated failure window.

## T8 Empty states

`[observed]` — three, all on the same page furniture:

> `No suggestions found`
> `No categories found`
> `No payment methods found` *(not observed; the first two are)*

These render in the **collapsed search and category dropdowns on every Afterpay and Clearpay page** — they are visible in the served HTML of the nav even when no search has been performed. So the default, unqueried state of the site search announces `No suggestions found`.

That is a **defect of the same family as the Wise empty-quotes bug**: an empty-state string rendering as the initial state rather than as a result state. A screen-reader user traversing the header will encounter "No suggestions found" and "No categories found" on page load, before interacting with anything.

All in-product empty states (no orders, no active payments, nothing to pay) are `[absent]`.

## T9 Notifications & system messages

**Reminders are the central notification and they are disclosed as part of the fee mechanism, not just as a convenience** `[observed]`.

The Responsible Spending principle, in full — and this is the best-written notification policy in the batch:

> `Late payments are bad business`
> "We will only charge a late fee if customers miss a payment. But first, **we will do everything we can to help you avoid this, by sending reminders leading up to the payment due date and an alert after a payment has failed.**"

Two notification types, named and sequenced: **reminders before the due date** and **an alert after failure**. The fee is framed as the outcome of last resort, after both notifications have fired.

Elsewhere: "When you have an installment due, **we will notify you beforehand so that you can make sure that there is enough in your account for that payment. We do the rest.**" — the notification's *purpose* is stated (so you can fund the account), which is more useful than "we'll remind you".

Marketing version: "We'll send you reminders and cap late fees to help you get back on track."

UK version: "Missed payments may be reported to Credit Reference Agencies" appears as a notification-adjacent consequence rather than a notification.

**Consent-to-contact is extensive and disclosed** `[observed]`, Installment Agreement §13, summarised: the user expressly consents to be contacted by SMS, text, email, mobile app notification, pre-recorded and artificial-voice calls, and autodialled calls, at any number or address provided or reasonably associated with the account (including via skip trace and caller-ID capture), **at any time of day**, including messages left on voicemail — and this consent extends to **third parties engaged by Afterpay to collect amounts owed**. Opt-out is by email, or `reply HELP for help, STOP to stop (or cancel)`, effective after a reasonable processing period. And: withdrawing SMS consent may cause Afterpay to "restrict, deactivate or close your Afterpay account."

**`HELP` / `STOP` are the only verbatim notification-interaction strings recoverable.** The clause is worth recording because the consent covers collections calls and the withdrawal has an account consequence — a coupling most users will not anticipate from the phrase "send you reminders".

`Instant activity alerts` and in-app notification copy are `[absent]`.

## T10 Disclosures, legal & compliance — PRIORITY

### Where each disclosure sits in the flow — US vs UK

| Disclosure | US pre-selection | US at selection | US at confirmation | UK pre-selection | UK at selection |
|---|---|---|---|---|---|
| Instalment count | ✅ hero subhead | ✅ Payment Schedule | ✅ Final Payment Schedule | ✅ hero line 1 | ✅ |
| Total term (6 weeks) | ✅ benefit block | — | ✅ Maturity Date | ✅ hero subhead | ✅ |
| Down payment | ✅ "first payment upfront" | ✅ `Down Payment` | ✅ actual amount | ✅ `approx. 25%` | ✅ |
| Interest position | ✅ "interest-free" | ✅ §agreement caps | ✅ | ✅ hero line 2 | ✅ |
| **Late-fee amount** | ❌ *"Late fees may apply."* | ⚠️ `Late Fee indicated in the Payment Schedule` | ✅ | ✅ **hero disclaimer: `£24 per order`** | ✅ |
| **Late-fee cap** | ⚠️ Responsible Spending + §3 only | — | — | ✅ **`Why use Clearpay?` card 4** | ✅ |
| Small-order fee cap | ❌ | — | — | ✅ footer (`£6 for orders under £24`) | — |
| **Credit-impact warning** | ❌ **not found on any US marketing page** | — | ⚠️ CA-only negative-credit notice | ✅ **hero disclaimer + card 4 + 3 FAQs** | ✅ |
| Credit-check type | ⚠️ §5 "consumer reports" | — | — | ✅ soft check named + visibility stated | ✅ |
| Affordability assessment | ❌ | — | — | ✅ named, with income/expense confirmation | ✅ |
| Estimate-vs-final schedule | ✅ footer "amounts shown are estimates" | ✅ | ✅ supersession clause | — | — |
| Pay Monthly APR (36%) | ✅ footer example | — | — | n/a | n/a |
| Regulator identity | ✅ NMLS ID in footer | — | — | ✅ **FCA + Temporary Permission regime, every page** | ✅ |
| Right to withdraw | ❌ | — | — | ✅ 14 days (regulation article) | — |
| Ombudsman route | ❌ | — | — | ✅ Financial Ombudsman Service | — |
| Hardship route | ⚠️ help category | — | — | ✅ **footer link + dedicated page** | — |

**The table is the finding.** In the US, the late-fee amount, the late-fee cap, the credit-impact warning, and the affordability position are **absent from every marketing surface**. In the UK, all four appear on the how-it-works page and two of them appear in the hero block. The products are structurally near-identical.

### US disclosures

**The no-interest statement, in caps** `[observed]`, Installment Agreement:
> "**THERE ARE NO FINANCE CHARGES AND NO INTEREST PAYMENTS ASSOCIATED WITH THIS AGREEMENT.** The issuer of your Payment Method (defined below) may charge interest or other charges in accordance with the terms and conditions of the agreement between you and your Payment Method issuer."

**The second sentence is the transferable one.** Afterpay states that it charges no interest and then immediately notes that **your card issuer might**. A user funding a Pay in 4 schedule with a credit card can be paying interest on an "interest-free" plan, and Afterpay says so — in the same paragraph, at the same weight.

That is the single most honest sentence in the US content set, and it is the kind of second-order disclosure that BNPL copy routinely omits. PayPal BNPL funded by a credit card has the identical issue.

**The Pay Monthly finance-fee disclosure, in the footer of every US page** `[observed]`:
> "*Loans with a finance fee are **underwritten and issued by First Electronic Bank**. For example, if your loan has a finance fee, your **annual percentage rate could be 36%**. At a loan amount of **$110** you could pay a **down payment of $27.50** followed by **3 generally biweekly payments of $28.26** at a **36% APR**. For complete terms see AFF loan agreement terms."

A complete representative example: lender, APR, loan amount, down payment, instalment count, cadence, instalment amount. `$27.50` is exactly 25% of `$110`, so the example also demonstrates the down-payment ratio. Well constructed.

But note the framing: the sentence above it says "**A finance fee may apply to certain transactions.**" — `finance fee`, not "interest". The word "interest" is avoided in favour of `finance fee` throughout the US marketing footer, while the worked example uses `APR`. **Two registers for the cost of credit within four lines of each other.**

**The Pay in 4 / Pay Monthly split is a live content problem across the whole US surface** `[observed]`. Evidence:
- `No late fees when you pay on time (Only for Pay in 4)` — parenthetical carve-out in a heading
- `Always interest-free at partner brands when you pay it in 4` — a double condition (partner brands AND pay in 4)
- `Choose to pay over 6 or 12 months or in 4 interest-free payments` — the homepage offers both in one sentence with the cost difference implicit
- `Pay in 4 loans without a finance fee to California residents are made or arranged pursuant to a California Finance Lenders Law license` — a third qualifier (`without a finance fee`) implying Pay in 4 loans *with* a fee exist
- Separate footer agreements: `Installment Agreement` vs `Pay Monthly Loan Agreement`

**A single brand, two credit products with materially different cost structures, and a benefit architecture that still assumes one.** The parenthetical patch is the visible symptom. For any PayPal surface carrying Pay in 3/4 alongside Pay Monthly, this is the failure mode to avoid: **do not append a product carve-out to a benefit claim — restructure the claim.**

**State-specific disclosures** `[observed]`, §16 — seven jurisdictions, each with its own required wording:
- **California**: CFL licence `#60DBO-99995`; DFPI contact; **negative-credit-report warning** ("a negative credit report reflecting on Borrower's credit record may be submitted to a credit reporting agency if Borrower fails to fulfill the terms"); separate-account right for married applicants; 60-day free credit report after adverse action; and **"other than a down payment, the first payment due hereunder will not be due for a minimum of 15 days after your purchase."**
- **Georgia**: a five-item `NOTICE TO CONSUMER` (don't sign with blanks; you're entitled to copies; prepayment right; credit-life-insurance choice; noncredit insurance is not required)
- **Maryland**: Credit Grantor Closed-end Credit Provisions cited
- **North Dakota**: money-broker licensing notice in caps, with the disclaimer that "LICENSING DOES NOT CONSTITUTE AN APPROVAL OF THE TERMS"
- **Oklahoma**: a pointer to the relevant sections on nonpayment, default, acceleration, prepayment and penalties
- **South Dakota**: Division of Banking address and phone
- **Rhode Island**: **"No late fees shall apply to Rhode Island state residents."**

**The Rhode Island line is the standout**: a US state where the late fee is zero, disclosed in one sentence. And the **California 15-day first-payment minimum** is a materially different schedule for one state, buried in §16 rather than surfaced in any schedule-explaining copy.

For anyone writing US BNPL copy, §16 is the evidence that **"the schedule" and "the fee" are not national constants** and that national marketing copy must be written to survive state variation.

**Prepayment right, stated twice** `[observed]`: "You may prepay all amounts due under this Agreement in whole or in part at any time **without a penalty** and may make any payment early, in whole or in part, **without penalty or premium** at any time." Belt and braces, and the correct answer.

**Credit reporting consent** `[observed]`, §5: consent for Afterpay to obtain "one or more credit reports or other consumer reports from consumer reporting agencies" for eligibility, servicing, **marketing**, and other FCRA-permissible purposes. Note `marketing` is in the list.

**Arbitration** `[observed]`, §10 — 30-day informal negotiation requirement, then binding individual arbitration, class-action waiver, jury-trial waiver, all in caps; AAA rules in San Francisco County; **a 30-day opt-out** with a specified address and six required elements; California-specific judicial-reference and public-injunctive-relief carve-outs; and small-claims court preserved "in any United States county where you live or work."

The opt-out is real and specified, which is better than most. It is also in clause 10(e) of a 16-section document, in caps, and requires posting or emailing a notice within 30 days.

**Liability cap** `[observed]`: the greater of the affected order amount or **$500.00**.

### UK (Clearpay) disclosures

**The regulatory footer, on every page** `[observed]`:
> "Deemed authorised and regulated by the Financial Conduct Authority for the purposes of the **Temporary Permission regime for Regulated Deferred Payment Credit**. Details of the Temporary Permission regime, which allows firms to carry on deferred payment credit activities **while seeking full authorisation**, are available on the Financial Conduct Authority's website."

**`Deemed authorised`** is the precise and unflattering term, and Clearpay uses it rather than "authorised". The clause "while seeking full authorisation" tells the user this is an interim status. Compare Klarna's UK footer, which states full FCA authorisation *and then* names which products fall outside the perimeter. **Two different honest solutions to the same problem: Klarna discloses a perimeter, Clearpay discloses a provisional status.** Both are better than a bare "FCA regulated".

**The UK marketing disclaimer, under the hero** `[observed]`:
> "Clearpay credit **subject to status**. Use responsibly as **late fees up to £24 per order apply, which may impact your future access to credit**. T&Cs apply."

Twenty-three words carrying: conditionality of approval, a behavioural instruction, the fee ceiling with its unit (`per order`), and the credit consequence. In the hero block.

**The full UK footer disclaimer** `[observed]`:
> "Clearpay credit subject to status. **Ensure you can make repayments on time.** You must be 18+ and a permanent UK resident (excl Channel Islands). Clearpay charges a **£6 late fee for each late instalment and a further £6 if it's still unpaid 7 days later.** Late fees are capped at **£6 for orders under £24** and the lower of **£24 or 25% of the order value for orders over £24**. **Missed payments may affect your future access to credit and your details may be passed onto a debt collection agency working on Clearpay's behalf.** T&Cs apply Clearpay.co.uk/terms"

Every consequence in one paragraph: the fee, the escalation, the two-tier cap, the credit impact, and **debt collection referral**. The US footer's equivalent is "Late fees may apply."

**The UK BNPL Regulations article — the most important single disclosure artefact in this file** `[observed]`

A dedicated help article, linked from a banner on the how-it-works page (`Clearpay now includes additional customer protections under new UK Buy Now, Pay Later regulations.` + `Learn more`). Ten sub-headed questions. Summarised, with key strings verbatim:

**`What's happened?`** — From **15 July 2026**, Clearpay Plans became **regulated credit agreements under the Consumer Credit Act 1974**. Clearpay Finance Limited is deemed authorised under the Temporary Permission regime.

**`Does Clearpay still work the same way?`** — "For most customers, the overall Clearpay experience remains largely the same." Four continuities listed: pay in 4 over 6 weeks; shop online and in-store with the Card; delay payments where eligible; discover and shop brands in the app.

**`What new protections do I receive?`** — four, named:
- `A 14-day right to withdraw from a Clearpay Plan`
- `The right to escalate unresolved complaints to the Financial Ombudsman Service`
- `Section 75 protection on eligible purchases over £100`
- `Stronger creditworthiness and affordability assessments for all customers`

**`Is Clearpay still be interest free?`** *(grammatical error preserved in live copy)* — Yes.

**`Does Clearpay run credit checks?`** — Yes, regular creditworthiness and affordability assessments for all customers: soft credit checks that do not impact the score; **"These checks are only visible to you and not to other lenders"**; and "We may occasionally ask you to confirm information such as your **income and expenses.**"

**`Do missed payments affect my credit score?`** — "Missed payments may be reported to Credit Reference Agencies (CRAs). This could affect your ability to access credit in future **or make borrowing more expensive.**"

**`Does Clearpay share my information with Credit Reference Agencies?`** — Yes, for affordability and responsible-lending assessments; "This is a **standard industry practice**" and is explained in the Privacy Policy.

**`What happens if I miss a payment?`** — "Our late fees **have not changed.**" Then £6 / +£6 after 7 days / capped at the lower of £24 or 25%. Then four escalations: report to CRAs, restrict or suspend the account, refer unpaid balances to a debt collection agency, or close the account.

**`Can Clearpay suspend or close my account?`** — Yes, with the four named triggers (see T7).

**Four things this article does that are directly copyable:**

1. **It leads with "what's changed" and then immediately answers "does it still work the same"** — the user's actual first question is not about the regulation, it is about whether their existing arrangement still holds. The continuity list comes second, before the protections.
2. **It states `Our late fees have not changed.`** A regulatory change is a moment when users reasonably fear repricing. Saying the fee is unchanged, in a four-word sentence, is the highest-value line in the article.
3. **It frames the change as protections gained, enumerated as four concrete rights** — with the specific thresholds (`14-day`, `over £100`) rather than "enhanced consumer protections".
4. **It puts the adverse consequences in the same article as the protections.** CRA reporting, account restriction, debt collection, and closure are all in the "good news" article. The regulation is not used as a marketing occasion.

**Credit-check disclosure, UK — with an internal contradiction** `[observed]`

Two statements on the same how-it-works page:
- Under `Will using Clearpay impact my credit score?`: "We carry out a soft credit check **which is visible to other lenders** and has no impact to your credit score."
- Under `Does Clearpay perform credit checks?`: "A soft credit check, also known as a soft enquiry, is **not visible to other lenders** and will not impact your credit score."
- And in the regulations article: "These checks are **only visible to you and not to other lenders**"

**Two of three say not visible; one says visible.** This is a **direct factual contradiction between two FAQ answers on the same page** about a credit-reporting fact, in a regulated market. Almost certainly a dropped "not" in the first instance. Recorded as the most serious content defect found in this batch, because it is a compliance-relevant statement that a user could rely on either way.

**Spend-limit governance is disclosed in both directions** `[observed]`, `Can I request a spend limit increase?`, summarised: limits cannot be manually increased; the system reviews accounts regularly; factors include on-time payment history, tenure, affordability information and credit-report information. **Then the downward factors**: missing a payment, lack of spending activity, requesting a decrease, affordability information, and credit-report information. Closing: "consistently paying on time helps improve your chances of being assessed for a higher spend limit."

**Naming the conditions under which the limit goes *down* — including "lack of spending activity" — is unusual and good.** A user whose limit dropped without a missed payment has an explanation available.

**`How does Clearpay make money?`** `[observed]` — given its own FAQ in the UK and absent in the US:
> "We earn a small fee from the stores you shop with on each purchase - that's our main source of revenue, **not late fees.**
> When you pay on time, everyone wins. You avoid any fees, the store gets paid right away, and we can keep the service running smoothly."

Directly rebutting the "they make money when you fail" suspicion, naming the suspicion. The US version of this claim is the Responsible Spending principle `Keep Afterpay free`: "Afterpay makes money by charging merchants, not customers–**this is our promise to you.**"

**`How is Clearpay different from credit cards?`** `[observed]` — an explicit competitor-category comparison, summarised: no hidden or annual fees, no interest; initial spend limits set from a soft check "along with several other factors" and growing with on-time payments, versus credit cards which "may offer **higher initial credit limits, which can potentially lead to overspending**"; late fees capped and **"do not compound over time"**, versus credit-card fees that "may compound, and often charge interest on unpaid balances"; and the account pause. Routed to a `Get the Facts page` (`/clearpay-misconceptions`).

`do not compound over time` is the precise claim, and pairing it with "credit card companies may charge late payment fees that can compound" gives the reader the contrast that makes the cap meaningful.

### Responsible Spending — the US's best disclosure surface

`[observed]`. Heading: **`Afterpay is committed to putting you in control of your finances.`**

Three support pillars:
- `Flexible Payments` — "Reschedule your payments by **up to 5 days, 3 times a year**, or pay off outstanding balances ahead of time."
- `Control` — "Track your payments and check your **estimated spend limit** in the Afterpay app or on our website."
- `Support` — "Our **Financial Hardship Policy** has been with us from the very beginning because we understand that your circumstances may change."

Then **`To keep us focused on this mission, we have 4 guiding principles:`**

| Principle | Substance (summarised) |
|---|---|
| `Take it slow` | "Afterpay makes sure you only ever spend what you can afford to pay back. That's why we **require the first payment upfront**, and set **sensible initial spending limits that increase gradually over time.**" |
| `Keep Afterpay free` | Never interest or extra charges if you pay on time; revenue comes from merchants, "this is our promise to you" |
| `Late payments are bad business` | Fee only on a miss, but reminders before the due date and an alert after failure come first |
| `Happy customers make even more happy customers` | Satisfied customers return and recommend, giving retailers confidence to offer Afterpay |

**`Late payments are bad business` is the most interesting heading in this file.** It is a statement about Afterpay's *commercial* interest, not the user's, and it is used as the reassurance. The implicit argument is "you can trust us not to want you to fail, because failure is unprofitable for us" — the same structural argument Lemonade makes with Giveback and Klarna makes with merchant fees.

**`Take it slow` names the down payment as a safety mechanism.** "That's why we require the first payment upfront" reframes the 25% as underwriting rather than as a cost. Whether or not one accepts it, the move — **justify a friction by the protection it provides** — is transferable.

Principle 4 is the odd one: it is a business-model statement with no user benefit, sitting in a list of consumer commitments.

## T11 Help-centre architecture

Two-level: **11 categories → article lists**. Served at `help.afterpay.com` but **redirecting to on-domain paths** (`afterpay.com/en-US/help/...`), so the help content lives under the marketing domain. UK equivalent at `help.clearpay.co.uk` / `clearpay.co.uk/en-GB/help/`.

**Help centre home is nearly empty of content** `[observed]`. The page renders: `Help Centre`, `Get in touch`, `Afterpay`, `Search`, `Welcome to our Help Centre`, `Find the answers you need here`, `What can we help with today?`, `Still need help?` / "Our team will be happy to help!" / `Get in touch`, and a language switcher (`English (Australia)`, `English (Canada)`, `English (New Zealand)`, `Français (Canada)`).

**Three headings competing for the same slot** — `Welcome to our Help Centre`, `Find the answers you need here`, and `What can we help with today?` all appear on one page, none obviously subordinate. The category list does not render server-side.

**Contact block, consistent across both markets** `[observed]` — a three-row pattern with a label and a sub-label each:

| Label | Sub-label |
|---|---|
| `Start a chat` | `Open your mobile app to chat 24/7` |
| `Call us at (833) 844-8095` | `Available daily, 8 AM–9:30 PM ET` |
| `Explore more options` *(UK)* | `Browse more ways to get help` |

The chat sub-label is honest: chat is **in the app**, not on the web. Telling the user where the channel lives, in the label, prevents a click into nothing.

**Category article counts observed**: `Payments` (20), `Managing Orders` (16), `Hardship` (2). The Payments category is the richest source of schedule and failure vocabulary in this file and is reproduced in T7.

**Notable within `Payments`:** the first-listed article is `Billing Error`, a **bare noun phrase** among nineteen questions and imperatives — inconsistent title grammar, and it happens to be the Reg-Z article.

**Notable within `Managing Orders`:** five of sixteen articles are about **gift cards**, including the duplicated pair noted in T7. A single restricted category consuming a third of a help section.

`Other Popular Questions` and `Privacy & Security` are categories not opened. UK help IA was not enumerated beyond the two articles fetched.

## T12 FAQs

Four FAQ surfaces. The UK how-it-works FAQ is the substantial one.

### Clearpay UK — `Still got questions?` (13 questions, answers present) `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How does Clearpay work? |
| 2 | How do I set up a Clearpay account? |
| 3 | What happens if my application to use Clearpay is not successful? |
| 4 | Will using Clearpay impact my credit score? |
| 5 | Can I use Clearpay in physical stores, or just online? |
| 6 | Are there any fees for using Clearpay? |
| 7 | How much are late fees? |
| 8 | Can I request a spend limit increase? |
| 9 | Is Clearpay really interest-free? |
| 10 | What happens if I miss a payment? |
| 11 | How does Clearpay make money? |
| 12 | Is Clearpay secure and safe to use? |
| 13 | How is Clearpay different from credit cards? |

**Structural notes.** Thirteen questions, and the ordering is: mechanism → signup → **rejection** → **credit impact** → availability → fees → late fees → limits → interest → **missed payment** → business model → security → competitive comparison.

**The rejection question is third and the credit-impact question is fourth** — before availability, before fees, before anything about using the product. A user's third question is "what if you say no" and their fourth is "will this hurt me", and the IA agrees.

Q9, **`Is Clearpay really interest-free?`**, contains the word `really` — the FAQ writer has put the user's scepticism into the question. The answer is eight words: "It's always interest-free when you pay in 4 instalments." Note the condition is in the answer, not the question.

Q7 (`How much are late fees?`) and Q10 (`What happens if I miss a payment?`) split the fee amount from the consequence stack — two questions where most products would write one. Q6 (`Are there any fees for using Clearpay?`) is a third bite at the same territory. **Three fee questions out of thirteen.**

**The page duplicates its own FAQ block.** The 13 questions render twice in the served HTML, with Q7 (`How much are late fees?`) present in the second block and absent from the first, and with **materially different answers** for Q8 (`Can I request a spend limit increase?`) between the two copies — the first version cites "your affordability information and the information contained in your credit report" among the factors; the second omits both. Two versions of a regulated affordability statement on one page. Recorded as a significant defect.

### Afterpay US — Responsible Spending FAQ (3 questions) `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | ﻿How do I make payments with Afterpay? |
| 2 | What happens if I don't pay on time? |
| 3 | ﻿Have more questions about how Afterpay works? |

Three questions, and Q2 is the only place on the US marketing surface where the missed-payment sequence is explained. Q3 is a routing question, not a content question.

Note the **zero-width characters** preserved at the start of Q1 and Q3 (`﻿How do I…`) — a paste artefact in live UI.

Q2's phrasing is worth comparing across markets: US `What happens if I don't pay on time?` (the user's volition — *don't pay*) vs UK `What happens if I miss a payment?` (accidental — *miss*). **"Don't pay" implies choice; "miss" implies slip.** A one-word difference in blame attribution between two markets of the same company.

### Afterpay US — How It Works `Got questions?` `[observed]`

Not a FAQ; a single routing line: "**Got questions?** Check out our FAQs or get in touch with us to learn more." + `Visit our Help Center`.

### Clearpay UK — `Got more questions?` `[observed]`

"Get in touch with us via Help in the app." + `Help Centre`. Again names the channel's location.

## T13 Terminology & glossary

| Term | Usage | The alternative it rejected |
|---|---|---|
| `Pay in 4` | The core product, both markets | "BNPL", "instalment plan", "split pay" |
| `Afterpay it` / `Clearpay it` | The brand as verb | — |
| `installments` / `instalments` | US / UK spelling | "repayments", "payments" (Klarna's choice) |
| `Installment Payment` | US legal, capitalised | |
| `Payment Schedule` → `Final Payment Schedule` | The estimate and the actual | "your plan", "your payments" |
| `Down Payment` | US legal | `first payment upfront` (marketing) |
| `approx. 25% at the time of purchase` | UK marketing | "first instalment" |
| `Clearpay Plan` | **UK: the regulated credit agreement** | "credit agreement", "loan", "contract" |
| `Pay Monthly` | US monthly financing | "financing", "instalment loan" |
| `finance fee` | US: the cost of Pay Monthly credit | **"interest"** — avoided in marketing, `APR` used only in the worked example |
| `spend limit` | UK | "credit limit" |
| `estimated spend limit` | US marketing | |
| `Available to Spend` | US in-product label | |
| `Smart limits` | UK marketing | |
| `paused` | Account state after a miss | "suspended", "frozen" |
| `on hold` | Account state during hardship | — *(deliberately different from `paused`)* |
| `delinquent` / `default` | **US legal only** | — *(never in consumer copy)* |
| `financial hardship` | The named policy and state | "payment difficulties", "arrears" |
| `Financial Hardship Policy` | Capitalised as a product | |
| `Autopay` | US help | `automatic payments` / `direct debit system` — **three names** |
| `Preferred Payment Day` | US help, title-cased | |
| `Linked Business` / `Linked Businesses` | Merchants with saved Afterpay | "saved merchants" |
| `Subscription Service` / `Subscription Payment` | US legal defined terms | |
| `Single use payments` | UK footer | `Afterpay Single-Use Payment` (US help) — **hyphenation differs** |
| `Pulse Rewards` | US loyalty programme | |
| `Get the Facts` | UK misconceptions page | "myths", "FAQ" |
| `deemed authorised` | UK regulatory status | "authorised" |
| `Temporary Permission regime` | UK | |
| `Regulated Deferred Payment Credit` | **The FCA's term for BNPL** | "BNPL" |

**`Regulated Deferred Payment Credit`** is the regulator's name for the product and it appears verbatim in every Clearpay footer. It is worth recording as the formal term a UK-facing content designer will encounter, against which `Pay in 4` is the consumer translation.

**`finance fee` instead of `interest`** in US marketing, while the same footer's worked example uses `APR`. The word "interest" appears in US copy only in the negative (`interest-free`) and in the credit-card carve-out. A product that charges up to 36% APR describes that cost as a `finance fee` in its footer and as `36% APR` only inside the example.

**`delinquent` and `default` exist only in the legal text.** A US user who misses payments will be described internally, and possibly to credit bureaus, using words that appear nowhere in the consumer copy they were shown. The UK, by contrast, uses `missed payment`, `overdue`, `paused` and `restricted` in both registers.

**The two-market naming divergence is smaller than Klarna's but present:** `Afterpay` / `Clearpay`; `installments` / `instalments`; `Help Center` / `Help Centre`; `Available to Spend` / `spend limit`. Products keep their names (`Pay in 4`, the Card), which is better than Klarna's `Pay over time` / `Slice it.` split.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company. In the UK failure copy the company is the actor (`we will immediately pause your account`, `we'll place your account on hold`, `we'll let you know`); in the US legal copy the user is frequently the subject of the failure (`If you fail to make any payment when due… you will be delinquent`, `you will remain obligated`). **The register difference between the two markets is partly a register difference between marketing and legal** — but the US has no consumer-register failure copy to compare, which is itself the point.

**Register — US.** Short, upbeat, sentence-fragment headings with full stops (`Stay in control.`, `Get inspired.`, `Earn rewards.`). Contractions throughout. Emoji absent. Exclamation marks confined to support furniture (`Our team will be happy to help!`). `Financial wellness`, `budget`, `in control` recur as the responsible-spending vocabulary.

**Register — UK.** Warmer and more conversational than the US in the *hardship* content specifically, and flatter in the fee content. `it's okay to need a little help` · `some breathing room` · `you're not alone — and you don't need to navigate this alone either` · `Good news, our late fees are capped at £24` · `When you pay on time, everyone wins` · `The app is where it's at.` · `98% of Brits rate the Clearpay app 5 stars`.

**`Good news, our late fees are capped at £24 or 25% of the order value, whichever is less!`** is a fascinating sentence. It is the only exclamation mark in the UK fee copy, and it is attached to a fee cap. Framing a ceiling on penalties as good news is defensible (it *is* better than uncapped) and slightly jarring. Recorded without judgement as a real tonal choice in regulated copy.

**The hardship page is the tonal outlier and the best-written page in the file.** `We're here to support you` as an H1; the second person throughout; the permission-giving (`it's okay to need a little help`); and the naming of causes including domestic violence. It reads as though written by a different team to the marketing pages, and it reads better.

**Numbers as trust devices** `[observed]`: `over 700k 5-star reviews` (US), `98% of Brits rate the Clearpay app 5 stars*` with the footnote `*Clearpay app is rated 4.9 stars on the Apple App Store (UK)`.

**That footnote contradicts the claim it annotates.** "98% of Brits rate the Clearpay app 5 stars" is footnoted to "rated 4.9 stars on the Apple App Store (UK)" — an average rating is not a proportion of five-star reviews, and "Brits" is not "UK App Store reviewers". The footnote does not substantiate the headline claim; it substitutes a different one. Recorded as a defect in claim-bounding — the opposite of the Wise "claim, then bound the claim" pattern.

**Testimonial and review disclosure** is otherwise `[absent]` — no representativeness disclaimer found on either market's review claims.

**Accessibility content** `[observed]`

- **`Skip to main content`** present on the help-centre shell (`help.afterpay.com`). **Not found** on the marketing pages, the How It Works page, Responsible Spending, the Installment Agreement, or any Clearpay page inspected
- **No accessibility statement was found in either market.** No `Accessibility` link in the US footer (which has 7 legal links) or the UK footer (which has 5 columns plus 8 legal links). This is an absence, not a claim that none exists elsewhere. Against Klarna, Lemonade and Acorns — all of which publish one — Afterpay is the only product in this batch with no accessibility page found at all
- The help centre's logo carries alt `Afterpay Help Center home page` and the footer instance carries the link title `footer`; the main logo's title is `Home`

**Accessibility defects, recorded honestly:**
- **`Image Alt Text` is used as the literal alt text** on the four Responsible Spending principle images — the placeholder string from the CMS shipped to production. Four images, on the page that explains the fee model, announced as "Image Alt Text"
- **The entire Clearpay how-it-works page uses empty or missing alt on every image**, including the four `Why use Clearpay?` icons and all eight app screenshots — the screenshots showing the payment schedule are unlabelled
- `No suggestions found` / `No categories found` render in the header of every page in the default state (see T8)
- All US marketing nav links resolve to `/en-US` in the served HTML — keyboard and screen-reader users traversing the nav reach the same destination from every item
- UK FAQ accordion toggles are images with no accessible name
- `Get the app` vs `Get the App` on one page
- Five labels for the help centre, including `Visit Here.`
- `Isle of Mann` — misspelling in the eligibility list
- `Is Clearpay still be interest free?` — grammatical error in a live regulatory FAQ heading
- `a late free of £6` — typo for "fee", appearing **twice** on the UK how-it-works page, in the missed-payment answers
- `cap late payments` for "cap late fees" on the US How It Works page
- `up to date` / `up-to-date` inconsistent within one answer
- The 13-question UK FAQ block renders twice with **different content** in two answers
- **`soft credit check which is visible to other lenders` vs `not visible to other lenders`** — a direct contradiction on one page about a credit-reporting fact (see T10)

---

## Transferable patterns

1. **Name the provisional schedule and the final schedule differently.** `Payment Schedule` (estimate, shown at checkout) → `Final Payment Schedule` (actual, sent after the merchant confirms, and explicitly "supersedes and replaces"). If tax and shipping move the numbers, do not show one figure and silently revise it — name two artefacts and state which one governs. **The single most directly applicable pattern in this file to PayPal Pay in 3 / Pay in 4.**
2. **Give the total term alongside the instalment count.** `Pay in 4` and `Pay over six weeks` on the same block. The count answers "how many"; the duration answers "when am I free of this" — which is the budgeting question.
3. **State that your interest-free plan may still cost interest.** "THERE ARE NO FINANCE CHARGES AND NO INTEREST… The issuer of your Payment Method may charge interest or other charges." Second-order cost disclosure, at the same weight as the first-order claim.
4. **Two different words for the punitive and the protective version of the same account state.** `paused` (you missed a payment) vs `on hold` (we're agreeing a hardship arrangement). Same restriction, opposite valence, and the hardship version states its purpose: "to help minimise late fees or payment impacts."
5. **Publish the hardship remedies before the user asks.** `Adjusting your payment schedule` · `Waiving late fees` · `Setting up a payment plan`. A user in difficulty does not know what is available to request. Pair with independent debt-charity signposting including opening hours.
6. **Name hardship causes specifically, including `Family or domestic violence`.** A published list tells a user their situation is recognised, which is the precondition for them disclosing it.
7. **Be honest that the mechanism can refuse you, inside the how-it-works.** "Please note: Clearpay does not approve 100% of orders. We are committed to ensuring we support responsible spending." Pre-empts the first decline rather than explaining it afterwards.
8. **`I missed a payment. What happens to my account?`** First-person confession plus the user's actual next question, joined by a full stop. Consequence-focused rather than remedy-focused, which is the correct priority in the first minute after a miss.
9. **Regulatory-change article: continuity first, then protections, then consequences — and say the fee hasn't changed.** `Our late fees have not changed.` Four words that stop a support queue. And put the adverse consequences (CRA reporting, debt collection) in the same article as the new rights.
10. **State the small-order fee cap as its own rule, not as a derivable percentage.** `£6 for orders under £24` alongside `the lower of £24 or 25%`. A user with a small basket should not have to do arithmetic to know their exposure.
11. **Render a mandated legal notice as a numbered eligibility checklist.** Afterpay's Reg-Z claims-and-defenses notice becomes three testable conditions. The user self-assesses instead of parsing.
12. **`up to 5 days, 3 times a year`** — a flexibility promise with both a per-instance limit and an annual quota. Precise promises are more useful than generous vague ones.
13. **Negative benchmark — the same company discloses the late fee in the UK hero and nowhere on the US marketing site.** `£24 per order` under the headline versus `Late fees may apply.` in the footer. The variable is regulation, not editorial capability. Use this comparison when arguing that a disclosure *can* live above the fold.
14. **Negative benchmark — do not patch a benefit claim with a product carve-out.** `No late fees when you pay on time (Only for Pay in 4)` is what happens when a second product with a different fee structure arrives under an existing benefit architecture. Restructure the claim; do not parenthesise it.
15. **Negative benchmark — a credit-reporting fact stated two contradictory ways on one page.** "soft credit check **which is visible** to other lenders" vs "**not visible** to other lenders" in adjacent Clearpay FAQs. In regulated copy, a dropped "not" is a compliance incident.

## Caveats & gaps

- **The US homepage returned only fragments.** `https://www.afterpay.com/` is client-rendered; the served HTML contained the app pitch, three benefit blocks and two tiles, with no nav, no footer, and no disclosure content. US marketing analysis therefore rests primarily on `/en-US/how-it-works` and `/en-US/responsible-spending`.
- **All US marketing navigation and footer links resolve to `/en-US` in the served HTML.** The legal agreements were reached by direct URL. It is not possible to confirm from the rendered source whether a user clicking `Installment Agreement` in the footer reaches the agreement.
- **Help-article bodies were not opened.** Category names and 38 article titles across three categories were captured from the category indexes. Answer structure, in-product strings quoted inside articles, and the `Returns / Refunds`, `Getting Started`, `Managing Your Account`, `Afterpay In-Store`, `Other Popular Questions`, `Contact Afterpay` and `Privacy & Security` categories are unharvested. Given that `Returns / Refunds` is the **first** category and that §6 of the Installment Agreement reveals a counter-intuitive refund mechanic, that category is the highest-value follow-up in this file.
- **The `Pay Monthly Loan Agreement` was not fetched.** Pay Monthly terms in this file come only from the US footer's representative example (`36% APR`, `$110`, `$27.50` down, `3 generally biweekly payments of $28.26`) and the homepage's `6 or 12 months`. **The Pay Monthly late-fee schedule, its eligibility copy, and its disclosure sequence are absent** — and since the marketing carve-out `(Only for Pay in 4)` exists precisely because Pay Monthly differs, this is a material gap.
- **AU and NZ markets were not harvested**, despite the brief naming AU. Afterpay originated in Australia and the AU regime (now under the National Consumer Credit Protection regime) would carry a third set of regulated wording. The locale switcher exposes `English (Australia)` and `English (New Zealand)`; neither was fetched.
- **The UK how-it-works FAQ block renders twice with different content** in at least two answers (`Can I request a spend limit increase?` differs on affordability and credit-report factors; `How much are late fees?` is present in one copy only). Where the two differ, this file quotes the more complete version and flags the discrepancy. **Any UK affordability statement from this file should be re-verified against the live page.**
- **The soft-credit-check visibility contradiction is unresolved.** Two Clearpay FAQs on the same page state opposite facts. The weight of evidence (two statements plus the regulations article) favours "not visible to other lenders", but this file does not assert which is correct.
- **All in-product schedule UI is `[absent]`.** The payment-schedule view, due-date display, reminder copy, `PAY NOW` flow, reschedule flow, and the `In-Store` tab were not observed. The in-product strings recorded in T5 are quoted from help and policy copy, not seen.
- **Checkout copy is `[documented]` at best.** The "at selection" column of the T10 placement table is reconstructed from the Installment Agreement's defined terms, not observed.
- **No accessibility statement found in either market**, and no `Skip to main content` on any marketing page. Recorded as absences.
- Fee figures (`$8.00`, `£6`, `£24`, `36% APR`), grace periods, and reschedule allowances are point-in-time and state/market-dependent — §16 demonstrates that US late fees vary by state and are **zero in Rhode Island**. No figure from this file should be used as precedent without re-verification for the specific market and state.

## Sources

1. https://www.afterpay.com/
2. https://www.afterpay.com/how-it-works (redirects to https://www.afterpay.com/en-US/how-it-works)
3. https://www.afterpay.com/en-US/installment-agreement
4. https://www.afterpay.com/en-US/responsible-spending
5. https://help.afterpay.com/hc/en-us
6. https://help.afterpay.com/hc/en-us/categories/360001002192-I-m-a-Customer (redirects to https://www.afterpay.com/en-US/help/360001002192-I-m-a-Customer)
7. https://www.afterpay.com/en-US/help/203376123-Payments
8. https://www.afterpay.com/en-US/help/115000485786-Managing-Orders
9. https://www.afterpay.com/en-US/help/900000441026-Hardship
10. https://www.afterpay.com/en-GB/how-it-works (redirects to https://www.clearpay.co.uk/en-GB/how-it-works)
11. https://www.clearpay.co.uk/en-GB/hardship
12. https://www.clearpay.co.uk/en-GB/help/1779754146958-uk-bnpl-regulations
