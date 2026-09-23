# 010. monday.com

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Work OS / CRM-adjacent multi-product work platform |
| Corpus rank | 010 |
| Primary URL | https://monday.com/ |
| Benchmark strength (source list) | Workflow templates and statuses |
| Locale / market observed | en-US; help centre ships five further locales (de, es, fr, ja, pt) |
| Platform observed | Web (desktop), Zendesk help centre, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product copy. Footer badges on every page link to GDPR, ISO, SOC 2, and HIPAA pages; a separate `AI Trust Center` and `Trust Center` exist |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial — the pricing page was not fetched, so T10 has no plan, seat, or limit data. The accessibility statement was blocked at request time. Against that, this is the only product in the batch whose status page carried **live incident copy** |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://monday.com/ | Output exceeded the inline limit and was read from a persisted file (~1,550 lines); first ~720 lines read in full. Hero, agent catalogue, six audience tabs, form-state strings, data-bearing alt text |
| Help centre index | https://support.monday.com/hc/en-us | Product-first IA (6 products) over platform IA (6 topics); popular articles; support-routing block |
| Help category: Getting started | https://support.monday.com/hc/en-us/categories/12052126742418 | 9 sections, ~60 visible article titles, counts |
| Article: Glossary | https://support.monday.com/hc/en-us/articles/115005934045-Glossary | **~30 defined terms** across 6 named groups |
| Article: The Status Column | https://support.monday.com/hc/en-us/articles/360001269685-The-Status-Column | **The flagged-strength source** — label governance, "done" definition, deactivation, account defaults |
| Article: Using monday.com boards with screen readers | https://support.monday.com/hc/en-us/articles/33660661840530-Using-monday-com-boards-with-screen-readers | **Best accessibility content in the batch** — semantics, navigation tables, supported columns, five named limitations |
| Status page | https://status.monday.com/ | Four regions × 17 components; **three resolved incidents with full update threads** |
| Pricing | https://monday.com/pricing | **Not fetched** |
| Accessibility statement | https://monday.com/accessibility-statement | **Blocked** at request time |

---

## T1 Navigation & IA labels

**Global nav — three dropdowns plus four flat links** `[observed]`:
`AI platform` · `Solutions` · `Resources` · `Enterprise` · `Pricing` ·
`Log in` · `Contact sales` · `Get Started`.

The first nav item is `AI platform`, not `Product` or `Platform`. Like ClickUp,
monday.com has put the AI framing in the primary slot — but where ClickUp names a
*brand* (`Brain AI`), monday.com names a *category* (`AI platform`). The dropdown's
eyebrow makes the claim explicit:

> `ONE PLATFORM FOR ANY USE CASE`
> "Built for teams and agents working together"

**The `AI platform` dropdown has four labelled groups, and the group names are the
finding** `[observed]`:

| Group | Contents |
|---|---|
| (use cases) | `PMO` · `Marketing` · `Operations` · `IT` · `HR` · `Sales` · `Legal` → `View all use cases` |
| `The platform` | `Platform overview` · `Dashboards & reporting` · `Integrations` · `Automations` · `monday MCP` · `Our infrastructure` |
| `Products` | `monday work management` · `monday CRM` · `monday dev` · `monday campaigns` · `monday service` |
| `PLATFORM capabilities` | `AI agents` (3 items) · `Flexible workspace` (4) · `Connectivity & tools` (4) |

**Every use-case label carries a two-noun scope line**, and this is the tightest
IA copy in the batch:

`PMO` — "Projects & delivery" · `Marketing` — "Campaigns & creative" ·
`Operations` — "Processes & efficiency" · `IT` — "Tickets & support" ·
`HR` — "Hiring & onboarding" · `Sales` — "Pipeline & deals" ·
`Legal` — "Contracts & compliance".

Seven departments, seven two-noun pairs, ampersand-joined, no verbs, no full
stops. A reader can self-route on the pair alone, and the pairs name the
department's *artefacts* rather than its activities. Compare Airtable's
sentence-long benefit lines and Coda's occasion-based split; monday's is the
most scannable of the three.

**Products carry a `For <audience>` scope line** `[observed]`:
`monday work management` — "For projects & tasks" · `monday CRM` — "For
customer-facing teams" · `monday dev` — "For product & dev teams" ·
`monday campaigns` — "For email marketing teams" · `monday service` — "For IT &
support".

Five products, one construction. Note `monday service` renders with a trailing
space before the description in the extracted markup (`monday service For IT &
support`) — a small defect.

**`Our infrastructure`** is the standout nav label. It routes to `/w/mondaydb`
and appears again as `Our infra` in the mobile nav. A *database* promoted to
top-level navigation, in the first person plural, is unusual — and it is the
positioning move behind the `mondayDB` brand (see T13). The help centre echoes
it: the `Data, infra & security` category's scope line is "Drive your best work
with mondayDB infrastructure."

**The help centre is organised product-first, then platform-second** `[observed]`
— the only one in the batch to do this:

| Products (6) | Sub-entries, all four beginning `Get started` |
|---|---|
| `monday work management` | `Get Started` · `Manage your projects` · `Gantt & dependencies` · `Manage your portfolio` |
| `monday CRM` | `Get Started` · `Lead management` · `Communication` · `Integrations & AI` |
| `monday dev` | `Get Started` · `Sprint management` · `Integrations & apps` |
| `monday service` | `Get started` · `Customer portal` · `Managing tickets` · `Connect channels` |
| `WorkCanvas` | `Get started` · `Build your WorkCanvas` · `Administration` · `Integration` |
| `WorkForms` | `Get started` · `Customization` · `Settings` · `Analytics` |

**`Get Started` appears six times with two different casings** — title-cased for
work management, CRM, and dev; sentence-cased for service, WorkCanvas, and
WorkForms. A visible seam between two content-production waves.

| Platform topics (6) | Scope line (verbatim) |
|---|---|
| `Getting started` | "Everything you need to know to get started with monday.com" |
| `Reporting` | "Track progress and analyze your data with dashboards and views" |
| `Plans & billing` | "Manage your plan, subscription and billing" |
| `Connect & automate` | "Discover the power of apps, automations, integrations and AI" |
| `Profile & administration` | "Customize your profile and learn all things admin" |
| `Data, infra & security` | "Drive your best work with mondayDB infrastructure" |

`learn all things admin` is the one colloquialism in the set. `Data, infra &
security`'s line is the odd one — it markets the infrastructure rather than
describing the category's contents, so a user looking for a privacy setting has
no signal that they are in the right place.

**Two navigation defects worth recording** `[observed]`. In the help-centre
mega-menu, `Profile & administration` links to `/p/work-canvas` and
`Data, infra & security` links to `/p/work-forms` — **two platform categories
pointing at product landing pages.** The same two categories resolve correctly
(`/categories/115000834125` and `/categories/360000052449`) in the collapsed
mobile menu on the same page. And under `Reporting`, the sub-entries
`Board views` and `Widgets` both link to `#` — **dead links in the primary
help navigation.**

**`Getting started` category — nine sections** `[observed]`:
`Getting Started` (a section with the same name as its parent category, differing
only in casing) · `Create your first board` · `Board elements` (54+ articles) ·
`Connect your boards` · `Hierarchy & organization` · `Communication and
collaboration` · `Filters & navigation` · `Workdocs` · `File management`.

Note the parent/child name collision (`Getting started` → `Getting Started`) and
the inconsistent conjunction style within one list: `Hierarchy & organization`
and `Filters & navigation` use an ampersand while
`Communication and collaboration` spells it out — and the mega-menu renders that
same section as `Communicate & collaborate`, a third form. **One section, three
labels.**

**Footer** `[observed]`: an unusually large footer with `Features` ·
`monday products` · `More by monday.com` · `Use cases` · `Company` ·
`Resources`, plus a compliance badge row (GDPR / ISO / SOC / HIPAA) and a legal
strip: `Security` · `Terms and privacy` · `Privacy policy` ·
`Your privacy choices` · `Status` · `Accessibility statement`.

`More by monday.com` is a distinct group from `monday products` — WorkCanvas and
WorkForms are separated from the four core products and hosted on their own
domains (`workcanvas.com`, `workforms.com`). A product-portfolio boundary drawn
in the IA.

`Emergency Response` in the Company group, linking to `mondayert.org`, is the
unexpected entry — a company-run emergency-response organisation given a footer
slot beside `Careers` and `Affiliates`.

## T2 Value proposition & headline patterns

**Hero — the cleanest positioning statement in the batch** `[observed]`:

> `People and agents working as one team`
>
> "The AI workspace where people and agents drive business results together"

Then a second hero lower on the page:

> `You lead. Agents act.`
>
> "Where people and agents drive results together on one secure work platform"

**`You lead. Agents act.`** is four words, two sentences, and it resolves the
entire anxiety of the agentic-AI category: it assigns authority to the human and
execution to the machine, in parallel clauses of identical shape. Compare
ClickUp's `Software to replace all software` (unbounded) and Airtable's
`Other tools let you build with agents. Airtable lets you build with your whole
team — agents included.` (concession-then-reframe). monday's is the shortest and
the only one that answers "what is my role now?".

The hero is flanked by a checkmark list of seven audience tags
(`Marketing` · `Operations` · `IT` · `Product` · `Sales` · `HR` · `PMO`) and a
price qualifier:

> `No credit card needed ✦ Unlimited time on Free plan`

**`Unlimited time on Free plan`** is a better construction than "Free forever" —
it names the dimension that is unlimited (time) rather than making an absolute
claim, and it implicitly concedes that other dimensions are bounded. The `✦`
glyph as a separator is a typographic tic that will read badly aloud.

**The six audience tabs use a noun-triad-plus-past-participle headline, and this
is the single best headline pattern in the batch** `[observed]`:

| Tab | Headline (verbatim) | Supporting line |
|---|---|---|
| Marketing | `Posts, campaigns and ads. Done.` | "Marketing agents write posts, run campaigns, and drive insights while your team can focus on strategy." |
| IT | `Tickets, issues and risks. Resolved.` | "IT agents catch tickets, resolve issues, and escalate risks so your team can own the infrastructure." |
| Product | `Products and new features. Deployed.` | "Product agents turn feedback into features and help you ship fast, giving your people space to innovate." |
| Sales | `Leads, follow-ups and deals. Closed.` | "Sales agents find leads, send follow-ups, update the pipeline, and book meetings, so your people can seal the deal." |
| HR | `Roles, candidates and hires. Secured.` | "HR agents can post roles, screen candidates, and schedule interviews letting your team focus on people." |
| PMO | `Plans, milestones and risks. Delivered.` | "PMO agents track tasks, flag blockers, and update stakeholders helping your team focus on execution." |

The formula: **three domain nouns, full stop, one past participle, full stop.**
Six instances, no deviation. The participle is chosen per domain from that
domain's own completion vocabulary — tickets are `Resolved`, deals are `Closed`,
features are `Deployed`, hires are `Secured`, plans are `Delivered`, content is
`Done`. That is six different words for "finished", each one the word the
audience already uses. **A content designer writing per-audience headlines could
lift this structure directly.**

And every supporting line follows one further rule: **agent verbs first, then
`so your team can` + a human verb.** The human is always given the higher-order
activity (strategy, innovation, ownership, sealing the deal, people, execution).
The division of labour is restated six times without ever being stated abstractly.

Note the defects: `HR agents can post roles` inserts a hedging `can` that the
other five omit, and two of the six drop the conjunction before the final
clause (`schedule interviews letting your team focus on people`,
`update stakeholders helping your team focus on execution`) where the other four
use `so`. Small, but the pattern's power comes from its rigidity.

**Agent-builder framing** `[observed]`:

> `Build an agent for your mission.`
> "Build agents for your exact needs. **Define the goal, set the rules, watch the
> results.**"

Three imperatives descending in effort — define, set, watch. The last verb is
passive by design: the user's final action is observation. That is the agentic
value proposition compressed into three words.

**Social proof is a single unadorned claim** `[observed]`:
`Trusted by over 60% of the Fortune 500`, rendered twice, above two logo rows
(Canva, Coca-Cola, Vistra, Universal, Holt Cat, Lionsgate, Carrefour, VML).
No percentage grid, no ROI study, no review scores — compare ClickUp's
fourteen-plus statistics. monday.com makes one number do all the work.

**Section headers are plain and repetitive** `[observed]`:
`Get more done with agents` · `An agent for every use case` ·
`Get more done with agents and people`. The first and third differ by two
words and sit on the same page, which reads as a template not fully filled in.

**Help-centre framing** `[observed]`:
`How can we help you?` / "Search our help center to find answers to your
questions" → then four shortcut chips (`Automations`, `Gantt`, `Workforms`,
`Dashboard`) → `Explore by product` → `Explore by topic` → `Popular articles` →
`Level up with academy lessons` → `Still have questions? We can help.`

`Still have questions? We can help.` is the routing header, and the two-sentence
construction (acknowledge, then commit) matches Coda's
`Feeling stuck? Let's fix that!` at lower volume.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Started` | Global nav, hero, every agent card, every audience tab | The dominant CTA — used ~20 times on the home page |
| `Get started` | Help-centre product sub-entries (3 of 6) | Casing drift against the above |
| `Continue with Google` | Inline signup block | Federated-auth option named |
| `Log in` | Global nav | |
| `Contact sales` | Global nav, footer | |
| `Contact us` | Footer | **Routes to `/help`** — a sales-adjacent label pointing at support |
| `Pricing` | Global nav, footer (twice) | |
| `View all use cases` | AI platform dropdown | |
| `Explore` | Help centre, each of six product cards | Bare `Explore`, six times, with an arrow glyph |
| `Learn more` | Help centre, each of six topic cards | Bare `Learn more`, six times |
| `Learn more` | Help-centre template promo | Seventh instance, different destination |
| `Start the lesson` | Academy cards (×4) | Names the artefact |
| `Chat support` | `Still have questions?` block | **Not a link in the extracted markup** — rendered as plain text beside two working links |
| `Community Forum` / `Community forum` | Same block, index vs article pages | **Casing differs between two pages of one help centre** |
| `Expert help` | Same block | |
| `Hire a monday.com expert` | Footer and resources | Longer variant of the above |
| `Show all` | Help category sections | Paired with `+ N articles` |
| `Get Tickets` | Event banner (Monday Elevate 2026) | |
| `Get certified` | Resources dropdown | |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `View historical uptime.` | Status page | Terminal full stop |
| `Yes` / `No` | Article foot, under `Is this article helpful?` | |
| `Edit Labels` · `Apply` · `Deactivate` · `Add label description` · `Customize Status column` · `Show column summary` | Documented in-product controls | See T5/T6 |

**Observations.** monday.com has the **most disciplined primary CTA in the
batch** — `Get Started` is used almost exclusively for acquisition, against
ClickUp's five variants and Airtable's four. The discipline breaks only on the
help centre, where three of six product cards say `Get started`.

Against that, the help-centre landing page ships **six bare `Explore` and seven
bare `Learn more` links**, all on one screen. Thirteen object-free CTAs in one
view is the weakest CTA density in the batch; the cards supply the object
visually, but a screen-reader user tabbing through links hears
"Explore, Explore, Explore, Explore, Explore, Explore, Learn more, Learn more…".

`Chat support` rendering as unlinked text in the `Still have questions?` block —
on both the index and the article pages — is a functional defect on the
primary human-support route.

## T4 Onboarding & getting-started

**Onboarding is forked by product before it is forked by task** `[observed]`.
The help centre's first-level choice is *which product you bought*
(`monday work management` / `CRM` / `dev` / `service` / `WorkCanvas` /
`WorkForms`), and each of the six opens with its own `Get started`. Only after
that does the platform-level `Getting started` category appear. For a
multi-product suite this is the correct order — the Trello/Airtable/Coda model
of one onboarding path does not survive five products sharing one object model.

**The platform-level `Getting started` category is ordered as a build sequence**
`[observed]`:

`Getting Started` → `Create your first board` → `Board elements` →
`Connect your boards` → `Hierarchy & organization` →
`Communication and collaboration` → `Filters & navigation` → `Workdocs` →
`File management`

Orient → build one → fill it → link it → organise many → add people → find
things → adjacent surfaces. Note that **`Connect your boards` comes fourth**,
before hierarchy — relational linking is taught as a core early skill rather
than as an advanced topic, which is a real statement about what the product is.

**`Create your first board` teaches the three board types before anything else**
`[observed]`: `The basics of a board` · `Shareable Boards` · `Private Boards` ·
`The difference between board types` · `How to duplicate a board` ·
`monday.com templates`.

Four of the six first-run articles are about **visibility**, and one is
explicitly titled `The difference between board types`. A product whose first
onboarding lesson is "who can see this" is making a defensible bet: the
irreversible mistake in a work platform is sharing something you shouldn't.
Compare Trello, which teaches board/list/card before permissions, and puts
governance at chapter 8 of 9.

**The glossary is positioned as onboarding** `[observed]` — it sits fifth in the
`Getting Started` section, between `Get started in an existing account` and
`How to invite users to join an account`, and opens:

> "New to monday.com? Welcome to the monday.com glossary of all the need-to-know
> terms needed to get started! **This will help you understand our jargon**;
> keep reading to learn more! ✍️"

**`our jargon`** is the word choice worth recording. Airtable's glossary is
written in neutral third person as reference; monday's opens by admitting the
product has jargon and framing the glossary as translation. That framing lowers
the reader's cost of not knowing — the terms are acknowledged as arbitrary rather
than presented as self-evident.

The glossary then routes onward with a `Tip:` block pointing at
`How to get started with monday.com` — so vocabulary and procedure cross-link at
the top of each other.

**Templates are surfaced as a persistent onboarding rail** `[observed]` — the
help-centre mega-menu carries a standing promo on every page:

> `Get started with ready-made templates` → `Learn more`

And the site nav distinguishes `AI template center` from `Solution templates`,
two separate template surfaces. `Solution templates` (rather than "Templates")
is a deliberate upgrade of the noun: a template is positioned as a *solution*,
which matches the `Work OS` framing.

**Academy is a named fourth learning surface** `[observed]`, with four lessons
promoted on the help-centre home, each with a one-line outcome:

- `Building workflows in monday.com` — "Learn our methodology for building
  workflows with ease"
- `Reporting in monday.com` — "Deep-dive into how to build effective reports"
- `Automate your workflows` — "An introduction to the world of monday
  Automations"
- `monday.com admins` — "A walkthrough of monday.com admin capabilities"

**`Learn our methodology`** is the notable phrase — monday.com claims to have a
*methodology* for workflow design and teaches it as a course. That is the same
instinct as ClickUp's `Hierarchy best practices` (prescriptive guidance for an
under-constrained product), escalated from an article to a curriculum.

Four named lesson formats sit alongside four named support formats, so the
learning estate is: help centre → Academy → Community → Video Tutorial →
Developer documentation → Expert (paid human). Six tiers, with the paid human
last.

## T5 Form & field labels

**Column types are the field system, and the screen-reader article publishes the
canonical list** `[observed]` — nineteen named column types:

`Name` · `Status` · `Text` · `Numbers` · `Date` · `Timeline` · `People` ·
`Dropdown` · `Formula` · `Label / Color` · `Board Relation (Mirror)` ·
`Long Text` · `Link` · `Checkbox` · `Email` · `Phone` · `Button` · `Rating` ·
`Vote`.

Three observations. `Board Relation (Mirror)` carries **two names in one label**
— the technical relationship and the product term — which is how a rename or a
dual-concept gets documented honestly. `Button` and `Vote` as *column types* is
unusual: a cell that is an action and a cell that is a poll. And `Label / Color`
is a type whose name is the slash-joined pair of what it stores and how it
renders.

Other column types named across the harvest: `Connect Boards Column` ·
`Mirror Column` · `Files Column` · `Progress Tracking Column` ·
`Formula Column`.

**Help-article titles follow a `The <X> Column` convention** `[observed]` —
`The Status Column`, `The Connect Boards Column`, `The Mirror Column`,
`The Formula Column`, `The Files Column`, `The Progress Tracking Column`. The
definite article plus title case makes each column a named thing rather than a
setting. Consistent across at least six instances.

**Documented in-product control labels** `[observed]`, from the Status Column
article:

`+` (add column, "in the far right of the board's column section") ·
`Status` (in the column-type dropdown) · `Edit Labels` ("button at the bottom") ·
`Apply` · `Add label description` · `Deactivate` ·
`Customize Status column` · `Show column summary` · `Settings` ·
`Administration` → `Customization` → `Boards` (the account-defaults path).

`Edit Labels` and `Apply` as the open/commit pair is worth noting — `Apply`
rather than `Save` or `Done`, which is correct for a settings panel whose changes
propagate.

**Consent and form-state microcopy, observed verbatim on the home page**
`[observed]`:

- `By proceeding, you agree to the Terms of Service and Privacy Policy` —
  **rendered twice** in the extracted markup (responsive duplicates)
- `Thank you! Your submission has been received!`
- `Oops! Something went wrong while submitting the form.`

The last two are the **only success and failure strings observed in this entire
five-product batch** on an unauthenticated surface. Both appear to be
platform defaults (the site is Webflow-built), and both are worth recording as
negative examples:

`Thank you! Your submission has been received!` says nothing about what happens
next, contains two exclamation marks across two sentences, and uses the passive
("has been received") where the active would be shorter.
`Oops! Something went wrong while submitting the form.` is the canonical bad
error string — `Oops!` (see Wise's deliberate avoidance of it),
`something went wrong` (no cause), and **no recovery action at all.** The user is
told a failure occurred and given nothing to do.

That these are un-customised framework defaults on the primary conversion form of
a company selling workflow software is the sharpest negative finding in this file.

**Board-name and consent defaults** `[observed]`: `Continue with Google` as the
federated option, with `Or` as the divider label.

**Documented empty-cell string** `[observed]`, from the screen-reader article:
"The content on an empty property will be a static **'no content'** text." — see
T8.

## T6 Status & state language

**The flagged strength, and monday.com is the only product in the batch that
ships a governance model for status labels rather than just a status feature.**

**The Status Column is framed as the product's central organising device**
`[observed]`:

> "Here at monday.com, we strive to give you an intuitive, visual platform that
> manages everything in one place. Our Status Column is a key factor in helping
> you plan, organize, and track all of your team's work according to status
> labels. Easily see if a task is yet to be completed, in progress, done, or any
> other status that you wish."

Note the three example states are given in lower case as descriptions
(`yet to be completed`, `in progress`, `done`) rather than as labels, then
immediately opened up (`or any other status that you wish`). monday.com, like
Trello, Airtable, and Coda, ships **no fixed workflow vocabulary** — but unlike
them, it ships rules for managing the vocabulary you invent.

**The label-governance rule set — six distinct rules, all user-facing**
`[observed]`:

**1. A capacity limit, published.** "You can have up to **40 status labels** with
different colors." Stated in the body, not in a limits table.

**2. A default-label convention, with a stated reason.**

> **Note:** "The gray label is the default label that appears when an item is
> created. **We recommend leaving the gray Status label blank, as assigning it a
> Status can cause confusion amongst your team.**"

This is the best single piece of status-design guidance in the batch. It
identifies the "no status yet" state as semantically distinct from every real
status, recommends leaving it unlabelled, and **gives the reason in terms of team
confusion** rather than in terms of data hygiene. A blank default forces the
first status change to be deliberate. Directly transferable to any
select-field design where an unset value would otherwise masquerade as a
meaningful one.

**3. Labels can carry their own definitions.**

> "You can also add a description to your labels to ensure that you align all
> users on the board with an understanding of the purpose and function of each
> label." → `Add label description` → an `i` icon appears → hover reveals it.

**A per-value tooltip for a status label is the feature most missing from every
other product in this batch.** It solves the actual problem with user-authored
statuses — that `In Review` means something different on every board — by giving
the board owner a place to define it, at the point of use, without a separate
document. The stated purpose is alignment, not documentation.

**4. Used labels cannot be deleted, only deactivated.**

> "Once a label is used in the board items, it cannot be deleted; however, you
> can deactivate labels that are no longer relevant or in use."
>
> **Note:** "Deactivated labels will not show up as options in the dropdown when
> assigning a label to an item. They will only appear as grayed out within the
> label settings."

A referential-integrity constraint explained as a user-facing concept, with the
exact consequence of the alternative spelled out in two clauses: gone from the
picker, visible in settings. This is how you retire a status without orphaning
historical data, and the copy explains both halves.

**5. "Done" is a configurable property, not a label.**

> `Define which labels are "done"` — "In each of your boards, you can choose the
> labels that define a Status as "done"… choose the **color or colors** you want
> to associate with "done" items."

Completion is a **many-to-one mapping from labels to a meta-state**, configured
per board, and — notably — keyed on *colour* rather than on label text. So
`Shipped`, `Published`, and `Approved` can all be "done" on different boards
without any of them being called Done. Compare ClickUp's `Done statuses` article
(same concept, named similarly) and Trello's single `complete` boolean.

The heading uses **quotation marks around "done"** throughout, marking it as a
term of art rather than a label — a small typographic discipline that keeps the
meta-state distinct from any actual label.

**6. Account-level defaults exist, and their propagation rule is published.**

> `Create default labels` (admin only) — "Stay aligned with your team and keep the
> same statuses across your boards by creating default Status labels for your
> monday.com account."
>
> **Note:** "**Changes made to the default board labels will not change any labels
> in your Status Columns that already exist.** The changes will only apply to the
> new Status Columns created in your boards."

Organisation-wide status standardisation as an admin feature, with the
retroactivity question — the one every admin asks — answered in a note attached
to the instruction. Stating that a governance change is *forward-only* prevents
both the false expectation and the panic.

**Status carries conversation** `[observed]`:

> `Communicate inside the Status box` — "To communicate on a specific Status,
> simply click the + sign located in the top right corner of any Status box…
> The Status Update will also be showcased in the item's Updates section!"
>
> **Note:** "If you change a Status label with an Update, the Update will
> disappear within the Status box, but will remain in the item's Updates
> section."

A comment attached to a *state*, not to the item — "why is this blocked?"
answered at the place the blockage is recorded. And the note documents the
state-change side effect precisely: the update detaches from the box but
persists in the feed. Publishing what happens to attached content when the state
it was attached to changes is exactly the disclosure most products omit.

**Actual status vocabulary, recovered from alt text** `[observed]` — and this is
a notable route. monday.com's home-page image alt text *names the statuses in the
screenshots*:

- "Kanban board showing Sprint Management tasks in columns: **Ready to start,
  In progress, Waiting, and Done**."
- "Deals pipeline Kanban board with columns for **New, Meeting, Proposal, and
  Won** stages showing company deals and values."
- "Portfolio dashboard showing projects, owners, **health status**, progress
  bars, and **priority levels**."
- "Q1 Campaigns dashboard with social and out-of-home campaign **statuses,
  priorities, and markets** shown."
- "Project dependencies and bottlenecks map showing tasks, **milestones, and
  critical path** with linked nodes and avatars."

`Ready to start` is the interesting one — not `To Do`, not `Backlog`, not
`Open`. It states readiness rather than position, which is a different
(and better) claim about a task. And `Waiting` as a peer of `In progress`
separates "being worked on" from "blocked", which most three-column boards
collapse.

**This is a direct and instructive contrast with ClickUp**, whose equivalent
status-template gallery carries alt text like `personal-job-hunt` and
`other-crm`. Same content problem, opposite outcome: monday.com's screenshots are
readable, ClickUp's are not. See T14.

**Agent-reported states** `[observed, marketing]`, from agent-card alt text:
`5 issues found and fixed` · `27 vendors added` · `95 tickets classified` ·
`45 incidents resolved` · `26 deals scored` · `10 proposals sent` ·
`278 resumes screened` · `12 interviews booked` · `8 due date notifications
sent` · `5 tasks are at risk` · `3 milestones were pushed` ·
`Q1 roadmap was updated` · `3 emerging trends identified` ·
`3 off-track goals caught` · `40 pricing changes tracked` ·
`8 anomalies detected` · `2 broken automations fixed` ·
`6 duplicate contacts merged` · `4 overdue reminders sent` ·
`3 automations recommended` · `12 weekly reports delivered` ·
`seven action items assigned` · `5 top-match vendors found`.

**Every agent reports in the same grammar: `<number> <object> <past
participle>`.** Twenty-plus instances. The agent never says what it is doing,
only what it has finished — which is the correct register for a delegated
worker, and the counterpart of the audience-tab headlines' past participles
(T2). One breaks the pattern (`5 tasks are at risk`, present tense) because it is
a finding rather than a completion, which is arguably correct. One spells the
numeral (`seven action items assigned`) against twenty-two that use digits.

**Status-page component states** `[observed]`:
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`, with the daily-log variants `had a major outage.` /
`had a partial outage.` and header `All Systems Operational`.

**monday.com is the only product in the batch to scope status by region**
`[observed]`. Four geographic groups — `US`, `EU`, `AUS`, `IL` — each carrying
the same 17 components (`Platform`, `Dashboards`, `Login / SSO`,
`Notifications`, `Search`, `Automations`, `Integrations`, `API`,
`Communication`, `Apps`, `monday workdocs`, `Files`, `Billing`,
`Other Functionalities`, `Support`, `Emails & Activities`, `Ai Functionality`),
plus a standalone `Datadog US1 APM` third-party row.

Region-scoped status matters because monday.com sells data residency, and it
paid off during this harvest: one of the live incidents was scoped to EU only
(see T9). Note two defects in the component list — `Ai Functionality` should be
`AI Functionality`, and `Other Functionalities` is a residue bucket sitting
between `Billing` and `Support` with no explanation of what falls into it.

## T7 Error, failure & recovery

**Two verbatim in-product failure strings, both from the home page's signup form**
`[observed]`:

> `Oops! Something went wrong while submitting the form.`

Analysed in T5. Recorded here as the only error string directly observed in this
batch and as a textbook example of what not to ship: an interjection, an
unnamed cause, and no recovery action.

**Live incident copy — the richest failure-communication evidence in the entire
corpus batch** `[observed]`. Three resolved incidents were visible. Full update
threads:

**Incident 1 — `Partial UI functionality degradation`** (Sep 17, 09:11–11:05 UTC)

| Stage | Copy (verbatim) |
|---|---|
| `Investigating` | "We're currently investigating an issue affecting some UI platform functionalities, including the Search functionality." |
| `Update` | "We are continuing to investigate this issue." |
| `Identified` | "The issue has been identified, and a fix is being implemented." |
| `Monitoring` | "A fix has been implemented to the UI Search functionality issue and we're monitoring the results." |
| `Resolved` | "The issue affecting UI platform functionalities, including the Search functionality, has been successfully resolved. **Please refresh your browser to resume regular service usage.** Thank you for your patience" |

**Incident 2 — `Issues with automations and integrations`** (Sep 17, 10:07–10:39)

| Stage | Copy (verbatim) |
|---|---|
| `Investigating` | "We are currently investigating issues related to our automations, integrations, and workflows failing/not working **in EU**. Automations and Workflows may appear as **broken/not running/won't load**." |
| `Monitoring` | "A fix has been implemented and we are monitoring results to ensure full stability with Automations, Workflows, and Integrations." |
| `Resolved` | "The issue with our automations, workflows, and integrations has been successfully resolved. Please refresh your browser to resume regular service usage. Thank you for your patience" |

**Incident 3 — `Investigating issues with Vibe app`** (Sep 9, 18:21–18:39)

| Stage | Copy (verbatim) |
|---|---|
| `Investigating` | "We are currently experiencing issues related to vibe applications. **Our dedicated team is working to resolve this as quickly as possible**" |
| `Identified` | "The issue has been identified and a fix is being implemented." |
| `Monitoring` | "A fix has been implemented and we are monitoring the results." |
| `Resolved` | "This incident has been resolved." |

**Analysis.** The five-stage vocabulary is
`Investigating` → `Update` → `Identified` → `Monitoring` → `Resolved`, bolded as
a prefix to each timestamped entry. Three things are genuinely good:

**Incident 2's symptom list is written in the user's language, with slashes.**
"Automations and Workflows may appear as broken/not running/won't load" — three
user-observable symptoms, one of them ungrammatical as a list item
(`won't load`), joined by slashes. It is ugly and it is the most useful sentence
in the three threads, because a user can match what they are seeing against it
and stop debugging.

**Both resolutions end with a user action, not just a status.**
"Please refresh your browser to resume regular service usage." Most resolved
notices say only that the issue is resolved; monday.com tells the user that
their own session may still be broken and what to do about it. That one sentence
is the difference between "fixed for us" and "fixed for you".

**Incident 2's scope is named in the first update** — "in EU". Geographic scoping
stated at `Investigating` stage, before anyone asks, and matching the
region-scoped component list (T6).

Weaknesses, recorded: **both resolution messages are missing a terminal full stop
after "Thank you for your patience"**, in two separate incidents — so it is a
template, not a typo. Incident 1's `Update` stage says only "We are continuing to
investigate this issue." with no new information, 5 minutes after the first
notice — a no-content update that consumes a notification. Incident 3's
`Investigating` message is also unpunctuated at the end and uses the filler
"Our dedicated team is working to resolve this as quickly as possible", which
tells the reader nothing. And Incident 3's title is
`Investigating issues with Vibe app` — the **stage name is inside the incident
title**, so after resolution the page reads "Investigating issues with Vibe app /
Resolved". A title that dates itself.

Also: incident titles are inconsistent in form —
`Partial UI functionality degradation` (noun phrase, system-named),
`Issues with automations and integrations` (noun phrase, user-named),
`Investigating issues with Vibe app` (gerund, stage-named). Three shapes in
three incidents.

**Help-centre failure and recovery articles** `[observed]`:
`Data validations` · `The Trash Section` ·
`What happens to connected items when moving them to another board?` ·
`Linkage limitations for the Connect Boards Column` ·
`How to contact support` (placed **first** in the `Getting Started` section,
above `Introduction to monday.com`).

**Putting `How to contact support` as the first article in the onboarding
section** is a confident routing choice — before teaching anything, tell the user
how to reach a human.

`What happens to connected items when moving them to another board?` is the best
recovery-adjacent title: a **consequence question about a reversible-looking
action**, phrased exactly as a user would ask it before doing the thing.
`Linkage limitations for the Connect Boards Column` is its pessimistic
counterpart — a titled article for the boundaries of a feature.

**The Trash Section, as glossed in the glossary** `[observed]`:

> "Have you accidentally deleted your board, item, or column? Don't worry, we've
> found a solution for you! All deleted items within your Main, Shareable, or
> Private boards will appear in the Trash Section."

Opens with the user's accident as a question, reassures, then locates the
remedy. No retention period is given here (contrast Airtable's "seven days" in
its glossary entry) — a gap.

**A documented dead end** `[observed]`, from the screen-reader article:
"Navigation methods that rely on moving by table rows or columns **will not work
reliably** - boards are not optimized for table navigation commands." A flat
statement that a user's likely first approach will fail, given before they try
it.

## T8 Empty states

No in-product empty state was directly observable on a visual surface. But
monday.com yielded the **only explicitly documented empty-state string in the
batch**, and it is an accessibility string `[observed]`:

> "Understand when properties are empty. **The content on an empty property will
> be a static "no content" text.**"

`no content` as the announced value of an empty cell. Two things are notable.
The string is **lower-case and unpunctuated** — it reads as a value, not a
sentence, which is right for something a screen reader will speak thousands of
times in a board sweep. And the *existence* of the requirement is stated as a
user capability ("Understand when properties are empty") rather than as an
implementation note — the article frames "knowing that nothing is there" as a
thing the user can now do.

Most products' empty cells announce nothing at all, so a screen-reader user
cannot distinguish an empty cell from a skipped one. This is a small, concrete,
highly transferable fix.

**Trash as the recoverable-empty state** `[observed]` — see T7. The
`Trash Section` is glossed by the accident that fills it rather than by what it
is.

**Template surfaces as the answer to a blank board** `[observed]`: the
persistent help-centre rail (`Get started with ready-made templates`),
`monday.com templates` as a first-run article inside
`Create your first board`, and two distinct template destinations in the site nav
(`AI template center`, `Solution templates`). Same content-supply strategy as
Trello and Coda.

**The status default is an empty state by design** `[observed]` — the
recommendation to leave the grey default Status label **blank** (T6) means
monday.com's most common empty state is deliberately wordless. The reason given
is that any word there would be misread as a status. That is an empty-state
decision arrived at by reasoning about what a filled state would imply — the
inverse of the usual process.

**Status-page null states** `[observed]`:
`No incidents reported today.` / `No incidents reported.` (the same adjacent
duplication as the other three Statuspage instances in this batch), plus the
useful pair `No downtime recorded on this day.` /
`No data exists for this day.` and
`No incidents or maintenance related to this downtime.`

**Form success state** `[observed]`:
`Thank you! Your submission has been received!` — analysed in T5.

**Absent** `[absent]`: no observable copy for an empty board, empty group, empty
`My Work`, empty `Update Feed`, zero-result search, empty dashboard, or empty
Trash. An authenticated pass is required.

## T9 Notifications & system messages

**monday.com has the most differentiated notification vocabulary in the batch**,
and the glossary defines four distinct surfaces `[observed]`:

| Surface | Glossary definition (summarised) | Scope |
|---|---|---|
| `The Update Feed (Inbox)` | "where you will see all updates from the board you are subscribed to, **even if you are not specifically mentioned** in that update or assigned to each pulse. You can think of this as a news feed" | Everything on boards you follow |
| `The Bell Notifications` | "where you receive all of the information that **specifically relates to you** (i.e, something you were tagged in, assigned to, a reply to an update you left, etc)" | Only things addressed to you |
| `The Updates Section` | "allows you and your team to communicate in a **social media style** inside an item, keeping all the conversations about a specific task or project in the same place and in context" | Per-item conversation |
| `The Activity Log` | "Need to keep track of your team's activity? The Activity Log is your answer." | Per-board audit trail |

**The Update Feed / Bell Notifications distinction is drawn on exactly the right
axis** — *ambient* (everything from places you follow) versus *addressed*
(things about you) — and both definitions state the axis explicitly:
"even if you are not specifically mentioned" versus "specifically relates to
you". Two feeds whose difference is a single contrastive clause each. Most
products ship both and explain neither.

`Subscribers` is the mechanism that fills the Update Feed, and it too is
glossed: "admins, users, and guests who follow your board. Each time someone
posts an update on this board, it will appear in their Update Feed (Inbox)."
So the glossary chains subscriber → update → feed in one sentence.

Note the parenthetical `(Inbox)` carried through every reference — the feature is
called `The Update Feed` and users apparently call it the Inbox, so the docs
carry both. A terminology accommodation made visible.

**Notification production via automation** `[observed]`:
`Notifications via automations and integrations` is the **first article** in
`Communication and collaboration`, and the Status Column article closes with:

> **Tip:** "Use automations to enhance your workflow! Easily set up an automation
> so your team is notified when a Status is changed for instance."

Status change as the canonical notification trigger, suggested at the foot of the
status article.

**`Notifications` is a status-page component in all four regions** `[observed]` —
so notification delivery is monitored and reportable independently of the
platform.

**Status-page subscription scope, per channel** `[observed]` — the standard
Atlassian set, with all six channels offered (email, SMS, Slack, webhook,
Twitter, Atom/RSS):

- Email: "whenever monday.com **creates**, **updates** or **resolves** an incident"
- SMS: "whenever monday.com **creates** or **resolves** an incident"
- Webhook: adds "or **changes** a component status"

`Message and data rates may apply.` present. `OTP` unglossed. Twitter handle
given as `@mondaysupport` — the *support* account rather than a dedicated status
account (contrast `@TrelloStatus`, `@airtablestatus`), so incident notices land
in the same stream as support chatter.

**Status-page about-copy** `[observed]`:

> "Welcome to monday.com's status page where you can follow the operational
> status of our platform as well as other key features and services.
> **We'll communicate any interruptions we encounter on this page.**"

One commitment sentence, first person plural, future tense, with `encounter`
(rather than "cause") doing quiet work on attribution.

**Live incident notification copy** — see T7 for the three full threads. The
five-stage prefix vocabulary (`Investigating`, `Update`, `Identified`,
`Monitoring`, `Resolved`) is the reusable artefact.

**Help-centre feedback solicitation** `[observed]`:
`Is this article helpful?` / "Help us improve our articles." / `Yes` `No`.
Simpler than Trello's three-reason taxonomy — no follow-up question on `No`.

**Article metadata as ambient system messaging** `[observed]`:
`4 min read` / `3 min read` badges with an icon, a `Feature` type badge, and
`Last modified on August 24, 2026 15:49` / `Last modified on June 23, 2026 19:36`
/ `Last modified on April 08, 2026 22:41`.

**Absolute timestamps to the minute** is the opposite choice from Airtable's
relative `Last updated 1 month ago`. Minute precision on a help article is
over-specified for a reader and useful for an auditor; the reading-time badge is
the reader-facing courtesy. Both are present, which is the right combination.

## T10 Disclosures, legal & compliance

**Weakest section in this file — the pricing page was not fetched**, so no plan
names, prices, seat definitions, limits, billing rules, or pricing FAQ were
captured. What is `[observed]`:

**The free-plan qualifier, from the hero** `[observed]`:

> `No credit card needed ✦ Unlimited time on Free plan`

Analysed in T2. The construction bounds its own claim by naming the dimension.

**Published capacity limit** `[observed]`: "You can have up to **40 status
labels** with different colors." — stated inside the feature article rather than
in a limits table, which is where a user configuring labels will actually
encounter it.

**Permission gate stated before the instruction** `[observed]`:

> **Note:** "To create default labels, **you need to be an admin of the account**.
> Learn more about how to become an admin right here."

Disqualifier first, then a route to qualifying. Compare Airtable's structured
`Permissions` header row — same job, done as a note.

**Compliance is a persistent footer badge row** `[observed]`, on every page:
GDPR → `/terms/gdpr` · ISO → `/trustcenter/iso` · SOC → `/terms/soc2` ·
HIPAA → a **help-centre article**. Four badges, four different destination types
(terms page, trust centre, terms page, support article). The HIPAA badge linking
into Zendesk rather than to a legal page is an inconsistency.

**Two trust surfaces** `[observed]`: `Security` → `/trustcenter` in the footer,
and `AI Trust Center` → `/w/ai-trust-center` in the Resources dropdown. A
**separate trust centre for AI** is a 2026-era artefact worth recording: the
company judged that AI data handling needed its own disclosure surface rather
than a section of the existing one.

**Legal strip** `[observed]`: `Security` · `Terms and privacy` ·
`Privacy policy` · `Your privacy choices` · `Status` ·
`Accessibility statement`.

**Defect:** `Terms and privacy` links to `https://monday.com/l/` while
`Privacy policy` links to `https://monday.com/terms/privacy` — and the home
page's signup consent line links `Terms of Service` to `/l/` and
`Privacy Policy` to `/l/privacy/privacy-policy/`. **Three different privacy URLs
across one site**, two of them under an opaque `/l/` path whose label the user
cannot infer.

**Data residency is implied but not disclosed in the harvested pages**: the
status page's four regions (`US`, `EU`, `AUS`, `IL`) are the only public
indication of where data lives, and `IL` is unexpanded (Israel — the company's
home market). A reader parsing residency from a status page is doing the
compliance team's work.

**Consent microcopy** `[observed]`:
`By proceeding, you agree to the Terms of Service and Privacy Policy` — second
person, `agree`, and **rendered twice** in the DOM.

**`[absent]`** for this product: plan names, prices, billing basis, seat
definitions, storage and item limits, refund/cancellation policy, discount
programmes, and any pricing FAQ. The help centre has a `Plans & billing` category
with `Pricing` and `Billing` sections that was not entered.

## T11 Help-centre architecture

**Platform**: Zendesk, heavily custom-themed. Structure: index → (product OR
platform category) → section → article. Five further locales.

**The defining structural choice: a product axis and a platform axis, presented
as peers** `[observed]`. The mega-menu splits into `Products` (6) and
`Platform` (6), and the landing page repeats the split as
`Explore by product` and `Explore by topic`. A user can enter by what they
bought or by what they are trying to do.

This is the right answer for a suite, and it is executed with one consistent
device: **every product entry begins with `Get started`**, so the product axis
always opens onto onboarding while the platform axis opens onto reference.

**Landing-page composition** `[observed]`:
`How can we help you?` + search → four shortcut chips (`Automations`, `Gantt`,
`Workforms`, `Dashboard`) → `Explore by product` (6 cards, each with a one-line
value prop) → `Explore by topic` (6 cards) → `Popular articles` (10, icon +
title only) → `Level up with academy lessons` (4) →
`Still have questions? We can help.` (3 routes).

The six product cards carry **value-prop lines, not help-scope lines**:
"Manage your projects, tasks and workflows" · "Track and manage all aspects of
your sales cycle" · "Build agile workflows to empower your R&D teams" ·
"Manage your service operations from A to Z" · "Create and innovate on a digital
whiteboard" · "Gather requests, feedback and data all in one place". These are
marketing lines in a support context — they tell a user what the product is for
rather than what the help section contains. Defensible for a suite where users
may not know which product they need; slightly off-register for someone already
stuck.

**`Popular articles` is a demand signal** `[observed]`, ten entries:
`Automations` · `Import & export from Excel` · `Board permissions` ·
`Connect Boards Column` · `Formula Column` · `Dashboards` · `Dependencies` ·
`Gantt charts` · `Integrations` · `Board views`.

Three of ten are about **connecting or computing across boards**
(`Connect Boards Column`, `Formula Column`, `Dependencies`), and one is about
**getting data in and out** (`Import & export from Excel`). As at Airtable and
ClickUp, the real demand is for relational plumbing and migration, not for the
headline features.

Note the labels here are shortened (`Automations`, `Dashboards`, `Gantt charts`)
while the underlying article titles are longer
(`Get started with monday automations`, `The Dashboards`,
`The Gantt Chart View and Widget`). A curated short label over a canonical title
— reasonable, and it means the same article has two public names.

**Article-title grammar — five shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `The <Noun>` (distinctive) | `The Status Column`, `The Mirror Column`, `The Dashboards`, `The Board Filters`, `The Quick Search`, `The Activity Log`, `The Updates Section`, `The trash section` |
| `The basics of <X>` | `The basics of a board`, `The basics of groups`, `The basics of items`, `The basics of columns` |
| `How to <verb>` | `How to contact support`, `How to invite users to join an account`, `How to duplicate a board`, `How to communicate with my team`, `How to assign tasks to your teammates`, `How to keep your account organized`, `How to find content in your account`, `How to get started as a guest`, `How to share projects with guests`, `How to manage files in monday.com` |
| `Get started with <X>` / `Getting started with <X>` | `Get started with monday AI work platform`, `Get started with WorkForms`, `Get started with monday workdocs`, `Getting started with workspaces` |
| Question | `What happens to connected items when moving them to another board?`, `What's the difference between Boards, Shareable Boards and Private Boards?` |

**`The basics of X` is a four-instance micro-convention** applied to exactly the
four core objects — board, group, item, column — so a new user can identify the
foundational set by title shape alone. That is a quiet, effective piece of IA.

**`The <Noun>` with a definite article** is the house style for feature
reference, and it is the most distinctive title convention in the batch. It
treats each feature as a singular named thing. Its weakness shows in
`The Dashboards` (definite article plus plural, which reads oddly) and in the
casing drift: `The Status Column` vs `The trash section` vs
`The board views` vs `The Board Views` (the last two are the same article,
referenced differently in the glossary and the popular list).

`Get started with` vs `Getting started with` — both live, four instances,
inconsistently.

**Article furniture is unusually rich** `[observed]`: reading-time badge
(`3 min read`), a content-type badge (`Feature`), a `Jump to sections within
this article` block with anchor links, **`Note:` and `Tip:` callout blocks with
distinct icons**, an `On this page` rail, `Share this article` (Facebook, X,
LinkedIn), `Related articles` (5), `Is this article helpful?`, the
`Still have questions?` routing block, and an absolute
`Last modified on <date> <time>` stamp.

The `Note:` / `Tip:` distinction is applied consistently and meaningfully across
the Status Column article — `Note:` for constraints and consequences (the grey
label, deactivation behaviour, default propagation, admin requirement), `Tip:`
for optional enhancement (automations). **Constraint versus opportunity, marked
typographically.** That is a reusable convention.

**Routing furniture** `[observed]`: `Still have questions? We can help.` →
`Chat support` ("Get in touch with our support team through our chat for any
questions, concerns, or inquiries.") → `Community Forum` → `Expert help`
("Hire a monday.com expert to optimize your workflows."). Human support first,
peers second, **paid human third**. The only help centre in the batch to route to
a paid expert as a first-class support tier — and the only one to put live chat
above community (contrast Trello, whose terminal route is `Ask the Community`).

Every article closes with: "If you have any questions, please reach out to our
team right here. **We're available 24/7 and happy to help.**" — a standing
availability commitment repeated at the foot of every article.

**Localisation** `[observed]` — five locales (`Deutsch`, `Español`, `Français`,
`日本語`, `Português`), and the switcher URLs expose translated slugs. Two
comparisons:

`Getting started` →
`Erste-Schritte` (de, "first steps") · `Introducción` (es) ·
`Démarrer` (fr, an infinitive verb) · `はじめに` (ja, "to begin") ·
`Introdução` (pt).

**Four strategies again** — German uses a journey noun, Spanish and Portuguese use
"introduction", French uses a bare infinitive, Japanese uses a conventional
preface phrase. As at ClickUp, only one locale preserved the source's verb
character, and here it is French rather than Portuguese. Worth recording that
*two independent products* localising the same English phrase produced
non-overlapping strategies across nine locale instances.

`The Status Column` →
`Die Status-Spalte` · `La columna Estado` · `La colonne Statut` ·
`ステータスカラム` · `A Coluna de Status`.

**Perfectly consistent** across all five — because the source is a concrete noun
phrase with a technical head. The contrast between the two examples is the
lesson: **concrete nouns localise predictably, imperative CTAs do not.**

## T12 FAQs

**No dedicated FAQ block was captured** `[absent]` — the pricing page, which is
where the other four products in this batch carry theirs, was not fetched.

**What exists instead is question-shaped article titles used as FAQ entries**
`[observed]`:

- `What happens to connected items when moving them to another board?`
- `What's the difference between Boards, Shareable Boards and Private Boards?`
- `How to contact support`
- `How to get started as a guest`
- `How do I import my work…`-class titles across the category
- `Have you accidentally deleted your board, item, or column?` (as an in-article
  opener)

Two of these are the classic FAQ shapes. **`What happens to <X> when <action>?`**
is a consequence question about an action the user is about to take — the most
useful FAQ form for a reversible-looking operation with irreversible effects, and
the same shape as Coda's `How is a table different from a grid?` applied to a
verb rather than a noun.

**`What's the difference between Boards, Shareable Boards and Private Boards?`**
is a three-way disambiguation in a title, and the harvest shows it exists **twice
in two forms**: the glossary links to it as
`What is the difference between Boards, Shareable Boards and Private Boards?`
while the category lists it as `The difference between board types`. Same
article ID, two public titles — the question form for people searching, the noun
form for people browsing. That is either a deliberate dual-surface strategy or a
rename that did not propagate; the harvest cannot distinguish them.

**In-article FAQ-equivalents**: the Status Column article's `Note:` blocks
function as an embedded FAQ — each answers an unasked question (what is the grey
label for? can I delete a label? will this change my existing boards?). Four
`Note:` blocks, four implicit questions, all placed at the moment the question
arises rather than collected at the end. **Inline note-as-FAQ beats a terminal
FAQ block for procedural content**, and this article is a good demonstration.

The screen-reader article carries the batch's most explicit structural FAQ
substitute: a `Jump to sections within this article` block that lists five
destinations in prose with inline anchor links, including
"[What screen reader users can do today.] This section includes [supported
columns] for screen reader reading." — a table of contents written as sentences
with nested anchors.

## T13 Terminology & glossary

**monday.com publishes a public `Glossary` inside `Getting started`** — ~30 terms
across six named groups — and it is the only glossary in this batch that **admits
the product has jargon** ("This will help you understand our jargon").

**Group 1 — `monday AI`** `[observed]`

| Term | Definition (summarised) |
|---|---|
| `monday Sidekick` | "an AI assistant in monday.com that understands your work and helps you get things done through **natural conversation**. It integrates AI models, tools, and connected apps to **think, create, and act**." |
| `monday Vibe` | "a **vibe coding tool** that turns simple prompts into fully custom, secure, enterprise-grade AI work apps." |
| `AI workflows` | "map, design, and run complex, cross-functional processes at scale… combining structured logic, no-code building, and built-in AI capabilities" |
| `monday Agents` | "AI agents built into monday.com that **act for you at scale, in the context of your work**." Includes `Expert Agents` and an `AI Agent Builder`. |

`Sidekick` is the best AI-assistant name in the batch — it encodes subordination
(a sidekick is never the protagonist), which is the same claim as
`You lead. Agents act.` made in a single noun. Compare ClickUp's `Brain` /
`Brain²` / `Super Agents`, which encode superiority.

`monday Vibe` adopts `vibe coding`, an industry colloquialism, as a product
definition — a bet that the term will still mean something in two years.

`Agent Factory` also appears (linked from the glossary as
`Create a digital workforce with Agent Factory`), and **`digital workforce`** is
the umbrella metaphor. Three registers for the same concept — sidekick
(subordinate companion), agent (delegate), workforce (labour) — coexisting.

**Group 2 — `Structure and hierarchy`** `[observed]`:
`Workspaces` · `Folders` · `Left Panel` · `Main Boards` · `Shareable boards` ·
`Private boards`.

The three board types are the load-bearing distinction, and each is defined by
**who can see it**, in bold:

- `Main Boards` — "visible to **anyone** who is a team member within your
  account. Anything you create in this section will be accessible and transparent
  to your users."
- `Shareable boards` — "when you want to share a board with people **outside of
  your team** or company, such as clients, interns, or freelancers."
- `Private boards` — "can only be seen by the user who created them and those
  invited… **you cannot invite guests to a private board**."

Three definitions, one axis, with the constraint that follows from each stated in
the same breath. `Main` as the name for the default-open type is the interesting
choice — it names the board's *primacy*, not its visibility, so the user has to
read the definition to learn that Main means public-to-the-account. `Open Boards`
would have been self-documenting. Recorded as a naming weakness that the glossary
then has to repair.

**Group 3 — `The Boards`** `[observed]`:
`Groups` · `Items` · `Column Center` · `Board Menu` · `The Batch Actions`.

**`Items` carries a live legacy term in its own definition**:

> "A **pulse** or "[Item]" is a single row within a group on a board."

and, under `Groups`: "allowing you to organize and categorize **your pulses or
"items"**".

`pulse` was monday.com's original word for a row (the company was formerly
*dapulse*). It has been superseded by `Item` — and the glossary still leads with
`pulse` in one definition and lists it first in another. Worse, the same page
links three times to **`support.dapulse.com`**, the pre-rename support domain.
**A terminology migration visible in the glossary, the prose, and the link graph
simultaneously.**

This is the single clearest example in the batch of what a rename costs if it is
not chased into the reference layer — and it is more serious than Trello's
`Butler` or Coda's Superhuman drift, because it sits in the *glossary*, the one
document whose job is to be authoritative.

`Column Center` is the coined name for the column-type picker. `The Batch
Actions` carries a definite article and a plural — "you can now edit, move,
delete, archive, export, and even duplicate multiple items with just one click"
— and the `now` in "you can now" is a release note fossilised into a definition.

**Group 4 — `Users on your account`** `[observed]`:

| Term | Definition |
|---|---|
| `Main users` | "your teammates or employees… **also called team members**, can see and edit all information on Main Boards" |
| `Guest users` | "people outside your team, like vendors, clients, freelancers, and consultants. They can **only** be invited to Shareable boards" |
| `Admin` | "kind of like a super user with some cool super monday.com powers. But really, the admin has the ability to oversee the entire account" |
| `Subscribers` | "admins, users, and guests who **follow** your board" |
| `Board Owners` | "either: the person who created the board, **or** any subscribers… the board creator has chosen to be co-owners" |

`Main users` is the weak term — it exists only to pair with `Main Boards`, and
the definition immediately supplies the better word ("**also called team
members**"). A glossary entry that concedes its own headword is second-best.

The `Admin` definition is the register outlier in the entire batch:
"kind of like a super user with some cool super monday.com powers. **But really**,
the admin has the ability to oversee the entire account…" — a joke, then a
self-correction, inside a reference document. It is charming and it makes the
entry longer than it needs to be.

**Group 5 — `Filters and navigation`** `[observed]`:
`Search and filter on the board` · `The Search Everything` · `The Quick Search`.

Three search surfaces at three scopes — cell/board, account-wide, and
board-switching — named distinctly. `Search Everything` is a strong coinage: the
scope is in the name. `Quick Search` publishes its shortcut in the definition
("Command + B… or Ctrl + B"). Note the glossary headwords carry definite articles
(`The Search Everything`) that read awkwardly.

**Group 6 — `People and interactions` and `Organization and displays`**
`[observed]`: `The Activity Log` · `My week` · `The Update Feed (Inbox)` ·
`The Bell Notifications` · `The Updates Section` · `The Trash Section` ·
`The Board Views` · `The Dashboards`.

**Defect:** the glossary headword is **`My week`** while the definition, the link
text, and the destination article are all **`My Work`** — "My Work is a great way
for you and your team to see everything you need to accomplish this week". The
feature was renamed from `My Week` to `My Work` and the glossary heading was
missed. A rename half-applied inside a single glossary entry.

**Other named terms across the harvest** `[observed]`:
`mondayDB` (the infrastructure brand, promoted to nav) · `monday MCP` ·
`WorkCanvas` · `WorkForms` · `workdocs` (lower-case) ·
`monday work management` / `monday CRM` / `monday dev` / `monday service` /
`monday campaigns` (all lower-case `monday`) · `Solution templates` ·
`AI template center` · `Data validations` · `Multi-board mirroring` ·
`Connect Boards Column` · `Mirror Column` · `Managed templates` ·
`Conditional status changes`.

**The lower-case `monday` is a brand rule applied with real consistency** —
`monday work management`, `monday CRM`, `monday dev`, `monday service`,
`monday Sidekick`, `monday Agents`, `monday workdocs`, `mondayDB`. It holds
across marketing, help, and status pages. The exception is sentence-initial
position, where the help centre sometimes capitalises. A brand-casing rule that
survives contact with a Zendesk instance is unusual.

**Register split.** Marketing coins compactly (`Sidekick`, `Vibe`,
`digital workforce`); the help centre names literally (`The Status Column`,
`The Batch Actions`, `Column Center`); the glossary mixes both and adds jokes.
The object model itself (`board`, `group`, `item`, `column`) is plain, stable,
and — apart from the `pulse` residue — clean.

## T14 Voice, tone & accessibility

**The screen-reader article is the best accessibility content in this entire
batch, and arguably the most transferable single document in it.**

### `Using monday.com boards with screen readers` `[observed]`

It opens by naming the problem rather than the feature:

> "Boards are one of the most powerful and complex parts of monday.com, and they
> **behave differently from traditional data tables**."
>
> "Although boards may visually resemble tables, **treating them as tables results
> in an inconsistent and confusing experience for screen reader users**."

Then it states the design decision and the reason:

> "To provide a more consistent and predictable screen reader experience, boards
> are presented using a **list-based structure instead of table semantics**,
> designed to preserve context for: Groups and subitems / Dynamic columns /
> Inline controls and menus / Large and complex boards"

**Publishing the semantic model, with its rationale and its four motivating
cases, to end users** is rare. The article then documents the model in full:

**Heading hierarchy, as a table with shortcut keys:**

| Level | What It Represents | Shortcut Key |
|---|---|---|
| H1 | Board name | Press 1 |
| H2 | Group name and item count | Press 2 |
| H3 | Item name | Press 3 |
| H4 | Subitem name | Press 4 |

**List naming convention, as a second table** — and the accessible names are
generated from user content, which is the part worth stealing:

| List | Accessible name (example) |
|---|---|
| Column headers list | "Group 1 properties" |
| Item list | "Item 2" (the item's own name) |
| Summary row list | "Group 1 summary" |
| Subitem column headers list | "Item 3 subitem properties" |
| Subitem list | "Fix bug" (the subitem's own name) |

`<group name> properties` and `<group name> summary` are **interpolated
accessible-name templates published as documentation.** A content designer can
see the string pattern, not just the behaviour.

And the per-cell rule:

> "each property (cell) within an item list is announced with **both the property
> name and the value** (for example, "Date: 17 March 2026")"

`Date: 17 March 2026` — the accessible-name format for a cell, given as a worked
example with a real date. Name-colon-value, so a user sweeping a row always knows
which column they are in.

**A ten-row navigation summary table** maps every relevant screen-reader key
(`H`, `1`–`4`, `L`, `I`, `B`, `F`, `K`, `Tab`) to what it does on a board.

**A list of nineteen supported columns** (T5), with the caveat attached:
"Support for these columns currently focuses on **reading and understanding
values**. Editing values, triggering actions, or configuring columns may be
limited or unavailable at this stage."

**And then — the section that makes this document exemplary:**

> `Current limitations`
>
> "**We want to be transparent about what is still limited or not yet
> supported.**"

Five named limitations, each with its own subheading, its own explanation, and
where possible a workaround:

- **`Cell Interactivity`** — "Some cells can be read but not yet activated or
  edited… This is being rolled out progressively across column types."
- **`Large Boards and Virtualization`** — explains *why* ("Boards use virtualized
  rendering, which means the page only renders the elements currently visible on
  screen"), states the symptom ("the screen reader's reading position to shift
  unexpectedly when scrolling"), and gives an interim workaround
  ("we recommend working with smaller boards… Splitting a large board into
  multiple smaller boards can help avoid this issue")
- **`Editing and actions`** — three bullets including
  "**Some action confirmations are not announced**"
- **`Keyboard-only usage`** — "Keyboard-only navigation is **partially
  supported** / Full keyboard parity without a screen reader is **still in
  progress**"
- **`Screen reader differences`** — "Behavior may vary between screen readers such
  as NVDA, JAWS, and VoiceOver"

Naming the screen readers, admitting that behaviour differs between them, and
conceding that **action confirmations are not announced** — an admission that the
product can silently succeed or fail for a blind user — is a level of candour no
other accessibility content in this batch approaches.

The close is equally good:

> "If you encounter accessibility barriers while using boards and would like to
> share feedback, you can contact monday.com support. **Please include:
> information on your screen reader / your browser / and what you were trying to
> do**"
>
> "We recognize that boards are central to many workflows, and **we want to
> provide the scaffolding everyone needs to be successful on monday.com**."

A structured bug-report template (three fields, one of them the user's *intent*
rather than the error), then a closing sentence that states why it matters
operationally rather than morally.

**Defects inside this otherwise exemplary article** `[observed]`:
the prose says "Pressing a number key (**3, 4, or 5**) moves to the next heading
at that specific level" while the table it sits beneath specifies **1, 2, 3,
and 4** — the numbers in the prose are wrong, in an accessibility guide whose
purpose is keyboard navigation. And two sentences end without full stops
("…can help avoid this issue", "…Large or complex boards may behave
differently"). Recorded because an accessibility document's own errors have
outsized cost.

### Alt text `[observed]` — the best in the batch

monday.com's home-page alt text is descriptive, specific, and **data-bearing**:

- "Kanban board showing Sprint Management tasks in columns: Ready to start, In
  progress, Waiting, and Done."
- "Deals pipeline Kanban board with columns for New, Meeting, Proposal, and Won
  stages showing company deals and values."
- "Stylized avatar of a Agent Hugo, Contract Reviewer, 5 issues found and fixed."
- "Profile card for Agent Zara, Deal Scorer, who scored 26 deals."
- "Portfolio dashboard showing projects, owners, health status, progress bars, and
  priority levels."
- "Project dependencies and bottlenecks map showing tasks, milestones, and
  critical path with linked nodes and avatars."
- "Dashboard greeting Alex showing 362 agent tasks last night with sales updates
  and team avatars."
- "3 off-track goals caught notification with a person in an orange outfit and
  white headphones."

**The screenshots' actual content — status names, column labels, figures — is in
the alt text.** A screen-reader user gets the status vocabulary that a sighted
user reads off the image. Set against ClickUp, whose equivalent status-template
gallery carries alt like `personal-job-hunt` and `other-crm`, this is the
clearest paired example of good and bad practice in the corpus: same problem
(marketing screenshots carrying the product's most valuable vocabulary), opposite
outcomes.

Defects: **"a Agent Hugo"** and **"a Agent Nia"** — the indefinite article is
wrong before a vowel, and it appears in at least four alt strings, so the
template is `a Agent {name}, {role}, {result}.`  Also `Stylized avatar of a…`
opens several strings with the medium rather than the content, which forces the
listener through four words before the information starts. And a handful of
decorative logo images carry empty alt correctly while the second (white) logo
row carries none at all.

### Voice and register

**Person and tense.** Second person for the user throughout. First person plural
for the company, used for commitments and for admissions:
"**We** strive to give you an intuitive, visual platform", "**We** recommend
leaving the gray Status label blank", "**We**'ll communicate any interruptions we
encounter", "**We** want to be transparent about what is still limited",
"**We** recognize that boards are central to many workflows",
"**We're** available 24/7 and happy to help."

**Register.** Warm, exclamation-tolerant, emoji-tolerant in help copy
(`✍️`, `😊`, `📊 📈 📉`), and noticeably more informal than Airtable or ClickUp's
help centres. Markers: "Don't forget to click "Apply" once you've finished
customizing. 😊" · "Don't worry, we've found a solution for you!" ·
"kind of like a super user with some cool super monday.com powers" ·
"At monday.com, we love to make everything visual" ·
"the possibilities are endless!" · "get creative with automations that will make
your workflow smoother!"

The register **flattens correctly where it matters**: the status-governance notes,
the incident updates, and the screen-reader limitations are all plain, unemojied,
and declarative. So monday.com does exhibit a stakes-responsive tone gradient —
the opposite of ClickUp, whose marketing superlatives sit adjacent to its careful
compliance copy.

**Numbers as trust devices** `[observed]`: `over 60% of the Fortune 500` (used
twice), `up to 40 status labels`, `24/7` (used at least four times),
`3 min read` / `4 min read`. Sparse by batch standards — monday.com leans on one
customer-base claim and on named logos rather than on metric density.

**Negative findings, recorded honestly**

- `Oops! Something went wrong while submitting the form.` — no cause, no recovery
  action, on the home page's primary conversion form; appears to be an
  un-customised framework default
- `Thank you! Your submission has been received!` — passive, two exclamation
  marks, no next step
- **Glossary headword `My week` for a feature called `My Work`** — rename applied
  to the body and the link but not the heading
- **`pulse` retained in the glossary's `Items` and `Groups` definitions**, and
  three live links to `support.dapulse.com`, the pre-rename domain
- Help-centre mega-menu: `Profile & administration` links to `/p/work-canvas` and
  `Data, infra & security` links to `/p/work-forms` — two platform categories
  pointing at product pages
- `Board views` and `Widgets` in the help mega-menu both link to `#`
- One section rendered as `Communication and collaboration` (category page),
  `Communicate & collaborate` (mega-menu), and `Communication & collaboration`
  in context — three labels
- `Getting started` (category) contains a section named `Getting Started` —
  parent/child collision differing only by casing
- `Get Started` vs `Get started` across the six help-centre product cards
- `Community Forum` (index) vs `Community forum` (article pages)
- `Chat support` renders as plain unlinked text in the support-routing block on
  both pages harvested
- Six bare `Explore` and seven bare `Learn more` links on one help-centre screen
- Screen-reader article: prose says heading keys "3, 4, or 5" where its own table
  says 1–4; two sentences missing terminal full stops
- Status-page component `Ai Functionality` (should be `AI`), and an unexplained
  `Other Functionalities` bucket, in all four regions
- Incident resolution template ends without a full stop after "Thank you for your
  patience" — in two separate incidents, so it is the template
- Incident 3 titled `Investigating issues with Vibe app` — stage name baked into
  a title that outlives the stage
- Three incident-title shapes in three incidents
- One no-content incident update ("We are continuing to investigate this issue.")
  five minutes after the first notice
- Alt text `a Agent Hugo` / `a Agent Nia` — wrong indefinite article, at least
  four instances
- `By proceeding, you agree to…` rendered twice in the DOM
- Three privacy URLs across one site (`/l/`, `/l/privacy/privacy-policy/`,
  `/terms/privacy`); HIPAA compliance badge links into the Zendesk help centre
- `monday service For IT & support` — missing separator in a nav scope line
- `The Dashboards` — definite article plus plural
- Same article published under two public titles
  (`What is the difference between Boards, Shareable Boards and Private Boards?`
  / `The difference between board types`)
- `Trash Section` glossary entry states no retention period
- `Main Boards` / `Main users` — a naming pair that requires the glossary to
  explain that "Main" means "visible to everyone"
- `✦` used as a separator in the hero price qualifier

---

## Transferable patterns

1. **Noun triad, full stop, past participle, full stop.**
   `Tickets, issues and risks. Resolved.` — six audience headlines, one formula,
   with the participle drawn from each audience's own completion vocabulary
   (`Resolved` / `Closed` / `Deployed` / `Secured` / `Delivered` / `Done`).
   The most directly liftable headline pattern in this batch for per-segment
   marketing copy.
2. **Assign the roles in four words.** `You lead. Agents act.` Parallel clauses,
   authority to the human, execution to the machine. Any product introducing
   automation or agents needs this sentence and usually writes a paragraph
   instead.
3. **Leave the default state blank, and say why.** "We recommend leaving the gray
   Status label blank, as assigning it a Status can cause confusion amongst your
   team." Distinguishes "not set" from every real value, and justifies it in terms
   of team confusion rather than data hygiene. Applies to any select field whose
   unset value could masquerade as meaningful — risk tier, dispute reason,
   verification state.
4. **Give every status label its own description field.** A per-value tooltip,
   authored by the board owner, surfaced on hover, explicitly "to ensure that you
   align all users… with an understanding of the purpose and function of each
   label." Solves the real problem with user-authored vocabulary — that
   `In Review` means something different everywhere — without a separate glossary
   document.
5. **Deactivate, never delete, a label that has been used.** With the consequence
   stated in both directions: gone from the picker, greyed in settings. The
   correct referential-integrity story for any enumerated value with history
   behind it.
6. **Make "done" a configurable mapping, not a label.** Many labels → one
   meta-state, per board, so `Shipped` and `Approved` can both count as complete.
   And keep the quotation marks around `"done"` so the meta-state stays distinct
   from any label.
7. **State the retroactivity of a governance change, in a note attached to the
   instruction.** "Changes made to the default board labels will not change any
   labels in your Status Columns that already exist." Prevents both the false
   expectation and the panic, in one sentence, at the point of action.
8. **Distinguish ambient from addressed notifications, and define each by
   contrast.** Update Feed: "even if you are not specifically mentioned". Bell:
   "specifically relates to you". Two feeds, two contrastive clauses.
9. **End a resolved-incident notice with the user's action.** "Please refresh
   your browser to resume regular service usage." Most resolution notices stop at
   "resolved"; the user's own session may still be broken.
10. **Write the incident symptom list in the user's words, including the ugly
    ones.** "Automations and Workflows may appear as broken/not running/won't
    load." Lets a user match what they are seeing and stop debugging.
11. **Scope incidents geographically at the `Investigating` stage.** "…in EU" in
    the first update, backed by a region-scoped component list. Essential wherever
    data residency is sold.
12. **Publish your accessible-name templates.** `<group name> properties`,
    `<group name> summary`, `Date: 17 March 2026`. Documenting the *string
    pattern*, not just the behaviour, lets designers and testers verify it.
13. **Announce empty cells with a static `no content` value.** Lower-case,
    unpunctuated, said thousands of times per sweep. Distinguishes "empty" from
    "skipped" for screen-reader users — a small, concrete, near-universal fix.
14. **Write a `Current limitations` section and open it with the commitment.**
    "We want to be transparent about what is still limited or not yet supported."
    Five named limitations, each with cause, symptom, and workaround, including
    the admission that "some action confirmations are not announced". Then ask for
    feedback with a three-field template, one field being the user's *intent*.
15. **Put the screenshot's content in the alt text.** "Kanban board showing Sprint
    Management tasks in columns: Ready to start, In progress, Waiting, and Done."
    The product's most valuable vocabulary usually lives in marketing screenshots;
    alt text is the only route to it for a screen-reader user. Contrast ClickUp's
    filename slugs in T14 of file 009.
16. **Mark constraints and opportunities differently.** `Note:` for consequences
    and limits, `Tip:` for optional enhancement, applied consistently with
    distinct icons.
17. **Admit the jargon in the glossary's first line.** "This will help you
    understand our jargon." Lowers the reader's cost of not knowing by framing the
    terms as arbitrary rather than self-evident.
18. **Counter-example: a rename not chased into the reference layer.** `pulse`
    still leading the `Items` definition, `My week` heading a `My Work` article,
    and three live links to a domain named after the company's former name — all
    inside the glossary, the one document whose job is to be authoritative.
19. **Counter-example: unretouched framework defaults on the conversion form.**
    `Oops! Something went wrong while submitting the form.` on the primary signup
    form of a company selling workflow software.

## Caveats & gaps

- **The pricing page was not fetched.** `monday.com/pricing` was never
  retrieved, so T10 has **no plan names, prices, seat definitions, item or
  storage limits, billing basis, discount programmes, refund or cancellation
  terms, and no pricing FAQ** — the categories that the other four files in this
  batch draw most heavily from. T12 is correspondingly thin, since the pricing
  page is where the other four products carry their FAQ blocks. This is the single
  largest gap in the file. The help centre's `Plans & billing` category (with
  `Pricing` and `Billing` sections) was also not entered.
- **The accessibility statement was blocked.** `monday.com/accessibility-statement`
  was refused at request time, so the company's *stated* conformance target,
  audit arrangements, VPAT availability, and feedback routes are unknown. T14's
  accessibility findings rest entirely on the screen-reader help article and on
  observed alt text, which is unusually strong evidence for practice but says
  nothing about stated policy. A second attempt should be made.
- **The home page exceeded the inline output limit** and was read from a
  persisted file. Roughly the first 720 of ~1,550 lines were read; the remaining
  ~830 lines — likely containing further product sections, customer stories,
  security copy, and the footer's marketing blocks — are **unharvested**. Any
  claim about the home page's lower half is absent rather than negative.
- **Template galleries not fetched.** `monday.com/templates`, the
  `AI template center`, and `Solution templates` were all left unharvested.
  Given that this product's flagged strength is **workflow templates and
  statuses**, and that the status half is well covered while the template half is
  not, this is a material asymmetry. The template gallery would carry the actual
  named workflows and their status sequences.
- **Status vocabulary in T6 is recovered from alt text and from marketing
  screenshots**, not from a product surface or a template listing. `Ready to
  start` / `In progress` / `Waiting` / `Done` and
  `New` / `Meeting` / `Proposal` / `Won` are **illustrative example
  configurations**, not product defaults, and should not be cited as monday.com
  UI strings. monday.com ships no fixed workflow vocabulary.
- **Only four help articles were opened in full** (Glossary, The Status Column,
  screen readers, plus the two category listings). Eight of the nine
  `Getting started` sections were read at title level only; five of the six
  platform categories and all six product categories were not entered. `Board
  elements` alone holds 54+ articles.
- **No in-product empty state, toast, validation, or confirmation string was
  observed**, with the exception of the two Webflow form-state strings and the
  documented `no content` accessible value. T8 is the thinnest section here.
- **The live incident copy is a snapshot.** Three resolved incidents were visible
  on the day of harvest; `Incident History` was not fetched, so the sample is
  small and may not represent monday.com's handling of a major outage. All three
  observed incidents were short (28 minutes to just under two hours) and
  resolved — no postmortem, no sustained-outage communication, and no
  `Maintenance` notice was observable.
- **Locale is en-US.** Five further locales exist and only their *slugs* were
  observed via switcher URLs. The localisation findings in T11 rest on two slug
  comparisons; no localised page body was fetched.
- **Mobile app strings not harvested** (iOS and Android apps exist per footer).
- **No published design system or content style guide was located.**
  monday.com maintains a public design system (`Vibe`, which shares a name with
  the vibe-coding product), and it was **not searched for or fetched** — a notable
  omission given that the product's content practice, particularly its
  accessibility documentation, is the strongest in this batch and a stated
  ruleset would be high-value.
- **`Contact sales`, the Trust Center, and the AI Trust Center were not fetched**,
  so T10's compliance evidence is limited to footer badges and status-page
  regions.
- Alt-text and DOM-duplication findings are based on text extraction rather than
  DOM or assistive-technology inspection; the `a Agent` defect and the
  data-bearing alt values appeared directly in the extracted text and are
  confirmed, while DOM duplication is flagged as suspected.
- Status-page chrome, the `No incidents reported.` strings, the OTP and consent
  copy, and the five-stage incident vocabulary itself are **Atlassian Statuspage
  platform conventions**, shared with Trello, Airtable, and Coda in this batch.
  What is monday.com-authored is the **body text of each incident update**, the
  region-scoped component list, and the about-this-site paragraph — and those are
  where the T7/T9 findings are drawn from.

## Sources

1. https://monday.com/ (output exceeded inline limit; read from persisted file, first ~720 of ~1,550 lines)
2. https://support.monday.com/hc/en-us
3. https://support.monday.com/hc/en-us/categories/12052126742418
4. https://support.monday.com/hc/en-us/articles/115005934045-Glossary
5. https://support.monday.com/hc/en-us/articles/360001269685-The-Status-Column
6. https://support.monday.com/hc/en-us/articles/33660661840530-Using-monday-com-boards-with-screen-readers
7. https://status.monday.com/
8. https://monday.com/pricing — **not fetched**
9. https://monday.com/accessibility-statement — **attempted, blocked at request time**
