# 188. Help Scout

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | SMB customer support platform / shared inbox and knowledge base |
| Primary URL | https://www.helpscout.com/ |
| Corpus rank | 188 |
| Benchmark strength (source list) | Calm support workflows |
| Locale / market observed | en-US |
| Platform observed | Web (marketing, pricing), product documentation (`docs.helpscout.com`), legal pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | HIPAA compliance offered as a Pro-plan feature and a Plus add-on; GDPR-adjacent artefacts published (`Data Processing Amendment`, `List of Sub-processors`); a published `Accessibility Statement` naming **WCAG 2.1 Level A** as the target; an `AI Transparency` policy page |
| Harvest date | 2026-09-22 |
| Pages inspected | 7 (plus 1 comparator source on Zendesk) |
| Harvest completeness | Full for the flagged strength — the three-value conversation-status model, the assignment folders, and the explicit refusal to allow custom statuses were all directly documented. Partial overall: status page, snooze article, workflow/views articles and the `/compare/` pages were not opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.helpscout.com/ | Hero, three-pillar proof, feature carousel, Beacon, social proof, footer |
| Pricing | https://www.helpscout.com/pricing/ | Four plans, per-resolution AI pricing, full feature matrix with inline definitions, seven-question FAQ, ROI calculator |
| Docs home | https://docs.helpscout.com/ | Six collections, category descriptions, article counts |
| Docs: Work with Conversations (category) | https://docs.helpscout.com/category/23-working-with-conversations | Twenty article titles — the task-phrasing inventory |
| Docs: Understand Conversation Icons and Colors | https://docs.helpscout.com/article/11-understand-conversation-icons-and-colors | **The three-status model and the refusal to extend it** |
| Docs: Assign Conversations | https://docs.helpscout.com/article/842-assign-conversations | Folder names, role names, the `Anyone` assignee value |
| Docs: Follow a Conversation | https://docs.helpscout.com/article/671-follow-a-conversation | Follow/Unfollow vocabulary and the four notification triggers |
| Accessibility Statement | https://www.helpscout.com/company/legal/accessibility-statement/ | Four named accessibility principles, WCAG target, response SLA |
| **Comparator** — Zendesk ticket lifecycle | https://support.zendesk.com/hc/en-us/articles/8263915942938-About-the-ticket-lifecycle-and-ticket-statuses | Used only to substantiate the state-vocabulary comparison in T6 |

---

## T1 Navigation & IA labels

**Global nav — four dropdowns, each entry a name plus a benefit clause** `[observed]`

`Product` · `Solutions` · `Resources` · `Company` · `Pricing` · `Login` · `Start for Free`.

| `Product` entry | Descriptor (verbatim) |
|---|---|
| `Inbox` | "Every support channel, one place" |
| `AI` | "Scale your team's capacity" |
| `Knowledge Base` | "Build a custom help center" |
| `Messages` | "Send proactive alerts, surveys, & more" |
| `Insights & Analytics` | "Turn signals into action" |
| `Apps & Integrations` | "Connect to 100+ platforms" |
| `Mobile` | "Support customers on the go" |
| `Product Tour` | "Explore at your own pace" |

Compare Front's nav descriptors (`Escape from tab hell`, `CSAT without the lies`), which
attack the incumbent. Help Scout's descriptors state the **user's outcome** in neutral
language. Same structural device, opposite register — and the difference is the clearest
single illustration of the two products' positioning.

**`Resources` and `Company` entries also carry descriptors** `[observed]`:
`Help Scout Blog` "Tips and actionable content" · `Guides & Tools` "Resources to help you
grow" · `Live Classes` "Free training and demos" · `Help Center` "Searchable product
tutorials" · `About` "Our history and values" · `Careers` "Join the team" ·
`Partner Program` "Grow your business with Help Scout" · `Newsletter` "Support tips,
product updates, & more".

**Defect:** the `Solutions` dropdown lists `Real Estate` and `Property Management` as two
separate entries pointing at the *same URL* (`/industry/property-management/`), and the
footer repeats the same duplication. Likewise `Manufacturing & Logistics` in the nav is
split into `Logistics` and `Manufacturing` in the footer, both pointing at
`/industry/manufacturing-logistics/`. Eleven footer entries resolve to nine pages.

**Nav vs footer product-name drift** `[observed]`: the nav says `AI` and
`Knowledge Base`; the footer says `AI Chatbot` and omits Knowledge Base entirely. The
`AI Chatbot` footer link resolves to `/self-service/`, a third name for the same area.

**Footer groupings** `[observed]`: `Product` · `Solutions` · `Compare` · `Company` ·
`Support`. Notable inclusions:

- A `Compare` column naming six competitors: `Zendesk`, `Intercom`, `Freshdesk`, `HubSpot`, `Gorgias`, `Front`. (Front, corpus #189, reciprocates.)
- `Accessibility` as a first-class footer link alongside `Terms` and `Privacy`.
- **`Status 99.99%`** — the footer link label *contains the uptime figure*. The status page is not just linked, its headline metric is inlined into the navigation. That is a confident, reusable disclosure move: the link is a claim.

**Documentation IA — six collections, each with named categories and live counts**
`[observed]`

| Collection | Categories |
|---|---|
| `Getting Started` | `Set Up Your Account`, `Work With Your Team`, `Help Scout For Your Industry`, `Self Service Best Practices` |
| `Account Management` | `Company Settings`, `Manage Users`, `Payment and Billing`, `Reports` |
| `Inbox` | `Copy Email to Help Scout`, `Inbox Settings`, `Work with Conversations`, `Productivity`, `Customer Management`, `Mobile Apps` |
| `Beacon` | `Get Started with Beacon`, `Beacon Settings`, `Add Beacon to Your Site or App`, `AI Answers`, `Live Chat`, `Messages` |
| `Docs` | `Get Started With Docs`, `Manage Docs`, `Customize Your Docs Site` |
| `Channels & Apps` | `Analytics`, `Apps`, `Communication`, `Connectors`, `CRM`, `Ecommerce`, `Marketing`, `Support` |

Category descriptions are **second-person outcome sentences**, not topic labels:
"Get to know Inbox, Beacon, and Docs, and get your emails forwarding" ·
"Help your customers help themselves" · "Reply to conversations, forward emails, merge
duplicates, and more" · "Answer your questions about payment options and billing details".

The `Self Service Best Practices` category (15 articles) is a **coaching** category inside
a product help centre — advice about running support, not about using Help Scout. Together
with `Help Scout For Your Industry` (11 articles) it means roughly a quarter of the
`Getting Started` collection is business advice. That is a deliberate content-marketing
blend and it is worth flagging: it makes the docs bigger and less purely functional.

**Defect:** the collection named `Docs` sits inside a site called `Help Scout Support`
which lives at `docs.helpscout.com`, and the footer calls the whole thing `Help Docs`
while the nav calls it `Help Center`. `Docs` is simultaneously the product name for the
knowledge-base feature, the domain name of the help site, and a collection inside it.
**Three referents for one four-letter word.** This is the terminology problem in the file.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The most intuitive customer support platform`
> Subhead: "Help Scout brings context, collaboration, and AI inside the flow of support, so your team can make fast, exceptional service the standard."

A superlative adjective plus the category noun. No metaphor, no attack, no wordplay. The
subhead is a single sentence with a **triad plus a purpose clause** ("context,
collaboration, and AI … so your team can…"), which is the sentence shape Help Scout uses
everywhere.

`inside the flow of support` is the only phrase doing positioning work, and it is the
quiet version of Front's `Escape from tab hell`.

**Three-pillar proof, each a claim plus a number** `[observed]`

- `Clarity where it counts` — "Insights live alongside every conversation, so you can make the right call in real time."
- `Built for real teamwork` — "Teams on Help Scout respond to 56% more messages in their first year."
- `AI that multiplies your team` — "Take on more volume with AI agents that resolve 73% of interactions on average."

Two of three attach a measured figure, and both figures are **bounded**: `in their first
year`, `on average`. Claim-then-bound, the Wise pattern, applied lightly.

**Section headers are plain-language promises** `[observed]`:
`One home for all your support conversations` · `Plus, all the little things support teams
love` · `Meet Beacon: your embeddable support hub` · `Get closer to customers with in-app
messages` · `Reporting that tells a story` · `Stay organized automatically` ·
`Why do 12,000+ companies choose Help Scout?`

`Plus, all the little things support teams love` is the most characteristic line on the
site. It concedes that the following features are *small*, and frames smallness as
affection rather than as a gap. A competitor selling against enterprise heaviness cannot
claim depth, so it claims care — and the header says so out loud.

**Reporting section headers are written as spoken questions in quotation marks**
`[observed]`:
`"What's our volume across channels?"` · `"How's our response time?"` ·
`"Where can we improve?"`

Quoting the manager's own question, contraction and all, as the section header. The most
reusable headline device in this file: it turns a feature list into a list of *questions
the tool answers*, and it survives translation into any analytics product.

**Feature-carousel copy is short, warm and occasionally conversational** `[observed]`:

- `Snooze` — "No rush to reply? Resurface the conversation at a later date automatically with snooze."
- `Send later` — "Schedule a reply so the customer gets it at the perfect time."
- `Workflows` — "Automate the tedious but critical tasks that keep your team (and Inbox) organized."
- `Saved replies` — "Add proven answers to common questions or situations with a few clicks."
- `Multiple Inboxes` — "Give every department or product its own dedicated place for support."
- `Channels` — "Close those extra tabs and handle messages from social, Shopify, and more in Help Scout."
- `Company management` — "Get the context you need to support full accounts, not just individuals."
- `Get a boost from AI` — "Recap long threads, edit and translate replies, or even create a first draft, all with a click."

`No rush to reply?` opening a feature description is the "calm" register in a single
phrase — the product is giving the agent permission not to answer now. That is the
substantive content decision behind the brief's "calm support workflows" label, and it is
worth noticing that it appears in the *marketing* copy for the deferral feature rather
than in the feature's own UI.

**The trust block leads with the company's own support performance** `[observed]`:

- `World-class support` — "Our team answers 99% of emails within 24 hours, so you're never left in the dark."
- `Ease of use` — "Independent research showed that our NPS is 7x higher than competitors' scores."
- `Built to scale` — "80% of customers are still here after 4 years, so you can be confident you won't outgrow us."

A support vendor publishing its own first-response percentage is the right proof to lead
with. `you won't outgrow us` is a direct answer to the objection the whole positioning
invites (that a lightweight tool has a ceiling), and it names the objection rather than
dodging it.

**Closing CTA block** `[observed]`:
> `Start for Free` / "Learn the platform in less than an hour. Become a *power user* in less than a day."

Two time-bounded competence promises, italicising `power user`. This is the anti-enterprise
claim made as a measurement, not an adjective.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start for Free` | Nav (desktop), hero, closing block | |
| `Start for free` | Nav (secondary, repeated on every dropdown panel) | **Same string, two capitalisations, on the same page** |
| `Start with Free` | Pricing, Free-plan column | A **third** variant, and grammatically odd |
| `Try for Free` | Pricing, Standard and Plus columns | A **fourth** variant for the same action |
| `Get a 1:1 demo` | Nav secondary, repeated on every dropdown panel | |
| `Get a Demo` | Hero, nav (mobile) | |
| `Book a Demo` | Closing block, Pro plan column, sticky bar | Three demo labels |
| `Login` | Nav | One word, capital L |
| `Skip to content` | First in DOM | Accessibility — present, unlike Front and Calendly |
| `Assign` | Documented, conversation toolbar and folder floating menu | |
| `Snooze` | Documented, conversation toolbar | |
| `Add a tag` | Documented, conversation toolbar | The only article-prefixed toolbar label |
| `Run Workflow` | Documented, conversation toolbar | |
| `Custom Fields` | Documented, conversation toolbar | |
| `More Actions` | Documented, conversation toolbar overflow | |
| `Follow` / `Unfollow` | Documented, More Actions | Keyboard shortcut `O` |
| `Forward` | Documented, More Actions | |
| `Move...` | Documented, More Actions | Ellipsis signals a subsequent choice |
| `Spam` | Documented, More Actions | **A noun used as an action label**, where the article's prose says "Mark the conversation as spam" |
| `Delete` | Documented, More Actions | Moves to `Recently Deleted`, not permanent |
| `Show Details` / `Hide Details` | Documented, More Actions | |
| `Wide Layout` / `Regular Layout` | Documented, More Actions | |
| `Collapse All` / `Expand All` | Documented, More Actions | |
| `Previous Conversation` / `Next Conversation` | Documented, More Actions | |
| `Copy Link Address` / `Copy Link` | Documented, list-view context menu | Two labels offered for one action, depending on browser |
| `Copy Link to Thread` | Documented, thread overflow menu | |
| `Assign to User` | Documented, workflow action name | |
| `Yes` / `No` | Foot of every doc article, under `Did this answer your question?` | Minimal feedback control |
| `Toggle Navigation` / `Toggle Search` | Docs chrome | Developer-flavoured labels leaking into the UI |

**Observation.** Four capitalisation/wording variants of the free-signup CTA
(`Start for Free`, `Start for free`, `Start with Free`, `Try for Free`) and three of the
demo CTA (`Get a 1:1 demo`, `Get a Demo`, `Book a Demo`). The marketing-surface
inconsistency is the same failure mode found in Front and Calendly — **all three products
in this batch keep tight in-product label discipline and lose it entirely on the marketing
site.** That is a recurring corpus finding, not a one-off.

Against that, the conversation toolbar is a clean, short, mostly single-word verb set:
`Assign`, `Snooze`, `Forward`, `Follow`, `Delete`, `Spam`. Six verbs — with `Spam` the one
that is not a verb.

## T4 Onboarding & getting-started

`[observed]` from marketing and docs IA; in-product onboarding is behind auth.

**The onboarding promise is stated as two time limits** `[observed]`:
"Learn the platform in less than an hour. Become a *power user* in less than a day."
Both are falsifiable and both are the entire competitive argument in fourteen words.

**Free-plan onboarding is described by its contents, twice, in two different word orders**
`[observed]` on the pricing page:

- "Just need the basics? The **Free plan** includes 5 users, 1 Inbox, and 1 Docs site."
- "The **Free plan** gives you 5 users, 1 Inbox, and 1 Docs site." / "Just need the basics?"

Both variants ship (responsive alternates), with `includes` vs `gives you` and the question
before vs after. A small but real duplication defect.

**Trial terms are stated with a duration, a scope and a friction disclosure** `[observed]`:
"When you sign up for a free trial of the Standard or Plus plan, you'll get 15 days to take
all of the plan's features for a test drive — no credit card required. Want to trial the
Pro plan? Talk to our sales team."

Note that the Pro trial is *not* self-serve and the page says so in the same breath rather
than letting the user discover it. And the AI add-on gets its own separate trial term:
"When you create your Help Scout account, you will get 3 months of free, unlimited AI
Answers resolutions. … The trial starts on the first day you create your account." — the
last sentence pre-empts the "when does the clock start" question that per-resolution
billing makes urgent.

**Docs article structure** `[observed]`: H1 → intro paragraph → `#### In this article`
jump-links → H2 sections → `Did this answer your question?` `Yes` `No` →
`Updated on <Month D, YYYY>` → `Related Articles`. Numbered steps are rendered as bare
numerals (`1`, `2`) rather than as `Step 1`.

**`Pro-tip:` is used as an inline label** `[observed]`:
"Pro-tip: **O** is the keyboard shortcut for Follow, to skip a few clicks!" — one of the
few exclamation marks in the documentation, and it is attached to a shortcut, i.e. to
making the reader faster.

## T5 Form & field labels

`[documented]` throughout.

**Conversation toolbar — seven controls, named as short nouns or verbs**:
`Status` · `Assign` · `Snooze` · `Add a tag` · `Run Workflow` · `Custom Fields` ·
`More Actions`. Each is icon-only in the UI with a tooltip, and the docs article exists
specifically because of that: "When you're starting out, to figure out what's what, hover
over each icon to see a tooltip."

**Writing a whole help article titled `Understand Conversation Icons and Colors` is itself
the finding.** A product that ships an icon-only toolbar and a colour-coded thread system
has to publish a legend, and Help Scout publishes it as a first-class article rather than
burying it. But the existence of the article is also the admission: the UI is not
self-describing without hover.

**Assignment values** `[documented]`: `Anyone` (the unassigned value) · `Me` ·
any named User · a `Team` (Plus and Pro only).

**Folder names** `[documented]`: `Unassigned` · `Mine` · `Assigned` ·
per-team folders · `Recently Deleted`.

**The `Anyone` → `Unassigned` mismatch.** "When you assign a conversation to Anyone, it
will appear in the *Unassigned* folder." The dropdown value and the destination folder use
different words for the same condition, and the sentence has to say "assign … to Anyone"
which is semantically the opposite of what it does (it *unassigns*). Compare Front, which
uses the single value `Unassigned` in the dropdown and in the state. **Front's choice is
better; Help Scout's is a smaller version of the verb/state mismatch problem that runs
through both products.**

Worth noting the counter-argument: `Anyone` is a *permission* statement ("anyone may pick
this up") while `Unassigned` is an *ownership* statement ("nobody owns this"). In a shared
inbox those are genuinely different framings and `Anyone` is the more inviting one. The
defect is having both, not choosing either.

**Role names** `[documented]`: `Account Owners` · `Administrators` · `Users` ·
`Light Users`. The rule is stated as an exclusion: "Light Users can't assign conversations
nor have conversations assigned to them." And the pricing page defines the role by what it
saves: "Let teammates view conversations and collaborate without taking up a full user
seat."

**Search operators as labels** `[documented]`: `assigned:` typed into the search bar
surfaces a user picker. An article titled `Search Filters With Operators` exists for the
full set.

**Pricing-page feature labels carry inline definitions** `[observed]` — this is the
strongest single practice on the Help Scout marketing surface. Every row in the comparison
matrix is a bolded label with a one-sentence gloss underneath:

| Label | Definition (verbatim) |
|---|---|
| `Users` | "Users are members of your team in Help Scout." |
| `Light users` | "Let teammates view conversations and collaborate without taking up a full user seat. Maximums by plan: Plus (25), Pro (50)." |
| `Contacts` | "Someone who received a reply from your team or had their question resolved by the AI assistant. Multiple conversations with the same person count as one contact." |
| `Inboxes` | "Collaborate on customer conversations in a shared workspace." |
| `Saved replies` | "Create a library of FAQ responses you can search and insert in 2 clicks." |
| `Tags` | "Use tags to label conversations, monitor trends, and start automations." |
| `Snooze` | "Use snooze to set a date and time for a conversation to return to the top of your Inbox." |
| `Views` | "Groups conversations into lists based on criteria like status, assignments, and priority." |
| `Custom fields` | "Track up to 10 custom data points on each conversation for use in reporting and workflows." |
| `Customer properties` | "Collect and display up to 50 additional customer data points that matter to your team." |
| `Routing` | "Automatically assign conversations evenly across your team to balance the workload." |
| `Workflows` | "Organize, assign, or reply to conversations automatically. Advanced workflows let you trigger actions based on customer properties." |
| `Service Level Agreements (SLAs)` | "Set and track response targets across conversations to keep work on schedule." |
| `AI Assist` | "Expand, shorten, edit, or translate text with AI." |
| `AI Drafts` | "Use AI to draft replies based on past conversations and help content." |
| `AI Summarize` | "Summarize back-and-forth conversations into a few bullet points with AI." |
| `AI Answers chatbot` | "An AI assistant that offers instant answers to customers using your knowledge base content and custom sources." |

The `Contacts` definition is the important one because `Contacts` is a *metered* unit on
the Free plan (`100/mo`). Defining the billable unit precisely — including the
deduplication rule ("Multiple conversations with the same person count as one contact") —
inside the comparison row rather than in a footnote is exactly right.

**Defect, and a clear one:** two adjacent rows carry **identical definitions for different
features**:

- `Office hours` — "Send customers a confirmation as soon as their message is received."
- `Auto reply` — "Send customers a confirmation as soon as their message is received."

`Office hours` is obviously not an auto-reply feature. A copy-paste error sitting in the
plan-comparison table, i.e. in the document a buyer uses to decide.

**Routing values** `[observed]` in the matrix: `Round robin` (Plus) and
`Round robin + load balanced` (Pro). Two named distribution algorithms, exposed as plan
differentiators.

## T6 Status & state language

**This is the priority section, and Help Scout's model is the shortest in the corpus.**
`[documented]`

> "In Help Scout, there are three values for conversation status:"

| Status | Definition (verbatim) |
|---|---|
| `Active` | "**Active** conversations indicate the conversation is waiting for action. New conversations are automatically set as *Active* when they arrive in your Inbox." |
| `Pending` | "**Pending** conversations are waiting on something. Set a conversation to *Pending* if you're waiting to hear back from a customer, or you just need time to gather more information." |
| `Closed` | "**Closed** conversations are solved conversations. Set the status to *Closed* when you're finished working with the customer, and you consider the case to be resolved." |

Plus one automatic transition, stated in one sentence:
"If a customer replies back to a Pending or Closed conversation, the status will
automatically be changed to Active."

**And then the refusal, stated plainly and with a substitute:**

> "It's not possible to edit existing status options or add custom values to the status
> menu. We suggest using tags for that."

**This is the editorial decision the brief points at, and it is worth unpacking.**

The comparison is with Zendesk, whose public documentation describes
**six standard statuses** — `New`, `Open`, `Pending`, `On-hold`, `Solved`, `Closed` — plus
a seventh (`In Progress`) for accounts created on or after 13 February 2024, plus
**custom ticket statuses**, which when activated convert the six standard statuses into
**status categories**. Zendesk also documents `reopened` and `follow-up` as exceptions to
the lifecycle, and a rule that `Closed` cannot be set manually at all.
(Source: Zendesk help, `About the ticket lifecycle and ticket statuses`.)

Set the two side by side:

| Concern | Zendesk | Help Scout |
|---|---|---|
| Arrival | `New` (a distinct status; cannot be returned to) | no separate status — arrival sets `Active` |
| Assigned and being worked | `Open` (and optionally `In Progress`) | `Active` |
| Waiting on the customer | `Pending` | `Pending` |
| Waiting on a third party | `On-hold` (internal only; the requester still sees `Open`) | `Pending` — no distinction |
| Answered | `Solved` | `Closed` |
| Archived/frozen | `Closed` (automatic, never manual, cannot be reopened) | — no equivalent |
| Reopening | `Solved` → `Open`; a closed ticket spawns a `follow-up` ticket | `Pending`/`Closed` → `Active`, always |
| Extensibility | custom statuses; standard statuses become categories | **none — "not possible"**, use tags |

**Help Scout collapses six-plus states into three by making four specific editorial cuts:**

1. **No `New`.** Arrival is not a state, it is just the first moment of `Active`. Zendesk
   needs `New` because it needs to measure first-touch; Help Scout measures that in
   reporting rather than in the object's state.
2. **No `On-hold`.** Waiting on a colleague and waiting on the customer are one state.
   Zendesk's own documentation admits the two are nearly the same — "It's similar to the
   Pending status in that you, as an agent, can't proceed with resolving the ticket until
   you receive more information from someone else" — and then ships both anyway, with the
   added complication that `On-hold` is invisible to the requester, who sees `Open`.
   Help Scout's `Pending` definition explicitly absorbs both cases: "waiting to hear back
   from a customer, **or you just need time to gather more information**."
3. **No `Solved` / `Closed` split.** Zendesk's `Solved` and `Closed` encode a
   *retention/immutability* concept (a closed ticket is archived and cannot be reopened;
   a reply spawns a new follow-up ticket). Help Scout does not have that concept at all —
   a reply to a `Closed` conversation simply reopens it as `Active`. **One state fewer,
   and also one worse outcome eliminated: the Help Scout customer can never be told their
   reply created a new unrelated ticket.**
4. **No extensibility.** Zendesk lets admins add custom statuses, which is why it then
   needs the *status category* abstraction on top. Help Scout says no and redirects the
   need to tags — an orthogonal, unordered, non-state mechanism.

**The cut is not simply "fewer words is better".** It is a decision about *where variable
information lives*: Help Scout puts the invariant lifecycle in `status` and everything
team-specific in `tags`, `custom fields` and `Views`. Zendesk lets teams encode their own
process into the state machine itself. Help Scout's model is cheaper to learn, cannot
express "waiting on legal" as a first-class state, and cannot be misconfigured. Zendesk's
is the opposite on all three.

The single sentence "We suggest using tags for that" is doing the entire job of explaining
that trade-off, and it does it in six words at the exact point where a migrating Zendesk
admin will look for the missing feature. **That placement — the refusal and the substitute
in the same breath, in the reference article rather than in a FAQ — is the most
transferable thing in this file.**

**Status is also expressed through sort order, not only through a label** `[documented]`:

- "Active conversations are in **bold** and appear at the top"
- "Pending conversations appear after Active conversations"
- "Closed conversations have a light grey background and appear at the bottom (if displayed)."

So the three states map onto three visual treatments *and* a default sort. With only three
values that is legible; with Zendesk's six-plus it would not be. **The reduced vocabulary
is what makes the ambient, non-textual status signalling possible.** That is the strongest
argument for the reduction and Help Scout never makes it explicitly.

**Thread-type states, encoded as border colours** `[documented]`:

- "Customer replies have no border."
- "User replies have a grey border."
- "Drafts are represented by a blue border."
- "Notes have a yellow background and border."
- "Forward notes have a purple border"
- "Replies that are scheduled to send later have a green border."

Six thread types — `customer reply`, `user reply`, `draft`, `note`, `forward note`,
`scheduled reply` — distinguished **by colour alone**, with no stated text label. This is
the state vocabulary Help Scout did *not* reduce, and it is carried entirely
non-textually. For a product with a published WCAG 2.1 A commitment, colour-only encoding
of six semantic types is a notable exposure. Recorded as a negative finding; a text label
or icon may exist in the UI and simply not be documented, so this is flagged as suspected
rather than confirmed.

**Deletion is a soft state** `[documented]`: `Delete` "Moves the conversation to the
Recently Deleted view", with a dedicated article `About the Recently Deleted View`.
Naming the destination after *recency* rather than after the bin (`Trash`, `Deleted
Items`) implies impermanence without promising it.

**Waiting time is a named sort, not a status** `[documented]`: an article titled
`About the Waiting Sort` (URL slug `about-waiting-since`) — so `Waiting` exists in Help
Scout as an *ordering* concept, deliberately kept out of the status enum where Zendesk and
Front both put it. **Defect:** the title says `Waiting Sort` and the slug says
`waiting-since`, so the feature has been renamed once and the URL remembers.

**Audit-trail entries as state history** `[documented]`: "line items that show that a
workflow ran, that someone assigned the conversation, or that the status was changed",
toggled by `Show Details` / `Hide Details`.

## T7 Error, failure & recovery

Thin on the public surface; the product's approach is to prevent the error rather than
message it. `[documented]` and `[observed]`

**Recovery is built into the state and folder model**: `Delete` goes to
`Recently Deleted` rather than vanishing; `Follow`/`Unfollow` and `Show`/`Hide Details`
are symmetric pairs; a reply to a `Closed` conversation automatically reopens it rather
than failing or forking.

**Spend-overrun is the one failure mode with published copy** `[observed]`, and it is
handled well:

> "Yes — you can set a monthly cap on AI Answers resolutions. If you hit your spending cap,
> AI Answers will be disabled automatically for the remainder of the monthly cycle. You'll
> receive email notifications as you get closer to your cap. This option allows for
> predictable billing, so you'll never be surprised at the end of the month."

Three parts in order: the control, the consequence of hitting it, the warning before it.
`you'll never be surprised at the end of the month` names the actual fear. For any
usage-metered product this is the model answer.

**The billing-failure boundary is defined in the positive** `[observed]` — the AI
resolution definition specifies precisely when the vendor does *not* charge:

> "A resolution is counted only if the customer receives an AI response and doesn't use
> escalation, search the knowledge base, ask more questions, or indicate that they need
> more help. If a customer requests more help with natural language or by selecting the
> "I still need help" button, the conversation won't count as a resolution and you won't
> be charged. You'll only be charged for one resolution per conversation, even if AI
> Answers responds to multiple questions."

Four disqualifying behaviours enumerated, the escape-hatch button quoted by name
(`I still need help`), and a per-conversation cap stated. This is unusually precise
metering copy and it is the strongest disclosure on the site.

**Docs feedback error state** `[observed]`, at the foot of every article:
`Did this answer your question?` · `Thanks for the feedback` ·
`There was a problem submitting your feedback. Please try again later.` · `Yes` · `No`

All three response states ship in the HTML, so the failure message is visible in source.
"There was a problem submitting your feedback. Please try again later." — no blame, no
error code, a time-based recovery instruction. Unremarkable and correct.

**Search empty state** `[observed]`: `No results found`, rendered before any query is
entered on both `docs.helpscout.com` and the category pages — the same pre-query
no-results defect found on Front's help centre. Two of the three products in this batch
ship it.

## T8 Empty states

`[observed]` — one: `No results found` in documentation search, present on page load
before any query. Same defect class as Wise's empty-quote no-results string and Front's.

In-product empty states are behind auth. `[absent]`

The documentation does describe one **deliberate emptiness**: Closed conversations
"appear at the bottom (**if displayed**)" — i.e. the default folder view hides them, so
the calm inbox is achieved partly by making the finished work invisible rather than by
clearing it. Worth noting as a design-through-defaults decision rather than a copy one.

## T9 Notifications & system messages

`[documented]`

**Follow notifications are enumerated as four triggers** — the clearest notification
disclosure in this batch:

> "You will start receiving email notifications alerting you when any of the following
> actions happen: The customer replies / Another Help Scout User replies / A note is added
> / The conversation assignment changes"

Four bullets, each a complete sentence in the present tense, naming the actor. A user can
decide whether to follow on the basis of that list alone. Compare Front, which lists nine
ways you might *become* subscribed but never enumerates what a subscription will actually
send you.

**Unsubscribe is offered in the notification itself** `[documented]`:
"Click **Unfollow** link at the bottom of any email notification. The link will open in
Help Scout and you'll see a confirmation that you have unfollowed the conversation."
The email carries the off-switch, the off-switch is the same word as the on-switch, and
the result is confirmed on landing. (The instruction has a missing article — "Click
**Unfollow** link" should be "the **Unfollow** link".)

**Confirmation messages are described rather than quoted** `[documented]`:
"You'll see a green confirmation message stating that you are now following that
conversation." The colour is specified, the string is not. Recorded as a gap — Help Scout
documents the *existence* and *colour* of its toasts but not their text.

**Reply-by-email is a documented capability**: an article titled
`Respond to Email Notifications to Take Action in Help Scout` — so notification emails are
a two-way surface, not just alerts.

**Proactive customer-facing messaging** `[observed]` on the homepage, three named uses:
`Welcome and onboard` ("Help customers start strong with a friendly nudge toward your best
resources") · `Gather feedback and NPS®` · `Share what's new` ("Use modals and banners
in-app or on your website…"). `NPS®` carries the registered-trademark mark, correctly.

**Auto-reply**: `Auto reply` — "Send customers a confirmation as soon as their message is
received." (See T5 for the duplicated-definition defect attached to this row.)

## T10 Disclosures, legal & compliance

**Plan prices** `[observed]`, with a `Monthly` / `Annual` toggle marked `-16%`:

| Plan | Price | Positioning line | Primary CTA |
|---|---|---|---|
| `Free` | not priced on the cards; described inline | "Just need the basics? The **Free plan** includes 5 users, 1 Inbox, and 1 Docs site." | `Start with Free` |
| `Standard` | `$25` `per user/mo` | "For growing teams looking to automate more tasks and move beyond email." | `Try for Free` |
| `Plus` `Popular` | `$45` `per user/mo` | "For teams managing higher volume and complexity across multiple channels." | `Try for Free` |
| `Pro` | `$75` `per user/mo` | "For teams that need the highest level of scale and security." | `Book a Demo` |
| `AI Answers` `Add-on` | `$0.75` `/resolution` | "Scale capacity with an AI assistant that instantly resolves customer requests. Pay per resolution on a monthly basis." | — |

The `Popular` badge is on the **middle paid tier**, the conventional and defensible
placement. (Compare Front, which badges its most expensive plan `most popular`.)

**Plan positioning lines all begin `For teams…` or `For growing teams…`** — each plan is
described by *who it is for*, not by what it contains, with the contents listed separately
under `Get core features like...` / `Everything in Standard and...` /
`Everything in Plus and...`. The `Everything in X and...` construction avoids repeating
the lower tier's list, which is standard, and the ellipsis keeps it conversational.

**Overage pricing is stated inline in the matrix rows**, not in footnotes:
`2 (additional Inboxes $10/mo)` · `2 (additional sites $20/mo)`. And the FAQ restates it
with both billing frequencies: "additional Inboxes beyond the number included in your plan
are available for $10 per month when paid annually (or $12 per month)."

**Plan ceilings are stated twice and inconsistently.** The `Inboxes` row gloss says
"Maximums by plan: Free (1), Standard (20), Plus (50), Pro (unlimited)" while the same
row's cells read `1`, `2`, `5`, `10`. The two numbers mean different things — *included*
versus *maximum purchasable* — but nothing in the row says so, and the cells and the gloss
directly contradict each other at a glance. **A real disclosure defect on a pricing page.**
The `Light users` row has the same shape ("Maximums by plan: Plus (25), Pro (50)" against
cells reading `5 included` and `15 included`) but at least uses the word `included` in the
cells, which disambiguates it.

**AI metering is defined with unusual precision** — see T7. The three-part structure is:
what counts as a resolution → what does not count → the per-conversation cap. Plus a
separate FAQ on spending caps and a separate one on the three-month free trial.

**Trial disclosure** `[observed]`: 15 days, Standard or Plus only, "no credit card
required", Pro requires sales contact.

**Payment methods** `[observed]`: "We accept major credit cards, including Visa, American
Express, Mastercard, and Discover. For some annual payments, wire or ACH transfer is also
available. Free accounts don't need to add a payment method." The last sentence is the
useful one — it closes the "will you ask for a card on the free plan" question.

**Discount programmes named, not hidden** `[observed]`:
"The Help Scout for Good program offers discounts for qualifying non-profits and B
Corporations. We also have a startup plan designed to accommodate early-stage companies."

**Security and compliance as plan rows** `[observed]`: `HIPAA compliance`
("Safely store protected health information (PHI) in Help Scout") — `Add-on` on Plus,
included on Pro; `SSO/SAML` and `IP restrictions` as add-ons on Standard and Plus.

**Legal artefact index** `[observed]` — the accessibility page renders the full policy
list, which is itself a good disclosure IA:
`Terms of Service` · `Privacy Policy` · `Security` · `Data Processing Amendment` ·
`Cookie Policy` · `List of Sub-processors` · `Accessibility Statement` ·
`Acceptable Use Policy` · `AI Transparency`.

Nine policies under one header, `Policies and Procedures`, with the framing sentence
"We're committed to keeping your data secure, your private information private, and being
transparent about our practices as a business." Publishing a **sub-processor list** and an
**AI Transparency** page as standing links (rather than on request) is above the norm.

**`Do Not Sell`** appears in the footer as a link with `href="#"` — i.e. **a
privacy-rights control that points nowhere in the retrieved markup**. Presumably wired up
by JavaScript. Recorded as suspected, not confirmed, but it is the highest-consequence
broken-looking link on the site.

## T11 Help-centre architecture

Three levels: 6 collections → 27 categories with counts → articles. Discussed in T1.

**Article-title grammar — five shapes, and they are unusually imperative**

| Shape | Examples |
|---|---|
| Bare imperative verb phrase | `Assign Conversations`, `Merge Multiple Conversations From One Customer`, `Edit Threads and Notes`, `Forward Conversations Outside of Help Scout`, `Change the Customer on a Conversation`, `Move Conversations to Different Inboxes`, `Follow a Conversation`, `Create a New Conversation`, `Manage Voice Messages` |
| `Understand <noun>` | `Understand Conversation Icons and Colors` |
| `About the <noun>` | `About the Recently Deleted View`, `About the Waiting Sort` |
| `Use <noun>` | `Use @mentions in Notes` |
| Noun phrase | `Keyboard Navigation`, `Search Filters With Operators`, `Contact and Company Properties` |

**The dominant shape is a bare imperative in Title Case** — `Assign Conversations`, not
"How to assign a conversation" (Front) and not "How to use buffers" (Calendly). Three
products, three different default article-title grammars, all internally consistent:

- Help Scout: **Title Case imperative** — `Assign Conversations`
- Front: **sentence-case `How to` + infinitive** — `How to assign a conversation`
- Calendly: **sentence-case `How to` + infinitive** — `How to use buffers`

Help Scout's is the shortest and the least searchable against natural-language queries;
it reads as a table of contents rather than as a set of answers. The `About the <noun>`
shape is reserved for *concepts that are not tasks* (`Recently Deleted View`,
`Waiting Sort`) — the same conceptual/task marker Front achieves with `Understanding X`
and Calendly with `X overview`. **All three products independently invented a suffix or
prefix to mark the non-task article. That is a strong signal that the distinction is real
and that content designers should make it explicit.**

**`Sort by` controls on category pages** `[observed]`: `Sort by Default` · `Sort A-Z` ·
`Sort by Popularity` · `Sort by Last Updated`. Offering the reader four orderings of a
20-article category — including by recency of edit — is a small transparency move.

**Every article carries `Updated on <Month D, YYYY>`** `[observed]`. Observed values
include `May 1, 2026`, `June 4, 2025`, `June 11, 2025` — so the docs carry visible
staleness, and one of them is materially stale (see below).

**Print affordance** `[observed]`: every article has a `Print this article` control.
Uncommon in modern help centres and genuinely useful for procedural documentation.

**Defect, staleness:** `Follow a Conversation` states the feature "is available on the
Standard and Plus plans" — the pricing page lists four plans including `Pro` above Plus and
`Free` below. As written the sentence excludes Pro, the most expensive tier, which is
almost certainly wrong and is the result of the article predating a plan rename. A
plan-eligibility sentence that no longer matches the plan names is the highest-risk kind of
documentation staleness, and Help Scout has no per-article plan-eligibility component of
the kind Calendly ships (`Plans: All plans` with a `View plans` link) to keep it in sync.

## T12 FAQs

**Placement — pricing page only**, under `## FAQ`, seven questions with answers present in
the HTML. `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Can I add more Inboxes or Docs sites to my plan? | Yes; $10/mo and $20/mo respectively when annual, higher monthly; Free plan capped at 1 each. |
| 2 | What counts as an AI resolution? | One conversation resolved without human help; four disqualifying behaviours listed; one charge per conversation maximum. |
| 3 | Can I set caps on AI resolution spending? | Yes; monthly cap, automatic disable on hit, warning emails approaching it. |
| 4 | How does the free trial work? | 15 days on Standard or Plus, all features, no card; Pro trial via sales. |
| 5 | How does the 3-month AI Answers trial work? | Three months unlimited resolutions from account creation date. |
| 6 | What payment methods does Help Scout accept? | Four named card networks; wire/ACH for some annual payments; free accounts need none. |
| 7 | Do you offer discounts for startups or non-profits? | Named `Help Scout for Good` programme for non-profits and B Corps; separate startup plan. |

**Structural notes.** Seven questions, and **three of them are about the AI add-on** — Q2,
Q3 and Q5. On a page with four subscription plans and one add-on, 43% of the FAQ is about
the add-on. That tells you exactly where the buyer's uncertainty is, and Help Scout has
let the FAQ follow the anxiety rather than the product surface area. Correct instinct.

Q2 and Q3 form a pair: *what am I charged for* immediately followed by *how do I stop being
charged*. Sequencing the cost-control question directly after the cost-definition question,
rather than at the end with the other billing questions, is the right ordering for a
consumption-priced feature.

Q4 and Q5 are both trial questions but are kept separate rather than merged, because the
two trials have different lengths (15 days vs 3 months), different scopes (plan features
vs resolutions) and different start conditions (signup for a plan vs account creation).
Merging them would have produced an unreadable answer. **Splitting near-duplicate questions
when their answers diverge is the right call and most teams merge instead.**

Notably absent, as with Calendly: **no cancellation or refund question.** For a per-seat
subscription with a metered add-on, "how do I cancel" and "what happens to my data" are
not asked or answered on the pricing page.

`Do you offer discounts for startups or non-profits?` is the only question in the second
person plural directed at the company (`Do you offer…`); the rest are `Can I` / `What` /
`How does`. Minor, but it is the question where the reader is asking a favour, and the
grammar reflects it.

## T13 Terminology & glossary

| Term | Help Scout's usage | The alternative it rejected |
|---|---|---|
| `conversation` | The core object, universally. Never "ticket" anywhere on the site or in the docs harvested. | `ticket` (Zendesk, Freshdesk, and Front's opt-in layer) |
| `Inbox` | Capitalised, the shared workspace and a billable unit | "mailbox" — though the docs category URL is still `mailbox-and-user-settings` while the label says `Inbox Settings`, a visible rename fossil |
| `Docs` | Simultaneously the knowledge-base product, the help-site domain, and a collection inside the help site | "Knowledge base" — which the nav *also* uses for the same product |
| `Beacon` | The embeddable widget, described as "your embeddable support hub" | "widget", "messenger" |
| `note` | The internal message type | "internal note", "comment" (Front's word), "private reply" |
| `forward note` | A distinct thread type for outbound forwards | |
| `thread` | An individual reply or note inside a conversation | "message", "entry" |
| `User` | Capitalised in docs, a billable team member | "agent" — Help Scout avoids `agent` for humans and uses it only for AI ("AI agents that resolve 73% of interactions") |
| `Light user` | A non-billable viewer/collaborator | "viewer", "collaborator", "read-only seat" |
| `Contact` | The billable customer unit, deduplicated | "customer" — used interchangeably in prose |
| `Anyone` | The unassigned assignee value | `Unassigned` — which is the *folder* name for the same condition |
| `Mine` | The folder of conversations assigned to you | "Assigned to me" (Front's phrasing), "My queue" |
| `Follow` / `Unfollow` | Subscribe to updates | `Subscribe` (Front's word) — though Help Scout's own intro sentence says "lets you **subscribe** to a conversation", using the rejected word to define the chosen one |
| `Snooze` | Defer with a return time | "pend", "defer", "on hold" |
| `Send later` | Schedule an outbound reply | "schedule send" |
| `Saved replies` | Reusable answers | "macros" (Zendesk/Front), "canned responses", "templates" |
| `Workflows` | Automation rules; split into `basic` and `advanced`, plus `Manual Workflows` | "rules" (Front's word), "triggers/automations" (Zendesk's two words) |
| `Views` | Saved filtered lists | "queues", "saved searches" |
| `Tags` | The extensibility mechanism offered in place of custom statuses | |
| `Teams` | Assignable groups (Plus and Pro) | |
| `Recently Deleted` | The soft-delete destination | "Trash", "Bin", "Archive" |
| `Waiting Sort` | Ordering by time waiting | a `Waiting` *status*, which Front and Zendesk both have |
| `AI Assist` / `AI Drafts` / `AI Summarize` / `AI Answers` | Four named AI features, all `AI`-prefixed | Front's `Copilot`/`Autopilot`/`Smart QA` metaphor naming |
| `resolution` | The billable AI unit | "conversation", "deflection" |
| `Help Scout for Good` | The non-profit discount programme | |
| `The Supportive` | The named editorial brand for the blog | |

**Three observations.**

**`Saved replies` over `macros` is the single most characteristic naming choice.**
`Macro` is a programming word that Zendesk and Front both use. `Saved reply` describes the
artefact from the user's point of view (a reply, which you saved) with no borrowed
technical metaphor. The same logic runs through `Views` over "queues", `Workflows` over
"triggers and automations", and `Recently Deleted` over "Trash". **Help Scout consistently
picks the word a non-technical support agent would already own.** That is the mechanism
behind "learn the platform in less than an hour" — the promise is kept largely in the
lexicon.

**`AI agents` is used for software while `User` is used for humans.** "AI agents that
resolve 73% of interactions" sits on the homepage; the docs call people `Users` and
`Light Users`. The support industry's oldest word for a person (`agent`) has been
reassigned to the machine, and the people have been given the generic software word
(`user`). Probably unintentional, and it is the reverse of Front's split (`teammate` for
people, `agent` for measured workers). Worth flagging: whichever way you assign it, a
support platform in 2026 has to decide who `agent` means, and say so.

**`Docs` is overloaded three ways** (T1) and is the one clear terminology failure in an
otherwise disciplined lexicon.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the reader throughout; first-person plural for the
company ("We accept major credit cards", "We suggest using tags for that", "Our team
answers 99% of emails within 24 hours"). The company speaks as a visible actor including
when refusing ("It's not possible to…" is impersonal, but the substitute that follows is
"**We** suggest").

**Register — warm but not jokey.** Contractions throughout ("you'll", "don't",
"won't", "It's"). Occasional light phrasing: "Pictures are worth a thousand words they say"
· "Conversations can be colorful!" · "take all of the plan's features for a test drive" ·
"No rush to reply?" · "Just need the basics?" · "We'd love to show you the magic of Help
Scout." Exclamation marks appear but are rationed — roughly one per documentation article
at most, and none in the status definitions, the pricing table, or the legal pages.

**The tone gradient is much shallower than Front's.** Front runs
`tab hell` → neutral help → bare state names. Help Scout runs warm-neutral → warm-neutral
→ bare state names. There is no register cliff because there was never a register peak.
For a product whose whole proposition is calm, the *absence* of a tonal peak is itself the
consistent execution.

**Sentence length is short and the syntax is simple.** The three status definitions are
each two sentences: a definition, then an instruction for when to use it
("Set a conversation to *Pending* if…", "Set the status to *Closed* when…"). Definition
plus usage rule, in that order, in under 35 words each. That is the template.

**Numbers as trust devices** `[observed]`: `12,000+ companies`, `99% of emails within 24
hours`, `NPS is 7x higher`, `80% of customers are still here after 4 years`,
`56% more messages in their first year`, `73% of interactions`, `100+ platforms`,
`Status 99.99%`, `2 clicks`, `less than an hour`, `less than a day`. Almost every one is
bounded by a time period or a qualifier.

The ROI calculator is the exception and worth flagging: it renders large specific figures
(`$132,933` year-one savings, `455%` return on investment, a three-year table) from
user-entered assumptions, with only a lightly-worded caveat — "The average resolution rate
is 73%. Since AI Answers continuously improves, your savings will rise over time." The
second clause is an unbounded upward claim ("your savings **will** rise") presented next to
a precise dollar figure. Against the disciplined bounding elsewhere on the site, this is
the one place the numbers outrun the qualifications.

**Accessibility content** `[observed]` — **the strongest in this batch of five.**

- `Skip to content` link present, first in DOM, on every marketing page. (Front and Calendly: absent.)
- A published `Accessibility Statement`, linked from the footer of every page alongside `Terms` and `Privacy`.
- The statement names a **specific standard and admits the gap**: "We aim to meet or exceed the Web Content Accessibility Guidelines 2.1 Level A (WCAG 2.1 A) across all of our products. **We have work still to do, but we are moving toward that goal.**"
- It names four principles with substance behind each: `Set clear goals` · `Build accessibility in` ("a prioritized list of known accessibility issues … a measurable part of Help Scout's goals each quarter") · `Train our staff` ("True accessibility won't come from filling out checklists") · `Listen to feedback`.
- It gives a dedicated address and a **response-time commitment**: email `accessibility@helpscout.com` "with the URL you were on and any other relevant details … We aim to respond to you within two business days."
- It opens by rejecting the compliance framing: "Making Help Scout's products accessible to a broader range of people is not merely about technical compliance."

**This is a model accessibility statement**: a named standard, an honest admission of
non-conformance, an internal-process commitment with a cadence, a named contact, a
requested-information list, and a response SLA. The one weakness is the target itself —
**WCAG 2.1 Level A**, not AA, which is the level most procurement processes and most
public-sector buyers require. Stating A honestly is better than claiming AA falsely, and
the file should record both halves of that.

Alt text on marketing images is descriptive where it matters (`Avatars of members of our
Sales Team`) and uses filename-derived strings where it does not (`inbox-carousel--snooze`,
`Home - Feb 2025 - BentoBoxBlock - Why do 12,000+ companies choose Help Scout? - Ease of
use`). The latter are CMS entry titles leaking into the alt attribute — machine-generated,
not written, and they would be read aloud verbatim. **A real defect on a site with a
published accessibility commitment.** One image renders with an empty `src` and an
`Avatars of members of our Sales Team` alt, duplicated immediately by a populated copy.

Documentation screenshots carry no alt text at all — the same gap as Front. On an article
whose entire subject is *icons and colours*, that is the worst possible place for it.

**Negative findings, recorded honestly**

- Two identical feature definitions on the pricing page for `Office hours` and `Auto reply`.
- `Inboxes` row: cells (`1`/`2`/`5`/`10`) contradict the gloss ("Maximums by plan: Free (1), Standard (20), Plus (50), Pro (unlimited)").
- Four signup-CTA variants (`Start for Free`, `Start for free`, `Start with Free`, `Try for Free`) and three demo variants.
- `Real Estate` and `Property Management` are two nav entries pointing at one page; `Logistics` and `Manufacturing` likewise in the footer.
- Nav says `AI` and `Knowledge Base`; footer says `AI Chatbot` and links to `/self-service/`.
- `Docs` names three different things.
- `Anyone` (dropdown value) vs `Unassigned` (folder name) for one condition.
- `Follow a Conversation` says the feature is "available on the Standard and Plus plans" — stale against a four-plan lineup that includes Pro.
- Category label `Inbox Settings` against URL slug `mailbox-and-user-settings`; article `About the Waiting Sort` against slug `about-waiting-since`.
- "Click **Unfollow** link at the bottom of any email notification" — missing article.
- `No results found` rendered before any search query on docs pages.
- CMS-generated alt text (`Home - Feb 2025 - BentoBoxBlock - …`) on homepage imagery.
- `Do Not Sell` footer link has `href="#"` in the retrieved markup.
- Six thread types distinguished by border colour alone in the documented model.
- Toast/confirmation strings are described by colour but never quoted in documentation.

---

## Transferable patterns

1. **Reduce the state enum, then refuse to extend it, and name the substitute in the same
   sentence.** "It's not possible to edit existing status options or add custom values to
   the status menu. **We suggest using tags for that.**" Three states instead of six-plus,
   with the extensibility need redirected to an orthogonal, unordered mechanism. The
   transferable rule: **put the invariant lifecycle in `status` and everything
   team-specific in labels.** Condition: only works if you genuinely do not need to report
   on the team-specific distinctions as stages.

2. **A reduced state set buys you non-textual status signalling.** Bold + top for `Active`,
   plain for `Pending`, grey + bottom + hidden-by-default for `Closed`. Three states can be
   encoded in weight, position and colour simultaneously; six cannot. If you are arguing
   for fewer states, this is the argument — not brevity, but the ambient legibility that
   brevity makes affordable.

3. **Define every metered unit inline in the pricing comparison, including the
   deduplication rule.** "`Contacts` — Someone who received a reply from your team or had
   their question resolved by the AI assistant. Multiple conversations with the same person
   count as one contact." Directly applicable to any usage-priced product.

4. **For consumption pricing, publish what does *not* count.** Four disqualifying
   behaviours, the escape-hatch button quoted by name, a per-conversation cap, a
   user-settable spend cap, warning emails approaching it, and "you'll never be surprised
   at the end of the month". The most complete metered-billing disclosure in this batch.

5. **Choose the word the non-technical user already owns.** `Saved replies` not "macros",
   `Views` not "queues", `Workflows` not "triggers and automations",
   `Recently Deleted` not "Trash". The onboarding promise ("power user in less than a day")
   is kept in the lexicon before it is kept in the UI.

6. **Section headers as the reader's spoken question, in quotation marks.**
   `"What's our volume across channels?"` · `"How's our response time?"` ·
   `"Where can we improve?"` Turns a feature list into an answer list. Reusable anywhere an
   analytics or reporting surface needs headers.

7. **Publish an accessibility statement that admits non-conformance.** Named standard
   (WCAG 2.1 A), explicit "We have work still to do", a quarterly internal commitment, a
   dedicated address, a requested-information list, and a two-business-day response SLA.
   The admission is what makes the rest credible.

8. **Inline the status-page metric into the nav label.** `Status 99.99%` as a footer link.
   The link is the claim.

9. **Split near-duplicate FAQ questions when the answers diverge.** Two trial questions
   (15-day plan trial; 3-month AI trial) kept apart because length, scope and start
   condition all differ. Merging would have produced an unreadable answer.

## Caveats & gaps

- **All in-product strings are `[documented]`, not observed.** Toolbar labels, folder
  names, status values and assignment values come from documentation prose. Help Scout's
  docs bold or italicise UI strings, which raises confidence, but nothing here was seen in
  the running product.
- **Toast and confirmation copy is unavailable.** The docs describe a "green confirmation
  message" and an unfollow confirmation but never quote either. Empty states, validation
  messages and error dialogs are entirely absent from the public surface. `[absent]`
- **The status page was not opened.** `status.helpscout.com` is linked from every footer
  (as `Status 99.99%`) and was not fetched; component names, status levels and incident
  lifecycle labels are therefore unrecorded for this product, unlike Front.
- **The `/compare/` pages were not opened**, including
  `helpscout.com/compare/zendesk/` and `helpscout.com/compare/frontapp/`. The Zendesk
  comparison in T6 is built from Zendesk's own public documentation rather than from Help
  Scout's competitive page, which is the more defensible source but means Help Scout's own
  framing of the difference is unrecorded. The `frontapp` comparison would directly
  complement corpus entry #189.
- **The Zendesk comparator is a single article.** T6 characterises Zendesk from one
  public help page (`About the ticket lifecycle and ticket statuses`). Zendesk's custom
  statuses, status categories and the February 2024 `In Progress` addition are described
  from that page only; no wider Zendesk harvest was done and none should be inferred from
  this file.
- **Only three of six documentation collections were entered**, and only three articles
  were read in full. `Productivity` (24 articles, covering Workflows and Views),
  `Inbox Settings` (22), `Beacon` and `Docs` are unharvested. The Workflow condition and
  action vocabulary — likely the richest T5 material in the product — is missing.
- **`AI Transparency`, `Security`, `List of Sub-processors` and `Acceptable Use Policy`
  were identified but not read.** For a T10 section this is a real gap.
- **The ROI calculator's default input values were not recorded**, so the dollar figures
  quoted in T14 correspond to whatever defaults the page rendered and should not be treated
  as Help Scout's own published claim.
- Only en-US observed. No locale switcher was found on the marketing site.
- Mobile app strings out of scope.

## Sources

1. https://www.helpscout.com/
2. https://www.helpscout.com/pricing/
3. https://docs.helpscout.com/
4. https://docs.helpscout.com/category/23-working-with-conversations
5. https://docs.helpscout.com/article/11-understand-conversation-icons-and-colors
6. https://docs.helpscout.com/article/842-assign-conversations
7. https://docs.helpscout.com/article/671-follow-a-conversation
8. https://www.helpscout.com/company/legal/accessibility-statement/
9. https://support.zendesk.com/hc/en-us/articles/8263915942938-About-the-ticket-lifecycle-and-ticket-statuses — comparator only, used for the Zendesk state set in T6
