# 190. Calendly

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Meeting scheduling / availability and booking automation (SaaS) |
| Primary URL | https://calendly.com/ |
| Corpus rank | 190 |
| Benchmark strength (source list) | Scheduling constraints and confirmation |
| Locale / market observed | en-US (help centre footer offers a language switcher labelled `English` only) |
| Platform observed | Web (desktop), help centre; help articles carry `Desktop` / `Mobile app` tab variants |
| Auth state | Unauthenticated public surfaces only. No account created, no meeting booked. |
| Regulatory posture | n/a for the product surface. Privacy-adjacent links only: `Privacy Policy`, `Your Privacy Choices`, `Cookie Settings`, `Data Storage and International Data Transfers` |
| Harvest date | 2026-09-22 |
| Pages inspected | 8 |
| Harvest completeness | Partial — the invitee-facing booking page itself was deliberately not exercised (no meeting booked), so the confirmation screen and the invitee cancel/reschedule screens are `[documented]` only. `calendly.com/help/how-to-cancel-a-meeting`, `.../how-to-reschedule-a-meeting`, `calendly.com/help/event-types` and `www.calendlystatus.com` were unretrievable during this pass (fetch-layer deduplication returned "already fetched" without a body); recorded in Caveats. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://calendly.com/ | Hero, product-suite framing, four-stage lifecycle, customer-story stats, footer CTAs |
| Pricing | https://calendly.com/pricing?ref=corpus | Four plans, seat definition, feature-comparison matrix, seven-question FAQ |
| Help: fine-tune availability | https://calendly.com/help/how-to-fine-tune-your-availability-settings | The single richest source of availability-rule labels |
| Help: Time Zones overview | https://calendly.com/help/time-zones-overview | Timezone detection, DST, timezone locking; two typos found here |
| Help: troubleshoot unavailable times | https://calendly.com/help/how-to-troubleshoot-unavailable-times-that-should-be-available | 19 named troubleshoot codes — the best error-taxonomy artefact in this file |
| Help: customize your event types | https://calendly.com/help/how-to-customize-your-event-types | Full primary-settings and More-options label inventory |
| Help: scheduling notifications | https://calendly.com/help/calendly-scheduling-notifications | Calendar-invitation vs email-confirmation comparison, host-notification FAQ |
| Help: add a cancellation policy | https://calendly.com/help/how-to-add-a-cancellation-policy | Cancellation-policy setting and its honest limitation note |

---

## T1 Navigation & IA labels

**Global nav — three dropdowns plus one flat link** `[observed]`

`Product` · `Solutions` · `Resources` · `Pricing`, then the action cluster
`Talk to sales` · `Log In` · `Get started for free` (and `My Account` for returning sessions).

`Product` splits into two labelled groups, **`Products`** and **`Platform`**, each entry a
name plus a short descriptor:

| Entry | Descriptor (verbatim) |
|---|---|
| `Scheduling` | "Simplified booking" |
| `Callie` `Beta` | "AI assistant" |
| `Notetaker` | "Meeting recaps and action items" |
| `Contacts` | "Relationship management tools" |
| `Payments` | "Flexible ways to get paid" |

`Platform`: `Integrations` · `Security` · `Mobile app` · `Browser extension` · `Admin controls`.

Worth noting: Calendly has renamed its own core function into a *sub-product*.
`Scheduling` is now one of five peer products, not the whole product. The nav is
the clearest evidence of that repositioning.

**`Solutions` is a three-axis matrix** `[observed]`:
`By business size` (`Individuals`, `Small business`, `Large companies`) ·
`By team` (`Sales`, `Marketing`, `Customer success`, `Recruiting`) ·
`By industry` (`Education`, `Technology`, `Financial Services`, `Professional Services`).

`Large companies` rather than "Enterprise" in the label, while the destination URL is
`/solutions/enterprise` and the pricing plan is named `Enterprise` — the friendlier
word is used for browsing, the industry word for buying.

**`Resources` splits `Get started` / `Discover` / `Support`** `[observed]`:
`Learning hub` · `Developer docs` · `Product tour` — `Blog` · `Guides & webinars` ·
`About us` · `What's new` · `Customer stories` · `Newsroom` — `Help center` ·
`Community` · `Contact us`.

**Help-centre IA — ten top-level categories, each a product area or role** `[observed]`

| Category | Sub-categories (verbatim) |
|---|---|
| `Account` | `Profile settings`, `Plans & billing`, `Analytics & reporting`, `Security & compliance`, `Account FAQs` |
| `Integrations` | `Calendar connections`, `Video conferencing`, `Embed options`, `Extensions`, `Salesforce`, `Other integrations`, `Integrations FAQs` |
| `Scheduling` | `Availability`, `Event types`, `Sharing & booking`, `Automations & notifications`, `Routing forms`, `Scheduling FAQs` |
| `Notetaker` | `Notetaker overview`, `Settings`, `Using recaps`, `Meeting data`, `Notetaker FAQs` |
| `Admins` | `Managing users`, `Teams & groups`, `Tools & settings`, `Managed events & automations`, `SCIM`, `SAML SSO`, `Admins FAQs` |
| `Callie` `Beta` | `Callie AI assistant overview`, `How to schedule with Callie over email`, `How to chat with Callie in Calendly`, `How Callie handles your data`, `Callie FAQs` |
| `Contacts` | `Contacts overview`, `Managing contacts`, `Communication tools`, `Contacts FAQs` |
| `Payments` | `Calendly + PayPal`, `Calendly + Stripe`, and three task articles, `Payments FAQs` |
| `Mobile app` | `Settings`, `Calendly mobile app overview`, `Mobile App FAQs ` |
| `Support` | `Contact support`, `Report abuse`, `Calendly community`, `Developer docs` |

**The single most reusable IA decision here: every category ends with its own FAQ leaf.**
`Account FAQs`, `Integrations FAQs`, `Scheduling FAQs`, `Notetaker FAQs`, `Admins FAQs`,
`Callie FAQs`, `Contacts FAQs`, `Payments FAQs`, `Mobile App FAQs`. FAQ is treated as a
*residual slot per category* rather than a single global page — so the catch-all question
always has a home next to its topic. Compare Wise, which uses one catch-all question
(`Is there any other information I need to know?`) inside a single FAQ block.

**Defect:** `Mobile App FAQs ` carries a trailing space in its link title attribute, and
its capitalisation (`Mobile App FAQs`) breaks the sentence-case pattern used by the other
eight (`Account FAQs`, `Scheduling FAQs`, …). Also `Mobile app` as a category vs
`Mobile App FAQs` as its child — the same noun cased two ways one level apart.

**Breadcrumbs** `[observed]`: two-level, `Help Center / <Category>`, e.g.
`Help Center / Availability`, `Help Center / Sharing & booking`,
`Help Center / Automations & notifications`, `Help Center / Event types`.
Interestingly the breadcrumb skips the `Scheduling` parent and jumps straight to the leaf
category, while the "Popular articles" cards show the full three-level path
(`Help Center / Scheduling / Availability`). Two breadcrumb depths on one page.

**Footer (help centre)** `[observed]`: `English` · `Privacy Policy` · `Legal` ·
`Status` · `Cookie Settings` · `Your Privacy Choices` · `Copyright Calendly 2026`.
`Status` is a first-class footer link on every help page.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `All the work around meetings, handled.`
> Subhead: "From AI-powered scheduling to automated meeting recaps and follow-ups, get the busywork done with fewer tools and less effort."

The headline is a **noun phrase plus a past participle**, not a verb-first imperative and
not a benefit claim. `handled.` with a full stop does the work of a promise — the sentence
is deliberately short of a subject, so the product is the implied agent. Calendly repeats
this shape throughout: `Easy scheduling ahead.`, `There's more to meetings than finding a
time.`, `Real customers. Real results.`

**The positioning move is visible in the headlines.** The old Calendly proposition was
"find a time"; every 2026 headline explicitly *demotes* that:

- `There's more to meetings than finding a time.`
- `Built for people whose work runs on meetings`
- "Meetings move you forward, but the work around them can slow you down."

This is a product doing content work to widen its own category — the headline concedes the
thing it is famous for in order to sell the thing it now also does.

**Section headers are noun-phrase claims with a section eyebrow** `[observed]`.
Each block carries a small eyebrow label (`Scheduling`, `Callie` + `Beta`, `Notetaker` +
`New`, `Payments` + `New`, `AI meeting management`, `Customer stories`,
`150+ integrations`, `Get started`) above an H2:

- `Book meetings with the world's #1 scheduling tool`
- `Introducing your 24/7 AI scheduling assistant`
- `Actionable, shareable recaps for every meeting`
- `Flexible, built-in payment tools`
- `A better way to book your meetings`
- `Meet Callie, your AI assistant`
- `Connect Calendly with your favorite tools`
- `From the first meeting to the follow-up`

The `Beta` / `New` badges sit inside the eyebrow, not on the CTA — maturity is disclosed at
the section level before the reader invests in the pitch.

**Second hero, lower on the page** `[observed]`:
`Easy scheduling ahead.` / "Join 20 million professionals who easily book meetings with the
#1 scheduling tool." The page carries **two full hero blocks with two different
propositions** — the new "all the work around meetings" one at the top and the classic
"easy scheduling" one below. Reasonable as a reposition hedge; worth flagging as a
duplicated value prop on a single page.

**Social proof is quantified per-customer, not aggregated** `[observed]`. Each customer
card leads with the metric as the heading and the quote second:
`$1,200 annual savings` · `100% attendance rate` · `75 hours saved monthly` ·
`80% reduction in booking-related emails` · `3 to 5 hours saved per week`.

One of those quotes is unusually good content evidence for the product's own pricing
feature: "Adding a booking fee didn't just reduce no-shows — it changed the tone of my
consultations."

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started for free` | Global nav, primary | |
| `Get started` | Nav (collapsed variant), pricing plan cards | **Two labels for one action** — the nav markup contains `Get startedGet started for free`, i.e. both strings ship |
| `Start for free` | Homepage mid-page and footer CTA | A **third** label for the same signup action |
| `Sign up with email` | Hero, beneath the social buttons | |
| `Sign up with Google` / `Sign up with Microsoft` | Hero, primary position | Named providers before the email route |
| `Talk to sales` | Nav, Enterprise plan card | Never "Contact sales" |
| `Log In` | Nav | Title Case with capital `I` — inconsistent with the sentence-case used everywhere else |
| `My Account` | Nav, returning sessions | |
| `Learn more` | Each homepage product block | Bare `Learn more`, repeated four times on one page, each going somewhere different |
| `View all integrations` | Integrations section | |
| `View plans` | Every help article's plan-eligibility block | |
| `Save changes` | Documented, event-type editor | |
| `Save and close` | Documented, notification and cancellation-policy editors | **Two distinct save labels** for two nested editor depths — arguably correct, since one closes a drawer |
| `More options` | Documented, bottom of the event editor | Progressive-disclosure control, named consistently across five articles |
| `+ Set buffer time` | Documented, Limits and buffers | Leading `+` glyph in the label |
| `+ Connect calendar account` | Documented, Calendar settings | Same `+` convention |
| `Preview` | Documented, event type | |
| `Troubleshoot` | Documented, bottom of the preview/live booking page | |
| `Make secret` / `Make public` | Documented, event-type overflow menu | A **toggle written as two imperative verbs** rather than one labelled switch |
| `Switch to calendar invitation` / `Switch to email confirmation` | Documented, notification editor | Same two-imperative pattern |
| `Add to website` | Documented, share menu | |
| `Copy code` | Documented, embed flow | |
| `Edit` | Documented, three-dots menus | |
| `Yes, helpful` / `Not helpful` | Foot of every help article | Asymmetric pair — the positive is a sentence, the negative is a fragment |
| `Ask Calendly Community` | `Still need help?` block | Names the destination |
| `Contact support` | `Still need help?` block, last | |
| `Was this helpful?` | Inside the `Quick answer` box, *and again* at article foot as `Was this article helpful?` | **Two feedback prompts per article**, differently worded |

**Observation.** Calendly ships `Get started`, `Get started for free`, `Start for free`
and `Sign up with email` for one conversion action across one page set. The pattern is
consistent only in *sense*, not in string. Against that, the in-product setting labels
documented in help are strikingly consistent — `More options`, `Limits and buffers`,
`Save changes` recur identically across five separate articles. **The discipline is in the
product; the drift is in marketing.** That split is itself the finding.

## T4 Onboarding & getting-started

**Signup is offered as identity-provider-first** `[observed]`:
`Sign up with Google` / `Sign up with Microsoft`, then `Sign up with email`, with the
risk-reducer appended inline rather than as a footnote: "• No credit card required".

**The four-stage lifecycle is the real onboarding narrative** `[observed]`.
Stage names are single words, all verbs or verb-phrases:

1. `Book` — "A client emails asking to meet. Share a booking link or ask Callie, your AI assistant, to find times that work for everyone."
2. `Prep`
3. `Capture`
4. `Follow up`

Each stage is illustrated with **three micro-events written as system log lines in the
present tense**, which is an unusual and effective device:

- `Book`: "Callie replies with times to meet" / "Client picks Tuesday at 2 p.m." / "Client pays $150 deposit upfront"
- `Prep`: "Contact details automatically update" / "Your client interactions are in one place" / "Callie helps you prep"
- `Capture`: "Notetaker joins and takes notes" / "You get a ready-to-share recap" / "Recap is stored in contact profile"
- `Follow up`: "Notetaker drafts a follow-up email" / "Callie finds time for the next call" / "Client pays via custom invoice"

Note `Client picks Tuesday at 2 p.m.` — a **weekday plus a lowercase-with-periods `p.m.`**,
the same absolute-date-over-duration choice the Wise exemplar flags. Also note that the
subject of each line alternates between the product (`Notetaker joins`), the user (`You get`)
and the other party (`Client pays`) — the narrative is deliberately three-actor.

**Help-article onboarding furniture** `[observed]`. Every help article opens with a fixed
five-part preamble before any prose:

1. `Table of contents` (auto-generated from the H2/H3s)
2. Breadcrumb
3. H1
4. `Updated <date>·<n> min read`
5. A `Quick answer` box — numbered steps, then `Was this helpful?`
6. Two eligibility rows: `Available to:` (`All users`) and `Plans:` (`All plans` / `All paid plans`), each with an interstitial caveat sentence and a `View plans` link

The `Quick answer` box is the strongest transferable pattern in this file. It gives the
five-step answer **above** the long-form article, so a competent user never scrolls. The
caveat lines are also honest in an unusual way: "Feature access may vary based on your
plan, when your account was created, and any add-ons." — *when your account was created*
is a legacy-grandfathering admission most products bury.

Several articles open with a **`Before you begin` disqualifier list** rather than a
prerequisites list `[observed]`, e.g. on event types: "Using managed event types?",
"Want to switch event types?", "Using the mobile app?" — each a question with the exit
route attached, including the hard "no": "You can't change one type into another (for
example, from a one-on-one to a group event)."

## T5 Form & field labels

**This is the priority section for this product, and Calendly's availability-rule labels
are the artefact.** All `[documented]` from help articles.

**Event-type editor — Primary settings**

| Label | Stated purpose (verbatim, from the help table) |
|---|---|
| `Event name` | "What invitees see as the title." |
| `Event color` | "The color used to identify the event type." |
| `Duration` | "How long the meeting lasts." |
| `Location` | "Where the meeting takes place (Zoom, phone, in person)." |
| `Availability` | "Set your date range, minimum notice, and available hours." |
| `Host(s)` | "Choose who will host the event." |

`Host(s)` with the parenthetical plural is the small tell that one-to-one and multi-host
events share a single editor. Most products would ship two labels or a dynamic one.

**Event-type editor — `More options`**

| Label | Stated purpose (verbatim) |
|---|---|
| `Description` | "Add details for invitees before the meeting." |
| `Limits and buffers` | "Add buffer time or limit how often people can book." |
| `Free/busy rules` | "Let invitees book over events on connected calendars." |
| `Booking page options` | "Customize your event link, start time increments, and time zone display." |
| `Invitee form` | "Ask invitees for info before the meeting." |
| `Payment` | "Collect payments with Stripe or PayPal (Standard plan and above)." |
| `Notifications and automations` | "Set reminders and follow-ups." |
| `Confirmation page` | "Decide what invitees see after booking." |

**Additional settings**: `Event language` — "Pick the language for your event." ·
`Event permissions` — "Choose who can view or edit the event." ·
`Secret events` — "Hide the event from your main scheduling page."

**Availability-rule labels, in full** `[documented]`

| Label | What the user sets | Example value shown in help |
|---|---|---|
| `Date-range` | Both the window *and* the notice, in one section | |
| — range dropdown | How far ahead invitees can book | "60 days" |
| `Number of days into the future` | "set how far ahead invitees can book. Choose calendar days or week days." | |
| `Within a date range` | "pick a specific time window for booking." | |
| `Indefinitely into the future` | "allow invitees to book anytime." | |
| — notice dropdown ("minimum scheduling notice") | "require a set amount of time between when someone books and when the meeting starts" | "4 hours" |
| `Start time increments` | "how often available time slots appear on your booking page" | "a 30-minute increment displays times like 9:00, 9:30, 10:00" |
| `Meeting limits` | "how many times this Event Type can be booked per day, week, or month" | |
| `+ Set buffer time` | "buffer time before and/or after the meeting" | |
| `Lock the timezone` | Under `Booking page options` | |
| `Time zone` dropdown | On a schedule, in `List view` | "You'll see the local time next to each option." |
| `Calendars to check for conflicts` | Which connected calendars block availability | |
| `Calendar to add events to` | Where new bookings are written | |
| `Include cancel and reschedule links in email invitations and reminders` | Checkbox, inside `Cancellation policy` | |
| `Cancellation policy` | Free-text section at the foot of the notification editor | |

**Three label choices worth stealing.**

1. **`Date-range` carries two unrelated constraints.** The hyphenated `Date-range` section
   holds both "how far ahead can they book" and "how little notice can they give" — a
   forward bound and a backward bound. Calling the section `Date-range` and then putting
   *minimum notice* inside it is arguably the weakest naming decision in the product,
   because the two dropdowns answer opposite questions. The help article compensates by
   giving the notice control a task-named heading (`Prevent last-minute bookings`) rather
   than a feature name. **That compensation is the pattern: when a setting sits in the
   wrong container, name the help heading after the outcome, not the control.**

2. **`Calendars to check for conflicts` vs `Calendar to add events to`.** Singular vs
   plural does real semantic work — you may read many, you write one. The labels are
   full prepositional phrases rather than nouns (`Conflict calendars` / `Default calendar`),
   and they are unambiguous as a result.

3. **`Free/busy rules` — "Choose what this meeting takes priority over."** A rules engine
   named after the calendar concept users already have (`Busy`/`Free`), with the help copy
   restating it as a priority question rather than a boolean.

**Notification setting names** `[documented]`: `Calendar invitation` and
`Email confirmation` are the two notification *types*, sitting under `Basic notifications`
inside `Notifications and automations`. The names describe **who sends it**, not what it
contains — which is exactly the distinction the article then spends a comparison table
explaining.

## T6 Status & state language

`[documented]` unless noted. No booking was made, so no confirmation screen was observed.

**Event-type visibility states** — expressed as two imperative actions, not one state name:
`Make secret` ⇄ `Make public`. The resulting state is signalled by an icon, described in
copy as "A slashed-eye icon appears next to the event name when the event is hidden."
So the *state* word is `hidden`/`secret` in prose, `Secret events` in the settings index,
and `Make secret` on the control — three forms of one concept.

**Calendar-event states borrowed wholesale from the calendar providers** `[documented]`:
`"Busy"` and `"Free"`, always in quotes in Calendly's own copy
("A "Busy" calendar event is blocking the time", "Change the event to "Free""). Calendly
deliberately does not invent its own words here; it quotes the host calendar's vocabulary.
That is a defensible decision — the user will go and change the setting in Google Calendar,
so the string must match what they will see there.

**Booking-blocked reasons are a named, enumerated state set** — see T7. These are the
closest thing Calendly has to a published state machine, and they are exposed to the user
as codes.

**Reserved / pending states** `[documented]`: `RESERVED` — "A poll or pending meeting is
holding this time." So a booking can be in a *holding* state created by a
`Meeting poll` or a `Single-use Link`, both of which are named tabs on the `Scheduling`
page. `pending meeting` is the only pending-state noun found publicly.

**Team distribution states** `[documented]`: `ROUNDROBIN` ("No host is available based on
the distribution rules") and `UNFAIR` ("Scheduling at this time would distribute meetings
unfairly between assigned hosts"). **`UNFAIR` as a machine state name is remarkable** — a
normative, moral adjective used as a system status. Most products would call this
`DISTRIBUTION_LIMIT`. Naming the state after the human consequence rather than the rule is
the single most quotable state-naming decision in this file.

**Plan / feature availability states** `[observed]` on pricing and in help:
`Always free` · `Popular plan` · `Not included` · `Optional` · `Unlimited` · `–` (en dash
used as the "not available" cell value in the comparison matrix) · `Beta` · `New`.
Using a bare `–` for absence and a spelled-out `Not included` for the same meaning in the
plan cards is an inconsistency inside one page.

**Meeting lifecycle words, from the marketing surface** `[observed]`:
`Discovery` `Scheduled` and `Meeting` `Summarized` appear as paired state chips in the
footer CTA marquee — i.e. `<event name> Scheduled` and `<noun> Summarized` as past-participle
state labels. These are marketing illustrations of in-product chips rather than confirmed
UI strings, so treat as weak evidence.

## T7 Error, failure & recovery

**The strongest category for this product.** Calendly publishes a `Troubleshoot Tool`
inside the live booking page preview whose entire output is a set of named codes, and it
documents all nineteen of them in a public article with a two-column
"What it means" / "How to fix it" grammar. `[documented]`

The codes are grouped into six named families — the grouping is itself the taxonomy:

**`Calendar sync`** — "These codes mean something in your connected calendar is blocking a time."

| Code | What it means (verbatim) |
|---|---|
| `CALENDAR` | "A "Busy" calendar event is blocking the time." |
| `NOCAL` | "Calendly can't access your calendar." |

**`Event Type settings`** — "These codes come from your event's rules."

| Code | What it means (verbatim) |
|---|---|
| `DAILY MAX` | "You've hit the daily meeting limit for that event type." |
| `DURATION` | "Not enough time for your event." |
| `MONTHLY MAX` | "You've hit the monthly meeting limit for that event type." |
| `RANGE` | "The date is outside your availability window." |
| `TOOSOON` | "The time is too soon based on your minimum notice rules." |
| `WEEKLY MAX` | "You've hit the weekly meeting limit for that event type." |

**`Calendly meetings`** — "These codes show that another Calendly meeting is blocking the time."

| Code | What it means (verbatim) |
|---|---|
| `EVENT` | "Another Calendly event of this event type is booked." |
| `GROUP` | "Group event has max attendees." |
| `OVERLAP` | "Another Calendly event is booked." |

**`Availability settings`**

| Code | What it means (verbatim) |
|---|---|
| `HOLIDAY` | "This date is marked as a holiday." |
| `MEETING LIMIT` | "A meeting limit has been reached for this host." |

**`Team scheduling`**

| Code | What it means (verbatim) |
|---|---|
| `HOST` | "One or more hosts are unavailable for a Collective event type." |
| `ROUNDROBIN` | "No host is available based on the distribution rules." |
| `UNFAIR` | "Scheduling at this time would distribute meetings unfairly between assigned hosts." |

**`Edge conditions / System exceptions`** — "These codes show special cases that stop scheduling, like buffers, past times, or reserved spots."

| Code | What it means (verbatim) |
|---|---|
| `BUFFER` | "A buffer is blocking this time." |
| `PAST` | "The selected time is in the past." |
| `RESERVED` | "A poll or pending meeting is holding this time." |

**Analysis.** Three things make this exemplary.

1. **The error is attributed to the *setting*, and the fix names the setting.** Every
   "How to fix it" cell points at a specific named control:
   "Adjust limits under **Limits and buffers** in the event editor",
   "Adjust the date range in the **Availability** section",
   "Edit holidays from your **Availability** page". The error vocabulary and the settings
   vocabulary are the same vocabulary. That is rarer than it sounds and it is why the
   troubleshoot tool works.
2. **The code names are not uniform in style and that is deliberate.** Some are single
   nouns (`CALENDAR`, `BUFFER`, `PAST`), some are abbreviations (`NOCAL`, `TOOSOON`), some
   are two-word phrases (`DAILY MAX`, `MEETING LIMIT`), and one is an adjective (`UNFAIR`).
   A consistent naming scheme would be prettier; these are more memorable and more
   searchable. `TOOSOON` in particular is what a user would type.
3. **Near-duplicate codes are kept distinct rather than merged.** `EVENT` ("another
   Calendly event **of this event type**") and `OVERLAP` ("another Calendly event") differ
   only in scope and have identical fixes. Likewise `DAILY MAX` / `WEEKLY MAX` /
   `MONTHLY MAX` / `MEETING LIMIT`. The last pair is a genuine ambiguity: `MEETING LIMIT`
   is the *host-level* limit and `…MAX` are the *event-type-level* limits, but the code
   names do not say so and only the "How to fix it" column reveals it
   ("The host must adjust the meeting limit in **their own account**").

**The mirror-image article.** Calendly ships a paired article for the opposite failure and
cross-links it from a `Note` box at the top:
"Are invitees scheduling time with you when you're busy? Learn how to resolve this."
→ `How to troubleshoot available times that should be unavailable`.
Naming both directions of the same bug as two separate articles, and linking each from the
other's first screenful, is a strong self-service routing pattern.

**Recovery framing in the FAQ** `[documented]`. The troubleshoot FAQ leads with the
counter-intuitive case in the user's own voice:
"Why is my time still not showing as available after changing a Calendly event to "free"?"
and answers by admitting the product overrides the calendar: Calendly keeps blocking times
for events it created regardless of the calendar's free/busy flag. Naming the product's own
surprising behaviour as the first FAQ is good practice.

**Delivery-failure content** `[documented]`. On notifications, the "my invitees are not
receiving the email" answer **refuses to take the blame and says why**: with calendar
invitations "Calendly is not sending those invitations to your invitees. Instead, we are
prompting your connected calendar to send these invites" and routes the user to their IT
team; with email confirmations it routes to Calendly support ("Please contact us and we
will be happy to review your logs."). Branching a single symptom into two different owners
is honest and useful; the risk is that a user who does not know which type they use bounces,
which the article pre-empts by making step one "identify whether you are using…".

## T8 Empty states

`[absent]` on the public surface. Every empty state in Calendly (no event types, no
bookings, no contacts, no recaps) sits behind authentication and none is quoted in the
help articles harvested.

The nearest public analogue is a **no-result instruction rather than a no-result message**:
"If no dates or times appear, go to the **Availability** of your event type and review your
settings." — i.e. the help text describes the empty state and supplies the recovery,
but the in-product string is not published.

## T9 Notifications & system messages

`[documented]`, and unusually well documented — Calendly publishes the *model* of its
notification system to the user, not just the settings.

**Two named notification types, compared in four tables.** `Calendar invitation`
("most common") and `Email confirmation`. The four comparison tables are each named after a
user question rather than an attribute:

- `How each one works`
- `Email addresses used`
- `How updates are handled`
- `How titles are customized`

**Key strings** `[documented]`:

- Sender: "Comes from your connected calendar account." vs "Sent from notifications@calendly.com."
- Replies: "Replies go to your calendar email." vs "Replies go to your Calendly login email, unless you set a no-reply address."
- Updates: "Yes. They're added as event guests." vs "No. They only receive a static file."
- Titles: "Yes. Title can be customized for the host and invitee's calendar event." vs "The attached ICS file cannot be customized."

The `Will invitees see updates?` row is the important one and Calendly leads the table with
a warning sentence rather than burying it: "If you need to change details like time or
location, only **calendar invitations** send updates to your invitee."

**Decision-support headings instead of a feature list** `[observed]`:
`Which notification type should you use?` → `Use calendar invitations when` /
`Use email confirmations when`, each a bulleted list of *user situations*
("You use the Outlook plug-in, iCloud, or no calendar", "You want to use a no-reply address
to hide your email"). Naming the branch by the user's circumstances rather than the
feature is the transferable move.

**Honest limits stated as plain refusals** `[documented]`:

- "At this time, you cannot turn off these email notifications." — followed by the workaround (email filters) outside the product.
- The host booking notification "Cannot be turned off".
- "You can't switch to calendar invitations if you: Use group events / Are using iCloud or the Outlook plug-in / Don't have a calendar connected"

Three flat "no"s in one article, each with the reason or the workaround attached and none
softened with an apology. Register is notably unapologetic — no "Unfortunately", no
"We're sorry".

**Reminder / follow-up copy** `[observed]` on pricing, as feature-row descriptions:
"Send reminders automatically before meetings to cut down on no-shows." and
"Send invitees to tailored confirmation pages with links, next steps, or redirects."
`no-shows` is the operative product noun (see T13).

## T10 Disclosures, legal & compliance

**Seat definition — three different wordings for one concept on one page** `[observed]`.
This is a genuine defect and worth recording in full because seat definitions are exactly
the copy that gets litigated:

- Standard: "Seats are required for users to connect calendars and **host Calendly meetings** - meeting invitees do not require a seat."
- Teams: "Seats are required for users to connect calendars and **create Calendly links to help book meetings** - meeting invitees do not require an **account or seat**."
- Enterprise: "Starts at 50 seats. Seats are required for users to connect calendars and **host Calendly meetings** - meeting invitees do not require a seat. **Available in USD only.**"

Standard and Enterprise share a wording; Teams has its own, and only Teams adds "account".
All three use a hyphen `-` where an em dash or a full stop belongs. The substantive
disclosure — **the invitee is never billable** — is correct and prominent in all three,
which is the right call; the drift is in the qualifier clause.

**Prices** `[observed]`: `Free` / `Always free`; `Standard` `$10` `/seat/mo`;
`Teams` `$16` `/seat/mo`; `Enterprise` `Starts at` `$15k` `/yr`.
Billing toggle: `Billed yearly` / `Billed monthly`, with `Save up to 20%` on the toggle and
per-plan savings badges `Save 17%` (Standard) and `Save 20%` (Teams). The displayed prices
are the yearly-billing prices; the toggle is the disclosure mechanism.

**Language-availability disclosure** `[observed]`, set apart below the plan grid:
"Notetaker and Callie are only available in English at this time." — a single-sentence
capability bound placed after the plans rather than inside them, so it applies to the
add-on regardless of tier.

**Currency bound** `[observed]`: "Available in USD only." on Enterprise only.

**The best disclosure in the file** `[documented]`, from the cancellation-policy article,
set in a `Note` box:

> "Calendly will display your cancellation policy, but it doesn't restrict cancellations or reschedules based on the policy."

The product tells you that the policy you just wrote is *decorative*. Most products would
let the user infer enforcement from the fact that they configured a policy. Stating the
gap between the displayed rule and the enforced rule, at the point of configuration, is the
single most transferable compliance-UX pattern here.

**Plan-eligibility disclosure, repeated on every article** `[observed]`:
`Available to: All users` with "Roles control which account and team settings a person can
manage. Your role may vary by organization, team, or group." and
`Plans: All plans` / `All paid plans` with "Feature access may vary based on your plan,
when your account was created, and any add-ons."

The `when your account was created` clause is the notable one — an explicit admission of
grandfathered plans in standing help furniture, not buried in a legacy-pricing FAQ.

**Footer legal set** `[observed]`: `Privacy Policy` · `Legal` · `Status` ·
`Cookie Settings` · `Your Privacy Choices` (with the California privacy-choices icon) ·
`Copyright Calendly 2026`.

## T11 Help-centre architecture

**Three levels**: ten categories → 4–7 named sub-categories each → articles. Category and
sub-category names are almost all **plural nouns or noun phrases**, never questions and
never gerunds — `Availability`, `Event types`, `Sharing & booking`, `Routing forms`,
`Managing users`, `Using recaps`, `Calendar connections`. Compare Wise, which uses gerunds
throughout (`Sending money`, `Holding money`). Calendly's IA is **object-named**; Wise's is
**activity-named**. Calendly's article titles then carry all the task language.

**Article-title grammar — four consistent shapes**

| Shape | Examples |
|---|---|
| `How to <verb> …` | `How to use buffers`, `How to set meeting limits`, `How to add a cancellation policy`, `How to fine-tune your availability settings`, `How to customize your event types`, `How to reschedule a meeting` |
| `How to troubleshoot <symptom>` | `How to troubleshoot unavailable times that should be available`, `How to troubleshoot available times that should be unavailable` |
| `<Topic> overview` | `Time Zones overview`, `Contacts overview`, `Notetaker overview`, `Embed options overview`, `Callie AI assistant overview`, `Domain Control overview` |
| `<Product> + <Partner>` | `Calendly + PayPal`, `Calendly + Stripe`, `Calendly + LinkedIn` |

The `<Topic> overview` suffix is doing real IA work: it marks the conceptual article in a
category otherwise full of task articles, so `Time Zones overview` and
`How to fine-tune your availability settings` are visibly different kinds of page.
**Defect:** `Time Zones overview` and `Domain Control overview` use Title Case for the topic
while `Contacts overview`, `Notetaker overview` and `Embed options overview` use sentence
case — the suffix is consistent, the stem is not.

**The `How to troubleshoot X that should be Y` pair** is the standout title construction.
Both articles exist, both are named by the *symptom as the user perceives it* (a time that
is wrong in one of two directions), and each links to the other in a `Note` box in the
first screenful. Symmetric symptom-naming is directly reusable anywhere a system has a
false-positive and a false-negative failure of the same rule.

**Routing furniture** `[observed]`, in order down the page: `Quick answer` (self-serve in
five steps) → eligibility rows → long-form article → `Was this article helpful?` →
`Related articles` → `Still need help?` → `Ask Calendly Community` then `Contact support`.
Community precedes support, and the block is prefaced with a reassurance rather than a
warning: "Calendly's support is available 24/7".

**A `Popular articles` block appears on every article page**, each card rendering the full
breadcrumb path *and* the article's entire `Quick answer` inline. The effect is that a
single help page ships ten complete mini-answers below the fold. Aggressive, and probably
right for a product whose top ten questions cover most traffic — but it makes every page
long and repeats the same ten `Quick answer` blocks site-wide.

## T12 FAQs

**Placement A — pricing page**, under `Frequently asked questions`, seven questions,
answers collapsed and not present in the retrieved HTML. `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What happens at the end of my trial? |
| 2 | Which plan is best for me and my team? |
| 3 | Can we try Calendly with multiple users? |
| 4 | What does the renewal process look like? |
| 5 | How do I upgrade or downgrade? |
| 6 | We're a non-profit organization, is there special pricing available? |
| 7 | What payment methods do you accept? |

Ordering: trial end → plan choice → trial-with-a-team → renewal → plan change → special
pricing → payment. The sequence is **the buyer's timeline**, not a topic grouping, and it
opens on the anxious question (what happens when the free thing stops) rather than the
sales question. Q6 is written in the **customer's first person plural** ("We're a
non-profit organization, is there special pricing available?") — the only first-person
question in the set, and it uses a comma splice.

Notable absence: no question about **cancellation or refunds**. For a seat-based
subscription that is a real gap; `How do I upgrade or downgrade?` is the closest, and
"downgrade" is not "cancel".

**Placement B — inline per article.** Several help articles carry their own
`Frequently asked questions` H2 near the foot, with the answers present in the HTML.
Verbatim questions from the troubleshoot article:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Why is my time still not showing as available after changing a Calendly event to "free"? | Calendly keeps blocking times for events it created regardless of the calendar flag; cancel/reschedule in Calendly or enable `Free/busy rules`. |
| 2 | I'm not seeing any conflicting events in my calendar. Why am I not available? | Check all-day events marked "Busy" and the extra calendars listed under `Calendar settings`. |
| 3 | Does daylight saving time affect my availability? | Handled automatically; the *time zone label* may lag even though the time is right. |
| 4 | Can I manage the availability of my teammates? | Yes, via teammate schedule management or per-event-type availability. |
| 5 | How do I set availability when working across different time zones? | Use date-specific hours; each schedule is one time zone; enter local hours and Calendly converts. |

And from the notifications article:

| # | Question (verbatim) |
|---|---|
| 1 | Can I turn off email notifications or stop receiving emails every time someone books with me? |
| 2 | My invitees are not receiving the email confirming their event with me. How can I make sure they get these emails? |
| 3 | Can I send booking confirmations from a different email address than my profile email? |
| 4 | Do hosts receive booking notifications? |

**Structural note.** Q2 in each set is written as **a statement of symptom followed by a
question** ("I'm not seeing any conflicting events in my calendar. Why am I not available?",
"My invitees are not receiving the email confirming their event with me. How can I make
sure they get these emails?"). That two-sentence shape is closer to how a user writes a
support ticket than a single interrogative would be, and it makes the FAQ searchable
against real query text. It is the Wise "first-person confession" pattern applied to FAQ
questions rather than article titles.

Answer 3 on DST is the best short answer in the set and worth noting as a model of
bounded honesty: the times are right, **the label may not be** — a product admitting a
cosmetic bug inside its own FAQ.

## T13 Terminology & glossary

| Term | Calendly's usage | The alternative it rejected |
|---|---|---|
| `invitee` | The person booking. Used relentlessly and never varied. | "attendee", "guest", "customer", "client" (the *marketing* copy does say "client" in the lifecycle narrative — register split) |
| `host` / `Host(s)` | The person being booked | "organizer", "owner" |
| `event type` | The reusable template. Capitalised inconsistently: `Event Type` in two help `Quick answer` boxes, `event type` in body copy. | "meeting type", "booking type", "service" |
| `Scheduling page` | The user's admin surface listing event types | "Dashboard", "Home" |
| `booking page` / `scheduling page` | The invitee-facing page | **Both terms are used, for different things and sometimes for the same thing** — "check your booking page", "your public scheduling page", "Landing page embed / Booking page embed". A real ambiguity. |
| `Schedule` (noun) | A named set of weekly hours, selected from a `Schedule` dropdown | "availability profile", "working hours" |
| `date-specific hours` | Per-day overrides to a schedule | "exceptions", "overrides" |
| `buffer` | Padding before/after a meeting | "travel time", "gap" |
| `minimum scheduling notice` | The backward bound | "lead time", "advance notice" |
| `start time increments` | Slot granularity | "slot interval", "step" |
| `Free/busy rules` | Whether bookings may overlap calendar events | "conflict rules", "double-booking" |
| `Meeting limits` | Caps per day/week/month | "quota", "cap" |
| `Secret event` / `Make secret` | Hidden-but-linkable event type | "private", "unlisted" |
| `Round Robin` / `round-robin` | Distribution across hosts. Cased both ways. | "load balancing", "rotation" |
| `Collective` | All-hosts-must-be-free event type | "panel", "joint" |
| `Group` | Many invitees, one host | "webinar", "class" |
| `Meeting polls` | Pick-a-time voting | "when2meet", "poll" |
| `Single-use Links` | One-booking links | "one-time link" |
| `Routing forms` | Qualify-then-book forms | "intake form", "qualifier" |
| `no-shows` | The thing reminders and deposits reduce | "cancellations", "absences" |
| `Notetaker` · `Callie` · `Contacts` · `Payments` | The four non-scheduling products | |
| `recap` | The Notetaker output | "summary", "minutes", "notes" |
| `Quick answer` | The TL;DR block in every help article | "Summary", "In short", "TL;DR" |
| `Troubleshoot Tool` | The named availability debugger | "diagnostics", "why can't they book?" |
| `seat` | The billable unit | "user", "licence" |

**Two terminology observations.**

**`invitee` is the load-bearing word and it is protected.** A scheduling product has a hard
naming problem: the second party is sometimes a colleague, sometimes a customer, sometimes a
stranger. Calendly solves it by choosing one abstract, slightly bureaucratic noun and
refusing to vary it anywhere in the product or the help centre — `Invitee form`,
`invitee questions`, `Lock the invitee's time zone`, `invitees do not require a seat`,
`screen invitees`. Marketing is allowed `client` and `people`; the product is not. That
register split is deliberate and it is the right call: in-product consistency beats
in-product warmth when the label appears in a settings tree.

**`Secret` over `Private`.** `Make secret` / `Secret events` for a link-accessible but
unlisted event type. "Private" would over-promise (the link still works for anyone who has
it); "unlisted" is accurate but jargon. `Secret` is informal, slightly playful, and
honestly conveys "hidden, not secured". The slashed-eye icon carries the same meaning.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout, first-person plural for the
company and — notably — for the *system*: "Calendly sends the details", "we adjust the
times so meetings happen at the correct local time", "we are prompting your connected
calendar to send these invites". The product is named as an actor in the third person
("Calendly detects your time zone") and the company speaks as "we" in the same paragraph.
Slightly loose, but it lets the copy assign blame precisely in the delivery-failure FAQ.

**Register.** Flat, instructional, contraction-friendly ("doesn't restrict", "can't switch",
"you'll see the local time"). Imperatives use `Select` almost exclusively for UI actions —
`Select **More options**`, `Select **Save changes**` — with `Click`, `Open`, `Expand`,
`Choose`, `Turn on` and `Go to` as the minority verbs. **Defect:** the same article mixes
`Select Troubleshoot` (Quick answer) with `Click Troubleshoot` (step 3) for one control.

**Zero exclamation marks** across all eight pages. No `Oops!`, no `Great!`, no
`Awesome`. The one place warmth appears is the support block —
"Calendly's support is available 24/7" and "Let us know so we can improve our content." —
and in the marketing lifecycle narrative. Tone flattens as the content gets more
operational, the same gradient the Wise exemplar identifies.

**Numbers as trust devices** `[observed]`: `20 million professionals`, `#1 scheduling tool`
(twice), `150+ integrations`, `$1,200 annual savings`, `100% attendance rate`,
`75 hours saved monthly`, `80% reduction in booking-related emails`,
`3 to 5 hours saved per week`, `24/7`. The customer metrics are specific and attributed to
a named person and company; the `#1` claim is unattributed and unsourced on the page.

**Time formatting** `[observed]`: `Tuesday at 2 p.m.` (weekday + lowercase periods),
`9:00, 9:30, 10:00` for increments, `4 hours` and `60 days` as constraint values,
`Updated Aug 20, 2026` and `Updated Sep 17, 2026` on articles, `·4 min read`.
The article metadata line runs the date and read-time together with a middot and **no space
before it** (`Updated Aug 20, 2026·4 min read`) on every article — a consistent
typographic defect.

**Accessibility content** `[observed]`

- Images inside help steps are referenced by numeric asset ID with **no alt text**, e.g. the three-dots and slashed-eye icons render as bare `![33336335169431]`. The surrounding sentence supplies the meaning ("the three dots in the top-right corner", "A slashed-eye icon appears next to the event name"), which is a partial mitigation, but the icons are load-bearing in the instructions.
- The hero provider buttons do carry alt text: `Google Logo`, `Microsoft Logo`.
- Customer-story photography carries genuinely descriptive, scene-level alt text: "Pua Pakele of RBL Media sitting outdoors on the grass with her dog", "Achievement First team member working with a student in a school setting", "Barking with the Bradley's co-founder walking two dogs through a grassy park". This is well above average.
- Decorative gradient and background SVGs carry empty alt — correct.
- No `Skip to content` link was found in the retrieved markup. `[absent]`
- No public accessibility statement or VPAT link was found in the footer. `[absent]`
- `Your Privacy Choices` ships with the standard California opt-out icon and is a distinct link from `Cookie Settings`.

**Negative findings, recorded honestly**

- **Typo, live:** "Each schedule in Calendly is **tired** to a single time zone" — should be "tied". On `time-zones-overview`.
- **Typo, live, in a heading:** `Setting availability across times zones` — should be "time zones". Same page. Two errors on one short article, both in the timezone content, which is precisely the content users are most likely to be confused by already.
- **Grammar:** `We're a non-profit organization, is there special pricing available?` — comma splice in a published FAQ question.
- Four labels for one signup action: `Get started`, `Get started for free`, `Start for free`, `Sign up with email`. The nav markup emits `Get startedGet started for free` — both responsive variants ship in the DOM, so a screen-reader user may hear the label twice (flagged as suspected, not confirmed).
- Two feedback prompts per help article: `Was this helpful?` (inside `Quick answer`) and `Was this article helpful?` (at the foot).
- Two breadcrumb depths on one page: `Help Center / Availability` at the top, `Help Center / Scheduling / Availability` in the Popular-articles cards.
- `Event Type` vs `event type` and `Round Robin` vs `round-robin` cased inconsistently within the same help corpus.
- `–` (en dash) and `Not included` both used for "unavailable" on the pricing page.
- `Log In` in the nav against sentence case everywhere else.
- Three different seat-definition sentences on one pricing page (T10).
- `booking page` and `scheduling page` used for overlapping referents.
- Two competing hero propositions on the homepage.

---

## Transferable patterns

1. **Publish the constraint engine as a named code set, and make the fix name the setting.**
   Calendly's nineteen troubleshoot codes work because the error vocabulary and the
   settings vocabulary are the same vocabulary — `TOOSOON` points at
   *minimum scheduling notice*, `RANGE` at `Date-range`, `BUFFER` at `Limits and buffers`.
   Transfers to any product with a rules engine the user configures and then cannot debug:
   risk rules, eligibility rules, payout schedules. Condition: only works if you are
   willing to expose the rule names in the UI as well as the docs.

2. **Name both directions of the same failure.**
   `How to troubleshoot unavailable times that should be available` and
   `…available times that should be unavailable`, each linking to the other in the first
   screenful. Any rule that can fail open or fail closed deserves two symmetric
   symptom-named articles rather than one "troubleshooting" page.

3. **State the gap between the displayed rule and the enforced rule, at configuration time.**
   "Calendly will display your cancellation policy, but it doesn't restrict cancellations
   or reschedules based on the policy." Directly applicable to any policy, limit or
   preference a user sets that the system only advertises. This is the single most
   reusable string in the file.

4. **Pick one abstract noun for the counterparty and never vary it in-product.**
   `invitee` is neither warm nor natural, and that is why it survives across
   `Invitee form`, `Lock the invitee's time zone`, `invitees do not require a seat`.
   Let marketing say `client`; do not let the settings tree say `client`. Relevant to any
   surface where one party has several real-world roles (payer/buyer/customer/recipient).

5. **Put a five-step `Quick answer` above every help article, and repeat the same
   eligibility disclosure block on all of them.** Including the unusually honest
   "Feature access may vary based on your plan, **when your account was created**, and any
   add-ons." Grandfathered entitlements are a permanent support-cost driver; saying so in
   standing furniture is cheaper than answering it per ticket.

6. **A residual FAQ leaf per category, not one global FAQ.**
   `Account FAQs`, `Scheduling FAQs`, `Payments FAQs`… gives every category a home for the
   questions that do not justify an article, and keeps the catch-all next to its topic.

7. **Name a system state after its human consequence when the consequence is the point.**
   `UNFAIR` rather than `DISTRIBUTION_LIMIT`. Use sparingly and only where the normative
   word is accurate — but where it is, it teaches the rule in one word.

8. **When a setting is in the wrong container, name the help heading after the outcome.**
   Minimum notice lives inside `Date-range`, which is semantically wrong; the help heading
   is `Prevent last-minute bookings`, which is right. A cheap mitigation for an
   information-architecture debt you cannot pay down.

## Caveats & gaps

- **No booking was made** (per brief). Every invitee-facing string — the booking page,
  the timezone selector as the invitee sees it, the confirmation screen, the
  cancel/reschedule screens, the confirmation and reminder emails — is unobserved. The
  headline claim for this product, "confirm a booking unambiguously across two timezones",
  could therefore only be assessed from the *host-side* configuration copy and the
  documented notification model. **An authenticated or invitee-side pass is required
  before using this file as precedent for confirmation copy.**
- **Four pages could not be retrieved.** `calendly.com/help/how-to-cancel-a-meeting`,
  `calendly.com/help/how-to-reschedule-a-meeting`, `calendly.com/help/event-types` and
  `www.calendlystatus.com/` all returned a fetch-layer "already fetched … re-use the
  content" response with no body during this pass, and URL variants (`?v=`, `#top`,
  trailing slash) did not defeat it. Cancellation and reschedule *task* copy is therefore
  missing; only the cancellation-*policy* setting was captured. The status page is
  unharvested, so no component names or overall-status string are recorded. These are
  fetch-tooling blocks, not site blocks — the pages are public.
- **Pricing FAQ answers not captured.** The seven questions are in server HTML; the
  answers are accordion-collapsed and were not retrieved.
- **Event-type type names** (`One-on-One`, `Group`, `Collective`, `Round Robin`,
  `Meeting Poll`) are attested here only from *references inside other articles*
  (troubleshoot codes, pricing feature rows, "for example, from a one-on-one to a group
  event"). Their exact in-product casing and the exact chooser labels are unconfirmed
  because `help/event-types` could not be opened. Treat the casing in T13 as reported
  variants, not as a canonical list.
- **Empty states are entirely absent** from the public surface and are not quoted in any
  harvested help article.
- Mobile-app strings are out of scope; help articles carry `Desktop` / `Mobile app` tab
  variants whose mobile content is client-rendered and was not retrieved.
- Only en-US was observed. The help footer offers `English` with no visible alternatives,
  and `Event language` exists as a setting, so a localised pass would likely differ.
- The homepage exceeded the fetch size limit and was read in three chunks; a small amount
  of interstitial content between chunks may not have been inspected.

## Sources

1. https://calendly.com/
2. https://calendly.com/pricing?ref=corpus
3. https://calendly.com/help/how-to-fine-tune-your-availability-settings
4. https://calendly.com/help/time-zones-overview
5. https://calendly.com/help/how-to-troubleshoot-unavailable-times-that-should-be-available
6. https://calendly.com/help/how-to-customize-your-event-types
7. https://calendly.com/help/calendly-scheduling-notifications
8. https://calendly.com/help/how-to-add-a-cancellation-policy
