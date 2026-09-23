# 125. Codecademy

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Interactive coding education — browser-based learning environment with auto-graded exercises; `Codecademy from Skillsoft` |
| Primary URL | https://www.codecademy.com/ |
| Corpus rank | 125 |
| Benchmark strength (source list) | Interactive instruction and error feedback |
| Locale / market observed | en-US (USD; `Made with ❤️ in NYC`) |
| Platform observed | Web — marketing, pricing, course landing pages (server-rendered), and a **fully readable Zendesk help centre** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated vertical. Visible regimes: CCPA (`Do Not Sell My Personal Information` → `privacy.codecademy.com`), VAT and tax-exempt purchasing as support topics, a published security-vulnerability disclosure policy, BNPL via `Afterpay` (with a documented credit-check answer), and a **public accessibility inbox** (`accessibility@codecademy.com`) but **no published conformance target** |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 (all returned content) |
| Harvest completeness | **Good.** Marketing, pricing, course landing pages and the help centre were all fully readable. The interactive Learning Environment itself is behind auth, so the actual error strings and hint UI are `[documented]` — but Codecademy documents them unusually precisely, including in an accessibility guide written for screen-reader users, which names every pane, heading and control. The in-product nav bar renders as `Loading menu bar`, so global nav was not captured. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.codecademy.com/ | Hero, subject taxonomy, platform showcase, learner stories, footer IA |
| Pricing | https://www.codecademy.com/pricing | **Four-tier plan table with 28 itemised features** — the densest pricing artefact in this batch |
| Paid plans | https://www.codecademy.com/pages/paid-plans | Pro vs Plus benefit framing, 4-question FAQ |
| Course landing page | https://www.codecademy.com/learn/learn-python-3 | Commitment badges, **the qualified time estimate**, syllabus, platform showcase alt text |
| Help centre home | https://help.codecademy.com/hc/en-us | 6 categories, 6 featured articles, **and a stale service banner** |
| Help: Fix a Problem | https://help.codecademy.com/hc/en-us/categories/202889308-Fix-a-Problem | 3 sections; the whole error-recovery surface |
| Help: Using Codecademy | https://help.codecademy.com/hc/en-us/categories/202886527-Using-Codecademy | 6 sections; `Getting Started` and `Our Product` |
| Help: Codecademy Curriculum | https://help.codecademy.com/hc/en-us/categories/360001237834-Codecademy-Curriculum | By Language / By Subject / partnership |
| Help: Understanding Code Errors | https://help.codecademy.com/hc/en-us/articles/220801027-Understanding-Code-Errors | **The hint ladder, verbatim** |
| Help: Code Troubleshooting | https://help.codecademy.com/hc/en-us/articles/360036584313-Code-Troubleshooting | The deflection article; 23% helpful |
| Help: Accessibility Guide | https://help.codecademy.com/hc/en-us/articles/360056641953-Accessibility-Guide | **Names every ARIA region, heading and control in the Learning Environment** |
| Help: Quizzes, Assessments, Exams | https://help.codecademy.com/hc/en-us/articles/15373426748187-… | Three assessment types, pass mark, retake rules |
| Help: Refund Policy | https://help.codecademy.com/hc/en-us/articles/360007421393-Refund-Policy | `We do not grant refunds`; 10% helpful |
| Help: Free Trial | https://help.codecademy.com/hc/en-us/articles/360009112313-Codecademy-Free-Trial | 7-day mechanics; what survives non-conversion |

---

## T1 Navigation & IA labels

**Global nav not captured** `[absent]` — renders as the literal placeholder string `Loading menu bar`, twice, in the server HTML of every marketing page. See T8.

**Homepage subject taxonomy — two parallel axes** `[observed]`, exposed as a 24-item chip list under `Build skills that stand out`, with tabs `Top subjects` / `Certification prep`:

`Code foundations` · `Python` · `HTML & CSS` · `Data science` · `Professional skills` · `Java` · `Web development` · `Data analytics` · `Interview prep` · `JavaScript` · `Web design` · `Machine learning` · `Computer science` · `C++` · `Mobile development` · `AI` · `IT` · `C#` · `Game development` · `Cloud computing` · `Cybersecurity` · `Go` · `DevOps` · `Certification prep`

Subjects and languages are **interleaved in one flat list** here, then correctly separated in the footer into `Subjects` (17) and `Languages` (15). The homepage list also mixes in two non-subject items (`Interview prep`, `Professional skills`) and terminates in `Certification prep`, which is also the name of the sibling tab. One list, four different kinds of thing.

**Footer — eight blocks** `[observed]`: `Company` · `Resources` · `Support` · `Plans` · `Community` · `Subjects` · `Languages` · `Career building` · `Mobile`, plus a legal strip.

`Resources` is the notable one, because it names a whole secondary content estate as first-class nav: `AI Builder` · `Articles` · `Blog` · `Cheatsheets` · `Code challenges` · `Docs` · `Projects` · `Videos` · `Workspaces`. Nine content types, each a distinct format with its own noun. `Cheatsheets` and `Docs` as separate items from `Articles` is a real distinction (reference vs explanation vs narrative) and it is held consistently.

`Career building` block ends with a horizontal rule (`—`) then three items: `Full catalog` · `Beta content` · `Roadmap`. **`Roadmap` links to a public Trello board**, and `Beta content` is a catalogue filter. Shipping your release roadmap and your beta catalogue as footer links is a developer-audience convention imported into a consumer-education product, and it fits.

`Support` contains exactly one link: `Help Center`. **There is no contact link anywhere in the main site footer** — support is single-entry, through the help centre.

**Defect: `Refer a friend` in the `Community` block is not a link.** It renders as bare text alongside four working links.

**Corporate identity is disclosed twice, adjacently, with no explanation:** `Codecademy from Skillsoft` appears as a duplicated standalone line in the footer of every page.

**Help-centre top level — six categories** `[observed]`

`Codecademy Paid Content` · `Codecademy Curriculum` · `My Account` · `Fix a Problem` · `Using Codecademy` · `Codecademy for Teams`

**`Fix a Problem` is the standout IA decision in this file.** It is an imperative naming the user's intent at the moment of failure, sitting as a peer of five object-model categories. Not "Troubleshooting", not "Technical Issues", not "Support" — *Fix a Problem*. Second person implied, verb first, and it tells a stuck learner exactly where to go without them having to classify their own problem first. It is the Wise `Where is my money?` move applied to a technical product.

Note that three of the six category names are **brand-prefixed** (`Codecademy Paid Content`, `Codecademy Curriculum`, `Codecademy for Teams`) and three are not (`My Account`, `Fix a Problem`, `Using Codecademy`). Prefixing your own brand onto categories inside your own help centre is redundant, and the inconsistency means the list reads as two lists.

**Help-centre section names** `[observed]`

| Category | Sections |
|---|---|
| `Fix a Problem` | `Contact Support` · `Troubleshooting` · `Report a Bug` |
| `Using Codecademy` | `Getting Started` · `Our Product` · `Codecademy AI Builder` · `Codecademy Chapters` · `About Codecademy the Company` · `How to Give Feedback` |
| `Codecademy Curriculum` | `By Language` · `By Subject` · `Adafruit Partnership` |
| `Codecademy Paid Content` | `Overview` (+ others not expanded) |
| `My Account` | `Payments` (+ others not expanded) |

`Fix a Problem` decomposes into **three escalating channels** — self-serve (`Troubleshooting`), report-it (`Report a Bug`), talk-to-someone (`Contact Support`) — which is a clean model. But they are ordered `Contact Support` → `Troubleshooting` → `Report a Bug`, i.e. **human contact first**, the reverse of best practice and the reverse of what the category's own content does (see T7, where the primary troubleshooting article deflects away from email).

`How to Give Feedback` containing `Create a Course for Codecademy` and `Suggest a Course, Topic, or Path` is a nice touch — the feedback channel includes "write one yourself".

**Defect: the help centre's own footer is stale.** It carries a catalogue taxonomy that no longer matches the main site — `By Subject` lists `Web Development`, `Programming`, `Data Science`, `Partnerships`, `Design`, `Game Development`, where the live site's 17 subjects include none of `Programming`, `Partnerships` or `Design`. It also links `Forums` at `discuss.codecademy.com` and `Blog` at `codecademy.com/blog`, both superseded (the live blog is `codecademy.com/resources/blog`, and a help article titled `Moving away from Codecademy Forums and Discord` documents the forums' retirement). Two abandoned content models, live in the support footer.

## T2 Value proposition & headline patterns

**Hero is a single line with an animated substitution** `[observed]`:

> `Develop your/skills`

The slash is a line-break artefact; the rotating word set is visible in the image filenames — `skills`, `career`, `team`, `potential`, `self`. So the hero is `Develop your [skills | career | team | potential | self]`, animated, with a `Pause animation` control. Five completions spanning individual skill → whole self, and `Develop your self` is a notably large claim for a coding platform.

Subhead: "Grow in your career and unlock new opportunities by learning in-demand skills in AI, data, coding, cybersecurity, and more."

**Section headers are two-part: a one-word or short label, then a claim** `[observed]`

| Label | Header |
|---|---|
| — | `Build skills that stand out` |
| `The experience` | `Designed for progress` |
| `The platform` | `Learn by doing` |
| — | `Real success from real learners` |
| — | `No matter your goal, we have something for you` |
| — | `Technical training for your team` |
| `Live` | `Live Bootcamps and Workshops` |
| `One Subscription` | `All Access Pass` |

The `label + header` construction (`The platform` / `Learn by doing`) is used consistently and gives each section a machine-readable category plus a human claim. Clean.

**`Learn by doing` is the positioning, and it is restated in the same three words across surfaces** `[observed]`: the homepage section header, the paid-plans FAQ answer ("With Codecademy, you learn by doing. Our interactive platform will have you writing your own real code, right from day one."), and the pricing feature group `Learn by building`. One phrase, one idea, repeated verbatim — the strongest brand-message discipline in this batch.

**Value-prop bullets are verb-first and name the mechanism** `[observed]`, under four sub-headers:

- `Turn ambition into action` → "Find guided paths and interactive lessons no matter your skill level"
- `Gain hands-on expertise` → "Build portfolio-worthy projects that stand out in a competitive job market"
- `Transform your team` → "Access an exclusive admin dashboard to easily manage and track team progress"
- `Go further together` → "Get help when you need it, build your network, and learn together…"

**The platform showcase is the best-written part of the site** `[observed]` — four panels, each a feature name plus a sentence that leads with the *learner's problem*:

| Feature | Copy |
|---|---|
| `Step by step guidance` | "Self-paced learning doesn't mean you're on your own. Our courses and paths give you helpful guidance every step of the way." |
| `Powerful code editor` | "Simplify your setup. With our integrated learning experience, you can write and run code right in your browser." |
| `Live code changes` | "Interactive learning helps you better retain information. Test the code you write to practice and perfect new concepts." |
| `AI Learning Assistant` | "No need to waste time searching online. Get help working through problems, check solutions, and get error explanations — all without leaving the platform." |

**`Self-paced learning doesn't mean you're on your own`** is the single best sentence on the site. It names the exact fear that stops people buying self-paced education — isolation — and refutes it in nine words before describing the feature. Compare Coursera and edX, which both assert `Learn at your own pace` as an unqualified benefit and never address its downside.

Likewise **`Simplify your setup.`** and **`No need to waste time searching online.`** both open by naming a friction the learner already has (environment setup, Stack-Overflow hunting) rather than a capability the product has. Problem-first feature copy, three panels out of four.

**Pricing page framing** `[observed]`: `Find a plan that fits your goals`, then — and this is the notable one — a whole section for non-buyers:

> `Not ready for commitment?`
> "We want you to feel comfortable with your learning. Our free Basic plan lets you explore possibilities and make sure we're right for you."
> `Sign up for free`

A pricing page with a **named, headlined exit ramp for the undecided**, placed immediately below the three paid tiers rather than at the bottom. `make sure we're right for you` puts the platform on trial, not the learner. (Against this: the free `Basic` plan has no column in the comparison table — it exists only in this paragraph and in the FAQ. See T10.)

**Numeric claims** `[observed]`: `over 50 million people` / `Join over 50 million learners` (homepage, course page, meta) · `4 out of 5 Codecademy learners achieve what they set out to do` (paid plans) · `3,372,654 learners enrolled` / `12,220 ratings` / `4.57 out of 5 stars` (course page) · per-subject enrolment counts (`8,905,221 learners enrolled` for Code foundations).

`4 out of 5 Codecademy learners achieve what they set out to do` carries **no footnote, no source and no definition of "achieve what they set out to do"** — the vaguest outcome claim in this batch, and it is the only one on the page that sells the paid plans. Against that, the course-level counts are given to the individual learner (`3,372,654`) and the rating to two decimal places (`4.57`), which is the opposite instinct: precise where the data is real, vague where it isn't.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up — it's free` | Homepage foot | Price in the label, em-dashed |
| `Sign up for free` | Pricing, `Not ready for commitment?` | Same action, different label |
| `Sign up with Google` / `More ways to sign up` | Homepage inline signup | |
| `Start` | Course landing page, ×3 (top, mid-syllabus, foot) | **One word.** The lowest-friction CTA in this batch |
| `Try Pro for free` / `Try Plus for free` / `Try Plus` | Pricing and paid-plans | **`Try Plus` on one page and `Try Plus for free` on another, for the same link** |
| `Get all access` / `Get All Access` | Pricing / homepage | Two capitalisations |
| `Compare prices` | Paid plans, ×2 | |
| `See pricing and plans` | Course page, paid-features block | Third label for the pricing page |
| `Browse current offerings` | Bootcamps block | |
| `Take the quiz` / `Take our quiz to find what's best for you.` | Course finder | Second version is a full sentence used as a link |
| `Go to the catalog` / `Explore the catalog` / `View full catalog` / `View the full catalog` | Four places | Four labels, one destination |
| `Learn more about Teams` / `Learn about Bootcamps` / `Learn about Coaching` | B2B and new-product cards | `Learn <about> X` — specific, never bare |
| `Explore features` | Course page platform block | |
| `Expand all sections` / `Show all 13 modules` | Syllabus | Count injected on the second |
| `Load more` | Subject chips | |
| `Preview` | Course video | |
| `Continue reading` | Blog teaser | |
| `Meet the full team` | Curriculum-developer block, ×2 | |
| `Skip to Content` | First in DOM on every marketing page | See T14 |
| `Pause animation` | Hero, ×2 | See T14 |
| `Contact Us` | Help centre, top right | The only human channel |
| `Submit a request` | Help article foot | Under `Have more questions?` |
| `See all 12 articles` / `See all 11 articles` / `See all 27 articles` / `See more` | Help category and article pages | **`See all N` and bare `See more` used interchangeably on the same page** |
| `View Help Center` | Pricing FAQ foot | |
| `Get the Solution` | In-product control | `[documented]` — see T7 |
| `Get Unstuck` | In-product control | `[documented]` — the hint/report entry point |
| `Report an Issue` | In-product control | `[documented]` — named only in the Accessibility Guide |
| `Bugs` | Sub-option inside `Get Unstuck` | `[documented]` |
| `Tools` → `High Contrast Mode` / `Disable Word Wrap` / `Dark Mode` | Code-editor menu | `[documented]` — see T14 |

**Observations.** `Start` as the entire CTA on a course page is the most confident label here — no "Enroll", no "Get started free", no price, no date. It works because the course is genuinely free to begin and there is nothing to configure.

Against that, the label churn is the worst in this batch: **four labels for the catalogue**, **three for the pricing page**, two for signup, two capitalisations of `All Access`, and `Try Plus` vs `Try Plus for free` for one link. And `Learn by doing` (homepage) vs `Learn by building` (pricing feature group) vs `Learn while building` (Plus plan tagline) — three variants of the core brand phrase, on two pages.

## T4 Onboarding & getting-started — **PRIORITY**

Codecademy's pre-auth onboarding is **a free-first funnel with an explicit uncertainty path**, and its commitment cues are the most honestly-qualified in this batch.

**Step 1 — the uncertainty path is named and headlined** `[observed]`

> `No matter your goal, we have something for you`
> `Not sure? Take our quiz to find what's best for you.` → `Take the quiz`
> and again: `Want help figuring out what to learn?` → "Take our quiz to find what's best for you."

Two separate placements of the same escape hatch, both phrased as the learner's own admission (`Not sure?`, `Want help figuring out what to learn?`). Codecademy treats "I don't know what I want" as a first-class entry state rather than a funnel leak. Complemented in the help centre by an article titled `Picking Your Learning Path`.

**Step 2 — course cards carry a four-part commitment signature** `[observed]`

The catalogue card grammar is `<content type> <title> <description> <level> <hours>`:

| Type label | Title | Level | Time |
|---|---|---|---|
| `Career path` | `Data Scientist: Machine Learning Specialist` | `Beginner Friendly` | `95 hours` |
| `Course` | `Learn Python 3` | `Beginner Friendly` | `24 hours` |
| `Certification path` | `SY0-701: CompTIA Security+` | `Intermediate` | `14 hours` |
| `Skill path` | `Code Foundations` | `Beginner Friendly` | `4 hours` |

**Time is expressed in hours, not weeks or months.** This is the correct unit for this product and the opposite of Coursera (`6 months at 10 hours a week`) and edX (`2-4 months`). Hours are what the learner actually spends; weeks are what the platform assumes about their schedule. Codecademy makes no schedule assumption at all, so the range `4 hours` → `95 hours` is directly comparable across its whole catalogue with no conversion.

`Beginner Friendly` rather than "Beginner" is a small, good choice — it describes the course's disposition toward the learner rather than classifying the learner.

**Step 3 — the course landing page, and the qualified time estimate** `[observed]`

The badge block on `Learn Python 3`:

| Badge | Value |
|---|---|
| `Skill level` | `Beginner` |
| `Time to complete` | `24 hours` — with the tooltip **`Average based on combined completion rates — individual pacing in lessons, projects, and quizzes may vary`** |
| `Projects` | `14` |
| `Prerequisites` | `None` |

**That tooltip is the most transferable single string in this file.** It does three things in one line: it names the *derivation* of the number (`combined completion rates` — i.e. observed behaviour, not content length), it names the *statistic* (`Average`), and it bounds the claim by naming the three components whose pacing varies. This is precisely the Wise pattern — claim, then bound the claim — applied to a commitment cue.

Compare Coursera, which publishes a derived arithmetic figure (`2 months at 10 hours a week`) in the badge and a contradictory empirical figure (`about 8 months`) in the FAQ, with no reconciliation. Codecademy publishes one figure, tells you it is an average of real completions, and tells you what will make yours differ. **A platform that derives its time estimate from completion data rather than content duration, and says so, in the tooltip, at the point of decision.**

`Prerequisites: None` as a filled-in field rather than an omission is the same instinct as Wise's `Free` in a fee table.

**Step 4 — `This course includes`, stated twice before the CTA** `[observed]`

> `AI assistance for guided coding help` · `Projects to apply new skills` · `Quizzes to test your knowledge` · `A certificate of completion`

Four items, each `<thing> <purpose>` — the noun plus what it is *for*. Not "AI assistance" but "AI assistance **for guided coding help**". Rendered twice on the page (responsive variants).

**Step 5 — syllabus disclosure** `[observed]`

> `14 lessons • 14 projects • 13 quizzes` · `Expand all sections` · `Show all 13 modules`

Each module numbered, titled, and given a one-sentence description that **ends in the artefact you will build**:
- `Hello World` — "Get started with Python syntax in this lesson and then create a point of sale system for a furniture store!"
- `Functions` — "Learn about code reuse with Python functions. Apply that knowledge to create functions for famous physics formulas."
- `Strings` — "Figure out how to automatically create, rearrange, reassign, disassemble, and reassemble blocks of text!"

**Concept → application, in every module description, with the application made concrete and slightly silly** (a furniture-store point-of-sale system, physics formulas, ASCII block letters, a Magic 8-Ball). Project names are jokes: `Receipts for Lovely Loveseats` — "Keep receipts for your lovely loveseats. Programming is a treat with this sweet suite of feats!" That is four internal rhymes in one project description, on an assessment artefact. Deliberate, and it does motivational work: the project is pre-framed as play.

One module is explicitly marked optional in its own title: `Python: Code Challenges (Optional)`. And the certificate gate is disclosed **inside the syllabus, as a syllabus item**: `Certificate of completion available with Plus or Pro`. The paywall appears where the learner is reading the contents, not only in a pricing block.

**Step 6 — lesson-level scaffolding** `[documented]`, and the Accessibility Guide is the best source for it because it describes the structure to someone who cannot see it:

> "Codecademy's Learning Environment is typically split into 2-5 'panes,' each of which is an ARIA Region on the page and includes a visually hidden heading on top of it. The first pane is always a 'Narration Pane.'"

Pane headings, verbatim: `Narrative` · `Code Editor` · `Read-only Code Pane` · `Output Terminal` · `Output-only Terminal` · `Terminal` · `Web Browser`.

The `Narration Pane` contains three named groups:
1. **`Introduction`** — "Description of what the current content item entails, such as an explanation of an exercise's concepts or summary of a project."
2. **`Checkpoints`** — "The steps that must be completed before moving on."
3. **`Additional Resources`** — "Links to cheatsheets and any other relevant resources."

And `Checkpoints` behave differently by content type, which is the key instructional-design distinction:

> "For exercises, the code you submit will be checked automatically. If your code is considered correct, the checkpoint will be marked as complete. If it's not correct, an error will appear explaining what went wrong."
> "For projects, you will need to mark the checkpoints as complete yourself once you're satisfied with your work."

**Auto-verification for exercises, self-attestation for projects.** The scaffolding model is explicit: where there is a right answer, the machine decides; where there is craft, the learner decides. A separate help article exists for exactly this — `How Lessons and Projects Differ in Codecademy's Learning Environment`.

## T5 Form & field labels

Pre-auth forms are minimal. `[observed]`

**Signup:** `Or sign up with` · `Google` / `Sign up with Google` · `OR` · `More ways to sign up`. Field labels for email signup are behind `/register`. `[absent]`

**Search:** the course-finder block renders the hint text `Results will be updated as you type` — a **live-region announcement leaking into the visible label**, but also genuinely useful as a visible hint.

**Pricing table row labels** are feature names with hover definitions, grouped under six headers. The value cells use four distinct states: (included, unlabelled tick) · `Not available under Plus` (rendered with a `-`) · `Limited` · `Purchase separately` · `Annual plan only` · `Standard credits` / `2X credits`.

**Six distinct entitlement states in one comparison table** is unusually granular, and each has an accessible-text variant appended (`Not available under Plus`, `Limited under Plus`, `2X credits under Pro`) so the cell is meaningful out of column context. That is correct practice for a comparison table — the visible cell says `Limited`, the accessible name says `Limited under Plus`. It does mean the strings render doubled in the server HTML.

**Help-centre form labels** `[observed]`: `Contact Us` · `Submit a request` · `Have more questions?` · `Was this article helpful?` → `Yes` / `No`, followed by a raw fraction.

## T6 Status & state language

**Progress and completion states** `[documented]`

- **`checkpoint`** — the atomic unit of progress; `marked as complete` is the state change
- **`Certificate of Completion`** — the terminal credential, gated on plan
- **`course progress`** / `course completion progress` — quizzes count toward it; assessments explicitly do not
- **`passing score is 70% or higher`** — stated three times, once per assessment type
- **`Reset Progress on a Course, Path, or Exercise`** — a destructive state reset, promoted to a *featured* article on the help centre home (and there under the older title `Reset Progress on a Course or Exercise`, without `Path` — the same article, two titles)
- **`Removing courses and Paths from My Learning`** — `My Learning` is the named collection
- **`Skill XP`** and **`Skill Tracking`** — two separate FAQ articles; `Skills tracking` is a pricing-table feature glossed as "Visualize the skills you're building, measure your progress, and see where to focus your growth"
- **`Maintain Progress After a Cancellation`** — a help article whose title *is* the reassurance

**Three assessment states, precisely differentiated** `[documented]` — from `Quizzes, Assessments, and Exams: What's the Difference?`:

| | `Quizzes` | `Assessments` | `Exams` |
|---|---|---|---|
| Stakes | "short, low-stakes" | "more comprehensive" | comprehensive, two-part |
| Retakes | "as many times as you like" | "within 24 hour" [sic] | "within 24 hour" [sic] |
| See wrong answers | yes (implied) | "you won't be able to see which questions you get wrong" | same |
| Counts toward completion | yes | no | — |
| Required | after lessons | "encouraged but not required" | required for professional certification |
| Pass mark | `70% or higher` | `70% or higher` | `70% or higher` |

This article is the platform's clearest piece of expectation-setting, and its 95% helpfulness score (`77 out of 81`) is the highest of any article captured here. **A definitional article that distinguishes three near-synonyms is the highest-rated article in the help centre** — which tells you how much confusion the vocabulary was causing.

**Two live defects in it.** `You may retake assessments within 24 hour` — missing plural — appears **twice**, and the second instance is under the **`Exams`** heading where it still says "assessments". So the exam retake rule is stated in terms of the wrong object. On the article that exists specifically to distinguish the two.

**Trial and subscription states** `[documented]`: trial → billed at day 7 → active → cancelled (`deactivate your subscription at the end of your current billing cycle`). Non-conversion state is described precisely: "progress made during trial will not be lost however your quizzes, paths, and projects will be unavailable until you upgrade."

**No public status page was found.** `[absent]`

## T7 Error, failure & recovery — **PRIORITY, and the richest section in this file**

### The hint ladder, verbatim

`[documented]` from `Understanding Code Errors`, which is the canonical source. The full escalation, in the order Codecademy gives it:

> `Getting stuck is part of the learning process, so don't feel discouraged! Every great programmer has been confused at some point. Here are the basic steps you'll need to troubleshoot code:`
>
> 1. `Re-read the instructions and make sure that you fully understand what each question is asking.`
> 2. `Check your code for spelling mistakes, especially in any function or variable names.`
> 3. `Make sure your code is indented correctly and cleanly.` (with a note that Python requires it and other languages don't)
> 4. `Read the "Hints" section, which can be found at the bottom of the instructions on the left of the page.`
> 5. `Take a peek at our Articles page for a more in-depth description of certain concepts and terms.`
> 6. `Check out the Codecademy Community!`
>
> Then, if still stuck: `try resetting the exercise and writing your code over again` — "This can seem frustrating at first, but you will often fix the mistake that is causing your issue by writing your code over again."
>
> Then: `You can always click "Get the Solution" as well. We encourage you to review the solutions code to review where the error was occurring.`
>
> And separately, for suspected platform error: `If you think a code error message is incorrect, please let us know! You can submit a bug within the learning environment by selecting Get Unstuck at the top of your screen. From there, select Bugs and report the issue.`

**Eight rungs, in a deliberate order, and the ordering is the craft.** The first three rungs are things the *learner* does to their own code, unaided. Only rung four reaches for a platform affordance (`Hints`). Rungs five and six leave the exercise for reference material and people. Rung seven is destructive-but-generative (`reset and rewrite`). Rung eight is the answer (`Get the Solution`). The ninth path — `Get Unstuck` → `Bugs` — is for when the learner believes the *platform* is wrong, not them.

Four things worth pulling out.

**One. The opening frame normalises failure before instructing.** `Getting stuck is part of the learning process, so don't feel discouraged! Every great programmer has been confused at some point.` Two sentences, both affective, placed before any troubleshooting step. It reframes stuckness as membership (`Every great programmer`) rather than deficiency. This is the register the whole ladder depends on — the learner has to still be reading at rung seven.

**Two. `Get the Solution` is offered without shame, and with a purpose.** `You can always click "Get the Solution" as well. We encourage you to review the solutions code to review where the error was occurring.` **`You can always`** — permission, unconditional. And `We encourage you to review` converts the escape hatch into a learning step. Most platforms either hide the solution or gate it behind a delay; Codecademy names it as a legitimate rung and tells you what to do with it.

**Three. `Get Unstuck` is the control name, and it is exactly right.** A single button, at the top of the learning environment, named after the learner's state rather than its own function. Not "Help", not "Support", not "Report" — `Get Unstuck`. It is also multi-purpose: the Accessibility Guide confirms it is the route for both curriculum issues and accessibility problems, alongside a `Report an Issue` button.

**Four. Rung seven is honest about how it feels.** `This can seem frustrating at first, but you will often fix the mistake that is causing your issue by writing your code over again.` The advice is "throw away your work and start again", and the copy concedes the frustration before justifying it. Naming the cost of your own advice.

**And the one blunt disclosure**, on the bug-report path:

> `*Please note that these are sent directly to our Curriculum Quality team for review but this team will not respond back directly when the bug is fixed or if they determine it is not a bug.`

A **no-reply guarantee, stated up front.** Ugly (the stray asterisk, the doubled "not a bug"), and completely honest: you will never hear back, either way. That is better than an implied SLA that never arrives, and it is the kind of thing most products leave the user to discover.

### The in-product error feedback itself

`[documented]` — three independent descriptions, all consistent:

- Accessibility Guide: "If your code is considered correct, the checkpoint will be marked as complete. **If it's not correct, an error will appear explaining what went wrong.** Either way, it will be actively narrated by screenreaders."
- Homepage platform showcase: `AI Learning Assistant` — "Get help working through problems, check solutions, and **get error explanations** — all without leaving the platform."
- Pricing table: `AI Learning Assistant` — "Get help working through problems, check your answers, and get **explanations for errors and concepts** without leaving the platform."
- Course page: `AI-assisted learning` — "our AI Learning Assistant, a tool that **automatically understands your current course, instructions, and solution code** — and gives you instant, personalized feedback."
- Course page alt text: `Animated GIF of an AI provided error explanation within Codecademy's learning environment` and `An AI-generated hint within the instructions of a Codecademy project`

So the model is: **deterministic pass/fail on the checkpoint + a written explanation of what went wrong + an AI layer that has the instructions and the reference solution in context and can explain the error or generate a hint.** The actual error strings are behind auth and were not observed. **`[absent]` for the verbatim error copy** — which is the one real gap in this file's priority section.

Note the AI assistant is **tiered**: `Limited` under Plus, full under Pro, and two separate help articles govern free access (`AI Learning Assistant Availability`, `AI Assistance for free learners`). Error explanation quality is a paid feature, which is a consequential content-design fact.

### The deflection article, and its cost

`Code Troubleshooting` exists specifically to say Codecademy will not debug your code:

> `At the moment, we aren't able to troubleshoot coding questions by email. However, we want to ensure you get the help you need so if you get stuck or have questions at any point, we recommend you check out the Codecademy Community!`

Then routes to a `Club` aligned to the learner's path, and asks them to read `Community Guidelines` first.

**`At the moment` is doing hedging work on a permanent policy**, and the article scores **`66 out of 287 found this helpful` — 23%.** It sits in the `Troubleshooting` section of `Fix a Problem`, i.e. exactly where a stuck learner lands, and three-quarters of them found it unhelpful. Recorded as a real defect: a deflection dressed as help, in the position help should be.

Its sibling `Understanding Code Errors` — the one that actually contains the ladder — scores **`51 out of 167`, 31%**. So both of the platform's core stuck-learner articles are rated poorly by the people who read them, despite `Understanding Code Errors` being genuinely well-written. The most likely reading: a learner arriving at either article wants *their specific error* explained, and a generic ladder cannot do that. The articles are good content in the wrong job.

### The rest of the failure surface

`Troubleshooting` section, 12 articles, titled after the **observable symptom**, not the cause:

`Timeout Error After Submitting An Exercise` · `Browser Freezing When Submitting An Exercise` · `Connection Lost in Codecademy's Learning Environment` · `Disconnecting Learning Environment on Loops` · `Cloudflare Blocking Access to Codecademy` · `If you receive a 1015 error` · `Compatible Browsers` · `Hardware Requirements` · `Code Troubleshooting` · `Understanding Code Errors` · `Reset Progress on a Course, Path, or Exercise`

Two of these are excellent. **`Disconnecting Learning Environment on Loops`** names a specific, diagnosable failure mode — an infinite loop in learner code killing the sandbox — which is a *pedagogically predictable* error for a platform that teaches loops. Shipping a help article for the failure your own curriculum causes is good content ops. And **`If you receive a 1015 error`** uses the `If you <experience X>` conditional-title form, which reads as addressed to someone mid-failure.

`Cloudflare Blocking Access to Codecademy` names the third-party vendor in the title — the same specificity as Wise's named-issuer decline article.

`Report a Bug` section: `Report a Bug or Typo` (bundling content errors with software errors, correctly — a typo in an instruction *is* a blocker when the instruction is being auto-graded) and `Codecademy's Policy on Reporting Security Vulnerabilities`.

## T8 Empty states

`[observed]` — one, and it is a defect rather than a designed state:

> `Loading menu bar`

This string renders **twice** in the server HTML of every marketing page inspected (homepage, pricing, paid plans, course landing page), where the global navigation should be. It is a loading placeholder, not an empty state, and it is what a non-JS client, a slow connection, or a search crawler sees instead of the site's navigation. It is also announced to assistive technology.

Related: `Search / Search` renders as a doubled bare label in the same region.

Designed no-data states (`My Learning` with nothing in it, zero search results, no certificates yet) are behind auth. `[absent]`

## T9 Notifications & system messages

**The finding here is a stale banner, and it is the most conspicuous defect in this batch.** `[observed]`

Every page of the Codecademy help centre — home, all six category pages, and every article — renders this at the top:

> `Codecademy will be closed on Monday, February 21st in observance of Presidents Day. We will reopen on Tuesday, February 22nd.`

Harvest date: **21 September 2026.** The last year in which Presidents Day fell on Monday 21 February with a Tuesday 22 February following was **2022**. This is a service-availability notice roughly four and a half years out of date, occupying the highest-priority slot on every page of the support estate, above the `Contact Us` button.

Two compounding problems. It is **undated and unyeared**, so a reader cannot tell it is stale without knowing the calendar — someone arriving in February 2027 (when Presidents Day is Monday the 15th) would reasonably believe support is closed. And it displaces the slot where a *real* incident notice would go, so the mechanism for urgent support comms is permanently occupied by a dead message.

Recorded as the clearest available example of the **unowned-banner failure mode**: a temporary notice with no expiry, in a system with no review cadence.

**Other messaging** `[observed]`:
- `Have more questions?` → `Submit a request` — on every article foot
- `Was this article helpful?` → `Yes` / `No` → raw fraction (`2252 out of 3803 found this helpful`). Publishing the raw count rather than a percentage is honest and, in Codecademy's case, brutal (see T14 negative findings).
- `Results will be updated as you type` — live-region text rendered visibly
- `Pause animation` — hero motion control, rendered twice
- Billing notice, in the free-trial article: "accounts are charged after day 7 of the trial", and in the refund policy: "you will be billed exactly 7 days from the date and time you completed checkout unless you cancel your Trial prior to its end date." **`exactly 7 days from the date and time`** — to the hour, stated twice.
- `$1.00 Pre-Authorization Charge` exists as a payments article, i.e. a mystery card charge is common enough to need documenting.

Push, email and in-product toast copy: `[absent]`.

## T10 Disclosures, legal & compliance

### The refund policy — a flat no, and how it is worded `[observed]`

> `Codecademy Pro and Plus are subscriptions. By signing up for a Codecademy subscription, you acknowledge and agree to our Terms and Service that confirm we are authorized to use the payment information on file for the annual or monthly renewal fee depending on the subscription plan type selected at checkout.`
>
> `To avoid renewal and prevent future billing, you may cancel your Pro or Plus subscription at any time. Canceling will deactivate your subscription at the end of your current billing cycle, up to which point you still have access to Pro or Plus. If you sign up for a Trial, you will be billed exactly 7 days from the date and time you completed checkout unless you cancel your Trial prior to its end date.`
>
> *`We do not grant refunds, prorated or full, for subscriptions.`* `If you would like to request a refund exception, please contact the Customer Support team by clicking the Contact Us button in the righthand corner.`

**This is the sharpest contrast in the whole batch.** edX gives a two-column eligibility table with two clocks and a named outer bound; Coursera gives a 7-day trial and a 14-day no-questions annual refund; Codecademy gives **one italicised sentence of refusal**.

What it does well: the refusal is unambiguous, it closes both loopholes in five words (`prorated or full`), it states the cancellation mechanics *before* the refusal (so the reader learns how to avoid needing one first), it confirms you keep access to the end of the paid period, and it discloses the exact trial billing moment (`exactly 7 days from the date and time`). It also leaves a door open (`request a refund exception`) and names the control (`Contact Us button in the righthand corner`).

What it does badly, and the number is the evidence: **`1155 out of 11670 found this helpful` — 9.9%.** Eleven and a half thousand people rated this article and nine out of ten found it unhelpful. It is the single worst-rated artefact captured anywhere in this batch, and Codecademy publishes the count.

That is a genuine content-design lesson rather than just a gotcha. The article is clear, correctly scoped, and legally sound — and it is useless to its readers, because they arrived wanting money back and it says no. **Clarity and helpfulness are different metrics, and a no-refund policy cannot be written into a good helpfulness score.** What *could* move it: leading with the exception route rather than burying it in sentence three, and stating what the exception criteria actually are.

Also note the typo in the binding sentence — `our Terms and Service` (should be *Terms of Service*) — in the one paragraph that establishes billing authorisation.

Bootcamps and Workshops are carved out to a separate policy, linked with a text-fragment anchor (`#:~:text=Can%20I%20get%20a%20refund...`), which is fragile linking on a compliance path.

### Free trial terms `[observed]`

> `New Codecademy accounts are eligible to receive a free trial of Codecademy Pro or Plus. A valid credit or debit card is required to receive a trial, and accounts are charged after day 7 of the trial.`
>
> `To maintain access to these features after 7 days, you need a paid subscription. If you choose not to upgrade, progress made during trial will not be lost however your quizzes, paths, and projects will be unavailable until you upgrade. If you want to hold onto your projects, we recommend pushing them to Github or saving them on your personal computer.`

**The non-conversion consequence is stated precisely, and then mitigated with practical advice against Codecademy's own commercial interest.** `progress … will not be lost` / `quizzes, paths, and projects will be unavailable` — the distinction between *retained* and *accessible* is exactly the thing a lapsing user needs, and most products elide it. Then: `we recommend pushing them to Github or saving them on your personal computer` — a platform telling you how to get your work out before the paywall closes. That is the strongest trust move on the site.

Card requirement is disclosed up front (`A valid credit or debit card is required`), as is the charge timing. Helpfulness: `2252 out of 3803` — 59%, the second-highest of the four commercially-sensitive articles captured.

### Pricing and plan disclosure `[observed]`

Four tiers, and the annual/monthly framing is consistent:

| Plan | Tagline | Headline price | Monthly alternative | Positioning line |
|---|---|---|---|---|
| `Basic` | — | free | — | "lets you explore possibilities and make sure we're right for you" |
| `Plus` | `Learn while building` | `$14.99/mo` `Billed annually` | `or $29.99 billed monthly` | "Build in-demand technical skills for work or a personal project" |
| `Pro` | `Build your career` | `$19.99/mo` `Billed annually` | `or $39.99 billed monthly` | "Develop the experience to land a job and move up in your career" |
| `All Access` | `Grow with confidence` | `$54.99/mo` `Billed annually` | — (annual only) | "Carve your own path with unlimited expert-led bootcamps" |

Good practice: the **monthly price is shown adjacent to the annualised price in every tier**, so the annual-billing discount is visible rather than hidden, and the annual-only constraint on `All Access` is stated by omission plus a footnote. `Annual plans include 1 complimentary workshop.` repeats on all three paid tiers, with a full definition in the feature table: "One complimentary live workshop per new annual subscription or renewal. You're auto-enrolled in the next available session, and a recording is available afterward. Annual plans only." **Auto-enrolment disclosed**, plus the recording fallback.

**Defect: `Basic` has no column.** The section header says `Find a plan that fits your goals` and shows three; the free plan exists only in a prose block below and in the FAQ (`What's the difference between Basic, Plus, Pro, and All Access?`). So the comparison table cannot answer the most common question about the free tier — what you *don't* get — which is the question the table is for.

**Defect: plan naming is not stable across surfaces.** The pricing table's third column is headed `All Access` in the plan card and `Bootcamp All Access Pass` in every feature row of the same table. The help centre calls it `All Access Pass`. The homepage calls it `All Access Pass` in the header and `Get All Access` on the button. Four renderings of one product name, two of them in one table.

**Builder credits** are a metered currency with disclosed renewal: "Use credits to learn by building. Credits renew automatically each month, but you can purchase more anytime." `Standard credits` (Plus) vs `2X credits` (Pro) — a relative entitlement with no absolute number anywhere on the page. `[absent]` for the actual credit count.

### Credential disclosure `[observed]` / `[documented]`

Codecademy's credential vocabulary is two-tier and it disambiguates them explicitly:

- **`Certificate of completion`** — "Receive a certificate of completion for every course or path you finish." Available on Plus, Pro and All Access; **not** on Basic. Framed honestly as proof of *completion*, not of competence: `Show proof` — "Receive a certificate that demonstrates you've completed a course or path."
- **`Professional certification`** — "Prove you're job-ready by earning a professional certification when you pass all exams in select career paths." Pro and above only.

And a dedicated pricing FAQ: `What's the difference between a certificate of completion and a professional certification?` **The certificate/certification distinction that edX draws in a subordinate clause, Codecademy promotes to an FAQ question.** Both platforms draw it; nobody else in the batch does.

`Build a collection` — "The more courses and paths you complete, the more certificates you collect" — is the one place the certificate framing tips into gamified accumulation rather than evidence.

### Other disclosure furniture `[observed]`
`Privacy Policy` · `Cookie Policy` · `Do Not Sell My Personal Information` (→ `privacy.codecademy.com`, a real destination, unlike edX's broken equivalent) · `Terms`. Support-side: `VAT Tax` · `Tax Exempt Purchases` · `Paying by Invoice and Invoice Customization for Individual Subscriptions` · `Getting Reimbursed for Codecademy Pro or Teams by your company` · `Afterpay` · `Does Afterpay require a credit check?` · `$1.00 Pre-Authorization Charge` · `Codecademy Referrals`.

`Does Afterpay require a credit check?` as a standalone article title is good BNPL practice — the question a buyer actually has about a BNPL option, answered in the title's own terms.

`Is Codecademy suitable for children?` appears in the pricing FAQ — an age-appropriateness question in a commercial FAQ, which is the right place for it.

Discount programmes are disclosed as separate FAQ entries: `Do you offer a student discount?` · `Do you offer discounts for military, first responders, healthcare workers, and educators?` · `Do you offer discounts for people receiving government assistance?` **Three separate eligibility questions rather than one "discounts" catch-all**, which means each named group can find themselves.

## T11 Help-centre architecture

Zendesk, three levels: 6 categories → named sections → articles, with `See all N articles` / `See more` and a per-article `Articles in this section` sidebar. Single locale (en-US only — no language switcher, unlike edX's six).

**Structure covered in T1.** What is distinctive:

**One. `Fix a Problem` as a top-level imperative category** — covered in T1, and the best IA decision in this file.

**Two. The article-title grammar is inconsistent in a diagnostic way.** Five shapes are in use:

| Shape | Examples |
|---|---|
| Bare noun phrase | `Refund Policy` · `Compatible Browsers` · `Hardware Requirements` · `Accessibility Guide` · `Codecademy Community` · `Afterpay` |
| Gerund / imperative task | `Reset Progress on a Course, Path, or Exercise` · `Removing courses and Paths from My Learning` · `Report a Bug or Typo` · `Adding Codecademy to your LinkedIn Education` · `Suggest a Course, Topic, or Path` |
| Question | `Does Afterpay require a credit check?` · `How do Chapters work?` · `Who is Codecademy Chapters for?` · `How can I get involved?` · `Quizzes, Assessments, and Exams: What's the Difference?` |
| Symptom statement | `Timeout Error After Submitting An Exercise` · `Browser Freezing When Submitting An Exercise` · `Connection Lost in Codecademy's Learning Environment` · `Cloudflare Blocking Access to Codecademy` |
| Conditional | `If you receive a 1015 error` |

The **symptom-statement** shape is the one worth stealing and it is used exactly where it should be — in `Troubleshooting`, where the learner knows what they are seeing and not what it is called. Elsewhere the mixing is just inconsistency: `How do Chapters work?` sits beside `Codecademy Community`, and `Skill XP FAQ` / `Skill Tracking FAQ` / `AI Builder FAQ` use a `<Topic> FAQ` suffix found nowhere else.

**Three. There are two adjacent articles with near-identical titles about different things:** `Understanding Code Errors` (troubleshooting your own code) and `Understanding Your Code` (in `Getting Started`). They appear in each other's sidebars. A learner scanning for help with an error message has a 50% chance of the wrong one.

**Four. Featured-article titles disagree with the articles' own titles.** The help-centre home lists `Codecademy Free Trial` (URL slug: `Codecademy-Pro-Free-Trial`), `Refund Policy` (slug: `Pro-Refund-Policy`), `Reset Progress on a Course or Exercise` (actual title: `Reset Progress on a Course, Path, or Exercise`) and `Updates to your Dashboard` (slug and actual title: `Updates to our Dashboard` — **`your` vs `our`**). Four of six featured articles have a title/slug/actual-title mismatch. The `Pro-` prefixes are legacy: Codecademy renamed `Codecademy Pro` to a `Plus`/`Pro`/`All Access` ladder and the URLs still carry the old product name.

**Five. Routing furniture is thin.** `Contact Us` top-right on every page, `Have more questions?` → `Submit a request` at every article foot, `View Help Center` from the pricing FAQ. There is no search box in the server HTML, no `Popular search topics` seeding (compare edX), and no promoted escalation lede. The help centre's entry experience is `We're here to help.` followed by six featured links.

## T12 FAQs

FAQs sit on marketing pages; the help centre carries the procedural content. Three blocks captured.

**Pricing page — 15 questions in three named groups** `[observed]`. **Answers were not server-rendered** (accordion content is client-side); questions verbatim:

*`General`*
| # | Question (verbatim) |
|---|---|
| 1 | What's the difference between Basic, Plus, Pro, and All Access? |
| 2 | Do I need to have experience before signing up? |
| 3 | What are skill paths, career paths, and certification prep paths? |
| 4 | What are Codecademy bootcamps? |
| 5 | How many bootcamps can I take? |
| 6 | What's the complimentary workshop included with annual plans? |
| 7 | What's the difference between a certificate of completion and a professional certification? |
| 8 | Is Codecademy suitable for children? |
| 9 | Do you offer a student discount? |
| 10 | Do you offer discounts for military, first responders, healthcare workers, and educators? |
| 11 | Do you offer discounts for people receiving government assistance? |

*`Upgrades`* — 12. Why should I upgrade from Basic? · 13. How do I upgrade my plan?
*`Canceling`* — 14. How do I cancel my subscription? · 15. Can I cancel or switch my bootcamp enrollment?

**Grouping an FAQ into `General` / `Upgrades` / `Canceling` is the notable structural choice.** `Canceling` gets its own named group, on the pricing page, with two questions in it. A subscription business that files cancellation as a first-class FAQ section rather than hiding it in the help centre is doing something most don't. (The section header uses the US single-l spelling throughout, consistently.)

Q1 and Q3 and Q7 are all "what's the difference between" questions — **three of eleven General questions exist to disambiguate Codecademy's own product names.** Same signal as MasterTrack's definitional FAQ: when a fifth of your FAQ is glossary, the naming has failed.

**Paid-plans page — 4 questions, answers rendered** `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Why Codecademy? | "We believe anyone (and everyone) can learn to code" — lessons for any starting level |
| 2 | What makes Codecademy different? | "With Codecademy, you learn by doing" — real code from day one; "Don't worry, it's easier than you may think." |
| 3 | What's the difference between Pro and Plus? | Pro = everything including career features (career paths, interview prep, professional certifications, job-readiness checker); Plus = everything except career features |
| 4 | What's a career path? | Step-by-step guidance to languages, theory, projects, certifications, interview prep and career help, to land an entry-level job; Pro only |

Q1's answer opens `We believe anyone (and everyone) can learn to code.` — a mission statement as the answer to a commercial question, and the parenthetical `(and everyone)` is doing inclusion work in three words. Q2's answer ends `Don't worry, it's easier than you may think.` — pre-empting intimidation on the page that asks for money.

Q3's answer is the cleanest plan-differentiation sentence on the site: **Plus is Pro minus career features**, stated as a subtraction. That is more decodable than the pricing table's six entitlement states.

**Course page — 6 questions, subject-level not product-level** `[observed]`: `What is Python 3?` · `What is Python 3 used for?` · `What kind of jobs can Python 3 get me?` · `Why is Python so popular as a first coding language?` · `What do I need to know before learning Python?` · `Is there a Python 1 and 2?`

All six are about the *language*, none about the course. The FAQ is serving a learner who is still deciding whether to learn Python at all — correct for the traffic a course landing page gets, and the same instinct as Coursera opening its certificate FAQ with `What is data analytics?`. `Is there a Python 1 and 2?` is the charming one: a naming-confusion question, answered because people ask it.

## T13 Terminology & glossary — **PRIORITY**

`[observed]` / `[documented]` as marked. Every term appears verbatim on a cited page.

### Content-type ladder — four path types plus courses

| Term | Gloss (verbatim where quoted) | Time seen |
|---|---|---|
| `Course` | "Find a standalone course for whatever tech topics you'd like to learn." | `1 hour` – `24 hours` |
| `Skill path` | "Learn everything you need to gain a specific skill, like creating AI automations for IT or building a ML model." | `4 hours` |
| `Career path` | "Get step-by-step guidance as you build the knowledge and experience to land a tech job (like a Data Scientist or AI Engineer)." Pro only | `95 hours` |
| `Certification path` | "Access guided paths that help you prepare for top certifications from AWS, Microsoft, CompTIA, ISC2, and more." Pro only | `14 hours` |
| `Bootcamp` | "live virtual bootcamps that span multiple weeks"; expert-led, mentorship, includes Pro access | `multiple weeks` |
| `Workshop` | One live session; `1 complimentary workshop` with annual plans | one session |
| `Coaching` | "personalized mentorship from expert coaches"; `1:1` | — |

**This ladder is better-named than either MOOC's.** Each path type is `<qualifier> path`, and the qualifier states the *outcome class*: a skill, a career, a certification. A learner can place any of the three without a glossary, and the three are genuinely different things (a capability, a job, an external exam). Compare Coursera's `Specialization` / `Professional Certificate` / `MasterTrack` / `University Certificate`, which encode issuer and level rather than outcome, and require the glossary Coursera's own FAQ has to supply.

The defect is that the pricing FAQ still needs `What are skill paths, career paths, and certification prep paths?` — and note the drift: the pricing table says `Certification paths`, the FAQ says `certification prep paths`, and the homepage tab says `Certification prep`.

### Learning-environment vocabulary
`Learning Environment` (capitalised, a named place) · `pane` · `Narration Pane` / `Narrative` · `Code Editor` · `Read-only Code Pane` · `Output Terminal` / `Output-only Terminal` / `Terminal` · `Web Browser` · `checkpoint` · `Introduction` · `Additional Resources` · `Hints` · `Get the Solution` · `Get Unstuck` · `Report an Issue` · `Bugs` · `Tools` · `High Contrast Mode` · `Disable Word Wrap` · `Dark Mode` · `Screenreader Mode` · `Workspaces` · `AI Learning Assistant` · `AI Builder` · `Builder credits`

**`checkpoint` is the pedagogical unit and it is the right word** — it implies a waypoint you pass, not a test you pass or fail, and it is used identically for auto-graded exercises and self-attested projects (T4). `Narration Pane` / `Narrative` for the instruction column is an unusual choice — it frames instruction as *story* rather than as directions.

### Assessment vocabulary — three named types, one definitional article
`Quiz` · `Assessment` · `Exam` (two-part: `part 1` multiple choice, `part 2` "executable code questions") · `code challenges` · `Interview simulator` · `Job-readiness checker` · `Portfolio projects` · `practice Project` · `guided projects` / `independent projects` · `Personalized practice` ("practice that uses the science of spaced repetition")

`practice Project` as a card label has a **lowercase-then-capital rendering defect** (`practice ProjectReceipts for Lovely Loveseats`) repeated on all three project cards.

### Credential vocabulary
`Certificate of completion` · `Professional certification` · `Skill XP` · `Skill Tracking` / `Skills tracking` · `My Learning`

### Plan vocabulary — and the naming instability
`Basic` (free) · `Plus` · `Pro` · `All Access` / `All Access Pass` / `Bootcamp All Access Pass` · `Teams` / `Codecademy for Teams` / `Codecademy for Business` · `Codecademy Go` (the mobile app, named only in app-store URLs) · `Codecademy Pro` (legacy, persisting in URLs and article slugs) · `Codecademy from Skillsoft`

**The single worst terminology problem in this file.** Four live renderings of the top tier (two of them in one table), a legacy `Pro`-prefixed URL scheme under a renamed ladder, `Teams` vs `Business` used interchangeably for the B2B product, and a mobile app whose product name (`Codecademy Go`) appears nowhere in the copy.

### Community and programme names
`Codecademy Community` (on Circle) · `Club` / `Career Clubs` · `Codecademy Chapters` · `Code Crew` · `Codecademy Forums` (retired) · `Discord` (retired) · `discuss.codecademy.com` (retired, still linked from the help footer)

Three community brands (`Community`, `Chapters`, `Code Crew`) plus `Club` as a sub-unit, and two retired channels still linked. A help article exists titled `Moving away from Codecademy Forums and Discord` — **documenting the withdrawal of a capability**, the same practice Wise shows with `Why can't I set up guaranteed rate transfers anymore?`.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the learner, near-universally. First-person plural for Codecademy, used warmly and often (`We believe anyone (and everyone) can learn to code`, `we want to ensure you get the help you need`, `We encourage you to review`, `We're always open to feedback`, `we recommend pushing them to Github`). The company is a visible, speaking actor throughout — more so than Coursera or edX.

**Register: warm, encouraging, lightly playful, and it escalates *downward* in stakes.** Exclamation marks are used freely in instructional and motivational copy (`don't feel discouraged!`, `create a point of sale system for a furniture store!`, `please let us know!`, `It's your go-to space`) and disappear entirely in the refund policy and the billing paragraphs. The register does flatten as the stakes rise — correctly.

**The signature tonal move is pre-empting the learner's anxiety by naming it.** Four instances, all in high-doubt positions:
- `Self-paced learning doesn't mean you're on your own.` (platform showcase)
- `Getting stuck is part of the learning process, so don't feel discouraged! Every great programmer has been confused at some point.` (error article)
- `Don't worry, it's easier than you may think.` (paid-plans FAQ)
- `Not ready for commitment?` … `make sure we're right for you` (pricing)

And one that names the cost of its own advice: `This can seem frustrating at first, but you will often fix the mistake…`. Codecademy's voice consistently concedes the difficult thing before asking for the next step. It is the same rhetorical engine as Duolingo's `We know, we know—` but pitched at competence anxiety rather than at guilt.

**Wordplay is rationed to project titles.** `Receipts for Lovely Loveseats` — "Programming is a treat with this sweet suite of feats!" — and `Magic 8-Ball` — "It's so powerful, in fact, that it can be used to tell someone's fortune." Play is concentrated where the learner is about to do difficult work, absent from pricing and legal.

**Learner stories quote constraint and identity, not just outcome** `[observed]`: "You don't have to change careers; you can make your current job better, more efficient, and make your life easier" (Joshua Lange, Research Scientist) · "Completing a module felt like an achievement, and it helped me have a pathway to dive into cybersecurity, coming from a completely different world" (Jimmy Soto, SOC Security Specialist). Attribution is name + job title + city. Course reviews are attributed `Verified Learner`.

### Accessibility — good practice, and one genuinely excellent artefact

**`Skip to Content` is present and first in the DOM** on every marketing page, with page-specific targets (`#heading`, `#page-skip-to-content-target`, `#container-landing-page-heading`). Correct.

**`Pause animation` control on the hero** — a motion control for an auto-rotating headline, exposed as a named button (rendered twice). This is WCAG 2.2.2 compliance implemented as visible UI rather than relying on `prefers-reduced-motion`.

**Alt text is genuinely descriptive where it matters** `[observed]`. The platform-showcase images are alted with what they *show*:
- `Animated GIF of an AI provided error explanation within Codecademy's learning environment`
- `An AI-generated hint within the instructions of a Codecademy project`
- `Animated GIF of Codecademy's Job Readiness Checker tool generating a compatibility report for a senior software engineer role`
- `A fill-in-the-blank JavaScript question in a Codecademy assessment`
- `Two people in conversation while learning to code with Codecademy on their laptops`
- `Codecademy platform showing the instruction panel` / `the code editor` / `the output panel` / `the AI assistant`

These are the only reason T7's error-feedback account exists at all — the alt text is the sole public evidence of what the error-explanation UI looks like. Testimonial images carry a **composed** alt including the quote and attribution (`Quote by Joshua Lange, Research Scientist from Stockholm, Sweden`).

**The Accessibility Guide is the standout, and it is a different *kind* of document from edX's.** `[observed]`

edX publishes a **policy** — conformance target, verification method, accountable role, training cadence. Codecademy publishes an **operating manual for using the product with assistive technology**, and it is far more immediately useful to a disabled learner:

- Names the structural model: "split into 2-5 'panes,' each of which is an ARIA Region on the page and includes a visually hidden heading on top of it"
- **Lists every pane heading verbatim** so a screen-reader user can navigate by region: `Narrative`, `Code Editor`, `Read-only Code Pane`, `Output Terminal`, `Output-only Terminal`, `Terminal`, `Web Browser`
- Explains the checkpoint feedback model *and its assistive behaviour*: "If it's not correct, an error will appear explaining what went wrong. **Either way, it will be actively narrated by screenreaders.**"
- Solves the **keyboard-trap** problem explicitly: "Code editors will grab your keyboard focus as soon as they are focused or typed into. You can 'escape' them by pressing Escape or Control+M." A code editor inside a lesson is a classic focus trap, and this is the escape key sequence, stated plainly.
- Documents the editor shortcut discovery route (`F1` or `Command+Shift+P` / `Control+Shift+P`) and notes VS Code parity
- Names four editor accommodations and where to find each, all under `Tools`: `High Contrast Mode`, `Disable Word Wrap`, `Dark Mode`, and `Screenreader Mode` (recommended for terminals). The word-wrap one is the tell of someone who has actually tested with a screen reader — visual line-wrapping breaks screen-reader line navigation, and almost nobody thinks of it.
- Gives **three differentiated reporting routes**: curriculum issues → `Report an Issue` / `Get Unstuck` in-product; general site help → `Contact Us`; "Any other issues with accessibility support" → `accessibility@codecademy.com`
- Opening commitment names the impairment classes it is addressing: "accommodating different usage forms such as auditory, motor, or visual restrictions, limited hardware, or other accessibility concerns"

**What is missing, and it is the counterpart gap to edX's:** no conformance target (no WCAG version or level), no verification method, no named accountable role, no training commitment, no VPAT, and the guide is filed in `Using Codecademy` → `Getting Started` rather than linked from the site footer. **There is no accessibility link anywhere in the main site footer.** So the best practical accessibility documentation in this batch is three levels deep in a help centre, and the platform publishes no conformance claim at all. edX and Codecademy have opposite halves of the same artefact.

`Hardware Requirements` and `Compatible Browsers` as sibling articles in both `Getting Started` and `Troubleshooting` support the `limited hardware` commitment.

**Negative findings, recorded honestly**

- **`Codecademy will be closed on Monday, February 21st in observance of Presidents Day.`** — a ~4.5-year-stale service banner on every page of the help centre, undated, occupying the incident-notice slot
- `Loading menu bar` renders twice on every marketing page where the global nav should be
- `Refund Policy` scores `1155 out of 11670 found this helpful` (9.9%)
- `Code Troubleshooting` scores `66 out of 287` (23%); `Understanding Code Errors` scores `51 out of 167` (31%) — both core stuck-learner articles
- `our Terms and Service` (for *Terms of Service*) in the billing-authorisation sentence
- `You may retake assessments within 24 hour` — missing plural, appears twice, and the second instance is under the `Exams` heading referring to assessments
- `All Access` / `All Access Pass` / `Bootcamp All Access Pass` / `Get All Access` — four renderings, two in one table
- `Certification paths` / `certification prep paths` / `Certification prep` — three renderings
- `Learn by doing` / `Learn by building` / `Learn while building` — three renderings of the core brand phrase
- `Try Plus` vs `Try Plus for free` — one link, two labels
- Four labels for the catalogue (`Go to the catalog`, `Explore the catalog`, `View full catalog`, `View the full catalog`); three for the pricing page
- `Basic` plan has no column in the plan comparison table
- `Builder credits` gives `Standard` vs `2X` with no absolute number anywhere
- Four of six featured help articles have a title/slug/actual-title mismatch (`Pro-Refund-Policy`, `Codecademy-Pro-Free-Trial`, missing `Path`, `your` vs `our` Dashboard)
- `Understanding Code Errors` and `Understanding Your Code` — two near-identical titles, different topics, each in the other's sidebar
- Help-centre footer carries a retired catalogue taxonomy and two retired community URLs
- `Refer a friend` is unlinked text in the footer
- `practice ProjectReceipts for Lovely Loveseats` — lowercase-then-capital run-together on all three project cards
- `See all N articles` and bare `See more` used interchangeably on one page
- `Results will be updated as you type` renders as visible text
- No accessibility link in the main site footer; no published conformance target
- `4 out of 5 Codecademy learners achieve what they set out to do` — unsourced, undefined
- Pricing FAQ answers are not server-rendered (questions only)
- `At the moment, we aren't able to troubleshoot coding questions by email` — hedged phrasing on what reads as a standing policy

---

## Transferable patterns

1. **Qualify the time estimate in the tooltip, at the point of decision.** `24 hours` + `Average based on combined completion rates — individual pacing in lessons, projects, and quizzes may vary`. Names the statistic, names its derivation (observed completions, not content length), and names the three variables that will change yours. The best commitment cue in this batch, and the direct answer to Coursera's 2-months-vs-8-months contradiction.

2. **Name the button after the user's state, not its function.** `Get Unstuck` beats "Help", "Support" and "Report an issue" because it is what the user *is*, not what the button *does*. Transfers to any assistance affordance placed at a known point of difficulty — failed verification, declined payment, integration error.

3. **Publish the hint ladder, in order, and grant unconditional permission at the top rung.** Eight rungs from "re-read the instructions" to `Get the Solution`, with `You can always click "Get the Solution"` — no shame, no delay gate — plus `We encourage you to review the solutions code`, which turns the escape hatch into a learning step. Condition: the ladder only works if the learner is still reading at rung seven, which is what the affective opener buys.

4. **Refute the downside of your own headline benefit.** `Self-paced learning doesn't mean you're on your own.` Nine words, placed as the *first* line of the feature description. Every competitor in this batch asserts "learn at your own pace" and none addresses the isolation it implies. Applies to any benefit whose flip side is the objection — self-service, automation, instant, unlimited.

5. **Make the free tier a headlined destination on the pricing page.** `Not ready for commitment?` → "make sure we're right for you" → `Sign up for free`, immediately below the paid tiers. Puts the product on trial rather than the buyer. Condition: give the free tier a column in the comparison table too, which Codecademy does not.

6. **State a flat "no" in one italicised sentence, with the exception route named** — `We do not grant refunds, prorated or full, for subscriptions.` Unambiguous, closes both loopholes, and preceded by the cancellation mechanics so the reader learns how to avoid needing it. And then accept that a 10% helpfulness score is the cost of an honest no. The lesson: **clarity and helpfulness are different metrics.** What would move the score is leading with the exception criteria, not softening the refusal.

7. **Tell the lapsing user how to get their work out.** `If you want to hold onto your projects, we recommend pushing them to Github or saving them on your personal computer.` A platform giving practical data-portability advice against its own conversion interest, in the trial article. The strongest single trust move in this batch.

8. **Disclose the no-reply.** `this team will not respond back directly when the bug is fixed or if they determine it is not a bug.` Better than an implied SLA that never arrives. Applies to any feedback, abuse-report or suggestion channel that does not actually loop back.

9. **Write the accessibility guide as an operating manual, not a policy.** Name every ARIA region and its heading, give the keyboard escape from your focus trap (`Escape or Control+M`), name every accommodation and the menu it lives under, and give three differentiated reporting routes. Combine with edX's conformance-and-accountability policy and you have the complete artefact — neither platform has both.

10. **End every module description in the artefact.** "Learn about code reuse with Python functions. **Apply that knowledge to create functions for famous physics formulas.**" Concept → concrete application, every time, and let the application be slightly silly. Turns a syllabus into a list of things you will have made.

## Caveats & gaps

- **The verbatim in-product error strings were not observed.** The Learning Environment is behind auth. T7's account of error feedback is reconstructed from four independent descriptions (the Accessibility Guide, the platform showcase, the pricing table and course-page alt text) which agree with each other — but **no actual error message text is quoted in this file, because none is public.** This is the one real gap in the priority section. An authenticated pass on a single free exercise would close it.
- **The `Hints` UI was not observed**, only located (`at the bottom of the instructions on the left of the page`) and described (`An AI-generated hint within the instructions of a Codecademy project`). Whether hints are laddered *within* the panel (hint 1 → hint 2 → solution) could not be determined. **Not inferred.**
- **Global navigation was not captured** — `Loading menu bar` is all the server returns. T1 is derived from the footer, the homepage body and the help centre.
- **Pricing FAQ answers were not captured** (client-rendered accordions). Fifteen questions verbatim, zero answers.
- **`Codecademy Paid Content`, `My Account` and `Codecademy for Teams` help categories were not fully expanded** — only the two articles reached through other routes (`Free Trial`, `Refund Policy`) and the `Payments` section listing.
- **Article bodies: six were opened** out of several hundred. T6 and T11 are largely article-*titles* only.
- **One course landing page inspected** (`Learn Python 3`). The badge grammar and the qualified-estimate tooltip are almost certainly templated, but were confirmed on one page only. Career-path, skill-path, certification-path and bootcamp landing pages are unharvested.
- **Pricing is en-US, September 2026**, and annual-billing-anchored. Monthly equivalents are quoted as shown. `Builder credits` have no published absolute value.
- **Helpfulness scores are point-in-time** and are Codecademy's own published counts, quoted as given. They measure reader satisfaction, not accuracy.
- **The stale Presidents Day banner is reported as observed on 2026-09-21.** The 2022 attribution is my inference from the Monday-21-February / Tuesday-22-February pairing; the banner itself carries no year.
- `Terms`, `Privacy Policy`, the `community.codecademy.com` Circle instance, `Bootcamps`, `Coaching`, `AI Builder`, `Workspaces`, `Docs`, `Cheatsheets` and the `/business` surfaces are all unharvested.
- Email, push and in-product toast copy, and all authenticated learner surfaces, are out of scope.

## Sources

1. https://www.codecademy.com/
2. https://www.codecademy.com/pricing
3. https://www.codecademy.com/pages/paid-plans
4. https://www.codecademy.com/learn/learn-python-3
5. https://help.codecademy.com/hc/en-us
6. https://help.codecademy.com/hc/en-us/categories/202889308-Fix-a-Problem
7. https://help.codecademy.com/hc/en-us/categories/202886527-Using-Codecademy
8. https://help.codecademy.com/hc/en-us/categories/360001237834-Codecademy-Curriculum
9. https://help.codecademy.com/hc/en-us/articles/220801027-Understanding-Code-Errors
10. https://help.codecademy.com/hc/en-us/articles/360036584313-Code-Troubleshooting
11. https://help.codecademy.com/hc/en-us/articles/360056641953-Accessibility-Guide
12. https://help.codecademy.com/hc/en-us/articles/15373426748187-Quizzes-Assessments-and-Exams-What-s-the-Difference
13. https://help.codecademy.com/hc/en-us/articles/360007421393-Refund-Policy
14. https://help.codecademy.com/hc/en-us/articles/360009112313-Codecademy-Free-Trial
