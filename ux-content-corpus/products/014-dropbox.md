# 014. Dropbox

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Consumer file sync and share, extending into team content management (Dash, Sign, DocSend, Replay, Backup, Transfer, Fax) |
| Primary URL | https://www.dropbox.com/ |
| Corpus rank | 014 |
| Benchmark strength (source list) | File, sync, and sharing states |
| Locale / market observed | en-US. Help centre localised into **23 locale options** including three English variants (`en-US`, `en-GB`, `en-AU`) — the UK and AU variants resolve to `?fallback=true`, i.e. they serve US English |
| Platform observed | Web (marketing), help centre (AEM + Coveo search), Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **The richest compliance surface in this corpus.** GDPR compliant; support for HIPAA/HITECH (PHI); SOC 1, 2, and 3 compliance reports; data-residency options in US, Australia, EU, Japan, UK for eligible team plans; 256-bit AES at rest, SSL/TLS in transit; end-to-end encryption and Advanced Key Management on Advanced tier; a `Data Governance Add-On`; a public Trust Center at `trust.dropbox.com`; published `AI principles` |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | **Full for the two priority sections.** T6 (status/state) and T10 (permission/compliance) are the strongest in this corpus — the sync-icon article documents ~15 file-level and 8 account-level states verbatim, and the permission articles document a full role matrix plus every link-level control. Plan-card rendering on `/plans` is partially broken (see T14), and several help categories were not opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home (marketing) | https://www.dropbox.com/ | Hero, three feature planks, AI-integration block, industry grid, 700M-user claim |
| Plans / pricing | https://www.dropbox.com/plans | Five tiers, ~70-row comparison matrix; **card template visibly broken** |
| Security & compliance | https://www.dropbox.com/features/security | Six security pillars, five FAQs, compliance inventory |
| Help centre home | https://help.dropbox.com/ | Three category groups, 20 categories, four FAQs |
| **Help: Sync (category)** | https://help.dropbox.com/sync | Four sub-groups, ~20 article titles |
| **Help: Sync icons (Windows)** | https://help.dropbox.com/sync/sync-icons-windows | **The single richest state-vocabulary artefact in the corpus** |
| **Help: Share (category)** | https://help.dropbox.com/share | Eight sub-groups, ~100 article titles across five products |
| **Help: Sharing permissions** | https://help.dropbox.com/share/set-file-folder-permissions | Three-role matrix with four footnote classes |
| **Help: Shared link permissions** | https://help.dropbox.com/share/set-link-permissions | Link-level control vocabulary, 7 FAQs |
| Help: Common sharing errors | https://help.dropbox.com/share/sharing-error | Five verbatim error strings with cause + fix |
| Status page | https://status.dropbox.com/ | 12 components, 5-state legend, 90-day incident log |

---

## T1 Navigation & IA labels

**Global marketing nav — product-portfolio first, which is the notable structural choice** `[observed]`

`Products` · `Solutions` · `Enterprise` · `Pricing` · `Contact sales` ·
`Get app` · `Sign up` · `Log in` · `Get started`

`Products` expands to **eight** siblings, each with a one-line scope sentence —
and `Dropbox` itself is only one of them:

| Product | Scope line (verbatim) |
|---|---|
| `Dropbox` | "Store, share, and access files across devices" |
| `Dash` | "Find, organize, and protect company content" |
| `Replay` | "Review and approve videos faster" |
| `DocSend` | "Send documents securely and track activity" |
| `Sign` | "Request and add signatures to documents" |
| `Fax` | "Receive and send faxes from anywhere" |
| `Reclaim.ai` | "Schedule habits, tasks, and meetings with AI" |
| `Early access` | "Preview new product experiences" |

Every scope line is a **verb triad or verb pair naming the user's action**, not the
product's mechanism — the same construction Wise uses for help topics, applied to
a product portfolio. `Dash` and `Dropbox` both start with `Find`/`Store` and then
diverge, which is how the copy differentiates two products that overlap.

Note the naming drift inside one menu: `Dropbox Sign` in the link text but `Sign`
as the display name; `Dropbox` the product inside `Dropbox` the company. The
portfolio has outgrown the brand noun, and the nav shows the strain.

`Solutions` splits three ways — `Teams` (by function: `Sales`, `Marketing`, `HR`,
`IT`, `Creatives`), `Use cases` (by task: `Cloud storage`, `Send large files`,
`Video review`, `Signing documents`, `Sharing files`), `Industries` (by vertical:
`Construction`, `Technology`, `Manufacturing`, `Media`,
`Professional services`, `Education`). **Three simultaneous segmentation axes in
one dropdown** — role, job, and sector. Defensible for enterprise sales, and it
means the same user can arrive by three routes.

**Features mega-nav — six groups, and the grouping is the product's mental model**
`[observed]`: `Share` · `Sync` · `Storage` · `Security` · `Collaborate` ·
`Productivity`. Four are verbs, two are nouns. `Share` and `Sync` leading is
correct for this product and matches the help centre's own ordering.

**Help centre — three groups, 20 categories** `[observed]`

| Group | Categories |
|---|---|
| `Account` | `Account access` · `Billing` · `Account settings` · `Plans` · `Storage space` · `Security` |
| `Using Dropbox` | `Sync` · `Delete and restore` · `Share` · `View and edit` · `Installs` · `Create and upload` · `Organize` · `Integrations` · `AI integrations` · `Onboarding` |
| `Products` | `Dropbox Dash` · `Dropbox Protect` · `Dropbox Sign` · `Dropbox DocSend` · `Dropbox Backup` · `Dropbox Replay` · `Dropbox Transfer` |

`Using Dropbox` categories are **all verbs or verb phrases** — `Sync`,
`Share`, `Organize`, `Create and upload`, `View and edit`,
`Delete and restore`. Note the pairs: `Delete and restore`,
`Create and upload`, `View and edit`. **Each pair couples an action with its
inverse or its completion**, so a user looking for either half lands in the same
place. `Delete and restore` as a single category is the best of these — it puts
the mistake and the remedy behind one label, which is where an anxious user will
look.

Two defects. (1) `Onboarding` appears as a category tile on the help home page
but is **absent from the left-hand `Using Dropbox` nav** on every page — a
category reachable only from the homepage grid. (2) `Integrations` and
`AI integrations` are siblings, with the latter a subset of the former.

**Sub-group labels within a help category** `[observed]`, and they follow a
consistent gerund-plus-object pattern:

- `Sync` → `Managing sync settings` · `Troubleshooting sync issues` ·
  `Syncing files and folders`
- `Share` → `Sharing files and folders` · `Troubleshooting sharing issues` ·
  `Setting sharing permissions` · `Dropbox DocSend links and documents` ·
  `Sending and receiving signature requests` · `Sending and receiving a fax` ·
  `Troubleshooting signature and fax issues`

**Every category reserves an explicit `Troubleshooting <X> issues` sub-group**,
and it is consistently the **second** sub-group — before the how-to content, not
buried after it. Placing failure second in the list, above feature documentation,
is an unusual and defensible information-priority decision for a product whose
main support driver is "it isn't working."

**Footer — five columns**: `Dropbox` · `Products` · `Features` · `Support` ·
`Resources` · `Company`. Two cross-surface defects: the marketing footer's
`Cookie policy` points to `help.dropbox.com/accounts-billing/security/cookies`
while the help footer points to `help.dropbox.com/security/cookies` — **two URLs
for one policy, one of them stale**. And `Community forums` points to
`www.dropboxforum.com` in the marketing footer but `community.dropbox.com` in the
help footer. `AI principles` as a first-class footer link is notable.

## T2 Value proposition & headline patterns

**Hero — a three-verb triad plus a containment promise** `[observed]`

> Headline: `Find, organize, and share your work, all in one place`
> Subhead: "AI is coming to Dropbox, with smarter search, faster drafting and
> summarization, and intelligent organization."

The headline is pure task language — three verbs, no adjective, no product name,
no benefit claim beyond `all in one place`. Notably `Find` comes **first**, ahead
of `share`, which for a file-sync company is a repositioning: storage is assumed,
retrieval is the problem.

The subhead is the more interesting artefact because it is written in the **future
tense about an unshipped feature**: `AI is coming to Dropbox`. A hero subhead
selling anticipation rather than capability, paired with a CTA
(`See what's new` → a `/waitlist` URL) and backstopped by a page-foot disclaimer
in small text:

> "Note: The products or features described may not be released yet. The decision
> to purchase our services should be based on the features that are currently
> available."

That disclaimer is a genuinely good piece of compliance copy — a **forward-looking
statement caveat rendered as user guidance** ("base your purchase decision on what
exists today") rather than as legalese. It exists because Dropbox is a public
company, and the phrasing turns an SEC-driven obligation into an honest sentence.
The pattern transfers to any roadmap-selling marketing page.

**Feature planks — eyebrow verb, then headline, then mechanism-with-numbers**
`[observed]`

| Eyebrow | Headline |
|---|---|
| `Find` | `Find it fast, every time` |
| `Organize` | `Cloud storage that keeps everyone in sync` |
| `Share` | `Share files without the slowdown` |
| — | `Security never comes second` |

The eyebrows are the three hero verbs repeated as section anchors, so the hero's
triad becomes the page's IA. Body copy carries specific figures —
`previews for 175+ file types`, `large file transfers (up to 250GB)` — and
`built-in AI summaries (coming soon)`, with the parenthetical doing the bounding
work inline.

`Security never comes second` is a **negation headline** — it defines the position
by what it isn't, and it works because "security as an afterthought" is the
category's known failing. Its body carries the strongest single trust claim on the
site: summarised — encryption, tamper-proof documents, version history and
recovery keep intellectual property safe, and **Dropbox "never sells your data."**
A negative commitment stated in the same breath as the positive features.

Social proof is a single quantified line: `Join the over 700 million registered
users who trust Dropbox`, followed by eight named logos (`McLaren`, `Zoom`,
`Cirque du Soleil`, `Lincoln Center`, `Crunch`, `Hydro Flask`, `Wag!`,
`Katz Media Group`). Note `registered users`, not "users" or "customers" —
technically precise, and a weaker claim than it appears.

**The AI-integration block names three competitors as partners** `[observed]`:
`Google Gemini`, `OpenAI`, `Anthropic`, each with its own paragraph and a
`Connect now` CTA pointing at the *partner's* site. Section headline:
`Bring Dropbox content into your favorite AI tools`, subhead summarised: connect
with leading AI platforms to summarise content, create shared links, and save work
back to Dropbox without switching tools.

The Gemini paragraph contains the notable phrase — summarised as building on ideas
"all while keeping access and approvals in place." **A permission reassurance
inside an AI-integration value prop.** For a file-permission product, the anxiety
about AI access is exactly "does this bypass my sharing controls?", and the copy
answers it in the same sentence as the benefit. Compare Things (012), which
handles the same anxiety with a safety article instead.

**Plans headline** `[observed]`: `Go from idea to done with Dropbox`, subhead
"Store and share files. Sign and send documents. All with Dropbox." Two
three-word sentences then a fragment — the portfolio compressed into staccato.
Reused verbatim as the header of the plan block on the security page, so it
functions as a global pricing-module headline rather than a page headline.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav (primary) | Destination is `/plans`, not signup — **the primary CTA routes to pricing** |
| `Try Dropbox free` | Hero, and each feature plank (3×) | Also routes to `/plans` |
| `Sign up` | Global nav | Routes to `/register` |
| `Log in` | Global nav | |
| `Contact sales` | Global nav | Sales motion in the primary nav, unusual for a consumer-rooted brand |
| `See what's new` | Hero, secondary | Routes to `/waitlist` — the label does not disclose that it is a waitlist |
| `Buy now` | Plans, `Plus` card | No trial offered on the personal tier |
| `Try for free` / `or buy now` | Plans, `Standard` and `Advanced` | **Two CTAs stacked, the second lowercase and sentence-initial `or`** — a deliberate de-emphasis that lets the impatient buyer skip the trial |
| `or purchase now` | Security page, same card | **`buy now` on /plans, `purchase now` on /features/security** — two labels for one action on two pages |
| `Get Basic` | Plans, free tier | Verb + tier name |
| `Contact us` | Plans, `Enterprise`; security page | |
| `Compare plans` | Security page (×2), home | |
| `View all features` | Plans, per card | Anchors to `#all-features` |
| `Learn more` | Home, `Organize` and `Security` planks | **Bare `Learn more`, twice** |
| `Read article` | Home, resources block (×3) | Bare, repeated |
| `View more resources` | Home | |
| `Connect now` | Home, AI block (×3) | Sends the user to a third-party site — no indication of leaving |
| `Visit the Trust Center` | Security page | Names the destination |
| `Find a plan to get started` | Security page, closing | |
| `Contact support` | Help nav and every article foot | "Learn about your support options, file a support ticket, and check the status of open tickets." |
| `Community` | Help | "Connect with other Dropbox customers to get answers and learn best practices." |
| `Learn` / `Dropbox learn` | Help nav and article foot | **Two labels, one destination** (`learn.dropbox.com`) |
| `Social media support` | Article foot | A support channel named as a channel |
| `Get started` | Help nav, rightmost | Points to `learn.dropbox.com`, **not** to `/plans` — the same label as the marketing nav's primary CTA, with a different destination |
| `See all` / `Show less` | Help category pages, per sub-group | Progressive disclosure; `See all` renders as a dead `Javascript:void(0);` href |
| `Was this article helpful?` → `Yes, thanks!` / `Not really` | Every help article | See T9 |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `Skip to main content` | Top of DOM | Accessibility |

**Observations.** Dropbox's biggest CTA problem is that **`Get started` means two
different things on two surfaces** (pricing on marketing, training on help), and
that four separate labels (`Get started`, `Try Dropbox free`, `Sign up`,
`Buy now`) front the same funnel with three different destinations. The
`Try for free` / `or buy now` stack is genuinely good — it acknowledges that some
buyers have already decided and shouldn't be forced through a trial — but the
label changes to `or purchase now` on another page.

`Connect now` sending the user to `gemini.google.com`, `chatgpt.com`, and
`claude.com` with no external-link signal is a real disclosure gap on a page whose
own copy is about "keeping access and approvals in place."

## T4 Onboarding & getting-started

`[partial]`. Dropbox's onboarding content is **deliberately relocated out of the
help centre into a separate property**, and that relocation is the finding.

- `Get started` in the help nav → `learn.dropbox.com`, described as: "Get the most
  out of Dropbox with free self-guided courses and live instructor-led training
  sessions." **Onboarding is framed as courses and training, not as a guide** —
  self-guided *and* instructor-led, i.e. an education product rather than a
  walkthrough. Dropbox is the only product in this five-product set that treats
  onboarding as a curriculum.
- `Onboarding` exists as a help category (`help.dropbox.com/onboarding`) but is
  omitted from the persistent nav (T1), so it is effectively orphaned.
- **`Popular topics` on the help home is the real first-run surface** `[observed]`:
  `Reset password` · `Download desktop app` · `Dropbox Backup` ·
  `Files not syncing`. Four chips, and two of the four are *failures* rather than
  tasks. Dropbox is telling you, in its most prominent help slot, that the two
  things new and returning users most often need are a password reset and a sync
  fix. Honest triage, and a useful signal about where this product's content debt
  actually sits.
- No numbered wizard, no step sequence, no progress language observed on any
  public surface. `[absent]`

**One documented onboarding-adjacent artefact worth recording** `[documented]` —
the sync-engine self-identification procedure, which is onboarding for a
*migration*:

> Summarised: to find out which sync engine powers your desktop app, open
> Preferences → Sync, where you will see either "You are using Dropbox on Cloud
> Files" or a `Dropbox folder updates` notice reading "This update will ensure
> Dropbox continues to run smoothly on Windows," with an `Update now` button.

Two things. The legacy-state message is phrased entirely as a **benefit of
updating** rather than as a deprecation warning ("will ensure Dropbox continues to
run smoothly"), which is soft to the point of being unclear about the stakes. And
the article includes a sub-heading written as the user's own frustration —
`Can't find Preferences on the Dropbox desktop app?` — followed by the answer.
Anticipating a failure *inside* an instruction step is good practice; see T7.

## T5 Form & field labels

`[documented]`, drawn from the permission and link-settings articles.

**Sharing dialog** `[documented]`:
`Share` (the entry button) · `Add people` · `To:` (the invite recipient field) ·
`Copy link` · `Manage` · `Manage permissions` · `Manage access` (mobile) ·
`Folder settings` / `File settings` (iOS) · `Who can access` (desktop app) ·
`Link for editing` / `Link for viewing` · `Control access` (iOS, files) ·
`Edit link` / `View link` (iOS, folders) · `Modify settings` (Android) ·
`Save` · `Set` · `Update` · `Done` · `OK` · `Remove` · `Remove member` ·
`Remove access`.

**This is the clearest label-proliferation finding in the corpus.** One
conceptual control — "open the access settings for this item" — carries at least
six labels depending on platform and object type: `Manage permissions`,
`Manage access`, `Folder settings`, `File settings`, `Control access`,
`Modify settings`. And the confirm verb varies by platform: `Save` (web, desktop),
`Set` then `Save` (Android), `Save` (iOS), `Done` (iOS link settings), `OK`
(Android date picker), `Update` then `Save` (Android access). The removal action is
`Remove` on web and desktop, `Remove member` on Android, and `Remove access` on
iOS — **three labels for one destructive action across three clients.**

**Access-control field labels** `[documented]`:

| Field | Values |
|---|---|
| `Who has access` | `Anyone with the link` / `Anyone with link` · `Only people invited` · `Team members` |
| `What people can do` | `Can edit` · `Can view` |
| `Manage who can add people` | `Team members who can edit` · `Only the owner` |
| (Android equivalent) `Who can manage membership of this folder` | `Anyone with edit access` · `Only the owner` |
| (iOS equivalent) `Management` | `Members with edit access` · `Only the owner` |
| `Require password` | `On` / `Off` |
| `Expiration` / `Set expiration date` | `On` / `Off` + date |
| `Disable downloads` (web) / `Allow downloads` (mobile) | `On` / `Off` |
| `Link restrictions` | `On` / `Off` |

Note `Anyone with the link` (settings page) vs `Anyone with link` (link settings
dialog) — the article dropped the article. And the *same permission* is labelled
`Manage who can add people` on web/desktop,
`Who can manage membership of this folder` on Android, and `Management` on iOS,
with option sets `Team members who can edit` / `Anyone with edit access` /
`Members with edit access`. **Three question phrasings and three option phrasings
for one setting.** A user reading the help article on a laptop and executing it on
a phone will not find the words they were told to look for.

**A polarity flip across platforms, which is the worst of these** `[documented]`:
web says `Disable downloads` → toggle **On**; mobile says `Allow downloads` →
toggle **Off**. Same outcome, inverted label, inverted toggle direction. This is
the classic negative-label defect, and Dropbox ships both polarities
simultaneously.

**The one exemplary label sentence** `[documented]`, from the settings page:

> `Anyone with the link`: "Anyone can open them, this is effectively making your
> Dropbox files public."

The option's own description **names the consequence in the user's terms**
(`effectively making your Dropbox files public`) rather than describing the
mechanism. That is the right way to write a permissive default. Compare the
adjacent option's caveat, also good: `Only people invited` — "If someone who
wasn't invited receives the link, they can't open it," with a `Note` immediately
below: "**Only people invited** doesn't include your team members." A near-miss
disambiguation at exactly the point of confusion.

## T6 Status & state language

**The priority section, and the strongest in this corpus.**

### File- and folder-level sync states `[documented]`

Dropbox ships **two sync engines simultaneously** (`cloud files` and
`Dropbox legacy`) with **two different icon-to-meaning tables**, documented
side by side. The states:

| Icon description (verbatim) | File meaning (verbatim / summarised) | Folder meaning |
|---|---|---|
| "A green circle with a white checkmark." | "Your file is synced and available offline." — **"Marked by user as available offline."** Dropbox keeps these offline even when disk space is low | "All files in the folder are downloaded and available offline." |
| "A white cloud with a gray or blue outline." | "Your file is synced but only available online." Online-only files appear in the folder but don't use disk space; they download only when opened | "There's at least one online-only file in the folder." |
| "A white circle with a green border and a green checkmark." | "Your file is synced and available offline." — **"Not explicitly marked by you as available offline."** When disk space is low, some of these may be automatically set to online-only | "There's at least one available offline file in the folder, but no online-only files." |
| "A pair of arrows going in a circle." | "Your file is uploading." / "Your file is downloading." / **"There are issues or the file is waiting to be uploaded."** | "Your folder contains at least one syncing file." |
| "A red circle with a white X." | "Your file can't update or sync." | "Your folder can't update or sync." |
| "A gray circle with a white minus sign." | "Your file is ignored and won't sync." | "Your folder is ignored and won't sync." |
| "A brown box." | "OneDrive is causing a sync conflict." | same |

**Five observations, and they are the reason this product is in the corpus.**

**1. The green-check / green-outline distinction is the most sophisticated state
modelling here, and the copy has to work very hard.** Two icons mean the *same
functional state* ("synced and available offline") and differ only in
**provenance and durability**: one was pinned by the user and is protected from
eviction; the other arrived incidentally and may be silently demoted to
online-only when disk space runs low. The distinguishing copy is
`Marked by user as available offline` vs
`Not explicitly marked by you as available offline` — and note the person shift
mid-table, from third person (`by user`) to second (`by you`), within one column
of one table.

The transferable insight: **when two states look identical to the user but behave
differently under pressure, the copy must name the pressure, not the state.** The
useful half of these notes isn't "you pinned it" — it's
"even when hard drive space is low" versus "may be automatically set to
online-only to save space." The user needs to know which files will survive.

**2. The syncing icon is overloaded with a failure state, and this is a real
defect.** "A pair of arrows going in a circle" means uploading, *or* downloading,
*or* **"There are issues or the file is waiting to be uploaded."** Three
meanings, one of which is an error, sharing the affordance the user reads as
"working fine." A file that is stuck looks identical to a file that is
progressing. Dropbox documents the ambiguity honestly, which is to its credit,
but the icon vocabulary is under-specified: there is a separate red-X error state,
so the "issues" case has somewhere better to go.

**3. `ignored` is a named, first-class, deliberately-chosen non-sync state** —
distinct from "not synced" and from "excluded." `Your file is ignored and won't
sync` with the crucial scoping note: "When a folder is ignored, this icon only
appears on the folder, not on its individual files." **The absence of an icon on
children is itself documented**, which is the kind of negative-state disclosure
most products skip.

**4. `selective sync` is a separate mechanism with its own vocabulary and its own
conflict type** `[documented]`: `Selective sync overview: unsync folders from your
desktop` — `unsync` used as a transitive verb — plus
`How to resolve a selective sync conflict` and
`How to manage team selective sync settings`. So there are at least three
overlapping ways a file can be absent from a device (`online-only`, `ignored`,
`unsynced` via selective sync), each with distinct semantics and distinct help
articles. That is genuine conceptual load, and the content does not attempt to
unify it.

**5. The brown box is a competitor's error state, documented and attributed.**
`OneDrive is causing a sync conflict` appears in both icon tables, and the FAQ
expands it: summarised — the brown box is a Windows icon, not a Dropbox icon, it
means a OneDrive sync error, and the remedy is to sync in OneDrive or turn off /
uninstall it, with links to Microsoft's own support pages. The same treatment is
given to the gray X: "This is a Windows icon and not a Dropbox icon," with
`contact Microsoft support` as the escalation.

**Documenting a rival's failure symptom, naming it as not-yours, and routing to
their support** is an unusual and highly transferable pattern. The user
experiences one confusing desktop; the vendor who explains the *whole* desktop
wins the trust, and deflects a ticket.

### Account-level sync states (notification area) `[documented]`

Eight states, each with a bolded name and an explanatory sentence — and the
sentences are the craft:

| State (verbatim) | Explanation (verbatim / summarised) |
|---|---|
| `Fully synced` | "The files and folders on your Dropbox desktop app are fully up to date. **Any changes you made are reflected everywhere you access Dropbox.**" |
| `Sync in progress` | "…are updating. **Any changes you made are updating everywhere you access Dropbox.**" |
| `Syncing paused` | "**Changes you make to files and folders…won't update everywhere you access Dropbox until you resume syncing.**" |
| `Not connected to internet` | "**Changes you make won't update everywhere until you reconnect to the internet.**" + "This icon can also mean the app is starting up or closing down." |
| `An error has occurred` | "An error has occurred with your Dropbox account during the sync process." |
| `Unread notifications` | "You have unread Dropbox notifications." |
| `Snooze notifications is on` | "You've turned on **Snooze notifications**." |
| `Camera uploads in progress` | "Your camera roll is being uploaded to Dropbox." |

**This is the best state-copy pattern in the corpus and it is worth stating
precisely.** Four of the eight states are the same fact in four tenses, and the
explanation sentence is **structurally identical** across all four, with only the
verb tense and the condition changing:

> *are reflected* everywhere → *are updating* everywhere →
> *won't update* everywhere **until you resume syncing** →
> *won't update* everywhere **until you reconnect to the internet**

Every state answers the same question — *are my changes safe on my other
devices?* — because that is the only question the user has. The two negative
states both end in an `until <condition>` clause naming the exact thing that
clears them. **One question, one sentence frame, four tenses, two exit
conditions.** A content designer can lift this frame wholesale for any sync,
upload, payment-settlement, or replication state set.

Note also: `Syncing paused` distinguishes a *user-chosen* stop from
`Not connected to internet`, an *environmental* stop — same visible consequence,
different cause, different remedy, different label. Collapsing those into
"Not synced" would be the common mistake.

Two weaknesses. `An error has occurred` is the one state whose explanation adds
nothing ("An error has occurred with your Dropbox account during the sync
process") — a tautology where every sibling state earned its sentence. And
`Not connected to internet` is documented as **also** meaning "the app is
starting up or closing down," an unrelated condition sharing one gray icon.

**The plain-language equivalent** `[documented]`: the app window's lower-left
corner says `Your files are up to date` when fully synced. The **icon** says
`Fully synced`; the **window** says `Your files are up to date`. Two registers for
one state — engineering-accurate in the status label, user-reassuring in the
persistent text. Arguably deliberate and good; arguably two names for one thing.
And a final disclosure: "Dropbox Backup users may see slightly different wording
on some sync statuses" — **admitting that the state vocabulary forks by product.**

### Service-level status `[observed]`

Status page headline: `All Systems Operational`. Twelve components:
`Website` · `Desktop Application` · `Mobile Application` · `API` · `Paper` ·
`Passwords` · `Dash` · `Protect` · `Replay` · `DocSend` · `MCP Server` ·
`Support Services`.

Five-state legend: `Operational` · `Degraded Performance` · `Partial Outage` ·
`Major Outage` · `Maintenance`. A four-level severity ladder plus a planned state
— finer-grained than Todoist's two and far finer than Things' zero.

`MCP Server` as a first-class status component is a 2026 marker worth recording:
the AI-integration surface is now monitored alongside the API.

**Defect** `[observed]`: `Support Services` renders as
`Support Services ?` followed by a duplicated `Operational` — a literal question
mark in place of a tooltip or icon, on a live status page.

**Incident copy** `[observed]`, from 9 Sep 2026:

> Title: `Some customers are unable to access certain website routes and features.`
> `Investigating` — "a number of pages and features are not working for some
> customers. We're working to fix the problem as quickly as we can. We'll share
> another update shortly."
> `Resolved` — "This incident has been resolved."

The title is **scoped three ways** — `Some customers`, `certain website routes`,
`features` — before any severity claim, and it is a complete sentence with a full
stop. The `Investigating` body is a three-part frame: restate scope → commit to
speed → **commit to a next update**. `We'll share another update shortly` is the
most valuable clause: it converts silence from abandonment into an expectation.
The update opens lowercase (`a number of pages…`), which is a small copy-hygiene
miss in an otherwise well-constructed incident notice.

Note the absence: 13 of the 15 logged days read `No incidents reported.` and the
current day reads `No incidents reported today.` — two variants of one empty
state, one with a temporal qualifier.

## T7 Error, failure & recovery

**Verbatim error strings, quoted as headings in the help centre** `[documented]` —
Dropbox quotes its own error copy more systematically than any other product here,
using the literal string as the article sub-heading (`Error: "…"`):

| Error string (verbatim) | Documented cause | Documented fix |
|---|---|---|
| `There are too many files.` | Sharing or unsharing a folder with a very large file count | 12-step workaround creating a new shared folder and copying files in |
| `You sent too many invitations.` | Rate limit "to prevent abuse", 24-hour window | Wait 24 hours |
| `Sharing was unsuccessful.` / `Can't share with user.` | Invitee's team blocks external invites, or your team blocks inviting non-members | Contact your admin, or ask them to contact theirs |
| `You don't have permission to perform this action.` | Owner disallows editors sharing, or you have view-only access | Ask the owner to make you an editor, or to change the editor-invite setting |
| `The file specified was not found.` | File deleted or removed, by you or another folder member | Restore it |
| `This link is expired.` | Link accessed after its expiration date | "To give them access again, create a new link and share it." |
| `Downloads disabled.` | Hover tooltip on a greyed-out `Download` button | — |
| `[file type] files can't be previewed. Downloads must be enabled to share.` | Non-previewable file type with downloads disabled | Downloads cannot be disabled for these files |
| `This signature request has been closed` | Dropbox Sign | — |
| `Sorry, this link is no longer valid` | Dropbox Sign | — |
| `Unexpected error occurred` | Dropbox Sign | — |
| `On Hold` | Dropbox Fax status | — |

**The article structure is the pattern to steal.** Every error gets three
headings: the string itself, then `What happened`, then `How to fix it`. Not
"Cause" and "Resolution" — **`What happened` in past tense**, which matches what
the user is thinking, and `How to fix it` with an explicit `it`. Two plain
questions as a fixed scaffold, repeated five times on one page.

`What happened` bodies are written in **second person, active, and they assign
agency accurately**:
"You tried to share or unshare a folder that contains a very large number of
files." / "You sent a lot of invitations in a short period of time." /
"You tried to share with someone who couldn't be shared with." Note the last
one's careful passive-on-the-other-party construction — it does not say "you
tried to share with someone who blocked you," which would misattribute; the
block is the *other* team's policy, and the copy says so in the bullets beneath.

**Rate limits are explained by their purpose, not just stated** `[documented]`:
"To prevent abuse, there is a limit on how many shared folder invitations you can
send every 24 hours." Naming the reason (`to prevent abuse`) converts an
arbitrary wall into a defensible one, and the window is given as a number.

**Partial-success reporting is promised in the error copy itself** `[documented]`:
for `Sharing was unsuccessful.`, "**We'll let you know how many users you
successfully shared with and how many couldn't be invited.**" A bulk operation
that reports a split result rather than a binary failure — and the help article
tells the user to expect that, so a partial result doesn't read as a bug.

**The admin-escalation pattern is symmetrical and worth noting** `[documented]`:
for cross-team sharing failures, the fix is "If you're on a Dropbox team plan,
contact your admin… If the user you're trying to share with is on a Dropbox team
plan, ask them to contact their admin." **Both sides of a two-tenant permission
failure are named, with the user given a script for each.** Enterprise sharing
failures are usually someone else's policy, and telling the user *whose* is the
whole job.

**Article titles — five shapes, with genuine user-voice presence** `[observed]`.
Unlike Todoist's `Troubleshoot <object>` monoculture, Dropbox's troubleshooting
titles are mixed and several are first-person:

| Shape | Examples |
|---|---|
| First-person complaint | `I'm having trouble with a shared folder` |
| `Why can't I…?` | `Why can't I share with people outside my team?` · `Why can't I add a shared folder to my account?` · `Why can't I access an attached file?` |
| `Why has/was…?` | `Why has my sharing activity been interrupted?` · `Why does Dropbox need to "sync my files again"?` |
| `What's a <concept>?` | `What's a view-only conflict?` · `What is the Dropbox file size limit?` |
| `How to <verb>` / `Fix <X>` | `Fix Dropbox Files Not Syncing Issues` · `How to resolve shared Dropbox folder access issues` · `Troubleshoot shared links` |
| Bare problem noun | `Problems accessing shared folders` · `Common sharing errors and how to solve them` |

`Why does Dropbox need to "sync my files again"?` is the standout — the user's
question **with the product's own message quoted inside it, in scare quotes.**
That is the Wise `Why does it say my transfer's complete when the money hasn't
arrived yet?` pattern: an article that exists specifically because a system string
confused people, titled with the string. If you ship a message users find
alarming, this is the article to write.

`Why has my sharing activity been interrupted?` (URL slug: `banned-links`) is the
opposite instinct — a euphemistic title for an abuse enforcement action. The slug
says `banned`; the title says `interrupted`. A softening that may hinder
findability for a user who has just been told their link is banned.

**Named conflict types, each a coined noun with its own article** `[documented]`:
`selective sync conflict` · `view-only conflict` · `permission conflict` ·
`encrypted file or folder sync conflict` · `conflicting copies` (in the file
locking description). **Five distinct named conflict classes.** Naming a conflict
type rather than emitting a generic "sync error" is what makes each one
documentable and searchable, and it is why this product's failure content is
navigable at all.

**`permission conflict` is the best-documented of the five** `[documented]`:

> Summarised: a permission conflict occurs when you try to add a file to a folder
> you don't have access to. Dropbox creates a new folder inside your team member
> folder named **"[filename] (permission conflicts)"**. The best resolution is to
> request edit access to the original folder and add your file, then delete the
> conflict file. Edit access can be requested from the file owner, or from your
> admin if you don't know who the owner is.

Three things worth taking. (1) The failure produces a **named artefact with a
predictable naming convention** — `[filename] (permission conflicts)` — so the
user can find and recognise the debris rather than losing the file. (2) The
remedy sequence is stated as "the best way," acknowledging alternatives exist.
(3) The fallback for the social step is explicit: if you don't know the owner,
`reach out to your admin`, with a link to `find-admin`. **Never leave a
permission remedy dependent on knowledge the user may not have.**

**Pre-emptive failure handling inside instructions** `[documented]`:
"If you don't see a sync icon, close all non-Dropbox applications, then quit and
reopen the Dropbox desktop app. If the issue continues, restart your computer."
Placed as a `Note` inside the *how to check status* procedure, before anything has
gone wrong. And the sub-heading
`Can't find Preferences on the Dropbox desktop app?` inside a procedure that
requires finding Preferences. Both are the Wise `Trouble logging in?`
pattern — the recovery adjacent to the action, not filed elsewhere.

## T8 Empty states

`[partial]`.

**Observed, on the status page** — two variants of one state:
`No incidents reported today.` (current day) and `No incidents reported.`
(prior days). Bounded by date, so neither can be misread as "nothing ever goes
wrong." Sound practice, mildly inconsistent phrasing.

**Documented, in-product** — one clean example and one failure-shaped one:

- `Your files are up to date` (T6) is the "nothing to do" state of the desktop
  app, and it is phrased as **a fact about the user's files rather than about the
  app's queue**. `Fully synced` describes the system; `Your files are up to date`
  describes the user's world. For a persistent, always-visible slot, the second
  register is right.
- `Recently Deleted` / restore windows are tier-scoped and stated as durations on
  the pricing matrix: `30-day history` / `180-day history` / `1-year history`,
  labelled twice as `Account recovery and version history` and
  `Restore deleted files`. So the "your deleted files are gone" empty state has a
  disclosed, purchasable horizon.

**No in-product zero-data, no-results, or first-run string was retrievable.**
`[absent]` — all are behind auth, and the help centre does not quote them.

Negative finding on the harvest side: `See all` and `Show less` on help category
pages render as `Javascript:void(0);` hrefs, so to a non-JS client the expanded
article lists appear but the controls are dead links — a progressive-disclosure
mechanism that degrades into duplicate content rather than into a clean state.

## T9 Notifications & system messages

`[observed]` and `[documented]`.

**Status-page subscription is the best-articulated notification offer here**
`[observed]`. Five channels — email, SMS, Slack, Twitter/X, Atom/RSS — each with
its own scope sentence, and the sentences differ **because the channels differ**:

> Email: "Get email notifications whenever Dropbox **creates**, **updates** or
> **resolves** an incident."
> SMS: "Get text message notifications whenever Dropbox **creates** or
> **resolves** an incident."

**Three event types on email, two on SMS** — the intermediate `updates` event is
deliberately withheld from the higher-friction channel, and the copy states the
difference rather than hiding it. That is a genuinely thoughtful piece of
notification-design copy: the user choosing SMS learns they will get fewer
messages, which is usually why they chose SMS. Slack gets a third framing
("incident updates and maintenance status messages"), naming `maintenance` as a
category the other two don't mention.

Also `[observed]`: the SMS flow discloses cost and consent inline — "Message and
data rates may apply. By subscribing you agree to the Atlassian Terms of
Service…" — and an OTP flow with `Resend OTP in: 30 seconds` and
`Didn't receive the OTP?` `Resend OTP`. A countdown plus a pre-empted failure
question at exactly the moment the code doesn't arrive.

**In-product notification states are part of the icon vocabulary** `[documented]`:
`Unread notifications` (a red badge with a count) and
`Snooze notifications is on` (a gray icon with two Zs) sit in the *same*
notification-area icon table as the sync states. So one affordance carries sync
status, notification count, snooze state, and camera-upload progress — four
unrelated signal types in one tray icon, each documented.

**Breach and security alerting is a marketed feature with named triggers**
`[observed]`, from the security page, summarised:
`Breach alerts and notifications` — immediate alerts for suspicious behaviour
including **ransomware attacks, mass file deletion, excessive login attempts, and
login attempts from unfamiliar or suspicious locations**. Plus
`Dark web monitoring` with "automated systems to notify you if your information
has been compromised," and `Ransomware detection` with "always-on monitoring
quickly alerts you to potential attacks."

Naming the four specific trigger conditions (rather than "unusual activity") is
what makes this credible. `mass file deletion` as a named alert trigger is the
one a user would not think to ask for.

**Article-level feedback widget** `[observed]`, on every help article, and it is a
model of cheap, well-designed feedback copy:

> `Was this article helpful?` → `Yes, thanks!` / `Not really`
> then `Let us know how why it didn't help:` *(sic — a visible typo, "how why")*
> Options: `The article didn't answer my question` ·
> `The steps in the article didn't work for me` ·
> `I found this article confusing and difficult to read` · `Other`
> `Please enter feedback before submitting.` (validation) ·
> `Submit feedback` · `Thanks for your feedback!` / `Thanks for letting us know!`

`Not really` instead of `No` is a real choice — it lowers the social cost of
saying no and probably raises response rate. The three failure reasons map to
three distinct content defects (**wrong scope / wrong steps / wrong clarity**),
which is exactly the taxonomy a content team needs, in first person from the
reader. And there is a `Please enter feedback before submitting.` validation
string, plus two different thank-yous for two different paths.

The typo `Let us know how why it didn't help:` is live on every help article in
the harvested set — a single broken string at enormous scale.

`[absent]` for email, push, and toast copy.

## T10 Disclosures, legal & compliance

**The second priority section, and the deepest permission vocabulary in this
corpus.**

### The three-role model, and the two-label problem `[documented]`

Dropbox runs **two parallel permission vocabularies for one system** and
documents both on the same page:

**Permission labels** (what you assign, in the UI):
- `Can edit`: "Any team member you give this permission to can add, edit, delete,
  share, or download files in that folder."
- `Can view`: "Any team member you give this permission to can view, download,
  share, and comment on files in the shared folder, but not add, edit, or delete
  files."

**Role names** (what you become, in the conceptual model):
`owner` · `editor` · `viewer`, with the mapping stated explicitly —
"Any member you give **Can edit** permission to is an editor."

So the article's own structure is: here are two permission options → *and then*
`What are owner, editor, and viewer roles?`. **The verb-phrase labels are what the
user picks; the noun roles are what the user is.** That split is defensible — you
assign a capability, you refer to a person — and Dropbox is unusual in
documenting the bridge sentence between them rather than leaving the reader to
infer it.

The capability definitions are **enumerated verb lists, positive then negative**:
`Can view` = "view, download, share, and comment… **but not** add, edit, or
delete." Five permitted verbs, three forbidden, in one sentence. Note that a
*viewer* can `share` — a non-obvious capability that the definition surfaces
rather than hiding.

**`owner` is defined by three rules, not by a capability list** `[documented]`:
only one person can own a folder; the creator is automatically the owner unless
they transfer it; and — the non-obvious one — "If you create a subfolder within
someone else's parent folder, then **they** become the owner of the subfolder."
Ownership is inherited *upward* from the container, not retained by the creator.
That is exactly the rule a user would get wrong, and it is stated in the
definition rather than in an FAQ.

### The role matrix, and its footnote system `[documented]`

A 15-row × 3-column matrix (`Owner` / `Editor` / `Viewer`) over two labelled
groups, `File and folder actions` and `Member actions`. Rows worth naming:

`View folder members and their roles` · `View folder contents` ·
`Edit folder contents` · `Comment on files in folder` · `Unshare folder` ·
`Download folder contents` · `Invite and remove members` ·
`Cancel invites and reinvite members` ·
`Determine who can be invited to the folder` ·
`Determine who can manage membership of the folder` ·
`Make another member the owner` · `Change roles of other members` ·
`Email members` · `Move a shared folder into a team folder` ·
`Leave the folder`.

**`View folder members and their roles` as the first row is a quiet but important
disclosure**: everyone, including viewers, can see the full membership and role
list. Privacy-relevant, and stated first.

**Four footnote classes, each carrying a different kind of qualification** —
this is the most sophisticated disclosure mechanism in the corpus:

| Marker | Text (verbatim) | What it does |
|---|---|---|
| `*` | "This is the default setting for shared folders. The owner of a shared folder can change this setting." | Marks a capability as **configurable**, not fixed |
| `†` | "Owners can only unshare a folder if the folder doesn't have any shared folders inside of it and the folder isn't inside another shared folder." | Marks a **structural precondition** |
| `‡` | "If a shared folder is created within a team account, only members of that team can invite and remove members." | Marks a **tenancy scope** |
| `§` | "Applies only to team accounts." | Marks **plan/context availability** |

Four orthogonal qualification types — *is it default, is it structurally possible,
who is in scope, which plan* — distinguished by symbol rather than collapsed into
one "conditions apply." A permission matrix that would otherwise be a lie by
simplification becomes accurate, and the reader can see *what kind* of exception
they are reading before they read it. **Directly transferable to any entitlement,
eligibility, or fee matrix**, including PayPal's.

Two more qualifications sit outside the footnotes, as `Note` blocks: "The
permissions in the table below may differ for customers in a team account,
because admins can manage sharing settings for their team," and the inheritance
rule "Granting edit or view access for a parent folder will allow that access
level to all subfolders within that parent folder as well."

### Link-level access as a separate permission system `[documented]`

The most important disclosure in the sharing content is the boundary between the
two systems:

> **Note:** "Link settings, including passwords and other restrictions, apply
> only to people who access a file or folder through the shared link. **Anyone
> added directly, or who already has access, keeps their existing permissions and
> isn't affected by link settings.**"

**Two independent access paths to one object, and the copy states that securing
one does not secure the other.** This is precisely the mental-model error that
causes real data exposure — a user password-protects a link and believes the file
is locked. Stating the non-interaction, in bold, at the top of the article, is the
single best piece of permission copy in this file.

A second boundary note follows immediately: "The link customization options below
only apply to shared links **you** create. If you give someone access to a file or
folder, your link customizations won't apply to any shared link **they** create."
Delegated re-sharing does not inherit your restrictions — stated plainly.

**Link controls and their disclosures** `[documented]`:

- `Require password` — "When someone opens the link, they'll need the password to
  see its contents." Plus: "For security, we never display your existing
  passwords." A stated reason for a limitation the user will find annoying.
- `Expiration` — "The shared link expires at **11:59 pm on the day you choose,
  based on your time zone**." A timezone-and-minute-precise boundary, repeated
  verbatim in the FAQ. Plus the recipient-side view: "Recipients see the shared
  link page as usual. **They won't see the expiration date.**" And the failure
  state: after expiry "they'll see an error saying `This link is expired.`"
- `Disable downloads` — carries an **`Important` warning that undercuts the
  feature**: "Disabling downloads for a shared link prevents people from
  downloading the contents of a link through Dropbox. **This doesn't prevent
  people from saving the content using other methods.**" Naming the limit of your
  own security control, in a warning callout, on the page that sells it. This is
  the Wise "claim, then bound the claim" move applied to a security feature, and
  it is the honest thing to do — DRM-adjacent controls are always circumventable
  and pretending otherwise creates real risk.
  It also documents the downstream UI: the recipient's `Download` button "will be
  grayed out and won't be clickable," with a hover tooltip reading
  `Downloads disabled.`
- `Link restrictions` (folder level) — "Enabling this setting applies a **blanket
  restriction** to the folder and all its content. This restriction will be in
  place **regardless of your existing link sharing settings.** Anyone attempting
  to access the folder, or a file within the folder, through a link, who isn't a
  member of the folder, **will have to submit an access request**." A single
  override that supersedes everything else, with the override explicitly named as
  such, and the fallback flow (`access request`) named.
- `Who has access` values, with the public one self-describing its own
  consequence: `Anyone with the link` — "this is effectively making your Dropbox
  files public" (see T5).

**Admin/member authority is disclosed from the member's point of view**
`[documented]`, in FAQ form:

> "As a member of a Dropbox team account, does the admin for my team have control
> over the passwords I set?" → Summarised: admins can't set your passwords, but
> they can control whether you're able to set them, and can restrict all shared
> links to team-only.
> "I'm a Dropbox team member. Does my admin have any control over the expirations
> I set?" → Summarised: admins can assign a default expiration for team shared
> links.

**Telling a user what their own administrator can and cannot do to their
settings** is rare and valuable. The distinction drawn — an admin cannot *set*
your password but can *remove your ability* to set one — is exactly the
capability/meta-capability split that enterprise permission copy usually fudges.

**Admin-only articles are badged in the help IA** `[observed]`: the `Share`
category appends an `Admins` marker to
`Manage file requests for your Dropbox team`, `Manage external sharing in your
team`, `How to manage Dropbox Transfer for your team`,
`How to monitor Dropbox team sharing activity`, `Restrict access to a folder
inside a team folder`, `How to add custom branding to shared links`, and in
`Sync`, `Set Dropbox to online-only for your team` and
`How to manage team selective sync settings`. **Audience badging in a category
listing** so a non-admin doesn't read eight steps they can't perform — the same
job Todoist's `Available for: Beginner/Pro/Business` badge does for entitlement.

### Compliance and security disclosure `[observed]`

Security page hero: `At Dropbox, security is our highest priority`, then six
pillars: `Account security` · `File protection and encryption` ·
`File sharing and permissions` · `File and folder recovery` ·
`Data breach security` · `Compliance`.

**Encryption claims are quantified and bounded** `[observed]`, summarised:
256-bit AES at rest, described as the strongest AES available and "virtually
impossible to crack" — with the bound supplied as an order of magnitude ("would
take billions of years… using current technology and so-called 'brute force'
methods"). `current technology` and the scare-quoted `"brute force"` are both
doing qualifying work: the claim is scoped to a method and an era. SSL/TLS in
transit, stated separately with the specific boundary "as it transfers between
Dropbox apps and our servers."

**Compliance inventory** `[observed]`: `GDPR compliant` · `Support for HIPAA
compliance` (carefully worded — "committed to **helping customers** subject to
HIPAA/HITECH regulations safeguard protected health information (PHI)", i.e.
enabling compliance, not being compliant) · `SOC 1, 2, and 3 compliance reports` ·
`Data classification` · `Data Governance Add-On`. The pricing matrix carries
`Enable HIPAA compliance` as a row — again `Enable`, not `HIPAA compliant`. **The
verb choice is consistently and correctly hedged** on the one regime where the
vendor cannot be the compliant party.

`Compliance tracking` appears as an `Advanced`-tier bullet, and
`Data classification` / `Ransomware detection and recovery` /
`Suspicious activity alerts` / `End-to-end encryption` / `Advanced Key
Management` are all `Advanced`-only rows. **Security is explicitly tiered**, which
is a content-design constraint: copy on lower tiers must not imply protections the
user doesn't have.

**Data residency is given its own FAQ and its own definition** `[observed]`:

> `What is data residency?` → Summarised: the physical location where an
> organisation's data is stored; some organisations require specific locations to
> comply with laws affecting them; if your data is in the US but your billing
> address is elsewhere, you may be able to migrate to a closer server.
> `Where is my data stored?` → Summarised: files sync to secure servers in US data
> centres, with additional storage servers in Australia, the EU, Japan, and the
> UK for eligible users of team plans.

**Defining the term before answering the question** is the right order, and the
answer names the default (US) before the exceptions. `eligible users of Dropbox
team plans` bounds the availability.

**The most important privacy FAQ, and the sentence most products would omit**
`[observed]`:

> `Who can see files and data in my Dropbox account?` → Summarised: your account
> and its contents are private; the only people who can view your files are you
> and anyone you have purposefully chosen to share with. **"Like most major online
> services, Dropbox personnel will, on rare occasions, need to access users' file
> content."**

Three qualifiers doing careful work — `Like most major online services`
(normalising), `on rare occasions` (frequency), `need to` (necessity rather than
discretion) — and then a link to the full article. It would have been easy to stop
after "private." Disclosing employee access on the page that claims privacy, with
a peer comparison and a frequency bound, is the honest construction. `purposefully
chosen` is also a good adverb: it excludes accidental exposure from the claim.

**Trust artefacts** `[observed]`: a `Trust Center` at `trust.dropbox.com` with
its own CTA and a one-line scope ("Learn more about our approach to security in
our Trust Center"), plus `AI principles` as a footer link. Both are the
"deeper, separate, optional" pattern — the marketing page carries the
comprehensible version and links the authoritative one, the same dual-format move
Wise makes with regulator-format fee tables.

### Plan and entitlement disclosure — the major defect `[observed]`

The `/plans` page presents five tiers: `Plus` ($9.99/month, `For personal use`,
`For 1 person`) · `Standard` ($15/user/month, `Best Value`,
`For teams and professionals`) · `Advanced` ($24/user/month, `For companies`,
`For 3 people or more`) · `Basic` (`Free`, 2 GB) · `Enterprise`
(`Contact us for pricing`, `For large organizations`).

The footer lists four products: `Plus` · `Professional` · `Business` ·
`Enterprise`.

The shared-link-permissions article gates its features to: "Dropbox
**Professional, Essentials, Standard, Advanced, Business, Business Plus, and
Enterprise**."

**That is at minimum nine distinct tier names across three surfaces — `Plus`,
`Basic`, `Professional`, `Essentials`, `Standard`, `Advanced`, `Business`,
`Business Plus`, `Enterprise` — of which four (`Professional`, `Essentials`,
`Business`, `Business Plus`) do not appear on the pricing page at all.** The
eligibility sentence a user must read to learn whether they can password-protect a
link is written entirely in vocabulary the pricing page does not use. A `Plus`
subscriber reading that list cannot tell whether they qualify — and per the
comparison matrix (`Password-protected links` = `-` for Plus) they do not, but the
article never says `Plus`.

This is the mirror image of Craft's six-name problem at larger scale, and it sits
on the highest-stakes copy in the product: who can restrict access to what.

**Other disclosure practice on `/plans`** `[observed]`, which is otherwise good:
storage is stated twice in two units (`2 TB of storage` on the card,
`2,000 GB of storage` in the matrix — consistent, just doubled); restore windows
are durations rather than booleans (`30 days` / `180 days` / `1 year`); transfer
ceilings are explicit (`50 GB` / `100 GB` / `250 GB`); `Starts at 3 TB for the
team` discloses that team storage is a pooled floor, not a per-seat figure; `-` is
used as an explicit "not included" value rather than a blank; and unshipped
features are labelled `Coming soon` inline beside the `Preview of Dash, your AI
teammate` block. `Signature requests: 3 per month` is a stated quota rather than
"limited."

## T11 Help-centre architecture

**Three levels: group → category → sub-group → article**, with a Coveo-powered
search and a Community/Learn split.

**Article-title grammar — six shapes, and the inconsistency is systematic**
`[observed]`:

| Shape | Examples |
|---|---|
| `How to <verb>` | `How to pause and resume file syncing`, `How to share a Dropbox Paper doc`, `How to join a shared folder`, `How to unshare files and folders in Dropbox` |
| `How do I / How can I …?` | `How can I share a link to my file using the Dropbox badge?`, `How can I fix Dropbox syncing issues?` |
| `<Noun>: an overview` | `Sharing files or folders in Dropbox: an overview`, `Dropbox Transfer: an overview`, `Selective sync overview: unsync folders from your desktop` |
| Question | `Who is the owner of a shared folder?`, `Can everyone on my team access my files?`, `Do I need a Dropbox account to join a shared folder?`, `Can I share a subfolder inside a shared folder?`, `Can Dropbox sync symbolic links?` |
| `Why …?` | `Why can't I share with people outside my team?`, `Why has my sharing activity been interrupted?` |
| **Title Case marketing-style** | `Collect Files Easily with File Requests`, `Free Up Space with Online-Only Files`, `Create & Share Dropbox Links Easily`, `How to See Who's Viewing Your Files`, `Fix Dropbox Files Not Syncing Issues` |

**That last group is the clear defect.** Five or more article titles are written
in **Title Case with marketing adverbs** (`Easily`, `Easily`, `Free Up`) sitting
directly beside sentence-case functional titles in the same list. `Collect Files
Easily with File Requests` next to `How to upload to a Dropbox file request`;
`Create & Share Dropbox Links Easily` next to `How to set shared link
permissions`. These read as SEO-optimised titles retrofitted into a help centre,
and they break both the casing convention and the register. `Easily` is also an
unhelpful promise in a help article — the user is there because it wasn't.

Also note `Can Dropbox sync symbolic links?` as a title against
`Can Dropbox sync symlinks?` as the related-article label — two forms of one
question, and the body uses `symlinks`.

**Article furniture** `[observed]`, a consistent scaffold:

- Breadcrumb: `Dropbox Help Center - How to use Dropbox > Share > <short title>`
  — note the **breadcrumb leaf uses a shortened title** (`Sharing issues`,
  `Shared link permissions`) that differs from the H1
  (`Common Dropbox sharing errors and how to solve them`). Deliberate and
  sensible for a breadcrumb, but it means one article has three names (H1,
  breadcrumb, `<title>` tag).
- `Updated <date>` — a visible freshness stamp (`Updated Sep 15, 2026`,
  `Updated Jun 19, 2026`, `Updated Jan 19, 2024`). The 2024 date on the
  sharing-errors article is itself informative.
- `In this article` — a contents block.
- **An audience-scope sentence with a `person icon`**, on every article:
  "The information in this article applies to all Dropbox users, unless otherwise
  stated." / "…applies to Dropbox desktop app users on Windows." /
  "The features listed below are only available to customers on Dropbox
  Professional, Essentials, Standard, Advanced…". **Stating applicability before
  the content** — platform, user class, and plan — is the same discipline as
  Todoist's `Available for` badge and is arguably better executed, since it is a
  sentence and can express "unless otherwise stated."
- Typed callouts with **named icons in the text**: `highlighter icon` **Note:**,
  `warning icon` **Important:**, `person icon`. The icon name leaking into the
  rendered text is a defect, but the two-level severity (`Note` / `Important`) is
  used consistently and correctly — `Important` is reserved for the
  downloads-can-be-circumvented warning and equivalent.
- Platform tabs (`On dropbox.com` / `On the Dropbox desktop app` /
  `On the Dropbox mobile app`, then `Android` / `iOS` within).
- `FAQs about <topic>` as a named in-article section.
- `Read more` expander.
- `Was this article helpful?` widget (T9).
- `Related Articles` — 4 links, **using yet another set of shortened titles**
  (`Banned links`, `Force download`, `Joining and sharing folders`,
  `Customize shared links`, `Troubleshooting shared links`). A fourth naming layer.
- **`Community answers`** — 5 linked forum threads with author name, age in days,
  and view/reply/like counts.

**`Community answers` embedded in official articles is the most distinctive IA
decision here** `[observed]`. Official documentation is followed by
user-generated threads, with **age displayed in days** — and the harvested
examples include threads `2667 days ago` and `3591 days ago`. Surfacing a
seven-to-ten-year-old forum post beneath current documentation is a real risk
(one thread under the permissions article is a Dropbox API question from 2016),
and the day-count is the only signal the user gets. Several linked threads are
also community *announcements* rather than answers
(`Are you new here? Read this first!`, `School's out for the Summer`,
`Have you been helped by a Dropbox Super User?`), so the block's relevance
matching is weak.

**Routing furniture** `[observed]`: help home leads with `How can we help?`
(the same H1 as Todoist), then `Popular topics` chips, then the three category
groups, then `Frequently asked questions`, then `Other ways to get help` with
three named channels each carrying a scope sentence (see T3). Escalation ladder:
docs → `Community` → `Contact support` → `Social media support`. Four rungs, all
named, with **`Contact support`'s scope line disclosing three functions**:
"Learn about your support options, file a support ticket, and check the status of
open tickets."

## T12 FAQs

`[observed]`. Four FAQ surfaces, and the pattern across them is worth noting:
Dropbox places small FAQ blocks **everywhere** rather than maintaining one FAQ
page.

**1. Help centre home — four questions** `[observed]`, all `How do I …?`:

| # | Question (verbatim) |
|---|---|
| 1 | How do I change or reset my Dropbox password? |
| 2 | How do I update my billing information? |
| 3 | How do I share files or folders in Dropbox? |
| 4 | How do I set up Dropbox Backup? |

Two account-recovery/billing tasks, one core task, one product upsell. The
selection is revealing: the most-asked question at a 700-million-user file
company is how to reset a password.

**2. `Sync` category — four questions** `[observed]`:

| # | Question (verbatim) |
|---|---|
| 1 | How can I fix Dropbox syncing issues? |
| 2 | How do I pause and resume file syncing? |
| 3 | How can I check if my files and folders are syncing? |
| 4 | What do Dropbox sync icons in the desktop app for Windows and Linux mean? |

Note the shift to `How can I…` for the two failure questions and `How do I…` for
the task — probably accidental, but it tracks capability-anxiety vs procedure.
Q4 is the icon-vocabulary question, and it bundles two platforms in one title
while the underlying articles are split per platform.

**3. `Share` category — three questions** `[observed]`:
`How do I create and share a link to a file or folder in Dropbox?` ·
`How do I create and manage file requests?` ·
`How do I share a file or folder directly with others in Dropbox?`

The first and third are the **link-share vs direct-share distinction** posed as
two separate questions — which is the right way to teach a distinction the user
doesn't yet know exists (and which, per T10, has real security consequences).

**4. Security page — five questions** `[observed]`, the most substantive set:

| # | Question (verbatim) | Answer shape |
|---|---|---|
| 1 | Is Dropbox secure? | Opens with a bare `Yes.`, then segments by user type, then routes to Trust Center |
| 2 | What security features does Dropbox have? | Four-bullet technical list |
| 3 | Where is my data stored? | Default location, then exceptions, then eligibility bound |
| 4 | What is data residency? | **Definition before answer** |
| 5 | Who can see files and data in my Dropbox account? | Private → exception (personnel access) → link |

Ordering: reassurance → mechanism → location → **concept definition** →
access disclosure. Q4 interrupts a sequence of user questions to define a term the
reader may have encountered in procurement — an FAQ slot used as a glossary entry.
And Q5, the one with a genuinely uncomfortable answer, is placed last (see T10).

Q1's answer begins `Yes.` as a standalone sentence. For a binary trust question,
answering the binary before explaining is correct and is the same move Things
makes in its purchase FAQ.

**5. `Shared link permissions` — seven in-article FAQs** `[observed]`, and these
are the best-targeted set:
`What if I forget my password for the link or want to change it?` ·
`As a member of a Dropbox team account, does the admin for my team have control
over the passwords I set?` · `When does the shared link expire?` ·
`What does a shared link with an expiration date look like for the people I share
it with?` · `Can I change the expiration date?` ·
`What happens if someone I share the link with accesses it after the expiration
date?` · `I'm a Dropbox team member. Does my admin have any control over the
expirations I set?`

Four of seven concern **what the other party experiences** or **what the admin can
override** — the two blind spots in any permission feature. `What does a shared
link with an expiration date look like for the people I share it with?` is the
standout: an FAQ about the *recipient's* view, asked from the sender's
perspective. Most permission documentation never describes the far side of the
transaction.

## T13 Terminology & glossary

| Term | Dropbox's usage | The alternative it rejected |
|---|---|---|
| `sync` | The core verb, a category, a status, and an icon set. Also `unsync` (transitive), `resync`, `selective sync`, `LAN sync`, `Sync & storage dashboard` | "replicate", "mirror", "update" |
| `online-only` | Synced but not on disk; "appear in the Dropbox folder but don't take up hard drive space" | "cloud-only", "on-demand", "stub", "placeholder" |
| `available offline` | On disk; the counterpart state | "downloaded", "local", "pinned", "cached" |
| `ignored` | Deliberately excluded from sync, with its own icon | "excluded", "skipped", "blocked" |
| `Fully synced` | Account-level all-clear (icon label) | "Up to date", "Synced" |
| `Your files are up to date` | The same state in the app window | — |
| `cloud files` vs `Dropbox legacy` | The two named sync engines | "new sync" / "old sync", version numbers |
| `Can edit` / `Can view` | Permission labels (verb phrases) | "Editor"/"Viewer" as pickers, "Read/Write" |
| `owner` / `editor` / `viewer` | Role nouns, mapped to the above | "admin/member/guest" |
| `permission conflict` | Named failure when writing to a folder you can't access | "access denied", "write error" |
| `view-only conflict` | Named failure class with its own article | — |
| `selective sync conflict` | Named failure class | — |
| `conflicting copies` | What file locking prevents | "duplicates", "forks" |
| `file locking` | Lock while editing "to prevent unwanted edits from collaborators" | "check out", "reserve" |
| `shared link` vs `direct sharing` | The two access paths, deliberately distinguished | one "sharing" |
| `Link for editing` / `Link for viewing` | Two links per item, by capability | "edit link"/"view link" (used on iOS — both forms ship) |
| `Secret Link`-equivalent: `Link restrictions` | The blanket folder override | — |
| `file request` | Inbound collection ("Collect Files Easily with File Requests") | "upload request", "dropbox" (the original meaning) |
| `Dropbox Transfer` | One-way delivery, distinct from sharing; pricing calls it `One-way transfer` | "send", "share" |
| `team folder` | Admin-provisioned shared container, distinct from `shared folder` | "workspace", "drive" |
| `Company managed groups` | Admin-created groups | — |
| `Tiered admin roles` / `Tiered-admin management` | Delegated admin hierarchy — **two spellings on two surfaces** | "sub-admins", "RBAC" |
| `Sign in as user` | Admin impersonation, named plainly | "assume identity", "masquerade" |
| `Invite enforcement` | Admin control requiring team invite acceptance | — |
| `Dropbox Rewind` | Folder- or account-level time travel, "reversing all changes" | "restore point", "snapshot" |
| `remote device wipe` / `Remote wipe` | Two spellings, matrix vs features nav | — |
| `Dash` | The AI content product; "your AI teammate" | "Copilot", "Assistant" |
| `Stacks` | A Dash container with its own sharing semantics ("Stack-based access") | "collections", "boards" |
| `Data Governance Add-On` | Paid retention/compliance module | — |
| `Plus button` | A pricing-matrix row, unexplained | — |
| `registered users` | The 700M metric's actual unit | "users", "customers" |

**Four observations.**

**`online-only` / `available offline` is the best-chosen state pair in the
corpus.** Both are **plain adjectival phrases describing where the file is from the
user's point of view**, not from the system's. The industry alternatives —
"placeholder", "stub", "on-demand", "dehydrated" — all describe the
implementation. And crucially the pair is *symmetrical and mutually exclusive*, so
the user can reason about it. `ignored` then sits outside the pair as a third,
non-symmetrical state, which is correct because it is a different *kind* of
absence (chosen exclusion, not storage location).

**The `Plus button` row on the pricing matrix is an undefined coined term being
sold**, exactly parallel to Todoist's `Ramble`. It appears once, as a feature
present on all three tiers, with no gloss anywhere harvested.

**`Sign in as user` is admirably blunt** for an admin impersonation capability
listed on a public pricing page. Most vendors name this something softer. Listing
it as a purchasable `Advanced` feature is also, for the member being impersonated,
a meaningful disclosure — it appears on a page their employer reads, not one they
do.

**Spelling drift across surfaces** is systematic enough to note as a class:
`Tiered admin roles` / `Tiered-admin management`; `remote device wipe` /
`Remote wipe`; `Advanced key management` / `Advanced Key Management`;
`buy now` / `purchase now`; `symbolic links` / `symlinks`;
`Anyone with the link` / `Anyone with link`; `Learn` / `Dropbox learn`. Each is
trivial; collectively they indicate no shared terminology authority across
marketing, pricing, and help.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the
company — and Dropbox uses `we` most heavily in the *security* copy, which is
where it is most load-bearing: "We protect data", "We keep our systems safe from
bad actors", "we continuously monitor the dark web", "we work hard to ensure",
"**we never display your existing passwords**", "**We'll let you know how many
users you successfully shared with**", "we're committed to helping customers
subject to HIPAA". The company is an active agent in both its protections and its
limitations.

**Register: functional and flat in help, warmer and more elliptical in
marketing.** The help centre is close to reference-manual register —
"Hover over the name of the file and click **Share**." — with almost no
personality. Marketing runs to fragments (`Share in confidence.`,
`Store and share files. Sign and send documents.`) and to the occasional
imperative encouragement (`Don't live in fear of file loss.`,
`Give yourself peace of mind`). The gap is narrower than Craft's but present.

**Exclamation marks: exactly two in the harvested set**, both in the feedback
widget (`Yes, thanks!`, `Thanks for your feedback!`). Zero on the home page, zero
on pricing, zero on security, zero in the sync and permission articles. For a
consumer brand with a historically playful voice, this is a notably restrained
surface — the tone has followed the product upmarket.

**The state-copy frame described in T6 is the single best voice artefact** and it
is worth restating as a voice observation rather than a state one: four sync
states, one sentence frame, tense-and-condition as the only variables. That is
what a house style looks like when it reaches the level of individual strings.

**Numbers are specific and load-bearing**: `700 million registered users`,
`175+ file types`, `250GB`, `256-bit AES`, `30 days` / `180 days` / `1 year`,
`2 TB` / `2,000 GB`, `3 per month`, `1 billion API calls/month`,
`11:59 pm`, `24 hours`, `three times` (upload retries are Craft's; Dropbox's
equivalent is the 24-hour invite window). The `11:59 pm on the day you choose,
based on your time zone` is the most precise timing disclosure in the corpus.

**Accessibility content** `[observed]`

- **Good:** `Skip to main content` is first in the DOM on marketing pages.
- **Good:** marketing alt text is descriptive and **explains the diagram's
  meaning**, not just its contents:
  "A visual example of files being stored in Dropbox cloud storage, protected by
  SSL/TLS during upload, and 256-bit AES encryption at rest." ·
  "A visual example of the alert settings available to admins in the event of a
  potential security breach." ·
  "A visual example of the process to create a data retention policy with the
  Dropbox Data Governance Add-On." ·
  "A fingerprint icon, representing Dropbox account security features." ·
  "Padlock symbol overlaying a 3 by 4 grid of folders and icons."
  Naming what an icon *represents* rather than what it depicts is the right call
  for decorative-but-meaningful imagery.
- **Outstanding, and the reason T6 is possible:** the sync-icon article's
  `Description` column gives **a literal visual description of every icon in
  words** — "A green circle with a white checkmark", "A white cloud with a gray or
  blue outline", "A solid black circle with two white arrows going in a circle",
  "A gray Dropbox icon with two Zs". A three-column table (icon / description /
  meaning) means a user who cannot see or distinguish the icons can still identify
  their state by description, and a colour-blind user gets shape-and-position cues
  ("circle with a minus sign", "arrows going in a circle") independent of colour.
  **Documenting iconography in words is an accessibility practice that also
  happens to be excellent content design**, and it is the most copyable single
  thing in this file.
  The same article also states `The icon colors may vary, but you'll see the
  following icons:` — explicitly de-emphasising colour as the identifying
  attribute.
- **Good:** the article gives a screen-reader-compatible identification path
  (open File Explorer, use the search bar, look at the icon) plus a fallback if
  the icon is absent.
- **Defect:** icon names leak into rendered text throughout the help centre —
  `highlighter icon`, `warning icon`, `person icon`, `Contact support icon`,
  `Community forum icon`, `Learn icon`, `Icon depicting a speech bubble`,
  `Icon depicting two people`, `Twitter Icon`. Alt text is being rendered as
  visible text, so a screen-reader user hears "highlighter icon Note:" before
  every callout.
- **Defect:** in-line UI glyphs are rendered as **arbitrary substitute
  characters** in the help articles — `click ☑ (settings)`, `click ✗ (settings)`,
  `click ①(settings)`, `click ③ (settings)`, `Tap 🗀 (more options)`,
  `Tap ☑ (Dropbox)`, `click **a** (more options)`, `Tap **[x] members**`. At least
  six different placeholder glyphs (`☑`, `✗`, `①`, `③`, `🗀`, `a`) stand in for
  the *same two controls* across one article set, including a literal lowercase
  `a` and an unresolved `[x]` interpolation token. A screen-reader user hears
  "click ballot box with check settings". This is a systematic template failure in
  the icon-substitution pipeline, and it makes the step-by-step instructions —
  the help centre's core product — materially harder to follow non-visually.
- **Defect:** `Let us know how why it didn't help:` — a typo in the feedback
  widget, present on every help article.
- **Defect:** `Support Services ?` on the status page (T6).
- **Defect:** the `/plans` page's card template is visibly broken. Each plan card
  renders `### For teams and professionals` **four times**, a second `## Standard`
  heading appears inside the `Plus` and `Advanced` cards, `Best Value` and
  `Popular` badges repeat two to three times per card, and the security page's
  copy of the module shows `## Enterprise` inside the `Standard` card with
  `Contact sales for pricing` beside `$15 / user / month`. On the comparison
  matrix, the `Plan description` and `Billing structure` rows are **entirely
  empty**. A prospective buyer reading the pricing page sees contradictory tier
  names and prices in the same card.
- **Defect:** `See all` / `Show less` on help category pages are
  `Javascript:void(0);` hrefs — non-functional links exposed to the accessibility
  tree as links.
- **Defect:** the home page's eight customer logos repeat five times in the DOM
  (carousel), each with descriptive alt, so a screen reader encounters
  "McLaren logo, Crunch logo, Cirque du Soleil logo…" forty times.
- **Defect:** bare `Learn more` ×2 and bare `Read article` ×3 on the home page;
  `Connect now` ×3 with no external-destination signal.
- **Mixed:** the `?fallback=true` locale handling means `English (United Kingdom)`
  and `English (Australia)` are offered in the language picker but serve US
  English — a locale promise the site cannot keep.

**Negative findings, recorded honestly**

1. **Nine tier names across three surfaces**, four of them absent from the pricing
   page, used in the eligibility sentences for security features (T10).
2. `/plans` card template broken: repeated headings, wrong tier names inside
   cards, wrong prices adjacent, empty matrix rows.
3. Six different placeholder glyphs (`☑ ✗ ① ③ 🗀 a`) for the same two UI controls,
   plus an unresolved `[x]` token.
4. Icon alt text rendered as visible body text throughout the help centre.
5. `Let us know how why it didn't help:` typo on every help article.
6. `Disable downloads` (web, toggle On) vs `Allow downloads` (mobile, toggle Off)
   — inverted label and inverted polarity for one outcome.
7. Six labels for "open access settings": `Manage permissions`, `Manage access`,
   `Folder settings`, `File settings`, `Control access`, `Modify settings`.
8. Three labels for the removal action: `Remove`, `Remove member`,
   `Remove access`.
9. Three phrasings of one setting: `Manage who can add people` /
   `Who can manage membership of this folder` / `Management`, with option sets
   `Team members who can edit` / `Anyone with edit access` /
   `Members with edit access`.
10. The syncing icon means uploading, downloading, **or stuck/erroring** — a
    failure state sharing the affordance for success.
11. Person shift inside one table column: `Marked by user` vs
    `Not explicitly marked by you`.
12. `Fully synced` (icon) vs `Your files are up to date` (window) for one state;
    plus the admission that "Dropbox Backup users may see slightly different
    wording on some sync statuses."
13. `Get started` means `/plans` in the marketing nav and `learn.dropbox.com` in
    the help nav.
14. `buy now` / `purchase now`; `Learn` / `Dropbox learn`;
    `Tiered admin roles` / `Tiered-admin management`; `remote device wipe` /
    `Remote wipe`; `Anyone with the link` / `Anyone with link`;
    `symbolic links` / `symlinks`.
15. Five Title Case marketing-style article titles with adverbs (`Easily` ×2,
    `Free Up Space`) inside a sentence-case help centre.
16. `Onboarding` is a help category on the homepage grid but absent from the
    persistent nav.
17. `Cookie policy` resolves to two different URLs from two footers;
    `Community forums` resolves to two different hosts.
18. `Community answers` surfaces forum threads up to **3,591 days old** beneath
    current documentation, several of them announcements rather than answers.
19. `Support Services ?` on the live status page.
20. `An error has occurred` — the one sync state whose explanation restates the
    label.
21. `Plus button` sold on the pricing matrix, undefined anywhere.
22. `English (United Kingdom)` and `English (Australia)` in the locale picker
    serve `?fallback=true` US English.
23. Incident update body begins lowercase (`a number of pages and features…`).

---

## Transferable patterns

1. **One question, one sentence frame, tense as the variable.** Every sync state
   answers *are my changes safe elsewhere?* using the same construction —
   "changes you made are reflected everywhere" → "are updating everywhere" →
   "won't update everywhere **until you resume syncing**" → "won't update
   everywhere **until you reconnect to the internet**". Two negative states each
   end in an `until <condition>` clause naming exactly what clears them. Lift this
   frame for any sync, upload, settlement, replication, or verification state set:
   decide the one question the state answers, write one sentence, vary only tense
   and exit condition.
2. **Document your iconography in words, in a three-column table.** Icon /
   literal visual description ("A gray circle with a white minus sign") / meaning
   — plus an explicit note that colours may vary. It serves colour-blind and
   screen-reader users, it makes support conversations possible ("which icon do
   you see?"), and it forces the writer to notice when two icons mean the same
   thing. The highest-value, lowest-cost practice in this file.
3. **`What happened` / `How to fix it` as a fixed two-heading error scaffold,
   under the verbatim error string as the heading.** Past tense for the cause,
   second person, active voice, accurate agency. Repeated identically for every
   error on the page so the reader learns the shape once.
4. **State that securing one access path does not secure the others.** "Link
   settings… apply only to people who access a file through the shared link.
   Anyone added directly keeps their existing permissions and isn't affected by
   link settings." The mental-model error here causes real data exposure. Any
   product with multiple grant mechanisms (links, invites, groups, API tokens, SSO)
   needs this sentence, in bold, at the top.
5. **Bound your own security control in a warning on the page that sells it.**
   "Disabling downloads… prevents people from downloading through Dropbox. This
   doesn't prevent people from saving the content using other methods." Naming the
   circumvention honestly is safer than an implied guarantee — and it is the same
   claim-then-bound discipline Wise applies to pricing.
6. **Four footnote classes for four kinds of exception in a permission matrix**:
   `*` configurable default, `†` structural precondition, `‡` tenancy scope,
   `§` plan availability. The reader sees *what kind* of caveat they are reading
   before reading it, and the matrix stops being a lie by simplification. Applies
   directly to entitlement, eligibility, and fee tables.
7. **Tell users what their own admin can and cannot do to their settings.** "Admins
   can't set passwords for links you create, but they can control whether you're
   able to set them." The capability / meta-capability split is what enterprise
   permission copy usually fudges, and members are the ones who get surprised.
8. **Name conflict types.** `permission conflict`, `view-only conflict`,
   `selective sync conflict`, `encrypted file conflict`, `conflicting copies` —
   five named classes, each documentable and searchable, versus one generic "sync
   error". And give the failure a **named artefact with a predictable convention**
   (`[filename] (permission conflicts)`) so the user can find the debris.
9. **Document your competitor's failure symptom, attribute it, and route to their
   support.** The brown box and the gray X are OneDrive and Windows icons; Dropbox
   explains both, says "this is a Windows icon and not a Dropbox icon," and links
   Microsoft support. The user experiences one desktop; whoever explains the whole
   desktop earns the trust and deflects the ticket.
10. **Differentiate notification volume by channel and say so.** Email gets
    `creates, updates or resolves`; SMS gets `creates or resolves`. The
    higher-friction channel is deliberately quieter, and the copy states the
    difference so the user's channel choice is informed.
11. **Three named reasons for "this didn't help."** `The article didn't answer my
    question` / `The steps didn't work for me` / `I found this confusing and
    difficult to read` — wrong scope, wrong steps, wrong clarity, in the reader's
    first person. Exactly the taxonomy a content team can act on. Plus `Not really`
    instead of `No`, which lowers the social cost of negative feedback.
12. **Turn a forward-looking-statement disclaimer into user guidance.** "The
    products or features described may not be released yet. The decision to
    purchase our services should be based on the features that are currently
    available." A securities obligation rendered as an honest instruction, on a
    page whose hero sells an unshipped capability.
13. **Disclose employee access on the page that claims privacy.** "Like most major
    online services, Dropbox personnel will, on rare occasions, need to access
    users' file content" — peer comparison, frequency bound, necessity framing. It
    would have been easy to stop after "your account is private."
14. **Put an explicit `Troubleshooting <X> issues` sub-group second in every help
    category**, above the how-to content. Failure is the main support driver;
    ranking it above feature documentation is an information-priority decision
    most help centres get backwards.
15. **Stack `Try for free` with a de-emphasised `or buy now`.** Some buyers have
    already decided; forcing them through a trial is friction. Lowercase, smaller,
    second — but present.
16. **Counter-example to steal against:** nine tier names across three surfaces,
    with security-feature eligibility written entirely in the four names the
    pricing page doesn't use. Pair with the six-labels-for-one-control finding and
    the `Disable downloads`/`Allow downloads` polarity flip as a case study in what
    happens without a shared terminology authority across marketing, pricing, and
    help. Dropbox's *individual* strings are among the best in this corpus; its
    *consistency across surfaces* is among the worst.

## Caveats & gaps

- **All in-product copy is `[documented]`, not `[observed]`** — but Dropbox quotes
  its own UI strings unusually generously, and the sync-icon article's three-column
  table (icon / visual description / meaning) is close to a specification. Where
  a string is a quotation inside documentation rather than observed UI, it is
  marked `[documented]`. **T8 has no in-product empty-state string at all.**
- **`/plans` renders a broken card template** (T14). Tier names, prices, and
  badges are duplicated and cross-contaminated between cards, and the
  `Plan description` and `Billing structure` matrix rows are empty. Plan facts in
  this file are taken from the comparison matrix where the cards conflict, but
  **do not cite Dropbox tier pricing from this file without re-verifying**.
- **Tier names are irreconcilable across surfaces** and both vocabularies are
  recorded rather than resolved (T10). The `Professional`, `Essentials`,
  `Business`, and `Business Plus` names appear only in help articles.
- **10 of several hundred help pages opened.** The full IA (20 categories) is
  `[observed]`, and the `Sync` and `Share` categories' article titles are
  `[observed]` in full (~120 titles). Everything else is titles-only or
  unharvested. Notably unopened and likely high-value:
  `Delete and restore` (restore-window and recovery-state language),
  `Security` (the help-centre security category, distinct from the marketing page),
  `Account access`, `Storage space` (quota and over-limit copy),
  `Onboarding`, `AI integrations`, `Dropbox Protect`, and the
  `check-sync-status`, `files-not-syncing`, `view-only-conflict`,
  `banned-links`, and `team-access-to-files` articles.
- **`learn.dropbox.com` not harvested.** Dropbox's onboarding content lives there,
  so T4 is thin by construction — the finding is the *relocation*, not the content.
  A pass over the courses would be needed for real onboarding language.
- **`trust.dropbox.com` not harvested.** The authoritative compliance artefacts
  (SOC reports, sub-processor lists, DPAs, GDPR detail) sit behind that link, so
  T10 reflects the marketing-layer compliance narrative, not the primary documents.
  Likewise `/ai-principles`, `/privacy`, `/terms`, and `/security/gdpr`.
- **Admin-console copy is entirely unobserved.** Tiered admin roles, audit logs,
  device approvals, data classification, external content reporting, and the
  `Data Governance Add-On` are known only from pricing rows and marketing bullets.
  For a product whose benchmark strength is permission language, the admin half of
  that language is the largest single gap.
- **macOS and Linux sync icons not harvested** — only the Windows article, which
  covers two engines. The macOS set may differ, and Dropbox maintains separate
  articles per platform.
- **Incident-communication sample is one incident.** The status page's 90-day
  window contained a single resolved incident with two updates. No major-outage,
  partial-outage, or maintenance copy was observable, so the four-level severity
  ladder's *language* (as opposed to its labels) is unevidenced.
- **Localisation not assessed.** 23 locale options are offered; only `en-US` was
  harvested. `en-GB` and `en-AU` demonstrably fall back to US English, which is
  itself a finding, but no non-English variant was checked.
- **`Community answers` content is user-generated** and reproduced by Dropbox
  beneath its own documentation. Thread titles are quoted as evidence of the IA
  pattern; the threads themselves were not opened and are not treated as Dropbox's
  voice.
- **Customer testimonial** (Bryan Chandler, TSCG) is reproduced by Dropbox; it is
  referenced, not quoted at length.
- **No published design system, content style guide, or voice documentation
  found.** Given the consistency of the sync-state sentence frame and the
  inconsistency of everything crossing a surface boundary, a style guide may exist
  for in-product strings only. T14 is reconstructed from observed copy.

## Sources

1. https://www.dropbox.com/
2. https://www.dropbox.com/plans
3. https://www.dropbox.com/features/security
4. https://help.dropbox.com/
5. https://help.dropbox.com/sync
6. https://help.dropbox.com/sync/sync-icons-windows
7. https://help.dropbox.com/share
8. https://help.dropbox.com/share/set-file-folder-permissions
9. https://help.dropbox.com/share/set-link-permissions
10. https://help.dropbox.com/share/sharing-error
11. https://status.dropbox.com/
