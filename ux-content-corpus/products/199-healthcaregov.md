# 199. HealthCare.gov

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Federal health-insurance marketplace (individual and family ACA coverage; also SHOP for small business) |
| Primary URL | https://www.healthcare.gov/ |
| Corpus rank | 199 |
| Benchmark strength (source list) | Eligibility and enrollment guidance |
| Locale / market observed | en-US, with a full Spanish mirror site at cuidadodesalud.gov (`og:locale:alternate: es_US`) and partial assets in 14 further languages |
| Platform observed | Web (desktop). Static Gatsby-rendered content pages; the application, plan browser and eligibility screener are client-side apps and were not entered. |
| Auth state | Unauthenticated public surfaces only. **No account created, no application started, no eligibility screener run, no income, household, health or identity information entered anywhere.** All application and in-product content is `[documented]`. |
| Regulatory posture | Operated by the **Centers for Medicare & Medicaid Services (CMS)**, HHS. Statutory basis: **Patient Protection and Affordable Care Act**. Nondiscrimination and accessibility governed by **Section 1557 of the ACA**, **Title VI of the Civil Rights Act of 1964**, **Section 504** and **Section 508 of the Rehabilitation Act of 1973**, and the **Architectural Barriers Act of 1968** — all named on the CMS notice the footer links to. Section 1557 is published as **partially enjoined**, citing *Florida v. HHS*, *Tennessee v. Becerra* and *Texas v. Becerra*. `Health Insurance Marketplace®` is a registered trademark of HHS. Enrolment windows and document deadlines are statutory. |
| Harvest date | 2026-09-22 |
| Pages inspected | 26 |
| Harvest completeness | **Partial.** Content pages harvested thoroughly. Three critical surfaces were unreadable without JavaScript: the eligibility **screener** (`/screener/`) returned an empty document shell, the plan browser (`/see-plans/`) was not entered, and a number of FAQ accordion bodies render as headings with no body in the served HTML. The homepage was read in an earlier pass; its expanded primary nav never rendered. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.healthcare.gov/ | Hero, five secondary CTAs, three feature cards, email capture |
| Glossary (index) | https://www.healthcare.gov/glossary/ | ~290 terms, A–Z with three empty letters |
| Dates and deadlines | https://www.healthcare.gov/quick-guide/dates-and-deadlines/ | The statutory calendar |
| One-page guide to the Marketplace | https://www.healthcare.gov/quick-guide/one-page-guide-to-the-marketplace/ | Six numbered sections |
| Eligibility quick guide | https://www.healthcare.gov/quick-guide/eligibility/ | Three-criterion test |
| Special Enrollment Period | https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/ | The life-event taxonomy |
| Your options outside Open Enrollment | https://www.healthcare.gov/coverage-outside-open-enrollment/your-options/ | |
| Confirm a Special Enrollment Period | https://www.healthcare.gov/coverage-outside-open-enrollment/confirm-special-enrollment-period/ | SEP document deadlines |
| Glossary: Special Enrollment Period | https://www.healthcare.gov/glossary/special-enrollment-period/ | |
| Health plan categories | https://www.healthcare.gov/choose-a-plan/plans-categories/ | Bronze/Silver/Gold/Platinum table |
| Catastrophic health plans | https://www.healthcare.gov/choose-a-plan/catastrophic-health-plans/ | The 5th category |
| Glossary: Second lowest cost Silver plan | https://www.healthcare.gov/glossary/second-lowest-cost-silver-plan-slcsp/ | |
| Lower costs | https://www.healthcare.gov/lower-costs/ | |
| Save on monthly premiums | https://www.healthcare.gov/lower-costs/save-on-monthly-premiums/ | APTC + reconciliation |
| How to apply | https://www.healthcare.gov/apply-and-enroll/how-to-apply/ | Four channels |
| Health insurance grace period | https://www.healthcare.gov/apply-and-enroll/health-insurance-grace-period/ | The worked non-payment example |
| Verify information | https://www.healthcare.gov/verify-information/ | Data matching issues |
| Documents and deadlines | https://www.healthcare.gov/verify-information/documents-and-deadlines/ | 90/95/30-day deadlines |
| Which changes to report | https://www.healthcare.gov/reporting-changes/which-changes-to-report/ | |
| Immigrants and coverage | https://www.healthcare.gov/immigrants/coverage/ | |
| Job-based coverage options | https://www.healthcare.gov/have-job-based-coverage/options/ | |
| Marketplace appeals | https://www.healthcare.gov/marketplace-appeals/ | Appealable / not appealable |
| Getting medical care | https://www.healthcare.gov/using-marketplace-coverage/getting-medical-care/ | |
| Get coverage | https://www.healthcare.gov/get-coverage/ | Four cards |
| Get answers | https://www.healthcare.gov/get-answers/ | The FAQ hub |
| Sitemap | https://www.healthcare.gov/sitemap/ | Top-level IA |
| Language resources | https://www.healthcare.gov/language-resource/ | 15 languages |
| CMS Accessibility & Nondiscrimination Notice | cms.gov (footer target) | The only accessibility surface |
| — blocked — | https://www.healthcare.gov/screener/ | Empty JS shell; no question text obtainable |

---

## T1 Navigation & IA labels

**Persistent header** `[observed]`: `Skip to main content` ·
`An official website of the United States government` · `Here's how you know` ·
`HealthCare.gov` (logo) · `Español` · `Log in` · `Menu`.

`Menu` is a JavaScript disclosure whose contents never rendered in the served HTML, so the
primary navigation could not be read. **The site's main nav is invisible to a non-JS
client.** Recorded as a defect, not a gap.

**Top-level IA, from the sitemap** `[observed]`

| Audience | Sections |
|---|---|
| `Individuals & families` | `Get Coverage` · `Keep or Update Your Plan` · `Get Answers` |
| `Small Businesses` | `Enroll in SHOP` · `Small Business Health Insurance` · `Get Answers` |
| `Connect with us` | `Questions? Call 1-800-318-2596` · `Find Local Help` |

Three sections per audience, with `Get Answers` duplicated across both — the help section is
shared, the task sections are not. The consumer tree is a **lifecycle**: get it → keep or
change it → ask about it.

Sitemap sub-groupings, verbatim: `Still need coverage? Start here` ·
`Change or update your plan` · `Customer service` · `Tax information` ·
`More details for . . .` · `Employers` · `Employees`.

`Still need coverage? Start here` is a question-plus-imperative as a navigation heading —
it self-selects the reader and then routes them in four words.

**Page-level utility, on every content page** `[observed]`:
`Email this pageEmail` · `Print this pagePrint` · `More info` · `Back to top`.
The first two render their hidden and visible labels concatenated — a defect.

**Footer — `Resources` is segmented by professional audience** `[observed]`:
`About the Affordable Care Act` · `Regulatory and Policy Information` ·
`For Navigators, Assisters & Partners` · `For Agents and Brokers` · `For the Media` ·
`For Researchers` · `For States` · `Information in other languages`.

Five of eight footer resource links are `For <professional audience>` and point off-site to
CMS.gov. HealthCare.gov keeps consumer content and pushes every professional audience to a
different domain — a clean and unusual audience boundary.

**Bottom bar** `[observed]`: `Contact us` · `Archive` · `Accessibility` ·
`Privacy settings` · `Privacy policy` · `Using this site`, then a 15-item
`Language resources` list, then the trademark and agency lines.

`Archive` as a footer link is notable — the site publishes its own superseded content.

## T2 Value proposition & headline patterns

**Homepage H1** `[observed]`

> `Welcome to the Health Insurance Marketplace®`

A welcome plus a registered trademark. No benefit, no number, no verb — like NHS and
Canada.ca, a statutory monopoly writes an identity statement. The ® is carried in the H1,
the `<title>`, the meta description and the footer legal line.

**H1s elsewhere are task labels; H2s and accordions carry the user's question** `[observed]`

Task H1s: `How to apply & enroll` · `When the Marketplace needs more information` ·
`Health plan categories: Bronze, Silver, Gold & Platinum` · `Verify in person`
User-question H2s: `Are you eligible to use the Marketplace?` ·
`When can you get health insurance?` · `Who can get Marketplace coverage?` ·
`How do I pick a plan category?` · `What can I appeal?` · `What can't I appeal?` ·
`Need health insurance?` · `How can we help you?`

**`When the Marketplace needs more information`** is the best H1 on the site. The underlying
concept is a "data matching issue" / "inconsistency" — two pieces of regulatory jargon the
page introduces only later, in scare quotes. The heading describes the *situation from the
system's side in plain words*, avoiding both the jargon and the accusation.

**Section headers on the one-page guide are numbered and dated** `[observed]`:
`1. Open Enrollment is November 1 - January 15` — the heading itself carries the deadline.

**Estimate hedging is the site's signature construction** `[observed]`. Almost every
cost claim is bounded in the same sentence or the next:

- "You'll get exact plan prices and savings when you fill out a Marketplace application."
- "(**Savings are based on your income estimate for the year you want coverage, not last year.**)"
- "Enter your household size and estimated income to get an idea of what you might save. You'll find out exactly how much you'll save when you apply because the application asks for more details."
- "*The percentages listed are estimates of the plan's share and your share of costs when you get covered services. The actual costs you pay vary by plan.*"
- "Review plans in different categories to see how the plan's share of costs can adjust the estimate for your total yearly costs."

The structure is identical to Wise's claim-bound-personalise: **give a figure → say it is an
estimate → name the thing that will make it exact.** Here the "thing" is always the
application, which is also the conversion goal, so the hedge doubles as a CTA.

## T3 CTA inventory

| CTA (verbatim) | Context |
|---|---|
| `Apply for coverage` | Homepage hero, primary |
| `Get Marketplace basics` | Homepage |
| `Log in to make changes` | Homepage |
| `Browse plans & costs` | Homepage |
| `Find local help` / `Find Local Help` / `Find Local Help/Have agent-broker call you` | Homepage, how-to-apply, footer, get-answers — four forms |
| `Get small business coverage info` | Homepage |
| `Check if you can enroll now` | Homepage |
| `Discover how to submit documents` | Homepage |
| `Learn how to report changes` | Homepage |
| `Check if you qualify.` / `Check if you qualify` / `Check if you may qualify.` / `Check if you might qualify for savings before you apply.` | Four labels, one destination (`/screener/`) |
| `Check if you might save.` | One-page guide |
| `Preview plans and prices.` / `Preview plans` | Multiple |
| `Apply now` | One-page guide |
| `Create account` | How to apply |
| `Start paper application` (PDF, 1.26 MB) | How to apply |
| `LOG IN TO UPLOAD YOUR DOCUMENTS` | Verify information — **the only all-caps CTA on the site** |
| `Upload documents` | Documents and deadlines |
| `Check how to appeal` | Appeals |
| `Sign up for emails` | Dates and deadlines |
| `Download a checklist` (PDF, 251 KB) | Dates and deadlines |
| `Update your application` | Save on monthly premiums |
| `Continue` | Email-capture submit; also the third-party interstitial |
| `Cancel` | Third-party interstitial |
| `Answer a few questions to find out when and how to cancel your plan.` | Get answers — a full sentence as a link |
| `Back to glossary` / `Back to top` | Glossary; all pages |

**Three dominant link grammars** `[observed]`:
`Get + noun phrase` — `Get more details about COBRA coverage.` ·
`Get details about sending documents.` · `Get steps on how to report changes.` ·
`Get more details to estimate your total yearly costs`
`Learn + clause` — `Learn more about extra savings` · `Learn about cost-sharing reductions.` ·
`Learn how to appeal a Marketplace decision.` · `Learn what to do when you move out of state.`
`Discover + clause` (rarer) — `Discover what Marketplace plans cover.` ·
`Discover ways to get coverage if you don't qualify for the premium tax credit.`

Almost every link ends in a full stop, including ones inside sentences. There is **no bare
`Learn more`** anywhere.

**Defect** `[observed]`: the single most load-bearing CTA on the site — "Check if you
qualify" to the eligibility screener — appears under **four different labels** from at least
six pages, and the destination is an empty document without JavaScript.

## T4 Onboarding & getting-started — `[documented]`

**The one-page guide is the onboarding artefact: six numbered sections** `[observed]`

1. `Open Enrollment is November 1 - January 15`
2–6 cover who can get coverage, what to gather, applying, choosing, and paying. The guide's
closing item states the payment model explicitly: "When you have Marketplace insurance,
you'll pay your monthly premiums directly to the insurance company — not to the
Marketplace." A mechanism sentence that pre-empts the most common post-enrolment support
call.

**Four application channels named** `[observed]`, with the paper route given a stated SLA:
online (`Create account`), phone (`Questions? Call 1-800-318-2596`), in person
(`Find local help`, `Find a partner`), and paper — `Start paper application` (PDF, 1.26 MB),
with "You'll get eligibility results in the mail within 2 weeks."

**Preparation content is a named artefact** `[observed]`:
`Use this checklist to gather what you'll need to complete your application` and
`Download a checklist` (PDF, 251 KB). Also
`What should I do before I start a Marketplace application?` as an FAQ.

**Identity-verification and document steps are documented, not entered** `[documented]`:
the in-person route, the upload route, the acceptable-file constraints, and the
`Marketplace account` → `Messages` → `Your applications` → `Application details` →
`Upload documents` navigation path.

## T5 Eligibility question & form design — **PRIORITY**

### The screener could not be read — and that is the finding

`https://www.healthcare.gov/screener/` returns a document containing only a `<title>` and a
viewport meta tag. **The first question and its answer options are not obtainable without
JavaScript.** Six or more pages link to it as the primary eligibility entry point.
`[absent]` — and simultaneously the single most significant accessibility and content
defect found on this site.

### Eligibility criteria as written on the public pages `[observed]`

Under `Are you eligible to use the Marketplace?`, the lead-in is `you must:` followed by
three bullets:

- "Live in the United States (U.S)."
- "Be a U.S. citizen or national, or be lawfully present non-citizen in the U.S."
- "Not be incarcerated."

Three criteria, three sentences, terminal full stops, imperative-infinitive form completing
the lead-in. The one-page guide compresses the identical rule into a single sentence:
"you must live in the United States, be a U.S. citizen or national (or be lawfully present),
and not be incarcerated." **The same statutory test rendered twice, at two lengths, for two
scan depths.** That is a deliberate content-reuse decision worth copying.

Note the typo in bullet 1 — `(U.S)` with a missing period — and the ungrammatical "be
lawfully present non-citizen" in bullet 2 (missing article). Two defects in a three-bullet
statutory eligibility test.

### The conditional-declarative pattern

`[observed]` Public eligibility content is overwhelmingly **second-person declarative with a
condition**, not interrogative:

- "You may qualify for a Special Enrollment Period if in the past 60 days you or anyone in your household:"
- "If available in their area, Catastrophic plans are a 5th category available to people: Under 30 years / Who qualify for a hardship or affordability exemption"
- The recurring frame across the SEP pages is *You may qualify … if …* followed by a bulleted condition list — a hedged outcome, then the test. (Paraphrased shape, not a quoted string.)

The lead-in `You may qualify for a Special Enrollment Period if in the past 60 days you or
anyone in your household:` does four things in one clause: names the outcome, hedges it
(`may`), states the window (`in the past 60 days`), and widens the scope beyond the reader
(`you or anyone in your household`). Household scope is the most commonly missed
qualification in benefits eligibility, and it is handled in four words.

### Negative eligibility is written explicitly, and at length

`[observed]` This is the strongest eligibility pattern on the site. The SEP page spends
substantial word count on **what does not qualify**, in bold:

- "Divorce or legal separation without losing coverage doesn't qualify you for a Special Enrollment Period."
- "Moving only for medical treatment or staying somewhere for vacation doesn't qualify you for a Special Enrollment Period."
- "Voluntarily dropping COBRA **doesn't** count. Choosing to stop paying COBRA premiums on your own doesn't qualify."
- "You **don't** qualify for a Special Enrollment Period if you lose: Medicare Part A because you didn't pay your Medicare premium."

Each negative names the **near-miss case** — the thing a reasonable person would assume
counts. Divorce that doesn't cost you coverage; moving for a holiday; ending COBRA
yourself. Eligibility copy that only lists qualifying cases silently admits every near-miss;
this names them.

### Attestation

`[observed]` "When you apply, you must attest (agree) that the information you provide on
the application is true, including what qualifies you for a Special Enrollment Period."
The legal term is glossed inline in parentheses — `attest (agree)` — the site's standard
device.

### Answer-option labels `[documented]`

Only three sets were recoverable, all quoted inside help content:
`use all, use some, or use none` (how much APTC to apply);
`Report a change in my household income, size, in-state address, or other information`
(a radio label, in first person); and the tab set on `Get answers` —
`Top questions` · `Apply & enroll` · `Update or change coverage` · `Costs & savings`.

## T6 Status & state language

`[observed]` / `[documented]`

| State / term | Notes |
|---|---|
| `eligible` / `not eligible` / `no longer eligible` / `lose your eligibility` | |
| `Eligibility Notice` | Capitalised — the notice object, and the thing the 90-day appeal clock runs from |
| `Eligibility Results` / `eligibility results` | The screen, capitalised inconsistently |
| `data matching issue` / `inconsistency` | Introduced together, both in scare quotes: "(This is sometimes called a \"data matching issue\" or \"inconsistency.\")" — and only on one page |
| `enrolled` / `automatically re-enrolled` | |
| `grace period` | "A short period after your monthly health insurance payment is due to pay all owed premiums to avoid losing coverage." |
| `retroactive` coverage | "This is called \"retroactive\" coverage." |
| `cancel` vs `end` | **A deliberate two-verb split**: the consumer *cancels*; the plan or Marketplace *ends* coverage |
| `benefit year` · `coverage year` · `plan year` · `policy year` | Four near-synonyms, all in the glossary as separate entries |
| `attest (agree)` · `affordable` · `minimum standards` · `qualifying health coverage` | Defined terms carried as tooltips even in plain-looking sentences |

**`terminated` / `termination` was not found on any page fetched.** Nor was `pending`.
HealthCare.gov appears to avoid the insurance industry's own termination vocabulary
entirely, substituting `end` — which is consistent, deliberate, and worth copying.

## T7 Error, failure & recovery — **PRIORITY**

### 7a. Documents that don't match — the site's flagship adverse-outcome content

**The warning** `[observed]`, the only `IMPORTANT:` block found:
> "**IMPORTANT: You could lose your insurance or financial assistance** — If you're enrolled in a plan and don't send documents by the deadline in your Marketplace notice, you could lose your health coverage or savings."

**The reassurance, on the same page** `[observed]`:
> "The Marketplace won't end your eligibility for health insurance or change your savings without giving you advance notice. If you don't send acceptable documents, you'll get warning notices and a reminder phone call"

**The fallback outcome, stated rather than left implicit** `[observed]`:
> "**If you don't send the information we need, we'll use the information we have** (not what you entered on your application) to re-check your eligibility."

This is the best sentence on the site. It answers "what actually happens if I do nothing?"
with a specific mechanism, and the parenthetical — "(not what you entered on your
application)" — tells the user precisely what they lose. Most services say "your application
may be affected."

**The recovery invitation after the deadline has passed** `[observed]`:
> "Submit documents, even if you miss the deadline. You might re-qualify for savings or Marketplace coverage."

An explicit instruction to act *after* failing the deadline, with a hedged but real outcome.
Deadline content almost never does this.

**The no-documents fallback** `[observed]`: "If you don't have any acceptable documents, you
can send a letter explaining why." — with a named, downloadable artefact
(`Annual Income Letter of Explanation`, PDF, 195 KB). A structured escape hatch for people
whose lives don't produce the documents the system expects.

**Channel constraint, stated twice on one page** `[observed]`:
"We can't accept documents by email or fax."

### 7b. Missed premium payments — the worked example

`[observed]` Under the heading **`Don't risk losing coverage`**:

- "The premium payment grace period is usually **3 months**"
- "The 3-month premium payment grace period starts the first month you didn't pay, even if you make payments for the following months."
- "If you don't pay all owed premiums, you may **lose your coverage dating back to the first month you missed the premium payment**."

Then a four-sentence narrative:
> "You don't make your premium payment for May. You submit premium payments on time for June and July, but still haven't paid for May. Your grace period ends July 31, and you don't pay for May. The plan ends your coverage as of May 31."

**A worked counterexample with named months.** The retroactive-termination rule is
counterintuitive — paying June and July does not protect you — and the narrative is the
only form in which it lands. Four short sentences, one clause each, no conditionals.

And the trap, stated plainly: "You don't qualify for a Special Enrollment Period to enroll in
another plan if the plan ends your coverage for non-payment." Losing coverage for
non-payment does not unlock the usual remedy. The site says so rather than letting the user
discover it.

**Honest limit of the guidance** `[observed]`: "Check with your insurance company if they'll
pay for services during the second or third months of your grace period." The Marketplace
cannot tell you whether you are covered right now, and says so.

### 7c. Appeals — appealable and non-appealable, side by side

`[observed]` Two accordions, `What can I appeal?` and `What can't I appeal?`.

Appealable (verbatim): "Buy a Marketplace plan or Catastrophic coverage" ·
"Get financial help with Marketplace costs (including the amount you think you qualify for)"
· "Enroll in or change your Marketplace plan with a Special Enrollment Period" ·
"Get an exemption" · "If the Marketplace didn't let you know your eligibility results soon
enough" · "The date your Marketplace coverage started".

Not appealable (verbatim): "The date the Marketplace ended your coverage." ·
"Information on your tax Form 1095-A" · an insurer that "Refuses to pay a claim or ends your
coverage." · having "Filed your federal income tax return and have to pay back some or all
of the premium tax credits".

**Publishing the non-appealable list is the pattern.** It is short, specific, and it prevents
the user from spending 90 days on a route that cannot work.

**Sequencing nudge** `[observed]`: "If the Marketplace told you to submit documents to
confirm information on your application, do that first. You'll get an updated decision about
your eligibility, so you might not need to file an appeal." The service actively routes
people *away* from its own appeal process toward the cheaper remedy.

**Missed-deadline route** `[observed]`: "If it's been more than 90 days since you got your
Eligibility Notice, explain why you missed the deadline when you file your appeal." Again:
act anyway, and here is what to include.

### 7d. SEP not confirmed `[observed]`

"If your Special Enrollment Period can't be confirmed: You'll get a letter in your
Marketplace account explaining why. You can upload different documents to confirm." And the
terminal case: "If you don't provide acceptable documents about losing coverage, you won't
qualify for a Special Enrollment Period."

### 7e. Hard boundaries stated without hedging `[observed]`

> "Undocumented immigrants can't get Marketplace health coverage. They may apply for coverage on behalf of documented individuals."

Flat, unhedged, no link to alternatives. It is the only major adverse statement on the site
that offers no next step — which makes it the counterexample to the site's own otherwise
strong practice.

## T8 Empty states

`[absent]`. No search-results page, no plan-browser zero-result state, and no application
empty state was reachable. The three surfaces where an empty state would live — the screener,
the plan browser and the account — are all client-rendered and were not entered.

**Defect adjacent to this category** `[observed]`: several FAQ accordions ship as a heading
with **no body at all** in the served HTML — `Who's considered a U.S. national?`,
`What if I don't pick a plan within 60 days of moving or losing coverage?`,
`Can I submit my documents before I pick a plan?`,
`What if I'm turned down for a Special Enrollment Period, but I think I qualify?`,
`Where can I find Marketplace plans and prices?`, `How do I submit documents?`,
`What should I do before I start a Marketplace application?`,
`How do I update my income and household?`. To a non-JS client, and to any crawler, these
are permanent empty states on the FAQ hub.

## T9 Notifications & system messages

**Three named alert flavours, whose labels leak into the rendered text** `[observed]`:
`Warning:` · `Notice:` · `**IMPORTANT:**` (all caps, inline). Because the labels render as
literal prose, the content model is visible from the front end — a minor defect and a useful
tell.

**Site-wide banner at harvest** `[observed]`:
`Warning:` "Open Enrollment for 2027 coverage starts November 1."

**Email capture as the notification opt-in** `[observed]`:
`Get important news & updates` → "Sign up for email and text updates to get deadline
reminders and other important information." → `Enter your email address` → `Continue` →
`Privacy Policy`. Two channels (email and text) named, one purpose named (deadline
reminders), privacy linked at the point of capture.

**Named notice objects** `[documented]`: `Eligibility Notice` · `Marketplace notice` ·
"follow-up notices reminding you" · "warning notices and a reminder phone call" ·
"a letter in your Marketplace account explaining why" · `Form 1095-A` (with its own timing:
"may be in your Marketplace account anytime from mid-January to February 1" and "should
arrive by mail no later than mid-February").

**The third-party interstitial** `[observed]`, rendered three times per page for the social
links:
> `You are leaving HealthCare.gov.` — "You're about to connect to a third-party site. Select CONTINUE to proceed or CANCEL to stay on this site." → `Continue` / `Cancel`

Note the body says `CONTINUE`/`CANCEL` in caps while the buttons render sentence-case
`Continue`/`Cancel` — a copy/UI mismatch, repeated three times per page.

## T10 Disclosures, legal & compliance — **PRIORITY (deadlines and subsidy)**

### Deadline copy — quoted exactly, with its page

**`/quick-guide/dates-and-deadlines/`** — the full calendar, verbatim:

- "**November 1:** Open Enrollment starts — first day you can enroll in, renew, or change health plans through the Marketplace for the coming year. Coverage can start as soon as January 1."
- "**December 15:** Last day to enroll in or change plans for coverage to start January 1."
- "**January 1:** Coverage starts for those who enroll in or change plans by December 15 and pay their first premium."
- "**January 15:** Open Enrollment ends — last day to enroll in or change Marketplace health plans for the year. After this date, you can enroll in or change plans only if you qualify for a Special Enrollment Period."
- "**February 1:** Coverage starts for those who enroll in or change plans December 16 through January 15 and pay their first premium."
- "**Get coverage between January 16 and October 31** if you qualify for a Special Enrollment Period"

**The enroll-by/starts-on pair, the site's most repeated construction** `[observed]`:
"Enroll by December 15 for coverage that starts January 1" ·
"Enroll by January 15 for coverage that starts February 1" ·
"If you enroll by January 15, coverage starts February 1."

Two dates, one sentence, no arithmetic. The user never has to compute a coverage start date.
Note the same rule appears with and without a terminal full stop across pages.

**Document deadlines** `[observed]`, from `/verify-information/documents-and-deadlines/`:
- "90 days to confirm information that doesn't match our records, like your household income"
- "95 days to confirm your citizen and immigration status"
- "30 days to confirm eligibility for a loss of coverage Special Enrollment Period"

Three different clocks for three different verifications, on one page, each with its subject
named in the same line. The 95-day figure is the odd one and is stated without explanation.

**Other deadline strings** `[observed]`:
"After you pick a plan, **you have 30 days to send the documents.**" ·
"you generally have **90 days** from the date of your Eligibility Notice to ask for an
appeal." · "The premium payment grace period is usually **3 months**" ·
"You'll get eligibility results in the mail within 2 weeks." ·
"You should get a letter in your HealthCare.gov account within a couple of weeks".

### Special Enrollment Period vocabulary

**The term is always `Special Enrollment Period`, title case, never abbreviated in body
copy.** `SEP` appears only in the glossary H1 (`Special Enrollment Period (SEP)`).

**Standard gloss** `[observed]`: "A time outside the yearly Open Enrollment Period when you
can sign up for health insurance."
**Standard tooltip**: "A period of time outside of Open Enrollment when you can enroll in or
change Marketplace plans."

**The site does not use `qualifying life event` as a standalone term.** The section headings
are `Life changes` and `More qualifying changes`; the tooltip is
"**Life change** / Like getting married, new baby or dependent, moving, or losing health
coverage"; the only appearance of the full phrase is inside a COBRA sentence. So the
glossary defines `Qualifying life event (QLE)` while the consumer pages avoid it — a
deliberate jargon-avoidance that is worth noting given how universally the industry uses it.

**The life-event taxonomy as written** `[observed]`, four categories:

- **Changes in household** — "Got married." · "Had a baby, adopted a child, or placed a child for foster care." · "Got divorced or legally separated and lost health insurance." · "Died."
- **Changes in residence** — "A new home in a new ZIP code or county" · "The U.S. from a foreign country or United States territory" · "Place you attend school (if you're a student)" · "Place you both live and work (if you're a seasonal worker)" · "Shelter or other transitional housing"
- **Loss of health coverage** — "Job-based coverage, including COBRA" · "Individual health coverage" · "Medicaid or Children's Health Insurance Program (CHIP) coverage (or were denied Medicaid/CHIP)" · "Eligibility for Medicare" · "Coverage through a family member"
- **An employer offer to help with the cost of coverage** (HRA / QSEHRA / ICHRA)
- **More qualifying changes** — "Gaining membership in a federally recognized tribe or status as an Alaska Native Claims Settlement Act (ANCSA) Corporation shareholder" · "Becoming a U.S. citizen" · "Leaving incarceration" · "Starting or ending service as an AmeriCorps State and National, VISTA, or National Civilian Community Corps (NCCC) member" · "Being affected by an unexpected and uncontrollable event or natural disaster (like an earthquake, massive flooding, or a hurricane)"

Two content decisions stand out. **"Died."** is a one-word bullet in a household-change list —
blunt, and correct; euphemism there would be worse. And **"Shelter or other transitional
housing"** is listed as a residence change on equal footing with "A new home in a new ZIP
code" — the eligibility taxonomy is written to include people without a fixed address.

**Bold-the-event, plain-the-consequence** is the consistent formatting rule:
"**Got married.** Pick a plan by the last day of the month and your coverage can start the
first day of the next month." · "**Had a baby…** Your coverage can start the day of the
event—even if you enroll in the plan up to 60 days afterward."

**Window lengths, verbatim**: "in the past 60 days" / "expects to lose coverage in the next
60 days" · "(If you lost Medicaid or Children's Health Insurance Program (CHIP) coverage in
the past 90 days, you may qualify…)" · "When your COBRA coverage ends, you have 60 days to
enroll…" · "Depending on your Special Enrollment Period type, you usually have 60 days
before or 60 days following the event to enroll in a plan." · "Job-based plans must provide
a Special Enrollment Period of at least 30 days."

### Plan-category naming

**The five categories** `[observed]`:
H2: `Health plan categories: Bronze, Silver, Gold & Platinum`
"Marketplace plans are put into 4 categories (or \"metal levels\"): Bronze, Silver, Gold,
and Platinum."
"If available in their area, Catastrophic plans are a 5th category available to people:
Under 30 years / Who qualify for a hardship or affordability exemption".

**The table** `[observed]` — `Plan pays` / `You pay` / `Deductible is generally`:

| Category | Plan pays | You pay | Deductible |
|---|---|---|---|
| Bronze | 60% | 40% | High |
| Silver | 70% | 30% | Moderate |
| `Silver with extra savings` | 73-96% | 6-27% ("Depends how much savings you qualify for") | Low |
| Gold | 80% | 20% | Low |
| Platinum | 90% | 10% | Low |

Two columns saying the same thing from both sides (`Plan pays` / `You pay`) is a small,
strong decision: the complement is computed for the reader.

**The quality disclaimer is stated twice, in two wordings** `[observed]`:
"The categories have nothing to do with the quality of care you get in a plan." and
"The name of a plan category has nothing to do with its quality of care." The site named its
tiers after precious metals and then has to spend words undoing the implied ranking —
a cautionary tale about metaphorical tier naming.

**Catastrophic plans** `[observed]`: "Catastrophic health plans have low monthly premiums
and very high deductibles." · "They may be an affordable way to protect yourself from
worst-case scenarios, like getting seriously sick or injured." · Eligibility under
`Who can get a Catastrophic plan`: "People under 30 years" / "Others who qualify for a
hardship exemption or affordability exemption" · "Catastrophic plans might not be available
in all areas." · Coverage floor: "They also cover at least 3 primary care visits per year
before you've met your deductible."
And the **nudge away from the product**: "If you qualify for the premium tax credit or
cost-sharing reductions, a Bronze or Silver plan may be a better value. Be sure to compare."

**`Second lowest cost Silver plan (SLCSP)`** `[observed]`: "The second-lowest priced
Marketplace health insurance plan in the Silver category that applies to you. **It may not be
the plan you enrolled in.**" The second sentence pre-empts the exact misunderstanding the
term generates. The concept lives only in the glossary and tax content; it does not appear
on the plan-categories page.

### Subsidy explanation

**Names in use** `[observed]`: `premium tax credit` (primary, lowercase) ·
`advance payment of the premium tax credit` · `cost-sharing reductions` ·
`extra savings` · `savings` · `lower costs` · `financial help with Marketplace costs`.

**The abbreviations `APTC` and `CSR` do not appear anywhere in consumer copy.** Neither does
`FPL`, `MEC`, `EHB`, or `ACA` in body text — the site writes "the Affordable Care Act" in
full. This is a deliberate and near-total acronym ban on the consumer surface, in a policy
area saturated with them.

**The plain-language substitution is made visible in the tooltip itself** `[observed]`:
"**Extra savings/Cost-sharing reductions** / A discount that lowers the amount you have to
pay for deductibles, copayments, and coinsurance". The tooltip **yokes the plain term to the
regulatory term with a slash**, so the user learns both and can map one to the other. That
is a genuinely good glossary pattern.

**APTC explained without the term** `[observed]`, in order:
1. "When you apply for Marketplace coverage, you'll find out if you qualify for the premium tax credit that lowers your premium."
2. "You can use some, all, or none of the tax credit each month."
3. "The Marketplace will send the tax credit directly to your insurance company, so you'll pay less each month. This is called taking an \"advance payment of the premium tax credit.\""

Mechanism first, name last, name in scare quotes. The same structure is used for
reconciliation: "If at the end of the year you've used more advance payments of the premium
tax credit than you qualify for, you'll have to pay the difference back when you file your
federal taxes. This is called \"reconciling\"…"

**The clawback is disclosed with its mitigation attached** `[observed]`: "If you're worried
about having to pay back advance payments of the premium tax credit, you can decide to use
less or none of the tax credit". Naming the user's anxiety ("If you're worried about…") and
then handing them a control is the strongest disclosure move on the site.

**Change logic stated as probability** `[observed]`: "**If your income goes up or you lose a
household member**: You'll probably qualify for less premium tax credit." `probably`, not
`will`.

**The Silver gate, stated three times across three pages** `[observed]`:
"You only get those extra savings if you enroll in a Silver plan." ·
"But you get these additional savings only if you have a plan in the Silver category." ·
"you'll need to enroll in a Silver plan to get these savings."
Repeated because it is the single most consequential and least intuitive rule in the
product. Repetition across pages, in three wordings, is a deliberate redundancy strategy.

**Household definition** `[observed]`: "Count yourself, your spouse if you're married, plus
everyone you'll claim as a tax dependent, including those who don't need coverage." The
final clause — "including those who don't need coverage" — is the counterintuitive part, and
it is placed last where it will be read.

**Expired-benefit disclosure** `[observed]`: "The additional savings available because of the
COVID pandemic ended on December 31, 2025." Stated on two pages, with a date, rather than
silently removed.

### Accessibility and nondiscrimination

`[observed]` **There is no accessibility statement on HealthCare.gov.** The footer carries a
bare `Accessibility` link to an off-site CMS page, still using an `http://` `.html` URL that
redirects. No WCAG conformance claim, no VPAT, no known-limitations list, no feedback route
is published on the domain itself.

The CMS notice it points at names, verbatim: "Pursuant to Title VI of the Civil Rights Act of
1964, Section 504 of the Rehabilitation Act of 1973, and Section 1557 of the Patient
Protection and Affordable Care Act of 2010, CMS doesn't exclude, deny benefits to, or
otherwise discriminate against any person…" on the basis of "race, color, national origin,
disability, sex, or age". It also names Section 508, Section 501, the Architectural Barriers
Act of 1968 — and "Title VII of the Civil Rights Act of **1963**", which is an error (1964).

Alternative formats: "CMS provides free auxiliary aids and services including information in
accessible formats like braille, large print, data and audio files, relay services and TTY
communications." With an equity clause worth stealing verbatim: **"If you request information
in an accessible format, you won't be disadvantaged by any additional time necessary to
provide it. This means you will get extra time to take any action if there's a delay"** —
a deadline-tolling promise built into the accessibility policy, which matters enormously on a
site governed by 30-, 60-, 90- and 95-day clocks.

Section 1557 status is published as partially enjoined, with the three cases named and
"Notices of appeal have been filed in all three cases."

**Language access** `[observed]`: 15 languages listed in the footer — Chinese, Kreyòl,
French, German, Gujarati, Hindi, Italian, Japanese, Korean, Polish, Portuguese, Russian,
Spanish, Tagalog, Vietnamese — plus a full Spanish mirror at cuidadodesalud.gov with
per-page deep links. Each language block carries a right-to-language statement and gives
1-800-318-2596 for an interpreter plus the Marketplace Appeals Center at 1-855-231-1751 and
TTY 711. Asset coverage is uneven: only Spanish gets application *instructions*; the
"Losing Medicaid or CHIP?" PDF exists in only five of the fifteen.

## T11 Content architecture & page templates — **PRIORITY**

**Content-page template** `[observed]`: H1 (task or situation label) → intro paragraph →
H2 sections → `Notice:` / `Warning:` blocks inline → `More answers: <topic>` accordion group
→ `Get/Learn <specific>` link cluster → utility row (`Email this page`, `Print this page`) →
`Back to top`.

The **`More answers:` block is the site's standard FAQ container**, and its heading names the
topic rather than saying "FAQ": `More answers: The premium tax credit` ·
`More Answers: When the Marketplace needs documents to confirm info from your application` ·
`More Answers: Required documents & deadlines` · `More answers` (bare, on two pages). Note
the inconsistent capitalisation of "Answers" across instances.

**Three content-type namespaces** `[observed]`:
`/quick-guide/…` — short, numbered, scannable overviews
`/glossary/<term>/` — ~290 single-term definition pages, each ending `Back to glossary`
`/coverage-outside-open-enrollment/…`, `/choose-a-plan/…`, `/lower-costs/…`,
`/apply-and-enroll/…`, `/verify-information/…`, `/reporting-changes/…`,
`/using-marketplace-coverage/…` — **the URL namespace is the user journey**, and each segment
is a verb phrase or a situation, not a department.

That URL taxonomy is the cleanest expression of the site's IA. A user can read the path and
know where they are in the lifecycle: choose → lower costs → apply and enroll → verify →
report changes → use coverage.

**The glossary is a first-class content type, not a footer artefact** `[observed]`. ~290
entries, A–Z jump links, three empty letters shown as unlinked plain text (`K`, `X`, `Y`).
Terms are a mix of consumer words (`Deductible`, `Premium`, `Network`), regulatory objects
(`Advance premium tax credit (APTC)`, `Minimum essential coverage (MEC)`,
`Exemption Certificate Number (ECN)`), tax concepts (`Modified Adjusted Gross Income (MAGI)`,
`Net capital gains`, `Alimony`), and administrative artefacts (`Application ID`, `Plan ID`,
`Notice`).

**Bidirectional cross-referencing in the glossary** `[observed]`:
`Data matching issue (inconsistency)` and `Inconsistency (data matching issue)` are both
present as separate entries pointing at each other. So are
`Pension (retirement benefit)` / `Retirement benefit (pension)`, and
`Donut hole (Medicare prescription drug)` / `Medicare prescription drug donut hole`. The
glossary is indexed by **whichever word the user happens to know**, not by the canonical
term. That is an unusually user-led indexing decision and the most transferable glossary
pattern in the corpus.

**Every defined term is tooltipped inline, and every tooltip ends with the same affordance
string**: "Refer to glossary for more details." Consistent, and it means the glossary is
reachable from the point of confusion rather than only from the footer.

## T12 FAQs

The `Get answers` hub (H1: `How can we help you?`) is the FAQ centre, organised into four
tabs: `Top questions` · `Apply & enroll` · `Update or change coverage` · `Costs & savings`,
closing with `Still have questions?` and `Browse all topics` / `Glossary terms` /
`Contact us`.

**Hub questions, verbatim** `[observed]`:
`When can I enroll in health coverage?` · `Where can I find Marketplace plans and prices?` ·
`How do I report changes to my income, household, or address?` ·
`How do I pay my monthly premium?` · `How do I find my tax Form 1095-A?` ·
`When can I apply for health insurance?` · `How do I apply for health coverage?` ·
`What should I do before I start a Marketplace application?` ·
`How do I estimate household income?` · `How do I submit documents?` ·
`Can I change plans any time of the year?` · `How do I update my income and household?` ·
`What if I want to cancel my current plan right now?` · `Will I save money on a Marketplace
plan?` · `I qualify for extra savings on my Marketplace plan. Why is enrolling in a Silver
plan important?`

**Inline FAQs on content pages, verbatim, with placement** `[observed]`:

| Question | Page |
|---|---|
| `What if I'm turned down for a Special Enrollment Period, but I think I qualify?` | SEP |
| `What's COBRA?` | SEP, inline accordion |
| `Who can get Marketplace coverage?` | One-page guide |
| `What does "live in the U.S." mean?` | Eligibility quick guide |
| `Who's considered a U.S. national?` | Eligibility quick guide |
| `What if I'm a resident of a U.S. territory?` | Eligibility quick guide |
| `How do I pick a plan category?` | Plan categories |
| `How do I change the amount of the premium tax credit I use?` | Save on monthly premiums |
| `My eligibility results say I'm also eligible for "cost-sharing reductions." What does that mean?` | Save on monthly premiums |
| `What if my income is too high for the premium tax credit?` | Save on monthly premiums |
| `Can I appeal a decision about whether I qualify for the premium tax credit?` | Save on monthly premiums |
| `Can I still enroll in a plan even if I need to provide more information?` | Verify information |
| `If I don't submit the documents, when will the Marketplace change or end my insurance?` | Verify information |
| `Where can I find my letter?` / `How do I upload documents?` | Documents and deadlines |
| `What if I don't have any of the acceptable documents?` | Confirm SEP |
| `What if I don't pick a plan within 60 days of moving or losing coverage?` | Confirm SEP |
| `Can I submit my documents before I pick a plan?` | Confirm SEP |
| `Can I appeal more than 90 days from the date of my Eligibility Notice?` | Appeals |
| `Is there an appeals process if I go to my regular doctor and find out later that my new plan doesn't cover them?` | Getting medical care |

**Grammar**: overwhelmingly `How do I…?` and `What if…?`. The `What if…?` shape carries the
adverse cases — six of the nineteen — and is the site's standard container for
"the thing that could go wrong". One question uses the **statement-then-question** form:
`I qualify for extra savings on my Marketplace plan. Why is enrolling in a Silver plan
important?` — the user's situation declared before the question, so it self-selects on the
first clause.

**Defect** `[observed]`: eight of the FAQ bodies listed above render as a heading with no
content in the served HTML. See T8.

## T13 Terminology & glossary

| Term | HealthCare.gov's usage | The alternative it rejected |
|---|---|---|
| `Health Insurance Marketplace®` / `the Marketplace` | Full form with ® in titles and legal lines; short form in nearly all body copy | **`Exchange` — never used on consumer pages.** It survives only upstream on CMS.gov |
| `extra savings` | The plain-language label for cost-sharing reductions | `CSR` |
| `premium tax credit` | Lowercase, always spelled out | `APTC` |
| `savings` | Umbrella for both subsidy types | `subsidy` (which the site avoids) |
| `Life change` / `Life changes` | Section and tooltip label | `qualifying life event` (glossary-only) |
| `data matching issue` / `inconsistency` | Both in scare quotes, both subordinate to the plain heading | |
| `attest (agree)` | Legal term glossed inline in parentheses | |
| `reconciling` | Introduced in scare quotes after the mechanism is described | |
| `end` (coverage) | Used for plan- or Marketplace-initiated termination | `terminate` — not found anywhere |
| `cancel` | Reserved for user-initiated termination | |
| `metal levels` | Introduced in scare quotes, then used unquoted as `metal plan category` | |
| `10 essential health benefits` | Always spelled out | `EHB` |
| `individual coverage HRA` | "Your employer may refer to an individual coverage HRA by a different name, like \"ICHRA.\"" | — the site teaches the user the *employer's* jargon |
| `certified enrollment partner` · `Navigator` · `Agent and broker` · `Certified application counselor` | Four named human-help roles, each with a glossary entry | |
| `Marketplace Call Center` · `Marketplace Appeals Center` · `Find Local Help` | Named support channels | |

**Concrete examples used as definition devices** `[observed]`:
`copayment` — "A fixed amount you pay for a plan-covered service, **like $30**";
`coinsurance` — "A percentage of the cost that you pay for each plan-covered service,
**like 20%**"; natural disaster — "**like an earthquake, massive flooding, or a hurricane**".
Every abstract category gets an instance.

**Acronyms expanded on first use throughout**: CHIP, COBRA, HRA, QSEHRA, ANCSA, NCCC, VISTA,
SHOP, HSA, SLCSP, QHP. Acronyms conspicuously absent from consumer copy: APTC, CSR, EHB, FPL,
MEC, ACA, SEP-as-shorthand.

## T14 Voice, tone & accessibility

**Person.** Second person throughout for the user. The agency's self-reference is
**inconsistent by context and inconsistent within a page**: `we`/`us` for operational
statements ("we'll use the information we have", "We can't accept documents by email or
fax") and third-person `the Marketplace` for policy statements ("The Marketplace won't end
your eligibility…"). Both appear on `/verify-information/`. Arguably the split is
meaningful — *we* for the people handling your case, *the Marketplace* for the institution
that makes rules — but it is never signalled, and it reads as drift.

**Register.** Short, one-clause sentences; heavy chunking; numbered sections. Representative
line: "When you have Marketplace insurance, you'll pay your monthly premiums directly to the
insurance company — not to the Marketplace." Plain vocabulary, one idea, an em-dash contrast,
~22 words.

**The real reading burden is conditional nesting, not vocabulary.** The COBRA paragraph
requires the reader to hold four conditions at once — involuntary vs voluntary loss, before
vs after 18 months, expired vs cancelled, plus the 60-day clock. Word-level plain English
does not fix structure-level complexity, and this site is the corpus's clearest
demonstration of that gap.

**Hedging is systematic**: `may`, `might`, `probably`, `usually`, `generally`, `likely`.
"You'll probably qualify for less premium tax credit." The site almost never states a
personal outcome as certain, which is correct given that every determination depends on an
application it has not yet seen.

**Negative space is written deliberately and at length** — the `doesn't qualify` cluster in
T5, the `What can't I appeal?` list, the "not appealable" and "not eligible" copy. This is
the site's most distinctive editorial habit.

**Formatting conventions** `[observed]`: bolded lead-in + plain consequence
("**Got married.** Pick a plan by…"); italic disclaimers under tables; `Notice:` / `Warning:`
/ `IMPORTANT:` prefixes rendered in text; parenthetical glosses for every legal term.

**Accessibility practice observed** `[observed]`: `Skip to main content` first in DOM;
`Back to top`; the `.gov` HTTPS banner; download links carry format and size
(`(PDF, 1.26 MB)`, `(PDF, 251 KB)`, `(PDF, 195 KB)`); external links carry the visually
hidden suffix `This link goes to an external site`; `og:image:alt` is populated
("Healthcare.gov site logo").

### Negative findings, recorded honestly

- **`/screener/` is an empty document without JavaScript.** The primary eligibility entry point, linked from at least six pages under four different labels, returns a blank page to any non-JS client, crawler or automated assistive tool. This is the most serious defect found on any product in this batch.
- **The primary navigation never renders** in the served HTML — `Menu` is a JS disclosure with no static fallback.
- **Eight FAQ accordion bodies are empty in the served HTML** (listed in T8), including `What if I'm turned down for a Special Enrollment Period, but I think I qualify?` and `How do I submit documents?`.
- **Orphaned sentence fragments where tooltips were stripped**: `/lower-costs/save-on-monthly-premiums/` renders an answer beginning mid-sentence — "and copayments. But you get these additional savings only if…"; `/get-answers/` renders `") for your Marketplace plan based on your income` and a bare `.` as a whole paragraph; `/marketplace-appeals/` has a stranded `Part A (Hospital Insurance).` under a heading. Published rendering bugs on live policy content.
- **Four CTA labels for one destination** (`Check if you qualify.` / `Check if you qualify` / `Check if you may qualify.` / `See if you qualify for a Special Enrollment Period`), each implying a slightly different promise.
- **Contradictory file-name rules for the same upload endpoint**: `/verify-information/` forbids "a colon, semicolon, asterisk, or any other special character"; `/confirm-special-enrollment-period/` forbids `/ \ : * ? " |`. Semicolon is banned on one page and absent from the other's list.
- **One page prints an identical ~40-word block twice**, about 150 words apart (`/verify-information/`, the "You can submit documents online or by mail… We can't accept documents by email or fax." paragraph).
- **A self-referential link**: `/coverage-outside-open-enrollment/confirm-special-enrollment-period/` contains "Learn more about what to include in the statement." linking to itself.
- **A stale year parameter**: `/your-options/` links "preview plans and prices" to `/see-plans/#/?year=2024` while the site banner advertises 2027 coverage.
- **Hyphen/en-dash and terminal-punctuation drift in the same glossary tooltip**: "November 1 - January 15 each year" vs "November 1 – January 15 each year."
- **The same term glossed three different ways**: `Special Enrollment Period` has at least three tooltip texts across the site, one with an extra clause the others lack.
- **Two sitemaps disagree**: the `/sitemap/` body points at legacy CMS URLs (`cms.gov/cciio/index.html`, `marketplace.cms.gov`) while the footer on the same page points at current ones. `SHOP enrollment` is listed twice as two different links.
- **Typos in the three-bullet statutory eligibility test**: `(U.S)` missing a period; "be lawfully present non-citizen" missing an article.
- **The CMS nondiscrimination notice cites "Title VII of the Civil Rights Act of 1963"** (it is 1964, and the same page cites Title VI of the 1964 Act correctly two paragraphs earlier).
- **No accessibility statement on the domain.** A bare `Accessibility` footer link to an `http://` CMS URL that redirects. No WCAG claim, no VPAT, no limitations, no feedback route.
- **The interstitial's body and buttons disagree on case**: "Select CONTINUE to proceed or CANCEL to stay" vs `Continue` / `Cancel`. Three times per page.
- **`Silver with extra savings` sits in the comparison table as if it were a selectable category**, while the rule that gates it ("You only get those extra savings if you enroll in a Silver plan") appears *after* the table. A scanner reads it as a fifth choice.
- **The HRA/QSEHRA Special Enrollment Period cannot be completed online** — "If you qualify, contact the Marketplace Call Center to complete your enrollment. You can't do this online." — disclosed only at the bottom of a subsection.
- **Undocumented immigrants get a flat denial with no alternative signposted**, the only major adverse statement on the site with no next step.
- **`Email this pageEmail` / `Print this pagePrint`** render their hidden and visible labels concatenated, on every page.

---

## Transferable patterns

1. **Enroll-by / starts-on, as a single sentence.** "Enroll by December 15 for coverage that
   starts January 1." Two dates, one line, no arithmetic. Any deadline-driven product —
   payment cut-offs, dispute windows, promotional periods — should state both ends of the
   causal pair rather than only the deadline.
2. **Write the near-miss cases into the ineligibility copy.** "Divorce or legal separation
   without losing coverage doesn't qualify you"; "Voluntarily dropping COBRA **doesn't**
   count." Naming the case a reasonable person would assume qualifies is worth more than
   another qualifying example.
3. **Say what happens if the user does nothing.** "If you don't send the information we need,
   we'll use the information we have (not what you entered on your application) to re-check
   your eligibility." The parenthetical is the whole value.
4. **Invite action after the deadline has passed.** "Submit documents, even if you miss the
   deadline. You might re-qualify for savings or Marketplace coverage." Most deadline copy
   goes silent at expiry, stranding the user who is one day late.
5. **Publish the non-appealable list.** `What can't I appeal?` next to `What can I appeal?`
   saves the user 90 days on a route that cannot work, and it is short.
6. **Route the user away from your own escalation to the cheaper remedy.** "do that first…
   so you might not need to file an appeal."
7. **Yoke the plain term to the regulatory term in the tooltip.** "Extra savings/Cost-sharing
   reductions" — the user learns the word they will meet on the notice, without having to use
   it.
8. **Mechanism first, term of art last, term of art in scare quotes.** "The Marketplace will
   send the tax credit directly to your insurance company, so you'll pay less each month.
   This is called taking an 'advance payment of the premium tax credit.'"
9. **Disclose the clawback with the control attached.** "If you're worried about having to pay
   back… you can decide to use less or none of the tax credit." Name the anxiety, then hand
   over the lever.
10. **Use a worked narrative for counterintuitive rules.** The May/June/July grace-period
    example teaches retroactive termination in four sentences where three paragraphs of rule
    text would fail.
11. **Index the glossary by whichever word the user knows.** `Data matching issue
    (inconsistency)` and `Inconsistency (data matching issue)` as two entries pointing at each
    other.
12. **Repeat the one rule that actually costs people money, in three wordings, across three
    pages.** The Silver-plan gate. Deliberate redundancy where the consequence is financial
    and the rule is unintuitive.
13. **Split `cancel` (user acts) from `end` (system acts) and never use `terminate`.** A
    two-verb agency distinction that costs nothing and prevents a specific confusion.
14. **Toll the deadline for accessible formats.** "If you request information in an accessible
    format, you won't be disadvantaged by any additional time necessary to provide it." Any
    product with statutory clocks and alternative-format obligations needs this sentence.

## Caveats & gaps

- **The eligibility screener could not be read.** `/screener/` served an empty JS shell, so its question wording, answer options, routing logic and result copy are entirely absent from this file. Per the harvest rules the flow was not run, and no alternative retrieval route was attempted. This is the largest gap, and it sits on exactly the surface the brief prioritised.
- **The plan browser (`/see-plans/`) was not entered**, so plan-comparison copy, filter labels (beyond the quoted `Eligible for an HSA`), sort language and result-count strings are unharvested.
- **All application content is `[documented]`.** No account was created, no application started, no income, household, immigration, health or identity data entered. In-product strings quoted here (`Report a Life Change`, `Eligibility Results`, `Decide how much to lower your monthly premium`, `Update your application`) are quoted *by the help content*, not observed.
- **The homepage's primary navigation was never obtainable.** The `Menu` disclosure is client-rendered with no static fallback, so the site's main nav labels are not in this file; T1's IA is reconstructed from `/sitemap/`, `/get-coverage/`, `/get-answers/` and the footer.
- **Eight FAQ answers are empty in the served HTML** and were not read. Their questions are recorded verbatim; their answers are not.
- **Dates are reported exactly as the pages state them.** The site writes its calendar as recurring month-and-day rules (November 1, December 15, January 15, February 1) and a live banner naming the 2027 plan year. **No date, deadline, dollar figure, percentage or plan name in this file has been reconstructed, inferred or annualised.** Where the site is ambiguous about which cycle applies, so is this file.
- **HealthCare.gov publishes no content style guide**, so unlike NHS, Canada.ca and NSW there is no standard to audit the live copy against. T14 records observed regularities only.
- **No Spanish or other-language page was read as content.** Multilingual coverage is documented structurally; nothing is claimed about translation register or parity beyond the site's own uneven asset list.
- **SHOP / small-business content was not harvested** beyond its appearance in the sitemap.
- **The four CMS professional-audience destinations** (Navigators, Agents and Brokers, States, Researchers) are off-domain and out of scope.

## Sources

1. https://www.healthcare.gov/
2. https://www.healthcare.gov/glossary/
3. https://www.healthcare.gov/quick-guide/dates-and-deadlines/
4. https://www.healthcare.gov/quick-guide/one-page-guide-to-the-marketplace/
5. https://www.healthcare.gov/quick-guide/eligibility/
6. https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/
7. https://www.healthcare.gov/coverage-outside-open-enrollment/your-options/
8. https://www.healthcare.gov/coverage-outside-open-enrollment/confirm-special-enrollment-period/
9. https://www.healthcare.gov/glossary/special-enrollment-period/
10. https://www.healthcare.gov/choose-a-plan/plans-categories/
11. https://www.healthcare.gov/choose-a-plan/catastrophic-health-plans/
12. https://www.healthcare.gov/glossary/second-lowest-cost-silver-plan-slcsp/
13. https://www.healthcare.gov/lower-costs/
14. https://www.healthcare.gov/lower-costs/save-on-monthly-premiums/
15. https://www.healthcare.gov/apply-and-enroll/how-to-apply/
16. https://www.healthcare.gov/apply-and-enroll/health-insurance-grace-period/
17. https://www.healthcare.gov/verify-information/
18. https://www.healthcare.gov/verify-information/documents-and-deadlines/
19. https://www.healthcare.gov/reporting-changes/which-changes-to-report/
20. https://www.healthcare.gov/immigrants/coverage/
21. https://www.healthcare.gov/have-job-based-coverage/options/
22. https://www.healthcare.gov/marketplace-appeals/
23. https://www.healthcare.gov/using-marketplace-coverage/getting-medical-care/
24. https://www.healthcare.gov/get-coverage/
25. https://www.healthcare.gov/get-answers/
26. https://www.healthcare.gov/sitemap/
27. https://www.healthcare.gov/language-resource/
28. https://www.cms.gov/about-cms/web-policies-important-links/accessibility-nondiscrimination-disabilities-notice
29. https://www.healthcare.gov/screener/ *(blocked — empty JS shell; no content obtainable)*
