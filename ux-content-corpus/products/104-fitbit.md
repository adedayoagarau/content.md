# 104. Fitbit

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Consumer fitness wearable (mid-migration into a platform health service: **Google Health**) |
| Primary URL | https://www.fitbit.com/ — **redirects to** https://store.google.com/us/category/watches_trackers |
| Corpus rank | 104 |
| Benchmark strength (source list) | Metrics and goal language |
| Locale / market observed | en-US (help centre localised into 37 languages) |
| Platform observed | Google Store (marketing/commerce), Google Health Help Center (formerly Fitbit support) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Two-tier, and the tiers are worded completely differently.** Most metrics carry a soft wellness caveat, and the clearest instance is styled as a **`Tip:`** — "The feature information and metrics provided here are not meant to diagnose or treat any medical condition and should not be used for medical purposes… In case of a medical emergency, call emergency services." Google Health Premium's AI coaching carries "These tools aren't intended for medical purposes… Always verify the generated responses for accuracy." By contrast, **Google Irregular Rhythm Notifications** is documented in the register of a regulated software function: a named clinical validation study with an **NCT registration number (NCT04380415, n=455,699)**, stated contraindications, an **age restriction (22+)**, explicit false-positive/false-negative disclosure, and all-caps prohibitions. The pages inspected do **not** use the phrase "FDA-cleared", so that specific status is unverified here. AHA (150 min/week) and CDC (30 min/day) are cited as the authority for activity goals; NHLBI, NIMH and CDC are cited inline elsewhere. |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Partial — the metric-explanation corpus is rich and was the priority. **The consumer marketing site no longer exists as a separate property**: `fitbit.com` redirects to the Google Store, so there is no Fitbit-branded hero, pricing page, or FAQ block to harvest. Privacy policy and Terms are Google-wide and were not fetched |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Google Store — Watches & Trackers | https://www.fitbit.com/global/us/home → https://store.google.com/us/category/watches_trackers | **The redirect is itself the headline finding** |
| Google Health Help Center home | https://support.google.com/fitbit/ → https://support.google.com/googlehealth/ | 13 topic groups; the old Fitbit support URL now resolves here |
| Help: What's the Sleep Score in the Google Health app | https://support.google.com/googlehealth/answer/14236513 | Six contributors, band table, **algorithm-migration FAQ** |
| Help: Understanding your readiness score | https://support.google.com/googlehealth/answer/14236710 | Three bands, documented relabel, three conflicting range statements |
| Help: Track Active Zone Minutes or active minutes | https://support.google.com/googlehealth/answer/14236509 | AZM mechanics, AHA/CDC sourcing, buzz-count vocabulary |
| Help: Learn about your VO2 max | https://support.google.com/googlehealth/answer/14237924 | **Published age × sex percentile tables** |
| Help: Manage stress & mindfulness | https://support.google.com/googlehealth/answer/14237928 | Body Responses, EDA, Resilience, breathing-session contraindication |
| Help: What is Morning Brief | https://support.google.com/googlehealth/answer/15344549 | The daily digest; the `Tip:`-styled wellness disclaimer |
| Help: How accurate are Fitbit devices? | https://support.google.com/googlehealth/answer/14236920 | An entire article of self-limitation |
| Help: Google Irregular Rhythm Notifications (AFib) | https://support.google.com/googlehealth/answer/14236719 | The regulated-register comparator |
| Help: Sign up or manage Google Health Premium | https://support.google.com/googlehealth/answer/14237941 | Subscription, Gemini disclaimer, 37-country availability |
| Help: Cancel your Google Health Premium subscription | https://support.google.com/googlehealth/answer/18072871 | Platform routing, uninstall pre-emption |
| Help: Accessibility features on your Google Health service | https://support.google.com/googlehealth/answer/14237214 | Disability Support team, Fitbraille |

---

## T1 Navigation & IA labels

**The headline finding is that Fitbit no longer has its own site.** `[observed]`

`https://www.fitbit.com/global/us/home` **redirects to**
`https://store.google.com/us/category/watches_trackers`, a Google Store category
page. `https://support.google.com/fitbit/` **redirects to**
`https://support.google.com/googlehealth/`, titled `Google Health Help Center`.
The in-page brand lockup is `Google Health logo`.

Consequences for a content-taxonomy harvest, stated plainly:

- There is **no Fitbit hero, no Fitbit pricing page, no Fitbit FAQ block, no
  Fitbit footer, no Fitbit accessibility statement.** The commerce surface is
  Google Store's; the support surface is Google's.
- The nav a Fitbit customer now sees is the Google Store nav: `Phones` ·
  `Fi Wireless` · `Watches & Trackers` · `Laptops` · `Earbuds` · `Smart Home` ·
  `Accessories` · `Offers` · `Support`. Fitbit is one sub-item inside
  `Watches & Trackers`.
- The device names have been reconstructed as **`Google` + `Fitbit` + model**:
  `Google Fitbit Air` · `Google Fitbit Charge 6` · `Google Fitbit Inspire 3` ·
  `Google Fitbit Versa 4` · `Google Fitbit Sense 2` · `Google Fitbit Ace LTE`,
  alongside `Google Pixel Watch 5`. **Fitbit has been demoted from a brand to a
  modifier inside another brand's product name.**

**Help centre IA — 13 flat topic groups** `[observed]`:

`Getting started` · `Setup` · `Notifications` · `Fitness` · `Sleep and wellness`
· `Settings` · `Lifestyle` · `Music` · `Payments` · `Accounts` · `Updates` ·
`Policies` · `User manuals`

Thirteen groups, no scope sentences, no icons, presented as a long list of
article links rather than as cards. It is the standard Google support template
and it is the least user-differentiated help IA in this batch — compare Wise's
six activity-named topics with scope lines, or Oura's eleven metric-named
sections. Nothing here tells a user what "Lifestyle" contains or how it differs
from "Settings".

Two groups carry the real health content: **`Fitness`** (21 articles) and
**`Sleep and wellness`** (22 articles). `Sleep and wellness` is the interesting
one because it mixes three very different content types under one label:

- wellness metrics (`What's the Sleep Score…`, `Understanding your readiness score`)
- regulated-register features (`What is the Google ECG app?`,
  `How do Google Irregular Rhythm Notifications check for atrial fibrillation (AFib)?`,
  `What is Loss of Pulse Detection on my Google Pixel Watch?`,
  `What is Breathing Emergency Detection on my Google Pixel Watch?`)
- clinical data handling (`Sync your medical records with the Google Health app`)

A user browsing `Sleep and wellness` moves from "how did I sleep" to
"what happens if my pulse stops" inside one 22-item list, with nothing in the IA
signalling the change in stakes. That is a real finding: **the IA does not
separate wellness features from life-safety features**, and the disclaimer regimes
for the two are completely different (T10).

**Terminology drift is visible in the IA itself** `[observed]`. Within the
current help centre, titles use at least four naming conventions for the same
things:

| Convention | Example |
|---|---|
| Google Health app | `What's the Sleep Score in the Google Health app` |
| Fitbit device | `How accurate are Fitbit devices?` |
| Fitbit (bare) | `How do I change my language on Fitbit?` · `How do I change or reset my Fitbit password?` |
| Both, in one title | `Track Active Zone Minutes or active minutes on your Fitbit device and Pixel Watch` |

And inside articles, the Readiness page instructs: "From the Today tab **in the
Fitbit app**, tap Devices" — in an article titled "…in the Google Health app".
The Sleep Score article's own cross-link text reads `What's sleep score in the
Fitbit app?` pointing at a page titled `What's the Sleep Score in the Google
Health app`. Several inline links still use `support.google.com/fitbit/…` paths.

This is not nitpicking — it is the single most instructive thing in this file for
a content designer, and it is covered in T13.

## T2 Value proposition & headline patterns

There is no Fitbit-authored value proposition left on a public page. What exists
is Google Store copy about a device category. `[observed]`

**Category hero**: `Make every move a healthy one with Google Pixel and Fitbit.`
followed by "From glanceable displays to totally screenless. All designed for
Google Health."

**Product one-liners**:
- `Google Pixel Watch 5. Designed for Gemini Intelligence.` — "The watch that
  delivers personalized, proactive help. And it's built for your health, fitness,
  and safety."
- `Google Fitbit Air` — "The screenless device for effortless health and wellness
  tracking."

**`effortless`** is the Fitbit-side positioning word, set against Pixel Watch's
`proactive` and `Gemini Intelligence`. The screenless device is sold on *absence
of interaction*; the watch on *anticipation*. That is a coherent two-tier story
and it is the only genuinely Fitbit-flavoured thing on the page.

**Section headline**: `A new relationship with your health.` — "Effortless
tracking and personalized health coaching that's built with Gemini and adapts to
you."

**Coaching sub-heads** `[observed]`, and these are the closest thing to Fitbit's
old motivational register:

- `Guidance that adapts to your progress.` — "It all starts with a conversation.
  You tell Google Health Coach about your preferences and routines, and it follows
  your lead with longer-term fitness plans and day-by-day sleep goals."
- `Plans that adjust to the rest and recovery you need.` — "Every day is
  different. Get coaching that keeps you on track no matter what life brings,
  whether you're managing sleep in a new time zone or adjusting workouts around an
  injury."
- `Proactive suggestions for your health.` — "You set the vision. Google Health
  Coach supports you with guidance powered by a holistic view of your health and
  wellness, whether it's spotting key trends or **celebrating your wins**."

Three notable moves. **"it follows your lead"** and **"You set the vision"** both
hand authority to the user, which is unusual for coaching copy. **"adjusting
workouts around an injury"** names a setback as a normal input rather than a
failure. And `celebrating your wins` is the only explicitly motivational phrase
on the page — the rest is capability language.

**Celebrity endorsement** `[observed]`: Stephen Curry is credited as
"Google Health Performance Advisor" with the quote "I'm excited for what this is
going to mean for the world, for health and wellness." Vague enough to be
claim-free, which is presumably the point.

There are **no outcome statistics, no efficacy claims, and no cited studies** on
the commerce page — a marked contrast with Headspace (journal citations) and Oura
(a footnoted survey). All the evidence content sits in the help centre.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Learn more` | Every product block, ×8+ | Bare, repeated |
| `Buy` | Product blocks | |
| `Compare` / `Compare all` | Category page | |
| `Explore Google Health Premium` | Coaching block, ×2 | |
| `Browse all watches & trackers` | Nav | |
| `Shop birthday deals` | Promo strip | |
| `Skip Navigation` | Store, first in DOM | |
| `Skip to main content` | Help centre, first in DOM | **Two different strings across the two properties** |
| `Expand all` / `Collapse all` | Every help article | The dominant help-article control |
| `Was this helpful?` → `Yes` / `No` → `Submit` | Every help article | Plus `How can we improve it?` |
| `Post to the help community` | Article foot | "Get answers from community members" |
| `Contact us` | Article foot | "Tell us more and we'll help you get there" |
| `Try Google Health Coach` | Documented in-app search term | |
| `Get Google Health Premium` / `Try 3 months of Google Health Coach` | Documented in-app | Two labels, one entry point, conditional on eligibility |
| `Cancel membership` | Documented in-app cancellation control | Note: **`membership`**, while everything else says `subscription` |
| `Restore Purchase` | Documented | |
| `Log Mood` | Documented — the action offered on a stress notification | |
| `View result` | Documented — the action on an irregular-rhythm notification | Deliberately neutral |

**`View result` is the one to note.** It is the tap target on a notification that
may indicate atrial fibrillation. Not "See what we found", not "Check your heart",
not "Important". A flat, clinical two-word label on the highest-stakes
notification the product sends. The restraint is correct and it is worth
recording as the counter-example to every "urgent" notification pattern.

**`Cancel membership` vs `subscription` everywhere else** is a small consistency
gap in exactly the place where consistency matters commercially.

`Learn more` appears at least eight times on one category page with no
distinguishing text — the same screen-reader link-list problem found on Calm and
Oura, at higher volume.

## T4 Onboarding & getting-started

**Baseline periods are published per metric** `[documented]`, in the same spirit
as Oura but less consistently:

| Metric | Stated requirement before first result |
|---|---|
| Readiness score | "you must wear your device for **7 nights** of sleep to establish a personalized baseline"; "Wear your device consistently for a **month** to develop a more accurate personal baseline" |
| VO2 max | "track a 10-minute outdoor run. If VO2 max doesn't appear after one run, you may need to track up to **three runs in 30 days**" |
| Sleep Score | requires sleep stages; "Most metrics require at least **3 hours of quality sleep**" |
| Readiness calculation timing | "calculated once a day, approximately **within 20 seconds of getting out of bed** from a sleep of at least 3 hours" |

The 20-seconds detail is unusually specific and useful — it tells a user whose
score has not appeared whether to wait or troubleshoot.

**The `Getting started` topic is device-model-shaped, not task-shaped**
`[observed]`. It contains 22 articles, of which 17 are
`How do I get started with <specific device>?` covering models back to Fitbit
Charge 3 and Versa. Title grammar drifts within the set:
`Get started with Google Fitbit Air` and `Get started with the Fitbit Charge 6`
(imperative) sit beside `How do I get started with Fitbit Sense 2?` and
`How do I get started with Fitbit Luxe?` (question). Newer devices got the
imperative rewrite; older ones kept the question form. **The convention change is
legible as an archaeological layer.**

## T5 Form & field labels

`[documented]` — no meaningful pre-auth form surface; the commerce funnel was not
entered.

**Documented profile inputs that affect metric output** `[observed]`, and the
important pattern is that each is tied to the metric it distorts:

| Input | Why it matters, as published |
|---|---|
| `Wrist` (`dominant` / `non-dominant`) | "The dominant wrist setting **decreases the sensitivity** of step counting… The non-dominant wrist setting **increases the sensitivity**." Default is non-dominant. |
| `Height` | "we use height to estimate your walking and running stride lengths, you may want to measure and manually adjust these values if your legs are longer or shorter than average" |
| `Sex`, `Age`, `Weight` | drive VO2 max banding, Sleep Score targets, heart-rate zones |
| `WORN on Wrist` / `CLIPPED on Body` | device-side toggle (Inspire 3), `On Wrist` / `On Clip` on older models — **two label sets for one setting across models** |

**Telling the user that a setting changes the sensitivity of the measurement, in
both directions, is the good practice here.** Most products present wrist
selection as a comfort preference; Fitbit explains it as an accuracy trade-off
the user is choosing between over-count and under-count.

**Mood logging** `[documented]`: `Log mood` → "Choose one or more moods to log" →
`Save`. Multi-select rather than single-select, which avoids forcing a
distressed user to pick one word.

**Goal fields** `[documented]`: `Mindful days` goal, `Active Zone Minutes` goal
(default 150/week), `active minutes` goal (default 30/day adult, 60/day child),
weekly `exercise days` goal (default 3). Every one is stated as editable —
"you can change your goal based on your needs", "You can change this goal to meet
your needs."

## T6 Status & state language

**The score vocabularies, and the comparison with Oura that makes them legible.**

### Sleep Score bands `[observed]`

| Description | Score range |
|---|---|
| Excellent | 90-100 |
| Good | 80-89 |
| Fair | 60-79 |
| **Poor** | Less than 60 |

**Fitbit names the bottom band `Poor`.** Oura, for the identical structural slot,
names it `Pay Attention`. This is the cleanest available A/B comparison in the
corpus for the health-metric low-score problem: one product delivers a verdict on
the user's night, the other delivers an instruction. Everything else about the two
bandings is near-identical (four bands, 0-100 scale, top band at 85/90).

Fitbit partially compensates in the surrounding prose (T14), and the
compensation is extensive — but the **label itself** is the thing a user sees on
a card at 7am, and it says `Poor`.

**Fitbit also publishes the population distribution**: "Most users see an average
Sleep Score between **72 and 83**." That is a genuinely useful and rarely-given
number: it tells a user scoring 76 that they are typical, and it quietly reveals
that the `Good` band (80-89) sits above the majority of users. Publishing the
distribution alongside the bands is a transferable move — it converts a verdict
into a position.

And the bands are explicitly derived from self-report: "we categorize scores
based on **how users typically rate their sleep quality**."

### Sleep Score contributors — the two-column explanation pattern `[observed]`

Six contributors, each presented in a table with two headed cells:
**`Definition`** and **`Understanding your number`**.

| Contributor | Definition (summarised) | "Understanding your number" (verbatim direction) |
|---|---|---|
| `Sleep duration` | estimated time asleep in the primary sleep window | "the longer you sleep, the higher your score" |
| `Time to sound sleep` | "the **settling-down phase**" — from first trying to sleep until reaching sound sleep | faster generally improves the score; "The expected time… will differ depending upon your age and gender" |
| `Sound sleep` | total steady, undisturbed sleep (Deep/REM/Light with low, steady HR) | "Spending more of your total sleep time soundly asleep will result in a higher Sleep Score." |
| `Restlessness` | "very brief, minor wakeful moments"; excludes longer awakenings | lower is higher-scoring; expectation varies by age, gender and total sleep |
| `Full awakenings` | count of interruptions >5 minutes, "long enough to… likely be remembered" | "**Zero is ideal, but fewer than two is considered good for most people.**" |
| `Interruptions` | total awake time in stretches >5 minutes | "A low amount of awake time indicates your brain and body had a more continuous sleep." |

**Splitting `Definition` from `Understanding your number` into two labelled
columns is the single most reusable structure in this file.** The first tells the
user what was measured; the second tells them which direction is good and how much
variation is normal. Most metric documentation collapses these and leaves the
user to infer valence.

`Zero is ideal, but fewer than two is considered good for most people` is the
model sentence: ideal, then realistic, then normalised.

**The 5-minute threshold is explained with its reasoning, not just stated**:
"we use a **5-minute threshold** based on the scientific literature" —
*Awake* = >5 minutes, "the significant awakenings you are more likely to remember
and find disruptive"; *Restlessness* = <5 minutes, "You might not even remember
these." The definition is anchored to the user's own memory of the night, which
is the only reference point they have.

### Readiness score bands `[observed]`

- **High Readiness (65 or above):** "Well recovered from recent activities, and
  may be ready for peak performance."
- **Moderate Readiness (30-64):** "Your body is showing typical recovery levels
  and can handle a workout today."
- **Low Readiness (29 or below):** "Your body is fatigued from a tough workout,
  poor sleep, stress or strain on the body—or a combination of these factors.
  Prioritize rest and active recovery techniques."

The `Low` definition is the well-written one: it **enumerates four possible causes
and explicitly allows a combination**, so the user is not left assigning blame to
one behaviour, and it closes on an action.

**A documented relabel, and the reasoning behind it** `[observed]`:

> "We've also updated the readiness labels from **low, good, and excellent** to
> **low, moderate, and high**."

The old set mixed a magnitude word (`low`) with two quality words (`good`,
`excellent`); the new set is three magnitude words. Moving from evaluative to
descriptive labels on a recovery metric is exactly the right direction — `high`
and `moderate` describe the reading, `good` and `excellent` describe the user.
That Fitbit published the change, in the article, is itself good practice.

**Three conflicting statements of the same range, in two articles** `[observed]`
— recorded as a defect:

| Where | Low band stated as |
|---|---|
| Readiness article, "What does the readiness score mean?" | "**29 or below**" |
| Readiness article, device-tile section | "Low readiness: **1 - 29**" |
| Morning Brief article, table | "Low readiness score **0 - 29**" |

Also: "Your readiness score **ranges from 0 (low) to 100 (high)**" in one
paragraph and "Your score ranges from **1 to 100**" four paragraphs later. For a
number the user sees every morning, three published lower bounds is a real
content-ops failure.

**Self-disclosed platform inconsistency** `[observed]`:
> "**Important:** Readiness labels (moderate, high) may differ between non-Pixel
> Watch devices and the mobile app."

Admitting that the same score renders under different labels on watch and phone
is honest, and it is also an admission that the vocabulary is not governed
centrally.

### Resilience `[observed]`

Three qualitative levels, no number: **`Optimal`** · **`Balanced`** · **`Low`**.
Defined as "your capacity for the day ahead… your body's ability to absorb and
bounce back from physical and mental strain", built from three named categories —
`Responsiveness`, `Exertion balance`, `Sleep patterns` — drawing on "more than 10
factors".

Compare Oura's Resilience: five levels (`Exceptional` / `Strong` / `Solid` /
`Adequate` / `Limited`), each with a full sentence of interpretation. Fitbit's
three bare adjectives carry no accompanying copy in the public documentation.
`Balanced` as a middle label is well chosen (it names the goal state rather than
mediocrity); `Low` is not.

The distinction from Readiness is explicitly drawn: "While Readiness gauges your
body's overall preparedness for daily activities based on recovery, Resilience
specifically measures your **capacity to handle and recover from** physical and
mental strain." Publishing the boundary between two similar-sounding scores is
necessary and often skipped.

### VO2 max / cardio fitness levels `[observed]`

Six levels — `Poor` · `Fair` · `Average` · `Good` · `Very good` · `Excellent` —
and then **full numeric tables, split by sex, in six age bands each**, giving the
exact VO2 max boundary for every level.

This is a striking editorial decision. A 45-year-old woman can look up the table
and establish that a reading of 24 places her in `Poor`, and see that the
threshold for `Excellent` in her band is 39.5. The tables are sourced to published
data. **Fitbit is publishing the instrument that lets the user locate themselves
at the bottom of a population distribution, by name.**

Defensible as transparency; also the most alarming artefact in this file, and it
carries no accompanying reassurance copy, no "focus on your own trend" sentence,
and no referral. The mitigating language that exists elsewhere in the same help
centre (T14) is absent here.

Two further notes: the article records a rename — "**VO2 max (formerly known as
cardio fitness score)**" — and the women's 60-120 table contains a typo, a
`Very good` upper bound printed as `28.` with the next band starting at `28.4`.

### Active Zone Minutes `[observed]`

The metric, and the multiplier that defines it:

| Heart-Rate Zone | Active Zone Minutes |
|---|---|
| 1 minute in the moderate zone | 1 Active Zone Minute |
| 1 minute in the vigorous or peak zone | **2 Active Zone Minutes** |

Zone names are `moderate (fat burn)` · `vigorous (cardio)` · `peak` — **each
clinical term glossed with the consumer term in parentheses**, which is the right
way round for a product whose older UI used `Fat burn`, `Cardio`, `Peak`.

"Heart-rate zones are **personalized based on your fitness level and age**" —
stated up front, so the user knows the zones are not universal.

The goal is sourced: "your goal is to earn **150 Active Zone Minutes each week**.
The **American Heart Association** recommends at least 150 minutes of moderate
activity or 75 minutes of vigorous activity, or a combination of both, each week.
If you earn an average of **22 Active Zone Minutes daily**, you meet this
recommendation."

**Deriving the in-product goal from a named external guideline, stating both the
weekly and the daily equivalent, and then saying the user can change it** is
best-practice goal copy. The daily figure (22) is the one that makes the weekly
figure actionable.

The 2× multiplier is then illustrated with a worked example table (5-min warmup /
10-min run / 5-min cool down = 30 AZM for a 20-minute workout) and the explicit
statement that "the number of Active Zone Minutes you earn **might exceed the
length of your workout**" — pre-empting the confusion the multiplier creates.

**`active minutes`** (the legacy metric on older devices) is defined separately
via METs, with MET explained from first principles and sourced, and its goal
derived from "the **Center for Disease Control's recommendation** of daily
moderate-to-intense activity: 30 minutes for adults and 60 minutes for children."

### Other named states `[documented]`

`No score` — the readiness tile state during recalculation, with "Check back later
to find your updated score." · `Calibrating` for breathing sessions
("sensing your breathing", displayed for 30–40 seconds) · `Body Responses` alerts
· `Health Metric Alerts` which "only appears in your Morning Brief when the data
values fall outside your personal range."

**Threshold-gated display** (Morning Brief health metrics only surface when
out-of-range) is the same restraint Oura applies to Blood Pressure Signals: say
nothing when there is nothing to say, so that saying something means something.

## T7 Error, failure & recovery

**`How accurate are Fitbit devices?` is an entire article of self-limitation**,
and there is nothing else like it in this batch. `[observed]`

Eight sub-questions, each naming a specific circumstance in which the device is
wrong:

- `Why does my Fitbit device count extra steps?` — desk work, cooking
- `Why does my Fitbit device count steps when I'm riding a bike?` — bumpy trails
- `Why does my Fitbit device count extra floors?` — "a gust of wind, a weather
  change, or **opening a door**"
- `Will my device count steps if my arms aren't moving?` — pushing a stroller or
  shopping cart undercounts
- `Will my device pick up steps when I'm in the car or riding in a vehicle?` —
  "bumpy roads or… a car with a stiff transmission"
- `Why does my step count differ depending on where I wear my Fitbit device?`
- `How accurate is my GPS data captured by my Fitbit device?`
- `How can I get the most accurate reading on my Fitbit scale?`

Each answer names the mechanism ("an altimeter, which is a sensor that calculates
altitude based on atmospheric pressure"), gives the constant ("Your device
registers 1 floor when you climb about 10 feet, which is the average between
residential and commercial floor heights"), and where possible gives the fix
("manually log the driving activity").

**A recurring reassurance formula** appears three times verbatim: "For most
customers, the number of extra steps added… **isn't significant when compared to
your overall stats.**" Repeated identically for arm movement, cycling and driving.
As a pattern it is efficient — one sentence that bounds the error without
quantifying it — and as a habit it is slightly hollow, since "isn't significant"
is doing a lot of unspecified work three times.

The body-fat answer is the most honest sentence in the article: "because several
different methods can determine body fat percentage and **none are 100%
accurate**, the scale's body fat reading may not perfectly match other scales or
manual methods."

**Also observed**: a `Tip:` in the readiness article — "Like all heart rate
tracking technologies, accuracy is affected by physiology, location of device, and
your movements and activity." Placed at the **top** of the article, before any
explanation. A whole-category accuracy caveat, given first.

**A physical-safety warning attached to a breathing exercise** `[observed]`, which
no other product in this batch ships:

> "During the deep breathing session, you should feel comfortable and relaxed. If
> you feel like you're unable to complete the full session, you can quit at any
> time. If you start to feel dizzy, faint, weak, or any other discomfort, **stop
> the session immediately** and return to breathing normally. If the feeling
> persists, lie down until you feel better, and consider seeking medical attention
> if symptoms continue to persist. Use caution or consult your doctor before use if
> you have any pre-existing cardiac or respiratory conditions."

Section heading: `Health risks associated with doing a guided breathing session`.
Symptoms named, an immediate action, a secondary action, an escalation, and a
pre-use contraindication. Headspace and Calm both ship guided breathing with no
comparable warning found in this harvest. Worth recording as a genuine difference
in risk posture rather than as a stylistic one.

**Troubleshooting titles** `[observed]` are mostly `Why <negative event>?`:
`Why won't my Fitbit device sync?` · `Why isn't my Fitbit device's battery
charging?` · `Why can't I set up my Fitbit device?` · `Why didn't my Fitbit device
alert me?` · `Why won't my Fitbit watch connect to Wi-Fi?` · `How to fix a blank,
unresponsive, rebooting, or flickering Fitbit device screen`.

The last one enumerates four distinct symptoms in the title so a user can match
what they are seeing. `Why didn't my Fitbit device alert me?` is the good one —
documenting the **absence** of an expected event, which is harder to search for
than a present failure.

`Can someone take over my Fitbit account?` is a security question phrased as the
user's fear rather than as a feature.

## T8 Empty states

`[documented]` — thinner than Oura's, but two named:

- **`No score`** — "The readiness tile might display '**No score**' while your new
  score is being calculated. Check back later to find your updated score."
  A two-word state plus a disposition instruction.
- **Missing VO2 max** — handled as a troubleshooting section
  (`Understand why you may not have a VO2 max or level`) rather than as a state,
  with three conditions listed (GPS outdoor run only, 10 minutes minimum, up to
  three runs in 30 days).
- **Missing Sleep Score** — `Missing a sleep score?` with the dependency stated:
  "To get a Sleep Score, you need to receive sleep stages", plus
  "**Tip:** When syncing your device, it may take a minute for your Sleep Score to
  appear."

**A notable absence**: Fitbit does not appear to document a "not enough data yet"
display state for Sleep Score the way Oura documents `Calibrating` and
`Insufficient Sleep Data`. The user is told the prerequisite but not what the card
will say while it is unmet.

## T9 Notifications & system messages

**`Morning Brief` is the flagship notification artefact** `[observed]` — a daily
digest delivered "within **15 minutes of waking up**", with a vibration, and a
documented persistence window: "you can find it through the ongoing activity
indicator on the watchface for **15 minutes**. You can also swipe up to find
Morning Brief in your notification tray for **3 hours**."

Publishing the persistence windows is unusual and useful — it tells a user who
dismissed it whether it is recoverable.

Contents, in order: `Key Takeaways` ("a personalized insight based on your daily
readiness and target load") → `Health Metric Alerts` → `Readiness` → `Sleep` →
`Exercise Progress` → `Weather`.

**The ordering is the finding.** A health digest that ends with the weather is
deliberately positioning itself as a morning briefing rather than a health report
— the same genre as a news brief. It softens the whole artefact: whatever the
scores said, the last thing you read is that it will be sunny.

`Health Metric Alerts` covers breathing rate, HRV, skin temperature variation,
SpO2 and RHR, and **only appears when values fall outside the user's personal
range**. This is threshold-gated notification, and it carries the wellness
disclaimer discussed in T10.

**Non-verbal notification vocabulary** `[observed]` — Active Zone Minutes alerts
are encoded as **buzz counts**, and the encoding differs by device generation:

| Device group | 1 buzz | 2 buzzes | 3 buzzes | 4 buzzes |
|---|---|---|---|---|
| Charge 4, Inspire 2, Charge 5/6, Inspire 3, Luxe, Sense 2, Versa 4 | Fat burn | Cardio | Peak | — |
| Versa, Versa Lite, Versa 2 | Below zones | Fat burn | Cardio | Peak |
| Sense, Versa 3 | Below zones | Fat burn | Cardio | Peak |

**The same haptic means two different things depending on which device you own.**
One buzz is `Fat burn zone` on a Charge 6 and `Below zones` on a Versa 3. For a
user upgrading devices, a learned non-verbal vocabulary silently changes meaning.
Recorded as a genuine cross-device content defect — and a reminder that haptic
patterns are content and need the same governance as strings.

**Notification controls are extensively documented and mostly opt-in**
`[observed]`: `Heart Zone Notifications` / `AZM Notifications` (two labels for one
setting across models), everyday-activity zone alerts (fire "7 minutes after you
enter a heart-rate zone"), `Goal reminders`, `Morning Brief` toggle,
`Zone change alerts`. Body-response notifications on Pixel Watch: "**Important:**
These notifications are turned off by default."

**Irregular-rhythm notification copy** `[documented]` — the escalation is stated
plainly: "If you receive an irregular rhythm notification, **you should talk to
your doctor.**" One sentence, no hedge, no alternative. And the analysis latency
is disclosed: "Google Health **doesn't analyze your data in real time.** If you
receive a notification, it means we saw signs of an irregular rhythm that may be
AFib **in the last 24 hours**."

## T10 Disclosures, legal & compliance

**Priority section. Fitbit's structure is a two-tier system in which the tiers are
written by what appear to be two different disciplines.**

### Tier 1 — the wellness caveat, styled as a `Tip:` `[observed]`

The clearest general disclaimer found sits inside the Morning Brief article's
`Health Metric Alerts` section, and it is formatted as a **`Tip:`**:

> "**Tip:** The feature information and metrics provided here are **not meant to
> diagnose or treat any medical condition and should not be used for medical
> purposes**. They are intended to offer information to help you manage your
> well-being. If you have any concerns about your health, please consult a
> healthcare provider. **In case of a medical emergency, call emergency services.**"

The content is right — non-diagnostic status, intended purpose, referral,
emergency escalation, in that order. **The styling is wrong.** In this help
centre `Tip:` is the label used for battery advice, sync timing, and how many
watch tiles you can install. Rendering the medical-boundary statement in the same
visual class as "it may take a minute for your Sleep Score to appear" flattens a
disclosure into a convenience note.

For a content designer this is the transferable caution: **a disclaimer's
component style is part of the disclaimer.** If the same `Tip:` chip carries both
"turn off Do Not Disturb" and "call emergency services", the chip has stopped
signalling anything.

Note also the scope: this disclaimer is attached to the **Health Metric Alerts
feature**, not to the Sleep Score, the Readiness score, Resilience, VO2 max, or
Active Zone Minutes. None of those articles carries a medical-boundary statement.
Compare Oura, which repeats "Oura Ring is not a medical device" at the foot of
individual feature articles.

**Premium / AI disclaimer** `[observed]`, under an `Important:` heading:
> "These tools **aren't intended for medical purposes**, operate independently of
> other Gemini applications, and are subject to change or varying availability.
> **Always verify the generated responses for accuracy**, as individual results
> may vary."

"Always verify the generated responses for accuracy" placed on a *health coaching*
product is a significant instruction with no accompanying guidance on how a
layperson would verify a health recommendation.

### Tier 2 — the regulated register, on Irregular Rhythm Notifications `[observed]`

The AFib article is written in an entirely different voice and is the most
carefully-constructed health disclosure in this batch of five products.

**Clinical evidence is given with study identifiers and full numbers:**

> "The Validation of Software for Assessment of Atrial Fibrillation From PPG Data
> Acquired by a Wearable Smartwatch Study (**NCT04380415**) included **455,699
> subjects**. There were **4,728** subjects who received an irregular rhythm
> notification and were invited to receive and wear an electrocardiogram (ECG)
> patch. Of those, **1,057** wore and returned a 7-day ECG patch monitor with
> usable data. The prevalence of AFib based on the 7-day ECG patch monitoring
> results was **32.2% (340/1057)**."

then the concordance figure — 98.2% (221/225) — and "**No serious adverse events
were observed** during the clinical study."

Giving the registry number, the funnel from enrolled to analysable, and the
adverse-event statement is trial-report practice, not marketing practice.

**Contraindications are stated as flat refusals:**

> `Can I still use Google Irregular Rhythm Notifications if I have been previously
> diagnosed with AFib?` → "**No.** Google Irregular Rhythm Notifications isn't
> intended for use in individuals previously diagnosed with AFib."

> `Can I use Irregular Rhythm Notifications if I'm under 22 years of age?` →
> "**No.** Irregular Rhythm Notifications has not been tested for and is not
> intended for use in people under 22 years of age."

Both answers begin with the word "No." and then give the reason. An age gate of
22 — not 18, not 21 — is the kind of specific number that signals a validated
population rather than a policy choice.

**Prohibitions are in capitals:**

> "**DO NOT** change your medication without first speaking to your doctor."
> "**DO NOT** use this product in place of treatment prescribed by your doctor."

**The negative-result problem is addressed directly**, which is the thing almost
every consumer health product gets wrong:

> "You might not receive a notification for every episode… **The absence of a
> notification doesn't mean you don't have AFib.** For this reason, **the feature
> shouldn't be used as a monitoring tool.**"
> "Erroneous false negative or false positive results due to the device or user
> error may occur. **If you don't get a notification, it's possible to still have
> AFib. Google Health is not always looking for AFib.**"

**"Google Health is not always looking for AFib"** is the sentence to steal. It
is six words of plain English that destroys the most dangerous inference a user
could draw from a reassuring silence. Compare Oura's `cannot diagnose or rule
out` — same job, different register, both correct.

**And a single humane sentence is allowed in among it:**
> "AFib is treatable, so the earlier you detect it, the sooner you and your doctor
> can do something about it."

One line of reassurance, placed after the warnings, giving the user a reason the
whole apparatus exists.

**The two features are disambiguated for the user** in their own section
(`What's the difference between Google Irregular Rhythm Notifications and the
Google ECG app?`): IRN is passive, optical, background, not real-time; the ECG app
is active, electrical, 30 seconds, and "qualitatively similar to a **Lead I ECG**
in that it can be used to discriminate between AFib and normal sinus rhythm."
Naming the lead configuration bounds the claim precisely.

### The gap between the two tiers

Put the two side by side and the finding is stark:

| | Wellness tier | Regulated tier |
|---|---|---|
| Disclaimer styling | `Tip:` chip | Dedicated sections, capitals |
| Evidence | none cited | NCT number, n, prevalence, concordance, adverse events |
| Contraindications | none | previously-diagnosed AFib; under 22 |
| False-negative handling | none | explicit, repeated, in plain English |
| Emergency escalation | "call emergency services" (one clause) | "talk to your doctor" plus prohibitions |

Both live in the same help centre, in adjacent articles, inside the same topic
group (`Sleep and wellness`). A user who has just read the AFib article's
disclosure discipline and then reads the VO2 max article — which places them in
`Poor` against a published population table with no caveat at all — is being
served by two different standards with no signal about which applies.

**This is the most useful comparative observation in the batch**: when a company
operates both regulated and unregulated health features, the regulated content
sets a visible standard, and the gap to the unregulated content becomes legible
to anyone who reads both.

### Subscription and cancellation `[observed]`

`Cancel your Google Health Premium subscription` opens correctly:

> "If you decide to stop your Google Health Premium subscription, you can cancel
> it at any time. Your subscription remains active until the end of your current
> billing period."

Then three `Important:` bullets, and the **first one is the finding**:

> "**Uninstalling the Google Health app will not cancel your subscription.**"

Pre-empting the single most common and most costly user misconception about app
subscriptions, in the first line of the Important block, is excellent practice and
directly relevant to any subscription-cancellation review.

> "Cancelling the free trial or subscription **stops the auto-renew**. You'll keep
> the remaining trial or subscription until it expires."

> "After Google Health Premium expires, **the data in the Google Health Coach is
> still retained.** You can manually delete the data."

The third bullet is the Oura pattern — cancelling is not deleting, stated on the
cancellation page.

Routing is by purchase platform (Android/Play, Google Store, PayPal, "other
stores"), with a diagnostic tip: "To determine which platform handles your
billing, **check your email for a subscription receipt**". Refunds are flatly
stated: "**Google doesn't give refunds for most Google Play purchases.**"

The article carries **platform tabs (`Android` / `iPhone & iPad`)** at the foot —
a content-variant mechanism the other products in this batch do not use, and a
better solution to the platform-fragmentation problem than Calm's
everything-in-one-article approach.

**No price is stated on any page inspected** — the Premium article routes to the
Google Store for pricing. Headspace, Calm and Oura all state a price on a
harvestable page; Fitbit does not.

**Availability is disclosed precisely** `[observed]`: Premium coaching is listed
for 37 named countries, requires a Fitbit or Pixel Watch device, requires the user
to be "**over the age of 18**", and "This article isn't applicable in India." The
repeated boilerplate — "Content and features are subject to change, aren't
available in all countries, may vary by device and **may be in English only**" —
is unglamorous but complete.

### Data and privacy `[observed]`

Privacy is handled at Google-platform level; the help centre carries the
user-facing controls:

`Control your Google Health data` · `How do I export my Google Health data?` ·
`How do I delete my Google Health account and service?` ·
`Manage your Google Health Coach data & personalization` ·
`Manage & delete your medical records data in the Google Health app` ·
`Learn why Google Health app requires location services` ·
`What should kids and teens know about Fitbit's privacy policies?` ·
`Our Continued Commitment To Data Privacy and Security`

**Per-metric deletion is documented in detail** for the readiness score, with
three granularities: `Delete today's data`, `Delete all readiness score data`,
`Delete a custom range`, then `Confirm and Delete`. Likewise irregular-rhythm
notifications can be deleted singly or by date range. **Granular, per-metric,
per-date-range deletion of health data** is a strong control and the copy names
each option explicitly rather than hiding them behind "Manage data".

One data-minimisation note, stated as a change: Spot Check EDA data "stays on the
device. This data will no longer send or save to the phone app for the Charge 5,
Charge 6, or Sense." A feature getting *less* data-hungry, documented.

`Connect with friends on Google Health` is the only social feature found — no
public leaderboard content was reachable on these surfaces.

## T11 Help-centre architecture

Standard Google support platform. Two levels: Topic → Article. 13 topics (T1).

**The dominant article pattern is the accordion**: every substantial article opens
with `Expand all` / `Collapse all` and is built from collapsed zippy sections with
question-shaped headings. A single article therefore carries what other help
centres would split across five. `Manage stress & mindfulness in Google Health` is
the extreme case — it contains the entire stress feature set, per-device breathing
instructions for nine device families, the Resilience explanation, and a
third-party sync section, in one URL.

**Consequence**: deep-linking to an answer is hard, and the article's `Was this
helpful?` rating applies to a document that may be 80% irrelevant to the reader.
Against that, the accordion means device-specific instructions can coexist without
a combinatorial explosion of articles — a real problem for a company supporting
20+ hardware generations.

**Device-generation support is the defining constraint on this help centre.** The
AFib article lists **18 devices with minimum firmware version numbers**; the
readiness article gives a two-column device-compatibility table; the breathing
article gives separate instructions for Blaze, Charge 2, Charge 3/4, Inspire
HR/2, Inspire 3/Luxe, Sense series, Versa series, and Pixel Watch 2/3/4. No other
product in this batch carries anything like this load, and it visibly degrades the
prose: procedures are interrupted every few lines by a device qualifier.

**Article-title grammar — four shapes, in declining frequency:**

| Shape | Example |
|---|---|
| `How do I <verb>…?` | `How do I export my Google Health data?` |
| Imperative | `Track sleep with Google Health` · `Charge your Fitbit device` |
| `What is/What's <noun>` | `What is Morning Brief` · `What's the Sleep Score in the Google Health app` |
| `Why <negative>?` | `Why won't my Fitbit device sync?` |

The imperative titles are the newer layer and the `How do I…?` titles the older —
the same archaeological pattern seen in `Getting started` (T4). `What is Morning
Brief` has **no question mark** while `What is the Google ECG app?` does.

**Routing furniture**: `Was this helpful? Yes / No` plus `How can we improve it?`
and a `Submit` — a free-text channel, unlike the binary-only widgets on Headspace
and Calm. Then two named next steps: `Post to the help community` ("Get answers
from community members") and `Contact us` ("Tell us more and we'll help you get
there"). **Community is offered before support.** A `Related articles` rail
enumerates every sibling article with `n of 22` counters.

**A persistent sitewide notification**: "For assistance with Fitbit Ace LTE, go to
support.google.com/fitbitacelte." — the kids' device has been split to a fourth
support property.

**37 languages** in the footer switcher, against an English-only-in-places
feature set ("may be in English only").

## T12 FAQs

**There is no standalone FAQ artefact**, because there is no Fitbit marketing site
left. `[absent]` for the marketing-FAQ pattern.

What exists instead is **the accordion-as-FAQ**: every help article is a set of
question-shaped section headings. The richest and most interesting set is the
Sleep Score article's `Understanding your new Sleep Score` block, which is a
**migration FAQ** — six questions about an algorithm change:

| # | Question (verbatim) |
|---|---|
| 1 | Why is my Sleep Score suddenly lower than it used to be? |
| 2 | What is considered a "good" score with this new system? |
| 3 | I feel completely rested, but my score is low. Should I be worried? |
| 4 | Can I switch back to the old Sleep Score? |
| 5 | How does the app tell the difference between "awake" and "restlessness"? |
| 6 | Does the new algorithm delete my historical sleep data? |

**This is the best-written content in the file and possibly in the batch.** The
ordering is a genuine emotional sequence: the alarm (my number dropped) → the
recalibration (what counts as good now) → **the personal doubt (should I be
worried)** → the escape attempt (can I go back) → the mechanism (how does it
decide) → the loss (is my history gone).

Q1's answer contains the sentence that does the most work:
> "**Your sleep hasn't suddenly gotten worse.** It's just using more accurate
> sleep data to characterize your sleep in a holistic way."

Five words, present perfect, addressing the exact inference the user has just
made. Everything else in the answer is mechanism; that sentence is the content.

Q2 answers with a reassurance about continuity — "**The benchmarks for a good
Sleep Score have not shifted.** Under the new system, hitting 80+ still
represents that you took advantage of your sleep period" — then adds "Focus on
your own personal trends over time rather than **chasing a perfect 100**."

Q3 is covered in T14; it is the strongest single passage.

Q4 answers "**No.**" without cushioning, then gives the reason (accuracy,
alignment with self-report). Refusing a rollback flatly, and justifying it, beats
an apologetic non-answer.

Q6 admits the retroactive change: "You may notice a change in your recent
historical sleep data trends including your Sleep Score and sleep stages." A
product silently rewriting a user's history is the kind of thing that normally
surfaces only on forums.

**Other FAQ-shaped sets** `[observed]`: the AFib article (13 questions),
`How accurate are Fitbit devices?` (8), the cancellation article's platform
sections, and `Frequently asked questions about Fitbit's accessibility features`
(2).

## T13 Terminology & glossary

**No public glossary exists.** `[absent]` Terms are defined in situ. Compare
Oura's ~50-entry published glossary — for a product with a comparable metric
surface, the absence is notable.

### The metric vocabulary

| Term | Definition as published | The alternative it rejected |
|---|---|---|
| `Sleep Score` | "capture, in a single number, how well you slept overall" | |
| `Sound sleep` | "Light, Deep, and REM sleep stages… when you are in a stable sleep state. Put simply: **if we woke you up during sound sleep, you'd likely know you'd been asleep**" | — a coined, non-clinical term deliberately distinguished from `Deep sleep` |
| `Deep sleep` | "the estimate of **N3 sleep** — also known as slow-wave sleep" | |
| `Time to sound sleep` | "the **settling-down phase**" | "sleep latency" (Oura's choice) |
| `Restlessness` | brief wakeful moments under 5 minutes | "restless time" |
| `Full awakenings` | interruptions over 5 minutes, count | "wake-ups" |
| `Interruptions` | total awake time in stretches over 5 minutes | |
| `readiness score` | "a daily snapshot of your body's recovery status" | Oura's `Readiness Score` (capitalised) |
| `Resilience` | "your capacity for the day ahead… ability to absorb and bounce back" | |
| `Body Responses` | "sudden and rapid increase in autonomic nervous system activity" | "stress events", "stress score" |
| `EDA` / `Spot Check EDA (sEDA)` | "tiny changes in the sweat level of your skin" | |
| `Active Zone Minutes` (`AZM`, `Zone Min`) | time in moderate/vigorous/peak heart-rate zones, weighted | "active minutes" (the legacy metric, retained separately) |
| `moderate (fat burn)` · `vigorous (cardio)` · `peak` | heart-rate zones, clinical term glossed with consumer term | |
| `VO2 max` | "**formerly known as cardio fitness score**" | — a documented rename toward the clinical term |
| `cardio load` / `target load` | training-load pair | |
| `MET` | "Metabolic Equivalent… 1 MET is the rate of energy you expend during rest" | |
| `Morning Brief` | the daily digest | "Daily summary" |
| `Key takeaway` | the single personalised insight in Morning Brief | |
| `Mental wellbeing` | the app section containing Mindfulness, Body responses, Resilience | "Stress", "Mind" |
| `Focus areas` | the app's grouping construct | "Categories" |
| `Health checks` | the app section containing Irregular rhythm | — note `checks`, not `monitoring` |
| `mindful days` / `mindfulness minutes` | the two mindfulness metrics | |
| `Google Health Coach` | the Gemini-built AI coach | |
| `Google Health Premium` | the subscription | **`Fitbit Premium` — retired** |
| `Google Health app` | the app | **`Fitbit app` — retired but still appearing** |

### The rename is the story

Four documented renames are visible in the current content, at three different
stages of completion:

1. **`Fitbit app` → `Google Health app`** — mostly done in titles, incomplete in
   bodies and link text (T1).
2. **`Fitbit Premium` → `Google Health Premium`** — appears complete.
3. **`cardio fitness score` → `VO2 max`** — completed, with the old name
   preserved parenthetically. A move *toward* the clinical term, away from the
   consumer coinage.
4. **Readiness labels `low / good / excellent` → `low / moderate / high`** —
   completed, and the change was published.

**Renames 3 and 4 run in opposite directions and both are right.** VO2 max moved
from a friendly invented name to the real clinical one, because the metric is
genuinely that quantity and users encounter it elsewhere. The readiness labels
moved from evaluative to descriptive, because the metric is a proprietary
construct and quality words were making claims about the person. The rule that
emerges: **borrow the real term when you are measuring a real quantity; use
neutral magnitude words when you are scoring your own construct.**

**Rename 1 is the cautionary one.** The public evidence of a half-completed brand
migration includes: two brand names in one article title, `Fitbit app` inside a
`Google Health app` article, legacy `/fitbit/` URLs in inline links, a
Fitbit-branded article (`How accurate are Fitbit devices?`) reached from a
Google Health topic list, and `Cancel membership` against `subscription`
everywhere else. For a content designer this is the concrete illustration of why
a rename needs an inventory and a cutover plan covering titles, bodies, link text,
URLs, in-product strings, and haptics — not just the pages that get rewritten.

**One deliberate near-collision worth recording**: Fitbit has both `Resilience`
and `readiness score`, and Oura has both `Resilience` and `Readiness Score`, with
**different definitions in each product**. Fitbit's Resilience is a daily capacity
rating with three levels; Oura's is a 14-day balance metric with five. A user
switching products carries the word and not the meaning.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout; first-person plural for the
company, used unusually often inside explanations of method — "**we** consider any
time that you were likely asleep", "**we** add up all the moments", "**we** only
count periods of wakefulness that last longer than five minutes", "**we** exclude
longer, memorable awakenings", "**we've** redefined how the Sleep Score operates".

**This is the distinguishing voice choice in the file.** Fitbit narrates its own
algorithm in the first person. The effect is that the score reads as a judgement
*made by someone*, with stated reasoning, rather than as a fact emitted by a
device. It makes the number arguable, which is the right relationship for a user
to have with an estimate. Oura, by comparison, writes mechanism in the passive or
with the product as subject ("Oura analyzes your sleep by measuring…").

**Register.** Plain, medium-length sentences. Very few contractions in the
regulated content, more in the wellness content. **No exclamation marks observed.**
Clinical terms are used and glossed. The register is noticeably flatter and more
procedural than Headspace's or Calm's — there is almost no brand personality left
in this content, which is itself a consequence of the migration.

**Copy that risks encouraging unhealthy behaviour — findings in both directions.**
Fitbit produces both the best single passage in this batch and some of the
sharpest hazards.

*Mitigations observed — and the sleep-migration FAQ is the standout:*

1. **"Always trust your body first."** The full passage, answering
   `I feel completely rested, but my score is low. Should I be worried?`:

   > "**Always trust your body first.** The algorithm measures physiological
   > markers, like movement and heart function. But **your subjective feeling of
   > rest matters just as much.** If you wake up feeling energised, **don't let a
   > lower score induce anxiety.** Instead, use the sub-metrics to spot minor
   > environmental factors like room temperature or a late meal…"

   Four moves in four sentences: **subordinate the metric to the user's own
   experience; explain what the metric can and cannot see; name the harm
   explicitly ("anxiety"); redirect to something small and actionable.** Naming
   anxiety as the risk, in the product's own help content, and instructing the
   user not to feel it, is the most direct piece of wellbeing-protective copy
   found anywhere in this batch of five.

2. **"Your sleep hasn't suddenly gotten worse."** (T12) — pre-empting the
   self-blaming inference from a product change.

3. **Anti-maximisation, twice**: "rather than **chasing a perfect 100**" and
   "Instead of comparing yourself to the **global average**, focus on reaching the
   higher end of **your own healthy range**… 'your personal best.'"

4. **The published population distribution** (72–83) lets a user place themselves
   rather than aim at 100.

5. **`Moderate` replacing `good`** in the readiness labels (T6) — removing an
   evaluative word from a daily score.

6. **Goals are all stated as editable**, and the defaults are sourced to AHA and
   CDC rather than invented.

7. **Low Readiness names four possible causes and allows combinations**, so the
   user is not led to a single behavioural culprit.

8. **Body-response notifications are off by default** on Pixel Watch.

9. **Health Metric Alerts only fire out-of-range** — silence is the normal state.

10. **The breathing-session safety warning** (T7) — a product telling a user to
    stop using it if they feel unwell.

11. **`View result`** as the neutral CTA on a potential-AFib notification (T3).

*Risks observed:*

1. **`Poor`.** The bottom Sleep Score band is a verdict on the user's night, in
   one word, on a card seen first thing in the morning. Every mitigation listed
   above is *prose inside a help article*; the label is the interface. Oura's
   `Pay Attention` demonstrates that the slot can be filled without a negative
   adjective. **This is the clearest single improvable string in the batch.**

2. **"You can't turn off your Sleep Score at this time."** `[observed]` — stated
   flatly under a heading called `Control your sleep score`, which is the one
   thing the section does not let you do. Headspace lets users hide the run
   streak; Calm lets users repair it and hide the UI entirely (`Zen Mode`); Oura
   ships `Rest Mode`. Fitbit is the only product in this batch that scores the
   user daily and provides **no documented way to stop seeing the score.** For a
   sleep metric, where anxiety about the number directly damages the thing being
   measured, this is a substantive design risk and the help content admits it in
   one sentence without addressing it.

3. **The VO2 max tables** (T6) place a user in a named band down to `Poor`,
   by age and sex, with no surrounding reassurance, no trend-over-absolute
   instruction, and no referral — in the same help centre that elsewhere says
   "don't let a lower score induce anxiety". The mitigating voice exists; it was
   not applied here.

4. **The `Tip:`-styled medical disclaimer** (T10) — the most serious formatting
   finding in the file.

5. **Three published lower bounds for the Low readiness band** and two published
   score ranges (0–100 and 1–100) (T6). Small, but it is the number a user reads
   daily.

6. **Buzz-count meanings change between device generations** (T9) — a learned
   vocabulary that silently re-maps on upgrade.

7. **Retroactive rewriting of historical scores**, disclosed only in the sixth
   question of a collapsed accordion (T12). The disclosure is honest; the
   placement makes it easy to miss.

8. **"Always verify the generated responses for accuracy"** on an AI health coach,
   with no guidance on how.

**Accessibility content** `[observed]`

- `Skip to main content` present on help pages; `Skip Navigation` on the store.
  Two strings.
- **No WCAG conformance statement, no VPAT, no accessibility statement** was found
  for Fitbit or Google Health on the surfaces inspected. Headspace publishes dated
  VPATs; Calm publishes an (old) WCAG 2.1 AA statement; Oura publishes a full
  EU-format statement with enumerated defects. Fitbit publishes a **feature list**
  instead — `Accessibility features available on your Google Health service`.
- That article is nonetheless substantial, organised by **impairment category**
  (`Vision` · `Hearing` · `Touch` · `Voice`) and by surface (phone app, Pixel
  Watch, ECG app), with each feature linked to the platform instructions:
  TalkBack, display size and text, colour correction and inversion,
  Select to Speak, hearing-aid pairing, live captions, Voice Access, Switch
  Access, speech-to-text.
- `Voice` under the phone app resolves to the single line "**Use the app without
  voice commands.**" — which reads as an oversight rather than a feature.
- **Device-side accessibility is documented and specific**: `Magnify` /
  `Screen Zoom` with 2× and 3× ratios activated by triple-tap on Charge 6,
  Sense 2 and Versa 4; and the **`Fitbraille`** app for Versa, which "translate[s]
  the time and your current step count to Braille, and then use[s] vibrations to
  represent each number". A haptic Braille output for a screenless metric is a
  genuinely inventive accessibility feature and it is documented with
  button-shortcut instructions.
- Voice readout of stats is routed through **Amazon Alexa** on Sense/Versa
  ("Preface your request with 'Ask Google Health'") — a competitor's assistant
  used as the accessibility path, disclosed plainly.
- **A dedicated, multi-channel support team**: "The **Google Disability Support
  team** is available to answer questions about your Fitbit device by phone, chat,
  email, **the Be My Eyes app**, and **video with ALS specialists**."
  Be My Eyes and ALS-specialist video are meaningfully specialised channels and
  are the strongest accessibility provision found in this batch.
- **Gaps**: `Learn more` repeated eight-plus times on the store category page with
  no distinguishing text; the store page renders large blocks of duplicated
  content (nav, product blocks, "Why buy on the Google Store" items all appear
  twice in the fetched markup), which screen-reader users may traverse twice;
  image alt text on the store page was largely absent from the fetched markup; and
  the help centre's heavy reliance on collapsed accordions means a screen-reader
  user must expand sections to discover whether an article covers their case.

---

## Transferable patterns

1. **Split metric explanation into `Definition` and `Understanding your number`.**
   Two labelled columns: what was measured, then which direction is good and how
   much variation is normal. Fitbit's six sleep contributors are the model.
   Transfers to any dashboard metric a user is expected to act on — including
   financial health scores, risk ratings and utilisation figures.

2. **"Always trust your body first."** When your product scores something the user
   can also perceive directly, tell them their perception wins. State what the
   algorithm can see, name the anxiety risk explicitly, and redirect to a small
   actionable factor. Condition: only honest where the user really does have
   direct access to the underlying reality — do not use it to excuse an inaccurate
   measurement of something they cannot check.

3. **Publish the population distribution alongside the bands.** "Most users see an
   average Sleep Score between 72 and 83" converts a verdict into a position and
   is often more reassuring than any adjective.

4. **Write the migration FAQ in emotional order**, not logical order: the alarm →
   the recalibration → the personal doubt → the escape attempt → the mechanism →
   the loss. And lead the first answer with the reassurance
   ("Your sleep hasn't suddenly gotten worse"), not the explanation.

5. **Borrow the real term when measuring a real quantity; use neutral magnitude
   words when scoring your own construct.** `cardio fitness score` → `VO2 max`,
   and `good`/`excellent` → `moderate`/`high`, in the same product, in opposite
   directions, both correct.

6. **Pre-empt "I uninstalled it, so I cancelled it."** Put
   "Uninstalling the app will not cancel your subscription" first in the Important
   block of the cancellation article.

7. **Say what happens when there is nothing to report.** Fitbit's
   `Health Metric Alerts` surface only out-of-range values; the same restraint as
   Oura's "actively monitoring" state. Silence becomes informative.

8. **Explain the threshold and its reasoning, not just the number.** The 5-minute
   awake/restless boundary is justified ("this is how long they must last for most
   people to be able to remember being awake") and anchored to the user's own
   memory — a reference point they can verify.

9. **"Google Health is not always looking for AFib."** Never let silence imply a
   negative result. Say, in plain words, that absence of an alert is not absence of
   the condition. Transfers to fraud monitoring, compliance screening, security
   alerting, and any "we'll let you know if" feature.

10. **A disclaimer's component style is part of the disclaimer.** Do not render a
    medical or financial boundary statement in the same chip you use for battery
    tips. Audit disclosure content by *component*, not just by wording.

11. **Derive goals from a named external guideline and give both the period figure
    and the daily equivalent.** "150 AZM each week… an average of 22 Active Zone
    Minutes daily" with the AHA cited, plus "you can change your goal."

12. **Treat haptics as content.** Buzz counts that mean different zones on
    different device generations are an unversioned string change in a
    non-verbal vocabulary.

## Caveats & gaps

- **Fitbit's own marketing site no longer exists** as a distinct property.
  Everything in T2 and much of T3 is Google Store copy about a product category,
  not Fitbit's voice. Any conclusion in this file about "Fitbit's brand voice"
  should be read as a conclusion about **Google Health's** voice, because that is
  what is now published. The historical Fitbit register (`Fitbit Premium`,
  community challenges, badges, the step-goal celebration) is not recoverable from
  public surfaces in this pass.
- **No price was observed.** Google Health Premium pricing lives on the Google
  Store product page, which was not fetched. Cancellation copy is captured; the
  commercial disclosure around sign-up is not.
- **Privacy Policy and Terms are Google-wide and were not fetched.** GDPR, CCPA
  and consumer-health-data posture are therefore **unassessed** for this product.
  Given that the other three products in this batch each publish a dedicated
  consumer-health-data policy, the absence of a Fitbit-specific one is *probably*
  a consequence of platform consolidation rather than a gap — but that is an
  inference, not an observation.
- **The "not FDA-cleared" question is left open.** The AFib article's register
  (NCT number, contraindications, age gate, adverse-event statement) is
  characteristic of a regulated software function, but **no page inspected uses
  the phrase "FDA-cleared" or names a clearance number.** Do not cite this file as
  evidence of regulatory status in either direction.
- **All in-product copy is `[documented]`, not observed** — score cards, the
  `Poor` label as rendered, Morning Brief, `No score`, notification strings, the
  mood picker, `Log Mood`, `View result`. The band labels are quoted from help
  tables; the on-screen strings may differ.
- **The three conflicting readiness ranges** are confirmed across two fetched
  articles. The 0/1/29 discrepancy is real in the documentation; which value the
  app uses is unknown.
- **`What is the Google ECG app?`, `Loss of Pulse Detection`,
  `Breathing Emergency Detection`, and `Sync your medical records` were not
  fetched.** These are the four highest-stakes features in the product and their
  disclosure copy is unharvested. `Loss of Pulse Detection` in particular is a
  life-safety feature whose wording would materially extend the T10 findings.
- **`Connect with friends on Google Health` was not fetched** — the social and
  comparison surface, which is where step-goal competition and any leaderboard
  language would live, is unassessed. This matters for the T14 risk analysis:
  social comparison is the classic fitness-tracker harm vector and it is the one
  area this harvest could not cover.
- **The VO2 max women's 60-120 table contains a typo** (`28.` / `28.4`), observed
  in the fetched markup; it may be a rendering artefact.
- **No accessibility conformance artefact was found**, but Google publishes
  accessibility commitments at corporate level (`accessibility.google`) which were
  not fetched. The `[absent]` finding is scoped to the Fitbit/Google Health
  product surfaces.
- **Non-English content unharvested** across 37 locales, including whether the
  `Poor` label and the "don't let a lower score induce anxiety" passage survive
  translation.

## Sources

1. https://www.fitbit.com/global/us/home (redirects to https://store.google.com/us/category/watches_trackers)
2. https://support.google.com/fitbit/?hl=en (redirects to https://support.google.com/googlehealth/?hl=en)
3. https://support.google.com/googlehealth/answer/14236513?hl=en (Sleep Score)
4. https://support.google.com/googlehealth/answer/14236710?hl=en (Readiness score)
5. https://support.google.com/googlehealth/answer/14236509?hl=en (Active Zone Minutes)
6. https://support.google.com/googlehealth/answer/14237924?hl=en (VO2 max)
7. https://support.google.com/googlehealth/answer/14237928?hl=en (Stress & mindfulness)
8. https://support.google.com/googlehealth/answer/15344549?hl=en (Morning Brief)
9. https://support.google.com/googlehealth/answer/14236920?hl=en (Accuracy)
10. https://support.google.com/googlehealth/answer/14236719?hl=en (Irregular Rhythm Notifications / AFib)
11. https://support.google.com/googlehealth/answer/14237941?hl=en (Google Health Premium)
12. https://support.google.com/googlehealth/answer/18072871?hl=en (Cancel Premium)
13. https://support.google.com/googlehealth/answer/14237214?hl=en (Accessibility features)
