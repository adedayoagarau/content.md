# 185. Salesforce

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Enterprise CRM platform (multi-cloud PaaS + SaaS; sales, service, marketing, commerce, data, AI agents) |
| Primary URL | https://www.salesforce.com/ |
| Corpus rank | 185 |
| Benchmark strength (source list) | Complex administration terminology |
| Locale / market observed | en-US (help centre offers 17 locales; marketing offers 6) |
| Platform observed | Web (desktop), DITA-generated help documentation, Trailhead learning platform, accessibility microsite |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR and global privacy via `Your Privacy Choices` and a privacy-request form; UK Disability Confident Leader (Level 3); trust/compliance certifications hosted at trust.salesforce.com; no financial regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 (12 retrieved, 2 blocked) |
| Harvest completeness | Partial — `status.salesforce.com` and `help.salesforce.com/s/` (help home) are client-rendered and returned no content. Individual help articles at `/s/articleView` **do** render server-side and were harvested successfully. In-product strings are documented, not observed |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing homepage | https://www.salesforce.com/ | Hero, industry grid, Agentblazer levels, FAQ answers |
| Pricing — all products | https://www.salesforce.com/pricing/ | 19 product lines by role, 16 by industry, 9 FAQs |
| Pricing — CRM | https://www.salesforce.com/crm/pricing/ | Starter/Pro Suite, Success Plans, 8 FAQs |
| Pricing — Sales Cloud | https://www.salesforce.com/sales/pricing/ | Six tiers with prices; **edition-name collision evidence** |
| Pricing — Service Cloud | https://www.salesforce.com/service/pricing/ | Oversized body; header and framing captured only |
| Help — Default Standard Picklist Field Values | https://help.salesforce.com/s/articleView?id=000004221&type=1 | **T6 primary source**: every default state value across 9 objects |
| Help — Permission Sets | https://help.salesforce.com/s/articleView?id=platform.perm_sets_overview.htm&type=5 | Definition, profile relationship, full access-control TOC |
| Help — Sharing Rules | https://help.salesforce.com/s/articleView?id=platform.security_about_sharing_rules.htm&type=5 | Definition, limits, rule types |
| Help home | https://help.salesforce.com/s/ | **Blocked** — client-rendered, empty body |
| Trailhead home | https://trailhead.salesforce.com/ | Learning-object taxonomy, Agentblazer framing |
| Trailhead — Understand the Salesforce Architecture | https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_understanding_arch | Trust, multitenancy, metadata, API |
| Trailhead — Optimize Customer Data with Standard and Custom Objects | https://trailhead.salesforce.com/content/learn/modules/data_modeling/objects_intro | **T13 primary source**: object/field/record, field types, naming guidance |
| Office of Accessibility | https://www.salesforce.com/company/accessibility/ | Brand-level accessibility page |
| Status page | https://status.salesforce.com/ | **Blocked** — "You need to enable JavaScript to run this app." |

---

## T1 Navigation & IA labels

**Help documentation IA is the artefact here, not the marketing nav.** The marketing site's global nav was not fully served in the harvested markup; what was retrieved is the help TOC, the Trailhead nav, and the pricing taxonomy.

**Pricing page — organised on two orthogonal axes** `[observed]`

`Explore products by role.` (19 entries) and `Explore products by industry.` (16 entries).

By role: `Agentforce` · `Small Business` · `Sales Cloud` · `Service Cloud` · `Marketing Cloud` · `Commerce Cloud` · `AI App Dev` · `Data Security & Privacy` · `CRM` · `Einstein AI` · `Data 360` · `Informatica` · `Slack` · `Analytics` · `MuleSoft` · `Net Zero` · `Customer Success` · `Heroku`

Each carries a one-line scope. The one-liners are verb-first and outcome-shaped, which is the best writing on the page:
- `Sales Cloud` — "Connect teams, close more deals, and streamline your entire sales process."
- `Service Cloud` — "Manage customer support cases faster across every channel."
- `Data 360` — "Unlock trapped data with the only data platform native to the world's #1 agentic CRM."
- `Customer Success` — "Choose the right level of support and expert guidance for your business."

Note that "by role" is a misnomer: the axis is actually *by product*, and only three entries (`Small Business`, `AI App Dev`, `Customer Success`) describe a role or a job. The label promises a user-centred cut and delivers a catalogue.

The industry axis is genuinely useful, with terse two-to-eight-word scopes: `Automotive` — "Drive unified customer, vehicle, and retail experiences." · `Public Sector` — "Modernize the constituent experience." · `Nonprofit` — "Build relationships that drive change." · `Professional Services` — "Increase client trust."

**Help documentation TOC — the deep artefact** `[observed]`

The DITA-generated TOC for `Manage Users and Data Access` runs to hundreds of nodes. Top-level structure:

`Manage Users and Data Access` → `Manage Users` → (`User Management Administration`, `View and Manage Users`, `Manage External Users`) → … → `Sharing and Record Access Features` → (`Organization-Wide Sharing Defaults`, `Controlling Access Using the Role Hierarchy`, `Public and Personal Groups`, `Sharing Rules`, `Defer Sharing Calculations`, `Recalculate Sharing Rules Manually`)

**Three distinct title genres, consistently applied:**

| Genre | Purpose | Examples |
|---|---|---|
| Imperative procedure | Do the thing | `Create a User Role` · `Assign Users to Roles` · `Add a Single User` · `Freeze or Unfreeze User Accounts` · `Restrict User Email Domains` · `Defer Sharing Rule Calculations` · `Recalculate Sharing Rules Manually` |
| Noun concept | Understand the thing | `Sharing Rules` · `Permission Sets` · `Organization-Wide Sharing Defaults` · `Role Fields` · `User Fields` · `Group Member Types` |
| **`Considerations for X` / `Guidelines for X`** | Know what will bite you | `Considerations for Editing Users` · `Considerations for Deactivating Users` · `Guidelines for Adding Users` · `Guidelines for Success with Roles` · `Guidelines for Creating Permission Sets and Permission Set Groups` · `Sharing Considerations` · `Sharing Rule Considerations` · `Permission Set Group Considerations` · `Public Group Considerations` · `Considerations for Making Sharing Updates` · `External Account Hierarchies Considerations` · `Considerations for Creating Experience Cloud Site Users` |

**The `Considerations for X` genre is the most transferable IA decision in this file.** It is a *caveats-only article type*: a page that exists purely to hold the edge cases, exceptions, and irreversibilities for one action, separated from the procedure that performs it. Twelve of them appear in a single TOC branch. The value is that the happy-path procedure stays short and scannable while nothing gets lost, and the reader who needs the caveats knows exactly where they live. The parallel `Guidelines for X` and `Best Practices for X` genres (`Best Practices for Optimizing Sharing Performance`, `External User Access Best Practices`, `Membership Processing Best Practices`) split advisory content out again.

Four article types for one action — **do it / understand it / watch out for it / do it well** — is the most explicit content-type taxonomy in this batch, and it is legible from the titles alone.

**Trailhead nav — learning objects as a named taxonomy** `[observed]`

`Trails` — "Follow guided learning paths" · `Trailhead Journeys` — "Curated trails that build product expertise" · `Superbadges` — "Get hands-on applying your skills to solve real-world challenges" · `Trailmixes` — "Create and follow custom learning playlists"

Plus `Become an Agentblazer`, `Trailblazer Quests`, `Trailhead Mobile App`, `Instructor-led Training`, `Academic Programs`, and community entries (`Groups`, `Topics`, `Group Meetings`, `360 Blog`, `IdeaExchange`, `Be A Trailblazer`, `Trailhead MCP Support`).

Five coined nouns for five learning-content types (`Trail`, `Journey`, `Superbadge`, `Trailmix`, `Quest`), each with a one-line definition in the nav itself. The definitions are doing necessary work — none of these words is self-explanatory — and putting them in the menu rather than on a glossary page is the right call.

**Help footer groupings** `[observed]`: `SALESFORCE` (`Privacy Statement`, `Security Statement`, `Terms of Use`, `Participation Guidelines`, `Cookie Preference Center`, `Your Privacy Choices`) · `COMMUNITY` (`AgentExchange`, `Salesforce Admins`, `Salesforce Developers`, `Trailhead`, `Training`, `Trust`).

`Trust` as a single-word top-level footer destination, and `Salesforce Admins` as a distinct community property from `Salesforce Developers`, both reflect real constituencies Salesforce has named and built for.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `Get started with the #1 Agentic CRM`
> "Where people, agents, apps, and data all come together on one integrated, trusted platform, working inside the systems that run your business."

The subhead is a single 27-word sentence with a four-item list, an adjective pair (`integrated, trusted`), and a trailing qualifier. It is the densest hero subhead in this batch and the least scannable.

`Agentic` is doing enormous load-bearing work across the whole site: `#1 Agentic CRM` · `the platform for the Agentic Enterprise` · `agentic AI` · `agentic CRM solutions` · `Headless 360 platform`. The word appears in the hero, the platform section, three FAQ answers, and the CRM pricing page. Salesforce has bet its 2026 positioning on a term it also has to define — which is why the homepage FAQ includes "Agentic AI refers to advanced artificial intelligence systems that can act autonomously…". **A hero adjective that requires an FAQ entry is a warning sign**, and Salesforce has shipped both.

**Section headers** `[observed]`

`Built-in AI for every part of your business` · `Salesforce is the platform for the Agentic Enterprise` · `See why analysts agree Salesforce should be your Agentic AI partner` · `We believe that business is the greatest platform for change` · `Find the insights, experts, and tools to fuel your AI success`

`4M+ conversations handled by Agentforce and counting` is used as a header, with the supporting line: "Everyone talks the AI talk. We're walking the walk. With 66% autonomous case resolution, 15% more marketing pipeline, and 1.8x higher lead conversion, Agentforce delivers real conversational Al across service, sales, and marketing workflows. See how we did it – and how you can, too."

Two observations. `Everyone talks the AI talk. We're walking the walk.` is a cliché pairing that undercuts the three specific numbers that follow — the numbers were the argument and the idiom weakens them. And the string contains a typo: `Al` (capital A, lowercase L) for `AI`, in the marquee AI claim on the homepage. Recorded as a defect.

**Trailhead uses a completely different headline register** `[observed]`

`The fun way to learn` (page title) · `Build Salesforce and AI Skills` · `Turn learning into real-world impact` · `Real-world practice, 100% free` · `Guided pathways for every goal` · `Credentials that prove your expertise` · `Take your skills further` · `Accelerate your career`

And inside a module, the section headers become jokes: `Sharing Is Caring in the Multitenant Cloud` · `The Magic of Metadata` · `All About That API` (a song pun) · `The Data 360 Difference` · `Why Trust the Cloud?`

That is a deliberate, sustained register split. See T14.

**Pricing tier descriptors — one sentence each, differentiated by exactly one clause** `[observed]`

- `Starter Suite` — "Lean businesses that need a turnkey CRM to get started quickly."
- `Pro Suite` — "Growing businesses ready for more flexibility and functionality."
- `Core` — "The CRM for sales with built-in AI, Slack, Tableau, and Agentforce skills to keep every deal moving."
- `Advanced` — "The CRM for sales with enhanced security and agents that help you keep deals moving."
- `Max` — "The most complete Sales platform uniting AI, CRM, and data to help every seller hit quota."

Starter and Pro describe **the buyer**; Core, Advanced and Max describe **the product**. The axis switches mid-table. Core and Advanced also share a near-identical closing clause (`to keep every deal moving` / `help you keep deals moving`) — the two adjacent $195 and $395 tiers are differentiated in copy by the phrase "enhanced security and agents" alone, which is not enough to justify a $200/user/month delta on the page.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for free` | Sales/CRM pricing, Starter, Pro, Core, Advanced | |
| `Start for free` | Pricing overview hero | Second variant |
| `Start today` | Pricing overview, "Get free CRM" block | Third variant |
| `Start your free 30-day trial` | Trailhead unit sidebar promo | Fourth variant, with duration |
| `Calculate pricing` | Pricing overview hero | Paired with `Start for free` — an unusual primary/secondary pairing |
| `Flex Credit Calculator` | Pricing overview | |
| `Digital Wallet` | Pricing overview | A product name used as a CTA label |
| `Contact us` | Success Plans (×3), industry tiles | |
| `Contact Sales` | Multiple pricing tiles | |
| `Contact your account executive` | Signature Success Plan, in the price slot | **A CTA occupying the price field** — the price *is* "talk to us" |
| `Request a call` | Pricing overview, next steps | |
| `Talk to an expert.` | Next-steps heading | Full stop inside a heading-as-CTA |
| `See all Agentforce pricing` / `See all Sales Cloud pricing` / (×17) | Pricing overview | Fully specific, consistently constructed |
| `Compare top features` | CRM pricing | Links to a PDF, unlabelled as such |
| `Explore products by role.` / `Explore products by industry.` | Pricing section headings | |
| `Learn more` | Multiple | Bare; appears on Einstein AI, Disability Confident, accessibility cards |
| `Explore programs` / `Browse programs` | Accessibility page | **Two labels, one destination** (`/company/accessibility/programs/`) |
| `Read our stories` / `Read more` | Accessibility page | |
| `Accommodations for interviews` | Accessibility page | CTA text = destination page purpose |
| `Connect on LinkedIn` | Accessibility page | Names the third party |
| `Sign Up` / `Login` | Trailhead | Note `Login` as one word on a button — a noun used as a verb |
| `Start learning Agentblazer Champion` | Trailhead homepage, level cards | |
| `Earn now` / `Explore events` / `Start your journey` / `Get certified` | Trailhead | Verb-first, object-specific |
| `Sign up for newsletter` | Pricing next-steps | |
| `Go Home` | Help centre 404 | |
| `Search all of Salesforce Help` | Help TOC search empty state | Escape hatch from a scoped search |
| `Go to my account` | Help nav | |
| `Refresh` | Help centre CSS-error banner | Recovery affordance for a shipped error state |
| `Skip to content` / `Skip to main content` | Top of DOM | **Two labels across properties** — `Skip to content` on salesforce.com, `Skip to main content` on Trailhead |

**Observation.** Salesforce ships **four labels for "start a trial"** (`Try for free`, `Start for free`, `Start today`, `Start your free 30-day trial`) and two for "skip to content." The `See all <Product> pricing` family, by contrast, is executed identically 17 times. Discipline exists where the copy is templated and evaporates where it is hand-written per page.

`Contact your account executive` rendered **in the price cell** of the Signature Success Plan is the most interesting CTA in the set: it makes the absence of a price into an answer rather than a blank.

## T4 Onboarding & getting-started

**Onboarding is displaced into Trailhead**, which is Salesforce's answer to the fact that its product cannot be learned by using it.

**Agentblazer — a three-level competency ladder** `[observed]`

| Level | Name | Definition (verbatim) |
|---|---|---|
| Level 1 | `Champion` | "Confidently explain Agentforce concepts and business impact." |
| Level 2 | `Innovator` | "Implement Agentforce solutions to drive measurable business outcomes." |
| Level 3 | `Legend` | "Understand advanced concepts and design complex strategies." |

Each definition is a **verb-first capability statement**, and the verbs escalate: *explain* → *implement* → *design*. That is Bloom's taxonomy applied to product marketing, and it is well done — the learner can self-locate by asking which verb they can currently perform.

The naming is weaker than the definitions: `Champion` → `Innovator` → `Legend` is not an obviously ascending sequence (most readers would rank "Champion" above "Innovator"), and the level numbers are doing the ordering work the names should do.

**Trailhead unit structure** `[observed]` — every unit opens identically:

`Learning Objectives` — "After completing this unit, you'll be able to:" followed by three verb-first outcomes, e.g.:
- "Define key terms related to the Salesforce architecture."
- "Find information related to trust."
- "Explain at least one use case for Salesforce APIs."

Then: `Time Estimate` — "About **10** mins" · a `Topics` in-page TOC · a `Challenge +100 points` or `+500 points` entry · `Resources` · `Looking for Help?`

`Explain at least one use case` is the notable objective — it sets a **minimum countable bar** rather than a vague "understand". Every objective is independently checkable.

**Teaching by named fictional org** `[observed]`. The canonical example is `DreamHouse Realty` (also rendered `Dreamhouse`), with named personas: `D'Angelo` the Salesforce admin, `Michelle` the broker. Configuration tasks are framed as D'Angelo's problems ("D'Angelo wants to build a custom Property object that stores information about the homes his company is selling"), and the reader is invited to "work with D'Angelo to see what he's building."

Using a persistent fictional org across modules means the learner accumulates context rather than re-reading a new scenario each time. The cost is inconsistent spelling of the org's own name (`DreamHouse` and `Dreamhouse` in the same unit).

**Procedural step grammar** `[observed]` — numbered, imperative, UI targets in bold, literal input values in code formatting:

> 4. Click the **Object Manager** tab.
> 5. Click **Create** | **Custom Object** in the top-right corner.
> 6. For Label, enter `Property`. Notice that the Object Name and Record Name fields auto-fill.

The pipe (`|`) as a menu-path separator and the `Notice that…` construction for teaching side-effects are both consistent Salesforce conventions. `Notice that…` is better than a screenshot: it tells the learner what to look at and why, in the step where it happens.

**Sandbox provisioning as a documented step** `[observed]`: "Scroll to the bottom of this page and create a trailhead playground. Don't skip this step! You need to use a fresh and clean Trailhead Playground for this module." — including a parenthetical on latency ("it takes a minute!") and a note for readers arriving from a different trail. The instruction anticipates the two ways the reader will get it wrong.

**Content-design guidance taught to admins** `[observed]` — a `Customize Responsibly.` block at the end of the objects unit, three bolded imperatives each with a rationale:

- **`Be thoughtful about names.`** — "if D'Angelo created another custom object to track condominiums, he might be tempted to name it Property2 instead of Condominium. That's a recipe for confusion in your org. Give your objects and fields descriptive, unique names to improve clarity."
- **`Help out your users.`** — "Include descriptions for your custom objects and fields. For specialized or complicated customizations, use help text to give more details."
- **`Require fields when necessary.`** — "Make important fields required to avoid incomplete data."

This is a product teaching **content design and information architecture to its administrators**, inside a technical configuration module, with a worked bad example (`Property2`). Given that every string a Salesforce end user sees is named by an admin, this is the highest-leverage content in Salesforce's entire documentation estate. It occupies one block at the foot of one unit.

## T5 Form & field labels

`[documented]` from Trailhead procedures and help articles; not observed live.

**Object and field creation** — `Object Manager` (tab) · `Create` | `Custom Object` · `Label` · `Plural Label` · `Object Name` · `Record Name` · `Launch New Custom Tab Wizard after saving this custom object` (checkbox) · `Tab Style` · `Fields & Relationships` · `Field Label` · `Description` · `Required` (checkbox) · `Field Name` · `New` · `Save`

`Label` / `Object Name` / `Record Name` as three separate name fields on one creation form, two of which auto-fill from the first, is the canonical Salesforce naming-complexity moment. The Trailhead copy handles it with one clause — "Notice that the Object Name and Record Name fields auto-fill" — rather than explaining the distinction, which defers the confusion rather than resolving it.

**Setup navigation** — `Setup` · the gear icon · `Quick Find` box · `App Launcher` · `More` (overflow menu) · `Sharing Settings` (Setup page) · `Permission Sets` · `View Summary`

The documented pattern for reaching any setting is: "from Setup, enter `Permission Sets` in the `Quick Find` box, then select **Permission Sets**." Salesforce's documentation routes almost everything through **search-within-Setup rather than a navigation path** — an admission that the Setup IA is too large to navigate, converted into a consistent and actually-usable instruction pattern.

**Field types, as taught** `[observed]` — four categories with definitions and examples:

| Field Type | Definition (summarised) | Example given |
|---|---|---|
| `Identity` | 18-character case-insensitive auto-generated value, findable in the record URL | `0015000000Gv7qJAAN` |
| `System` | Read-only, system-provided | `CreatedDate`, `LastModifiedById`, `LastModifiedDate` |
| `Name` | Text or auto-numbered; distinguishes records | A contact: `Julie Bean`. A support case: `CA-1024` |
| `Custom` | Fields you create | A birthday field on Contact |

Data types named in the teaching copy: `Checkbox` — "for fields that are a simple 'yes' or 'no'" · `Date or DateTime` · `Formula` — "holds a value that's automatically calculated based on a formula that you write".

The `__c` suffix convention is taught explicitly to end users: "In the Field Name column, notice that it says Price__c. The '__c' part is an easy way to tell that a particular field is a custom field." Exposing an internal naming convention to a beginner audience, and framing it as a *useful signal* rather than an implementation detail, is a good call.

**Search and filter** `[observed]` on the help TOC: `Search` · `Filter by (0)` · `Add` · `Select Filters` · four facets — `Product Area`, `Feature Impact`, `Edition`, `Experience` · `Clear All` · `Done`

`Edition` and `Experience` as documentation filters is a direct consequence of Salesforce's edition and Classic/Lightning split: the reader must filter the docs to their own entitlement before the docs are correct for them.

## T6 Status & state language

**This is a priority section for this product.** Salesforce's default picklist values are the reference set that a very large share of enterprise CRM vocabulary descends from.

### Opportunity Stage — the canonical sales funnel `[documented]`

Each value carries a **triple**: name, default probability, and forecast category.

| Stage | Probability | Forecast category |
|---|---|---|
| `Prospecting` | 10% | Open |
| `Qualification` | 10% | Open |
| `Needs Analysis` | 20% | Open |
| `Value Proposition` | 50% | Open |
| `ID Decision Makers` | 60% | Open |
| `Perception Analysis` | 70% | Open |
| `Proposal/Price Quote` | 75% | Open |
| `Negotiation/Review` | 90% | Open |
| `Closed Won` | 100% | Closed Won |
| `Closed Lost` | 0% | Closed Lost |

Observations, several of them critical:

- **`Prospecting` and `Qualification` share 10%.** Two distinct stages that are indistinguishable on the forecast axis. A rep moving a deal from Prospecting to Qualification records progress that the weighted pipeline does not see. This is a genuine modelling defect in the shipped default and it is the first two values in the list.
- **The stages are named for *seller activities*, not buyer events.** `Needs Analysis`, `Value Proposition`, `Perception Analysis` describe what the salesperson is doing. Compare HubSpot's defaults (`Appointment scheduled`, `Contract sent`, `Decision maker bought-in`), which are past-participle events that have verifiably occurred. Salesforce's are unfalsifiable; HubSpot's are auditable. That is the single sharpest content contrast between the two products in this batch.
- **`ID Decision Makers`** is the only value using an abbreviation, and `ID` as a verb ("identify") is ambiguous with `ID` as a noun (identifier) — which is a live collision in a system where `ID` also means the 18-character record identifier taught three paragraphs earlier in Trailhead.
- **`Perception Analysis` at 70%** is opaque even to experienced sellers. It has no counterpart in any other CRM's defaults.
- **`Proposal/Price Quote` and `Negotiation/Review`** are the only two using a slash to fuse two concepts — the picklist equivalent of an unresolved naming argument.
- **The terminal states are two-word phrases with the verb second** (`Closed Won`, `Closed Lost`) rather than adjectives. This makes them sort together alphabetically and makes "Closed" a reportable prefix. Deliberate and good.

### Lead Status `[documented]`

`Open` · `Contacted` · `Qualified` · `Unqualified`

Four values, and the grammar is not parallel: one adjective of availability (`Open`), one past participle of action (`Contacted`), one past participle of judgement (`Qualified`), one negation (`Unqualified`). There is no `New` and no `Working` in the shipped default — a gap that virtually every Salesforce org fills with custom values, which is why lead-status customisation is one of the first things any admin does.

### Case Status `[documented]`

`New` · `On Hold` · `Escalated`

**The default Case Status picklist contains no terminal state.** There is no `Closed`, no `Resolved`, no `Working`. `Escalated` is a state that describes routing, not progress. For the object that exists specifically to be closed, the shipped default offers three values, none of which is closure. Recorded as the most surprising single finding in this file. (Salesforce models case closure separately via the `IsClosed` flag and status-category configuration, but the *user-visible default picklist* as documented is the three values above.)

### Case Reason — full sentences in a picklist `[documented]`

`User didn't attend training` · `Instructions not clear` · `Complex functionality` · `Existing problem` · `New problem`

Five values, three grammatical shapes: one full sentence with a contraction, one elliptical clause, three noun phrases. And the register is striking — `User didn't attend training` puts the blame on the customer, in the first picklist value, using a contraction. It is the only default value in the entire Salesforce set that assigns fault.

### Task Status `[documented]`

`Not Started` · `In Progress` · `Completed` · `Waiting on someone else` · `Deferred`

`Waiting on someone else` is the outlier: four words, sentence case with lowercase "someone else", where the other four are title-case one- or two-word phrases. It is also the most *useful* value in the list — it distinguishes "blocked" from "not started" — and it is the only one written the way a person would say it. Compare HubSpot's `Waiting on contact` / `Waiting on us`, which splits the same idea by party.

### Other default state vocabularies `[documented]`

| Object / field | Values |
|---|---|
| `Solution` Status | `Draft` · `Reviewed` · `Duplicate` |
| `Case` Priority | `High` · `Medium` · `Low` |
| `Task` Priority | `High` · `Low` · `Normal` |
| `Case` Origin | `Phone` · `Email` · `Web` · `Fax` |
| `Case` Type | `Problem` · `Question` · `Feature Request` · `Duplicate` |
| `Lead`/`Account` Rating | `Hot` · `Warm` · `Cold` |
| `Account` Type | `Analyst` · `Press` · `Competitor` · `Prospect` · `Customer` · `Reseller` · `Integrator` · `Investor` · `Partner` · `Other` · `Consulting` |
| `Account` Ownership | `Public` · `Private` · `Subsidiary` · `Other` |
| `Opportunity` Type | `Existing Business` · `New Business` |
| `Opportunity` Contact Role | `Business User` · `Decision Maker` · `Economic Buyer` · `Economic Decision Maker` · `Evaluator` · `Executive Sponsor` · `Influencer` · `Technical Buyer` · `Other` |

**Task Priority is `High · Low · Normal`; Case Priority is `High · Medium · Low`.** Two priority scales on two objects in the same product, with different middle values (`Normal` vs `Medium`) and different orderings (Task lists Low before Normal). A user who learns one learns the wrong thing about the other.

`Account Type` has eleven values with `Other` sitting in position ten and `Consulting` appended after it — a value added after the list was finalised and never re-sorted. `Other` should be last; it is not.

`Opportunity Contact Role` contains both `Decision Maker` and `Economic Decision Maker` and `Economic Buyer` — three overlapping roles a user must choose between with no guidance in the picklist itself.

### Lead Source — identical across three objects `[documented]`

`Advertisement` · `Employee Referral` · `External Referral` · `Partner` · `Public Relations` · `Seminar Internal` · `Seminar Partner` · `Trade Show` · `Web` · `Word of mouth` · `Other`

Applied identically to Lead, Contact, and Opportunity — genuinely good consistency, since these three records are related by conversion and a divergent source list would break attribution.

Two micro-defects inside it. `Seminar Internal` and `Seminar Partner` use **noun-adjective order** (unnatural English; "Internal Seminar" is the phrase a person would write) — almost certainly an artefact of wanting the two values to sort adjacently. And `Word of mouth` is the **only sentence-case value** in an otherwise Title Case list.

### Salutation — the Lead/Contact divergence `[documented]`

- Lead Salutation: `Mr.` · `Ms.` · `Mrs.` · `Dr.` · `Prof.`
- Contact Salutation: `Mr.` · `Ms.` · `Mrs.` · `Dr.` · `Prof.` · `Colonel` · `Attn:`

**Leads convert into Contacts, and the two objects ship different salutation picklists for the same conceptual field.** Contact adds `Colonel` (a military rank, not a salutation — and the only one, so no `Captain`, `Major`, `Sergeant`) and `Attn:` (a mailing-label convention, with a trailing colon, in a field meant to precede a person's name). `Attn:` is a data-model leak: someone needed to print `Attn: Accounts Payable` on an envelope and put it in the salutation picklist. Both values persist as shipped defaults.

### Calendar and Task Subject `[documented]`

`Call` · `Email` · `Meeting` · `Send Letter/Quote` · `Other` — identical for both. `Send Letter/Quote` is the only imperative verb phrase among four nouns.

### Status page `[blocked]`

`status.salesforce.com` returned only "You need to enable JavaScript to run this app." No component names, severity ladder, or incident copy could be captured. Trailhead describes the property's purpose: "You can use it to view performance data and get more information about how we secure your data. It also shows you any planned maintenance we'll be performing that might impact your access to Salesforce." Salesforce also routes trust and compliance content to `trust.salesforce.com`.

## T7 Error, failure & recovery

**A live error state on the help centre itself** `[observed]` — every `help.salesforce.com` page harvested served this markup:

> `Sorry to interrupt`
> `CSS Error`
> `Refresh`

`Sorry to interrupt` as an error-dialog title is unusually gracious and unusually vague — it apologises for the interruption without naming what happened, and then `CSS Error` supplies a developer-facing string as the entire explanation. A user gets an apology, a stylesheet diagnostic, and a Refresh button. The pattern (apologetic title + raw technical cause + single recovery action) is worth recording precisely because the human-warm half and the machine-raw half are doing opposite jobs in a three-line dialog.

**404 page** `[observed]`:

> `We looked high and low but couldn't find that page.`
> `Go Home`

Conversational, first-person plural, no error code, one recovery action. Good, though `Go Home` is an odd label on a help centre where "home" is ambiguous between the help home and the account home.

**Constraint-and-workaround documentation** `[documented]` — the dominant failure pattern, as with HubSpot. Limits are stated as numbers in the procedure rather than surfaced as errors:

- "You can define up to 300 total sharing rules for each object, including up to 50 criteria-based or guest user sharing rules, if available for the object."
- "properties with read-only values (i.e. that aren't set by users, such as score or calculation properties) cannot be used as stage properties" *(HubSpot — n/a)*
- "If a permission isn't enabled in a profile but is enabled in a permission set, users with that profile and permission set have the permission."

**Recovery operations are named and documented as first-class tasks** `[documented]`: `Unlock Users` · `Freeze or Unfreeze User Accounts` · `Mass Transfer Records` · `Recalculate Sharing Rules Manually` · `Defer Sharing Calculations` · `Automatic Recalculation of Org-Wide Defaults and Sharing Rules` · `Reset an External User's Password for Experience Cloud Sites`

`Freeze` as a state distinct from `Deactivate` — with its own article — is the good one: it gives an admin a reversible, non-destructive intervention for a user they need to stop *right now* without unpicking record ownership. Naming the reversible option separately, and documenting `Considerations for Deactivating Users` alongside it, is exactly the pattern from T1.

**The `Considerations for X` genre is the recovery content.** Salesforce's answer to "what if this goes wrong" is not a troubleshooting article; it is a caveats article read *before* the action. `Considerations for Editing Users`, `Considerations for Deactivating Users`, `Sharing Rule Considerations`, `Considerations for Making Sharing Updates`.

## T8 Empty states

`[observed]` — the help-centre scoped-search empty state, the best one in this batch:

> `No results`
> `Here are some search tips`
> `Check the spelling of your keywords.`
> `Use more general search terms.`
> `Select fewer filters to broaden your search.`
> `Search all of Salesforce Help`

Four elements, each doing distinct work: a flat statement of the outcome, a labelled help block, **three suggestions ordered from cheapest fix to broadest**, and an escape hatch that widens the scope rather than repeating the failed search.

The third suggestion — `Select fewer filters to broaden your search.` — is the one most no-results states omit, and it is the one that actually applies when the user has been filtering by `Product Area`, `Feature Impact`, `Edition`, and `Experience`. Contextual to the specific search UI rather than generic.

`Search all of Salesforce Help` as the escape is better than "try again": it names the wider corpus, so the user understands they were searching a subset.

Compare Wise's `Sorry, we couldn't find any articles with "" in it`. Salesforce's version has no interpolation, no apology, and three actionable next steps. This is the reference no-results state for the corpus.

`[observed]` — Trailhead unit sidebar shows `0 / 0` for related content on some units, matching the HubSpot defect.

Other in-product empty states `[absent]` — behind auth.

## T9 Notifications & system messages

`[observed]` — a persistent site-wide banner on every `help.salesforce.com` page:

> `Prepare for Email to Become the Default Login Experience` · `Read More` · `Close`

A forward-looking change notice, in title case, naming the change and the affected surface. Dismissible. No date in the banner itself, which is the omission — the user learns *what* will change and not *when*.

`[observed]` — a promotional banner on CRM pricing: `Become an agentic enterprise with our refreshed step-by-step guide.` · `Get the guide →`. The arrow glyph in the link label is the only instance of directional iconography-in-text observed.

`[observed]` — Trailhead feedback-migration notice, a full in-page block:

> `Share your Trailhead feedback over on Salesforce Help.`
> "We'd love to hear about your experience with Trailhead - you can now access the new feedback form anytime from the Salesforce Help site."
> `Learn More` · `Continue to Share Feedback`

Two CTAs on one notice, one explaining the change and one performing the new action. Note the hyphen used as a sentence-level dash (`Trailhead - you can now`), which Mailchimp's guide would flag and Salesforce has no published rule against.

`[observed]` — live counters used as notification-adjacent trust signals on the help home: `5,319,300 Agentforce Conversations` and `2,530,852 Support Requests Handled by Humans`, under the framing line "Agents + Humans driving Customer Success together since October 2024."

Publishing the human-handled count **alongside** the agent-handled count, on the support entry page, is a genuinely good disclosure: it tells a user arriving with a problem that humans still handle roughly a third of requests. Most vendors publish only the automation number.

`[observed]` — Trailhead expectation-setting on the community help route: "Expect a response within **24-48** hours from Help or the community." A stated SLA on a free community channel, with the range bolded.

`[documented]` — Trailhead unit accessibility notice (see T14).

## T10 Disclosures, legal & compliance

**The universal pricing disclaimer** `[observed]`, repeated verbatim on `/pricing/`, `/crm/pricing/`, and `/sales/pricing/`:

> "This page is provided for information purposes only and subject to change. Contact a sales representative for detailed pricing information."

On the Sales Cloud page it carries an extra clause: "AI can be added to Core and above."

Every price on the site is disclaimed as indicative. For an enterprise product sold by negotiated contract that is honest, but it means the published figures function as anchors rather than prices — and the disclaimer is placed *below* the pricing table on every page.

**Pricing-unit disclosures, per tier** `[observed]`:

- `Starter Suite` — "(Starting price. Transaction fees apply. Billed monthly or annually.)"
- `Pro Suite` — "(Starting price. Transaction fees apply. Billed annually. Contract required.)"
- `Core` / `Advanced` / `Max` — "(Billed annually)"

Three sentences of qualifier on the cheapest tier, two words on the most expensive. `Contract required.` appearing at $100/user/month but not at $195 is presumably because annual billing is assumed above that point, but the page never says so — a reader comparing Pro Suite to Core sees a commitment disclosure vanish as the price rises.

**Credit disclosures** `[observed]`: "*Limited Flex Credits and Data 360 Credits included in Foundations. Additional credits available for purchase." and, in the Max tier bullets, "2.75M Flex Credits per org per year."

**Three incompatible billing units on one pricing page:**
1. **Per user, per month** — the seat price ($25 / $100 / $195 / $395 / $550)
2. **Per org, per year** — Flex Credits (2.75M)
3. **Percentage of spend** — Success Plans ("30% of net license fees" for Premier)

A buyer modelling total cost must reconcile a per-seat monthly rate, an org-level annual credit allowance, and a percentage of the first number. Nothing on the page attempts that reconciliation; the `Flex Credit Pricing Calculator` and `Salesforce Digital Wallet` exist precisely because the published units cannot be added together. Naming the calculator on the pricing page is the right response, but it is an admission that the pricing content cannot answer the pricing question.

**Success Plans — priced as a percentage** `[observed]`:

| Plan | Price | Positioning line (verbatim) |
|---|---|---|
| `Standard Success Plan` | "Included in all licenses" | "Set your company up for success with self-guided, always-on resources." |
| `Premier Success Plan` | "30% of net license fees" | "Start strong and grow your business with expert guidance and expedited support." |
| `Signature Success Plan` | "Contact your account executive" | "Get the most value with a proactive partnership and personalized experience." |

Three price formats in one comparison row: included, a percentage, and a conversation. That is an unusually honest rendering of how enterprise support is actually sold, and the `Included in all licenses` phrasing for the free tier is better than `$0` or `Free` — it tells the buyer they already have it.

Standard Success Plan's benefits name the free content estate directly: "Access to Knowledge Articles, documentation, and Trailhead" and "Global Trailblazer Community." Documentation and community are positioned as a **priced product tier**, which is a rare and clarifying thing to see stated.

**Trial terms** `[observed]`: "Trial subscriptions cannot be used in a production capacity and must be used only for non-production purposes." and "Whenever you're ready to buy, hit 'Buy Now' from within your trial to purchase licenses. When your trial expires, you will be prompted to buy or give us a call for more info." Free trial is 30 days and "No credit card required. Nothing to install."

**Trust framing** `[observed]` — Trailhead states it as a value with an artefact attached: "At Salesforce, **trust** is our top priority. Not only are you keeping your sensitive data in your org, you're also building functionality vital to your company's success on our platform. Our responsibility to keep your data and functionality safe is not something we take lightly, which is why we're always transparent about our services." Routed to `trust.salesforce.com`, plus the `Einstein Trust Layer` — "adds security guardrails so you can use generative AI with your company and customer data without compromising data privacy or governance."

**Corporate-responsibility disclosure** `[observed]` on the homepage: "Grounded in trust, customer success, innovation, equality, and sustainability, we're committed to doing well in business and doing good in the world — investing 1% of our equity, technology, and time to create lasting change. We're also a founder and champion of Pledge 1%." The five named corporate values (`trust, customer success, innovation, equality and sustainability`) also appear as alt text on the values plaque image.

**Privacy controls** `[observed]`: `Your Privacy Choices` (with the US state-privacy opt-out icon) · `Cookie Preference Center` with a four-tab consent manager (`General Information` / `Required Cookies` / `Functional Cookies` / `Advertising Cookies`), each tab carrying a plain-language definition and examples. `Required Cookies` is labelled `Always Active` and cannot be toggled, which is correctly disclosed rather than hidden.

## T11 Help-centre architecture

**`help.salesforce.com/s/` (the help home) is blocked** — client-rendered, empty body. Individual articles at `/s/articleView` render server-side. So the entry point is unavailable to unauthenticated crawling while the content is not; anything said here about Salesforce's help IA is reconstructed from article-level breadcrumbs and the embedded TOC.

**Breadcrumb structure** `[observed]`: `Salesforce Help` → `Docs` → `<Guide>` → `<Article>`, e.g. `Salesforce Help > Docs > Manage Users and Data Access > Permission Sets`.

**Two distinct documentation systems, with different URL shapes and different content genres** `[observed]`:

| System | URL shape | Genre | Example |
|---|---|---|---|
| DITA-generated product docs | `?id=platform.<topic>.htm&type=5` | Conceptual and procedural reference, with `Required Editions` tables, versioned (`platform.ReleaseName: 264.0.0`) | `Permission Sets`, `Sharing Rules` |
| Knowledge articles | `?id=0000<nnnnn>&type=1` | Support-authored, problem-shaped, with `Publish Date` and `Knowledge Article Number` | `Default Standard Picklist Field Values in Salesforce Classic (…)` |

The two are interleaved in search results and are visually near-identical, but they have different authorship, different freshness signals (`Last updated` vs `Publish Date`), different metadata, and different title conventions. A user cannot tell which they are reading. The knowledge-article title observed is 15 words with a nine-item parenthetical — support-authored titles are long and enumerative where doc titles are short and conceptual.

**The `Required Editions` table** `[observed]` — every DITA article opens with a table stating where the feature exists, e.g. "Available in: both Salesforce Classic and Lightning Experience". This is Salesforce's equivalent of HubSpot's subscription-availability block, and it answers the same question (does this apply to me) before the content. Salesforce's version additionally has to disambiguate the **two UI generations**, which HubSpot does not have to do.

**Article furniture** `[observed]`: breadcrumb · `Required Editions` · body · a bulleted list of child topics, each with a one-line summary · `Did this article solve your issue?` → `Yes` / `No` with the prompt `Let us know so we can improve!` · `Knowledge Article Number`.

The child-topic list with one-line summaries is the good part — it turns a parent concept page into a navigable index:
- **`Guidelines for Creating Permission Sets and Permission Set Groups`** — "Review these recommendations on setting up your permission sets and permission set groups."
- **`Create Permission Sets`** — "Create permission sets that contain the permissions necessary for your users to complete a specific job or task."
- **`Sharing Rule Types`** — "You can base a sharing rule on record ownership or other criteria."
- **`Create Sharing Rules`** — "You can create sharing rules based on the record owner or other criteria, and sharing rules that grant record access to unauthenticated guest users."

**Routing** `[observed]` on the help home markup: the page leads with `How can Agentforce help?` and an AI input, above the counters and above any category list. Self-service search has been replaced by an AI assistant as the primary entry point — a significant IA decision that could not be evaluated further because the rest of the page did not render.

**Four sibling learning properties** are linked from the help footer: `Salesforce Admins`, `Salesforce Developers`, `Trailhead`, `Training` (Trailhead Academy). Salesforce runs the widest set of distinct audience-segmented content properties in this batch.

## T12 FAQs

**A. Pricing overview FAQs** `[observed]` — heading `Frequently Asked Questions (FAQ)`. Questions verbatim, answers summarised.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Are there upfront costs or additional fees? | Does not answer; routes to a phone number to discuss add-ons. |
| 2 | What if my business priorities and product needs have changed? | Does not answer; routes to a sales rep. "We know things don't always go according to plan, and we're here and will try our best to support." |
| 3 | Do Salesforce products integrate with outside applications and systems? | Many integrate directly; for those that don't, buy MuleSoft, use integration partners, or use AgentExchange. |
| 4 | What support and service packages are available? | Routes to Success Cloud. |
| 5 | Can I pay monthly? | Starter only, monthly or annual; "All other subscriptions are generally paid annually in advance." |
| 6 | How long are your contracts? | "Most Salesforce products use annual contracts, but Salesforce subscription terms vary." Then routes to a rep. |
| 7 | Can I upgrade at any time? Can I add more products later on? | Yes, "but some products may need to scale together." Routes to a rep. |
| 8 | How does the free trial work? | Fill the form, trial opens in-window, import data, `Buy Now` from within the trial; non-production use only. |
| 9 | Will my data be private and safe? | Trust framing, "over 150,000 businesses", routes to trust.salesforce.com. |

**Structural note, and it is the finding.** Six of nine answers route to a human rather than answering. Q1 asks "are there upfront costs or additional fees?" and the answer states that add-ons exist and gives a phone number — it does not say whether there are upfront costs. Q6 asks "how long are your contracts?" and answers "terms vary." The phone number `1-800-664-9073` appears in five of the nine answers.

This is an FAQ block operating as a **lead-capture surface rather than a self-service surface**. It is internally consistent with an enterprise sales model, and it is the inverse of HubSpot's billing FAQ (which opens with a flat `No.`) and Mailchimp's pricing FAQ (which gives worked dates and explicit overage mechanics). Worth recording as a domain pattern: the more negotiated the price, the less an FAQ can answer.

Q7 is a **compound question** ("Can I upgrade at any time? Can I add more products later on?") — two question marks in one accordion label, the same construction Wise uses.

**B. CRM pricing FAQs** `[observed]` — heading `CRM pricing frequently asked questions`.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | How much does CRM cost? | Varies; "you only have to pay for the features you use"; routes to the pricing index. |
| 2 | What are the different pricing plans available for Salesforce CRM? | Names `Starter Suite`, `Pro Suite`, `Enterprise`, `Unlimited`. |
| 3 | Can I try Salesforce CRM before committing to a plan? | Yes, 30-day free trial, with "guided onboarding feature". |
| 4 | What is included in the Starter Suite plan? | Marketing, sales, service, commerce in one place; links a demo video. |
| 5 | What is included in the Pro Suite plan? | Builds on Starter with customisation, automation, and additional apps. |
| 6 | I'm an existing customer. How do I activate Foundations? | Enterprise and above activate free in 'Your Account'; includes 1,000 Agentforce conversations. |
| 7 | Are there any additional costs for add-ons or integrations? | Some add-ons cost extra; "It's important to review the pricing details for these add-ons to understand the total cost." |
| 8 | Can I upgrade or downgrade my plan at any time? | Yes; "some products may need to scale together"; phone number. |

**Q2 and Q6 are the evidence for the edition-name collision documented in T13.** Q2 answers a question about *current* plans by naming `Enterprise` and `Unlimited` — editions that the Sales Cloud pricing table on the same site has renamed to `Advanced` and `Max`. Q6 gates Foundations on "Enterprise customers and above," using the legacy tier name as the eligibility boundary.

Q6 is also the only first-person question in either set (`I'm an existing customer.`) — a declarative preamble before the question, which is a good way to let an existing customer skip past acquisition content.

## T13 Terminology & glossary

**This is the priority section for this product, and Salesforce is the corpus's reference case for coined enterprise vocabulary.**

**Salesforce does not publish a general glossary at a stable public URL.** `help.salesforce.com/s/articleView?id=platform.glossary.htm&type=5` returns `We looked high and low but couldn't find that page.` A `Data 360 Glossary of Terms` is linked from Trailhead. So the terminology is taught **narratively through Trailhead** rather than defined in a reference list — which is itself the finding: Salesforce teaches its vocabulary as a story with a fictional company in it, because the terms only make sense in relation to each other.

### The data-model primitives, as taught

Trailhead states the mapping in one sentence, and it is the single most important sentence in Salesforce's documentation:

> "In Salesforce CRM, we think about database tables as **objects**, we think about columns as **fields**, and rows as **records**."

| Salesforce term | What it renames | Notes |
|---|---|---|
| `object` | database table | Two kinds taught: `standard objects` ("objects that are included with Salesforce… Account, Contact, Lead, and Opportunity") and `custom objects` ("objects that you create to store information that's specific to your company or industry"). Three more named but not taught: `external objects`, `platform events`, `BigObjects` |
| `field` | column | HubSpot says `property` for the same thing |
| `record` | row | |
| `data model` | schema | "a way to model what database tables look like in a way that makes sense to humans" |
| `metadata` | schema + configuration | "data about data"; taught by subtraction — delete the values from a Property record and "You are left with the Property object along with all its empty fields… These fields are metadata" |
| `org` | tenant / instance | Used throughout without ever being formally defined on the pages harvested — "your org", "in your org", "your organization's data". The most-used and least-defined term in the Salesforce lexicon |
| `multitenancy` | shared infrastructure | Taught with an apartment-building metaphor |
| `API name` | machine identifier | "the platform automatically creates an API name, like `{!Contact.Name}` that serves as an access point between your org and the database" |
| `__c` | custom-object/field suffix | Taught explicitly to beginners |

The metadata explanation — **delete the data and describe what remains** — is the best piece of technical teaching in this batch. It defines an abstract term by an operation the reader can perform mentally, using an example (a $500,000 three-bedroom property in Boston) they have already seen twice.

### Access-control vocabulary — the densest coined set

`[documented]`, all from the `Manage Users and Data Access` guide:

| Term | Salesforce's definition (verbatim or close) |
|---|---|
| `Permission set` | "a collection of settings and permissions that give users access to various tools and functions. Permission sets extend users' functional access without changing their profiles and are the recommended way to manage your users' permissions." |
| `Profile` | The baseline permission container that permission sets extend. **Salesforce now positions permission sets as "the recommended way"** — a stated preference between two overlapping mechanisms |
| `Permission set group` | Bundles permission sets by job function |
| `Muting permission set` | A permission set that *removes* permissions within a group |
| `Session-based permission set` | Activated for a session, e.g. via a flow |
| `Standard permission set` / `Integration permission set` | Shipped varieties |
| `Sharing rule` | "Use sharing rules to extend sharing access to users in public groups, roles, or territories. Sharing rules give particular users greater access by making **automatic exceptions to your org-wide sharing settings**." |
| `Owner-based sharing rule` / `Criteria-based sharing rule` / `Guest user sharing rule` | Three rule types |
| `Organization-wide sharing defaults` (`OWD`, `org-wide defaults`) | The baseline access floor; internal and external variants |
| `Role hierarchy` | Access inheritance by reporting line |
| `Manual sharing` | Per-record grant |
| `Sharing override` | |
| `Public group` / `Personal group` | With `Group Member Types` and `Manager Groups` |
| `Queue` | Shared ownership container |
| `Deferred sharing calculation` | An operational state for large orgs |
| `Contactless user` | A user record with no associated contact |
| `Freeze` (a user) | Reversible suspension, distinct from deactivate |
| `Super User Access` | Elevated partner/customer access in Experience Cloud |
| `Account Role Optimization` | |
| `Territory` | A sharing dimension alongside roles and groups |

**The permission-set definition contains Salesforce's own admission of redundancy.** "Permission sets extend users' functional access **without changing their profiles** and are **the recommended way** to manage your users' permissions." Two overlapping mechanisms ship simultaneously; the docs recommend one and keep the other. The teaching example that follows is good — "let's say you have several users who must delete and transfer leads. You can create a permission set based on the tasks that these users must perform" — because it grounds the abstraction in a task-shaped grant rather than a role-shaped one.

And the resolution rule is stated as a plain conditional: "If a permission isn't enabled in a profile but is enabled in a permission set, users with that profile and permission set have the permission." One sentence for the whole precedence model. That is good writing on a genuinely hard topic.

`Sharing rule` defined as "**automatic exceptions** to your org-wide sharing settings" is the other strong definition: it locates the mechanism relative to the baseline rather than describing it in isolation, so a reader who understands OWD understands sharing rules immediately.

### Platform, product, and brand coinages

`Lightning Experience` vs `Salesforce Classic` (two UI generations, both live, both named in every `Required Editions` table) · `Setup` · `Object Manager` · `Quick Find` · `App Launcher` · `page layout` · `picklist` · `Agentforce` · `Agentblazer` (`Champion` / `Innovator` / `Legend`) · `Einstein` / `Einstein Trust Layer` · `Data 360` (a `data lakehouse`, explicitly "not a traditional database") · `Flex Credits` · `Digital Wallet` · `Foundations` · `AgentExchange` · `AppExchange` · `MuleSoft` · `Heroku` · `Slack` · `Tableau Next` · `Salesforce Spiff` · `Salesforce Maps` · `Net Zero` · `Experience Cloud` · `Trailhead` · `Trailblazer` · `Trail` · `Trailmix` · `Superbadge` · `Quest` · `Trailhead Playground` · `Astro` (mascot) · `Dreamforce` · `Pledge 1%` · `Headless 360 Platform` · `Momentum` · `Premier Success` / `Signature Success`.

`Trailblazer` is the strongest of these: a single coined noun that names the learner, the community member, the certification holder, and the customer advocate, and generates `Trailhead`, `Trail`, `Trailmix`, `Trailblazer Community`, `Trailblazer Quests`, and `Be A Trailblazer` as a coherent family. Almost no other vendor has a name for *the person using the product* that the person will actually use about themselves.

### Terminology collision and drift — negative findings

**1. Three generations of edition names are live simultaneously.** This is the most significant terminology finding in the file.

| Generation | Names | Where observed |
|---|---|---|
| Legacy | `Professional Edition`, `Enterprise`, `Unlimited` | CRM pricing FAQ Q2 and Q6; trial URLs `/sales/free-trial/ee/` (Enterprise Edition) and `/sales/free-trial/ue` (Unlimited Edition) |
| Current | `Core`, `Advanced`, `Max` | Sales Cloud pricing table |
| SMB | `Free Suite`, `Starter Suite`, `Pro Suite` | Both pricing pages |
| Bundled | `Agentforce 1 Editions` | CRM pricing, Premier Success bullet |

And the collision is visible **inside a single bullet on the current pricing table**. The `Core` tier's first feature bullet reads:

> "Everything in **Professional Edition** plus Momentum and Premier Success"

A tier called `Core` is defined by reference to an edition called `Professional` that does not appear anywhere else in its own pricing table. The `Try for free` button under `Core` links to `/sales/free-trial/**ee**/` — Enterprise Edition. So the tier is named `Core`, described as `Professional + extras`, and trialled as `Enterprise`. Three names, one product, one page.

The CRM pricing FAQ then answers "What are the different pricing plans available for Salesforce CRM?" with "Starter Suite and Pro Suite, Enterprise, and Unlimited" — omitting `Core`, `Advanced`, and `Max` entirely, on a site where those are the names in the table.

For a corpus studying enterprise terminology, this is the exemplary case: **a rename executed in the pricing table, not executed in the FAQ, not executed in the URLs, and not executed in the feature bullets.**

**2. Two UI generations both named in every doc header.** `Available in: both Salesforce Classic and Lightning Experience`. The knowledge article harvested is titled `Default Standard Picklist Field Values in Salesforce Classic (…)` — the canonical reference for default state values is scoped to the *legacy* UI. A user in Lightning reading that article cannot be certain it applies.

**3. `Data Cloud` → `Data 360`, incompletely.** Trailhead's unit is titled "The Data 360 Difference" but links to `trailhead.salesforce.com/content/learn/modules/**data-cloud**-powered-experiences` and to `help.salesforce.com/s/articleView?id=**data.c360**_a_glossary_guide.htm`. Three names — `Data Cloud`, `c360`, `Data 360` — in one Resources list.

**4. `Force.com` survives in URLs.** The Trailhead module teaching current platform architecture is served from `/modules/**starting_force_com**/`, and is titled `Agentforce 360 Platform Basics`. The unit body calls the product `Headless 360 Platform` in the sidebar and `the Salesforce platform` in the prose. Four names for the platform on one page.

**5. `Commerce Cloud` / `Revenue Cloud` / `Revenue Intelligence`** all appear as distinct line items in the Sales Cloud add-on list, alongside `Salesforce Spiff` and `Sales Programs` — a revenue-adjacent naming cluster with no stated boundaries.

**6. `ID` is overloaded.** `ID Decision Makers` (opportunity stage, verb) vs the 18-character record `ID` (noun) vs `Audience ID`-style identifiers. Taught in the same Trailhead trail.

**7. Priority scales diverge across objects** (see T6): Task uses `Normal`, Case uses `Medium`.

**8. `Salutation` picklists diverge between Lead and Contact** (see T6), despite Lead converting into Contact.

### Pricing-unit vocabulary

`per user, per month` · `billed annually` / `billed monthly or annually` · `Contract required` · `Starting price` · `Transaction fees apply` · `net license fees` (the base for Success Plan pricing) · `Flex Credits` (`per org per year`) · `Data 360 Credits` · `Digital Wallet` ("near real-time monitoring of your usage data for consumption-based Salesforce products") · `license` / `licenses` (the purchasable unit, distinct from `user` and from `seat` — **Salesforce says `license` where HubSpot says `seat`**) · `Edition` · `add-on` · `Success Plan`.

The `license` / `user` / `seat` distinction is worth flagging: Salesforce prices `per user per month` but sells `licenses`, and the trial copy says "hit 'Buy Now' from within your trial to purchase **licenses**." HubSpot has standardised on `seat` and defines it explicitly ("seats determine which tools a user can access… permissions define the specific actions they can take"). Salesforce uses two words for the thing you buy and never reconciles them on the pricing pages.

## T14 Voice, tone & accessibility

**No published content style guide was found on a public Salesforce property during this harvest.** `[absent]` for a published standard. (The Lightning Design System historically carried content guidelines; it was not reachable in this pass and is recorded as a gap, not as an absence.)

### The register split is the finding

Salesforce operates **three clearly distinct registers on three properties**, and the split is deliberate and well maintained:

| Property | Register | Evidence |
|---|---|---|
| `salesforce.com` | Superlative-led, abstraction-heavy, claim-dense | "#1 Agentic CRM", "the platform for the Agentic Enterprise", "Everyone talks the AI talk. We're walking the walk." |
| `help.salesforce.com` | Flat, DITA-structured, third-person-ish, zero humour | "Use sharing rules to extend sharing access to users in public groups, roles, or territories." |
| `trailhead.salesforce.com` | Second person, jokey, metaphor-driven, self-aware | "Multitenancy is a great word for making you sound smart at dinner parties" |

**Trailhead's voice, in detail** `[observed]` — it is the most distinctive learning-content voice in this batch:

- **Metaphor as the primary teaching device.** Architecture is "a many layered cake because cake is delicious, and it makes everything better." Multitenancy is "an apartment building. Your company has its own space in the cloud, but you have all kinds of neighbors, from mom-and-pop shops to multinational corporations." APIs are the USB-C port on the reader's own laptop — "You don't have to know how the USB-C port works."
- **The metaphor is then explicitly cashed out.** "A lakehouse sounds wonderful, doesn't it? But, in this case, a *data lakehouse* isn't a relaxing property Michelle is helping a client buy, but rather an architecture that handles both structured and unstructured data." Salesforce notices its own pun, jokes about it, and then gives the real definition in the same sentence. That pattern — **play with the term, then define it precisely** — is the mechanism that keeps the humour from costing clarity.
- **Section headings as jokes**: `Sharing Is Caring in the Multitenant Cloud`, `The Magic of Metadata`, `All About That API`.
- **Self-deprecation about jargon**: "Multitenancy is a great word for making you sound smart at dinner parties, but really all it means is that you're sharing resources."
- **Direct address with hedged confidence**: "Wait. That's pretty abstract, right?" · "If that sounds kind of abstract, take a quick look at the computer you're working on right now." · "There's a lot to unpack here, but let's focus on the most important points."
- **Encouragement at step boundaries**: "Great job! You just created your first custom object." · "Awesome! You'll see something like the following." · "You need this object later, so don't skip these steps!"

The exclamation marks cluster entirely in the encouragement lines and the don't-skip warnings — never in a definition, never in a caveat. Same register gradient as Wise: informality where the stakes are low, flatness where they are not.

**Help documentation voice** `[observed]` — second person, present tense, active where possible, but with a distinctive abstract-noun density that Trailhead specifically works to undo: "Sharing rules give particular users greater access by making automatic exceptions to your org-wide sharing settings." The two properties are teaching the same concepts at opposite ends of a readability range, which is a defensible division of labour and also means **the reader must switch properties to switch register**, rather than the docs offering both.

**Marketing voice** `[observed]` — heavy on unhedged superlatives (`#1 AI CRM`, `#1 agentic CRM`, `the world's #1 agentic CRM`, `the only data platform native to…`, `the most complete Sales platform`) with numeric substantiation attached but no footnoted methodology of the kind Mailchimp publishes. The `#1` claim appears in at least four distinct formulations. Compare Mailchimp's 21 numbered disclaimers, each naming a measurement window; Salesforce's homepage carries none.

### Accessibility

**The Office of Accessibility page** `[observed]` — a substantial, well-written brand-level property, but **not a conformance statement**.

Headline: `**Our vision** is a world where people with disabilities have the tools to succeed`

Positioning line: "At Salesforce, accessibility means removing barriers in society and technology so everyone can use their unique skills to do their best work." And the section heading `We believe in accessibility being built in, not added on`, with the sub-brand `Accessible By Design` (from the og:image alt text).

Quote from `Catherine Nichols, Chief Accessibility Officer, Salesforce`: "As we shape the future with AI, we have a responsibility and an opportunity to design a world that works better for everyone. When we center inclusion from the start, we unlock innovation that reaches and empowers us all."

Named accreditation with detail: "Salesforce was awarded the highest tier of the U.K. government's Disability Confident scheme — run by the Department for Work and Pensions (DWP). Level 3 (Leader) recognizes employers that lead the way in disability inclusion." Naming the scheme, the department, the level, and what the level means is better disclosure than a badge.

Eighteen named partner organisations (IAAP, Deque, Disability:IN, Business Disability Forum, Blind Institute of Technology, Neurodiversity in Business, PurpleSpace, The Valuable 500, Fundación Once, Genius Within, Cephable, and others).

**What is absent from this page:** no WCAG version or conformance level, no VPAT or ACR link, no accessibility-feedback email or form, no statement of scope (product vs website), no known-limitations section, no review date. Compare HubSpot, whose statement is shorter, blander, three years stale — and names the standard, the level, the scope, and a reporting address. Salesforce's page is the better *communication* and the weaker *statement*. Both facts belong in the corpus. (Salesforce does publish VPATs and product accessibility documentation elsewhere; they were not reachable from this page.)

**Observed practice:**

- `Skip to content` on salesforce.com; `Skip to main content` on Trailhead. Two labels for one control across properties.
- **Alt text is descriptive and, on the accessibility page, exemplary** — "A group of coworkers sit together in an office, some wearing shirts that read 'accessibility = inclusion.'" (transcribes text in the image) · "Woman and man sitting at computer with woman pointing something out on screen." · "Award graphic: 'One of Fortune's 100 Best Companies to Work For — 18 Years in a Row (2025).'" (transcribes the award text) · "An Agentblazer and Salesforce mascot Astro stand beside a plaque featuring our core values: trust, customer success, innovation, equality and sustainability." (transcribes the plaque).
- **Salesforce's homepage alt text carries the content of an infographic in full**: "An infographic describing the architecture of Salesforce products. The base in the Salesforce platform, with workflows, AI, and security. Built on that is Data Cloud, where we bring in information from additional sources. We place of products in the next layer, so all this data and trust supports their functionality. And across it all sits Agentforce." This is the correct instinct — put the data in the alt text — and it contains two typos (`The base in the` for "is the"; `We place of products`). A screen-reader user gets the information and the errors. It also says `Data Cloud` where the current name is `Data 360`.
- Trailhead alt text describes teaching images functionally: "A spreadsheet that stores property information." · "A property record with the same information as the table." · "An email template in Salesforce using the API name of a contact and property."

**The screen-reader alternative — a pattern worth arguing about** `[observed]`. Every affected Trailhead unit carries a standard block:

> `Accessibility`
> "This unit requires some additional instructions for screen reader users. To access a detailed screen reader version of this unit, click this link: **Open Trailhead screen reader instructions**"

Two readings, and the corpus should hold both. **Positive:** Salesforce has identified that its hands-on, gesture-and-screenshot-dependent units genuinely cannot be followed by a screen-reader user, has written a separate detailed version rather than leaving those learners stuck, and has surfaced the link at the top of the unit rather than in a footer. That is real work and real cost. **Negative:** it is a separate-but-equal experience — a parallel document, on a different domain (`developer.salesforce.com/files/accessibility/...`), that must be maintained in sync with the primary unit and almost certainly is not. The presence of the block is also an admission that the primary unit does not meet the bar.

Recorded as a **conditional pattern**: acceptable as a stopgap for inherently visual procedural content; not acceptable as a design target. The right version is a primary unit that needs no alternative.

**Other accessibility observations:**
- The help centre's persistent `Sorry to interrupt` / `CSS Error` dialog appears before content on every article and is announced ahead of the article body.
- Cookie consent manager is a four-tab interface with plain-language definitions per category and `Required Cookies` correctly marked `Always Active` and non-toggleable.
- `Your Privacy Choices` uses the standard US state-privacy opt-out icon with a text label rather than icon alone.
- The homepage `Al` typo for `AI` in the Agentforce claim would be read aloud as a word, not as an initialism.

---

## Transferable patterns

1. **Ship a `Considerations for X` article type.** A caveats-only page, separate from the procedure, holding every edge case, exception, and irreversibility for one action. Twelve of them in one TOC branch. It keeps the happy path short without losing anything, and the title tells the reader exactly what genre they are about to read. The strongest single IA idea in this batch and directly applicable to any complex configuration or compliance flow.
2. **Four article types per action: do it / understand it / watch out for it / do it well.** `Create Sharing Rules` / `Sharing Rules` / `Sharing Rule Considerations` / `Best Practices for Optimizing Sharing Performance`. Making the content-type taxonomy legible from the title alone lets a reader pick the register they need.
3. **Define abstract terms by an operation the reader performs mentally.** Salesforce defines metadata by telling the reader to delete the values from a record they have already seen and describe what remains. Better than any definition sentence, and it works for any term where the concept is "the shape of the thing, not the thing."
4. **Play with the term, then define it precisely, in the same breath.** "A lakehouse sounds wonderful, doesn't it? But, in this case, a data lakehouse isn't a relaxing property… but rather an architecture that handles both structured and unstructured data." The joke earns attention; the clause after "but rather" pays it back. This is how Trailhead gets away with a voice that would otherwise cost clarity.
5. **Name states for verifiable events, not for seller activities.** Salesforce's `Needs Analysis` / `Value Proposition` / `Perception Analysis` are unfalsifiable; HubSpot's `Contract sent` / `Appointment scheduled` are auditable. The comparison in T6 is the clearest argument in the corpus for event-named over activity-named state vocabularies. Applies to any pipeline, queue, or case-progress model.
6. **Never ship two stages with the same weight.** `Prospecting` and `Qualification` both at 10% means the forecast cannot see a real transition the user is being asked to record. If two states are worth distinguishing in the UI, they must be distinguishable in the data.
7. **Teach content design to the people who will name your strings.** Salesforce's `Customize Responsibly` block — "Be thoughtful about names", with the worked bad example `Property2` — is the highest-leverage content in a product where every end-user-visible label is authored by a customer admin. Any platform, marketplace, or configurable product should have this block, and it should not be one paragraph at the end of one unit.
8. **The no-results state: outcome, then three ordered fixes, then a widened escape.** `No results` → check spelling → use more general terms → **select fewer filters** → `Search all of Salesforce Help`. The filter suggestion is contextual to the actual UI and is the one most products omit. Reference implementation for the corpus.
9. **Give the free tier a name and say what it includes, rather than pricing it at zero.** `Standard Success Plan` — "Included in all licenses" — "Access to Knowledge Articles, documentation, and Trailhead". Positioning documentation and community as a named support tier tells the buyer what they already have, and tells the content team what they are worth.
10. **Publish the human-handled count next to the AI-handled count.** `5,319,300 Agentforce Conversations` beside `2,530,852 Support Requests Handled by Humans`, on the support entry page. It sets an honest expectation at the moment a user is deciding whether to bother asking.
11. **Negative pattern to avoid: renaming tiers in the table but not in the FAQ, the URLs, or the feature bullets.** A `Core` tier described as "Everything in Professional Edition plus…" and trialled at a URL ending `/ee/` is the anatomy of an incomplete rename. Any tier rename needs a checklist covering pricing table, feature bullets, FAQ answers, trial URLs, help-article `Required Editions` tables, and eligibility gates.

## Caveats & gaps

- **Two pages blocked.** `status.salesforce.com` returned only "You need to enable JavaScript to run this app." — no component names, severity ladder, or incident copy. `help.salesforce.com/s/` (the help home) returned only chrome and the `How can Agentforce help?` block; the category IA below it did not render. Both recorded as blocked, not absent. Individual help articles at `/s/articleView` **do** render and were harvested.
- **`/service/pricing/` only partially read.** The page body exceeded the fetch limit; only the header and framing line were captured. Service Cloud edition names and case-related pricing vocabulary are therefore unharvested, which is a real gap given that Service Cloud is where case-state terminology is monetised.
- **No general public glossary exists, or at least none was reachable.** `platform.glossary.htm` 404s. All terminology in T13 is assembled from Trailhead prose, two help articles, and pricing pages. A `Data 360 Glossary of Terms` is linked but was not fetched. The term `org` — arguably Salesforce's single most load-bearing coinage — is used throughout and defined nowhere on the pages harvested.
- **Default picklist values are sourced from a Salesforce Classic article.** The T6 values come from a knowledge article explicitly titled `…in Salesforce Classic`. Lightning Experience defaults may differ, and newer objects (Lead pipelines, Opportunity forecast categories as currently shipped, Case status categories) are not covered by that article. Treat these as the historical canonical defaults, which is what makes them interesting for a terminology corpus, not necessarily as what a 2026 org provisions today.
- **The Financial Services Cloud lead-status variant was seen only in a search-result snippet and is deliberately excluded.** No FSC picklist values are quoted in this file.
- **Homepage FAQ questions were not captured.** The homepage rendered the `Frequently Asked Questions` heading and the answer bodies without the question text. The two FAQ sets recorded in T12 are from `/pricing/` and `/crm/pricing/`, where questions rendered.
- **No authenticated pass.** Setup UI, Object Manager, the permission-set editor, sharing-settings screens, validation messages, toasts, and every in-product empty state are `[documented]` at best, reconstructed from Trailhead procedures and help articles.
- **Only two Trailhead units harvested** out of thousands. The voice analysis in T14 generalises from two units in two modules; both are beginner-level platform modules, which is where Trailhead's register is warmest. Advanced and admin-certification content may be flatter.
- **No published content style guide found.** The Lightning Design System's content guidelines were not reachable in this pass. T14 records `[absent]` for *found on the surfaces harvested*, not for *does not exist*.
- **Accessibility conformance detail not harvested.** The Office of Accessibility page is a brand page; Salesforce's VPATs, ACRs, and product accessibility conformance documentation live elsewhere and were not reached. The criticism in T14 is of *that page as a statement*, not of Salesforce's conformance posture.
- **Locale.** en-US only. Help is localised into 17 languages, Trailhead into several; none were checked.
- **Pricing figures are disclaimed by Salesforce itself** ("provided for information purposes only and subject to change"). The $25 / $100 / $195 / $395 / $550 figures are list anchors on an enterprise product sold by negotiation and should not be cited as transaction prices.

## Sources

1. https://www.salesforce.com/
2. https://www.salesforce.com/pricing/
3. https://www.salesforce.com/crm/pricing/
4. https://www.salesforce.com/sales/pricing/
5. https://www.salesforce.com/service/pricing/
6. https://help.salesforce.com/s/articleView?id=000004221&language=en_US&type=1
7. https://help.salesforce.com/s/articleView?id=platform.perm_sets_overview.htm&language=en_US&type=5
8. https://help.salesforce.com/s/articleView?id=platform.security_about_sharing_rules.htm&language=en_US&type=5
9. https://help.salesforce.com/s/ *(blocked — client-rendered)*
10. https://trailhead.salesforce.com/
11. https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_understanding_arch
12. https://trailhead.salesforce.com/content/learn/modules/data_modeling/objects_intro
13. https://www.salesforce.com/company/accessibility/
14. https://status.salesforce.com/ *(blocked — client-rendered)*
