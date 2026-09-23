# 136. FutureLearn

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Cohort-based MOOC (UK); short-course marketplace with university partners, plus microcredentials and degree referral |
| Primary URL | https://www.futurelearn.com/ |
| Corpus rank | 136 |
| Benchmark strength (source list) | Course expectations and pacing |
| Locale / market observed | en-GB register throughout (`meta-language: en-gb`, "Data Visualisation", "Maths"); **currency served inconsistently** — USD on the `www` React pages, GBP on the WordPress `/info/` pages during the same harvest |
| Platform observed | Web (desktop), Zendesk help centre, WordPress policy hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | UK consumer law cited directly ("Under UK law, you may have the right to cancel…"), 14-day cooling-off period; WCAG 2.1-style accessibility statement declaring **partial compliance**; CPD Certification Service as third-party accreditor on some courses; age floor 16+ with a published safeguarding regime |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Full for the public surface. Two gaps: the accessibility policy body was retrieved but only its section structure and compliance verdict were extracted; `/subscriptions` and `/accessibility` returned empty bodies (non-routes) |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.futurelearn.com/ | Hero, subject nav, plan comparison, 4-step how-it-works, promo banner |
| Using FutureLearn | https://www.futurelearn.com/using-futurelearn | The single richest source of pacing and in-product vocabulary |
| Course page (short course) | https://www.futurelearn.com/courses/introduction-to-content-design | Duration/weekly-study block, "Ways to learn" table, video transcript, degraded review state |
| Cancellation and Refund policy | https://www.futurelearn.com/info/terms/refund-policy | Four payment models, each with its own 14-day rule |
| Code of conduct | https://www.futurelearn.com/info/terms/code-of-conduct | 15 numbered second-person rules incl. a generative-AI rule |
| Accessibility and inclusion policy | https://www.futurelearn.com/info/terms/accessibility-policy | 11 numbered sections, UK public-sector statement format |
| Help centre home | https://futurelearn.zendesk.com/hc/en-us | Five categories, each with a scope line |
| Help: Getting Started and FAQs | https://futurelearn.zendesk.com/hc/en-us/categories/115001612487-Getting-Started-and-FAQs | Four sections incl. assignment-review articles |
| Help: Learning with us | https://futurelearn.zendesk.com/hc/en-us/categories/115001360488-Learning-with-us | Contains the `Staying safe online` section |
| Help: Purchases | https://futurelearn.zendesk.com/hc/en-us/categories/115001433627-Purchases | Subscription/cancellation article titles |
| Help article: Safeguarding at FutureLearn | https://futurelearn.zendesk.com/hc/en-us/articles/360015259980-Safeguarding-at-FutureLearn | Escalation routes, named mailbox, off-platform-group warning |

---

## T1 Navigation & IA labels

**Global nav — four items, one of which is an audience switch** `[observed]`

`Subjects` · `Courses` · `Degrees` · `For Business` · search · `Sign in` · `Register`

`Subjects` and `Courses` are the two mega-menus and they cut the same catalogue two ways: by **what you want to learn** and by **what kind of commitment you want**. The `Courses` menu is grouped by credential weight, not by topic:

| Group | Items |
|---|---|
| `Short Online Courses` | `Explore Courses with Unlimited` · `ExpertTracks` · `Premium Courses` · `All Short Online Courses` · `Get Unlimited Learning` |
| `Online Certifications` | `Microcredentials` · `Bootcamps` · `Professional Certificates` · `All Online Certifications` |
| `Online Degrees` | subject-by-subject, then `All Online Degrees` |

This is the product's core IA decision: **the second-level navigation is a commitment ladder** (a few hours → weeks → accredited → degree), and the same ladder reappears as tabs in the homepage "How does it work?" block and as a footer strip. A learner who does not yet know how much of their life they want to give up can navigate on that axis alone.

**Footer strip repeated on every page — five products, each with a one-line scope** `[observed]`

| Label | Scope line (verbatim) |
|---|---|
| `Subjects` | "Courses grouped by subject" |
| `Short courses` | "Learn new skills with a flexible online course" |
| `ExpertTracks` | "Upskill with a series of specialist courses" |
| `Microcredentials` | "Earn professional or academic accreditation" |
| `Online degrees` | "Study flexibly online as you build to a degree" |

Note the verb gradient: *learn* → *upskill* → *earn* → *study*. The verb is doing the expectation-setting before the user clicks.

**Footer groupings** `[observed]`: `About FutureLearn` · `Using FutureLearn` · `Work with FutureLearn` · `Small Print` · `Need some help?`

Two things are worth flagging. `Small Print` is a self-deprecating, honest label for the legal stack (most products say "Legal"). And under `Need some help?` the **first** link is `Child safety`, ahead of `Help Centre` and `Contact` — on a platform with a 16+ age floor, child safety is still given top billing in the support cluster.

**Policy hub left-hand nav** `[observed]` — `Terms and conditions` · `Accessibility and inclusion policy` · `Cancellation and Refund policy` · `Code of conduct` · `Code of Conduct for Reviews` · `Cookie policy` · `Data protection policy` · `Delivery policy` · `Openness principles` · `Privacy policy` · `Research ethics` · `Terms of Business`, plus dated promotional T&Cs. `Openness principles` and `Research ethics` as public policy documents are unusual for a commercial platform and read as MOOC-era institutional inheritance.

**Help centre — five categories, each with a scope line** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting Started and FAQs` | "Helpful articles for when you're new to FutureLearn" |
| `Account and Profile` | "Everything profiles, settings, emails and ID verification" |
| `Learning with us` | "Studying, accreditation and getting the most out of your courses." |
| `Purchases` | "Payment and shipping" |
| `Tech questions and troubleshooting` | "Solve common problems using the site" |

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Future-proof your career`
> Subhead: "Make your next career move with online courses from 200+ world-class universities and brands."

The headline is an outcome verb phrase built on the brand name (Future-**learn** → Future-proof). Credibility is deferred to the subhead and then immediately proven by a logo wall (Cambridge, UCL, Leeds, Accenture, CIPD, NHS England) rendered *above* the CTAs — institutional backing is the substitute for the rating-and-review machinery a marketplace would need.

**Section headers are commitment-shaped, not topic-shaped** `[observed]`

`Explore top subjects` · `Learn with 200+ world-class institutions and educators` ·
`Experience the benefits of Unlimited` · `Take your knowledge a degree further` ·
`Invest in yourself today` · `Short courses: bite-sized, flexible learning` ·
`How does it work?` · `Learning, powered by you`

`Short courses: bite-sized, flexible learning` is the pacing promise stated as a section heading. `Take your knowledge a degree further` puns on the credential.

**Course-page expectation block — the standout artefact for this file** `[observed]`

Immediately under the course title, before any marketing prose, a five-item strip:

`4 weeks` · `5 hours per week` · `Accreditation available` · `Digital certificate when eligible` · `Introductory level`

and then the same facts again as a labelled definition list: `Duration` → "4 weeks"; `Weekly study` → "5 hours"; `100% online` → `How it works`; `Unlimited subscription` → price; `Accreditation` → "Available".

Three deliberate choices here:

1. **Time cost is expressed in two units — total span and weekly load.** "4 weeks" alone would hide the intensity; "20 hours" alone would hide the pacing. Both together let a learner check it against a Tuesday evening.
2. **`when eligible` is doing disclosure work inside a benefit chip.** The certificate is promised and bounded in three words, in the same breath, at the top of the page.
3. **Level is a plain-English word, not a number.** `Introductory level`, not "Level 1" or "Beginner (100)".

**Learning-outcome framing** `[observed]` — `What will you achieve?` followed by "By the end of the course, you'll be able to…" and a list of verb-first outcomes (`Demonstrate…`, `Interpret…`, `Apply…`, `Reflect on…`, `Contribute to…`). Second person, future-perfect, one verb per line. This is textbook constructive alignment lifted straight into marketing copy.

**Start-date framing removes cohort anxiety** `[observed]` — under `When would you like to start?`: "Start straight away and join a global classroom of learners. If the course hasn't started yet you'll see the future date listed below." followed by the state `Available now` and the CTA `Join today`. FutureLearn's historical model was fixed cohort runs; this sentence is the seam where a cohort platform explains a now-rolling product, and it does it by stating the happy path first and the exception second.

**Plan value props are stated as three named postures** `[observed]`:
`Limited Access` — "Sign up and start sampling course materials now."
`Unlimited Annual` — "Supercharge your learning and save on your long-term learning goals."
`Unlimited Monthly` — "Earn CV-ready certificates and build next-level career skills."

`CV-ready` is the coinage worth stealing — it names the artefact by the moment of use, not by what it is.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Register` | Global nav | **Inconsistent with `Register for free` / `Sign up now` elsewhere** |
| `Sign in` | Global nav | |
| `Explore courses` | Hero, subject blocks, AI block | The workhorse label |
| `Subscribe to Unlimited` | Hero, promo bar, plan cards | Names the product, not the action |
| `Find out more` | Promo banner | Bare, but the banner supplies the object |
| `Get Unlimited Learning` | Courses mega-menu | Third label for the same destination |
| `Join course` | Course page, primary | Not "Enrol", not "Buy" |
| `Join today` | Course page, start-dates block | |
| `Join with limited access` | Course page, free column | Names the limitation inside the CTA |
| `Continue & Upgrade` | Course page, paid column | Ampersand, title case |
| `Continue & subscribe` | Course page, subscription column | **Sentence case — inconsistent with the sibling above** |
| `Find out more about how to join this course` | Under `Join course` | Fully specific anchor, no bare "Learn more" |
| `View all short courses` / `Explore degrees` / `Explore microcredentials` / `Explore ExpertTracks` / `Explore AI` / `Explore cyber security` | Section feet | Verb + named object, never bare |
| `Register for free` | Blog/policy page inline unit | Price inside the CTA |
| `Sign up now` | Footer join unit | |
| `Get started` | Personalised-recommendations card | |
| `Get in touch` | FLx / business block | B2B register |
| `Start now` | AWS partner block | |
| `Browse our courses to get started` | End of "Using FutureLearn" | Full-sentence CTA closing the explainer |
| `Dismiss` | Cookie notice and promo banner | Same label for two different dismissals |
| `Skip main navigation` / `Skip to support` | Top of DOM | **Two skip links, the second unusual and useful** |
| `T&Cs apply` | Beside every discount claim | Treated as a CTA-weight link |
| `Submit a request` | Help centre, top right | Refund and support entry point |

**Observation.** FutureLearn has three labels for one subscription destination (`Subscribe to Unlimited`, `Get Unlimited Learning`, `Continue & subscribe`) and three for account creation (`Register`, `Register for free`, `Sign up now`). Given the rest of the copy is unusually disciplined, this looks like template drift across the React site, the WordPress policy site and the Zendesk help centre rather than a deliberate register split.

## T4 Onboarding & getting-started

**Homepage "How does it work?" — four steps, tabbed by product** `[observed]`

1. `Choose a short course` — high-quality courses across every subject, designed and taught by academic and industry experts
2. `Subscribe or upgrade` — join Unlimited for long-term access and a CV-ready certificate, or upgrade per course
3. `Learn, connect and discuss` — "Courses are divided into weeks and steps. You'll be able to connect with other learners throughout your learning journey."
4. `Find your next course` — "Now you've caught the bug, what will you learn next?"

Step 3 is where the pacing model is actually taught, and step 4 is a **retention step disguised as an onboarding step** — the how-it-works sequence ends by pointing at the next purchase, phrased as a question rather than a CTA.

**`Using FutureLearn` — the deep onboarding narrative** `[observed]`

Fourteen H2s, each one a single in-product noun or action, in the order the learner will meet them:

`Pick a course` → `Learn for free, buy a course upgrade, or subscribe to Unlimited` → `Introduce yourself` → `Start the course` → `To do` → `Videos, audio and articles` → `Comments` → `Mark as complete` → `Discussion` → `Activity` → `Replies` → `Follow` → `Quizzes` → `Tests` → `Assignments` → `Completing the course` → `Choose the next course`

This page is the corpus's best example of **documenting the pacing contract in prose**. Specific sentences worth noting (paraphrased):

- Course length is given as a distribution, not a single figure: most courses run six to ten weeks, with some two- and three-week courses.
- The hierarchy is named explicitly — courses divide into **weeks**, weeks contain **activities**, activities are built from a sequence of **steps** — and each week carries "a descriptive name, so you always know what's expected".
- Learners are told they can navigate forward to see what is coming, or back to catch up "if you're late starting" — pre-empting the guilt of falling behind rather than only the mechanics.
- `Mark as complete` is explained as **optional**: leaving the switch off does not block progress, and if you are unsure you understood something you can leave it and return.
- Quizzes are unscored with unlimited attempts; **tests** are scored, capped at three attempts, and the scoring ladder is stated numerically (3 points first try, 2 on the second, 1 on the third).
- Pre-start email cadence is disclosed: a course-start email, plus a "one month to go" email for early joiners.

**Certificate eligibility stated as a threshold** `[observed]`: "Complete 90% of course steps and all of the assessments to earn your certificate." A hard number, on the marketing page, not buried in help. Compare the softer `Digital certificate when eligible` chip at the top of the same page — the platform hedges in the chip and commits in the body.

## T5 Form & field labels

Pre-auth form surface is thin. `[observed]`

| Label | Context |
|---|---|
| `Search term` / `Search` | Global search — visible label plus button, not a placeholder-only field |
| `Search online courses` | Title attribute on the search link |
| Catalogue filters (URL-level) | `filter_category=open`, `filter_course_type=unlimited` / `expert_track` / `premium`, `filter_availability=started` — so the user-facing filter vocabulary is *category*, *course type*, *availability* |

The `Search term` label is worth noting: FutureLearn ships a real label rather than relying on placeholder text, which is the accessible choice and comparatively rare.

Registration, payment and profile fields are behind auth. `[absent]`

## T6 Status & state language

**Course and enrolment states, named in public copy** `[observed]` / `[documented]`

- `Available now` — course-run state on the course page
- `Limited Access` — a named *access* state, not a plan name only ("Limited to 4 weeks")
- `when eligible` / `once you're eligible` — the certificate gate, treated as a state rather than an event
- `New` — badge on course cards ("Amazon Web Services (AWS)New")
- `Free digital upgrade` — a promotional state rendered inside a course card
- `To do` — the learner's own task state, given as a page name
- `Progress page` — the canonical place state lives
- `New Scratcher`-style progression does not exist here; instead the status vocabulary is around **runs**: help titles reference `course run`, `started`, `upcoming`

**Help-title evidence for states behind auth** `[documented]`:
`Knowing how much of the course you've completed` · `When does my Unlimited expire?` ·
`Is there a deadline for upgrading or buying Unlimited?` · `When do I need to be online?` ·
`What time will my course start?` · `What to expect when your course starts`

`When do I need to be online?` is the single best help title in this file. It is the question a working adult actually has about a "cohort" course, and answering it publicly is what lets FutureLearn sell weekly pacing without implying live attendance.

## T7 Error, failure & recovery

**Two genuine degraded-state strings observed on the course page** `[observed]`

> `Unable to play video. Please enable JavaScript or consider upgrading your browser.`

Plain, two clauses, two remedies, no apology and no exclamation mark. It also ships download links (`standard` / `HD`) beside the failure, so the recovery is not only "fix your browser".

> `Learner reviews cannot be loaded due to your cookie settings. Please activate all cookies and refresh the page to view this content.`

This one is a **defect worth recording**. It is honest about cause, but it asks the user to accept *all* cookies to see social proof, which turns a privacy choice into a content paywall; and the instruction ("activate all cookies") does not match the platform's own consent-banner vocabulary. The same page's cookie notice says the opposite thing in different words: "All but strictly necessary cookies are currently disabled for this browser. Turn on JavaScript to exercise your cookie preferences…" — so a JavaScript-disabled user is told to enable JS to change cookies, and separately told to enable cookies to see reviews. Two systems blaming each other.

**Recovery routing in help titles** `[documented]` — first-person and problem-shaped:

`I can't see where to join a course - what can I do?` ·
`My assignment hasn't been reviewed yet. What do I do?` ·
`I'm concerned about an assignment or assignment review. What do I do?` ·
`Why are my videos taking a long time to process?` (teacher-side) ·
`I bought an upgrade - can I use that to pay for Unlimited?` ·
`What happens if I cancel my ExpertTrack before my assignment is graded?`

The pattern is `<statement of my situation>` + `what do I do?` — the user's position first, the question second. `I'm concerned about an assignment or assignment review` is notable for covering an *emotional* state (concern) rather than a system fault.

## T8 Empty states

`[observed]` — one, and it is a cookie-gated content state rather than a true no-data state (quoted in T7 above). The homepage and catalogue were fully populated during harvest, so no zero-results view was reachable.

`[absent]` for authenticated empty states (`To do` list cleared, no courses joined, no replies). The help title `Knowing how much of the course you've completed` implies a progress surface with a zero state, but its copy is not public.

## T9 Notifications & system messages

**Promotional banner — the persistent one** `[observed]`

> `Get 30% off one whole year of Unlimited learning. Subscribe for just ~~$349.99~~ $244.99.` · `T&Cs apply` · `Find out more`

Structure: benefit → strikethrough anchor price → new price → bounded by a linked T&C → soft CTA. The strikethrough is inline in the sentence rather than in a separate price component, so the discount is narrated rather than displayed.

**A dated deadline, printed to the minute and time zone** `[observed]`:
"Sale price available until 2 November 2026 at 23:59 (UTC)."

This is the pacing/deadline discipline the product is in the corpus for, applied to commerce as well as to courses — no "ends soon", no countdown theatre, an absolute instant with a zone.

**Cookie notice** `[observed]`: "FutureLearn uses cookies to enhance your experience of the website. All but strictly necessary cookies are currently disabled for this browser. Turn on JavaScript to exercise your cookie preferences for all non-essential cookies." — states the *current* state of the user's browser, which is unusual and good; undercut by the contradiction noted in T7.

**Documented email model** `[documented]`: course-start email, "one month to go" email, reply notifications ("You'll also get email notifications, so that you never miss a reply"), and a help article `How notifications work on FutureLearn`. Renewal reminders are implied by the auto-renew disclosures but the email copy is not public.

**Registration inducement unit** `[observed]`: heading `Join FutureLearn today` with "Register for a FutureLearn account to get personalised course recommendations and offers straight to your inbox." — consent framed as benefit; "and offers" is disclosed rather than hidden.

## T10 Disclosures, legal & compliance

**The negation list — FutureLearn's signature disclosure pattern** `[observed]`

The homepage plan comparison gives the free tier a *positive* list and then a separate, explicitly negative list:

> `Joining for free and you'll get:` — "Limited access to 1400+ short courses"; "Restricted access to course content - You'll get lessons delivered weekly rather than all upfront"
> `With limited access you will not:` — "Receive certificates"; "Be able to access the course material after you have completed the course"; "Be able to access test steps within the course"

A heading that says **you will not**, followed by three things you will not get. Most freemium pages express this as greyed-out ticks; FutureLearn writes the sentence. The second bullet in the positive list is also doing disclosure work — it converts a throttle ("drip-fed weekly") into a described mechanic instead of a hidden one.

**Auto-renewal disclosed at three levels of insistence** `[observed]`
- Annual card: "Automatically renews. View `T&Cs`"
- Monthly card: "Automatically renews monthly. Cancel anytime. View `T&Cs`."
- Course page: "Automatically renews" under the price, plus `Cancel for free anytime` as a line under the CTA

"Cancel for free anytime" as a reassurance string *adjacent to the button* is the right placement; note it appears only in the subscription column, not in the one-off column, which is correct but means the two columns have asymmetric reassurance.

**Certificate qualifiers, three variants** `[observed]`: `Digital certificate when eligible` · `Certificate when you're eligible` · "A printable digital Certificate of Achievement on all short courses once you're eligible" · and the asterisked "Instant access to all course content that you can keep forever*" whose asterisk is not resolved on the homepage. **Flagged as a defect**: a forever-access claim carrying an unresolved asterisk is exactly the case a disclosure review should catch.

**Cancellation and refund policy — segmented by payment model, not by product** `[observed]`

The page opens with a scope carve-out before any entitlement: "our cancellation and refund policy only applies to purchases made directly from FutureLearn", then routes third-party purchasers away. It then names four regimes and gives each its own 14-day rule:

1. `Paid Upfront Courses (excluding Microcredentials) & certain Course Upgrades`
2. `Microcredential Courses`
3. `Subscription Access to Unlimited`
4. `Subscription Access to ExpertTracks and Professional Certificates`

The mechanics worth recording:

- Refund eligibility is **conjunctive and behavioural**, not just temporal: within 14 days **and** no tests attempted **and** no Certificate of Achievement downloaded. Consuming the value voids the refund, and the copy says which acts count as consuming it.
- **When the clock starts is defined per case**: for a pre-start purchase it begins on the first day of the course run; for a post-start purchase, on the day of purchase. This is the single most transferable sentence pair in the document — a cooling-off period on a dated service needs two start rules, and most products ship one.
- Monthly Unlimited: the 14-day right applies to the **first month's payment only**; annual, to the first year's only.
- Monthly→annual upgrade after the initial period: no refund, but access runs to period end.
- ExpertTracks / Professional Certificates: a **2-day free trial**, charged after; and the cooling-off period runs from **first access**, not from payment. The document then states plainly that no refunds are given on monthly ExpertTrack payments.
- Post-cancellation consequence is spelled out rather than implied: access removed, no tests, no certificate.
- Microcredentials may be **partially non-refundable**, and the copy tells you where to look: any non-refundable costs "will be clearly stated in the 'Overview' section of the microcredential description page."

**Code of conduct — 15 numbered rules, each a second-person commitment** `[observed]`

Framed as "as a FutureLearner, you agree that:" and then each rule is a complete sentence in the *user's* voice about the user's behaviour, used as the heading:

`1: You are at least 16 years old.` ·
`2: You will communicate in English only (or the specified language of a course).` ·
`3: You have registered for one account only, and use an appropriate profile name` ·
`4: You will not share your personal contact details on the FutureLearn platform, or ask another learner for theirs.` ·
`5: The comments and assignments you post are your own work…` ·
`6: You will not use generative AI to write comments or as part of an assessment on FutureLearn, unless this is clearly requested of you within a course step.` ·
`7: You are respectful of others…` · `8: If you disagree with someone's ideas you will discuss their ideas, rather than criticise or attack them personally.` ·
`9: You take part in tests and assessments honestly, and don't share the answers.` ·
`10: You are supportive and constructive when offering feedback…` ·
`11: You are law-abiding…` · `12: You are here to learn, not to advertise products or services…` ·
`13: You add to conversations and do not 'spam' other learners…` ·
`14: You will not deliberately post false information with the intent to cause harm to others.` ·
`15: You will help the FutureLearn community by reporting comments that you believe have broken this Code of Conduct.`

Three structural notes. Every rule is followed by a short *reason* paragraph, not just an elaboration — rule 4 explains "you don't know who might be reading your comment", rule 2 explains that multilingual comment threads become unusable. The AI rule (6) is stated as a default prohibition with a named exception path ("unless this is clearly requested of you within a course step") and cross-referenced from rule 5, which is a cleaner construction than most 2020s AI policies. And the list **ends on the user's duty to the community**, not on the platform's right to ban — rule 15 makes reporting a membership obligation and tells you the exact affordance ("clicking on the flag icon beneath it").

**Age and parental-use guidance** `[observed]`: the 16+ floor is stated, and homeschooling parents are given an explicit compliant route — use your own account, work through the materials with the child, and "take part in any conversations as yourself." Registrations since 11 February 2022 must be 16+, which dates the policy change in public.

**Safeguarding** `[documented]`, help centre: a zero-tolerance statement covering "bullying, harassment, sexual exploitation or abuse"; a stated duty on *all* adults on the platform to respond to concerns about a child; three named escalation routes (report a comment; report an educator; report FutureLearn staff) each with its own procedure; a named mailbox `safeguarding@futurelearn.com` routing to a "Safeguarding Officer and Deputy"; and, for staff reports, an explicit link to the Whistleblowing Policy. The strongest paragraph is a bolded negative claim about off-platform impersonation: FutureLearn states it does not host courses or study groups outside its platform, including via WhatsApp or Telegram, and that no real educator, mentor or moderator will invite you to such a group. **Naming the scam pattern, then naming the channels, then stating what a legitimate actor will never do** is a reusable anti-phishing construction.

**Accessibility and inclusion policy** `[observed]` — structured as a UK public-sector accessibility statement, eleven numbered sections: `1. Introduction` · `2. How accessible this website is:` · `3. Reporting accessibility problems with this website` · `4. Enforcement procedure` · `5. Technical Information – Compliance Status` · `6. Non accessible content` · `7. Disproportionate burden` · `8. Content not within the scope of the accessibility regulation` · `9. What we're doing to improve accessibility` · `10. Equality and Diversity Principles` · `11. Preparation of this accessibility statement`. The compliance verdict declared is **"partially compliant"** against WCAG, with named non-accessible content and a disproportionate-burden section. Declaring partial compliance and enumerating the gaps is the honest form of this artefact; that a commercial platform adopted the public-sector template is itself the finding.

## T11 Help-centre architecture

Three levels: five **categories** → named **sections** → article lists. The section names are the artefact.

Inside `Getting Started and FAQs`: `How to use FutureLearn` · `Getting started` · `FAQs` · `Assignments and assignment reviews`.
Inside `Learning with us`: `How ExpertTracks work on FutureLearn` · `Staying safe online` · `How courses work` · `Social and sharing` · `Accreditation and proof of study` · `Who can learn with us` · `Microcredentials` · `How Professional Certificates work on FutureLearn`.
Inside `Purchases`: `Subscriptions` · `Upgrades and Premium courses` · `General`.

Two of these deserve attention. **`Who can learn with us`** is an eligibility category phrased as an invitation, and it is where FutureLearn puts its humanitarian access programmes — `Campus for Ukraine`, `Campus для України` (the Ukrainian title kept in Cyrillic in an en-US help centre), `Support for women in Afghanistan`, `Free subscriptions for women in Afghanistan: how to claim`, `Study abroad`, `How to join your University FutureLearn Campus`. Access programmes are filed as *who can learn*, not as *offers*.

**`Staying safe online`** sits inside `Learning with us` rather than in a separate trust hub, so safety is presented as part of the learning experience. Its nine articles: `Study Groups` · `Misinformation and Disinformation` · `Advice for staying safe online` · `Safeguarding at FutureLearn` · `How does FutureLearn ensure safeguarding?` · `Online bullying` · `How do we moderate comments?` · `What is the teacher's role in safeguarding students on FutureLearn?` · `Moderation on FutureLearn`.

Note `How do we moderate comments?` — **first person plural in the question**, i.e. the platform asking itself a question on the user's behalf. Most help centres would write "Comment moderation".

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| `How to …` (task) | `How to join a Monthly or Annual Unlimited Subscription` |
| `How do I …?` / `Can I …?` | `Can I switch from Monthly to Annual Subscriptions?` |
| `I <situation> - what do I do?` | `I can't see where to join a course - what can I do?` |
| Gerund/noun topic | `Claiming a refund`, `Reading lists`, `Discounts and financial aid` |

**Routing furniture** `[observed]`: `Submit a request` is placed top-right on every help page, ahead of search, and `Promoted articles` carries a single item. Five languages are offered on the help centre (en-US, es-ES, fr, it-IT, pt) — fewer than the course-language claim of Italian, Spanish, French and Portuguese would suggest, and the default is labelled `English (United States)` on a site whose marketing copy is en-GB. **Locale inconsistency flagged.**

## T12 FAQs

FutureLearn does not run a marketing FAQ accordion on the homepage. Instead the FAQ function lives in two places. `[observed]`

**(a) Course-page section headers as an implicit FAQ** — the course page answers questions by asking them as headings:

`What topics will you cover?` · `Who is this accredited by?` · `When would you like to start?` · `What will you achieve?` · `Who is the course for?` · `What software or tools do you need?` · `Who will you learn with?` · `Who developed the course?`

Eight questions, in a deliberate order: content → credibility → timing → outcome → fit → prerequisites → people → provenance. `When would you like to start?` is second person and *preferential* ("would you like") rather than informational ("when does it start") — the only one framed as a choice, which is precisely the one the platform wants to feel flexible. `What software or tools do you need?` is answered in one sentence ("The course works on both computers and mobiles.") — a prerequisites section that exists mainly to remove a worry.

**(b) Help-centre `FAQs` section** — 18 articles; six surfaced, verbatim:

| # | Question (verbatim) |
|---|---|
| 1 | Are certificates free? |
| 2 | Is there a deadline for upgrading or buying Unlimited? |
| 3 | When does my Unlimited expire? |
| 4 | I bought an upgrade - can I use that to pay for Unlimited? |
| 5 | When do I need to be online? |
| 6 | What time will my course start? |

Also verbatim from `Getting Started`: `What types of courses do you offer?` · `Can I get a certificate for free?` · `What to expect when your course starts`.

**Structural note.** Four of the six FAQs are about **time** — deadlines, expiry, when to be online, what time a course starts — and two are about certificate cost. Read as a demand signal, that is the whole thesis of this file: on a weekly-cohort platform, the questions people actually ask are temporal. Note also `Are certificates free?` and `Can I get a certificate for free?` are two separate articles asking the same thing in different grammar — duplication, but arguably deliberate for search coverage.

## T13 Terminology & glossary

| Term | FutureLearn's usage | The alternative it rejected |
|---|---|---|
| `step` | The atomic unit of content ("a sequence of straightforward steps"); also public as `Open steps sitemap` | "lesson", "unit" |
| `week` | The pacing container, each with "a descriptive name" | "module", "section" |
| `activity` | The mid-level grouping between week and step | "topic" |
| `course run` | A dated instance of a course; the refund clock hangs off it | "cohort", "session" |
| `To do` | The learner's task list, named as a page | "Dashboard", "My learning" |
| `Progress page` | Where completion state lives | "Analytics" |
| `Mark as complete` | An optional, non-gating switch | "Complete lesson" |
| `Limited Access` | The free tier, named by its constraint | "Free plan", "Basic" |
| `Unlimited` | The subscription, named by its opposite | "Premium", "Pro" |
| `upgrade` | The per-course purchase | "buy", "unlock" |
| `Premium Courses` / `Paid Upfront Courses` | Two names for pay-per-course in marketing vs. policy | |
| `ExpertTrack` | A subscription series of specialist courses | "specialisation", "nanodegree" |
| `Microcredential` | Accredited unit carrying academic credit | "certificate program" |
| `Certificate of Achievement` vs `Statement of Participation` | **Two distinct named artefacts** — achievement is gated on assessment, participation is not | a single "certificate" |
| `CV-ready` | Adjective for the certificate | "shareable", "verifiable" |
| `educator` | The teacher, throughout | "instructor", "tutor" |
| `learner` | The user, throughout | "student" |
| `FutureLearner` | Community identity, used in the code of conduct | |
| `Peer Review` | Named assessment activity | "peer grading" |
| `Study Groups` | Named feature, also the subject of a scam-warning article | |
| `Open steps` | Publicly indexable course steps, exposed as a sitemap | |
| `Small Print` | Footer label for the legal stack | "Legal", "Policies" |
| `Openness principles` | A published institutional policy | |

**Register split.** Marketing says `Premium Courses`, `Subscribe to Unlimited`, `CV-ready certificates`. Policy says `Paid Upfront Courses`, `Subscription Access to Unlimited`, `Certificate of Achievement`. Help says `upgrade` and `Unlimited`. The three surfaces are internally consistent but do not share a lexicon, which is a real findability cost: a learner searching help for "premium" and a learner reading the refund policy are looking at the same product under different names.

`learner` / `educator` rather than `student` / `instructor` is the most consistent lexical choice on the platform, held across marketing, help, policy and safeguarding copy.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the learner throughout; first person plural for the institution ("We'll email you", "we also have some shorter two and three week courses", "We're confident that you'll enjoy"). The company is a visible actor, including in the code of conduct ("Any other comments produced by generative AI will be removed by our moderators") and in safeguarding.

**Register.** Plain, contraction-friendly, slightly warmer than a university and considerably warmer than a marketplace. Reading level is comfortably adult-general — short declarative sentences in the onboarding prose, longer subordinate clauses in policy.

**The register gradient is unusually well managed.** Marketing is upbeat and occasionally colloquial: "Boss it in business with our specialist upskilling courses"; "Now you've caught the bug, what will you learn next?"; "Education is infectious"; "Stop skill gaps in their tracks"; "Don't let language be a barrier"; "bite-sized, flexible learning". Pedagogy copy is encouraging and explicitly anticipates anxiety: "give it a go, even if you find it daunting!"; "If you're not sure that you properly understood something, you can leave it and come back to it later." Policy copy is flat, numbered and unsoftened. No exclamation marks appear in the refund policy; two appear in the onboarding page; several in the marketing blocks. The tone flattens as the stakes rise — the same gradient the Wise exemplar records, but here the *middle* register (pedagogy) is the distinctive one: warm without being jolly, and specifically designed to lower the cost of falling behind.

**Numbers as trust devices** `[observed]`: `200+` institutions, `1400+` short courses (homepage) vs `1,000+ courses` (course-page comparison table) — **inconsistent, flagged**; `32,474 enrolled on this course`; `4.6 (249 reviews)`; `90%` of steps for a certificate; `3 points / 2 / 1` test scoring; `14 day cooling off period`; `2 day free trial`. Specific rather than rounded, except where two systems disagree on the catalogue size.

**Accessibility content** `[observed]`

- **Two skip links**, first in DOM: `Skip main navigation` and `Skip to support`. A second skip target aimed at the support block is a thoughtful addition.
- **Video transcripts are rendered as timestamped, keyboard-reachable jump links**, each with a spelled-out label: `0:04` / `Skip to 0 minutes and 4 seconds`, `0:16` / `Skip to 0 minutes and 16 seconds`. The numeric timestamp is paired with a fully worded screen-reader label rather than left as a bare figure. Speaker names are carried in the transcript text (`Jason:`, `Nigel:`, `Jane:`). This is the best accessibility artefact in this batch.
- Video failure offers **downloadable alternatives** (`standard`, `HD`) beside the error rather than only a fix instruction.
- Alt text is descriptive and scene-level: "Three people working on the laptop.", "A junior chef in the kitchen wearing an apron and chopping tomatoes.", "Website development layout sketch drawing titled 'Content Design'", "Smiling woman in discussion with client in office conference room". Course-card alt text is used as the card's visible caption too, so the same string serves both.
- Social links carry title attributes ("FutureLearn on Instagram - link opens in a new tab") — new-window warning in the accessible name.
- A public `Accessibility and inclusion policy` linked from the footer of every page, declaring partial WCAG compliance.
- **Gaps:** some decorative partner-logo images carry the brand name as alt inside an already-labelled link, producing duplicate announcements ("University of Cambridge" twice in the same logo wall, which renders twice on the homepage for responsive variants). The tick/cross cells in the `Ways to learn` comparison table render as the literal words "tick" and "cross" in the extracted text, which suggests icon-only cells with text alternatives — defensible, but "cross" is a poor accessible name for "not included".

**Negative findings, recorded honestly**

- **Currency inconsistency within one harvest**: `$349.99 → $244.99` on `www.futurelearn.com`, `£249.99 → £174.99` on `www.futurelearn.com/info/…`. Same promotion, same session, two currencies, because the promo banner is templated separately on the WordPress and React stacks.
- `1400+ short courses` vs `Access to 1,000+ courses` on the same product.
- `Tests to check your learning` (comparison table) vs `Tests to boost your learning` (plan cards) — same row, same page, two labels.
- `Continue & Upgrade` (title case) vs `Continue & subscribe` (sentence case) — sibling CTAs.
- Three labels for account creation (`Register`, `Register for free`, `Sign up now`) and three for subscribing.
- `Terms and conditions` appears **twice** in the policy-hub left nav.
- An unresolved asterisk on "keep forever*".
- `Learner reviews` are cookie-gated, and the gate instruction contradicts the cookie banner.
- The homepage promo bar and the cookie notice both use `Dismiss`, so two adjacent dismiss controls share one accessible name.
- Help centre defaults to `English (United States)` while the product copy is en-GB.
- Some footer links point at `progress.futurelearn.com` and some at `www.futurelearn.com/degrees` for the same destination — two hosts for the degrees product.

---

## Transferable patterns

1. **State time cost in two units.** `4 weeks` **and** `5 hours per week`, side by side, before any prose. A span without an intensity, or an intensity without a span, is not an expectation — it is a guess. Transfers to any product where the user must fit a commitment into an existing life: onboarding flows, KYC journeys, instalment plans.
2. **Define when the clock starts, twice.** The refund policy gives a different cooling-off start for pre-start and post-start purchases. Any cooling-off, trial or guarantee attached to a *dated* service needs two start rules and most ship one. Directly applicable to BNPL, subscriptions and pre-orders.
3. **Write the negation list.** `With limited access you will not:` followed by three plain sentences. Greyed-out ticks are deniable; a sentence beginning "you will not" is not. Condition: only works if the positive list is genuinely attractive, otherwise it reads as a threat.
4. **Make the progress switch optional and say so.** "leaving the switch off does not prevent you from moving on" removes a whole class of anxiety at the cost of one clause. Transfers to any checklist, onboarding tracker or compliance wizard that does not actually gate.
5. **Rules as the user's own first-person commitments, each with a stated reason.** `You will not share your personal contact details…` plus a sentence explaining why. Reasons convert a rule list into guidance, and the reason is what survives in memory. The AI rule shows the shape works for new categories too.
6. **Name the scam pattern before naming the remedy.** "None of our real course educators, mentors, or moderators will invite you to join a course or study group on WhatsApp or Telegram." Stating what a legitimate actor will *never* do inoculates better than telling people to be careful. Highly transferable to payments and account-takeover comms.
7. **File access programmes under "who can learn with us".** Eligibility framed as invitation rather than as offer or concession. Applies to fee waivers, hardship policies and accessibility accommodations.
8. **Ask the flexible question in the preferential mood.** `When would you like to start?` on a platform whose weakness is fixed cohorts. Choose the grammatical mood that matches the feeling you need the section to produce.

## Caveats & gaps

- **All in-product copy is documented, not observed.** The `To do` list, `Progress page`, `Mark as complete` switch, quiz and test feedback, assignment and Peer Review flows, and every transactional email are reconstructed from `Using FutureLearn` and help titles. Marked throughout.
- **Only one course page harvested**, and it is a free/partner course. Microcredential, ExpertTrack, Bootcamp and Professional Certificate pages will carry different pacing, deadline and non-refundability copy — in particular the promised "non-refundable costs … clearly stated in the 'Overview' section" was not verified on an actual microcredential page.
- **Accessibility policy body not fully extracted** — section headings and the "partially compliant" verdict were captured; the enumerated non-accessible content and disproportionate-burden reasoning were not read in full.
- **Help-article bodies mostly unopened.** Only `Safeguarding at FutureLearn` was read end to end; the rest of T6/T7/T12 rests on titles, which are high-signal for IA and demand but silent on answer structure.
- `Tech questions and troubleshooting` category page timed out and was not retrieved, so error-recovery article titles are under-sampled — likely the richest remaining vein for T7.
- **Locale risk.** Currency and help-centre defaults mixed en-GB and en-US within one session. Any price, currency or date string in this file should be re-verified on a geolocated session before use as UK or US precedent.
- Degrees are on a separate host (`progress.futurelearn.com`) and were not harvested; `business.futurelearn.com` and the `FLx` product likewise.
- Mobile app and email copy are out of the public web surface.

## Sources

1. https://www.futurelearn.com/
2. https://www.futurelearn.com/using-futurelearn
3. https://www.futurelearn.com/courses/introduction-to-content-design
4. https://www.futurelearn.com/info/terms/refund-policy
5. https://www.futurelearn.com/info/terms/code-of-conduct
6. https://www.futurelearn.com/info/terms/accessibility-policy
7. https://futurelearn.zendesk.com/hc/en-us
8. https://futurelearn.zendesk.com/hc/en-us/categories/115001612487-Getting-Started-and-FAQs
9. https://futurelearn.zendesk.com/hc/en-us/categories/115001360488-Learning-with-us
10. https://futurelearn.zendesk.com/hc/en-us/categories/115001433627-Purchases
11. https://futurelearn.zendesk.com/hc/en-us/articles/360015259980-Safeguarding-at-FutureLearn
