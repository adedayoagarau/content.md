# 137. Udemy

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Open course marketplace (two-sided, open instructor enrolment) with a subscription layer and a B2B arm |
| Primary URL | https://www.udemy.com/ |
| Corpus rank | 137 |
| Benchmark strength (source list) | Course choice and curriculum structure |
| Locale / market observed | en-US (`meta-og:locale: en_US`); help centre serves 10 languages, marketplace pages localise via `?locale=en_US` |
| Platform observed | Web (desktop), Zendesk help centre, legal terms hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | EU Digital Services Act — a dedicated `Digital Services Act Information: European Union Users Only` page plus `Digital Services Act information: Transparency reports` in help; `Responsible AI Principles` and `Instructor Generative AI Policy` published; `Accessibility Statement` in footer; refund restrictions qualified "to the extent permitted by applicable law" with a separate `Subscription plan refund exceptions due to applicable law` article; Udemy LEARN Services, LLC named as the issuer of credits |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | **Partial — the price and discount block is client-rendered and was not retrievable.** No price, strikethrough anchor price, percentage-off, countdown or "30-Day Money-Back Guarantee" badge string was observed on any course page, despite this being the marketplace's most characteristic content. Course-card badges other than `Bestseller` (e.g. "Highest Rated", "Hot & New") were likewise not in server HTML on topic or search pages. Everything recorded here about discounting is either observed help-centre IA or explicitly marked as not found |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.udemy.com/ | Hero, trust wall, testimonial units, certification block |
| Course landing page | https://www.udemy.com/course/the-complete-javascript-course/ | `Bestseller`, rating block, full curriculum tree, requirements, description — the core artefact |
| Topic page | https://www.udemy.com/topic/python/ | Category stats block, topic FAQ, free-lesson unit |
| Terms & Policies hub | https://www.udemy.com/terms/refund/ | Body did not render; the policy index did — used for T1/T10 |
| Help centre home | https://support.udemy.com/hc/en-us | Dual-audience tab model, 13 categories, support-form strings |
| Help: Getting started | https://support.udemy.com/hc/en-us/categories/204119628-Getting-started | Contains `Udemy's instructors` section |
| Help: Learning experience | https://support.udemy.com/hc/en-us/categories/204119608-Learning-experience | Course player, certificates, AI tools |
| Help: Purchase/refunds | https://support.udemy.com/hc/en-us/categories/204119648-Purchase-refunds | `Promotions & sales` section, `Refunds` section |
| Help: Trust & Safety (learners) | https://support.udemy.com/hc/en-us/categories/8824166699671-Trust-Safety | Six articles incl. media literacy |
| Help article: Udemy's refund policy | https://support.udemy.com/hc/en-us/articles/360050856093-Udemy-s-refund-policy | 30-day rule and its justification |
| Help article: Udemy Instructor Partner badges | https://support.udemy.com/hc/en-us/articles/4407469383575-Udemy-Instructor-Partner-badges-What-do-learners-need-to-know | Badge criteria, learner-facing |
| Help article: How to preview and compare courses | https://support.udemy.com/hc/en-us/articles/229231027-How-to-preview-and-compare-courses | **The rating-algorithm disclosure** — highest-value page in this file |

---

## T1 Navigation & IA labels

**Global nav — thin by design** `[observed]`

`Explore` (mega-menu) · search ("Search for anything") · `Udemy Business` · `Teach on Udemy` · cart · `Log in` · `Sign up`

Two of the six items are **supply-side or B2B**, sitting in the consumer header: `Teach on Udemy` carries its own inline pitch in the nav ("Turn what you know into an opportunity and reach millions around the world." → `Learn More`). A marketplace that recruits instructors from the buyer's navigation is making a structural statement about who it thinks the reader is.

The search placeholder is `Search for anything` — deliberately unbounded, the opposite of FutureLearn's subject-first navigation. Where FutureLearn navigates you down a commitment ladder, Udemy's IA assumes you arrive with a query.

**Secondary nav** `[observed]`: `Categories`, plus a "Most popular" list and a `More from Udemy` group containing `Get the app` · `Invite friends` · `Help and Support`. `Invite friends` sitting in the utility nav is a growth mechanic promoted to IA.

**Breadcrumb on course pages is a three-level taxonomy** `[observed]`:
`Development` → `Web Development` → `JavaScript`
i.e. Category → Subcategory → Topic. The same `JavaScript` node is also reachable as a `/topic/` landing page with its own SEO copy, so the taxonomy doubles as a content surface.

**Footer** `[observed]`: `Udemy Business` · `Teach on Udemy` · `Get the app` · `About us` · `Contact us` · `Careers` · `Blog` · `Affiliate` · `Investors` · `Terms` · `Privacy policy` · `Cookie settings` · `Sitemap` · `Accessibility statement`. `Investors` in a consumer footer is a public-company artefact; `Accessibility statement` is present and links off-domain to `about.udemy.com`.

**Terms & Policies hub — grouped by *who the policy binds*, not by topic** `[observed]`

| Group | Items |
|---|---|
`Marketplace & Website` | `Terms of Use` · `Privacy Policy` |
`Instructors` | `Instructor Terms` · `Promotions Policy` · `Instructor Generative AI Policy` · `Subscription Bonus Policy` |
`Udemy Business` | 11 items incl. `Master Services Agreement`, `India Master Service Agreement`, `Brazil Addendum`, `Trust Hub`, `AI Connector Terms` |
`Suppliers` | 7 items |
`Partners` | `Partner Portal` |
`Additional Terms & Resources` | `Responsible AI Principles` · `Intellectual Property Policy` · `Affiliate Terms` · `Udemy API Agreement` · `Beta Terms` · `Code of Conduct` · `Accessibility Statement` · `Event Terms & Conditions` · `Digital Services Act Information: European Union Users Only` · `Payment Agent Terms` · `Learn With Google` |

This is the clearest IA signal in the file: **the legal hub is organised by counterparty**. A learner's entire relationship with Udemy is two documents; instructors get four; enterprise gets eleven. The asymmetry is honest and navigable, and `Promotions Policy` living under `Instructors` tells you where the discounting rules actually sit — they govern the seller, not the buyer.

**Help centre — 13 categories split across an audience toggle** `[observed]`

`Learner` tab: `Getting started` · `Account/profile` · `Troubleshooting` · `Learning experience` · `Purchase/refunds` · `Mobile` · `Trust & Safety`
`Instructor` tab: `Instructor payments` · `Selling & promotion` · `Course building` · `Course management` · `Trust & Safety` · `Affiliates`

Each carries a scope line:

| Category | Scope line (verbatim) |
|---|---|
| `Getting started` | "Learn how Udemy works and how to start learning." |
| `Account/profile` | "Manage your account settings." |
| `Troubleshooting` | "Experiencing a technical issue? Check here." |
| `Learning experience` | "Everything about the Udemy learning experience." |
| `Purchase/refunds` | "Learn about purchasing courses, how to send gifts, and refunds." |
| `Mobile` | "On the go? Learn about our mobile app." |
| `Trust & Safety` (learner) | "Trust & Safety information and reporting." |
| `Instructor payments` | "Understand the revenue share and how to receive payments." |
| `Selling & promotion` | "Learn about the announcement and promotional tools." |
| `Course building` | "Build your course curriculum and landing page." |
| `Course management` | "Maintain your course and engage with students." |
| `Trust & Safety` (instructor) | "Policy and copyright questions and guidance." |

**Defect worth recording:** two categories share the name `Trust & Safety` with different scope lines and different URLs. On a page that lists both tabs' categories in one DOM list, the duplicate label is ambiguous — and the learner-side one is the safety-reporting route, the instructor-side one is copyright. A user who clicks the wrong `Trust & Safety` lands in a copyright FAQ while trying to report abuse.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Learn essential career and life skills` (with `essential` and `life` set in contrasting emphasis)
> Subhead: "Udemy helps you build in-demand skills fast and advance your career in a changing job market"

Note what is *not* claimed: no instructor count, no course count, no university names. The marketplace's scale is its liability as much as its asset, so the hero sells the buyer's outcome and pushes proof down the page.

**Proof is stacked in a specific order** `[observed]`

1. `Udemy is trusted by over 17,000 companies and millions of learners around the world` — enterprise logo wall (Volkswagen, Samsung, Cisco, Vimeo, P&G, HPE, Citi, Ericsson)
2. `Join others transforming their lives through learning` — four named testimonials with job titles and employers ("Technical Co-Founder, CTO at Dimensional"; "Partner Account Manager at Amazon Web Services"; "Google AI Essentials graduate")
3. `Get certified and get ahead in your career` — third-party certification bodies (CompTIA, AWS, PMI) as named credibility anchors
4. `Popular Skills`

This is the marketplace substitute for institutional backing: **borrow credibility from the buyer's employer and from external certification bodies**, because you cannot borrow it from the seller. The testimonial attributions are doing real work — a named person at a named company is the closest a marketplace can get to "University of Cambridge".

**The certification block is the most interesting value-prop move** `[observed]`: "Prep for certifications with comprehensive courses, practice tests, and special offers on exam vouchers." → `Explore certifications and vouchers`. Udemy reframes itself as *preparation for someone else's credential*, which neatly sidesteps the weakness of its own certificate of completion. Each body is labelled with its domain: `CompTIA` — "Cloud, Networking, Cybersecurity"; `AWS` — "Cloud, AI, Coding, Networking"; `PMI` — "Project & Program Management".

**Topic pages lead with a four-metric stats block** `[observed]`, for `Python`:

| Label | Value |
|---|---|
| `Number of learners` | 50,717,848 |
| `Number of courses` | 3,780 |
| `Number of hands-on practice` | 24,385 |
| `Average course rating` | 4.5 |

**This is the clearest marketplace-quality content pattern in the file.** Publishing a *category-level* average rating (4.5) alongside a course count (3,780) gives the buyer a baseline against which an individual course's 4.7 means something. Without the category average, a 4.7 is uninterpretable. Two flaws: `Number of hands-on practice` is ungrammatical (a count label missing its noun — "practice exercises"), and the numbers are precise to the unit, which invites the reader to notice they cannot possibly be current.

Topic page titles carry a freshness stamp: `Top Python Courses Online - Updated [September 2026]` — the month is injected into the `<title>`, which is a recency signal aimed at search and at the buyer's fear of stale content.

**Course-page hero** `[observed]`, in DOM order:

```
The Complete JavaScript Course 2025: From Zero to Expert!
Bestseller
Role Play
Rating: 4.7 out of 5   4.7   (234,114 ratings)
1,043,609 students
```

then title again, subtitle, `Created by <name>`, `Last updated 10/2025`, `English`, `Arabic [Auto], Bulgarian [Auto], 31 more`.

Read as an ordering decision: **badge before rating, rating before enrolment count, all three before the instructor's name.** On a platform with open instructor enrolment, the social-proof stack outranks the author. Compare FutureLearn, where the partner institution's logo sits above the title.

Three details in that block deserve attention:

- The year is in the **course title**, not in metadata (`…Course 2025:`), which is an instructor-side freshness tactic. `Last updated 10/2025` then appears as a platform-controlled field beside it — so the page carries both a claimed and a verified recency signal, and a buyer can catch a mismatch.
- `Arabic [Auto], Bulgarian [Auto], 31 more` — **machine translation is labelled `[Auto]` inline in the language list.** Disclosing which captions are auto-generated, per language, at the point of choice, is a genuinely good practice and rare.
- `Role Play` sits in the badge position next to `Bestseller` with no explanation. It is an AI feature name (documented in help as `How to use the Role Play feature`) rendered as if it were a quality badge. **Feature badges and quality badges sharing one visual slot is a defect** — the buyer cannot tell that one is an award and one is a capability.

**Section headings on the course page** `[observed]`, all second person or buyer-framed:
`What you'll learn` · `Explore related topics` · `Coding Exercises` · `Course content` · `Requirements` · `Description` · `Who this course is for:`

`Who this course is for:` is answered as a list of second-person imperatives beginning "Take this course if you…" — five of them, including one that names the buyer's failure state: "Take this course if you have been trying to learn JavaScript but: 1) still don't really understand JavaScript, or 2) still don't feel confident to code real apps". A prerequisites section written as a self-diagnosis.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` / `Log in` | Global nav | |
| `Search for anything` | Search placeholder | Unbounded by design |
| `Explore` | Nav mega-menu trigger | |
| `Learn More` | Inside `Teach on Udemy` nav flyout | Bare, but the flyout copy supplies the object |
| `Preview this course` | Course page, over the promo image (appears **twice** in DOM) | The core trust affordance |
| `Preview` | Inline tag on individual free lectures | Same word, different grammatical role — a label, not a button |
| `Expand all sections` | Curriculum tree | |
| `Show moreShow less` | Long text blocks, `What you'll learn`, `Description` | Rendered as one concatenated control in server HTML |
| `11 more sections` | Curriculum tree truncation | Count-in-label progressive disclosure |
| `See a demo` | Coding-exercises unit | |
| `Report abuse` | Foot of course page | Routes through a login wall |
| `Keep shopping` | Empty cart | |
| `Explore certifications and vouchers` | Homepage certification block | |
| `Show all trending skills` | Homepage `Popular Skills` | |
| `View all stories` | Testimonial block | |
| `View AI courses` / `View this iOS & Swift course` / `View this AWS course` / `View Google AI Certificates` | Under each testimonial | **Every testimonial deep-links to the exact course cited** — the proof is clickable |
| `View free Python courses` | Topic page | |
| `Compare Plans` / `Request Demo` / `Try Udemy Business` | B2B nav | |
| `Take Me There` | Help centre, Teaching Center promo | Colloquial, instructor-facing |
| `Submit a Data Access or Deletion Request` | Help centre form | Privacy right as a named control |
| `I found my answer. Close my request.` | Support form | See T9 |
| `I still need help.` | Support form | |
| `Contact Us` | Foot of every help article | Opens the virtual agent |
| `Skip to content` | Top of DOM | Accessibility |
| `Back to Udemy` | Help centre header | |

**Observation.** `Preview this course` is the most important CTA on the platform and Udemy renders it twice on the same page (desktop and responsive variants), both times as the label over the course image. There is no bare `Learn more` on the consumer surface; the only near-bare label (`Learn More`) sits inside a flyout that has already stated the offer.

## T4 Onboarding & getting-started

There is no numbered how-it-works sequence on the consumer marketing surface. `[absent]` for a step-by-step onboarding narrative of the FutureLearn kind — Udemy's implicit model is *search → preview → buy → watch*, and the only step it documents in detail is **preview**.

**The documented preview-and-compare sequence** `[documented]`, from the help article, is the closest thing to an onboarding flow and is worth recording as a three-step:

1. Click the course icon or title to reach the **Course Landing Page**
2. Click `Preview This Course` on the right-hand side
3. Watch "a handful of lectures selected by the instructor"

Note the honesty in step 3: the preview is curated *by the seller*, and the help article says so. It also states that every Udemy course has some lectures set to free preview — so the affordance is a platform guarantee, not an instructor option.

**Getting-started help section is transactional, not pedagogical** `[observed]`:
`How to sign up to Udemy on a browser` · `How to log in to and log out of Udemy on a browser` · `How to log in to and log out of Udemy on the Mobile App` · `Udemy Platforms and Features` · `System Requirements`

Compared with FutureLearn's `Using FutureLearn`, Udemy's getting-started content teaches you to operate the *account*, not the *learning*. The pedagogical onboarding is delegated to instructors — and on the course page harvested, the instructor supplies it: lectures titled `Read Before You Start!`, `Watch Before You Start!`, `A Note About Challenges`, `Pathways and Section Roadmaps`, `Course Pathways`, and a whole section called `How to Navigate This Course`.

That is the finding: **on an open marketplace, the onboarding content is instructor-generated and therefore inconsistent**. This particular instructor built seven "learning-goal pathways" so buyers can skip material, and the course description makes a virtue of it ("you can become an excellent developer by watching only parts of the course"). Another course will have none of that, and the platform provides no shell for it.

**Documented learning-experience features** `[documented]`, from help titles: `How to Mark or Unmark Lectures as Complete (on a Browser)` · `How to create and use notes (on a browser)` · `How to Use Keyboard Shortcuts` · `How to Schedule Learning Reminders on a Browser` · `Archiving a Course` · `Finding Courses With Subtitles` · `How to Leave and Edit a Course Rating`.

## T5 Form & field labels

The help centre's support form is the richest pre-auth form surface and it is unusually well written. `[observed]`

| String | Role |
|---|---|
| `I am a...` | Audience self-selection at the top of the form |
| `The email address associated with your Udemy account` | Field label — describes the *relationship*, not the format |
| `Please enter the course URL as www.udemy.com/course/course_name.` | Format hint with an inline `here` link to a help article |
| `Additional Comments` | Optional field |
| `Do these help?` / `Do any of these articles answer your question?` | Pre-submission deflection prompt |
| `If they do, we can close your request` | Consequence explained before the user chooses |
| `Your e-mail address *` (article-feedback form) | Required-field asterisk |
| `Let us know how can we improve this article!*` | **Ungrammatical** ("how can we" should be "how we can") |
| `Select at least one of the reasons` | Validation requirement stated as an instruction |
| `Please give your comments` | Validation requirement |

Search placeholders: `Search for anything` (marketplace), `Search for solutions` (help centre). The help-centre placeholder is a nice register shift — you search *for anything* when shopping and *for solutions* when stuck.

Marketplace checkout, signup and payment fields are behind auth. `[absent]`

## T6 Status & state language

**Quality and freshness states rendered on the course page** `[observed]`

| State / badge | Notes |
|---|---|
| `Bestseller` | The only quality badge observed in server HTML |
| `Role Play` | A feature label occupying the badge slot |
| `New` | Observed on course cards in the "More courses you might like" strip |
| `Last updated 10/2025` | Platform-verified freshness, month/year precision |
| `Preview` | Per-lecture availability state |
| `[Auto]` | Per-language caption-provenance state |
| `Rating: 4.7 out of 5` | Announced form of the star rating |
| `(234,114 ratings)` | Sample size, always adjacent to the score |
| `1,043,609 students` | Enrolment, distinct from ratings count |

**The badge vocabulary is incompletely observable and I will not guess at it.** `Bestseller` is confirmed on a course page. "Highest Rated" and "Hot & New" are commonly cited as Udemy badges but **did not appear in any server HTML retrieved in this harvest**, and the badge-explainer article that exists in help is about the *Instructor Partner* badge, not course badges. Recorded as `[absent]` pending a browser-rendered pass.

**`Instructor Partner` badge — the one badge with published criteria** `[observed]`

The learner-facing article states the badge recognises instructors in the Instructor Partner Program, and gives four criteria:

1. "Consistently receive high course ratings from learners"
2. Have content selected for inclusion in subscription collections
3. "Keep their course content fresh and relevant by updating it frequently"
4. Adhere to Udemy's Trust and Safety policies

then adds, in italics, that only instructors "accepted and active" in the programme are considered. **Publishing the criteria for a trust badge, in learner-facing language, on a page titled with the learner's question ("What do learners need to know?") is the right pattern** — it converts a badge from decoration into evidence. Two weaknesses: criterion 1 is unquantified ("high", "consistently"), and criterion 2 means the badge partly signals *commercial alignment with Udemy* rather than quality, which the article does not flag.

**Curriculum structure as a state display** `[observed]`

> `21 sections • 332 lectures • 71h 10m total length`

Three units, bullet-separated, in increasing granularity of commitment: how it's organised, how many pieces, how long. Per-section headers repeat the pattern at a smaller scale — `JavaScript Fundamentals – Part 1` `27 lectures • 4hr 31min` — and per-lecture rows carry a bare duration (`5:25`, `19:31`). Non-video items carry **no duration at all** (`CHALLENGE #1`, `Test Your Fundamental Knowledge 1! Ready to Move On?`), which is a quiet but important honesty: the platform does not pad the runtime with untimed items. The help article makes the same point explicitly — "The entire course length, including non-video lectures, is also posted at the top of the section."

**Level and length** are *not* rendered as first-class fields on the course page harvested. There is no `Beginner`/`Intermediate` chip in the hero. Level is instead smuggled into the title ("From Zero to Expert!"), into `Requirements` ("No coding experience is necessary to take this course!") and into `Who this course is for:`. **This is a real gap versus FutureLearn's `Introductory level` chip**, and it is the kind of gap an open marketplace produces: level is a claim the seller makes in prose, not a field the platform normalises. `[absent]` for a structured level field.

## T7 Error, failure & recovery

**Observed validation and failure strings**, all from the help-centre support form `[observed]`

> `This email does not match the email associated with your Udemy account.`
> `Please check that you have entered the correct email addresses.`
> `Please login using the email associated with your Udemy account so we can better assist you.`

Three strings for one condition, escalating: statement of mismatch → instruction to re-check → instruction to authenticate, with the *reason* attached ("so we can better assist you"). No apology, no "Oops", no blame. The third string's rationale clause is the transferable bit: it converts a demand into an explanation.

> `Issues with the Contact Us button? Please try clearing your cache and cookies. Be sure to restart your browser before trying again.`

A **pre-emptive troubleshooting line placed immediately beside the control it might break**, phrased as the user's question. Same family as Wise's `Trouble logging in?`. It appears at the foot of every help article, twice (the whole related-articles + contact block is duplicated in DOM).

**Recovery routing in help titles** `[documented]`:
`How to troubleshoot audio & video issues (on a browser)` ·
`Resolving The "Problem With Your System Settings" Video Error` ·
`Why can't I see my project when I search for it?` (not Udemy — excluded) ·
`Refund status: common questions` ·
`How to find the course URL`

`Resolving The "Problem With Your System Settings" Video Error` is notable: the article title **quotes the exact error string the user is staring at**, so the search match is literal. That is the single cheapest findability win available to any product with named error states, and most teams write "Video playback troubleshooting" instead.

**A defect in the feedback affordance** `[observed]`: the article-feedback panel says `Please let us know how this article can be improved…` and then, in bold, `Feedback submitted here will not create a support ticket and is not directly accessed by our support team.` Honest — but it means the most prominent input on a failed help article is explicitly a dead end, with the real route (`contact Udemy Support`) as an inline link inside the disclaimer. The negation is doing the work of a routing decision that should have been made in layout.

## T8 Empty states

**Observed — cart** `[observed]`

> `Your cart is empty.` · `Keep shopping`

Two words of state, one CTA that names the alternative activity rather than the destination ("Keep shopping", not "Browse courses"). The verb "shopping" is worth flagging: on an education platform, the empty state reverts to pure retail vocabulary. It is consistent with `cart`, and inconsistent with `Learner` (the word the help centre uses for the same person).

**Observed — help search** `[observed]`

> `Sorry! nothing found for` *(interpolated query follows)*

A **defect**, and a close cousin of the Wise no-results bug recorded in the exemplar. Lower-case "nothing" after an exclamation mark; a sentence fragment with a dangling preposition waiting on interpolation; and an exclamation mark on a failure state, which sits badly against the otherwise unexclaimed error copy in T7. The surrounding scaffolding (`Recent Searches` → `Clear all` → `No recent searches`) is clean by comparison — `No recent searches` is exactly right.

Other empty states (no courses enrolled, no certificates, no Q&A) are behind auth. `[absent]`

## T9 Notifications & system messages

**Support-flow confirmations** `[observed]`

> `Your request was successfully submitted.`
> `Thank you. Your feedback has been recorded.`
> `That's Great!` / `Thank you for your feedback`
> `Sorry! We couldn't be helpful` / `Thank you for your feedback`
> `We appreciate your effort and will try to fix the article`

The helpful/unhelpful branch is the interesting one. A "No" vote returns `Sorry! We couldn't be helpful` — the platform apologising in the first person plural for its own content, then committing to an action ("will try to fix the article"). Hedged with "try", but it is an acknowledgement rather than a thank-you, which is the correct asymmetry.

**Deflection microcopy** `[observed]`

> `Do any of these articles answer your question?` / `If they do, we can close your request`
> `I found my answer. Close my request.` / `I still need help.`

This is the best piece of writing in the file. The two buttons are **complete first-person sentences from the user's mouth**, and the first one contains its own consequence ("Close my request"). The user is not choosing between `Yes` and `No`; they are choosing between two things they would actually say. And the framing sentence pre-states the outcome of the choice, so nothing happens that the user has not read.

**Named virtual agent** `[observed]`: `How to chat with "Alex", Udemy's virtual agent` — the assistant has a human first name, in quotes, with an appositive explaining what it is. Quoting the name signals "this is a label, not a person", which is a defensible half-step. The gate is written as a consent line: "By clicking to access Udemy's support virtual assistant, you are agreeing to Udemy's `Terms of Use` and `Privacy Policy`."

**Promotion notifications exist as a documented product** `[observed]`: `Promotion notifications: Frequently asked questions` sits in the `Promotions & sales` help section. The existence of a dedicated FAQ for *notifications about discounts* is itself the strongest available evidence of how central discounting is to the model — but the notification copy is not public. `[absent]` for the strings.

**Article freshness stamp** `[observed]`: help articles carry `Modified on <date>` and a helpfulness ratio. The refund policy shows **`197 out of 3040 found this helpful`** — a 6.5% helpfulness rate, published, on the platform's single most consequential policy page. Recorded as a negative finding with two readings: either the policy is badly written, or the vote is registering dissatisfaction with the *policy* rather than the *article*. Either way, publishing the ratio on that page is a decision most companies would reverse.

## T10 Disclosures, legal & compliance

### The rating-algorithm disclosure — the single most valuable string in this file

`[observed]`, inside `How to preview and compare courses`, set in italics:

> *"Please note that instead of using a simple lifetime average, Udemy calculates a course's average star rating by considering a number of different factors such as the number of ratings, the age of ratings, and the likelihood of fraudulent ratings."*

Three things make this exemplary. It states what the number is **not** before what it is ("instead of using a simple lifetime average"), which pre-empts the wrong mental model — the same construction the Wise exemplar records for FDIC status. It names the three input classes in plain English, including the uncomfortable one (**"the likelihood of fraudulent ratings"** — the platform admits fraudulent ratings exist and that its score is engineered to resist them). And it is placed in the article that a buyer reads *while deciding*, not buried in terms.

The weakness: "a number of different factors such as" leaves the list open, and the disclosure lives in help rather than adjacent to the star rating on the course page, where it is needed. A tooltip on `4.7 out of 5` is the obvious missing placement.

### The `Featured review` admission

`[observed]`, same article, stated twice:

> "the course landing page may also include a **Featured review**, which highlights a positive experience a student had with the course."

Udemy names a UI element and then tells the buyer it is **selected for positivity**. Most platforms would call it "Top review" and let the reader assume it was chosen by vote count. Naming the bias in the definition is a real disclosure, and `Featured` is the honest word — it implies editorial selection rather than merit.

### The 30-day refund policy, and its unusual justification

`[observed]`

> "We want you to be satisfied, so all eligible courses purchased on Udemy can be refunded within 30 days, provided the request meets the guidelines in our refund policy."

Then, under the heading `Our 30-day policy`, the *reason for the limit* — which is the transferable move:

> "While our 30-day refund policy is to allow students to learn risk free, we must also protect our instructors from fraud and provide them a reasonable payment schedule. Payments are sent to instructors after 30 days, so we will not process refund requests received after the refund window."

**The refund window is explained by the instructor payout schedule.** The buyer is told that their 30 days exists because a third party gets paid on day 31. On a two-sided marketplace, exposing the other side's cash-flow constraint as the reason for your limit is both more persuasive and more honest than "for security reasons". It also quietly recruits the buyer into fairness toward instructors.

**Named refund-abuse triggers** `[observed]`, under `Additional reasons for denied refunds`, prefaced "We reserve the right, in our sole discretion, to limit or deny refund requests in cases where we believe there is refund abuse, including but not limited to the following":

- "A notable amount of the course has been consumed or downloaded by a student before the refund was requested."
- "Multiple refunds have been requested by a student for the same course."
- "Excessive refunds have been requested by a student."
- Accounts reported, banned, or with access disabled for `Terms` or `Trust & Safety Guidelines` violations
- Refund already granted by a third-party payment processor
- No refunds on subscriptions unless required by law

then the bounding sentence: "These refund restrictions will be enforced to the extent permitted by applicable law."

Note `A notable amount` and `Excessive` are deliberately unquantified — a discretionary threshold, disclosed as discretionary. That is a defensible choice (publishing the number invites gaming) but it should be read as the limit of the transparency, not an oversight.

**Credit refunds — a second-tier remedy, named and scoped** `[observed]`

`Udemy credits` are introduced as what you get when cash is not available, with the issuing entity named ("issued by and are solely an obligation of Udemy LEARN Services, LLC, an affiliate of Udemy, Inc.") and, critically, a **placement promise**: "If your course purchase is only eligible for a credit refund, this will be indicated on the refund page." The buyer is told *where* they will learn the bad news. Then an exhaustive list of payment methods that are credit-only: iOS/Apple in-app, bank & cash transfers, `Boleto Bancário`, `Pix`, `Oxxo`, `Alfamart or Indomaret`, existing Udemy credits. Naming the specific local payment rails by brand, per market, is the level of specificity the Wise exemplar praises in the named-issuer decline article.

**Subscriptions carve-out, stated as a negation of the headline promise** `[observed]`:
"Udemy's subscription plans purchased through Udemy.com do not offer a 30-day satisfaction guarantee, and no refunds or partial refunds are available unless otherwise required by applicable law". Then a geography rule — "We determine your location based on the country associated with your account" — and a link to `Subscription plan refund exceptions due to applicable law`. The guarantee is the brand promise; saying plainly that it does not apply to the newer business model, in the same document, is the correct and uncomfortable choice.

**Store-of-purchase disclaimers** `[observed]`: three separate sections route the buyer away — Apple/Google in-app purchases ("we are unable to process refund requests for these in-app purchases or answer questions regarding the refund policies of Apple and Google Play"), third-party bundles, and third-party sales/promotions ("Udemy does not have access to the necessary information to review or process these refund requests"). Each states the *reason* Udemy cannot help, not just that it cannot.

### Discounting — what was and was not observable

**Not observed.** No price, anchor price, strikethrough, percentage-off, `X hours left at this price!`, countdown, or `30-Day Money-Back Guarantee` badge appeared in any retrieved HTML. Udemy's near-permanent discounting is the platform's most-discussed content characteristic and **this harvest cannot evidence a single string of it.** Recorded as a blocking gap, not paraphrased from memory.

**What is observable about the discounting apparatus** `[observed]`:

- The `Promotions Policy` is filed under **`Instructors`** in the legal hub — discounting is governed as a seller obligation.
- There is a `Subscription Bonus Policy` for instructors, i.e. a second revenue mechanic beside per-course price.
- The help centre has a whole `Promotions & sales` section (`Promotion notifications: Frequently asked questions`, `Exam vouchers: Frequently asked questions`, plus two named bank/partner promotions, `Juno Journey FAQ` and `FNB FAQ`).
- `Purchasing a course` carries 29 articles including `How to Buy Now, Pay Later with Afterpay or Klarna`, `Udemy credits: Frequently asked questions`, `Guest checkout: Frequently asked questions`, `Understanding international transaction fees and currency conversion in certain countries`, and three named cash-payment rails (`Oxxo`, Boleto, Pix). **A 29-article purchasing section on a platform whose stated price model is "buy a course" is itself the finding** — the price is simple; the paying is not.
- The observed course page's own `Description` performs the discount-adjacent rhetoric without a number: "***The #1 bestselling JavaScript course on Udemy!***", "***Just updated with ES2024 and ES2025!***", "you don't have to buy any other course in order to master JavaScript". Urgency and value framing here are **instructor-authored**, in the description field, italic and bold — which is where an open marketplace's promotional pressure actually surfaces when the platform controls the price chrome.

**Other disclosures** `[observed]`: `Digital Services Act Information: European Union Users Only` as a named policy page plus `Digital Services Act information: Transparency reports` in help; `Responsible AI Principles` and a separate `Instructor Generative AI Policy`; `Udemy's approach to media literacy` as a learner-facing Trust & Safety article; `Student content and behavior rules`; `How to report abuse`; two copyright-infringement reporting articles (trademark and copyright, separately); `Which Courses are Eligible for NASBA Continuing Professional Education (CPE) Credits on Udemy?` — CPE eligibility as a named, scoped question rather than a blanket accreditation claim.

**Stale-content defects** `[observed]`: the `Learning experience` help category footer reads `© 2025 Udemy, Inc.` while every other page reads `© 2026`. The legal hub's `meta-description` still claims "over 250,000 courses and 80 million students" against a homepage claim of "over 17,000 companies and millions of learners" — two eras of scale marketing coexisting in one site. The legal page's `canonical` resolves to `http://cms-dispatcher.content-management.svc.cluster.local/undefined`, i.e. an internal Kubernetes service name and the literal string `undefined` leaked into a public canonical URL and into `meta-og:url`.

## T11 Help-centre architecture

Three levels: **audience tab** → category → section → articles. The audience tab is the distinguishing feature: `Learner` / `Instructor` (and a third search scope, `Udemy Business Topics`), with `I am a...` as the form-level equivalent. On a two-sided marketplace this is the right first cut, and it is made *before* topic — you declare who you are, then what you need.

Section names inside `Purchase/refunds`: `Purchasing a course` (29 articles) · `Subscriptions` (8) · `Promotions & sales` (4) · `Udemy gifts` (4) · `Refunds` (6).
Inside `Learning experience`: `Course player` (12) · `Course settings` (4) · `Certificates of completion` (5) · `Certification preparation and badges` (2) · `Learning Experience - General` (13) · `Subscription Learning Experiences` (13).
Inside `Getting started`: `How to get started with Udemy` (5) · `Learn more about Udemy` (5) · **`Udemy's instructors`** (2).

**`Udemy's instructors` as a learner-facing help section is the standout IA decision.** Two articles — `Udemy Instructor Partner badges: What do learners need to know?` and `Course instructors and teaching assistants` — filed under the *learner's* getting-started category. A marketplace that puts "who are these people teaching me?" into onboarding help, rather than into a seller-facing page, is answering the question its structure creates.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| `How to <task>` | `How to refund a course`, `How to preview and compare courses` |
| `<Topic>: Frequently asked questions` | `Guest checkout: Frequently asked questions`, `Billing for subscriptions: Frequently asked questions` |
| `Why can't I …?` / `What happens if …?` | `Why can't I see my project when I search for it?` (n/a), `What are the Requirements for NASBA…?` |
| Bare noun phrase | `Lifetime access`, `Partial refund requests`, `In-course labs`, `Labs and workspaces` |

The `<Topic>: Frequently asked questions` shape is used heavily and consistently (at least a dozen instances) — it signals "this is a cluster, not a single answer" and lets one URL absorb a whole feature's demand. `Lifetime access` as a bare two-word article title, for what is a significant commercial promise, is the opposite extreme.

**Routing furniture** `[observed]`: search first (`Search for solutions`), then audience tabs, then `Frequently asked questions` and `Select a topic to search for help`, then the category grid, then a `Teaching Center` promo for instructors, and `Contact Us` at the very foot of each article behind a virtual-agent consent line. `Submit a Data Access or Deletion Request` is exposed as a first-class form control in the help centre, which is a GDPR/CCPA right surfaced as a support task rather than hidden in a privacy page.

## T12 FAQs

Udemy uses FAQs in three distinct places with three distinct jobs. `[observed]`

**(a) Topic-page FAQ — SEO and subject-education, not product** `[observed]`

Eight questions on `/topic/python/`, verbatim:

| # | Question (verbatim) |
|---|---|
| 1 | What is Python? |
| 2 | Python vs. R: what is the difference? |
| 3 | What does it mean that Python is object-oriented? |
| 4 | What are the limitations of Python? |
| 5 | How is Python used? |
| 6 | What skills or experience should I have before learning Python? |
| 7 | What jobs use Python? |
| 8 | How do I learn Python on my own? |

**None of these is about Udemy.** They are about the subject. The ordering is definition → comparison → concept → **limitations** → application → prerequisites → career → self-study, and each answer ends with an outbound link to `blog.udemy.com`. Q4 (`What are the limitations of Python?`) is the one to notice: a commerce page that sells Python courses publishes the case against Python, and the answer genuinely lists speed, memory, single-threading and 3D-game weakness before conceding that hardware improvements are eroding them. **Answering the "should I even bother" question against your own inventory buys the credibility that the rest of the page spends.** Q6 answers a prerequisite question with reassurance ("while it can be easier to learn Python if you already know Java, JavaScript, or other common languages, it isn't necessary") — the same job FutureLearn's `Requirements` block does, done as an FAQ.

The block is progressively disclosed behind `Show more`, and sits *below* the course grid — so it is written for the searcher who scrolled past the products, i.e. the undecided buyer.

**(b) Help-centre FAQ articles as a title convention** — `<Topic>: Frequently asked questions`, ~12+ instances (see T11). Verbatim examples: `Guest checkout: Frequently asked questions` · `Udemy credits: Frequently asked questions` · `Starter Plan: Frequently asked questions` · `Learn AI with Google: Frequently asked questions` · `Billing for subscriptions: Frequently asked questions` · `Refer-a-Friend program: Frequently asked questions` · `Promotion notifications: Frequently asked questions` · `Exam vouchers: Frequently asked questions` · `Redeeming gifts: Frequently asked questions` · `Sending gifts: Frequently asked questions` · `In-course labs: Frequently asked questions` · `Udemy AI Assistant: Frequently Asked Questions` · `Certificates of Completion: Frequently Asked Questions` · `Udemy's new course experience: Frequently asked questions`.

**Casing defect:** the convention is inconsistently capitalised — sentence case in most (`Frequently asked questions`) and title case in others (`Frequently Asked Questions`), sometimes within the same category.

**(c) Help-centre home FAQ block** `[observed]` — the headings `Frequently asked questions` and `Select a topic to search for help` are present but their content is client-rendered. `[absent]` for the question strings.

**Not found:** a marketing FAQ accordion on the homepage or the course landing page. `[absent]`

## T13 Terminology & glossary

| Term | Udemy's usage | The alternative it rejected |
|---|---|---|
| `lecture` | The atomic content unit | "lesson", "step", "video" |
| `section` | The container for lectures | "module", "week" |
| `curriculum` / `Course content` | The tree; `Course content` on the page, `curriculum` in help | "syllabus" |
| `Course Landing Page` | Named in help, capitalised — the buying surface has a name | "course page", "product page" |
| `Preview this course` | The trial affordance | "Watch free", "Sample" |
| `Bestseller` | The quality badge, commerce vocabulary | "Top rated", "Editor's pick" |
| `Featured review` | Editorially selected positive review | "Top review" |
| `Instructor Partner` | Badged instructor tier with published criteria | "Verified", "Pro" |
| `teaching assistants` | Named role alongside instructors | |
| `students` | The learner on the marketplace surface (`1,043,609 students`) | "learners" |
| `Learner` | The same person in the help centre audience tab | **Two words for one role, by surface** |
| `cart` / `Keep shopping` | Retail vocabulary retained | "basket", "enrol" |
| `Udemy credits` | Non-cash refund currency, with a named issuing entity | "store credit", "vouchers" |
| `Lifetime access` | The ownership promise | "permanent access" |
| `Certificate of Completion` | Deliberately *completion*, not achievement | "certificate", "diploma" |
| `Certification Preparation` | Prep for a third party's exam, named as its own product | "exam prep" |
| `exam vouchers` | Purchasable third-party exam entitlement | |
| `Coding Exercises` | In-course practice, platform-provided | "labs" (used separately for subscription tier) |
| `In-course labs` / `workspaces` | Subscription-tier practice environments | |
| `Role Play` | An AI practice feature, rendered as a badge | |
| `Udemy AI Assistant` / `"Alex"` | Two named AI products, one for learning and one for support | |
| `Archiving a Course` | The way you hide a course you own | "remove", "unenrol" |
| `Teaching Center` | Instructor resource hub | "instructor academy" |
| `Udemy Business` | The B2B product | "Udemy for Enterprise" |
| `Report abuse` | The reporting affordance on a course page | "Flag", "Report" |

**Register split, and one genuine inconsistency.** The marketplace says `students`, `cart`, `Keep shopping`, `Bestseller` — retail. The help centre says `Learner` (as an audience tab) and `Learning experience`. The legal hub says `Marketplace & Website`. Three vocabularies for one relationship. `students` vs `Learner` for the same human, on the same product, is the one I would fix: the audience toggle a person clicks in help does not match the noun the product uses about them.

`Certificate of Completion` versus FutureLearn's `Certificate of Achievement` is the sharpest single-word comparison available across this batch. Udemy promises that you *finished*; FutureLearn promises that you *achieved*, and gates it on 90% plus assessments. Both are accurate to what the platform can actually attest, and the noun choice is the disclosure.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the buyer, first person plural for the company, and — distinctively — **first person singular for the user inside interactive controls** (`I am a...`, `I found my answer. Close my request.`, `I still need help.`). That third voice is the one worth studying: Udemy switches into the user's own mouth precisely at decision points, which is the same move the Wise exemplar praises in its confession-titled recovery articles, applied to buttons instead of headings.

**Register.** Flat, American, functional. Contractions used freely in help ("we're unable to", "don't"), not in policy. Almost no colloquialism on the platform's own surfaces — the only exceptions are `Take Me There` (instructor-facing), `On the go?` (mobile help scope line) and `Keep shopping`. **The exclamation marks and the hype are almost entirely in instructor-authored fields**, not in platform copy: the course title ends in `!`, the description opens with three italic-bold exclamations, section titles include `Welcome, Welcome, Welcome!` and `Test Your Fundamental Knowledge 1! Ready to Move On?`. Platform copy is notably drier than the inventory it sells. That contrast *is* the voice of an open marketplace, and it is worth naming as a structural fact rather than a tone failure: Udemy's editorial voice is calm because it has no control over the loud parts.

The one place platform copy breaks its own rule is the help no-results state (`Sorry! nothing found for`) and the unhelpful-vote response (`Sorry! We couldn't be helpful`) — two exclamation marks, both on failures, both slightly off-register against the un-exclaimed validation errors.

**Reading level.** Adult-general. Help articles run short paragraphs with bold sub-heads and numbered steps; the refund policy uses nested bullets and is the densest thing on the public surface (and carries a 6.5% helpfulness rate, which may be evidence of that density).

**Numbers as trust devices** `[observed]`: `4.7 out of 5`, `234,114 ratings`, `1,043,609 students`, `21 sections • 332 lectures • 71h 10m`, `50,717,848` learners in Python, `3,780` Python courses, `over 17,000 companies`, `30 days`, `1-3 business days` / `up to 14 business days` for refund settlement by rail. Unrounded to the unit, which reads as machine-generated rather than marketing-rounded — an implicit authenticity claim. Undercut by the stale `250,000 courses and 80 million students` in a live meta tag.

**Accessibility content** `[observed]`

- `Skip to content` present, first in DOM, on marketplace pages.
- `Skip to main content` on help-centre pages — **two different skip-link labels across two properties.**
- `Rating: 4.7 out of 54.7` in extracted text indicates a **visually-hidden full sentence** (`Rating: 4.7 out of 5`) paired with the visible numeral `4.7`. This is the correct pattern: screen-reader users get the scale, sighted users get the glanceable figure. Best accessibility detail in this file.
- `Arabic [Auto], Bulgarian [Auto]` — caption provenance exposed in text, per language, which is an accessibility *and* a quality disclosure in one field.
- `Finding Courses With Subtitles` exists as a help article, i.e. caption availability is treated as a discoverable filter.
- A public `Accessibility statement` linked from the footer of every page.
- Course-page images carry `alt` attributes (`Image of coding exercise example`; the CompTIA/AWS/PMI certification thumbnails have long descriptive alt listing the individual badges — "CompTIA certification badges including A+, Security+, Network+, Linux+, PenTest+, and IT Fundamentals certifications"). Verbose but genuinely informative for an image whose whole content is a set of logos.
- Testimonial portraits have empty or name-only alt inside already-labelled units — defensible.
- Social/partner logo images on the homepage carry brand-name alt inside links that already announce the brand — duplicate announcement risk.
- `title` / link text `Opens a dialog` on the help-centre `Sign in` link — modal behaviour announced in the accessible name.

**Negative findings, recorded honestly**

- `Sorry! nothing found for` renders with a trailing preposition awaiting interpolation (empty-query case will read as a fragment).
- `Let us know how can we improve this article!` — word order error in a live form label.
- `Number of hands-on practice` — count label missing its noun.
- Two help categories both named `Trust & Safety`, listed adjacently, with different destinations.
- `Frequently asked questions` vs `Frequently Asked Questions` in article titles — inconsistent casing in a heavily used convention.
- `students` (marketplace) vs `Learner` (help audience tab) for the same person.
- `Preview this course` duplicated in DOM; the whole related-articles + `Contact Us` block duplicated at the foot of help articles.
- `© 2025 Udemy, Inc.` on one help category page against `© 2026` elsewhere.
- `canonical: http://cms-dispatcher.content-management.svc.cluster.local/undefined` on the legal hub — internal service hostname and the string `undefined` leaked into public metadata.
- `meta-description` claiming "250,000 courses and 80 million students" on a live page, contradicting current homepage figures.
- `Role Play` (a feature) rendered in the same slot as `Bestseller` (an award).
- **No structured course-level field** (`Beginner`/`Intermediate`/`Advanced`) observed on the course landing page, so level is an instructor prose claim.
- The rating-algorithm disclosure is in help, not adjacent to the rating it qualifies.
- The refund policy article publishes a 197/3040 helpfulness ratio.
- The article-feedback form is prominent and explicitly non-actionable.

---

## Transferable patterns

1. **Say what the number is *not*, then what it is.** "instead of using a simple lifetime average, Udemy calculates a course's average star rating by considering… the likelihood of fraudulent ratings." Any aggregate score, index, estimate or risk band a product displays should carry a plain-English sentence of this shape, and it should sit next to the number, not in help. Directly applicable to seller ratings, fraud scores and credit-style indicators.
2. **Explain your limit by the other party's constraint.** The 30-day window is justified by the instructor payout schedule. On any two-sided or multi-party product, naming the counterparty's real constraint is both more persuasive and more honest than "for security reasons". Transfers straight to dispute windows, chargeback timelines and payout holds.
3. **Name editorial selection in the element's own definition.** `Featured review` — "highlights a positive experience". If a slot is curated, the word for the slot should imply curation, and the definition should say so outright.
4. **Buttons as complete first-person sentences containing their own consequence.** `I found my answer. Close my request.` beats `Yes`. Condition: only worth the length at genuine branch points, where the user needs to know what the click does before making it.
5. **Quote the error string in the help-article title.** `Resolving The "Problem With Your System Settings" Video Error`. If your product emits named errors, the help title should contain the literal string the user is reading. Cheapest findability win available.
6. **Publish the category-level average beside the item-level score.** A course's 4.7 is meaningless until the topic page has told you the category averages 4.5. Applies to any marketplace, review or benchmark surface.
7. **Disclose machine provenance per-item, inline.** `Arabic [Auto]` in the language list. Not a page-level "some captions are auto-generated" — a per-language tag at the point of choice. Immediately applicable to AI-generated summaries, translations and support replies.
8. **Publish the trust badge's criteria in the learner's own question.** "Udemy Instructor Partner badges: What do learners need to know?" with four enumerated criteria. A badge without published criteria is decoration. Condition: if one criterion is commercial alignment with you, say so, or the disclosure becomes a liability.
9. **Answer the case against your own inventory.** `What are the limitations of Python?` on a page selling Python courses. The objection you refuse to publish is the one the buyer goes elsewhere to research.

## Caveats & gaps

- **The price and discount block was not retrievable.** This is the material gap in the file. No price, anchor price, discount percentage, urgency timer or money-back badge string was observed. Anything about Udemy's discounting in this file is either help-centre IA or explicitly flagged as not found. A browser-rendered pass is required before this file can be cited on marketplace pricing copy.
- **Course-card badge vocabulary is incompletely observed.** Only `Bestseller` is confirmed. "Highest Rated" / "Hot & New" were not in any retrieved HTML and are recorded `[absent]` rather than assumed.
- **Only one course landing page harvested**, and it is an atypically large, atypically well-organised bestseller by a top instructor. Its `Requirements`, `Who this course is for:` and pathway scaffolding are that instructor's work, not the platform's. A thin or low-quality listing would evidence the marketplace's *floor*, which is the more interesting number for this benchmark and is unharvested.
- **No search-results page harvested**, so filter labels (level, duration, rating, language facets) and the sort vocabulary are unobserved — likely the richest remaining vein for T5 and T6.
- `/terms/refund/` and `/terms/terms-of-use/` render client-side; the refund *terms* were read only via the help-centre article, and the `Terms of Use` refund clause (referenced as `#section3`) was not read.
- **All in-product copy is documented, not observed**: course player, notes, progress marking, Q&A, certificates, AI Assistant and Role Play are reconstructed from help titles.
- `about.udemy.com/accessibility-statement` was not fetched; the statement's compliance verdict is unknown. `trust.udemy.com` (Trust Hub) unharvested.
- Udemy Business, `Teach on Udemy` instructor-acquisition copy, and the Teaching Center are out of scope here and would materially change the T2/T3 picture.
- Mobile app and email/push copy out of the public web surface.

## Sources

1. https://www.udemy.com/
2. https://www.udemy.com/course/the-complete-javascript-course/
3. https://www.udemy.com/topic/python/
4. https://www.udemy.com/terms/refund/
5. https://support.udemy.com/hc/en-us
6. https://support.udemy.com/hc/en-us/categories/204119628-Getting-started
7. https://support.udemy.com/hc/en-us/categories/204119608-Learning-experience
8. https://support.udemy.com/hc/en-us/categories/204119648-Purchase-refunds
9. https://support.udemy.com/hc/en-us/categories/8824166699671-Trust-Safety
10. https://support.udemy.com/hc/en-us/articles/360050856093-Udemy-s-refund-policy
11. https://support.udemy.com/hc/en-us/articles/4407469383575-Udemy-Instructor-Partner-badges-What-do-learners-need-to-know
12. https://support.udemy.com/hc/en-us/articles/229231027-How-to-preview-and-compare-courses
