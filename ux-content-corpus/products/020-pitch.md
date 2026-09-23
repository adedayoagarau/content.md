# 020. Pitch

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Collaborative presentation / deck workspace |
| Primary URL | https://pitch.com/ |
| Corpus rank | 020 |
| Benchmark strength (source list) | Presentation onboarding and collaboration |
| Locale / market observed | en (single locale; help centre served at `/en/` with no alternatives) |
| Platform observed | Web (Framer marketing site), Intercom help centre, Hyperping status page, one legacy-template page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR/DPA published, German entity (`Pitch Software GmbH`), AWS hosting in European regions, AES-256 at rest, TLS + HSTS preload, four-level internal data classification, `security@pitch.com` with published PGP fingerprint. **No SOC 2, ISO 27001, or any third-party certification claim anywhere.** **No accessibility statement, VPAT, or WCAG commitment anywhere.** |
| Harvest date | 2026-09-21 |
| Pages inspected | 23 |
| Harvest completeness | Full for public surfaces — every requested page type reached, all HTTP 200, no blocks. In-app strings behind login are `[absent]` as expected. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://pitch.com/ | Framer build; hero, 4 pillars, 3-step `HOW TO`, toolkit, solutions tabs, templates, FAQ, footer. **Content triplicated in DOM** |
| Pricing | https://pitch.com/pricing | Five tiers, seat slider, full comparison matrix, same FAQ block under a different header |
| Security Policy | https://pitch.com/security-policy | **Legacy non-Framer template** — renders a richer nav with dropdown descriptions the Framer pages have lost |
| Help centre index | https://help.pitch.com/en/ | Intercom; 7 collections with scope lines and author/article counts |
| HC: Create with Pitch Agent | …/collections/19716036-create-with-pitch-agent | 5 articles, flat |
| HC: Get started with Pitch | …/collections/2055837-get-started-with-pitch | 6 sub-collections, 50 articles |
| HC: Become a Pitch power user | …/collections/2056202-become-a-pitch-power-user | 4 sub-collections, 35 articles |
| HC: Explore Premium features | …/collections/2595025-explore-premium-features | 10 articles, flat |
| HC: Solve a problem | …/collections/2056184-solve-a-problem | 2 sub-collections, 11 articles |
| HC: Learn about billing and pricing | …/collections/6939692-learn-about-billing-and-pricing | 5 articles, flat |
| HC: Contact Us | …/collections/2135343-contact-us | 2 sub-collections, 4 articles |
| Article: Getting started with Pitch | …/articles/8038180-getting-started-with-pitch | **Opens with a glossary** — richest terminology source |
| Article: Pitch Agent | …/articles/14981091-pitch-agent | Agent overview, AI billing, opt-out |
| Article: Create a new presentation | …/articles/14844265-create-a-new-presentation | AI generation flow and prompt guidance |
| Article: Set a status and assignees for a slide | …/articles/4318642-set-a-status-and-assignees-for-a-slide | Slide status values |
| Article: View and subscribe to in-app notifications | …/articles/5108435-view-and-subscribe-to-in-app-notifications | Notification triggers and states |
| Article: Where is my presentation? | …/articles/7067950-where-is-my-presentation | **Best access-denied copy in the file** |
| Article: First steps to solve a problem with Pitch | …/articles/3695462-first-steps-to-solve-a-problem-with-pitch | Generic troubleshooting ladder |
| Article: Troubleshooting common export errors | …/articles/8534586-troubleshooting-common-export-errors | Export failure, support hours |
| Article: Contact us | …/articles/3695568-contact-us | Support hours, triage |
| Article: Learn about our paid plans | …/articles/9364636-learn-about-our-paid-plans | **Heaviest defect concentration on the site** |
| Article: Guide to AI credits | …/articles/12755590-guide-to-ai-credits | Credit pricing, budgets |
| Status | https://status.pitch.com/ | Hyperping; 7 components |

---

## Product status finding

**Pitch is alive, actively shipping, and has repositioned toward AI.** The brief
flagged a possible sunset; that is not what is there. No wind-down notice, no
acquisition banner, no parked domain, no login wall. Evidence:

- Footer reads `©2026 Pitch Software GmbH. All rights reserved.`
- Help-centre articles carry 2026 authorship dates (`April 27, 2026`, `May 26, 2026`, `August 11, 2026`)
- A brand-new help collection exists for agentic work — `Create with Pitch Agent`, scope line `Make decks with our agent, connect Claude via our MCP, or build your own workflows with our API`
- Status page: `All systems operational`, seven components, `No recent notice`
- Five purchasable tiers with a live seat slider

**The pivot artefact worth recording** `[observed]`: the home page's own
`<title>` and `og:title` read `The AI presentation workspace`, while the
`meta-description` on the same page still reads "Pitch is the collaborative
presentation platform for teams that want to create, share, and deliver better
work." **A page whose title and description disagree about what the product
is.** Repositioning caught mid-flight in the metadata — the same class of
finding as Figma's `project`→`folder` rename, but undisclosed rather than
announced.

What *is* visibly degraded is not the product but the **content operations**.
This file records an unusually high defect density (T14), and the pattern is
consistent with a small team shipping fast against an AI reframe while the help
centre and pricing copy drift apart. That is the honest finding.

---

## T1 Navigation & IA labels

**Global nav — six items** `[observed]`

`Product` · `Use Cases` · `Templates` · `Resources` · `Pricing`, plus
`Log in` and `Sign up`.

**The first three are not section indexes — they are links to a child page.**
`Product` lands on `/whats-new`, `Use Cases` lands on `/teams`, `Resources`
lands on `/blog`. A user clicking `Product` expecting an overview gets a
changelog.

**A richer nav survives on one legacy page** `[observed]`. `/security-policy`
renders a non-Framer template whose nav still has full dropdowns *with
description lines*:

| Dropdown head | Description (verbatim) |
|---|---|
| `What's new` | "Discover new features and the latest updates" |
| `Customer stories` | "See how teams are winning with Pitch" |
| `Presentation Templates` | "Get 100+ customizable, expert-made designs" |
| `Blog` | "Discover updates, best practices, and more" |

Plus grouped children the Framer nav has lost: under `Use Cases`, a `Teams`
group (`Agencies` · `Sales` · `Success` · `Marketing` · `Designers`) and a
`Decks` group (`Presentation maker` · `Pitch decks` · `Sales decks` ·
`Team meetings` · `Board decks`); under `Resources`, a `Learn` group
(`Customer stories` · `Agentic workflows` · `Help center`).

**A site migration that dropped navigation content**, with the old version still
publicly reachable on one page. The `Decks` grouping is the interesting loss —
it organised the product by *deck genre* (pitch deck, sales deck, board deck),
which is the Canva artefact-first pattern and the right one for this category.
Recorded as a regression.

**Footer — four groupings** `[observed]`: `Product` · `Templates` · `Legal` ·
`Company`, with the tagline `A complete presentation workspace`.

`Product` carries **four competitor-comparison pages** as first-class footer
links — `Pitch vs PowerPoint` · `Pitch vs Keynote` · `Pitch vs Google Slides` ·
`Pitch vs Figma Slides` — alongside `Academy`, `Help center`, `Download`, and
`Status`. Naming four named competitors in the footer is a market-position
statement: Pitch expects every visitor to be switching from something.

`Legal` is a nine-item group (`Terms of Use` · `Privacy Policy` ·
`Legal Notice` · `DPA` · `DMCA Policy` · `ERDF Support` · `GDPR` ·
`Security Policy` · `Cookie Settings`), notable for what it does **not**
contain: no accessibility statement (T14).

**Help centre — seven collections, each with a scope line** `[observed]`

| Collection | Scope line (verbatim) |
|---|---|
| `Create with Pitch Agent` | "Make decks with our agent, connect Claude via our MCP, or build your own workflows with our API" |
| `Get started with Pitch` | "Manage your account and workspace, create presentations, and collaborate with others." |
| `Become a Pitch power user` | "Learn how to create templates and styles, connect data, and speed up your workflow." |
| `Explore Premium features` | "Ready to go premium or not sure yet? Find out more information about what's available on our paid plans" |
| `Solve a problem` | "Something isn't working? Seeing an error message? Find out more." |
| `Learn about billing and pricing` | "Got questions about our pricing plans or how billing works?" |
| `Contact Us ` | "Didn't find what you were looking for? Get in touch with the Pitch team." |

**This is the best-named help IA in the batch, and the reason is that four of
seven are named after the user's *state of mind*, not the system's objects:**

- `Get started with Pitch` — I am new
- `Become a Pitch power user` — I am competent and want more
- `Explore Premium features` — I am evaluating whether to pay
- `Solve a problem` — something is broken

That is a **proficiency-and-intent ladder**, and it lets a user self-route
before they know any product vocabulary. Compare Canva's ten object-domains,
Figma's purpose split, and Miro's six mixed categories. Pitch's is the only one
of the four where the category names describe *who you are right now*.

Three of the seven scope lines are **questions**, and they are questions in the
user's voice: "Something isn't working? Seeing an error message?",
"Ready to go premium or not sure yet?", "Got questions about our pricing plans
or how billing works?", "Didn't find what you were looking for?". The
`Solve a problem` line is a compound question — two symptoms, so a user
recognises either.

`Explore Premium features` earns particular note: **"Ready to go premium or not
sure yet?"** explicitly addresses the undecided reader. A commercial category
that concedes you might not buy.

**Defect:** `Contact Us ` carries a **trailing space** in the category name,
visible in the page title as a double space
(`Contact Us  | Pitch | Help Center`). And the parent collection is
`Contact Us` (Title Case) while its child article is `Contact us`
(sentence case) — case drift between a parent and its own child.

**Sub-collections mix casing within one collection** `[observed]`.
`Get started with Pitch` contains `Pitch 101`, `Add and edit slides`,
`Manage your account` (sentence case) beside `Manage Your Workspace`,
`Collaborate With Others` (Title Case). `Become a Pitch power user` is entirely
Title Case (`Create Templates and Styles`, `Connect and Display Data`,
`Present and Share your Ideas`, `Speed up Your Workflow`) — and even there,
`Present and Share your Ideas` capitalises three words of four. Two conventions,
no rule.

**Help chrome** `[observed]`: `Advice and answers from the Pitch team` (h1),
`Search for articles...`, `All Collections` (breadcrumb root),
`Back to Pitch.com`, `Skip to main content`. Collections carry an author/count
meta line rendered unspaced: `By Mari and 1 other2 authors50 articles`.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `Create slides that win.`
> "From prompt to presentation, 4M+ teams create and deliver winning slides together in Pitch."

Four words, a full stop, and a verb of outcome. `win` is the whole positioning:
Pitch does not claim to make slides *easier* (Canva), *better designed*
(Figma), or *more collaborative* (Miro) — it claims they will **win**. The
subhead then compresses the entire product arc into four words —
**`From prompt to presentation`** — naming the new AI entry point and the
familiar output in one preposition phrase.

Note the punctuation: a full stop where a weaker writer would use an
exclamation. The register is confident rather than excited, and it holds across
the page.

**Section headers are eyebrow + H2 + deck, consistently** `[observed]`

| Eyebrow | H2 |
|---|---|
| `WHY PITCH` | `Pitch is your presentation workspace` |
| `THE PAYOFF` | *(deck only — see defect)* |
| `HOW TO` | `From first draft to closed deal, and beyond` |
| `TOOLKIT` | `A complete presentation toolkit` |
| `solutions` | `Pitch is for people who mean business` |
| `FAQS` | `Not just another slide tool` (home) / `Any questions?` (pricing) |

`From first draft to closed deal, and beyond` is the strongest header on the
site: it names the **span of the workflow in the customer's own commercial
terms**, and `and beyond` claims the post-sale relationship. `Pitch is for
people who mean business` is a pun carrying a segmentation claim.

`Not just another slide tool` as an FAQ header is a defensive framing — it
answers the objection the FAQ block exists to answer, which is a legitimate use
of a section header. **But the identical FAQ block appears on the pricing page
under `Any questions?`** — same four questions, same answers, two headers. One
is doing rhetorical work and one is generic furniture; shipping both is a
decision no one made.

`solutions` is **lowercase** where the other five eyebrows are uppercase.

**Four value pillars, each an imperative** `[observed]`:
`Make stunning slides` · `Pitch like a pro` · `Showcase your brand` ·
`Stay in control`. Verb-first, three words each, covering craft → delivery →
brand → governance.

**Defect: two variants of each pillar's body copy ship on the same page**
`[observed]`. `Make stunning slides` appears both as "Use Pitch's powerful
editor to stand out with sleek slides enhanced by high-res video, animations,
and custom fonts." and as "Design convincing slides in Pitch's powerful editor,
with high-res video, animations, and custom fonts, so you always stand out from
the crowd." Same for `Pitch like a pro` ("track visitor engagement" vs
"track every open") and `Stay in control` ("a single cloud-based workspace" vs
"one, cloud-based workspace"). An A/B test or an unresolved copy edit, both
variants live in the DOM.

**Stat band — three figures with caption sentences** `[observed]`:
`4M+` "Professional teams choose Pitch to build, deliver, and win." ·
`150+` "Templates designed by experts to get you started." ·
`5H+` "On average, users save over 5 hours every week."

The third is bounded correctly — **"On average"** is stated, not implied. The
first two are not sourced. And all three ship as animated odometers whose
accessible text is a digit soup (T14).

**Three near-identical taglines in circulation** `[observed]`:
footer `A complete presentation workspace` · TOOLKIT header
`A complete presentation toolkit` · WHY PITCH header
`Pitch is your presentation workspace`. One head noun swapped between two of
them, on one page.

## T3 CTA inventory

| CTA (verbatim) | Context | Destination / note |
|---|---|---|
| `Sign up` | Nav; footer | **Nav → `app.pitch.com/?signup`; footer → `auth.pitch.com/login?…`** — two entry points, one label |
| `Sign up for free` | Home hero; solutions section | |
| `Start creating` | End of TOOLKIT | |
| `Get started` | Pricing, FREE card | **Fourth signup label** |
| `Log in` | Nav; footer | Also two different hosts |
| `Get a demo` | Home hero; solutions section | → `/demo` |
| `Contact us` | Pricing, ENTERPRISE card | → `mailto:success@pitch.com` |
| `Choose Plus` / `Choose Team` / `Choose Business` | Pricing cards | Verb + tier name |
| `Browse templates` | Home templates section (×2) | |
| `See customer stories` | Home and pricing carousels | Repeats **6×** on pricing |
| `Explore workflows` | Home integrations strip | |
| `Partner logo` | Home integrations strip | **A visible link whose label is the asset's filename** |
| `contact support` | Pricing FAQ answer | → `mailto:support@pitch.com` |
| `Back to Pitch.com` | Help centre footer | |
| `Skip to main content` | Help centre only | **Absent from every marketing page** |
| `Get updates` / `Show history` / `Go to Pitch` / `Switch to dark mode` | Status page | |
| `Cookie Settings` | Footer, every page | → `#cookie-settings` — **anchor with no target** |

**`Choose <Tier>` is the good pattern here.** `Choose Plus` / `Choose Team` /
`Choose Business` name the commercial act and the thing being chosen, and they
make the pricing cards parallel — except the Free card, which breaks rank with
`Get started`. Four cards, three following a pattern.

**Four labels for signup** (`Sign up`, `Sign up for free`, `Start creating`,
`Get started`) and — worse — **two different auth hosts behind one label**.
The footer `Sign up` points at a fully-expanded `auth.pitch.com/login?…` URL
with a **PKCE challenge and nonce baked into the static HTML**, i.e. a stale
one-time auth URL hardcoded into every page.

**Two contact routes with two addresses and two labels**: `Get a demo` (a page)
for sales, `Contact us` (a mailto to `success@pitch.com`) for enterprise,
`contact support` (a mailto to `support@pitch.com`) for support. Defensible
routing, inconsistent presentation — one is a page, two are mailtos, and the
mailto labels give no signal that they will open a mail client.

**`Partner logo`** is a live, clickable link on the home page whose visible
text is an asset name. A placeholder shipped to production.

**On `Learn more`:** the marketing site has **none** — a genuine strength, and
better than Miro (10+), Loom (3) and Canva (3). But the help centre ships
`Learn more about advanced links.` and `Learn more about external guests.` as
**plain unlinked text, twice each**, inside `Learn about our paid plans`. The
correct specific phrasing, with no destination at all — the bare-`Learn more`
defect in its worst form.

## T4 Onboarding & getting-started

*The flagged benchmark strength.*

**A three-step `HOW TO` with zero-padded parenthetical counters** `[observed]`

| Counter | Step | Sub-headline | Body (summarised) |
|---|---|---|---|
| `(01)` | `Create` | `Intuitive slide creation` | Blank canvas, template, or AI generation on-brand in seconds; "Keep full design control over every detail" |
| `(02)` | `Collaborate` | `Remove team bottlenecks` | Live co-editing, slide assignments, comments; "The best presentations are made together. But they don't have to take weeks." |
| `(03)` | `Deliver` | `Present unforgettable slides` | Interactive embeds, animations, live links, custom deal rooms, then engagement tracking "so you know when and how to follow up" |

Three decisions worth taking. The **step names are the three verbs of the
workflow** (`Create` · `Collaborate` · `Deliver`) and each is paired with a
sub-headline that states *the problem it solves* rather than the feature —
`Remove team bottlenecks` is a pain, not a capability. Second, step 2 leads
with a concession before the claim: "The best presentations are made together.
But they don't have to take weeks." It names the cost of collaboration before
selling collaboration. Third, step 3 **does not end at the presentation** — it
ends at follow-up, so the onboarding narrative reaches past the product's
nominal boundary into the user's actual goal (the deal).

Progress language is `(01)` `(02)` `(03)` — zero-padded, parenthesised, no
"Step 1 of 3". Typographic rather than verbal, which reads as confident and
costs nothing in translation.

**The help centre's getting-started article opens with a glossary, and says so**
`[observed]`. First section header: **`First, some terms!`**

Then the sections in order: `What is the dashboard?` · `Recent activity` ·
`Access your Library` · `Where is all my stuff?` · `Create a presentation`.

**`Where is all my stuff?`** as a section header in the official
getting-started article is the single most quotable string in this file. It is
colloquial, slightly undignified, and it is exactly the question a new user
has after five minutes in any workspace product. Pitch put it in a heading
rather than filing it under "Navigating the file browser". Same family as Wise's
`Where is my money?` — and note that Pitch also ships
`Where is my presentation?` as a troubleshooting title (T7), so the
**"where is my thing" question is answered twice, at two different levels of
panic**.

Orientation copy is short and reassuring: `This is your starting point in
Pitch.` · "Find the content you've been working on and pick back up where you
left off."

**Teaching the vocabulary before the interface** is the structural choice.
`First, some terms!` defines `Pitch account`, `Workspace`, `Teamspace`,
`Folders`, and `Presentation` before the dashboard tour begins — the same
instinct as Miro putting `Roles in Miro` in `Start here`, but applied to nouns
rather than permissions. For a product with a four-level container hierarchy,
naming the containers first is correct.

**Three creation entry points, named as a set** `[observed]`:
`start with a template`, `start with AI`, or `import an existing PowerPoint
file`. The third is a **switching path offered as a first-run option** — the
same instinct as Miro's per-competitor import articles.

**AI generation onboarding** `[observed]`
(`Create a new presentation`): choose `Create withAI` *(sic — missing space)* →
prompt box → attach files → choose speed → save prompt → pick template →
`Generate`. Then `Pitch Agent will then begin generating your deck`.

The prompt guidance is the useful artefact:

> "For the best results, include information about your audience, tone of voice, objectives, key deliverables, etc. Be as clear and specific as possible."

**Five named variables for what makes a prompt good** — audience, tone,
objectives, deliverables — rather than "be specific". A novice prompting an
agent does not know what to supply; this tells them. Supported context is
enumerated as `PDF, MD, TXT, and CSV files`, and the output side is disclosed:
"Pitch agent will create Slide styles to accompany your deck" — the agent makes
reusable styles, not just slides.

**The agent's opt-out is documented** `[observed]`, and the section header is in
the user's voice: **`Don't want AI?`** → `Workspace settings` → AI section →
`Disable AI.` Four words for the question, three steps for the answer. A product
in the middle of an AI reframe that still ships a plainly-labelled off switch
is worth recording positively. Adjacent sections: `Create a new presentation
with Pitch Agent` · `Use Pitch Agent on your slides` · `AI billing`.

Article opens with `We're excited to deliver Pitch Agent to help you create and
edit your decks.` — company-excitement framing, the weakest sentence in an
otherwise well-structured article.

## T5 Form & field labels

Thin — no signup, login, or profile fields are publicly exposed. `[absent]` for
authentication and account forms.

**Pricing controls** `[observed]`
- `How many seats do you need?` — **a question as the control label** for the seat slider, second person, present tense
- Slider renders as `1Seat` and `1 Seat` adjacent to each other, with a bound label `1200+` (almost certainly `1`–`200+` with the separator lost)
- Billing toggle: `Pay yearly` with badge `17% saving`, and `Pay monthly`

`Pay yearly` / `Pay monthly` uses an **imperative verb** where Canva, Miro and
Loom all use adjectives (`Yearly`, `Monthly`, `Annually`). Telling the user what
to do rather than naming a period is a small, slightly pushier choice.

**In-app control names, quoted inside help articles** `[documented]`:
`Set slide status` · `Assign Slide` · `Subscribe` · `Mark as read` ·
`Dismiss notifications` · `Options` · `Settings` · `Notifications` ·
`Account settings` · `Workspace settings` · `Slide style` ·
`Browse all actions` · `Check for updates` · `Send us a message` ·
`Manage library` · `Home` · `Recents` · `By me` / `By everyone`.

Folder sort options: `Updated` · `Created` · `Title`.
Custom-font accepted formats stated as `.otf or .ttf file`.
Pitch-room toggle quoted verbatim in help: `"Allow visitors to download a PDF"`.

**Help centre search placeholder**: `Search for articles...`

**Casing defect inside one control family**: `Set slide status` (sentence case)
beside `Assign Slide` (Title Case), documented in the same paragraph of the same
article.

## T6 Status & state language

**Slide status — three values, and the vocabulary is borrowed from task
management** `[observed]`:

> `To do` · `In progress` · `Done`

Set from the **`bubble bar`** — "From the bubble bar, you can assign slides to
team members, set slide statuses, and add emoji reactions." Keyboard shortcuts
are documented: `A` to assign, `cmd + !` for status.

This is the flagged collaboration strength in its clearest form. Pitch models a
**deck as a board of work items**: each slide has an owner and a state, and the
states are the three any team already knows. No coined vocabulary, no
product-specific ladder — `To do` / `In progress` / `Done` is immediately
legible to anyone who has used a kanban tool, which is the whole point when the
users are a mixed team of designers, sellers and founders.

The knock-on is that **subscription semantics are defined in terms of the
status**: "When you're subscribed to a presentation, you will receive an in-app
notification about all comments and slides marked as Done." `Done` is not just a
label; it is a notification trigger. A state that fires an event is a state
people will actually set.

Adjacent slide states: `Skip a slide`, `Recover a deleted slide`.

**Version states** `[observed]`, with the plan gradient visible on the pricing
matrix: `Version history` takes values `–` · `–` · `30 days` · `Unlimited`
across the four purchasable tiers. Help expands it:

> "Access and review previous versions of your slides from the last 30 days, and restore previous slide versions or deleted slides if needed."

and for the top tier, "view and restore all versions of your previous slides
beyond 30 days". Article title: `Recover an earlier version of your slide` —
**singular `slide`**, not "presentation", which matches the slide-level
granularity of the whole model.

**Collaboration and role states** `[observed]`:
`Live co-editing` · `Co-presenting` · `Follow collaborators` ·
`Member & guest analytics`; roles rendered in the matrix as
`Admin only` / `Admin, creator, commenter`; plus `Commenters`, `Guests`,
`Member limit`. Workspace containers: `guest workspace`, `teamspaces`,
`Private` space, `Shared with me`.

**Sharing states** `[observed]`, a twelve-value ladder in the pricing matrix:
`Basic sharing links` · `Advanced links` · `Pitch room links` ·
`Presentation embeds` (`Branded` / `Unbranded`) · `PDF exports`
(`Branded` / `Unbranded`) · `PowerPoint exports` (`–` / `Unbranded`) ·
`Custom domain` · `PDF downloads for visitors` · `Email capture` ·
`Visit notifications` · `Passcode-protected links` ·
`Data privacy controls` · `Engagement analytics`.

**`Branded` / `Unbranded` as matrix values** is the notable one — the watermark
is the paid/free distinction, and the matrix names the *state of the artefact*
rather than saying "remove Pitch branding". A user reads what their exported PDF
will look like.

**Notification states** `[observed]`: `unread` (red badge on the bell, blue
badge per item) · `Mark as read` · `Dismiss` · `Subscribed` · `Inbox` ·
auto-subscribe.

**Sync state** `[observed]`: `My changes are not syncing` — and the same article
is linked elsewhere as `My changes aren't syncing`. One state, two titles (T14).

**Status page — seven components, two of which carry a description line**
`[observed]`:

| Component | Description |
|---|---|
| `Web app` | `https://app.pitch.com` |
| `Backend` | `The Pitch backend` |
| `Desktop applications` | `Pitch desktop applications available at https://pitch.com/download` |
| `Mobile applications` | *(none)* |
| `AI services` | *(none)* |
| `Image serving` | *(none)* |
| `PDF exports` | *(none)* |

Roll-up `All systems operational`; incident feed `No recent notice`.

The grain is mixed: `Web app`, `Desktop applications` and `Mobile applications`
are **platforms**, `Backend` is an **architecture layer** (with the
gloriously uninformative description "The Pitch backend"), and `AI services`,
`Image serving` and `PDF exports` are **capabilities**. A user whose export is
failing finds `PDF exports`, which is right; a user whose deck will not open has
to guess between `Web app` and `Backend`. Compare Canva's seven gerund-named
`Designs` components, which is the model.

**`PDF exports` as a top-level status component** is the tell about where this
product breaks — and it matches the existence of a dedicated troubleshooting
article for the same thing (T7).

Only one severity value (`Operational`) was observable because everything was
green. Degraded and outage vocabulary is `[absent]`.

## T7 Error, failure & recovery

**`Where is my presentation?` is the best access-denied article in this batch**
`[observed]`. It is structured as a **diagnostic ladder of questions**, and
every heading is in the second person:

1. `Make sure to use the correct account and workspace`
2. `Are you logged into the correct account?`
3. `Are you in the correct workspace?`
4. `Is the deck in someone else's private folder?`
5. `Link doesn't work?`
6. `The presentation is no longer shared with you`
7. `The presentation has been deleted or moved out of the workspace`
8. `The link is outdated or incomplete`
9. `Search for a presentation`
10. `Other ways to locate a presentation`

The ordering is the design: **three questions about the user's own state**
(account, workspace, someone else's folder) **before three statements about the
system's state** (unshared, deleted, stale link). It exhausts the cheap,
embarrassing, user-side causes first — which is both the likelier diagnosis and
the one the user can fix alone — before telling them someone revoked their
access.

Three strings from it deserve recording:

- **"you could try politely asking for access again"** — the recovery action for a revoked share is a *social* action, and the copy says `politely`. Where Figma ships `Ask to edit` as a button and Miro ships `Request Access`, Pitch has no such affordance and tells the user to go and ask a human. An honest admission of a missing feature, phrased without embarrassment.
- **"Currently, there is no way to switch between user accounts — you will need to log out and log in."** — `Currently` marks it as a known gap, and the workaround is given in the same sentence. Documenting the absence of account switching, in the article where it bites.
- **"Note: Search always works only for the workspace you're in."** — the scope limit on the tool the user is about to reach for, stated before they reach for it.

Terminal fallback: `If you still can't find your presentation, reach out to us!`

**Troubleshooting IA — eleven articles in two sub-collections** `[observed]`

`General Troubleshooting`: `Visit the Pitch status page` ·
`Where is my presentation?` · `First steps to solve a problem with Pitch` ·
`My changes are not syncing` · `Send us error logs` ·
`Troubleshooting service providers blocking Pitch`

`Issues with Features`: `Troubleshooting tips for recordings` ·
`Troubleshooting tips for Google Sheets and Google Analytics` ·
`I can't access the color dropper` · `I'm having issues uploading custom fonts` ·
`Troubleshooting common export errors`

**`Visit the Pitch status page` is the first article in the troubleshooting
collection.** Before any product-specific diagnosis, the help centre tells the
user to check whether the problem is Pitch's. That is the correct first step and
almost no help centre makes it the first item.

**First-person complaint titles, used precisely where they belong** `[observed]`:
`I can't access the color dropper` · `I'm having issues uploading custom fonts` ·
`My changes are not syncing` · `Where is my presentation?`

All four are in `Solve a problem` and **nowhere else** in the ~120-article
corpus. The first-person voice is reserved for the collection where the user is
stuck — the same discipline Loom shows and Figma deliberately declines. And
`I can't access the color dropper` names a tool so specific that the article
exists because of measurable search volume.

**Failure-copy register** `[observed]`, and it is notably warm:
`Something isn't working? Seeing an error message? Find out more.` ·
`If something isn't working, try our basic troubleshooting steps.` ·
`Let's start troubleshooting` (section header) ·
`Still experiencing issues?` · `Experiencing an error?` ·
`Find out how to correct failed exports` ·
`💡 A fresh start is always a good idea!`

`Let's start troubleshooting` is first-person-plural — the company sits down
beside the user. `A fresh start is always a good idea!` is the reframe for
"clear your cache and reload", turning a tedious instruction into permission.

**Failure modes described honestly** `[observed]`:
"the loading indicator might continue spinning without the document saving" —
a **stuck-spinner** failure described in prose, so a user who is watching one
knows it is a known state rather than slowness. And
"The error that you see may ask you to contact support."

**Support constraints stated as part of the error path** `[observed]`:
- "We're usually available Monday to Friday from 9 a.m. to 11 p.m. CET." (and again, differently worded, in `Contact us`: "The Pitch support team is available Monday through Friday, 9 a.m. to 11 p.m. CET.")
- **"Please note: This is not a live chat, and our typical response time is a few hours."**
- "You may not see the messenger in our web app if you're using an ad blocker."

The second is the valuable one. A messenger widget *looks* like live chat, and
users form an expectation from its appearance. Pitch names the expectation and
corrects it, with a number attached. The third pre-empts "the support button is
missing" — a support failure caused by the user's own browser extension,
diagnosed in advance.

**Defect:** the same support hours are stated in two different formats on two
pages (`Monday to Friday from 9 a.m. to 11 p.m. CET` vs
`Monday through Friday, 9 a.m. to 11 p.m. CET`).

## T8 Empty states

**Genuinely thin, and honestly so.** Real empty states live behind
`app.pitch.com`. `[absent]` for no-data, no-results, and caught-up copy.

**One true empty state captured** `[observed]`: `No recent notice` — the status
page's incident feed. Two words, no punctuation. Note it is *not* "No incidents
reported" (Loom, Figma, Canva all use Statuspage's wording); Hyperping's phrasing
is vaguer, and `notice` is an odd noun for the absence of an incident.

**Search-failure fallbacks, placed as IA rather than as strings** `[observed]`:
`Didn't find what you were looking for? Get in touch with the Pitch team.` —
the `Contact Us` collection's scope line, which functions as the help centre's
empty state for a failed search. And
`If you still can't find your presentation, reach out to us!` as the terminal
rung of the lost-content ladder.

**Loading and generating states are described, not shown** `[documented]`:
`Pitch Agent will then begin generating your deck`, with a referenced screenshot
named `generating.png`. Plus the stuck-loading failure quoted in T7.

**Two rendering failures that read as empty states** `[observed]`, both
recorded as defects:

- The pricing comparison matrix uses a **bare en-dash `–`** as its "not included" value, with no text alternative. `Commenters` renders as `––`. Compare Miro's explicit `Not included` and Canva's `Unavailable`; a dash cannot be distinguished from a rendering failure, and conveys nothing to a screen reader.
- The home-page customer-logo carousel emits **fourteen consecutive bare hyphens** where logo images did not resolve. A visible row of `-` characters shipped to production.

## T9 Notifications & system messages

**Six notification triggers, enumerated as a list of what *another person* did**
`[observed]`:

> `Assigns you a slide` · `Mentions you in a comment` · `Replies to your comment` · `Resolves your comment` · `Invites you to a workspace` · `Invites you to a presentation`

Every trigger is a **third-person verb with `you` as the object**. The list reads
as six things a colleague can do *to* you, which is exactly the right frame for a
collaboration product — the user learns that notifications are social events,
not system events. Compare a typical "Comments, Mentions, Invitations" noun list.

`Resolves your comment` is the one most products omit, and it is the one that
closes a loop.

**Subscription semantics defined against slide status** `[observed]`:
"When you're subscribed to a presentation, you will receive an in-app
notification about all comments and slides marked as Done." The `Done` state
(T6) is a notification trigger, so the two systems are wired together and the
copy says so.

**Section structure** `[observed]`: `Types of notifications` ·
`Notification center` · `Notification settings` · `Subscribe to a presentation` ·
`Manage your presentation subscriptions` · `Desktop app notifications` ·
`Mobile app notifications`. Subtitle: "Get notified about relevant changes
across your workspaces in one place."

**Item actions**: `Mark as read:` · `Dismiss notifications:` · `Options`.
Mobile gestures documented in plain instructions: "Swipe right over the
notification to mark it as read." / "Swipe left over the notification to dismiss
it." Landing: "You will land in your `Inbox`. Here you'll find all notifications
that directly concern you."

**Channel integration copy** `[observed]`:
- `Slack`: "You can integrate Pitch with Slack here to centralize your notifications"
- `Link visits`: "If you have enabled email capture for advanced links you can also choose to enable email notifications each time someone provides an email address." — a **conditional feature** whose precondition is stated in the same sentence

**Default disclosed, with the off switch located** `[observed]`:
`💡 Desktop notifications are enabled by default and can be turned off in the
operation system settings of your device.` *(sic — `operation` for `operating`)*.
Telling the user that the control lives **outside your product** is the useful
part; most products let the user hunt.

**Voice slip worth recording** `[observed]`: `if you're an inbox 0 kind of
person` — an aside in the notification-management article, characteristic of
Pitch's chattier help register (T14).

**Cookie-consent banner copy** `[absent]` — script-injected and not rendered;
the only trace is the dead `Cookie Settings` anchor.

## T10 Disclosures, legal & compliance

**Five tiers, euro-denominated, seat-scaled** `[observed]`

| Card | Seats | Price | Qualifier | Positioning line |
|---|---|---|---|---|
| `FREE` | 1–5 | `€0` | `forever` | "For individuals who want sleek slides for personal projects" |
| `PLUS` | 1 | `€10` | `month(paying yearly)` | "For individuals building professional presentations" |
| `TEAM` | 1–25 | `€15` | `month(paying yearly)` | "For small teams creating presentations together" |
| `BUSINESS` | 1–200 | `€20` | `month(paying yearly)` | "For larger teams delivering winning presentations at scale" |
| `ENTERPRISE` | +30 | — | — | "For larger organizations with custom requirements" |

The positioning lines are a clean **audience ladder** — individuals-personal →
individuals-professional → small teams → larger teams → organisations — with the
distinguishing adjective doing the work each time. And `€0` carries the
qualifier **`forever`**, which is a real commitment rather than "free plan".

Cumulative framing: `Everything in Free, and:` / `Everything in Plus, and:` /
`Everything in Team, and:`. Billing toggle `Pay yearly` `17% saving`.

**Seat *ranges* rather than seat minimums** is the notable structure — `1-25`,
`1-200` — so the card tells you the tier's ceiling, not just its price. A team
of 30 can see immediately that `TEAM` will not hold them.

**AI credit disclosure** `[observed]`, and the Free-tier hint is the sharpest
string:

> Free: `100 AI credits` — "Try Pitch's AI to speed up slide creation. **This amount does not renew once used.**"
> Paid (identical on Plus, Team, Business): "Credits are used for AI actions that speed up slide creation. **They renew with your subscription and are shared across the whole team.**"

Two hints, differing in exactly the two dimensions that matter — **renewal** and
**pooling** — and stated as a contrast the reader can hold. "This amount does not
renew once used" is the honest way to describe a one-off trial allowance;
compare Canva's `Up to 20 uses` and Miro's `Limited trial`, neither of which
says whether it comes back.

Overage priced at `$0.004 per credit`, stated twice, with
**"You'll be charged only for the credits used."** and a budget control:
"you can set your workspace AI credits budget", or "choose to set an unlimited
budget". A **spend cap on AI as a first-class setting**, disclosed publicly —
the thing every finance team asks for and few products expose.

The credits article's own framing line: "we've kept things as transparent as the
ghosts haunting our Berlin office." A joke in a pricing disclosure, which is a
register choice (T14) and arguably an odd one where the surrounding numbers
contradict the pricing page (T14, defects).

**Seat and role rules** `[observed]`
- "You can have 1 to 25 members in your workspace." (Team) / "1 to 200" (Business)
- Enterprise: "Invite as many people as needed to your workspace, with a minimum of 30 seats."
- **"All roles are paid, except for commenters."** — one sentence that defines the entire billing model. The free role is named, and everything else is chargeable.
- Guest caps by tier: `2 external guests` / `5` / `25` / `Unlimited external guests`
- Storage: `10GB total` (Free) vs `10GB per member` (paid) — the **unit changes with the tier**, and the matrix says so rather than showing two numbers

`All roles are paid, except for commenters.` is the most efficient seat
disclosure in this batch. Compare Miro's three-tier `Visitors`/`Guests`/`Members`
explanation and Figma's four-sentence `Permissions vs. seats` boilerplate. Pitch
achieves the same clarity in eight words because its model is simpler — and
because it states the exception rather than enumerating the rule.

**Legacy-plan warning, as a callout** `[observed]`:

> `⚠️ The features below apply to current plans, and may not be available for workspaces on legacy subscriptions.`

A grandfathering disclosure at the top of the plan article, addressed to
existing customers rather than buyers — the same audience Figma's pricing
footnotes address and almost no one else does.

**Trial disclosed non-committally** `[observed]`, pricing FAQ:
`Free trials are available to some customers depending on their needs.` A
hedge, and an honest one — it concedes the trial is discretionary rather than
advertising one that may be refused.

**Security policy — thorough on substance, thin on assurance** `[observed]`,
`/security-policy`. Structure: Data Protection / GDPR / Data Security /
Encryption at Rest / Data Classification / Data Transport Security /
Application Security (Code Security, Authentication, Third-Party components) /
Infrastructure Security (Network Segmentation, Incident Monitoring, Google
Integrations) / Organizational Security (Security Incident Management, Asset
Management) / Operational Security (Backups, Risk Management) /
Security Vulnerability Disclosure.

Summarised claims: AWS infrastructure "hosted in European regions";
"AES-256 encryption for all data at rest"; all traffic over TLS with the domain
on the `HTST Preload list` *(sic — HSTS)*; Auth0 for authentication with Google
OAuth; Dependabot monitoring with remediation "from one day for critical
vulnerabilities to eight days for medium risk vulnerabilities"; Datadog and AWS
CloudTrail monitoring; daily database backups "retained for up to 30 days";
`security@pitch.com` with a published PGP fingerprint.

**The four-level data classification is published with its labels**
`[observed]`: `Public information` · `Internal information` ·
`Private information` · `Confidential information`, the last glossed as
"Customers' data and Pitch employees' information". Publishing your internal
classification scheme, and showing that customer data sits in the top tier, is a
real disclosure — most security pages assert care without showing the taxonomy.

**The remediation SLA is the standout**: "from one day for critical
vulnerabilities to eight days for medium risk vulnerabilities" — two named
severities with two named numbers, on a public page. Falsifiable.

**Notably absent**: no SOC 2, no ISO 27001, no third-party certification claim
of any kind, no trust portal. Every other product in this batch leads with
badges. Pitch publishes mechanism instead of attestation — more informative to a
reader who reads it, and much weaker in an enterprise procurement review. Worth
recording as a deliberate-looking trade-off.

**Entity and legal** `[observed]`: `Pitch Software GmbH`, German GmbH, ©2026.
Nine-item `Legal` footer group including `DPA`, `GDPR`, `DMCA Policy`, and
`ERDF Support` (an EU regional-development funding acknowledgement, which is a
compliance artefact specific to EU-funded companies and rarely seen in a
product footer).

Privacy-adjacent help titles: `Presentation analytics and privacy` ·
`Report a presentation` · matrix row `Data privacy controls`.

## T11 Help-centre architecture

**Platform:** Intercom, at `help.pitch.com/en/`. Two levels
(collection → sub-collection → article); three of seven collections are flat.
Bylines are **individual humans** — `Written by Mari`, `Written by Sofie` —
with dates. Two named authors for ~120 articles, which explains both the
consistent voice and the defect density.

**Tree:**

```
All Collections
├── Create with Pitch Agent            (flat, 5 listed / 7 claimed)
├── Get started with Pitch             (50 articles)
│   ├── Pitch 101
│   ├── Add and edit slides
│   ├── Manage your account
│   ├── Manage Your Workspace
│   ├── Collaborate With Others
│   └── Collaborate using the mobile app
├── Become a Pitch power user          (35 articles)
│   ├── Create Templates and Styles
│   ├── Connect and Display Data
│   ├── Present and Share your Ideas
│   └── Speed up Your Workflow
├── Explore Premium features           (flat, 10 articles)
├── Solve a problem                    (11 articles)
│   ├── General Troubleshooting
│   └── Issues with Features
├── Learn about billing and pricing    (flat, 5 listed / 7 claimed)
└── Contact Us                         (4 articles)
    ├── Contact & Feedback
    └── Privacy & Legal
```

**`Pitch 101` as the first sub-collection** is a deliberate novice signal, and
its six articles are the correct first six: `Create a Pitch account` ·
`Getting started with Pitch` · `Pitch Agent` · `Create a new presentation` ·
`Search for presentations` · `Zooming around the canvas`.

Note `Pitch Agent` at position three — **the AI agent is taught in the 101
course**, before "create a new presentation". The reframe reaches into the
onboarding sequence, not just the marketing.

**Article-title grammar — six shapes:**

| Shape | Share | Example |
|---|---|---|
| Bare imperative verb phrase | ~70% | `Add speaker notes`, `Create a template`, `Upload custom fonts`, `Align blocks`, `Delete a workspace` |
| `Troubleshooting …` gerund | failure | `Troubleshooting common export errors`, `Troubleshooting service providers blocking Pitch` |
| First-person complaint | `Solve a problem` only | `I can't access the color dropper`, `My changes are not syncing`, `Where is my presentation?` |
| User-voice question | scattered | `What is a guest workspace?`, `How many team members can join me at Pitch?`, `What's possible with Pitch and Claude?` |
| `Guide to X` / `Learn about X` / `Intro to X` | conceptual | `Guide to billing at Pitch`, `Guide to AI credits`, `Learn about our paid plans`, `Intro to our mobile apps` |
| Bare product noun | outlier | `Pitch Agent` |

The **conceptual-article prefix family** (`Guide to`, `Learn about`, `Intro to`,
`An overview of`) is the same convention Figma keeps as `Guide to X` and Miro
keeps as `Understand X` — but Pitch runs **four** variants of it where the other
two run one. The convention exists; the discipline does not.

`How many team members can join me at Pitch?` is the most user-voiced title in
the corpus — "join me" rather than "be added to my workspace".

**Full article inventory captured** (~115 titles across 15 listings) — the
richest per-product title harvest in this batch. Selected sets:

`Add and edit slides` (20): `Add and edit text blocks` · `Add your own images to
slides` · `Group blocks` · `Add and edit shapes and lines` ·
`Import a presentation` · `Create video recordings` · `Add slide numbers` ·
`Skip a slide` · `Link to slides` · `Recover a deleted slide` ·
`Work offline in Pitch` · `Delete a presentation` · `Guides, margins, and
layers` · `Upload images to your library` · `Add media from our integrations` ·
`Add and edit images with AI` · `Recolor SVGs in Pitch` ·
`Find and replace text` · `Edit images` · `Create color gradients`

`Present and Share your Ideas` (13): `Add speaker notes` ·
`Present using speaker view` · `Follow collaborators` · `Present your slides` ·
`Share an external link to your presentation` · `Export a presentation to PDF` ·
`Share live presentations in Notion` · `Add animations to a presentation` ·
`Export a presentation to Power Point` *(sic)* ·
`See all your team's links in one place` ·
`Invite guests to collaborate on presentations` ·
`Share pitch rooms with prospects or clients` ·
`Present your ideas with your teammates`

`Create with Pitch Agent` (5): `What's possible with Pitch and Claude?` ·
`Create presentations with Claude` ·
`Build presentations with variables and Claude` · `Use Pitch's API` ·
`Connect Claude with Pitch`

**Four of five articles in the agent collection name a third-party AI product in
the title.** Pitch documents interoperability with a competitor's assistant as
a first-class capability rather than burying it in an integrations page.

**Routing furniture** `[observed]`
- Feedback prompt: `Did this answer your question?` with three emoji reactions
- Reaction labels ship **two ways**: `Disappointed Reaction😞` / `Neutral Reaction😐` / `Smiley Reaction😃` on eight articles, and bare `😞` / `😐` / `😃` with **no accessible name at all** on three
- Breadcrumb: `All Collections` → collection → sub-collection → article
- Bylines `Written by Mari` / `Written by Sofie` plus date
- **Two competing related-content blocks render on the same page** — an author-curated `Related articles` heading *and* an auto-generated `Related Articles` block, both present on at least four articles
- In-page tables of contents render as **anchor links with no text** (`[](#h_9af560cee2)`) on every long article

**A three-point emoji reaction scale instead of Yes/No** is the distinctive
choice. `😞 / 😐 / 😃` gives a midpoint, which Yes/No does not, and the midpoint is
where "technically answered but I'm still stuck" lives. It also sidesteps the
Miro problem of softening the negative (`Not really`) — a frowning face is
unambiguous. The cost is that on three of eleven sampled articles the
accessible names are missing entirely, so the control is unusable by screen
reader.

## T12 FAQs

**One FAQ block, four questions, published on two pages under two different
headers** `[observed]`. Home: `Not just another slide tool`. Pricing:
`Any questions?`. Identical questions, identical answers, both immediately above
the footer.

| # | Question (verbatim) | Answer (summarised) |
|---|---|---|
| 1 | Is Pitch free to use? | Yes — Free plan allows unlimited presentations forever; points to Plus/Team/Business; price depends on seat count, billed monthly or annually |
| 2 | Can I hire Pitch to build my presentation for me? | No custom design services; steers to Pitch Agent or the template gallery; **offers to recommend creative agencies familiar with Pitch** |
| 3 | Does Pitch offer a free trial? | Non-committal — trials available to some customers depending on needs; routes to `contact support` |
| 4 | Can I import my existing deck, and if so, in what format? | Yes, PPTX; Google Slides / Keynote / other users should export to PPTX first |

**Q2 is the best question in this batch of five products.**
`Can I hire Pitch to build my presentation for me?` is a question no competitor
answers publicly, and it is one real users genuinely ask — a founder with a
board meeting on Thursday does not want a tool, they want a deck. The answer
says no, offers the two self-service substitutes, and then **offers a referral
to agencies that know Pitch**. Declining a request and routing the customer to
someone who can serve it is the correct unhappy-path answer to a
qualification question, and it is rare.

**Q4 is a compound question** — "Can I import my existing deck, **and if so, in
what format?**" — the Wise pattern of pairing the capability with its condition
in one item, so the answer cannot be a bare yes. And the answer handles the
users who are *not* on PowerPoint by telling them to export to PPTX first, which
turns "no" into a two-step yes for Keynote and Google Slides users.

**Q3 is the weakest**: a question with a hedged answer that ends in a mailto.
`Does Pitch offer a free trial?` is a yes-or-no question answered with "some
customers depending on their needs" — honest, but a visitor cannot act on it
without writing an email.

**Structural note.** Four questions is the smallest FAQ set in this batch
(Canva 20, Miro 17, Loom 11, Figma 7-stale). The arc is:
price → **can you do it for me** → trial → migration. Two of four are about
getting *out of doing the work yourself*, which is a fair read of who is buying
presentation software.

**Defect** `[observed]`: Q1's answer carries inline links labelled
`Free plan` and `our pricing page` **both pointing at `/pricing`** — and when
the block renders on the pricing page, one of them points at the page the reader
is already on.

**Question-form scope lines used as pseudo-FAQ** `[observed]`: the help
collections `Explore Premium features` ("Ready to go premium or not sure yet?")
and `Learn about billing and pricing` ("Got questions about our pricing plans or
how billing works?") are categories, not FAQs, but they carry the same
interrogative register — so the FAQ voice is a house style, not a block type.

## T13 Terminology & glossary

Pitch is the only product in this batch that **publishes a glossary in its
getting-started article**, under the header `First, some terms!`. Definitions
marked ✓ are verbatim from that article.

| Term | Meaning |
|---|---|
| `Pitch account` ✓ | "This is the user profile that you create in Pitch." Can belong to several workspaces |
| `Workspace` ✓ | "A workspace is the hub in which you work." |
| `Teamspace` ✓ | "A teamspace is a subsection within your workspace that helps you organize your work." Paid; 1/1/3/Unlimited by tier |
| `Folders` ✓ | "Folders contain multiple presentations." Support subfolders |
| `Presentation` ✓ | **"Also known as decks, pitches, or even slideshows if you'd like."** |
| `guest workspace` | Where an externally-shared user lands; has its own article |
| `Private space` / `private folders` | Owner-only; shareable as `Shared with me` |
| `Pitch Agent` | The AI agent — generates decks from prompt + files + template, and acts on blocks in-editor |
| `AI actions` | Discrete credit-consuming AI operations; surfaced as `Quick actions` / `Browse all actions` |
| `AI credits` | Metered AI currency; recurring by plan; overage `$0.004`; capped by a `workspace AI credits budget` |
| `Advanced links` | Tracked share links (visits, slide views, time on slide), against `Basic sharing links` |
| `bubble bar` | The contextual slide toolbar hosting status, assignment and reactions |
| `quick menu` | `cmd + k` command palette |
| `Variables` / `Content variables` | "smart placeholders" for personalisation; the basis of `Batch create presentations` |
| `blocks` | Atomic slide elements — `Group blocks`, `Align blocks` |
| `Slide style` | Reusable slide design definition; the Agent auto-creates them |
| `brand tone` | Workspace-level AI voice setting (`Set a brand tone for your workspace`) |
| `commenter role` | The only unpaid workspace role |
| `external guests` | Per-presentation collaborators outside the workspace; seat-capped |
| `Co-presenting` | Multi-presenter delivery |
| `speaker view` | Presenter display with notes |
| `Pitch branding` | The free-tier watermark; matrix values `Branded` / `Unbranded` |
| `Recents` + `By me` / `By everyone` | Dashboard activity filter |

**`Presentation` ✓ — "Also known as decks, pitches, or even slideshows if you'd
like." — is the most generous piece of terminology writing in this corpus.**
The help centre **explicitly sanctions four synonyms for its primary object**,
including the informal ones, and adds "if you'd like". Most products spend
effort enforcing one noun. Pitch concedes that its users already have words and
tells them theirs are fine. For a product whose users are sellers and founders
rather than designers, that is the right call — and it costs nothing, because
the *system* still has one name.

**The cost of that generosity shows elsewhere, and it is real.** Where the
glossary is deliberate about synonyms, the rest of the product is accidentally
so:

- **`Pitch rooms` has five surface names** — marketing says `custom deal rooms` and `custom sales rooms`, pricing says `2 shared pitch rooms` and `Pitch room links`, help says `Share pitch rooms with prospects or clients`. Capitalisation also drifts (`Pitch rooms` / `pitch rooms`).
- **The analytics surface has four names** — `Engagement analytics` (pricing), `Viewer analytics` (home), `presentation analytics` (help), `Member & guest analytics` (matrix).
- **The asset store has four names** — `Brand library` (home), `Workspace Library` (help title), `asset library`, `Library collections`; the control is `Manage library`.
- `Pitch Agent` and `Pitch agent` both appear **within one article**.

So the deliberate synonymy (one object, four sanctioned user words) and the
accidental synonymy (one feature, five product words) sit side by side. The first
is a generous content decision; the second is an unmanaged glossary. **They are
distinguishable by whether the system has a canonical name behind them**, and
that is the test worth carrying away.

**Register split.** Marketing is sales-coded (`win rooms`, `close deals`,
`Ramp your sales engine`, `people who mean business`). Help is warm and
domestic (`your stuff`, `pick back up where you left off`, `politely asking`,
`inbox 0 kind of person`). The gap is wide but coherent — the buyer is a revenue
leader, the user is a person trying to find their deck.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the reader, first-person plural for the
company, and Pitch's help centre is **more first-person than any other product
in this batch**: `We're excited to deliver Pitch Agent`,
`We don't offer custom design services`,
`we'll do everything we can to resolve your issue`,
`Let's start troubleshooting`. Present simple throughout; future `will` for
system behaviour (`Pitch Agent will then begin generating your deck`).

**Register — a genuine two-voice split.** Marketing is competitive and
sales-coded: `Create slides that win.`, `win rooms, and close deals`,
`Ramp your sales engine`, `presentations that actually land`, `Pitch like a
pro`, `Unrivaled visuals`. The help centre is chattier than almost any SaaS
documentation, with jokes and asides:
`we've kept things as transparent as the ghosts haunting our Berlin office.` ·
`if you're an inbox 0 kind of person` ·
`Also known as decks, pitches, or even slideshows if you'd like.` ·
`you could try politely asking for access again` · `you're in good hands` ·
`But don't worry` · `No problem!`

**The register gradient runs the opposite way to every other product in this
corpus.** Wise, Loom, Figma and Canva all flatten as stakes rise. Pitch's
marketing is the *restrained* surface — `Create slides that win.` takes a full
stop where a bang is expected — and its **help centre** is where the
exclamation marks and jokes live: `First, some terms!`, `Yes!`,
`A fresh start is always a good idea!`, `reach out to us!`,
`make sure you're in the correct workspace!`

That inversion is defensible in one direction and not in the other. Warmth in
a troubleshooting article is genuinely reassuring — `A fresh start is always a
good idea!` makes a tedious instruction feel like permission. A joke about
ghosts in a **pricing** disclosure, sitting a few lines from numbers that
contradict the pricing page, is not.

**Emoji used as a typed callout system** `[observed]`, consistently:
- `💡` for tips: `💡 A fresh start is always a good idea!`, `💡 Desktop notifications are enabled by default…`, `💡 Even if you're not working on a deck with a team, slide statuses come in handy…`
- `⚠️` for warnings: `⚠️ The features below apply to current plans, and may not be available for workspaces on legacy subscriptions.`
- `😞 😐 😃` as the feedback control

Same approach as Miro's four-emoji system and the same fragility (screen-reader
announcement varies; the meaning is learned, not labelled). Figma's typed boxes
are the more robust pattern.

**Accessibility — the weakest of the five products in this batch**

- **No accessibility statement, VPAT, or WCAG commitment exists anywhere on pitch.com.** The nine-item footer `Legal` group omits it; the security policy does not mention it. Verified absent rather than merely unfound. Miro publishes a WCAG 2.2 AA target and a changelog; Canva publishes WCAG 2.1 AA and a VPAT; Figma has an accessibility help article; Pitch has nothing.
- **`Skip to main content` exists on every help-centre page and on no marketing page.** The Intercom template supplies it; Pitch's own Framer build does not.
- **Marketing alt text is generic and heavily duplicated.** `Pitch presentation workspace visual` is reused on **at least 16 distinct images**. `Presentation template preview` is the alt for **all ten** template thumbnails, making them mutually indistinguishable. `Product illustration` is applied to product screenshots *and* customer logos. `Customer testimonial image` is applied to both portrait photos and company logos, so logo identity is lost entirely. Also `Card image`.
- A minority of alts are genuinely good and show someone knows how: `Pitch editor showing an AI Agent workspace` · `Presentation engagement analytics showing 76 percent engagement` · `Pitch room showing a shared presentation and reference notes` · `Pitch media editor with video controls` · `Black-and-white portrait of a woman with curly hair` · `Pentagram logo`, `Feedly logo`.
- **Six integration logo links render as `[![]()](…)`** — link, empty image, empty alt, no text. Six links with no accessible name on the home page.
- **In-page TOC anchors render with no text** (`[](#h_9af560cee2)`, `[](#lets-start-troubleshooting)`) on every long help article.
- **Feedback reactions lose their accessible names** on three of eleven sampled articles.
- The pricing comparison matrix conveys included/excluded **purely via `–` and glyph presence**, with no text alternative.
- **`THE PAYOFF` section copy ships with every inter-word space collapsed**: `Presentationsaremorethananasset.WithPitch,they'reyournewcompetitiveadvantage.Buildtrust,getbuy-in,andwinmoredeals.` A per-character animation split that destroys word boundaries in the DOM — so screen readers, copy-paste, and search all get one unbroken string.
- **Animated stat odometers ship every digit as separate text** (`0 1 2 3 4 M+`), so the accessible text is a digit soup rather than `4M+`.

The `THE PAYOFF` collapse is the most instructive defect in this file: a purely
visual animation technique silently destroyed the accessibility and
machine-readability of the page's central claim, and nothing in the visual
rendering would reveal it. A pattern worth checking for in any
character-animated headline.

**Defects — recorded in full, because the density is itself the finding**

*Stale plan names (the most serious):*
- `Learn about our paid plans` (updated **August 11, 2026**) carries the heading `# Team` above a first sentence that reads "The Pro plan is ideal for professionals and expanding teams…" — **heading and body name different plans**
- Same article: heading `# Pitch Business` above "In addition to all features in the Pro plan, it includes:" — a `Pro` plan that does not exist on the pricing page
- `Guide to AI credits` (also updated August 2026) repeats the error independently: it documents `Free`, `Plus`, `Pro plan`, `Business plan` — **the `Team` plan customers can actually buy is entirely missing from the AI-credits documentation, replaced by a phantom `Pro plan`**
- Heading style within one article: `# Plus`, `# Team`, `# Pitch Business`, `# Pitch Enterprise` — two of four brand-prefixed

*Pricing page and help centre contradict each other:*
- **Storage** — pricing says `10GB per member`; the plan article claims `Unlimited storage` ("without ever worrying about running out of space")
- **Image uploads** — pricing says `Up to 1GB per image`; the article says `Unlimited file size for image uploads`
- **Video uploads** — pricing lists video as simply included; the article imposes "a maximum of 10 videos per slide of up to 5MB each", a cap the pricing page never mentions and which sits badly against the marketing promise of `high-res video`
- **AI credits** — per-seat vs shared-pool stated three different ways across three pages
- **Currency** — plans in `€` on pricing, credit overage in `$0.004` in help, with no FX or region note
- `Unlimited advanced links` as a heading, body reads "Create up to **unlimited** advanced links"

*Template count, shipping two values simultaneously:*
`150+` on the home page (headline, body, and animated stat) and
`choose from over 150 templates` in the FAQ, against
`Get 100+ customizable, expert-made designs` in the legacy nav on
`/security-policy`.

*One article, two titles (search and cross-links disagree):*
`Where is my presentation?` / `Find your presentation` (ID 7067950) ·
`My changes are not syncing` / `My changes aren't syncing` (4540225) ·
`Contact us` / `Get in touch with Pitch` (3695568) ·
`Manage workspace roles` / `Workspace roles` (4460746) ·
`Organize your Workspace Library` / `Save assets to your workspace library`
(6010928) · `Share an external link to your presentation` /
`Share a presentation with others` (3748926)

*Article-count mismatches between index and collection:*
`Create with Pitch Agent` — index says `7 articles`, collection lists 5.
`Learn about billing and pricing` — index says `7 articles`, collection lists 5.
(Both independently verified in this harvest.)

*Typos, in copy last updated in 2026:*
`SMAL-based SSO` (for SAML; the pricing page gets it right) ·
`HTST Preload list` (for HSTS) · `Create withAI` · `open Agent t ask questions` ·
`Pitch Agent current supports` · `In you Library` ·
`browser the workspaces you've already joined` ·
`an overview of the your most recent presentations` ·
`Each teamspaces is organized with folders` ·
`both in your workspace an in the editor` ·
`You'll also be automatically be subscribed` · `why you're contact us` ·
`help you troubleshooting` ·
`collaborate on presentations no everyone should have access to` ·
`to suit the needs to every team` · `automatically payed from a credit card` ·
`any code before it is release` ·
`All communications with Pitch servers is done over TLS` ·
`This help us in segregating our infrastructure` · `operation system settings`

*Naming and casing:*
`Export a presentation to Power Point` (article title) vs `PowerPoint exports`
(matrix) vs `Powerpoint export` (plan article) — **three casings of the
vendor's own product name** · Footer `Sales deck` (singular) vs nav
`Sales decks` · eyebrow `solutions` lowercase among five uppercase ·
`Contact Us ` with a trailing space · sub-collection Title/sentence case drift

*Dead, broken, and leaking links:*
`Cookie Settings` → `#cookie-settings`, an anchor with no target, on every page ·
unlinked `Learn more about advanced links.` and `Learn more about external
guests.` (twice each) · `Contact us` links to the **raw Intercom host**
(`intercom.help/pitch-e945fb5e2931/…`) instead of `help.pitch.com` · six
integration logo links with no accessible name · empty TOC anchors on every long
article

*Rendering:*
Whole marketing page emitted **three times** (responsive variants), testimonial
carousel plus `See customer stories` repeating **6×** on pricing · plan cards
concatenate name and seat range with no separator (`FREE1-5`, `PLUS1`,
`BUSINESS1-200`) · price qualifier renders `month(paying yearly)` ·
matrix cells concatenate all four values unspaced (`5125200` for `Member limit`
— **genuinely ambiguous as delivered**; `113Unlimited` for `Teamspaces`) ·
billing toggle renders `Pay yearly17% saving` · fourteen bare hyphens where the
logo carousel failed · the plan article emits literal `**#### 500 AI
credits/month per seat**` — **markdown heading syntax leaking into rendered
copy, for ~15 consecutive feature headings**

*Metadata:*
`<title>` `The AI presentation workspace` vs meta-description "collaborative
presentation platform" · the flagship `Pitch Agent` article ships with
**empty meta-description, og:description and twitter:description** · footer
`Sign up` points at an `auth.pitch.com` URL with a **PKCE challenge and nonce
hardcoded into the static HTML**

---

## Transferable patterns

1. **Name help categories after the user's state, not the system's objects.**
   `Get started with Pitch` → `Become a Pitch power user` →
   `Explore Premium features` → `Solve a problem` is a proficiency-and-intent
   ladder. A user self-routes before learning any product vocabulary. The best
   help IA in this batch.
2. **Write the scope line as the user's question.** "Something isn't working?
   Seeing an error message?" · "Ready to go premium or not sure yet?" ·
   "Didn't find what you were looking for?" Two symptoms in one line so either
   one lands; and a commercial category that concedes you might not buy.
3. **`Where is all my stuff?` as a section heading in the official
   getting-started article.** Colloquial, undignified, and exactly the question.
   Same family as Wise's `Where is my money?`. Note Pitch answers the question
   twice — once in onboarding, once in troubleshooting — at two levels of panic.
4. **Open the getting-started article with a glossary and say so.**
   `First, some terms!` then five container definitions before the interface
   tour. For any product with a nested container hierarchy, name the containers
   before showing the screen.
5. **Sanction the user's synonyms for your primary object.** "Also known as
   decks, pitches, or even slideshows if you'd like." Costs nothing because the
   system keeps one canonical name; buys goodwill and searchability. Condition:
   this only works for the *user-facing* object. Pitch's five names for
   `Pitch rooms` is the failure mode, and the difference is whether a canonical
   name exists behind the variants.
6. **Order an access-denied diagnostic by embarrassment, cheapest first.**
   Three questions about the user's own state (wrong account? wrong workspace?
   someone else's private folder?) before three statements about the system's
   (unshared, deleted, stale link). The likelier causes are also the ones the
   user can fix alone.
7. **Document the missing feature in the article where it bites.**
   "Currently, there is no way to switch between user accounts — you will need
   to log out and log in." `Currently` marks it as a gap; the workaround is in
   the same sentence. Likewise "you could try politely asking for access
   again" — a social workaround offered without embarrassment where a
   request-access button does not exist.
8. **Put `Visit the Pitch status page` first in the troubleshooting
   collection.** Before any product-specific diagnosis, send the user to check
   whether the problem is yours. Almost no help centre does this.
9. **Correct the expectation a widget's appearance creates.** "Please note: This
   is not a live chat, and our typical response time is a few hours." A
   messenger *looks* like live chat; name the gap and attach a number. Pair with
   "You may not see the messenger… if you're using an ad blocker" — a support
   failure caused by the user's own browser, pre-empted.
10. **List notification triggers as things a person did to you.**
    `Assigns you a slide` · `Mentions you in a comment` · `Replies to your
    comment` · `Resolves your comment`. Third-person verb, `you` as object.
    Notifications become social events rather than system events.
11. **Borrow the task-management state vocabulary users already have.**
    `To do` / `In progress` / `Done` on a *slide*, set from the bubble bar, with
    `Done` wired to fire a notification. No coined ladder, immediately legible to
    a mixed team, and a state that fires an event is a state people set.
12. **State renewal and pooling in the credit hint, as a contrast.**
    Free: "This amount does not renew once used." Paid: "They renew with your
    subscription and are shared across the whole team." Two hints differing in
    exactly the two dimensions that matter. Then ship a **spend cap as a
    first-class setting** and say so publicly.
13. **`All roles are paid, except for commenters.`** Eight words that define the
    entire billing model by naming the single exception rather than enumerating
    the rule.
14. **Publish mechanism, not just attestation — and make it falsifiable.**
    "from one day for critical vulnerabilities to eight days for medium risk
    vulnerabilities", plus the four-level data classification with customer data
    named in the top tier. Condition: this is *additional* to certification, not
    a substitute — Pitch's total absence of SOC 2 / ISO 27001 is a real
    procurement weakness.
15. **Answer "can you just do it for me?" publicly.** `Can I hire Pitch to build
    my presentation for me?` — no, here are the two self-service substitutes,
    and here is a referral to agencies who can. Declining a request and routing
    the customer onward is the correct answer to a qualification question.
16. **Negative pattern to check for: character-animated headlines destroy their
    own text.** `THE PAYOFF` ships with every inter-word space collapsed, so the
    page's central claim is one unbroken string to screen readers, copy-paste,
    and search — and nothing in the visual rendering reveals it.

## Caveats & gaps

- **The Pitch harvest was performed by a delegated agent**, whose report supplied
  most of the strings in this file. I independently re-fetched
  `https://help.pitch.com/en/` and `https://status.pitch.com/` and verified them
  **verbatim**, including the trailing space in `Contact Us `, the seven
  component names, the `No recent notice` empty state, and both article-count
  mismatches (index claiming `7 articles` where collections list 5). Confidence
  in the remainder is correspondingly high, but strings attributed to the 21
  pages I did not personally re-fetch should be re-verified before use as
  precedent.
- **All in-app strings are `[documented]`, not observed.** Everything behind
  `app.pitch.com` requires sign-in, which was not attempted. T8 (empty states)
  and T5 (form labels) are genuinely thin as a result, and are marked so rather
  than padded — one real empty state (`No recent notice`) was captured.
- **11 of ~120 help articles were opened.** The other ~109 titles are captured
  verbatim in T11 but their bodies are unread. Highest-value unfetched:
  `My changes are not syncing`, `Send us error logs`,
  `Troubleshooting service providers blocking Pitch`,
  `Recover a deleted slide`, `Guide to billing at Pitch`,
  `An overview of Pitch's MCP`, `How we use AI`.
- **Not fetched:** `/whats-new` (release-note voice), `/templates` (gallery
  filter and empty states), `/demo` (a real form with field labels),
  `/integrations`, `/academy`, `/customer-stories`, `/workflows`, `/teams`, and
  the legal set (`/terms-of-use`, `/privacy-policy`, `/dpa`, `/gdpr`).
- **Status-page severity vocabulary is `[absent]`** — only `Operational` was
  observable because all seven components were green, and `No recent notice`
  meant no incident write-ups to sample. `status.pitch.com/history` would supply
  the degraded/outage labels and the incident-update register.
- **Cookie-consent banner copy is `[absent]`** — script-injected; the only trace
  is the dead `#cookie-settings` anchor.
- **No accessibility commitment exists.** This is asserted, not merely unfound:
  the nine-item footer `Legal` group was enumerated, the security policy was
  read in full, and there is no statement, VPAT, or WCAG claim anywhere on the
  domain. That absence is the finding.
- **Marketing page content is triplicated in the DOM** (Framer responsive
  variants), so duplicate strings were collapsed by hand; a variant differing
  between copies could have been missed. Two pillars are known to ship in two
  different wordings (T2) and both were captured.
- **Pricing observed in EUR at the default yearly setting**, seat slider at its
  low bound. The `€10` / `€15` / `€20` figures are per-seat-per-month paying
  yearly. Monthly figures were not rendered.
- **Plan-fact contradictions are unresolved.** Where the pricing page and the
  help centre disagree (storage, image size, video caps, credit pooling), both
  claims are recorded with their sources and neither is treated as authoritative.
  Do not cite a Pitch plan limit from this file without re-checking.
- **Single locale.** `/en/` with no alternatives offered; nothing is claimed
  about other markets.

## Sources

1. https://pitch.com/
2. https://pitch.com/pricing
3. https://pitch.com/security-policy
4. https://help.pitch.com/en/ *(independently verified)*
5. https://help.pitch.com/en/collections/19716036-create-with-pitch-agent
6. https://help.pitch.com/en/collections/2055837-get-started-with-pitch
7. https://help.pitch.com/en/collections/2056202-become-a-pitch-power-user
8. https://help.pitch.com/en/collections/2595025-explore-premium-features
9. https://help.pitch.com/en/collections/2056184-solve-a-problem
10. https://help.pitch.com/en/collections/6939692-learn-about-billing-and-pricing
11. https://help.pitch.com/en/collections/2135343-contact-us
12. https://help.pitch.com/en/articles/8038180-getting-started-with-pitch
13. https://help.pitch.com/en/articles/14981091-pitch-agent
14. https://help.pitch.com/en/articles/14844265-create-a-new-presentation
15. https://help.pitch.com/en/articles/4318642-set-a-status-and-assignees-for-a-slide
16. https://help.pitch.com/en/articles/5108435-view-and-subscribe-to-in-app-notifications
17. https://help.pitch.com/en/articles/7067950-where-is-my-presentation
18. https://help.pitch.com/en/articles/3695462-first-steps-to-solve-a-problem-with-pitch
19. https://help.pitch.com/en/articles/8534586-troubleshooting-common-export-errors
20. https://help.pitch.com/en/articles/3695568-contact-us
21. https://help.pitch.com/en/articles/9364636-learn-about-our-paid-plans
22. https://help.pitch.com/en/articles/12755590-guide-to-ai-credits
23. https://status.pitch.com/ *(independently verified)*
