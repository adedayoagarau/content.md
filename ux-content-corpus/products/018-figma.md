# 018. Figma

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Collaborative interface design / multiplayer design platform |
| Primary URL | https://www.figma.com/ |
| Corpus rank | 018 |
| Benchmark strength (source list) | Permissions, collaboration, version states |
| Locale / market observed | en-US (help centre localised into 9 further locales) |
| Platform observed | Web (desktop marketing), Zendesk help centre ("Figma Learn"), Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR-facing privacy summary, SSO/SAML/2FA enforcement as plan features, audit reports, Modern Slavery Statement and Climate Disclosure Statement published, Impressum; no sector regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — **the live pricing page did not render**; a stale/degraded version served instead (see Caveats). Permissions and version-history documentation is exceptionally complete. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / product | https://www.figma.com/ | Hero, full nav tree, footer, product family, stat |
| Pricing | https://www.figma.com/pricing/ | **Served a stale render** — legacy plan names, no current seat model. Recorded as a finding, not as current copy |
| Help centre home ("Figma Learn") | https://help.figma.com/hc/en-us | Four-way top nav, ten-product grid, routing blocks; several sections fail to load |
| Sharing and permissions (section) | https://help.figma.com/hc/en-us/sections/35463323337751-Sharing-and-permissions | Three sub-sections, ~19 articles — the permission IA |
| Guide to sharing and permissions | https://help.figma.com/hc/en-us/articles/1500007609322-Guide-to-sharing-and-permissions | **Priority source for T10** — the conceptual model |
| File and folder permissions | https://help.figma.com/hc/en-us/articles/35361119554711-File-and-folder-permissions | Share-modal strings, inheritance rules, worked examples |
| Team permissions | https://help.figma.com/hc/en-us/articles/360039970673-Team-permissions | Team-scope roles, `Who can access` dropdown, visibility states |
| Request to edit a file | https://help.figma.com/hc/en-us/articles/4408435431319-Request-to-edit-a-file | `Ask to edit`, approve/deny flow, badge state |
| View a file's version history | https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history | **Priority source for T6** — checkpoint model, restore semantics |
| Manage files and folders (section) | https://help.figma.com/hc/en-us/sections/360006050633 | File-management IA, projects→folders migration |
| Troubleshoot (section) | https://help.figma.com/hc/en-us/sections/1500000378401 | Five sub-sections of failure articles |
| Status | https://status.figma.com/ | 17 components, five-value severity scale |

---

## T1 Navigation & IA labels

**Global nav — five items** `[observed]`

`Products` · `Solutions` · `Community` · `Resources` · `Pricing`, with
`Log in` · `Contact sales` · `Get started` / `Get started for free`.

`Products` opens a two-column grid of **ten named products**, each with a
one-line scope, and this is the notable artefact — Figma has fragmented into a
product family and the nav does the disambiguation work:

| Product | Scope line (verbatim) |
|---|---|
| `Figma Design` | "Design and prototype in one place" |
| `Figma Make` | "Prompt to code anything you can imagine" |
| `Figma Weave` | "AI workflows for imagery, video, audio, and more" |
| `Dev Mode` | "Translate designs into code" |
| `Figma Motion` `New` | "Animate your designs" |
| `FigJam` | "Collaborate with a digital whiteboard" |
| `Figma Slides` | "Co-create presentations" |
| `Figma Draw` | "Illustrate with advanced vector tools" |
| `Figma Sites` `Beta` | "Publish fully responsive websites" |
| `Figma Buzz` `Beta` | "Produce on-brand assets at scale" |

Every scope line is a **verb phrase naming what you do**, not what the product
is. `Co-create presentations` for Slides is the sharpest — the differentiator
(co-) is a single prefix. Two names break the `Figma X` convention: `FigJam`
(portmanteau) and `Dev Mode` (a mode, not a product), and `Dev Mode` is the only
member with no `Figma` prefix, which correctly signals it is a lens on Design
rather than a sibling.

**Maturity labels are inline and consistent in the nav**: `New` on Motion,
`Beta` on Sites and Buzz. Two states, applied uniformly, appearing in nav,
footer, and help centre alike. Compare Loom's four casings of "beta".

**`Solutions` is cut on three axes, each labelled** `[observed]`: an unlabelled
task list (`Prototyping`, `UX design`, `Web design`, `Wireframing`,
`Online whiteboard`, `Agile`, `Strategic planning`, `Brainstorming`,
`Diagramming`, `Product development`, `Web development`, `Design handoff`), then
`Roles` (`Design` · `Engineering` · `Product managers`), then `Organizations`
(`Enterprise` · `Education` · `Government`). Naming the axis for two of three
groups; the task list is left unlabelled, which is the weaker choice.

**Help centre nav — four items, and they are cut by *purpose*, not by product**
`[observed]`:

`Get started` · `Product documentation` · `Administration` ·
`Courses, tutorials, projects` · `Help`

This is a genuinely unusual top-level split. Most help centres cut by product
first. Figma separates **learning** (`Courses, tutorials, projects`) from
**reference** (`Product documentation`) from **administration** from
**failure** (`Help`). A user who wants to be taught and a user who needs a fact
take different doors at the top.

`Administration` is then sub-split by **who is asking**:
`For everyone` (`Account`, `Files and projects`) versus
`For administration` (`Billing`, `Teams`, `Organizations`, `Enterprise`).
Naming the audience of a help section, in the section heading, is directly
reusable — an individual contributor knows on sight that four of the six
groupings are not for them.

**Three routing blocks with labelled intent** `[observed]`:
- `Find out more` → `Courses and collections` · `Projects` · `Tutorials`
- `Get solutions` → `Troubleshoot` · `Work with support` · `Common questions`
- `Couldn't find what you needed?` → `Forums` · `Best practice guides` · `Contact support`

`Get solutions` is the block a broken user needs, and its three children are
correctly ordered by escalation: self-diagnose (`Troubleshoot`
"Get help with common issues and troubleshoot unexpected behavior"), prepare a
ticket (`Work with support` "Submit a bug report, get help collecting log files,
and find your system information"), then browse (`Common questions`).

`Work with support` is the standout label — not "Contact us" but
**"work with"**, framing support as a collaboration in which the user has
homework (logs, system info). The scope line lists that homework. It sets the
expectation before the user arrives at a form.

**`Couldn't find what you needed?`** with the reassurance
"Don't worry, we've got more options for you." — a failure state for the help
centre itself, placed at the foot of the home page, with human contact last.

**Help breadcrumbs are four deep** `[observed]`, e.g.
`Figma Learn - Help Center` → `Administration` → `Sharing and permissions` →
`Overview` → article. Deep but legible; the `Overview` level exists to hold the
conceptual guides separately from the procedures.

**Sharing and permissions section — three sub-sections, correctly ordered**
`[observed]`:
1. `Overview` — the three conceptual guides (`Guide to sharing and permissions`, `File and folder permissions`, `Team permissions`)
2. `Share and collaborate` — the doing articles (10)
3. `Ownership and roles` — the governance articles (6)

Concept → action → governance. A user learns the model, then performs the task,
then handles the edge cases (transfer, claim, admin override). This is the
single best-organised sub-tree in the corpus so far.

**Footer — six groupings** `[observed]`: `Figma Socials` · `Product` · `Plans` ·
`Use cases` · `Resources` · `Company`. `Status` and `Legal and privacy` sit
under `Resources`; `Modern slavery statement` and `Climate disclosure statement`
are first-class footer links, as PDF/static assets.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `The intelligent canvas for infinite creativity`

Six words, no subhead, one CTA (`Get started`). It is the most compressed hero
in the corpus — and also the vaguest. `intelligent` and `infinite` are both
doing brand work rather than explanatory work, and the page title does the
explaining instead: `Figma: The collaborative canvas for design, code, and AI`.
**The `<title>` is more informative than the H1** — it names three concrete
domains where the H1 names none. A findability-versus-aspiration split, and the
findability copy is better.

**The section headers carry the actual argument** `[observed]`, and they are
written as **paired declaratives**:

- `One workspace for your entire product development process.` — sub: "Made so your whole team can go from WIP to ship, together."
- `Move fast in the right direction on an AI-native canvas.`
- `Powerfully expressive. Incredibly precise.` — sub: "Every technical tool you need to dial in the details."
- `Start with design context. Build with consistency.`
- `Explore what you can do in Figma.`
- `The products you love are designed in Figma`

Three of six are **two-sentence adjective or verb pairs** naming a tension and
claiming both sides: expressive *and* precise, context *and* consistency, fast
*and* in the right direction. The construction is the Figma house style on this
page: assert the trade-off, then claim you have resolved it. `Move fast in the
right direction` is a direct rebuke of "move fast and break things" and is the
best line on the page.

Note every section header takes a **full stop** except the testimonial header.
Deliberate and consistent, unlike Loom.

**Two-card capability split, imperative + outcome** `[observed]`
- `Design anything you can imagine` — "Turn your ideas into apps, websites, and products." → `Explore design tools`
- `Build with intention` — "Dev tools that take you all the way to production." → `Explore build tools`

`Build with intention` against `Design anything you can imagine` is a
register contrast doing real work: design is framed as unbounded, build as
disciplined. The CTA pair (`Explore design tools` / `Explore build tools`) is
object-specific, not `Learn more`.

**`WIP to ship`** — internal shorthand promoted to marketing copy, and it works
because the alliteration carries it. Compare Miro's `get great done`, which does
not.

**Social proof is a single bounded statistic** `[observed]`:

> `95%` — "95% of the Fortune 500 uses Figma"
> "Based on data from March 2025."

**One number, one claim, one dated provenance line.** No stat band, no
carousel of customer outcomes. The provenance footnote is the Wise
claim-then-bound pattern applied to a social-proof figure, and it is the only
number on the page. Considerably more disciplined than Loom's four conflicting
user counts or Miro's six-figure stat wall.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Nav, hero | |
| `Get started for free` | Nav (second render) | **Two labels for one button** — appears to be a responsive or state variant |
| `Log in` | Nav | |
| `Contact sales` | Nav | |
| `Explore design tools` / `Explore build tools` | Home capability cards | Object-specific |
| `Explore Figma Design` / `Explore Figma Make` | Home sections | Named destination |
| `Browse all templates` | Community section | |
| `Skip to main content` | First in DOM | Accessibility — present, unlike Miro |
| `Sign Up` | Pricing (stale render) | Title Case; conflicts with nav's `Get started` |
| `Share` | File, folder, and team toolbars | One verb, three scopes |
| `Ask to edit` | File toolbar, `can view` users | **See T7 — the best string in this file** |
| `Request access` | Denied resource | |
| `Save` | Permission dialogs | |
| `Change permissions` | Inherited-permission row | |
| `Remove` | Per-collaborator, share modal | |
| `Show Version History` | File-name menu | Title Case |
| `Save to Version History` | File-name menu | Title Case; `⌘⌥S` / `Ctrl+Alt+S` |
| `Name This Version` | Version row menu | Title Case |
| `Restore This Version` | Version row menu | Title Case |
| `Delete Version Info` | Version row menu | Title Case — and precise (see T6) |
| `Duplicate` | Version row menu | Sentence case — **inconsistent with its four siblings** |
| `Copy link` | Version row menu | Sentence case |
| `Restore from version` | File browser, modifier-click | Sentence case; near-duplicate of `Restore This Version` |
| `Edit current version` | Exit from version-history browsing | The exit is framed as resuming work, not as "Close" |
| `Show older` | Version-history timeline | Progressive disclosure |
| `Open` | Post-duplicate notification | |
| `Back to files` | Figma menu, from inside a file | Names the destination, not "Exit" |
| `Copy as code` · `Copy link` · `Copy properties` · `Copy text` | Right-click `Copy/Paste as` | A four-way copy menu; each names its payload |
| `Yes` / `No` | Help article feedback | |
| `Submit article feedback` | Help feedback | |
| `Subscribe to Updates` | Status page | |

**Observation: near-zero bare `Learn more` on the marketing surface.** The home
page ships `Explore design tools`, `Explore build tools`,
`Explore Figma Design`, `Explore Figma Make`, `Browse all templates`,
`See all solutions`, `See all` — every one names its object. This is the Wise
discipline, and Figma holds it better than either Loom or Miro. `Learn more` does
appear throughout the help centre, but almost always as
`Learn more about <specific thing>` (`Learn more about admin permission
management`, `Learn more about the transition from projects to folders`,
`Learn more about creating and managing user groups`).

**Casing defect in the version-history menu.** Five commands, three Title Case
(`Name This Version`, `Restore This Version`, `Delete Version Info`) and two
sentence case (`Duplicate`, `Copy link`) — in one dropdown. The Title Case
cluster is legacy Figma style; the sentence-case items are newer. Recorded as a
defect.

## T4 Onboarding & getting-started

**`Get started` is the first item in the help nav and a top-level category**
`[observed]`, with a dedicated home-page block:

> `Get started, super fast`
> "Guides that will help you get familiar with Figma and FigJam quickly so you can start collaborating with your team to build better products."

Note the goal chain in the subhead: *familiar* → *quickly* → *start
collaborating* → *build better products*. Onboarding is framed as a route to
collaboration, not to proficiency. For a multiplayer product that is the right
terminal state to name.

**Learning is separated from documentation at the top level** `[observed]`, with
three named formats each carrying its own promise:

| Format | Promise (verbatim) |
|---|---|
| `Courses and collections` `New` | "Level up your Figma skills with these comprehensive skill-based courses." |
| `Projects` | "Get hands-on experience in Figma with these practical bite-sized projects." |
| `Tutorials` | "Explore tools and features by watching and following along with these expert-led video tutorials." |

Three learning modalities — structured course, practice exercise, guided video —
distinguished by **time commitment and mode** (`comprehensive` vs
`bite-sized`; reading vs doing vs watching). A learner can self-select on
available attention. `Projects` links into the help centre; `Tutorials` links
straight to YouTube, so the format label also predicts the destination.

**Course-completion incentive named** `[documented]` via Miro comparison — not
applicable here; Figma's `Level up` framing is the only gamification language.

**Onboarding of *collaborators* is treated as a distinct job** `[observed]`:
`Guide to collaborating with clients in Figma` sits in the file-management
section, i.e. Figma documents how to onboard an *external* person into your
file. Combined with `Accept invitations` as its own article, the invitee's
first-run experience is documented separately from the inviter's.

**Feature-gate disclosure as an onboarding device — the `Who can use this
feature` box** `[observed]`. Every substantive help article opens with a boxed
preamble headed `Before you start` / `Who can use this feature`, stating plan
availability and the permission required. Examples:

- Version history: "Available on any team or plan. Members of Starter teams can only view 30 days of a file's version history… Anyone with Can view access to the file can view and browse the file's version history. Only people with Can edit access to the file can create, name, remove, or restore a file's version history."
- File and folder permissions: "Available on all plans. Only owners and those with `can edit` permissions on a file or folder can make changes to permissions on that file or folder."
- Request to edit: "Available on any team or plan. Anyone with `can view` access to a file in a team can request to edit it"

And the help centre **teaches the reader that this box exists**:

> "Tip: Review the 'Who can use this feature' box at the top of each Figma Learn article to understand access for individual features."

This is the strongest structural pattern in the Figma harvest. Every article
answers *can I even do this?* before *how do I do this?*, in a consistent
position, with a consistent heading, and the convention is itself documented. For
a product where capability is the product of plan × seat × permission × scope,
it removes the most common wasted read. Directly transferable to any tiered or
role-gated product.

## T5 Form & field labels

**Share modal — the primary permission surface** `[documented]`

| Label | Scope | Notes |
|---|---|---|
| `Share` | File, folder, team | One button, three levels |
| `Who has access` | Dropdown heading | A **question as a field label** |
| `Who can access` | Team-creation dropdown | **Near-duplicate of the above** — see defects |
| `What they can do` | Second dropdown | Paired with the first; third person, plural |
| `Can edit` | Permission value | |
| `Can view` | Permission value | |
| `Owner` | Permission value (not assignable) | |
| `People invited to folder` | Access-scope value | Names the audience as a set |
| `Only those invited` | Access-scope value (team) | **Different phrasing for the same concept at team level** |
| `Only people added to [Folder name] can access` | Inherited-permission value | Interpolates the folder name |
| `Anyone in [NAME] inherits access` | Inherited-permission value | Interpolates the parent name and uses the verb `inherits` |
| `[Workspace name]` / `[Plan name]` / `[Organization name]` | Access-scope values | The scope is named after the user's own org |
| `View and comment only` | Capability value (folder) | |
| `Edit files, add people, and change their permissions` | Capability value (folder) | **A full sentence as a dropdown option** |
| `View` / `Edit` | Capability values (team) | **Two-word forms of the same two options at team level** |
| `Visible` / `Hidden` | Team discoverability states | |
| `Title` / `Description` | Version-save dialog | |
| `Show older` | Version timeline | |

**The `Who has access` → `What they can do` pairing is the flagship.** Two
dropdowns, phrased as two questions in plain second/third person, that together
compose a sentence: *who* has access, and *what they can do*. The user is not
asked to understand a permission matrix; they are asked to complete a sentence
about other people. And the option values scale with the stakes — the
consequential one is written out in full (`Edit files, add people, and change
their permissions`) rather than compressed to `Edit`, because it silently grants
*delegation* as well as editing. **The option label discloses the second-order
power it confers.** That is the most reusable single string in this file.

The defect is that the same two choices are labelled differently at folder level
(`View and comment only` / `Edit files, add people, and change their
permissions`) and at team level (`View` / `Edit`, with the explanation moved out
into prose: "Organization or workspace members can create/edit files, add
members, and manage team permissions"). The team-level dropdown has the same
delegation consequence and does not say so in the label.

**`Anyone in [NAME] inherits access`** uses the system's own model word
(`inherits`) in a user-facing option, and it is the right call here because the
concept is explained at length in the adjacent guide. A user who has read the
guide recognises the word; a user who has not can still read the sentence.

**Version-save constraints given as numbers in the instructions** `[documented]`:
"Figma clips titles longer than 25 characters." and "To see the full descriptions
at a glance make sure your descriptions are less than 140 characters." Plus the
honest limitation: "You can add URLs here, but Figma doesn't turn these into
clickable links." **Three field constraints and one feature absence, disclosed
in the help text for a two-field dialog.** The URL admission is the notable one —
documenting what the field does *not* do.

## T6 Status & state language

*Priority section.*

**Version history is modelled as a timeline of `checkpoints`, and the noun is
load-bearing** `[documented]`.

> "Figma saves your work by adding checkpoints to the file's version history. Figma records a new checkpoint every 30 minutes and keeps the current version up to date with your file changes."

The vocabulary distinguishes four things that most products conflate:

| Term | What it means |
|---|---|
| `checkpoint` | The immutable substrate — created every 30 minutes, **cannot be removed** |
| `autosave version` / `autosaved version` | A checkpoint with no human metadata; shows only a date and time |
| `version` (created) | A checkpoint the user deliberately saved via `Save to Version History` |
| `named version` | A checkpoint given a `Title` and `Description` |
| `current version` | The live head, kept continuously up to date |

The distinction pays off in the **delete semantics**, which are the most
carefully written state copy in this harvest:

> "It's not possible to remove checkpoints from the file's history. It is possible to delete the information related to some versions…"

So the menu item is `Delete Version Info` — not `Delete Version`. Deleting does
not remove history; it **demotes a named version back to an autosave version**,
and the copy says exactly that: "Figma will treat this like an autosave version
and show only a date and time. This won't remove any contents from your file, or
prevent you from viewing that version of the file." Then the irreversibility and
the recovery path in one sentence: "You can't undo the action of deleting
version information. You can name the autosaved version again to create a new
checkpoint."

**A destructive-sounding action, renamed to describe what it actually destroys,
with its non-effects enumerated and its remedy supplied.** This is the single
best piece of state copy in the corpus so far and the reason Figma is in it.

**Restore is disclosed as non-destructive, and the mechanism is shown**
`[documented]`:

> "This is a non-destructive action, so you can still access the current version in the file's version history."

Then the copy explains what restoring actually *does* — it appends, rather than
rewinds:

> "Figma will add two autosave checkpoints to the file's version history." — one saving the state up to the moment `Restore This Version` was clicked, and one at the same timestamp for the version just restored.

Telling the user that "undo" is implemented as two new forward entries
pre-empts the "where did my current work go?" panic entirely. It is followed by
a genuinely useful tip: "You can name the restored version and the version
before, to make it easier to find them again."

**Comment behaviour across restore is spelled out, including the exception**
`[documented]`. Comments survive restore — all of them, from all versions,
including resolved ones — and the copy gives a worked example with numbers
(a version with 3 comments restored into a file with 9 keeps all 9). Then the
carve-out, stated flatly: "Restoring a previous version doesn't restore any
deleted comments. **Deleting a comment is a permanent action.**"

Two orthogonal lifecycles (file versions, comments) whose interaction is
non-obvious, documented with an example and a named exception. Most products
leave this to be discovered.

**Version metadata is enumerated as a display contract** `[documented]` — beside
each version the user sees: name, description of changes, the time and date
created, and "The name and avatar of the main contributor." `main contributor`
rather than "author" is a considered choice for a multiplayer file where a
checkpoint has many editors — it concedes that attribution is approximate.

**Version retention differs by plan, disclosed twice** `[documented]`: Starter
teams and Drafts get 30 days; Professional, Education, and organizations get the
entire history. Stated in the `Who can use this feature` box and again as an
inline `Tip` with the upgrade route. A **capability that silently expires**, so
the redundancy is justified.

**Collaboration and sharing states** `[documented]`
- `File links are live by default.` — the default state of a shared link named as a state. "When you share a link to a file, anyone viewing the file will see the latest version of the file." Then the alternative: you can share a link to a *previous* version, "handy if you'd like to continue iterating on a design, without that person seeing your changes." The social motive for freezing a link is named out loud.
- `Ready for dev` — a design-level state used in Dev Mode focus view, with its own version history per marked design
- Pending edit requests render as "a red badge… on the share button" — a state indicator on the control that resolves it (the Miro `Comment only` pattern)
- Team discoverability is a two-value state: `Visible` ("Members can discover and request access in the file browser") and `Hidden` ("The team cannot be found by search. Members must be invited by an existing member.")

**`Visible` / `Hidden` is a state pair where each value states its own
consequence** — discoverable-and-requestable versus unfindable-and-invite-only.
The user picks an outcome, not a toggle.

**Branching is named as the adjacent concept and deliberately deflected**
`[observed]`, at the top of the version-history article:

> "Looking for version control? Learn how to create branches and merge conflicts and changes →"

Version *history* and version *control* are distinguished, and the reader
searching for the wrong one is redirected in the first screen. A one-line
disambiguation at the point of likely confusion.

**Status page severity scale** `[observed]`, five values:
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`. Roll-up: `All Systems Operational`. Empty states:
`No incidents reported today.` / `No incidents reported.`

**Seventeen components**, and the grain is mixed but mostly user-facing:
`Admin, Billing & AI credits` · `Community & Forum` · `Dev Mode` ·
`Email & Notifications` · `File Browser & Search` · `Figma agent` ·
`Figma Design` · `FigJam` · `Figma Make` · `Figma Motion` · `Figma Slides` ·
`Figma Weave` · `MCP` · `Plugins & Widgets` · `Real-time collaboration server` ·
`REST API` · `Sign-in & Account Access`.

Seven are product names, which is the right choice for a product family — a user
who knows they are in Slides finds `Figma Slides`. `Real-time collaboration
server` is the notable one: **the multiplayer layer has its own status
component**, separate from the products it serves, so "I can open the file but I
can't see anyone else's cursor" is diagnosable. `Sign-in & Account Access` and
`File Browser & Search` are named as user activities. Each component carries a
`?` affordance for an explanation. Compare Miro's six (two of which are
internal nouns) and Loom's four.

## T7 Error, failure & recovery

**`Ask to edit` — the best microcopy in this file** `[documented]`

A user with `can view` access sees `Ask to edit` in the toolbar. Three words,
and the choices inside them are all correct: `Ask` rather than `Request`
(social, low-ceremony, and true — a person will decide); `to edit` naming the
capability rather than the role; no punctuation, no "Would you like to". The
adjacent tooltip, per the screenshot alt text, indicates that editors can grant
access — so the user learns *who can say yes* from the control itself.

The surrounding copy then does three more things:

1. **Names the permission the user needs and why:** "Whether you're looking to make quick edits or you're joining as a main collaborator in a Figma Design or FigJam file, you'll need `can edit` access to make changes." Both the small case and the large case, so the user recognises their situation.
2. **Describes the notification round trip:** the owner is notified by email and in-app; the owner and anyone with `can edit` can view and approve; if approved, the requester gets an email and in-app notification and "can start editing the file right away."
3. **States the social benefit explicitly:** "This eliminates the need to track down people to give you access, making it a more efficient and less disruptive process."

That third clause is unusual — the help article explains the *organisational*
reason the feature exists, not just its mechanics. It tells the requester that
asking is normal and not an imposition, which is the actual barrier to using it.

**The approver's side is designed too** `[documented]`: pending requests surface
as a red badge on the `Share` button; clicking opens the share modal with
`approve` / `deny` options; owners are additionally notified by email and via
"the notification bell" in the file browser. **Three surfaces for one pending
state**, enumerated.

**And the failure mode of the fix is disclosed** `[documented]`: if the
requester's seat type does not cover the product, edit permission alone will not
help — they must also `make a seat request`, and "Only admins can approve or
deny seat upgrade requests." Two different requests, two different approvers,
stated together so the user does not wait on the wrong person.

**A dedicated troubleshooting block inside the conceptual guide** `[observed]`.
`Guide to sharing and permissions` ends with `Troubleshooting access`, listing
the two causes in order of likelihood:

- **`Team vs. folder access`** — "Being in a team doesn't always guarantee folder or file access." The most common false assumption in the product, stated as a negative.
- **`Seats vs. permissions`** — "a collaborator needs both the correct seat and `can edit` access to edit a file." With the caveat on the remedy: "Seats will only be approved according to admin's seat approval settings."

Putting the top two access failures at the foot of the *explainer* — rather than
in a separate troubleshooting article — means the person setting permissions
reads about the failures they are about to cause. Preventive placement.

**Troubleshoot section — five sub-sections, grouped by artefact not by symptom**
`[observed]`: `General` (15 articles) · `Fonts` (5) · `Images` (1) ·
`Audio` (1) · `Figma Make` (1). Titles from `General`:

- `Figma Desktop app not working on Windows`
- `Local network access in Figma`
- `Troubleshooting checklist`
- `Clear the Figma desktop app cache`
- `Error 404 when loading Figma files`

`Error 404 when loading Figma files` is the notable one — **the raw error code
is in the title**, because that is what the user will search. `Troubleshooting
checklist` as a named artefact is the generic first-resort article, positioned
third rather than first.

`Fonts` earns its own sub-section with five articles
(`Missing font alert in Figma Design`, `Manage conflicting fonts`,
`Access and troubleshoot missing Adobe fonts in Figma Design`,
`Troubleshoot the Figma Font installer`, `Uninstall the Figma font helper`) —
a support-volume signal made visible in the IA. Note `Figma Font installer`
versus `Figma font helper` in adjacent titles: two names for the same local
agent, or two different components with confusingly similar names. Either way, a
defect.

**No first-person failure titles.** Figma uses system-subject or artefact-subject
titles throughout (`Figma Desktop app not working on Windows`,
`Missing font alert`), where Miro uses `I can't log in` and Wise uses
`I sent the wrong amount`. Given Figma's failures are mostly environmental
(fonts, cache, network) rather than user mistakes, this is defensible —
first-person confession titles would misattribute blame. Consistent with the
principle that confession titles belong only to user-caused errors.

**Recovery vocabulary inventory** `[observed]`:
`Restore This Version` · `Restore from version` · `Delete and restore files` ·
`Claim ownership of a folder` · `Transfer ownership of files or folders` ·
`Transfer ownership of a team` · `Incomplete merges or updates` ·
`What can I do offline in Figma?` · `Save a local copy of files`.

`Claim ownership of a folder` is the departed-owner recovery path, named as a
user action rather than an admin process — compare Miro, which routes the same
scenario through mailbox access and a signed letter.

## T8 Empty states

**Multiple sections of the help centre home fail to load, and the loading copy is
what remains** `[observed]` — recorded as a defect, and it is a real one:

- Under `What's new at Figma`: `Looking for updates...`
- Under `Popular topics`: `Fetching topics...`
- Under `Featured videos`: `Fetching videos...`
- `Level up with a course` renders as a heading with **no content and no message at all**

Three loading strings and one silent failure on the help centre's front door.
`Looking for updates...` and `Fetching topics...` are two different grammars for
the same state (present participle of the user's goal versus present participle
of the system's action), and all three use trailing three-dot ellipses. Whether
these are perpetual failures or slow client fetches cannot be determined from a
server-side harvest — but they are what an unauthenticated visitor sees, and
there is no timeout or error message behind them.

**`Couldn't find what you needed?`** `[observed]` — the help centre's designed
empty state, at the foot of the home page: "Don't worry, we've got more options
for you." followed by three routes. `Don't worry` is the only reassurance-phrase
in Figma's public copy, and it is placed where a user has already failed once.

**Status page clear state** `[observed]`: `All Systems Operational`,
`No incidents reported today.` / `No incidents reported.` — same two-string
pattern as Loom (same Statuspage platform).

In-canvas empty states (empty file browser, empty version history, no search
results) are behind auth. `[absent]`

## T9 Notifications & system messages

**The request-to-edit round trip is fully documented as a notification design**
`[documented]`, and it is enumerated per party and per surface:

- Requester → owner: email **and** in-app notification
- Owner sees pending state in three places: a red badge on the `Share` button, an email message, and "the file browser via the notification bell"
- On approval, requester → email **and** in-app notification, and "can start editing the file right away"

**Naming every surface on which a pending state appears** is the transferable
part. A user who missed the email knows to look at the bell; a user who ignores
the bell will see the badge next time they open the file.

**Invitations are a two-step state with their own article** `[documented]`:
`Accept invitations`. Invitees "receive an email invitation and a notification in
their Figma account. To access the resource, they just need to accept the
invitation." The acceptance requirement is stated, so an inviter who sees no
activity knows why.

**Crash and disconnection messaging** `[documented]`:

> "Figma will also add autosave checkpoints to your file in the event that you lose your internet connection or Figma crashes."

Routed to a dedicated article on **unsaved changes**, and separately to
`What can I do offline in Figma?`. Figma documents its own crash behaviour as a
safety feature rather than hiding it. The adjacent notification string is
`Missing font alert in Figma Design` — a named alert with its own article.

**Post-action notification named** `[documented]`: after duplicating a version,
"Figma will show a notification that the version has been duplicated. Click
`Open` to open the file in a new tab." A toast whose action is the next step
rather than a dismissal.

**Status page subscription** `[observed]`: email covers `creates`, `updates` or
`resolves`; SMS covers only `creates` or `resolves`. Same per-channel scoping as
Loom (shared Statuspage template) — the narrower promise is stated rather than
implied.

## T10 Disclosures, legal & compliance

*Priority section. This is why Figma is in the corpus.*

**The two-word permission vocabulary** `[documented]`

Figma's entire access model is expressed in two values, and the definitions are
written as capability sentences, not as role descriptions:

> - **`Can view`**: "People with `can view` access can only perform certain 'read only' actions, like inspecting properties, following, and commenting."
> - **`Can edit`**: "People with `can edit` access can make changes to files and folders."

Three things worth taking. First, `can view` is defined by **example, not by
exclusion** — the three things you *can* do are named (inspect, follow, comment)
rather than the things you cannot, so "view" is revealed to mean considerably
more than looking. Second, `'read only'` is quoted, flagging it as jargon being
borrowed rather than asserted. Third, `following` is listed as a view-level
capability, which is a multiplayer-specific right most products would not think
to name.

`Owner` exists as a third value but is described as a fact rather than a grant —
"The person who created the folder", "Has `can edit` access". It cannot be
assigned from the dropdown; it is transferred. So the *assignable* vocabulary is
two values and the *structural* vocabulary is three.

**Permissions are disclosed as a capability table, per scope** `[documented]`.
The file-level table is four rows and is the clearest artefact:

| Action | `Can Edit` | `Can View` |
|---|---|---|
| Modify or edit the file | yes | no |
| Add comments | yes | **yes** |
| View layer properties | yes | **yes** |
| Copy/export assets | yes | **yes** (unless copying and exporting is restricted) |

Three of four rows are identical across the two permissions. Publishing a table
where the difference is **one row out of four** is a confident disclosure — it
tells a file owner that `can view` is a much weaker restriction than the name
suggests, and that the actual leak vector is row four. That row then carries its
own exception inline, linking to `Restrict copying and sharing on files`.

**The inheritance model, with a stated floor** `[documented]`

> "When you give someone access at a higher level, like a team or folder, they'll inherit permissions for everything inside it."

And the asymmetry, which is the operative rule:

> "You can grant someone additional access at the file level… Keep in mind that **you can't restrict someone's access below what they already have** through their folder or team permissions."

**Permissions compose upward only.** A file-level grant can exceed the inherited
level but never undercut it. This is the correct architectural choice *and* the
correct disclosure — it tells the user that tightening must happen at the level
where the access originates, which is exactly the mistake Miro's four-times
repeated warning exists to catch. **Figma states the rule once, as a rule; Miro
repeats the symptom four times.** Both work; stating the rule is cheaper and
generalises.

**Worked examples with named people, used systematically** `[documented]`.
Across three articles the same technique appears at every branch point:

- `James` has `can view` on a folder, is invited to one file with `can edit`, "he'll be able to edit that file, while still only viewing other files in the folder."
- `Jesse` has `can view` on **Fruit Folder** so cannot create files there, but has `can edit` on **Apple** and `can view` on **Banana**; `Jules` has `can edit` on the folder so can create files and edit both.
- `John` has `can edit` team permissions so gets `can edit` on the folder by default; `Jeanie` has `can view` so gets `can view`.
- `Ernie` has a `Collab` seat and is invited to three files: File A (Figma Design, `can edit`) — **cannot edit, because the seat does not cover Design**; File B (FigJam, `can edit`) — can edit; File C (FigJam, `can view`) — cannot edit.

Named people, fruit-named files, one variable changed per example. `Ernie`'s is
the important one because it is the only place the **seat × permission
interaction** is made concrete, and it demonstrates the counter-intuitive case
first: full edit permission and still no edit. Using a deliberately silly object
vocabulary (**Apple**, **Banana**, **Fruit Folder**, **Produce** team) keeps
attention on the structure rather than the scenario. Directly reusable for any
disclosure where two orthogonal systems multiply.

**`Permissions vs. seats` — a named section, repeated across three articles**
`[documented]`

> "Seats are separate from permissions."
> "a person's seat determines which Figma products they have access to. For example, a user with a Collab seat has access to FigJam and Figma Slides."
> "Permissions determine which files, folders, and teams they can edit."
> "For a user to be able to edit a file, they need **both** the appropriate seat and permissions."

Four short sentences: the separation, what A governs, what B governs, and the
conjunction. It appears near-verbatim in `Guide to sharing and permissions`,
`File and folder permissions`, and `Team permissions` — deliberate redundancy
across every entry point into the model, because the confusion is the single
biggest source of access failure. **Conceptual boilerplate, repeated
word-for-word at every door.**

**Billing is explicitly decoupled from permissions, twice** `[documented]`, each
time as a question in the reader's voice:

> "**If I change a user's permission on a folder, does that impact my subscription or bill?**" → No. Folder permissions do not affect the subscription, which is determined by plan type and number of seats.
> "**If I change a user's team permissions, does that impact my subscription or bill?**" → No, with the same explanation.

Answering *"will this cost me money?"* inside a permissions article, before the
user hesitates, is the inverse of Miro's problem — where inviting someone
silently consumed a paid seat and generated the top billing complaint. Figma
pre-empts the fear; Miro documents the aftermath.

**Admin override is disclosed rather than hidden** `[documented]`

> "If you're an admin on a paid plan, you can change permissions on files, folders, and teams across your plan, **even where you don't have `can edit` access**. You can also give yourself access to a file you can't open, if you have a direct link to it."

Figma publishes, on a page any user can read, that admins can self-grant access
to files they cannot open. A privacy-relevant capability stated plainly in
user-facing documentation instead of buried in an enterprise annexe. Compare
Miro, which asserts the opposite reassurance (admins "don't receive any special
level of access to other users' content") — two products, two architectures, and
both disclose theirs. Figma's is the harder thing to say.

**The share modal is described as ordered by breadth** `[documented]`, and the
ordering is itself the disclosure:

> "The share modal shows everyone who can access the folder, organized from broadest to most specific"

1. Plan or workspace access — "who can access the folder across your plan or workspace"
2. Inherited permissions — "permissions passed down from the parent team or folder, if applicable"
3. Individual users — "people who have been directly invited to this folder"
4. User groups — "groups that have been directly invited to this folder"

Broadest first means the **widest exposure is the first thing read**. A user
auditing a sensitive folder sees "everyone on the plan" before they see the three
colleagues they remember inviting. Layout as disclosure.

**A scope caveat on a permission change, stating what it does not do**
`[documented]`, and it is the sharpest warning in the set:

> "This setting only controls whether access is inherited from the parent — it doesn't affect any broader team or organization access. If this folder is set to **Anyone in the [plan or workspace]**, members of the plan or workspace can still access it after you make this change."

A user who has just restricted inheritance would reasonably believe the folder is
now private. It is not. The copy says so immediately, names the other setting
responsible, and links to it. The same pattern as Miro's retained-access
warning, but expressed once and precisely at the control that creates the
misconception.

**Per-plan capability differences stated as a list, including the degenerate
case** `[documented]`:
- Starter: "always set to everyone in the plan `can edit`" — no choice exists
- Professional and Organization: "can set access for everyone on the plan"
- Enterprise: plan or a specific workspace
- And: "Starter plans only support one folder, so there's no inherited permissions."

Telling a Starter user that the setting they are reading about does not exist for
them — and why — rather than showing a disabled control.

**Delete requires access at two levels, with the reason** `[documented]`:

> "To delete a file or folder, you need edit access to the resource itself **and** edit access to the folder or team it lives in — either through a direct invite or inherited permissions."

Expanded into two bullets (files and nested folders need an editor role on the
containing folder; top-level folders need full membership of the team). A
two-key requirement for a destructive action, disclosed as a footnote to the
permission table.

**Migration notice, repeated at the top of both permission articles**
`[observed]`:

> "**Note**: Starting August 3, 2026, projects are being transitioned to folders, with the rollout reaching all users over the next few weeks. **Your content and access will remain the same.**"

A rename in progress, with a date, a rollout window, a link to the explainer
(`Updates to Figma's file management`) and — the important clause — an explicit
reassurance about the two things a user would fear losing. The migration is
visibly incomplete in the harvest: the help sidebar still reads
`Files and projects` and `Manage files and projects`, the breadcrumb reads
`Manage files and folders`, and **links to the folder-permissions article carry
the old slug** (`35361119554711-File-and-project-permissions`) while the
canonical is `-File-and-folder-permissions`. A rename caught mid-flight,
disclosed honestly at the top of the affected pages.

**Restriction and protection features named** `[documented]`:
`Restrict copying and sharing on files` ·
`Add password protection to files and prototypes` · `Domain control` ·
`Enforced SSO` · `Enforced 2FA` · `SAML-based SSO` · `Audit Reports` ·
`Advanced access controls & Privacy settings` (the last five from the stale
pricing render, so plan attribution is unreliable — see Caveats).

**Corporate disclosure in the footer** `[observed]`: `Legal and privacy`,
`Modern slavery statement` (PDF), `Climate disclosure statement`, `Impressum`.
The privacy link in the help-centre footer points to `/summary-of-policy/` —
Figma publishes a **summary** of its privacy policy as the primary link target
rather than the policy itself, which is the Wise dual-format pattern applied to
privacy.

## T11 Help-centre architecture

**Branded as `Figma Learn`, not "Help Center"** — though the page title and
breadcrumb both read `Figma Learn - Help Center`, so the rename is partial. The
search prompt is `Hello, how can we help?` with the subhead "Find answers and
inspiration on all things Figma." `inspiration` alongside `answers` is the tell:
the same surface serves support and learning, which is why the top nav separates
them.

**Shape:** four purpose-based nav groups → categories (`Get started`,
`Administration`, `Help`, plus one per product) → sections → articles.
Cross-cutting sections exist under multiple parents; `Sharing and permissions`
lives under `Administration` despite being the thing every individual user needs
daily, which is the one questionable placement.

**Article-title grammar — five shapes:**

| Shape | Example |
|---|---|
| `Guide to X` (conceptual) | `Guide to sharing and permissions`, `Guide to the file browser`, `Guide to connected folders`, `Guide to collaborating with clients in Figma` |
| Imperative verb-first (procedural) | `Share files and prototypes`, `Request to edit a file`, `Transfer ownership of a team`, `Claim ownership of a folder` |
| Bare noun-phrase (reference) | `File and folder permissions`, `Team permissions`, `Admins in Figma` |
| `X not working` / `Error N` (failure) | `Figma Desktop app not working on Windows`, `Error 404 when loading Figma files` |
| `What can I do …?` (scope question) | `What can I do offline in Figma?` |

**`Guide to X` is the reserved conceptual prefix**, the direct equivalent of
Miro's `Understand X` family, and it is applied with the same discipline — only
to articles that explain a model rather than a procedure. Two products, two
different words, same convention, and both restrict it to the genuinely
non-obvious parts of their domain. Strong convergent evidence that this is a
pattern worth adopting.

**The `Before you start` / `Who can use this feature` box** is the structural
signature of this help centre — see T4. It is the mechanism by which a help
system for a product gated on four independent dimensions (plan, seat,
permission, scope) stays usable.

**In-article devices** `[observed]`: plan-selector tabs inside one article
(`Team permissions` splits into `Starter and Professional plans` versus
`Organization and Enterprise plans`, with a separate table under each);
capability tables; boxed `Note:` and `Tip:` and `Example` blocks; anchor links
into sibling articles' sub-sections; `→` arrow suffixes on cross-links
(`Learn more about unsaved changes →`).

The plan-selector tabs are the right call for a product with divergent models —
but they mean the two tables use different column headers for the same concept
(`Full member` / `Limited access member` / `Admin` versus
`Can view` / `Can edit` / `Team admin/Owner`), which is honest about the
divergence and hard to hold in one head.

**Routing furniture** `[observed]`: every article ends `Was this article
helpful?` → `Yes` / `No`. The positive branch opens with "Got a second? Tell us
what we're doing well." The negative branch: "Thanks for letting us know! What
was the issue?" with a `-- Please choose an option --` select and six reasons:

- `Incorrect or missing information`
- `Hard to understand`
- `There are typos or broken links`
- `I wish the feature worked a different way`
- `Issues with images, GIFs, or videos`
- `Something else`

Six reasons, more granular than Loom's three or Miro's four, and — like Miro —
one of them separates product complaints from documentation complaints:
`I wish the feature worked a different way`. Figma's is phrased as a wish rather
than a dislike, which is softer and probably yields more usable text. The
inclusion of `There are typos or broken links` and
`Issues with images, GIFs, or videos` as distinct options reflects a help centre
carrying heavy media and knowing where it rots.

Below the widget, every article repeats the boundary:

> "Your feedback helps us improve Figma's Help Center. To get help from support, submit a request through our contact form."

**Telling the reader that this control is not a support channel**, at the point
where they would otherwise type a support question into it. The clearest
expectation-setting string in the harvest, and it appears on every article,
twice.

Confirmation: `Thank you for helping us improve Figma's Help Center!`

## T12 FAQs

**No FAQ block on the current home page** `[absent]` — the marketing site carries
no question-and-answer section.

**Pricing FAQ captured, but from a stale render** `[observed, unreliable]`. The
questions below were served at `figma.com/pricing/` and reference a plan
structure (Basic / Professional / Organization, `$12`/`$15`, `$45`) that predates
Figma's current seat-based model. Recorded verbatim because they were observed,
but **they should not be treated as current Figma copy**:

| # | Question (verbatim, stale render) |
|---|---|
| 1 | Do you have a discount for non-profits? |
| 2 | How do I cancel my paid plan? |
| 3 | Can you send me an invoice? |
| 4 | What if more people are added to my team every month? |
| 5 | Who is responsible for team payments? |
| 6 | Where can I see a breakdown of my team editors and associated costs? |
| 7 | How can I adjust who has admin privileges? |

Two are worth noting even as artefacts. Q1 is answered with a flat refusal — "We
do not have any discounts for non-profits." followed by the consolation that
anyone may use the free plan. An FAQ that says no without softening. Q3 is
answered with an operational admission — due to volume, contracts, forms and
purchase orders cannot be processed. **Both answers decline to help and say so
directly**, which is rare and, in the abstract, good practice; whether either is
still true is unknown.

The Q4 answer contains the mechanism that matters for comparison with Miro:
editors added mid-cycle on an annual plan are charged at the monthly rate until
renewal, admins get an email a few days before each payment "recapping what the
bill will be and highlighting new editors", and **"Team admins will have the
chance to adjust permissions before payment is collected."** A pre-billing
review window with the new cost drivers highlighted — the structural answer to
Miro's `Accidentally added seats` problem. Flagged as a pattern worth
re-verifying against current copy.

**FAQ-style Q&A embedded inside help articles** `[documented]`, and this is
where Figma's real FAQ content lives. Bolded questions inside
`File and folder permissions` and `Team permissions`:

- `If I change a user's permission on a folder, does that impact my subscription or bill?`
- `If I change a user's team permissions, does that impact my subscription or bill?`
- `How does a user's seat type impact their file access?`
- `How does a user's seat type impact their permissions?`
- `How can I view file permissions?`

Placed at the point of the action rather than collected on a separate page. Note
that four of five are near-duplicate pairs across the two articles — the same
question asked at folder scope and team scope, each answered locally. Redundancy
by scope, consistent with the `Permissions vs. seats` boilerplate.

There is also a `Common questions` section in the help nav
("Get answers to frequently asked questions") which was not opened. `[absent]`

## T13 Terminology & glossary

| Term | Figma's usage | The alternative it rejected |
|---|---|---|
| `canvas` | The surface and the brand metaphor: "The intelligent canvas", "the collaborative canvas", "AI-native canvas" | "artboard", "workspace" (used for the *org* unit instead) |
| `file` | The primary object | "document", "project" |
| `folder` | Container for files — **renamed from `project` as of August 2026** | `project`, now in migration |
| `team` | Container for folders; "dedicated spaces within an organization" | |
| `workspace` | Enterprise-only tier between organization and team | |
| `organization` / `plan` | The billing and identity root; used near-interchangeably in permission copy | |
| `checkpoint` | The immutable 30-minute autosave unit | "revision", "snapshot" |
| `version` / `named version` / `autosave version` | Three grades of checkpoint | |
| `current version` | The live head | "latest", "HEAD" |
| `main contributor` | Attribution on a multi-editor checkpoint | "author", "last edited by" |
| `Delete Version Info` | Removes metadata, not history | "Delete version" — deliberately rejected |
| `Can edit` / `Can view` | The two assignable permissions | "Editor/Viewer" as roles; `Owner` exists structurally but is not assigned |
| `Ask to edit` | The request affordance | "Request access", "Request edit permission" |
| `seat` | Product entitlement, orthogonal to permission | "licence", "role" |
| `Collab seat` / `View seat` / `full seats` / `dev seats` | Named seat types | |
| `Full member` / `Limited access member` | Starter/Professional membership tiers | "guest" (which exists separately at org level) |
| `inherit` / `inherited permissions` / `explicit permissions` | The composition model, named in user-facing option labels | "cascade", "propagate" |
| `Visible` / `Hidden` | Team discoverability | "private", "public" |
| `Ready for dev` | Design-level handoff state | "approved", "final" |
| `Dev Mode` | The engineering lens on a file | "Inspect", "Handoff" |
| `FigJam` | The whiteboard product | `Figma Whiteboard` |
| `branch` / `merge` | Version *control*, distinguished from version *history* | |
| `Figma Learn` | The help centre brand | "Help Center" — used in the title anyway |
| `WIP to ship` | Marketing shorthand for the covered workflow | |
| `Follow` / `following` | Watching another user's viewport; listed as a `can view` capability | "spectate", "spotlight" (cf. Miro's `Attention management`) |

**The `seat` / `permission` split is the most consequential naming decision in
this file.** Two orthogonal entitlement systems, each with a distinct one-word
name, never conflated in copy, and their interaction documented with a worked
example at every point of contact. Most products collapse "what you paid for"
and "what you're allowed to touch" into a single `role`, and then cannot explain
why a user with edit permission cannot edit.

**Register split.** Marketing says `intelligent canvas`, `AI-native`,
`infinite creativity`, `WIP to ship`. Help says `file`, `folder`, `can edit`,
`checkpoint`, `seat`. The help vocabulary is almost entirely monosyllabic and
concrete; the marketing vocabulary is almost entirely abstract. The gap is wide,
but unlike Miro's it does not produce ambiguity, because the help vocabulary is
rigorously defined.

**A rename in flight, visible in three states at once** `[observed]`:
`project` → `folder`, announced for August 2026. Live surfaces show the old word
(help sidebar `Files and projects`), the new word (breadcrumb
`Manage files and folders`), and both in one sentence ("Permissions determine
which files and projects they can edit" inside an article titled
`File and folder permissions`). Plus the stale URL slugs. An honest migration
handled with a dated notice, but the copy has not caught up with the notice.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user. First-person plural for the
company, but sparing — "how can we help?", "we've got more options for you",
"Your feedback helps us improve Figma's Help Center". Notably, the help centre
speaks of the product in the **third person as an actor**:
"Figma saves your work", "Figma records a new checkpoint",
"Figma will add two autosave checkpoints", "Figma will notify the file owner",
"Figma clips titles longer than 25 characters", "Figma doesn't turn these into
clickable links".

`Figma will…` is the dominant construction for describing system behaviour, and
it is doing real work: it attributes the action to a named agent, which makes
automatic behaviour predictable and makes its limits ("Figma doesn't…") sound
like facts rather than apologies. Compare Miro's `we`, which is warmer but blurs
company and software. **Naming the product as the actor of automatic behaviour**
is the reusable choice here.

**Register.** Flat, concrete, and unusually free of hedging. The permission and
version articles are almost entirely declarative sentences of one clause. No
`Oops`, no exclamation marks except `Tip!` (once) and
`Thank you for helping us improve Figma's Help Center!`. No emoji anywhere in
the help centre — a clean contrast with Miro's 🚀💡⚠️✏️ callout system. Figma uses
typed boxes (`Note:`, `Tip:`, `Example`, `Before you start`) instead, which is
the more robust choice.

**Marketing register is the opposite**: adjective-dense and aspirational
(`intelligent`, `infinite`, `Powerfully expressive`, `Incredibly precise`,
`anything you can imagine`). The gradient is steep but correctly directed —
flattest where the stakes are highest, as with Wise and Loom.

**Reading level.** Help prose is short-sentenced but conceptually dense; the
permission articles ask the reader to hold plan × seat × permission × scope
simultaneously. Figma's mitigations are the `Who can use this feature` box, the
plan-selector tabs, the capability tables, and the named-person examples — four
distinct devices for the same complexity, which is why these articles remain
readable where Loom's single asterisk-laden table does not.

**Accessibility content** `[observed]`
- `Skip to main content` present, first in DOM on `figma.com`
- `Accessibility` is a first-class item in the help centre's `Features` nav group, linking to a dedicated article
- Help centre localised into ten locales, with translated slugs
- Keyboard shortcuts documented with both platform bindings spelled out as key glyphs: `⌘ Command` `⌥ Option` `S` (Mac), `Ctrl` `Alt` `S` (Windows), and `⌘ Command` `Shift` `E` / `⌃ Control` `Shift` `E` for export. Modifier names are written out beside the glyphs rather than relying on symbol recognition
- Help-article screenshot alt text is **state-and-purpose descriptive**, matching Miro's standard: "Menu dropdown in Figma showing the option 'Show version history' selected, with various editing and navigation options visible." · "Version history panel showing multiple saved versions, dates, contributors, and a 'Show older' option for more entries." · "Request to edit button in Figma toolbar, with tooltip indicating editors can grant access." · "Share button with red badge indicates pending edit requests awaiting approval in the Figma toolbar." · "Pending edit request notification in Figma, with options to approve or deny, and list of users with file access."

The last three are excellent: they describe the UI element, its state, and the
affordance it signals. `Share button with red badge indicates pending edit
requests awaiting approval` communicates the entire notification pattern to a
screen-reader user reading the article.

- Marketing alt text is scene-descriptive and specific: "A prompt node and a pre-selected image node connect to create the visual output of a butterfly on the Figma Weave interface" · "UI showing different brush stokes that can be applied to type" (with a typo: `stokes`) · "Components for chips, cards, tiles, and checkboxes"
- Logo-wall images carry brand names as alt (`![airbnb logo]`, `![netflix logo]`)

**Accessibility gaps** `[observed]`
- **Every marketing image is emitted twice**, once with empty alt and once with populated alt: `![A mock website showing Texture values]()` immediately followed by `![A mock website showing Texture values](https://…)`. Whether the empty-alt copy is a `<picture>` source or a duplicate `<img>` cannot be determined server-side, but if rendered it would produce an unlabelled image beside every labelled one. Flagged as suspected, not confirmed.
- Several home-page carousel slots render as bare `-` with no image, alt, or content
- The help centre's `Level up with a course` section renders as a heading with no content and no empty-state message
- `Looking for updates...` / `Fetching topics...` / `Fetching videos...` persist as visible loading states on the help home (T8)
- No dedicated public accessibility *commitment* page found on the marketing site (unlike Miro's `/accessibility/` with a stated WCAG target and published changelog). Figma's accessibility content is a help article; the harvest did not open it. `[absent]` for any WCAG target, VPAT, or conformance claim.

**Negative findings, recorded honestly**

- **`figma.com/pricing/` did not render the live page.** A stale version served instead, with legacy plan names (`Basic`, `Professional`, `Organization`), legacy prices, and no seat model — while the same harvest's help centre documents `Collab seat`, `View seat`, `full seats`, `dev seats`, and a `Starter` plan. The live pricing page is `[absent]` from this harvest.
- `Get started` and `Get started for free` as two labels on one nav button
- `Sign Up` (Title Case, stale pricing) versus `Get started` (nav)
- Version-history menu mixes Title Case (`Name This Version`, `Restore This Version`, `Delete Version Info`) with sentence case (`Duplicate`, `Copy link`) in one dropdown
- `Restore This Version` (in-file) versus `Restore from version` (file browser) for materially the same action
- `Who has access` versus `Who can access` for the same dropdown across two articles
- `Only those invited` (team) versus `People invited to folder` (folder) for the same concept
- Folder capability options are full sentences (`Edit files, add people, and change their permissions`); the equivalent team options are single words (`View` / `Edit`) with the delegation consequence moved out of the label
- `Show Version History` (Title Case) as a menu item versus `Show version history` (sentence case) in the alt text describing that same menu item
- `Figma Font installer` and `Figma font helper` in adjacent troubleshooting titles
- Help sidebar says `Files and projects` / `Manage files and projects`; breadcrumb says `Manage files and folders`; body copy uses both
- Links to the folder-permissions article use the retired slug `-File-and-project-permissions` while the canonical is `-File-and-folder-permissions`
- `Figma Learn` branding coexists with `Help Center` in the same page title and breadcrumb
- A typo in marketing alt text: "different brush stokes"
- A sentence fragment in the `Request to edit` preamble: "Anyone with `can view` access to a file in a team can request to edit it" — no terminal punctuation, inside a boxed callout
- Grammar slip in `Request to edit`: "Figma will notify the file owner… and be given the option to grant you access" — subject disagreement
- Grammar slip in version history: "This including creating or naming versions"
- `Team permissions` capability tables render with **empty cells throughout** — the checkmark column values did not serialise, so the tables are visually present and informationally blank in this harvest. Flagged as a possible rendering artefact of the fetch rather than a live defect.

---

## Transferable patterns

1. **Answer "can I even do this?" before "how do I do this?"** The
   `Before you start` / `Who can use this feature` box opens every article with
   plan availability *and* the permission required, in a fixed position — and the
   help centre documents the convention so readers learn to look for it. For any
   product gated on plan × role × scope, this removes the most common wasted
   read. The cheapest high-value pattern in the corpus.
2. **Name a destructive action after what it actually destroys.**
   `Delete Version Info` rather than `Delete version`, with the non-effects
   enumerated ("won't remove any contents from your file, or prevent you from
   viewing that version") and the remedy supplied ("You can name the autosaved
   version again"). Condition: only works if the underlying model genuinely
   preserves the thing — otherwise it is a lie.
3. **Explain undo as a forward operation.** Restore "will add two autosave
   checkpoints" — one for the state you left, one for the state you returned to.
   Telling the user that going back is implemented as going forward pre-empts
   "where did my work go?" entirely. Applies to any reversal, refund, or rollback
   flow.
4. **Define the weaker permission by what it *can* do.** "`Can view` access can
   only perform certain 'read only' actions, like inspecting properties,
   following, and commenting." The enumeration reveals that "view" is a much
   weaker restriction than the word implies — which is what the file owner needs
   to know. Then publish the capability table even when the difference is one row
   of four.
5. **Put the delegation consequence in the option label.**
   `Edit files, add people, and change their permissions` rather than `Edit`.
   Editing is what the user intends to grant; adding people and changing
   permissions is what they are also granting. The label discloses the
   second-order power. Directly applicable to PayPal account-access, sub-user,
   and API-key scope copy.
6. **State the composition rule once, as a rule.** "you can't restrict someone's
   access below what they already have through their folder or team permissions."
   Where Miro repeats the symptom in four tabs, Figma states the invariant and
   generalises. Condition: the rule has to actually be an invariant — if the
   system has exceptions, repeat the symptom instead.
7. **Order a permission audit broadest-first.** The share modal is explicitly
   "organized from broadest to most specific", so the widest exposure is read
   before the remembered invitations. Layout doing disclosure work.
8. **Say what a restriction does *not* cover, at the control.** "This setting
   only controls whether access is inherited from the parent — it doesn't affect
   any broader team or organization access." Placed where the user would
   otherwise conclude the resource is now private, naming the other setting and
   linking to it.
9. **Answer "will this cost me money?" inside the permissions article.**
   "Folder permissions do not impact your Figma subscription." Asked in the
   reader's voice, answered before hesitation. The structural fix for the
   invite-silently-bills-me problem.
10. **Worked examples with named people and a deliberately silly object
    vocabulary.** `James`, `Jesse`, `Jules`, `Ernie`; **Apple**, **Banana**,
    **Fruit Folder**, **Produce** team. One variable per example, and lead with
    the counter-intuitive case (`Ernie` has edit permission and still cannot
    edit). Keeps attention on structure, not scenario.
11. **Keep two orthogonal entitlement systems lexically separate, and repeat the
    boilerplate at every door.** `seat` versus `permission`, four sentences,
    near-verbatim in three articles: the separation, what each governs, and the
    conjunction. Never collapse "what you paid for" into "what you're allowed to
    touch."
12. **`Ask to edit`, not "Request access".** Social verb, named capability, no
    ceremony — plus copy that tells the requester the escalation is normal
    ("eliminates the need to track down people"), names who can approve, and
    discloses the second blocker (seat) with its different approver.
13. **Surface a pending state everywhere it could be noticed, and enumerate
    those places.** Red badge on `Share`, email, notification bell — listed in
    the help article so a user who missed one knows where the others are.
14. **Tell readers what the feedback widget is not.** "Your feedback helps us
    improve Figma's Help Center. To get help from support, submit a request
    through our contact form." On every article, at the moment a user would
    otherwise type a support question into a content-quality control.
15. **One bounded statistic beats a stat wall.** `95% of the Fortune 500 uses
    Figma` with "Based on data from March 2025." One number, one claim, one dated
    provenance line — against Loom's four conflicting user counts.

## Caveats & gaps

- **The live pricing page was not captured.** `www.figma.com/pricing/` returned a
  degraded render with plan names and prices that the same harvest's help centre
  contradicts. T3, T10, and T12 entries sourced from it are marked
  `[observed, unreliable]` and should be re-harvested with a browser-rendered
  pass. Current seat vocabulary (`Collab`, `View`, `full`, `dev`) and the
  `Starter` plan name are attested only from help-centre prose.
- **Help-centre home has several non-rendering sections.**
  `What's new at Figma`, `Popular topics`, `Featured videos`, and
  `Level up with a course` were all empty or stuck on loading strings. Whether
  perpetual or slow-client is undetermined; recorded as observed visitor
  experience in T8.
- **`Team permissions` capability tables serialised with empty cells.** The row
  labels and column headers are reliable; the checkmark values are not. No claim
  is made in T10 about which specific actions each team permission allows,
  beyond what the surrounding prose states.
- **All in-product strings are `[documented]`, not observed.** The share modal,
  version-history panel, `Ask to edit` button, dropdown values, and badge states
  come from help prose and screenshot alt text describing the UI. Figma's help
  quotes its own UI strings unusually faithfully, so confidence is higher than
  for most products in this corpus, but nothing here was seen rendered.
- **No accessibility commitment page located.** Figma's `Accessibility` help
  article was not opened, and no equivalent of Miro's `/accessibility/` page with
  a stated WCAG target, VPAT cadence, or changelog was found on the marketing
  site. Any claim about Figma's conformance target would be invention.
- **`Common questions` section not opened** — it is the help centre's designated
  FAQ home and would likely supply a cleaner T12 than the stale pricing block.
- **Design system not harvested.** Figma's own published design-system and
  content-guidance material (and the `Best practice guides` at
  `figma.com/best-practices/`) were not fetched. The brief flagged a published
  design system as a target; the harvest covered permissions and version states
  instead, which the brief designated as the priority. `[absent]`
- **Status observed fully operational.** No live or historical incident text
  captured, so incident-communication register is `[absent]`.
  `status.figma.com/history` would supply it.
- **Ten products, one harvested.** Figma Make, Weave, Motion, Slides, Draw,
  Sites, Buzz, FigJam, and Dev Mode each have their own help category; only
  cross-cutting (file, permission, version) documentation was read. Product-
  specific vocabulary for nine of ten products is unharvested.
- **Article bodies: five of several hundred opened.** T7 and T11 are largely
  title-level for the failure articles.
- **`Members versus guests` / `Members, guests, and limited access`** — two
  titles for one article appear in cross-links within `Team permissions`. Not
  opened, so the org-level guest vocabulary is thin in T13.
- Locale: en-US only. Help centre serves nine further locales; no translated
  page inspected.

## Sources

1. https://www.figma.com/
2. https://www.figma.com/pricing/ (served a stale render — see Caveats)
3. https://help.figma.com/hc/en-us
4. https://help.figma.com/hc/en-us/sections/35463323337751-Sharing-and-permissions
5. https://help.figma.com/hc/en-us/articles/1500007609322-Guide-to-sharing-and-permissions
6. https://help.figma.com/hc/en-us/articles/35361119554711-File-and-folder-permissions
7. https://help.figma.com/hc/en-us/articles/360039970673-Team-permissions
8. https://help.figma.com/hc/en-us/articles/4408435431319-Request-to-edit-a-file
9. https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history
10. https://help.figma.com/hc/en-us/sections/360006050633
11. https://help.figma.com/hc/en-us/sections/1500000378401
12. https://status.figma.com/
