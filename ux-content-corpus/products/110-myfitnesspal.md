# 110. MyFitnessPal

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Nutrition and calorie tracking (food logging, macro targets, meal planning) |
| Primary URL | https://www.myfitnesspal.com/ |
| Corpus rank | 110 |
| Benchmark strength (source list) | Habit and data-entry guidance |
| Locale / market observed | en-US (support centre serves 20 languages) |
| Platform observed | Web (premium marketing page, Zendesk support centre). Root marketing page **blocked** — see completeness. |
| Regulatory posture | No medical-device, FDA or clinical-regulator claim observed. MyFitnessPal's authority position is **secondary citation of US public-health bodies**: the `National Institutes of Health` (cited with a direct link to the NHLBI obesity guidelines PDF) for calorie floors, the `Institute of Medicine` for physical-activity-level values, `Dietary Guidelines for Americans 2010` for macronutrient and micronutrient targets, the `FDA` for micronutrient levels, and the `Academy of Nutrition and Dietetics` for the carbohydrate floor. Safeguarding posture is **self-imposed and disclosed**: a hard calorie floor (1,200 kcal women / 1,500 kcal men) below which goals are not calculated, a three-tier under-eating alert, and a standing `Eating Disorder Resources` article naming `NEDA` as a partner, the `National Alliance for Eating Disorders` clinician-led helpline, and 16 national organisations across 15 countries. A separate self-harm/suicide resource page is linked. No accessibility statement found. |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Partial — **`myfitnesspal.com/` and `/en` returned empty bodies to fetch** and are recorded as blocked; the primary marketing page, its hero and its nav are therefore unobserved. `/premium` rendered and supplies the pricing and value-prop layer. The support centre is fully reachable and supplies the data-entry, goal-setting and wellbeing material, which is where this product's benchmark strength actually lives. In-app strings are `[documented]` from help articles, several of which quote UI labels directly. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.myfitnesspal.com/ | **Blocked — empty body returned** |
| Home (alt path) | https://www.myfitnesspal.com/en | **Blocked — empty body returned** |
| Premium / Premium+ | https://www.myfitnesspal.com/premium | Pricing, plan comparison matrix, Q&A incl. cancellation |
| Support centre home | https://support.myfitnesspal.com/hc/en-us | 11 categories, four promoted articles |
| Category: Goal Setting and Nutrition 101 | https://support.myfitnesspal.com/hc/en-us/categories/360002205332-… | Two sections, 18 articles |
| How does MyFitnessPal calculate my initial goals? | https://support.myfitnesspal.com/hc/en-us/articles/360032625391-… | **Net Calories model, calorie-floor statement, budget metaphor** |
| A Message about MyFitnessPal's updated nutrition goals | https://support.myfitnesspal.com/hc/en-us/articles/360032626031-… | Guideline change letter with citations |
| How does the "Complete This Entry"… feature work? | https://support.myfitnesspal.com/hc/en-us/articles/360032624131-… | **Three-tier under-eating threshold table, ED signpost** |
| Eating Disorder Resources | https://support.myfitnesspal.com/hc/en-us/articles/360032625071-… | **The wellbeing artefact of the batch** |
| How do I add a food to my food diary? | https://support.myfitnesspal.com/hc/en-us/articles/360032274592-… | Logging flow, search craft, pro tips |
| How to use the Barcode Scanner | https://support.myfitnesspal.com/hc/en-us/articles/360032624771-… | **Rewritten Sept 2026 — visibly newer voice** |

---

## T1 Navigation & IA labels

**Support centre — 11 categories** `[observed]`

`Announcements and What's New` · `Premium Subscription and Billing` · `Login, Profile, and Account Settings` · `Goal Setting and Nutrition 101` · `Food and Exercise Logging` · `Progress Tracking and Insights` · `Connected Apps and Devices` · `Community and Social Features` · `Tips and Frequently Asked Questions` · `Troubleshooting and Known Issues` · `Terms of Use and Privacy Policy`

The labels are **compound noun phrases joining a task to a concept** — `Goal Setting and Nutrition 101`, `Food and Exercise Logging`, `Progress Tracking and Insights`. Each category bundles the mechanical (how to log) with the conceptual (what a calorie is). `Nutrition 101` is the only informal element and it signals an explicitly educational tier.

Two category names are unusually honest: **`Troubleshooting and Known Issues`** (admits to known issues in the nav label) and **`Announcements and What's New`** (change communication as a standing category).

**Sub-sections** `[observed]`: `Goal Setting` + `Nutrition 101`; `Food Logging` (16+ articles); `Premium Features`. Flat two-level IA.

**Promoted articles on the support home — four, all feature launches** `[observed]`:
- `Introducing Progress Overview: Your Progress, Personalized`
- `GLP-1 Support`
- `Introducing Nutrition Coach: Your Nutrition Assistant`
- `Your Today tab`

**`GLP-1 Support`** promoted to the support home page is a live-market signal: MyFitnessPal has built and documented content for users on GLP-1 weight-loss medication. Three of four promoted slots are new-feature announcements rather than high-traffic tasks — the promoted rail is being used as a release channel.

**Two `Introducing …: <benefit restated>` titles** — a consistent launch-article template (`Introducing X: Y`), where Y is a value line rather than a description.

**Premium page IA** `[observed]`: a two-tier product (`Premium` / `Premium+`) with a `Compare Premium vs Premium+` matrix and a downsell link, `See Premium plan`. Nav and footer unobserved (home blocked).

## T2 Value proposition & headline patterns

**Premium+ hero** `[observed]`

> Eyebrow: `BEST VALUE`
> Headline: `Go further, faster with Premium+`
> Subhead: "Customized weekly meal plans, faster logging, deeper insights—all in one place."
> CTA: `Start Free Trial`

Three comparative adjectives in the subhead (`Customized`, `faster`, `deeper`) — the value prop is stated entirely as *improvements on the free experience*, which is correct for an upsell page and tells you nothing about the core product.

**The section header that names the real problem** `[observed]`:

> `Every step of your journey, simplified.`
> "No more guessing what to eat for your goals—and no more stress logging it."

**`no more stress logging it`** is the load-bearing phrase on the page. MyFitnessPal's premium tier is sold against **the friction and anxiety of its own core interaction**. The subscription's proposition is that logging is unpleasant and money makes it less so. Named in the company's own words: `guessing`, `stress`.

Reinforced by the value line on the plan cards `[observed]`: "Plus: The full MyFitnessPal logging and tracking experience!" — the base product described as a *bundled addition* to the meal planner.

**Feature block — six cards, label + one-line benefit** `[observed]`:

| Card | Line |
|---|---|
| `Premium+ Meal Planner` | "Save time and hit your goals with planned meals you'll love to eat, week after week." |
| `Grocery app syncing` | "Generate shopping lists from your meal plan that can sync with grocery delivery apps." |
| `1,500+ tasty recipes` | "Never get bored with tons of recipes for every taste, goal, lifestyle, and meal of the day." |
| `Easy barcode scanning` | "Log food faster and more easily by scanning the barcode on the package." |
| `Log meals with a photo` | "Meal Scan lets you log your whole meal in a flash. Just point, scan, and go." |
| `Voice logging` | "Too much typing? Speak your foods and portion sizes for quick and easy logging!" |

**Four of six are about reducing logging effort** (`barcode`, `photo`, `voice`, plus the planner's auto-logging). The product's premium roadmap is a sustained assault on typing.

`Too much typing?` — a rhetorical question voicing the user's complaint, the same device Nike uses, here applied to friction rather than self-doubt. `Just point, scan, and go` is a three-verb imperative with asyndetic rhythm.

**Cost framing** `[observed]`: `Better for you and your budget` / "Ditch the takeout and reduce food waste. Win-win!" and, on the comparison matrix, "Reach your goals with all the benefits of Premium+ for just ~**$0.28 per day**." The annual price re-expressed as a daily figure with a tilde. `~$0.28 per day` alongside `$99.99 billed annually` — the same number at two magnitudes, the smaller one attached to the persuasive sentence.

**Voice note.** The `/premium` page carries **four exclamation marks** (`Win-win!`, `easy logging!`, `Yes!` ×2 in the Q&A) against zero in the help articles. Marketing and support are running different tone rules.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start Free Trial` | Premium+ hero | |
| `Start your free trial now.` | Q&A answer body, inline | With a full stop, inside prose |
| `Choose your plan` | Plan block | |
| `See Premium plan` | Under Premium+ | **Downsell**, offered under "Don't need help with meal planning?" |
| `Submit a request` | Support header, every article foot | |
| `Sign in` | Support header | |
| `Skip to main content` | First in DOM | Accessibility |
| `Return to top` | Article foot | |
| `Yes` / `No` | `Was this article helpful?` | With visible vote counts |

**The downsell is the notable one.** `Don't need help with meal planning?` → "Check out our Premium plan, designed to help you log faster and stay on top of your nutrition goals with ease." → `See Premium plan`. A question that names a reason *not* to buy the promoted tier, followed by a route to the cheaper one. Offering the downgrade path on the upsell page, phrased from the user's likely objection.

**In-app controls named in help articles** `[documented]` — the only real UI-string set available:

`Add Food` (web) · `Log Food` · `Barcode Scan` · `Scan a Barcode` · `Voice Log` · `Meal Scan` · `Log` · `Search` · `Plan` (tab) · `Today` (screen/tab) · `Food` (tab) · `Complete This Entry` · `Finish logging for today` · the blue **plus (+)** button · a **Check Mark** (Android confirm) · `Apps & Devices` · `More` (page)

**Two labels for one action, twice over.** `Barcode Scan` and `Scan a Barcode` appear in the same article as alternatives depending on entry point. `Complete This Entry` and `Finish logging for today` are documented as the same feature under two names — and the help article's title carries **both**, in quotation marks, joined by `or`: `How does the "Complete This Entry" or "Finish logging for today" feature work?` The help centre is absorbing the product's label inconsistency into its own titles rather than resolving it.

Platform divergence is also documented rather than fixed: iOS confirms with `Log` in the upper right, Android with a **Check Mark** in the upper right. Same position, different affordance, both documented.

## T4 Onboarding & getting-started

**The onboarding is a profile questionnaire whose fields are disclosed** `[observed]`:

> "When you create your profile, we ask you for your **age, height, weight, sex, and normal daily activity level**. We use these factors to determine the calories required to maintain your current weight. We also ask **how much weight you would like to lose or gain per week**, and with this goal in mind we subtract calories (for weight loss) or add calories (for weight gain) to determine your daily calorie and nutrient goals."

Six inputs, one derived output, and the derivation explained in the same paragraph. **A help article that shows its working** — the user can see which answer moved which number.

**A field that is collected and explicitly declared non-functional** `[observed]`:

> "We ask for your **goal weight** when you create your profile, but this is only for purposes of reporting how many pounds remain until you meet your goal. **Your goal weight does not affect your initial calorie calculations.**"

Disclosing that a prominent input does *not* drive the algorithm. Users reasonably assume goal weight sets the deficit; it does not. Correcting a false mental model about your own form is rare and worth naming.

**The activity-level field carries an instruction most products omit** `[observed]`:

> "we recommend setting your PAL based on your normal level of daily activity, **excluding any optional exercise you may choose to do**. Workouts or exercise outside of your daily work/life routine should be logged in the exercise diary."

The field is double-counting-prone, and the guidance is a *negative* instruction — what to leave out. Repeated across two articles, which suggests it is a known error source.

**Named activity levels** `[observed]`: `Lightly Active`, `Active`, `Very Active` (a `Sedentary` tier is implied but not observed).

**No public step-by-step onboarding sequence.** `[absent]` The root page is blocked.

## T5 Form & field labels

**Priority section — this is the product's benchmark strength.**

### The logging flow, as documented

**Web** `[documented]`: "Click on the **'Food'** tab, then click **'Add Food'** under the meal you'd like to log."

**iOS / Android** `[documented]`: tap the blue **plus (+)** near the bottom of the `Today` screen → choose a logging method → for text search, tap the **meal selector** at the top → type in the **search field** → tap `Search`.

**Two commit paths from the results list** `[documented]`, and the distinction is the good design:

> "Tap on **Plus** to the right of the result if you see one that already matches the serving you were looking for. This will log it directly to your Diary."
> "Or tap on **the item itself** to bring up full nutritional information. Here you can adjust the **serving size** and/or **number of servings**, the **meal** it's to be logged under… Tap the **checkmark** at the top to add it to your Diary."

**Plus = commit as-is. Item body = open and adjust.** Two targets on one row, differentiated by precision need. For a task performed five-plus times a day, collapsing the common case to a single tap while keeping the adjustment path one tap away is the core interaction decision of the whole product, and the help article explains the difference in two sentences.

**Field set inside the detail view** `[documented]`: `serving size` · `number of servings` · `meal` · `Timestamp` (Premium) · multi-day logging (Premium).

`serving size` and `number of servings` as **two separate fields** is the classic nutrition-logging trap — "1 cup" versus "2 servings of 1 cup" — and MFP exposes both rather than merging them.

**Barcode flow** `[documented]`, six steps, near-identical across platforms, with the camera instruction written as physical guidance:

> "Hold your camera over the barcode. **Fit the whole barcode inside the scanning frame on your screen.**"

Then serving and meal selection, then confirm. Note the flow is the *same* as search after the identification step — the scanner replaces the search, not the commit.

**Permission failure is pre-empted in the article** `[documented]`: "If you accidentally denied permission, please go back to your **device settings (not MyFitnessPal settings)** and grant MyFitnessPal permission to access your camera." The parenthetical `(not MyFitnessPal settings)` anticipates the exact wrong place the user will look.

**Hardware prerequisite stated twice** `[documented]`: "you will need a Premium subscription and a device with a **rear camera**. Please double-check that your device has a rear camera. If your device only has a forward-facing camera, the scanner will not be available." Said once, then said again with the consequence — a gate explained before it is hit.

### Search craft — the two "Pro Tips"

`[documented]`, and these are the most transferable strings in the file:

> **"Pro Tip**: Our database has an enormous number of food items. You may improve your search results by adding terms like **'uncooked,' 'cooked,' 'raw' or 'generic'** (for instance 'apple generic') if your initial search does not provide the specific item you are seeking."

> **"Bonus Pro Tip:** Create a **Saved Meal** or **Recipe** to join together items you normally eat together or are maybe too complex to search for every item each time you want to log."

The first teaches **query syntax for a crowdsourced database** — four disambiguating keywords and a worked example (`apple generic`). It is search-literacy content, surfacing the database's structure so the user can navigate its ambiguity. The second teaches **batching** as the escape from repeated entry: `Saved Meal` and `Recipe` are the two named composite objects.

**The friction reduction ladder, as the product itself sequences it** `[documented]`:

| Rung | Mechanism | Tier |
|---|---|---|
| 1 | Type and search | Free |
| 2 | Better search terms (`generic`, `raw`) | Free |
| 3 | `Saved Meal` / `Recipe` — batch the repeated | Free |
| 4 | `Barcode Scan` — read the package | Premium |
| 5 | `Voice Log` — speak it | Premium |
| 6 | `Meal Scan` — photograph it | Premium |
| 7 | `Multi-Day Logging` — log once for several days | Premium |
| 8 | Meal Planner auto-logging — never enter it | Premium+ |

**Eight named mechanisms for the same task, ordered by decreasing user effort, with the paywall between rungs 3 and 4.** As a map of a high-friction repeated task this is unusually complete, and it is legible only from the help IA — no marketing page presents it as a ladder.

**Paywall disclosure is handled cleanly** `[observed]`, inside the barcode article in italics:

> "*As of October 1, 2022, Barcode Scan is available only with a Premium subscription. Read more about this change here.*"

A **dated feature-removal notice with a link to the rationale**, retained in the article years later. Documenting the withdrawal of a previously-free capability rather than silently repricing it.

**Also flagged generally** `[documented]`: "*Available options vary based on app version or require a MyFitnessPal Premium subscription." An asterisked caveat on the logging-method picker itself.

**Other named fields across the Food Logging section** `[observed]`: water intake, `vitamins, medications, or supplements`, the time a food was logged, `Net Carbs`, natural vs processed sugar, custom meal names ("Can I change my meal names, or add more meals?"), and `Check Marked items`. The `How do I log a food that is not in the database?` article confirms user-generated database entry, with the barcode FAQ adding: "Our database is built by our community, so newer or regional products are sometimes missing. When that happens, you can add the food yourself using the nutrition label on the package. **Your entry is then saved for your future logs.**" — the effort of a database contribution repaid to the contributor first.

## T6 Status & state language

**`Net Calories` is the product's central state, and it is defined with an equation** `[observed]`:

> "We set your daily calorie goal in **Net Calories** which we define as:
> **Calories Consumed (Food) - Calories Burned (Exercise) = Net Calories**"

Then the mental model:

> "**Think of your Net Calories like a daily budget of calories to spend. You spend them by eating, and you earn more calories to eat by exercising.**"

**A financial metaphor applied to eating, in the product's own words: `budget`, `spend`, `earn`.** This is the most consequential sentence in the file and it is addressed directly in T14 — it is a genuinely effective comprehension device and it is also the mechanism by which exercise becomes a way to purchase food.

**Other named states** `[documented]`:
- `logging streak` / `log in day streak` / `login days in a row counter` — **three names for one counter** across two articles, with a dedicated fix article (`How to fix an incorrect streak`, `My login days in a row counter is incorrect. How do I fix this?`)
- `Complete This Entry` / `Finish logging for today` — the day-close action, two names
- `5-week projection` of weight change — the completion reward
- `Calorie Adjustment` and `Negative Calorie Adjustments` — device-sync states, each with an article
- `target date` — `Where can I find my target date?`
- `Check Marked items`
- `Today tab` — the home surface, with its own promoted article

**The streak is decoupled from the day-close action** `[observed]`, and stated plainly:

> "It is **not necessary** to complete your day in order to maintain your log in day streak. If you accidentally complete your day, you are able to continue to add items and complete it again."

Two anxieties defused in two sentences: the streak is not at risk, and the action is not irreversible.

**The projection is hedged three ways in one paragraph** `[observed]`:

> "offers a five-week projection of your weight change, using your current weight as a starting point, and assuming that each diary day for the next five weeks will be just like the day you are completing. Please note, **this is only an estimate used for motivational purposes**. Weight loss does vary for each individual. **Many users report that they have lost more weight than projected, while some lose less.**"

`assuming that each diary day … will be just like the day you are completing` states the model's absurd premise outright. `only an estimate used for motivational purposes` **names the copy's own persuasive function** — the product tells you the number exists to motivate you, not to predict you. And the final sentence bounds error in both directions. A three-layer hedge on a number the product generated to make you feel good.

**Timing instruction** `[observed]`: "We recommend using this feature only after you have logged all of your entries for the day, but **before midnight**. Completing your entry midway through the day may result in a warning message that you are eating too little." The article explains *why* the timing matters by naming the false-positive alert it triggers.

## T7 Error, failure & recovery

`[documented]`, from titles and bodies:

- `The barcode scanner is not working in the iOS app.`
- `How do I edit or change the item found by a barcode scan?`
- `My login days in a row counter is incorrect. How do I fix this?` / `How to fix an incorrect streak`
- `How can I force my calorie goals to update?`
- `Can I change my calorie goal without affecting my historical entries?`
- `How to delete an entry from your food diary`
- `I paid for a subscription, but I still don't have access…` (implied by the category structure)

**The barcode article's FAQ block is a model troubleshooting sequence** `[observed]` — four failure modes, each a question in the user's voice, each answered with physical or procedural remedy:

| Question | Remedy pattern |
|---|---|
| `The scanner is open, but it won't read my barcode. What can I try?` | Physical: brighter light, hold steady, flatten curved labels, whole barcode in frame, right side up. Then **fallback**: "If it still won't read, you can search for the food by name instead." |
| `The scan pulled up the wrong food. How do I fix it?` | "You can correct the match yourself." + deep link |
| `What if the product isn't in the database?` | Explains *why* (community-built), gives the workaround, states the payoff |
| `Can I scan barcodes on the MyFitnessPal website?` | Flat `No.`, with the reason (camera) and the alternative (search by name) |
| `My scanner still isn't working on my iPhone. Where should I look next?` | Escalation to a dedicated troubleshooting article |

**Every answer ends in a route forward.** Three of five explicitly name the fallback (`search for the food by name`). The sequence escalates: physical fix → self-correction → data gap → platform limit → escalate. And the first title contains `What can I try?` — offering attempts rather than promising a fix.

**`You can correct the match yourself`** — agency stated before the instruction.

**A self-aware caveat on a mis-diagnosis** `[observed]`: "If you feel your projection may be incorrect, we recommend first checking to see if you may have an **accidental weight entry**." The most likely cause of a wrong projection is a fat-fingered weigh-in, and the article says so first.

## T8 Empty states

`[absent]` — all behind auth.

Adjacent: `How do I log a food that is not in the database?` documents the no-results path, and the barcode FAQ documents the not-found path with a contribution route. The "no result" case is handled as a **content-contribution opportunity** rather than a dead end.

## T9 Notifications & system messages

`[documented]`, and the important ones are the alerts:

- **The under-eating warning.** Fires on diary completion below threshold, and its false-positive condition is documented (mid-day completion). The article does not quote the warning's text. `[absent]` for the string itself.
- **The carbohydrate alert** `[observed]`: "members will now be notified when their daily carbohydrate intake falls below **130g** or is comprised of **less than 35% of calories** from carbohydrate. The rationale for this is based on carbohydrate's role as the primary energy source for the brain and aligns with recommendations put forth by the IOM and Academy of Nutrition and Dietetics."

**An alert with a published threshold, a stated physiological rationale, and two named authorities.** MFP alerts on *under*-consumption of a macronutrient, which is the opposite direction to the category's default. Notable: it is a low-carb warning in a market saturated with low-carb dieting.

- `Negative Calorie Adjustments` — a sync-driven state that reduces the day's allowance, given its own article because it surprises people.
- `Check Marked items` — a diary annotation state.

## T10 Disclosures, legal & compliance

### The calorie floor — a self-imposed safety limit, published

**Stated in at least three places in near-identical wording** `[observed]`:

> "We do not recommend women consume fewer than **1200 calories** per day, or men fewer than **1500 calories** per day. **Eating too little can produce negative health effects.**"

> "Based on guidance from the National Institutes of Health and other experts and resources, **we do not calculate daily calorie goals of fewer than 1200 calories for women, or 1500 calories for men.**"

The distinction between the two matters. The first is advice. The second is a **product constraint** — the algorithm will not generate a goal below the floor regardless of what the user asks for. A refusal built into the system and disclosed in the help centre.

The change to the floor was announced with its source `[observed]`: "The National Institutes of Health indicates that eating plans of 1,500 calories for men, and 1,200 calories for women, are safe and effective in achieving weight loss. To align with these guidelines MyFitnessPal has implemented a separate calorie minimum for males of 1,500 calories per day. Previously, the minimum was 1,200 calories for both men and women." Linked directly to the NHLBI guidelines PDF.

**The floor is overridable, and the override is gated by a person** `[observed]`: "users with guidance from a **physician or registered dietitian** can customize their goals", and "If you are following a guided plan from your doctor or nutritionist, or if you have data you believe is more accurate than our estimated goals…". The escape hatch exists and is framed as requiring clinical direction — though the actual customisation is self-service, so the gate is rhetorical, not technical. Recorded as stated.

### The three-tier under-eating threshold — the clearest safety table in the corpus

`[observed]`, verbatim structure from the `Complete This Entry` article:

| Logged intake | System response |
|---|---|
| 1200+ cal (women) / 1500+ (men) | 5-week projected weight is calculated |
| 1000–1199 (women) / 1200–1499 (men) | 5-week projected weight is calculated **+ a message alerting the user to possible under-eating** |
| Under 1000 (women) / under 1200 (men) | **A message alerting the user to possible under-eating.** **Projected weight is not calculated** |

**At the lowest tier, the product withholds its own motivational reward.** The five-week projection is the dopamine payload of completing a diary day, and below 1,000 / 1,200 calories MyFitnessPal **refuses to show it**. Removing the reinforcement precisely where the behaviour is most concerning — rather than only adding a warning on top of it — is the strongest single wellbeing design decision observed in this batch.

Followed immediately by the signpost `[observed]`:

> "If you feel you may be suffering from an eating disorder we encourage you to seek help. More information, and links to international resources may be found here."

**The eating-disorder route is placed at the exact screen-state where the risk is measurable**, not buried in a safety page. Placement is the whole point.

### Eating Disorder Resources — the article

`[observed]`. Summarised rather than quoted at length, with the structural moves named.

**It opens by positioning the company against its own product logic:**

> "MyFitnessPal believes food should nourish and be enjoyed, however, we acknowledge that relationships with food are not always so simple."

Then a multi-causal framing — eating behaviours shaped by "biological, behavioral, emotional, psychological, interpersonal, and social influences" — which pre-empts a willpower reading.

**Structure, in order:**
1. `Struggling with Food or Exercise Issues?` — a **screening tool link first**, before any definitions. NEDA's free confidential screener, offered before the user has to self-identify with a diagnosis.
2. **`What Healthy Eating Looks Like`** — five bullets, placed *before* the problem list: eating a variety of foods; **"Enjoying food without guilt or anxiety"**; eating when physically hungry; eating until satisfied but not overly full; **"Enjoying treats and comfort foods on occasion"**.
3. `Signs of Problematic Eating` — five bullets covering under- *and* overeating, emotional eating, eating to discomfort, "Preoccupation or distress regarding weight and frequent comparison to others", and compensatory behaviours named explicitly including **"excessive exercise"**.
4. Four disorder types with plain-language descriptions and NEDA deep links: BED, AN, BN, EDNOS — with the note that "Disordered eating presents in many different ways."
5. `Seeking Help`, split into `For Yourself:` and `For a Friend or Family Member:` — **two distinct routes for two distinct readers**, the second with NEDA's toolkit and family network.
6. A US clinician-led helpline with the number in bold: `1-866-662-1235`.
7. Five US organisations, then **`Global Eating Disorder Support`** — 16 countries with named national bodies (Australia, Austria, Belgium, Brazil, Canada, Czech Republic, China/Hong Kong, Costa Rica, Germany, Greece, Ireland, Italy, Israel, Japan, Spain, UK).
8. A crowdsourcing ask: "**Help us grow our list!** If you know of an eating disorder organization in a country not listed here, please contact support@myfitnesspal.com".
9. A cross-link: "If you or someone you know are having thoughts of **self-harm or suicide**, please visit our resource page".

**Four things worth naming as craft.**

- **Positive-first ordering.** `What Healthy Eating Looks Like` precedes `Signs of Problematic Eating`. The reader gets a non-pathologising reference point before a checklist they might match against themselves.
- **"Enjoying food without guilt or anxiety"** as a criterion of health, in a calorie-tracking product's own help centre.
- **`excessive exercise` named as a compensatory behaviour** — in an app that converts exercise into extra calories to eat (T6). The article names as a warning sign the behaviour the product's core mechanic rewards.
- **A geographically distributed resource list, maintained by user contribution.** Eighteen countries is not a legal minimum; it is an operational commitment.

**Two flags, recorded factually.** The `Dietary Guidelines for Americans 2010` is cited throughout the nutrition-goals article and several of its links resolve to `health.gov` paths for a **2010 edition**; the article itself is dated `August 30, 2019`. The macronutrient and micronutrient targets a current user receives are documented against guidelines two revisions old, and the disclosure page has not been updated. Separately, the goals article dated `September 17, 2021` asserts: "**our millions of users have demonstrated these goals are accurate enough to provide positive results for almost anyone**" — an efficacy claim sourced to aggregate user behaviour rather than to any study, immediately followed by a link to "real member success stories". Both recorded as observed, with no inference about intent.

### Subscription, pricing and cancellation

**Pricing is fully public** `[observed]` — the only product in this batch where it is:

| Tier | Annual | Monthly |
|---|---|---|
| `Premium` | `$79.99` / `$6.67/mo` | not shown |
| `Premium+` | `$99.99 billed annually` / `$8.34/mo.` | `$24.99/mo.` |

`Save 67%` on the Premium+ annual card. Note the monthly-to-annual ratio: $24.99 × 12 = $299.88 against $99.99. The 67% saving is real and is stated.

**Cancellation wording is explicit and appears across four Q&A answers** `[observed]`:

> "Yes! If you've never used MyFitnessPal or if you've never redeemed a trial before, you are eligible for a **7-day free trial**."

> "The first Premium+ subscription charge on your credit card will take place **at the end of your trial unless you cancel before then**. You may cancel in the **Settings menu, in the App Store or in Google Play, depending on where you signed up**."

> "Once the trial ends, your subscription will **auto-renew unless you cancel**. **Cancel before the next renewal date** to avoid being charged for the upcoming billing cycle."

> "You may cancel your recurring subscription **at any time**. When you cancel, **you are canceling the next billing charge**—Premium+ features will remain available to you until the end of your current paid subscription period."

**Five disclosure elements present:** trial eligibility conditions, the charge trigger, **three named cancellation venues**, the auto-renew statement, the deadline rule, and — the best line — **what cancelling actually does**. "you are canceling the next billing charge" corrects the common misreading that cancelling ends access immediately, and states that access persists to period end. That single clause prevents both the "I cancelled and lost my remaining month" complaint and the "I cancelled but was still charged" complaint.

**Naming all three cancellation venues** (in-app Settings, App Store, Google Play) with the qualifier "depending on where you signed up" is the detail most subscription products omit, and it is the one that actually determines whether a user can cancel.

**Availability limits disclosed** `[observed]`: Meal Planner in six countries (`United States, United Kingdom, Canada, Ireland, New Zealand, and Australia`); grocery integrations **US only**; named partners per platform — iOS: `Instacart, Walmart, Kroger, Amazon Fresh, Whole Foods`; Android: `Instacart, Walmart`. Closed with "We will update this list as more grocery integrations become available."

**Ten named diet presets** `[observed]`: `low-carb, vegetarian, paleo, balanced, pescatarian, flexitarian, keto, Mediterranean, whole-food focus, and vegan`.

**Condition-specific goal articles exist** `[observed]`: `If I am pregnant, how do I adjust my goals?` · `If I am breastfeeding or nursing, how do I adjust my goals?` · `How do I adjust my goals for my nutritional or health needs (e.g., diabetes)`. Three life-stage/clinical states given their own articles — pregnancy and lactation being the two states where a deficit goal is actively harmful.

## T11 Help-centre architecture

Three levels: 11 categories → sections → articles. Zendesk.

**Article-title grammar — five shapes** `[observed]`:

| Shape | Example |
|---|---|
| `How do I …?` / `How does …?` | `How do I add a food to my food diary?` · `How does MyFitnessPal calculate my initial goals?` |
| `Can I …?` | `Can I track Net Carbs?` · `Can I change my meal names, or add more meals?` · `Can I change my calorie goal without affecting my historical entries?` |
| `How to <verb>` | `How to use the Barcode Scanner` · `How to fix an incorrect streak` · `How to delete an entry from your food diary` |
| `If I am <state>, how do I …?` | `If I am pregnant, how do I adjust my goals?` |
| Noun / topic | `Eating Disorder Resources` · `Negative Calorie Adjustments` · `Nutrition 101: Calories` · `Your Today tab` |

The **`If I am <state>, …`** shape is distinctive and good: the condition comes first, so a pregnant user scanning the list matches on the first three words.

The `Nutrition 101: <topic>` series (`Calories`, `Protein`, `Carbohydrates`, `Fats`, `Vitamins & Minerals`) is a **numbered-course naming convention inside a help centre** — consistent, sequenceable, and signalling education rather than support.

**Every article carries** `[observed]`: a breadcrumb, an `Articles in this section` sidebar, a dateline (`September 17, 2021 22:26 Updated` — date, time, and the word `Updated`), social share links, `Was this article helpful?` with **visible vote counts**, `Have more questions? Submit a request`, `Return to top`, and `Related articles`.

**The vote counts are public and unflattering** `[observed]`: `654 out of 863 found this helpful` (goals) · `933 out of 1807 found this helpful` (add food — 52%) · `72 out of 146` (complete entry — 49%) · `185 out of 286` (nutrition goals — 65%) · `370 out of 545` (barcode — 68%) · `26 out of 30` (eating disorder resources — 87%).

**Publishing raw helpfulness ratios, including two near 50%, is unusual transparency.** It also identifies the weakest articles precisely: the two most-voted articles (add food, complete entry) are the two lowest-rated, and both are core-task articles. The highest-rated article by ratio is the eating-disorder one.

**Dateline spread is wide** `[observed]`: `August 30, 2019` (nutrition goals) · `September 17, 2021` (initial goals) · `June 18, 2024` (complete entry) · `July 14, 2024` (ED resources) · `August 06, 2025` (add food) · `September 03, 2026` (barcode). A seven-year spread across the core task set, all dated and visible.

## T12 FAQs

**Premium page Q&A — eight answers, questions not rendered** `[observed]`

The `/premium` page's Q&A block renders answers without their questions in server HTML. The questions are reconstructable from the answers but **are not reproduced here as verbatim strings because they were not observed.** The eight answer topics, in order: trial eligibility · when the first charge occurs and where to cancel · auto-renewal and cancellation deadline · what cancelling does to access · whether Meal Planner integrates with the food diary · the ten diet presets · Meal Planner country availability · where to find Meal Planner (`the "Plan" tab at the bottom of your home screen`) · which grocery apps sync per platform.

**Ordering note:** four of the first four answers are about billing and cancellation. On a page selling a subscription, more than half the FAQ is devoted to how to stop paying.

**Barcode article FAQ — five questions, verbatim** `[observed]`, listed in T7. All five are in the user's voice; three of five are failure states.

## T13 Terminology & glossary

| Term | MFP's usage | The alternative it rejected |
|---|---|---|
| `Net Calories` | The central defined state, with an equation | "calories remaining", "daily total" |
| `budget` / `spend` / `earn` | The mental model for Net Calories | "allowance", "target" |
| `Diary` / `Food Diary` | The log object, capitalised | "log", "journal", "tracker" |
| `Complete This Entry` / `Finish logging for today` | The day-close action — **two names** | — |
| `logging streak` / `log in day streak` / `login days in a row counter` | The habit counter — **three names** | — |
| `Saved Meal` / `Recipe` | Two named composite food objects | "favourites", "combos" |
| `Barcode Scan` / `Scan a Barcode` | The scanner — **two labels** | — |
| `Meal Scan` | Photo logging | "photo log", "snap" |
| `Voice Log` | Speech logging | "dictate" |
| `Multi-Day Logging` | Log once for several days | "repeat" |
| `Calorie Adjustment` / `Negative Calorie Adjustment` | Device-sync goal changes | "sync correction" |
| `PAL` (Physical Activity Level) | Expanded on first use, then abbreviated | "activity level" |
| `EER` (estimated energy requirement) | Expanded then abbreviated | "calorie needs" |
| `Net Carbs` | Optional tracked value | — |
| `Check Marked items` | A diary annotation state | — |
| `target date` | Projected goal-achievement date | "goal date" |
| `Nutrition 101` | The educational article series | "learn", "guides" |
| `member` | Used in the nutrition-goals letter ("MyFitnessPal members") | `user` (used elsewhere) |
| `Premium` / `Premium+` | Two paid tiers | "Plus"/"Pro" |
| `disordered eating` | Used alongside `eating disorder` | — |

**Three naming inconsistencies on core objects** — the day-close action (two names), the streak (three), the scanner (two). All three are in the *most repeated* interactions in the product. The help centre absorbs the inconsistency by putting both labels in article titles, which is a pragmatic mitigation and a visible symptom.

**`member` vs `user`** splits by register: `member` in the nutrition-guidelines letter (signed "The MyFitnessPal Team"), `user` in procedural articles.

**Abbreviation discipline is good**: `PAL` and `EER` are both expanded parenthetically on first use before being used bare — better handling than Nike gives `PR`.

## T14 Voice, tone & accessibility

### Two voices, visibly from two eras

**The support centre contains at least two distinct authorial registers, separable by dateline.** `[observed]`

**Older register (2019–2021)** — explanatory, dense, second-person-plural-institutional:

> "Because your daily calorie goal already accounts for your intent to gain or lose weight at a particular rate, you can achieve your goal by eating the specified number of calories per day, with no additional exercise required."

Long sentences, subordinate clauses, no contractions, no reader address beyond `you`. The 2019 nutrition letter is formally a **letter**, opening "From time to time, in response to the latest research and government recommendations…" and closing "We wish you the best in the pursuit of your health and fitness goals! **The MyFitnessPal Team**".

**Newer register (2025–2026)** — conversational, empathetic, short:

> "Some days, typing out every food feels like a lot. That's what Barcode Scan is for. Point your camera at the barcode on a package, and MyFitnessPal pulls up the nutrition info for you. **Fewer taps, more time actually eating your lunch.**"

Three short sentences and a fragment. It opens by **naming the user's fatigue** rather than the feature. `Fewer taps, more time actually eating your lunch` — a parallel-structure fragment ending on something concrete and unglamorous. The word `actually` is doing tonal work: it acknowledges that logging has been competing with eating.

**This is a visible voice migration**, datable to between 2024 and 2026, moving from institutional-explanatory to empathetic-concise. The barcode article (Sept 2026) is the clearest specimen; the goals articles (2019–21) the clearest counter-specimen. Both are live simultaneously.

**Register discipline between marketing and support is strong**: four exclamation marks on `/premium`, zero in the help articles. The support voice is calm even in the newer, warmer register.

### The budget metaphor — recorded factually, both directions

**`Think of your Net Calories like a daily budget of calories to spend. You spend them by eating, and you earn more calories to eat by exercising.`**

**As a comprehension device it works.** It is concrete, familiar, and it correctly conveys the arithmetic — consumption draws down, exercise replenishes. A user who has never encountered energy balance understands it in one sentence.

**As framing, it has consequences that the product's own safety content identifies.** The metaphor makes eating a withdrawal and exercise a deposit. `earn more calories to eat by exercising` establishes exercise as the mechanism by which food is purchased. The Eating Disorder Resources article, in the same help centre, lists **"excessive exercise"** among the "Inappropriate behaviors to compensate for eating", alongside self-induced vomiting and laxative misuse.

**Recording this as the observed content finding it is: MyFitnessPal's goal-setting article and its eating-disorder article describe the same behaviour — exercising to offset food — in opposite terms.** The first calls it earning; the second lists it as a compensatory behaviour. Both are published, both are current, and nothing in either cross-references the other. This is a factual observation about two live pieces of copy, not an assertion about the product's effect on any user.

### Where copy could reinforce restrictive behaviour, and where it is mitigated

Set out evidentially, as instructed.

**Copy that could reinforce restriction** `[observed]`:
- The `budget` / `spend` / `earn` frame (above), and specifically `you will be able to eat more for that day` as the reward for exercise.
- The worked example in the goals article: "if your Net Calorie goal is 2000 calories, one way to meet that goal is to eat 2,500 calories of food, but then burn 500 calories through exercise." A neutral arithmetic illustration that models compensatory exercise as a method.
- The **five-week weight projection** as the reward for completing a diary day — a forward-looking weight number generated daily, from a single day's intake.
- The **streak counter**, with three names and a dedicated repair article, indicating it is both prominent and emotionally weighted enough that users escalate when it breaks.
- The efficacy claim "accurate enough to provide positive results for almost anyone", sourced to user aggregates.
- `Premium+` marketing framing: `Go further, faster`.

**Mitigations present in the product, all disclosed** `[observed]`:
- A **hard algorithmic calorie floor** (1,200 / 1,500) that the system will not calculate below.
- The explicit warning **"Eating too little can produce negative health effects"**, repeated.
- A **three-tier alert ladder** with a message at the middle tier and **withdrawal of the motivational projection** at the lowest tier.
- An **eating-disorder signpost placed at the threshold screen**, not only on a safety page.
- A **standing Eating Disorder Resources article** with a screener-first structure, a positive-eating section preceding the symptom list, `excessive exercise` named as a warning sign, a clinician-led helpline, 18 countries of resources, and a separate self-harm/suicide cross-link.
- A **carbohydrate under-consumption alert** at 130g / 35%, with published rationale.
- The projection hedged three ways, including naming its own motivational purpose.
- The streak explicitly decoupled from the day-close action.
- Condition-specific goal articles for pregnancy, breastfeeding and clinical needs.
- Goal customisation framed as requiring physician or dietitian guidance.

**The observation, stated factually:** the mitigations are real, specific, and in several cases unusually well designed — the lowest-tier withholding of the projection in particular. They are also located almost entirely in the **help centre**, while the reinforcing frames are located in the **product's core state vocabulary and daily interaction**. A user encounters `Net Calories` and the streak every day; they encounter the Eating Disorder Resources article only if an alert fires or they go looking. That distribution is what it is; no claim is made here about its effect.

### Craft notes

**Person.** Second person for the user, first-person plural for the company, used for decisions and limits alike (`we do not calculate`, `We recommend`, `we acknowledge`, `we have updated`, `We will continue to stay abreast`).

**Reasoning is shown, consistently.** The strongest habit in MFP's help copy is that it explains *why* before or alongside *how*: why the PAL excludes workouts, why the carb alert exists, why the barcode database has gaps, why the projection may be wrong, why goal weight does not affect calories. The 2019 guidelines letter cites eight external sources inline for a change to default settings.

**Citations in consumer support copy** `[observed]`: NIH/NHLBI, Institute of Medicine (two papers), AJCN (two), Dietary Guidelines for Americans, FDA, Academy of Nutrition and Dietetics, plus a PDF. Academic citation applied to a settings-change announcement.

**Pro Tip / Bonus Pro Tip** as a labelled convention for optional expertise, separating must-know from nice-to-know within an article.

**Parenthetical pre-emption** is a recurring micro-pattern: `(not MyFitnessPal settings)`, `(for instance 'apple generic')`, `(which should not be included in your initial activity level)`, `(Breakfast, Lunch, Dinner)`. Short parentheticals that head off the specific wrong turn.

**Bold used for UI object names** in procedural steps (`**Barcode Scan**`, `**Log**`, `**plus (+)**`) — consistent and scannable.

**Accessibility** `[observed]`

- `Skip to main content` present on every support page.
- **No accessibility statement was found.** `[absent]` Not in the support footer, not in `Terms of Use and Privacy Policy`, not as a category. Unlike Flo (statement published) and Nike (programme page plus 35 localised statements), and like Clue (none found).
- **Support-article images are the significant failure.** Screenshots carry filename-derived alt: `IMG_4229.png`, `IMG_4230.png`, `FAQ images (7).png`, `FAQ images (8).png`, `Untitled design (10).png`, `306852`. **The procedural articles that teach the core logging flow illustrate their steps with images that are unreadable to a screen-reader user.** Mitigated — genuinely — by the fact that every step is also written out in text, so the images are supplementary rather than load-bearing. Recorded as a defect with its mitigation.
- `/premium` alt text is by contrast **excellent and unusually long**: "View of the meal planning tool in the MyFitnessPal app, with features to create a meal plan, customize a meal plan, and see today's meals. For example, a bowl of yogurt, granola, and almond butter for breakfast and a chickpea taco with avocado and lime for lunch." · "A phone scanning the barcode of a packed food, taken from the point of view of the user." · "Smiling woman speaking into a phone with soundwave graphics, representing voice-based food logging." Descriptive, purposeful, and it names what the image *represents*.
- The comparison matrix uses **full-sentence per-cell alt text** for its tick/cross icons — `Meal planner not included with Premium` / `Meal planner included with Premium Plus`. Every cell of a feature matrix given an unambiguous accessible name rather than a bare ✓/✗. **This is the best accessibility detail found in the batch** and it is on a pricing table, which is exactly where ambiguity costs money.
- `Was this article helpful?` uses text `Yes` / `No`.
- Support centre serves 20 languages.

**Negative findings, recorded honestly**
- Root marketing page returns an empty body — blocked, and the primary consumer surface is unassessed.
- No accessibility statement found.
- Filename alt text throughout the support centre's procedural screenshots.
- Three naming inconsistencies on the most-repeated objects (streak ×3, day-close ×2, scanner ×2).
- `Dietary Guidelines for Americans 2010` cited as current in a live goals-disclosure article.
- "accurate enough to provide positive results for almost anyone" — efficacy claim without a study.
- Two live voices from different eras across core help content.
- Published helpfulness ratios of 49% and 52% on the two core-task articles.
- Premium-page Q&A renders answers without questions in server HTML.

---

## Transferable patterns

1. **Refuse to compute below a safety floor, and publish the refusal.** "we do not calculate daily calorie goals of fewer than 1200 calories for women, or 1500 for men." A constraint in the algorithm, disclosed in the help centre, with the source cited and the override path named. Transfers to any product where a user can request a self-harmful configuration — affordability limits, trading leverage, sleep targets.
2. **Withhold the reward, not just add the warning.** Below the lowest threshold, the five-week projection is **not calculated**. Removing the positive reinforcement at the concerning boundary is stronger than layering a caution on top of it, and few products do it. The single most reusable safety-design idea in this batch.
3. **Put the crisis signpost at the threshold screen.** The eating-disorder link sits in the article describing the alert, at the state where risk is measurable — not only on a standalone safety page nobody navigates to.
4. **Positive-definition before symptom list.** `What Healthy Eating Looks Like` precedes `Signs of Problematic Eating`, and includes "Enjoying food without guilt or anxiety". Give the reader a non-pathologising reference point before a checklist they will measure themselves against.
5. **Two routes in one support article: `For Yourself:` / `For a Friend or Family Member:`.** Different reader, different need, same page. Applies to any support content where a third party may be the one seeking help.
6. **State what cancelling actually does.** "you are canceling the next billing charge—Premium+ features will remain available to you until the end of your current paid subscription period." One sentence that prevents two opposite complaints. Plus: name **all** cancellation venues, with the qualifier for which applies.
7. **Teach search syntax for an imperfect database.** "adding terms like 'uncooked,' 'cooked,' 'raw' or 'generic' (for instance 'apple generic')." Where the corpus is crowdsourced and ambiguous, surface the disambiguation vocabulary instead of promising perfect results.
8. **Disclose that a collected field does not do what users assume.** "Your goal weight does not affect your initial calorie calculations." Correcting a false mental model about your own form is cheap and builds more trust than the field's presence costs.
9. **Full-sentence alt text on every cell of a feature-comparison matrix.** `Meal planner not included with Premium` rather than a bare ✗. Pricing tables are where icon ambiguity has a price.
10. **Negative pattern to learn from: metaphors have downstream cost.** `budget` / `spend` / `earn` is an effective comprehension device whose implications the same help centre later has to name as a warning sign. Before adopting a domain metaphor, check what behaviour it licenses — and whether your own safety content already lists that behaviour.

## Caveats & gaps

- **The primary marketing page is blocked.** `myfitnesspal.com/` and `/en` returned empty bodies to fetch. The hero, nav, footer, core value proposition and the free-tier positioning are **unobserved**. T1 and T2 rest on `/premium` and the support centre, which means this file sees the product through its upsell and its help desk, not its front door. A browser-rendered pass is needed.
- **No app data was entered and no account was created.** All flows are `[documented]` from help articles. The UI strings quoted are those the help articles themselves quote.
- **Alert strings unobserved.** The under-eating message, the carbohydrate notification and the streak messaging are described but never quoted by the articles; **no alert text is reproduced or reconstructed here.** These are the strings that matter most for the wellbeing analysis and they remain the largest gap in the file.
- **Premium-page FAQ questions not observed.** Only the answers render in server HTML; the questions are summarised in T12 and not quoted.
- **The Eating Disorder Resources article is summarised, not quoted at length**, per the corpus quotation rules. Short criterion phrases are quoted; the disorder descriptions and resource text are paraphrased.
- **Guideline-currency observation is from linked URLs and the article dateline**, not from a comparison of MFP's actual in-product targets against current guidance. What is recorded is that the *disclosure page* cites a 2010 edition.
- **The exercise/compensation observation is a comparison of two published MFP articles**, recorded factually. No claim is made here about the product's effect on any user, and none should be read into it.
- **Seven pages only**, and four of them are in one support section. `Food and Exercise Logging` (16+ articles), `Progress Tracking and Insights`, `Community and Social Features`, `Terms of Use and Privacy Policy` and the `GLP-1 Support` and `Nutrition Coach` announcements are unharvested. `GLP-1 Support` and `Nutrition Coach` are the two highest-value unopened articles — the first for its handling of a medication context, the second for its AI disclosure.
- **No privacy policy or terms opened.** Data handling for food, weight and body-measurement logs is entirely unassessed, which is a notable gap given the sensitivity of weight data and the presence of a `Community and Social Features` category.
- **No accessibility statement found** after checking the support footer and the `Terms of Use and Privacy Policy` category. Reported as an absence across the pages inspected.
- **en-US only.** The support centre serves 20 languages; the calorie-floor figures and the country-specific resource list are US-anchored and the localised variants are unassessed.

## Sources

1. https://www.myfitnesspal.com/ (**blocked — empty body**)
2. https://www.myfitnesspal.com/en (**blocked — empty body**)
3. https://www.myfitnesspal.com/premium
4. https://support.myfitnesspal.com/hc/en-us
5. https://support.myfitnesspal.com/hc/en-us/categories/360002205332-Goal-Setting-and-Nutrition-101
6. https://support.myfitnesspal.com/hc/en-us/articles/360032625391-How-does-MyFitnessPal-calculate-my-initial-goals
7. https://support.myfitnesspal.com/hc/en-us/articles/360032626031-A-Message-about-MyFitnessPal-s-updated-nutrition-goals
8. https://support.myfitnesspal.com/hc/en-us/articles/360032624131-How-does-the-Complete-This-Entry-or-Finish-logging-for-today-feature-work
9. https://support.myfitnesspal.com/hc/en-us/articles/360032625071-Eating-Disorder-Resources
10. https://support.myfitnesspal.com/hc/en-us/articles/360032274592-How-do-I-add-a-food-to-my-food-diary
11. https://support.myfitnesspal.com/hc/en-us/articles/360032624771-How-to-use-the-Barcode-Scanner
