# 116. Teladoc Health

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Telehealth (multi-specialty virtual care: urgent, primary, mental health, chronic condition management) |
| Primary URL | https://www.teladochealth.com/ |
| Corpus rank | 116 |
| Benchmark strength (source list) | Care access and expectations |
| Locale / market observed | en-US (a full `es-us` mirror is linked from every page) |
| Platform observed | Web (desktop), help centre, legal hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | HIPAA — separate `Notice of Privacy Practices` (covered-entity notice) published alongside a general web `Privacy Policy`; `Consumer Health Data Privacy Policy` (Washington MHMDA / Nevada NHDPA class of law); `Notice of Non-discrimination` and `Notice of Availability` (ACA §1557 language-access regime); DEA controlled-substance prescribing limits stated in consumer copy; care delivered by `Teladoc Health Medical Group P.A.` and `Teladoc Physicians, P.C.` (professional corporations, i.e. state medical-practice structure); `Transparency Reporting` and a `Compliance and Ethics Hotline` published. No FTC undertaking found on the public site. BetterHelp, Inc. disclosed on-site as "a wholly-owned subsidiary of Teladoc Health, Inc." |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 (8 fully parsed, 2 retrieved but over size limit — see Caveats) |
| Harvest completeness | Partial — marketing, help-centre IA, mental-health, pricing-without-insurance and legal index captured in full; the two large FAQ hubs (`/start/faq`, `/helpcenter/faq`) were retrieved but exceeded the fetch size limit and their answer bodies are not quoted. Help-article bodies not opened (titles only). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.teladochealth.com/ | Three-audience nav, six service cards, trust bar, testimonial disclaimer |
| How it works | https://www.teladochealth.com/start/how-it-works | 3-step onboarding, 4 care categories, 3-question FAQ |
| Care without insurance | https://www.teladochealth.com/start/no-insurance | Per-visit price table, 3-step self-pay path, footnoted caveats |
| Mental Health (product) | https://www.teladochealth.com/individuals/mental-health | Scope list, provider bios, 5-question FAQ incl. DEA exclusion |
| Help Center home | https://www.teladochealth.com/helpcenter | "Trending right now" + 10 categories with scope lines |
| Help Center: Mental Health | https://www.teladochealth.com/helpcenter/mental-health | 10 article titles + 4 coaching titles, with per-article summary lines |
| Legal, Privacy & Compliance index | https://www.teladochealth.com/legal | 16 named legal artefacts |
| Accessibility Statement | https://www.teladochealth.com/legal/accessibility-statement | Phone, TTY and email contact; no WCAG level named |
| FAQ (individuals) | https://www.teladochealth.com/start/faq | Retrieved, over size limit — not parsed |
| Help Center FAQs | https://www.teladochealth.com/helpcenter/faq | Retrieved, over size limit — not parsed |

---

## T1 Navigation & IA labels `[observed]`

**Global nav is segmented by *who you are*, not by product.** Three tiers:
`Individuals` · `Organizations` · `Clinicians`, plus a locale switch (`en` / `es`),
`Sign in` and `Register now`.

Inside `Individuals`, the sub-heading is `Ways we help` — an activity framing
rather than a catalogue framing. Each service in that menu carries a **one-line
scope sentence written in second person**, which is the most transferable IA
decision on the site:

| Service label | Scope line (verbatim) |
|---|---|
| `24/7 Care` | "Skip the trip and get same-day care for common conditions." |
| `Mental Health` | "Find therapy that works best for you." |
| `Weight Management` | "Weight loss and healthy living tailored to you." |
| `Diabetes Management` | "A personalized way to manage and prevent diabetes." |
| `Hypertension Management` | "Lowering your blood pressure just got easier." |
| `Specialty & Wellness` | "Skin issues? Meal planning? Or need a second opinion? We've got you covered." |
| `Primary Care` | "Looking for convenient, high-quality primary care? Welcome." |

Three grammatical registers are mixed inside one menu: imperative (`Skip the
trip`), declarative (`A personalized way…`) and interrogative-then-reassuring
(`Skin issues? … We've got you covered.`). It reads warmly but it is not a
governed pattern.

A second sub-heading, `Explore`, holds the pre-purchase decision content:
`Care Without Insurance` · `How It Works` · `Medicare` · `Medicaid` · `FAQs` ·
`About Us` · `Our Impact` · `Teladoc Health Library` · `Contact Us`.
**Putting `Care Without Insurance` first in `Explore`** is a deliberate
access-anxiety answer, not a pricing link.

**Help Center — two competing category sets on one page.** The left rail lists
nine `Services` categories; the body lists ten `Search by category` cards. They
do not match: the body adds `Troubleshooting` and merges
`Accounts, Billing & Coverage` with `Insurance`, which the rail keeps separate.
Recorded as an inconsistency.

Help Center category scope lines are **comma-run noun lists**, not sentences:

| Category | Scope line (verbatim) |
|---|---|
| `Condition Management` | "Diabetes, Hypertension, Weight Management, coaching and more" |
| `Mental Health` | "Therapy, prescriptions, coaching and self-guided programs" |
| `Primary Care` | "What we treat, prescriptions, lab tests and referrals" |
| `24/7 Care` | "Inmediate care, what we treat, prescriptions and lab tests" |
| `Specialists` | "Dermatologist, nutrition, expert medical opinion and more" |
| `Devices` | "Blood sugar meter, blood pressure monitor, weight scale and supplies" |
| `Apps and Integration` | "Using the Teladoc Health app and connections to other apps and wearables" |
| `Accounts, Billing, Coverage and Insurance` | "Sign-in help, emergency contacts, visit costs, insurance coverage and payment options" |
| `Troubleshooting` | "Activation, enrollment, connectivity and password reset" |

**Defect, recorded verbatim:** the `24/7 Care` scope line reads `Inmediate care`
— a Spanish-influenced misspelling of "Immediate" shipped on the English help
centre. Likely a localisation crossover from the `es-us` mirror.

`What we treat` appearing twice as a scope item is notable: it is the *scope-of-
service* question surfaced as an IA node rather than buried in terms.

**Footer groupings:** `Individuals` · `Organizations` · `Clinicians` ·
`Who we are` · `Helpful Links`. `Helpful Links` carries
`Legal, Privacy & Compliance`, `Your Privacy Choices`,
`Language Assistance Services` and `Community Guidelines` — compliance artefacts
given first-class footer placement.

## T2 Value proposition & headline patterns `[observed]`

**Homepage hero** is a relationship claim, not a task:

> `Connecting you to better health`
> Subhead: "Teladoc Health connects patients and care providers for medical care, mental health, chronic condition management and more."

The subhead is a **list of covered domains** — it is doing scope work, telling
the reader what is and is not in the product, before any benefit claim.

**Section headers are completeness promises**, repeated almost verbatim across
pages — a deliberate anchor phrase:

- `The care you need, all in one place` (homepage)
- `All the care you need, all in one place` (how-it-works)
- `A high-quality care experience—anywhere, anytime`
- `Making better health possible—everywhere`

**Speed-and-friction framing** is the actual differentiator and it is stated as a
contrast: `Get care in minutes, not weeks.` (how-it-works opener).

**Access objection handled as a headline, twice.** The no-insurance page hero is
`No insurance? No worries.` and the how-it-works page repeats the same move as a
section header: `No insurance? No problem.` Two near-identical strings for one
message on two pages — a governance gap, but the *pattern* (name the blocker in
the headline, answer it in the same breath) is strong.

**Mental-health hero softens register markedly:**

> `Your path to feeling better`
> "Find lasting peace of mind with support from a therapist who is right for you. All from the privacy of your own home"

Note the missing terminal full stop — present in the meta description, absent on
page. `privacy of your own home` is the stigma-answer; see T14.

**Stigma is addressed directly** in a section header + body on the mental-health
page: `Supporting you every step of the way`, whose body draws an explicit
analogy between mental healthcare and `allergies or a broken bone`.

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get care now` | Homepage hero, no-insurance page (×3) | The dominant action verb — care, not "sign up" |
| `No insurance needed` | Homepage hero, secondary | A *reassurance used as a CTA label* |
| `Register now` | Global header | |
| `Sign in` | Global header | |
| `Get Care Now` | Individuals mega-menu | Title-case variant of the hero CTA — inconsistent casing |
| `Check my eligibility` | How-it-works (×2) | First person possessive — see pattern note below |
| `Find my therapist` | Mental health hero, mid-page | First person |
| `Find my psychiatrist` | Psychiatrist bio cards | First person, role-specific |
| `Get started` | Mental health, how-it-works | |
| `Sign up in minutes` | How-it-works footer | Duration embedded in the label |
| `Register for free` | Mental health footer | Price embedded in the label |
| `Learn more` | Homepage service cards (×6) | Bare `Learn more`, repeated — the weakest labels on the site |
| `Download the app` | Homepage, how-it-works | |
| `Sign up` | BetterHelp cross-sell banner | Different verb for the partner product |
| `Try BetterSleep—30 days for $0` | Menu promo | Price-framed trial CTA |
| `Watch this short video` | Homepage, no-insurance, mental health | |
| `Trustpilot reviews` | Social proof | Names the third party |
| `Load more` / `Show more` | Help centre result lists | |
| `Contact Us` | Footer, nav | |
| `Take this 60-second quiz to find out` | Mental-health FAQ body | Duration-bounded, low-commitment entry to a self-assessment |

**The signature CTA pattern is first-person possessive** — `Find my therapist`,
`Find my psychiatrist`, `Check my eligibility`. The user is speaking, not being
instructed. It is used precisely where the action is personal and slightly
frightening (choosing a therapist, discovering whether you can afford care) and
*not* used for utility actions (`Download the app`, `Watch this short video`).
That register split is the reusable part.

**Counter-observation:** six identical bare `Learn more` links sit on the
homepage service cards, doubled (each card renders the link twice in the DOM for
responsive variants). This is the opposite of the Wise practice and is the
clearest CTA weakness in this file.

## T4 Onboarding & getting-started `[observed]`

**How-it-works: three steps, each a verb phrase + a "you're done" close.**

1. `Set up your Teladoc Health account` — sign up online or in the app "by filling out your health information and checking your health insurance coverage."
2. `Download the app` — to "see a full list of providers, schedule virtual visits, request medication refills and more."
3. `You're all set` — plus an immediate eligibility caveat: "Some programs are only available to those who are eligible, and some have pay-per-visit options."

Step 3 is **not an action** — it is a completion state used as a step heading,
and it carries the bad news (eligibility limits) in the same breath as the
congratulation. Placing the limitation inside the success step rather than in a
footnote is honest and unusual.

**No-insurance page: a parallel three-step, numbered, all imperative fragments.**

1. `Enter a few details about yourself`
2. `Skip adding coverage and select self-pay option`
3. `Check out your care options`

Preceded by an expectation-setter used as a subhead: `This only takes a few
minutes.` Step 2 is remarkable — it names a **skip** as a first-class step,
explicitly authorising the user to bypass the insurance gate rather than making
them work out that it is optional.

**Mental-health scheduling, documented as a four-step list** `[documented]`
(inside a marketing-page FAQ answer):
use the app or go online → `Select "Mental Health," then select a therapist` →
pick preferred dates and times → "Your therapist will confirm the date that works
best for you both." The last step names the *provider* as the actor, which sets
the expectation that booking is a negotiation, not an instant reservation.

## T5 Form & field labels `[observed / absent]`

Almost all form UI is behind `member.teladoc.com` and was not entered.
`[absent]` for actual input labels.

What is observable pre-auth:

- Help-centre search is an unlabelled input at `/helpcenter/search`.
- The registration entry point is consistently described, not shown:
  "filling out your health information and checking your health insurance coverage".
- A screenshot alt text discloses the first registration screen's copy:
  `Partial phone screen saying "Let's get started"` — the only first-run string
  recoverable from this surface, and only via alt text.
- Help-centre article titles name the fields that cause trouble:
  `Confirm, change or cancel my appointment`, `Manage my account`,
  emergency contacts listed as a billing/account concern.

**Assessment gating is documented, not shown** `[documented]`: a help article is
titled `Why do I need to complete an assessment before some therapy visits?`.
Teladoc ships an explainer for *why the questionnaire exists* rather than only
how to complete it. **Not opened** — no assessment was started (see Caveats).

## T6 Status & state language `[documented]`

Visit state vocabulary is recoverable only from help titles:

- `Confirm, change or cancel my appointment` — three states in one title
- `Check or change the status of an upcoming visit` (article slug) — `upcoming` is a named state
- `How to join your therapy visit` — `join` is the action verb for an active visit
- `Schedule a Therapy Visit With myStrength Complete` — a named programme tier
- Eligibility is treated as a state: `Check my eligibility`, "Some programs are only available to those who are eligible"

**Durations are published as expectations** `[observed]`, which is the strongest
"care expectations" artefact on the site:

- Therapy and counselling visits: "scheduled for 45 minutes"
- First psychiatry visits (new evaluations): "scheduled for 45 minutes"
- Psychiatry follow-ups for medication management: "typically last 15 minutes"
- 24/7 Care: `Connect within minutes`
- Availability: `See a therapist of your choice 7 days a week.`

Publishing a 15-minute follow-up duration is a real expectation-setting choice —
it pre-empts the "that was short" complaint rather than leaving it to the visit.

## T7 Error, failure & recovery `[documented]`

Help-centre "Trending right now" is effectively a failure-mode shortlist, and
its labels are **imperative-with-implied-first-person**:

- `Troubleshoot network connectivity`
- `Can´t log in?` — note the **typographic defect**: an acute accent (´) is used in place of an apostrophe
- `Get prescription help`
- `Get a doctor's note`
- `Confirm, change or cancel my appointment`
- `Order test strips and lancets`
- `Manage my account`
- `Schedule a provider visit today`

A dedicated `Troubleshooting` category exists with the scope line
"Activation, enrollment, connectivity and password reset" — i.e. the four
failure points are named at category level.

Article slugs show a softening pattern:
`sign-in-troubles-common-issues-and-simple-solutions` — "troubles… simple
solutions" pairs the problem with the reassurance inside the title itself.

## T8 Empty states `[observed]`

Two strings, both in the help-centre result lists:

> `No results found`
> `Loading results...`

Bare and unhelpful: no query echo, no suggested next step, no `Contact us`
fallback offered at the point of failure. This is a gap relative to the rest of
the site's warmth.

## T9 Notifications & system messages `[absent / documented]`

No in-product notification copy is reachable. `[absent]`

Documented adjacent artefacts:
- Real-time care prompts are implied by `Connect within minutes` but no push or toast copy is published.
- `Notice of Availability` exists as a named legal artefact (an availability/communications notice), linked from `/legal`.

## T10 Disclosures, legal & compliance `[observed]` — PRIORITY

### Scope-of-service — what Teladoc says it does and does not do

**Positive scope, mental health, stated as a bulleted `Get help with:` list:**
`Anxiety, stress or feeling overwhelmed` · `Negative thought patterns` ·
`Not feeling like yourself` · `Sleep issues or if you can't get out of bed` ·
`Relationship conflicts` · `Trauma and PTSD` · `Mood swings` ·
`Medication management (psychiatry only)`

Two things worth stealing. First, the list is written in **lay symptom language,
not diagnostic language** — `Not feeling like yourself`, `if you can't get out of
bed`. Second, the parenthetical `(psychiatry only)` does scope-boundary work
inline, in the benefit list, rather than in a footnote.

**Negative scope is explicit and unusually specific.** From the mental-health
page FAQ:

> "Please note that therapists do not prescribe any medications."
> "Psychiatrists and Psychiatric Nurse Practitioners do not provide talk therapy on our platform."

And the controlled-substance exclusion, published in consumer copy with worked
brand examples:

> "*Please note that we are unable to prescribe or provide refills for DEA-controlled substances such as stimulants (e.g., Adderall, Concerta), benzodiazepines (e.g., Xanax, Klonopin), pain medications and medications used for treating substance use (e.g., Suboxone)."

Naming the actual drug brands a user would search for, rather than writing
"certain controlled substances", is the single best disclosure decision in this
file. It is findable by the person who has the question.

**Service-availability exclusions:** "Primary care and Condition Management
programs are not available for self-pay." (no-insurance page footnote) —
i.e. two of six advertised services are unavailable to the uninsured audience the
page is aimed at, disclosed in an asterisked footnote rather than in the price
table.

### Crisis signposting `[absent]` — recorded as a finding

**No crisis or emergency signposting was found on any Teladoc consumer page
inspected in this harvest.** There is no 988 reference, no "if you are in
crisis" banner, and no emergency-resources link in the footer, header, or on the
mental-health product page. This is a substantive contrast with BetterHelp and
Talkspace (records 117 and 118), both of which carry persistent crisis copy in
the global footer of every page.

Stated precisely: `[absent]` on `/`, `/individuals/mental-health`,
`/helpcenter`, `/helpcenter/mental-health`, `/start/how-it-works`,
`/start/no-insurance`, `/legal`, `/legal/accessibility-statement`. It may exist
inside the two unparsed FAQ hubs, inside help-article bodies, in the registration
flow, or in-product; none of those were reachable here. Do not read this as a
claim that Teladoc provides no crisis routing — only that it is not present on
the public surfaces harvested.

### Price disclosure

Self-pay prices are published as a plain four-row table:

| Service | Price (verbatim) |
|---|---|
| 24/7 Urgent Care | `$89/visit` |
| Nutrition | `$89/visit` |
| Dermatology | `$89/review` |
| Mental Health | `$119/visit` |

Note `$89/review` rather than `/visit` for dermatology — the unit changes because
the service is asynchronous, and the copy tracks that rather than smoothing it.

Headline claim: `No extra fees or costs—always know what you owe upfront.`
Immediately bounded by a footnote: "*Prices per visit may vary based on
eligibility." The "always know upfront" and "may vary" sit on the same page —
the qualifier is present but it partly undercuts the absolute.

Insured side: `Visits starting at $0*`, with `1 in 4 Americans have access to
Teladoc Health through their employer or health plan.`

**Recurring deferral pattern.** Mental-health and specialty pricing is repeatedly
withheld behind registration:
- "Create your account to view your available services and pricing."
- "To see the cost of an online Dermatology review, Mental Health visit or Nutrition visit, please set up your account now."
- "Pricing and services vary depending on employer and health plans."

So the page that promises "always know what you owe upfront" also requires an
account to learn several prices. Recorded as an observed tension, not a judgement.

### Cancellation, auto-renewal and refunds `[absent]`

Teladoc's individual offering is **per-visit, not subscription**, so there is no
auto-renewal wording on the consumer surfaces. No cancellation or refund policy
text was found on the pages inspected; `Confirm, change or cancel my appointment`
routes to an article that was not opened. The one subscription in view is the
cross-sold BetterHelp product, described as "For a monthly fee…" — see record 117
for its cancellation terms.

### Testimonial and outcome-claim disclaimers

A full disclaimer block is repeated verbatim on at least three pages:

> "The testimonials, opinions and statements reflect one individual's personal experience with Teladoc Health. Results and experiences may vary from person to person and will be unique to each individual. The testimonials are voluntarily provided and are not paid. The individual in the photo is not the individual who provided this testimonial."

That last sentence — disclosing that the *face* is not the *voice* — is a
disclosure most products omit entirely.

Every statistic carries a numbered footnote source:
- `90% of people` who used the mental health solution say it helped them feel better → "*Based on a Teladoc Health survey of over 2,000 consumers"
- `76% of patients who experience depression say their symptoms improved after only three therapy visits.` → "**Teladoc Health data" (unattributed internal data, flagged as such)
- `90+ million` community claim → sourced to a named press release

### Named legal artefacts (the `/legal` index)

`General Privacy Policy` · `Notice of Privacy Practices` ·
`Consumer Health Data Privacy Policy` · `Terms of Service` ·
`Terms and Conditions` · `Legal Disclaimer` · `Notice of Non-discrimination` ·
`Notice of Availability` · `Compliance and Ethics Hotline` ·
`Accessibility Statement` · `Account Deletion Policy` · `Patents` ·
`Privacy Practices for Employee Information` ·
`Privacy Practices for Provider Information` · `Responsible Disclosure` ·
`Transparency Reporting`

Three of these are worth flagging as good practice: **`Account Deletion Policy`
as a named, linkable artefact**; a **separate privacy notice for providers**, not
just patients; and `Transparency Reporting`.

Consent-to-share is stated in plain second person in a FAQ answer: with the
user's consent, visit results can be shared with their primary care physician
"instantly."

## T11 Help-centre architecture `[observed]`

Three-layer: **Trending right now → Search by category → article lists with
per-article summary lines.**

The distinguishing feature is that **every article title is paired with a
one-line benefit summary**, so the list is scannable without clicking:

| Article title (verbatim) | Its summary line (verbatim) |
|---|---|
| `How to schedule a mental health coaching session` | "Schedule a Mental Health Coaching session for expert support." |
| `How do I change my recommended mental health focus area?` | "Easily update your Mental Health focus area for personalized support." |
| `How to join your therapy visit` | "Join your therapy visit with ease with these step-by-step instructions." |
| `What to expect during your mental health coaching sessions` | "Prepare for your Mental Health Coaching sessions—know what to expect and how to benefit." |
| `Why do I need to complete an assessment before some therapy visits?` | "Learn why assessments are important before therapy visits—get the most from your care." |
| `What is the difference between coaching and therapy?` | "Understand the difference between Coaching and therapy—find the right support for you." |
| `What is mental health coaching and how does it work?` | "Discover how mental health coaching can support your well-being—personalized guidance." |
| `Mental Health FAQs` | "Find support for your mental health journey through answers to commonly asked questions." |
| `Schedule a Therapy Visit With myStrength Complete` | "Book a therapy visit with mystrength complete—support is just a click away." |
| `How do I schedule a Mental Health therapy visit?` | "Book a Mental Health therapy visit in just a few clicks—get support when you need it." |

**Honest critique of the pattern:** the summary lines are heavily SEO-shaped and
largely restate the title. Four of ten use the same em-dash-plus-benefit
construction. `Support is just a click away` is marketing register inside a
support surface. And `mystrength complete` is lower-cased in the summary while
title-cased in the article title — a product-name governance failure visible in
the same row.

**Article-title grammar — four shapes:**
`How to <verb>…` · `How do I <verb>…?` · `What is <X>?` / `What is the
difference between X and Y?` · `Why do I need to <X>?`

The `What is the difference between coaching and therapy?` title is the
highest-value one: it is a **scope-distinction article** written as the question
a confused user would actually ask.

Routing furniture: `Member Support` appears both as a nav item and as the last
category card, pointing to `/info/member-support`. `Can't find what you're
looking for?` is **not** present — there is no explicit self-service dead-end
handler on the help home.

## T12 FAQs `[observed]`

FAQs are distributed rather than centralised: a 3-question block on how-it-works,
a 5-question block on mental health, plus two dedicated hubs. Question set
captured verbatim; answers summarised per schema.

**How-it-works block, under `Still have questions?`:**

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | How much does Teladoc Health cost? | Leads with "it varies" and names the two variables (care type, plan design); gives `$0` insured floor and `$89` self-pay urgent-care figure; defers mental-health and dermatology pricing to account creation. |
| 2 | Can Teladoc Health share the results of a visit with my primary care provider? | One-word `Yes`, then the consent condition, then the speed claim. |
| 3 | How does Teladoc Health app work? | Declines to explain in text and routes to a video. |

**Mental Health block, same `Still have questions?` heading:**

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | How can mental health services help you? | Answers with a seven-item `If you…` list of user situations rather than a definition; closes by routing to a 60-second self-assessment quiz for the still-unsure. |
| 2 | What types of virtual mental health services are available? | The longest answer on the site. Splits therapy from psychiatry, names the licence types for both, states that psychiatrists do not do talk therapy and therapists do not prescribe, and carries the DEA controlled-substance exclusion with brand examples. |
| 3 | How do you match me with the right mental health professional? | States that the user browses and chooses from profiles showing gender, language and specialty — i.e. **self-selection, not algorithmic matching** — with preference questions asked at booking. |
| 4 | How do I schedule a mental health visit? | Four numbered steps ending with the therapist confirming. |
| 5 | How long are the visits? | 45 / 45 / 15 minutes, then care-plan frequency set by the provider. |

**Structural note.** Both blocks use the identical heading `Still have
questions?`, and question 1 in each block is the cost or the benefit — the
objection, not the feature. Q1 in the mental-health block is phrased in the
**second person about the user** ("help *you*") while the other four are
first-person-user ("How do *I*…"). Mixed person within one accordion.

The two FAQ hubs (`/start/faq`, `/helpcenter/faq`) were retrieved but exceeded
the parse limit; their question sets are **not** recorded here rather than
guessed.

## T13 Terminology & glossary `[observed]`

| Term | Teladoc's usage | The alternative it rejected |
|---|---|---|
| `24/7 Care` | The urgent-care product name in the nav and on the homepage | "Urgent Care" — though `Urgent Care` *is* used as a card heading on how-it-works, so the two coexist |
| `Condition Management` | Umbrella for diabetes, weight, hypertension | "Chronic care" — which is the label used on the *Organizations* side of the same nav |
| `Expert Medical Opinion` | Second-opinion service | "Second opinion" (used in the menu scope line but not as the product name) |
| `member` | The person receiving care (`Member Support`, "Teladoc Health member") | "patient" — though `patients` appears in outcome stats and `Patient` in hospital-facing copy |
| `provider` | Umbrella for doctors, therapists, psychiatrists, NPs | "clinician" — which is reserved for the *third nav tier*, the professional audience |
| `visit` | The unit of care and the unit of billing (`$89/visit`) | "appointment" / "consultation" — `appointment` survives in help titles |
| `review` | The unit for asynchronous dermatology (`$89/review`) | "visit", correctly not reused |
| `self-pay` | The uninsured payment path | "out-of-pocket", "cash pay" |
| `eligibility` | Whether a service is available to you at all | "coverage" — kept distinct: you check *eligibility*, you have *coverage* |
| `focus area` | The user's selected mental-health topic | "goal", "presenting problem" |
| `Everyday Healthy Habits` | Homepage grouping for nutrition, sleep, tobacco, sexual health | "Wellness" — which is used in the nav as `Specialty & Wellness` |
| `myStrength Complete` | Named mental-health programme tier | |
| `Wellbound` | Named EAP product (organizations side) | |

**Register split across audiences.** The same capability is `Condition
Management` to individuals and `Chronic Care` to employers; `provider` to
individuals and `clinician` to the profession. The vocabulary is
audience-partitioned, which is coherent — but `24/7 Care` versus `Urgent Care`
appearing on the same page is not.

## T14 Voice, tone & accessibility `[observed]` — PRIORITY

**Person and tense.** Second person for the user throughout. First-person plural
for the company, and the company is a visible actor:
"we can share any of your Teladoc Health visit results", "we are unable to
prescribe", "We'll help you", "we've got you covered".

**Register gradient under emotional load.** This is the most instructive thing in
the file, and it runs in the *opposite* direction on the mental-health pages to
where you would expect:

- *Access/admin copy* is breezy and exclamatory-adjacent: `No insurance? No worries.` · `No problem!` · `You're all set` · `Healthcare without the hassle` · `Stay healthy, stay happy`.
- *Clinical-scope copy* flattens completely: "Psychiatrists and Psychiatric Nurse Practitioners do not provide talk therapy on our platform." · "we are unable to prescribe or provide refills for DEA-controlled substances".
- *Mental-health emotional copy* sits in between and is deliberately gentle: `Your path to feeling better` · `Take the first step toward mental well-being` · `Start feeling like yourself again.` · `Find lasting peace of mind`.

The tone flattens as clinical stakes rise — the correct direction. But it also
**brightens as financial stakes rise** (`No worries.` on the page about paying
$119 out of pocket for therapy), which is the inverse and worth flagging.

**Symptom language avoids clinical vocabulary where it can.** `Not feeling like
yourself`, `if you can't get out of bed`, `feeling overwhelmed`, `Negative
thought patterns` — plain-language symptom descriptions that let a user
self-identify without a diagnosis. Diagnostic terms (`PTSD`, `OCD`,
`anxiety/panic disorder`, `mood disorder`) are reserved for the *provider bios*,
where they describe the clinician's expertise rather than the reader's condition.
That is a clean, defensible split: **the user is described in feelings, the
clinician is described in diagnoses.**

**Stigma copy.** `Just as there's no stigma around seeking care for allergies or
a broken bone, mental healthcare is a normal need for millions of Americans.`
Normalisation by physical-health analogy, with a scale number attached.

**Provider bios are written in third person, present tense, and lead with
temperament rather than credentials.** Credential is a separate line beneath the
name:
- `Licensed professional counselor` — "Her counseling style is warm, nonjudgmental and collaborative."
- `Psychiatrist` — "Shahid's mission is to help people get the support they need…"
- `Licensed Certified Social Worker` — "Lauren enjoys helping patients feel happy and healthy about themselves."

**Defect:** the image alt text for these bios reads `Dr. Julie Featherman` and
`Dr. Lauren Greenwald Froitzheim`, but the on-page credentials are *Licensed
professional counselor* and *Licensed Certified Social Worker* — neither of which
carries the title "Dr." The honorific appears only in alt text, i.e. only for
screen-reader users. Recorded as an accuracy-and-accessibility defect, and a
meaningful one in a regulated context.

**Testimonials** are quoted in the member's own voice with first-initial
attribution (`Deja M.`, `Corey S.`, `Diane H.`) and thematic captions that name
the emotional situation, not the product: `Finding the right therapist` ·
`Facing trauma` · `Adjusting to change` · `Reducing anxiety`.

**Numbers as trust devices:** `100+` health plans, `100M+` Americans with access,
`50%+` of Fortune 500 employers, `60%+` of top-100 hospitals, `20+ Years`,
`90+ million`, `1 in 4 Americans`, `90%`, `76%`. Every one carries a footnote
marker.

### Accessibility `[observed]`

- A public `Accessibility Statement` exists, linked from `/legal` and reachable from the footer via `Legal, Privacy & Compliance`.
- It offers **three contact routes including TTY**: `800-835-2362`, `TTY: 855-636-1578`, and an email address. Publishing a TTY number is above the common baseline.
- **Gap:** the statement names **no conformance target** — no WCAG version, no Level AA claim, no audit cadence, no remediation commitment. It is a feedback-channel statement only. Compare Talkspace and Day One (records 118, 120), both of which name WCAG 2.1 AA.
- The email address is obfuscated via Cloudflare email protection, so it renders as a script-dependent link — a mild accessibility risk on the accessibility page itself.
- `Language Assistance Services` is a first-class footer link (routing to the `Notice of Non-discrimination`), and a full `es` mirror exists for every page inspected.
- Alt text is generally descriptive and scene-level: "A mother and daughter sitting on a couch, talking virtually to a healthcare provider." · "A man speaks virtually with a healthcare provider while holding a bottle of prescription medication." · "A woman uses a medical device to take her blood pressure reading."
- **Gap:** several alt strings begin with a leading space (`" A mother and daughter…"`) and one is purely functional (`Mental Health has 76% efficiency` — which is also grammatically wrong; "efficiency" for "efficacy").
- **Gap:** homepage service cards render their `Learn more` link twice in the DOM (responsive variants), so screen-reader users may encounter six duplicated identical link labels.
- `Skip to content` link: **not found** in the retrieved markup. `[absent]`

---

## Transferable patterns

1. **Name the drug, not the category.** `stimulants (e.g., Adderall, Concerta), benzodiazepines (e.g., Xanax, Klonopin)` is findable by the user who has the question; "certain controlled substances" is not. Any exclusion disclosure should be written in the vocabulary of the person who will be disappointed by it. Transfers directly to fee exclusions, unsupported-country lists, and ineligible-transaction copy.
2. **First-person possessive CTAs for personal, high-anxiety actions only.** `Find my therapist` / `Check my eligibility` for the frightening steps; plain imperatives (`Download the app`) for utility. A register gradient in the CTA layer, not a house style.
3. **Put the limitation inside the success step.** `You're all set` carries the eligibility caveat in its own body. Bad news delivered at the moment of completion, not in a footnote, is better remembered and cheaper to support.
4. **Authorise the skip.** `Skip adding coverage and select self-pay option` as a numbered step tells the user the gate is optional. Wherever a form has a branch most users assume is mandatory, name the branch as a step.
5. **Describe the user in feelings, the clinician in diagnoses.** `Not feeling like yourself` for the reader; `PTSD and OCD` for the provider's expertise. Lets people self-identify without self-diagnosing.
6. **Pair every help-article title with a scope line** so the list is scannable without clicking — but govern the pattern, or it degrades into SEO restatement of the title, as it has here.
7. **Negative finding worth carrying forward:** a mental-health product with no crisis signposting on any public page is a live content-design risk. Both direct competitors in this batch ship persistent crisis copy in the global footer. See Caveats for the precise scope of this observation.

## Caveats & gaps

- **Crisis signposting is recorded `[absent]` on eight specific pages** (listed in T10), not across the whole product. The two large FAQ hubs, all help-article bodies, the registration flow and the authenticated app were not reachable. This is a finding about the public surfaces harvested, not a claim about Teladoc's clinical safety practice.
- **Two FAQ hubs retrieved but unparsed.** `/start/faq` (~65KB) and `/helpcenter/faq` (~60KB) both exceeded the fetch size limit. Their question sets are omitted rather than guessed. An authenticated or chunked pass would recover them.
- **No assessment, quiz, or intake questionnaire was started.** The mental-health page links a `60-second quiz` and a help article explains pre-visit assessments; both are recorded from their published descriptions only, marked `[documented]`.
- **Help-article bodies not opened** — titles and their summary lines only.
- **All in-product UI is inferred.** Field labels, validation, toasts, status chips, empty states inside the member app and the Teladoc Health mobile app are `[absent]` or `[documented]` at best.
- **Mental-health pricing is not publicly visible** beyond the self-pay `$119/visit` figure; insured pricing is gated behind account creation by design.
- **Only the `en-US` surface was harvested.** A full `es-us` mirror exists at `/es-us/` and was not inspected; the `Inmediate care` defect suggests the two locales share a content pipeline and would be worth comparing.
- **Organizations and Clinicians tiers largely unharvested** — only their nav labels are recorded.
- Condition-management and weight-management product pages were not opened; weight-management copy for this batch is covered in record 119 (Noom).

## Sources

1. https://www.teladochealth.com/
2. https://www.teladochealth.com/start/how-it-works
3. https://www.teladochealth.com/start/no-insurance
4. https://www.teladochealth.com/individuals/mental-health
5. https://www.teladochealth.com/helpcenter
6. https://www.teladochealth.com/helpcenter/mental-health
7. https://www.teladochealth.com/legal
8. https://www.teladochealth.com/legal/accessibility-statement
9. https://www.teladochealth.com/start/faq (retrieved, not parsed — over size limit)
10. https://www.teladochealth.com/helpcenter/faq (retrieved, not parsed — over size limit)
