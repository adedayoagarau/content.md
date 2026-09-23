# 053. Brex

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Corporate cards and global expense management (T&E, bill pay, treasury for startups through enterprise) |
| Primary URL | https://www.brex.com/ |
| Corpus rank | 053 |
| Benchmark strength (source list) | Expense status and administration |
| Locale / market observed | en-US ("120+ countries", "210+ countries and territories" claimed; multi-language dashboard referenced but not observed) |
| Platform observed | Web (desktop marketing), custom help centre under `/support/*`, Platform Agreement |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Brex is not a bank.** Checking provided by **Column N.A., Member FDIC** — deposits FDIC-insured to **$250,000**. **Brex Treasury LLC** is described in the Platform Agreement as "a Capital One Company, a FINRA-registered broker-dealer"; the business-account page describes it as "a FINRA- and SEC-registered broker-dealer, member SIPC". Treasury funds invested in the **Dreyfus Government Cash Management Fund (DGVXX)**, administered by BNY Mellon. **Vault** sweeps across **24 program banks** for up to **$6M** aggregate FDIC coverage. Cards on **Visa and Mastercard**. Compliance: **SOC 1 Type I, SOC 2 Type II, PCI-DSS Level 1**; Brex states it "fulfills applicable security and control requirements aligned with FINRA, IT General Controls (ITGC), and the New York Department of Financial Services (NYDFS)". OFAC/SDN screening enforced at the point of card authorisation. Platform Agreement governed by **Utah law**, venue Salt Lake County, with **binding arbitration** and an opt-out; claims involving Brex Treasury LLC are carved out to the Business Account Customer Agreement. |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 |
| Harvest completeness | Partial — extremely strong on the flagged strength (expense status and administration). Weak on fees: the published `Rates & Fees Schedule` table rendered with **empty value cells** in every row, so no fee figures were retrievable. Help-centre top-level category tree was not reachable; `/support/` serves a "Popular Articles" page rather than an index. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.brex.com/ | Hero, five product tiles, three-metric proof block |
| Pricing | https://www.brex.com/pricing | Four plans, ~80-row comparison matrix (fully in server HTML) |
| Spend management (product) | https://www.brex.com/product/spend-management | 15-question SEO FAQ, AI-review framing |
| Business account (product) | https://www.brex.com/product/business-account | Fullest regulatory explanation on the site; 15-question FAQ |
| Rates & fees schedule | https://www.brex.com/product/cash-management-account/rates-fees | **Table rows present, values empty** |
| Support hub | https://support.brex.com/ → https://www.brex.com/support | "Popular Articles" surface; no category tree |
| Help: Expense management (index) | https://www.brex.com/support/expense-management | 8 article cards with excerpts |
| Article: Expense filters | .../support/expense-filters | **The single richest status-vocabulary artefact in this corpus sample** |
| Article: Approval chains | .../support/approval-chains | Chain setup, review, denial semantics, undo |
| Article: Managing your expenses | .../support/managing-your-expenses | Payment-cycle statuses, itemisation, comments |
| Article: Expense policies | .../support/policies | Policy objects, exceptions, currency |
| Article: Declines and failed expenses | .../support/declines-and-failed-expenses | Eight named decline reasons |
| Article: Employee repayments | .../support/employee-repayments | Repayment lifecycle and its boundaries |
| Article: Brex Notifications | .../support/brex-notifications | Channel inventory, cadences, approver vs employee split |
| Article: Compliance rating | .../support/compliance-rating | High / Medium / Low user-level score |
| Article: Two-factor authentication | .../support/two-factor-authentication | Security copy, irreversibility |
| Article: How Brex credit limits work | .../support/brex-credit-limits | Underwriting explanation, disclaimer |
| Article: Brex travel car bookings | .../support/brex-travel-car-bookings | Booking policy enforcement levels |
| Article: Brex Community | .../support/brex-community | Community guidelines register |
| Platform Agreement | https://www.brex.com/legal | Definitions, warranty disclaimer, arbitration |

---

## T1 Navigation & IA labels `[observed]`

**Product IA is a five-tile grid, each with a one-line scope** — the clearest statement of Brex's object model:

| Tile | Scope line (verbatim) |
|---|---|
| `Corporate cards` | "Spend smart globally with powerful cards and built-in controls." |
| `Expense management` | "Use AI to automate approvals and expense reports. Track in real time." |
| `Travel` | "Simplify global travel with in-app booking and management." |
| `Bill pay` | "Save time with AI-powered invoice entry and payment automation." |
| `Banking and treasury` | "Save, spend, and grow your cash with up to 4.36% — from day one." |

Every scope line is a **verb-led sentence with a full stop**, and each names either a mechanism or a number. Note the section header above them: `The card is just the start.` — Brex is explicitly repositioning away from its original product, and the IA headline does the work.

**Solutions are segmented by company size only** (like Ramp, unlike Mercury): `Startups` · `Mid-size companies` · `Enterprise`, each with a scope line. `Enterprises` appears as the display name under the heading `Enterprise` — a singular/plural inconsistency inside one card.

**In-product navigation named in help bodies** `[documented]` — Brex's dashboard IA is unusually visible through its help content:

`Expenses` · `Wallet` · `Tasks` (with `Requests`, `Expenses`, `Repayments` sections) · `Cards and limits` (→ `Manage policies`) · `Bills` · `Reimbursements` · `Trips` · `Team` (→ `Users`) · `Reports` · `Accounting` (→ `Review`, `Prepare`) · `Rewards` (→ `Perks and discounts`, `Airline miles`) · `Settings` / `Company settings` · `Personal settings > Security and privacy` · `Notification preferences` · `Spend limit / Budgets`

**The `Expenses` / `Wallet` split is the defining IA decision.** `Expenses` is the administrative view of *other people's* spend; `Wallet` is the first-person view of *your own*. The same actions (filter, group, itemise, review) exist on both, and the help articles say so explicitly each time: "Account, card admins ... can group expenses made by all team members in the *Expenses* page. You can also group personal expenses from the *Wallet* page."

This is a clean solution to a problem most spend products fudge: an admin is also an employee with their own card. Rather than a role toggle, Brex ships **two differently-named surfaces for the same object viewed from two positions**. The cost is that every help article has to explain the split, and they all do — repetitively.

**Expenses page has three named views** `[documented]`: `All expenses` · `Not compliant` · `Pending my review`. The middle one is notable — a top-level view named for a *policy state*, not a workflow stage.

**Tabs in the mobile Trips view** `[documented]`: `Upcoming` · `Drafts` · `Past` · `All` — "to view trips in different statuses".

**Help-centre structure is shallow and partly broken.** `support.brex.com` redirects to `/support` and serves a "Popular Articles" list rather than a category tree; the articles that follow are dumped in full on that one page. Category pages exist (`/support/expense-management`) but are reachable only by search or deep link, and one of them carries an automated banner in the rendered output: "**Note:** This content was automatically generated from the HTML page because structured content was not available." A visible pipeline failure in the help IA.

**Breadcrumbs: `[absent]`.** No breadcrumb trail was observed on any support article.

## T2 Value proposition & headline patterns `[observed]`

**Hero** — `Finance built for speed and control.` Subhead: "Modern cards, banking, expenses, accounting, and more — in 120+ countries."

`speed and control` is the governing tension of the whole product category, and Brex names it in five words. Everything else on the site resolves to one side or the other.

**Section headers are short declaratives, usually with a full stop:**

- `The card is just the start.`
- `Solutions for every stage of growth.`
- `Supercharge your financial operations.`
- `Control spend before it happens.`
- `Make doing your expenses easy.`
- `Maximize your spending power.`
- `Pay vendors faster and easier.`
- `Accelerate accounting with AI.`
- `Save and earn more, only with Brex.`
- `End the month-end hassle.`
- `Insights you can act on.`
- `Reimburse employees anywhere, fast.`
- `Manage spend globally, operate locally.`
- `Welcome to the future of spend management.`

**Almost all are verb-first imperatives** (`Control`, `Maximize`, `Pay`, `Accelerate`, `End`, `Reimburse`, `Manage`). Compare Mercury's two-beat aphorisms and Ramp's *without the <chore>* construction — Brex's register is flatter and more corporate, closer to conventional enterprise B2B. There is no wordplay on the marketing pages inspected.

`Control spend before it happens.` is shared almost verbatim with Ramp's `Control spend before it happens.` — the same sentence on two competing sites, which is a useful reminder that the category has converged on one headline.

**Two globalisation claims are stated in tension and resolved in one line**: `Manage spend globally, operate locally.` The chiasmus is the only rhetorical device observed.

**Proof block is three metrics with labels above and below** `[observed]`:

| Label | Figure | Gloss |
|---|---|---|
| `AI-powered automation` | `756 hours` | "Average time saved per year by automating expenses and accounting" |
| `Manual work eliminated` | `71%` | "of all expenses prepared on Brex are handled entirely by automations" |
| `Competitive treasury` | `Up to 4.36%` | "Same-hour liquidity and built-in treasury that helps you make money" |

Footnoted: "These metrics are based on internal metrics from March 2025. Past performance does not guarantee future results, which may vary." **The source is named as internal, the date is given, and the securities-style disclaimer is attached to an operational metric** — unusual, and the `756 hours` figure (oddly precise, not rounded to 750) is doing the same trust work Wise's `18.9 million` does.

**Customer quote used as the thesis** `[observed]`: "By making it easier for employees to comply, finance went from the bad cop to the hero." — DoorDash VP of Finance. This is the same `bad cop` framing Ramp uses in its own voice ("so you don't have to play bad cop"). Brex outsources it to a customer; Ramp says it directly. Either way, **the category has identified the interpersonal cost of enforcement as the real pain**, and two competitors independently reached for the same idiom.

**Other numbers**: `35,000+ top companies`, `1 in 3 startups`, `up to $6M in FDIC insurance`, `up to 30x higher credit limits` (and, on the business-account page, `up to 40x higher limits` — **two different multiples for the same claim on two pages**), `up to 20x FDIC coverage`, `50+ countries` for local cards, `40 countries` for local-currency reimbursement, `24 program banks` (and, in the same FAQ set, `20+ program banks` — **a second internal inconsistency**), `210+ countries and territories`, `120+ countries`.

The discrepancies are worth recording precisely because the numbers are load-bearing trust devices: `30x` vs `40x` and `24` vs `20+` appear on pages a prospect would read in one session.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Homepage pre-footer, spend-management foot | Primary |
| `Try Brex for free` | Essentials plan card | Price framing |
| `Open an account` | Premium plan card | **Different verb for the same act at a different price point** |
| `Contact sales` | Enterprise and Smart Card cards | |
| `See Brex in action` | Homepage video | |
| `Explore interactive product demo` | Spend management hero | |
| `Learn more` | Each of three Solutions cards | **Three bare `Learn more`s in one row** — the object is supplied only by the card heading |
| `Explore Brex cards` / `Explore Brex expense management` / `Explore Brex business accounts` / `Explore Brex bill pay` / `Explore Brex accounting automation` | Homepage feature blocks | `Explore Brex <product>` is the house pattern — fully specific, brand-name included every time |
| `Explore spend limits` / `Explore accounting automation` / `Explore global capabilities` | Spend management | Same pattern, brand dropped |
| `Learn more about Brex AI` | Spend management | |
| `Read more` / `Read case study` | Customer quotes | Two labels, same act |
| `Compare plans` | Pricing | |
| `View fee schedule` | Pricing, twice | Links to the empty-valued table |

**In-product CTAs named in help bodies** `[documented]` — the administration vocabulary:

`Approve` · `Deny` · `Approve selected` · `Deny selected` · `Confirm` · `Undo` · `Override additional requirements` · `Mark as reviewed` · `Request repayment and approve` · `Request repayment` · `Repay` · `Submit repayment` · `Cancel repayment request` · `Mark as paid` · `Retry payment` · `Send request` · `View expense` · `View payment` · `Itemize this expense` · `Itemize # expenses` · `Unsplit expense` · `Remind about documentation` · `Resolve` · `Add a rule` · `Edit` · `Manage policy` / `Manage policies` · `Set as default policy` · `Add approval step` · `Update & review` · `Next` · `Save` · `Change method` · `Continue` · `Send 2FA recovery code` · `Send code` · `Request a spend limit` · `Add new trip` · `Add booking` · `Reserve` · `Add another reservation to the trip` · `See all` · `See more` · `Group` · `Add filter` · `Upload documents` · `Add documents`

Three worth calling out.

`Request repayment and approve` is a **compound action in a single label** — the approver simultaneously signs off the expense for accounting purposes and demands the money back. It exists because those are genuinely one decision, and splitting them would force a two-step. Four words, no ambiguity.

`Override additional requirements` is the admin's escape hatch, and the help text attaches a warning immediately: "This can't be undone, so confirm those requirements are not needed before you proceed."

`Remind about documentation` sits **inside the comment composer**, above the free-text box: "Before typing a custom message in the comment box, click `Remind about documentation`." A canned action offered at the exact moment the admin is about to type the same thing by hand.

## T4 Onboarding & getting-started

**Account opening is sold on speed and enumerated inputs** `[observed]`. The FAQ `What do I need to open a business banking account?` lists exactly four: "your business address, incorporation details, and personal information on your company owners, including either a SSN or a valid photo ID. Additionally, you'll need to know if you are subject to backup withholding."

The last item is the interesting one — **backup withholding status surfaced as a prerequisite in a marketing FAQ**. It is a genuine blocker that would otherwise stall an application mid-flow, and Brex moves it to the pre-read.

Eligibility is bounded explicitly: "Customers must have some type of existing or planned operations in the U.S. and a U.S. or international address for their principal place of business. This can be a residential address, but may not be a registered agent, PO box, or UPS box address." **Three named address types that will be rejected**, stated before the user tries.

**Underwriting is explained as a user-controllable process** `[documented]` — `How Brex credit limits work` tells the applicant how to get a bigger limit:

> "The best way to unlock the highest credit limit is to: 1. Securely connect all bank accounts where you hold cash (our system can see your full financial strength) 2. Maintain a strong payment history by paying your balance on time"

Three underwriting inputs are named (`Connected bank funds`, `Brex business account funds`, `Financial statements`), each with its eligibility condition. The document requirements for statement underwriting are given as a five-item bulleted spec: **Complete** ("Statements with missing pages will not be accepted"), **Unaltered** ("No redacted info and markups such as highlighting or commenting"), **In PDF format** ("Screenshots, spreadsheets, scanned copies, or activity reports will only be considered in exceptional cases"), **From business accounts only**, **From domestic bank accounts only**.

**Bolded criterion word, then the failure case.** That construction — name the property, then name what fails it — is more useful than a prose paragraph and is reusable for any document-upload gate.

The consequence of non-compliance is stated plainly: "Since we base your limit on your company's cash balance, we cannot maintain your credit limit if we don't receive the required statements for an extended period of time." And a trade-off is disclosed: "the minimum cash balance requirements and/or monthly sales requirements will also increase with this alternative option."

**2FA setup is eight steps with two embedded warnings** `[documented]`. Step 2 pre-empts a specific failure: "ensure that your device's date and time settings are configured to *Automatic* mode. Authenticator apps generate 2FA codes using the current time on your device, so if the time is set incorrectly, the wrong code will be generated." A cause-and-effect explanation of a failure mode most users would misdiagnose as a broken app.

The article also pre-empts the *setup* failure: "step-up authentication may open a pop-up window to confirm your identity. Make sure pop-ups are allowed for the Brex dashboard, or 2FA setup may fail."

And the irreversibility: "Once 2FA is enabled, it cannot be disabled." — stated twice in the article, once in each branch.

## T5 Form & field labels

**Public forms: `[absent]`** beyond plan-card links. No email-capture field was observed on the pages inspected — Brex routes straight to `/signup` with an `?edition=` parameter, so plan selection is carried in the URL rather than collected.

**In-product field and control labels** `[documented]`:

*Policy builder*: `Require review` · `For expenses: X$ and above` · `Require review from` · `Add approval step` · `Add a rule` · `Add rule for certain users` · `Use this policy for Bill Pay` · `Use this policy for Brex travel` · `Write this policy in a non-USD currency` · `Require expense category` · `Require VAT documentation` · `Require accounting field` · `Manage currency`

*Travel policy*: `Specify maximum spend` · `Specify vehicle class` · `Maximum spend limit outside of Brex travel` · `Specify by merchant` → `Allow` / `Review` · `What about all other merchants?` · `Booking policy enforcement` → `None` / `Notification` / `Approval` · note field capped at "250 characters or less"

*Booking*: `Booking for myself` / `Book for a guest` · `Book with` (limit selector) · `Return to the same location` · `Search` · `Select` · `Reserve`

*Expense detail*: `Approvals` (section, with checkmarks per approver) · `Card transaction details` · `Merchant` · memo field · `Manager` (on user record)

Two notes. **`What about all other merchants?` is a question as a field label**, resolving the else-branch of a rule the admin just wrote — the same interview-style rule-building Mercury uses. And `Booking policy enforcement` offers three escalating levels with plain-language definitions rather than jargon:

- `None:` "There will be no users on the booking approval chain."
- `Notification:` "Users in the approval chain will be notified of out-of-policy bookings. They will be able to cancel those bookings if needed."
- `Approval:` "Users in the approval chain will be asked to review out-of-policy bookings. **If not approved, the booking will be automatically canceled after a few hours.**"

The third definition contains a **timed automatic destructive consequence** — an unreviewed booking self-cancels. Naming that inside the setting's own definition, rather than in a footnote, is correct and rare. "after a few hours" is the one vague number in an otherwise precise article.

## T6 Status & state language — PRIORITY

Brex's flagged strength, and the `Expense filters` article is the richest single status artefact in this corpus sample: **six independent status dimensions**, each with named values and a one-line definition, published on one public page.

### The six status axes `[documented]`

Brex does not have "a status". It has an expense with six orthogonal statuses, and the filter UI is where they are all named at once.

**1. `Approval status`** — where the expense stands with a human:

| Value | Definition (verbatim, trimmed) |
|---|---|
| `Submitted/Repayment requested` | "An expense is submitted for approval, but is currently either waiting on approval or is missing receipt/memos according to the expense policy." |
| `Approved` | "An expense is approved and fully compliant with the policy, or has been approved by an admin ... with an override of the policy requirements." |
| `Canceled` | "A reimbursement expense was canceled after being submitted or a card expense was declined at time of card swipe." |
| `Denied / Pending repayment` | "A reimbursement or card expense was denied by a reviewer or is pending repayment." |

**Two of the four values are compound, joined by a slash**, and the definitions explain why: the underlying condition differs by transaction type. `Denied / Pending repayment` collapses "an approver said no" and "we are waiting for your money" into one filter because, for a card expense, they are the same moment. `Approved` explicitly covers *two different routes* to the same state — genuinely compliant, or overridden — and the definition says so, which matters enormously for audit.

**2. `Payment status`** — where the money is:

`Processing/Not paid` · `Declined/Failed` · `Completed` · `Paid` · `Chargeback` · `Cash advance` · `Refunded` · `Refunding` · `Awaiting payment`

Each is defined **per transaction type**. `Processing/Not paid`: "For card expenses, the card swipe is pending and hasn't cleared yet. For reimbursements, the funds are currently being sent to the employee. For repayments, collection of funds from the employee is processing and hasn't completed yet."

**One label, three meanings, all three written out.** This is the defining Brex pattern: the vocabulary is deliberately shared across card / reimbursement / repayment, and the *documentation* carries the polysemy rather than the label. Whether that is right is arguable — a user seeing `Awaiting payment` on a repayment has a different problem than one seeing it on a reimbursement — but the choice is deliberate and consistently documented.

`Completed` vs `Paid` are distinguished by direction: `Completed` is "The card expense/reimbursement payment has completed"; `Paid` is "The repayment has been paid to employees". Money out versus money back.

`Refunded` and `Refunding` as separate values gives the user a visible in-flight state for a refund, which most products omit.

**3. `Documentation status`** — three values, and the third is the interesting one:

- `Pending:` "The expense owner hasn't provided all the required documentation."
- `Completed:` "The expense owner has provided all the required documentation."
- `Overdue:` "The expense owner hasn't provided all the required documentation, **and is past the company set deadline**."

`Overdue` is `Pending` plus a company-configured deadline. The state is **derived from a tenant-specific setting**, so it does not exist for companies that have not set deadlines — and Brex says so in the next filter group.

**4. `Compliance status`** — labelled in the UI as *"(Only visible if you've set up deadlines)"*:

- `Documentation`: "Only show expenses that are missing documentation."
- `Review`: "Only show expenses that are still pending review/approval."
- `Completed`: "Only show expenses that have complete documentation, even if still pending review/approval."

**Conditional availability disclosed in the filter's own label.** The parenthetical tells the admin why they cannot see this filter, without a support ticket. And the third definition draws the distinction that makes the axis necessary: documentation-complete and review-complete are different things, and `Completed` here means only the former.

**5. `Dispute status`** — `Closed` / `In progress`. Minimal, which is right for a state the user cannot influence.

**6. `User status`** — on the person, not the expense:

- `Active`
- `Deleted`: "The user has been deleted. **Deleted users cannot be reactivated.**"
- `Disabled`: "The user who previously had access, but has since had access removed, either because they left the company or an admin ... temporarily removed access. **Disabled users can be reactivated.**"

The irreversibility difference between `Deleted` and `Disabled` is the entire reason both exist, and both definitions end with the reversibility statement. **Define a destructive state by whether it can be undone.**

### Policy flags — five named reasons `[documented]`

- `Missing memo`: "The policy requires a memo, but none has been added."
- `Missing receipt`: "The policy requires a receipt, but none has been added."
- `Exceeds per diem`: "This expense brought the user over their per diem limit."
- `Missing attendees`: "The policy requires attendees, but none have been added."
- `Other reasons`: "The policy has flagged this expense due to another policy rule (disallowed merchants or merchant categories, invalid receipt, etc.)."

Four specific flags and one honest catch-all whose gloss lists examples rather than leaving it opaque. The first four share one grammatical shape — `Missing <thing>` / `Exceeds <threshold>` — so the flag reads as the fix.

Separately: `Government official added`: "A government official was added as an attendee on the expense" — an anti-corruption/FCPA compliance filter surfaced as a first-class expense attribute, alongside the pricing matrix's `Sunshine Act` line item. Brex is encoding specific regulatory regimes as filterable expense state.

### Payment-cycle statuses, explained as merchant behaviour `[documented]`

From `Managing your expenses`, four states defined by *what the merchant is doing*:

- **`Cleared`** — "approved both by Brex and the merchant." With a warning: "Cleared expenses may have a higher dollar amount than they did when they were pending ... For example, if you leave a tip at a restaurant, the cleared amount will be different than the pending charge of the meal."
- **`Pending`** — "a charge that Brex has approved, but the merchant's system hasn't yet cleared. It will generally process within two days, but depending on the merchant, it can take up to 30 days." Then the accounting consequence: pending amounts reduce available spend but do not hit the statement, "so if the merchant cancels the expense before it clears, no funds will have been deducted".
- **`Pre-authorized`** — "Some merchants will issue a charge to your card with the intention of dropping it within 30 days ... often done by merchants, such as hotels, to cover any expenses incurred." Three possible outcomes named: reversed by the merchant, expire, or clear for the final amount.
- **`Declined`** — cross-referenced to its own article.

**The tip example is the standout.** `Cleared > Pending` in amount is a genuinely confusing behaviour, and Brex explains it with the single most common real-world cause rather than describing authorisation-versus-capture. One concrete example in place of a mechanism.

`Pending` also carries an auto-expiry rule with a manual escape: "If canceled by the merchant, a pending expense will be removed automatically after 30 days. If you need to remove the transaction sooner ... please reach out to Brex Support. We may ask you to provide written documentation from the merchant that the transaction has been canceled."

### Compliance rating — a user-level score `[documented]`

`High` / `Medium` / `Low`, shown to the employee in their own `Tasks`. Calculated per the article by checking "each expense submitted to check if it meets unique policy requirements and has all necessary documentation attached", then comparing against "historical compliance performance to generate a user-level rating".

Two content decisions worth recording. The scale is **three named bands, not a percentage or a score out of 100** — coarse enough to be directional, not precise enough to be gamed or contested. And the stated purpose is framed as help rather than surveillance: "By viewing a direct rating of their compliance performance, team members can better understand expense requirements and expectations. This helps create more transparency, reduces friction, and encourages improved compliance."

An in-product explainer is named: `How is my rating calculated?` — the score links to its own methodology. Any product scoring a person should ship that link.

The feature is admin-toggleable (`Settings > Compliance rating`), so a company can decline to show employees their score.

### Approval-chain position as a filter value `[documented]`

- `Pending your approval`: "You're currently up in the review chain. Other users might be able to approve this expense too."
- `Pending another approval`: "Other users are in the review chain before you, or you might not be in the review chain at all."

**Position in the chain, written from the reader's seat.** Both definitions hedge honestly — "Other users *might* be able to approve this too", "you *might not be* in the review chain at all" — because a chain can have parallel approvers and a filter cannot know. Naming the ambiguity is better than a confident label that misleads.

Chain progress is shown as **checkmarks against names** under an `Approvals` heading: "If there's a checkmark next to the expense, that person has already approved it. If there's no checkmark, the transaction is still pending approval." Presence/absence of a mark per person — no separate status string needed.

### Expense-owner scoping, four values `[documented]`

`Everybody` · `All my reports` · `My reports` · `My own`, with `All my reports` defined as "everyone in your **reporting pyramid**". Brex needs three words for three different scopes of "my team" — direct, transitive, and self — and ships all three rather than one ambiguous "My team".

## T7 Error, failure & recovery — PRIORITY

### Decline reasons — eight named causes, each with its own remedy `[documented]`

From `Declines and failed expenses`. The article opens by locating the reason in-product before listing causes: "If your Brex card transaction is declined, you can quickly view the reason in your expense details" — three steps on dashboard, three on app, both ending at "the banner at the top of the expense details page. It displays the reason for the decline."

| Reason | Remedy given |
|---|---|
| `Incorrect credentials` | "For all your Brex cards, your card numbers, expiration dates, and CVV codes are different." — the cause of the confusion is named |
| `Company limit reached` | Split by role: employee → contact an admin; admin → "check to see that your company has not reached its credit limit" |
| `Budget rules` | "You may have reached your spend limit or are attempting to make an out-of-policy purchase. Ask an account or card admin about your budget restrictions." |
| `Chip reader not used` | "please insert your card's EMV chip instead of swiping the magnetic stripe" |
| `Unauthorized country` | Links the OFAC sanctions programme list |
| `Platform Agreement prohibited merchants` | "This is expected" — weapons, marijuana and cannabis, illegal services, restricted industries |
| `Unsupported transaction type` | "We'll automatically decline transactions that may pose a risk to your security. This includes withdrawing cash at ATMs." |
| Blocked vendors / blocked countries | OFAC and SDN explained in a paragraph |

**"This is expected" is the phrase to steal.** For a decline the system caused deliberately, telling the user it is working as designed stops them retrying and stops them filing a ticket. Most products leave policy declines indistinguishable from failures.

The article also **teaches safe escalation behaviour** at two points: "take a screenshot with your card details redacted of the declined error message", and then a standalone note: "**Note:** For your security, redact your card details before you send a screenshot, so only the last four digits of your card number are visible. **Never send your full card number, CVV, or expiration date to Brex Support.**" An anti-social-engineering instruction placed in the article where the user is most likely to photograph their card. Mirrored in the 2FA article: "**Brex will never call you asking for your 2-Factor Authentication (2FA) code or any one-time passcode.**"

**Allowlisting is offered with its three conditions stated up front**, including a limitation most products would omit: "we can't allowlist a merchant preemptively" and "We can only add a merchant to the allowlist on a card-by-card basis." The remedy exists, and its boundary is drawn before the user asks.

### Denial does not undo the spend — stated explicitly `[documented]`

> "**Note:** A denial does not automatically reverse the charge — if the spend has already occurred on a Brex card, the employee may need to initiate a repayment. ... For reimbursements, a denied expense is simply not paid out."

**The single most important sentence in Brex's approval documentation.** Approving or denying a *card* expense is an accounting and policy act, not a financial one — the money already moved. Brex says so in one sentence, for both transaction types, at the point of denial. Products that model approval as if it gates the money will mislead every approver.

The denied expense's visibility is also specified: "the expense is marked *Denied* in your dashboard. The expense is flagged in the employee's *Expenses* view." Both parties see the outcome.

### A six-second undo `[documented]`

> "After approving or denying an expense, a banner will appear at the top of your screen for several seconds, giving you the option to undo the action. **You have six seconds to click *Undo*** before the banner disappears. If you approved a card expense or reimbursement by mistake, you can request a repayment."

An exact undo window, published. And the fallback for missing it is named — the repayment flow becomes the recovery path for a mis-approval. **Undo, then the escalation for when undo expired.** Six seconds is short for a financial action; whether it is right is arguable, but publishing the number lets an admin plan around it.

### Retry, with the failure reason co-located `[documented]`

`Retrying failed repayment`: "Your repayment may fail for a number of reasons (for example, invalid account/routing details or restrictions on your personal bank account). Details on the failure will appear in your dashboard ... Go to *Expenses* or *Wallet* and click on the failed repayment to view its details. **Here, you'll find the failure reason and possible fixes.**"

The detail pane carries reason *and* suggested fixes, then `Retry payment`, then a confirmation step ("confirm that the correct bank account is selected"). Reason → fix → retry → confirm, in one pane.

Same pattern for payment status: "`Declined/Failed`: The payment for an expense failed. **The expense details panel provides the detailed reasons why a payment failed.**"

### Unrecoverable actions, named `[documented]`

- "Once you've completed an expense with your Brex card, **you won't be able to cancel the expense in Brex**." — one sentence, its own section heading (`Cancel an expense`). A section that exists solely to say no.
- `Override additional requirements` — "This can't be undone."
- "Once 2FA is enabled, it cannot be disabled."
- "Deleted users cannot be reactivated."
- "Requests that are already paid cannot be canceled."

### Unsplit blocked by six conditions `[documented]`

"**Note:** this option is unavailable if the expense or any of its child expenses have been exported to an external ERP, are under accounting review, are repaid, or have an associated repayment request, or are out-of-policy/denied. **This ensures data integrity and prevents complications with external systems or financial obligations.**"

Five blocking conditions and a stated *reason* for the block. The closing rationale is doing the real work — an admin who understands that the constraint protects the ERP will stop looking for a workaround.

### Escalation outside the product, stated `[documented]`

> "Brex doesn't set your company policy. **If a repayment is declined or unpaid, follow your internal policy outside the Brex platform.**"

Brex names the edge of its own authority. For a tool sitting between an employer and an employee over money, saying "this is now an HR problem, not a software problem" is the honest and correct content decision.

Similarly: "Brex can only facilitate repayment money movement in the US. For employees outside the US ... use *Mark as paid* to track it, and handle money movement externally (for example, payroll deduction)." A capability gap with a tracking-only workaround, and the real-world mechanism named.

And on travel: "Changes can no longer be made through Brex once you have picked up the rental car. If you need to make a change to the reservation after pickup date/time, please contact the rental car provider directly." Handover point stated with the precise trigger (pickup).

## T8 Empty states `[absent]`

No no-data, no-results, or first-run strings were reachable on public surfaces. The closest documented adjacent state is the auto-removal of an abandoned pending charge after 30 days, recorded under T6.

## T9 Notifications & system messages

Brex publishes a **full notification inventory as a user-facing help article** (`Brex Notifications`) — an unusual and good artefact, structured by audience.

**Channel inventory** `[observed]`: "email, push notification, SMS, WhatsApp, Slack, or via your task inbox in your *Notification preferences*". WhatsApp as a first-class notification channel is a globalisation tell; the "task inbox" is treated as a channel alongside external ones.

Governance line: "**Please note that you can only customize your own notification preferences.**" — an admin cannot set an employee's channels. Stated once, clearly.

**The article splits `Employee Notifications` from `Approver Notifications`**, and every entry follows the same two-part shape: `Notifications:` (what fires) then `Action to Take:` (what you do). **Pairing every notification with its intended response** is the structural idea worth copying — it turns a notification catalogue into a responsibility map.

### Employee notifications, six groups `[documented]`

`Card Notifications` · `Missing Receipt or Memo Notifications` · `Transaction Alerts` · `Reimbursement Status Updates` · `Repayment Request Notifications` · `Spend Limit and Budget Updates` · `Comments and Collaboration Alerts`

Cadences are published:

- Missing receipt/memo: "you will receive an email **every Monday** until action is taken", plus push/SMS "**2-7 days after the expense has been made**"
- Repayment: "Notifications are sent **5, 14, and 30 days** after the repayment request is initially created"
- Approvers: "you will receive an email **every Monday** that lists pending approval requests"
- Policy violations: "you will receive an email **every Monday** that lists card expenses or reimbursements that require further review"

**A weekly Monday digest is the backbone**, with escalating one-off reminders at 5/14/30 days for repayments. Publishing the exact cadence lets a user decide whether to act now or wait — and lets an admin explain the nagging to their team.

Positive-outcome notifications are included, not just nags: "You will be notified if a receipt or memo has been added successfully." And: "For certain common vendors, Brex may auto-generate a virtual receipt, and **you'll be notified that no action is needed**." A notification whose entire content is *stand down* — rare, and valuable in a product built on chasing people.

**Fraud lock notification carries its own resolution branch** `[documented]`: "SMS or push notifications if Brex detects unusual or potentially fraudulent activity on your card, which may result in an automatic card lock." Action: "If you recognize them, you can **unlock your card directly from the notification**. If you don't recognize them, immediately dispute the transaction." **Resolve-from-the-notification for the benign case**, escalate for the malign one. The user never has to find the card in the dashboard.

Decline alerts: "Immediate alerts if a transaction is declined, **often with a reason** (e.g., over limit, wrong merchant category)." The hedge `often` is honest — not every decline reason is available at alert time.

### Approver notifications, three groups `[documented]`

`Pending Approval Requests` · `Policy Violation Flags` · `Payment Approval Chain Notifications`

**Approve-from-email is supported for bill payments**: "may even allow for direct approval/denial from the email". The bill-pay article confirms the flow — `View payment` → `Approve` or `Deny`, "directly from your email without signing in to your Brex account", with a mandatory reason and a notify-submitter toggle on denial.

The approver's action list under `Policy Violation Flags` gives **three graded responses rather than a binary**:

- `Approve with Exception:` "If there's a valid business reason for the deviation."
- `Request Clarification:` "Ask the employee for more details to understand the context."
- `Deny:` "If the expense is clearly non-compliant and cannot be justified."

Plus a framing line that defuses the flag: a flagged expense "doesn't automatically mean the expense should be denied, or that the employee was acting maliciously. It simply indicates that a closer review is recommended." **Telling the reviewer not to read the flag as an accusation** is a deliberate de-escalation, and it protects the employee from an automated signal being over-read.

Honesty about the model: "Some flagging rules rely on OCR (optical character recognition), **which isn't 100% accurate**. These rules will continue to become more advanced over time." And the flag is explained in-product: "When you click on the transaction, you'll see a banner explaining why the expense was flagged."

### Expense comments as the in-product channel `[documented]`

"When you or your employee need to ask a question about a transaction, you can use comments within the Brex dashboard or mobile app to do so — **without needing to send an email or text on another channel**." With `@` mentions, notification on mention, a `Resolve` action, and auto-resolution: "The comment is resolved automatically whenever the expense task is completed."

The audit rationale is stated: "everything stays within Brex and can easily be accessed during audits." A collaboration feature justified by its compliance byproduct.

## T10 Disclosures, legal & compliance — PRIORITY

### The three-sub-account structure, explained in a marketing FAQ `[observed]`

Brex's central disclosure problem is that one "business account" is three legally different things. The FAQ `How do I open a Brex business banking account?` answers by decomposing it:

- **Checking** — "Provided by Column N.A." — "Deposits are FDIC-insured up to $250,000."
- **Treasury** — "invested in the Dreyfus Government Cash Management Fund (DGVXX), provided by Brex Treasury LLC, a FINRA- and SEC-registered broker-dealer, member SIPC."
- **Vault** — "Offered by Brex Treasury LLC, funds in Vault are allocated across 24 program banks, enabling up to $6 million in total FDIC-insured coverage."

**Three sub-accounts, three protection regimes, three providers, named separately.** The product presents as one account; the disclosure refuses to. This is the single most transferable thing in the file for any product bundling deposit and investment products behind one balance.

### "Where is my cash actually stored?" `[observed]`

A published FAQ, answered with a structural claim first: "**Brex doesn't hold customer funds on its balance sheet, other than certain funds in transit.**" Then the custody chain — Column N.A. for checking; a broker-dealer sweep into either the BNY Mellon-administered money market fund or the FDIC program banks.

The money market fund is described by its constraint rather than its rating alone: "The fund must hold at least **99.5%** of its money in cash or securities backed with the full faith and credit of the U.S. Government." A specific, checkable number in place of "safe". The prospectus is linked, the AAA rating is linked, BNY Mellon's scale is linked, and its G-SIB designation is linked to the FSB list.

**The insolvency scenario is written out** `[observed]`:

> "In the unlikely event something happens to Brex, SIPC and FINRA, Brex's regulator, have access to Brex's custodial records, along with the records of partner banks and BNY Mellon, to remit those funds back to you. Given the immediate liquidity of all the assets held in Brex business accounts, the remittance of funds should take less than a day."

Naming your own failure, the parties who would unwind it, and an estimated recovery time. `should take less than a day` is a bold estimate to publish; it is hedged with "should" and grounded in the liquidity argument. Mercury makes the same move ("Regardless of what happens to Mercury, any funds ... will remain safe and accessible") — **stating what survives your own bankruptcy is becoming the standard fintech trust disclosure**, and it is the right one.

Ownership is asserted twice, in both sweep destinations: "The funds are held in each customer's name (and not Brex's), ensuring that the funds of each customer are individually insured by FDIC" and "The fund shares are held in each customer's name, and not Brex's." The **(and not Brex's)** parenthetical does the work.

### The FDIC number, bounded `[observed]`

`Up to $6M in FDIC coverage` appears as a headline claim, and every occurrence is tied to the mechanism (24 program banks / a sweep). The `$250,000` checking figure is stated separately and is not merged into the headline, so a reader can see that the $6M applies only to Vault.

`Up to 20x FDIC coverage` in a later FAQ says "through 20+ program banks" where the earlier one says 24. **Inconsistent counts for the same programme within one page** — recorded as a defect, since the number is a trust device.

### The `Brex Treasury LLC` identity question `[observed]`

The Platform Agreement's definitions section reads: "**Brex Treasury means Brex Treasury LLC, a Capital One Company, a FINRA-registered broker-dealer.**"

The business-account page describes the same entity as "a FINRA- and SEC-registered broker-dealer, member SIPC" with no Capital One reference. Recorded verbatim as found on both surfaces; the corporate-affiliation language appears only in the legal document. A content designer should note that **the entity's description differs between the agreement and the marketing page** — the agreement is the authoritative surface, and the discrepancy is exactly the kind a compliance review should catch.

### Fee disclosure — the significant gap `[observed]`

`View fee schedule` appears twice on the pricing page. The destination, `Rates & Fees Schedule`, renders as two tables with **row labels and no values**:

*Yield offered*: `Uninvested cash` · `Money Market Fund: BNY Dreyfus Government Cash Management (DGVXX)`
*Fee schedule*: `ACH - Domestic` · `ACH - International` · `Checks` · `Wire transfers - domestic` · `Wire transfers - international` · `Account opening fees` · `Account maintenance fees`

Only one line of substance survives: "¹ Your recipient's financial institution may charge a fee upon receipt of the wire." — third-party cost disclaimed, correctly.

**This may be a client-side rendering dependency rather than an omission**, and it is marked as such in Caveats. But the practical effect for an unauthenticated visitor, a crawler, or a text-only browser is a fee schedule with no fees. Compare Ramp, whose full pricing matrix is in server HTML. Recorded as the most serious content-delivery finding in this file.

Fee absences are instead claimed in prose: "There are **no treasury transaction fees, account minimums, overdraft fees, monthly fees, or hidden fees.**" Five named absences in one clause — but `hidden fees` in a list of specific fee types is a marketing phrase in a disclosure position, and the specific figures it sits beside are unavailable.

Plan prices are clear: `Essentials $0 user/month` · `Premium $12 user/month` · `Enterprise Custom pricing` · `Smart Card Custom pricing`. `Travel booking (free on Essentials)` — **a parenthetical scoping a free claim to one plan**, which is precise.

### Credit-limit disclaimer `[observed]`

> "*The information you provide is used solely for credit evaluation. Brex treats this data as confidential and complies with rigorous privacy and data handling policies.* Credit limits are calculated in part by Brex's ongoing account-specific determination of risk. **These credit limits are subject to change at any time at our sole discretion** in accordance with our rights outlined in the Platform Agreement."

Purpose limitation, then confidentiality, then the discretionary reservation. The third sentence is the one that matters commercially, and it is last and unhedged.

Elsewhere the article softens the same fact: "Your credit limit is designed to remain stable and predictable, provided you maintain the following: Strong payment history / Ongoing financial visibility". **`designed to remain stable` and `subject to change at any time at our sole discretion` are the same fact in two registers** on one page. Defensible — the conditions for stability are named — but worth flagging as a tone gradient inside a single disclosure.

### Platform Agreement `[observed]`

- Governing law: **Utah**, venue Salt Lake County
- **Binding arbitration with an opt-out**, flagged in all caps: "PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR RIGHTS AND WILL IMPACT HOW LEGAL CLAIMS YOU AND WE HAVE AGAINST EACH OTHER ARE RESOLVED, UNLESS YOU OPT OUT AS SET FORTH BELOW."
- **Brex Treasury LLC is carved out of the arbitration clause** — "LEGAL CLAIMS INVOLVING BREX TREASURY, LLC ARE GOVERNED BY THE DISPUTE RESOLUTION PROVISIONS OF THE BREX BUSINESS ACCOUNT CUSTOMER AGREEMENT." A regulated broker-dealer cannot be swept into the same clause as the software company, and the document says which agreement governs instead.
- Warranty disclaimer in all caps, with six enumerated non-guarantees `(A)`–`(F)`, including "(D) SPECIFIC MERCHANTS WILL PERMIT PURCHASES USING CARDS ISSUED BY AN ISSUER" — the decline behaviour documented in T7 is disclaimed in the agreement.
- ACH authorisation flagged in caps: "THIS SECTION PROVIDES AUTHORIZATION TO AUTOMATICALLY DEBIT YOUR CURRENT AND PREVIOUSLY LINKED ACCOUNTS FOR ALL FEE AMOUNTS OWED TO BREX. PLEASE READ IT THOROUGHLY." **"PREVIOUSLY LINKED"** is the consequential word, and it is in the shouted sentence rather than buried.

### Prohibited-use disclosure enforced at the till `[observed]`

The Platform Agreement's prohibited activities are surfaced as a **card decline reason**, not just a contract clause: "Transactions at businesses related to activities that our Platform Agreement prohibits will be declined. This is expected, as Brex cards cannot be used at businesses that deal with weapons, marijuana and cannabis, illegal services, and any other restricted industries listed in our Platform Agreement." Contract terms rendered as an explained decline.

Travel is scoped the same way: "Per our Platform Agreement, Brex travel can only be used for business-related travel. You cannot book Black car service or premium transportation—such as limousines, professional chauffeurs, etc.—using Brex travel."

### Insurance disclaimed to the network `[observed]`

> "Brex does not provide rental car insurance. If you pay for a rental with an eligible Brex Mastercard, you may be eligible for Mastercard's MasterRental Insurance Coverage. **This coverage is offered and administered solely by Mastercard, not Brex.** For full eligibility requirements, exclusions, and claim instructions, see Mastercard's MasterRental Insurance Coverage."

Negate, then name the actual provider, then disclaim administration, then route to the authoritative terms. Four moves in four sentences.

The adjacent rental-car disclaimer is a full italic paragraph explaining that rental agencies require a physical card matching the driver's licence, that holds will be placed, and that debit cards may be declined — **a third-party operational reality disclosed inside a booking help article** because it will otherwise ruin someone's trip.

And a flat product-absence statement: "Brex cards **don't** include airport lounge access. There's no lounge membership, day pass, or complimentary entry tied to your Brex card, and lounge visits aren't covered as a card benefit." Three ways of saying no, then the workaround (transfer points to an airline partner). **Publishing what a premium card does not include** pre-empts a common assumption.

### Security and compliance claims `[observed]`

"Brex is SOC 1 Type I and SOC 2 Type II compliant, and PCI-DSS Level 1 compliant, with regular independent third-party audits. Brex also fulfills applicable security and control requirements aligned with FINRA, IT General Controls (ITGC), and the New York Department of Financial Services (NYDFS), among other regulatory frameworks."

Note the careful verb: **`fulfills applicable ... requirements aligned with`** for FINRA/ITGC/NYDFS, versus `compliant` for SOC and PCI. The hedge distinguishes an audited certification from alignment with a framework, and the distinction is legally meaningful.

Segregation of duties is disclosed as a conditional feature: "**If enabled by Brex**, guardrails on self-approvals (segregation of duties) help keep your team's compliance on track by blocking requesters from approving their own expense request ... **provided there are two or more admins on your Brex account.**" Two conditions on a control most finance teams would assume is always on.

## T11 Help-centre architecture `[observed]`

**Weakest area of the Brex content estate, and the contrast with the article quality is stark.**

`support.brex.com` redirects to `/support`, which is headed `Help Center` with the subhead "Get answers to all of your questions regarding Brex" — then presents `Popular Articles` and renders several full articles inline on the same page. **No category tree, no search box in the extracted markup, no breadcrumbs.** Category pages such as `/support/expense-management` exist but were reachable only via web search.

One category page carried a visible pipeline error in its rendered output: "**Note:** This content was automatically generated from the HTML page because structured content was not available."

**The `Expense management` category, eight article cards with excerpts** `[observed]` — and the excerpts are the useful artefact, because each is the article's own opening sentence:

| Article | Excerpt opens with |
|---|---|
| `Approval chains` | "You can set different approval rules through your policy for many of the actions your team will take using Brex." |
| `Policy Rule Builder` | "Brex's Policy Rule Builder is our powerful yet easy-to-use policy solution..." |
| `Managing vendors` | "For vendors that you regularly send payments to, you can add them into a virtual address book..." |
| `Compliance rating` | "When creating budgets for your team, you can set certain parameters..." |
| `Setting documentation submission deadlines` | "To ensure timely completion of expenses, you can set deadlines..." |
| `Expense filters` | "Below are all the filter options you can use in your dashboard's Expenses or Wallet page." |
| `Reporting for your Brex account` | "It's important to keep up to date on your team's usage of Brex." |
| `Monitor your spend` | "You can monitor your company's spend and money movement..." |

**Using the first sentence as the card description** is cheap and works here because Brex's articles consistently open with a definition or a purpose statement. The `Policy Rule Builder` excerpt is the exception and the weakest — "our powerful yet easy-to-use policy solution" is marketing copy where the others are functional.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| Gerund + object | `Managing your expenses`, `Managing vendors`, `Setting documentation submission deadlines`, `Submitting bank statements for your credit limit` |
| Bare noun phrase | `Approval chains`, `Expense filters`, `Expense policies`, `Compliance rating`, `Employee repayments`, `Brex Notifications` |
| `X and Y` compound | `Declines and failed expenses` |
| `How X works` | `How Brex credit limits work` |

The bare-noun-phrase shape dominates, which suits a reference-heavy help centre being read by administrators configuring something rather than users fixing something. `Expense filters` is a pure reference document and is titled as one.

**Article internal structure is highly consistent**: `## Overview` → numbered `**Step 1:**` sequences → `**Note:**` callouts → occasional embedded video. Steps are bolded and italicised UI labels are used for navigation paths (`_Cards and limits_ > _Manage policies_`). The `**Note:**` callout is the workhorse — used for warnings, exceptions, scope limits, and security instructions alike, with no visual differentiation between a minor caveat and "never send your full card number".

**Plan gating is encoded as an HTML comment** in the rendered source (`<!-- plans: Essentials -->`, `<!-- plans: Premium, Enterprise, Smart card -->`, `<!-- plans: Early access -->`). In the live page these presumably drive tabbed variants; in the extracted output they are invisible to the reader, so the article shows both Essentials and Premium instructions consecutively without an obvious break. **Worth flagging: entitlement is conditionally rendered rather than stated in text**, the opposite of Ramp's explicit `> Available on Ramp Plus.` banner. When the conditional rendering fails, the reader gets two contradictory step-lists.

**Roles are referenced through a repeated hyperlinked phrase**: "account admins, card admins and any other users with the [specific product capability]" — appearing 20+ times across the harvested articles, nearly verbatim each time. It is accurate and unreadable. The underlying problem is a permissions model too granular to name in prose; the chosen solution is to name the two common roles and link out for the rest. **Recorded as an honest trade-off with a real readability cost.**

**Community as a support tier** `[observed]`: `Brex Community` with a `support forum`, a `suggestion box`, an advocate programme (`Brex Blazers`), and published posting guidance — "Draft a clear and concise title that summarizes your issue or question", "Include relevant context, steps you've taken, and any error messages", "Respond promptly to any follow-up questions". Plus a behavioural norm: "**When participating in the Brex Community, please remember to communicate kindly and respectfully.**" and a closing-the-loop instruction: "Once your issue is resolved, it's helpful to update your post and include the resolution in case others have similar issues."

`Chat` appears as a persistent element at the foot of the support page — live chat as the always-available fallback, consistent with the `24/7 live support` pricing-matrix line present on all three plans.

## T12 FAQs

### Spend-management FAQ `[observed]` — 15 questions, category-level rather than product-level

| # | Question (verbatim) |
|---|---|
| 1 | What is spend management software? |
| 2 | What is the difference between spend management and expense management? |
| 3 | What does spend management software do? |
| 4 | Does spend management software integrate with accounting software? |
| 5 | Is spend management software secure? |
| 6 | Can spend management software issue virtual cards? |
| 7 | How does spend management software help with budgets? |
| 8 | How does spend management software enforce spending policies? |
| 9 | Can spend management software set spending limits? |
| 10 | How does spend management software save money? |
| 11 | Does spend management software support bill pay? |
| 12 | How long does it take to implement spend management software? |
| 13 | Can spend management software scale with company growth? |
| 14 | What types of companies use spend management software? |
| 15 | Does spend management software provide real-time visibility? |

**Fourteen of fifteen questions are about the category, not about Brex.** The phrase "spend management software" appears in every single one. These are search-intent questions, and the answer structure is uniform: two or three sentences defining the category generically, a paragraph break, then "Brex..." — the product introduced only in the second movement.

This is a clean, if cynical, pattern: **answer the generic question honestly first, then position.** Q2 (`What is the difference between spend management and expense management?`) is the strongest, because the distinction is real and the answer draws it precisely ("Spend management takes a proactive approach to controlling costs *before* they occur, while expense management typically tracks costs *after* money is already spent") before claiming the broader category.

Compare the business-account FAQ, which is written for a buyer rather than a search engine.

### Business-account FAQ `[observed]` — 15 questions, genuinely buyer-shaped

| # | Question (verbatim) |
|---|---|
| 1 | How do I open a Brex business banking account? |
| 2 | How is Brex different from a traditional business bank account? |
| 3 | Where is my cash actually stored? |
| 4 | Are my deposits FDIC-insured? |
| 5 | What do I need to open a business banking account? |
| 6 | Can I apply for an account if I'm not physically in the United States or a United States resident? |
| 7 | How much does a Brex business account cost? |
| 8 | Is Brex the best business checking account for startups? |
| 9 | What are the key factors to consider when choosing a startup bank? |
| 10 | How does Brex's treasury account help my business earn yield? |
| 11 | What makes Brex one of the best business banking options for growing companies? |
| 12 | How can you open a Brex business account in just minutes? |
| 13 | Does Brex offer invoicing? |
| 14 | Does Brex offer a business treasury account? |
| 15 | How does Brex compare to a traditional business checking account? |

**Q3 is the standout: `Where is my cash actually stored?`** The word `actually` is doing exactly what Mercury's `really` does in `Are ACH and domestic wires really free?` — it writes the user's scepticism into the question. A prospect who has read "Brex is not a bank" wants to know where the money physically is, and Brex asks that question in the prospect's own suspicious register, then answers it with a custody chain.

Q4 (`Are my deposits FDIC-insured?`) is answered **per sub-account**, refusing to give a single yes/no to a question that has three different answers.

Q6 is long-form and specific about a real eligibility edge (non-US founders). Q1 and Q12 are near-duplicates (`How do I open...` / `How can you open ... in just minutes?`) and so are Q5 and Q12's answers — the same four-item requirements list appears twice verbatim. Q8, Q9, Q11 and Q15 are competitor-comparison questions phrased as neutral advice ("What are the key factors to consider when choosing a startup bank?") — the answer is entirely about Brex. **Recorded as a negative finding**: a question shaped as impartial guidance, answered as a pitch.

### In-help FAQ shapes `[documented]`

The support articles use section headings rather than Q&A, with two exceptions worth noting: `How is my rating calculated?` (an in-product link from the compliance score) and `Who can do what` (a role-permission section heading in `Employee repayments`, under which two roles are listed with their exact capability). `Who can do what` is a good, plain heading for a permissions block.

## T13 Terminology & glossary

| Term | Brex's usage | The alternative it rejected |
|---|---|---|
| `expense` | **The universal object.** A card swipe, a reimbursement, a repayment and a bill all become "an expense entry" | separate objects per type |
| `Expenses` vs `Wallet` | Admin view of others' spend vs first-person view of your own | a role toggle on one page |
| `spend limit` | The allocation primitive attached to cards, trips, and requests | "budget" (reserved for the parent object) |
| `Live Budgets.™` | **Trademarked** top-level budget product with delegation and hierarchy | "budgets" |
| `Vault` | The FDIC-sweep sub-account | "insured cash sweep" |
| `Treasury` | The money-market sub-account | "investments" |
| `Checking` | The Column N.A. deposit sub-account | |
| `Brex business account` | The umbrella over all three | "bank account" (deliberately avoided) |
| `Brex Assistant` / `Brex AI` | The assistant and the capability, named separately | |
| `Policy Rule Builder` / `Policy Engine` | **Two names for the policy system** in the same article | |
| `compliance rating` | Employee-level `High`/`Medium`/`Low` score | "score", "compliance percentage" |
| `Not compliant` | A named view on the Expenses page | "out of policy" (used in prose, not as a label) |
| `flagged expense` | AI-surfaced anomaly, explicitly not an accusation | "violation", "suspicious" |
| `guided reviews` | The AI-assisted review mode | "smart review" |
| `approval chain` | "a string of individuals that need to approve something" — defined in the article | "workflow", "routing" |
| `reporting pyramid` | Transitive org hierarchy (`All my reports`) | "org tree" |
| `itemize` / `unsplit` | **Asymmetric verb pair** for split and un-split | "split" / "merge" |
| `repayment` | Employee returning money to the company | "payback", "clawback" |
| `Mark as paid` | Out-of-platform settlement tracking | "settle externally" |
| `Override additional requirements` | Admin bypass of approvers and documentation | "force approve" |
| `pre-authorized expense` | Network concept glossed with the hotel example | suppressing it |
| `allowlist` | Scare-quoted on first use (`"allowlist"`) then used plainly | "whitelist" |
| `Smart Card` | A fourth plan, "For companies that want to simplify procurement" | "P-card" (appears once in a plan-gating comment as `P-card`) |
| `Day Zero Stack` | Coined name for the startup partner-perks bundle | "startup perks" |
| `Brex Blazers` | Customer advocate programme | |
| `program banks` | The sweep network members | "partner banks" (also used — **both terms appear**) |
| `duty of care` | Travel-safety obligation, listed as a pricing-matrix feature with no gloss | |
| `Sunshine Act` | US healthcare-payments reporting, a pricing line item with no gloss | |

**`itemize` / `unsplit` is a real defect.** The forward verb is `Itemize this expense`; the reverse is `Unsplit expense`. Two different metaphors (itemisation vs splitting) for one operation and its inverse, and the help article uses both words in adjacent paragraphs ("you can split a single expense into individual line items"; "Expenses that have been split can be reversed"). The correct pair is either itemize/un-itemize or split/unsplit.

**`Policy Rule Builder` vs `Policy Engine`** appear in the same paragraph of `/support/policies`: "Brex is updating our Policy Engine and you may have access to new features. Please read this article on the upcoming changes" — linking to an article titled `Policy Rule Builder`. A migration in progress, visible in the vocabulary.

**`program banks` and `partner banks`** are both used for the same sweep-network members across the business-account FAQ.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the reader, first-person plural for Brex ("We'll send weekly reminders", "we can't allowlist a merchant preemptively", "We may ask you to provide written documentation", "Brex doesn't set your company policy"). Brex also uses its own name as subject heavily in help content ("Brex enforces these rules automatically", "Brex prints and mails the check"), and the effect is a slightly more distant, institutional voice than Mercury's or Ramp's.

**Register gradient**, shallower than the other two products in this set:

- *Marketing*: plain corporate imperatives, no wordplay — `Control spend before it happens.`, `Finance built for speed and control.`
- *Help*: procedural, dense, heavily conditional, permission-qualified
- *Community*: the warmest register on the site — "A positive community encourages collaboration!", "please remember to communicate kindly and respectfully"
- *Legal*: all-caps blocks, defined terms, carve-outs

Exclamation marks are essentially absent from marketing and help; the two observed are both in community and FAQ answers ("Your input is invaluable!", "it comes with your account!").

**Readability is the main weakness.** The repeated role construction — "Account, card admins and any other users with the [specific product capability] can..." — front-loads a 12-word permissions clause before the verb in dozens of sentences. It is accurate and it is a wall. A better pattern would state the permission once per article in a `Who can do what` block (which `Employee repayments` actually does) and then write plainly.

**Sentence-level habits**: `**Note:**` is the universal callout, used at four different severities. Em-dashes used for mechanism clauses. UI paths rendered in italics with `>` separators. Numbers specific rather than rounded (`756 hours`, `4.36%`, `$6M`, `4-6 business days`, `six seconds`, `5, 14, and 30 days`).

**Explanation-by-example is the house strength.** The tip-changes-the-cleared-amount example, the hotel pre-authorisation example, the room-upgrade itemisation example ("your company may cover the employee's hotel room, but the employee might choose to upgrade their room"), the authenticator-clock example. Each replaces a mechanism explanation with a situation the reader has lived through.

**Accessibility content** `[observed]`

- **No `Skip to content` link observed** on marketing pages or support articles. `[absent]`
- **No accessibility statement or VPAT found.** Searched pricing, product pages, support, and the Platform Agreement. A `Security and privacy center` is listed as a pricing-matrix feature and `brex.com/trust` is linked from the business-account page; neither was fetched and either may host one. `[absent]` pending that check.
- **Alt text is the weakest observed in this corpus sample.** Nearly every image carries its **internal asset filename** as alt:
  - `alt="HP Hero Desktop"`, `alt="HP-Tile-1"` through `alt="HP-Tile-5"`, `alt="BUI-Homepage-volley1"` … `volley5`, `alt="Banking-noYield-v2"`, `alt="Pricing-logos-desktop"`, `alt="banking_timeline"`, `alt="2_LP_Volley_Checking_hb"`, `alt="Fall release_pre-footer"`, `alt="CX - Flagged Expenses 03"`, `alt="HC - Brex Community 01"`, `alt="HC - Bill Pay & Expense Policies"`
  
  These are CMS asset names, not descriptions. A screen-reader user hears "BUI Homepage volley 3" where a sighted user sees a product screenshot. The five homepage product tiles — the primary IA of the page — are `HP-Tile-1` through `HP-Tile-5`. **This is a systematic failure across the whole site, not a handful of misses**, and it contrasts sharply with Ramp's descriptive help-centre alt text and Mercury's interpretive marketing alt text.
- Video assets are embedded as `.mp4` links with the same filename-alt convention (`alt="HP-SmartestCorpprateCard_Optimized"` — note the typo `Corpprate` in a customer-visible attribute).
- One YouTube embed appears in `Approval chains` with alt `YouTube Video` and no transcript, caption note, or summary of its content.
- The homepage carries a block of **~35 consecutive empty lines** in the extracted output where an image gallery sits, suggesting a set of images with neither alt text nor content.
- `Opens in new tab` markers not observed; extensive external links (OFAC, FINRA BrokerCheck, SIPC, FSB, Dreyfus prospectus, BNY) are unannotated.
- **Positive**: the `Expense filters` article is, functionally, an accessible plain-text reference for the entire status vocabulary — a screen-reader user can read every state and its definition as structured text without touching the filter UI. Publishing the taxonomy as prose is an unintentional accessibility win.

**Negative findings, recorded honestly**

- **Alt text is asset filenames site-wide** — the most serious accessibility defect in this corpus sample.
- No skip link, no accessibility statement found.
- The `Rates & Fees Schedule` renders with no fee values.
- `up to 30x higher credit limits` (homepage) vs `up to 40x higher limits` (business account) for the same claim.
- `24 program banks` vs `20+ program banks` in the same FAQ set.
- `program banks` and `partner banks` used interchangeably.
- `Policy Rule Builder` and `Policy Engine` for one system.
- `itemize` / `unsplit` verb mismatch.
- `Try Brex for free` vs `Open an account` for adjacent plan cards.
- Three bare `Learn more` links in one Solutions row.
- `Enterprise` heading over an `Enterprises` label in one card.
- A support category page carrying a visible content-pipeline error notice.
- `support.brex.com` has no category tree, no breadcrumbs, and no visible search.
- Plan gating rendered as HTML comments, so a rendering failure shows two contradictory instruction sets consecutively.
- The `specific product capability` phrase repeated 20+ times verbatim.
- Competitor-comparison FAQs phrased as neutral advice.
- `Brex Treasury LLC` described differently in the Platform Agreement and on the business-account page.
- `hidden fees` used as a fee category in a no-fees list.

---

## Transferable patterns

1. **Split status into orthogonal axes and name every value.** Brex's expense has six independent statuses — approval, payment, documentation, compliance, dispute, user — each with defined values published on one page. Most products flatten these into one field and then need a support article to explain why an "Approved" expense is unpaid. Applies directly to any object that passes through both a human workflow and a money rail.
2. **Say that approval does not move the money.** "A denial does not automatically reverse the charge — if the spend has already occurred on a Brex card, the employee may need to initiate a repayment." One sentence that prevents a whole class of approver misunderstanding. Mandatory for any post-hoc review flow.
3. **Define a destructive state by its reversibility.** `Deleted` — "cannot be reactivated". `Disabled` — "can be reactivated". Both definitions end there, because that is the only difference that matters.
4. **"This is expected."** For a decline or block the system caused deliberately, say so. It stops the retry loop and the support ticket, and it distinguishes policy from failure.
5. **Publish the undo window.** "You have six seconds to click *Undo*", plus the named escalation for when it lapses. A number the user can plan around beats an unspecified "briefly".
6. **Pair every notification with its intended action.** Brex's notification article is structured `Notifications:` / `Action to Take:` throughout. It converts a catalogue into a responsibility map, and it forces the writer to justify every alert.
7. **Let the benign case resolve from the notification.** Fraud-lock alert: recognise the charge → unlock the card from the alert; don't recognise it → dispute. The common path never enters the dashboard.
8. **Decompose the bundle in the disclosure even when the product presents as one thing.** Checking / Treasury / Vault — three providers, three protection regimes, named separately, with per-sub-account answers to "Are my deposits FDIC-insured?".
9. **Put the user's scepticism in the question.** `Where is my cash actually stored?` — the `actually` earns the answer. Same move as Mercury's `really free?`.
10. **Tell the reviewer the flag is not an accusation.** "A flagged expense doesn't automatically mean the expense should be denied, or that the employee was acting maliciously." When a model surfaces someone's behaviour to their manager, the copy must de-escalate the signal, and must admit the model's limits ("OCR ... isn't 100% accurate").
11. **Explain a confusing state with its commonest real cause, not its mechanism.** The restaurant tip explains why a cleared charge exceeds the pending one better than any description of authorisation and capture.
12. **Name the edge of your own authority.** "Brex doesn't set your company policy. If a repayment is declined or unpaid, follow your internal policy outside the Brex platform." For any tool mediating between an employer and an employee, saying where the software stops is a content-design responsibility.
13. **Bold the criterion, then the failure case.** The statement-upload spec (`Complete:` "Statements with missing pages will not be accepted") is faster to scan and harder to misread than prose requirements.

## Caveats & gaps

- **All in-product status vocabulary is `[documented]`, not observed.** Every value in T6 comes from the `Expense filters` article and other help bodies. Confidence is unusually high because the filter article publishes definitions verbatim, but these remain documentation-of-UI.
- **Fee figures could not be retrieved.** The `Rates & Fees Schedule` returned table rows with empty value cells. This is likely a client-side rendering dependency rather than an absence of published fees; an authenticated or JavaScript-executing pass would be needed. **No fee figure appears anywhere in this file** because none was observed, and none has been inferred.
- **Help-centre category tree not reachable.** `support.brex.com` redirects to a "Popular Articles" page. Category pages were found by search, not by navigation, so the true top-level IA of the help centre is **unknown** rather than absent. The list of categories in this file is partial.
- **`brex.com/trust` and the `Security and privacy center` were not fetched** — either may host the accessibility statement, SOC reports, or subprocessor list not found elsewhere.
- **Platform Agreement read only in part** — definitions, liability, warranty, governing law, and arbitration sections were sampled by targeted search; the full agreement (494 lines in extraction) was not read end to end. The Brex Business Account Customer Agreement, the Brex Cash partner-bank list, and the prohibited/restricted activities page were identified but not opened.
- **Error-message strings are absent.** Brex documents that a decline reason and a failure reason appear in a banner and a detail pane, but the reason strings themselves are behind auth.
- **Empty states: nothing found.** `[absent]`
- **No public status or incident page found.** Not linked from any page inspected; not marked absent, only not-found.
- **Only US-facing surfaces.** Multi-language dashboard support and 50+ country card issuance are claimed but no localised page was sought.
- **Mobile app copy not harvested** beyond the mobile paths quoted in help articles.
- Alt-text findings are from extracted markup; the block of empty lines on the homepage may be an extraction artefact rather than genuinely unlabelled images. The systematic filename-as-alt pattern, however, is consistent across 15+ distinct attributes and is not plausibly an artefact.
- The `Brex Treasury LLC, a Capital One Company` phrasing is recorded exactly as it appears in the Platform Agreement definitions. No corroboration was sought and none should be inferred from this file.

## Sources

1. https://www.brex.com/
2. https://www.brex.com/pricing
3. https://www.brex.com/product/spend-management
4. https://www.brex.com/product/business-account
5. https://www.brex.com/product/cash-management-account/rates-fees
6. https://support.brex.com/ (redirects to https://www.brex.com/support)
7. https://www.brex.com/support/expense-management
8. https://www.brex.com/support/expense-filters
9. https://www.brex.com/support/approval-chains
10. https://www.brex.com/support/managing-your-expenses
11. https://www.brex.com/support/policies
12. https://www.brex.com/support/declines-and-failed-expenses
13. https://www.brex.com/support/employee-repayments
14. https://www.brex.com/support/brex-notifications
15. https://www.brex.com/support/compliance-rating
16. https://www.brex.com/support/two-factor-authentication
17. https://www.brex.com/support/brex-credit-limits
18. https://www.brex.com/support/bank-statement-underwriting
19. https://www.brex.com/support/brex-travel-car-bookings
20. https://www.brex.com/support/brex-community
21. https://www.brex.com/legal (Platform Agreement)
