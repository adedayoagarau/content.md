# 129. Babbel

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Subscription language learning / CEFR-aligned self-study courses with AI speaking practice (14 languages; consumer + B2B via Babbel for Business) |
| Primary URL | https://www.babbel.com/ |
| Corpus rank | 129 |
| Benchmark strength (source list) | Lesson guidance and correction |
| Locale / market observed | en-US (`meta-country-code-alpha2: US`, "Display language: American English"); en-GB and eight further help-centre locales exist and diverge in places |
| Platform observed | Web (desktop) marketing, Zendesk help centre, legal pages, SEO learning-hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR (Babbel GmbH, Berlin; `Imprint` in footer — German *Impressum* obligation); CCPA/CPRA ("Do Not Sell or Share My Personal Information"); separate `Mobile Terms`; published accessibility statement claiming WCAG 2.0 AA target |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Partial — `my.babbel.com/en/prices` (the actual pricing page) is behind the onboarding funnel and was not fetched, so **no price is recorded**; all in-lesson correction copy is `[documented]` only |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.babbel.com/ | Hero language-picker, three benefit blocks, Babbel Method block, 7-question FAQ, footer IA |
| The Babbel Method | https://www.babbel.com/the-babbel-method | Pedagogy, CEFR/fluency definition, lesson anatomy, 6-question FAQ |
| How Babbel Works | https://www.babbel.com/how-babbel-works | 5-step flow, 5-step getting-started, skills breakdown, 11-question FAQ |
| Learn Spanish (SEO hub) | https://www.babbel.com/learn-spanish | **The CEFR level-naming artefact** — five named tiers used as content taxonomy |
| Accessibility Statement | https://www.babbel.com/legal/accessibility | Full statement; short |
| Help centre index | https://support.babbel.com/hc/en-us | 4 categories + `Contact us`, popular-article rail |
| Help: Subscription and payments | https://support.babbel.com/hc/en-us/categories/200333238-Subscription-and-payments | 5 sections, 18 articles |
| Help: Learning with Babbel | https://support.babbel.com/hc/en-us/categories/19329071910290-Learning-with-Babbel | 4 sections: Learn / Practice / Progress / Learning tips and tricks |
| Placement quiz | https://support.babbel.com/hc/en-us/articles/20202703767442-Placement-quiz | **Priority T4 source** — note the title/URL mismatch |
| Babbel subscriptions | https://support.babbel.com/hc/en-us/articles/205600308-Babbel-subscriptions | Plan shapes, Lifetime, All languages |
| Canceling a subscription | https://support.babbel.com/hc/en-us/articles/205600298-Canceling-a-subscription | **Priority T10 source** |
| Pricing | https://support.babbel.com/hc/en-us/articles/19650417983378-Pricing | Monthly-equivalent disclosure |
| Timing of subscription payments | https://support.babbel.com/hc/en-us/articles/205600328-Timing-of-subscription-payments | Upfront-charge disclosure |
| Try Babbel for free | https://support.babbel.com/hc/en-us/articles/205600498-Try-Babbel-for-free | **"Why do I have to pay" — unusual artefact** |

---

## T1 Navigation & IA labels

**There is effectively no global nav** `[observed]`

The homepage header carries only: `Display language: American English`, `Sign up`, `Log in` — each rendered twice (mobile/desktop variants), so the extraction shows the pair four times. No product nav, no pricing link, no help link in the header. Same aggressive-funnel decision as Brilliant (126): the homepage is a conversion surface and all wayfinding lives in the footer.

`Display language` as the label for the interface-language switcher is precise and worth noting — it distinguishes *the language of the UI* from *the language you are learning*, which is the central ambiguity of a language-learning product. Most competitors say "Language" and create confusion. Babbel names the axis.

**Footer groupings — three, and the first is a course catalogue** `[observed]`

| Group | Items |
|---|---|
| `Courses` | `Spanish` · `French` · `German` · `Italian` · `Portuguese` · `Russian` · `Danish` · `Dutch` · `Indonesian` · `Norwegian` · `Polish` · `Swedish` · `Turkish` (13 listed; English is the 14th, unlisted) |
| `More Babbel` | `Babbel Magazine` · `Babbel Podcasts` · `Tech Blog` · `Inside Babbel` · `Affiliate Program (USA)` · `Affiliate Program (Europe)` · `Babbel as a Gift` · `Student Discount` · `Military Discount` · `Healthcare Workers Discount` · `Educators Discount` |
| `Company` | `About Us` · `The Babbel App` · `Prices` · `Press` · `Careers` · `Help / FAQ` · `Customer Service` · `Accessibility Statement` · `Mobile Terms` · `Babbel vs. Other Language Apps` |

Three observations.

1. **`Prices` and `Help / FAQ` are in `Company`, not in `Courses`.** Pricing is filed as a corporate fact rather than a product decision. `Help / FAQ` uses a slashed double-label — the only such construction in the footer.
2. **Four named discount cohorts in the footer** (`Student`, `Military`, `Healthcare Workers`, `Educators`) each with its own landing page. Promoting eligibility-based pricing to footer-level IA is a real acquisition decision, and the cohort naming is US-market-specific (`Military`, `Healthcare Workers`).
3. **`Babbel vs. Other Language Apps`** — a comparison page linked from the footer of every page. Naming the competitive-comparison artefact in the nav (rather than hiding it as a blog post) is confident. Compare `Inside Babbel` and `Tech Blog`, which are editorial/employer-brand surfaces promoted to the same level.

**A footer-link inconsistency** `[observed]`: `Prices` points to `my.babbel.com/en/prices` from the marketing footer, `home.babbel.com/en/prices` from the help-centre footer, and the help articles link variously to `my.babbel.com/prices`, `babbel.com/prices` and `babbel.com/prices` again. **Four different hostnames/paths for the pricing page** across inspected surfaces. Recorded as a defect.

**The legal-page footer is a different, longer footer** `[observed]` — the accessibility statement renders a footer with `The Babbel Method` (pointing at `/about-us`, not `/the-babbel-method`), `Babbel app`, `Babbel Magazine`, `Careers`, `Press`, `Inside Babbel`, `Tech Blog`, `Help / FAQ`, `Babbel as a Gift`. Two footer variants across one site, and one of them mislabels its link target.

**Help centre top level — four categories, each with a scope line** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Subscription and payments` | "Learn more about your Babbel subscription, your payments and how to use vouchers" |
| `Using Babbel` | "Discover how to use Babbel and find information about our app, website and different features" |
| `Account and settings` | "Find how to update or manage your account and profile settings" |
| `Learning with Babbel` | "Explore how to learn and track your progress with Babbel, and check tips and tricks on effective learning" |

Plus a fifth entry, `Contact us` / `Contact support` — "Get in touch with our support team and get the help you need."

Every scope line opens with an **imperative verb**: `Learn more` · `Discover` · `Find` · `Explore` · `Get in touch`. Five categories, five different verbs, none repeated. That is disciplined — but the verbs are generic ("discover", "explore") where Wise's scope lines are comma-runs of the *actual verbs inside* the category. Babbel's scope lines describe the act of reading the category; Wise's describe the tasks in it.

**`Learning with Babbel` vs `Using Babbel` is the meaningful split** — pedagogy and progress on one side, platform mechanics on the other. Note that both begin with a gerund + product name, so a user scanning the two labels alone cannot easily tell which holds the placement quiz. (It is `Learning with Babbel` › `Progress`.)

**Sub-sections inside `Learning with Babbel`** `[observed]` — four, and the naming is the artefact:

`Learn` · `Practice` · `Progress` · `Learning tips and tricks`

Three single-word verbs/nouns describing the learning loop, then a fourth that is a content genre rather than a product area. The first three map onto real product surfaces; `Learning tips and tricks` (7 articles) is study-skills advice that is not about Babbel at all — `Building a learning habit`, `Effective language learning`, `Supplementing language learning`, `Defining your learning goals`, `Learning two languages at once`, `Memorizing vocabulary`. A help centre carrying generic pedagogy advice alongside product documentation is unusual, and it is on-brand for a product whose differentiation claim is expertise (see T2).

**Sub-sections inside `Subscription and payments`** `[observed]`: `Subscriptions` · `Payments` · `Managing your subscription` · `Vouchers` · `Special offers`. Five sections, and `Managing your subscription` is separated from `Subscriptions` — the former holds cancellation, invoices, subscription information and changes; the latter holds availability, trial, pricing and plan shapes. A sensible split between *buying* and *administering*, though the label pair is confusable.

**Starred articles** `[observed]`: the help centre marks two articles with a `★` prefix — `★ Available languages` and `★ Canceling a subscription`. Two starred items out of 18 in the category, and one of them is cancellation. Whether editorially chosen or traffic-derived, promoting cancellation to a starred slot is candid.

**Popular-article rail** `[observed]`, six items, and it is genuinely contextual to a new subscriber: `Available languages` · `Canceling a subscription` · `Getting started` · `Using Babbel on a desktop` · `Using the Babbel app on a mobile device` · `Babbel widget`. Note `Canceling a subscription` sits second — ahead of `Getting started`.

**Breadcrumbs** `[observed]`: three levels, e.g. `Babbel Help Center` › `Learning with Babbel` › `Progress`. Article title not in the trail.

**Article foot** `[observed]`: `Was this article helpful? Yes / No` then `Articles in this section` (siblings, ~4-10 links). No "Still need help?" panel, no contact CTA at article level — escalation is via the category-level `Contact us` entry or the footer `Customer Service` mailto.

## T2 Value proposition & headline patterns

**Hero — the product asks a question instead of making a claim** `[observed]`

> `Which *language* do you want to learn?`

The H1 is a question with one word italicised, and beneath it a language picker: `Spanish (Mexico)` · `Spanish (Spain)` · `French` · `German` · `Italian` · `More`. There is no value proposition above the fold at all — the first interaction is a choice.

Two things follow from this. First, **the italic on `language` carries the whole positioning**: it signals that the variable is *which* language, not *whether* to learn one. Second, the picker's first two entries are **`Spanish (Mexico)` and `Spanish (Spain)`** — regional variants elevated above other languages entirely, which is a US-market data decision surfaced as IA. Note the codes leak into the URLs (`learn_lang=QMS` for Mexican Spanish, `SPA` for Spain) — `QMS` is an internal code, not an ISO one.

**The actual value proposition is a section header, not a hero line** `[observed]`

> `The effective way to learn a language online`

preceded by a social-proof banner: `Over 25 million subscriptions sold!` — note **`subscriptions sold`**, not "learners" or "users". Babbel counts transactions, and says so. Later, "with 25m actual subscriptions sold" (emphasis original in the sense that `actual` is Babbel's word). **`actual subscriptions sold`** is a pointed jab at competitors who count downloads or registered accounts, and it is the single most distinctive trust claim in this file. A company that inserts `actual` into its own metric is inviting the comparison.

**Three benefit blocks, each an imperative promise + mechanism + CTA** `[observed]`

| Heading | Mechanism, summarised | CTA |
|---|---|---|
| `Learn to speak a new language with confidence` | Practical skills applicable immediately; "so you can reach your goal of having real-life conversations faster" | `Start learning` |
| `Learn at your own pace` | Material "tailored to your proficiency level, interests, and time commitment"; "real-time feedback, progress trackers, and handy visualizations"; closes "It's like having a private tutor in your pocket." | `Start learning` |
| `Develop your language skills with a variety of tools` | Speech recognition, interactive dialogues, grammar tips "while reading, writing, listening, and exploring culture bites" | `Start learning` |

**`It's like having a private tutor in your pocket.`** — the same human-tutor reference class Brilliant (126) uses as its entire positioning, deployed here as a single throwaway line in block two. Note the three headings all begin with a verb in the same mood (`Learn`, `Learn`, `Develop`), so the set reads as a graded promise: speak → pace → breadth.

`culture bites` is a coined content-unit name appearing once, unglossed. See T13.

**`The Proven Babbel Method` — the named methodology, and the naming is the asset** `[observed]`

> Section header: `The Proven Babbel Method`
> Body: "Learn a new language, fast. Our award-winning app uses the Babbel Method to help you speak confidently."

Three proof pillars, each a heading + one-line substantiation:

| Heading | Substantiation (verbatim) |
|---|---|
| `Learn Fast. Talk Sooner.` | "Quickly become conversation-ready with diverse learning tools to suit all learning styles." |
| `Backed by Proven Results` | "92% of users improved their proficiency level in just 2 months*, with 25m actual subscriptions sold." |
| `Designed by Language Experts` | "Courses created by 200+ language experts for high-quality learning." |

**`Learn Fast. Talk Sooner.`** is the strongest headline construction on the site: two two-word sentences, full-stopped, with a comparative in the second (`Sooner` — sooner than what is left open). And `conversation-ready` is a coined compound doing real work — it names a *threshold* rather than a level, which is exactly the move a product that cannot promise fluency needs (see T4, T13).

**The claim is footnoted, and the footnote is a citation** `[observed]`:

> "\*Vesselinov, R. and Grego, J. The Babbel Efficacy Study. New York 2016."
> "\*\*Interviews conducted in USA"

An academic citation as a marketing footnote — author, title, place, year. And the review claim (`Millions of 5-star reviews.**`) carries its own asterisk disclosing the sample geography. Two claims, two differently-marked footnotes, both bounded. This is the Wise "claim, then bound the claim" pattern executed with unusual rigour: a 2016 study cited in 2026 copy is old, but citing it at all (rather than saying "studies show") is the honest version.

Note the inconsistency: the homepage says `92% of users improved their proficiency level in just 2 months` while the Method page's FAQ links to three *different* studies (Yale, City University of New York, Michigan State) and makes a softer claim — "learners who use Babbel regularly improved their oral proficiency in the language they studied." Four studies across two pages, one hard percentage and one soft claim. The hard number is attached to the older, self-commissioned study.

**Expert-count claims do not agree** `[observed]`:

| Surface | Claim |
|---|---|
| Homepage | "Courses created by 200+ language experts" |
| Try Babbel for free (help) | "created by a team of over 150 experts, including linguists, teachers, instructional designers, editors, and researchers" |
| How Babbel Works | "a dedicated team of over 150 professionals, including linguists, language teachers, polyglots, instructional designers, editors, and researchers" |

`200+` on the marketing hero, `over 150` in two other places. And the role lists differ — `polyglots` appears in one, not the others. Recorded as a defect; `200+` and `150+` cannot both be the careful number.

**Section headers use italic emphasis as a house device** `[observed]`: `Which *language* do you want to learn?` · `Babbel and *beyond*` · `Which language do you want to *speak*?` — one italicised word per header, always the conceptually loaded one. `speak` italicised in the second language-picker header (on the Method page) versus `language` in the first (homepage) is a deliberate escalation: by the time you have read the pedagogy, the promise is speaking, not learning.

**Fluency is defined, and the definition is the most interesting paragraph on the site** `[observed]`

> Section header: `Can you become fluent with Babbel?`
> "We define fluency as **successful communication in real situations, not perfection.** What is needed for successful communication changes in different situations: for example, participating in an academic lecture vs. making plans with a friend. **Think of fluency on a spectrum** and something you can gradually build up in different, increasingly complex situations. **Babbel helps you build conversational confidence first, then grow into more complex language over time.**"

Babbel does not answer "can you become fluent" with yes or no. It **redefines the term**, then commits only to the first segment of its own redefinition. Three moves in one paragraph: substitute a defensible definition (`successful communication… not perfection`), make it non-binary (`a spectrum`), then scope the product's claim to the easy end (`conversational confidence first`). This is the canonical answer to how a subscription language product manages the fluency expectation, and it is better executed than any competitor line in this batch.

Followed immediately by an off-product instruction — "We also encourage you to try what you've learned outside the app. Real-life practice pushes you to recall vocabulary, clarify miscommunications, and helps you build fluency even faster. Plus, experiencing small wins of successful communication makes your progress feel real!" A product telling the user that the product alone is insufficient. `small wins` is the motivational frame.

**Competitive positioning is explicit and bulleted** `[observed]`, on the How Babbel Works FAQ:

> "Many other language apps prioritize **gamification, immersion without explanation, or single-skill practice**. Babbel's approach is designed for learners who want a guided path toward practical conversations…"
> Babbel emphasizes: "**Real-life conversations** you can actually use · **Grammar explained clearly**, in context · **Courses tailored to your native language** · **Depth over volume**, focusing on commonly spoken languages rather than dozens of niche options"

`immersion without explanation` and `Depth over volume` are precise competitor critiques without naming the competitor. `Courses tailored to your native language` is the genuinely differentiating one and it recurs three times across the corpus ("tailor courses to people who speak your native language"). `Depth over volume` reframes a 14-language catalogue (small, versus rivals' 30-40) as a virtue.

**Speed claims** `[observed]`: "Babbel will get you speaking in as little as 3 weeks", "learn a language by practicing… fast", "Learn a new language, fast." Note `in as little as` — the standard best-case hedge. And the FAQ softens it further: "Many learners report noticeable improvement in their ability to understand and speak basic conversations within a few weeks of regular use", with the conditions named ("Progress depends on your goals, starting level, and consistency"). Marketing says 3 weeks; help says "depends". The hedge is present but on a different page.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Sign up` | Header (×2 responsive) | → `my.babbel.com/en/onboarding/default` |
| `Log in` | Header (×2) | → `my.babbel.com/en/authentication` |
| `Start learning` | Homepage, ×3 (one per benefit block) | Gerund object; the house CTA |
| `Start Your Spanish Lesson Now` | Homepage, Spanish hub card | **Longest CTA on the site**; `Now` is the only urgency word |
| `Watch` | Homepage, Babbel Videos card | Single verb |
| `Read` | Homepage, Babbel Magazine card | Single verb |
| `Try a Free Lesson` | Method page hero | → `/test-babbel-for-free` |
| `Try a free lesson` | Method page, mid-page | **Same CTA, different casing, same page** |
| `Get started now` | How Babbel Works hero | |
| `Get Started Learning a Language Today` | How Babbel Works, ×3 | **Title Case, 5 words, `Today`** — a third register |
| `Start your free trial now` | Homepage FAQ, inline link | → `/test-babbel-for-free` |
| `Take our Placement Test` | Homepage FAQ, inline link | **Links to a help article, not the product** |
| `Skip to main content` | First in DOM, every page | Accessibility |
| `Print` | Accessibility statement, top | The only page-level utility control observed |
| Language names as CTAs | Homepage ×2, Method page, How-it-works page | `Spanish (Mexico)`, `French`, `German`, `Italian`, `More` — the language *is* the button |
| **Documented in-product controls** | | |
| `Cancel auto-renewal` | Account Information | Names the mechanism |
| `Profile and settings` | Profile menu | |
| `Account Information` | Settings section | |
| `Change course` | Learn tab, level dropdown | |
| `Take the placement quiz` | Learn tab, bottom | **`quiz`** |
| `Find your level` | Website, Learning plan panel | **A different label for the same action** |
| `Explore more courses` | Website, Learning plan panel | |
| `Learning plan` | Home tab | |
| `Explore` | Browser nav, course switcher | |
| `Learn` | App tab | |

**Observations.**

1. **Four registers of the same CTA.** `Start learning` (homepage, sentence case, 2 words) → `Try a Free Lesson` / `Try a free lesson` (Method page, casing inconsistent within one page) → `Get started now` (lowercase, 3 words) → `Get Started Learning a Language Today` (Title Case, 5 words). Four pages, four conventions. The Title-Cased five-word version appears three times on one page. **No CTA style guide is being enforced.**
2. **`Take our Placement Test` on the homepage FAQ links to a Zendesk help article**, not to the placement quiz itself. A conversion CTA pointed at documentation. And the label says `Placement Test` while the destination article is titled `Placement quiz` (see T13 — this is a three-way naming problem).
3. **The language name as the primary CTA** is the correct reduction for this product: the user's only real first decision is which language, and Babbel makes the answer clickable in four places.
4. **`Find your level` vs `Take the placement quiz`** — two labels for one action on two platforms (website vs app), documented in a single paragraph of one help article. See T13.
5. **`Print` on the accessibility statement** is a small but real accessibility affordance (offline/assistive reading), and it is the only such control observed.

## T4 Onboarding, level-setting and instructional scaffolding — PRIORITY

Babbel's level-setting is **CEFR-anchored but CEFR-hidden**, and the mechanism has three parts: a self-declaration at signup, an optional quiz, and a manual override. All three are documented.

### The five-step signup flow `[observed]`

From `How Babbel Works`, presented as numbered steps with imperative headings:

| # | Heading | What it does |
|---|---|---|
| 1 | `Set up your account` | Download app or web; email-based account |
| 2 | `Choose a language` | "You can switch languages at any time, so you are **never locked into just one**." |
| 3 | `Find the right starting point` | "If you are not sure where to begin, Babbel offers a short placement test. This helps match you with lessons that fit your current level, whether you are a beginner or returning to a language you have studied before." |
| 4 | `Set a weekly learning goal` | "Choose how many lessons you want to complete each week… You can adjust your goal anytime based on your schedule." |
| 5 | `Turn on speech recognition` | "Enable your device's microphone to practice speaking out loud. Babbel's speech recognition gives real-time feedback on pronunciation…" |

Three things.

- **Step 3's heading is `Find the right starting point`, not `Take the test`.** The heading names the *outcome the user wants*; the test is mentioned in the body as optional ("If you are not sure where to begin"). Same anxiety-management move as Brilliant's `lightweight diagnostic` (126), achieved through heading choice rather than adjective.
- **`whether you are a beginner or returning to a language you have studied before`** — the two user states named are *beginner* and *returner*, not beginner/intermediate/advanced. The returner (school French, twenty years ago) is the hard placement case and Babbel names them explicitly.
- **Step 4 makes the goal a commitment the user sets, and immediately says it is revisable** ("You can adjust your goal anytime"). The commitment-then-release pattern appears three times in this flow (`never locked into just one`, `adjust your goal anytime`, `switch languages at any time`).

A parallel, shorter flow appears on the same page as `Step-by-Step: How Babbel gets you speaking` — five steps, different headings: `Choose what you want to learn` · `Learn through short, practical lessons` · `Practice speaking from day one` · `Review and reinforce what you learn` · `Learn anytime, anywhere`. **Two five-step sequences on one page**, one about account setup and one about the learning loop, with no signposting that they are different things. Recorded as a structural defect.

Step 1 of that second sequence adds the goal taxonomy `[observed]`: "When you sign up, Babbel asks about your **current level and goals**. Whether you are learning for **travel, work, school, or personal enrichment**, Babbel builds a personalized learning path that matches what you need most." Four named motivations, and the justification is negative — "This ensures you are not wasting time on vocabulary or grammar that does not apply to your situation."

### The placement quiz — well-documented, and named three different ways `[documented]`

The help article is the priority artefact. Its opening line:

> "Not sure where to start? **Our placement test helps determine your learning level based on your knowledge so you can begin at the right level, making it more effective and enjoyable.**"

Then the definition:

> "Babbel's placement quiz **assesses your prior knowledge in order to guide you to the right starting point in our content.** When you register, you will be asked to take a short quiz about your learning knowledge and based on your answers, **we will recommend the best course for you to start with.**"

**The output is a recommendation, not a verdict.** `guide you to the right starting point`, `we will recommend the best course` — the quiz produces a suggestion about *content*, never a label about the *learner*. No score, no level name, no pass/fail is mentioned anywhere in the article. That is the same design position as Brilliant's diagnostic and the opposite of a proficiency test.

**Availability is bounded immediately** `[observed]`: "The placement quiz is currently available if you are learning **Spanish, French, Italian or German.**" Four of fourteen languages. Stated in the third paragraph rather than buried — and it means ten languages have no placement mechanism at all, which the copy does not say out loud.

**Where it lives is documented per platform, and the labels differ** `[documented]`:

> App: `Learn` tab → arrow next to the current unit → `Change course`; or scroll to bottom → **`Take the placement quiz`**
> Web: `Home` → `Learning plan` → `Explore more courses` (to change level) or **`Find your level`** (to check level)

So the same action is `Take the placement quiz` on mobile and `Find your level` on web. And the *purpose verbs* differ too — "change your level" vs "check your level" are presented as two different jobs with two different controls on web, collapsed into one on mobile. Documented in a single paragraph, which makes the divergence visible but not explained.

**Retakeable, with no penalty stated** `[documented]`: "You can take the quiz again anytime you want to assess your knowledge level."

**Manual override is offered, framed around the user's disagreement** `[documented]`:

> "`How can I change my level?`
> If you **feel that the level you have been placed in does not match your skills**, you can change it by going to **Explore**… and choosing a different course."

The heading is the user's question; the body opens with the user's *feeling* rather than with a rule. `does not match your skills` grants the user authority over the system's judgement — no appeal, no second test, just change it. Compare Brilliant, where jumping ahead requires passing a level check. **Babbel's level is advisory; Brilliant's is gated.** That is a genuine philosophical difference and both are defensible: Babbel has no paywall on ordering, so nothing needs gating.

### The CEFR translation — the priority artefact, and it is split across two pages

**On the pedagogy page, CEFR is named and the "can do" mechanism is explained** `[observed]`:

> "Our lessons are aligned to the **Common European Framework of Reference for Languages (CEFR)**, an international and research-backed framework that describes language ability on a scale from **basic (A1) to Proficient (C2)**. Babbel helps you build fluency along these levels following specific leveled **'can do' tasks**, so you gain fluency in level-appropriate situations such as **ordering a meal in a restaurant or introducing yourself to a new friend.**"

That sentence does the abstract-to-concrete translation in one move: framework → "can do" tasks → two named situations. `ordering a meal in a restaurant` and `introducing yourself to a new friend` are the concrete user promises, and they are offered as *examples of the mechanism* rather than as the definition of a level.

Also `[observed]`: "Each lesson is built around real-world context and **a clear goal aligned to international language learning standards from the Common European Framework of Reference for Languages (CEFR)**, so you always know what you're learning, where you can use it, and that you're progressing in the right direction." Three user benefits of CEFR alignment, in the user's terms: *what* / *where* / *that you're going the right way*.

**But the marketing level names live on a different page.** The `/learn-spanish` hub uses a five-tier taxonomy as its content organiser `[observed]`:

| Tier label (verbatim) | CEFR code |
|---|---|
| `Newcomer A1` | A1 |
| `Beginner A2` | A2 |
| `Intermediate B1` | B1 |
| `Upper Intermediate B2` | B2 |
| `Advanced C1` | C1 |

**This is the level-naming artefact.** Five things about it:

1. **The plain-English name and the CEFR code are concatenated into one label** — `Newcomer A1`, not "A1 (Newcomer)" or "Level 1: Newcomer". The code rides along as a suffix, so a user who knows CEFR is served and a user who does not is not blocked. This is the cleanest CEFR-surfacing convention in this batch.
2. **`Newcomer` for A1, not `Beginner`.** Babbel needs `Beginner` for A2, so A1 gets a gentler word. `Newcomer` implies arrival rather than incompetence — you are new *here*, not bad at this. It is also the one tier name that is not a proficiency judgement at all.
3. **The ladder stops at C1.** No C2 tier exists in the taxonomy, consistent with the Method page's disclosure that Spanish "go[es] all the way to C1".
4. **Each tier has an icon** (`CategoryButton_Newcomer_Icon_60x60.svg` etc.), so the levels are visual as well as lexical.
5. **The tiers are used as an editorial taxonomy, not just a course index** — every SEO article on the hub is tagged with its tier and a reading time: `Newcomer A1` / `2.5 Min Reading Time`, `Beginner A2` / `3 Min Reading Time`, `Intermediate B1` / `5 Min Reading Time`. So the level system governs marketing content, not just lessons. Article titles at each tier show the difficulty gradient concretely: `Common Spanish Phrases: Essential Words You Need` (A1) → `The 20 Most Common Spanish Verbs` (A2) → `7 Mistakes English Speakers Make In Spanish` (B1).

**However, the homepage FAQ uses a completely different three-tier system** `[observed]`:

> "`What levels are available?`
> We offer courses at **Beginner, Intermediate, and Advanced** levels. Unsure where to start? Take our Placement Test to find out!"

Three tiers, no CEFR codes, and `Beginner` now means A1-A2 rather than A2. **So Babbel ships two incompatible level taxonomies on adjacent surfaces**: a five-tier CEFR-suffixed system on the learning hubs and a three-tier plain-English system on the homepage FAQ, where `Beginner` denotes a different range in each. This is the most consequential terminology defect in this file — a user who reads the FAQ and then lands on the hub cannot map one onto the other.

**Per-language level ceilings are disclosed, with a concrete example** `[observed]`:

> "The short answer is yes! But it also depends on your language combination. Babbel offers **Spanish lessons that go all the way to C1** (and a placement test to help you know where to get started), but the **Turkish courses will only take you up to A2.**"

`Turkish courses will only take you up to A2` — naming the *weakest* course in the catalogue, by name, in a public FAQ answering whether advanced learners are served. That is a real disclosure: A2 is elementary, and a prospective Turkish learner at B1 now knows not to subscribe. Routed to a support page for the full matrix (`Available languages`, which is one of the two starred articles — see T1).

### Lesson-level scaffolding `[observed]`

**Lesson length is stated four times, and the figures do not agree**:

| Surface | Claim |
|---|---|
| Method page | "A typical lesson takes **about 6 minutes** to finish" |
| Method page, pillar | (implied by "quick lessons") |
| How-it-works, step 2 | "Most take about **5 to 10 minutes** (the average is 6 minutes!)" |
| How-it-works, FAQ | "Most take around **10–15 minutes.**" |

`about 6 minutes` / `5 to 10 minutes (average 6)` / `around 10–15 minutes`. The third contradicts the first two on the same page. Recorded as a defect, and a commercially meaningful one — lesson length is the core time-commitment promise.

**The four design principles inside a lesson** `[observed]` — a bulleted list where each bullet is *principle → learner benefit*:

> "• **Clear goals** mean you can focus your energy on the new material, not figuring out what comes next.
> • **Gradual progression** helps you learn at a good pace, so new content doesn't feel overwhelming.
> • **Varied exercises** keep learning fun, give you more practice, and help you remember vocabulary because the more ways you interact with something, the more likely you are to remember it.
> • **Review inside and at the end of lessons** reinforces what you've learned and helps to build confidence and accuracy."

Every bullet is `<mechanism> + <verb> + <user outcome>`. The third one even supplies the cognitive rationale inline ("because the more ways you interact with something, the more likely you are to remember it"). This is the same *name the principle, then state the mechanism, then state the benefit* shape Quizlet uses for its learning-science page (128), applied at lesson grain.

**The Babbel Method's four components** `[observed]`, from the Method page body: lessons built around **real-life situations** → teaching "the phrases and language rules you need" in context → **cultural insights** → **review and repetition** "built into the learning path", specifically via "unit recaps, review and correct mistakes made at end of lesson, and drill vocabulary chunks with spaced repetition."

`drill vocabulary chunks` — `chunks` as the unit of vocabulary (rather than words) is a linguistics term surfacing in consumer copy. And `vocabulary chunks` appears again in `Reviews` ("Babbel uses spaced repetition to surface vocabulary at the right time").

**Four named skills, each with a one-line method** `[observed]`, under `Build Your Language Skills Step by Step`:

| Skill | Method (verbatim) |
|---|---|
| `Listening` | "matching what you hear to words and phrases used in real conversations" |
| `Speaking` | "speaking into the app and receiving instant feedback" |
| `Writing` | "typing words and phrases in context" |
| `Grammar` | "Learn grammar in a clear, intuitive way so you understand how the language works and how to use it correctly" |

Note `Reading` is absent from this list of four, though it appears in the Method page's skill mentions and in Busuu's equivalent four-skill framing (130). Babbel's four are Listening/Speaking/Writing/Grammar — grammar substituted for reading, which is a genuine pedagogical position (grammar as a skill, not a topic) and worth flagging as a deliberate divergence from the standard CEFR four skills.

**Certificates as the progression artefact** `[observed]`: "When you finish a level, you receive an **official Babbel certificate aligned with CEFR standards**. Certificates help mark milestones and show how far you have come in your learning journey." `official` is doing unearned work (a Babbel certificate is not an official CEFR certification), but `aligned with CEFR standards` is the correct hedge and it is present. A dedicated help article exists (`Course certificates`, not opened).

## T5 Form & field labels

Minimal pre-auth form surface; the funnel begins at `my.babbel.com` which was not entered.

**Observed** `[observed]`:
- `Display language:` → `American English` — the interface-language selector, labelled to distinguish it from the target language
- Language picker options as labels: `Spanish (Mexico)`, `Spanish (Spain)`, `French`, `German`, `Italian`, `More` — note the parenthetical regional qualifier pattern, used only for Spanish
- Help-centre search: rendered as a bare ` How can we help?` heading with the input unlabelled in the extraction

**Documented in-product labels** `[documented]`:

| Label | Context |
|---|---|
| `Profile and settings` | Profile-icon dropdown |
| `Account Information` | Settings section holding subscriptions |
| `Learning plan` | Home-tab panel |
| `Levels` | Dashboard control (Busuu's word too — see 130) |
| `Change course` | Course switcher, app |
| `Explore` / `Explore more courses` | Course switcher, web |
| `Find your level` | Placement entry, web |
| `Take the placement quiz` | Placement entry, app |
| `Learn` / `Me` (implied) | App tab labels — `Learn` observed; `Speak` observed in Busuu not Babbel |
| `Cancel auto-renewal` | Account Information, per subscription |
| `Review` | The spaced-repetition surface, also called `Vocab workout (Review)` in help IA |

**`Vocab workout (Review)`** as a help-article title `[observed]` is a parenthetical-alias label — the product surface is called `Review`, the internal or legacy name is `Vocab workout`, and the help centre carries both in one title. Honest, and a findability hedge for users who remember the old name. Compare Quizlet's `Using grading options (US)` (128) — the same parenthetical-disambiguation device used for a different purpose.

## T6 Status & state language

**Progress vocabulary is documented but almost entirely unnamed** `[documented]` — the `Progress` section of the help centre lists five articles, which is the whole inventory:

`Babbel widget` · `Placement quiz` · `Streak` · `Course certificates` · `Reset your progress`

So the named progress objects are: **`Streak`**, **`Course certificates`**, and the **`Babbel widget`** (starred as the section's featured article). No XP, no points, no mastery buckets, no percentage are named in any inspected surface.

**What the marketing copy claims about progress display** `[observed]`: "Stay motivated with **real-time feedback, progress trackers, and handy visualizations.**" Three progress affordances, none of them named as a product surface. `handy visualizations` is the vaguest progress claim in this batch.

Also: "As you complete lessons and levels, **you can see your progress clearly.**" — an assertion with no mechanism.

**`Reset your progress` exists as a first-class article** `[observed]`, which implies progress is a resettable object and that resetting is common enough to document. Compare Quizlet's `Resetting study path progress` (128).

**Review-state vocabulary** `[observed]`: "Babbel uses spaced repetition to **surface vocabulary at the right time**", "You'll **review difficult words more often**, helping you remember the words you need", "Review sessions are automatically scheduled based on what you have learned and **where you may need more practice**", "the app reminds you to review words and phrases at the right time so they **move into long-term memory**".

`difficult words` is the only term-difficulty label observed — and it is a description, not a state name. Babbel has no equivalent of Quizlet's `Not Studied` / `Still Learning` / `Mastered` (128) or Busuu's `mastered` flag (130) in its public copy. **This is the weakest progress vocabulary in the batch**, and it is a genuine gap rather than a harvest failure: the marketing pages describe progress tracking three times without naming a single state.

**Four review modes are named** `[observed]`: "There are **different modes (flashcards, listening, speaking, writing)** so you can switch it up by practicing different skills or can focus in on what you prefer." Four practice modalities inside the Review surface, lowercase and unbranded — a mode list, but not a study-mode *system* in Quizlet's sense.

**Subscription states** `[documented]`: active → `Cancel auto-renewal` applied → `expiration date` displayed → expired. The off-state signal is the same as Quizlet's: "If you don't see the Cancel auto-renewal button, this means that your subscription will not be renewed for the next period. You'll also see the **expiration date** in your subscription information." **Absence of the control plus presence of a date** as the status display — an independently-arrived-at convention shared with Quizlet (128).

`renewal or expire` is offered as a paired state in one sentence: "there you'll find the date when your subscription is due to **renew or expire**" — the same date field carrying two meanings depending on auto-renewal state. Clear.

## T7 Error, failure & recovery — PRIORITY-adjacent (correction wording)

**The correction model is Babbel's stated differentiator and it has a name for the mistake-review surface** `[observed]`

The Method page lists `Learn from your mistakes` as one of five "What you'll be able to do" capabilities — i.e. **learning from mistakes is framed as a learner capability, not as a system feature.** Its two bullets:

> "• **Go over mistakes made in a lesson** to practice and strengthen vocabulary and grammar.
> • **Practice phrases you struggle with.** Learning takes repetition over time. To help you grow, **we track and resurface items where you've made mistakes.**"

`we track and resurface items where you've made mistakes` is the mechanism stated plainly, in first-person-plural. And the Method body names where it happens: "**review and correct mistakes made at end of lesson**" — an end-of-lesson correction pass is a named component of the Babbel Method.

Two register notes. First, **`mistakes` throughout — never `errors`, never `wrong answers`.** `Mistake` is the human word; `error` is the system word. Second, the framing sentence is "Learning takes repetition over time" — the mistake is attributed to the *nature of learning*, not to the learner. No blame construction appears anywhere in the corrective copy.

**Pronunciation feedback — the richest correction documentation** `[observed]`

> "Sharpen your pronunciation using **speech recognition**."
> "you practice pronunciation and sentence building early and often. Instead of passively tapping through exercises, you actively produce language."
> "Babbel's speech recognition gives **real-time feedback on pronunciation**, helping you feel more confident in real conversations."
> "Practice pronunciation and sentence building by **speaking into the app and receiving instant feedback.**"

Four statements of the same capability across three pages, with the timing word varying: `real-time` / `instant` / (unqualified). No feedback *string* is published, and no indication of granularity (per-word? per-phrase?) — which Busuu's equivalent documentation does supply (130, where words pronounced incorrectly are "highlighted in red"). **Babbel documents that correction happens; Busuu documents what it looks like.** For a file whose benchmark strength is "lesson guidance and correction", that is the central gap.

**`Babbel Speak` — the AI correction surface, framed as judgement-free** `[observed]`

> "Boost your speaking confidence with **Babbel Speak**, our **AI conversation partner** that uses artificial intelligence conversation technology to make practicing a new language **simple, supported, and effective.** Just tap to start an AI conversation scenario and follow the prompts."
> "…an **AI-powered conversation partner** that guides you through realistic dialogues in a **judgment-free space** so you can build confidence and conversational fluency at your own pace."
> "an AI-powered conversational tool that allows you to try out common real-life conversations and **receive feedback**."

`judgment-free space` is the key phrase and it is the standard framing for AI language practice — Busuu uses the near-identical "judgement-free space" (130), which is a striking independent convergence on the same three words. Both products identify *fear of being judged while speaking* as the barrier and both name the absence of judgement as the feature.

Note `AI conversation partner` / `AI-powered conversation partner` / `AI-powered conversational tool` — three descriptions of one feature across three pages, plus `AI Conversation Practice` in the Method page's emoji list. Four namings (see T13).

**Low-stakes speaking scaffolding is explicitly named** `[observed]`:

> "Grow confidence to have conversations, **even if with some mistakes**, by practicing with our **low stakes conversation activities** with repeatable lines or guided prompts."

`even if with some mistakes` (grammatically awkward, but the intent is clear) and `low stakes conversation activities` — Babbel explicitly licenses imperfection as the goal state of the practice activity. Combined with the fluency redefinition ("not perfection", T2), this is a consistent position: mistakes are the expected condition of use.

**`Guided Conversations` — the beginner speaking scaffold** `[observed]`:

> "For learners just starting out, **Guided Conversations** is an excellent place to start speaking. You **listen to short conversations in real-life situations** (voiced by real speakers) and then **repeat the lines for one part in the dialogue.**"

A named format whose entire design is *reduced production demand* — you speak one side of a dialogue, using given lines. The scaffolding is the script.

**`Learning Tips` — in-lesson guidance copy** `[observed]`:

> "Lessons come with **extra nuggets of information that pop up in lessons** and further explain grammar, give a pronunciation tip, or give cultural information."

`extra nuggets of information` is the only genuinely loose phrase on the pedagogy pages. `Learning Tips` is the named surface; three content types are declared (grammar explanation, pronunciation tip, cultural information).

**Error-shaped help-article titles** `[observed]`

| Title | Shape |
|---|---|
| `Payment problems` | Bare noun phrase |
| `No access after payment` | **Noun phrase naming the user's experience** — no agent, no verb |
| `Issues with vouchers` | Bare noun phrase |

Three failure articles, all bare noun phrases, none in the user's voice. `No access after payment` is the best of the three: it names the exact gap between two events, which is precisely how a user would describe it ("I paid and nothing happened"), without a verb to assign blame. Compare Wise's first-person confessions — Babbel does not use that register, and its failure corpus is thin (three titles across an 18-article billing category).

`Basic troubleshooting` — *(Busuu, not Babbel — excluded)*.

**Contact routing** `[observed]`: `Contact us` / `Contact support` at category level; `Customer Service` in the marketing footer as a bare `mailto:support@babbel.com`; `Contacting Babbel` as a help article. Three labels for one destination.

## T8 Empty states

`[absent]` — no empty-state string observed or documented. The help centre has a search field but no no-results string was retrievable; all in-product empty states (no streak, empty review queue, no lessons in progress) are behind auth.

The nearest analogue `[observed]` is the accessibility statement's candid non-completion state (T14): "As we work towards meeting WCAG 2.0 AA standards, **we recognize we are not there yet.**" A product admitting an unfinished state in its own voice — not an empty state, but the same honesty register.

## T9 Notifications & system messages

`[documented]`, thin.

- **`Babbel widget`** is the starred article in the `Progress` section — an iOS/Android home-screen surface, and therefore the product's main ambient-notification channel. Not opened.
- **Review reminders**: "the app **reminds you** to review words and phrases at the right time so they move into long-term memory." Cadence unstated.
- **Marketing email consent** — the homepage carries no newsletter block; the only consent copy observed is the help-centre-adjacent footer.
- **Support SLA**: none stated on any inspected page. Contrast Brilliant's 48 hours (126).
- `Was this article helpful? Yes / No` on every help article — a feedback-collection surface rather than a notification.

No toast, banner, email, or push string retrievable verbatim.

## T10 Subscription, auto-renewal and cancellation disclosure — PRIORITY

Babbel's subscription content is **the most philosophically interesting in this batch** — it includes an article justifying why the product costs money — but its pricing is the least observable, and its cancellation deadline is unusually generous and unusually precise.

### The auto-renewal statement, and its benefit clause `[documented]`

> "Babbel operates on a subscription basis, granting access to language courses through a variety of plans. When you select a plan, **your subscription will renew automatically at the end of each period, ensuring uninterrupted access to your learning materials.**"

The `ensuring uninterrupted access` clause is near-identical to MasterClass's "which ensures that you have continuous and uninterrupted access" (127). Two products independently attaching the same user-benefit justification to the same billing mechanism. Quizlet, by contrast, just states it (128). Recorded as a soft-spin: the primary reason for auto-renewal is revenue continuity, and the benefit clause frames it as service.

Restated in `Pricing` with the escape named: "after the chosen period, your subscription will **automatically renew for the next period and you will be charged automatically, unless you decide to cancel it before.**" And the flexibility claim: "You are free to cancel your subscription at any time, so **you only pay for the time you need.**"

### The cancellation deadline: **the day before renewal** `[documented]`

> "Most Babbel subscriptions are automatically renewed, but if you don't want to continue learning with us, you can easily **cancel your subscription at any time up to the day before the renewal date.**"

`up to the day before the renewal date` — stated in the article's first sentence and repeated as its own Q&A heading (`When can I cancel my subscription?`) with the same wording. This is **more generous and more legible than the 24-hour buffers** used by Brilliant and Quizlet: a calendar day is something a user can check against a date, whereas "24 hours before" requires knowing the renewal *time*. Best-in-batch on this specific point.

Note `Most Babbel subscriptions are automatically renewed` — `Most` correctly excludes Lifetime and voucher access, which are handled in a separate article.

### Where the cancellation sits, exactly `[documented]`

> 1. Go to babbel.com and log in to your account
> 2. Click on the **profile icon** in the top right corner and choose **Profile and settings**
> 3. Open **Account Information**
> 4. Choose the subscription and click the **Cancel auto-renewal** button

Four steps, and **the control is `Cancel auto-renewal`** — the same precise naming as Quizlet (128), naming the recurring charge rather than the relationship. No euphemistic container: `Account Information` holds it, and the button says what it does.

**The status-legibility note is set as a blockquote** `[documented]`:

> "> If you don't see the Cancel auto-renewal button, this means that your subscription will not be renewed for the next period. You'll also see the expiration date in your subscription information - this is when your subscription will automatically end and you won't be charged again for it."

Three facts in one note: why the control is missing, where to find confirmation, and the reassurance (`you won't be charged again`). The absent-control case is the commonest silent failure in a cancellation flow and Babbel pre-answers it inline — the same recovery-by-precondition pattern Quizlet uses four times (128).

**An explicit anti-misconception, in the article's opening** `[documented]`:

> "Please note that **deleting the Babbel app from your device or canceling your account doesn't cancel your subscription!**"

Bold, exclamation-marked, placed before the procedure. It names the two things users actually do instead of cancelling — delete the app, delete the account — and says neither works. This is the single most useful sentence in Babbel's subscription content, and its placement (first, before the steps) is correct. The exclamation mark is the only one in the article and it is earned.

**Channel routing is complete and each destination is deep-linked** `[documented]`: Google Play and Apple App Store each get a step list *plus* a direct management link ("you can manage your subscriptions directly here"). Then the orientation help: "If you don't know where you bought your subscription, you can find this information in your **Account Information** page or on your original invoice." Telling a user how to determine which channel they are in — before asking them to choose a channel procedure — is a step most products skip.

**What survives cancellation** `[documented]`:

> "`Can I still use Babbel if I cancel my subscription?`
> Yes, if you cancel your subscription, you will still have access to all of your courses until your subscription expires. This means that you can **continue learning until the end of your current billing cycle and have access for the time you've paid for.**"

Framed as entitlement (`for the time you've paid for`) rather than as grace. Good — it asserts a right rather than granting a favour.

### Pricing: structure disclosed, figures unobservable

**No price is recorded in this file.** Every pricing statement redirects to `babbel.com/prices` / `my.babbel.com/prices`, which sits behind the onboarding funnel and was not entered.

What *is* disclosed is the pricing *structure*, and it is disclosed carefully `[documented]`:

> "The cost of a Babbel subscription can vary depending on several factors, including **your location, the duration and type of your subscription, and whether you purchase directly through Babbel, partner websites, Google, or Apple.**"

Four named variables, including the platform-arbitrage one. Repeated on the How-it-works FAQ: "the price varies depending on your location, plan length, and whether you purchase directly or through an app platform… **Prices are subject to change and can differ between platforms (web, iOS, Android).**"

**The monthly-equivalent disclosure is the standout** `[documented]`:

> "`Do I pay monthly or in advance?`
> **For each subscription, you pay the full amount for the renewal period in advance.**
> On our pricing pages, **we break down the total cost of our subscriptions into a monthly rate to highlight the value of longer-term subscriptions.** This allows you to see the savings you would make by committing to a longer term compared to a month-to-month basis."

Babbel explains its own display convention **and its motive** ("to highlight the value of longer-term subscriptions"). Most products show a monthly-equivalent figure without disclosing that it is a division; Babbel names the practice, names why it does it, and puts the actual billing fact first (`you pay the full amount… in advance`). That is unusually transparent for a pricing-presentation choice that is, in effect, a persuasion device.

Restated with a worked example in `Timing of subscription payments`: "if you select a **6-month plan, the full amount for six months is charged upfront**, and the subscription will automatically renew for another 6 months at the end of the period unless you cancel your subscription." A concrete example beats a rule.

**Instalments are ruled out explicitly** `[documented]`: "Currently, Babbel does not offer instillment payment options. All subscription plans - regardless of their duration - require payment for the full period at the time of purchase." Note the typo — `instillment` for *instalment/installment* — in a payments disclosure. Recorded as a defect.

**Plan shapes named** `[documented]`:

| Plan concept | Copy |
|---|---|
| Single language, multiple durations | "different renewal periods"; "1-month, 3-month, 6-month, and 12-month plans" |
| `All languages` | "for those who are interested in learning several different languages, this gives you full access to our self-study platform for all available languages" |
| `Lifetime` | "a **Lifetime option**, giving you unlimited access forever"; "requires a one-time payment and do[es] not involve any recurring fees" |
| `Group Plan` | `Group Plan for family and friends` (article title, `Special offers`) |
| Gift | `Babbel as a Gift` — "require a one-time payment" |
| Voucher | "A voucher grants access for a specific period" |

**`Lifetime` and `forever` are both used** for the same product: "giving you unlimited access forever" and "a Lifetime subscription provides ongoing access with a one-time payment." `forever` is a strong word for a subscription product and it appears only once, on the plan-shapes article; the payments article uses the safer `ongoing access`. Two registers for one promise — and `forever` is the one that would be tested if the product were discontinued.

### "Why do I have to pay for Babbel?" — the unusual artefact `[documented]`

`Try Babbel for free` contains a section that no other product in this batch attempts:

> "`Why do I have to pay for Babbel?`
> We understand that it can be difficult to want to pay for something when there's a free alternative. For Babbel, charging for access to our learning content is **as much about our values as it is about our bottom line.** Here's why:"

Then three numbered justifications, each a bold heading + reasoning:

> "1. **Our courses are created by experts** — …over 150 experts… When you pay for a Babbel subscription, you're paying for their expertise and the high-quality content they create.
> 2. **Ads don't help you learn** — We believe that when you're learning a language, your focus should be on remembering and using what you've learned. Advertising distracts you and prevents you from learning in the most effective way. That's why Babbel has no ads.
> 3. **We don't sell your data** — Our goal is to help you speak a language. That's why we never sell your information to third parties and only keep what's necessary to track your progress. **Your data is yours.**"

Four things worth recording.

- **It names the competitor without naming it**: "when there's a free alternative" is unmistakably Duolingo, and the three justifications are precisely the three axes on which Babbel differs (expert-authored, ad-free, no data sale).
- **`as much about our values as it is about our bottom line`** concedes the commercial motive in the same clause as the principled one. That concession is what makes the rest readable rather than sanctimonious.
- **Argument 2 converts the absence of ads from a feature into a pedagogical claim** — "Ads don't help you learn" — which is the same move Quizlet makes with `Focused studying` (128) but stated as a reason rather than a benefit label.
- **`Your data is yours.`** Four words, full-stopped, ending the section. The strongest sentence on the site.

A help-centre article arguing the ethics of its own paywall is rare. It is also strategically placed: it lives inside `Try Babbel for free`, so the user reading about the free tier gets the case for paying in the same breath. The article's own opening does the same thing: "Babbel offers you the opportunity to try our language learning platform free of charge. **To get the most out of our platform, you'll need to pay, because our learning model is designed by experts and runs ad-free to give you the best learning environment.**"

### Free-tier disclosure, and an inconsistency `[observed]` `[documented]`

| Surface | Free-tier claim |
|---|---|
| Homepage FAQ | "Signing up is completely free, and **you can try the first lesson of every course for free.** Depending on the language you select, **you'll have access to up to 80 free lessons!**" |
| Method page FAQ | "the **first lesson of every course is free** for you to try" |
| Help: Try Babbel for free | "Registering with Babbel is completely free, and **the first lesson of every course is free to try.**" |

Consistent on the first-lesson rule. The `up to 80 free lessons!` figure appears **only on the homepage FAQ** and is not corroborated anywhere else — and it is doing quite different work (80 free lessons sounds like a substantial free tier; "the first lesson of every course" sounds like a sampler). They are the same fact expressed two ways (80 courses × 1 lesson), but a user reading only the homepage will overestimate the free tier. Recorded as a defect of framing rather than of accuracy.

**"Free trial" vs "free lessons"** `[observed]` — the homepage FAQ ends "**Start your free trial now!**" linking to `/test-babbel-for-free`, but no trial is described anywhere: the free offer is per-lesson access, not a time-limited full-access trial. **`free trial` is used as a CTA label for something that is not a trial.** This is the most misleading string found in this file, and it matters because trial-to-paid is exactly the funnel the brief asks about. There is no documented trial conversion, no trial end date, and no trial cancellation article — consistent with there being no trial. Babbel's actual model is freemium-sampler, not trial.

**Additional free access** `[documented]`: "you can also try out our **additional learning features**, such as **speaking practice** or **podcasts** which you can access for free."

## T11 Help-centre architecture

**Platform:** Zendesk Guide at `support.babbel.com`, themed. Nine locales: `English (United States)`, `Deutsch`, `English (United Kingdom)`, `Español`, `Français`, `Italiano`, `Polski`, `Português do Brasil`, `Svenska`, `Українська`.

**Structure:** 4 categories (+ `Contact us`) → sections → articles. `Subscription and payments` has 5 sections / 18 articles; `Learning with Babbel` has 4 sections / ~20 articles.

**Article-title grammar — five shapes, and bare noun phrases dominate**

| Shape | Examples |
|---|---|
| Bare noun phrase (the house style) | `Available languages` · `Pricing` · `Payment methods` · `Payment problems` · `Invoices` · `Subscription information` · `Babbel subscriptions` · `Streak` · `Course certificates` · `Grammar guide` · `Guided Conversations` · `Podcasts` · `Audio recap` · `Babbel Speak` · `Babbel widget` · `Babbel courses` · `Placement quiz` · `Getting started` · `Offline mode` |
| Gerund + object | `Canceling a subscription` · `Changing your subscription` · `Using vouchers` · `Building a learning habit` · `Memorizing vocabulary` · `Defining your learning goals` · `Supplementing language learning` · `Learning two languages at once` · `Contacting Babbel` |
| Imperative | `Try Babbel for free` · `Reset your progress` · `Change or repeat a course or lesson` |
| Noun + parenthetical alias | `Vocab workout (Review)` |
| Descriptive noun phrase | `Timing of subscription payments` · `Effective language learning` · `No access after payment` · `Finding the right course` · `Group Plan for family and friends` · `Courses for Ukrainian refugees` |

**Roughly 45% are bare noun phrases** — the terse, index-style convention. It scans fast in a section list but gives no task orientation: `Streak` and `Pricing` tell you the topic, not the question. Compare Brilliant, which uses full interrogatives (`What is a streak?`) for the same content (126). Babbel's titles are *labels*; Brilliant's are *questions*. Babbel's are better for browsing, Brilliant's better for search.

**The imperative titles are the odd ones.** `Try Babbel for free` and `Reset your progress` are commands, and `Try Babbel for free` in particular reads as a marketing CTA sitting in a help-centre index — which is consistent with its content (it is half explainer, half paywall argument; T10).

**`Courses for Ukrainian refugees`** `[observed]` — a humanitarian-programme article in the `Special offers` section, alongside `Group Plan for family and friends`. Filing a free-access-for-refugees programme under "Special offers" is a taxonomy mismatch (it is not an offer in the commercial sense), but the article's existence and its named cohort are notable. Babbel also won a communications award for it, per the homepage award strip (`DPOK Awards` — "Purpose Driven Communications Award for helping Ukrainian refugees, 2024").

**Section names inside `Learning with Babbel`** are the richest IA artefact: `Learn` / `Practice` / `Progress` / `Learning tips and tricks` — see T1. Note that `Practice` contains six articles covering six *named* features (`Babbel Speak`, `Vocab workout (Review)`, `Grammar guide`, `Guided Conversations`, `Podcasts`, `Audio recap`), so the practice surface has more named components than the learning surface (three articles: `Babbel courses`, `Finding the right course`, `Change or repeat a course or lesson`). **Babbel has more named practice modes than it has named course structures**, which is consistent with a product whose differentiation is the practice loop.

**Cross-locale link leakage** `[observed]`: the en-US help-centre index links `Contact support` to `https://support.babbel.com/hc/en-gb/articles/205600518` — the **en-GB** locale. A US user clicking the contact entry from the US index lands on the UK article. Recorded as a defect.

**Truncated help-centre search heading** `[observed]`: the index renders ` How can we help?` with a leading space and no visible input label.

**Footer inconsistency between marketing and help centre** `[observed]`: the help-centre footer's `Company` group points to `about.babbel.com` for About/Method/Terms/Privacy, while the marketing footer points to `www.babbel.com` for the same. And the help footer labels the Method link `Babbel Method` pointing at `about.babbel.com/en/` (a homepage), while the marketing footer's `The Babbel Method` points at `/about-us`, and the actual Method page is at `/the-babbel-method`. **Three link targets for the Babbel Method across three footers.**

**Article foot** `[observed]`: `Was this article helpful? Yes / No` → `Articles in this section`. No escalation CTA at article level.

## T12 FAQs

Babbel is FAQ-heavy: **three separate FAQ blocks across three marketing pages**, with 24 questions total and near-zero overlap. All answers are short (1-4 sentences) and most terminate in a link to a help article — the FAQ is used as a *router into the help centre*, not as a self-contained answer set.

### Homepage FAQ — 7 questions, heading `Frequently Asked Questions` `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What is Babbel, and how does it work? | Two sentences; describes Babbel as a "leading language learning subscription app" then routes to the Babbel Method page |
| 2 | What languages can I learn with Babbel? | Lists 13 languages inline |
| 3 | What levels are available? | **`Beginner, Intermediate, and Advanced`** + routes to the Placement Test help article |
| 4 | Can I try Babbel for free? | First lesson of every course free; "up to 80 free lessons"; routes to `/test-babbel-for-free` |
| 5 | What are the benefits of using Babbel? | One benefit (expert-crafted content), then routes to a help article for the rest |
| 6 | What are the subscription options? | **Answer is a bare link.** "Find a detailed overview of our subscription plans." |
| 7 | What payment methods does Babbel accept? | One hedged sentence + link: "For the latest updates on payment options, visit this page" |

**Q6 is an FAQ answer with no answer** — a single sentence that is entirely a link. Q7 is barely better. Both are the commercially load-bearing questions (plans, payment) and both are outsourced. That is a defensible content-ops decision (pricing changes; the help centre is the single source of truth) but it means the homepage FAQ cannot answer the two questions a buyer most wants answered.

Q3 is the one that carries the terminology defect: three plain-English levels where the learning hubs use five CEFR-suffixed ones (T4).

### Babbel Method FAQ — 6 questions, heading `Frequently Asked Questions About The Babbel Method` `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What are the 14 Babbel languages? | Lists 13 + "plus English" — **the question says 14, the list needs "plus English" to reach it** |
| 2 | Is Babbel actually effective? | "We can promise Babbel's courses are effective, **but you don't need to take our word for it**" → three named universities with links |
| 3 | Can I practice speaking with Babbel? | Speech recognition + `Babbel Speak` |
| 4 | Can I try Babbel for free? | First lesson free |
| 5 | Can advanced learners use Babbel too? | **"The short answer is yes! But it also depends on your language combination"** → Spanish to C1, Turkish only to A2 |
| 6 | *(none — the block has 5 substantive + awards)* | |

**Q2 is the best FAQ answer in this file.** "We can promise Babbel's courses are effective, but you don't need to take our word for it" — concede that the claim is self-interested, then hand over three third-party citations (Yale, City University of New York, Michigan State). The construction inverts the usual FAQ dynamic: instead of asserting, it delegates.

**Q5 is the most honest** — see T4. Naming Turkish's A2 ceiling in an answer about advanced learners is a disclosure against interest.

**Q1's arithmetic is visible**: the question asks about "the 14 Babbel languages" and the answer lists thirteen then appends "plus English." A reader who counts will notice the question was written to a number the list does not reach unaided.

### How Babbel Works FAQ — 11 questions, heading `Frequently Asked Questions About How Babbel Works` `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How long should I spend on Babbel each day? |
| 2 | How long does it take to speak confidently with Babbel? |
| 3 | Is Babbel good for beginners? |
| 4 | Can advanced learners use Babbel too? |
| 5 | Can I switch languages on Babbel? |
| 6 | What makes the Babbel Method effective? |
| 7 | What is the Babbel App? |
| 8 | How does Babbel stack up against competitors? |
| 9 | Can I use Babbel on a laptop or desktop? |
| 10 | Can I use Babbel offline? |
| 11 | Can I practice speaking with Babbel? |
| 12 | How much does Babbel cost? |
| 13 | What languages does Babbel offer? |

Thirteen, in fact. **Structural notes.** Questions 1-2 are both duration questions from opposite ends (*how long per day* / *how long until results*), which is a good pairing — expectation-setting on effort and on payoff. Q3-Q4 are a **level pair** (`Is Babbel good for beginners?` / `Can advanced learners use Babbel too?`), and note that Q4 here gets a much softer answer than the identical Q4 on the Method page: "Babbel offers content for a range of proficiency levels. Advanced learners can focus on refining grammar, expanding vocabulary, and improving fluency in specific contexts" — **no mention of the Turkish A2 ceiling, no per-language caveat.** Same question, two pages, two very different levels of candour. Recorded as an inconsistency, and the less candid version is on the higher-traffic page.

Q8 (`How does Babbel stack up against competitors?`) is the competitive-positioning answer quoted in T2 — an FAQ used as a comparison surface.

Q2's answer is the model hedge: "Progress depends on your goals, starting level, and consistency. Many learners report noticeable improvement… within a few weeks of regular use." Three named variables, then a bounded claim with `many learners report` rather than a percentage. Compare the homepage's unhedged "Babbel will get you speaking in as little as 3 weeks."

**Cross-block duplication** `[observed]`: `Can I try Babbel for free?` appears on the homepage and the Method page with different answers (one mentions 80 lessons, one does not). `Can advanced learners use Babbel too?` appears on the Method page and How-it-works with materially different candour. `Can I practice speaking with Babbel?` appears on both with different feature emphasis. **Three questions duplicated across FAQ blocks with divergent answers.** For a product running three FAQ blocks, no reconciliation pass has been done.

## T13 Mode and level terminology — PRIORITY

### The level system — and there are two of them

| Term | Babbel's usage | Where |
|---|---|---|
| `Newcomer A1` | Tier 1; plain name + CEFR code concatenated | Learning hubs |
| `Beginner A2` | Tier 2 | Learning hubs |
| `Intermediate B1` | Tier 3 | Learning hubs |
| `Upper Intermediate B2` | Tier 4 | Learning hubs |
| `Advanced C1` | Tier 5 (ceiling; no C2) | Learning hubs |
| `Beginner` / `Intermediate` / `Advanced` | **A competing three-tier system** | Homepage FAQ |
| `CEFR` / `Common European Framework of Reference for Languages` | Always expanded on first use, then abbreviated | Method, How-it-works, help |
| `'can do' tasks` | The CEFR mechanism, in scare quotes | Method page |
| `conversation-ready` | A coined threshold, not a level | Method page pillar |
| `level completion` | The certificate trigger | How-it-works |
| `placement quiz` / `placement test` / `Placement Test` | **Three namings of one feature** | Help article / help body / homepage FAQ |
| `Find your level` | The web control for the same | Help article |

**`Newcomer A1` is the artefact worth stealing.** The plain-English word and the framework code are welded into a single label, so the label serves two audiences without a tooltip: a learner who has never heard of CEFR reads `Newcomer`, and one who has reads `A1`. No parentheses, no "Level 1:", no glossary. And `Newcomer` specifically — rather than `Beginner` — buys two things: it frees `Beginner` for A2, and it describes *arrival* rather than *deficiency*.

**The three-tier/five-tier collision is the file's headline defect.** `Beginner` means A2 on the hubs and A1-A2 (or possibly A1-B1) on the homepage. There is no page on which both systems appear, so the contradiction is only visible to someone reading across surfaces — which is exactly what a prospective buyer does.

**`placement quiz` vs `placement test` vs `Placement Test`** `[observed]`: the help article's H1 and canonical URL say `Placement quiz`; its own first sentence says "Our **placement test** helps determine your learning level"; its second paragraph says "Babbel's **placement quiz** assesses your prior knowledge"; the in-app control is `Take the placement quiz`; the web control is `Find your level`; the homepage FAQ CTA is `Take our Placement Test`. **One feature, five labels, and the article that documents it uses two of them in consecutive paragraphs.** Note also the URL redirect `…-Placement-test` → `…-Placement-quiz`, evidence of a rename in progress. `quiz` is the softer word and appears to be the destination; `test` is the legacy word and survives in the marketing CTA and in the article's own lede.

### Mode and feature names

| Term | Babbel's usage | The alternative it rejected |
|---|---|---|
| `The Babbel Method` / `Babbel Method` | The named pedagogy; capitalised, with and without the article | "our approach", "methodology" |
| `Babbel Speak` | The AI conversation partner | "AI tutor", "Conversations" (Busuu's word) |
| `Guided Conversations` | Beginner listen-and-repeat dialogue format | "shadowing", "dialogue practice" |
| `Vocab workout (Review)` | The spaced-repetition surface | "Flashcards", "Practice" |
| `Review` | The user-facing name for the above | |
| `Grammar guide` | The grammar reference surface | "Grammar reference", "Rules" |
| `Audio recap` | End-of-unit audio summary | "Recap", "Summary" |
| `Learning Tips` | In-lesson pop-up explanations | "Hints", "Notes" |
| `culture bites` | Cultural-content snippets | "culture notes", "cultural insights" |
| `cultural insights` | **A second name for the same thing** | |
| `vocabulary chunks` | The unit of vocabulary drilling | "words", "phrases" |
| `unit recaps` | End-of-unit review | |
| `learning path` / `Learning plan` | **Two names** for the personalised sequence | "curriculum", "course" |
| `Complete course` | *(not observed for Babbel — this is Busuu's term)* | — |
| `Lifetime` | The one-time-payment plan | "Forever plan" (though `forever` is used in prose) |
| `All languages` | The multi-language plan | "Unlimited", "Premium" |
| `Group Plan` | Family/friends plan | "Family Plan" |
| `learners` | The user noun, predominantly | "students", "users" |
| `lesson` | The atomic unit, ~6 min | "exercise", "activity" |
| `course` | The per-language-per-level container | |
| `unit` | Intermediate grouping (implied by `unit recaps`, `the current unit`) | |

**Four namings for the AI feature** `[observed]`: `Babbel Speak` (the product name), `AI conversation partner`, `AI-powered conversation partner`, `AI-powered conversational tool`, plus `AI Conversation Practice` in an emoji-bulleted list. The brand name is stable; the descriptor is not.

**Two names for cultural content**: `culture bites` (homepage, lowercase, unglossed) and `cultural insights` (Method page, lowercase). `culture bites` is the more distinctive and appears once; `cultural insights` is generic and appears twice.

**Two names for the personalised sequence**: `learning path` (marketing, twice) and `Learning plan` (the actual in-product panel name, per the placement-quiz article). The marketing word and the product word differ.

**`conversation-ready` is the best coinage in the file.** It names a *threshold of usefulness* rather than a proficiency level, which lets Babbel make a concrete promise ("Quickly become conversation-ready") without touching CEFR or claiming fluency. It is the lexical counterpart to the fluency redefinition (T2): if fluency is a spectrum, `conversation-ready` is the first point on it worth naming.

**The four skills are Listening / Speaking / Writing / Grammar** — not the CEFR four (reading, listening, speaking, writing). Reading is dropped and grammar promoted. For a CEFR-aligned product to reorganise the canonical four skills is a real position, and it aligns with the competitive critique ("immersion without explanation") — grammar-as-a-skill is precisely what Babbel claims rivals lack.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout; first-person plural for the company, used heavily and confidently: "**We define fluency as** successful communication", "**We understand that** it can be difficult to want to pay", "**We believe that** when you're learning a language", "**we never sell** your information", "**we track and resurface** items where you've made mistakes", "**we recognize we are not there yet**". Babbel's `we` is a *position-taker* — it defines terms, states beliefs, and concedes shortfalls. That is a distinct register from Brilliant's confessing `we`, MasterClass's constraining `we`, and Quizlet's near-absent `we`.

**Register.** Warm, explanatory, and noticeably longer-sentenced than the other four products in this batch. Contractions used freely. The pedagogy pages read as essays; the help centre reads as procedure. Exclamation marks appear sparingly and land on genuine enthusiasm or genuine warning: "The short answer is yes!", "the average is 6 minutes!", "makes your progress feel real!", "**deleting the Babbel app… doesn't cancel your subscription!**", "up to 80 free lessons!". Five instances observed, one of which is the cancellation warning — the only place an exclamation mark does safety work.

**Emoji used as a feature list** `[observed]`: "🎓 Interactive Lessons / 🔊 AI Conversation Practice / 📖 Grammar Guide / 🏆 Innovative Language App" and the flag emoji in the placement-quiz language list. Four decorative emoji as bullet glyphs on a marketing page — less disciplined than Quizlet's plain bold `Tips` heading, and the same accessibility concern as MasterClass's 🗒 (announces as "graduation cap" or is skipped).

**Tone gradient by stakes.** Colloquialism clusters in pedagogy and motivation: "private tutor in your pocket", "bite-sized", "small wins", "extra nuggets of information", "keep it interesting", "switch it up", "culture bites". It thins in the subscription articles and disappears entirely from the accessibility statement. Same gradient as the rest of the batch.

**Numbers as trust devices** `[observed]`: `25 million subscriptions sold` / `25m actual subscriptions sold`, `92%` in `2 months`, `200+ language experts` (vs `over 150` elsewhere), `1.6 million 5-star ratings`, `47.4 million downloads`, `14 languages`, `about 6 minutes`, `3 weeks`, `up to 80 free lessons`, `A1`-`C2`. Precise to one decimal in two cases (`25m`, `47.4 million`, `1.6 million`) — `47.4 million` is the most granular number in this batch and reads as audited rather than rounded.

**Accessibility content — a real statement, and it is unusually honest**

Babbel is the **only product in this batch with a published accessibility statement**, and it is the only one that admits non-compliance. `[observed]`

> `# Accessibility Statement`
> `## Assistance` — "If you have difficulty using or accessing any part of this website, please feel free to email us at support@babbel.com."
> `## Ongoing Efforts` — "Babbel is committed to making its website usable by all people by **meeting or exceeding the requirements of the Web Content Accessibility Guidelines (WCAG) 2.0 AA.** We have engaged **an accessibility consulting company** to conduct an accessibility audit of our website and provide us with specific recommendations…"
> `## Feedback` — "**As we work towards meeting WCAG 2.0 AA standards, we recognize we are not there yet.** Please email us at support@babbel.com if you have any feedback or suggestions as to how we could improve the accessibility of this website."

Five observations.

1. **"we recognize we are not there yet"** is the most candid sentence in any accessibility statement I would expect to find on a consumer product. Most statements assert conformance or claim "substantial conformance"; Babbel states the gap. That honesty is worth more than a claim, and it is the single most transferable line in this file.
2. **The standard cited is WCAG 2.0 AA, not 2.1 or 2.2.** WCAG 2.1 has been the norm since 2018 and 2.2 since 2023. Committing publicly to a 2008 standard in 2026 copy is a substantive shortfall, and it is stated twice. Recorded as a defect.
3. **Three sections, three jobs**: `Assistance` (what to do now), `Ongoing Efforts` (what we are doing), `Feedback` (how to tell us). Ordering the *user's immediate remedy* first, before the company's roadmap, is correct.
4. **No accessibility features are named.** No keyboard navigation, no screen-reader support, no caption/transcript policy, no contrast commitment, no VPAT. For a product built on audio and speech recognition — where captions, transcripts, and non-speech alternatives are the material accessibility questions — the statement is silent on every one of them. Contrast the substantive audio documentation scattered through the help centre and marketing pages (speech recognition, audio recap, podcasts, text-to-speech-adjacent features), none of which is connected to the accessibility statement.
5. **The statement scopes itself to "this website"** three times. The mobile app — the primary platform, with its own `Mobile Terms` — is not covered.
6. **A `Print` control** is offered at the top of the statement, which is a small genuine affordance.

**Other accessibility signals**

- **`Skip to main content`** first in DOM on every marketing page, targeting `#main`. `[observed]` Present and correctly cased.
- **Alt text is scene-level and descriptive where present** `[observed]`: "A diverse group of people engaged in a relaxed conversation while sitting around a table in a garden." · "Two girls having breakfast while sitting at a table in the street of a European city." · "A girl sitting comfortably on the couch while engaging with her device." · "A couple of travelers discussing a map in front of a seaside town" · "Woman's hand holding a phone running the Babbel language learning app". These are good — scene-level, and the last one names the product in the image.
- **But many key images have empty alt** `[observed]`: the three homepage benefit-block images (two of three), the Babbel Method icons (`Medal.svg`, `Lightbulb.svg`, `Users.svg`), the five CEFR tier icons, the `Babbel Videos` card image, the award badges (`GSV_150_2025.png`, the Fast Company visual), and every image on the How-it-works page's five-step sequence. The step illustrations in particular carry procedural meaning and are unlabelled.
- **Award badge alt is inconsistent** `[observed]`: `DPOK Winner 2024` has alt; the GSV and Fast Company badges do not. Same component, two treatments.
- **Social and store links render as bare URLs as their accessible text** `[observed]`: `https://www.facebook.com/babbel.languages` with `title="facebook"`. The title attribute carries the label; the link text is the URL. Screen readers may announce the full URL.
- **Trustpilot widget renders as an empty link** `[observed]`: `[](https://www.trustpilot.com/review/babbel.com "Trustpilot")` — no link text, label only in the title attribute. Appears twice.
- **Responsive duplication** `[observed]`: the header `Sign up`/`Log in` pair renders four times on the homepage and the language picker twice; the Method page renders the Log in/Sign up pair four times. Screen-reader users may encounter the auth links repeatedly.
- **Speech recognition is opt-in with a stated purpose** `[documented]`: step 5 of onboarding is `Turn on speech recognition` — "Enable your device's microphone". Microphone permission is framed as a learning step rather than a permission prompt, which is good onboarding but does mean the privacy decision is presented as a pedagogical one.
- **`Offline mode` is documented** (`Can I use Babbel offline?` → dedicated help article) — a genuine accessibility-adjacent feature for low-connectivity users, framed as convenience.
- **Nine help-centre locales** plus `Display language` control on marketing pages.

**Negative findings, recorded honestly**

1. **Two incompatible level taxonomies** — five CEFR-suffixed tiers (`Newcomer A1`…`Advanced C1`) on learning hubs vs three plain tiers (`Beginner`/`Intermediate`/`Advanced`) on the homepage FAQ, with `Beginner` denoting different ranges.
2. **Five names for the placement feature**: `Placement quiz` (title/URL), `placement test` (same article's lede), `placement quiz` (same article, next paragraph), `Take the placement quiz` (app control), `Find your level` (web control), `Take our Placement Test` (homepage CTA).
3. **`free trial` used for something that is not a trial** — `/test-babbel-for-free` offers per-lesson sampling, not time-limited full access. No trial end date, no trial cancellation article exists.
4. **Lesson length stated three ways**: `about 6 minutes` / `5 to 10 minutes (average 6)` / `around 10–15 minutes` — the last two on the same page.
5. **Expert count stated two ways**: `200+ language experts` (homepage) vs `over 150` (two other pages), with differing role lists.
6. **WCAG 2.0 AA cited as the target standard** in 2026 copy, twice.
7. **The accessibility statement names no accessibility feature** and scopes itself to the website only, excluding the app.
8. **Four CTA registers**: `Start learning` / `Try a Free Lesson` + `Try a free lesson` (same page, two casings) / `Get started now` / `Get Started Learning a Language Today`.
9. **`Take our Placement Test` CTA links to a help article**, not to the product.
10. **Four hostnames/paths for the pricing page** across footers and articles; three link targets for "the Babbel Method".
11. **en-US help index links `Contact support` to the en-GB article.**
12. **`instillment`** typo in the payments disclosure.
13. **Three FAQ questions duplicated across blocks with divergent answers**, including `Can advanced learners use Babbel too?` where one version discloses the Turkish A2 ceiling and the other does not.
14. **Homepage FAQ Q6 (`What are the subscription options?`) is an answer consisting only of a link.**
15. **`up to 80 free lessons!`** appears only on the homepage and overstates the free tier relative to "the first lesson of every course".
16. **Two five-step sequences on one page** (`How Babbel gets you speaking` and `How do I get started`) with no signposting.
17. **`Q1` of the Method FAQ asks about "the 14 Babbel languages" and lists 13 plus English.**
18. **Placement quiz available in only 4 of 14 languages**, and the ten-language gap is never stated.
19. **Empty alt on the five CEFR tier icons, the Method pillars' icons, and all five How-it-works step illustrations.**
20. **Trustpilot widget renders as an empty link**, twice.
21. **`culture bites` / `cultural insights`** and **`learning path` / `Learning plan`** — two name-pairs for two features.
22. **`forever`** used once for the Lifetime plan where every other instance says `ongoing access`.
23. **`Courses for Ukrainian refugees` filed under `Special offers`.**

---

## Transferable patterns

1. **Redefine the unachievable promise, then scope your claim to the achievable part of your own definition.** "We define fluency as successful communication in real situations, not perfection… Think of fluency on a spectrum… Babbel helps you build **conversational confidence first**, then grow into more complex language over time." Three moves: substitute a defensible definition, make it non-binary, commit only to the near end. Directly applicable wherever a product is asked to promise an outcome it cannot guarantee — financial wellbeing, security, "being protected". Condition: the substituted definition must be genuinely more useful to the user, not merely easier to hit, or it reads as evasion.

2. **Weld the plain-English label to the framework code: `Newcomer A1`.** One label serves the expert and the novice, with no tooltip and no glossary. Reusable for any standards-anchored tier — risk bands, KYC levels, compliance grades, service tiers. And pick the *gentlest available* word for the entry tier (`Newcomer`, not `Beginner`) so the second tier can have the obvious one.

3. **Coin a threshold, not a level: `conversation-ready`.** Names a point of usefulness rather than a rung on a ladder, so it can be promised concretely without implying mastery. Transfers to onboarding completeness, verification sufficiency, "ready to transact" states.

4. **Concede the self-interest, then delegate the proof.** "We can promise Babbel's courses are effective, but you don't need to take our word for it" → three named universities. And "charging for access… is as much about our values as it is about our bottom line." Admitting the commercial motive in the same clause is what makes the principled argument readable. Applies to any efficacy, security, or fairness claim.

5. **Name the two things users do instead of cancelling, and say neither works.** "Please note that **deleting the Babbel app from your device or canceling your account doesn't cancel your subscription!**" — placed *before* the procedure, in bold. Every subscription product has this failure mode and almost none pre-empts it.

6. **Give the cancellation deadline in calendar days, not hours.** "up to the day before the renewal date" is checkable against a date; "24 hours before renewal" requires knowing the renewal *time*. Cheaper to honour than it looks, and materially more legible.

7. **Disclose your own pricing-display convention and why you use it.** "we break down the total cost of our subscriptions into a monthly rate **to highlight the value of longer-term subscriptions**" — stated *after* the billing fact ("you pay the full amount for the renewal period in advance"). Fact first, convention second, motive named. Immediately reusable for any per-month-equivalent, APR-equivalent, or per-unit price display.

8. **Distinguish the interface language from the subject language in the label itself: `Display language`.** Two-word fix for a chronic ambiguity in any multilingual product, and it generalises to any product where the user's locale and the object's locale differ (currency display vs. transaction currency, for instance).

9. **Admit the accessibility gap.** "As we work towards meeting WCAG 2.0 AA standards, we recognize we are not there yet." Pair it with `Assistance` before `Ongoing Efforts`, so the user's remedy precedes the company's roadmap. Condition: name the target standard, cite a current one, and enumerate at least some shipped features — Babbel does the first and fails the second and third.

10. **Frame mistakes as the condition of use, not as failure.** `low stakes conversation activities`, `judgment-free space`, "Grow confidence to have conversations, even if with some mistakes", "Learning takes repetition over time", and `mistakes` never `errors`. Four surfaces, one register. Applies to any flow where user error is expected and frequent — form validation, retry loops, practice/sandbox modes.

11. **Disclose the weakest instance of your own product by name.** "the Turkish courses will only take you up to A2" in an answer about advanced learners. Costs one clause, prevents a churned subscriber, and buys credibility for every other claim on the page. Condition: put it on the *high-traffic* surface, not only the deep one — Babbel's own inconsistency here (the softer answer sits on the busier page) shows how the pattern degrades.

## Caveats & gaps

- **No price is recorded, and the pricing page was never reached.** Every pricing statement redirects to `my.babbel.com/prices` or `home.babbel.com/en/prices`, both behind the onboarding funnel. Plan durations (1/3/6/12-month, Lifetime), the `All languages` plan, and the monthly-equivalent display convention are documented from help articles; no figure, no currency, no tier price is observed. This is the largest single gap against the brief's pricing requirement.
- **There is no free trial to document.** The `free trial` CTA points at per-lesson free access. If a genuine time-limited trial exists (for instance via app stores), it is not documented on any inspected surface — there is no trial-cancellation article in a billing category that has five sections. The trial-to-paid funnel the brief asks about may simply not exist in Babbel's direct-sale model, and the misuse of `free trial` as a label is the finding.
- **All correction and feedback copy is `[documented]`, never `[observed]`.** Babbel documents *that* it gives real-time pronunciation feedback, end-of-lesson mistake review, and AI conversation feedback; it publishes **no feedback string and no granularity detail**. Compare Busuu (130), which specifies that incorrectly pronounced words are highlighted in red and that LLM feedback explains how to improve. For a file whose benchmark strength is "lesson guidance and correction", the substance is thinner than the brief hoped and the gap is Babbel's, not the harvest's.
- **The placement quiz itself was not taken** (out of scope per the brief). Its question types, its result presentation, and the level label it returns are unobserved. Critically, **whether the result is expressed as `Newcomer A1` or as `Beginner` is unknown** — which is the one observation that would resolve the two-taxonomy defect.
- **Goal options at signup are unpublished.** `Set a weekly learning goal` — "Choose how many lessons you want to complete each week" — but no option values are named. Same gap as Quizlet's Learn goal picker (128).
- **~30 help-article titles captured but not opened**, including the whole `Using Babbel` and `Account and settings` categories, plus `Available languages` (a starred article, and the authoritative per-language level matrix), `Babbel courses`, `Finding the right course`, `Change or repeat a course or lesson`, `Babbel Speak`, `Vocab workout (Review)`, `Grammar guide`, `Guided Conversations`, `Audio recap`, `Podcasts`, `Streak`, `Course certificates`, `Reset your progress`, `Getting started`, `Offline mode`, and all seven `Learning tips and tricks` articles. `Available languages` and `Streak` are the highest-value of these — the first would resolve the level-ceiling matrix, the second is the only named progress mechanic in the product.
- **T6 (status and state language) is genuinely thin, not under-harvested.** Babbel names `Streak`, `Course certificates`, and four review modalities, and otherwise describes progress only as "progress trackers, and handy visualizations". There are no mastery buckets, no XP, no named term states in any public copy. This is a real weakness in Babbel's content relative to Quizlet.
- **T8 (empty states) is absent** from the reachable surface.
- **`/test-babbel-for-free`, `/compare-best-language-learning-apps`, `/babbel-conversation-practice`, `/babbel-review`, `/about-us`, and the four discount landing pages were not fetched.** `/babbel-conversation-practice` is the dedicated `Babbel Speak` page and is the likeliest source of actual AI-feedback copy.
- **`/learn-spanish` was retrieved but exceeded the extraction budget**; the five CEFR tier labels and the per-tier article titles were extracted by targeted search, not by reading the page. Tier *descriptions* (if any exist beneath the labels) are unobserved — so unlike Busuu (130), **no "Completing A1 means you can…" style concrete promise was found for Babbel.** The `can do` mechanism is explained on the Method page with two example situations, but no per-level capability list was located. If one exists, it is on the per-level hub pages (`/learn-spanish/newcomer` etc.), which were not fetched.
- **Only one of fourteen language hubs inspected.** Whether the five-tier taxonomy is used identically for French, German, Turkish (which tops out at A2) etc. is unconfirmed — the Turkish hub in particular would show how a three-tier-max language is presented.
- **Terms & Conditions, Privacy Policy, Imprint, and Mobile Terms not opened.** The GDPR/Impressum-driven copy and the contractual renewal clauses are unverified; the cancellation deadline (`the day before`) is taken from the help centre only.
- **Mobile app copy not harvested**; the accessibility statement explicitly does not cover the app.
- **`Babbel for Business` / `babbelforbusiness.com` unharvested** — the B2B register would likely differ substantially.
- **No blocked domains.** `babbel.com` and `support.babbel.com` served every requested page. `my.babbel.com` was not attempted (it is the authenticated funnel).

## Sources

1. https://www.babbel.com/
2. https://www.babbel.com/the-babbel-method
3. https://www.babbel.com/how-babbel-works
4. https://www.babbel.com/learn-spanish
5. https://www.babbel.com/legal/accessibility
6. https://support.babbel.com/hc/en-us
7. https://support.babbel.com/hc/en-us/categories/200333238-Subscription-and-payments
8. https://support.babbel.com/hc/en-us/categories/19329071910290-Learning-with-Babbel
9. https://support.babbel.com/hc/en-us/articles/20202703767442-Placement-quiz
10. https://support.babbel.com/hc/en-us/articles/205600308-Babbel-subscriptions
11. https://support.babbel.com/hc/en-us/articles/205600298-Canceling-a-subscription
12. https://support.babbel.com/hc/en-us/articles/19650417983378-Pricing
13. https://support.babbel.com/hc/en-us/articles/205600328-Timing-of-subscription-payments
14. https://support.babbel.com/hc/en-us/articles/205600498-Try-Babbel-for-free
