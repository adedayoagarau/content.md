# 016. Loom

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Async video messaging / screen recording |
| Primary URL | https://www.loom.com/ |
| Corpus rank | 016 |
| Benchmark strength (source list) | Recording setup and privacy cues |
| Locale / market observed | en-US |
| Platform observed | Web (desktop marketing), Atlassian Support docs, Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR (dedicated article), HIPAA (article answers the question), SOC 2 Type II (report downloadable), country-availability restrictions article; no financial regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — marketing global nav and footer are client-rendered and did not appear in server HTML; help corpus fully reachable |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / product | https://www.loom.com/ | Hero, benefit blocks, use-case grid, feature list, testimonial rail |
| Pricing | https://www.loom.com/pricing | Four plans, full feature matrix by category, 11-question FAQ block |
| Screen recorder (SEO product page) | https://www.loom.com/screen-recorder | Feature bullets, step-by-step FAQ answers naming in-product buttons |
| Support hub (entry) | https://support.loom.com/hc/en-us → https://support.atlassian.com/loom/ | Old Zendesk help centre 301s to Atlassian Support; seven routing tiles |
| Documentation index | https://support.atlassian.com/loom/resources/ | **Richest source** — full two-level IA plus ~190 article titles in one page |
| Knowledge base index | https://support.atlassian.com/loom/kb/ | Renders as an empty index — see T8 |
| Privacy settings (article) | https://support.atlassian.com/loom/docs/use-looms-privacy-settings/ | The three access levels and the admin restriction matrix |
| Permissions & privacy (article) | https://support.atlassian.com/loom/docs/manage-the-permissions-and-privacy-of-your-videos/ | `Link Settings`, `More options`, `Can edit` |
| Workspaces, roles & permissions | https://support.atlassian.com/loom/docs/understand-workspaces-roles-and-permissions/ | Role vocabulary and permission grids |
| Chrome extension permissions explained | https://support.atlassian.com/loom/docs/chrome-extension-permission-requests-explained/ | Defensive permission-anxiety article — see T10 |
| Status page | https://www.loomstatus.com/ → https://loom.status.atlassian.com | Four components, five-value severity scale |
| Security measures (from /security) | https://www.loom.com/security → https://www.atlassian.com/legal/security-measures | `/security` now 301s to Atlassian legal — see Caveats |

---

## T1 Navigation & IA labels

**Marketing global nav** `[absent]` — `www.loom.com` ships the nav behind a JS
menu component; server HTML contains only `Toggle menu close` and the logo link.
Footer groupings likewise absent. Not inferred.

**Support hub routing tiles — seven, each label + one-line scope** `[observed]`
(https://support.atlassian.com/loom/)

| Tile | Scope line (verbatim) |
|---|---|
| `Documentation` | "Get help using and administering apps." |
| `Knowledge Base` | "Find troubleshooting articles." |
| `Community` | "Find answers, support, and inspiration from other Atlassian users." |
| `System Status` | "Check the health of our cloud apps and services" |
| `Suggestions and bug reports` | "Find existing feature suggestions and bug reports." |
| `Billing and licensing` | "See FAQs about billing and licensing." |
| `Loom roadmap` | "Get an inside view on the latest and upcoming features we're building…" |

Note the split: `Documentation` is for *doing*, `Knowledge Base` is explicitly
scoped to *troubleshooting*. Most products conflate the two. Loom/Atlassian
separates happy path from unhappy path at the top level of the support hub.
The tile CTA is the destination noun, not "Learn more":
`View documentation` · `View knowledge base` · `View system status` ·
`View suggestions and bugs` · `View FAQs` · `View roadmap` · `Visit Atlassian Community`.

**Documentation top level — eight categories** `[observed]`
(https://support.atlassian.com/loom/resources/)

1. `Get started with Loom`
2. `Set up your recorder`
3. `Sharing and collaboration`
4. `Account management`
5. `Workspace administration`
6. `Record, manage and edit your videos`
7. `Billing and plans`
8. `Recording tips and security`

The grammar is mixed by design: five are **imperative verb phrases addressed to
the user** (`Set up your recorder`, `Record, manage and edit your videos`) and
three are **noun-phrase domains** (`Account management`, `Billing and plans`).
The verb-phrase ones are the ones a user is actively trying to do; the
noun-phrase ones are the ones a user is trying to *find*. That is a defensible
split rather than an inconsistency.

**Second-level sub-categories are the real artefact** `[observed]` — nearly all
are imperative and several are unusually warm for a support IA:

`Intro to Loom` · `Create your first recording` · `Understand and navigate your
account` · `Install and set up Loom on your device` · `Choose your recording
mode` · `Use different sharing options` · `Embed videos into third-party apps` ·
`Elevate team collaboration with available features` · `Update your account
settings` · `Set up and manage login settings` · `Troubleshooting common account
issues` · `Configure Atlassian-managed accounts` · `Invite and manage team
members from a workspace` · `Be in charge of your workspace using Admin
privileges` · `Inspect video data and generate usage reports` · `Unlock
productivity with Meeting Recordings` · `Trim and edit your recordings` ·
`Enhance and personalize your videos` · `Organize and control your content` ·
`Automate daily tasks with AI` · `Discover Loom's different plans` ·
`Upgrade, change or cancel your plan` · `Find invoices for your subscription` ·
`Integrate Loom with other tools` · `Support Contact and Resources` ·
`Learn and grow with real use cases` · `Security and privacy common questions`

`Be in charge of your workspace using Admin privileges` and `Unlock productivity
with Meeting Recordings` are marketing register leaking into support IA — see T14.
`Support Contact and Resources` is the one title-cased outlier in a sentence-case
set (defect, T14).

**In-product IA named in help titles** `[documented]`:
`Loom Home` · `Library` (Personal / Shared / Team) · `Spaces` ·
`all-company space` · `Shared with me` · `Watch later` · `Insights Hub` ·
`Workspace settings` → `Security` → `Access and viewing` /
`Default permissions` · `Personal Settings` · `Notifications page`.

## T2 Value proposition & headline patterns

**Hero** `[observed]` (loom.com)

> Headline: `One video is worth a thousand words`
> Subhead: "Easily record and share AI-powered video messages with your teammates and customers to supercharge productivity"

The headline is a proverb-rewrite, not a task name — the opposite of the Wise
pattern. It works because the product category (async video) needs a *reason to
exist* before it needs a task label. The subhead then carries all four functional
claims (record, share, AI, audience) in one sentence, plus the weakest word on
the page, `supercharge`.

**Section headers escalate through a "not just X" ladder** `[observed]`

1. `The easiest screen recorder you'll ever use` — with the tricolon subhead "Record in a few clicks. Share anywhere. Collaborate better."
2. `Lightning fast screen recording`
3. `So much more than a screen recorder`
4. `Video messaging for all use cases`
5. `Powerful features for easy, custom recordings`

Header 1 claims the category, header 3 disclaims it. Loom explicitly sells
against its own SEO term: it ranks for "screen recorder" and then tells the
visitor the product is more than that. The SEO landing page
(`/screen-recorder`) does the reverse and stays entirely inside the term
(`Free Screen Recorder`, `Top features of Loom's free screen recorder`).
**Two headline strategies running on two pages for the same product**, split by
acquisition intent — a deliberate and reusable content-ops decision.

**Benefit-block pattern — imperative title + mechanism + rhetorical question**
`[observed]`

- `Edit your videos like a pro` — lists the editor verbs (trim, stitch, backgrounds, text/arrows/box overlays), then: "The result? Engaging videos you can deliver fast."
- `Share or embed video anywhere you work`
- `Engage and connect with video`
- `Keep your content safe`

The self-asked "The result?" is the only rhetorical question on the page.

**Announcement block** `[observed]`: eyebrow `New!` then
`Ship faster with AI bug reports`. Verb-first, outcome-first, feature-second —
the feature name (AI bug reports) is the object of the benefit, not the headline.

**Pricing headline** `[observed]`: `Choose the plan that fits your needs.` —
generic, and notably punctuated with a full stop while the hero headline is not.

**Numbers used as trust devices** `[observed]`, and they disagree with each
other across pages (recorded as a defect in T14):
`over 22 million people` (meta description) ·
`Millions of people across 400,000 companies choose Loom` (home) ·
`More than 25 million people across 400,000 companies` (home footer band and
pricing) · `over 21 million people` (support docs meta description).

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Loom for free` | Home, social-proof band and page foot | Lowercase "free" |
| `Get Loom for Free` | Pricing, `/screen-recorder` | **Same CTA, capitalised differently on different pages** |
| `Signup for Free` | `/screen-recorder` hero | **`Signup` as one word — defect** |
| `Sign up` | Pricing, Starter plan | The plain form |
| `Download now` | Home, recording block | |
| `Record now` | Home, editor block | Verb = the core action |
| `Start sharing` | Home, integrations block | |
| `Connect over video` | Home, engagement block | Coined verb phrase, not a system action |
| `Try for free` | Pricing, Business and Business + AI | |
| `Let's Talk` | Pricing, Enterprise price slot | **A CTA occupying the price field** — the price is replaced by a conversation, not by "Custom" |
| `Contact Sales` | Pricing Enterprise, page foot | |
| `Learn more` | Home ×3 (AI bug reports, security, enterprise) | **Bare `Learn more`, three times on one page** — see note below |
| `See all use cases` | Home | |
| `See all features` | Home | **Links to `/pricing`, not to a features page** — label/destination mismatch |
| `See all features` | Pricing, inside each plan card | Same string, different behaviour (expands the matrix in place) |
| `View more` | Logo wall | Progressive disclosure |
| `Explore our blog` | Home | |
| `Read the article` | Blog cards | |
| `Get the Apps` | `/screen-recorder` | |
| `Try our discounted plan` | Pricing, education line | |
| `Report a problem` | Status page | Primary and only action on status |
| `Subscribe to Updates` | Status page | |
| `Try Now` | Status page banner | Weakest label in the set — no object |
| `Ask the Community` | Every help article, under `Still need help?` | Human help offered last |
| `Skip to content` | Top of DOM, loom.com | Accessibility |
| `Skip to main content` | Top of DOM, support.atlassian.com | **Two different skip-link strings across the same product's surfaces** |

**On `Learn more`.** Loom is the inverse of the Wise pattern: it ships bare
`Learn more` in the three highest-stakes home-page blocks — the new AI feature,
`Keep your content safe` (security), and `Loom for Enterprise`. Each sits under a
heading that supplies the object, so it is defensible, but security and
enterprise are exactly the places where a specific label
(cf. Wise's `How we keep your money safe`) would carry the reassurance.
Recorded as a negative finding.

**Verb inventory for one action.** Recording is invited with `Record now`,
`Download now`, `Start sharing`, `Connect over video`, `Get Loom for free`,
`Signup for Free`, `Sign up`, `Try for free` — eight labels across three pages
for what is functionally one funnel. The pricing page alone uses `Sign up`,
`Try for free`, and `Contact Sales` in parallel plan cards, which is correct
tiering; the marketing pages are not tiered.

## T4 Onboarding & getting-started

**No `how it works` numbered sequence on the home page.** `[absent]` The
marketing site skips the 3-step explainer entirely — unusual for the category —
and substitutes feature blocks. The step sequence lives in the FAQ instead.

**Seven-step recording sequence, written in the FAQ under a user question**
`[observed]` (`/screen-recorder`, under `How do I record my screen?`).
Summarised: sign in or sign up → download and install → open and click `Record`
→ choose screen or entire desktop → pick a microphone → `Start Recording` →
`Stop Recording`, which auto-uploads. The eighth line is not an instruction but a
reassurance: the app creates the share link for you.

The notable move: **the sequence names in-product button strings verbatim inside
marketing copy** — `Record`, `Start Recording`, `Stop Recording`, `Screen Only`,
`Screen and Camera`, `Audio Capture`, `Stop`. A pre-auth visitor can read the
exact labels they will see. Loom also states the transition cue in prose:
"A three-second countdown timer will appear, then your recording will begin."
Countdown-before-capture is a *recording-specific onboarding cue* and Loom
documents it publicly rather than leaving it as a surprise.

**Onboarding IA in help** `[observed]`: the first-run path is a named category,
`Create your first recording`, and its first article is
`Understand your default recording settings` — defaults are treated as something
to be *understood* before anything is changed. Adjacent first-run articles:
`How long can I record?` · `Track your recording time` · `Restart a recording` ·
`Pause and resume while recording`. Three of the five first-run articles are
about **limits and recovery**, not capability.

**Adoption help written for the sender, not the user** `[observed]`:
`Make it easy for your team to join your Workspace` ·
`Advanced onboarding with Loom` · `Replace a meeting with Loom` ·
`Use Loom for introductions` · `Community Looms`.

## T5 Form & field labels

Pre-auth forms are thin; most labels are `[documented]` from help bodies.

**Pricing-page controls** `[observed]`
- `Team size:` with a bare unit suffix `users`
- `Bill me:` toggling `Monthly` / `Annually`, with the badge `SAVE UP TO 17%`

`Bill me:` is second-person-as-object ("bill me") rather than the usual
"Billing period" — the user speaks the label, the system does not.

**Status page subscription form** `[observed]`
`Email address:` · `Enter OTP:` · `Country code:` · `Phone number:` ·
`Channel's Webhook URL:` · `Change number` · `Resend OTP` ·
`Resend OTP in: 30 seconds` · `Didn't receive the OTP? Resend OTP`.
Trailing colons on every label. Inline recovery (`Didn't receive the OTP?`) is
placed adjacent to the failure point, before any failure — the Wise
`Trouble logging in?` pattern.

**Share-dialog labels** `[documented]`
`Share` (the button above every video) → `Link Settings` → `More options` →
`Can edit` (a toggle, phrased as a capability the grantee has, not as a role name).

**Admin setting labels** `[documented]`
`Allow public links` / `Workspace viewing only` — a binary written as two named
outcomes rather than an on/off of one feature. The negative option carries the
constraint in its own label, so an admin can choose without reading help text.

## T6 Status & state language

**Content lifecycle states** `[documented]` — Loom models content state as a
four-stop ladder, each with its own article:
`archived` (`Archive your videos`, `Video archiving` as a plan feature) →
`deleted` (`Delete your videos`) →
**`permanently deleted`** (`Understand permanent video deletion`).
Shipping a separate article for the *permanent* stop is the notable decision:
`delete` and `permanently delete` are treated as materially different states that
the user must be able to tell apart. Spaces get the same pair:
`Archive or delete a space`.

**Membership states** `[documented]` — `deactivate` and `reactivate` are the
verbs, distinct from `delete`:
`How to leave and deactivate users from a workspace` ·
`Delete members in a Workspace` ·
`Can deactivate & reactivate workspace members`.
The pricing FAQ confirms the money consequence of the state:
if a Creator is downgraded they keep Creator access for the rest of the cycle;
if a member is deactivated the seat forfeits fees and access for the rest of the
billing cycle. **Two different states, two different refund outcomes, stated in
one FAQ answer** — plan-state copy that does the disclosure work inline.

**Maturity labels** `[observed]`, three in use with no visible rule:
`NEW` (uppercase badge, pricing and home) · `New!` (home announcement eyebrow) ·
`BETA` / `(BETA)` (`Variables (BETA)`) · `(Beta)` (`Salesforce (Beta)`) ·
`(beta)` (`Turn your Loom video into a Confluence document (beta)`).
Four casings of "beta" across two pages — recorded as a defect.

**Deprecation state written into an article** `[observed]`, and it is the
strongest state string in the harvest. The roles article opens with a dated
forward-looking notice: accounts created after February 2026 will only have Admin
and Creator roles, and `Creator Lite` will be deprecated for new users then and
for existing users "on a rolling basis". Loom documents a role that is *being
removed*, names the cut-off date, and distinguishes new-user from existing-user
timing. The same article also holds the transition gloss:
"we will refer to both Users and Creators. Those roles have the same access,
just different names." **A product openly telling users that two of its own
labels mean the same thing** is rare and honest.

**Status-page severity scale** `[observed]`, five values:
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`. Components are **user activities, not services**:
`Recording` · `Viewing` · `Authentication` · `Loom AI`. Roll-up reads
`All Systems Operational`. A user who cannot record can self-diagnose without
knowing Loom's architecture — the component naming is the transferable part.

## T7 Error, failure & recovery

`[observed]` as titles in the documentation index; bodies mostly unread.

**First-person confession titles, used sparingly** — Loom has the pattern but
only in the account-trouble cluster:
- `Can't find my videos`
- `Can't access my account`
- `I'm not receiving verification or password reset emails from Loom`
- `Trim and stitch features are unavailable for my video`

Note the drift inside one four-item list: two start with a bare `Can't`
(subjectless), one with `I'm`, one with a system subject
(`Trim and stitch features are unavailable…`). Three grammars for one cluster.

**Wrong-account failures get their own article**, which is a genuinely specific
piece of content design:
`What to do if Loom is automatically logging you into the wrong account` ·
`Check what Loom account you're logged into`. Silent-wrong-account is the classic
multi-workspace SaaS failure and Loom names it in full rather than filing it
under "login issues".

**`Resolving…` is the system-failure prefix** `[observed]`:
`Resolving errors with Meeting Recording` ·
`Resolving issues with multiple Loom Notetakers in a meeting`.
So Loom runs a register split: `Can't…` / `I'm…` when the user is stuck,
`Resolving…` when the system misbehaved. That matches the Wise principle
(confession titles only for user-caused errors) without being stated.

**`Problems` as a bare noun** `[observed]`: `Billing problems`.
**Named third-party failure**: `Google Authorization error when importing Google
Workspace contacts` and `Payment with an India-issued debit or credit card` —
Loom, like Wise, ships articles for a *specific* issuer/provider failure mode.

**Limit framed as a removable obstacle** `[observed]`:
`Remove the 5-minute recording limit`. Filed under *troubleshooting common
account issues*, not under billing. The plan limit is treated as a problem the
user is having, which is commercially self-interested but content-wise correct —
that is where the user looks.

**Recovery-from-own-edit** `[observed]`:
`Revert your trimmed video back to the original version` ·
`Fix mistakes without re-recording using text-to-speech` ·
`Correct your transcript` · `Manually regenerate transcripts or edit AI features`.
Every destructive or automated action has a named undo article, including undo of
*AI output*. `Fix mistakes without re-recording` sells the undo by naming the
cost it avoids.

**Eligibility-as-error** `[observed]`:
`Make videos eligible for AI-editing features` ·
`Trim and stitch features are unavailable for my video` ·
`Existing Loom Enterprise members are unable to join Atlassian Loom workspaces` ·
`Why can't I access Loom in my country?`. The last is a geo-restriction article —
Loom documents its own unavailability.

## T8 Empty states

`[observed]` — one, and it is a defect.

`https://support.atlassian.com/loom/kb/` renders the heading
`# Loom Knowledge Base` followed by a horizontal rule and then immediately
`More ways to get help`. **No articles, no "no articles yet" message, no
explanation.** The support hub tile promises "Find troubleshooting articles." and
the destination is blank with no empty-state copy at all. This is the
zero-content case going unhandled at the exact moment a user has already failed
once and clicked into troubleshooting.

**Status page "good" empty state** `[observed]`, handled well:
`No incidents reported today.` for the current day and
`No incidents reported.` for prior days. Two strings, differing only by `today`,
so the current day is distinguishable at a glance in a long list. Fifteen
consecutive clean days render as a readable wall rather than a repeated identical
line.

In-product empty states (empty Library, empty Spaces, no search results) are
behind auth. `[absent]` — `Understand your Library` and `Navigate your library`
were not opened for body copy.

## T9 Notifications & system messages

**Notification design is itself a user-facing topic** `[documented]`:
`Understand the notifications page` · `Manage your notifications` ·
`Prevent Loom desktop app update notifications`. The third is notable — Loom
publishes how to suppress *its own* update nags.

**Automated outbound messaging is a paid feature with plain names** `[observed]`,
pricing page: `Auto-meeting recap emails` and `Auto-meeting notes`, both badged
`NEW`. Also `Auto CTA` · `Auto Titles` · `Auto Summaries` · `Auto Chapters` ·
`Auto Tasks`. The `Auto-` prefix is used consistently as the marker for
"generated without you asking" — a small, legible naming convention for AI
output that a user can learn once.

**In-recording system cues** `[documented]`: the three-second countdown timer;
`Do not disturb` as a named recording mode (suppresses the user's own OS
notifications during capture). `Do not disturb` borrows an OS-familiar label
rather than coining one.

**Status page banner** `[observed]`, and it is weak: an org-admin upsell sits
above the fold on an incident page — "Organization administrators can now receive
personalized incident information in Atlassian Administration. Subscribe to
System Health…" with the CTA `Try Now`. A promotional banner on a status page,
with an objectless CTA. Recorded as a negative finding.

**Subscription channel copy** `[observed]`, well-bounded: "Get email
notifications whenever Loom **creates**, **updates** or **resolves** an
incident." versus SMS, which promises only "whenever Loom **creates** or
**resolves** an incident." The SMS promise is deliberately narrower and the copy
says so rather than implying parity. **Per-channel scoping of the same
notification promise** is the reusable pattern here.

## T10 Disclosures, legal & compliance

**The flagship item: a defensive article about a permission dialog Loom does not
control** `[observed]`
(`Chrome extension permission requests explained`).

Structure, summarised: it names the two in-product strings the user just saw
(`"Loom requires new permissions"` and the `Re-enable` button), then *quotes the
scary Chrome string back at the user* — "Read and change all your data on the
websites you visit" — identifies it as the specific bullet that alarms people,
explains which two features require it (inline video expansion, grabbing your
videos), and then pivots to reassurance.

It is worth recording exactly how the reassurance fails, because the failure is
instructive:

- It leads with an unverifiable promise in bold — the article's own words are that Loom respects privacy and security "above all else" — rather than with a scope limit.
- It makes an existential appeal: without users' trust, Loom "would cease to exist."
- It blames the platform's wording: "It's unfortunate that the messaging for Chrome reads the way it does."
- It minimises by comparison, telling the reader to go check their other extensions at `chrome://extensions` and that many will have the same requirement.
- It drops into **first-person singular** — "I'm sure many others have that same requirement" — in an otherwise corporate-voice help centre.

So the *placement* is exemplary (address the anxiety where it occurs, quote the
alarming string verbatim, name the features that need the permission) and the
*argument* is weak (assertion, appeal, deflection, whataboutism). This is the
single most useful artefact in this file: it separates "having a permission
disclosure" from "having a good one."

**Access-level disclosure is written as consequence, not as capability**
`[observed]` (`Use Loom's privacy settings`). Three named levels:

| Level | What the copy says (summarised) |
|---|---|
| `Public` | Anyone with the link can view; no login or Loom account needed. Also discoverable in Atlassian search by anyone in the workspace. |
| `Open to workspace` | Viewable and discoverable by anyone in the workspace **if logged in**; people outside can *request* to view. |
| `Restricted` | Viewable and discoverable only by the specific people whose email was added when sharing. |

Two things to steal. First, the `Public` description states a **negative
guarantee alongside the exposure**: Loom videos are never indexed by Google or
any search engine outside Atlassian. The disclosure tells you both how far the
link reaches *and* where it stops — exposure and its bound in the same breath.
Second, `Open to workspace` gives the excluded outsider an action
("can request to view") instead of a dead end, so the access model includes its
own escalation path.

**A second, longer vocabulary for the same three levels.** The share dialog and
admin settings use sentence-shaped labels, not the level names:
`Anyone with the link` · `Members of this Workspace` ·
`Only people added can access`. So `Public` = `Anyone with the link`,
`Open to workspace` = `Members of this Workspace`, `Restricted` =
`Only people added can access`. **Two complete naming systems for one three-value
setting** — short nouns in documentation headings, full audience descriptions in
the UI. Arguably correct (the UI names the audience, the docs name the concept)
but it means help and product do not share a string, and a user searching the
docs for the label they saw will not find it.

**Admin restriction copy states the residue** `[observed]`. The public-link
permission has two values, `All users` and `Only certain groups`, and the
explanatory copy for the restricted case spells out what remains available —
restricted Creators can still choose `Members of this Workspace` or
`Only people added can access`, and even exempted groups get
`Members of this Workspace` as the default. It then handles the migration case
explicitly: existing public videos keep their setting; but if a restricted user
changes such a video's privacy, **they cannot change it back to public**. A
one-way door, disclosed before it is walked through.

**Default-setting scope, stated three times.** Across two articles the copy
repeats that privacy defaults "only apply to new videos" and existing videos are
not impacted. Deliberate redundancy at the point where an admin would otherwise
assume a retroactive sweep.

**Embed-privacy consequence** `[observed]`: if a video is `Open to workspace` or
`Restricted`, its preview thumbnail is **hidden by default** in embeds — with
`Remove private video thumbnails from embeds` as a separate article. The
second-order leak (a private video's thumbnail showing in a public embed) is
named and defaulted safe.

**Plan and billing disclosures** `[observed]`, pricing page. `$0` printed as the
Starter price rather than the word "Free". `per user / month` as the unit.
`Let's Talk` in place of an Enterprise price. Education discount handled in one
line with a link rather than a plan card. The billing FAQ discloses a competitive
awkwardness in the open: it states that buying Loom on Atlassian.com versus
Loom.com yields different feature access as of a named date, lists the four
things only Atlassian.com buyers get, explains the two different annual billing
models (distinct paid users vs. user tiers), and commits to updating the article.
**A pricing FAQ that tells you the other checkout is currently better** is an
unusual disclosure choice.

**AI data-use disclosure, scoped tightly** `[observed]`, pricing FAQ under
`How is my data used?`: the answer leads with the specific — OpenAI receives
transcript data as text files to generate titles and summaries, and does not
receive full videos or audio — before the generic sub-processor paragraph.
Naming the vendor, the data type, the purpose, and **the data it does not
receive**, in that order, is the pattern. Sub-processor list and AI terms are
linked out rather than summarised.

**Compliance surface named as user questions** `[observed]`:
`GDPR compliance` · `Is Loom HIPAA Compliant?` ·
`Download the Loom SOC 2 report` · `Understand Loom data residency` ·
`Copyright infringement and DMCA takedown requests` ·
`Reporting abhorrent content` · `Why can't I access Loom in my country?`.
`Reporting abhorrent content` is a striking word choice — "abhorrent" is
legislative language (Australian AVM law) retained rather than softened to
"inappropriate".

**Regression in the disclosure surface** `[observed]`: `loom.com/security` —
linked from the home page under `Keep your content safe` with a `Learn more` —
301s to Atlassian's generic `Technical and Organisational Security Measures`, a
twenty-section NIST-800-53-mapped legal document effective October 2025. The home
page promises product-specific reassurance ("We offer SSO, SCIM as well as custom
data retention policies and privacy settings") and delivers corporate legal text
with no Loom-specific content beyond a single mention of `loomstatus.com`.
A user-facing security page has been replaced by a compliance artefact.

## T11 Help-centre architecture

**Two migrations visible in one URL chain.** `support.loom.com/hc/en-us` (Zendesk)
→ `support.atlassian.com/loom`. Old Zendesk article URLs are still hardcoded in
live marketing copy: `/screen-recorder` links to
`support.loom.com/hc/en-us/articles/360002187698-How-to-get-started-with-the-Loom-Chrome-extension`
and the pricing FAQ to `…/articles/360013343618`. They redirect, but the
marketing site is pointing at a retired help platform. Recorded as a defect.

**Shape: 8 categories → 27 sub-categories → ~190 articles**, all exposed in a
single sidebar on every documentation page. The whole tree is always visible,
which is why one fetch yielded the full IA — good for crawling and for
orientation, punishing for page weight.

**Article-title grammar — six consistent shapes:**

| Shape | Example |
|---|---|
| Imperative verb-first (dominant) | `Blur sensitive information`, `Use speaker notes` |
| `Understand X` | `Understand your default recording settings`, `Understand permanent video deletion` |
| `How do I …?` / `How to …` | `How do I move a folder or video into a Space?`, `How to create an animated GIF Preview` |
| `Can I …?` / `Does Loom …?` | `Can I use Loom with Firefox, Safari, and other browsers?`, `Does Loom have an open API?` |
| `Resolving …` | `Resolving errors with Meeting Recording` |
| `Can't / I'm …` (user-voiced failure) | `Can't find my videos` |

`Understand X` as a title family is the distinctive one — eight articles use it
(`Understand your Library`, `Understand your invoice`, `Understand folder
structure in Spaces`, `Understand Loom data residency`, `Understand embedding
videos, GIFs, and thumbnails`, `Understand workspaces, roles and permissions`,
`Understand the notifications page`, `Understand your video's views and
analytics`). These are **explanatory, not procedural** — the title promises a
mental model rather than a set of steps, and the family is used precisely where
Loom's model is non-obvious (permissions, retention, invoices, deletion). That is
a reusable convention: reserve one title verb for conceptual articles so users
can tell "explain this to me" from "walk me through this."

**Routing furniture** `[observed]`: every article ends
`Was this helpful?` → `Yes` / `No` → three canned reasons
(`It wasn't accurate` · `It wasn't clear` · `It wasn't relevant`) →
`Provide feedback about this article` → `Still need help?` →
`Ask the Community`. The three reasons map to accuracy, clarity, and relevance —
a compact content-quality taxonomy offered to the reader. There is **no
"Contact support" at the end of an article**; the community is the terminal
option, with `Contact us` only in the top nav and `Report a problem` on status.

**In-page furniture**: `On this page` with anchor links; `Show more` on the
sibling-article list.

## T12 FAQs

**Placement:** eleven-question accordion at the foot of `/pricing`, headed
`FAQs`; six questions at the foot of `/screen-recorder`, headed
`Screen Recorder FAQs`. Bodies are in server HTML (unlike Wise) so answers were
readable and are summarised below.

**Pricing FAQ, questions verbatim, in order:**

| # | Question (verbatim) |
|---|---|
| 1 | Can I start a free trial of paid plans? |
| 2 | What's the difference between buying Loom on Loom.com versus Atlassian.com? |
| 3 | Why should I consider getting Loom Business + AI? |
| 4 | What enterprise-grade security features does Loom offer? |
| 5 | What are my payment options? |
| 6 | What are Workspaces and who can I add to my Workspace? |
| 7 | Do I get a refund if I deactivate members from my Workspace? |
| 8 | How is my data used? |
| 9 | Is there a discounted Education plan? |
| 10 | How do Screenshots work? |
| 11 | *(education/discount line sits outside the accordion — see below)* |

**Structural notes.** The ordering is: trial → **channel conflict** → upsell →
security → payment → seat model → refund → data use → discount → feature
mechanics. Putting the Loom.com-vs-Atlassian.com purchasing difference at
position 2 is the tell: the most confusing thing about buying Loom is *where* to
buy it, and the FAQ leads with that rather than with a benefit.

Q3 (`Why should I consider getting Loom Business + AI?`) is **not a question a
user asks** — it is a sales pitch wearing a question mark, and the answer is the
only one in the set built from bolded stat claims (67% do not edit the auto title;
73% call it "extremely or very valuable"; 18% more viewer engagement). The stats
are attached to the claims they substantiate, which is good practice, but the
question is vendor-voiced in a user-voiced list. Recorded as a defect.

Q6 is a **compound question** ("what are Workspaces **and** who can I add") in
the Wise style — definition and eligibility answered together.
Q7 is the sharpest question in the set, and its answer distinguishes *downgraded*
from *deactivated* with different outcomes (see T6).

**`/screen-recorder` FAQ, questions verbatim:**
`How do I record my screen?` · `How can I screen record a video with sound?` ·
`Is there a Chrome extension for Loom screen recording?` ·
`Does Loom work on Mac and Windows?` — four questions, all SEO-shaped
("how can I screen record…" is search grammar, not speech), with answers that
are numbered procedures (see T4). The Mac and Windows answer splits into two
labelled sub-procedures, `For Mac:` and `For Windows:`, with version floors
stated inline (OSX 10.15+, Windows 10 64-bit and 11; iOS 15+, Android 8.0 Oreo+).
**Compatibility floors given as numbers in the FAQ answer** rather than hidden
in a requirements page.

## T13 Terminology & glossary

| Term | Loom's usage | The alternative it rejected |
|---|---|---|
| `Loom` (countable noun) | A single recording: "Record a Loom instead", `Community Looms`, `Save Looms to watch later`, `Which Looms are visible to you` | "video" — though Loom uses "video" far more often, so the coinage is inconsistently deployed |
| `camera bubble` | The circular webcam overlay; four articles use it | "picture-in-picture", "facecam" (which the marketing page does use once) |
| `Recording Canvas` / `canvas` | A drawable surface added to a recording | "whiteboard" |
| `Spaces` vs `Library` | Library = what you made (private until shared); Spaces = where you post to share | "Folders" (which exists *inside* both) |
| `all-company space` | The one auto-created space every workspace gets | "General", "Everyone" |
| `Creator` / `Creator Lite` / `Member` / `Admin` | Seat roles; Lite being deprecated, `User` and `Creator` explicitly declared synonyms | "Editor/Viewer" |
| `Open to workspace` | Middle access level | "Internal", "Team-only" |
| `Restricted` | Tightest access level | "Private" — which Loom uses for the *unshared* default state instead, so `private` and `Restricted` are different things |
| `Variables` | Per-recipient personalisation tokens (`Personalize videos at scale`) | "merge fields", "mail merge" |
| `stitch` | Joining clips, always paired as `trim and stitch` | "merge", "concatenate" |
| `Viewer insights` / `Engagement insights` / `Admin insights` | Three named analytics tiers, split by who is looking | "Analytics" as one noun |
| `true-up billing` | Accounting term retained in a user-facing title (`How true-up billing works when you add Creators`) | "prorated charges" |
| `Notetaker` | The meeting-recording bot as a named actor (`multiple Loom Notetakers in a meeting`) | "bot", "assistant" |
| `Quick Record` | Named fast-path entry point | |
| `Auto-` prefix | Consistent marker for AI-generated output (`Auto Titles`, `Auto Summaries`, `Auto CTA`, `Auto Tasks`, `Auto-meeting notes`) | "AI-generated X" |
| `abhorrent content` | Retained legislative term in the reporting article | "inappropriate content" |

**Register split by surface.** Marketing says `video messages`,
`async video communication`, `screen recorder`; the help centre says `Looms`,
`camera bubble`, `Spaces`. The coined vocabulary lives where the user is already
inside the product — the same split Wise shows between
`Wise Multi-Currency Card` and `Wise card`.

**Casing is not governed.** `Workspace` and `workspace` both appear, often in the
same article (`Delete members in a Workspace` next to
`Leave a Workspace` next to `Change your default workspace`). `Space` /
`Spaces` / `space` likewise. `Creator Lite`, `Creator-Lites`, and `Creator Lites`
all appear in the roles article. Recorded as a defect.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout, first-person plural
for the company ("We offer SSO, SCIM…", "we'll generate an instantly shareable
link", "we are in the process of integrating systems"). The company is a visible
actor, including in the awkward Atlassian-migration copy. One slip into
first-person singular in the Chrome permissions article ("I'm sure many others
have that same requirement") — a single-author voice surviving into a corporate
help centre.

**Register gradient.** Marketing is loose and superlative
(`supercharge productivity`, `Lightning fast`, `like a pro`, `in a snap`,
`far and wide`, `Provide fun feedback`, `add fun extras`). The permissions and
privacy articles are flat and declarative. The plan-limits and deprecation copy
is flattest of all. Loom's colloquialism concentrates in acquisition copy and
thins as the stakes rise — the same gradient as Wise, though Loom's marketing end
is considerably louder.

**Emoji in body copy** `[observed]`: an emoji appears inside a customer quote on
two pages ("Feel like 😎"), and emoji reactions are a named feature
(`Emoji reactions`, `React to videos with emojis and in-video comments`). No
emoji in help, pricing tables, or disclosures.

**No exclamation marks in functional copy**; `New!` is the only one, and it is a
badge.

**Reading level.** Marketing sentences are short and mostly one clause. Help
bodies are plain but noun-heavy in the permissions articles, where the sentences
carry stacked conditions (plan × role × setting × new-vs-existing content). The
permission grids in `Understand workspaces, roles and permissions` are pushed
into tables with asterisk footnotes rather than prose — five separate tables and
four different asterisk meanings on one page, which is where the article becomes
hard to read. **Tables did not rescue the complexity; they relocated it.**

**Accessibility content** `[observed]`
- `Skip to content` (loom.com) and `Skip to main content` (support) both present, first in DOM — but two different strings for one product
- Closed captions and transcription are positioned as accessibility features in marketing prose: "Closed captioning for accessible, inclusive sharing", and transcripts/captions "in 50+ languages"; `Multi-language transcriptions` and `Correct your transcript` in help
- `Accessibility` is a first-class footer link on every support page (Atlassian's page)
- Logo-wall images carry the brand name as alt (`![HubSpot]`, `![Ford]`) — correct
- Home-page benefit imagery carries descriptive alt: `Edit your videos like a pro`, `Integrations with Google, Slack, Salesforce, Figma and Jira`, `Background code in Visual Studio code editor`, `Desk with laptop recording`, `Loom app on iPhone`
- **Gaps:** several decorative/animation images carry no alt at all (`![](…glow.webp)`, `![](…enterprise.webp)`, `![](…cursor-text.svg)`) rather than explicit empty alt; `![glow background]` is alt text describing decoration, which should be empty; `![Results Overview]` labels an animated mock with a two-word alt that conveys nothing
- `Your browser does not support the video tag.` appears **six times** on the home page and three more on `/screen-recorder` as the video fallback — the raw HTML default, never replaced with a description of what the video shows. For a video-messaging product this is the most on-the-nose accessibility miss in the harvest

**Negative findings, recorded honestly**

- `Signup for Free` — `Signup` as a single word, in a hero CTA
- `Get Loom for free` vs `Get Loom for Free` — same CTA, two capitalisations
- `See all features` links to `/pricing`, and the same string also means "expand this plan card" on that page
- Bare `Learn more` ×3 on the home page, including on security and enterprise
- User-count claims disagree: 22 million (meta), "millions" (hero band), 25 million (footer band and pricing), 21 million (docs meta)
- Four casings of beta: `BETA`, `(BETA)`, `(Beta)`, `(beta)`; two of new: `NEW`, `New!`
- `Workspace`/`workspace` and `Space`/`space` casing uncontrolled within single articles
- `Creator Lite` / `Creator-Lites` / `Creator Lites` in one article
- Two skip-link strings across one product's surfaces
- `Support Contact and Resources` title-cased in an otherwise sentence-case category list
- Live marketing pages still link to retired `support.loom.com/hc/en-us/articles/…` URLs
- `loom.com/security`, linked from the home page as product reassurance, redirects to generic Atlassian legal security measures
- Knowledge Base index renders empty with no empty-state copy, behind a tile promising troubleshooting articles
- Promotional admin upsell banner with the CTA `Try Now` sits at the top of the status page
- Pricing FAQ Q3 is vendor-voiced (`Why should I consider getting…`) inside a user-voiced set
- A typo survives in the permissions article body: "Yes.  o do this, select the **Share** button" (missing `T`)
- Documentation sidebar renders `Configure your recording settings (Chrome extension)` on one page and `(Chrome Extension)` on another — the same link, two capitalisations

---

## Transferable patterns

1. **State the exposure and its bound in the same sentence.** `Public` tells the
   user the link works for anyone without a login *and* that Loom videos are never
   indexed by Google or any engine outside Atlassian. Reach and limit together.
   Directly applicable to any PayPal share, referral, or public-receipt link:
   say who can reach it and where it stops.
2. **Give the excluded party an action.** `Open to workspace` ends with "people
   outside the workspace can request to view" rather than a dead end. Any
   permission denial should name the escalation, not just the refusal.
3. **Quote the alarming third-party string back to the user.** The Chrome
   permissions article reproduces "Read and change all your data on the websites
   you visit" verbatim, names it as the bullet that alarms people, and says which
   features need it. Steal the *structure*, not the argument — the same article
   then leans on unverifiable promises, platform-blaming, and "other apps do it
   too," which is exactly how not to close. Condition: pair the verbatim quote
   with a concrete scope limit, never with a reassurance about intent.
4. **Reserve one title verb for conceptual articles.** Loom's eight
   `Understand X` articles cluster precisely on its non-obvious models —
   permissions, retention, deletion, invoices. A user can tell "explain this"
   from "walk me through this" by the verb alone. Cheap to adopt, high payoff in
   a large help IA.
5. **Split the support hub between doing and troubleshooting at the top level.**
   `Documentation` ("using and administering") beside `Knowledge Base`
   ("troubleshooting articles") lets a failing user self-route in one click.
   Condition: only works if the troubleshooting side is actually populated —
   Loom's renders empty, which is worse than not splitting.
6. **Name status components after user activities.** `Recording` · `Viewing` ·
   `Authentication` · `Loom AI` — not services or regions. A blocked user
   self-diagnoses without knowing the architecture.
7. **Scope the notification promise per channel, in the copy.** Email covers
   create/update/resolve; SMS covers only create/resolve, and the SMS copy says
   so. Do not let a channel imply parity it cannot deliver.
8. **Document the deprecation, with a date and a cohort split.** The roles
   article names February 2026, distinguishes new users from existing ones on a
   rolling basis, and openly states that two of its own role labels mean the same
   thing. Most products silently drop labels.
9. **Two label systems for one setting is a real cost.** `Public` /
   `Open to workspace` / `Restricted` in docs versus `Anyone with the link` /
   `Members of this Workspace` / `Only people added can access` in the UI. The UI
   strings are better (they name the audience); the docs strings are the ones
   that are searchable. Pick one and gloss the other in the article's first line.
10. **Say what the default does *not* touch.** "These settings only apply to new
    videos" is repeated three times across two articles. Deliberate redundancy at
    the point where an admin would otherwise assume retroactive effect.

## Caveats & gaps

- **Marketing nav and footer not captured.** `www.loom.com` renders its nav and
  footer client-side; server HTML yields only `Toggle menu close`. T1's marketing
  half is `[absent]`, not inferred. A browser-rendered pass would fill it.
- **Help-article bodies mostly unread.** Four of ~190 articles were opened. The
  other ~186 contribute titles only, which is high-signal for IA, task phrasing,
  and error vocabulary, and says nothing about answer structure or the in-product
  strings quoted inside them.
- **No in-product observation.** Every empty state, toast, validation message,
  and share-dialog string is `[documented]` at best. The privacy level names and
  the share-dialog labels come from help prose describing the UI, not from the UI.
- **`loom.com/security` is no longer a Loom page.** The security disclosure
  captured in T10 is Atlassian's corporate document. Any Loom-specific security
  copy that used to live there is gone from the public surface and was not
  recovered.
- **Knowledge Base yielded nothing.** The index renders empty; the individual KB
  articles it should list were not discoverable from it. Not treated as blocked —
  the page loaded fine, it is simply empty.
- **Atlassian bleed.** Loom's help, status, security, and accessibility pages are
  all Atlassian-hosted and carry Atlassian's furniture. Strings attributed to
  those URLs are Atlassian content-design decisions applied to Loom, not Loom's
  own. The `support.atlassian.com/loom/docs/*` article titles and bodies are
  Loom-authored; the page chrome, `Was this helpful?` widget, and footer are not.
  Marked by source URL throughout so the two are separable.
- **Pricing observed at default (annual/monthly toggle unexercised, team size
  unset).** Prices quoted — $0, $18, $24 per user/month — are the default render.
- **No published content style guide or design system found for Loom.** Not
  searched exhaustively; Atlassian Design System exists but governs Atlassian
  products' UI, and no Loom-specific voice-and-tone documentation surfaced on the
  pages inspected. `[absent]`
- Mobile app strings, email templates, and the signup flow itself are outside the
  unauthenticated web surface.

## Sources

1. https://www.loom.com/
2. https://www.loom.com/pricing
3. https://www.loom.com/screen-recorder
4. https://support.loom.com/hc/en-us (redirects to https://support.atlassian.com/loom/)
5. https://support.atlassian.com/loom/resources/
6. https://support.atlassian.com/loom/kb/
7. https://support.atlassian.com/loom/docs/use-looms-privacy-settings/
8. https://support.atlassian.com/loom/docs/manage-the-permissions-and-privacy-of-your-videos/
9. https://support.atlassian.com/loom/docs/understand-workspaces-roles-and-permissions/
10. https://support.atlassian.com/loom/docs/chrome-extension-permission-requests-explained/
11. https://www.loomstatus.com/ (redirects to https://loom.status.atlassian.com)
12. https://www.loom.com/security (redirects to https://www.atlassian.com/legal/security-measures)
