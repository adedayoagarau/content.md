# 123. Coursera

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | MOOC / professional certificates and online degree marketplace (multi-sided: learners, universities, employers, governments) |
| Primary URL | https://www.coursera.org/ |
| Corpus rank | 123 |
| Benchmark strength (source list) | Course selection and commitment cues |
| Locale / market observed | en-US (NAMER pricing and promo; `Offer not available to residents of India`) |
| Platform observed | Web (desktop) — marketing, pricing, program detail pages (XDP), credential hub pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a financial or health regulator regime. Relevant regimes visible in copy: **regional accreditation** (degree partners), **ACE® credit recommendation** and **ECTS credits**, CCPA (`Do Not Sell/Share`), UK Modern Slavery Act (published statement), and an **AI-grading data-use disclosure** tied to the Privacy Notice |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 (9 returned content, 4 blocked) |
| Harvest completeness | **Partial.** Marketing, pricing and program-detail surfaces harvested well. The **help centre is entirely unreachable**: `coursera.support` runs Salesforce Lightning and returns only a `Loading` / `CSS Error` shell to non-JS fetches, and every `learner.coursera.help/hc/...` URL 301-redirects into it. Refund policy and accessibility statement were therefore reached only as *summarised inside FAQs*, not as primary sources. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.coursera.org/ | Hero, audience switcher, intent selector, 7-question FAQ, full footer IA |
| Coursera Plus (pricing) | https://www.coursera.org/courseraplus | Plan comparison, trial and refund wording, Offer Terms, 8-question FAQ |
| What We Offer / How it works | https://www.coursera.org/about/how-coursera-works | **The credential-taxonomy artefact** — six product types with commitment and price in one table |
| Professional Certificate (XDP) | https://www.coursera.org/professional-certificates/google-data-analytics | Commitment badges, 8-course series, 16-question FAQ, credit and cost answers |
| Specialization (XDP) | https://www.coursera.org/specializations/python | Same badge grammar; **two direct self-contradictions** (see T10, T12) |
| Single course (XDP) | https://www.coursera.org/learn/financial-markets-global | Module-level hours, AI-grading disclosure, enrolment-option FAQ |
| Degrees hub | https://www.coursera.org/degrees | Application deadlines, performance-based admission, transfer credit, 10-question FAQ |
| MasterTrack® hub | https://www.coursera.org/mastertrack | MasterTrack definition, degree-pathway wording, 5-question FAQ |
| University Certificates hub | https://www.coursera.org/certificates/learn | Graduate/Postgraduate Certificate and Diploma vocabulary |
| Help centre home (attempted) | https://www.coursera.support/s/ | **Blocked** — Salesforce Lightning shell: `Loading`, `Sorry to interrupt`, `CSS Error` |
| Help centre (attempted, alt entry) | https://learner.coursera.help/hc | **Blocked** — 301 → `coursera.support/s/learner-help-center` |
| Refund policy article (attempted) | https://learner.coursera.help/hc/articles/208280266-Refund-policies | **Blocked** — 301 → `coursera.support/s/article/learner-000001562` |
| Accessibility Statement (attempted) | https://learner.coursera.help/hc/articles/360050668591-Accessibility-Statement | **Blocked** — 301 → `coursera.support/s/article/learner-000001052` |

---

## T1 Navigation & IA labels

**Top bar is an audience switcher, not a feature nav** `[observed]`

`For Individuals` · `For Businesses` · `For Universities` · `For Governments`

Four buyer types above the product nav. Note the mismatch between this bar and the products it leads to: the bar says `For Universities` and `For Governments`, but the destinations are branded `Coursera for Campus` and `Coursera for Government`. The switcher speaks the buyer's self-description; the product speaks Coursera's naming convention.

**Primary nav is minimal to the point of sparseness** `[observed]`: `Explore` (mega-menu, client-rendered) · `Degrees` · search · `Log In` · `Join for Free`.

`Degrees` is the **only product type promoted to the top nav** — the highest-price, highest-commitment item gets the only dedicated slot. Everything else is behind `Explore`.

**On-page section nav on program pages (XDP)** `[observed]` — a consistent five-tab strip, ordered from claim to evidence:

`About` · `Outcomes` · `Courses` (or `Modules`) · `Testimonials` · `Reviews`

`Outcomes` before `Courses` is the notable ordering: what you get precedes what you do. On the single-course page the strip drops `Outcomes` and inserts `Recommendations`, so the tab set varies by product type with no visible rule.

**Breadcrumbs are three-deep and taxonomy-based** `[observed]`:
`/` → `Categories` → `Data Science` → `Data Analysis`, and `/` → `Categories` → `Business` → `Finance`. The program itself is not in the trail.

**Footer is five SEO blocks plus three governance blocks** `[observed]`

| Block | Contents |
|---|---|
| `Skills` | 10 skill queries (`Accounting`, `Python`, `SQL`…) |
| `Professional Certificates` | 10 named certificates |
| `Courses & Specializations` | 10 named programs |
| `Career Resources` | Articles, plus `Career Aptitude Test` and `Share your Coursera learning story` |
| `Coursera` | `About` · `What We Offer` · `Catalog` · `Coursera Plus` · `Professional Certificates` · `MasterTrack® Certificates` · `Degrees` · `Social Impact` · `Free Courses` · **`Udemy`** |
| `Community` | `Learners` · `Partners` · `Beta Testers` · `Blog` · `The Coursera Podcast` · `Tech Blog` |
| `More` | `Terms` · `Privacy` · `Help` · `Accessibility` · `Contact` · `Directory` · `Affiliates` · `Modern Slavery Statement` · `Do Not Sell/Share` |

Three things worth recording. **One:** `Udemy` — a competitor — sits inside the `Coursera` footer block with no label or explanation. **Two:** the footer's credential list (`Professional Certificates`, `MasterTrack® Certificates`, `Degrees`) omits `University Certificates` and `Guided Projects`, so the footer is not a complete product map. **Three:** `Accessibility` is a top-level footer link pointing at a help-centre article — good placement, unreachable destination (see T14).

## T2 Value proposition & headline patterns

**Homepage hero is three words** `[observed]`: `Learn without limits`

No subhead. The entire hero is a two-stress slogan, and the specificity is pushed down into a promo carousel. This is the opposite of the Wise pattern (task headline, differentiator in subhead) — Coursera leads abstract and gets concrete only when it starts selling.

**Carousel slides are all urgency, not all value** `[observed]`. Of three hero slides at harvest, two are countdown offers and one is category positioning:

- `Ends tomorrow! 40% off 3 months of Coursera Plus` — body opens "There's still time!"
- `Learn AI from the companies building it`
- `Ends soon! Close team skill gaps for what's next`

**Defect:** the same page simultaneously ran `Ends tomorrow!` (hero) and `3 days left!` (blue banner) for the *same* Coursera Plus promotion, with Offer Terms stating a `September 23, 2026` expiry against a harvest date of 2026-09-21. Three different renderings of one deadline on one page, at least one of which is wrong.

**Section headers are user-goal sentences, often with a mechanism clause** `[observed]`

- `AI for the work you do—and the career you want` → "Choose your field. Learn the workflows, judgment and tools reshaping it."
- `Get job-ready for an in-demand career` → "No prior experience needed to get started."
- `Turn your learning into proof`
- `Know where to start — make progress in minutes a day`
- `Go from your first lesson to portfolio-ready work` → "Learn by doing."
- `Time's on your side. Start turning minutes into milestones.`
- `Choose your path`
- `Why people choose Coursera`

Two recurring rhetorical devices. **The time-shrinking claim**: `minutes a day`, `turn minutes into more skills`, `turning minutes into milestones`, `In just seven days, you can move from short lessons to real skills`, `even in short sessions`. **The proof-conversion frame**: `Turn your learning into proof`, `portfolio-ready work`, `show what you learned to employers`, `work samples`.

These two do specific commitment-anxiety work. The first shrinks the perceived unit of effort below the threshold at which the learner has to negotiate with their own calendar. The second converts the output from *knowledge* (unverifiable, private) to *artefact* (showable, transferable). Between them they answer "I don't have time" and "how will anyone know I did it" — the two objections that kill a MOOC enrolment.

**Four-pillar block with adjective labels** `[observed]`: `World-class` · `Flexible & Affordable` · `Job-Relevant` · `Transformational`. Each gets two sentences. `Flexible & Affordable` is the one that carries the enrolment mechanics — "Start with hundreds of preview and free trials" and "earn job-ready skills and certificates today that can count toward a degree tomorrow."

**Evidence framing is consistent and footnoted** `[observed]`: `91% of learners achieved a positive career outcome` appears on the homepage, the Coursera Plus page and the how-it-works page, each time footnoted to the `2025 Learner Outcomes Report`, and each time immediately unpacked — "They reported new job opportunities, increased knowledge, and improved work performance." The unpacking is doing honest work: it reveals that "positive career outcome" includes *increased knowledge*, which is a much weaker claim than the headline implies. Coursera discloses the dilution rather than hiding it, in the same breath.

Program-level claims are footnoted harder: `over 251,000 open jobs in data analytics with a median entry-level salary of $95,000 in the U.S.¹` → `¹Lightcast™ U.S. Job Postings (2024: Jan. 1, 2024 - Dec. 31, 2024)`, and `75% of certificate graduates report a positive career outcome … within six months of completion²` → `²Based on program graduate survey, United States 2022`. Both footnotes disclose the **age and geography** of the data, which is the right disclosure.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Join for Free` | Global nav, every page | The acquisition CTA is price-led |
| `Log In` | Global nav | |
| `Enroll for free` | Professional Certificate XDP, Specialization XDP | **Directly contradicted by that page's own FAQ** — see T10 |
| `Enroll now` | Single-course XDP | Same action, different label, no "free" |
| `Starts Sep 21` | Under `Enroll for free` | A date on a self-paced product; at harvest it was *today* |
| `Save now` / `Save 40% now` / `Save 30% today` / `Save now` | Promo blocks | Four variants of one action |
| `Get Coursera Plus` | Cross-sell card | |
| `Start a 7-day free trial` | how-it-works | The only CTA that names the trial length |
| `Explore programs` / `Explore courses` / `Explore AI courses` / `Explore Specializations` / `Explore Professional Certificates` / `Explore MasterTrack Certificates` / `Explore Degrees` / `Explore Guided Projects` | Category and path blocks | `Explore <object>` is the house pattern, fully specific |
| `Choose` | `Choose your path` table, once per row | Bare verb as a column header/button |
| `Visit a course to purchase` | Plan table, Individual row | **Not a link** — an instruction where the other columns have buttons |
| `Get started` | Coursera for Teams plan column | |
| `Email me info` / `Email Me Info` / `Email me info` | Degrees, MasterTrack, University Certificates | Three capitalisations of one label, two on the same page |
| `Go to certificate` | Every card on MasterTrack and University Certificates hubs | Destination-shaped, not benefit-shaped |
| `View eligible degrees` | `Build toward a degree` block | |
| `Learn more` | Beside `Included with Coursera Plus`, beside `Build toward a degree`, beside `Financial aid available` | The one place Coursera ships a bare `Learn more` |
| `Show all 8 frequently asked questions` / `Show all 16…` / `Show all 13…` / `Show all 10…` / `Show all 5…` | FAQ blocks | Count injected into the label — good progressive-disclosure practice |
| `Show all` | Skills chip lists | |
| `Show 8 more` | Recommendation carousel | |
| `View more reviews` | Reviews block | |
| `Visit the learner help center` | Under `More questions` on every XDP | Human help is last and smallest |
| `Financial aid available, learn more` | Pinned bottom strip on every XDP | Persistent, not buried |
| `Explore all articles` | Degrees hub | |
| `Do Not Sell/Share` | Footer | |

**Observations.** The `Explore <specific object>` convention is strong and consistent. The `Save…` family is not: four labels for the same promo action. `Visit a course to purchase` is the standout defect — in a three-column plan comparison, two columns have buttons and one has a sentence telling you to go and find the price elsewhere. That is exactly the column a price-sensitive learner reads first.

And `Starts Sep 21` under `Enroll for free`, on a product whose adjacent badge says `Learn at your own pace`, is a scheduling cue with no schedule behind it. See T6.

## T4 Onboarding & getting-started — **PRIORITY**

Coursera's pre-auth onboarding is **intent elicitation followed by taxonomy triage**, and the taxonomy triage is the best single artefact in this file.

**Step 1 — Intent selector on the homepage** `[observed]`

> Heading: `What brings you to Coursera today?`
> Options: `Start my career` · `Change my career` · `Grow in my current role` · `Explore topics outside of work`

Four life-stage options, first person, verb-first. The fourth — `Explore topics outside of work` — legitimises the non-career learner on a page otherwise saturated with employment claims. Selecting a tab swaps the panel below; the `Get job-ready for an in-demand career` panel then sub-segments by field (`Data`, `Business`, `Sales & Marketing`, `IT`, `Software Engineering`).

A parallel selector appears under `AI for the work you do` segmented by **role** rather than goal: `AI Engineer` · `Software Developer` · `Data Analyst` · `Project Manager` · `Business Leader` · `Digital Marketer`.

Two selectors, two different segmentation schemes (goal vs role), on one page. Defensible — a career-changer doesn't yet have a role — but undeclared.

**Step 2 — `Choose your path`: the commitment-and-price triage table** `[observed]`

This is the artefact. Six product types, each row carrying **goal → product name → time → money**, in that order:

| Goal statement (verbatim) | Product | `Average time commitment` | `Cost starting at` |
|---|---|---|---|
| `Quickly learn job skills and industry tools` | `Guided Projects` | `1-2 hours` | `$9.99` |
| `Gain new knowledge` | `Courses` | `4-12 hours` | `Free` |
| `Master a specific skill` | `Specializations` | `1-3 months` | `$49 USD per month` |
| `Get job-ready for an in-demand career` | `Professional Certificates` | `1-6 months` | `$49 USD per month` |
| `Earn a university-issued certificate and credit towards a degree` | `MasterTrack® Certificates` | `4-7 months` | `$2,000 USD` |
| `Earn your bachelor's or master's degree` | `Degrees` | `2-4 years` | `$9,000 USD` |

Why this works, and why it is worth stealing wholesale:

1. **The row is keyed on the learner's goal, not the product name.** The product name is the *answer*, not the question. A learner who cannot tell a Specialization from a Professional Certificate — which is most learners — never has to, because they pick `Master a specific skill` vs `Get job-ready for an in-demand career`.
2. **Time and money are given the same visual and grammatical weight**, side by side, in one consistent unit scheme per row. The label is `Average time commitment` — the word *commitment* is doing the work; "duration" or "length" would describe the product, "commitment" describes what it costs the learner.
3. **The ladder spans three orders of magnitude in both axes** (1 hour → 4 years; $9.99 → $9,000) and shows them adjacently, so the learner can locate themselves.
4. **`Free` is stated as a value in the price column**, not as an absence.

The honest weakness: the two middle rows have *identical* prices (`$49 USD per month`) and overlapping durations (`1-3 months` vs `1-6 months`), so the table cannot actually distinguish the two most commonly-confused products on price or time — only on the goal sentence. That is a taxonomy problem the table papers over rather than solves.

**Step 3 — Commitment badges on every program page** `[observed]`

A fixed six-slot badge row, repeated twice (hero and sticky), identical grammar across product types:

| Slot | Professional Certificate | Specialization | Single course |
|---|---|---|---|
| Structure | `8 course series` | `5 course series` | `7 modules` |
| Structure gloss | `Earn a career credential that demonstrates your expertise` | `Get in-depth knowledge of a subject` | `Gain insight into a topic and learn the fundamentals.` |
| Rating | `4.8` `from 182,314 reviews of courses in this program` | `4.8` `from 280,726 reviews…` | `4.8` `32,305 reviews` |
| Level | `Beginner level` | `Beginner level` | `Beginner level` |
| Prerequisite | `Recommended experience` | `No prior experience required` | `No prior experience required` |
| Schedule | `Flexible schedule` · **`6 months at 10 hours a week`** · `Learn at your own pace` | `Flexible schedule` · **`2 months at 10 hours a week`** · `Learn at your own pace` | `Flexible schedule` · **`3 weeks at 10 hours a week`** · `Learn at your own pace` |

**The `X months at 10 hours a week` construction is the most transferable string in this file.** It is a *duration conditional on a rate*, not a bare duration. `6 months` alone is unactionable; `180 hours` alone is unimaginable; `6 months at 10 hours a week` lets the learner substitute their own rate and re-derive their own answer. Note the rate is held constant at `10 hours a week` across every program type, which makes programs mutually comparable — a deliberate normalisation.

It is undercut by being sandwiched between `Flexible schedule` and `Learn at your own pace`, which together say *there is no schedule*. The badge row asserts a pace and denies a pace in the same three cells.

**The `Recommended experience` slot is a genuine defect.** On the Professional Certificate page, the prerequisite badge reads just `Recommended experience` — a noun phrase with no content. The other two pages say `No prior experience required`, which is a complete statement. Meanwhile that same certificate's FAQ answers `What background knowledge is necessary?` with "None!". So the badge implies a prerequisite, and the FAQ denies one.

**Step 4 — Structure disclosure down to the minute** `[observed]`

Programs decompose to course level with hours (`Course 1, 13 hours` … `Course 8, 6 hours`), courses decompose to module level (`Module 1•6 hours to complete`), and modules decompose to an itemised manifest:

`23 videos1 reading5 assignments` → `23 videos•Total 184 minutes` → every video titled with its runtime (`Welcome video•2 minutes`, `CAPM•11 minutes`), every reading (`PLEASE READ: Disclaimer regarding Discussion Boards•10 minutes`), every assessment (`Lesson #1 Quiz•30 minutes`, `Module 1 Honors Quiz•30 minutes`, `Final Exam•30 minutes`).

**Total transparency at the smallest grain.** A prospective learner can, pre-auth and pre-payment, see that they are buying 184 minutes of video and 150 minutes of quizzes in module 1. Very few products of any kind disclose their contents to this resolution before purchase. Note also `Show info about module content` as the disclosure toggle label — clunky, but honest about what it reveals.

Two content-ops defects visible in that manifest: `Lession #3 Quiz` (typo, live) and `Module 2 Honors Quiz ` (trailing space before the bullet). At this grain, content QA does not scale — which is itself the finding.

**Step 5 — The `Details to know` block** `[observed]` — a fixed set of commitment facts, varying by product:

`Shareable certificate` · `Add to your LinkedIn profile` · `Assessments` `26 assignments¹` · `AI Graded see disclaimer` · `Taught in English` `22 languages available` · `97%` `Most learners liked this course` · `Build toward a degree` · `6 languages available`

`Taught in English` / `22 languages available` is a neat two-line disambiguation of a genuinely confusing fact (instruction language vs subtitle language). `97% Most learners liked this course` is a social-proof metric distinct from the star rating.

## T5 Form & field labels

Pre-auth forms are thin; the filter and lead-capture labels are what is observable. `[observed]`

**Degrees hub filters:** `Filter by` · `Program Level` · `0 selected` · `Subject` · `0 selected` · `All filters`

`0 selected` as the unselected state is worth noting — it states the count rather than saying "Any" or "All". Honest, but it renders the default as a deficit.

**Lead capture** — the same three-field-free block appears on Degrees, MasterTrack and University Certificates:

> Heading: `Get started today`
> Lede: `I am interested in learning more about degrees on Coursera.`
> Button: `Email me info`

**Defect:** that lede says **`degrees`** on the MasterTrack® page and on the University Certificates page, neither of which is a degree. On the University Certificates page it sits directly under a headline about certificates. A shared component whose copy was never branched — and on the exact pages where the degree-vs-certificate distinction is the thing the learner is trying to resolve.

**Coursera Plus billing toggle** `[observed]`: `Select billing cycle` · `Billed Monthly` · `Billed Annually` · `Status: Save 41%` · `Save 41%`. The literal string `Status: Save 41%` appears in the markup — an accessible-status label leaking into the visible label.

**Plan comparison column headers** are goal sentences, not plan tiers: `Learn a single topic or skill and earn a credential` (Individual Courses & Programs) · `Master multiple topics or skills and earn unlimited credentials` (Coursera Plus) · `Upskill up to 125 employees` (Coursera for Teams). Plus a `Best value` flag on the middle column and a `Key features:` sub-header on each.

**Search and catalogue field labels are not server-rendered** and were not captured. `[absent]`

## T6 Status & state language

Pre-auth, the observable state vocabulary is about **availability and enrolment window** rather than progress. `[observed]`

**Enrolment / availability states:**
- `Starts Sep 21` — a start date on a `Learn at your own pace` product
- `Status: Free trialFree trial` — the literal duplicated string on recommendation cards
- `Included with Coursera Plus` — an entitlement state shown as a badge
- `Application due September 30, 2026` (and eight other dates) on degree cards
- `Gain admission without an application` / `No application required` / `performance-based admission` — an admissions state with no application step
- `Android coming soon` (analogous pattern; see edX/Duolingo files) — n/a here
- `Show all 16 frequently asked questions` — a disclosure state

**Progress and credential states** `[documented]`, from FAQs:
- `Accomplishments page` — where an earned certificate lands
- `verified Course Certificate` vs `unverified Statement of Accomplishment` — two historical completion states with different downstream rights, named in a single FAQ answer
- `Specialization Certificate`
- certificates "will be revoked if you decide to get a refund within that period" — a **revoked** state for a credential

**The session-vs-self-paced contradiction** `[observed]` — the Specialization FAQ says "Each course in the Specialization is offered on a regular schedule, with sessions starting about once per month. If you don't complete a course on the first try, you can easily transfer to the next session, and your completed work and grades will carry over. The Capstone Project will be offered three times per year."

So the same page carries `Learn at your own pace` in its badge row and a **monthly cohort session model with a thrice-yearly capstone** in its FAQ. `transfer to the next session` is a real state with real consequences (a capstone miss can cost four months), and it is documented only in FAQ position 2 of 13, behind a `Show all` toggle.

**System status page:** no public Coursera status page was found in the footer or elsewhere. `[absent]`

## T7 Error, failure & recovery

`[absent]` for in-product errors — all behind auth, and the help centre is unreachable.

What *is* observable is **failure-to-complete framed as recoverable**, which is the sector-relevant case:

- `If you don't complete a course on the first try, you can easily transfer to the next session, and your completed work and grades will carry over.` — the non-completion path is named, the remedy is automatic, and the loss is explicitly bounded (grades carry over). This is the Duolingo streak-freeze move applied to a cohort deadline.
- `Your course progress will be saved and won't be impacted by canceling previous subscription(s).` — cancellation explicitly decoupled from progress loss, in the FAQ about overlapping subscriptions.
- `You may begin with the third course of the Specialization` — prior-credit recognition for learners who already hold a course certificate, with the pre-2015 `unverified Statement of Accomplishment` case handled separately and *less* generously, stated plainly rather than glossed.

**The one blame-shaped string** `[observed]`: `Please note that any certificates that you earn within your first 14 days will be revoked if you decide to get a refund within that period.` A refund triggers credential revocation. It is disclosed in the right place (the trial/refund FAQ, mid-answer) and the consequence is named in plain words. Still: `revoked` is the harshest verb on any Coursera page, applied to the learner's own achievement, and the sentence structure puts the learner's decision (`if you decide`) as the cause.

**Platform error observed directly** `[observed]` — the help centre itself fails to a raw framework error for any non-JS client:

> `Loading` · `Sorry to interrupt` · `CSS Error` · `Refresh`

`Sorry to interrupt` is Salesforce Lightning's default and it is a genuinely poor string: it apologises for *interrupting* the user when in fact the page has failed to load at all. A learner with JS disabled, a slow connection, or an aggressive content blocker gets an apology for an interruption instead of a diagnosis or a fallback route to support. Worth recording as a live defect on the support path of a 145M-learner platform.

## T8 Empty states

`[observed]` — filter defaults only: `0 selected` (twice, on `Program Level` and `Subject`). No-results, no-enrolment and dashboard empty states are behind auth or client-rendered. `[absent]`

## T9 Notifications & system messages

`[observed]` — pre-auth, notification content is limited to promotional banners and opt-in lead capture:

**Countdown banner**, sitewide, repeated on every XDP:
> `3 days left!` `Get $70+ in savings and build skills with Coursera Plus.` `Save 40% for 3 months.`

Structure: urgency → absolute saving in dollars → what it buys → offer mechanics as the link text. `Get $70+ in savings` quantifies the discount in currency rather than percentage, while the link says `40%` — both framings in one banner, for readers who parse one or the other.

**Hero urgency variants** `[observed]`: `Ends tomorrow!` · `Ends soon!` · `There's still time!` · `3 days left!` · `Offer ends September 23, 2026` — five urgency renderings of one promotion, at least two mutually inconsistent (see T2).

**Email opt-in**: `Email me info` with the lede `I am interested in learning more about degrees on Coursera.` — consent phrased as the user's own declarative statement rather than a checkbox, which is a defensible pattern, undermined here by the copy being wrong on two of the three pages it appears on (T5).

**Transactional and re-engagement email copy:** `[documented]`, thinly — `You'll receive an email with your Coursera Plus receipt to submit` (employer reimbursement) and `certificate graduates will receive an email prompting them to claim their Credly badge`. Both describe emails rather than quoting them.

In-product notifications, deadline reminders and streak-equivalents: `[absent]`.

## T10 Disclosures, legal & compliance — **strong, and self-contradicting**

### Trial and refund windows `[observed]`

The clearest artefact, from the Coursera Plus FAQ `Can I try Coursera Plus first, to make sure it's right for me?`:

| Billing choice | Protection | Mechanism, as stated |
|---|---|---|
| Monthly | **7-day free trial** | Payment info captured at signup; "you won't be charged until the end of your 7-day free trial"; cancel during the trial and "there will be no charge" |
| Annual | **14-day refund window** | Self-serve request via `My Purchases page` within 14 days; "No additional information is required"; **certificates earned in the first 14 days are revoked on refund** |

Three things this answer does well. It **names the card capture up front** ("We do capture your payment information when you subscribe") rather than letting the learner discover it at checkout. It **states that no justification is required** for the annual refund — removing the anticipated friction that stops people trying. And it **discloses the one clawback** (certificate revocation) inside the same answer rather than in the linked policy.

Per-program trial terms are stated separately: `In the U.S. and Canada, Coursera charges $49 per month after the initial 7-day free trial period.` Followed by the cost projection: "can be completed in less than 6 months at under 10 hours per week of part-time study, so most learners can complete the certificate for less than $300 USD." **A subscription product giving a total-cost-to-outcome estimate** is rare and is the single best commitment-cue on the site — it converts an open-ended monthly charge into a bounded project cost.

### Offer Terms `[observed]` — full disclosure block, seven constraints in six lines

> `Claim this offer by September 23, 2026 11:59 p.m. UTC.` · `Valid for new Coursera Plus subscribers only, limited to one per person.` · `Cannot be used in conjunction with other offers.` · `Coursera reserves the right to modify or cancel the promotion at any time.` · `$35 for 3 consecutive months (regularly $59).` · `Automatically renews on a monthly basis for $59/month (plus applicable taxes), unless canceled.` · `Cancel anytime in account settings.` · `Offer not available to residents of India.` · `If located outside the US, local currency and pricing will be used for purchase and shown at checkout.`

This is a genuinely good promo disclosure: the **post-promo price, the renewal cadence, and the cancellation route are all stated**, not just the discount. The strikethrough presentation (`~~$59~~ $35/month, cancel anytime`) carries `cancel anytime` adjacent to the price rather than in the fine print. The geographic carve-out for India is stated plainly.

### Financial aid `[observed]`

A persistent bottom strip on every program page: `Financial aid available, learn more`. And an FAQ answer, quoted here because its hedging is the point:

> `Yes. In select learning programs, you can apply for financial aid or a scholarship if you can't afford the enrollment fee. If fin aid or scholarship is available for your learning program selection, you'll find a link to apply on the description page.`

Three hedges in two sentences (`In select learning programs`, `If … is available`, `for your learning program selection`) and the informal abbreviation `fin aid` in formal eligibility copy. The answer to "can I afford this" is *maybe, look around*. Contrast the degree-level answer, which is blunter and better: `You cannot apply for a scholarship or tuition assistance directly from Coursera` — a clear negative, followed by the alternative route (apply to the university) and a link to a `Financial Resources Hub`.

### The two self-contradictions — recorded in full because they are the finding

**One. `Enroll for free` vs `you cannot take this course for free`.** On https://www.coursera.org/specializations/python, the primary button says `Enroll for free`. In the same page's FAQ:

> Q: `Can I take the course for free?`
> A: `No, you cannot take this course for free.` … "If you cannot afford the fee, you can apply for financial aid."

A button and an FAQ answer on one page giving opposite answers to the same question. (The reconciliation is presumably that enrolment is free and the *certificate* is paid — but nothing on the page says so, and the FAQ explicitly forecloses the free reading.)

**Two. `2 months at 10 hours a week` vs `about 8 months`.** Same page. The badge row says `2 months at 10 hours a week`. The first FAQ says:

> Q: `How long does it take to complete the Python for Everybody Specialization?`
> A: "Time to completion can vary based on your schedule and experience level, but most learners are able to complete the Specialization in about 8 months."

A **4× discrepancy** between the marketing badge and the observed-completion answer, on one page, ~400px apart. The badge is a derived arithmetic figure (5 courses × ~16 hours ÷ 10 hours a week ≈ 8 weeks); the FAQ is empirical. Both are probably true statements about different things, and the page does nothing to reconcile them. For a file whose brief is "commitment cues", this is the central negative finding: **Coursera's commitment cue is computed from content hours, not from learner behaviour, and where it publishes both, they diverge fourfold.**

### Credit, accreditation and the limits of the credential `[observed]`

Coursera is careful, and repeatedly explicit, about what its credentials are *not*:

- `Coursera courses and certificates don't carry university credit, though some universities may choose to accept Specialization Certificates for credit. Check with your institution to learn more.`
- `Please note that the decision to accept specific credit recommendations is up to each institution and is not guaranteed.`
- `Each university determines the number of pre-approved credits that may count towards the degree requirements according to institutional policies.` — repeated verbatim three times across the Degrees hub
- `Each university determines the grades required to qualify for performance-based admission.`
- `you may be able to have your learning recognized for credit if you are admitted and enroll in one of the following online degree programs.¹` — note the double conditional (`may be able` + `if you are admitted and enroll`) attached to the `Build toward a degree` badge
- `In select programs, completed courses can count toward requirements after you're admitted (policies vary by university).`

**The pattern: every credit claim is bounded by naming the decision-maker.** Not "credit may vary" but "each university determines". Naming *who decides* is materially more useful than hedging *whether* it happens, and it is consistent across four different pages. This is the reusable compliance move in this file.

The ACE/ECTS answer is the most precise: `Learners can earn an ACE recommendation of up to 12 college credits, or 7 ECTS credits, for completing the Data Analytics Certificate`, routed through a `Credly` badge that yields a "competency-based transcript". Two credit currencies, one badge vendor, and an explicit non-guarantee.

**Accreditation** is asserted for degrees only, and the asymmetry is precise: `Coursera online degree programs are awarded by accredited university partners` and `Is the certificate you earn issued exclusively by the university? Yes, certificates are issued exclusively by the university and are not co-branded with Coursera.` For non-degree credentials, the homepage FAQ shifts ground — asked `Is Coursera accredited…?` it answers about *partners* and *recognition*, never claiming Coursera itself is accredited. Technically correct, and the question it was asked is not the question it answers.

### AI-grading disclosure `[observed]`

A `Details to know` badge — `AI Graded see disclaimer` — with a footnote:

> `¹ Some assignments in this course are AI-graded. For these assignments, your data will be used in accordance with Coursera's Privacy Notice.`

Pre-purchase disclosure that a human may not mark your work, surfaced as a *product attribute badge* rather than buried in terms. `Some` is doing a lot of hedging (which assignments? not stated), but the existence of a first-class pre-enrolment badge for this is ahead of the field.

### Other disclosure furniture `[observed]`
`Terms` · `Privacy` · `Do Not Sell/Share` · `Modern Slavery Statement` (a dated PDF, `June, 2026`) · `Affiliates`. The Modern Slavery Statement being a footer peer of `Privacy` reflects UK statutory placement expectations.

## T11 Help-centre architecture

`[absent]` — **blocked.** Four separate entry attempts (`coursera.support/s/`, `learner.coursera.help/hc`, and two direct article URLs) all resolved to a Salesforce Lightning shell rendering `Loading` / `Sorry to interrupt` / `CSS Error` / `Refresh`. No category tree, no article titles, no search furniture, no routing copy retrievable.

What is inferable from links and labels:
- Two help properties: **learner** (`learner.coursera.help` → `coursera.support/s/learner-help-center`) and a general `coursera.support/s/`. Article IDs have migrated from Zendesk numerics (`360050668591`, `208280266`) to a Salesforce scheme (`learner-000001052`, `learner-000001562`), with the legacy slugs still carrying human-readable names — `Refund-policies`, `Accessibility-Statement`, `ECTS-credit-recommendation-FAQs`, `Become-a-Coursera-beta-tester`. **Article-title grammar is therefore inferable as plain noun-phrase topics**, not questions.
- The routing furniture around the help link *is* observable and is consistent: every program page ends with `Frequently asked questions` → `Show all N frequently asked questions` → `More questions` → `Visit the learner help center`. **Self-service FAQ first, count-disclosed expansion second, help centre last.** The help centre is positioned as overflow, which is why the FAQ blocks carry so much load (T12).
- A separate learner forum exists at `coursera.community`, linked from the footer as `Learners` under `Community`.

## T12 FAQs

FAQs are Coursera's primary explanatory surface, and they are **placed per product type rather than centrally**. Four distinct FAQ blocks were captured. Questions verbatim; answers summarised.

**Homepage — 7 questions, commercial and legitimacy-led** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Is Coursera accredited, and are Coursera certificates recognized by employers? |
| 2 | Is a Coursera certificate worth it? |
| 3 | What is Coursera Plus, and is it worth it? |
| 4 | Does Coursera offer free online courses? |
| 5 | What are the most popular courses on Coursera? |
| 6 | How can Coursera help me get a job or advance my career? |
| 7 | What is Coursera for Business, and how much does it cost? |

Ordered **legitimacy → value → price → free → popularity → outcome → B2B**. Three of seven are compound questions with `and` (Q1, Q3, Q7) — pairing the factual question with the evaluative one, the same move Wise makes. Two literally ask `is it worth it?`, and the answers begin with a hedge rather than a yes: "For many learners, a Coursera certificate is worth it because…", "It's a substantial value for anyone planning to complete multiple programs in a year." **The conditional is in the first clause.** Q4's answer contains the key mechanic: courses can be previewed free "including access to the first module".

These answers are also heavily internally-linked to specific programs — the FAQ block is doubling as an SEO surface, which shows in the prose ("In contrast, others opt for job-aligned pathways, such as…").

**Coursera Plus — 8 questions, all commercial** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can I try Coursera Plus first, to make sure it's right for me? |
| 2 | What is included in Coursera Plus? |
| 3 | Will I save money with Coursera Plus? |
| 4 | How many certificates can I earn with Coursera Plus? |
| 5 | What can I do with my certificates once I've earned them? |
| 6 | Can I get reimbursed by my employer for Coursera Plus? |
| 7 | What happens to my existing Coursera Specialization subscriptions when I subscribe to Coursera Plus? |
| 8 | Will Coursera Plus motivate me to learn? |

Q1 is the trial/refund answer (T10) and it is **first**, before "what is included". Risk-reversal precedes description. Q7 is a **double-billing warning written as a question** — "You must cancel your existing subscriptions to avoid being charged for both", a self-harming disclosure placed in the seller's own FAQ. Q8 (`Will Coursera Plus motivate me to learn?`) is an unusual thing to ask and answer: Coursera answers with completion-rate data and learner report, hedged to "we typically see". Selling motivation as a subscription benefit, with a caveat.

Q2's answer carries the exclusion list plainly: "Certain courses, Specializations, and Professional Certificate programs are excluded. Coursera Plus also does not include degrees or MasterTrack™ Certificate programs." Then gives the in-product detection method: "look for the Coursera Plus badge". **Note the trademark inconsistency:** `MasterTrack™` here, `MasterTrack®` everywhere else including the footer and the hub page title.

**Professional Certificate — 16 questions, outcome- and cost-led** `[observed]`

Selected verbatim: `What is data analytics?` · `Why start a career in data analytics?` · `What kind of companies hire Data Analytics professionals?` · `How much does this certificate cost?` · `Is this program offered in other languages?` · `What background knowledge is necessary?` · `Do I need to take the courses in a specific order?` · `Will you be teaching R or Python?` · `Which jobs does this program prepare for?` · `What will I be able to do upon completing the professional certificate?` · `What resources will be available to help with the job search process?` · `Why did Google create this program?` · `Can I get college credit for taking the Google Data Analytics Certificate?` · `Does the Google Data Analytics Certificate include AI content?` · `Is this course really 100% online? Do I need to attend any classes in person?` · `Can I just enroll in a single course?`

The sequence starts with **domain education** (`What is data analytics?`) before product questions — appropriate for a career-changer who may not yet be able to evaluate the product. `Why did Google create this program?` is answered as a candid institutional confession ("We had open IT support roles, but not enough qualified candidates"), which is more persuasive than a benefit claim. `Is this course really 100% online?` retains the word `really`, i.e. it is written in the voice of a sceptic.

**Specialization — 13 questions**, including the two contradiction-bearing answers (T10) and the credential-history answer: `What if I already earned a Course Certificate in Programming for Everybody (Python)?`, which distinguishes `verified Course Certificate` from `unverified Statement of Accomplishment` and gives different remedies for each. A legacy-credential migration question, still live.

**Degrees — 10 questions, decision-support rather than product** `[observed]`

`Are Coursera online degrees offered by accredited universities?` · `Can I transfer college credits into an online degree program on Coursera?` · `Can I take online degree courses from anywhere in the world?` · `How long does it take to finish an online degree?` · `What are the application deadlines?` · `What is the online university program experience like on Coursera?` · `Does Coursera offer scholarships or tuition assistance? Where can I find information about them?` · `Is an online degree worth it?` · `Are Coursera degrees considered distance learning degrees?` · `What are online degree courses, and do they count toward a degree?`

`Is an online degree worth it?` opens `It can be - depending on your goals, timeline, and career plans.` — **a hedge as the first three words of the answer to the highest-stakes question on the site.** Then it names the decision criteria (curriculum, cost, flexibility) and hands the decision back: "Deciding whether an online degree is worth it is ultimately up to you." For a $9,000+ product this is a notably restrained answer, and it is the strongest tonal moment in the harvest.

The duration answer is honest about its own variance: `It depends on the program level, pace, and transfer credits. Many undergraduate online degrees take 2–6 years, while graduate degrees often take 1–3 years.` — ranges, not a single figure, with the three variables named. Compare the badge rows (T4), which give single figures.

**MasterTrack — 5 questions, all definitional** `[observed]`: `What categories of MasterTrack® Certificates are offered on Coursera?` · `What is a MasterTrack® Certificate?` · `Is a MasterTrack® Certificate worth getting?` · `Is a MasterTrack® Certificate issued exclusively by the university?` · `What is the difference between a MasterTrack® Certificate and a Master's degree?`

Four of five are asking *what is this thing*. When 80% of a product's FAQ is definitional, the product name has failed. The answer to Q5 is also **circular** — it restates the definition, then adds the degree-pathway clause, without ever saying the plain thing (a MasterTrack is a fraction of a master's, not a master's).

**University Certificates — 2 questions**, both about credential identity: `Is the certificate you earn issued exclusively by the university?` and `What will I get if I complete a university certificate program on Coursera?` The second answer concedes the naming problem outright: `The title of the certificate may vary depending on the institution(s) issuing it. Please check individual certificate pages for the type of certificate issued upon program completion.` **Coursera cannot tell you what credential you will receive.**

## T13 Credential & commitment terminology — **PRIORITY**

`[observed]` throughout. Every term below appears verbatim on a cited page.

### The credential ladder, as Coursera itself frames it

| Term | Issued by | Time commitment (as published) | Price (as published) | Carries credit? |
|---|---|---|---|---|
| `Guided Projects` | Coursera partner | `1-2 hours` | from `$9.99` | No |
| `Courses` → `Course Certificate` | Partner, co-branded | `4-12 hours`; badges show e.g. `3 weeks at 10 hours a week` | from `Free` | "don't carry university credit" |
| `Specializations` → `Specialization Certificate` | Partner, co-branded | `1-3 months`; badge `2 months at 10 hours a week`; FAQ `about 8 months` | from `$49 USD per month` | Universities "may choose to accept" |
| `Professional Certificates` | Industry partner (Google, IBM, Meta…) | `1-6 months`; badge `6 months at 10 hours a week` | from `$49 USD per month` | ACE® `up to 12 college credits` / `7 ECTS credits`, "not guaranteed" |
| `University Certificates` — realised as `Graduate Certificate`, `Graduate Diploma`, `Postgraduate Certificate`, `Postgraduate Diploma` | `exclusively by the university`, `not co-branded with Coursera` | `5-6 months`, `6-9 months`, `6-12 months`, `8 months`, `8+ months`, `16-24 weeks`, `24-40 weeks` | not shown on hub | Varies; some offer "a pathway to a degree" |
| `MasterTrack® Certificates` | `exclusively by the university` | `4-7 months`; cards show `4 months`, `4-5 months`, `6 meses` | from `$2,000 USD` | "counts towards your degree" **if admitted to the full Master's** |
| `Degrees` — `Bachelor's`, `Master's`, `Postgraduate Programs` | Accredited university | `2-4 years`; FAQ `2–6 years` (UG), `1–3 years` (PG) | from `$9,000 USD` | Yes — it is the degree |

### Why this taxonomy is genuinely confusing, evidenced

Seven top-level product types, of which **five contain the word "Certificate"**. Mapping it precisely was the brief, so here is what the mapping actually reveals:

1. **`Specialization` is the only credential type whose name says nothing about either credit or employability.** It is glossed as `Master a specific skill` and `Get in-depth knowledge of a subject` — and "specialization" in ordinary academic English means a *field*, not a course bundle. It is also the type with the most legacy-naming debris (see below).
2. **`Professional Certificate` and `University Certificate` are distinguished only by issuer, and the names do not say so.** "Professional" contrasts with "University" only if you already know that Professional Certificates come from companies and University Certificates come from universities. Nothing in the names encodes that.
3. **`MasterTrack® Certificate` needs four of its five FAQ slots to define itself**, and the definition is recursive (T12). The trademark symbol is inconsistent (`MasterTrack®` vs `MasterTrack™` in the Coursera Plus FAQ).
4. **`University Certificate` is an umbrella whose members have four different names** — `Graduate Certificate`, `Graduate Diploma`, `Postgraduate Certificate`, `Postgraduate Diploma` — plus `Diplomado` and `Certificado` in Spanish-language programs. Coursera's own FAQ concedes it cannot predict which you will get.
5. **Duration units are not normalised across the very pages that sell duration.** On the University Certificates hub alone: `5-6 months`, `6 months`, `6-9 months`, `6-12 months`, `8 months`, `8+ months`, `9 months`, `16-24 weeks`, `24-40 weeks`. `16-24 weeks` and `4-6 months` are the same thing; both appear. A learner comparing two cards side by side has to convert units.
6. **Locale bleed in card labels.** MasterTrack hub cards render `Administración de Empresas Certificado MasterTrack®`, `Metodologías ágiles de desarrollo de software Programa de Certificado MasterTrack®`, `Certificado en Introducción a la Ciencia de Datos MasterTrack® MasterTrack® Certificate` (the type name **twice**, once per language), `4 meses` and `6 meses` beside `4 months`, and `Diplomado en Analítica de los Negocios` with no MasterTrack designation at all. On an `en-US` page.
7. **A live typo in a product name**: `Machine Learning for Analaytics`, on the MasterTrack hub.

### Legacy and parallel credential vocabulary still in live copy
`Course Certificate` · `verified Course Certificate` · `unverified Statement of Accomplishment` · `Specialization Certificate` · `career credential` · `career certificate` · `shareable certificate` · `Certificate experience` · `Full Course, No Certificate` · `Accomplishments page` · `Credly badge` · `competency-based transcript` · `ACE® recommendation` · `ECTS credits` · `Coursera Plus badge`

`Certificate experience` (from `you'll need to purchase the Certificate experience when you enroll`) is the paywall's actual name and it appears nowhere in the price tables — it is the **audit/paid distinction rendered as a purchasable "experience"**.

### The enrollment-vs-audit distinction — how Coursera words it now `[observed]`

Coursera has **retired the word "audit"** from these surfaces. It is replaced by three separately-named states, all in one FAQ answer:

> `To access course materials, assignments, and earn a Certificate, you'll need to purchase the Certificate experience when you enroll in a course. Eligible learners may also have the option to start with a Free Trial. Some courses may also offer a Full Course, No Certificate option. This lets you access course materials, submit required assessments, and receive a final grade, but you won't be able to earn or purchase a Certificate.`

So the three access tiers are:
- **`Certificate experience`** (paid) — materials + assignments + certificate
- **`Free Trial`** (conditional: `Eligible learners may also have the option`)
- **`Full Course, No Certificate`** (conditional: `Some courses may also offer`) — materials + assessments + a grade, **no certificate ever, not even for later purchase**

Plus a fourth, named only on the homepage: **preview**, i.e. free access "including access to the first module".

`Full Course, No Certificate` is the successor to "audit" and it is a better label — it states both what you get and what you don't, in four words, no jargon. The weakness is that both non-paid tiers are gated behind `Eligible learners may` and `Some courses may`, with no way to tell from the program page which applies. The learner cannot determine their own access options until enrolment.

### Commitment vocabulary
`Average time commitment` · `X months at 10 hours a week` · `Flexible schedule` · `Learn at your own pace` · `Beginner level` · `Recommended experience` · `No prior experience required` · `8 course series` · `7 modules` · `Course 1, 13 hours` · `Module 1•6 hours to complete` · `Applied Learning Project` · `Capstone` / `Capstone Project` · `Honors Quiz` · `Final Exam` · `session` / `transfer to the next session` · `already enrolled` · `Starts Sep 21` · `Application due <date>` · `performance-based admission` · `degree completion programs` · `Build toward a degree` · `View eligible degrees` · `Transfer up to 64 college credits`

`Applied Learning Project` as a section header, and `Honors Quiz` as an optional-rigour assessment tier, are both worth noting: the first names project work as a distinct pedagogical category, the second offers voluntary difficulty — the Duolingo `Legendary` idea in an academic register.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the learner throughout, and future-tense outcome framing is the house style: `What you'll learn`, `Skills you'll gain`, `Tools you'll learn`, `you'll be able to`, `you'll earn`, `you'll receive`. First-person plural for Coursera is rare and mostly appears in partner voice (`We had open IT support roles…` is Google speaking) or in institutional statements (`We envision a world where anyone, anywhere has the power to transform their lives through learning`).

**Register: corporate-warm, low on humour, high on hedging.** Contractions used freely. Almost no exclamation marks outside promos and two FAQ answers (`Yes!`, `None!`). Em-dashes used for the goal-clause construction (`AI for the work you do—and the career you want`).

**The hedge is the signature tonal device, and it is mostly to Coursera's credit.** `It can be - depending on your goals`, `For many learners…`, `may be able to`, `we typically see`, `Time to completion can vary`, `It depends on the program level, pace, and transfer credits`, `not guaranteed`, `policies vary by university`, `In select learning programs`, `Some courses may also offer`. On a platform selling uncertain outcomes for real money, this is the right register — and Coursera consistently hedges *its own claims* rather than the learner's rights. The exception is eligibility copy (T10), where stacked hedges make the financial-aid answer unactionable.

**Tone flattens correctly as stakes rise.** The Degrees hub is the most sober surface on the site — no promo banner, no urgency, no exclamation, `Application due <date>` instead of `Ends soon!`, and a `worth it?` answer that hands the decision back. The Coursera Plus page is the least sober. This is a defensible register gradient, and the opposite of Duolingo's flat-exclamatory register across all stakes.

**Testimonials are quoted with first-name-plus-initial and a provenance line**, and the selected quotes are notably about *constraint* rather than achievement: "I have a full-time job and 3 kids. I needed the flexibility offered by Coursera Plus in order to achieve my goals." · "made it possible for me to dive into data analytics while managing family, health, and everyday life." · "To be able to take courses at my own pace and rhythm has been an amazing experience." Provenance is `Learner since 2018`, `Learning from India`, `Learning from the U.S.` — a tense choice (`Learning`, not `Learned`) that keeps the learner in progress.

**Accessibility** — thin, and partly blocked.

- `Accessibility` is a **top-level footer link on every page**, which is correct placement. Its destination — the Accessibility Statement — is **unreachable to a non-JS client** because it lives in the Salesforce help centre. The accessibility commitment is published on the least accessible surface Coursera operates. `[absent]` for content; recorded as a finding.
- Alt text is **inconsistent in a diagnostic way.** Some is genuinely descriptive and contextual: `Composite illustration of three Coursera certificates (Google AI Essentials, IBM Back-End Development, Python for Everybody) shown as overlapping cards.` · `Composite illustration of industry tool icons (Excel, Azure, ChatGPT, Python, Power BI) shown as overlapping circles.` · `logos of Petrobras, TATA, Danone, Capgemini, P&L'Oreal`. Other alt text is a bare noun (`woman ai icons`, `40% off 3 months of Coursera Plus ends soon`, `An image showing course progress`) and **many decorative and testimonial images carry no alt at all** — every learner headshot in the testimonial carousels is un-alted, as are several Contentful-sourced hero images. `An image showing course progress` is the worst of these: it announces that an image exists without conveying the progress information it carries.
- **Duplicated content in the DOM.** The commitment badge row renders twice per program page (hero + sticky), as do the testimonial carousels (three learners repeated across nine slots) and the primary CTA (`Enroll for free` / `Starts Sep 21` at top and bottom). A screen-reader user encounters the full commitment badge set twice consecutively with no differentiating context.
- **Carousel controls are labelled `Previous` / `Next` / `Go to item 1` / `Go to item 2` / `Go to item 3`** with no indication of what the items are — and `Previous`/`Next` appear eleven times on the homepage alone, for eleven different carousels, with identical labels.
- **Accessibility appears as *subject matter*** — `Web Content Accessibility Guidelines` is listed as a skill taught in the Google Data Analytics data-visualization course. Coursera teaches WCAG while shipping un-alted images.
- No `Skip to content` link was found in the server HTML of any page inspected.
- **Positive:** `Show all 16 frequently asked questions` includes the count, so a non-visual user knows the size of the hidden set before expanding. And `Taught in English` / `22 languages available` correctly separates instruction language from caption language.

**Negative findings, recorded honestly**

- `Enroll for free` (button) vs `No, you cannot take this course for free.` (FAQ) — same page
- `2 months at 10 hours a week` (badge) vs `about 8 months` (FAQ) — same page, 4× apart
- `Ends tomorrow!` vs `3 days left!` vs `Offer ends September 23, 2026` — same page, same promo, harvested 2026-09-21
- `Learn at your own pace` / `Flexible schedule` vs a documented monthly **session** model with a thrice-yearly capstone
- `Recommended experience` (badge, contentless) vs `What background knowledge is necessary?` → `None!` (FAQ)
- `Starts Sep 21` on a self-paced product
- `I am interested in learning more about degrees on Coursera.` on the MasterTrack® and University Certificates pages
- `MasterTrack®` vs `MasterTrack™` in Coursera Plus FAQ
- `Email me info` / `Email Me Info` — two capitalisations, one page
- `Save now` / `Save 40% now` / `Save 30% today` — one action, three labels
- `Visit a course to purchase` where the sibling columns have buttons
- `Status: Free trialFree trial` and `Status: Save 41%` — status text leaking into visible labels
- `Certificado en Introducción a la Ciencia de Datos MasterTrack® MasterTrack® Certificate` — type name twice
- `Machine Learning for Analaytics` and `Lession #3 Quiz` — live typos
- `Udemy` linked inside the `Coursera` footer block, unlabelled
- Duration units unnormalised: `16-24 weeks` beside `5-6 months` beside `8+ months`
- `fin aid` (informal abbreviation) inside eligibility copy
- Accessibility Statement unreachable without JavaScript
- `Sorry to interrupt` / `CSS Error` as the support path's failure state

---

## Transferable patterns

1. **Publish duration as a rate-conditional, not a bare figure.** `6 months at 10 hours a week` beats both "6 months" and "180 hours", because it exposes the assumption and lets the user re-derive the answer at their own rate. Hold the rate constant across products so they become comparable. Transfers to any product where completion time depends on user effort — onboarding, KYC document collection, integration work, migration projects.

2. **Key the choice table on the user's goal, with the product name as the answer.** `Choose your path` — goal sentence → product → time → money, six rows spanning three orders of magnitude on both axes. The user never has to learn your taxonomy to use it. Directly applicable to PayPal's product-selection surfaces, where merchant-facing product names (Braintree, PayPal Commerce Platform, Fastlane) require prior knowledge to disambiguate.

3. **Name the decision-maker instead of hedging the outcome.** `Each university determines the number of pre-approved credits…` is more useful than "credit may vary", and it appears verbatim on three pages. Where you cannot promise an outcome, say **who decides**. Transfers to underwriting, dispute outcomes, funds availability, issuer declines — anywhere a third party holds the decision.

4. **Convert an open-ended subscription into a bounded project cost.** "$49 per month … can be completed in less than 6 months at under 10 hours per week, so most learners can complete the certificate for less than $300 USD." A recurring charge reframed as a total. Condition: only do this if your own completion data supports it — Coursera's does not, on the page where it publishes both figures.

5. **Put risk reversal first in the FAQ, and disclose the clawback in the same answer.** `Can I try Coursera Plus first, to make sure it's right for me?` is FAQ #1, before "what's included", and it names the card capture, the window, the no-justification-needed refund, *and* the certificate revocation together. Trust comes from the caveat being in the same paragraph as the offer, not a linked policy.

6. **Rename "audit" to a label that states both halves.** `Full Course, No Certificate` — four words, no jargon, gets it and doesn't get it. Replaces an insider term with a complete statement. Applies wherever a free tier exists that is not a trial.

7. **Disclose the contents to the smallest grain, pre-purchase.** Program → course → module → individual video runtimes and quiz minutes, all visible before payment. Total-transparency inventory is a commitment cue in its own right; it also means your content QA is publicly visible, which is the cost.

8. **Let the tone flatten as the price rises.** Coursera's $35 subscription page shouts; its $9,000 degree page opens its worth-it answer with `It can be - depending on…`. If your product spans a price range, the register should too.

## Caveats & gaps

- **The help centre is completely unreachable.** All four entry attempts hit a Salesforce Lightning shell (`Loading` / `Sorry to interrupt` / `CSS Error`). T11 is `[absent]`; T7 in-product error copy and T8 empty states are unharvested. Refund-policy and accessibility-statement *primary text* were never read — everything in T10 about refunds is quoted from the Coursera Plus FAQ, which is a marketing surface summarising a policy. **A browser-rendered pass on `coursera.support` is the highest-value follow-up for this file.**
- **Mega-menu (`Explore`) is client-rendered** and was not captured, so the full catalogue IA is missing from T1.
- **Search, filter results and catalogue-browse copy** are client-rendered. `[absent]`
- **Pricing is NAMER and promo-distorted.** Every price captured here is a discount-period price alongside its list price (`~~$59~~ $35/month`, `$399/year`). `Offer not available to residents of India`, and non-US visitors get local currency "shown at checkout" — so all figures in T10 are en-US, September 2026, promo-active. Re-verify before citing as list pricing.
- **Course-level figures are single-instance.** The commitment badges, module manifests and FAQ sets come from three specific programs (Google Data Analytics, Python for Everybody, Yale Financial Markets). The *grammar* generalises; the *numbers* do not. Guided Projects were not inspected at program level.
- **Degree program pages were not opened individually** — only the hub. Tuition figures, per-program deadlines beyond the card labels, and admissions copy are unharvested.
- **`Coursera for Business` / `Campus` / `Government` surfaces unharvested**, as is `blog.coursera.org`, `coursera.community`, the `/articles` SEO library, `Terms`, and `Privacy`.
- **The `8 months` vs `2 months` discrepancy is reported as observed, not adjudicated.** I did not determine which figure is correct; both are quoted with their sources.
- Mobile app copy, checkout flow, financial-aid application form, and all authenticated learner surfaces are out of scope.

## Sources

1. https://www.coursera.org/
2. https://www.coursera.org/courseraplus
3. https://www.coursera.org/about/how-coursera-works
4. https://www.coursera.org/professional-certificates/google-data-analytics
5. https://www.coursera.org/specializations/python
6. https://www.coursera.org/learn/financial-markets-global
7. https://www.coursera.org/degrees
8. https://www.coursera.org/mastertrack
9. https://www.coursera.org/certificates/learn
10. https://www.coursera.support/s/ (blocked — JS shell)
11. https://learner.coursera.help/hc (blocked — redirects to 10)
12. https://learner.coursera.help/hc/articles/208280266-Refund-policies (blocked)
13. https://learner.coursera.help/hc/articles/360050668591-Accessibility-Statement (blocked)
