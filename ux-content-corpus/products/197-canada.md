# 197. Canada.ca

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Federal government portal (bilingual) — single-domain consolidation of ~100 federal institutions |
| Primary URL | https://www.canada.ca/ (English entry: https://www.canada.ca/en.html) |
| Corpus rank | 197 |
| Benchmark strength (source list) | Structured public-service information |
| Locale / market observed | en-CA, with the fr-CA mirror observed structurally (every page carries a `Français` toggle to a path-mirrored French URL) |
| Platform observed | Web (desktop), plus the published Canada.ca Content Style Guide |
| Auth state | Unauthenticated public surfaces only. No sign-in, no account creation, no benefit application started, no Benefits Finder run. |
| Regulatory posture | **Official Languages Act** (cited as a "must" — "you must publish communications and provide services to the public in both official languages"). **Directive on the Management of Communications**, Appendix D: Mandatory Procedures for Social Media and Web Communications — this is what makes the style guide binding. **Standard on Web Accessibility**, **Standard on Web Interoperability**, **Standard on Optimizing Websites and Applications for Mobile Devices**, Policy on Communications and Federal Identity, Guidance on Publishing in the Government of Canada, Procedures for Publishing. Accessibility target referenced in the guide is **WCAG 2.0** (see defects — this is behind the standard other governments in this batch cite). Content licensed under the Open Government Licence. |
| Harvest date | 2026-09-22 |
| Pages inspected | 6 reachable (2 blocked) |
| Harvest completeness | **Partial.** The Content Style Guide was harvested in full and is the dominant artefact. Three target URLs returned empty bodies (see Caveats), including the Canada.ca accessibility statement and the design-system architecture spec, so the Content and Information Architecture Specification is described only as the style guide references it. The style guide's own render was truncated before its "Resources" section. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (English) | https://www.canada.ca/en.html | 16-item main menu, "Most requested", 9 theme tiles, "Your government", features |
| Canada.ca Content Style Guide | https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/canada-content-style-guide.html | 13 top-level sections; the binding writing standard. Render truncated at the "Web content makeovers" case studies |
| EI regular benefits: Do you qualify | https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/eligibility.html | The eligibility-page template; document navigation; violation table |
| Manage life events | https://www.canada.ca/en/services/life-events.html | Theme landing page template (`meta-template: theme-page`) |
| What to do when someone dies | https://www.canada.ca/en/services/life-events/death.html | Audience/navigation page; questionnaire entry point |
| Language resources / French mirrors | (observed via `Français` toggles on every page above) | Path-mirrored bilingual URLs |
| — blocked — | https://design.canada.ca/architecture/index.html | Empty body |
| — blocked — | https://www.canada.ca/en/transparency/accessibility.html | Empty body |
| — blocked — | https://www.canada.ca/en/government/sign-in-online-account.html | Fetch aborted |
| — blocked — | https://www.canada.ca/en/government/about-canada-ca.html | Empty body |

---

## T1 Navigation & IA labels

**Main menu — 16 items, all noun-phrase themes, none verb-first** `[observed]`

`Jobs and the workplace` · `Immigration and citizenship` · `Travel and tourism` ·
`Business and industry` · `Benefits` · `Health` · `Taxes` ·
`Environment and natural resources` · `National security and defence` ·
`Culture, history and sport` · `Policing, justice and emergencies` ·
`Transport and infrastructure` · `Canada and the world` · `Money and finances` ·
`Science and innovation` · `Manage life events`

Two things stand out. First, `Manage life events` is the only verb-led item in a list of
sixteen nouns — a task-shaped entry bolted onto a subject-shaped taxonomy. Second, the
footer's "Themes and topics" list is **not identical to the main menu**: it shortens
`Jobs and the workplace` → `Jobs`, `Business and industry` → `Business`, and adds three
audience themes absent from the main menu — `Indigenous Peoples`, `Veterans and military`,
`Youth`. So the footer carries an audience axis the header does not.

**`Services and information` tiles carry keyword-run descriptions, not sentences** `[observed]`

| Tile | Description (verbatim) |
|---|---|
| `Jobs` | "Find a job, training, hiring programs, work permits, Social Insurance Number (SIN)" |
| `Immigration and citizenship` | "Visit, work, study, immigrate, refugees, permanent residents, apply, check status" |
| `Benefits` | "EI, family and sickness leave, pensions, housing, student aid, disabilities" |
| `Taxes` | "Income tax, payroll, GST/HST, contribution limits, tax credits, charities" |
| `Health` | "Food, nutrition, diseases, vaccines, drugs, product safety and recalls" |
| `Money and finances` | "Personal finance, credit reports, fraud protection, paying for education" |

These are **comma-separated keyword strings, not prose**. They are optimised for scanning and
for on-page search (Ctrl+F), and they are the clearest example in the corpus of a description
field used as a findability surface rather than an explanatory one. The style guide backs
this: "Include abbreviations that your audience uses in your metadata… to help search engines
find your page more easily."

**`Most requested` — the top-tasks block, verb-first where transactional** `[observed]`

`Sign in to an account` · `Employment Insurance and leave` ·
`Public pensions (CPP (Canada Pension Plan) and OAS (Old Age Security))` ·
`Get a passport` · `Visit Canada` · `Disability Benefit` · `Canadian Dental Care Plan` ·
`Canada Strong`

Note the nested-acronym string
`Public pensions (CPP (Canada Pension Plan) and OAS (Old Age Security))` — two acronyms each
expanded inside their own parentheses, inside a further pair. The style guide's rule is
"Write out the long form of the term with the abbreviated form in parentheses at first
mention", i.e. *long form first*. This link does the reverse and nests three deep. A live
violation of the guide's own §4.4 on the homepage.

**`Your government` — the institutional axis, kept separate from the service axis** `[observed]`

`All contacts` · `News` · `Prime Minister` · `Departments and agencies` ·
`About government` · `Open government and data` · `Working for the government` ·
`Treaties, laws and regulations`

**Breadcrumb is labelled `You are here:`** `[observed]` — not "Breadcrumb", not unlabelled.
An explicit orientation label. Root is always `Canada.ca`.

**Two skip links, and the second one is unusual** `[observed]`:
`Skip to main content` and **`Skip to "About government"`** — a named skip target to the
footer institutional block, on every page. Most sites ship one skip link; Canada.ca ships a
second to a specific footer region.

**Persistent chrome** `[observed]`: `Language selection` (region label) → `Français fr (Français)`;
`Search Canada.ca`; `Menu` / `Main Menu`; `Sign in`; `Page details` with a bare ISO date
(`2026-09-17`); `About this site` → `Government of Canada` → `Themes and topics` →
`Government of Canada Corporate`.

**Theme-page IA** `[observed]`, from `Manage life events`: `Most requested` →
`Services and information` → `Features`. The `meta-template: theme-page` and
`meta-dcterms.type: navigation page - theme landing page` fields confirm the mandatory
template system is real and machine-declared — every page states its own template in
metadata.

## T2 Value proposition & headline patterns

**The homepage H1 is the domain name.** `[observed]`

> `Canada.ca`
> "The official website of the Government of Canada"

No claim, no benefit, no verb. Like the NHS, a monopoly service writes an identity
statement rather than a value proposition. The differentiator asserted is *officialness*.

**Page titles are tasks or user questions, never publication titles** `[observed]`

`EI regular benefits: Do you qualify` · `Do you qualify` (the H1 on the same page) ·
`What to do when someone dies` · `Manage life events` ·
`Someone died,  what do I do?` (section heading)

`Someone died,  what do I do?` is the standout. A federal government portal ships a
first-person, present-tense, punctuated question as a live section heading — and it violates
two of the guide's own rules simultaneously (§3.1: "Don't use 'I' or 'my' statements";
§4.1: "Only use question marks when asking for information in a form, wizard, survey or
quiz"). It is also the single most humane string on the site. The violation is arguably the
right call, which makes it a useful test case for when a house rule should yield.

**Standfirsts acknowledge the emotional situation before the process** `[observed]`

- `What to do when someone dies`: "There can be a lot of things to do when someone has died. Depending on your relationship to the person, you may have different tasks or activities to complete."
- Its meta description goes further: "Dealing with a loss can be overwhelming."
- `Spotlight on` — "If you need help working through grief, or just need someone to talk to, visit the mental health support page."

The grief signpost is placed **above** the process content. Compare the guide's §1.1
requirement that content be "intuitive… comprehensive… targeted… consistent" — none of which
would generate this. It comes from somewhere other than the style guide.

**Time-cost is disclosed before the user commits** `[observed]`:
"Answer a few simple questions for guidance on your situation and to create a checklist of
the steps you need to take. **This will take only a few minutes.**"

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Skip to main content` | First in DOM | |
| `Skip to "About government"` | Second in DOM | Named footer skip target |
| `Français fr (Français)` | Language toggle, every page | The rendered string triples the language name |
| `Sign inSign in` | Header | **Doubled string in the rendered output — a defect** |
| `Search` | Header, label `Search Canada.ca` | |
| `Start questionnaire` | `What to do when someone dies` | Names the artefact and the commitment |
| `All services` | Homepage, end of tile grid | |
| `Look up EI Economic Region by Postal Code` | EI eligibility | Fully specific; no bare "Look up" |
| `Benefits Finder` | Life events; EI eligibility | Product noun used as CTA |
| `Previous - What these benefits offer` | EI eligibility, document nav | Direction + destination title |
| `Next - How much you could receive` | EI eligibility, document nav | |
| `Contact us` | Section nav, EI | |
| `Contact Employment and Social Development Canada (ESDC)` | Footer, contextual | Full institutional name + acronym |
| `Apply` | EI section nav | Bare imperative; the transactional step |
| `Job Bank` | EI eligibility, inline | |
| `Sign in to a Government of Canada account` | Life events `Most requested` | Longer form than the header's `Sign in` |

**Observation.** There is no `Learn more`, no `Get started`, no `Sign up` anywhere in the
harvested set. The guide bans two of these explicitly: "Don't use… vague statements such as
'click here' or 'read more'" and "promotional messaging that might confuse someone who is
deciding whether to go to the page that is being linked to."

**Defect** `[observed]`: `Sign inSign in` renders twice in the header markup on both the
homepage and `Manage life events` — a visually-hidden-plus-visible label pair that is
concatenating rather than substituting. Screen-reader users would hear the label twice.
The same doubling appears on the EI page's section nav, where every item is printed twice
(`How much you could receive` / `How much you could receive`).

## T4 Onboarding & getting-started

There is no account onboarding on the public surface. The equivalent is the **document
navigation pattern**, which is the Canada.ca answer to a multi-step service.

**EI regular benefits — a six-part linear service narrative rendered as sub-navigation** `[observed]`

1. `Do you qualify`
2. `How much you could receive` (with a nested `Employment Insurance Benefits Estimator`, flagged `New`)
3. `Apply`
4. `After you apply`
5. `While on EI`
6. `Contact us`

The step names are a **mix of user question, user question, imperative, temporal phase,
temporal phase, and support**. Steps 4 and 5 are the notable ones: most services stop
documenting at "Apply". `After you apply` and `While on EI` give the post-decision and
in-benefit phases first-class navigation slots. The sequence is reinforced at the foot of
each page with `Previous - <title>` / `Next - <title>`, so the service reads as a document
as well as a navigation tree.

**`On this page` mini-TOC** `[observed]`, on the EI eligibility page:
`Eligibility criteria` · `Eligibility for specific work situations` ·
`Situations where you may not be eligible` · `You need to have worked enough hours to be
eligible` · `Find other types of benefits`

The anchors are `#h2.01`–`#h2.05` — generated, non-semantic anchor IDs, which means every
deep link is position-dependent and will silently break if a section is inserted.

**Guided-questionnaire entry** `[observed]`: `Someone died,  what do I do?` →
`Start questionnaire`, with the promise "Answer a few simple questions for guidance on your
situation and to create a checklist of the steps you need to take." The output is named
(`a checklist`), which is a good expectation-setting device — the user knows what they will
have at the end.

## T5 Question & form design — **PRIORITY**

**This is the style guide's biggest gap, and the gap is the finding.** `[absent]`

A full read of the Content Style Guide found **no rules for form field labels, placeholder
text, hint/help text, button labels, validation, or error messages**. The word "error"
appears once in the entire guide, in "fewer errors", about production workflow. For a
document that is mandatory across every federal public-facing digital service under the
Directive on the Management of Communications, the absence of error-message guidance is a
material hole. (Contrast NHS, which publishes an error-message component with worked
strings, and NSW, which publishes error-tone rules.)

**What the guide does say that bears on questions** `[observed]`

- §4.1: "Only use question marks when asking for information in a form, wizard, survey or quiz" — questions are licensed *only* inside interactive flows.
- §3.1 bans the first-person question form outright. **Write**: "How to renew your passport" / "Renew your passport". **Instead of**: "How do I renew my passport?"
- §3.1 possessive rule: use `your` "when the audience might consider the item being referred to as belonging to them" — `Change your address`, `Replace your card`; use an indefinite article or none for general information — `Start a new business`, `Pay application fees`.
- §3.3 splits obligation by source: "what the law requires them to do, use 'must'"; "an administrative requirement, use 'need to'". Worked pair: **Legal** — "To be eligible for compassionate care benefits, you must be able to show that…"; **Administrative** — "After you apply online, you'll need to provide us with the following documents before we can finalize your claim."
- §3.3 permission vs ability: "do use 'may' or 'might' (expresses permission or a possibility)"; "don't use 'can' or 'could' (expresses ability)".

**Worked question-flow content the guide publishes as figure text** `[observed]`

> Title of page — "Find out if you need to charge GST/HST"
> Plain language summary — "Answer a few questions to find out if you need to charge or collect the tax and register to get a GST/HST account number…"
> Heading — "Do you or your organization already have a GST/HST account?"
> Two clickable options — "Yes" / "No"
> Action button to continue process — "Next"

And a decision-tree pattern: "**Question 1:** Is the entrance to your building barrier-free?"
/ "If your answer is 'Yes,' go to question 2" / "If your answer is 'No': …"

So the *pattern* exists in the guide's illustrations but is never stated as a rule. The
submit label observed is `Next` (compare NHS `Continue`).

**Live eligibility-question design** `[observed]`, from the EI page — the real artefact:

Lead-in: "To receive EI regular benefits, you need to demonstrate that you:" followed by
fragment bullets that complete the sentence — "were employed in insurable employment",
"lost your job through no fault of your own", "have been without work and without pay for at
least 7 consecutive days in the last 52 weeks", "are ready, willing and capable of working
each day", "are actively seeking work and keeping a written record of employers you contact".

Three structural decisions worth stealing:

1. **The lead-in uses `demonstrate that you:`, not `be:`.** It frames eligibility as a burden of proof on the applicant, which is legally accurate and sets expectations for the document requests that follow.
2. **Negative eligibility gets its own H2**, `Situations where you may not be eligible`, rather than being buried as exceptions inside the positive list.
3. **The page opens by telling you not to trust it**: "The information below should be used as a guideline. We encourage you to apply for Employment Insurance (EI) benefits as soon as possible and let us determine if you're eligible." An eligibility page whose first sentence says *apply anyway* — reducing self-screening-out, which is the dominant failure mode of eligibility content.

## T6 Status & state language

`[observed]` — states named on the EI eligibility page:

`eligible` / `not eligible` / `may not be eligible` / `qualify` / `entitled` / `not entitled` ·
`qualifying period` · `benefit period` · `insurable employment` · `insurable hours` ·
`notice of violation` · `claim` / `new claim` / `previous benefit period` ·
`approved` · `extended` (of a period)

**The violation taxonomy is a five-state severity scale with numeric consequences** `[observed]`:
`Without violation` · `Minor violation` · `Serious violation` · `Very serious violation` ·
`Subsequent violation` — rendered as five columns of a nine-row table indexed by
`Regional rate of unemployment`. This is a 45-cell eligibility matrix presented as a single
table with no plain-language summary of how to read it. Useful as a negative example: the
style guide's §5.3 says "turn a complex table into one or more simple tables" and "convert a
table to a list if the data is simple", and this table follows neither.

**Content-lifecycle state** `[observed]`: every page carries `Page details` followed by a
bare ISO-format date (`2026-08-31`, `2026-09-17`, `2025-09-18`) with **no label saying what
the date means** — not "Last updated", not "Published". The style guide requires
"Explain the format in surrounding text" for numeric dates; the site's own date stamp does
not.

## T7 Error, failure & recovery — **PRIORITY**

**Published guidance: `[absent]`.** See T5. The style guide contains no error-message,
validation, confirmation, empty-state or notification rules.

**Observed failure-adjacent content is all *policy* failure, not *system* failure** `[observed]`

The EI eligibility page's `Situations where you may not be eligible` is the richest example
in the file of adverse-outcome copy:

- "if you voluntarily left your job without just cause"
- "if you were dismissed for misconduct"
- "if you're unemployed because you're directly participating in a labour dispute (for example, a strike, lockout or other type of conflict)"
- "during a period of leave that compensates for a period in which you worked under an agreement with your employer, more hours than are normally worked in full-time employment"

The fourth bullet is 34 words, one sentence, with a mid-clause comma splice
("employer, more hours"). It breaks §2.6 ("optimal is under 15 to 20 words"), §4.1
("Avoid having more than one sentence in a single list item" — it is one sentence, but it is
nested), and §2.4 (positive form). It is the least readable string on the page and it
governs whether someone gets paid.

**Adverse-outcome copy is written with `won't` and a stated evidence route** `[observed]`

The COVID-19 vaccination sub-section: "In most cases, if you lose or quit your job because
you didn't comply with your employer's mandatory COVID-19 vaccination policy, you won't be
eligible for EI regular benefits. To determine if you're eligible, we may contact you to
obtain information such as:" followed by four bulleted evidence questions
("if your employer clearly communicated a mandatory COVID‑19 vaccination policy to you"…).
Closing: "We'll use the facts provided by you and your employer to determine if you're
entitled to benefits."

**Pattern:** state the default adverse outcome → hedge it ("In most cases") → list exactly
what evidence will be weighed → name who supplies it. The user leaves knowing both the
likely answer and the appeal surface. Note also the guide's §2.4 exception — "You can use
the negative form when something has serious or fatal consequences… Do not use contractions
(don't)" — is *not* followed here: `didn't`, `won't`, `We'll` all appear in a
benefit-denial paragraph.

**Incarceration sub-section** `[observed]` uses bold for the two load-bearing negatives:
"You're **not** entitled to receive EI benefits while you're confined to a jail…" and
"…are later **found not guilty** by a court of law on all counts…". Recovery is documented:
three named documents, then "Keep these documents in a safe place. We'll contact you and
provide you with instructions on how to submit them." The system takes the next action, and
says so.

**Defect** `[observed]`: three sub-headings on the EI page render as
`**### COVID-19 vaccination**`, `**### If you're in jail**` and
`**#### Number of insurable hours required to qualify for EI benefits**` — markdown heading
syntax wrapped in bold markers, i.e. the heading markup is broken in the delivered output.
These are not real headings, so they are absent from the heading tree and from
screen-reader heading navigation — on the page that decides benefit denial.

## T8 Empty states

`[absent]`. No search was executed, no Benefits Finder was run, and no no-results or
zero-data surface was reachable. The style guide publishes nothing on empty states.

The one adjacent rule is §5.3 on blank table cells `[observed]`: "Assistive technologies like
a screen reader will notify the person if the cell is blank", with three sanctioned fillers —
`"no data"`, `"0" (zero)`, `"n/a" (not applicable)`. A zero-state rule for tables and nothing
else.

## T9 Notifications & system messages

`[absent]` in the style guide. Observed on the site only as **editorial promotion**, not
system messaging:

- `Feature` / `Features` blocks on the homepage — campaign slots (`National Day for Truth and Reconciliation – September 30`, `Measles: What you should know`, `Global travel disruptions`, `Consultations on official languages`).
- Inline programme notices inside body copy, e.g. the EI eligibility list's nested bullet "are affected by [flooding or wildfires]" linking to a hazardous-weather notice — a live-event carve-out injected into a static eligibility list.
- A `New` flag on the `Employment Insurance Benefits Estimator` sub-nav item.

Campaign links carry heavy UTM strings in the visible href
(`?utm_campaign=pch-pch-consultationslo-2026-2027&utm_medium=canada-ca&utm_source=…`), which
is worth noting against the guide's §7.3 "verify that links point to the appropriate official
language" and general link-hygiene rules.

## T10 Disclosures, legal & compliance

**The style guide is itself the compliance artefact.** Its binding clause, verbatim:

> "All departments and other portions of the federal public administration subject to the
> Directive on the Management of Communications must use the Canada.ca Style Guide. These
> organizations must follow this style guide's requirements for all public-facing websites
> and digital services, regardless of the technology, domain name or publishing platform
> used."

Scope is bounded honestly: "Institutions that fall outside of the Directive… do not have to
follow this style guide. However, all institutions are encouraged to use it." Precedence is
declared: "If there are conflicts between this guide, Writing Tips Plus or any other
resource, this guide takes priority for content published online."

**Named "must" statements** `[observed]` — the guide uses `must` sparingly and deliberately;
the full inventory is:

1. "the rules you must use to develop and edit English web content"
2. "must use the Canada.ca Style Guide" / "must follow this style guide's requirements"
3. "Content must comply with: templates, content components, character limits and other requirements as described in the Canada.ca Specifications"
4. "Government of Canada web content must be: **intuitive**… **comprehensive**… **targeted**… **consistent**" (§1.1)
5. "you must publish communications and provide services to the public in both official languages" (§1.3)
6. "Government content must: be professionally translated / reflect Canadian writing conventions in English and French / include fully bilingual images, multimedia files and transcripts, or contain equivalent information in both official languages" (§1.3)
7. "You must use plain language, as this is a requirement of the Directive on the Management of Communications." (§2.0, under the heading **"The duty to be clear: Plain language requirement"**)
8. "If you must include the name of the act or regulation, always give a plain-language description." (§2.7)
9. "Formatting must support the most important information on the page." (§4.2)
10. "When you post a publication online, you must adapt it for the web." (§5.1)
11. "A link must describe the content a person will find once they click on it." (§7.2)
12. "Each column and row of a table must have a header…" (§5.3)
13. "You must provide a long description if you can't describe the content and function of the image in less than 140 characters." (§6.3)
14. "**Never** rely on colour or texture alone to convey important information." (§5.3)

**"The duty to be clear" is the phrase worth stealing.** Plain language framed as a *duty*
with a named legal instrument behind it, not as a craft preference.

**Legislation-reference rule (§2.7)** `[observed]` — directly transferable to regulated
disclosure work:

- "If you must include the name of the act or regulation, always give a plain-language description."
- "Don't use the abbreviation for the act, because it makes the text harder to follow."
- "Close the topic before referring to other obligations under different legislation."
- **Write**: "The act strengthens the Government of Canada's commitment to…" — **Instead of**: "The EEA strengthens the Government of Canada's commitment to…"
- **Write**: "You have to file your income tax return (T1) by April 30." — **Instead of**: "You have to file your T1 return by April 30."

**Third-party boundary (§3.2)** `[observed]`: "Don't provide information on behalf of another
organization. Don't duplicate information provided on another organization's website.
Instead, direct people to that website to get the information." A content-ownership rule that
prevents the most common cause of stale government copy.

**Accessibility statement: `[absent]` — blocked.** `https://www.canada.ca/en/transparency/accessibility.html`
returned an empty body. The footer of every page carries only `Terms and conditions` and
`Privacy`, with no accessibility link at all in the harvested chrome. For a batch chosen
partly for statutory accessibility statements, Canada.ca is the one product where the
statement could not be reached and does not appear in the footer.

## T11 Content architecture & page templates — **PRIORITY**

**Templates are mandatory and machine-declared.** `[observed]` The style guide defers
template specification: "Content must comply with: templates, content components, character
limits and other requirements as described in the Canada.ca Specifications." It names four
template types in passing (§6.1): "a theme or topic page / the home page / campaign pages /
promotional features on a topic page or home page".

Crucially, **each page declares its own template and content type in metadata** `[observed]`:

- `meta-template: theme-page`, `meta-dcterms.type: navigation page - theme landing page` (Manage life events)
- `meta-dcterms.type: navigation page - audience page` (What to do when someone dies)
- `meta-dcterms.type: program descriptions` (EI eligibility)
- `meta-content-type: landing` — plus `meta-dcterms.subject`, `meta-dcterms.issued`, `meta-dcterms.modified`, `meta-dcterms.spatial`, `meta-dcterms.creator`, `meta-dcterms.license`, and a vocabulary reference `meta-https://vocab.canada.ca/web/mws#program: esdc/ics/navigation-theme-topic`

A controlled vocabulary of page types, declared in Dublin Core metadata on every page, is the
strongest IA governance artefact in this batch. It makes template compliance auditable at
scale — you can crawl the estate and count.

**Observed template — theme/navigation page**: H1 → `Most requested` (flat link list) →
`Services and information` (H3-titled cards, each with a keyword-run description) →
`Features` (image + link + one-line description) → `Page details` (date) → `About this site`.

**Observed template — program/eligibility page**: breadcrumb → page title with a
`<program>: <section>` colon construction (`EI regular benefits: Do you qualify`) → a second
H1 for the programme → section navigation (six items) → H1 for the section (`Do you qualify`)
→ `On this page` mini-TOC → intro caveat → H2 sections → `Document navigation`
(`Previous -` / `Next -`) → `Page details` → `About this site`.

**Defect** `[observed]`: that page renders **three H1-level headings** —
`EI regular benefits: Do you qualify`, `EI regular benefits`, and `Do you qualify` — against
the guide's own §5.1 rule "apply a Heading 1 only once per page".

### Structural rules from the style guide

**Headings** `[observed]`: sentence case; "don't add punctuation at the end"; "gives a clear
idea of what follows"; "is short and contains no unnecessary words"; "contains the most
relevant terms at the beginning"; "makes sense on its own"; "is followed by text and not by
another heading"; "contains no promotional messaging (boastful, subjective claims)".
Density rule: **"Use headings to divide text into logical sections approximately every 200
words."** Uniqueness test, verbatim: "Search for the title of the page followed by 'site:'
and the domain extension (for example, 'food safety site:gc.ca')." A published,
operationalisable duplicate-title check.

"Publication and program titles usually don't make good web page titles" — "The titles of
publications are usually not written in plain language, short enough or descriptive enough."

**Lists** `[observed]`: "If possible, aim for maximum of seven items in your list";
"if a list contains more than seven items, consider breaking it up into categories";
"Avoid having more than one sentence in a single list item"; "Don't end the list items with
any punctuation"; "use positive statements as much as possible"; "place negatively phrased
items together, if you must use them"; "use the imperative mood (or command) for the first
item of your list, use the same mood for each subsequent list item". Capitalisation is
conditional on grammatical dependence — capitalise "When list items are grammatically
independent of each other", don't "When the meaning of list items depends on a lead-in
phrase". Two model lead-ins are published: "You must meet all of the following
requirements:" and "To be eligible, you must meet one or more of the following
requirements:" — the all/one-or-more distinction made explicit in the lead-in.

**Links** `[observed]`: "A link must describe the content a person will find once they click
on it"; "Make sure that all links on the same page use unique descriptive text";
"When more than one link on a web page links to the same destination page, use the same words
for the hyperlink"; **Don't use** "the same link text to point to two different pages",
"vague statements such as 'click here' or 'read more'", "promotional messaging".
Parenthetical context is specified with formats: `(PDF, 4.35 MB)`,
`(Using Magnifier in Windows: At a Glance - YouTube (2:07 minutes))`,
`(accessible only on the Government of Canada network)`. Email addresses must be spelled
out rather than hidden behind a `mailto:` link — **Write**: "Please submit your request by
email to abcxyz@canada.ca." **Instead of**: "Email us to submit a request."

**Tables** `[observed]`: "It can be difficult to make tables accessible and easy to read for
people using screen readers or mobile devices"; "turn a complex table into one or more simple
tables"; "convert a table to a list if the data is simple"; "Avoid formatting cells with
textures or colours"; "**Never** rely on colour or texture alone".

**Sentence and paragraph limits** `[observed]`: "break up long sentences (optimal is under 15
to 20 words)"; "keep paragraphs to one main idea and no more than three sentences";
"Keep some paragraphs to one sentence when it makes the content easier to scan";
"present a series of two or more ideas or words as a vertical list".

## T12 FAQs

`[absent]`. No FAQ component was observed on any harvested page, and the style guide does not
mention FAQs. Canada.ca's structural answer to the FAQ is the **section-as-question** —
`Do you qualify`, `How much you could receive`, `After you apply`, `What to do when someone
dies` — questions promoted to navigation rather than collapsed into accordions. The same
choice the NHS made, arrived at differently.

The one interactive Q&A surface, the `Start questionnaire` flow, was deliberately not entered.
`[documented]` only: it "create[s] a checklist of the steps you need to take".

## T13 Terminology & glossary

**Plain-word substitutions published by the guide** `[observed]` — the full "Write / Instead
of" set is small (26 pairs across the whole guide), which is itself notable next to NHS's
~330-entry A to Z:

| Write / Use | Instead of |
|---|---|
| ask | make a request |
| you must | you shall |
| to | in order to |
| before | prior to |
| get | obtain |
| apply | submit your application |
| consider | take into consideration |
| modify | make a modification |
| needs | is in need of |
| for example, such as, or like | e.g. |
| that is, in other words | i.e. |
| Determine whether you're eligible. | Get more information about eligibility on the Canada.ca website. |
| We approved your request for funding. | We received your request for funding, which we've thoroughly reviewed and approved in a timely manner. |
| You have until April 30 to file your tax return. | The period of time that you have to file your tax return ends on April 30. |
| There are 15 client contact centres across Canada. | There are 15 CCCs across Canada. |

**Jargon list with glosses** `[observed]`: "adverse effect (effect)" ·
"citizen engagement (meaningful involvement of citizens)" · "remuneration (pay)" ·
"disclosure (making information available)" · "pro bono (legal service provided free of
charge)". Rule: "never use jargon to explain jargon."

**Web-vocabulary normalisations (§4.11)** `[observed]`: `website` (not "web site") ·
`web page` (not "webpage") · `web` (not "Web") · `email` (not "e-mail") ·
`online` (not "on line").

**Contraction whitelist and blacklist (§4.5)** `[observed]` — unusual in its specificity.
Use: `you've`, `you're`, `you'll`, `you'd`, `we've`, `we're`, `we'll`, `we'd`, `can't`,
`don't`, `didn't`, `won't`, `isn't`, `weren't`, `wasn't`, `aren't`.
Don't use: `should've`, `could've`, `shouldn't`, `couldn't`, `wouldn't`, `mightn't`,
`mustn't`, `it'll` — because "Uncommon or more complex contractions can be harder for people
with low literacy skills to understand."
And the safety carve-out: "Don't use contractions when there is a **critical** difference
between two things" — **Critical**: "Do **not** drive while taking this medicine." /
**Not critical**: "Most people **don't** have reactions to the flu vaccine."

**Governance vocabulary** `[observed]`: `Canada.ca Specifications` · `Content components` ·
`Mandatory Procedures` · `Directive on the Management of Communications` ·
`Writing Tips Plus` · `Language Portal of Canada` · `Open Government Licence`.

**Programme vocabulary from the live pages** `[observed]`: `EI` (used unexpanded in the page
title `EI Regular Benefits` and in the nav item `While on EI`, though expanded as
"Employment Insurance (EI) benefits" in body copy) · `insurable employment` ·
`qualifying period` · `benefit period` · `notice of violation` · `Job Bank` ·
`Benefits Finder` · `Service Canada` · `My Service Canada Account` (the sanctioned "my"
exception).

## T14 Voice, tone & accessibility — **PRIORITY (the published standard)**

### Tone, stated in four adjectives

`[observed]` "The tone of the government's web content should be: **direct / informative /
conversational / professional**", with the governing simile:
"Write as if you were talking to your audience in person, but with the authority of an
institution that provides information as part of its mandate."

### Person

`[observed]` "Use an informal tone, and speak directly **to** people by using the second
person ('you,' 'your')." The government is `we`: "Use 'we' and 'our' when writing on behalf
of the Government of Canada… We generally provide information to people from the perspective
of the government as a whole rather than from a specific institution."

**The institution is named only under three stated conditions**: when it "will be contacting
the person"; when the "person needs to contact the institution by phone, mail or online
process"; when the "role of the institution in a process is relevant to the task". Otherwise
the 100-odd federal bodies disappear behind one `we`. For a portal that consolidated ~1,500
websites, this single rule is what makes the consolidation legible to citizens — and it is
the clearest transferable lesson for any multi-brand or multi-BU organisation.

Also: "Don't include references to your website on your website."

### Active and positive form

`[observed]` "Subject (the doer) + verb (the action) + object (who/what the action is
about)". **Write**: "We may ask you to provide proof of citizenship. (active)" —
**Instead of**: "You may be asked to provide proof of citizenship. (passive)". And the
positive-form rule: "Whenever possible, tell people what they may or must do instead of what
they may not or must not do… Avoid negatives, double negatives and exceptions to exceptions."
Worked: **Positive** "You're entitled to part of the deduction." / **Negative** "You're not
entitled to the entire deduction."

### Reading level — a stated refusal to set one

`[observed]` **There is no grade level, Flesch score or numeric readability target anywhere
in the guide.** What exists instead: "According to Statistics Canada (2012) and Canadian
literacy organizations, almost 50% of Canadians have literacy challenges", with three named
behaviours — readers "spend a lot of time trying to understand words that contain more than
two syllables", "read word by word and slowly move their eyes across each line of text", and
"skip over large amounts of information when it contains many multi-syllable words, uncommon
terms and long sentences". Plus a syllable heuristic: "Simple words have two syllables or
less."

And an explicit anti-metric rule: "Readability tools are based on algorithms that measure
things like word length. These tools cannot tell you if your audience will find your content
easy to understand and use… However, you can use them to help demonstrate why text should be
simplified or shortened." A tool sanctioned as a *persuasion device for stakeholders*, not as
a quality gate. This is the same conclusion the NHS reached, reached independently.

Plain language is defined by three user verbs: content must let the audience "**find** what
they need / **understand** what they find / **use** the information."

### Official languages — how bilingualism shapes the content itself

`[observed]` The obligation, §1.3: "According to the Official Languages Act, you must publish
communications and provide services to the public in both official languages." Content must
"be professionally translated", "reflect Canadian writing conventions in English and French",
and "include fully bilingual images, multimedia files and transcripts, or contain equivalent
information in both official languages."

Four ways the requirement visibly reshapes the writing:

1. **Jargon is banned partly for machine-translation reasons.** §2.5: "Where possible, avoid using jargon, idioms, metaphors and expressions… People who don't speak English or French might use online tools to translate text. These tools do not always translate words and ideas accurately." Worked examples: "**Idiom**: to hire a helping hand"; "**Metaphor**: the sun was a ball of fire". A plain-language rule justified by *translatability*, not comprehension.
2. **Sort order must survive translation.** §5.2: "If you present content in alphabetical order in English, also present it in alphabetical order in French to provide the same intuitive experience." Alphabetical order is not a fact about the content; it is a fact about the language, so the structure must be re-derived, not copied.
3. **Language of a link target is disclosed in the link.** §7.2: "add parentheses inside the link and specify the language of the linked content, formatted as (Language X only)"; "do not translate the title of the linked content"; "ensure its language is indicated in the link's code". Live model: "To renew your French passport while abroad in Canada, follow the steps described in [Effectuer le renouvellement de votre passeport (French only)]." Combined form is specified too: `(French only, PDF, 0.46 MB)`.
4. **Every single rule carries a French cross-reference.** Each subsection ends with the heading `See how this rule applies in French:` linking to the matching anchor in `conception.canada.ca/guide-redaction`. The two guides are structurally paired rule-by-rule, not merely translated. §4.11 is the one rule whose French counterpart reads "This rule doesn't apply to content in French" — divergence is permitted and declared.

The guide also scopes itself honestly: "This guide establishes the rules you must use to
develop and edit **English** web content." There is a separate French guide, not a
translation of this one.

**Structural consequence observed live** `[observed]`: every URL has a path-mirrored French
twin (`/en/services/benefits/ei/ei-regular-benefit/eligibility.html` ↔
`/fr/services/prestations/ae/assurance-emploi-reguliere/admissibilite.html`) — the *path
segments themselves are translated*, not just the locale prefix. That is a significant
content-operations commitment: every URL slug is a translated string with its own review.

### Accessibility guidance in the style guide

`[observed]` §1.2: "Making content accessible means a wide range of people can use it,
including people with physical and cognitive disabilities (for example, reading disorders,
attention deficit disorders, memory disorders)."

**Alt text (§6.2)** — the most reusable block:
"describe the image as if you were describing it to someone over the phone" ·
"use as few words as possible" · "limit the text to around 140 characters (including
spaces)" · "use the null indicator as the alternative text (alt="") if the image doesn't
provide any more information than what is already provided in the text on the page" ·
"don't use 'image of...' or 'graphic of...' to describe the image; screen readers do this
already". Long descriptions: "You must provide a long description if you can't describe the
content and function of the image in less than 140 characters" and "If you provide a long
description for an image, you must also provide alternative text for the long description."
Decorative: "Don't place meaningful text, such as campaign or program titles, in decorative
images."

**Italics (§4.2)**: "People with dyslexia or other reading disorders may find it difficult to
read italicized text." Don't use italics "to emphasize a word or phrase (use bold sparingly
instead)", "for long passages of text, such as quotations", or "in page titles".
"Use underlining for links only."

**Dashes (§4.1)**: the en-dash exception carries an accessibility rationale —
"Avoid using a hyphen, as screen readers often skip it, making the separation between years
unclear."

**Inclusive writing (§1.2)** is two sentences: "Make gender-inclusive writing your standard
practice" plus a pointer to the Language Portal of Canada. **There is no bias-free word
list in the guide** — a conspicuous gap next to NHS's five-part `Inclusive content` and NSW's
person-first tables.

### Negative findings, recorded honestly

- **The guide cites WCAG 2.0.** Both references (§1.2, §5.3) point at WCAG 2.0, while NHS cites 2.2 and the NSW design system cites 2.2. The mandatory federal writing standard is two revisions behind its peers in this batch.
- **§2.1 and §3.1 flatly contradict each other on first person.** §2.1: "Use the first-person or second-person pronouns (I, we, us, you) instead of the third person". §3.1: "Don't use 'I' or 'my' statements." Only "my" gets a stated exception.
- **The guide breaks its own heading-punctuation rule ~33 times** with its recurring subheading `See how this rule applies in French:` — a heading ending in a colon, plus `Write:` / `Instead of:` / `External resources:`. None falls under a stated exception.
- **The guide breaks its own heading-followed-by-heading rule** at `## Web content makeovers` → `### Case study A…` → `#### Before`.
- **The guide's own model alt text exceeds its own 140-character limit** (the balanced-scorecard alt text is ~160 characters), and one figure's alt attribute ends in a colon and contains two sentences.
- **The guide's own title is inconsistent**: H1 and metadata say "Canada.ca Content Style Guide"; the binding clause calls it "the Canada.ca Style Guide".
- **Broken anchor**: the §2.6 French cross-reference points at `#wp2-5` (section 2.5).
- **Wrong-language URL**: a "Writing Tips Plus" link uses the `/fr/` path for an English-labelled resource, against §7.3's own "verify that links point to the appropriate official language".
- **Live homepage violation**: `Public pensions (CPP (Canada Pension Plan) and OAS (Old Age Security))` inverts §4.4's long-form-first rule and nests parentheses three deep.
- **Live rendering defects**: `Sign inSign in` doubled in the header; every EI section-nav item printed twice; three sub-headings on the EI eligibility page shipped as `**### …**` (bold-wrapped markdown, not real headings); three H1s on one page.
- **Live style violations on `What to do when someone dies`**: `Someone died,  what do I do?` uses first person and a question mark outside a form (two §3.1/§4.1 breaches) and carries a doubled space. The doubled space also appears in the heading text.
- **`Page details` dates are unlabelled**, so a bare `2026-08-31` sits at the foot of a benefits page with no statement of what it dates.
- **The 45-cell violation table** on the EI eligibility page has no plain-language summary, against §5.3's own simplification guidance.
- **No accessibility link in the page footer** and the accessibility statement URL returned empty.
- **Typos in the published guide**: "aim for maximum of seven items" (missing "a"); "so they to point to current links" (stray "to"); "Don't  use contractions" (doubled space); a case-study table whose columns do not add up (2 + 2 shown as 3).

---

## Transferable patterns

1. **One `we` for the whole organisation, with three stated exceptions.** "We generally
   provide information to people from the perspective of the government as a whole rather
   than from a specific institution" — name the sub-entity only when it will contact the
   user, when the user must contact it, or when its role is relevant to the task. The single
   most useful rule here for any multi-brand or multi-BU estate.
2. **"The duty to be clear."** Frame plain language as a legal duty with a named instrument
   behind it, not as a style preference. It changes who can veto the copy.
3. **Split obligation by its source in the modal verb.** `must` = legal requirement;
   `need to` = administrative requirement; `may`/`might` = permission or possibility;
   never `can`/`could` for permission. Directly applicable to regulated consent, KYC and
   disclosure copy where "you must" and "you'll need to" are currently used interchangeably.
4. **Tell the reader to apply anyway.** "The information below should be used as a guideline.
   We encourage you to apply… and let us determine if you're eligible." Eligibility content's
   dominant failure is false self-exclusion; one sentence at the top addresses it.
5. **Give negative eligibility its own heading.** `Situations where you may not be eligible`
   as an H2, not as exceptions nested in the positive list.
6. **Declare the page template in metadata.** A controlled vocabulary of page types
   (`theme-page`, `navigation page - audience page`, `program descriptions`) emitted on every
   page makes template compliance crawlable and auditable across thousands of pages.
7. **Justify plain-language rules by translatability, not only by comprehension.** Banning
   idiom and metaphor because machine translation mangles them is a stronger argument in a
   localisation-heavy organisation than "it's clearer".
8. **Re-derive structure per language rather than translating it.** Alphabetical order,
   heading order and link text all change; the *rule* ("present it in alphabetical order in
   French too") is what transfers, not the artefact.
9. **Disclose a link target's language, file type and size inside the link text.**
   `(French only, PDF, 0.46 MB)` — one parenthetical carries three expectations.
10. **Publish a contraction whitelist, and suspend contractions where the difference is
    critical.** "Do **not** drive while taking this medicine." vs "Most people **don't** have
    reactions to the flu vaccine." A defensible, testable rule rather than a blanket ban.

## Caveats & gaps

- **Four target URLs returned empty bodies or aborted**: `design.canada.ca/architecture/index.html`, `www.canada.ca/en/transparency/accessibility.html`, `www.canada.ca/en/government/sign-in-online-account.html`, `www.canada.ca/en/government/about-canada-ca.html`. Recorded as blocked; no alternative retrieval route was attempted, per the harvest rules.
- **The Canada.ca Content and Information Architecture Specification was not reached.** The style guide defers all template, content-component and character-limit requirements to it, so mandatory page templates in this file are described only from the style guide's references and from live metadata, not from the specification itself. This is the largest single gap.
- **The style guide render was truncated** mid-word, before its "Resources" section and part of "Web content makeovers", and before Footnote 1. Anything in those sections is missing.
- **The accessibility statement could not be read**, so the statutory conformance claim, known-limitations list and feedback route for Canada.ca are unknown. It is also absent from the page footer in the harvested chrome.
- **No French page was read as content.** Bilingualism is documented structurally (path-mirrored URLs, the `Français` toggle, the guide's French cross-references) but no fr-CA copy was examined, so no claim is made here about French register, length differences, or whether the two guides actually diverge in practice.
- **Only one programme page (EI regular benefits eligibility) was read.** The other five steps of that service, and every other benefit, tax and immigration programme, are unharvested. Template claims rest on one instance plus two navigation pages.
- **No form, no questionnaire, no Benefits Finder, no sign-in was entered**, per the safety rules. All transactional content — field labels, validation, confirmations, saved-progress states — is `[absent]` or `[documented]`.
- **Search was not executed**, so no results or zero-results copy was seen.

## Sources

1. https://www.canada.ca/en.html
2. https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/canada-content-style-guide.html
3. https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/eligibility.html
4. https://www.canada.ca/en/services/life-events.html
5. https://www.canada.ca/en/services/life-events/death.html
6. https://www.canada.ca/fr/services/prestations/ae/assurance-emploi-reguliere/admissibilite.html *(observed as the declared French mirror of source 3; not read as content)*
7. https://conception.canada.ca/guide-redaction *(referenced throughout source 2 as the paired French guide; not fetched)*
8. https://design.canada.ca/architecture/index.html *(blocked — empty body)*
9. https://www.canada.ca/en/transparency/accessibility.html *(blocked — empty body)*
10. https://www.canada.ca/en/government/about-canada-ca.html *(blocked — empty body)*
11. https://www.canada.ca/en/government/sign-in-online-account.html *(blocked — fetch aborted)*
