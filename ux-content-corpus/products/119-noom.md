# 119. Noom

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Behavioural weight management (psychology-led coaching app + telehealth GLP-1 prescribing) |
| Primary URL | https://www.noom.com/ |
| Corpus rank | 119 |
| Benchmark strength (source list) | Behavior-change prompts |
| Locale / market observed | en-US; site offers `EN / KO / ES / DE / FR` |
| Platform observed | Web (desktop), support/FAQ hub, terms, blog |
| Regulatory posture | **HIPAA** — a `HIPAA Notice` is published as a standalone footer link, alongside a general `Privacy Policy`; the telehealth arm is the covered activity. **Consumer health data** — a `Consumer Health Data Privacy Notice` and a `Your Privacy Choices` / `do-not-share` control are footer-level (the Washington MHMDA / US state-privacy class of law). **Pharmacy/telehealth** — a `LegitScript Certified` badge is rendered in the footer of every page, linking to LegitScript's verification record; compounded-medication and FDA-approval status are disclosed in footnotes (quoted in T10). **Auto-renewal** — the Terms devote a full section (§6) to `FEES AND PURCHASE TERMS; AUTOMATICALLY RENEWING SUBSCRIPTIONS`, and include a **California three-business-day rescission clause** in the statutory bolded form, which is a state auto-renewal/home-solicitation compliance artefact. **Scope** — Terms §1.6 `No Physician-Patient Relationship` disclaims medical care for the behavioural product. **Publicly documented history:** Noom's automatic-renewal and cancellation practices were the subject of a US consumer class action that was resolved by a reported $62m settlement in 2022. I did **not** verify any FTC order against Noom during this harvest and none is referenced on Noom's own site; the class-action settlement is recorded here as publicly reported context only, and should be re-verified before use. **GDPR** — not assessed; only the `en-US` surface was inspected. |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial — marketing, support IA, cancellation/refund, accessibility, the behaviour-change explainer and Terms §1 and §6 captured in full. The Terms (456 lines) were read selectively. **No survey, quiz or intake was started.** Most in-app lesson, prompt and weigh-in copy is inaccessible and is `[documented]` or `[absent]`. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.noom.com/ | Dual-product hero, GLP-1 modules, 10-question FAQ, four numbered footnotes |
| Lose Weight (Noom Weight) | https://www.noom.com/lose-weight/ | The purest behaviour-change copy on the site |
| What is the Noom "diet"? | https://www.noom.com/blog/weight-management/what-is-the-noom-diet/ | **The colour-system and daily-lesson artefact**; full plan price list |
| Support / FAQ hub | https://www.noom.com/support/ | 10 categories, 7 featured articles |
| How to Cancel Your Noom Subscription or Trial | https://www.noom.com/support/faqs/subscription-and-billing/…/ | Three cancellation routes + refund window |
| Noom Refund Policy | https://www.noom.com/support/faqs/…/noom-refund-policy/ | Per-programme refund rules |
| Terms and Conditions of Use | https://www.noom.com/terms-and-conditions-of-use/ | §1 eligibility/scope, §6 auto-renewal (read); rest skimmed |
| Accessibility | https://www.noom.com/accessibility/ | Contact-only statement |
| Noom Weight (support category) | https://www.noom.com/support/faqs/programs/noom-weight/ | One article — see T11 |

---

## T1 Navigation & IA labels `[observed]`

**Three top-level groups:** `For Individuals` · `For Organizations` · `Company`,
plus a language switch and `Login`.

`For Individuals` mixes products with **calculators used as acquisition tools**:
`Noom Med` · `Lose Weight` · `Menopause & HRT` · `Personality Quiz` ·
`Calorie Calculator` · `Macro Calculator` · `GLP-1 Insurance Checker` ·
`MEDICARE GLP-1 COVERAGE`.

Two observations. **The nav is drifting from behaviour change to pharmacology** —
four of eight items are medication- or measurement-related, and
`MEDICARE GLP-1 COVERAGE` is set in all caps, the only shouted item in the menu.
And **`Personality Quiz` appears and disappears between page renders** — it is
present in the nav on `/support/` and `/accessibility/` but absent on `/` and
`/lose-weight/`. Recorded as an observed inconsistency.

**Footer is four columns plus a legal band.** The `Resources` column is the
interesting one:
`Support` · `GLP-1 Access & Transparency` · `GLP-1 Companion` · `HRT Safety` ·
`Brand Ambassadors`

**`GLP-1 Access & Transparency` and `HRT Safety` are footer-level named pages.**
Publishing a "transparency" and a "safety" artefact per drug class, as
permanent footer links, is a disclosure posture borrowed from pharma rather than
from consumer apps. (Neither page was opened — see Caveats.)

The legal band carries eight items, including three distinct privacy artefacts:
`Privacy Policy` · `HIPAA Notice` · `Consumer Health Data Privacy Notice` ·
`Your Privacy Choices` · `Cookie Policy` · `Terms and Conditions` ·
`Candidate Privacy Policy` · `Accessibility`. Splitting HIPAA, consumer-health-
data and general privacy into three separate documents is correct for a company
operating both a wellness app and a telehealth practice.

**A `LegitScript Certified` badge sits in the footer of every page**, immediately
under the logo — a third-party pharmacy-verification mark used as trust
furniture.

**Support hub categories — ten, and they are system-shaped, not user-shaped:**
`Account Management` · `Subscription and Billing` · `Programs` (→ `Noom Med
Programs` → `Telehealth for Branded Meds`, `Medication Included`; `Noom Weight`;
`Sponsored Noom Membership`) · `Using the App` (→ `General Details`,
`Logging and Tracking` → `Food and Water`, `Exercise and Steps`, `Biometrics`;
`Daily Features`) · `Troubleshooting` (→ `Syncing and Compatibility`,
`Device and App`) · `Noom Shop and Add-Ons` · `Coach and Community` ·
`Privacy and Data`

**Defect, recorded:** the category tree exposes an internal node —
`Sponsored Noom Membership › Internal (Hidden)` — a page literally labelled
"Internal (Hidden)" rendered in the public support navigation. A content-ops
leak.

**Second defect:** on `/support/faqs/programs/noom-weight/`, every left-rail link
collapses to `https://www.noom.com/support/` — the entire category navigation is
broken on that page, and the category itself contains exactly one article
(`How to Restart or Resubscribe to Your Noom Weight Program`). A user seeking
help with the flagship behaviour-change product finds one re-subscription
article.

## T2 Value proposition & headline patterns `[observed]`

**The hero is a two-clause couplet** and it is the whole strategy in eight words:

> `Meds to lose the weight. Noom to keep it off.`

Parallel construction, two verbs, two timeframes. It concedes that the drug does
the losing and positions the product as the *maintenance* layer. Beneath it, two
side-by-side doors with their own headings and CTAs:

| Door | Heading | CTA |
|---|---|---|
| Medication | `Weight-loss medication and more.` | `See if you qualify` |
| Behavioural | `Psychology-based weight loss.` | `Start your trial` |

**Note the asymmetry in the CTAs**: the medical path asks the user to *qualify*;
the behavioural path offers a *trial*. Eligibility framing versus commitment
framing, correctly matched to the two risk profiles.

**Programme cards use indefinite-article naming** — `An Advanced GLP-1 Program`,
`A Preventive Health Program`, `More Low-Dose Way To Start` (the last is
ungrammatical as shipped). Each has a one-line gloss and a `SEE IF YOU QUALIFY`
button in caps.

**The mission headline is repeated twice on the homepage:**
`We're changing the way the world thinks about weight loss.` — and again on
`/lose-weight/` as `We're changing how the world thinks about weight loss.`
Two variants of the anchor line on two pages.

**On `/lose-weight/`, the headline set is where the behaviour-change voice
actually lives**, and it is markedly better than the homepage:

- `Lose the Weight For Good.`
- `We know the weight loss journey can be hard. Here's how we can make it a little easier.`
- `Let's Get Psychological`
- `You're The Boss`
- `Personal Coaching For Your Personal Goals`
- `Progress Over Perfection`
- `Make Your Health a Habit`

**`Progress Over Perfection`** and **`You're The Boss`** are the two headline
strings in this entire batch most directly aimed at the psychology of
self-blame. The second is doing autonomy-support work: it names the user as the
decision-maker before the product asks them to log anything.

The empathy-first subhead — "We know the weight loss journey can be hard" — leads
with acknowledgement rather than promise, and the qualifier "a little easier"
is deliberately modest. Compare the homepage's `The Easy Way to lose weight and
get healthy.` (on the microdose module). **Two directly contradictory difficulty
claims on one site.**

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `See if you qualify` | Hero, modules (×6, mixed case) | Eligibility framing |
| `SEE IF YOU QUALIFY` | Programme cards | All-caps variant of the same |
| `Start your trial` | Hero, Noom Weight block | |
| `Get Started` / `Get started` | `/lose-weight/`, homepage foot | Two casings |
| `FIND YOUR PLAN` | Homepage, mission block | All caps |
| `EXPLORE NOOM HEALTH` | B2B block | All caps |
| `Learn more` | Top banner (microdose) | Bare `Learn more` |
| `See all our blogs` / `SEE MORE POSTS` | Blog, Instagram | |
| `Contact Support` | Support hub | |
| `Login` | Footer | |
| `Cancel Subscription` | **In-product control name**, quoted in help | See T10 |
| `Manage Subscription` | In-product path, quoted in help | |
| `Apply a Coupon`-equivalent: `Subscription Portal` | The named self-serve billing surface | |

**Finding: the CTA layer is dominated by one verb — `qualify`.** Six of the
primary buttons ask the user to test their eligibility for medication. The
behavioural product, which is the thing the brand's mission statement is about,
has two CTAs (`Start your trial`, `Get Started`). The button inventory is a fair
map of where the business has moved.

**Second finding: casing is ungoverned.** `See if you qualify` /
`SEE IF YOU QUALIFY`, `Get Started` / `Get started`, `Start your trial` /
`Start Your Trial` all appear. All-caps is used for four different CTAs with no
discernible hierarchy rule.

## T4 Onboarding & getting-started `[observed]` / `[documented]`

**There is no published how-it-works sequence.** Onboarding is a survey, and the
survey is the front door: every acquisition CTA routes to
`/ps/main-survey`, `/ps/program-branching` or `/ps/landing`.

What the site says about it, in the homepage FAQ:

> `How do I get started with Noom?`
> "Starting with Noom is simple. Just take a **quick quiz** to customize your experience based on your goals, lifestyle, and preferences. You'll then receive a **personalized plan** designed to help you achieve lasting weight loss tailored to your unique needs."

Three things are notable. **(a) The quiz is described by its *outputs* (a
personalised plan), never by its inputs.** Unlike Talkspace, Noom does not
publish a field taxonomy for its survey anywhere that was reachable. **(b) The
duration is not bounded** — "quick quiz", not "5-minute assessment". **(c) There
is no published statement of what the survey asks about weight, body measurements
or eating history**, which is the sensitive part.

**The survey was not started** (see Caveats). What is knowable from URL structure
alone: the flow branches by product (`?route=clinical` vs `?route=_direct`), and
`program-branching` is a distinct named step, i.e. product selection precedes
data collection.

**Once inside the product, the onboarding unit is the Daily Lesson**, and the
commitment is bounded at the point of choice `[documented]`:

> "You'll choose whether you spend **5, 10, or 15 minutes per day (never more)** on lessons, quizzes, and simple tasks"

`(never more)` is the single best onboarding string on the site. It converts a
daily habit from an open-ended obligation into a capped one, and it lets the user
set the cap.

The trial is described in the FAQ as: "In most cases, you can start with a free
trial to see if Noom is right for you before committing to a subscription" —
`before committing` acknowledging that a subscription is a commitment.

## T5 Form & field labels `[observed]` / `[absent]`

**Almost entirely `[absent]`.** The survey was not entered; the app is not
publicly reachable. No input labels, placeholders, hint text or validation copy
were observed.

What is recoverable:

- **The logging object model**, from the support IA: `Logging and Tracking` splits into `Food and Water`, `Exercise and Steps`, `Biometrics`. So the four tracked quantities are food, water, movement and body measurements — with `Biometrics` as the euphemistic container for weight.
- **The food logger is named and described** `[documented]`: "you'll enter everything you eat into the Noom Weight app", "our food logger does that for you" (of calorie arithmetic).
- **In-product control names**, quoted in the cancellation article: `profile picture` (top-left) → `Settings` → `Manage Subscription`; and on web, `Subscription Portal` → `Cancel Subscription`.
- **Public calculators exist as separate tools** — `Calorie Calculator`, `Macro Calculator`, `GLP-1 Insurance Checker`, `Personality Quiz` — all at `/f/` routes. **None were used**; all collect body or health data.

## T6 Status & state language `[observed]` / `[documented]`

- `calorie range` — not "calorie target", not "calorie limit". A range implies a band of acceptable outcomes rather than a line to fail at. Used consistently: "We'll give you a calorie range", "stay within your calorie range", "as long as you stay within your calorie range".
- `green` / `yellow` / `orange` — the food state vocabulary (see T13 and T14).
- `Billing Period` / `Service Tier` — formally defined terms in §6.1 of the Terms, with `day` defined down to the timezone ("begins at 12:00 a.m. Eastern time and ends at 11:59 p.m. Eastern time").
- Cancellation state is explicit and reassuring `[documented]`: "Canceling doesn't end your access immediately. You'll keep getting full features until the current billing cycle wraps up."
- Uninstall is explicitly **not** a state change: "Uninstalling the app **will not** cancel your subscription" — stated three times across two articles.
- `prescription has been written` and `clinical visit has occurred` are the two refund-forfeiting state transitions (see T10).
- `Noom Med` ↔ `Noom Weight` is a documented **switch** rather than a cancel: "You can also switch to Noom Weight instead of canceling."

**Weigh-in state language is `[absent]`.** No in-product weigh-in prompt, graph
label, plateau message or goal-missed copy was reachable. The only public
reference is the feature list ("Weight logging, food and water tracking, step
counting") and a marketing image alt text, `Weight tracking progress popup`. This
is a significant gap for this file's brief — see Caveats.

## T7 Error, failure & recovery `[observed]`

- `Trouble Purchasing Your Noom Program or Using a Promo Code?` — a featured support article, i.e. purchase failure is a top-eight issue.
- `Trouble Syncing Fitbit or Steps to Noom (iOS)` — device-specific, platform-specific failure article.
- `Troubleshooting` → `Syncing and Compatibility`, `Device and App` — the failure taxonomy.
- `How to Restart or Resubscribe to Your Noom Weight Program` — the **lapse-recovery** article. Its existence is the notable part: returning after quitting is a modelled, named journey.

**The charge-confusion pattern is handled pre-emptively in the refund article**,
as a Q&A the user is likely to arrive with:

> "**Q: Does uninstalling the app cancel my subscription?** A: No. Uninstalling the app doesn't cancel your subscription. You'll continue to be charged unless you cancel in your Subscription Portal."

> "**Q: Can I get a refund after a renewal charge?** A: No. Renewal charges aren't refundable, so be sure to cancel before your renewal date."

Two flat `No`s, each followed immediately by the action that prevents recurrence.
No softening, no apology — which in a billing dispute is the right register.

**No in-product error copy is reachable.** `[absent]`

## T8 Empty states `[absent]`

None reachable. The support hub has no visible search, so there is no no-results
state to observe. All in-app empty states are behind auth.

## T9 Notifications & system messages `[documented]`

- **`Billing Reminder Emails`** — a named artefact, disclosed in the refund policy with its contents specified: "**Billing Reminder Emails** include details about renewal dates and refund eligibility." Proactively emailing renewal dates *and* refund eligibility is a meaningful pre-charge notification, and naming the email type in help content lets a user search their inbox for it.
- **Free-trial end is explicitly NOT notified**, stated in the Terms:
  > "We provide notice of the terms of the free trial at the time you register and **you will not receive a separate notice that your free trial is about to end or has ended, or that your paid subscription has begun**, unless required by law in particular instances or jurisdictions."

  This is a clear, honest, and unfavourable disclosure. It is also the mechanism most associated with unintended trial conversions. Recording it exactly, with no gloss: the Terms state one thing (no trial-end notice) and the refund article states another kind of email exists (billing reminders); whether the latter covers trial conversion is not stated.
- **Coach messaging** is the in-product channel: alt texts expose `Coach message notification popup`, `Protein tracking popup notification`, `Weight tracking progress popup`, `Noom Foodies community group popup` — four named notification archetypes, visible only as image descriptions.
- `SOS plans` — a named support mechanism on `/lose-weight/`: "With one-on-one coaching, support groups, and **SOS plans**, you can choose the kind of support you need to keep going." An emergency-protocol metaphor applied to motivational relapse. Not explained further anywhere reachable.

## T10 Disclosures, legal & compliance `[observed]` — PRIORITY

### Scope-of-service — who Noom says it is NOT for

**The consumer-facing version, in the homepage FAQ**, under
`Is Noom suitable for people with medical conditions?`. The answer opens
permissively and then pivots:

> "Noom can be suitable for people with medical conditions. The programs can be customized to fit many of them as well as various dietary needs. **However, Noom is not for everyone. You cannot use the service if you are under 18 years old, pregnant, have an eating disorder, or if you are underweight** (according to the Center for Disease Control and Prevention, a BMI falling below 18.5 is considered to be underweight)."

Four exclusions: **under 18, pregnant, eating disorder, underweight** — with the
underweight threshold given a named external definition (CDC, BMI < 18.5) rather
than left to judgement.

**Naming "have an eating disorder" as a hard exclusion on the marketing FAQ of a
weight-loss product is the single most important disclosure in this file**, and
it is correctly placed: on the public page, before purchase, in plain second
person, not in the Terms.

**The Terms version** (§1.2 `Who Can Join`) is broader and adds a removal power:

> "Noom is not for everyone. You cannot use the Service if you are under 18 years old. The Service should never be used as a replacement for recommended medical or mental health treatment. **If we find that it's appropriate, you may be removed from the Service so that your condition may be managed by a licensed medical profession.**"

(The typo `licensed medical profession` for "professional" is shipped.) The
removal clause is unusual and, read charitably, is a clinical-safety mechanism:
the product reserves the right to off-board a user into real care.

**§1.6 `No Physician-Patient Relationship`** disclaims the behavioural product
entirely:

> "We are not a licensed medical service provider, and any information provided by us should not be interpreted as medical advice or construed to form a physician-patient relationship. Be sure to talk to your doctor before starting Noom or any health or wellness service, and don't use Noom if you're having a medical emergency. **IF YOU THINK YOU ARE HAVING A MEDICAL EMERGENCY, CALL 911 OR SEEK IMMEDIATE MEDICAL ATTENTION.**"

**Noteworthy structural device: the Terms carry a plain-language `Summary` block
at the head of each section.** §1's reads:

> "Noom is designed to help you improve your health and habits, **but it is not medical care.** You must be 18 or older to use it, and you should always talk to a doctor for medical advice. Some features (like groups, coaches, or food data) are for support and information only—and may not always be accurate."

This is the best content-design decision on the entire Noom estate. A
**two-to-four-sentence plain-English summary above every Terms section**, written
in second person, leading with the hardest fact ("it is not medical care"). It
does not replace the legal text; it precedes it. Directly reusable.

**Coaching scope** is bounded in the same summary ("for support and information
only—and may not always be accurate") and softened in marketing: "Our coaches,
many of whom are board-certified health professionals" — `many of whom` is the
qualifier doing the work, and it is the only place the coach credential question
is addressed.

**Medication scope** is bounded repeatedly: "Not all customers will qualify for a
prescription." · "if it is deemed appropriate for your treatment plan based on
the clinician evaluation." · "Medications require consultation and prescription
by clinician through Noom platform."

### Crisis signposting `[absent]`, with one exception

**No mental-health or eating-disorder crisis signposting was found on any Noom
page inspected.** There is no persistent footer crisis line, no helpline, and — 
critically — **no crisis or support resource adjacent to the eating-disorder
exclusion**. The FAQ tells a user with an eating disorder that they cannot use
the service and then stops.

The only emergency instruction found is the medical one in Terms §1.6, quoted
above (`CALL 911 OR SEEK IMMEDIATE MEDICAL ATTENTION`), which is in the Terms,
in all caps, and concerns physical medical emergencies.

Recorded precisely: `[absent]` on `/`, `/lose-weight/`, `/support/`,
`/accessibility/`, the two billing articles, the Noom-diet blog post, and the
`noom-weight` support category. It may exist in the app, in the survey, in
coaching protocols, or on the unvisited `GLP-1 Access & Transparency` and
`HRT Safety` pages. This is an observation about public surfaces harvested, not
a claim about Noom's clinical safety practice.

**The contrast within this batch is the finding.** BetterHelp and Talkspace each
carry a persistent crisis line in the global footer of every page, and
BetterHelp's crisis list includes `National Crisis Line - Anorexia And Bulimia`
and `National Eating Disorders Association (NEDA)`. Noom — the product whose
exclusion list names eating disorders — carries none.

### The FTC-adjacent area: auto-renewal, cancellation and refunds

This is the most heavily built-out disclosure area on the site, and it is
constructed in three layers.

**Layer 1 — the plain-language Summary at the head of Terms §6:**

> "Paid plans renew on their own unless you cancel before your next billing date. Free trials and promotions may turn into paid plans if not canceled in time. Prices, billing, and taxes may change, and you are responsible for keeping your payment info current. Unless required by law, fees are generally not refundable."

Four sentences, each an unfavourable fact, in second person, above the legal
text. Nothing is hidden in that summary.

**Layer 2 — Terms §6.4, with the operative sentence bolded in the original:**

> "**Your subscription will automatically renew at the end of the disclosed billing period, unless canceled in accordance with the instructions for cancellation below. You agree that you must cancel your subscription, as set out in Section 6.6 below, to avoid being charged for your next Billing Period. Payment will be charged to your chosen payment method.**"

with a worked billing-date example: "if you have a monthly subscription and
became a paying subscriber on March 31, your payment method would be billed next
on April 30".

**§6.3(a) Free Trials** — quoted in full in T9 above — discloses the charge-on-
expiry mechanic *and* the absence of a reminder.

**§6.6 Canceling Auto-Renewal** gives the precise deadline, to the minute and
timezone:

> "You must cancel your subscription prior to **11:59 p.m. Eastern time on the day before your next recurring billing date** in order to avoid being charged for the next billing period."

and the pro-rata position:

> "We do not provide a refund or credit for partially used billing periods, although we may provide such refunds or credits on a case-by-case basis in our sole and absolute discretion."

and the third-party routing: subscriptions bought via App Store or Google Play
must be cancelled there, with a support link given.

**§6.7 California rescission**, reproduced in the statutory bolded form:

> "**you may cancel your agreement without penalty or obligation, at any time prior to midnight of the third business day following the date of this contract, excluding Sundays and holidays. To cancel this agreement and receive a refund, mail or deliver a signed and dated notice which states that you, the buyer, are canceling this agreement, or words of similar effect.**"

with the postal address given. Note that this statutory right is exercisable
**only by post** as written.

**Layer 3 — the support articles**, which are where the user actually goes.
`How to Cancel Your Noom Subscription or Trial` is structured
`Overview / What to Know / What to Do / Need to Know More? / Related Questions`
and gives **three cancellation routes**:

1. In-app: `profile picture` → `Settings` → `Manage Subscription`
2. Web: `Subscription Portal` → `Cancel Subscription`
3. App Store / Google Play, with links to each platform's own help

**Assessment of the cancellation copy, factually.** The instructions are
unambiguous, give literal control names, cover all three purchase channels, and
lead with the two reassurances users most need (`Canceling doesn't end your
access immediately`; `Uninstalling the app will not cancel your subscription`).
The `What to Know` block appears *before* the steps, which is the right order.
There is no dark-pattern language in the published article — no "are you sure",
no guilt framing, no retention offer in the copy. **What cannot be assessed from
outside is the cancellation flow itself**, which is where friction in this
category typically lives; the Subscription Portal requires a login and was not
entered.

**Refund windows, per programme** (from `Noom Refund Policy`):

| Programme | Rule (verbatim) |
|---|---|
| Noom Weight | "Refunds may be available if requested within **14 days of your first charge**. Renewal charges aren't refundable." |
| Noom Med | "Refunds may be available **unless a prescription has already been written**. Once a prescription is written, refunds are no longer possible." |
| Telehealth for Branded Meds | "Refunds may be available if requested within **7 days of your first charge**, unless a clinical visit has occurred." |

The rules are keyed to **clinical events rather than to time alone** for the two
medical products — the forfeiting trigger is a prescription being written or a
visit occurring. That is defensible and clearly stated, though it means a user
can lose refund eligibility on day one.

The article also offers the **switch instead of cancel**: "If you're in Noom Med
and want to switch to Noom Weight, you can make the change in your Subscription
Portal or by contacting Support." Presented as an option, not as an interception.

**Refund request mechanics** route to a chat widget: "Click the **orange chat
bubble** in the bottom-right corner of this page" — describing the control by
colour and position, which is good support writing but is colour-dependent and
therefore an accessibility weakness (see T14).

### Price disclosure

Prices appear in three places and **they do not agree**.

**Homepage footnotes** (numbered 1–4, rendered at page foot with back-links):

> 1. "Initial 3 week subscription and 4 weeks of medication from **$149** plus tax and **$349 per month** plus tax for 12 week subscription thereafter. New pricing for new accounts only effective as of March 31, 2026."
> 2. "Initial 3 week subscription and 4 weeks of medication from **$79** plus tax and **$199 per month** plus tax for 12 week subscription thereafter."

**The same footnote 1 rendered on the blog post** reads "**$299** per month" for
the same programme. Two figures for one price on one estate. Recorded as an
observed inconsistency.

**Noom Weight plan list** (blog post) — twelve auto-renewing plans:
`Monthly $70` · `2 month $129` · `3 month $159` · `4 month $169` · `5 month $174`
· `6 month $179` · `7 month $184` · `8 month $189` · `9 month $195` ·
`10 month $199` · `11 month $205` · `Annual $209 USD`

**Every one is labelled `auto-renewing plan`** in the list itself — the renewal
characteristic is part of the product name, not a footnote. That is good
practice. Less good: the homepage FAQ `How much does Noom cost?` answers with
"All of our products have different pricing" and two links, i.e. **the pricing
FAQ does not contain a price**, and the actual price list lives in a blog post.

Framing of cost is comparative and consumption-based: "Noom Weight probably costs
less than your night out on the town", "the same price as a month to a few months
membership at a good gym, or a pair of nice running shoes."

### Medication and efficacy disclosures

These are the most rigorous disclosures on the site, and they are unusually
candid:

> "*Medications require consultation and prescription by clinician through Noom platform. Not all customers will qualify for a prescription. **Medications included in Noom GLP-1Rx Program are produced in USP-compliant, state-regulated pharmacies but not reviewed by the FDA for safety, efficacy or quality.**"

> "If your clinician feels compounded medications are clinically appropriate for you, **any compounded medications are not approved by the FDA or reviewed for quality, safety or efficacy**. Novo Nordisk, Inc. is the only United States company with FDA-approved products containing semaglutide… Lilly USA LLC is the only United States company with FDA-approved products containing tirzepatide… Not available in all 50 states."

Naming the only two companies with FDA-approved versions of the molecules you
are selling a compounded alternative to is a strong, specific, verifiable
disclosure.

**The efficacy footnote is the best statistical honesty in this batch:**

> "Results based on a January 2026 analysis of 14,203 Noom GLP-1Rx Program members who actively logged weight over a 40 week period. High and low engagement groupings measured by quantile of app opens. **Higher app engagement was associated with greater weight loss at 16 weeks; this association does not imply causation.**"

A marketing footnote that explicitly disclaims causation, names the sample size,
the period, and the proxy used for engagement. That sentence should be the model
for any outcome claim.

Shipping-speed claim `🚚 Medication shipped to your door in just 7 days` is
bounded by footnote 4: "Not all medications are available for home delivery.
Availability of home delivery will depend on your insurance or cash pay status."

**Counter-observation:** the claim `98% of Noomers say Noom helps change their
habits and behaviors for good` appears in the FAQ with **no footnote, no sample
size and no source** — on the same page as the meticulously sourced 37% figure.
Disclosure rigour is not applied evenly.

### Data-use disclosure `[absent from this harvest]`

Three privacy artefacts are linked in the footer (`Privacy Policy`,
`HIPAA Notice`, `Consumer Health Data Privacy Notice`) plus a
`Your Privacy Choices` / `do-not-share` control. **None were opened.** Noom's
position on advertising use of weight, food-log or health data is therefore
unrecorded. See Caveats.

## T11 Help-centre architecture `[observed]`

Headed `Frequently Asked Questions` — the support hub calls itself an FAQ, which
undersells a ten-category tree.

**Structure:** 10 categories with up to three levels of nesting, a
`Featured Articles` shelf of seven, and a `Contact Support` CTA. **No search
box.** For a support hub with nested sub-sub-categories, the absence of search is
a significant navigational gap.

**Article-title grammar — three shapes:**

| Shape | Example |
|---|---|
| `How to <verb>…` | `How to Cancel Your Noom Subscription or Trial` · `How to Install the Noom App` |
| `Trouble <gerund>…?` | `Trouble Purchasing Your Noom Program or Using a Promo Code?` · `Trouble Syncing Fitbit or Steps to Noom (iOS)` |
| Noun-phrase topic | `Noom Refund Policy` · `Noom Med Subscription` · `Noom Med Medication Shipping` |

**The `Trouble …?` shape is the good one.** It is the user's own word for the
situation, phrased as a question, and it puts the platform in parentheses
(`(iOS)`) so the user can self-select. Compare Wise's first-person confession
titles — same instinct, one step less intimate.

**Every support article uses an identical five-block template:**
`Overview` → `What to Know` → `What to Do` → `Need to Know More?` (a Q&A block)
→ `Related Questions`. A governed template, consistently applied, with the
*context* before the *instructions* and the *edge cases* after. This is the
strongest structural pattern in this file after the Terms summaries.

**Failures in the help IA, recorded:**
- `Internal (Hidden)` exposed as a public category node.
- The `Noom Weight` category contains **one article**, and it is about resubscribing.
- On that category page every left-rail link resolves to `/support/` — navigation is broken.
- The same `Noom Refund Policy` article is linked from two different canonical paths (`/programs/…` and `/subscription-and-billing/…`), and the two featured-article lists on the same page give **different URLs for `Noom Med Subscription`**.

## T12 FAQs `[observed]`

Homepage accordion, heading `Frequently Asked Questions`, ten questions.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What is Noom? | Defines by method ("integrates psychology, technology, and coaching") then adds medication as the secondary path, with the phrase "guidance to minimize long-term reliance on medication". |
| 2 | What makes Noom different from other weight loss programs? | Leads with "not just what you eat, but why"; names the three pillars including "a color-coded food system". |
| 3 | What is the difference between Noom Weight and Noom Med? | The clearest product-distinction answer: Weight = behaviour, lessons, logging; Med = the same plus clinicians who "can prescribe medications if it is deemed appropriate". |
| 4 | How do I get started with Noom? | Quiz → personalised plan. No duration, no field list. |
| 5 | How much does Noom cost? | **Contains no price.** Routes to two blog posts; mentions the free trial. |
| 6 | What results can I expect from Noom? | Outcome framing via habits and "relationship with food"; the unsourced `98%` claim. |
| 7 | Can Noom prescribe Ozempic, Wegovy, or Zepbound? | Yes-with-conditions; each drug deep-linked to its own explainer. |
| 8 | What can I expect from Noom coaches? | AI and human coaching; "many of whom are board-certified health professionals". |
| 9 | Is Noom suitable for people with medical conditions? | **The exclusion list** — see T10. |
| 10 | What are Noom's GLP-1Rx and Microdose GLP-1Rx Programs? | Distinguishes the two dosing strategies; "easier to stick with over time" vs "more dynamic, personalized path". |

**Structural reading.** The set moves: identity → differentiation → product
split → start → cost → results → *drug names* → coaching → **exclusions** →
drug programmes. **Q9, the disqualification question, sits ninth of ten** — after
cost, results and the brand-name drug question. Compare BetterHelp, which places
`Is BetterHelp right for me?` fifth of nine, before cost. Noom's exclusion
disclosure is present and well-written but is positioned late in the funnel.

Three of the ten questions (7, 10, and half of 3) are about medication. Q7 is
phrased in **brand-name search language** (`Ozempic, Wegovy, or Zepbound`), which
is an SEO-shaped question doing real acquisition work.

## T13 Terminology & glossary `[observed]`

| Term | Noom's usage | The alternative it rejected |
|---|---|---|
| `green` / `yellow` / `orange` foods | The three-colour caloric-density system | "good/bad", "free/limited", red — **see the red note below** |
| `caloric density` | The stated basis of the colour system, glossed immediately as "how much that food will fill you up for the amount of calories" | "energy density", "calories per gram" |
| `calorie range` | The daily budget | "calorie target", "calorie limit", "allowance" |
| `Noomer` / `Noomers` | Users, as a collective identity | "members", "users" |
| `Noom Foodies` | A named community group (from alt text) | |
| `Daily Lessons` | The core content unit, capitalised | "modules", "course", "curriculum" |
| `food logger` | The tracking tool, named as an object | "diary", "tracker", "journal" |
| `Biometrics` | The support-IA container for weight and measurements | "Weight" |
| `mini habit` | A unit of behaviour change (from alt text: `05-phone-mini-habit-grouped`) | "task", "goal" |
| `SOS plans` | A relapse-support mechanism | "setback plan", "recovery plan" |
| `GLP-1 Companion` | The behavioural layer sold alongside medication | "medication support" |
| `GLP-1 Muscle Defense` | The muscle-preservation programme | "muscle retention" |
| `Noom Move` | On-demand exercise classes | "workouts" |
| `food school` | The metaphor for the programme ("Think of it as going to food school for a few months") | "course", "training" |
| `food noise` | Used in a member testimonial ("Cravings and food noise are gone") | — a clinical-adjacent coinage surfacing in user voice |
| `Service Tier` / `Billing Period` | Formally defined Terms vocabulary | |

**The colour system is the coined vocabulary that matters**, and two of its
design choices are deliberate and worth recording precisely.

**(a) There is no red.** The scale runs green → yellow → **orange**. Stopping
short of red removes the traffic-light "stop/forbidden" reading and leaves the
scale without a prohibition terminus. Given that the entire system is a
categorisation of food by desirability, the decision not to include the colour
that means "do not" is the most consequential single word-choice on the estate.

**(b) The system is explicitly framed as *density*, not *virtue*.** The blog post
defines it twice in three sentences: "The colors **just** help you understand the
caloric density of each food" and "**that doesn't mean they are bad or
off-limits**." The word `just` is doing de-escalation work.

**Register note:** `Noomer` is used almost exclusively in *testimonial and
success* contexts ("Noomers who have successfully hit their target weight told
us…"). The in-group name is attached to the people who are winning.

## T14 Voice, tone & accessibility `[observed]` — PRIORITY

### The anti-restriction voice, and where it holds

Noom's behaviour-change copy is built on an explicit, repeated refusal of
restriction framing. Recorded verbatim because the precision matters:

- "we don't believe in 'good' or 'bad' foods" (`/lose-weight/`)
- "We won't tell you what you can or can't eat either" (`/lose-weight/`)
- "Noom Weight will never tell you what you can and can't eat. That's always up to you." (blog)
- "With Noom, spaghetti is never a slip-up, because **no food is bad or off-limits**." (blog)
- "Just because they're an orange food (like chocolate, salami, or churros), it doesn't mean they're off limits."
- "You can still have the french fries anytime you want."
- "we want you to enjoy all your favorite foods"
- "**Progress Over Perfection**" (section header)
- "**You're The Boss** … You decide how Noom fits into your life. Not the other way around."
- "hit your goals at a pace that's comfortable for you" / "at a pace that's right for them"
- "the process of losing weight is full of ups and downs"
- "How much time you spend on each lesson is up to you" / "5, 10, or 15 minutes per day (never more)"
- "we understand that coaching isn't for everyone"

Read as a set, this is a coherent **autonomy-support strategy**: the product
repeatedly returns the decision to the user, pre-forgives deviation, bounds its
own demands, and names the non-linearity of the process. The construction
"spaghetti is never a slip-up" pre-empts a specific self-blame event rather than
issuing a general reassurance, which is the more effective technique.

`Progress Over Perfection` and `You're The Boss` are the two strongest
anti-shame headline strings in this batch.

### Where the copy could reinforce restrictive or shame-based patterns — observed findings with evidence

Recorded factually, as content findings, not as clinical or moral claims.

**(1) A three-tier food ranking is still a ranking, and the copy asks the user to
police it.** The de-escalation ("no food is bad") coexists with instructions to
self-monitor at the moment of eating:

> "We just ask that you enter them into your food logger and **be mindful of how many you really want in the moment**."
> "It helps them decide whether they **really want** to snack on some store-bought cookies, or whether they'd **rather** snack on something more nutritionally rewarding"

The phrase `really want` appears twice as a challenge to a stated desire. The
stated position is that no food is off-limits; the operational instruction is to
interrogate the wish before acting on it. **Mitigation present in the same
passage:** the challenge is framed as a choice between two options rather than as
a prohibition, and the fallback ("You can still have the french fries anytime you
want") is stated immediately.

**(2) `nutritionally rewarding` imports a virtue register into a system defined
as density.** Elsewhere the copy is disciplined ("The colors just help you
understand the caloric density"); here one food is described as more *rewarding*
than another, which is a value judgement, not a measurement. Single instance
observed.

**(3) Green foods are described as reducing desire for other foods** — a
desirable-outcome framing attached to the top tier:

> "a lot of Noomers say that when they started filling up on 'green' foods, they **felt less of a pull towards the calorie-dense choices** they used to go for"

Attributed to users rather than asserted by the brand, and hedged (`a lot of
Noomers say`). But the implication — that wanting orange foods less is progress —
sits in tension with "no food is bad or off-limits". **Mitigation:** attribution
and hedging are both present.

**(4) `Orange` is a soft red.** The scale's terminus still carries the warmest,
most cautionary colour available short of red, and the product recommends
quantities per tier ("We'll also recommend how many orange, yellow, and green
foods you should eat daily"). A recommended daily maximum of a food category is,
operationally, a limit — on a page that says the product will never tell you what
you can and can't eat. **Mitigation:** the recommendation is framed as guidance
toward a range, and the range is a range.

**(5) The `Easy Way` / `hard journey` contradiction.** `/lose-weight/` opens with
"We know the weight loss journey can be hard" and promises to make it "a little
easier"; the homepage module headline is `The Easy Way to lose weight and get
healthy.` Under-promising and over-promising on the same estate. For a user who
finds it hard, the second headline is the one that produces self-blame.

**(6) Outcome testimonials are quantified and body-focused.** "I'm down 11 pounds
in two months", "My body feels lighter & energized", "at ease in my body again",
"free from diet obsession". **Mitigation, and it is genuine:** several selected
testimonials are explicitly about *reducing* preoccupation —
`free from diet obsession`, `Cravings and food noise are gone`,
`The lessons helped change my relationship with food` — rather than about weight
figures. The testimonial mix is more balanced than the category norm.

**(7) Weigh-in language is not publicly observable.** The support IA files weight
under `Biometrics` — a clinical, affect-neutral container label, which is a
reasonable choice. But no in-product weigh-in prompt, plateau message, gain
message or missed-goal copy could be retrieved. **This is the highest-value
missing artefact for this brief**, and its absence is stated rather than
speculated on. See Caveats.

**(8) The exclusion has no exit.** `have an eating disorder` is a stated
disqualifier with no adjacent support resource, helpline, or "here's where to go
instead" route (see T10, crisis signposting). A user who reads Q9 and recognises
themselves is told only that they cannot use the product.

**Summary judgement, bounded by evidence:** Noom's *stated* voice is explicitly
anti-restriction and autonomy-supporting, and several of its strings
(`Progress Over Perfection`, `You're The Boss`, `spaghetti is never a slip-up`,
`5, 10, or 15 minutes (never more)`) are strong examples of shame-aware copy. The
tensions above are real and evidenced, but each — except (5) and (8) — carries a
mitigation in the same passage. The two unmitigated findings are the
`Easy Way` contradiction and the unsupported eating-disorder exclusion.

### Other voice observations

**Person and register.** Second person for the user; first-person plural for the
company ("We'll give you a calorie range", "We structured Noom Weight so…",
"we designed Noom Weight to be different from the ground up"). The blog voice
uses **very short paragraphs, many single-sentence** — a deliberate
low-reading-load construction that matches the "bite-sized lessons" promise.

**The rhetorical question is the signature device**, especially where a claim is
weak: "How long do you think you could really stick with a weight loss approach if
you constantly feel hungry and deprived? / Not very long." · "Not bad, right?" ·
"How does it work?"

**Tone under emotional load — the gradient is inconsistent.** Clinical and
billing copy flattens correctly ("Once a prescription is written, refunds are no
longer possible." · "Renewal charges aren't refundable."). Terms summaries are
admirably plain. But marketing register bleeds into the product boundary:
`The Easy Way`, `Meds to lose the weight`, all-caps CTAs, and a promotional
GLP-1 module inserted **mid-article, twice**, inside the behaviour-change
explainer — interrupting the anti-restriction argument with a medication advert.

**Numbers:** `37%` more weight lost (heavily footnoted), `98%` habit change
(unsourced), `14,203` members analysed, `4` numbered homepage footnotes. Rigour
is high where the claim is regulated and low where it is not.

### Accessibility `[observed]`

- A published `Accessibility` page, footer-linked on every page.
- Contact routes are complete: `support@noom.com` plus a **postal address with a named recipient line** — "Noom, Inc. Attention: ADA Feedback, One Palmer Square, Suite 441, Princeton, NJ 08542". A dedicated ADA mailing line is above the baseline.
- Third-party content is scoped honestly: "While we do not control third-party content, we encourage our partners to provide accessible and user-friendly experiences."

**Substantive gaps, recorded:**

- **No conformance target is named.** No WCAG version, no Level AA claim, no ADA standard cited, no audit, no remediation commitment, no VPAT. The statement is: "Noom is committed to making our content accessible and user friendly to everyone" plus a feedback channel. This is the weakest accessibility statement in this batch alongside Teladoc's — and weaker than Teladoc's, which at least publishes a TTY number.
- **`Skip to content` link: not found** in the retrieved markup of any page inspected. `[absent]`
- **Colour-dependent instruction in support content**: "Click the **orange chat bubble** in the bottom-right corner" and "Tap the **chat button** in the bottom-right corner". Identifying a control by colour alone fails WCAG 1.4.1 (Use of Colour); the second variant, which drops the colour, is the better string and exists on the same estate.
- **The product's core mechanic is colour-coded** — green/yellow/orange — with no evidence on public surfaces of a non-colour redundant encoding (label, icon, position, or number). For users with deuteranopia or protanopia, green and orange are among the harder pairs to distinguish. Whether the app supplies a text label alongside the colour **could not be verified** from public surfaces; the marketing and blog copy always names the colour in words, which is encouraging but is not evidence about the UI. Flagged as a question for an authenticated pass, not asserted as a defect.
- **Alt text is machine-generated and poor.** Homepage examples: `Clothing, Hardhat, Helmet` (on the hero image of a person), `Head, Person, Face`, `Cup, Beverage, Coffee`, `Food, Fruit, Plant`, `Adult, Female, Person`. These are object-detection tag dumps, not descriptions. Several images carry filename alt (`05-phone-coach-chat-grouped-4`, `noom-weight-logo`) and many carry empty alt on meaningful content.
- **Counter-example:** a handful of alt strings are properly descriptive — "Woman using phone — enterprise solutions for employers and health plans", "Noom GLP-1 Rx Program box with phone and medication vials", "Woman smiling with glasses". So the estate has both practices side by side.
- **`test123` is shipped in production body copy** on the homepage, at the end of the coaching card: "…all right there in the app. test123". A QA string live on the primary marketing page.

---

## Transferable patterns

1. **Put a plain-language `Summary` above every Terms section.** Noom's §1 and §6 summaries are two-to-four sentences, second person, leading with the least favourable fact ("it is not medical care"; "Paid plans renew on their own unless you cancel"). They do not replace the legal text and so carry little risk. This is the most directly reusable artefact in the file.
2. **Cap the daily ask, and let the user choose the cap.** `5, 10, or 15 minutes per day (never more)` converts an open-ended habit into a bounded, user-set commitment. `(never more)` is the load-bearing parenthetical.
3. **Pre-forgive the specific failure, not failure in general.** "With Noom, spaghetti is never a slip-up" names the exact moment of self-blame. Generic reassurance ("don't worry if you slip") does not land the same way.
4. **Disclaim causation in the marketing footnote.** "Higher app engagement was associated with greater weight loss at 16 weeks; **this association does not imply causation**", with sample size, period and proxy stated. The model for any outcome claim in a regulated category.
5. **Make renewal part of the product name.** Every Noom Weight plan is listed as an `auto-renewing plan` in the price list itself, not in a footnote.
6. **Give the deadline to the minute and timezone.** "prior to 11:59 p.m. Eastern time on the day before your next recurring billing date". Vague cancellation deadlines generate disputes; precise ones do not.
7. **Name the only FDA-approved alternatives to your own product.** Naming Novo Nordisk and Lilly by company and by trade name, in a footnote on your own compounded offering, is a specificity standard worth importing into any comparative or substitute-product disclosure.
8. **Negative pattern: an exclusion without an exit.** Telling a user with an eating disorder that they cannot use the service, on a marketing FAQ, with no adjacent resource and no crisis signposting anywhere on the estate, is the clearest content-safety gap found in this batch.

## Caveats & gaps

- **No survey, quiz, calculator or intake was started.** `/ps/main-survey`, `/ps/program-branching`, `Personality Quiz`, `Calorie Calculator`, `Macro Calculator` and `GLP-1 Insurance Checker` were all left untouched, and **no weight, body-measurement, food, health or personal data was entered anywhere**. Consequently the intake questionnaire's actual questions — including how it asks about current weight, goal weight, body measurements, eating history and any eating-disorder screening — are **entirely unrecorded**. Noom publishes no field taxonomy for its survey on any reachable page, so unlike Talkspace this could not even be documented second-hand.
- **In-product behaviour-change copy is largely unrecorded.** Daily Lesson text, quiz wording, coach message templates, `SOS plans` content, `mini habit` prompts, streak and milestone copy, and — most importantly for this brief — **all weigh-in, plateau, weight-gain and missed-goal language** are behind auth. T6 and T14 are incomplete in exactly the place the brief asks about. Four notification archetypes are known only from image alt text.
- **Crisis signposting recorded `[absent]` on nine specific pages** (listed in T10), not across the whole product. The `GLP-1 Access & Transparency` and `HRT Safety` pages were not opened and may contain safety routing. This is an observation about public surfaces harvested.
- **Three privacy documents not opened** — `Privacy Policy`, `HIPAA Notice`, `Consumer Health Data Privacy Notice` — so Noom's position on advertising or third-party use of weight, food-log and health data is **unrecorded**. This is a material gap given the batch brief.
- **Terms read selectively.** §1 (eligibility, scope, no-physician-relationship) and §6 (fees, auto-renewal, cancellation, refunds, California rescission) were read in full. Sections on arbitration, IP, liability, user content and the community were not.
- **Regulatory history is hedged.** The 2022 class-action settlement concerning auto-renewal and cancellation is recorded from public reporting. **No FTC order against Noom was verified in this harvest**, and none is referenced on Noom's own site. The posture row states this explicitly; do not upgrade it without independent verification.
- **Two unresolved price contradictions**: `$349/month` (homepage footnote 1) vs `$299/month` (blog footnote 1) for the same programme. Both recorded; neither treated as authoritative.
- **The colour-accessibility question is open**, not answered. Whether the app pairs green/yellow/orange with a text or numeric label could not be determined from public surfaces and is flagged for an authenticated pass rather than asserted.
- **Content-ops defects recorded as found**: `Internal (Hidden)` exposed in public navigation; `test123` in live homepage copy; broken left-rail navigation on the `noom-weight` support category; duplicate canonical paths for the refund article; `Personality Quiz` appearing in the nav on some pages only; `licensed medical profession` typo in the Terms; `More Low-Dose Way To Start` as a shipped headline.
- **Only `en-US` harvested.** `KO`, `ES`, `DE`, `FR` surfaces exist; the German and Spanish support hubs have separate URLs and were not compared.
- **Organizations/`Noom Health` tier unharvested** beyond nav labels.

## Sources

1. https://www.noom.com/
2. https://www.noom.com/lose-weight/
3. https://www.noom.com/blog/weight-management/what-is-the-noom-diet/
4. https://www.noom.com/support/
5. https://www.noom.com/support/faqs/subscription-and-billing/2025/10/how-to-cancel-your-noom-subscription-or-trial/
6. https://www.noom.com/support/faqs/programs/2025/10/noom-refund-policy/
7. https://www.noom.com/terms-and-conditions-of-use/
8. https://www.noom.com/accessibility/
9. https://www.noom.com/support/faqs/programs/noom-weight/
