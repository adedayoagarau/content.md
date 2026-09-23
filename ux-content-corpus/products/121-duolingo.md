# 121. Duolingo

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Gamified language learning (freemium mobile-first, plus math, music, chess) |
| Primary URL | https://www.duolingo.com/ |
| Corpus rank | 121 |
| Benchmark strength (source list) | Motivation, feedback, recovery |
| Locale / market observed | en-US (blog also serves de, es, fr, pt, ja, ko) |
| Platform observed | Web — published blog / design-and-product writing, status page. **Product surfaces and help centre both unreachable to non-JS fetch.** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a (not a regulated vertical). GDPR/CCPA posture visible only as footer links — `Privacy`, `Respecting your "do not sell my personal information" rights` |
| Harvest date | 2026-09-21 |
| Pages inspected | 16 (13 returned content, 3 returned empty bodies) |
| Harvest completeness | **Partial — blocked on two fronts.** `www.duolingo.com` (including `/help`, `/super`, `/terms`, `/guidelines`) renders an empty body to non-JS fetches; `support.duolingo.com/hc/en-us` 301-redirects into that same JS shell, so the help-centre index and article tree were **not retrievable**. Compensating source: `blog.duolingo.com` (Ghost, server-rendered), which carries unusually substantial published design, localization and motivation-mechanics rationale, including screenshot alt text that transcribes in-product strings verbatim. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help centre (attempted) | https://support.duolingo.com/hc/en-us | 301 → `www.duolingo.com/help`; **empty body**. No category tree, no article titles retrievable. |
| Help article (attempted) | https://www.duolingo.com/help/what-is-a-streak | **Empty body.** Article exists (surfaced in search) but content is client-rendered. |
| Super Duolingo (attempted) | https://www.duolingo.com/super | **Empty body.** Pricing, free-trial and cancellation wording not retrievable. |
| Blog home | https://blog.duolingo.com/ | Global nav, subject taxonomy, footer IA, `Dear Duolingo` column framing |
| Design hub | https://blog.duolingo.com/hub/design/ | `design.duolingo.com` resolves here — the footer calls it `Brand guidelines`, but it is a blog tag page, not a design system |
| Duolingo 101 (feature tour) | https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/ | **Richest single source.** Onboarding screens, exercise prompts, settings menus, full mechanic inventory — much of it transcribed in alt text |
| Streak habit research | https://blog.duolingo.com/how-duolingo-streak-builds-habit/ | Streak Freeze copy screenshot; explicit naming of loss aversion |
| Improving the streak | https://blog.duolingo.com/improving-the-streak/ | Daily-goal-vs-streak decoupling; `intense` goal tier |
| Streak milestone animation | https://blog.duolingo.com/streak-milestone-design-animation/ | Milestone thresholds, share-card copy, cross-cultural metaphor problem |
| 23 streak tips | https://blog.duolingo.com/tips-for-maintaining-streak/ | Streak Challenge, Match Madness, Side Quest, gilded/Legendary node, Early Bird |
| Leaderboards explainer | https://blog.duolingo.com/duolingo-leagues-leaderboards/ | League names, tournament states, opt-out, FAQ-as-headings structure |
| Notification AI | https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/ | Notification selection model; guilt acknowledged in Duolingo's own words |
| Widget | https://blog.duolingo.com/widget-feature/ | Escalating-distress visual register; lock-screen string |
| Core tabs redesign | https://blog.duolingo.com/core-tabs-redesign/ | Current tab and header labels; monthly Quest naming |
| Copy testing / localization | https://blog.duolingo.com/copy-testing-experiments/ | The single best T9/T14 source: copy-vs-content distinction, tone-by-locale testing, two before/after copy pairs |
| Status page | https://status.duolingo.com/ | Statuspage-hosted state vocabulary and empty state |

---

## T1 Navigation & IA labels

**In-product bottom tabs** `[documented]` — from the tab-refresh post and its screenshot alt text, the app's core tabs are named for the *activity or object*, and two of the six are gamification surfaces rather than learning surfaces:

`Learn` (the path) · `Quest` · `Leaderboard` · `Video Call` · `Profile` · `Feed`

Notable: the Quest tab header is **month-stamped**, not generic — screenshots show `February Quest` and `June Quest` as the literal header string, so the tab title changes twelve times a year. The Leaderboard tab header is **league-stamped** the same way: `Sapphire League`. The Profile tab header is the learner's own name. Three of the tab headers are therefore dynamic strings, which is why the post's stated problem was that "Headers varied in size, typography lacked hierarchy".
(https://blog.duolingo.com/core-tabs-redesign/)

**Blog / content IA — two-axis taxonomy** `[observed]`

The blog nav splits subject-matter from company-matter, which is a clean pattern for a product that teaches multiple domains:

| Group | Items |
|---|---|
| `SUBJECTS` | `Language` · `Chess` · `Math` · `Music` |
| `INSIDE DUOLINGO` | `Announcements` · `Design` · `Engineering` · `Product` · `Life at Duolingo` |
| `SITE LANGUAGE` | 7 locales |

(https://blog.duolingo.com/)

**Footer groupings** `[observed]`: `About us` · `Products` · `Apps` · `Help and support` · `Privacy and terms` · `Social` · `Site language`.

Inside `About us`: `Courses` · `Mission` · `Approach` · `Efficacy` · `Team` · `Research` · `Careers` · `Brand guidelines` · `Press` · `Investors` · `Contact us`. `Efficacy` and `Research` as first-class footer links is an education-sector tell — the footer is doing evidentiary work, not just legal work.

Inside `Help and support`: `Duolingo FAQs` · `Duolingo English Test FAQs` · `Status`. **Note the label is `Duolingo FAQs`, not "Help centre" or "Support"** — the primary support entry point is framed as a question list.

**Defect / inconsistency** `[observed]`: the footer link `Brand guidelines` points at `design.duolingo.com`, which redirects to `blog.duolingo.com/hub/design/` — a blog tag archive of design essays. There is no public brand or content style guide behind that label. The label over-promises its destination.

## T2 Value proposition & headline patterns

`[observed]` — meta and page copy, since the marketing hero itself is unreachable.

**Canonical positioning line** (site-wide `og:description`):
> "Learn languages by playing a game. It's 100% free, fun, and scientifically proven to work."

Three claims in one sentence, ordered **mechanism → affect → evidence**. The `meta-description` variant reorders to "It's 100% free, fun and science-based." The page `og:title` across the whole site is a single benefit noun-phrase: `Learn a language for free`.
(https://www.duolingo.com/help — meta only)

**The "free" claim is load-bearing and repeatedly re-stated in the same words** — `100% free`, `all for free`, `Free, fun, and effective language learning!`, and a whole explainer article titled `Is Duolingo free?`. Duolingo treats the free/paid boundary as its main comprehension risk and answers it before anyone asks.
(https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/)

**Claim-then-evidence construction** `[observed]` — every motivation claim is followed immediately by a figure:

- "learners who reach a streak of just 7 days are 3.6 times more likely to complete their course"
- "learners who reach a streak of 7 are 2.4 times more likely to continue using Duolingo the next day"
- "half of the learners with the widget installed have a streak of at least 6 months"
- "learners who complete five sections score as well as students who took five semesters of university language classes"

Two of those numbers **disagree with each other** (3.6× vs 2.4× for the same 7-day-streak threshold, admittedly against different outcome measures and published two years apart). Worth recording as a real hazard: when a product publishes the same stat family across years of posts, the older figure keeps circulating.
(https://blog.duolingo.com/how-duolingo-streak-builds-habit/, https://blog.duolingo.com/improving-the-streak/, https://blog.duolingo.com/widget-feature/)

**Section-header grammar on explainer posts is the learner's own question** `[observed]`:
`Why did Duolingo create Leaderboards?` · `Who am I matched with every week, and why?` · `How does the Diamond Tournament work?` · `The competition is too intense. Can I opt out?`

The fourth one is the standout — a support question phrased as a **complaint plus a request**, used as an H3. See T12.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `DOWNLOAD DUOLINGO FOR FREE` | Repeated mid-post and at post foot | All-caps; price in the button |
| `READ MORE` | Editor's-pick card | |
| `VIEW MORE` / `PAST EDITIONS` / `ALL POSTS` | Blog listing | Three labels for near-identical "more of this list" actions |
| `START SHOPPING` | Merch carousel | |
| `SHARE ARTICLE` | Post foot | Label above the icon row, not on it |
| `Subscribe to Updates` | Status page | |
| `Resend OTP` | Status page subscribe flow | |
| `Refill streak freezes` | In-app streak-protection modal | `[documented]` — appears with a `400 gems` price |
| `Check` | Lesson exercise submit | `[documented]` — explicitly flagged by Duolingo as "testable copy" |
| `Start from scratch` | Onboarding placement choice | `[documented]` |
| `Find my level` | Onboarding placement choice | `[documented]` |
| `Celebrate` | Feed post reaction | `[documented]` — named in the tab-refresh alt text as "a prominent 'Celebrate' button" |

**Observation.** The purchase CTA in the streak-protection modal is `Refill streak freezes` — a **restock verb, not a buy verb**. It frames a gem spend as replenishing a consumable you already understand, which is materially softer than "Buy" or "Get". Compare the surrounding headline, which is pure loss framing (see T9).
(https://blog.duolingo.com/how-duolingo-streak-builds-habit/)

## T4 Onboarding & getting-started — **PRIORITY**

`[documented]` throughout — transcribed from screenshot alt text in the feature-tour post, which quotes the on-screen strings.

**The sequence, and what each step asks for:**

| # | Screen | On-screen string (verbatim) |
|---|---|---|
| 1 | Course selection | Duo asks `What would you like to learn?` — 7 languages visible, more on scroll |
| 2 | Motivation / goals | "questions about your motivations and goals" (strings not transcribed) |
| 3 | Notification permission | Duo says `I'll remind you to practice so it becomes a habit!` immediately before the OS permission dialog |
| 4 | Placement | Duo asks `Where would you like to start?` with two options |
| 4a | — option | `Start from scratch` — sub-label `Take the easiest lesson of the Spanish course` |
| 4b | — option | `Find my level` — sub-label `Let Duo recommend where you should start learning` |
| 5 | Profile creation | Prompted, not forced: "Don't forget to create a profile to save your progress!" |

Four content decisions worth stealing here.

**One. The mascot pre-frames the OS permission dialog with the benefit, in first person.** `I'll remind you to practice so it becomes a habit!` is placed on the screen *before* the system prompt. It does three things at once: it names the mechanism (reminders), states the payoff (habit), and puts a character rather than a company behind the request. Duolingo has published evidence that this framing is the variable: a German A/B test moved opt-in **+8%** by changing "Duolingo needs to send you notifications" (system-need framing) to a line stating that "notifications are proven to foster learning success!" (learner-benefit framing). Same screen, opposite subject of the sentence.
(https://blog.duolingo.com/copy-testing-experiments/)

**Two. Placement options are labelled by the learner's intent, then sub-labelled by the system's action.** `Start from scratch` / `Find my level` are what the learner wants; `Take the easiest lesson of the Spanish course` / `Let Duo recommend where you should start learning` are what will happen. Intent above, mechanism below — and the mechanism line names the actor (`Duo`) rather than an abstraction.

**Three. Profile creation is deferred and justified by a loss.** "create a profile to save your progress" — signup is sold as persistence insurance after the learner already has progress to lose, not as a gate.

**Four. Irreversibility is disclosed, quietly but plainly.** The tour states that after a placement test "you won't be able to 'undo' your placement and start from scratch." A one-way door is named at the moment the choice is described. Most products bury this.

**Instructional scaffolding inside lessons** `[documented]` — the exercise prompt is a short imperative with a full stop, and the prompt *names the modality*:

`Translate the word.` · `Translate this sentence` · `Tap what you hear.` · `Speak the correct response.` · `Select the related image` · `What sound does this make?` · `Build the character in …` · `Draw the missing stroke.`

Note the inconsistency: `Translate the word.` is punctuated, `Translate this sentence` (quoted from a different post) is not. Also note `Tap what you hear.` — a touch verb, used on a prompt that the same course serves on web.

**Difficulty ramp is stated as content policy, not just implemented**: "Units begin with easier exercise types, and they get a bit more challenging as you progress—for example, in earlier exercises, you might learn to recognize a new word, and eventually you'll be typing it out yourself." Recognition → production, described in the learner's own terms.
(https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/)

## T5 Form & field labels

`[documented]` — settings menus, transcribed from screenshot alt text.

**`Preferences` menu items:**
`Sound effects` · `Haptic feedback` · `Motivational messages` · `Listening exercises` · `Friends Quests` · `Friends Streaks` · (course-specific) `Romanized` / `Japanese` pronunciation

**`Reminders` menu items:**
`Practice reminders` · `Smart scheduling` · `Reminder time` · `Streak Freeze used` · `Streak Saver` · `Early Bird Reward` · `Night Owl Reward` · `Weekly progress`

This second list is the most quotable artefact in the file. **The notification settings screen is a complete, honest inventory of every motivational message type the product will send you** — including the two loss-adjacent ones (`Streak Freeze used`, `Streak Saver`) and the two time-of-day incentive ones (`Early Bird Reward`, `Night Owl Reward`). Each is individually toggleable. A product that monetises engagement pressure has nonetheless itemised that pressure as user-controllable settings, and named each item after the *event* that triggers it rather than a vague category like "Marketing" or "Engagement".

Also note `Motivational messages` sits in `Preferences`, separately from `Practice reminders` in `Reminders` — the in-app encouragement and the push nudge are modelled as two different opt-outs.

**Privacy setting with a non-obvious side effect** `[observed]`: to leave competitive play you "toggle off `Make My Profile Public`". The label describes visibility; the documented consequence is disabling Leaderboards. **Defect:** the setting's name does not predict its most-searched-for effect, which is exactly why a blog post had to explain it.
(https://blog.duolingo.com/duolingo-leagues-leaderboards/)

**Profile fields** `[documented]`: name, date joined, languages studied, avatar, followers.

## T6 Status & state language

**Progress and mastery states on the path** `[documented]`

- A completed node "turns gold" and is referred to as a **`gilded node`**
- Beyond gold there is **`Legendary`** status, framed as an optional further push: "you can choose to go for Legendary status on that node or you can complete a quick review"
- Characters on the path "go from gray to full color as you progress through a Unit" — colour saturation as a progress state with no accompanying text label

`gilded` is an odd register choice — archaic, and not obviously decodable by a learner at A1 in their second language. Recorded as a terminology risk.
(https://blog.duolingo.com/tips-for-maintaining-streak/)

**Streak states** `[documented]`: on a streak / not yet extended today / at risk / frozen / lost. The widget post states the only two data points the widget carries are "their current streak, and whether or not it's at risk" — **`at risk` is the named intermediate state**, and it is communicated not by a string but by Duo's facial expression (see T9).

**Tournament states** `[observed]` — two mutually exclusive banner strings at the top of the leaderboard tell you which regime is running this week:
- `Top 10 qualify for the Tournament`
- `The next Tournament is starting soon`

Duolingo's own post renders these two strings **three different ways across two paragraphs and two alt texts** — "Top 10 qualify for the Tournament", "The next Tournament is starting soon", "The next tournament begins soon", "The top 10 qualify for the tournament" (varying capitalisation of *Tournament*, and *starting* vs *begins*). A clear defect in either the product or the documentation of it; either way, a content designer reading this page cannot tell which is the shipped string.
(https://blog.duolingo.com/duolingo-leagues-leaderboards/)

**Tournament phase names** `[observed]`: `Quarterfinals` · `Semifinals` · `Finals` — borrowed wholesale from sport, no translation into learning terms.

**System status vocabulary** `[observed]`, Statuspage-standard:
`All Systems Operational` · `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, with components `Duolingo`, `Duolingo English Test`, `Duolingo for Schools`.
(https://status.duolingo.com/)

## T7 Error, failure & recovery — **strong, and structurally unusual**

`[documented]`

**Mistakes are priced, not scolded.** The failure currency is **hearts**, and Duolingo's own description of the mechanic leads with a *pedagogical* justification before the penalty:

> "Hearts keep you from moving too quickly through the course and help you focus on the material in your lessons. You'll lose a heart if you get an exercise wrong, and after five mistakes, you'll need to complete a practice lesson to earn one back."

The framing order matters: **purpose → cost → recovery route**. The sentence that describes the penalty also describes the way out, in the same breath. The recovery route is itself a learning action (`complete a practice lesson`), so the remedy for failure is more practice rather than a wait timer — with a paid bypass (gems) and a subscription bypass (`unlimited hearts`) offered as alternatives.
(https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/)

**Mistakes are stored and re-served rather than discarded.** "The exercises in your practice lessons focus on content that it's time to review and specific mistakes you've made." `Practice Hub` is named as the place where subscribers "review mistakes". `Practice Mistakes` appears as a literal subscription-benefit line item. Error is modelled as a durable content object with its own surface and its own product name — arguably the single most transferable idea in this file.

**Abandonment is treated as a recoverable failure with its own copy.** Quitting mid-lesson fires a confirmation dialog, and Duolingo published the before/after:

- Original (Spanish, translated in the post): `Do you want to end this session?`
- Tested replacement: **`Don't give up! Do you really want to end this session?`**

Duolingo's stated reasoning is that the learner may be quitting *because they feel discouraged*, so the dialog should address the emotion and not only the action. Measured result: fewer quits, more time learning. Two content moves in one string — a second-person encouragement prepended, and `do you` escalated to `do you really`.

This is worth pulling apart honestly, because it cuts both ways. `Do you really want to…` is a textbook confirmshaming construction: it makes the exit feel like a lapse. It is also the copy that demonstrably kept people learning. The pattern transfers, but only where abandoning genuinely harms the user's own stated goal — not where it harms the business's.
(https://blog.duolingo.com/copy-testing-experiments/)

## T8 Empty states

`[observed]` — one only, on the status page:

> `No incidents reported today.` / `No incidents reported.` / `No downtime recorded on this day.` / `No data exists for this day.`

Four distinct no-data strings on one page, correctly distinguishing *nothing happened* (`No incidents reported`) from *we have no observation* (`No data exists for this day`). That distinction is frequently collapsed elsewhere and is right here — though it is Statuspage's default copy rather than Duolingo's authorship.

In-product empty states (no friends, no feed activity, zero hearts, first-run path) are behind auth and were not reachable. `[absent]`

## T9 Notifications & re-engagement copy — **PRIORITY**

This is Duolingo's reference contribution to the corpus, and the notable finding is that **Duolingo documents its own guilt mechanics in writing, by name.**

### What is verifiably documented

**Duolingo names the emotion it produces, in its own voice** `[observed]`:

> "most of us have probably swiped away one of these notifications… and probably felt a bit guilty in the process."

That is Duolingo's engineers, in the company blog, describing the affective payload of their own push copy. The same post calls the notifications "notorious" and their persistence "so well known that it's even become a popular internet meme".
(https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/)

**Duolingo names the tone** `[observed]`: "Duo's playfully passive-aggressive tone" — and treats it as a **localization risk**, asking "does it evoke the same feeling in Hindi? How about French?" The register is an explicit, tested variable rather than an accident.
(https://blog.duolingo.com/copy-testing-experiments/)

**Duolingo names the bias** `[observed]`:

> "This is when we tap into 'loss aversion,' an internal bias in your brain that makes you particularly averse to losing something, like a learning streak."

With the mechanism spelled out: novelty motivates short streaks, loss aversion motivates long ones — "the longer your streak grows (and the prouder you become of it), the more likely you'll practice each day to protect that progress!"
(https://blog.duolingo.com/how-duolingo-streak-builds-habit/)

### The one in-product re-engagement string captured verbatim

`[documented]` — from a screenshot of the streak-protection modal:

> Headline: `Protect your 3 day streak!`
> Body: `Restock your Streak Freezes to keep your streak safe. You have 0 of 2 equipped.`
> Button: `Refill streak freezes` — `400 gems`

Anatomy: **imperative + possessive + the actual number** (`your 3 day streak`), then a **deficit statement rendered as a fraction** (`0 of 2 equipped`), then a restock verb and a price. The loss framing is in the verb `Protect` and in the fraction — `0 of 2` invents a full state the learner did not know they were below. Note also that this modal fires at a **3-day** streak, i.e. while the thing being protected is nearly worthless in absolute terms. The copy's urgency is not proportional to the stake.

### Non-textual guilt: the escalating-distress register

`[documented]` — the widget is the clearest case, and it is deliberate:

> "We decided to come up with a series of illustrations that would show Duo's mood at different parts of the day, depending on whether or not you'd done your lesson. **You'll see he gets more and more desperate as it nears midnight!**"

Alt text confirms the two-state design: "When the streak counter has not been filled yet, Duo looks increasingly panicked. When the streak counter has been filled … Duo looks relaxed and happy." The follow-on set is described by Duolingo as "exciting, **unhinged** Duos", including "Duo looking sweaty and scared, Duo looking angry and threatening, and Duo as a skeleton".

This is the mechanism a content designer should actually study: **the pressure is carried by illustration state, not by words.** The strings stay neutral (`200 day streak` is the entire lock-screen widget copy) while the character escalates from calm to threatening. It is unlocalisable-proof, unscreenshot-quotable, and it sidesteps every review process that scrutinises copy. It also does not reach a screen-reader user, which is a genuine equity problem, not just a QA note.
(https://blog.duolingo.com/widget-feature/)

### Where Duolingo de-escalates — and it does, repeatedly

Four documented de-escalations, each with evidence:

1. **It builds and defends an official cheat.** The `Streak Freeze` exists specifically to blunt loss aversion: "The Streak Freeze, which allows you to hit pause on your streak for a day, is designed to grant this type of flexibility when you need a day off." Duolingo pre-empts the objection — "At first, this may seem like a dishonest way to maintain a streak, but having this type of leeway actually helps people stay persistent" — and cites an external study that offering "slack" outperforms rigid rules. It then **doubled the allowance** to two equippable Freezes.

2. **It bounds the loss explicitly.** "losing your streak doesn't mean you lose the knowledge you've gained along the way." One sentence, placed inside the post that explains the loss-aversion design, that separates the *token* from the *learning*. This is the single most reusable de-escalation line in the file.

3. **It lowered the bar to qualify.** Streak extension used to require hitting your `daily goal`; learners on the `intense` tier were *least* likely to have a streak. Duolingo decoupled them so one lesson extends the streak. Stated conclusion: "lowering the barriers to building a consistent daily habit is more important … than how much you learn each day". It also reports the cost honestly — "fewer learners were actually reaching their daily goals without the motivation of the streak."

4. **It names the backfire risk out loud.** "If you lose a day and break your streak, it can have the opposite effect, and actually feel quite *de*motivating. And the fear of losing a streak could prevent learners from even attempting one in the first place."

**Honest summary for T14 purposes:** the copy register is loss-framed at the point of risk (`Protect your…`, `0 of 2 equipped`, `Don't give up!`) and the *illustration* register escalates to panic and menace as a deadline nears. The de-escalation is real but sits almost entirely in **mechanics and in published rationale** rather than in the strings a learner reads at the moment of failure. The one string that de-escalates in-product is the settings inventory (T5), which lets you switch the whole apparatus off item by item.

### Notification selection model

`[observed]` — not copy, but governs which copy you get. A bandit algorithm picks from "a variety of pre-written notifications" per learner per day, personalised on "the language you're studying and your current streak", trained on ~200 million reminders over 34 days. Two findings a content designer should note:

- **Template performance is language-specific.** "the 'Time for [language]' notification works very well for Chinese learners, but it's usually not the best option for English learners." (`Time for [language]` is the one push template named verbatim anywhere in the public record.)
- **Novelty decays, so repetition is actively penalised.** The system demotes recently-seen reminders, spaced using "the same forgetting curve that we use to measure word learning." Copy freshness is modelled with the same maths as vocabulary retention — a striking piece of internal consistency.

Some templates are audience-gated: "some notifications only make sense if the user has a streak wager, or can only be sent on Mondays."
(https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/)

**Celebration side of the notification system** `[documented]`: milestone days are marked at `one week`, `one month`, `100 day`, `one year` and beyond, with a share card reading `I just reached a streak!`. The milestone screen replaced number balloons with a phoenix transformation — chosen because "the analogy of 'keeping the flame alive' or being 'on fire' … is not shared by all cultures across the globe" and a bird in profile reads more universally. **A motivation metaphor rejected on cross-cultural comprehension grounds** — rare and worth citing.
(https://blog.duolingo.com/streak-milestone-design-animation/)

## T10 Disclosures, legal & compliance

`[absent]` for substance — `duolingo.com/terms`, `/privacy` and `/guidelines` were unreachable. Footer labels only `[observed]`:

`Community guidelines` · `Terms` · `Privacy` · `Respecting your "do not sell my personal information" rights`

That last label is notable: rather than the conventional "Do Not Sell My Personal Information" (which reads as an *instruction the user gives*), Duolingo phrases it as a **commitment the company makes** — `Respecting your … rights`. Same CCPA link, opposite grammatical subject.

**Quasi-disclosure in product copy** `[documented]`: the free/paid boundary is stated as a benefit list rather than a paywall notice. `Super Duolingo` = "skip the ads at the end of lessons, get unlimited hearts, and have access to extra streak freezes", plus `Practice Hub`; `Duolingo Max` = "all the perks of Super Duolingo, plus GPT-4-powered features". Both are justified by mission — "One of the ways we keep Duolingo free for everyone is by offering two subscription options".

A localization post reproduces a subscription benefit checklist verbatim: `Unlimited Hearts` · `Practice Mistakes` · `No ads` · `Mastery Quiz` · `Unlimited Test-outs` — under the now-retired name `Duolingo Plus`. Two of those five feature names (`Mastery Quiz`, `Unlimited Test-outs`) do not appear in the current feature tour, so the plan-benefit vocabulary has churned. `[documented]`

**Pricing, free-trial terms, billing cadence, cancellation and refund wording: not retrievable.** `[absent]` — this is the single largest gap in the file.

## T11 Help-centre architecture

`[absent]` — **blocked.** `support.duolingo.com/hc/en-us` redirects to `www.duolingo.com/help`, which returns an empty body. No category tree, no article-title grammar, no routing furniture could be captured.

What is known indirectly:
- Article URLs are **slugged as questions**: `www.duolingo.com/help/what-is-a-streak` (confirmed to exist via search; body not retrievable). The slug grammar implies question-shaped article titles.
- The footer names the destination `Duolingo FAQs`, and a separate `Duolingo English Test FAQs` at `englishtest.duolingo.com/faq`, so support is split by product with the test on its own domain.
- `Status` is a first-class footer link alongside the FAQs.
- The status page carries a reciprocal link labelled `support site`.

**Compensating structure — `Dear Duolingo` as an advice column** `[observed]`. A recurring editorial series occupying its own blog section, self-described as "an advice column just for learners. From your nerdiest emails about learning to the science of how your brain works, you've got questions—and Duolingo experts have answers." Entries are titled in the letter-writer's voice with a fixed prefix:

- `Dear Duolingo: Can you learn a language in six months?`
- `Dear Duolingo: How do I practice my language as an introvert?`

This is a support-adjacent content genre rather than a help centre: it absorbs the anxious, unanswerable questions (*am I fast enough? does this work for someone like me?*) that a task-based help IA has nowhere to put. Pattern worth stealing for products whose users have doubts rather than problems.
(https://blog.duolingo.com/)

## T12 FAQs

`[observed]` — the Leaderboards explainer is structured as an FAQ with H3 questions. Questions verbatim, answers summarised:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Why did Duolingo create Leaderboards? | Tested in 2018; competition helped many learners benchmark progress; league count grew from 5 to 10 so reaching the top is a bigger achievement |
| 2 | Who am I matched with every week, and why? | Matched on similar study habits and time zone; cross-course, so opponents may be studying a different language |
| 3 | How does the Diamond Tournament work? | Top 10 of Diamond league qualify; three elimination rounds; rewards per round; iOS and Web only, Android pending |
| 4 | The competition is too intense. Can I opt out? | Yes — toggle off a profile-visibility setting in web settings |
| 5 | And yes, we keep an eye out for cheaters! | Cheating is rare; irregular XP is monitored and offenders removed from Leaderboards |

**Structural notes.** Five items, ordered **rationale → fairness → aspiration → escape hatch → integrity**. Two are unusual.

Q4 is not phrased as a question at all — it is a **complaint followed by a request**: `The competition is too intense. Can I opt out?` Duolingo writes the user's grievance into the heading, concedes immediately ("Yes! Leaderboards aren't for everyone."), and only then gives instructions. This is the Wise-style "write the sentence the user would actually say" move applied to a *feature objection* rather than an error.

Q5 is **not a question**, it's an exclamation in the company's voice — `And yes, we keep an eye out for cheaters!` It answers the accusation users make about each other. Using an FAQ slot to defuse peer suspicion rather than to explain the system is a real pattern.

The two rows also show the escape hatch placed *before* the integrity reassurance — opt-out ranks above defending the mechanic.

**Other FAQ-titled public surfaces** `[observed]`: footer `Duolingo FAQs`; a standalone explainer titled `Is Duolingo free?`; `Dear Duolingo` as a question-led column.

## T13 Mechanic & motivation terminology — **PRIORITY**

`[documented]` unless marked. Every term below appears verbatim in a cited source.

### Streak family
| Term | Usage | Note |
|---|---|---|
| `streak` | "the number of days in a row you've studied" | Lowercase in running text, next to a flame icon |
| `Streak Freeze` | Consumable that "allows you to hit pause on your streak for a day"; up to **2** equippable; `400 gems` to refill | Capitalised. `equipped` is the state verb — borrowed from games, not from insurance |
| `Streak Saver` | A notification type in the `Reminders` settings list | Distinct from Streak Freeze; function not documented publicly |
| `Streak Freeze used` | A notification type | The product tells you *after* it spends your protection |
| `Streak Challenge` | Opt-in wager: "Wager gems and keep a 7, 14, or 30 day streak! No Streak Freezes allowed." | Self-imposed hard mode; explicitly disallows the safety net |
| `streak wager` | Named in the notification-targeting post as an audience condition | An older/parallel name for the same idea — **two names, one mechanic** |
| `Friend Streak` / `Friends Streaks` | Shared streak with another learner | Singular in prose, plural in the settings label |
| `milestone` | `one week`, `one month`, `100 day`, `one year` | |
| `Fire Duo` / phoenix | Milestone transformation art | |

### Currency, scoring, competition
| Term | Usage | Rejected alternative |
|---|---|---|
| `XP` | Glossed on first use as `"experience points," or XP` | "points" |
| `gems` | "Duolingo's in-app currency" | "coins", "credits" |
| `Shop` | Where gems are spent | "Store" (which is the *merch* site, `store.duolingo.com`) — **collision between `Shop` and `Store`** |
| `hearts` | Mistake allowance, 5 | "lives", "tries" |
| `timer boosts` | Purchasable item | |
| `Leaderboard` / `league` | Weekly cohort; **10 leagues**; named ones observed: `Diamond`, `Sapphire`, `Amethyst` | "rank", "tier" |
| `Diamond Tournament` | `Quarterfinals` / `Semifinals` / `Finals` | |
| `Duolingo Score` | "tracks your progress in the course"; appears after Unit 1 | Deliberately distinct from XP — **two simultaneous progress numbers**, a known comprehension hazard |
| `daily goal` | Separate from the streak since ~2019; highest tier is `intense` | |
| `Early Bird Reward` / `Night Owl Reward` | Time-of-day XP bonuses, also notification types | |

### Content and path objects
`path` · `unit` · `node` · `gilded node` · `Legendary` · `Stories` · `DuoRadio` · `Duolingo Podcast` · `Side Quest` · `Friends Quest` · `Monthly Quest` (rendered in-product as `February Quest`, `June Quest`) · `Match Madness` · `Practice Hub` · `personalized practice` · `placement test` · `test-out` · `World Characters` · `Feed` · `Video Call with Lily`

Named quests carry a character's name and a joke: `Zari's Movie Binge`. Named characters appearing in public copy: `Duo`, `Lily`, `Lin`, `Bea`, `Zari`, `Junior`, `Vikram`, `Oscar`, `Lucy`.

### Plans
`Super Duolingo` (formerly `Duolingo Plus`) · `Duolingo Max` · `Family Plan` (up to 6) · `Duolingo for Business` · `Duolingo for Schools` · `Duolingo English Test`

### Internal vocabulary that surfaces publicly
`copy` vs `course content` — Duolingo draws this line explicitly and annotates a screenshot with it: the instruction `Translate this sentence` and the `Check` button are "testable copy"; the character's line `Good evening` and the word-bank tiles are "course content". A single lesson screen is therefore governed by two different authoring pipelines with different review, localization and experimentation rules. Also public: `string` ("copy is called a 'string'"), `CopyCAT`, `Expurrimenter`, and the operating principles `Test everything` and `Learners First`.
(https://blog.duolingo.com/copy-testing-experiments/)

**The terminology defect worth flagging.** A new learner is simultaneously handed **five** numbers — `streak`, `XP`, `gems`, `hearts`, `Duolingo Score` — plus `daily goal` and a `league` position. Three of the five (XP, Score, daily goal) are all "how much have I done", differing only in window and purpose. Duolingo mitigates by staging them (`Score` appears only after Unit 1) and by glossing XP on first use, but publishes no single glossary. The tour post is the closest thing to one.

## T14 Voice, tone & accessibility

**Person.** Second person to the learner, first-person plural for the company, and — distinctively — **third person for the mascot acting as an agent**: "Duo will remind you to practice", "Duo is waiting for you to practice today!", "Let Duo recommend where you should start learning". Duo absorbs the actions that would otherwise be attributed to the company, which is precisely what makes the pressure feel like a character's rather than a corporation's.

**Register.** Contractions everywhere. Exclamation marks used heavily and without embarrassment — unlike Wise, which ships none. Self-interrupting asides in parentheses and em-dashes ("we won't tell your boss 😉", "Oh no!", "(we all have them!)"). Emoji in body copy (😳 🧠 💚 💎 😉). Italics for stress on single words ("a *perfect* streak", "*that* engaged", "more *Duolingo*").

**Self-aware, pre-emptive concession** is the signature tonal move. Copy routinely voices the reader's objection before answering it: "We know, we know—sometimes the day gets away from you", "We know, this one seems obvious", "At first, this may seem like a dishonest way to maintain a streak", "That might not seem like much, but…", "we all know and love (…OK, maybe fear) Duo's playfully passive-aggressive tone". Six instances across five posts. It buys credibility cheaply and it is the mechanism by which Duolingo gets away with the guilt register — it always names the discomfort first.

**Tone is a tested variable, per locale, not a style-guide constant.** The German opt-in test (+8% on a benefit reframe) failed to replicate in Spanish: "We learned enough to better support German learners, but it was not a one-size-fits-all solution." Duolingo's explicit position is that "Speakers of different languages may not always perceive the tone we use in the same way." Copy is localized into **22 primary languages** and tone is A/B tested within them. Character-count differences are used as a *content* opportunity rather than a constraint — Chinese's density let them expand `Unlimited Hearts` to a phrasing glossed as "No heart loss on errors", and `Mastery quiz` to "Test your knowledge anytime", which lifted trial sign-ups. **A length affordance exploited for clarity, in one locale only, because it wasn't "feasible in any of our longer languages."**

**Register gradient.** Unlike Wise, the tone does *not* flatten as stakes rise — the streak-protection modal is as exclamatory as the marketing (`Protect your 3 day streak!`). The only flattening observed is in the status page's borrowed Statuspage vocabulary.

**Accessibility** `[observed]`

- **Alt text is exceptionally strong, and is the reason this file exists.** Duolingo's blog alt text *transcribes the UI strings inside screenshots* rather than describing them abstractly: "Duo the owl is at the top and says 'What would you like to learn?' and there are 7 languages listed below (and more available if you scroll)"; "a button to 'Refill streak freezes' for 400 gems"; "The caption reads 'Draw the missing stroke.'" Screenshot alt text that includes the text in the screenshot is best practice and is followed here with unusual discipline across dozens of images.
- Illustration alt text is scene-level and **names emotional state**, which is essential given that mood is load-bearing: "Duo looks increasingly panicked", "Duo the owl staring up and to the right, looking hopeful and proud", "Duo looking sweaty and scared, Duo looking angry and threatening, and Duo as a skeleton". A screen-reader user reading the *blog* gets the affect; there is no evidence either way about whether the *widget* exposes it.
- One alt text runs ~90 words describing an animated GIF of design variations — long, but the alternative for motion content is worse.
- `Sound effects`, `Haptic feedback`, `Listening exercises` and `Motivational messages` are independently toggleable, and the tour explicitly frames skipping listening exercises as a legitimate accommodation ("like skipping listening exercises if you're in a loud environment"). Sensory-channel control as a first-class setting.
- The tab-refresh post names accessibility as a brand obligation: "our learners rely on us to deliver accessible learning experiences".
- **Gaps:** no public accessibility statement, VPAT, or conformance claim was found. One alt text is **truncated mid-sentence** — `"Build the character in ` — a real defect in the published page. Two blog images carry no meaningful alt (a bare hash-link and a chart image labelled `Screen-Shot-2020-11-13-at-5.28.46-PM`, i.e. the filename, which is worse than empty alt for a chart carrying data). Duolingo's own screenshots of the *product* could not be verified for in-app alt text.

**Negative findings, recorded honestly**

- `Top 10 qualify for the Tournament` / `The top 10 qualify for the tournament` / `The next Tournament is starting soon` / `The next tournament begins soon` — four renderings of two strings on one page
- `Shop` (gems) vs `Store` (merch) — two similar labels for unrelated destinations
- `streak wager` vs `Streak Challenge` — two names for one mechanic, in two posts
- `Brand guidelines` in the footer leads to a blog tag archive
- `Make My Profile Public` is the documented way to turn off Leaderboards — label does not predict effect
- `Translate the word.` vs `Translate this sentence` — inconsistent terminal punctuation on parallel prompts
- `Tap what you hear.` — touch-only verb on a cross-platform prompt
- `gilded` used as a progress state in a product whose users are, by definition, learning
- `Mastery Quiz` and `Unlimited Test-outs` documented as plan benefits but absent from the current feature inventory
- 3.6× vs 2.4× published for the same 7-day-streak threshold
- Alt text truncated mid-string in a live post
- Chart images alt-texted with their filenames

---

## Transferable patterns

1. **Pre-frame the OS permission with the benefit, in a character's first person.** `I'll remind you to practice so it becomes a habit!` before the system dialog, with published evidence that benefit framing beats system-need framing by 8% on opt-in. Transfers directly to any push, location, or biometrics prompt. Condition: you need a persona with standing to make the promise, or it reads as corporate wheedling.

2. **Publish the notification inventory as individually-named toggles.** `Streak Freeze used`, `Streak Saver`, `Early Bird Reward`, `Night Owl Reward`, `Weekly progress` — each named for the *event* that triggers it, each switchable. The strongest available answer to "this product pressures me": show the user the complete list and let them disassemble it. Applies straight to any engagement-notification or marketing-preference screen.

3. **Bound the loss in one sentence, inside the loss-aversion mechanic itself.** "losing your streak doesn't mean you lose the knowledge you've gained along the way." Separate the token from the substance so the token's loss is survivable. Transfers to points, tiers, badges, and status programmes — and to any progress indicator whose reset a user might read as invalidating their actual progress.

4. **Model error as a durable, named content object.** `Practice Mistakes` / `Practice Hub` / "specific mistakes you've made" — wrong answers become a re-servable collection with its own surface and its own product name, and the remedy for failure is another dose of the core action. Transfers to onboarding drop-off, failed verifications, declined payments: keep the failure, name it, and route it back into the product.

5. **Write the user's objection as the heading and concede in the first word.** `The competition is too intense. Can I opt out?` → "Yes!". Use an FAQ slot for a *feature grievance*, not just a how-to. Condition: the concession has to be genuine and the instructions have to follow immediately, or it reads as mockery.

6. **Lower the qualifying bar for the streak, not the ambition for the goal.** Decoupling `daily goal` from `streak` raised 7-day-streak learners by 40%+ while *reducing* goal completion — and Duolingo published both numbers. The reusable principle: when a progress token gates on your most ambitious metric, the most committed users lose the token first.

7. **Watch what the illustration says when the copy says nothing.** Duolingo's deadline pressure lives in Duo's face, not in strings, which means it escapes copy review, localization, and screen readers alike. If your product carries emotional pressure in imagery or animation, that pressure needs the same scrutiny — and the same accessible text equivalent — as the words.

8. **Reject a motivation metaphor on cross-cultural comprehension grounds.** "keeping the flame alive" was replaced with a phoenix because the fire idiom "is not shared by all cultures across the globe". A rare documented instance of an idiom losing to comprehension in a global product.

## Caveats & gaps

- **The help centre is unreadable to this harvest.** `support.duolingo.com/hc/en-us` redirects to `www.duolingo.com/help`, which is a client-rendered shell. T11 is `[absent]`; article-title grammar, category tree and self-service routing are entirely unharvested and would need a browser-rendered pass.
- **All of `www.duolingo.com` is blocked the same way.** `/super`, `/help`, `/help/what-is-a-streak`, `/terms`, `/privacy`, `/guidelines` all return empty bodies. Consequence: **no pricing, no free-trial wording, no cancellation or refund copy, no ToS, no community guidelines.** T10 is labels-only.
- **Most in-product strings here are `[documented]`, and specifically documented via blog screenshots and their alt text.** They are verbatim where alt text transcribes them, but they are point-in-time: the streak modal screenshot dates from 2022, the `Duolingo Plus` checklist from 2022, the onboarding screens from 2024. At least two plan-benefit names in that set (`Mastery Quiz`, `Unlimited Test-outs`) appear to be retired. **Do not treat any string in this file as currently shipped without re-verification in the app.**
- **The famous push-notification strings are not in the public record.** Only one template is named verbatim anywhere (`Time for [language]`). The widely-quoted guilt-register push copy circulating socially could not be verified on a Duolingo-controlled surface and is therefore **not reproduced here**. The guilt finding in T9 rests on Duolingo's own characterisation of its notifications plus the widget's documented escalating-distress design — not on quoted push strings.
- **`Streak Saver` is a confirmed string with unconfirmed behaviour.** It appears in the `Reminders` settings list; nothing public explains how it differs from `Streak Freeze`. Streak *repair* / restore-after-loss copy was not found on any Duolingo-controlled surface. `[absent]`
- **Leagues: 10 exist, 3 named.** `Diamond`, `Sapphire`, `Amethyst` are confirmed. The other seven are not, and were not guessed.
- Empty states, validation messages, toasts, and the zero-hearts state are all behind auth. `[absent]`
- Mobile app store copy, in-app purchase sheets, and email copy are outside the public web surface and unharvested.
- The blog is a *retrospective* source: it describes what was built and why, with survivorship bias toward wins. Every effect size quoted here is Duolingo's own self-reported A/B result.

## Sources

1. https://support.duolingo.com/hc/en-us (redirects to 2; empty body)
2. https://www.duolingo.com/help (empty body; meta tags only)
3. https://www.duolingo.com/help/what-is-a-streak (empty body)
4. https://www.duolingo.com/super (empty body)
5. https://blog.duolingo.com/
6. https://blog.duolingo.com/hub/design/ (via https://design.duolingo.com/)
7. https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/
8. https://blog.duolingo.com/how-duolingo-streak-builds-habit/
9. https://blog.duolingo.com/improving-the-streak/
10. https://blog.duolingo.com/streak-milestone-design-animation/
11. https://blog.duolingo.com/tips-for-maintaining-streak/
12. https://blog.duolingo.com/duolingo-leagues-leaderboards/
13. https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/
14. https://blog.duolingo.com/widget-feature/
15. https://blog.duolingo.com/core-tabs-redesign/
16. https://blog.duolingo.com/copy-testing-experiments/
17. https://status.duolingo.com/
