# 126. Brilliant

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Interactive STEM learning / AI-tutored math and coding (consumer subscription + K-12 educator channel) |
| Primary URL | https://brilliant.org/ |
| Corpus rank | 126 |
| Benchmark strength (source list) | Concept sequencing and feedback |
| Locale / market observed | en-US (US-defaulted; UK/IB/GCSE standards-alignment pages served from same en-US tree) |
| Platform observed | Web (desktop), own-built help centre, pricing/paywall page, legal |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | COPPA — kidSAFE +COPPA CERTIFIED Seal displayed in footer sitewide; CCPA (separate California privacy policy + "Do not sell my personal information" footer link); zero-data-retention contractual claim for third-party AI processors |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 |
| Harvest completeness | Partial — all in-product wrong-answer/feedback strings are `[documented]` only; `/courses/` renders its catalogue client-side and returned only two headings; no accessibility statement exists publicly |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://brilliant.org/ | Hero, audience-split CTAs, Koji value props, subject tabs, testimonials, footer IA |
| Pricing / paywall | https://brilliant.org/subscribe/ | Auto-renew disclosure, free-vs-Premium comparison table, gift/group plans |
| Courses | https://brilliant.org/courses/ | **Client-rendered — only `Courses` and `Learning Paths` / "Step-by-step paths to mastery" retrieved** |
| Help centre index | https://brilliant.org/help/ | 8 top-level categories, ~90 article titles |
| Cancel Premium | https://brilliant.org/help/account-management/how-do-i-cancel-my-brilliant-premium-subscription/ | Per-channel cancellation copy |
| Refunds | https://brilliant.org/help/account-management/how-do-i-get-a-refund/ | Nonrefundable-by-default framing, chargeback warning |
| Free trials | https://brilliant.org/help/pricing-and-plans/does-brilliant-offer-any-free-trials/ | Trial-to-paid conversion copy |
| Free vs Premium | https://brilliant.org/help/pricing-and-plans/what-s-the-difference-between-free-and-premium/ | Key system, sequential-gating, ads |
| Learning Paths | https://brilliant.org/help/features/what-are-learning-paths/ | Path names, checkpoint vocabulary |
| Koji (AI tutor) | https://brilliant.org/help/features/how-does-koji-work/ | Tutor behaviour, safety, mute |
| Course placement guide | https://brilliant.org/help/courses-and-curriculum/course-placement-guide/ | Diagnostic, level checks, jump-ahead — richest T4 source |
| Interactives | https://brilliant.org/help/features/how-do-i-use-interactives-on-brilliant/ | Math keyboard, answer-state colours, `Start over` |
| XP | https://brilliant.org/help/features/what-is-xp/ | Progress currency, Leagues reset |
| Streak | https://brilliant.org/help/features/what-is-a-streak/ | Streak rules, Streak Charge |
| Dyscalculia | https://brilliant.org/help/features/is-brilliant-good-for-learners-with-dyscalculia/ | Closest thing to an accessibility statement |
| Getting started | https://brilliant.org/help/using-brilliant/how-do-i-get-started-on-brilliant/ | 5-step onboarding sequence |
| Course missing | https://brilliant.org/help/help-and-support/why-is-my-course-missing/ | Content-withdrawal explanation |
| Terms of Use | https://brilliant.org/terms-of-use/ | Retrieved but oversized; only confirmed presence of refund/cancel/business-day clauses, not quoted |

---

## T1 Navigation & IA labels

**Global nav is almost absent** `[observed]`

The logged-out homepage header carries only the logo and `Sign in`. There is no product nav, no pricing link, no help link in the header. All wayfinding is pushed into the footer. This is an unusually aggressive funnel decision for an education product — the homepage is a single-path conversion surface, not a browsable site.

**Footer groupings — four, named by relationship not by object** `[observed]`

| Group | Items |
|---|---|
| `Product` | `Courses` · `Pricing` · `Gift Brilliant` · `Resources` · `Help` |
| `Solutions` | `Educators` · `Homeschools` · `K–5 Math Practice (beta)` |
| `Company` | `About us` · `Careers` |
| `Behind the scenes` | `A Tutor in Every Home` · `Coding Skills That Matter in the Age of AI` · `AI at Brilliant` |

`Behind the scenes` is the notable one: a footer group whose entire contents are *editorial essays about the company's thinking*, promoted to first-class IA alongside Product and Company. Two of the three point off-domain to the blog. `AI at Brilliant` is a deliberate pre-emption — Brilliant ships an AI tutor and links its AI position paper from every page footer.

Note `K–5 Math Practice (beta)` — the beta label is carried in the nav label itself, not just on the destination page.

**Help centre top level — eight categories, plain noun phrases** `[observed]`

`Brilliant Basics` · `Product Features` · `Courses & Curriculum` · `Schools & Educators` · `Standards Alignment` · `Pricing & Plans` · `Account Management` · `Help & Support`

Two things to note. First, `Brilliant Basics` is branded rather than generic ("Getting started"), and it is the only category using the product name. Second, `Standards Alignment` exists as a *separate top-level category* from `Courses & Curriculum` — sixteen articles mapping Brilliant lessons to Common Core, Digital SAT, PSAT, ACT, NY Regents, AP Precalculus, NC Math 1/2/3, GCSE, A Level, IB Math AA SL/HL, GRE Quant, GMAT Quant, and Texas TEKS. That is a help centre being used as an institutional-sales artefact, and it is the single most unusual IA decision in this file.

**Breadcrumbs** `[observed]`: two levels, `Help` → category name, e.g. `Help / Account Management`. No article title in the trail.

**End-of-article routing furniture** `[observed]`: every help article ends with a `Users also ask` block of 2-4 sibling links. The label is borrowed from search-engine SERP vocabulary rather than help-centre vocabulary ("Related articles"), which quietly signals that Brilliant expects these pages to be entered from Google rather than browsed.

## T2 Value proposition & headline patterns

**Hero — the product is renamed as a person** `[observed]`

> Headline: `Your personal tutor for math and coding`
> Subhead: "A world-class tutor for every home. Built by top learning experts from MIT and Harvard."

Brilliant does not sell courses, an app, or a platform in the hero. It sells *a tutor*. Every downstream claim inherits that frame: `Meet Koji, your personal tutor`, "The best tutor you'll ever have is already here", "Think of it as having a patient tutor looking over your shoulder." The competitive reference class is deliberately set as human tutoring, not as other apps — which is what licenses the `Always on your schedule` section to compete on "trial-and-error hiring, driving across town" rather than on price or content volume.

**Four value props for the tutor, each a claim about pedagogy rather than content** `[observed]`

- `Concepts that click` — visual and interactive; "you play with concepts until they click"
- `Built to make you think` (with *think* italicised inline) — "It's the difference between getting the answer and actually understanding it."
- `Adapts to exactly where you are` — "He speeds up when you're ready, and slows down when you need it."
- `Designed to keep you learning` — "Brilliant is designed to feel like a challenge, not a chore."

Note the pronoun drift: Koji is `it` in the second prop ("It's the difference...") and `he` in the third ("He speeds up..."). That is an inconsistency worth flagging — the product has not settled whether its AI tutor is an it or a he, and both appear within two adjacent paragraphs on the primary marketing page.

The `challenge, not a chore` construction is the recurring rhetorical shape: **name the thing the user fears, then negate it.** Compare "not by explaining methods before you try them", "never just giving you the answer", "not procedures to memorize".

**Negation as the core differentiation device** `[observed]` — across the homepage, paywall and help centre, Brilliant defines itself by what it refuses:

- "Instead of just memorizing"
- "without ever just giving you the answer"
- "not procedures to memorize"
- "Rather than presenting math as abstract symbols and procedures"
- "not by explaining methods before you try them"

**Scope stated as a range, not a level** `[observed]`: `From grade 5 to college and beyond`. Compare the meta description, "from 5th grade through college" — the same span, two registers.

**Pricing page headline** `[observed]`: `Unlock the full Brilliant experience`, subhead "Premium gives you unlimited access to every course—and more." Then `Level up with Premium` as the section header — gaming vocabulary used for the upgrade decision.

**Social proof is three-slot and numeric** `[observed]`: `Award-winning` / "effective and fun learning" · `100,000+` / "5-star app store reviews" · `10 million+` / "learners around the world". Press pull-quotes are a single adjective each: `"Tantalizing"` (The New York Times), `"Advanced"` (The Atlantic). A one-word pull-quote is a striking choice — it reads as confident rather than thin only because the mastheads carry the sentence.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Sign in` | Header, only header item | No `Sign up` in header — signup is pushed to audience-split buttons |
| `I'm a learner` | Hero, primary | **Audience self-selection as the primary CTA.** First person, contraction |
| `I'm a parent or teacher` | Hero, secondary | Same grammar; payer and learner are separated before any product content |
| `Get started` | End-of-page conversion block | Generic, and the only bare CTA on the page |
| `Subscribe now` | Paywall, twice (top and mid-page) | Links straight to `/premium/checkout/1541/` |
| `Gift Premium` | Paywall, gift card | |
| `Learn more` | Paywall, group-plan card | **The one bare `Learn more` in the set** — surrounded by "Want to share Brilliant Premium with your family, class, or team?", so the card supplies the object |
| `Resource Center` | Help centre foot | CTA text = destination name |
| `Manage subscription` | `[documented]` — Subscription Settings | The cancellation entry point is named neutrally |
| `Request a refund` | `[documented]` — Subscription Settings, conditional | Only rendered when eligible |
| `Start over` | `[documented]` — beneath every interactive problem | Two words, no confirmation step mentioned |
| `Take the placement quiz` | — | **Not Brilliant.** (Cross-check: this string is Babbel's; Brilliant's equivalent is unnamed in public copy — see T4) |
| `Get it on Google Play` / `Download on the App Store` | Homepage, badges | Standard store artwork |

**Observations.** The audience-split hero (`I'm a learner` / `I'm a parent or teacher`) is the standout CTA decision: rather than one CTA and a segmented landing page, Brilliant makes the *first* interaction a declaration of identity, because the payer and the user are usually different people and the pitch differs completely (pedagogy vs. logistics-and-cost). The same split reappears in the testimonial rail, where every quote is attributed with a role — `7th grader`, `Parent of 16 year old`, `10th grader`, `Parent of 10 year old`, `Algebra Teacher` — so the social proof is pre-sorted by which audience you declared yourself to be.

## T4 Onboarding & level-setting and instructional scaffolding — PRIORITY

Two distinct scaffolding systems are documented: an **account onboarding sequence** and a **placement/progression system**. The second is the more interesting artefact.

### Account onboarding — five numbered steps, imperative headings `[documented]`

1. `Sign up` — email, Google account, or Apple account
2. `Explore free content`
3. `Unlock all content with Brilliant Premium`
4. `Learn interactively`
5. `Stay motivated`

Steps 1-2 are actions the user takes; step 3 is a purchase; steps 4-5 are descriptions of the product rather than steps at all. The sequence is really *two steps and three promises*, numbered as if uniform. That is a common and honest-to-flag defect: the ordinal list borrows the authority of a procedure for content that is not procedural.

### Placement — a diagnostic that is deliberately *not* called a test `[documented]`

> "When a learner signs up, Brilliant administers a lightweight math diagnostic and places them in a course the product is confident they have the skills to begin."

The naming discipline here is the most transferable thing in this file. Three related mechanisms, three deliberately different words:

| Term | What it does | Why the word was chosen (per the copy) |
|---|---|---|
| `diagnostic` (always with `lightweight`) | Sets the starting course at signup | Explicitly disclaimed as *not* a test: "Is this a formal school placement test? No." |
| `level check` | Gates jump-ahead; confirms readiness to accelerate | A *check*, not an exam — no score or pass mark surfaced in public copy |
| `jump ahead` / `jump-ahead option` | The user-initiated skip | Verb phrase, user-owned, no permission framing |

`lightweight` is doing real anxiety work: it appears four times across the placement article, always attached to `diagnostic`, and its whole job is to stop a parent reading "diagnostic" as "assessment my child could fail."

**Placement is framed as removing a decision from the parent, not as measuring the child** `[documented]`. The article opens "You do not need to choose the perfect Brilliant math course for your child" and closes "families do not have to solve placement on their own before learning begins." The measured object is the *course selection problem*, not the learner.

**A three-state calibration rubric written for the parent, in the parent's own uncertainty** `[documented]`

| State (verbatim label) | Signal | Prescribed action |
|---|---|---|
| `Too easy:` | "moves quickly and is rarely challenged" | Use jump-ahead, take the level check |
| `Productive challenge:` | "makes some mistakes but can use feedback and continue" | "Stay with the course." |
| `Too difficult:` | "Missing prerequisites repeatedly prevent the learner from engaging with the main idea" | Try earlier material, or contact support |

`Productive challenge` as the *named desirable middle state* is excellent content design. Most products give the user two states (working / not working); Brilliant names the third and defines it by the learner's *recovery behaviour* ("can use feedback and continue") rather than by accuracy. It gives an anxious parent a definition of "this is going fine" that tolerates visible failure — which is exactly the gap that makes parents churn off adaptive-learning products.

**A progression table written as trigger → system response** `[documented]`

| "When this happens" | "What Brilliant does" |
|---|---|
| The learner signs up | A lightweight diagnostic helps place them in an appropriate starting course. |
| The learner is breezing through lessons | Brilliant will suggest accelerating ahead and uses level checks to confirm readiness. |
| The learner chooses to jump ahead | Brilliant asks them to pass the level check that gates the later material. |

Note `breezing through` — a single colloquialism inside an otherwise flat table, and the only one in the article.

**Explicit anti-instruction for the adult** `[documented]`: "Let the learner complete the signup diagnostic independently. Outside help can make the starting recommendation less useful." Brilliant tells the payer not to help, and gives the mechanical reason. Also: "Parents do not need to monitor every answer."

**Placement is explicitly decoupled from school grade** `[documented]`: "Brilliant places learners by demonstrated readiness within its own math curriculum rather than assigning one overall grade level", with the reason given ("a learner can be ahead in one topic while needing earlier material in another"). And a hard scope boundary: the diagnostic and level checks "do not assign a school grade, award course credit, issue a transcript, or decide whether a school should place a child in a later class." Four specific negations in one sentence — compare the vaguer `Is Brilliant accredited?` article title in the same help centre.

### Concept sequencing — how a hard STEM concept is broken down `[documented]`

**Learning Paths** are the named sequencing unit: "guided sequences of courses… Each path organizes related courses in a logical order so you can learn progressively — starting with core ideas and building toward more advanced topics."

Each path contains three declared components: "A recommended course order to build knowledge step by step", "Interactive lessons that mix explanations with hands-on practice problems", "Regular practice checkpoints to test your understanding as you go."

Ten paths, and the naming is mixed-register `[observed]`:
`Foundational Math` · `Programming & CS` · `Python` · `Data Analysis` · `Science` · `Logical Reasoning` · `Everyday Math` · `Technology` · `Advanced Math` · `Mind-Bending Math`

Seven are neutral subject labels. Three are *positioning* labels: `Everyday Math` (utility), `Logical Reasoning` (transferable-skill), and `Mind-Bending Math` (recreational). `Mind-Bending Math` sitting in the same list as `Foundational Math` is a register clash, but a defensible one — it is the only label that signals "this one is for fun," and Brilliant's legacy audience is recreational puzzlers.

**Sequencing gate differs by plan, and the copy says so plainly** `[documented]`: "Free users may start any course, but must work through each course sequentially." Premium users "can tackle courses in any order you'd like." The pedagogical sequence and the paywall are the same mechanism — worth flagging as a content-integrity tension, since the same article that justifies sequencing on learning grounds sells the ability to skip it.

**Subject taxonomy on the homepage uses a long/short label pair** `[observed]`: tabs render as `MathMath`, `Computer ScienceCS`, `ScienceScience`, `Data AnalysisData` — a responsive long-form/short-form pair concatenated in the extracted text. `Computer Science` → `CS` and `Data Analysis` → `Data` are the real abbreviations; `Math` and `Science` duplicate. Minor, but it means the mobile label for Data Analysis is just `Data`, which is vaguer than the desktop label.

Course-level sequences under each tab, in order `[observed]`:
- Math: `Fractions` → `Proportional Reasoning` → `Coordinate Transformations` → `Quadratics` → `Functions` → `Trigonometric Functions` → `Derivatives` (+ "28 additional courses")
- CS: `Thinking in Code` → `Programming with Variables` → `Thinking in Python` → `Programming with Functions` → `Algorithmic Thinking` → `Computer Science Fundamentals` → `Introduction to Neural Networks` (+ "7 additional courses")
- Science: `Scientific Thinking` → `Circuits` → `Digital Circuits` → `Quantum Computing`
- Data: `Exploring Data Visually` → `Probability in Data` → `Clustering & Classification` → `Regression` → `Predicting with Probability`

The CS and Science ladders both **open with a `Thinking in` / `Thinking` course** — `Thinking in Code`, `Thinking in Python`, `Scientific Thinking`, `Algorithmic Thinking`. Brilliant names the first rung of a technical sequence after the *cognitive move*, not the syntax. Likewise `Exploring Data Visually` before `Regression`. This is the concept-sequencing signature: gerund-named reasoning course first, named technique second.

## T5 Form & field labels

Almost no pre-auth forms exist. The richest field-level artefact is the **math answer keyboard**, documented in detail `[documented]`:

| Element | Label / glyph | Notes |
|---|---|---|
| Fraction key | `□/□` | Empty-box notation as the key label |
| Square root key | `√` | "adds a square root symbol with an empty box inside" |
| Cursor keys | `◄` and `►` | Documented semantically, not just positionally: `►` "moves forward — *into* a denominator, or back *out* of a fraction or square root" |
| Delete | `⌫` | |
| Reset | `Start over` | Text button beneath the problem |

**Answer-field state is communicated by colour + icon, and the copy names both** `[documented]`:
- "The box outlined in blue is the field you're currently editing."
- "When your answer is correct, the box turns green with a checkmark."

Correction edits in the Community-style sense do not exist here, but note the parallel with Busuu: green = resolved/correct in both products.

**Hint text as anticipated-failure copy** `[documented]` — the interactives article is structured entirely around two known confusions, and says so: "a few of these interactive elements can be confusing the first time you meet them. This article walks through the two we get asked about most." Then, per element, it names the specific mis-step: "This is the part people miss most" (cursor exiting a root), "You don't tap the tiles to add them, which is the step most people miss" (drag handle).

Writing the *miss* rather than the *procedure* is a reusable pattern. Compare the tone: `***🎯 Tip:*** *Made a mess? Tap **Start over** to reset the tiles and try again.*` — "Made a mess?" is the only self-deprecating line in the help centre and it lands in the one place a learner is likely to be embarrassed.

Signup fields are named only as options `[documented]`: `Email address` · `Google account` · `Apple account`.

## T6 Status & state language

**Progress vocabulary — four named currencies** `[documented]`

| Term | Definition in copy | Reset behaviour |
|---|---|---|
| `XP` | "(experience points) measures your learning activity" | "Each week, your XP resets to zero" |
| `streak` | "the number of consecutive days you've learned on Brilliant" | "If you miss a day, your streak resets to 0" |
| `Streak Charge` | Consumable that absorbs a missed day | "you will instead lose a charge and your streak will stay the same" |
| `Leagues` / `leaderboards` | "Brilliant's friendly competition where you compete against other learners for the most XP each week" | Weekly regrouping; "advance to higher leagues… move down" |

The **qualifying threshold for a streak is stated numerically** `[documented]`: "you must complete either 3 problems or a full lesson in a single day." Naming the floor (3 problems) rather than an abstraction ("some activity") is the right call for a habit mechanic — it makes the minimum viable day legible.

**XP has a stated anti-gaming rule in user-facing copy** `[documented]`: "Repeating a lesson you've already completed won't earn you extra XP." And an honest vagueness: "The amount of XP you earn corresponds to the time and effort required" — no table, no per-activity figure.

**`Leagues` is softened in-line** `[documented]`: "friendly competition". Brilliant attaches an adjective to the competitive mechanic every time it introduces it, which is the same move as `lightweight` on `diagnostic`.

**Course lifecycle states** `[documented]`: `Archived` is a real, user-visible section of the Courses page for retired content. Courses can be "updated, renamed, or restructured" or "retired". Free-tier content states: courses `unlock` as you go; `keys` gate daily access.

**Access states by tier** `[documented]`: `2 keys per day` for Free ("each key unlocks one lesson or one practice set"; "Keys reset at midnight in your time zone"), vs `No keys, no limits` for Premium. `keys` is a coined access unit — see T13.

## T7 Error, failure & recovery

**Wrong-answer response copy — the priority item, and only partially reachable** `[documented]`

No verbatim wrong-answer string is published. What *is* documented is the *policy* governing it, in three separate places and with unusual specificity:

- Koji "guides you through the thinking step by step, without ever just giving you the answer."
- "Koji answers whenever you are confused – always helping you walk through the thinking, never just giving you the answer."
- "Koji can see what you've done so far, to help pinpoint where a misunderstanding lies."
- "As you work, you get immediate, tailored feedback on your thinking — so gaps in understanding surface right away rather than at the end of a unit or test."
- "Rather than explaining methods before you try them" — the problem-first order

And one string-adjacent detail worth capturing: muting Koji suppresses his speech bubbles **except** for "the small feedback messages indicating whether you got a question correct or incorrect." So there are two tiers of feedback copy — a suppressible *explanatory* tier and a non-suppressible *verdict* tier. A content designer can read that as: correct/incorrect is treated as system state (always shown), coaching is treated as assistance (optional).

**Accuracy is bounded rather than claimed absolutely** `[documented]`: "Koji is exceedingly unlikely to make a math mistake (unlike other AI tutors) – a similar rate to the human errors we occasionally make in our content." Brilliant admits its own human content has errors in order to calibrate the AI claim. That is the Wise "claim, then bound the claim" move applied to an AI reliability claim, and it is rare.

**Error/failure article titles** `[observed]`

| Title | Shape |
|---|---|
| `I am having trouble accessing Brilliant Premium` | First-person confession |
| `Why is my course missing?` | First-person-possessive "why" |
| `Why did the content change?` | Impersonal "why" |
| `How can I report bugs/issues I'm encountering on Brilliant?` | Compound, awkward |
| `Lessons aren't working. How do I fix this?` | — *(Busuu, not Brilliant — excluded)* |
| `No access after payment` | — *(Babbel, not Brilliant — excluded)* |

Only one true first-person confession title (`I am having trouble accessing Brilliant Premium`), and it is about billing, not learning. Brilliant does **not** use the Wise-style `I got it wrong` register for learning failures — deliberately, one suspects, since the product's entire pedagogy treats a wrong answer as normal rather than as an error to recover from. Worth recording as a considered absence rather than a gap.

**Content-withdrawal copy** `[documented]` — `Why is my course missing?` gives two causes, both framed as the company's quality work rather than as loss: "updated, renamed, or restructured" (with the reason: "presented to users in a more optimal sequence") and "retired" ("we occasionally retire courses that no longer meet our threshold for content or best practices"). Then the recovery: retired courses move to the `Archived` section. A product that documents the *removal* of content and gives it a destination state is doing something most learning products skip.

**Chargeback warning — a defensive-but-useful disclosure** `[documented]`, in italic note form at the foot of the refund article: initiating a bank chargeback "will lock the payment, which will limit our ability to assist," review "could take up to 60 days," and the advice is to exhaust Brilliant's own process first. Naming the concrete cost to the user (locked payment, 60 days) rather than asserting policy is the persuasive part.

## T8 Empty states

`[absent]` — no empty state observed or documented. The help centre has no search field in the retrieved markup, so there is no no-results string. All in-product empty states (no streak, no courses in progress, zero XP) sit behind auth.

The nearest analogue is the Free-tier exhaustion state, described but not quoted `[documented]`: "Once you've used both keys, you'll need to wait until the next day to continue." A daily-limit-reached state is functionally an empty state and its copy would be worth an authenticated pass.

## T9 Notifications & system messages

`[documented]`, thin.

- Notifications are modelled as a managed preference, linked from three separate articles: `How can I adjust my notification preferences?`, and inline "Notifications and reminders (which you can manage in your preferences)".
- The iOS home-screen widget is described as a notification surface: it "shows your streak status and reminds you to practice throughout the day."
- Support SLA is stated in-copy, twice: "we'll aim to respond within 48 hours" (cancellation article) and "the team replies within 48 hours" (support article). Same promise, two phrasings.
- Live safety alerting is disclosed: "live alerts around any problematic conversations" (Koji safety section) — an internal alert, surfaced to the user as a reassurance.

No toast, banner, email, or push string was retrievable verbatim.

## T10 Subscription, auto-renewal and cancellation disclosure — PRIORITY

**The paywall carries auto-renew disclosure as an asterisked line directly under the primary CTA** `[observed]`

> `Subscribe now`
> \*"Billed as one payment. Renews annually, cancel anytime. You can turn off auto-renew from your settings."

Four facts in eighteen words, in this order: billing shape → renewal cadence → the reassurance → the mechanism. The sequence matters. `cancel anytime` (the emotional reassurance) is placed *before* "You can turn off auto-renew from your settings" (the actual instruction), so the user is calmed before being told where to go. And `turn off auto-renew` is used as the mechanism label rather than "cancel" — the paywall itself distinguishes stopping the renewal from ending the subscription, which the help centre then does too.

Note also what the asterisk does **not** do: there is no footnote body anywhere on the page. The asterisk is decorative — it marks the line as fine print without linking to anything. A small honesty defect: an asterisk that leads nowhere trains users to ignore asterisks.

**Price is absent from the paywall** `[observed]`. `/subscribe/` shows no figure at all; the CTA goes straight to `/premium/checkout/1541/`. The comparison table renders `Free` / `Premium` column headers with feature rows (`Daily lesson`, `Unlimited learning`, `Tutoring by Koji`, `No ads`, `Jump ahead and personalized practice`) but the cells did not render server-side. A dedicated help article exists — `How much does Brilliant Premium cost?` — so the number lives in the help centre rather than on the pricing page. **No price is recorded in this file, because none was observed.**

**Cancellation copy, by purchase channel** `[documented]` — the article's opening line is the load-bearing one:

> "Canceling your Brilliant Premium subscription depends on where you initially purchased it"

Three channel blocks follow, each with its own path. The web path:

> "Select **Manage subscription** and follow the prompts to cancel. Canceling prevents future charges; you'll keep Premium access until the end of your current billing period."

Two clauses, semicolon-joined: what stops, and what does not. This is the single most important sentence in subscription UX and Brilliant gets both halves into one line. The App Store and Google Play blocks each end with the jurisdictional handoff — "Refunds must be requested through Apple." / "…through Google Play." — with a link to the platform's own guide.

**Where the cancellation sits.** `Subscription Settings` → `Manage subscription` → "follow the prompts". Note that `Manage subscription` is a neutral container label, so the user must trust that cancellation lives inside it; the word "cancel" does not appear until after the click. That is a mild dark-pattern smell, offset by the fact that the help article names the exact path and the paywall footnote independently says "You can turn off auto-renew from your settings."

**Refunds are nonrefundable-by-default, stated first and in italics** `[documented]`

> "*Per our Terms of Use, all charges to Brilliant are nonrefundable. Any refund or credit we issue is provided solely as a courtesy, at Brilliant's discretion, and does not create an ongoing policy or obligation.*"

Leading a refund help article with "all charges… are nonrefundable" is unusually blunt — most products bury it. It is then partially walked back by a **conditional self-serve refund**: "If your purchase qualifies for a self-serve refund, you'll also see a **Request a refund** option in Subscription Settings. Requesting a refund ends your subscription immediately and refunds your most recent charge." Note the asymmetry the copy makes explicit — *cancel* keeps access to period end; *refund* ends access immediately. Two different terminal states, distinguished in one paragraph.

And then a third layer of honesty about the exception path: "Not everyone will see this option — it isn't available for every web subscription… we'll consider it, though most requests outside the self-serve option will not qualify." Telling the user in advance that their appeal will probably fail is a real content decision, and it is defensible: it reduces a support round-trip rather than harvesting hope.

**Trial-to-paid conversion copy** `[documented]` — `Does Brilliant offer any free trials?` is hedged from its first word:

- "Brilliant **sometimes** offers free trial promotions that allow **eligible** users to try Brilliant Premium before subscribing. Availability may vary by platform, account, or timing."
- "If a free trial is available for your account, you'll be asked to enter payment information to activate the trial. **No payment will be charged at the time the trial starts.**"
- "To avoid being charged, we recommend canceling at least 24 hours before the trial ends."
- "If the trial is not canceled before it ends, the subscription will automatically convert to a paid Premium plan and be charged according to the selected billing cycle."

Four things done right: the card-capture is disclosed before the benefit; "no payment… at the time the trial starts" is precise rather than "free"; the 24-hour buffer is given as a *recommendation with a reason* rather than a rule; and `automatically convert` names the conversion event rather than hiding behind "your subscription will begin."

The one weakness is `we recommend canceling at least 24 hours before` — "recommend" is softer than the mechanism warrants. If the app-store cutoff is hard, "recommend" understates it.

**Cancellation timing inconsistency across surfaces.** The trial article says "at least 24 hours before the trial ends." The Terms of Use (retrieved, oversized, not quoted here) contains a `business day` construction in its cancellation clause. These are different units and possibly different deadlines. Flagged as a suspected inconsistency requiring a clean read of the Terms before use as precedent.

**Tier-boundary disclosures** `[documented]` — stated as plain limits, not as upsell euphemism:
- `2 keys per day` · "Must **work through courses sequentially** — no skipping ahead" · "See **occasional ads** between lessons" · "**Limited Koji preview** — once used up, upgrade to Premium for full access"
- Against: "**Full, unlimited access to Koji**" · "**Unlimited access**… no keys required" · "**Jump to any lesson**" · "**Ad-free experience**"

"See occasional ads between lessons" on a children's learning product, said plainly, is more than many competitors do.

**COPPA / child-safety disclosure** `[observed]` — sitewide footer, beneath the kidSAFE seal: "Brilliant is a member in the kidSAFE Seal Program." The Koji article extends it: certified "through its +COPPA CERTIFIED Seal program, which independently verifies compliance with the Children's Online Privacy Protection Act (COPPA)". `independently verifies` is the operative phrase — a third-party attestation rather than a self-claim.

**AI data-handling disclosure** `[documented]`: "all third-party services used for processing chats and audio with Koji have zero-data-retention, and are therefore not used in third-party model training." Note the reasoning is shown ("and are therefore") rather than just the conclusion — the user can audit the inference.

**Educator free-tier eligibility** `[documented]`: "K-12 educators and their students **may qualify** for free Brilliant Premium" — the modal is doing eligibility-bounding work.

## T11 Help-centre architecture

Two-level: 8 categories → article lists (no intermediate sub-sections). Article counts are uneven — `Standards Alignment` (16) and `Courses & Curriculum` (16) dwarf `Account Management` (7) and `Help & Support` (6).

**Article-title grammar — six consistent shapes**

| Shape | Examples |
|---|---|
| `How do I …?` | `How do I cancel my Brilliant Premium subscription?` · `How do I get a refund?` · `How do I get started on Brilliant?` |
| `How can I …?` | `How can I adjust my notification preferences?` · `How can I reset my login password?` |
| `What is/are …?` | `What is XP on Brilliant?` · `What are Learning Paths?` · `What is a streak?` · `What is a Streak Charge?` |
| `Does Brilliant …?` | `Does Brilliant offer certificates?` · `Does Brilliant cover Algebra 1?` · `Does Brilliant have a widget?` · `Does Brilliant offer any free trials?` |
| `Why …?` | `Why did the content change?` · `Why is my course missing?` |
| Colon-scoped mapping | `Common Core math coverage: grade-by-grade Brilliant lesson mapping` · `ACT math coverage: Brilliant lesson mapping by score range` |

`How do I` vs `How can I` is an unexplained split — both appear in `Account Management` for adjacent tasks. Worth flagging as an inconsistency.

The **`Does Brilliant cover X?` family** is a deliberate SEO-and-objection pattern: `Algebra 1`, `Geometry`, `Algebra 2`, `Precalculus`, `Calculus`, `North Carolina Math 1, 2, and 3`. A parent's purchase objection ("does it cover my kid's actual course?") rendered as a help-article title, one per named course. Five US high-school course names plus one state-specific.

The **colon-scoped mapping titles** are the richest single naming pattern here. The suffix after the colon declares the *organising axis* of the mapping, and it varies by exam because the exams differ:

- `grade-by-grade` (Common Core, Texas TEKS)
- `by testing point` (Digital SAT, PSAT)
- `by score range` (ACT)
- `exam-by-exam` (New York Regents)
- `unit-by-unit` (AP Precalculus)
- `standard-by-standard` (NC Math 1/2/3)
- `topic-by-topic` (GCSE maths, A Level maths, GRE Quant, GMAT Quant)
- `syllabus-by-syllabus` (IB Math AA SL/HL)

Eight different axis labels, each matching how that credential actually organises itself. A teacher or admissions-adjacent buyer can tell from the title alone whether the mapping is in the units they think in. This is the most quotable IA decision in this file: **name the mapping by the buyer's own unit of account, not by yours.**

Note `GCSE maths` and `A Level maths` use the British *maths* while every other title uses *math* — correct localisation of the credential name inside an otherwise en-US help centre, and a good sign of deliberate rather than accidental variation.

**Routing furniture** `[observed]`: `Learning Resources` block at the foot of the index, pointing to `Resource Center`, then `Still need help?` with a bare mailto (`support@brilliant.org`). No chat, no ticket form, no phone. Email-only support named at the end and smallest — same hierarchy as Wise, but with fewer rungs.

**Freshness signals** `[observed]`: every article ends with `Last updated <date>` — observed values ranged across 2025-10-29, 2026-05-27, 2026-08-03, 2026-08-10, 2026-08-14, 2026-09-01, 2026-09-15. Visible per-article recency on a help centre is good practice and rare.

**One article cites its own sources** `[observed]` — the placement guide carries a numbered `Sources` list, including "[1] Brilliant product documentation and current learner experience… accessed August 2026." A help article footnoting the product it describes is odd (it reads as if written from outside the company), but as a transparency artefact it is notable.

## T12 FAQs

Placement: the help centre *is* the FAQ — titles are questions. In addition, one article carries an embedded `Frequently asked questions` block, in the placement guide `[documented]`:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Do I need to choose a course before my child starts? | No; the signup diagnostic handles initial placement and adjusts. |
| 2 | What if the recommended course is too easy? | Use jump-ahead; a level check gates the later material. |
| 3 | Can my child move ahead without completing every lesson? | Yes, on passing the level check; no need to redo demonstrated material. |
| 4 | What if my child wants later coursework or deeper enrichment? | Routes to two resource-centre articles (acceleration vs. enrichment). |

Four questions, all from the parent's position, all answered in one or two sentences. Q4 is the interesting one: it distinguishes *acceleration* (move to later material) from *enrichment* (harder work at the same level) and routes to different articles for each — a distinction most learning products collapse.

The block is followed by a boxed `> **Note:**` that discloses the paywall on the feature the FAQ just recommended: "Jumping ahead with a level check requires a Brilliant Premium or Brilliant for Educators account. Free accounts work through each course sequentially and unlock the next course as they go — **they'll reach the same material, just without the option to skip ahead**." The em-dash clause is careful reassurance: the free user is not denied content, only ordering freedom. Good practice — it disarms the "the free tier is crippled" reading without denying the limit.

Homepage FAQ block: `[absent]`.

## T13 Terminology & glossary — PRIORITY

| Term | Brilliant's usage | The alternative it rejected |
|---|---|---|
| `Koji` | Proper name for the AI tutor; referred to as both `it` and `he` | "AI assistant", "chatbot" — explicitly: "Unlike a typical chatbot" |
| `personal tutor` / `tutor` | The product category noun, used in the hero | "course platform", "app", "AI" |
| `Learning Paths` | Guided multi-course sequences | "tracks", "curricula", "programs" |
| `lightweight math diagnostic` | The signup assessment | "placement test" — actively disclaimed |
| `level check` | The gate on skipping ahead | "exam", "quiz", "assessment" |
| `jump ahead` / `jump-ahead option` | User-initiated skip | "skip", "test out of", "unlock" |
| `practice checkpoints` | Mid-path comprehension checks | "quizzes", "unit tests" |
| `keys` | Daily access tokens on the free tier (`2 keys per day`) | "credits", "lives", "hearts", "daily limit" |
| `Streak Charge` | Consumable that protects a broken streak | "streak freeze", "streak repair" |
| `XP` | Weekly activity currency | "points", "score" |
| `Leagues` | Weekly competitive cohort, always "friendly competition" | "rankings", "divisions" |
| `interactives` | Used as a **countable noun** — "How do I use interactives on Brilliant?" | "interactive exercises", "widgets", "simulations" |
| `Productive challenge` | Named desirable difficulty state | "on track", "appropriate level" |
| `Archived` | Destination state for retired courses | silent removal |
| `Brilliant Premium` / `Premium` | The paid tier | "Pro", "Plus", "Unlimited" |
| `Brilliant for Educators` | The institutional product | "Brilliant for Schools", "Teams" |
| `learners` | The user noun throughout, including from the parent's view ("the learner") | "students", "users", "kids" |
| `problem` | The atomic exercise unit | "question", "exercise", "task" |

**Three naming decisions worth stealing.**

1. **`keys` over `hearts`/`lives`.** Competitor habit mechanics use loss-framed metaphors (a heart you lose). A key is gain-framed and unlocking — it never signals failure. And `2 keys per day, which unlock 2 lessons or practice sets` makes the exchange rate explicit in the same breath as the unit.

2. **`diagnostic` / `level check` / `jump ahead` as three distinct words for three distinct assessments.** Most products call all three "test". The separation lets Brilliant say "this is not a formal school placement test" truthfully, and lets `level check` carry a low-stakes register that a gate on paid content badly needs.

3. **`learner` even in parent-facing copy.** The placement guide says "the learner" rather than "your child" in most of its mechanical sentences, switching to "your child" only in the emotionally-loaded ones (the FAQ, the calibration rubric). Deliberate register control: `learner` for system description, `your child` for reassurance.

**`interactives` as a countable noun** is the one term that risks failing outside the product. A user who has never seen the word will not search for it. That help article title (`How do I use interactives on Brilliant?`) is written in product vocabulary rather than user vocabulary — flagged as a findability risk.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout. First-person plural for the company, and Brilliant uses it heavily and as an actor: "we'll occasionally rename or reorganize existing content", "we occasionally retire courses", "the human errors we occasionally make in our content", "We've heard from learners with dyscalculia in our community", "we get asked about most". Note that three of those five first-person-plural sentences are *admissions*. The company shows up in the copy most visibly when it is conceding something.

**Register.** Plain, short, declarative, contractions used freely. Zero exclamation marks observed outside of quoted testimonials. No `Oops!`. The one recurring ornament is a tip glyph: `***🎯 Tip:***` in italics, used three times across the help centre and never in the same article twice.

**Tone gradient by stakes.** Colloquialism clusters in the pedagogy and motivation copy — "until they click", "breezing through", "Made a mess?", "challenge, not a chore", "looking over your shoulder", "Mind-Bending Math". It disappears entirely from the refund article, the cancellation article, and the COPPA disclosure, which are flat and clause-joined. Same gradient as Wise: **tone flattens as stakes rise.**

**Numbers as trust devices** `[observed]`: `10 million+` learners, `100,000+` 5-star reviews, `40+` interactive courses, `28 additional courses`, `2 keys per day`, `3 problems`, `48 hours`, `24 hours`, `60 days`, `grade 5 to college`. Mostly precise; `40+` and `10 million+` are the only rounded ones, both on marketing surfaces.

**Institutional name-dropping as a proof device** `[observed]`: `MIT`, `Harvard University`, `Stanford University`, `Cornell University`, `Caltech` rendered as a logo strip under "Built by top learning experts." Also `The New York Times`, `The Atlantic`. The hero subhead names only MIT and Harvard; the logo strip adds three more — escalating specificity as you scroll.

**Accessibility content — thin, and one strong outlier**

- **No accessibility statement exists.** `[absent]` Not in the footer, not in the help centre, not in the eight help categories. For a product marketed at 5th-graders-and-up with a COPPA seal, this is the clearest gap in the file.
- **But:** a substantive article on **cognitive** accessibility exists — `Is Brilliant good for learners with dyscalculia?` `[observed]`. It is genuinely good content design: it names three product features and explains *why each one helps a dyscalculic learner specifically* (visual/manipulable content vs. abstract numerical processing; problem-first with immediate in-context feedback, "identified as particularly valuable" by intervention research; Koji's multi-channel support — "audio narration, on-screen visual overlays, and conversational guidance… multiple channels at once"). It then extends honestly to an adjacent group — "We've also heard from many dyslexic learners… reduces the reading load" — and closes without overclaiming: "If you're not sure whether Brilliant will work for you, the best way to find out is to try it free."
- **Alt text on the homepage is scene-level and descriptive** `[observed]`: "A child using a tablet at a kitchen counter while an adult prepares food in the background" · "Aerial view of a university campus with historic brick buildings". Both are used twice (mobile and desktop variants of the same image), so the description is duplicated in the DOM.
- **Testimonial avatars carry the person's name as alt** (`Eliza`, `Noah`, `Tyler`, `Arianne`, `Aaron`) — adequate, since the name is also in adjacent text, so it is redundant rather than wrong.
- **Award/press badge alt text is present and meaningful**: `App of the Day`, `Best App`, `Get it on Google Play`, `Download on the App Store`, `Super charged koji`.
- **Carousel state is announced in text** `[observed]`: "Showing testimonial 1 of 5". Good.
- **Gaps in alt text**: the subject-tab illustration videos are referenced as bare paths (`/videos/homepage/courses/math-refresh.webm`) with no accessible name; the `Covered subjects` lists beside them carry the meaning, so this is defensible. The five university logos and the two press mastheads render with empty alt in the extracted markup while the adjacent text names them — also defensible.
- **Non-visual accessibility features documented in-product** `[documented]`: Koji can "narrate problems and explanations aloud"; Koji can be muted via a sound icon or account preferences; math answers are colour-coded blue (focus) / green + checkmark (correct) — **colour paired with an icon**, which is the right pattern.
- **No `Skip to content` link observed** in the retrieved homepage markup. `[absent]`

**Negative findings, recorded honestly**

1. **Koji's pronoun is inconsistent** — `it` and `he` within two adjacent homepage value props; the help centre uses `it` throughout.
2. **No accessibility statement** anywhere public, despite a dedicated dyscalculia article and a COPPA seal.
3. **`How do I …?` vs `How can I …?`** used for adjacent tasks in the same help category.
4. **The paywall asterisk leads nowhere** — `*Billed as one payment…` carries an asterisk with no footnote body on the page.
5. **Pricing page shows no price.** The figure lives only in a help article (`How much does Brilliant Premium cost?`) and behind the checkout link.
6. **`Manage subscription` is the only route to cancellation** and the word "cancel" does not appear on the entry control per the documented path.
7. **Trial cancellation deadline stated as a recommendation** ("we recommend canceling at least 24 hours before") and in a different unit from the Terms of Use, which uses a business-day construction. Suspected inconsistency.
8. **`interactives` as a countable noun** in a help-article title is product vocabulary, not user vocabulary — a findability risk.
9. **The five-step "getting started" list is two steps and three promises**, numbered as though uniform.
10. **Sequencing is sold as pedagogy and also sold as a paywall** — the same article that justifies working through courses in order sells the ability to skip.
11. **Subject tab labels duplicate on two of four tabs** (`MathMath`, `ScienceScience`) where the long/short responsive pair is identical; the mobile label for Data Analysis degrades to `Data`.

---

## Transferable patterns

1. **Name three assessments with three different words when they carry three different stakes.** `lightweight diagnostic` (no consequence) / `level check` (gates content) / `jump ahead` (user-initiated). The moment you call all three "test", you inherit test anxiety on the one that has none. Transfers directly to any onboarding that measures the user before serving them — KYC tiers, risk scoring, eligibility checks. Condition: only works if the low-stakes one genuinely has no consequence; if the "diagnostic" silently gates anything, the word becomes a lie.

2. **Name the desirable middle state.** `Productive challenge` — defined not by a score but by the user's recovery behaviour ("makes some mistakes but can use feedback and continue"). Most products give users a binary (working / broken) and leave the large ambiguous middle unnamed, which users read as broken. Applies anywhere a process is expected to include visible friction: verification in progress, partial-match resolution, a dispute under review.

3. **Gain-framed access tokens over loss-framed ones.** `keys` that unlock, not `hearts` that you lose — and the exchange rate stated in the same sentence (`2 keys per day, which unlock 2 lessons or practice sets`). Any metered free tier can steal this. Condition: the metaphor must match the mechanic; a key that expires unused is a confusing key.

4. **Split the audience before the pitch, not after.** `I'm a learner` / `I'm a parent or teacher` as the primary hero CTAs, with the testimonial rail pre-sorted by the same split. Transfers to every product where the payer and the user are different people — family plans, business accounts, gifting, dependant-linked financial products.

5. **State the negative outcome of an appeal before the user appeals.** "we'll consider it, though most requests outside the self-serve option will not qualify." Costs one sentence, saves a support round-trip and a second disappointment. Applies to refund, dispute, exception, and goodwill-credit flows. Condition: only ethical when paired with a real self-serve path, as here.

6. **Two-clause cancellation sentence: what stops, and what does not.** "Canceling prevents future charges; you'll keep Premium access until the end of your current billing period." And the paired asymmetry spelled out: cancel = access to period end, refund = access ends immediately. Directly reusable for any subscription or recurring-payment cancellation confirmation.

7. **Name a mapping by the buyer's own unit of account.** `by testing point` for SAT, `by score range` for ACT, `standard-by-standard` for state standards, `syllabus-by-syllabus` for IB. Eight axis labels for eight credentials. Transfers to any compliance-mapping or integration-coverage documentation: name the axis the reader thinks in, not the one your system uses.

8. **Two tiers of feedback copy, with only one suppressible.** Muting the tutor silences coaching but never the correct/incorrect verdict. A clean model for separating *system state* (always shown) from *assistance* (user-controllable) — useful wherever users want less hand-holding without losing status.

9. **Document the withdrawal of content, and give it a destination state.** `Archived` as a real, reachable section, plus an article explaining rename/merge/retire. Products almost universally delete silently. Applies to deprecated features, removed payment methods, retired plans.

## Caveats & gaps

- **No wrong-answer string was captured verbatim.** The brief's priority item for this product is only reachable as *policy* ("never just giving you the answer", "immediate, tailored feedback on your thinking", correct/incorrect verdicts survive muting). The actual feedback microcopy is behind auth and inside the Koji chat. An authenticated pass on a single lesson would be high-value.
- **`/courses/` is client-rendered.** Only `Courses` and `Learning Paths` / "Step-by-step paths to mastery" were in server HTML. The full course catalogue, the `Archived` section, and per-course descriptions were not retrieved. Course names in T4 come from the homepage and paywall subject tabs, not the catalogue.
- **The free-vs-Premium comparison table on `/subscribe/` did not render its cells.** Row labels (`Daily lesson`, `Unlimited learning`, `Tutoring by Koji`, `No ads`, `Jump ahead and personalized practice`) and column headers (`Free`, `Premium`) were retrieved; the values were not. The parallel help article supplied the substance.
- **No price is recorded.** None was observed on any inspected page. `How much does Brilliant Premium cost?` was not opened.
- **Terms of Use was retrieved but exceeded the extraction budget** and is only cited for the existence of refund/cancellation/business-day clauses, not quoted. The suspected 24-hour vs business-day inconsistency (T10) is therefore unconfirmed.
- **All in-product states are `[documented]`, not `[observed]`**: streak counters, XP display, Leagues board, key exhaustion, the math keyboard in use, `Start over`, `Manage subscription`, `Request a refund`. Marked as such throughout.
- **T8 (empty states) is genuinely absent**, not merely unreached — there is no help-centre search on the public surface, so there is no no-results string to find.
- **No accessibility statement exists** to harvest. T14 is built from alt text, the dyscalculia article, and documented mute/narration behaviour.
- **Mobile app copy not harvested** — app-store listings and in-app strings are outside the public web surface.
- **Educator surfaces unharvested**: `/educators/`, `educator.brilliant.org`, `/start/homeschool/`, `/practice/`, and the 16 `Standards Alignment` article bodies (titles only). The standards-alignment corpus is likely the densest institutional-register content Brilliant publishes.
- **The `Behind the scenes` blog essays** (`A Tutor in Every Home`, `AI at Brilliant`) were not opened; they are the likeliest source of published voice-and-tone or AI-position documentation.
- **No blocked domains.** brilliant.org served every requested page; two fetches timed out transiently and succeeded on retry.

## Sources

1. https://brilliant.org/
2. https://brilliant.org/subscribe/
3. https://brilliant.org/courses/
4. https://brilliant.org/help/
5. https://brilliant.org/help/account-management/how-do-i-cancel-my-brilliant-premium-subscription/
6. https://brilliant.org/help/account-management/how-do-i-get-a-refund/
7. https://brilliant.org/help/pricing-and-plans/does-brilliant-offer-any-free-trials/
8. https://brilliant.org/help/pricing-and-plans/what-s-the-difference-between-free-and-premium/
9. https://brilliant.org/help/features/what-are-learning-paths/
10. https://brilliant.org/help/features/how-does-koji-work/
11. https://brilliant.org/help/features/what-is-xp/
12. https://brilliant.org/help/features/what-is-a-streak/
13. https://brilliant.org/help/features/how-do-i-use-interactives-on-brilliant/
14. https://brilliant.org/help/features/is-brilliant-good-for-learners-with-dyscalculia/
15. https://brilliant.org/help/courses-and-curriculum/course-placement-guide/
16. https://brilliant.org/help/using-brilliant/how-do-i-get-started-on-brilliant/
17. https://brilliant.org/help/help-and-support/why-is-my-course-missing/
18. https://brilliant.org/terms-of-use/
