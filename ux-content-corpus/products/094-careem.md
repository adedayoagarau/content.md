# 094. Careem

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | MENA super-app (ride-hailing + delivery + quick commerce + licensed wallet and remittance) |
| Primary URL | https://www.careem.com/ |
| Corpus rank | 094 |
| Benchmark strength (source list) | Regional multi-service navigation |
| Locale / market observed | **en-AE** (careem.com resolves to `/en-AE/`, UAE default) and **ar-AE** (`/ar-AE/`, Arabic RTL) for the bilingual comparison. Help centre observed in **en-US** and **ar**; it advertises six languages. |
| Platform observed | Web (desktop marketing, Nuxt/Next-style SSR), Zendesk help centre (server-rendered, fully reachable) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Central Bank of the UAE** named twice — for wallet security ("approved by the Central Bank of the UAE") and for remittance ("in partnership with Lulu Exchange… fully authorized and regulated by the Central Bank of the UAE"). GDPR referenced via a Subject Access Request help article. Emirates ID + UAE Visa named as mandatory KYC documents. |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Full. Both locales reached, help centre reachable and server-rendered, RTL surface observed directly. T5 partially recoverable (in-app steps quoted in FAQ answers). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (EN) | https://www.careem.com/ → `/en-AE/` | The four-verb IA — the T1/T13 core |
| Homepage (AR) | https://www.careem.com/ar-AE/ | RTL, mixed-script service names — the locale core |
| Rides | https://www.careem.com/en-AE/ride/ | Ride tiers, `Captain` terminology, 4-question FAQ |
| Careem Pay | https://www.careem.com/en-AE/pay/ | Wallet + remittance; 10-question FAQ with in-app step sequences |
| Food | https://www.careem.com/en-AE/food/ | 3-question FAQ incl. the missing-item path |
| Quik (groceries) | https://www.careem.com/en-AE/groceries/ | `100% Quality Guarantee`, `Careem's Choice` |
| Careem Plus | https://www.careem.com/en-AE/cplus/ | Subscription benefit naming + cancellation wording |
| Captains | https://www.careem.com/en-AE/captains/ | Supply-side; `Captain Club` |
| Help Centre home (EN) | https://help.careem.com/hc/en-us | Ten category labels + six-language switcher |
| Help Centre home (AR) | https://help.careem.com/hc/ar | Arabic category labels — the naming-divergence core |
| Help: Rides | https://help.careem.com/hc/en-us/categories/1500001164901-Rides | 9 sections, ~40 article titles |
| Help: Pay | https://help.careem.com/hc/en-us/categories/360003323854-Pay | 8 sections; wallet/remittance vocabulary |
| Help: Careem Captain | https://help.careem.com/hc/en-us/categories/360000043928-Careem-Captain | 2 sections; supply-side onboarding |

---

## T1 Navigation & IA labels — PRIORITY

**The whole IA is four one-syllable verbs.** `[observed]`

`Go` · `Eat` · `Get` · `Pay`

These appear as the tab labels inside the `Services` mega-menu (rendered in the DOM as the run-on `GoEatGetPay`), as the four section headings on the homepage, as the four "Explore more with Careem" blocks repeated at the foot of every product page, and as four of the five entries in the site footer's `Services` column.

Each verb is completed by an `any-` adverb, rendered as a subheading beneath it:

| Verb | Completion (verbatim) |
|---|---|
| `Go` | `anywhere` |
| `Eat` | `anytime` |
| `Get` | `anything` |
| `Pay` | `anyone` |

`Go anywhere` · `Eat anytime` · `Get anything` · `Pay anyone`. Four verbs, four `any-` words, no repetition — place, time, object, person. It is the tightest top-level IA in the TRAV cluster and arguably in the corpus: two words per category, complete coverage of the service catalogue, and the *grammar itself* tells the user what kind of choice sits underneath.

Compare the alternatives. Grab organises by **audience** (`Consumer`/`Driver`/`Merchant`/`Enterprise`) and needs a scope sentence on every one of ~50 links. Gojek organises by **domain noun** (`Transport and Logistics`) and ships its services as unlabelled logos. Careem organises by **user intent verb** and needs no scope sentences at all, because the verb already frames the service beneath it.

**Under each verb: plain descriptive service names, almost no coined terms.** `[observed]`

| Cluster | Services |
|---|---|
| `Go` | `Rides` · `Taxi` · `Bike` · `CarRental` · `SchoolRides` |
| `Eat` | `Food` · `DineOut` |
| `Get` | `Quik` · `Quik Electronics` · `Supermarkets` · `Box` · `Home Services` · `Pharmacy` · `Flowers` |
| `Pay` | `Pay` · `Donations` · `Send money` |

Seventeen services and **only one invented word in the whole list** (`Quik`). Everything else is the ordinary English noun for the thing. This is the polar opposite of the Grab and Gojek strategy, and it is a deliberate system rather than an absence of one — see T13.

**The brand is carried by an icon, not by the words.** `[observed]` Every service name in the DOM is preceded by a logo token: `Careem Wink Logo Rides`, `Careem Wink Logo Quik`, `Careem Wink Logo Send money`. The `Careem wink` mark does the branding at every single service mention, which is precisely what frees the wordmark to be generic. `Rides` can be a plain noun because the wink is attached to it.

The cost is that the *text layer* is unbranded: a screen-reader user, or anyone reading the DOM, gets `logoRides`, `logoQuik`, `logoBox` — the alt/label text is the literal string `logo` concatenated to the service name. See T14.

**Nav groups beyond Services** `[observed]`: `Partners` (`Restaurant delivery`, `B2B delivery`, `DineOut partner`, `Become a supplier`) · `Careem for Business` · `Careem Plus` · `About us`.

Note that `Careem for Business` and `Careem Plus` are **top-level nav items, not services** — the two commercial constructs that sit *across* the four verbs get promoted out of the verb system rather than forced into it. That is the correct call and a reusable one: a subscription and a B2B account are not intents.

**Footer `Services` column mixes the verbs and a product** `[observed]`: `Go` · `Eat` · `Get` · `Pay` · `Careem Plus`. The four verbs link to `/ride/`, `/food/`, `/groceries/` and `/pay/` respectively — so `Get` resolves to Quik, and `Eat` resolves to Food. **The verb is being used as a synonym for the first service under it**, which is a lossy shortcut: a user clicking `Get` expecting the seven-service cluster lands on the grocery page.

**Help-centre IA is a flat category list, and it does not match the marketing IA at all** `[observed]`:

`Rides` · `Hala Taxi` · `Wusool` · `School rides` · `Pay` · `Food` · `Quik & Shops` · `Bike - UAE` · `Bike - KSA` · `Careem Captain`

Four divergences from the marketing nav, each worth recording:
1. **`Hala Taxi` and `Wusool` exist only in help.** Neither appears anywhere in the marketing navigation. `Hala Taxi` is the Dubai RTA joint-venture taxi brand (it surfaces once in marketing, inside a Careem Plus benefit line: "10% back on 10 rides / On Rides & Hala Taxi"). `Wusool` is a Saudi programme. **The help centre documents two market-specific services the marketing site does not acknowledge.**
2. **`Bike` splits into `Bike - UAE` and `Bike - KSA`** — the only market-split category, using a hyphen-suffix convention that exists nowhere else in the IA.
3. **`Quik & Shops`** collapses the marketing cluster's seven `Get` services (`Quik`, `Quik Electronics`, `Supermarkets`, `Box`, `Home Services`, `Pharmacy`, `Flowers`) into one category with an ampersand and an invented cover-noun (`Shops`).
4. **`SchoolRides` (marketing, camel-case) becomes `School rides` (help, spaced and sentence-cased).**

And the help nav contains **five empty list items**, rendered as bare `-` between `Bike - KSA` and `Careem Captain`. Five nav slots with no label, shipped live.

**The Arabic navigation does not translate the four verbs — it replaces them with possessives.** `[observed]` This is the sharpest locale finding in the file.

| English | Arabic | Literal |
|---|---|---|
| `Go` / `anywhere` | `رحلاتك` | *"your rides"* |
| `Eat` / `anytime` | `مطاعمك` | *"your restaurants"* |
| `Get` / `anything` | `احتياجاتك` | *"your needs"* |
| `Pay` / `anyone` | `مدفوعاتك` | *"your payments"* |

Four imperative verbs in English become **four second-person-possessive nouns in Arabic**. The English addresses the user's intention (*do this*); the Arabic addresses the user's possessions (*these are yours*). The `any-` adverbs disappear entirely, and with them the whole rhetorical structure of the English IA.

And then the **Arabic footer uses a third system** — imperatives again, but different ones:

`انطلق` [*set off / depart*] · `تناول الطعام` [*eat food*] · `احصل على` [*get / obtain*] · `الدفع` [*the payment*]

So `Go` is `رحلاتك` in the nav and `انطلق` in the footer, on the same page. `Pay` is `مدفوعاتك` in the nav and `الدفع` in the footer. **Two Arabic naming systems for one four-item IA, one page apart.** `احصل على` is also an incomplete construction — "obtain" with a dangling preposition and no object, which in English would read as "Get from".

The transcreation instinct was right: `Go anywhere` does not carry into Arabic as a two-word imperative, and the possessive reframe is a defensible solution. The execution is not governed.

## T2 Value proposition & headline patterns

**The self-description is a definite article and a superlative** `[observed]`

> `The everything app | Careem`
> "Careem is 'the everything app' for the region, making it easier than ever to move around, order food and groceries, manage payments, and more."

`the everything app` — no brand prefix, no `super`, lower-cased, and **quoted in its own meta-description**, as if the phrase were being attributed rather than asserted. The scope qualifier is `for the region`, which does the same work Bolt's `first European mobility super-app` does: a geographic bound that makes an absolute claim defensible.

Compare the cluster: Grab says `The Everyday Everything App` (title-cased, `Everyday` added). Careem's is shorter and lower-cased. Bolt qualifies by continent. Gojek does not claim the category at all.

**Careem's own purpose statement is unusually inward-facing** `[observed]`: "Careem's purpose is to simplify and improve the lives of people and build an awesome organisation that inspires." The second clause is about the company, not the customer — a mission statement written half for recruitment. `awesome` is the only word of its register in the corporate copy. The Arabic renders this with markedly more formal diction.

**Product headlines are short noun-plus-promise, with the service name repeated as a heading** `[observed]`:

| Page | Heading | Line beneath |
|---|---|---|
| Rides | `logoRides` | "Order a ride with Careem, and go further, faster." |
| Pay | `logoPay` | "Moving money made easy." |
| Food | `logoFood` | "Your favourite food is just a tap away on Careem." |
| Quik | `logoQuik` | "If you're looking for quality groceries, you're in the right place." |

`Moving money made easy` is the strongest — three words of alliteration, and `moving` is doing double duty for a mobility company that now moves money. The heading itself is the broken `logoPay` string (see T14).

**The Pay page uses a three-part `It's…` construction** `[observed]`:

- `It's fast and easy.` — "Send money to 30+ countries in minutes. Set rate alerts with a few taps, so you always get more value."
- `It's safe.` — "Your money, cards and data are protected with our advanced security – approved by the Central Bank of the UAE."
- `It's for all your needs.` — "Pay a friend or pay a bill, send money or use your wallet balance to pay for things on the Careem app."

Three headings, all `It's <adjective phrase>`, each with a mechanism sentence beneath. The second one lands the regulator inside the benefit sentence rather than in a footnote — "protected with our advanced security – approved by the Central Bank of the UAE" — so the trust claim and its warrant arrive together. That is the Wise claim-then-bound pattern inverted: claim, then *authorise*.

**Quik's four benefit headings are the most disciplined set in the harvest** `[observed]`:

`Super fast delivery.` · `100% Quality Guarantee.` · `Member-only benefits with Careem Plus.` · `The best of everything with Careem's Choice.`

All four end in a full stop. Two are coined guarantees (`100% Quality Guarantee`, `Careem's Choice`), one is a cross-sell, one is a speed claim. And the speed claim is immediately bounded in the body: "get everything delivered in as little as 15 minutes" — `as little as` rather than "in 15 minutes", which is the right hedge in the right place.

**Careem Plus headline is a saving figure, framed as typical rather than maximal** `[observed]`: `Most members save AED 300+ monthly with Careem Plus`. `Most members` is a population claim, not a best case — stronger than "save up to AED 300" and much rarer. The same line appears on the homepage carousel as `Most members save AED 300+ every month` — **two wordings of one claim** (`monthly` vs `every month`), on two surfaces.

**Captains page leads with earnings autonomy, in three noun headings** `[observed]`: `Earnings` · `Captain Club` · `Flexibility`. Body under `Earnings`: "Be your own boss by earning at your own convenience." The `be your own boss` construction is identical to Grab's driver copy — a shared regional convention rather than a differentiator.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Order now` | Food ×3, Quik ×4 | The dominant commerce CTA |
| `Explore Careem Pay` | Pay hero | Verb + full product name |
| `Send abroad` | Pay page ×2 | Verb + adverb; matches the in-app label quoted in the FAQ (`'Send Abroad'`) |
| `Check rates` | Pay page | Paired with `Send abroad` — a low-commitment alternative beside the high-commitment one |
| `Pay now` | Pay, bills block | |
| `Explore more` | Pay, send/request block | Bare |
| `Try now` | Pay, ×3 tiles | |
| `Subscribe now` | Careem Plus ×5 | |
| `Sign up` | Captains ×4 | Links to `drive.careem.com` |
| `Read more` | Homepage ×4 | |
| `قراءة المزيد` | Homepage AR ×4 | Arabic equivalent |
| `View all` / `مشاهدة الكل` | Blog block | **Both languages rendered simultaneously on the English page** |
| `Partner with us` | Food, merchant block | |
| `Explore all restaurants` | Food | Fully specific |
| `Submit a request` | Help centre, top right | The contact route, placed first not last |
| `See all 9 articles` / `See all 22 articles` / `See all 10 articles` | Help sections | Count included in the label |

**Findings.** `Send abroad` / `Check rates` is the best-designed CTA pair in the harvest: the commit action and the browse action sit side by side, and the browse action is the one a first-time remitter actually wants. Most products ship only the commit button.

`See all 22 articles` — putting the count in the disclosure label lets the user judge whether expanding is worth it. Zendesk default, but effective.

The negative finding is **bilingual CTA doubling**: `Read more` and `قراءة المزيد` both render in the blog block **on the English page**, and `View all` and `مشاهدة الكل` both render side by side. The Arabic page has the same defect in reverse (`Our blog` heading stays in English). A sighted user sees a duplicated button; a screen-reader user hears both, in two languages, for one destination. This affects every blog card on both homepages.

## T4 Onboarding & getting-started

No numbered how-it-works on the marketing pages. Onboarding is delivered as **three-icon benefit triptychs** and as **step sequences inside FAQ answers**.

**Rides triptych — three stages of one trip** `[observed]`:

1. `Choose your ride` — "Select from a wide range of options and get your ride within minutes, or schedule one for later."
2. `Track your ride` — "Track your ride in real time from the moment a Captain is assigned until you arrive at your destination."
3. `Pay securely` — "Card, Careem Pay, Apple Pay or cash; you can pay securely on Careem."

Three imperative verb phrases, each `<verb> your ride` for the first two then breaking pattern for `Pay securely`. Step 2 defines the tracking window precisely — "from the moment a Captain is assigned until you arrive" — which is the kind of boundary statement that pre-empts "why can't I see my driver yet". Step 3 lists four payment methods in a semicolon construction, with `cash` last.

**Careem Plus onboarding is three images with no text** `[observed]` — the alt attributes are the only content: `01_Tap_on_careem_plus`, `02_Confirm_your_payment`, `03_You_re_are_now_subscribed`. The step copy exists **only in image filenames**. Step 3's filename contains a grammatical error (`You_re_are_now_subscribed`) which is presumably reproduced in the image. A three-step onboarding sequence with zero text in the DOM.

**The real onboarding content is inside Pay FAQ answers** `[documented]` — nine-step and eight-step numbered sequences quoting literal in-app labels:

> `Send Abroad`: 1. Select 'Pay' from the app homepage. 2. Select 'Send Abroad'. 3. Enter the amount you want to send in ⃎ (or in the recipient's currency) and choose the destination country 4. Click on 'Continue' 5. If it's a new recipient click on 'Add' on the top right corner … 9. Tap 'Pay' to complete the transfer

> `Identity verification`: 1. Tap 'Pay' on the app home screen. 2. Select 'Verify now' under 'Identity verification needed'. 3. Grant camera access and tap 'Start your verification'. 4. Take a clear photo of the front and back of your Emirates ID. 5. Tap 'Start Camera' for your selfie video and follow the on-screen shapes and prompts. 6. Wait for the confirmation message. We'll keep your data safe and secure.

The verification sequence is the richer artefact: it quotes **five distinct in-app strings** (`Verify now`, `Identity verification needed`, `Start your verification`, `Start Camera`, and the implicit confirmation message), names the physical documents, describes the liveness check in user terms ("follow the on-screen shapes and prompts"), and closes with a reassurance sentence rather than a step. Step 6 is not an instruction — it is `Wait for…` plus a promise, which is the correct copy at the one point the user has nothing to do.

It also carries a genuinely good closing line: "If you send money now, we'll line up the transaction and send it automatically once you're verified." The product does not block the user at the gate; it queues them through it, and says so.

The verb usage across the sequence is inconsistent — `Select`, `Tap`, `Click on`, `Grant`, `Take`, `Fill in`, `Enter` — four of which (`Select`/`Tap`/`Click on`) name the same gesture. On a touch app, `Click on` is wrong three times.

**Captain onboarding** `[documented]` via help titles: `What are the documents needed to apply?` · `How can I apply to become a Captain?` · `What are the steps to apply?` · `How to attend a training session?`. Four articles in an `Application process` section. The marketing answer lists the documents inline: "profile picture, id card, driving license, and car registration document" — four items, one of them lower-cased (`id card`) against three that are not.

## T5 Form & field labels

`[documented]` — recoverable from FAQ answers, which quote in-app labels more heavily than any other product in this cluster:

| Label (verbatim) | Context |
|---|---|
| `'Pay'` | App homepage entry and final confirm button — **the same label on two different controls in one flow** |
| `'Send Abroad'` | Service selector |
| `'Continue'` | Amount step |
| `'Add'` | Add-recipient control, "on the top right corner" |
| `'Verify now'` | Verification entry |
| `'Identity verification needed'` | The banner the control sits under |
| `'Start your verification'` | Verification start |
| `'Start Camera'` | Selfie step |
| `'See recipient details'` | Recipient overflow menu |
| `'Edit/Pencil' icon` | Recipient edit, "top right corner" |
| `'Save'` | Recipient edit confirm |
| `'three dots'` | Overflow menu, described rather than named |
| `Activities` | Bottom-menu tab (Food FAQ: "Select 'Activities' in the bottom menu of the app") |
| `Food` | Filter within Activities |
| `Help` | "select 'Help' in the top right corner" |
| `Cards` | Profile section — "go to your profile and select 'add new' under the Cards section" |
| `add new` | Card-add control, lower-cased |
| `Careem's Choice tag` | Product badge on grocery items |

**Fields named without their labels quoted:** "the recipient's bank details or account number, full name, and nationality" (add-recipient form). `nationality` as a required remittance field is a market-specific compliance artefact worth noting.

**The `'Pay'` collision is the finding.** The user taps `Pay` to enter the service, then taps `Pay` to execute the transfer. A nav label and a destructive-commit label share a string. In a remittance flow — irreversible, cross-border, money leaving the country — that is the one place a distinct confirm verb earns its keep.

**Currency rendered as a glyph in body copy** `[observed]`: "Enter the amount you want to send in ⃎". U+20CE, the UAE dirham sign, shipped inside an English help answer where `AED` is used everywhere else on the same site. A symbol many fonts will not render.

## T6 Status & state language

`[documented]` from help IA, and the section names themselves are the state model.

**The Rides help IA is a trip lifecycle, stated as four gerund sections in chronological order** `[observed]`:

`Requesting a ride` → `Cancelling a ride` → `Taking a ride` → `After a ride`

That is the cleanest lifecycle IA in the TRAV cluster. Note where `Cancelling` sits: **second, before `Taking a ride`**, not filed under problems at the end. Careem has placed the abandon path inside the normal sequence, at the point in time it actually occurs. Most help centres bury cancellation in a "Problems" bucket; Careem treats it as a stage of the journey.

**Named states and state concepts** `[observed]`:
- `scheduled` vs `on-demand` — given a dedicated article, `What is the difference between scheduled and on-demand bookings?`
- `Estimated time for Captain to arrive` — ETA named from the Captain's side, not the rider's
- `How long should my Captain wait for me?` — **the waiting obligation is documented as a question the rider asks about the Captain**, which is the reverse of the usual framing and makes the no-show rule legible before it bites
- `ongoing/past rides` — the two-state history model, in one article title (`How do I view my ongoing/past rides?`)
- `Peak pricing` — the surge concept, named neutrally
- `Rides pre-authorisation (Card verification before a ride)` — a named payment state **with a parenthetical gloss in the title itself**
- `temporary authorisation hold` — its own help section and article
- `Outstanding payments` — its own section and article, appearing in both the `Rides` and `Pay` categories
- `How does an account get blocked or suspended?` — two adverse account states named in one title, phrased as a mechanism question rather than an accusation

**Wallet and transfer states, Pay** `[observed]`:
- `Careem Pay credit` — a distinct balance concept with its own article (`What is Careem Pay credit?`)
- `wallet balance` — the other balance concept; three separate top-up routes are documented as three articles: `Adding money to your wallet using your card` / `using a voucher` / `using cash`
- `verified` / `Identity verification needed` — the KYC gate, with three articles: `How to verify my identity?`, `How long does it take to be verified?`, `What are the limits after my identity is verified?`
- `limits` — a post-verification state, documented twice (in `Identity verification ( UAE )` and again in `Wallet Usage`, **the same article title in two sections**)

**Transfer timing is the most precisely specified state copy in the entire TRAV cluster** `[observed]`. The Pay FAQ answer to "How long does it take for the recipient to receive the money?" gives a baseline and then **five named exception groups by corridor**:

> Most transfers are verified within 15 minutes, and the recipient usually receives the money instantly after that. We operate 24/7, including weekends and holidays…
> **Egypt:** within 24 hours; Friday/Saturday sends complete the next business day
> **Pakistan, Philippines, USA, Australia, Saudi Arabia:** within 24 hours; Friday/Saturday sends complete the next business day
> **UK and Europe:** within 24 hours, some up to 3 working days "due to mandatory compliance checks from both sender and receiving institutions"
> **Bangladesh, Turkey:** within 24 hours, some up to 2 working days, same reason
> **Canada:** within 1 working day, some up to 3 working days, same reason

Plus a general carve-out: "First-time transfers or transfers to some accounts may take up to 24 hours or the next working day."

This is a model answer. It leads with the typical case, names the weekend rule (which in a Gulf context is non-obvious to migrant senders), then enumerates corridors by name, then **attributes the delay to a third party** ("compliance checks from both sender and receiving institutions") rather than absorbing blame or leaving it unexplained. The corridors listed map exactly onto the UAE's migrant-worker remittance population. Content designed for the actual user, not for the average user.

Note the small inconsistency: `24 hours` and `working day` and `business day` are all used within the same answer, and `1 working day` sits against `24 hours` as if they were different.

## T7 Error, failure & recovery

`[documented]`, and thinner than Gojek's but better structured.

**The Food missing-item answer is the most navigationally precise recovery copy in the harvest** `[observed]`:

> Q: `What happens if my food doesn't arrive or if there's a missing item?`
> A: "In the rare event that this has happened, please contact Careem through the app. Select 'Activities' in the bottom menu of the app, then 'Food', and select your most recent order. Then select 'Help' in the top right corner and call the Help centre. Our awesome care agents will assist you immediately."

Four navigation steps with literal labels and screen positions, then the escalation. Two things to flag. `In the rare event that this has happened` is a frequency claim inserted into a recovery answer — it minimises before it helps, and a user reading it has just experienced the thing. And `Our awesome care agents` is the second appearance of `awesome` (the first is in the purpose statement); `care agents` is Careem's term for support staff, derived from `Customer Care`.

**Quik's failure answer is the opposite approach — no navigation, just the outcome** `[observed]`:

> Q: `What happens if my order doesn't arrive or if there's a missing item?`
> A: "You'll get an instant refund. Our 100% Quality Guarantee means we check every item before it's delivered to you. If any item is spoiled, damaged or missing from your order, you'll get your money back."

> Q: `How do I return an item or report an issue with my order?`
> A: "…tap on your order and tell us why you weren't happy with your item. You'll then get your money back, no questions asked."

**Lead with the resolution, not the process.** `You'll get an instant refund` is the first four words. Compare the Food answer, which opens with a frequency hedge and four navigation steps before any mention of outcome. Two answers to structurally identical questions, on two pages of one site, written to opposite principles. Quik's is better, and the difference is instructive: the verticals with a guarantee can lead with it; the verticals without one lead with process.

`no questions asked` is a strong, checkable promise. `100% Quality Guarantee` is capitalised as a proper noun and defined inline at both appearances.

**Rides failure and safety titles** `[observed]`:
- `What if I get into an accident during my ride?` — `What if` construction, present tense
- `How do I report a safety concern?`
- `Reporting lost item`
- `I did not receive OTP during sign up` — the only first-person title in the Careem help corpus
- `I was charged for an unknown transaction`
- `I got charged but mobile balance not received/bill not paid` — the compound-failure shape, telegraphic
- `How can I view the response to my complaint?` — a **meta-article about the complaint process itself**, which is unusual and good: the user who has already complained gets a documented route back to the answer
- `Payment methods` and `Are there any additional charges for this service?` under Pay Bills

`How can I view the response to my complaint?` is the one to steal. Every support system generates replies; almost none document where the reply appears.

**Cash-payment policy has its own article** `[observed]`: `Cash payments and policy`. In a market with substantial cash usage, cash is not a legacy method but a policy surface.

**No cancellation fee wording was found.** `How can I cancel a ride?` and `How long should my Captain wait for me?` exist as titles; the fee schedule is not stated on any harvested page. Recorded as `[absent]` — not as "no fee".

**Careem Plus cancellation is stated plainly on the marketing page** `[observed]`:

> "When you cancel your subscription you will still have access to all your benefits and your subscription will not be auto renewed at the end of your subscription."

Two facts in one sentence: benefits persist to term end, and auto-renew stops. No refund is mentioned either way, which is a meaningful silence in a subscription-cancellation answer. Note the repetition of `subscription` three times in 27 words.

## T8 Empty states

`[absent]` — none reachable on public surfaces.

## T9 Notifications & system messages

`[documented]`:
- `Careem Notifications` — a dedicated help article under `Contacting Careem`, i.e. the notification model is documented to the user as part of the contact model
- `Call masking after a ride is processed` — a named post-trip communication state, and the article title tells the user the masking has a **time boundary**, which most number-masking copy omits
- `rate alerts` — "Set rate alerts with a few taps, so you always get more value" (Pay). An FX-rate alerting feature, named in lower case, with the benefit stated as the reason to use it.
- `instant sound alert` — (Gojek, not Careem)
- Tax invoice delivery documented: "You will receive your Tax invoice on your email which is registered with Careem App." — note `Tax invoice` mid-sentence capitalisation and `Careem App` as a compound proper noun
- `We'll keep your data safe and secure.` — the closing line of the verification sequence, functioning as a reassurance message rather than an instruction
- `Priority support from our top agents` — a Careem Plus benefit; the support queue is a subscription tier

`Priority support` as a paid benefit is worth flagging for the corpus owner: it makes support responsiveness a monetised variable and requires careful copy to avoid implying that unpaid support is deprioritised. Careem's phrasing — `from our top agents` — does exactly that by implication.

## T10 Disclosures, legal & compliance

**The Central Bank of the UAE is named twice, both times inside a benefit sentence** `[observed]`:

> "Your money, cards and data are protected with our advanced security – approved by the Central Bank of the UAE."
> "Careem Pay provides international money transfers in partnership with Lulu Exchange. This service is fully authorized and regulated by the Central Bank of the UAE."

The second is the more careful one: it names the **partner** (`Lulu Exchange`) before the regulator, which correctly signals that Careem is not itself the licensed remitter. Naming the third-party licensee rather than eliding it is the honest construction, and it is the same disclosure problem Wise solves with its sponsor-bank chain.

Note `authorized` (US spelling) in the second quote against `organisation`, `favourite`, `personalised`, `Centre` elsewhere — a spelling seam inside the regulated copy.

**KYC requirements stated as a bulleted document list in a public FAQ** `[observed]`:

> "To access this service, you must complete a mandatory identity verification. Please have the following documents ready: Original Emirates ID / Valid/Updated UAE Visa"

`Original` and `Valid/Updated` are load-bearing qualifiers — they pre-empt the two most common rejection causes (photocopy, expired visa) before the user starts. Stating the failure conditions as adjectives in the requirements list is cheaper and better than a rejection error message.

**Geographic exclusivity stated as a bare note** `[observed]`: "This service is currently exclusive to the UAE." `currently` is doing roadmap work.

**Fee disclosures** `[observed]`:
- "There are no charges applied to pay bill from your Careem account" (ungrammatical, missing article)
- "Enjoy zero fees and the comfort of sending money with just a few taps"
- "Make faster, cheaper and secure transfers to 30+ countries with Careem Pay. Save 50% compared to banks."
- `Zero fees & member rates` — Careem Plus benefit, "on global transfers with Careem Pay"

`Save 50% compared to banks` is an unbounded comparative claim with **no qualifier, no footnote and no methodology** anywhere on the page. Against the Wise benchmark (claim → bound → personalise), this is the weakest disclosure in the harvest: a specific percentage against an unnamed comparator with no route to the user's own figure. Recorded as a negative example.

The blog carries a related claim — "FX rates cheaper than Google for first-time senders to India or Pakistan – exclusive to Careem Plus members" — which at least bounds by user segment, corridor and tier.

**Careem Plus price stated inline with the benefit** `[observed]`: "No delivery fee on your food orders, ever. Plus, exclusive discounts and so much more only at AED 19/ month." Note the space in `AED 19/ month`.

**Third Party Code of Conduct and Code of Conduct** are both linked in the footer as PDFs, the latter year-stamped (`careem-code-of-conduct-2026.pdf`). Supplier-facing governance surfaced in the consumer footer.

**GDPR route documented** `[observed]`: `How do I submit a Subject Access Request (SAR GDPR)?` — a help article, filed under `Contacting Careem` rather than under a legal section. The acronym is expanded in the title and then re-abbreviated, producing the slightly odd `(SAR GDPR)`.

**Ride policy as a named document** `[observed]`: `Careem's in-ride policies` — a help article under `About Rides`. In-ride conduct is documented as policy in the product-orientation section, not in a separate community-guidelines surface. Careem has no equivalent of Bolt's `Community Guidelines` page.

## T11 Help-centre architecture

Three levels: **category** → **named section** → **article list**, with `See all N articles` overflow past six.

**`Rides` category — nine sections** `[observed]`:

1. `About Rides`
2. `Sign up and manage account`
3. `Biometric Authentication`
4. `Payments options and billing`
5. `Requesting a ride`
6. `Cancelling a ride`
7. `Taking a ride`
8. `After a ride`
9. `Careem Rides Safety`
10. `Contacting Careem`

Sections 5–8 are the trip lifecycle in order (see T6). Sections 1–4 are pre-trip setup. Sections 9–10 are escape hatches. The overall shape — *orient, set up, do the thing in stages, get help* — is legible without reading a single article title, which is the test of a good category tree.

Two wobbles: `Payments options and billing` is ungrammatical (`Payments options`), and `Biometric Authentication` is title-cased where every other section is sentence-cased — and it is a single-article section, which suggests it was promoted from inside `Sign up and manage account` and never reintegrated.

**`Pay` category — eight sections** `[observed]`: `Debit and credit cards` · `Temporary authorisation hold` · `Outstanding payments` · `Add credit` · `Identity verification ( UAE )` · `Pay Bills` · `Send Abroad` · `Wallet Usage`

Three of these are **single-article sections** (`Temporary authorisation hold`, `Outstanding payments`, `Wallet Usage`) — a section per concept, even where the concept needs one page. That is a deliberate choice: it makes the concept name visible in the category page's scan, which for an opaque term like `temporary authorisation hold` is the whole point. The user who has just seen an unexpected pending charge can find the term without knowing it.

`Identity verification ( UAE )` ships with **spaces inside the parentheses** — a live typographic defect in a category-level label. And `What are the limits after my identity is verified?` appears in both `Identity verification ( UAE )` and `Wallet Usage` — the same article title, two sections, two different article IDs, i.e. a genuine duplicate rather than a cross-link.

**`Careem Captain` category — two sections only** `[observed]`: `General FAQs (Benefits and eligibility)` · `Application process`. Fourteen articles total for the entire supply side. Compare `Rides` (~40) and `Pay` (~45). The Captain help centre is a recruitment funnel, not an operational support surface — everything after `How to attend a training session?` is absent, which strongly implies working Captains are supported through a separate authenticated channel.

`General FAQs (Benefits and eligibility)` is the only section name in the estate that uses the abbreviation `FAQs` as a noun and then parenthesises its actual scope — a label that needed a subtitle and got one in brackets.

**Article-title grammar — five shapes:**

| Shape | Example | Where |
|---|---|---|
| `How do I …?` | `How do I contact my Captain?` | Dominant |
| `How can I …?` | `How can I cancel a ride?` | Equally frequent — **two shapes for one speech act** |
| `What is/are …?` | `What are Rides?`, `What is a temporary authorisation hold?` | Concept articles |
| Gerund/noun | `Reporting lost item`, `Rating my Captain`, `Downloading Careem app` | Task articles |
| `Why …?` / `What if …?` | `Why drive with Careem?`, `What if I get into an accident during my ride?` | Rationale and contingency |

The `How do I` / `How can I` split is not principled — `How do I contact my Captain?` and `How can I share my ride details?` sit in adjacent sections. `Reporting lost item` is missing an article (`a lost item`). `Downloading Careem app` likewise.

**`What are Rides?`** is a notable article to have written at all: the flagship service is opaque enough in its own naming system to need a definition article. That is the cost of the plain-noun strategy (T13) surfacing in the help IA.

**Six-language switcher on every help page** `[observed]`: `English (United States)` · `العربية` · `Français` · `Русский` · `Türkçe` · `اردو`

Arabic, French, Russian, Turkish and Urdu. The selection maps onto MENA's actual language geography — French for the Maghreb (Morocco is a named market), Turkish for Turkey, **Urdu and Russian for migrant worker populations in the Gulf**. Urdu in particular is a deliberate inclusion: it serves a population that is large, economically central and almost never localised for. Note the locale label is `English (United States)` on a UAE-first product.

**Arabic help category names diverge from the English in three instructive ways** `[observed]`:

| English | Arabic | Note |
|---|---|---|
| `Rides` | `سيارة` [*car*] | **Narrowed** — "car", not "rides" |
| `Hala Taxi` | `هلا تاكسى` | Transliterated |
| `Wusool` | `برنامج دعم نقل المرأة العاملة وصول` | **Expanded** — [*"Working Women's Transport Support Programme — Wusool"*] |
| `School rides` | `باقة رحلات المدارس` [*school trips package*] | Expanded with `باقة` (package) |
| `Pay` | `Pay مدفوعات` | **Mixed script** |
| `Food` | `مطاعم` [*restaurants*] | **Shifted** — venue, not food |
| `Quik & Shops` | `بقالة Quik والسوبر ماركت` | **Mixed script**, and restructured |
| `Bike - UAE` / `Bike - KSA` | `الدراجة` [*the bicycle*] | **Two categories collapsed into one** |
| `Careem Captain` | `كابتن كريم` | Transliterated |

The `Wusool` line is the finding. English ships a bare transliterated Arabic word — `Wusool` — with **no gloss anywhere**, as a top-level help category. Arabic ships the full programme name and *then* the word. An English-reading user in Saudi Arabia cannot tell what `Wusool` is from the category list; an Arabic-reading user can. **The English localisation has stripped out the explanation that the source language provides.** That is the inverse of the usual localisation failure and worth recording as a pattern: when a source-language term travels untranslated, the target language loses the gloss the source carried implicitly.

## T12 FAQs

Four blocks harvested, all accordion, all server-rendered.

**Rides — `Top Questions`, 4 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do I book a ride? |
| 2 | How do I become a Captain? |
| 3 | How do I contact Customer Care? |
| 4 | Where are our services available? |

Four questions and **one of them is a supply-side question on a consumer page** (Q2). Q4 uses the first-person plural (`our services`) in a question the *user* is supposed to be asking — a company-voice question in a user-voice block. Q1's answer bundles signup into the booking answer ("Sign up with your name and mobile number, and enter a strong password") and Q4's answer is the coverage statement: "You can book a Careem ride 24/7, in 80 cities across 9 countries: UAE, KSA, Egypt, Pakistan, Jordan, Iraq, Kuwait, Morocco and Bahrain." Nine countries enumerated — the clearest footprint statement on the site, buried in an FAQ answer.

**Pay — `Top questions`, 10 visible + `Show more`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can I transfer my wallet balance to my bank account? |
| 2 | Can I send or request money from someone who does not have the Careem app? |
| 3 | Are there additional charges for paying bills on Careem? |
| 4 | Is Careem licensed for international transfers? |
| 5 | How to use this service? |
| 6 | How do I add a new recipient? |
| 7 | How do I edit recipients? |
| 8 | How long does it take for the recipient to receive the money? |
| 9 | How is identity verified? |
| 10 | Where can I find my Tax Invoice? |

The best-ordered FAQ block in the TRAV cluster: cash-out → network effects → fees → **licensing** → how → recipients → timing → KYC → receipt. Q4 (`Is Careem licensed for international transfers?`) at position four, above the how-to, is the right call for a remittance product — trust before mechanics.

Q2's answer handles the off-network case well: "they'll receive a link to download it to complete the transaction. If they choose not to download the app, no money will be deducted from your account." It names the failure branch and reassures about the money in the same breath.

Note `Top Questions` (Rides, Captains, Food) vs `Top questions` (Pay, Quik, Careem Plus) — **the block heading itself is capitalised two ways across six pages.**

**Food — `Top questions`, 3** `[observed]`: `How long will my food order take?` · `How can I change my payment method?` · `What happens if my food doesn't arrive or if there's a missing item?`

Three questions: duration, payment, failure. Minimal and correctly prioritised.

**Quik — `Top questions`, 4** `[observed]`: `What happens if my order doesn't arrive or if there's a missing item?` · `How do I return an item or report an issue with my order?` · `How long will my order take to be delivered?` · `How do I save on groceries?`

**The failure question is at position one.** On a grocery page, before speed and before savings, Careem asks what happens when the order is wrong — and answers with the guarantee. Compare Food, where the identical question is at position three. Quik's ordering is the stronger one, and it is available because Quik has a guarantee to lead with.

**Careem Plus — `Top Questions`, 3** `[observed]`: `What is Careem Plus?` · `Can I use my Careem Plus benefits with other promos and discounts?` · `What happens when I cancel my Careem Plus subscription?`

Define → stack → exit. Three questions covering the full subscription lifecycle, with the cancellation question included rather than suppressed. Q2's answer contains a real constraint — benefits stack "within food and groceries" only — which bounds the promise where it matters.

**Captains — `Top Questions`, 5** `[observed]`: `How do I become a Captain?` · `Which documents are required to become a Careem Captain?` · `Do I need a car to start driving with Careem?` · `How can I maximise my earnings?` · `How does Careem pay me?`

Q5's answer is two words of substance: "Careem pays on a daily and weekly basis." No amount, no method, no cut-off. The most consequential question in a gig-supply funnel gets the shortest answer on the page.

## T13 Terminology & glossary — PRIORITY

### The naming grammar

**The rule: don't coin. Use the ordinary noun, and let the wink logo carry the brand.**

Careem is the counter-example in this cluster. Where Grab compounds with a noun (`GrabFood`) and Gojek compounds with a verb (`GoFood`), **Careem does not compound at all**. The service is called `Food`. The grocery service is called `Supermarkets`. The parcel service is called `Box`. The flower service is called `Flowers`.

Only **two** consumer-facing services carry a coined or brand-bearing name:
- `Quik` — a deliberate respelling of "quick", the only invented word in the catalogue
- `Careem Pay` — and even this is the plain noun `Pay` in the nav, expanding to `Careem Pay` only on the product page and in the wallet's regulated contexts

This has three consequences, all visible in the harvest:

1. **The nav needs no scope sentences.** `Food`, `Pharmacy`, `Flowers` explain themselves. Grab needs a one-liner under `GrabCoins`; Careem needs nothing under `Flowers`. The four-verb frame plus a plain noun is a complete label.
2. **The brand disappears from the text layer.** The wink logo is the only branding at the point of service mention, which means the *accessible name* of every service is unbranded and, as shipped, broken (`logoRides`, `logoQuik` — see T14).
3. **Genuinely opaque services get no help from their name.** `Box` is the clearest case: a plain noun that tells the user nothing about what it does. The help centre has had to write `What are Rides?` — a definition article for the flagship product — which is the plain-noun strategy's bill coming due.

### Verbatim service-name inventory (observed only)

**Go** `[observed]`: `Rides` · `Taxi` · `Bike` · `CarRental` · `SchoolRides` · `Hala Taxi` · `Wusool`
**Eat** `[observed]`: `Food` · `DineOut` · `Careem Food`
**Get** `[observed]`: `Quik` · `Quik Electronics` · `Supermarkets` · `Box` · `Home Services` · `Pharmacy` · `Flowers`
**Pay** `[observed]`: `Pay` · `Careem Pay` · `Donations` · `Send money` · `Send Abroad` · `Send locally` · `Pay bills` · `Careem Pay credit`
**Commercial constructs** `[observed]`: `Careem Plus` · `Careem for Business` · `B2B delivery` · `DineOut partner` · `Restaurant delivery`
**Ride tiers** `[observed]`: `Comfort` · `Executive` · `Max` · `Kids` · `Premium` (used as an umbrella: "Use our Premium rides", "Take our Premium Max rides")
**Quality and loyalty marks** `[observed]`: `Careem's Choice` · `100% Quality Guarantee` · `Captain Club`
**People** `[observed]`: `Captain` · `Captains` · `care agents` · `Customer Care`

### Where the naming system breaks down — four failure modes

**1. Compounding is applied inconsistently — three formats in one cluster.** `[observed]`

Inside the `Go` cluster alone: `CarRental` (closed-up camel case), `SchoolRides` (closed-up camel case), `Taxi` (single word), `Bike` (single word), `Rides` (single word). Inside `Get`: `Quik Electronics` (spaced), `Home Services` (spaced). Inside `Pay`: `Send money` (spaced, **sentence case** — lower-case `m`).

So the estate ships `CarRental`, `Home Services` and `Send money` as three different treatments of a two-word service name: camel-cased closed, title-cased spaced, sentence-cased spaced. And the help centre renders one of them differently again — `SchoolRides` (marketing) becomes `School rides` (help).

**2. Ride tiers overlap with the umbrella.** `[observed]` The four tiers on the Rides page are `Comfort`, `Executive`, `Max`, `Kids`. But the body copy calls `Comfort` "our Premium rides" and `Max` "our Premium Max rides" — introducing a fifth term, `Premium`, that is not a tier label but is used as though it modifies two of them. A user comparing `Comfort` and `Executive` is told the cheaper one is Premium.

Note also that `Kids` (tier) and `SchoolRides` (service) are two different products for child transport, at two levels of the IA, with no cross-reference on either page.

**3. `Pay` is overloaded four ways.** `[observed]`
- `Pay` — one of the four top-level IA verbs
- `Pay` — a service within that cluster (i.e. `Pay` contains `Pay`)
- `Careem Pay` — the wallet product's full name
- `'Pay'` — an in-app nav label *and* the final confirm button in the transfer flow (T5)

The recursion (`Pay` → `Pay`) is the structural version of Grab's `GrabPay`/`GrabPay Wallet` problem, and it is worse: Grab's is umbrella-and-instrument, Careem's is category-and-member sharing one string.

**4. Help-centre and marketing catalogues do not agree.** `Hala Taxi` and `Wusool` exist only in help; `Quik Electronics`, `Supermarkets`, `Box`, `Home Services`, `Pharmacy`, `Flowers` and `Donations` exist only in marketing (`Quik & Shops` partially covers three of them). Seventeen marketing services map onto ten help categories with no stated relationship.

### The Arabic naming system

**Three treatments, applied without a rule** `[observed]`:

| Treatment | Examples |
|---|---|
| **Translated** | `سيارة` (Rides→car) · `تاكسي` (Taxi) · `دراجات` (Bike) · `تأجير سيارة` (CarRental) · `رحلات المدارس` (SchoolRides) · `مطاعم` (Food→restaurants) · `خدمات المنزل` (Home Services) · `صيدلية` (Pharmacy) · `زهور` (Flowers) · `تبرعات` (Donations) |
| **Transliterated** | `داين أوت` (DineOut) · `كويك` (Quik) · `سوبر ماركت` (Supermarkets) · `بوكس` (Box) · `كابتن كريم` (Careem Captain) · `هلا تاكسى` (Hala Taxi) |
| **Mixed script** | `Pay مدفوعات` · `Quik إلكترونيات` · `كريم Plus` · `بقالة Quik والسوبر ماركت` |

The mixed-script forms are the artefact worth capturing. `Pay مدفوعات` places a Latin brand token at the **start** of an RTL string — which in rendered RTL text means the Latin word appears at the *right-hand* edge, i.e. first in reading order. `كريم Plus` does the reverse: Arabic `كريم` (Careem) then Latin `Plus`, so the Latin token lands at the left edge, last in reading order. And `Quik إلكترونيات` is `Quik` + *"electronics"* — the coined Latin name held constant while the descriptor translates.

So the retained-Latin token appears at the head of the string in one name and the tail in another, and both are correct BiDi behaviour for their source order. The design consequence is that the brand token's *visual position* is inconsistent across a single nav column.

`بقالة Quik والسوبر ماركت` [*"Quik grocery and the supermarket"*] is a fourth structure again — an Arabic classifier noun (`بقالة`, grocery), then the Latin brand, then a conjunction and a transliterated noun. One label, three scripts-and-strategies.

**Two Arabic services are transliterated where translation was available**: `بوكس` (Box) and `سوبر ماركت` (Supermarkets). Arabic has perfectly ordinary words for both. Transliterating them preserves the English brand sound at the cost of the comprehensibility that the plain-noun strategy exists to deliver — so the Arabic locale gets the *worst* of both systems: no coined-name distinctiveness, and no plain-noun clarity.

### Role and person terminology

| Term | Usage | Note |
|---|---|---|
| `Captain` | **The driver, always, capitalised, without exception** | The single most consistently applied term in the Careem estate |
| `Captains` | Plural, used as a collective identity ("Captains are at the heart of Careem") | |
| `كابتن كريم` / `كباتن كريم` | Arabic singular/plural, transliterated | |
| `Captain Club` | Tiered loyalty programme for drivers | "benefits and rewards to its loyal captains based on which tier they are in" — note **lower-case `captains`** in the sentence defining the capitalised programme |
| `care agents` | Support staff | "Our awesome care agents will assist you immediately" |
| `Customer Care` | The support function | `How do I contact Customer Care?` |
| `Member` / `members` | Careem Plus subscribers | "Most members save AED 300+" |
| `customer` | The demand side | No coined consumer term |

**`Captain` is the benchmark-grade terminology decision in this file.** It appears in marketing, in help-article titles (`Rating my Captain`, `Tipping my Captain`, `How do I contact my Captain?`, `How long should my Captain wait for me?`, `Estimated time for Captain to arrive`), in the help-category name (`Careem Captain`), in the recruitment funnel, in Arabic transliteration, and in the blog. There is **no instance of `driver` in Careem's own consumer voice** across thirteen pages — the word appears only in the phrase "Do I need a car to start driving with Careem?" and in `driving license`, both as verbs.

That is a complete terminology substitution sustained across an entire estate and two languages. Compare Grab (`driver-partner` in marketing, `driver` in prose) and Gojek (`driver-partner` in marketing, `driver` throughout help). Careem is the only one of the three that never slips.

The term also does elevation work that `driver-partner` does not: `Captain` confers rank rather than contractual status. Whether that is better or worse depends on one's view of gig-work euphemism, but as a naming-discipline artefact it is exemplary.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the user throughout; first-person plural for the company ("We'll bring your meal, to you", "We quality-check every item", "We understand that the restaurant industry can be incredibly competitive", "we check every item before it's delivered to you"). The company voice is warm and slightly effusive — `awesome` appears twice, `wonderful Captains` once, `Our awesome care agents` once.

**Register.** Short sentences, heavy use of full stops as rhythm devices (`Super fast delivery.` / `It's safe.` / `Moving money made easy.`). Contractions throughout. Direct address in headline fragments ("Want it now? Get it now.", "Got a restaurant? Grow with us.", "Different cravings? No problem." — the last is Grab's, not Careem's). The question-then-answer micro-structure recurs: `Want it now? Get it now.`, `Got a restaurant? Grow with us.`

**Tone flattens correctly as stakes rise.** `awesome care agents` and `wonderful Captains` on food and rides; the Careem Pay page and the remittance FAQ are entirely colloquialism-free, precise, and full of named institutions and corridor exceptions. The register gradient is real and well-directed.

**One tonal outlier worth flagging** `[observed]`: the Food failure answer opens `In the rare event that this has happened…`. A frequency-minimising clause in front of a user whose dinner did not arrive. Quik's equivalent answer opens `You'll get an instant refund.` The contrast within one estate is instructive.

**Spelling is inconsistent** `[observed]`: British (`organisation`, `favourite`, `personalised`, `authorised`, `maximise`, `Centre`, `apologise`-family) against American (`authorized` in the Lulu Exchange disclosure, `Favorites` in a blog headline, `English (United States)` as the help locale). The regulated remittance copy is the American-spelled patch, which suggests it was drafted separately — possibly by or with the partner.

**Bilingual leakage on both locales** `[observed]`, and it is systematic:
- The **English** homepage blog block renders both `Read more` and `قراءة المزيد`, and both `View all` and `مشاهدة الكل`, for every card
- The **Arabic** homepage renders the blog section heading as `Our blog` in English, and the page `<title>` as `The everything app | Careeem`
- The Arabic page's `og:locale` declares `en_AE`
- The Arabic page `<title>` contains a **typo in the brand name**: `Careeem`, three `e`s. On the Arabic homepage, in the browser tab and in search results.
- The Arabic nav `Pay` cluster contains **two items** (`Pay مدفوعات`, `تبرعات`) where the English contains three — `Send money` / `تحويل الأموال` is **missing from the Arabic navigation entirely**, despite `Send Abroad` being the flagship Careem Pay feature and the corridors served being overwhelmingly Arabic-reading
- The Arabic nav links `بوكس` (Box) to `/ar-AE/delivery/` while the Arabic body links the same service to `/ar-AE/box/` — two destinations for one label on one page

The missing `Send money` in the Arabic nav is the most consequential of these: the remittance product is the one with the deepest content investment (corridor-by-corridor timing, KYC steps, regulator disclosure) and its Arabic navigation entry has been dropped.

**Numbers as trust devices** `[observed]`: `9,500 restaurants` / `over 9,000 restaurants` (**two figures for one fact, on one page**) · `30+ countries` · `15 minutes` · `80 cities across 9 countries` · `1Bn Rides` · `2.5M Captains` · `+70 Cities` · `AED 300+` · `AED 19/ month` · `50%` · `10%` · `30%` · `600 million people` · `five tech sites`.

Note `+70 Cities` (Captains page) against `80 cities` (Rides FAQ) — two city counts, and the Captains page renders the plus sign **before** the number, a convention used nowhere else. `1Bn` and `2.5M` use abbreviations the rest of the estate spells out.

**Accessibility — the defining defect** `[observed]`:

**Every service name in the navigation and in every cross-sell block is prefixed with the literal string `logo` in its accessible name.** The DOM renders `logoRides`, `logoTaxi`, `logoBike`, `logoCarRental`, `logoSchoolRides`, `logoFood`, `logoDineOut`, `logoQuik`, `logoQuik Electronics`, `logoSupermarkets`, `logoBox`, `logoHome Services`, `logoPharmacy`, `logoFlowers`, `logoPay`, `logoDonations`, `logoSend money`.

In the homepage and cross-sell blocks the same elements render as `Careem Wink Logo Rides`, `Careem Wink Logo Quik`, and so on — so a screen-reader user hears `Careem Wink Logo Rides` for every one of seventeen services in every one of four clusters, repeated on every page. The distinguishing word arrives fourth.

And **the product-page `<h1>` is the broken string itself**: the Rides page's main heading is `logoRides`, the Pay page's is `logoPay`, the Quik page's is `logoQuik`. The primary heading of each product page is a concatenation artefact.

This is the accessibility equivalent of Gojek's alt-less logo wall, arrived at from the opposite direction: Gojek ships images with no text; Careem ships text with the image's role string welded to the front of it. Both make the service catalogue hostile to non-visual navigation, and Careem's is arguably worse because it affects the `<h1>` as well.

**Other accessibility observations** `[observed]`:
- `Continue in Careem app / Scan the QR code below to continue through the Careem app.` is repeated **four times consecutively** in the Pay page DOM, and once or twice on other product pages. A QR code is an inherently non-accessible affordance, offered four times, with no alternative route stated.
- Every product page repeats the full four-verb cross-sell block at the foot — so each page ends with 12–17 service links the user has already passed through the nav.
- Image alt text on marketing images is the **CDN filename**: `alt="240529_Food_refresh_webbanner_square_SA_1_5c62d99193_ae1d46fcdf"`, `alt="Get_Fresh_250829_Groceries_Q2_Campaign_Webpage_Section1_468x359_AC_8b239255e0"`, `alt="cfb1_3de6ed9ba7_1f228dd07e_dda5481961"`. Dozens of instances across every page. This is worse than empty alt: a screen reader will read the hash aloud.
- The Careem Plus onboarding steps exist **only** as such filenames (`01_Tap_on_careem_plus_2x…`), so the three-step sequence is both the alt text and the only copy.
- One correct alt observed: `alt="Careem Og Image"` on the OG image, and `alt="right arrow"` on decorative arrows (should be empty, but harmless).
- Arabic pages do not appear to declare a `dir` attribute in the served markup examined; RTL rendering could not be verified from the text extraction alone. **Flagged as unverified, not as a defect.**
- No `Skip to content` link observed on any page.
- Help-centre navigation contains **five empty list items** rendered as bare `-` (T1) — five unlabelled links in a category nav.

**Negative findings, recorded honestly**
- `logo` welded to the front of every service name, including in `<h1>`s
- `Careeem` — brand-name typo in the Arabic page title
- `Send money` absent from the Arabic navigation
- Two Arabic naming systems for the four-verb IA (nav possessives vs footer imperatives), one page apart
- `بوكس` links to two different URLs on one page
- Bilingual CTA doubling on both locales
- `9,500 restaurants` and `over 9,000 restaurants` on one page; `80 cities` and `+70 Cities` across two
- `Save 50% compared to banks` — unbounded comparative, no methodology
- `Identity verification ( UAE )` — spaces inside parentheses in a live category label
- `Payments options and billing` — ungrammatical section name
- `Reporting lost item`, `Downloading Careem app` — missing articles
- Duplicate article (`What are the limits after my identity is verified?`) in two help sections
- `Top Questions` / `Top questions` — heading capitalised two ways across six pages
- Four `Continue in Careem app` QR blocks on one page
- Five empty items in the help-centre category nav
- `Wusool` shipped as an English help category with no gloss, while Arabic provides one
- CDN filenames as alt text throughout
- `'Pay'` as both a nav label and the irreversible-transfer confirm button
- US and UK spelling within the regulated payments copy

---

## Transferable patterns

1. **Four intent verbs beat twenty product names.** `Go anywhere` / `Eat anytime` / `Get anything` / `Pay anyone` organises seventeen services with eight words and needs no scope sentences, because the verb frames what kind of choice follows. Condition: it works only if the services beneath are plain nouns. Pair it with coined names and the frame stops helping.
2. **Let the mark brand, and let the word describe — but then fix the accessible name.** Careem's plain-noun catalogue is only possible because the wink logo is attached at every mention. The strategy is sound and the execution has put the string `logo` into seventeen service names and three `<h1>`s. The lesson is that an icon-carries-the-brand system moves the entire branding burden onto the image layer, which is exactly the layer non-visual users cannot reach.
3. **Put cancellation inside the lifecycle, not in the problems bucket.** `Requesting a ride` → `Cancelling a ride` → `Taking a ride` → `After a ride`. Cancellation happens at a specific point in time; filing it chronologically makes it findable by someone who is *about to* cancel rather than someone who already has.
4. **Enumerate corridors, and attribute the delay.** The remittance timing answer gives a baseline, a weekend rule, five named country groups, and a cause ("mandatory compliance checks from both sender and receiving institutions"). Naming the third party removes the implication that the platform is slow. Directly transferable to any payout, settlement or cross-border timing copy.
5. **Lead the failure answer with the outcome when you have a guarantee; lead with the route when you don't.** `You'll get an instant refund` (Quik) versus four navigation steps (Food). Where a guarantee exists, state it first — the navigation is then optional. Where it doesn't, the route is all you have, and a frequency hedge in front of it makes things worse.
6. **Put the rejection conditions in the requirements list as adjectives.** `Original Emirates ID` / `Valid/Updated UAE Visa` pre-empts the two commonest KYC failures before the user starts, at a cost of two words. Cheaper and kinder than the error message it prevents.
7. **Queue the user through the gate rather than blocking at it.** "If you send money now, we'll line up the transaction and send it automatically once you're verified." Reusable almost verbatim in any flow where a compliance check and a user intent arrive out of order.
8. **One term for the counterparty, everywhere, in every language.** `Captain` across thirteen pages, two languages, marketing and support, with zero slippage into `driver`. Most products declare a term and then leak the industry word in help content. This is the benchmark for how a substituted term should be maintained.
9. **When a source-language term travels untranslated, it loses its gloss.** Arabic says `برنامج دعم نقل المرأة العاملة وصول` — the programme name *and* the word. English says `Wusool`. Any transliterated term promoted into another locale needs the explanation the source carried implicitly, or it becomes an opaque top-level label.

## Caveats & gaps

- **Help-article bodies were not opened.** T6 and T7 are `[documented]` at title and section level only. ~100 titles across three categories were captured; answer structure and in-article tone are unknown.
- **Seven of ten help categories unharvested**: `Hala Taxi`, `Wusool`, `School rides`, `Food`, `Quik & Shops`, `Bike - UAE`, `Bike - KSA`. `Wusool` in particular — a Saudi women's-transport programme — is likely the most content-distinctive surface on the estate and is entirely unread here.
- **No cancellation fee, no-show fee or peak-pricing figure was found.** `Peak pricing`, `How can I cancel a ride?` and `How long should my Captain wait for me?` exist as titles; none was opened. Recorded as `[absent]` and must not be read as "no fee".
- **RTL rendering not verified.** The Arabic content was captured as extracted text. Whether the served markup declares `dir="rtl"`, how the mixed-script strings (`Pay مدفوعات`, `كريم Plus`, `Quik إلكترونيات`) actually render in a BiDi context, and whether the Latin tokens are correctly isolated, could not be determined without a rendered-browser pass. The BiDi *reading-order* analysis in T13 is derived from source order and standard BiDi behaviour, and should be treated as **reasoned, not observed**.
- **Only one Arabic product page was harvested** (the homepage). Whether the Arabic Pay, Rides, Food and Quik pages carry full translations of the corridor-timing and KYC content — the material most needed by Arabic-reading remitters — is unknown and is the highest-value next fetch.
- **Only the UAE market was harvested.** Careem names nine countries (UAE, KSA, Egypt, Pakistan, Jordan, Iraq, Kuwait, Morocco, Bahrain). Saudi (`Wusool`, `Bike - KSA`), Egyptian, Pakistani and Moroccan surfaces are unharvested; the French locale advertised in the help switcher was not opened.
- **Four of six help languages unexamined** (`Français`, `Русский`, `Türkçe`, `اردو`). The Urdu localisation is the one most worth reading for the corpus owner's purposes, since it serves the remittance corridors named in the timing answer.
- **`Box`, `DineOut`, `Taxi`, `Bike`, `CarRental`, `SchoolRides`, `Supermarkets`, `Home Services`, `Pharmacy`, `Flowers`, `Donations`, `Send money` and `Careem for Business` product pages unharvested.** The `Send money` page in particular (`/pay/sendmoney/`) is where the live FX-rate surface sits and would carry the rate-disclosure copy this file lacks.
- **T8 absent** (no empty states reachable); **T5 is `[documented]` only** — every field and control label here is quoted from FAQ prose, not observed in situ.
- Arabic glosses throughout are the harvester's working translations, marked in square brackets. The Arabic strings are quoted verbatim and are the artefact; the glosses are not authoritative, and several (`احصل على`, `انطلق`, `باقة`) carry register and idiom the gloss does not capture.

## Sources

1. https://www.careem.com/ (→ https://www.careem.com/en-AE/)
2. https://www.careem.com/ar-AE/
3. https://www.careem.com/en-AE/ride/
4. https://www.careem.com/en-AE/pay/
5. https://www.careem.com/en-AE/food/
6. https://www.careem.com/en-AE/groceries/
7. https://www.careem.com/en-AE/cplus/
8. https://www.careem.com/en-AE/captains/
9. https://help.careem.com/hc/en-us
10. https://help.careem.com/hc/ar
11. https://help.careem.com/hc/en-us/categories/1500001164901-Rides
12. https://help.careem.com/hc/en-us/categories/360003323854-Pay
13. https://help.careem.com/hc/en-us/categories/360000043928-Careem-Captain
