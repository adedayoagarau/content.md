# 001. Notion

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | All-in-one workspace / wiki-database hybrid, now repositioned as an AI workspace with agents |
| Primary URL | https://www.notion.so/ (301s to https://www.notion.com/) |
| Corpus rank | 001 |
| Benchmark strength (source list) | Progressive disclosure, templates, empty states |
| Locale / market observed | en-US (22-locale switcher present in footer) |
| Platform observed | Web (desktop), help centre, marketplace, status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product function. Privacy/AI-governance copy present: SOC-type security page, "Your privacy rights" (California link), GDPR-style mandatory-refund carve-out for EU/UK, zero-data-retention commitment with LLM subprocessors on Enterprise |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 |
| Harvest completeness | Full for public surfaces. Partial for T6/T8 — in-product status chips and empty states are mostly behind auth; captured via help documentation plus two live public empty states |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.notion.so/ | Hero, three-pillar feature section, use-case cards; `notion.so` redirects to `notion.com` |
| Pricing | https://www.notion.com/pricing | Four tiers, feature-comparison matrix with per-row explainer text, 17-question FAQ |
| Help centre home | https://www.notion.com/help | Thirteen-group sidebar IA, popular topics, "Browse by team" axis |
| Help category: Troubleshoot | https://www.notion.com/help/category/troubleshooting | Category framed as `Fix a problem` in the sidebar |
| Help category: Troubleshoot (all) | https://www.notion.com/help/category/troubleshooting/all | Complete 10-article list — richest recovery-title source |
| Help category: Notion basics | https://www.notion.com/help/category/new-to-notion | Onboarding IA plus a 7-question FAQ block |
| Help category: Plans & billing | https://www.notion.com/help/category/plans-billing-and-payment | Billing article titles |
| Help category: Databases (all) | https://www.notion.com/help/category/databases/all | 12 help docs + 30 guides; guide-title grammar |
| Help article: I can't log in | https://www.notion.com/help/cant-log-in | Recovery flow with verbatim in-product button labels |
| Help article: Common Notion errors | https://www.notion.com/help/notion-error-messages | **Highest-value page in this harvest** — a published error-string catalogue |
| Help article: Start here | https://www.notion.com/help/start-here | Product definition, voice sample |
| Help article: Database properties | https://www.notion.com/help/database-properties | 22 property-type labels + field-editing microcopy |
| Status page | https://www.notion-status.com | Component tree and operational-state wording (incident.io) |
| Marketplace / templates | https://www.notion.com/templates | Category naming, creator surface, two live empty-state defects |
| Product: Projects | https://www.notion.com/product/projects | Project/task feature naming, "Catch all the details" label set |

---

## T1 Navigation & IA labels

**Global nav — feature-name + benefit-gloss pairs, not bare feature names** `[observed]`

The nav is the clearest single pattern in this harvest. Every item in the Product and AI menus is a two-part construction: the product noun, then a 3-4 word benefit gloss rendered as a second line.

| Nav item | Gloss (verbatim) |
|---|---|
| `Notion AI` | "AI tools for work" |
| `Agents` | "Automate busywork" |
| `AI Meeting Notes` | "Perfectly written by AI" |
| `Enterprise Search` | "Find answers instantly" |
| `Knowledge Base` | "Centralize your knowledge" |
| `Docs` | "Simple and powerful" |
| `Projects` | "Manage any project" |
| `Connections` | "Connect your apps" |
| `Security` | "Safe and scalable" |
| `Notion Calendar` | "It's time" |

`Notion Calendar` → "It's time" is the outlier: a pun rather than a gloss, and the only item where the second line does not tell you what the thing does. Worth recording as an inconsistency inside an otherwise strict pattern.

Top-level nav row: `Product` · `AI` · `Resources` · `Developers` · `Startups` · `Enterprise` · `Pricing` · `Request a demo` · `Log in` · `Get Notion free`.

**Resources menu uses verb-grouped sub-headers** `[observed]`: `Browse` · `Discover` · `Learn`. Three gerund/imperative bucket names doing the work that "Resources" alone would leave ambiguous. `Templates`, `Consultants`, `Connections` sit under `Browse`; `What's New`, `Customer stories`, `Blog`, `Webinars` under `Discover`; `Developers`, `Academy`, `Product tours`, `Help` under `Learn`.

**Help-centre IA — thirteen groups, each an activity phrase, with the article categories nested beneath** `[observed]`

| Group label | Categories inside |
|---|---|
| `Get started` | `Notion basics`, `Sidebar navigation` |
| `Workspace basics` | `Workspace settings`, `Settings & preferences` |
| `Create & format pages` | `Pages & blocks` |
| `Build databases` | `Databases`, `Database views` |
| `Share & collaborate` | `Sharing & permissions`, `Notion Sites` |
| `Automation & connections` | `Import & export your data`, `Connections`, `Automations` |
| `Work with Notion AI` | `Notion AI`, `Notion AI Connectors` |
| `Agents in Notion` | `Custom Agents`, `External Agents` |
| `Admin & security` | `Administer your workspace`, `Privacy & security`, `Notion AI security` |
| `Mail, Calendar & Apps` | `Notion on desktop, web, & mobile`, `Notion Mail`, `Notion Calendar` |
| `Get started on marketplace` | `Marketplace & templates` |
| `Manage your plan` | `Notion credits`, `Plans & billing` |
| `Fix a problem` | `Troubleshoot` |
| `Developer Platform` | `Explore developer tools` |

The group labels are imperative or gerund activity phrases (`Build databases`, `Share & collaborate`, `Fix a problem`) while the nested category labels are object nouns (`Databases`, `Sharing & permissions`, `Troubleshoot`). That split — **verb at the grouping level, noun at the leaf level** — is the transferable decision. `Fix a problem` is the standout: the group is named in the user's intent, the leaf in the system's own word (`Troubleshoot`), so the user routes on intent and then lands on the product's vocabulary.

Two groups both begin `Get started` (`Get started` and `Get started on marketplace`), which reads as a labelling collision in a flat scan of the sidebar.

**Secondary help axis — "Browse by team"** `[observed]`: `Project management` · `Engineering` · `Design` · `Marketing` · `Startup` · `Enterprise`. A role-based cross-cut over the same content, sitting below the task-based tree. Note one is a company stage (`Startup`) and one a segment (`Enterprise`), so the axis is not internally consistent.

**Breadcrumbs** `[observed]`: two-level, `Help Center` → category, plus a separate back affordance rendered as `← Troubleshoot` / `← Notion basics`. The arrow-plus-parent-name form is used instead of a generic "Back".

**Footer groupings** `[observed]`: `Product` · `Resources` · `Company` · `Notion for`. `Notion for` is the interesting one — a preposition used as a grouping label, containing audience segments (`Enterprise`, `Small businesses`, `Startups`, `Developers`). Both `Product` and `Notion for` end with the same `Explore more→` link, a duplicated destination with identical label in two places.

**Marketplace sub-nav** `[observed]`: `Templates` · `Agents` · `Consultants` · `Connections` under a `Marketplace` wordmark.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Where teams and agents Think together.`
> Subhead: "Capture context, find answers, and automate tasks with AI built for your team."

The capital T mid-sentence in "and agents Think together" is a typographic device (the word is styled) but renders as a mid-sentence capital in plain text — a small accessibility/readability cost worth flagging, since assistive tech and plain-text renderings lose the styling and keep the odd capital.

The subhead is a **three-verb triad** — capture, find, automate — and those same three verbs become the section labels immediately below, so the subhead doubles as a table of contents.

**Three-pillar section pattern — kicker label + sentence-case declarative headline** `[observed]`

| Kicker | Headline |
|---|---|
| `Capture knowledge` | `Bring everything into one system of record.` |
| `Find answers` | `Get answers, instantly—with citations.` |
| `Automate busywork` | `Keep work moving 24/7 with agents.` |

Kicker is a noun/gerund phrase naming the job; headline is an imperative with a full stop. The em-dash in "instantly—with citations" appends the proof to the claim inside the headline rather than deferring it to body copy — a compressed version of the claim-then-substantiate pattern.

**Section headers on pricing and product pages are flat assertions, not questions** `[observed]`

`One tool to run your company.` (pricing hero) · `The AI workspace for work that matters.` (mid-pricing, introducing Business/Enterprise) · `Essentials for staying organized.` (introducing Free/Plus) · `Plans and features` (comparison table) · `Questions & answers` (FAQ heading) · `AI where your team works.` · `Trusted by teams that ship.`

Note pricing uses **two segment headers rather than one**, splitting the four tiers into a lower pair ("Essentials for staying organized") and an upper pair ("The AI workspace for work that matters"). The tier table is therefore narrativised into two products, not four rungs.

**Projects page headline set** `[observed]`: `Manage projects from beginning to end` → `Infinitely configurable, so you can work the way you want` → `Catch all the details, big and small` → `Focus on what's important. Leave the rest to AI.` → `Ship faster with automated sprints` → `Get your projects organized`. Sub-headlines within the configurable section are full imperative sentences with a because-clause: `View projects as a timeline for a bird's eye view`, `Choose the exact info you want to track`, `Filter and sort info to see what you need`, `Control who can see and edit`.

**Closing CTA block uses a permission-granting subhead** `[observed]`

> `Get your projects organized`
> "Play around with it first. Pay and add your team later."

Two short sentences that defuse commitment anxiety by naming the order of operations. This is a better closer than a benefit restatement, and it is reusable anywhere a free tier precedes a paid one.

**Brand epigraph in the footer of every page** `[observed]`: a two-line Marshall McLuhan quotation attributed in italics, placed above the footer link columns on all pages including help articles and the pricing table. An unusual choice — a literary epigraph as persistent site furniture.

**FAQ heading on pricing** `[observed]`: `Questions & answers`, not "FAQ" or "Frequently asked questions". Below it, a hand-off line: "Still have more questions?" with a link whose label is `help center`.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Notion free` | Global nav (primary), hero, projects page, closing blocks | The dominant acquisition label; price is in the label |
| `Log in` | Global nav | |
| `Request a demo` | Global nav, hero (secondary), projects page | Sales path, sits beside the self-serve path everywhere |
| `Contact Sales` | Enterprise tier card | **Inconsistent capitalisation and wording** vs `Request a demo` and vs `Contact us→` in the comparison table — three labels for the sales motion |
| `Contact us→` | Enterprise column of the comparison table | Third variant of the above |
| `Sign up` | Free tier card; also on the comparison table header | |
| `Get started` | Plus and Business tier cards, "Become a creator" block, G2 block | Used for both a paid upgrade and an unrelated creator signup |
| `Explore→` | Marketplace editorial cards | Arrow-suffixed, object supplied by the card |
| `Explore all topics` / `See all` | Help category pages | `See all` links to the `/all` variant |
| `Learn more→` | Pricing (Workers block), Projects (Wikis/Docs/AI cards), Connections cards | **Bare `Learn more` appears repeatedly** — the clearest content defect in this harvest; four instances on the Projects page alone, differentiated only by adjacent card titles |
| `Learn more about blocks here →` | Pricing FAQ, "What is a block?" answer | The good version of the same link, inline and specific |
| `Try now→` | Integration cards (Figma, Slack, GitHub, Amplitude, Jira) | Repeated five times on one page, same label, five destinations |
| `Read more→` | End of every help article, in an `Up next` block | |
| `Start learning` | Notion Academy block on help home | |
| `Get in touch` | Help home, "Still have questions?" | |
| `Chat with us` | Help sidebar, Support group | |
| `Find a consultant` / `Hire an expert for your needs` | Help home, paired label + gloss | |
| `Join the community` / `Sign up for webinars` | Help home | Label and gloss **do not match** — "Join the community" leads to webinar signup |
| `Browse 237 consultants` / `Browse 2,083 collections` / `Browse 348 categories` / `Browse 22,018 creators` | Marketplace | Counted-browse pattern: the number is inside the CTA |
| `View more` | Help home, "What's new" | |
| `Book` | Consultant cards, beside `View profile` | One-word transactional CTA |
| `Download the Notion App→` | Nav footer strip | |
| `See what's new→` | Nav footer strip | |
| `Send reset link` | Login recovery (documented in help) | |
| `Send verification code` | Email-change flow (documented in help) | |
| `Add another account` | Workspace switcher (documented in help) | |
| `Explore more→` | Footer, twice in different columns | Duplicated label, duplicated destination |
| `Subscribe to updates` | Status page | |
| `View history` | Status page | |

**Observations.** Notion's CTA layer is markedly weaker than its nav layer. The nav enforces a strict label+gloss discipline; the CTA set leaks four synonym clusters — free signup (`Get Notion free` / `Sign up` / `Get started`), sales (`Request a demo` / `Contact Sales` / `Contact us→`), support (`Chat with us` / `Get in touch` / `Contact us`), and the unbounded `Learn more→`. The arrow glyph `→` is appended inconsistently: `Learn more→` and `Try now→` carry it, `Get started` and `Sign up` do not, and `See all` does not.

## T4 Onboarding & getting-started

**No numbered "how it works" sequence exists on the marketing surface** `[observed]`. Notion does not ship a 1-2-3 onboarding narrative on the homepage or the Projects page. Instead the getting-started burden is carried by (a) template entry points and (b) the help centre's `Get started` group. This is itself the finding: for a product whose blank-canvas problem is well known, the public onboarding narrative is *deferred to templates* rather than told in steps.

**Template-first entry** `[observed]`: `Get started in seconds` (Projects page section) followed by `Explore the template gallery` and three named exemplar templates attributed to real companies — `Branch's engineering roadmap`, `Mixpanel's daily standup & tasks`, `Notion's editorial calendar`. Possessive-company naming turns the template into social proof and an onboarding step simultaneously. `Notion's editorial calendar` links to `/integrations/slack`, a **broken destination** — the CTA and the target do not match.

**Help onboarding sequence — article order is the curriculum** `[observed]`

The `Notion basics` category orders its articles as a course, and each article ends with an `Up next` pointer, so the help centre is a linear onboarding track dressed as a reference:

`Start here` → `What is a block?` → `Create a page` → `Create a subpage` → `Create a database` → `Intro to workspaces` → `Share your work`

The `Up next` module is the mechanism: at the foot of `Start here` it reads `Up next` / `What is a block?` / "Think of Notion as a bottomless bin of building blocks..." / `Read more→`. A reference article set given a spine by one repeated module — cheap and effective.

**`Start here` voice sample** `[observed]`. The article opens "We like to describe Notion as a set of building blocks for creating things you love to use on your computer", lists six output types ending with "The world's most beautiful notes... 😉", then explicitly grants permission not to learn everything: "don't worry about not knowing everything you can do right away. We'll discover it together." First-person-plural, emoji, and an anxiety-defusing move. Contrast with the flat register in the error catalogue (see T14) — the gradient is deliberate.

**Adoption is documented as a staged programme** `[documented]`: guide titled `5 steps to adopt Notion for your entire organization`. Step names not captured (guide body not opened).

**Trial language** `[observed]`: `Trial of Notion AI` and `Limited Trial` appear as *feature values* in the pricing matrix rather than as a time-boxed offer. `Free to try, then $10 per 1,000 monthly Notion credits` for Custom Agents. `Paid plan trials` is a help-article title.

## T5 Form & field labels

**Database property types — 22 labels, the product's real field vocabulary** `[documented]`, from the help doc

`Text` · `Number` · `Select` · `Status` · `Multi-Select` · `Date` · `Formula` · `Relation` · `Rollup` · `Person` · `File` · `Checkbox` · `URL` · `Email` · `Phone` · `Created time` · `Created by` · `Last edited time` · `Last edited by` · `Button` · `ID` · `Place`

Each carries a one-line description with the same three-part shape: **what it accepts → how it behaves → what it's good for.** Examples: `Phone` — "Accepts a phone number and prompts your device to call it when clicked."; `Number` — "Accepts numbers. These can also be formatted as currency or progress bars. Useful for tracking counts, prices, or completion." The auto-generated types all close with an explicit editability statement: "Auto-generated and not editable." / "Auto-updated and not editable." Stating non-editability in the type description, rather than only discovering it on click, is good practice.

Terminology drift inside this set: `File` is the property-type label in the table, but the editing instructions in the same article call it `Files & media`. Two names for one property in one document.

**Property-editing microcopy** `[documented]`

| Label | Context |
|---|---|
| `Add property` | First property in an empty database |
| `New property` | Property manager |
| `Insert left` / `Insert right` | Table-view column insertion — positional, not "Add before/after" |
| `Edit properties` | Database settings menu |
| `Property visibility` | Show/hide panel |
| `Remind` | Inside the date picker |
| `End date` | Toggle, not a second field |
| `Include time` | Toggle |
| `Date format & timezone` | Sub-setting |
| `Clear` | Removes the date value |
| `View original` | File menu, beside `Delete`, `Download`, `Full screen` |
| `Conditional color` / `New color setting` / `Page background` / `Apply to` / `Add another` | Colour-rule builder |
| `View settings` | Container for the above |

`End date` and `Include time` as **toggles that add capability to one field** rather than separate fields is a notable pattern: the date property stays one property whether it holds a day, a datetime, or a range, and the form grows on demand. This is progressive disclosure at the field level, which is exactly the benchmark strength this product was listed for.

**Login and account fields** `[documented]`, from the recovery article: `Forgot password?` (link), then email entry, then `Send reset link`. Account security section labelled `Account security`, containing `Manage emails` → `Add email` → `Send verification code` → `Make primary` → `Remove`. `Make primary` as the promotion verb is worth noting over "Set as default".

**Value terminology** `[documented]`: "Any data put into a property is called a value." Notion explicitly glosses its own data model term inside the help doc rather than assuming it.

**Search field** `[observed]`: `Search help center` — placeholder and label, lowercase "help center" inside a sentence-case field.

## T6 Status & state language

**`Status` is a first-class property type with three fixed meta-categories** `[documented]`

> "Track this item's progress using status tags categorized by To-do, In Progress, or Complete."

The three group names are `To-do`, `In Progress`, `Complete`. The design decision worth recording: Notion lets users invent arbitrary status *tags* but forces every tag into one of three *groups*. Vocabulary is free; the state machine is fixed at three. That is how a configurable product keeps rollups, filters, and progress bars meaningful across thousands of bespoke workflows — and it is a strong argument for constraining state taxonomies at the grouping level rather than the label level.

Inconsistent hyphenation across the set: `To-do` (hyphenated) beside `In Progress` and `Complete`. Notion also uses "to-do checkboxes" and "to-do item" in the pricing FAQ.

**Project/task state vocabulary named on the Projects page** `[observed]`: `Status, assignee, due date` presented as a single feature with the gloss "So everyone knows what to do and when to do it." Also `Tasks and sub-tasks`, `Dependencies` ("See when one task is blocking another and avoid bottlenecks"), `My tasks`, `Progress bar` ("See how your project is tracking toward its launch"), `Database views`. Plus `priority labels` and `status tags` as user-creatable things: "Create your own priority labels, status tags, and more".

`P0` / `P1` appear as **example priority values** in the conditional-colour documentation, red and orange respectively — a glimpse of Notion's own internal convention leaking into help copy.

**Sprint states** `[documented]`, indirectly: `Task databases & sprints` help doc; "out-of-the-box workflows to groom your backlog, organize sprints, and track bugs". `backlog` is named as a state-like container. Article `Sub-items & dependencies` at URL slug `tasks-and-dependencies` — the title was renamed (`Tasks` → `Sub-items`) without the slug following, a visible terminology migration.

**Plan/feature states in the pricing matrix** `[observed]`: `Beta` used as a suffix badge on `Enterprise Search`, `Research mode`, `Workers`. `Limited Trial` as a cell value. `Requires Notion credits` as a cell value — a state that means "available but metered". `Same as business` / `Same as plus` used as cell values to inherit, and `Custom` for negotiated items. `Unlimited` used as a value 11 times. Using an inheritance phrase (`Same as plus`) inside a comparison matrix cell is unusual and reduces repetition, at the cost of forcing a lateral read.

**Service states** `[observed]`, status page: `We're fully operational` as the aggregate headline, with the supporting line "We're not aware of any issues affecting our systems." Both first-person-plural. The negative-knowledge framing ("we're not aware of") is honest — it claims absence of known issues rather than absence of issues.

**Verification as a page state** `[observed]`: `Verify any page` — "Add a verified badge to pages that are up to date. Appears in search results and AI citations." A trust state applied to content, with its consequence (surfacing in AI citations) stated in the same breath. For an AI-answers product this is the key state: it tells the user why they should care about a badge.

## T7 Error, failure & recovery

**Notion publishes an error-string catalogue.** `Common Notion errors` lists the product's own error copy verbatim, which is rare and makes this the single most valuable page in the harvest. `[documented, quoting live UI strings]`

**Generic errors — nine strings, and they are not good** `[documented]`

- "Something's not right"
- "Something went wrong"
- "Hmm… something's not right"
- "There was an issue persisting your edits"
- "Cannot save changes"
- "Storage operation did not complete"
- "Notion is damaged"
- "Go online to view this image"

This list is a self-documented defect inventory. Three of the eight are near-duplicates of each other ("Something's not right" / "Something went wrong" / "Hmm… something's not right") — the same failure class expressed three ways, including one with an interjection and an ellipsis and two without. "There was an issue persisting your edits" leaks the engineering verb *persist* into user copy. "Storage operation did not complete" is a system-object sentence with no user, no cause, and no action. "Notion is damaged" is an OS-level string surfaced unmediated and reads alarmingly — the user's document is not damaged, the app bundle is.

**Named errors get a consistent three-part article structure** `[observed]`

Each named error is documented as: error string as an H2 in quotes → `When this error may occur` → `What you can try to fix the error`. That second heading is the notable one: **"what you can try"**, not "how to fix it". The hedge is honest, since most of these causes are network-side and outside Notion's control.

| Error string (verbatim) | Cause given | Recovery offered |
|---|---|---|
| "Offline" / "Connect to the internet to get started" | Lost connection, or network/security software blocking Notion | Check connection, check proxy/firewall/VPN, ask IT to unblock, change DNS to 1.1.1.1 or 8.8.8.8 |
| "Go online to view this image" | Network layer blocking image loads; VPN named as most common cause; also firewalls, proxies, DNS filters, ad blockers, iCloud Private Relay | Turn VPN off and reload, allowlist domains, disable blockers one at a time, then cache clear / file-type check / HAR file |
| "Your file is over the 5MB limit of the Free Plan" | Free-plan import limit | Remove unneeded imports, or upgrade |
| "Rate limit reached, please try again later" | Over 50,000 blocks duplicated per hour | Wait an hour, or duplicate less at a time |
| "Request body too large" | Pasting over 500kb of text; HTTP 413 | Split the paste into chunks |
| "Unsaved transactions: You don't have access to move this page to the desired location" | Guest/partial access, or an integration lacking page access | Check your access; grant the integration access |

Three things stand out. First, **the error string carries the constraint value inline** — "over the 5MB limit of the Free Plan" names the number *and* the plan, so the user can act without a second lookup. Second, the image error explicitly reassures about data integrity: "The images themselves aren't broken." Naming what has *not* gone wrong is the right move when a broken-image icon implies data loss. Third, "Rate limit reached" is justified by fairness rather than capacity — "This limit is in place to make sure all users have fair access to Notion" — which converts an arbitrary wall into a rule the user can accept.

Counter-example in the same set: "Unsaved transactions: You don't have access to move this page to the desired location" is a compound string where a system-internal prefix (`Unsaved transactions`) is glued to a permission message. The prefix tells the user about the transaction log; the suffix tells them about permissions. Only the suffix is actionable.

**Recovery article titles use first-person "I can't" form** `[observed]`

- `I can't log in`
- `I can't access Notion`
- `I can't access my own page`
- `I can't upload or view a file`
- `Can't log into Notion Mail`

Four of five are first person; the fifth (`Can't log into Notion Mail`) drops the pronoun. Same category, same failure class, two grammars. `I can't access my own page` is the best title in the set — the word "own" carries the user's indignation and distinguishes the article from the generic access failure.

Remaining troubleshoot titles switch to noun-phrase form: `Reset Notion`, `Common formula errors`, `Common Notion errors`, `Record HAR files for troubleshooting`, `Common Jira Sync issues`. So the category holds two title grammars — first-person symptom, and noun-phrase topic — split by whether the user can describe the symptom.

**Pre-emptive routing to status** `[observed]`: both troubleshooting articles open with the same callout before any troubleshooting begins — "Check our status page and X for live updates on any known issues." Placing the is-it-just-me check above the self-service steps is correct ordering and saves the user the whole article when there is an incident.

**Recovery close** `[observed]`: "Still having trouble logging in? Contact us at [email]." A conditional question as the hand-off, not a bare "Contact support".

**Property-limit failure** `[documented]`: at 500 properties, "you'll see an error message and the new property won't be created." The article documents that an error exists without quoting it — a gap in an otherwise string-level document.

## T8 Empty states

**Two live public empty states, both defective** `[observed]`

1. Marketplace search, https://www.notion.com/templates — the page renders a results region containing only:

   > `No results for`

   with no query term, no trailing quotation marks, and no suggested next action. This is the classic unbound-interpolation bug: the template is `No results for {query}` and it ships with `{query}` empty on first load, before any search has been performed. It is also rendered on initial page load rather than only after a failed search, so every visitor sees a no-results message on a page with 30,000+ templates.

2. Immediately above it, a bare list marker with no content (rendered as a lone `-`), indicating an empty facet or filter chip region that renders its container regardless of contents.

These are worth recording precisely because Notion was selected for this corpus partly on empty-state strength: the in-product empty states are widely admired, and the public marketplace surface shows that the discipline does not extend to every team's page.

**Documented empty-state-adjacent copy** `[documented]`

- Sidebar with nothing in it is a supported question in the help FAQ: "My sidebar doesn't have any sections. How do I turn those on?" — answered by explaining that `Teamspaces` and `Private` sections appear conditionally on workspace membership. So the empty sidebar is a *designed* state, not a bug, and the FAQ exists because the design reads as broken.
- `Add property` is the label shown for a database with no properties yet — a first-run empty state expressed as a single action.
- Marketplace zero-inventory prompt: `Become a creator` — "Submit your template to the Notion template gallery, get featured, and even get paid – all in just a few clicks."

**In-product empty states not reachable** `[absent]`. The canonical Notion empty states — the blank page with its slash-command prompt, empty database views, empty Trash, `My tasks` with nothing assigned — all sit behind auth and were not observed. Any claim about them would be invention.

## T9 Notifications & system messages

**Status-page communication model** `[observed]`, https://www.notion-status.com

Aggregate state line: `We're fully operational`, with "We're not aware of any issues affecting our systems." Rolling window shown as `Jun 2026-Sep 2026`. Components are grouped into five families, and the grouping is itself a piece of user-facing IA:

| Family | Components |
|---|---|
| `Core Services` (5) | `Login and user accounts` · `View and edit content` · `Databases` · `Search` · `Notifications` |
| `Notion AI` (4) | `Notion Agent` · `Enterprise Search` · `Custom Agents` · `AI Meeting Notes` |
| `Developer Platform` (4) | `Notion API` · `Notion MCP` · `Notion Workers` · `Data & Integrations` |
| `Notion Apps` | `Notion Calendar` · `Notion Mail` · `Notion Sites` |
| (standalone) | `Marketplace` · `Administration` |

The component names are **capabilities, not services**: `View and edit content` rather than "Block service", `Login and user accounts` rather than "Auth". A user who cannot save a page knows to look at `View and edit content`; they would not know to look at an internal service name. `Notifications` being a named core component is a signal that Notion treats notification delivery as user-visible infrastructure. Affordances: `Subscribe to updates`, `View history`. No live incident was in progress, so incident-narrative copy (investigating / identified / monitoring / resolved) was `[absent]` at harvest time.

**Reminders as a user-set notification** `[documented]`: inside the date property, `Remind` — "set a reminder in this property that will notify you on the given date and time."

**Notification-adjacent product naming** `[observed]`: `AI Meeting Notes` glossed as "Automate your meeting notes and follow-ups, no bot needed". "No bot needed" is a differentiator expressed as the absence of a familiar annoyance — the meeting-recorder bot joining the call. Naming the thing you *don't* do is an underused move.

**Billing-failure notification, documented in prose** `[documented]`: "Your account email will be notified after each failed payment. Payments may be retried up to 8 times within the next month. After this, if the payment did not succeed, your workspace will get restricted to limited-access for a period of time before being downgraded to the Free plan." The exact retry count and the two-stage consequence (restricted → downgraded) are published, which is unusually specific dunning transparency. The email strings themselves were not observed.

**Guest-invite request flow** `[observed]`, pricing matrix: "Workspace members can send guest invite requests to their workspace owners for review when guests are disabled in the workspace." A blocked action converted into a request notification rather than a dead end.

**Feedback widget** `[observed]`: every help article closes with `Give Feedback` → `Was this resource helpful?` → 👍 / 👎. "Resource" rather than "article" or "page", presumably to cover both help docs and guides.

## T10 Disclosures, legal & compliance

**The pricing comparison table gloss pattern** `[observed]` — the strongest disclosure practice in this file.

Every row in the 60+ row feature matrix is preceded by a **plain-language explainer sentence**, not a tooltip. The explanation is in the DOM and in the reading order, above the feature name and its per-tier values. Examples:

- Before `Pages & blocks`: "Blocks are pieces of content you add to a page (e.g. to-do checkboxes, paragraphs, bullet points, etc.). Teams who want to try collaborating in Notion can use the Free Plan with up to certain number of blocks before upgrading."
- Before `File uploads`: "On the Free plan, you can upload images, videos and file attachments up to 5MB each. Upgrade to a paid plan for unlimited file uploads with a ~5GB max per file."
- Before `External guest limit`: "Guests are external collaborators outside your organization, such as agencies, partners, contractors, or vendors."
- Before `Custom domains and branding`: "Connect a custom domain to your Site and remove Notion branding for $8/month/domain paid annually, or $10/month per domain paid monthly."

Two things to note. Jargon is defined **at the point of the pricing decision**, not in a glossary — the user learns what a block is in the row where block limits are priced. And a whole extra price appears inside an explainer ("$8/month/domain"), meaning the matrix carries add-on pricing in prose. The Free-plan block explainer also contains a grammatical defect: "with up to certain number of blocks" is missing an article, and the number is never stated — a vague limit inside a disclosure whose whole job is to state the limit.

**Value hedging is explicit** `[observed]`: `~5GB max per file` (tilde on a ceiling), `up to 8 times`, `up to 500 properties`, `up to 50,000 blocks per hour`, `Up to 5 MB`. Notion consistently marks approximations and ceilings rather than rounding silently.

**AI data-handling disclosure** `[observed]`, pricing FAQ, question `How does Notion AI use my data?`. Summary: standard encryption and privacy practices apply; models are not trained on customer data unless the customer opts in; data passed to AI subprocessors only to deliver the feature; contractual prohibition on subprocessor training. Leads with encryption, then the training commitment, then the subprocessor chain — i.e. it leads with the thing the reader is most afraid of. The matrix row states retention numerically: `30 day retention` on Free/Plus/Business, `Zero data retention` on Enterprise, with the gloss "our LLM providers utilize zero data retention for Enterprise plan workspaces". The scope limiter ("for Enterprise plan workspaces") is inside the claim rather than footnoted.

**Refund policy — a two-tier disclosure with a jurisdictional carve-out** `[observed]`

Question 1: `How do refunds work?` Substance: self-described "simple" policy; full non-prorated refund within 3 days of monthly signup or 30 days of annual; separate remedy for accidentally-added members (prorated, 3 days from invoice, conditional on removing the members first); and a catch-all invitation to write in if unhappy.

Question 2: `What if I live in a region with a mandatory refund policy?` Substance: EU/UK and similar regions may be refunded past the standard window, with the EU 14-day example given explicitly against the "72 hours" standard.

This is the pattern worth stealing: rather than writing one policy hedged to satisfy every jurisdiction, Notion writes the **simple policy as primary and the statutory override as a separate, adjacent question**. Most readers get the short answer; the affected minority gets a question addressed to them in the second person ("if I live in").

There is a defect across the pair: the primary answer says "within three days", the carve-out answer says "past 72 hours" and "rather than 72 hours". Same duration, two units, two answers, one page.

**Billing-mechanics disclosures written as arithmetic in prose** `[observed]`: seven consecutive FAQ items cover seat counting, proration, mid-cycle changes, renewal synchronisation, and upgrade vs downgrade timing. The consistent framing is **who is charged what, when** stated as a rule plus its consequence, e.g. "For every member you delete from your workspace, you will open up 1 available paid seat." and, for downgrades, "Your account will be downgraded at the end of your billing cycle." Notably it states the non-refund on member removal plainly: "you will not receive credit but instead will still have use of that seat for a different user for the remainder of the billing period."

**Eligibility disclosure** `[observed]`: the education discount is stated with its constraint in the same sentence — "The Plus Plan (with a 1-member limit) is free for students and educators" — and with an anti-exclusion note: "Thousands of school email domains are eligible, not just .edu!"

**Data-loss disclosure with a bounded promise** `[observed]`, help FAQ: "We keep backups of our database, which allows us to restore a snapshot of your content in the past 30 days if you need it." Preceded by "Accidents happen 😅". An emoji in a data-loss answer is a register choice; it reads as reassurance here because the answer is yes.

**Compliance/admin feature naming** `[observed]`: `Audit log` · `SAML single sign-on (SSO)` · `User provisioning (SCIM)` · `Domain verification` · `Domain Management` · `Security & Compliance connections (DLP, SIEM)` · `Custom data retention settings` · `AI Meeting Notes transcript deletion` · `Zero data retention with LLM providers`. Abbreviations are always expanded-then-bracketed on first use in the matrix. Inconsistent casing: `Domain verification` in a tier card, `Domain Management` in the matrix.

**Footer legal links** `[observed]`: `Terms & privacy` (pointing at a raw `notion.so/<32-hex-id>` URL — the legal hub is itself a Notion page with an un-slugged ID, which is on-brand and slightly undermining for a document users may need to cite) and `Your privacy rights` (deep-linking to a `#california` anchor). `Cookie settings` present as a persistent footer control.

## T11 Help-centre architecture

**Shape:** three-tier. Sidebar group (activity phrase) → category (object noun) → article, with a parallel role-based axis (`Browse by team`) and a parallel content-type axis (`Help doc` vs `Guide`).

**The two content types are labelled on the cards.** `[observed]` Every card in a category carries a type chip — `Help doc` or `Guide` — and the `/all` pages split them into separate `### Help Docs` and `### Guides` lists. This is the most useful structural decision in Notion's help IA: the reader is told, before clicking, whether they are getting a reference page or a narrative walkthrough. The two types have visibly different title grammars:

**Help doc titles — short, noun-phrase or imperative, 2-4 words** `[observed]`

`Intro to databases` · `Intro to formulas` · `Database properties` · `Relations & rollups` · `Database settings` · `Database templates` · `Sub-items & dependencies` · `Task databases & sprints` · `Data sources` · `Unique ID` · `Reset Notion` · `Create a page` · `Create a subpage` · `Create a database` · `Share your work` · `Start here` · `Change your plan` · `Paid plan trials` · `Understanding block usage`

Exception that proves the rule: `Optimize database load times & performance` is a nine-word imperative sitting in a list of two-word nouns.

**Guide titles — long, outcome-led, often with a because-clause** `[observed]`

`Building a comprehensive team notes & docs database` · `Database properties help organize your team's information` · `A guide to connecting projects and meeting notes` · `How to build a wiki for your product team` · `This project management system connects the dots for your product team` · `Project management that evolves with your team` · `Connect projects and docs to get more done, faster` · `Break tasks into manageable steps with sub-tasks and dependencies` · `Synced Databases bridge the gap between different tools` · `Grow with quality using these systems to track applicants and onboard new hires` · `A user research database to help product teams take action on feedback` · `Databases reimagined— what's changed?`

Guide titles are **sentences with a claim in them** (`Database properties help organize your team's information`, `Synced Databases bridge the gap between different tools`) — closer to blog headlines than help titles. Three near-identical `How to build a wiki for your X team` variants (product / design / engineering) show a deliberate per-audience duplication strategy. `Databases reimagined— what's changed?` carries a **malformed em-dash with no space before and one after**, and is the only question-form title in the databases set.

**Category pages are teasers, not indexes.** `[observed]` A category page shows six `Popular topics` cards plus four `Popular guides`, with `See all` linking to `/category/<slug>/all` for the complete list. So the full article inventory is one click deeper than the category. Troubleshoot has only 10 articles total, meaning the "popular" cut hides four of ten — a case where progressive disclosure costs more than it saves.

**Routing furniture, in order of appearance** `[observed]`

1. `Search help center` (top of sidebar and hero)
2. Hero: `Hi, how can we help you?` — a question in the second person as the page H1
3. Four quick-link chips directly under search: `Billing` · `Dashboards view` · `Restoring content` · `Sharing & permissions`
4. `Popular topics` — six cards, each with a one-line gloss ("New to Notion? Start here!", "Learn how to use Notion AI features.", "Build Custom Agents to automate recurring work.", "Buy, track, and manage credits across your workspace.", "Share Notion pages and collaborate with others.", "Organize content your way using database features.")
5. `Browse by team`
6. `Notion Academy` — certification path
7. `What's new` — two most recent articles, i.e. the help centre doubles as a release-notes surface
8. `Still have questions?` → `Get in touch` ("Reach out to Notion support") → `Find a consultant` → `Join the community`

Human contact is last and is preceded by two paid/community deflections (consultants, community). Compare the sidebar, where `Chat with us` sits high under a `Support` group — so the chat entry point is persistent in the sidebar but de-emphasised in the page flow.

**Article-internal structure** `[observed]`: `In this help doc` label → H2 restating the meta description as a sentence → rule → sections with self-linking H2s (each heading is an anchor link to itself) → `Contents` list at the *bottom* rather than the top → `Give Feedback` → `Up next`. Placing the table of contents after the body is unusual; the `In this help doc` label at the top appears to be a collapsed-ToC affordance that renders as a bare label in server HTML.

**Callout taxonomy** `[observed]`, three recurring illustrated callout types distinguishable by asset name: a resources callout (used for "check the status page" and "Learn more" link lists), a tip callout (used for "Still having trouble…" and AI-autofill hints), and a note callout (used for permission preconditions and capability limits — "**Note:** To apply conditional color to database pages, you must have `Can edit content` access…"). The note callout consistently carries **preconditions and can't-do statements**, which is the right home for them.

## T12 FAQs

**Two FAQ blocks, in two different registers, on two page types.**

### Block A — pricing page, heading `Questions & answers`, 17 questions `[observed]`

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | How does Notion AI use my data? | Encryption and privacy practices; no model training without opt-in; subprocessors contractually barred from training |
| 2 | Where can I find my invoices? | Path through `Settings & members` → `Billing` → `Invoices`, then "View invoice" for the PDF |
| 3 | What are your accepted payment methods? | All major credit and debit cards |
| 4 | What is a block? | Defines a block as any single piece of content; page as an assembly of blocks |
| 5 | What happens when I go over the block storage limit on a Free Plan? | Solo workspaces unlimited; multi-member workspaces capped; at the cap you keep read/edit/organise but cannot add |
| 6 | Do you offer student discounts? | Plus free for students and educators at 1 member; sign up with school email; many domains beyond `.edu` |
| 7 | What do the different analytics tiers mean? | Three named tiers defined by what each adds |
| 8 | How is pricing calculated for the paid plans? | Per-member fee; guests free but page-scoped |
| 9 | How do I get charged when I add members to my workspace? | Seat reuse, seat increment, proration, invoice timing, renewal resync |
| 10 | How does adding and removing members work? | Proration on add; no credit on remove, seat retained for the period |
| 11 | How are paid seats counted? | Seat as a licence; owner-visible count; recalculated at renewal |
| 12 | What happens when I change plans? | Upgrade immediate and prorated; downgrade at cycle end |
| 13 | How do I cancel my paid plan? | Auto-renews until cancelled; path through `Settings` → `Billing` → `Change plan`; access persists to cycle end |
| 14 | What happens if my payment fails? Like if my credit card expires? | Email per failure; up to 8 retries in a month; then limited-access, then downgrade to Free |
| 15 | Can I change my payment method? | Yes, any time, in billing settings |
| 16 | How do refunds work? | 3-day monthly / 30-day annual full refund; separate member-addition remedy; catch-all contact |
| 17 | What if I live in a region with a mandatory refund policy? | EU/UK statutory windows may exceed the standard; 14-day EU example |

**Structural notes.** The ordering is not by frequency — it opens with an AI data question, then jumps to invoices, then payment methods, then two product-definition questions (block, block limit), then discounts, then analytics, then seven consecutive seat-and-billing-mechanics questions, then the two refund questions. The AI-privacy question is in slot one on a *pricing* page, which tells you what the current objection to purchase is. Q4 (`What is a block?`) is a glossary entry living inside a pricing FAQ, because the unit of the Free-plan limit is a block and the limit cannot be understood without the definition — a good example of putting the definition where the decision is.

Q14 is the only **two-sentence question**: "What happens if my payment fails? Like if my credit card expires?" The second sentence is a colloquial example appended to a formal question, in the user's register. It is the most human string in the block and it is doing real work — "payment fails" is abstract, "my credit card expires" is the thing that actually happened.

Q9/Q10/Q11 are substantially overlapping (add/remove members, seat counting) and could be one question; the redundancy looks like accretion from support tickets rather than design.

### Block B — help category page `Notion basics`, heading `FAQs`, 7 questions `[observed]`

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | Can I switch between workspaces that are associated with different email addresses? | Use `Add another account` in the workspace switcher |
| 2 | I clicked the Create or Join Workspace button, but it will only let me create a workspace. How do I join a workspace? | Joining only works where `Allowed Email Domains` is enabled; otherwise ask an admin for an invite |
| 3 | My sidebar doesn't have any sections. How do I turn those on? | Sections are conditional on workspace membership — `Teamspaces` and `Private` appear when there is more than one person |
| 4 | When I subscribe to a Plus Plan, does it cover all my workspaces? | No — one workspace per plan; workspaces cannot link content; use fewer workspaces |
| 5 | How can I migrate all my Notion content to a different workspace? | `•••` → `Move to`, then pick the workspace; sub-pages travel with parents; caveat that migrated pages "sometimes have issues" |
| 6 | What if I accidentally deleted something permanently? Any way to get it back? | Yes — contact support; 30-day database snapshots |
| 7 | How do I log out of my Notion account? | Via the workspace name at top-left, scroll to `Log out` |

**Structural notes.** Where the pricing block is written in neutral third-person question form, this block is written **in the user's own reported speech**. Q2 and Q3 both begin with a narrated action before the question ("I clicked the Create or Join Workspace button, but…", "My sidebar doesn't have any sections. How do…"). Q6 appends a second, anxious question to the first ("Any way to get it back?"). This is the Wise "first-person confession" pattern applied to FAQ questions rather than article titles, and it appears only in the help centre — the pricing page never uses it.

Q3 is a **designed-state complaint**: the sidebar is behaving correctly and the FAQ exists because correct behaviour reads as breakage. Q5 carries an unusual self-deprecating caveat inside the answer — migrated pages "sometimes have issues" — admitting a known rough edge in the answer to a how-to.

## T13 Terminology & glossary

| Term | Notion's usage | The alternative it rejected |
|---|---|---|
| `block` | The atomic content unit, defined publicly and used as the Free-plan billing unit | "element", "component", "node" |
| `page` / `subpage` | The document, and its child; "Think of your page as being made up of these building blocks" | "document", "note", "child page" |
| `database` | The structured collection; `Intro to databases` | "table", "list", "collection" (Notion's own earlier term) |
| `property` | A database field; its contents are `values` | "field", "column", "attribute" |
| `Relation` / `Rollup` | The two link-and-aggregate property types, always capitalised as property names | "lookup", "foreign key", "aggregate" |
| `data source` | Newer term for the underlying data behind linked views | "linked database" (which survives in the same article's slug) |
| `teamspace` | The shared area; qualified as `open & closed`, `private` | "team", "group", "space", "channel" |
| `workspace` | The account-level container, one plan per workspace | "organization", "tenant" |
| `member` vs `guest` | The two access classes; members are billable seats, guests are free and page-scoped | "user", "collaborator" (used only in the guest gloss) |
| `seat` | The billing unit; "A paid seat can be thought of as a license for one member" | "licence" (named in the gloss, not used as the term) |
| `Connections` | Third-party integrations, tiered `Basic` / `Premium` / `Advanced` | "integrations" — which survives in the URL `/integrations` and in `Browse all connections` → "Go to the gallery", so both terms are live |
| `Notion credits` | The metering unit for agents and workers | "tokens", "compute units" |
| `Custom Agents` vs `External Agents` | Notion-built vs third-party (Claude, Cursor) agents; separate help categories | "bots", "assistants" |
| `Workers` | Custom code extending Notion | "functions", "plugins", "apps" |
| `Verify` / `verified badge` | Content-freshness trust marker that feeds AI citations | "approved", "reviewed", "official" |
| `Marketplace` | The umbrella over templates, agents, consultants, connections | "Template gallery" — which survives in the help category name `Marketplace & templates`, the URL slug `template-gallery`, and the string "Submit your template to the Notion template gallery" |
| `Notion Sites` | Published pages as a product | "publish to web" |
| `AI Skills` | A template category (378 of them) for reusable AI instructions | "prompts", "macros" |
| `busywork` | The named enemy: "Automate busywork" | "manual work", "toil", "admin" |
| `system of record` | Borrowed enterprise term used in a consumer-facing headline | "single source of truth" — which appears in a customer quote, not in Notion's own voice |
| `connected workspace` | The prior positioning, still in page titles and the `Start here` curriculum | superseded in the hero by "AI workspace" |

**Live terminology migrations worth flagging.** Three renames are visibly half-done: `Template gallery` → `Marketplace` (three surfaces still say gallery), `integrations` → `Connections` (URL and one CTA still say integrations), and `Tasks` → `Sub-items` (title renamed, slug `tasks-and-dependencies` not). Also `connected workspace` → `AI workspace` at the positioning level, with the older phrase persisting in `<title>` tags and help copy. A harvest of a fast-moving product catches its vocabulary mid-move, and the residue is a reliable place to look for user confusion.

**Register split by surface.** Marketing uses `system of record`, `AI workspace`, `agents`. Help uses `building blocks`, `bottomless bin of building blocks`, `your stuff`. Pricing uses `seat`, `paid seat`, `proration` implied. The same product is described in three vocabularies, coherently: abstract for buyers, concrete for learners, precise for payers.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout. First-person plural for the company, used freely and in adverse contexts: "We'll send a link to your email address", "We keep backups of our database", "We're not aware of any issues affecting our systems", "We like to describe Notion as…", "we can help!". The company is a present actor rather than a passive system — including on the status page, where "We're fully operational" is a claim someone is making rather than a state being reported.

**Register gradient — the clearest finding in this section.** Notion runs three distinct registers and switches by stakes:

- *Playful*, in onboarding and identity copy: "The world's most beautiful notes... 😉" · "Accidents happen 😅" · "Notion isn't a productivity tool, it's a possibility tool" (creator copy) · "don't worry about not knowing everything you can do right away. We'll discover it together." · "Play around with it first."
- *Neutral-instructional*, in reference docs: "Any data put into a property is called a value." · "Auto-generated and not editable." · numbered procedures with backticked UI labels.
- *Flat-technical*, in error and billing copy: "Payments may be retried up to 8 times within the next month." · "Request body too large" · "This error, also known as an HTTP 413 error".

The gradient is right in direction but the error tier goes *too* flat — it surfaces raw engineering vocabulary (`persisting your edits`, `Storage operation`, `HTTP 413`, `Unsaved transactions`) where the other tiers would have translated. The register discipline that produces "Accidents happen 😅" in a data-loss answer did not reach the error strings.

**Emoji in production copy** `[observed]`: 😉 and 😅 in help articles, 👍 / 👎 as the feedback control, 👁️ / 🗑️ / 💬 / ⋮⋮ / ••• used *as the names of UI controls inside instructions* ("Select `👁️` next to a property to hide or show it", "Select `🗑️` next to the setting"). Referring to a control by its glyph rather than its name is an accessibility problem: a screen-reader user hears the emoji's alt name (or nothing) and has no name to search for. `•••` and `⋮⋮` have no spoken name at all. This is a real defect in otherwise careful instructional copy.

**UI strings are consistently backticked in help prose** `[observed]`: `Settings & members`, `Billing`, `Move to`, `Log out`, `Add property`, `Can edit content`. Typographic marking of interface labels inside instructions, applied with near-total consistency across the help corpus — worth noting as a house style that reduces ambiguity between "click settings" and "click `Settings`".

**Numbers as concreteness devices** `[observed]`: `30,000+ templates`, `2,083 collections`, `348 categories`, `22,018 creators`, `237 consultants`, `98% of the Forbes Cloud 100`, `Trusted by teams of 100 to 1000+`, `up to 8 times`, `500 properties`, `50,000 blocks per hour`, `~5GB`. Counts are given exactly where the system knows them (22,018 creators) and rounded where it does not (30,000+ templates) — a defensible distinction.

**Sentence case throughout** headings, buttons, and nav, with product names title-cased (`Notion AI`, `AI Meeting Notes`, `Custom Agents`, `Notion Sites`). Deviations: `Enterprise Search`, `Notion Agent`, `Business`/`Recommended` badge.

**Accessibility content** `[observed]`

- Alt text is present but **mostly non-descriptive**. Recurring values include `Illustration`, `TBD`, `Sprint board`, `AI project proposal`, `Form`, `Layout`, `Template editorial illustration`, and raw filenames (`clipboard.png`, `UI Thumbnail (3).png`, `custom agents (1).png`, `mcp.png`, `stack-of-papers.png`, `connected-blocks.png`, `hc: db settings icon`).
- `TBD` shipped as the alt text on the closing image of the Projects page is a straightforward defect — a placeholder in production.
- `Sprint board` is used as the alt text for at least six different images on the Projects page, including a G2 badge, a wiki screenshot, a docs screenshot, and an AI screenshot. Copy-paste alt text at scale.
- `AI project proposal` is likewise reused across five unrelated integration screenshots.
- Help-article thumbnails carry either descriptive alt matching the article title (`I can't log in`, `Reset Notion`, `I can’t access Notion`) — correct — or the CMS filename (`Image_Thumbnail-6.png`) — incorrect. Both patterns coexist inside one card grid.
- Consultant and creator avatars carry genuinely good alt: `A profile image of The Organized Notebook`, `A profile image of Marie-Pier Rochon`. Templated but correct.
- **No `Skip to content` link was observed** in the server HTML of any page inspected.
- Self-linking H2 anchors in help articles mean every section heading is also a link to itself, which produces heading text that is also link text — navigable, but it inflates the link list for screen-reader users.
- Heading hierarchy on the templates page uses `##` for category tiles and `#####` for consultant names, with `###` for template counts — the levels encode visual size rather than document structure.

**Negative findings, recorded honestly**

- Bare `Learn more→` used at least six times across two pages, with the object supplied only by an adjacent card title.
- Three labels for the sales motion: `Request a demo`, `Contact Sales`, `Contact us→`.
- Three labels for free signup: `Get Notion free`, `Sign up`, `Get started`.
- `Join the community` links to webinar signup, and its own gloss says "Sign up for webinars".
- `Notion's editorial calendar` template CTA points to `/integrations/slack`.
- `No results for` renders with an empty interpolation slot on first load of the marketplace.
- Two sidebar groups begin `Get started`.
- `Domain verification` vs `Domain Management` inconsistent casing; `File` vs `Files & media` inconsistent property naming within one article.
- "three days" vs "72 hours" for the same refund window in adjacent FAQ answers.
- "with up to certain number of blocks" — missing article, and the number is never given, in a disclosure whose purpose is to state a limit.
- Three near-duplicate generic error strings, self-documented by Notion.
- `TBD` and reused `Sprint board` alt text in production.
- UI controls named by emoji glyph (`👁️`, `🗑️`, `⋮⋮`, `•••`) in step-by-step instructions.
- Mid-sentence capital in the hero (`teams and agents Think together`) that survives into plain text and assistive output.

---

## Transferable patterns

1. **Label + benefit gloss as the nav unit.** Every product nav item carries a 3-4 word gloss ("Agents — Automate busywork"). It costs one line and removes the need for the user to click to find out what a feature is. Condition: it only works if the gloss is genuinely informative — the one pun in Notion's set (`Notion Calendar` — "It's time") is the item where the pattern fails.
2. **Verb at the grouping level, noun at the leaf level, in help IA.** `Fix a problem` → `Troubleshoot`; `Build databases` → `Databases`. Users route on intent and land on the product's vocabulary, so they learn the term without needing it to search. Directly applicable to any support IA where internal object names differ from user language.
3. **Define jargon in the row where it is priced.** Notion explains what a block is immediately above the row that limits blocks, and puts `What is a block?` inside the pricing FAQ. Put the definition at the decision, not in a glossary. Highly transferable to fee, limit, and eligibility tables.
4. **Free vocabulary, fixed state machine.** `Status` lets users name anything but forces every tag into `To-do` / `In Progress` / `Complete`. Constrain the state taxonomy at the grouping level and let labels float, so reporting stays meaningful across bespoke workflows. Applicable anywhere users can rename statuses — disputes, case management, order pipelines.
5. **Publish the error catalogue.** A single help page that lists error strings verbatim, each with `When this error may occur` and `What you can try to fix the error`, is both a support asset and a content-design audit. Notion's own page reveals three duplicate generic errors and four leaked engineering terms — writing the page is how you find that out.
6. **"What you can try" instead of "How to fix".** Honest hedging where the cause is outside your control (network, VPN, IT policy). Prevents the article from over-promising and makes the failure-to-resolve case feel anticipated rather than broken.
7. **Simple policy primary, statutory override adjacent.** Refunds are written once in plain terms and once again as a separate question addressed to jurisdictions with mandatory rights. Better than a single hedged policy that serves nobody. Directly relevant to consumer-rights, cooling-off, and withdrawal-right disclosures.
8. **Name what has *not* gone wrong.** "The images themselves aren't broken." One sentence that prevents the user from inferring data loss from a broken-image icon. Reusable in any partial-failure state where the visible symptom implies something worse than the cause.
9. **Order of operations as a commitment-defuser.** "Play around with it first. Pay and add your team later." Two sentences that convert a signup CTA from a decision into a sequence.
10. **`Up next` at the foot of reference articles.** One repeated module turns an unordered reference set into a linear onboarding curriculum without restructuring anything. Cheap retrofit for an existing help centre.

## Caveats & gaps

- **All in-product states are documented, not observed.** Status chips, toasts, validation messages, the block-limit wall, and the celebrated Notion empty states sit behind auth. Where strings appear in this file they are quoted from help articles that describe the UI, and are marked `[documented]`. The two live empty states recorded (both defective) are on the public marketplace, not in the product.
- **Pricing FAQ answers were fully rendered in server HTML** and are summarised here rather than quoted, per the quotation rules. The 17 questions are verbatim.
- **No published voice-and-tone guide or design system was found.** Searched the footer, the Resources menu, `/about`, and the help centre; Notion's public surfaces carry no content style guide, no writing principles page, and no design-system documentation of the kind the brief anticipated. The voice findings in T14 are inferred from copy across 15 pages, not read off a stated standard. Recorded as `[absent]` rather than guessed at.
- **Notion Academy (`academy.notion.com`) and the developer docs (`notion.dev`, `developers.notion.com`) were not harvested.** Both are separate properties and would likely carry richer onboarding-step and error-code vocabulary respectively.
- **Category pages show only a "popular" cut.** Full article inventories were retrieved for Troubleshoot and Databases via the `/all` variant; the other 20 categories were seen only as six-card teasers, so T11's title-grammar analysis rests on two categories.
- **Help-article bodies were opened for only four articles** (`cant-log-in`, `notion-error-messages`, `start-here`, `database-properties`). Titles elsewhere are high-signal for IA and task phrasing but say nothing about answer structure.
- **No live incident during harvest,** so the status page yielded component naming and the all-clear string but no incident-narrative copy (investigating / identified / monitoring / resolved). Marked `[absent]` in T9.
- **`notion.so` redirects to `notion.com`.** All URLs in Sources are given as fetched; the brief's primary URL was `notion.so`.
- **Mobile app copy not harvested** — out of the public web surface.
- **Localisation not sampled.** A 22-locale switcher is present; only en-US was inspected. Several patterns recorded here (the label+gloss nav in particular) are length-sensitive and may not survive translation.

## Sources

1. https://www.notion.so/ (redirects to https://www.notion.com/)
2. https://www.notion.com/pricing
3. https://www.notion.com/help
4. https://www.notion.com/help/category/troubleshooting
5. https://www.notion.com/help/category/troubleshooting/all
6. https://www.notion.com/help/category/new-to-notion
7. https://www.notion.com/help/category/plans-billing-and-payment
8. https://www.notion.com/help/category/databases/all
9. https://www.notion.com/help/cant-log-in
10. https://www.notion.com/help/notion-error-messages
11. https://www.notion.com/help/start-here
12. https://www.notion.com/help/database-properties
13. https://www.notion-status.com/
14. https://www.notion.com/templates
15. https://www.notion.com/product/projects
