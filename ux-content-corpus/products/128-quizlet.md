# 128. Quizlet

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Flashcard and study-set platform / UGC study tools with AI generation (student + teacher + school channels) |
| Primary URL | https://quizlet.com/ |
| Corpus rank | 128 |
| Benchmark strength (source list) | Study modes and progress |
| Locale / market observed | en-US (help centre localised into 18 further locales; separate en-GB, en-AU, en-CA variants exist and diverge — see T13) |
| Platform observed | Help centre (Zendesk), marketing feature pages, upgrade page — **`quizlet.com` main-domain pages served a stale/stripped variant to the fetcher; see Caveats** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | COPPA — PRIVO certification seal in help-centre footer; parental-consent confirmation email flow is the single most-read help article; FERPA-adjacent school product (`Quizlet for Schools`); CCPA ("Your Privacy/Cookies Choices"); published `Honor code` and `Community guidelines` |
| Harvest date | 2026-09-21 |
| Pages inspected | 18 |
| Harvest completeness | Partial — **`quizlet.com` returned an out-of-date variant** (homepage copy and the `/upgrade` price appear to be several years old and must not be treated as current); `quizlet.com/accessibility` returned an empty body twice; help-centre coverage is strong and is the basis for most of this file |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://quizlet.com/ | **Stale variant served** — copy appears years old; used only for the mission statement, flagged throughout |
| Upgrade / Quizlet Plus | https://quizlet.com/upgrade | **Stale variant** — carries a price and benefit list that do not match current help-centre feature names |
| How Quizlet works (learning science) | https://quizlet.com/features/how-quizlet-works | Retrieved as plain text; three named learning-science principles |
| Study modes feature page | https://quizlet.com/features/study-modes | **Empty body returned** |
| Accessibility statement | https://quizlet.com/accessibility | **Empty body returned (twice)** |
| Help centre index | https://help.quizlet.com/hc/en-us | 7 top-level categories, popular-article rail |
| Help category: Studying | https://help.quizlet.com/hc/en-us/categories/360001601132-Studying | 4 sections |
| Help section: Studying | https://help.quizlet.com/hc/en-us/sections/360005938691-Studying | **26 article titles — richest single source** |
| Help category: Billing | https://help.quizlet.com/hc/en-us/categories/360001598931-Billing | 4 sections: Refunds, Payment methods, Trials, Subscriptions |
| Studying on Quizlet | …/articles/360030841732-Studying-on-Quizlet | **The canonical mode inventory — priority source** |
| Studying with Flashcards | …/articles/360030988091-Studying-with-Flashcards | |
| Studying with Learn | …/articles/360030986971-Studying-with-Learn | |
| Studying with Test | …/articles/360030642972-Studying-with-Test | Canonical URL drops "-mode" |
| Playing Match | …/articles/360031183611-Playing-Match | Note verb: "Playing", not "Studying with" |
| Using Progress for targeted studying | …/articles/360048803491-Using-Progress-for-targeted-studying | **Progress-state vocabulary — priority source** |
| Setting up a study path | …/articles/360048314692-Setting-up-a-study-path | |
| Using grading options (US) | …/articles/360048313652-Using-grading-options-US | Three named strictness levels |
| Studying with Spaced Repetition | …/articles/48324742264077-Studying-with-Spaced-Repetition | Four named recall ratings |
| Canceling auto-renewal if you paid on the website | …/articles/360029963211-Canceling-auto-renewal-if-you-paid-on-the-website | |
| Canceling a free trial if you signed up on the website | …/articles/360038664051-Canceling-a-free-trial-if-you-signed-up-on-the-website | |

---

## T1 Navigation & IA labels

**Help-centre top level — seven categories, mixed grammar** `[observed]`

`Account` · `Billing` · `Studying` · `Teaching` · `Quizlet for Schools` · `Troubleshooting` · `Community and Safety`

Four bare nouns, two gerunds (`Studying`, `Teaching`), one product name. The gerund pair is the interesting one: **Quizlet splits its help IA by *who is doing what*, not by feature.** `Studying` and `Teaching` are the same product from two sides, and every mode article lives under `Studying` even when it is a classroom game a teacher runs.

`Community and Safety` as a top-level help category on a study-tools product is notable — it is the COPPA/moderation surface, and promoting it to peer level with `Billing` is a considered choice for a platform whose content is user-generated and whose users are minors.

**A nesting defect: `Studying` inside `Studying`** `[observed]`

The `Studying` *category* contains four *sections*: `Creating, editing, and saving sets` (22 articles) · `Accessing and sharing` (12) · `Studying` (26) · `Folders` (2). So the breadcrumb on a mode article reads:

> `Quizlet Help Center` › `Studying` › `Studying`

A category and one of its own child sections share a name. This is a real IA defect — a user cannot tell from the breadcrumb which level they are on, and the section link and category link are visually identical. It also means the richest content in the help centre (26 mode and progress articles) sits at a path a user would read as a duplicate.

Also note the help-centre section IDs are inconsistent with their labels: `sections/360005938691-Studying` is linked from the index as `Study modes` in some contexts (the section slug was `-Study-modes` in an earlier revision, per a search result) but renders as `Studying`. Evidence of a rename that did not propagate.

**Billing sub-sections are named by the user's situation** `[observed]`

`Refunds` · `Payment methods` · `Trials` · `Subscriptions`

Four sections, and `Trials` gets its own section rather than sitting inside `Subscriptions`. For a product with a trial-to-paid funnel, breaking the trial out is correct — a user panicking about a trial conversion should not have to reason about whether a trial is a subscription.

**Footer groupings — five, audience-split** `[observed]`

| Group | Items |
|---|---|
| `About us` | `About Quizlet` · `How Quizlet works` · `Careers` · `Advertise with us` · `Get the app` |
| `For students` | `Flashcards` · `Test` · `Learn` · `Solutions` · `Modern Learning Lab` · `Quizlet Plus` · `Study Guides` · `Pomodoro timer` |
| `For Teachers` | `Live` · `Blog` · `Be the Change` · `Quizlet Plus for teachers` |
| `Resources` | `Help center` · `Sign up` · `Honor code` · `Community guidelines` · `Accessibility statement` · `Privacy` · `Your Privacy/Cookies Choices` · `Terms` · `Ad and Cookie Policy` · `Interest-Based Advertising` · `Quizlet for Schools` · `Parents` |
| `Language` | 19 locales |

**`For students` / `For Teachers` is the load-bearing split**, and note the casing inconsistency (`students` lowercase, `Teachers` capitalised) — a defect repeated on `Quizlet Plus for teachers` vs `Quizlet Plus`.

The `For students` group is effectively **the mode menu promoted into the footer**: `Flashcards`, `Test`, `Learn` each get their own marketing page and their own footer slot. Three of the eight study modes are treated as first-class products with their own URLs (`/features/flashcards`, `/features/test`, `/features/learn`) while `Match`, `Blast`, `Blocks` and the rest are not. That tiering tells you which modes Quizlet believes sell the subscription.

`Advertise with us` in the `About us` group is a disclosure by placement — the free tier is ad-supported and the footer says so structurally.

`Parents` as a footer link pointing to `/features/family-plan` conflates an audience with a SKU — a parent looking for safety or COPPA information lands on a pricing page.

**Help-centre routing furniture** `[observed]`: every article and category page carries a `Popular Articles` rail with the **same six articles** — `Resending a confirmation message`, `Changing your username`, `Changing your password`, `Finding flashcard sets`, `Finding your teacher's class`, `Browser and device compatibility`. Global, not contextual: a user reading `Studying with Learn` sees the same rail as a user reading `Canceling auto-renewal`. It also means the single most-promoted article on every help page is `Resending a confirmation message` — the parental-consent email resend, i.e. the COPPA gate. That is an honest reflection of ticket volume and a quiet admission of how much friction the consent flow creates.

Article foot: `Related Articles` (contextual, ~10 links) → `Can't find what you're looking for?` / `Ask a question` → `Was this article helpful? Yes / No`. Three-rung escalation with a feedback control — the most complete article foot in this batch.

Note `Ask a question` rather than "Contact us" or "Submit a ticket". Framing support as a question rather than a case is gentler and matches a student audience.

## T2 Value proposition & headline patterns

**Caution: the retrieved homepage is stale.** The copy below was served but reads as a several-years-old revision (it references `Quizlet Live` as "Introducing", cites "more than 20 million students and teachers each month", and its mode list omits every AI feature the current help centre documents). It is recorded as observed-but-doubtful and is **not** used as evidence of current positioning.

**Stale homepage headline set** `[observed, stale]`

> `Simple tools for learning anything.`
> "Search millions of study sets or create your own. Improve your grades by studying with flashcards, games and more."

Section headers: `Make the perfect study set` · `Study smarter` · `Share knowledge` · `Quizlet's mission` · `Introducing Quizlet Live`

Audience CTAs: `I'm a student` · `I'm a teacher` — the same audience-declaration-as-primary-CTA pattern as Brilliant.

**The mission statement, which is the most durable line on the site** `[observed]`

> "Our mission is to harness the world's knowledge to allow anyone to unlock their learning potential."

`harness the world's knowledge` is the UGC claim — Quizlet's content is made by its users, and the mission sentence encodes that (it does not say "create the world's best content"). Compare Brilliant ("Built by top learning experts from MIT and Harvard") — the opposite provenance claim, and the opposite proof strategy.

**The grade claim, and how it is bounded** `[observed, stale]`

> "More than 95% of students who learn with Quizlet improved their grades."

And on the current `how-quizlet-works` page `[observed]`, the same claim appears as three unfilled stat slots — `study using Learn every day` / `report higher grades` / `online learning tool in the US` — with the numbers stripped out by the extraction. So the live page's stat construction is **verb-phrase-as-label with the figure above it**, e.g. "[N]% report higher grades". The labels are captured; the figures are not, and no figure is recorded here.

**The learning-science page is the real value-proposition artefact** `[observed]`

Headline: `The scientific research behind how Quizlet works`
Subhead: "Studying on Quizlet is fun, but it's also effective. Robust learning science principles guided us in creating tools to help you learn."

`fun, but it's also effective` — the concessive construction concedes the objection (a flashcard app with games is not serious) before answering it. Then three **named pedagogical principles**, each with a mechanism and a directive:

| Principle (verbatim heading) | Mechanism, summarised | The directive it ends on |
|---|---|---|
| `Retrieval practice` | Recall strengthens memory more than re-reading; feedback amplifies it | "Keep practicing retrieval, even after you get a question right the first time!" |
| `Question types` | Written answers force "effortful retrieval or 'recall'"; multiple choice trades depth for throughput and teaches the distractors | "make sure to try to recall the right answer before you look at the solution!" |
| `Guidance fading` | Support is high early then withdrawn until "the guidance is 'faded' completely — and you're doing all the work on your own" | *(no directive; instead names the product mechanism)* |

**`Guidance fading` is the single most valuable string in this file.** It is the published name for Quizlet's concept-sequencing model, and the page maps it directly onto the mode mechanics: "Quizlet provides this progression by moving you from easier multiple choice questions to more challenging written questions when you study with Quizlet Learn." Then it explains the *failure mode* of the easy end: "you might get multiple choice answers correct by process of elimination, or simply by recognizing the right answer, without practicing recall like you do with written questions."

That is a product telling its users why the easy version of its own exercise is weaker. Very few learning products publish the limitation of their own default question type.

Note the rhetorical shape across all three: **name the principle → explain the cognitive mechanism → tell the user what to do differently.** The first two end on an exclamation-marked imperative, which is the only place exclamation marks appear in Quizlet's copy.

**Marketing-page value lines for the three promoted modes** `[observed]`: only the footer labels were retrievable (`Flashcards`, `Test`, `Learn`); `/features/study-modes` returned empty. The mode promises below (T13) therefore come from the help centre, which is the authoritative source anyway.

**`Quizlet Plus` upsell headlines** `[observed, stale]` — six benefit headings, each a two-to-three-word noun or verb phrase with a one-line mechanism:

`Long-Term Learning` — "Learn efficiently and remember over time."
`Create the best sets` — "Add images to your study sets to make them more engaging"
`Enhanced audio` — "Record your own voice to remember what you're learning"
`Organize your classes` — "Create any groups you need with unlimited classes"
`Focused studying` — "Ad-free studying keeps distractions out of your work"
`Create advanced diagrams` — "Add unlimited locations and unlock custom shapes"

`Focused studying` as the euphemism for "no ads" is worth noting — the benefit is named by its cognitive effect rather than by the removal. Compare Brilliant's blunt `No ads`.

**None of these six headings mention any AI feature**, while the current help centre documents six (`Study Guides`, `Practice Tests`, `Ask Quizlet`, `Smart Assist`, `Audio Notes`, `Magic Notes`-lineage). Strong corroboration that `/upgrade` as served is stale.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `I'm a student` | Homepage `[stale]` | Audience declaration |
| `I'm a teacher` | Homepage `[stale]` | |
| `Create your own` | Homepage, set-creation block `[stale]` | |
| `Learn more` | Homepage, Quizlet Live block `[stale]` | Bare |
| `Create an account` | `/upgrade` `[stale]` | |
| `Sign up` | Footer (`?signupOrigin=global-footer`) | |
| `Ask a question` | Every help article and index | **Support framed as a question, not a case** |
| `Was this article helpful? Yes / No` | Every help article foot | |
| `See more` / `See all 22 articles` / `See all 26 articles` | Help category pages | Count is in the label — progressive disclosure with the size disclosed |
| `Get the app` | Help footer, ×2 | |
| **Documented in-product controls** | | |
| `Learn` · `Test` · `Flashcards` · `Match` | Mode launchers on a set page | The mode name *is* the button |
| `Start test` / `Start Test` | Test setup | **Casing differs between web and mobile steps in the same article** |
| `Submit test` | Test completion | |
| `Print test` | Post-grading | Physical-artefact affordance |
| `Start game` | Match | `game`, not `test` or `session` |
| `Restart Match` | Match Options menu | |
| `Start studying` / `Start Studying` | Study-path setup | **Casing differs between web and mobile steps in the same article** |
| `Continue` | Study-path setup, web | |
| `Review with an activity` | Progress panel, after starring | Names the object, unlike a bare "Review" |
| `Play` | Flashcards, auto-advance | |
| `Shuffle` | Flashcards | |
| `Retype correct answers` | Learn Options | An opt-in remediation control |
| `Browse cards` / `Basic sorting` / `Spaced repetition` | Flashcards study-method picker | Three named methods inside one mode |
| `Study method` | Flashcards Options | The picker's own label |
| `New cards per day` | Spaced-repetition Options | A numeric field label |
| `Manage subscription` | Settings | Neutral container |
| `Cancel auto-renewal` | Settings, inside Manage subscription | **Names the mechanism, not "cancel subscription"** |
| `Yes, finish canceling` | Mobile cancellation confirm | Affirmative-phrased confirm — see T10 |
| `Study only starred terms` | Test/Learn Options | |
| `Require 1 answer only` | Test grading options, checkbox | |

**Observations.**

1. **The mode name is the CTA.** `Learn`, `Test`, `Flashcards`, `Match` function simultaneously as feature names, button labels, article titles, and (for three of them) marketing-page names. One token, four jobs. That is the single most efficient naming decision in this file — and it only works because each name is a real English verb or noun a student already uses.
2. **`Start game` for Match vs `Start test` for Test.** The launch verb-object pair declares the activity's seriousness before the user commits.
3. **`Cancel auto-renewal`, not `Cancel subscription`.** The control names the recurring charge, not the relationship — see T10.
4. **`Yes, finish canceling`** is an unusually good confirm label: affirmative, first-person-adjacent, and `finish` signals that the user is completing an action they already started rather than initiating a destructive one.
5. **Casing is not controlled.** `Start test`/`Start Test` and `Start studying`/`Start Studying` each appear in both cases **within a single help article** (web vs. iOS step lists). Since these articles are the canonical source for the control labels, the inconsistency may be in the product itself.

## T4 Onboarding, level-setting and instructional scaffolding — PRIORITY

Quizlet has **no proficiency level and no placement test**. Its scaffolding operates entirely at the level of a single set, and it has three distinct mechanisms — a *goal* prompt, a *sequence* (`study path`), and a *strictness* setting. All three are Plus-gated.

### There is no account-level onboarding to harvest `[absent]`

No getting-started sequence, no numbered onboarding steps, no first-run tour is documented in the help centre. The closest artefacts are `Finding flashcard sets` and `Finding your teacher's class` in the global popular rail — i.e. Quizlet assumes the user arrives with a set in hand or a class code, not with a blank account. For a UGC platform whose acquisition is search- and teacher-driven, that is coherent.

The one true onboarding gate is the **COPPA consent flow**, and it is the most-promoted article on every help page `[observed]`: `Resending a confirmation message` — "Users in certain locations must have their parent confirm their consent via a confirmation email before they can cre…" (truncated in the rail). Note `Users in certain locations` — the consent requirement is jurisdictional and the copy says so without naming the jurisdictions.

### Goal-setting is the level-setting substitute `[documented]`

Every Learn session opens with a goal prompt. The instruction appears three times in the Learn article (once per platform) and the wording differs each time:

| Platform | Step wording |
|---|---|
| Web | "Choose a goal for your session." |
| iOS | "Choose a goal for your session." |
| Study-path article, web | "Select how you want to study." |
| Study-path article, iOS/Android | "Select a goal." |

Four phrasings of one prompt: `Choose a goal for your session` / `Select how you want to study` / `Select a goal`. The goal *options* are nowhere published — the public copy never names a single goal. This is the biggest content gap against the brief's priority, and it is a real one: the goal picker is the closest thing Quizlet has to level-setting and its option labels sit behind auth.

**What the goal does is stated, though** `[documented]`: "Learn creates a personalized study path based on **your goals and how familiar you are with the set's content**." Two inputs — declared intent and inferred familiarity. The familiarity half is the level-setting, and it is *inferred* rather than asked. Quizlet never makes the student self-assess.

### `study path` — the named sequencing unit `[documented]`

> "With study paths, you get suggestions for the **smartest study sequence, adapted to your level**, so you can master materials even faster."

`adapted to your level` is the only use of the word "level" found anywhere in Quizlet's public copy, and it is a *derived* level, never named or shown to the user. There is no A1/beginner/advanced vocabulary anywhere. Contrast Babbel and Busuu (129, 130), where CEFR levels are the entire organising frame.

**The path has a save-gate with a stated consequence** `[documented]`:

> "Select **Start studying** to save your study path.
> *If you don't start studying, your study path will not be saved.*"

The italicised warning immediately after the instruction is good practice — it names the abandonment case rather than leaving the user to discover it. A separate article exists for undoing it (`Resetting study path progress`), so the path is a persistent, resettable object rather than a session setting.

Cross-device persistence is promised explicitly: "your progress on a study path syncs across the website and mobile apps."

### `Guidance fading` — the published sequencing theory `[observed]`

Already quoted in T2, but it belongs here as the scaffolding mechanism:

> "Learning is most effective when you get more instructional support early on, but gradually have less and less until the guidance is 'faded' completely — and you're doing all the work on your own. Quizlet provides this progression by moving you from easier multiple choice questions to more challenging written questions when you study with Quizlet Learn."

So the within-mode difficulty ramp is **question-type substitution**: multiple choice → written. And the help centre's own one-liner for Learn says the same thing in student language: "Answer questions that get progressively harder."

Two registers for one mechanism — `guidance fading` for the person evaluating the product, `questions that get progressively harder` for the person using it. That register split is deliberate and worth stealing.

### Strictness as a third scaffolding axis — `grading options` `[documented]`

This is the most sophisticated scaffolding artefact Quizlet publishes. Three named levels of answer-checking tolerance, each with its criterion, its availability rule, **and its default condition**:

| Level | Criterion (verbatim, abridged) | Default when… |
|---|---|---|
| `Relaxed` | "The general meaning of your answer is accepted as correct. Synonyms, rephrasing, and typos are also accepted." | the set qualifies and "both sides are in your default language" |
| `Moderate` | "An exact match is required, but minor misspellings such as accent mark errors or missing letters are accepted." | "Relaxed isn't available and the set doesn't default to Strict" |
| `Strict` | "An exact match is required. Only small stylistic mistakes like case or punctuation differences are accepted." | "the set has different languages on each side (for example, language learning sets)" |

Three things make this exemplary. First, the **framing sentence puts the purpose before the mechanism**: "Grading options let you choose how strictly Quizlet checks your answers **so you can focus on understanding concepts at the level that works best for you.**" The user-benefit clause converts a settings panel into a pedagogical choice. Second, the **defaults are explained, not just applied** — the user can see why their set landed on Strict. Third, the **eligibility exclusions are named specifically**: Relaxed/Moderate are unavailable for "Chinese, Japanese, math, chemistry, Akkadian, or photo-only sets." `Akkadian` in that list is a genuinely delightful specificity — it signals a real implementation constraint rather than a hand-wave, and it is the kind of detail that buys credibility.

A separate `Require 1 answer only` option exists for Test, with the mechanism spelled out ("This will mark answers correct if they contain at least one of the correct options included in a definition") and the data precondition stated ("Multiple correct answers in a definition must be separated by a comma, slash, or semicolon for single-answer grading to work"). Telling the user what the *content* must look like for a setting to function is rare and useful.

**A cross-setting side-effect is disclosed** `[documented]`: "Once you turn on single-answer grading for a set, that preference is also set for all other activities." Settings bleed between modes and the copy says so.

### Free-tier scaffolding limits, stated per mode `[documented]`

| Mode / feature | Free-tier limit (verbatim) |
|---|---|
| `Learn` | "you can study with Learn for free for a limited number of rounds per flashcard set" / "you can start a free study session in Learn to see what it's like to practice with different question types" |
| `Test` | "you have access to one practice test per flashcard set" / "you can study one free practice test per flashcard set in Test" |
| `Practice Tests` | "you can try Practice Tests for free with limited access" |
| `Study Guides` | "you can try Study Guides for free with limited access" |
| `Expert Solutions` | "Standard high school–level expert solutions are free… you can also study a limited number of textbook solutions per college-level textbook for free" |

Note the **unit of the free allowance differs per mode**: `rounds` for Learn, `one practice test per flashcard set` for Test, `limited access` (unquantified) for the AI features, and `a limited number of textbook solutions per college-level textbook` for Solutions. Three of the five are unquantified. The Test limit is the only precisely stated one, and it is stated twice with different wording ("access to one practice test" / "study one free practice test").

**A teacher-side unlock is documented as a workaround** `[documented]`, and repeated in three articles: "Teachers can create classes and add flashcard sets to those classes, and any class members invited to the class will then have **free access to Learn and Test** for the flashcard sets in that class." So the paywall on the two flagship modes is bypassable through a teacher. Disclosing the bypass in the paywalled modes' own help articles is unusually candid — and commercially rational, since it converts teachers.

## T5 Form & field labels

**Set-creation and study-session field labels** `[documented]`

| Label | Context | Notes |
|---|---|---|
| `term` / `definition` | The atomic pair in every set | See T13 — this pair is the platform's entire data model |
| `Answer with` → `Term` / `Definition` | Flashcards and Learn Options | The label is a preposition-phrase; the values are the two data fields |
| `Card Orientation` → `Term` / `Definition` | Flashcards Options, **mobile only** | **A second label for the same setting** — `Answer with` on web, `Card Orientation` on mobile. Recorded as a defect |
| `Study method` | Flashcards Options | Values: `Browse cards` · `Basic sorting` · `Spaced repetition` |
| `New cards per day` | Spaced-repetition Options | Free-text numeric |
| `Grading options` | Learn and Test Options | Values: `Relaxed` · `Moderate` · `Strict` |
| `Require 1 answer only` | Test grading, checkbox | |
| `Study only starred terms` | Test/Learn Options | |
| `Flashcard sorting` | Flashcards Options, mobile | On/off toggle |
| `Shuffle` | Flashcards Options | On/off |
| `Show advanced audio options` | Flashcards Options, web | Progressive disclosure |
| `Options` | The universal settings entry across every mode | One label, every mode — good consistency |

**`Options` as the single settings label across all modes** is the right call: the user learns one affordance and it works everywhere. Compare the `Answer with` / `Card Orientation` split, which breaks that discipline on exactly one setting.

**The `star` is a field-level annotation with its own vocabulary** `[documented]`: `starred terms`, `Study only starred terms`, `Starred`, and a dedicated article `Studying most-missed terms with stars`. The star is both a user-applied flag and (per the Progress article) a way to bulk-select a progress bucket — "Star **Not Studied**, **Still Learning**, or **Mastered** under the set preview and select **Starred**."

**Audio affordance is labelled by icon with a text gloss** `[documented]`: "Select 🔊 (speaker) on a card to hear the text-to-speech audio or voice recording." The article puts the accessible name in parentheses after the icon — good documentation practice.

**Keyboard shortcuts are documented as labels** `[documented]`: "Use the space bar to flip cards and the **1–4 number keys** to rate your recall." Numeric shortcuts mapped onto the four recall ratings.

No pre-auth form labels were retrievable (signup and search are behind the stale/empty main-domain pages).

## T6 Status & state language — PRIORITY (progress vocabulary)

This is Quizlet's strongest category, and there are **four separate progress vocabularies** operating at different grains.

### 1. Term-level mastery buckets — three named states `[documented]`

> "You'll see a set's terms **grouped according to how often you answered them correctly or incorrectly.**"

| State (verbatim) | Position in the ladder |
|---|---|
| `Not Studied` | Untouched |
| `Still Learning` | In progress |
| `Mastered` | Complete |

These three strings are the core of Quizlet's progress model and they are excellent. Three observations:

- **`Still Learning`, not "Incorrect" or "Weak" or "Needs work".** The present-participle construction makes the middle state an *activity in progress* rather than a deficiency. It is the same move as Brilliant's `Productive challenge` (126) but shorter and applied to a term rather than a course. A student looking at a bucket of 40 cards labelled `Still Learning` reads "I'm working on these"; the same bucket labelled "Not known" reads as failure.
- **`Not Studied` is passive-voice and blameless.** Not "Skipped", not "Unanswered" — it states only that study has not occurred, with no agent.
- **`Mastered` is the one ambitious word**, and it is the only state that makes a claim about the student rather than about the card.

The buckets are **directly actionable**, which is what makes them more than a display: "Select **Not Studied**, **Still Learning**, or **Mastered** to start studying that specific group of terms." Tapping a progress state starts a session scoped to it. Progress is navigation.

**Scope limits on Progress are disclosed** `[documented]`: "Progress is available in Quizlet Plus subscriptions", "Progress tracks your answers **across activities**", and critically "**Progress is not tracked on game modes.**" Naming which modes do not count is an honesty the mode taxonomy needs — it is the line between studying and playing (see T13).

Sync is promised: "Your study progress syncs across the website and Quizlet mobile apps so you can keep studying, no matter where you are."

### 2. Spaced-repetition recall ratings — four named states with stated intervals `[documented]`

The single best-specified feedback vocabulary in this batch. Each rating names the user's *experience* and then states the *scheduling consequence*:

| Rating | User experience (verbatim) | Consequence (verbatim) |
|---|---|---|
| `Repeat` | "You didn't remember it." | "The card returns within minutes." |
| `Hard` | "You remembered it with difficulty." | "The card returns soon." |
| `Okay` | "You remembered it." | "The card typically returns in about a day." |
| `Easy` | "You remembered it easily." | "The card typically returns in four or more days." |

Four things to note.

- **`Repeat` rather than `Again`, `Wrong`, or `Forgot`.** It is the only one of the four that is an *instruction to the system* rather than a self-assessment — and it is the failure state. Naming the failure by what happens next ("repeat it") instead of by what went wrong ("you forgot") removes the verdict entirely. This is the most transferable single word in the file.
- **The middle-positive is `Okay`, not `Good`.** Deliberately unenthusiastic, which keeps `Easy` meaningful.
- **Intervals are stated in human units and hedged appropriately**: `within minutes` (definite), `soon` (vague — the only unquantified one), `typically… about a day`, `typically… four or more days`. `typically` on the two long intervals correctly bounds an algorithmic estimate. `soon` for `Hard` is the weak link: it is the one rating whose consequence the user cannot predict.
- **Scheduling logic is exposed, not hidden**: "Quizlet uses your response to determine when to show the card again." The user is told their rating is an input to an algorithm, which is what makes honest self-rating rational.

Plus a fifth, system-assigned state: "Cards you haven't reviewed with spaced repetition before are marked **New**."

And a terminal state phrased as a natural stopping point rather than a completion: "Continue reviewing cards until **no more are due**." `due` is the queue vocabulary, borrowed from established spaced-repetition tools, and it correctly implies cards will become due again — there is no "finished".

### 3. Session-level states, per mode `[documented]`

| Mode | Session state vocabulary |
|---|---|
| `Flashcards` | `round` — "To finish a round, you'll need to review every card in your set." Sorting buckets: `Still learning` / `Know` |
| `Learn` | `round` (free limit is "a limited number of rounds"); `study path` progress |
| `Test` | `score`; "Select **Submit test** to see your score and review your test." |
| `Match` | `score`; time-based; "one second is added to your time for each incorrect match" |
| `Blocks` | `top score`; "Keep playing until you run out of moves, and try to beat your top score!" |
| `Blast` | `points`; "whoever has the most points wins" |

**Flashcards has its own two-bucket sorting vocabulary that does not match Progress**: `Still learning` and `Know` (per the Flashcards article: "Sort your flashcards into **Still learning** and **Know** groups"). That is two states where Progress has three, and `Know` where Progress says `Mastered`. Also note the casing: Progress uses `Still Learning` (title case), Flashcards uses `Still learning` (sentence case). **Two vocabularies, two casings, for the same underlying idea.** Recorded as the most significant terminology defect in this file (see T13).

### 4. Persistence and loss states — stated per mode, and they differ `[documented]`

This is unusually careful documentation:

| Mode | Progress persistence (verbatim) |
|---|---|
| `Test` | "Test doesn't save progress like other activities. If you navigate away from your test before you're done, your progress isn't saved." |
| `Flashcards` (mobile) | "Save your progress by selecting **X** to quit the session. **Your progress doesn't sync across devices.** That means that if you study the same set on another device, you'll start from the beginning." |
| `Learn` / `study path` | "your progress on a study path syncs across the website and mobile apps" |
| `Progress` | "syncs across the website and Quizlet mobile apps" |
| Subscription end | "you'll still have access to all your sets, folders, and classes" |

Four different persistence behaviours across four features, each disclosed in its own article. The Test warning is repeated three times (once per platform block). The Flashcards non-sync is stated with its consequence spelled out ("you'll start from the beginning"). A product that tells you *where its progress model has holes* is doing the right thing — but four different behaviours is itself the underlying defect, and no single article reconciles them.

`Save your progress by selecting X to quit` is a genuinely counterintuitive instruction — the close affordance is the save affordance — and the article is right to say so explicitly.

### Subscription and content states `[documented]`

`auto-renew` on/off, with the off-state signalled by the *appearance of a date*: "If your subscription is **not** renewing automatically, you'll see your subscription's expiration date." Absence-of-control-plus-presence-of-date as a status display is clever and is documented twice ("If you don't see this option, your subscription may not be set to renew"). Also `expiration date`, and the post-lapse state: "When your account returns to the free version, you'll no longer have access to any upgraded features, **all your sets, folders, and classes will stay in your account**, and you'll always be able to see your uploaded images and listen to your recorded audio."

Retired-feature state `[documented]`: "**Gravity is no longer available.** For a timed practice activity, try Match!" — a removed mode, its removal stated flatly, and a named substitute offered in the same breath. Compare `Write mode` and `Spell mode`, which were not removed but *absorbed*: "Write mode is now part of Learn mode. Access it in the Options menu to customize your study session." Three different end-of-life treatments (retired-with-substitute, absorbed-into-parent, and — for `Classic Quizlet Live` — renamed with `Classic` prepended) all documented in one article. See T13.

## T7 Error, failure & recovery

**Wrong-answer handling is a *setting*, not a message** `[documented]`

Quizlet's answer to "what happens when the learner is wrong" is unusual: rather than a feedback string, it ships a user-controlled tolerance dial (`Relaxed` / `Moderate` / `Strict`) plus an opt-in remediation control (`Retype correct answers`). The design position is stated in the framing sentence: the point is to "focus on understanding concepts at the level that works best for you" — i.e. the user decides what counts as wrong.

No verbatim wrong-answer string is published. What is documented:

- `Retype correct answers` — "If you have written questions turned on, you can choose to **Retype correct answers** for questions you missed." An optional copy-the-answer remediation, framed as a user choice rather than a penalty.
- `smart grading` — "subscribers can use custom study paths, keep track of their Progress, and use **smart grading to focus on concepts instead of rote memorization**." A named leniency feature with a pedagogical justification.
- Match penalty, stated with an em-dash and a warning: "Be careful—**one second is added to your time for each incorrect match!**" The only place in the mode documentation where a wrong answer carries a stated cost, and it is a game.
- `Studying most-missed terms with stars` — a whole article named after the user's errors, treating missed terms as a study surface rather than a failure log.

**`Mistake`-as-material is the recurring frame.** `Studying with Answer Streaks` (title only), `Studying most-missed terms with stars`, `Retype correct answers`, `Still Learning` — Quizlet consistently converts errors into inputs rather than verdicts. Compare Busuu's `Mistake Repair` (130), which does the same thing with a more literal name.

**Error/failure article titles** `[observed]`

| Title | Shape |
|---|---|
| `Trouble accessing a set` | Bare noun phrase, no agent |
| `Reporting an unauthorized charge` | Gerund; **financial harm named plainly** |
| `Issues with vouchers` | — *(Babbel, not Quizlet — excluded)* |
| `Browser and device compatibility` | Environment, not failure |
| `I paid for Premium but my account didn't upgrade` | — *(Busuu, not Quizlet — excluded)* |

The `Troubleshooting` category was not opened, so the error-title corpus here is thin. `Reporting an unauthorized charge` sitting in the `Refunds` section alongside three routine refund articles is the notable one — fraud and routine refunds share a section, which means a distressed user and an ordinary one route to the same place.

**Recovery-by-precondition.** A recurring shape in Quizlet's help copy is *"if you don't see X, then Y"* — a diagnostic branch embedded in a procedure:

- "Select **Manage subscription** under your profile picture. **If you don't see this option, your subscription may not be set to renew.**"
- "Select **Manage subscription**. **If you don't see this option, you may have signed up elsewhere.** Here's how to cancel a trial through the Apple App Store or the Google Play Store."
- "If the language you are looking for does not appear in the list, then it is not available…" — *(MasterClass, excluded)*
- "Can't hear audio? **Text-to-speech may not be available in one of the languages you're studying.**"

Four instances of the same construction. It is a good pattern: the absence of an expected control is the most common silent failure in a settings flow, and each of these pre-answers it *at the step where it happens* rather than in a separate troubleshooting article.

`Can't hear audio?` is the one title-cased-question recovery prompt and it appears as a `Tips` item inside the Flashcards article — a failure pre-empted inside the feature's own documentation.

## T8 Empty states

`[absent]` — no empty-state string observed or documented. The main-domain pages that would carry them (search, home feed, folders) returned stale or empty bodies, and in-product empty states sit behind auth.

Two near-analogues:

- **A queue-exhausted state, phrased as a natural end** `[documented]`: "Continue reviewing cards until **no more are due**" and "When you finish your daily review, you can continue browsing the set normally in Flashcards." The daily-review-complete state routes the user onward instead of congratulating them — a caught-up state that offers a next action.
- **A post-downgrade state** `[documented]`: "When your account returns to the free version, you'll no longer have access to any upgraded features, all your sets, folders, and classes will stay in your account…" — a reassurance-shaped emptied state.

A `Navigating your home feed on mobile devices` article exists (title only, not opened) and is the likeliest home for a real first-run empty state.

## T9 Notifications & system messages

`[documented]`, and one item is well-specified.

**A daily spaced-repetition reminder with a stated time and an opt-out** `[documented]`:

> "If you have cards to review, you may get a **daily reminder at 10 a.m. local time**. You can manage these reminders in your notification settings"

Naming the *hour* and the *timezone basis* is more precision than most products give. `may get` correctly hedges the conditionality (only if cards are due). Note the sentence is missing its terminal full stop in the source.

**The COPPA consent email is the most-surfaced system message on the site** `[observed]`: `Resending a confirmation message` appears in the global popular rail on every help page. The message itself is a parental-consent confirmation, and the article exists because the email fails to arrive often enough to be the top support topic. `Resending` as the article's first word puts the recovery action in the title.

**Receipt and billing messages** `[documented]`: `Getting a copy of a receipt` (article title); `Generating a quote for a future purchase` (an unusual B2B/school-procurement affordance in a consumer help centre).

**`Ask Quizlet`, `Smart Assist`, `Audio Notes`, `Answer Streaks`, `Charms`, `Study with friends`, `Study Groups`** — seven feature articles whose titles imply notification or social-message surfaces; none opened.

No toast, banner, push, or email body string was retrievable verbatim.

## T10 Subscription, auto-renewal and cancellation disclosure — PRIORITY

Quizlet's cancellation content is **channel-complete and unusually well-factored** — twelve articles across three purchase channels and two subscription states — but its trial disclosure carries a real defect and its pricing is unverifiable from the served pages.

### The auto-renewal statement is the first sentence, unhedged `[documented]`

> "Quizlet subscriptions purchased on our website or mobile apps **renew automatically**."

Eleven words, no benefit clause, no justification. Compare MasterClass ("which ensures that you have continuous and uninterrupted access") and Babbel ("ensuring uninterrupted access to your learning materials"), both of which attach a user-benefit rationale to the same fact. **Quizlet just states it.** That is the better practice: the fact needs no selling, and a justification clause invites the reader to argue with the framing.

### Status is legible before you act `[documented]`

> "You can see if your subscription is set to auto-renew by logging in to the Quizlet website and going to your **Settings** page. **If your subscription is not renewing automatically, you'll see your subscription's expiration date.**"

The off-state is signalled by the *presence of a date* rather than by a label. Documented twice, with a dedicated sub-procedure (`To see if your subscription is set to auto-renew`) repeated three times (web/iOS/Android). Making "am I going to be charged again?" answerable in three taps, and documenting the answer's visual form, is exactly right for the highest-anxiety subscription question.

### Where cancellation sits, and what the control is called `[documented]`

Web: `Profile` → `Your Settings` → `Manage subscription` → `Cancel auto-renewal`
iOS/Android: `Profile` → `Your Settings` → `Manage subscription` → `Cancel auto-renewal` → `Yes, finish canceling`

**Four notes.**

1. **The control is `Cancel auto-renewal`, not `Cancel subscription`.** This is the most precise cancellation label in the batch. It names the thing that actually stops (the recurring charge) rather than implying that access ends immediately. It also means the label and the outcome agree — nothing is misleading.
2. `Manage subscription` is the neutral container the user must trust, same weakness as Brilliant. Mitigated by the fact that the help article names the full path, and by the recovery-by-precondition line ("If you don't see this option, your subscription may not be set to renew").
3. **Mobile adds a confirm step; web does not.** `Yes, finish canceling` appears only in the iOS and Android procedures. Either the platforms differ or the web procedure is under-documented. Recorded as a suspected inconsistency.
4. **`Yes, finish canceling` is a model confirm label.** Affirmative, and `finish` frames the click as completing an action already begun rather than initiating a loss. Contrast the common dark-pattern alternative ("No, keep my subscription" as the visual primary).

### The cancellation deadline: **24 hours**, stated three times `[documented]`

> "Make sure to submit your cancellation request **at least 24 hours before your renewal date.**"

Repeated verbatim in all three platform blocks of the auto-renewal article. Note `submit your cancellation request` — the user is submitting a request, not executing a cancellation, which is a subtle liability hedge but also accurate for a batch-processed billing system.

### What survives cancellation, stated at the point of cancellation `[documented]`

> "If your subscription ends, **you'll still have access to all your sets, folders, and classes.**"

Repeated in all three platform blocks, with a link to `What happens to my content if my paid subscription ends?`. For a UGC platform this is the single most important reassurance — a student's sets are their coursework — and Quizlet puts it *inside the cancellation procedure* rather than in a separate article. Best-in-batch placement.

The fuller version, from the trial article `[documented]`: "When your account returns to the free version, you'll no longer have access to any upgraded features, all your sets, folders, and classes will stay in your account, and **you'll always be able to see your uploaded images and listen to your recorded audio.**" Three specific artefacts named (sets/folders/classes, images, audio) rather than a blanket "your data is safe."

`returns to the free version` is a gentle framing for a downgrade — the account *returns* somewhere it belongs rather than being *reduced*.

### Trial-to-paid conversion — good copy with one real defect `[documented]`

> "Quizlet trials are a great way to try Quizlet's advanced features before you subscribe. **Once your trial ends, you will be charged the fee associated with the subscription you selected.**
> Make sure to **cancel at least 24 hours before your renewal date** to prevent being charged."

The conversion is disclosed in the second sentence of the article, in plain future indicative (`you will be charged`), with no euphemism. That is correct and better than most. The 24-hour buffer is stated as an instruction (`Make sure to`), not a recommendation — compare Brilliant's weaker "we recommend canceling at least 24 hours before" (126).

**The defect:** the trial article says *"cancel at least 24 hours before your **renewal date**"* when the relevant deadline is 24 hours before the **trial end date**. For a user on a 7-day trial, "renewal date" is ambiguous — it could plausibly read as the end of the first *paid* period. The preceding sentence correctly says "Once your **trial ends**, you will be charged", so the article contains both the right concept and the wrong label within two sentences. The trial cancellation procedure also reuses the auto-renewal control (`Cancel auto-renewal`) rather than a trial-specific one, compounding the conflation.

**A cancellation-reason survey is disclosed as a required step** `[documented]`: step 5 of the trial cancellation is "**Complete the cancellation questions.**" Naming the survey as a step (so the user knows the flow is not finished at step 4) is honest; making it a step rather than an optional interstitial is friction. Both facts recorded. Note the web auto-renewal procedure has no equivalent step — another web/mobile/trial procedural inconsistency.

### Channel completeness `[observed]`

Twelve billing articles across three purchase channels, with a consistent title formula:

| Action | Website | Apple App Store | Google Play Store |
|---|---|---|---|
| Cancel auto-renewal | ✔ | ✔ | ✔ |
| Cancel a free trial | ✔ | ✔ | ✔ |
| Request a refund | ✔ | ✔ | ✔ |
| Change payment method | ✔ | ✔ | ✔ |

**A perfect 4 × 3 matrix**, every cell filled, every title following `<Action> if you paid/signed up <channel>`. This is the most systematic billing IA in this batch. And each article opens with a horizontal-rule-delimited cross-channel router:

> "- Paid in the Apple App Store? [Here's how to cancel](…).
> - Paid in the Google Play Store? [Here's how to cancel](…)."

Question-then-link, placed *above* the procedure, so a user who landed on the wrong channel's article is redirected before wasting a step. The same router block is then repeated a second time mid-article (before the iOS block) — redundant but harmless.

### Other billing disclosures `[observed]`

- `Understanding Quizlet purchases and sales tax` — tax treatment given its own article rather than buried in Terms.
- `Submitting a purchase order` · `Paying by check` · `Generating a quote for a future purchase` · `Activating account upgrades from a group order` — four school-procurement articles sitting in the consumer help centre. Institutional buying is a first-class billing channel.
- `Reporting an unauthorized charge` — fraud path inside `Refunds`.

### Pricing: **not verifiable** `[stale]`

`/upgrade` as served states `Only $19.99 per year` and `Membership renews automatically, cancel anytime`. **The page is a stale variant** — its benefit list names none of the AI features the current help centre documents, and the testimonial is signed `jonsey374 PLUS`. The figure is therefore recorded here **only as an artefact of a stale page and must not be used as Quizlet's current price.** No current price is established in this file.

The renewal line `Membership renews automatically, cancel anytime` is worth capturing as a *pattern* regardless of vintage: seven words, the fact and the reassurance, comma-joined, directly under the price. It is the shortest auto-renew disclosure in this batch — shorter than Brilliant's four-clause footnote — and it omits the "how" (no mention of where to cancel), which is the trade-off.

**Tier names** `[observed]`: `Quizlet Plus`, `Quizlet Plus for teachers`, `Quizlet for Schools`, `Family Plan` (footer `Parents` link → `/features/family-plan`). Free tier is called `the free version` in help copy, never "Basic". Feature gating is expressed per-feature in the mode documentation rather than in a tier table (see T13).

## T11 Help-centre architecture

**Platform:** Zendesk Guide, heavily themed, at `help.quizlet.com` (with `quizlet.zendesk.com` and `quizlet.com/help` both linked as "Help center" — three entry URLs for one destination).

**Structure:** 7 categories → sections → articles. Depth varies: `Studying` has 4 sections (62 articles), `Billing` has 4 sections (~20), `Folders` has 2 articles.

**Article-title grammar — five shapes, and the mode articles have their own sub-grammar**

| Shape | Examples |
|---|---|
| `Studying with <Mode>` | `Studying with Learn` · `Studying with Test` · `Studying with Flashcards` · `Studying with Write mode` · `Studying with Spell mode` · `Studying with Spaced Repetition` · `Studying with Practice Tests` · `Studying with Study Guides` · `Studying with Quizlet Expert Solutions` · `Studying with Ask Quizlet` · `Studying with Answer Streaks` · `Studying with Audio Notes` · `Studying with Study Groups` |
| `Playing <Mode>` | `Playing Match` · `Playing Charms` · `Playing a game of Blocks` · `Joining a game of Classic Quizlet Live` |
| `Using <Feature>` | `Using Progress for targeted studying` · `Using grading options (US)` · `Using error checking options (UK)` · `Using Study with friends` · `Using Quizlet with Superhuman` |
| Gerund + object | `Creating flashcard sets` · `Sharing sets and folders` · `Resending a confirmation message` · `Changing your username` · `Canceling auto-renewal if you paid on the website` · `Organizing study content with tags` · `Setting up a study path` · `Resetting study path progress` |
| `What is/are …?` | `What are flashcard sets?` · `What happens to my content if my paid subscription ends?` |

**`Studying with X` vs `Playing X` is the most instructive naming split in this file.** The verb in the article title encodes whether the activity is pedagogical or recreational — and it matches the Progress rule exactly ("Progress is not tracked on game modes"). A content designer can read the help-centre verb and know whether the mode counts. Three systems agree: the title verb, the taxonomy heading (`Study activities` vs `Activities`), and the progress-tracking behaviour. That is genuine cross-surface consistency.

`Using X` is the third verb, reserved for **settings and meta-features** — things you neither study with nor play. Three verbs, three activity classes, applied consistently across ~30 titles.

**A locale-forked title pair** `[observed]`:

> `Using grading options (US)` · `Using error checking options (UK)`

Two articles, same feature, **different feature name per locale**, with the locale in parentheses in the title. `grading` (US, school-assessment vocabulary) vs `error checking` (UK, proofreading vocabulary). Both articles sit in the en-US section, so an American user sees the UK article in the list. This is simultaneously good localisation (the feature genuinely has different names in the two products) and an IA leak (locale-specific articles exposed in the wrong locale's index). The parenthetical suffix is the mitigation.

**Canonical-URL drift** `[observed]`: `…/articles/360030642972-Studying-with-Test-mode` redirects to `…-Studying-with-Test`, and the H1 is `Studying with Test`. Likewise `Write mode` and `Spell mode` retain `mode` in their titles while `Test` has dropped it. So the suffix `mode` is being retired unevenly — retired for Test, retained for Write and Spell, and inconsistently used in prose ("Write mode is now part of **Learn mode**" — where the Learn article itself never says "Learn mode").

**Per-platform content is stacked, not tabbed** `[observed]`. Every mode article renders `IOS` / `Web` / `Android` as three links that all point back to the same URL, then repeats the full procedure three times in sequence. In the extracted text this produces near-verbatim triplication — the Learn article states its Options list three times, the Test article states its tips three times, the grading-options article states all three strictness definitions three times. The tabs are presumably client-side; without JS the article is three times its intended length with no signposting. **This is the largest structural defect in Quizlet's help centre**, and it has a real cost: a screen-reader or no-JS user encounters `Relaxed / Moderate / Strict` three times with no indication that they are platform variants.

Note `IOS` is rendered all-caps rather than `iOS` in every instance.

**Localisation depth** `[observed]`: 19 locales in the help-centre switcher (`Deutsch`, `English (Australia)`, `English (Canada)`, `Español`, `Français (Canada)`, `Français (France)`, `Bahasa Indonesia`, `Italiano`, `日本語`, `한국어`, `Nederlands`, `Polski`, `Português do Brasil`, `Русский`, `Türkçe`, `Українська`, `Tiếng Việt`, `简体中文`, `繁體中文`). **Mode names are localised, and the localised names are visible in the URL slugs** — a rich cross-locale naming artefact (see T13).

**`Was this article helpful? Yes / No`** on every article — the only such control in this batch.

## T12 FAQs

**No FAQ block observed** on any retrievable marketing page `[absent]` — the stale homepage has none and `/features/study-modes` returned empty.

The help centre performs the FAQ function through interrogative titles, of which only two were observed:

| Question (verbatim) | Answer, summarised |
|---|---|
| `What are flashcard sets?` | Not opened |
| `What happens to my content if my paid subscription ends?` | Not opened; the answer is quoted inline in two other articles — sets, folders and classes persist; upgraded features are lost; uploaded images and recorded audio remain viewable |

The second is the load-bearing one for a UGC platform, and notably its answer is **duplicated inline into both the cancellation and trial-cancellation articles** rather than only being linked. Repeating the reassurance at the point of anxiety rather than relying on a click-through is the right call.

## T13 Mode and level terminology — PRIORITY

This is the reason Quizlet is in the corpus, and it is the richest terminology set in the batch.

### The canonical mode inventory `[documented]`

`Studying on Quizlet` opens with the count and the claim: **"Study eight different ways with Quizlet!"** — then organises everything under a taxonomy whose top-level split is the key artefact:

| Taxonomy heading | Members |
|---|---|
| `Flashcard sets` / `Diagram sets` | the content units, not modes |
| **`Study activities`** | `Flashcards` · `Learn` · `Write mode` · `Spell mode` · `Test` |
| **`Activities`** | `Blast` · `Blocks` · `Match` · `Gravity` (retired) · `Classic Quizlet Live` |
| `Practice Tests` | AI-generated, own heading |
| `Study Guides` | AI-generated, own heading |
| `Expert Solutions` | Human-verified, own heading |

**`Study activities` vs `Activities`** is the load-bearing distinction, and the omission of one word does all the work. The second group are games; Quizlet declines to call them that in the heading (though the article body freely says "game": `Start game`, `Playing a game of Blocks`, "whoever has the most points wins"). The consequence is stated elsewhere and it is real: "**Progress is not tracked on game modes.**"

So there is a coherent three-way agreement:

| Signal | Study activities | Activities |
|---|---|---|
| Taxonomy heading | `Study activities` | `Activities` |
| Help-article verb | `Studying with X` | `Playing X` |
| Progress tracking | tracked | "not tracked on game modes" |

Three independent surfaces encoding the same boundary. This is the pattern to steal: **when a product has a serious mode and a fun mode, let the verb in every label carry the distinction, and make the data model agree.**

**The count does not reconcile.** "Study eight different ways" is stated, but the article lists five `Study activities` + five `Activities` (one retired) + `Practice Tests` + `Study Guides` + `Expert Solutions` = up to 13 named things, or 8 if you count only `Flashcards`, `Learn`, `Test`, `Blast`, `Blocks`, `Match`, `Practice Tests`, `Study Guides` and treat Write/Spell as absorbed, Gravity as gone, Live as a classroom product, and Solutions as content. The eight is defensible but unstated — nowhere does the article say which eight. Recorded as a defect, since the headline number is the first thing a reader tries to verify.

### Mode-by-mode: name, one-line promise, and pedagogical claim `[documented]`

| Mode | One-line explanation (verbatim from `Studying on Quizlet`) | Distinct pedagogical promise | Gating |
|---|---|---|---|
| `Flashcards` | "Review terms and definitions or questions and answers the way you would with traditional flashcards." | **Familiarity** — explicitly analogised to paper. The article body adds: "as you review your terms and definitions to work toward gaining mastery." | Free |
| `Learn` | "Answer questions that get progressively harder. This activity creates a personalized study sequence based on your familiarity with the content and helps you master everything you need to know." | **Adaptive progression to mastery** — the only mode promising completeness ("everything you need to know") | Plus; free for "a limited number of rounds per flashcard set" |
| `Write mode` | "Write mode is now part of Learn mode. Access it in the Options menu to customize your study session." | **Absorbed** — was recall-by-typing | Inherits Learn |
| `Spell mode` | "Spell mode is now part of Learn mode. Access it in the Options menu…" | **Absorbed** — was audio-to-orthography | Inherits Learn |
| `Test` | "See how you might perform on a test by quizzing yourself with different question types." | **Performance prediction** — note the hedge `how you might perform`. The article body: "Test gives you the chance to see how you'll perform on an exam." | Plus; "one free practice test per flashcard set" |
| `Match` | "Race against the clock to match terms and definitions as quickly as you can." | **Speed / recognition fluency** | Free |
| `Blast` | "Players work individually or as teams to match the terms and definitions… Terms or definitions are displayed on moving asteroids, and players need to be the first to blast the right rock." | **Competitive speed**, classroom | Free |
| `Blocks` | "Students answer questions to earn block pieces. Place pieces on the grid to complete rows or columns and earn points… try to beat your top score!" | **Reward-loop engagement** — puzzle mechanic decoupled from the content | Free |
| `Gravity` | "**Gravity is no longer available.** For a timed practice activity, try Match!" | **Retired**, with a named substitute | — |
| `Classic Quizlet Live` | "our classic classroom game where players work together to correctly match terms and definitions." Modes: `Teams` / `Individuals` | **Collaborative classroom** | Teacher |
| `Practice Tests` | "generate questions based on your uploaded notes or flashcard sets. **Different from Test**, Practice Tests are powered by AI and transform your study materials into full-length practice tests that simulate a real exam." | **Exam simulation from arbitrary material** | Plus; "limited access" free |
| `Study Guides` | "Upload or paste your course materials to generate study guides and flashcards with the click of a button." | **Content generation** — not a study mode at all | Plus; "limited access" free |
| `Expert Solutions` | "step-by-step question and textbook solutions that are written and verified by experts… you can quickly understand the reasons behind the right answers" | **Worked-answer comprehension** | HS free; college partly gated |
| `Spaced Repetition` | "helps you review flashcards based on how well you remember them." | **Retention scheduling** — a method *inside* Flashcards, not a mode | Not stated |
| `Charms` · `Answer Streaks` · `Audio Notes` · `Ask Quizlet` · `Study Groups` · `Study with friends` | (titles only) | Unobserved | — |

**Five observations on the mode naming.**

1. **Every core mode name is a single common English word** — `Flashcards`, `Learn`, `Test`, `Match`, `Write`, `Spell`, `Blast`, `Blocks`. No coined terms, no compounds, no brand prefixes. This is why the name can serve as button, article title, and marketing page simultaneously (T3). It also makes the modes instantly localisable (see below). Contrast Busuu's `Mistake Repair` or Babbel's `Vocab workout (Review)` — both compounds that needed a gloss.

2. **`Learn` and `Test` are the same verb-noun pair a student already uses for study and assessment**, so the mode boundary needs no explanation. `Test` "quizzing yourself" and `Practice Tests` "simulate a real exam" both occupy assessment space, which is why the article has to insert an explicit disambiguator — **"Different from Test, Practice Tests are powered by AI…"**. That three-word intervention (`Different from Test`) is the cost of shipping a second assessment mode without renaming the first. Good crisis-management copy; evidence of a naming collision.

3. **Absorption is documented, not hidden.** `Write mode` and `Spell mode` each retain a live help article whose entire body says the mode now lives inside Learn's `Options` menu. Two named modes demoted to settings, with their names preserved as findable aliases. This is the correct handling for a rename that would otherwise orphan search traffic and user memory — and it is why `mode` survives in those two names while `Test` has shed it (T11).

4. **Retirement is handled differently again**: `Gravity is no longer available. For a timed practice activity, try Match!` — flat statement plus a functionally-described substitute ("a timed practice activity"), not a marketing pivot. Three end-of-life treatments in one taxonomy (absorbed / retired-with-substitute / renamed-with-`Classic`-prefix), each appropriate to its case.

5. **`Classic` as a retronym.** `Classic Quizlet Live` implies a non-classic Quizlet Live exists; the footer links `Live` as a teacher product. So the older classroom game acquired a `Classic` prefix when a successor shipped. `Classic` is a kind word for a deprecated thing — it preserves affection rather than signalling obsolescence.

### The progress vocabulary and its fork `[documented]`

Already detailed in T6. The terminology point:

| Concept | Progress panel | Flashcards sorting |
|---|---|---|
| Not yet attempted | `Not Studied` | — |
| In progress | `Still Learning` | `Still learning` |
| Complete | `Mastered` | `Know` |

**`Mastered` vs `Know`** for the same idea, and **`Still Learning` vs `Still learning`** differing only in casing. Two vocabularies for one mental model, in two features the same student uses in the same session. The Flashcards pair is also only two-state where Progress is three-state. This is the clearest terminology defect in the file and it is the kind that erodes trust in a progress display — a student who has "Mastered" 30 terms in Progress and "Knows" 28 in Flashcards will not be able to reconcile the two.

### Content-unit vocabulary `[documented]`

| Term | Usage | The alternative it rejected |
|---|---|---|
| `flashcard set` | The canonical content unit, used ~40 times across the help centre | `study set` — **the legacy term**, still live on the stale homepage ("Make the perfect study set", "millions of study sets") and in the current article `Creating study sets with Smart Assist` |
| `term` / `definition` | The two sides of a card; the entire data model | `question` / `answer` — offered as an equivalent in prose ("terms and definitions **or** questions and answers") but never as the field name |
| `card` | The rendered unit in Flashcards and Spaced Repetition | |
| `diagram set` | Image-based set with labelled `locations` | |
| `location` | A labelled point on a diagram | "label", "pin", "hotspot" |
| `round` | A pass through a set in Flashcards and Learn | "session", "cycle" |
| `star` / `starred terms` | User flag on a term | "favourite", "bookmark", "flag" |
| `study path` | The generated sequence inside Learn | "plan", "curriculum", "track" |
| `class` | Teacher-created group | "course", "group", "classroom" |
| `folder` / `tag` | Two parallel organisation systems, each with its own article | |
| `the free version` | The unpaid tier | "Basic", "Free plan" |

**`flashcard set` vs `study set` is a live, unresolved rename.** The current help centre says `flashcard set` almost everywhere, but `Creating study sets with Smart Assist` — one of the newest articles in the `Studying` category — uses `study sets`. So the legacy term is reappearing in new content. Recorded as a defect.

**`term` / `definition` is the most consequential naming decision in the product.** Every mode, setting and progress state is expressed in those two words: `Answer with Term/Definition`, `match terms and definitions`, `Study only starred terms`, `most-missed terms`. It is a dictionary metaphor, and it fits vocabulary learning perfectly while fitting question-and-answer material awkwardly — which is why the prose has to keep saying "terms and definitions **or** questions and answers" (four instances observed). One data model, two content types, and the field names only fit one. A real design-debt tell, visible entirely in the copy.

### Localised mode names `[observed]`

Recoverable from the help-centre locale-switcher URL slugs — a rare cross-locale naming artefact:

| Mode | de | es | fr | it | pt-BR |
|---|---|---|---|---|---|
| `Flashcards` | `Karteikarten` | `Fichas` | `Cartes` | `Flashcard` | `Cartões` |
| `Learn` | `Testen` *(see below)* | `Aprender` | `Apprendre` | `Impara` | `Aprender` |
| `Test` | `Testen` | `Probar` | `Test` | `Test` | `Avaliar` |
| `Match` | `Zuordnen` | `Combinar` | `Associer` | `Abbina` | `Combinar` |
| `Progress` | `Fortschritt` | `avance` | `progression` | `Progressi` | `progresso` |

**The German slugs for `Learn` and `Test` are identical** — both render as `Mit der Lernaktivität <em>Testen</em> lernen`. Two distinct modes collapsed onto one German name (`Testen`) in the article slugs. Either a translation-management error or a genuine de-DE naming collision; either way, a German user searching for one mode will find the other. This is the single most serious localisation defect found in this batch.

Note also that Italian keeps the English `Flashcard` (singular) while every other locale translates it, and that Portuguese renders `Test` as `Avaliar` (to assess) rather than a cognate — a better semantic fit than the English.

### No level vocabulary exists `[absent]`

Worth stating for the record: across 18 pages there is **no** proficiency level, no beginner/advanced label, no framework alignment, no prerequisite. The only use of "level" is `adapted to your level` (study paths) and `the level that works best for you` (grading options) — both referring to a derived or user-chosen setting, never to a named tier. `Standard high school–level` and `college-level` appear as *content* descriptors in Expert Solutions, not as learner levels.

The substitutes are: **mastery buckets** (term-level, three states), **strictness** (`Relaxed`/`Moderate`/`Strict`), and **goal** (unpublished options). Quizlet levels the *material and the tolerance*, never the learner.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout, imperative for procedures ("Open a set", "Select **Learn**", "Flip the card to see the answer"). First-person plural is rare and appears mainly in the learning-science page ("Robust learning science principles guided us in creating tools to help you learn", "The question types on Quizlet were carefully designed") and the mission statement ("Our mission is to harness the world's knowledge"). Note the passive voice in "were carefully designed" — the company hides behind its own artefact at the one point it is claiming credit for pedagogy.

**Register is split cleanly by surface.** Help procedures are terse, numbered, bolded-control imperatives with no ornament. The learning-science page is the only place the voice warms up, and it does so with **exclamation-marked directives**: "Keep practicing retrieval, even after you get a question right the first time!", "make sure to try to recall the right answer before you look at the solution!" Those are the only two exclamation marks in Quizlet's expository copy, and they land on the two pieces of study advice the page most wants the reader to act on. Deliberate, and effective.

The mode descriptions add a third register — **game-show energy for the Activities group**: "whoever has the most points wins!", "try to beat your top score!", "Race against the clock", "be the first to blast the right rock", "Be careful—one second is added to your time for each incorrect match!". Four exclamation marks clustered entirely in the game modes. So the tone gradient runs: **flat for procedures → warm-imperative for pedagogy → exclamatory for games**, and it tracks the `Study activities` / `Activities` boundary. Register is being used as a third signal of the same distinction (T13).

**Tips are labelled, not decorated** `[observed]`: `**Tips**` as a bold heading in every mode article, with the content as plain bullets. No emoji, no glyph, no callout box in the extracted markup. Compare MasterClass's three inconsistent 🗒 variants (127) and Brilliant's 🎯 (126). Quizlet's plain-bold `Tips` heading is the most accessible of the three approaches — it announces as a heading rather than as an unlabelled image.

**Contractions used freely** ("you'll", "doesn't", "Can't hear audio?", "Here's how to cancel"). No `Oops!`. No apology language anywhere.

**Numbers** `[observed]`: `eight different ways`, `six pairs per game`, `one second`, `three or more cards` (grading eligibility), `24 hours`, `1–4 number keys`, `10 a.m. local time`, `four or more days`, `22 articles` / `26 articles` / `12 articles` (in `See all` labels). Precise where it matters. `95%` and `20 million` come from the stale homepage and are not treated as current.

**Accessibility content**

- **The accessibility statement is linked from every help-centre footer but returned an empty body on two attempts.** `[absent]` `quizlet.com/accessibility` is present in the IA and unreachable via this route. Given that every other `quizlet.com` main-domain page also served stale or empty content, this is most likely a fetch-path problem rather than a missing page — but it cannot be confirmed, and no accessibility-statement copy is recorded.
- **Audio is documented as a first-class affordance, with its failure mode** `[documented]`: text-to-speech and user voice recordings on cards; the speaker icon is documented with its accessible name in parentheses ("Select 🔊 (speaker)"); `Show advanced audio options` for playback settings; and the limitation named — "Can't hear audio? **Text-to-speech may not be available in one of the languages you're studying.**" Also `Audio Notes` and `Audio recap`-style features (titles only).
- **Keyboard operation is documented for the two most-used modes** `[documented]`: "Use the arrow buttons on your keyboard or click the arrows below the card to go forward or back" (Flashcards); "Use the space bar to flip cards and the 1–4 number keys to rate your recall" (Spaced Repetition). Documenting keyboard equivalents *in the feature article* rather than in a separate accessibility page is good practice.
- **Text alternatives for icons are provided in the help copy** — the parenthetical-gloss pattern (`🔊 (speaker)`) appears with an image alt of `Speaker_-_Resized.png` in the source. So the *documentation* names the icon while the *image* carries a filename as its alt. Mixed.
- **Image alt text in help articles is filename-based** `[observed]`: `Speaker_-_Resized.png`. Screenshots in Zendesk-hosted articles inherit upload filenames as alt text, which is a systemic Zendesk-authoring weakness rather than a Quizlet-specific decision, but it is a real defect on articles whose procedures depend on the screenshots.
- **Theming-asset images have empty alt** `[observed]` — the category header illustrations, the store badges, and the PRIVO certification seal all render with no accessible name. The PRIVO seal in particular carries compliance meaning and is unlabelled.
- **A duplicated, unlabelled profile control** `[observed]`: every help page renders an empty `![]()` immediately followed by a link labelled `Username` — an avatar image with no alt adjacent to a text link. The text link carries the name, so this is redundant-rather-than-broken, but `Username` as a literal link label (rather than an actual username, since the user is unauthenticated) is a placeholder leaking into the rendered page.
- **Per-platform triplication is the main accessibility cost** (T11): mode articles repeat their full procedure three times with no structural signposting in the no-JS/screen-reader path. The grading-options article states `Relaxed`/`Moderate`/`Strict` three times identically.
- **19-locale help centre** with localised mode names is a substantive internationalisation investment, undercut by the de-DE `Learn`/`Test` collision.
- **`IOS` rendered all-caps** throughout, rather than `iOS`.
- **No `Skip to content` link observed** in the help-centre markup. `[absent]`
- **COPPA/child-safety surface is substantial** `[observed]`: PRIVO certification seal, `Community and Safety` as a top-level help category, `Honor code`, `Community guidelines`, `Parents` footer link, and the parental-consent resend article promoted globally.

**Negative findings, recorded honestly**

1. **`quizlet.com` main-domain pages served a stale variant.** The homepage and `/upgrade` copy appear to be years out of date; `/features/study-modes` and `/accessibility` returned empty bodies. The `$19.99 per year` figure on `/upgrade` is **not** treated as current.
2. **Two progress vocabularies**: `Mastered` (Progress) vs `Know` (Flashcards), and `Still Learning` vs `Still learning`.
3. **German help slugs collapse `Learn` and `Test` onto one name (`Testen`).**
4. **A category and its child section are both named `Studying`** — the breadcrumb reads `Studying › Studying`.
5. **"Study eight different ways" does not reconcile** with the taxonomy, which names up to 13 things.
6. **`Answer with` (web) vs `Card Orientation` (mobile)** for the same Flashcards setting.
7. **`flashcard set` vs `study set`** — an unresolved rename, with the legacy term reappearing in new articles.
8. **`mode` suffix retired unevenly**: `Test` dropped it; `Write mode` and `Spell mode` keep it; prose says "Learn mode" where the Learn article never does.
9. **Trial article says "24 hours before your renewal date"** where the relevant deadline is the trial end date — and reuses the `Cancel auto-renewal` control for a trial.
10. **Mobile cancellation has a confirm step (`Yes, finish canceling`) that web does not**; trial cancellation has a required `cancellation questions` step that auto-renewal cancellation does not.
11. **Per-platform content triplicated** in every mode article with no signposting.
12. **Four different progress-persistence behaviours** across Test / Flashcards-mobile / study path / Progress, with no reconciling article.
13. **`For students` vs `For Teachers`** — casing inconsistency in the footer, repeated in `Quizlet Plus for teachers`.
14. **`Start test`/`Start Test` and `Start studying`/`Start Studying`** — casing differs within single articles.
15. **Global `Popular Articles` rail is not contextual** — the same six links on every page, headed by the COPPA consent resend.
16. **Help-article image alt text is filename-based**; theming assets and the PRIVO seal have empty alt.
17. **`Username` placeholder link label** rendered on every help page while unauthenticated.
18. **A locale-specific article pair (`(US)` / `(UK)`) is exposed in the en-US index.**
19. **`Parents` footer link routes to a pricing page** (`/features/family-plan`) rather than to safety information.
20. **Three entry URLs for one help centre** (`help.quizlet.com`, `quizlet.zendesk.com`, `quizlet.com/help`).

---

## Transferable patterns

1. **Let the verb in the label carry the seriousness of the activity, and make the data model agree.** `Studying with Learn` vs `Playing Match`; `Study activities` vs `Activities`; `Start test` vs `Start game`; and then "Progress is not tracked on game modes." Four surfaces, one boundary, no explanation needed. Transfers anywhere a product mixes a consequential flow with a low-stakes one — simulation vs. live, practice vs. real payment, sandbox vs. production. Condition: the data model must actually match the naming, or the distinction becomes a lie the first time a user checks.

2. **Name the failure state by what happens next, not by what went wrong.** `Repeat` — not `Again`, `Wrong`, or `Forgot`. The only one of the four recall ratings that is an instruction rather than a verdict, and it is the failure case. Directly reusable for any self-assessment, retry, or confidence-rating control.

3. **Three-state progress with a present-participle middle.** `Not Studied` (passive, blameless) / `Still Learning` (activity in progress) / `Mastered` (the one ambitious claim). And make each state a tappable filter, so progress is navigation rather than decoration. The middle-state grammar is the transferable part: a present participle turns a deficiency into a process.

4. **State the consequence beside every rating option.** `Okay` → "The card typically returns in about a day." A self-report is only honest if the user can see what it costs them. Applies to risk questionnaires, notification-frequency pickers, confidence sliders, and any triage control. Condition: hedge algorithmic estimates (`typically`) and do not ship a vague one — `soon` for `Hard` is the weak link in Quizlet's own set.

5. **Ship strictness as a user setting with its purpose stated first, its defaults explained, and its exclusions named.** "Grading options let you choose how strictly Quizlet checks your answers **so you can focus on understanding concepts at the level that works best for you**", then `Relaxed`/`Moderate`/`Strict` with per-level default conditions and a specific exclusion list ("Chinese, Japanese, math, chemistry, Akkadian, or photo-only sets"). The named exclusions are what make it credible. Transfers to matching tolerance, fuzzy search, validation leniency, fraud thresholds.

6. **Publish the limitation of your own easy mode.** "you might get multiple choice answers correct by process of elimination, or simply by recognizing the right answer, without practicing recall." Naming why the default is weaker than the alternative earns the right to recommend the harder path. Applies to any product with a quick option and a thorough one.

7. **Two registers for one mechanism.** `guidance fading` on the evidence page for the person evaluating the product; "questions that get progressively harder" in the help centre for the person using it. Same mechanism, audience-appropriate vocabulary, and neither register leaks into the other.

8. **A complete action × channel matrix, with a cross-channel router above the procedure.** Four billing actions × three purchase channels = twelve articles, every cell filled, plus "Paid in the Apple App Store? Here's how to cancel" placed *before* the steps. Immediately reusable for any product sold through multiple marketplaces.

9. **Name the recurring charge, not the relationship.** `Cancel auto-renewal` rather than `Cancel subscription` — the label and the outcome agree, so nothing has to be walked back. Pair with `Yes, finish canceling` as the confirm: affirmative, and `finish` frames the click as completing rather than destroying.

10. **Put the "what survives" reassurance inside the cancellation procedure.** "If your subscription ends, you'll still have access to all your sets, folders, and classes" — repeated in all three platform blocks, not relegated to a linked article. Name the specific artefacts (sets, folders, classes, images, audio) rather than saying "your data is safe."

11. **Embed the diagnostic branch at the step where it fails.** "Select **Manage subscription**. **If you don't see this option, your subscription may not be set to renew.**" The absent-control case is the commonest silent failure in a settings flow; pre-answer it in the procedure rather than in a troubleshooting article.

12. **Preserve deprecated names as findable aliases.** `Write mode` and `Spell mode` keep live help articles whose entire body says "this is now part of Learn mode… access it in the Options menu." Retains search traffic and user memory at the cost of two short pages. And for genuine removals, state it flatly with a functional substitute: "Gravity is no longer available. For a timed practice activity, try Match!"

## Caveats & gaps

- **`quizlet.com` served a stale variant and this is the file's central limitation.** The homepage copy references `Quizlet Live` as new and cites "more than 20 million students and teachers each month"; `/upgrade` lists six benefits, none of which is an AI feature the current help centre documents, and quotes `$19.99 per year`. **No current price, no current homepage positioning, and no current marketing-page copy is established here.** Everything load-bearing in this file comes from `help.quizlet.com`, which served current content (articles updated through 2026).
- **`quizlet.com/features/study-modes` returned an empty body** — the dedicated study-modes marketing page, i.e. the single most on-brief page for this product, was unreachable. The mode inventory in T13 is reconstructed from the help centre instead, which is arguably the better source but is not the marketing register.
- **`quizlet.com/accessibility` returned an empty body on two attempts**, despite being linked from every help-centre footer. No accessibility-statement copy is recorded.
- **The Learn goal-picker options are unpublished.** The prompt is documented in four different phrasings (`Choose a goal for your session` / `Select how you want to study` / `Select a goal`) but not one goal option label appears in public copy. This is the largest single gap against T4, since the goal picker is Quizlet's only level-setting-adjacent control.
- **No wrong-answer feedback string was captured.** Quizlet's answer to wrong answers is a setting (`Relaxed`/`Moderate`/`Strict`) plus `Retype correct answers`; the actual in-session feedback microcopy is behind auth.
- **`/features/flashcards`, `/features/test`, `/features/learn` were not fetched** — the three modes Quizlet promotes as products have dedicated marketing pages whose value-proposition copy is unharvested. Given that `/features/study-modes` and `/features/how-quizlet-works` behaved differently (empty vs. plain-text), these may well have been retrievable.
- **~45 help-article titles captured but not opened**, including the whole `Troubleshooting` and `Community and Safety` categories, `What are flashcard sets?`, `What happens to my content if my paid subscription ends?`, `Studying with Answer Streaks`, `Studying with Ask Quizlet`, `Playing Charms`, `Studying with Audio Notes`, `Studying with Study Groups`, `Using Study with friends`, `Studying with Practice Tests`, `Studying with Study Guides`, `Studying with Quizlet Expert Solutions`, `Studying with Write mode`, `Studying with Spell mode`, `Using error checking options (UK)`, `Resetting study path progress`, `Navigating your home feed on mobile devices`. The AI-feature articles and the UK error-checking article are the highest-value of these.
- **All in-product strings are `[documented]`**: every mode launcher, every Options label, `Not Studied`/`Still Learning`/`Mastered`, `Repeat`/`Hard`/`Okay`/`Easy`, `Relaxed`/`Moderate`/`Strict`, `Cancel auto-renewal`, `Yes, finish canceling`. Marked as such throughout.
- **T8 (empty states) is genuinely absent** from the reachable surface.
- **T12 (FAQs) is effectively absent** — no FAQ block on any retrievable marketing page.
- **Localised mode names in T13 are inferred from help-centre URL slugs**, not from rendered localised pages. The de-DE `Learn`/`Test` collision is therefore a slug-level observation and should be confirmed against the rendered German help centre before being cited as a product defect.
- **Teacher and school surfaces unharvested**: `Teaching` and `Quizlet for Schools` help categories, `/features/quizletforschools`, `/features/live`, `/features/family-plan`, `Using Assignments`.
- **`Honor code` and `Community guidelines` not opened** — for a UGC platform serving minors these are the two most likely sources of published policy voice.
- **Mobile app copy not harvested.**
- **No blocked domains.** `help.quizlet.com` served every requested page. `quizlet.com` responded but served stale content on three pages and empty bodies on two — recorded as stale/empty responses rather than blocks.

## Sources

1. https://quizlet.com/ *(stale variant)*
2. https://quizlet.com/upgrade *(stale variant)*
3. https://quizlet.com/features/how-quizlet-works
4. https://quizlet.com/features/study-modes *(empty body)*
5. https://quizlet.com/accessibility *(empty body, two attempts)*
6. https://help.quizlet.com/hc/en-us
7. https://help.quizlet.com/hc/en-us/categories/360001601132-Studying
8. https://help.quizlet.com/hc/en-us/sections/360005938691-Studying
9. https://help.quizlet.com/hc/en-us/categories/360001598931-Billing
10. https://help.quizlet.com/hc/en-us/articles/360030841732-Studying-on-Quizlet
11. https://help.quizlet.com/hc/en-us/articles/360030988091-Studying-with-Flashcards
12. https://help.quizlet.com/hc/en-us/articles/360030986971-Studying-with-Learn
13. https://help.quizlet.com/hc/en-us/articles/360030642972-Studying-with-Test
14. https://help.quizlet.com/hc/en-us/articles/360031183611-Playing-Match
15. https://help.quizlet.com/hc/en-us/articles/360048803491-Using-Progress-for-targeted-studying
16. https://help.quizlet.com/hc/en-us/articles/360048314692-Setting-up-a-study-path
17. https://help.quizlet.com/hc/en-us/articles/360048313652-Using-grading-options-US
18. https://help.quizlet.com/hc/en-us/articles/48324742264077-Studying-with-Spaced-Repetition
19. https://help.quizlet.com/hc/en-us/articles/360029963211-Canceling-auto-renewal-if-you-paid-on-the-website
20. https://help.quizlet.com/hc/en-us/articles/360038664051-Canceling-a-free-trial-if-you-signed-up-on-the-website
