# 177. Typeform

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Conversational form builder (one-question-at-a-time), now repositioned as AI forms + GTM automation |
| Primary URL | https://www.typeform.com/ |
| Corpus rank | 177 |
| Benchmark strength (source list) | Conversational form content |
| Locale / market observed | en-US (help centre offers `Español` and `Français`) |
| Platform observed | Web (marketing, pricing, Zendesk help centre, Atlassian status page) |
| Regulatory posture | GDPR named as a built-in feature; HIPAA compliance gated to Enterprise; US/EU data-centre choice offered as a plan feature. No financial regulator. |
| Auth state | Unauthenticated public surfaces only. **No form was submitted.** |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — pricing page is a Webflow build whose price digits are split across DOM lines by an animated counter, and whose comparison-table checkmarks are identical unlabelled images, so per-plan feature mapping could not be read reliably. The page also carries unreplaced placeholder text and two mutually contradictory price sets (see T10 and T14). Marketing `/forms` product page failed to fetch (timeout). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.typeform.com/ | Hero, three-pillar ASK/ACT/LEARN structure, nav IA |
| Pricing | https://www.typeform.com/pricing | Plans, response limits, 9-section comparison table, add-ons |
| Help centre home | https://help.typeform.com/hc/en-us | Three-category entry, trending topics |
| Help: Getting started (category) | https://help.typeform.com/hc/en-us/categories/360001979032 | Two sections |
| Help: Typeform basics (section) | https://help.typeform.com/hc/en-us/sections/37272561379476-Typeform-basics | 26 article titles — the task-phrasing goldmine |
| Help: Question types | https://help.typeform.com/hc/en-us/articles/360051789692-Question-types | **Primary T5/T13 source. 31 named question types.** |
| Help: A Typeform glossary | https://help.typeform.com/hc/en-us/articles/360061281111-A-Typeform-glossary | Published product-vocabulary standard |
| Help: FAQ | https://help.typeform.com/hc/en-us/articles/360029423551-FAQ | 22 questions, answers present |
| Help: Response limits | https://help.typeform.com/hc/en-us/articles/360040197372-Response-limits | Limit-breach behaviour and state name |
| Help: Average completion rate | https://help.typeform.com/hc/en-us/articles/360029615911-... | **The published rationale for one-question-at-a-time** |
| Status | https://status.typeform.com | 30 named components, scheduled-maintenance copy |

---

## T1 Navigation & IA labels

**Global nav — four items, three of which open large panels** `[observed]`

`Platform` · `Solutions` · `Resources` · `Pricing` · `Log in` · `Contact sales` · `Sign up`

**Three CTAs in the nav bar** (`Log in`, `Contact sales`, `Sign up`) is unusual — most products ship two. `Contact sales` between the two self-serve actions signals a product that has grown a sales motion on top of a PLG motion and has not resolved which is primary.

**Platform panel — two sub-groupings with a hard conceptual split** `[observed]`

| `Platform` (capability) | `Tools` (artefact) |
|---|---|
| `Platform overview` — "What is Typeform?" | `Form builder` |
| `Typeform AI` — "Your AI know-pilot" | `Survey maker` |
| `Typeform MCP` — "Use Typeform from your AI tools" | `Quiz maker` |
| `Growth Flow` — "Automated workflows for GTM teams" | `Test maker` |
| `Research Flow` — "AI-moderated research studies" | `Poll builder` |
| `Contacts & Automations` | `Application form builder` |
| `Video engagement` — "Interactive video forms" | `Landing page builder` |
| `Analytics and reporting` — "Answers you can act on" | `NPS form builder` |
| `Integrations` — "Connect all your apps" | `Registration form builder` |
| | `Short form builder` |

The right column is a **noun-taxonomy of the artefact the user wants to make**, and it is ten entries deep — `Form builder`, `Survey maker`, `Quiz maker`, `Test maker`, `Poll builder`. Note the suffix is not consistent: `builder` five times, `maker` four times, with no discernible rule (`Survey maker` but `Form builder`; `Quiz maker` but `Poll builder`). This is SEO landing-page inventory surfaced as navigation, and the inconsistency is the tell.

The left column is capability-and-product-name and reads entirely differently. `Your AI know-pilot` is a coined portmanteau (know + copilot) used as a nav description — the only piece of wordplay in the whole IA.

**Solutions panel — three axes** `[observed]`: `TEAMS` (`Marketing`, `Product`, `Human resources`, `Customer success`) · `USE CASES` (`Lead generation`, `Employee onboarding`, `Employee satisfaction`, `Employee engagement`, `Customer feedback`) · `Plans` (`Core`, `Growth`, `Research Flow`, `Talent`, `Enterprise`).

**Putting `Plans` inside `Solutions` rather than inside `Pricing` is the notable IA decision**, and it reveals that Typeform now has five plan *families*, not one ladder. Each carries an audience gloss: `Core` — "Plans for everyone" · `Growth` — "Plans for GTM teams" · `Research Flow` — "Plans for research teams" · `Talent` — "Plans for HR and people teams" · `Enterprise` — "Plans for larger orgs".

**Help-centre top level — only three entries** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting started` | "Explore all our articles to learn how to use Typeform, from getting started to using advanced features." |
| `Use cases` | "Learn how to make the most of Typeform with guides tailored to your use case." |
| `How to videos` | "More of a visual learner? Browse our library of how-to videos." |

Each ends with a `See all` link. **A three-category help centre is radically flatter than Framer's sixteen or Wise's six**, and the first category's scope line is self-defeating: "Explore all our articles… from getting started to using advanced features" means `Getting started` is not actually a getting-started category, it is everything. The user cannot self-route on this.

Typeform compensates with a `Trending topics` block — "Here's what other people are finding most useful right now" — which is **social routing rather than structural routing**. Six current items, including a workshop promotion and the changelog. This is a defensible pattern for a product that ships fast, and a poor substitute for an IA.

**Help-centre secondary nav** `[observed]`: `Back to website` · `Community` · `Pricing` · `Changelog` · `Submit a request` · `Sign in`. Note `Sign in` here vs `Log in` in the main site nav — **two labels for the same action across two surfaces**, the same defect Wise has.

**Breadcrumbs are three deep and consistent** `[observed]`: `Help Center` › `Getting started` › `Typeform basics` › article.

**Footer groupings** `[observed]`: `PRODUCT` · `Templates` · `Integrations` · `Resources` · `Get to know us`. Under `Resources`: `Blog`, `Guides`, `Help center`, `Community`, `Tutorials`, `FAQs`, `Why Typeform?`, `Referral program`, `Partners`, `System status`, `Developers / API`. `Why Typeform?` expands only to two competitor-comparison blog posts (`Typeform vs Jotform`, `Typeform vs Formstack`) — a persuasion slot disguised as a resource.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Eyebrow: `AI forms & automation`
> Headline: `Your favorite forms.  Now with AI automation.`
> Subhead: "Combine AI forms and automated workflows to drive revenue growth. Run in-depth research and manage the entire customer lifecycle. All in Typeform."

The headline is a **continuity-plus-addition construction**: sentence one reassures the existing user that the thing they liked is intact, sentence two names what changed. Two fragments, both terminated with full stops. For a product repositioning itself, this is the correct move — and note the possessive `Your favorite forms` claims an emotional relationship before claiming a capability.

**The three-pillar structure is the strongest piece of IA writing on the site** `[observed]`

| Verb label | Product name | One-line |
|---|---|---|
| `ASK` | `Intelligent Forms` | "Build forms that adapt to every respondent and then analyze your data for rich insights." |
| `ACT` | `Growth Flow` | "Convert and keep customers with automated AI segmentation and follow-ups." |
| `LEARN` | `Research Flow` | "Make confident business decisions fast with AI-moderated studies and automated reports." |

Three all-caps single verbs — `ASK` / `ACT` / `LEARN` — as the top-level organising label, each paired with a product name and a benefit sentence. The verbs are not in chronological order of use (you learn last but Research Flow is a separate purchase), so the triad is **mnemonic rather than procedural**. It works because each verb is one syllable and none overlaps.

**Section headers use one recurring device: the sentence that continues into the next section** `[observed]`

> `When the form ends, the flow begins...`

This transition header, with its ellipsis, sits between the forms section and the Growth Flow section and does the entire job of explaining why a form company now sells automation. It is the single most efficient sentence on the page.

**Other headlines** `[observed]`: `Build forms at the drop of a prompt` (a pun on "at the drop of a hat") · `Be proactive with customer data` · `Run fast research, moderated by AI` · `Join 150,000+ businesses driving revenue with Typeform` · `Integrate with your tech stack` · `AI forms and automation.  All in Typeform.`

**Benefit-block pattern: two-word title-case label + two-sentence explanation** `[observed]`

`High Response Rate` · `Deeper Insights` · `Advanced Analytics` · `Instant Lead Capture` · `Data Enrichment` · `Customer Engagement` · `Fast Insights` · `Qualitative & Quantitative` · `Verified Panel Recruitment`

Nine blocks, all two-or-three-word Title Case noun phrases. Compare Wise's adjective-plus-mechanism (`Low fees` — "fees get cheaper the more you send"); Typeform's are all nouns and therefore flatter.

**The one benefit block that carries the actual thesis** `[observed]`:

> `High Response Rate` — "Build forms people actually fill out with beautiful design and conversational logic that adapts to every response, doubling the completion rate vs. traditional forms."

`forms people actually fill out` is the whole proposition in six words, and `doubling the completion rate vs. traditional forms` is the quantified claim. Note this is a **relative claim with an unnamed comparator** — "traditional forms" is not defined, and unlike the help centre's `47%` figure (T5), no absolute is given. **The marketing claim and the help-centre claim are not reconciled anywhere.**

**Meta-description claim** `[observed]`: "Build AI-powered forms that get 3.5x more data". A third quantified claim (`3.5x more data`) with a third unnamed baseline, alongside `48 million responses collected monthly`.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Nav (×2), inline | |
| `Log in` | Nav | |
| `Contact sales` | Nav, Enterprise section, Research Flow, add-on custom tier | |
| `Contact sales→` | Pricing, Enterprise tile | **Arrow glued to the word, no space** |
| `Get started—it's free` | Hero, final CTA | Em-dash, lowercase after it |
| `Get Talent` / `Get Basic` / `Get Plus` / `Get Business` | Pricing cards and compare-table headers | `Get <PlanName>` frame, applied consistently |
| `Get add-on` | Contacts & Automations tiers | Same frame, generic object |
| `Try free for 14 days` | Growth Flow card | The only trial CTA |
| `See all features` | Each pricing card (×4), anchors to `#compare` | |
| `See Talent plan details` | Cross-sell line under the grid | |
| `View features by plan` | Compare-table control | |
| `Explore forms` / `Explore Growth Flow` / `Explore Research Flow` | Home, per pillar | `Explore <ProductName>` frame |
| `Take a tour` | Contacts & Automations | |
| `Learn more` | Contacts & Automations, Research Flow | Bare `Learn more`, twice |
| `Learn more →` | Nav panel, Research Flow promo | Arrow variant |
| `Choose one →` | Nav, templates promo | |
| `Browse blog →` | Nav, blog promo | |
| `View all use cases →` | Nav | |
| `View integrations` / `See all integrations` | Home / pricing | **Two labels, same destination** |
| `Read all customer stories` | Home | |
| `Skip to main content` | First in DOM | Accessibility |
| `Submit a request` | Help centre nav and every article foot | |
| `Contact support` | Help centre, below `Can't find what you're looking for?` | |
| `Find answers` | Help centre, below `Tap into our community knowledge` | Community routed *before* support |
| `Enterprise only` | Pricing table cell value (×4) | A gate rendered as a link |
| `Get updates` / `Subscribe` | Status page | |

**The `Get <PlanName>` frame is the cleanest CTA system in this batch.** `Get Basic`, `Get Plus`, `Get Business`, `Get Talent`, `Get add-on` — one verb, object varies, applied at both the card and the comparison-table header so a user scrolling the long table never loses the action. Compare Framer's `Start with Basic` / `Request Trial` mixture.

**Routing order at the foot of every help article** `[observed]`: `Was this article helpful?` → `Have more questions? Submit a request` → `Related articles` → `Tap into our community knowledge / Find answers` → `Can't find what you're looking for? / Contact support`.

Two contact routes (`Submit a request` and `Contact support`) both resolve to the Zendesk new-request form, presented at two different points under two different labels with two different framing questions. **Same action, two labels, one page** — recorded as a defect, though the duplication is arguably deliberate (top-of-fold and bottom-of-page).

**Gated-support disclosure in the CTA area** `[observed]`, help centre home: "Feel free to contact us or ask the Community. Got a Business or Enterprise plan? Log in to use Live Chat." The support channel available to you is disclosed at the point of asking, with the plan gate named. Honest, and better than discovering the gate inside the chat widget.

## T4 Onboarding & getting-started

**There is no numbered how-it-works on the home page.** `[absent]` As with Framer, the AI prompt has displaced the sequence: `Build forms at the drop of a prompt`.

**Onboarding is delegated entirely to the help centre**, where `Getting started` → `Typeform basics` carries 26 articles. The getting-started spine, in the order the section lists them `[observed]`:

`Typeform AI prompt library` · `What is Typeform?` · `A Typeform glossary` · `FAQ` · `Get the most out of Typeform with AI` · `Response limits`

**Placing `A Typeform glossary` third — before `FAQ`, before any task article — is the standout IA decision in this file.** Typeform teaches its vocabulary before it teaches its tasks. Most products bury the glossary or omit it. See T13.

**Placing `Response limits` sixth, inside *Getting started*,** is the second notable decision: the commercial constraint that will eventually break the user's form is introduced as a basic concept, not as a billing article.

**`My first form`** is a named article (surfaced via Related articles on the glossary page) `[documented]` — first-person possessive as an article title, matching Wise's confession-title register but for a success path rather than a failure one.

**A prompt library is shipped as an onboarding artefact** `[documented]`: `Typeform AI prompt library` is the first article in the basics section. For an AI-first builder the equivalent of "here are the steps" is "here are the sentences that work".

**Trial-mode onboarding copy** `[documented]`, from the FAQ:

> `Why do I get a message telling me to upgrade when I try to publish my typeform?` — "Users can test out certain features belonging to a higher tier of our pricing plan. Trying a paid feature will put the typeform in Trial mode. Typeforms in Trial mode can't be published unless the paid features are removed, or the account is upgraded."

`Trial mode` is a named state that a *form* enters, not an account. The user builds freely, hits the wall at publish. This is a real onboarding pattern — let them build the thing, then charge — and the help centre documents it plainly rather than hiding it.

## T5 Form & field labels

**This is the priority section for this product and the richest single body of evidence in the batch.** Typeform publishes a complete, named, described question-type taxonomy plus a published rationale for its one-question-per-screen model. Everything below is `[documented]` from the Question types article unless marked otherwise — these are the strings that appear in the builder's `Add content` menu, quoted inside documentation describing that menu.

### The one-question-at-a-time rationale, published

The mechanism is stated as a philosophy, with an analogy, in the help centre `[observed]`:

> "Our philosophy of **'one question at a time'** makes an online form feel more human. When we talk face to face, we wouldn't ask ten questions at the same time, as that would be overwhelming. Typeforms work in the same way."

And the definition of the product itself, in the FAQ `[observed]`:

> "Beautifully designed, asking one question at a time like a real conversation, typeforms are engaging and fun to complete. Thanks to this combination, typeforms have great completion rates, meaning you can get more and better results."

**The claim is quantified and the metric is defined** `[observed]`:

> "Typeforms have an average completion rate of 47%."
> "By completion rate we mean the percentage of people who completed the typeform (hit the Submit button at the end), vs those who opened the typeform."

This is the pattern worth stealing outright: **state the number, then define the denominator in the next sentence.** `47%` is meaningless without "vs those who opened", and Typeform supplies it unprompted. Compare the marketing page's `doubling the completion rate vs. traditional forms` and `3.5x more data`, neither of which defines a baseline. **The help centre is more rigorous than the marketing site about Typeform's own headline claim.**

The article lists seven contributing mechanisms, of which the ones bearing on content design are:

- "Typeform makes forms **simple, human, and beautiful**. Personal, delivered in bite sized and stylish chunks: a typeform doesn't look daunting." — `doesn't look daunting` is the operative phrase; the argument is about *perceived* length, not actual length
- "We also let people navigate typeforms with the keyboard, as well as the mouse. We've found that to be more user friendly."
- "This approach also works much better on mobile."
- On logic: "Respondents only see and answer questions relevant for them. **There's no 'if you answer Yes, skip straight to question 9'.**" — Typeform names the legacy paper-form instruction it replaces, in quotes. Naming the bad old thing is a strong explanatory move.
- On personalisation: "With Recall Information, typeforms also feel more personal, able to talk to the respondent by name, and remember previous answers."

### The complete question-type taxonomy — 31 named types in 6 groups

Typeform groups its question types into six menu categories. The group names and every type name below are verbatim.

**Group: `Contact info`** (5 types)

| Type | Documented description (summarised) | Content note |
|---|---|---|
| `Contact Info` | Collects several contact details on one page; fields can be added, removed, reordered, customized | **The one type that breaks the one-question rule.** Named "on one page" explicitly |
| `Email` | Accepts only correctly-formatted addresses; documented format is `xxxx@yyy.zzz`; wrong format shows a warning and the user retries | Validation behaviour described in the type definition |
| `Phone Number` | Respondent chooses a country code; each country configured so only a correctly formatted number can be entered | Per-country validation as a stated feature |
| `Address` | Full address on one page; fields addable, removable, reorderable | Second exception to one-question-at-a-time |
| `Website` | "Use this to collect websites and links from your respondents." | Not "URL" — the user-facing noun |

**`Website` over `URL` and `Phone Number` over `Tel` are the two clearest de-jargoning decisions in the set.**

**Group: `Choice`** (6 types)

| Type | Note |
|---|---|
| `Multiple Choice` | Allows multiple selections optionally; supports adding an `Other` option and a `None of the above` option |
| `Dropdown` | For long option lists; examples given are "year of birth, or country of origin" |
| `Picture Choice` | "like Multiple Choice, but instead you can give people a choice of images"; same `Other` / `None of the above` options |
| `Yes/No` | "Use this for closed questions – where the answer is 'yes' or 'no'." |
| `Legal` | Adds a legal note/disclaimer; made mandatory by setting it `Required` |
| `Checkbox` | "Closed-ended question with a single checkbox"; documented use is consent to terms or privacy policy |

**`Other` and `None of the above` are shipped as named, first-class options rather than as free-text workarounds.** Both appear in the documentation for two separate types. A content designer building a choice question rarely gets `None of the above` for free; naming it in the type definition means it gets written consistently.

**The `Legal` and `Checkbox` split is the most transferable distinction here.** `Legal` is for a disclaimer the user must agree to; `Checkbox` is a single consent tick. Two separate types for what most builders collapse into one control, differentiated by whether there is *text to be agreed with* or merely *a box to tick*. For checkout and onboarding consent, that is exactly the right line to draw.

**Group: `Rating & ranking`** (5 types)

| Type | Note |
|---|---|
| `NPS®` | Registered trademark carried in the type name. Scale stated as 0 to 10; groups defined verbatim as `promoters (a rating of 9 or 10)`, `passives (a rating of 7 or 8)`, `detractors (a rating of 6 or lower)` |
| `Opinion Scale` | "lets people give a rating from one to ten. You can define the range with the steps tool" |
| `Rating` | "a visual way to rate something. You can use stars, crowns, cats and many more!" |
| `Ranking` | Respondents pick a number from a dropdown to order options |
| `Matrix` | "evaluate one or more row items within a set of column choices"; explicitly also used to build Likert Scale questions |

**`NPS®` ships with the ® in the product UI name.** That is a licensing obligation showing up in a field-type label — worth noting for anyone who assumes type names are free text.

**`Opinion Scale` rather than "Linear scale" or "Rating scale"** is a distinctive pick, and it sits awkwardly beside `Rating` (which is also a scale, just iconographic). The pair `Opinion Scale` / `Rating` divides on *numeric vs visual*, not on what is being measured — a user wanting to measure satisfaction has to know that convention.

The `Rating` description is the only exclamation mark observed in the entire question-type article: "You can use stars, crowns, cats and many more!" Tone lifts precisely where the stakes are lowest.

**Group: `Text & Video`** (4 types)

| Type | Note |
|---|---|
| `Long Text` | Optional character limit; if unset, "answers can be as long as people want"; supports `Answer validation` |
| `Short Text` | Character limit "from 0-999 characters"; supports `Answer validation` |
| `Video and Audio` | Respondents record video of themselves in the form |
| `Clarify with AI` | "open-ended text question type uses generative AI to automatically generate up to two personalized clarification questions based on your respondent's initial answer" |
| `FAQ with AI` | Respondents ask the *form* questions; AI answers from an operator-supplied knowledge base |

**`Clarify with AI` is a genuinely new form primitive and the bound is stated in the definition: `up to two`.** A question type that generates its own follow-ups is an interviewer, not a field — and capping it at two is the content-design decision that keeps it from becoming an interrogation. Any team shipping an AI follow-up feature should note that the cap is disclosed in the type's own description, before anyone builds with it.

**`FAQ with AI` inverts the form entirely** — the respondent interrogates the operator mid-form. Naming it `FAQ with AI` rather than something like "Ask us anything" keeps the operator's mental model (it is an FAQ, you supply the answers) rather than the respondent's.

**Group: `Other`** (7 types)

| Type | Note |
|---|---|
| `Payment` | Paid plans only; Stripe or PayPal |
| `Number` | "only supports positive whole numbers of up to fifteen digits – you cannot use decimal points, or negative numbers" |
| `File Upload` | Paid plans only; "Great for job applications" |
| `Google Drive` | Uploads routed to the operator's Drive |
| `Date` | Three formats offered: `Month-Day-Year`, `Year-Month-Day`, `Day-Month-Year`; earliest/latest date limits settable |
| `Scheduler` | "let people book time with you in your calendar, right inside your typeform"; Google Calendar or Calendly |
| `Signature` | "Respondents will have the option to type, draw or upload their signatures" |

**The `Number` type's constraints are stated as prohibitions, and then the workaround is given in the next paragraph** `[observed]`:

> "For ZIP codes you can use the Short Text question type with Answer validation."

This is excellent documentation practice: name the limitation, then immediately route to the correct alternative *for the specific case the reader is about to hit*. ZIP codes are the canonical trap for a positive-whole-number field (leading zeros), and Typeform pre-empts it by name. Compare Tally's FAQ, which answers the identical problem with the identical advice (`How do I collect a number input starting with zero?` → use `Short text`). **Two independent form products arrived at the same documented workaround for the same field-type failure**, which suggests the underlying type design is wrong in both.

**Group: `Form structure`** (4 types — structural, not input)

| Type | Note |
|---|---|
| `Question Group` | For organising thematically or breaking a form into parts |
| `Welcome Screen` | "the initial screen that your respondents will see when they start a form" |
| `Statement` | "When you want to say something, but don't need an answer" |
| `End Screen` | "All forms finish with an End Screen by default" |

**`Statement` is the most underrated type in the taxonomy.** A form element that says something and collects nothing, shipped as a peer of the input types, with a stated purpose: "These are great for making a pause or introducing the next part of your form." In a one-question-per-screen model, `Statement` is the only place explanatory copy can live — so Typeform has had to make interstitial content a first-class object. **Any multi-step flow needs this and most don't name it.**

Note the terminology inconsistency: the glossary calls the end state `Endings` and says "An Ending is the final screen"; the Question types article calls it `End Screen`. **`Ending` and `End Screen` are both live.** The pricing table adds a third: `Multiple endings per form`.

### Question settings — the per-field configuration vocabulary

`[documented]` from the same article. Every question type has a settings menu in the `Question` panel:

- `Required` — a named, linked setting with its own article (`make-your-questions-required`)
- Maximum character count
- `Layout` — "Use Layout options to position an image or GIF to a question in your form… You can select to have different layouts for mobile and desktop devices"
- `Question reference` / `refs` / `Block references` — "a unique identifier that allows you to easily identify each question in your code"

**The `Question reference` validation error is documented verbatim** `[observed]`:

> "The Question reference field will accept any alpha character (a-z, A-Z), any digit (0-9), '-' (dash), and '_' (underscore). It will not accept any special characters such as \$#%&, spaces, or empty text. If you see an **'Argh'** error when setting your refs, make sure you're not using any special characters."

**`Argh` is Typeform's error-title word**, and this is the only place in the harvest where it surfaces. It is a single interjection used as an error heading — the house equivalent of `Oops!`. Recorded as observed-via-documentation; the live string was not seen. See T7.

Also documented: "You won't be able to change the question type of Ending or Question Group blocks." A named immutability constraint, stated in a `Note!` callout.

### Answer validation

`Answer validation` is a named, cross-cutting feature referenced from `Email`, `Short Text` and `Long Text` `[documented]`: "use Answer validation to make sure responses follow a specific format" and, for Email, "to enforce additional patterns or specific formatting". A single validation vocabulary applied across three types rather than per-type regex settings.

### Field-content guidance published as marketing

`[observed]` The Question types article closes by routing to a separate guidance property:

> "Do you want to improve your customer journey? Are you perfecting the employee experience? Then write brilliant survey questions that get actionable feedback." → links to `typeform.com/surveys/question-types/`

**The documentation ends by telling the reader that choosing the type is the easy part and writing the question is the hard part.** That handoff, from reference documentation to writing guidance, inside the reference article, is a content-ops decision worth copying.

### Import and pre-population

`[documented]` from the FAQ:

- `Can I upload questions and data into a typeform?` — "Short answer: in most cases, no. When creating a typeform you have to write or copy/paste each one, one at a time." A `Docs importer` exists for Google Drive users against a supplied template.
- `Can I pre-populate fields?` — yes, via URL parameters. "So, for example if you know someone's name, you can feed that into a typeform, so it feels more personalized."
- `Can I pre-populate typeform answers?` — "You cannot pre-populate a typeform's results. The only way to get results stored in a typeform is by people completing it. **We think we make it a nice experience that people enjoy :)**"

That last answer is the tonal outlier of the harvest: a flat `No`, a restatement of the rule, and an ASCII smiley. It reads as defensive. The distinction being drawn — **pre-populating a *field* is fine, pre-populating a *result* is not** — is genuinely important for data integrity, and the smiley undercuts it.

### Save-and-resume behaviour

`[documented]`, a real answer to a real form-design question:

> "They can start to fill one in, close it, and then return later and their answers will still be there. The only rule is they have to be on the same browser and device (and not in Incognito or Private browsing mode). Their answers will be kept safely in their browser's local storage for **15 days**."

Mechanism named (`local storage`), constraints named (same browser and device, not Incognito), duration quantified (`15 days`). Three caveats in three clauses, none hidden. This is the best-written passage in the Typeform help centre.

### Partial responses

`[documented]` A named object: `Partial Submit Point`. "If you've added a Partial Submit Point to your form, you'll be able to see answers submitted up to that point." The pricing table meters them: `Number of partial submit points` — 1 on lower plans, 3 on higher. A *checkpoint you place in the form* rather than a setting you toggle, and it is sold by the unit.

Pricing-table caveat, verbatim and **missing its closing full stop**: "Collect answers to the most important questions in your form, even if respondents don't complete your form. To use this feature with forms that include logic or scoring, select one of the Growth plans"

### The Submit button

`The Submit button` is a dedicated help article in `Typeform basics` `[documented]` — a single UI control with its own documentation page, in the getting-started section. Its existence tells you the submit moment is where Typeform's support load lands.

## T6 Status & state language

**Form lifecycle states** `[documented]`

| State | Source and meaning |
|---|---|
| `Trial mode` | A form using paid features on a lower plan. "Typeforms in Trial mode can't be published unless the paid features are removed, or the account is upgraded." |
| `Paid` | A form tag. Article: `Why is my form tagged 'Paid'?` |
| `closed` | Form no longer accepting responses. `How do I close your typeform` guidance exists; also reached involuntarily — see below |
| `Private mode` | **The limit-breach state.** See below |
| `live` | "You'll see the Results panel after you've made your form live" |

**`Private mode` is the most interesting state name in this file** `[observed]`, from the Response limits article:

> "When you reach 100% of your response limit, your forms will go into **Private mode**. Those forms will automatically become public again when the next month begins or when you upgrade your account."

A commercial cut-off named as a privacy state. `Private mode` is a euphemism — the form is not private, it is disabled — but the name is doing real work: it signals *reversible* and *not broken*, and the next clause confirms both recovery routes. Compare a plain "Limit reached — form disabled", which would be more honest and more alarming.

The reconciling article exists too, because the euphemism leaks `[documented]`:

> `My typeform shows as 'closed', but I didn't close it!` — "This may be because your account has reached its response limit for the month."

**The user sees `closed`, the documentation calls it `Private mode`, and Typeform has written the article that bridges the two.** This is precisely Wise's "complete but the money hasn't arrived" pattern: when the state name and the user's experience diverge, write the reconciling article rather than renaming the state. Note the article title carries the user's exclamation mark and their disclaimed responsibility (`but I didn't close it!`).

**Limit-approach thresholds are published** `[observed]`: "We will notify you by email, and inside your Typeform account, when you reach **90%** and **100%** of your limit." Two thresholds, two channels, both named before purchase.

**An irreversibility warning attached to a state** `[observed]`: "Deleting responses won't add them back to the number of remaining responses for the month. If you delete a response, you will no longer be able to access the content of that response, but the response will still count towards your limit for that month." A counter-intuitive rule stated twice in one paragraph, from two angles. Correct, because users will try this.

**Respondent-facing state copy** `[documented]` — the article says "your responders will see a message similar to the one below when they try to access your form" and shows a screenshot. **The string itself is in the image, not the HTML, so the respondent-facing limit message was not captured.** `[absent]`

**Member/response concepts:** `response` is the unit. `Monthly response base` and `Maximum monthly response limit` are the two metered quantities, with the second defined as "the response base and possible add-ons".

**Status-page component taxonomy** `[observed]` — 30 named components grouped into 12 headings, which doubles as a public map of the product's architecture:

`Forms / Renderer` (`Open/Load forms`, `Submit responses`, `Media`) · `Admin` (`Account Settings`, `Subscription`) · `Builder / Create UI` (`Form creation`, `Publish form`, `Email Follow-ups`, `Media`) · `Connect/Integrations` (`Integrations`, `Webhooks`) · `Results` (`Insights`, `Summary`, `Responses`) · `Share Panel` (`Share link`, `Embeds`) · `Workspaces, Teams & Templates` (`Log-in/Applications (OAuth)`, `Form templates`) · `Public Pages` (`Pricing page`, `www.typeform.com`, `Blog`, `Public Template Gallery`) · `Developer Platform` (`Create API`, `Responses API`, `Webhooks API`, `Developer Portal`) · `Back-End`

Severity scale `[observed]`: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Overall banner: `All Systems Operational`.

**Separating `Open/Load forms` from `Submit responses` as distinct components is the notable decision.** A respondent who can open a form but cannot submit it is in a different — and much worse — failure than one who cannot load it at all, and the status page lets an operator tell those apart at a glance.

**Scheduled-maintenance copy is unusually well written** `[observed]`:

> "During a brief portion of this window, users may experience issues signing in, validating existing sessions, or performing authenticated actions. OAuth and personal-access-token operations may also be temporarily affected."
> "We expect the actual interruption to last only a few minutes. **The wider two-hour window includes the upgrade, validation, and rollback contingency.**"

That second sentence is the pattern: **explain why the announced window is longer than the expected impact.** It pre-empts "why are you down for two hours?" and discloses that a rollback plan exists. Two hours of stated risk, a few minutes of expected impact, and the gap accounted for. Directly transferable to any maintenance notice.

## T7 Error, failure & recovery

`[documented]` — no live error strings captured; one error *title word* documented.

**`Argh` is the error heading** `[documented]`: "If you see an 'Argh' error when setting your refs…". The only in-product error word recovered.

**Recovery-shaped help titles** `[observed]`, from Typeform basics and the FAQ:

- `What to do if your form isn't working`
- `Troubleshooting for form respondents` — **a troubleshooting article written for the respondent, not the operator.** For a product whose failures are experienced by a third party the operator cannot see, writing help for the non-customer is a real content-ops commitment.
- `Logic not working? Here are 5 ways to fix it`
- `Why doesn't my question work with logic?`
- `My typeform's not loading!`
- `My typeform is skipping questions / The questions I created aren't showing up in my published typeform!`
- `My typeform shows as 'closed', but I didn't close it!`
- `Why can't I log in to my account?`
- `I can't verify my Typeform account`

**Three of these carry exclamation marks and one carries an apostrophised contraction of the user's own speech.** `My typeform's not loading!` is transcribed panic used as a help title — the same register as Wise's `I sent money to the wrong person`, but in present tense and with the emotion left in. Where Wise is calm and factual, Typeform mirrors the user's alarm. Both work; they are different bets. Typeform's answer copy then de-escalates: "Don't worry! Head over to our Troubleshooting article, which will help you fix things."

**The `X / Y` compound title** — `My typeform is skipping questions / The questions I created aren't showing up in my published typeform!` — is two different symptom descriptions of one root cause (misconfigured logic), slashed together so either phrasing finds the article. Ugly, effective, and rarely done.

**Recovery answers name the diagnostic tool** `[observed]`: "use your Logic Map as a handy reference to make sure your respondents are being sent down the right question paths." The fix is not "check your logic" but "open this named view".

**Publish-staleness error, documented as a behaviour** `[observed]`:

> `I made changes to my typeform questions or settings, but my form doesn't show them!` — "Make sure to hit **Publish** after making any edits to your typeform… **You also need to republish your form when editing typeform settings.** Otherwise, the new settings won't affect people responding to your form."

The second sentence is the non-obvious half: settings changes also require republishing. Bolded, separated, stated as its own rule.

**Offline failure described from the respondent's side** `[observed]`:

> "If someone starts completing a typeform but loses their internet connection, they can click the Submit button, but a message will appear saying results cannot be submitted, and to not close the page. The typeform will keep trying until the internet connection returns, **as long as the browser tab remains open**."

The recovery instruction (`do not close the page`) is inside the error message, and the condition for recovery is restated in bold. The actual string is paraphrased in the documentation rather than quoted, so the live error copy is unavailable. `[absent]`

**Browser-support failure** `[observed]`: "On unsupported versions or devices, people trying to access your typeform will see a message apologizing and pointing them to a page where they can update their browser." Apology plus route, described but not quoted.

**A capability refusal, plainly stated** `[observed]`:

> `How do I edit submitted responses?` — "This is not possible on Typeform. If you want to edit results, you need to download your results to a spreadsheet, where you can manually edit submissions."

Four words of `No`, then the workaround. No hedge, no roadmap promise.

**A partial refusal** `[observed]`: `How can I make sure respondents only answer my typeform once?` — "We don't currently offer a way to automatically prevent multiple submissions, but you can try the tips suggested in our guide…". `don't currently` leaves the door open; the tips are explicitly framed as workarounds ("you can try").

Worth flagging against T13: **Tally's comparison table lists `Prevent duplicate submissions` as a Typeform feature at $379/mo.** Typeform's own FAQ says it does not offer one. Either the FAQ is stale or Tally's table is wrong. Recorded as an unresolved contradiction between two sources in this batch — see 178-tally.md.

## T8 Empty states

`[absent]` — no empty-state copy reachable. All product screenshots on both marketing and help pages show populated states. The Results panel, Workspace, and Insights views are all shown with data.

The nearest artefacts are the two **form-submission states on the pricing page's own filter control** `[observed]`, which are Webflow defaults left in place:

> `Thank you! Your submission has been received!`
> `Oops! Something went wrong while submitting the form.`

**A form company is shipping unedited Webflow boilerplate on its pricing page**, including the `Oops!` that appears nowhere else in Typeform's voice. This is the most quotable defect in the file: the success message has two exclamation marks, the error message opens with `Oops!` and says nothing about what went wrong or what to do, and neither string is Typeform's own writing. Recorded as a negative finding.

## T9 Notifications & system messages

**Follow-up messages are a named product concept with a stated purpose** `[observed]`, help-centre trending topic:

> `Send follow-up messages to your respondents or yourself` — "Keep the conversation going by sending follow up messages when your form is completed."

`Keep the conversation going` extends the conversational metaphor past submission. The article title names **both recipients in one string** (`to your respondents or yourself`), which is the right call: the operator choosing this feature needs to know it does both.

Pricing-table rows confirm the two directions as separate features `[observed]`: `Set up email notifications` and `Send follow-up emails to respondents`. Note the asymmetric verbs — the operator *sets up* notifications, the system *sends* follow-ups.

**Limit notifications** — covered in T6: email plus in-account, at 90% and 100%.

**Billing/editor notifications** — none stated. `[absent]`

**Account-verification email named by subject line** `[observed]`:

> "Check your email spam folder. The email subject will be **Activate your typeform account**."

Quoting the exact subject line in the help article is the correct pattern for a spam-folder instruction — the user can search for it. Note the lowercase `typeform` in the subject, matching the house style of lowercasing the noun (T13).

**Status-page subscription channels** `[observed]`: `Email`, `SMS`, `Twitter`, `Support`, `Atom`, `RSS`, with the framing "Get email notifications whenever Typeform **creates**, **updates** or **resolves** an incident." Three verbs naming the incident lifecycle, bolded. SMS carries "Message and data rates may apply."

## T10 Disclosures, legal & compliance

**Response-limit disclosure is the central commercial disclosure and it is thorough** `[observed]`:

> "These limits are reset every month, and apply to both monthly and yearly Typeform plans. Check your Account Settings to see yours. **You can't carry over unused responses to the next month.**"
> "Response limits apply across all forms in your account. This means that if you are on a Plus plan with three forms, you can collect a total of 1,000 responses per month, **not 1,000 responses per form**."

Both sentences pre-empt a specific wrong mental model and use a **worked example with real numbers** to do it. "not 1,000 responses per form" is the clause that prevents the support ticket. This is the single best disclosure sentence in this batch.

**Response limits per plan** `[observed]` from the pricing comparison table (row labels verbatim):

| Row | Basic | Plus | Business | Growth Flow | Talent |
|---|---|---|---|---|---|
| `Monthly response base` | 100 | 1,000 | 10,000 | 10,000 | 3,000 |
| `Maximum monthly response limit` | 750 | 2,500 | 50,000 | 50,000 | 7,500 |
| `Seats` | 1 | 3 | 5 | 5 | 3 |
| `Number of forms` | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| `Questions per form` | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| `Receive file uploads` | 1 GB | 2 GB | 4 GB | 4 GB | 4 GB |
| `Number of partial submit points` | 1 | 1 | 3 | 3 | 3 |

Column-to-plan mapping is **inferred**, not labelled in the markup — see Caveats.

**Publishing `Unlimited` for forms and questions while metering responses is the defining commercial disclosure.** The thing that feels like the product (build as many forms as you like, as long as you like) is free; the thing that creates value (someone answers) is metered. Both facts sit adjacent in the same table.

**Plan prices as shown on the cards** `[observed]`: `Basic` 39 USD/mo monthly or 28 USD/mo billed yearly (`468 USD total / yr`, `Save 132 USD / yr`) · `Plus` 79 / 56 (`948` total, `Save 276`) · `Business` 129 / 91 (`1,548` total, `Save 456`) · `Growth Flow` 379 / 266, badged `Free trial`, `379USD/mo after 14 days`, `Credit card required` · `Talent` 169 / 119 (`2,028` total, `Save 600`) · `Enterprise` — no price, `6+ users, SSO, dedicated support`.

**Pricing defect, recorded:** the sticky header inside `Compare all plans` shows a *different and contradictory* price set — Basic 29/25, Plus 59/50, Business 99/83, Growth Flow 349/266 — and stamps `349 USD /mo after 14 days` onto Basic, Plus and Business, which have no trial. **Two mutually exclusive price tables are served on one page.** Also, the toggle is labelled `(Save 30%)` but the card maths yields roughly 28–29.6% on every plan. Both are recorded as defects, not as findings about Typeform's pricing.

**Trial disclosure** `[observed]`: `Try free for 14 days` + `Credit card required` + `379USD/mo after 14 days`. Three facts adjacent to the button: duration, precondition, and post-trial price. **`Credit card required` stated before the click** is the correct and frequently-omitted third element.

**Cancellation, refund, downgrade, and proration wording: entirely absent from the pricing page.** `[absent]` A search of the full page text found no instance of cancel, refund, downgrade, proration, overage charge, or tax. For a product with a card-required trial at $379/mo, the absence of a cancellation sentence anywhere near the trial CTA is the most significant gap in this file. Cancellation is reachable only via a separate `Billing & Payments FAQ` article, not linked from pricing.

**Add-on availability caveats** `[observed]`: `Available on all plans except Free and Basic` · `Available on all plans except Free, Basic, and Plus` · `Available on Enterprise and Growth Custom plans.` Exclusion-framed rather than inclusion-framed, which is shorter and — with five plan families — clearer.

**Gating rendered as a cell value** `[observed]`: `Enterprise only` appears as the value for `Add custom fonts`, `Connect a custom domain`, `Set up SSO`, and `Ensure HIPAA Compliance`. A gate stated as data in the comparison grid rather than as an absent checkmark. Better than a dash, because it names the route.

**Compliance claims, in the comparison table rather than in a legal page** `[observed]`:

- "GDPR compliance for privacy and information use is built right into Typeform."
- "Keep respondent data secure and HIPAA compliant with Typeform."
- "SSO, HIPAA, GDPR compliance, and your choice of US or EU data center."
- Row: `Choose your preferred data center (US or EU)`

Data residency offered as a purchasable feature with the two options named. No named regulator, no certification reference, no DPA link on the pricing page.

**Two asterisked rows with no footnote** `[observed]`: `*Monthly video question views` and `*Monthly video answers` carry a leading asterisk, and **no corresponding footnote exists anywhere on the page.** A dangling disclosure marker.

**Footer legal furniture** `[observed]`: `Legal`, `Cookie Settings`, `Check our cookies policy to delete cookies`, `Report abuse`. The cookie link phrasing (`Check our cookies policy to delete cookies`) puts the user's action first and the policy second, which is unusual and good.

**AI-specific disclosure exists but was not opened** `[documented]`: `AI with Typeform FAQ` and `Clarify with AI and FAQ with AI privacy considerations` are both named articles. A dedicated privacy article for two AI question types is the correct structure; its contents are unharvested.

## T11 Help-centre architecture

Three top-level categories → sections → articles. Zendesk-hosted, separate domain (`help.typeform.com`) from the marketing site, with `Back to website` as the bridge.

**The `Typeform basics` section is the artefact.** Twenty-six articles, and the ordering is a deliberate curriculum rather than an alphabetical list:

1. `Typeform AI prompt library`
2. `What is Typeform?`
3. `A Typeform glossary`
4. `FAQ`
5. `Get the most out of Typeform with AI`
6. `Response limits`
7. `How to identify your respondents`
8. `The Submit button`
9. `How to get help`
10. `Create Workflows for your form`
11. `How to connect your form to other apps`
12. `Can I pre-populate forms?`
13. `What's the average completion rate of a typeform?`
14. `What browsers and devices are supported by Typeform?`
15. `Can I build conditions or 'skip logic' into typeforms?`
16. `Can I generate unique codes for each respondent?`
17. `Can I edit submitted responses?`
18. `Generate AI test responses for your form`
19. `Do test responses count towards my response limit?`
20. `Can I use forms without an internet connection?`
21. `Troubleshooting for form respondents`
22. `Can I try paid features for free?`
23. `What to do if your form isn't working`
24. `Why is my form tagged 'Paid'?`
25. `Changelog`
26. `AI with Typeform FAQ`

The shape: AI first, then definition, then **vocabulary**, then FAQ, then limits, then tasks, then a long run of `Can I…?` capability questions, then troubleshooting, then billing edge cases. **Nine of twenty-six are questions, and eight of those nine begin `Can I` or `What`** — the section is organised around the user's uncertainty about what the product *permits*, not about how to operate it.

`How to get help` at position 9 is a help article about using the help centre. Meta, but reasonable in a three-category IA where routing is hard.

**Article-title grammar — five shapes:**

| Shape | Examples |
|---|---|
| `Can I <verb>…?` | `Can I edit submitted responses?` · `Can I try paid features for free?` · `Can I use forms without an internet connection?` |
| `How to <verb>` | `How to identify your respondents` · `How to get help` · `How to connect your form to other apps` |
| `What <is/are>…?` | `What is Typeform?` · `What's the average completion rate of a typeform?` |
| `Why <problem>?` | `Why is my form tagged 'Paid'?` · `Why doesn't my question work with logic?` |
| First-person complaint | `My typeform's not loading!` · `My typeform shows as 'closed', but I didn't close it!` |
| Bare noun | `Response limits` · `Changelog` · `Workspaces` · `The Submit button` |

**The `Can I…?` shape dominates**, which is distinctive. Wise's help centre is organised around `How do I…?` (task) and `I <did wrong thing>` (recovery); Typeform's is organised around `Can I…?` (permission). That difference reflects the products: Wise users are trying to complete a transaction, Typeform users are trying to find out whether the tool will let them do the thing they've already decided to do.

**Routing furniture** `[observed]`: `What do you need help with?` (H1) → `Search` → three categories → `Trending topics` with the scope line "Here's what other people are finding most useful right now" → `Popular videos` → `Learn from the Typeform Community` / `Join the discussion` → `Still got questions?`.

**Community is routed before support at every exit point.** `Tap into our community knowledge / Find answers` precedes `Can't find what you're looking for? / Contact support` on every article page. Wise puts personalisation first, self-service second, human last; Typeform puts self-service, then peers, then staff. Both defer the human; Typeform inserts a peer layer.

**Sign-off line** `[observed]`: `With love, from Barcelona`, on every help page above the language switcher. A geographic-affection sign-off as permanent help-centre furniture.

**Localisation** `[observed]`: `English (United States)` with `Español` and `Français` switchers. The Spanish version localises the *slug* too (`/es/articles/360061281111-El-glosario-de-Typeform`), and the Spanish FAQ slug is `Preguntas-frecuentes`. Notable: the Spanish translation of the completion-rate article renders as `¿Cuál es la tasa de conversión de un typeform?` — **"tasa de conversión" (conversion rate), not "tasa de finalización" (completion rate).** The English article goes to some trouble to define completion rate precisely; the Spanish title uses a different metric's name. Recorded as a localisation defect.

## T12 FAQs

**Two FAQ surfaces, both `[observed]`.**

**1. The pricing page has no FAQ.** `[absent]` Confirmed by full-text search of the fetched page. This is a significant omission for a page carrying five plan families, a card-required trial, and two contradictory price tables.

**2. The help-centre `FAQ` article** carries 22 questions in three named sections. Answers are present in HTML and summarised below.

**Section: `Account Settings and device use`**

| # | Question (verbatim) | Answer, one line |
|---|---|---|
| 1 | What browsers and devices are supported by Typeform? | Named browsers on desktop; supported iOS/Android versions on tablet and phone; two previous versions supported; unsupported devices see an apology and an upgrade link |
| 2 | Why can't I log in to my account? | Check the status page first, then the login troubleshooting guide |
| 3 | I can't verify my Typeform account | Check spam for the subject `Activate your typeform account`; wait 15 minutes; then contact support |
| 4 | I want to change my account email | Changeable in Settings, except for Google/Microsoft sign-ups, who must contact support |
| 5 | Can I use typeforms without an internet connection? | No offline mode; connection needed to load and to submit |
| 6 | My typeform's not loading! | Routed to the troubleshooting article |

**Section: `Creating and sharing typeforms`**

| # | Question (verbatim) |
|---|---|
| 7 | How can I copy a typeform? |
| 8 | How can I move a typeform to another Workspace or account? |
| 9 | Can you build conditions or "skip logic" into the form? |
| 10 | Can I upload questions and data into a typeform? |
| 11 | Can I pre-populate fields? |
| 12 | Can I pre-populate typeform answers? |
| 13 | I made changes to my typeform questions or settings, but my form doesn't show them! |
| 14 | My typeform is skipping questions / The questions I created aren't showing up in my published typeform! |
| 15 | Why do I get a message telling me to upgrade when I try to publish my typeform? |
| 16 | My typeform shows as 'closed', but I didn't close it! |
| 17 | How do I close my typeform? |

**Section: `Your typeform results`**

| # | Question (verbatim) |
|---|---|
| 18 | How can I identify my respondents? |
| 19 | Can I generate unique codes for each respondent? |
| 20 | Do respondents need to complete my typeform in one sitting? |
| 21 | Can I see the answers for partially submitted typeforms? |
| 22 | What are response limits? |
| 23 | Can I get an email every time my typeform gets a new response? Can I send typeform respondents their answers? |
| 24 | How can I get my results? |
| 25 | How can I make sure respondents only answer my typeform once? |
| 26 | How do I edit submitted responses? |

(Numbering runs to 26 because the three sections total 26 entries; six appear in both this article and the `Typeform basics` list.)

**Structural notes.** The three sections are ordered **account → creation → results**, which mirrors the product lifecycle exactly. Within sections, the ordering is capability-then-failure: Q9–Q12 ask what the builder can do, Q13–Q16 describe what goes wrong, Q17 closes the loop with the deliberate version of the accidental state in Q16.

**Q16 then Q17 is the best adjacency in the file:** `My typeform shows as 'closed', but I didn't close it!` immediately followed by `How do I close my typeform?`. The involuntary state precedes the voluntary action, so a user who arrived confused leaves knowing how to do it on purpose.

**Q9 puts the competitor's term in scare quotes and then renames it** `[observed]`: "With Typeform, conditions are called Logic." The question is asked in the vocabulary the user brings (`skip logic`), the answer translates to house vocabulary (`Logic`). This is the correct way to handle a terminology mismatch and it is done explicitly rather than silently. See T13.

**Q23 is a compound question** joining notification-to-self and notification-to-respondent. Like Wise's compound questions, it pairs two halves of one decision rather than splitting them.

**Three FAQ entries are exclamation-marked first-person complaints** (Q6, Q13, Q14, Q16) — an FAQ written partly in the user's voice rather than entirely in the interviewer's.

## T13 Terminology & glossary

**Typeform publishes a glossary as a getting-started article — third in the curriculum, before the FAQ.** `A Typeform glossary` defines 15 terms, each with a screenshot and a link onward. This is the only published vocabulary standard in this batch and the reason Typeform is the anchor product for T13.

Opening line `[observed]`: "Hey there! This list covers some of the terms you may come across while using Typeform."

### The glossary, as published

| Term | Typeform's definition (summarised) | What it displaces |
|---|---|---|
| `Content panel` | Where you create and edit questions, adjust design, change settings | "Editor", "Build tab" |
| `Workflow panel` | Where logic, branching, calculations, URL parameters, variables and follow-ups live | Formerly the `Logic tab` — renamed, see below |
| `Connect panel` | Where integrations are configured | "Integrations tab" |
| `Endings` | "the final screen that your respondents will see upon finishing a form" | "Thank you page" |
| `URL parameters` | Preloaded respondent values carried in the form URL | **Formerly `Hidden Fields`** — renamed, see below |
| `Layout` | Positions an image or GIF against a question; separate mobile and desktop layouts | |
| `Logic` | "rules that show your respondents different follow-up questions, outcomes based on how they've answered previous questions, or assign points to answers that can be used for branching" | `skip logic`, `conditional logic`, `Logic Jumps` |
| `Logic Map` | "a visual aid showing the paths of any logic you've set up" | "flow view" |
| `Outcome quiz` | Links answer choices to different Endings | |
| `Recall information` | "directly reference previous answers, variables, or URL parameters values to create a personalized experience"; invoked by typing `@` | "piping", "merge tags" |
| `Reports` | Printable and online reports, in the Summary tab | |
| `Results panel` | Where you see answers and prepare reports | |
| `Score quiz` | Assigns point values to answers; Ending chosen by total | |
| `Share panel` | Link, email or embed options; appears after clicking `Share` | |
| `Variables` | "numeric or textual elements whose value can be changed throughout a form based on a respondent's answers" | |
| `Welcome Screen` | "the initial screen that your respondents will see when they start a form" | "intro page", "cover" |
| `Workspace` | "function similarly to computer desktops: they display your forms for easy access" | "folder", "project" |

**The `panel` suffix is the load-bearing convention.** `Content panel`, `Workflow panel`, `Connect panel`, `Results panel`, `Share panel`, `Question panel` — six surfaces, one noun. A user who learns that Typeform's top-level regions are *panels* can navigate by elimination. This is the cheapest kind of vocabulary discipline and almost nobody does it.

### Three documented renamings — the most valuable artefact in this file

**1. `Hidden Fields` → `URL parameters`.** Live evidence of a migration in progress `[observed]`:

- Trending topic: `Using URL parameters` with body text "URL parameters (formerly Hidden Fields) is a Free feature…"
- A related-article title reads `Using URL parameters (formerly Hidden Fields)`
- The glossary entry links to an article whose URL slug is `360052676612-How-to-use-Hidden-Fields`
- The FAQ links to `what-are-hidden-fields-360052676372`
- The pricing comparison table still says `Personalize with hidden fields`

**So the new name is in the glossary and the trending topic, the parenthetical bridge is in two titles, the old name is still in the URLs, and the pricing page has not been updated at all.** This is a rename caught mid-flight across five surfaces, and it is the single most instructive thing in this file for anyone planning a terminology change. The pattern that works — `New name (formerly Old name)` in the title, for as long as the old name has search equity — is visible, and so is the failure mode: the commercial page is always the last to be updated and is the one a prospect reads first.

Note also the *reason* for the rename. `Hidden Fields` names the implementation (a field the respondent can't see). `URL parameters` names the mechanism the operator actually works with. The new name is more technical and less metaphorical, which is unusual — renames normally go the other way.

**2. `Logic tab` → `Workflow tab`.** Community post title `[observed]`: `The new Workflow Builder is here!` — "The new Workflow Builder is officially live, making it easier than ever to customize and automate your forms - all in one place. 🎉 Discover how we've transformed the **Logic tab** into a new **Workflow tab**!" The glossary already says `Workflow panel`. **`tab` in the announcement, `panel` in the glossary** — the rename shipped with the wrong container noun.

**3. `Logic Jumps` → `Logic` / `Branching and calculations`.** Legacy article titles persist (`How to set Logic Jumps (Classic builder)`, `Add Logic Jumps to Hidden Fields` — whose *displayed* title is now `Add logic to URL parameters`), while current articles say `Branching` and `Logic`. `Logic Jumps` remains the term in the developer documentation. **Three generations of one concept's name are simultaneously live across help, developer docs and URL slugs.**

### The logic vocabulary

`[documented]` and `[observed]`

| Term | Usage |
|---|---|
| `Logic` | The umbrella. "With Typeform, conditions are called Logic." |
| `Branching` | Paths through the form. Pricing row: `Add logic to your forms to connect, skip, and rearrange questions as needed.` |
| `Branching and calculations` | The named feature pairing routing with arithmetic |
| `Logic Map` | The visual path view; named as the debugging tool in two troubleshooting answers |
| `Ordering Logic` | A named article about rule precedence |
| `reverse logic` | Scare-quoted in a title: `How to use "reverse logic" with blank fields` — an unofficial technique, punctuated as such |
| `variables` | Values that change during the form |
| `scores` | Point totals; `Score quiz` |
| `outcomes` | Endings chosen by answer combination; `Outcome quiz` |
| `Recall information` | Referencing prior answers via `@` |

**The `connect, skip, and rearrange` triple** (from the pricing row) is the clearest three-word statement of what logic does that appeared anywhere in this harvest.

**Documented logic incompatibility** `[documented]`, via search result: certain question types cannot be used as logic *conditions* — Matrix, Statement, Phone Number, Ranking, Payment, Calendly, Address, Contact Info. There is a dedicated article, `Why doesn't my question work with logic?`. **A product that publishes which of its own field types don't work with its flagship feature** is doing something most don't. (Sourced from a search snippet, not from a fetched page — see Caveats.)

### The product-noun layer

| Term | Note |
|---|---|
| `typeform` (lowercase) | **The form object is the brand name, uncapitalised.** "a typeform", "your typeform", "copy a typeform". The email subject line is `Activate your typeform account` |
| `Typeform` (capitalised) | The company and the platform |
| `form` | Increasingly used instead of `typeform` in newer articles (`What to do if your form isn't working`, `Create Workflows for your form`) — **a live drift away from the coined noun** |
| `respondent` | The person filling in the form, used with total consistency |
| `responder` | **Used once**, in the Response limits article: "your responders will see a message…" — a one-off slip |
| `response` | The unit of metering |
| `Organization` / `Workspaces` | Two-level container model |
| `Seats` | Priced access |
| `Typeform AI` | "Your AI know-pilot" |
| `Typeform MCP` | "Use Typeform from your AI tools" |
| `Growth Flow` / `Research Flow` | Two `<Noun> Flow` product names |
| `Contacts & Automations` | The add-on |
| `Smart Insights` | Named analytics feature |
| `Clarify with AI` / `FAQ with AI` | Two `<verb/noun> with AI` question types |
| `Partial Submit Point` | A placeable checkpoint |
| `Trial mode` / `Private mode` | Two `<adjective> mode` states |
| `Question reference` / `refs` / `Block references` | **Three names for one identifier, all in one article** |

**`respondent` vs `responder`** and **`typeform` vs `form`** are the two live drifts in the noun layer. The second matters more: the coined lowercase `typeform` is the strongest piece of brand vocabulary the company owns, and the newer help articles are quietly abandoning it for the generic `form`. Whether that is deliberate (the product now does more than forms) or entropy is not stated anywhere.

**Register split.** Marketing says `Intelligent Forms`, `AI forms`, `Growth Flow`. Help says `typeform`, `form`, `Logic`, `panel`. The glossary is the bridge and it is written in the help register, not the marketing one — correctly, since it is teaching the builder's vocabulary and not the buyer's.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the operator. Third person for the respondent (`your respondents`, `people`), which creates a consistent three-party grammar: *we* (Typeform) built it, *you* (operator) configure it, *they* (respondents) fill it in. Sustained across every help article.

**Register.** Warm, contracted, occasionally jokey in the help centre; corporate and noun-heavy on the marketing site. The gap between the two registers is the widest in this batch.

Help-centre register markers `[observed]`: "Hey there!" (glossary opener) · "Don't worry!" · "We think we make it a nice experience that people enjoy :)" · "You've decided to put your form out into the world, and the Share panel lets you decide how." · "Make a great first impression!" · "customize them to your heart's content" · "You can use stars, crowns, cats and many more!" · "Short answer: in most cases, no." · `With love, from Barcelona`.

Marketing register markers `[observed]`: `High Response Rate` · `Data Enrichment` · `Verified Panel Recruitment` · "Combine AI forms and automated workflows to drive revenue growth" · "industry-leading match rates of up to 92% for B2B companies and 71% for B2C".

**The tone does not flatten as stakes rise — it flattens as the buyer gets more senior.** Wise's gradient is by risk (colloquial in app copy, flat in the fee table). Typeform's is by audience: the operator gets `Hey there!`, the procurement committee gets `Verified Panel Recruitment`. Both are defensible; Typeform's produces a product that sounds like two companies.

**Named illustration characters appear in the help CSS** `[observed]`: `HC_BobRoss_ilu_cropped.png` and `HC_Note_ilu_cropped.png` are the filenames for the two callout illustrations, both preceding a bolded `Note!`. A Bob Ross reference as the house note-icon is an internal joke leaking into the DOM — harmless, and a small signal about who writes this documentation.

**Numbers as trust devices** `[observed]`: `150,000+ businesses` · `48 million responses collected monthly` · `3.5x more data` · `47%` average completion rate · `92%` B2B / `71%` B2C match rates · `400+ targeting criteria` · `+500 integrations with Zapier` · customer results (`increased sales leads by 40%`, `drove $3.67 million in sales`, `cut time to hire by 75%`).

**Only one of these carries a definition.** `47%` is defined in the next sentence. `3.5x more data`, `doubling the completion rate`, and `92%` match rates are all unbounded relative claims with unnamed baselines. **The help centre self-qualifies; the marketing site does not.** That is the reverse of the usual arrangement and worth flagging: the rigorous number is hidden in a help article and the loose ones are in the hero.

**Accessibility content** `[observed]`

- `Skip to main content` is present and first in the DOM on both the marketing site and the help centre. Correct.
- **Alt text on the help-centre screenshots is genuinely good**: "Typeform Content panel interface showing form question creation options." · "Setting up branching rules and logic paths within the Workflow panel." · "A visual Logic Map displaying complex branching paths for a form." · "Using the @ symbol to display a dropdown menu of recallable information variables." · "Workspace banner notification warning that the account has reached its monthly response limit." · "Public respondent view displaying a message that the form is closed because the creator has hit their response limit." · "A detailed tracking bar showing responses collected versus total limit alongside the monthly cycle reset date." These describe *what the screenshot demonstrates*, sometimes including the content of the message in the image — which is the right call when the string itself is only in the image.
- Marketing-site alt text is weaker and inconsistent: "ZoDigital branded web form mockup asking for email with creative collage illustrations" (good) sits beside dozens of integration logos with **empty alt on the image but no adjacent text label** in the fetched markup, and several decorative shine/background images with empty alt (correct).
- Nav icons carry functional alt: "By workflow icon", "Tools icon", "Templates icon", "Support icon", "Company icon", "Blog icon". These are decorative and should arguably be empty; naming them means a screen reader announces "By workflow icon" before "Platform", which is noise.
- **No public accessibility statement, VPAT, or WCAG conformance claim was found** on any page inspected, and accessibility does not appear as a help category, a pricing row, or a footer link. `[absent]` For a product whose output is filled in by the general public — including under employment and healthcare use cases it actively markets — this is the most consequential gap in the file. Compare Tally (178), a much smaller company, which publishes a full accessibility article naming its own unfixed defect.
- The `Signature` question type offers "type, draw or upload" — three input modes for one answer, which is good practice — but no accessibility statement covers it. Tally explicitly documents its signature field as *not accessible*; Typeform says nothing either way.

**Negative findings, recorded honestly**

- **Two contradictory price tables served on one pricing page** (cards vs compare-table sticky header)
- **`(Save 30%)` toggle label does not match the card arithmetic** (~28–29.6%)
- **Unreplaced Webflow placeholder text is live on the pricing page:** `This is some text inside of a div block.` appears **seven times**, as the last bullet of the feature list on every plan card
- **`best-in-class Al` and `Clarify with Al`** on the Talent card — lowercase L instead of capital I in "AI", twice
- **Webflow default form messages shipped unedited:** `Thank you! Your submission has been received!` and `Oops! Something went wrong while submitting the form.` — see T8
- **Two asterisked comparison rows with no footnote**
- **No FAQ, no cancellation policy, no refund policy, and no tax disclosure on the pricing page**
- `Sign in` (help centre) vs `Log in` (main site) for the same action
- `Submit a request` and `Contact support` for the same destination on one page
- `View integrations` vs `See all integrations` for the same destination
- `Ending` (glossary) vs `End Screen` (question types) vs `endings` (pricing) for one object
- `Question reference` / `refs` / `Block references` in one article
- `Workflow tab` (announcement) vs `Workflow panel` (glossary)
- `respondent` vs `responder`
- `typeform` vs `form` — live drift away from the coined noun
- `Hidden Fields` still live in URL slugs and on the pricing page after the rename to `URL parameters`
- Spanish title of the completion-rate article uses `tasa de conversión` (conversion rate) for what the English defines precisely as completion rate
- Typeform's FAQ says duplicate-submission prevention does not exist; Tally's comparison table prices it at $379/mo. Unresolved.
- Help-centre `Getting started` scope line describes the whole help centre, defeating its own routing purpose
- Nav suffix inconsistency: five `builder`, four `maker`, no rule
- `Contact sales→` with no space before the arrow

---

## Transferable patterns

1. **State the metric, then define the denominator in the next sentence.** "Typeforms have an average completion rate of 47%. By completion rate we mean the percentage of people who completed the typeform (hit the Submit button at the end), vs those who opened the typeform." Any conversion, completion or success-rate figure shown to a user or a stakeholder should carry its denominator adjacently. Typeform does this once, in a help article, and fails to do it three times on its own home page — the contrast is the lesson.
2. **Ship `Statement` as a first-class form element.** In any stepped flow, explanatory copy needs somewhere to live that is not a field label and not a modal. Naming the no-input element makes interstitial content designable rather than improvised. Directly applicable to checkout interstitials, consent explainers, and onboarding pauses.
3. **Split consent into "agree to text" and "tick a box".** Typeform ships `Legal` (a disclaimer to be agreed with, made binding via `Required`) and `Checkbox` (a single consent tick) as separate types. Most products collapse these, then write one control that serves neither. The line — *is there text the user is agreeing to?* — is the right one and it maps cleanly onto PayPal's billing-agreement and terms-acceptance patterns.
4. **Name the limitation, then route to the specific workaround for the case the reader is about to hit.** The `Number` type documentation says positive whole numbers only, then immediately says "For ZIP codes you can use the Short Text question type with Answer validation." Pre-empting the single most common failure by name, in the same paragraph as the constraint, is cheaper than the support ticket. (Tally independently arrived at the same fix for the same field, which suggests the constraint itself is the real bug.)
5. **Rename with a bridge, and update the commercial page first.** `URL parameters (formerly Hidden Fields)` is the correct transitional title pattern. Typeform's failure mode is instructive: the glossary and trending topic have the new name, the URLs and the pricing page still have the old one. The page a prospect reads is the page that should change first, not last.
6. **Write the reconciling article when the state name and the user's experience diverge.** `My typeform shows as 'closed', but I didn't close it!` bridges the euphemism (`Private mode`) and the symptom (`closed`). Pair it with the deliberate version of the same action (`How do I close my typeform?`) so the confused user leaves competent.
7. **Explain why the maintenance window is longer than the expected impact.** "We expect the actual interruption to last only a few minutes. The wider two-hour window includes the upgrade, validation, and rollback contingency." One sentence that converts an alarming number into a reassuring one, and discloses that a rollback plan exists.
8. **Publish the glossary before the task articles.** `A Typeform glossary` is the third article in the getting-started curriculum, before the FAQ and before any how-to. A user who does not know what a `panel` or an `Ending` is cannot follow a task article. Condition: only works if the vocabulary is actually disciplined — a glossary over an inconsistent lexicon documents the inconsistency.
9. **Cap the AI follow-up, and disclose the cap in the feature's own definition.** `Clarify with AI` generates "up to two personalized clarification questions". The bound is in the type description, before anyone builds with it.
10. **Separate "can load" from "can submit" on the status page.** A respondent who opens a form but cannot submit is in a worse failure than one who cannot open it. Typeform's status page distinguishes `Open/Load forms` from `Submit responses`. Applies to any checkout or payment status page.

## Caveats & gaps

- **Pricing page is partially unreadable by machine.** Prices are split across DOM lines by an animated digit counter, so figures are reconstructed from fragments. Comparison-table checkmarks are all identical unlabelled `.svg` images, so per-plan feature availability **could not be mapped reliably** — only row labels and explicit text values (numbers, `Unlimited`, `Not available`, `Bespoke`, `Enterprise only`) are trustworthy. The visible tabs name four plans while most rows emit eight values; the mapping in T10 is **inferred from card data and flagged as such**.
- **The page ends mid-table** after `Choose your preferred data center (US or EU)` with no footer captured. Anything below that row — including a possible FAQ — is missing from this capture rather than confirmed absent. The T12 finding that the pricing page has no FAQ should be re-verified in a browser-rendered pass.
- **The `/forms` product page timed out** and was not harvested. It is the most likely home of additional form-writing guidance and question-type marketing copy.
- **`typeform.com/surveys/question-types/`** is linked from the Question types article as the writing-guidance destination and was **not fetched**. For a brief centred on "how to write a form question", this is the most significant unharvested page in the file.
- **The `What is Logic` article timed out** twice. The logic vocabulary in T13 is assembled from the glossary, the FAQ, the pricing table, article titles, and one search-result snippet. **The list of question types incompatible with logic is sourced from a search snippet, not from a fetched page** — treat it as lower-confidence than everything else in this file.
- **No live in-product strings observed.** Every question-type name, setting name, panel name and state name is `[documented]` — quoted inside help articles describing the UI. `Argh` (error heading) and the respondent-facing limit message are both known to exist but were not seen; the latter is in an image.
- **Empty states, validation messages, and toast copy are entirely unavailable.** T8 is empty except for a third-party boilerplate defect.
- **No accessibility statement found.** T14's accessibility findings are based on observed alt text and DOM structure only. Absence of a statement is recorded as `[absent]`, not as absence of accessibility work.
- **The renaming evidence in T13 is a snapshot of a migration in progress** and will be stale quickly. Re-verify before citing.
- **No form was submitted, no demo typeform was completed, and no account was created**, so the respondent-side experience — the actual one-question-at-a-time interface this product is famous for — was **not observed at all**. Everything in T5 about the respondent experience is the company's own description of it.

## Sources

1. https://www.typeform.com/
2. https://www.typeform.com/pricing
3. https://help.typeform.com/hc/en-us
4. https://help.typeform.com/hc/en-us/categories/360001979032
5. https://help.typeform.com/hc/en-us/sections/37272561379476-Typeform-basics
6. https://help.typeform.com/hc/en-us/articles/360051789692-Question-types
7. https://help.typeform.com/hc/en-us/articles/360061281111-A-Typeform-glossary
8. https://help.typeform.com/hc/en-us/articles/360029423551-FAQ
9. https://help.typeform.com/hc/en-us/articles/360040197372-Response-limits
10. https://help.typeform.com/hc/en-us/articles/360029615911-What-s-the-average-completion-rate-of-a-typeform
11. https://status.typeform.com
