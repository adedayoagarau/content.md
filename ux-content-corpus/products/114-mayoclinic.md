# 114. Mayo Clinic

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Academic medical centre health library (consumer health-information publishing + care access) |
| Primary URL | https://www.mayoclinic.org/ |
| Corpus rank | 114 |
| Benchmark strength (source list) | Health-information hierarchy |
| Locale / market observed | en-US. Footer switcher offers `English` · `Español` (`/es/`) · `العربية` (`/ar/`) · `简体中文` (`/zh-hans/`) |
| Platform observed | Web (health library, hubs, A–Z indexes, policy pages, appointment request) |
| Auth state | Unauthenticated public surfaces only. No account, no symptom entry, no form submission. |
| Regulatory posture | **HIPAA-covered entity, but the acronym appears nowhere in the harvested HTML.** Compliance surfaces only as a footer link to a PDF `Notice of Privacy Practices` (mc5256-01.pdf) and via the phrase "protected health information" inside the newsletter data-use notice. `Notice of Nondiscrimination` is likewise a footer PDF (mc2570-61.pdf) — no inline Section 1557 text, no language-assistance taglines in HTML. Terms carry an all-caps not-medical-advice clause and an emergency instruction. Digital Accessibility Statement claims "ongoing efforts to meet" WCAG 2.1 AA; **Section 508 and the ADA are not referenced anywhere**. Advertising is accepted with a published separation policy and per-slot disclaimer. Medical-editor financial-interest disclosure is documented. Minnesota jurisdiction; site intended for 18+. |
| Harvest date | 2026-09-21 |
| Pages inspected | 16 |
| Harvest completeness | Full for the priority sections (T1, T11, T14). Article template evidenced from **five** articles across **two** templates. Gaps: `/appointments/faq`, the Spanish/Arabic/Chinese locales, `Drugs & Supplements`, `Healthy Lifestyle`, the Symptom Checker itself, and the two compliance PDFs. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Diseases & Conditions hub | https://www.mayoclinic.org/diseases-conditions | Tagline, A–Z picker, Symptom Checker card |
| D&C A–Z index, letter A | https://www.mayoclinic.org/diseases-conditions/index?letter=A | Two-letter grouping, `See` cross-refs, `Skip this Section` |
| Symptoms hub | https://www.mayoclinic.org/symptoms | Different letter-nav pattern from D&C |
| Tests & Procedures hub | https://www.mayoclinic.org/tests-procedures | Best letter-nav accessible labels on the site |
| **Migraine — Symptoms & causes** | /diseases-conditions/migraine-headache/symptoms-causes/syc-20360201 | Full D&C template, two-tier escalation |
| **Migraine — Diagnosis & treatment** | /diseases-conditions/migraine-headache/diagnosis-treatment/drc-20360207 | Second-tab template |
| **Anxiety disorders — Symptoms & causes** | /diseases-conditions/anxiety/symptoms-causes/syc-20350961 | Older vintage; `doctor`/`provider` terminology |
| **Anxiety — Diagnosis & treatment** | /diseases-conditions/anxiety/diagnosis-treatment/drc-20350967 | Confirms full D&T sequence |
| **Type 2 diabetes — Symptoms & causes** | /diseases-conditions/type-2-diabetes/symptoms-causes/syc-20351193 | Refreshed vintage; shortest escalation block |
| **Chest pain — Symptoms & causes** | /diseases-conditions/chest-pain/symptoms-causes/syc-20370838 | Emergency-first escalation; modular template proof |
| **Cough — Symptoms template** | /symptoms/cough/basics/causes/sym-20050846 | The *other* template; two-tier escalation |
| Health Information Policy | /about-this-site/health-information-policy | **The editorial-process source** |
| Meet our medical editors | /about-this-site/meet-our-medical-editors | A directory, not a process page |
| Digital Accessibility Statement | /about-this-site/accessibility-statement | Very thin — see T14 |
| Advertising & Sponsorship Policy | /about-this-site/advertising-sponsorship-policy | |
| Terms and conditions of use policy | /about-this-site/terms-conditions-use-policy | Strongest emergency copy on the site lives here |
| About this Site | /about-this-site | Policy IA |
| Appointments | /appointments | Emergency routing; stripped conversion template |

---

## T1 Navigation & IA labels

**Five top-level items, each rendered with a deliberate line break** `[observed]`:

`Care at / Mayo Clinic` · `Health / Library` · `For Medical / Professionals` · `Research & Education / at Mayo Clinic` · `Giving to / Mayo Clinic`

The nav is **audience-segmented, not function-segmented**. Four of the five name a constituency — patients seeking care, medical professionals, researchers/students, donors — and only one (`Health Library`) names a content type. That is the correct IA for an institution that is simultaneously a hospital, a publisher, a medical school and a charity, and it means the health library sits as a peer of the hospital rather than beneath it.

**Health Library — six children, two columns** `[observed]`:

| Column 1 | Column 2 |
|---|---|
| `Diseases & Conditions` | `Drugs & Supplements` |
| `Symptoms` | `Healthy Lifestyle` |
| `Tests & Procedures` | `Mayo Clinic Health Letter & Books` |

The left column is the **clinical triad** and it maps onto the three questions a worried person actually arrives with: *what is wrong with me* (Symptoms), *what is this thing I've been told I have* (Diseases & Conditions), *what is going to be done to me* (Tests & Procedures). Those three are not parallel content types — they are three different entry points into the same body of knowledge, indexed three ways.

This is the core structural insight of the Mayo health library and the reason it is the corpus reference: **the same clinical fact is reachable from the symptom, from the diagnosis, and from the intervention**, and each route has its own index, its own article template and its own register.

**Two A–Z indexes, three different letter-nav patterns** `[observed]` — and they do not agree:

| Hub | Heading | Grouping | Missing letters | Accessible labels |
|---|---|---|---|---|
| Diseases & Conditions | `Find diseases & conditions by first letter` | **Two-letter** (`A`, `Aa`, `Ab`, `Ac`…) | **Q omitted entirely** — no disabled state | Bare letters |
| Symptoms | `Jump to a letter` + `Find a symptom by its first letter` | Single-letter | O, Q, X, Z rendered **disabled but present** | Bare letters |
| Tests & Procedures | `Find a test or procedure by its first letter` | Single-letter | Q, Y, Z disabled | **`Find a procedure that begins with the letter A`** / **`No procedures begin with the letter Q`** |

The Tests & Procedures implementation is the correct one and the other two are not. A disabled letter that announces `No procedures begin with the letter Q` tells a screen-reader user *why* the control is inert; a silently omitted `Q` tells them nothing and looks like a rendering fault. Three teams have solved the same problem three ways on one site.

**The `See` cross-reference is the workhorse of both indexes** `[observed]`. Pattern: unlinked colloquial term → the word `See` → linked canonical title.

- `AAT deficiency` / `See` / `Alpha-1-antitrypsin deficiency`
- `A fib` / `See` / `Atrial fibrillation`
- `Anosmia` / `See:` / `Loss of smell (anosmia)`
- `Headaches` / `See:` / `Headache`

This is how a health library absorbs the vocabulary gap between what a patient types and what a clinician calls it. `A fib` is what someone says in a waiting room; `Atrial fibrillation` is what is written in the notes. The index accepts both and routes one to the other without making the user feel corrected.

(`See` on the D&C index, `See:` with a colon on the Symptoms index — a small inconsistency in the same mechanism.)

**Breadcrumbs are inconsistent between templates** `[observed]`:

- Policy pages and Symptoms articles: `Home > About this Site > Digital Accessibility Statement`, `Home > Symptoms > Cough` — with the Cough breadcrumb **repeated at page foot**
- A–Z index: `Home > Diseases & Conditions > Begins with 'A'` — note the crumb label `Begins with 'A'`
- **D&C condition articles carry no Home-first breadcrumb at all** — just a `Diseases & Conditions` strip above the H1 and a `Diseases & Conditions` / `[Topic]` pair at the foot

The most-visited page type on the site has the weakest wayfinding.

**In-article tab bar — the condition-article spine** `[observed]`:

`Symptoms & causes` · `Diagnosis & treatment` · `Doctors & departments` · `Care at Mayo Clinic`

Type 2 diabetes ships only three (no `Care at Mayo Clinic`), so the fourth tab is conditional on Mayo offering a named care pathway. Render order around the tabs is fixed: H1 (itself a link to tab 1) → `Request an Appointment` button → tab list → `Print`. The same tab list repeats near the footer under an H2 equal to the topic name.

The tab set is worth reading as a statement of intent. Tabs 1 and 2 are **information**; tabs 3 and 4 are **Mayo's commercial offer**. The transition from library to hospital happens at a tab boundary, labelled honestly, with no interstitial. A user reading about their diagnosis is one click from a named department, and the click is opt-in.

**Symptoms articles have no tab bar at all.** See T11.

## T2 Value proposition & headline patterns

**Each hub carries a tagline that promises a different quality** `[observed]`:

| Hub | Tagline | What it promises |
|---|---|---|
| Diseases & Conditions | `Easy-to-understand answers about diseases and conditions` | Comprehensibility |
| Tests & Procedures | `What it is, how it's done, how to prepare, risks and results.` | Coverage — the template, previewed |
| Symptoms | *(none — `[absent]`)* | |

**`Easy-to-understand answers about diseases and conditions` is the single most important string in this file.** Eight words, no jargon, and the promise is not accuracy or authority or comprehensiveness — it is *comprehensibility*. An institution with Mayo's clinical reputation could lead on expertise. It leads on being understandable, because it has correctly identified that a frightened person's obstacle is not doubt about the source, it is the reading.

`answers` rather than `information` is the other half of it. A person with a new diagnosis has questions, not an information need.

The Tests & Procedures tagline does the opposite job and does it well: `What it is, how it's done, how to prepare, risks and results.` is literally the article template, published as a promise. Before opening anything, the user knows the shape of what they will get — including that risks will be covered. For someone facing a procedure, "risks" appearing in the tagline is a trust signal precisely because it is the part they fear will be omitted.

The Symptoms hub having no tagline is a gap, and a consequential one: it is the entry point for the most anxious user (the one who does not yet have a diagnosis) and it is the only hub that does not say what it will do for them.

**Reassurance is front-loaded in article openings** `[observed]` — a consistent editorial rule:

- `A cough once in a while is common and healthy.` (Cough, first line of Definition)
- `Experiencing occasional anxiety is a normal part of life.` (Anxiety, Overview)
- `Whatever form of anxiety you have, treatment can help.` (Anxiety, Overview)
- `There's no cure for type 2 diabetes.` (Type 2 diabetes, Overview)

The first three normalise before explaining. The fourth does the opposite — it states the hardest fact in the first paragraph, in six words, and does not soften it. Mayo appears to apply a rule: **normalise where the symptom is usually benign, state the hard fact plainly where it is not.** Neither is hedged. Compare the migraine article's Overview, which closes with a conditional offer rather than a promise: "Medicines can help prevent some migraines and make them less painful." — `some`, `less`, not "stop".

**Section headers are clinical categories, not questions.** Mayo does not use question-form headings anywhere in article bodies (contrast Cleveland Clinic, 115). The only interrogative headings on the site are in institutional furniture (`Still want to schedule by phone?`, `Questions about appointments?`) and in the appointment-preparation lists.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Skip to content` | First in DOM, every page **except `/appointments`** | |
| `Skip this Section` | A–Z index → `#cmp-skip-alphabet-facet` | Bypasses the 26-link facet. Capital `S` on Section |
| `Back to top` | After every letter group, both indexes | |
| `Request an Appointment` | Primary button under article H1 | Title case |
| `Request an appointment` | In-body repeat CTA, **same pages** | Sentence case — **both casings on one page** |
| `Request appointment` | Utility bar, mobile drawer | Third variant |
| `Request Appointment` | `Care at Mayo Clinic` mega-menu | Fourth variant |
| `Find a Doctor` / `Find a doctor` | Mega-menu / drawer | Same inconsistency |
| `Print` | Article top and bottom; href appends `?p=1` | |
| `Show references` | Every article, after `Print` | No count badge, no chevron |
| `Show more products from Mayo Clinic` | In-article Products & Services | |
| `Show more products and services from Mayo Clinic` | Page-foot Products & Services | **Different string, same action** |
| `Show more related content` / `Show more associated procedures` | Related modules | |
| `Check symptoms` | D&C hub, Symptom Checker card | |
| `Check on one or more symptoms to find causes.` | Symptoms hub, same card | Card body, not the CTA |
| `Search clinical trials` / `Find active clinical trials` | D&C hub / T&P hub | Two labels, one destination type |
| `Find a support group` | D&C hub | |
| `Start Here` | Anxiety D&T, Care at Mayo Clinic card | Title case, vague |
| `Click here for an email preview.` | Newsletter module | **`click here` antipattern**; ships with and without the period |
| `Subscribe!` | Newsletter submit | The only exclamation mark in a form control |
| `See more discussions` | Chest pain, Mayo Clinic Connect module | |
| `Give Today` | Promo band | **Rendered twice, identically, in one card** |
| `Give Now` / `Donate` / `Make a Donation` / `Contact Us to Give` | Mega-menu, drawer | **Four strings for one action** |
| `Sign up for free e-newsletters` | Footer | |
| `Find phone numbers for a location near you` | /appointments | Fully specific |

**Observation.** Mayo has **four casings of "request an appointment"** and **four different labels for "donate"**, several of which co-occur on a single page. For an organisation with a published style guide that "generally follow[s] Associated Press style", the CTA layer is the least governed part of the content system — probably because CTAs live in components owned by different teams while article copy passes through a single editorial pipeline.

`Click here for an email preview.` is the worst string on the site: a `click here` link, inside a data-collection module, on pages read by people with low health literacy.

## T4 Onboarding & getting-started

There is no product onboarding — the equivalent is **care access**, and it lives at `/appointments` `[observed]`.

> H1: `Start your appointment request here.`
> Sub-line: `This is the easiest way to reach us.`

An H1 with a terminal full stop, phrased as an instruction with a deictic (`here`), followed by a reassurance about effort. For an institution people travel across continents to reach, `This is the easiest way to reach us.` is doing real work — it pre-empts the belief that the phone is the serious route.

**Three audience doors, each a noun phrase plus a one-line job** `[observed]`:

- `New Patients` — "Provide your info and set a follow-up time."
- `Returning patients` — "Request using your patient info."
- `Referring physicians` — "Get consults and refer your patients."

(`Patients` capitalised in the first, lowercase in the second — a live inconsistency in adjacent cards.)

Then three support doors, each with a longer blurb: `Appointment FAQs`, `Insurance resources`, `International patient resources`. And two section headings that name the user's likely reluctance: `Still want to schedule by phone?` and `Questions about appointments?`

**The emergency routing on this page is the clearest on the site** `[observed]`, rendered as plain bullets with no icon and no box:

> `If this is a medical emergency, call 911.`
> `If this is a mental health emergency, call or text 988 to talk to a counselor.`

Followed by: "If you are located outside of the United States, please visit findahelpline.com."

Two things. Mental-health emergency is given **equal billing and its own number**, not folded into "medical emergency" — and the 988 line specifies both channels (`call or text`), which matters for a user who cannot speak. And the international fallback is named, because an appointment-request page at Mayo receives non-US traffic.

## T5 Form & field labels

Thin. The only public form is the newsletter module, which appears mid-article on every D&C page `[observed]`:

| Label | Note |
|---|---|
| `Email` | |
| `Address 1` | **An address line inside a newsletter signup.** Almost certainly a honeypot, but it is exposed in the accessibility tree and will be announced and focusable |
| `Subscribe!` | Submit |

The `Address 1` field is a real accessibility defect: a bot-trap that is invisible to sighted users but present for screen-reader and keyboard users, who will encounter an unexplained address field in an email form and may fill it, failing the submission silently.

`[absent]`: the Symptom Checker's own inputs, the appointment-request form fields, validation copy, placeholders. All behind interactions not exercised.

## T6 Status & state language

Not applicable in the transactional sense — Mayo's health library has no object with states. `[absent]`

Two adjacent things were observed:

**Content-freshness state**, exposed as a bare date with no label (see T11). The absence of a `Last updated` prefix means the date is unlabelled and its meaning must be inferred.

**Translation-availability state**, and it is broken `[observed]`. Some article templates emit, at the very top:

> `This content does not have an English version.`
> `This content does not have an Arabic version.`

These appear on the **English** pages for migraine, anxiety, type 2 diabetes, chest pain and Tests & Procedures, where the first is self-evidently false. A content-negotiation fallback leaking its unsatisfied branches to every user. It is the most visible bug in the harvest: the first line of text on a clinical article tells the reader the article does not exist in the language they are reading it in.

## T7 Error, failure & recovery

`[absent]` for interaction errors — no forms exercised, no error states reachable.

**One routing failure was found and it is a content-integrity issue** `[observed]`: the URL `/symptoms/chest-pain/…/sym-20050846` **301-redirects to Cough**. Mayo's routing resolves on the `sym-` ID and ignores the slug; `sym-20050846` *is* Cough. Confirmed on two different path variants.

Compounding it: **chest pain does not appear in the Symptoms A–Z index at all.** The `C` section contains only `Clots, blood` / `Cold hands` / `Cough` / `Coughing up blood`. Chest pain exists solely as a Diseases & Conditions topic.

This matters more than a routing bug normally would. Chest pain is the presenting *symptom* in the single most time-critical scenario the site covers. A user who arrives at the Symptoms index — the hub explicitly designed for people who do not yet have a diagnosis — and looks under C for chest pain will not find it. The taxonomy has filed the most urgent symptom under diagnoses.

**Corrections policy** `[documented]`: corrections involving misstatements of fact are listed publicly for 30 days. A published corrections practice is the right analogue of error recovery for a publisher, and Mayo has one.

## T8 Empty states

`[observed]` — the best empty-state practice on the site is in the Tests & Procedures letter nav, where disabled letters carry the accessible label **`No procedures begin with the letter Q`**. That is a zero-result state written as a full sentence, attached to the control that would produce it, before the user activates it.

Compare the Diseases & Conditions index, which handles the same case by **omitting `Q` entirely** with no disabled state, and the Symptoms hub, which renders O/Q/X/Z as inert letters with no explanation. Three patterns, one of them good.

`[absent]`: search no-results, Symptom Checker no-match. Not reachable.

## T9 Notifications & system messages

The only recurring system message is the newsletter module, injected **mid-article** on every D&C page — between `Symptoms` and `Causes` `[observed]`:

> Heading: `From Mayo Clinic to your inbox`
> Body: "Sign up for free and stay up to date on research advancements, health tips, current health topics, and expertise on managing health."

Note the placement. On an anxiety article, the email-capture module sits directly after the escalation block that routes to a suicide-crisis line. On the Cough (Symptoms) template it is placed **after the references** instead — so Mayo has two placements for the same component and the more intrusive one is on the more sensitive template.

**Promo band on every page** `[observed]`: `Fuel groundbreaking medical research!` / "Your donation powers the future of medicine and helps save lives." / `Give Today` (twice). An exclamation mark and a fundraising ask, appended to clinical articles.

**Per-slot advertising disclaimer** `[observed]`, adjacent to every ad: `Advertisement` as a bare label, then:

> `Mayo Clinic does not endorse companies or products. Advertising revenue supports our not-for-profit mission.`

Two sentences: the disclaimer, then the justification. Stating *why* a non-profit carries ads, in the same breath as disclaiming them, is the right structure — it pre-empts the reader's objection rather than ignoring it.

## T10 Disclosures, legal & compliance

**The strongest emergency copy on the entire site is in the Terms, in all-caps** `[observed]`:

> `IF YOU HAVE OR SUSPECT THAT YOU HAVE A MEDICAL PROBLEM OR CONDITION, PLEASE CONTACT A QUALIFIED HEALTH CARE PROFESSIONAL IMMEDIATELY. IF YOU ARE IN THE UNITED STATES AND ARE EXPERIENCING A MEDICAL EMERGENCY, PLEASE CALL 911 OR CALL FOR EMERGENCY MEDICAL HELP ON THE NEAREST TELEPHONE.`

Under the only all-caps heading on the page, `NOT MEDICAL ADVICE`. Preceded by: "Nothing in the content, products or services should be considered, or used as a substitute for, medical advice, diagnosis, or treatment."

**This is a content-design finding, not a compliance one.** The most forceful, most explicit, most unambiguous emergency instruction Mayo publishes is buried in a terms-of-use page that nobody reads, in a typographic treatment (all-caps) that is *harder* to read, while the clinical articles — which millions of frightened people actually read — carry escalation guidance in plain unemphasised body text. The legal artefact and the usable artefact have been optimised in opposite directions.

**Newsletter data-use notice** `[observed]`, identical on every article, under the heading `Learn more about Mayo Clinic's use of data.`:

> "We use the data you provide to deliver you the content you requested. To provide you with the most relevant and helpful information, we may combine your email and website data with other information we have about you. If you are a Mayo Clinic patient, we will only use your protected health information as outlined in our Notice of Privacy Practices. You may opt out of email communications at any time by clicking on the unsubscribe link in the email."

Four sentences: purpose → combination disclosure → **the PHI carve-out** → opt-out. The third sentence is the interesting one. Mayo is a covered entity *and* a publisher, so a single email address can be both marketing data and PHI depending on who owns it. The notice names that fork in one sentence and routes the PHI case to the NPP. That is a genuinely hard dual-status problem handled in twenty-eight words.

**HIPAA as a word is `[absent]`** across every page fetched. It surfaces only as `Notice of Privacy Practices` in the footer — a link to a **PDF**, not a web page. Same for `Notice of Nondiscrimination` (PDF). No inline Section 1557 language, no language-assistance taglines in HTML.

For a covered entity, publishing both mandatory notices only as PDFs is a meaningful accessibility and findability gap: PDFs are harder for screen readers, harder to translate, and invisible to on-site search.

**Advertising separation policy** `[observed]`, summarised with key quotes: Mayo accepts advertising under "strict guidelines" to fund its mission and reserves the right to refuse. Two quotable lines:

> `We will refuse any advertisement that we believe is incompatible with our mission.`
> `Mayo Clinic maintains a distinct separation between advertising content and editorial content.`

The policy states that all ad content is "clearly labeled as an advertisement", that contextual placement adjacent to related content is permitted using **non-personal data only**, and that advertisers "have agreed that they will not collect any personally identifiable information from our site visitors while they are on Mayo Clinic's health information website."

That last commitment is unusually specific and unusually strong for a publisher — it is a contractual undertaking on behalf of third parties, stated to the reader.

**Terms — other notable provisions** `[observed]`: site intended for 18+; patient portal 18+, or 13–17 with guardian permission; Minnesota law, "The exclusive forum for actions between the parties is the District Court of Minnesota sitting in Olmsted County, Minnesota."; dateline `Updated April 12, 2024`.

**Anti-automation clause, flagged for corpus governance** `[observed]`. The Terms list under prohibited uses: "Use any scraper, crawler, spider, robot, or other automated means of any kind to access or copy data on the Site, deep-link to any feature or content on the Site, or bypass our robot exclusion headers…". This harvest used ordinary page fetches of publicly-indexed pages and quotes only short strings under fair-use analysis norms, but the clause is recorded here so the corpus owner can make an informed decision about redistribution. **This is a flag for a human, not a conclusion.**

**Copyright** `[observed]`: `© 1998-2026 Mayo Foundation for Medical Education and Research (MFMER). All rights reserved.`

## T11 Help-centre architecture — the article templates

**This is the priority section for this file.** Mayo runs **two** distinct article templates, and the difference between them is the most useful artefact in the harvest.

### Template A — Diseases & Conditions (four tabs, two pages)

**Tab 1, `Symptoms & causes`** — evidenced on migraine, anxiety, type 2 diabetes and chest pain:

| # | Heading | Level | Constant? |
|---|---|---|---|
| 1 | `Overview` | H2 | **always** |
| 2 | `Products & Services` | H3, inside Overview | always |
| 3 | `Symptoms` | H2 | **always** |
| — | *topic-specific sub-headings* | H3 | varies |
| 4 | **`When to see a doctor`** | **H3, nested under Symptoms** | **always** |
| 5 | `From Mayo Clinic to your inbox` | H2 | always (newsletter, injected) |
| 6 | `Causes` | H2 | **always** |
| — | *topic-specific sub-headings* | H3 | varies |
| 7 | `Risk factors` | H2 | **optional** |
| 8 | `Complications` | H2 | **optional** |
| 9 | `Prevention` | H2 | **optional** |
| — | byline, date, `Print`, `Show references` | | always |

**The spine is `Overview` → `Symptoms` → `When to see a doctor` → `Causes`.** Those four are present on every D&C article observed. `Risk factors`, `Complications` and `Prevention` are modular — chest pain ships none of the three; migraine ships all three but no `Prevention` on the Symptoms tab (it lives under Diagnosis & treatment instead).

The sequencing is the design decision worth naming. **`When to see a doctor` sits inside `Symptoms`, before `Causes`.** A frightened person reading about their symptom gets the escalation guidance *before* the mechanism, not after. Mayo has correctly judged that "is this an emergency" outranks "why is this happening", and encoded that judgement in the heading hierarchy rather than leaving it to the writer.

Topic-specific H3s under `Symptoms` and `Causes` do substantial work. Migraine's are a **temporal phase model** — `Prodrome` · `Aura` · `Attack` · `Postdrome` — which turns an unpredictable experience into a sequence the reader can locate themselves in. Chest pain's are a **differential by origin** — `Heart-related chest pain` · `Other types of chest pain`, then under Causes: `Heart and blood vessel causes` · `Digestive causes` · `Lung-related causes` · `Muscle and bone causes` · `Other causes`. Type 2 diabetes's are **mechanism explainers**: `How insulin works` · `The role of glucose`.

Same template, three completely different organising logics inside it. The template constrains the spine and frees the interior.

**Tab 2, `Diagnosis & treatment`** — evidenced on anxiety and migraine:

`Diagnosis` → [`Care at Mayo Clinic` H3 card] → `Treatment` → *(topic-specific H3s — anxiety: `Psychotherapy`, `Medications`)* → `More Information` → `From Mayo Clinic to your inbox` → `Clinical trials` → `Lifestyle and home remedies` → `Alternative medicine` → `Coping and support` → **`Preparing for your appointment`** → `What you can do` (H3) → `What to expect from your doctor` (H3)

The closing three sections are the signature and they are unusual. Having explained the condition and its treatment, Mayo ends by **preparing the reader for a conversation**:

- `What you can do` — lead-in "Some basic questions to ask your doctor include:" then a list of questions the *patient* should ask, closing with "Don't hesitate to ask other questions during your appointment."
- `What to expect from your doctor` — lead-in "Your doctor will likely ask you several questions, such as:" then a list of questions the *clinician* will ask, closing with "Preparing and anticipating questions will help you make the most of your time."

Sample patient questions `[observed]`, anxiety: `What's the most likely cause of my anxiety?` · `Do I need any tests?` · `Should I see a psychiatrist, psychologist or other mental health provider?` · `Would medication help? If so, is there a generic alternative to the medicine you're prescribing?` · `Do you have any educational materials that I can have? What websites do you recommend?`

Sample clinician questions: `Have you ever had a panic attack?` · `When did you first begin noticing your feelings of anxiety?` · `Do you take any prescription drugs?`

**Rehearsing both sides of the consultation is the most transferable pattern in this file.** The asymmetry of a medical appointment — one party has all the vocabulary and seven minutes, the other is frightened and has never done this before — is a content problem, and Mayo solves it by giving the patient a script and a forecast. The generic-alternative question is notable: Mayo prompts the patient to raise cost, which the clinician may not.

Article `From Mayo Clinic to your inbox` sits mid-page on this tab too, between `More Information` and `Clinical trials`.

### Template B — Symptoms (single page, no tabs)

Evidenced on Cough:

`Definition` → `Causes` → *(topic-specific H3s)* → **`When to see a doctor` (H2)** → `Self-care measures` (H3) → `From Mayo Clinic to your inbox`

**Seven differences from Template A**, all `[observed]`:

1. **No tab bar.** Everything is one page.
2. Opening section is **`Definition`**, not `Overview`.
3. **`When to see a doctor` is promoted to H2** — a peer of `Causes`, not a child of `Symptoms`.
4. Adds **`Self-care measures`**, which has no D&C equivalent on the Symptoms & causes tab.
5. Drops `Risk factors`, `Complications`, `Prevention`, `Products & Services`.
6. **Byline and date sit at the top**, under the H1. On D&C they sit at the bottom.
7. Adds a **warning-icon callout** between Causes and When to see a doctor (see T14).

The logic behind the differences is sound and worth extracting. A symptom article serves someone **without a diagnosis**. They cannot be given risk factors or prevention (for what?), and they need two things the diagnosed reader does not: permission to manage it themselves (`Self-care measures`) and a more prominent escalation block. Hence the H2 promotion.

Putting the byline at the **top** on the Symptoms template is the other deliberate choice. The undiagnosed reader is the one most likely to be triaging sources — "who is telling me this?" is their first question, so the attribution is answered before the content.

### Escalation design — the highest-value artefact

The heading string is **invariably `When to see a doctor`** across all five articles, regardless of what the body actually says. Structure below it varies enormously:

| Article | Heading level | Tiers | Structure | Lead-in(s), verbatim |
|---|---|---|---|---|
| **Migraine** | H3 | **2** | Prose para, then bolded lead-in + bullets | tier 1 prose; tier 2 **`See your healthcare professional right away or go to the emergency room`** |
| **Cough** | **H2** | **2** | Two plain lead-ins, each with its own bullet list | `Call your healthcare professional if your cough — or your child's cough — doesn't go away after a few weeks or if it also involves:` / `Seek emergency care if you or your child is:` |
| **Chest pain** | H3 | 1 | **Prose, no bullets, emergency-first** | `If you have new or unexplained chest pain or think you're having a heart attack, call 911 or emergency medical help right away.` |
| **Anxiety** | H3 | 1 | One bullet list; crisis line inside the last bullet | `See your doctor if:` |
| **Type 2 diabetes** | H3 | **0** | **One sentence, no list** | *(the whole section:)* `See your healthcare professional if you have any symptoms of type 2 diabetes.` |

**The migraine article is the best of the five and the closest thing to a house standard.** Its tier 1 is calm and behavioural: "keep a record of your attacks and how you treated them. Then make an appointment…". It then adds a change-detection trigger ("see your healthcare professional if the pattern changes or your headaches suddenly feel different") before escalating. The tier-2 lead-in is **the only bolded escalation lead-in observed anywhere on the site** — `See your healthcare professional right away or go to the emergency room` — and it is immediately followed by a sentence that explains *why* without alarming: "They could be caused by a more serious medical issue."

That construction — **bold instruction, then a calm justification, then the list** — is the pattern to reuse. It gives the reader a reason to comply without telling them what they might have.

**Chest pain is emergency-first and prose-only.** The section opens with `call 911` in the first sentence, then: `Never ignore the symptoms of a heart attack.` The 911 instruction also appears **in the Overview**, so it is stated twice on the page. That duplication is correct for the topic — the reader may not scroll.

**Type 2 diabetes is the weakest.** A single unbulleted sentence, for a condition with well-known acute complications.

**Cross-article findings on escalation design:**

- **The heading string never changes**, even where the body says `healthcare professional`, `911`, or `emergency room`. `When to see a doctor` is a frozen string that no longer matches the terminology migration happening beneath it (see T13).
- **Heading level is inconsistent** — H3 in D&C, H2 in Symptoms.
- **There is no dedicated visual treatment for escalation anywhere.** No red box, no alert icon, no border, no colour. The only icon-bearing callout observed on any article is Cough's diagnostic caveat — which is *not* an escalation block. Migraine's bold lead-in is the single instance of typographic emphasis, and it is not used on chest pain, the most time-critical topic.
- **Tiering ranges from 0 to 2** with no apparent rule tied to clinical urgency: cough gets two tiers, chest pain gets one.
- **Only chest pain says `call 911`.** Cough says `Seek emergency care` with no number. Anxiety routes to 988 via link text only.

For a site that is the world's most-read consumer health publisher, escalation guidance is the least systematised part of the template. The spine is rigorously consistent; the one section where inconsistency is most consequential is not.

### The one visually emphasised callout on any article `[observed]`

Cough, between Causes and When to see a doctor, with a warning icon (`icons/warn.svg`), body in **bold**:

> `Causes shown here are commonly associated with this symptom. Work with your doctor or other health care professional for an accurate diagnosis.`

This is an **anti-self-diagnosis guard**, placed at exactly the point of maximum risk: immediately after a list of possible causes, on a page reached by someone with no diagnosis. Mayo has identified that the dangerous moment is not reading about a symptom, it is *concluding* from the list — and has put the only alert-styled content on the site there.

Two sentences: what the list is (`commonly associated`, not exhaustive, not diagnostic), and what to do instead. It is the single best piece of micro-content in this file.

(Defect: this line uses the spaced `health care professional` while the escalation lead-in two paragraphs below uses closed `healthcare professional` — in the same article.)

## T12 FAQs

**`[absent]` as an article pattern.** No FAQ block appears on any condition or symptom article, or on any hub. No question-formatted H2/H3, no accordion, no Q&A schema.

This is a deliberate and notable divergence from Cleveland Clinic (115), which embeds question-form headings throughout its article bodies. Mayo's headings are **clinical categories**; Cleveland's are **patient questions**. Two academic medical centres, same content domain, opposite heading grammar.

`FAQ` appears only as navigation: `Appointment FAQs` on `/appointments` ("Find answers to questions about our appointment process, scheduling, referrals, traveling to Mayo Clinic and more.") and `Frequently Asked Questions` in the Giving mega-menu.

The nearest in-article Q&A is `Preparing for your appointment`, where the questions are **for the user to ask and to expect**, not for the article to answer. That is a different and arguably better instrument (see T11).

**Related-content link titles do carry question form** `[observed]`, migraine: `Migraines and gastrointestinal problems: Is there a link?` · `Migraines: Are they triggered by weather changes?` · `Ocular migraine: When to seek help` · `Migraine medications and antidepressants: A risky mix?` · `Migraine treatment: Can antidepressants help?`

These are `expert-answers/…faq-…` URLs — so Mayo *does* run a Q&A content type, as **separate articles linked from the parent**, rather than as sections inside it. The grammar is consistent: `Topic: Question?` — colon-separated, topic first for scannability, question second.

## T13 Terminology & glossary

### `healthcare professional` over `doctor` — a migration visibly mid-flight

| Vintage | Preferred term | Evidence |
|---|---|---|
| **Refreshed (2024–25)** | `healthcare professional` (closed) | Type 2 diabetes: "See your **healthcare professional** if you have any symptoms" — the word `doctor` appears **nowhere in the body**, only in the frozen heading. Cough: "Call your **healthcare professional**…". Migraine: "make an appointment with your **healthcare professional**" |
| **Older (anxiety, expert-reviewed 2023)** | `doctor` and `provider` | "See your **doctor** if:" · "See your **doctor** or a mental health **provider**" · "your primary care **provider**" |
| **Legal** | `health care provider`, `QUALIFIED HEALTH CARE PROFESSIONAL` | Terms page — a third register |

Conclusion that can be relied on: **`healthcare professional` (closed compound) is the current preferred term in refreshed content; `doctor` survives only in the frozen heading `When to see a doctor` and in unrefreshed articles; `provider` persists in mental-health and legal contexts.**

The closed/open compound is not yet settled either — Cough uses `health care professional` and `healthcare professional` in the same article, two paragraphs apart.

**Why the migration matters for content designers:** `doctor` excludes nurse practitioners, physician associates, pharmacists and specialist nurses, who deliver a large share of first-contact care. `healthcare professional` is accurate. But the heading — the most-read string in the whole template — has not moved, so every refreshed article now contains a heading that contradicts its own body. That is the cost of migrating body copy without migrating the template.

### `called X` glossing — the house pattern in refreshed content `[observed]`

Plain word first, technical term second, introduced by `called`:

`narrowed blood vessels, **called** atherosclerosis` · `This condition is **called** neuropathy` · `mechanical filtering of the kidneys, **called** dialysis` · `This surgery is **called** amputation` · `a blood clot in the lung, **called** a pulmonary embolism` · `Irritation of the thin layers of tissue that separate your lungs from your chest wall, **called** pleurisy`

The ordering is the point. `atherosclerosis (narrowed blood vessels)` forces the reader through the hard word to reach the meaning; `narrowed blood vessels, called atherosclerosis` gives them the meaning first and the label second — so they can stop reading after the comma and still have understood the sentence.

Older content does the reverse, with parentheticals and even a pronunciation respelling: `Agoraphobia (ag-uh-ruh-FOE-be-uh)`.

### Other evidenced preferences

- **Person-first and assigned-at-birth language** in refreshed content: `people assigned male at birth`, `For people assigned female at birth` (type 2 diabetes, Risk factors) — no `men`/`women` in that section.
- **`medicines` over `medications`** in refreshed content; anxiety uses `medications` throughout.
- **`buy off the shelf` / `buy without a prescription`** instead of *over-the-counter* (Cough). The abbreviation `OTC` does not appear.
- **Pronoun staleness**: anxiety uses `he or she` twice; refreshed articles use second person only.
- **Ampersands in nav and tab labels, spelled-out `and` in prose and policy titles**: `Diseases & Conditions` / `Symptoms & causes` / `Diagnosis & treatment` in chrome; `Tests and Procedures` as an H1; `Advertising and Sponsorship Policy` as a page title but `Advertising & Sponsorship Policy` as its own footer link.
- **AP date style**, confirmed against the documented rule: months over five letters abbreviated with a period (`Dec.`, `Feb.`, `Nov.`, `Oct.`), March–July spelled out (`July 29, 2025`, `July 08, 2025`).
- **`migraine` vs `migraine headache`**: the article H1 and page title are `Migraine`, and the body uses `migraine` throughout — but the **URL slug retains the legacy `/migraine-headache/`**. The Symptoms A–Z index lists `Headache` as canonical with `Headaches / See: / Headache`; migraine is not in the Symptoms index at all.

## T14 Voice, tone & accessibility

### Person, tense and mood

**Second person throughout clinical content**: "See your healthcare professional if you have any symptoms", "If you have new or unexplained chest pain".

**First-person plural only in institutional voice**, never in clinical content: "We write to inform, educate and empower you", "We want to hear from you", "Mayo Clinic does not endorse companies or products".

**A visible voice shift between vintages** `[observed]`: refreshed content uses third-person impersonal for physiology even while addressing the reader in escalation copy — "Type 2 diabetes happens when **the body** cannot use insulin correctly"; "can damage **the eyes, kidneys, nerves and heart**" (note `the eyes`, not `your eyes`). Anxiety, older, is `your` throughout.

That shift is defensible and probably deliberate: describing organ damage as happening to `the eyes` rather than `your eyes` puts a small distance between the reader and the harm, at the exact point where second person would be frightening. The escalation copy then snaps back to `you`, where urgency is wanted. **Person used as a distance control, varied within one article by section function.**

**Imperative for advice, with the verb bolded as the bullet lead** `[observed]` — the signature Mayo list pattern:

`Get help early.` · `Stay active.` · `Eat healthy foods.` · `Lose weight.` · `Don't sit for long.` · `Drink fluids.` · `Keep the air moist.` · `Stay away from tobacco smoke.` · `Suck on cough drops or hard candies.` · `Think about taking honey.`

Bolded imperative, full stop, then explanatory sentences. Used for Risk factors, Complications, Prevention, Lifestyle and home remedies, Coping and support.

**Critically, it is NOT used for the escalation lists under `When to see a doctor`** — those bullets are plain. The one place bold would aid scanning under stress is the one place Mayo does not use it (except migraine's lead-in).

### Register

Plain, calm, unhedged, non-alarmist. Reassurance early and explicit. No exclamation marks anywhere in clinical copy — the only ones on the site are in promo furniture (`Fuel groundbreaking medical research!`) and a form control (`Subscribe!`).

**Sentence length.** Short declaratives, one idea per sentence:

- `There's no cure for type 2 diabetes.` — 6 words
- `Chest pain may be sharp or dull.` — 7 words
- `Being overweight and not moving enough are key factors.` — 9 words
- `Whatever form of anxiety you have, treatment can help.` — 9 words
- `A cough once in a while is common and healthy.` — 10 words

**Reading level is a documented target, not a measured claim** `[documented]`, /health-information-policy: `We aim for a reading level between 6th and 8th grade.`

### Medical review and attribution

**Byline is institutional, never individual** `[observed]`: `By Mayo Clinic Staff`, hyperlinked to `Meet our medical editors`. **No "Medically reviewed by [name]" string exists anywhere.** Placement: bottom on D&C articles, **top** on the Symptoms template.

This is a deliberate policy, and it is stated `[documented]`: editorial staff "do not receive bylines" because the process is multi-disciplinary. Mayo is asserting that the institution, not an individual, is the warrant. That is a defensible position for an academic medical centre and a weaker one for trust signalling — compare Cleveland Clinic's explicit `Medically Reviewed` stamp (115).

**Date stamp is a bare unlabelled line** `[observed]`: `July 08, 2025` (migraine), `July 29, 2025` (anxiety), `Feb. 27, 2025` (type 2 diabetes), `Dec. 11, 2024` (cough), `Dec. 10, 2024` (chest pain). No `Last updated` prefix, no label at all. Machine-readable counterpart in `meta-PublishDate`.

An unlabelled date is ambiguous — the reader cannot tell whether it is publication, last review or last edit. For content whose credibility depends on currency, a two-word label would cost nothing.

**`Show references`** `[observed]` — plain disclosure link, no count badge, sitting after `Print`. Typical load **12–19 references**; migraine carries 19. Style is Vancouver-ish with an explicit `Accessed [date].` on every web source.

**The `Medical review (expert opinion)` reference line is the real review stamp** `[observed]`, appearing as the last numbered reference:

- Migraine, ref 19: `Medical review (expert opinion). Mayo Clinic. April 15, 2025.`
- Cough, ref 15: `Medical review (expert opinion). Mayo Clinic. Nov. 11, 2024.`
- Chest pain, ref 10: `Medical review (expert opinion). Mayo Clinic. Oct. 1, 2024.`
- Anxiety, ref 14: `Medical **reviewer** (expert opinion). Mayo Clinic. Feb. 27, 2023.` ← **`reviewer`, not `review`** — a genuine string inconsistency between vintages
- Type 2 diabetes: **no expert-opinion line at all**; its Mayo-internal source is `AskMayoExpert. Type 2 diabetes mellitus. Mayo Clinic; 2023.`

So the clinical-review event is disclosed — but **inside a collapsed reference list**, as citation #19 of 19, in citation format. The fact a reader most wants (a Mayo clinician reviewed this, on this date) is the hardest fact on the page to reach.

**And it exposes a staleness signal** `[observed]`: anxiety's expert review is dated Feb. 27 2023 while its page date-stamp reads July 29 2025, with most references `Accessed Jan. 27, 2023`. The visible date implies currency the review date does not support.

**`Meet our medical editors` is a directory, not a process page** `[observed]` — correcting a natural assumption. Its entire structure is: H1 → `Chief medical editor` (one name, Sandhya Pruthi, M.D.) → `Specialty medical editors` (~48 specialty H3s, alphabetical, each with linked names and post-nominals). No prose about how review works.

Specialty H3 casing is inconsistent (`Infectious disease` vs `Emergency Medicine`; `Integrative health` vs `Medical Genetics`), one carries a stray space (`Allergy /Asthma`), and several editors are listed as **plain unlinked text** while their peers are linked — a mixed link/no-link state within one list.

**The editorial process actually lives at `/about-this-site/health-information-policy`** `[documented]`. Headings: `Our team` → `Medical editors` / `Editorial and operations staff` → `Health information process` → `New topics` / `Updates` → `Editorial research`, `Writing and editing`, `Medical review`, `Annotation`, `Visual content creation`, `Content translations` → `External links and social media`, `Artificial intelligence`, `Corrections`, `Accreditations and awards`, `Contact us`.

Substance, summarised: >5,000 physicians and scientists, >100 serving as medical editors; editors review in their specialty and **must disclose financial interests, with disclosure statements appearing with the content**; editorial staff hold communications/journalism degrees, senior staff a 7-year minimum; the pipeline is named as editorial research → writing and editing → medical review → copy editing → annotation → visual content creation → publishing. **Faster-evolving topics are reviewed at least every two years**; all content is checked annually for accuracy, redundancy and engagement; stale or low-engagement content may be archived. A research-librarian team (advanced library-science degrees, 2-year minimum) supports evidence selection ranked by source strength. Translations (Arabic, Simplified Chinese, Spanish) are done by in-house content linguists. **AI is disclosed** as used for plain-language support, inclusive word/image choice, search optimisation and terminology alignment, with human oversight retained. Corrections involving misstatements of fact are listed publicly for 30 days.

Quotable principles from that page `[observed]`: `Accurate and actionable.` · `Easily understood.` · `Inclusive and diverse.` · `Evidence based.` · `Plain language. Text is written to be understood the first time it's read.` · `We aim for a reading level between 6th and 8th grade.` · `We generally follow Associated Press style.` · `We use a conversational writing style that is both authoritative and compassionate.` · `AI tools do not replace editorial judgment or oversight.` · `We list our sources at the end of articles.`

**`Text is written to be understood the first time it's read.`** is the best statement of editorial intent in the corpus. It converts "plain language" from a vague aspiration into a testable criterion.

**But note the disclosure asymmetry.** All of this — the two-year review cycle, the financial-interest disclosure, the librarian team, the AI policy — lives on a policy page reachable only from the footer. The article itself surfaces `By Mayo Clinic Staff` and a bare date. The governance is excellent; its visibility at the point of reading is not.

### Digital Accessibility Statement — thin

`[observed]`, complete inventory of the page:

- H1: `Digital Accessibility Statement`
- Bolded lede: `Mayo Clinic is dedicated to making our digital content accessible to all.`
- Conformance claim: `In the spirit of this commitment, we have ongoing efforts to meet WCAG version 2.1 level AA criteria.`
- Support routing: `If you need any patient portal assistance, please contact Mayo Clinic Customer Assistance at 877-858-0398.` with hours
- Fallback: `If you need additional assistance regarding another topic, please contact us.`

**No H2s. No sub-structure. That is the whole page.**

| Element | Present? |
|---|---|
| WCAG standard named | Yes — 2.1 AA, but framed as `ongoing efforts to meet`, not conformance |
| Section 508 | **NOT FOUND** |
| ADA | **NOT FOUND** |
| Rehabilitation Act / Section 504 | **NOT FOUND** |
| Accessibility-specific feedback channel | **NOT FOUND** — the only phone number is scoped to *patient portal* assistance |
| Named accessibility contact or coordinator | **NOT FOUND** |
| Formal complaint / grievance procedure | **NOT FOUND** |
| Alternative-format offer | **NOT FOUND** |
| Assistive-technology tested-with list | **NOT FOUND** |
| Conformance date / audit / VPAT | **NOT FOUND** |
| Known-exceptions list | **NOT FOUND** |
| Last-reviewed date | **NOT FOUND** |

**This is among the thinnest accessibility statements a major health publisher runs.** Compare Doctolib (113), which names WCAG 2.1 AA *and* EN 301 549, names a legal deadline, names an external auditor, and admits current defects. Compare Peloton (111), which at least publishes a dedicated accessibility email.

Mayo names a standard and provides no route to report a failure against it. A blind user who cannot use a condition article has one option: a phone line for the patient portal.

For a US healthcare provider with ADA and Section 1557 obligations, the absence of any reference to either framework is the notable finding — not because the statement must cite law, but because the omission signals the statement was written as marketing rather than as a compliance artefact.

**Accessibility affordances that *do* exist, elsewhere** `[observed]`: `Skip to content` on every page **except `/appointments`**; `Skip this Section` on the A–Z index (bypassing a 26-link facet — genuinely thoughtful); descriptive letter-link labels on Tests & Procedures; a four-language footer switcher.

### Alt text — weak, and inconsistent within one component

`[observed]`:

- Logo alt differs by page: `Mayo Clinic` on most, `Mayo Clinic Home Page` on the anxiety D&T page.
- Mega-menu promo images duplicate the adjacent link text exactly — `Patient &amp; Visitor Guide`, `Continuing Medical Education`, `Make a Donation` — a redundant-link-plus-image pattern that double-announces, **with the raw `&amp;` entity leaking into the alt attribute**.
- The *same component* ships **empty alt** on the anxiety D&T page — correct decorative treatment. One component, two behaviours, depending on template.
- The Cough warning icon is `![ ]` — **alt is a single space character**, a known antipattern.
- Featured-topic images on Tests & Procedures carry empty alt on content-adjacent imagery.
- `meta-twitter:image:alt: MayoClinic.org` — not useful alt text.
- Correct: `![](…giving-charity.svg)` empty alt on a decorative icon; store badges adequately labelled.

### Language switcher and a live content-negotiation bug

Footer, every page, labelled `Language:English` (no space after the colon), then `English` · `Español` · `العربية` · `简体中文`. **The switcher block is duplicated** — it appears twice in the footer, identically.

And the bug already noted in T6: `This content does not have an English version.` / `This content does not have an Arabic version.` emitted at the top of English article templates. Recorded here because it is an accessibility issue as well as a content one — it is the first thing a screen reader announces on the page.

### Other live defects recorded

- Title tag `Tests and Procedures - Tests and Procedures - Mayo Clinic` — duplicated segment
- `meta-application-name: &nbsp;` — a non-breaking space as the app name, on nearly every page
- Footer nav lists `Medical Professionals`, `Businesses` and `Students` each rendered **twice**, with the Students list in a different order the second time
- `Manage Cookies` links to the site root, not a consent manager
- Two identical `Give Today` links in one promo card
- `More Information` renders twice consecutively on the anxiety D&T page
- Title-case/sentence-case split between footer links and the About-this-Site page links to the *same* pages
- `Health information policy` listed twice on `/about-this-site`, under two different H2 groups

---

## Transferable patterns

1. **Index the same knowledge three ways, by the user's entry state.** Symptoms (no diagnosis) / Diseases & Conditions (has a diagnosis) / Tests & Procedures (facing an intervention) are three routes into one body of fact, each with its own template and register. The organising question is not "what is this content about" but "what does the person who needs it already know". Transfers to any domain where users arrive at different stages of understanding — disputes, tax, immigration, benefits.
2. **Put escalation before mechanism.** `When to see a doctor` sits inside `Symptoms`, before `Causes`. Answer "is this urgent" before "why is this happening", and encode it in the template so no writer has to decide. Applies to incident comms, fraud alerts, outage pages, safety warnings.
3. **`Easy-to-understand answers` as the hub promise.** When the user's obstacle is comprehension rather than trust, promise comprehensibility, not authority. And `answers`, not `information`.
4. **Publish the template as the tagline.** `What it is, how it's done, how to prepare, risks and results.` tells the user the shape of what they'll get — including the uncomfortable part — before they open anything.
5. **Gloss with `called X`, plain word first.** `narrowed blood vessels, called atherosclerosis` beats `atherosclerosis (narrowed blood vessels)`: the reader can stop at the comma and still understand.
6. **Rehearse both sides of a high-stakes conversation.** `What you can do` (questions to ask) plus `What to expect from your doctor` (questions you'll be asked). Closes the asymmetry between an expert with seven minutes and a frightened novice. Directly transferable to any adversarial or intimidating interaction — a dispute call, a compliance interview, a benefits assessment.
7. **Guard against self-diagnosis at the point of listing.** The warning callout — "Causes shown here are commonly associated with this symptom. Work with your doctor… for an accurate diagnosis." — is placed immediately after a list of possible causes, which is the exact moment a reader might conclude something. Put the guard where the risk is, not in a page-foot disclaimer.
8. **Use person as a distance control within one article.** `the eyes, kidneys, nerves and heart` when describing harm; `you` when instructing action. Vary person by section function, not by style rule.
9. **`Text is written to be understood the first time it's read.`** A testable editorial criterion, not an aspiration.
10. **Negative pattern: the frozen heading.** `When to see a doctor` no longer matches bodies that say `healthcare professional`. Migrating body copy without migrating template strings produces articles that contradict themselves in their most-read line.
11. **Negative pattern: the governance is invisible where it counts.** Two-year review cycles, financial-interest disclosure and a named AI policy all live on a footer page; the article shows `By Mayo Clinic Staff` and an unlabelled date, with the actual review date buried as reference #19 of 19.
12. **Negative pattern: the strongest safety copy in the weakest place.** The all-caps 911 instruction is in the Terms of Use. The clinical articles carry escalation in plain unemphasised body text. Optimise the artefact people read, not the one that indemnifies you.

## Caveats & gaps

- **Chest pain is missing from the Symptoms A–Z index**, and the symptom URL for it 301-redirects to Cough (Mayo resolves on the `sym-` ID, and `sym-20050846` is Cough). Chest pain exists only as a Diseases & Conditions topic. Recorded as a finding, but it also means the Symptoms-template sample is **one article** (Cough) rather than two.
- **Five articles across two templates** is a good but not exhaustive basis. `Risk factors` / `Complications` / `Prevention` are evidenced as optional from four D&C articles; a larger sample might reveal further optional sections or a third template.
- **`Drugs & Supplements` and `Healthy Lifestyle` were not harvested** — two of the six Health Library sections, and both likely to have their own templates.
- **The Symptom Checker itself was not entered.** Its inputs, its no-match state, and its own escalation wording are unobserved. Given that it is the tool most likely to be used by someone in acute uncertainty, this is the most consequential remaining gap.
- **The two compliance PDFs were not opened** — `Notice of Privacy Practices` (mc5256-01.pdf) and `Notice of Nondiscrimination` (mc2570-61.pdf). All HIPAA and Section 1557 content sits inside them.
- **`/appointments/faq` was not fetched.**
- **Non-English locales unharvested.** `/es/`, `/ar/`, `/zh-hans/` are documented as staffed by in-house content linguists; whether the escalation blocks and the `called X` glossing survive translation is unknown and would be a valuable second pass.
- **The `Care at Mayo Clinic` and `Doctors & departments` tabs were not opened** — the commercial half of the article template is unexamined.
- **Terms of Use contains an anti-automation clause** (see T10). This harvest used ordinary fetches of publicly-indexed pages and quotes only short strings, but the clause is flagged for a human decision on corpus redistribution.

## Sources

1. https://www.mayoclinic.org/diseases-conditions
2. https://www.mayoclinic.org/diseases-conditions/index?letter=A
3. https://www.mayoclinic.org/symptoms
4. https://www.mayoclinic.org/tests-procedures
5. https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201
6. https://www.mayoclinic.org/diseases-conditions/migraine-headache/diagnosis-treatment/drc-20360207
7. https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961
8. https://www.mayoclinic.org/diseases-conditions/anxiety/diagnosis-treatment/drc-20350967
9. https://www.mayoclinic.org/diseases-conditions/type-2-diabetes/symptoms-causes/syc-20351193
10. https://www.mayoclinic.org/diseases-conditions/chest-pain/symptoms-causes/syc-20370838
11. https://www.mayoclinic.org/symptoms/cough/basics/causes/sym-20050846
12. https://www.mayoclinic.org/about-this-site
13. https://www.mayoclinic.org/about-this-site/health-information-policy
14. https://www.mayoclinic.org/about-this-site/meet-our-medical-editors
15. https://www.mayoclinic.org/about-this-site/accessibility-statement
16. https://www.mayoclinic.org/about-this-site/advertising-sponsorship-policy
17. https://www.mayoclinic.org/about-this-site/terms-conditions-use-policy
18. https://www.mayoclinic.org/appointments
