# 102. Calm

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Sleep and relaxation / consumer meditation (plus a separate invitation-only clinical-adjacent app, Calm Health) |
| Primary URL | https://www.calm.com/ |
| Corpus rank | 102 |
| Benchmark strength (source list) | Emotional tone and habit guidance |
| Locale / market observed | en-US (help centre localised into 9 languages; marketing site English only) |
| Platform observed | Web (desktop), Zendesk help centre, legal/privacy pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Two-app split, disclaimed asymmetrically.** The consumer Calm app carries **no medical-device or treatment disclaimer on any public marketing page inspected** — the only boundary statements are soft referral sentences inside FAQ answers ("consult with a healthcare professional"). **Calm Health**, the invitation-only sponsored app, is where the explicit boundary lives: "not intended as a substitute for care by a physician, therapist, or other mental health care provider", and it is stated as "built to comply with **HITRUST and HIPAA** privacy and security standards". A `Consumer Health Data Privacy Policy` addresses **Washington My Health My Data Act and Nevada's Consumer Health Data Privacy Act** — but is scoped only to **Calm Sleep**, a third app. `CCPA Notice` covers California. GDPR appears only as a help-article title (`Questions About GDPR-Related Privacy Practices`). Accessibility statement names **WCAG 2.1 AA and EN 301 549**. |
| Harvest date | 2026-09-21 |
| Pages inspected | 19 |
| Harvest completeness | Partial — marketing FAQ bodies were retrievable; `calm.com/stress-and-anxiety` returned an empty body twice (recorded as blocked); the main Privacy Policy, Terms, and `health.calm.com` B2B surfaces were not fetched; **no crisis-signposting page was found on any public consumer surface** after directed search (see T10) |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.calm.com/ | Hero, three-benefit block, review carousel, **14-question categorised FAQ** |
| Sleep | https://www.calm.com/sleep | Six-tab feature set, six-question sleep-science FAQ |
| Mindfulness | https://www.calm.com/mindfulness | Five-tab feature set, five-question meditation FAQ |
| Stress & Anxiety | https://www.calm.com/stress-and-anxiety | **Empty body returned — recorded as blocked** |
| Accessibility Statement | https://www.calm.com/accessibility-statement | WCAG 2.1 AA + EN 301 549; dated 2023 |
| Consumer Health Data Privacy Policy | https://www.calm.com/calm-consumer-health-data-privacy-policy | Scoped to Calm Sleep only; single data category |
| Help centre home | https://support.calm.com/hc/en-us | 8 categories + 9 promoted articles |
| Help: Learn About Calm | https://support.calm.com/hc/en-us/categories/360000652493-Learn-About-Calm | |
| Help: Using the Calm App | https://support.calm.com/hc/en-us/categories/360000654214-Using-the-Calm-App | Four sections incl. Technical Support |
| Help: Subscription and Account Management | https://support.calm.com/hc/en-us/categories/4406076612891-Subscription-and-Account-Management | |
| Help: Calm Health | https://support.calm.com/hc/en-us/categories/26888021635611-Calm-Health | |
| Help: Privacy ↗ | https://support.calm.com/hc/en-us/categories/34921397900315-Privacy | Arrow glyph is part of the label |
| Help: How to Cancel Your Subscription or Free Trial | https://support.calm.com/hc/en-us/articles/115002473607-… | Strongest cancellation artefact in this batch |
| Help: How Calm Subscriptions Are Billed & Renewed | https://support.calm.com/hc/en-us/articles/115002587948-… | ⚠️ emoji used as a heading device |
| Help: Fix Broken Calm Streak | https://support.calm.com/hc/en-us/articles/360008704893-… | **Streak is user-editable** |
| Help: How to Use Check-Ins | https://support.calm.com/hc/en-us/articles/9699990936731-… | Four check-in types + a real UX dead-end |
| Help: Mindfulness & Bedtime Reminders | https://support.calm.com/hc/en-us/articles/360008620774-… | Four notification types |
| Help: Calm Health FAQs | https://support.calm.com/hc/en-us/articles/27054399791643-… | PHQ-9 / GAD-7 named; the real clinical boundary |
| Help: Calm — Who We Are | https://support.calm.com/hc/en-us/articles/115002474527-… | Mission statement, company facts |
| Help: Is Calm Backed by Science? | https://support.calm.com/hc/en-us/articles/360022455213-… | Evidence claim with no evidence inline |

---

## T1 Navigation & IA labels

**Global nav — four items, all symptom-or-practice named** `[observed]`

`Sleep` · `Stress & Anxiety` · `Mindfulness` · `Calm Health` ·
then `Log In` · `Try Calm for Free`

This is a **single-axis nav, and the axis is the user's problem.** There is no
"Features", no "Products", no "Pricing". Compare Headspace's dual axis (modality
*and* symptom): Calm ships only the symptom axis, and the consequence is a nav a
first-time visitor can read without knowing anything about meditation. The cost
is that `Calm Health` — a completely different, invitation-only app — sits in the
same row as three content categories, which is a genuine mismatch of object type.

`Skip to main content` is present and first in the DOM on every marketing page.

**Footer groupings** `[observed]`: `Company` · `Offers` · `Calm for Organizations`
· `Help`. Two details worth recording:

- `Calm for Organizations` segments by headcount as its only two links:
  `Organizations under 300` and `Organizations 300+`. Segmenting a footer nav by
  a numeric threshold, rather than by industry or role, is unusually blunt and
  unusually useful — the buyer self-selects on the one fact they definitely know.
- `Help` carries nine links including `Virtual Patent Marking`, `Your Privacy
  Choices`, `Consumer Health Data`, and `Accessibility Statement`. The
  accessibility link points to `/en/accessibility-statement`, which **returned an
  empty body on fetch**, while `/accessibility-statement` (no locale segment)
  served the document. Recorded as a suspected broken footer link on every page
  of the site.

**Help centre top level — eight categories, each with a scope sentence** `[observed]`

| Category | Scope line (verbatim, first clause) |
|---|---|
| `Learn About Calm` | "Learn about Calm and our mission to support everyone on every step of their mental health journey." |
| `Using the Calm App` | "New to Calm or need help with a feature?" |
| `Subscription and Account Management` | "Find answers to common subscription, billing, and account questions…" |
| `Calm Provided by an Organization` | "Support for employers, admins, and employees who access the Calm app through an organization…" |
| `Calm Health` | "Our new, invitation-only app provided by your health plan, employer, or organization." |
| `Calm Sleep` | "Our standalone, dedicated sleep app for iOS users." |
| `Calm Shop` | "Find help with printed journal orders, shipping, tracking, and returns…" |
| `Privacy ↗` | "Find answers about Calm's privacy policy and data practices." |

**The category set is an app inventory, not a task list.** Four of eight name a
distinct product (`Calm`, `Calm Health`, `Calm Sleep`, `Calm Shop`), and the help
centre opens with a promoted article literally titled `Available Calm Apps`. The
company has fragmented into four consumer surfaces and the help IA now has to
disambiguate them before it can answer anything — the `Calm Health` category page
leads with "Calm Health is an invitation-only app, a standalone experience from
the regular Calm app" and links to the disambiguation article.

`Privacy ↗` carries a **typographic arrow inside the label text**, signalling
"leaves this section" — a rare case of an IA label encoding link behaviour rather
than content.

**Promoted articles** (help centre home, above the fold) `[observed]`:
`Available Calm Apps` · `A Warning About Phishing Scams` ·
`How to Log In and Log Out of Your Calm Account` · `Reset Calm Password…` ·
**`How to Cancel Your Subscription or Free Trial`** ·
`Missing Subscription from a Facebook or Instagram Ad?` ·
`Paid For a Calm Subscription But Premium Content is Still Locked` ·
`Promotional Offers through Calm Partners` · `How to Set Up and Use Multi-Factor
Authentication (MFA) for the Calm Partner Portal`

Cancellation is promoted **on the help centre front page**, fifth of nine. That
is a deliberate discoverability choice and the right one. Two of the nine
promoted articles are about *commercial confusion* — a phishing warning and
`Missing Subscription from a Facebook or Instagram Ad?`, which exists because
users buy via social ad funnels and then cannot find what they bought. Promoting
the article about your own acquisition channel's failure mode is honest
content-ops.

## T2 Value proposition & headline patterns

**Hero — parallel imperative, two clauses** `[observed]`

> `Calm your mind. Change your life.`
> "The #1 app for sleep, meditation and relaxation"
> CTA: `Try Calm for Free` · secondary: `Already have an account?`

Two three-word imperative sentences, escalating in scope from the head to the
whole life. The brand name is also the verb. Compare Headspace's
`Anxious days happen. Headspace helps.` — same two-short-sentence shape, opposite
direction: Headspace normalises then offers, Calm commands then promises.

**Three-benefit block — every label is a verb + comparative, and every one ends
in a full stop** `[observed]`

Section header: `We're here to help you feel better.`

| Label | Supporting line |
|---|---|
| `Stress less.` | "Get in-the-moment relief for stress and anxiety so you can get back to living." |
| `Sleep more.` | "Fall asleep (and stay asleep) naturally and peacefully." |
| `Live mindfully.` | "Navigate life's ups and downs with resilience, confidence and guided support." |

Each carries a `Learn More`. Note `Fall asleep **(and stay asleep)**` — the
parenthetical pre-empts the objection of the user whose problem is waking at 3am,
inside the benefit line rather than in a separate feature. Note also
`so you can get back to living`, which frames the product as a means to exit the
product.

**Page heroes are long, functional, and SEO-shaped** `[observed]`

- Sleep: `Sleep Stories, sleep meditations, music and soundscapes for your dreamiest sleep yet`
- Mindfulness: `Mindfulness, meditation and guided programs to build healthy habits that will last a lifetime`

These are keyword lists with a promise bolted on, and they sit oddly against the
crisp homepage hero. The **subheads** are where the voice returns:
`You're in the right place.` (mindfulness) and
`Just press play and drift away.` (sleep, used twice — as a section header and in
the closing block).

**Tab-panel headings are the strongest copy on the site** `[observed]`

Sleep: `Bedtime stories for grownups` · `A bit of guidance to help you drift off`
· `Soothing melodies designed for sleep` · `A sonic pathway to dreamland` ·
`A toolkit to get your sleep on track` · `Bedtime can be a blast`

Mindfulness: `We make it easy to take the first step` ·
`Make mindfulness a daily habit` · `Become the person you want to be` ·
`Learn mindfulness 2 minutes at a time` ·
`Step-by-step guidance to support your growth`

Two patterns. The sleep headings are **sensory and metaphorical**
(`dreamland`, `sonic pathway`); the mindfulness headings are **capability and
effort-reducing** (`easy`, `first step`, `2 minutes at a time`). The register
shifts with the user's state: a person trying to sleep gets imagery, a person
trying to start a practice gets reassurance about how little is required.

`Meditation can be daunting, so we've demystified it.` (mindfulness, beginner
panel) is the single clearest statement of Calm's onboarding thesis: the barrier
named, then dissolved, in one sentence.

**Closing CTAs** `[observed]`: `Get the relaxation you deserve.` ·
`Just press play and drift away.` · `Unlock more free content`. The first is the
only entitlement-framed line on the site ("deserve"); everything else is
capability-framed.

**Social proof** `[observed]`: `Over 2 million 5-star reviews.` and
`Join the millions of sound sleepers worldwide.` Testimonials are attributed
first-name + city (`Brandy from Houston`, `John from Chicago`). Note
`Mathieu from New Orleans` on the homepage and `Mathieu from Bend` on the sleep
page — the same first name attached to two different cities, and `Jasmine from
Bend` / `Sam from Louisville` / `Aaron from Louisville` show similar
recombination. Recorded as a consistency finding: the attribution tokens appear
to be shuffled per page.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try Calm for Free` | Nav, every page | The canonical label |
| `Try Calm for Free` (hero button) | Homepage hero | Same string — consistent, unlike Headspace |
| `Sleep better for free` | Sleep page hero | Page-topic + "for free" |
| `Live mindfully for free` | Mindfulness page hero | Same construction |
| `Unlock more free content` | Sleep and mindfulness closing blocks | `Unlock` + `free` in one label |
| `Already have an account?` | Under the hero CTA | Log-in route phrased as a question |
| `Learn More` | Three-benefit block ×3 | Bare `Learn More`, three times on one screen |
| `Free Sample` | Above each audio player, every tab panel | Labels the sample, not the action |
| `Log In` | Nav | |
| `Buy a Gift` / `Redeem a Gift` | Footer | Paired verbs |
| `Your Privacy Choices` | Footer | |
| `Submit a request` | Help centre, article foot | |
| `Was this article helpful?` → `Yes` / `No` | Every article, with raw counts | |
| `Cancel Subscription` | Documented in-app control | `Manage Subscription` → `Cancel Subscription` |
| `Manage Subscription` | Documented in-app control | Also the label in Apple/Google hand-off |
| `Add Session` / `+` | Documented streak-repair control | See T6 |
| `Never Show Again` | Documented dismissal control on the pre-meditation mood prompt | See T7 — this one is a trap |
| `Skip to main content` | First in DOM, all marketing pages | Present, unlike Headspace |

**The trial CTA is consistent** (`Try Calm for Free` everywhere in nav and hero),
which is a direct contrast with Headspace's five variants for the same action.
The page-level variants (`Sleep better for free`, `Live mindfully for free`)
follow one visible rule: *page verb + "for free"*.

`Free Sample` is a small, good decision. It labels the **artefact** ("this is a
sample, and it is free") rather than the action ("Play", "Listen"), so the user
knows what they are about to get before deciding to get it — relevant on a page
where the surrounding content is paywalled.

Three bare `Learn More` links sit in a single block on the homepage, each going
somewhere different. Recorded as a findability and screen-reader defect: out of
context, the link list reads "Learn More, Learn More, Learn More".

## T4 Onboarding & getting-started

**Documented first-run path** `[documented]`, from the homepage FAQ
`Where should I get started once I download the app?`. The published sequence is:

1. `7 Days of Calm` — described as the introductory program covering the basics
   of meditation
2. `21 Days of Calm`
3. then the open library, organised by theme (anxiety, sleep, focus, gratitude)

with a **parallel acute-need track** named for the state rather than the
duration: `Panic SOS`, `Body Scan`, and the breathing exercise, offered "for
moments of acute stress or anxiety".

This dual structure — a **course ladder for the committed user and a named
in-the-moment track for the distressed one** — is the reusable shape. `Panic SOS`
is the most direct piece of naming on the site: it names the emergency in the
product label rather than euphemising it, which means a person mid-panic can find
it by its actual name.

The answer also branches by intent before recommending anything: "If you have
come to Calm to learn relaxation techniques…" / "If you have come to Calm to
improve your sleep…". The FAQ answer is doing the job of an onboarding goal
picker, in prose.

**Beginner-anxiety framing** `[observed]`, mindfulness page:
`We make it easy to take the first step` · "Meditation can be daunting, so we've
demystified it." · `Mindfulness for Beginners` described as
"A simple 30-day program for everyone" · `Learn mindfulness 2 minutes at a time`
· "These guided sessions are as short as 1 to 2 minutes".

The FAQ `How do I practice mindfulness?` opens with
**"The fact that you're asking this question already shows a curiosity for deeper
awareness!"** — the reader is credited for the act of asking, before any
instruction. It then says "All you really need is consistency and patience" and
explicitly de-couples the practice from the equipment: mindfulness "is not
limited to the time spent doing a formal meditation practice on a cushion or mat".
Telling a user they do not need the ritual object is a small piece of
barrier-removal worth noting.

**The in-app onboarding question set is behind auth.** `[absent]` Calm Health's
onboarding, however, is documented (see T5).

## T5 Form & field labels

`[documented]` — the substantive form surface is Calm Health's intake and the
consumer app's Check-Ins.

**Calm Health onboarding — a three-step numbered sequence** `[documented]`:

1. "Take a quick mental health screening based on how you are feeling."
2. "Based on your screening results and self-reported input, follow a personalized
   Plan to support your condition and mental health needs."
3. "See how your mental health changes over time."

The instrument is named: `mental health screening`, "a short survey that
personalizes your Calm Health Plan", "asks about your thoughts and feelings over
the past two weeks", and explicitly "based on two clinically validated,
industry-standard tools: the **PHQ-9** and **GAD-7**".

**Naming the instrument is the finding.** Most wellness products present a
proprietary "quiz" and never disclose what it is. Calm Health names two
recognised clinical screening instruments, states the recall window (two weeks —
which is the PHQ-9/GAD-7 window), and gives a re-take cadence: "We recommend
retaking the screening every four weeks to track your progress over time." The
word used throughout is **`screening`**, never "test", "assessment", or
"diagnosis".

**Check-Ins — four named types with their prompt style** `[documented]`:

| Type | What the user enters |
|---|---|
| `Mood` | choose from "a dozen different moods", journal what is affecting them |
| `Sleep` | sleep quality, exact hours slept, and "the various factors that impacted your rest that night" |
| `Gratitude` | a daily prompt + "up to three reasons" |
| `Mindfulness (Daily Calm Reflection)` | respond to that day's Daily Calm prompt |

Two gratitude prompts are quoted verbatim in the documentation:
`What are you grateful for today?` and `What inspired you today?`

The `Sleep` check-in is a **self-report instrument, not a sensor readout** — the
user logs quality and hours and attributes causes. That is a materially different
content problem from Oura's or Fitbit's (103, 104): Calm never has to explain a
number it computed, because the user supplied it. The consequence is that Calm's
sleep copy carries no score-interpretation burden and no low-score wording
problem, which is why this file has less T10 metric material than the wearables.

**Reminder configuration** `[documented]`, four notification types:
`Daily Mindfulness` ("Set a time to meditate"), `Bedtime` ("Get a nudge when it's
time to wind down"), `Mood Check-In` ("Reminders to track how you're feeling"),
`Gratitude` ("Prompts to log what you are grateful for"). Per-reminder time and
day-of-week selection.

`Get a nudge` is the verb chosen for the bedtime alert — the softest available
word for a notification, and consistent with a product that must not itself
become a source of pressure at bedtime.

## T6 Status & state language

**`streak`** is the progress metric, and Calm's handling of it is the single most
distinctive thing in this file.

**The streak is user-editable.** `[documented]`

The help article `Fix Broken Calm Streak: How to Add & Edit History` documents a
first-class in-app control for retroactively repairing a broken streak:

> "**The Fix:** You can manually add a 'missed' session to yesterday (or any past
> date) to repair the gap and restore your streak."

The flow is `Profile` → `History` → `+` / `Add Session` → select date → set
duration → `Add`, and "Your streak count will automatically recalculate to
include this new session." Deletion of an erroneous session is supported on iOS
by swipe-to-trash; on Android it is not, with the note:
"Having an extra session does not hurt your streak, so deletion is usually
unnecessary."

Compare Headspace, which also lets a user recover a wrongly-reset streak but
only **by emailing support**. Calm has shipped the repair as a user-facing
control, with no gatekeeping and no limit stated. This effectively declares the
streak to be a **record of intent rather than a record of fact** — and it removes
almost all of the loss-aversion pressure a streak normally creates, because the
user knows it cannot really be lost.

**Break causes, as documented**: music and soundscapes do not count (only
`Meditations` and `Sleep Stories` do — "Listening to music tracks or soundscapes
(like 'Rain on Leaves') does **NOT** count toward your daily streak"); and
"**Time Zones:** Traveling can sometimes confuse the app's clock."

The second is written as **the app's failure, not the user's** — "confuse the
app's clock" puts the subject on the software. This is the same exoneration move
Headspace makes ("You experienced a technical hiccup"), phrased more directly.

**`Streak Safety Net`** `[documented]` — a bolded, named label used inside the
Check-Ins article, introducing the cross-link to the repair guide, preceded by an
italic **"*Don't worry!*"**. Giving the recovery mechanism a reassuring proper
name, and deploying it at the exact moment the article has just told the user to
delete and reinstall the app, is deliberate anxiety management in help copy.

**Other named states** `[documented]`: `Premium` access persists after
cancellation "until the end of your current billing or trial period" — the
post-cancellation state is named and its duration stated three separate times in
one article. `Sponsorship` is a state that can end (`Calm Health Access: What
Happens When Your Sponsorship Ends`). `Lifetime Membership` is stated to "never
expire and do not auto-renew".

## T7 Error, failure & recovery

`[documented]` — help titles and one embedded troubleshooting block.

**Error-article titles quote the user-visible error string** `[observed]`:

> `How to Fix Calm Website Checkout Errors ("There was an error charging your card")`

Putting the literal error text in the article title, in quotation marks, is a
strong findability decision — the user can paste what they saw. It is also the
only place in this harvest where an actual in-product error string is publicly
recoverable.

**Other failure titles** `[observed]`:
`How to Fix Calm App Crashes, Freezing, or Loading Issues (Troubleshooting)` ·
`Troubleshooting: What to do if the Calm website isn't working` ·
`How to Fix Calm Audio Stopping or Pausing During a Session` ·
`Troubleshooting: Not Receiving Mindfulness Reminders` ·
`Troubleshooting: The Daily Practice (Dailies) Won't Update` ·
`Calm Health Redemption Errors: What They Mean and How to Resolve Them` ·
`Recently Resolved Technical Issues` ·
`Paid For a Calm Subscription But Premium Content is Still Locked` ·
`Missing Subscription from a Facebook or Instagram Ad?`

Two grammars coexist: `How to Fix <thing>` and `Troubleshooting: <symptom>`.
The second is closer to what a user would type. `Recently Resolved Technical
Issues` is a small public incident log — worth noting for a consumer app that has
no status page.

**In-article troubleshooting is written as quoted user complaints** `[observed]`,
in the streak article:

> "I added the session, but my streak number is still wrong."
> "I meditated offline."

First person, in quotation marks, as sub-headings. This is the Wise
confession-title pattern applied *inside* an article rather than as article
titles, and it works for the same reason: the user recognises their own sentence.

**A genuine recovery dead-end, recorded as a negative finding** `[documented]`.
The Check-Ins article documents a pre-meditation Mood Check-In prompt with a
`Never Show Again` dismissal. The published way to undo it:

> "To bring back the automatic pre-meditation Check-In prompt, you will need to
> completely delete and reinstall the Calm app on your device."

An irreversible-in-settings dismissal whose only remedy is a full reinstall. The
help copy handles it as well as copy can — it immediately reassures
("*Don't worry!* Deleting the app from your phone will **not** delete your Calm
account or erase your data"), enumerates what survives (subscription details,
session history, past check-ins, favourites), and then pre-empts the *second*
order consequence with the `Streak Safety Net` cross-link. Three layers of
reassurance stacked on a product defect.

The content lesson is twofold: (1) `Never Show Again` must always have a
corresponding re-enable control in settings, and (2) when it does not, the help
article's job is to enumerate what is *safe* before it asks the user to do
something destructive-looking. Calm does the second well and the first not at all.

Helpfulness on that article: **64 of 230** (28%).

## T8 Empty states

`[absent]` — no in-product empty states observable pre-auth.

Two adjacent observations `[observed]`:

- The testimonial carousels on the homepage, sleep page and mindfulness page all
  render a `Loading spinner` with the accessible text
  `Two circles spinning around` after the last slide. That string is the alt/aria
  text for the loading indicator and is **descriptive of the animation rather
  than of its meaning** — a screen-reader user is told what the graphic looks
  like, not that content is loading. Correct practice would be "Loading" or a
  live-region status. Recorded as an accessibility content defect.
- `calm.com/stress-and-anxiety` returned an empty document body on two fetches
  while returning a 200-style response. Whether this is a client-rendered page
  or a genuinely blank route is not determinable from the fetch. Recorded in
  Caveats as blocked.

## T9 Notifications & system messages

`[documented]` — the notification model is documented as a user-facing article
(`How to Set Mindfulness & Bedtime Reminders on the Calm App`), which is good
practice.

Four reminder types and their descriptions are in T5. Two structural notes:

- The article leads with a **compatibility disclaimer as its first heading** —
  `Important: App Compatibility`, splitting `Calm` from `Calm Sleep / Calm Health`
  and telling the latter to "check your specific app settings menu, as options may
  differ." The four-app fragmentation (T1) surfaces here as a content tax on every
  how-to article.
- It states the **OS-level prerequisite before the in-app steps**:
  "Before setting reminders in the app, you must allow Calm to send notifications
  to your phone", with per-platform paths. Ordering the system permission ahead
  of the product setting prevents the commonest support loop.

Marketing/transactional email is separated in the IA:
`How to Unsubscribe from Calm Emails (Marketing vs. Transactional)` — the
distinction is in the article title, which sets the expectation before the user
opens it.

**`⚠️` emoji used as a heading glyph** `[observed]`, in the billing article:
`⚠️ Subscriptions Auto-Renew`. This is the only warning-styled heading found in
the harvest, and it is applied to the auto-renew fact — the highest-risk
commercial disclosure. Using a warning glyph on your own billing behaviour is a
defensible, if unsubtle, choice.

## T10 Disclosures, legal & compliance

**Priority section.** Calm's posture is materially weaker than Headspace's on the
health-claim boundary and materially stronger on cancellation.

### (a) The health-claim boundary — thin, and one broken artefact `[observed]`

**No medical-device, treatment, or diagnosis disclaimer appears on any public
consumer marketing page inspected.** There is no equivalent of Headspace's
"not intended to diagnose, treat, or prevent any mental health condition". The
boundary is carried entirely by **soft referral sentences at the end of FAQ
answers**:

- `What causes stress and anxiety?` closes: "it's recommended to seek support from
  a mental health professional who can provide personalized guidance."
- `Why do I have trouble sleeping?` and `Why can't I sleep?` close: "it's
  advisable to consult with a healthcare professional who can help assess your
  specific situation…"
- `Why do I sleep so much?` closes: "If excessive sleep significantly impacts your
  daily life, it may be beneficial to consult with a healthcare professional."

The construction is always **conditional and hedged** — "it's recommended",
"it's advisable", "it may be beneficial" — where Headspace uses "we encourage
you to" and "please talk with a licensed provider". Calm refers out; it does not
instruct.

**Meanwhile the benefit claims are stronger and less qualified than Headspace's.**
The homepage FAQ `What is meditation?` states that studies show a long-term
practice can shift the nervous system into parasympathetic mode "producing a wide
array of benefits" followed by a four-item list:

`Decreased anxiety and depression symptoms` · `Chronic pain management` ·
`Lower stress levels` · `Improved sleep quality`

Two problems, both observable:

1. **An orphaned asterisk.** On the homepage the word "benefits" carries a
   trailing `*`. No corresponding footnote text was found anywhere on the page.
   On the mindfulness page the identical claim and identical four-item list appear
   **without** the asterisk. So the qualifier exists in one instance, points
   nowhere, and is absent in the other. For a claim that includes
   "Decreased anxiety and depression symptoms" and "Chronic pain management",
   an asterisk with no footnote is the worst of both worlds — it signals that a
   qualification was thought necessary and then fails to supply it.
2. **No citations.** Headspace attaches a named journal and year to every outcome
   claim. Calm says "Studies show" and links nothing. The one place Calm addresses
   its evidence base — the help article `Is Calm Backed by Science? Research &
   Clinical Studies` — contains **no study, no finding, and no number**; it asserts
   "evidence-based leader", "leverages science", "rigorous approach to scientific
   research" and routes to `calm.com/science`. An article titled as a question
   about evidence that presents none is a recordable content failure.

The one place Calm **does** undercut its own claim is the soundscapes FAQ on
binaural beats, which closes:

> "However, while some research has shown potential benefits… the evidence is not
> yet conclusive."

That is the correct construction — claim, then bound the claim — and it appears
exactly once, attached to the least consequential topic on the page.

Calm Kids statistics are, by contrast, properly sourced and bounded: "In a Calm
Science study of 900+ parents (US) who use Calm Kids with their kids at least
once a week, **parents reported**…" then `74%` / `63%` / `95%` / `75%`. The
sample, the geography, the frequency threshold and the self-report nature are all
stated before the numbers. This is the house style working; it simply is not
applied to the meditation claims.

### (b) Where the real boundary lives — Calm Health `[documented]`

The explicit clinical boundary is in the Calm Health FAQ, in the answer to
`I'm working with a therapist currently. Can I still use Calm Health?`:

> "Calm Health is designed to **supplement** other forms of support and is **not
> intended as a substitute for care by a physician, therapist, or other mental
> health care provider.**"

Note it is triggered by a question about *coexistence with therapy*, not by a
question about the product's limits — so the disclaimer is reached only by users
who already have a clinician. A user with no clinician never encounters it.
That is the inverse of Headspace's placement decision (T10a in file 101), where
the boundary sits in the answer the *un*treated user clicks.

Calm Health also names its therapeutic basis — "cognitive behavioral therapy
(CBT), acceptance and commitment therapy (ACT), and dialectical behavior therapy
(DBT)" — and its compliance posture: "built to comply with **HITRUST and HIPAA**
privacy and security standards and can be integrated into care programs."

The consumer/clinical separation is stated plainly in
`How is Calm Health different from the Calm app?`: the Calm app is
"open to everyone and is focused on sleep, relaxation, and daily mindfulness";
Calm Health is "designed to support a variety of health and life experiences"
with "evidence-based programs". **`open to everyone` versus `invitation-only`**
is the cleanest two-word summary of the regulatory split.

### (c) Crisis signposting — `[absent]` `[observed]`

**No crisis or emergency resource page was found on any public Calm consumer
surface.** The help centre has eight categories and none is crisis-related; the
footer's nine `Help` links include none; a directed search across `calm.com`,
`support.calm.com` and `health.calm.com` returned blog articles mentioning
hotlines in passing but no dedicated directory.

The nearest artefacts are:

- `Panic SOS` — a named in-app programme for acute stress, recommended in the
  homepage FAQ alongside `Body Scan` and the breathing exercise
- the `Overcome Stress and Anxiety` collection with clinical psychologist
  Dr. Julie Smith, described as guiding listeners "through high stress moments in
  real time, including panic attacks, negative thought spirals"
- the conditional referral sentences in (a)

**This is the sharpest contrast in the batch.** Headspace publishes a dated,
~190-country crisis directory reachable from the footer of every page, a
top-level help category, and inline from its AI disclaimer. Calm, on the
unauthenticated surfaces inspected, publishes none. The finding is bounded: crisis
signposting may well exist inside the app, inside Calm Health, or on B2B surfaces
not fetched — it is the **public discoverability** that is absent. For a product
whose nav item reads `Stress & Anxiety` and whose FAQ discusses panic attacks,
PTSD, depression and bipolar disorder by name, a user in difficulty on the
marketing site has no route offered.

### (d) Cancellation and billing — the strongest artefact in this batch `[observed]`

`How to Cancel Your Subscription or Free Trial` is a model of the form. Its
opening sentence does three things before any instruction:

> "You can cancel your Calm Premium subscription or free trial at any time. Once
> you cancel, you'll continue to have full Premium access until the end of your
> current billing or trial period."

Permission → no-penalty → what you keep. The anxiety ("will I lose access
immediately?") is answered before it is felt.

Structure, in order:

1. **`Step 1: Identify where you purchased your Calm subscription`** — the
   article's first act is to route, not to instruct. Cancellation is genuinely
   three different procedures and the article says so.
2. A **three-column table**: `Where You Purchased` / `Who Manages Billing` /
   `What to Do`. Naming *who manages billing* is the disclosure that actually
   resolves the user's confusion, and it names Apple and Google as the
   controllers where they are.
3. Three numbered procedures, one per channel, with the Apple caveat stated
   flatly: "Apple manages all billing for in-app purchases. Calm cannot access or
   cancel subscriptions made through Apple." — a capability limit, stated, with a
   link to Apple's own portal.
4. **`After You Cancel`** — four bullets on the post-cancellation state, including
   "You can resubscribe anytime".
5. An **embedded FAQ inside the article**, six questions, each a real
   post-cancellation anxiety:
   `How do I know where I purchased my subscription?` ·
   **`Do I need to contact Calm Support to cancel?`** (answer: "No.") ·
   `I canceled but still see Calm Premium — why?` (answer: "That's normal.") ·
   `My trial ended and I was charged — can I get a refund?` ·
   `I don't see my Calm subscription listed in Apple or Google Play. What should I do?` ·
   `How do I cancel my Calm Premium Family Plan?`
6. Only then the refund caveat: "Canceling a subscription does **not**
   automatically generate a refund."

**`Do I need to contact Calm Support to cancel?` → `No.`** is the line to steal.
Explicitly telling users they do not have to speak to anyone to cancel is the
direct opposite of a retention dark pattern, and it is published as a question
the company answers against its own short-term interest. The refund window is
also stated concretely: "Refunds are available only for Calm.com and Google Play
purchases within 30 days."

The companion article `How Calm Subscriptions Are Billed & Renewed` leads with
`⚠️ Subscriptions Auto-Renew` and then discloses, per plan type, that annual and
Family plans are "**one upfront payment**… for the entire year", and — critically
— that on a 7-day trial "your payment method will be charged the upfront annual
fee at the very end of the trial period." Stating that the trial ends in a full
year's charge, in the billing article, is the disclosure most subscription
products bury.

`How do I cancel?` also appears **on the homepage**, in the `GENERAL` FAQ group,
with the four in-app steps given inline.

**Both articles carry very low helpfulness ratings**: cancellation
**5,319 of 26,422 (20%)**; billing **474 of 2,163 (22%)**. Twenty-six thousand
votes on the cancellation article is an extraordinary traffic signal. The copy is
well-built; the ratings suggest the underlying journey (three platforms, one of
which Calm cannot act on) is what users are marking down. Recorded because it is
a useful reminder that clear writing does not rescue a fragmented process.

### (e) Data and privacy `[observed]`

The `Consumer Health Data Privacy Policy` is notable mainly for its **narrow
scope**, which is itself the disclosure strategy:

- It applies to "our **Calm Sleep** website(s) and mobile application" — the
  iOS-only sleep app, not the flagship Calm app.
- It covers **Nevada's Consumer Health Data Privacy Act and Washington's My Health
  My Data Act** only. No Connecticut (Headspace covers it).
- It declares **exactly one** category of consumer health data:
  "Bodily functions, vital signs, symptoms, or measurements. With your permission,
  we may receive data from your mobile device's health app (like Apple HealthKit
  or Google Health Connect) or wearable, such as **hours of sleep, heart rate,
  wrist temperature, and blood oxygen**."
- Sources: exactly one — third-party health apps and connected devices the user
  chose to link.
- Disclosure recipients: exactly three categories — `Service providers`,
  `Business transfer`, `Other`.

Compare Headspace, which enumerates eleven data categories and nine recipient
categories. Calm's document is shorter because it is claiming to collect far less,
and it is legible in a single sitting as a result. Whether the narrow scope is
accurate for the main Calm app (which has mood, sleep, and gratitude Check-Ins —
plausibly "symptoms" and "measurements") is **not determinable** from this
document, because the document says it does not apply there. That scope boundary
is the most consequential unverified item in this file.

Rights, windows (45 days + 45), and per-state Attorney General complaint URLs
follow the same structure as Headspace's — this section of both policies is
clearly drafted from the same statutory template.

**One observed typo** in the third paragraph: "third-party websites or
**producats**." Recorded because it sits in a health-data policy.

Help-centre privacy articles `[observed]`:
`Your Privacy Choices: Opting Out of Targeted Advertising` ·
`Deleting or Accessing your Personal Information` ·
`Deleting Your Calm Health Account` ·
`Questions About GDPR-Related Privacy Practices` ·
`2023 Calm Terms of Service and Privacy Policy Updates`

Account **deletion** has a dedicated article per app. GDPR is present as a
question-shaped title but the answer body was not fetched.

## T11 Help-centre architecture

Zendesk, three levels: Category → Section → Article. Eight categories (T1).

**Article titles are SEO-optimised to an unusual degree** `[observed]` — the
dominant grammar is `<Task>: <keyword cluster>`:

| Shape | Example |
|---|---|
| `<Task>: <keywords>` | `Reset Calm Password: Apple, Google & Email Login Guide` |
| | `Cancel Calm on iPhone: Apple Subscription Guide` |
| | `Calm Family Plan: Price, Invites & How to Share Premium` |
| | `Calm Scenes Guide: Change Background, Volume & Playback Timer` |
| | `Fix Broken Calm Streak: How to Add & Edit History` |
| `How to <verb>…` | `How to Use Check-Ins (Mood, Sleep & Gratitude Tracker)` |
| `Troubleshooting: <symptom>` | `Troubleshooting: The Daily Practice (Dailies) Won't Update` |
| Quoted error string | `How to Fix Calm Website Checkout Errors ("There was an error charging your card")` |
| Parenthetical disambiguator | `How to Sync with Health Connect on Android (replaces Google Fit)` |

The colon-plus-keywords construction appears in roughly half the titles and is
transparently written for search engines — `Cancel Calm on iPhone: Apple
Subscription Guide` contains the brand, the platform, the action and the genre
in nine words. It works, and the cost is that the titles read as a list of
product-marketing fragments rather than as things a person would say. The
**parenthetical disambiguator** is the better half of the same instinct:
`(replaces Google Fit)`, `(Mood, Sleep & Gratitude Tracker)`, `(Marketing vs.
Transactional)`, `(30-Day Free Trial)` each answer a follow-up question in the
title itself.

**Articles are bylined and dated** — `Layna Smith`, `Frania N.`, `Megan Grennan`,
`Monica H.`, `Lauren Cerny`, each with an "Updated" date. Named human authorship
on support content is uncommon and it makes staleness visible: the harvest found
update dates ranging from May 2025 to July 2026 across the articles read.

**Routing furniture**: `Articles in this section` sidebar on every article,
`Related articles` block of five at the foot, `Have more questions? Submit a
request`, and `Was this article helpful? Yes / No` with a raw count. Nine languages
in the help centre footer against an English-only marketing site.

**Localised article titles differ in strategy** — the German cancellation article
is `So kündigst du dein Abonnement oder deine kostenlose Testversion` (informal
*du*), the French `Comment annuler votre abonnement ou votre essai gratuit`
(formal *votre*). Register varies by locale within the same article.

## T12 FAQs

**Three placements, and the homepage one is the important artefact.**

### Homepage — 14 questions in five labelled groups `[observed]`

Heading: `Frequently Asked Questions`. Group labels are set in caps:

| Group | Questions |
|---|---|
| `GENERAL` | What is Calm? · What's included in a Calm subscription? · Where should I get started once I download the app? · What devices support the Calm app? · **How do I cancel?** |
| `MEDITATION & MINDFULNESS` | What is meditation? · What is mindfulness? |
| `STRESS & ANXIETY` | What causes stress and anxiety? · How can I manage my stress and anxiety? |
| `SLEEP` | Why do I have trouble sleeping? · How can I sleep better naturally? · Are Sleep Stories® good for kids and adults? |
| `SOUNDSCAPES` | How do different sound frequencies affect your brain? · How do binaural beats help improve focus and reduce anxiety? |

**Nine of fourteen questions are not about the product.** `What is meditation?`,
`What causes stress and anxiety?`, `Why do I have trouble sleeping?`, `How do
binaural beats help…` are health-education questions that would be answered
identically by a product Calm does not sell. The FAQ is being run as a
**category-education surface**, with the product answers quarantined into a
`GENERAL` group at the top.

This has two consequences a content designer should weigh. It is excellent for
organic search and for a user who does not yet know they want a meditation app.
It also means the FAQ block on the company's most-visited page spends most of its
words on general wellbeing information, in a register that sounds clinical
("Traumatic experiences", "hormonal imbalances", "post-traumatic stress disorder
(PTSD)"), without the disclaimer scaffolding that such content would carry on a
health publisher's site.

**`How do I cancel?` is in `GENERAL`, fifth and last** — i.e. on the homepage,
above the fold of the FAQ, not buried. Four numbered in-app steps are given
inline. Given regulatory attention to cancellation discoverability, putting the
question on the homepage at all is the defensible move, and Calm does it.

**Answer construction is consistent and worth naming.** The symptom questions all
use the same four-part shape:

1. open by normalising and declining to alarm — "There can be various reasons…",
   "can have various causes and can differ greatly from person to person"
2. a numbered list of 5–7 plain-language contributing factors
3. an explicit non-universality line — "It's important to note that not everyone
   experiences stress and anxiety in the same way."
4. a conditional referral to a professional

`Why do I sleep so much?` adds a fifth beat that is the warmest line in the
harvest: **"It's essential to approach this occurrence with curiosity and
compassion, recognizing that each individual's sleep needs can differ."** —
instructing the reader in *how to feel about their own data* before explaining
it. That sentence is the closest thing in this batch of five to a transferable
template for writing about a worrying personal metric.

`Are Sleep Stories® good for kids and adults?` opens **"Absolutely!"** — the only
exclamation mark and the only emphatic affirmation in the FAQ set, and it is
attached to the one question where a confident yes is both true and low-risk.

### Sleep page — six questions `[observed]`

`How much sleep do I need?` · `How do I fall asleep faster?` · `What is REM
sleep?` · `Why can't I sleep?` · `Why do I sleep so much?` · `How can I sleep
better?`

Five of six are sleep science; one (`How can I sleep better?`) is the product
answer. `Why can't I sleep?` duplicates the homepage's `Why do I have trouble
sleeping?` with a near-identical answer — the same content under two question
phrasings, which is a deliberate search play rather than an oversight.

`How much sleep do I need?` gives the range ("generally 7 to 9 hours per night")
and then immediately individualises it ("individual requirements can vary person
to person, depending on factors such as age, lifestyle, and genetics") and
instructs the user to observe themselves ("Pay attention to your body's signals").
**Range → variance → self-observation** is a good three-beat for any
population-norm number.

### Mindfulness page — five questions `[observed]`

`What is mindfulness?` · `What is meditation?` · `How do I practice mindfulness?`
· `What does meditation do?` · `What is mindfulness meditation?`

All five are definitional. `What is mindfulness?` and `What is meditation?` are
**duplicated from the homepage with different answer text** — longer, more
lyrical versions here ("we create a space within ourselves to explore the depths
of who we are"). Two canonical answers to the same question on one site is a
maintenance liability and, given that both answers carry the same health-benefit
list with inconsistent asterisking (T10a), it has already produced a defect.

## T13 Terminology & glossary

| Term | Calm's usage | The alternative it rejected |
|---|---|---|
| `Sleep Stories®` | **Registered trademark, ® used consistently in FAQ prose** | "bedtime stories", "sleep audio" |
| `Daily Calm` | The flagship daily 10-minute meditation | "Today's session" |
| `Daily Jay` | The Jay Shetty daily series | |
| `Dailies` / `Daily Practice` | The umbrella for daily content — **both names used** | |
| `Breathe Bubble` (homepage, `What is Calm?`) vs `Breathing Bubble` (homepage, `How can I manage my stress and anxiety?`) | **Two names for one feature, on the same page** | — recorded as a defect |
| `Panic SOS` | Named acute-distress programme | "Emergency calm", "In the moment" |
| `Body Scan` | Named technique, retained from clinical mindfulness | |
| `Soundscapes` | Ambient audio category | "nature sounds", "ambience" |
| `Scenes` | The visual background layer | "themes", "wallpapers" |
| `Zen Mode` | Menus hidden, scene only | "focus mode", "full screen" |
| `Check-Ins` | The four self-report instruments | "journal", "tracker", "log" |
| `Sleep Check-In` | Self-reported sleep quality | "sleep score", "sleep tracking" |
| `streak` | Consecutive-day counter (lowercase, unbranded) | Headspace's `run streak` |
| `Streak Safety Net` | Named recovery mechanism | |
| `Calm Premium` | The paid tier | "Pro", "Plus" |
| `Lifetime Membership` | One-time-payment tier | |
| `Guest Passes` | Shareable 30-day trials | "referral codes" |
| `Calm Pathways` | A joinable programme construct | |
| `Mindful Tools` | In-app menu grouping Check-Ins and breathing | |
| `Discover` | The browse tab | "Explore", "Home" |
| `mental health screening` (Calm Health) | The PHQ-9/GAD-7 intake | "assessment", "quiz", "test" |
| `Plan` (Calm Health, capitalised) | The personalised programme | "treatment plan" — deliberately not |
| `Sponsorship` | Employer/health-plan-funded access | "benefit", "licence" |
| `instructor` | The voice — "Meet your instructor: Chibs Okereke" | "teacher", "guide", "coach" |

**Register notes.**

`Plan` is capitalised and used bare — never "treatment plan", never "care plan".
That single-word choice keeps a CBT/ACT/DBT-derived programme on the wellness
side of the line while still sounding purposive.

`screening` over `assessment` or `test` is precise: a screening indicates, a test
decides. The word choice matches what a PHQ-9 actually is.

**`instructor`** rather than teacher, guide, or coach is a small but consistent
choice — it frames the relationship as skills instruction rather than pastoral
care, which is the safer framing for an unregulated product. Each landing page
runs a `Meet your instructor:` block with a named person and a video.

**The `Breathe Bubble` / `Breathing Bubble` split is a real defect**: the same
feature is named two ways in two answers of the same homepage accordion. For a
feature that is described as the front-line tool for acute anxiety — "our
60-second Breathe Bubble grounds you in the moment" — an unstable name is a
findability problem at the worst moment.

Similarly `Dailies` / `Daily Practice` appear as alternates for one surface, with
a help article title carrying both: `Troubleshooting: The Daily Practice
(Dailies) Won't Update`. That title is at least self-glossing.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user. First-person **plural** used
warmly and often — "We're here to help you feel better.", "we've demystified it",
"We make it easy", "Calm has curated the most soothing sounds on Earth.",
"we'll show you patterns". Calm speaks as a *we* more than Headspace does, and
the *we* is usually doing something on the user's behalf.

Unusually, the marketing copy uses **first-person plural for the user as well**:
"we develop the ability to observe our thoughts", "This allows us to respond to
life's challenges with clarity and compassion", "By practicing mindfulness
meditation, we learn to observe our thoughts". The definitional FAQ answers slip
into an inclusive *we* that puts writer and reader in the same practice. It is
the register of a meditation teacher, not a product, and it is confined almost
entirely to the mindfulness and meditation definitions.

**Register.** Short imperatives in headlines (`Calm your mind.`, `Stress less.`,
`Just press play and drift away.`), long flowing sentences in the educational FAQ
bodies. The gradient is the reverse of Headspace's: Calm's **most lyrical writing
is in the explanatory copy**, and its plainest writing is in the help centre.

Alliteration and sound-patterning are used deliberately, appropriately for an
audio product: `drift off to dreamland`, `A sonic pathway to dreamland`,
`Just press play and drift away`, `sound sleepers`, `dreamiest sleep yet`.

**Punctuation as tone.** The three benefit labels each end in a full stop
(`Stress less.` `Sleep more.` `Live mindfully.`) — terminal punctuation on
two-word fragments slows the reading and lands each as a complete claim. One
exclamation mark in the entire FAQ set (`Absolutely!`) and one in the help centre
(`*Don't worry!*`). Both are earned.

**Copy that risks encouraging unhealthy behaviour — findings in both directions.**

*Mitigations observed, and Calm is the strongest of the five on this axis:*

1. **The streak is repairable by the user, retroactively, without limit.** Manual
   `Add Session` to any past date, with automatic recalculation. This is the
   most anti-pressure streak design in the batch. A metric the user can rewrite
   cannot function as a loss-aversion lever.
2. **`Streak Safety Net`** — the recovery is *named*, and the name is reassuring.
   It is surfaced proactively in an unrelated article, at the moment the user is
   about to do something that might break the streak.
3. **The break cause is attributed to the software** — "Traveling can sometimes
   confuse the app's clock."
4. **`Get a nudge when it's time to wind down`** — the softest available verb for
   a notification, on the notification most likely to arrive when the user is
   already stressed.
5. **Reminders are per-type and per-day configurable**, and the article teaches
   the user to restrict them ("Tap the days of the week you want the reminder
   (e.g., Mon-Fri only)") — the example given is a *reduction*, not a maximisation.
6. **"Curiosity and compassion"** as instructed posture toward one's own
   worrying data (`Why do I sleep so much?`), plus consistent normalising
   ("not everyone experiences stress and anxiety in the same way", "you're not
   alone", "individual requirements can vary").
7. **`so you can get back to living`** — the benefit is framed as exiting the app.
8. **No leaderboard, no social comparison, no public profile** observed anywhere.
   The only community artefact is an opt-in Facebook group.
9. `Zen Mode` — an explicit "hide all the UI" state, i.e. a documented way to use
   the product without seeing any of its metrics.

*Risks observed:*

1. **Streak exclusions steer away from the lowest-effort content.** Music and
   soundscapes do not count; only Meditations and Sleep Stories do. A user
   maintaining a streak on a bad night is nudged off the thing they might
   actually want. Same structural problem as Headspace's exclusion list, and
   largely defused by the repair mechanism.
2. **A `Never Show Again` that cannot be undone without reinstalling** (T7). Not
   pressure-inducing, but it is a control that punishes the user for exercising it.
3. **Unqualified symptom-reduction claims** — "Decreased anxiety and depression
   symptoms", "Chronic pain management" — with no citation and an orphaned
   asterisk (T10a). A reader in difficulty could reasonably infer therapeutic
   efficacy. This is the most serious tone-adjacent finding in the file.
4. **`Get the relaxation you deserve.`** is the one entitlement framing on the
   site, and "deserve" quietly implies a reader who has not been getting it.
   Minor, but it is the one line that positions the user as deficient.
5. **No crisis route on a site whose nav says `Stress & Anxiety`** (T10c). Not a
   tone failure but a duty-of-care gap, and it is the thing a content designer
   would flag first in review.

**Accessibility content** `[observed]`

- `Skip to main content` present and first in DOM on every marketing page —
  better than Headspace on this specific point.
- Public `Calm Digital Accessibility Statement`, linked from the footer `Help`
  column. **The footer link points to `/en/accessibility-statement`, which
  returned an empty body; the document is served at `/accessibility-statement`.**
  A broken accessibility-statement link in the site-wide footer is a notable
  defect, and it is the kind that persists because the page it points at is
  rarely visited.
- Conformance target: "a **goal** to align with applicable accessibility
  standards, including… **WCAG 2.1 AA** standard and the **EN 301 549**." Naming
  EN 301 549 alongside WCAG signals European public-procurement scope. But the
  framing is "a goal to align", which is weaker than a conformance claim and
  weaker than Headspace's "conforms… to the maximum extent possible".
- **Named third-party partner**: Level Access, with its platform described as
  evaluating "on an ongoing basis", supported by "a diverse team of accessibility
  professionals, **including users with disabilities**". Naming disabled testers
  in the engagement is worth crediting.
- **A free assistive-technology application is offered to Calm customers**
  through the Level Access partnership — "mouse and keyboard replacements, voice
  recognition, speech enablement, hands-free/touch-free navigation". Offering
  AT software as a product benefit is unusual and substantive.
- A dedicated **`Non-Accessible Content from Third-Party Sources`** section
  explicitly disclaims the accessibility of linked third parties (Stripe, PayPal,
  Apple are named) while stating "we encourage our vendors to strive to offer
  accessible platforms". Scoping the claim to your own surfaces and naming the
  exceptions is honest practice.
- Contact: `support@calm.com` — the **general support address**, not a dedicated
  accessibility inbox. Headspace uses `accessibility@headspace.com`. Routing
  accessibility barrier reports into the general queue is a small but real signal
  about how they will be triaged.
- **Staleness is the headline finding.** "This statement was prepared on
  2023-05-04." / "Last updated: 2023-07-10." Against a harvest date of
  2026-09-21, the statement is **over three years old**, still cites WCAG **2.1**
  (Headspace cites 2.2), and **no VPAT or conformance report is published**.
- **Gaps:** the loading-spinner accessible text is `Two circles spinning around`
  — describing the animation rather than announcing a loading state (T8). Three
  consecutive bare `Learn More` links in the homepage benefit block (T3) give a
  screen-reader link list with no distinguishing text. Decorative images on the
  marketing pages carry filename-derived or generic alt
  (`App image for Sleep Stories`, `App image for Music`) — which is at least
  human-written and category-specific, and is better than Headspace's raw CMS
  asset IDs, but still describes the asset rather than its content.

---

## Transferable patterns

1. **Make the streak user-repairable.** Calm ships `Add Session` for any past
   date with automatic recalculation, plus a named `Streak Safety Net`. A metric
   the user can rewrite cannot be weaponised into loss aversion, and the support
   cost drops to zero. Condition: only transferable where the metric is
   *motivational*, never where it is a record of fact (a transaction history, a
   compliance log, a health measurement). The distinction is exactly the one to
   make explicit in any design review that proposes it.

2. **Answer "do I have to talk to someone to cancel?" with "No."** Publish it as
   a question, in the cancellation article, answered against your own retention
   interest. Pair it with a `Where You Purchased / Who Manages Billing / What to
   Do` routing table, and lead the whole article with what the user *keeps* after
   cancelling. Directly transferable to any subscription or recurring-payment
   cancellation flow.

3. **Instruct the reader in how to regard their own data, before explaining it.**
   "It's essential to approach this occurrence with curiosity and compassion,
   recognizing that each individual's sleep needs can differ." Then the causes.
   Then the threshold for seeking help. This is the single most portable sentence
   shape in the batch for any product that shows a user a number about themselves
   — including credit scores, spending patterns, and risk ratings.

4. **Range → variance → self-observation** for any population-norm figure.
   "generally 7 to 9 hours" → "individual requirements can vary… depending on age,
   lifestyle, and genetics" → "Pay attention to your body's signals." Prevents the
   user from reading a population average as a personal target.

5. **Name the acute-need track for the acute need.** `Panic SOS`, not "In the
   moment" or "Quick calm". A user in the state will search for the state's name.
   Condition: only works if the product genuinely serves that state — naming it
   raises the expectation.

6. **Put the literal error string in the help-article title, in quotes.**
   `How to Fix Calm Website Checkout Errors ("There was an error charging your
   card")`. The user pastes what they saw and lands on the fix.

7. **Parenthetical disambiguators in titles.** `(replaces Google Fit)`,
   `(Marketing vs. Transactional)`, `(30-Day Free Trial)` — answer the
   immediately-following question inside the title, so the user does not have to
   open the article to find out whether it is the right one.

8. **Disclose who controls the billing, not just how to cancel.** Naming Apple
   and Google as the parties that "manage billing" — and stating plainly "Calm
   cannot access or cancel subscriptions made through Apple" — resolves the
   confusion that the step-by-step instructions alone do not.

## Caveats & gaps

- **`calm.com/stress-and-anxiety` is recorded as blocked.** Two fetches returned
  an empty document body. This is the page most likely to carry Calm's anxiety
  tone and any health-claim disclaimer, so the T10 and T14 findings for the
  stress/anxiety surface are drawn only from the homepage FAQ group and the nav
  label. **Re-fetch before relying on the "no consumer disclaimer" finding.**
- **The crisis-signposting `[absent]` finding is bounded to public
  unauthenticated consumer surfaces.** It may exist in-app, in Calm Health, or on
  `health.calm.com`, none of which were reachable in this pass. What is
  established is that it is not discoverable from the marketing footer, the help
  centre categories, or a directed search.
- **Main Privacy Policy, Terms of Service, `calm.com/science`, `calm.com/faq/web`
  and the whole `health.calm.com` B2B estate were not fetched.** GDPR posture,
  the substance of the science claims, and the B2B clinical positioning are all
  unverified.
- **The Consumer Health Data policy's scope is the key unresolved question.** It
  declares itself applicable to Calm Sleep only. Whether the main Calm app's mood,
  sleep and gratitude Check-Ins constitute consumer health data under the same
  statutes — and if so, which policy governs them — is not answerable from the
  documents read.
- **The orphaned asterisk on the homepage health-benefit claim** was searched for
  in the fetched page text and no footnote was found. It is possible the footnote
  is rendered client-side or is visually adjacent in a way the text extraction
  lost. Flagged as suspected, not confirmed — but the asterisk's *absence* from
  the identical claim on the mindfulness page is confirmed.
- **All in-product states, controls and copy are `[documented]`, not observed** —
  streak UI, `Add Session`, Check-In prompts, `Never Show Again`, `Zen Mode`,
  `Breathe Bubble`, notification strings, empty states, validation. The pre-auth
  surface exposes no product UI at all.
- **The testimonial attribution inconsistency** (same first name, different
  cities across pages) is observed but its cause is unknown; it may be intentional
  anonymisation rather than an error.
- **Calm Health's in-product screening copy is unobserved.** The PHQ-9/GAD-7
  question wording, how results are presented, and how a high score is worded to
  the user — the highest-stakes copy Calm writes — are entirely behind an
  invitation-only gate.
- **Non-English help-centre content unharvested** beyond article titles. Register
  already differs by locale (German informal *du*, French formal *votre*), which
  suggests locale-level voice decisions worth a separate pass.
- **Mobile app store listings and in-app copy** are outside the public web surface.

## Sources

1. https://www.calm.com/
2. https://www.calm.com/sleep
3. https://www.calm.com/mindfulness
4. https://www.calm.com/stress-and-anxiety (blocked — empty body returned)
5. https://www.calm.com/accessibility-statement
6. https://www.calm.com/calm-consumer-health-data-privacy-policy
7. https://support.calm.com/hc/en-us
8. https://support.calm.com/hc/en-us/categories/360000652493-Learn-About-Calm
9. https://support.calm.com/hc/en-us/categories/360000654214-Using-the-Calm-App
10. https://support.calm.com/hc/en-us/categories/4406076612891-Subscription-and-Account-Management
11. https://support.calm.com/hc/en-us/categories/26888021635611-Calm-Health
12. https://support.calm.com/hc/en-us/categories/34921397900315-Privacy
13. https://support.calm.com/hc/en-us/articles/115002473607-How-to-Cancel-Your-Subscription-or-Free-Trial
14. https://support.calm.com/hc/en-us/articles/115002587948-How-Calm-Subscriptions-Are-Billed-Renewed
15. https://support.calm.com/hc/en-us/articles/360008704893-Fix-Broken-Calm-Streak-How-to-Add-Edit-History
16. https://support.calm.com/hc/en-us/articles/9699990936731-How-to-Use-Check-Ins-Mood-Sleep-Gratitude-Tracker
17. https://support.calm.com/hc/en-us/articles/360008620774-How-to-Set-Mindfulness-Bedtime-Reminders-on-the-Calm-App
18. https://support.calm.com/hc/en-us/articles/27054399791643-Calm-Health-FAQs
19. https://support.calm.com/hc/en-us/articles/115002474527-Calm-Who-We-Are
20. https://support.calm.com/hc/en-us/articles/360022455213-Is-Calm-Backed-by-Science-Research-Clinical-Studies
