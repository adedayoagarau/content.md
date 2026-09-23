# 105. Strava

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Fitness social network (GPS activity tracking + public leaderboards + subscription) |
| Primary URL | https://www.strava.com/ |
| Corpus rank | 105 |
| Benchmark strength (source list) | Activity feedback and community cues |
| Locale / market observed | en-US (help centre localised into 21 languages) |
| Platform observed | Web (marketing, pricing, legal), Intercom-hosted help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **The most explicitly-regulated product in this batch, and the only one with no health-claim problem** — Strava records what the user did, it does not score their body, so there is no wellness/medical-device boundary to police and **none is present**. Instead the whole compliance surface is **privacy and platform governance**. GDPR is addressed in full: named legal bases (contract, consent, legitimate interests, legal obligation, vital interests), **Strava Ireland Limited** as EEA controller, the **Irish Data Protection Commission** as lead supervisory authority, a **Data Protection Officer** (`DPO@strava.com`), three named legal entities with postal addresses (US / Ireland / UK), and Standard Contractual Clauses for transfers. **17 US states** named for state privacy rights. A separate **Consumer Health Data Policy** covers the **Washington My Health My Data Act** and **Nevada Health Data Privacy Act**. **EU Digital Services Act** compliance has its own help article. Under-13s are prohibited; **under-16s cannot upload heart-rate data**. Published **Law Enforcement Guidelines**. |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 |
| Harvest completeness | Good for the priority areas (community vocabulary, privacy controls, exposure disclosure). Gaps: individual segment/KOM articles read only at title level; Terms and Acceptable Use Policy not fetched; **no accessibility statement found** |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.strava.com/ | Hero, three-pillar explainer, Beacon highlight |
| Subscription / pricing | https://www.strava.com/subscribe | **Three-step trial timeline**, four plans, free-vs-paid table |
| Community Standards | https://www.strava.com/community-standards | Three sections, 15 rules — the T14 centrepiece |
| Privacy Policy (2026) | https://www.strava.com/legal/privacy | Full GDPR treatment, exposure disclosure, deletion limits |
| Consumer Health Data Policy | https://www.strava.com/legal/consumer-health-data-policy | WA/NV scope, reproductive information named |
| Help centre home | https://support.strava.com/en-us/ | 9 collections with scope lines and article counts |
| Help: Getting Started | https://support.strava.com/en-us/collections/19657601-getting-started | 46 articles, 9 sub-collections |
| Help: Your Account and Privacy | https://support.strava.com/en-us/collections/19657607-your-account-and-privacy | 47 articles — the privacy-control inventory |
| Help: Privacy Controls (article) | https://support.strava.com/en-us/articles/15401951-privacy-controls | The 10-control reference guide |
| Help: Privacy defaults at signup | https://support.strava.com/en-us/articles/15401763-what-are-my-privacy-defaults-when-i-create-a-strava-account | **12 published defaults** |
| Help: Where does that data go? | https://support.strava.com/en-us/articles/15401700-my-activities-are-set-to-everyone-where-does-that-data-go-on-strava | **The exposure-inventory article** |
| Help: Safety and Security | https://support.strava.com/en-us/collections/19657603-safety-and-security | Beacon, Trust & Safety, DSA, CSAM/NCII reporting |
| Help: Clubs, Challenges, and Community | https://support.strava.com/en-us/collections/19657598-clubs-challenges-and-community | 25 articles, feed/kudos/comments |
| Help: What is Kudos? | https://support.strava.com/en-us/articles/15402054-what-is-kudos | Irreversibility, framed as a virtue |
| Help: Segments and Routes | https://support.strava.com/en-us/collections/19657604-segments-and-routes | 60 articles — the competition vocabulary |
| Help: Subscription and Billing | https://support.strava.com/en-us/collections/19657606-subscription-and-billing | 27 articles, cancellation and pricing |

---

## T1 Navigation & IA labels

**Global nav — activity-first, five items** `[observed]`

`Activities` (expanding to `Running` · `Cycling` · `Walking`) · `Features` ·
`Maps` · `Challenges` · `Subscription`, with `Log In` · `Sign Up` ·
`Get the App` · `Support` on mobile.

The first nav item is the *sport*, not the product. `Maps` and `Challenges` sit
at top level alongside `Features` — the two things a lapsed or prospective user
is most likely to want to browse without an account. Note there is no `Community`,
no `Clubs`, and no `Segments` in the nav despite those being the product's
defining features; they are inside `Features`.

`Skip to main content` present on the help centre; **not observed** in the
fetched markup of the marketing site.

**Help centre — nine collections, each with a scope line and a published article
count** `[observed]`

| Collection | Scope line (verbatim) | Articles |
|---|---|---|
| `Activity Analysis and Stats` | "Review and edit activities, track goals, and dig into Best Efforts, training zones, and your training log." | 79 |
| `Clubs, Challenges, and Community` | "Join clubs, take on challenges, and connect with athletes through your feed, kudos, and comments." | 25 |
| `Devices and Third-Party Apps` | "Connect and sync your favorite devices and apps — including Garmin, Apple Watch, and more." | 114 |
| `Getting Started` | "Set up your account, pair a device, and record your first activity. Everything to get moving with Strava." | 46 |
| `Recording and Uploading Activities` | "Record activities in the app, upload files, log manual entries, and troubleshoot sync issues." | 18 |
| `Safety and Security` | "Manage account security, share your location with Beacon, and report harassment or safety concerns." | 15 |
| `Segments and Routes` | "Discover and compete on segments, chase KOMs and QOMs, and build or explore routes." | 60 |
| `Subscription and Billing` | "Manage your subscription, update payment info, change plans, and get help with billing and refunds." | 27 |
| `Your Account and Privacy` | "Manage your profile, login, privacy and email settings" | 47 |

**Three things worth extracting.**

First, **the scope lines use the product's own slang** — "dig into Best Efforts",
"chase KOMs and QOMs", "Everything to get moving". This is the Wise pattern
(scope line as a comma-run of the verbs inside) crossed with brand voice. A user
who does not know what a KOM is learns from the scope line that `Segments and
Routes` is where competition lives.

Second, **`Your Account and Privacy` is the second-largest collection (47
articles)** and is larger than `Clubs, Challenges, and Community` (25) and
`Recording and Uploading Activities` (18) combined. For a product whose core loop
is recording and sharing, having nearly twice as much help content about privacy
as about recording is a direct, measurable consequence of its privacy history.

Third, **article counts and author counts are published on the collection cards**
— "By Marie and 1 other2 authors46 articles". Naming the writers (`Marie` appears
as sole or lead author on almost every collection) is unusual transparency and
also reveals that a help centre of ~430 articles is maintained by one to three
named people.

**Sub-collection structure is three deep**, and the sub-collections are where the
IA gets good. Inside `Your Account and Privacy`:
`Account Settings and Preferences` · **`Age and Minor Safety`** ·
`Club Waivers` · **`Data and Health Information`** · `Followers and Connections` ·
`Login and Account Access` · **`Privacy Controls`** · `Profile Management`.

Inside `Safety and Security`: `Account Enforcement and Community Standards` ·
`Beacon and Location Sharing` · `Legal and Compliance` ·
**`Reporting and Trust & Safety`**.

`Age and Minor Safety` and `Reporting and Trust & Safety` as named IA nodes are
platform-governance vocabulary, not fitness-app vocabulary. Strava's help IA is
structured like a social network's.

**Footer** `[observed]`: four columns — product (`Features`, `What's New`,
`Stories`, `Routes`, `About`), commerce (`Subscription`, `Family Plan`,
`Bulk Subscriptions`, `Student Discount`, `Teacher, Military & Medical Discount
(US Only)`, `Send a Gift`), business (`Support`, `Business`, `Partner Center`,
`Careers`, `Press`), legal (`Privacy`, `Cookie Policy`,
**`Do Not Share My Personal Information`**, `Terms`).

The legal column's `Do Not Share My Personal Information` is a CCPA/CPRA-mandated
link and it sits in the footer of every page.

## T2 Value proposition & headline patterns

**Hero — one compound noun, repeated three times on the page** `[observed]`

> `Community-Powered Motivation`
> "Track your progress and cheer each other on. Join over 100 million active
> people on Strava for free."

Two imperatives in the subhead — one solitary (`Track your progress`), one
reciprocal (`cheer each other on`) — which is the whole product in six words.
The headline is a **noun phrase naming the mechanism**, not a benefit or a slogan:
motivation, and the source of it is other people.

**The positioning statement** `[observed]`, under `Who we are`:
> "If you're active, Strava was made for you… **We're the social network for those
> who strive.** Join us."

`social network` is claimed explicitly, not euphemised into "community" or
"platform". Strava is the only product in this batch that describes itself as a
social network, and that self-description is what makes its privacy problem
structural rather than incidental.

**The three-step explainer, and its best line** `[observed]`

| Heading | Supporting copy |
|---|---|
| `Start by sweating.` | "**The way you 'post' in this network is by being active.** Strava works with your mobile phone or favorite GPS device to track your activities and share your efforts with friends." |
| `Get better by analysis.` | "…almost every metric you can imagine awaits — from basics like speed, pace and distance, to Strava exclusives, like your performance compared to past attempts and Relative Effort." |
| `Dive into details on desktop.` | "…training plans, route planning, activity breakdowns and other tools to take your planning and analysis game to the limit." |

**"The way you 'post' in this network is by being active"** is the single best
sentence on the site. It explains the entire content model of the product by
analogy to a thing the reader already knows, in twelve words, and the scare quotes
around "post" do the work of signalling that the analogy is imperfect. It also
quietly discloses the privacy consequence — your posts are your movements —
without sounding like a warning.

**Differentiation is framed against other social networks, twice** `[observed]`:

- `A no BS network.` — "The Strava feed is full of inspiring activities, crazy
  adventures and interesting new routes – all the best athletic content, **none of
  the junk posts you find on other social networks.**"
- `Join for the tracking, stay for the community.` — a funnel statement used as a
  section header.

**Section headers are colloquial and often interrogative** `[observed]`:
`Open, tap, go.` · `The ultimate athlete resource.` ·
`Ready to give it a shot?` · `Explore our features.` ·
`Give it a shot, you'll dig it.`

**The Beacon block is the strongest piece of feature copy** `[observed]`:
> `Feature highlight: Beacon.`
> "Share your real-time location during an activity with up to three safety
> contacts. **Your loved ones get peace of mind. You get to forge ahead (or stop
> for a snack).**"

Two beneficiaries named in two short sentences, then a parenthetical joke that
undercuts the seriousness at exactly the right moment. The feature is a safety
feature; the copy refuses to be grim about it. Note also the precision —
"up to three safety contacts" — a number in a benefit sentence.

**Pricing page headlines** `[observed]`: `The best of Strava. Built for your
goals.` · `Everything you need, all in one place` · `Routes that never run out` ·
`Smarter insights for faster progress` · `Challenges that bring out your best` ·
`And by everything, we mean everything` (over the comparison table) ·
`Progress starts here. And with these tools, you're never in it solo.` ·
`Start achieving your goals. On us for 30 days.`

`you're never in it solo` and `On us for 30 days` are the two most Strava-ish
constructions — community framing and a gift framing for a free trial.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign Up` | Nav, footer | |
| `Join for Free` | Nav (interior pages) | **Different label for the same action** |
| `Join Us Now` | Homepage, ×3 | |
| `Join us for free.` | Homepage banner | **With a full stop** |
| `Sign Up for Free` | Community Standards footer | |
| `Sign Up With Google` / `Sign Up With Apple` / `Sign Up With Email` | Hero | Three-way auth choice, no password field shown |
| `Already a Member? Log In` | Under the hero | Question then action |
| `Log In` | Nav | |
| `Get the App` | Mobile nav | |
| `Start free trial` | Pricing, top | |
| `Start free 30-day trial` | Pricing, bottom ×2 | **Longer variant lower on the page** |
| `Try it free` | Individual and Student plan cards | |
| `Choose plan` | Bundle and Family plan cards | **Trial-eligible plans say "Try", non-trial plans say "Choose"** |
| `See all plans` | Under the primary CTA | |
| `Learn more` | Runna bundle block | |
| `Explore` | Feature blocks, ×6 | Bare, repeated |
| `Try` | One homepage subscription block | Bare verb, one word |
| `Ask our Chatbot` | Help centre footer, every page | Named channel |
| `Skip to main content` | Help centre | |
| `Do Not Share My Personal Information` | Site footer, every page | Regulatory link as a CTA |
| `Report it to us` | Community Standards | |

**Six labels for "create an account"** (`Sign Up`, `Join for Free`, `Join Us Now`,
`Join us for free.`, `Sign Up for Free`, plus the three `Sign Up With …`
variants). Recorded as a consistency finding, though `Join` versus `Sign Up`
is arguably doing deliberate work — `Join` frames it as entering a community,
`Sign Up` frames it as creating an account, and `Join` is used in the
community-heavy contexts.

**The `Try it free` / `Choose plan` split is a genuinely good distinction.** Plans
with a 30-day trial get `Try it free`; the Family and Runna bundles, which have no
trial, get `Choose plan`. The CTA tells the user what will happen when they press
it — a commercial disclosure encoded in the button label.

## T4 Onboarding & getting-started

**The trial timeline is the best onboarding artefact in this batch of five.**
`[observed]` — three steps, rendered at the top of the pricing page, above the
plan cards:

| Step | Copy (verbatim) |
|---|---|
| `Today` | "Unlock subscription features including routes, segment leaderboards, advanced training analysis and more." |
| `2 days before` | "**Get a reminder about when your trial will end.**" |
| `In 30 days` | "You'll be charged the subscription amount. **Cancel at least 24 hours before.**" |

Three things make this exemplary and all three are transferable:

1. **It is a timeline, not a paragraph.** The user sees the shape of the
   commitment — start, warning, charge — before choosing a plan.
2. **Step 2 is a promise the company makes to itself.** "Get a reminder about
   when your trial will end" is a commitment to warn the user before taking their
   money, published as a *feature of the trial*. The overwhelming majority of
   free-trial flows do not promise this, and the ones that do bury it in terms.
3. **Step 3 states the cancellation deadline in the same breath as the charge.**
   "Cancel at least 24 hours before" — the specific window, next to the specific
   consequence.

Against the regulatory attention on trial-to-paid conversion across this whole
domain, this three-card pattern is the single most directly copyable thing in the
file.

**Pricing disclosure is complete on the card** `[observed]`: each plan states a
headline per-month figure, the actual billing basis, and the tax treatment —
"$6.67 /month · 30-day trial for $0 · **Billed at $79.99/year + tax**", and for
the Family plan a footnoted qualifier "**\*Price reflects plans with 4 members**".
Annual-only plans say `Annual only`. Nothing is implied; the arithmetic is shown.

**Getting Started sub-collections** `[observed]` — nine of them, and the set is
unusually broad for an onboarding collection: `About Strava` ·
`Connectivity and Integrations` · `Getting Help` · **`Glossaries and References`**
· `Maps and Navigation` · `Profile Customization` ·
`Recording and Uploading Activities` · `Setting Up Your Account` ·
**`Stats and Metrics Explained`** · `Your Feed and Community`.

**Putting a glossary and a metrics explainer inside `Getting Started`** is the
right call for a product whose vocabulary (segment, KOM, Relative Effort, GAP,
VAM, Local Legend) is opaque to a new user and is simultaneously the thing they
will encounter first in their feed.

**`How Do I Record an Activity on Strava?`** is the true first-run article, and
the first-activity path is stated as `record` → `pause` → `save`.

## T5 Form & field labels

Pre-auth form surface is the signup block. `[observed]`

Three buttons (`Sign Up With Google` / `Sign Up With Apple` / `Sign Up With
Email`) with the consent line beneath:

> "By continuing, you are agreeing to our **Terms of Service** and
> **Privacy Policy**."

A plain agreement-by-continuation statement with both documents linked, placed
under the buttons rather than in a checkbox. Note `By continuing` rather than
`By signing up` — the verb covers all three paths including OAuth.

**Documented field and setting vocabulary** `[documented]` — the privacy controls
are the substantive "form" and they share a **three-value vocabulary** used
consistently across six different settings:

**`Everyone`** · **`Followers`** · **`Only You`**

with two principled exceptions: messaging uses `Following` (i.e. people *you*
follow, not people who follow you — a deliberate asymmetry that makes unsolicited
contact harder), and Flyby uses `No One` as its default rather than `Only You`
because it is an inclusion toggle rather than a visibility level.

`Group Activities` re-uses the same three values with a different meaning —
`Only You` there means "not grouped with other athletes at all". The documentation
says so explicitly, which is necessary because the label would otherwise mislead.

Other documented labels: `Do not send these notifications` (a checkbox, under
`Sharing my activities with my followers`) · `Product Improvements` ·
`Personal Information Sharing` · `Map Visibility` · `Challenge Participation` ·
`Public Photos on Routes` · `Mentions` · `Training Log`.

## T6 Status & state language

**Strava's "status" vocabulary is achievement vocabulary**, and it is the richest
competitive lexicon in the corpus.

### The achievement set `[documented]`

| Term | What it is |
|---|---|
| `KOM` / `QOM` | King/Queen of the Mountain — fastest recorded time on a segment, split by gender setting |
| `Local Legend` | "awarded to the athlete who completes a given segment the most over a rolling 90-day period, **regardless of pace or speed**" |
| `trophy` / `medal` | segment achievement tiers |
| `Queen/King of the Day jersey` | awarded during major professional cycling races on categorised climbs |
| `Best Efforts` | personal bests at standard distances |
| `Verified badge` · `Pro badge` · subscription badge | profile status markers |
| `Starred Segment` | a user-favourited segment |
| `Verified Segment` | a Strava-curated canonical segment |
| `Year in Sport` | the seasonal annual summary |

**`Local Legend` is the important one.** It is an achievement awarded for
**frequency, explicitly not speed** — "regardless of pace or speed" — on a rolling
90-day window. In a product whose flagship achievement (KOM/QOM) is winner-takes-
all and effectively unavailable to most users, `Local Legend` creates a second,
parallel status economy that a slow, consistent, local athlete can win. That is a
deliberate motivational-design decision with a naming decision attached: *Legend*
carries as much status as *King*, and *Local* scopes it to a community the user
actually belongs to.

It is also **opt-out-able**: "You can also opt out of this achievement completely
using your privacy controls."

### Negative and excluded states `[documented]`

`Excluded Segment Efforts` · `flagged` activities · `hazardous` (a segment can be
flagged as hazardous, after which "restrictions automatically apply") ·
`hidden` segments · `muted` activities · `private` segments · suspended accounts.

**`Excluded Segment Efforts`** — "why Strava excludes certain segment efforts from
public leaderboards due to GPS errors or the wrong activity type, and how you can
resolve this." The state names a *removal from a leaderboard*, and the article
title promises a resolution path. Compare the alternative framing ("invalid
effort", "rejected") — `excluded` is mechanical, not accusatory.

**Hazardous-segment flagging** is a safety state that changes product behaviour:
flagging restricts the leaderboard, and users must **opt back in** to view it.
A community-reportable state that degrades a competitive feature is an unusual and
defensible design.

### Climb categorisation `[documented]`

Strava borrows professional cycling's category system wholesale —
`Category 4` through `Hors Catégorie` — calculated by "multiplying segment length
in meters by grade". **Adopting a niche sport's existing vocabulary rather than
inventing a friendlier scale** is the opposite of most consumer-product practice,
and it works here because the vocabulary confers authenticity on the product among
the users who already know it. The cost is total opacity to everyone else, which
is why it is documented in `Segments: Getting Started`.

### Performance metric vocabulary `[documented]`

`Relative Effort` (named a "Strava exclusive" on the homepage) ·
`Fitness Score` · `Fitness & Freshness` · `Performance Predictions` ·
`Grade Adjusted Pace (GAP)` · `Vertical Ascent in Meters (VAM)` · `cadence` ·
`Training Load` · `Intensity` · `FTP` · `Power Zones` · `Route Difficulty`.

Two published glossaries exist — `Strava Training Glossary for Cycling` and
`Strava Training Glossary for Running` — **split by sport**, because the same
athlete-facing concepts have different names and different canonical metrics in
each. Sport-specific glossaries rather than one merged glossary is the right call
and is worth noting as a pattern for any product serving distinct expert
communities.

`Grade Adjusted Pace` is the model definition: "adjusts your running pace for
hills, **letting you fairly compare your effort across flat routes and hilly
routes**". The metric's purpose — fairness of comparison — is in the definition.

## T7 Error, failure & recovery

`[documented]` — and Strava's distinctive category is **"the system produced a
result you will think is wrong"**, of which there is a whole sub-collection
(`Segment Troubleshooting`).

**The standout title** `[observed]`:

> `Can Average Speed Be Higher Than Max Speed on a Segment?`
> — "**Yes**, average speed can be higher than the max speed on a Strava segment
> due to GPS variance. Learn why this happens and how segment matching works."

A physically impossible-sounding result, named in the user's own words, answered
"Yes" in the first word of the summary, with the cause given. This is the
best-executed instance in the corpus of **documenting the gap between system
output and physical reality** — the same job Wise's "why does it say my transfer's
complete" article does.

**Other reconciliation articles** `[observed]`:
`Why Is There Resting Time in My Segment Efforts on Strava?` ·
`Segment Matching Issues` ("why a segment may not match your activity, **why false
matches sometimes happen**") · `Segment Matching Delays` ·
`Why Doesn't My Segment Effort Appear on the Leaderboard?` ·
`Elevation on Strava FAQs` ("how Strava calculates, corrects, and smooths your
elevation data, and **why your elevation may look different**") ·
`How Does Strava Calculate Calories?` ("and **how third-party calorie values can
differ**").

Three of these explicitly address **disagreement with another source** — a
third-party app's calorie count, a device's elevation, a user's own sense of how
fast they went. A product that ingests data from 114 articles' worth of
third-party devices has to write this content, and it does.

**Self-service repair tools are named and documented** `[documented]`:
`Potential Segment Match Analysis Tool` ("see why a segment did not match your
activity **and request a manual match**") · `Refresh Activity Achievements` ·
`Refresh My Results`.

Giving users a tool that explains *why* the algorithm did not match, plus a manual
appeal, is the transferable pattern — and it is the same principle as Calm's
user-editable streak (102) applied to a competitive record rather than a
motivational one.

**Login and account-recovery titles** `[observed]` are question-shaped and
include a notable security one: `What Do Strava's Account Security Emails Mean?`
— "what it means when you get a Strava email about a password or email change **you
didn't make**, and the steps to take". Documenting the *unexpected* security email
is better practice than documenting only the expected one.

`Facebook Login is no Longer Supported` documents a **removed capability** with a
recovery path — the same removed-feature-article pattern noted in the Wise
exemplar.

`Why am I Redirected Here?` explains dead links from Strava or third-party sites —
a help article about the help centre's own 404 behaviour.

## T8 Empty states

`[absent]` — no in-product empty states are observable pre-auth, and none were
found documented.

Two adjacent observations `[observed]`:

- **`Why is my Year in Sport Unavailable?`** — "Your Year in Sport summary is only
  available on a **seasonal schedule.** Learn when it returns and what to do with
  your activities in the meantime." A time-gated feature whose absence is
  documented as a state with a return date and an interim suggestion. This is the
  closest thing to a documented empty state and it is well handled: *why it's
  gone, when it's back, what to do now.*
- **`Changes to Clubs`** documents the removal of the Recent Activity feed from
  large clubs and the imposition of member-list and leaderboard-filtering limits —
  i.e. a feature that emptied out, documented as a change rather than left as a
  mystery.

## T9 Notifications & system messages

**The most consequential finding is a default-on outbound notification about the
user, sent to other people.** `[observed]`

> **Promoting Activities to Followers**
> "Strava occasionally sends emails and push notifications to your followers to
> share your recent activities. If you would prefer not to be promoted to your
> followers in this way, you can opt out… by enabling the checkbox labeled
> **'Do not send these notifications'** under **'Sharing my activities with my
> followers.'**"

Default: **Opted in** (confirmed in the privacy-defaults article, T10).

So by default, Strava will push your activity to other people's phones without
you sharing it. The disclosure is clear, the control exists, and the control is
buried behind a negatively-phrased checkbox (`Do not send these notifications`) on
the web settings page only — the article does not give a mobile path. A
double-negative checkbox governing an opt-out of outbound promotion is the kind of
construction that fails a dark-pattern review even when the underlying disclosure
is honest.

**Other documented notification surfaces** `[documented]`:
`How Do I Manage My Strava Notifications?` covers "email, web, app, segment, club,
and newsletter notifications" — six channels in one article. Plus
`kudos notification preferences`, `comment notifications` with an **unsubscribe
from a single activity's discussion thread**, `mention notifications`,
`Shoe Mileage Notifications` (an email when a pair of shoes passes a
user-set mileage threshold), `Club email notification settings`, and
`Audio Announcements` ("real-time audio cues for segment performance and split
times while recording").

**`Beacon`** `[documented]` is the outbound-safety notification: real-time
location "with up to three safety contacts", with device support (Apple Watch,
Wear OS, Garmin) and a documented recipient view. It relies on **synced contacts**,
and there is a dedicated article for that: `How Does Strava Use my Synced Contacts
and Connections?` — "how Strava uses your synced phone contacts for Beacon safety
messages, suggested follows, and Find Friends, **and how you can remove your
contacts**." Naming all three uses of a contact upload, including the one the user
did not intend (suggested follows), and giving the removal path, is good practice.

**Audio announcement copy itself is not publicly observable.** `[absent]`

## T10 Disclosures, legal & compliance

**Priority section. Strava has no health-claim boundary to manage — it has an
exposure boundary, and it manages it with more published detail than any other
product in this batch.**

### (a) There is no health-claim disclaimer, and that is correct `[observed]`

Strava records what the user did. It does not compute a score about their body,
does not detect illness, does not estimate a physiological state, and does not
recommend rest on the basis of biometrics. Accordingly **no medical-device,
diagnosis, or treatment disclaimer was found on any page inspected, and none is
needed.**

The one place a health-adjacent caution appears is in the **Community Standards**,
not in a legal document (T14): "Listen to your body and take rest days to avoid
injury and burnout."

`Relative Effort` and `Fitness Score` are the closest the product comes to scoring
a body, and both are framed as training-load constructs rather than health
assessments. The Privacy Policy names them as "**Performance Metrics**" —
"We generate metrics from your information to help you **analyze your
performance**" — the word is performance, never health.

**The transferable observation** is that the disclaimer burden is a function of
the claim, not the domain. Four products in this batch are in `HLTH`; three of
them need a wellness boundary and one does not, and the difference is entirely
whether the product tells the user something about their body that they did not
already know.

### (b) The privacy defaults are published as a list `[observed]`

`What Are My Privacy Defaults When I Create a Strava Account?` gives twelve
settings and their shipped values:

| Setting | Default |
|---|---|
| Profile | **Everyone** |
| Activities | **Everyone** |
| Group Activities | **Everyone** |
| Flyby | No One |
| Training Log | Private |
| Mentions | **Everyone** |
| Who can message you | Following |
| Map Visibility | **"The first and last 200 meters of your future activity maps will be hidden by default when you log in to the Strava app."** |
| Product Improvements | **Enabled** |
| Public Photos on Routes | **Enabled** |
| Sharing my Activities with my Followers | **Opted in** |
| Personal Information Sharing | **Opted in** |

**Publishing the default state of every privacy control, in one list, is the
practice to copy.** Most products document how to change a setting and never state
what it is set to out of the box.

Read honestly, the list shows **seven of twelve defaulting to the most exposed
option**. But three of the defaults are the direct, legible product response to
Strava's documented location-privacy history:

- **`Flyby: No One`** — the activity-playback feature that shows who was near you
  is **off by default** and requires an explicit opt-in *and* an activity set to
  Everyone. Two gates on the most identifying feature.
- **`Training Log: Private`** — the longitudinal pattern-of-life view is private
  by default.
- **`Map Visibility: first and last 200 meters hidden`** — start and end points,
  which are where people live, are obscured on every new account.

The 200-metre default is the artefact. It is specific, it is measured in the right
unit, it applies to *future* maps, and its trigger condition is stated
("when you log in to the Strava app") rather than assumed. The control that
extends it is documented separately and includes "hiding an address, the start/end
of activities, **no matter where they happen**, and the map completely" — three
levels of increasing protection, with the middle one explicitly covering the case
the naive implementation misses (a start point that is not your home).

**Under-18s get a different default set entirely**: "These defaults do not apply
if you are under 18", with its own article.

### (c) The exposure-inventory article `[observed]`

`My Activities Are Set to "Everyone"; Where Does That Data Go on Strava?` is the
most useful single privacy document in this batch. It opens by naming the
question the user is actually asking:

> "you may wonder, '**Where does my information appear, and who can see it?**'"

and then enumerates **seven destinations**, each with the specific fields that
appear:

| Destination | What is disclosed |
|---|---|
| Segment leaderboards | "your **name, time, activity date, and activity link** may appear" |
| Challenge leaderboards | "your name, activity link, and progress will appear" |
| Local Legend | "your name and number of efforts will be displayed" — with an opt-out |
| Home / Club / Profile feeds | activity summaries to followers, club members, and the public |
| Flyby | "in-depth activity playbacks to anyone on Strava or the web… rewatch any activity minute by minute and see athletes who were nearby and where you crossed paths" |
| Global Heatmap | aggregated |
| Points of Interest / Start Points | "All data is aggregated and de-identified" |
| Routes | "recent public activities and photos along suggested routes" |

**Field-level disclosure — naming the exact attributes that become public, per
surface — is the standard this sets.** "Your activity is public" is not a
disclosure; "your name, time, activity date and activity link appear on that
leaderboard" is.

Every entry links to a live example, including an actual public segment
leaderboard and an actual Flyby playback. **Showing the user a real instance of
the exposure, rather than describing it**, is the strongest possible form of this
disclosure and it takes real institutional nerve to link to it from your own help
centre.

The Flyby description does not soften: "see athletes who were nearby and **where
you crossed paths**." That is the sentence that explains why Flyby is off by
default, and it is written plainly rather than being managed.

### (d) The irreducible exposure is stated `[observed]`

`What Information Is Always Visible to All Strava Members?`

> "To help people connect with you, some profile information will **always** be
> visible to all Strava members, **regardless of your privacy settings**: your
> first and last name, your badge…, your bio, and your number of
> followers/following."

**Naming what cannot be hidden, under its own heading, is the honest counterpart
to publishing the controls.** A privacy-controls page that lists only what you can
change implies everything else is private.

And `What Information Is Public to Anyone on the Internet?` goes further:

- a logged-out profile is served to non-members and "may be **indexed by search
  engines**"
- setting the profile to `Followers` "prevents search engines from seeing your
  Strava profile and indexing photos and information attached to your activities"
- "Your public profile **may be displayed in search engine results until the
  search engine refreshes its cache**" — the lag is disclosed
- a link is given to **Google's own content-removal process**
- and the residual: "**anyone on the internet may be able to see your placement on
  leaderboards**" — i.e. the 200m map default does not protect the leaderboard.

Routing the user to a third party's removal tool, and stating that your own fix is
not instantaneous, is the kind of disclosure that only gets written deliberately.

### (e) Deletion and its limits `[observed]`

From the Privacy Policy:

> "Once deleted, **we cannot reinstate your data, including your account,
> activities, and place on leaderboards.** Following deletion of your account, it
> may take **up to 45 days** to delete your personal information and system logs."

> "We do **not** have control over content you have shared directly or publicly
> with others, such as photos or videos on other social media platforms, or that
> others may have copied. **Public segments and routes will also remain
> available.**"

Three limits, stated plainly: irreversibility, a 45-day tail, and the fact that
**segments you created survive your account deletion**. The last is a genuine
surprise for a user and it is disclosed in the policy rather than discovered
later.

### (f) GDPR and jurisdictional treatment `[observed]`

The fullest treatment in this batch:

- **Legal bases enumerated and defined in lay terms** — Contract, Consent,
  Legitimate interests ("When we use your information in ways that are expected
  and that do not unfairly affect your rights"), Legal obligation, Vital interests
  ("When processing is needed to protect someone's life or safety"). Glossing
  "legitimate interests" in plain English, in a policy, is rare and good.
- **Three controllers, three addresses**: Strava, Inc. (San Francisco),
  Strava Ireland Ltd. (Dublin), Strava Limited (London) — with "**Making it
  Work**" as the first line of the Irish address, which is an office name but
  reads oddly in a legal block.
- **Lead supervisory authority named**: the Data Protection Commission of Ireland.
- **DPO contact published**: `DPO@strava.com`.
- Right to complain to a local supervisory authority, right to object to
  legitimate-interests processing, SCCs for transfers.
- **17 US states named** for state privacy rights, plus "other states to the
  extent they enact similar privacy laws".
- Opt-out mechanisms named including **Global Privacy Control**, with an honest
  negative: "**Do Not Track (DNT) is a privacy preference you can set in browsers,
  but we do not currently process DNT signals.**"
- **Automated decision-making**: "we do **not** use these technologies for
  decisions that have legal or similarly significant effects on you."

### (g) Consumer health data `[observed]`

A separate policy, scoped to the **Washington My Health My Data Act** and the
**Nevada Health Data Privacy Act**. Two features of it are notable:

It **acknowledges the scope question openly** rather than asserting a boundary:
> "Given the breadth of certain privacy laws, **a limited amount** of the Activity
> Data we collect **may be considered to be** Consumer Health Data."

And it **names reproductive information** as a category: "information that
identifies vital signs or health-related measurements, **or reproductive
information**." For a platform on which people record runs while pregnant or
record cycles via integrations, naming it is the right call.

> "**We do not sell Consumer Health Data.** And except as noted in this section,
> we do not share it with third parties."

The main Privacy Policy carries a stronger, narrower commitment on integrated
health data:
> "If we collect health information from these integrations (such as heart rate),
> we will **not sell or use it for advertising** or other similar purposes; we
> **do not disclose it to third parties without your prior consent**; and we will
> **only use it for the specific purposes described in this Policy**."

Three separate promises in one sentence, each closing a different loophole.

### (h) Platform governance `[observed]`

Strava publishes what a social network is expected to publish, and the help IA
surfaces it:

- `Strava and the European Union's Digital Services Act` — "our EU user threshold,
  how to report illegal content, and where to find transparency reports"
- `Strava Law Enforcement Guidelines` (footer of the legal pages)
- `Understanding Account Enforcement` — "what actions we take on violations, and
  **how to appeal** a suspended account"
- `Reporting Child Sexual Abuse Imagery on Strava` — "**including AI generated
  content**"
- `Reporting Explicit or Sexual Images Shared Without Your Consent` —
  "**including AI-generated deepfakes**"
- `Reporting Cyberbullying on Strava` — "what happens after you submit a report
  **and how you can appeal our decision**"
- `Spam, Bots, and Unwanted Solicitations`
- `Reporting Unwanted Contact to the Strava Trust & Safety Team`
- `How Do I Report a Photo or Video Shared Without My Consent?`
- `How Do I Request the Removal of a Deceased Athlete's Profile on Strava?`
- `Bib Transfers on Strava` — "**scam risks**, the account review process"

**Each reporting article names an appeal route.** And the harms are named
specifically — CSAM, deepfakes, non-consensual intimate imagery, cyberbullying —
rather than aggregated into a single "report abuse" article. Naming the harm in
the article title is what makes it findable by the person experiencing it.

### (i) Subscription and cancellation `[observed]`

The trial timeline (T4) does most of the disclosure work. Beyond it:

`How do I Cancel my Subscription?` — "how to cancel your Strava subscription on
the website, iOS, or Android, **and find out whether you still qualify for a
refund after canceling**." Three-platform routing plus refund eligibility in the
summary.

`Subscription Pricing FAQ` — "current Strava subscription prices **by country**,
check or change your renewal price on iOS, Android, or web, and **how price
changes are announced**." Publishing the price-change communication policy is the
Wise `When do price changes apply to me?` pattern.

`What Price Will my Subscription Renew at?` · `How Does Strava Calculate Taxes on
My Subscription?` · `How Do I Redeem a Promotional Code?` — "exactly how redeeming
one **affects your subscription renewal price**" (promo codes disclosed at the
renewal, not just the purchase).

`What is a Strava Subscription Preview?` — a free 30-day preview of subscription
features "and exactly **what happens when it expires**."

## T11 Help-centre architecture

Intercom-hosted, **three levels**: Collection → sub-collection → article.
~430 articles across nine collections.

**Article titles are question-shaped and SEO-optimised, with a summary line
rendered beneath every link.** This is the distinguishing structural feature: in
every collection listing, each article shows title **plus a one-sentence
description**, so a user can self-route without opening anything:

> `What is Kudos?` — "Learn what Kudos means on Strava, how to give it from your
> feed or an activity page, and **why there is no way to undo or remove given
> Kudos ever**…"

> `How Do I Delete My Strava Account?` — "Learn how to permanently delete your
> Strava account, **what happens to your segments, routes, clubs, and data**, and
> how to get help if you're locked out."

The descriptions consistently **include the caveat**, not just the procedure —
"why there is no way to undo", "what happens to your segments", "why you may lose
followers overnight", "which segments cannot be switched". The summary line is
being used to pre-empt the follow-up question, which means the user often does not
need the article.

**Title grammar — four shapes:**

| Shape | Example |
|---|---|
| `How Do I …?` (dominant) | `How Do I Edit My Map Visibility on Strava?` |
| `What Is/What Are …?` | `What's a Segment?` · `What Are Starred Segments?` |
| `Why …?` | `Why Doesn't My Segment Effort Appear on the Leaderboard?` · `Why Is My Virtual Ride Segment Private?` |
| Bare noun phrase | `Strava Beacon` · `Clubs on Strava` · `Route Difficulty` · `Segment Matching Issues` |

Almost every title ends with **"on Strava"** — `How Do I Use Mentions on Strava?`,
`Reporting Cyberbullying on Strava`, `How Do I Create a Segment on Strava?`. A
deliberate and consistent SEO suffix, applied so uniformly that it reads as house
style rather than as keyword-stuffing. `What's a Segment?` and
`What is Kudos?` are the exceptions — the two most basic concepts get the shortest
titles.

**Capitalisation is Title Case throughout**, with lapses:
`Can I use Strava if I'm under the age of 16?` and
`How do I Bulk-Edit the Privacy Settings for my Past Activities?` mix cases
mid-title.

**Routing furniture** `[observed]`: `Search for articles...` · breadcrumbs showing
all three levels · `Related Articles` (five) · **`Did this answer your question?`
with three emoji reactions — `Disappointed 😞` / `Neutral 😐` / `Smiley 😃`**.

The three-point emoji scale is more granular than the binary Yes/No used by
Headspace, Calm and Fitbit, and it is the only emoji found anywhere in Strava's
content. Named authorship (`Written by Marie`) and a freshness marker
(`Updated this week` / `Updated over a week ago`) appear on every article — the
relative freshness label is friendlier than a date but less precise, and
"over a week ago" could mean anything from eight days to four years.

**`Ask our Chatbot`** is the only support CTA in the help footer. No email, no
form, no phone — the chatbot is the front door, with `How Do I Contact Strava
Support?` documenting "our chatbot, the mobile app, or by email" and
"**response times and callback requests**".

**21 languages.**

## T12 FAQs

**No standalone marketing FAQ block** was found on the homepage or pricing page.
`[absent]` for that pattern — which is unusual, and worth recording: Headspace,
Calm and Oura all run one.

What Strava has instead is **the summary line under every help article title**
(T11), which does the same job at greater scale and better distributed. A user
scanning the `Privacy Controls` sub-collection reads fifteen answers without
opening anything.

**FAQ-shaped content inside articles** `[observed]`:

- `What is Kudos?` carries a one-question `FAQs` block:
  **`Can I undo or delete a kudos?`** (answer quoted in T13/T14)
- `What Are My Privacy Defaults…` carries two section-headings phrased as user
  questions: `What Information Is Always Visible to All Strava Members?` and
  `What Information Is Public to Anyone on the Internet?`
- `Strava's Privacy Controls FAQ` is a dedicated article
- `Elevation on Strava FAQs`, `Strava and Runna Subscription FAQs`,
  `Subscription Pricing FAQ`, `Friends and Family for Calm Health FAQ`-equivalents
  exist per topic rather than centrally

**The pattern here is topic-local FAQs rather than one global FAQ**, and given the
breadth of Strava's surface (segments, privacy, devices, billing, clubs) it is the
right structure. A single FAQ would have to choose between them.

## T13 Terminology & glossary

| Term | Strava's usage | The alternative it rejected |
|---|---|---|
| `athlete` | The person, throughout — `Strava Community of Athletes`, "athletes you've followed", "Manage Followers and Block Athletes" | "user", "runner", "member" — though **`Strava members` also appears**, inconsistently |
| `kudos` | The approval unit — "a quick thumbs-up… to congratulate them" | "like", "cheer", "props" |
| `segment` | "portions of road or trail **created by members** where athletes can compare times" | "route section", "leg" |
| `KOM` / `QOM` | King/Queen of the Mountain | "fastest time", "record" |
| `Local Legend` | Most efforts over a rolling 90 days, regardless of speed | "most consistent", "regular" |
| `Flyby` | Activity playback showing nearby athletes and crossings | "replay", "proximity" |
| `Beacon` | Live location shared with "safety contacts" | "live track", "share location" |
| `Club` | The group construct | "group", "team" — though `Team` exists as a separate profile field |
| `Challenge` | Time-bounded goal event | "event", "competition" |
| `Group Activities` | Auto-detected co-recorded activities | "shared activities" |
| `Relative Effort` | Strava-coined training-load metric — labelled "a Strava exclusive" | "TSS", "training load" |
| `Fitness Score` / `Fitness & Freshness` | Longitudinal load/recovery model | |
| `Best Efforts` | Personal bests at standard distances | "PBs", "records" |
| `Grade Adjusted Pace (GAP)` | Hill-adjusted pace for fair comparison | |
| `Vertical Ascent in Meters (VAM)` | Rate of climb per hour | |
| `Hors Catégorie` / `Category 4–1` | Climb difficulty, borrowed wholesale from pro cycling | an invented 1–5 scale |
| `Starred` | User-favourited segment | "saved", "bookmarked" |
| `Verified` | Both a segment status and a profile badge — **one word, two meanings** | |
| `For a Cause` | An activity tag for advocacy | |
| `Global Heatmap` / `Strava Metro` | Aggregated community data products | |
| `Points of Interest` / `Start Points` | Community-derived map features | |
| `Year in Sport` | The annual summary | "Wrapped", "Year in Review" |
| `Everyone` / `Followers` / `Only You` | The three-value privacy vocabulary | "Public / Private / Friends" |
| `Product Improvements` | The opt-in that feeds Heatmap, POI and AI | "data sharing", "analytics" |
| `Personal Information Sharing` | The advertising opt-out | |
| `Trust & Safety` | The named team | "moderation", "support" |
| `Activity Data` | The defined legal term for what you record | |
| `Performance Metrics` | The defined legal term for what Strava computes from it | "health data" — deliberately not |

**Four observations.**

**1. `athlete` is the load-bearing word.** It appears in help titles, legal text,
marketing, and the Community Standards, and it is doing motivational work: it
tells a walker logging a 20-minute stroll that they belong to the same category as
a professional cyclist. The slippage into `Strava members` in the privacy articles
is the only place it breaks, and that is arguably correct — membership is the
right frame for a privacy setting, athleticism for a leaderboard.

**2. `Performance Metrics`, not health metrics.** The Privacy Policy defines
`Activity Data` (what you did) and `Performance Metrics` (what Strava computes)
as separate terms, and neither is called health data. `Consumer Health Data` is
defined only where a statute forces it. The terminology enforces the positioning
described in T10a.

**3. `kudos` is a mass noun with a contested plural.** The article is titled
`What is Kudos?` (singular verb, capitalised) and the body says "kudos **are** a
quick thumbs-up" (plural verb, lowercase) and then "**a** kudos" in the FAQ
question. Three grammatical treatments in one short article. A coined social
primitive with unstable grammar is a real localisation problem across 21 languages.

**4. `Verified` means two different things** — a Strava-curated canonical segment,
and a profile/club authenticity badge — with separate articles for each
(`What Are Strava Verified Segments?` and `How Do I Get a Verified Badge on
Strava?`). Recorded as a term collision.

## T14 Voice, tone & accessibility

**Person and tense.** Second person, present tense, heavy imperative. First-person
plural for the company and — distinctively — **first-person plural for the
community**: "**We're all in this together**", "**When we all share mutual
respect, we all win**", "we respect each other, ourselves and the rules". The
Community Standards are written as a *collective* we that includes the reader,
which is the correct voice for a conduct code and the wrong voice for a privacy
policy (Strava switches correctly).

**Register — the most colloquial in the batch.** `We got you.` (help centre H1) ·
`A no BS network.` · `Give it a shot, you'll dig it.` · `Open, tap, go.` ·
`No takebacks!` · `(or stop for a snack)` · `Be kind out there.` ·
`Don't be spammy.` · `Say hello. Give high fives.`

Contractions throughout. Sentence fragments used as headings. One exclamation mark
found in the whole harvest (`No takebacks!`), and it is on the lowest-stakes
possible statement.

**The register gradient is steep and correctly directed.** Marketing and community
copy are colloquial; the help centre is neutral and procedural; the Privacy Policy
and Consumer Health Data Policy are formal and precise. The Community Standards
sit in between and are deliberately warm — they are asking for behaviour change,
not compliance.

### The Community Standards are the centrepiece `[observed]`

Three sections — **`Respect yourself`** · **`Respect each other`** ·
**`Respect the rules`** — fifteen rules total. The ordering is the finding:
**a competitive social platform's conduct code opens with duties to oneself.**

`Respect yourself`, in full order:

1. **`Staying safe is more important than being fast.`** — "Use good judgment and
   consider the risks of your activities before getting started."
2. **`Don't get distracted by your device.`** — "Focus on your surroundings…
   Use your device when it's safe to do so."
3. **`Listen to your body and take rest days to avoid injury and burnout.`** —
   "Rest and recovery are just as important as the days you push it. **Recovery
   spins, easy jogs and commutes deserve kudos, too. Remember, this is all for
   fun.**"
4. **`You have a right to keep your life private.`** — "You have control over what
   you share on Strava and can choose the settings that suit you best."

Rule 1 is a **direct contradiction of the product's own core loop**. Strava's
central feature is a leaderboard that ranks people by speed on public roads, and
the first line of its conduct code says being fast matters less than being safe.
That is the most self-aware sentence found in this entire batch of five products.

Rule 3 does three things in three sentences: names two specific harms
(**injury and burnout**), **legitimises the low-status activity type** ("Recovery
spins, easy jogs and commutes deserve kudos, too" — a direct instruction to the
reader about what to give kudos *for*), and then deflates the whole enterprise
("Remember, this is all for fun"). For a platform whose documented risk is
over-training driven by social comparison, this is the copy that does the
mitigation work, and it is placed in the conduct code where users who have been
reported are sent.

Rule 4 states privacy as a **right** in the conduct code, not just as a settings
page. And it is the only rule in the section whose subject is the reader's
entitlement rather than their obligation.

`Respect each other` contains `Be kind out there.` (offline) and
`Be kind online, too.` (on-platform) as consecutive rules, which handles the
common failure of conduct codes that only govern the app. The harassment
prohibition is specific — "We do not tolerate **bullying, ridiculing, shaming,
harassing, personal attacks**" — and **`shaming`** in that list is notable for a
fitness product, where body- and performance-shaming are the domain-specific
harms.

The hate-speech definition enumerates protected characteristics including
**`body type`** and `serious disease` and `disability` — again, domain-aware.

`Respect the rules` includes `Don't cheat.` with the line
"**If you cheated, don't put it on Strava**" — an instruction that concedes the
platform cannot detect everything and appeals to the user's own integrity. And
`Create good segments.` — "Don't make segments that trespass on private property
or jeopardize protected areas. **Be respectful of the community and others when
naming segments.**" — governs user-generated map features, which is a genuinely
unusual moderation surface.

`Respect the environment.` is an entire rule about trail preservation and litter,
in a product conduct code.

### Copy that risks encouraging unhealthy behaviour — findings in both directions

*Mitigations observed:*

1. **`Staying safe is more important than being fast.`** — rule one, against the
   product's own incentive.
2. **"Recovery spins, easy jogs and commutes deserve kudos, too."** — telling
   users what to reward, to broaden what counts as worth rewarding.
3. **"Remember, this is all for fun."**
4. **`Local Legend`** — a parallel achievement awarded for frequency
   "regardless of pace or speed", winnable by ordinary athletes, and opt-out-able.
5. **Hazardous-segment flagging** — a community mechanism that degrades a
   competitive feature for safety reasons, with an opt-in required to see the
   restricted leaderboard.
6. **`Excluded Segment Efforts`** — a neutral, non-accusatory name for a removed
   result.
7. **`Mute an Activity`** — an activity "stops appearing in your home and club
   feeds, **while it still fully counts toward your stats and goals**". A way to
   keep the training without the audience. This is the best single control in the
   product for a user who wants the data and not the comparison.
8. **`Hide Details From My Activities`** — pace, speed, calories, power and heart
   rate can each be hidden individually, with a default for future uploads. A user
   can post a run without posting a pace.
9. **`Blocking`, `muting an athlete's updates`, and a 2,000-follow cap.**
10. **Age gates**: under-13 prohibited; under-16 cannot upload heart-rate data;
    distinct privacy defaults under 18.

*Risks observed:*

1. **The product is a public leaderboard.** `chase KOMs and QOMs` is the help
   centre's own scope line. Every mitigation above is a control or a norm layered
   over a core loop that ranks people by speed on real roads. The Community
   Standards' first rule exists because the risk is real.
2. **`Sharing my Activities with my Followers: Opted in`** by default, governed by
   a **double-negative checkbox** (`Do not send these notifications`) on web only
   (T9). Outbound push about your body's performance, to other people, by default.
3. **Kudos cannot be undone.** "There is no way to 'undo' or remove kudos…
   **once it's happened, it's happened. No takebacks!**" The irreversibility is
   framed as celebratory ("just like a high five or popping the podium
   champagne"), which is charming, and it also means a user cannot withdraw social
   approval given by mistake or to someone who later harasses them. For a platform
   with documented unwanted-contact problems, an irrevocable directed social signal
   is a real gap, and the jaunty framing makes it harder to see as one.
4. **Gender setting determines leaderboard eligibility** —
   `How Does My Gender Setting Affect Strava Leaderboards?`, "determines which
   segment leaderboards and achievements, like KOM or QOM, you're eligible for".
   A binary competition structure imposed on an identity field.
5. **`Year in Sport`** is an annual quantified self-summary — the genre with
   well-documented potential to make a low-volume year feel like a failure. No
   mitigating copy was found (the only article about it explains why it is
   unavailable out of season).
6. **Six labels for "sign up"** (T3) and a `Verified` term collision (T13) — minor,
   but they are the kind of drift a 430-article help centre maintained by one to
   three writers accumulates.

**Accessibility content** `[observed]`

- **No accessibility statement was found on any surface inspected.** `[absent]`
  No WCAG reference, no VPAT, no conformance claim, no accessibility contact
  address, and no `Accessibility` link in the site footer (which carries `Privacy`,
  `Cookie Policy`, `Do Not Share My Personal Information`, `Terms`, and
  `About Our Maps`). Headspace publishes dated VPATs; Calm publishes a WCAG 2.1 AA
  statement; Oura publishes a full EU-format statement with enumerated defects.
  **Strava publishes nothing**, and it is the only product in this batch with no
  published accessibility position at all.
- `Skip to main content` is present on the Intercom-hosted help centre; **it was
  not observed in the fetched markup of the marketing site**, which is
  Strava-built.
- Accessibility-adjacent features that do exist, documented as settings:
  `How Do I Enable Dark Mode on Strava?` — "invert screen colors and **reduce
  eyestrain**, or set it to match your phone's own light or dark appearance
  setting" (the rationale is given, and OS-following is offered);
  `How Do I Change My Units of Measurement on Strava?`;
  `How Do I Enable Audio Announcements on Strava?` — real-time spoken segment and
  split cues, which is a meaningful non-visual output channel while moving, though
  it is framed as a performance feature rather than an accessibility one;
  `How Do I Change my Time and Date Format on Strava?`.
- **Alt text on the marketing site is descriptive where present** —
  "Happy woman covering her eyes from the sun, after a run.",
  "Happy woman cycling outside." — but the majority of homepage images
  (`topbar.png`, `frame.png`, `static-layer.png`, `background.jpg`) carry **empty
  or absent alt** in the fetched markup, and the Community Standards page's fifteen
  rule icons all have empty alt (defensible, since each icon sits beside its own
  heading).
- **Substantial DOM duplication on the homepage** — the entire
  `Who we are` / `Join for the tracking` / `Explore our features` /
  `Ready to give it a shot?` / `Feature highlight: Beacon` sequence renders
  **twice** in the fetched markup (responsive variants), meaning screen-reader
  users may traverse the full page content twice.
- `Explore` appears six times and `Learn more` once on the homepage with no
  distinguishing text — the same link-list problem as Calm, Oura and Fitbit.
- The help centre's **emoji-only feedback control** (`😞 😐 😃`) has accessible
  text labels (`Disappointed Reaction`, `Neutral Reaction`, `Smiley Reaction`),
  which is correct practice.

---

## Transferable patterns

1. **Publish the trial as a three-card timeline: `Today` / `2 days before` /
   `In 30 days`.** Include the reminder as a promise, and state the cancellation
   deadline in the same card as the charge. This single artefact does more
   subscription-disclosure work than any amount of terms-page prose, and it is
   directly transferable to any free trial, introductory rate, or promotional
   period that converts to a charge.

2. **Publish the default state of every privacy control, in one list.** Not how to
   change them — what they are set to. Strava's twelve-row table is the model, and
   it is the disclosure that makes every other privacy control meaningful.

3. **Disclose exposure at field level, per destination, and link to a live
   example.** "Your name, time, activity date, and activity link may appear on
   those leaderboards" — then link to a real leaderboard. "Your activity is
   public" is not a disclosure.

4. **Name what cannot be hidden, under its own heading.**
   `What Information Is Always Visible to All Strava Members?` A controls page
   that lists only the adjustable settings implies everything else is private.

5. **Open a conduct code with duties to oneself, and contradict your own
   incentive if the incentive is the risk.** "Staying safe is more important than
   being fast." · "Recovery spins, easy jogs and commutes deserve kudos, too." ·
   "Remember, this is all for fun." Condition: only credible if the product
   actually ships the controls that make it possible — Strava ships `Mute`,
   `Hide Details`, `Local Legend` opt-out, and hazardous-segment flagging.

6. **Ship a "keep the data, drop the audience" control.** `Mute an Activity`
   removes something from every feed while it "still fully counts toward your
   stats and goals". Any product with both a personal record and a social surface
   should separate the two, and should say so in those words.

7. **Explain the impossible-looking result.**
   `Can Average Speed Be Higher Than Max Speed on a Segment?` → "Yes… due to GPS
   variance." Write the article for the output the user will think is a bug, name
   it in their words, and answer yes-or-no in the first word.

8. **Give users a tool that explains why the algorithm said no, plus a manual
   appeal.** `Potential Segment Match Analysis Tool`, `Refresh My Results`. The
   same principle as a user-editable streak, applied to a competitive record.

9. **Put the caveat in the article's summary line, not just the body.**
   "…and why there is no way to undo or remove given Kudos ever", "…what happens
   to your segments, routes, clubs, and data". Users who never open the article
   still get the warning.

10. **Name the harm in the reporting article's title**, per harm — CSAM,
    deepfakes, non-consensual imagery, cyberbullying, spam, unwanted contact — and
    state the appeal route in each. A single "report abuse" article is not
    findable by the person experiencing a specific thing.

11. **Explain your content model by analogy to one the reader already has.**
    "The way you 'post' in this network is by being active." Twelve words that
    convey the feature set, the social contract, and the privacy implication at
    once.

## Caveats & gaps

- **Segment, KOM/QOM, leaderboard and Local Legend articles were read at title and
  summary level only.** The competitive-achievement copy — what a KOM notification
  actually says, how losing a KOM is worded, what the Local Legend award screen
  reads — is the single richest remaining seam and is unharvested. Several titles
  point at it (`Segment Leaderboard Guidelines`, `What's a Segment?`,
  `What Is the Local Legend Achievement on Strava?`).
- **Terms of Service and Acceptable Use Policy were not fetched.** Both are
  referenced repeatedly by the Community Standards and the enforcement articles.
- **All in-product copy is `[documented]`, not observed** — kudos button, feed
  strings, achievement notifications, privacy-settings UI labels, Beacon recipient
  view, audio announcements, empty states, error toasts. Setting *values*
  (`Everyone`/`Followers`/`Only You`) are quoted from help articles and are
  probably accurate; surrounding UI copy is not observable.
- **The `[absent]` accessibility finding is bounded to the surfaces inspected**
  (homepage, pricing, Community Standards, two legal pages, help centre). A
  statement may exist at a URL not linked from any footer read. Given that four
  footers were inspected across three properties and none carried an accessibility
  link, the finding is reasonably firm, but it is an absence-of-evidence claim.
- **The homepage DOM duplication** may be a responsive-variant artefact of the
  fetch rather than a live double-rendering. Flagged as suspected.
- **Under-18 privacy defaults were not fetched** — only that they differ. That
  article (`What Are My Privacy Control Defaults on Strava When I'm Under 18?`)
  would materially extend the T10 findings and is the most important single
  unharvested page.
- **Flyby, Global Heatmap and Strava Metro articles** were read only via the
  exposure-inventory summary. The Heatmap has its own privacy history and its own
  article (`What Are the Global Heatmap and Strava Metro?`) which was not opened.
- **The Runna acquisition** is disclosed in a help article
  (`Is Strava Acquiring Runna?`) and appears in pricing as a bundle; the
  content-integration consequences (two products, two voices, one subscription)
  are unassessed.
- **`What Is the Strava MCP Connector?`** appears in Getting Started and was not
  fetched — an AI-integration surface whose consent and data-sharing copy would be
  relevant to T10.
- **Non-English help content unharvested** across 21 locales. `kudos` in
  particular has unstable grammar in English (T13) and is a coined social term,
  which makes it the most likely translation failure point.
- **No pricing was captured for non-US markets**, though
  `Subscription Pricing FAQ` states prices vary by country.

## Sources

1. https://www.strava.com/
2. https://www.strava.com/subscribe
3. https://www.strava.com/community-standards
4. https://www.strava.com/legal/privacy
5. https://www.strava.com/legal/consumer-health-data-policy
6. https://support.strava.com/en-us/
7. https://support.strava.com/en-us/collections/19657601-getting-started
8. https://support.strava.com/en-us/collections/19657607-your-account-and-privacy
9. https://support.strava.com/en-us/collections/19657603-safety-and-security
10. https://support.strava.com/en-us/collections/19657598-clubs-challenges-and-community
11. https://support.strava.com/en-us/collections/19657604-segments-and-routes
12. https://support.strava.com/en-us/collections/19657606-subscription-and-billing
13. https://support.strava.com/en-us/articles/15401951-privacy-controls
14. https://support.strava.com/en-us/articles/15401763-what-are-my-privacy-defaults-when-i-create-a-strava-account
15. https://support.strava.com/en-us/articles/15401700-my-activities-are-set-to-everyone-where-does-that-data-go-on-strava
16. https://support.strava.com/en-us/articles/15402054-what-is-kudos
