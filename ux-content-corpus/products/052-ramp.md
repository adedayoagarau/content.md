# 052. Ramp

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Corporate cards and spend management (corporate card + AP + T&E + procurement platform) |
| Primary URL | https://ramp.com/ |
| Corpus rank | 052 |
| Benchmark strength (source list) | Spend controls and approvals |
| Locale / market observed | en-US (global card-issuing footnotes cover CA, UK, EEA) |
| Platform observed | Web (desktop marketing), custom help centre at support.ramp.com |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Not a bank.** "Ramp Business Corporation is a financial technology company and is not a bank." Bank deposit services by **First Internet Bank of Indiana, Member FDIC**. Cards issued by **Celtic Bank** (Visa Corporate), **Column N.A., Member FDIC** (Corporate, global), **Sutton Bank, Member FDIC** (Commercial), **Lead Bank, Member FDIC** (Business). Canada: **Peoples Trust Company**; balance **not insured by CDIC**; registered PSP with **Bank of Canada**. UK: **Stripe Payments UK Limited**, EMI authorised by the **FCA (FRN 900461)**. EEA: **Stripe Technology Europe Limited**, EMI authorised by the **Central Bank of Ireland (C187865)**. Investment Account: portfolios managed by **Moment Advisors, LLC**; securities via **Apex Clearing Corporation, member FINRA, SIPC**; account **not FDIC-insured, not a deposit product, may lose value**. **Ramp Payments Corporation — NMLS 2371465**; **Ramp Financing Corporation — NMLS 2431387**. SOC 2 Type II and PCI referenced. Disputes governed by the Payment Card Addendum and card-partner terms. |
| Harvest date | 2026-09-21 |
| Pages inspected | 16 |
| Harvest completeness | Full for the flagged strength (approval and spend-control vocabulary is extensively documented and captured). Partial elsewhere — `trust.ramp.com` and `/legal/*` bodies not opened; no public incident/status page was found on ramp.com. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://ramp.com/ | Hero, agentic framing, footer IA, full regulatory footer |
| Pricing | https://ramp.com/pricing | Three plans, long feature matrix (fully in server HTML), 4-question FAQ, rate disclosures |
| Approvals (product) | https://ramp.com/streamlined-approvals | Four approval propositions |
| Expense management (product) | https://ramp.com/expense-management | Policy Agent framing, 6-question FAQ |
| Security | https://ramp.com/security | Four security claims, SOC 2 / PCI |
| Help centre home | https://support.ramp.com/ | 16 top-level categories, each with a scope line |
| Help: Expense Review & Approvals | .../expense-management/expense-review-and-approvals | 10 article titles |
| Help: Pre-Spend Controls & Spend Requests | .../expense-management/pre-spend-controls-and-spend-requests | 27 article titles — the densest control vocabulary |
| Help: Policy Agent | .../expense-management/policy-agent | 10 article titles |
| Help: Cards > Controls & Limits | .../cards/controls-and-limits | 3 article titles |
| Help: Bill Pay > Manage Bills | .../bill-pay/manage-bills | 29 article titles |
| Article: Spend guidelines: Alerts and flags | .../spend-guidelines-alerts-and-flags | Flags vs Alerts distinction |
| Article: Review transactions: Personal charges, fraud, and policy issues | .../flagging-transactions-accidental-purchase-fraud-and-out-of-policy | Reject → Request changes / Request repay |
| Article: Reviewing transactions from Ramp cards | .../reviewing-transactions-from-ramp-cards | Sub-tab state names, Policy Agent recommendation vocabulary |
| Article: Spend requests and spending limit increases | .../spend-requests-and-spending-limit-increases | Request flow, rejection consequence |
| Article: Approval matrices setup and reference | .../approval-matrices-setup-and-reference | Routing model, troubleshooting table |
| Article: Managing bills and payments on Bill Pay | .../managing-bills-and-payments-on-bill-pay | Twelve bill statuses, payment lifecycle |
| Article: Automatically lock cards and funds | .../automatically-lock-cards-and-funds | Lock taxonomy, banner strings, notification ladder |
| Article: Disputes at Ramp | .../disputes-at-ramp | Dispute reasons, lifecycle, provisional credit |

---

## T1 Navigation & IA labels `[observed]`

**Global nav — four menus and two flat links**: `Products` · `Partners` · `Solutions` · `Resources` · `Customers` · `Pricing`, with `Sign in` · `See a demo` · `Get started` to the right. `Customers` (case studies) is promoted to top level alongside `Pricing`, which is a B2B-specific choice: social proof treated as navigation rather than as a section inside Resources.

**Footer is the real IA** — six groupings, with `Products` and `Platform` repeated twice in the DOM (responsive duplicates):

| Group | Notable members |
|---|---|
| (ungrouped top row) | `About us` · `Careers` · `Emerging talent` · `Customers` · `Help center` · `Product releases` · `Ramp for Agents` · `Ramp Labs` · `API documentation` · `Versus` |
| Products | `Corporate cards` · `Expense management` · `Spend management` · `Budgets` · `Banking` · `Travel` · `Reimbursements` · `Procurement` · `Accounts payable` · `Vendor management` · `Approvals` · `Security` · `Trust` · `Mobile app` · `Ramp Sheets` |
| Partners | `Accounting firms` · `Private equity` · `Venture capital` · `System integrators` · `Technology partners` · `Spend and payroll partners` · `Reseller partners` · `Franchise partners` |
| Solutions | `Startups` · `Small business` · `Mid market` · `Enterprise` |
| Platform | `Platform overview` · `Accounting automation` · `Intelligence` · `Reporting` · `Savings` · `Integrations` · `Multi-entity` · `Global` · `AI Token Spend Management` |
| Free tools and resources | 14 entries including `Charge finder`, `Per diem calculator`, `Expense policy builder`, `Mission statement generator`, `Vendor directory`, `Answers Hub` |

Two things worth recording. `Solutions` is segmented **purely by company size** (`Startups` / `Small business` / `Mid market` / `Enterprise`) — no verticals at all, the exact inverse of Mercury's industry-led Solutions menu. And `Free tools and resources` is a 14-item SEO surface sitting in the footer as a first-class group; `Mission statement generator` has no relationship to spend management and is there purely as an acquisition asset.

`Approvals` is a named product in the footer with its own page — most competitors bury approvals inside expense management. Ramp treats it as a sellable object.

**Help-centre IA is two-level, and every category carries a scope line** (https://support.ramp.com/) — 16 categories:

| Category | Scope line (verbatim) |
|---|---|
| `Get Started with Ramp` | "Explore Ramp, apply for access, and get set up" |
| `Account Settings & Security` | "Configure users, roles, bank connections, and account security & authentication" |
| `Accounting` | "Set up Ramp Accounting and code transactions" |
| `Integrations` | "Connect Ramp to accounting, identity, and workflow tools — and troubleshoot integration issues" |
| `Cards` | "Issue cards, use them day-to-day, and set controls and limits" |
| `Bill Pay` | "Set up Bill Pay and manage the bill lifecycle end-to-end" |
| `Receivables` | "Send invoices, collect on overdue balances, and apply incoming payments" |
| `Procurement` | "Set up procurement and manage requests and purchase orders" |
| `Expense Management` | "Set up expense policies, submit expenses, and view spend insights" |
| `AI Token Spend Management` | "Track and manage AI token usage and spend across providers" |
| `Reimbursements` | "Submit, approve, and process reimbursements" |
| `Travel` | "Set up travel policies and book or manage trips" |
| `Vendor Management` | "Onboard vendors, manage records, and approve changes" |
| `Business Banking` | "Set up Business Banking and manage day-to-day treasury operations" |
| `Vendor Portal` | "For vendors submitting payment or tax info to a Ramp customer" |
| `Advisor Console` | "For partner accounting firms managing client books on Ramp" |

**This is the strongest help-IA artefact in the FIN set so far.** Every scope line is an **imperative verb run in lifecycle order** — set up → operate → troubleshoot. `Integrations` ends with "and troubleshoot integration issues", so the unhappy path is named in the category description exactly as Wise does with "cancelling" and "troubleshooting". `Bill Pay` says "end-to-end", which signals completeness rather than listing verbs.

The last two categories switch from imperative to **audience declaration** — `For vendors submitting payment or tax info to a Ramp customer` and `For partner accounting firms managing client books on Ramp`. Ramp's help centre serves three distinct audiences (customer, their vendor, their accountant) and labels the non-primary two explicitly so a customer self-selects out. That is a clean solution to a multi-audience IA problem.

**Sub-category names are verb-phrases too**: `Pre-Spend Controls & Spend Requests` · `Expense Policies & Submission` · `Expense Review & Approvals` · `Policy Agent` · `Reports & Insights`. The Expense Management tree is ordered **chronologically against the money**: before spend → at submission → at review → the agent → after the fact. A user can locate themselves on the timeline.

**In-product navigation named in help bodies** `[documented]`: `Expenses & travel > Card transactions`, `Bill Pay > Payments`, `Manage Spend > Funds`, `Manage Spend > Cards`, `Policy > Travel & expenses > Additional controls`, `Settings > Matrices`, `Inbox tab`, `Request page`, `My expenses`, `Home`.

**Naming drift, recorded**: `Expenses & travel` and `Expenses & Travel` and `Expenses` all appear as the same menu across three articles. Minor, but it is the kind of inconsistency that breaks in-product search.

## T2 Value proposition & headline patterns `[observed]`

**Hero** — `Time is money. Save both.` Four words, a dead cliché, and a turn that redeems it. The subhead lists the product set and ends with a joke: "Cards, expenses, bill payments, and banking* – in the blink of AI." The asterisk on `banking` resolves to the not-a-bank disclosure; the pun sits directly on top of the disclaimer.

The same headline is reused as the closing CTA block on every page — `Time is money. Save both.` appears at the top of the homepage and at the foot of all of them. **One line doing both jobs**, which is rare and effective.

**Headlines are imperatives with an implied enemy.** The house shape is *verb the good thing / negate the bad thing*, often as a two-beat with a full stop:

- `Scale the team. Shrink the paperwork.`
- `Control spend before it happens.`
- `Eliminate manual expense reporting.`
- `Automate spend setup at scale.`
- `Make approvals a breeze.`
- `Reimagine expense management without the busywork.`
- `Catch out-of-policy spend without reviewing every line.`
- `Enforce policies without the hassle.`
- `Spot risky behaviors before they become issues.`
- `Track spend vs. plan and stay ahead of overspend`
- `Peace of mind at every step` (security)

Two constructions dominate: `without the <chore>` (busywork, hassle, reviewing every line) and `before <bad thing happens>` (before it happens, before they clear, before they become issues). **Ramp sells prevention and subtraction**, not capability.

**The enemy is named as a system, not a competitor.** `Systems that never spoke` — "This is what five separate systems to reimburse a flight looks like." And `The old way.` / `The Ramp way.` as a side-by-side comparison header. Compare Wise, which names the competitor's behaviour ("Other providers hide fees in the exchange rate"). Ramp names the *category's* dysfunction.

**Emotional-labour framing is the standout line**: "Ramp handles employee reminders, requests missing details, processes repayment, and even locks cards **so you don't have to play bad cop**." The product's value is framed as relief from an interpersonal role, not from a task. That is a genuinely unusual benefit statement for a controls product, and it is the single most transferable sentence on the Ramp site.

Also: "You had a bureaucracy. Now you have a business again." Past/present contrast, no product noun at all.

**Numbers**: `70,000` companies (used as `70,000+` and `70k+` inconsistently), `3.2x faster than the average American business`, `200+ Integrations`, `30+ currencies`, `$1M+ saved on global spend` (Notion), `industry-low fraud losses` (an unquantified claim on the security page — notable as the one number Ramp declines to give).

A live counter sits above the hero: `US corporate payments processed by Ramp: 0.8903813%` — a running percentage-of-national-volume figure to seven decimal places. Vanity metric as ambient credibility.

**Pricing headline** — `Start for free. Scale with Intelligence.` with plan tiers pre-labelled by AI posture: `AI-assisted` (Free) · `AI-powered` (Plus) · `AI-tailored` (Enterprise). The tier *descriptor* is the differentiator rather than seat count or feature volume, which is a 2026-specific pricing-content pattern worth logging.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav | |
| `Get started for free` | Every email-capture block, ~8 instances per page | Price stated in the label |
| `See a demo` | Global nav | |
| `View Demo` | Homepage, three instances | **Inconsistent casing and wording with `See a demo`** |
| `Explore interactive demo` | Expense management hero | Third label for a demo |
| `Sign in` | Global nav | |
| `Contact sales` | Enterprise plan card | |
| `Switch in days, not months` | Homepage platform block | CTA as a claim with a timeframe |
| `Read the report` / `Read their story` / `Read case study` | Social proof | Three variants |
| `Learn about Ramp Stack` / `Learn about Ramp Intelligence` / `Learn about Policy Agents` / `Learn more about Budgets` | Feature blocks | `Learn about` + named product; never bare |
| `Explore Ramp Intelligence` / `Explore reporting` | Feature blocks | `Explore` used interchangeably with `Learn about` |
| `Build a free expense policy` | Expense management | Tool CTA with price |
| `View all features` | Each pricing plan card | |
| `Compare Features` / `Compare features` | Pricing | **Two casings on one page** |
| `Spend controls` / `Real-time reporting` | Approvals page inline links | CTA text = destination page name |
| `Contact Ramp Support` | Foot of every help page | Consistent |
| `Manage Preferences` / `Your Privacy Choices` | Footer | Consent controls |

**In-product CTAs named in help bodies** `[documented]` — this is where Ramp's control vocabulary lives:

`Request spend` (described as "the yellow **Request spend** button") · `Ask Ramp` · `Request an increase` · `Request a temporary increase` · `Request increase` · `Archive request` · `Approve` · `Reject` · `Request changes` · `Request repay` · `Complete` · `Flag` · `Repay transaction` · `Repay Off-Ramp` · `Dispute transaction` · `Cancel dispute` · `Revert to previous approver` · `Remind` · `Remind Approvers and Vendors` · `Release` · `Retry Sync` · `Retry payments` · `Retry` · `Pay now` · `Unschedule` · `Mark bills as paid` · `Mark as unpaid` · `Mark as paid` · `Edit payment date` · `Cancel` · `Delete` · `Create Matrix` · `Download template` · `Upload` · `Save as new view` · `+Save as new view` · `Pause card lock` · `Pause card lock for 7 days` · `Options` · `More actions (⋯)` · `Actions`

Three observations. First, **`Reject` is a parent action with two children** (`Request changes`, `Request repay`) — Ramp refuses to ship a bare reject; the approver must state what they want to happen next. Second, `Repay Off-Ramp` is a coined escape hatch: "choose **Repay Off-Ramp** to let your company know you'll repay outside Ramp" — the system models a repayment it cannot see. Third, `Revert to previous approver` is a named single-step undo inside an approval chain, and the help text is candid that it "won't appear for every transaction."

## T4 Onboarding & getting-started

**Help centre opens with `Get Started with Ramp`** — "Explore Ramp, apply for access, and get set up", split into three sub-pages: `Overview of Ramp` · `Apply to Ramp` · `Set up with Ramp`. Explore / apply / set up is a clean three-beat, and `Apply to Ramp` is honest that access is gated by credit approval rather than open signup.

**Spend request flow, three steps** `[documented]`:

1. Sign in → click the yellow `Request spend` button in the top right
2. Choose the option that matches your need — `General expenses`, `Virtual card`, `Product or service`, `Physical card`, or Spend Programs set up by your finance team
3. Input any required details and then submit for approval

Step 2 carries a **disambiguation escape hatch written into the step itself**: "If you are unsure of where to request funds, type in your search query or question and select the `Ask Ramp` option to be guided to the right program." Ramp anticipates the exact failure of a choose-your-request-type screen (the user does not know which bucket they are in) and puts the recovery inside the step rather than in a help article. Strong pattern.

The flow ends with the state transition stated: "Requests are sent directly through the approval workflow set up by your finance team, and once approved, you'll have immediate access to the spend." `immediate access` is the payoff and it is named.

**Approval matrix setup, eight steps** `[documented]` — a genuinely complex admin flow, documented with a **preconditions section before the steps**: `Decide whether to use approval matrices`, which includes a five-row "use something simpler instead" table (see T11). Ramp tells the admin not to use the feature before telling them how.

**Onboarding for the AI reviewer is opt-in and gated**, and the docs say so: "**Early Access.** Approval matrices are opt-in and are not enabled by default. Contact your Account Manager or Customer Success Manager to have the feature enabled." Plan gating is called out inline as a blockquote: `> **Available on Ramp Plus.**` with a link to the plan overview. Every Plus-only feature article carries this banner before the instructions.

## T5 Form & field labels

**Public form is email-only** `[observed]`: placeholder `Email`, submit `Get started for free`. The homepage AI-recommendation block adds a second field — `Company website or business context` — with an inline consent line: "By continuing, you understand that Ramp uses AI to suggest content and acknowledge our Privacy Policy." Consent to AI processing stated at the field, not in a modal.

**In-product field and column labels** `[documented]`:

*Spend request*: `Additional amount` · "a reason for your approver" · `Who will be excluded?` (exclusion picker) · `What's wrong?` (dispute reason picker)

*Bill filters*: `Vendor` · `Vendor owner` · `Status` · `Amount` · `Payment type` · `Next approver` · `ERP Accounting Fields` · `Sync status` · `Entity` · `Bill Dates` (`Invoice Date`, `Due Date`, `Payment send date`, `Payment arrival date`)

*Payments filters*: `Arrival date` · `Bill due date` · `Payment date` · `Vendor` · `Status` · `Amount` · `Payment method`

*Advanced export fields*: `Bill URL` · `Invoice received date` · `Payment initiated date` · `Payment received date` · `Trace ID` · `Check number` · `Banking partner ID` · `Latest approver` · `Approvers` · `Remote ID`

Two of these are worth flagging. `Next approver` as a **filter** treats the approval chain as queryable state — you can ask "what is sitting on Dana's desk" without opening anything. And `Latest approver` vs `Approvers` are separate export columns: the chain and its current position are distinct data. Products that model approvals as a single boolean lose both.

`What's wrong?` as the dispute-reason field label is the register choice to note: a two-word question in the user's voice, sitting on top of a taxonomy of card-network reason codes.

**Multi-value display convention** `[documented]`: "if an accounting field is coded differently across multiple line items, the table view will show `MULTIPLE`" — an all-caps sentinel value for heterogeneous rows. Worth recording as a real pattern for any table that aggregates line items.

## T6 Status & state language — PRIORITY

This is Ramp's flagged strength and it is deep. Four parallel status systems, each with its own vocabulary and its own rules about who can see it.

### Bill statuses — twelve named states `[documented]`

From the bill filter (https://support.ramp.com/managing-bills-and-payments-on-bill-pay), each with its own definition:

| Status | Definition (summarised from the help body) |
|---|---|
| `Missing info` | Scanned but missing required info to proceed with bill creation |
| `Ready` | Has all required info and can proceed with bill creation |
| `Awaiting approvals` | In the approval flow |
| `Scheduled` | Approved and scheduled for payment |
| `Initiated` | Payment has been initiated |
| `Waiting for match` | Approved and waiting for a card transaction or direct debit match (Beta) |
| `Ready for payment` | Approved and selected to be paid off of Ramp |
| `Waiting for vendor` | Has open vendor details requests not yet completed |
| `Unscheduled` | Approved but no scheduled payment date set |
| `Payment failed` | Attempted payment, but the payment failed |
| `Paid` | Completed payment |
| `Archived` | Archived — "essentially deleted, but kept visible for audit purposes" |
| `Rejected` | Rejected from approvals |

**The vocabulary is built on a consistent grammar.** Three shapes: `Waiting for <blocker>` (vendor, match), `Ready for <next step>` (payment) or bare `Ready`, and past-participle terminals (`Paid`, `Rejected`, `Archived`, `Initiated`, `Scheduled`, `Unscheduled`). The `Waiting for X` construction is the one to steal — **it names the party or event the user is blocked on**, so a blocked bill is never mysterious. Compare a generic `Pending`, which tells the user nothing about who to chase.

`Unscheduled` is a negated state that exists because approval and scheduling are decoupled — an approved bill with no date is a distinct, actionable condition rather than a gap. Four of the twelve statuses (`Scheduled`, `Ready for payment`, `Waiting for match`, `Unscheduled`) are all post-approval, which is exactly where AP work actually stalls.

`Archived` carries the best gloss in the set: "essentially deleted, but kept visible for audit purposes. Bills in this state cannot be hidden or moved to a different state." It concedes the colloquial meaning ("essentially deleted") while stating the technical truth and the terminal nature — three facts in one sentence.

**Bill stage tabs** `[documented]`: `Drafts` · `For Approvals` · `For Payment` · `History` (includes Paid and Archived) · `Overview`. Tab names are **stages**; filter values are **statuses**. The two vocabularies are deliberately different granularities and the help article explains the relationship ("Click the Overview tab to view all bills section based on their status").

### Payment statuses — a separate object with its own lifecycle `[documented]`

"Once a bill is fully approved, a **payment object** is created automatically. This payment object represents the actual transfer of funds to the vendor and has its own lifecycle, status, and set of available actions — distinct from the bill itself."

Payment tab views: `Overview` · `Needs Review` · `Pending` · `History`.

Each view is defined by **the action it demands rather than the state it contains**:

- `Needs Review` — "This is your triage view. It surfaces everything that requires action before a payment can go out"
- `Pending` — "payments that are in motion ... These payments don't need immediate attention but you can monitor their progress here"

Naming a tab `Needs Review` and then calling it "your triage view" in the docs is precise: the tab is a work queue, not a filter. And `Pending` is explicitly defined as *not requiring attention* — the article pre-empts the anxiety that a Pending tab usually creates. Payment statuses named in prose: `ready for release`, `initiated`, `scheduled`, `failed`, `paid`.

`Release` as a payment action (and `ready for release` as a status) is a deliberate separation of *approved* from *sent*. Bills can be approved, scheduled, and still require a human release step — the `Payment release approvals` feature on the Plus plan.

### Transaction review states `[documented]`

`Expenses & travel > Card transactions` sub-tabs:

| Sub-tab | What it contains |
|---|---|
| `All` | Everything the user's role permits them to see |
| `Needs review` | Requires review per the approval policy; cleared, no missing items. **Pending transactions and policy-flagged transactions are excluded** |
| `Flagged` | Manually or automatically flagged as out-of-policy and not yet resolved |
| `Fully approved` | Manually or automatically approved, including previously-flagged-then-approved and flagged-for-repayment-then-repaid |
| `Declined` | Declined transactions |

`Fully approved` — the adverb is load-bearing. It distinguishes "every approver in the chain has signed" from "an approver approved", and it is the filter value used for accounting sync (`Approval status > Fully approved`). Multi-step approval needs a word for *chain complete*, and `Approved` alone does not supply it.

Other state strings `[documented]`: `Requirements completed` (all policy-required items submitted), `Auto-approved` (on a receipt: "two out of three of the heuristics on the receipt matched the transaction's heuristics"), `Changes requested` (a banner on the transaction, cleared when the employee clicks `Complete`), `Dispute in progress` (a `Charge status` filter value), `Disputed` / `Dispute` (a flag below the merchant name), `Inactive` (on a workflow — "no cards or funds currently have that policy configured"), `Sync successfully` / `Sync in progress` / `Sync failed`.

`Inactive` gets an FAQ entry of its own (`What does it mean if a workflow is "Inactive"?`) because the word invites the wrong inference — the user reads "broken", the system means "unassigned". Writing the explainer rather than renaming the state is the same move Wise makes with "complete".

An edge case documented rather than hidden: "users may receive a Ramp notification for a transaction that does not appear in the manager/admin dashboard if the transaction was authorized but then reversed by the vendor (**authorization reversal**). Such transactions result in a $0 charge, are not disputable, and will not show in transaction reports." A notification with no corresponding object — named, explained, and its three consequences listed.

### Flags vs Alerts — a deliberate two-word distinction `[documented]`

From https://support.ramp.com/spend-guidelines-alerts-and-flags:

- **`Flags` (for policy enforcement)** — out-of-policy transactions. "When a transaction gets flagged, an email will be sent to the cardholder and to their manager or admin to have a conversation and remediate."
- **`Alerts` (for visibility)** — sent to a specific person to increase visibility. Example given: a head of IT wanting to know about software purchases over $1,000.

**The parenthetical is the pattern.** Two similar-sounding words are disambiguated by stating their *purpose* in brackets, once, in the heading. A user reading `Flags (for policy enforcement)` and `Alerts (for visibility)` never needs the body.

Ramp also documents alert arithmetic honestly: "alerts are additive, and one alert rule will not override any existing rules. If you create a new rule for alerts over $6,000 for a specific software vendor, you will still get all the alerts from your initial $1,000 rule." The duplicate-notification consequence is stated before the user experiences it.

Flagged transactions land in an `"Out of Policy"` section of the transactions tab.

### Policy Agent recommendation states `[documented]`

The AI reviewer emits three badge values, each with a stated meaning:

- `Approval recommended` — "The agent determined the expense clearly complies with your policy"
- `Review recommended` — "The agent is uncertain, missing context, or your policy explicitly requires human review"
- `Rejection recommended` — "The agent identified a clear policy violation"

And three homepage groupings: `Transactions ready to approve` · `Transactions to review` · `Transactions ready to reject`.

**Two registers for one taxonomy.** The badge on the object is `<Outcome> recommended` — passive, hedged, machine-voiced. The queue heading is `Transactions ready to <verb>` — active, human-facing, action-ready. Same three states, worded for the object versus worded for the work.

`Review recommended` covers three genuinely different causes in one label (agent uncertain / missing context / policy demands a human). Collapsing "I don't know" and "you told me not to decide" into one state is a defensible simplification, and the docs name all three causes so the reviewer can tell them apart in the reasoning panel.

The authority disclaimer is explicit and typographically prominent: "**Important:** Policy Agent recommendations are **suggestions only**. As a reviewer, you always have final authority to approve, reject, or request changes regardless of what the agent recommends." For any product putting a model in an approval chain, this sentence is the template.

### Card and funds lock states `[documented]`

Four named lock causes, each with a different scope:

| Lock cause | What locks |
|---|---|
| `Missing items` | The card and/or associated **funds** |
| `Expense reviews` | The employee's **primary physical card** only |
| `Repayment requests` | Primary physical card only |
| `Change requests` | Primary physical card only |

"These locks are **independent**, so each remains until all underlying overdue requirements are resolved." The FAQ works the interaction through with a worked example: completing a repayment unlocks the physical card but leaves funds locked for missing items, and vice versa. **Documenting the combinatorics of two independent locks** is the kind of thing most products leave the user to discover at the till.

Two more lock causes appear in passing: fraud (cross-referenced to the fraud procedures article) and "routine sanctions screening" — "cards can be temporarily locked due to routine sanctions screening, independent of missing receipts, fraud, or company policy." A compliance lock the user cannot cause and cannot fix, named so they stop looking for their mistake.

### Timing language `[documented]`

Deadlines are offered as **fixed dropdown values rather than free entry**: `3, 7, 14, 30, or 60 days` for missing items; `No time limit, 7 days, 14 days, 30 days, or 60 days` for reviews and repayments; snooze durations `7 days`, `14 days`, `30 days` plus the one-click `Pause card lock for 7 days`.

Other timings: refunds "take up to **7–10 business days** to appear"; disputes "may take up to **90 days** to be resolved"; a transaction cannot be disputed "after **60 days** from when it was listed on the statement"; "most pending charges clear within **9 days**"; reimbursements "paid to employees' bank accounts in **1-2 business days**"; funds unlock "automatically within up to an hour"; card unlock is "in near-real-time"; auto-lock enforcement "runs on a daily schedule ... delay of up to 24 hours".

The asymmetry is deliberate and stated: **locking is slow and batched (up to 24h), unlocking is fast (near-real-time, up to an hour).** Ramp documents the asymmetry rather than claiming symmetry.

Grace-period arithmetic is worked as an example rather than stated as a rule: "If a purchase was made 7 days ago and the new policy has a 3-day limit, the cardholder will have 3 days to submit missing items before the funds lock." Likewise the multi-receipt lock example with dates (May 10 / May 15 / May 17 / May 20 / May 22) walks the user through re-locking. **Worked examples in place of policy prose** is a consistent Ramp documentation habit.

## T7 Error, failure & recovery — PRIORITY

### Reject is never bare `[documented]`

The central recovery pattern. An approver clicks `Reject` and must then choose:

- `Request changes` — "formerly the option to flag transactions that you need additional information on, or are out of policy". Opens a text box for the reason. The employee sees a `Changes requested` banner and must click `Complete` to route the transaction back and clear it.
- `Request repay` — routes to repayment, optionally with a note.

Both open a text box "for you to enter the reason", and `Request changes` "will start an email thread between you and the cardholder to collect this additional information. Responses will be added to the transaction in Ramp."

Three things make this good. **The rejection must carry an instruction** — the approver cannot simply refuse. **The rejection opens a conversation channel** attached to the object, so the back-and-forth lands on the transaction rather than in someone's inbox. And **the employee has an explicit close-out action** (`Complete`) that clears the banner, so the state is resolved by the person who caused it, not by the approver re-checking.

The docs also record a rename: "`Request changes`, formerly the option to flag transactions". Documenting the previous label helps long-tenured users, and is a small content-ops decision worth copying.

### Un-doing an approval, honestly scoped `[documented]`

FAQ: `Can I reverse a transaction review after approving it?` — "Ramp doesn't offer a general bulk undo or reverse flow for approved card transactions. If the transaction detail page shows **Revert to previous approver**, you can use that action to send that single transaction back one step in the approval chain. This option isn't available in bulk, and it won't appear for every transaction. If it isn't available, Ramp doesn't expose a separate reverse or undo action for that transaction."

Four sentences that say: no general undo, here is the narrow exception, here are its two limits, and here is the flat statement that nothing else exists. **The last sentence is the valuable one** — it stops the user searching. Most help centres end at "it won't appear for every transaction" and leave the user hunting for the setting.

### Irreversibility stated repeatedly and identically `[documented]`

- Archiving a bill: "This action is permanent and cannot be undone."
- Deleting draft bills in bulk: "this permanently deletes the draft bill from Ramp and cannot be undone."
- Archiving a spend request: "Archiving permanently removes the request and cancels any pending approvals. This action cannot be undone."
- FAQ: `Can I recover a deleted draft bill or unarchive an archived bill?` — "No. Both actions are permanent. Ramp does not provide an unarchive or restore option. **If you archived a bill by mistake, re-upload the original invoice to create a new bill.**"

The last one is the pattern: **a flat No, then the workaround**. The user is not left with only a refusal.

### Rejection of a spend request is terminal `[documented]`

FAQ: `What happens if my spend request is rejected?` — "If your spend request is rejected, you will need to submit a new request. Rejected spend requests for funds or spending limit increases cannot be edited or resubmitted. Review any feedback from your approver, then create a new request with the updated information."

No edit-and-resubmit path. The article says so, then gives the three-step recovery (read feedback → create new → include updated info). Also documented: "Requests that have already been approved or rejected cannot be archived" — the terminal states are closed to further action.

### Dispute recovery — a full lifecycle with gates `[documented]`

`Disputes at Ramp` opens with a section headed **`Before you dispute: check for refunds or more info`** — six checks *before* the user is allowed into the flow:

1. Check for vendor refunds (7–10 business days)
2. Look for a credit ("Refunds will appear as a new credit transaction rather than being tied to the original charge")
3. Review vendor contact or receipts
4. Check if the transaction is still pending
5. Check if the transaction occurred more than 60 days ago
6. Ask your admin for help

**Pre-empting the dispute with the refund** is the reusable move: the cheapest resolution is presented first, and the user is told what a refund will *look* like so they do not mistake its absence for a problem.

The gate is then stated as a hard requirement: "You will not be able to submit a dispute without showing evidence that you've attempted to resolve the dispute directly with the vendor before filing the dispute." Followed immediately by the incentive: "Contacting the vendor directly with your claim will always be the fastest way to resolve your dispute." Rule, then reason.

**Dispute reasons are written as first-person user statements**, not as network reason codes:

- `I suspect fraud`
- `I was charged incorrectly`
- `I didn't get what I paid for`
- `Unrecognized charge`

Under the question `What's wrong?`. This is the one place Ramp writes in the user's voice (compare Wise's `I sent money to the wrong person`), and it is correctly placed — at a moment of loss, where a taxonomy of chargeback codes would be hostile. The sub-reason example given is `I was charged incorrectly > Duplicate Charge`, so the plain-language reason funnels into a precise code without exposing it.

Availability of each reason is conditioned on transaction state and platform, and the docs spell out the matrix: on desktop, only `I suspect fraud` / `Unrecognized charge` is available while pending; `I was charged incorrectly` and `I didn't get what I paid for` require the charge to clear; on mobile, no disputes until cleared.

**Provisional credit is explained in both directions**: "In some cases, Ramp may issue a provisional credit to your account while a dispute is under review. This temporary credit offsets the disputed amount during the investigation. If the dispute is resolved in your favor, the provisional credit becomes permanent. If the dispute is not resolved in your favor, the provisional credit is reversed." Both branches stated. Then a second-order clarification: successful credits "appear as a **negative transaction** in your dashboard and should not be disputed" — pre-empting a user disputing their own refund.

And a design decision defended in the docs: "**Note:** We do not remove the original, disputed transaction, so you have full visibility of all transactions on your cards and funds." Ramp explains *why* the bad charge is still visible.

### A dedicated troubleshooting section for a missing button `[documented]`

`Troubleshooting: can't see the "Dispute Transaction" option?` — four causes with fixes (still pending / >60 days / already disputed / wrong permissions), then: "**Still not seeing the option?** Try refreshing the page or signing out and back into your Ramp account. If the issue persists, contact Ramp Support."

Writing help content for **the absence of a control** is unusual and correct. A greyed-out or missing button generates support tickets that no amount of error-message polish prevents.

### Troubleshooting tables `[documented]`

The approval-matrix article carries a three-column table: `Issue` / `Likely cause` / `What to do`, with six rows. Sample rows: `Wrong approver assigned` → "The request matched a less-specific fallback row than expected" → "Check column order and add more specific rows for the missing combination"; `Threshold routing seems wrong` → "Thresholds are being treated as minimums instead of maximums" → "Use the lowest threshold greater than or equal to the request amount".

The `Likely cause` column is doing the work most troubleshooting tables skip: it names the **user's wrong mental model**, not the system fault. "Thresholds are being treated as minimums instead of maximums" tells the admin what they believed, which is the actual bug.

### Failure states with named remedies `[documented]`

`Payment failed` has a matching action, `Retry payments` / `Retry`. `Sync failed` has `Retry Sync`. Failed repayments are split by cause: "Failed repayments caused by insufficient funds must be retried with sufficient funds ... Failed repayments due to insufficient funds count toward auto-lock because the employee can retry with sufficient funds. Failed repayments for other reasons do not count toward auto-lock." **The enforcement consequence is conditioned on whether the user could have prevented the failure.** That is a fairness rule encoded in state handling, and it is documented.

## T8 Empty states `[absent]`

No no-data, no-results, or first-run strings were reachable on public surfaces. The closest documented analogue is the `Inbox tab`, described by what it excludes ("The inbox does *not* include transactions with missing items, transactions with exemptions, or pending transactions that have not cleared") — which tells a user why their inbox is empty when work exists elsewhere, but is not an empty-state string.

## T9 Notifications & system messages

### The auto-lock notification ladder `[documented]` — five stages for missing items

| Stage | Message |
|---|---|
| When a policy is set | Email "stating that their funds will lock after X days" |
| Before locking | Email warning 1 day before (some businesses get 3 days); dashboard shows "a warning icon on cards that will be locked, along with the date the lock will occur" |
| At lock | Email "stating the funds are locked and showing their missing items" |
| At declined swipe | **SMS** "informing them that they need to submit missing items" |
| At unlock | Email confirming unlock |

**Five-stage ladder including a message at the moment of failure.** The declined-swipe SMS is the notable one: the user is standing at a till with a declined card, and the channel switches to SMS with the reason. Most products send nothing at the decline and let the cardholder guess. The diagnosis arrives at the exact second the user needs it.

Also note the notification at policy-change time (before any violation exists) and at unlock (the good news is confirmed, not left to inference).

### Banner strings — verbatim `[documented]`

Pre-lock, yellow banner on the physical card detail page:

> `Your Ramp Card may lock in X days if tasks aren't completed on time`

At lock, red banner on homepage and card detail page:

> `Complete to unlock your card:`

followed by "a list of overdue tasks with resolution links".

The pre-lock banner uses `may lock` rather than `will lock` — accurate, because resolving the tasks prevents it, and because enforcement runs on a daily batch. The at-lock banner is a **colon-terminated imperative naming the exit condition**, immediately followed by the list. Compare Mercury's `Resolve these to unlock your card`. Both products independently converged on *state the unlock condition as the heading*, which is good evidence it is the right pattern.

Snooze control on the banner: `Pause card lock for 7 days` — the duration is in the button label, so the admin does not open a dialog to find out what they are agreeing to.

### Other notifications `[documented]`

- Flagged transaction → "an email will be sent to the cardholder and to their manager or admin **to have a conversation and remediate**" — the notification's purpose is named as a conversation, not a record
- `Remind` buttons with role-differentiated scope: the manager's `Remind` nudges employees for memos and receipts; the admin's `Remind` nudges managers *and* employees. Bulk reminders available from the Inbox.
- Weekly review reminder delivered via **connected chat (Slack or Microsoft Teams), having replaced an email format** — the docs annotate the screenshot: "**Note:** The image below shows a previous email format. Current weekly reminders use connected chat."
- `Ramp Digest` — a named notification container; urgent warnings "may be included there instead" of firing separately. **Digest suppression of individual alerts, documented.**
- Confirmation email on approved limit increase
- Bulk action `Remind Approvers and Vendors` — one control nudging two different counterparty types
- Export-by-email pattern: "an email will be sent with a call-to-action to download the requested files"

Documented gap, stated by Ramp: "***Please note: Ramp does not yet support reminders for repayments since a notification is sent when it is requested.***" A missing capability, its reason, and the compensating behaviour.

## T10 Disclosures, legal & compliance — PRIORITY

### The multi-issuer footer `[observed]`

Ramp's standing footer disclosure is the most complex in this corpus sample — five card issuers across four jurisdictions, each named separately:

> "The Ramp Visa Corporate Card is issued in the U.S. by Celtic Bank, and to U.S. corporations operating globally by Column N.A., Member FDIC, and is subject to credit approval. The Ramp Visa Commercial Card is issued by Sutton Bank, Member FDIC. The Ramp Visa Business Card is issued by Lead Bank, Member FDIC."

Three differently-named card products (`Corporate`, `Commercial`, `Business`) with different issuers and different FDIC status — Celtic Bank is named **without** "Member FDIC" while Column, Sutton, and Lead all carry it. `and is subject to credit approval` is attached inline to the Corporate Card rather than deferred.

International is handled as separate paragraphs with regulator, entity, and firm reference number:

- Canada: Peoples Trust Company; "**Card Balance not insured by the Canada Deposit Insurance Corporation**"; Ramp "registered as a Payment Service Provider with the Bank of Canada"
- UK: Stripe Payments UK Limited, "an electronic money institution authorized by the Financial Conduct Authority (firm reference number: 900461)"
- EEA: Stripe Technology Europe Limited, "an electronic money institution authorized by the Central Bank of Ireland (firm reference number: C187865)"

The Canadian line is the one to note: it **states the absence of CDIC insurance explicitly**, the Canadian mirror of the not-FDIC-insured disclosure. Naming the protection that does *not* apply, per jurisdiction, is the correct construction.

NMLS numbers for two separate entities: `Ramp Payments Corporation - NMLS 2371465` (with a `Disclosures` link to state disclosures) and `Ramp Financing Corporation - NMLS 2431387`.

### The asterisk/dagger system `[observed]`

Ramp uses typographic markers rather than Mercury's named anchors:

- `*` on `banking` in the hero → "Ramp Business Corporation is a financial technology company and is not a bank. Bank deposit services provided by First Internet Bank of Indiana, Member FDIC."
- `*` on `2%` APY
- `*` on `4.52%` yield
- `†` on the Investment Account

The APY disclosure is dated to the day of the harvest: "2% Annual Percentage Yield (APY) on eligible funds in your Ramp Checking Account. **The rate is accurate as of 09/21/2026.** Interest is paid by First Internet Bank of Indiana, Member FDIC. The interest rate and APY are variable and subject to change without notice." Rate, as-of date, payer, and variability in four clauses.

### Investment-risk disclosure `[observed]` — the highest-risk copy on the site

> "Investing involves risk, including possible loss of principal. Asset allocation does not guarantee profit or protect against loss. Past performance does not guarantee future results."

Then, stated three times across the footer variants in slightly different orders:

> "The Investment Account is not insured by the FDIC, not a deposit product, and may lose value."

**Three negations in one sentence**, no hedging verbs. The variant on the pricing page reorders it ("not a deposit product, not insured by the FDIC, and may lose value") — a small inconsistency in a sentence that should be fixed boilerplate.

The `4.52%` figure carries an unusually long YTM explanation for a marketing footer: it defines yield to maturity, states the hypothetical $10M basis, lists what YTM excludes ("fees, expenses, transaction costs, leverage, defaults, and calls/prepayments"), and closes "It is hypothetical and not a guarantee or prediction of future performance. Actual returns will differ." **The metric is defined, its basis stated, its exclusions enumerated, and its predictive value denied.** For a headline rate number, that is close to best practice — though it sits in 8-point footer text beneath a large `4.52%`, which is the usual asymmetry.

Securities chain named: "Securities products and brokerage services are provided by Apex Clearing Corporation, an SEC registered broker dealer, member of FINRA & SIPC"; portfolios "managed by Moment Advisors, LLC" with a linked PDF of important information.

### Fee disclosure `[observed]`

Ramp's pricing is unusually legible: `Free` at `$0/mo/user`; `Plus` at `$15/mo/user` **plus** "+ Platform fee based on team size"; `Enterprise` `Custom`, `Annual billing`. `Save 20% with annual billing`.

The `+ Platform fee based on team size` line is the honest bit — an unquantified second fee component, disclosed on the card rather than discovered at contract. The amount is not given, which is a real gap, but the existence is.

Per-unit fees stated in the comparison matrix: `1099 filing (NEC and MISC)` — `$.65 per IRS filing. Free state filing.`, repeated identically in all three plan columns so the user cannot mistake it for a plan differentiator. Procurement is labelled `(Add-on to Plus or Enterprise)` in both the plan card and every matrix row.

`No fees, minimum deposits, or transfer caps` — three absences in one line under Treasury. `Free, same-day ACH, domestic and international wires*` carries an asterisk to a bill-payments terms link.

**The full feature comparison matrix is in server HTML** — unlike Mercury's, which is accordion-gated. Every row and every plan cell is retrievable. That is both an accessibility win and an SEO decision.

### Plan-gating disclosure inside help content `[documented]`

Plus-only features carry an inline blockquote at the top of the article: `> **Available on Ramp Plus.** See Ramp Plus overview for plan details.` and in-body notes `*Note: this is a **Plus-only** feature.*`. Enterprise-adjacent features are gated behind a human: "Contact your Account Manager or Customer Success Manager to have the feature enabled."

**Entitlement disclosed at the top of the instructions**, so a Free-plan user does not read eight steps before discovering they cannot do it. Simple, and frequently got wrong.

### Dispute terms `[observed]`

Pointer to `Payment Card Addendum` plus card-partner terms (`Celtic`, `Sutton Bank`), with the 60-day filing window and 90-day resolution window stated in the help body rather than only in the agreement.

### Compliance posture `[observed]`

Security page names `SOC 2 Type II` ("Ramp undergoes annual audits") and `PCI` ("Ramp abides by PCI security standards so sensitive credit card information is processed, transmitted, and stored securely"). A `Trust` link (trust.ramp.com) sits in the Products footer group. `Editorial Guidelines` is a footer link, which is a content-governance artefact published for a finance product.

`Sunshine Act` appears as a line item in the pricing matrix with no gloss — the US Physician Payments Sunshine Act reporting requirement, surfaced as a feature name for life-sciences customers and completely opaque to anyone else.

One unsubstantiated claim, flagged: "**Ramp has industry-low fraud losses.**" No figure, no source, no footnote, on the security page. The only claim on the site of that shape without a number attached.

## T11 Help-centre architecture `[observed]`

**Three levels**: 16 categories (each with a scope line) → 1–5 named sub-categories → article lists. Custom-built, not Zendesk — URLs are clean slugs (`support.ramp.com/disputes-at-ramp`), and every article carries a right-rail **`On this page`** table of contents generated from its headings.

The `On this page` lists are long — the disputes article has 13 entries, the auto-lock article has 22 including FAQ questions. Ramp writes **long single articles with deep internal navigation** rather than many short ones. The opposite of Mercury's approach, and it suits an admin audience reading to configure rather than to fix.

**Article-title grammar — five shapes:**

| Shape | Example |
|---|---|
| Gerund + object (task) | `Issuing a Ramp card or funds`, `Blocking or restricting merchants on Ramp` |
| Imperative + object | `Automatically lock cards and funds`, `Manually lock or terminate Ramp funds and cards`, `Archive and restore funds` |
| Noun phrase (concept) | `Decline Buffers`, `Approval matrices setup and reference`, `Disputes at Ramp` |
| `How to <verb>` | `How to adjust the auto-locked period` |
| Colon-scoped | `Review transactions: Personal charges, fraud, and policy issues`, `Spend guidelines: Alerts and flags`, `Policy Agent: Full Expense Checks` |

The colon shape is doing real work: `Review transactions:` names the task, and the three nouns after the colon are the three situations the article covers. A user scanning for "fraud" finds it in the title of a general article.

**Automatically vs Manually as a title-differentiating adverb**: `Automatically lock cards and funds` and `Manually lock or terminate Ramp funds and cards` are sibling articles distinguished by the adverb in first position. Same for `Automatically flag transactions with policy flags`. **Leading with the adverb** makes the pair scannable in a list where the nouns are identical.

**Audience banners at the top of articles** `[documented]` — and they route both ways:

> "**Note: This article primarily applies to Ramp Administrators and Managers.** Cardholders may find [Homepage FAQ] article to be more applicable."

> "**Note: This article primarily applies to Ramp Administrators.** Cardholders may find other articles in the [Expense policy and receipts] section to be more applicable."

Not just "this is for admins" — **a named alternative destination for the reader who is not.** Deflection at the top of the page, with a link.

**The "don't use this feature" table** `[documented]` — the approval-matrix article's `Decide whether to use approval matrices` section carries a five-row `Scenario` / `Use instead` table steering the admin to the simpler mechanism:

| Scenario | Use instead |
|---|---|
| A single approval threshold | Workflow condition |
| The same approver for everyone in a department | Workflow condition on department |
| Manager to manager's manager approval chains | Built-in manager chain |
| The vendor's assigned owner should always approve | Vendor Owner |
| Managers sync from your HRIS and those managers should approve | HRIS sync and manager chain |

Plus a scope disclaimer: "Approval matrices are **not** an HRIS replacement or a workflow builder." **Documenting what a feature is not, and where to go instead, at the top of its own article.** This is the strongest single piece of help-content architecture in this file.

**Routing furniture**: every page ends with `Need help? Contact Ramp Support`, linking to `How to contact Ramp's support team` rather than to a form — the user gets the channel menu, not a single channel. Support phone number in the footer of every marketing page: `Ramp Support: +1-855-206-7283`.

## T12 FAQs

### Pricing FAQ `[observed]` — four questions only, headed `FAQ`

| # | Question (verbatim) |
|---|---|
| 1 | Is there a free version of Ramp? |
| 2 | Are there any limits on how many cards I can issue? |
| 3 | Can I pay for Ramp Plus with a Ramp card? |
| 4 | How can we manage our Ramp plan? |

Strikingly short next to Mercury's fifteen — because the comparison matrix does the fee work. Q3 (`Can I pay for Ramp Plus with a Ramp card?`) is a self-referential edge case, answered with a twist: "You can pay for Ramp Plus with ACH **or the rewards you earn from your Ramp card spending**." The answer converts a limitation into a benefit. Q4 shifts to first-person plural (`our Ramp plan`) — the only `we` in the set, and it is the administrative question.

Trial terms are given inside Q1's answer rather than as a separate question: a free 30-day Plus trial, and "easily switch plans anytime as your needs change."

### Expense-management FAQ `[observed]` — six questions

| # | Question (verbatim) |
|---|---|
| 1 | How does Ramp's expense management solution help businesses save time and money? |
| 2 | Can Ramp's expense management software integrate with my accounting system? |
| 3 | How does Ramp ensure expense policy compliance? |
| 4 | What automation features does Ramp offer to simplify expense approvals? |
| 5 | Does Ramp support employee reimbursements? |
| 6 | How does Ramp help track, control, and categorize employee expenses? |

**These are SEO questions, not user questions.** Four of six contain the phrase "Ramp's expense management solution/software" or a near-variant — a buyer does not phrase a question that way. Compare the in-product help FAQs, which read as genuine ("`Can I duplicate or copy a spend request?`", "`Which card gets locked for overdue expense reviews...?`"). The register split between marketing FAQ and support FAQ is sharp and worth recording as a negative finding: the marketing block is optimised for retrieval, the help block for the person.

Answer bodies are dense and full of internal links; Q5 opens `Yes!` — the one exclamation mark on the surfaces harvested.

### In-help FAQs `[documented]` — the useful ones

Sampled verbatim across four articles:

- `What does "Requirements completed" mean?`
- `What does it mean if a workflow is "Inactive"?`
- `Can I reverse a transaction review after approving it?`
- `Can I use approval flows for live transactions?`
- `What happens if an admin approves a transaction and there were other approvers in the chain before them?`
- `What happens if I delete a user who is in an approval matrix?`
- `What happens if my spend request is rejected?`
- `What happens if my card or funds are locked for multiple types of overdue tasks?`
- `Which card gets locked for overdue expense reviews, repayment requests, or change requests?`
- `Can I recover a deleted draft bill or unarchive an archived bill?`
- `Can I mark a partial payment as paid on a bill?`
- `Who can see the Payments tab?`
- `Can I print an invoice from Bill Pay?`

**The `What happens if…` shape is the dominant one**, and it is the right shape for a permissions-and-state product: every one of them is about a *consequence the user cannot see in advance*. `What happens if I delete a user who is in an approval matrix?` is the model — a destructive admin action with a non-obvious downstream effect, answered with the effect ("The user's value is cleared from the matrix, leaving that cell empty. This means the row may no longer have an approver assigned") and a preventive instruction ("Always search your matrices for a user before deleting their account").

`Can I use approval flows for live transactions?` gets a refusal grounded in physics: "Since transactions happen in real-time, there's no way to provide live approval. The best way to control your employees' spend on cards is to use category restrictions and single transaction limits (e.g. can't spend more than $500 on any transaction)." **No, here is why the universe forbids it, here is what to do instead.**

`Can I print an invoice from Bill Pay?` is answered with a flat "Ramp does not include a print button on the invoice viewer" followed by the four-step workaround. Missing affordances documented rather than ignored.

## T13 Terminology & glossary

| Term | Ramp's usage | The alternative it rejected |
|---|---|---|
| `funds` | **The core spend primitive** — a pool with controls, distinct from the card that draws on it. "your physical card spends from funds" | "spend limit", "budget", "card limit" |
| `cards` vs `funds` | Deliberately separate objects with separate lock states. A dedicated article: `Difference between funds, virtual cards, and physical cards` | one "card" object |
| `Spend Programs` | Capitalised named container for pre-configured request types | "card templates", "policies" |
| `spend request` | The unit of pre-approval | "purchase request", "requisition" |
| `Request spend` | The CTA (verb-object, inverted from the noun) | "New request" |
| `Flags` vs `Alerts` | Enforcement vs visibility, disambiguated in the heading | using either word for both |
| `Policy Agent` | The AI expense reviewer, named as a role | "AI review", "auto-approval" |
| `policy drift` | Coined: "See exactly where overspending and **policy drift** are happening" | "non-compliance" |
| `guardrails` | "Stay compliant with built-in guardrails" | "restrictions", "limits" |
| `Decline Buffers` | Named concept with its own article | "overage allowance" |
| `Fully approved` | Chain-complete, distinct from `Approved` | |
| `Needs review` / `Needs Review` | Work-queue state — **casing differs between the transactions tab and the payments tab** | "Pending approval" |
| `Awaiting approvals` | Bill state (plural approvals) | "Pending approval" |
| `Waiting for vendor` / `Waiting for match` | Blocked-on-named-party states | "Pending" |
| `payment object` | The docs' own term for the post-approval entity | "the payment" |
| `Repay Off-Ramp` | Coined escape hatch for repayment outside the system | "Mark as repaid externally" |
| `Request changes` / `Request repay` | The two children of `Reject` | "Reject with comment" |
| `approval matrix` / `catch-all row` / `trailing blanks` / `sequential matrices` | Routing vocabulary taught to admins | "routing rules" |
| `missing items` | Umbrella for absent receipts, memos, accounting fields | "incomplete expense" |
| `auto-lock` / `snooze` / `Pause card lock` | Enforcement and its suspension | "suspend", "disable" |
| `provisional credit` | Card-network term retained and glossed in both outcomes | "temporary refund" |
| `authorization reversal` | Network term surfaced with its three consequences | suppressing it |
| `Inbox` | The unified approval queue "where all approvals for reimbursements, transactions, bills, and spend requests live" | "Approvals", "Tasks" |
| `Ramp Digest` | Named notification container | "weekly summary" |
| `Stack by Ramp` / `Ramp Intelligence` / `Ramp Labs` / `Ramp Sheets` / `Router` | Sub-brands | |
| `agents` | Used both for AI ("AP Agents", "Policy Agents", "agents handle the busywork") and for the `Ramp for Agents` surface | |

**`funds` is the term to argue about.** It is a mass noun pressed into service as a count noun ("lock the funds", "a fund's lock banner", "Manage Spend > Funds"), which reads awkwardly and collides with the everyday sense of "money in the account". Ramp needs a separate object because a physical card and its spending pool have independent lock states — but the chosen word makes sentences like "Funds unlock automatically within up to an hour" ambiguous on first read. The existence of an article titled `Difference between funds, virtual cards, and physical cards` is evidence the distinction does not land on its own.

**The `Needs review` / `Needs Review` casing split** across two surfaces of the same product is a genuine defect.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the reader, first-person plural for Ramp ("we make it easy", "we will decide whether to file the dispute", "We'll keep you informed every step of the way", "Ramp doesn't offer a general bulk undo"). Notably, **Ramp frequently uses its own name as the grammatical subject in help content** — "Ramp relaxes columns from right to left", "Ramp validates the file and flags errors", "Ramp rejects rows with middle blanks". This third-person system-as-actor voice is precise for describing algorithmic behaviour and is used consistently where the system, rather than the company, is doing something.

**Register gradient**, steepest at the marketing/help boundary:

- *Marketing*: aphoristic, punning, combative — `Time is money. Save both.`, `in the blink of AI`, `We've got the receipts.`, `so you don't have to play bad cop`, `You had a bureaucracy. Now you have a business again.`
- *Help*: flat, procedural, numerate, heavily cross-linked; worked examples with real dates and amounts
- *Disclosure*: dense, unhedged, three-negation sentences

`We've got the receipts.` as a testimonials section heading is a double pun (evidence / expense receipts) on a page about receipt capture. Good, and rationed — the help centre contains no jokes at all.

**Reading level in help content is high** and assumes an admin: "Ramp relaxes columns from right to left: first the rightmost column, then the two rightmost columns, and so on until it finds a match. This means column order matters. Leftmost columns are most important because Ramp relaxes them last." That is a correct, compact explanation of a non-obvious matching algorithm, and it is followed immediately by a worked four-row table and a traced example. **Explain the rule, show the table, trace one case** is Ramp's house pattern for anything algorithmic.

**Typographic emphasis is heavy and slightly undisciplined.** Bold is used for UI labels (correct), for warnings (correct), and for arbitrary emphasis (`***Please note: at this time you can only cancel a dispute in progress via web.***` — bold *and* italic *and* three asterisks). One sentence in the disputes article has broken spacing from mangled emphasis markup: "Ramp Customer Support**must terminate your card to prevent future fraudulent activity if our team considers the transaction**fraudulent." The words run together on the page. A real rendering defect in the highest-anxiety article on the site.

**`Please note` appears at least six times** across the harvested articles, often bolded, sometimes italicised, sometimes both. It is a filler phrase that adds no information; its density is a house-style problem.

**Numbers and examples.** Help content uses concrete placeholder data throughout — `$2.47`, `$59.99`, `$7,500`, `$30,000`, `May 10`, `May 15`, `Engineering, London, Accounts Payable`, `Team Lead ($5,000), VP Engineering ($25,000), and CTO (unlimited)`. Named fictional people (`Jan`, `Kevin`, `Elizabeth`, `David Wallace`, `Arletta Cheryl Morris`). This makes abstract routing rules followable.

**Accessibility content** `[observed]`

- **No `Skip to content` link observed** in the extracted markup on either the marketing site or the help centre. `[absent]` — this is a notable omission on both surfaces, and contrasts with Mercury, which ships one on its help centre.
- **No accessibility statement or VPAT found.** Looked in the footer, the Trust group, and the legal links. `[absent]`
- Help-centre screenshot alt text is **descriptive and task-relevant**, which is unusually good for support content:
  - "Transaction overview showing details for a $2.47 charge, including user, merchant, category, and policy information."
  - "Flag transaction section at Jackpocket with fields for issue description and repayment request option."
  - "Additional settings allow auto-locking of cards with missing items after a selected timeframe, showing options from 3 to 6..." (**truncated mid-sentence** — the alt text is cut off)
  - "Historical email notification from Ramp highlighting 18 transactions needing review"
  - "Bill Pay Drafts tab with Save as new view and Options menu for custom views"
  - "Category filter with Exclude toggle enabled to exclude selected categories"
- **Animated GIFs carry alt text and a visible caption**: alt "Navigating between Bill Pay sub-tabs: Drafts, Approvals, Payment, History, and Overview" with an italic caption below, "*Video of a customer clicking through each Bill Pay sub-tab...*". Motion content given both a machine-readable description and a visible one. Good practice — though autoplaying GIFs with no pause control is itself a WCAG 2.2.2 concern for content longer than five seconds, and no control was observed.
- One alt attribute contains **raw HTML entities**: "David Wallace&#x27;s request alert with an option to add notes and a highlighted" — an unescaped apostrophe and a truncated sentence, read aloud as written.
- Marketing-page alt text is mostly **the heading repeated verbatim**: `alt="Make approvals a breeze"`, `alt="Stay compliant with built-in guardrails"`, `alt="Peace of mind at every step"`. Screen-reader users hear the heading twice and learn nothing about the image. Customer logos carry bare brand slugs (`alt="notion"`, `alt="shopify"`, `alt="kipp"`) rather than "Notion logo".
- `Opens in new tab` markers not observed; external links (`router.com`, `moment.com`, `docs.ramp.com`) are unannotated.

**Negative findings, recorded honestly**

- `See a demo` / `View Demo` / `Explore interactive demo` — three labels, overlapping destinations.
- `Compare Features` and `Compare features` on the same page.
- `Needs review` (transactions) vs `Needs Review` (payments) — same concept, two casings.
- `Expenses & travel` / `Expenses & Travel` / `Expenses` for one menu across three articles.
- `70,000` / `70,000+` / `70k+` on one page.
- "Ramp has industry-low fraud losses" — an unsubstantiated superlative on the security page.
- The Investment Account negation sentence appears in two different clause orders.
- Broken emphasis markup producing run-together words in the disputes article.
- Truncated alt text on at least two help-centre images.
- No skip link, no accessibility statement, on any surface inspected.
- Footer navigation is **duplicated in the DOM** (responsive variants), so `Products`, `Platform` and `Partners` groups appear twice — screen-reader users may traverse the full footer twice.

---

## Transferable patterns

1. **Never ship a bare reject.** `Reject` opens onto `Request changes` or `Request repay`, each requiring a reason and each opening a conversation attached to the object. The person refusing must say what happens next, and the person refused gets an explicit close-out action (`Complete`). Directly applicable to any dispute, appeal, or document-resubmission flow.
2. **Name the blocker in the status.** `Waiting for vendor`, `Waiting for match`, `Ready for payment`, `Unscheduled` — instead of one `Pending`. A blocked item should tell the user who or what it is blocked on, because that determines who they chase. This is the highest-value single idea in the file.
3. **Disambiguate confusable terms in the heading, in brackets.** `Flags (for policy enforcement)` / `Alerts (for visibility)`. One parenthetical each, once, at the top. Cheaper and more durable than a glossary nobody opens.
4. **Document what a feature is not, and where to go instead, inside its own article.** The `Decide whether to use approval matrices` table sends the admin to a simpler mechanism in five named scenarios before explaining the complex one. Reduces misconfiguration and support load.
5. **Two registers for one status taxonomy.** Badge on the object reads `Approval recommended` (hedged, machine-voiced); queue heading reads `Transactions ready to approve` (active, work-oriented). Word the state for the object and the work separately.
6. **State the human's final authority when a model sits in the chain.** "Policy Agent recommendations are suggestions only. As a reviewer, you always have final authority..." — plus a visible rationale panel with cited policy text and the policy version used. Template for any AI-assisted decision surface.
7. **Send a message at the moment of failure, on the channel the user is on.** The declined-swipe SMS naming the missing receipt turns a humiliating decline into a two-second fix. Most products send nothing at the decline.
8. **State the unlock condition as the heading of a blocked state.** `Complete to unlock your card:` + list + resolution links. Ramp and Mercury converged on this independently.
9. **Gate on entitlement at the top of the instructions.** `> Available on Ramp Plus.` before step one, not after step eight.
10. **Condition enforcement on whether the user could have prevented the failure.** Failed repayments due to insufficient funds count toward auto-lock; failures for other reasons do not. Encode fairness in state handling and document it.
11. **Route the wrong reader out in the first line.** "This article primarily applies to Ramp Administrators. Cardholders may find [named article] more applicable." Deflection with a destination.
12. **Explain the rule, show the table, trace one case.** Ramp's house pattern for algorithmic behaviour (matrix matching, threshold tiers, multi-receipt lock timing). Worked examples with dates and amounts beat policy prose for anything with an order of operations.

## Caveats & gaps

- **All in-product strings are `[documented]`, not observed.** Every status name, button label, and banner string in T6, T7, and T9 comes from help-article bodies. Ramp's help content quotes UI labels heavily and consistently, so confidence is higher than for a product documented in prose only — but these are documentation-of-UI, not UI.
- **Empty states: nothing found.** `[absent]`
- **No public status or incident page found on ramp.com.** Searched the footer and the Products group; `trust.ramp.com` is linked but was not fetched and may host uptime or subprocessor information. Marked as not-found rather than absent.
- **`trust.ramp.com` not opened.** It may carry the accessibility statement, SOC 2 report request, and subprocessor list that were not found elsewhere.
- **Legal document bodies not opened** — `Terms of Service` / `Platform Agreement`, `Payment Card Addendum`, `Celtic Bank Accountholder Terms`, `Sutton Bank Cardholder Terms`, `state-disclosures`, and `Editorial Guidelines` were identified from links but not read.
- **Error-message strings are absent.** Ramp documents failure *states* (`Payment failed`, `Sync failed`) and remedies (`Retry`), but no error-message copy was retrievable.
- **Marketing FAQ answers were captured in full** (they are in server HTML) and are summarised here, not quoted — per schema rules.
- **Procurement, Travel, Receivables, Vendor Portal and Advisor Console trees unharvested** beyond their category scope lines. The Vendor Portal in particular would be a distinct audience worth a separate pass.
- **Only US surfaces.** The regulatory footer names CA, UK and EEA entities but no localised pages were sought.
- **Mobile app copy not harvested** beyond mobile paths quoted in help articles (`Actions → Dispute`).
- Accessibility findings are drawn from extracted markup; the absence of a skip link is inferred from its absence in the extraction and should be confirmed with a live DOM inspection before being cited.
- Alt-text truncation ("...showing options from 3 to 6...") may be an extraction artefact rather than a genuine truncated attribute.

## Sources

1. https://ramp.com/
2. https://ramp.com/pricing
3. https://ramp.com/streamlined-approvals
4. https://ramp.com/expense-management
5. https://ramp.com/security
6. https://support.ramp.com/
7. https://support.ramp.com/expense-management/expense-review-and-approvals
8. https://support.ramp.com/expense-management/pre-spend-controls-and-spend-requests
9. https://support.ramp.com/expense-management/policy-agent
10. https://support.ramp.com/cards/controls-and-limits
11. https://support.ramp.com/bill-pay/manage-bills
12. https://support.ramp.com/spend-guidelines-alerts-and-flags
13. https://support.ramp.com/flagging-transactions-accidental-purchase-fraud-and-out-of-policy
14. https://support.ramp.com/reviewing-transactions-from-ramp-cards
15. https://support.ramp.com/spend-requests-and-spending-limit-increases
16. https://support.ramp.com/approval-matrices-setup-and-reference
17. https://support.ramp.com/managing-bills-and-payments-on-bill-pay
18. https://support.ramp.com/automatically-lock-cards-and-funds
19. https://support.ramp.com/disputes-at-ramp
