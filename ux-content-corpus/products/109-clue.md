# 109. Clue

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Cycle tracking (privacy-led), with a large medically-reviewed reproductive-health encyclopedia |
| Primary URL | https://helloclue.com/ |
| Corpus rank | 109 |
| Benchmark strength (source list) | Inclusive reproductive-health language |
| Locale / market observed | en-US (site serves en, pt, es, de, fr; support centre serves 26 languages) |
| Platform observed | Web (marketing, encyclopedia, Zendesk support centre, consumer-health-data policy) |
| Auth state | Unauthenticated public surfaces only. **No cycle, symptom or body data was entered.** |
| Regulatory posture | GDPR as the stated global baseline, sourced to the company's German establishment: "No matter where you are in the world, if you use Clue, your data is protected by the strictest German and European data privacy laws (the GDPR)." Entity: Clue by Biowink GmbH, Berlin. **US state consumer-health-data laws addressed by a dedicated `Consumer Health Data Privacy Policy` with a separate `Supplement … for Nevada Consumers` (45-day response commitment).** A `U.S. Supplemental Notice` is separately published. **FDA:** Clue publishes a help article titled `Is Clue Conceive FDA cleared?` — a regulatory-status question raised as a standing FAQ (answer body not retrieved). Minimum age 13 (`Why am I not allowed to use the Clue app if I'm under 13 years old?`). Subpoena position stated publicly: "If we are subpoenaed by any authority demanding access to your data, we will not comply." No accessibility statement found. |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Partial — **no accessibility statement exists and none was found** (`[absent]`). In-app strings are behind install. The support centre index was captured in full (14 categories, ~200 article titles), giving unusually deep IA and task-phrasing evidence; individual article bodies mostly not opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://helloclue.com/ | Hero, six-benefit block, privacy block, six product modes, plan comparison |
| Clue Plus | https://helloclue.com/clue-plus | Mode cards, "Self discovery without shame" editorial wall, full encyclopedia IA |
| Support centre home | https://support.helloclue.com/hc/en-us | **14 categories, ~200 article titles — the richest IA artefact in this file** |
| Support: How Clue handles data privacy | https://support.helloclue.com/hc/en-us/articles/29048867548061-… | Four-commitment list including the subpoena line |
| Encyclopedia: Track your cycle without a period | https://helloclue.com/articles/how-to-use-clue/track-your-cycle-without-a-period-with-clue | **The inclusive-design artefact of the batch** |
| Encyclopedia: Clue Period Tracking explained | https://helloclue.com/articles/how-to-use-clue/clue-period-tracking-plus-explained | Feature copy, article template, explicit inclusive-language statement |
| Consumer Health Data Privacy Policy | https://helloclue.com/privacy/healthdata | Eight named data categories incl. gender-affirming care; Nevada supplement |

---

## T1 Navigation & IA labels

**Four-group nav, with `Encyclopedia` as a peer of the product** `[observed]`

`Home` · `Products` · `Science` · `Encyclopedia` · `Clue Plus`

`Products` expands to six modes plus `Wearables` and `FAQ`. `Science` contains only two items — `Ask the Experts` and `Scientific Research` — but its presence as a **top-level nav group** is the statement: Clue puts research provenance at the same altitude as the product.

**The six modes are life-states, and one of them is an absence** `[observed]`

`Period Tracking` · `Trying to Conceive` · `Pregnancy` · `Perimenopause` · **`No Period`** · `Clue Plus`

**`No Period` as a navigation label is the single best IA decision in this file.** Two words, plain, in the same list as `Pregnancy` and `Perimenopause` — a mode named for the *lack* of the thing the category is built on. Compare Flo, whose five modes all assume a cycle. The label is reinforced in the product card: `Track without a period` with the subhead `No period? No problem.`

**Encyclopedia IA — seven top categories, ~35 sub-categories** `[observed]`

| Category | Sub-categories |
|---|---|
| `Menstrual Cycle` | `Mind, Mood & Emotions`, `Your Vagina`, `Puberty`, `Skin & Hair`, `Diet & Exercise`, `Bleeding`, `Miscarriage`, `Anatomy`, `Reviews`, `Products`, `Periods`, `Menopause and Perimenopause` |
| `Birth Control` | `Hormones & Your Cycle`, `Hormonal Birth Control`, **`Abortion`**, `Non-Hormonal Birth Control` |
| `Fertility` | `Pregnancy, Birth & Postpartum`, `Trying to Conceive` |
| `Issues & Conditions` | `PMS & PMDD`, `Bleeding Disorders`, `Cramps & Pain`, `Endometriosis`, `COVID-19`, `PCOS` |
| `Sex` | `Pleasure`, `STIs`, `Dating & Partnership` |
| `Life & Culture` | **`LGBTQIA+`**, **`Gender Equality`**, **`Race`**, `Society` |
| `About Clue` | `Press`, `How to Use Clue`, `Events`, `Member Stories` |

Four of these are the finding. **`Miscarriage` is a standing sub-category of `Menstrual Cycle`.** **`Abortion` is a standing sub-category of `Birth Control`.** **`LGBTQIA+`, `Gender Equality` and `Race` are three of the four sub-categories under `Life & Culture`.** And `Your Vagina` — second-person possessive, the anatomical word, as a browsable category name.

Placing `Miscarriage` and `Abortion` in the permanent taxonomy rather than as tags or individual articles means they are **browsable, linkable and expected**. A user who has just had a loss does not have to search a term they may not want to type; it is in the menu.

`Pleasure` as a peer of `STIs` under `Sex` is the same move: the positive category is not an afterthought to the risk category.

**Support centre — 14 categories** `[observed]`

`New to Clue? Your questions, answered.` · `Account Questions` · `Using Clue` · `Clue Plus` · `New Features in Testing` · `Clue Tracking` · `Clue Conceive` · `Clue Pregnancy` · `Clue Perimenopause` · `Clue & Wearables` · `Clue Collaborations` · `Data Privacy, Security & Terms of Service` · `Technical Questions` · `Feedback & Suggestions`

Three structural notes. First, **`New to Clue? Your questions, answered.`** is a full sentence with a question mark and a comma-spliced reassurance, used as a category label — the most conversational category name in this corpus. Its sub-sections are `Read about:`, `Quick guides:`, `Switching apps:` — **all with trailing colons**, so they read as sentence openers rather than headings.

Second, **`New Features in Testing`** is a public help category for beta features (`Chat With Your Data`, `Doctor Report`, `Clue Community`), each with its own AI/privacy explainer. Documenting unreleased features, including their data processing, in the live help centre.

Third, **`Switching apps:`** is an entire section devoted to migrating *from a competitor*, with three articles including `What about the data on my current tracker?` — a help section addressing the anxiety of leaving another product.

**Footer** `[observed]`: `Company` · `App` · `Encyclopedia` · `Information` · `Partnerships`. The `Information` group is the privacy stack: `Legal` (imprint), `Privacy`, **`Consumer Health Data`**, **`U.S. Supplemental Notice`**, `Terms`, `Cookies settings`. Two separate US-specific privacy notices given their own footer links — jurisdiction-specific disclosure treated as first-class navigation.

`Partnerships` → `Employee Benefits`, `Insurance Partners`. B2B routes in the consumer footer.

## T2 Value proposition & headline patterns

**Hero — the inclusion statement is in the hero, not a footnote** `[observed]`

> Headline: `The #1 women-led period and cycle tracker app`
> Subhead: "Understand your body like never before. Science-based, privacy-first.
> **For everyone with a cycle.**"

This is the structural difference from Flo. Clue's headline names **who built it** (`women-led`) rather than who it is for; the audience statement is a separate, final, standalone line: `For everyone with a cycle.` Five words on their own line, after the value props, as the last thing read before the CTA.

The subhead is three fragments in ascending order: capability (`Understand your body like never before`), credentials (`Science-based, privacy-first`), audience (`For everyone with a cycle`). Each a sentence fragment with a full stop.

`women-led` does specific work: it is an **ownership and governance claim**, not an audience claim. That lets Clue be women-led and for-everyone simultaneously without contradiction — a genuinely well-engineered piece of positioning. Reinforced in the closing section header: **`Built by women, for everyone with a cycle`**, which states both halves in one line.

**Six-benefit block — `Get smarter every cycle`** `[observed]`, each item one line:

1. `Track cycle symptoms in seconds`
2. `See how your cycle affects your mood`
3. `Know when your period, PMS and ovulation days are coming`
4. `Anticipate symptoms before they show up`
5. `Know when you're fertile`
6. `Turn gut feelings into evidence`

**#6 is the standout line in the file.** `Turn gut feelings into evidence` names the actual problem — being disbelieved, including by yourself — and positions tracking as the remedy. It is reinforced by a testimonial Clue chose to run: "Tracking my symptoms (with Clue) gave me the confidence to say to myself, 'I do know what I'm talking about, I do know my experiences and I have the data right here." The product's proposition is **epistemic authority over your own body.**

`Anticipate symptoms before they show up` — the benefit is preparation, not prediction accuracy.

**Privacy block headline** `[observed]`: `Your data is safe with us`, followed by the strongest privacy paragraph on any consumer marketing page in this batch:

> "Data privacy is non-negotiable. We have never, and will never, sell your health data or share it with any authority. Your Clue app data is protected by strict EU privacy laws, no matter where you are in the world."

`or share it with any authority` is the clause that distinguishes this from every competitor's "we don't sell your data". Clue's marketing-page privacy promise explicitly includes **government and law enforcement**, not just advertisers.

**Research headline** `[observed]`: `Closing the gap with bleeding-edge science` — a pun (`bleeding-edge`) that is simultaneously the category's subject matter and a technology cliché. Body: "For too long, women's health has been under-researched. We're changing that. In partnership with Oxford, Berkeley, MIT and other leading institutions, our real-world data is advancing women's health research." Named institutions, plus logos for Stanford and the Bill & Melinda Gates Foundation.

**Clue Plus headlines** `[observed]`:
- `Unlock the full potential of Clue`
- `One companion for all changes and choices` — with the subhead "Choose where you're at, we'll meet you there."
- `Backed by science, powered by data, and customized for you` — a tricolon
- **`Self discovery without shame`**

`Self discovery without shame` heads the editorial wall (~30 article cards on abortion, trans pregnancy, breast cancer, bleeding disorders, egg freezing, IUDs, race and sex education). The header is doing argumentative work: it tells the reader why an app's marketing page contains a first-person account of ending a wanted pregnancy.

**`Choose where you're at, we'll meet you there.`** — colloquial (`where you're at`), comma splice, second person. The mode-selection principle as a single spoken sentence.

**Numbers** `[observed]`: `100M+ App downloads` · `4.8` · `over 190 countries` · `0m monthly active users` / `0m monthly reach` / `0+ articles` (the Clue Plus counters render as `0` to a non-JS fetch — a count-up animation with **no server-side fallback value**, so a crawler or screen-reader user sees `0m monthly active users`. Recorded as a defect.)

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Hero | |
| `Start my journey with Clue` | Six-benefit block | **First person** — the user's own voice in the button |
| `Download app` | Free plan card | |
| `Get 25% off` | Plus plan card | Offer, not action |
| `Subscribe` / `Subscribe to Clue` / `Get Clue Plus` | Plus surfaces | Three labels for one action |
| `Create an account` | Free-tier mode cards | Distinct from `Download app` — account vs install |
| `Learn more >` | Every mode card | Bare label with a chevron; repeated ~6× |
| `Redeem Voucher` / `Redeem Clue Plus voucher` | Plus page, footer | |
| `Manage your data in Clue` | Privacy block | **Privacy action promoted to a marketing CTA** |
| `How we handle data privacy >` | Privacy block | |
| `Join the movement` | Research block | Research participation framed as belonging |
| `More about Clue` | Founder block | |
| `Leave us a message` | Support centre foot | Warmer than "Submit a ticket" |
| `Accept all` / `Reject all` / `Manage preferences` | Cookie banner | **Reject is a peer of Accept** |
| `Save settings` | Cookie preferences | |

**Two CTAs are doing unusual work.** `Start my journey with Clue` is first-person — the user clicking reads their own intention rather than an instruction. And `Manage your data in Clue` appears on the **home page** as a primary action inside the privacy block: a data-control route promoted to marketing-CTA status.

**Cookie banner** `[observed]`: `Accept all` and `Reject all` are presented as equals, with `Manage preferences` beneath. The three cookie categories each get a plain-language explanation and a withdrawal route — "You may withdraw your consent to this processing of your data at any time." Essential cookies are `OFF / ON` toggles that state they "cannot be switched off", which is an odd affordance (a toggle that does not toggle) but honest labelling.

**Negative finding:** `Learn more >` appears six times on the Clue Plus page with no differentiating object. The one weak pattern in an otherwise specific CTA set.

## T4 Onboarding & getting-started

**The onboarding surface is a help category named as a sentence** `[observed]`: `New to Clue? Your questions, answered.` with three colon-suffixed sections:

**`Read about:`** — `How Clue handles data privacy` · `What predictions are available in Clue` · `Different Clue modes` · `Using Clue for free` · `Premium features with Clue Plus` · `Clue Plus funded by HSA/FSA`

**Privacy is the first thing a new user is told to read about.** Position 1 of 6, ahead of predictions, modes and pricing. For a cycle tracker, leading onboarding with data handling rather than features is a positioning decision visible in the IA itself.

**`Quick guides:`** — `How to create a Clue account` · **`How to set data privacy settings`** · `How to quickly track a period` · `How to track cycle symptoms and experiences` · `How to personalize tracking with custom tags and notes` · `How to set up reminders` (8 total)

Privacy settings are **step 2 of the quick-start guide**, before tracking a period. Confirmed by the privacy article `[observed]`: "When you first create your Clue account, you will be asked to set your privacy preferences and given detailed information to help you make your decision."

**Consent is collected at onboarding, with explanation, and is changeable** `[observed]`: "Once you're using the app, you can change your privacy settings at any time."

**`Switching apps:`** — `Why should I switch to Clue?` · `My current tracker knows my cycle already. How long would it take Clue to give accurate predictions?` · `What about the data on my current tracker?`

The middle title is a **statement plus a question** — the user's objection voiced before their question. Twelve words of objection, then the ask. This is competitor-migration content written from inside the user's hesitation.

**Mode switching, documented as a five-step path** `[observed]`:
1. Open your Clue app.
2. Go to the More Menu in the top-right corner of the Cycle View.
3. Tap 'Mode: [your current mode]'.
4. Switch to 'Track without a period' using the mode selector.
5. Tap 'Switch mode'.

Named UI objects: `More Menu`, `Cycle View`, `Mode: [current mode]`, `mode selector`, `Switch mode`. Step 3 shows a **templated control label that displays the current state inside the control itself** — `Mode: Period Tracking` rather than a static "Mode" label. Good state-in-label design, documented.

## T5 Form & field labels

`[documented]` — in-app, but Clue's help IA names the data model unusually precisely.

**The core vocabulary distinction: `experiences`, not `symptoms`** `[observed]`

Clue's tracked data class is `cycle-related experiences`. Article titles: `How do I track cycle-related experiences?`, `How to track cycle symptoms and experiences`. The encyclopedia copy uses it consistently: "track recurring experiences", "log your experiences", "your physical and mental experiences", "recurring health experiences".

**This is the most consequential single word choice in the file.** `Symptom` presupposes pathology — something is wrong. `Experience` does not. A user logging high energy, good mood or enjoyable sex is not recording a symptom. Clue's 200+ trackable items include things that are not problems, and the noun accommodates them. Flo says `symptoms and events`; Ada says `findings`; Clue says `experiences`.

**Scale** `[observed]`: "Track 200+ cycle-related experiences, from spotting to sex to your social life" — nearly three times Flo's stated 70+, and the three examples given deliberately span bodily (`spotting`), intimate (`sex`) and non-medical (`social life`).

**`Custom tags`** `[observed]` — user-defined fields, unlimited on Plus: "Custom tags give you the flexibility to track anything and everything that matter to your unique cycle. You can use them to track the names of medications you take, specific moods you may have, or certain experiences that are typical for you (back pain, vitamins, or jet lag, for example)."

`jet lag` as an example. The field system is explicitly open-ended beyond reproductive health.

**Named data fields and views across help titles** `[observed]`: `Cycle View` · `Calendar View` · `Analysis Tab` · `Content Tab` · `custom tags` · `daily notes` · `cycle and period lengths` (manually editable) · `first day of the week` · `measurement units` · `modes`.

`How can I manually edit my cycle and period lengths?` — the user can **override the algorithm's model of their own body**. A meaningful control, and it has a help article.

**Reminders as a named field set** `[observed]`: `What reminders are available in the Clue app?` · `Can I create my own reminder?` · **`How to deactivate the "How are you feeling" reminder?`**

The last one gives a verbatim in-app string: **`How are you feeling`** — the daily prompt. Four words, open, present tense, no question mark in the label. And it has a **dedicated help article for turning it off**, which tells you it is the notification people most want to silence. Documenting the off-switch for your own engagement prompt is a real content decision.

**Tracking frequency is explicitly optional** `[observed]`, as a help title: `Do I need to track every day?` A standing article answering the compliance anxiety the product creates.

**Cycle-start control in Clue Tracking** `[documented]`: `How can I manually start a new cycle?` · `How do I know when to start a new cycle?` · `How can I set my own cycle and cycle length in Clue Tracking Mode?` — in the periodless mode, the user defines the cycle boundary themselves. Examples given in the encyclopedia: "each time you change your contraceptive patch or ring, begin a fresh pack of pills, take a new dose of medication, such as a testosterone shot, or when you adjust your hormone therapy dose", or "a consistent start date, like the 1st of each month."

**`testosterone shot` given as a routine example of a cycle-start trigger, in body copy, unremarked.** Not in a trans-specific section — in the general list of when you might start a new cycle. That is what inclusive design looks like when it is in the default path rather than a special case.

**No field labels, placeholders, validation or hint text observed.** `[absent]`

## T6 Status & state language

`[documented]`:

- **Modes** are the top-level state: `Clue Period Tracking`, `Clue Conceive`, `Clue Pregnancy`, `Clue Perimenopause`, `Clue Tracking` (periodless). Help: `What are modes?`, `Different Clue modes`.
- **Cycle phases**: `period`, `PMS`, `predicted ovulation`, `fertile window`. From the Plus article: "Follow and understand the different stages of your cycle in the Cycle View, from period to PMS to predicted ovulation." Note `predicted ovulation` — the hedge is in the state name itself, not in adjacent copy.
- **Colour and symbol system has its own help article** `[observed]`: `What do the different colors and symbols in the Cycle and Calendar View mean?` and a Conceive-specific variant. Non-textual state encoding documented as a comprehension problem.
- **Prediction reliability is addressed head-on** in help titles `[observed]`: `Why aren't my cycle predictions accurate?` · `Why is Clue showing a longer period than what I tracked?` · **`Clue didn't recognize my second bleeding as a period—why?`** · `Why is my fertile window overlapping my period, or starting right after it?`

That third title is the standout. **`Clue didn't recognize my second bleeding as a period—why?`** — the product named as the subject of a failure verb, the user's exact observation, an em-dash, and a bare `why?` in lower case. It is how a person would actually say it. Compare Wise's `Why does it say my transfer's complete when the money hasn't arrived yet?` — same move: a help article written for the gap between system state and lived reality.

- **Advanced predictions** `[observed]`: "plan around your period for up to 12 menstrual cycles" / `12 Advanced Cycle Predictions`. Bounded to a stated horizon.
- **Data-loss state** `[observed]`: `I can't see my tracked data. Is it lost? What can I do?` — three sentences in one title: observation, fear, request. The fear is named.

## T7 Error, failure & recovery

The strongest help-title set in this batch after Wise.

**First-person and product-blaming titles** `[observed]`:
- `Clue didn't recognize my second bleeding as a period—why?`
- `I can't see my tracked data. Is it lost? What can I do?`
- `I'm trying to create an account but haven't received a verification email. What should I do?`
- `I forgot my password. How can I reset it?`
- `I paid for a subscription, but I still don't have access to Clue Plus. How can I solve it?`
- `I'm not receiving my reminders. What can I do?`
- `I'm unable to use Clue because I see an error screen. What does this mean?`
- `I can't create a report for my doctor. Why?`
- `I stopped using Clue Pregnancy and now my cycle averages are off. What should I do?`
- `I have a Clue account but I don't have a password for logging in on the website. What can I do?`
- `Why am I having trouble logging in?`
- `Why can't I use the app offline?`
- `Why are my synced wearable graphs empty?`

**The dominant shape is `I <problem statement>. <question>?`** — a two-part title where the first part is the user's symptom and the second is their request. Thirteen examples. This is more verbose than Wise's confession titles but serves search better and reads as a support conversation opening.

Note `I stopped using Clue Pregnancy and now my cycle averages are off` — a **post-pregnancy data-integrity article**, covering the downstream statistical consequence of a life event. Very few products document the data aftermath of a mode change.

**Live defect transparency** `[observed]`: `Current app issues we're working on` is a standing help article under `Feedback & Suggestions`, alongside `What's new in the Clue app?`, `Where can I report a bug?` and `Where can I share feedback?`. A public known-issues page inside the help centre.

**Account-recovery framing** `[observed]`: `How can I get my Clue account wiped from my old data without deleting the account?` — a granular request (reset data, keep account) with its own article. The help centre supports partial erasure as a distinct user need.

## T8 Empty states

`[documented]`, one instance and it is a real one: `Why are my synced wearable graphs empty?` — an empty state that has its own explanatory article because the emptiness has a non-obvious cause (sync scope). The existence of the article implies the in-app empty state does not explain itself adequately.

All other empty states `[absent]`.

## T9 Notifications & system messages

`[documented]`:

- Six reminder articles including creation, management, non-delivery, and the named `How are you feeling` daily prompt with its off-switch.
- `Different Clue modes` and mode-switch confirmations named in the five-step path (`Switch mode`).
- **Discreet-notification security features** — see T10; the app icon and widget can be changed to reduce visibility, which is notification design as safety design.
- Marketing-side `Thank you! Your submission has been received!` and `Oops! Something went wrong while submitting the form.` `[observed]` — two Webflow default form messages, rendered on every page in the language-selector region. `Oops!` is the only exclamation-plus-interjection in Clue's copy and it is a **framework default, not an authored string**. Recorded as a defect: boilerplate leaking into a product whose voice is otherwise consistently non-cutesy.

## T10 Disclosures, legal & compliance

### The privacy commitments — four sentences, one of which is unusual

From `How Clue handles data privacy` `[observed]`, presented as a four-bullet list under "Here is what's most important to know":

> - "We will always protect your data, and we are prepared to defend and protect that promise at all costs."
> - "Clue has never and will never disclose any member's private health data to any ad networks."
> - "No matter where you are in the world, if you use Clue, your data is protected by the strictest German and European data privacy laws (the GDPR)."
> - **"If we are subpoenaed by any authority demanding access to your data, we will not comply."**

The fourth is the one no competitor in this batch states. It is a **commitment to refuse legal process**, published in a consumer help article, and it is a different category of promise from Flo's architectural claim ("it won't be possible to satisfy that request"). Flo says *we cannot*; Clue says *we will not*.

Recorded factually, with the content-design observation that the two are not equivalent in enforceability and a reader should notice which one they are being given. Clue's is a stance; Flo's is a constraint. Clue's marketing page carries the same commitment in compressed form: "We have never, and will never, sell your health data or share it with any authority."

The article is signed by a named support agent (`Anna`) with an avatar and a date — **a privacy commitment attributed to a person**, not to "the Clue team".

**Granular consent, stated as a product principle** `[observed]`: "We also believe you should have greater control over what type of data you share. The Clue app gives you this autonomy with **granular privacy settings that are clear, easy to use, and customizable.**" The adjective set (`clear, easy to use, customizable`) is a usability commitment attached to a privacy control.

### Consumer Health Data Privacy Policy — the US-state artefact

A **separate policy** for US consumer-health-data laws, with a **Nevada supplement**. `[observed]`

The eight collected categories, verbatim:
- `Individual health conditions, treatment, diseases, or diagnosis;`
- `Social, psychological, behavioral, and medical interventions;`
- `Use of prescribed medication;`
- `Bodily functions, vital signs, symptoms, or measurements related to health;`
- `Diagnoses or diagnostic testing, treatment, or medication;`
- **`Gender-affirming care information;`**
- `Reproductive or sexual health information;`
- `Health-related data that have been derived or inferred from the above.`

**`Gender-affirming care information` enumerated as a distinct protected category in a privacy policy.** That is an inclusion decision inside a compliance document — the category is named rather than folded into "health information", which means it is separately accounted for.

The final bullet — `derived or inferred` — covers algorithmic inference, the category most policies omit.

**The sharing position is stated tightly** `[observed]`: "Without your consent, we do not Share any categories of Consumer Health Data, except as required to provide you with the services you have requested. With your consent, we may Share any of the categories of Consumer Health Data that we Collect." Recipients: `Vendors`, `Third Parties for research purposes, with your prior and specific consent`, `Third Parties as part of a business transfer`.

`prior and specific consent` for research is the strict formulation. `business transfer` is disclosed — the acquisition scenario named rather than hidden.

**Nevada supplement** `[observed]`: 45-day response commitment, extendable by 45 more "only where doing so is permitted"; change-notification promise ("We will notify you before making any changes… by posting an updated notice on this page, with an updated effective date"); and a caution about third parties collecting health data across other sites.

**Two contact routes given** `[observed]`: a web form (deep-linked to a specific Zendesk ticket form ID) and `trust@helloclue.com`. **The email local-part is `trust`**, not `privacy` or `legal`.

**Defect recorded** `[observed]`: the Nevada supplement's internal cross-reference to the Consumer Health Data Privacy Policy links to a **Google Docs edit URL** (`docs.google.com/document/d/…/edit#heading=…`) rather than to the published page. A drafting artefact shipped to production on a compliance document.

### Data-for-research framing

`[observed]`, marketing: `Using data for good` as a benefit tile, with Stanford / Bill & Melinda Gates Foundation / University of Oxford logos, and "In partnership with Oxford, Berkeley, MIT and other leading institutions, our real-world data is advancing women's health research." CTA: `Join the movement`, routing to `Clue data to help close the diagnosis gap`.

Research participation is framed as **collective benefit with named institutions**, and the consumer-health-data policy independently confirms the consent standard (`prior and specific`). The marketing claim and the policy are consistent, which is worth noting because it often is not.

### Safety features as content

**Clue publishes a `Security Features` help section** `[observed]` — six articles, and they are not about passwords:

- `How can I password protect the Clue app?`
- `How can I hide the Clue app on my iPhone?`
- `How can I hide the Clue app on my Android device?`
- `How can I change the Clue app icon for more privacy? (iOS)`
- `How can I change the Clue widget to discreet view? (iOS)`
- `Our tips for data security`

**Four of six are about concealing the app from other people who have physical access to your phone.** `hide the app`, `change the app icon`, `discreet view`. Clue does not state the threat model in these titles — but the features exist, are documented, and are grouped under Security. This is safety-from-people content, not safety-from-hackers content.

Recorded as an observed product-and-content pattern. **No crisis signposting, domestic-abuse resource or reproductive-coercion guidance was found** on any inspected page `[absent]` — the concealment tooling exists without any accompanying support routing. Same gap as Flo: the fear is engineered for, not spoken to.

### Medical and regulatory boundaries

- **`Is Clue Conceive FDA cleared?`** `[observed]` — a standing help article under `The Science Behind It`. Body not retrieved; **no answer is characterised here.** The existence of the question as published IA is the finding: Clue raises its own US regulatory status as a user question rather than leaving it to be asked.
- **`Can I use Clue Conceive predictions to prevent pregnancy?`** `[observed]` — the inverse-use safety question. A fertility-prediction feature being asked, in its own help centre, whether it works as contraception. Whatever the answer, **publishing the question is the safety-critical act**, because the misuse is foreseeable and dangerous.
- `Do I need to see my healthcare provider before using Clue Conceive?` · `How effective is Clue Conceive?` · `How does Clue Conceive calculate my fertile days?` · `Why do I see so many predicted fertile days?` — the last is an over-prediction explainer, addressing a user who thinks the model is too cautious.
- `How does Clue calculate fetal size and weight?` · `How does Clue calculate the week of my pregnancy?` — calculation transparency as help content.

**No general medical disclaimer was observed** on the home page, Clue Plus page, or the two encyclopedia articles read. `[absent]` Clue's trust argument is carried entirely by **medical-review attribution and citation** (T14) rather than by a limitation statement. Contrast Ada, which does both.

### Subscription and cancellation

**The richest billing help IA in the batch** `[observed]` — five sections under `Clue Plus`:

- `App Subscription`: `How do I subscribe to Clue Plus?` · `How much does Clue Plus cost?` · `How and when will I be charged?` · **`When will my subscription renew, and at what price?`** · `How can I update my payment method…?` · `I paid for a subscription, but I still don't have access…`
- `Web Subscription`: 11 articles including `Why should I subscribe to Clue Plus on helloclue.com, instead of the Clue app?` · `Can I purchase a monthly web subscription?` · `Will my app subscription be reflected in my Clue web account?` · `Where is my payment information stored?`
- `Mobile Provider Subscriptions`: carrier-billing cancellation for **Vodafone Germany** and **O2 Germany**, each with its own article
- `Codes` (8) and `Vouchers` (8): including **`How do I make sure that my voucher doesn't start a subscription?`** and **`Do I need to cancel my subscription that I got with a voucher?`**
- `Health savings accounts (HSA) and flexible spending accounts (FSA)` (5): including `What happens with the HSA/FSA reimbursement if I then cancel my Clue Plus subscription?`

**`When will my subscription renew, and at what price?`** is a compound question pairing timing with the price-change risk — the two things a renewal surprise is made of, in one title.

**`How do I make sure that my voucher doesn't start a subscription?`** is the anti-dark-pattern article: a user worried that a free trial will silently convert, answered as a documented task. Publishing the *prevention* of an unwanted charge is a strong trust signal.

**Cancellation is addressed across at least four contexts** — app store, web, carrier billing, and voucher — each with its own article. `I want to cancel my Wellhub subscription. Can I keep using Clue Plus?` handles the partner-cancellation edge case.

**Pricing figures themselves:** `[absent]` from the marketing pages. The plan cards list features with `Free` / `Premium` labels and a `Get 25% off` offer; the actual price lives behind `How much does Clue Plus cost?` and the checkout. A `25% off` banner (`BANNER25` / `PLANCTA25` discount codes) runs sitewide.

**Partner data-sharing disclosed per partner** `[observed]`: for each of `Wellhub`, `Urban Sports Club` and `Klarna`, the same four-article template — `Why is Clue partnering with X?` · `How does the Clue and X partnership work?` · **`What kind of data can Clue share with X?`** · `If I created an account through X, how is my Clue data kept secure?`

A **repeatable disclosure template applied per commercial partner**, always including the data question, always phrased identically. That is a reusable governance pattern: when you add a partner, you ship four articles, and one of them is what data moves.

Plus `Why and how is Clue collaborating with third parties in the app?` as a general answer.

## T11 Help-centre architecture

Three levels: 14 categories → named sections → articles. ~200 titles.

**Section names use trailing colons in the onboarding category** (`Read about:`, `Quick guides:`, `Switching apps:`) and plain nouns elsewhere (`Tracking`, `Predictions`, `Reminders`, `Common Questions`, `Managing My Data`, `Data Privacy`, `Security Features`, `Terms of Service`, `Getting Set Up`, `How It Works`, `Who Can Use It`, `The Science Behind It`, `After Pregnancy`).

**`The Science Behind It`** as a help section name — under Clue Conceive, holding the efficacy, algorithm and FDA questions. Evidence questions grouped and labelled as science rather than scattered through FAQs.

**`After Pregnancy`** as a section name, holding four articles: `How can I use Clue after pregnancy?` · `I stopped using Clue Pregnancy and now my cycle averages are off…` · **`How can I track a miscarriage or abortion?`** · `How can I log a past pregnancy in the Clue App?`

**Article-title grammar — five shapes** `[observed]`:

| Shape | Example |
|---|---|
| `How do I …?` / `How can I …?` | `How do I track my period?` · `How can I hide the Clue app on my iPhone?` |
| `Why …?` | `Why aren't my cycle predictions accurate?` · `Why do I need a Clue account?` |
| `I <problem>. <question>?` | `I can't see my tracked data. Is it lost? What can I do?` |
| `What is/are …?` | `What are modes?` · `What is Clue Plus?` · `What is Chat With Your Data?` |
| `Can I …?` | `Can I use Clue Conceive predictions to prevent pregnancy?` · `Can I create my own reminder?` |

The `Can I …?` family is the safety-critical one — it is where foreseeable misuse gets named.

**Routing furniture** `[observed]`: `How can we help?` → 14 categories → sections → articles. Each article ends with `Was this article helpful?` (Yes/No, with a visible vote count — "0 out of 0 found this helpful", which exposes low engagement) and `Have more questions?` → `Submit a request`. Support centre foot: `Leave us a message` and the sign-off **`Clue is made with ❤ in Berlin`** — a warmth-and-jurisdiction signal in one line, and the jurisdiction is the privacy argument.

**23 embedded "How to" videos** on the support home `[observed]` — a video layer beneath the article index.

## T12 FAQs

`[absent]` as a marketing-page accordion — Clue routes to the support centre instead (`FAQ` in the Products nav points at Zendesk). The support centre *is* the FAQ, which is why T11 is so rich and T12 is empty.

The nearest marketing-page artefact is the **`Top things to know about …`** bulleted summary that opens every encyclopedia article `[observed]` — three to six bullets stating the article's conclusions before the argument. From the periodless-tracking article:

> - "We've built a solution for people who don't experience menstrual bleeding but who still want to track cyclical changes and recurring health experiences in the Clue app."
> - "You can now start a new 'cycle' without needing to track a period. You're in control of the cycle you want to track and how."
> - "Whether you've had a procedure like a hysterectomy, use hormonal birth control that stops bleeding, or are on hormone therapy post-menopause, Clue Tracking is for you."
> - "Tracking allows you to notice trends in your mood, energy, and other health experiences. These insights can help you make informed choices about your well-being."

**Answer-first article structure**, consistently applied. A reader can take the conclusions and leave.

## T13 Terminology & glossary

| Term | Clue's usage | The alternative it rejected |
|---|---|---|
| `experiences` / `cycle-related experiences` | The tracked data class | `symptoms` (Flo), `findings` (Ada) |
| `everyone with a cycle` | The audience, in the hero | "women" |
| `people with cycles` | Used in founder copy and articles | "women" |
| `women and people with cycles` | Used in encyclopedia body copy | — |
| `women-led` | Governance claim, in the H1 | "female-founded", "for women" |
| `modes` | The five product states | "plans", "profiles" |
| `Clue Tracking` | The periodless mode's product name | "no-period mode" |
| `No Period` | The nav label for the same thing | — |
| `custom tags` | User-defined fields | "labels", "notes" |
| `Cycle View` / `Calendar View` / `Analysis Tab` / `Content Tab` | Named app surfaces | — |
| `Clue Connect` | Cycle-sharing with a chosen person | "partner mode", "share" |
| `personal science` | Named and cited concept: "This approach, often called *personal science*" | "self-tracking" |
| `baseline` | Italicised and glossed: "your cycle *baseline* (what's typical for you)" | "normal", "average" |
| `member` | Used in privacy copy: "any member's private health data" | "user" |
| `Consumer Health Data` | The US-law term, capitalised throughout | "health data" |
| `Gender-affirming care information` | Enumerated privacy category | folded into "health data" |
| `withdrawal bleeding` | Used and explained in an article title's summary | "period on the pill" |
| `Encyclopedia` | The content hub | "blog", "articles", "library" |
| `Doctor Report` | The clinician-facing export | "PDF export", "summary" |
| `Chat With Your Data` | The AI feature, named by what it does to *your* data | "AI assistant", "Clue AI" |

**Three terminology notes.** `personal science` is imported from academic literature and **cited to a paper** (Heyen, 2020) in the article that uses it — a coined-term-with-citation, which is rare. `baseline` is italicised and glossed inline on first use, replacing `normal` with a per-person reference point; the glossing is done *because* `normal` is the loaded word being avoided. And `Chat With Your Data` names an AI feature by its relationship to the user's data rather than by its technology — a naming choice that front-loads the privacy question the feature raises, which the four accompanying help articles then answer (`How is AI technology used in this feature?`, `How can I manage my data processing for this feature?`, `Can I disable this feature?`).

**`member` over `user`** appears specifically in the privacy commitments ("any member's private health data"), where the relational noun does more work than the transactional one.

## T14 Voice, tone & inclusive language

**Priority section. Clue is the batch benchmark for this category and the evidence supports it.**

### How Clue refers to its users

**`everyone with a cycle` is the operative phrase, and it is load-bearing rather than additive.** `[observed]`

| Surface | Phrase |
|---|---|
| Hero, final line | `For everyone with a cycle.` |
| Closing section header | `Built by women, for everyone with a cycle` |
| Founder copy | "give **people with cycles** the tools to understand their own bodies" |
| Clue Plus | "designed to be used by **anyone with a cycle**" |
| Clue Plus | "Clue Plus contains **gender-inclusive language**" — linked to an explainer article |
| Encyclopedia body | "can help **women and people with cycles** in a few ways" |
| Encyclopedia body | "for many **women and people with cycles**, menstruation can mean managing pain" |
| Article card | "**Women and people with cycles** can face barriers to adequate healthcare" |
| H1 | `The #1 **women-led** period and cycle tracker app` |
| Research block | "**women's health** has been under-researched" |
| Testimonial (user's words) | "I urge all **women** to always listen to their bodies" |

**The architecture.** `women-led` is a **provenance** claim (who built it). `women's health` is a **field** claim (the under-researched discipline). `everyone with a cycle` is the **audience** claim. Clue keeps these three roles lexically separate, which is why it can foreground women's leadership and women's health research without narrowing who the product is for. Flo, by contrast, uses `women's health app` as the audience claim and then appends people-who-menstruate — an additive fix on a narrower base.

**`Built by women, for everyone with a cycle`** states both in one line and is the cleanest formulation of the pattern anywhere in this corpus.

The additive form `women and people with cycles` does appear, in encyclopedia body copy. So Clue is not uniformly neutral. But the **default in product and marketing copy is the inclusive form**, and the gendered forms are used where they are factually specific (leadership, research field, a quoted user).

### Inclusion built into the product, not the copy

**This is the stronger finding: Clue's inclusion is structural.** `[observed]`

The `Clue Tracking` / `No Period` mode exists because of who was excluded. The encyclopedia article naming the audience:

> "Clue Tracking is for those who don't have periods but still want to track recurring experiences. It may be right for you if you:
> - Use **hormonal birth control** that suppresses bleeding…
> - Are a **transgender man, woman, or nonbinary person** who does not experience bleeding but wants to track how you feel with hormone therapy
> - Are **post-menopausal and on hormone therapy (HT)**, experiencing cyclical changes
> - No longer have periods due to a procedure like a **hysterectomy or endometrial ablation**
> - Have conditions like **MRKH Syndrome** or other factors affecting your menstrual cycle"

Five populations, named specifically, in one list, with no hierarchy and no "and others". `MRKH Syndrome` — a rare congenital condition — named alongside the common cases.

**A terminology note published in italics inside the article** `[observed]`:

> "*A quick note on the term 'cycle': We use 'cycle' here to refer not only to a typical menstrual cycle but also to hormone-induced cycles that occur without menstruation. This lets us support everyone in tracking patterns unique to their bodies and health needs.*"

**A content designer's definitional decision, shown to the reader, with its rationale.** Clue redefines its own core noun in-line, explains why, and states the inclusion goal. This is the single most transferable artefact in the file: when a product term has to stretch, say so in the product.

The section header for the same argument: **`Embracing all hormonal experiences`**, with the closing paragraph: "whether you're on long-acting hormonal birth control, in post-menopause, managing the effects of hormone therapy, navigating health changes after a procedure, or just simply living without menstruation."

`or just simply living without menstruation` — the fifth item deliberately has no medical cause attached. Not every absence needs an explanation.

**Inclusion as content taxonomy** `[observed]` — the encyclopedia article set visible on the Clue Plus page:
- `What it's like to get your period when you're trans`
- `Why trans men, nonbinary, and genderqueer people use birth control`
- `What it's like to be pregnant as a transmasculine person`
- `Gender dysphoria and your cycle` — "When you get your period but you're not a woman, this can cause discomfort and anxiety"
- `Disabled people have periods, too`
- `People of color talk about their experiences with sex education`
- Help: `Tips for using Clue when you're trans` (linked)

Note the first-person and experiential framing: `What it's like to…` ×2. These are not explainers about a population; they are accounts from inside one.

### Sensitive-topic handling — pregnancy, loss and abortion

**Clue's handling here is the clearest differentiator in the batch.** `[observed]`

- **`How can I track a miscarriage or abortion?`** — a help article, in the `After Pregnancy` section, with both words in the title. The app supports logging both, and says so in the support IA where someone would look.
- **`Abortion` is a permanent encyclopedia sub-category** under Birth Control.
- **`Miscarriage` is a permanent encyclopedia sub-category** under Menstrual Cycle.
- Article titles on the Clue Plus marketing page: `My wanted pregnancies ended in abortion` (by `Danielle Pipher Clement, MSN, WHNP, AGNP`) · `Love in a time of abortion` — "When I chose to end an unplanned pregnancy, I didn't feel loss or grief. Only nausea and overwhelming relief." · `We had to make the choice no one wants to make`
- `How can I log a past pregnancy in the Clue App?`

**Two abortion narratives with opposite emotional outcomes are run on the same page** — one a wanted pregnancy ended, one an unplanned pregnancy ended with relief. Neither is presented as the normative experience. That is deliberate editorial range on the most contested topic in the category.

`We had to make the choice no one wants to make` — the title does not name the choice. Discretion in the title, specificity in the article.

**Fertility** `[observed]`: `Get pregnant faster with personalized predictions` is the boldest outcome claim Clue makes; hedged elsewhere by `evidence-based algorithm` and by the existence of `How effective is Clue Conceive?` and `Why do I see so many predicted fertile days?`. `Trying to conceive?` as a section header — a question, addressed to the reader's state.

**Other sensitive titles** `[observed]`: `Part 1: I was diagnosed with breast cancer at 28` (opening "Oh, shit!" — a quoted reaction, unsanitised) · `I didn't know I had a bleeding disorder` · `I want to have a baby but my partner doesn't` · `6 things I learned from freezing my eggs` · `Watching my mother lose her hair during menopause made both of us stronger` · `The truth about your period poop`.

That last one matters: **Clue will publish `period poop`.** The register accommodates the undignified alongside the grave, which is what "without shame" has to mean if it means anything.

**Crisis signposting: `[absent]`.** No mental-health, self-harm, domestic-abuse or reproductive-coercion resource was found on any inspected page — including on the `Security Features` articles about hiding the app from people with physical access to your phone, and including on the abortion and miscarriage content. Recorded as an observed gap across seven pages. Clue builds concealment tooling and publishes loss narratives without linking to a support service on the surfaces inspected.

### Medical-review attribution — the reusable trust device

**Clue's article byline block is the most complete in this batch** `[observed]`. From `Track your cycle without a period with Clue`:

```
[How to Use Clue]                    ← category, linked
Reading time: 6 min                  ← time cost, before the title
# Track your cycle without a period with Clue
## If you don't have a period but still want to track cyclical changes in your body–this is for you.
by Eve Lepage, MSN, RN               ← author, credentialed, linked to profile
Updated: Nov 22, 2024
Published: Nov 22, 2024              ← both dates, always
Medically reviewed by Sarah Toler, DNP, CNM   ← named reviewer, credentialed, linked
```

And from the Clue Plus article, a **two-reviewer** variant:
```
by Emily Hughes, and Eve Lepage, MSN, RN
Medically reviewed by Lynae Brayboy, MD, FACOG, and Cornelia Hainer, PhD
```

**Seven components:** category · reading time · title · deck · author(s) with post-nominals · published date · updated date · named medical reviewer(s) with post-nominals. Author and reviewer are **separate people with separate links**. Where the author is a non-clinician (`Emily Hughes`), a clinician is paired with them.

**The credential sets observed** — `MSN, RN` · `DNP, CNM` · `MD, FACOG` · `PhD` · `MSN, WHNP, AGNP` · `MA` · `M.S.` — are specific enough that a reader can tell a nurse-midwife from an obstetrician. The reviewer for a clinical article is `MD, FACOG`; for a how-to, `DNP, CNM`. **Reviewer seniority is matched to content risk.**

**Article foot furniture** `[observed]`: numbered references in full academic format (author, title, journal, year, volume, pages), a `Was this article helpful?` smiley/frowny pair, and `You might also like to read` with the same byline block on the recommendation card.

**Contrast within the batch.** Ada attributes to a team (`Ada's Medical Knowledge Team`) — institutional, scalable, anonymous. Flo describes a reviewer-link pattern but the template was not observed here. **Clue names an individual clinician with post-nominals and links to their profile, on every article, plus a separate author.** Personal accountability, and the most legible of the three.

Named people are used elsewhere as authority too: `Clue's Chief Medical Officer, Lynae Brayboy`, `Ida Tin` (co-founder, credited with coining `femtech`), `Rhiannon White` (CEO). The org chart is public and linked.

### Register and craft

**Person.** Second person throughout; first-person plural for the company, and used in adverse and committal copy alike (`We will always protect`, `we will not comply`, `We've built a solution`, `You asked, we listened.`).

**`You asked, we listened.`** `[observed]` — four words as a section header above the periodless-tracking announcement. Credits the feature to user demand.

**Register is plain, warm and unafraid of the direct word.** `Your Vagina` as a category. `period poop` in a title. `"Oh, shit!"` quoted in a deck. No euphemism for menstruation anywhere observed — it is `period`, `bleeding`, `menstruation`, never "that time of the month".

**Contractions** used freely, including in privacy copy (`we're`, `you'll`, `don't`, `It's`).

**Em-dashes and asides** carry the qualifications: "from your first period to perimenopause", "– whatever you choose that to be", "(what's typical for you)".

**`– whatever you choose that to be`** `[observed]`, closing the sentence "guide and inspire you on your journey to self-discovery and reproductive health – whatever you choose that to be." A refusal to define the destination, appended to a sentence that appeared to be defining it.

**Italics** used for definitional asides and coined terms (`*cycle*`, `*baseline*`, `*personal science*`), never for emphasis.

**Bold** used to carry the claim inside testimonials — Clue bolds the part of each user quote that is the argument ("**thanks to your analytics my doctor picked up on some mild PCOS**", "**Designed and run by women who aren't selling your data.**"). Editorial selection made visible.

**No exclamation marks in authored copy.** The only one on the site is the Webflow default `Oops! Something went wrong…` — a framework string, not a Clue string.

**Citation density in consumer copy** `[observed]`: the periodless-tracking article carries four numbered citations in ~900 words of body text, including for claims as soft as "self-monitoring increases awareness of symptom patterns". Academic citation applied to motivational copy.

### Accessibility

**No accessibility statement exists.** `[absent]` Searched the footer (`Legal`, `Privacy`, `Consumer Health Data`, `U.S. Supplemental Notice`, `Terms`, `Cookies settings`), the support centre's 14 categories, and the Company group. Nothing. **This is the clearest negative finding in the file** — a German-established company subject to the European Accessibility Act, publishing no statement, while Flo and Nike both do.

**Observed accessibility conditions:**

- **The site requires JavaScript and says so**: `This app works best with JavaScript enabled.` renders as the first line of every Gatsby-built page. A one-line fallback, which is better than Ada's silent blank page but is a notice rather than a fallback.
- **Alt text is largely empty on marketing pages.** Most images render as `![]()` — no alt, no source, in the extracted output. Several carry **duplicated alt text** (`![A photo of multiple women](<>)![A photo of multiple women](…webp)`), which is a responsive-variant pattern that may announce twice.
- **Where alt text exists it is genuinely good**: `There is a person in a wheelchair, a person with a prosthetic leg, a person with an amputated arm, and a blind person with a white cane.` · `A person is showing their Clue app data to a healthcare provider.` · `the transgender symbol in teal with a red drop of blood in the middle of the circle` · `Illustration of a pack of contraceptive pills and a woman sitting`. The last two are notable — describing a symbolic illustration's *components and colours* so a non-sighted reader gets the visual pun.
- **Stat counters have no non-JS fallback**: `0m monthly active users`, `0m monthly reach on web and social`, `0+ articles` render as zero. A screen-reader or no-JS user is told Clue has zero users.
- **Positive**: `Was this article helpful?` uses a smiley/frowny **icon pair with text labels** `Yes` / `No` rather than icons alone. Cookie banner gives `Reject all` equal prominence. Reading time is stated before the article. The support centre offers 26 languages.
- **Icon-only social links** in the footer render as bare URLs with no accessible name.

**Negative findings, recorded honestly**
- **No accessibility statement at all.**
- Stat counters render `0` without JavaScript.
- Widespread empty alt text on marketing pages; duplicated alt on responsive variants.
- Webflow default strings (`Thank you! Your submission has been received!` / `Oops! Something went wrong while submitting the form.`) leaking into every page.
- Nevada privacy supplement cross-links to a Google Docs **edit** URL.
- `Learn more >` used six times on one page with no object.
- Help-article vote counts render as `0 out of 0 found this helpful` on a featured privacy article.
- No pricing figures on marketing pages.
- No crisis or support signposting despite concealment features and loss content.

---

## Transferable patterns

1. **Separate provenance, field and audience claims lexically.** `women-led` (who built it) + `women's health` (the field) + `everyone with a cycle` (who it's for). Keeping the three roles in different words lets a product foreground a community's leadership without narrowing its audience — and removes the need for additive retrofits. The single best inclusive-language architecture in this corpus.
2. **Publish your definitional decision inside the product.** "*A quick note on the term 'cycle': We use 'cycle' here to refer not only to a typical menstrual cycle but also to hormone-induced cycles that occur without menstruation.*" When a core term has to stretch to include people, say so, in italics, where they will read it. Transfers to any glossary term carrying exclusionary baggage — `household`, `spouse`, `employer`, `permanent address`.
3. **Name a mode for the absence.** `No Period` as a nav label, peer to `Pregnancy`. If a meaningful population lacks the thing your product is built around, give their state a name in the menu rather than a workaround in the help centre.
4. **Choose the noun that does not presuppose pathology.** `experiences` over `symptoms`. Everything a user logs is not a problem, and the container noun should not say it is. Applies to `issues`, `incidents`, `errors`, `disputes`.
5. **Ship the misuse question in your own help centre.** `Can I use Clue Conceive predictions to prevent pregnancy?` Where a foreseeable misuse of your feature is dangerous, publish the question as a standing article rather than waiting to be asked. Directly applicable to any predictive or advisory feature.
6. **A per-partner disclosure template with a fixed data question.** Four articles per commercial partner, one always `What kind of data can Clue share with X?`, phrased identically each time. Makes partner data-sharing comparable across partners and automatic to ship.
7. **Publish the anti-dark-pattern article.** `How do I make sure that my voucher doesn't start a subscription?` Documenting how to *avoid* an unwanted charge is a costlier and more credible trust signal than any promise not to make one.
8. **Author and medical reviewer as separate, credentialed, linked people — with reviewer seniority matched to content risk.** `by Eve Lepage, MSN, RN` / `Medically reviewed by Lynae Brayboy, MD, FACOG`. Plus both published and updated dates. The most legible trust furniture in the batch.
9. **Publish the loss content as permanent taxonomy, not as articles.** `Miscarriage` and `Abortion` as browsable categories, and `How can I track a miscarriage or abortion?` in the support IA, means a grieving user never has to search a word they cannot bear to type.

## Caveats & gaps

- **No cycle, symptom or body data was entered and no mode was configured.** All field and question design is `[documented]` from help titles and encyclopedia descriptions. No in-app string is reproduced beyond those Clue itself quotes in help copy (`How are you feeling`, `Switch mode`, `Mode: [your current mode]`, `Cycle View`, `More Menu`).
- **Support-article bodies mostly not opened.** T7, T10 and T11 rest heavily on ~200 titles from the support index plus one full article (`How Clue handles data privacy`). Titles are high-signal for IA and task phrasing and say nothing about answer quality.
- **`Is Clue Conceive FDA cleared?` was not opened and no answer is characterised.** The regulatory-status line in the header records only that Clue publishes the question. Anyone using this file for regulatory reference must open the article.
- **`Can I use Clue Conceive predictions to prevent pregnancy?` likewise not opened.** The safety observation is about the question's existence in the IA, not its answer.
- **Privacy Policy, Terms, U.S. Supplemental Notice and Imprint not opened.** T10 rests on the Consumer Health Data Privacy Policy, the privacy help article and marketing copy. The subpoena commitment is quoted from a Zendesk help article authored by a named support agent — a support surface, not a binding legal document. That distinction should be preserved by anyone citing it.
- **No accessibility statement was found and this is reported as an absence after searching the footer, the support centre and the company pages** — not as proof none exists anywhere.
- **No crisis signposting was found** across seven pages including the security/concealment articles and the loss content. Same caveat: an absence across the pages inspected.
- **Pricing figures unobserved.** All plan pricing sits behind `How much does Clue Plus cost?` and the checkout.
- **Only two encyclopedia articles were read** of a corpus stated in the hundreds. The byline template was consistent across both; FAQ and hedging patterns across the abortion, miscarriage, trans-health and PCOS entries are unassessed — and those are precisely where the sensitive-language craft would be most visible.
- **The `New Features in Testing` category** (Chat With Your Data, Doctor Report, Clue Community) holds Clue's AI and community-moderation content and was captured only as titles. `How is the community moderated?` and `How is AI technology used in this feature?` are the two highest-value unopened articles in this file.
- **en-US only.** Clue serves five site languages and 26 support languages; inclusive-language decisions in gendered languages (de, es, fr, pt) would be the more demanding test, particularly in German, the company's own language.

## Sources

1. https://helloclue.com/
2. https://helloclue.com/clue-plus
3. https://support.helloclue.com/hc/en-us
4. https://support.helloclue.com/hc/en-us/articles/29048867548061-How-Clue-handles-data-privacy
5. https://helloclue.com/articles/how-to-use-clue/track-your-cycle-without-a-period-with-clue
6. https://helloclue.com/articles/how-to-use-clue/clue-period-tracking-plus-explained
7. https://helloclue.com/privacy/healthdata
