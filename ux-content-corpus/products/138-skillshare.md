# 138. Skillshare

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Creative-skills subscription (all-you-can-watch membership), teacher-supplied catalogue with a project-based pedagogy and a creator marketplace attached (1-on-1 Sessions, digital products) |
| Primary URL | https://www.skillshare.com/ |
| Corpus rank | 138 |
| Benchmark strength (source list) | Project-based learning prompts |
| Locale / market observed | en (`/en/` path, `meta-og:locale: en`); help centre serves de, es-mx, fr, pt-br |
| Platform observed | Web (desktop), Zendesk help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a in the regulated-sector sense. Auto-renewal disclosure in the global footer; a `Legal Terms and Policies for Students` and a parallel `Legal Terms and Policies for Teachers` article; `Content Notification Processes` under `Contact Us`; `Identity Verification` required of teachers; self-harm escalation commitment in the Community Guidelines |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Full for the project-brief question this product is in the corpus for. Two gaps: class reviews are client-rendered (`Load More Reviews` observed, review text not retrieved), and the refund-policy article (`204536798`) was not opened directly — refund terms come from the consolidated subscriptions article |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.skillshare.com/ | Hero, category carousel, benefit quartet, Creative Feed block, FAQ, auto-renew footer |
| Pricing | https://www.skillshare.com/pricing | Single price, six-item membership inclusion list |
| Class page | https://www.skillshare.com/en/classes/how-to-draw-a-beginners-guide-part-1-of-the-drawing-laboratory/1607370408 | `Hands-on Class Project`, `Community Generated` level, `Top Teacher`, project gallery |
| Help centre home | https://help.skillshare.com/hc/en-us | Three audience tabs, ~30 sections — the fullest IA in this batch |
| Help: Craft Your Class Project | https://help.skillshare.com/hc/en-us/articles/4416715720077-Craft-Your-Class-Project | **The priority artefact: Skillshare's own spec for writing a project brief** |
| Help: Community Guidelines | https://help.skillshare.com/hc/en-us/articles/204536438-Community-Guidelines | Three-part structure, strike system, self-harm escalation |
| Help: How do Skillshare subscriptions, pricing, and refunds work? | https://help.skillshare.com/hc/en-us/articles/4402806767117 | Trial-length-dependent refund rules |
| Help: How does Skillshare work? | https://help.skillshare.com/hc/en-us/articles/205208147-How-does-Skillshare-work | The one-paragraph model statement |

---

## T1 Navigation & IA labels

**Global nav** — largely client-rendered and not in server HTML. `[absent]` for the signed-out header labels.

**Footer — organised by creative discipline, then by software, then by trending class** `[observed]`

| Group | Sample items |
|---|---|
| `Art and Illustration` | `Illustration classes` · `Digital art classes` · `Drawing classes` · `Painting classes` · `Watercolor classes` · `More...` |
| `Graphic Design` | `Graphic design classes` · `UI/UX design classes` · `Type design classes` · `Surface pattern design classes` · `Motion design classes` |
| `Creative Career` | `Marketing classes` · `Freelance classes` · `AI classes` · `Productivity classes` · `Social media classes` |
| `Film, Video, and Photography` | `Film career classes` · `Video production classes` · `Photography technique classes` · `Photography editing classes` · `Content creation classes` |
| `Software` | `Procreate classes` · `Adobe Illustrator classes` · `ChatGPT classes` · `Blender classes` · `Canva classes` |
| `Trending Classes` | Five named individual classes |

Every item in the first five groups ends in the word **`classes`**. That is a deliberate, consistent suffix — `Watercolor classes`, not "Watercolor". It reads as SEO discipline, but it also does content work: it keeps the unit of purchase in front of the reader at every link.

`Software` as a top-level footer grouping is the interesting one. Skillshare's catalogue is navigable by **the tool you own** (`Procreate`, `Canva`, `Blender`, `ChatGPT`) as well as by the skill you want. For a creative-skills product that is the real buying axis — people arrive having bought an iPad and a Procreate licence.

**Category carousel on the homepage** `[observed]`: `Graphic Design` · `Illustration` · `Animation` · `Film & Video` · `Freelance` · `UI/UX Design` · `Productivity` · `Photography` · `Fine Art` · `Marketing` — ten, rendered twice (infinite-scroll duplicate in DOM). `Freelance` and `Productivity` sitting between `Animation` and `Photography` is the give-away that this is a *creative career* product, not an art product.

**Help centre — three audience tabs and ~30 sections** `[observed]`

`Students` · `Teachers` · `Skillshare for Teams`

Student sections: `Getting Started` (16) · `Billing & Payments` (16) · `Managing Your Account` (14) · `Navigating Skillshare Classes` (24) · `Mobile App` (8) · `Skillshare Shop` (11) · `Student Referrals` (2) · `Gift Cards` (2) · `Technical Troubleshooting` (7) · `Legal` (1) · `Contact Us` (2).

Teacher sections, and this is the notable part — **they are ordered as a production pipeline, not as a topic list**:

`Basics of Teaching` → `Teaching Policies` → `Revenue & Payments` → **`Plan Your Class`** → **`Film & Edit Your Class Videos`** → **`Upload Your Class Content`** → **`Promote Your Teaching`** → **`Engage Your Students`** → `Continue Your Teaching Journey` → `Host 1-on-1 Sessions` → `Sell Digital Products` → `Teacher Announcements` → `Legal Policies for Teachers`

Five consecutive sections are verb-first imperatives in chronological order of the work. A first-time teacher can read the section headings alone as a project plan. Compare Udemy's instructor help (`Course building`, `Course management`, `Selling & promotion`) — same content, organised as nouns; Skillshare organises it as a sequence.

Teams sections: `Announcements` · `Getting Started with your Team's Account` · `Skillshare for Teams Plans` · `Team Administration` · `Corporate Gift Cards` · `Billing` · `Reporting`.

**Three persistent footer promos on every help page** `[observed]`

| Heading | Body (verbatim) |
|---|---|
| `Get Started With Teaching` | "Here's your roadmap to creating your first class." |
| `Community Guidelines` | "Our Community Guidelines protect our teachers and students - the pulse of Skillshare." |
| `Get in Touch` | "Need help? Get in touch with one of our teams." |

Two of the three are supply-side or community, on a page a paying student is reading. `the pulse of Skillshare` is the coinage, and it recurs verbatim inside the guidelines themselves — a phrase the company clearly likes enough to use twice.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `Creative Classes Taught by the Best Creative Pros`

Seven words, three of them about the teacher. No outcome verb, no career promise, no number — the entire proposition is *who is teaching*. On a platform with no institutional accreditation and no certification-body partnerships, the teacher is the only available warrant, and the headline spends all of itself on it.

**Benefit quartet under `Creative Learning Made Easy`** `[observed]`

- "Thousands of creative classes. Beginner to pro."
- "Taught by creative pros and industry icons."
- "Learning Paths to help you achieve your goals."
- "Certificates to celebrate your accomplishments."

Note the verb in the fourth: certificates **celebrate**, they do not *prove*, *verify* or *advance*. That is an unusually honest framing of what a subscription platform's certificate can do, and it is the exact opposite of Udemy's "get certified and get ahead in your career" and FutureLearn's `CV-ready`. Skillshare is declining to make an employability claim it cannot back — and doing it in one verb.

"Beginner to pro" is the range claim, stated as a span rather than a list of levels.

**Social-proof stats** `[observed]`: `425k+ Members` · `30k+ Classes` · `9k+ Teachers` · `4.8 App Store Rating`.

**Defect, and a significant one:** the pricing page's own hero says "Join the **11 million+** creative people who have found inspiration… on Skillshare." Two numbers for the size of the community, 26× apart, on two pages of the same funnel. The most likely reading is that `425k+ Members` is current paying subscribers and `11 million+` is cumulative registered users — but neither page says which, so the only thing a reader can conclude is that one of them is wrong. **On a product whose hero proposition is trust, an unexplained 26× discrepancy in the trust numbers is the most serious content defect in this file.**

**Pricing page headline** `[observed]`: `Learn and Level up on Skillshare`. "Level up" is gaming vocabulary imported into skills — casual, non-institutional, and consistent with the register elsewhere.

**Membership inclusion list — six named items, each with a one-line scope** `[observed]`

| Item | Scope line (verbatim) |
|---|---|
| `Creative Classes` | "Thousands of top-rated classes in design, art, entrepreneurship, and more with zero ads, ever." |
| `On-Demand Learning` | "Learn when you want, online and on our app." |
| `Taught by Industry Icons` | "9,000+ teachers who represent the top of their creative disciplines." |
| `Learning Paths` | "Curated sequences of classes to guide you towards specific goals or skills." |
| `Creative Community` | "An active community of fellow creatives to give you feedback and get inspired by." |
| `Certificates and Badges` | "To help you celebrate all of your accomplishments along the way." |

`with zero ads, ever` is the only competitive jab on the page, and it is aimed at free video platforms rather than at other course sellers — a correct read of where a Procreate-curious buyer actually is. `Certificates and Badges` repeats *celebrate*, so the hedge is consistent across two surfaces rather than accidental.

**The `Creative Feed` block — three imperatives** `[observed]`

| Heading | Body (verbatim) |
|---|---|
| `Stay Inspired` | "Discover trending topics, get quick answers, and find your people." |
| `Stay Connected` | "Follow your peers and teachers, exchange perspectives, and share some love." |
| `Keep Creating` | "Explore new ideas for your next project, post your work, and get feedback." |

Each body is a three-verb run. `find your people` and `share some love` are the two most colloquial strings on the platform. `Keep Creating` is the one that matters for this benchmark: the community block's third promise is explicitly about the *project loop* — get an idea, post the work, get feedback — and that loop is the product.

**Teacher positioning** `[observed]`: "Skillshare teachers are industry leaders excited to share their tools, techniques, and professional journeys with you." followed by `MEET <name>` cards, each with a bare occupational label — `Illustrator`, `Digital Designer`, `Animator, Product Designer`, `Graphic Designer`, `Watercolor Artist`, `Motion Graphics Artist`, `Master Artist`, `Filmmaker and Youtuber`. **The credential is the job title, not a qualification.** `Filmmaker and Youtuber` as a listed credential is the clearest statement of what this platform accepts as expertise.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Learn More` | `Skillshare for Teams` block (homepage) | Bare, but the block states the offer above it |
| `See Plans` | `Skillshare for Teams` block (pricing page) | **Different label, same destination as the above** |
| `MEET <Name>` | Teacher cards | Imperative + person; the CTA is a person, not a page |
| `Load More Reviews` | Class page | |
| `Keep Creating` / `Stay Inspired` / `Stay Connected` | Creative Feed block headings, rendered as links | Headings doing CTA duty |
| `More...` | Every footer discipline group | Bare, but scoped by its group heading |
| `Explore Ideas` / `Discover Tutorials` / `Remix!` | (Scratch — n/a, excluded) | |
| `See full terms of service here.` | Auto-renew footnote | Sentence-final CTA inside a legal line |
| `Attach a File` | Documented, teacher project editor | The control that creates a `Resource` |
| `Read More` | Documented, class About tab project truncation | See T2/T8 — this control is the reason the brief's first sentence matters |
| `Cancel membership` | Documented, account settings | Named plainly, not "Manage plan" |
| `Contact Support` | Refund article | |

**Gap:** the primary acquisition CTAs (`Start free trial` / `Join Skillshare` / `Sign up` and the class-page enrol button) are client-rendered and **were not observed**. `[absent]` — recorded rather than assumed. What *was* observed in their place, on the class page, is the paywall block itself (see T8).

**Observation.** `Learn More` on the homepage and `See Plans` on the pricing page point at the same Teams destination. `See Plans` is the better label and should win.

## T4 Onboarding & getting-started

**The model, stated in one paragraph** `[observed]`, from `How does Skillshare work?`:

> "As a Skillshare member, you'll have access to our online classes that you can watch on your own time, taught by creators, entrepreneurs, and professionals from around the world. Each class has short lessons and a hands-on project for you to work on. Share your project in the class to get feedback and collaborate with our vibrant community."

Three sentences, three commitments: **watch on your own time** (pacing), **short lessons and a hands-on project** (structure), **share to get feedback** (the loop). This is the most economical statement of a pedagogy in the batch, and it puts the project in sentence two of three.

**Student onboarding is thin and task-shaped** `[observed]`, from the `Getting Started` and `Navigating Skillshare Classes` sections:
`What is Skillshare?` · `How does Skillshare work?` · `What does a Skillshare membership include?` · `Who are Skillshare's teachers?` · `How do I become a Skillshare teacher?` · `How do I find a class to take?` · `How do I start a class?` · `How do I mark a class as completed?` · `How do I leave a class review?` · `What type of information can I provide in my class review?`

Two things stand out. `Who are Skillshare's teachers?` is in the **student** getting-started section — the same decision Udemy makes with `Udemy's instructors`, and for the same structural reason: an open catalogue creates that question and the platform must answer it in onboarding. And `How do I become a Skillshare teacher?` sits in the *student* section too, so the supply-side pitch is placed fourth in the buyer's first-run reading.

**Teacher onboarding is the real onboarding narrative here** `[observed]` — the `Plan Your Class` section is a seven-step brief-writing course:

`Class Planning Template` → `Experiment with Class Formats` → `Choose Your Class Topic` → `Give Your Class a Title` → `Write Your Class Description` → **`Craft Your Class Project`** → (+1 more)

Each step is a verb-first imperative with the object named. `Experiment with Class Formats` is placed second, before topic selection — so the format decision precedes the content decision, which is a real pedagogical stance.

## T5 Form & field labels

Pre-auth form surface is almost entirely client-rendered. `[absent]` for search, signup and payment fields.

**Documented teacher-side labels** `[documented]`, from `Craft Your Class Project`:

| Label / element | Role |
|---|---|
| `Project Gallery` | Where completed student projects live — the destination the brief must name |
| project description | The free-text brief field; its **first sentence** is always visible on the class `About` tab, the rest behind `Read More` |
| `Attach a File` | The control that turns an upload into a student-visible `Resource` |
| `Resource` | The student-facing name for an attached template or worksheet, shown "next to the project description in the class" |
| `About` tab | The class-page tab that carries description and project |

**The single most useful field-level insight in this file** `[observed]`, verbatim from the article:

> "The first sentence of the project description is always visible below the class description on the About tab of your class, but students must click "Read More" to see the rest."

Skillshare tells its content authors **exactly how much of their field will render before truncation, and what the truncation control says.** That is a field-label spec written from the reader's viewport backwards, and it is the reason the guidance that follows ("Summarize the Project in Your First Sentence") has teeth. Most platforms give a character limit; Skillshare gives a *layout consequence*.

## T6 Status & state language

**Class-page state and metadata vocabulary** `[observed]`

| State / field | Value observed | Notes |
|---|---|---|
| Level | `Beginner level` · `Intermediate level` · `Advanced level` · `All levels` | Four values, each with the word "level" |
| Level provenance | `Community Generated` | **A named provenance state for a metadata field** |
| `Students` | `31,088` | Enrolment |
| `Projects` | `483` | **Completed-project count as a first-class metric** |
| Teacher badge | `Top Teacher` | The only teacher badge observed |
| `Level:` | `All Levels` | Repeated lower on the page, **capitalised differently** |
| Lesson list | `Lessons in This Class`, numbered `1.`–`16.` with `mm:ss` | |
| Playback | `0.5x` · `0.75x` · `1x (Normal)` · `1.25x` · `1.5x` · `1.75x` · `2x` | `1x (Normal)` — the default is labelled, not just selected |

**The `Community Generated` disclosure is the standout quality-signalling artefact on this platform** `[observed]`:

> `Community Generated`
> "The level is determined by a majority opinion of students who have reviewed this class. The teacher's recommendation is shown until at least 5 student responses are collected."

Two sentences that do four things: they name the field's **source** (students, not the teacher), its **method** (majority opinion), its **fallback** (the teacher's own recommendation), and its **threshold** (5 responses). A buyer reading `All levels` on a class with four reviews now knows they are reading the seller's claim; at five, they are reading the crowd's. Compare Udemy, where level is unstructured instructor prose with no provenance at all, and FutureLearn, where `Introductory level` is set by the partner institution with no provenance statement. **Skillshare is the only one of the three that tells you where the difficulty rating came from and when it changes hands.**

The `483 Projects` counter beside `31,088 Students` is the other one worth stealing. It publishes a **completion-and-output ratio** — roughly 1.5% of enrolled students posted a project — which is an uncomfortable number to display and a genuinely informative one: it tells a prospective student how alive the Project Gallery will be, which is the thing the pedagogy depends on.

**Documented states** `[documented]`: `How do I mark a class as completed?` (self-declared completion, as on FutureLearn); `Where can I find my class draft?` and `Why are my videos taking a long time to process?` (teacher-side upload states); `Why do I see an upload error on my video?`; `strikes recorded to your Skillshare account` (moderation state, see T10).

## T7 Error, failure & recovery

**Observed degradation string** `[observed]`, at the very top of the class page:

> `Warning: Skillshare uses Javascript for some of its core functionality. It is highly recommended that you turn on Javascript in your preferences and reload the page.`

Opens with the literal word `Warning:`, which is unusual and slightly harsh, but the rest is well built: it says what breaks ("some of its core functionality" — scoped, not "the site won't work"), gives the remedy, and gives the second half of the remedy people forget ("and reload the page"). Compare FutureLearn's cookie-gated review state, which asks for a privacy concession; Skillshare asks for a technical one and explains the scope.

**Recovery articles, all first-person or `Why` shaped** `[observed]`, from `Technical Troubleshooting` and `Managing Your Account`:

`Why can't I log in to my account?` · `Why can't I reset my password?` · `Why aren't my videos playing?` · `Why are my videos blurry?` · `Browser and mobile app requirements` ·
`I Received a Suspicious Email — Is It From Skillshare?` ·
`Scam Alert: Fake Skillshare Influencer and Sponsorship Emails` ·
`Unexpected charges from Skillshare`

Three of these deserve attention. **`Why are my videos blurry?`** is a *quality* complaint rather than a failure — the video plays, it just looks wrong — and shipping a help article for a degraded-but-working state is the kind of specificity the Wise exemplar praises. **`Unexpected charges from Skillshare`** names the user's suspicion in the title, on a product whose main commercial risk is surprise renewal; the honest title is worth more than a dozen reassurance paragraphs. And **`I Received a Suspicious Email — Is It From Skillshare?`** is written as the question in the user's head, with an em-dash, ending in the question they actually need answered — not "Identifying phishing emails".

`Scam Alert: Fake Skillshare Influencer and Sponsorship Emails` names the *specific* scam pattern targeting this platform's users (creators being offered fake sponsorships), which is the Wise "named-issuer decline article" pattern applied to fraud. The `Scam Alert:` prefix is a live-threat marker in an evergreen help centre.

**Failure routing in the Community Guidelines** `[observed]` — the guidelines contain their own anti-misrouting instruction:

> "community spaces are not the place to dispute transactions, provide site-related feedback, or report technical issues. Instead, contact our Support team at help@skillshare.com or teach@skillshare.com for assistance, and we'll help you out right away."

Naming the three things people wrongly post in class discussions, then giving two role-specific mailboxes, inside the behaviour policy, is a smart place to put routing copy — it reaches the person at the moment they are about to complain in the wrong channel.

## T8 Empty states

**Observed — the signed-out class-page paywall, functioning as an empty state** `[observed]`

> `Watch this class and thousands more`
> "Get unlimited access to every class"
> "Taught by industry leaders & working professionals"
> "Topics include illustration, design, photography, and more"

Rendered twice in DOM. This is where the content the user came for is absent, and instead of "Sign in to continue" Skillshare writes a four-line value proposition. The headline does the important work: **`and thousands more`** reframes the blocked item as the entry point to a library, converting a denial into a scale claim. Note it does not say "Start your free trial" in the block itself — the trial promise lives elsewhere, so the paywall is selling the library, not the discount.

**Documented — help search and account states** `[documented]` / `[absent]`: the `Project Gallery` on a new class must have a zero state, and the article's advice ("We highly recommend that you complete an example project… and upload it to your class's Project Gallery") is effectively **empty-state prevention as editorial policy** — the teacher is told to seed the gallery so no student arrives at an empty one. That is a content-design solution to an empty-state problem, and it is better than a well-written empty state.

All other empty states are behind auth. `[absent]`

## T9 Notifications & system messages

**Auto-renewal notice, global footer, every page** `[observed]`

> "All memberships will be billed automatically on a recurring basis until canceled. If eligible for a free trial, cancel before the trial ends to avoid being charged. Offer only valid for new paid subscribers. See full terms of service `here`."

Four sentences in strict order: the recurring charge, the action required to avoid it, the eligibility bound, the link. `until canceled` rather than "unless you cancel" puts the default state in front. `If eligible for a free trial` is doing quiet work — it signals that not every visitor gets one, before they find out at checkout.

**Renewal reminder, documented as a commitment** `[observed]`, in the subscriptions article:

> "Before an annual renewal, you'll receive a `renewal reminder email` so you can decide whether to continue your subscription."

The purpose clause — "so you can decide whether to continue" — is the transferable part. It tells the user what the email is *for*, which pre-authorises them to act on it rather than ignore it. On a product whose top support complaint is `Unexpected charges from Skillshare`, promising a pre-renewal email in the refund article is the right placement.

**Documented notification model** `[documented]`: `What information will I receive about my membership?` exists as its own article — the notification *model* documented as a user-facing question, the same good practice the Wise exemplar records. Also `How do I post a discussion in my class or to my followers?` (teacher broadcast), `A New Way to Stay Connected on Skillshare` (teacher announcement).

**Teacher announcements as a public changelog** `[observed]`: the `Teacher Announcements` section (23 articles) is a dated, public record of platform changes aimed at suppliers — `Update to Skillshare Teacher Earnings` · `Skillshare Teacher Earnings Update (Effective January 1, 2026)` · `Coming Soon! Creator Hub: Your New Home for Managing Content on Skillshare` · `Skillshare Explores AI Partnerships to Expand Teacher Revenue Opportunities (February 2025)` · `Teacher News Archive`. Publishing earnings-model changes with effective dates in the help centre, where students can also read them, is unusually exposed. `Skillshare Explores AI Partnerships to Expand Teacher Revenue Opportunities` is a euphemistic title for licensing teachers' content to AI training — worth flagging as a case where the headline's framing ("Expand … Revenue Opportunities") leads with the benefit to the party being asked to give something up.

## T10 Disclosures, legal & compliance

**Refund rules keyed to trial length — the distinctive mechanic** `[observed]`

> - **`Free trial (7 days):`** "Contact Support within 48 hours of the charge to receive a one-time refund, as long as you haven't used Skillshare since"
> - **`Longer trials (14 days or more):`** "Refunds are not available"
> - **`Renewals:`** "Refunds are not provided for subscription renewals"

Three rules, three sentences, one table. The logic is coherent once you see it: **the longer the trial you were given, the less refund you get afterwards**, because a 14-day trial has already given you the evaluation window a refund would provide. Stating that as three flat lines rather than explaining the reasoning is a missed opportunity — the rule looks arbitrary until you work it out, and one clause ("because a longer trial already gives you time to decide") would fix it.

The 7-day case carries three conjunctive conditions in one sentence: within 48 hours **and** one-time **and** no use since. `as long as you haven't used Skillshare since` is the behavioural condition, same family as FutureLearn's "you have not completed any tests" and Udemy's "a notable amount of the course has been consumed" — all three platforms gate refunds on consumption, and Skillshare's is the shortest statement of it.

**`Things to know` — a four-line plain-language summary after the detail** `[observed]`

> - "Your subscription renews automatically unless canceled."
> - "You can cancel anytime before your next billing date."
> - "Refund eligibility is time-based and limited."
> - "If your access is provided through Skillshare for Teams, your billing and subscription may be managed differently."

A **summary block placed after the mechanics rather than before them**, with one line per thing that could go wrong. `Refund eligibility is time-based and limited` is the honest one-line gist of the three rules above — the platform is willing to say "limited" about its own generosity. The fourth line pre-empts the wrong mental model for a whole user segment.

**Cancellation is documented per surface, including the awkward one** `[observed]`

> **On desktop:** `Account Settings` → `Membership & Payments` → `Cancel membership`
> **On the mobile app (iOS & Android):** "Open your browser (not the app). Go to your account settings. Cancel your subscription from `Membership & Payments`."
> "Your access will continue until the end of your current billing period."

"Open your browser (**not the app**)" with the parenthetical negation is exactly right — it pre-empts the user's default assumption at the first step, in three words. A separate article covers the harder case (`How do I cancel my Skillshare membership if I signed up through the app?`), i.e. store-billed subscriptions. And the access-continues sentence answers the question that stops people cancelling.

**Community Guidelines — three-part structure** `[observed]`

`Overview` → `What We Encourage as a Community` → `Prohibited Content and Activities`

**The encourage-before-prohibit ordering is the structural decision**, and the encouraged list is short and specific rather than platitudinous:

> - "Share meaningful, non-repetitive content."
> - "Keep criticism constructive and respectful."
> - "Stay on topic in discussions."
> - "Direct questions about payments, feedback, or technical issues to our support teams…"
> - **"Focus on engaging with others' work rather than promoting your own classes."**

That last one is the platform's actual community failure mode named as a positive instruction. On a product where teachers and students share the same comment spaces, self-promotion in someone else's project gallery is the thing that kills the loop, and it is addressed as an encouragement rather than as a prohibition.

**Overview caveats worth quoting** `[observed]`:

> "There's a real person behind each Skillshare profile and support email."

Nine words, placed in the scope-setting section, doing the work that "be respectful" usually fails to do. It also covers *support email*, extending the rule to how users treat staff — a scope most community guidelines omit.

> "Failure to follow these Guidelines may result in strikes recorded to your Skillshare account, removal of content, or account deletion."

A named, escalating enforcement ladder with `strikes` as the unit. Then the honest limit:

> "This is a non-exhaustive list. Content not explicitly mentioned in our Guidelines does not indicate that it is allowed on the platform, nor does reporting a violation guarantee its removal, only that it will be reviewed for policy violations by our team."

**Two promises declined in one sentence**: unlisted ≠ allowed, and reporting ≠ removal. Setting the ceiling on what a report achieves ("only that it will be reviewed") prevents the commonest trust-and-safety disappointment. Most platforms imply the opposite.

**Self-harm escalation, stated as a sequence of actions** `[observed]`:

> "When we receive reports that someone is threatening suicide or self-harm, we may take a number of steps to help, including providing the at-risk person with contact information for trained crisis counselors. We will contact emergency services if we identify someone is at immediate risk of harming themselves."

Two sentences, two escalation tiers, and the second is an unhedged commitment ("We **will** contact emergency services") with a stated trigger ("immediate risk"). The first is hedged ("may take a number of steps") and honest about it. Getting the modal verbs right in that order — may for the discretionary tier, will for the emergency tier — is the whole craft of this paragraph.

**Prohibited-content list — marketplace-integrity items, not just conduct items** `[observed]`. Alongside the expected harassment, hate-speech, explicit-content and doxxing clauses, five clauses police the *economics*:

- "Downloading classes from Skillshare and posting them elsewhere."
- "Uploading content that you did not create, including Master Resale Rights and purchased content."
- "Uploading content that promotes dubious business schemes or **promises a specific outcome to students**."
- "Impersonating a teacher on Skillshare or from another platform."
- "Engaging in fraudulent or misleading referral or class review activity, including but not limited to using multiple identities… or attempting to 'game' the trending algorithm."
- "Manipulating metrics surrounding engagement (manipulating or faking referrals or minutes watched)."

`promises a specific outcome to students` is a **content rule that bans over-promising**, which is a direct constraint on the exact claim-inflation an open catalogue produces. `Master Resale Rights` is named specifically — a known reseller-content scam pattern, named by its own jargon. `attempting to "game" the trending algorithm` puts the platform's own ranking system inside the conduct policy, and `minutes watched` names the metric teachers are paid on. Since Skillshare pays teachers by watch time, that clause is simultaneously a community rule and a fraud control, and the guidelines are the only public place the payout metric surfaces to students.

**Teacher-side compliance surface** `[observed]`, from `Teaching Policies` (11 articles): `Class and Content Guidelines` · `Class Moderation` · `Teacher Payment Policy` · **`Identity Verification`** · `Adobe Trademark Guidelines for Classes on Adobe Products` · `Intellectual Property Guidelines for Skillshare Teachers`. `Identity Verification` is required of teachers; there is **no background-check article** of the Outschool kind, which is the right difference for an adult-only platform and is worth recording as an explicit contrast. The Adobe-specific trademark article is Wise-level specificity — a named third party's brand rules given their own help page because that is where the volume is.

**Other legal furniture** `[observed]`: `Legal Terms and Policies for Students` and `Legal Terms and Policies for Teachers` as two parallel single-article sections, so the two sides get separate legal indexes; `Content Notification Processes` filed under `Contact Us` (the takedown route, placed with contact rather than with legal); `Reporting a Violation` linked from the foot of the Community Guidelines; `What is the refund policy for 1-on-1 Sessions and digital products?` and `What if I need to cancel or reschedule my upcoming 1-on-1 session?` as separate refund regimes for the marketplace products.

**Pricing disclosure** `[observed]`: `$13.99` `/month` with "Annual payment of $167.88 USD" beneath. A monthly-equivalent headline with the actual charge underneath and the currency spelled out. Only one plan is shown — no monthly option is offered on the pricing page, and the homepage FAQ confirms it ("After your trial ends, your annual Skillshare membership begins. You'll be billed for the year in full"). **Showing a `/month` figure for a product that only bills annually is the standard-and-contested pattern**; Skillshare mitigates it by putting the annual total directly below, but the headline number is still the one that anchors.

## T11 Help-centre architecture

Three levels: **audience tab** → section → article. Thirty-one sections across three audiences, with the teacher tab organised as a production pipeline (see T1).

**Article-title grammar — five shapes, cleanly split by audience:**

| Shape | Audience | Example |
|---|---|---|
| `How do I …?` | Student | `How do I cancel my Skillshare subscription?`, `How do I find a class to take?` |
| `What is / What does …?` | Student | `What does Skillshare cost?`, `What is the Skillshare Shop?` |
| `Why can't I …?` | Student | `Why can't I log in to my account?`, `Why aren't my videos playing?` |
| **Verb-first imperative** | **Teacher** | `Craft Your Class Project`, `Give Your Class a Title`, `Set Up Your Space`, `Teach With Confidence`, `Film Your Class`, `Edit Your Class`, `Prepare to Film`, `Facilitate Discussions`, `Give Feedback on Student Projects`, `Earn From Your Teaching`, `Build Your Skillshare Channel` |
| `<Noun> FAQ` / bare noun | Both | `Gift Memberships FAQ`, `Class Moderation`, `Identity Verification` |

**This audience-by-grammar split is the cleanest IA finding in this batch.** Students get questions; teachers get commands. A student's relationship with the help centre is interrogative (something is wrong, or something is unclear); a teacher's is procedural (there is work to do next). Two of the teacher imperatives are about *the teacher's own state* rather than about a task — `Teach With Confidence` and `Set Up Your Space` — so the instructional voice extends to coaching, not just steps.

**Routing furniture** `[observed]`: `Back to Skillshare` top-left, five languages, audience tabs, then sections. `Contact Us` is a *section* (not a footer link) containing `How can I get in touch with Skillshare?` and `Content Notification Processes`. The three persistent footer promos (T1) appear on every page including deep articles.

**Notable single-article sections** `[observed]`: `Legal` (1), `Announcements` (1), `Reporting` (1), `Corporate Gift Cards` (1), `Billing` (1). Skillshare will create a section to hold one document rather than file it elsewhere — verbose, but it makes the taxonomy legible.

## T12 FAQs

**Marketing FAQ — five questions, identical on the homepage and the pricing page** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What is Skillshare? |
| 2 | What is included in my Skillshare membership? |
| 3 | What can I learn from Skillshare? |
| 4 | What happens after my trial is over? |
| 5 | Can I teach on Skillshare? |

**Structural notes.** Five is short — this is a confidence-signalling FAQ, not a demand-absorbing one. The order is definition → entitlement → scope → **the money question** → supply-side recruitment. Q4 is the only one with a commercial consequence and it is answered without hedging: after the trial, the annual membership begins, billed for the year in full. Putting the full-year charge in the FAQ answer rather than only in the footnote is the honest placement, though the answer wraps it in a benefit clause ("so you can enjoy continuous access… year-round") that softens a fact the reader might rather have flat.

Q5 (`Can I teach on Skillshare?`) is the fifth and final question on a *buyer's* page, and its answer defines the teacher population: "everyday creatives and professionals who want to share their passion, and the skills and experience they've gained". **`everyday creatives` is the platform telling a prospective student that their teacher is not necessarily a professional educator** — placed in the FAQ, where it will be read by people already halfway to subscribing. That is the open-catalogue disclosure, and it is in the right place.

Q3's answer lists the catalogue by category and closes "If it's something creative, you can learn it on Skillshare." — a scope claim narrow enough to be defensible.

**Help-centre FAQ convention** `[observed]`: `Gift Memberships FAQ`, `Corporate Gift Cards FAQ`, `New Teacher FAQ` — `<Noun> FAQ` as a suffix, used sparingly (three instances) compared with Udemy's dozen-plus.

## T13 Terminology & glossary

| Term | Skillshare's usage | The alternative it rejected |
|---|---|---|
| `class` | The unit of content, always — never "course" | **"course"** (used by both Udemy and FutureLearn) |
| `lesson` | The atomic unit inside a class; `Lessons in This Class` | "lecture", "step" |
| `Hands-on Class Project` | The class's required output, named as a page section | "assignment", "exercise", "capstone" |
| `Project Gallery` | Where students post their work | "submissions", "showcase" |
| `Resource` | A teacher-attached template or worksheet | "materials", "downloads" |
| `Learning Paths` | Curated multi-class sequences | "specialisation", "track" |
| `member` / `membership` | The subscriber and the subscription | "subscriber", "plan", "student" |
| `students` | The same person on a class page (`31,088 Students`) | **inconsistent with `member`** |
| `teacher` | The instructor, throughout | "instructor", "educator", "creator" |
| `Top Teacher` | The teacher badge | "verified", "featured" |
| `Rising Teacher` | A second teacher tier, visible only in challenge-programme titles | |
| `creatives` / `everyday creatives` | The audience noun | "learners", "professionals" |
| `Creative Feed` | The social surface | "community", "activity" |
| `Creator Hub` | The teacher content-management tool (2025+) | "studio", "dashboard" |
| `1-on-1 Session` | Paid live tuition, bookable | "tutoring", "coaching" |
| `Digital Products` | Teacher-sold downloads | "assets", "store items" |
| `Skillshare Shop` | The marketplace holding the two above | |
| `strikes` | The moderation-enforcement unit | "warnings", "violations" |
| `Community Generated` | Provenance label on the level field | "student-rated", "crowdsourced" |
| `minutes watched` | The engagement metric, surfaced in the Community Guidelines | |
| `Master Resale Rights` | Named content-fraud pattern | |
| `the pulse of Skillshare` | Internal phrase for the teacher/student community; appears in help furniture and in the guidelines | |
| `Level up` | Pricing-page verb | "advance", "progress" |

**The `class` decision is the most consequential single word on this platform.** A *course* implies a syllabus, a duration and a completion; a *class* implies a session you attend, with a teacher in the room. Skillshare holds `class` across marketing, help, policy and the class page itself without a single lapse into "course" — except in one place: the observed class description (teacher-authored) says "This first **course** includes 8 in-depth lessons" and "The **courses** in The Drawing Laboratory are:". **The platform's lexicon is perfectly disciplined; the teacher-authored field is not**, which is the same open-catalogue voice leakage recorded for Udemy in file 137.

`member` vs `students` is the one genuine platform-side inconsistency: the commercial relationship is a *membership* and the pedagogical one is *students*, and both words describe the same person on adjacent pages.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the student, second-person imperative for the teacher, first person plural for the company ("we encourage you to", "We don't allow any of the following", "we'll help you out right away"). The **imperative mood aimed at teachers** is the distinguishing feature: `Craft Your Class Project`, `Teach With Confidence`, `Set Up Your Space`. Skillshare speaks to its supply side as a coach speaks to a performer.

**Register.** Warm, American, creative-professional. More colloquial than FutureLearn and much more than Udemy's platform copy: `find your people`, `share some love`, `Level up`, `Beginner to pro`, `zero ads, ever`, `top-notch project`, `a wall of text can be intimidating`. Exclamation marks appear but are rationed — `Yes!` opening the teaching FAQ answer, `Coming Soon!` in a teacher announcement, `A numbered list can help!`. The Community Guidelines and the refund rules carry none, so the same tone-flattens-as-stakes-rise gradient holds.

Reading level: adult-general, short paragraphs, heavy use of bolded sub-heads and bulleted lists in help. The teacher-facing articles are the best-written content on the platform.

**Numbers as trust devices** `[observed]`: `425k+`, `30k+`, `9k+`, `4.8`, `11 million+`, `9,000+ teachers`, `31,088 Students`, `483 Projects`, `$13.99`, `$167.88`, `48 hours`, `7 days`, `14 days or more`, `at least 5 student responses`. Mixed rounding (`425k+` vs `31,088`) and, as flagged in T2, two irreconcilable community-size figures.

### The project-brief spec — this file's central artefact

`[observed]`, from `Craft Your Class Project`. The whole article is a content-design brief for a content-design problem, and it is the reason this product is in the corpus.

**It opens with a platform rule, not advice:**

> "All classes on Skillshare must have a project component. Projects help students practice new skills as they learn and provide a great opportunity for sharing and feedback."

A mandate plus its two justifications, in twenty-six words. Everything after this is guidance, and it inherits authority from the mandate.

**Four criteria for a project idea, each an adjective-phrase heading plus a rationale** `[observed]`:

| Criterion (verbatim) | What the rationale adds |
|---|---|
| `Be easy to start.` | Explicitly permits complex projects, then tells you the mitigation: break it into stages, encourage sharing along the way so students get feedback before finishing |
| `Be relevant.` | One clause — projects connect to the class topic |
| `Promote independence and creative thinking.` | **"not simply be step-by-step instructions for how to make a specific thing"** — the anti-pattern named |
| `Encourage engagement.` | A project "should be shareable"; teachers are told to leave feedback regularly to incentivise it |

The third criterion is the pedagogically serious one, and its wording is the quotable line: a project must not be *step-by-step instructions for how to make a specific thing*. That single clause separates a **project brief** from a **tutorial**, which is the distinction most creative-learning content fails to make. The rationale continues that lessons should build a foundation of skills so students can "apply and experiment with them in their own ways and make their final projects their own" — outcome ownership as the design goal.

**Four rules for writing the brief, ordered by the reader's path through it** `[observed]`:

1. **`Summarize the Project in Your First Sentence`** — because only the first sentence renders before `Read More` (see T5). Two jobs given to that sentence: "clearly explain the project" **and** "pique your students' interest".
2. **`Clarify the Steps`** — "Outline the steps students will take to complete the project. A numbered list can help!"
3. **`Maximize Readability`** — "A wall of text can be intimidating." Then the remedies: short paragraphs, bulleted or numbered lists, bold or italic "where appropriate", inline images, and a routing rule (extra attachments belong in a `Resource`, not in the body).
4. **`Define the Final Deliverable`** — "Ensure students understand what you're asking them to upload to the Project Gallery."

Read as a spec, this is: **truncation-aware opening → procedure → formatting → output definition.** Rule 4 is the one most briefs omit, and it is phrased in terms of the *destination* (what you upload to the gallery) rather than the artefact, which is the right frame because the gallery is what makes the project social.

**And then the strongest recommendation in the article** `[observed]`:

> "We highly recommend that you complete an example project based on the instructions you've provided and upload it to your class's Project Gallery."

With two reasons: students get an example to aim at, **and** the teacher is modelling the act of sharing. The phrase "based on the instructions you've provided" is quietly doing quality assurance — a teacher who follows their own brief discovers whether it is followable. This is the single most transferable line for anyone who writes task instructions.

**Four worked examples, each labelled with the *technique* it demonstrates** `[observed]`, paraphrased: one summarises the project at the very top so students can start fast, and adds a materials list and a downloadable PDF; one walks students through four reflection exercises with a printable workbook; one asks for a 1–3 minute video and — because the platform cannot host video uploads — tells students to post a YouTube or Vimeo link; one uses a **"multi-day challenge"** format where each lesson is one short project and students are invited to upload some or all, with a note that they will need to *update* their single project entry over time to share more than one piece.

The third and fourth examples are the useful ones for a content designer: the third shows the brief absorbing a **platform limitation** (no video upload) as an instruction rather than leaving the student to hit the wall; the fourth shows the brief absorbing a **data-model limitation** (one project per student per class) the same way. Both are cases where the honest brief is the one that documents the product's constraint.

**Accessibility content** `[observed]`

- **Playback speed options are fully enumerated with the default named**: `0.5x` · `0.75x` · `1x (Normal)` · `1.25x` · `1.5x` · `1.75x` · `2x`. Labelling the default `1x (Normal)` rather than leaving `1x` unannotated is the small correct choice.
- `Browser and mobile app requirements` published as a help article; `Why are my videos blurry?` addresses a perceptual-quality complaint.
- `How do I download videos for offline viewing?` — offline access documented, which is an accessibility affordance as much as a convenience one.
- Subtitles and transcripts are named in the subscription article as included features ("`offline viewing`, `subtitles`, transcripts"), and a separate help article covers subtitles — so caption availability is a documented entitlement.
- Class-page images carry short functional alt (`teacher avatar`, `Teacher Profile Image`, `Skillshare for Teams`); category-carousel images carry the category name as alt inside links that already announce it — **duplicate announcement, and the whole carousel is duplicated in DOM**, so a screen-reader user may traverse twenty category links where ten exist.
- Many homepage and pricing images are Builder.io CDN assets with **empty or absent alt**, including the images carrying the `Stay Inspired` / `Stay Connected` / `Keep Creating` block and several proof units. Where the image is decorative this is correct; where it is the only rendering of a logo wall ("Loved by creatives at" followed by a single alt-less image) the content is **inaccessible**. Flagged.
- **No `Skip to content` link was observed** on the marketplace pages (the help centre is Zendesk and has its own). Flagged as a gap versus both FutureLearn and Udemy.
- The `Warning: Skillshare uses Javascript…` string is a genuine no-JS fallback, which is itself a progressive-enhancement positive.
- **No published accessibility statement was found** on any harvested surface — no footer link, no help article. `[absent]`, and a notable omission given both comparators in this batch publish one.

**Negative findings, recorded honestly**

- **`425k+ Members` (homepage) vs `11 million+ creative people` (pricing page)** — 26× discrepancy, unexplained, within one funnel.
- `Learn More` vs `See Plans` for the same Teams destination.
- `Level: All Levels` vs the chip `All levels` — casing inconsistent on one page.
- `member` vs `students` for the same person.
- Teacher-authored class description says "course" on a platform that says "class" everywhere else.
- Category carousel and the signed-out paywall block are each duplicated in DOM.
- No skip link, no accessibility statement observed.
- Several content-bearing images with empty alt.
- The three refund rules are stated without the reasoning that makes them coherent.
- `Skillshare Explores AI Partnerships to Expand Teacher Revenue Opportunities` — benefit-led framing on an announcement about licensing teachers' work.
- `$13.99 /month` headline for an annually-billed product; the annual total is disclosed directly beneath, but the anchor is the monthly figure.
- Two named-but-undefined teacher tiers (`Top Teacher` on the class page, `Rising Teacher` only in challenge titles) with **no published criteria article** — the opposite of Udemy's Instructor Partner disclosure.

---

## Transferable patterns

1. **Tell the author how much of their field will render.** "The first sentence of the project description is always visible… but students must click 'Read More' to see the rest." Any guidance for a truncated field should state the truncation point and the control's label, not a character count. Transfers to every CMS help text, listing form and profile bio in existence.
2. **Name the anti-pattern in the criterion.** "not simply be step-by-step instructions for how to make a specific thing." A rule that says what good looks like is half a rule; the half that changes behaviour is the one that names the tempting wrong answer.
3. **Make the author do the task they are setting.** "complete an example project based on the instructions you've provided and upload it." Self-testing as editorial policy, with a second benefit (seeding the empty state) folded in. Applies to anyone writing forms, checklists or onboarding tasks.
4. **Label the provenance of a metadata field, with its threshold.** `Community Generated` + "The teacher's recommendation is shown until at least 5 student responses are collected." Any field that switches source as data accumulates should say so, and say when. Directly applicable to ratings, risk scores, estimated delivery and any "typical" figure.
5. **Publish the output count beside the enrolment count.** `31,088 Students` / `483 Projects`. An uncomfortable ratio that tells the buyer something the enrolment number cannot. Condition: only ship this if the pedagogy depends on the output, otherwise it reads as a failure metric.
6. **Order a behaviour policy encourage-before-prohibit, and put your real failure mode in the encourage list.** "Focus on engaging with others' work rather than promoting your own classes." Positive framing of the specific thing that breaks your community.
7. **Decline two promises explicitly.** "Content not explicitly mentioned… does not indicate that it is allowed… nor does reporting a violation guarantee its removal, only that it will be reviewed." Setting the ceiling on what a report achieves prevents the commonest trust-and-safety disappointment.
8. **Get the modal verbs right in an escalation ladder.** "we **may** take a number of steps" for the discretionary tier; "We **will** contact emergency services" for the emergency tier. Hedge where you are discretionary, commit where you are not, and never blur the two.
9. **Negate the wrong default in the first step.** "Open your browser (not the app)." Three words, placed at step one, ahead of the mistake.
10. **Let the brief absorb the platform's limitation.** The travel-montage example instructs students to post a YouTube link *because* Skillshare cannot host video uploads. Documenting your constraint inside the task instruction beats letting the user discover it at submission.

## Caveats & gaps

- **Primary acquisition CTAs and the whole signed-out header are client-rendered and unobserved.** No `Start free trial`, `Join`, or class-page enrol label was retrieved. `[absent]` throughout rather than assumed.
- **Class reviews not retrieved.** `Load More Reviews` was observed; no review text, rating figure, or review-prompt copy. The help articles `What type of information can I provide in my class review?` and `How do I leave a class review?` were not opened, so the review-submission guidance — likely the second-richest quality-signalling artefact after `Community Generated` — is unharvested.
- **The dedicated refund article (`204536798`) was not opened.** Refund terms here come from the consolidated subscriptions article, which cross-references it. `What is the refund policy for 1-on-1 Sessions and digital products?` also unread.
- **Only one class page harvested**, and its project brief is short and atypical (a per-lesson practice instruction rather than a single deliverable). The four exemplary briefs the help article points to were not fetched, so the *observed* brief is weaker than the *documented* spec — a richer harvest would fetch those four classes and compare brief against spec.
- **All in-product copy is documented, not observed**: the class player, Project Gallery submission flow, project-comment threads, `Creative Feed`, `Creator Hub`, certificates and badges.
- Teacher-facing articles were sampled (`Craft Your Class Project` only in full). `Write Your Class Description`, `Give Your Class a Title`, `Experiment with Class Formats` and `Add a Class Resource` are almost certainly of equal value for this benchmark and are unread.
- `Class and Content Guidelines` and `Class Moderation` unread — the two documents that would show how a subscription platform polices catalogue quality without Udemy-style badges.
- **No accessibility statement found.** Recorded as absent, not as unreachable; it may exist off the harvested paths.
- Skillshare for Teams, gift memberships, and the Shop (1-on-1 Sessions, digital products) are named but unharvested; each has its own refund regime.
- Mobile app and email copy out of the public web surface. The `renewal reminder email` is promised but its content is not public.

## Sources

1. https://www.skillshare.com/
2. https://www.skillshare.com/pricing
3. https://www.skillshare.com/en/classes/how-to-draw-a-beginners-guide-part-1-of-the-drawing-laboratory/1607370408
4. https://help.skillshare.com/hc/en-us
5. https://help.skillshare.com/hc/en-us/articles/4416715720077-Craft-Your-Class-Project
6. https://help.skillshare.com/hc/en-us/articles/204536438-Community-Guidelines
7. https://help.skillshare.com/hc/en-us/articles/4402806767117-How-do-Skillshare-subscriptions-pricing-and-refunds-work
8. https://help.skillshare.com/hc/en-us/articles/205208147-How-does-Skillshare-work
