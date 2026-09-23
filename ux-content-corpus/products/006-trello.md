# 006. Trello

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Kanban project boards / visual work management |
| Primary URL | https://trello.com/ |
| Corpus rank | 006 |
| Benchmark strength (source list) | Board onboarding and empty states |
| Locale / market observed | en-US (site offers 21 locales via footer selector) |
| Platform observed | Web (desktop), Atlassian Support docs, Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product copy. Certifications named in FAQ: SOC2 Type 2, ISO/IEC 27001, PCI-DSS; GDPR article in help; `Sanctioned countries` policy article |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 fetched successfully (2 further attempts blocked/empty) |
| Harvest completeness | Partial — template gallery is JS-only and returned a no-JavaScript shell; the Atlassian design-system content page returned an empty body. In-product empty states are `[documented]`, not observed |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://trello.com/ | Hero, feature nav, social proof, footer; canonical redirects to `/home` |
| Pricing | https://trello.com/pricing | Four tiers, ~50-row comparison table with tooltip glosses, 8-question FAQ |
| Support hub index | https://support.atlassian.com/trello/ | Thin four-card router; most IA lives one level down |
| Documentation index | https://support.atlassian.com/trello/resources/ | **Richest single source** — full 10-category tree with ~250 article titles |
| Guide index | https://trello.com/guide | 9-chapter onboarding curriculum |
| Guide ch.1 | https://trello.com/guide/trello-101 | Object-model definitions (board / list / card / menu) |
| Guide ch.2 | https://trello.com/guide/create-project | Setup sequence, permission role definitions, card-back anatomy |
| Status page | https://trello.status.atlassian.com/ | Component states, subscription channels, incident-log language |
| Doc: home page | https://support.atlassian.com/trello/docs/the-home-page/ | `Up Next` / `Highlights` / `Your Items` section naming |
| Doc: mark complete | https://support.atlassian.com/trello/docs/mark-a-card-as-complete/ | Completion-state vocabulary and legacy-state reconciliation |
| Doc: board limit error | https://support.atlassian.com/trello/docs/why-cant-i-create-a-board/ | Blocked-action explanation pattern |
| Doc: Power-Up error | https://support.atlassian.com/trello/docs/troubleshooting-power-ups-not-loading/ | Verbatim in-product error string |
| Template gallery | https://trello.com/templates | **BLOCKED** — client-rendered; served the no-JS fallback only |
| Atlassian content guidelines | https://atlassian.design/content/writing-style | **BLOCKED** — 200 response with empty body |

---

## T1 Navigation & IA labels

**Global nav — four items, one of which is a price** `[observed]`

`Features` · `Solutions` · `Plans` · `Pricing` · `Resources`, then
`Get Trello for free` · `Log in`.

The notable oddity: `Plans` and `Pricing` are **two separate top-level nav items**
pointing at overlapping content — `Plans` expands to a dropdown of tier pages
(`Standard`, `Premium`, `Enterprise`, plus a non-linked `Free plan` block) while
`Pricing` is a flat link to the comparison page. Recorded as a defect: the user
has no way to predict which one answers "what does it cost".

**Feature dropdown — noun-named products, each with a one-line scope** `[observed]`

| Label | Scope line (verbatim) |
|---|---|
| `Inbox` | "Capture every vital detail from emails, Slack, and more directly into your Trello Inbox." |
| `Planner` | "Sync your calendar and allocate focused time slots to boost productivity." |
| `Automation` | "Automate tasks and workflows with Trello." |
| `Power-Ups` | "Power up your teams by linking their favorite tools with Trello plugins." |
| `Templates` | "Give your team a blueprint for success with easy-to-use templates…" |
| `Integrations` | "Find the apps your team is already using or discover new ways to get work done…" |
| `MCP server` | "Connect Trello to any AI tool" |

Two patterns worth noting. First, `Power-Ups` uses its own name as the verb in
its own description ("Power up your teams… with Trello plugins") — self-glossing
a coined term at the point of first contact, while also admitting the generic
word ("plugins"). Second, `MCP server` is the only entry with **no full stop**,
suggesting it was added later against a different copy spec.

**Solutions grouping is by team, not by job-to-be-done** `[observed]`:
`Marketing teams` · `Product management` · `Engineering teams` ·
`Design teams` · `Startups` · `Remote teams` → `See all teams`.
Note the inconsistency: five are `X teams` / audience nouns, but
`Product management` is a discipline noun.

**Use-case labels carry a prefix** `[observed]`:
`Use case: Task management` · `Use case: Resource hub` ·
`Use case: Project management`. Prefixing the content type into the link label
is unusual and is doing disambiguation work against the near-identical
`Product management` solution label.

**Footer groupings** `[observed]`: `About Trello` · `Jobs` · `Apps` ·
`Contact us`, each with a scope line. `About Trello` is glossed
"What's behind the boards." — the object model leaking into brand copy.

**Help-centre top level — ten documentation categories** `[observed]`
(from the documentation index):

1. `Getting started`
2. `Using Trello`
3. `Account settings, billing, and security`
4. `Atlassian administration`
5. `Manage an Enterprise`
6. `Manage a Workspace`
7. `Troubleshooting`
8. `Trello for Android`
9. `Trello for iOS`
10. `Automation, Power-Ups, and integrations`

Each carries a scope sentence, e.g. `Using Trello` → "Create, customize, and
collaborate with others on a Trello board." and `Troubleshooting` → "Identify and
fix specific errors and common issues in Trello." Categories 4-6 are
**role-scoped** (`Manage an Enterprise`, `Manage a Workspace`), which is a
permissions-shaped IA rather than a task-shaped one; 8 and 9 are platform-scoped.
This is a three-axis taxonomy (task / role / platform) in one flat list, and the
result is that a mobile push-notification question could plausibly live in three
places.

**Breadcrumbs** `[observed]`: `Atlassian Support` → `Trello` → `Resources` →
`Using Trello` → `Add and customize cards and lists` → article. Five levels
deep, and the breadcrumb label `Resources` does not match the nav label
`Documentation` for the same node — a second label collision.

## T2 Value proposition & headline patterns

**Hero — three verbs, ascending in commitment** `[observed]`

> `Capture, organize, and tackle your to-dos from anywhere`

The triad structure (capture → organize → tackle) maps one-to-one onto the three
named products (`Inbox` → `Boards` → `Planner`), which the sub-copy then makes
explicit: "Stay organized and efficient with Inbox, Boards, and Planner." The
headline is a **verb sequence that doubles as a product map** — the user learns
the IA from the value prop.

Supporting line: "Every to-do, idea, or responsibility—no matter how small—finds
its place, keeping you at the top of your game." Note the em-dash interruption
and the reassurance clause ("no matter how small"), which is pre-empting the
objection that Trello is over-engineered for trivia.

**Section headers are playful all-caps eyebrows over feature blocks** `[observed]`:
`EMAIL MAGIC` · `MESSAGE APP SORCERY` · `WORK SMARTER` · `Trello 101` · `Hero`.

`Hero` appearing as visible text is a **defect**: an internal section/slot name
has leaked into the rendered page.

**Benefit framing is statistic-first, with attribution** `[observed]`

- "75% of organizations report that Trello delivers value to their business within 30 days."
- "81% of customers chose Trello for its ease of use."
- "74% of customers say Trello has improved communication with their co-workers and teams."

All three link to `Trello TechValidate Survey` with a distinct survey URL per
claim. Each stat sits beside a named customer quote attribution (job title +
company + logo + `Read the story`). The pattern is
**claim → third-party source link → named human → case study route** — four
layers of substantiation per benefit tile.

**Recurring inline pitch block** (repeats on every marketing page) `[observed]`:

> `Meet Trello` — "Trello makes it easy for your team to get work done… It's
> simple – sign-up, create a board, and you're off! Productivity awaits."

`Productivity awaits.` is the one piece of pure slogan copy in the set. Note the
spaced en-dash and the exclamation mark, both of which are absent from the
help-centre register.

**Pricing headline** `[observed]`: `Trello your way.` / `Trusted by millions.` /
"Explore which option is right for you." Three stacked fragments, each with a
full stop. Then the plan-selection frame: "Whether you're a team of 2 or 2,000,
Trello's flexible pricing model means you only pay for what you need."

**Guide headline** `[observed]`: `Be a Trello expert in 9 easy steps` — a
numbered-competence promise, with the chapters labelled `CHAPTER 1`…`CHAPTER 9`
and one carrying a `NEW!` badge.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Trello for free` | Global nav, primary | Product + price in four words |
| `Log in` | Global nav | |
| `Log In` | Footer | **Casing inconsistency** with nav `Log in` — same action, two strings |
| `Sign up - it's free!` | Inline email-capture blocks | Hyphen used as a dash; exclamation mark |
| `Sign up` | End of guide chapters | Bare form, no price |
| `Check out Trello` | `Meet Trello` block | Vague; destination is `/tour` |
| `Take a tour of Trello` | Free-plan card | Same destination as above, **different label** |
| `View Trello pricing` | Compare-plans block | Verb + object, fully specific |
| `Compare plans` | `WORK SMARTER` block | Shorter form of the same action |
| `See what's included` | Each pricing tier | Progressive disclosure per card |
| `Learn more about Standard` / `…Premium` / `…Enterprise` | Pricing cards | Object-specific `Learn more` — good practice |
| `Learn more` | ~6 rows inside the comparison table | **Bare `Learn more`**, relying on the table row for context |
| `Start automating` | Comparison table, automation row | Verb-first, more specific than neighbouring `Learn more` |
| `Try a template` | Comparison table, templates row | |
| `Download mobile apps` / `Download desktop app` | Comparison table | |
| `Try it today` | `Try Premium free for 14 days` card | |
| `Go to the guide` | Guide index | |
| `Next chapter` | Foot of each guide chapter | Sequential-progress CTA |
| `Go to template gallery` | Guide index | |
| `Make a suggestion` | Under `Didn't find what you were looking for?` | Feature-request route offered at end of pricing table |
| `Read the story` | Customer quote tiles | |
| `Watch video` | Hero | |
| `Browse Integrations` / `Get to know Automation` | `WORK SMARTER` tiles | `Get to know X` is an unusually soft CTA verb |
| `See all teams` / `See all use cases` | Solutions and use-case rows | |
| `Skip to main content` | Top of DOM | Accessibility |
| `Contact us` | Footer, glossed "Need anything? Get in touch and we can help." | |
| `Ask the Community` | Foot of every help article, under `Still need help?` | Community routed before support ticket |
| `Report a problem` | Status page header | Links to `/contact` |
| `Subscribe to Updates` | Status page | |
| `Try Now` | Status page banner (System Health beta) | |
| `View historical uptime.` | Status page | CTA with a terminal full stop |

**Observations.** Trello ships at least **three label pairs for one action**:
`Check out Trello` / `Take a tour of Trello`; `View Trello pricing` /
`Compare plans`; `Get Trello for free` / `Sign up - it's free!` / `Sign up`. The
`Learn more` discipline is split — specific on the pricing cards, bare inside the
comparison table. Exclamation marks appear only in acquisition CTAs and never in
help or status copy.

## T4 Onboarding & getting-started

This is the flagged strength and it is the strongest category in the file.

**Two distinct onboarding artefacts with different grammars** `[observed]`

*A. The nine-chapter guide* — chapter titles are **imperative or
learn-framed, never noun-phrase**:

1. `Learn Trello board basics`
2. `Create your first project`
3. `Onboard your team to Trello`
4. `Integrate Trello with other apps`
5. `Powerful collaboration features` ← the one exception, an adjective-noun phrase
6. `Activate different views`
7. `Automate anything in Trello`
8. `Set permissions and admin controls`
9. `Learn Trello's top tips and tricks`

Chapter 5 breaks the verb-first pattern and is also the one marked `NEW!` — new
copy entering against an established pattern without adopting it.

The sequence is worth reading as a **maturity ladder**: understand objects →
build one thing → add people → add tools → collaborate → change the view →
automate → govern → optimise. Governance (ch.8) deliberately comes *after* the
user has something worth governing, not before.

*B. In-chapter section overviews* — every chapter opens with a literal
`Section Overview` block: "In this section you will learn:" followed by the
section headings as a bullet list. Chapter 1's list is four questions
(`What is a board?` · `What is a list?` · `What is a card?` ·
`What is the board menu?`); chapter 2's is five imperatives (`Create a board` ·
`Customize your board` · `Start collaborating` · `Build a workflow` ·
`Add tasks and to-dos`).

The grammatical switch is deliberate and instructive: **chapter 1 asks questions
because the user cannot yet act; chapter 2 gives commands because they can.**
That is a register gradient tied to user capability, and it is the single most
transferable thing in this file.

**Board-creation sequence, as documented** `[observed]`

Step copy quotes the actual UI strings: `Create new board`, then "click the plus
button (+) in the Trello header", then `Create Board`. Recorded as a defect:
the same action appears as `Create new board` and `Create Board` in consecutive
sentences of the same instruction.

**Workflow-naming guidance is explicitly permissive** `[observed]`:
"List names can be as simple as steps like "To Do," "Doing," and "Done" or as
detailed as needed" — then "Trello is truly customizable to your unique needs so
just go ahead and name your lists anything you like!"

`To Do` / `Doing` / `Done` is offered as a *suggestion*, not a default. Trello
never ships a canonical status vocabulary; it ships the meta-instruction that
you invent your own. See T6 — this is the defining status-language decision of
the product.

**Onboarding scope caveat, stated up front** `[observed]`:
"This Guide is geared towards Trello Free, Trello Standard, and Trello Premium
use cases and features. If you are an enterprise, go to the Trello Enterprise
Guide." Placed in chapter 1 before any instruction, in bold — audience-bounding
before effort is spent.

**Trial framing** `[observed]`: `Try Premium free for 14 days` with the benefit
subordinated ("See your work in a whole new way with Trello views."). Duration,
price, and plan all in the heading.

## T5 Form & field labels

No authenticated forms were reachable. What is `[observed]` on public surfaces:

| Label / string | Surface | Notes |
|---|---|---|
| `Sign up - it's free!` + email input | Home page inline capture | Single-field capture |
| "By entering my email, I acknowledge the Atlassian Privacy Policy" | Under the email field | **First person for the user** ("I acknowledge"), not "You agree" — consent framed as the user's own statement |
| `Est. cost for [n] users` | Enterprise pricing card | Interpolated seat-count calculator |
| `Email address:` | Status page subscribe | Label with colon |
| `Enter OTP:` / `Resend OTP in: [n] seconds` / `Didn't receive the OTP?` | Status page subscribe | Untranslated acronym `OTP` exposed to users with no gloss — a readability defect |
| `Country code:` / `Phone number:` / `Change number` | Status page SMS subscribe | |
| `Webhook URL:` with hint "The URL we should send the webhooks to" | Status page | Hint is a first-person-plural sentence fragment |
| `Email address:` with hint "We'll send you email if your endpoint fails" | Status page webhook | Failure condition stated in the hint, not after the fact |

**Card-back field inventory, `[documented]`** from guide ch.2 — the fields a user
adds to a card: `Descriptions` · `Due dates` · `Members` · `Checklists` ·
`Attachments` · `Comments`, plus `Cover`. The edit affordance is quoted as
`Edit the description`. Date fields are named `start date` and `due date`.
Note `Add Members to cards to assign people to tasks` — the label is `Members`
but the described function is assignment, and the pricing page separately names
the capability `Assignee and due dates`. Three words (`Member`, `Assignee`,
`assign`) for one relationship.

## T6 Status & state language

The flagged strength, and the interesting finding is **how little fixed status
vocabulary Trello owns**.

**Trello has no built-in workflow statuses.** `[documented]` Status is
positional — a card's state *is* the list it sits in, and list names are
user-authored. `To Do` / `Doing` / `Done` appear only as suggested examples in
the guide. The product ships one binary state instead:

**The single first-class state: complete / incomplete** `[documented]`

- Control label: `Mark complete` (a "check circle" on card front and card back)
- Board setting: `Show complete status on card front`, under a settings group
  headed `Complete Status`
- Mobile board setting: `Completed status on card fronts`
- Filter facet: `Card status`, with values **`complete`** and **`incomplete`**
- Visual encoding: "Completed cards will have a green checkmark. Due dates for
  completed cards will also appear green."

Note the four near-variants for one concept: `Mark complete` (verb),
`Complete Status` (settings group), `Show complete status on card front` (toggle),
`Completed status on card fronts` (mobile toggle). Singular/plural and
complete/completed both drift.

**A genuine state-migration story, documented rather than hidden** `[documented]`

Trello moved from *due-date completion* to *card completion*. The doc states it
plainly: "Previously you could only mark cards with due dates as complete. Now,
cards can be marked as complete, even without a due date." And then handles the
legacy automation surface honestly:

- Old trigger `when the due date is marked complete` "will trigger when a card is
  marked as complete, even if it doesn't have a due date"
- Old action `mark the due date as complete` "will mark a card as complete, even
  if it doesn't have a due date"
- "All new automation will refer to marking a card as complete. Previous
  automations… weren't updated for you, but they'll continue to work as expected"

This is a **status-rename migration note written for users, not engineers**, and
it explicitly admits that the old strings were left in place. Compare the Wise
pattern of writing an article for the gap between system state and user reality;
Trello instead writes the article for the gap between the *old* vocabulary and
the *new* one.

**Lifecycle states for containers** `[documented]` — these are the real status
vocabulary, and they are all about disposal:

| State | Object | Article |
|---|---|---|
| `open` / `closed` | Board | "When a board is open, it can be viewed and used - when a board is closed, it's essentially archived." |
| `archived` | Card, list | `Archive or delete a card` |
| `deleted` | Card, list, board | `Archive or delete a card` |
| `reopened` | Board | `Reopen a closed board` |
| `starred` | Board | `Star a board` |
| `watched` | Card, list, board | `Watch a card, list, or board` |
| `mirrored` | Card | `Card mirroring` |
| `inactive user` | Person | `What is an inactive user?` |
| `deactivated user` | Person | `What is a deactivated user?` |
| `virtual user` | Person | `What's a virtual user?` |
| `dormant` | Account | `Dormant Trello account policy` |

The three-way `inactive` / `deactivated` / `virtual` user split each has its own
`What is…?` article, which is a tell that the distinction is not
self-explanatory from the labels. `closed` is explicitly glossed as "essentially
archived" — an admission that two words describe one state.

**Date-state language** `[documented]`, from the home-page doc: cards are
`due soon`, `recently overdue`, `overdue`, `upcoming`. The recency window is
stated in prose as concrete arithmetic: due date "not older than 2 weeks" and
"not in the future by more than 30 days", capped at "the next 20 cards".
Publishing the exact ranking rule for a feed is rare and good practice.

**Status-page component states** `[observed]`:
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`, with the incident-log past-tense variants `had a major outage.` /
`had a partial outage.` and the null states `No downtime recorded on this day.` /
`No data exists for this day.`

Overall header: `All Systems Operational`. Uptime frame: "Uptime over the past 90
days."

Note the register split: the component list uses **title-case noun phrases**
(`Partial Outage`) while the daily log uses **lower-case past-tense sentences**
(`had a partial outage.`). Same state, two grammars, one page.

## T7 Error, failure & recovery

**One verbatim in-product error string was captured** `[observed]`:

> `Unable to load Power-Up`

Trello's own doc title for it is `Unable to load Power-Up error` — the article
title is the error string plus the word "error", which is optimal for a user
pasting the string into search. The explanation structure is worth copying:

1. Name the two possible causes up front ("either the browser is timing out… or
   they may be blocked on your network")
2. Give the user a **diagnostic they can run themselves** to tell which — refresh
   and re-open the menu; consistent failure means network block, varying failure
   means timeout
3. Give a different remedy per branch (different network/browser vs. "work with
   your IT team")

That middle step — a user-executable discriminator between two causes — is the
transferable move. Most error docs list causes without telling the user how to
tell them apart.

**A second verbatim error, from the no-JS fallback** `[observed]`:

> "Your browser was unable to load all of Trello's resources. They may have been
> blocked by your firewall, proxy or browser configuration."
> "Press Ctrl+F5 or Ctrl+Shift+R to have your browser try again and if that
> doesn't work, check out our troubleshooting guide."
> `To use Trello, please enable JavaScript.`

Structure: what failed → three candidate causes → exact keystroke remedy → escape
hatch to docs. The keystroke is given for both Windows conventions but not macOS,
which is a gap.

**`Why can't I…?` as a recovery-title pattern** `[observed]` — Trello's
distinctive shape, in the user's voice but interrogative rather than confessional:

- `Why can't I create a board?`
- `Why can't I edit my Trello board?`
- `Why can't I submit a Support ticket?`
- `Why doesn't my board have upgraded features?`
- `Why Support can't grant access to your account`

The last one inverts the subject — it is `Why Support can't…`, i.e. the *system*
explaining its own refusal, with no question mark. A deliberate register shift
for a policy refusal rather than a user-fixable block.

**The blocked-action explanation, analysed** `[documented]`. `Why can't I create
a board?` leads with the invariant ("Boards must be associated with a
Workspace"), then gives the two causes as a single compound sentence
("you do not have permission… and/or your free Workspace(s) have reached their
board limits"), then routes to a *person* not a setting ("You can contact a
Workspace admin to learn more. Workspace admins can be found on the "Members"
page"). Naming the human who can unblock you, and where to find them, is the
notable choice.

The same article then uses a **first-person user exclamation as a subheading**:

> `I want more boards on the same Workspace!`

This is the closest Trello gets to the Wise confession pattern, and it is the
only exclamation mark in the help corpus observed. It is answered with both the
paid route (upgrade) and a free workaround (close unused boards, or create
another Workspace) — the free option stated last but stated.

**Troubleshooting article-title grammar — four shapes** `[observed]`

| Shape | Examples |
|---|---|
| `<Thing> isn't working` / `are not working` | `Power-Up isn't working`, `Notifications are not working` |
| `Can't <verb>` | `Can't log in or access Trello`, `Can't authenticate because localStorage is disabled` |
| `Troubleshooting <thing>` | `Troubleshooting a slow board`, `Troubleshooting two-step verification` |
| Symptom-as-sentence | `Emails sent to Trello Inbox never arrive`, `Emailed attachments show up as winmail.dat file`, `Power-Up won't authorize` |

The symptom-as-sentence shape is the strongest: `Emails sent to Trello Inbox
never arrive` is exactly what a user would report, and `never arrive` is more
honest than "may be delayed".

**Recovery articles** `[observed]`: `Recover a deleted description or card name` ·
`Recovering your Trello account` · `Recover a Workspace or board when the admin
is gone` · `Reinvite someone who didn't get their invitation email` ·
`What to do if your account is compromised`.

`Recover a Workspace or board when the admin is gone` is the standout — an
org-failure scenario (the owner left) given a first-class help article. Note the
plain word `gone` rather than "departed" or "is no longer available".

**Tense inconsistency across the troubleshooting set** `[observed]`:
`Recover a deleted description…` (imperative) sits directly beside
`Recovering your Trello account` (gerund) in the same category listing. The
category is mid-migration from gerund to imperative titles and both forms are
live.

## T8 Empty states

Flagged strength. **No empty-state string was directly observable** — all board,
list, and feed empty states are behind auth. What is `[documented]` or inferable:

**The "add" affordances that occupy an empty container** `[documented]` — Trello's
empty-state strategy is to put the creation control *in* the empty slot rather
than render a separate empty-state panel:

- `Add a card…` — quoted with a trailing ellipsis, "at the bottom of any list"
- `Add A Card` — the same control, **title-cased differently** three paragraphs
  later in the same guide chapter
- `Add a list` — "Click "Add a list" to add your first list to your board"
- `Create new board` / `Create Board` — the two labels for board creation

The ellipsis on `Add a card…` is doing placeholder work: it signals an inline
text field rather than a modal. Recorded as a defect that the same string appears
as `Add a card…`, `Add a card`, and `Add A Card` across one page.

**First-run guidance is delegated to templates, not to empty-state copy**
`[observed]`. The guide's answer to a blank board is a link:
"Need some ideas? Here's a little inspiration." → template gallery. And on the
guide index: "Give your team a blueprint for success with Trello templates: copy,
customize, and you'll be collaborating in no time!" The empty board is treated as
a **content-supply problem**, answered with six template categories
(`Project Management` · `Business` · `Sales` · `Design` · `Engineering` ·
`Marketing`), rather than as a copy problem answered with an illustration and a
headline.

There is now a third answer to the blank board, `AI-generated boards`, glossed on
the pricing page as: "Describe your goal and instantly get a personalized,
ready-to-use board to help you get started, complete with lists and cards."
Trello has three stacked first-run strategies — inline add controls, template
gallery, and generative board — and no observed empty-state *message* at all.

**Caught-up / no-data states on public surfaces** `[observed]`:

- Status page, per day: `No incidents reported today.` and `No incidents
  reported.` — **two strings for the same condition**, differing only by "today",
  stacked adjacently down the page
- Status page, per component-day: `No downtime recorded on this day.` /
  `No data exists for this day.` — a genuinely useful distinction between
  *nothing bad happened* and *we don't know*
- Status page, incident relation: `No incidents or maintenance related to this
  downtime.`
- Status page metric placeholder: `Fetching` — a bare present participle as a
  loading state, no ellipsis, no "…"

`No data exists for this day.` vs `No downtime recorded on this day.` is the best
empty-state pair in the harvest: most products collapse absence-of-problem and
absence-of-knowledge into one string, and Trello's status page does not.

**Dismissal language** `[documented]` — on the Home feed, a card can be
`dismiss`ed, glossed "which will simply remove it from this view", with the
reassurance framed as scope-limiting rather than as undo. The rationale given for
showing unassigned overdue cards is `as a fail-safe so things don't slip through
the cracks` — an empty-state *prevention* rationale stated in the docs.

## T9 Notifications & system messages

**Notification model is itself a documented user-facing topic** `[documented]`:
`Notifications and comments` is a help sub-category containing
`Receive Trello notifications` · `Mobile push notification settings` ·
`Watch a card, list, or board` · `Notifications are not working`. The
happy path and the failure path sit in the same category, adjacent.

**In-feed action verbs** `[documented]`, from the Home doc: `Reply` ·
`Complete` · `Dismiss`. Each is a single word and each is available without
navigating to the object — "you can respond directly from within this view".
`Complete` here is a **button label**, whereas on the card it is `Mark complete`
— the shorter form appears where the surrounding row supplies the object.

**Home-page feed sections** `[observed]`: `Up Next` · `Highlights` ·
`Your Items`. All three are non-obvious coinages:
- `Up Next` over "Due soon" — future-facing and non-anxious, though the section
  actually contains overdue items too
- `Highlights` over "Activity" — editorialised rather than chronological
- `Your Items` over "My tasks" — second person, and `Items` rather than `Tasks`
  because it holds checklist items specifically (URL is `/my/tasks`, so the
  *route* says tasks while the *label* says items)

That last mismatch is worth recording: `trello.com/my/tasks` renders a section
headed `Your Items`.

**Timing promise in a notification** `[documented]`: "card members will receive a
notification 24 hours before it's due" — a concrete interval published in the
onboarding guide, not just in settings.

**Feedback solicitation appears on every help article** `[observed]`:
`Was this helpful?` → `Yes` / `No`, and on No, three reason chips:
`It wasn't accurate` · `It wasn't clear` · `It wasn't relevant`. Then
`Provide feedback about this article`. The three chips are a well-formed
diagnostic taxonomy (accuracy / clarity / relevance) in the user's past tense.

**Status-page notification copy** `[observed]`:

- "Get email notifications whenever Trello **creates**, **updates** or **resolves**
  an incident." — the three incident verbs bolded inline
- SMS variant drops one: "whenever Trello **creates** or **resolves** an
  incident" — channel-appropriate scope reduction, stated rather than silent
- Webhook variant adds a fourth: "…or **changes** a component status"
- `Message and data rates may apply.`
- Header banner: "Organization administrators can now receive personalized
  incident information in Atlassian Administration. Subscribe to System Health
  (currently in Beta)…" — beta status disclosed inline in parentheses

Publishing a **different notification scope per channel**, in the subscribe UI
itself, is a strong pattern: the user learns before subscribing that SMS will not
tell them about updates.

**About-this-site framing** `[observed]`: "We'd like to keep Trello up 100% of the
time. When that doesn't happen, we write about it here." Two short sentences, an
admitted aspiration and a commitment. No hedging verbs, no "strive to".

## T10 Disclosures, legal & compliance

**Plan-limit disclosure is stated as a positive quantity, not a restriction**
`[observed]`. The Free tier lists `Up to 10 boards per Workspace` and
`Unlimited cards` in the same bullet list — the cap and the uncapped sit side by
side. `Free for up to 10 collaborators per Workspace` appears as the price
qualifier directly under `$0`.

**Storage limits carry the per-file figure inline** `[observed]`:
`Unlimited storage (10MB/file)` → `Unlimited storage (250MB/file)`. The word
"unlimited" is immediately bounded in the same string by a parenthetical. This is
the Wise claim-then-bound pattern executed at string level rather than footnote
level.

**Automation quota is named in the unit it is metered in** `[observed]`:
`250 Workspace command runs per month` → `1,000 Workspace command runs per month`
→ `Unlimited Workspace command runs`. `command runs` is the coined metering unit,
and it has its own help article (`Automation quotas and limits`) and its own
in-product log (`View automation quota usage`).

**Billing basis disclosed via FAQ, not fine print** `[observed]` — see T12. The
`How are users counted towards billing?` answer defines a billable member as
anyone added to a Workspace as member or admin, then discloses the
`Multi-Board Guest` edge case (a guest on more than one board bills at full
rate). That is the disclosure most likely to surprise, and it is given its own
paragraph and its own linked article.

**Downgrade mechanics stated with the exact post-downgrade state** `[observed]`:
the cancellation answer says the team keeps paid features "until the end of its
prepaid service period", then "becomes a free Trello Workspace that can hold 10
boards". The user is told what they will land on, by number.

**Third-party subscription disclaimed inside a feature row** `[observed]`:
"(Note: Some Power-Ups by our partners require an additional subscription fee.)"
— placed in the `Unlimited power-ups` tooltip, i.e. attached to the claim it
qualifies.

**Add-on pricing disclosed twice, identically** `[observed]`: "Atlassian Guard is
a separate subscription that your company can enable across all your Atlassian
products and starts at $4/month/user." appears both in the SSO comparison row and
in the security block. Consistent wording across two placements — positive
finding.

**Price presentation** `[observed]`: `$5USD` with "Per user/month if billed
annually ($6 billed monthly)". The annual price is the headline and the monthly
premium is parenthetical. Enterprise shows both derivations:
"Per user/month - billed annually ($210.00 annual price per user)".

**Security certifications enumerated in a customer-facing FAQ answer**
`[observed]`, under `How secure is Trello?`: SOC2 Type 2, with the NDA'd
sub-processor review cadence ("every 6 months under NDA"), ISO/IEC 27001 with a
gloss of what it validates, and PCI-DSS. Disclosing the *review cadence* of
vendor reports, not just the certificate names, is unusually specific.

**Named policy topics in help** `[documented]`: `Dormant Trello account policy` ·
`Sanctioned countries` · `Subject access requests` ·
`Trello and GDPR - Our Commitment to Data Privacy` ·
`Public data vs. private data in Trello` · `Cloud Terms of Service - FAQs` ·
`Cloud Terms of Service - Summary of Changes` · `Trello's Trademark` ·
`Sales tax for your Trello subscription` · `What are Enterprise data
restrictions?`

`Cloud Terms of Service - Summary of Changes` is the notable one — a diff of the
legal terms published as a help article. Paired with `Trello's Privacy Policy
update - FAQs`, Trello treats legal-document change as a support topic requiring
its own explainer, which is the same instinct as Wise's
`When do price changes apply to me?`.

**Public-board risk stated bluntly** `[observed]`, in guide ch.2: "Public boards
are ranked on search engines such as Google, meaning that any information on this
specific board will be accessible to anyone on the internet." Consequence spelled
out in concrete terms (Google, anyone on the internet) rather than as
"may be publicly visible". Directly followed by the legitimate use case, so the
warning is not a deterrent.

**Consent microcopy in first person** `[observed]`: "By entering my email, I
acknowledge the Atlassian Privacy Policy." — `I acknowledge` rather than
`You agree`, and `acknowledge` rather than `consent to`, for a
non-consent-requiring action.

## T11 Help-centre architecture

**Structure**: `Trello support` hub (4 router cards) → `Resources` /
`Documentation` index (10 categories) → sub-categories → articles. Up to five
breadcrumb levels.

**The hub is a four-way router, not a content page** `[observed]`:

| Card | Scope line | CTA |
|---|---|---|
| `Documentation` | "Get help using and administering apps." | `View documentation` |
| `Community` | "Find answers, support, and inspiration from other Atlassian users." | `Visit Atlassian Community` |
| `System Status` | "Check the health of our cloud apps and services" | `View system status` |
| `Billing and licensing` | "See FAQs about billing and licensing." | `View FAQs` |

Then `Not finding the help you need?` as the escape hatch. Note `System Status`
promoted to one of four top-level support entry points — status is treated as a
support channel, not as a marketing-site footer link. Also note the missing full
stop on the System Status scope line, where the other three have one.

**Article-title grammar — five consistent shapes**

| Shape | Examples |
|---|---|
| Imperative verb + object (dominant) | `Add a card`, `Archive or delete a list`, `Revoke a Trello token`, `Star a board` |
| `What is / What's <thing>?` | `What is a Trello Workspace?`, `What's a virtual user?`, `What are Power-Ups?` |
| `Why can't I <verb>?` | `Why can't I create a board?`, `Why can't I edit my Trello board?` |
| `Troubleshooting <thing>` | `Troubleshooting a slow board`, `Troubleshooting browser issues with Trello` |
| Symptom sentence | `Emails sent to Trello Inbox never arrive`, `Notifications are not working` |

The imperative shape dominates and is applied with real discipline —
`Add a card`, `Add a label to a card`, `Add an attachment to a card`,
`Add custom stickers to cards` form a scannable parallel series. Breaks in it are
visible and few: `Changing a board's title and description` and `Card mirroring`
sit inside an otherwise-imperative list, and `Making sense of Trello's JSON
export` is an idiom in a literal set.

**Article ordering inside a category is alphabetical, not task-ordered**
`[observed]`. Under `Add and customize cards and lists`, `Archive or delete a
card` appears fourth of twenty-nine because it starts with A. The destructive
action sits above `Create a board`. Alphabetical ordering is defensible for a
long reference list but it destroys the lifecycle narrative.

**Routing furniture** `[observed]`: `Was this helpful?` → reason chips →
`Provide feedback about this article` → `Still need help?` →
"The Atlassian Community is here for you." → `Ask the Community`. A support
ticket is never offered on the article page; the community is the terminal route.
Contrast Wise, which ends at `Contact us`. Trello's terminal state is
peer-to-peer, with `Why can't I submit a Support ticket?` existing as a separate
article to explain eligibility — i.e. the *absence* of a ticket route is itself
documented.

**Progressive disclosure in the index** `[observed]`: `Show more` appears at the
foot of seven of the ten categories. The visible-by-default set is capped at
roughly nine to fifteen entries per category.

**Legacy URL debt** `[observed]`: several in-article links still point at
`help.trello.com/article/NNN-slug` (e.g. `help.trello.com/article/927-what-are-teams`,
`.../705-creating-a-new-team`) while the canonical home is now
`support.atlassian.com/trello/docs/<slug>`. The old slugs also preserve retired
terminology — `what-are-teams` and `creating-a-new-team` for what is now called a
**Workspace**, and `cancel-trello-business-class` for what is now **Standard /
Premium**. The URL layer is an archaeological record of two renames.

## T12 FAQs

Placement: accordion block at the foot of the pricing page, under
`Frequently asked questions`. Eight questions, answers present in server HTML
and summarised below.

| # | Question (verbatim) | Answer summary |
|---|---|---|
| 1 | Does Trello offer a Premium free trial? | Yes; opens with "We sure do." Any user can enrol a Workspace; lists what the trial unlocks. |
| 2 | Do you offer any discounted plans? | Yes; two named discounts (non-profit community, education), each linked. |
| 3 | What payment methods do you accept? | Any major credit card for Standard/Premium monthly or annual; more options for Enterprise, routed to sales. |
| 4 | How do I cancel my Trello Standard or Premium subscription? | Frames cancellation as *downgrade*; paid features persist to end of prepaid period, then reverts to a 10-board free Workspace. |
| 5 | How are users counted towards billing? | Defines a billable member (Workspace member or admin); then discloses that a guest on more than one board is a Multi-Board Guest billed at full rate. |
| 6 | Is there an on-premises version of Trello? | No, stated as a positive positioning claim ("proudly a cloud-only product") with the three delivery surfaces named. |
| 7 | Can I have Trello Standard or Premium just for my own account? | Yes, but you must create a Workspace first and upgrade that; "even teams of one!" |
| 8 | How secure is Trello? | Enumerates SOC2 Type 2, ISO/IEC 27001, PCI-DSS; names the 6-monthly NDA'd sub-processor report review; routes to the security page. |

**Structural notes.** Ordering: trial → discounts → payment → cancellation →
billing definition → deployment model → single-user eligibility → security. Note
that **cancellation is question four of eight** — placed before the billing
definition and well before security, i.e. very high for an exit question. That
placement is a confidence signal.

Three of the eight open with an affirmative interjection before the substance:
`We sure do.`, `Yes!`, `Yes`. Q6's "proudly a cloud-only product" turns a missing
capability into a stated position rather than an apology — the strongest single
move in the set.

Q4's answer never uses the word "cancel" in its explanation, only `downgrade`,
even though the question asks how to cancel. That is a deliberate reframe and
also a mild mismatch: the user asked one thing and is answered about another,
though the linked article does cover cancellation.

The FAQ is preceded by a different escape hatch — `Didn't find what you were
looking for?` → `Make a suggestion`, which routes to feature requests rather
than to support. A feature-request route placed at the end of a *pricing* table
is unusual: it reads the unmet-need-at-pricing moment as a roadmap signal.

**Legacy-link defect** `[observed]`: three of the eight answers link to
`help.trello.com/article/...` URLs, and one points at
`cancel-trello-business-class` — a slug naming a plan tier
(`Business Class`) that no longer exists in the pricing table.

## T13 Terminology & glossary

| Term | Trello's usage | The alternative it rejected |
|---|---|---|
| `Board` | The top-level container. Glossed "a place to keep track of information" | "Project", "Space" |
| `List` | The column; explicitly the status carrier ("keep cards… organized in their various stages of progress") | "Column", "Status", "Stage" |
| `Card` | The atom. "The smallest, but most detailed unit of a board" | "Task", "Item", "Issue" |
| `card back` | The expanded card detail view — a physical-card metaphor | "Detail view", "Card modal" |
| `card cover` | The image/colour on the card front | "Thumbnail", "Banner" |
| `Workspace` | The team container. **Renamed from `Team`** — legacy URLs still read `what-are-teams` | "Team", "Organization" |
| `Power-Up` | A plugin. Self-glossed in nav as "Trello plugins" | "Add-on", "App", "Extension", "Integration" — though `Integrations` exists *separately* as its own nav item |
| `Butler` / `Automation` | Mid-rename: nav and pricing say `Automation`, help retains `Butler Bot vs. Automation in Trello`, `butler-quotas-and-limits`, `butler-time-zone` | |
| `command run` | The metering unit for automation | "Action", "Execution", "Run" |
| `Inbox` | Personal pre-board capture space. "Gather messages and to-dos in this personal space before organizing them into your boards." | "Triage", "Capture", "Drafts" |
| `Planner` | Calendar-and-time-blocking surface | "Calendar", "Schedule" |
| `Views` | Named set: `Calendar`, `Timeline`, `Table`, `Dashboard`, `Map` | "Reports", "Layouts" |
| `Collections` | Premium board grouping | "Folders", "Groups" |
| `Observer` | A read-mostly board role, defined as "a Premium security setting that limit a user's actions" | "Viewer", "Read-only" |
| `guest` / `Multi-Board Guest` / `Single board guest` | External collaborator tiers; the billing-relevant one is capitalised | "External user", "Collaborator" |
| `collaborator` | Used only for the free-tier headcount unit (`10 collaborators per Workspace`) | — it competes with `member`, `guest`, and `user` in the same table |
| `mirroring` | One card shown on multiple boards | "Linking", "Syncing", "Cloning" |
| `to-dos` | The consumer-facing word for work, used in the hero and throughout marketing | "tasks" — which appears in the URL `/my/tasks` |
| `Trello 101` | Onboarding-content naming convention | "Basics", "Fundamentals" |
| `playbooks` / `blueprint` | Marketing framing for templates ("pre-built Trello playbooks", "a blueprint for success") | "templates" — used for the actual feature |

**Register split by surface.** Marketing says `to-dos`, `playbooks`, `blueprint`,
`get sh*t done`; help says `cards`, `tasks`, `items`. The object model
(`board` / `list` / `card`) is stable across both, which is why the product is
learnable — the *nouns* never drift even when the *framing* does.

**The headcount vocabulary is the genuine mess.** One pricing page uses
`collaborators` (free tier limit), `users` (per-user price), `members` (billing
definition), `guests` (three sub-types), `Workspace collaborators` (Standard
bullet), and `people` (help article `Invite people to a Workspace`). Six words
for one entity, in adjacent copy. This is the clearest negative finding in the
file and a useful cautionary example: a seat-based pricing model needs exactly
one word for a seat.

**Profanity in plan copy** `[observed]`: the Free tier description is
"Capture your to-dos, get organized, and get sh*t done." Asterisk-masked, and it
is the only instance in the harvest — absent from help, status, and legal copy.
A tone-ceiling marker worth noting for any brand deciding where its register
floor sits.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout
("your boards", "you'll get to the Home page"). First-person plural for the
company, and used freely in adverse copy: "We'd like to keep Trello up 100% of
the time. When that doesn't happen, we write about it here.",
"we receive and review our data hosting providers' SOC1 and SOC2 reports",
"We sure do.", "We offer more options for Enterprise customers." The company is
a named actor in both good and bad news.

**Register gradient is steep and consistent.**

| Surface | Register markers |
|---|---|
| Marketing | `EMAIL MAGIC`, `MESSAGE APP SORCERY`, `Productivity awaits.`, `get sh*t done`, `you can kiss those old tools goodbye`, `To be even fancier`, exclamation marks |
| Onboarding guide | `Welcome to Trello!`, `don't let its simplicity fool you!`, `Pro tip` boxes, `Sounds pretty simple, right?` |
| Help articles | Flat, imperative, no exclamations, no second-person flourish |
| Status page | Two-sentence declaratives, no adjectives |
| Legal / limits | Numeric and conditional, `and/or` |

The single exception to flat help copy is the subheading `I want more boards on
the same Workspace!` — an intentional register break placed exactly where the
user is frustrated.

**Direct address of the reader's doubt.** `Sounds pretty simple, right?` and
"But don't let its simplicity fool you!" both pre-empt the same objection
(Trello is too simple for real work) in consecutive guide sections. Naming the
objection rather than out-arguing it.

**Numbers as trust devices** `[observed]`: `2,000,000 teams`, `75%`, `81%`,
`74%`, `30 days`, `200+ apps`, `14 days`, `90 days` uptime window, `24 hours`
before due. Each is attached to a specific claim, and the three percentages each
carry a distinct third-party survey link.

**Accessibility content** `[observed]`

- `Skip to main content` present, first in DOM on trello.com; `Skip to main
  content` also first on support.atlassian.com — consistent across both domains
- An `Accessibility` link is present in the Atlassian Support footer on every
  help page, pointing at a dedicated accessibility page
- Alt text on help-article screenshots is descriptive and action-level:
  "Marking a card as complete by checking the check circle on the card front",
  "Reply and Dismiss are two quick options available on Due Soon Cards",
  "Click on the boards tab below the home tab or from the drawer on the top left"
  — these describe *what to do*, not just what is depicted, which is good
  practice for instructional screenshots
- Marketing alt text is scene-level: "Illustration of a team Trello Board",
  "An illustration of Trello Planner", "Company logos: Visa, Coinbase, John
  Deere, Zoom, Grand Hyatt and Fender" — the logo wall names every brand rather
  than saying "customer logos", which is correct
- **Gap:** one home-page image carries empty alt (`![]`) while sitting inside a
  `WORK SMARTER` feature tile whose link text is `Browse Integrations` — the link
  text does supply meaning, so defensible rather than wrong
- **Motion accommodation is documented, not just implemented**: the
  mark-complete article has a section `Turn off the check circle animation on
  your device` and explains that the animation respects the OS `reduce motion`
  setting, with links to both macOS and Windows instructions. Documenting
  `prefers-reduced-motion` behaviour in end-user help is rare
- A `Bidirectional warning in code blocks` troubleshooting article exists —
  bidirectional-text security warnings surfaced as user-facing help

**Negative findings, recorded honestly**

- `Hero` renders as visible body text on the home page — an internal slot name
  leaked to production
- `Log in` (nav) vs `Log In` (footer) — casing drift for one action
- `Check out Trello` vs `Take a tour of Trello` — two labels, one destination
  (`/tour`), both on the home page
- `View Trello pricing` vs `Compare plans` — two labels, one destination
- `Create new board` vs `Create Board` in consecutive sentences of one instruction
- `Add a card…` / `Add a card` / `Add A Card` — three casings on one page
- `Plans` and `Pricing` as two separate top-level nav items
- `Documentation` (nav) vs `Resources` (breadcrumb) for the same node
- `Your Items` heading served at the URL `/my/tasks`
- Six words for one seat: collaborator / user / member / guest / people / Workspace collaborator
- `OTP` exposed unglossed in status-page subscribe fields
- `Butler` surviving in help titles and URLs after the feature was renamed `Automation`
- `Business Class` surviving in a live FAQ link slug after the tier was renamed
- `what-are-teams` / `creating-a-new-team` URLs after `Team` → `Workspace` rename
- Status page: `Operational`/`Partial Outage` (title-case nouns) vs
  `had a partial outage.` (lower-case past-tense sentence) on one page
- Status page: `No incidents reported today.` and `No incidents reported.`
  stacked adjacently — two strings for one condition
- Comparison-table feature labels drift between sentence case and all-caps:
  `AI-GENERATED BOARDS` sits between `AI organization` and `Card mirroring`
- `Custom Fields` (capitalised) in the Standard bullet list vs `Custom fields`
  in the comparison table
- Some help-article links still resolve through `help.trello.com` rather than the
  canonical `support.atlassian.com` path
- Windows-only keystroke guidance (`Ctrl+F5 or Ctrl+Shift+R`) in the no-JS error,
  with no macOS equivalent

---

## Transferable patterns

1. **Switch onboarding grammar with user capability.** Trello's guide asks
   questions while the user cannot yet act (`What is a board?`) and issues
   imperatives once they can (`Create a board`). Condition: only works where
   there is a genuine conceptual prerequisite. Applies to any product with a new
   object model to teach before first action — wallet/ledger concepts, dispute
   states, payout schedules.
2. **Bound "unlimited" inside the same string.** `Unlimited storage (10MB/file)`
   puts the qualifier in the parenthetical rather than in a footnote. Directly
   transferable to any "no fees" / "instant" / "unlimited" claim where a
   per-transaction cap exists.
3. **Give the user a discriminator, not just a cause list.** The
   `Unable to load Power-Up` doc tells the user to refresh and watch whether the
   failure is consistent or varying, because that distinguishes network-block
   from timeout. Transfers to any error with two indistinguishable causes —
   declined-card reasons, verification holds, webhook failures.
4. **Distinguish "nothing happened" from "we don't know."** The status page ships
   both `No downtime recorded on this day.` and `No data exists for this day.`
   Most empty states collapse these. Highly relevant to transaction history,
   dispute timelines, and any ledger view with retention or ingestion gaps.
5. **Publish notification scope per channel, in the subscribe UI.** Email gets
   create/update/resolve; SMS gets create/resolve; webhook adds component change.
   Stating the reduction before the user opts in prevents the "why didn't I get
   told" complaint. Transfers to any multi-channel alert preference screen.
6. **Document the status rename, and admit the old strings survive.** Trello's
   due-date-complete → card-complete migration note tells users their old
   automations were not rewritten but still work. Condition: requires the
   organisation to accept publishing its own technical debt. Directly applicable
   whenever a payment or order state is renamed and integrations reference the
   old name.
7. **Name the human who can unblock you.** `Why can't I create a board?` routes
   to "contact a Workspace admin… found on the "Members" page" rather than to a
   settings path. For permission-denied states in any multi-user product, naming
   the role and where to find them beats naming the permission.
8. **Turn a missing capability into a stated position.** "Trello is proudly a
   cloud-only product" answers "is there an on-premises version?" without
   apology. Transfers to any FAQ answering a capability the product deliberately
   lacks.
9. **Counter-example to carry forward: one word per entity.** Trello's six words
   for a seat (collaborator / user / member / guest / people / Workspace
   collaborator) on one pricing page is the cost of not fixing a glossary. Use as
   a cautionary exhibit in any seat-, payer-, or party-based pricing copy.

## Caveats & gaps

- **Template gallery not harvested.** `trello.com/templates` is fully
  client-rendered and returned only the no-JavaScript fallback. Since templates
  are Trello's primary first-run/empty-board strategy, the actual template names,
  category labels, and per-template descriptions — likely the single richest
  source of workflow-status vocabulary in the product — are unharvested. A
  browser-rendered pass is required.
- **Atlassian design-system content guidelines blocked.** `atlassian.design/content/writing-style`
  returned a 200 with an empty body. Trello inherits Atlassian's voice-and-tone
  and content standards, so the *stated* content rules behind the observations in
  T14 could not be compared against the *observed* copy. That comparison would
  materially strengthen this file.
- **All in-product empty states are `[documented]` or absent, never observed.**
  Board, list, Inbox, Planner, Home-feed, and search empty states sit behind
  auth. T8 is therefore reconstructed from add-affordance labels quoted in the
  guide plus the public status page — the flagged strength is the weakest-evidence
  section in the file. An authenticated pass is needed.
- **No observed in-product validation, toast, or confirmation copy.** T5 is
  largely status-page forms plus documented field names.
- **Only four help articles were opened in full**; the other ~250 are title-only.
  Titles are high-signal for IA and task phrasing and say nothing about answer
  structure.
- **Status page was incident-free during harvest.** All 15 visible days read
  `No incidents reported.`, so no live incident-communication copy (impact
  statements, `Investigating` / `Identified` / `Monitoring` / `Resolved` update
  headers, postmortem language) was observable. Only the component-state
  vocabulary and the null states were captured. `Incident History` was not
  fetched.
- **Locale is en-US only.** 21 locales are offered; none were sampled, so no
  claim in this file should be treated as precedent for localised Trello copy.
- **Mobile app strings not harvested** — out of the public web surface.
- **Solutions, use-case, tier-detail, `/tour`, `/inbox`, `/planner`,
  `/butler-automation`, and `/power-ups` pages were not fetched**, so the feature
  pages' own headline and CTA inventories are unrepresented.
- Trello is an Atlassian property and some observed copy (status page, support
  chrome, `Was this helpful?`, `Atlassian Guard` disclosures) is
  **Atlassian-platform copy rather than Trello-authored**. Where that is likely,
  it is noted, but the boundary is not always determinable from the public
  surface.

## Sources

1. https://trello.com/
2. https://trello.com/pricing
3. https://support.atlassian.com/trello/
4. https://support.atlassian.com/trello/resources/
5. https://trello.com/guide
6. https://trello.com/guide/trello-101
7. https://trello.com/guide/create-project
8. https://trello.status.atlassian.com/
9. https://support.atlassian.com/trello/docs/the-home-page/
10. https://support.atlassian.com/trello/docs/mark-a-card-as-complete/
11. https://support.atlassian.com/trello/docs/why-cant-i-create-a-board/
12. https://support.atlassian.com/trello/docs/troubleshooting-power-ups-not-loading/
13. https://trello.com/templates — attempted, blocked (client-rendered, no-JS shell served)
14. https://atlassian.design/content/writing-style — attempted, blocked (empty response body)
