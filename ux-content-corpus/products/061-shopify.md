# 061. Shopify

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | E-commerce platform (merchant SaaS) — hosted storefront, checkout, POS, payments and fulfilment tooling |
| Primary URL | https://www.shopify.com/ |
| Corpus rank | 061 |
| Benchmark strength (source list) | Merchant onboarding and administration |
| Locale / market observed | en-US (`www.shopify.com/` defaulting to `USA \| English`; help centre `/en`) |
| Platform observed | Web (marketing), help centre, status page, accessibility statement |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated financial institution in its own right on these surfaces. Visible regimes: **European Accessibility Act (Directive 2019/882)**, **WCAG 2.2 AA** (VPATs published per product), CCPA (`Your Privacy Choices` footer link), consumer-protection and tax compliance pushed onto the merchant ("Tax compliance is your responsibility"). Shopify Capital, Shopify Balance and Shopify Credit are named but their disclosures were not harvested. |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 reachable (3 further Polaris content URLs attempted, all redirected) |
| Harvest completeness | Partial — **the Polaris content guidelines are no longer served.** Every `polaris.shopify.com/content/*` and `polaris.shopify.com/foundations` URL 301s to `shopify.dev/docs/api/polaris`, which contains no content guidance. `legacy.polaris.shopify.com` returned empty bodies. This was the single highest-priority target for 061 and it is **blocked/retired**, not merely unfound. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://www.shopify.com/ | Hero rotator, nav IA, 3-step getting-started, footer |
| Help Center home | https://help.shopify.com/en | 18 top-level topics, each with 3 surfaced articles |
| Understanding your order statuses | https://help.shopify.com/en/manual/fulfillment/managing-orders/order-status | **Richest page in this file.** Four parallel status axes, fully tabulated |
| Managing orders | https://help.shopify.com/en/manual/fulfillment/managing-orders | Section IA, two-stage order model |
| Returns and exchanges | https://help.shopify.com/en/manual/fulfillment/managing-orders/returns | Refund / Return / Exchange definitions |
| Self-serve returns and cancellations | https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns | Buyer-facing recovery, merchant-configured |
| General checklist for starting a new Shopify store | https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/new-to-shopify-checklists/general-checklist | Onboarding gold: 7 phases, ~45 checklist items, "Considerations and limitations" blocks |
| Store notifications | https://help.shopify.com/en/manual/fulfillment/setup/notifications | Notification taxonomy |
| Setting up customer notifications | https://help.shopify.com/en/manual/fulfillment/setup/notifications/customer-notifications | **Named notification events verbatim** |
| Fulfilling orders | https://help.shopify.com/en/manual/fulfillment/fulfilling-orders | Fulfilment vocabulary |
| Contacting a Shopify store about an order | https://help.shopify.com/en/manual/fulfillment/managing-orders/contacting-shopify-store | The one consumer-register page in a merchant help centre |
| Accessibility Statement | https://www.shopify.com/accessibility | WCAG 2.2, VPAT table, alternative formats |
| Shopify Status | https://www.shopifystatus.com/ | 9 components, 5-level severity scale |
| *(attempted, redirected)* | https://polaris.shopify.com/content/voice-and-tone · /content/actionable-language · /foundations | All 301 → shopify.dev/docs/api/polaris |

---

## T1 Navigation & IA labels

**Global nav — four items, one of which is a question** `[observed]`

`Why Shopify` · `Products` · `Pricing` · `Enterprise` · `Log in` · `Start for free`

`Why Shopify` is the notable label: a nav item phrased as the objection the visitor is already holding. Its three children are all outcome sentences rather than page names:

| Label | Sub-line (verbatim) |
|---|---|
| `Get started fast` | "You could be selling by tomorrow." |
| `Switch to Shopify` | "Get more customers. Make more sales." |
| `Trusted by enterprise brands` | "No matter your size, complexity, or ambition." |

**Products mega-nav is grouped by merchant job, not by product family** `[observed]`

`Build your website` · `Sell anywhere` · `Marketing & analytics` · `Run your business` · `Get paid` · `Customize & extend Shopify`

Each group holds bare noun labels: `Website Builder` · `Themes` · `Domains` · `Customer Accounts` · `Sidekick` · `Online` · `AI Chats` · `Point of Sale` · `Shop App` · `Social & Marketplaces` · `Global` · `B2B` · `Across Markets` · `Advertising & Campaigns` · `Email & Customer Chat` · `Discounts` · `Analytics` · `Test & Launch` · `Orders & Inventory` · `Shipping` · `Finances & Funding` · `Workflow Automation` · `Checkout` · `Payments` · `Taxes`.

Note the register split: the *group headings* are verb phrases in second person ("Build your website", "Get paid"), the *items inside* are nouns. Shopify uses the verb to frame the shelf and the noun to name the object on it.

**Help Centre — 18 top-level topics, flat, noun-led** `[observed]`

`Intro to Shopify` · `Migrate to Shopify` · `Shopify admin` · `Apps` · `Your account` · `Domains` · `Online store` · `Products` · `Payments` · `Shopify checkout` · `Orders and shipping` · `Point of sale (POS)` · `Marketing and promotions` · `Sales channels` · `Reports and analytics` · `Customers` · `Taxes and duties` · `Finances` · `B2B` · `Compliance` · `Partner Directory`

This is the **inverse of the Wise pattern**. Wise names help categories as user activities and anxieties (`Where is my money?`); Shopify names them as **admin objects and admin navigation** — `Products`, `Customers`, `Domains`, `Finances`. The help IA is a mirror of the left-hand nav of the Shopify admin. That is a deliberate and defensible choice for a *tool* audience: the merchant already knows where they are in the product and wants the help tree to match. It is a poor choice for a *consumer* audience, and Shopify's one consumer page sits awkwardly inside it (see T7).

Two exceptions break the object-naming rule and both are journey-shaped: `Intro to Shopify` and `Migrate to Shopify` — the first two entries, covering the two ways a merchant arrives.

**Each help topic surfaces exactly three child articles on the index** `[observed]` — a fixed-width teaser, e.g. under `Orders and shipping`: `Setting up shipping and fulfillment` · `Managing orders` · `Fulfilling orders`. Titles are gerund-first throughout the help centre.

**Footer groupings** `[observed]`: `Shopify` · `Ecosystem` · `Resources` · `Support`. `Service Status` is a first-class footer link under `Support`, alongside `Shopify Help Center`, `Community Forum` and `Hire a Partner`.

## T2 Value proposition & headline patterns

**Hero is a rotating ambition slot, not a product claim** `[observed]`

> `Be the next` ␣ `AI all-star` / `household name` / `solo-preneur` / `category creator` / `global empire` / `store they line up for` / `big thing`
> Subhead: "Dream big and build fast on Shopify. The world's best commerce platform."

The headline's variable is **the merchant's self-image**, cycled. The noun phrases are deliberately non-parallel in register — `solo-preneur` (coinage, small) sits in the same rotation as `global empire` (grandiose) and `store they line up for` (physical, modest). The rotation therefore spans the whole addressable market in one sentence, which is how Shopify avoids picking an audience in the hero.

**Section headers are short declaratives, often verbless or fragmentary** `[observed]`

`Your brand has entered the chat` · `Sell more in more places` · `Sell on every channel` · `Sell face to face` · `Sell to 250M+ shoppers with Shop` · `Grow around the world` · `Sell across borders` · `For anyone from entrepreneurs to enterprise` · `Meet your secret weapon, Sidekick` · `Your very own commerce AI` · `What winning looks like` · `Customize everything with apps` · `Hyperdriven by AI. Commerce to the core.` · `There's no better place for you to build` · `The world's best-converting checkout` · `Rock steady. Blazing fast.` · `Shopify has your back` · `Build fast on Shopify`

Anaphora on `Sell` carries four consecutive subheads. `Rock steady. Blazing fast.` and `Hyperdriven by AI. Commerce to the core.` use the two-fragment-full-stop construction — no verb, no connective, punctuation doing the work of a conjunction.

**Claims are numbered and immediately footnoted** `[observed]`

- `Higher conversions` — `15` `%`
- `High-intent shoppers` — `250M` `+`
- Body: "Shopify Checkout with Shop Pay converts up to 50% higher than guest checkout…"
- Footnote directly beneath: "Based on external study with a Big Three global consulting firm in April, 2023."

Note the internal tension worth recording: the stat block says `15%` and the prose beneath says `up to 50% higher`. Two different conversion figures in the same section, bounded by one dated third-party footnote. This is the *claim-then-bound* pattern (cf. Wise) executed less cleanly — the bound is present but it attaches to only one of the two numbers.

**Shopify Capital block leads with the amount already lent, not the offer** `[observed]`
`$5B US loaned out so far` — "Invested in Shopify merchants" · `Loans up to $5M US` — "Amounts tailored to meet your needs" · `0% equity` — "No stakes taken—ever"

`0% equity` as a headline *feature* is a negation-as-benefit, and "No stakes taken—ever" answers the founder's real fear rather than describing the product.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start for free` | Global nav (×2), hero | The dominant acquisition CTA; price-first |
| `Log in` | Global nav | |
| `Take your shot` | End of 3-step "Build fast on Shopify" | Idiom, not a task — the *only* non-literal primary CTA on the page |
| `Pick a plan that fits` | End of customer-size section | "that fits" pre-answers the sizing anxiety raised by the section above it |
| `Explore` / `Explore 150+ updates` | Editions banner (help centre + nav) | |
| `Learn how to sell` / `Register as a seller` | (Amazon comparator — n/a here) | |
| `Build custom storefronts` · `Build for AI` · `Build apps` | Developer section | Verb + object, never bare "Learn more" |
| `Hydrogen: Shopify's headless commerce toolkit` | Dev section | Full product name used as link text |
| `Skip to Content` | First in DOM | Accessibility |
| `Contact support` | Status page footer, smallest element | Deliberately last |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `Leave feedback` | Foot of **every** help article | Consistent, unmissable, single label |
| `Report an issue with an order` · `Report an Issue with a Merchant` · `Shopify DMCA Notice and Takedown Procedure` | Consumer escalation page | Named forms, not generic "contact us" |
| `View your order` | Quoted from the order-confirmation email | `[documented]` |
| `Track order` (n/a) | — | |

**Observation.** Shopify's marketing CTAs are almost all either `Start for free` or a verb+object link; the platform reserves idiom (`Take your shot`) for the single moment after the onboarding steps, where the user has just seen how short the path is. The register is inverted from Wise: Shopify is *more* colloquial in the conversion moment, not less.

**Admin CTA vocabulary quoted inside help** `[documented]` — these are the real in-product button labels:
`More actions` · `Cancel order` · `Refund` · `Continue` · `Save` · `Edit tracking` · `Customer notifications` · `Take action` (n/a) · checkbox labels `Send a notification to the customer`, `Send shipment details to your customer now`, `Send notification email to customer`.

The three send-notification checkboxes are **three different strings for the same concept** across three flows (cancel / fulfil / edit-tracking). That is a real inconsistency worth recording — `Send a notification to the customer` vs `Send shipment details to your customer now` vs `Send notification email to customer` differ in article, possessive, channel-naming and the trailing `now`.

## T4 Onboarding & getting-started

**Marketing-page onboarding: three numbered steps, imperative, no punctuation** `[observed]`

`01` `Add your first product` · `02` `Customize your store` · `03` `Set up payments`

Three steps, each a bare imperative, each 3–4 words. Compare with the help centre's actual checklist, which has **seven phases and roughly forty-five items**. The gap between the marketing promise (3 steps) and the documented reality (45 items) is the most interesting single finding on this product, and Shopify does not attempt to reconcile them.

**Help-centre onboarding: phase names are all verb-first and store-possessive** `[observed]`

1. `Before you start`
2. `Set up your online store`
3. `Organize your online store`
4. `Test your online store`
5. `Launch your online store`
6. `Add other online sales channels`
7. `Promote your online store`

Steps 2–5 and 7 all end in `your online store`. The repetition is doing orientation work: at any point the merchant knows the object of the current phase without reading the verb twice. Each phase has a matching sub-heading `Checklist for <phase>` (e.g. `Checklist for getting started`, `Checklist for organizing your online store`).

**Every phase is preceded by a `Considerations and limitations` block** `[observed]` — this is the standout content-architecture decision. Before you are told what to do, you are told what will bite you. Examples, verbatim and short:

- "Your `myshopify.com` domain name can only be changed a single time. Choose carefully during initial setup."
- "Tax compliance is your responsibility. Shopify calculates taxes but doesn't file or remit on your behalf unless you use Shopify Tax automated filing."
- "You must be at least 18 years old to use Shopify."
- "App charges might continue after pausing or deactivating your store until you uninstall the apps."
- "Your bank makes the final decision on charge reversals. Shopify doesn't cover chargeback losses."
- "Search engine indexing isn't instant. It can take 48 to 72 hours…"

Pattern: **irreversibility, liability and latency are front-loaded per phase rather than collected in a terms page.** Several are written as *what Shopify does not do* ("doesn't file or remit", "doesn't cover chargeback losses") — the negation-first disclosure move.

**Inline AI-assist blocks with example prompts in italics** `[observed]` — labelled `Sidekick` or `Tip`, carrying a quoted user utterance:

> *"Where do I add a refund policy in Shopify, and what sections should it cover for a clothing store?"*
> *"Walk me through placing a test order and what I should confirm before I go live."*
> *"What should I double-check in my Shopify admin before I launch my store?"*

These are **modelled user questions embedded in documentation** — the docs teaching the user how to talk to the assistant. Note they are long, specific and context-loaded, i.e. the opposite of a search query. Content designers shipping an LLM surface inside a product can steal this directly.

## T5 Form & field labels

Largely behind auth. What is visible `[observed]` / `[documented]`:

- Plan-count limits stated as field constraints in prose: "The Basic plan allows no additional staff, the Grow plan allows 5, the Advanced plan allows 15, and the Shopify Plus plan allows unlimited staff."
- Product minimums: "Products require at least a title and a price."
- Tag ceiling: "You can add up to 250 tags to each product, or an unlimited number of tags on the Shopify Plus plan."
- Discount ceilings written as a sentence, not a validation string: "…a maximum of 5 product or order discount codes plus 1 shipping discount code per order, and a maximum of 25 active automatic discounts."
- Named admin fields quoted in help: `Payment due later`, `Notifications`, `Fulfillments`, `Shipping updated`.
- Status-page form furniture `[observed]`: `Subscribe to Updates`.

Marketing-page decorative form strings `[observed]`: `Buy now`, `Order for $125.00` — mock storefront chrome in the "Grow around the world" animation, repeated six times.

## T6 Status & state language — PRIORITY

This is the strongest section in the file and the most reusable artefact in the corpus for order modelling.

**Shopify does not have "an order status". It has four orthogonal status axes on one object** `[documented]`, all defined on a single page:

`Order status` · `Payment status` · `Fulfillment status` · `Return status`

The page opens by naming the design decision explicitly: "These statuses are used to create views that help you to track the progress of your orders and find orders that need work." The status system exists to generate *worklists*, not to describe the order. Every definition is written in terms of **what work remains**, not what happened.

### Axis 1 — Order status (3 values)

| Status | Definition (verbatim, short) |
|---|---|
| `Open` | "The order was placed or created. There is work to do for the order…" |
| `Archived` | "The order was manually or automatically archived." |
| `Canceled` | "The order was canceled. If a canceled order was not fully refunded, then there might be work remaining…" |

Note `Open` is defined as *work exists*, not *order active*. And `Canceled` is explicitly **not terminal** — the definition immediately re-opens the possibility of outstanding work. Most systems treat cancelled as an end state; Shopify refuses to.

### Axis 2 — Payment status (11 values)

`Pending` · `Authorized` · `Due` · `Expiring` · `Expired` · `Paid` · `Refunded` · `Partially refunded` · `Partially paid` · `Voided` · `Unpaid`

Five findings here:

1. **`Expiring` is documented as not being a status at all.** Verbatim: "Expiring isn't a payment status, but the Expiring badge is displayed two days before the deadline for capturing payment…". A *badge* that is not a *status*, documented as such, with the distinction surfaced to the user. This is exceptionally rare and exceptionally honest.
2. **`Unpaid` is a roll-up, not a state**: "Unpaid payment status includes orders that are in **Authorized**, **Pending**, **Expired**, and **Partially paid** payment status." So the vocabulary contains both atomic states and a named union of states, and says so.
3. **`Authorized` is written as an instruction to the merchant**: "It acts as your cue to capture payments before the authorization period expires." The status definition contains the call to action.
4. **`Voided` is explicitly disambiguated from `Canceled`**: "A voided payment is separate from a canceled order. An order can remain **Open** while its payment status is **Voided**." The docs pre-empt the exact conflation a merchant would make.
5. The `Partially —` prefix appears twice (`Partially refunded`, `Partially paid`) and recurs on the fulfilment axis (`Partially fulfilled`). A consistent morpheme for "some but not all".

### Axis 3 — Fulfillment status (6 values)

`Unfulfilled` · `In progress` · `On hold` · `Scheduled` · `Partially fulfilled` · `Fulfilled` · `Fulfillment not required`

- `Fulfillment not required` carries a **documented label mismatch between two surfaces**: "On the **Orders** page, the badge is displayed as **Not required**, and on the order's details page the status is displayed as **Fulfillment not required**." Shopify ships two labels for one state because of column width, and documents both. A content designer should read this as the honest version of a truncation compromise.
- `On hold` is defined partly by a system behaviour the merchant did not cause: "When upsell offers are presented to customers at checkout, the order fulfillment status is set to **On hold** temporarily." A commerce feature silently writes a fulfilment state — and the doc says so rather than letting it look like a bug.
- `Scheduled` exists only for prepaid subscriptions and auto-transitions: "…have a **Scheduled** status until the fulfillment date is reached. When the fulfillment date is reached, the order status updates to **Unfulfilled**."

### Axis 4 — Return status (4 values)

`Return requested` · `Return in progress` · `Returned` · `Inspection complete`

Preface, verbatim: "Orders can have multiple returns. This status determines the most important return task you need to do." — the status is explicitly a **priority function over a set**, not a property of the order. `Returned` is defined as "The return is complete. There is no outstanding work to be done." Work-remaining framing again.

### Delivery-status vocabulary (carrier-driven)

`[documented]`, from the notifications page — these are the states Shopify exposes to the *shopper*:

`Out for delivery` · `Delivered` · `Shipping update` (tracking changed) · `Shipping confirmation` (fulfilled)

Crucially bounded in the same paragraph: "These notifications are sent when a tracking event with the corresponding status is received from the carrier or fulfillment app. **Tracking event sources, accuracy, and timing vary by carrier.**" Shopify names the states, then immediately disclaims the fidelity of the data behind them. Local delivery is carved out: "These notifications aren't available for local delivery orders. Local delivery uses a separate delivery confirmation email…"

### The two-stage mental model

`[documented]`: "Most orders move through 2 main stages: Capturing payment for the order. Fulfilling the order to send the items to your customer." Four status axes, two narrated stages. The simplification is offered before the complexity, on a different page.

## T7 Error, failure & recovery — PRIORITY

**Shopify's recovery content is organised by merchant task, and named in the neutral gerund** `[observed]`

`Refunding orders` · `Canceling orders` · `Editing orders` · `Returns and exchanges` · `Protecting orders from fraud` · `Validating addresses in your Shopify admin` · `Shipping disruptions` · `Handling Shopify store termination` · `Marking your order as on hold` · `Handling payment disputes` (n/a) · `Appeal…` (n/a)

There is **no first-person confession title anywhere** (contrast Wise's `I sent money to the wrong person`) and **no anxious-question category** (contrast `Where is my money?`). The register is uniformly administrative. This is coherent for a B2B admin tool but it means the help IA gives the merchant no emotional landing place — every failure is framed as a procedure.

**The three recovery primitives are defined against each other** `[observed]`, from `Returns and exchanges`:

- `Refund`: "Send the full or partial payment amount back to a customer."
- `Return`: "Receive an item back from a customer, with optional return shipping labels and tracking."
- `Exchange`: "Send a customer an alternative item as part of the return, such as a different size or color."

Three one-sentence definitions, each starting with the verb naming *who moves what in which direction* (`Send` / `Receive` / `Send`). A merchant can build the whole mental model from three lines. This is the cleanest micro-glossary in the file.

**Self-serve recovery is framed as merchant relief first, buyer convenience second** `[observed]`

> "Self-serve returns and cancellations reduce the time you spend processing requests and give customers a convenient way to manage their orders on their own."

Order of clauses is deliberate: the merchant's cost saving leads. The buyer benefit is the second half of the same sentence. The whole feature is then described in merchant-control vocabulary — "You can approve or decline the request based on your policies", "control which items are eligible, how long customers have to make a request, and whether return shipping is free or paid by the customer".

Buyer-side actions named `[documented]`: request to **return** delivered items; **cancel** items that haven't shipped. The distinction is load-bearing and stated twice: "Customers can request to return items that have been delivered, or cancel items that haven't shipped yet, from the same order status page."

**Cancellation resolution has no dedicated verb** `[documented]`: "To resolve a cancellation request, you remove the requested items through the standard refund flow, or you decline the request." The doc admits that cancellation is implemented as a refund, which is the kind of implementation leak most help centres hide.

**The consumer escalation page is the register outlier** `[observed]`

`Contacting a Shopify store about an order` is the only page written for a shopper, and it opens by disclaiming responsibility:

> "When you place an order at a store that uses Shopify, you're ordering directly from that business. These businesses are responsible for their store policies, business practices, and the products that you buy."

It then does something unusual — it **teaches the shopper generic e-commerce safety** rather than routing them:

- `Find store contact information` · `Read store policies` · `Check out securely` · `Do your research`
- "To identify a secure checkout, ensure that the checkout link begins with `https://`. The `s` in `https://` indicates a secure connection."
- "Remember, if a deal seems 'too good to be true', then it probably is."

And it gates escalation on a hard, numeric threshold `[observed]`:

> "…you've already tried to contact the store directly and it's been at least **30 days** with no response or resolution, then you can use the `Report an issue with an order` form."

Three named escalation forms, differentiated by grievance type: `Report an issue with an order` · `Shopify DMCA Notice and Takedown Procedure` · `Report an Issue with a Merchant`. Note the inconsistent capitalisation across the three (`Report an issue with an order` sentence case vs `Report an Issue with a Merchant` title case) — same page, same list.

**Notification failure is handled with a blunt, unsympathetic instruction** `[observed]`

> "If your customers or your staff aren't receiving email notifications, then they need to check their spam or junk folder. If the issue persists, then they need to provide an alternate email address using a different email provider."

No apology, no "we're sorry", no investigation offer. Just two steps, the second of which asks the user to change email providers. Recorded as a negative example: this is the tone floor of the Shopify help centre.

**`Shipping disruptions`** exists as its own article `[observed]` — a named category for carrier-side failure the merchant did not cause.

## T8 Empty states

`[absent]` on the public surfaces. All admin empty states are behind auth.

One near-miss `[observed]` on the status page: `No incidents reported today.` and `No incidents reported.` — the fifteen consecutive days of clean history render as a repeated caught-up line. The variant with `today` appears once (for the current date) and the bare form for prior dates, which is a small, correct piece of date-relative copy.

## T9 Notifications & system messages

**A five-type notification taxonomy, each with a scope line** `[observed]`

| Type | Scope (verbatim, short) |
|---|---|
| `Customer email notifications` | "Automated emails for orders, shipping, and account events…" |
| `SMS notifications` | "Text message order confirmations for customers who provide phone numbers at checkout…" |
| `Staff notifications` | "Alerts for your team when orders are placed or store events occur." |
| `Exchange notifications` | "Automated emails for return and exchange workflows when customers request exchanges." |
| `Webhooks` | "Integrations with external services for custom notification workflows." |

**Named notification events — the transactional email vocabulary** `[documented]`

`Order confirmation` · `Shipping confirmation` · `Order refund` · `Order canceled` · `Shipping update` · `Out for delivery` · `Delivered`

The events are taught by **cause-and-effect sentences**, not by a list:

> "A customer places an order, and the **Order confirmation** notification is sent."
> "You fulfill an order, and the **Shipping confirmation** notification is sent."
> "You refund an order, and the **Order refund** notification is sent."

Three sentences, identical shape, subject alternating between `A customer` and `You`. The merchant learns both the trigger and their own role in it. Worth stealing for any event-driven messaging doc.

**Deactivation is documented as a first-class capability with a stated limit** `[observed]`: "Most customer notifications are sent automatically and can't be deactivated." — then a list of the six that *can* be. The boundary is stated before the exceptions.

**A capability is documented as out of the merchant's reach** `[observed]`: "Notifications sent from the Shop app for tracking updates and order statuses can't be deactivated or edited by merchants. These notifications can only be turned off through a customer's Shop app settings." Shopify tells the merchant plainly that the shopper owns this channel.

**Status-page component + severity vocabulary** `[observed]`

Components: `Admin` · `Checkout` · `Reports and Dashboards` · `Storefront` · `API & Mobile` · `Third party services` · `Support` · `Point of Sale` · `Oxygen`
Severity scale (5): `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`
Headline state: `All Systems Operational`
Footer caveat: "Some issues affecting a small percentage of stores may not be reflected here."

That last line is a genuinely good disclosure — a status page admitting its own coverage gap, adjacent to `All Systems Operational`.

## T10 Disclosures, legal & compliance

**Liability is disclaimed inside the onboarding checklist, not in a legal page** `[observed]` — see T4. The pattern is: state the task, then state who carries the risk. Examples: tax filing, chargeback losses, app charges after pause, age eligibility.

**Plan-gating is disclosed as a named block type** `[observed]`: `Plan requirement` appears as a standalone callout heading (distinct from `Note` and `Tip`) wherever a capability depends on the subscription tier. Naming the *reason* for the gate in the callout label — rather than a generic "Note" — lets the merchant triage callouts at a glance.

**Marketing footnotes are dated and attributed** `[observed]`: "Based on external study with a Big Three global consulting firm in April, 2023." — the firm is unnamed but the tier, month and year are given.

**Accessibility statement is unusually specific** `[observed]`

- Target standard stated and versioned: "Shopify uses the Web Content Accessibility Guidelines (WCAG) version 2.2 as its guiding principle."
- Named regime: "…including to our e-commerce services covered under the European Accessibility Act (Directive 2019/882)."
- Method disclosed: "automated testing software, screen readers, voice dictation, screen magnification, color contrast analyzers, keyboard-only navigation techniques, and a variety of bookmarklets."
- Users involved: "We also work with people with disabilities to complete usability tests during product creation."
- **VPATs published per product with the version tested and the standard tested** — `Admin` (Production, WCAG 2.1 A/AA) · `Checkout` (Production, WCAG 2.2 A/AA) · `Dawn Theme` (v2.4.0, WCAG 2.1 A/AA) · `Mobile Admin` (v1.0, WCAG 2.1 A/AA).
- The boundary of Shopify's control is stated: "While merchants have complete control over their theme codes, we offer developer training resources…"
- `Alternative Formats` offered on request: `Large print versions` · `Audio format` · `Electronic formats compatible with assistive technology` · **`Simplified language versions`**.

The four-row VPAT table is the transferable artefact: differing conformance levels per surface, published rather than averaged into one claim. `Simplified language versions` as an offered alternative format is rarer still.

**Terminology naming the company's own limits** `[observed]`, footer of the consumer page: "Shopify provides software and hardware used by our merchants to run their businesses. **We don't sell products directly to consumers.**"

## T11 Help-centre architecture

Three-level: **topic → section overview → article**. The section-overview pages (e.g. `Managing orders`, `Returns and exchanges`, `Fulfilling orders`) are a distinct content type worth naming: 150–250 words of prose with inline links, followed by a flat `In this section` list of every child article. The prose does the routing; the list does the completeness.

**Article-title grammar — three shapes only:**

| Shape | Examples |
|---|---|
| Gerund + object (dominant) | `Managing orders` · `Fulfilling orders` · `Refunding orders` · `Canceling orders` · `Editing orders` · `Exporting orders` · `Printing orders` · `Creating webhooks` · `Setting up customer notifications` · `Validating addresses in your Shopify admin` |
| `Understanding your …` | `Understanding your order statuses` — the only comprehension-framed title found |
| Noun phrase | `Returns and exchanges` · `Store notifications` · `Shipping disruptions` · `Self-serve returns and cancellations` |

No `How do I…?`, no `Why…?`, no first person, no question marks anywhere in the titles sampled. The help centre is written as a manual (the URL path is literally `/manual/`), not as an FAQ.

**Callout block types, named** `[observed]`: `Note` · `Tip` · `Plan requirement` · `Sidekick` · `Steps:` · `Considerations and limitations` · `In this section` · `On this page` · `Contents`.

`Steps:` introduces every numbered procedure, consistently, across articles.

**Routing furniture** `[observed]`: `Help` (home link) → `Log in` → topic grid → `Leave feedback` at the foot of every article. There is no visible "still need help / contact us" block on article pages in the server HTML; escalation lives at `help.shopify.com/en/contact`, linked only from the status page's "Having trouble? `Contact support`".

## T12 FAQs

`[absent]` as a labelled FAQ surface. Neither the marketing home page nor the help centre home carries a `Frequently asked questions` accordion in the server HTML.

The nearest equivalent `[observed]` is the sub-heading inside `Understanding your order statuses`: `What do the shipping statuses mean?` — n/a; that string is Etsy's. Shopify's equivalent construction is the `On this page` anchor list, which uses bare nouns (`Order status`, `Payment status`, `Fulfillment status`, `Return status`) rather than questions.

The **modelled Sidekick prompts** (T4) are functionally Shopify's FAQ, relocated into an AI surface. That relocation is itself a finding: the questions a merchant would ask are now authored as example prompts rather than as a Q&A block.

## T13 Terminology & glossary

| Term | Shopify's usage | The alternative it rejected |
|---|---|---|
| `merchant` | The primary user noun, defined in the accessibility statement: "business owners (whom we call 'merchants')" | "seller", "customer", "user" |
| `Shopify admin` | The back office, always in full, always lowercase `admin` | "dashboard", "backend", "control panel" |
| `fulfill` / `fulfillment` | The whole picking-packing-shipping verb, and a status axis | "ship", "dispatch" — note **`dispatched` does not exist anywhere in Shopify's vocabulary** |
| `Unfulfilled` | The default post-purchase state | "New", "Pending", "Awaiting shipment" |
| `Fulfillment not required` | State for orders with nothing to ship | "N/A", "Complete" |
| `capture` / `capture payment` | The money-taking step, distinct from `authorize` | "charge", "take payment" |
| `Voided` | Authorisation released pre-capture | "cancelled payment" |
| `draft orders` | Merchant-created orders pre-invoice | "quotes", "manual orders" |
| `Markets` | The international-selling construct | "regions", "countries", "locales" |
| `sales channels` | Every non-owned surface | "integrations", "marketplaces" |
| `Sidekick` | The in-admin AI assistant, "Your commerce-obsessed AI assistant" | "Assistant", "Copilot" |
| `Shopify Magic` | In-context generative suggestions, distinct product from Sidekick | — |
| `Shop` / `Shop app` / `Shop Pay` / `Shop Pay Installments` | A whole consumer sub-brand family | |
| `Agentic Storefronts` · `Universal Commerce Protocol` · `Commerce for Agents` | The 2026 AI-commerce coinages | |
| `Shopify Editions` | Biannual release event, "150+ updates to Shopify, twice a year" | "release notes", "changelog" (both also exist separately) |
| `Pause and Build` | A named subscription state, surfaced only in a limitation line | "paused", "dormant" |
| `As-is` (n/a) | — | |
| `Partially —` | Morpheme for incomplete states, used three times | |
| `self-serve returns` | Hyphenated, merchant-facing | "customer-initiated returns", "RMA" |

**Plan names**: `Basic` · `Grow` · `Advanced` · `Shopify Plus`. Note `Grow` is a verb used as a tier name, sitting between two adjectives — a small inconsistency in the tier ladder.

**Register split.** Marketing says `Sell anywhere`, `secret weapon`, `Take your shot`. Help says `fulfillment status`, `capture payments`, `authorization period`. The gradient is steep and deliberate: the moment the merchant is inside the tool, the vocabulary becomes precise, Latinate and unglamorous.

## T14 Voice, tone & accessibility

**Person and tense.** Marketing: second person to the merchant, imperative-heavy (`Dream big`, `Sell face to face`, `Pick a plan that fits`). Help: second person throughout, with Shopify as `we` only in the accessibility statement and the consumer-escalation page. In procedural help, the system is usually the subject in passive constructions — "the **Order confirmation** notification is sent", "the order fulfillment status is set to **On hold**". Agency is deliberately vague in the status docs and deliberately explicit in the checklist ("You must be at least 18…").

**Register.** Marketing is punchy, fragmentary, idiom-tolerant (`Rock steady. Blazing fast.`, `Hyperdriven by AI`, `secret weapon`, `Shopify has your back`, `epic product drops`). Help is flat, procedural, contraction-light. **No exclamation marks were observed on any harvested page.** No `Oops!`. No apology copy at all — including in the spam-folder instruction, where one would be conventional.

**Numbers as trust devices.** `250M+` shoppers · `21,000+ commerce apps` · `$5B US loaned out so far` · `Loans up to $5M US` · `0% equity` · `15%` higher conversions · `up to 50% higher` · `$4M+ business` · `150+ updates`. Specific, but less disciplined than Wise — the two conversion figures conflict (T2) and `250M+` recurs in three different phrasings (`Sell to 250M+ shoppers with Shop`, `250M` `+` `High-intent shoppers`, "hundreds of millions of buyers") on one page.

**Named-customer proof with the number attached** `[observed]`: "Jackie Prince launched **Guests on Earth** out of her home. Now it's a $4M+ business." · "**Our Place** grew from a one-product shop into a cookware empire." · "Iconic toymaker **Mattel** sells direct to shoppers all around the world." Three sizes, three sentences, ascending — the same audience-spanning move as the hero rotator.

**Accessibility content** `[observed]`

- `Skip to Content` present and first in DOM on marketing pages.
- Dedicated `Accessibility Statement` linked from the footer, with per-product VPATs, named standard version, named regulation, named testing methods, and `Simplified language versions` among offered alternative formats.
- A direct channel: "**Email**: accessibility@shopify.com" plus `Contact Shopify support`.
- Developer-facing accessibility training is linked and the merchant/Shopify boundary is stated.
- `Contents` skip-target present at the top of help articles.

**Negative findings, recorded honestly**

- **Three different labels for one checkbox** across three flows: `Send a notification to the customer` / `Send shipment details to your customer now` / `Send notification email to customer`.
- **Two conflicting conversion figures** in one marketing section (`15%` stat block vs "up to 50% higher" body), with one dated footnote covering both.
- **Mixed capitalisation in one list** of escalation forms: `Report an issue with an order` vs `Report an Issue with a Merchant`.
- **A documented label mismatch by design**: `Not required` (index badge) vs `Fulfillment not required` (detail page).
- The accessibility statement's `meta-description` is wrong — it describes the API terms page ("Shopify's list of terms and conditions that apply to all users that access or use the Shopify API…"). A stale meta tag on the page that most needs to be findable.
- The marketing page's alt text is overwhelmingly **empty** on the country-flag and lifestyle imagery in the "Grow around the world" block, while `Buy now` / `Order for $125.00` mock-UI text is exposed as live text six times — likely read aloud six times by a screen reader with no context.
- No `Frequently asked questions` surface anywhere.

---

## Transferable patterns

1. **Split "status" into orthogonal axes and say so.** Order / Payment / Fulfillment / Return as four independent vocabularies on one object, each defined by *work remaining* rather than by *event that happened*. Directly applicable to PayPal transaction, dispute and payout states, where one flattened status string routinely has to carry money-state and case-state simultaneously. Condition: only works if the UI can show all axes at once; a single badge forces re-flattening.
2. **Document the badge that isn't a status.** `Expiring` is disclosed as a display artefact, not a state. Any product with a derived or time-triggered badge should follow this — naming the difference in the docs costs one sentence and prevents a class of support ticket.
3. **Name the union as well as the members.** `Unpaid` is defined as the set of four other statuses. If your filters use a roll-up, give the roll-up a name and publish its membership.
4. **Front-load `Considerations and limitations` per phase.** Irreversibility, liability and latency stated *before* the instructions, phase by phase, rather than gathered into terms. The `myshopify.com can only be changed a single time` line is the model.
5. **Teach the event model in cause-and-effect sentence pairs.** "A customer places an order, and the **Order confirmation** notification is sent." Subject alternates between the user and the customer so the reader learns both trigger and role. Reusable for any webhook/notification documentation.
6. **Publish per-surface conformance, not one accessibility claim.** The four-row VPAT table with `Version tested` and `Standard tested` columns is more credible than a blanket "we meet WCAG AA", precisely because the rows differ.
7. **Define recovery primitives against each other in one sentence each**, starting with the verb that names direction of movement (`Send` / `Receive` / `Send`). The Refund/Return/Exchange trio is the tightest micro-glossary here.
8. **Negative finding worth carrying:** an admin-object help IA (`Products`, `Customers`, `Finances`) serves the tool user well and abandons the consumer completely. If one audience is a minority on your help centre, its content will read as an intrusion unless you give it a distinct entry point — Shopify's consumer page currently sits inside `Orders and shipping` with no signposting.

## Caveats & gaps

- **Polaris content guidelines are retired, not missed.** `polaris.shopify.com/content/voice-and-tone`, `/content/actionable-language`, `/content` and `/foundations` all 301 to `shopify.dev/docs/api/polaris`, which is a component-API index with no content guidance. `legacy.polaris.shopify.com/content/actionable-language` and `legacy.polaris.shopify.com/patterns/error-messages` returned empty response bodies. A web search surfaced the historic page titles and paraphrased snippets, but **no verbatim Polaris content-guideline strings were retrieved and none are quoted in this file.** Any future pass should try an archived snapshot (explicitly out of scope for this harvest) or the `polaris-react` GitHub repo.
- **All in-product UI is `[documented]`, not `[observed]`.** Status names, badges, checkbox labels and error strings come from help-article prose describing the admin. Marked as such throughout.
- **No empty states, no validation messages, no toast copy** were reachable. T8 is genuinely empty rather than thin.
- **No FAQ surface exists** on the pages harvested; T12 is `[absent]` rather than unharvested.
- **Pricing page not harvested** — `https://www.shopify.com/pricing` exceeded the fetch size limit and was not retrieved. Plan names and staff limits in this file come from help-article prose, not from the pricing page itself. Tier pricing, billing disclosures and plan-comparison copy are unharvested.
- Shopify Capital / Balance / Credit financial disclosures, Shop Pay Installments (Affirm) disclosures, and the Shop app's own help centre (`help.shop.app`) are all unharvested and would materially change T10.
- Only the `Orders and shipping` branch of the help centre was explored in depth. Seventeen other top-level topics are untouched.
- Locale is en-US throughout; the site offers 50+ country/language pairs and no comparison was made.

## Sources

1. https://www.shopify.com/
2. https://help.shopify.com/en
3. https://help.shopify.com/en/manual/fulfillment/managing-orders/order-status
4. https://help.shopify.com/en/manual/fulfillment/managing-orders
5. https://help.shopify.com/en/manual/fulfillment/managing-orders/returns
6. https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns
7. https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/new-to-shopify-checklists/general-checklist
8. https://help.shopify.com/en/manual/fulfillment/setup/notifications
9. https://help.shopify.com/en/manual/fulfillment/setup/notifications/customer-notifications
10. https://help.shopify.com/en/manual/fulfillment/fulfilling-orders
11. https://help.shopify.com/en/manual/fulfillment/managing-orders/contacting-shopify-store
12. https://www.shopify.com/accessibility
13. https://www.shopifystatus.com/
14. https://polaris.shopify.com/content/voice-and-tone *(redirected — no content)*
15. https://polaris.shopify.com/content/actionable-language *(redirected — no content)*
16. https://polaris.shopify.com/foundations *(redirected — no content)*
17. https://legacy.polaris.shopify.com/patterns/error-messages *(empty response)*
