# 017. Miro

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Collaborative whiteboard / infinite-canvas visual workspace |
| Primary URL | https://miro.com/ |
| Corpus rank | 017 |
| Benchmark strength (source list) | Collaborative onboarding and tooltips |
| Locale / market observed | en-US (help centre serves de, es, fr, ja, ko-KR, pl-PL, pt-BR) |
| Platform observed | Web (desktop marketing), Zendesk help centre, incident.io status |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR, CCPA, ISO/IEC 27001, ISO 42001 "READY", SOC 2 Type II, SOC 3, NIST, TISAX; WCAG 2.2 AA target with annual ACR/VPAT; data residency EU (default) / US / AU / JP |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — marketing pages are Framer-built and duplicate content three times in server HTML; in-canvas tooltips (the flagged strength) are behind auth and only visible via marketing screenshot alt text |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / product | https://miro.com/ | Hero, full nav tree, footer, stat band, "Need help getting started?" block |
| Pricing | https://miro.com/pricing/ | Four plans, ~90-row comparison matrix, 17-question FAQ with full answers |
| Help centre home | https://help.miro.com/hc/en-us | Six categories with scope lines, `Trending topics`, 13-question FAQ accordion |
| Help: Getting Started | https://help.miro.com/hc/en-us/categories/360001415214-Getting-Started | Onboarding IA + `Accessibility in Miro` section + competitor-import articles |
| Help: Using Miro | https://help.miro.com/hc/en-us/categories/360001420434-Using-Miro | 15 sections, ~150 articles — the core task-phrasing source |
| Help: Troubleshooting (section) | https://help.miro.com/hc/en-us/sections/360003249154-Troubleshooting | 18 failure-article titles, richest error source |
| Board access rights (article) | https://help.miro.com/hc/en-us/articles/360017572194-Board-access-rights | Share-dialog strings, the retained-access warning, request-access flow |
| Roles in Miro (article) | https://help.miro.com/hc/en-us/articles/360017571194-Roles-in-Miro | Four-scope role model: board, Space, team, company |
| Accessibility | https://miro.com/accessibility/ | WCAG target, Accessibility checker, alt-text tooling; unusually rich alt text |
| Status gateway | https://status.miro.com/ | Region-selection interstitial — see T6 |
| Status: EU region | https://status.miro.com/eu | Six components, operational phrasing |

---

## T1 Navigation & IA labels

**Global nav — five items, four of which open a categorised mega-menu** `[observed]`

`Product` · `Use Cases` · `Solutions` · `Resources` · `Pricing`, with
`Contact sales` / `Book a demo` as a paired button, and a home-link whose accessible
title is `Miro Logo, Go to home page`.

The distinctive move is that each mega-menu is **sub-grouped by a different
organising principle**, and the group labels say which:

| Menu | Sub-groups |
|---|---|
| `Product` | `Featured` · `Platform` · `Formats` |
| `Use Cases` | `Featured` · `General` · `Specialized` |
| `Solutions` | `By Business Segment` · `By Industry` · `By Team` · `By Strategic Initiative` |
| `Resources` | `Learning` · `Community & Support` · `Partners & Services` |

`By Business Segment` / `By Industry` / `By Team` / `By Strategic Initiative` is
the pattern worth stealing: the group headings **name the axis of the cut**, so a
visitor knows *why* the list is grouped that way and can pick the axis they think
in. Most SaaS nav lists solutions without telling you the dimension.

`General` versus `Specialized` under `Use Cases` is the same trick applied to
depth rather than audience — it tells a newcomer which list to read first.

**`Formats` is a coined IA category** `[observed]`: `Whiteboard` · `Diagrams` ·
`Kanban` · `Timelines` · `TalkTrack` · `Tables` · `Docs` · `Slides`. Miro groups
what other tools call "views" or "file types" under one product noun, and the
same word appears as a help section (`Formats`) and an in-product concept
(`Formats & Focus modes`). Consistent from marketing to canvas.

**Footer — six groupings** `[observed]`: `Product` · `Solutions` · `Tools` ·
`Resources` · `Company` · `Plans & Pricing`.

`Tools` is a 19-link SEO shelf (`Online Sticky Notes`, `Gradient Generator`,
`AI Flowchart Generator`, `Image Color Picker`…) sitting beside the real product
IA. `Accessibility`, `Changelog`, and `Status` are all first-class footer links —
the first two under `Product`, the third under `Resources`, which is arguably the
wrong bucket for `Accessibility` (it is a commitment, not a product).

**Help centre top level — six categories, each with a scope sentence** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting Started` | "Welcome to Miro! Get started faster by learning some basics" |
| `Using Miro` | "Learn how Miro works, from board navigation and tools to profile management, and more" |
| `Plans & Billing` | "Have questions about our plans or subscription? Find answers here" |
| `Administration` | "Master the ins-and-outs of team and user management on Free, Team, Consultant, Business, and Education plans" |
| `Integrations & Apps` | "Discover the power of Miro's integrations and apps" |
| `Enterprise Administration` | "Deploy and configure Miro Enterprise for your organization" |

Two findings here. The `Administration` scope line **lists plan names that no
longer exist** — `Team`, `Consultant`, and `Education` — while the pricing page
sells `Free` · `Starter` · `Business` · `Enterprise`. The help IA is still
scoped to a retired plan taxonomy, so a user on `Starter` reading that line
cannot tell whether the category applies to them. This is the single clearest
content-ops defect in the harvest, and it recurs in the help FAQ
(`Team Settings`, `Team plan`, `Company Admin on Business Plan`).

Second, none of the six is phrased from the user's failure position — there is no
Wise-style `Where is my board?` category. Troubleshooting is buried two levels
down inside `Using Miro` → `Troubleshooting & Technical Questions` →
`Troubleshooting`, despite the help-home `Trending topics` list being almost
entirely failure-driven (see T7). The IA and the actual demand disagree.

**Help centre search prompt** `[observed]`: `What can we help you find?` —
not "Search", not "How can we help?". It names the user's verb (*find*) and
concedes that they are looking for something specific rather than browsing.

**Help section names inside `Using Miro`** `[observed]`, 15 of them:
`Essential Tools` · `Advanced Tools` · `Facilitation Tools` · `Miro AI` ·
`Formats` · `Spaces` · `Working on the board` · `Managing boards` ·
`Sharing boards` · `Managing your profile` · `Import and Export` ·
`Miro Insights` · `Special Features` · `Miroverse` ·
`Troubleshooting & Technical Questions`.

`Essential` / `Advanced` as a tool split is a **skill-level gradient in the IA**,
which is the onboarding-relevant decision: a first-time user is told which
toolset to learn first without being condescended to. `Facilitation Tools` is a
role-named category — it exists for the person running the session, not the
person attending, and it is the only role-scoped section in the tree.

## T2 Value proposition & headline patterns

**Hero (home)** `[observed]`

> Headline: `Human collaboration at the speed of AI`
> Subhead: "Where your team and AI think, plan, and build together, in a workspace that works the way you do."
> Under the CTA: `No credit card needed.`

The headline is a **positioning claim with a built-in tension** — it concedes
that AI is the fast thing and humans are the thing being accelerated, rather
than claiming the product is AI. The subhead then does the functional work with
a verb triplet (`think, plan, and build`) and closes on a
flattery clause ("works the way you do") that says nothing.

**Pricing hero is a different headline for the same proposition** `[observed]`:
`Where teams and AI work as one`. Two hero lines, both built on
"humans + AI together", neither reusing the other's phrasing. Compare Loom, which
runs two *deliberately different* strategies on two pages; Miro's look like two
attempts at the same sentence.

**The strongest line on the site is a concession** `[observed]`

> `The only thing more important than moving fast is moving the needle`
> Sub: "See how over 250,000 companies are getting great done in Miro"

The headline undercuts the speed claim its own hero just made. That is a genuine
rhetorical move — speed is table stakes, outcome is the point — and it is the one
place Miro's marketing argues rather than asserts. The subhead then spoils it
with `getting great done`, which is a Miro-internal slogan
("get great done") forced into a sentence where it reads as a grammatical error.

**Section headers are short verb or experience phrases** `[observed]`
`Flow from idea to outcome in seconds` · `Experience the Innovation Workspace` ·
`The AI platform for teamwork` · `Trusted by the world's most innovative companies` ·
`Security and compliance` · `Need help getting started?`

`Flow from idea to outcome in seconds` reuses `Flow` as both a verb here and a
product noun elsewhere (`Flows`, `Miro AI board layout with Sidekicks and Flows`)
— deliberate or not, the verb primes the feature name.

**Capability-card pattern — one-word label + single imperative benefit sentence**
`[observed]`, all six ending in a bare `Learn more`:

| Label | Benefit line |
|---|---|
| `AI` | "Accelerate your team with collaborative AI workflows" |
| `Intelligent Canvas` | "Empower teamwork on one, infinite, multiplayer canvas" |
| `Formats` | "Move quickly from ideas to structured plans and work with Docs, Tables, Slides, Diagrams and more" |
| `Blueprints` | "Automate key processes and ensure your workflows are scalable, repeatable, and efficient" |
| `Enterprise Security & Scale` | "Secure and scalable collaboration on an enterprise-grade platform you can trust" |
| `Integrations` | "Connects with 250+ apps so teams stay aligned and productive in one scalable, secure workspace." |

Five of six start with a verb addressed to the reader; `Integrations` switches to
third person ("Connects with…") and is the only one with a full stop. `infinite,
multiplayer canvas` is the best phrase in the set — `multiplayer` borrowed from
games to describe simultaneous editing, which is more vivid than "real-time
collaborative".

**A four-tab rotating hero explainer** `[observed]`: tabs `Research` ·
`Roadmaps` · `Diagrams` · `Workshops`, each with a heading and a paragraph.
The `Research` panel heading is `Turn research into a shared direction`, and the
body is notable for naming *competitor and partner AI tools by name* — Claude,
NotebookLM — and describing a round trip: pull outputs in, decide together, flow
insights back out. Miro positions itself as **the place between other tools**
rather than as a replacement, and the copy says so in mechanism terms.

**Stat band** `[observed]`: `100M+` "people collaborating on Miro" ·
`250+` "apps and integrations" · `6,000+` "templates", plus
`over 250,000 companies`, `3.6x faster time to market`,
`50% shorter planning process`, `2x faster time to market`,
`20,000+ reviews from Capterra, G2 and Trustradius`.

The customer-outcome figures are each attributed to a named logo in the carousel,
which bounds them — they are one customer's result, not an average, and the
layout makes that legible. Two of the three are the same metric with different
values (`3.6x` and `2x` "faster time to market"), which reads as honest rather
than cherry-picked.

**Number-formatting defect** `[observed]`: templates are `6,000+` on the home
page and `7000+` on the pricing page — different value *and* different thousands
separator. `60 million users` appears in a help-article promo for Miroverse,
against `100M+` on the home page; the two count different populations but nothing
on either surface says so.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Contact sales` / `Book a demo` | Global nav, as a paired button | Two labels in one control — the second appears to be a hover or secondary state |
| `Start for free` | Pricing, Free plan; comparison matrix | |
| `Buy this plan` | Pricing, Starter | **Unusually blunt** — names the commercial act, no euphemism |
| `Try for free` | Pricing, Business | Sits beside… |
| `buy now` | Pricing, Business, lowercase inline link | `Try for free` **or** `buy now` — two paths offered in one card, the paid one deliberately smaller and lowercase |
| `Contact sales` | Pricing, Enterprise | |
| `Contact us` | Enterprise Guard block | **`Contact us` and `Contact sales` on one page** for the same sales motion |
| `Select plan` | Comparison matrix header row | A third label for choosing a plan |
| `Show key features` | Pricing plan cards | Progressive disclosure |
| `Compare all features` | Pricing, matrix anchor | |
| `Learn more` | Home ×6 (capability cards), pricing ×3 (AI credits, Enterprise Guard), accessibility | **Bare `Learn more`, ten-plus times across three pages** |
| `Explore research` | Home, tabbed hero | Object-specific |
| `Explore the solution` | Home, AI block | |
| `Read Customer Study` | Home, testimonial | Title Case in an otherwise sentence-case set |
| `Check this out` | Home, beside the stat carousel | Weakest string in the harvest — no object, no destination cue |
| `Go to changelog` | Accessibility page | |
| `Request Access` | Board share denial | **Title-cased**, see T7 |
| `Request editor rights` | Board, from the `Comment only` button | Sentence case — inconsistent with the above |
| `Done` | Share dialog confirm | |
| `Remove` | Share dialog, per collaborator | |
| `Subscribe to updates` | Status page | |
| `View history` | Status page | |
| `Yes, thanks` / `Not really` | Help article feedback | See T14 — the most distinctive pair in the file |
| `Submit feedback` | Help article feedback | |
| `Return to top` | Help article foot | |

**The "Need help getting started?" block is the best CTA construction on the
site** `[observed]`. Six links, each rendered as **destination name + its own
one-line promise**, not as a bare label:

`Pricing` → "Select a plan" · `Templates` → "Get started fast" ·
`Solution Partners` → "Explore the network" · `Community` → "Connect with Miro
users" · `Blog` → "Dive in to ways of working" · `Academy` → "Get started with
Miro".

This is exactly the Wise `Learn more about sending large amounts` principle
applied as a layout rather than a label: the noun tells you where, the line tells
you why. It also exposes two defects — `Templates` promises "Get started fast"
while `Academy` promises "Get started with Miro", so two of six cards claim the
same job; and `Dive in to ways of working` should be `Dive into`.

**Observation.** Miro is the inverse of Wise on CTA specificity. The
`Need help getting started?` block proves the team knows how to write a
destination-specific link, and the six capability cards immediately above it all
ship bare `Learn more`. The good pattern exists on the same page as the bad one.

## T4 Onboarding & getting-started

This is the flagged benchmark strength, and it is strongest in the **help IA**,
not on the marketing site.

**No numbered how-it-works sequence on the home page** `[absent]`. Miro, like
Loom, substitutes rotating capability panels. The only step-shaped content is a
signup reassurance, `No credit card needed.`, which appears **twice in
succession** in server HTML (Framer duplication — see Caveats).

**The onboarding IA is a three-stage ladder** `[observed]`
(`Getting Started` category):

1. `Start here` — `What is Miro?` · `How to register with Miro` · `How to start collaboration with Miro` · `Remember Me when signing in` · `Roles in Miro`
2. `Your First Board` (a named sub-section, singular and possessive)
3. `Miro dashboard`

`Start here` as a literal section label is the plainest possible orientation
string and it works. The notable inclusion is `Roles in Miro` at position five of
five in the very first section — **the permission model is taught during
onboarding**, before the user has made anything. For a multiplayer product where
the first real action is sharing, teaching the role vocabulary at step one rather
than at first-share is a defensible sequencing decision.

Equally notable: `How to start collaboration with Miro` is a *first-week*
article, not an advanced one. The onboarding assumes the second thing you do is
invite someone.

**`Feature Intros` is scoped by occasion, not by feature** `[observed]`:
`Miro for ideation & brainstorming` · `Miro for strategy & planning` ·
`Miro for workshops & meetings`. Three articles, each naming a meeting type. A
new user who was told "we use Miro for retros" can self-route on the occasion
they were told about.

**Accessibility is taught in onboarding, not in a settings appendix**
`[observed]` — `Accessibility in Miro` is the *third* section of
`Getting Started`, ahead of `Apps for devices`:
`Overview of Miro Accessibility` · `How to access Miro boards with assistive
technologies` · `How to make your Miro boards more accessible` ·
`Keyboard navigation while working on boards` · `Reduce Motion`.

Note the two-sided split: one article for *using* Miro accessibly and one for
*authoring* accessibly (`How to make your Miro boards more accessible`). Placing
the author-side article in first-run onboarding, where habits form, is the
single most transferable decision in this file.

**Migration is treated as an onboarding path** `[observed]` —
`Migrating Content to Miro`, with a named article per competitor:
`Import Mural boards to Miro` · `Import Conceptboard to Miro` ·
`Import Draw.io diagrams to Miro` · `Import Figjam boards to Miro` ·
`Import Jamboards to Miro` · `Import Lucidchart diagrams to Miro` ·
`Bulk import diagrams to Miro` (10 articles total). Naming each competitor in a
help title is a findability decision — the switching user searches the name of
the tool they are leaving, not "import".

**In-canvas onboarding affordances named in help** `[documented]`:
`Command palette` · `Action shortcuts` · `Catch up` · `Attention management` ·
`Breakout frames (BETA)` · `Formats & Focus modes` · `Miro's new simplified user
interface` · `Miro's new design language overview`.

`Catch up` is the async-onboarding primitive — a named feature for "what changed
since I was last here", which is the returning-collaborator equivalent of a
first-run tour. `Attention management` names the facilitator's ability to pull
everyone's viewport; framing it as *managing attention* rather than "follow me"
or "spotlight" is a deliberately honest label for a slightly coercive feature.

**Tooltips** `[documented]`, only via screenshot alt text on the accessibility
page — e.g. a tooltip labelled `Description` above the `ALT` icon, and a tooltip
explaining how to edit a selected sticky note using keyboard shortcuts. Actual
tooltip strings are behind auth. `[absent]` for verbatim capture.

## T5 Form & field labels

**Pricing controls** `[observed]`: `Monthly` / `Yearly (save 20%)` — the discount
lives inside the option label rather than as a separate badge, so the trade-off is
readable without eye movement. Compare Loom's separate `SAVE UP TO 17%` chip.

**Share dialog** `[documented]`, and this is Miro's core vocabulary:

| Label | Notes |
|---|---|
| `Can edit` | The **default** access level when sharing — stated explicitly in help |
| `Can comment` | |
| `Can view` | |
| `No access` | An explicit value in the dropdown, not an absence |
| `None` | The equivalent value for **Space** access — **two labels for "revoke"** in one dialog |
| `Anyone at the team` | Audience scope |
| `Anyone with team` | Appears in the same article as the above — **two renderings of one label** |
| `Anyone with the link` | Public scope |
| `Anyone with the link at Company` | Company scope |
| `Sharing settings` | Sub-panel inside `Share` |
| `Share` | The button, top-right of every board |
| `Done` | Confirm |
| `Remove` | Per-collaborator |
| `Comment only` | A **status button** in the top-right that doubles as the entry point to `Request editor rights` |

The `Can edit` / `Can comment` / `Can view` triad is modal-verb-first, so the
dropdown reads as a sentence about the grantee's capability rather than as a role
noun. Miro then maintains a **parallel role-noun vocabulary** —
`Owner` / `Co-owner` / `Editor` / `Commenter` / `Viewer` — used in help prose and
in the permission tables. The mapping is one-to-one and unstated: `Can edit` is
what you pick, `Editor` is what you become. Both vocabularies are defensible
(verb phrase for the act of granting, agent noun for the person granted) but a
user searching help for `Can comment` lands on articles about `Commenters`.

**`Comment only` as a live status affordance** is the notable design: the button
in the corner *names the user's current ceiling* and is simultaneously the control
for asking to exceed it. The constraint and its escape hatch are the same
element.

**Feedback form labels** `[observed]`:
`What did you like about this article? (optional)` — the positive path is
open-text and explicitly optional; the negative path is four canned reasons (T14).

## T6 Status & state language

**Board state is a named, first-class concept** `[documented]`:
`Status for boards` is a help article, and the pricing matrix lists
`Board statuses` as a Business-plan feature. So a board carries a lifecycle label
the team sets — the collaborative-document equivalent of a Jira status. Specific
status values are behind auth. `[absent]`

**Lock as a state, with its own failure article** `[observed]`:
`The board is locked` (troubleshooting) and `use protected lock` /
`add protected lock` (permissions). Two lock concepts — the ordinary lock and the
`protected lock` that only owners and co-owners can apply — with the adjective
doing the privilege distinction.

**Recovery states** `[documented]`: `Trash bin` · `Content Recovery` (a named
feature, capitalised) · `Activity list` · `board history` · `board backups` ·
`Restoring board content`. The help FAQ answer distinguishes restoring a **board**
from restoring **content** and routes them to different mechanisms — deleted
boards come back from the `Trash bin` or by opening the board link, deleted
elements come back via `Content Recovery` after locating a deletion event in the
`Activity list`. Two different granularities of undo, named separately.

The same answer carries a bolded scope limit: **only board owners can restore
their boards.** Stated before the user attempts it.

**Status page: a region interstitial before any status** `[observed]`.
`status.miro.com` does not show status. It shows a routing page:

> "The status of Miro and all related services is constantly monitored and updated on this site."
> "To view the latest status for Miro, please select the appropriate data residency region for your application below."
> "By default, Customer Content is hosted in the EU."

Then four region cards, each label + qualifying line:
`EU` "Default EU Data Center Residency for the majority of new and existing
customers" · `US` "…(login via us.miro.com or company.miro.com) for Enterprise
plan users" · `AU` "…(login via au.miro.com) for Enterprise plan users" ·
`JP` "…(login via jp.miro.com) for Enterprise plan users".

**The disambiguation is done by the URL the user logs in at** — a concrete,
checkable cue rather than "ask your admin what region you're in". It then adds
the fallback anyway: "If you're unsure about your hosting location, please contact
your organization's administrator."

This is a real trade-off recorded honestly. A user whose board just died now has
to answer a data-residency question before seeing whether anything is down. The
copy is well written; the gate itself is a cost. Mitigated by one good line:
"If you're unable to access Miro and there is no information posted here, please
contact us via this form" — the page pre-empts the "status says green but I'm
broken" case, which most status pages ignore.

**Per-region status wording** `[observed]`, and it is first-person plural, which
is unusual for a status page:
> `We're fully operational`
> "We're not aware of any issues affecting our systems."

The second line is a **carefully bounded claim** — not "everything is fine" but
"we are not aware of". It admits the limit of the company's own visibility. That
single hedge is the most transferable string on the page.

**Components are six, mixed in grain** `[observed]`:
`Web Site` · `Log in ability` · `Application` · `Billing` · `Mail System` ·
`MCP server`. `Log in ability` is an awkward but genuinely user-framed name (the
user's capability, not the auth service). `Application` is the opposite — it is
the whole product under an engineering noun, so a user who cannot open a board
has to guess between `Web Site` and `Application`. `Mail System` and
`MCP server` are internal nouns. Compare Loom's four activity-named components,
which are cleaner.

Also present: `Upcoming scheduled maintenance` as a labelled slot, and a date
range control (`Jun 2026-Sep 2026`).

**Maturity labels** `[observed]`: `(BETA)` in `Breakout frames (BETA)` and
`Visitor names (BETA)`; `(Beta)` in `Miro Support Bot (Beta)`. Two casings.
`ISO 42001 READY` — a compliance badge using `READY` rather than `CERTIFIED`
beside three badges that do say `CERTIFIED` / `COMPLIANT`. The distinction is
real and the badge is honest about it, which is worth noting positively.

**Deprecation handled inside a title** `[observed]`:
`Columns (formerly Kanban)`. Miro renamed the feature and carried the old name in
the article title so the old search term still lands. **But** a separate
`Kanban` article also exists, `Kanban` is a live nav item under `Formats`, and
`Tables, Timeline, & Kanban` is a pricing matrix row. So the rename either
half-happened or was reversed, and the help centre now asserts that Kanban is
called Columns while the rest of the product calls it Kanban. Recorded as a
defect.

## T7 Error, failure & recovery

`[observed]` as titles; several bodies read via the help-home FAQ.

**First-person failure titles are the dominant form** — Miro uses this pattern
more consistently than Loom:

- `I can't log in`
- `I can't log in via SSO`
- `I can't access or edit a Miro board`
- `I lost my board or content`

Four titles, one grammar, no drift. `I lost my board or content` is the standout:
it takes the user's framing (*I lost it*) over the system's (*content was
deleted*), does not assign blame, and covers both granularities in one title so
the panicking user does not have to know which they lost.

**`Why …?` articles for adverse system behaviour** `[observed]`:
- `Why does Miro keep logging me out?`
- `Why did I get an email about an inactive team?`
- `Why can't I log in to my account?` (help-home FAQ)
- `Why do I have unexpected charges?` (help-home FAQ)

`Why does Miro keep logging me out?` names the company as the actor of the
annoyance — *Miro* keeps logging you out, not "sessions expire". Naming yourself
as the cause of the irritation is rare and disarming.

`Why do I have unexpected charges?` is the most consequential one, and its answer
is a model of blame-free causal explanation. Summarised: users who see
unexpected charges have usually added seats without meaning to; when you set your
team size you set how many licences exist; once they are used up, any further
invitee is **automatically** added as a member and charged for. It then states
that the extra charges are prorated and you are only billed for the time used,
and routes to a dedicated article — `Accidentally added seats`.

Three things are doing work there. The cause is a *default the system applied*,
and the copy says so rather than saying the user made a mistake. The financial
consequence is bounded immediately (prorated, time-used-only) so the anxiety is
capped in the same paragraph. And **`Accidentally added seats` exists as a help
article title** — the adverb "accidentally" is in the title, which means Miro has
named its own billing footgun in the IA.

**Bare noun-phrase problem titles** `[observed]`:
`Board export issues` · `Board performance and loading issues` ·
`Google authorization issue` · `Issues with confirmation code emails` ·
`Issues with touchscreen / digital pen devices` ·
`Troubleshooting mobile and tablet device issues`. Six of eighteen use `issue(s)`
— a hedge word. `Google authorization issue` is a specific third-party failure
named in the IA, as with Wise's named-issuer articles.

**The help-home `Trending topics` list is a failure list** `[observed]`, and
this is the best signal in the file about real demand versus IA:
`How to restore a deleted board` · `How to move boards` ·
`Issues with confirmation code or password reset emails` · `Miro integrations` ·
`Domain control` · `Sharing with users outside your team`.

Four of six are recovery or permission problems, yet neither recovery nor
permissions is a top-level help category. Miro solved this with a
`Trending topics` shelf and a 13-question FAQ accordion on the help home rather
than by restructuring the IA — a pragmatic patch, and worth recording as such.
Note also that the trending link reads `Issues with confirmation code or password
reset emails` while the actual article is titled
`Issues with confirmation code emails`; the shelf label is broader than the
article. Two strings for one destination.

**Access-denial copy** `[documented]`, the flagged collaboration strength:

> "If you follow a board link and see this message, it means the board isn't shared with you yet."

The word **`yet`** is the whole pattern. The denial is framed as a not-yet-done
state rather than a refusal, and the immediate next instruction is the escape:
click `Request Access`, which emails the board owner, who "will be able to give
you access and define your access rights." The user is told who will decide, what
they will decide, and that a decision is possible.

The partial-access case gets its own escalation: a user with view or comment
rights clicks the `Comment only` button top-right and selects
`Request editor rights`. So **both "no access" and "not enough access" have a
named request action**, and the second is reachable from a control that displays
the current limit. There is also an eligibility caveat stated in place: this
feature is not supported on the Education plan.

Then the pre-emptive pointer for the confusing case:
`I can't access a board even though I've been granted access or I created it` →
routed to `I can't access or edit a Miro board`. The gap between
"permission granted" and "access working" is anticipated.

**Interference warning, repeated four times** `[observed]` — the most
content-designed thing in the Miro harvest. Each of the four tabs of
"Changing access rights" (individual, team/company, Spaces, public) ends with a
⚠️ warning saying the user **may retain their previous level of access** if the
board is also shared by any of the other three routes, and links to
`Who has access to my board?`.

Revoking one grant does not revoke access, because access is the union of four
independent grants. Rather than explain the union model once, Miro repeats the
warning in all four places, each time **enumerating the other three routes by
name**. Redundancy chosen deliberately over elegance, because the user is only
ever reading one tab. The same article's FAQ restates it a fifth time:
`I removed a user from my board but that user is still present on the board. How
do I stop the user's access?`

There is a second, sharper warning in the same tabs: if you are not the board
owner and you have access *via* the team or Space you are about to remove, invite
your own email to the board first **or you will lose access to the board as soon
as you remove that access**. A self-lockout footgun, disclosed before the click,
with the remedy stated first.

**Admin-lockout recovery** `[observed]`, help-home FAQ:
`How do I regain access if my Miro Admin left the company?` The answer is
unusually candid — it tells you to get IT to give you the departed admin's
mailbox, change the password in their Miro profile, log in as them, and grant
yourself admin. It then offers a documentary fallback: on paid plans you can
submit a paper signed by an officer of the company confirming the transfer of
admin rights. **A social-process fallback documented in a help centre**, which
most products handle only through support scripts.

**Support-of-last-resort** `[observed]`: `Contacting Miro Support` ·
`How to troubleshoot and report a bug` · `Miro Support Bot (Beta)` ·
`Add Miro to allowed apps` · `Allowlist Miro mailers`. The last two are
*IT-directed* articles a user is expected to forward — the help centre writes for
the user's sysadmin as a secondary audience.

## T8 Empty states

`[absent]` for in-canvas empty states (empty dashboard, empty board, no search
results) — all behind auth.

**Status page "all clear" state** `[observed]`, handled well, see T6:
`We're fully operational` plus the bounded "We're not aware of any issues
affecting our systems." Two lines, one asserting, one admitting the limit of the
assertion.

**Two rendering defects that look like empty-state failures** `[observed]` on the
`Using Miro` category page: the `Import and Export` and
`Troubleshooting & Technical Questions` sections each render a **link with no
label** — the markup emits `*[](url)*`, an italicised empty anchor where a
"See all N articles" string should be. Every other section on the page shows
`See all 18 articles` / `See all 21 articles`. Two sections have a visible but
unlabelled control. Recorded as a defect.

## T9 Notifications & system messages

**Notification deliverability treated as a user-facing topic** `[observed]` —
the help-home FAQ carries `How can I ensure that all Miro notifications reach
me?` and the answer is entirely operational: allow up to 30 minutes for
delivery, check Junk / Spam / Social / Updates / Promotions, and if it is not
there ask your administrator to allowlist the domains — which it then **lists in
full** (`miro.com*`, `*.miro.com`, `mirostatic.com*`, `*.mirostatic.com`,
`realtimeboard.com*`, `*.realtimeboard.com`).

Three good decisions: the wait time is stated as a number, the five Gmail tab
names are enumerated rather than "check your spam folder", and the technical
payload the user must forward to IT is supplied verbatim so they do not have to
ask. The legacy domain `realtimeboard.com` is included, which quietly confirms
mail still originates from the pre-rename domain.

Paired article: `Allowlist Miro mailers`.

**Notification controls** `[documented]`:
`Manage notifications and email preferences` · `@Mentioning people on the board`
· `Understand the notifications page` (Loom's equivalent; Miro's is
`Manage notifications and email preferences`).

**Lifecycle nudge emails exist and are explained** `[observed]`:
`Why did I get an email about an inactive team?` — Miro writes a help article for
its own dormancy email, i.e. it anticipates that an automated nudge will read as
alarming and pre-writes the explanation.

**In-canvas system messaging** `[documented]`: `Attention management` (pull
collaborators' viewports), `Catch up` (what changed while you were away),
`Breakout frames (BETA)`. All three are notification-shaped features named as
features rather than as messages. Verbatim toast and banner strings `[absent]`.

**Help-article feedback confirmations** `[observed]`:
`Thank you for your feedback!` and, adjacent in the DOM,
`Error! Please try later...` — a failure string with an exclamation mark, a
missing "again", and a trailing three-dot ellipsis. Three problems in five words,
on a Zendesk-default control. Recorded as a defect.

## T10 Disclosures, legal & compliance

**Seat-model disclosure is the standout, and it is unusually direct**
`[observed]`, pricing FAQ `Who counts as a paid member?`. Summarised: members
consume a paid seat and get full access; guests have a free account, do not
consume a seat, and are invited only to specific boards with limited
capabilities; visitors reach boards through a public link, free, with no account.
Then the bounding sentence that matters:

> the Free plan has no Guest role, so **anyone you invite automatically becomes a Member and uses a paid seat**.

That is the exact mechanism behind the `Why do I have unexpected charges?`
support load (T7), disclosed on the pricing page *before* purchase rather than
only in the help centre after the bill. Pricing-page copy and support copy
telling the same story is rarer than it should be.

**Proration asymmetry stated plainly** `[observed]`, FAQ
`What happens if I add or remove members mid-cycle?`: adding is prorated so you
pay only for days remaining; **removing takes effect at renewal, not
immediately**; if you want fewer seats, act before the renewal date. The
asymmetry (additions instant, removals deferred) is the part users get wrong, and
it is the part the answer leads with. Same treatment for plan changes: upgrades
immediate and prorated, downgrades and cancellations at end of term, and
`Miro plans auto-renew` stated as its own clause with the consequence attached —
cancel before renewal or be charged.

**Invoicing withdrawal disclosed** `[observed]`, FAQ
`What payment and billing options do you offer?`: invoicing is annual-only, needs
10 licences on Starter or 5 on Business, supports card / ACH (US only) / wire —
and then, "invoicing is no longer available in all countries, only for existing
users that have been paying via invoicing before the change was introduced." A
**grandfathered withdrawal of a payment method**, stated on the pricing page. It
also names the billing provider (Stripe) and lists what an invoice contains.

**AI credit disclosure is scoped and bounded** `[observed]`. Credits are
"pooled across your organization", "consumed per AI action", usage varies by
feature, and — the operative clause — **"Credits reset monthly and do not roll
over to the next month if you haven't finished them."** Expiry disclosed in the
same sentence as the allowance. Visibility is bounded too: Billing admins and
Company admins can check the balance any time; "The credit balance is not shown
on Free plans." A product telling free users up front that they cannot see their
own meter is a real, if unflattering, disclosure.

There is a numeric inconsistency: the comparison matrix shows the Free plan's
AI credits as `Limited trial`, while the FAQ answer says the Free plan gets
`10 credits per month`. Two different answers to the same question on one page.

**AI training disclosure, four words** `[observed]`, FAQ
`Does Miro use my data to train AI?`:

> "No, your data is not used to train Miro AI models."

Answer-first, no preamble, no hedge, scoped to Miro's own models. The narrowness
is doing work — it says nothing about third-party model providers, which is
either careful or a gap depending on the reader.

**Encryption stated in-line rather than linked out** `[observed]`, FAQ
`How does Miro handle AI and data security?`: TLS 1.2 or higher in transit,
AES 256 at rest, GDPR and CCPA compliance, and — the commercially relevant
clause — "at no additional cost". Baseline security is asserted as
plan-independent before the Enterprise upsell begins.

**Data-residency disclosure carries its own cost warning** `[observed]`, and it
is in the *footnotes of the comparison matrix* rather than buried in a contract:

> "** Migration fees apply for existing customers moving from EU to the US, Australia, or Japan data residency."

Paired with the first footnote, "* Existing Enterprise customers on a different
license may have varying feature availability. Contact your account team for
details." Both footnotes address the **existing-customer** case, which pricing
pages almost never do — they are written for buyers, and Miro's are annotated for
renewers.

**Comparison-matrix value vocabulary** `[observed]`, seven distinct values doing
disclosure work in a grid:
`Included` · `Not included` · `Paid add-on` · `Limited trial` · `View only` ·
`Low-res only` · `Basic shapes`, plus additive forms
(`+ Jira and Asana`, `+ Visio & Lucidchart import`,
`+ specialized shape packs & custom shapes`) and quantified forms
(`3`, `5`, `Unlimited`, `25 per member`, `100 MCP calls`,
`Up to 50 participants`).

`Not included` over a dash or blank cell is the right call — an explicit negative
cannot be misread as an oversight. `Paid add-on` as a third state between
included and excluded is honest about the upsell. `Limited trial` is the vague
one, and it is exactly where the credit-count inconsistency above appears.

**Compliance badging** `[observed]`: footer badges `ISO 42001 READY`,
`ISO 27001 CERTIFIED`, `SOC 2 COMPLIANT`, `GDPR COMPLIANT`, all linking to
`trust.miro.com`; pricing page adds `SOC 3` and `TISAX` with expansions spelled
out (`TISAX` → "Trusted Information Security Assessment Exchange",
`NIST` → "National Institute of Standards and Technology"). **Acronyms glossed
at the point of display** rather than assumed. And `READY` rather than
`CERTIFIED` for ISO 42001 — a one-word honesty distinction sitting beside three
badges that claim more.

**Privacy footer** `[observed]`: `Terms of Service` · `Privacy Policy` ·
`Manage Cookies` · `Do Not Sell or Share My Personal Information` (CCPA, linking
to `?ccpa=true`).

**A marketing promo injected at the top of a permissions article** `[observed]`
— recorded as a negative finding. `Board access rights`, the article a user
reaches when trying to work out who can see their board, **opens** with:

> 🚀 Give your work the audience it deserves. Publish on Miroverse to more than 60 million users.

A cross-sell for making content *public*, in rocket-emoji voice, at the top of the
article about restricting access. It is also the source of the `60 million` figure
that conflicts with the home page's `100M+`. Same category of error as Loom's
upsell banner on its status page: promotional content placed on a surface the
user reached because they were worried.

## T11 Help-centre architecture

**Platform:** Zendesk (`realtimeboardhelp.zendesk.com` visible in the sign-in
URL — the pre-rename company name persisting in infrastructure). Localised into
seven languages plus en-US, with per-article translated slugs
(`Board-Zugriffsrechte`, `Permissões-de-acesso-ao-board`).

**Shape:** 6 categories → ~40 sections → several hundred articles, with sections
nesting one level deeper in places (`Facilitation Tools` →
`Asynchronous Tools`; `Formats` → `Prototyping`, `Diagramming`). Category pages
show 4–6 articles per section with a `See all N articles` overflow, so the
category page is a **sampler, not an index** — the reverse of Atlassian's
everything-in-the-sidebar approach used by Loom.

**Article-title grammar — six shapes:**

| Shape | Example |
|---|---|
| Bare noun (dominant for reference) | `Cards`, `Frames`, `Fonts`, `Grid`, `Blueprints`, `Spaces` |
| `How to …` | `How to move a board`, `How to transfer board ownership`, `How to delete your profile` |
| `I can't / I lost …` | `I can't log in via SSO`, `I lost my board or content` |
| `Why …?` | `Why does Miro keep logging me out?` |
| `What is …?` | `What is Miro?`, `What is Miroverse?`, `What is Miro Insights?` |
| `X issues` | `Board export issues`, `Google authorization issue` |

The **bare-noun family is the largest**, and that is a real choice: for a
canvas tool, most articles document an *object on the board* (`Cards`, `Frames`,
`Connection lines`, `Code block`, `Mind map`, `Org chart`, `Timeline Builder`),
so the title is the thing you clicked. It makes the help centre readable as an
object catalogue. The cost is that these titles carry no task — a user who wants
to know how to connect two shapes must guess that `Connection lines` is the
article.

`What is X?` is reserved for the three coined concepts (`Miro`, `Miroverse`,
`Miro Insights`), which is a disciplined use of the shape.

**Routing furniture** `[observed]`, and the ordering is the notable part. On the
help home: search prompt → six categories → `Trending topics` →
`Frequently asked questions` (13 items with full answers inline). Self-service is
stacked three deep before any contact route appears, and the only contact link is
buried inside an article footer.

Per article: breadcrumb → `Articles in this section` sidebar (with `See more`) →
body → social share row → feedback widget → `Related articles` (five, generated)
→ `Return to top` → footer strip (`Miro Changelog` · `Status Page` ·
`Miro Community` · `Pricing` · `Miro Academy`).

The ticket link is the last thing on the page and phrased as a condition, not an
invitation: "If you would like to get a reply from the Miro Support team, please
create a ticket here." Human support is offered as the option that produces a
*reply*, which is a fair way to distinguish it from the feedback widget
immediately above.

**In-article navigation devices** `[observed]`: tabbed sub-content inside a
single article. `Board access rights` uses a five-tab strip
(`Board owner` / `Board co-owner` / `Edit` / `Comment` / `View`) and a four-tab
strip (`Change an individual user's access` / `Change team or company access` /
`Change Spaces access` / `Change public access`). One article, nine tabs.

That is why the retained-access warning is repeated four times (T7) — each tab is
read in isolation. The tab strip also exposes a labelling inconsistency: the
role tabs read `Board owner`, `Board co-owner`, then `Edit`, `Comment`, `View` —
two agent nouns followed by three bare verbs, for what the body then calls
`Editors`, `Commenters`, and `Viewers`. **Three vocabularies for five roles in
one control.**

**Emoji as a callout system** `[observed]`, used consistently:
🚀 promotional · 💡 tip or pointer · ⚠️ warning · ✏️ roadmap or
"we're planning to". The ✏️ usage is interesting — it flags forward-looking
statements ("We're planning to expand visibility, allowing these roles to also
appear under Active users"), so the help centre has a marker for
*not-yet-true*. Emoji standing in for a typed callout component is fragile
(screen-reader announcement varies, and the meaning is learned not labelled) but
the consistency is real.

## T12 FAQs

Miro runs **two substantial FAQ sets**, both with answers in server HTML.

**Pricing FAQ — 17 questions, verbatim, in order:**

| # | Question (verbatim) |
|---|---|
| 1 | How do I pick the right plan? |
| 2 | Who counts as a paid member? |
| 3 | How does Miro's pricing work? |
| 4 | Is Miro free? What are the Free plan's limits? |
| 5 | What are AI Credits and how are they counted? |
| 6 | What happens if I add or remove members mid-cycle? Or about re-sizing mid-cycle? |
| 7 | What payment and billing options do you offer? |
| 8 | How do I upgrade, downgrade, or cancel? |
| 9 | Do you offer discounts for education or nonprofits? |
| 10 | Do you offer discounts for startups? |
| 11 | Can I try a paid plan before buying? |
| 12 | Does Miro work with my other AI tools? |
| 13 | How does Miro handle AI and data security? |
| 14 | Does Miro use my data to train AI? |
| 15 | We need additional help on documentation (like an MSA or security questionnaire). Who can I reach out to? |

**Structural notes.** The arc is: choose → **who costs money** → how pricing
works → free limits → credits → mid-cycle churn → payment → plan changes →
discounts (three consecutive) → trial → AI interop → AI security → AI training →
enterprise procurement.

Q2 at position two is the tell, and it is the right call: for a per-seat
collaborative product the single most expensive misunderstanding is *which
invitee costs me money*, and Miro answers it before explaining the pricing model
at all. Compare Loom, which puts its channel-confusion question at position 2 for
the same reason.

Q4 and Q6 are **compound questions**. Q4 (`Is Miro free? What are the Free plan's
limits?`) pairs the marketing claim with its bound in one item — the Wise
claim-then-bound pattern applied to an FAQ slot. Q6
(`What happens if I add or remove members mid-cycle? Or about re-sizing
mid-cycle?`) is compound *and* ungrammatical — the second sentence has no verb.
A visible defect in the highest-stakes billing question.

Q15 is not a question but **a statement of need with a question appended**, and
it is written in the first person plural of a buying committee ("We need
additional help…"). The FAQ switches speaker for the enterprise-procurement slot:
fourteen questions from an individual, one from a company. Deliberate, and a
neat way to signal "this answer is for your legal team."

Three consecutive AI questions (12–14) escalate correctly: interop → security →
training data. Training data last, answered in one sentence.

**Help-centre FAQ — 13 questions, verbatim:**

| # | Question (verbatim) |
|---|---|
| 1 | What should I do when my board isn't loading? |
| 2 | Why can't I log in to my account? |
| 3 | Why do I have unexpected charges? |
| 4 | How do I convert members to guests? |
| 5 | Where can I find my invoices and how can I change some information on them? |
| 6 | How do I add content to my board? |
| 7 | How do I regain access if my Miro Admin left the company? |
| 8 | How to change from yearly to monthly payments? |
| 9 | How can I access my paid subscription if my team still shows as Free? |
| 10 | How to move boards between teams and profiles? |
| 11 | How can I restore deleted boards and content? |
| 12 | How can I ensure that all Miro notifications reach me? |
| 13 | *(no thirteenth — twelve captured; see Caveats)* |

**Structural notes.** Eleven of twelve are failures or recoveries. Only Q6
(`How do I add content to my board?`) is a happy-path question, and it sits at
position six, surrounded by billing and access problems. **The help home's FAQ
is a de facto troubleshooting index** — which is the same finding as
`Trending topics` (T7): Miro's real support demand is unhappy-path, and the
category IA does not reflect it.

Q1 is the only one whose answer is a **numbered diagnostic ladder** — check the
status page, try incognito, clear cache, update the browser and check bandwidth,
reinstall the app, then two performance caveats about many collaborators and
heavy boards. Ordering is correct: the free external check first, the destructive
local fix later, and the two "it might not be broken" explanations last, each
linked to a tips article. Telling the user that a board legitimately loads slower
with more people and more content — rather than treating slowness as always a
fault — is honest expectation-setting.

Q8 and Q10 are phrased as **`How to …?`** — a headless infinitive with a question
mark, against ten siblings using `How do I …?` / `How can I …?`. Two grammars in
one accordion.

Q9 (`How can I access my paid subscription if my team still shows as Free?`) is
the most product-specific question in the set, and its answer carries the key
mental-model correction: an upgrade "applies not to your profile but to a
specific team", so a user in several teams holds different licences in each. A
one-sentence fix for a structural misconception.

## T13 Terminology & glossary

| Term | Miro's usage | The alternative it rejected |
|---|---|---|
| `board` | The primary object throughout, never "canvas" when countable | "document", "file", "whiteboard" (reserved for the format/SEO page) |
| `canvas` | The *surface*, uncountable: "one, infinite, multiplayer canvas", "on the canvas" | — a clean count/mass distinction: you own boards, you work on canvas |
| `Intelligent Canvas™` | Trademarked platform name | the only ™ on the site |
| `multiplayer` | Simultaneous editing | "real-time collaborative" |
| `Spaces` | Container for boards and formats; has its own role set | "Projects" (Miro's own older term, visible in legacy asset filenames like `change_project_access_rights`) |
| `Blueprints` | A templatised Space | "team template" |
| `Formats` | Docs / Tables / Slides / Diagrams / Kanban as one category | "views", "file types" |
| `Miroverse` | The public template gallery | "community templates" |
| `Sidekicks` | AI agents that assist board layout | "assistant", "copilot" |
| `Flows` | AI-driven layout/sequence feature; also used as a marketing verb | "workflows" (which also exists as `AI Workflows` — two nearby names) |
| `TalkTrack` / `Talktracks` | Recorded voice-over walkthrough of a board | "narration", "voice comment" — **but note the two casings** |
| `Engage` | Named product for polls, 2x2 matrix, scales | "audience response" |
| `Catch up` | What changed since you were last here | "recent activity", "digest" |
| `Attention management` | Facilitator pulling collaborators' viewports | "follow me", "spotlight", "bring everyone here" |
| `Breakout frames` | Sub-group areas within a board | "breakout rooms" |
| `Visitors` / `Guests` / `Members` | Three-tier collaboration identity, defined by account status *and* commitment frequency | "external user", "collaborator" |
| `Can edit` / `Can comment` / `Can view` | Grant-time capability labels | role nouns at grant time |
| `Owner` / `Co-owner` / `Editor` / `Commenter` / `Viewer` | The same five roles as agent nouns, in prose | — a second complete vocabulary |
| `protected lock` | Owner/co-owner-only lock | "hard lock", "admin lock" |
| `Content Recovery` | Restoring deleted elements (as opposed to boards) | "undo", "version history" |
| `Columns (formerly Kanban)` | Renamed feature, with the old name carried in the title | — and contradicted by a live `Kanban` article and nav item |
| `Miro Insights` | Analytics product | "Analytics" |
| `get great done` | Company slogan, leaking into body copy as "getting great done in Miro" | — grammatically broken in running prose |
| `AI credits` | Metered AI unit, pooled org-wide, expiring monthly | "tokens", "requests" |
| `MCP calls` | Unit of AI-tool integration usage, in the pricing matrix | — protocol jargon exposed to buyers |

**The `Visitors` / `Guests` / `Members` triad is the most transferable naming
work in this file.** Each is defined along two axes at once — account status and
frequency of involvement — and the help copy states the axis explicitly:
`Visitors` are "one-time Miro users", `Guests` are "occasional Miro users",
`Members` are "full team participants for ongoing collaboration". Frequency
adjectives (`one-time`, `occasional`, `ongoing`) do the distinguishing work, so
the tiers are memorable without a table. The same article then lands the
commercial consequence: "On paid plans, members always occupy a license."

**Admin roles are split by *what they administer*, not by seniority**
`[observed]`: `Team Admin` · `Company Admin` · `User Admin` · `Content Admin` ·
`Security Admin` · `Billing Admin`. The rationale is stated in the copy for two
of them — `User Admin` exists so "the Company Admin can delegate responsibilities
without assigning unnecessary permissions", and `Content Admin` is for managing
content "without needing full admin privileges". **Least-privilege explained as
the reason a role exists**, in the role's own description. Both also carry the
explicit non-claim that admins "don't receive any special level of access to
other users' content" — a privacy reassurance embedded in the permission
documentation.

**A four-scope role model, with the conflict rule stated** `[observed]`. Roles
exist independently at board, Space, team, and company level, and `Roles in Miro`
states how they resolve: "If a user already has a role on a specific board, the
role with *maximum access* takes effect", and when Space membership is revoked
the user "loses space-incurred access rights and retains only the roles on boards
received directly". **The union/maximum rule is documented rather than left to be
discovered** — which is what makes the four-times-repeated retained-access
warning (T7) coherent rather than merely repetitive.

**Register split.** Marketing says `Innovation Workspace`,
`Intelligent Canvas™`, `AI Innovation Workspace` (page title), `Product Operating
System`, `Ways of Working Transformation`. Help says `board`, `frame`,
`sticky note`, `Share`, `Can edit`. The abstraction gap between the two surfaces
is wider than Loom's or Wise's — a buyer reading the home page and a user reading
help are being addressed in almost disjoint vocabularies.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the
company, and Miro uses `we` more than most — including on the status page
(`We're fully operational`, "We're not aware of any issues") and in the help
centre's own promises ("We're planning to expand visibility…"). The accessibility
page is almost entirely `we`: "Our goal is simple", "we test every new feature",
"We don't just audit Miro's accessibility — we work directly with users".

**Register.** Plainer than Loom, less plain than Wise. Marketing is
abstraction-heavy rather than superlative-heavy — the risk is vagueness
(`Innovation Workspace`, `works the way you do`, `moving the needle`) rather than
hype. Help is flat, procedural, and unusually willing to state conditions and
consequences in the same sentence.

**Exclamation marks are rationed but present**: `Welcome to Miro!` (help-home
category line, appropriate), `Error! Please try later...` (inappropriate —
an exclamation on a failure), `Thank you for your feedback!`.

**The feedback control is the most distinctive voice artefact in this file**
`[observed]`:

> `Was this article helpful?` → `Yes, thanks` / `Not really`

Not Yes/No. `Yes, thanks` puts *politeness in the user's mouth* and `Not really`
is a softened negative that lowers the cost of criticising — a user who found the
article useless is more likely to click "not really" than "No". Whether that
softening biases the data is a fair question; as microcopy it is doing real
emotional work in four words.

The negative branch then offers four canned reasons, and they are a better
taxonomy than Loom's three because one of them is not about the content at all:

- `This article didn't answer my questions or solve my problem`
- `I found this article confusing or difficult to read`
- `I don't like how the feature works`
- `Other`

`I don't like how the feature works` gives the user a place to say *the docs are
fine, the product is wrong*. Most help-feedback widgets force product complaints
into "not helpful" and corrupt their own content metrics. Separating them is a
genuinely good instrumentation decision expressed as microcopy.

The positive branch asks `What did you like about this article? (optional)` —
open text, marked optional. Praise is unstructured, criticism is structured.
Defensible: you act on the structured half.

**Accessibility content — the richest in the corpus so far** `[observed]`

The `/accessibility/` page makes four commitments in plain language:
- Target is **WCAG 2.2 AA** ("We strive to meet WCAG 2.2 AA standards, while delivering a great customer experience") — the "while" clause is an honest admission of tension rather than an unqualified claim
- **ACR/VPAT updated annually**, obtainable by emailing `accessibility@miro.com` — a named contact, not a form
- Every new feature is tested for accessibility
- The accessibility team works **directly with disabled users**, specifically naming screen-reader users and neurodiverse individuals, and distinguishes this from auditing: "We don't just audit Miro's accessibility — we work directly with users to validate and improve it."

Named user-side capabilities: `Keyboard navigation` (via `command palette`),
`Assistive technology experience` ("Board objects are perceivable and editable
for screen reader and voice control users" — note **editable**, not just
readable), `Color accessibility` ("Colors in color pickers are named"), and
`Reduced motion`.

Named **author-side** tooling, which is the part most products lack entirely:
- `Accessibility checker` — "scans your boards to identify accessibility issues and offers clear, actionable tips"
- `Alternative text for images`
- `AI alternative text suggestions`

And a `Miro Accessibility changelog` at its own URL. **Publishing a dated
accessibility changelog** is the strongest single signal on the page — it makes
the commitment falsifiable.

**Two labelling notes.** The alt-text control is surfaced in-product as an `ALT`
icon whose tooltip reads `Description` — so the icon speaks HTML and the tooltip
speaks human. Defensible, but it means the word a user searches (`alt text`) and
the word the UI shows (`Description`) differ, and help uses a third
(`Alternative text`). Second, the accessibility-checker screenshot shown as proof
displays **853 total issues** on the example board (636 description issues marked
critical/serious, 217 contrast issues). Miro chose a screenshot of a badly
failing board to demonstrate the tool — arguably good faith, arguably an
unfortunate hero image for a page about accessibility.

**Alt text quality** `[observed]` — the accessibility page's own alt text is
scene-level and genuinely descriptive, and several entries describe **disability
without euphemism or pity**:
"Smiling woman using sign language during a video call on her laptop in a cozy
home office" · "Man with a hearing aid working on a laptop in a modern open
office space" · "Person using a refreshable braille display with both hands,
positioned above a computer keyboard." · "Woman sitting at a desk by a window,
reviewing a diagram on her laptop and taking notes in a notebook".

The product-screenshot alt text is better still, because it describes **UI state
and purpose**, not appearance: "Miro's command palette open with options like
Timer, Frame, Mind map, and more, supporting keyboard navigation for quick
access" · "Miro board showing a yellow sticky note with the color picker open.
Each color has a name label, like 'Dark Green,' to support accessible color
selection." · "Miro settings menu open under Preferences, showing 'Reduce motion'
toggle enabled to minimize animations for accessibility."

Two sentences, second sentence explains *why the state matters*. This is the
model for alt text on a feature screenshot and it is directly reusable.

**Accessibility gaps** `[observed]`
- **No skip link** found in the server HTML of `miro.com` or `miro.com/pricing` — neither `Skip to content` nor equivalent. Loom and Wise both ship one. For a company publishing a WCAG 2.2 AA commitment and an annual VPAT, this is the sharpest contradiction in the harvest. Flagged as observed-in-server-HTML; a client-rendered skip link cannot be ruled out.
- The home page's twelve-logo customer strip renders as `![]()` — **twelve images with entirely empty src and alt**, i.e. the logo wall carries no accessible names at all (the pricing page's equivalent strip does carry names: `![asos]`, `![ubisoft]`).
- Numerous Framer hero and decorative images carry no alt attribute rather than explicit empty alt.
- Help-centre callouts rely on emoji (🚀 💡 ⚠️ ✏️) to carry semantic weight; announcement varies by screen reader and the meaning is unlabelled.
- Help-article inline GIFs carry filename-derived alt (`share_via_email_greybg.gif`, `commenter_s view.png`, `viewer mode.png`) with the human description in an adjacent italic caption instead. The caption text is good ("Commenter's view of the board", "Removing team access to a board") — it is simply in the wrong attribute.

**Negative findings, recorded honestly**

- Help `Administration` category scope line names retired plans (`Team`, `Consultant`); help FAQ answers reference `Team Settings`, `Team plan`, `Company Admin on Business Plan` — the help centre is scoped to a superseded plan taxonomy
- Templates counted as `6,000+` (home) and `7000+` (pricing); different value and different separator
- Free-plan AI credits shown as `Limited trial` in the matrix and `10 credits per month` in the FAQ on the same page
- User counts: `100M+` people (home) vs `more than 60 million users` (Miroverse promo in help)
- `Columns (formerly Kanban)` coexists with a live `Kanban` article, nav item, and pricing row
- `TalkTrack` (nav) vs `Talktracks` (pricing matrix)
- `(BETA)` vs `(Beta)`
- `No access` (board/public/team) vs `None` (Spaces) for the same revoke action in one dialog
- `Anyone at the team` vs `Anyone with team` in one article
- `Request Access` (Title Case) vs `Request editor rights` (sentence case)
- `Contact sales` and `Contact us` on one page for one motion; `Start for free` / `Buy this plan` / `Try for free` / `buy now` / `Select plan` for plan selection
- `Learn more` bare, ten-plus times, on a page that also demonstrates the correct destination-specific pattern in its `Need help getting started?` block
- `Check this out` as a standalone CTA with no object
- `Dive in to ways of working` — should be `into`
- `getting great done` — slogan forced into running prose
- FAQ Q6 second sentence has no verb: "Or about re-sizing mid-cycle?"
- Help FAQ mixes `How do I …?` with headless `How to …?`
- `Error! Please try later...` — exclamation on a failure, missing "again", trailing ellipsis
- Two sections on the `Using Miro` category page render an empty unlabelled link where `See all N articles` belongs
- `Trending topics` label `Issues with confirmation code or password reset emails` is broader than the article it points to, `Issues with confirmation code emails`
- A rocket-emoji Miroverse cross-sell ("Give your work the audience it deserves") sits at the top of the `Board access rights` article
- Marketing server HTML duplicates whole sections three times (Framer responsive variants), which screen-reader users may encounter repeatedly — flagged as suspected, not confirmed
- `No credit card needed.` appears twice consecutively in the hero

---

## Transferable patterns

1. **Name the axis, not just the list.** `By Business Segment` / `By Industry` /
   `By Team` / `By Strategic Initiative` tells the visitor *why* the options are
   grouped that way, so they can pick the dimension they already think in.
   Applies to any nav or filter set with more than one valid taxonomy.
2. **"Yet" turns a denial into a queue.** "it means the board isn't shared with
   you **yet**" plus `Request Access` plus "they will be able to give you access
   and define your access rights." The user learns the state is temporary, who
   decides, and what they decide. Condition: only use `yet` where a request route
   genuinely exists — otherwise it is a false promise.
3. **Put the current ceiling on the button that raises it.** The `Comment only`
   control both displays the user's limit and opens `Request editor rights`.
   Constraint and escape hatch as one element. Transfers to any tiered or
   limited state — spend caps, verification levels, feature gates.
4. **Repeat the interference warning once per path, and enumerate the other
   paths by name.** Access is the union of four independent grants, so revoking
   one does not revoke access. Miro warns in all four tabs rather than explaining
   the model once. Redundancy beats elegance when each tab is read alone.
   Directly relevant to any system where permissions or limits compose.
5. **Disclose the default that costs money, on the pricing page.** "the Free plan
   has no Guest role, so anyone you invite automatically becomes a Member and uses
   a paid seat" — the exact mechanism behind the top billing complaint, stated
   pre-purchase. Then name the footgun in the help IA too:
   `Accidentally added seats`.
6. **State proration asymmetry, and lead with the one that hurts.** Additions are
   prorated immediately; removals take effect at renewal. Users get the second one
   wrong, so the answer leads with the asymmetry and tells them when to act.
7. **Bound the all-clear.** "We're not aware of any issues affecting our systems"
   admits the limit of the company's own visibility, and the status page
   separately pre-empts "it says green but I'm broken" with a contact route.
   Never write "everything is working".
8. **Teach permissions during onboarding.** `Roles in Miro` is article five of
   five in `Start here`, before the user has made anything. For any product whose
   first real action is sharing, the vocabulary has to land before the first
   share dialog.
9. **Put the author-side accessibility article in first-run onboarding.**
   `How to make your Miro boards more accessible` sits in `Getting Started`
   alongside `How to access Miro boards with assistive technologies` — one for
   consuming, one for producing, both at week one, where habits form.
10. **Separate "docs are bad" from "product is bad" in help feedback.** Offering
    `I don't like how the feature works` as a distinct reason stops product
    complaints from corrupting content-quality metrics. And `Yes, thanks` /
    `Not really` lowers the social cost of a negative answer.
11. **Alt text for a feature screenshot takes two sentences: state, then why.**
    "Miro settings menu open under Preferences, showing 'Reduce motion' toggle
    enabled to minimize animations for accessibility." Describe the UI state,
    then the purpose it serves.
12. **Explain least privilege inside the role's own description.** `User Admin`
    exists so a Company Admin can "delegate responsibilities without assigning
    unnecessary permissions", and admins "don't receive any special level of
    access to other users' content". The security rationale and the privacy
    reassurance land where the role is defined.

## Caveats & gaps

- **In-canvas tooltips and onboarding overlays — the flagged benchmark strength —
  were not directly observed.** They are behind auth. What was captured is the
  onboarding *IA* (real, `[observed]`) and a handful of tooltip labels visible
  only inside marketing screenshot alt text (`Description` above the `ALT` icon;
  a keyboard-shortcut tooltip on a selected sticky note). Verbatim tooltip
  strings are `[absent]`. An authenticated pass on a fresh board is the single
  highest-value follow-up for this product.
- **Framer triple-rendering.** `miro.com` server HTML repeats the stat band,
  capability carousel, AI block, and `Need help getting started?` block three
  times, and `No credit card needed.` twice. Strings were deduplicated by hand;
  there is a small risk that a variant differing between duplicates was collapsed.
- **Help-home FAQ: twelve of a possible thirteen captured.** The accordion's
  final item may have been truncated in the fetch. Counted as twelve and marked
  as such in T12 rather than guessed at.
- **Comparison matrix read at default state.** ~90 rows captured; the
  `Show key features` expanders were read as server-rendered, so a
  client-only row cannot be ruled out.
- **Article bodies: four of several hundred opened.** `Board access rights`,
  `Roles in Miro`, and the two FAQ sets were read in full; everything else in T7
  and T11 is title-level. Titles are high-signal for IA and task phrasing and say
  nothing about answer structure.
- **`trust.miro.com` and `miro.com/ai-trust/` not fetched.** The compliance badges
  all link there and it would likely carry the substantive security disclosure
  copy. T10 rests on the pricing FAQ and footer badges instead.
- **No published content style guide or voice-and-tone documentation found.**
  Miro's design system (`Mirotone`) is a component/token library rather than a
  content guide, and was not inspected. The accessibility page is the closest
  thing to published content standards. `[absent]`
- **`miro.com/accessibility/changelog/` not fetched** — it is named and linked and
  would be the best evidence for whether the WCAG commitment is being met.
- **Status observed in a fully operational state.** No live or historical incident
  text was captured, so incident-communication register
  (severity escalation, update cadence, post-incident wording) is `[absent]`.
  `status.miro.com/eu/history` would supply it.
- **Locale.** en-US throughout. The help centre is localised into seven
  languages; no non-English page was inspected, so nothing is claimed about
  translated register.
- **Skip-link absence is an observation about server HTML**, not a confirmed
  accessibility failure. A client-injected skip link would not appear in this
  harvest.
- Mobile app strings, email templates, and the signup flow are outside the
  unauthenticated web surface.

## Sources

1. https://miro.com/
2. https://miro.com/pricing/
3. https://miro.com/accessibility/
4. https://help.miro.com/hc/en-us
5. https://help.miro.com/hc/en-us/categories/360001415214-Getting-Started
6. https://help.miro.com/hc/en-us/categories/360001420434-Using-Miro
7. https://help.miro.com/hc/en-us/sections/360003249154-Troubleshooting
8. https://help.miro.com/hc/en-us/articles/360017572194-Board-access-rights
9. https://help.miro.com/hc/en-us/articles/360017571194-Roles-in-Miro
10. https://status.miro.com/
11. https://status.miro.com/eu
