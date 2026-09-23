# 103. Oura

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Wearable sleep/recovery tracking (smart ring + subscription health-insight app) |
| Primary URL | https://ouraring.com/ |
| Corpus rank | 103 |
| Benchmark strength (source list) | Health-insight explanations |
| Locale / market observed | en-US (language switcher present; Oura Health Oy is a Finnish entity, so EU accessibility and consumer regimes also apply) |
| Platform observed | Web (desktop marketing + store), Oura Member Care help centre, legal/trust pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Explicit, repeated, non-device positioning.** The canonical sentence, appearing at the foot of individual feature articles: "Oura Ring is **not a medical device** and is not intended to diagnose, treat, cure, monitor, or prevent medical conditions or illnesses." Health Radar features carry a longer six-verb variant as a numbered legal footnote on the homepage. Individual features carry their own scoped disclaimers (Nighttime Breathing, Blood Pressure Signals). `FCC Compliance` is a footer link. Trust Center claims **SOC 2** (annual independent audit), **HITRUST** certification, **NIST Cybersecurity Framework**, penetration testing, and a bug bounty; and states Oura "meet[s] **HIPAA** requirements where we handle protected health information for a healthcare partner." Data-protection compliance is stated generically ("applicable data protection laws… across Europe, the Americas, and Asia Pacific") — **GDPR is not named verbatim** on any page inspected. Accessibility is governed by Finland's **Act on the Provision of Digital Services (306/2019)** and the **EU Web Accessibility Directive**, supervised by **Traficom**. |
| Harvest date | 2026-09-21 |
| Pages inspected | 16 |
| Harvest completeness | Good — the metric-explanation corpus is unusually complete because Oura publishes its full score methodology, band thresholds, and per-level copy in the public help centre. Gaps: main Privacy Policy, Terms, store/checkout, and all in-app notification strings |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://ouraring.com/ | Hero, six-pillar carousel, **numbered legal footnotes** |
| Membership (pricing) | https://ouraring.com/membership | Price, trial, six-question FAQ incl. cancellation and data retention |
| Trust Center | https://ouraring.com/trust-center | Privacy principles, certifications, seven-question FAQ |
| Accessibility (index) | https://ouraring.com/accessibility | Two-line statement + links to EN and FI statements |
| Accessibility Statement (EN) | https://ouraring.com/accessibility/en | **Full enumerated non-conformance list with WCAG SC references** |
| Member Care home | https://support.ouraring.com/hc/en-us | Six categories, `Finn` virtual assistant, phone-call booking |
| Help: Oura App category | https://support.ouraring.com/hc/en-us/categories/27782541623059-Oura-App | Ten sections — the metric IA |
| Help: Readiness Score | https://support.ouraring.com/hc/en-us/articles/360025589793-Readiness-Score | Band table, crown icon, decrease factors |
| Help: Sleep Score | https://support.ouraring.com/hc/en-us/articles/360025445574-Sleep-Score | Nine improvement tips |
| Help: Activity Score | https://support.ouraring.com/hc/en-us/articles/360025577993-Activity-Score | Intensity definitions, **no step goal** |
| Help: Readiness Contributors | https://support.ouraring.com/hc/en-us/articles/360057791533-Readiness-Contributors | Nine contributors, each with a normal range |
| Help: Glossary | https://support.ouraring.com/hc/en-us/articles/5949130374547 | ~50 defined terms — the single richest T13 artefact in the corpus |
| Help: Health Radar | https://support.ouraring.com/hc/en-us/articles/52627030482707-Health-Radar | Symptom Radar, Nighttime Breathing, Blood Pressure Signals |
| Help: Resilience | https://support.ouraring.com/hc/en-us/articles/25358829055251-Resilience | Five named levels with full sentence definitions |
| Help: Cardiovascular Age | https://support.ouraring.com/hc/en-us/articles/28451491040019-Cardiovascular-Age | The hardest metric to word, and how they word it |
| Help: Oura Advisor | https://support.ouraring.com/hc/en-us/articles/39512345699219-Oura-Advisor | AI companion, disclaimer placement, memory controls |

---

## T1 Navigation & IA labels

**Global nav — four items, and one of them changes between pages** `[observed]`

Homepage: `Shop` · `Your Health` · `Why Oura` · `For Organizations`
Membership / Trust Center / Accessibility: `Shop` · `Health Features` · `Experience` · `For Organizations`

Two different nav label sets served on the same site in the same session. `Your Health` / `Why Oura` (homepage) versus `Health Features` / `Experience` (interior pages). Recorded as a consistency finding — possibly an A/B test, possibly a stale template, but a user moving from the homepage to `/membership` sees the top-level navigation change under them.

`Skip Navigation to Main Content` is present and first in DOM. Note the label is longer and less conventional than the standard `Skip to main content` (which the help centre uses) — so the two properties use different skip-link text.

**Health-feature taxonomy — six pillars, each with an outcome headline** `[observed]`

| Pillar label | Headline |
|---|---|
| `Sleep and Rest` | `Get the best sleep of your life` |
| `Wellness and Longevity` | `Don't just live longer, live healthier` |
| `Activity and Fitness` | `Bring your fitness goals into focus` |
| `Heart Health` | `Listen to what your heart is telling you` |
| `Women's Health` | `Understand the ins and outs of women's health` |
| `Stress` | `Put your stress to the test` |

The pillar names are **noun pairs** (`Sleep and Rest`, `Activity and Movement`) rather than single nouns, which is doing real work: `Sleep and Rest` signals that rest without sleep counts; `Activity and Movement` signals that non-exercise movement counts. Both distinctions are load-bearing in the scoring model (see T13, `restorative time` and `low intensity activity`), so the nav labels are pre-teaching the product's model.

The membership page adds a seventh, `Metabolic Health`, and renames `Activity and Fitness` to `Activity and Movement` — a second nav-consistency slip, and this one changes the meaning.

**Help centre — six categories, icon + label, no scope sentences** `[observed]`

`Oura Products` · `Get Started` · `Troubleshooting` · `Orders` · `Account` · `Oura App`

Flat, short, object-named. Unlike Headspace and Calm, Oura's help categories carry **no descriptive scope line** — the icon and a one-word label do all the work. The trade-off is visible immediately: `Oura App` contains the entire metric-explanation corpus (ten sections, ~90 articles) while `Oura Products` covers hardware. A user asking "what does my Readiness Score mean?" must infer that this is an *app* question, not a *product* question.

**The `Oura App` section list is the real IA artefact** `[observed]`:

`Readiness` · `Sleep` · `App Settings` · `Activity` · `Metabolic Health` ·
`Women's Health` · `App Integrations` · `Heart Health` · `Stress Management` ·
`Insights & Reports` · `Mindfulness & Meditation`

Eleven sections, and **the top three are the three daily scores** in the order the app presents them. The help IA mirrors the product's information architecture exactly, which means a user who knows where a number lives in the app knows where its explanation lives in help.

**Member Care furniture** `[observed]`: `Get instant help with Finn` (a named virtual assistant, "available 24/7"), `Self Service Tools` (`Return & Exchange`, `Membership Hub`, `My Orders`), then `Still need help?` offering `Chat Support` ("Available to chat 24/7") and `Phone Support` ("Available by appointment") with an inline booking form.

Human contact is offered **last but generously** — 24/7 chat plus bookable phone. The booking form's field `Reason for Call` carries a pre-emptive caveat: "Note: Some requests may need further investigation and can't be fully resolved over the phone." Setting the ceiling of the channel before the user commits to it is good expectation-setting.

**Footer** `[observed]`: `Terms & Conditions` · `Privacy Policy` · `Accessibility` ·
`FCC Compliance` · `IP Notice`. The help centre footer swaps `FCC Compliance` for
`Security Center` — a third inconsistency between properties.

## T2 Value proposition & headline patterns

**Hero — two words, one full stop each** `[observed]`

> `Subtle. Power.`
> "The world's smallest smart ring is here."
> CTA: `Explore`

Product-launch hero for Oura Ring 5. Two nouns (one arguably an adjective) punctuated as sentences. No verb, no claim, no benefit.

**The real value proposition is the second block** `[observed]`

> `Understand your body. Own your health.`
> "Oura gives you insights unique to your body, so every day adds up to a longer, healthier life."

Two imperatives, escalating from comprehension to agency. `Own your health` is the thesis: the product's job is to transfer a capability to the user, not to perform one for them. This is the through-line of Oura's entire content model — the scores are framed as things the user reads and acts on, never as things that act on the user.

**Claims carry superscript footnote markers** `[observed]`

> `86% of Oura Members see their health improve`[1]

with footnote 1 reading: "Based on a 2026 survey with 3,501 Oura members after using Oura Ring for 30 days."

The footnote states the year, the method (survey), the sample size, and the exposure window. Self-reported perception is disclosed by the verb — members "see their health improve" rather than "their health improves". This is the Wise **claim-then-bound** pattern executed properly, and Oura does it consistently: a second marker `[*]` on `Meet Health Radar` resolves to the full wellness disclaimer (T10).

**Testimonials are the most aggressive copy on the site, and they are quarantined** `[observed]`

Under `Real members, real stories of impact`, tagged by pillar:

- Heart Health — "My cardiologist told me, 'If you hadn't caught this, you might have gone to sleep and never woken up.' Oura didn't just track my health — it saved my life."
- Heart Health (membership page) — "I noticed in the app that my resting heart rate had skyrocketed. I went to the ER, where tests determined I had A-fib."
- Symptom Radar — "[The Symptom Radar notifications] are my sign to back off and give myself a day of rest."

**This is the sharpest tension in the file.** Oura's own voice never claims detection of a medical condition; every feature article says it cannot diagnose. But the member testimonials on the homepage and membership page describe exactly that — an A-fib diagnosis and a life saved. The company has moved its strongest efficacy claim into quotation marks attributed to a named customer, where the disclaimer regime does not reach.

A content designer should record this as a **pattern and a hazard**: attributed testimony is a legitimate content type, and it is also the standard route by which a wellness product communicates a medical claim it cannot make in its own voice. The Symptom Radar quote is the well-behaved version — it describes a *behaviour change* ("my sign to back off"), not an outcome.

**Section headers on the membership page are benefit-shaped** `[observed]`:
`Dynamic, in-the-moment insights` · `A clear picture of your health` ·
`Unlock long-term wellbeing` · `As you evolve, so does your Oura Membership` ·
`Your privacy always comes first` · `Start your health journey today`.

**Trust Center headers are principle-shaped** `[observed]`:
`Privacy is not a feature` · `We do not sell your data` · `You are in control` ·
`Designed for transparency` · `We stand guard over your data, no matter who's asking`.

`Privacy is not a feature` — "privacy is part of how we build, not just a setting you manage" — is an unusually confident line because it argues *against* the reader's likely expectation rather than flattering it.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Explore` | Hero, Health Radar block | Bare verb, used twice for different destinations |
| `Why Oura` / `How It Works` | Under the value-prop block | Paired, one persuasive one explanatory |
| `Explore Membership` | Homepage, under the 86% claim | |
| `Shop All Products` | Membership page close | Note: the *membership* page's final CTA sells hardware |
| `Learn More` | Trust Center ×3, membership privacy block | Bare `Learn More` ships here |
| `Read More` | Featured article | |
| `Report Vulnerabilities` | Trust Center | |
| `Skip Navigation to Main Content` | First in DOM, marketing | Non-standard wording |
| `Skip to main content` | First in DOM, help centre | **Different string, same function, two properties** |
| `Continue` | Phone-call booking form | |
| `OK` / `Reschedule` | Booking cancellation dialog | |
| `Return & Exchange` · `Membership Hub` · `My Orders` | Self Service Tools | Named destinations, not verbs |
| `Rest Mode` | Documented in-app toggle | See T6 — the most interesting control on the product |
| `Reset Advisor` | Documented in-app control | Full erasure of AI memory |
| `App Lock` | Documented privacy control | |

**Observation.** Oura's marketing CTA set is thin and generic (`Explore`, `Learn More`, `Read More`) — the opposite of Wise's fully-specific link text. The specificity all lives in the *help centre*, where destinations are named metrics. A screen-reader user tabbing the homepage link list gets `Explore`, `Explore`, `Learn More`, `Read More` with no distinguishing text; the published accessibility statement independently confirms this class of defect ("There are links in the service that may be unclear to users who use assistive technologies. (2.4.4)").

## T4 Onboarding & getting-started

The app's first-run flow is behind auth. `[absent]` What is documented is more
interesting: **Oura publishes its calibration periods as first-class content.**

**Every metric states how long it takes before it will show you anything**
`[documented]`:

| Metric | Stated calibration requirement |
|---|---|
| Readiness Contributors | "It can take up to two weeks for the Oura App to learn your average values" |
| Body Temperature | baseline set "during the first couple of weeks", then adjusted |
| Symptom Radar | "at least seven nights of sleep data within the past 14 days (including last night)" |
| Nighttime Breathing | "After seven days of data, you'll be able to see your prevailing pattern" |
| Blood Pressure Signals | "At least 15 nights of data are needed to build your baseline" |
| Resilience | "at least five days of complete data… within the past 14 days"; for new members "at least 10 days" |
| Cardiovascular Age | "at least 14 nights of data from the past 30 days… This preliminary baseline can change" |

This is a rare and highly transferable practice. A product whose value is a
personalised number has a structural onboarding problem: for the first two weeks
it cannot deliver its value proposition. Oura's answer is to **name the waiting
period per feature, in the feature's own documentation, with the exact data
requirement** — so the empty state is explained before it is encountered, and the
user can tell the difference between "not enough data yet" and "broken".

Note also the honest hedge on Cardiovascular Age: "This preliminary baseline can
change as your nighttime data accumulates." The product tells the user its first
answer may be wrong.

**Profile prerequisites are stated as troubleshooting.** `[documented]`
Cardiovascular Age will not compute without `Sex assigned at birth`, `Height`
(bounded 3'6"–8'2" / 1.1–2.5m), and `Age` (bounded 15–120). Health Radar is
"tailored to you based on your height, weight, and sex assigned at birth. Make
sure your profile is up to date to get the most accurate results."

The **input bounds are published** — a user who cannot get a reading can check
whether they fall outside the supported range rather than assuming a bug.

## T5 Form & field labels

Pre-auth form surface is the phone-booking form and the newsletter. `[observed]`

**Phone-call booking**: `First Name` · `Last Name` · `Email Address` ·
`Reason for Call` · `Continue`, with the scope note quoted in T1.

**Newsletter**: heading `Receive articles, tips, and offers from Oura`, with the
consent line **"We care about protecting your data."** placed *before* the
`Privacy Policy` link. The reassurance precedes the disclosure — a soft framing,
and the string is duplicated in the DOM (once as two lines, once as one), which
is a responsive-variant duplication that screen readers may encounter twice.

**Documented in-app field vocabulary** `[documented]`:
`My Profile` · `Sex assigned at birth` · `Height` · `Age` · `Weight` ·
`Tags` ("Comments you can add to your daily routines") · `Cuff Readings`
(manual blood-pressure entry, labelled against **American Heart Association
ranges — Normal, Elevated, or High**).

`Sex assigned at birth` rather than "Gender" or "Sex" is the correct clinical
phrasing for an algorithm input, used consistently across four articles.

`Cuff Readings` is a notable containment pattern: the user may log real
blood-pressure values, they are labelled with an external authority's ranges
(AHA), and then the copy explicitly firewalls them from the product's own
outputs — "they don't impact Blood Pressure Signals, Nighttime BP, or any Oura
score." Followed by: "A single reading is just a snapshot."

## T6 Status & state language

**This is Oura's strongest category and the reason it is in the corpus.**

### The score band table — published verbatim on every score article `[observed]`

> Readiness, Activity, and Sleep Scores — and their contributors — are rated on a
> scale of 0-100.
> - 85-100: **Optimal**
> - 70-84: **Good**
> - 60-69: **Fair**
> - 0-59: **Pay Attention**

**`Pay Attention` is the finding.** The bottom band — 60% of the numeric range —
is named with an **instruction to the user**, not a judgement of the user. Not
"Poor", not "Low", not "Bad", not "Needs Improvement". `Pay Attention` is a
directive that is true regardless of cause, carries no failure connotation, and
is the same phrase whether the score is 58 or 3.

The three bands above it are adjectives of quality; the fourth breaks the
grammatical pattern deliberately. The grammar break *is* the tone decision — at
the point where a consistent label set would have to say something negative, the
copy switches word class rather than reaching for a negative adjective.

The interpretive sentences attached are equally careful:

> "An 85 or higher **may be a sign that** you are ready to take on new challenges.
> Scores below 70 **indicate that you may benefit from** prioritizing rest and
> recovery in the indicated areas."

Both hedged (`may be a sign`, `may benefit from`), both **action-framed** rather
than state-framed, and the low-score sentence offers a remedy in the same clause
as the diagnosis. Note it says "in the indicated areas" — pointing at the
contributors, so the user is routed to something specific rather than left with a
bad number.

### The anti-perfectionism line `[observed]`

> "Some variation in your Readiness Score is a good thing. It shows you're
> challenging your body in healthy ways. A manageable amount of stress can help
> build metabolic and cardiovascular strength. The key is to push yourself,
> recover, and repeat this cycle to support long-term well-being."

Placed inside `What Is a Good Readiness Score?` — i.e. inside the answer to the
question an optimising user asks. It tells the user that a consistently high
score would itself be a signal of under-challenge. **A metric product explicitly
telling users not to maximise the metric** is the single most transferable
anti-pattern-avoidance move in this batch.

### The crown `[observed]`

> "On days when your Readiness, Sleep, or Activity Score is 85 or higher, you'll
> see a crown icon next to your… Score."

A reward marker with a stated threshold, documented identically in three
articles. Notably it is the *only* gamification element found: no streak, no
badges, no levels, no social comparison. Compare Headspace's `run streak` and
Calm's `streak` — Oura has no consecutive-day mechanic at all, which is
consistent with a product whose thesis is that variation is healthy.

### Named level sets, one per metric, each with its own vocabulary `[documented]`

| Metric | Levels | Note |
|---|---|---|
| Sleep / Readiness / Activity Score | `Optimal` · `Good` · `Fair` · `Pay Attention` | Shared 0-100 scale |
| Resilience | `Exceptional` · `Strong` · `Solid` · `Adequate` · `Limited` | Five levels, no number shown |
| Symptom Radar | `No signs` · `Minor signs` · `Major signs` | Evidential, not evaluative |
| Nighttime Breathing | `Steady` · `Mostly steady` · `Varied` · `Highly varied` | Descriptive of pattern, not quality |
| Cardiovascular Age | `Below` · `Aligned` · `Above` | Relative to actual age |
| Daytime Stress load | `low` · `moderate` · `high` | |
| HRV rating (Trends) | `pay attention` · `fair` · `good` · `optimal` | Lowercase variant of the score bands |
| Cuff Readings | `Normal` · `Elevated` · `High` | **Borrowed from the American Heart Association** |
| Health Radar states | `Calibrating` · `Missing Sleep Data` · `Insufficient Sleep Data` · `Calculating` · `actively monitoring` | See T8 |

**Five different vocabularies for five different kinds of judgement**, and the
choice of vocabulary encodes how much interpretation the product is willing to do:

- Where Oura is measuring *its own construct* (Readiness, Resilience) it uses
  evaluative adjectives it invented and defined.
- Where Oura is detecting *a possible physiological event* (Symptom Radar) it
  uses **evidential language** — `signs`, not `illness`. The user is told what
  the data shows, not what it means.
- Where Oura is describing *a pattern over time* (Nighttime Breathing) it uses
  **descriptive** language — `Steady` / `Varied` — which carries no valence at
  all until the accompanying sentence supplies one.
- Where a recognised clinical standard exists (blood pressure) it **borrows the
  standard's labels and attributes them** rather than inventing its own.

That four-way rule — invent for your own construct, use evidential language for
detection, use descriptive language for patterns, borrow and attribute for
clinical standards — is the most portable thing in this file.

### Low-level copy, written in full `[documented]`

Resilience, lowest two levels:

> **Adequate:** "You're hanging in there, but your resilience is not quite where
> you want it to be long-term. Check in on your balance of physiological stress
> and recovery to see if there's a small adjustment that could help"

> **Limited:** "There's a clear gap between the recovery your body is getting and
> the recovery it needs to balance your recent levels of physiological stress"

`You're hanging in there` is colloquial and validating before the correction
lands. `Limited` gets no colloquialism at all — it is a bare factual gap
statement with no adjective and no instruction. **The tone flattens as the
reading worsens**, which is the Wise gradient applied to health data: the worse
the news, the plainer the sentence.

Nighttime Breathing, worst two levels:

> **Varied:** "This can suggest that you've experienced breathing disturbances on
> several nights. Lifestyle factors or a recent illness can sometimes contribute
> to this. If you've noticed daytime fatigue, morning headaches, or snoring, it
> may be worth discussing with your healthcare professional."

> **Highly varied:** "…This is worth paying attention to, especially if you've
> noticed daytime fatigue, morning headaches, or snoring. Consider reaching out to
> a healthcare professional…"

Structure: hedge (`can suggest`) → benign alternative explanations →
**symptom-conditional referral**. The referral is gated on symptoms the user can
check themselves, which converts an alarming number into a self-assessment the
user can complete before deciding whether to worry. The escalation from
"may be worth discussing" to "Consider reaching out to" is a single, measured
step — not a jump to urgency.

### `Rest Mode` — the product's own off-switch `[documented]`

> "During rest mode, you won't be given a daily activity goal, and your activity
> score and activity-related contributors are hidden… Rest mode is designed for
> days when the body and mind need time to rest, due to stressors such as an
> illness, injury, or jet lag."

Activity scoring and goals **stop existing** while it is on; movement, steps and
calories still display. Symptom Radar keeps monitoring underneath. And the
Symptom Radar copy actively recommends it: "If needed, you can enable Rest Mode."

A fitness product that will delete its own goal and hide its own score when the
user is unwell — and whose illness-detection feature recommends doing so — is the
clearest available example of designing against your own engagement metric.

## T7 Error, failure & recovery

`[documented]` — and Oura's distinctive move is that **data-quality failures are
explained physiologically rather than technically.**

**Symptom Radar troubleshooting** `[observed]`, three states with three causes:

| State | Published explanation |
|---|---|
| `Calibrating` / `Missing Sleep Data` | not enough nights yet — "Keep wearing your ring at night to help the feature gather enough data" |
| `Insufficient Sleep Data` | "your ring **was** worn, but something disrupted the data collection. Your ring might have been too loose, or your sleeping position may have restricted blood flow (like if your arm went numb)." |
| `Calculating` for an extended period | profile details incomplete — check `My Profile` |

`Insufficient Sleep Data` is the one to steal. The copy **distinguishes it from
`Missing Sleep Data`** in the same list, credits the user ("your ring was worn"),
gives two concrete physical causes, and offers two concrete fixes (different
finger, different sleep position). "like if your arm went numb" is a lay
explanation of a vascular mechanism, in six words, that a user can immediately
recognise from experience.

**Known-limits sections, published per feature** `[observed]` — `Things to Keep
in Mind` is a recurring named section, and it enumerates where the feature does
not work:

- Symptom Radar: "it's not always perfect. **You may receive a warning even if you
  feel fine or feel unwell without seeing a warning.**" — both false-positive and
  false-negative stated, in one sentence, in the user's terms.
- Symptom Radar: "may not work optimally with pre-existing medical conditions";
  "Pregnancy also impacts biometric baselines and may reduce the accuracy"
- Cardiovascular Age: "results may not be valid for users with certain medical
  conditions, including heart diseases, neurodegenerative diseases, or pacemakers"
- Blood Pressure Signals: "If you're pregnant or managing a heart condition, this
  feature may not be right for you"
- Oura Advisor: "it may occasionally generate unexpected responses"

**Contradiction between the product's own outputs is pre-empted** `[observed]`:

> "Readiness and Symptom Radar use some of the same data, but they serve different
> purposes, so their results won't always match. Readiness Score can remain high
> even when there are signs of something straining your body."

And against an external authority:

> "If your Blood Pressure Signals result differs from your doctor's assessment,
> that's expected, as they're measuring different things in different ways. Always
> follow your healthcare provider's guidance."

Both are the same move: **name the disagreement before the user finds it, explain
why it is expected, and say which source wins.** For the doctor case the answer
is unambiguous — the doctor wins. This is the health-data equivalent of Wise's
article reconciling "complete" with "the money hasn't arrived": a deliberate piece
of content written for the gap between two true things.

**Trust-and-integrity content** `[observed]`: `Restricted Mode` is documented as
an anti-theft state ("protects your information in case an unwanted party gets a
hold of your Oura Ring"), requiring a factory reset to clear.

**Advisor recovery** `[documented]`: force-close → switch Wi-Fi/cellular →
retry; then close Advisor, run a complete data backup, reopen. And a permanence
warning: "You can delete a thread from your conversation history, but be aware
that this action is permanent. Deleted threads cannot be recovered."

## T8 Empty states

`[documented]` — and Oura has more named, explained empty states than any other
product in this batch, because a sensor product has a structural no-data problem.

Named states: `Calibrating` · `Missing Sleep Data` · `Insufficient Sleep Data` ·
`Calculating` · and the neutral monitoring state for Blood Pressure Signals:

> "When no patterns are detected, the feature stays in a neutral 'actively
> monitoring' state with **no result displayed**."

**Deliberate no-result-as-a-state** is a strong pattern for a detection feature.
Rather than showing "Normal" or a green tick — which would be a reassurance the
product is not entitled to give — it shows nothing and names the nothing
"actively monitoring". The user learns that absence of a notification is the
expected condition, which prevents both false reassurance and anxious re-checking.

Compare Symptom Radar, which *does* show a bottom level: `No signs` — "There are
no obvious signs in your biometrics of something straining your body." The hedge
`obvious` is carrying the load. So the two features make opposite choices about
whether to display a negative result, and both are defensible on their own terms;
recording both together is the useful artefact.

`Rest Mode` is also, functionally, a **user-invoked empty state**: the Activity
Score and goal are hidden by request.

## T9 Notifications & system messages

`[documented]` — notification design is documented as user-facing content
(`Managing Your Notifications`), and several notification behaviours are described.

- **Surface**: "Any patterns worth your attention will show up in the **Today tab**."
  Health Radar notifications are pull, not push, by default — the user encounters
  them when they open the app.
- **Frequency discipline**: Blood Pressure Signals — "You'll **only** be notified
  in the Today tab if a pattern worth your attention is detected." Nighttime
  Breathing — notification "At the end of each 30-day period… if your breathing
  has shown a notably varied pattern on several nights", with an off-switch:
  "You can turn off these notifications anytime from the Nighttime Breathing view."
- **`inactivity alert`** (glossary): "Oura tracks the time you spend sitting,
  standing, or otherwise passive, and guides you with a push notification to break
  up long periods of inactivity." The Activity Score article calls this
  "a **friendly reminder** to get your blood flowing after 50 consecutive minutes
  of inactivity" — and it is opt-in ("You can enable inactivity alerts in your
  settings if you'd like to receive…").
- **`Check-in Notifications`** for Oura Advisor: "Set how often and when you'd
  like to get them."
- **HRV balance insights** "will sometimes appear on your home screen to inform
  you of ideal days to engage in challenging, light, or limited activity."

**Every notification type found is either opt-in or has a documented off-switch.**
For a product monitoring a user's body continuously, that is the correct default
and it is stated in the copy rather than buried in settings.

The one place a push is described as arriving unbidden is the inactivity alert,
and the copy softens it twice — `guides you`, `friendly reminder` — and gates it
behind an explicit enable.

## T10 Disclosures, legal & compliance

**Priority section. Oura's disclaimer architecture is the most transferable
artefact in this batch of five**, because the boundary is enforced at five
different scopes with five different wordings.

### The five disclaimer variants, and where each sits `[observed]`

**1. Product-level, at the foot of individual feature articles** — the canonical
sentence, found verbatim on both `Oura Advisor` and `Cardiovascular Age`:

> "Oura Ring is **not a medical device** and is not intended to diagnose, treat,
> cure, monitor, or prevent medical conditions or illnesses. Please do not make
> any changes to your medication, nutrition, or workouts without first consulting
> your doctor or another medical professional."

Two sentences: a status declaration, then a **behavioural instruction**. The
second sentence is the useful one — it names the three specific actions a user
might take on the basis of a reading (medication, nutrition, workouts) and gates
all three behind a clinician. Most wellness disclaimers stop at the status
declaration and never tell the user what not to do.

Placement differs between the two articles: on `Oura Advisor` it sits **above**
the table of contents, before any content; on `Cardiovascular Age` it sits at the
**end** of `Things to Keep in Mind`, after the guidance. The same string, two
positions, in the same help centre.

**2. Feature-suite level, as a numbered legal footnote on the homepage** — the
longest variant, six verbs:

> "Health Radar features are intended for **general wellness purposes only**. They
> are not intended to diagnose, treat, cure, **mitigate**, monitor, or prevent any
> disease, illness, or medical condition, and they do not provide medical advice.
> Do not use Health Radar information to replace clinical assessment, make medical
> decisions, or delay, stop, or modify medical care. If you have health concerns,
> consult your doctor or another qualified healthcare professional. If you think
> you may be experiencing a medical emergency, seek emergency medical care
> immediately."

**Record the verb-list difference precisely**: the homepage footnote uses
*diagnose, treat, cure, **mitigate**, monitor, prevent* (six); the article-level
sentence uses *diagnose, treat, cure, monitor, prevent* (five, no `mitigate`).
`Mitigate` is one of the statutory verbs in the US device definition, so its
presence in the marketing footnote and absence in the help-article sentence is a
real inconsistency in a legally-loaded list, and worth flagging rather than
smoothing over.

The footnote's third sentence is the operational one and the best-written
disclaimer clause in this entire batch: **"Do not use Health Radar information to
replace clinical assessment, make medical decisions, or delay, stop, or modify
medical care."** It enumerates four specific harmful behaviours —
replace / decide / delay / stop-or-modify — rather than issuing a general warning.
"Delay" is the one most products omit and the one that most often does the harm.

It closes with an emergency escalation: "If you think you may be experiencing a
medical emergency, seek emergency medical care immediately."

**3. Feature level, italicised, inside the article body** — Health Radar:

> *"Health Radar does not diagnose or monitor any conditions, or replace medical
> care. Guidance from your healthcare professional always comes first, especially
> if you're pregnant or have existing health conditions."*

Shorter, warmer, and with a **priority rule** rather than a prohibition:
"Guidance from your healthcare professional always comes first."

**4. Sub-feature level, written to pre-empt a specific misreading** —
Nighttime Breathing:

> "Nighttime Breathing does not diagnose or monitor any conditions, and is not a
> replacement for medical care. **If your pattern gives you pause, know that
> breathing disturbances during sleep are common** — and a conversation with your
> healthcare professional is always a good place to start."

This one is unusual and worth quoting at length in any review. It **acknowledges
the emotional response** ("if your pattern gives you pause"), **normalises the
finding** ("breathing disturbances during sleep are common"), and then routes to a
conversation rather than an investigation. Disclaimer, reassurance and referral in
one sentence, in that order — and the referral is framed as "a good place to
start", not a warning.

**5. Sub-feature level, negating a specific capability the label implies** —
Blood Pressure Signals:

> "This feature **does not measure actual blood pressure in mmHg**. It analyzes
> patterns in nighttime PPG signals; **it does not measure or display blood
> pressure values**."

and later:

> "Blood Pressure Signals **cannot diagnose or rule out** any condition. This
> feature is for wellness use only."

The feature is named after a clinical measurement it does not take, so the copy
negates the implication twice, in consecutive sentences, using both the unit
(`mmHg`) and the capability (`measure or display… values`). **`cannot diagnose
or rule out`** is the precise form — most disclaimers say "cannot diagnose" and
leave the far more dangerous inference (a negative result means you're fine)
untouched. Naming the rule-out is the better practice.

### The disclaimer design rule, extracted

Oura scopes the disclaimer to the claim being made:

| Scope | Where it sits | What it does |
|---|---|---|
| Whole product | Foot of feature articles | Declares non-device status + forbids three specific actions |
| Feature suite | Numbered homepage footnote, keyed from a `[*]` marker | Full statutory verb list + four forbidden behaviours + emergency escalation |
| Feature | Italic, mid-article | States priority: clinician first |
| Sub-feature (pattern) | End of the level definitions | Normalises + routes to a conversation |
| Sub-feature (measurement) | Immediately after the feature name | Negates the capability the name implies |

The rule is: **the more specific and more alarming the number, the closer and
warmer the disclaimer.** The legalese is on the marketing page where a regulator
looks; the human sentence is next to the frightening result where the user looks.

### Metric-explanation practice `[observed]`

Every score article follows the same five-part template:

1. `What Is the <X> Score?` / `How Oura Measures Your <X> Score` — mechanism
2. `What Is a Good <X> Score?` — the band table, identical across all three
3. `What Is the Crown Icon?` — the reward, identical across all three
4. `How to Improve Your <X> Score` — numbered, actionable
5. `Factors That May Decrease Your <X> Score` / `More Information`

Section 5 on Readiness is the notable one — a published list of **six things that
lower your score and why**, each with both directions explained. For example:

- RHR: "A higher-than-usual RHR suggests that your body is over-challenged and not
  recovering properly. A lower-than-usual RHR may indicate low arousal of your
  nervous system, meaning your body isn't being challenged enough… This could lead
  to feelings of lethargy."
- HRV: "Significantly **higher**-than-normal HRV might indicate low nervous system
  arousal. **Lower**-than-normal HRV can be a sign of excessive stress or strain."

**Both tails of every distribution are explained.** A user with an unusually
*good*-looking number is told what it might mean too. This prevents the standard
failure mode of consumer biometrics, where users optimise one direction of a
metric that is actually U-shaped.

**Normal ranges are published, with an external authority where one exists**
`[observed]`:

- "Average resting heart rates between 40-100 beats per minute (BPM) are
  considered normal."
- "For long-term averages, temperatures between 95.9 - 99.3°F (35.5 - 37.4°C) are
  considered normal."
- "According to the **American Academy of Sleep Medicine** guidelines, the average
  adult (18+ years) needs 7-9 hours of sleep per night for optimal health."
- Cuff Readings labelled with **American Heart Association** ranges.

Citing AASM and AHA by name, for exactly the two figures where a population norm
exists, is the right allocation of external authority — Oura borrows credibility
only where it is borrowing a standard.

### Subscription and cancellation `[observed]`

Pricing is stated inline: "$5.99 USD/month… New members get their first month
free", with a `[*]` to a footnote giving **per-market pricing for eight
territories** including whether the figure is before or after tax
(US and Canada "before tax"; EU, AU, JP, UK, CH, RoW "after tax"). Publishing the
tax-inclusivity per market, in the footnote, is precise and unusual.

The cancellation FAQ on the pricing page:

> `Can I cancel my Oura Membership at any time?`
> "You can cancel your Oura Membership whenever you choose by logging into the
> Membership Hub. Please note, you will still have access to the full membership
> experience until the end of the current billing cycle. If you cancel but do not
> delete your account, your personal data will continue to be processed in
> accordance with our Privacy Policy."

Three beats: permission → what you keep → **a data consequence most products
would omit.** Telling a cancelling user that cancelling is not deletion, on the
pricing page, is the honest version.

Two further FAQs address the real anxieties of a hardware-plus-subscription model:

> `What if I don't want to pay a monthly subscription? Will my Oura Ring still work?`
> — answered with "your Oura Ring and Oura App will still function, but the
> insights… will be much more limited." The degradation is admitted, not hidden.

> `Will I lose my Oura data if I cancel?`
> — "No." Data and account remain; re-enrolling restores access immediately; and
> **"Even without a membership, you can export all of your Oura data in CSV format
> through the Membership Hub."**

**Unconditional data export for lapsed customers**, stated on the pricing page, is
a strong trust signal and directly relevant to any subscription product holding
user-generated data.

### Privacy and data `[observed]`

Trust Center principles: `Privacy is not a feature` · `We do not sell your data` ·
`You are in control`. The commitment on the membership page is one sentence:
"we don't sell your data, and we'll never share it without consent."

The AI position is stated separately and specifically:
**`We don't sell or share your data to train other AI models`** — "While Oura may
use data to improve our own AI-powered features, we do not share or sell your
personal data. That includes third-party AI models (LLMs)." The carve-out (our own
models, yes; third-party LLMs, no) is disclosed rather than elided.

**The legal-request stance is published**: `We stand guard over your data, no
matter who's asking` — "Oura will oppose, seek to narrow, or reject overly broad,
unsupported, or legally deficient data requests, especially when sensitive info is
involved", linked to a reproductive-health commitment post. For a product holding
`Cycle Insights` and `Pregnancy Insights` data, stating a litigation posture is a
substantive disclosure, not a slogan.

**Member controls, each named**: `App Lock` (biometric re-auth after backgrounding)
· personalization preferences · marketing preferences, with the guarantee
"Your choice never changes the insights you get from Oura" (i.e. marketing consent
is not bundled to product value) · deletion, "all of it, or just the data from a
specific time period" · consent withdrawal for integrations · `Reset Advisor`
(erases "all accumulated data, memories, and settings within the feature").

**Certifications** are listed with what each one means in one sentence each:
`SOC 2` · `HITRUST` · `PenTests` · `NIST Frameworks`, plus a public security
whitepaper PDF, a Vanta trust portal, a bug bounty via Intigriti, and two named
addresses (`dataprotection@ouraring.com`, `security@ouraring.com`).

## T11 Help-centre architecture

Custom Next.js front end over Zendesk (article attachments still resolve to
`ouraringhelp.zendesk.com`). Three levels: Category → Section → Article.

**Every article carries `Last updated: <date>`** in the byline position — no
author name, unlike Calm. Dates observed in this harvest span May 2026 to
September 2026, i.e. the metric corpus is actively maintained. The Sleep Score
article contains a **dated forward-looking behaviour note**:

> "Rolling out to members starting September 10, 2026: sleep data can sync and
> calculate without opening the Oura App first…"

Publishing a rollout date inside the metric article, so a user can tell whether
their app should behave the new way yet, is good release-communication practice.

**Article structure is templated across the metric corpus** `[observed]` — every
feature article opens with an **availability block** before any explanation:

> - Gen3 or later **with** active membership
> - iOS / Android
> - This feature is **not** available on Gen2 or older.
> - "This feature is currently only available in English. If you'd like to use it,
>   try setting your phone language to English."

Hardware generation, membership state, platform, and language are all gated and
stated **before** the user reads about a feature they may not be able to use.
Health Radar adds geography: "eligible members in the US, India, and United Arab
Emirates."

Then a **table of contents with anchor links**, then the sections, then
`More Information` — a mixed list of help articles and blog posts, clearly labelled
by destination.

**Article-title grammar is overwhelmingly bare noun phrases** `[observed]`:
`Readiness Score` · `Sleep Contributors` · `Sleep Debt` · `Heart Rate Variability` ·
`Cardiovascular Age` · `Rest Mode` · `Resilience` · `Glossary` · `Meals` ·
`Cumulative Stress`. The exceptions are procedural: `Record a Workout with Oura` ·
`Set Up the Oura App` · `How to Use the Oura App` · `Caring for Your Oura Product` ·
`Enable Automatic Firmware Updates` · `Purchase with HSA or FSA Funds`.

**The rule is: name the thing if the user is asking what it is; use a verb if the
user is asking how to do it.** Because most Oura questions are "what does this
number mean?", the noun-phrase title is correct and the titles read as a glossary
index. This is the inverse of Wise (mostly questions) and Calm (mostly
keyword-stuffed task titles), and it is right for the domain.

**In-section duplication is a defect**: the glossary's `Activity Score` and
`Sleep view` entries both link to the **Readiness Score** article URL, and the
`sleep timing` entry links to Readiness too. Three broken cross-references in one
glossary, all pointing at the same wrong article.

**Routing furniture**: `Finn` (24/7 virtual assistant) offered first, then
self-service tools, then 24/7 chat and bookable phone. **No "Was this article
helpful?" widget was observed** on any Oura article — the one piece of feedback
furniture that Headspace and Calm both ship prominently.

## T12 FAQs

**Two placements, both on non-help pages, both short and both about anxieties
rather than features.**

### Membership page — six questions `[observed]`

| # | Question |
|---|---|
| 1 | Do I need an Oura Ring to use this Membership? |
| 2 | I'm upgrading to a new Oura Ring. Can I use my current Oura Membership? |
| 3 | Can I cancel my Oura Membership at any time? |
| 4 | What if I don't want to pay a monthly subscription? Will my Oura Ring still work? |
| 5 | When does my Oura Membership start? |
| 6 | Will I lose my Oura data if I cancel? |

**Four of six are about leaving or not paying.** Q3, Q4 and Q6 are consecutive
and they are, in order: can I cancel / what happens if I don't subscribe / do I
lose my data. On a page whose job is to sell a subscription, half the FAQ is
devoted to the exit. Q1 is answered with a flat "Yes" (you do need the hardware) —
a purchase prerequisite stated without softening.

Q4 is the honest one: the answer admits the un-subscribed product is materially
worse ("much more limited"). Q6's answer volunteers CSV export.

### Trust Center — seven questions `[observed]`

| # | Question |
|---|---|
| 1 | What types of data does Oura Ring track? |
| 2 | Does Oura sell health data to third parties? |
| 3 | Does Oura gather location data? |
| 4 | What data protection laws does Oura comply with? |
| 5 | Can Oura access my electronic health records? |
| 6 | Does Oura feature member health data in marketing? |
| 7 | Where can I learn more about Oura's privacy practices? |

Q2 is answered with a triple negation: "**No**, we do not sell health data. We
don't rent it, either. And we do not share it with third parties… without your
consent." Closing the adjacent loopholes (rent, share) in the same breath as the
denial is the correct form — "we don't sell your data" alone is the phrase that
has been devalued by overuse across the industry.

Q6 is a question almost no product asks itself, and the answer discloses the
aggregate-data carve-out with a concrete example ("which countries have the
highest average Sleep Score").

Q1's answer doubles as a **metric taxonomy**, grouping the ~50 tracked metrics
under the seven pillars — which makes the privacy FAQ the best single summary of
what the product actually measures.

Q4's answer is the weakest on the page: "applicable data protection laws in the
markets where we operate across Europe, the Americas, and Asia Pacific", with
HIPAA named only for the healthcare-partner case. **No regime is named for the
consumer product.** For a Finnish company, the absence of "GDPR" from a FAQ
literally asking which laws it complies with is a notable omission.

## T13 Terminology & glossary

**Oura publishes a public `Glossary` with roughly fifty defined terms — the
richest T13 artefact in the corpus so far.** Each entry states which score the
term contributes to, in a bracketed link, so the glossary doubles as a model
diagram.

### The three daily scores and their contributor sets `[observed]`

| Score | Definition (verbatim, glossary) | Contributors |
|---|---|---|
| `Sleep Score` | "an overall measure of how well you slept… ranges from 0-100" | total sleep time, sleep efficiency, sleep latency, restfulness, deep sleep, REM sleep, sleep timing |
| `Readiness Score` | "measures how well recovery and movement are in balance" | resting heart rate, HRV balance, body temperature, recovery index, sleep, sleep balance, sleep regularity, previous day activity, activity balance (**nine**) |
| `Activity Score` | "an overall measure of your activity, training, and recovery balance… takes into account your activity levels over the previous 7 days" | stay active, move every hour, meet daily targets, training frequency, training volume, recovery time (**six**) |

### The coined terms and what they reject

| Term | Oura's definition | The alternative it rejected |
|---|---|---|
| `contributor` | "Your Sleep, Readiness, and Activity Scores are the sum of different contributors." | "factor", "component", "input" — `contributor` implies partial, additive influence rather than causation |
| `Readiness` | how prepared the body is for the day | "Recovery" (Whoop), "Body Battery" (Garmin), "Energy" |
| `balance` (as a suffix: `HRV balance`, `Sleep balance`, `Activity balance`) | a 14-day average compared to a 2–3 month average | "trend", "delta", "variance" — `balance` implies an optimum in the middle, not a maximum |
| `Resilience` | "an estimate of your ability to withstand physiological stress and recover from it over time" | "stress score", "recovery score" |
| `Cumulative Stress` | long-term stress construct | |
| `Daytime Stress` | physiological stress during waking hours | — note **`physiological stress`** is used throughout, never bare "stress" |
| `restorative time` | "Resting time that has helped in your recovery." | "rest", "downtime" |
| `Restful Periods` / `Restorative Time` | two separate named articles | |
| `recovery index` | time spent sleeping after RHR reaches its nightly low; optimal requires ≥6 hours after that point | |
| `sleep debt` | dedicated article and metric | |
| `sleep regularity` | consistency of bed/wake times over two weeks; "not impacted by any naps" | |
| `sleep timing` | "optimal and aligned with the sun when the midpoint of your sleep falls between midnight and 3:00 am" | |
| `Rest Mode` | activity goal and score suspended | "pause", "recovery mode" |
| `Restricted Mode` | anti-theft lockout | |
| `Symptom Radar` · `Health Radar` · `Nighttime Breathing` · `Blood Pressure Signals` | detection features — note **`Signals`** and **`Radar`**, both of which connote *detection of something possibly present*, not measurement | "monitor", "detector", "test" |
| `Cardiovascular Age` (`CVA`) | "an estimate of the health of your cardiovascular system in relation to your actual age" | "heart age", "biological age" |
| `Cardio Capacity (VO2 Max)` | coined name with the clinical term in parentheses | VO2 Max alone |
| `Crown` | the 85+ reward icon | "badge", "streak" |
| `activity goal` | "a calorie burn target translated to a walking distance" — explicitly **not** real distance travelled | "step goal" |
| `total burn` / `active calorie burn` | total daily expenditure vs the portion above 1.5 MET | "calories" undifferentiated |
| `MET` | defined in full: "Metabolic Equivalent… If the MET value of a specific activity is 4, it means that you're burning four times as many calories as you would burn while resting." | using MET without glossing |
| `IBI` (interbeat interval) | defined and labelled "a scientific term" | |
| `Member` | the person, throughout — `Oura Member Care`, `5+ Million Oura Members` | "user", "customer", "wearer" |
| `Finn` | the virtual assistant | "chatbot", "assistant" |
| `Oura Advisor` | the AI companion — "AI-powered health companion" | |
| `Connected Care` | the named partner-referral construct (ResMed, Counsel Health) | "referrals", "partners" |
| `Oura Labs` | experimental-features surface | "beta" |
| `Tags` | "Comments you can add to your daily routines" | "notes", "journal" |

### Two terminology decisions worth extracting

**1. `physiological stress`, never "stress".** Across Resilience, Daytime Stress,
and the Readiness contributors, the noun is modified every time. The product
measures autonomic markers, not emotional state, and the adjective keeps the
claim inside what the sensor supports. A user reading "your physiological stress
is high" cannot reasonably infer that the ring knows they are unhappy.

**2. Oura refuses the step goal.** `[observed]`, from the Activity Score article:

> "**There is no step count goal as a feature of your Oura experience**; rather,
> the focus is on comparing steps to your own baseline."

with the accompanying `activity goal` glossary entry explaining that the displayed
distance "is not the real distance traveled, but the equivalent walking distance
of all your daily activity. It's a calorie burn target translated to a walking
distance."

Two things are happening. Oura is **explicitly rejecting the category's most
recognisable metric** (the 10,000-step norm) and saying so in the copy rather than
silently omitting it. And it is **disclosing that a number it does display is a
translation, not a measurement** — the distance figure is a unit conversion of a
calorie target, and the glossary says so plainly rather than letting the user
assume they walked that far.

Both are instances of the same principle: *do not let a familiar unit imply a
measurement you did not take.* That principle also produced the `mmHg` negation
in Blood Pressure Signals (T10) and the PWV hedge in Cardiovascular Age
("Although Oura Ring does not directly measure your PWV, your photoplethysmograph
(PPG) waveform is used to **estimate** your CVA").

## T14 Voice, tone & accessibility

**Person and tense.** Second person, present tense, possessive throughout —
`your Readiness Score`, `your body`, `your baseline`, `your own baseline`,
`your personal averages`. The possessive is doing structural work: almost every
metric is defined **relative to the individual**, and the pronoun enforces that
reading before the mechanism explains it.

First-person plural is used sparingly and mostly in trust content
("We do not sell your data", "We stand guard over your data", "we recommend").

**Register.** Clinical vocabulary is used freely but **always glossed on first
use or in the glossary** — PPG, PWV, MET, IBI, HRV, RHR, BPM, latency, efficiency,
parasympathetic. Oura does not dumb down; it defines. This is a defensible
strategy for a product whose users self-select as data-interested, and it is
supported by a genuine glossary rather than assumed.

Sentences are medium-length and declarative. Very few contractions in the metric
articles; more in the marketing copy. **Almost no exclamation marks** anywhere.
No emoji (contrast Calm's `⚠️`).

**The tone gradient runs by stakes, precisely.**

| Surface | Register |
|---|---|
| Hero | fragmentary, aspirational (`Subtle. Power.`) |
| Benefit copy | imperative, confident (`Own your health`) |
| Score explanation | neutral, mechanical, hedged (`may be a sign`) |
| Low-score copy | colloquial-then-flat (`You're hanging in there` → bare gap statement) |
| Detection findings | evidential and normalising (`signs`, `breathing disturbances during sleep are common`) |
| Disclaimers | statutory on marketing, warm in-article |

**Copy that risks encouraging unhealthy behaviour — findings in both directions.**
Oura is, on the evidence of this harvest, the most carefully-designed product in
this batch on this axis.

*Mitigations observed:*

1. **`Pay Attention` as the bottom band.** An instruction, not a verdict. No
   negative adjective exists anywhere in the score vocabulary.
2. **"Some variation in your Readiness Score is a good thing."** Explicit
   anti-maximisation copy, placed in the answer to "what is a good score?".
3. **No streak.** No consecutive-day mechanic, no badges, no levels, no social
   comparison, no leaderboard. The only reward is the crown, which is a
   per-day threshold marker, not a chain that can break.
4. **`Rest Mode`** hides the Activity Score and removes the goal entirely, and the
   illness-detection feature recommends enabling it.
5. **Both tails of every metric are explained.** Unusually high HRV, unusually low
   RHR, and high Activity Balance are all described as potential problems. A user
   cannot read "more is better" off the documentation.
6. **The step goal is refused outright**, and the reasoning is published.
7. **"If your CVA is higher than your actual age, don't focus on the absolute
   number. Instead focus on the relative trend of your CVA over time."** —
   direct instruction not to fixate on the most upsetting number the product
   produces, placed first in that metric's `Things to Keep in Mind`.
8. **"A single reading is just a snapshot."** (Cuff Readings) — one sentence
   defusing over-interpretation of a single data point.
9. **Under-activity is treated as a problem equal to over-activity** — "Lower
   Activity Balance may indicate that you are not challenging your body enough";
   "training overload *or* underload". The copy does not have a single preferred
   direction.
10. **Notifications are opt-in or switchable off**, including the illness and
    breathing alerts.
11. **Normalising language at the frightening moments** — "breathing disturbances
    during sleep are common", "This is common and generally not a cause for
    concern" (Mostly steady).

*Risks observed:*

1. **The testimonials carry the medical claims the copy cannot** (T2). "it saved
   my life" and an A-fib diagnosis, on the homepage and pricing page, in a product
   whose every feature article says it cannot diagnose. This is the most
   significant tone-and-claim finding in the file.
2. **`Cardiovascular Age` is an inherently distressing frame.** Telling a
   43-year-old their cardiovascular system is "Above" — six or more years older
   than they are — is a number engineered to alarm, derived from an estimate of an
   estimate (PPG → estimated PWV → CVA). The mitigating copy is good but arrives
   after the number, and the `Above` label itself carries no hedge.
3. **`86% of Oura Members see their health improve`** is a perception measure
   presented at hero scale with the qualification in a footnote. Correctly
   footnoted, but the headline reads as an outcome.
4. **Score-chasing is structurally possible** despite the anti-maximisation copy —
   the Activity Score article gives precise optimisation targets ("Keep your total
   inactive time below 8 hours", "2,000-3,000 calories of medium-to-high-intensity
   activity per week", "five or more times per week"), which a user inclined to
   over-exercise can read as a floor rather than a guide. The balancing sentence
   ("The goal is to alternate between pushing yourself and allowing time to
   recover") arrives after the targets.
5. **`Symptom Radar` monitors continuously and cannot be reasoned with** — the
   copy acknowledges false positives ("You may receive a warning even if you feel
   fine") but a health-anxious user receiving `Major signs` has no in-copy route
   other than rest. There is no crisis or reassurance escalation comparable to
   Headspace's crisis directory.
6. **The `Below` / `Aligned` / `Above` CVA labels have no verbal cushion** the way
   the Resilience and Nighttime Breathing labels do. Three bare prepositions
   delivering an ageing verdict.

**Accessibility content** `[observed]` — **the best artefact in the batch, and it
is also an admission of substantial non-conformance.**

Oura publishes two accessibility documents:

- `/accessibility` — a two-paragraph commitment statement scoped to shopping
  ("We believe all of our clients should be able to successfully shop online"),
  with no standard named, no date, and no contact address beyond a link to
  support. On its own this would be the weakest statement in the batch.
- `/accessibility/en` — a **full EU-format accessibility statement**, published
  **July 14, 2026**, for the Oura online store, "based on self-assessment and an
  evaluation conducted by an external expert organization."

The second document is the significant one. It declares:

> "The service **partially complies** with the accessibility requirements."

and then **enumerates roughly twenty-five specific failures, each tagged with the
WCAG success criterion number**, grouped by page region — Header, Footer, Payment
method section, Image links, The entire service, Other known issues. Examples:

- "Footer headings are not marked as headings. (1.3.1)"
- "Ring size selection is indicated using color alone. (1.4.1)"
- "The contrast between the text and the background is not always sufficient. (1.4.3)"
- "The skip link on the Oura Ring 4 page does not move the focus to a correct location. (2.4.3)"
- "The accessible name of the 'Add to cart' button in the shopping cart does not match the visible label. (2.4.6)"
- "There are deficiencies in the error messages of the payment card fields. (3.3.1)"
- "Some text alternatives are in English. (3.1.2)"

It commits to a remediation date — "We aim to address the key issues by
**October 31, 2026**" — states a **14-day response SLA** for accessibility
feedback, and names the escalation route: the **Finnish Transport and
Communications Agency (Traficom)**, Digital Accessibility Supervision Unit, with
its URL, email and telephone switchboard.

**This is what an accessibility statement should look like**, and it exists
because EU law requires it rather than because Oura chose the format. Three
points for a content designer:

1. **The legally-mandated artefact is more useful than the voluntary one.** Oura's
   self-authored `/accessibility` page is vague; the EU-format one at
   `/accessibility/en` is specific, dated, scoped, quantified, and appealable. The
   same asymmetry Wise exploits with its regulator-format fee table — except here
   the compliant artefact is strictly better content, and it is the one buried a
   click deeper.
2. **Publishing your defects with SC numbers and a fix date is a trust artefact,
   not a liability.** It also independently corroborates several findings made
   elsewhere in this file from the markup alone (unclear link text, English-only
   alt text, focus-order problems).
3. **The scope is narrow and stated.** The statement covers the **online store
   only** — browsing, ring selection, cart, checkout, membership purchase. The
   Oura App, where all the health content lives, is not covered by any published
   statement found. That is the gap a reviewer should flag first.

**Other accessibility observations** `[observed]`:

- **Alt text on the marketing site is genuinely descriptive and scene-level** —
  "A Gold Oura Ring 5 resting on a textured dark rock, with a red ladybug perched
  on its edge against a soft, neutral background." · "A person in bed wearing a
  sleep mask and a Black Oura Ring holds a smartphone in front of their face." ·
  "Holding hands each wearing an Oura Ring 5". This is markedly better than
  Headspace's filename-derived alt and Calm's category-generic alt.
- **But a decorative hero image carries `alt` with an empty `src`** (`![A Gold
  Oura Ring 5 …](<>)`), and several gallery images carry raw CMS handles
  (`membership_gallery_4_alt`, `stretch_deep_rose`) — the same CMS-leak failure as
  Headspace, at lower volume.
- **The UI-collage image has an exemplary long alt**: "Image of app ui feature
  cards including Cardiovascular Age, Cycle day, Activity goal, Heart rate, Body
  Clock, Cumulative Stress, Sleep Score, Sleep debt, Readiness Score, Symptom
  Radar, Daytime Stress, Resilience, Cardio Capacity, and Sleep regularity" — the
  content of the screenshot is enumerated rather than described as "app screens".
- **Two different skip-link strings** across the two properties.
- **Duplicated newsletter block in the DOM** (responsive variants) — the consent
  sentence appears twice.
- The `Payment Options` strip renders its full contents twice, and the
  accessibility statement independently flags it: "In a mobile view, the payment
  method section moves and does not have a mechanism to pause, stop, or hide the
  motion. (2.2.2)".
- **No "was this helpful" feedback control** on help articles — the only product
  in the batch without one.

---

## Transferable patterns

1. **Name the bottom band with an instruction, not a judgement.** `Pay Attention`
   instead of `Poor`. Where a consistent label set would force you into a negative
   adjective, break the grammatical pattern and switch to a directive. Applies
   directly to credit scores, risk ratings, health scores, account-standing
   indicators, and any banded metric shown to the person it describes.

2. **Match the vocabulary to the kind of judgement you are making.** Invent and
   define labels for your own construct; use **evidential** language (`signs`) for
   detection; use **descriptive** language (`Steady` / `Varied`) for patterns; and
   **borrow and attribute** an external authority's labels (AHA `Normal` /
   `Elevated` / `High`) where a recognised standard exists. Never let one register
   do all four jobs.

3. **Scope the disclaimer to the claim, and make it warmer as it gets closer to
   the user.** Statutory verb-list in a numbered marketing footnote; a behavioural
   instruction at the foot of the feature article; a normalising sentence directly
   under the alarming result. Oura's Nighttime Breathing line —
   disclaimer + "breathing disturbances during sleep are common" + "a conversation
   with your healthcare professional is always a good place to start" — is the
   model for the innermost layer.

4. **Forbid specific behaviours, not just general reliance.** "Do not use [this]
   to replace clinical assessment, make medical decisions, or **delay**, stop, or
   modify medical care." Enumerating the four harmful actions beats a generic
   "for informational purposes only", and `delay` is the one that matters most.

5. **Negate the capability your feature's name implies.** `Blood Pressure Signals`
   "does not measure actual blood pressure in mmHg… it does not measure or display
   blood pressure values", and it "cannot **diagnose or rule out** any condition".
   If a product name borrows a clinical term, the copy has to take the implication
   back explicitly — including the rule-out, which most disclaimers forget.

6. **Explain both tails of every metric.** Unusually good-looking numbers get an
   interpretation too. Prevents users from optimising a U-shaped metric in one
   direction. Transfers to anything where more is not monotonically better —
   utilisation rates, engagement, spend velocity, credit usage.

7. **Publish the calibration period per feature, with its exact data
   requirement.** "at least seven nights of sleep data within the past 14 days
   (including last night)". Turns an unavoidable empty state into an explained one
   and lets the user distinguish "not yet" from "broken".

8. **Ship a mode that hides your own metric.** `Rest Mode` removes the Activity
   Score and goal; the illness-detection feature recommends turning it on. If a
   number can create pressure at exactly the moment the user is least able to act
   on it, give them a switch — and have the product suggest it.

9. **Say what you refuse to measure, and why.** "There is no step count goal as a
   feature of your Oura experience; rather, the focus is on comparing steps to your
   own baseline." Declining the category's default metric, in copy, is a
   positioning statement and an expectation-setter in one sentence.

10. **Tell the user which source wins when your product disagrees with an
    authority.** "If your Blood Pressure Signals result differs from your doctor's
    assessment, that's expected… Always follow your healthcare provider's
    guidance." Pre-empt the conflict, explain why it is expected, and name the
    winner.

11. **Treat the legally-mandated accessibility statement as the primary artefact.**
    The EU-format statement — partial-compliance declaration, enumerated failures
    with WCAG SC numbers, remediation date, 14-day response SLA, named regulator
    with contact details — is more useful to everyone than the voluntary
    commitment page, and publishing your defects is a trust signal.

## Caveats & gaps

- **Main Privacy Policy and Terms & Conditions were not fetched.** All privacy
  findings derive from the Trust Center, the membership FAQ, and the Advisor
  article. The **GDPR finding is bounded to that evidence**: GDPR is not named on
  any page read, but the unread Privacy Policy of a Finnish company almost
  certainly addresses it. Do not cite "Oura does not reference GDPR" without
  checking the policy.
- **All in-product copy is `[documented]`, not observed** — score cards, the crown
  icon, `Rest Mode`, `App Lock`, Symptom Radar cards, Advisor conversation UI,
  notification strings, empty-state screens. The help articles quote level names
  and definitions, which is unusually complete, but the actual on-screen strings
  may differ in length and phrasing.
- **The score-band interpretive sentences are the help centre's phrasing, not
  necessarily the app's.** Whether the user sees "Pay Attention" alone or with the
  accompanying sentence is unverified.
- **The nav-label inconsistency** (`Your Health` / `Why Oura` vs `Health Features`
  / `Experience`) was observed across pages in one session and may be an active
  experiment rather than a defect. Flagged as suspected.
- **The `mitigate` verb discrepancy** between the homepage footnote and the
  article-level disclaimer is confirmed across the two documents read, but other
  surfaces (Terms, app, packaging) were not checked and may resolve it.
- **The accessibility statement covers the online store only.** No published
  accessibility statement for the Oura App was found. The app is where all the
  health content lives, so the most important surface is unassessed publicly.
- **Glossary cross-link defects** (`Activity Score`, `sleep view`, `sleep timing`
  all linking to the Readiness Score article) were observed in the fetched markup
  and may be a rendering artefact of the help-centre migration rather than live
  broken links.
- **Store, checkout, and product pages unharvested**, as are `/why-oura`,
  `/how-it-works`, the six health-feature pages, `organizations.ouraring.com`, the
  Pulse blog, Oura Labs, and the ~75 help articles not read.
- **`Connected Care` partner flows (ResMed, Counsel Health) are documented only in
  summary.** The copy shown to a user being routed from an elevated reading to a
  commercial partner — arguably the highest-stakes referral copy Oura writes — is
  unobserved. Counsel Health is described as "an AI doctor who can see your ring
  data and records", which is a phrase worth a dedicated pass.
- **Women's Health features** (`Cycle Insights`, `Pregnancy Insights`,
  `Menopause Insights`, `Fertile Window User Manual`) were not fetched. The last of
  these is titled `User Manual`, which suggests a regulated-device documentation
  register worth harvesting separately — it may be the one place Oura's posture
  differs.
- **Non-English locales unharvested.** Oura Advisor ships in ten languages and
  several features are English-only; how the disclaimer and low-score copy
  translate is unknown and is exactly where this register degrades.

## Sources

1. https://ouraring.com/
2. https://ouraring.com/membership
3. https://ouraring.com/trust-center
4. https://ouraring.com/accessibility
5. https://ouraring.com/accessibility/en
6. https://support.ouraring.com/hc/en-us
7. https://support.ouraring.com/hc/en-us/categories/27782541623059-Oura-App
8. https://support.ouraring.com/hc/en-us/articles/360025589793-Readiness-Score
9. https://support.ouraring.com/hc/en-us/articles/360025445574-Sleep-Score
10. https://support.ouraring.com/hc/en-us/articles/360025577993-Activity-Score
11. https://support.ouraring.com/hc/en-us/articles/360057791533-Readiness-Contributors
12. https://support.ouraring.com/hc/en-us/articles/5949130374547 (Glossary)
13. https://support.ouraring.com/hc/en-us/articles/52627030482707-Health-Radar
14. https://support.ouraring.com/hc/en-us/articles/25358829055251-Resilience
15. https://support.ouraring.com/hc/en-us/articles/28451491040019-Cardiovascular-Age
16. https://support.ouraring.com/hc/en-us/articles/39512345699219-Oura-Advisor
