# 195. GOV.UK

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | UK central government service portal (single-domain transactional government) |
| Primary URL | https://www.gov.uk/ |
| Corpus rank | 195 |
| Benchmark strength (source list) | Transactional plain language |
| Locale / market observed | en-GB (Welsh equivalents exist and are linked; `Rhestr o Wasanaethau Cymraeg` is a permanent footer link) |
| Platform observed | `www.gov.uk` (public site and Service Manual), `design-system.service.gov.uk` (GOV.UK Design System), `guidance.publishing.service.gov.uk` (GDS content and publishing guidance, in **Beta**) |
| Auth state | Unauthenticated public surfaces only. **No transactional service was started, no personal details were entered, and nothing was signed or submitted.** |
| Regulatory posture | Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018; WCAG 2.2 AA (self-declared **partially compliant**); Equality and Human Rights Commission as enforcement body; Equality Advisory and Support Service as escalation; Open Government Licence v3.0; Crown copyright |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 fetched successfully, 1 partial, 1 redirect chain recorded |
| Harvest completeness | **Full for the priority sections.** GOV.UK publishes its content standard, its form-design doctrine, and its error patterns as public, fully readable documents, so T5, T7 and T14 are evidenced directly from the normative source rather than inferred. The only material loss is the Error summary component's guidance prose, which exceeded the fetcher's size limit; the component's verbatim strings were recovered from its bare example page and its rules from the Validation pattern that governs it |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.gov.uk/ | Hero, `Popular on GOV.UK`, 16 category cards with scope lines, `Featured`, global footer |
| Live start page | https://www.gov.uk/apply-first-provisional-driving-licence | **Observed** transactional start page: eligibility list, price, `Start now`, `After you apply`, embedded step-by-step navigation |
| Accessibility statement | https://www.gov.uk/help/accessibility-statement | 20 enumerated WCAG failures, enforcement route, test provenance |
| Service Manual — Structuring forms | https://www.gov.uk/service-manual/design/form-structure | The question protocol; `Start with one thing per page` |
| GDS guidance — Writing guidelines index | https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/ | Eight-page structure of the writing standard |
| GDS guidance — Use clear language | .../writing-guidelines/clear-language/ | Plain-English mandate, literacy evidence, contractions, `must`/`need`/`can`, active voice, length limits |
| GDS guidance — Use the right tone | .../writing-guidelines/right-tone/ | The seven-point tone-of-voice definition |
| GDS guidance — A to Z style guide | .../style-guides/a-to-z-style-guide/ | ~3,100 lines. `Words to avoid` list captured in full, plus 15 named style rules |
| Design System — Error message | https://design-system.service.gov.uk/components/error-message/ | **The most-copied error guidance in government digital worldwide** |
| Design System — Error summary (example) | https://design-system.service.gov.uk/components/error-summary/default/ | Verbatim component strings |
| Design System — Error summary (guidance) | https://design-system.service.gov.uk/components/error-summary/ | **Partial** — exceeded size limit; navigation captured, prose not |
| Design System — Question pages | https://design-system.service.gov.uk/patterns/question-pages/ | One question per page, hint text, progress indicators, `Continue` rule |
| Design System — Recover from validation errors | https://design-system.service.gov.uk/patterns/validation/ | When and how to validate; the four-step error response |
| Design System — Check a service is suitable | https://design-system.service.gov.uk/patterns/check-a-service-is-suitable/ | Eligibility pattern, formerly `Check before you start` |
| Design System — There is a problem with the service | https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/ | Mandated 500-page copy, verbatim |
| Design System — Confirmation pages | https://design-system.service.gov.uk/patterns/confirmation-pages/ | The green panel, `Application complete`, `What happens next` |
| Retired style-guide path | https://www.gov.uk/guidance/content-design/writing-for-gov-uk | Redirect chain recorded — see T11 |

---

## T1 Navigation & IA labels

`[observed]`

### The homepage is a 16-item category list, and every item carries a scope line

GOV.UK's primary IA is a single flat list of sixteen life-domain categories. Each is a plain noun phrase and each has a one-line scope description beneath it. This is the whole of central government reduced to sixteen labels:

| Category | Scope line (verbatim) |
|---|---|
| `Benefits` | "Includes eligibility, appeals, tax credits and Universal Credit" |
| `Births, deaths, marriages and care` | "Parenting, civil partnerships, divorce and Lasting Power of Attorney" |
| `Business and self-employed` | "Tools and guidance for businesses" |
| `Childcare and parenting` | "Includes giving birth, fostering, adopting, benefits for children, childcare and schools" |
| `Citizenship and living in the UK` | "Voting, community participation, life in the UK, international projects" |
| `Crime, justice and the law` | "Legal processes, courts and the police" |
| `Disabled people` | "Includes carers, your rights, benefits and the Equality Act" |
| `Driving and transport` | "Includes vehicle tax, MOT and driving licences" |
| `Education and learning` | "Includes student loans, admissions and apprenticeships" |
| `Employing people` | "Includes pay, contracts, hiring and redundancies" |
| `Environment and countryside` | "Includes flooding, recycling, farming and wildlife" |
| `Housing and local services` | "Owning or renting and council services" |
| `Money and tax` | "Includes debt and Self Assessment" |
| `Passports, travel and living abroad` | "Includes renewing passports and travel advice by country" |
| `Visas and immigration` | "Apply to visit, work, study, settle or seek asylum in the UK" |
| `Working, jobs and pensions` | "Includes holidays, finding a job and redundancy" |

Three things are structurally important here.

**The categories are named for the user's life, not for government.** Not "Department for Work and Pensions" but `Benefits`. Not "HMRC" but `Money and tax`. Not "Home Office" but `Visas and immigration`. The single most consequential IA decision GOV.UK ever made was to organise by what the citizen is trying to do rather than by who does it, and the label set is the artefact of that decision.

**The scope lines are keyword lists, not sentences.** Eleven of sixteen begin with the word `Includes`. They are deliberately not descriptions — they are a bag of the specific words a user might be searching for, attached to the category that owns them. `Includes debt and Self Assessment` under `Money and tax` is doing search-term capture, not explanation.

**`Disabled people` is a category, not an accessibility feature.** Disabled people get a life-domain of their own alongside `Driving and transport`, scoped as "carers, your rights, benefits and the Equality Act". The A-to-Z style guide separately mandates the form: "`disabled people` — Not 'the disabled' or 'people with disabilities'."

**Defect, and it is on every page of GOV.UK.** The homepage body renders `Births, deaths, marriages and care`. The global footer — present on the homepage, the driving-licence page, the accessibility statement and the Service Manual page — renders `Births, death, marriages and care`. **Singular "death".** One typo in the global footer component, replicated across the entire estate.

### `Popular on GOV.UK` is a merchandising slot, and it is almost entirely sign-in

`[observed]`: `HMRC account: sign in or set up` · `eVisas: access and use your online immigration status` · `Universal Credit account: sign in` · `Personal tax account: sign in or set up` · `Childcare account: sign in` · `Check your State Pension forecast`.

Five of six are account access. The **`<Thing> account: sign in`** construction — colon, then the action — is a consistent title grammar for authenticated entry points, and it repeats in `More on GOV.UK` (`HMRC services: sign in`, `Childcare account: sign in`, `Student finance: sign in`). The colon form lets the noun front-load for search while the verb tells the user what happens.

Note the A-to-Z's own rule for titles: "use a colon to break up longer titles". The pattern is codified.

### Global navigation is one menu and one search

`[observed]`: `Menu` · `Search GOV.UK` · `Search`. Under `Menu` sits `Government activity` with six items, each with a scope line: `Departments` ("Departments, agencies and public bodies") · `News` ("News stories, speeches, letters and notices") · `Guidance and regulation` ("Detailed guidance, regulations and rules") · `Research and statistics` ("Reports, analysis and official statistics") · `Policy papers and consultations` ("Consultations and strategy") · `Transparency` ("Data, Freedom of Information releases and corporate reports").

**The split between `Services and information` and `Government activity` is the site's fundamental IA division** — things you need to do versus things the state is doing. Two audiences, two trees, one domain.

**Inconsistency:** the homepage body calls the sixth item `Transparency documents`; the menu and the footer call it `Transparency`.

### The footer is eight support links and a licence

`[observed]`: `Help` · `Privacy` · `Cookies` · `Accessibility statement` · `Contact` · `Terms and conditions` · `Rhestr o Wasanaethau Cymraeg` · `Government Digital Service`, then the Open Government Licence v3.0 statement and `© Crown copyright`.

`Rhestr o Wasanaethau Cymraeg` — "list of Welsh services" — appears **untranslated, in Welsh, in the English footer**. That is correct: a Welsh speaker scanning an English page will recognise their own language. Translating the link to "Welsh language services" would make it invisible to the people it is for.

`Accessibility statement` sits in the top-level footer of every page, fourth of eight. Not buried in a `Legal` sub-menu.

### The Design System has its own six-item IA

`[observed]`: `Get started` · `Styles` · `Components` · `Patterns` · `Community` · `Accessibility`. Within `Patterns`, the sub-navigation is grouped by **what the user is doing, phrased as a sentence stem**:

- `### Ask users for…` → Addresses, Bank details, Dates, Email addresses, Equality information, Names, National Insurance numbers, Passwords, Payment card details, Phone numbers
- `### Help users to…` → Check a service is suitable, Check answers, Complete multiple tasks, Confirm a phone number, Confirm an email address, Contact a department or service team, Create a username, Create accounts, Exit a page quickly, Navigate a service, Recover from validation errors, Start using a service
- `### Pages` → Confirmation pages, Cookies page, Interruption pages, Page not found pages, Question pages, Service unavailable pages, Step by step navigation, There is a problem with the service pages

**Grouping navigation labels by a sentence stem with an ellipsis is the strongest IA idea in this file.** `Help users to…` + `Recover from validation errors` reads as one sentence. The page title then renders the stem and the item together: `# Help users to  Recover from validation errors`. The label does double duty as a heading and as a list item, and the grammar holds in both positions.

(The rendered heading has a **double space** where the stem meets the item — `Help users to  Check a service is suitable`, `Help users to  Recover from validation errors`. A concatenation artefact, visible on at least three pattern pages.)

Every Design System page carries a scoping sentence immediately under the H1: "This guidance is for government teams that build online services. [To find information and services for the public, go to GOV.UK](https://www.gov.uk/)." **A disambiguation sentence, at the top of the page, for the reader who arrived at the wrong site.** It appears on the Error message and the 500-page patterns but not on Question pages, Validation, Confirmation pages, or Check a service is suitable — so the treatment is inconsistently applied.

## T2 Value proposition & headline patterns

`[observed]`

**The homepage H1 is a claim about the site, not about government:**

> `The best place to find government services and information`

Nine words, superlative, and it is the only marketing sentence on GOV.UK. It is also the meta description, verbatim. There is no hero image, no subhead, no CTA — the H1 is immediately followed by the search box and then by the category list. The entire persuasion budget of the UK government's website is one sentence, and the sentence's job is to tell you that you are in the right place.

**Section headings on the homepage are bare nouns or a noun plus a purpose line**: `Popular on GOV.UK` · `Services and information` · `Featured` · `Government activity` ("Find out what the government is doing") · `More on GOV.UK`.

`Government activity` is the only one with a scope line, and the line is a verb phrase addressed to the user: "Find out what the government is doing". Four words of explanation attached to the least self-evident label.

**The `Featured` cards are the closest thing to promotional copy**, and each is a title plus one sentence:

- `Find a job` — "Search and apply for jobs in England, Scotland and Wales."
- `National Insurance` — "Check your record to see if you can add more contributions."
- `Cost of living support` — "Find out what support is available to help with the cost of living."
- `Get the GOV.UK app` — "Your government services and information, on the go."

Three of four open with an imperative verb (`Search`, `Check`, `Find out`). The fourth, the app promo, is the only fragment without a verb and the only one written in marketing register — "on the go" is the single colloquialism on the homepage.

Note `Find a job`'s geographic bounding: "in England, Scotland and Wales." Northern Ireland is excluded and the exclusion is stated in the promotional sentence rather than discovered later. That is devolution disclosure done in four words.

**On a live transactional start page, the "value proposition" is eligibility and price.** The driving-licence page's opening paragraph is:

> "Get your first provisional driving licence for a car, motorbike, moped or other vehicle from DVLA (Driver and Vehicle Licensing Agency) online. To apply you must:
> - be at least 15 years and 9 months old
> - be able to read a number plate from 20 metres away
> - have been given permission to live in Great Britain (England, Scotland and Wales) for at least 185 days
>
> It costs £34 when you apply online."

Four sentences of content before the price, and the price is its own one-sentence paragraph. `15 years and 9 months` — not "nearly 16", not "16". `20 metres`. `185 days`. Every eligibility criterion is a **testable numeric threshold** the user can check against themselves without contacting anyone.

And `Great Britain (England, Scotland and Wales)` — the constitutional term followed immediately by its constituent parts, because "Great Britain" is genuinely ambiguous to most readers and the difference is material to eligibility.

**The Design System's page descriptions are one-line statements of purpose**: `Ask users questions to help them work out if they can or should use your service` · `Check the answers users give to make sure they're valid - and if there's an error, tell them what's wrong and how to fix it` · `Use this pattern to let users know they've completed a transaction` · `Follow this pattern whenever you need to ask users questions within your service`.

Each begins with a verb, each names the user, each fits on one line. There is no "empowering" or "seamless" anywhere.

## T3 CTA inventory

`[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start now` | Live start page, the transactional entry point | **The canonical GOV.UK primary action.** Two words. Not "Apply", not "Begin", not "Get started" |
| `Continue` | Mandated on every question page | See the rule below |
| `Back` | Mandated `Back link` at the top of every question page | |
| `Search` | Homepage, twice (button and label `Search GOV.UK`) | |
| `Menu` | Global nav | |
| `Accept additional cookies` / `Reject additional cookies` / `View cookies` | Cookie banner on `www.gov.uk` | |
| `Accept analytics cookies` / `Reject analytics cookies` / `View cookies` / `Hide cookie message` | Cookie banner on the Design System | **Two different cookie-banner label sets across two GOV.UK properties** |
| `Skip to main content` | `www.gov.uk` renders `#content`; Design System renders `#main-content` | Same label, two anchor targets |
| `Skip past section navigation` | GDS publishing guidance only | A second, more specific skip link — good practice, but unique to one property |
| `Back to top` | Design System and A-to-Z style guide | |
| `Show all updates` | Service Manual and live content pages | Reveals the full revision history |
| `Cancel` | The survey banner's dismiss control | A bare `Cancel` as the dismiss for a non-modal banner |
| `Please fill in this survey (opens in a new tab and requires JavaScript)` | Site-wide feedback banner | See T14 — this string breaks GOV.UK's own rule |
| `Give feedback about this page` | Service Manual | |
| `What did you think of this service?` | Mandated on confirmation pages, followed by `(takes 30 seconds)` | **A feedback CTA with its own time cost disclosed in the label** |
| `Request an accessible format` | Referenced in the accessibility statement as a control on PDF pages | |
| `Contact the team` | Design System, every page | |
| `Sign in to apply` | Section heading on the live start page | A heading that functions as a CTA |

### The `Continue` rule is the sharpest CTA guidance in the corpus

`[observed]`, verbatim from the Question pages pattern:

> Make sure your 'Continue' button is:
> - labelled 'Continue', not 'Next'
> - aligned to the left so users do not miss it

Two bullets. The first is a **prohibition on a specific near-synonym**. The second gives a reason for the alignment. Most design systems say "use clear button labels"; GOV.UK names the wrong word.

`Start now` and `Continue` between them cover the entire forward motion of a government transaction. Two labels. No variants.

### `(takes 30 seconds)` is the transferable micro-pattern

The confirmation page's mandated feedback link is `What did you think of this service?` followed in plain text by `(takes 30 seconds)`. The cost of the optional action is disclosed in parentheses, in the same line, before the click. Compare every product in this batch that says "Give feedback" and discloses nothing.

### An absence worth recording

There is **no `Learn more` anywhere in the GOV.UK harvest**, in any casing, on any of fifteen pages. Link text is front-loaded and specific by rule (A-to-Z: "Front-load your link text with the relevant terms and make them active and specific"), and the rule holds. Live examples from the driving-licence page: `read a number plate from 20 metres away` · `Check what vehicles you can drive and when` · `replace your provisional licence if it's lost, stolen, damaged or destroyed` · `reapply for your provisional licence if you've been disqualified`.

The last two are eleven and nine words of link text respectively, and they work, because the link text *is* the sentence about the user's situation.

## T4 Onboarding & getting-started

`[observed]`

GOV.UK has no onboarding in the product sense — there is no account, no first run. What it has instead is a **start page**, a **step-by-step navigation** pattern for multi-service journeys, and an **eligibility checker** pattern for complex gating. All three are named, published artefacts.

### The start page is a fixed six-section template

From the live provisional-licence page `[observed]`, the section order is:

1. Untitled opening: what the service is, who provides it, eligibility as a `you must` list, price
2. `Sign in to apply` — the authentication warning, *before* the button
3. `Start now`
4. `After you apply` — what happens next and how long
5. `How much it costs` — price again, plus accepted payment methods
6. `When you can drive with a provisional licence` — what the thing you are getting actually lets you do
7. `If you already have a provisional licence` — four alternative journeys for people who are on the wrong page
8. `Apply by post` — the offline alternative, with the higher price

Several things are doing real work.

**The authentication warning precedes the button, and it is honest about the worst case:**

> "You'll need to sign in to use this service. If you do not already have sign in details, you'll be able to create them.
> **You'll be told when you sign in if you need to prove your identity.** This is to keep your details safe and usually involves using photo ID like a passport."

Note the construction of the second sentence. GOV.UK does not know whether *this* user will be asked to prove identity, so it does not promise either way — it says *when* you will find out. "You'll be told when you sign in if you need to…" is a **disclosure about the timing of a disclosure**, and it is the correct answer when the vendor genuinely cannot predict. Then the reason, then the concrete example (`photo ID like a passport`) so the user can check whether they have one.

**`If you already have a provisional licence` is a wrong-page rescue section**, listing four alternative services. The start page for a first-time applicant spends a section on people who should not be there.

**The offline alternative is given in full, with its price disadvantage stated**: form `D1 'Application for a driving licence'`, available from Post Offices, "along with a cheque or postal order for **£43**" — against £34 online. The paper route costs £9 more and the page says so without editorialising. GDS's `clear-language` guidance and the A-to-Z's Links entry both mandate this order: "Always link to online services first. Offer offline alternatives afterwards, when possible."

**Welsh is offered as a peer**: "This service is also available in Welsh (Cymraeg)." One sentence, with the language named in both English and Welsh.

### Step by step navigation

`[observed]` on the same page, and this is GOV.UK's answer to a journey that crosses many services.

Header breadcrumb: **`Part of` `Learn to drive a car: step by step`**. Then at the foot, the full seven-step expansion, with the current page marked `You are currently viewing:`.

The step labels, verbatim:

1. `Step 1: Check you're allowed to drive` — "Most people can start learning to drive when they're 17."
2. `Step 2: Get a provisional licence`
3. `Step 3: Driving lessons and practice` — "You need a provisional driving licence to take lessons or practise."
4. `and Prepare for your theory test`
5. `Step 4: Book and manage your theory test` — "You need a provisional driving licence to book your theory test."
6. `Step 5: Book and manage your driving test` — "You must pass your theory test before you can book your driving test."
7. `Step 6: When you pass` — "You can start driving as soon as you pass your driving test." plus "You must have an insurance policy that allows you to drive without supervision."

Four features worth extracting:

- **`and Prepare for your theory test` is an unnumbered step.** It sits between Step 3 and Step 4 and is introduced with a lowercase `and`, signalling a parallel activity rather than a sequential one. A step-by-step model that admits some steps happen *alongside* rather than *after* is a genuinely sophisticated piece of information design, and it is expressed with one word.
- **Prices are appended to individual links**: `Apply for your first provisional driving licence £34 to £43`, `Book your theory test £23`, `Book your driving test £62 to £75`. A user can read the total cost of learning to drive off the navigation component.
- **Each step's intro sentence states its dependency**, not its content: "You need a provisional driving licence to book your theory test." The navigation explains the ordering constraint rather than describing the step.
- **`You are currently viewing:`** as the you-are-here marker, spelled out rather than indicated by styling alone.

### `Check a service is suitable` — the eligibility pattern

`[observed]`. Formerly called `Check before you start`, and the rename is documented on the page: "Please note this pattern used to be called 'Check before you start'."

The rule for when to use it is a cost-benefit statement, not a preference:

> "If you have complicated eligibility requirements you should follow this pattern. This will save users from having to read through large amounts of documentation outside of your service to work out if they can use it."

And the negative case is equally explicit: "Do not use this pattern if you can reasonably include information users need to know about your service and its eligibility requirements on a start page." Plus: "If there are general rules about whether a service can or cannot be used such as an age limit or fixed deadline, include these on the start page." — which is exactly what the driving-licence start page does.

The results page must show, where applicable: eligibility, "if they have to use your service", cost, "how much money they'll get from using it", and "how long the whole process will take". And the failure case is mandated: **"If a user is not eligible to use your service, explain why and, if possible, tell them what they should do instead."**

The justification includes the government's own cost: "It can also help reduce time and money spent processing queries from users confused about whether they're eligible." A design pattern justified on call-centre volume.

## T5 Form & field labels

**PRIORITY SECTION.** GOV.UK's form doctrine is published as a normative standard across two documents — the Service Manual's `Structuring forms` and the Design System's `Question pages` pattern — and it is the most complete public form-content standard in existence.

### The question protocol: you must justify every question before you ask it

`[observed]`, from the Service Manual, verbatim:

> "Before you start, make a list of all the information you need from your users.
> Only add a question if you know:
> - that you need the information to deliver the service
> - why you need the information
> - what you'll do with it
> - which users need to give you the information
> - how you'll check the information is accurate
> - how to keep the information up to date and secure
>
> This list is called a 'question protocol' - it's different from the form itself because it's about how you'll use the answers."

**Six preconditions on the existence of a form field.** Not on its label, not on its validation — on whether it may exist at all.

And then the sentence that explains why the artefact exists:

> "A question protocol forces you (and your organisation) to question why you're asking users for each item of information. **It gives you a way of challenging and pushing back against unnecessary questions if you need to.**"

This is the most politically candid sentence in the entire corpus. GDS is telling a civil servant that the question protocol is a **weapon against their own organisation** — a documented procedure a designer can point at when a policy owner demands a field. The Question pages pattern repeats the pointer: "To help you work out what to ask, you can carry out a question protocol", linking out to the original UXmatters article that coined it.

Naming a governance artefact, publishing its six criteria, and stating out loud that its purpose is internal resistance is a content-design move with no equivalent in any commercial product in this corpus.

### One thing per page

`[observed]`, from the Service Manual, verbatim:

> "Start by splitting the form across multiple pages with each page containing just one thing, for example:
> - one piece of information you're telling a user
> - one decision they have to make
> - one question they have to answer"

Note that "one thing" is defined as **three different kinds of thing**, and that the first is *telling*, not asking. A page that only informs counts as a thing.

The stated benefits, verbatim — and they are split into benefits for the user and benefits for the team:

> Starting with one thing on a page helps people to:
> - understand what you're asking them to do
> - focus on the specific question and its answer
> - find their way through an unfamiliar process
> - use the service on a mobile device
> - **recover easily from form errors**
>
> It also helps you to:
> - save a user's answers automatically as they go
> - capture analytics about each question
> - handle branching questions and loops

**Listing the organisational benefits separately is the reason this doctrine survived.** A designer arguing for one-thing-per-page against a policy owner who wants a single long form now has three operational arguments (autosave, per-question analytics, branching) that have nothing to do with usability. The content is written for the internal fight.

The rule is stated as a *starting point*, not an absolute: "**Start by** splitting the form…" and "User research will tell you when you can merge pages together. For example, if you're designing an internal service for government users who need to repeat and switch between tasks quickly." The exception is named, bounded to internal users, and conditioned on research.

The Design System repeats it as `#### Start by asking one question per page` with an additional technical justification: setting the `<legend>` or `<label>` as the page heading "is good practice as it means that users of screen readers will only hear the contents once."

### Question ordering is a doctrine too

`[observed]`: "Start with questions that will let users know if they're not eligible for the service, **so you do not waste people's time.**" And: "Use 'branching' questions so people only have to answer questions that are relevant to them." And: "You need to decide which group of users you want to prioritise. Make sure you know the relative size of your different user groups and how your decisions will affect them."

That last sentence is an explicit instruction to **make and own a trade-off between user groups**, rather than pretending a form can be optimal for everyone.

### Label and heading rules

`[observed]`, from Question pages:

- "Page headings can be questions or statements." Both are permitted.
- "**Use questions or statements consistently** to help users get into a rhythm of answering. This lets them focus on the content of the questions rather than their presentation." (Service Manual.) The consistency matters more than the choice.
- "Do not use the same page heading across multiple pages."
- "The page heading should relate specifically to the information being asked for on the current page, not any higher-level section the page is part of." The section goes in a `govuk-caption` above the H1 — observed example: `<span class="govuk-caption-l">About you</span>` above `<h1>What is your home address?</h1>`.
- Observed question headings: `Where do you live?` · `What is your date of birth?` · `What is your home postcode?` · `What is your nationality?` · `When was your passport issued?` · `Do you have any interview needs?` · `How many hours do you work a week?`
- Observed statement headings: `Passport details` · `Interview needs` · `Your details` · `Address line 1`
- Field labels observed: `Day` · `Month` · `Year` · `Passport number` · `Expiry date` · `National Insurance number` · `England` / `Scotland` / `Wales` / `Northern Ireland` · `British` / `Irish` / `Citizen of another country` · `Yes` / `No`

`Citizen of another country` rather than "Other" is a small, deliberate dignity choice in a nationality field.

### Optional and mandatory

`[observed]`, verbatim:

> "If you ask for optional information:
> - in most contexts, add '(optional)' to the labels of optional fields
> - for Radios components and Checkboxes components, add '(optional)' to the legend
>
> **Never mark mandatory fields with asterisks.**"

`Never` in bold-equivalent absolute terms, and the positive rule inverted: mark the *optional* things, not the required ones. Since most fields on a government form are required, marking the minority is less visual noise and carries more information.

Plus: "allow users to answer 'I do not know' or 'I'm not sure' if they are valid responses." Two verbatim suggested option labels for uncertainty — and note `I do not know`, not "I don't know", obeying the negative-contraction rule.

### Hint text has four rules and a screen-reader rationale

`[observed]`, verbatim:

- "Use hint text to show information that helps the majority of users answer the question, like how their information will be used, or where to find it."
- "**Keep each hint to a single short sentence, without any full stops.**"
- "If you need to give a long, detailed explanation, do not use hint text. Screen readers will read out the entire text when users interact with the form element. This could frustrate users if the text is long."
- "**Do not use links in hint text.** While screen readers will read out the link text when describing the field, they usually do not tell users the text is a link."

Both prohibitions are justified by **what a screen reader does**, not by visual design. The no-full-stops rule exists because the hint is read as part of the field's accessible description, not as a sentence.

Observed hint text: `For example, 27 3 2007` · `For example, 31 3 1980` · `For example, 502135326` · `If you have dual nationality, select all options that are relevant to you` · `It's on your National Insurance card, benefit letter, payslip or P60 – for example, 'QQ 12 34 56 C'`

The National Insurance hint is the model: **where to find it, in four named places, then the format as a live example.** It answers "where do I get this" before "what shape is it".

### The escape hatch for questions that genuinely need explanation

`[observed]`, and this is the pattern's best passage. When hint text is not enough:

> - a `h1` heading that's a statement (for example, 'Interview needs') rather than a question
> - whatever mix of text, paragraphs, lists and examples best explains your question to users
> - a label, above the form input, that asks users a specific question – for example, 'Do you have any interview needs?'

So the page becomes: statement heading → explanation in whatever form works → the actual question as a `legend` at `--m` size. The observed example's body is four short paragraphs, and the last one is a **route out of the form entirely**: "Contact your provider if you're concerned about the interview process."

### Progress indicators: test without one first

`[observed]`, verbatim: "Start by testing your form without a progress indicator to see if it's simple enough that users do not need one. Try improving the order, type or number of questions before adding a progress indicator."

Then the permitted form — a caption above the heading: `<span class="govuk-caption-l">Question 3 of 9</span>` — with the condition "Only include the total number of questions if you can do so reliably."

And the prohibited form, with six stated reasons. The banned indicator is one that does all three of: "show all questions at once", "allow navigation to previous questions", "show the current question". Reasons: "are often not noticed", "take up lots of space", "do not scale well on small screens", "can distract and confuse some users", "**make it hard to write good labels for the steps**", "make it hard to handle conditional sections".

The fifth reason is a *content* objection to a *layout* component, and it is correct: a twelve-step indicator forces twelve two-word labels that no one can write well. Evidence follows: "A number of GOV.UK services have removed this style of progress indicator without any negative effects", citing the Carer's Allowance team removing a 12-step indicator "with no effect on completion rates or times."

### Other form rules

`[observed]`:

- "Make sure to only ask for a piece of information once within a single journey." With two named remedies: pre-populating, or "showing carried-forward responses as an option for the user to select".
- The `Back link` is mandatory and its rationale is distrust: "Some users do not trust browser back buttons when they're entering data." Plus a hard constraint — "do not break the browser back button" — and an exception for one-time actions: "The browser back button should still work, but show the user a sensible message rather than let them perform the action again."
- Avoid range sliders: "These types of controls are difficult for some users to interact with", tied to "WCAG success criterion 2.5.1 Pointer Gestures".
- "Asking a question does not necessarily mean you should use one form field. For example, date of birth is best captured with 3 text fields."
- Autocomplete tokens are specified in the reference markup (`bday-day`, `bday-month`, `bday-year`, `postal-code`), so the pattern carries browser-autofill semantics as part of the content spec.

## T6 Status & state language

`[observed]` and `[documented]` — smaller than for the commercial products, because GOV.UK's transactional states live inside individual services, but the *pattern-level* state vocabulary is published.

### The four named page states of a government transaction

The Design System names four distinct "something is wrong" pages and forbids conflating them:

| Pattern | Meaning | Mandated H1 |
|---|---|---|
| `There is a problem with the service pages` | "an unexpected problem with the service" (500 / internal server error) | `Sorry, there is a problem with the service` |
| `Service unavailable pages` | A problem that "cannot be fixed quickly" — close the service | — (not harvested) |
| `Page not found pages` | 404 | — (not harvested) |
| Error summary / Error message | A validation error the user can fix | `There is a problem` |

**The distinction between the four is drawn by who can fix it and how long it will take**, and it is stated twice in identical terms — once in the Error message component and once in the Validation pattern:

> "Do not use error messages to tell a user that they are not eligible or do not have permission to do something. Or to tell them about a lack of capacity or other problem the user cannot fix - **because the problem is with the service rather than with the information the user has provided.**"

That clause is the whole taxonomy in one sentence: **an error message is for a problem in the user's input; a page is for a problem in the world.** Everything downstream follows from it.

And the escalation rule between the first two is a duration: "Only display the page for a short time. If a problem cannot be fixed quickly, close the service and use a Service unavailable page."

### The completion state

`[observed]`, from Confirmation pages. The state is rendered in a green panel with two elements:

> `Application complete`
> `Your reference number` / **`HDJ2123F`**

Two words for the state, then the reference number as the only other thing in the panel. Below it, in body text: "We have sent you a confirmation email." then `## What happens next`.

**`What happens next` as a mandated H2 on every confirmation page** is the state-design decision. GOV.UK does not treat "complete" as an end state — it treats it as a handover, and requires the page to name the next actor. The observed body: "We've sent your application to Hackney Electoral Register Office. They will contact you either to confirm your registration, or to ask for more information."

Two sentences, and the second gives **both branches** of what the other party might do. The user is told that "we'll be in touch" has two possible meanings.

Required contents of a confirmation page, verbatim:

> - a reference number, if there is one
> - details of what happens next and when
> - contact details for the service
> - links to information or services that users are likely to need next
> - a link to your feedback page
> - a way for users to save a record of the transaction, for example, as a PDF

### The answer-retention state is treated as a state and must be disclosed

`[observed]`, and this is unusually careful. The 500-page pattern requires "information about what has happened to their answers if they are in the middle of a transaction", and publishes **both** variants verbatim:

> "We saved your answers. They will be available for 30 days."
> "We have not saved your answers. When the service is available, you will have to start again."

Two sentences each. The good case gives a duration. The bad case gives the consequence in the user's terms ("you will have to start again") rather than the system's ("session not persisted"). Note `We have not saved` rather than "We haven't saved" — the negative-contraction rule holding inside an error page.

And the same principle governs validation: "Do not clear any form fields when showing the Error message component. **Keep both passing and failing answers.**"

### Field-level state

`[documented]` from the markup: `govuk-form-group--error` and `govuk-input--error` are the error state classes, and the guidance describes the visual encoding in content terms: "put the message in red after the question text and hint text"; "use a red border to visually connect the message and the question it belongs to"; "if the error relates to a specific field within the question, give it a red border and refer to that field in the error message".

### Service phase as a state

`[observed]`: the `Phase banner` component and the `govuk-tag` — the observed example renders `Prototype` with the body "This isn't a real service – it is an example." The GDS content guidance site itself carries a live **`Beta`** banner: "**Beta** Help improve the content and publishing guidance. Give your feedback (opens in new tab)."

**GOV.UK labels the maturity of its own content standard on every page of it.** The document that defines how government writes is itself marked as not finished.

## T7 Error, failure & recovery

**PRIORITY SECTION.** This is the most-copied error guidance in government digital worldwide, and it is worth quoting closely because the value is in the specificity of the prohibitions.

### The error summary, verbatim

`[observed]` from the component's example page — the complete rendered content:

> `There is a problem`
> - Enter your full name
> - The date your passport was issued must be in the past

**Four words as the H2 of every error state in UK government.** Not "Oops", not "Something went wrong", not "Please correct the errors below", not a count. `There is a problem` — singular, definite, no actor, no apology, no exclamation.

Contrast it with the H1 of the 500 page: `Sorry, there is a problem with the service`. The two strings are deliberately parallel and deliberately different. The summary says *there is a problem* (yours, fixable, here). The 500 page says *sorry, there is a problem with the service* (ours, not fixable by you, apologised for). The apology appears in exactly the case where the user did nothing wrong. **The word "sorry" is used as a signal of fault attribution**, and its presence or absence is the tell.

The list items are the error messages themselves, repeated verbatim from beside the fields, as links.

### The four-step error response

`[observed]`, from the Validation pattern, verbatim:

> If the user's answers fail validation:
> - show them the page again, with the form fields as the user filled them in
> - **add 'Error: ' to the beginning of the page `<title>`** so screen readers read it out as soon as possible
> - show an Error summary component at the top of the page, **and move keyboard focus to it**
> - show Error message components next to fields with errors

Four steps, two of which are invisible to a sighted mouse user. Prefixing the `<title>` and moving keyboard focus are the two that make the pattern accessible, and they are given equal billing with the two visible ones. Most error guidance treats these as an accessibility footnote.

### The prohibition list — the single most quotable passage in this corpus

`[observed]`, verbatim from `### Be clear and concise`:

> Do not use:
> - technical jargon like 'form post error', 'unspecified error' and 'error 0x0000000643'
> - words like 'forbidden', 'illegal', 'you forgot' and 'prohibited'
> - **'please' because it implies a choice**
> - **'sorry' because it does not help fix the problem**
> - **'valid' and 'invalid' because they do not add anything to the message**
> - humourous, informal language like 'oops'

Six prohibitions, and **four of them carry a reason**. This is what makes the guidance enforceable rather than stylistic: a writer who wants to keep "please" has to argue against "it implies a choice", not against a preference.

The reasons are also individually excellent:

- **`please` implies a choice.** In a validation error there is no choice — the user cannot continue. A politeness marker that implies optionality is actively misleading.
- **`sorry` does not help fix the problem.** The test is utility, not tone.
- **`valid`/`invalid` do not add anything.** "Enter a valid email address" tells the user nothing they did not know; the useful message names the actual defect.
- **`forbidden`, `illegal`, `prohibited`, `you forgot`** — three of the four are accusatory legal register, and `you forgot` attributes a cognitive failure to the user.

Then two more rules in the same section:

> "Do not give an example in the error message if there is an example on the screen. For example, if you are asking for a National Insurance number and include 'QQ 12 34 56 C' as hint text, do not include an example in the error message."
>
> "Above all, aim for clarity.
> **Read the message out loud to see if it sounds like something you would say.**"

The read-aloud test is the only subjective instruction in the whole document, and it is placed last, after the objective rules, as the tiebreaker.

### Be specific — the banned generic messages

`[observed]`, verbatim:

> General errors are not helpful to everyone. They do not make sense out of context. Avoid messages like:
> - 'An error occurred'
> - 'Answer the question'
> - 'Select an option'
> - 'Fill in the field'
> - 'This field is required'

**Five specific strings named and banned**, including `This field is required`, which is the default output of virtually every form library in existence. And the reason is given as a taxonomy of what can actually go wrong:

> "Different errors need different messages. For example, text fields may be:
> - empty
> - too long
> - too short
> - using characters that are not allowed
> - in the wrong format"

Five distinct failure modes for one input type. `This field is required` collapses all five into one.

### Instructions versus descriptions — the most subtle rule

`[observed]`, verbatim, and this is the rule most other design systems lack entirely:

> Some errors work better as instructions and some work better as descriptions. For example:
> - 'Enter your first name' is clearer, more direct and natural than 'First name must have an entry'
> - 'Enter a first name that is 35 characters or less' is wordier, less direct and natural than 'First name must be 35 characters or less'
> - 'Enter a date after 31 August 2017 for when you started the course' is wordier, less direct and natural than 'Date you started the course must be after 31 August 2017'
>
> **Use both instructions and descriptions, but use them consistently.** For example, use an instruction for empty fields like 'Enter your name', but a description like 'Name must be 35 characters or less' for entries that are too long.

Three worked pairs, each with a stated verdict, and then a rule that resolves them: **imperative for absence, declarative for constraint violation.** "You haven't given me a thing" is an instruction; "the thing you gave me breaks a rule" is a description. That is a genuinely non-obvious grammatical distinction derived from a semantic one, and it is the single most transferable paragraph in this file.

### Match up error messages to labels

`[observed]`, verbatim: "Error messages should directly include language from the question or fieldset label. This helps match up the error message with the relevant form field."

> Example 1:
> - Label: 'How many hours do you work a week?'
> - Error message: 'Enter how many hours you work a week'
>
> Example 2:
> - Label: 'Address line 1'
> - Error message: 'Enter address line 1, typically the building and street'

Example 1 shows the transformation: the question's own words, de-interrogated, prefixed with `Enter`. Example 2 shows the addition of disambiguating detail (`typically the building and street`) that was not in the label — so the error message is allowed to be *more* helpful than the label, just not differently worded.

### Be consistent — one string, two places

`[observed]`, verbatim: "Use the same message next to the field and in the Error summary component so they:
- look, sound and mean the same
- make sense out of context
- **reduce the cognitive effort needed to understand what has happened**"

"Make sense out of context" is the constraint that generates most of the other rules. The error-summary link is read on its own, detached from the field it describes, so `Select an option` is useless there while `Select if you are British, Irish or a citizen of a different country` works.

### Observed error strings

`[observed]`, all from the Design System's reference markup:

| Error message | Context |
|---|---|
| `The date your passport was issued must be in the past` | Date input, description form |
| `Select if you are British, Irish or a citizen of a different country` | Checkboxes with legend |
| `Enter a National Insurance number in the correct format` | Text input with label |
| `Enter your full name` | Error summary example |
| `Rhowch eich enw llawn` | The Welsh example |
| `you must enter a year` | Inline example in the field-specific guidance |

The Welsh example carries a second lesson: the visually hidden prefix is configurable. `<span class="govuk-visually-hidden">Gwall:</span>` replaces `Error:`. A screen-reader affordance that is localised rather than hard-coded.

### The hidden `Error:` prefix

`[observed]`: "To help screen reader users, the error message component includes a hidden 'Error:' before the error message. These users will hear, for example, 'Error: The date your passport was issued must be in the past'."

Combined with the `<title>` prefix rule, a screen-reader user hears "Error" three times on an error page — in the title, in the summary, and before each field message — by design, at three different moments of orientation.

### When and how to validate

`[observed]`, verbatim:

> "Do not validate when the user moves away from a field. Wait until they try to move to the next part of the service - usually by clicking the 'continue' or 'submit' button at the bottom of the page.
>
> Generally speaking, avoid validating the information in a field before the user has finished entering it. This sort of validation can cause problems - **especially for users who type more slowly.**"

The named harm is speed of typing, which maps onto motor impairment, cognitive load, unfamiliar keyboards and second-language users without naming any of them.

The single documented exception is `Character count`, justified because "it's important that users do not spend time and effort writing out a response that turns out to be too long" — a cost-of-late-feedback argument, not a preference.

**And the rule that most implementations get wrong**, verbatim: "**Turn off HTML5 validation.** … Do not use it because: the visual style, placement and content of HTML5 error messages cannot be made consistent with the GOV.UK Design System; we know that the GOV.UK Design System error message and error summary components are accessible. To turn off HTML5 validation, add 'novalidate' to your form tags. **Do not add 'required' to your input fields.**"

GOV.UK deliberately disables the browser's own error messages because it cannot control their wording. That is a content decision expressed as a technical mandate, and it is the clearest statement anywhere that error copy is a designed artefact rather than a platform default.

### Validation should be forgiving

`[observed]` — the prevention half, which is easy to overlook:

> "minimise your chances of needing to show an error message in the first place by:
> - making sure your questions are well designed
> - accepting information in different formats, as long as it's not ambiguous (for example, accept postcodes with or without spaces - and **names that include a non-alphabetical character or an apostrophe, accent or other diacritic**)"

And: "Use validation to ignore unwanted characters… You should ignore unwanted characters entered: as part of numbers and codes, such as postcodes or card details; before or after an answer, as users might have copied and pasted them in by accident; **by dictation software – this is particularly common when dictating numbers**."

Three named causes of stray characters, one of which is assistive technology. The best error message is the one the system decides not to show.

### The 500 page, mandated verbatim

`[observed]`. The pattern specifies the exact strings:

> These pages should have:
> - '**Sorry, there is a problem with the service – service name – GOV.UK**' as the page title
> - '**Sorry, there is a problem with the service**' as the H1
> - '**Try again later.**' as a normal paragraph
> - information about what has happened to their answers if they are in the middle of a transaction
> - contact information, if it exists and helps meet a user need
> - a link to another service, if they can use it to do what they came to do

And the prohibitions:

> Have clear and concise content and do not use:
> - breadcrumbs
> - **jargon like 500 or bad request**
> - **'We are experiencing technical difficulties'**
> - **red text to warn people**

`We are experiencing technical difficulties` is named and banned as a specific string. No breadcrumbs, because a broken page is not a place in the hierarchy. No red, because red is reserved for things the user can fix.

**`Try again later.` is three words with a full stop, as its own paragraph.** No estimate, no apology repeated, no explanation. And the pattern says why an estimate is impossible, in the research section:

> "The user needs identified were to say:
> - when the service will be available
> - how they can do what they came to do
>
> **We cannot meet the first need because we do not know what has happened.**"

A design pattern that states, in public, which of its users' two needs it fails to meet and why. That sentence is the single best piece of honest content-design writing in this corpus.

The contact-information block in the observed example is a model of its own: `Phone:` / `0808 157 3900`, `Textphone:` / `0808 157 3909`, `Outside UK:` / `+44 0808 157 0192`, `Opening times:` / `Monday to Friday: 8am to 8pm`, then "Closed Easter Sunday, Christmas Day, Boxing Day and New Year's Day." Four contact routes including a textphone, plus the named closure days.

### The known tension, admitted on the page

`[observed]`. The 500-page pattern's `### Next steps` lists what further research is needed, and the last item is:

> "if people expect to see **please and sorry**"

The Error message component says do not use `please` (implies a choice) and do not use `sorry` (does not help). The 500-page pattern **mandates `Sorry` in the H1**. And the pattern's own research section flags the question as open.

This is a real, live, internally acknowledged contradiction in the most influential content standard in government digital. It is also defensible — the two cases have different fault attribution, as argued above — but GOV.UK has not written the reconciling sentence, and its own docs know it.

## T8 Empty states

`[absent]` as a named pattern — GOV.UK's Design System has no "empty state" pattern, and none was observed on a public page.

The functional equivalents are three named page patterns, two of which were harvested:

- `There is a problem with the service pages` — nothing is available because it broke
- `Service unavailable pages` — nothing is available because it is closed (not harvested)
- `Page not found pages` — nothing is here (not harvested)

Plus the eligibility failure case, which is the nearest thing to a content-level empty state `[observed]`: "If a user is not eligible to use your service, explain why and, if possible, tell them what they should do instead." Two obligations — the reason, and the alternative.

The absence of an empty-state pattern is itself a finding: GOV.UK services are transactional rather than data-holding, so the "you have nothing yet" state that dominates commercial SaaS barely arises. Where it would arise — a returning user with no applications — the Confirmation pages pattern covers the adjacent case instead, under `### Help users who bookmark the page`, which requires a service to "respond in a helpful way when users return using a bookmarked link", with three named routes: tracking an application, starting a new one, or "what to do or who to contact if they have a problem".

## T9 Notifications & system messages

`[observed]`

**GOV.UK's public notification surface is thin by design** — it does not push. What exists:

**The feedback banner**, present on every `www.gov.uk` page harvested:

> `## Help us improve GOV.UK`
> "To help us improve GOV.UK, we'd like to know more about your visit today. [Please fill in this survey (opens in a new tab and requires JavaScript)](…)"
> `Cancel`

Three observations. It uses `Please`, which the tone guidance bans (see T14). It discloses **two** properties of the link in one parenthetical — that it opens in a new tab *and* that it requires JavaScript — which is unusually complete and useful for users on restricted setups. And its dismiss control is a bare `Cancel`, which is the wrong verb for dismissing a request (you are not cancelling anything).

**Cookie banners** `[observed]` differ across properties: `www.gov.uk` offers `Accept additional cookies` / `Reject additional cookies` / `View cookies`; the Design System offers `Accept analytics cookies` / `Reject analytics cookies` / `View cookies` / `Hide cookie message`. **`additional` versus `analytics`** is a substantive difference — one names the category by relation to the essential set, the other by function — and both are more specific than the "Accept all" that dominates the web.

**The phase banner** `[observed]` is the standing system message about a service's own maturity: `Beta` on the GDS publishing guidance with "Help improve the content and publishing guidance"; `Prototype` in the Design System example with "This isn't a real service – it is an example."

**Change notification is a first-class content type** `[observed]`. Every guidance page carries `## Updates to this page` with a dated changelog. The Service Manual's form-structure page:

> Published 7 December 2016
> Last updated 7 August 2018 — Show all updates
> 1. 7 August 2018 — "Added links to the Check a service is suitable design pattern and a blog post about the US healthcare service"
> 2. 7 December 2016 — "Guidance first published"

And there is a dedicated guidance page in the writing standard for this: `Write change notes`. **A published house standard for how to write the note that says what changed** is a content-ops artefact almost no organisation maintains.

The accessibility statement carries its own provenance block: "This statement was prepared on 23 September 2019. It was last reviewed on 29 January 2026. This website was last tested in March 2025 against the WCAG 2.2 AA standard. This test of a representative sample of pages was carried out by the Digital Accessibility Centre." Three dates, one named auditor, one stated sampling method.

**Transactional notification is described on the start page, not sent** `[observed]`: "DVLA will send you a confirmation email once you've applied." And on the confirmation page: "We have sent you a confirmation email." Past tense on the confirmation, future tense on the start page.

## T10 Disclosures, legal & compliance

`[observed]`

### The eligibility disclosure is the primary disclosure form

Government's version of a fee table is a `you must` list. From the live start page:

> "To apply you must:
> - be at least 15 years and 9 months old
> - be able to read a number plate from 20 metres away
> - have been given permission to live in Great Britain (England, Scotland and Wales) for at least 185 days"

Three criteria, three numeric thresholds, all self-checkable. The A-to-Z governs the modal verb precisely — see the `must` / `need` / `can` rule below — so `you must` here is a statement that these are hard conditions, not advice.

### The modal-verb rule is a compliance instrument

`[observed]`, from `Use clear language`, verbatim and in full because it is the most legally consequential style rule GDS publishes:

> "If you're talking about a legal requirement, use '**must**'. For example: 'Your employer must pay you the National Minimum Wage (NMW)'.
>
> If you feel that 'must' does not have enough emphasis, then use '**legal requirement**', '**legally entitled**' and so on. For example: 'Once your child is registered at school, you're legally responsible for making sure they attend regularly'.
>
> When deciding whether to use 'must' or 'legally entitled', consider how important it is for us to talk about the legal aspect, as well as the overall tone of voice.
>
> If a requirement is legal, but it's administrative or part of a process that will not have criminal repercussions, then use '**need**'. For example: 'You will need to provide copies of your marriage certificate'. This may be a legal requirement, but not completing it would just stop the person from moving on to the next stage of a process, rather than committing a more serious offence.
>
> If something is optional, you can use '**can**'. Avoid more complicated terms like 'You may be able to'."

**Four modal verbs mapped onto four legal statuses**, with the decisive test being *criminal repercussions*. `must` = legal duty with consequences. `need` = legal but administrative. `can` = optional. And `You may be able to` is banned as hedging.

A reader who learns this mapping can read the legal weight of any GOV.UK sentence off its verb. No commercial product in this corpus has anything comparable; most use "must", "need to", "should" and "may" interchangeably.

### The accessibility statement is a compliance artefact and a public admission of failure

`[observed]`, and it is remarkable.

**The compliance claim is a partial one, stated plainly:** "This website is **partially compliant** with the Web Content Accessibility Guidelines version 2.2 AA standard, due to the non-compliances and exemptions listed below."

**Then twenty numbered, individually cited failures.** Each names the defect in plain language, states the user consequence, and cites the exact success criterion. Examples, verbatim:

> 2. Some tables do not have table row or column headers. This means assistive technologies will not read the tables correctly. This fails WCAG 2.2 success criterion 1.3.1 (Info and Relationships).
> 9. If a table is too wide to fit on the screen, the hidden information cannot be reached with a keyboard. This fails WCAG 2.2 success criterion 2.1.1 (Keyboard).
> 10. Some pages have duplicate titles. This may make it difficult for users to orient themselves and find the right content. This fails WCAG 2.2 success criterion 2.4.2 (Page Titled).
> 12. On some pages the back to top link at the bottom of the page can hide focussed elements. This fails WCAG 2.2 success criterion 2.4.11 (Focus Not Obscured (Minimum)).
> 16. Translation Navigation is inconsistently named. This fails WCAG 2.2 success criterion 3.2.4 (Consistent Identification).

**And the plain-language summary at the top includes the one that matters most for this file:**

> How accessible this website is — Parts of this website are not fully accessible. For example:
> - **some pages and document attachments are not written in plain English**
> - some tables do not have row or column headers
> - …
> - many documents are in PDF format and are not accessible

**GOV.UK states, in its own accessibility statement, that parts of GOV.UK are not written in plain English** — the thing its own writing standard declares "mandatory for all of GOV.UK". The organisation audits itself against its own content rule, fails, and publishes the failure as the first item in the list. That is the most important single finding in this file and it is self-reported.

**The enforcement route is named with its escalation path**: the Equality and Human Rights Commission enforces the 2018 regulations; "If you're not happy with how we respond to your complaint, contact the Equality Advisory and Support Service." A complaint route and an appeal route, both named organisations, both linked.

**The alternative-format request is a three-item instruction**: "In your message, include: the web address (URL) of the content; your email address and name; the format you need - for example, plain text, braille, BSL (British Sign Language), large print or audio CD." Five named formats, including BSL and audio CD.

**Scope is disclaimed precisely in the first sentence**: "This accessibility statement applies to the www.gov.uk website. It does not cover other GOV.UK subdomains such as service subdomains (for example design-system.service.gov.uk) or the blog subdomain (www.blog.gov.uk), which have their own accessibility statements." And separately: "Each service has its own accessibility page… You can access these pages from the footer inside the service."

**The exemption is stated rather than hidden**: "The accessibility regulations do not require us to fix PDFs or other documents published before 23 September 2018 if they're not essential to providing our services." Named date, named condition.

### Price and payment disclosure

`[observed]` from the live start page: "It costs £34 when you apply online." Then, in its own `## How much it costs` section: "It costs £34 to apply online. You can pay by MasterCard, Visa, Electron or Delta debit or credit card." And the postal route's £43, stated in the `Apply by post` section.

**The price appears three times on one page** — in the opening, in its own section, and appended to the step-by-step link as `£34 to £43`. Repetition of the single most decision-relevant fact, in three different reading paths.

The A-to-Z governs money formatting: "Use the £ symbol: £75. Do not use decimals unless pence are included: £75.50 but not £75.00."

### Timing disclosure

`[observed]`: "Your licence should arrive within one week if you apply online. **It may take longer if DVLA need to make additional checks.**"

Claim, then bound the claim, then name the cause of the exception. The same construction Wise uses for transfer speed, arrived at independently.

### Licensing and copyright

`[observed]`, in the footer of every page across all three properties: "All content is available under the Open Government Licence v3.0, except where otherwise stated" and `© Crown copyright`. The Design System adds "Built by the GOV.UK Design System team" with a link to the team page — attribution of the authors of a standard, on every page of it.

## T11 Help-centre architecture

`[observed]` — GOV.UK has no help centre in the conventional sense. It has **three separate, cross-linked documentation estates**, and the relationship between them is itself the IA finding.

| Estate | Domain | Audience | Governs |
|---|---|---|---|
| **GOV.UK Service Manual** | `www.gov.uk/service-manual` | Government teams building services | Process, research, design principles, assessments |
| **GOV.UK Design System** | `design-system.service.gov.uk` | Government teams building services | Components, patterns, styles, the error and form specs |
| **GOV.UK content and publishing guidance** | `guidance.publishing.service.gov.uk` | Government publishers writing content | The style guide, writing guidelines, tone, formatting |

Plus `www.gov.uk/help` as the citizen-facing support hub (`Help`, `Privacy`, `Cookies`, `Accessibility statement`, `Contact`, `Terms and conditions`).

**The three estates cross-reference constantly and correctly.** The Design System's Question pages links out to the Service Manual for `designing good questions` and `form structure`; the Service Manual links back to the Design System for `Check a service is suitable`; the writing guidelines link into the A-to-Z. Each is the single source of truth for its own layer, and none duplicates another. That discipline is rare at this scale.

### The writing standard's own structure

`[observed]`. `Writing to GOV.UK standards` contains five sections, one of which — `Writing guidelines` — has eight sub-pages:

1. `Write content to meet user needs`
2. `Create a clear structure for your content`
3. `Use clear language`
4. `Use the right tone`
5. `Write effective links`
6. `Write clear titles`
7. `Write clear summaries`
8. `Write change notes`

**Every one is an imperative beginning with a verb**, and the verbs escalate from purpose (`meet user needs`) through form (`clear structure`, `clear language`, `right tone`) to specific artefacts (`links`, `titles`, `summaries`, `change notes`). The sibling sections are `Plan and manage content`, `Help users prepare for change`, `Find tools and resources for analysing content`, `Style guides`.

`Help users prepare for change` as a top-level content-guidance section is unusual and government-specific — it is about writing content in advance of a policy change taking effect.

### Article and pattern title grammar — five shapes

| Shape | Examples |
|---|---|
| Imperative verb phrase | `Use clear language` · `Use the right tone` · `Write clear titles` · `Write change notes` · `Recover from validation errors` · `Check a service is suitable` · `Start using a service` · `Exit a page quickly` |
| Gerund | `Structuring forms` · `Designing good questions` · `Making prototypes` · `Making your service look like GOV.UK` · `Using, adapting and creating patterns` |
| Bare component noun | `Error message` · `Error summary` · `Back link` · `Warning text` · `Task list` · `Phase banner` · `Exit this page` |
| Page-type noun phrase | `Question pages` · `Confirmation pages` · `Interruption pages` · `Page not found pages` · `Service unavailable pages` |
| **The string itself as the title** | `There is a problem with the service pages` |

The last shape is the interesting one. The pattern that produces the H1 `Sorry, there is a problem with the service` is *named after its own output string*. So is `Exit this page`. A designer searching for the words they saw on screen finds the pattern that produced them.

### Every Design System page has an identical five-part footer structure

`[observed]`: `## Research on this pattern` (or `## Research on this component`) → `## Help improve this pattern` → `## Need help?` → `Back to top` → `## Support links`.

**`## Research on this pattern` is the notable one.** Each pattern publishes its own evidence base, and the honesty varies by pattern:

- Error message: "Error messages designed using this guidance have been tested with all types of users in live services, including tax credits. Research showed users: understood what went wrong; knew how to fix the problem; were able to recover from the error."
- 500 pages: "The pattern was tested with **5 users**." Then the two user needs, then the admission that one cannot be met, then six open questions under `### Next steps`.
- Confirmation pages: a `### Known gaps` sub-heading — "Research is needed on the best way to confirm transactions that are part of a wider user task."
- Validation: "This approach to validation has been used on a number of services over an extended period of time… But we'd like to expand the guidance, and we're especially interested in hearing from teams whose research has identified a need to use client side validation."

**Publishing the sample size (`5 users`) and the unanswered questions alongside the mandate** is the governance move. A team is told "do this" and also told exactly how confident the authors are.

`## Help improve this pattern` gives two routes: a named GitHub discussion issue with its number, and a direct edit link into the source markdown. **The content standard is version-controlled and publicly editable by proposal.** Every page of it carries the edit URL.

### Defects in the documentation estate

1. **A live redirect chain through a retired path.** `https://www.gov.uk/guidance/content-design/writing-for-gov-uk` redirects to `guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/tone-of-voice/`, whose page body then says "Redirecting… Continue to redirected page" pointing at `…/writing-to-gov-uk-standards/writing-guidelines/`. **Two hops, the middle one rendered as a visible interstitial page** rather than an HTTP redirect. A user following an old link to the GDS style guide sees a page whose entire content is the word "Redirecting…".
2. **The A-to-Z links to the retired path at least twice.** Its `Links` entry points at `…/writing-to-gov-uk-standards/tone-of-voice/add-links/` and its `Words to avoid` entry points at `…/writing-to-gov-uk-standards/tone-of-voice/clear-language/`. The live paths are under `/writing-guidelines/`. The style guide's own cross-references have not been updated to the structure it now sits in.
3. The A-to-Z's `Words to avoid` closing link reads "Read more about using plain English" but points at `clear-language`, whose H1 is `Use clear language` — a minor link-text/title mismatch, on a page that elsewhere mandates front-loaded specific link text.
4. The whole `guidance.publishing.service.gov.uk` estate is flagged **`Beta`**.

## T12 FAQs

`[absent]` — and the absence is a deliberate, documented content-design position.

**GOV.UK does not publish FAQs.** Across fifteen pages spanning the homepage, a live transactional start page, the accessibility statement, the Service Manual, the Design System and the full A-to-Z style guide, there is not one accordion of questions-and-answers.

What replaces them, in order of how GOV.UK actually handles the need:

1. **Question-shaped section headings inside the content.** The live start page uses `When you can drive with a provisional licence`, `If you already have a provisional licence`, `How much it costs`, `After you apply` — four headings that answer four FAQs, positioned where the reader is, in the order the task requires. No list, no expansion, no separate page.
2. **Question-shaped page titles.** Whole GOV.UK pages exist whose title is the user's question, findable by search — the A-to-Z's `Titles` rule bans questions as page titles ("not be questions"), which pushes the question into the body heading instead.
3. **The `Check a service is suitable` pattern**, which converts "am I eligible?" from a documentation problem into an interactive one.
4. **`## Updates to this page`**, which answers "has this changed?" — an FAQ most products never answer at all.
5. **Design System `## Research on this…` sections**, which answer "why should I believe this?" for an internal audience.

The Design System's `Contact a department or service team` pattern (not harvested) occupies the escalation slot that an FAQ's "still need help?" would normally hold.

**The transferable observation:** GOV.UK treats an FAQ as a symptom. If a question is common, the answer belongs in the flow at the point the question arises, or the underlying service should change. The A-to-Z's title rule (`not be questions`) and the Question pages pattern's insistence on one thing per page both push in the same direction — content organised by where the user is, not by what they might ask.

## T13 Terminology & glossary

`[observed]`

GOV.UK's terminology work is inverted relative to every commercial product in this corpus. It has almost **no coined vocabulary** for its user-facing product, and an enormous amount of governed vocabulary for the *language itself*. The A-to-Z style guide is roughly 3,100 lines of rulings on individual words.

### Coined terms, such as they are

| Term | Usage | Notes |
|---|---|---|
| `GOV.UK` | Always this form. The A-to-Z governs the capitalisation of hundreds of proper nouns | The brand is a domain name |
| `question protocol` | The six-criterion justification list for a form field | Borrowed from UXmatters and named as a governance artefact |
| `one thing per page` | The form-structure doctrine | The most exported phrase in government design |
| `Start now` | The canonical transactional CTA | |
| `step by step` | A named navigation pattern and a title suffix: `Learn to drive a car: step by step` | Lowercase, three words |
| `Check a service is suitable` | Renamed from `Check before you start` | The old name persists in blog posts and in the wider community |
| `phase banner` / `Alpha` / `Beta` / `Prototype` | Service-maturity vocabulary | |
| `Error summary` / `Error message` | The two error components, deliberately distinguished | |
| `hint text` | The named field-help element | Not "helper text", not "placeholder" |
| `Service Manual` / `Design System` / `service standard` | The governance artefacts | |
| `Crown copyright` / `Open Government Licence` | Constitutional furniture in every footer | |

**`Start now` and `Continue` are the entire forward-motion vocabulary of UK government online.** Two strings, both governed, both two words or fewer.

### The governed vocabulary — the A-to-Z

The style guide rules on individual words and formats. Selected entries, verbatim:

| Entry | Rule (verbatim or close) |
|---|---|
| `Addressing the user` | "Address the user as 'you' where possible and avoid using gendered pronouns like 'he' and 'she'." |
| `Ampersands` | "Use 'and' rather than '&', unless it's a department's logo image or a company's name as it appears on the Companies House register." |
| `bold` | "Only use bold to indicate interface elements in text that are explicitly telling the user what to do" |
| `Brackets` | "Use (round brackets). Do not use round brackets to refer to something that could either be singular or plural, like 'Check which document(s) you need to send to DVLA.' **Always use the plural instead**" |
| `Capitalisation` | "**DO NOT USE BLOCK CAPITALS FOR LARGE AMOUNTS OF TEXT AS IT'S QUITE HARD TO READ.** Always use sentence case, even in page titles and service names." |
| `contractions` | "Avoid negative contractions like can't and don't… Use cannot, instead of can't. Avoid complex or conditional contractions such as should've, could've, would've too." |
| `disabled people` | "Not 'the disabled' or 'people with disabilities'." |
| `eg, etc and ie` | "'eg' can sometimes be **read aloud as 'egg' by screen reading software**. Instead use 'for example', 'such as', 'like' or 'including'" |
| `email` | "One word. Do not use it when talking about an email address. For example, say 'use this email address' rather than 'use this email'." |
| `Links` | "Front-load your link text with the relevant terms and make them active and specific. Always link to online services first. Offer offline alternatives afterwards" |
| `money` | "Use the £ symbol: £75. Do not use decimals unless pence are included: £75.50 but not £75.00" |
| `Numbers` | "Use 'one' unless you're talking about a step, a point in a list or another situation where using the numeral makes more sense" |
| `Per cent` | "Use 'per cent' not 'percent'. Percentage is one word. Always use % with a number." |
| `telephone numbers` | "Before the number, add 'Telephone:' or 'Mobile phone:' – do not use 'Mobile:' or 'Mob:'." |
| `Times` | "use 'to' in time ranges, not hyphens, en rules or em dashes: 10am to 11am (not 10-11am); 5:30pm (not 1730hrs); midnight (not 00:00)" |
| `Titles` | "be 65 characters or less; be unique, clear and descriptive; be frontloaded and optimised for search; use a colon to break up longer titles; not contain dashes or slashes; not have a full stop at the end; **not be questions**" |
| `Trade marks` | "Avoid using trademarked names where possible - so tablet not iPad." |
| `X account` | "Upper case 'X'. Formerly called Twitter but no need to mention this. Use 'post on X' rather than 'tweet'." |
| `zero-hours contract` | "Not 'zero-hour contract' or 'zero hours contract'." |

**The `eg` ruling is the exemplary entry.** The reason a two-letter abbreviation is banned is that a screen reader pronounces it as a word. An accessibility fact producing a style rule producing a vocabulary change — and the rule then offers four replacements ("whichever works best in the specific context") rather than mandating one.

**The `Brackets` ruling** is a small masterpiece of reasoning: `document(s)` is banned, and the resolution is "Always use the plural instead, as this will cover each possibility". It solves a grammatical hedge by choosing the form that is true in both cases.

**The `Capitalisation` entry opens with the rule written in violation of itself** — the sentence banning block capitals is in block capitals. This is a deliberate joke, and it is the only joke in ~3,100 lines. It is also, technically, the style guide breaking its own rule on its own page.

### Bullet points — a nine-rule specification

`[observed]`, verbatim, because it is the most precise list-formatting standard published anywhere:

> Make sure that:
> - you always use a lead-in line
> - you use more than one bullet
> - the bullets make sense running on from the lead-in line
> - you use lower case at the start of the bullet
> - you do not use more than one sentence per bullet - use commas or dashes to expand on an item
> - you do not put 'or' or 'and' after the bullets
> - you do not make the whole bullet a link if it's a long phrase
> - you do not put a semicolon at the end of a bullet
> - there is no full stop after the last bullet

Nine rules — and the list demonstrates all nine while stating them. Then the exhaustiveness warning, which is a genuine content-design insight most style guides lack:

> "**The number and type of examples in a list may lead the user to believe the list is exhaustive.** This can be dealt with by:
> - checking if there are other conditions (or if the list is actually complete)
> - listing the conditions which apply to the most users and removing the rest
> - consider broader terms in the list which capture more scenarios (and could make the list exhaustive)
> - creating a journey to specialist content to cover the remaining conditions"

A list implies completeness. On a government eligibility page, an implied-complete list that is not complete is a legal problem. Four remedies are offered. (The third bullet, `consider broader terms…`, breaks the lead-in line's grammar — it should be `considering` — which is a violation of rule three in the list directly above it.)

**And `#### Steps`** distinguishes itself from bullets: "Use numbered steps instead of bullet points to guide a user through a process. You do not need a lead-in line… **Steps end in a full stop because each should be a complete sentence.**" Bullets take no final full stop; steps take one each. The punctuation encodes whether the item is a fragment or a sentence.

### Words to avoid — the complete list

`[observed]`, verbatim in full. Preceded by: "Plain English is mandatory for all of GOV.UK so avoid using these words:"

| Banned word | Replacement (verbatim) |
|---|---|
| agenda (unless it's for a meeting) | use 'plan' instead |
| advance | use 'improve' or something more specific |
| collaborate | use 'work with' |
| combat (unless military) | use 'solve', 'fix' or something more specific |
| commit/pledge | use 'plan to x', or 'we're going to x' where 'x' is a specific verb |
| counter | use 'prevent' or try to rephrase a solution to a problem |
| deliver | use 'make', 'create', 'provide' or a more specific term (**pizzas, post and services are delivered - not abstract concepts like improvements**) |
| deploy (unless it's military or software) | use 'use' or if putting something somewhere use 'build', 'create' or 'put into place' |
| dialogue | use 'spoke to' or 'discussion' |
| disincentivise | use 'discourage' or 'deter' |
| empower | use 'allow' or 'give permission' |
| facilitate | say something specific about how you're helping - for example, use 'run' if talking about a workshop |
| focus | use 'work on' or 'concentrate on' |
| foster (unless it's children) | use 'encourage' or 'help' |
| impact (unless talking about a collision) | use 'have an effect on' or 'influence' |
| incentivise | use 'encourage' or 'motivate' |
| initiate | use 'start' or 'begin' |
| key (unless it unlocks something) | usually not needed but can use 'important' or 'significant' |
| land (unless you're talking about aircraft) | use 'get' or 'achieve' |
| leverage (unless in the financial sense) | use 'influence' or 'use' |
| liaise | use 'work with' or 'work alongside' |
| overarching | usually superfluous but can use 'encompassing' |
| progress | use 'work on' or 'develop' or 'make progress' |
| promote (unless an ad campaign or career advancement) | use 'recommend' or 'support' |
| robust (unless a sturdy object) | use 'well thought out' or 'comprehensive' |
| slim down (unless talking about one's waistline) | use 'make smaller' or 'reduce the size' |
| streamline | use 'simplify' or 'remove unnecessary administration' |
| strengthening (unless bridges or structures) | use 'increasing funding' or 'concentrating on' or 'adding more staff' |
| tackle (unless fishing tackle or a rugby tackle) | use 'stop', 'solve' or 'deal with' |
| transform | describe what you're doing to change the thing |
| **utilise** | **use 'use'** |

And the metaphor sub-list, introduced with "Avoid using metaphors - they do not say what you actually mean and lead to slower comprehension of your content":

| Banned metaphor | Replacement (verbatim) |
|---|---|
| drive | use 'create', 'cause' or 'encourage' instead (**you can only drive vehicles, not schemes or people**) |
| drive out (unless it's cattle) | use 'stop', 'avoid' or 'prevent' |
| going/moving forward | use 'from now on' or 'in the future' (**it's unlikely we are giving travel directions**) |
| **in order to** | **usually not needed - do not use it** |
| hub, portal or one-stop shop | use 'website' or 'service' (unless those words are in the name) |
| ring fencing | use 'separate' or when talking about budgets use 'money that will be spent on x' |

Closing rule: "With all of these words you can generally replace them by breaking the term into what you're actually doing. **Be open and specific.**"

**Three things make this list work where most banned-word lists fail.**

First, **almost every entry carries an exception in parentheses.** `combat (unless military)`. `key (unless it unlocks something)`. `tackle (unless talking about fishing tackle or a physical tackle, like in rugby)`. The rule is about the metaphorical use, not the word, and saying so pre-empts the pedantic objection that would otherwise get the whole list dismissed.

Second, **each ban is paired with a replacement**, so a writer is never left without an option. `utilise → use 'use'` is four words and settles the argument permanently.

Third, **three entries carry a one-line argument**, and all three are funny: "pizzas, post and services are delivered - not abstract concepts like improvements"; "you can only drive vehicles, not schemes or people"; "it's unlikely we are giving travel directions". These are the only jokes in the writing standard besides the block-capitals gag, and they are deployed exactly where a civil servant is most likely to push back.

**`in order to` is the harshest entry**: "usually not needed - do not use it". No replacement, because the phrase's replacement is nothing.

**The generative rule underneath** is stated twice, in the A-to-Z and in `Use clear language`: "Words ending in '–ion' and '–ment' tend to make sentences longer and more complicated than they need to be." A morphological rule that catches the words the list does not name.

### Specialist language is permitted, with a condition

`[observed]`: "Where you need to use specialist terms, you can. They're not always jargon. **You just need to explain what they mean the first time you use them.** For example, users may need to be familiar with a legal term like 'bona vacantia' in order to complete a task."

Same posture as DocuSign's treatment of `authoritative copy`: keep the operative term, gloss it once. GOV.UK reaches it from the opposite direction (plain English by default, jargon by exception) and lands in the same place.

## T14 Voice, tone & accessibility

**PRIORITY SECTION.**

### The tone of voice is a published seven-point definition

`[observed]`, verbatim and complete:

> The 'tone of voice' for GOV.UK content is:
> - specific
> - informative
> - clear and concise
> - **brisk, but not terse**
> - **incisive (friendliness can lead to a lack of precision and unnecessary words) – but remain human (not a faceless machine)**
> - **serious but not pompous**
> - **emotionless – adjectives can be subjective and make the text sound more emotive and like spin**

Four of the seven are **defined by a tension between two failure modes**, not by a single quality. `brisk, but not terse` names both the target and the over-correction. `serious but not pompous`. `incisive… but remain human`. This is the structure that makes a tone definition usable: a writer can self-check against both ends.

`emotionless` is the one that could not appear in any commercial style guide, and the reason given is political: adjectives "make the text sound more emotive and **like spin**". A government writing standard that treats warmth as a credibility risk.

Then the addressing instruction: "Write conversationally. Picture your audience and write as if you were talking to them one-to-one, **but with the authority of someone who can actively help.**" Conversational *and* authoritative, with the authority grounded in capacity to help rather than in office.

**And the `please` rule**, verbatim: "There's usually no need to say 'please' or 'please note'. This includes when giving an instruction or explaining what a user needs to do, like 'Please contact us'." (The Error message component makes it absolute in errors, with the reason: "'please' because it implies a choice".)

### Person, voice and modality

`[observed]`:

- **Second person for the user, mandated**: "Address the user as 'you' where possible." Examples given: "You can contact HM Revenue and Customs by phone and email", "Pay your car tax".
- **Gender neutrality, mandated**: "When writing in the third person, make sure text is gender neutral wherever possible. For example, say 'They can…' rather than 'He or she can…'."
- **`we` is conditional on prior identification**: "make sure you've already used the full name of your organisation before you use 'we'. **Do not assume the audience will know who the 'we' is.**" An anti-anonymity rule — on a single domain hosting hundreds of organisations, an unqualified "we" is genuinely ambiguous.
- **Active voice, with three named exceptions**: "it's easier to read 'You need an electronic travel authorisation' than 'An electronic travel authorisation is needed'." Passive permitted "when the outcome is more important than the agent" ("Biometric residence permits have been replaced by eVisas") and "when the writing is more user-centred" ("You'll be told what you need to do when you apply" rather than "The Home Office will tell you what you need to do"). The second exception is subtle and correct: the passive here removes a department name the user does not need.
- **Contractions, split by polarity**: "Use contractions like 'you'll', but **avoid negative contractions like 'can't' or 'don't'. Many users find negative contractions hard to read, or misread them as the opposite of what they say.**" Plus a ban on `should've`, `could've`, `would've`, `they've`.

**The negative-contraction rule is the most distinctive voice decision GOV.UK has made**, and it holds across the estate. Observed: `do not` (Design System, dozens of times), `We have not saved your answers` (500 page), `I do not know` (suggested answer label), `users do not trust browser back buttons`, `it does not help fix the problem`, `they do not add anything to the message`. The rule is followed with near-perfect consistency by hundreds of authors, which is itself evidence that a rule with a stated reason gets obeyed.

### Length and reading level

`[observed]`: "Paragraphs should have no more than 5 sentences each. Try to split up sentences that are over 25 words long." Then: "There's no maximum or minimum overall page length. It's most important that you write well. **If you write only a single paragraph but it's full of jargon, then it's too long.**"

A length standard that refuses to be a word count, closed by a sentence defining length as a function of clarity.

### The plain-English mandate and its evidence

`[observed]`: "**Plain English is mandatory for all of GOV.UK.**" Then four literacy statistics, one per UK nation:

> - 1 in 6 adults in England have very poor literacy skills
> - 1 in 4 adults in Scotland experience challenges due to their lack of literacy skills
> - 1 in 8 adults in Wales lack basic literacy skills
> - 1 in 5 adults in Northern Ireland have very poor literacy skills

Followed by a methodological caveat: "The definition of 'literacy skills' varies by nation, but you can see that many people who will need to read GOV.UK will struggle unless language is kept simple." **Citing four different statistics and then disclosing that they are not measured the same way** is the caveat-your-own-evidence move, applied to the evidence for the organisation's central content rule.

And then the counter-argument pre-empted, under `## Write clearly for specialists too`:

> "80% of people preferred sentences written in clear English – **and the more complex the issue, the greater that preference**
> the more educated the person and the more specialist their knowledge, **the greater their preference for plain English**"
>
> "Some users can understand complex specialist language, but they do not want to read it if there's an alternative."

This section exists to defeat one specific objection — "our audience is specialists, they expect technical language" — and it defeats it with cited research rather than assertion. The most common argument against plain English, killed in four paragraphs.

### Accessibility as a content discipline

`[observed]`. What distinguishes GOV.UK is that **accessibility reasoning generates the content rules**, rather than sitting alongside them:

- `eg` is banned because screen readers say "egg"
- Hint text takes no full stops and no links because it is read as a field description
- Setting the `<label>`/`<legend>` as the page heading is mandated "as it means that users of screen readers will only hear the contents once"
- The hidden `Error:` prefix exists for screen readers and is localisable
- `Error: ` is prefixed to the page `<title>` "so screen readers read it out as soon as possible"
- Keyboard focus must move to the error summary
- HTML5 validation is disabled partly because "we know that the GOV.UK Design System error message and error summary components are accessible"
- Range sliders are discouraged with a cited success criterion (2.5.1 Pointer Gestures)
- Block capitals are banned because "It's hard to read and it can be understood as shouting"
- Confirmation-panel interactive elements are flagged: "If you choose to add links, buttons or other interactive elements in the green confirmation panel, they will not be accessible."
- `Exit this page` exists as a component for users at risk

**The accessibility statement's self-assessment** is covered in T10. Its most important line for this section: `some pages and document attachments are not written in plain English` is listed as an **accessibility failure**, not a style failure. GOV.UK classifies unclear writing as an access barrier.

Observed alt text is descriptive and functional: "'Check a service is suitable' flow diagram. Contains an introduction page followed by a series of simple questions. If at any point a user is deemed not eligible for the service they will be pointed to a page that explains why they are not eligible. Otherwise they will be presented an 'application complete' page." — a full prose description of a flow diagram, roughly 50 words. And "Screenshot of a progress indicator that shows five questions."

### Where GOV.UK breaks its own rules

This is the section the brief asked for, and there is more here than expected. All `[observed]`.

**1. `Please` on every page of GOV.UK.** The tone guidance: "There's usually no need to say 'please' or 'please note'." The Error message component: do not use 'please' "because it implies a choice". The site-wide feedback banner, on the homepage, the driving-licence page, the accessibility statement and the Service Manual page: "**Please fill in this survey** (opens in a new tab and requires JavaScript)". The most-rendered string on GOV.UK breaks the rule.

**2. `Please note` in the Design System.** The `Check a service is suitable` pattern closes with "**Please note** this pattern used to be called 'Check before you start'." The exact two-word phrase the tone guidance singles out, on the site that publishes the pattern library.

**3. `Sorry` mandated in the 500-page H1 while banned in error messages.** Covered in T7. The 500 pattern's own research section lists "if people expect to see please and sorry" as an open question, so the tension is known and unresolved.

**4. A negative contraction in the Design System's reference markup.** The A-to-Z: "Avoid negative contractions like can't and don't… Use cannot, instead of can't." The `Check a service is suitable` example, and the Phase banner component example, both render: "This **isn't** a real service – it is an example." Note the second half of the same sentence correctly uses `it is` rather than `it's`, so one clause obeys the rule and the next does not.

**5. A spelling error in the same reference example.** The eligibility results page reads: "Based on your answers, you are **eligble** to transport goods." The H1 above it spells it correctly (`You're eligible to transport goods`). A misspelling in the canonical example of a Design System pattern, in both the HTML and the Nunjucks variant.

**6. The accessibility statement is unreadable by GOV.UK's own standards.** The A-to-Z rule on abbreviations is to expand on first use and then abbreviate. The accessibility statement's numbered list expands `WCAG (Web Content Accessibility Guidelines)` **in all twenty items**, plus `EHRC (Equality and Human Rights Commission)`, `EASS (Equality Advisory and Support Service)`, `DAC (Digital Accessibility Centre)` and `PDF (Portable Document Format)` repeatedly. An automated expansion feature has made the page substantially harder to read — on the page whose subject is whether GOV.UK is hard to read. The same mechanism produces `DVLA (Driver and Vehicle Licensing Agency)` three times in the body of the driving-licence page, including twice in adjacent paragraphs.

**7. A typo in the global footer of every page.** `Births, death, marriages and care` in the footer; `Births, deaths, marriages and care` in the homepage body.

**8. The A-to-Z links twice to a retired URL structure** (`/tone-of-voice/` rather than `/writing-guidelines/`), and the old style-guide URL resolves through a visible "Redirecting…" interstitial.

**9. The bullet-list exhaustiveness guidance breaks its own bullet rule.** Rule three of the nine is "the bullets make sense running on from the lead-in line". The exhaustiveness remedies list has the lead-in "This can be dealt with by:" followed by "**consider** broader terms in the list" — which does not run on grammatically (it should be "considering").

**10. `Transparency` / `Transparency documents`** — two labels for one destination between the homepage body and the nav/footer.

**11. Two cookie-banner label sets** (`additional cookies` vs `analytics cookies`) and two skip-link targets (`#content` vs `#main-content`) across GOV.UK properties.

**12. The double-space concatenation** in Design System pattern headings: `Help users to  Recover from validation errors`.

**13. `Cancel` as the dismiss control for the feedback banner** — the wrong verb for dismissing a request rather than aborting an action.

**None of these is serious individually.** Collectively they make a real point: the most disciplined content organisation in the world, publishing its own rules in full, still leaks a `please` onto every page, ships a spelling error in a canonical example, and has an automated feature actively degrading the readability of its accessibility statement. The distance between a published standard and its consistent application is not closable by publishing the standard.

---

## Transferable patterns

1. **Publish a question protocol with named criteria, and say out loud that it exists to push back.** Six conditions a field must satisfy before it may exist, plus the sentence "It gives you a way of challenging and pushing back against unnecessary questions if you need to." Content design's hardest problem is organisational, and this is the only artefact in the corpus that addresses it directly.
2. **Attach a reason to every prohibition.** "'please' because it implies a choice." "'sorry' because it does not help fix the problem." "'valid' and 'invalid' because they do not add anything." A banned-word list without reasons is a matter of taste and will be overruled; with reasons it is an argument and will survive.
3. **Name the specific wrong string, not the category.** `This field is required`, `An error occurred`, `We are experiencing technical difficulties`, `Next` (for a continue button), `Mobile:` (for a phone label), `utilise`. Naming the exact default that libraries and lazy writers produce is what makes the rule enforceable in review.
4. **Instruction for absence, description for constraint.** `Enter your first name` when a field is empty; `Name must be 35 characters or less` when a value breaks a rule. Then apply it consistently. The most useful grammatical rule in error copy and almost nobody has it.
5. **Split every "something is wrong" page by who can fix it.** Validation error (user's input) → error message. Ineligibility (user's situation) → explanation page with an alternative. Transient failure (our system) → `Sorry, there is a problem with the service`. Extended failure → service unavailable. Wrong address → page not found. Four different content jobs that most products collapse into one toast.
6. **Use "sorry" as a fault signal, not as politeness.** Absent from validation errors (the user's input, which they can fix). Present in the 500-page H1 (our failure, which they cannot). The word becomes information rather than decoration. Note that GOV.UK has not fully reconciled this and says so.
7. **Disclose what happens to the user's data in the failure state, in one sentence, with a duration.** "We saved your answers. They will be available for 30 days." / "We have not saved your answers. When the service is available, you will have to start again." Both variants written out and mandated.
8. **Map modal verbs onto legal statuses and publish the mapping.** `must` = legal duty with consequences; `legal requirement`/`legally entitled` = emphasised duty; `need` = legal but administrative; `can` = optional; `You may be able to` = banned. Directly applicable to any regulated disclosure surface where "must", "should" and "may" currently drift.
9. **Mark the optional fields, never the mandatory ones.** `(optional)` on labels and legends; "Never mark mandatory fields with asterisks." Less noise, more information, and it fails safe.
10. **Publish the sample size and the open questions alongside the mandate.** "The pattern was tested with 5 users." "We cannot meet the first need because we do not know what has happened." "Research is needed on…" Stating your confidence level makes the guidance more usable, not less authoritative.
11. **Give the eligibility criteria as self-checkable numbers before the button.** `15 years and 9 months`, `20 metres`, `185 days`, `£34`. And on a journey component, append the price to each step so the total cost can be read off the navigation.
12. **Disclose the cost of an optional action in its own label.** `What did you think of this service?` `(takes 30 seconds)`.
13. **Group navigation items under a sentence stem.** `Ask users for…` / `Help users to…`, so the list item and the page heading are the same grammatical unit.
14. **Treat unclear writing as an accessibility failure, and audit yourself for it in public.** GOV.UK lists "some pages and document attachments are not written in plain English" as the first item in its accessibility statement's failure list. Reclassifying clarity from a style concern to an access barrier changes who is accountable for it.
15. **Pre-empt the one objection your standard will always face, with cited evidence.** The `Write clearly for specialists too` section exists solely to defeat "our audience is experts", and it does so with two studies showing that expertise *increases* the preference for plain English.

## Caveats & gaps

- **The Error summary component's guidance prose was not retrieved.** The page exceeded the fetcher's size limit and only its navigation was captured. The component's verbatim output (`There is a problem` plus the linked error list) was recovered from its bare example page, and the rules governing its use — placement at top of page, focus management, same wording as the field-level message, one summary per page — were recovered from the Validation pattern and the Error message component, which both specify them. But the Error summary page's own guidance on **link ordering** (whether summary links must follow the visual order of the fields) was not read and is not asserted here. That is a material omission from the priority section and should be filled.
- **The A to Z style guide is ~3,100 lines and was sampled, not read in full.** `Words to avoid` is captured verbatim and complete. Fifteen further entries are quoted. Several hundred entries — the bulk of the capitalisation rulings, the department-name list, and the entries between the sampled anchors — were not examined. Any claim that a particular word is *not* governed would be unsafe.
- **Four Design System patterns named in the error taxonomy were not harvested**: `Service unavailable pages`, `Page not found pages`, `Interruption pages`, and `Check answers`. The first two complete the four-way failure-page split described in T6/T7 and their verbatim strings are not in this file. `Check answers` is the other half of the form pattern and is unexamined.
- **Three writing-guideline pages were not opened**: `Write content to meet user needs`, `Create a clear structure for your content`, and `Write clear titles`. The first is the "writing for user needs" material the brief specifically asked for; its existence and position in the IA are recorded, but its content is not. `Write change notes` and `Write clear summaries` are likewise unread.
- **The Service Manual's `Designing good questions` page was not fetched.** It is linked from both the Question pages pattern and the form-structure guide as the canonical guidance on question wording, and it is the obvious next page for anyone working from this file.
- **Only one live transactional start page was harvested.** The eligibility-list, price-repetition, wrong-page-rescue and step-by-step structures in T2/T4 come from a single DVLA page. A benefits or immigration start page would very likely show different conventions, and departmental variation on GOV.UK is real.
- **No service was started.** Per the brief, the `Start now` button was not followed. Every in-service string — the actual question pages, the actual error messages as rendered by a live service, the check-answers page, the real confirmation page — is `[documented]` from the Design System's reference examples rather than observed in production. The gap between the pattern and its implementation across hundreds of services is therefore entirely unmeasured by this file, and it is where most of the real variation lives.
- **Welsh-language content was not harvested.** The Welsh equivalent page (`gov.uk/cais-trwydded-yrru-dros-dro`) and `Rhestr o Wasanaethau Cymraeg` were identified but not fetched. The only Welsh string captured is the Design System's `Gwall:` / `Rhowch eich enw llawn` error example.
- **No GOV.UK status page or incident communication** was located or harvested. Individual services publish their own availability information; there is no central equivalent of `status.zapier.com`.
- **The GOV.UK app** (`Get the GOV.UK app`) was identified on the homepage but not examined.
- **The GDS content and publishing guidance estate is flagged `Beta`** on every page, so the writing standard quoted throughout T13 and T14 is explicitly labelled as subject to change, and the retired `/guidance/content-design/` and `/tone-of-voice/` paths show that it moved recently.

## Sources

1. https://www.gov.uk/
2. https://www.gov.uk/apply-first-provisional-driving-licence
3. https://www.gov.uk/help/accessibility-statement
4. https://www.gov.uk/service-manual/design/form-structure
5. https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/
6. https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/
7. https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/right-tone/
8. https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/
9. https://design-system.service.gov.uk/components/error-message/
10. https://design-system.service.gov.uk/components/error-summary/default/
11. https://design-system.service.gov.uk/components/error-summary/ — partial (navigation only; guidance prose exceeded size limit)
12. https://design-system.service.gov.uk/patterns/question-pages/
13. https://design-system.service.gov.uk/patterns/validation/
14. https://design-system.service.gov.uk/patterns/check-a-service-is-suitable/
15. https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/
16. https://design-system.service.gov.uk/patterns/confirmation-pages/
17. https://www.gov.uk/guidance/content-design/writing-for-gov-uk — retired path; redirect chain recorded in T11
