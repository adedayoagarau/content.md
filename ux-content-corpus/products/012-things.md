# 012. Things (Cultured Code)

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | GTD-influenced personal task manager, Apple-only, one-time purchase (no subscription, no web app, no collaboration) |
| Primary URL | https://culturedcode.com/things/ |
| Corpus rank | 012 |
| Benchmark strength (source list) | Calm labels and low-friction capture |
| Locale / market observed | en (support portal has an `/en/` path segment implying other locales; none surfaced) |
| Platform observed | Web (marketing, guide, support articles, status/"Arrivals" board) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a. TLS for sync traffic stated on the Cloud page; no SOC 2, ISO, or GDPR claim on any harvested page. Payment and refunds are entirely Apple's — Cultured Code explicitly disclaims handling transactions. |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 retrieved, 4 attempted and empty |
| Harvest completeness | **Partial, and expected to be.** Things is a small indie product with no conventional help centre: the support portal index (`/things/support/`) and the legacy Desk.com portal both return empty bodies to a non-JS fetch, so the support **category tree could not be observed** and article titles were located via search rather than by browsing the IA. Several marketing sub-pages (`/things/mac/`, `/things/privacy/`) also returned empty. What *was* retrieved is unusually rich in in-product vocabulary, because the public URL-scheme documentation exposes the app's complete state and field model. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home (marketing) | https://culturedcode.com/things/ | Positioning sentence, press-quote wall; very little UI copy |
| Features ("What's new") | https://culturedcode.com/things/features/ | The main copy corpus — every coined feature name and its explanation |
| Things Guide | https://culturedcode.com/things/guide/ | Six-step onboarding narrative; the calm-register exemplar |
| Things Cloud | https://culturedcode.com/things/cloud/ | Sync value prop, offline behaviour, encryption claim |
| Pricing | https://culturedcode.com/things/pricing/ | Notable for containing **no price** |
| Support: Getting Things | https://culturedcode.com/things/support/articles/2803552/ | The real FAQ — ~15 Q&As on buying, eligibility, refunds |
| Support: Troubleshooting (index) | https://culturedcode.com/things/support/articles/3614435/ | Intro paragraph only; the list itself is client-rendered |
| Support: Troubleshooting Things Cloud Sync | https://culturedcode.com/things/support/articles/2803590/ | Nine-step diagnostic ladder + an 11-question escalation form |
| Support: Third-Party AI Tools and Things | https://culturedcode.com/things/support/articles/5510170/ | Safe/unsafe integration guidance; dated |
| Support: Things URL Scheme | https://culturedcode.com/things/support/articles/2803573/ | **The highest-value page** — exposes the full object, field, and state model |
| Status ("Arrivals") | https://culturedcode.com/status/ | Release board, not an incident board |
| *Attempted, empty body* | `/things/support/`, `/things/privacy/`, `/things/mac/`, `support.culturedcode.com/customer/en/portal/` | Recorded in Caveats |

---

## T1 Navigation & IA labels

`[partial]`. Global nav and footer were **not retrievable** — every page fetched returned body prose only, with no nav or footer markup. This is the single biggest gap in the file and it means T1 rests on inferred structure from URL paths and in-page headings rather than on observed nav labels.

**Observed section headings, which function as the features-page IA** `[observed]`

`All-New Design` · `Today and This Evening` · `Upcoming` · `Headings` ·
`Checklists` · `Magic Plus` · `Quick Find` · `Jump Start` ·
`Desktop-Class List Editing on iOS` · `Timely Reminders` · `Slim Mode` ·
`Multiple Windows` · `All the Small Things…`

Every heading is a **feature name, not a benefit**, which is the inverse of Todoist's `Made For` intent-naming. Things trusts that its coined names (`Magic Plus`, `Jump Start`, `Slim Mode`) are interesting enough to be navigation. Each heading also renders **twice** in the DOM (`All-New Design All-New Design`, `Quick Find Quick Find`) — a consistent duplication across every section, presumably a display/print pair. Flagged as a probable accessibility defect in T14.

**The app's own list IA, exposed through the URL scheme's built-in list IDs** `[documented]` — this is effectively the sidebar, published as an API enum:

`inbox` · `today` · `anytime` · `upcoming` · `someday` · `logbook` ·
`tomorrow` · `deadlines` · `repeating` · `all-projects` · `logged-projects`

Note that four of these (`tomorrow`, `deadlines`, `repeating`, `logged-projects`)
are addressable lists that the Guide never mentions — the navigable surface is
larger than the taught surface. The user-facing hierarchy taught in the Guide is
only five: `Inbox` → `Today` → `Upcoming` → `Anytime` → `Someday`, plus
`Projects` grouped under `Areas`.

**Object hierarchy** `[documented]`, four levels deep and each level named:
`Area` → `Project` → `Heading` → `To-Do` → `Checklist Item`. `Tags` cut across
all of it. This is a small, closed, fully-named object model — and every name is a
common English noun. No "workspace", "board", "item", "record", or "entity".

**Support IA** `[absent as observed]`. Article titles located via search suggest
sections including `Things Cloud`, `Using Siri with Things`, release notes per
platform, and a `Troubleshooting` hub, but the category tree itself was not
retrievable. The `Troubleshooting` index page's intro is `[observed]` and its
only rendered list content is a degraded repetition — `Minimum Requirements`
followed by the word `Requirements` five times, which is a **visible rendering
defect** where five platform links have collapsed to identical link text.

## T2 Value proposition & headline patterns

**There is no hero headline.** `[observed]` The home page opens with a single
declarative sentence and no slogan above it:

> "Things is the award-winning personal task manager that helps you plan your
> day, manage your projects, and make real progress toward your goals."

This is a **definition, not a pitch** — name, category, then a three-verb triad
escalating in time horizon (your day → your projects → your goals). Compare
Todoist's `Clarity, finally.` Things declines the emotional headline entirely on
the home page and spends its hero real estate on an introduction video link and
a wall of press quotes instead.

The second paragraph does the emotional work, and it makes a **bounded time
promise** rather than a feeling claim: summarised — within an hour you will have
everything off your mind and organised, from routine tasks to life goals, and can
focus on today. "Within the hour" is the notable move: a specific, falsifiable
setup-cost claim in place of "easy to use."

**Section headline grammar on the features page** `[observed]` — sub-headings are
short, often playful noun or imperative phrases:

`Beautiful To-Dos` · `Design Is Not an Afterthought` · `Divide and Conquer` ·
`Keep It Together` · `Quick Indeed` · `Type Travel` · `Just a Click Away` ·
`Just a Swipe Away` · `Natural Date Input` · `Insert Things Anywhere` ·
`Super Fast Multi-Select` · `Drag to Reorder` · `All Together Now` ·
`Slim but Powerful` · `It keeps getting better` · `Get Things, Get Done`

Two things stand out. `Just a Click Away` / `Just a Swipe Away` are the **same
heading forked by platform** — the Mac and iOS variants of one section, with the
verb swapped and the body text otherwise near-identical. And `Get Things, Get
Done` is a pun on the product name doubling as the closing CTA header; Things is
willing to use its name as a verb because the name is a common noun.

`Quick Indeed` is the strongest single line in the set: a two-word heading that
answers a sceptical reading of the feature name (`Quick Find`) before making the
claim. Naming your own marketing adjective and then defending it is unusual.

**The Guide's headline pattern is imperative-plus-outcome** `[observed]`:
`Gather it all in one place` · `Decide when to get started` ·
`Do bigger things with projects` · `Define yourself with areas` ·
`Establish your daily routine` · `A few tips before you go` ·
`You're ready to achieve your goals`

`Define yourself with areas` is the most ambitious claim any of these five
products makes about a UI container. An Area is a folder; the copy frames it as
identity work, and the body follows through — "There's an area for every hat you
wear" — before listing five example areas (`Family & Friends`, `Money`,
`Health`, `School`, `Career`) that between them cover a whole life rather than a
whole workflow.

## T3 CTA inventory

`[partial]` — nav CTAs unretrievable; the following are in-body.

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Watch Introduction Video` | Home, below the definition sentence | Names format + content; the primary home CTA is **watch**, not **try** |
| `Get Free Trial` | Support: Getting Things, after the pricing bullets | Placed inside the *help* article, not on the pricing page |
| `Check out our blog` | Features, end of the "It keeps getting better" block | |
| `Play` | Features and Guide, on every video/animation embed | Bare, repeated 12+ times; same defect as Todoist |
| `Requirements` | Features and pricing, per platform | Repeated four times identically with no platform in the label |
| `Price` / `view in your currency` | Features page, per platform | A CTA that admits it cannot show you the price |
| `Read the blog post` | Status board, per release | |
| `View the release notes for Mac, iPad, iPhone, Watch, or Vision` | Status board | Five destinations in one sentence, each named |
| `check here` / `here` / `these tips here` / `Learn more` | Guide and support articles, repeatedly | **The weakest link text in the corpus** — see below |
| `Contact our support team` | End of sync-troubleshooting article | Verb + object, correctly last |
| `write to our experts any time` | End of the Guide | "our experts" rather than "support" |
| `Gift Things` | Support: Getting Things | Product name as object |
| `Download your to-dos` | Support: Getting Things | User's data as the object of the verb |

**Observation — the one clear content weakness.** Where Wise almost never ships a
bare `Learn more` and Todoist never does, Things ships **`here` as link text
repeatedly**: "check out these tips here as well", "For minimum requirements,
check here", "Here's how it works", "Please check here to learn about the upgrade
process", "You can check that here", "Learn more". In the Guide and the Getting
Things article this is the dominant link pattern. For a product this attentive to
craft elsewhere, the link text is conspicuously unconsidered — and it is the kind
of defect that only shows up in a link-text audit or a screen-reader pass, never
in a visual review.

## T4 Onboarding & getting-started

**A six-step guide with a stated duration and no product screenshots as steps**
`[observed]`. The framing sentence is the notable part:

> "In about 10 minutes, this guide will teach you some valuable tricks for
> getting productive with Things – and staying that way."
> Closing line of the intro: `Let's get started!`

`In about 10 minutes` is the second bounded time claim on the site (after "within
the hour"), and `– and staying that way` pre-empts the real failure mode of task
apps: initial enthusiasm followed by abandonment. The guide's stated purpose is
**habit retention, not feature coverage.**

Steps: `Gather it all in one place` → `Decide when to get started` →
`Do bigger things with projects` → `Define yourself with areas` →
`Establish your daily routine` → `A few tips before you go` →
`You're ready to achieve your goals`.

**The guide teaches a method, not an interface.** Across six steps there is
almost no UI instruction — no "tap the + button", no menu paths. Instead each
step defines one list and states the *decision* it exists to support. Summarised:

- `Inbox` — everything lands here; the point is getting it out of your head
  immediately, before you have a plan for it
- `Today` — things you want to *start* before the day ends
- `Upcoming` — a timeline by start date, deadline, or next repeat
- `Anytime` — things you could start at any time
- `Someday` — things you might get to, reviewed periodically

Note that `Today` is explicitly defined by **start**, not by due date
("to-dos that you want to start before the day ends"). That single definitional
choice is what makes the product's temporal model coherent, and the Guide states
it in the sentence that introduces the list rather than burying it in help.

**Two pieces of behavioural advice that are not about the product at all**
`[observed]`, and which are the most quotable lines in the file:

> "Include the fun or interesting things that you'd love to do, too. If you only
> add your obligations, looking over your to-dos will become a chore."

> "Sometimes, all it takes are a few new to-dos to keep the fire of your
> long-term goal burning."

The first is a genuine insight about why task apps get abandoned, delivered as
onboarding copy. Most onboarding tells you what the product does; this tells you
how to avoid hating it in three weeks.

**The daily-routine step closes on feeling, not function** `[observed]`:
summarised — when you spend time organising Today, the day stops feeling like
something that merely happens to you; interruptions become less disruptive;
you'll be in control. Then the four-word sentence: `It's a good feeling.`

Four words, a full stop, no exclamation mark, no emoji. That restraint *is* the
"calm labels" benchmark strength in a single line.

**Progressive escalation of capability, saved for last** `[observed]`. The
`A few tips before you go` step is where the power features appear — global
capture shortcut (`Ctrl + Space` on Mac), Siri dictation, `tags` + `Quick Find`,
`headings`, calendar integration. All four are framed as optional accelerants
after the method is established, and each names the setting where it is enabled
("You can turn the feature on in Things' Settings"). Capability is sequenced
behind comprehension.

**No account, no signup, no wizard.** `[observed]` The Guide never mentions
creating an account. Things Cloud onboarding is described separately and
minimised to a single sentence: summarised — turning it on is as easy as flicking
a switch in settings and creating a free account. The strongest claim on the
Cloud page is about the *absence* of onboarding: "it's so simple, in fact, that
after turning it on, you'll never see it again." **Setup-invisibility as the
value prop.**

## T5 Form & field labels

`[documented]` via the URL-scheme reference, which is unusually valuable: because
the scheme's parameters mirror the app's fields, the public API documentation
functions as a **complete field inventory** for a product with no observable UI.

**To-do fields:** `title` · `notes` · `when` · `deadline` · `tags` ·
`checklist-items` · `list` (project or area) · `heading` · `completed` ·
`canceled`. Project fields swap `list` for `area` and add `to-dos`.

The names to note:

- **`when`** is the field name for scheduling. Not `due`, not `start date`, not
  `schedule`. A bare interrogative adverb as a field label. Its accepted values
  are equally plain: `today`, `tomorrow`, `evening`, `anytime`, `someday`, or a
  date. **The field name and the list names are the same words**, so the schedule
  control and the sidebar share one vocabulary — setting `when` to `someday`
  literally moves the item to `Someday`. Content and IA are the same system.
- **`deadline`** is a *separate* field from `when`. Same distinction Todoist
  draws between date and deadline, reached independently and with cleaner naming
  (`when` vs `deadline` is self-explaining; `date` vs `deadline` is not).
- **`notes`** rather than `description`. `checklist-items` rather than `subtasks`.
- `evening` is a first-class scheduling value alongside `today` and `tomorrow` —
  a **sub-day time bucket with no clock time**, matching the `This Evening` list.
  Very few task products model a soft intra-day boundary.

**Documented natural-language date parsing** `[documented]`, and the copy shows
it as *prefix* completion rather than full phrases:

> "It smartly detects what you're typing and figures out what you mean…
> "Tom(orrow)", "Sat(urday)", "in fou(r days)", "Au(gust 1)". As you can see, it
> jumps to all the right conclusions."

The bracket notation is doing real explanatory work: it shows the user typing
three characters and the parser supplying the rest, which is a different promise
from Todoist's "type a whole sentence and we'll extract the date." Things is
selling **keystroke economy**; Todoist is selling **grammar tolerance**. Both are
"natural language," and the copy correctly differentiates them.
`it jumps to all the right conclusions` is a pun on the feature name
(`Jump Start`) used as the proof sentence.

Note also the documented constraint: natural-language date strings passed through
the URL scheme "must be provided in English, regardless of the user's device
language" — a localisation boundary disclosed in the reference.

**Named UI surfaces and controls** `[documented]`:
`quick entry dialog` · `Quick Find` · `Jump Start popover` · `Magic Plus` ·
`Add Reminder` (a quoted button label) · `Enable` (a quoted dialog button) ·
`the barrel` (the iOS time-picker control, named informally in body copy) ·
`Inbox target` (the drop zone that appears during a Magic Plus drag) ·
`Things → Settings → General → Enable Things URLs → Manage` (the full Mac
settings path, with `Enable Things URLs` as a labelled toggle).

`the barrel` is worth flagging: informal in-body naming of a picker control, used
without definition. Charming, and unfindable in search.

## T6 Status & state language

**The state model is four states and it is fully documented** `[documented]`:

| State | Notes |
|---|---|
| `incomplete` | The implicit default; named only as the target of un-completing |
| `completed` | |
| `canceled` | **A distinct terminal state from completed** |
| `archived` | Applies to `heading` objects only |

**`canceled` as a first-class state is the single most transferable finding in
this file.** Most task managers offer done or deleted. Things models
"I decided not to do this" as a *terminal outcome with its own record*, preserved
in the `Logbook` alongside completions. The documented semantics are precise and
reveal a deliberate hierarchy:

- `canceled` **takes priority over** `completed` when both are set
- setting `completed=false` on a *canceled* to-do marks it `incomplete` — so the
  two terminal states share one reversal path
- a project cannot be completed or canceled "unless all child to-dos are
  completed or canceled and all child headings archived" — **a parent can only
  reach a terminal state once every child has reached one**, and cancelling
  counts as reaching one
- `repeating` to-dos are **excluded** from several state transitions:
  "This field cannot be updated on repeating to-dos" appears against `when`,
  `deadline`, `completed`, `canceled`, and `completion-date`. Repetition is
  modelled as a constraint on state, not just a schedule.

Content-design consequence: a user who abandons a task is not forced to choose
between lying (`done`) and erasing (`delete`). The vocabulary gives them an
honest third option, and the parent-completion rule means abandoned work doesn't
silently block a project.

**Time-state vocabulary** `[observed]`, all plain adverbs used as list names:
`Today` · `This Evening` · `Tomorrow` · `Upcoming` · `Anytime` · `Someday` ·
`Deadlines` · `Repeating` · `Logbook`.

`Anytime` and `Someday` are doing subtle and different work. Per the Guide:
`Anytime` is "home for all of the to-dos you could start at any time" —
available, unscheduled, actionable. `Someday` is "for to-dos that you might like
to get to, but you're not sure when" — deliberately parked, with an instruction
to review. **Two flavours of unscheduled, distinguished by commitment rather than
by date**, and the difference is carried entirely by two ordinary words. Most
products collapse these into one backlog.

`Someday` also appears as a *verb-ish* option in the Jump Start copy — "put
things on hold in Someday" — so the list name doubles as the name of the action
of deferring.

**`Logbook`** for completed items rather than "Done", "Completed", or "Archive".
A logbook is a record you might consult, not a bin — and the Cloud page's sync
example ("when you move 100 completed items to your Logbook") treats it as a
destination you move things *to*, an action with intent.

**Sync state** `[documented]`. The Cloud page's copy is emphatically about the
*absence* of visible state: "No buttons to fiddle with. No settings to configure.
Nothing at all to worry about." / "it just sits there, happily performing its
duties. And, dare we say: it just works." Offline is framed as automatically
self-healing rather than as a state the user manages — summarised: if there's no
connection now but there is shortly after, Things gets in sync on its own, even
with the app closed.

But the troubleshooting article reveals the state surface that does exist
`[documented]`: Things Cloud settings show whether sync is **on**, which
**account** each device is connected to, whether there is **an error message**,
and **the time of the most recent sync**. So "you'll never see it again" is a
claim about the happy path only, and the last-sync timestamp is the one piece of
state the user is asked to read when things go wrong.

**Compare Dropbox (014) and Box (015) in this corpus:** where those products
expose a rich named sync-state vocabulary, Things' explicit design goal is a sync
system with *no* user-facing state vocabulary at all. `Fastlane` is the one named
sync behaviour — a priority push channel for newly set reminders, "rather than
waiting for the next routine push." Naming a *latency tier* is unusual, and it
exists because reminders are the one case where sync delay is user-visible harm.

**Status board — named `Arrivals`, and it is a release board, not an incident
board** `[observed]`. Entries are `Fall Releases 2025` and `Refinements`, each
with a `Released` label and a date. No component list, no `Operational` /
`Degraded` vocabulary, no uptime figures. The one pointer to real status language
is in the troubleshooting article, which instructs: "check Things Cloud's status
at the top of our status board." So an incident indicator exists at the top of
`/status/` but was not rendered in the fetched HTML.

`Refinements` as a release title — for an update of "general fixes and
improvements" — is a small, characteristic choice: the word does flattering work
that "Bug fixes" would not, without actually over-claiming.

## T7 Error, failure & recovery

**The sync-troubleshooting article is a nine-step diagnostic ladder ordered by
user effort, and every step is a question or a single action** `[observed]`:

1. `Check Things Cloud's status`
2. `Check your Things Cloud settings`
3. `Restart your devices`
4. `Toggle your internet connection`
5. `Can Things access the internet?`
6. `Is cellular data enabled for Things?`
7. `Does Things Cloud work on a different network?`
8. `Run a sync test`
9. `Try disabling and re-enabling Things Cloud`

Three of nine step headings are **yes/no questions rather than instructions**,
which converts a diagnostic tree into something the user can self-triage. Step 1
is *check whether it's our fault* — the article sends the user to the status board
before asking them to do any work, which is both respectful and deflects
needless effort. The ladder then escalates strictly: settings → restart →
network toggle → network substitution → controlled experiment → nuclear option.

Within steps, the sub-questions are short and concrete:
`Is Things Cloud switched on?` · `Are all of your devices connected to the same
Things Cloud account?` · `Is there an error message?` ·
`What time does it show for the most recent sync?` ·
`Can you load a webpage in Safari?` · `Can you send an email?`

The last two are the interesting ones: **generic connectivity tests that don't
mention Things at all**, so the user can rule out the whole class of problem
without the vendor's involvement. Named third-party blockers are called out
specifically — firewall, custom DNS, VPN, `Little Snitch`, `Kaspersky Internet
Security` — the same issuer-level specificity Wise applies to card declines.
There is also a workplace-specific instruction to check with the IT department.

**`Run a sync test` — a scripted experiment the user performs and reports**
`[observed]`. Six numbered steps: same Wi-Fi on all devices, open Things, go to
`Inbox`, create a uniquely-named to-do on each device (the documented example is
`Test iPhone`), switch away and back to force a sync, then check each `Inbox`.
Then the payoff sentence, summarised: if every test to-do reached every device,
sync is fine; if not, include your findings in your email to us.

This is **support copy that turns the user into a diagnostician and tells them
what evidence to collect.** It also quietly teaches the user how sync is
triggered (switching away and back), which is undocumented state behaviour
surfaced only in the failure path.

**An 11-question escalation questionnaire, numbered, at the article's end**
`[observed]`. Under `Still experiencing issues with Things Cloud?`, the user is
asked to contact support **with** answers to eleven specific questions, opening
with:

> 1. `Where in the world are you located right now?`
> 2. `What's your Things Cloud email address?`
> 3. `On which devices are you using Things?`
> 4. `Which of these devices are experiencing issues?`

…through to `Are you seeing an error message? If so, what does it say?`

Two observations. `Where in the world are you located right now?` as question one
— before the account identifier — implies geography/CDN is the most common root
cause, and the phrasing is warm rather than bureaucratic ("where in the world"
instead of "country of residence"). And questions 5–10 are each **a check on
whether the user actually did the earlier steps** ("Did you reboot every single
device you are using Things on?", "Have you tried disabling and re-enabling
Things Cloud on each of your devices?"). The questionnaire is simultaneously an
intake form and a compliance audit of the article above it, which removes the
first two round-trips of a support conversation. Directly reusable.

**Data-loss recovery** `[observed]`, in the AI-tools article and stated without
softening:

> "We've already seen users lose data because of tools that bypassed safe
> integration methods. If you're experiencing crashes after using an unsafe
> connection method, you need to restore your to-dos from a backup."

Past-tense admission of real harm, then the single remedy, then nothing. No
"unfortunately", no apology, no reassurance. And the merge-conflict path is
quoted as an actual in-product string `[documented]`:

> "When you log back into your Things Cloud account, you may see some merge
> options. Select `Keep all to-dos (recommended)`."

`Keep all to-dos (recommended)` is the one verbatim in-product button label
recoverable in this harvest. Note what it does: at the highest-stakes moment in
the product (a merge that could destroy data), the safe option is labelled by its
*outcome* (`Keep all to-dos`) rather than by its mechanism (`Merge`, `Union`), and
`(recommended)` removes the decision. Textbook destructive-action copy.

**Capability-absence answers, stated flatly** `[observed]`. The Getting Things
article answers several questions with a bare `No.` and then an explanation:

- `Is Things a subscription?` → "No. Things is a one-time purchase, not a
  subscription."
- `Can I get a discount?` → "No." + the App Store constraint
- `Is there a bundle?` → "No." + the Watch exception
- `Can I share a list and collaborate with others?` → "No. At this time, Things
  does not support real-time sharing of to-dos or lists."
- `On which devices will Things NOT work?` → `Windows` · `Android` · `Linux` ·
  `the Internet (through a web browser)` · `any non-Apple device`

The all-caps `NOT` in a question heading is a register break from everything else
on the site, and it is deliberate: this is the question that, answered wrongly,
produces a refund request. `the Internet (through a web browser)` listed as a
*device* is a nice bit of plain-speaking — it names the thing users actually
expect and denies it in their own terms rather than saying "no web client."

`At this time` is the only hedge in the set, reserved for the one absence
Cultured Code may reverse.

**Refunds — a disclaimer of responsibility that still gives a path** `[observed]`.
Summarised: try before buying, or ask support first; if you've bought and don't
like it, Apple must refund you because Apple handles all App Store transactions
and Cultured Code cannot issue refunds itself. The structure is
prevention → escalation → jurisdiction → explicit statement of own inability.
Naming *why* it can't help ("We do not handle your purchase") is what stops this
reading as a brush-off.

## T8 Empty states

`[absent]`. No empty-state string was observed or quoted in any harvested page,
and there is no authenticated surface to inspect.

Two adjacent findings:

- **The `Inbox` is architecturally the opposite of an empty state.** The Guide
  frames an empty Inbox as the *goal* rather than a void to be filled: everything
  goes in, gets triaged daily, and leaves. The one place the copy addresses
  emptiness is the reverse-psychology line about *under*-filling — "If you only
  add your obligations, looking over your to-dos will become a chore" — which
  warns against a list that is technically full but motivationally empty. That's
  an unusual angle: the risk isn't no data, it's the wrong data.
- `[observed]` The features page describes the opened to-do as
  "a clear white piece of paper, ready for your thoughts" with detail fields
  "neatly tucked away in the corner until you need them." The blank state of the
  atomic object is treated as a designed, desirable surface — the emptiness is
  the feature. No prompt, no placeholder described, no coach mark.

## T9 Notifications & system messages

`[documented]`, thin.

- `Timely Reminders` is the feature name; `Add Reminder` is the quoted control
  label. Three documented entry paths are headed `Click` / `Type` / `Speak` (Mac)
  and `Tap` / `Type` / `Speak` (iOS) — **a three-modality pattern with one word
  per modality**, each followed by one sentence. The Siri example is quoted as a
  spoken utterance: "In Things, remind me to call John at 5 AM."
  Documenting the *wake phrase grammar* by example is the right move for voice.
- Reminders are entered as part of the `when` value (`evening@6pm`), so there is
  no separate reminder field — the notification is a property of the schedule.
- `Fastlane` (see T6) is the named delivery-priority channel for reminders, and
  the copy states its purpose in reliability terms rather than speed terms:
  to make sure all devices are up to date.
- `Mail to Things` is named in the feature roll-up as inbound email capture.
- The URL scheme documents a **rate limit** as user-facing text: "a limit of 250
  items can be added within a 10 second period" — a throttle disclosed in the
  reference rather than discovered as an error.

No toast, banner, push, or email copy observed. `[absent]` for verbatim
notification strings.

## T10 Disclosures, legal & compliance

`[observed]`, and the shape is unusual: almost nothing on privacy or compliance,
but an exceptionally strong **third-party risk disclosure**.

**A pricing page with no price** `[observed]`. The entire content is an
explanation of why:

> Heading: `App Store Pricing`
> Summarised: Cultured Code sets a price in US dollars and Apple derives the
> local price automatically; they do not set the price per country. Users are
> told to check their own App Store.
> Closing instruction: "Please check your App Store to find out how much Things
> costs in your country."

Then four platform blocks: `Mac` · `iPhone & Watch` · `iPad` · `Vision Pro`. On
the features page the equivalent control is labelled `Price` /
`view in your currency`.

This is a **disclosure in place of a disclosure** — rather than publishing a
figure that would be wrong in most markets, Things publishes the pricing
*mechanism* and hands off. It is honest and it is also a conversion hole: no
visitor can learn the cost without leaving. Worth recording as a genuine
trade-off rather than a defect, and the pattern transfers to any product whose
price is set by a platform, an intermediary, or an FX rate.

**Purchase-model disclosure, stated three times in three places** `[observed]`:
"Things 3 is a one-time purchase for each platform; there are no subscriptions."
The anti-subscription stance is the commercial position and it is restated on the
support article, the pricing logic, and the FAQ. Note the corollary disclosed
just as plainly: four separate apps must be bought separately
(`Why are there 4 apps?`), with sync free. Naming the unfavourable consequence of
your own favourable pricing model, in a question the user would ask
resentfully — and answering it with a worked example ("if you own a Mac and
iPhone, you need to purchase Things for Mac and Things for iPhone") — is good
practice.

**The AI-tools article is the standout compliance-adjacent artefact**
`[observed]`. Structure: state that the area is evolving → state that no direct
integration exists → explain that some third-party bridges are safe and some are
not → **carry a `Last Updated: 2026-04-02` date stamp** → enumerate per tool.

Per-tool verdicts, `[observed]`:
- `ChatGPT` — no direct connection; third-party services claiming otherwise
  should be avoided, because every one Cultured Code is aware of "uses unsafe
  methods that can corrupt your database and cause data loss"
- `Claude` — no direct connection, but some third-party tools work; check with
  the developer that only safe methods are used
- `Gemini` — cannot connect to apps like Things at all
- `Codex, Claude Code, OpenClaw, etc.` — many third-party MCP servers exist, of
  varying quality and safety; verify with the developer

Then a two-column `Safe connection methods` / `Unsafe connection methods` split,
with the closing rule stated as a **default-deny**:

> "Any method not listed above is not safe and can corrupt your database and
> cause data loss."
> "Writing directly to your Things database is not safe."
> "Any AI tool that asks for your Things Cloud credentials is not safe. Never
> share your credentials with a third party."

Four features worth stealing. (1) **Default-deny phrasing** — an allowlist plus
"anything not on this list is unsafe", rather than a blocklist that goes stale.
(2) **A date stamp on volatile guidance**, so the reader can judge currency
themselves. (3) **Named competitors and named categories of tool**, including
ones the vendor has no relationship with. (4) A **credential-request red flag**
given as a rule the user can apply to a tool the vendor has never seen —
teaching a heuristic rather than maintaining a list.

The closing `A note on data privacy` section is the cleanest short statement of
AI data-sharing risk in the corpus, summarised: when an AI tool reads or writes
your to-dos it can access their contents, which means you are sharing that data
with a third-party provider, so review its privacy policy first. Note the
phrasing puts the *user* as the party doing the sharing — "you are sharing that
data" — which is both accurate and quietly places the decision with them.

**Security claim** `[observed]`, one sentence on the Cloud page, summarised: all
network traffic is encrypted with current TLS so that what you do is for your
eyes only. No at-rest claim, no certification, no compliance page. `[absent]` for
GDPR, SOC 2, DPA, or sub-processor disclosure — `/things/privacy/` returned an
empty body.

**Authorisation model** `[documented]`, and it is the only permission language in
the product: URL-scheme commands that *modify* existing data require an
`auth-token` — "For security reasons… This prevents malicious links from
modifying your data." Read and create are unauthenticated; **update and delete
are token-gated**. A two-tier capability model, explained by its threat
("malicious links") rather than by its mechanism. The token is found at
`Things → Settings → General → Enable Things URLs → Manage`, and the first-run
consent is a dialog answered with `Enable`.

For contrast with Box (015): Things' entire permission vocabulary is one token and
one `Enable` button, because there is exactly one user and no sharing. The
`Can I share a list and collaborate with others?` → `No.` answer is what makes
that possible.

## T11 Help-centre architecture

`[partial — structure not observable]`. The support portal index returns an empty
body without JavaScript, and the legacy Desk.com portal
(`support.culturedcode.com/customer/en/portal/`) likewise. **The category tree
could not be observed and is not reconstructed here.**

What is observable:

- **URL grammar:** `/things/support/articles/<numeric-id>/` — opaque numeric IDs,
  no slugs. Article URLs carry no human-readable information, which is a
  findability and link-sharing weakness (compare Todoist's
  `use-task-quick-add-in-todoist-va4Lhpzz`).
- **Article-title grammar**, from the titles located: `Getting Things` ·
  `Troubleshooting` · `Troubleshooting Things Cloud Sync` ·
  `Troubleshooting Things on Apple Watch` · `Things URL Scheme` ·
  `Third-Party AI Tools and Things` · `Creating a New Things Cloud Account` ·
  `Logging In To Your Things Cloud Account` ·
  `Mac Release Notes` / `iPhone Release Notes` / `iPad Release Notes`.
  Two shapes dominate: **gerund phrases** (`Getting Things`,
  `Creating a New Things Cloud Account`, `Logging In To Your Things Cloud
  Account`) and **bare noun topics** (`Things URL Scheme`). No question-form
  titles, and no first-person titles. `Getting Things` is a pun-title for the
  purchasing article.
- **The `Troubleshooting` hub is a hub of hubs** — its own intro says so,
  summarised: Cultured Code hopes Things performs well but you might run into an
  issue; check the pages below; most problems resolve quickly by following the
  steps. Two useful register notes: it **names its own fallibility in the first
  clause** ("Even though we hope that Things always performs well for you"), and
  it sets an expectation of quick resolution before the user starts. Both are
  cheap confidence moves at the top of a failure path.
- **In-article structure is exemplary even though the IA is not.** The
  sync article uses numbered top-level steps, platform-forked sub-procedures
  (`Mac` / `iPad & iPhone` / `Vision` as tabs, with Vision explicitly saying
  "please follow the same steps as described in the iPad & iPhone tab above"
  rather than duplicating them), full menu paths rendered with arrows
  (`Things > Settings > Things Cloud`), and a named escalation section.
  Cross-references are scoped, not generic: "If you are having issues with Things
  on Apple Watch, please also see this page."
- **Escalation is human and is named as such** `[observed]`: the Guide closes
  "you may find the answers you're looking for in our support portal. You can
  also write to our experts any time." `our experts` and `write to` (rather than
  "contact us" / "submit a ticket") position support as correspondence with
  people. Consistent with a small team and not fakeable by a large one.

## T12 FAQs

`[observed]`. There is no FAQ *page*; the `Getting Things` support article **is**
the FAQ, organised into six named groups with question-form sub-headings. The
group labels are as informative as the questions:

`Where you can use Things` · `Try before buying` · `How to buy` ·
`Discounts and Bundles` · `Share Things with others` · `Refunds`

| # | Question (verbatim) | Group |
|---|---|---|
| 1 | On which devices can I use Things? | Where you can use Things |
| 2 | On which devices will Things NOT work? | Where you can use Things |
| 3 | Is there a demo version? | Try before buying |
| 4 | Is Things a subscription? | How to buy |
| 5 | Where can I buy Things? | How to buy |
| 6 | Why are there 4 apps? | How to buy |
| 7 | What if I have more than 1 Mac (or iPad or iPhone)? | How to buy |
| 8 | How much does Things cost? | How to buy |
| 9 | Can I get a discount? | Discounts and Bundles |
| 10 | Is there a bundle? | Discounts and Bundles |
| 11 | I'm a student. | Discounts and Bundles |
| 12 | I represent a business. | Discounts and Bundles |
| 13 | I bought the old Things 2. Is there an upgrade discount? | Discounts and Bundles |
| 14 | Can my family use Things as well? | Share Things with others |
| 15 | Can I share a list and collaborate with others? | Share Things with others |
| 16 | How do I get a refund? | Refunds |

**Structural notes.** Sixteen items, and the ordering is a purchase funnel run in
reverse-risk order: eligibility → trial → mechanics → price objections →
sharing → refund. Every single question is about **buying**, not about using —
which is the correct priority for a paid-upfront, platform-locked, four-SKU
product where the expensive support failure is a mistaken purchase.

Two items are **not questions but declarations of identity**: `I'm a student.`
and `I represent a business.` (full stops, first person). These are the
*discount-seeking* cases, and phrasing them as statements rather than
"Do you offer student pricing?" lets one entry absorb every variant of the
question. It also mirrors how users actually open a support email. This is the
Wise `I sent the wrong amount` pattern applied to commercial enquiries instead of
errors — **first-person declarative as a self-routing label** — and both answers
redirect to Apple's programmes while stating plainly "We are unable to offer
student discounts ourselves."

Answers are short, lead with a bare `Yes.` or `No.`, and only then explain.
Q5's answer is notably absolute: summarised — Things is sold exclusively through
Apple's App Store and it is not possible to buy it elsewhere. Closing a door
firmly prevents the follow-up.

Q14 vs Q15 is the sharpest pair on the page: `Can my family use Things as well?`
→ Yes (Apple Family Sharing, the *app* is shareable), immediately followed by
`Can I share a list and collaborate with others?` → No (the *data* is not).
Two adjacent questions that sound similar, disambiguated by sequence rather than
by explanation. Anticipating the near-miss question is the craft here.

No marketing-page FAQ block. `[absent]`

## T13 Terminology & glossary

| Term | Things' usage | The alternative it rejected |
|---|---|---|
| `to-do` | Always hyphenated, always lowercase in body copy. The atomic unit | "task", "item", "card" |
| `Things` | Product name is a common plural noun, enabling `Get Things, Get Done` and "every thing you do" | — |
| `Inbox` | Single capture point, "the home for tasks without projects (yet)" analogue | "Unsorted", "Capture", "Triage" |
| `Today` / `This Evening` | Two intra-day buckets; `evening` is also a `when` value | "Morning/Afternoon", a clock time |
| `Anytime` | Unscheduled but *available* | merged into a single "Backlog" |
| `Someday` | Unscheduled and *deferred*, with a review instruction | merged into a single "Backlog" |
| `Upcoming` | Timeline by start date, deadline, or next repeat | "Calendar", "Scheduled", "Agenda" |
| `Logbook` | Completed and cancelled items, framed as a record | "Done", "Completed", "Archive", "Trash" |
| `Area` | Grouping for "an ongoing ambition"; "an area for every hat you wear" | "Folder", "Category", "Workspace", "Label" |
| `Project` | Anything needing more than a single step | "List", "Epic" |
| `Heading` | Intra-project divider; can be `archived` | "Section", "Group", "Column", "Milestone" |
| `Checklist` / `checklist-item` | Sub-steps of a single to-do, max 100 | "sub-task", "sub-item" |
| `Tag` | Cross-cutting label, searchable via Quick Find | "Label", "Context" (the GTD term) |
| `when` | The scheduling field name — a bare interrogative adverb | "Due date", "Start date", "Schedule" |
| `deadline` | Separate from `when`; the external hard date | one merged "due date" |
| `canceled` | Terminal state distinct from `completed` | "deleted", "archived", "won't do" |
| `Magic Plus` | The draggable create button; "command the button where it should go" | "the + button", "FAB", "compose" |
| `Quick Find` | Type-to-navigate search | "Search", "Command palette" |
| `Type Travel` | Mac-only: start typing anywhere and be transported | "type-ahead", "instant search" |
| `Jump Start` | The date-setting popover | "Scheduler", "Date picker", "Snooze" |
| `Slim Mode` | Collapsed-sidebar focus state | "Focus mode", "Zen mode", "Compact" |
| `Progress Pies` | The per-project completion indicator | "progress bar", "percentage" |
| `Quick Move` | Move a to-do across projects with type-to-filter | "Move to…" |
| `Fastlane` | Priority push tier for reminders within Things Cloud | unnamed, or "high-priority sync" |
| `Things Cloud` | The named sync service | "sync", "iCloud sync" |
| `the barrel` | The iOS time-picker control, named only in body copy | "picker", "wheel", "spinner" |
| `Arrivals` | The status/release board's name | "Releases", "Changelog", "What's New" |
| `Refinements` | Release title for maintenance updates | "Bug fixes", "Minor improvements" |

**Three observations.**

**The vocabulary is almost entirely non-technical, and that's the whole
strategy.** Of ~28 terms above, only `Things Cloud`, `Fastlane`, and the coined
UI names are invented; everything structural (`to-do`, `Inbox`, `Today`,
`Someday`, `Area`, `Project`, `Heading`, `Checklist`, `Tag`, `Logbook`, `when`,
`deadline`) is a word a non-user already owns. There is no "workspace", no
"board", no "item", no "entity", no "workflow", no "status". Contrast Box (015) in
this corpus, where the vocabulary is the product. **Things' calm comes from
lexical restraint before it comes from visual design** — you cannot feel calm
reading words you have to learn.

**The coined names are all for *interactions*, never for objects.** `Magic Plus`,
`Jump Start`, `Type Travel`, `Quick Find`, `Quick Move`, `Slim Mode`,
`Progress Pies`, `Fastlane`. Every invented term names a gesture, a motion, or a
speed — and every noun the user manipulates keeps its ordinary name. That split
is a clean, transferable rule: **invent names for what your product does that
others don't; never invent names for things the user already has words for.**

`Logbook` deserves its own note. It is the only object-name that is a mild
reframe rather than the obvious word, and it earns it: "Done" implies finality,
"Archive" implies cold storage, "Trash" implies disposal. A logbook is a ship's
record — consulted, chronological, slightly proud. It also accommodates
`canceled` items without dissonance, which "Done" could not.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the
company, used constantly and warmly — "We poured our heart and soul into
developing Things Cloud", "we've built it so that the moment you hit a key…",
"we hope that Things always performs well for you", "Take our word for it",
"dare we say", "We love to hear it!", "We are unable to offer student discounts
ourselves." The company is a small, visible, opinionated team throughout, and the
copy never retreats into passive voice even when delivering bad news.

**Register — calm, declarative, with short sentences and generous full stops.**
The house move is a fragment run: "No buttons to fiddle with. No settings to
configure. Nothing at all to worry about." / "Let go and they'll fall into place.
Beautiful." / "As soon as you strike a key, the search is on. Magic." Three
fragments then a one-word verdict. Used repeatedly, and it is what produces the
"calm" reading: **the copy stops rather than qualifying.**

**Enthusiasm is present but reserved for interactions, not outcomes.**
`Magic` / `magical` appears at least five times (`Magic Plus`, "adds some magic
to every interaction", "feel magical", "Magic.", "worked their magic"), always
about a gesture or an animation. Exclamation marks (`Let's get started!`,
`Introducing Slim Mode!`, `Yes!`, `just add a few Headings!`,
`No problem!`, `Beautiful.`) cluster in the features page and the Guide's
openings. They are **entirely absent** from the pricing page, the FAQ answers,
the AI-safety article, and the escalation questionnaire. Same stakes-gradient as
Wise and Todoist, and more sharply observed: the AI-tools page, which reports
actual data loss, contains no exclamation mark and no adjective of any kind.

**The "calm" lexical field**, tightly held: `clarity` ("find the clarity that only
comes from knowing what to do next", "The concepts are clearer", "the plan
becomes perfectly clear"), `off your mind` (twice), `no distractions`,
`cut out distractions`, `neatly organized`, `nice, clean structure`,
`tidy, relevant list`, `focus`/`narrow your focus`,
`It's a good feeling.` Two metaphor families recur: **paper**
("a clear white piece of paper, ready for your thoughts") and **weight/removal**
("everything off your mind", "no matter how busy your day-to-day routine
becomes, Things has you covered").

**Register break, deliberate and worth noting.** The URL-scheme article is
written in an entirely different voice — terse, typed, precise ("Percent encoded.
Maximum un-encoded string length: 4,000 characters unless otherwise specified.",
"Takes priority over `completed`."). It opens by naming its audience ("lets pro
users and developers of other apps send commands") and then switches register
completely. One warm line survives the transition: "If you want to jump right in,
here's a little link builder tool to get you started. Enjoy!" **Audience-scoped
register, announced in the first sentence.**

**Accessibility content** `[observed]`

- **Defect:** every features-page section heading is **duplicated in the DOM** —
  `All-New Design All-New Design`, `Quick Find Quick Find`,
  `Today and This Evening Today and This Evening`,
  `What People Are Saying What People Are Saying`. Consistent across ~13
  headings, so it is structural rather than an error. Screen-reader users will
  likely hear every section title twice. The `Quick Find` section's entire body
  (`Quick Indeed`, `App-Wide Tag Search`) also appears twice, as does the
  press-quote wall between the home and features pages.
- **Defect:** `Play` is the entire accessible name for a dozen distinct
  video/animation embeds across the features page and Guide — the same defect as
  Todoist, at higher volume. On the Magic Plus section, three consecutive
  sub-features each end in a bare `Play`.
- **Defect:** `Requirements` and `Price` repeat identically four times each in
  the platform grid, with the platform name in a separate element. Flattened, the
  user gets four identical `Requirements` links.
- **Defect:** the troubleshooting index renders `Requirements` five times as its
  only list content (see T1) — five platform links collapsed to one string.
- **Defect:** `here` as link text, repeatedly (see T3). The worst instance is
  "For minimum requirements, check here."
- **Defect:** the one image with retrievable alt is
  `![](/frozen/2018/03/things-url-scheme-robot.png)` — **empty alt on a
  meaningful illustration** in the URL-scheme article, with the filename carrying
  the only description.
- **Good:** the URL-scheme article names the exact keyboard and menu paths for
  every platform, and the sync article gives numbered, single-action steps with
  full menu arrows — highly usable non-visually.
- **Good:** keyboard-first navigation is a marketed feature, not an
  afterthought: `Type Travel` (type anywhere to navigate), `Ctrl + Space` global
  capture, "excellent collection of keyboard shortcuts" in the press quotes, and
  the roll-up explicitly names `Dynamic Type`, `Dark Mode`, and
  `Haptic Feedback` as shipped features. Dynamic Type support is the single most
  significant accessibility feature named anywhere in this file.
- **Good:** platform-forked instructions are genuinely forked rather than
  conditionalised in one paragraph, and the Vision variant *cross-references*
  rather than duplicating — less text to mis-read.
- Reading level is low throughout. Sentences are short. Jargon is near-zero
  outside the developer article.

**Negative findings, recorded honestly**

1. Section headings and some whole sections duplicated in the DOM across the
   features page (≈13 instances).
2. `here` / `check here` / `Learn more` as the dominant link-text pattern in the
   Guide and the Getting Things article.
3. `Play` as the sole label on a dozen media embeds; `Requirements` and `Price`
   each repeated four times without platform.
4. The `Troubleshooting` index renders `Minimum Requirements` followed by
   `Requirements` five times — a broken link list.
5. Empty `alt` on the one meaningful illustration retrievable.
6. Pricing page contains no price by design; the user cannot learn the cost
   without leaving the site (a stated trade-off, not an oversight).
7. `Get Free Trial` — the trial CTA — lives in a support article, not on the
   pricing or home page. The trial is also described two ways:
   `Is there a demo version?` / "our 15-day free trial". `demo version` is a
   dated term the product doesn't use elsewhere.
8. Support article URLs are opaque numeric IDs with no slug.
9. `Arrivals` as the name of the status board is un-guessable and does not
   mention status; the troubleshooting article calls the same thing
   "our status board". Two names.
10. `/things/support/`, `/things/privacy/`, and `/things/mac/` return empty
    bodies to a plain fetch, so the support IA and the privacy policy are
    effectively invisible to non-JS clients and to search-engine-style crawlers.
11. The features page is still framed as "What's new in the all-new Things?" and
    "All of the above shipped with Things 3.0" — the primary feature page is
    written as a *launch* page for a release that is now years old, with newer
    work relegated to a closing paragraph and a blog link.

---

## Transferable patterns

1. **Model "I decided not to do this" as a first-class terminal state.**
   `canceled` alongside `completed`, both landing in the `Logbook`, with
   cancellation counting toward a parent's completion. Gives users an honest exit
   that is neither a lie nor a deletion, and prevents abandoned work from
   blocking a project. Transfers to any workflow with an abandon path —
   applications, disputes, onboarding funnels, KYC cases. Condition: you need a
   retrievable record for it to land in, or cancelling just feels like deleting.
2. **Two flavours of "unscheduled", distinguished by commitment.** `Anytime`
   (available, actionable) vs `Someday` (parked, review later). Two ordinary words
   carry a distinction most products lose in a single "Backlog". Applies wherever
   a backlog silently mixes "ready" with "maybe never."
3. **Name the schedule field with an interrogative — and reuse its values as the
   IA.** `when`, whose accepted values (`today`, `evening`, `anytime`, `someday`)
   are exactly the sidebar list names. The control and the navigation share one
   vocabulary, so scheduling an item and filing it are the same act. Cheap
   coherence, and it eliminates a whole class of "where did it go?" support
   question.
4. **Invent names for interactions, never for objects.** `Magic Plus`,
   `Jump Start`, `Type Travel`, `Fastlane` — all gestures, motions, or speeds.
   Every noun the user manipulates keeps its ordinary English name. A clean rule
   for deciding when a coined term is earned. The corollary is the calm: users
   can't feel relaxed reading words they have to learn.
5. **A support article that turns the user into a diagnostician.** Order steps by
   ascending user effort; lead with "check whether it's our fault"; include
   generic, vendor-free tests (`Can you load a webpage in Safari?`); then a
   scripted experiment with a named artefact (`Test iPhone`) and an instruction to
   report the findings. Directly reusable for payment-failure and
   connectivity-failure flows.
6. **Close an escalation path with a numbered intake questionnaire that also
   audits the steps above.** Eleven questions, opening with the most diagnostic
   one (`Where in the world are you located right now?`), with six items
   confirming the user actually performed the earlier remedies. Removes two
   round-trips from every ticket. Condition: keep it warmly phrased, or it reads
   as gatekeeping.
7. **Label a destructive-choice option by its outcome and mark the safe default.**
   `Keep all to-dos (recommended)` at a merge conflict — outcome not mechanism,
   plus an explicit recommendation that removes the decision. The template for any
   irreversible dialog.
8. **Default-deny safety guidance with a date stamp and a teachable heuristic.**
   An allowlist of safe integration methods, "anything not listed is not safe",
   a `Last Updated` date, named third-party tools including ones you don't
   partner with, and a user-applicable red flag ("any tool that asks for your
   credentials is not safe"). Highly relevant to third-party and AI-agent access
   copy, where blocklists rot within weeks.
9. **First-person declarative as a self-routing FAQ label.** `I'm a student.`
   `I represent a business.` Absorbs every phrasing of a discount request into one
   entry and mirrors how users open a support email. The commercial sibling of
   Wise's `I sent the wrong amount`.
10. **Answer the near-miss question immediately after the real one.**
    `Can my family use Things as well?` (yes — the app) followed by
    `Can I share a list and collaborate with others?` (no — the data). Sequence
    does the disambiguating that no amount of explanation in one answer would.
11. **Publish the pricing mechanism when you cannot publish the price.** A
    pricing page whose entire content explains how the platform derives local
    prices, plus a `view in your currency` link. Honest, and a conversion cost —
    record it as a trade-off. Applies to marketplace, FX, and app-store-mediated
    pricing.
12. **Onboarding that teaches a method and sequences capability behind
    comprehension.** Six steps of decision-making with almost no UI instruction,
    power features deferred to a final `A few tips before you go`, a stated
    duration (`In about 10 minutes`), and a stated goal of *retention*
    ("– and staying that way"). Plus the retention insight itself: tell users to
    add things they *want* to do, or the list becomes a chore.

## Caveats & gaps

- **The support-portal IA is genuinely not observable.** `/things/support/`,
  `support.culturedcode.com/customer/en/portal/`, and
  `ww.culturedcode.com/things/support/` all returned empty bodies to a plain
  fetch. Article titles in T11 were located by search, **not** by browsing a
  category tree, so T11 describes title grammar but **does not reconstruct the
  category hierarchy** — that would be invention. An authenticated or
  JS-rendering pass is required.
- **Global nav and footer labels were not retrieved on any page.** T1 is
  therefore built from in-page headings and URL-scheme list IDs rather than from
  nav labels. Any claim about Things' top-level navigation should be re-verified.
- **`/things/privacy/` and `/things/mac/` returned empty bodies.** No privacy
  policy, data-retention, sub-processor, or per-platform marketing copy was
  harvested. T10's privacy coverage is limited to one TLS sentence on the Cloud
  page and the AI article's closing note.
- **Every in-product string except one is `[documented]`, and most are inferred
  from an API reference rather than quoted as UI.** The URL scheme's field and
  state names (`when`, `deadline`, `completed`, `canceled`, `archived`) are
  *parameters*, and while they almost certainly mirror the UI labels, they are not
  proof of the visible label text. The only verbatim in-product UI string
  recovered is `Keep all to-dos (recommended)`, plus the quoted controls
  `Add Reminder`, `Enable`, and `Enable Things URLs`. T8 has no string at all.
- **`Ramble`-equivalent gaps:** `Progress Pies`, `Quick Move`, and `the barrel`
  are named once each with minimal explanation; `Fastlane` is described but its
  user-visible surface (if any) is unknown.
- **No public design system, brand voice guide, or content style guide found.**
  Cultured Code publishes a blog but no content guidance surfaced. T14 is
  reconstructed from observed copy.
- **No incident-communication language harvested.** `/status/` rendered only the
  release/"Arrivals" list; the sync article confirms a Things Cloud status
  indicator exists "at the top of our status board" but it was not in the fetched
  HTML. Compare Todoist and Dropbox, where incident vocabulary was observable.
- **Release notes, Siri/Shortcuts, Apple Watch, import/migration, and Family
  Sharing articles unharvested** — each likely carries error and state language.
- **Price, trial length, and platform requirements** are all deferred to the App
  Store, so no price-disclosure copy exists to assess beyond the mechanism
  explanation.
- **Press quotes are third-party editorial** reproduced by Cultured Code. They are
  summarised or referenced here, not quoted at length, and none is treated as
  Things' own voice.
- **Thinner than a full-corpus file by design, and honestly so.** Things has no
  help centre in the usual sense, no pricing figures, no compliance surface, no
  collaboration model, and no incident board. Eight of fourteen categories carry
  real extracted content; T8 is `[absent]`, and T1, T3, T11, T12 are partial. That
  is the accurate picture of a two-person-scale product's public content surface,
  not a harvesting failure — except for the support IA, which is a genuine
  retrieval failure and is flagged as such.

## Sources

1. https://culturedcode.com/things/
2. https://culturedcode.com/things/features/
3. https://culturedcode.com/things/guide/
4. https://culturedcode.com/things/cloud/
5. https://culturedcode.com/things/pricing/
6. https://culturedcode.com/things/support/articles/2803552/ (Getting Things)
7. https://culturedcode.com/things/support/articles/3614435/ (Troubleshooting)
8. https://culturedcode.com/things/support/articles/2803590/ (Troubleshooting Things Cloud Sync)
9. https://culturedcode.com/things/support/articles/5510170/ (Third-Party AI Tools and Things)
10. https://culturedcode.com/things/support/articles/2803573/ (Things URL Scheme)
11. https://culturedcode.com/status/ (Arrivals)

Attempted, empty body — recorded as gaps, not as blocked domains:
12. https://culturedcode.com/things/support/
13. https://culturedcode.com/things/privacy/
14. https://culturedcode.com/things/mac/
15. https://support.culturedcode.com/customer/en/portal/
