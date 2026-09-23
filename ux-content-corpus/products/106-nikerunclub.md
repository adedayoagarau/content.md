# 106. Nike Run Club

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Running coaching app (audio-guided coaching, run tracking, social challenges) |
| Primary URL | https://www.nike.com/nrc-app |
| Corpus rank | 106 |
| Benchmark strength (source list) | Coaching and motivation |
| Locale / market observed | en-US (nike.com US default) |
| Platform observed | Web (desktop marketing pages, help hub, editorial). App itself not installed. |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | No medical-device or health-regulator claim made anywhere observed. NRC is positioned as a consumer fitness app, not a health product — no FDA/CE/MDR language, no clinical disclaimer, no injury/medical caveat found on the NRC pages inspected. Accessibility: Nike publishes a global accessibility programme page stating WCAG 2.1 AA as the measurement standard, plus per-country accessibility statements across ~35 European locales (EAA-driven). Privacy surfaced only via the generic Nike, Inc. privacy policy and a `Your Privacy Choices` footer link (US state privacy). |
| Harvest date | 2026-09-21 |
| Pages inspected | 5 |
| Harvest completeness | Partial — NRC has **no dedicated help centre**. `nike.com/help/a/nrc-app-support` returns "Article Not Found" (NOINDEX). All in-app coaching, error, empty-state and notification copy is therefore unreachable; the richest coaching strings live inside the audio-guided runs, which are an audio surface behind app install. Marketing and editorial copy captured in full. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| NRC app (primary product page) | https://www.nike.com/nrc-app | Hero, six feature sections, cross-sell carousel, running footer taxonomy |
| Running Training Plans | https://www.nike.com/running/training-plans | Four plan cards with durations, coach quote, training philosophy |
| Editorial: running goals | https://www.nike.com/a/running-goals | Five-feature explainer — the single richest `[documented]` source for in-app coaching structure |
| Accessibility at Nike | https://www.nike.com/accessibility | WCAG 2.1 AA commitment, adaptive-product framing, global statement index |
| Help article (404) | https://www.nike.com/help/a/nrc-app-support | Recorded as a negative finding — no NRC support article exists at the guessable path |

---

## T1 Navigation & IA labels

**NRC sits inside nike.com commerce IA, not a health IA** `[observed]`

This is the defining structural fact. The NRC app page is served under the full Nike shop chrome: `Men` · `Women` · `Kids` · `Jordan` · `NikeSKIMS` · `Sport` · `Sportswear`, with `Find a Store`, `Help`, `Join Us`, `Sign In`. There is no "Health", "Training" or "Coaching" top-level nav entry. A user arriving to be coached lands inside a retail information architecture.

**The running sub-nav is surface-type, not goal-type** `[observed]`

Directly under the `Nike Run Club` H1: `Road` · `Race` · `Trail` · `Track & Field` — all four are **shoe category links**, not app sections. The app page's own sub-navigation routes the user to product listings.

**Footer running taxonomy — four groups** `[observed]`

| Group | Members (verbatim) |
|---|---|
| `Running Shoes` | `All Running Shoes`, `New Running Shoes`, `Best Sellers`, `Nike Pegasus`, `Nike Free`, `Nike Vomero`, `Track & Field`, `Trail Running Shoes`, `Racing Shoes`, `Customize with Nike By You` |
| `Running Clothing` | `Shorts`, `Pants & Tights`, `Tops & T-Shirts`, `Sports Bras`, `Tanks & Sleeveless Shirts`, `Jackets & Vests`, `Hoodies & Pullovers` |
| `Running Gear` | `Apple Watches`, `Socks`, `Backpacks & Bags`, `Sunglasses`, `Hats`, `Sleeves & Arm Bands` |
| `Featured` | `Nike Run Club App`, `Coaching & Nutrition`, `Running Shoe Finder`, `Training Plans`, `How To Start Running`, `Perfect Your Running Form`, `Strength Routine`, `Proper Breathing` |

Only the fourth group is content. `Featured` is where the entire coaching-knowledge layer lives — four of its eight entries are how-to guides (`How To Start Running`, `Perfect Your Running Form`, `Strength Routine`, `Proper Breathing`). The coaching IA is a footer group inside a shop footer.

**Help IA is commerce-only** `[observed]`: `Order Status` · `Shipping & Delivery` · `Returns` · `Order Cancellation` · `Size Charts` · `Contact Us` · `Membership` · `Promotions & Discounts` · `Product Advice`. Nothing app-related. **Negative finding of substance:** the most-downloaded running app in the world has no self-service support IA on its own web property.

## T2 Value proposition & headline patterns

**Hero — an invitation, not a claim** `[observed]`

> Headline: `Let's Run Together`

First-person plural imperative with a contraction. No number, no differentiator, no product noun. Contrast with the Wise pattern (task-as-headline) and with Flo/Clue (superlative-plus-scale). Nike's hero asserts *companionship* as the product.

The subhead is the most instructive paragraph in the file — it is written as **a rapid objection-handling loop**:

- "The Nike Run Club App has everything you need to start running, keep running, and enjoy running more."
- "Never laced up? We got you."
- "Need a coach to keep pace or a friend to keep you company? We're there."
- "Want us to track your stats so you can track the scenery? No problem."
- "Want to share your location with your loved ones while out on a run? You got it."
- "Even if you don't feel like running today, NRC has training tips to help you get ready for tomorrow."
- "Start whenever and wherever you want – we'll be right there with you."

Five consecutive **question-then-reassurance pairs**, each reassurance two to four words (`We got you.` / `We're there.` / `No problem.` / `You got it.`). The questions are ordered by ascending commitment: never started → want a coach → want tracking → want safety → *don't want to run at all*. That last one is the notable move: the copy pre-empts the non-user state ("Even if you don't feel like running today") rather than only addressing the motivated user. Motivation copy that budgets for demotivation.

The three-verb spine — `start running, keep running, and enjoy running more` — recurs verbatim in the cross-sell card ("Everything you need to start running, keep running, and enjoy running more") on the Training Plans page. It is the product's canonical benefit triad: **acquisition, retention, affection**, stated in the user's verbs.

**Section headers — six, all sentence-case imperatives or first-person-plural statements** `[observed]`

| Header | Rhetorical mode |
|---|---|
| `We Keep Track of the Details` | Company-as-actor |
| `Share Your Run Location` | User imperative |
| `Challenge Yourself, Challenge Each Other` | Paired imperative, self then social |
| `Welcome to Your Starting Line` | Possessive metaphor |
| `Run With a Coach In Your Ear` | Concrete sensory description |
| `Celebrate Achievements` | Imperative |
| `Made to Move` | Product attribute |

`Welcome to Your Starting Line` is reused verbatim as the Training Plans hero (`Welcome to Your New Starting Line`). Note the possessive: not "the" starting line. The metaphor converts a beginner's anxiety (not being a runner yet) into an assigned, owned position.

**The division-of-labour construction** `[observed]`, appearing twice:

> "NRC pays attention to your pace, location, distance, elevation, heart rate, and mile splits — so you can pay attention to the scenery."

The same verb (`pays attention to`) on both sides of the em-dash, with the app taking the tedious object list and the user taking the single pleasurable one. This is the most reusable single sentence in the file: **name the burden in full detail, name the reward in one word, and use identical verb on both sides so the trade reads as an exchange rather than a feature.**

**Claim-free marketing.** Unlike every other product in this batch, NRC's product page carries **no statistics at all** — no user count, no rating, no accuracy figure, no clinical citation. `[observed]` The editorial page supplies the only quantitative claim, and it is about shoes, not outcomes ("replace running shoes after 300 to 500 miles").

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download the App` | Hero, and again mid-page | Appears twice on one page with identical label |
| `Get Started` | Under tracking section | Generic |
| `Get Connected` | Under location-sharing section | Verb matched to the social feature |
| `Explore Challenges` | Under challenges section | |
| `Explore Training Plans` | Under starting-line section | |
| `Progress With Us` | Under achievements section | **Most distinctive CTA in the file** — "with us" restates the hero promise inside the button |
| `Learn More` | Apple Watch section | Bare `Learn more`, the one weak label |
| `Download NRC App` | Training Plans hero | Third distinct download-label variant |
| `Explore` | Cross-sell cards (NTC, Nike App, SNKRS) | |
| `Watch` | Training philosophy video | |
| `Shop the Collection` | Accessibility page, EasyOn | |
| `Email Accessibility at Nike` | Accessibility page | Names the channel and the team |
| `Skip to main content` | First in DOM, every page | |
| `Accessibility at Nike` | Second in DOM, every page | Persistent top-of-DOM accessibility link — unusual and good |

**Observation.** Four of the seven feature CTAs are verb-first and feature-matched (`Get Connected`, `Explore Challenges`, `Explore Training Plans`, `Progress With Us`) rather than generic. But the download action carries **three different labels** across two pages (`Download the App`, `Download NRC App`, plus the repeat). The label discipline is good inside feature sections and poor at the conversion point.

`Progress With Us` is worth stealing. It is the only CTA in this batch where the button text carries the product's emotional proposition rather than the mechanical action.

## T4 Onboarding & getting-started

**Training plans are named by race distance and duration only** `[observed]`

| Plan | Duration |
|---|---|
| `5K` | `8 weeks` |
| `10K` | `8 weeks` |
| `Half-Marathon` | `14 weeks` |
| `Marathon` | `18 weeks` |

No difficulty labels, no "beginner/intermediate/advanced", no fitness prerequisites stated. The commitment is expressed purely as **distance + calendar weeks**, which lets the user self-select on the only two variables they can actually assess about themselves.

**A fifth plan exists only in editorial** `[documented]` — `4-Week "Get Started" Training Plan`, described as "best for beginners who want to start running, but any runner can benefit." It is not on the Training Plans page. The true entry-level plan is the one hardest to find, which is a findability gap worth recording.

**Plan descriptions in editorial name their structure** `[documented]`:
- 4-week: "each week features approximately three runs. Throughout the plan, runs range from 5 to 42 minutes."
- 8-week 5K: "five weekly training runs, ranging from easy runs to speed runs to long runs"
- 14-week half: "focuses on distance- and duration-based runs, but it also incorporates speed work (intervals, tempo runs and hill workouts)"

Note `approximately three runs` and `runs range from 5 to 42 minutes` — the range is deliberately wide and the count deliberately hedged. Onboarding copy that refuses to promise a fixed weekly load.

**Guided-run onboarding step** `[documented]`: download before you run — "it's a good idea to download them ahead of your session by tapping your chosen run and then tapping Download, and once downloaded, you can tap Start". Two named controls: `Download`, `Start`.

**"How it works" framing is permissive, not sequential** `[observed]`: "Getting ready for a race, or just getting out the door. We all start somewhere." and "Wherever you're at, whenever you're ready". There is **no numbered first-run sequence** anywhere public. NRC deliberately does not gate the user through steps — "Start whenever and wherever you want". Compare Wise, which ships a hard three-step narrative. NRC's onboarding content is an argument that no onboarding is required.

## T5 Form & field labels

`[absent]` — no public form exists on the NRC surface. There is no calculator, no goal-setting wizard, no signup form on the app pages. All entry is via an app-store deep link.

**Tracked-metric vocabulary, which functions as the app's field set** `[observed]`:
`pace` · `location` · `distance` · `elevation` · `heart rate` · `mile splits`

Editorial extends it `[documented]`: "pace, location (whether you're running indoors or outdoors), distance, elevation, heart rate and mile splits", plus shoe mileage — "the app can track how many miles you've logged in each pair of shoes".

**Challenge-creation fields** `[documented]`: "pick a distance, set the dates for the challenge and invite friends", reached by a control labelled `Create a Challenge` under the `club` tab. Three fields only — distance, dates, invitees. No name field, no goal type, no privacy setting mentioned. Minimal-field social creation.

`mile splits` and monthly `100K (62-mile) challenge` show a **dual-unit register**: imperial primary on the US surface, metric retained for race distances (`5K`, `10K`, `100K`) because those are proper nouns of the sport rather than measurements.

## T6 Status & state language

`[documented]` / `[observed]` — the achievement vocabulary is the state model:

- `PR` — used unglossed on the marketing page ("when you hit a PR"). Insider abbreviation shipped to a page aimed partly at people who have "never laced up". A register mismatch worth flagging.
- `run-day streak` — "extend your run-day streak". Note the compound: not "streak" but `run-day streak`, which names the unit being counted.
- `last mile total` — "top your last mile total"
- `monthly mileage goal` — the self-set target
- `trophy` — the reward object ("who doesn't like a trophy now and then?")
- `virtual high five` — the social reward ("Get a virtual high five from your worldwide run club")

**The streak copy contains its own counterweight** `[observed]`:

> "It's not all about the numbers — but who doesn't like a trophy now and then?"

This is the wellbeing-relevant finding for this file. NRC's achievement section explicitly de-emphasises its own metrics inside the same paragraph that promotes them, using a rhetorical question to keep the tone light. It is a mild mitigation — it does not signpost any risk, and it does not appear beside the streak mechanic itself — but it is a deliberate tonal hedge on gamification, and it is the only one found on the public NRC surface.

**No crisis or risk signposting found.** `[absent]` Searched the NRC app page, training plans, the goals editorial and the help hub: there is no injury guidance, no overtraining caution, no "consult your doctor before starting an exercise programme" line, no mental-health or body-image signposting, and no link to any such resource. For a product whose editorial encourages progressive mileage increase in beginners, the absence of any physical-risk caveat is a substantive negative finding. Recorded as observed absence, not inferred.

## T7 Error, failure & recovery

`[absent]` for in-product errors — no help centre, no troubleshooting articles, no error strings reachable.

**One near-recovery pattern** `[documented]`: the guided-run download tip is framed as pre-emptive failure handling — download ahead "(in case you're running in an area with spotty service)". The parenthetical names the failure condition in the user's own terms ("spotty service") rather than a technical one.

**Structural failure recorded** `[observed]`: `https://www.nike.com/help/a/nrc-app-support` returns a page titled simply `Nike`, `meta-description: Article Not Found`, `meta-robots: NOINDEX, NOFOLLOW`, and renders the generic help shell with `What can we help you with?` and a search box. The user gets no "this article has moved", no suggested alternatives, no 404 acknowledgement in body copy — just an empty help hub. **The error state is silent**: nothing in the visible page tells the user their link was wrong.

## T8 Empty states

`[absent]` — all behind app install.

The 404 help page above is the closest observable analogue and it functions as an unintentional empty state: search prompt with no content and no explanation.

## T9 Notifications & system messages

`[documented]`, thin:

- Wearable notifications: "Get all the metrics and notifications you need, straight from your wrist."
- The Apple Watch `Bounce watch face` is described as reacting "to motion and shares metrics as you move", with an audio alternative — "you can enable the watch with audio features to read your stats aloud to you". Two output modalities named for the same data, which is an accessibility-adjacent design choice even though it is pitched as convenience.
- Safety message pattern `[observed]`: after location-shared runs, "you can send your loved ones another message to let them know you made it back safely." The message is described by its *social function* (reassurance) rather than its mechanism.

**The audio coach is the notification channel.** `[observed]` "Put in your headphones and let a Nike Running Coach guide your run" · "our always-on Audio-Guided Runs provide in-the-moment training tips". `in-the-moment` is the timing promise. Editorial adds the motivational framing `[documented]`: "Guided Runs give you a voice inside your head that believes you can do it."

That last line is the clearest statement of NRC's content strategy anywhere public: **the coaching content's job is stated as belief, not instruction.**

## T10 Disclosures, legal & compliance

Thin by comparison with the rest of this batch, and the thinness is itself the finding.

**Pricing** `[observed]`: NRC is free and this is asserted only in editorial, not on the product page — "The Nike Run Club (NRC) is an app free to download and use." `[documented]` There is **no pricing page, no subscription, no cancellation wording** for NRC. Nothing to cancel. `[absent]`

**Named third parties** `[observed]`: `Headspace` ("Guided Runs with Headspace"), `Apple Watch Nike`. Both named in full rather than described generically.

**Claim bounding** `[documented]`, one instance: "It's typically best to replace running shoes after 300 to 500 miles of wear" — `typically`, plus a range rather than a point. Note this is a *product-replacement* claim, and it is the only hedged numeric claim on the surface.

**Author and date attribution on editorial** `[observed]`: `Words by Emily Shiffer`, `Last updated: June 7, 2022`, `Originally published: May 27, 2022`, `4 min read`. Both dates shown. But — and this is the contrast that matters for this batch — **there is no medical or expert review line**. Flo, Clue and Ada all attach a named clinician with credentials to health content. Nike attaches a writer's byline to content that tells beginners how to increase running mileage. Different risk posture, plainly visible in the attribution furniture.

**Coach credentialing is by name and title, not qualification** `[observed]`: `Chris Bennett, Nike Running Global Head Coach`; `Shalane Flanagan, four-time Olympic runner, silver medalist in the 10,000 meters and coach of the Nike-sponsored professional running group, Bowerman Track Club`. Authority is athletic achievement, not clinical credential. Note the disclosure of the sponsorship relationship inside Flanagan's descriptor (`Nike-sponsored`).

**Accessibility as public commitment** `[observed]`, from the Accessibility at Nike page:
- `WCAG 2.1 AA` named as the measurement standard: "We measure the accessibility of our digital assets against WCAG 2.1 Level AA."
- Process stated: "our site undergoes regular testing to maintain compliance"; "We regularly conduct usability studies with people with disabilities, whose valuable feedback helps us prioritize accessibility issues."
- Per-country statements published across ~35 European locale paths (`/at/`, `/be/`, `/de/`, `/fr/`, `/it/`, etc.), each at `/accessibility/statement`. Multi-jurisdiction accessibility disclosure treated as a first-class localised artefact.

## T11 Help-centre architecture

`[absent]` — **there is no NRC help centre.** This is the single most significant IA finding in the file.

What exists instead:
- `nike.com/help` — commerce support only (orders, shipping, returns, size charts, payment, gift cards)
- An editorial knowledge layer under `nike.com/a/…` and `nike.com/running/…`, discoverable only via the footer `Featured` group or search

**Editorial article-title grammar — three shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `How To <verb phrase>` | `How To Start Running` |
| Imperative | `Perfect Your Running Form` |
| Noun phrase | `Strength Routine`, `Proper Breathing`, `Coaching & Nutrition` |

Compare Wise's four shapes including `How do I…?` and `I <did wrong thing>`. Nike has **no question-form titles and no failure-form titles at all**. The content set is entirely aspirational-instructional; there is no article shaped like a user's problem. A runner with a question about the app has nowhere to land.

**Routing furniture** `[observed]`: `What can we help you with?` with a search box, `Contact Us` at the end. No "still need help", no personalised-support offer, no topic browse.

## T12 FAQs

`[absent]` — no FAQ block on the NRC app page, the training plans page, or the help hub.

The nearest artefact is the editorial listicle `5 Nike Run Club App Features to Help You Crush Your Running Goals`, whose five numbered items function as implicit FAQ answers `[documented]`:

| # | Item (verbatim) |
|---|---|
| 1 | `Audio-Guided Runs` |
| 2 | `Training Plans` |
| 3 | `Community Challenges` |
| 4 | `Run Tracking` |
| 5 | `Pairing With Fitness Wearables` |

All five are noun phrases — feature names, not user questions. The list answers "what does it do", never "what if it doesn't".

## T13 Terminology & glossary

| Term | NRC's usage | The alternative it rejected |
|---|---|---|
| `Nike Run Club` / `NRC` | Full form on marketing, abbreviation freely mixed into the same paragraph | — |
| `Guided Runs` / `Audio-Guided Runs` | Two forms on one page; `Audio-` prefix used when introducing, dropped thereafter | "audio coaching", "workouts" |
| `Coach` | A named human (`Nike Running Coach`, `Chris Bennett`) | "trainer", "AI coach", "assistant" |
| `Challenges` | Capitalised as a product noun; `Community Challenge` for the org-run variant | "goals", "competitions" |
| `run-day streak` | Compound naming the counted unit | "streak" |
| `PR` | Used unglossed | "personal best", "personal record" |
| `Training Plans` | Capitalised product noun | "programmes", "courses" |
| `crew` | "Running is just better with a crew." | "group", "community" (both also used) |
| `worldwide run club` | The social object ("a virtual high five from your worldwide run club") | "other users", "community" |
| `club` | Explicitly defended: "It's called a 'club' for a reason" | "app", "platform" |
| `fartleks` | Glossed inline: "(speed training that incorporates periods of fast and slow running)" | — |
| `athlete*` | Nike-wide term with a footnote asterisk, defined as "If you have a body you are an athlete." | "customer", "user" |
| `Starting Line` | Metaphor for the pre-beginner state | "getting started", "onboarding" |

**Two glossing behaviours, inconsistently applied.** `fartleks` gets an inline parenthetical gloss; `PR` and `splits` do not. The technical term that sounds foreign is explained; the technical terms that sound like ordinary English are not — which is the harder findability problem, since a beginner will not know they need to look `PR` up.

**`athlete*`** is the load-bearing brand term. The asterisk is a live footnote — the accessibility page resolves it as `IF YOU HAVE A BODY YOU ARE AN ATHLETE.` and reuses it as `WE SERVE ALL ATHLETES*`. A trademarked-looking asterisk used to *widen* rather than restrict a claim is a genuinely unusual disclosure inversion.

## T14 Voice, tone & accessibility

**Person.** Second person for the user, first-person plural for the app-as-companion: `We got you`, `We're there`, `we'll be right there with you`, `We keep track`, `Our coaches picked out`. The company is not a system — it is a **running partner who speaks**. This is the register distinction from every other product in this batch: Flo says "we" as an institution, NRC says "we" as a person beside you.

**Tense and mood.** Present and imperative throughout. Conditional used only to set up reassurance ("Even if you don't feel like running today…").

**Register.** Short sentences, heavy contractions (`We got you`, `don't`, `you're`, `we'll`, `It's`). Deliberately ungrammatical in places — `We got you` rather than "we've got you" — which is a spoken-register choice. Fragments used as complete units (`No problem.` / `You got it.`).

**Punctuation.** Em-dashes carry the structural work in both key constructions (the attention trade, the streak counterweight). **No exclamation marks anywhere on the NRC pages inspected.** Motivation is carried by rhythm and address, not by punctuation energy — a notable restraint for a category that usually shouts.

**Rhetorical questions** are the dominant device: five in the hero, plus "who doesn't like a trophy now and then?". Used to voice the user's hesitation and then answer it, rather than to hype.

**Tone gradient.** Warmest in the hero and the social/achievement sections; flattest in the metric list (`pace, location, distance, elevation, heart rate, and mile splits`) and the plan table (bare distances and week counts). Same gradient principle as Wise — informality falls away where the user is making a commitment decision.

**Accessibility content** `[observed]`

- `Skip to main content` is first in DOM on every page, immediately followed by a persistent `Accessibility at Nike` link. Putting an accessibility hub link in the top-of-DOM skip region, sitewide, is a strong and rare pattern.
- Stated conformance target: `WCAG 2.1 AA`, with regular testing and usability studies with disabled people named as process.
- Localised accessibility statements across ~35 European locales.
- Alt text on the accessibility page is unusually long and scene-descriptive: "Person running with a black prosthetic blade on the left leg and a white Nike running shoe with red and blue accents on the right, wearing a neon green sock and black Nike shorts." · "Person velcroing their Nike Easy On Air Max sneaker with a white, gray, and black upper, green swoosh, and visible air unit, while standing on grass in bright orange socks." · "Nike employee competing in a one-mile race alongside runners, wearing an orange racing outfit and helmet, crossing the finish line in a racing wheelchair."
- Product-side accessibility is content too: `Nike EasyOn` with three labelled benefits — `Easy to Put On` · `Easy to Take Off` · `Lace Free` — plain-language and consequence-named rather than feature-named.

**Accessibility gaps recorded honestly** `[observed]`

- Alt text on the **NRC app page** is near-useless by comparison: every hero and feature image carries `alt="Nike Run Club App"` — the same string, repeated six-plus times, describing nothing. The carousel images use positional alt (`Try Our Other Apps, Nike Run Club App, slide 1 of 3`), which is better but still names the carousel rather than the content. **Nike's accessibility page has excellent alt text; Nike's product page does not.** A same-brand contrast that makes a clean internal case study.
- Several images resolve to `![Nike Run Club App](<>)` — an empty source with non-empty alt, which is the wrong way round.
- All content in the NRC feature sections is **duplicated in the DOM** (responsive variants), so each heading and paragraph appears twice in the extracted text. Suspected screen-reader duplication depending on CSS handling; flagged as suspected, not confirmed.
- `PR` unglossed is a plain-language failure on a page that explicitly addresses people who have "never laced up".

---

## Transferable patterns

1. **Question-then-two-word-reassurance loop.** `Never laced up? We got you.` Five in a row, ordered by ascending user hesitancy, ending with the *non*-user state. Transfers directly to any onboarding hero where the main barrier is self-doubt rather than comprehension. Condition: only works when the reassurances are genuinely short — a four-word answer breaks the rhythm and reads as marketing.
2. **The attention trade — identical verb either side of an em-dash.** "NRC pays attention to [six tedious things] — so you can pay attention to [one good thing]." Name the burden in exhaustive detail and the reward in one word. Reusable anywhere a product automates drudgery.
3. **Commitment expressed only as duration + outcome.** `Half-Marathon · 14 weeks`. No difficulty tier, no prerequisite. Lets the user self-select on variables they can actually assess. Applies to any multi-session programme — financial goal plans, learning paths, savings targets.
4. **CTA that carries the proposition, not the mechanism.** `Progress With Us` beats "View progress". Condition: the surrounding section must already have established what "us" means, or the label is meaningless.
5. **Asterisk that widens rather than restricts.** `athlete*` → "If you have a body you are an athlete." Inverting the reader's expectation of a limiting footnote is a strong inclusion device — but it only works once per brand, and only if the footnote is genuinely resolvable on-site.
6. **Negative pattern: coaching content without a support IA.** NRC ships a rich motivational content layer and zero troubleshooting content. Every question shaped like a problem is unanswerable on Nike's own property. If a product invests in inspirational content, the recovery content has to exist too, or the inspirational content becomes the only voice — and it cannot help a stuck user.
7. **Negative pattern: accessibility excellence that does not propagate.** Nike's accessibility page has model alt text; the NRC product page repeats one meaningless string. A published WCAG commitment does not itself reach the product pages. Worth citing internally when arguing for alt-text review at the template level rather than the policy level.

## Caveats & gaps

- **No help centre exists for NRC.** T7 (errors), T8 (empty states) and T11 (help architecture) are `[absent]` rather than merely unobserved. The guessable support path returns a silent 404.
- **All coaching copy is audio.** The Guided Runs are the product's primary content artefact and they are spoken, inside the app, behind install. Everything in T9 about coaching tone is `[documented]` from marketing and editorial descriptions, never heard. An authenticated + app-install pass would be needed, and even then the strings are audio rather than text.
- **No in-app UI strings observed at all.** Field labels, states, toasts, achievement copy, streak messaging and challenge flows are all inferred from editorial description. The named controls (`Download`, `Start`, `Create a Challenge`, `club` tab) come from a third-party-written Nike editorial article, not from Nike UX documentation.
- **Five pages only.** `nike.com/running/how-to-start-running`, `/stories/coaching`, the four individual training-plan pages, and the Nike Membership terms were not harvested.
- **US locale only.** NRC pages exist across ~50 locales; register and claim-bounding may differ, particularly in the EU where the accessibility statements are separately localised.
- **The absence of health caveats is an observed absence across five pages, not an exhaustive site audit.** It is possible injury or medical guidance exists elsewhere on nike.com; it does not appear on any NRC or training-plan surface inspected.
- Nike's own privacy policy and terms sit behind `agreementservice.svs.nike.com` redirect URLs and were not opened; NRC-specific data handling (location sharing, heart rate) is therefore unassessed.

## Sources

1. https://www.nike.com/nrc-app
2. https://www.nike.com/running/training-plans
3. https://www.nike.com/a/running-goals
4. https://www.nike.com/accessibility
5. https://www.nike.com/help/a/nrc-app-support (404 — recorded as negative finding)
