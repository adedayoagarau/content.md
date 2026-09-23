# 040. Okta

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Enterprise identity and access management (workforce IAM / IGA / PAM), with a customer-identity arm and, since the Auth0 acquisition, a two-platform portfolio |
| Primary URL | https://www.okta.com/ |
| Corpus rank | 040 |
| Benchmark strength (source list) | High-stakes administration guidance |
| Locale / market observed | en-US. **Fourteen country sites** in the marketing switcher (`Australia`, `Brazil`, `Canada (EN)`, `France`, `Germany`, `India`, `Japan`, `Korea`, `Mexico`, `Netherlands`, `Singapore`, `Spain`, `Sweden`, `United Kingdom`). Product documentation offers only three: `English (United States)` · `日本語 (日本)` · `Français (France)` |
| Platform observed | Web (AEM-backed marketing), DITA-OT-generated product docs (`help.okta.com`), VuePress developer docs (`developer.okta.com`), Salesforce-backed status page and Support Center |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Trust Center at `trust.okta.com`; separate security-research site `security.okta.com` / `sec.okta.com`; published `Okta Data Retention Policy`; `Accessibility` as a top-level `Values & Impact` nav item; `Secure Identity Commitment` as a named, quarterly-reported programme. Owns Auth0 (corpus 038) |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Full for the assigned focus — **the complete 254-entry API error catalogue was captured verbatim, and the high-stakes administration artefacts (user-status mapping table, deactivate/delete consequence matrix) were captured in full.** Partial elsewhere: the Support Center KB, `trust.okta.com`, and the Identity Engine documentation tree were not harvested |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.okta.com/ | Rotating hero, four solution cards, six customer stat cards, analyst placements |
| Pricing | https://www.okta.com/pricing | Two platform tabs, five workforce suites, ~15 add-on cards, two FAQ sets, four footnote levels |
| **API error codes** | https://developer.okta.com/docs/reference/error-codes/ | **254 codes with summaries and HTTP status; the OAuth/OIDC error table** |
| Status page | https://status.okta.com/ | Cell-partitioned; incident records carry a structured `Impacted Audience` field |
| Docs home | https://help.okta.com/en-us/content/index.htm | Seven documentation sets, each with a one-line scope |
| Manage users | https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-people.htm | Nineteen admin-task titles — the administration content inventory |
| **Deactivate and delete user accounts** | https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm | **The three-way consequence matrix — the single best artefact in this file** |
| **User account status** | https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm | **API status → Admin Console label → Cause, mapped side by side** |
| Secure Identity Commitment | https://www.okta.com/secure-identity-commitment/ | Four-pillar security programme; post-breach institutional voice |

---

## T1 Navigation & IA labels

**Global nav is five nouns, and one of them is a hybrid** `[observed]`

`Products` · `Solutions` · `Learning & Support` · `Developers` · `Company`

`Learning & Support` is the unusual one: most enterprise sites separate education from support, and Okta's combined menu then subdivides into `Resources` · `Get Support` · `Customer Success` · `Community`. Four groupings under one label, covering marketing content, the KB, paid services and the forum — which is accurate to how an enterprise customer actually escalates (read → search → engage your CSM → ask peers) but makes the top-level label carry a lot.

**The `Products` menu is organised by security-market category, using the analyst's vocabulary** `[observed]`

`Agentic AI Security` · `Identity & Access Management` · `Privileged Access Management` · `Identity Threat Detection & Response` · `Customer Identity & Access Management` · `Identity Governance & Administration` · `Integrations`

These are **Gartner category names, not Okta's own** — IAM, PAM, ITDR, CIAM, IGA are the acronyms a security buyer brings with them from a market guide. Okta has organised its own navigation around the taxonomy its buyer already holds rather than around its internal product families. For a company that sells into a committee, this is a deliberate and defensible choice, and it is the inverse of what DigitalOcean does (infrastructure-layer grouping) and Retool does (lifecycle-verb grouping).

**Two platforms, named and separated at every level** `[observed]`. A `Platforms` block appears in the `Products` menu with two entries and one-line scopes:

- `Okta` — "Secure all of your identities within an identity security fabric."
- `Auth0` — "Ship amazing experiences with enterprise-grade customer identity."

The `Developers` menu is then split into `Okta Platform` and `Auth0 Platform`, with **fully parallel sub-lists** — each has its own Developer Center, Community, and Status link. So Okta's own navigation maintains two documentation estates, two forums, two status pages and two knowledge bases, side by side, three years after the acquisition, with the Auth0 entries marked `↗`.

`identity security fabric` is a coined category term used only in the Okta platform's one-liner, with no gloss anywhere on the pages harvested.

**`Solutions` is split three ways, and the first split is the 2026 one** `[observed]`

`By Identity Type`: `Workforce Identity` · `Customer Identity ↗` · `External Identities` · `AI Agent Identities` (New) · `Non-Human Identities`

**Five identity *types* as the primary segmentation axis** is the notable IA decision, and it is the one that most clearly marks the current moment: humans are split into three (workforce, customer, external) and non-humans into two (AI agents, everything else). Compare 1Password's `human / AI agent / machine` triad and Auth0's `AI Agents / B2C / B2B / Machine Identities`. All three vendors reorganised their navigation around the same new distinction within roughly the same year.

`By Industry` follows with ten verticals, and includes `Public Sector` first and `Non-Profit` and `Small Business` in the same list as `Financial Services` — a mixed list of regulatory regimes and company sizes.

**Documentation home is a set-of-sets, each with a one-line scope** `[observed]`

| Documentation set | Scope line (verbatim) |
|---|---|
| `Identity Engine` | "Flexible components that provide an improved and intuitive identity experience" |
| `Classic Engine` | "The trusted platform for secure and protected user identities" |
| `Okta for AI Agents` | "Identity security for AI agents" |
| `Access Gateway` | "Secure access to on-premise applications" |
| `Workflows` | "Automation of identity-centric business processes" |
| `Identity Security Posture Management` | "Visibility to identify and remediate vulnerabilities" |
| `Aerial` | "Management of multiple Okta orgs from a single, centralized account" |
| `Okta Managed MCP Server` | "Secure access to identity and governance operations for AI agents" |

Seven of eight scopes are **noun phrases, not sentences** — "Automation of…", "Visibility to…", "Management of…", "Secure access to…". No verbs addressed to the reader, no "Learn how to". This is a colder register than DigitalOcean's or Retool's docs indexes, and it reads as a catalogue rather than an invitation.

**The `Identity Engine` / `Classic Engine` split is the defect worth flagging.** Two complete documentation trees for two generations of the same product, each with its own release notes, and the scope lines do not help a reader choose: "Flexible components that provide an improved and intuitive identity experience" versus "The trusted platform for secure and protected user identities". Both are positive marketing phrases; **neither tells the reader which one they are on.** Compare Retool's `classic app` banner, which states plainly "The new app builder is the recommended way to build apps and where Retool focuses new development."

Worse, the split leaks into page furniture: every article harvested carries a small grey label reading **`Classic Engine publication`** above the breadcrumb — a version marker that names the *publication*, not the reader's situation, and appears on pages reached from a URL (`/en-us/content/…`) that gives no engine hint. A reader who lands from search on a Classic Engine page has no prompt to check whether they are on Identity Engine.

**Docs breadcrumbs are three levels and clean** `[observed]`: `User management` → `Manage users` → `User account status`. Left-nav parent-child pairs use `<Domain> management` → `Manage <objects>` — a noun-then-verb pairing that distinguishes the subject area from the task collection.

**Footer** `[observed]`: `Starting with Okta` (five links) · `Help & Support` (four, including **both** status pages) · then a legal row: `Legal` · `Privacy Policy` · `Site Terms` · `Security` (→ `trust.okta.com`) · `Sitemap` · `Cookie Preferences` · `Your Privacy Choices`.

`Values & Impact` in the `Company` menu contains `Responsibility` · `Okta for Good` · `Trust ↗` · **`Accessibility`** · `Secure Identity Commitment`. Accessibility promoted to a top-level company-values nav item, alongside the security programme, is worth recording — see T14.

## T2 Value proposition & headline patterns

**The hero is a rotating three-slide carousel and one slide is an event ad** `[observed]`

1. `We're streaming live from the Oktane main stage` — "Catch our biggest announcements of the year. Tune in September 23, at 9 AM PDT / 12 PM EDT." → `Register now`
2. `Okta secures AI` — "Bring the agents driving your organization under the same trusted platform that secures the rest of your identities." → `Get started` / `Contact sales`
3. `Future-proof your identity stack` — "See the platform breakthroughs transforming identities, access points, and workflows." → `Explore innovations` / `Contact sales`

**`Okta secures AI` is a three-word subject-verb-object sentence**, the shortest hero in this DEV set, and its subhead does the real work: "Bring the agents driving your organization **under the same trusted platform that secures the rest of your identities.**" The pitch is not a new capability; it is **extension of an existing trust relationship to a new population**. For an incumbent selling to its own install base, that is exactly the right frame, and the phrase `the rest of your identities` quietly asserts that agents were always identities.

`Future-proof your identity stack` is the weakest of the three — a stock verb and a stock noun — and its subhead ("platform breakthroughs transforming identities, access points, and workflows") is three abstract nouns with no object.

**Section headers are imperative-or-declarative and increasingly boastful down the page** `[observed]`

`Transform identity across your tech stack` · `Powering access for Fortune 100s, governments, global brands, and counting` · `Standardize on a proven industry leader` · `Go inside the minds of the leaders in identity` · `Ready to secure your next big move?`

`Standardize on a proven industry leader` is the only header on any homepage in this set that **names the buying behaviour it wants** (standardise) rather than a benefit. It is aimed at an enterprise architect consolidating vendors, and it is followed immediately by the two analyst placements (Gartner Magic Quadrant Leader; a Forrester 211% ROI study). Header, motivation, evidence — in that order.

**Solution cards use a title / promise / mechanism three-beat** `[observed]`

| Card | Promise | Mechanism |
|---|---|---|
| `Agentic identity` | "Secure the agentic enterprise." | "A new standard for the agentic frontier. Establish secure permissions, verify AI agent identity, and audit automated actions." |
| `Workforce identity` | "Empower your workforce, human and non-human." | "A single, secure ecosystem for your entire business. Keep employees, partners, and AI agents seamlessly connected." |
| `Customer identity` | "Protect your customer experience." | "Built for enterprise scale. Centralize your business directories, streamline access, and meet global compliance standards." |

Each promise is a short imperative sentence with a full stop; each mechanism opens with a fragment ("A new standard…", "A single, secure ecosystem…", "Built for enterprise scale.") and then gives three verbs. **Three verbs per card, consistently** — `Establish, verify, audit` · `Keep… connected` · `Centralize, streamline, meet`. A reader comparing cards is comparing verb sets.

`Empower your workforce, human and non-human.` is the neatest instance of the year's terminology shift: a possessive noun (`your workforce`) extended by an appositive that reclassifies it.

**Customer proof is a stat-plus-story pattern, and the stats are unusually varied** `[observed]`

`100%` growth in partner users onboarded (McLaren) · `100M` users on one platform and `85%` reduction in development labor costs (Wyndham) · `1,500` applications authenticated and **`41` tons of CO2 per year reduced by eliminating on-premise servers** (Hitachi) · `99.9%` faster app onboarding and `57%` reduction in user authentication time with FastPass (Booking.com) · `250+` apps integrated and `5` legacy systems retired (FedEx).

The Hitachi carbon figure is the outlier and it is doing deliberate work: an identity migration metric expressed in **tonnes of CO2**, for a buyer with an ESG reporting obligation. A single unconventional unit in an otherwise conventional stat set, targeted at one stakeholder in the buying committee.

**Two defects in the proof section** `[observed]`: the Mars story card links to `/customers/box/` (wrong destination), and the Booking.com card is headed "Booking.com empowers its teams…" while the logo grid above labels the same slot `Takeda` with an image file named `logo-booking.png`. The customer-evidence section — the part a sceptical buyer scrutinises — has at least two content-management errors.

Also: seven logo images on the pricing page and six on the homepage carry the alt text **`Fill out the form to access this content.`** — a gated-asset string leaking into the alt attribute of a decorative logo. See T14.

**Pricing headline** `[observed]`: `Plans & pricing` — "Find the right combination of Okta products and add-ons to build a powerful identity solution tailored to your organization." Then a question as the tab label: `What are you securing?` with two answers, `Workforce Identity` and `Customer Identity`, plus a routing link `Looking for Auth0 pricing?`

`What are you securing?` is the correct first question for a portfolio this wide, and it is asked in four words.

**Plan descriptions are all question-then-answer** `[observed]` — the only place in this harvest where an entire tier set is written this way:

- `Starter` — "Starting your Identity journey? Put a strong foundation in place."
- `Essentials` — "Ready to scale? Upgrade to advanced automation and security."
- `Professional` — "Need our most advanced solutions? Secure endpoints and get ahead of identity threats."
- `Enterprise` — "Require end-to-end security? Extend security to your APIs and on-prem apps."

**Each tier opens with a qualifying question the reader answers yes or no to, then an imperative.** A buyer scanning four cards is really running a four-way self-assessment, and this construction makes that explicit. It is the strongest pricing-copy pattern in this DEV set, and it is cheap to copy.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Free trial` | Nav (persistent), repeated ~12× per page in mega-menu blocks | |
| `Free Trial` | Mega-menu quick-link icon rows | **Title-case variant of the adjacent nav button** |
| `Contact us` | Nav, paired with `Free trial` | |
| `Contact sales` | Homepage hero slides 2 and 3 | Different label, same intent, adjacent surface |
| `Talk to an expert` | Homepage and pricing closing blocks | Third label for the same intent |
| `Get started` | Homepage hero slide 2 | Points at `/start-a-free-trial/` |
| `Start free trial` | Pricing Starter card and comparison table | Points at `/free-trial/` — **a different URL from `Get started`** |
| `Start a free trial` | Homepage closing block | Fourth variant |
| `Start building for free` | Customer-identity FAQ block | Fifth |
| `Explore innovations` | Hero slide 3 | |
| `Register now` | Hero slide 1 (event) | |
| `Explore Okta for AI agents` / `Explore Okta Workforce Identity` / `Explore Okta Customer Identity` / `Explore the Auth0 platform` | Four solution cards | **Consistent verb across four siblings** — the one well-managed set on the page |
| `See full story` ×6 | Customer stat cards | |
| `Explore customer stories` | Section foot, ×2 | |
| `Read more` | Analyst cards, newsroom cards (~12 instances) | Bare `Read more`, heavily repeated |
| `Learn more` | Every pricing add-on card (~23 instances) | Bare `Learn more` — see below |
| `Watch a demo` / `Watch now` | Pricing next-step block | Two labels in one card |
| `Get the checklist` / `Download the report` / `Read the details` / `Visit the hub` | Secure Identity Commitment resources | **Four format-specific CTAs, correctly differentiated** |
| `Read our commitment` | Pricing, world-class-security block | |
| `Visit page` ×3 | Secure Identity Commitment delivery cards | |
| `Visit support center ↗` / `See all offerings` / `Join Okta Community ↗` / `Explore all resources` | Mega-menu feet | Four verbs for four index links |
| `Feedback` | Every docs page, top right | Titled "Submit feedback" |
| `Skip to main content` / `Skip to docs navigation` | First in DOM on docs | **Two skip links, the second one unusual and good** |
| `Skip to content` | Marketing pages | Different wording from docs |
| `Deactivate Selected` · `Deactivate` · `Delete` · `Advanced Search` · `Add filter` · `Clear all filters` · `Search` | Admin Console, quoted in docs | `[documented]` |

**Observations.** Okta's CTA layer has the worst label proliferation in this DEV set: **five labels for "start a trial"** (`Free trial`, `Get started`, `Start free trial`, `Start a free trial`, `Start building for free`) resolving to at least three different URLs, and **three for "talk to us"** (`Contact us`, `Contact sales`, `Talk to an expert`). On the pricing page alone, `Start free trial` and `Contact us` appear in the same table header row for adjacent columns, so the reader must infer that `Contact us` for Essentials means "you cannot self-serve this tier".

**`Learn more` appears ~23 times on the pricing page** — once per add-on card — which is defensible (the card title supplies the object and the cards are visually adjacent) but produces a page whose link list is 23 identical strings for a screen-reader user navigating by links. See T14.

Two genuinely good sets. The four `Explore <named thing>` solution CTAs are consistent in verb and specific in object. And the Secure Identity Commitment resource block names the **artefact format** in every CTA (`Get the checklist`, `Download the report`, `Read the details`, `Visit the hub`), so a reader knows whether they are about to get a PDF, a page or a hub.

## T4 Onboarding & getting-started

**There is no consumer-style onboarding surface; the onboarding content is administrator procedure.** `[observed]` This is correct for the product and it is where the flagged strength lives.

**The administration content inventory is nineteen task titles, and they are the artefact** `[observed]`, from `Manage users`:

`Add users manually` · `Add and update users with Just-In-Time provisioning` · `Import users` · `Activate user accounts` · `Deactivate and delete user accounts` · `Edit deactivated user profiles` · `End Privileged Access` · `Assign applications to users` · `Search for application users` · `Unassign users from applications` · `Unlock an individual user account` · `Unlock multiple user accounts` · `Suspend and unsuspend users` · `Reset an individual user password` · `Reset multiple user passwords` · `Manage password expiry` · `Revoke a user's certificate from the Okta Certificate Authority` · `User account status`

**Every title is an imperative verb phrase naming exactly one administrative act**, and the set has three structural properties worth extracting:

1. **Singular and bulk operations are separate titles, paired.** `Unlock an individual user account` / `Unlock multiple user accounts`; `Reset an individual user password` / `Reset multiple user passwords`. The risk profile and the procedure genuinely differ (bulk operations run as background tasks and cannot be reviewed one by one), so they get separate pages rather than a "to do this for many users…" appendix. **This is the single most transferable IA decision for administrative documentation.**
2. **Reversible and irreversible pairs share a title.** `Suspend and unsuspend users` (reversible, one page); `Deactivate and delete user accounts` (one reversible, one not, one page — and the page then spends most of its length distinguishing them).
3. **The reference page sits last in the task list.** `User account status` is not filed under a concepts section; it is the nineteenth item in a list of eighteen tasks, because an admin reaches it from a status they are looking at in the console.

**The page-level opening sentence orients the admin in the console before any task** `[observed]`: "This is where you find the information you need to manage users in your org. Most of the tasks documented here are completed on the Okta Admin Console People page. To access the People page, go to Directory> (and then)People. Here, you see a list of 200 users in increments of 25."

Two notes. The navigation path is rendered as `Directory> (and then)People` — a DITA `menucascade` element whose separator is being emitted as the literal string `(and then)`, so every click path in Okta's documentation reads `Directory> (and then)People> (and then)More Actions> (and then)Deactivate`. **A structured-authoring artefact leaking as broken prose, on every procedural page in the product's documentation.** Recorded as the most pervasive copy defect in this file.

And "you see a list of 200 users in increments of 25" is an oddly specific, unexplained pagination fact given as orientation — useful to an admin about to bulk-select, but stated without saying why it matters.

**Procedure grammar** `[observed]`, from the delete procedure: numbered steps, each one imperative; optional steps marked with a leading **`Optional.`** ("2. Optional. Enter a user's first name, primary email, or username in the search field…"; "3. Optional. Perform an advanced user search:"); nested sub-steps lettered; and a self-referential repeat instruction ("Click **Add filter** to add a filter and then repeat steps a through d").

**`Optional.` as a leading word rather than a parenthetical** is worth recording: a scanning admin can skip every step that starts with it without parsing the sentence.

**Prerequisites are stated as `Note:` blocks immediately above the procedure they gate** `[observed]`:

- "Note: To deactivate a user account that's managed with Privileged Access, you must end Privileged Access for that user. See End Privileged Access."
- "Note: Users must be deactivated before they can be deleted."

The second is the ordering constraint that makes the whole page make sense, and it sits one line above step 1 of the delete procedure rather than in the conceptual section above.

**Inline constraint disclosure inside a step** `[observed]`: "Note: The `Contains` filter is only available for the `firstName`, `lastName`, `email`, and `login` attributes. The search term must contain at least three characters." And, two steps later: "Note: Using an overly complex or long search query can result in an error." **A warning about a failure the admin is about to cause, placed inside the step that causes it.**

## T5 Form & field labels

**Search-filter option labels, each with a one-clause definition** `[documented]` — the clearest labelled set in the product docs:

| Filter option | Definition (verbatim) |
|---|---|
| `Starts with` | "Returns results that start with the specified value." |
| `Equals` | "Returns results that explicitly match the specified value." |
| `Contains` | "Returns results where the attribute field contains the specified value." |
| `Greater than` | "Returns results that are greater than the specified value. For text searches, the filter returns results that come alphabetically after the search term." |
| `Less than` | "Returns results that are less than the specified value. For text searches, the filter returns results that come alphabetically before the search term." |

Every definition begins `Returns results that…`, so the five are directly comparable. And `Greater than` / `Less than` each carry **a second sentence for the non-obvious case** — what these operators mean on a text field, which is exactly where an admin's intuition fails. Two sentences where three siblings need one, because the semantics genuinely differ by data type.

**Admin Console labels quoted in docs** `[documented]`: `Directory` › `People` › `More Actions` › `Deactivate`; `Deactivate Selected`; the `Deactivate Person` dialog; the `Delete Person` dialog; `Advanced Search`; the `Choose field` list; the `Value` field; the `Status` menu; the `Person & Username` column; the `Status` column; `Add filter`; `Clear all filters`.

**`Deactivate Person` and `Delete Person` as dialog titles** `[documented]` — the destructive confirmations are named for the object *and* the verb, using the singular human noun `Person` rather than "user" (which is what the API and the rest of the docs say). The console speaks of people; the API speaks of users. See T13.

**The status column's two-name problem is documented rather than hidden** — see T6, which is the headline finding for this product's terminology work.

**API error object fields** `[observed]`, from the error-codes reference:

| Property | Description (verbatim) |
|---|---|
| `errorCode` | "An Okta code for this type of error" |
| `errorSummary` | "A short description of what caused this error. Sometimes this contains dynamically-generated information about your specific error." |
| `errorLink` | "An Okta code for this type of error" |
| `errorId` | "A unique identifier for this error. This can be used by Okta Support to help with troubleshooting." |
| `errorCauses` | "(Optional) Further information about what caused this error" |

**`errorId` is the important one and it is the transferable pattern**: a per-occurrence identifier whose documented purpose is to be *handed to a support agent*. Not a code class, not a trace ID for the developer's own logs — a string whose stated job is to travel from the customer to Okta Support. Naming the escalation function in the field's own description is what makes it get surfaced in UIs.

**And `errorLink`'s description is a verbatim copy of `errorCode`'s** — "An Okta code for this type of error" — in a five-row table that is the only structural documentation of Okta's error object. A copy-paste defect at the top of the most-referenced developer page in the product.

Note also that `errorCode` appears **exactly once** in the entire 254-entry document, in that table. The 254 entries themselves are rendered as headings with the code bolded mid-string (`E000000**1**:`), which is a rendering artefact rather than an authored one but makes the codes hard to copy.

## T6 Status & state language

### The user-status mapping table — the single most important artefact in this file `[observed]`

`User account status` publishes a three-column table: **`API Status` | `Admin Console Label` | `Cause`**.

| API Status | Admin Console Label | Cause (verbatim, abridged) |
|---|---|---|
| `Staged` | `Staged` | "…when they're first created, before the activation flow is initiated, or if there's a pending admin action." |
| `Provisioned` | **`Pending user action`** | "…but the user hasn't provided verification by clicking through the activation email or provided a password." |
| `Active` | `Active` | Four enumerated creation paths that all result in Active |
| `Recovery` | **`Password reset`** | "…when an admin requests a password reset." |
| `Password Expired` | `Password expired` | "…when the password has expired and the account requires an update to the password before a user is granted access to apps." |
| `Locked out` | `Locked out` | "…when the user exceeds the number of login attempts defined in the login policy." |
| `Suspended` | `Suspended` | "…when an admin explicitly suspends them. The user can't access apps, the Admin Console, or the Okta End-User Dashboard. App assignments are unaffected and the user profile can be updated." |
| `Deprovisioned` | **`Deactivated`** | "…when an admin explicitly deactivates or deprovisions them. All app assignments are removed and the password is permanently deleted." |

**Three of eight states have a different name in the API than in the UI, and Okta publishes the mapping in a single table rather than leaving the admin to discover it.**

The three renames are all improvements in the same direction — from *what the system did* to *what someone needs to do or what happened*:

- `Provisioned` → **`Pending user action`**. The API describes the system's completed act; the console describes **whose move it is**. An admin looking at a list of 200 users wants to know which ones are waiting on *them* and which are waiting on the user, and `Provisioned` answers neither question. This is the best single rename in the corpus so far.
- `Recovery` → **`Password reset`**. `Recovery` is the internal lifecycle stage; `Password reset` is the thing that is happening.
- `Deprovisioned` → **`Deactivated`**. The UI uses the word that matches the button the admin pressed (`Deactivate`), so the state name and the action name share a root. The API keeps the older term, and the `Cause` column covers both ("explicitly deactivates **or deprovisions**").

Two further observations. `Password Expired` (API) → `Password expired` (console) differ only in capitalisation, which is listed anyway — the table is exhaustive rather than selective, so a reader can trust it. And the `Cause` column is written as a **sentence completion**: every cell begins "Accounts have a … status when…", so the eight rows read as one parallel construction.

**Why this is the pattern to steal.** Every product with an API and a console eventually accumulates two vocabularies for one state machine, and the usual outcomes are (a) the UI inherits the engineering word, or (b) the UI diverges silently and support tickets follow. Okta does the third thing: **diverge deliberately, in the user's favour, and publish the mapping in the reference the admin is already reading.** It costs one table.

### Lifecycle consequence matrix `[observed]`

`Deactivate and delete user accounts` publishes a second table — ten consequences × three actions (`User is suspended` / `User is deactivated` / `User is deleted`), each cell `Yes` or `No`:

| Consequence (verbatim) | Susp. | Deact. | Del. |
|---|---|---|---|
| "User is no longer able to create sessions, and all active sessions in Okta are stopped." | Yes | Yes | Yes |
| "User's assigned apps are revoked and the user's app assignments are removed." | No | Yes | Yes |
| "User's admin roles are revoked and the user is unassigned from the Okta Admin app." | No | Yes | Yes |
| "User's authentication factors are deactivated and user's authentication factors are removed." | No | No | Yes |
| "User is removed from all Okta groups, including all app assignments and role assignments through group membership." | No | No | Yes |
| "User's linked object records are deleted (where the user is either the source or target)." | No | No | Yes |
| "User's Customer Data records are deleted from Universal Directory." | No | No | Yes |
| "User isn't visible on the People page and isn't returned in API responses." | No | No | Yes |
| "User's username (or other custom unique attributes) can be reused." | No | No | Yes |
| "User and device relationships are deleted." | No | No | Yes |

**This is what "high-stakes administration guidance" looks like as a content artefact.** The three actions look similar in the console (three menu items on one page) and differ enormously in blast radius. Rather than writing three prose descriptions the admin must hold in their head, Okta renders the difference as a matrix where **the shape of the Yes column is itself the warning**: suspend has one Yes, deactivate has three, delete has ten.

Four rows deserve separate note. `User's username (or other custom unique attributes) can be reused.` is a consequence nobody would think to ask about and that matters enormously in an org with naming policies. `User isn't visible on the People page and isn't returned in API responses.` tells an admin the user will vanish from their own audit tooling. `User's authentication factors are deactivated and user's authentication factors are removed.` distinguishes deactivation from removal of the factor in a single sentence (though the repetition of "user's authentication factors" is clumsy). And the very first row is the one consequence all three share — **the table leads with what is common, then diverges**, so the reader learns the baseline before the differences.

### Irreversibility and retention, stated plainly `[observed]`

> "When you delete a user account, **you can't undo the deletion.** Also, you can't delete users identified as the technical or billing contact. You can perform multiple deletion requests at the same time. Okta automatically initiates the permanent deletion of Customer Data in 30 days. Any data referencing the user is kept for a period defined by the Okta Data Retention Policy."

Five facts in five sentences: irreversibility, the exception that blocks the action, the concurrency allowance, the **retention window with a number**, and a pointer to the governing policy for everything else. No hedging, no apology, no "please be careful". And the framing sentence at the very top of the page names the *reason an admin would want this*: "Deleting personal user accounts and user data can help you satisfy data protection and disposal laws in your region." **The destructive action is introduced as a compliance capability**, which is how the admin's manager will have described it.

Deactivation, by contrast, is documented with its operational texture: "Deactivation runs as a background task, and depending on the number of affected users, can take significant time to complete." Plus the four cases where deprovisioning does *not* happen (app is inactive / private / a system app / deprecated) and a `Note:` correcting a likely wrong inference — "Although deactivated users no longer have access to any apps, the users aren't removed from any groups."

### Status page state and partition vocabulary `[observed]`

Okta's status page is Salesforce-backed and partitions by **cell**, not by region or service: `Cell OK9`, `Cell OK7`, `Cell OK11`, `OP1`, `OP2`, and in prose `US Cell 1`, `US Cell 2`, `US Cell 3`, `US Cell 4`, `US Cell 7`, `EMEA Cell 9`, `US Cell 12`, `US Cell 14`, `US Preview 3`. The machine field is a domain-and-number list: `okta.com:9`, `oktapreview.com:1`, `okta-emea.com:1`.

**A customer must know which cell they are in to read the page** — the same problem 1Password solves with a `How to find your region` link, and Okta does not appear to solve on the page itself. And the naming is inconsistent between the human prose (`Cell OK9`, `US Cell 1`, `Preview 1`) and the machine field (`okta.com:9`), with at least three surface forms for one cell.

**The genuinely distinctive field is `Impacted Audience`**, which takes the values `Admin`, `End user`, and `API Products`, combined per incident (`Admin;End user`, `Admin;API Products;End user`, `API Products`, `Admin`, `End user`).

**Okta classifies every incident by which of its three audiences is affected**, as structured data, not as prose. Across the incidents harvested the distribution is real — some are `Admin` only (console-viewing issues), some are `End user` only (login failures), some are `API Products` only. An enterprise identity admin's first question during an incident is "are my users locked out, or is it just me in the console?" and the status page answers it in a field. **The best status-page metadata decision in this harvest**, and the exact counterpart to 1Password's task-named components: both make the status page answer the user's question rather than describe the architecture.

Incident state observed: `Resolved`. Incident identifiers: `I-11462`, `I-11432`, `I-11355`, `I-11070`, … — sequential, quotable, and usable in a support ticket.

## T7 Error, failure & recovery

**Okta publishes a 254-entry error catalogue at `developer.okta.com/docs/reference/error-codes/`, framed as complete**: "This document contains a complete list of all errors that the Okta API returns." Codes run `E0000001`–`E0000281` with **~25 numbering gaps** and no tombstones. Every entry gives a code, a summary, an HTTP status, and a collapsed `Show Example Error Response` disclosure.

### The deliberate-vagueness split — both halves, and no stated rationale

Okta ships two distinct registers inside one catalogue, and the pairing is visible if you read across:

**The deliberately uninformative, developer-facing half** `[observed]`

| Code | Summary (verbatim) | HTTP |
|---|---|---|
| `E0000004` | `Authentication failed` | 401 Unauthorized |
| `E0000005` | `Invalid session` | 403 Forbidden |
| `E0000006` | `You do not have permission to perform the requested action` | 403 Forbidden |
| `E0000011` | `Invalid token provided` | 401 Unauthorized |
| `E0000014` | `Update of credentials failed` | 403 Forbidden |
| `E0000015` | `You do not have permission to access the feature you are requesting` | 401 Unauthorized |
| `E0000017` | `Password reset failed` | 403 Forbidden |
| `E0000085` | `You do not have permission to access your account at this time.` | 403 Forbidden |
| `E0000079` | `This operation is not allowed in the current authentication state.` | 403 Forbidden |

`E0000004 Authentication failed` is two words with no object. It does not say whether the user exists, whether the password was wrong, whether the factor failed, or whether a policy denied it. `E0000085 You do not have permission to access your account at this time.` is the strongest instance: **it tells the user they are being denied, and the phrase `at this time` signals that the denial is conditional, without naming the condition.** A legitimate user learns "try later or ask someone"; an attacker learns nothing about which control fired.

**The end-user-facing half, written as displayable copy** `[observed]`

| Code | Summary (verbatim) | HTTP |
|---|---|---|
| `E0000207` | `The username and/or the password you entered is incorrect. Please try again.` | 401 Unauthorized |
| `E0000119` | `Your account is locked. Please contact your administrator.` | 403 Forbidden |
| `E0000259` | `Login not allowed at this time. Reset your password or contact your administrator for further assistance.` | 403 Forbidden |
| `E0000082` | `Each code can only be used once. Please wait for a new code and try again.` | 403 Forbidden |
| `E0000109` | `An SMS message was recently sent. Please wait 30 seconds before trying again.` | 429 Too Many Requests |
| `E0000118` | `An email was recently sent. Please wait 5 seconds before trying again.` | 429 Too Many Requests |
| `E0000133` | `A phone call was recently made. Please wait 30 seconds before trying again.` | 429 Too Many Requests |
| `E0000099` | `Only numbers located in US and Canada are allowed. Contact your administrator if this is a problem.` | 403 Forbidden |
| `E0000112` | `Cannot update this user because they are still being activated. Please try again in a few minutes.` | 409 Conflict |
| `E0000191` | `Verification timed out. Please try again.` | 404 Not Found |

**`E0000207` is the canonical deliberate-vagueness string**: `The username and/or the password you entered is incorrect.` The `and/or` is the whole design — it is grammatically clumsy on purpose, because naming which one was wrong would confirm whether the username exists. Then `Please try again.` supplies the only action available. Sentence case, second person, terminal punctuation, polite imperative: this is displayable copy, and it is the only entry in the catalogue that reads like it was written by a content designer.

Compare `E0000004 Authentication failed` — **the same underlying event, two codes, two audiences, two registers.** The developer gets a terse machine string; the end user gets a sentence. Okta ships both, in one table, and never says why.

**The three `Please wait N seconds` rate-limit strings are the other good set**: each names the channel that was just used, the exact wait, and the action. `30 seconds` for SMS and voice, `5 seconds` for email — **different numbers per channel, published**, so a user who has just pressed "resend" knows precisely how long to sit still.

**The rationale is `[absent]`.** The page contains no sentence explaining why any message is generic, no reference to user enumeration, no distinction stated between what the end user sees and what the developer sees. The only self-aware sentences are diagnostic — `E0000001` calls itself "a fairly general error" and `E0000022` "a general error", both meaning "under-specified", not "deliberately withheld".

**This is the sharpest contrast with Auth0 (corpus 038), which Okta owns.** Auth0's Tenant Settings page names the setting (`Use a generic response in public signup API error message`), names the threat (`user registration enumeration`), names the adversary (`bad actors`), and names the suppressed code (`user_exists`). Okta *does* the same thing and *documents none of it*. One company, two platforms, two opposite disclosure postures on the identical design decision.

**And Okta leaks where Auth0 does not** `[observed]`: `E0000095` — **`Recovery not allowed for unknown user.`** The word `unknown` confirms the account does not exist. In a catalogue whose login path is carefully ambiguous, the *recovery* path names the negative case. Recorded as a genuine enumeration-adjacent defect, and a useful illustration that these decisions have to be made per-endpoint, not per-product. `E0000032 Unlock is not allowed for this user.` and `E0000034 Forgot password not allowed on specified user.` are adjacent cases that are correctly non-committal.

### Errors as administration guidance — the flagged strength, inside the error catalogue

The genuinely distinctive thing about Okta's catalogue is that a subset of entries are **not error messages at all but multi-sentence admin instructions**, triggered at the moment an administrator is about to break their own org:

> `E0000174` — "You can't disable Okta FastPass because it is being used by one or more application sign-on policies. **First, go to each policy and remove any device conditions. Then, come back and try again.**"

> `E0000219` — "This action can't be completed because it would result in **0 phishing resistant authenticators** and your org has at least one authentication policy rule that requires phishing resistant authenticators. To continue, **either enable FIDO 2 (WebAuthn) or remove the phishing resistance constraint from the affected policies. Policy rules: {0}**"

> `E0000245` — "One or more authentication method chains include a knowledge method in the first step. **Update these chains to require a possession factor in the first step: {0}**"

> `E0000209` — "{0} cannot be modified/deleted because it is currently being used in an Enroll Policy. **Please make changes to the Enroll Policy before modifying/deleting the group.**"

> `E0000262` — "Device Assurance or Device Signal Collection policies contain condition(s) with Device Posture IdP signals. **Please delete or update the corresponding policies to remove the Device Posture IdP conditions.**"

> `E0000246` — "This action can't be completed because the authentication method is in use by one or more authentication policies: {0}"

> `E0000148` — "Cannot modify/disable this authenticator because it is enabled in one or more policies. {0}"

**Five properties make these work, and together they are the transferable pattern:**

1. **The refusal names the dependency, not the rule.** Not "operation not permitted" but "because it is being used by one or more application sign-on policies".
2. **The consequence is quantified where it can be.** `E0000219` computes the outcome — "it would result in 0 phishing resistant authenticators" — so the admin sees the state they were about to create rather than the state they tried to leave.
3. **The remediation is sequenced, in order, in the error.** "First, go to each policy and remove any device conditions. Then, come back and try again."
4. **Where more than one remedy exists, both are offered.** "either enable FIDO 2 (WebAuthn) **or** remove the phishing resistance constraint from the affected policies."
5. **The affected objects are interpolated.** `Policy rules: {0}` — the admin does not have to go find which policies.

These are **guardrail errors**: the system is preventing a self-inflicted lockout of an entire organisation, and the error text is the only place the admin will ever read the explanation. `E0000219` in particular is preventing an org from removing its last phishing-resistant authenticator while a policy still requires one — i.e. locking every employee out. That an error string carries three sentences of remediation is exactly right for the stakes.

### Other error-family structure `[observed]`

**Rate limits are split by scope and by whether the limit is yours or your org's**: `E0000047` (API rate limit, 429) · `E0000109`/`E0000118`/`E0000133` (per-channel cooldowns, 429) · `E0000146`/`E0000147` ("Your organization has reached the limit of sms/call requests that can be sent within a 24 hour period", 429) · `E0000186` ("Your free tier organization has reached the limit of sms requests … within a 30 day period", 429) · `E0000150`/`E0000151` and `E0000204`/`E0000205` ("You have reached the limit of sms/call requests, please try again later"). Personal vs organisational vs free-tier exhaustion are distinguished, and the subject of each sentence tells you which (`You` vs `Your organization`).

**But `E0000150` and `E0000204` carry byte-identical summaries with different HTTP statuses** (403 vs 429), as do `E0000151` and `E0000205`. Two codes, one string, two statuses — a client cannot tell them apart from the text, and the status disagreement means retry logic will diverge.

**Deprecation is a named error state**: `E0000026` "This endpoint has been deprecated." (404) and `E0000215` "This endpoint has been deprecated." (410 Gone). **Same string, two codes, two statuses** — presumably an older 404 behaviour and a corrected 410 one, both still live, both undifferentiated in text.

**The OAuth/OIDC layer uses the spec's own vocabulary, unmodified** `[observed]`: `unauthorized_client`, `access_denied`, `unsupported_response_type`, `unsupported_response_mode`, `invalid_scope`, `server_error`, `temporarily_unavailable`, `invalid_client`, `login_required`, `invalid_request`, plus one Okta addition, `user_canceled_request` — "User canceled the social sign-in request." Standard errors kept standard, with the one product-specific case appended. And the transport is documented explicitly:

> "In situations where Okta needs to pass an error to a downstream application through a `redirect_uri`, the error code and description are encoded as the query parameters `error` and `error_description`."

with a worked URL example. **Documenting how an error travels, not just what it says**, matters here because the string ends up in a customer's address bar and their logs.

`login_required` — "The client specified not to prompt, but the user isn't signed in." — is a good example of a spec error glossed in terms of what the *integrator* did.

### Copy quality of the error catalogue — a substantial negative finding

For the artefact on which this product's benchmark strength rests, the catalogue's copy quality is poor and the defects are systematic:

- **Four codes whose entire published summary is a substitution token**: `E0000113` = `{0}.` · `E0000116` = `{0}` · `E0000131` = `{0}` · `E0000167` = `{0}`. No description at all, in a document that claims to be a complete list.
- **~45 summaries contain `{0}`**, and `E0000250`–`E0000252` use `{0}` as a *verb* ("You can't {0} {1} because… To {0} this identity provider…"), which cannot localise into any language with verb morphology. Okta ships docs in Japanese and French.
- **Raw internal identifiers in user-visible strings**: `kid={0}` (`E0000096`), `idpId: {0}` (`E0000230`), `Resource Selector: {0}` (`E0000235`), and a Java date-format token in `E0000030` ("Dates must be of the form yyyy-MM-dd'T'HH:mm:ss.SSSZZ").
- **Typos**: "All errors contain the **follow** fields" (the intro) · "email **doamin**" (`E0000201`) · "Invalid linked **objection** definition" (`E0000127`) · "while assigned to **an** user" (`E0000102`) · "Group push bad request **:** {0}" (space before colon, `E0000027`).
- **Casing chaos**: `Api validation failed due to conflict` (`E0000195`) vs `API validation failed` (`E0000001`) · `Invalid Passcode/Answer` (`E0000068`) vs `PassCode is valid but exceeded time window.` (`E0000083`) · `Factors Service Error.` (`E0000067`) vs `Factor Service Error` (`E0000074`) — singular/plural and punctuation both differ for two adjacent codes.
- **Contractions and negations are unruled**: "does not" / "doesn't", "cannot" / "can't" / "Cannot", "is not" / "isn't" all appear interchangeably. `E0000174` uses a **curly apostrophe** ("You can’t disable Okta FastPass") where every other entry uses a straight one — mixed character sets in one table.
- **Terminal punctuation is inconsistent** across adjacent entries (`E0000004`, `E0000005`, `E0000006`, `E0000069` unpunctuated; their neighbours punctuated).
- **A success state in an error table**: `E0000070` `Waiting for ACK` with HTTP `202 Accepted`.
- **A validation message returned as a server fault**: `E0000261` "The value entered for linked object {0} is invalid for this user." → `500 Internal Server Error`.
- **`E0000251` and `E0000252` are byte-identical end to end** — two codes, one meaning.
- **~25 numbering gaps** with no note explaining whether the codes were retired, reserved, or never existed.

**The judgement to record**: Okta's *administrative-guardrail* errors are genuinely best-in-class and belong in any content designer's reference file. Its *error catalogue as a published artefact* has not been copy-edited as a set, and the two facts sit in the same table. A small number of strings were clearly written deliberately (`E0000207`, `E0000219`, `E0000174`); the majority were written by whoever shipped the endpoint.

## T8 Empty states

`[absent]` — no empty state was observed on any surface harvested. The marketing site, pricing page, docs pages and Secure Identity Commitment page contain no no-results, no-data, or first-run copy; the status page's JSON payload was captured rather than its rendered empty-day strings; docs search and the Support Center KB were not exercised.

The closest observed strings are two placeholders leaking from the developer-docs page's own UI — `Loading...` and `Found **254** matches` — which are search-result furniture rather than empty states.

All in-product empty states (the People page with no users, an org with no apps assigned, an empty policy list) are behind auth. `[absent]`

## T9 Notifications & system messages

**Incident updates are the richest notification content on Okta's public surfaces** `[observed]`, and they follow a consistent five-part shape. From the 13 July OP2 disruption:

> "On July 13, 2026, at 1:15 PM PT, we detected a service interruption that impacted all users in cell OP2. Users may have encountered connection errors or 5xx error messages. Our team is actively investigating this issue and is working to mitigate it. **We will provide another update within the next 30 minutes**, or sooner if additional information becomes available."

Date and time with timezone → scope (`all users in cell OP2`) → symptom, hedged (`may have encountered`) → who is working (`Our team`) → **a cadence commitment with a number**.

**`within the next 30 minutes, or sooner if additional information becomes available` is the clause to steal.** A bounded promise plus an upside. It commits Okta to the next *message*, not to a fix, and it tells an admin exactly when to check back — which is what determines whether they refresh the page every 90 seconds.

**RCA commitments are made by name and by deadline** `[observed]`:

- "We will continue to monitor the situation and provide an RCA **within 7 business days**."
- "A root cause analysis (RCA) will be posted here **within five business days**."
- "A root cause analysis (RCA) will be posted here **within ten business days**."

Three different windows across three incidents — 5, 7 and 10 business days — with no stated basis for the difference. Committing publicly to a post-mortem *and* naming the deadline is good practice and rare; **varying the deadline without explaining the variable is a defect**, because an admin reading their second incident has no idea what to expect.

**Workarounds are given where one exists** `[observed]`: "Our Engineering team became aware of delivery delays in SMS MFA affecting US customers across all cells. Okta continues to monitor the current situation with our third-party provider. **We recommend using alternative verification methods at this time.**" One sentence of actionable mitigation for a workforce that cannot receive its MFA codes.

**Third-party attribution is explicit and repeated** `[observed]`: "due to a service disruption in one of the third-party providers"; "the third-party provider has resolved the issue"; "The third-party provider has confirmed that a fix has been successfully deployed"; and the notably candid relay of an upstream vendor's advice — "The provider reports early signs of recovery and **recommends that users continue retrying failed requests, as success rates are expected to improve steadily.**" Okta passes through the provider's own guidance, attributed, rather than paraphrasing it as its own.

**The apology register is calibrated to impact, and the B2B2C shape is correct** `[observed]`:

- "We apologize for any inconvenience and will provide further updates as more information becomes available." (a maintenance overrun)
- "We apologize for any inconvenience this may have caused." (a third-party outage of the support site)
- "**We sincerely apologize for the impact this had on you and your users.**" (a customer-facing outage)

**`you and your users`** is the phrase to record. Okta's customer is an administrator, and that administrator has spent the outage apologising to their own employees or customers. The apology that names both parties acknowledges the second-order harm — the admin's own credibility — which a generic "we apologize for any inconvenience" does not. Three graded apologies, and the strongest one is reserved for the incident that reached end users.

**Outbound administrative notifications** `[documented]`: "An email that lists all users deactivated in the past 30 minutes is sent to admins." A digest, windowed at 30 minutes, for a bulk destructive action — so an admin who deactivates 400 users gets one email, and an admin who did *not* intend it gets an alert. And during the operation: "During deactivation, notifications appear to indicate the progress of all deactivation requests. A notification appears when each deactivation request completes successfully." Progress plus per-request completion, documented because the operation is asynchronous and long.

**Threat-intelligence notification as a product** `[observed]`, from the Secure Identity Commitment: "Okta now publishes threat advisories on the latest identity-based attacks we have observed at security.okta.com — these observations are **available exclusively for the security contacts of Okta customers**." Plus the stat "10,000 proactive suspicious domain notifications sent" with "83% of indicators confirmed as malicious were not detected elsewhere." A notification channel with a named audience (security contacts), a published volume, and an efficacy claim.

## T10 Disclosures, legal & compliance

**The pricing page runs a four-level footnote ladder** `[observed]`, using `*`, `**`, `†`, `‡`:

- `*` — "All suites are billed annually. **$1,500 annual contract minimum required for Okta Workforce Identity.**"
- `**` — "The Okta Identity Governance (OIG) add-on includes Access Governance, Lifecycle Management, and Workflows. Access Governance is a feature of the Identity Governance (OIG) solution and **is not available as a standalone add-on.**"
- `†` — "Unlimited active flows."
- `‡` — "As of July 2024."

**The `*` footnote is load-bearing and buried**: `$6 per user/month` is the headline, and the annual minimum of $1,500 means the real floor is a 21-seat commitment. Disclosed, correctly, but at the bottom of a long page in the smallest type. The `‡` footnote dates the Fortune-100 claim to **July 2024** — a two-year-old attribution on a 2026 page, which is honest about its own staleness and also an argument for refreshing it.

**Every headline price carries `*` and `Inquire for pricing*` carries it too** — an asterisk on a non-price, pointing at the annual-billing and minimum-contract terms.

**Tiering is disclosed with three values, not two** `[observed]`: the comparison table's cells are blank (included), `Add-on`, `—` (unavailable), or a quantity (`2 Privileged Access admins`, `0.5 Resource Unit/license`, `2 integrations`, `50 integrations`, `5 flows`, `50 flows`, `Maximum†`). **`Add-on` as a distinct third state from "not included"** tells a buyer that the capability exists and is purchasable, which is different information from "you can't have this". The `Add-on` marker appears in 18 cells and migrates rightward down the table, so the reader can see at a glance how far up the ladder a capability becomes bundled.

`Maximum†` with a footnote resolving to "Unlimited active flows" is the one place where the table hedges a word it could simply have printed.

**A mid-table alternative is offered in prose** `[observed]`: under the Essentials card, "Not ready for advanced security and compliance? Explore **Core Essentials** below for only $14 per user/month.*" — a fifth suite that exists only in the comparison table and in this one sentence, presented as a downgrade path phrased as a question. Commercially unusual (offering the cheaper option inside the pricier card) and worth recording.

**The Workforce FAQ answers the licensing questions the table cannot** `[observed]`

- `Can I buy a single Okta product without a suite?` — "Yes. Almost all of our products can be purchased individually or added to any suite." (`Almost all` rather than "all" — a hedge that is more useful than a false absolute.)
- `Can I add more licenses for only one product in my suite?` — "In most cases, you would add more suite licenses. **Suites follow a unified model where all products share the same number of subscriptions, which keeps things simple and ensures consistent coverage.** A few exceptions apply for Workflows, Okta Privileged Access, and Machine-to-Machine tokens." The constraint is stated, then *justified* (simplicity, consistent coverage), then the three named exceptions are listed. Constraint → rationale → exceptions, in three sentences.
- `What is an Okta Privileged Access Resource Unit?` — defines a coined billing unit, gives a worked example ("the 1 Resource Unit included in the Essentials Suite can be used to cover 2 Privileged Access users"), and then defines a second coined term inside the answer: "**"Secrets" are objects containing one or more key value pairs encrypted and stored securely within the Okta Privileged Access cloud service (e.g., passwords, API Keys, tokens, or any string value that needs protection).**"

**The Customer Identity FAQ discloses rate limits as a purchasable dimension** `[observed]`: "Our Okta Integrator Free Plan has a default rate limit of **100 authentications per minute**. Our paid plans start with a default rate limit of **600 authentications per minute**, which can be significantly increased with the DynamicScale add-on." Three numbers and an add-on name, in one answer, for the parameter that determines whether the product works at all on Black Friday.

**Metered-unit definition, with the double-count exclusion** `[observed]`: "A Monthly Active User is a unique user that authenticates with or is authorized by the Okta service within a given month. **A user who signs in multiple times during that month is only counted as one Monthly Active User for that month.**" The definition plus the clarification that customers actually need — the same "define the unit by its exclusions" pattern seen in Auth0's agent-runtime answer.

**Free-plan expiry stated as a behaviour, not a date** `[observed]`: "The trial does not expire; **however, orgs deactivate after 180 days of inactivity** unless you submit an app to the OIN." A non-expiring trial with an inactivity clock and a named escape — three facts in one sentence.

**Support entitlement disclosed with the hours** `[observed]`: "All Okta suites include access to introductory training and online support, **available 24 hours per day, five days per week.**" 24×5, not 24×7, said plainly and repeated in the marketing card ("available 24 hours per day, five days per week"). For an identity vendor whose outage locks out an entire workforce, publishing that weekend support is a paid upgrade is a consequential and creditable disclosure.

**Data-retention disclosure sits inside the admin procedure** `[observed]`, not only in legal: "Okta automatically initiates the permanent deletion of Customer Data in 30 days. Any data referencing the user is kept for a period defined by the Okta Data Retention Policy." Named policy, linked, from the page where the admin is performing the deletion.

**The Secure Identity Commitment is a disclosure artefact of a different kind** `[observed]` — a public, four-pillar, quarterly-reported security programme:

`Market leading identity products & services` · `Harden our corporate infrastructure` · `Champion customer best practices` · `Elevate our industry`

Three sentences from it are worth recording in full:

> "**We recognize that our security posture is your security posture**, so we continue to innovate and further strengthen our product and services to deliver market leading protection."

> "We treat all of our internal technology, people, and processes with the **same cyber threat profile as our customer-facing environment.** We are accelerating our investments to further harden our **ancillary (production-adjacent) and corporate systems.**"

> "**Misconfigured identity is just another entry point for a bad actor or negligent insider.** With 16 years experience and nearly 20k customers, we have the unique expertise to ensure our customers have the right identity configuration."

"our security posture is your security posture" is the sentence that justifies the whole programme's existence to a customer, in eight words. "ancillary (production-adjacent) and corporate systems" is a glossed technical euphemism for the class of system implicated in Okta's own past incidents — the parenthetical is doing the disclosure. And "Misconfigured identity is just another entry point for a **bad actor or negligent insider**" names the customer's own staff as a threat vector on the vendor's own commitment page, which is a notably unflattering thing to publish about your buyers and is immediately softened by "we have the unique expertise to ensure our customers have the right identity configuration."

The page closes with `We're committed to sharing results` — "Check back for quarterly updates to learn what we've done and what's next when it comes to Okta's commitment." A **reporting cadence commitment**, which is what converts a security page from a statement into an obligation. Its stats carry an asterisk resolving to "*Based on internal reporting from April 1st through July 1st, 2026" — self-reported, window disclosed.

## T11 Help-centre architecture

**Four separate help estates, and the seams are structural** `[observed]`

| System | URL | Generator | Content type |
|---|---|---|---|
| Product documentation | `help.okta.com` | DITA-OT | Admin procedures, concepts, reference; three locales |
| Developer documentation | `developer.okta.com` | VuePress | API reference, error codes, guides |
| Support Center / KB | `support.okta.com` | Salesforce | Knowledge articles, Product Hubs, community, ideas |
| Auth0 estate | `auth0.com/docs`, `support.auth0.com`, `community.auth0.com` | Mintlify + Salesforce | The entire second platform (corpus 038) |

Plus `learning.okta.com` (training), `security.okta.com` / `sec.okta.com` (threat advisories and vulnerability research, gated to security contacts), `trust.okta.com`, and `devforum.okta.com`. **Eight public content properties**, with `help.okta.com`'s own nav linking out to five of them.

**Within product documentation, the split is by engine and then by product**, with seven parallel documentation sets each carrying its own release notes (T1). The `Identity Engine` / `Classic Engine` duality doubles the estate, and the `Classic Engine publication` label on every page is the only in-page signal of which one you are reading.

**Article-title grammar in the admin docs is imperative-verb-first, with one reference exception** `[observed]` — the nineteen titles in T4. Three shapes:

| Shape | Examples |
|---|---|
| `<Verb> <object>` | `Add users manually` · `Import users` · `Activate user accounts` · `Assign applications to users` · `Manage password expiry` |
| `<Verb> and <verb> <object>` (paired operations) | `Deactivate and delete user accounts` · `Suspend and unsuspend users` |
| `<Verb> a[n] individual …` / `<Verb> multiple …` | `Unlock an individual user account` / `Unlock multiple user accounts` · `Reset an individual user password` / `Reset multiple user passwords` |
| Noun-phrase reference | `User account status` (the only one) |

**The `individual` / `multiple` pairing is the pattern to name.** It is not a stylistic choice — it reflects that bulk administrative operations have different risk, different UI, different asynchrony and different notification behaviour from singular ones. Splitting them into separate titles means an admin searching "unlock users" sees both and picks by scale, and means the bulk page can carry its own warnings without cluttering the singular one.

**Page furniture** `[observed]`: breadcrumb (three levels) → H1 → orienting paragraph → `Topics` list (on hub pages) or conceptual sections → procedures → `Related topics` link list. Every page carries a `Feedback` control ("Submit feedback") at top right and two skip links.

**Notably `[absent]`**: no date of any kind on product documentation pages — no "last updated", no "published", no "last verified". Given that the same estate documents two product generations simultaneously, the absence of freshness metadata is a real gap. The footer carries only `© Okta, Inc. All Rights Reserved.` and the page `meta-copyright: (C) Copyright 2026`.

Also `[absent]`: no in-page table of contents, no `Was this page helpful?` yes/no control (only the generic `Feedback` link), and no tags or categories on articles.

**Cross-estate routing is explicit where it matters** `[observed]`: the `Related topics` block on the deactivate/delete page links to three **developer** resources (`Okta Languages and SDKs`, `Delete users with the Okta API`, `Deactivate users with the Okta API`) — i.e. the admin-console procedure ends by pointing at the programmatic equivalent, because an admin deleting 400 users should probably be scripting it.

**Support-entitlement routing** `[observed]`: `Get Support` (Support Center Overview / Knowledge Base / Product Hubs) → `Customer Success` (Success Plans / Professional Services / Product Training / Product Certification / Partners) → `Community` (Questions Forum / Discussion Groups / Community Blogs / **Okta Ideas**). Four named community surfaces, with `Okta Ideas` as a distinct feedback channel.

`Product Hubs` is an Okta-specific artefact — per-topic landing pages in the Support Center, one of which (`okta-secure-identity-commitment`) is linked from the commitment page as a place to get "knowledge base articles, training, videos, and more". **A hub that aggregates every content type for one topic across the estate**, which is a reasonable answer to having eight properties.

## T12 FAQs

**Two separate FAQ blocks on `/pricing`, one per platform tab**, each headed `Frequently asked questions`. Answers present in server HTML.

### Workforce Identity FAQ (7 questions)

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | How much does Okta Workforce Identity cost? | Per-user per-month, billed annually; repeats the two published floors ($6, $17); routes Professional/Enterprise to sales |
| 2 | How do I choose the right Okta suite for my business? | **Declines to answer**: "The right base suite depends on your goals. We recommend connecting with our team…" |
| 3 | Can I buy a single Okta product without a suite? | "Yes. Almost all of our products can be purchased individually or added to any suite." |
| 4 | Can I add more licenses for only one product in my suite? | Constraint, rationale, three named exceptions (see T10) |
| 5 | What is an Okta Privileged Access Resource Unit? | Defines the coined billing unit with a worked example; defines `Secrets` inside the answer |
| 6 | What kind of support is included with an Okta suite? | 24×5 online support; routes to Premier Success Plans for more |
| 7 | Where can I find Okta's product datasheets and developer docs? | Routes to webinars, datasheets, help centre |

### Customer Identity FAQ (5 questions)

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | How much does Okta Customer Identity cost? | $3,000/month base, billed annually; add-ons priced on MAU; routes to sales |
| 2 | What are the rate limits for Okta Customer Identity? | 100/min free, 600/min paid, DynamicScale to increase |
| 3 | Does Okta charge monthly for Customer Identity? | "**No.** The Customer Identity Enterprise platform and all add-ons require an annual contract." |
| 4 | Is Okta Customer Identity free for developers? | Free Integrator Plan, 10 active users, non-expiring but 180-day inactivity deactivation |
| 5 | How does Okta define a Monthly Active User? | Unique authenticating user per month; multiple sign-ins count once |

**Structural notes.** Twelve questions across two sets, and **all twelve are commercial** — not one is about capability, security, compliance, data residency, migration, or what happens at contract end. For an identity vendor selling to security buyers, and one with a publicly documented incident history, the absence of any trust question on the pricing page is the notable gap. (Auth0, which Okta owns, opens its pricing FAQ with "Why should I trust Auth0 with my users?" and follows with "What happens if I stop using Auth0?")

**Q3 of the Customer Identity set is the best-shaped answer**: a one-word `No.` to a question whose asker is hoping for a yes, followed by the actual term. The question is phrased in the reader's optimistic framing ("Does Okta charge monthly…?") and the answer corrects it immediately rather than burying the annual commitment in a clause.

**Q2 of the Workforce set is a non-answer, and it is honest about being one.** "The right base suite depends on your goals. We recommend connecting with our team to better understand which suite aligns with your needs today and as you grow." Twenty-eight words that route to sales. Defensible for a five-suite portfolio with add-ons, and worth recording as the counter-example to Retool's three-level answer to the equivalent unanswerable question ("Enough for real work" → a range → the arithmetic).

**Both FAQ blocks are followed by `Choose your next step`** with three cards (`Start a free trial` / `Watch a demo` / `Talk to an expert` on Workforce; `Talk to an expert` / `Start building for free` on Customer Identity). **A three-way exit calibrated to how ready the reader is**, rather than a single CTA — and the Customer Identity version correctly drops the self-serve trial because there isn't one.

## T13 Terminology & glossary

| Term | Okta's usage | The alternative it rejected |
|---|---|---|
| `org` | The tenant; used constantly and never expanded ("in your org", "your org has at least one authentication policy rule") | "tenant", "account", "organization" spelled out |
| `cell` | The infrastructure partition a customer lives in (`Cell OK9`, `US Cell 1`, `OP2`) | "region", "shard", "instance" |
| `Admin Console` / `End-User Dashboard` | The two named UIs, always capitalised | "admin panel", "portal" |
| `People` | The Admin Console page listing users; dialogs say `Deactivate Person` / `Delete Person` | The docs and API say `user`; the console says `Person` — see below |
| `Staged` / `Provisioned` / `Active` / `Recovery` / `Password Expired` / `Locked out` / `Suspended` / `Deprovisioned` | The eight API status values | Three of which are **renamed in the console** (T6) |
| `Pending user action` | Console label for API `Provisioned` | The best rename in this corpus |
| `Universal Directory` | The user store, as a product name | "directory", "profile store" |
| `authenticator` / `factor` | Both used; `factor` in older codes (`Factor Service Error`, `E0000154 Invalid factor id`), `authenticator` in newer ones (`E0000148 Cannot modify/disable this authenticator`) | **Two words for one concept, split by vintage** |
| `phishing resistant authenticators` | Used unhyphenated in `E0000219`; the industry writes "phishing-resistant" | |
| `Okta FastPass` | The named passwordless/device-trust mechanism | |
| `Okta Verify` | The named authenticator app | |
| `Identity Engine` / `Classic Engine` | The two product generations | "v2 / v1", "new / legacy" |
| `identity security fabric` | Coined category phrase, unglossed, used once | |
| `Resource Unit` | Coined billing unit for Privileged Access, defined in the FAQ | "seat", "node" |
| `Secrets` | Defined inside a pricing FAQ answer rather than in a glossary | |
| `Monthly Active User` / `MAU` | The CIAM billing unit, defined with its exclusion | |
| `zero standing privileges` | Industry term, used in a customer story and a solution page | |
| `bad actor` / `negligent insider` | The two named adversaries on the Secure Identity Commitment | "attacker", "threat actor" |
| `ancillary (production-adjacent) and corporate systems` | A glossed euphemism for the non-production estate | |
| `Non-Human Identities` / `AI Agent Identities` | Two of the five navigation identity types | "service accounts", "machine identities" |
| `Okta Integrator Free Plan` | The free developer tier | "free tier", "sandbox" |
| `OIN` (Okta Integration Network) | Used unexpanded in an FAQ answer ("unless you submit an app to the OIN") after being expanded elsewhere | |
| `Aerial` | Multi-org management product, named with no descriptive element | |
| `Product Hubs` | Per-topic Support Center aggregation pages | |
| `Okta Ideas` | The feedback/feature-request channel | |
| `Premier Success Plans` | The paid support tier | |

**The `user` / `Person` split** is a small but real inconsistency: the API says `user`, the documentation says `user` and `user account`, the console page is called `People`, and the two destructive dialogs are `Deactivate Person` and `Delete Person`. Four surfaces, two nouns, and the switch happens at exactly the moment the admin is doing something irreversible to a human being. That may well be deliberate — `Delete Person` is harder to click than `Delete User` — but nothing documents it.

**`factor` versus `authenticator`** is the clearer defect: error codes from two eras use two words for the same object, both still live in the same catalogue (`E0000154 Invalid factor id, it is not currently active.` and `E0000148 Cannot modify/disable this authenticator…`), with no cross-reference.

**Register split by surface.** Marketing says `identity security fabric`, `future-proof`, `agentic frontier`, `Standardize on a proven industry leader`. Pricing says `Resource Unit`, `MAU`, `billed annually`, `Add-on`. Product docs say `org`, `deprovisioned`, `Universal Directory`, `background task`. The error catalogue says `Authentication failed` to developers and `The username and/or the password you entered is incorrect. Please try again.` to end users. **Four registers, and the only one written in complete, polite sentences is the one aimed at the person who is not Okta's customer.**

**Glossary architecture** `[absent]` — no glossary was found on `help.okta.com` or `developer.okta.com`. Coined terms are defined where they first appear (`Resource Unit` and `Secrets` in a pricing FAQ; `Monthly Active User` in another FAQ answer) or not at all (`identity security fabric`, `cell`, `org`). This is the weakest terminology infrastructure in this DEV set and the sharpest contrast with Auth0, whose inline `<Tooltip>` + canonical `/docs/glossary` system is the best.

## T14 Voice, tone & accessibility

**Person and tense.** Documentation is second person to the administrator, present tense, imperative in procedures ("go to Directory > People", "Click **Delete**"). Marketing is second person to the organisation ("your workforce", "your identity stack", "your next big move"). The Secure Identity Commitment is **first person plural throughout and in the present continuous** — "We relentlessly invest", "We are accelerating our investments", "we continue to innovate", "we are further strengthening our customer policies", "We're already helping secure over 20,000 customers". Eleven consecutive sentences beginning with *we* across four pillars.

That grammatical choice is doing institutional work: a company writing its way out of a credibility problem uses continuous aspect because it wants to describe an ongoing commitment rather than a completed fix. It is also why the page reads slightly airless — there is almost no second person in it.

**The end user is almost never addressed.** Like Auth0, Okta's customer is the administrator, and the end user appears in the third person throughout the documentation (`the user`, `users`, `end user`). The exception is the small set of error strings destined for display (`E0000207`, `E0000119`, `E0000259`, `E0000099`, `E0000082`), which switch to second person and polite imperative. **The register shift marks the audience change, and it is the only place Okta writes to a person who is not paying it.**

**Administrative register: flat, consequential, unapologetic.** "When you delete a user account, you can't undo the deletion." · "Users must be deactivated before they can be deleted." · "All app assignments are removed and the password is permanently deleted." No softening, no "please note", no "be careful" — the consequence is the warning. The one hedged sentence in the admin docs is about performance, not risk: "depending on the number of affected users, can take significant time to complete."

**Zero exclamation marks observed** across all nine pages.

**Where the marketing voice strains** `[observed]`: `Ready to secure your next big move?` · `Go inside the minds of the leaders in identity` · `the agentic frontier` · `Future-proof your identity stack` · `identity security fabric` · `Transform identity across your tech stack`. Six phrases in which the noun is doing no work. Against them, three that land: `Okta secures AI` (three words), `We recognize that our security posture is your security posture`, and `Empower your workforce, human and non-human.`

**A tonal risk worth recording** `[observed]`: "See the data behind the **agentic anxieties keeping CISOs up at night**". Marketing copy that names the buyer's anxiety as a selling point is a fear appeal, and it sits on the same site as a security-commitment page whose whole purpose is to rebuild calm. Two tones, one property.

### Accessibility content `[observed]`

**Strengths**

- **Two skip links on documentation pages**: `Skip to main content` and **`Skip to docs navigation`**. The second is unusual and genuinely useful — a docs site's left nav is the thing a keyboard user most wants to jump *to*, not past, and almost nobody ships a link for it. Marketing pages carry a single `Skip to content`.
- Skip-link targets are real anchors (`#ariaid-title1`, `#bs-sidebar-nav`, `#main-content`), not `javascript:void(0)` — a direct contrast with the Auth0 Support Center's non-functional skip links.
- `Accessibility` is a **top-level `Values & Impact` navigation item** at `/accessibility/`, sitting beside `Responsibility`, `Trust` and the `Secure Identity Commitment` — i.e. treated as a corporate commitment rather than a legal footnote. (The page itself was not harvested.)
- **The DITA-generated documentation is well structured for non-visual reading**: single H1, semantic heading nesting, real HTML tables with header rows for the status-mapping and consequence matrices, numbered procedures with one action per step, and breadcrumbs as a list. The two most important artefacts in this file (T6) are tables, and tables are the correct and accessible form for a comparison the reader must cross-reference.
- Documentation carries no decorative imagery at all on the pages harvested — every instruction is complete in text. A screen-reader user can perform the delete procedure without seeing anything.

**Defects**

- **`Fill out the form to access this content.` used as the alt text of customer logos** — seven instances on the pricing page, six on the homepage, and again on every add-on card. A gated-asset call-to-action string has been bound to the `alt` attribute of decorative brand images. A screen-reader user encounters "Fill out the form to access this content" thirteen-plus times per page, announcing a form that does not exist at that location. **The most serious accessibility defect observed in this harvest.**
- Several homepage and commitment-page images render with **`![](<>)`** — an image element with empty alt *and* an empty or malformed source. These appear in the customer stat cards and every Secure Identity Commitment card, i.e. the illustrations accompanying the content.
- **`Learn more` × ~23 on the pricing page** and **`Read more` × ~12 on the homepage**. A user navigating by link list gets a run of identical, contextless strings.
- **`(and then)` in every click path**: "go to Directory> (and then)People> (and then)More Actions> (and then)Deactivate". A DITA `menucascade` separator rendering as literal prose, with no space after the parenthesis. Every procedural page in Okta's product documentation reads this way, and read aloud it is actively confusing.
- Step 3 of the delete procedure contains a self-referential instruction — "Click **Add filter** to add a filter and then repeat steps a through d" — that depends on a lettered sub-list whose letters are not rendered in the extracted markup. If the list markers are visual rather than semantic, the cross-reference is unresolvable for a screen-reader user. Flagged as suspected, not confirmed.
- Mismatched locale coverage: **fourteen country sites on marketing, three locales on product documentation.** A German or Brazilian administrator gets a localised sales site and English-only procedures for deleting users. And the developer error catalogue — whose strings include `{0}` used as a verb — is English-only with no localisation affordance at all.
- Customer-evidence content errors (the Mars card linking to `/customers/box/`; the `Takeda` logo served from `logo-booking.png` beside a Booking.com story) mean the alt text and the destination disagree for at least two cards.
- No dates on documentation pages, so a reader cannot assess freshness. `[absent]`
- No published content style guide, voice-and-tone documentation, or design system was found. `[absent]`

**Negative findings, recorded honestly**

- Five labels for "start a trial" resolving to at least three URLs; three for "contact us".
- `Free trial` (nav button) vs `Free Trial` (adjacent mega-menu icon link).
- `Identity Engine` / `Classic Engine` scope lines that do not help a reader choose, plus a `Classic Engine publication` marker that names the publication rather than the reader's situation.
- Error catalogue: four codes whose entire summary is `{0}`; ~45 with placeholders; `{0}` used as a verb in three; `errorLink` described identically to `errorCode`; five typos; systematic casing, contraction and punctuation inconsistency; two byte-identical code pairs; two pairs sharing a string with different HTTP statuses; a 202 success in an error table; a validation message returned as a 500; ~25 unexplained numbering gaps.
- `E0000095 Recovery not allowed for unknown user.` confirms account non-existence in a catalogue that is otherwise careful.
- `factor` and `authenticator` both live for one concept.
- RCA commitment windows of 5, 7 and 10 business days with no stated basis.
- Pricing FAQ contains twelve commercial questions and no trust, security, compliance, residency or exit question.
- The `$1,500 annual contract minimum` — which triples the effective entry price — is disclosed only in the page's smallest footnote.
- `As of July 2024.` dating a customer-count claim on a 2026 page.
- No glossary; coined terms (`identity security fabric`, `cell`, `org`) undefined.

---

## Transferable patterns

1. **Publish the API-name → UI-name → cause mapping for every state, in one table.** Okta's `User account status` table renames three of eight states in the user's favour (`Provisioned` → `Pending user action`, `Recovery` → `Password reset`, `Deprovisioned` → `Deactivated`) and shows the mapping to the admin who has to reconcile a console screen with an API response. Diverge deliberately, then document the divergence. Costs one table; prevents a permanent class of support ticket.
2. **`Pending user action` as a status name.** When a state means "we are waiting", name *whose move it is* rather than what the system last did. Transferable to any queue, approval flow, verification step, or dispute state.
3. **Render the difference between similar destructive actions as a consequence matrix.** Ten consequences × suspend/deactivate/delete, each `Yes`/`No`. The shape of the Yes column is the warning. Lead with the row all three share, then diverge. Include the consequences nobody thinks to ask about (`User's username … can be reused.`, `User isn't visible on the People page and isn't returned in API responses.`).
4. **Split singular and bulk operations into separate documentation titles.** `Unlock an individual user account` / `Unlock multiple user accounts`. Different risk, different asynchrony, different notification behaviour — so different pages, and the admin picks by scale.
5. **Write guardrail errors as sequenced remediation, with the consequence quantified and the affected objects interpolated.** "This action can't be completed because it would result in 0 phishing resistant authenticators… To continue, either enable FIDO 2 (WebAuthn) or remove the phishing resistance constraint from the affected policies. Policy rules: {0}". Name the dependency, quantify the outcome, sequence the fix, offer both remedies, list the objects. The highest-value error copy any administrative product can write.
6. **Two codes, two registers, one event.** `E0000004 Authentication failed` for the integrator; `E0000207 The username and/or the password you entered is incorrect. Please try again.` for the person. The ambiguity (`and/or`) is the security control; the politeness is the UX. Condition: Okta ships both halves but never explains the split — **do the thing *and* document the reasoning**, as Auth0 does.
7. **Publish per-channel cooldowns as exact numbers in the message.** `30 seconds` for SMS, `5 seconds` for email, `30 seconds` for voice. A user who just pressed resend needs the number, not "please wait a moment".
8. **Classify every incident by impacted audience, as structured data.** `Admin` / `End user` / `API Products`. The admin's first question during an outage is "are my users locked out, or is it just me?" — answer it in a field, not in prose.
9. **Commit to the next update with a number, plus an upside.** "We will provide another update within the next 30 minutes, or sooner if additional information becomes available." Commit to the message, not the fix.
10. **Apologise to your customer *and* to your customer's users.** "We sincerely apologize for the impact this had on you and your users." In B2B2C, the admin has spent the outage apologising downstream; naming that acknowledges the second-order harm. Grade the apology to the impact and reserve the strongest for incidents that reached end users.
11. **Open each pricing tier with a qualifying question.** "Starting your Identity journey? Put a strong foundation in place." / "Ready to scale? Upgrade to advanced automation and security." A four-tier table is really a four-way self-assessment; make that explicit.
12. **Use `Add-on` as a third state in a comparison table.** Not-included and purchasable-separately are different facts for a buyer.
13. **State a constraint, justify it, then name the exceptions.** "Suites follow a unified model where all products share the same number of subscriptions, which keeps things simple and ensures consistent coverage. A few exceptions apply for Workflows, Okta Privileged Access, and Machine-to-Machine tokens."
14. **Ship a second skip link to the docs navigation.** `Skip to docs navigation` alongside `Skip to main content`. A documentation site's left nav is what a keyboard user wants to reach, not bypass.
15. **Introduce a destructive capability by the reason the admin's manager wants it.** "Deleting personal user accounts and user data can help you satisfy data protection and disposal laws in your region." Compliance framing before procedure.
16. **Name an `errorId` whose documented purpose is to be handed to support.** "A unique identifier for this error. This can be used by Okta Support to help with troubleshooting." Naming the escalation function in the field description is what gets it surfaced in UIs.

## Caveats & gaps

- **The Support Center knowledge base was not harvested.** `support.okta.com` is a Salesforce Lightning app; its KB article titles, `Product Hubs`, community content and search were not reached. Okta's help architecture in T11 is reconstructed from the marketing mega-menu's inventory of it plus the docs-site cross-links, not from the KB itself.
- **Only the Classic Engine documentation tree was opened.** All three product-documentation pages harvested carry the `Classic Engine publication` marker. The **Identity Engine** documentation — which is the current product — is unharvested, and its admin-procedure titles, status vocabulary, and consequence tables may differ. Any pattern in T4/T6 should be re-verified against Identity Engine before use as current precedent.
- **The developer error catalogue's `Show Example Error Response` disclosures were not captured** — all 254 are collapsed in the server HTML, so **no example JSON error body was observed** and the actual on-the-wire shape of an Okta error is not recorded here. The five-field model in T5 is from the page's own table, not from an observed payload.
- **The status page was captured as its underlying JSON payload**, not as rendered HTML. Component names, the state legend, the roll-up headline, and per-day empty strings are therefore **unharvested**; T6 and T9 use the structured incident fields (`Impacted_Audience__c`, `Impacted_Cells__c`, `Status__c`, `Incident_Title__c`, `Log__c`) and the incident prose inside them. The rendered page may present this material very differently.
- **Not harvested**: `trust.okta.com`, `security.okta.com` / `sec.okta.com`, `/accessibility/`, `/agreements/`, `/privacy-policy/`, `learning.okta.com`, `devforum.okta.com`, all `/products/*` pages, the `Secure Identity Commitment` whitepaper, and the Aerial / Workflows / ISPM / MCP Server documentation sets.
- **All in-product copy is `[documented]`.** Admin Console labels, dialogs, toasts, the People page, validation messages and every empty state are quoted from documentation prose. Okta's docs render UI strings in bold inconsistently (and the `(and then)` artefact corrupts click paths), making them a less reliable second-hand record than DigitalOcean's or Auth0's.
- **T8 is genuinely empty.** No empty-state string was observed anywhere. This is a harvest gap, not a claim that Okta has none.
- Okta owns Auth0 (corpus 038). Several observations here are framed as contrasts between the two estates; those contrasts rest on the Auth0 harvest in that file and should be read together. **The two products' error catalogues were captured from different surfaces on the same day and are directly comparable.**
- The error-catalogue extraction was performed by a delegated read of a saved fetch; the 254 rows, the framing table, the OAuth table and the defect list are reported as character-exact by that pass, and the entries quoted in T7 were selected from it. One entry (`E0000250`) is noted in the source extraction as truncated and is not quoted here.
- Accessibility findings on `Fill out the form to access this content.` as alt text, on `![](<>)`, and on the `(and then)` separator are **confirmed from the extracted markup**. Findings about ARIA handling, contrast, focus order and the accessible-name computation are **not assessed**.
- Localisation coverage was established from language-switcher inventories, not by loading translated pages.

## Sources

1. https://www.okta.com/
2. https://www.okta.com/pricing
3. https://developer.okta.com/docs/reference/error-codes/
4. https://status.okta.com/
5. https://help.okta.com/en-us/content/index.htm
6. https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-people.htm
7. https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-deactivate-user-account.htm
8. https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-end-user-states.htm
9. https://www.okta.com/secure-identity-commitment/
