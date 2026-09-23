# 127. MasterClass

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Celebrity-taught video courses / streaming-style learning subscription (multi-product family: MasterClass, Certificates, Executive, On Call, At Work) |
| Primary URL | https://www.masterclass.com/ |
| Corpus rank | 127 |
| Benchmark strength (source list) | Discovery and course framing |
| Locale / market observed | en-US |
| Platform observed | Web (desktop), own-built help centre, class detail page, checkout step 1 |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | CCPA/CPRA (separate California Privacy Notice + "Do Not Sell or Share My Personal Info"); COPPA-adjacent age gating stated in copy (under-13 barred, 13-17 require guardian approval); app-store marketplace terms disclaimed per ToS §3.3 |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — `/browse` returned an empty body; `/checkout` renders only step 1 of 3 pre-auth so no plan names or prices were observed; the homepage instructor carousel is images-only with empty alt |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.masterclass.com/ | Hero, intent-picker, instructor carousel, footer IA |
| Learn more (pre-signup explainer) | https://www.masterclass.com/learn-more-about-masterclass | First screen of a multi-step explainer flow; `Skip` link |
| Browse | https://www.masterclass.com/browse | **Empty body returned** |
| Plans / checkout | https://www.masterclass.com/plans → /checkout | 3-step progress indicator; all-plans inclusion list; no prices rendered |
| Class detail page | https://www.masterclass.com/classes/gordon-ramsay-teaches-cooking | Instructor-led naming, lesson count/runtime, `Skills You'll Learn` |
| Help centre index | https://www.masterclass.com/help-center | Five product-scoped entry points |
| Help: MasterClass product hub | https://www.masterclass.com/help-center/masterclass | 4 sections, ~40 article titles |
| Cancelling Your Subscription Renewal | …/answers/cancelling-your-subscription-renewal--id--M2McWBvNTh-WNRR6llmkAw | Richest T10 source |
| About MasterClass Membership Plans | …/answers/about-master-class-membership-plans--id---KTOuuyVSJOaE7YwVZu2Og | Auto-renew rationale, 30-day reminder, plan tiers |
| Requesting a Refund | …/answers/requesting-a-refund--id--ffUda_F-TPqkca5o9hJc5g | Renewals not refundable; per-marketplace routing |
| 30-Day Satisfaction Guarantee | …/answers/what-is-your-30-day-satisfaction-guarantee--id--7RGbse64Rhyb35P39wYrBw | **Duplicate article IDs exist — see T10 defects** |
| About MasterClass Classes | …/answers/about-master-class-classes--id--GfYxwjzXQuSxglxsayS8Hg | Class shape, Sessions, age gating |
| Introduction to MasterClass | …/answers/introduction-to-master-class--id--gFEO15QFQg2i7Gm2qVgEHg | Lesson-count and duration norms |
| Managing Your Class Progress | …/answers/managing-your-class-progress--id---_w7CkGpS22PrV3Fi6khLQ | Progress persistence, Continue Watching |
| Subtitles & Closed Caption | …/answers/subtitles-closed-caption-for-classes-on-master-class--id--yYHVYXdyTqKeUsQCZ0RnZQ | Sole accessibility artefact |

---

## T1 Navigation & IA labels

**A product bar sits above the site nav** `[observed]`

`MasterClass` · `Certificates` · `On Call` · `Executive` · `At Work`

Five sibling products in a top strip, on every page including help articles. The main nav below it is startlingly minimal: `Browse` · a search field · `Get` · `Gifts` · `View Plans` · `Log In`. There is no category nav, no "Classes", no "Instructors" — discovery is routed entirely through `Browse`, search, and the homepage intent-picker.

**`Get` as a nav item** is the single strangest label in this corpus so far. It appears three times per page (nav, mobile menu, and hero) as a bare transitive verb with no object, linking to `/find-my-classes`. A user cannot tell from the label whether `Get` means get started, get the app, or get a subscription. It is presumably an A/B-tested shortening of "Get MasterClass", and it fails the read-aloud test. Flagged as a defect in T3.

**Search placeholder is a question, not a prompt** `[observed]`: `What do you want to learn today?` — the placeholder carries the discovery frame for the whole product.

**Help centre is scoped by product, not by task** `[observed]` — five entry cards, each with a one-line scope statement:

| Product | Scope line (verbatim) |
|---|---|
| `MasterClass` | "Unlimited access to 200+ classes from the world's best" |
| `MasterClass Certificates` | "Career-advancing credentials from the world's best" |
| `MasterClass Executive` | "A new kind of business education built by the world's best." |
| `MasterClass On Call` | "Personalized advice from the AI of the world's best" |
| `MasterClass At Work` | "Learning solutions for employees from the world's best" |

**All five scope lines end in "the world's best."** Four use it as a prepositional tail ("from the world's best"), one varies to "built by the world's best." This is the most disciplined phrase-reuse observed in this batch — a single positioning phrase carried as a suffix across an entire product family, so the differentiator sits in the *front* of each line (`Unlimited access` / `Career-advancing credentials` / `A new kind of business education` / `Personalized advice` / `Learning solutions for employees`) and the constant sits at the back.

It also produces one genuinely peculiar construction: **`Personalized advice from the AI of the world's best`**. "The AI of the world's best" is a possessive that does a lot of work — it is neither "AI trained on" nor "AI versions of," and it lets MasterClass sell an AI product without stating what the AI is a copy of.

Note that only one of the five entries is punctuated with a full stop (`Executive`). Inconsistent.

**Help sections within the MasterClass product** `[observed]`: `Popular Articles` → `Account & Billing` → `Getting Started` → `Using MasterClass` → `Troubleshooting`. Note the ordering: **billing comes before getting started.** For a product with a 30-day guarantee and an annual auto-renewing charge, that ordering is a truthful reflection of why people arrive.

**Breadcrumbs** `[observed]`: three levels, `Help Center` → product → article title. Every help article also re-renders the product name and its scope line as an H1 *above* the article H1, so article pages carry two headings — `# MasterClass` / "Unlimited access to 200+ classes from the world's best" then `# Cancelling Your Subscription Renewal`. Duplicated H1s on every help page is an accessibility and structure defect (see T14).

**Footer groupings — four, and unusually editorial** `[observed]`

| Group | Items |
|---|---|
| `Explore` | `Articles` · `Sitemap` · `Gifts` · `Member Wins` |
| `About` | `Diversity, Equity, and Inclusion` · `Careers` · `Newsroom` · `Security` · `Privacy` · `Learner Guidelines` · `CA Privacy Notice` · `Do Not Sell or Share My Personal Info` · `Terms` · `Social Impact` · `MasterClass at Work` · `Support` |
| `Social` | five networks |
| `Download` | `Download on the App Store` · `Get it on Google Play` · `Available at amazon app store` · `Available on Roku` |

`Member Wins` is the notable one — a footer link to learner outcome stories, i.e. the only place on the public site where the *result* of watching is evidenced. Given that the product deliberately avoids promising skill acquisition (T2), pushing outcome proof to a footer link is a considered choice: it is available to the sceptic without being a claim on the marketing surface.

`Learner Guidelines` as a distinct artefact from `Terms` is also worth noting — a behavioural code for learners, separate from the contract.

The four download destinations (`App Store`, `Google Play`, `amazon app store`, `Roku`) declare the real product category: **this is a streaming service**, and its distribution list looks like Netflix's, not Coursera's. Note the casing inconsistency — `Available at amazon app store` is lowercase where the other three are title case, and the preposition changes (`on`/`at`/`on`).

## T2 Value proposition & headline patterns

**Hero — a parallel construction with a comma splice** `[observed]`

> Headline: `Learn from the best,` `Be your best.`
> Subhead: "Get unlimited access to thousands of bite-sized lessons."
> Price line: "Starting at $10/mo (billed annually)."
> CTAs: `Get` · `Learn more about MasterClass`
> Trust line: `30-day money-back guarantee`

Six elements stacked, and the sequence is the interesting part: **aspiration → volume → price → action → risk reversal.** The guarantee is the last thing on the screen, immediately under the CTA, which is where a subscription product with an annual up-front charge needs it.

`Learn from the best, Be your best.` is the whole positioning problem solved in six words. It does **not** say you will become good at cooking. It says you will become *your* best — a claim that cannot be falsified and does not promise a skill. This is the core answer to the brief's question about framing value without promising skill acquisition: **MasterClass transfers the credential from the outcome to the instructor.** The proof is that the best people teach it; what you get is exposure to them. "the best" appears twice in one line, once about them and once about you.

**Three competing scale claims across three surfaces** `[observed]` — and they do not agree:

| Surface | Claim |
|---|---|
| Homepage hero | "thousands of bite-sized lessons" |
| Help centre scope line (every page) | "Unlimited access to 200+ classes from the world's best" |
| Learn-more explainer | "unlimited access to 200+ classes across business, tech, arts, and leadership—with new releases added monthly" |
| Class detail page | "Get this class and 200+ more" |
| Help: Introduction | "hundreds of video lessons taught by over 200 of the world's best" |

`200+` is used to count **classes** on three surfaces and **instructors** on one ("over 200 of the world's best"). And `thousands of lessons` vs `hundreds of video lessons` is a direct contradiction between the homepage and the help centre. The reconciliation is presumably that 200+ classes × ~20 lessons = ~4,000 lessons, so both are arguably true — but a reader who sees both will distrust one. Recorded as a defect.

**The unit of value shifts by surface** `[observed]`, and it shifts in a revealing direction:

- Homepage: `lessons` (thousands) — volume framing, for the undecided
- Help/explainer: `classes` (200+) — coherent-unit framing, for the buyer
- Class page: `Lessons · runtime` (`20 Lessons · 3hr 54mins`) — time-commitment framing, for the learner

**Category naming on the explainer** `[observed]`: `business, tech, arts, and leadership`. Four categories, and notably **`leadership` is broken out from `business`** — a signal that the business-adjacent audience is being segmented (and it maps onto the separate `Executive` product).

**"Instructor" is the load-bearing noun.** The class-page title construction is `<Name>` / `Teaches <Subject>` rendered as two stacked lines:

> `# Gordon Ramsay`
> `Teaches Cooking I`

The person's name is the H1; the subject is a subordinate line. The URL slug preserves the same order (`gordon-ramsay-teaches-cooking`), as does the `<title>` (`Gordon Ramsay Teaches Cooking I`). **The naming grammar is `<Person> Teaches <Subject>` — never `<Subject> with <Person>`, never `<Subject> 101`.** Every class in the catalogue inherits this. The pedagogical implication is explicit in the structure: you are not enrolling in Cooking, you are watching Gordon Ramsay.

The Roman numeral (`Cooking I`) handles sequels without implying difficulty level — `I` is an instalment, not a tier. The class blurb confirms it: "Gordon's first MasterClass on essential methods, ingredients, and recipes." First-name-only reference ("Gordon's") in the blurb, full name in the heading — the register moves to familiarity within two lines.

**Class-page value line hedges the skill claim carefully** `[observed]`:

> "Take your cooking to the next level in Gordon's first MasterClass on essential methods, ingredients, and recipes."

`Take your cooking to the next level` presupposes you already cook and promises relative improvement without naming a destination. Compare the meta description for the same page, which is far more aggressive and reads like older copy: "Go beyond recipes. Explore the meaning of ingredients, process, presentation. Go inside Gordon Ramsay's kitchen and take your cooking to the next level. Teaching Assistant. 30-Day Money Back. Video Lessons. Hours of Content." That last fragment run ("Teaching Assistant. 30-Day Money Back. Video Lessons. Hours of Content.") is keyword-stuffing left in a meta tag, and `Teaching Assistant` names a feature that appears nowhere on the live page. Recorded as a stale-metadata defect.

**`Skills You'll Learn` — the one place a concrete skill promise is made** `[observed]`

A numbered four-item list, each item a physical technique rather than a competence:

1. `Knife skills`
2. `Breaking down a whole chicken`
3. `Elevated scrambled eggs`
4. `Pasta dough`

This is the sharpest content-design move on the page. The section heading promises *skills*; the items deliver **four nameable, checkable, dinner-party-recountable artefacts**. "Elevated scrambled eggs" is not a skill — it is a thing you will be able to say you learned from Gordon Ramsay. The list converts an unfalsifiable subscription into four concrete souvenirs, which is exactly how an inspiration product survives the "but what did I actually get" question.

Adjacent link: `View lesson plan` — "lesson plan" is schoolroom vocabulary, and it is the only such borrowing on the page.

**Help-centre product descriptions as a headline set** `[observed]` — see T1. `A new kind of business education built by the world's best.` is the only one that claims novelty; `Career-advancing credentials` is the only one that claims an outcome, and it belongs to the separate `Certificates` product. **The core MasterClass product never claims a credential or a career outcome.** The moment MasterClass wants to make that claim, it spins up a different product with a different name. That separation is the most instructive thing in this file.

**Newsletter block headline** `[observed]`: `Join the inner circle.` — "Get updates on new classes, insights from world-class icons, and our latest promos." `icons` is the noun used for instructors here, where the class page uses `instructor` and the help centre uses "the world's best." Three nouns for the same people across three surfaces (see T13).

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Get` | Nav (×2), hero, mobile menu — 3-4 instances/page | **Bare transitive verb with no object.** Links to `/find-my-classes`. Fails read-aloud; ambiguous for screen readers |
| `Learn more about MasterClass` | Hero, secondary | Fully specified — the object is named, unlike `Get` |
| `View Plans` | Nav | Noun-phrase, and the destination is `/checkout` not `/plans` |
| `View Plans` | Checkout step 1, after inclusion list | Same label used for the nav entry *and* the in-flow advance |
| `Gifts` | Nav | Plural noun |
| `Log In` | Nav | Two words, capitalised both |
| `Continue` | Homepage intent-picker | Advances after selecting a motivation |
| `Submit` | Newsletter | Generic; the consent copy does the work |
| `Skip` | Learn-more explainer, top-right | Links directly to `/plans` — an explicit escape from the explainer into the funnel |
| `Next` | Learn-more explainer, step advance | |
| `Watch Trailer` | Class page, ×2 (mobile + desktop hero) | Streaming vocabulary |
| `View lesson plan` | Class page, beside `Skills You'll Learn` | Schoolroom vocabulary in a streaming context |
| `Get this class and 200+ more` | Class page, conversion block | **Best CTA-adjacent line on the site** — reframes a single-class intent as a catalogue purchase in eight words |
| `Skip To Main Content` | First in DOM, every page | Accessibility; note the title-cased `To` |
| `Cancel Membership` | `[documented]` — Account Settings › Membership | Says "Cancel", not "Manage" |
| `Cancel Now` | `[documented]` — confirmation screen | Two-step: `Cancel Membership` → `Cancel Now` |
| `Reactivate` | `[documented]` — settings, post-cancellation | Re-subscribe path named and documented |
| `Manage Membership` | `[documented]` — mobile app profile | Different label from web (`Settings` › `Membership`) |
| `Return for Refund` | `[documented]` — Amazon Your Orders | Third-party control, quoted for routing accuracy |
| `Request a refund` | `[documented]` — Apple / Google Play | Third-party controls |
| `Go to the App` | `[documented]` — mobile-web interstitial | **Users are told to ignore it** — see T7 |
| `contact support` / `chat with the Support Team` | Help articles, inline | Routes to `/help-center/chat` |
| `Back` | Every help article foot | Bare browser-style back; no `Was this helpful?` control observed |

**Observations.**

1. **`Get` is the defect.** Three-to-four instances per page of a one-word verb with no object. Compare the hero's own secondary CTA, `Learn more about MasterClass`, which is fully specified. The inconsistency within a single hero (`Get` / `Learn more about MasterClass`) suggests `Get` is a tested-and-won label rather than a considered one.
2. **`View Plans` points to `/checkout`.** The label promises a comparison page; the URL is a three-step purchase funnel whose first step is `Membership`. A user clicking `View Plans` lands in step 1 of 3. The label is not lying (plans are selected there) but it under-discloses that you are entering a funnel.
3. **Cancellation is named with the actual word.** `Cancel Membership` then `Cancel Now` — no euphemism, no "Manage". Notably better than Brilliant's `Manage subscription`, and directly comparable.
4. **`Get this class and 200+ more`** is the pattern worth stealing: when a user arrives with single-item intent on a subscription product, the CTA should name the item *and* the catalogue, in that order.

## T4 Onboarding, level-setting and instructional scaffolding — PRIORITY

MasterClass has **no level-setting at all**, and that absence is itself the finding. There is no placement test, no proficiency tier, no prerequisite, no beginner/advanced label anywhere in the inspected surfaces. What it has instead is **intent-setting**.

### The intent-picker — a motivation survey in place of a diagnostic `[observed]`

Immediately below the hero, before any content:

> `What brings you to MasterClass today?`

Eight options, then `Continue`:

1. `Develop my career or leadership skills`
2. `Learn about AI and how to leverage it`
3. `Become a better actor, musician, or writer`
4. `Cultivate a healthy and active lifestyle`
5. `Learn about science & technology`
6. `Become a better chef`
7. `Improve my style, art, or interior design`
8. `Something else`

The grammar is the artefact. **Every option is first-person and goal-shaped, and the verbs are graded by how much they promise:**

| Verb | Options | Implied claim |
|---|---|---|
| `Develop` | career/leadership | professional gain |
| `Learn about` | AI, science & technology | exposure only — the weakest verb, used for the two most technical topics |
| `Become a better` | actor/musician/writer, chef | comparative, no destination |
| `Cultivate` | healthy lifestyle | ongoing, no endpoint |
| `Improve` | style/art/interior design | comparative |

Five of eight options use a **comparative or continuous verb with no terminal state** (`better`, `cultivate`, `improve`, `develop`). Only one names an outcome you could be tested on (`Develop my career or leadership skills`), and even that is hedged by "or leadership skills." The two topics where a user might expect measurable competence — AI and science/technology — get the weakest verb in the set, `Learn about`. That is precise, deliberate expectation management encoded in a picker's option labels.

`Something else` as the eighth slot is a genuine catch-all rather than laziness: it gives the writer somewhere to put every remaining vertical without an eighth specific label.

Note the topic-ordering: career/leadership first, AI second. AI in slot two of a celebrity-instructor product is a recency signal — the picker is being used as a currency-of-interest surface, the way Wise uses its FAQ block for currency-of-policy.

**This picker replaces a placement test with a *routing* test.** The question is not "what can you do?" but "why are you here?" — which is the only honest question for a product whose outcome is inspiration. A content designer should read this as the canonical answer to "how do you onboard when you cannot measure the user."

### The pre-signup explainer — a stepped flow with an escape hatch `[observed]`

`/learn-more-about-masterclass` is a multi-step explainer, not a page. Step 1 retrieved:

> Eyebrow: `About MasterClass`
> Headline: `Learn from the world's best.`
> Body: "Get unlimited access to 200+ classes across business, tech, arts, and leadership—with new releases added monthly."
> Controls: `Skip` (→ `/plans`) · `Next`

Two things. First, the headline is a **third variant** of the hero line (`Learn from the best,` / `Learn from the world's best.` / "from the world's best"), so the phrase mutates across surfaces — see T13. Second, `Skip` routes straight to plans. The explainer is optional and the escape is to the purchase, not to the catalogue. Honest about its own purpose.

### Instructional scaffolding inside a class `[documented]`

Because there is no level, the scaffolding is entirely **structural and temporal**, and the help centre states the norms plainly:

- "Most classes include around 20 video lessons that average about 10 minutes each." (Introduction to MasterClass)
- "Classes vary in length, ranging from short, focused lessons to multi-hour deep dives." (About MasterClass Classes)
- "Each class begins with an introduction and includes a curated sequence of lessons you can move through at your own pace."
- Class page renders the exact figure: `20 Lessons · 3hr 54mins`

`curated sequence` is the scaffolding claim — order is editorial, not adaptive. And the very next sentence disarms it: "While some classes may suggest workflows or practice activities, **you're always encouraged to learn in the way that feels best for you.**"

That sentence is the pedagogical position of the whole product in one line. The sequence exists but is non-binding. Compare Brilliant, where the sequence is enforced on the free tier and its enforcement is sold as pedagogy. MasterClass explicitly **releases the user from its own structure** — which is the correct move when the promise is inspiration, and a fatal one if the promise were competence.

### The one structured alternative, named separately `[documented]`

> "If you prefer a more structured, hands-on learning experience, MasterClass also offers **Sessions**. Sessions provide step-by-step projects, guided activities, and community interaction within a defined curriculum."

`Sessions` is a *named sibling format* for users who want scaffolding, with `step-by-step`, `guided`, `defined curriculum`, and a `30-day` suggested timeframe. Crucially the timeframe is immediately de-fanged: "this is not a hard deadline and you may progress at your convenience."

So the product family carries three scaffolding intensities under three names: **classes** (curated but non-binding) → **Sessions** (defined curriculum, soft deadline) → **Certificates** (a separate product entirely, "Career-advancing credentials"). Scaffolding intensity and outcome claim rise together, and each step gets its own name. That is disciplined.

### Other scaffolding and add-on framing `[documented]`

- `Class Guides`, `recipes`, "other supplemental resources" — but gated: "These materials are part of the **Learning Toolkit** and are available only to members who have purchased the **Learning Toolkit Add-On**." A paid add-on for the course materials, disclosed in the class-shape article rather than on the class page.
- `Audio-only mode` (checkout inclusion list) — scaffolding for passive consumption, listed as a plan benefit.
- `Certificate of Completion` exists as a help article under `Using MasterClass`, distinct from the `Certificates` product. Two things called some form of "certificate" in the same product family (see T13 defects).

## T5 Form & field labels

Very little pre-auth form surface.

**Search** `[observed]`: label `Search`, placeholder `What do you want to learn today?` — an interrogative placeholder, which sets the discovery frame rather than describing the input.

**Newsletter capture** `[observed]`:
- CTA `Submit`
- Checkbox label: "I agree to receive marketing emails about MasterClass and other related learning products."
- Consent footer: "By clicking "Submit", and sharing your email, you agree to our Terms of Service and Privacy Policy."

Note the double consent construction: an explicit opt-in checkbox for marketing, plus a click-wrap for Terms/Privacy. The checkbox text names the scope ("and other related learning products") — vague, but at least present.

**Checkout progress indicator** `[observed]`: `Step 1 of 3` with three named stages, `Membership` · `Account` · `Payment`, each rendered twice in the markup (mobile/desktop variants) with a trailing space on `Account ` and `Payment `. The current stage is announced as `Membership current step` — an accessible-state string leaking into the visible text extraction, which suggests it is a visually-hidden label (good practice) rather than a defect.

**Plan-inclusion list** `[observed]` — headed `All annual memberships include:` and this is where the price-adjacent disclosure sits:

- `30-day satisfaction guarantee`
- `All of MasterClass—200+ classes, taught by the world's best`
- `Watch on desktop, TV, or mobile—anytime, anywhere`
- `New classes added every month`
- `Audio-only mode`

Five bullets, and the **guarantee is first** — ahead of the content itself. On a page where the user is about to commit to an annual charge, the risk reversal outranks the product. Worth noting that the word is `satisfaction guarantee` here but `money-back guarantee` in the hero and on the class page ("30-day money back guaranteed") — three phrasings of one promise (see T10).

No price, plan name, or tier label rendered pre-auth. `Plus` and `Premium` are named only inside help articles.

## T6 Status & state language

**Progress is deliberately weak, and that is consistent with the positioning** `[documented]`

There is no percentage, no mastery level, no streak, no XP, no score. The entire progress model is:

| Concept | Copy |
|---|---|
| Auto-save | "If you take a break, your progress is automatically saved." |
| Resume | "You can return at any time during your active subscription to pick up right where you left off." |
| The list | `Continue Watching` |
| Post-expiry | "Your progress remains attached to your account even if your subscription expires." |
| Post-renewal | "Once you renew or purchase a new subscription, your previous progress will become available again." |

`Continue Watching` is pure streaming vocabulary — Netflix's shelf name, not an LMS's. The state model is *watch position*, not *understanding*. A product that measured learning would need a completion state; MasterClass needs only a resume point.

**A genuinely honest limitation, stated as a workaround** `[documented]`:

> "🗒️ *Lessons cannot be manually removed from your Continue Watching list. If you'd like to move a lesson down, we recommend starting a new one—this will push the previous lesson further down in the list.*"

Admitting a missing control and then teaching the user to game the algorithm is unusual and good. It costs nothing and converts a dead end into an action.

**Progress survives non-payment.** "Your progress remains attached to your account even if your subscription expires" is a retention-flavoured disclosure doing real reassurance work at cancellation time — and it is placed in the progress article, not the cancellation article, so the user most likely to need it (someone about to cancel) will not find it. Minor IA miss.

**Subscription states, from the help copy** `[documented]`: active → `set to cancel at the end of your current billing period` → expired; plus `Reactivate` as a return path. Note the state is described as a *scheduled* cancellation ("will be set to cancel"), which correctly distinguishes intent-recorded from access-ended.

**Session timeframe state** `[documented]`: `a suggested completion timeframe of 30 days` — explicitly "not a hard deadline."

## T7 Error, failure & recovery

**Troubleshooting article titles are device-shaped, not problem-shaped** `[observed]`

`MasterClass App for Android TV` · `Streaming MasterClass on Apple TV` · `Streaming MasterClass on Roku TVs` · `Accessing MasterClass on Android` · `Payment Error`

Four of five are named after a *platform*, not a failure. Only `Payment Error` names a problem, and it is a bare noun phrase with no user voice. There is no `I can't play a lesson`, no `Why won't my class load?`. Compared with Wise's first-person confession titles, MasterClass's troubleshooting IA is organised around the engineering surface rather than the user's experience of failure. Recorded as a negative finding.

**The strongest recovery copy in the file is a fraud-prevention cluster** `[observed]`:

`Protecting Yourself from Fraudulent Websites` · `Recognizing Suspicious Emails Claiming To Be From MasterClass`

Two dedicated articles in `Account & Billing` about impersonation. `Claiming To Be From MasterClass` is precise phrasing — it names the deception mechanism rather than saying "phishing." A consumer-subscription product that ships user-facing anti-impersonation content is doing something most do not.

**Third-party cancellation failure has an explicit escalation path** `[documented]`:

> "🗒 *If your renewal date passes and your cancellation has not taken effect, please reach out to the app store's support team where your purchase was made. Per our Terms of Service (Section 3.3), MasterClass is not responsible for processing or resolving cancellations, renewals, or refunds for subscriptions purchased through third-party marketplaces.*"

Two moves in one note: name the failure mode (*cancellation didn't take*), route the user, and cite the clause number. **Citing the section number (`Section 3.3`, and elsewhere `Section 2.7`) in user-facing help copy** is an unusual discipline — it makes the disclaimer auditable rather than asserted. Two different sections cited in two different articles, correctly matched to their subject (3.3 = marketplaces, 2.7 = renewals).

**A pre-empted UI trap, with instructions to ignore the product's own control** `[documented]`:

> "1. Log into your account at www.masterclass.com using a mobile browser (not the app).
> 2. When prompted, **ignore the `Go to the App` button**.
> 3. Tap the menu icon in the top right corner…"

MasterClass documents that its own app-interstitial blocks cancellation on mobile web, and tells the user to ignore it. This is honest and helpful — and it is also documentation of a dark pattern the product has chosen not to remove. Both facts belong in the record. The related constraint is stated at the top of the same article: "*🗒 Cancellations cannot be made through the MasterClass app. Please log in at www.masterclass.com using a web browser to make changes.*" A user who bought on web must cancel on web; the app will not do it.

**Third-party cancellation-service policy** `[documented]` — an entire named section, `If You Use a Third-Party Service to Cancel`:

> "If you use a third-party service such as Xpendy, Trim, Rocket Money, or a similar subscription-management platform to request a cancellation… we'll still need to confirm with you directly before taking any action. This helps us ensure your request is legitimate and protects your account."
>
> "**MasterClass can only process cancellation or data-related requests when they are submitted or confirmed directly by the account holder from the email address associated with their MasterClass account.**" … "We cannot process requests submitted by third parties, including services that manage subscriptions or requests that include powers of attorney or similar authorization documents."

This is the most interesting single passage in the file. MasterClass **names three competitor-adjacent cancellation services by brand** (`Xpendy`, `Trim`, `Rocket Money`) in its own help centre, then requires direct confirmation. The security rationale is genuine ("protects your account"), and the friction is also genuinely anti-cancellation. The recovery advice is good — "Keep an eye out for our confirmation email and reply as soon as you can to avoid delays" — and the copy tells the user what to do if nothing arrives. Recorded as a defensible-but-loaded practice, and the naming of specific third-party brands is a content decision worth flagging either way.

**Lost-access recovery** `[documented]`: `When You No Longer Have Access to Your Original Email Address` — a named section with a list of the evidence to supply ("account holder's name, old email address, transaction number, date of purchase, etc."). Naming the required evidence up front prevents a support round-trip.

**OTP verification, with an expiry recovery path** `[documented]`: refund requests may require a one-time passcode; "If your code expires before you can complete verification, you can request a new one at any time through the same process." The expiry case is pre-answered.

## T8 Empty states

`[absent]` — no empty state observed or documented. `/browse` returned an empty body so its zero-results state was unreachable; the search field's no-results string is client-rendered; `Continue Watching` in its empty condition sits behind auth.

The nearest analogue is the negative-availability string documented three times in the captions article: "If the language you are looking for does not appear in the list, then it is not available for that lesson at this time." Repeated verbatim for Web, iOS, and Android — a per-platform triplication of the same sentence, which is consistent but bloats the article.

## T9 Notifications & system messages

`[documented]`, and one item is strong.

**A renewal reminder with a stated lead time** `[documented]`:

> "A renewal reminder is sent **30 days before your renewal date**. If you do not wish to renew, turn off auto-renewal before your renewal date."

Disclosing the reminder cadence *in the plan-explanation article* is good practice: it tells the user that a warning exists, so they need not diary it themselves. 30 days on an annual plan is generous and the number is stated rather than implied.

**Confirmation emails, promised twice** `[documented]`:
- "*🗒 You'll receive a confirmation email once your cancellation is processed.*"
- "Once you cancel auto-renewal, you'll receive a confirmation email and your membership will stay active until the end of your current billing period."
- Refunds: "You'll receive a confirmation email once your refund has been completed."

Three separate confirmation-email promises for three separate events (cancel, cancel-via-plans-article, refund complete). Consistent.

**Marketing consent copy** `[observed]`: see T5. The newsletter is the only opt-in surface.

**Support channel** `[documented]`: "Support is available through the **chatbot button in the bottom-right corner of the screen.**" MasterClass names the widget's *screen position* in help copy — pragmatic, and unusual.

No toast, banner, or push string retrievable verbatim.

## T10 Subscription, auto-renewal and cancellation disclosure — PRIORITY

MasterClass is the strongest of the five products in this batch on cancellation *procedure* and the weakest on *pricing transparency*.

### Auto-renewal is disclosed with a stated rationale `[documented]`

> "MasterClass annual membership is an auto-renewing subscription, **which ensures that you have continuous and uninterrupted access to MasterClass.**"

The justification clause is doing PR work — auto-renewal is framed as a benefit to the user rather than as a billing mechanism. That is a soft-spin, and worth flagging: the true reason is revenue continuity, and "ensures that you have continuous and uninterrupted access" is a real but secondary effect. Compare Babbel, which states the same fact without a benefit clause ("your subscription will renew automatically at the end of each period, ensuring uninterrupted access") — near-identical spin, independently arrived at.

**The renewal charge mechanism is stated plainly** `[documented]`: "MasterClass charges your account for renewals using the payment method you provided when you signed up." And the gift/trial edge case is pre-answered in the same paragraph: "If you received your annual membership as a gift or accepted a Guest Pass, your account was charged after the gift period or Guest Pass trial ended."

**Gift → auto-renew conversion has its own named section** `[documented]`:

> `Gift Memberships and Auto-Renewal` — "If your subscription began as a gift membership, your account may renew automatically once the gift period ends."

This is the highest-risk conversion in the product (a recipient who never chose to subscribe gets charged) and it gets a named heading in the cancellation article. Correct placement — it is in the article a surprised gift recipient would search for.

### Where the cancellation sits, exactly `[documented]`

Four numbered steps, with the control names verbatim:

> 1. Log into your account at www.masterclass.com.
> 2. Click your profile or account menu in the top right, then select **Settings**.
> 3. In **Account Settings**, find the **Membership** section and click **Cancel Membership**.
> 4. On the next screen, select **Cancel Now** to confirm and complete your cancellation.

`Settings` → `Account Settings` → `Membership` → `Cancel Membership` → `Cancel Now`. Four levels deep, but **the word "Cancel" appears at the last two levels**, so the user is never guessing which container holds it. Materially better than a neutral `Manage subscription` gateway.

Then the outcome, in two sentences: "your subscription will be set to cancel at the end of your current billing period. **Your subscription will remain active until the renewal date.**" — what happens to billing, then what happens to access. And the reversal path is given unprompted: "If you wish to re-enable auto-renewal later, you can do so by signing in and selecting **Reactivate** in your settings."

**Mobile-web path is separately documented** with the interstitial workaround (see T7). **App cancellation is impossible** and stated up front.

**Third-party marketplace cancellations are routed out** `[documented]`: iOS App Store and Google Play "must be completed directly through the respective app store," each with a dedicated article (`Managing iOS App Auto-Renewal`, `Managing Android App Auto-Renewal`), plus separate articles for `Amazon Subscription Management` and `Roku Subscription Management`. Four marketplaces, four articles. For a product distributed across App Store, Google Play, Amazon and Roku, that is the right granularity.

### Refund disclosure — the sharp edge

**Renewals are explicitly not refundable, in bold** `[documented]`:

> "**Renewals**
> Renewal charges are **not eligible** for refunds. Please review Section 2.7 of our Terms of Service for details.
> If you do not wish to renew, turn off auto-renewal before your renewal date."

Three moves: the exclusion, the clause citation, and the prevention instruction. The prevention instruction immediately after the exclusion is the right sequence — it converts a no into an action.

Then the scope carve-outs: "*🗒 This does not apply to MasterClass at Work accounts and may not apply to certain partnerships or group plans.*" — `may not apply` is doing hedging work on the partnership cases.

**Redeemed gifts are not refundable** `[documented]`: "Redeemed gifts are **not eligible** for refunds." Unredeemed gifts within 30 days are handled by support. The redemption event is the point of no return, and it is named.

**Refund processing time is stated** `[documented]`: "processing typically takes 5-10 business days, depending on your payment provider" — with the dependency named, which is the Wise "bound the claim" move.

### The 30-day guarantee, and its three names `[observed]` `[documented]`

The promise itself is clean:

> "If you're not satisfied with your MasterClass membership, we will honor a full refund within the first 30 days of your initial subscription purchase.
> **This guarantee is available only for first-time purchases made directly on the MasterClass website. It does not cover renewals, redeemed gifts, or MasterClass At Work accounts.**
> The 30-day period begins on the date of your original transaction."

Three sentences: the promise, the bounding (bolded, with three named exclusions), the clock start. The bolding of the *limitation* rather than the promise is notable — most products bold the benefit.

But the naming is not controlled. The same promise appears as:

| Surface | Wording |
|---|---|
| Homepage hero | `30-day money-back guarantee` |
| Class detail page | `30-day money back guaranteed` |
| Class page meta description | `30-Day Money Back` |
| Checkout inclusion list | `30-day satisfaction guarantee` |
| Help article title | `What is Your 30-Day Satisfaction Guarantee?` |
| Refund article, inline link | `30-Day Satisfaction Guarantee` |

Five variants: `money-back guarantee` / `money back guaranteed` / `Money Back` / `satisfaction guarantee` / `Satisfaction Guarantee`. Hyphenation, capitalisation, and the noun itself all drift. `money back guaranteed` on the class page is an adjectival construction that reads as marketing patter; `satisfaction guarantee` is the legally-scoped name used in the help centre. **The marketing surfaces promise money back; the help centre promises satisfaction.** Those are not the same promise, and the distinction matters precisely at the point of dispute.

### Plan tiers exist but are not observable pre-auth

`Plus` and `Premium` are named only inside help articles `[documented]`, and only by their device entitlements:

- "With our **Plus** and **Premium** plans, you can add up to 5 additional profiles to your account (6 in total)."
- "**Plus**: stream on up to 2 devices simultaneously"
- "**Premium**: stream on up to 6 devices at the same time"

No third tier is named, so there is presumably a base plan whose name was not observed. **No prices are recorded in this file** — the hero states "Starting at $10/mo (billed annually)" and the class page repeats "Starting at $10/month, billed annually" and "Starting at $10/month(billed annually) for all classes"; the checkout page rendered no figures. Note the parenthetical spacing defect in the third instance (`$10/month(billed annually)` — missing space).

The `(billed annually)` qualifier is correctly attached to every instance of the monthly-equivalent figure. That is the right discipline for a monthly-rate-on-an-annual-plan display, and Babbel does the same thing (see 129) — both explain that the monthly figure is a division, not a billing cadence.

**Age gating as a compliance disclosure** `[documented]`, in an italic note at the foot of the class-shape article:

> "*🗒 MasterClass products and features are designed for adult learners and comply with applicable age-based content and privacy regulations. Individuals under 13 are not authorized to use MasterClass. Individuals ages 13–17 may use MasterClass only with a parent or guardian's approval.*"

Two hard thresholds and a consent requirement, in an article about class structure. Placement is odd (a reader looking for age policy would search Terms), but the copy is unambiguous: `not authorized` for under-13, `only with a parent or guardian's approval` for 13-17. There is also a `Hiding or Unhiding Mature Content` article in `Account & Billing`, which implies a content-rating control.

### T10 defects

1. **Duplicate help-article IDs for the 30-day guarantee.** The MasterClass help hub links to `…what-is-your-30-day-satisfaction-guarantee--id--7RGbse64Rhyb35P39wYrBw`; the `Requesting a Refund` article links to `…what-is-your-30-day-satisfaction-guarantee--id--HikfVvElQ8O2B2fU0XrQXQ`. **Two different IDs, same slug.** Either two copies of the article exist or one link is stale. For a governing commercial promise, two canonical URLs is a real content-ops problem.
2. **Broken cross-link in `About MasterClass Classes`.** Its captions link points to `subtitles-amp-closed-caption-for-classes-on-master-class--id--yYHVYXdyTqKeUsQCZ0RnZQ` — note `-amp-`, an HTML-entity leak from the `&` in "Subtitles & Closed Caption". The live article is at `subtitles-closed-caption-…`. The link is almost certainly broken.
3. **Five phrasings of the 30-day guarantee** (above).
4. **`Personalized advice from the AI of the world's best`** — a possessive construction that avoids stating what the AI is derived from.
5. **"thousands of bite-sized lessons" vs "hundreds of video lessons"** — a direct numerical contradiction between hero and help centre.
6. **`Certificate of Completion` (a help article under `Using MasterClass`) vs `MasterClass Certificates` (a separate paid product)** — two "certificate" things in one family, and the help centre does not disambiguate them on the index.

## T11 Help-centre architecture

**Two-level, product-first:** Help Center → 5 products → 4-5 sections → articles. Within `MasterClass`, the sections are `Popular Articles` (4) · `Account & Billing` (17) · `Getting Started` (11) · `Using MasterClass` (7) · `Troubleshooting` (5).

**Article-title grammar — five shapes, and gerunds dominate**

| Shape | Examples |
|---|---|
| Gerund + object (the house style) | `Cancelling Your Subscription Renewal` · `Requesting a Refund` · `Managing iOS App Auto-Renewal` · `Managing Your Class Progress` · `Updating Payment Information for Your Subscription` · `Downloading Classes for Offline Viewing` · `Creating and Managing MasterClass Profiles` · `Clearing Data Stored by MasterClass in Your Browser` · `Submitting Data Privacy Requests` · `Recognizing Suspicious Emails Claiming to Be From MasterClass` · `Protecting Yourself from Fraudulent Websites` · `Hiding or Unhiding Mature Content` · `Logging Out of iOS App` · `Editing Profile` · `Streaming MasterClass on Roku TVs` · `Accessing MasterClass on Android` |
| `About <thing>` | `About MasterClass Classes` · `About MasterClass Membership Plans` |
| Bare noun phrase | `MasterClass Gifts` · `Payment Error` · `Contact Support` · `Certificate of Completion` · `Promotions and Partnerships` · `Roku Subscription Management` · `Amazon Subscription Management` · `MasterClass App for Android TV` |
| Interrogative | `What is Your 30-Day Satisfaction Guarantee?` — **the only question title in the product** |
| Imperative | `Suggest a New Class` — the only imperative |

Roughly 60% of titles are **gerund phrases**, and they are consistently rendered in Title Case. This is a house style, and it is applied with real discipline — far more consistent than Brilliant's `How do I` / `How can I` drift. The cost is that no title is in the user's voice: there is no `I was charged twice`, no `Why can't I cancel?`. The one question title belongs to the guarantee, i.e. to the thing a prospective buyer asks, not to the thing an aggrieved user asks.

**`Cancelling` vs `Canceling`** — the help centre uses the double-L British spelling in the article title `Cancelling Your Subscription Renewal` while the body of the same article uses the single-L American form ("your cancellation", "complete your cancellation") and the control is `Cancel Membership`. On an en-US product this is an inconsistency inside a single document.

**A dated promotional article sits in `Popular Articles`** `[observed]`: `Extended Labor Day 2026 Offer`. A time-bound promo in the evergreen "popular" slot is a content-ops smell — it will rot in place. But it also confirms the help centre is being used as a live promotional surface, the way Wise uses its FAQ.

**Partner-specific articles** `[observed]`: `Verizon Partnership with MasterClass` · `MasterClass with Optus SubHub FAQ` · `Promotions and Partnerships` · `MasterClass Guest Pass`. Named-carrier articles (Verizon, Optus) indicate telco-bundled distribution, each with its own billing and cancellation path — the same content-ops decision as Wise shipping an article for one bank's decline behaviour.

**Routing furniture** `[observed]`: each help article ends with a bare `Back`. There is no `Was this article helpful?` control, no related-articles block, no `Still need help?` panel — the only escalation is inline links to `/help-center/chat`. Compared with Quizlet (`Ask a question` + `Was this article helpful?` + related articles) and Brilliant (`Users also ask` + `Still need help?`), MasterClass's article foot is the thinnest in this batch.

## T12 FAQs

**No FAQ block on the homepage, and none on the class page** `[absent]`.

The plan-page FAQ is documented but was not reachable `[documented]`: "For details about what's included in each plan, visit the **FAQ section at the bottom of our Plans Page**." The `/checkout` page rendered only step 1 and no FAQ, so the block is client-rendered or below the funnel gate. This is the most significant retrieval gap in the file, since it is where plan-comparison language would live.

The nearest FAQ-shaped artefact is the intent-picker (T4), which is a question with eight answers rather than eight questions.

One help article is FAQ-shaped by title `[observed]`: `MasterClass with Optus SubHub FAQ` — not opened.

## T13 Mode and level terminology — PRIORITY

MasterClass has **no level vocabulary at all**. The terminology work is entirely in *format* names and *instructor* nouns. Both sets are informative, and one of them is undisciplined.

### Format and product names

| Term | MasterClass's usage | The alternative it rejected |
|---|---|---|
| `class` | The core content unit; ~20 lessons | "course" — never used for the core product |
| `lesson` | The atomic video unit, ~10 min | "module", "unit", "episode" |
| `Sessions` | The structured, project-based format with a defined curriculum | "course", "workshop", "bootcamp" |
| `Learning Toolkit` / `Learning Toolkit Add-On` | The paid supplementary-materials bundle | "workbook", "resources", "course materials" |
| `Class Guides` | Per-class downloadable material | "workbook", "PDF", "handout" |
| `Certificate of Completion` | Per-class completion artefact (help article) | — |
| `MasterClass Certificates` | A **separate product**, "Career-advancing credentials" | — (collides with the above) |
| `Continue Watching` | The resume shelf | "In progress", "My learning", "Continue learning" |
| `Watch Trailer` | Class preview | "Preview", "Sample lesson" |
| `Guest Pass` | Time-limited free access | "free trial" — notable, since a trial that converts is what it is |
| `member` / `membership` | The user and the relationship | "subscriber", "student", "learner" |
| `Member Wins` | Outcome stories | "success stories", "testimonials" |
| `Audio-only mode` | Passive-consumption mode | "podcast mode", "listen mode" |
| `Skills You'll Learn` | The class-page outcome list | "What you'll learn", "Curriculum", "Syllabus" |
| `View lesson plan` | Link to the lesson list | "Syllabus", "Curriculum", "Episodes" |

**`Guest Pass` over `free trial`** is the most deliberate substitution here. A pass is hospitality; a trial is evaluation. And the auto-renew disclosure then has to reattach the commercial reality: "If you received your annual membership as a gift or accepted a Guest Pass, your account was charged after the gift period or Guest Pass trial ended" — note it becomes `Guest Pass trial` in that sentence, so the rejected word returns exactly where the charge is disclosed. That is either careful (use the plain word where money is at stake) or an unintended tell. Either way it is the right outcome.

**`member` throughout, never `student`.** No inspected surface calls the user a student or a learner in the core product (the `Certificates` scope line says "Career-advancing credentials" and `Learner Guidelines` in the footer is the one exception). `Member` is club vocabulary, consistent with `Join the inner circle.` The product is framed as access to people, not enrolment in instruction.

**`class` and never `course`** — across every surface inspected. `course` appears nowhere. `Class` is short, informal, and school-adjacent without being institutional; `course` implies completion and credit, which is the claim MasterClass declines to make.

### The instructor noun is not controlled

Five nouns for the same people, across five surfaces `[observed]`:

| Noun | Surface |
|---|---|
| `instructors` | Help centre ("200+ instructors"), `Introduction to MasterClass` |
| `the world's best` | All five product scope lines; hero; checkout inclusion list |
| `icons` | Newsletter block ("insights from world-class icons") |
| `trusted experts` | `About MasterClass Classes` ("taught by trusted experts across a wide range of fields") |
| `the best in the world` | Homepage meta description ("Our instructors are the best in the world.") |

Plus a role list in the same article: "chefs, writers, artists, athletes, business leaders, and more." And on the class page the instructor is referred to by first name in prose (`Gordon's first MasterClass`) while the H1 is the full name.

`icons` and `trusted experts` are doing different jobs — `icons` sells fame, `trusted experts` sells credibility — and they are pointed at the same roster. `trusted experts` is the odd one out: it is the vocabulary of a credentialing product, and it appears in the one article that describes what a class actually is. Recorded as an inconsistency, but a revealing one: when MasterClass has to explain the pedagogy rather than the glamour, it reaches for `expert` rather than `icon`.

### The level vocabulary that does not exist

Worth stating explicitly as a negative finding for T13: across 12 pages there is **no** beginner/intermediate/advanced label, no prerequisite, no difficulty indicator, no CEFR-style framework, no skill level on any class page. The only ordinal in the catalogue is the Roman numeral in `Cooking I`, which denotes *instalment* not difficulty. The help copy states the replacement explicitly: "Lessons are designed for learners of all skill levels."

`for learners of all skill levels` is the load-bearing phrase. It is simultaneously an inclusion promise and a refusal to level-set — and it is the only viable position for a catalogue where the same 20 lessons must serve a novice and a professional, because the value proposition is *access to the instructor*, not *progression to a level*.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, consistently. First-person plural for the company, and used mostly for policy: "we will honor a full refund", "we'll still need to confirm with you directly", "**We cannot process** requests submitted by third parties", "we recommend starting a new one". Note that MasterClass's `we` is almost always *constraining* — where Brilliant's `we` concedes and Wise's `we` acts, MasterClass's `we` sets limits. Consistent with a product whose main help-centre job is billing governance.

**Register.** Flat, procedural, Title-Cased. Marketing copy is aspirational and short (`Learn from the best, Be your best.`, `Join the inner circle.`); help copy is clause-joined and legalistic, with clause citations. The gradient between the two is the steepest in this batch — there is almost no middle register.

**The 🗒 note glyph is the house device** `[observed]`. Italic notes prefixed with `🗒` or `🗓️` or `🗒️` carry every caveat, exception and workaround: cancellations can't be made in the app, you'll get a confirmation email, this doesn't apply to At Work accounts, subtitle placement can't be adjusted, age restrictions. There are at least nine such notes across six articles.

**But the glyph is not standardised**: `🗒` (plain), `🗒️` (with variation selector), and `🗓️` (calendar, used once for the 30-day refund window) all appear. Three glyph variants for one editorial device. An emoji as a structural content element is a questionable choice for screen readers in any case — a note prefixed with an unlabelled emoji announces as "spiral notepad" or is skipped, so the visual signal that "this is an exception" is lost to non-visual users.

**No exclamation marks** observed outside of nothing at all — the register is genuinely flat. No `Oops!`, no `Great news!`.

**Numbers** `[observed]`: `200+` classes/instructors, `30-day` guarantee, `30 days` reminder lead time, `5-10 business days` refund processing, `20 video lessons`, `about 10 minutes each`, `3hr 54mins`, `5 additional profiles (6 in total)`, `2 devices` / `6 devices`, `13` and `13–17` age thresholds, `Section 2.7` / `Section 3.3`. Mostly precise. `200+` and `thousands` are the rounded ones, both on marketing surfaces, and they are the two that conflict.

**Accessibility content**

- `Skip To Main Content` is first in the DOM on every page, targeting `#mc-main`. `[observed]` Good — and better than Brilliant, which has none. Note the title-cased `To`, which is unusual for a skip link.
- **Captions: the strongest accessibility claim, and it is unqualified** `[observed]`: "**All of our classes** can be viewed with closed captioning/subtitles in English, and some of our classes can be viewed in additional languages." A 100% coverage claim for English captions across a 200+ class video catalogue, stated without hedging. That is a substantive commitment and the right thing to put in a help centre.
- **But there is no accessibility statement.** `[absent]` Not in the footer (which carries DEI, Security, Privacy, Learner Guidelines, Social Impact, and four privacy links), not in the help centre, not as a product scope. For a video-first product this is a notable gap — the captions article is the entire accessibility surface.
- **A documented accessibility limitation** `[documented]`: "*🗒️ The subtitles placement cannot be adjusted.*" Honest, and a real WCAG-adjacent constraint (caption positioning matters when captions obscure on-screen content). Stated plainly rather than hidden.
- **Caption discovery is documented per platform** with the control named each time: `cc` on the web play bar, the `gear icon` on iOS and Android. Naming the specific affordance per platform is helpful; triplicating the identical "if the language does not appear… it is not available" sentence across all three is redundant.
- **`Audio-only mode`** as a listed plan benefit `[observed]` is an accessibility-adjacent feature sold as a convenience — useful for low-vision users and for anyone who cannot watch, though it is never framed that way.
- **`Hiding or Unhiding Mature Content`** `[observed]` implies a user-controlled content filter — cognitive/content accessibility, undocumented in detail.
- **Alt text is largely absent on the homepage.** `[observed]` The instructor carousel renders 48 image elements (four responsive breakpoints × twelve instructors) and **every single one has empty alt**, with an empty `<img>` preceding each. The carousel is the primary discovery surface of the homepage and it is entirely invisible to a screen reader — twelve famous names, none of them in text. The filenames (`Carousel_Kim_Kardashian.jpg`, `Carousel_Gordon_Ramsay.jpg`) carry the information that the alt attributes do not. **This is the most serious accessibility defect recorded in this batch.**
- **The same carousel is duplicated four times in the DOM** at four widths (384/640/1080 px variants), so any assistive technology that does surface the images would encounter each instructor up to four times.
- **Named image alt where it does exist** `[observed]`: only `MasterClass logo`, `MasterClass homepage`, `MasterClass Help Center` and the four store badges. Functional images are labelled; editorial images are not.
- **Duplicated H1 per help page** `[observed]`: `# MasterClass` (product) then `# <Article Title>`. Two H1s on every help article, with the product name always first — so a screen-reader user tabbing headings hears "MasterClass" before the article they navigated to, on every page.
- **The hero is duplicated in the DOM** `[observed]` — the class page renders the `# Gordon Ramsay / Teaches Cooking I / 20 Lessons · 3hr 54mins / Watch Trailer / Get` block twice (responsive variants), as does the homepage carousel. Screen-reader users may encounter the class title, runtime and CTA twice depending on CSS handling. Flagged as suspected, not confirmed.

**Negative findings, recorded honestly**

1. **`Get` as a bare, objectless CTA**, 3-4 instances per page.
2. **Instructor-carousel images all have empty alt** — the homepage's primary discovery surface is inaccessible.
3. **Two live URLs for the 30-Day Satisfaction Guarantee article** (different IDs, same slug).
4. **Broken captions cross-link** containing an `-amp-` HTML-entity leak.
5. **Five phrasings of the 30-day guarantee**, splitting across `money-back` and `satisfaction`.
6. **"thousands of lessons" vs "hundreds of video lessons"** — hero contradicts help centre.
7. **`200+` used for both classes and instructors** on different surfaces.
8. **Five nouns for instructors**: `instructors`, `the world's best`, `icons`, `trusted experts`, `the best in the world`.
9. **`Cancelling` (title) vs `cancellation`/`Cancel` (body and controls)** in one document.
10. **Duplicated H1 on every help page**; duplicated hero blocks on homepage and class page.
11. **Cancellation impossible in the app**, and the mobile-web path requires ignoring the product's own `Go to the App` interstitial.
12. **Third-party cancellation services named by brand and blocked**, requiring direct confirmation.
13. **Stale meta description on the class page** referencing a `Teaching Assistant` feature absent from the live page, plus keyword-stuffed fragments.
14. **`$10/month(billed annually)`** — missing space on the class page.
15. **No accessibility statement**; captions article is the only accessibility artefact.
16. **A dated promo (`Extended Labor Day 2026 Offer`) pinned in `Popular Articles`.**
17. **`/browse` returned an empty body** — the primary named discovery route was unharvestable.

---

## Transferable patterns

1. **Transfer the credential from the outcome to the teacher.** `Learn from the best, Be your best.` promises access, not competence — and the whole product family holds that line, spinning up a *separate named product* (`Certificates`, "Career-advancing credentials") the moment an outcome claim is needed. Condition: this only works if you genuinely never claim the outcome on the core product. The instant "Learn from the best" is joined by "get job-ready," the frame collapses and the regulator-adjacent risk appears. Directly relevant to any PayPal surface that wants to sell capability without implying a guaranteed financial result.

2. **Replace level-setting with intent-setting when you cannot measure the user.** `What brings you to MasterClass today?` + eight first-person goal statements, in place of a placement test. And grade the verbs to the claim: `Learn about` for topics where you promise only exposure, `Develop` where you promise gain. Transfers to any onboarding where segmentation matters but competence is unmeasurable — and the verb-grading trick transfers everywhere.

3. **Convert an unfalsifiable subscription into nameable souvenirs.** `Skills You'll Learn` → `Knife skills` · `Breaking down a whole chicken` · `Elevated scrambled eggs` · `Pasta dough`. Four concrete, recountable artefacts under a heading that promises skills. Applies to any product whose real benefit is diffuse: name three or four specific things the user will be able to point at.

4. **Name each scaffolding intensity, and raise the outcome claim with it.** `class` (curated, non-binding) → `Sessions` (defined curriculum, soft deadline) → `Certificates` (separate product, credential claim). Each gets its own noun. Prevents the common failure where one product name has to carry three levels of promise.

5. **Release the user from your own structure, explicitly.** "you're always encouraged to learn in the way that feels best for you" immediately after describing a curated sequence. Reduces abandonment guilt in any linear flow that does not actually require linearity — onboarding checklists, setup wizards, guided tours.

6. **Cite the clause number in user-facing help copy.** `Section 2.7` for renewals, `Section 3.3` for marketplaces. Makes a disclaimer auditable instead of asserted, and costs three words. Immediately reusable in fee, dispute, and liability help content.

7. **Put the word "Cancel" on the control, not behind a neutral container.** `Cancel Membership` → `Cancel Now`. Compare the weaker `Manage subscription` gateway used elsewhere in this batch. Condition: a two-step confirm is fine; a two-step *discovery* (where step one is unlabelled) is not.

8. **Name the surprise conversion in the article the surprised person will search.** `Gift Memberships and Auto-Renewal` as a heading inside the cancellation article. Any gift, promo, or trial that converts to a charge should have its own named heading in the cancellation content, not a line in the plan page.

9. **Disclose the reminder, not just the renewal.** "A renewal reminder is sent 30 days before your renewal date." Telling the user a warning exists is worth more than the warning itself, because it stops them having to diary it.

10. **Document the missing control and teach the workaround.** "Lessons cannot be manually removed from your Continue Watching list. If you'd like to move a lesson down, we recommend starting a new one." Costs one sentence, converts a dead end into an action, and buys credibility cheaply.

## Caveats & gaps

- **`/browse` returned an empty body.** The single named discovery route in the global nav was unharvestable, so category taxonomy, filter labels, sort options, and any browse empty state are all missing. This is the largest gap against the "Discovery and course framing" benchmark strength — what was captured is the *homepage* discovery surface (intent-picker, carousel) and the *class-page* framing, not the browse experience.
- **`/checkout` rendered only step 1 of 3 pre-auth.** No plan names, no prices, no tier comparison, and critically **no plan FAQ** — which the help centre explicitly says is "at the bottom of our Plans Page." Plan names (`Plus`, `Premium`) come from a help article, and a base tier was never named. No price is recorded from a pricing surface; the only figures observed are the hero/class-page "Starting at $10/mo (billed annually)".
- **The homepage instructor carousel is images-only.** Twelve instructor names were inferred from image filenames (`Carousel_Kim_Kardashian.jpg` etc.) and are therefore **not quoted as copy** anywhere in this file. Any instructor-naming pattern beyond the Gordon Ramsay class page is unobserved.
- **One class detail page inspected.** The `<Person> Teaches <Subject>` grammar and the `Skills You'll Learn` pattern are generalised from a single example plus the URL slug convention. A second and third class page would confirm whether the four-item skills list and the Roman-numeral instalment convention hold.
- **The `Sessions` product was not opened** (`/sessions`), nor were `Certificates`, `Executive`, `On Call`, or `At Work`. The five scope lines are the only evidence for four of the five products.
- **All in-product strings are `[documented]`**: `Cancel Membership`, `Cancel Now`, `Reactivate`, `Manage Membership`, `Continue Watching`, `Settings`/`Account Settings`/`Membership`, the `cc` and gear caption controls. Marked as such throughout.
- **T8 (empty states) is genuinely unreachable** — `/browse` was empty and search is client-rendered.
- **T12 (FAQs) is effectively absent**: no homepage FAQ, no class-page FAQ, and the documented plan-page FAQ did not render.
- **Terms of Service not opened.** Sections 2.7 and 3.3 are cited by the help centre and taken on trust here; the refund and marketplace clauses themselves are unverified.
- **Suspected duplicate-DOM issue** on the homepage carousel, class-page hero, and captions article (per-platform triplication) is flagged from extracted text patterns, not confirmed against rendered output.
- **No blocked domains.** masterclass.com served every requested page except `/browse`, which returned HTTP-level success with an empty body — recorded as an empty response rather than a block.

## Sources

1. https://www.masterclass.com/
2. https://www.masterclass.com/learn-more-about-masterclass
3. https://www.masterclass.com/browse *(empty body)*
4. https://www.masterclass.com/plans → https://www.masterclass.com/checkout
5. https://www.masterclass.com/classes/gordon-ramsay-teaches-cooking
6. https://www.masterclass.com/help-center
7. https://www.masterclass.com/help-center/masterclass
8. https://www.masterclass.com/help-center/masterclass/answers/cancelling-your-subscription-renewal--id--M2McWBvNTh-WNRR6llmkAw
9. https://www.masterclass.com/help-center/masterclass/answers/about-master-class-membership-plans--id---KTOuuyVSJOaE7YwVZu2Og
10. https://www.masterclass.com/help-center/masterclass/answers/requesting-a-refund--id--ffUda_F-TPqkca5o9hJc5g
11. https://www.masterclass.com/help-center/masterclass/answers/what-is-your-30-day-satisfaction-guarantee--id--7RGbse64Rhyb35P39wYrBw
12. https://www.masterclass.com/help-center/masterclass/answers/about-master-class-classes--id--GfYxwjzXQuSxglxsayS8Hg
13. https://www.masterclass.com/help-center/masterclass/answers/introduction-to-master-class--id--gFEO15QFQg2i7Gm2qVgEHg
14. https://www.masterclass.com/help-center/masterclass/answers/managing-your-class-progress--id---_w7CkGpS22PrV3Fi6khLQ
15. https://www.masterclass.com/help-center/masterclass/answers/subtitles-closed-caption-for-classes-on-master-class--id--yYHVYXdyTqKeUsQCZ0RnZQ
