# 178. Tally

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Free-first, document-style form builder (Notion-like block editor) |
| Primary URL | https://tally.so/ |
| Corpus rank | 178 |
| Benchmark strength (source list) | Low-friction form-building labels |
| Locale / market observed | en (Belgium-based, EU-hosted; "45+" / "50+" / "40+" supported respondent languages claimed) |
| Platform observed | Web (marketing, pricing, Notion-backed help centre, Better Stack status page) |
| Regulatory posture | GDPR named repeatedly and in detail; EU hosting and EU data storage stated as product properties; no WCAG/ADA certification, explicitly disclaimed |
| Auth state | Unauthenticated public surfaces only. **No form was submitted.** |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Full for the categories this brief prioritises. Tally's help centre is Notion-rendered and fully server-side, so help-article *bodies* were readable — unusually for this corpus, T5, T6, T7 and T13 rest on article text rather than titles alone. Not harvested: the features page, templates, changelog, fair-use policy, and the remaining comparison guides. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://tally.so/ | Hero, capability blocks, four-question FAQ |
| Pricing | https://tally.so/pricing | Free feature list, Pro and Business, same four-question FAQ |
| Help centre home | https://tally.so/help | Seven-section IA with scope lines |
| Input blocks | https://tally.so/help/input-blocks | **Primary T5/T13 source. 21 named blocks with slash commands.** |
| How to name question fields | https://tally.so/help/how-to-name-fields | The label-vs-title-vs-placeholder model |
| Conditional logic | https://tally.so/help/conditional-form-logic | Full logic vocabulary, six named actions, FAQ |
| FAQ | https://tally.so/help/faq | 26 questions in 7 sections, answers present |
| Accessibility | https://tally.so/help/accessibility | Published a11y position with a named unfixed defect |
| Tally vs Typeform | https://tally.so/help/tally-a-free-typeform-alternative | 57-row competitive feature table |
| Status | https://status.tally.so | Three components |

---

## T1 Navigation & IA labels

**Global nav — four items, and three of them are actions** `[observed]`

`Pricing` · `Log in` · `Sign up` · `Create form`

**A four-item top nav with no `Product`, no `Solutions`, no `Resources` menu.** Compare Typeform's three multi-column panels and Framer's seven-group footer. Tally's entire marketing IA is one link (`Pricing`) and three doors. The rest of the site is reachable only from the footer.

**`Create form` sits beside `Sign up` as a peer CTA.** That single placement is Tally's whole positioning: the product's differentiator (no account required) is expressed as a nav item, not as a marketing claim. See T3.

**Footer — five groupings** `[observed]`

| Grouping | Contents (verbatim) |
|---|---|
| `Product` | `Features` · `Pricing` · `Customers` · `What's new` · `Roadmap` · `Feature requests` · `Templates` · `Integrations` · `AI info` · `Words from our users` · `Status` |
| `Help` | `Get started` · `How-to guides` · `Help center` · `Contact support` · `Hire an expert` · `Report abuse` |
| `Company` | `About us` · `Blog` · `Media kit` |
| `Resources` | `Join the community` · `Referral program` · `API docs` · `MCP server` · `Fair use policy` · `GDPR` · `Terms & Privacy` |
| `Compare` | `Typeform alternative` · `Jotform alternative` · `Google Forms alternative` · `Best free online form builders` |

Four things worth noting.

**`Roadmap` and `Feature requests` are footer links on every page.** Not "Coming soon", not a changelog buried in docs — a public roadmap and a public request board, both one click from anywhere. `What's new` sits beside them. Three separate surfaces for past, present and future product change, all in the `Product` grouping rather than in `Resources`.

**`Words from our users`** is the label for the reviews page (`love.tally.so/reviews`). Not "Testimonials", not "Reviews" — a plain-English possessive that describes the artefact rather than naming the marketing category.

**`Fair use policy` and `GDPR` are top-level footer links**, sitting with `Terms & Privacy` rather than being folded into it. For a product whose entire proposition is "unlimited, free", the fair-use policy is load-bearing and Tally surfaces it accordingly — it is linked from the hero, the pricing page, and both FAQs. See T10.

**`Compare` is a footer grouping of four links, three of them phrased as `<Competitor> alternative`.** The labels are search queries. Compare Framer's 17-competitor comparison list, which uses bare product names; Tally's are the literal string a user types.

**Footer sign-off** `[observed]`: `Made and hosted in the EU 🇪🇺` above `© 2026 Tally BV`. Provenance as a footer badge.

**Help centre — seven sections, each with a scope sentence** `[observed]`

| Section | Scope line (summarised; verbatim where short) |
|---|---|
| `Get started` | "Tally is a new type of form builder that **works like a doc**… Just type `/` in your form to get started!" |
| `Features` | "Creating forms with Tally is **free**. 99% of our features are available to all users **without limits**…" |
| `Integrations` | "Connect Tally to your favorite tools with our powerful integrations, and automate your workflows." |
| `Guides` | "Take your Tally skills to the next level with our (advanced) guides and tutorials." |
| `Plans & pricing` | "99% of Tally's features are available to all users for free and without limits…" |
| `Resources` | "Discover what we're up to, where we're headed and how we compare to others…" |
| `FAQ` | — |

**Two of the seven scope lines lead with the pricing claim rather than with what the section contains.** `Features` opens "Creating forms with Tally is free"; `Plans & pricing` opens "99% of Tally's features are available to all users for free". The free-ness is repeated so insistently that it displaces navigational information in the section descriptions. That is a positioning decision leaking into IA copy — recorded as a finding, not a defect, because for this product the pricing *is* the differentiator.

**The `99%` figure is the house statistic** and appears three times across the help centre and the comparison page. An unusual number to pick: precise enough to sound measured, vague enough to be unfalsifiable, and it quietly admits that something is paywalled.

**Sub-section headings inside `Get started`** `[observed]`: `Start here` · `Make it your own` · `Share your form` · `Settings`.

`Make it your own` is a possessive second-person phrase used as a category label — the same register as the marketing headline `Make forms uniquely yours`. The help IA and the marketing IA share vocabulary, which Typeform's do not.

**Article titles inside `Start here`, in order** `[observed]`: `Create your first form` · `Keyboard shortcuts` · `Start with a template` · `Create a Thank You page` · `How to name fields`.

**`Keyboard shortcuts` is the second article in the getting-started list**, before templates and before naming. In a keyboard-driven, slash-command editor, that ordering is correct and almost nobody does it.

**Help-centre secondary nav, present on every help page** `[observed]`: `Contact support` · `What's new` · `Roadmap` · `Feature requests`. The roadmap and request board are one click from every help article — so a user who fails to find an answer is routed to *ask for the feature* as a peer of *contact support*.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The simplest way to create forms`
> Subhead: "Say goodbye to boring forms. Meet Tally — the free, intuitive form builder you've been looking for."
> CTA: `Create a free form`
> Under the CTA: `No signup required`

**`The simplest way to create forms` is a superlative claim with no qualifier**, and the subhead immediately does two things: names the enemy (`boring forms`) and asserts a prior relationship (`you've been looking for`). The em-dash construction (`Meet Tally — the free, intuitive form builder`) puts the brand and the category definition in one clause.

The operative string is the smallest one: **`No signup required`, three words, directly under the primary CTA.** It removes the single largest objection at the single moment it arises. Compare Typeform's `Get started—it's free` (which still means "make an account") and Framer's `Get started for free`. All three say free; only Tally says *you don't have to give us anything*.

**Section headers use a consistent two-or-three-word adjectival frame** `[observed]`

`A form builder like no other` · `Simple but powerful` · `Craft intelligent forms` · `Make forms uniquely yours` · `Share with your audience` · `Connect your favorite tools` · `Designed for you` · `Build stunning forms for free`

Eight headers. Six begin with a verb or an adjective; none is a question; none names a feature. The nouns are all `forms` or `form builder`. **Tally's headline vocabulary is monomaniacally about the artefact**, where Typeform's has drifted to `data`, `insights`, `revenue growth` and `customer lifecycle`.

**The core capability claim is stated as an analogy, twice** `[observed]`

> `Just start typing` — "Tally is a new type of online form builder that works like a text document. Just start typing on the page and insert blocks same as Notion."

> Help centre: "Tally is a new type of form builder that **works like a doc**."

**Tally names a competitor's product (Notion) as the explanatory reference for its own interaction model**, on its own home page, unprompted. That is a confident and unusual move — it borrows an established mental model rather than teaching a new one, at the cost of anchoring the product to someone else's brand. It is reinforced by a pull-quote Tally chose to feature: *"Tally is doing to forms what Notion did to docs & sheets."*

**Pricing headline** `[observed]`: `Build beautiful forms for free`, with the objection named in the subhead: "Paywalls getting in the way? Not anymore." The same sentence pair appears on the home page under `Unlimited forms and submissions for free`. **`Paywalls getting in the way? Not anymore.` is a question-and-answer headline aimed squarely at a competitor's pricing model** and it is reused verbatim across two pages.

**Upgrade section header** `[observed]`: `Do more with Tally` — "Upgrade to access advanced features designed for growing teams and creators."

`Do more with Tally` is the gentlest possible upsell header: no urgency, no scarcity, no loss framing. For a product whose entire brand is *we are not going to paywall you*, the upgrade copy has to be quiet or the brand breaks. It is.

**Origin story shipped as an FAQ answer** `[observed]`: "Born out of frustration with expensive form builders, Tally offers unlimited forms and submissions for free…". The founding grievance is the first clause of the first FAQ answer on two pages.

**Social proof lines** `[observed]`: `Powering 500,000+ teams at the world's best companies` (home and pricing) vs `Join 1M+ teams` (pricing meta description). **Two different user counts on one page's markup** — see T14.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Create form` | Global nav, every page | Peer of `Sign up` |
| `Sign up` | Global nav | |
| `Log in` | Global nav | |
| `Create a free form` | Hero (×2), final CTA block | With `No signup required` beneath |
| `Get started` | Pricing, both paid plans; final CTA | Both Pro and Business use the identical label |
| `Browse templates` | Home, templates section | |
| `Open in new tab` | Home, Tally-links demo | A demo affordance, not a marketing CTA |
| `Click me` | Home, popup demo | Deliberately content-free — the demo *is* the message |
| `And many, many more` | Pricing, end of free-feature list | Link, not button; comma-doubled intensifier |
| `Contact support` | Footer, help nav | |
| `Hire an expert` | Footer | |
| `Report abuse` | Footer, help centre | |
| `Try out Tally, it's free` | Comparison page, inline | Comma splice, apostrophised |
| `Create a free form` | Comparison page, foot | Consistent with home |
| `Browse all templates` | Comparison page | **vs `Browse templates` on home — near-duplicate** |
| `→ All guides` / `→ All input blocks` / `→ All features` / `→ All integrations` | Help centre, per sub-section | Arrow-prefixed, object always named |
| `Get updates` / `Subscribe` | Status page | |

**The `→ All <object>` pattern in the help centre is disciplined**: `→ All guides`, `→ All input blocks`, `→ All features`, `→ All integrations`, `→ All automation tools`, `→ All Notion guides`, `→ All Pro features`, `→ All comparison guides`, `→ Discover Tally Business`. Nine instances, one frame, the object always named. **Zero instances of bare `Learn more` or `See more` anywhere in the harvest.** This is better CTA discipline than either Framer or Typeform manage.

**`Get started` is used for both Pro ($24/mo) and Business ($74/mo)** and both resolve to `/signup`. Two price points, one label, one destination — so the CTA does not carry the plan choice. Compare Typeform's `Get Basic` / `Get Plus` / `Get Business`, which does. Tally's is weaker here.

**`Click me` as a live demo CTA** is the most Tally-ish string in the file: the popup-form demo on the home page is triggered by a button whose label is a joke about being a button. It works because the thing being demonstrated is *how little setup a popup needs*.

## T4 Onboarding & getting-started

**Onboarding is collapsed into a single instruction, repeated everywhere** `[observed]`

> `Just start typing`
> "Just type `/` in your form to get started!"
> "**Type** `/` **to open the list of all input blocks.**"
> "Just start typing, you don't even need an account to try it out."

**The entire onboarding model is one keystroke, and Tally states it four times across four pages in near-identical words.** There is no numbered how-it-works, no step count, no progress language, and no tour. `[absent]` for conventional onboarding sequences — and the absence is the design.

**The no-account claim is repeated with escalating specificity** `[observed]`:

- Nav: `Create form`
- Hero: `No signup required`
- Final CTA: "It's as simple as one-two-three, and guess what? You don't even need an account to try it out!"
- FAQ: "You can start creating your first form right away—no sign up needed!"
- Comparison page: "Just start typing, you don't even need an account to try it out."

`It's as simple as one-two-three` is the only place a step count appears, and **there is no one-two-three anywhere on the site** — the idiom is used as a synonym for "easy", not as a promise of three steps. A user who reads it and looks for three steps will not find them. Minor, but it is a number-shaped claim with nothing behind it.

**Getting-started curriculum, in the order the help centre lists it** `[observed]`: `Create your first form` → `Keyboard shortcuts` → `Start with a template` → `Create a Thank You page` → `How to name fields`.

**`Create a Thank You page` is the fourth article**, before field naming. Tally teaches the *ending* before it teaches the labelling — which follows from the editor model, where a Thank You page is just another page and the fastest way to feel you have finished something.

**Keyboard shortcuts are documented inline as onboarding, not just in a reference article** `[observed]`, from the conditional-logic article:

- `cmd/ctrl` + `shift` + `L` — add a conditional logic block
- `ctrl/cmd` + `shift` + `R` — make selected questions required
- `ctrl/cmd` + `shift` + `H` — hide selected blocks

Each is rendered in a keyboard-icon callout at the point of use. **Note the inconsistency: `cmd/ctrl` in one callout, `ctrl/cmd` in the two others**, on the same page.

**Slash commands are the real onboarding vocabulary** — see T5. There are 21 of them and they are documented as the primary way to do everything.

**A progressive-disclosure affordance is documented with its trigger threshold** `[observed]`:

> "When working on a long form, a content table on the right side of the builder lets you jump between pages and fields instantly. **It appears automatically once your form has 12 or more fields.**"

Naming the exact threshold at which a UI element appears is good documentation and rare. A user who has 11 fields and no table of contents now knows why.

## T5 Form & field labels

**This is the priority section for this product, and Tally is the deliberate counter-example to 177 Typeform.** Everything below is `[documented]` from the Input blocks, How-to-name-fields and Conditional-logic articles, which quote the builder's own strings.

### The organising concept: a form is a document made of blocks

> "Your Tally form is built out of **questions** and **input blocks** to collect answers."

Two nouns, split by function. `question` = the thing you ask. `input block` = the control that collects. **Tally never uses "question type" as a compound noun**, which is exactly where Typeform's vocabulary sits. See the comparison table below.

The consequence is that Tally's taxonomy is a list of *controls*, not a list of *questions*. `Short answer` is a control. Typeform's `Short Text` is a question type. The difference sounds cosmetic and is not: Typeform's naming implies one per screen; Tally's implies many per page, assembled.

### The complete input-block taxonomy — 21 named blocks in 9 groups

Every block name and every slash command below is verbatim.

**Group: `Text and number`**

| Block | Slash command | Documented purpose (summarised) |
|---|---|---|
| `Short answer` | `/short` | "personal data such as a name or address, or other short answers" |
| `Long answer` | `/long` | "long form answers" |
| `Number` | `/number` | "numerical inputs, such as a house number" |

**Group: `Contact info`**

| Block | Slash command | Note |
|---|---|---|
| `Email` | `/email` | "correctly formatted and verified email addresses" |
| `Phone number` | `/phone` | "correctly formatted phone numbers" |
| `Link` | `/link` | "URLs of web pages" |
| `Electronic signature` | `/signature` | "simple electronic signatures" |

**Group: `Choices`**

| Block | Slash command | Note |
|---|---|---|
| `Multiple choice` | `/multiple` or `[a]` | "By default, respondents can only choose **one answer**. Open the block settings `::` to allow multiple answers." |
| `Dropdown` | `/dropdown` or `[v]` | "a long list of answer options, from which your **respondents can choose one**" |
| `Checkboxes` | `/checkbox` or `[]` | "a range of answer options or a consent checkbox. Respondents can choose **multiple answers**." |
| `Multi-select` | `/multi-select` | "select **multiple answer options** from a dropdown menu" |
| `Matrix` | `/matrix` | "input data in a grid-like format… can be used to create a Likert scale" |

**Group: `Date & Time`**

| Block | Slash command | Note |
|---|---|---|
| `Date` | `/date` | Format shown as a live example: `Nov 30, 1988` |
| `Time` | `/time` | "24-hour format, such as `13:30`" |

**Group: `Rating & Ranking`**

| Block | Slash command | Note |
|---|---|---|
| `Rating` | `/rating` | "a simple and visual way of rating answers with ⭐️" |
| `CSAT` | `/csat` | "Customer Satisfaction question… on a 1–5 scale, with your average CSAT score updating live in the Insights tab" |
| `Linear scale` | `/linear` | "numeric answers on a scale. **For NPS or customer satisfaction surveys, use the dedicated NPS block below.**" |
| `NPS` | `/nps` | "Net Promoter Score question. Tally automatically calculates your NPS score… and splits responses into Promoters, Passives, and Detractors" |
| `Ranking` | `/ranking` | "order the answer options according to their own preferences" |

**Group: `File upload`** — `/file` — "let respondents attach files… often used for collecting resumes, feedback screenshots or portfolios"

**Group: `Payments`** — `/payment` — "build payment forms in minutes using Stripe integration… without a single line of code"

**Group: `reCAPTCHA`** — `/bot` — "protect your forms from spam and bots"

**Group: `Embeds`** — `/image` and `/embed` — images (upload, URL, or Unsplash) and "almost any online content… from video and audio players to maps, calendars, and PDFs"

**Structural blocks documented elsewhere:** `/title` (Title block) · `/label` (Label block) · `/heading` (three sizes) · `/page` (page break) · `/logic` (conditional logic block).

### The slash-command layer is the interesting artefact

**Every block has a memorable, guessable command, and three have symbol aliases:** `[a]` for multiple choice, `[v]` for dropdown, `[]` for checkboxes. The symbols are **visual ASCII pictures of the control** — `[]` is an empty checkbox, `[v]` is a dropdown chevron in brackets, `[a]` is a lettered option. This is a nano-notation for form controls and it is charming, memorable, and undocumented as a system anywhere (Tally lists the aliases inline per block and never explains the scheme).

The one command that breaks the naming rule is **`/bot` for `reCAPTCHA`.** Every other command is an abbreviation of the block name; `/bot` names the *problem* rather than the control. Arguably better — a user looking for spam protection types the thing they're afraid of, not the Google product name.

### Tally vs Typeform: the same widget, two vocabularies

This is the artefact the brief asked for. Both products ship broadly the same controls; the naming diverges systematically.

| Underlying control | **Tally** | **Typeform** | Comment |
|---|---|---|---|
| One-line free text | `Short answer` | `Short Text` | Tally names the *answer*, Typeform names the *data* |
| Multi-line free text | `Long answer` | `Long Text` | Same split |
| Numeric input | `Number` | `Number` | Identical |
| Email | `Email` | `Email` | Identical |
| Phone | `Phone number` | `Phone Number` | Identical but for casing |
| URL | `Link` | `Website` | **Two different plain-English words for one field**; both avoid "URL" |
| Signature | `Electronic signature` | `Signature` | Tally is more formal |
| Pick one from a few | `Multiple choice` | `Multiple Choice` | Identical; both default to single-select despite the plural name |
| Pick one from many | `Dropdown` | `Dropdown` | Identical |
| Pick several, visible | `Checkboxes` (plural) | `Checkbox` (singular) | **Singular/plural split with different meanings — see below** |
| Pick several, collapsed | `Multi-select` | — | **Tally-only** |
| Pick one, images | — | `Picture Choice` | **Typeform-only as a type**; Tally does it via checkbox settings ("add images") |
| Binary | — | `Yes/No` | **Typeform-only** |
| Grid / Likert | `Matrix` | `Matrix` | Identical, and both name Likert in the description |
| Date | `Date` | `Date` | Tally shows one format; Typeform offers three orderings |
| Time | `Time` | — | **Tally-only** |
| Star-type rating | `Rating` | `Rating` | Identical |
| Numeric scale | `Linear scale` | `Opinion Scale` | **The sharpest divergence.** Tally names the shape; Typeform names the thing measured |
| NPS | `NPS` | `NPS®` | Typeform carries the ® into the UI name |
| CSAT | `CSAT` | — | **Tally-only as a dedicated block** |
| Ordering | `Ranking` | `Ranking` | Identical |
| File | `File upload` | `File Upload` | Identical |
| Payment | `Payments` | `Payment` | Plural vs singular |
| Anti-spam | `reCAPTCHA` (`/bot`) | (table row) `Prevent spam submissions with reCAPTCHA` | Tally ships it as a block; Typeform as a setting |
| Consent tick | `Checkboxes` (settings: "a consent checkbox") | `Checkbox` | See below |
| Legal disclaimer | — | `Legal` | **Typeform-only** |
| Prose with no input | (`/text`, `/heading`, `/title`) | `Statement` | Typeform names it; Tally treats it as document formatting |
| Intro screen | — | `Welcome Screen` | **Typeform-only** |
| End screen | `Thank You page` | `Endings` / `End Screen` | Tally uses the everyday phrase |
| Scheduling | (via `/embed` Calendly) | `Scheduler` | Typeform has a first-class type |
| AI follow-up | — | `Clarify with AI` | **Typeform-only** |
| Respondent asks the form | — | `FAQ with AI` | **Typeform-only** |
| Group of questions | (pages, `/page`) | `Question Group` | Different structural models |

**Five findings from this comparison.**

**1. `Checkbox` singular vs `Checkboxes` plural denotes different things in the two products.** Typeform's `Checkbox` is explicitly "a single checkbox" for consent. Tally's `Checkboxes` is a multi-select group that *can* be used for consent ("a range of answer options or a consent checkbox"). So a designer moving between the two products encounters near-identical labels with non-identical behaviour — the classic false friend. **Typeform is right here:** the consent tick and the multi-select group are different jobs and deserve different names.

**2. `Linear scale` vs `Opinion Scale` is the cleanest illustration of the two naming philosophies.** Tally names the *control's shape* (a line of numbers). Typeform names the *thing being measured* (an opinion). Tally's is more accurate — the control is used for quantities as well as opinions — and less helpful to someone who doesn't yet know what control they want. Tally then has to compensate with an inline disambiguator inside the block description: "For NPS or customer satisfaction surveys, use the dedicated NPS block below." **A cross-reference inside a field-type description, pointing at a better field type.** That sentence exists because the name doesn't do enough work.

**3. `Link` vs `Website` for the same field.** Both products deliberately avoided "URL". They landed on two different everyday words, one naming the object (`Link`), one naming the destination (`Website`). Neither is wrong; the existence of the divergence is the point.

**4. Tally has no `Statement`, no `Welcome Screen`, no `Legal`.** Because the editor is a document, prose is just prose — you type it. Typeform has to name these as block types because in a one-question-per-screen model, non-question content has nowhere else to live. **The interaction model determines how much vocabulary the product needs.** Tally's document model absorbs three of Typeform's named types into plain typing, which is a real reduction in things the user must learn.

**5. Tally ships `CSAT` and `Time` as dedicated blocks; Typeform does not.** And Typeform ships `Yes/No` and `Picture Choice`; Tally does not. Each product has promoted to first-class status the controls its own users ask for most. The taxonomy is a map of the customer base.

### The label / title / placeholder model — Tally's best documentation

`[documented]` from `How to name question fields`. This is the most directly transferable piece of form-content guidance in the batch.

**Tally distinguishes four naming objects:**

| Object | What it is | Who sees it |
|---|---|---|
| **Question title** | Shown in the `Summary` and `Submissions` tabs; becomes the column header in the results table | Respondent (on the form) and operator (in results) |
| **Title block** (`/title`) | One way to create a question title | Respondent |
| **Label block** (`/label`) | Another way to create a question title | Respondent |
| **Placeholder text** | Typed directly into the input block; also creates a question title if nothing else does | Respondent |
| **Question field name** | "These aren't visible to respondents but can help you better manage and locate questions for answer piping and mapping out Tally fields when connecting to integrations." | Operator only |

**Four ways to produce a question title are documented as equivalent** `[observed]`:

> "Question titles are automatically created in your forms when you:
> - Insert a **combination** of a question and an input block
> - Add a **Title block** above your input block (Type `/title`)
> - Add a **Label block** above your input block (Type `/label`)
> - Add a **placeholder text** in your input block"

**The failure mode is named, in the string the user will see** `[observed]`:

> "When you don't use any of the question titles mentioned above, your question will be named **'Untitled'** in your form submissions."

`Untitled` is a real observed default string, and Tally documents it as a consequence rather than as an error — *if you skip this, your data column will be called Untitled*. **The argument for labelling is made in terms of the operator's own downstream pain, not in terms of correctness or accessibility.** That is a more persuasive argument to a person building a form in a hurry, and it is the one Tally leads with (the meta description reads: "Add a label, heading 3, or placeholder to avoid untitled fields in your form results, making your submissions much easier to read, search, and export later.").

**The required-field marker and its position are both documented** `[observed]`:

> "If you make the question mandatory, an asterisk `*` will appear next to the title.
> If you prefer the asterisk to be shown next to the answer block instead, simply insert your chosen answer block… and mark it as mandatory. Then, add a heading above the answer block by typing `/heading`…"

**The asterisk's placement is a user-controllable consequence of block structure**, not a setting. Title + input = asterisk on the title. Heading + input = asterisk on the input. This is an unusually honest piece of documentation: it explains a visual outcome by explaining the object model that produces it, and offers the workaround rather than pretending the default is the only option.

**A structural permission, stated to prevent a wrong assumption** `[observed]`:

> "You can add a text block between the question title or label and the question itself without breaking the connection between both."

The user's fear (inserting help text will orphan my label) is named and dismissed. One sentence, in a callout. **This is the sentence that lets people write hint text.**

**Renaming has three distinct scopes and the article separates them:** rename the *field name* (internal), rename the *question title* (respondent-facing), rename the *form*. Plus a warning: "Renaming a question in your Tally dashboard will not change or add a question title in your form and does not affect your active integrations." An explicit statement of what a rename does *not* do.

### Placeholder text as a documented capability

`[observed]`, in a callout on the Input blocks page: "You can add placeholder text by simply typing into any input block."

And in the Accessibility article, the counter-advice `[observed]`: **"Write clear labels: don't rely on placeholder text alone; always give each field a visible label."**

**Tally documents placeholder-as-title as a feature and then tells you not to use it that way.** Both statements are correct — the builder permits it, the accessibility guidance forbids relying on it — and they sit on two different pages with no cross-reference. Recorded as an unresolved tension rather than a defect; the right fix is a line in the Input blocks callout pointing at the a11y guidance.

### Validation and constraints

`[documented]`

- Character limits: "Open the block settings `::` of your input block to set a minimum or maximum number of characters." (FAQ)
- Choice limits: "Open the block settings `::` to add images or set a minimum or maximum number of choices." (Checkboxes)
- Date constraints: "Open the block settings `::` to set specific dates or date ranges."
- Scale configuration: "Open the block options `::` to adjust the scale steps and labels."

**`::` is the universal block-settings affordance and it is named in every single block description.** One symbol, one meaning, repeated eleven times across the input-blocks article. Compare Typeform, where settings live in a right-hand `Question` panel that must be described in prose each time.

**Note the drift:** `block settings ::` appears eight times, `block options ::` twice, and `⋮⋮` / `⋮` / `:` are used for the same or adjacent menus in the naming and logic articles (`click ⋮⋮ to open the block menu`, `Click : next to the logic block`, `Click ⋮ next to a condition`). **Four different glyphs for block-level menus across three articles.** Recorded as a defect.

**The leading-zero problem, documented** `[observed]`:

> `How do I collect a number input starting with zero?` — "In order to support leading zeros you need to use a `Short text` input instead of a `Number` input."

**This is the same documented workaround Typeform gives for ZIP codes** (`use the Short Text question type with Answer validation`). Two independent products, same field type, same failure, same fix, both documented as FAQ entries. When two competitors both have to write the article, the field type is wrong.

Note also: the FAQ says `Short text`; the Input blocks article says `Short answer`. **Tally's own field-type name is inconsistent between two help pages.**

### Save-and-resume

`[observed]`, a named form setting with its full path given:

> "When a respondent resumes answering a Tally form in the same browser, the previous answers will be saved… Saving answers for later is a form setting available in `Settings` → `Behavior` → `Save answers for later`."

Three-level settings path quoted, and the setting name (`Save answers for later`) is a full verb phrase rather than a noun. Compare Typeform, which does the same thing automatically with a documented 15-day local-storage window. **Tally makes it an opt-in setting with a plain-English name; Typeform makes it a default with a documented expiry.** Two reasonable answers; Tally's is more discoverable, Typeform's is better for the respondent who doesn't know it exists.

### The conditional-logic vocabulary

`[observed]` from the Conditional logic article — the second-richest page in this file.

**The definition, and the payoff stated in one sentence:**

> "Conditional logic lets your form adapt in real time based on how someone answers. Show or hide questions, skip irrelevant pages, jump to a custom thank you page, or route respondents down a completely different path — all based on their responses. **The result is a smarter, shorter form that feels personal instead of generic.**"

`smarter, shorter … personal instead of generic` — four adjectives, one contrast. The benefit is stated after the mechanism, which is the right order for a builder-facing feature.

**The condition-combining vocabulary:**

| String | Meaning as documented |
|---|---|
| `When` | The dropdown that combines multiple conditions |
| `all` | "every condition must be true (an **AND rule**)" |
| `any` | "at least one condition must be true (an **OR rule**)" |
| `Then` | The dropdown containing the six actions |
| condition group | Wrap conditions; "Each group has its own `all`/`any` setting" |

**`When all match` / `When any match`, with the Boolean operator glossed in parentheses, is the pattern to copy.** Tally leads with the plain word (`all`, `any`), then gives the technical name (`AND rule`, `OR rule`), then gives a worked example: *"respondents from 'Germany' who are older than 18"* for `all`, and *"someone who selected 'Consulting' or 'Freelance'"* for `any`. Plain word → technical word → concrete example, in that order, for both branches. Nesting is explained with a compound example: **"(Age is under 18) AND (Country is Germany OR France)"** — rendered with actual parentheses so the precedence is visible.

**Six named actions in the `Then` dropdown** `[observed]`:

1. `Jump to page`
2. `Calculate a value`
3. `Make answers required` (the control itself is labelled `Require answer`)
4. `Show or hide blocks` (the controls are `Show blocks` and `Hide blocks`)
5. `Hide button to disable completion`
6. `Redirect to different URLs and Tally forms`

**The action names are verb phrases, not nouns.** Compare Typeform's `Branching`, `Outcome quiz`, `Score quiz` — noun-shaped feature names. Tally's logic reads as a sentence: *When all match, then jump to page 3.*

**`Hide button to disable completion` is the most literal string in the batch.** It names the mechanism (hide a button), the effect (disable completion), and nothing else. It is clumsy and completely unambiguous — a user cannot misunderstand what it does. Most products would call this "Block submission" and lose the information that the button disappears.

**Note the naming drift within the feature:** the action list says `Make answers required`, the control says `Require answer`, and the FAQ lists `Make answers required`. Singular/plural and imperative/infinitive both vary.

**A placement constraint stated as a warning callout** `[observed]`:

> "It's important to place the conditional logic block on the page where you want the jump action to trigger. The jump will only trigger when respondents click the 'Next' or 'Submit' button."

Two respondent-facing button labels (`Next`, `Submit`) surface here and nowhere else in the harvest — the only Tally respondent-side UI strings captured.

**A dependency stated as a prerequisite** `[observed]`: "To show blocks conditionally, **you need to hide them first.**" Six words that prevent the most common conditional-logic mistake.

**Five documented use-case names for logic** `[observed]`, each with a one-line definition: `Progressive disclosure` ("Only show fields when they're needed") · `Lead qualification` · `Pricing calculators` · `Personalized confirmation` · `Personality quizzes`.

**`Progressive disclosure` — the UX term of art — is used as a user-facing use-case label in product help.** Tally assumes its audience knows or will learn the term, and glosses it in five words.

## T6 Status & state language

Thinner than Framer or Ghost, because a form has fewer states than a website.

**Form-level states and settings** `[documented]` / `[observed]`

| String | Source |
|---|---|
| `Close forms on limit or date` | Pricing free-feature list — a state transition sold as a feature |
| `Prevent duplicate submissions` | Pricing free-feature list |
| `Password protect forms` | Pricing free-feature list |
| `Save answers for later` | Form setting, `Settings → Behavior` |
| `Partial submissions` | Pro feature — "Capture unfinished form responses before respondents submit your form" |
| `Redirect on completion` | Free feature |
| `Custom Thank You page` | Free feature; backticked in the pricing list as `Thank You` |

**Publish state, documented with unusual precision** `[observed]`, from the comparison-page FAQ:

> "Yes, Tally automatically saves your changes as you edit your form… For published forms, **your edits are auto-saved but won't affect the live version until you choose to publish the changes.** This gives you control over when your updates go live."

Three states in one sentence: *saved*, *live version*, *published changes*. The distinction between "saved" and "live" is the one that causes support tickets in every publishing product (see Typeform's `I made changes… but my form doesn't show them!`), and Tally pre-empts it in an FAQ answer with the rationale attached (`This gives you control`).

**Submission-record states** `[observed]`: `Respondent ID` and `Submission ID`, each defined:

> "**Respondent ID** Unique identifier of the form respondent. This unique identifier is **persistent between all forms from within the same workspace.** You can use it to identify people who answer a form multiple times or have answered different forms.
> **Submission ID** Unique identifier of the current form submission, it's different for each submission."

**Defining both identifiers side by side, with the scope of persistence stated for one and the non-persistence stated for the other, is exactly right.** The privacy implication (`persistent between all forms… within the same workspace`) is disclosed in the definition, not hidden in a policy page.

**Results-view names** `[observed]`: `Summary` tab · `Submissions` tab · `Insights` tab. Three named views, each with a documented role: `Summary` shows answers grouped under question titles, `Submissions` shows a table with one column per question title, `Insights` shows visit and drop-off analytics.

**Integration sync states** `[observed]`: "you can view the **sync submission logs and their status** by clicking 🕓 next to your integration connection." A clock emoji as the affordance for a log view. The status values themselves are not named. `[absent]`

**Version-history states** `[observed]`, from pricing: `Version history` — "Restore your form to a previous version **up to 30 days ago**" (Pro) / "**up to 90 days ago**" (Business). And on the comparison table: `Version history — ✅ Free (past 7 days)`. **Three retention windows for one feature, tiered by plan, each stated as a plain duration.**

**Status-page components** `[observed]`: three only — `Tally Application`, `Tally API`, `Custom domains`. Overall banner: `All services are online`. Per-component: `Operational`, `100% uptime`. Timestamp: `Last updated on Sep 22, 2026 at 5:18pm UTC`.

**`All services are online` rather than "All Systems Operational".** Tally uses the plain word (`online`) where Typeform uses the ops word (`Operational`) — though Tally's own per-component labels then say `Operational`. **The banner and the components disagree on register within one page.**

**Three components vs Typeform's thirty** is the sharpest single contrast between the two status pages, and it tracks the concision thesis: Tally publishes what a user can act on (is the app up, is the API up, are my custom domains resolving) and nothing else.

## T7 Error, failure & recovery

`[documented]` — no live error strings observed; Tally's help centre describes failures rather than quoting them.

**The troubleshooting method is documented as a five-step procedure** `[observed]`, from the Conditional logic article. Summarised: review the logic blocks and check conditions point at the right fields; rename default field names to descriptive ones; test the form with different answer combinations; place `@` mentions around the logic block to watch values at specific points; simplify the logic to isolate the failing condition.

**Step 4 is the interesting one** — using answer-piping `@` mentions as a *print-statement debugger* inside a form. Tally documents a technique that is essentially `console.log` for non-programmers, and names the mechanism: "you create a mechanism to track the values of relevant inputs and calculated fields at specific points in the form's execution."

**Step 2 closes a loop with T5**: "Replace the default question field names with descriptive titles… This will make it easier to identify and manage fields when setting up or troubleshooting conditional logic." **The naming article's argument (bad names hurt your results) and the troubleshooting article's argument (bad names hurt your debugging) are two independent reasons to do the same thing, written in two places.**

**An AI escape hatch is offered before the manual procedure** `[observed]`:

> "Don't want to debug it by hand? Describe the issue to Tally AI (e.g. **'my conditional logic isn't hiding the right field'**) and it'll inspect your form and fix it directly."

The example prompt is a complete, realistic, slightly frustrated user sentence. Giving the *example prompt* rather than instructions on prompting is the same pattern as Framer's starter chips — teach by sample utterance.

**Named failure conditions, from the logic FAQ** `[observed]`:

> `Why isn't my conditional logic working?` — "The most common issues are: the logic block is placed on the wrong page, conditions reference the wrong field, or the form hasn't been tested with all answer combinations."

**Three ranked causes in one sentence**, which is a better FAQ answer than a link to a procedure. The user can self-diagnose in ten seconds.

**Integration failure** `[observed]`: `My integration isn't working, what can I do?` — routed to the sync logs. First-person question title with a comma splice.

**A hard prohibition stated as policy, with consequences** `[observed]`:

> `Can I collect passwords with Tally?` — "Tally respects the privacy of respondents and has strict guidelines for data collection. As per our terms and conditions, users are **prohibited from collecting confidential information like passwords, credit card details, bank account numbers, Social Security Numbers**, or any similar types of private information through Tally forms. **Non-compliance with these terms may lead to the removal of forms, deletion of collected data, or suspension of your Tally account.** We recommend you only collect necessary data, ensuring all data collection aligns with relevant privacy laws."

**This is the most consequential single answer in the file.** The prohibition is itemised (four named data types plus a catch-all), the enforcement is itemised (three escalating consequences), and the closing sentence generalises to data minimisation. It is placed in a `Data collection` FAQ section under the innocuous question "Can I collect passwords" — a user asking about passwords learns that the whole class is forbidden.

Note the framing: **"Tally respects the privacy of respondents"** — the first clause protects the *third party*, not the customer. For a B2B2C product, leading the prohibition with a duty to the end user rather than with a terms-of-service citation is the right order.

**No error titles, no error body copy, no validation messages, no toast strings observed.** `[absent]` The Accessibility article does state that "**Error messages are announced automatically when they appear — you don't have to go looking for them**" and that "**Validation errors** — now announced live as soon as they appear", confirming errors exist and are ARIA-live, without quoting any.

## T8 Empty states

`[absent]` — no empty-state copy reachable on public surfaces.

The only default-content string recovered is **`Untitled`** (T5), the fallback question title shown in results when a field has no title, label or placeholder. That is a default rather than an empty state, but it is the same class of string and Tally documents it explicitly, which most products do not.

## T9 Notifications & system messages

**Two notification directions, named separately and priced separately** `[observed]`

| String | Plan | Note |
|---|---|---|
| `Self email notifications` | Free | To the operator |
| `Email notifications` | Pro — "Send tailored emails to yourself and respondents" | Both directions |
| `Respondent email notifications` | $29/mo (per the comparison table) | To the respondent |
| `Custom email domains` | Pro — "Send email notifications from your custom domain" | |
| `Verify emails` | Business — "Confirm respondents' email addresses to capture high-quality leads and increase conversions" | |

**Notifying yourself is free; notifying your respondent costs money.** That is the pricing line, and the vocabulary marks it precisely: `Self email notifications` is an ungainly compound that exists solely to distinguish the free case from the paid one. Compare Typeform, which has `Set up email notifications` (operator) and `Send follow-up emails to respondents` — different verbs for the two directions rather than a `Self` prefix.

**Status-page notification channels** `[observed]`: `E-mail`, `RSS`, `JSON`, `Webhook`, `Slack`, with per-component subscription (`Tally Application`, `Tally API`, `Custom domains`). Framing: "Get e-mail notifications whenever Tally **creates**, **updates** or **resolves** an incident" — the same three-verb incident lifecycle as Typeform's Statuspage, because both are using a hosted status product's default copy.

**`E-mail` is hyphenated on the status page** and unhyphenated everywhere else on Tally's own properties. A third-party-surface inconsistency.

**Integration notification** `[observed]`: `Slack` — "Send Slack messages for new submissions." Discord likewise.

**No in-product toast, banner, or system-message copy observed.** `[absent]`

## T10 Disclosures, legal & compliance

**The fair-use policy is the load-bearing disclosure and Tally links it from everywhere** `[observed]`:

> "Tally gives you unlimited forms and submissions, completely free, **as long as you stay within our fair usage guidelines.**"

That sentence, with the link, appears on the home page and verbatim on the pricing page. The FAQ repeats it in different words: "unlimited forms and submissions for free **within our fair use guidelines**". And the footer carries `Fair use policy` as a standing link.

**`unlimited … as long as` is the construction**, and Tally never says `unlimited` without it on the two commercial pages. **The qualifier is in the same sentence as the claim, every time.** This is the Wise claim-then-bound pattern, applied to a usage limit instead of a fee. It is the strongest disclosure practice in this batch — and note that the policy page itself was not harvested, so what the guidelines actually say is unverified. `[absent]`

**Note the inconsistency: `fair usage guidelines` (home, pricing) vs `fair use guidelines` (FAQ) vs `Fair use policy` (footer, help centre).** Three names for one document.

**Pricing** `[observed]`

| Plan | Price | Toggle |
|---|---|---|
| (Free — unnamed on the pricing page) | — | — |
| `Pro` | `$24` per month | `Pay monthly` / `Pay yearly` `2 months off` |
| `Business` | `$74` per month | same |

**The free tier has no name on the pricing page.** There is no `Free` card — the top half of the page is a headline (`Build beautiful forms for free`) plus a 20-item checklist, and the paid plans appear below under `Do more with Tally`. Refusing to render the free tier as a *plan* in a plan grid is a deliberate choice: it prevents the visual comparison that makes free tiers look deficient.

**The free-tier feature list is the disclosure**, and it is unusually specific for a free tier `[observed]`: `Unlimited forms` · `Unlimited submissions` · `Collect payments` · `Collect signatures` · `Collect file uploads` · `Custom Thank You page` · `Self email notifications` · `Redirect on completion` · `Conditional logic & calculations` · `Prevent duplicate submissions` · `Password protect forms` · `Close forms on limit or date` · `Answer piping` · `45+ languages & RTL support` · `Google Sheets integration` · `Notion integration` · `Airtable integration` · `Zapier integration` · `Make integration` · `Webhooks` · `And many, many more`.

**Pricing contradiction, recorded:** the pricing page says `Pro $24 per month` and `Business $74 per month`; the Tally-vs-Typeform comparison page says "upgrade to **Tally Pro for $29/month** or **Tally Business for $89/month**", and its feature table prices Pro features at `$29/mo` and Business features at `$89/mo` throughout. **Two price sets on two Tally-owned pages.** The pricing page is presumably current (monthly-toggle state) and the comparison page stale, but nothing on either page reconciles them. This is the same class of defect as Typeform's two price tables, and both products have it.

**Language-count contradiction, recorded:** `45+ languages & RTL support` (pricing) vs `50+ supported languages` (home) vs `40+ languages` (comparison page). **Three counts for one capability across three pages.**

**Team-count contradiction, recorded:** `Powering 500,000+ teams` (home and pricing, on-page) vs `Join 1M+ teams` (pricing page meta description).

**GDPR is disclosed with mechanism, not just a badge** `[observed]`:

> "Your data privacy and security are our top priorities. We are **GDPR compliant** and treat your data with care and confidentiality. Tally is **hosted in Europe**, we don't use cookie-tracking, and all form data is securely stored, and **encrypted** both in transit and at rest."

Four distinct claims in two sentences: compliance status, hosting location, absence of cookie tracking, encryption in two states. **`we don't use cookie-tracking` is the one most products cannot say and therefore do not mention**; Tally puts it third in the list.

The FAQ adds jurisdiction: "As a **Belgium-based (EU) company**, we fully comply with GDPR requirements and store all form data in Europe." Entity jurisdiction named, data location named.

**A dedicated article exists for the operator's own obligations** `[documented]`: `how to create a GDPR compliant form`. **Tally documents both its own compliance and how the customer achieves theirs** — the same split Framer makes for accessibility (we automate some; you must do the rest).

**Data retention as a paid control** `[observed]`: `Control data retention` (Business) — "Automatically delete form submissions after a set period to **comply with privacy frameworks**." The compliance justification is in the feature description. Also `Submissions data retention` as the help-article name.

**Search-indexing default, disclosed** `[observed]`:

> "By default, Tally forms are **not indexed** by search engines… **Forms hosted on a custom domain are indexed by default.**"

Two opposite defaults for two hosting modes, both stated, with the `noindex` snippet supplied for the second case. A default that flips when you upgrade is exactly the kind of thing users discover the hard way; Tally discloses it and hands over the fix.

**Timezone disclosure** `[observed]`: "The form submissions in your Tally dashboard are always shown in your current timezone. **When you export form submissions with an integration, they are shown in UTC.**" A quiet data-fidelity trap, named.

**File-size limit** `[observed]`: `Unlimited uploads` (Pro) — "Remove the **10 MB per file size limit** when using the File Upload block." The free-tier limit is disclosed inside the paid feature's description, which is the only place it appears.

**Cancellation, refund, proration, downgrade: absent from both the pricing page and the FAQ.** `[absent]` Billing is addressed only as "Click `Settings` in the side panel on your Tally dashboard to manage your account and billing data." **All three products in this batch's form/site-builder set omit cancellation copy from the pricing page.**

**Footer legal** `[observed]`: `Terms & Privacy` (one combined link), `GDPR`, `Fair use policy`, `Report abuse`, and in the help centre `Terms and conditions` · `Privacy policy` · `Cookie policy` · `GDPR` · `Report abuse` as five separate entries. **The footer combines Terms and Privacy into one link; the help centre splits them into two.**

**Discount programmes named** `[observed]`: `Tally for education` · `Tally for non-profit` — both under `Terms & discounts` in the help centre, alongside `Fair Use Policy`.

## T11 Help-centre architecture

Notion-rendered, seven sections, two levels deep, with a persistent horizontal section nav on every page (`Help Center` · `Get started` · `Features` · `Integrations` · `Guides` · `Plans & pricing` · `Resources` · `FAQ`) plus a persistent action nav (`Contact support` · `What's new` · `Roadmap` · `Feature requests`).

**Every link in the help centre carries an emoji.** This is the single most distinctive formal property of the IA:

🚀 `Create your first form` · ⌨️ `Keyboard shortcuts` · 📂 `Start with a template` · 🙏 `Create a Thank You page` · 🏷 `How to name fields` · 🎨 `Customize your form` · 🐇 `Conditional logic` · 🪄 `Answer piping` · 🧮 `Calculated fields` · 🥇 `Ranking` · 🙈 `Hidden fields` · 🍰 `Partial submissions` · 🤺 `Tally vs Typeform` · 🏴‍☠️ `Report abuse` · ✌🏻 `Fair Use Policy` · 🌳 `Tally for non-profit`

Some are mnemonic (🥇 for Ranking, 🙈 for Hidden fields, 🧮 for Calculated fields — genuinely aid scanning). Some are decorative (🐇 for Conditional logic, 🍰 for Partial submissions — a slice of cake for a partial response is a pun, and an obscure one). Some are odd choices (🏴‍☠️ for Report abuse; 🙏 for Thank You page is a prayer-hands gesture commonly read as thanks in some cultures and as prayer in others).

**Assessment:** as a scanning aid the emoji layer is partially effective and inconsistently mnemonic. As an accessibility matter it is a real cost — a screen reader announces the emoji name before every link text, so `Conditional logic` becomes "rabbit, Conditional logic". Tally publishes a serious accessibility article (T14) and has not applied it to its own help centre. **Recorded as a defect, and as the clearest instance in this batch of a product's published standard not being applied to its own content.**

**Article-title grammar — four shapes:**

| Shape | Examples |
|---|---|
| `How to <verb>` | `How to create a quiz` · `How to name fields` · `How to create an 'other' option` · `How to grow your newsletter` · `How to build a free CRM` |
| Bare noun / feature name | `Conditional logic` · `Input blocks` · `Hidden fields` · `Answer piping` · `Custom domains` · `Ranking` |
| Imperative | `Create your first form` · `Customize your form` · `Embed your form` · `Remove Tally branding` |
| Comparison | `Tally, a free Typeform alternative` · `Tally vs Google Forms` |

**The bare-feature-name shape dominates the Features section and the imperative shape dominates Get started.** Same segregation-by-intent principle as Framer, executed with two shapes instead of three.

**`How to create an 'other' option`** is a notable article title: a form-design micro-problem (offering an escape hatch in a choice list) important enough to have its own guide. Typeform ships `Other` as a built-in option on two question types; Tally requires a guide. **The competitor's feature is Tally's tutorial** — a clean illustration of where a leaner product pushes work onto documentation.

**Guides are organised by *integration partner*, not only by task** `[observed]`: a whole `Notion and Tally` sub-section (`How to grow your newsletter`, `How to build a free CRM`, `How to collect audience feedback`, `How to create e-commerce store`), plus an `Embed guides` sub-section naming five host platforms (`Embed on Wordpress`, `Embed on Webflow`, `Embed on Notion`, `Embed on Ghost`, `Embed on Framer`).

**Two of those five host platforms are also in this corpus batch** (Ghost 180, Framer 176), and Ghost independently lists Tally in its own integrations library. The small-tool ecosystem is visible in the help IA.

Note `How to create e-commerce store` — **missing article, "an".** A grammar error in a published help-article title.

**Anchor-link defect:** every Notion-rendered heading emits a visible duplicate hash link before its text, e.g. `[#3d81cecd0a0a4526bf2d88221b27b2fc](#...)Get started`. These appear in the served HTML on every help page. Whether they render visibly to a sighted user could not be confirmed, but they are in the accessibility tree. **Recorded as a suspected defect of the Notion rendering pipeline.**

**Broken-link defect observed:** the GDPR FAQ answer links to `https://help.tally.so/gdpr` while every other GDPR reference points to `https://tally.so/help/gdpr`. Two different hostnames for the help centre in one answer.

**A second link defect:** the "one question per page" FAQ answer links to `https://app.notion.com/502331fab7c4464facc9098f76385132` and `https://app.notion.com/844c306a2e344fb3839d658c580415f3` — **raw internal Notion workspace URLs leaked into a public help answer**, where the surrounding text promises links to the multi-page-form and progress-bar articles. Both links are broken for any reader without access to Tally's Notion workspace.

**Routing furniture** `[observed]`: `Still have questions?` → "Browse our common guides for more tips, tricks, and use cases." Plus `Contact support` in the persistent nav. Human contact is one click from every page, not deferred — the opposite of Wise and Typeform, both of which bury it.

## T12 FAQs

**Three FAQ surfaces.**

**1. Home page and pricing page carry an identical four-question block** under the heading `Questions & answers` `[observed]`. The same four questions, the same four answers, verbatim on both pages.

| # | Question (verbatim) | Answer, one line |
|---|---|---|
| 1 | Is Tally really free? | Yes; unlimited forms and submissions within fair use; names five advanced features available free; "without time restrictions" |
| 2 | Are Tally forms secure? | Belgium/EU company, GDPR, EU data storage, encryption in transit and at rest; Business adds retention control |
| 3 | How does Tally compare to other form builders? | Others limit submissions or paywall advanced features; Tally doesn't; routes to four comparison guides |
| 4 | How can I get started? | No signup needed; three links (create, signup, get-started guide) |

**`Is Tally really free?` as question one, on both commercial pages, is the whole strategy.** The question is phrased as the reader's disbelief (`really`), not as a product query. The answer opens `Yes!` and then immediately supplies the origin story and the fair-use qualifier. **Answer the scepticism, then bound the claim, then prove it with a feature list** — three moves, in that order.

Q3 is a competitor question asked in Tally's own FAQ and answered by routing to four competitor comparison pages. Most products handle competitors in a blog; Tally handles them in the FAQ and the footer.

**2. The help-centre `FAQ` page** carries 26 questions in seven named sections, with a jump-link index at the top `[observed]`.

**Section: `Pricing`** — `How many forms can I make for free?`

**Section: `Form builder`** (12 questions)

| Question (verbatim) |
|---|
| Can respondents stop and resume answering at a later point? |
| Do you support radio buttons? |
| How do I set up one question per page? |
| How do I collect a number input starting with zero? |
| Can I embed a form in an email? |
| Do hidden fields also work when I embed my form? |
| Can I add UTM parameters to my form? |
| How do I set character limits for an answer? |
| Is Tally GDPR compliant? |
| Are my forms indexed by search engines? |
| How do I export my form submissions? |
| Can I change the timezone in which my form submissions are displayed? |

**Section: `Customization`** — `How can I customize my form?` · `Can I change the OG image of my form?` · `Can I use an image as my form background?` · `Can I use custom fonts in my Tally form?` · `What are the ideal image dimensions?`

**Section: `Data collection`** — `Can I collect passwords with Tally?`

**Section: `Integrations & tracking`** — `What is the respondent and submission ID?` · `My integration isn't working, what can I do?` · `How do I track conversions with Tally?`

**Section: `Account settings`** — `How do I change my password?` · `Where can I find my billing data?`

**Section: `Tally Pro`** — `How many custom domains can I connect?` · `How many users can I invite to my organization?`

**Two questions in the `Form builder` section are the most instructive in the batch.**

**`Do you support radio buttons?`** — "Our Multiple-choice option only allows 1 response by default and offers the same user experience as a radio button."

The user arrives with the HTML element name; Tally answers by mapping it to the product's own noun and asserting behavioural equivalence. **This is a vocabulary-translation FAQ entry**, and it exists because Tally's `Multiple choice` (plural-sounding, single-select by default) collides with the user's expectation. Typeform has the identical collision and has not written the identical article. Note also: the answer writes **`Multiple-choice` hyphenated**, where the Input blocks article writes `Multiple choice` unhyphenated.

**`How do I set up one question per page?`** — "Tally doesn't have a separate 'one question per page' toggle, instead, you create a multi-page form and add a page break after each question by typing `/page`. If you'd like respondents to see how far along they are, you can also enable the progress bar."

**This is Tally's answer to Typeform's entire product thesis, and it is a settings workaround.** The competitor's core interaction model is, in Tally, an emergent property of typing `/page` repeatedly. The answer is honest (`doesn't have a separate toggle`), gives the method, and volunteers the companion feature (`progress bar`) that the pattern needs. Note the comma splice after "toggle".

The comparison page says the same thing in marketing register `[observed]`: "Tally forms can easily mimic Typeform's single-question-per-page style. Simply add a new page after each question to create a multi-page form. **You're not limited to one question per page, though** — add as many as you like."

**`mimic` is a revealing verb.** Tally positions one-question-per-page as an aesthetic its product can imitate rather than a completion-rate mechanism, and never engages with Typeform's published 47% claim. **The two products' evidence bases never meet: Typeform argues from a completion-rate figure, Tally argues from price and flexibility.** Neither cites the other's evidence. For a benchmark corpus, that gap is the finding — there is no public argument between the two leading positions on how to shape a form.

**3. The comparison page carries a ten-question FAQ** `[observed]`: `Is Tally really free?` · `Can I create Tally forms that look like Typeform?` · `Can I import my Typeform forms into Tally?` · `Can I create a free quiz with Tally?` · `Are Tally forms beginner-friendly?` · `Can Tally forms do calculations?` · `Can I customize Tally forms to fit my brand?` · `Does Tally form editor auto-save changes?` · `Does Tally provide customer support?` · `Are Tally forms accessible?`

**Structural note across all three FAQ surfaces: `Is Tally really free?` appears on three separate pages with three slightly different answers.** Home/pricing: the origin story plus five linked features. Comparison page: "You can access 99% of Tally's features for free." Help FAQ (as `How many forms can I make for free?`): one sentence. **One question, three answers, three lengths, calibrated to the page.** That is either good page-fit editing or an unmanaged duplication risk; on the evidence it reads as the former.

**`Does Tally form editor auto-save changes?`** is missing an article (`the`). Second grammar defect in a published title.

## T13 Terminology & glossary

**Tally publishes no glossary page.** `[absent]` — a notable gap against Typeform, which places one third in its getting-started curriculum. Tally's vocabulary is instead defined in situ, most densely on the Input blocks page.

| Term | Tally's usage | The alternative it rejected |
|---|---|---|
| `input block` | The umbrella noun for a form control | "question type" (Typeform), "field type" |
| `block` | The universal unit of the editor — input, text, logic, image, page all are blocks | "element", "component" |
| `question` | The prose you write; distinct from the input block that collects | |
| `question title` | Shown to respondents and used as the results column header | "field label" |
| `Label block` / `Title block` | Two named block types that both produce a question title | |
| `question field name` | The internal-only identifier, "not visible to respondents" | "field key", "ref" (Typeform) |
| `Untitled` | The fallback question title when none is set | |
| `Short answer` / `Long answer` | The two free-text blocks | `Short Text` / `Long Text` (Typeform) |
| `Link` | The URL block | `Website` (Typeform), "URL" |
| `Linear scale` | Numeric scale | `Opinion Scale` (Typeform) |
| `Checkboxes` (plural) | Multi-select group | `Checkbox` singular = consent tick (Typeform) |
| `Multi-select` | Multi-select *from a dropdown* | no Typeform equivalent |
| `Conditional logic` | The feature | `Logic` (Typeform), "branching" |
| `all` / `any` | AND / OR, glossed in parentheses | "AND"/"OR" as primary |
| `condition group` | Nestable bracket of conditions | |
| `Jump to page` | The routing action | `Logic Jump` (Typeform, legacy) |
| `Answer piping` | Referencing earlier answers, via `@` | `Recall information` (Typeform) |
| `Calculated fields` | Variables and arithmetic | `variables` + `Calculator` |
| `Hidden fields` | URL-parameter prefill | **Typeform renamed this to `URL parameters`; Tally has kept it** |
| `Partial submissions` | Captured incomplete responses | `Partial Submit Point` (Typeform) |
| `Thank You page` | The end screen | `Endings` / `End Screen` (Typeform) |
| `submission` | The unit of collected data | `response` (Typeform) |
| `respondent` | The person filling the form | same as Typeform |
| `Respondent ID` / `Submission ID` | Two defined identifiers | |
| `workspace` / `organization` | Two container nouns, both used | |
| `Insights` | The analytics tab | "Analytics", "Reports" |
| `Drop-off insights` | Abandonment analytics | `Question Drop-off Analysis` (Typeform) |
| `Tally Pro` / `Tally Business` | The two paid tiers | |
| `Fair use` / `fair usage` | The unlimited-tier boundary | |

**The single sharpest terminology divergence in this batch: `Hidden fields` vs `URL parameters`.** Typeform renamed it (mid-migration, see 177-typeform.md); Tally still calls it `Hidden fields`, has a `🙈 Hidden fields` help article, and dedicates a guides sub-section to it. **The same capability, under a name one competitor has publicly abandoned as unclear.** A content designer looking for evidence on whether a rename was worth it has both states visible simultaneously in this corpus.

**Second sharp divergence: `submission` vs `response`.** Tally meters and names `submissions`; Typeform meters and names `responses`. Tally's word describes the act (someone submitted); Typeform's describes the artefact (a response exists). Tally's is more accurate for a product that also captures `Partial submissions` — a partial *submission* is coherent, a partial *response* less so. Both products then use `respondent` for the person, so **Tally has a `respondent` who makes a `submission`** — a mismatched pair that Typeform avoids (`respondent` / `response`).

**Third divergence: `Answer piping` vs `Recall information`.** Both invoke with `@`. Tally's names the mechanism as a metaphor (piping); Typeform's names the intent (recall). Tally's is the term of art in the forms industry; Typeform's is the more self-explanatory.

**The `block` noun does an enormous amount of work.** `input block`, `Title block`, `Label block`, `logic block`, `text block`, `File Upload block`, `Number block`, `email block`, `payment block`, `reCAPTCHA block`, `NPS block`, `Show blocks` / `Hide blocks`. **Everything in the editor is a block, and "block" therefore means almost nothing on its own** — which is precisely the Notion model Tally has borrowed, and which works because the slash command always disambiguates. The cost shows up in the logic action `Show or hide blocks`, where the user must select "blocks" from a tree of pages and questions and the documentation has to explain that selecting a page selects all blocks inside it.

**Register:** there is almost no split between Tally's marketing and help registers — both say `form`, `block`, `respondent`, `free`. Contrast Typeform, whose marketing says `Intelligent Forms` and whose help says `typeform`. Tally's uniformity is a function of scale (a small team writing everything) and it reads as consistency.

**Terminology defects recorded:**

- `Short answer` (Input blocks) vs `Short text` (FAQ) — the product's own field name, two ways
- `Multiple choice` vs `Multiple-choice` — hyphenation varies between the Input blocks article and the FAQ
- `Make answers required` (action list, FAQ) vs `Require answer` (the control) — plural/singular and mood both vary
- `block settings ::` vs `block options ::` vs `⋮⋮` vs `⋮` vs `:` — four glyphs, two phrasings, for block-level menus
- `fair usage guidelines` vs `fair use guidelines` vs `Fair use policy` — three names for one document
- `workspace` and `organization` both used for the team container, in adjacent FAQ answers (`shared workspaces`; `invite to my organization`)
- `cmd/ctrl` vs `ctrl/cmd` on one page
- `45+` vs `50+` vs `40+` languages across three pages

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the operator throughout. Third person for the respondent (`your respondents`, `respondents can`), giving the same three-party grammar as Typeform. First-person plural for the company, used freely and informally: "We are GDPR compliant", "We're a small team", "we don't use cookie-tracking", "We recommend you only collect necessary data".

**Register.** Conversational, contracted, em-dash-heavy, with frequent direct address. Exclamation marks are used — sparingly in documentation, more freely in FAQ answers (`Yes!`, `Absolutely!`, `Yes, absolutely!`, `you don't even need an account to try it out!`). **No `Oops!` anywhere.**

**Tonal markers** `[observed]`: "Say goodbye to boring forms." · "Paywalls getting in the way? Not anymore." · "guess what? You don't even need an account" · "spice things up with Tally Pro" · "Take your Tally skills to the next level" · "It's as simple as one-two-three" · "More to come. We are working on more Business features. Stay tuned!" · "And many, many more" · "Don't want to debug it by hand?"

**`More to come. We are working on more Business features. Stay tuned!`** is a shipped feature-list bullet on the $74/mo plan. Selling a plan partly on unbuilt features, stated plainly as such, is unusual and arguably more honest than padding the list — but it is a promise on a paid tier with no date attached.

**The tone does not modulate by stakes.** The password-prohibition answer (T7) — the most consequential text on the site — is written in exactly the same register as the emoji-laden feature list. Wise flattens as stakes rise; Typeform splits by audience; **Tally has one voice everywhere.** For a small team that is a strength of consistency and a weakness at the two or three moments where gravity would help.

**Numbers as trust devices** `[observed]`: `500,000+ teams` · `1M+ teams` (contradictory) · `99%` of features free · `4.9/5` on G2 · `9.4` conditional logic score · `100+ integrations` · `45+` / `50+` / `40+` languages · `10 MB per file` · `30 days` / `90 days` / `7 days` version history · `12 or more fields`.

**Competitive claims are specific, sourced and auditable** `[observed]`, from the comparison page: "Users rate Tally 4.9/5 on G2 (vs. Typeform's 4.5), with higher scores for conditional logic (9.4 vs. 8.9) and quality of support (9.3 vs. 8.4)." Third-party source named, competitor's figure given alongside. That is a defensible way to make a comparative claim — and it sits in the same document as a 57-row feature table whose Typeform column contains at least one claim Typeform's own FAQ contradicts (`Prevent duplicate submissions ✅ $379/mo`, where Typeform states it does not offer the feature). **Recorded as an unresolved contradiction between two corpus sources; no determination made as to which is correct.**

**Accessibility content — the standout, and the standout defect** `[observed]`

Tally publishes `Build accessible forms with Tally`, and it is the best accessibility page in this batch by a distance.

**What it gets right:**

- **It names its standard:** "we follow the **WCAG form guidelines** as our reference."
- **It disclaims certification explicitly:** "Tally does **not hold an official WCAG or ADA certification yet.** We design and build with accessibility best practices in mind and work to continuously improve, but **we can't guarantee full compliance for every use case.** If accessibility is critical for your organization, we recommend testing your specific form with your target assistive technology before publishing."
- **It has a section literally headed `Known limitations`** opening "We're honest about what's not there yet", and names one: "**Signature field** — not accessible yet for keyboard or screen reader users."
- **It routes to a public feedback board for the gap**, linking the specific upvotable item.
- **It dates its remediation work:** a section headed `Field-level improvements shipped in 2026` listing six fixes — `Ranking` keyboard reordering, `Phone number` country picker, `Time input` focus management, `Dropdown & multi-select` combobox/listbox roles, `Checkbox groups` fieldset and legend, `Validation errors` announced live.
- **It states what works, specifically**, rather than claiming compliance: error messages announced automatically, `Matrix` cells read with both row and column label, `Rating` fields announce each option with its value ("3 stars"), image choices marked decorative "so it isn't read twice".
- **It gives the operator their own checklist**, because the tool cannot do it alone: "The form builder can only do so much, the content of your form matters too" — then: write clear labels and don't rely on placeholder text alone; add helper text; don't rely on colour alone; test with a keyboard; **keep it short** ("fewer fields mean less friction for everyone, especially users with cognitive or motor disabilities"); use page breaks with clear section titles.
- **It explains the resourcing honestly:** "We're a small team and accessibility is an ongoing effort, not a checkbox."

**`accessibility is an ongoing effort, not a checkbox` and a `Known limitations` heading naming an unfixed, shipped, paid-for feature as inaccessible** is the most creditable thing any product in this batch does. Compare Typeform (177), a far larger company, which publishes no accessibility statement at all and ships a `Signature` type with no accessibility position either way.

**The defect:** Tally's own help centre violates the guidance on the page. Every help link is emoji-prefixed, so a screen-reader user hears an emoji name before every link text (T11). The Notion rendering emits a visible hash-anchor before every heading. And the Input blocks article documents placeholder-as-question-title as a feature (T5) with no cross-reference to the a11y article's instruction not to rely on placeholders. **A published accessibility standard not applied to the page that publishes it.**

**Other accessibility observations** `[observed]`

- No `Skip to content` link found in the fetched markup of the marketing site or help centre. `[absent]` — flagged as suspected-missing.
- Marketing alt text is descriptive and scene-level: "floating faces with different expressions", "Person jumping in", "Person clicking on a plus sign", "Various input badges", "Roll up your sleeves", "Encrypted form data". Reasonable for illustration; none is misleading.
- Help-centre images are almost all `![notion image]` — **the Notion default alt string, repeated dozens of times across every help page.** Screenshots showing the logic builder, the condition groups, the naming UI and the settings menus all carry identical non-descriptive alt. This is the same pipeline problem as the anchors, and it is the direct opposite of Typeform's help-centre alt text, which is specific and useful. **For a product whose documentation is heavily screenshot-led, `notion image` × 30 is a substantial content-accessibility failure.**
- A small number of help images carry real alt, mostly where a caption was used as alt: "Type / to open the list of all input blocks.", "You can add placeholder text by simply typing into any input block.", "Use the cmd/ctrl + shift + L shortcut to add a conditional logic block under a selected input block." These are callout icons, not screenshots.
- `50+ supported languages` / `45+ languages & RTL support` — **RTL support named explicitly** on the pricing page, which is more than most form builders state.

**Negative findings, recorded honestly**

- `$24`/`$74` (pricing page) vs `$29`/`$89` (comparison page) — two price sets
- `500,000+ teams` on-page vs `1M+ teams` in the meta description of the same page
- `45+` vs `50+` vs `40+` languages across three pages
- `Short answer` vs `Short text`; `Multiple choice` vs `Multiple-choice`; `Make answers required` vs `Require answer`
- Four glyphs for block menus (`::`, `⋮⋮`, `⋮`, `:`); two phrasings (`block settings`, `block options`)
- `fair usage guidelines` / `fair use guidelines` / `Fair use policy`
- `workspace` and `organization` both used for the team container
- `cmd/ctrl` vs `ctrl/cmd` on one page
- `All services are online` (banner) vs `Operational` (components) on the status page
- Two raw `app.notion.com` workspace URLs leaked into a public FAQ answer, both broken for readers
- A GDPR link pointing at `help.tally.so` while every other reference uses `tally.so/help`
- `How to create e-commerce store` — missing article
- `Does Tally form editor auto-save changes?` — missing article
- `My integration isn't working, what can I do?` and "Tally doesn't have a separate 'one question per page' toggle, instead, you create…" — comma splices in published copy
- `![notion image]` as alt text on most help screenshots
- Emoji prefixes on every help link, against Tally's own published a11y guidance
- Visible hash-anchor links emitted before every help heading
- Placeholder-as-title documented as a feature with no link to the contrary a11y guidance
- No glossary page
- No cancellation, refund or downgrade copy on the pricing page
- `Get started` used for both Pro and Business, so the CTA carries no plan information
- Tally's comparison table prices Typeform's `Prevent duplicate submissions` at $379/mo; Typeform's own FAQ states the feature does not exist

---

## Transferable patterns

1. **Put the friction-removal claim under the button, not in the headline.** `No signup required`, three words, directly beneath `Create a free form`, and repeated as a nav item (`Create form`). The objection is answered at the moment it is raised rather than in a paragraph the user has already scrolled past. Applies to guest checkout, trial starts, and any flow where account creation is the drop-off.
2. **Argue for good field labels from the operator's downstream pain.** Tally's naming article leads with "avoid untitled fields in your form results, making your submissions much easier to read, search, and export later" and names the literal default string `Untitled`. Correctness and accessibility arguments lose to deadlines; *your spreadsheet column will say Untitled* does not. Use this framing in any internal guidance about labelling.
3. **Plain word → technical word → worked example, for every Boolean.** `When all match: every condition must be true (an AND rule). Use this to narrow down… for example, respondents from "Germany" who are older than 18.` Then the same three moves for `any`. Then a parenthesised compound for nesting. Directly reusable wherever a user must express a rule — filters, segments, eligibility conditions, notification triggers.
4. **State the prerequisite before the procedure, in one sentence.** "To show blocks conditionally, you need to hide them first." Six words that prevent the single most common failure of the feature. Any feature with a non-obvious precondition should open with it.
5. **Publish `Known limitations` with a named, unfixed defect and a route to upvote it.** Tally names its `Signature` field as not accessible, in a section headed "We're honest about what's not there yet", and links the feedback board item. This costs almost nothing and buys more credibility than a compliance badge. Condition: only works if the list is maintained; a stale `Known limitations` section is worse than none.
6. **Bound the unlimited claim in the same sentence, every time.** "unlimited forms and submissions, completely free, **as long as you stay within our fair usage guidelines**" — the qualifier is never detached from the claim on any commercial page, and the policy is a standing footer link. This is the Wise claim-then-bound pattern applied to usage rather than fees, and it is what makes an unlimited tier defensible.
7. **Name the mechanism in the label when the mechanism is the surprise.** `Hide button to disable completion` is inelegant and unmisunderstandable: it tells you the button will vanish, which is the part a user would otherwise discover in testing. Prefer the clumsy-and-clear label over the tidy-and-ambiguous one wherever the effect is irreversible or invisible.
8. **Define both identifiers side by side, with the scope of persistence stated.** "Respondent ID… persistent between all forms from within the same workspace" / "Submission ID… different for each submission." Two sentences that let an operator reason about deduplication and about privacy at the same time. Applies to any product exposing customer, session and transaction IDs.
9. **Disclose a default that flips on upgrade.** "By default, Tally forms are not indexed by search engines… Forms hosted on a custom domain are indexed by default" — plus the `noindex` snippet. A behaviour change triggered by a purchase is exactly the kind of thing users find out from a colleague; state it at the point of the purchase decision.

## Caveats & gaps

- **Ten pages inspected.** Not harvested: the features page, templates, changelog, roadmap, fair-use policy itself, GDPR article, terms, the other three comparison guides, and the great majority of the `Features` and `Guides` article bodies. The fair-use policy is the most significant omission — **every `unlimited` claim on the site is qualified by a document whose contents are unverified.**
- **All in-product strings are `[documented]`**, quoted inside Notion-rendered help pages describing the builder. The only respondent-facing UI strings recovered are `Next` and `Submit`, and those appear inside a warning callout about logic placement. **The respondent experience was not observed at all**; no form was submitted.
- **No empty states, no error strings, no validation messages, no toast copy.** T8 is `[absent]` except for the `Untitled` default; T7 describes failures without quoting any.
- **Two prices sets are live across Tally's own pages** ($24/$74 vs $29/$89). Neither is treated here as authoritative; both are recorded verbatim with their sources. The pricing page is the more likely current one but the comparison page gives no date.
- **The Tally-vs-Typeform comparison table is a competitor-authored document** and its Typeform column is marketing, not evidence. At least one row (`Prevent duplicate submissions`) contradicts Typeform's own published FAQ. **Every Typeform figure in that table should be treated as unverified**; it is included in this file only because the *Tally* column is a legitimate primary source for Tally's own vocabulary and pricing.
- **The Notion rendering pipeline degrades the source.** Visible hash anchors before headings, `![notion image]` alt on most screenshots, and two raw `app.notion.com` URLs leaked into a public answer. Where a string's exact rendering matters, re-verify in a browser.
- **No glossary page exists**, so the terminology in T13 is assembled from in-situ definitions across four articles rather than from a published standard. It is accurate but not authoritative in the way Typeform's glossary is.
- **The `one question per page` comparison in T12 is the most important finding in this file and rests on two sources only** — Tally's FAQ answer and Tally's comparison page. Tally has never publicly engaged with Typeform's 47% completion-rate claim, and Typeform has never publicly engaged with the multi-page counter-argument. That absence is reported as an absence, not inferred from anything.
- **Accessibility findings are based on the published article plus observed alt text and DOM structure.** No assistive-technology testing was performed. Tally's own statement that it holds no WCAG or ADA certification is quoted as published and not independently assessed.

## Sources

1. https://tally.so/
2. https://tally.so/pricing
3. https://tally.so/help
4. https://tally.so/help/input-blocks
5. https://tally.so/help/how-to-name-fields
6. https://tally.so/help/conditional-form-logic
7. https://tally.so/help/faq
8. https://tally.so/help/accessibility
9. https://tally.so/help/tally-a-free-typeform-alternative
10. https://status.tally.so
