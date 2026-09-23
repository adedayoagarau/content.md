# 013. Craft

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Block-based document editor and note app with tasks, collections, and web publishing (Notion/Obsidian competitor set) |
| Primary URL | https://www.craft.do/ |
| Corpus rank | 013 |
| Benchmark strength (source list) | Editor onboarding and sharing |
| Locale / market observed | en. The docs are **fully localised into 11 further languages at 169 pages each** (`de es fr it ja ko pl pt-br vi zh-hans zh-hant`), declared in a published `llms.txt` index. Marketing site footer offers `English` only. |
| Platform observed | Web (marketing), Mintlify-hosted documentation (markdown-native), Zendesk ticket form |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 2 certification and GDPR compliance both claimed as named sections on the security page (section bodies did not render). **72-hour breach-notification commitment stated explicitly.** Third-party penetration tests, continuous vulnerability scanning, encryption at rest and in transit. Craft Docs Limited, Inc. |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | **Full, and unusually deep.** Craft's documentation is served as raw markdown to `text/markdown` requests and publishes a complete `llms.txt` index, so the entire help IA (169 English pages, every title and every one-line description) was retrievable in a single fetch. Several security-page section bodies and three of four pricing FAQ answers are client-rendered and did not resolve. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home (marketing) | https://www.craft.do/ | Hero, four feature pillars, persona strip, MCP/API surface, plan teaser |
| Pricing | https://www.craft.do/pricing | Four plans, comparison matrix, competitor cost stack, 4-question FAQ |
| Security and Privacy | https://www.craft.do/security | Organizational-security bullet list; four further sections un-rendered |
| Getting Started Guide | https://www.craft.do/getting-started | **Is itself a published Craft document** — see T10 |
| Docs home | https://support.craft.do/ | Six card groups, popular articles, search tips |
| **Docs index (`llms.txt`)** | https://craft-support.mintlify.site/llms.txt | The complete 169-page IA with per-page descriptions — the single richest source in this file |
| Docs: Introduction | https://support.craft.do/en/introduction | Onboarding hub, "What is Craft?" |
| Docs: Slash Menu | https://support.craft.do/en/introduction/slash-menu | ~90 command labels — the editor's full verb inventory |
| Docs: Troubleshooting | https://support.craft.do/en/introduction/troubleshooting | ~25 accordions; the error/recovery corpus, with verbatim in-product error strings |
| Docs: Sharing Documents | https://support.craft.do/en/share-and-publish/share | Access-level vocabulary, identity model |
| Docs: Publishing Documents | https://support.craft.do/en/share-and-publish/publish | Publish controls, security options |
| Docs: Tasks + Completing & editing tasks | https://support.craft.do/en/plan-and-do/tasks, `/completing-and-editing-tasks` | Three-state checkbox, Logbook |
| Docs: Contact Support or Report a Bug | https://support.craft.do/en/introduction/help | Channel routing table, response SLA |

---

## T1 Navigation & IA labels

**Global marketing nav — six items, two of them coined** `[observed]`

`Product` · `Imagine` · `Community` · `Pricing` · `Learn` · `Download` ·
`Log in` · `Try Craft Free`

`Imagine` as a top-level nav item is the notable one — an unqualified verb with
no object, sitting where competitors put `Integrations` or `Templates`. It
resolves to the MCP/API/build-your-own surface, so the label is asking the user
to supply the object themselves. High risk, and Craft hedges it in the page
heading (`Imagine the possibilities when everything's connected to Craft`), which
rather undercuts the boldness of the nav label.

`Learn` and `Community` as siblings of `Pricing` put education and social proof
in the primary nav rather than the footer.

**Marketing feature pillars — four single verbs** `[observed]`:
`Write` · `Plan` · `Organize` · `Customize`

**Documentation top level — four verb *pairs*** `[observed]`:
`Write and Edit` · `Plan and Do` · `Organize and Find` · `Share and Publish`

This parallelism is the strongest IA decision in the file. Every docs category is
`<verb> and <verb>`, and the second verb in each pair is the **consumption or
completion half of the first verb's production half**: you write *and edit*, plan
*and do*, organise *and find*, share *and publish*. Four categories, eight verbs,
one grammatical frame. A user can locate any task by asking which of eight verbs
it is.

But note the mismatch: marketing's fourth pillar is `Customize`; documentation's
fourth category is `Share and Publish`. **`Customize` has no docs category and
`Share and Publish` has no marketing pillar** — the two surfaces disagree on what
the fourth quarter of the product is. Given that sharing is this product's flagged
benchmark strength, burying it behind a marketing pillar called `Customize` is a
real cost.

**Full documentation IA** `[observed]` — five top-level groups, then categories:

| Group | Categories |
|---|---|
| `Getting Started` | `Introduction`, `Import & Export` |
| `Features` | `Write & Edit`, `Organize & Find`, `Plan & Do`, `Share & Publish`, `AI Assistant` |
| `Integrations` | `Integrations` |
| `Craft in Action` | `Craft in Action` |
| `Account` | `Account & Billing`, `Help & Troubleshooting` |

Third-level sub-groupings are equally disciplined, e.g. under `Introduction`:
`Documents, Pages, and Blocks` · `Navigation` · `Account Setup` ·
`Mobile Features` · `Platforms`. Under `Account & Billing`:
`Profile Settings` · `Data and Security` · `Storage and Recovery` ·
`Subscription Plans` · `Billing`.

Two inconsistencies inside an otherwise exemplary tree. (1) **`&` vs `and`** is
used interchangeably at the same level: `Write & Edit` in the index but
`Write and Edit` as the page H1; `Import & Export` but `Import and Export`;
`Data and Security` but `Account & Billing`; `Dates, deadlines & reminders` but
`Links and Backlinks`. (2) A group named `Craft in Action` contains exactly one
page of the same name — a grouping level created for a single item.

**Docs home card groups** `[observed]`, each with a scoping sentence in the Wise
manner: `Getting started` · `Video Tutorials` · `Core features` ·
`AI and integrations` · `Account and support` · `Popular articles` ·
`Search tips` · `What's new`. The `Search tips` block is unusual — the docs teach
the reader how to use the docs (search bar, sidebar category browse,
`Related Articles`, `Callouts`), which is a self-referential section most help
centres skip.

**Footer — five columns** `[observed]`:
`Product` (with a nested `Features` sub-list and `Education Plan` nested under
`Pricing`) · `Community` (which contains `Learn`, `Compare Craft`,
`Getting Started Guide`, `Template Gallery` — none of which is a community) ·
`Support` · `Company` (with nested `Legal`) · `Download`.

The `Community` column is mis-grouped: four of its seven links are learning
resources, not community. And the footer's `Contact Support` link points to
`mailto:feedback@craft.do` while the docs explicitly route support to
`support@craft.do` and feedback to `feedback@craft.do` — **the footer sends
support requests to the feedback inbox.** Recorded as a defect in T14.

## T2 Value proposition & headline patterns

**Hero — a possessive noun phrase with a rule-of-three** `[observed]`

> Headline: `Your space for notes, tasks, and big ideas`

`Your space` names the container in the product's own vocabulary (a `Space` is a
real Craft object — see T13), so the headline is simultaneously a promise and a
product noun. The triad escalates in abstraction: notes (atoms) → tasks (actions)
→ big ideas (ambition). `big ideas` is the only adjective and it does the
aspirational work that `notes` and `tasks` cannot.

**The positioning line immediately below is the cleverest copy on the site**
`[observed]`:

> `Craft isn't just for one thing, it's for your things.`

Two `thing`s, a possessive pivot, and a direct answer to the "what is this
actually for?" objection that every general-purpose workspace product faces.
Rather than listing use cases, it concedes the vagueness and reframes it as
adaptability. Immediately followed by six chips — `Docs` · `Tasks` · `Calendar` ·
`Whiteboards` · `Daily Notes` — which supply the concreteness the sentence
deliberately withheld.

**The persona strip solves the same problem differently** `[observed]` — a
scrolling list of nine named users, each `<Name>, <role>` then a comma-run of
*their actual documents*:

- `Tom, Podcaster and newsletter writer` — "Meeting notes, social media posts"
- `Ana, Producer and Photographer` — "Shoot plans, scripts, timelines, wardrobe notes"
- `Gagan, Product Manager` — "Notes, tasks, travel plans, blog drafts"
- `Amity, Creator and Educator` — "Lessons, scripts, projects, daily sparks"
- `Gian, Site Manager` — "Work reports, project boards, personal wiki"
- `Stephen, Dog dad and dream chaser` — "List of goals, progress tracker"
- `Aaron, Student` — "Course notes, project outlines, daily tasks"

Section heading: `How people use Craft`. This is the **best pattern on the site
and the most transferable**: for a product with no single use case, the value
prop is delivered as *a list of other people's document titles*. `wardrobe notes`
and `daily sparks` are specific enough to be real. `Stephen, Dog dad and dream
chaser` is the tell that these are self-described — a role nobody in marketing
would invent.

Note that `Gagan, Product Manager` and five others repeat four times in the
rendered output (carousel duplication), so the strip reads as nine people but
delivers ~30 entries to a text extractor. Flagged in T14.

**Section headline pattern — pillar verb, then a promise sentence** `[observed]`

| Pillar | Headline | Register |
|---|---|---|
| `Write` | `From first thought to final form` | Alliterative arc, no product noun |
| `Plan` | `Planning that doesn't feel like work` | Negation of the category's own pain |
| `Organize` | `Structure That Adapts to Your Thinking` | Title Case — the only one |
| `Customize` | `Make it unmistakably yours` | Possessive, adverb-led |

`Planning that doesn't feel like work` is the sharpest: it names planning tools'
actual failure mode (the meta-work tax) and promises its absence. `From first
thought to final form` compresses the whole editor value prop into five words and
a preposition pair, and the body follows the same arc — capture on iPhone, refine
later, end with "documents you're proud to share." **Pride as the outcome of a
document editor** is a distinctive emotional target; contrast Things, which sells
calm, and Todoist, which sells clarity.

`Structure That Adapts to Your Thinking` breaks the site's sentence-case
convention into Title Case, which is a straightforward inconsistency.

**Pricing headlines** `[observed]`:
`Choose The Plan That's Right For You` (Title Case again, and with `The`
capitalised — an awkward variant), plus the section headers
`Your pace, your plan` (home), `Why Choose Craft Plus`, and
`Smart on price, strong on power`.

`Your pace, your plan` with the subhead "Use it now and then, or integrate it
into your daily flow" is the honest one: it frames the free/paid split as
**intensity of use rather than feature deprivation**, which is a much kinder
framing of a block limit.

`Smart on price, strong on power` introduces a **competitor cost stack**
`[observed]` — a four-row comparison against category prices
(`Notes $10/month` · `Docs $12/month` · `File Storage $12/month` ·
`Web Publishing $12/month`) totalling `Other apps total $46/month` against
`With Craft $6.4/month`. Note the comparison names *categories*, not competitors,
and the categories are unattributed — no vendor, no source. Persuasive and
unfalsifiable, which is worth flagging as a weaker practice than Wise's named,
sourced comparisons.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try Craft Free` | Global nav (twice: desktop + mobile) and hero | Price inside the label; **the primary CTA is not "Sign up"** |
| `Log in` | Global nav | |
| `Get Started` | Pricing, on `Plus`, `Family`, and `Team` | One label for three different checkout destinations |
| `Sign up` | Pricing, on `Free` **only** | **Two labels for the same action** — `Sign up` for free, `Get Started` for paid, `Try Craft Free` in the nav. Three labels, one funnel |
| `Upgrade to Plus` | Home, plan teaser | Names the tier |
| `Start for free. No credit card required.` | Home, closing block | Objection pre-empted in the CTA cluster itself |
| `Continue on web` | Home, closing | Platform choice offered as a CTA |
| `Download on the App Store` | Home, closing | |
| `Learn more` | Home, **four times** — on `Write`, `Imagine`, `Plan`, `Customize` | **Bare `Learn more`, repeated, with no object.** The single clearest CTA defect in this file |
| `Learn more about group discounts` | Home, plan teaser | The one specific `Learn more` on the page |
| `Start Building` | Home, `Imagine` section (twice) | |
| `Explore community templates` / `Explore templates` | Home, `Community` section | **Two labels for one destination on one page** |
| `Contact us` | Pricing, under `Bigger group?` | Resolves to `mailto:viktor@craft.do` — a **named individual's personal address** as the enterprise sales route |
| `Contact Customer Support` | Security page, under `Request More Info` | Resolves to `feedback@craft.do` |
| `Contact Support` | Footer | Also `feedback@craft.do` — see T14 |
| `Watch the full Craft 101 series →` | Docs home | Names the artefact, the scope, and uses a directional glyph |
| `Create Link` | Publish flow | Verb + object |
| `Remove Link` | Publish settings | **Not "Unpublish"** — see T6 |
| `Invite` | Share flow | |
| `Share` | Document toolbar | One button opening both share and publish paths |
| `Sync Now` / `Report Sync Error` / `Reset Sync Now` | Diagnostics panel | Three actions of escalating danger; see T7 |
| `Share Your Feedback` | Docs, feedback section | |
| `Bigger group?` | Pricing | A question used as a section label to route the enterprise case |

**Observation.** Craft's CTA discipline is markedly weaker than its IA
discipline. `Learn more` appears four times unqualified on the home page —
exactly the pattern Wise avoids and Todoist eliminates. The signup funnel carries
three labels (`Try Craft Free`, `Sign up`, `Get Started`) and the template
gallery two (`Explore community templates`, `Explore templates`), all within one
or two pages. Against that, the in-product labels documented in the help centre
are precise and well-differentiated — `Create Link` / `Remove Link`,
`Sync Now` / `Reset Sync Now`. **The product copy is better than the marketing
copy**, which is the reverse of the usual pattern and suggests different owners.

## T4 Onboarding & getting-started

**Four onboarding surfaces, in ascending commitment** `[observed]`:

1. `Start for free. No credit card required.` — the friction disclaimer
2. `Craft 101` — "11 video tutorials covering everything from basics to advanced
   features", fronted by a one-minute intro: "Watch our Craft 101 intro to get
   started in just one minute."
3. `Introduction` docs hub — concept-first, not click-first
4. `Move to Craft` — migration as a first-class onboarding path

**The 11-video series is gated behind a one-minute promise** `[observed]`. The
docs home leads with the 1-minute video and only then offers the full series.
Naming the short version's duration in the sentence that offers it
("in just one minute") is what makes the long version acceptable — a
**duration-disclosed entry point**, the same move Things makes with "In about 10
minutes."

**The `Introduction` page structures onboarding around four capability verbs, not
steps** `[observed]`. Under `What is Craft?`:

- `Write and organize` — structured documents with pages, blocks, flexible nesting
- `Stay productive` — tasks, calendar events, daily notes in one place
- `Collaborate seamlessly` — share and work together in real time
- `Work anywhere` — macOS, iOS, Windows, Web, Android with automatic sync

Then four named onboarding routes as cards: `Account Setup`,
`Documents, Pages, and Blocks`, `Navigation`, plus `Essential Tools`
(`Keyboard Shortcuts`, `Slash Menu`, `Mobile Features`) and
`Switching to Craft` (`Move to Craft`, `Platforms and Availability`).

There is **no numbered wizard and no progress language anywhere** — no "Step 1 of
5", no percentage, no checklist. Onboarding is a set of concept doors, and the
page closes on `Next Steps` listing the five feature categories. For a product
whose core object (`block`) requires a conceptual shift from a word processor,
leading with `Documents, Pages, and Blocks` rather than "Create your first
document" is a defensible choice — teach the model, then the actions.

**The one prescriptive onboarding instruction is a keyboard shortcut**
`[observed]`, in a `Quick Tip` callout:

> "Press `Cmd + O` (macOS) or `Ctrl + O` (Windows) to quickly navigate to any
> document, view, or feature in Craft. This is one of the most useful shortcuts
> to learn first!"

`to learn first` is doing sequencing work — of ~100 shortcuts, the docs nominate
one as the entry point. **Ranking your own shortcuts by learning order** is a
small, cheap, rarely-done kindness.

**Migration is treated as an onboarding category with eleven named sources**
`[observed]`: `Notion` · `Evernote` · `Quip` · `Google Docs` · `Obsidian` ·
`Bear` · `Apple Notes` · `OneNote` · `Roam Research` · `Anytype` ·
`TextBundle Files`. Each has its own article, and the per-article descriptions
disclose the mechanism *and its friction* up front:

- Notion: "directly into Craft — **no file export needed**"
- Quip: "directly into Craft — **no file export needed**"
- Evernote: "by **exporting them from the Evernote desktop app** and uploading the files"
- Google Docs: "by **signing in with your Google account**"
- Apple Notes: "**Export your notes from Apple Notes as Markdown**"
- Roam: "with **backlinks**"
- Obsidian: "notes, attachments, and images"

Eleven competitor names, each with the *effort required* stated in the article
description so the user can judge before clicking. Naming what survives the import
(`backlinks`, `attachments and images`) is the part most migration copy omits and
the part users actually worry about. This is a **transferable pattern: in a
migration index, state per-source both the mechanism and the fidelity.**

## T5 Form & field labels

**The slash menu is the product's real form surface, and its command inventory is
published in full** `[observed]`. Entry: type `/` while editing.

Documented grouping and labels:

| Group | Commands (verbatim) |
|---|---|
| AI and writing | `Assistant` |
| Text and block styles | `Title` · `Subtitle` · `Heading` · `Strong` · `Body` · `Caption` · `Page` · `Card`; decorations `Block` · `Focus` |
| Lists and tasks | `Todo` · `Toggle List` · `Bullet List` · `Numbered List` · `No List` |
| Task actions | `Schedule`: `Today`, `Tomorrow`, `Next Monday`, `Pick a date`, `Clear schedule`; `Deadline`: same set with `Clear deadline`; `Check selected tasks` · `Uncheck selected tasks` |
| Text formatting | `Bold` · `Italic` · `Strikethrough` · `Code` |
| Colour/font/alignment | `Colors`; `Fonts`: `System`, `Serif`, `Mono`, `Round`; `Alignment`: `Left`, `Center`, `Right`, `Justify`; `Indent` · `Outdent` |
| Dates and reminders | `Today` · `Tomorrow` · `Yesterday` · `Now` · `Date & Time`; reminders `In 20 minutes` · `In 1 hour` · `In 3 hours` · `Tomorrow` · `Next week` · `Later` · `Remove reminder` · `Resolve reminder` |
| Insert content | `File` · `Image` · `Unsplash image` · `Table` · `Code block` · `Plain text block` · `TeX formula` · `Mermaid diagram` · `Whiteboard` · `Excalidraw` |
| Separators | `Separator` · `Strong separator` · `Regular separator` · `Light separator` · `Extra light separator` · `Page break` |
| Collections | `Table Collection` · `Gallery Collection` · `Kanban Collection` |
| Templates | `Insert template` · `Code snippet` · `Text snippet` · `Formula snippet` · `Mermaid snippet` |
| Cleanup and actions | `Clear styling` · `Reload link info` · `Turn into text link` · `Turn into rich link` · `Turn file into collection` · `Turn table into collection` |
| Table cells | `Insert Row(s) Before` · `Insert Row(s) After` · `Insert Column(s) Before` · `Insert Column(s) After` · `Insert Formula` · `Move row up` · `Move row down` · `Move table column left` · `Move table column right` · `Delete row` · `Delete table column` · `Clear cell contents` · `Clear styling` |

**Five observations on this inventory.**

1. **The reminder offsets are the strongest micro-copy set.**
   `In 20 minutes` · `In 1 hour` · `In 3 hours` · `Tomorrow` · `Next week` ·
   `Later`. Six options with a deliberate **granularity curve** — fine near the
   present, coarse further out — ending in `Later`, an unbounded escape hatch that
   requires no decision at all. `Later` as a legitimate scheduling option is the
   Things `Someday` insight arrived at from the notification side.
2. **`Clear schedule` / `Clear deadline` / `Remove reminder` /
   `Resolve reminder`** — four different verbs for removing four temporal
   attributes. `Clear` for dates, `Remove` and `Resolve` for reminders, with
   `Resolve` implying acknowledgement rather than deletion. A meaningful
   distinction, but the inconsistency of `Clear`/`Remove` for structurally
   identical operations is a smell.
3. **`Turn X into Y` as a conversion verb family** — `Turn into text link`,
   `Turn into rich link`, `Turn file into collection`,
   `Turn table into collection`. A block-based editor's central affordance is
   transmutation, and one verb carries all of it. Compare `Convert`, `Change to`,
   `Cast`.
4. **Casing is inconsistent within one menu.** `Table Collection` and
   `Insert Row(s) Before` are Title Case; `Move row up`, `Delete row`,
   `Clear cell contents`, `Strong separator` are sentence case. In the same
   context menu.
5. **`Strong` is used for two different things** — a text/block style
   (`Title` · `Subtitle` · `Heading` · `Strong` · `Body` · `Caption`) and a
   separator weight (`Strong separator`). And `Block` is both the atomic object
   name *and* a visual decoration command. Both are overloads worth noting in a
   product whose whole model is named "blocks."

**Other documented input grammars** `[observed]`:
`:` + name for emoji · `@` or `[[` to link pages, blocks, or dates ·
markdown shortcuts `#`, `-`, `[]`, `>`, `**bold**` · `Space bar` on a focused
block to insert a block below · preset table sizes `2x2` through `9x9`.

A stated constraint, given as a `Warning`: "Currently, it's not possible to
assign the slash menu to a different key." **A customisation limit disclosed at
the point where the user would look for the setting** — the same move Todoist
makes with its Czech/Turkish date-parsing note.

**Share and publish field labels** `[observed]`: `Viewer` / `Editor` (email
invite), `View` / `Edit` (link access), `Secret Link`,
`Visitors Can Follow Block Links`, `Craft Domain`, `Custom URL Path`,
`Custom Domain`, `QR Code`, `Password Protection`, `Email Domain Restriction`,
`Expiration Date`, `Search Engine Indexing`, `Comments`, `Advanced Options`,
`Present`, `Show Today's Tasks Count`.

`Visitors Can Follow Block Links` is an exemplary permission label: it names
**who** (visitors), **what they can do** (follow), and **to what** (block links).
Most products would ship "Allow deep links."

## T6 Status & state language

**The task state model — three states on one control** `[observed]`, and it is
the most interesting interaction-copy finding in this file:

> "A task's checkbox moves through three states as you click it: it starts
> **open**, one click marks it **done**, another marks it **cancelled**, and a
> third click returns it to **open**."

`open` → `done` → `cancelled` → `open`. **A tri-state checkbox**, cycling. And
the copy immediately justifies the third state:

> "Cancelling keeps a record that dropping the task was a deliberate choice,
> rather than deleting it outright."

Craft and Things (012) arrive independently at `cancelled` as a terminal state
distinct from `done`, and both explain it in terms of *record-keeping about
intent*. Craft goes further by putting it on the primary control rather than in a
menu — the cost of cancelling is one extra click on the thing you were already
clicking. Dedicated shortcuts exist for both (`Cmd+Option+T` to complete,
`Cmd+Option+Shift+T` to cancel).

Note the label drift: the checkbox states are documented as `open` / `done` /
`cancelled` (lowercase, in prose) while the bulk actions are
`Mark as Completed` / `Mark as Cancelled` / `Mark as Uncomplete` (Title Case, and
`Completed` not `done`, `Uncomplete` not `open`). **Three vocabularies for one
state machine**: prose, menu, and the `Check selected` / `Uncheck selected` slash
commands. `Mark as Uncomplete` is also awkward English where `open` was available.

**Task views as states** `[observed]`: `Inbox` · `Today` · `Upcoming` · `All`,
described as "each show your tasks from a different angle." `Today` explicitly
includes rollover — "Everything scheduled for today, **including tasks that
rolled over from earlier**." Naming the rollover in the tab's own description
pre-empts the "why is last Tuesday's task in Today?" question.

One precise state disclosure, in an `Info` callout:
`Completed tasks keep their scheduled date` — "A completed task continues to show
on its scheduled date rather than the date you finished it." A **non-obvious
temporal semantic surfaced as a titled callout** rather than left to be
discovered.

**`Logbook`** for completed Inbox tasks, and "documents, pages, and folders each
show a count of completed tasks." Same term as Things, independently.

**Sync state — exposed through a named panel with three graded actions**
`[observed]`. `Settings → Diagnostics` shows "current sync status", a manual sync
trigger, and error reporting. The sync-history line reports counts under three
labels: `New` · `Uploading` · `Synced`.

The three actions are copy-designed by risk, and this is the best safety-copy
sequence in the file:

| Action | Documented risk framing |
|---|---|
| `Sync Now` | "safe to use at any time" |
| `Report Sync Error` | "safe to use at any time" |
| `Reset Sync Now` | "discards local changes that have not reached our servers yet, and they cannot be recovered afterwards. **Use it only when support asks you to.**" |

The `Warning` callout title is itself the whole warning:
`Reset Sync Now discards unsynced changes`. And crucially the danger is
**repeated at the point of temptation** — inside the "sync says everything is
synced, but a document is missing" accordion, where a panicking user would reach
for it:

> "Do not use **Reset Sync Now** to look for missing content. It discards local
> changes that have not uploaded yet, which can turn a display problem into
> permanent data loss."

`turn a display problem into permanent data loss` is the sentence to steal. It
names the user's *actual situation* (a display problem), the *action's real
effect*, and the *asymmetry* between them, in eleven words.

**Offline state** `[observed]`: a verbatim in-product message,
`You Are Offline` (Title Case), documented with its semantics and a three-part
response:

> Summarised: the message means the app has lost its connection to the internet
> or Craft's servers and will automatically attempt to reconnect. The user is
> told to check their connection, **pause editing to prevent potential data
> loss**, and reload only if the connection is stable and nothing is unsaved.
> "The message disappears as soon as the connection is back."

`Pause editing.` as explicit user guidance during a degraded state is unusual and
honest — most products imply that offline editing is safe. And the message's
self-clearing behaviour is stated, so the user knows not to dismiss it.

Sync diagnostics are **Mac/iPhone/iPad only**, disclosed in an `Info` callout
titled with the limitation itself
(`Diagnostics is available on Mac, iPhone, and iPad only`) plus a pointer to what
Windows and Web users should do instead. **Titling a callout with the constraint
rather than with "Note"** recurs throughout Craft's docs and is a consistent
strength.

**Publishing state** `[observed]`: `Create Link` to publish, `Remove Link` to
unpublish — with the consequence stated: "Unpublish the page to immediately make
the web link unavailable. **The document remains in your Craft workspace.**"
Choosing `Remove Link` over `Unpublish` keeps the object of the action concrete
(a link, not a state), and the reassurance about the document surviving is
exactly the anxiety a user has at that button.

## T7 Error, failure & recovery

The richest category in this file. The `Troubleshooting` page is ~25 accordions
across nine named sections, and it **quotes verbatim in-product error strings** —
rare in a public help centre and the reason this section is unusually well
evidenced.

**Verbatim in-product error and system strings, all `[documented]`:**

| String | Context |
|---|---|
| `You Are Offline` | Windows/Web connection loss |
| `Another Craft is already installed` | macOS, leftover install files (documented as a "Pop-up:") |
| `Disk space is critically low` | Windows, cannot write tab layout |
| `Couldn't save tab state` | Windows, data files locked by another program |
| `External location already added` | Re-adding an external storage location |
| `Failed to fetch data` | Web app, link thumbnail |
| `Server Not Found` | Network/extension blocking |
| `Offline` | Diagnostics panel sync status value |

`Disk space is critically low` and `Couldn't save tab state` get the best
treatment: the docs explain that **both messages are about the saved tab layout
rather than your documents** — "A full disk can still interrupt other writes, so
free up space either way." A named error whose scope is *narrower* than the user
will assume, corrected explicitly, then the residual risk acknowledged anyway.

**Section structure, ordered by frequency then platform** `[observed]`:
`Start here` → `Sync Issues` → `Login Issues` → `Performance Issues` →
`Editing Issues` → `macOS-Specific Issues` → `iOS / iPadOS-Specific Issues` →
`Windows and Web App Issues` → `Subscription Issues` →
`Data & Storage Issues` → `Reporting bugs` → `Still need help?`

**`Start here` is three checks, stated as resolving "most reports"** `[observed]`:
update Craft on every device, restart the app or reload the page, check the OS
version (with exact minimums: macOS 12+, iOS/iPadOS 15+, Windows 10+).
"Three checks resolve most reports" is a **quantified triage promise** at the top
of the page, which earns the user's patience for the depth below.

**Accordion titles are written as the user's symptom, not the system's fault**
`[observed]` — the opposite of Todoist's `Troubleshoot <object>` pattern:

- `Sync shows as 'Offline' in diagnostics`
- `Documents not syncing across devices`
- `VPN or ad blocker blocking sync`
- `Corporate network blocking Craft`
- `Sync says everything is synced, but a document is missing`
- `Signing in with Apple opens an empty account`
- `An image or file won't finish uploading`
- `Text reverts or disappears while typing`
- `Content flickers or flashes in the Web app`
- `Craft keeps running after I close the window`
- `Latest update not showing in App Store`
- `Still seeing the block limit after upgrading`
- `Recently Deleted folder disappeared`
- `Sharing files ends up as an unusable link`
- `Can't access Craft on Web app or Windows`

Three shapes: **symptom description** (`Text reverts or disappears while
typing`), **named cause** (`VPN or ad blocker blocking sync`), and
**first-person** (`Craft keeps running after I close the window`). The
symptom-first ones are the majority, and several are phrased with the
contradiction the user is experiencing:
`Sync says everything is synced, but a document is missing` — the system's claim
and the user's reality in one title, joined by "but." That construction is the
Wise `Why does it say my transfer's complete when the money hasn't arrived yet?`
pattern, and it is the single most findable shape for a confused user.

**Two failure explanations that give the user the underlying mechanism**
`[observed]`, which is what lifts this page above a checklist.

*Conflict resolution*, under `Text reverts or disappears while typing`:

> Summarised: Craft merges edits from every device with the document open;
> changes to *different* blocks are kept from both devices; when two devices
> change the *same part of the same block* before syncing, **the version on
> Craft's servers is kept**, so text typed on the other device can be replaced.

Then three mitigations (close the document elsewhere, let sync finish, update
every device) and an escalation condition — "If text still disappears with the
document open on a single device, we want to see it." Stating the **conflict
resolution rule** (server wins, at block granularity) converts "the app ate my
text" into a predictable system with a workaround. Most products will not admit a
last-writer-wins rule in public.

*Upload retry semantics*, under `An image or file won't finish uploading`:

> Summarised: file uploads run separately from document sync, so a failed upload
> does not hold up text edits or other documents; **Craft retries a failed upload
> up to three times and then stops.**

Publishing the retry count means the user knows when waiting is futile. Then a
three-step remedy ending in the file-size case, where the constraint is
plan-dependent and disclosed: "files above that size are rejected before the
upload starts" — rejected *before* upload, so the user isn't waiting on a doomed
transfer.

**The identity-collision article is the best single piece of failure copy on the
site** `[observed]`. Under `Signing in with Apple opens an empty account`:

> Summarised: if `Continue with Apple` signs you into an empty account but email
> sign-in shows everything, the Apple link to your Craft account has been broken.
> This happens after changing your account email with a verification code, which
> removes the Sign in with Apple link, so the next `Continue with Apple` creates
> a new, empty account. **"Your content is safe in the original account."**
> Then the relink path, then three preconditions in an `Info` box: the relink is
> rejected while the new empty account still holds your Apple ID (so it must be
> deleted first); it is rejected if your account belongs to any team; relinking
> sets your Craft email to whatever Apple sends, which may be a previous address.
> **"Accounts cannot be merged, so contact support if you have added content to
> both."**

Structure: symptom → **reassurance that data is safe** (second sentence, before
any instruction) → causal explanation → remedy → three failure conditions of the
remedy → the hard limit (`Accounts cannot be merged`) with the escalation path.
Reassure, then explain, then instruct, then bound the instruction, then admit the
wall. Also note the related `Info` callout titled
`About @privaterelay.appleid.com` which explains that a relay address means Apple
sign-in was used — **glossing an opaque string the user can see in their own UI.**

**Named third-party blockers, specifically** `[observed]`: `AdGuard` ·
`Little Snitch` · `Hush` · `Plume Guard` (identified precisely as "the Secure DNS
feature in the Plume HomePass app") · `Magnet` · `Rectangle` · `Grammarly
Desktop`. Plus the exact domains for IT allowlisting (`api.craft.do`,
`docs.craft.do`, `res.craft.do`, and `*.craft.do` on managed Windows devices) with
the reason wildcards matter: "Craft uses several subdomains for sync, resources,
and content, so **allowing only some of them leaves parts of the app broken**."

**`Reporting bugs` is a five-step submission spec with per-platform capture
instructions** `[observed]`: confirm version → share environment (device model,
OS and version, platform — each with a worked example, e.g. "macOS Sequoia 15.4,
iOS 18.5, Windows 11 23H2") → describe steps to reproduce (with a modelled
example: *"Opened a document → added a new page → inserted an image → issue
happened."*) → attach a screen recording ("record the entire screen (not a crop)")
→ attach a diagnostic file.

Then `How to record your screen` and `Capture diagnostic data` as platform tabs,
documenting `Spindump` (macOS), `sysdiagnose` (iOS — including the button
combination, the ten-minute wait, and "You'll feel a short vibration. **No
notification appears, this is normal.**"), Event Viewer `.evtx` export (Windows),
and browser console (Web). The sysdiagnose note about the absent notification is
the detail that stops a user from repeating the gesture and giving up.

**And then the part almost nobody ships** `[observed]` —
`What happens after you report`:

> `One-off issues:` "We log it and monitor for related cases"
> `Reproducible bugs:` "We escalate internally for investigation and resolution"

**Disclosing the vendor's own triage policy** so the reporter knows what silence
means. Closed with "Thank you for taking the time to report bugs. Your input
helps us make Craft better for everyone."

**Cross-referencing is scoped, not generic** `[observed]`. An `Info` box titled
`Looking for feature-specific help?` lists five topics whose troubleshooting lives
in the feature docs instead: `Calendar issues`, `Custom domain issues`,
`Sharing issues`, `Subscription issues`, `Whiteboard migration`. **Telling the
user what is deliberately *not* on this page**, at the top, prevents the fruitless
scroll.

**Support SLA and intake, stated** `[observed]`:
"We typically respond within **24–48 hours on business days**, and often much
sooner. More complex issues may take a little longer to investigate, but we'll
always keep you posted." Then a `Tip` callout titled
`Help us help you faster` with a five-item intake list.

## T8 Empty states

`[absent]` as observed in-product strings. No empty-state copy was quoted in any
harvested page.

Three adjacent findings worth recording:

- **`Recently Deleted folder disappeared` documents the *disappearance of a
  container*, which is an empty-state-adjacent failure** `[documented]`. Two
  causes given: the deleted documents are older than 30 days, or the folder's
  content was emptied manually. The retention window is disclosed as a number,
  and the article routes to `Storage and Recovery` rather than saying "sorry."
- **`Signing in with Apple opens an empty account`** (T7) is effectively an
  empty-state *incident* — the user sees a zero-document workspace and concludes
  their data is gone. Craft's handling (reassure in sentence two) is the right
  model for any accidental-empty-state.
- **`Temporary Profiles`** (T10) generate a random display name for unsigned
  collaborators — a "no identity yet" state handled by fabrication rather than by
  an empty label. The random name is not quoted.

A negative finding on the harvest side: three of four pricing FAQ answers and
four security-page sections rendered as **headings with no body**
(`Will my documents sync across devices?`, `Why might I see different prices in
different countries?`, `What happens to my documents if I switch plans?`;
`Data Encryption`, `Vendor Management`, `SOC 2 Certification`,
`GDPR Compliance`). To an unauthenticated crawler these are literal empty states
on the live marketing site.

## T9 Notifications & system messages

`[documented]`.

- **Reminder offsets** (see T5) are the notification-timing vocabulary:
  `In 20 minutes` · `In 1 hour` · `In 3 hours` · `Tomorrow` · `Next week` ·
  `Later`, plus `Remove reminder` and `Resolve reminder`.
- `Comments and Notifications` is a single docs article —
  "Collaborate with comments and stay informed with notifications on shared
  documents." Notification design is scoped to collaboration only.
- **Invitation email** `[documented]`: "The invitee will receive an email from
  Craft with a link to open the document immediately." `immediately` is the
  operative word — the invite email is a direct-access link, not a signup wall,
  consistent with the "viewing works without login" rule in T10.
- **In-app update banner** `[documented]`, Windows: Craft checks for updates in
  the background, "A banner appears in the app when a new version is ready, and
  the update is applied the next time you quit and reopen Craft." Microsoft Store
  installs get a banner "asking you to restart." Plus the trap:
  "Closing the window is not the same as quitting."
- **`Help Agent`** `[observed]` — an in-app AI support channel, surfaced in an
  `Info` callout titled with the user's question:
  `Can't find what you're looking for?` → ask the `Help Agent` in the Craft app
  (in the AI Assistant menu) or contact support. **An AI agent positioned as the
  step between docs and humans**, named as a distinct entity rather than as "chat."
- `Show Today's Tasks Count` — an opt-in sidebar badge, "It is off by default."
  Stating the default in the sentence that describes the setting.
- `Widgets` docs cover "Home Screen, desktop, or Lock Screen."

No toast or push strings observed. `[absent]` for verbatim notification copy
beyond the error strings in T7.

## T10 Disclosures, legal & compliance

**Access-level vocabulary — two roles, and two names for them** `[observed]`

| Level | Documented capability |
|---|---|
| `Viewer` | "Can read the document and add comments, but cannot make edits" |
| `Editor` | "Can make changes to the document content and structure" |

Both definitions are single sentences that state the capability **and its
boundary** (`but cannot make edits`). `content and structure` for Editor is
precise in a block-based product where reordering is as consequential as typing.

But the same two levels are labelled `Viewer` / `Editor` in the email-invite flow
and `View` / `Edit` in the link flow — **noun forms for people, verb forms for
links, documented as if interchangeable.** Defensible as a deliberate
part-of-speech split (a person *is* a viewer; a link *grants* view), but the docs
don't say so, and the two lists sit two paragraphs apart.

**The authentication asymmetry is disclosed in a titled callout** `[observed]`,
`Account Requirements`:

> "To **edit** a shared document, collaborators must sign in with a Craft
> account. However, **viewing** access works without requiring login."

**Friction is placed only where accountability is needed.** Read access has no
signup wall; write access does. Stating this as a titled requirement rather than
discovering it at the auth prompt is the right disclosure placement.

**The identity model is named, and its weakness is disclosed** `[observed]` —
`Temporary Profiles` vs `Permanent Profiles`:

> Summarised: someone who joins without signing in is assigned a random name for
> a temporary profile, and their comments and edits are tied to that identity. **A
> new temporary profile is generated whenever they refresh or reopen the
> document, "making it difficult to track who made specific changes."** If
> authorship tracking matters, ensure collaborators sign in and set their names.

This is a genuine attribution weakness — anonymous editors are unattributable
across sessions — and Craft states it plainly and then tells the user the
condition under which to avoid it. **Disclosing the accountability cost of your
own low-friction path** is the transferable move, and it is the honest half of the
"viewing works without login" convenience.

**Comment rights are stated as an invariant** `[observed]`:
"All collaborators — whether they have viewer or editor access — **can always
comment** on documents." Then, in an `Info` box titled `Disabling Comments`, the
only workaround: publish as a web link instead, because published pages have a
separate comments setting. **A permission that cannot be revoked, with the
architectural reason and the alternative path**, rather than silence.

**Capability absences, stated flatly** `[observed]`:

- `Folder Sharing` — "Currently, Craft does not support folder sharing.
  Collaboration is limited to individual documents, meaning you must share each
  document separately." A named section for a feature that doesn't exist, with the
  consequence spelled out.
- `Team vs. Individual Collaboration` — "You **do not need a Team plan** to
  collaborate on documents. You can share documents with anyone, even if they're
  not on your subscription plan." **Pre-empting an upsell the user might assume
  exists**, in bold, before listing what the paid tiers actually add
  (`Shared Spaces`, centralised billing, administrative controls, space-level
  team permissions).

**Published-page controls are the compliance-adjacent surface, and they are well
named** `[observed]`:

`Password Protection` — "Require a password to access the document. Only people
with the password can view the page."
`Email Domain Restriction` — "Limit access to specific email domains (e.g., only
`@yourcompany.com` addresses)"
`Expiration Date` — "Set a date when the link automatically becomes unavailable"
`Search Engine Indexing` — "Control whether search engines can index your
published page. **This is separate from the search option under Advanced Options,
which controls search within the page itself.**"

That last clarification is exactly the kind of near-miss disambiguation most
products omit — two settings both called "search," distinguished in the same
sentence. `Expiration Date` describes the *effect* ("automatically becomes
unavailable") rather than the mechanism.

Analytics are framed as `Privacy-Focused Analytics` — "Track engagement without
cookies or personal data collection." A privacy claim stated as the feature's
defining attribute rather than in a footnote.

**Security page** `[observed]`. `Organizational Security` opens by delegating the
principle to a linked artefact called `Note about Data` — and states the principle
in two parts: Craft does not sell data to third parties or use it for advertising,
and it puts effort into protecting data from unwanted access. Then a six-item
commitment list:

- Regular security training for all employees
- Continuous vulnerability scanning
- Regular third party penetration tests
- Data encryption at rest and in transit
- Security reviews at multiple stages of the software development lifecycle
- **"Should a data breach happen we will notify you within 72 hours of learning
  about it"**

The sixth item is the standout. Five items are about prevention; the sixth is a
**conditional commitment about failure**, with a number attached. Most security
pages list only controls. Publishing a breach-notification SLA in the same
bulleted list as "regular security training" — and phrasing it as `Should a data
breach happen`, admitting the possibility — is the most transferable line on the
page. (It maps to GDPR Art. 33 but is stated as a promise to the user, not as a
regulatory citation.)

`Data Encryption`, `Vendor Management`, `SOC 2 Certification`, and
`GDPR Compliance` appear as headings with **no body text rendered** — so the two
certifications a buyer would look for are named but unevidenced on the public
page. The page closes with `Request More Info`: "We're happy to provide additional
security and privacy compliance documentation upon request" → `Contact Customer
Support`. Compliance documentation is gated behind a request, which is normal for
enterprise, but the un-rendered sections make the public page weaker than it
presumably intends.

**Pricing disclosures** `[observed]`. Four plans: `Free` · `Plus` · `Family` ·
`Team`, with `Yearly` / `Monthly` toggle and struck-through monthly prices
(`$8.0` → `$6.4`, `$15.0` → `$12.0`). Plan descriptions are single sentences
naming the *unit of account*, which is the useful part:

- `Free` — "Start exploring. A complete experience for occasional use."
- `Plus` — "One account — full-featured, no content limit. Ideal for individual
  creators."
- `Family` — "Fixed-price bundle of 2 to 6 Plus accounts in a single
  subscription. Collaborate in a shared Space."
- `Team` — "Fixed-price with up to 10 Plus accounts in a single subscription.
  Collaborate in a shared Space."

`Fixed-price bundle of 2 to 6 Plus accounts` states the pricing *model* and the
*range* in one clause — no per-seat arithmetic. And the `Free` description leads
with `A complete experience`, which is generous framing for a 1,500-block cap.

Comparison-matrix rows: `Content limit` (`1500 blocks` / `Unlimited`),
`Storage`, `Media upload limit`, `Link-sharing`, `Version history`
(`7 days` / `30 days`), `Cross-device sync`, `Shared Space`
(`Not available` / `Available with Craft Family`), `AI assistant credits`
(`15 credits` / `50 credits/month`), `AI assistant model`
(`Core, Fast` / `Core, Fast, Max`), `API & MCP access`
(`100 requests/min`, `20,000 blocks/min` — **identical on both tiers**).

Two notable choices. `Not available` is used as an explicit cell value rather
than a blank, so the absence is stated. And the AI models are named by
capability tier — `Core`, `Fast`, `Max` — **abstracted away from the underlying
vendor models**, so pricing copy survives a model swap. `AI assistant credits`
also differ in *kind* between tiers: `15 credits` (one-off, no period) vs
`50 credits/month` (recurring). The free tier's credits are a trial allowance and
the unit label doesn't say so.

**A serious plan-naming inconsistency across surfaces** `[observed]`, and it is
the most consequential content defect in this file. Within the harvested set,
the tiers are referred to as:

- Pricing page: `Free` · `Plus` · `Family` · `Team`
- Sharing docs: "`Starter (Free)`" for the free tier, and "the **Plus** or
  **Pro** plans" for individuals, and "the **Family, Team, or Business** plans"
  for collaboration
- Publishing docs: "Available on all plans including `Starter`" and
  "Requires `Plus` or higher plan"
- Docs index: a `Pro vs Plus Comparison` article ("Compare the legacy Pro plan
  with the new Plus plan features") and a `Team Plans and Free Trial` article
- Marketing home: `Free` · `Plus`

So `Free` and `Starter` are the same tier under two names; `Pro` is a legacy tier
still cited as a current recommendation in the sharing article; and `Business` is
named in the sharing article but appears on no pricing surface. **Six tier names
for four tiers**, with the eligibility statements a user needs most (can I share?
can I publish? can I use a custom domain?) expressed in the inconsistent
vocabulary. The `Pro vs Plus Comparison` article's existence proves Craft knows
about the migration; the sharing doc simply wasn't updated.

**Enterprise routing** `[observed]`: `Bigger group?` → `Contact us` →
`mailto:viktor@craft.do`. A named individual's personal address as the sole
enterprise sales path. Charming at small scale, a single point of failure, and
inconsistent with the `Business` plan referenced elsewhere.

**Dogfooding as a disclosure surface** `[observed]`, and a genuinely interesting
finding: the marketing site's `Getting Started Guide` is **itself a published
Craft document** (`craft.do/s/gy4OMeABSTIlUw`), as is the `Note about Data` linked
from the security page (`documents.craft.me/...`). The Getting Started page's meta
tags expose the publishing feature flags in plain text, including
`disable-fs: fs-add-comment,fs-view-comment,fs-object-links,fs-show-author,fs-show-duplicate-as-template`
and `enable-fs: fs-show-title,fs-show-watermark,fs-enable-column-view`.

Two content-design observations. (1) Publishing your own onboarding guide *with*
your publishing feature is the strongest possible demonstration of the
`Share and Publish` pillar — the artefact is the proof. (2) The feature-flag
names leak the publishing model's full option set (`fs-show-author`,
`fs-show-watermark`, `fs-show-duplicate-as-template`) including options not
documented in the `Publishing Documents` article — `Duplicate as template` and
`Show author` are real published-page controls that the help centre does not list.

## T11 Help-centre architecture

**Mintlify-hosted, markdown-native, with a published machine index.** The
single most distinctive structural fact about Craft's help centre is that it
serves raw markdown to `text/markdown` requests and ships an `llms.txt` at a
discoverable path, prefaced on **every page** with:

> "## Documentation Index — Fetch the complete documentation index at:
> https://craft-support.mintlify.site/llms.txt — Use this file to discover all
> available pages before exploring further."

169 English pages, each with a title and a one-line description, plus eleven
further language indexes at 169 pages each (≈2,028 localised pages). For a
content designer this is the most auditable help centre in the corpus: the entire
IA, every title, and every meta-description are inspectable in one request.
**Publishing your own IA as a machine-readable index** is both an AI-era
distribution decision and, incidentally, a content-governance gift.

**Article-title grammar — five shapes, and descriptions do heavy lifting**
`[observed]`:

| Shape | Examples |
|---|---|
| Gerund phrase | `Publishing Documents`, `Sharing Documents`, `Creating Your Account`, `Deleting Your Account`, `Working with Spaces`, `Working Offline`, `Recovering Deleted Content`, `Using Craft Assistant`, `Editing with Craft Assistant`, `Reporting bugs` |
| `<Verb> <object>` | `Change Profile Photo`, `Change Account Name`, `Rename Spaces`, `Check Storage Usage`, `Cancel Subscription`, `Update Payment Method`, `Apply` (in descriptions), `Move to Craft` |
| `Import from <competitor>` | 10 articles: `Notion`, `Evernote`, `Quip`, `Google Docs`, `Obsidian`, `Bear`, `Apple Notes`, `OneNote`, `Roam Research`, `Anytype` |
| Bare noun topic | `Tags`, `Spaces`, `Teams`, `Collections`, `Reminders`, `Widgets`, `Billing`, `Media`, `Code`, `Tables`, `Whiteboards`, `Drawings`, `Templates` |
| Feature-with-qualifier | `Gallery View for Collections`, `Kanban View for Collections`, `Using Collections on iOS`, `Back Tap Integration`, `Indent Depth Limits` |

**No question-form titles at all** in 169 pages, and no first-person titles. All
the user-voice phrasing lives one level down, in the troubleshooting **accordion**
titles (T7) — so Craft separates *navigational* titles (system-object, scannable)
from *diagnostic* titles (symptom-first, findable). That split is deliberate and
worth naming: **titles for browsing, accordions for panicking.**

**Every page carries a one-line description and they are consistently
task-framed** `[observed]`. Examples that show the discipline:

- `Indent Depth Limits` — "Understanding the **5-level indentation limit designed
  for mobile readability** and document structure." A constraint article whose
  description supplies the *rationale*, so the limit reads as a decision rather
  than a bug.
- `Spell Check and Corrections` — "Configure spell checking in **34 languages**"
- `Troubleshooting Version History` — "**Common reasons why you might not see** a
  previous version of your document." A troubleshooting description written as
  the user's suspicion.
- `Refund Policy` — "How refunds work at Craft: **eligibility windows**, where to
  request one based on where you subscribed, and **cases we always refund**."
  Three-part scope including a commitment.
- `Connect to AI Providers` — "Use your **own OpenAI or Anthropic credentials**,
  or your Setapp AI credits, with Craft Assistant instead of Craft AI credits."
- `Working Offline` — "Offline editing works across all platforms with automatic
  syncing."

The descriptions are where Craft's content quality is highest and most
consistent — better than the marketing headlines, better than the CTAs.

**Structural furniture on every docs page** `[observed]`: an H1, a blockquote
description, `CardGroup` navigation with per-card scope lines, typed callouts,
`Tabs` for platform forks, `Steps` for procedures, `AccordionGroup` for symptom
lists, an optional `Troubleshooting` section, a `Related articles` card group, and
a `Still need help?` closer.

**The callout taxonomy is used with discipline** `[observed]` — five types, and
**the title is the message** rather than the type name:
`Info` (`Diagnostics is available on Mac, iPhone, and iPad only`,
`Account Requirements`, `About @privaterelay.appleid.com`,
`Completed tasks keep their scheduled date`, `Getting Things Done`,
`Navigation`, `Disabling Comments`, `Context-aware commands`),
`Warning` (`Reset Sync Now discards unsynced changes`, `Important`,
`Keyboard customization`),
`Tip` (`Help us help you faster`),
`Quick Tip`, and `Note`-equivalents.

Titling a callout with its own content — `Reset Sync Now discards unsynced
changes` rather than `Warning` — means a user skimming only bold text still gets
the warning. That is the most copyable convention in this file.

**Routing furniture** `[observed]`: docs home → search-first (`Search tips`
section) → six card groups → `Popular articles` (six named, each with a purpose
clause) → `Can't find what you're looking for?` → `Help Agent` in-app → support
team. Every article ends in `Still need help?` with two cards:
`Contact Support` (Zendesk form) and `Getting Help`.

The **escalation ladder is four rungs and each is named**: docs → `Help Agent`
(in-app AI) → `support@craft.do` / support form → community. The
`Contact options at a glance` table on the help page maps four needs to four
channels explicitly:

| Need (verbatim) | Channel |
|---|---|
| `Technical support / something is broken` | Email or support form |
| `Report a bug` | Email with reproduction details |
| `Feature request` | Email or community |
| `General feedback` | Feedback form |

`something is broken` in plain language beside the formal label is a small,
good choice. And `What makes a great feature request` (an `Info` box listing what
to include: goal, current workaround, real examples, platform) **coaches the user
to write a useful request** rather than just collecting one.

## T12 FAQs

`[partial]`. Two FAQ surfaces:

**1. Pricing page, section headed `Common Questions`** `[observed]` — four
questions, of which only the first rendered an answer:

| # | Question (verbatim) | Answer |
|---|---|---|
| 1 | How does the Free plan work? | Rendered. Summarised: up to 1,500 blocks across all documents, 1 GB storage, and all essential features — "perfect for exploring **without pressure to upgrade**" |
| 2 | Will my documents sync across devices? | Not rendered |
| 3 | Why might I see different prices in different countries? | Not rendered |
| 4 | What happens to my documents if I switch plans? | Not rendered |

**Structural notes.** Four questions, and the selection is telling: one on the
free tier's shape, one on the core technical anxiety (sync), one on
**geographic price variance**, and one on **data survival across a plan change**.
Q3 and Q4 are the two questions a prospect actually hesitates on and most pricing
FAQs omit. Q4 in particular — what happens to my documents if I downgrade — is
the question a 1,500-block cap makes urgent, and asking it out loud on the
pricing page is a confidence move.

`Common Questions` rather than `Frequently Asked Questions` or `FAQ` is a small
register choice: it claims the questions are *shared* rather than *frequent*,
which is less institutional.

Q1's answer ends on "without pressure to upgrade" — an explicit disavowal of
pressure inside a pricing page whose purpose is to apply it.

**2. Troubleshooting accordions** — 25 items, covered in T7. These are the real
FAQ: symptom-titled, user-voiced, and answered in full.

**3. `Refund Policy`** `[documented]` — not retrieved as a page, but its
description declares a three-part structure including "**cases we always
refund**." A stated always-refund category is an unusual commitment to publish.

No marketing-home FAQ block. `[absent]`

## T13 Terminology & glossary

| Term | Craft's usage | The alternative it rejected |
|---|---|---|
| `block` | The atomic unit; also the billing unit (`1500 blocks`) and the API rate unit (`20,000 blocks/min`) | "element", "node", "paragraph" |
| `Space` | Top-level container; "Your space" is also the hero headline | "Workspace", "Vault", "Notebook" |
| `Shared Space` | The paid collaborative container | "Team workspace" |
| `Page` | A nested document *and* a block style in the slash menu | "sub-page", "child doc" |
| `Card` | A block style that renders a page visually | "preview", "tile" |
| `Collection` | Database-style structured content, with `Table` / `Gallery` / `Kanban` views | "Database" (Notion's term), "Table" |
| `Daily Notes` | Auto-created dated pages | "Journal", "Log" |
| `Whiteboard` | Infinite canvas, distinct from `Drawings` and `Excalidraw` | "Canvas", "Board" |
| `Backlinks` | Automatic reverse links | "Linked references", "Mentions" |
| `Deeplinks` | Links that open in the app | "app links", "URL scheme" (used separately) |
| `Quick Open` | Keyboard-driven navigation (`Cmd+O`) | "Command palette", "Jump to" |
| `Quick Entry` | Mac panel for capture "from anywhere" | "Global capture", "Scratchpad" |
| `Quick Actions` | iOS quick-add button | — |
| `Slash Menu` | The `/` command surface, named as a feature with its own article | "Insert menu", "block menu" |
| `Craft Assistant` / `AI Assistant` | **Two names for the AI** in the same docs tree | — |
| `Help Agent` | The in-app AI support channel, distinct from `Craft Assistant` | "chat support", "AI help" |
| `Core` / `Fast` / `Max` | AI model capability tiers, vendor-abstracted | "GPT-4o", "Sonnet", "Turbo" |
| `credits` | The AI usage unit | "tokens", "messages", "queries" |
| `schedule` / `deadline` / `reminder` | **Three distinct date types on one task**, named separately | one "due date" |
| `repeat rule` | The recurrence object | "recurring", "RRULE" |
| `open` / `done` / `cancelled` | The three checkbox states | "todo/complete", "open/closed" |
| `Logbook` | Completed Inbox tasks | "Done", "Archive", "History" |
| `Recently Deleted` | The 30-day recovery folder | "Trash", "Bin" |
| `Secret Link` | An access mechanism for emailed exports | "private link", "unlisted link" |
| `Temporary Profile` / `Permanent Profile` | The two collaborator identity states | "guest" / "member" |
| `Craft Domain` | The `yourname.craft.me` subdomain | "vanity URL" |
| `External Locations` / `External Storage` | **Two names** for local/iCloud-stored spaces | "local vault" |
| `Keep on Device Folders` | Offline-pinned folders | "offline availability", "pin" |
| `Washi tape separators` | A decorative separator style, named after the stationery | "divider", "rule" |
| `Focus` | A block decoration | — |
| `Imagine` | Nav label for the MCP/API/build surface | "Integrations", "Developers", "Extend" |
| `Craft in Action` | The use-cases docs group | "Customer stories", "Use cases" |
| `Diagnostics` | The named sync-status panel | "Sync status", "Advanced" |

**Four observations.**

**`block` is doing three unrelated jobs** — the editorial atom, the billing unit,
and the API throughput unit. That is elegant (the product's unit of value is its
unit of price) and risky: a user who has never counted blocks must understand the
concept to evaluate the free tier, and `1500 blocks` is an opaque quantity at the
moment of purchase. The pricing page does not gloss it.

**`Washi tape separators`** is the most charming term in the corpus — naming a
divider style after Japanese decorative masking tape. It tells you exactly who
Craft thinks its user is (the stationery-adjacent, aesthetically motivated note
taker) and it is completely unsearchable by anyone who doesn't already know the
word. A deliberate trade of findability for identity.

**Craft, Things, and Todoist independently converge on the same three vocabulary
decisions**: a separate `deadline` distinct from a schedule date, a `cancelled`
state distinct from `done`, and a `Logbook` for completed work. Three products
with no shared lineage arriving at the same three words is strong evidence these
are the *correct* distinctions for task content, not stylistic preferences. Craft
goes furthest by naming three date types on one object (`schedule`, `deadline`,
`reminder`) and explaining the difference in a dedicated article
(`Dates, deadlines & reminders` — "Learn how schedules and deadlines differ").

**Two terms have two names each**: `Craft Assistant` / `AI Assistant`, and
`External Locations` / `External Storage`. Plus the six-name plan problem in T10.
For a docs set this disciplined, the naming collisions cluster specifically around
the newest features (AI) and the most-migrated ones (plans, storage).

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the
company, with unusually frequent and warm use of "we" in the docs: "We're here to
help", "we'd love your help tracking it down", "we want to see it",
"we'll always keep you posted", "**Use it only when support asks you to**",
"At Craft, documents are at the heart of everything we do",
"**we believe your data is your property**". The company is a present, first-person
actor in the failure paths specifically — which is where most products go passive.

**Register: the docs are the best-written surface, and they are notably *plainer*
than the marketing.** Marketing reaches for the aspirational (`big ideas`,
`your everyday creative home`, `documents you're proud to share`); docs are
concrete and mechanism-first ("File uploads run separately from document sync",
"the version on our servers is kept"). The gap is wide enough to read as
different authorship, and the docs win.

**The house sentence shape in docs is: state the mechanism, then the
consequence.** "Because a task is a block like any other, it can hold more than a
title." / "Craft retries a failed upload up to three times and then stops." /
"Closing the window is not the same as quitting." / "Cancelling keeps a record
that dropping the task was a deliberate choice, rather than deleting it
outright." Causal connectives (`because`, `so`, `rather than`) appear constantly,
which is why the docs feel explanatory rather than procedural.

**Exclamation marks are rare and confined to onboarding**:
`Welcome to Craft!` (twice), "This is one of the most useful shortcuts to learn
first!", "See what you can do!" Absent from troubleshooting, security, sharing,
and pricing. Same stakes gradient as the other four products.

**Bold is used semantically, not decoratively.** UI element names are bold
throughout (`Settings → Diagnostics`, `Sync Now`, `Continue with Apple`,
`Select`), and the one place bold is used for emphasis is in disclaimers —
"You **do not need a Team plan**", "Enter the password of your **macOS user
account**, not the password for your Apple ID." Reserving emphasis for negation
and correction is a defensible convention.

**Menu paths use arrow notation consistently**:
`Settings → Diagnostics`, `Settings → Account → Sign Out`,
`Settings → Account → Email Address → Continue with Apple`,
`System Settings → Privacy & Security → Accessibility`,
`Go → Go to Folder`. Platform-native separators throughout.

**Accessibility content** `[observed]`

- **Good:** documentation images carry **genuinely descriptive, purpose-stating
  alt text** — the best in this corpus. Examples:
  "The Diagnostics Settings panel in Craft showing sync status, troubleshooting
  links, sync history, and the Reset Sync option" ·
  "The slash menu open in a Craft document, showing commands such as Assistant,
  List, Text Style, Actions, and Color" ·
  "The slash menu inside a table showing Insert Formula, Insert Column(s) Before,
  Insert Column(s) After, Insert Row(s) Before, and Insert Row(s) After" ·
  "Share invitation screen showing email input and role selection" ·
  "Temporary profile showing random generated name" ·
  "Multi-select on iOS with the bulk actions menu open" ·
  "The Tasks view with the Inbox, Today, Upcoming, and All tabs".
  These name the *specific options visible*, so a non-sighted reader gets the
  same command inventory a sighted reader gets from the screenshot. This is the
  standard to cite.
- **Good:** keyboard-first operation is documented as a first-class path, not an
  accommodation. The slash menu's full keyboard navigation is spelled out
  (`Up`/`Down` to move, `Right` to open a submenu, `Left` to go back, `Enter` to
  run), `Cmd+O` is nominated as the first shortcut to learn, and there is a
  dedicated `Keyboard Shortcuts` article.
- **Good:** `Indent Depth Limits` — a 5-level indentation cap "designed for
  **mobile readability** and document structure." A constraint imposed *for*
  legibility, with the rationale in the article description.
- **Good:** platform forks are real `Tabs` with genuinely different instructions,
  and cross-platform gaps are disclosed in the callout *title*
  (`Diagnostics is available on Mac, iPhone, and iPad only`).
- **Good:** `Spell Check and Corrections` in 34 languages; docs localised into 12
  languages at 169 pages each.
- **Defect:** the marketing home page's persona strip **repeats its nine entries
  approximately four times** in the DOM (carousel duplication), and the `Write`
  pillar's headline, body, and feature chips appear twice. A text extractor sees
  ~30 persona entries; assistive tech may too.
- **Defect:** several marketing-home images have **no alt text at all** in the
  retrieved markup, and the pricing page's decorative textures
  (`paper-texture`, `cloud`, `paper-notebook`) carry a mix of
  `alt="Paper texture"` (decorative image given descriptive alt — should be
  empty) and empty alt. The award badges carry their award names as alt *and*
  render the same words as adjacent text, so they double.
- **Defect:** `Learn more` × 4 unqualified on the home page (T3).
- **Defect:** the footer's `Contact Support` and the security page's
  `Contact Customer Support` both resolve to `mailto:feedback@craft.do`, while the
  docs explicitly route support to `support@craft.do` and reserve
  `feedback@craft.do` for feature requests and general feedback. **Two of three
  public "contact support" links send support requests to the feedback inbox.**
- **Defect:** three of four pricing FAQ answers and four security-page section
  bodies do not render to an unauthenticated fetch, including
  `SOC 2 Certification` and `GDPR Compliance`.

**Negative findings, recorded honestly**

1. **Six tier names for four tiers** across pricing, sharing docs, publishing
   docs, and the docs index: `Free`/`Starter`, `Plus`, `Pro` (legacy, still cited
   as current), `Family`, `Team`, `Business` (named in docs, absent from pricing).
   Eligibility statements users depend on are written in the inconsistent
   vocabulary.
2. `Contact Support` → `feedback@craft.do` in footer and on the security page,
   contradicting the docs' own routing table.
3. `Try Craft Free` / `Sign up` / `Get Started` — three CTA labels for one signup
   funnel, two of them on the same pricing page.
4. `Explore community templates` vs `Explore templates` — two labels, one
   destination, one page.
5. `Learn more` × 4, bare, on the home page.
6. Marketing pillar `Customize` vs docs category `Share and Publish` — the two
   surfaces disagree on the product's fourth quarter, and sharing (the benchmark
   strength) has no marketing pillar.
7. `Craft Assistant` vs `AI Assistant`; `External Locations` vs
   `External Storage` — two names each.
8. `Viewer`/`Editor` vs `View`/`Edit` for the same two access levels, documented
   two paragraphs apart without acknowledgement.
9. Checkbox states documented as `open`/`done`/`cancelled` but actioned as
   `Mark as Completed`/`Mark as Cancelled`/`Mark as Uncomplete`. `Mark as
   Uncomplete` is awkward where `open` existed.
10. `Clear schedule`/`Clear deadline` vs `Remove reminder` — different verbs for
    structurally identical removals.
11. Slash-menu casing mixes Title Case (`Table Collection`,
    `Insert Row(s) Before`) and sentence case (`Move row up`, `Delete row`) in one
    menu.
12. `&` vs `and` used interchangeably at the same IA level
    (`Write & Edit` in the index, `Write and Edit` as the H1).
13. Title Case breaks sentence-case convention on
    `Structure That Adapts to Your Thinking` and
    `Choose The Plan That's Right For You` (with `The` capitalised).
14. `Craft in Action` is an IA group containing exactly one page of the same name.
15. The footer's `Community` column contains four learning resources and no
    community.
16. Enterprise sales routes to one named individual's personal mailbox
    (`viktor@craft.do`) while a `Business` plan is referenced in docs.
17. `1500 blocks` is the free tier's defining limit and `block` is never glossed
    on the pricing page.
18. The competitor cost stack (`Other apps total $46/month`) names categories
    with prices but no vendors and no source.
19. `Strong` is both a text style and a separator weight; `Block` is both the
    atomic object and a decoration command.
20. Home-page persona strip and `Write` pillar duplicated in the DOM.

---

## Transferable patterns

1. **Title the callout with the warning, not with "Warning."**
   `Reset Sync Now discards unsynced changes` ·
   `Diagnostics is available on Mac, iPhone, and iPad only` ·
   `Completed tasks keep their scheduled date`. A reader who skims only bold
   headings still receives the message. Near-zero cost, applies to every
   documentation and in-product callout system. Condition: the title must be a
   complete claim, not a topic.
2. **Repeat a destructive-action warning at the point of temptation, and name the
   asymmetry.** "Do not use **Reset Sync Now** to look for missing content. It
   discards local changes that have not uploaded yet, which can turn a display
   problem into permanent data loss." The warning lives both at the control *and*
   inside the specific symptom article where a panicking user would reach for it.
   The phrase *turn a display problem into permanent data loss* is the model:
   name the user's actual situation, the action's real effect, and the gap between
   them.
3. **Grade sibling actions by risk, explicitly, in the same sentence.**
   "**Sync Now** and **Report Sync Error** are safe to use at any time.
   **Reset Sync Now** discards…" Three controls in one panel, with the safe ones
   declared safe so the dangerous one's warning carries weight. Directly
   applicable to any destructive/non-destructive control cluster — cancel vs
   refund vs reverse, close vs delete vs purge.
4. **Publish the conflict-resolution rule and the retry count.** "When two
   devices change the same part of the same block before they have synced, the
   version on our servers is kept." / "Craft retries a failed upload up to three
   times and then stops." Naming the mechanism converts "the app ate my work" into
   a predictable system with a workaround, and a published retry count tells the
   user when waiting is futile. Transfers to payment retries, webhook delivery,
   and any last-writer-wins merge.
5. **Reassure before explaining, in failure copy.** In the Apple-sign-in article,
   "Your content is safe in the original account." lands before any instruction.
   Then cause, then remedy, then the remedy's three failure conditions, then the
   hard wall (`Accounts cannot be merged`) with an escalation path. Sequence:
   reassure → explain → instruct → bound → admit.
6. **Disclose the accountability cost of your own convenience.** Viewing without
   login is frictionless; Craft then states that anonymous collaborators get a new
   random identity on every reload, "making it difficult to track who made
   specific changes," and names the condition for avoiding it. Applies wherever a
   guest/unauthenticated path trades attribution for speed.
7. **Publish a breach-notification commitment alongside your security controls.**
   "Should a data breach happen we will notify you within 72 hours of learning
   about it" — a conditional promise with a number, sitting in the same bulleted
   list as prevention measures. Admitting the possibility is what makes the
   controls credible.
8. **Name a permission by who, what, and to what.**
   `Visitors Can Follow Block Links` over "Allow deep links."
   `Email Domain Restriction` with its example (`only @yourcompany.com
   addresses`). And disambiguate near-miss settings in the same sentence —
   `Search Engine Indexing` explicitly separated from the in-page search option.
9. **Verb-pair IA.** `Write and Edit` · `Plan and Do` · `Organize and Find` ·
   `Share and Publish` — four categories, eight verbs, one grammatical frame, with
   the second verb naming the completion half of the first. Any user task maps to
   one of eight verbs. Condition: marketing and docs must agree on the pairs;
   Craft's don't, and sharing pays for it.
10. **In a migration index, state per source both the mechanism and the
    fidelity.** "directly into Craft — no file export needed" vs "by exporting
    them from the Evernote desktop app" vs "with backlinks." Eleven named
    competitors, each with effort and what-survives disclosed in the article
    description so the user can judge before clicking.
11. **Disclose the vendor's triage policy.** `What happens after you report` —
    one-off issues are logged and monitored; reproducible bugs are escalated. The
    reporter learns what silence means. Almost nobody publishes this and it costs
    nothing.
12. **Coach the request you want to receive.** `What makes a great feature
    request` (goal, current workaround, real examples, platform) and
    `Help us help you faster` (five intake items). Shape the input instead of
    complaining about it.
13. **Use other people's document titles as the value prop.** For a
    general-purpose tool with no single use case, nine named users with their
    actual files — `wardrobe notes`, `daily sparks`, `personal wiki`,
    `List of goals` — beat any feature list. Paired with the concession
    `Craft isn't just for one thing, it's for your things.`
14. **A granularity-curved option set with an unbounded escape.**
    `In 20 minutes` · `In 1 hour` · `In 3 hours` · `Tomorrow` · `Next week` ·
    `Later`. Fine near the present, coarse further out, ending in an option that
    requires no decision. Applies to snooze, follow-up, reminder, and
    defer-payment controls.
15. **Publish your IA as a machine-readable index.** An `llms.txt` with every
    page title and description, linked from every page. An AI-distribution
    decision that doubles as content governance — the whole help centre becomes
    auditable in one request, which is how the depth of this file was possible.
16. **Counter-example to steal against:** the six-name plan problem. `Free` and
    `Starter` for one tier, `Pro` cited as current while an article calls it
    legacy, `Business` documented but unpriced — all inside eligibility statements
    ("Requires Plus or higher") that users act on. Pair with the Craft security
    page's un-rendered `SOC 2 Certification` section as a case study in how
    migration debt and client-side rendering silently degrade the exact copy a
    buyer needs.

## Caveats & gaps

- **All in-product copy is `[documented]`, not `[observed]`.** Craft's help
  centre quotes in-product error strings verbatim more generously than most
  (`You Are Offline`, `Another Craft is already installed`,
  `Disk space is critically low`, `Couldn't save tab state`,
  `External location already added`, `Failed to fetch data`), which makes T6 and
  T7 unusually well evidenced — but these are quotations inside documentation, not
  observed UI. Screenshot alt text corroborates several. **T8 has no in-product
  empty-state string at all.**
- **Three of four pricing FAQ answers did not render** (`Will my documents sync
  across devices?`, `Why might I see different prices in different countries?`,
  `What happens to my documents if I switch plans?`). Questions are verbatim;
  answers unretrieved. An authenticated or JS-rendering pass is needed.
- **Four security-page section bodies did not render** — `Data Encryption`,
  `Vendor Management`, `SOC 2 Certification`, `GDPR Compliance`. The two
  certifications are named but their substance is unharvested, so T10's compliance
  coverage rests on the `Organizational Security` bullet list only.
- **The `Getting Started Guide` content was not retrieved.** It is a published
  Craft document requiring JavaScript; only its meta tags and feature flags were
  readable. Its copy — potentially the richest onboarding artefact on the site —
  is unharvested. The linked `Note about Data` (also a published Craft doc) was
  likewise not opened.
- **12 of 169 English docs pages were opened in full.** The complete IA, every
  title, and every one-line description are `[observed]` via `llms.txt`, which is
  why T11 and T13 are strong. But ~157 article *bodies* are unread, including
  every page in `AI Assistant`, `Integrations`, `Collections`, `Account & Billing`,
  `Import & Export`, and most of `Write & Edit`. Notably unharvested and likely
  high-value: `Refund Policy` ("cases we always refund"), `MCP Security`,
  `Document Locking and Protection`, `Encryption and Data Protection`,
  `Teams`, `Team Collaboration`, `Recovering Deleted Content`,
  `Comments and Notifications`.
- **Localisation not assessed.** 11 non-English indexes at 169 pages each are
  declared; none was sampled. The English marketing site offers no locale
  switcher beyond `English`, so the docs are localised well ahead of the
  marketing surface — a divergence worth a dedicated pass.
- **Plan facts in this file are internally contradictory because the source is.**
  Where the pricing page and the docs disagree on tier names or entitlements, both
  are recorded (T10) rather than reconciled. Do not cite Craft plan names from
  this file without re-verifying against the live pricing page.
- **The competitor cost stack** (`Notes $10/month`, `Other apps total $46/month`)
  is reproduced as observed marketing copy. It names no vendors and cites no
  source; treat as a claim, not a fact.
- **Customer testimonials** (Tom, Amity Sensei, Deanna, Leo) are reproduced by
  Craft as user quotations. They are referenced here, not quoted at length, and
  are not treated as Craft's own voice.
- **No published design system or content style guide found.** The consistency of
  the callout titling, page descriptions, and alt text strongly implies a written
  internal standard, but none is public. T14 is reconstructed from observed copy.
- **No status or incident page found.** `Product Releases` (`/whats-new`) exists
  in the footer and was not harvested; no uptime or incident-communication surface
  surfaced at all, in contrast to Todoist and Dropbox.

## Sources

1. https://www.craft.do/
2. https://www.craft.do/pricing
3. https://www.craft.do/security
4. https://www.craft.do/getting-started (meta and feature flags only; body requires JS)
5. https://support.craft.do/
6. https://craft-support.mintlify.site/llms.txt
7. https://support.craft.do/en/introduction
8. https://support.craft.do/en/introduction/slash-menu
9. https://support.craft.do/en/introduction/troubleshooting
10. https://support.craft.do/en/introduction/help
11. https://support.craft.do/en/share-and-publish
12. https://support.craft.do/en/share-and-publish/share
13. https://support.craft.do/en/share-and-publish/publish
14. https://support.craft.do/en/plan-and-do/tasks
15. https://support.craft.do/en/plan-and-do/tasks/completing-and-editing-tasks
