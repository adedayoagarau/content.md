# 130. Busuu

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Language learning with community correction / CEFR-aligned courses plus peer-review social layer (14 languages; consumer + Busuu for Business + Busuu for Educators) |
| Primary URL | https://www.busuu.com/ |
| Corpus rank | 130 |
| Benchmark strength (source list) | Level setting and feedback |
| Locale / market observed | en-GB primary (`meta-og:locale: en_GB`; "Display Language: English (UK)" is first in the switcher; British spellings `Practise`, `personalised`, `recognised` throughout) with en-US help centre |
| Platform observed | Web (desktop) marketing, Zendesk help centre, how-to hub, SEO/editorial hub, premium page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR (Busuu Ltd, UK); UK `Modern Slavery Statement` in footer; no published accessibility statement found |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Partial — `/en/premium` rendered a stripped body with a visible error string and no prices; **no price is recorded**; footer link groups on marketing pages rendered as empty headings; no accessibility statement exists |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.busuu.com/ | Hero, four "Why learn" blocks, awards, business logos, footer IA |
| How our courses work | https://www.busuu.com/en/it-works/courses | **The CEFR level-promise artefact — priority source** |
| Community Corrections | https://www.busuu.com/en/how-to/corrections | **The social-feedback artefact — priority source; the richest single page** |
| CEFR proficiency levels (editorial) | https://www.busuu.com/en/languages/proficiency-levels | Bylined article; CEFR explainer and self-assessment method |
| Busuu Premium | https://www.busuu.com/en/premium | **Stripped body** — benefit list and guarantee line only; a rendering error string was served |
| Help centre index | https://help.busuu.com/hc/en-us | 6 categories + `Contact Us`, 18 promoted articles |
| Help category: Community | https://help.busuu.com/hc/en-us/categories/12823698631314-Community | 3 sections: Exercises / Friends / Leaderboard |
| What is Busuu? | …/articles/15936615354641-What-is-Busuu | Product model, efficacy study, community claim |
| What is Premium? | …/articles/16269241908497-What-is-Premium | **Three-tier comparison table — priority T10/T13 source** |
| How do I manage my subscription? | …/articles/16464509457169-How-do-I-manage-my-subscription | Billing-cycle disclosure |
| How do I cancel my subscription? | …/articles/16466204976785-How-do-I-cancel-my-subscription | **31-country carrier table — priority T10 source** |
| What is a Placement Test? | …/articles/16526383831569-What-is-a-Placement-Test | **Priority T4 source** |
| How can I move to a higher or lower level within the course? | …/articles/16529502378769-How-can-I-move-to-a-higher-or-lower-level-within-the-course | Manual level override |
| What are checkpoints and how do they work? | …/articles/16529628876561-What-are-checkpoints-and-how-do-they-work | Chapter gating |
| How can I correct other learners' exercises? | …/articles/16721992566417-How-can-I-correct-other-learners-exercises | Correction UI, `Discover`/`Friends` tabs |
| What is a Best Correction? | …/articles/16742613902993-What-is-a-Best-Correction | Social-reward vocabulary |
| Mastering language skills through speaking practice | …/articles/19367617005970-Mastering-language-skills-through-speaking-practice | **The best-specified feedback documentation in this batch** |
| What is Mistake Repair…? | …/articles/30418575225106-What-is-Mistake-Repair-and-how-can-it-help-me-learn-a-language | Error-as-material feature |

---

## T1 Navigation & IA labels

**Global nav is three items, and two of them are audience switches** `[observed]`

Header: `Learn for free` · `Log in` · a hamburger, which expands to `Log in` · `For Educators` · `For Businesses`. Rendered twice (mobile/desktop), so the extraction shows the set four times.

`Learn for free` as the primary nav CTA is the whole acquisition position in three words — it is simultaneously the value proposition and the button. Note it appears *before* `Log in`, so the unauthenticated visitor's path is privileged over the returning user's.

**`For Educators` and `For Businesses` both point off-domain** to `business.busuu.com/education` and `business.busuu.com`. Two of three nav items leave the consumer site — a B2B-forward nav on a B2C homepage.

**Footer groupings — six, and the first is a course catalogue** `[observed]`

| Group | Items |
|---|---|
| `Learn languages online` | `Learn Spanish online` · `Learn Japanese online` · `Learn French online` · `Learn English online` · `Learn German online` · `Learn Dutch online` · `Learn Italian online` · `Learn Portuguese online` · `Learn Chinese online` · `Learn Polish online` · `Learn Turkish online` · `Learn Russian online` · `Learn Arabic online` · `Learn Korean online` |
| `Discover Busuu` | `How Busuu works` · `Busuu Premium plans` · `Busuu for Business` · `Download Busuu` · `Redeem a voucher` · `Busuu Blog` |
| `Customer support` | `Contact us` · `FAQs` |
| `About us` | `About Busuu` · `Careers` · `Press` · `Partner with Busuu` · `COVID-19` · `Modern Slavery Statement` |
| `Display Language` | 16 locales |
| (legal strip) | `Terms` · `Privacy` |

Four observations.

1. **Every course link is a full sentence-fragment: `Learn Spanish online`** — verb + object + channel, fourteen times. Compare Babbel, whose equivalent footer group is bare language names (`Spanish`, `French`). Busuu's version is SEO-shaped and reads as a promise rather than a label; it also means the footer contains fourteen near-identical strings.
2. **`Customer support` holds exactly two items, and they are the same destination described two ways** — `Contact us` → `help.busuu.com/hc/requests/new` and `FAQs` → `help.busuu.com/hc/en-us`. The help centre is called `FAQs` in the footer and `Busuu Support` in its own title. See T11.
3. **`COVID-19` is still in the footer in 2026** `[observed]`, pointing to `/en/covid-19`. A stale pandemic-response page promoted to About-level IA six years on. Recorded as a content-ops defect, and the clearest one in the file.
4. **`Modern Slavery Statement`** is a UK Modern Slavery Act 2015 obligation surfaced in the footer — correct for a UK entity, and a regulatory tell that Busuu is the only UK-domiciled product in this batch.

**`Display Language` is the label for the interface switcher** `[observed]` — identical to Babbel's choice (129), and for the same reason: in a language-learning product, "Language" alone is ambiguous between the UI language and the target language. Two competitors independently landing on the same two-word fix is strong evidence the pattern is correct.

Sixteen locales: `English (UK)` (first), `English (US)`, `Español`, `Italiano`, `Français`, `Português`, `Türkçe`, `اللغة العربية`, `Polski`, `Deutsch`, `русский`, `日本語`, `中文`, `한국어`, `Tiếng Việt`, `Bahasa Indonesia`.

**A structural defect: marketing-page footers render as empty headings** `[observed]`. On `/en/it-works/courses`, `/en/how-to/corrections` and `/en/languages/proficiency-levels`, the footer groups appear as bare headings — `## Learn languages online` / `## Discover Busuu` / `## About us` / `## Download` / `## Customer support` — **with no links beneath them.** Only the homepage rendered the full footer. So four of five marketing pages ship a footer skeleton with no navigation in it (server-side), and the link lists are client-rendered. A no-JS or crawler view of most of the site has no footer navigation at all.

Note the group set also differs: the homepage has six groups; the sub-pages show five, with `Download` present and `Display Language` replaced by a `Site Language` control on one page. **Two footer variants, inconsistently populated.**

**Help centre top level — six categories, each with a scope line** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting Started` | "All you need to know to access Busuu" |
| `Account Management` | "Manage your account, activity, and subscription" |
| `Learn` | "Explore the different ways you can learn a language" |
| `Community` | "Interact with fluent speakers and learn alongside them" |
| `Review` | "Learn how to use repetition tools to enhance your skills" |
| `Busuu for Business` | "Introduce Busuu to your professional environment" |

Plus `Contact Us` as a seventh entry.

**`Learn` / `Community` / `Review` is the product's own three-part model surfaced as IA**, and it is the most informative category set in this batch: it tells you that Busuu believes learning happens in three places — in lessons, with other people, and in spaced review. Three of the six help categories are the three halves of the product.

**`Community` — "Interact with fluent speakers and learn alongside them"** is the load-bearing scope line. Note **`fluent speakers`, not `native speakers`** — a deliberate and defensible substitution (see T13), though the marketing pages use `native speakers` freely, so the discipline is help-centre-only.

**Sub-sections inside `Community`** `[observed]` — three, and they name the social mechanics:

`Exercises` (6 articles) · `Friends` (3) · `Leaderboard` (3)

So the community layer has exactly three affordances: submit/correct work, maintain a friend graph, and compete. `Friends` contains `Why do I need friends?` — a help article whose title is the user's sceptical question about a social feature, and the best-titled article in the file (see T11).

**Breadcrumbs** `[observed]`: three levels, `Busuu Support` › category › section. Every article also renders `Articles in this section` *above* the article body (as a sidebar hoisted into the flow), so the reader meets ten sibling links before the content they navigated to.

**Article foot** `[observed]`: social share row (`Facebook` / `Twitter` / `LinkedIn`) → `Was this article helpful?` with a **visible vote count** → `Have more questions? Submit a request` → `Return to top` → `Related articles`.

**The visible helpfulness scores are an unusual disclosure** `[observed]`, and they are not flattering:

| Article | Score |
|---|---|
| `What is Busuu?` | 1368 out of 1574 found this helpful (87%) |
| `What is a Best Correction?` | 65 out of 71 (92%) |
| `What is Premium?` | 599 out of 837 (72%) |
| `What is a Placement Test?` | 463 out of 584 (79%) |
| `How can I correct other learners' exercises?` | 97 out of 143 (68%) |
| `Mastering language skills through speaking practice` | 56 out of 88 (64%) |
| `How can I move to a higher or lower level…` | 379 out of 640 (59%) |
| `How do I manage my subscription?` | 157 out of 478 (33%) |
| `What are checkpoints and how do they work?` | 26 out of 68 (38%) |
| `How do I cancel my subscription?` | **1060 out of 3181 (33%)** |

Publishing raw helpfulness ratios is rare and admirable. The pattern is also diagnostic: **the two lowest-scoring articles are the two subscription-management articles (33% each)**, and the cancellation article has by far the highest traffic (3,181 votes — more than twice any other). A product whose most-read article is cancellation, and whose cancellation article satisfies one reader in three, is telling you exactly where its content fails. Recorded as the single most useful negative finding in this file.

## T2 Value proposition & headline patterns

**Hero — a three-beat noun triplet** `[observed]`

> Headline: `New language, new opportunities, new you`
> Subhead: "Get access to compact lessons from the experts and connect with a community of native speakers to help you **master words faster**."
> CTA: `Learn for free`

The headline is three noun phrases in escalating abstraction — capability → circumstance → identity — with `new` anaphora and **no verb at all.** It promises transformation without claiming to deliver a skill, which is the same evasion MasterClass performs with "Be your best" (127) but executed as a rhythm rather than a comparative.

The triplet is then reused as an animated footer motif `[observed]`: `New` / `languages` / `opportunities` / `you` repeated in a looping quote block on every marketing page. So the hero line doubles as the site's ambient slogan — good phrase economy, though the extracted markup shows it rendering as fragmented text (`Newlanguagesquotes`, `Newopportunities`, `Newyou`) which suggests a decorative animation with poor text fallback.

**The subhead's actual promise is narrow**: `master words faster`. Not conversations, not fluency — *words*. The gap between the headline's `new you` and the subhead's `master words faster` is the widest aspiration-to-mechanism gap in this batch, and it is one line.

**Four "Why learn" blocks, each with an eyebrow label, a headline, and a mechanism** `[observed]`

Section header: `Why learn a language with Busuu?`

| Eyebrow (caps) | Headline | Mechanism, summarised |
|---|---|---|
| `AN INTERACTIVE COMMUNITY` | `Learn more together` | "**Go beyond the textbook.** Practise pronunciation, gain cultural insights and exchange local language tips with our global community of learners." |
| `COURSES CREATED BY EXPERTS` | `Learn with confidence` | "**Make real improvements, get real results.** Be prepared for real-world interactions by building solid foundations with plenty of speaking, listening, reading and writing practice." |
| `IMMERSIVE SPEAKING PRACTICE` | `Learn for real life` | "**Get instant feedback for lasting confidence.** Speaking practice helps you beat speaking anxiety through personalised pronunciation feedback and immersive videos featuring native speakers." |
| `SELF-LED LEARNING` | `Learn your way` | "Whatever your reason for learning a language, we've got you covered. Learn for any goal with simplified courses and short, but focused lessons. **You're in control.**" |

**All four headlines begin with `Learn`** — `Learn more together` / `Learn with confidence` / `Learn for real life` / `Learn your way`. A four-beat anaphora on the product's core verb, with the differentiator in the adverbial tail. This is the tightest headline set in the batch and it is directly comparable to Babbel's three `Learn`-initial benefit headings (129), except Busuu carries it across four and adds the eyebrow label as a second taxonomy layer.

**`beat speaking anxiety`** is the standout phrase. Busuu names the emotional barrier explicitly — not "build confidence" (the euphemism every competitor uses) but the anxiety itself, as something to be *beaten*. It appears once, in block three, and it is the only place in this batch where a language product names the fear rather than the remedy.

**`Go beyond the textbook.`** positions against traditional instruction rather than against apps. **`Make real improvements, get real results.`** uses `real` twice in six words, and `real-world` appears in the next clause — `real` three times in one block, which is either emphatic or thin depending on charity. `You're in control.` closes block four as a three-word sentence.

**Scale claims are consistent, which is notable** `[observed]`

| Surface | Claim |
|---|---|
| Homepage | "Trusted by our global community of **120 million learners**" |
| Homepage | "Join over **120 million learners** on Busuu" |
| Corrections page | "our Community of **120 million** language learners" |
| How-it-works | "the ability to practise with **120 million native speakers** around the world" |
| How-it-works | "Level up with support from our community of **120 million learners**" |

`120 million` five times. But note the fourth instance: **"practise with 120 million native speakers"** — the same number applied to *native speakers* rather than *learners*. Since the community is overwhelmingly learners (who correct in their own native language), "120 million native speakers" is a category slip that overstates the correction pool. Recorded as a defect, and the same class of error as MasterClass's `200+` serving both classes and instructors (127).

**Awards are named with their granting body** `[observed]`: `Editors' Choice` (Google Play) · `App of the year` (App store). Two awards, two platforms, no dates. Note `App store` lowercase-s where Google Play is correctly cased.

**B2B social proof on the consumer homepage** `[observed]`: `Puma` · `DHL` · `INSEAD` · `Julius Bär` · `Uber`, under `Thinking about language learning for your business?` and the CTA `Find out how we are helping these great companies`. Five enterprise logos on a B2C homepage — consistent with the B2B-forward nav (T1). `these great companies` is the only self-congratulatory phrase on the page.

**The efficacy claim, and its unusual unit** `[observed]`

> "In 2016, we conducted an independent study with a research team from the **City University of New York and the University of South Carolina** to measure learning outcomes.
> The study found that **22 hours of study with Busuu Premium is equivalent to a college semester of language learning**, and all participants improved after learning with Busuu for 16 hours."

`22 hours = a college semester` is a far more concrete and more checkable claim than a percentage. It gives the prospective buyer a unit they already price (a semester of tuition) against a unit they can commit (22 hours). Compare Babbel's "92% of users improved their proficiency level in just 2 months" (129) — a percentage with no denominator the user can act on.

Two caveats the copy handles well and one it does not. It names both universities; it dates the study (2016); and the second clause gives a *lower* bound ("all participants improved after 16 hours") which is a modest claim rather than an inflated one. But `independent study` is asserted while the study was Busuu-commissioned — `we conducted an independent study` is internally contradictory. And note the same CUNY team appears in Babbel's citation list (129), so both products cite overlapping researchers.

**Premium page headline** `[observed, stripped]`: `Learn faster with busuu Premium` — **lowercase `busuu`** here where every other surface capitalises it. Plus `Offer ends soon!` and `Choose your plan`. `Offer ends soon!` with no date or terms is the only urgency device on the site and the only unqualified one.

**The editorial CEFR article has a byline and a reading-time slot** `[observed]`: `Barney Meekin`, `Jun 5, 2024`, and `X_MIN_READ` — **an unrendered template token in production.** The reading-time variable never interpolated. Recorded as a defect.

That article's register is markedly different from the rest of the site — first person, casual, self-deprecating: "It's a super common question", "Writing Japanese is my kryptonite", "I need to do something about my writing ability!", "**Just don't take it too seriously.**" A bylined author using their own messy proficiency profile as the worked example is a genuine content decision (see T4), and it is the only first-person-singular voice in the corpus.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Learn for free` | Header (×2), hero, mobile menu | **The primary CTA is the value proposition** |
| `Log in` | Header (×2), menu (×2) | |
| `For Educators` / `For Businesses` | Menu | Off-domain audience switches |
| `Get started` | Homepage, mid-page conversion block | |
| `Sign in` | Corrections and how-it-works pages | **A second label for `Log in`** — inconsistent |
| `Start learning for free` | Proficiency-levels article, ×2 | Four words |
| `Get started for free` | Proficiency-levels article | **A third free-CTA variant on one page** |
| `Get started` | Proficiency-levels article | Fourth variant |
| `Start learning now` | How-it-works hero | |
| `Correct an exercise` | Corrections page hero | **Names a community action, not a signup** |
| `Upskill your team` | B2B insert, ×2 | |
| `Find out how we are helping these great companies` | Homepage B2B block | Longest CTA; 8 words |
| `Choose your plan` | Premium page | |
| `Redeem a voucher` | Footer | |
| `Download Busuu` | Footer | |
| `Submit a request` | Help centre header and every article foot | |
| `Was this article helpful?` → `Yes` / `No` | Every article | With visible vote counts |
| `Return to top` | Every article | |
| `Follow` | Every article | **Requires sign-in** — "Opens a sign-in dialog" |
| **Documented in-product controls** | | |
| `Cancel Premium` | Settings › Subscription | **Says "Cancel", not "Manage"** |
| `Cancel anyway` | Cancellation confirm, after the reason survey | **See T10 — the most loaded confirm label in this batch** |
| `Manage subscription` | App, Me tab › Settings | Neutral container, app only |
| `Take Placement Test` | Settings (web) and Me › Settings (app) | Consistent across platforms |
| `Levels` | Dashboard, beside the progress bar | |
| `Change course` | *(Babbel's label — not observed for Busuu)* | — |
| `Settings` | Profile dropdown (web) and Me tab (app) | |
| `Subscription` | Settings tab | |
| `Discover` / `Friends` | Community section tabs | The two correction queues |
| `Best Correction` | Button above a corrector's comment | |
| `Speak` | App tab grouping speaking-practice lessons | |
| `Learn` | Lesson-timeline tab (implied) | |
| `Me` | App profile tab | |

**Observations.**

1. **`Learn for free` is doing three jobs at once** — nav CTA, value proposition, and objection-handler (the product is freemium and says so in the button). It appears four times per homepage render. This is the most efficient primary CTA in the batch.
2. **Four variants of the free-signup CTA on a single page**: the proficiency-levels article carries `Start learning for free` (×2), `Get started for free`, and `Get started`. No CTA style guide is enforced — the same defect as Babbel (129).
3. **`Log in` vs `Sign in`** — two labels for one action across the marketing pages.
4. **`Correct an exercise` as the hero CTA of the corrections page** is the standout: the conversion action offered to an unauthenticated visitor is *to help someone else*, not to start learning. Reciprocity as the acquisition hook.
5. **`Cancel anyway`** — see T10. It is the one label in this file that is straightforwardly adversarial.
6. **`Cancel Premium` (web) vs `Manage subscription` (app)** — the web control names the destructive action, the app hides it behind a container. Platform-inconsistent, and the weaker pattern is on the platform where most users subscribe.

## T4 Onboarding, level-setting and instructional scaffolding — PRIORITY

Busuu has **the most explicit CEFR level-setting in this batch** and the most concrete level-to-promise translation. Three mechanisms: a Placement Test, chapter-end `checkpoints`, and a manual `Levels` override.

### The CEFR translation — the priority artefact, and it is exemplary `[observed]`

From `How our language courses work`:

> "Each language course on Busuu is developed using the **Common European Framework of Reference** (CEFR), an internationally recognised standard for creating language lessons. The CEFR is broken down into **six stages, ranging from complete beginner to completely fluent.** Busuu's language courses all cover the **first four stages of the CEFR, from A1 to B2 level.** Busuu's English course also covers the level above B2, C1."

Three moves in one paragraph: name the framework, gloss its range in plain language (`from complete beginner to completely fluent`), then **disclose exactly how much of it the product covers** (A1-B2, plus C1 for English only). Naming your own ceiling — four of six stages — in the opening paragraph of your pedagogy page is a disclosure against interest, and it is the same practice as Babbel's Turkish-A2 admission (129) but placed far more prominently.

Then the translation itself. **Five levels, each with a plain-English name, a CEFR code, and a bulleted list of concrete capabilities.** This is the single best artefact in this batch for the brief's question about turning an abstract framework level into a user promise:

**`Completing Beginner A1 means you can:`**
- "introduce yourself to new friends, order a drink and some food in your new language"
- "ask and answer simple questions on familiar topics"
- "write short texts and fill in a form with personal details."

**`Completing Elementary A2 means you can:`**
- "make plans to go out with friends"
- "describe your friends and family"
- "understand the main point of simple texts and conversations"
- "begin to have longer conversations on familiar topics."

**`Completing Intermediate B1 means you can:`**
- "describe your favourite films and music, express emotions"
- "agreement and disagreement, begin to understand TV programs when the topic is familiar"
- "have more complex conversations where you give reasons and explanations."

**`Completing Upper Intermediate B2 means you can:`**
- "discuss important issues that affect your life"
- "understand the main point and important details in the news"
- "take part in extended conversations on familiar and new topics"
- "narrate or write a story"
- "describe the plot of a film or a book."

**`Completing Advanced C1* means you can:`**
- "speak fluently without too much repetition or hesitation"
- "understand conversations about social, professional and academic topics, like religion or cultural beliefs"
- "Write challenging and lengthier passages, showing understanding euphemisms and idiomatic language"
- "form well-structured arguments."

With the footnote: "*C1 course content only available for English on Busuu"

**Seven things make this the reference implementation.**

1. **The sentence frame is `Completing <Level> means you can:`** — not "At this level you will learn" or "This level covers". It is **past-tense completion → present-tense capability**, second person, with a colon. The user is told what they will be *able to do*, tied to a *completion event*. That frame is the reusable asset.
2. **The capabilities are situations with objects, not competences.** `order a drink and some food`, `make plans to go out with friends`, `describe your favourite films and music`, `describe the plot of a film or a book`, `narrate or write a story`. Every bullet names a thing a person actually does with another person. Compare Babbel's two examples (`ordering a meal in a restaurant`, `introducing yourself to a new friend`) — the same instinct, but Babbel offers two illustrations where Busuu offers nineteen mapped to five tiers.
3. **The progression is legible bullet-to-bullet.** A1 `ask and answer simple questions` → A2 `begin to have longer conversations` → B1 `more complex conversations where you give reasons and explanations` → B2 `extended conversations on familiar and new topics` → C1 `speak fluently without too much repetition or hesitation`. One thread (conversation length and complexity) traced across five levels. A user can locate themselves on that thread without a test.
4. **The hedges are inside the capability statements, not appended.** `begin to have longer conversations` (A2), `begin to understand TV programs **when the topic is familiar**` (B1), `without **too much** repetition or hesitation` (C1). Each level's promise is bounded in its own words rather than by a disclaimer.
5. **The plain-English names are the standard five** — `Beginner` / `Elementary` / `Intermediate` / `Upper Intermediate` / `Advanced` — and note `Elementary` for A2 where Babbel uses `Beginner A2` and `Newcomer A1` (129). Busuu keeps `Beginner` for A1, which is the more conventional mapping; Babbel's `Newcomer` is the more thoughtful one. Both put the plain name *before* the code.
6. **The ceiling is footnoted at the point of the claim** — the C1 block carries the asterisk and the footnote sits immediately below, rather than at the page foot.
7. **B2 is where the list gets longest** (five bullets vs three or four), which correctly signals that Upper Intermediate is the broadest jump — and B2 is Busuu's terminal level for thirteen of fourteen languages, so the most-detailed promise is attached to the product's actual endpoint.

**Defects in the block, recorded honestly.** The B1 bullets are malformed: "describe your favourite films and music, express emotions" and then "agreement and disagreement, begin to understand TV programs…" — the second bullet opens with a bare noun pair that has lost its verb (it should presumably read "express agreement and disagreement"). So the B1 list has a broken bullet and an orphaned fragment. The C1 list has a capitalisation break (`Write challenging…` mid-list where siblings are lowercase) and a grammatical slip ("showing understanding euphemisms" for *understanding of euphemisms*). And `TV programs` uses the US spelling in an otherwise en-GB page (`favourite`, `Practise`, `personalised` elsewhere). **The most valuable content block on the site is also the least copy-edited** — four errors in nineteen bullets.

### The Placement Test — named, timed, scoped, and consequence-disclosed `[documented]`

> "Take the Placement Test to assess your current language knowledge. **It only takes 5 minutes and covers various language skills.** At the end, you'll receive a **suggested placement level.**
> **If you already have some knowledge of the language, you can decide whether to continue your Busuu course from there or start from the beginning.**"

Four things done right in four sentences: the duration (`only takes 5 minutes`), the scope (`various language skills`), the output framed as a *suggestion* (`suggested placement level`), and **the user's choice preserved** — the test recommends, the learner decides whether to accept it or start at the beginning anyway.

`suggested placement level` is the key phrase. Busuu, Babbel and Brilliant all independently arrive at *recommendation* rather than *verdict* as the output framing of a placement mechanism (129, 126). Three products, one convention.

**Retakeable, with the entry point named per platform** `[documented]`: "When you join Busuu, we'll ask you to take the Placement Test. You can also take it later or reassess your skills anytime." Web: `Profile` → `Settings` → `Take Placement Test`. App: `Me` → `Settings` → `Take Placement Test`. **The same control label on both platforms** — better than Babbel, which uses `Take the placement quiz` on app and `Find your level` on web (129).

**Availability is bounded with flag emoji** `[observed]`: available for Dutch, English, French, German, Italian, Japanese, Portuguese, Spanish — **eight of fourteen languages**. Stated as a flagged list. Better coverage than Babbel's four of fourteen (129), and disclosed the same way.

**Two consequences are disclosed, one of them twice** `[documented]`:

> "You'll need to be in a **Complete course** to be able to take the test. Please note that **completing the Placement Test won't skip or mark any previous lessons as completed.**"
> …
> "Please note that completing a Placement Test **does not skip or mark any previous lesson within your course as Completed.**"
> "Please note, completed Placement Tests **can mark vocabulary words and grammar topics from previous levels as 'mastered' (not needing review).** For instance, if you're placed at A2, you may not see words or grammar topics from A1 in your Review section, even if you've completed the associated lessons."

The near-identical "won't skip or mark… as completed" sentence appears twice in one short article — a redundancy defect. But the *third* note is genuinely valuable: it discloses a **counterintuitive side-effect** (placement suppresses lower-level items from the review queue) and illustrates it with a worked example. Users who take a placement test and then find their Review section mysteriously empty of basics now have an explanation. Disclosing a second-order consequence of an onboarding choice, with an example, is rare.

`'mastered' (not needing review)` — the scare-quoted term plus a parenthetical gloss. This is the only term-state vocabulary Busuu publishes (see T6).

### `checkpoints` — the sequencing gate, and the free-tier mechanic `[documented]`

> "In most courses, levels are divided into chapter. At the end of each chapter, you'll encounter a **checkpoint—a mini-test designed to gauge your grasp of the skills covered in that chapter.**"

`mini-test` as the gloss on `checkpoint` — a diminutive doing the same anxiety work as Brilliant's `lightweight diagnostic` (126). And `gauge your grasp` rather than "assess your knowledge".

**The dual function is stated plainly** `[documented]`: "With a Premium account, you can skip lessons or chapters as you wish. If you're using a **free account, you can take checkpoints to both assess your skills and unlock new lessons.**"

So a checkpoint is an *assessment* for paying users and a *gate* for free users. The copy names both roles in one sentence, which is more honest than Brilliant's equivalent (where the sequencing gate is justified on pedagogical grounds and sold as a Premium feature in separate articles, 126).

**What a checkpoint unlocks is enumerated** `[documented]`:
- "All lessons within its chapter (if they were previously locked)"
- "The first lesson of the subsequent chapter"
- "The checkpoint for the next chapter (if you wish to continue skipping lessons)"

Three specific unlocks, including the recursive one — a free user can chain checkpoints to skip continuously. Documenting the exploit is candid.

**A coverage caveat with a visible grammatical error** `[documented]`: "not all courses are split into chapter. If the course you're studying doesn't include chapter and checkpoints, you'll see one chapter for the entire level." **`chapter` used as an uncountable noun three times** in this article (`divided into chapter`, `split into chapter`, `include chapter`). A consistent grammatical defect, suggesting a find-and-replace from a different term.

### Manual level override `[documented]`

> "**Free account learners go through lessons in sequence, starting from the first.** You can go back to a previous lesson or chapter you've already taken at any time.
> If you have a **Premium account, you can go backwards and forwards between lessons and chapters as you please.**"

Then the procedure: scroll to the top of the dashboard → the progress bar and **`Levels`** button (or the current level) → select → "Choose your new level from the options provided."

And the reassurance, which is the best line in the article: **"Don't worry, changing levels doesn't erase your progress. You can always return to a previous level, and your progress will be waiting for you."**

`your progress will be waiting for you` is warm without being saccharine, and it answers the actual fear (that switching levels is destructive). Note this article scores **59% helpful (379/640)** — the copy is good but something about the flow is not landing.

### Onboarding sequence `[documented]`

From `What is Busuu?`, four bullets under "Here's how it works":

- **`Free or Premium:`** "Sign up and study for free, or subscribe to Premium for additional features and special courses."
- **`Choose your language:`** "Select the language you want to learn and start your lessons."
- **`Cover the four skills:`** "Our courses teach **reading, writing, listening, and speaking**, from beginner to advanced levels."
- **`Practice and correction:`** "Complete spoken or written exercises and **get corrections from our dedicated Community of native speakers.**"

Four steps, and the **fourth is the community** — correction is presented as a step in the onboarding model, not as an optional social feature. Note the four skills here are the canonical CEFR four (reading, writing, listening, speaking), unlike Babbel which substitutes grammar for reading (129).

**Course structure, five named properties** `[documented]`:

| Property | Copy |
|---|---|
| `Focused learning:` | "Each lesson revolves around a specific topic, like introducing yourself or ordering food in a restaurant." |
| `Bite-sized lessons:` | "Our lessons teach useful, everyday language in manageable chunks of **3–5 minutes**." |
| `Developed by experts:` | "created by language experts who apply effective teaching principles" |
| `Fun and engaging:` | "videos of real people, interactive exercises, audio recordings, conversations with native speakers, and more" |
| `Aligned with CEFR:` | "Each language course follows the Common European Framework of Reference (CEFR), a recognized standard" |

`3–5 minutes` is the tightest lesson-length claim in this batch (Babbel: 6 min / 5-10 / 10-15, inconsistently — 129). Note the homepage image alt says "Speak a language in **10 minutes a day**", so the session claim is 10 min and the lesson claim is 3-5 — compatible, and a rare case of two time claims that reconcile.

**AI is positioned as scaffolding, with the whole loop named** `[documented]`:

> "Your experience begins with a **Placement Test** to start you at the correct level and continues with popular **grammar and vocabulary review tools** that are available along the way… To chart your progress and test your knowledge, we offer **checkpoint quizzes. You'll know exactly where you are and what you need to focus on to reach your goals.**"

Placement → review tools → checkpoints, described as one continuous scaffold, ending on the user benefit stated as two knowns (`where you are` / `what you need to focus on`).

### The CEFR self-assessment method — a second, teacherly level-setting route `[observed]`

The editorial article teaches the user to self-assess *without* the product, using the official CEFR grids:

> "The levels are based on **can-do descriptors.** Assessing language proficiency is as easy as matching can-do statements to a level."
> "you should use the **CEFR self-assessment grid** which is much more detailed and nuanced."
> "go along each of the five rows and select the can-do descriptor that best matches what you can do. Keep checking off boxes until you hit the correct level… **At some point you'll find a can-do descriptor you can't do. Stop here. The previous box is your level.**"

`Stop here. The previous box is your level.` — two short sentences teaching a procedure. And the article **actively advises against** the simpler tool: "we don't recommend you use the global scale to figure out how well you're doing."

Then the honesty about the framework's limits, which is unusual for a company whose product is built on it:

> "Learning a new language involves a bunch of different skills that will develop at their own pace. **It's unrealistic to expect all language learners to fit neatly into these levels.**"
> "**All of this is fine.** Language learning isn't always a smooth process so it makes sense that your proficiency might be a bit messy. **The CEFR is just a guideline.**"
> "No matter what the grid says, **it can never be a 100% accurate representation of your language learning.** … **Just don't take it too seriously.**"

And the worked example is the author's own uneven Japanese, given per skill with reasons: `Listening: C1` · `Reading: Between B1 and B2` · `Spoken interaction: Between B2 and C1` · `Spoken production: B2` · `Writing: B1`. **Three of five entries are ranges, not levels** (`Between B1 and B2`), which is the point — the article's thesis is that a single level number is a fiction, demonstrated on the author.

**This is the most sophisticated level-setting content in the batch**, and it sits on a *marketing* page whose job is to sell a levelled product. Busuu tells prospective buyers that its organising framework is approximate, then sells them a course built on it. That is a defensible and rather brave position: it inoculates against the "I finished A2 but I can't speak" complaint before the user subscribes.

## T5 Form & field labels

Minimal pre-auth form surface; signup is at `/en/register` and `/en/choose-your-language`, neither entered.

**Observed** `[observed]`:
- `Display Language:` / `Site Language` — **two labels for the interface switcher** on two different page templates
- `I want to learn` — the homepage language-picker heading, rendered as a bare `## I want to learn` with no options in the server HTML (client-rendered)
- `I want to learn...` — the same prompt on the proficiency-levels article, with fourteen language links as the options

**Documented in-product labels** `[documented]`:

| Label | Context |
|---|---|
| `Settings` | Profile dropdown (web), Me tab (app) |
| `Subscription` | Settings tab holding cancellation |
| `Manage subscription` | App settings |
| `Take Placement Test` | Settings, both platforms |
| `Levels` | Dashboard, beside progress bar |
| `Complete course` | The course type required for placement |
| `Discover` / `Friends` | Community tabs — the two correction queues |
| `Speak` | App tab grouping speaking-practice lessons |
| `Review` | The spaced-repetition section |
| `Best Correction` | Award button above a comment |
| `Corrections` / `Likes` | Profile award counters |

**The correction form is documented as two text boxes with explicit roles** `[documented]` — the most useful field-level documentation in this file:

> "When it's time to give feedback, you'll see **two text boxes**:
> - In the **first box**, you'll find the learner's exercise. Feel free to make changes right in this box. **Your corrections will show up in green**, making them easy for the learner to spot.
> - The **second box is all yours**—a space for your comments. This is where you can offer words of encouragement or provide additional context and information."

Two boxes, two jobs: *edit the text* and *explain yourself*. Separating the correction from the commentary is the core design decision of the whole feature, and the copy names it in two bullets. `The second box is all yours` is a small piece of warmth doing ownership work.

**Green as the correction colour** `[documented]`, stated twice ("Changes you make will show in green" / "Your corrections will show up in green"). Note this is the inverse of the usual convention — in most editing tools green means *accepted* and red means *changed*. Busuu uses green for *the corrector's additions*, which reads as constructive rather than as error-marking. Deliberate, and the right call for a peer-feedback context where red ink is the thing learners fear.

Contrast the speaking-practice feedback, where **"Words pronounced incorrectly will be highlighted in red"** `[documented]`. So **red marks machine-detected error; green marks human-offered improvement.** Two colours, two sources of feedback, and the harsher colour is reserved for the machine. Whether or not deliberate, it is a coherent semantics — and it is a genuine accessibility concern, since both are colour-only signals (see T14).

**A star rating is part of the correction form** `[documented]`: "You should then award the person you are correcting a **star rating.** You can give them up to **five stars** depending on how well they have done." So written corrections carry three outputs: inline edits, a comment, and a 1-5 star score.

**Spoken-exercise controls** `[documented]`: a hold-to-record button ("select and hold the record button at the bottom of the screen"), a translate button, a repeat button (`↻`), and side-by-side playback ("listen to your recording and the fluent speaker's recording side by side to compare and contrast before trying again").

**A suggested word count is given as scaffolding** `[documented]`: "We always give you **a tip and a suggested word count** to help you along, but we recommend that you try to construct your answers **without looking at the tip.**" Scaffolding offered *and* discouraged in one sentence — the hint exists but the copy tells you not to use it. Unusual and pedagogically sound.

## T6 Status & state language

**Progress vocabulary is thin and mostly borrowed from the community layer** `[documented]`

Named progress objects across all inspected surfaces:

| Term | What it is | Source |
|---|---|---|
| `progress bar` | Dashboard element beside `Levels` | Level-change article |
| `checkpoint` | Chapter-end mini-test | Checkpoints article |
| `streak` | Consecutive-day counter | `Protect your streak` (Premium table); `streak shield` article title |
| `streak shield` | Consumable protecting a streak | Premium table, linked article |
| `Busuu Certificates` | Level-completion credential | Premium table; `Official Busuu Certificates` |
| `level completion tests` | The certificate trigger | Premium page copy |
| `mastered` | Term/grammar state, scare-quoted and glossed | Placement Test article |
| `points` / `stars` | Leaderboard currency | `How do I get points or stars?` (title only) |
| `Leagues` | Competitive cohort | `What are Leagues?` (title only) |
| `leaderboard` | The ranking surface | `What is a leaderboard?` (title only) |
| `Corrections` / `Likes` / `Best Correction` | Profile award counters | Best Correction article |
| `Study Plan` | A commitment/scheduling object | How-it-works |

**`'mastered' (not needing review)`** is the only term-level state published, and it appears only as a side-effect disclosure in the Placement Test article — not as a progress display. Busuu has no equivalent of Quizlet's `Not Studied` / `Still Learning` / `Mastered` triplet (128). **This is the weakest progress-state vocabulary in the batch alongside Babbel's** — and like Babbel, it is a genuine content gap rather than a harvest failure: three help articles about leaderboards, points and Leagues exist but none was opened, and the marketing pages describe progress only as "Progress you can see" (an image filename) and "chart your progress".

**`Protect your streak`** as the Premium-table row label `[observed]` — the benefit is named as a *defensive* action rather than as a feature (`streak shield`). Compare Brilliant's `Streak Charge` (126), which names the consumable. Busuu names the outcome; Brilliant names the object.

**The `Study Plan` carries a quantified motivational claim** `[observed]`: "Busuu's **Study Plan** also helps you keep on top of your learning – **the simple act of creating on makes it 5x more likely that you'll achieve your goals!**" Note the typo (`creating on` for *creating one*) and the unsourced `5x` figure — the only unattributed statistic on the site, and it sits in the same paragraph as a typo. Recorded as a defect.

**Certificate states** `[documented]`: `level completion tests` → `Busuu Certificates`. Two related article titles surface the failure state: `I have not received my Certificate.` (note the terminal full stop — the only article title with one) and `I failed my level completion test. Can I retake the test to get a Certificate?` — **the only first-person-confession title in Busuu's help centre**, and it is about failing a test. Wise-style register, used exactly once, at the one moment a learner has genuinely failed something.

**Subscription states** `[documented]`: "When you cancel, your Premium plan **won't renew for the next period and you won't pay again. You can still use Busuu Premium until your current subscription runs out.**" Three facts: renewal stops, billing stops, access continues. And `expiration date` / `renewal price` are named as fields that "can only be accessed from the platform where you purchased your subscription."

**Tier states** `[observed]`: `Free` · `Premium` · `Premium Plus` — and each is given a *purpose* rather than a feature summary in the comparison table (see T10/T13).

**Feature-availability states** `[documented]`, used consistently as a footnote marker: "¹ Available in selected languages, levels, and on certain devices." Five of thirteen Premium rows carry the superscript. Bounding feature availability with a single reusable footnote, applied per-row, is clean.

**Platform-rollout states** `[documented]` — `Mistake Repair` is disclosed as iOS-only with a stated roadmap: "**Mistake Repair is available now on the iOS version of Busuu**… Don't have an iOS device? **Stay tuned for future launches of Mistake Repair on Android and the web.**" `Stay tuned` is the only breezy phrase in the help centre.

## T7 Error, failure & recovery — PRIORITY (correction and feedback wording)

This is Busuu's strongest category and the reason it is in the corpus. There are **three distinct feedback systems** — community correction, AI pronunciation feedback, and mistake-harvesting — each with its own vocabulary, and the community one solves a content problem no other product in this batch faces.

### Community Corrections — how social feedback is framed `[observed]`

**The feature name does the first piece of work.** `Community Corrections` — *Community* (not "peer", not "native speaker", not "social") plus *Corrections* (not "feedback", not "review"). The noun pair sets the expectation that correction is a communal obligation rather than a service.

**The pitch to the person receiving correction** `[observed]`:

> "One of the most popular and important aspects of Busuu is the ability to interact with our Community of 120 million language learners through Community Corrections. These exercises allow you to **write or speak about a topic and then get feedback from people in the Community who already know that language.** **Learning from mistakes is one of the most important steps in language learning** and our Community can help you improve your language skills faster."

`people in the Community who already know that language` — a careful periphrasis avoiding both "native speakers" (inaccurate) and "experts" (overclaiming). And the mistake framing is positioned as pedagogy before the mechanic is explained.

**Routing is a user choice** `[documented]`: "You can let our **matching algorithm** select suitable learners to send your exercises to, or you can choose to send them to people from your own **list of friends**." Algorithm or friends — the same `Discover` / `Friends` split that appears on the correcting side.

**The reciprocity ask, and how it is softened** `[observed]`:

> "And, as part of the Busuu Community, **we ask you to help others** by giving them feedback on their Community Corrections exercises in the language(s) you know. **Help us break down language barriers** by helping others improve their language skills while you improve yours."

`we ask you` (not "you must", not "please consider") and `Help us break down language barriers` — a mission frame for an unpaid labour request. Then immediately, the release:

> "`Why should I give a Community Correction?`
> **Giving Corrections is completely voluntary and you don't have to do it.** However, our learners tell us that once they've started giving Corrections, they get a lot of benefits from it, including **more friends in the Busuu Community, increased confidence in their own abilities and a sense of satisfaction from helping others out.** **We recommend that you at least give it a try!**"

**This is the best-designed paragraph in the file.** The structure is: state the obligation is zero → cite peer testimony rather than company claim ("our learners tell us") → name three specific non-monetary returns → make a minimal ask ("at least give it a try"). Naming `increased confidence in their own abilities` as a benefit of *correcting* is the insight — the corrector gains from teaching, and the copy says so.

**Language eligibility is self-declared and bounded** `[documented]`: "We only ask you to correct others in **languages that you have told us that you know well.** You can adjust the settings in your Busuu profile to tell us **which languages you speak to which level.**" So the correction pool is self-certified, and the copy is careful to say `you have told us` — attributing the claim to the user, not to Busuu.

**The correction guidance — six rules for written work, and they are all about the reader's feelings** `[observed]`

Under `Some guidance on how to write useful Corrections:`

1. "Try to correct any spelling or punctuation mistakes by editing the text."
2. "You can edit grammatical mistakes in the text too, plus it can be helpful to explain the mistake (and how to avoid making it) in more detail in your comments."
3. **"Remember that the person you are correcting won't be fluent in your language and will struggle to understand complex explanations. Try to write short, simple sentences rather than long, complex explanations."**
4. **"Try to include an encouraging comment in your feedback, especially if you've corrected a lot of mistakes. Making mistakes is a vital part of learning a new language, but learners can sometimes be discouraged by them. Remind the person you are correcting that they are doing a great job of improving their writing skills!"**
5. "Sometimes learners will write something that is **grammatically correct but still sounds unnatural.** Feel free to suggest more natural ways of saying things."
6. "Remember there are sometimes **alternate ways of writing or spelling something.** For example, some regions of the world will use different words for the same thing. **Differences in usage are not necessarily incorrect**, but it can sometimes be helpful to point them out."

**Busuu is writing a tone-of-voice guide for its users.** That is the unusual content problem the brief asks about, and this is the answer: when the feedback is produced by strangers rather than by the product, the product must teach the register. Four of six rules are about *how to say it* rather than *what to correct*:

- Rule 3 is a **plain-language instruction** — write simply, because your reader is a learner of your language. A product telling its users to simplify their prose, with the reason given.
- Rule 4 is an **emotional-labour instruction** with the mechanism spelled out (corrections discourage; encouragement offsets) and a scaling rule (`especially if you've corrected a lot of mistakes`).
- Rule 5 introduces the **naturalness-vs-correctness distinction** — that a sentence can be grammatical and still wrong.
- Rule 6 is a **descriptivism instruction**: "Differences in usage are not necessarily incorrect." Busuu pre-empts regional-variant policing between its own users, which is the single most predictable source of bad corrections in a global community.

**The spoken-correction guidance is even more restrictive** `[observed]`, under `Some guidance on how to record useful Corrections:`

1. **"Don't feel you have to correct every mistake you hear."**
2. **"Pick one or two of the most significant mistakes and focus on those."**
3. "If the speaker pronounces a word or a sound incorrectly, **try to provide a model of the correct sound** in your recording. For example, you could say: *Hi Sam. When you say the word "this" try to keep the vowel sound short: "this", not "thees".*"
4. **"Listen out for pronunciation problems that affect the speaker's ability to be understood by others. Simply speaking with an accent is not a problem that needs correction."**
5. "If the speaker is more advanced and isn't making any noticeable pronunciation errors, you can focus on more subtle issues like the way they stress words, their intonation, their word choice and grammar."
6. "Remember to keep your Correction simple and short. **Try to speak more slowly than your natural speed**, as the person you are correcting won't be fluent in your language."
7. "Try to be **motivating and offer encouragement** as well as correction."

Three standouts.

- **Rule 4 is a policy statement disguised as advice: "Simply speaking with an accent is not a problem that needs correction."** Busuu draws a line between *intelligibility* and *accent* and puts intelligibility on the correctable side. That is a substantive linguistic and ethical position, stated in eleven words, in a help article. It is the most quotable sentence in this file.
- **Rule 3 supplies a scripted example correction**, including the learner's name and a minimal-pair demonstration (`"this", not "thees"`). Showing the corrector a model correction — with the right length, the right specificity, and a greeting — teaches by demonstration rather than by rule. And the model *opens with the learner's name*, which is the social move the rules elsewhere only imply.
- **Rules 1-2 instruct the corrector to under-correct.** "Don't feel you have to correct every mistake" / "Pick one or two of the most significant". A product asking its volunteers to do *less* is counterintuitive until you notice the rule protects the recipient, not the corrector's time.

Rule 6 asks the corrector to **speak more slowly than natural** — an accommodation instruction for an audio medium, with the reason attached.

**Thanking is a named, awarded action** `[observed]`

> "`How do I thank people for giving me a Community Correction?`
> You can give any Correction a **thumbs up** to say thanks, and you can also give one the **Best Correction** award. If you would like the same person to give feedback on a future exercise, you can **request that they become a friend.**"

Three reciprocity affordances of escalating weight: thumbs up → `Best Correction` → friend request. And `Best Correction` gets its own help article:

> "A **Best Correction** is a great way to say thank you. You can get one for giving the **most helpful response** to another learner's exercise. Plus, you can give them out, too! Give a Best Correction as a thank you to fellow learners who spend their time helping you. It's a way of **cheering each other on** and helping fellow learners get better at your native language.
> Along with **Corrections** given and **Likes**, you can see someone's awards on their profile—**it's a great way to find a study buddy!**"

`cheering each other on` and `study buddy` are the two warmest phrases in the corpus, and both appear in the community documentation — the register warms measurably when the subject is other people. Note the reciprocal framing in "helping fellow learners get better at **your** native language" — the corrector's own language is reframed as the thing being improved.

**Queue priority is disclosed, and it is a paid advantage** `[documented]`

> "Premium members of the Busuu community can send **as many Community Correction exercises as they want.** If you are not a Premium subscriber you can only send a **limited number** of exercises."
> "**Premium customers are prioritised in the queue for Corrections**, and should receive feedback fairly quickly (**sometimes within a few minutes**). **Free members of the Community may have to wait for longer** to receive a Correction."

Busuu discloses that paying users jump the queue for **volunteer labour donated by other users**. That is a genuinely awkward disclosure — free members' corrections subsidise paying members' turnaround — and the copy states it plainly rather than hiding it. Then it gives free users a workaround: "You can **maximise your chances of getting Corrections by friending more people** in the Busuu Community, and **by giving Corrections to people who speak the language you are learning.**" Reciprocity as the free-tier remedy, named explicitly.

**The escalation path out of community correction** `[observed]`

> "`Can I go beyond Community Corrections?`
> Community Corrections are **just the first step** towards speaking a new language fluently. After you've tried a couple of Corrections, we recommend **speaking practice** — these AI-powered lessons let you record your answers and give you **personalised personalised feedback** on your pronunciation… When you're feeling ready, Busuu's **Conversations** feature is the perfect way to put it all together. With an **AI partner**, you can have immersive, realistic conversations and practise responding with your new language skills. Conversations is a brilliant way to try out new words and phrases in a **judgement-free space**, building your confidence for real-world interactions."

Note the duplicated word: **`personalised personalised feedback`** — a visible copy defect in the flagship feature paragraph.

And `judgement-free space` — the British spelling of the exact phrase Babbel uses (`judgment-free space`, 129). **Two competitors, three identical words, independently chosen** to describe AI speaking practice. Both identify fear of judgement as the barrier; both name its absence as the feature. This is the strongest cross-product convergence in the batch and it suggests the phrase is doing real work.

The escalation ladder is `Community Corrections` (humans, asynchronous) → `speaking practice` (AI, per-word) → `Conversations` (AI, dialogic). Human feedback first, AI feedback second — the reverse of what most products would sequence, and consistent with Busuu's positioning.

### AI pronunciation feedback — the best-specified feedback documentation in this batch `[documented]`

From `Mastering language skills through speaking practice`:

**The method is named and attributed to a named technique:**

> "Speaking practice is a series of **'listen and repeat' exercises** that involve repeating aloud what you hear, word for word, with as little delay as possible, **inspired by Alexander Arguelles' shadowing technique.**"

Citing a named pedagogical technique and its originator in consumer help copy is unusual.

**Five components listed, and each names a specific affordance** `[documented]`:

- "A full-screen, high-quality video of a fluent speaker saying a word or phrase for you to watch and listen to"
- "A 'record' function so you can repeat the word or phrase, **mimicking the fluent speaker's pronunciation**"
- "**Immediate feedback that highlights the word(s) needing more practice** (available in our English, Spanish, French, and German Complete courses in all interface languages)"
- "The ability to **listen to your recording and the fluent speaker's recording side by side to compare and contrast** before trying again"
- "**Clear, useful, and actionable AI-generated, large language model (LLM) feedback** on the pronunciation in the recording (available in our English and Spanish interface languages)"

**Two feedback tiers, disclosed with different availability** — word-level highlighting (four languages) and LLM explanatory feedback (two interface languages). Busuu names the technology (`large language model (LLM)`) in user-facing help copy, which almost no consumer product does.

**The feedback mechanics, stated concretely** `[documented]`:

> "You'll instantly receive feedback in **two different ways:**
> - **Words pronounced incorrectly will be highlighted in red** (Complete English, Spanish, French, and German courses)
> - **Detailed pronunciation feedback explaining how to improve the incorrect pronunciation in the audio** (LLM-powered feedback currently only available in the Complete English and Spanish courses)"

`highlighted in red` at word granularity plus `explaining how to improve` — this is the specificity Babbel's equivalent documentation lacks entirely (129). A content designer can see exactly what the learner sees.

**A retry allowance with an escape** `[documented]`: "You have a total of **three attempts to get it right**, or you can simply **continue to the next exercise.**" Three tries, then a no-penalty exit. Naming the allowance *and* the escape in one sentence.

**The accent-tolerance policy, stated twice and in detail** `[observed]`

> "Our videos contain speakers with different native accents, but **don't worry—you don't have to mimic the perfect accent to pass the exercise.** The model we use is **trained on many varieties of each language and considers different ways of saying certain words.** Learners are encouraged to **mirror the speech of the native speakers** in the video, as paying attention to the **rhythm and tone** of the speech helps you produce the words authentically, **without your accent affecting your score!**"

This is the same position as the community-correction rule 4 ("Simply speaking with an accent is not a problem that needs correction"), applied to the machine. **Busuu states an accent-neutrality commitment for both its human and its algorithmic feedback**, and for the algorithm it explains the technical basis ("trained on many varieties"). For a speech-recognition product this is the highest-stakes fairness claim available, and Busuu makes it explicitly, twice, on the same page it documents the scoring.

**Consent is a named precondition** `[documented]`: "Once you **opt in to receiving targeted pronunciation feedback**, you're ready to go!" An opt-in for feedback, not just for the microphone.

**Access is ungated by sequence** `[documented]`: "**Unlike other lessons, you can access speaking practice without unlocking the previous ones.** Simply scroll to find a speaking practice lesson and give it a go!" Speaking practice is exempt from the sequential gate — the one skill most learners avoid is the one made most reachable.

Note this article scores **64% helpful (56/88)** despite being the best-documented feature in the file — plausibly because the availability matrix (four languages for one tier, two interface languages for the other, iOS-only for related features) is genuinely hard to parse.

### `Mistake Repair` — errors as generated curriculum `[documented]`

> "**Mistake Repair** is a personalized tool that helps you learn more effectively by **gathering your mistakes from lessons you've already completed and building practice exercises from them.**
> By **revisiting and correcting your mistakes**, you'll reinforce what you've learned, build stronger grammar, and make faster progress."

`Mistake Repair` — a two-word compound naming the error and the remedy. `Repair` is the interesting half: not "review", not "practice", not "fix" — *repair* implies something broken that can be made whole, which is a more agentive frame than review. And note the localised names visible in the URL slugs are all *different* metaphors: German `Fehler-Bootcamp` (error bootcamp), Spanish `Repaso de errores` (error review), French `Révision des erreurs`, Turkish `Telafi Alanı` (compensation area), Chinese `错题巩固` (consolidating wrong questions). **Six locales, six different metaphors for one feature** — see T13.

**The mechanism is stated as a three-step pipeline** `[documented]`: "Mistake Repair **collects the mistakes** from your past lessons, **organizes and ranks them by importance**, then **creates personalized exercises tailored to you.**" Collect → rank → generate. `ranks them by importance` is the non-obvious step and naming it makes the feature legible.

**Placement in the learning flow is named** `[documented]`: "You'll find **Mistake Repair directly in your learning timeline**… It appears **in every chapter as a regular activity alongside your lessons**, so it's easy to spot and return to whenever you want to practice and improve." Error-remediation as a first-class timeline item rather than a settings-menu feature.

**Session structure, three parts** `[documented]`: "Each session gives you **a clear explanation of the grammar topic**, generates **targeted practice**, and provides the opportunity to **correct your previous errors**, helping you **turn mistakes into long-term knowledge.**"

`turn mistakes into long-term knowledge` is the thesis of Busuu's whole feedback philosophy in seven words.

**Availability is disclosed as a matrix** `[documented]`, and it is restrictive: iOS only; English learning language with English/Spanish/French interfaces; Spanish and French learning languages with English interface only. Free and Premium users "can try Mistake Repair **twice**" before needing Premium Plus.

### Error-shaped help-article titles `[observed]`

| Title | Shape |
|---|---|
| `I paid for Premium but my account didn't upgrade. What should I do?` | **First-person confession + explicit ask** |
| `I have not received my Certificate.` | First-person, terminal full stop |
| `I failed my level completion test. Can I retake the test to get a Certificate?` | **First-person admission of failure + recovery question** |
| `I found a mistake. How do I report it?` | First-person + action |
| `Lessons aren't working. How do I fix this?` | Symptom + recovery question |
| `Basic troubleshooting` | Bare noun phrase |
| `How do I report or block other learners?` | Safety action |
| `How do I delete my progress?` | Destructive action |

**Busuu is the only product in this batch that uses first-person-confession titles**, and it uses them four times — Wise's signature register (see the exemplar). Three of the four are about the product failing the user (`I paid… but my account didn't upgrade`, `I have not received my Certificate`), and one is about the user failing (`I failed my level completion test`). Note the compound construction on two of them: the confession *plus* the question the user actually wants answered (`What should I do?`, `Can I retake the test…?`). That is better than a bare confession, because it promises the answer in the title.

`Lessons aren't working. How do I fix this?` uses the same two-sentence symptom-then-question shape.

**Safety recovery is present** `[observed]`: `How do I report or block other learners?` — for a product whose core feature puts strangers in each other's work, a report-and-block article in the `Community` › `Friends` section is a necessary artefact.

## T8 Empty states

`[absent]` — no empty-state string observed or documented. The help centre has no visible search field in the retrieved markup; `/en/premium` served an error rather than an empty state; all in-product empty states (no corrections received, empty review queue, no friends) sit behind auth.

**One genuine error string was served in production** `[observed]`, on the Premium page:

> `There was a temporary error, please try again at a later time.`

This appeared where the plan/price selector should render. It is a real error string rather than an empty state, and it is worth recording as observed copy: `temporary` (a reassurance), `please try again at a later time` (a vague instruction with no timeframe and no alternative route). No support link, no retry control named, no explanation. For a string sitting on the purchase page it is notably weak — a user who cannot see prices is given no way forward. Recorded as the worst error string observed in this batch.

## T9 Notifications & system messages

`[documented]`, and the community layer makes this richer than its peers.

**Correction requests generate outbound notifications, and the article explains why** `[observed]`:

> "`Why did I get an email or push notification asking me to give a Correction?`
> **If someone requests you to give them a Correction, we will send you an email or, if you use our mobile app and have notifications enabled, a push notification.**"

A help article answering "why am I being messaged?" for a social-obligation notification is exactly right — it is the question a surprised recipient asks, framed in their voice, and answered with the trigger condition.

**The `Follow` control on help articles** `[observed]` — every article carries a `Follow` link that "Opens a sign-in dialog". Article-level subscription for updates, gated behind auth.

**Contact channels** `[documented]`: `team@busuu.com` (named in five separate articles as "our **Customer Satisfaction team**") plus a contact form at `help.busuu.com/hc/requests/new`. **`Customer Satisfaction team`** rather than "Support team" or "Customer Service" — an outcome-named team, and it appears consistently across articles.

**A closing formula appears in three articles** `[observed]`: "If you need more information, we are here to help!" / "If you're having any trouble with cancelling, we're here to help." / "If you have further questions about your subscription, our team is here to help." Three variants of one sign-off. And the cancellation article ends: "**We're committed to making your language learning journey as smooth as possible.**" — a mission sign-off on a cancellation page, which reads oddly given the `Cancel anyway` button (T10).

No toast, banner, email or push body string retrievable verbatim.

## T10 Subscription, auto-renewal and cancellation disclosure — PRIORITY

Busuu's subscription content contains **the widest cancellation-channel disclosure in this batch** (a 31-country carrier table) and **the most adversarial confirm label** (`Cancel anyway`). Its pricing is unobservable.

### Auto-renewal is disclosed with the billing-cycle range and the charge timing `[documented]`

> "When you sign up for our Premium subscription, **you'll be automatically re-billed until you decide to cancel it.** You can choose from **three different billing cycles, ranging from one to twelve months. The payment for your subscription is collected in advance**, and any changes or exceptions will be explained during the checkout process. Please note that **pricing may vary depending on the platform, active promotions, and your local currency.**"

`automatically re-billed until you decide to cancel it` is a good construction — it states the indefinite nature of the commitment and locates the off-switch with the user in the same clause. `collected in advance` matches Babbel's disclosure (129). Three price variables named (platform, promotions, currency).

`three different billing cycles, ranging from one to twelve months` is oddly imprecise — three cycles are named by their range rather than enumerated, so the user learns there are three without learning what they are.

**The guarantee and cancellation promise on the Premium page** `[observed, stripped]`:

> "Secure payments with **seven-day money-back guarantee and cancellation at any time**"

One line carrying three commitments (secure payment, 7-day guarantee, cancel anytime). Note **seven days** — the shortest guarantee window in this batch (MasterClass: 30 days; Brilliant: discretionary; Quizlet and Babbel: none stated). And it is stated only on the Premium page, which served a stripped body — so this line and `Offer ends soon!` are the only commercial terms observed on Busuu's actual purchase surface.

**A separate refund policy article exists** (`What is Busuu's refund policy?`) and was not opened, so the 7-day guarantee's exclusions are unverified.

### Where cancellation sits, and the confirm label `[documented]`

> "When you cancel, **your Premium plan won't renew for the next period and you won't pay again. You can still use Busuu Premium until your current subscription runs out.**
> You can cancel your subscription **from the platform you use to make your payment.**"

The opening two sentences are model: what stops (renewal), what stops (billing), what continues (access). Three facts, no euphemism, before any procedure.

Web procedure:

> 1. Log in and click on your profile picture at the top of your screen.
> 2. Click on **Settings**.
> 3. Go to the **Subscription** tab
> 4. Click **Cancel Premium**.
> 5. **Tell us why you're canceling** (we'd love to know how we can improve!), then finalize by clicking **Cancel anyway**. You'll see a final confirmation page.

**Four notes, and one is a defect.**

1. **`Cancel Premium` names the destructive action** — better than a neutral `Manage subscription` container. Good.
2. **Step 5 is a required reason survey**, disclosed as a step so the user knows the flow is not finished at step 4. The parenthetical `(we'd love to know how we can improve!)` is the justification, and it is doing softening work on what is in fact a retention interstitial.
3. **`Cancel anyway` is the confirm label, and it is the most loaded string in this file.** `anyway` presupposes that the user has been given a reason not to — it positions the completion of a routine account action as an act of stubbornness. Compare Quizlet's `Yes, finish canceling` (128), which frames the same click as *completing* a task the user chose. **`Cancel anyway` is the clearest dark-pattern string observed in this batch**, and it sits three steps into a flow whose article is read 3,181 times and rated helpful by 33% of readers.
4. `Click on the **Subscription** tab` — step 3 is missing its terminal full stop; steps 1-2 and 4-5 have them.

**The app procedure is weaker** `[documented]`: `Me` tab → `Settings` → scroll to Subscription → `Manage subscription`. The app has no `Cancel Premium` control documented — only the neutral container. So the platform where most subscriptions originate has the less legible path.

**A crucial scoping constraint** `[documented]`: "If you purchased your subscription **directly on the website**, you can make changes from this section." And: "specific subscription information, such as **expiration date and renewal price**, can only be accessed **from the platform where you purchased your subscription.**" Busuu tells the user that even *seeing* their renewal price may require going elsewhere — an honest disclosure of a genuinely bad cross-platform experience.

### The 31-country carrier-billing table — the standout disclosure `[documented]`

Busuu discloses cancellation routes for **five payment channels**, not three: website, PayPal, Apple App Store, Google Play, **and mobile phone provider**. The fifth is the artefact:

> "If you subscribed through your **mobile phone provider**, you can also contact the subscription partner directly using the details below, or cancel your subscription **here** [profile.busuupromotions.com]."

Then a **31-row table** of `Country` × `Support Details`, naming the carriers and giving a per-market email or URL:

Argentina (Claro) · Azerbaijan (Azercell) · Burkina Faso (Orange, MOOV) · Cameroon (Orange, MTN) · Canada (Telus) · Chile (Claro) · Congo (Orange) · Egypt (Etisalat, Vodafone) · France (Orange, Bouygues, SFR) · Georgia (Beeline) · Germany (O2, Vodafone) · Iraq (Zain, Asiacell) · Ivory Coast (MTN, Orange, MOOV) · Kuwait (Zain, Ooredoo) · Mexico (Telcel) · Morocco (Orange, Maroc Telecom, Inwi) · Nigeria (MTN) · Oman (Ooredoo, Omantel, Vodafone) · Paraguay (Claro) · Peru (Entel) · Poland (Orange, Plus, Play, TM) · Romania (Orange) · Saudi Arabia (Zain, Mobily) · Senegal (Yas, Orange) · Slovakia (O2, TM) · South Africa (Vodacom, MTN) · Spain (Masmovil, Orange) · Tunisia (Tunisi Telecom, Orange) · Turkey (TT, Vodafone) · UK (Vodafone, Three, O2, EE) · Uruguay (Antel, Claro)

**This is the most thorough cancellation-channel disclosure in the corpus so far.** Carrier billing is the hardest cancellation route in existence — the user often does not know they subscribed through their operator, and the operator's support has no knowledge of the product. Busuu publishes the market, the carriers, and a contact per market, plus a self-serve URL. Compare MasterClass, which documents four marketplaces (127), and Quizlet, which documents three (128).

**Three defects in the table.** Three rows have `-` as their support detail (Azerbaijan/Azercell, Congo/Orange, Nigeria/MTN) — **three markets where a subscribed user is given no route at all.** `Tunisi Telecom` is a misspelling of *Tunisie Telecom*. And the fallback URL (`profile.busuupromotions.com`) sits on a third-party promotions domain with no explanation of what it is, which for a user already confused about who charged them is another unexplained brand.

**PayPal is routed to PayPal's own automatic-payments help** `[documented]`: "follow these instructions to remove Busuu from your automatic payments" → `paypal.com/us/cshelp/article/what-is-an-automatic-payment-and-how-do-i-update-or-cancel-one-help240`. Note this routes a UK-primary product's user to the **US** PayPal help article. Recorded as a locale defect. Also note Busuu names the action in PayPal's own vocabulary (`remove Busuu from your automatic payments`) rather than in its own — correct, since that is the label the user will see.

App Store and Google Play links are locale-mixed too: `support.apple.com/en-gb/HT202039` (UK) and `support.google.com/googleplay/answer/7018481?hl=en-GB` (UK) in the cancellation article, but `support.apple.com/en-us/HT202039` and `hl=en-US` in the manage-subscription article. **Same two destinations, two locales, two articles.**

### Tiers: three, and each is named by its *purpose* `[documented]`

The `What is Premium?` comparison table is the priority T13 artefact, and its column headers are the reason:

| Tier | Column header copy (verbatim) |
|---|---|
| `Free` | "Start learning a language with access to the essential course, Community feedback, and basic progress tracking." |
| `Premium` | "For **steady progress**. Level up with grammar and vocabulary review tools, Offline Mode, and ad-free learning." |
| `Premium Plus` | "For **speaking fluency**. Get everything in Premium, plus access to AI Conversations, pronunciation feedback, and exclusive courses to boost your confidence." |

**Each paid tier leads with a two-word goal, bolded: `For steady progress.` / `For speaking fluency.`** The tier is sold by the outcome it serves, not by the feature count — and the two outcomes are genuinely different learner intents (consistency vs. speaking). A user choosing between them is choosing a goal, not a price point. This is the best plan-differentiation copy in this batch, and it is a directly reusable pattern: **name each tier by the user goal it exists to serve, in two or three words, before listing features.**

Free's header is the only one without a `For <goal>` opener — it describes contents rather than intent, which is correct (the free tier serves evaluation, not a goal).

**Thirteen feature rows, ordered by exclusivity** `[observed]` — Premium Plus-only first, then Premium+, then universal:

| Feature | Free | Premium | Premium Plus |
|---|---|---|---|
| `Mistake Repair`¹ | — | — | ✔ |
| `AI Conversations`¹ | — | — | ✔ |
| `Pronunciation feedback`¹ | — | — | ✔ |
| `Exclusive courses` | — | — | ✔ |
| `Protect your streak` | — | — | ✔ |
| `Grammar Review`¹ | — | ✔ | ✔ |
| `Vocabulary Review` | — | ✔ | ✔ |
| `No ads` | — | ✔ | ✔ |
| `Busuu Certificates`¹ | — | ✔ | ✔ |
| `Skip lessons` | — | ✔ | ✔ |
| `Offline Mode` | — | ✔ | ✔ |
| `Busuu Community` | ✔ | ✔ | ✔ |
| `Complete courses` | ✔ | ✔ | ✔ |

Row ordering runs *most exclusive → most inclusive*, which front-loads the upsell. And the two universal rows at the bottom are the two that matter most for the free-tier pitch (`Busuu Community`, `Complete courses`) — buried under eleven rows of things the free user cannot have. A free user reading this table top-to-bottom encounters eleven denials before the two inclusions.

**`Skip lessons` as a named paid feature** is notable — the sequencing gate (T4) appears here as a purchasable escape, exactly as it does for Brilliant (126). Both products sell the removal of their own pedagogical constraint.

**The footnote is reusable and applied per-row** `[observed]`: "¹ Available in selected languages, levels, and on certain devices. Please refer to the specific feature pages linked above for more information." Five of thirteen rows carry it. Bounding availability with one footnote applied selectively is cleaner than per-row parentheticals.

**Premium-page benefit list** `[observed, stripped]` — seven items, and they do not match the help-centre table's vocabulary:

`Conversations with native speakers` · `Travel course` · `Mobile apps with offline mode` · `Quizzes and official certificates` · `Grammar exercises` · `Vocabulary trainer` · `Get full access to 12 different language courses`

**Five mismatches against the help centre**: `Conversations with native speakers` (help centre says `AI Conversations`), `Quizzes and official certificates` (help: `Busuu Certificates`), `Grammar exercises` (help: `Grammar Review`), `Vocabulary trainer` (help: `Vocabulary Review`), and **`12 different language courses`** where every other surface says 14 languages. Plus `Travel course` and `Quizzes`, which appear nowhere in the help-centre table. The purchase page and the help centre are describing the same product with different feature names and a different language count. **This is the most commercially consequential inconsistency in the file** — the page where money changes hands has the least accurate feature list.

Note also that the Premium page's own benefit list includes `Conversations with native speakers` while the corrections page calls Conversations an AI feature ("With an **AI partner**, you can have immersive, realistic conversations"). The purchase page implies human conversation partners; the product documentation says AI. Recorded as a defect with real misrepresentation risk.

**A `Busuu Premium benefits` carousel on the corrections page** `[observed]` gives a fourth vocabulary: `Grammar units` ("Learn to build sentences with advanced grammar units") · `Official Busuu Certificates` ("Premium users can take level completion tests and gain Busuu Certificates to demonstrate their progress") · `Vocabulary Trainer` ("Make sure you never forget the words you've learned") · `Offline Mode` ("Download all lessons for unlimited use, anywhere, anytime") · `Conversations` ("Practise your new skills with fluent speakers").

So `Conversations` is glossed as "Practise your new skills with **fluent speakers**" here — a *third* framing (native speakers / AI partner / fluent speakers) of the same feature across three pages.

### Pricing: **not recorded**

`/en/premium` served `Offer ends soon!`, `Choose your plan`, the benefit list, `There was a temporary error, please try again at a later time.` and the guarantee line. **No price, no plan name, no billing period, no currency was rendered.** `Busuu Premium plans` in the footer points to the same page. A `busuu.com/products` URL is referenced twice from help articles ("See more details on our Premium plans and pricing here") and was not fetched.

**No price is recorded in this file.**

## T11 Help-centre architecture

**Platform:** Zendesk Guide at `help.busuu.com`, lightly themed, branded **`Busuu Support`** in its title — while the marketing footer calls it `FAQs` and the category entry calls it `Contact Us`. Three names for one destination.

**Structure:** 6 categories (+ `Contact Us`) → sections → articles. `Community` has 3 sections / 12 articles; `Learn` has at least 1 section (`Courses`) with 10+ articles.

**An 18-item `Promoted articles` list on the index** `[observed]` — unusually long for a promoted rail, and its composition is diagnostic:

`What is Busuu?` · `Basic troubleshooting` · `How do I delete my progress?` · `How can I type in a different language/alphabet?` · `What is Premium?` · `I paid for Premium but my account didn't upgrade. What should I do?` · `How do I manage my subscription?` · `How many languages can I learn?` · `How do I change my course or the language I'm learning?` · `How can I move to a higher or lower level within the course?` · `I have not received my Certificate.` · `I found a mistake. How do I report it?` · `Lessons aren't working. How do I fix this?` · `What is Vocabulary Review?` · `What is Grammar Review?` · `Using Busuu through your employer or organization` · `Busuu Live: Set Up and Basic Troubleshooting Guide` · `How do I access Busuu Live Lessons?`

**Seven of eighteen are failures or complaints** (`Basic troubleshooting`, `I paid for Premium but…`, `I have not received my Certificate.`, `I found a mistake…`, `Lessons aren't working…`, and two Busuu Live troubleshooting entries). A promoted rail that is 39% troubleshooting is an honest reflection of traffic and a quiet admission of product reliability problems. Compare Quizlet's six-item rail headed by a COPPA consent resend (128).

**`Busuu Live` appears twice in the promoted rail but has no category** — two articles about a live-lessons product that is absent from the six categories, from the footer, and from every marketing page inspected. An unlisted product surfacing only through help-centre promotion. Recorded as an IA gap.

**`How can I type in a different language/alphabet?`** in the promoted rail is a genuinely good inclusion — an input-method question that a language learner hits immediately and that most products ignore. It is also an accessibility-adjacent article.

**Article-title grammar — five shapes, and interrogatives dominate**

| Shape | Examples |
|---|---|
| `What is/are …?` | `What is Busuu?` · `What is Premium?` · `What is a Placement Test?` · `What is a Best Correction?` · `What is Vocabulary Review?` · `What is Grammar Review?` · `What are Leagues?` · `What is a leaderboard?` · `What are checkpoints and how do they work?` · `What are Busuu's "beta" features?` · `What is Busuu's refund policy?` · `What's a streak shield and how do I use it?` |
| `How do I …?` / `How can I …?` | `How do I cancel my subscription?` · `How do I manage my subscription?` · `How can I correct other learners' exercises?` · `How do I send my exercises to the Community?` · `How can I add/remove a friend?` · `How do I report or block other learners?` · `How do I get points or stars?` · `How can I move to a higher or lower level within the course?` |
| First-person confession | `I paid for Premium but my account didn't upgrade. What should I do?` · `I have not received my Certificate.` · `I failed my level completion test. Can I retake the test to get a Certificate?` · `I found a mistake. How do I report it?` |
| `Why …?` / sceptical | **`Why do I need friends?`** · `Why did I get an email or push notification asking me to give a Correction?` |
| Bare / descriptive | `Basic troubleshooting` · `Mastering language skills through speaking practice` · `Using Busuu through your employer or organization` · `Busuu Live: Set Up and Basic Troubleshooting Guide` |

**`Why do I need friends?`** is the best help-centre title in this batch. It is the user's *sceptical* question about a social feature, asked in their voice, with the implied "…do I actually?" A product that titles a help article with the user's resistance to its own feature — rather than "About Friends" or "Adding friends" — is choosing findability and honesty over promotion. Directly comparable to Wise's `Where is my money?` as a category name.

**`How do I …?` vs `How can I …?`** used inconsistently for adjacent actions (`How do I send my exercises…` / `How can I correct other learners'…`, both in the same `Exercises` section). Same defect as Brilliant (126).

**`What are Busuu's "beta" features?`** — scare-quoted `beta` in a title, acknowledging that the word needs explaining.

**Article-level structure** `[observed]`: `Articles in this section` (10 sibling links) is hoisted **above** the article body on every page, so the reader meets the sibling list before the content. Then `Updated <date>` (e.g. "December 20, 2023 17:56 / Updated", "March 11, 2026 18:13 / Updated", "June 17, 2026 13:15 / Updated") — **timestamps to the minute**, which is more precision than useful and exposes that some articles are years stale (`How do I manage my subscription?`: December 2023; `How can I move to a higher or lower level…`: November 2023; `What are checkpoints…`: November 2023).

**Freshness spread is wide** `[observed]`: three of the ten inspected articles were last updated in 2023, one in May 2024, one in July 2024, one in November 2025, and three in 2026. The 2023 articles include two of the three lowest-rated (`How do I manage my subscription?` at 33%, `What are checkpoints…` at 38%) — stale content and poor ratings correlating exactly as one would expect.

**Article foot** `[observed]`: social share (`Facebook` / `Twitter` / `LinkedIn`) → `Was this article helpful?` with visible counts → `Have more questions? Submit a request` → `Return to top` → `Related articles` (5 links, with obfuscated tracking URLs).

**`Related articles` URLs are base64-encoded tracking redirects** `[observed]` — every related link is a `/hc/en-us/related/click?data=BAh7Cjob…` URL rather than a direct article path. Functional but unreadable, and it means related links cannot be shared or bookmarked cleanly.

**Sixteen help-centre locales**, and the localised article slugs are visible in the switcher — a rich cross-locale naming artefact (see T13).

## T12 FAQs

**No FAQ block on the homepage** `[absent]`. The footer links `FAQs` to the help-centre index, so Busuu treats the help centre *as* the FAQ — the same choice as Brilliant (126) rather than Babbel's three on-page blocks (129).

**But two marketing pages are structured entirely as FAQs** `[observed]`, which is the more interesting finding. `/en/how-to/corrections` is built as nine H2 questions:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What are Community Corrections? | Defines the feature; 120m community; matching algorithm or friends; reciprocity ask |
| 2 | Why should I do a Community Correction exercises? | **Grammatical error in the question itself** — "a … exercises". Explains gradual difficulty ramp, the tip and word count, and advises not using the tip |
| 3 | Why should I give a Community Correction? | Voluntary; three peer-cited benefits; "at least give it a try!" |
| 4 | What languages will I be asked to correct? | Only self-declared languages; profile setting |
| 5 | Why did I get an email or push notification asking me to give a Correction? | Trigger condition stated |
| 6 | How do I give feedback on a written exercise? | Two text boxes; green edits; five-star rating; six guidance rules |
| 7 | How do I give feedback on a spoken exercise? | Listen, note issues; seven guidance rules including the accent policy |
| 8 | How do I thank people for giving me a Community Correction? | Thumbs up → Best Correction → friend request |
| 9 | Is there a limit to the number of exercises I can send for correction? | Premium unlimited; free limited |
| 10 | How can I increase the number of Corrections I receive? | Premium queue priority; friending and reciprocity as free-tier remedy |
| 11 | Can I go beyond Community Corrections? | Escalation to speaking practice then Conversations |

**Eleven questions on a marketing page, and the ordering is a genuine funnel**: what it is → why do it (as author) → why do it (as corrector) → eligibility → why am I being asked → how to correct (written) → how to correct (spoken) → how to reciprocate → limits → how to get more → what's next. Receiving before giving, then giving in detail, then the commercial limits last.

**Q2's question is ungrammatical** (`Why should I do a Community Correction exercises?`) — a singular article with a plural noun, on the page's second heading.

**Q6 and Q7 are the substance**, and they are unusual as FAQ answers: each contains a bulleted *guidance list* rather than a procedure. An FAQ answer that is a style guide (T7).

The `/en/it-works/courses` page is similarly structured, with `Busuu levels and the CEFR` as an explainer followed by three numbered value blocks (`1. Study at your own pace` / `2. Go the long haul` / `3. Get it right with community feedback`). **`Go the long haul`** is the only idiom in the set and it names retention — the Study Plan and review tools sold as the answer to abandonment.

## T13 Mode and level terminology — PRIORITY

### The level system

| Term | Busuu's usage | Where |
|---|---|---|
| `Beginner A1` | Tier 1, plain name + code | How-it-works |
| `Elementary A2` | Tier 2 | How-it-works |
| `Intermediate B1` | Tier 3 | How-it-works |
| `Upper Intermediate B2` | Tier 4 — the terminal level for 13 of 14 languages | How-it-works |
| `Advanced C1` | Tier 5 — English only, asterisked | How-it-works |
| `CEFR` / `Common European Framework of Reference` | Expanded on first use every time | How-it-works, What is Busuu?, editorial |
| `six stages` | The full CEFR range, glossed "from complete beginner to completely fluent" | How-it-works |
| `can-do descriptors` / `can-do statements` | The CEFR mechanism | Editorial |
| `Basic user` / `Independent user` / `Proficient user` | The official CEFR band names, reproduced in a table | Editorial |
| `suggested placement level` | The Placement Test output | Placement article |
| `Levels` | The dashboard control | Level-change article |
| `Complete course` | The course type that supports placement and speaking practice | Placement, speaking articles |
| `checkpoint` | Chapter-end gate, glossed `mini-test` | Checkpoints article |
| `chapter` | The sub-level unit (used uncountably — a defect) | Checkpoints article |
| `level completion tests` | The certificate trigger | Premium carousel |

**`Completing <Level> means you can:`** is the level-to-promise frame and the single most valuable string pattern in this file (T4). Note the plain-English names run `Beginner` / `Elementary` / `Intermediate` / `Upper Intermediate` / `Advanced` — **Busuu keeps `Beginner` for A1** where Babbel invents `Newcomer` to free `Beginner` for A2 (129). Busuu's mapping is the conventional one; Babbel's is the more considered. Both concatenate name-then-code.

**`Complete course` is a coined course-type name** appearing in three articles as a precondition (`You'll need to be in a Complete course to be able to take the test`; speaking practice available in "Complete English", "Complete Spanish", etc.). It is never defined. A user who does not know whether they are in a Complete course cannot act on the precondition. Recorded as a defect — a gating term used three times and glossed zero times.

**The editorial article reproduces the official CEFR band names** `[observed]` — `Basic user` (A1, A2) / `Independent user` (B1, B2) / `Proficient user` (C1, C2) — in a table, which is a sixth vocabulary alongside Busuu's own five tier names. Two naming systems for the same six levels on two different Busuu pages, though the editorial one is correctly attributed to the Council of Europe.

### Mode, feature and community terminology

| Term | Busuu's usage | The alternative it rejected |
|---|---|---|
| `Community Corrections` | The peer-review feature | "peer review", "feedback exchange", "language exchange" |
| `Correction` (capitalised) | A single instance of feedback | "correction" lowercase, "edit", "review" |
| `Best Correction` | The award for the most helpful correction | "Top answer", "Accepted answer" |
| `Corrections` / `Likes` | Profile award counters | "reputation", "karma", "points" |
| `Discover` / `Friends` | The two correction queues | "All", "Public"/"Private" |
| `matching algorithm` | The routing mechanism, named plainly | "smart matching", "AI matching" |
| `study buddy` | The relationship the award system is meant to produce | "language partner", "tandem partner" |
| `speaking practice` | AI pronunciation lessons; lowercase, unbranded | "Pronunciation trainer", "Speak" (though `Speak` is the tab) |
| `Conversations` / `AI Conversations` | The AI dialogue feature | "Chat", "Roleplay" |
| `AI partner` | The interlocutor | "AI tutor", "conversation partner" |
| `Mistake Repair` | Error-harvesting practice generator | "Review mistakes", "Error log" |
| `Vocabulary Review` / `Grammar Review` | The two spaced-repetition surfaces | "Flashcards", "Practice" |
| `Vocabulary Trainer` | **A second name for Vocabulary Review** | |
| `Grammar units` | **A second name for Grammar Review** | |
| `Vocabulary trainer` / `Grammar exercises` | **Third names, on the Premium page** | |
| `checkpoint` / `mini-test` | Chapter gate + its gloss | "quiz", "unit test" |
| `streak shield` / `Protect your streak` | Streak-protection consumable + its benefit label | "streak freeze" |
| `Busuu Certificates` / `Official Busuu Certificates` | The credential | "diploma", "badge" |
| `Study Plan` | Scheduling commitment | "goal", "schedule" |
| `Leagues` / `leaderboard` / `points` / `stars` | Competitive layer | |
| `fluent speakers` | **The help-centre term for correctors** | `native speakers` — used freely on marketing |
| `learners` | The user noun | "students", "users" |
| `Complete course` | Course type (undefined) | |
| `Busuu Live` | An unlisted live-lessons product | |

**`fluent speakers` vs `native speakers` is the most interesting terminology tension in this file.**

The help-centre `Community` category scope line says "Interact with **fluent speakers** and learn alongside them." The speaking-practice article says "a **fluent speaker** saying a word or phrase" and "the **fluent speaker's** recording". The Premium carousel says `Conversations` lets you "Practise your new skills with **fluent speakers**."

But the homepage says "connect with a community of **native speakers**"; `What is Busuu?` says "get corrections from our dedicated Community of **native speakers**"; the how-it-works page says "the ability to practise with 120 million **native speakers**" and "send it out to our community of **native speakers**"; and the corrections page says "immersive videos featuring **native speakers**".

**So the help centre says `fluent speakers` and the marketing says `native speakers`** — and the help centre is right. Busuu's own eligibility rule is self-declared fluency ("languages that you have told us that you know well", "which languages you speak **to which level**"), not nativeness. `fluent speakers` is accurate, more inclusive (it does not privilege birth over attainment), and it correctly describes a community in which a C1 Spanish speaker may correct an A2 learner. `native speakers` overclaims and, applied to "120 million", is a category error (T2).

This is a genuine, resolvable inconsistency where one side is clearly better, and it is worth flagging as the recommendation: **the help centre's `fluent speakers` should propagate to marketing.**

**Four vocabularies for the review features.** `Vocabulary Review` (help centre) / `Vocabulary Trainer` (Premium carousel) / `Vocabulary trainer` (Premium page) — three casings/names. And `Grammar Review` (help centre) / `Grammar units` (Premium carousel) / `Grammar exercises` (Premium page) — three names. Six strings for two features across three surfaces.

**Three framings of `Conversations`.** `AI Conversations` (help centre table) / `Conversations with native speakers` (Premium page) / "With an **AI partner**" (corrections page) / "Practise your new skills with fluent speakers" (Premium carousel). The purchase page says native speakers; the documentation says AI. As noted in T10, this carries misrepresentation risk.

**`Mistake Repair` localises into six different metaphors** `[observed]`, visible in the help-centre locale slugs:

| Locale | Name (translated) |
|---|---|
| de | `Fehler-Bootcamp` — error bootcamp |
| es | `Repaso de errores` — error review |
| fr | `Révision des erreurs` — error revision |
| it | `Revisione errori` — error revision |
| tr | `Telafi Alanı` — compensation/make-up area |
| pt | `Correção de Erros` — error correction |
| zh-cn | `错题巩固` — consolidating wrong questions |
| id | `Ulasan Kesalahan` — error review |
| vi | `Sửa lỗi` — fix errors |

**Nine locales, and `repair` survives in none of them.** German picks a fitness metaphor (`Bootcamp`), Turkish picks a make-up-work metaphor (`Telafi`), Chinese picks a consolidation metaphor. The English coinage's distinctiveness (`Repair`, implying restoration) is lost everywhere — most locales default to `review` or `correction`. This is a useful reminder for anyone coining a product name in English: **the more distinctive the metaphor, the less likely it survives localisation.** Compare `Placement Test`, which localises cleanly and consistently across all sixteen locales because it is a generic compound.

**`study buddy`** appears once, in the Best Correction article, as the payoff of the award system ("it's a great way to find a study buddy!"). It is the warmest register in the corpus and it names the actual social outcome the whole award apparatus exists to produce.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, used most often in the community documentation where Busuu is *asking* rather than telling: "**we ask you to help others**", "**We only ask you** to correct others in languages that you have told us", "**we recommend** that you try to construct your answers without looking at the tip", "**We recommend** that you at least give it a try!", "**we'd love to know** how we can improve", "**We're committed to** making your language learning journey as smooth as possible." Busuu's `we` is a *requester* — it asks, recommends, and commits. That is a distinct register from the other four products in this batch (Brilliant concedes, MasterClass constrains, Babbel defines, Quizlet is nearly absent), and it is the correct register for a product whose core feature depends on unpaid user labour.

**Register.** Warm, British, and noticeably more conversational in the community copy than elsewhere. Contractions used freely. Exclamation marks appear with real frequency in the community and feature documentation — "at least give it a try!", "Plus, you can give them out, too!", "it's a great way to find a study buddy!", "you're ready to go!", "give it a go!", "without your accent affecting your score!", "Stay tuned", "5x more likely that you'll achieve your goals!" — roughly eight instances observed, clustered almost entirely in T7 material. **The tone warms measurably when the subject is other people or the user's own speaking.** It flattens in the subscription articles and disappears in the level-promise block.

**The em-dash gloss is the house device** `[observed]`: `a checkpoint—a mini-test designed to gauge your grasp`, `The second box is all yours—a space for your comments`, `Be careful—one second is added`, `don't worry—you don't have to mimic the perfect accent`, `you can see someone's awards on their profile—it's a great way to find a study buddy!`. Unspaced em-dashes introducing an appositive gloss or a reassurance, five instances. Consistent and effective.

**British English, inconsistently applied** `[observed]`. The marketing pages use `Practise` (verb), `personalised`, `recognised`, `favourite`, `maximise`, `prioritised`, `organise`. But: `TV programs` (US) in the B1 level block; `organizes and ranks them` (US) in the Mistake Repair article; `recognized standard` (US) in `What is Busuu?` against `internationally recognised standard` (UK) on the how-it-works page — **the same phrase, two spellings, two pages**; `Using Busuu through your employer or organization` (US) as an article title; `personalized` (US) in Mistake Repair against `personalised` (UK) in speaking practice. The help centre is en-US-locale and the marketing is en-GB, which explains most of it — but the level-promise block is on an en-GB marketing page and uses `programs`, and `recognised`/`recognized` split across two marketing-adjacent surfaces. Recorded as a locale-discipline defect.

**Numbers** `[observed]`: `120 million` (×5), `22 hours` = `a college semester`, `16 hours`, `3–5 minutes`, `5 minutes` (placement), `10 minutes a day` (alt text), `five stars`, `three attempts`, `seven-day money-back guarantee`, `one to twelve months`, `5x more likely`, `A1`-`C2`, `six stages`, `first four stages`, `twice` (Mistake Repair trial), `31` countries. Mostly precise and mostly attributed. `5x more likely` is the only unsourced one, and `12 different language courses` on the Premium page contradicts `14 languages` everywhere else.

**Accessibility content — the thinnest in this batch**

- **No accessibility statement exists.** `[absent]` Not in either footer variant (which carry `Terms`, `Privacy`, `Modern Slavery Statement`, `COVID-19`), not in the six help categories, not in the 18 promoted articles. Busuu is the only product in this batch that is both (a) audio- and speech-dependent and (b) entirely silent on accessibility. Babbel at least publishes a statement admitting non-conformance (129); Busuu publishes nothing.
- **Colour-only feedback signalling, twice** `[documented]`. Corrections "show up in **green**"; incorrectly pronounced words are "highlighted in **red**". Both are documented as the sole indicator, with no mention of an icon, underline, weight change, or text label. For the two most important feedback moments in the product, colour is the only channel. This is a WCAG 1.4.1 (Use of Color) failure as documented, and it is the clearest accessibility defect in the file.
- **`How can I type in a different language/alphabet?`** in the promoted rail `[observed]` is the one genuinely accessibility-adjacent article, and it is input-method help rather than assistive-technology support.
- **`Offline Mode`** is a connectivity-accessibility feature, framed as convenience: "Download all lessons for unlimited use, anywhere, anytime."
- **Audio affordances are well documented** `[documented]`: hold-to-record, a repeat control (`↻`), a translate control, side-by-side playback comparison, and a slow-speech instruction *for correctors* ("Try to speak more slowly than your natural speed"). The last is a genuine accommodation instruction, though aimed at users rather than implemented in the product.
- **Alt text on the homepage is descriptive and product-specific** `[observed]`: `Speak a language in 10 minutes a day` · `Busuu Japanese exercise correction` · `Busuu Spanish checkpoint assessment` · `Busuu Spanish video flashcards` · `Busuu study plan` · `Google Play logo` · `Apple logo` · `Puma logo` · `DHL logo` · `INSEAD logo` · `Julius Bar logo` · `uber logo`. These are functional and mostly good — the four product screenshots name the language and the feature shown, which is the right level of detail. Note `Julius Bar` drops the umlaut from *Julius Bär*, and `uber logo` is lowercase where the others are capitalised.
- **But most editorial and illustrative images have empty alt** `[observed]`: the entire `Why learn a language with Busuu?` block's images on some renders, the CEFR global-scale screenshot (`cefr-global-scale` — an image containing a *table of level descriptors*, i.e. load-bearing content with a filename as its alt), the `Busuu for Business` module images, the `proficiency-levels busuu` CTA images, the Premium-benefit carousel images, and the `quotes` decorative SVGs (repeated ~15 times in the animated footer motif).
- **The animated footer motif is an accessibility problem** `[observed]`: `New` / `languages` / `opportunities` / `you` repeated roughly five times each with interleaved `![quotes]` SVGs, rendering in the extracted text as `Newlanguagesquotes` / `Newopportunities` / `Newyou`. Fifteen-plus repetitions of four words with no container label and no `aria-hidden` evident. A screen-reader user would encounter the slogan fragments repeatedly at the foot of every marketing page.
- **Footer navigation is absent from four of five marketing pages** (T1) — the groups render as empty headings server-side. Any user or agent without JS has no footer navigation, which includes `Terms`, `Privacy`, and `Contact us` on those pages.
- **A visible unrendered template token in production** `[observed]`: `X_MIN_READ` on the proficiency-levels article.
- **A visible production error string** `[observed]` on the purchase page: `There was a temporary error, please try again at a later time.` (T8).
- **Sixteen help-centre locales and sixteen marketing display languages** — substantive internationalisation.
- **No `Skip to content` link observed** in either the marketing or help-centre markup. `[absent]` Busuu is the only product in this batch without one (Brilliant also lacks it on the homepage, but MasterClass, Babbel and Quizlet's help centre have skip links or equivalents).
- **Social-share and tracking URLs** are exposed as bare link text in the help-article footers.
- **Help-article `Related articles` links are base64 tracking redirects** (T11), unreadable and unshareable.

**Negative findings, recorded honestly**

1. **`Cancel anyway`** as the cancellation confirm label — presupposes the user should not be cancelling. The clearest dark-pattern string in this batch.
2. **`How do I cancel my subscription?` is the most-read article (3,181 votes) and rated helpful by 33%.** Two of the three lowest-rated articles are the two subscription-management articles.
3. **Colour is the sole feedback channel** for both community corrections (green) and pronunciation errors (red), as documented.
4. **No accessibility statement**, no skip link, and an audio/speech-dependent product.
5. **`native speakers` (marketing) vs `fluent speakers` (help centre)** for the correction community, where the help centre's term is the accurate one.
6. **"practise with 120 million native speakers"** — the community figure applied to native speakers, which overstates the correction pool.
7. **Premium page lists `12 different language courses`** where every other surface says 14.
8. **Premium page says `Conversations with native speakers`** where the documentation says `AI Conversations` / `AI partner`.
9. **Six strings for two review features**: `Vocabulary Review`/`Vocabulary Trainer`/`Vocabulary trainer` and `Grammar Review`/`Grammar units`/`Grammar exercises`.
10. **`personalised personalised feedback`** — duplicated word on the corrections page.
11. **`creating on`** for *creating one*, in the same sentence as the unsourced `5x` claim.
12. **`chapter` used as an uncountable noun three times** in the checkpoints article.
13. **The B1 level-promise bullets are malformed** — one bullet opens `agreement and disagreement` with no verb; C1 has a mid-list capitalisation break and "showing understanding euphemisms".
14. **`TV programs`** (US) inside an en-GB level block; `recognised`/`recognized` split across two surfaces; `personalised`/`personalized` split.
15. **`Why should I do a Community Correction exercises?`** — ungrammatical H2 on a marketing page.
16. **`X_MIN_READ`** unrendered template token in production.
17. **`There was a temporary error, please try again at a later time.`** served on the purchase page, with no retry route or support link.
18. **Three carrier-table rows have no support route** (Azerbaijan, Congo, Nigeria); `Tunisi Telecom` misspelled.
19. **Locale-mixed outbound help links**: US PayPal article from a UK-primary product; Apple/Google links use en-GB in one article and en-US in another.
20. **`COVID-19` still in the footer** in 2026.
21. **`Complete course` is a gating precondition used three times and never defined.**
22. **`Busuu Live` appears twice in the promoted rail but has no category, footer entry, or marketing page.**
23. **`Log in` vs `Sign in`**; four variants of the free-signup CTA on one page.
24. **`Display Language` vs `Site Language`** — two labels for the interface switcher on two templates.
25. **Footer renders as empty headings** on four of five marketing pages server-side.
26. **The `Cancel Premium` control exists on web but not in the documented app path** (app has only `Manage subscription`).
27. **Three of ten inspected help articles were last updated in 2023.**
28. **The Placement Test's "won't skip or mark as completed" caveat is stated twice** in one short article.
29. **The animated `New languages / opportunities / you` footer motif repeats ~15 times** with no accessible container.
30. **`we conducted an independent study`** — internally contradictory (commissioned, therefore not independent).

---

## Transferable patterns

1. **`Completing <Level> means you can:` + a bulleted list of situations with objects.** Past-tense completion → present-tense capability, second person, with the hedge inside each bullet (`begin to have longer conversations`, `when the topic is familiar`, `without too much repetition`). Nineteen concrete promises across five tiers, threaded so a reader can trace one capability (conversation complexity) up the whole ladder. **This is the reference implementation for translating any abstract tier into a user promise** — service levels, risk bands, verification tiers, seller statuses. Condition: the bullets must name things the user does *with other people*, not competences they possess.

2. **Disclose how much of the external framework you actually cover, in the opening paragraph.** "The CEFR is broken down into six stages… Busuu's language courses all cover the **first four stages**, from A1 to B2. Busuu's English course also covers the level above B2, C1." Then footnote the exception at the point of the claim. Applies to any product claiming alignment with a standard it only partly implements — PCI scope, WCAG level, ISO coverage, regulatory permissions.

3. **Write a tone-of-voice guide for your users when they produce the feedback.** Six rules for written corrections and seven for spoken, four of which are about register rather than content: write simply because your reader is learning your language; include encouragement, especially after heavy correction; distinguish unnatural from incorrect; "**Differences in usage are not necessarily incorrect.**" Directly applicable to any UGC review, community answer, peer-moderation, or mentoring surface. Condition: supply a *modelled example* as Busuu does ("Hi Sam. When you say the word 'this'…"), because rules alone do not transfer register.

4. **Instruct contributors to under-correct.** "Don't feel you have to correct every mistake you hear. Pick one or two of the most significant mistakes and focus on those." The rule protects the recipient, not the contributor's time, and it is the opposite of what a volume-maximising product would say. Transfers to code review, peer feedback, moderation, and any triage where thoroughness harms the recipient.

5. **Draw the line between intelligibility and identity, and state it: "Simply speaking with an accent is not a problem that needs correction."** Then make the same commitment for the algorithm ("trained on many varieties of each language… without your accent affecting your score"). Eleven words that set a fairness policy for both human and machine judgement. Applies wherever a system evaluates human output that carries identity — voice, handwriting, name matching, likeness verification.

6. **Name each paid tier by the goal it serves, in two words, before any feature list.** `For steady progress.` / `For speaking fluency.` The user chooses an intent, not a price point. Immediately reusable for any multi-tier plan page. Condition: the goals must be genuinely different learner or user intents, not euphemisms for "more" and "most".

7. **Title a help article with the user's scepticism about your own feature: `Why do I need friends?`** Findability and honesty over promotion. Sibling to Wise's `Where is my money?`. Applies to any feature users resist — notifications, verification, data sharing, social layers.

8. **Publish helpfulness ratios.** `1060 out of 3181 found this helpful` on the cancellation article is embarrassing and useful: it tells the reader the article is contested and tells the organisation exactly where its content fails. Condition: only worth doing if someone acts on the signal — and Busuu's two lowest-rated articles are also two of its three stalest, which suggests nobody is.

9. **Publish a per-market cancellation route for every billing channel you use, including carrier billing.** Thirty-one countries, named carriers, a contact per market, plus a self-serve URL. Carrier billing is the hardest cancellation route in existence and almost no product documents it at all. Condition: fill every row — three empty cells leave three markets with no route, which is worse than not having the table.

10. **Disclose the counterintuitive side-effect of an onboarding choice, with a worked example.** "completed Placement Tests can mark vocabulary words and grammar topics from previous levels as 'mastered' (not needing review). For instance, if you're placed at A2, you may not see words or grammar topics from A1 in your Review section." Second-order consequences of a setup decision are where support tickets come from.

11. **Separate the correction from the commentary: two boxes, two jobs.** Edit the artefact in box one (shown in green); explain yourself in box two ("The second box is all yours"). Structural separation of *the fix* from *the reasoning* is reusable in code review, document markup, dispute responses, and any correction UI.

12. **Use the harsher colour for the machine and the gentler one for the human.** Red for algorithm-detected pronunciation error; green for a peer's suggested improvement. Coherent semantics — but pair each with a non-colour indicator, which Busuu does not.

13. **Concede that your organising framework is approximate, before you sell it.** "It's unrealistic to expect all language learners to fit neatly into these levels… The CEFR is just a guideline… Just don't take it too seriously." Demonstrated on the author's own uneven proficiency, three of whose five skills are given as ranges rather than levels. Inoculates against the "I completed the tier but I can't do the thing" complaint. Condition: the product must still be usable once you have admitted the tiers are fuzzy — which works here because Busuu's levels are advisory, not gated.

## Caveats & gaps

- **No price is recorded.** `/en/premium` served `Offer ends soon!`, `Choose your plan`, a seven-item benefit list, the seven-day-guarantee line, and a production error string where the plan selector should be. No figure, currency, plan name or billing period was rendered. `busuu.com/products` is referenced twice from help articles and was not fetched. This is the largest gap against the brief's pricing requirement, and the observed error string means the page may be broken rather than merely client-rendered.
- **`Cancel anyway` is `[documented]`, not `[observed]`.** The single most significant string in T10 comes from the help centre's own procedure. It should be confirmed against the live flow before being cited as a dark pattern in any external work.
- **The reason-survey content is unobserved.** Step 5 of cancellation is "Tell us why you're canceling" — the option labels, which are the actual retention copy, are behind auth.
- **Footer link groups did not render server-side on four of five marketing pages**, so the footer IA in T1 is reconstructed from the homepage only. The `Download` group and the `Site Language` control were seen only as headings.
- **No accessibility statement exists to harvest.** T14 is built from alt text, documented audio affordances, the colour-only feedback disclosures, and absences.
- **~40 help-article titles captured but not opened**, including the entire `Getting Started`, `Account Management`, `Review` and `Busuu for Business` categories, plus — most importantly — `What is Busuu's refund policy?` (which would bound the seven-day guarantee), `What are Leagues?`, `What is a leaderboard?`, `How do I get points or stars?` (the three articles that would fill T6's gap), `Why do I need friends?`, `How do I send my exercises to the Community?`, `How do I get other learners to correct my exercises?`, `Where can I find exercises to complete?`, `Can I notify a friend to correct my exercises?`, `How do I report or block other learners?`, `What is Vocabulary Review?`, `What is Grammar Review?`, `What's a streak shield and how do I use it?`, `What are Certificates and how can I get them?`, `I failed my level completion test…`, `Can I skip lessons or chapters?`, `What are Busuu's "beta" features?`, and both `Busuu Live` articles. The three leaderboard articles and the refund policy are the highest-value.
- **T6 (status and state language) is genuinely thin.** Busuu publishes `'mastered'` only as a placement side-effect, and names `points`, `stars`, `Leagues` and `leaderboard` only in unopened article titles. Unlike Quizlet (128), no progress-state vocabulary is exposed on any inspected surface. Part harvest gap, part real absence.
- **T8 (empty states) is absent**; the one string recorded is a production error, not an empty state.
- **T12 (FAQs)**: no homepage FAQ block exists. The two FAQ-structured marketing pages were harvested in full, so the category is well served despite the absence.
- **Only one of fourteen course pages inspected** (none, in fact — the `/en/course/learn-*-online` pages were not fetched). Whether the five-tier `Completing <Level> means you can:` block is reproduced per language, and how it is trimmed for languages that stop at B2, is unconfirmed. The Japanese or Arabic course page would be the useful test.
- **`/en/languages/certification`, `/en/languages/speak-fluently-with-busuu-conversations`, `/en/about`, `/en/mobile`, `/en/voucher`, `/en/terms`, `/en/privacy` and `business.busuu.com` were not fetched.** The certification page would resolve the `Busuu Certificates` / `official certificates` / `level completion tests` naming, and the Conversations page is the likeliest source of actual AI-dialogue feedback copy.
- **Localised feature names in T13 are inferred from help-centre URL slugs**, not from rendered localised pages. The `Mistake Repair` metaphor divergence is a slug-level observation and should be confirmed against rendered locales before citation.
- **The efficacy study (2016, CUNY + University of South Carolina) was not verified**, and `we conducted an independent study` is taken as observed copy rather than as an accurate characterisation.
- **All in-product strings are `[documented]`**: `Cancel Premium`, `Cancel anyway`, `Manage subscription`, `Take Placement Test`, `Levels`, `Discover`/`Friends`, `Best Correction`, `Speak`, the two correction text boxes, the green/red feedback colours, the five-star rating, the three-attempt allowance. Marked as such throughout.
- **Mobile app copy not harvested**; `Mistake Repair` is iOS-only and therefore entirely undocumented outside the help article.
- **No blocked domains.** `www.busuu.com` and `help.busuu.com` served every requested page. `/en/premium` returned a stripped body containing a server-side error string — recorded as a degraded response rather than a block.

## Sources

1. https://www.busuu.com/
2. https://www.busuu.com/en/it-works/courses
3. https://www.busuu.com/en/how-to/corrections
4. https://www.busuu.com/en/languages/proficiency-levels
5. https://www.busuu.com/en/premium *(stripped body; production error string served)*
6. https://help.busuu.com/hc/en-us
7. https://help.busuu.com/hc/en-us/categories/12823698631314-Community
8. https://help.busuu.com/hc/en-us/articles/15936615354641-What-is-Busuu
9. https://help.busuu.com/hc/en-us/articles/16269241908497-What-is-Premium
10. https://help.busuu.com/hc/en-us/articles/16464509457169-How-do-I-manage-my-subscription
11. https://help.busuu.com/hc/en-us/articles/16466204976785-How-do-I-cancel-my-subscription
12. https://help.busuu.com/hc/en-us/articles/16526383831569-What-is-a-Placement-Test
13. https://help.busuu.com/hc/en-us/articles/16529502378769-How-can-I-move-to-a-higher-or-lower-level-within-the-course
14. https://help.busuu.com/hc/en-us/articles/16529628876561-What-are-checkpoints-and-how-do-they-work
15. https://help.busuu.com/hc/en-us/articles/16721992566417-How-can-I-correct-other-learners-exercises
16. https://help.busuu.com/hc/en-us/articles/16742613902993-What-is-a-Best-Correction
17. https://help.busuu.com/hc/en-us/articles/19367617005970-Mastering-language-skills-through-speaking-practice
18. https://help.busuu.com/hc/en-us/articles/30418575225106-What-is-Mistake-Repair-and-how-can-it-help-me-learn-a-language
