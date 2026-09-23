# 184. HubSpot

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | CRM and marketing platform (multi-product "customer platform" for SMB through enterprise) |
| Primary URL | https://www.hubspot.com/ |
| Corpus rank | 184 |
| Benchmark strength (source list) | Setup, CRM states, guidance |
| Locale / market observed | en-US (site offers JA, DE, ES, PT-BR, FR; knowledge base offers 17 locales) |
| Platform observed | Web (desktop), knowledge base, legal centre, status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR (dedicated product playbook and consent tooling), CAN-SPAM implied via subscription types, CASL; WCAG 2.1 AA self-declared for public websites; no financial regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Full for record/lifecycle state vocabulary and pricing-unit vocabulary; partial for live product — in-product strings are quoted inside knowledge-base procedures rather than observed. One page (`/pricing/crm`) returned an oversized body and was only partially read; one page (`/web-accessibility`) returned empty and redirects to the Legal Center |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing homepage | https://www.hubspot.com/ | Hero, Hub naming, nav, case studies, AI agents |
| Pricing — CRM / free tools | https://www.hubspot.com/pricing/crm | Oversized body; title and meta description captured only |
| Knowledge base home | https://knowledge.hubspot.com/ | 13 categories, "highest rated articles" |
| KB — Get Started | https://knowledge.hubspot.com/get-started | Nine task-named setup guides |
| KB — HubSpot Glossary | https://knowledge.hubspot.com/get-started/hubspot-glossary | ~90 defined terms across 8 groupings |
| KB — Use contact and company lifecycle stages | https://knowledge.hubspot.com/records/use-lifecycle-stages | **T6 primary source**: 8 lifecycle stages, 8 lead statuses, 4 calculated properties |
| KB — Set up and manage object pipelines | https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines | **T6 primary source**: default stages for 11 objects |
| KB — Understand marketing contacts billing | https://knowledge.hubspot.com/account/understand-marketing-contacts-billing | **Billable-unit definition**, tier-upgrade rules, notification thresholds |
| KB — Assign and manage seats | https://knowledge.hubspot.com/account-management/manage-seats | Seven seat types, seat billing rules |
| KB — Manage your HubSpot subscription | https://knowledge.hubspot.com/account/manage-your-hubspot-subscription | Billing-page IA, six FAQs |
| KB — CRM category | https://knowledge.hubspot.com/crm | 12 topics with top-article triads |
| KB — Account & Setup category | https://knowledge.hubspot.com/account-and-setup | 10 topics with top-article triads |
| Website Accessibility Statement | https://legal.hubspot.com/website-accessibility | WCAG 2.1 AA commitment, reporting address |
| Status page | https://status.hubspot.com/ | 11 components, 5 states, incident lifecycle |

---

## T1 Navigation & IA labels

**Global nav — five items, plus two utility rows** `[observed]`

`Products` · `Solutions` · `Pricing` · `Resources` · `About`

Utility row above: `English Select a language` · `High Contrast` · `Customer Support` · `Contact Sales` · `Log in`
Persistent CTA pair: `Get a demo of HubSpot's premium software` / `Get started free with HubSpot's free tools`

Two things stand out. `High Contrast` is a **first-class toggle in the global utility nav**, alongside language — an accessibility affordance promoted to the same tier as localisation, which is rare. And the two hero CTAs are unusually long for buttons (eight and nine words); the visible label is shorter but the accessible name carries the full qualifier, which is a deliberate choice to disambiguate "demo" (premium) from "free" (free tools) for screen-reader users.

**Products menu — the Hub taxonomy** `[observed]`

Each entry is `<Name> Hub` + a three-to-four-word category descriptor + the link `Free and premium plans`:

| Product | Descriptor (verbatim) |
|---|---|
| `Marketing Hub` | "Marketing automation software" |
| `Sales Hub` | "Sales software" |
| `Service Hub` | "Customer service software" |
| `Content Hub` | "Content marketing software" |
| `Data Hub` | "Data management software" |
| `Revenue Hub` | "CPQ, billing, and payments software" |
| `Smart CRM` | "AI-powered, flexible CRM software" |
| `Agent Hub` | "Your central home for building and managing AI agents across the platform" |
| `Small Business Bundle` | "The Starter edition of each product, built for startups and small businesses" |
| `AEO (Beta)` | "Answer engine optimization tools that track and improve your brand's visibility in AI results" |
| `HubSpot Marketplace` | "Connect your favorite apps to HubSpot" |

The descriptor grammar is strictly `<category> software` for the six core Hubs and breaks for the four non-Hubs — a legible rule, consistently applied. `Agent Hub`'s descriptor is the one that breaks length discipline at 13 words, which is how you can tell it is the newest entry.

**Solutions menu — organised by three axes, not one** `[observed]`

`By Use Case` · `By Team Size` · `Why HubSpot?`

Use cases are **verb-first pairs under a function heading**, which is the best-structured menu on the site:

| Function | Use cases |
|---|---|
| Marketing | `Generate leads` — "Convert visitors into contacts for your database." · `Automate marketing` — "Create campaigns with automation and AI." |
| Sales | `Build pipeline` — "Generate a pipeline of high-quality prospects." · `Close deals` — "Streamline your process and close more deals faster." |
| Customer Service | `Scale support` — "Support customers at scale with AI and a help desk." · `Drive retention` — "Identify opportunities to improve customer health." |
| Content | `Create content` · `Manage content` |
| Startups & Small Businesses | `Find and reach customers` · `Grow sales and get paid` · `Organize customer data` |
| Artificial Intelligence | `Resolve customer queries 24/7` · `Automate sales prospecting` · `Research customers faster` |

Every use case is two or three words, verb-first, with a one-sentence mechanism underneath. The AI row is the exception — `Resolve customer queries 24/7` is four words and carries a service-level claim inside a nav label.

**Knowledge base — 13 categories** `[observed]`

`Account & Setup` · `AI` · `Automation` · `Content` · `CRM` · `Data` · `Get Started` *(with an `Updated` badge)* · `Marketing` · `Partners` · `Reporting & Data` · `Revenue` · `Sales` · `Service`

Categories are **system-area named**, mirroring the product's own left-nav rather than the user's task. The `Updated` badge on `Get Started` is a small, effective freshness signal in an IA list — nothing else in the corpus does this.

Second level is a flat topic list per category (e.g. CRM → `Calling`, `Import & Export`, `Inbox`, `Object Settings`, `One-to-One Email`, `Playbooks`, `Properties`, `Records`, `Segments`, `Snippets`, `Tasks`, `Templates`), and each topic surfaces exactly **three "Top articles"** plus a `See more: <Topic>` link. Three-and-a-link is a disciplined pattern: it makes a 12-topic category page scannable in one screen while still exposing real article titles rather than category names alone.

**Footer groupings** `[observed]`: `Popular Features` · `Free Tools` · `Company` · `Customers` · `Partners`. `Customers` contains only two links (`Customer Support`, `Join a Local User Group`) — a thin grouping kept for parity.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Eyebrow: `HubSpot Agentic Customer Platform`
> Headline: `Build demand, win deals, and delight customers — all on one platform`
> Subhead: "HubSpot aligns marketing, sales, and service around your customer data, so your teams and AI always know what customers need."

The headline is a **tricolon mapped to the three Hubs** (`Build demand` = Marketing, `win deals` = Sales, `delight customers` = Service), then an em-dashed unifying clause. It never names a feature. The subhead supplies the mechanism ("around your customer data") and the payoff clause names AI as a beneficiary of the data, not as the product.

**Rotating hero statements — three short declaratives** `[observed]`

`All your customer data, right at your fingertips.` · `Marketing, sales, and service, finally on the same page.` · `AI you control. Results you can trust.`

All three end in full stops; the third is two sentences of three and four words. `AI you control. Results you can trust.` is the strongest — it names the objection (loss of control) and the doubt (unreliable output) in seven words without using the word "trustworthy."

**The problem-first section header** `[observed]`

> `Growing a business is hard. HubSpot makes it easier.`
> "Disconnected tools and data slow you down. HubSpot connects everything — and everyone — in one place to make growing a business easier than you think."

Two-sentence header where sentence one is an admission and sentence two is the claim. Compare Mailchimp's `Email & SMS marketing minus the learning curve`, which does the same negation-first move in a single line. The supporting paragraph repeats the structure (problem sentence, solution sentence).

**Closing header** `[observed]`: `Make impossible growth feel impossibly easy, with HubSpot` — the only line on the page that reaches for wordplay, and it is the weakest: "impossible … impossibly" is a chiasmus that doesn't resolve, and the trailing comma before "with HubSpot" is an unforced error.

**Other section headers** `[observed]`: `What is HubSpot?` · `Built-in AI agents that work for you 24/7.` · `Works with the tools you already use. 2,000+ integrations.` · `Remarkable results for every size business.` · `Voted #1 in 526 G2 Reports` · `TRUSTED BY 306,000+ CUSTOMERS WORLDWIDE`

Numbers are specific rather than rounded throughout: `306,000+`, `2,000+`, `526`, `129% more leads`, `36% more deals`, `37% improvement in ticket closure rates`, `over 65% of customer inquiries`. Case-study stats are given as bare numerals with a descriptive line beneath (`12` / "months for the pipeline to grow from millions to billions"; `~350` / "new fan sign-ups per week"; `59%` / "increase in members YoY"). The `~` on `~350` is an honest approximation marker most marketing pages would drop.

**Hub benefit copy — a strict two-bullet template** `[observed]`

Each Hub card carries exactly two bullets: an outcome then a mechanism.

- `Marketing Hub®` — "Attract and convert the right leads." / "Run campaigns, personalize content, and track it all."
- `Sales Hub®` — "Generate quality leads and close deals, faster." / "Automate prospecting, manage pipeline, and accelerate revenue growth."
- `Service Hub®` — "Streamline and scale support to serve customers faster." / "Drive retention with actionable insights, customer health scores, and real-time usage data."
- `Content Hub™` — "Create content that clicks with your audience." / "Build pages, publish content across channels, and stay on brand."
- `Data Hub™` — "Turn scattered data into unified intelligence." / "Combine, clean, and activate your customer data across every team and tool."
- `Revenue Hub™` — "Make it easy for customers to pay you." / "Send quotes, collect payments, and manage subscriptions."
- `Smart CRM™` — "All your customer data in one place." / "Keep your data clean, connected, and actionable."
- `Agent Hub™` — "Deploy and manage AI agents across the platform." / "Build new agents tailored to your business, powered by your data."

The second bullet is always a **three-verb list**. Eight cards, eight three-verb second bullets, no exceptions. That is the most rigorously executed copy template in this batch.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started free with HubSpot's free tools` | Global nav, hero, mid-page, footer CTA | Primary; the word "free" appears twice in one label |
| `Get a demo of HubSpot's premium software` | Global nav, hero, mid-page | Paired with the above; "premium" does the tier disambiguation |
| `Get a demo of HubSpot's software` | Mid-page, "Growing a business is hard" block | **Drops "premium" — same destination, shorter label** |
| `Get started free` | KB header | Short form |
| `Get a demo` | KB header | Short form |
| `Start free or get a demo` | Legal Center header | **A fourth variant that fuses both CTAs into one link** |
| `Log in` | Global nav | |
| `Go to my account` | KB, for signed-in users | Distinct from `Log in` — good |
| `Contact Sales` | Utility nav | |
| `Customer Support` | Utility nav | Points to help.hubspot.com, not the KB |
| `Learn more about Marketing Hub software` | Hub card | Fully specific — the good pattern |
| `Learn moreabout Customer Agent` | AI agent carousel | **Missing space; visually-hidden suffix concatenated into the visible label** |
| `Learn moreabout prospecting agent` | AI agent carousel | Same defect, and **lowercases a product name** that is `Prospecting Agent` in the adjacent heading |
| `Learn moreabout content agent` | AI agent carousel, Data Agent card | Same defect, and **names the wrong agent** — the card is Data Agent |
| `Learn more about why how HubSpot's solution is different` | Solutions nav, "Why Choose HubSpot?" | **"why how" — two interrogatives, ungrammatical** |
| `Read full case studyabout Unipart` | Case studies | Concatenation defect again |
| `See all case studies a11y text suffix` | Case studies heading link | **The literal placeholder string `a11y text suffix` shipped to production** |
| `Explore Agent Hub` | AI section | |
| `See all app integrations` | Integrations | |
| `Compare top features` | Pricing (CRM) | |
| `Try for free` | Pricing (CRM) | |
| `Contact us` | Pricing, Success Plans | |
| `Add seats` / `Remove unassigned seats` / `Remove [#] seats` | Documented in-product, seats settings | `[documented]` |
| `Transfer seat` | Documented in-product | `[documented]` |
| `Cancel this removal` | Documented in-product, confirmation banner | `[documented]` — an undo for a scheduled downgrade |
| `Set maximum` / `Don't set a maximum` / `Yes, remove maximum` | Documented in-product, marketing-contact cap dialog | `[documented]` — three-label confirm chain |
| `Complete purchase` / `Save & continue` | Documented in-product, seat checkout | `[documented]` |
| `Create from scratch` / `Clone from existing` | Documented in-product, pipeline creation dropdown | `[documented]` |
| `Subscribe to Updates` / `Resend OTP` | Status page | |
| `Skip to content` | Top of DOM | Accessibility |

**Observation.** HubSpot's *documented* in-product CTAs are markedly better than its *live marketing* CTAs. In-product: `Cancel this removal`, `Don't set a maximum`, `Yes, remove maximum`, `Create from scratch` / `Clone from existing` — all specific, all naming the object, all offering a reversal. On marketing: four variants of the signup CTA, three concatenation defects, one grammatical error, and one unreplaced placeholder (`a11y text suffix`) shipped live. The quality gradient runs the opposite way from Mailchimp's.

## T4 Onboarding & getting-started

**This is a named benchmark strength, and the documentation earns it.**

**The Get Started hub — nine guides, all task-named with a three-verb scope line** `[observed]`

| Guide | Scope line (verbatim) |
|---|---|
| `HubSpot Glossary` | "Definitions for terms used across HubSpot's tools." |
| `Set up your account` | "Create your account, invite team members, and customize your account settings." |
| `Manage your CRM database` | "Import CRM records, set up properties, and segment your data." |
| `Market your business to generate leads` | "Create landing pages and emails, set up ad campaigns, and analyze your marketing performance." |
| `Generate sales` | "Engage with leads, close deals, and report on your sales efforts." |
| `Support your customers` | "Manage support tickets, help your customers self-serve, and report on your customer service." |
| `Build your website` | "Set up domain hosting, create pages, and launch your blog." |
| `Report on performance` | "Use reports, analytics tools, and dashboards to measure your success." |
| `Automate your processes` | "Create follow-up tasks, automate email outreach, and set up workflows to make your teams more efficient." |

Every guide title is an **imperative verb phrase naming the admin's job**, and every scope line is a **comma-run of exactly three verbs**, ending with the measurement or reporting step. Seven of nine end on "analyze", "report", or "measure" — the IA teaches that a setup task is not finished until it is reportable.

Putting `HubSpot Glossary` **first in the getting-started sequence** — before "set up your account" — is the notable decision. HubSpot treats vocabulary as step zero of configuration, which is the correct read of the actual failure mode for a new CRM admin.

Two community/learning entries sit below the nine: `Join the Community` — "See examples from other HubSpot users, get advice from experts, and submit feedback to the Product team." and `Learn with HubSpot Academy` — "From short video lessons to complete certifications, learn from HubSpot Academy's professors at your own pace."

**Entitlement disclosure is built into every article header** `[observed]`

Every knowledge-base article opens with a standard block:

> `Available with any of the following subscriptions, except where noted:`

followed by icon rows naming product and tier (`Marketing Hub — Starter, Professional, Enterprise`; `Smart CRM — Professional, Enterprise`) or the catch-all `All products and plans`, plus a second row: `Additional subscriptions required for certain features`.

Inside the body, two inline callout types repeat:
- `Subscription required` — e.g. "A *Professional* or *Enterprise* subscription is required to manage lead object pipelines."
- `Permissions required` — e.g. "[Edit property settings] permissions are required to create and edit pipelines or stages."

This is the most transferable pattern in the HubSpot file. Entitlement is answered **at the top of the page and again at the point of the specific action**, using two visually distinct callouts for the two different reasons a user might be blocked (you haven't bought it / you aren't allowed). Most products conflate those into one "upgrade" message.

**Procedural step grammar** `[observed]`: numbered steps, UI targets in bold, settings paths in the form "In your HubSpot account, click the **settings icon** in the top navigation bar." Each procedure restates the full navigation path from the account root rather than assuming the reader's position — verbose, but resilient to entry from search.

**Documented fallback for a moving UI** `[observed]`, an unusually candid instruction:

> "click **More**, then navigate to **Data Management > Data Model**. If *More* doesn't appear in your account, navigate to **Data Management > Data Model** directly."

The docs acknowledge that the navigation differs between accounts and give both paths in one step. Honest, and better than a screenshot that will be wrong for half the readers.

**Before-you-start blocks** `[observed]`: a `Before you get started` section listing prerequisites and irreversibilities, e.g. for seats: "Seats must be unassigned before they can be removed." · "Seats can't be reduced below your subscription's minimum commitment." · "Removing seats doesn't change your current invoice." · "Before removing a user, reassign any records, assets, or responsibilities they own as needed."

## T5 Form & field labels

`[documented]` from knowledge-base procedures; not observed live.

**Pipeline configuration** — `Select an object` (dropdown) · `Pipelines` (tab) · `Create pipeline` (dropdown) → `Create from scratch` / `Clone from existing` · `Pipeline name` · `Pipeline to clone` · `Choose features to clone` · `Conditional stage properties` · `Pipeline rules (control editing access, require approval)` · `Pipeline automations (templated and custom)` · `Deal tags` · `Pipeline access` · `+ Add stage` · `Deal probability` · `Used in` (column) · `Conditional logic rules` (column) · `Add rule` · `Add property` · `Required` (checkbox) · `Save logic` · `Customize board and card view` · `Customize [object] tags`

Two labels worth noting. `Used in` as a column header that shows **what is blocking a delete** is a small, excellent piece of IA — the docs say "click the number to review and remove delete blocking references (e.g., records in the stage, conditional properties in use)". And `Deal probability` doubles as the Won/Lost designator: "Won and Lost are closed stages", so one field carries both a forecast weight and a terminal-state flag.

**Seats** — `Seats` (tab) · `Change seat` · `Seats` (dropdown) · `Transfer seat` · `Choose a user` · `Add seats` · `Remove unassigned seats` · `Current Subscription` (box) · `Auto-Renewal` (box)

The pairing of a `Current Subscription` box against an `Auto-Renewal` box in the seat-removal dialog is the whole disclosure: it shows what you have now and what you will have at term, side by side, for an action whose effect is deferred.

**Marketing contacts** — `Marketing Contacts` (settings page) · `Your Marketing Contacts` (section) · `Maximum Marketing Contacts` · `Set maximum` · `Current marketing contacts` · `Next update date` · `Current tier cost` · `View tier pricing` · `Your marketing contacts over time` (chart) · `Confirm`

**Account & Billing** — `Overview` · `Subscriptions` · `Transactions` · `HubSpot Credits` · `Add credits` · `Manage usage` · `Marketing Contacts` · `View Usage & Limits` · `Seats` · `Manage seats & users` · `My Products & Add-ons` · `Manage subscriptions` · `Committed Terms` · `Auto-Renewal Terms` · `View pricing` · `Cancel auto-renewal` · `Orders` → `Issued` · `View` · `Download`

**Documentation feedback widget** `[observed]` — `Was this article helpful?` → `Yes` / `No`, then three structured negative reasons, each a **label-plus-gloss pair**:

- `Unclear: it's difficult to understand`
- `Missing information: it's not comprehensive enough`
- `Irrelevant: it doesn't match what I searched for`

Plus consent: `Allow HubSpot to contact me about my documentation feedback.` and a scope disclaimer: "This form is used for documentation feedback only. Learn how to get help with HubSpot." The label-colon-gloss construction is worth stealing — it gives the user a one-word category and a one-clause test for whether it applies.

## T6 Status & state language

**This is a priority section for this product. HubSpot's state vocabulary is extensive, well documented — and internally colliding.**

### Lifecycle stages — eight, sequential, forward-only `[documented]`

The `Lifecycle stage` property, in HubSpot's stated sequential order, with HubSpot's own definitions summarised:

| Stage | Definition (summarised) |
|---|---|
| `Subscriber` | Opted in to hear more — blog or newsletter signup only |
| `Lead` | Converted on the site or interacted beyond a subscription signup |
| `Marketing Qualified Lead` | Marketing has qualified them as ready for sales |
| `Sales Qualified Lead` | Sales has qualified them as a potential customer; **contains sub-stages** |
| `Opportunity` | Associated with a deal |
| `Customer` | Has at least one closed deal |
| `Evangelist` | A customer who has advocated for your organization |
| `Other` | Does not fit any of the above |

The definitions are doing real work. `Opportunity` is defined **by association**, not by judgement ("a contact or company that is associated with a deal") and `Customer` is defined by a **countable fact** ("at least one closed deal"). Those two are objectively testable; `Marketing Qualified Lead` and `Sales Qualified Lead` are defined by *whose* judgement it is, not by criteria — which is correct, because the criteria are the customer's to set. Distinguishing "stages we can compute for you" from "stages you must define" is the single best content decision in this taxonomy, even though HubSpot never says so explicitly.

`Evangelist` and `Other` are the two that sit outside the funnel. `Other` in a sequential list is a modelling escape hatch given a user-facing name.

**The forward-only rule is the documented misconfiguration trap** `[documented]`:

> "Default automatic updates to the lifecycle stage property will only move the stage forward (e.g., no value to *Subscriber*, *Subscriber* to *Opportunity*, etc.)."
> "The default *Lifecycle stage* property can only be moved forward by HubSpot tools… You must clear the value manually or via a workflow before using these tools to set an earlier value."

And the compounding data consequence, stated plainly:

> "If you manually set a lifecycle stage to an earlier value, the legacy *Became a [lifecycle stage] date* property corresponding to the greater value will be cleared… If you clear the lifecycle stage value, the legacy *Became a [lifecycle stage] date* property value corresponding to the most recent stage will remain. The new calculated properties will not be cleared when you move a lifecycle stage backwards."

Three different clearing behaviours for three different actions, on two generations of property (`legacy` vs `new calculated`). This is why the term is the one most often misconfigured: the model is directional, the correction path is non-obvious, and the audit trail behaves differently depending on which route you took. HubSpot documents all of it accurately and none of it memorably. There is no summary table, no "what happens if I get this wrong" section, and the warning lives in a `Please note:` block below the procedure rather than above it.

### Lead Status — eight sub-stages inside one lifecycle stage `[documented]`

`New` · `Open` · `In Progress` · `Open Deal` · `Unqualified` · `Attempted to Contact` · `Connected` · `Bad Timing`

Described as "the sub-stages within a *Sales Qualified Lead* lifecycle stage." Note the grammar is not parallel: two are adjectives (`New`, `Open`), two are prepositional states (`In Progress`, `Bad Timing`), one is a noun phrase (`Open Deal`), one is a past participle (`Connected`), one is a past-tense verb phrase (`Attempted to Contact`), one is a negated adjective (`Unqualified`). Eight values, six grammatical shapes.

`Bad Timing` is the interesting one — a disposition that is neither qualified nor disqualified, naming the prospect's circumstance rather than the rep's assessment. Most CRMs force this into "Nurture" or "Closed Lost — Timing."

### Deal stages — seven defaults, each carrying a probability `[documented]`

`Appointment scheduled` (20%) · `Qualified to buy` (40%) · `Presentation scheduled` (60%) · `Decision maker bought-in` (80%) · `Contract sent` (90%) · `Closed won` (100%, Won) · `Closed lost` (0%, Lost)

Five of seven are **past-participle events that have already happened** (`scheduled`, `sent`, `bought-in`) rather than activities in progress. That is a deliberate and good choice: a stage you enter on a verifiable event is harder to fudge than a stage you enter on a feeling. `Qualified to buy` is the one judgement call, and it sits at exactly 40%.

`Decision maker bought-in` uses a hyphenated colloquialism in a system picklist — the only informal value in the set.

The docs state the arithmetic: "Stage probability is used to determine the weighted amount shown in board view, which is calculated by multiplying the total amount in each stage by the stage probability." And a hard requirement: "for deals, to ensure all sales reports, custom deal or revenue reports, and sales analytics tools process your deals correctly, you must include stages for both Won and Lost under Deal probability."

### Default stages for every other object `[documented]`

| Object | Default stages |
|---|---|
| `Tickets` | `New` · `Waiting on contact` · `Waiting on us` · `Closed` |
| `Leads` | `New` · `Attempting` · `Connected` · `Qualified` · `Disqualified` |
| `Tasks` | `Not Started` · `In Progress` · `Waiting` · `Completed` · `Deferred` |
| `Appointments` | `Scheduled` · `In Progress` · `Completed` · `Canceled` · `Rescheduled` |
| `Projects` | `Planning` · `Execution` · `Review` · `Completed` · `On Hold` · `Cancelled` |
| `Services` | `New` · `In Progress` · `Closed` |
| `Orders` | `In Progress` · `Contract Signed` |
| `Courses` | `Open Stage` · `Closed Stage` |
| `Listings` | `Open Stage` · `Closed Stage` |

The ticket pipeline is the best of these. `Waiting on contact` / `Waiting on us` splits a single "pending" state by **who owes the next action** — the most useful distinction in any support queue, and one that most helpdesks bury in an SLA field rather than surfacing as a status. Naming the agent's side `us` rather than "agent" or "support" is a small first-person warmth in an otherwise systemic vocabulary.

### The collisions — recorded as negative findings

These are the reason a new HubSpot admin misconfigures state, and they are visible entirely in the public docs:

1. **`Connected` means two different things.** It is a `Lead Status` sub-stage of a *contact's* lifecycle **and** a pipeline stage on the *Lead object*. Same word, two objects, two settings screens.
2. **`Qualified` collides with `Marketing Qualified Lead` / `Sales Qualified Lead`.** The Lead object's `Qualified` stage is not either of the contact lifecycle's qualified stages, and `Disqualified` (Lead pipeline) is not `Unqualified` (Lead Status).
3. **`New` appears in four places**: Lead Status, Lead pipeline, Ticket statuses, Services pipeline.
4. **`In Progress` appears in five places**: Lead Status, Tasks, Appointments, Services, Orders.
5. **`Canceled` (Appointments) vs `Cancelled` (Projects)** — one L versus two, in the same bulleted list, on the same page. A straightforward spelling defect in shipped picklist values.
6. **`Open Stage` / `Closed Stage`** (Courses, Listings) are the only default values that include the word "Stage" in the stage name — a placeholder that was never renamed.
7. **Stages are called statuses for one object only.** HubSpot flags this itself: "for tickets, pipeline stages are called statuses by default, but they are the same as other object stages." Self-documented, which is better than silence, but the fix would have been to pick one word.

### Calculated state properties — four per stage `[documented]`

`Date entered [stage]` · `Date exited [stage]` · `Latest time in [stage]` · `Cumulative time in [stage]`

With a documented null-behaviour that is genuinely confusing and is documented twice because of it: "When a record is currently in a stage, it will have no value for this property, unless it had previously been in that stage." So a record sitting in `Subscriber` right now has no `Latest time in Subscriber` — the property measures completed occupancies only.

### Marketing-contact and billing states `[documented]`

`marketing` vs `non-marketing` (contact status) · `contact tier` · `renewal date` · `update date` · `maximum marketing contacts` · `legacy discount` · `commitment term` · `Committed Terms` · `Auto-Renewal Terms` · `Issued` (order state)

### Status-page states `[observed]`

Components: `CRM` · `Marketing Tools` · `Website` · `Sales Tools` · `Service Tools` · `Chat & Automation` · `Reports` · `HubSpot APIs` · `Integrations` · `Mobile` · `Developer Tools`

Severity ladder: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`
Banner: `All Systems Operational`
Incident lifecycle: `Investigating` → `Monitoring` → `Resolved`
Empty day: `No incidents reported.` / `No incidents reported today.`

## T7 Error, failure & recovery

`[documented]` unless noted. HubSpot's failure content is concentrated in the docs, not in first-person symptom titles — the opposite of Mailchimp and Wise.

**Troubleshooting article titles are imperative, object-named, and sparse:**
`Review and troubleshoot record import errors` · `Troubleshoot the HubSpot tracking code` · `HubSpot videos are not playing` · `HubSpot Sales for Outlook install error: 'An error occurred attempting to install HubSpot Sales in Outlook'`

The last one is the only article in the set that **quotes the literal error string in the title**. That is the right move for an error a user will paste into search, and HubSpot does it exactly once.

**Blocking conditions are documented in advance rather than as errors** `[documented]` — the dominant pattern. Rather than writing a recovery article, HubSpot states the constraint in the procedure:

- "You can't delete a pipeline if it contains records or is used in other HubSpot tools or integrations. Before deleting, you'll need to delete or move records to another pipeline and remove references to the pipeline from other tools."
- "Seats must be unassigned before they can be removed."
- "properties with read-only values (i.e. that aren't set by users, such as score or calculation properties) cannot be used as stage properties, and will not appear as options to select."
- "Paid HubSpot subscriptions are tied to the HubSpot account where they were purchased and can't be transferred."
- "if you connect an e-commerce integration to HubSpot, a deal pipeline will be automatically added to your account that you cannot modify."

Each states the rule, then the workaround, in that order. No article needed.

**Recovery affordances named in the UI** `[documented]`:
- `Cancel this removal` — a confirmation banner offering reversal of a *scheduled* seat downgrade, with the reversal itself double-confirmed ("click **Cancel this removal**. Then, click **Cancel this removal**.")
- "reassigning a seat that is scheduled to be removed before its downgrade's effective date cancels the downgrade" — an implicit undo via a normal action.
- `Undo`-equivalent for lifecycle: clear the value, then re-set it.

**An irreversibility stated without a recovery path** `[documented]` — the sharpest piece of adverse copy on the site:

> "contact tier upgrades occur automatically and cannot be prevented once the limit is exceeded."
> "You are billed for the higher contact tier until your subscription's next renewal date, even if your marketing contact count later drops."
> "HubSpot doesn't downgrade contact tiers mid-term. Downgrades can only happen at renewal."

Three sentences, no hedging, no "unfortunately," no passive voice on the second and third. The preventive action is offered separately and prominently (`set a maximum number of marketing contacts`) rather than being buried inside the bad news. Structurally: state the irreversibility, then give the prophylactic. That ordering is correct and worth copying.

**Escalation path with a deadline** `[documented]`: "contact your HubSpot Contract Manager (Professional or Enterprise accounts only) or submit an email support ticket (Starter accounts) **at least five business days prior to your renewal date**." Names the route per tier and gives the cut-off.

## T8 Empty states

`[observed]` — status page: `No incidents reported today.` and `No incidents reported.` Flat, no decoration.

`[observed]` — KB article footer: `Related content` renders as `0 / 0` with an empty list on several articles (lifecycle stages, seats, subscription management). A counter showing `0 / 0` with no explanatory copy is a genuine empty-state miss on high-traffic pages — the component ships its pagination chrome with nothing in it.

`[documented]` — `Fallback email`: "an email that HubSpot provisions that allows you to use certain HubSpot tools, such as ticket automation, if you haven't connected a team email address yet." A named, provisioned stand-in for the not-yet-configured state, so the tool works before setup completes. That is an empty-state strategy expressed in the data model rather than in copy, and it is the more durable version.

In-product empty states are otherwise `[absent]` — behind auth.

## T9 Notifications & system messages

`[observed]` — status-page subscription options, four channels each with its own trigger scope, stated precisely:
- Email: "Get email notifications whenever HubSpot **creates**, **updates** or **resolves** an incident."
- SMS: "Get text message notifications whenever HubSpot **creates** or **resolves** an incident." — **two triggers, not three; the SMS channel deliberately omits updates**
- Webhook: "…**creates** an incident, **updates** an incident, **resolves** an incident or **changes** a component status." — four triggers, the superset
- Atom / RSS

Naming a different trigger set per channel, and bolding the verbs so the difference is scannable, is exactly right for notification-preference copy. Most products offer one list of events and one set of channels and let the user discover the gaps.

`[observed]` — incident copy, September 8 2026, `Some HubSpot tools may be unavailable for some users`:
- `Investigating` — "We are investigating an issue impacting some HubSpot tools. We will provide an update when we have more information."
- `Monitoring` — "We've addressed the issue that caused our CRM to be partially unavailable in North America since 11:46 AM EDT (UTC -04:00). We're monitoring performance closely to ensure all tools recover properly."
- `Resolved` — states the window, the region, the cause ("a server impairment"), and the resolution time, then: "HubSpot conducts a thorough review after each incident to understand the cause and prevent it from happening again."

And the closing line, which is the best sentence on the page:

> "The information on this page reflects our understanding of the incident and impact at the time of the update."

An explicit epistemic hedge appended to every incident. It tells the reader that a status update is a snapshot of belief, not a statement of fact — which is true of all status pages and is almost never said. Highly transferable to any incident-comms template.

Note also that the incident title is hedged twice (`may be unavailable`, `for some users`) while the resolved body is specific (`partially unavailable in North America`, exact timestamps with UTC offsets). Hedged at the top of the funnel, precise at the bottom.

`[documented]` — in-product notifications:
- Marketing-contact tier thresholds: billing contacts are notified "within 24 to 48 hours" at **75%, 90%, 98%, and exceeded** of the current tier. Four thresholds, the last three tightly spaced — a deliberately escalating cadence.
- Maximum-reached: "An in-app message will show that you've reached your set maximum marketing contacts," plus email to Super Admins, workflow owners, form owners, and users with Modify Billing permission. **Notifying workflow owners and form owners** — the people whose automations will silently stop creating marketing contacts — rather than only the billing admin is a genuinely thoughtful routing decision.
- Users without permission "will be prompted to request an increase to the maximum or add contacts as non-marketing" — the blocked user gets two named options, not a dead end.

## T10 Disclosures, legal & compliance

**Entitlement disclosure is the dominant compliance-adjacent pattern** (see T4). Every KB article declares which subscriptions and tiers it applies to, before the content.

**Pricing-model change disclosed with a date** `[observed]`:
> "The seats-based pricing model only applies to new accounts and subscriptions created after March 5, 2024. Accounts created prior to March 5, 2024, that haven't migrated to the new pricing model will only have access to purchased *Sales* or *Service* paid seats for Legacy ***Sales Hub*** and ***Service Hub*** Starter, Professional, and *Enterprise* accounts."

And a matching FAQ answer explaining why a user sees a price they don't recognise: "**Why am I seeing a legacy discount applied to my subscription?** … This occurs if you bought a subscription before there was a change to the current pricing model."

Two pricing-model generations, both named (`seats-based pricing`, `Flexible Seats & Credits (FSC)`), with a cut-off date and a legacy path. Writing an FAQ for "why does my bill look different from the website" is the kind of disclosure most vendors avoid.

**Trial terms stated as a negative** `[observed]`: "**Will I be charged after my trial ends?** If you're currently on a trial for a HubSpot subscription, you will not be automatically charged when the trial ends. After the trial ends, your HubSpot account returns to your previous plan, and the trial features are no longer available."

The answer leads with the reassurance, then states the consequence (feature loss). Compare Mailchimp, where the trial converts to paid by default. HubSpot's default is the safer one and the copy makes it the headline.

**Accessibility statement** `[observed]`, `legal.hubspot.com/website-accessibility`, `Last Modified: February 1, 2023`:

> "HubSpot is committed to digital inclusion principles by striving to meet or exceed the requirements for the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA Conformance (WCAG 2.1 Level AA) for its public-facing websites."

Scope, named standard and level, and an enumerated impairment list ("visual, hearing, cognitive and motor impairments"). Reporting route: "If you encounter accessibility barriers on our public-facing websites let us know by emailing website-accessibility@hubspot.com. Please be sure to specify the webpage and assistive technology (if applicable), and we will make reasonable efforts to meet your needs."

Three honest limitations worth recording. It covers **public-facing websites only** — the product itself is out of scope, which for a CRM is the part that matters. The commitment is "**striving to meet or exceed**", not conformance. And the redress promise is "**reasonable efforts**". None of that is unusual; all of it is worth noting in a corpus about what companies actually commit to. The statement is also three and a half years old at harvest, and `www.hubspot.com/web-accessibility` — the intuitive URL — returns an empty body.

**Legal Center IA** `[observed]` — organised by audience rather than by document type, which is genuinely better: `For Customers` · `For Partners` · `For Everyone`. Under `For Everyone`: `Website Terms of Use` · `Privacy Policy` · `Cookie Policy` · `Acceptable Use Policy` · `Mutual Non Disclosure Agreement`. The footer link is labelled `Legal Stuff` on the KB and `Legal Center` on marketing pages — two labels, one destination.

**Privacy and consent tooling documented as user-facing topics** `[documented]`: `Track legal basis of processing in HubSpot` · `Set default notice and consent language for data privacy-enabled forms, documents, and meetings` · `Data Privacy Resources`. And the glossary defines `Subscription type` as "the lawful basis to communicate with your contacts through email" — a GDPR concept embedded in a product primitive's definition.

## T11 Help-centre architecture

**Two help properties, two different things, one confusing pair of labels** `[observed]`:
- `knowledge.hubspot.com` — "Setup, how-to, and troubleshooting guides", labelled `Knowledge Base` in nav
- `help.hubspot.com` — labelled `Help Center` in the KB nav and `Customer Support` in the marketing nav

So the same destination has two names depending on which site you are on, and the two properties have near-synonymous names (`Knowledge Base` / `Help Center`). Only the KB was reachable unauthenticated.

**Three-level structure**: 13 categories → topics → articles. Each category page renders every topic with exactly three `Top articles` and a `See more: <Topic>` link.

**KB header offers four sibling destinations** `[observed]`, each with a scope line:
`Help Center` · `Documentation` (→ `Knowledge Base` / `Developer Documentation`) · `Training` (→ `Academy Content Library`, `Academy Certification Courses`, `Classroom Training`) · `Community` (→ seven entries) · `Blogs` (→ three entries)

The `Community` sub-menu is the notable one — seven named community destinations including `Submit Ideas` ("Search, vote for, and submit ideas to improve the HubSpot platform") and `Meet the Experts`. Routing a documentation reader to a product-feedback channel from the docs header is a deliberate loop closure.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| Imperative verb-first | `Connect an individual work email` · `Import records for multiple objects` · `Add and update HubSpot users` · `Choose your workflow actions` |
| `Understand X` | `Understand marketing contacts billing` · `Understand reply-only email logging rules` · `Understand Original and Latest traffic source properties` |
| Possessive-reference | `HubSpot's default contact properties` · `HubSpot's change sources` |
| `X \| Frequently Asked Questions` | `HubSpot billing and payment \| Frequently Asked Questions` · `Academy certifications \| Frequently Asked Questions` |

Sentence case throughout — consistently applied across every title observed, which is more discipline than Mailchimp manages.

The `Understand X` family is the conceptual-explainer genre, cleanly separated from the imperative how-to genre. Same split Mailchimp has with `About X`, but HubSpot's verb form is better: `Understand marketing contacts billing` promises the reader a changed mental state, where `About Cleaned Contacts` promises only a topic.

The pipe-suffixed `| Frequently Asked Questions` convention marks a distinct article *format* in the title, so a searcher can tell a Q&A page from a procedure before clicking.

**Routing furniture** `[observed]`: `Search the Knowledge Base` (H1) → `Highest rated articles` (8 items, two columns, no descriptions) → category grid. Leading a documentation home page with **`Highest rated`** rather than "Popular" or "Recommended" is a small honesty: it surfaces what users judged useful rather than what got the most traffic.

**Per-article furniture**: breadcrumb (`Knowledge Base > CRM > Records > <Article>`) · `Last updated: <date>` · subscription availability block · `Summary` section on longer articles · in-page `Table of contents` · `Related content` · feedback widget · tag chips (e.g. `properties CRM`, `billing`, `Getting Started`).

The `Last updated:` date on every article, with genuinely recent values (July 17 2026, September 8 2026, August 28 2026), is the strongest single trust signal in HubSpot's documentation and the sharpest contrast with the `© Mailchimp 2023` style guide and the 2023 accessibility statement.

## T12 FAQs

Two FAQ surfaces harvested. Questions verbatim, answers summarised.

**A. Subscription-management FAQs, inside a KB article** `[observed]` — `Frequently Asked Questions` as an H2 mid-article:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Can I transfer a paid HubSpot subscription to another account? | No. Subscriptions are tied to the purchasing account. |
| 2 | Who should I contact if I have billing-related questions about my account? | Email the Billing Team; links to a "which team to contact" routing article. |
| 3 | Why am I seeing a legacy discount applied to my subscription? | You bought before a pricing-model change; refers to the current pricing page. |
| 4 | How do I start a trial of any of HubSpot's tools? | Two routes: `Pricing & Features` in-app, or click the tool and `Start a free 14-day trial`; or contact your CSM. |
| 5 | Will I be charged after my trial ends? | No; account reverts to the previous plan and trial features are lost. |
| 6 | How do I cancel a trial? | Trials auto-end at 14 days; ending early reverts immediately with feature loss. |

Q1's answer is the model: a bare `No.` as its own sentence, then one sentence of reason. Six questions, and the first is a flat refusal — HubSpot leads its billing FAQ with the thing it cannot do.

Q5 and Q6 are near-duplicates (both about what happens at trial end) split by intent — "will I be charged" is the anxiety, "how do I cancel" is the task. Splitting one fact across two questions because users arrive with two different framings is defensible FAQ design, not padding.

**B. Marketing-page FAQ** `[observed]` — the CRM pricing page carries a `CRM pricing frequently asked questions` accordion. Due to an oversized page body only the meta-level content was captured for `/pricing/crm`; the question set is therefore recorded as **partially harvested**. The one verbatim string captured from that page is its meta description: "Yes, it's 100% free. Forever." — a three-sentence fragment used as the page's positioning line, with the period-separated `Forever.` doing the emphasis work.

**Placement observation.** HubSpot puts FAQs **inside the relevant documentation article** rather than only on marketing pages. The billing FAQ sits at the foot of `Manage your HubSpot subscription`, after the procedures, where a user who has just failed to find a control will actually be. That is better placement than a standalone `/faq` page and better than marketing-page-only.

## T13 Terminology & glossary

**This is a priority section for this product.**

**HubSpot publishes a glossary as step one of onboarding.** `knowledge.hubspot.com/get-started/hubspot-glossary`, ~90 terms across eight groupings: `Account & Setup` · `Automation` · `Chat` · `Commerce` · `CRM` · `Marketing tools` · `Reports` · `Sales tools` · `Service tools` · `Website`. Grouping a glossary **by product area rather than alphabetically** is the right call for a term list that a new admin reads sequentially rather than looks up.

### The data-model primitives

| Term | HubSpot's definition (summarised) | The alternative it rejected |
|---|---|---|
| `Object` | "a type of a relationship or process that your business has" | "entity", "table" |
| `Record` | "an instance of an object (e.g., 'Tom Smith' is a contact record)" | "row", "entry" |
| `Property` | "a field created to store data for an object" | **`field`** — HubSpot says `property` where Salesforce says `field` |
| `Association` | "a connection or relationship between records in the CRM" | "relationship", "lookup" |
| `Pipeline` | "a way to monitor CRM objects in different stages" | "funnel", "board" |
| `Segment` | "a collection of records based on criteria you set" | **`list`** — the glossary still links `Segment` to `create-active-or-static-lists` |
| `Saved view` | "a filter created to segment records based on their property values" | "smart list" |
| `Home page` | "a list view of the records for each object, for example, the contacts home page" | "index page" — **but the docs themselves use `index page` elsewhere** |
| `Activity` | "actions that are taken on records in the CRM" | "engagement", "task" |

`Object` defined as "a type of a relationship or process" rather than "a type of thing" is a genuinely unusual and deliberate framing — it pushes the admin toward modelling processes rather than nouns.

### Coined product and feature names

`Hub` naming, with inconsistent trademark marks `[observed]` on the homepage:
`Marketing Hub®` · `Sales Hub®` · `Service Hub®` · `Content Hub™` · `Data Hub™` · `Revenue Hub™` · `Smart CRM™` · `Agent Hub™`

Three registered, five pending. The mark is applied in the card headings and dropped everywhere else on the same page — the nav, the descriptor lines, and the CTA labels all use the bare name.

Other coinages: `Breeze` / `Breeze Assistant` (AI layer) · `Customer Agent`, `Prospecting Agent`, `Data Agent` (named agents) · `Chatflow` (bot or live chat widget) · `Snippet` · `Playbook` ("an interactive content card that you can access from your records") · `Sequence` · `Workflow` · `Enrollment triggers` / `Unenrollment triggers` · `Suppression list` · `Fallback email` · `Personalization token` · `Smart content` · `HubDB` · `Superbadge`-equivalent absent · `HubSpot score` · `Deal score` · `Data quality command center` · `Record Source` · `Original Traffic Source` · `Customer portal` · `Marketing Contacts` / `non-marketing contacts` · `HubSpot Credits` · `Flexible Seats & Credits (FSC)` · `Solutions Partner` / `Technology Partner` / `Affiliate Partner` · `AEO` (answer engine optimization) · `The Loop Marketing Playbook` · `Agentic Customer Platform`.

`Permission sets` is defined in HubSpot's glossary as "pre-defined sets of user permissions" — **the same coined term Salesforce uses for the same concept**, which is worth noting as an instance of enterprise-CRM vocabulary converging across vendors.

### Terminology drift and legacy leakage — negative findings

1. **`Breeze` vs `Agent Hub` are both live, simultaneously.** The marketing homepage Products menu lists `Agent Hub` — "Your central home for building and managing AI agents across the platform". The Legal Center's copy of the *same global nav component* lists `Breeze` — "AI agents and features that power the entire platform". Two names, two descriptors, two live pages, same day. A rename in flight, visible because the nav is not centrally sourced.
2. **`Commerce Hub` → `Revenue Hub`.** The homepage `Revenue Hub™` card is served from an image path ending `ProductIcons_CommerceHub_Icon_Orange.webp`. The KB `Commerce` glossary heading survives. The rename is complete in copy and incomplete in assets and IA.
3. **`Operations Hub` → `Data Hub`.** The `Manage seats` and `Manage subscription` articles link `Data Hub` to `https://www.hubspot.com/products/operations` — the legacy URL, with the legacy name in it, under the new label.
4. **`CJB`-style rename without disclosure.** Unlike Mailchimp, which documented its Customer Journey Builder rename in a pricing disclaimer, HubSpot's three concurrent renames are nowhere acknowledged in user-facing copy.
5. **`list` vs `segment` vs `saved view` vs `smart list`.** The glossary defines `Segment` and `Saved view`; the KB topic is `Segments`; the top article under it is `How to group records in HubSpot`, whose URL is `what-is-the-difference-between-saved-filters-smart-lists-and-static-lists` — four terms in one slug, two of which (`saved filters`, `smart lists`) are not in the glossary at all. An article titled "what is the difference between" four of your own terms is itself the evidence.
6. **`Home page` vs `index page`.** The glossary says `Home page`; the lifecycle-stages article says "Filter an index page view" and "Bulk update … from an index page." Two names for the object list, one of them colliding with the ordinary meaning of "home page."
7. **Objects can be renamed by the customer, and the docs disclaim their own vocabulary** `[observed]`: "your account may use personalized names for each object (e.g., account instead of company). This article refers to objects by their HubSpot default names." An honest and necessary caveat — and a structural admission that HubSpot's terminology is only ever the default.

### Pricing-unit vocabulary

The billable units, all `[documented]` and all distinct:

| Unit | Definition (HubSpot's, summarised) |
|---|---|
| `Marketing contact` | "contacts that you engage with through HubSpot's marketing tools each month (e.g., marketing emails, ads)" — **the billable contact** |
| `Non-marketing contact` | "contacts you don't market to and for whom you're not billed" — **the free contact** |
| `Contact tier` | "the number of marketing contacts included in your subscription… If you exceed your current tier by even one marketing contact, you'll be upgraded to the next contact tier." |
| `Seat` | "seats determine which tools a user can access based on your subscription, while permissions define the specific actions they can take" |
| `HubSpot Credits` | Consumption unit with a monthly limit, purchasable (`Add credits`) |
| `Renewal date` / `Update date` | Two different dates: renewal governs billing; **update date governs when a marketing→non-marketing change takes effect** |
| `Maximum marketing contacts` | A customer-set cap, explicitly distinct from the tier |
| `Commitment term` | Contract length governing the renewal date |

**Seven seat types** `[documented]`: `View-Only Seat` (free, unlimited) · `Core Seat` · `Sales Seat` · `Service Seat` · `Revenue Seat` · `Partner Seat` (free, for Solutions Partners) · `Developer Seat` (free, developer platform only)

The `seat` / `permission` distinction is stated as a clean two-axis model in the article's opening sentence: seats decide **which tools**, permissions decide **which actions**. Two orthogonal access concepts, named separately, explained in one sentence. That is a better job than most enterprise products manage and it is the answer to a question every new admin asks.

**The billable-unit definition is the strongest content artefact in this file.** "Marketing contact" is defined by *behaviour* ("contacts that you engage with through HubSpot's marketing tools each month"), not by record count — so the customer controls the bill by controlling who they market to, not by deleting data. HubSpot then documents the entire consequence chain: automatic tier upgrade on exceeding by one, irreversibility until renewal, the separate `maximum` cap as the preventive, four notification thresholds, a worked numeric example (998 contacts → add 5 → 1,003 → upgrade to the 2,000 tier), and a second worked example of the update-date mechanic.

The `update date` is the genuinely hard concept — setting a contact to non-marketing does not take effect until the monthly update date, which differs between monthly subscriptions (same date as renewal) and yearly (first of the month). HubSpot explains it with a continuation of the same worked example rather than a new one, which is the right teaching choice.

**The one real gap:** HubSpot never states the *price* of a contact tier in the documentation, only that a price exists and where to find it ("view the available marketing contact pricing tiers in your HubSpot account", "review the available contact tiers and their associated pricing"). Four separate links to the Product & Services catalog appear in one article. A user reading the billing documentation cannot learn what the next tier costs without logging in.

## T14 Voice, tone & accessibility

**No published content style guide, voice guide, or design-system content section was found on a public HubSpot property during this harvest.** `[absent]` for a published standard — which makes HubSpot the inverse of Mailchimp in this batch: a strong practice with no published rule set, versus a published rule set with weak practice.

**Person and tense** `[observed]`. Marketing uses second person for the reader and first-person plural sparingly. Documentation uses second person throughout and an unusual **imperative-plus-location** construction for every step ("In your HubSpot account, click…"). HubSpot as an actor appears mostly in adverse copy — "HubSpot doesn't downgrade contact tiers mid-term", "HubSpot conducts a thorough review after each incident", "HubSpot provisions" — which is the right place for a named agent.

**Register gradient by surface**, and it is steep:

| Surface | Register |
|---|---|
| Marketing homepage | Punchy, fragment-heavy, em-dash-driven, mild wordplay (`Make impossible growth feel impossibly easy`) |
| Knowledge base | Flat, procedural, sentence case, zero humour, heavy use of `Please note:` and `Subscription required` callouts |
| Billing documentation | Flattest of all; declarative statements of irreversibility with no softeners |
| Status page | Precise, timestamped, hedged at the title and specific in the body |
| Legal Center | Formal, short, single-paragraph statements |

The flattening as stakes rise is the same gradient Wise shows and Mailchimp partly loses. HubSpot's billing pages carry no exclamation marks, no reassurance filler, and no "unfortunately" — the bad news is delivered in plain declaratives.

**Sentence-case discipline in documentation is total.** Every KB article title, every section heading, every step verb. No exceptions observed across 10 KB pages. Marketing pages use title case for nav and sentence case for descriptors — also consistent. This is a product that clearly *has* a style rule for capitalisation; it just hasn't published it.

**`Please note:` as a standardised callout** `[observed]` — appears on every complex article, always bold, always introducing either a constraint or an exception. Paired with `Subscription required` and `Permissions required`, that gives HubSpot three distinct, visually differentiated interruption types with three distinct meanings. Three is the right number; most products have one grey box doing all three jobs.

### Accessibility — observed practice

**Good:**
- `Skip to content` present, first in DOM, on every page including the Legal Center.
- **`High Contrast` toggle in the global utility nav**, at the same level as the language selector. The only product in this batch to promote a visual-accommodation control to primary navigation.
- Descriptive alt text on product screenshots, and it is genuinely descriptive of *function*, not appearance: "Contacts index showing a Lifecycle stage filter applied, with the filter chip and the add filter (+) button circled." · "A workflow enrollment criteria combining two properties: 'Lifecycle stage' not being updated in the last 5 days and 'Lifecycle stage' being any of 'Sales Qualified Lead.'" · "Popup asking how many Core Seats to remove, set to 1, with the 'Remove 1 seat' button highlighted." These describe what the reader would learn, which is exactly the standard Mailchimp's guide articulates and HubSpot actually meets.
- Alt text on marketing imagery describes the depicted interaction: "Shows HubSpot's prospecting agent introducing itself to a HubSpot user, letting them know it's there to help put their prospecting efforts on auto-pilot, and giving them the option to view automations."
- Per-unit accessibility scope is correctly declared in the Website Accessibility Statement, with a named standard, a named level, and a reporting address.
- Status-page subscription flows use OTP verification rather than open-form submission — and the OTP field carries a countdown label (`Resend OTP in: 30 seconds`) plus a fallback (`Didn't receive the OTP? Resend OTP`).

**Defects, recorded honestly:**
- **Numeric asset IDs used as alt text** on the Solutions mega-menu cards: `![195309752641]`, `![195309752642]`, `![195309752643]`, `![195303448595]`, `![191228329371]`, and `![ProductIcons_AgentHub_Icon_Orange]`. A screen-reader user navigating the primary navigation hears nine-digit numbers. These are on the global nav, so the defect is present on **every page of the marketing site**.
- **`See all case studies a11y text suffix`** — an unreplaced placeholder for the visually-hidden link suffix, shipped as the literal accessible name of a live link. The bitter irony of an accessibility placeholder being the accessibility defect is worth recording as-is.
- **Concatenated visually-hidden suffixes**: `Learn moreabout Customer Agent`, `Learn moreabout prospecting agent`, `Learn moreabout content agent`, `Read full case studyabout Unipart`, `Read full case studyof Angel City FC`, `Read full case studyof Youth on Course`. The mechanism — a visible `Learn more` plus a `.sr-only` disambiguating suffix — is the *correct* technique; the space is missing and one instance names the wrong product (`content agent` on the Data Agent card). Right pattern, broken implementation, six instances.
- **`Learn more about why how HubSpot's solution is different`** — ungrammatical accessible name on a nav link, present site-wide.
- **Raw `.mp4` URLs exposed as link text** for the three hero videos, with `Play video` as the only other label.
- **`Related content` rendering as `0 / 0`** with no items and no explanatory copy on several high-traffic KB articles.
- **Accessibility statement is 3.5 years old** at harvest (`Last Modified: February 1, 2023`) and scoped to public websites only, excluding the product.
- **Internal instruction text in production asset paths**: several homepage Hub icons are served from a directory named `DO NOT USE - WBZ 2025 Rebrand- contact Teenie Rose for usage`. Recorded as observed evidence of an unfinished rebrand pipeline; the string is internal content leaked into a public URL, and a named employee appears in production markup.

**Net:** HubSpot's alt-text *writing* is among the best in this batch and its alt-text *plumbing* is among the worst. The strings a writer produced are excellent; the strings a template produced are numeric IDs, placeholders, and concatenations. That split — human-authored content good, systematically-generated content broken — is the single most useful thing this file records about HubSpot's content operation.

---

## Transferable patterns

1. **Put the glossary first in the getting-started sequence.** HubSpot orders its nine setup guides with `HubSpot Glossary` ahead of `Set up your account`. For any product with coined vocabulary that the admin must configure *with*, vocabulary is step zero, not an appendix. Directly applicable to any PayPal merchant-onboarding flow where the admin must map their own concepts onto ours.
2. **Two callout types for two reasons a user is blocked.** `Subscription required` (you haven't bought it) and `Permissions required` (you aren't allowed), visually distinct, both repeated at the point of the specific action as well as at the top of the page. Most products collapse both into one "upgrade" prompt and lose the distinction that actually determines what the user should do next.
3. **Define the billable unit by behaviour, then document the entire consequence chain.** Marketing contact = "contacts you engage with each month", then: automatic upgrade on exceeding by one, irreversibility until renewal, the separate preventive cap, four notification thresholds, and two worked numeric examples. The worked example carried forward across two sections (998 → 1,003 → tier upgrade → set 5 to non-marketing → wait for update date) teaches the mechanic better than any definition.
4. **State the irreversibility before offering the prophylactic.** "contact tier upgrades occur automatically and cannot be prevented once the limit is exceeded" comes *before* "set a maximum number of marketing contacts." Bad news first, mitigation second. The reverse ordering reads as a sales pitch for the mitigation.
5. **Split "pending" by who owes the next action.** `Waiting on contact` / `Waiting on us` in the default ticket pipeline. One of the cheapest and highest-value state distinctions available in any queue-based product; applies directly to disputes, claims, and verification holds.
6. **Append an epistemic hedge to every incident update.** "The information on this page reflects our understanding of the incident and impact at the time of the update." One sentence, reusable verbatim, and it makes every subsequent correction non-embarrassing.
7. **Give each notification channel its own trigger list, and bold the verbs.** Email gets creates/updates/resolves; SMS gets creates/resolves; webhooks get all four including component-status changes. Different channels have different interruption costs, and saying so in the subscription copy is more honest than one list of events.
8. **Notify the people whose automations will break, not just the billing admin.** When the marketing-contact cap is hit, HubSpot emails workflow owners and form owners alongside Super Admins — the people whose forms will silently stop doing what they were built to do.
9. **`Last updated:` on every documentation page, and mean it.** HubSpot's KB dates are all within two months of harvest. It is the cheapest trust signal in documentation and the clearest contrast in this batch with Mailchimp's 2023-dated style guide and HubSpot's own 2023-dated accessibility statement.
10. **Negative finding worth generalising: audit template-generated strings separately from authored ones.** HubSpot's hand-written alt text is exemplary; its template-generated accessible names include numeric asset IDs, an unreplaced `a11y text suffix` placeholder, and six missing-space concatenations. A content review that only reads the CMS fields will pass all of these.

## Caveats & gaps

- **No authenticated pass.** Every in-product string — settings labels, dialog copy, validation messages, toasts, the actual lifecycle-stage picker — is quoted from knowledge-base procedures, not observed. Marked `[documented]` throughout T5, T6, T7, and T9.
- **`/pricing/crm` only partially read.** The page body exceeded the fetch limit; only the title and meta description were captured. The main HubSpot pricing pages (`/pricing/marketing`, `/pricing/sales`, `/pricing/service`) were **not** fetched at all. Consequently this file contains **no HubSpot list prices** and no plan-tier comparison-table vocabulary. The pricing-unit analysis in T13 is built entirely from the knowledge base, which describes the units but not their cost. This is the largest single gap in the file.
- **`www.hubspot.com/web-accessibility` returned an empty body.** The statement was retrieved from `legal.hubspot.com/website-accessibility` instead. Recorded as a broken or migrated URL rather than a blocked domain.
- **`help.hubspot.com` not harvested.** The second help property (the one labelled `Help Center` / `Customer Support`) was not fetched; only `knowledge.hubspot.com` was. Support-ticket flows, contact routing, and any live-chat entry copy are unharvested.
- **`academy.hubspot.com` and `community.hubspot.com` not harvested.** HubSpot Academy is a substantial content property and is the closest HubSpot equivalent to Salesforce's Trailhead; nothing in this file speaks to its register or its pedagogy.
- **Lifecycle-stage analysis is of the defaults only.** Every stage, status, and pipeline recorded here is a HubSpot default. The docs state explicitly that customers can rename objects, customise every picklist, and create custom stages — so none of these strings is guaranteed to appear in any given account. The collisions recorded in T6 are collisions in the *shipped defaults*, which is what a new admin encounters.
- **The `Breeze` / `Agent Hub` divergence is a point-in-time observation.** Both were live on 2026-09-21 on different HubSpot properties. This may resolve within weeks and should be re-verified before being cited as a standing inconsistency.
- **No published style guide found does not prove none exists.** `hubspot.com/style-guide`, a design-system content section, and any internal Canvas/design-system documentation were not searched exhaustively. T14 records `[absent]` for *found on the public surfaces harvested*, not for *does not exist*.
- **Locale.** en-US only. The KB is localised into 17 languages and none were checked.
- **Status page is Atlassian Statuspage-hosted**, so the severity ladder (`Operational` / `Degraded Performance` / `Partial Outage` / `Major Outage` / `Maintenance`) is vendor-default. The incident *narrative* copy and the epistemic-hedge sentence are HubSpot's own.

## Sources

1. https://www.hubspot.com/
2. https://www.hubspot.com/pricing/crm
3. https://knowledge.hubspot.com/
4. https://knowledge.hubspot.com/get-started
5. https://knowledge.hubspot.com/get-started/hubspot-glossary
6. https://knowledge.hubspot.com/records/use-lifecycle-stages
7. https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines
8. https://knowledge.hubspot.com/account/understand-marketing-contacts-billing
9. https://knowledge.hubspot.com/account-management/manage-seats
10. https://knowledge.hubspot.com/account/manage-your-hubspot-subscription
11. https://knowledge.hubspot.com/crm
12. https://knowledge.hubspot.com/account-and-setup
13. https://legal.hubspot.com/website-accessibility
14. https://status.hubspot.com/
