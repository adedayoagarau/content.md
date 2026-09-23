# 115. Cleveland Clinic

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Academic medical centre health library and care navigation |
| Primary URL | https://my.clevelandclinic.org/ |
| Corpus rank | 115 |
| Benchmark strength (source list) | Symptom and care navigation |
| Locale / market observed | en-US (Ohio-primary). Region switcher offers `Abu Dhabi` · `Canada` · `Florida` · `London` · `Nevada` · `Ohio`. Civil-rights taglines published in 17 languages besides English. |
| Platform observed | Web — Health Library (two co-existing templates: legacy Sitecore and new Next.js), policy pages, care-access pages |
| Auth state | Unauthenticated public surfaces only. No MyChart, no appointment submission, no symptom entry. |
| Regulatory posture | **HIPAA-covered entity** — `Notice of Privacy Practices` published as PDFs in 7 languages. **Section 1557 is the dominant visible framework**: a full Non-Discrimination and Availability notice names a `Section 1557 Coordinator` with postal address, phone, fax and email, plus an HHS OCR grievance route. Protected classes listed exceed the statutory minimum (adding socioeconomic status, culture, manner of payment). **No digital accessibility statement, no WCAG claim, no Section 508 claim, no VPAT for my.clevelandclinic.org — `[absent]`.** The only WCAG claim in the estate belongs to a different entity on a different domain. Advertising carries a per-slot non-endorsement disclaimer plus a linked policy; unrestricted educational grants are disclosed. AI use in content production is disclosed under its own heading. **Terms of Use (05/14/2025) prohibit automated harvesting and prohibit using the Services to train or ground LLMs or to summarise them in model output — see Caveats.** |
| Harvest date | 2026-09-21 |
| Pages inspected | 19 |
| Harvest completeness | Full for the priority sections (T1, T11, T14). Article template evidenced from **five** articles across **two** templates, including one deliberate control article. Gaps: `/webappointment`, the non-Ohio regional sites, the Health Essentials consumer blog, and the four unexamined Health Library categories. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Health Library hub | https://my.clevelandclinic.org/health | Seven categories, search/filter/sort controls, the deck |
| Diseases & Conditions index | https://my.clevelandclinic.org/health/diseases | A–Z, filter panel, empty-state bug |
| Symptoms index | https://my.clevelandclinic.org/health/symptoms | |
| Body Systems index | https://my.clevelandclinic.org/health/body | |
| About the Health Library | https://my.clevelandclinic.org/health/about | Source policy, review cadence, the "recovering journalists" line |
| Editorial Policy | https://my.clevelandclinic.org/about/website/editorial-policy | **The voice-and-values source**; AI disclosure |
| **Migraine Headaches** | /health/diseases/5005-migraine-headaches | Full disease template **including the legacy "questions to ask" block** |
| **Anxiety Disorders** | /health/diseases/9536-anxiety-disorders | Fullest question-form expression of the template |
| **Type 2 Diabetes** | /health/diseases/21501-type-2-diabetes | Newer vintage; renamed Overview; declarative sub-heads |
| **High Blood Pressure** (control) | /health/diseases/4314-hypertension-high-blood-pressure | Deliberate control on template variability |
| **Chest Pain** | /health/symptoms/21209-chest-pain | **The symptom template** — escalation promoted to H2 |
| About This Website | https://my.clevelandclinic.org/about/website | Policy IA |
| Non-Discrimination Notice | /about/website/non-discrimination-notice | Section 1557 apparatus, 17 language taglines |
| Notice of Privacy Practices | /about/website/privacy-practices | |
| Terms of Use | /about/website/terms-of-use | **Anti-scraping and anti-LLM clauses** |
| Appointments & Access | /patients/information/access | Care-navigation triage |
| Need Help? | https://my.clevelandclinic.org/help | |
| Virtual Visits | /online-services/virtual-visits | Licensure gating, service states |
| Physical accessibility | /patients/visitor-information/accessibility | **Not** a digital statement |
| Digital accessibility | /about/website/accessibility | **Empty body — does not exist** |

---

## T1 Navigation & IA labels

**Seven Health Library categories** `[observed]`, confirmed from the filter panel and the `Search Health Library Categories` grid:

`Body Systems & Organs` · `Diseases & Conditions` · `Medical Treatments` · `Procedures` · `Drugs, Devices & Supplements` · `Diagnostics & Testing` · `Symptoms`

(Note the comma in `Drugs, Devices & Supplements`, and that `Medical Treatments` lives at `/health/treatments` while its own tile icon is labelled `Treatments Icon` — heading and icon disagree.)

**Cleveland Clinic indexes the same knowledge seven ways where Mayo (114) indexes it three.** The extra four are `Body Systems & Organs`, `Medical Treatments`, `Procedures` (split from treatments) and `Drugs, Devices & Supplements`. `Body Systems & Organs` is the interesting addition: it is an **anatomical** entry point, for a user who knows where it hurts but not what it is or what it's called. That is a genuinely different mental model from symptom, diagnosis or intervention, and it is the one most likely to serve someone with very low health literacy.

The grid is **self-excluding** — on `/health/body` the Body Systems tile is omitted, on `/health/symptoms` the Symptoms tile is omitted. A category page never links to itself. Small, correct, and frequently got wrong.

**Index controls — the strongest search furniture in the corpus** `[observed]`:

| Control | String |
|---|---|
| Search field label | `Search our topics` |
| Placeholder | **`Ex: "Heart Pain"`** (with curly quotes) |
| Submit | `Search` |
| A–Z trigger and panel title | `Search by First Letter` |
| Letter strip | `ABCDEFGHIJKLMNOPQRSTUVWXYZ#` — with a trailing `#` bucket |
| Compact trigger | `Filter & Sort` |
| Sort group | `Sort By` → `Most Relevant` · `A-Z` · `Z-A` |
| Category group | `Categories (Optional)` → `None Selected`, then the seven labels |
| Panel actions | `Clear` · `Apply` · `Clear Filters` · `Back` · `Close` |
| Collapsed state | `Sort By Most Relev...` · `Categories (Optional) Body Syste...` |
| Loading | `Loading` (image alt `Loading...`) |

**`Ex: "Heart Pain"` is the best placeholder in the corpus.** It does three things in three words. It demonstrates the input type rather than describing it. It uses a **lay phrase** (`Heart Pain`) rather than a clinical one (`angina`, `chest pain`), so the user learns that colloquial input is accepted. And by capitalising both words as if typed by a person, it reads as an example of someone else's query rather than as instruction.

Compare Mayo's A–Z indexes, which have no search placeholder at all, and Zocdoc's bare `Search` label (112). This is how you tell a frightened person with no vocabulary that their words will work.

`Categories (Optional)` is the other good one — marking a filter group as optional in its own label removes the sense that the form must be completed before results appear.

The `#` bucket for non-alphabetic entries is present where Mayo's D&C index simply omits `Q`.

**Live defect** `[observed]`: the results heading is a template of the form `"<query>"` and renders as **two stray H2s containing only the opening and closing curly quotes** when no query is present. An empty-state bug visible in the heading hierarchy — a screen-reader user encounters two headings whose entire content is a quotation mark.

**The deck is the site's positioning statement** `[observed]`, `/health`:

> H1: `Health Library`
> Deck: **`Find answers to your health questions from experts you can trust. It's like having a friend who's a doctor — but here for you 24/7.`**

Two sentences. The first is the functional promise, the second is the **relational** one, and the second is the one doing the work. `a friend who's a doctor` names a social good that most people do not have and know they do not have. `but here for you 24/7` closes the gap the metaphor opens — a real friend who is a doctor would resent being phoned at 2am.

Compare Mayo's `Easy-to-understand answers about diseases and conditions` (114). Mayo promises **comprehensibility**; Cleveland Clinic promises **availability and relationship**. Both are correct diagnoses of a real barrier, and they are different barriers.

**Two breadcrumb templates are live simultaneously** `[observed]`:

- Legacy (Sitecore), slash-separated inline: `Home / Health Library / Symptoms`
- New (Next.js), each crumb its own line with a trailing slash: `Home / Health Library / Diseases & Conditions / Migraine Headaches`

The article breadcrumb uses the **category label** (`Diseases & Conditions`), not the URL slug (`diseases`), and the leaf crumb is the **article H1**, not the SEO `<title>` — which differs on every article (see T14).

**Two navs are also live simultaneously** `[observed]`:

- Legacy: `ClevelandClinic.org` · `Find a Provider` · `Locations & Directions` · `Services` · `Patients & Visitors` · `Health Library` · `Appointments`
- New: a region strip (`Locations:` `Abu Dhabi | Canada | Florida | London | Nevada | Ohio`) plus **only two labels** — `Patients and Visitors` and `Health Library`

Note `Patients & Visitors` (legacy, ampersand) versus `Patients and Visitors` (new, spelled out) for the same destination. And the new template collapses a seven-item nav to two, which is a defensible simplification on an article page but means the user loses `Find a Provider` and `Appointments` from the persistent chrome at exactly the point they are most likely to want them — the care rail compensates (see T3).

**Alert banner label differs by template too** `[observed]`: legacy says `Important Updates` (icon alt `Emergency icon`), new says `Closures & Updates` (icon alt `Exclamation point`). The legacy panel sub-head is `Coming to a Cleveland Clinic location?` — a question that correctly scopes an alert about construction and road closures so a reader not travelling can dismiss it.

## T2 Value proposition & headline patterns

**The site's design brief is stated explicitly in its editorial policy** `[observed]`:

> `Simply curious? Panic Googling at 2 a.m.? We're here for you when you need us.`

**`Panic Googling at 2 a.m.`** is the clearest articulation of a target reading-moment anywhere in this corpus. It names the user's emotional state, their channel, their hour, and — by pairing it with `Simply curious?` — the full range the content must serve. Everything else in the Cleveland Clinic voice follows from that sentence: the contractions, the short sentences, the question headings, the reassurance coda.

**The friend-who-is-a-doctor metaphor is sustained across three surfaces** `[observed]`:

- `/health` deck: `It's like having a friend who's a doctor — but here for you 24/7.`
- `/health/about`, on the review process: `It's like having a doctor double-check your homework!`
- Editorial policy: `when you read our content, it's like you're calling up your best friend — who happens to be a doctor`

The middle one is the cleverest. It explains **medical review** — a governance process — by analogy to homework being checked. The reader understands both that someone qualified looked at it and that the writer was not the expert, in eight words.

**`/health/about` names the authorship in a single memorable line** `[observed]`:

> `Academic researchers and recovering journalists work together to create every Health Library article.`

`recovering journalists` is a joke, and it is load-bearing. It discloses that the writers are not clinicians, pre-empts the objection, and does so with enough self-awareness that the disclosure reads as confidence rather than hedging.

**Article H2 headings are the reader's questions, not clinical categories.** This is the fundamental divergence from Mayo and it runs through the whole file — see T11 and T12.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Search our topics` / `Search` / `Search by First Letter` / `Filter & Sort` | Index controls | |
| `Most Relevant` / `A-Z` / `Z-A` | Sort options | |
| `Clear` / `Apply` / `Clear Filters` / `Back` / `Close` / `Back to Top` | Panel actions | |
| `View more:` / `View less:` | Category grid expander | Trailing colons |
| `Make an Appointment` | Article care rail, most topics | |
| `Schedule an Appointment` | Hypertension care rail | **Second label, same action** |
| `Request an Appointment` | Article footer strip, /patients/information/access | **Third label** |
| `Find a Doctor and Specialists` | Article care rail | |
| `Find a Provider` | Global nav, footer card | **Nav says Provider, care rail says Doctor** |
| `Get a Second Opinion` | Article care rail | |
| **`Get Emergency Medicine Care`** | **Chest pain care rail only** | The CTA layer mirrors the escalation tier |
| **`Find an Emergency Department`** | **Chest pain care rail only** | |
| `Talk to a Heart Nurse` | Chest pain, hypertension | Topic-specific human route |
| `Virtual Visits for Diabetes` | T2D only | |
| `Find a Pediatric Doctor and Specialists` | T2D only | Age-variant of the care rail |
| `Experts You Can Trust` / `References` / `View Sources` | Attribution block | |
| `Learn more about the Health Library and our editorial process.` | Attribution block | Full sentence as link text |
| `Advertisement` / `Ad` / `Policy` | Ad slots | |
| `Sign up` / `Example email` | Newsletter | `Example email` lets you preview before consenting |
| `Get Started` | Appointments page | |
| `Not sure where to go for care?` | Appointments page | **A question as a CTA** |
| `What to expect before my appointment?` | Appointments page | Question-form CTAs |
| `Need Help?` | Global utility bar | |
| `Call for Additional Assistance` | Mobile menu, before the phone number | |
| `Send Us Feedback` | Footer | |

**The chest-pain care rail is the single best content-design decision in this file.** Every other article offers `Make an Appointment` and `Find a Doctor and Specialists`. On chest pain, those are **replaced** by `Get Emergency Medicine Care` and `Find an Emergency Department`.

The CTA layer is not a fixed component with a topic-shaped hole — it is escalation-aware. A user who has scrolled past the escalation block, or who never read it, still encounters an emergency-routing action in the persistent rail. The safety message is expressed twice: once as prose, once as a control. Most sites would ship `Make an Appointment` on a chest-pain page without noticing.

`Talk to a Heart Nurse` is the same instinct at a lower tier — a named human route, offered on the two cardiac topics only.

**Against that**, the appointment action carries **three labels** (`Make an Appointment`, `Schedule an Appointment`, `Request an Appointment`) and the provider-finding action carries **two** (`Find a Provider` in the nav, `Find a Doctor and Specialists` in the care rail). The nav/rail split is the more consequential: a user taught by the nav to look for "Provider" will not recognise "Doctor and Specialists" as the same thing.

`Example email` beside `Sign up` on the newsletter is a small, good pattern — let the user see what they are consenting to receive before consenting.

`Not sure where to go for care?` as a CTA is the triage entry point (see T6). Phrasing a navigation control as an admission of uncertainty makes it usable by the people who need it.

## T4 Onboarding & getting-started

The equivalent of onboarding is **care navigation**, and `/patients/information/access` is built as a triage `[observed]`.

Section H2s, in order: `Connect With Cleveland Clinic` · `Request an Appointment` · `Need To Make an Appointment at Another Location?` · `Find an Emergency Department or Walk-in Location Near You` · `Have Questions Before Your Appointment?`

The framing line: `At Cleveland Clinic, we're here when you need us most. That's why we're bringing you more ways to get the care you need than ever before.`

**The triage is the artefact.** Rather than a single "book an appointment" funnel, the page presents parallel routes and then supplies a disambiguator for people who cannot choose:

> `Not sure where to go for care?` → `/services/where-to-go-for-care`

And it distinguishes the two walk-in tiers in plain language `[observed]`:

- `Our Cleveland Clinic Emergency Departments provide care for the sickest patients — from severe medical problems to critical injuries.`
- `Our Express Care and Urgent Care Clinics offer walk-in access to you and your family for common health concerns and injuries.`

`the sickest patients` is blunt and it is the right word. A user deciding between the ED and urgent care needs to know the ED is for people sicker than them — or that they are that person. Softening it ("more serious conditions") would blur the boundary the sentence exists to draw.

**Virtual Visits is the most carefully written service page** `[observed]`. Four named service states, each a bolded run-in label: `Express Care Virtual Visits:` · `Scheduled Virtual Visit:` · `Virtual Primary Care:` · `Virtual Pediatric Primary Care:`

And the licensure explanation, which is a genuinely hard thing to say:

> `Virtual visits are subject to regulations and other requirements that vary by state and country. This can impact the availability of services.`
> `you'll be asked where you'll be located at the time of your visit. This information will be used to determine whether services are available in your area.`

Two sentences: the rule, then what the user will be asked and why. `where you'll be located **at the time of your visit**` is the precise formulation — it is the user's location during the consultation, not their home address, that determines licensure. Getting that distinction into consumer copy without legalese is difficult and this does it.

Availability includes a published `Holiday Hours:` list with two hard-closed states: `Thanksgiving: Closed` · `Christmas Day: Closed`. Publishing the closures rather than only the openings is the honest form.

## T5 Form & field labels

Thin — all transactional forms sit behind `/webappointment` or MyChart. `[observed]`:

| Label | Context |
|---|---|
| `Search our topics` | Health Library search |
| `Ex: "Heart Pain"` | Placeholder (see T1) |
| `Sort By` / `Categories (Optional)` | Filter group headings |
| `None Selected` | Empty filter state |
| `Sign up` / `Example email` | Newsletter |

`[absent]`: appointment-request fields, MyChart fields, validation copy, virtual-visit intake.

## T6 Status & state language

**The request/schedule distinction is modelled and labelled** `[observed]`. The primary CTA is `Request an Appointment`, not "Book"; the self-serve alternative is `Schedule in MyChart`. The two sit side by side, **request-first**. The request CTA links to `/webappointment/what-to-expect` — the URL itself promises an expectation-setting interstitial before the form.

This is the opposite of Zocdoc's choice (112), which uses `booked` and has no pending state because instant confirmation is its proposition. Cleveland Clinic is a hospital, cannot promise the slot, and says `Request`. Both are honest; the vocabulary follows the underlying guarantee.

`[absent]`: any post-submission status string — no queue position, no confirmation-state copy, no "we'll respond within X". Those live behind `/webappointment`, which was not opened.

**Virtual-visit states** `[observed]`:

- On-demand: `You don't need an appointment. You'll be connected to a provider who can help you with any number of common healthcare concerns.`
- Eligibility: "available for patients ages 2 and up, although adults must accompany patients 17 and under during their visits."
- Geographic gating: see T4.
- Scope limit: `This service is available for U.S. patients only.`
- **Migration state**: `If you've used the Express Care Online app before, you'll need to download the MyClevelandClinic app and complete a one-time enrollment prior to completing a virtual visit.` — a legacy-account state written for the user who will otherwise hit a dead end.
- **Failure state with a 24/7 route**: `If you encounter technical difficulties during your virtual visit or need technical support for your upcoming scheduled virtual visit, you can reach us anytime at 1.866.915.3383 (toll-free).`
- Billing state: `Cleveland Clinic will bill your insurance first, and you'll only be responsible for any remaining charges.` with the hedge `Virtual visits are still an option for you, even if your insurance company doesn't cover them.`
- Prescription hedge: "You can even get a prescription sent to your pharmacy, **when appropriate**."

`when appropriate` is doing real work — it prevents the page becoming a prescription-on-demand promise while keeping the benefit visible.

**Media fallback states, accessibility-relevant** `[observed]`, present on article pages where video or images don't render:

- `Image content: This image is available to view online.` + `View image online`
- `Video content: This video is available to watch online.` + `View video online`

Labelled fallbacks with an explicit alternative route, rather than a broken embed.

**Gated human route** `[observed]`, `/help`: `Are you a Cleveland Clinic patient who needs to talk to a nurse? Reach out to your primary care provider's office and they'll connect you with our Nurse on Call team.` — gates on existing-patient status and routes indirectly. Honest, and a dead end for everyone else.

## T7 Error, failure & recovery

`[absent]` for form errors — none reachable.

**Two live defects found** `[observed]`:

1. **The Health Library results heading renders as two empty quotation marks.** The heading template `"<query>"` produces `## "` and `## "` when no query is present — two H2s whose entire content is a curly quote. A screen-reader user navigating by heading encounters two unlabelled headings on the index page.

2. **`/about/website/accessibility` returns an empty body.** The URL where a digital accessibility statement would live exists and serves nothing (see T14).

**Error-reporting route for content** `[observed]`, editorial policy, and the framing is the notable part:

> `Think you've found an error? (We are still human.)`

A parenthetical admission of fallibility inside an error-reporting invitation. It lowers the bar for reporting — the reader is not accusing the institution of failure, they are helping humans. Route: `editorial@ccf.org`.

**Technical-support route** for virtual visits is published with a 24/7 commitment (see T6) — the only always-on failure route on the site.

## T8 Empty states

`[observed]`:

- Filter panel: **`None Selected`** — the correct label for an unset optional filter group. It reads as a state, not as an error.
- Collapsed control labels: `Sort By Most Relev...` and `Categories (Optional) Body Syste...` — label plus truncated current value with an ellipsis. This is a good compact pattern: the user can see *that* a filter is applied and roughly *what*, without expanding.
- Loading: `Loading` with image alt `Loading...`

`[absent]`: no-results copy for a search that returns nothing. The results region is client-populated and the quotation-mark bug (T7) is what renders in its place pre-query.

`[absent]`: A–Z letters with no entries — the strip renders all 26 plus `#` with no disabled states, so a user clicking an empty letter gets no explanation. Compare Mayo's Tests & Procedures hub, which announces `No procedures begin with the letter Q`.

## T9 Notifications & system messages

**Alert banner** `[observed]`, present site-wide: `Important Updates` (legacy) / `Closures & Updates` (new template), with a `Close` control and the panel sub-head `Coming to a Cleveland Clinic location?`

Contents observed were operational — construction and road closures affecting specific campuses. Scoping the banner with a question (`Coming to a Cleveland Clinic location?`) lets the ~99% of readers who are not travelling dismiss it in one read. Most hospital alert banners fail this.

**Newsletter module** `[observed]`, on every article:

> H2: `Better health starts here`
> Body: "Sign up for our Health Essentials emails for expert guidance on nutrition, fitness, sleep, skin care and more."
> Controls: `Sign up` and `Example email` (rendered twice, in both orders — a component bug)

**Advertising disclaimer** `[observed]`, appearing 2–3× per article under bare `Advertisement` labels:

> `Cleveland Clinic is a non-profit academic medical center. Advertising on our site helps support our mission. We do not endorse non-Cleveland Clinic products or services.`

Three sentences: what we are → why ads exist → what their presence does not mean. Same structure as Mayo's (114), one sentence longer, and the extra sentence (`non-profit academic medical center`) is the one that earns the second.

Slot markers observed: two consecutive `Advertisement` labels at the top of every article, more mid-body, and a bare `Ad` label lower down. **Two ad slots above the fold on a clinical article** is the density worth recording.

## T10 Disclosures, legal & compliance

### Editorial and care separation `[observed]`, `/health/about`, under the heading `For Health Education Only`:

> `Our Health Library articles are designed to educate, not diagnose or treat.`
> `They're meant to complement your relationship with your doctor — not replace it.`
> `While there may be overlaps, our content doesn't mirror Cleveland Clinic care or promote our services.`

The third sentence is the unusual one. A hospital that publishes a health library has an obvious incentive to make its articles route to its own services, and Cleveland Clinic explicitly disclaims that the content mirrors its care pathways. That is a stronger claim than Mayo makes and it is made on the library's own About page, where the reader is already asking "why are they telling me this".

`complement your relationship with your doctor — not replace it` is the better of the two standard formulations: it describes what the content *is for* rather than only what it is not.

### Grant funding `[documented]`, Terms of Use

> "Portions of the Services were created with the support of unrestricted educational grants. The granting organization is noted at the bottom of the applicable page(s). This support does not influence the content of the health information on the Services."

`unrestricted` plus page-level attribution plus a non-influence statement. The full COI apparatus is: advertising disclaimer + linked advertising policy + editorial/care separation + unrestricted-grant disclosure.

**`[absent]`: any statement about medical-reviewer financial conflicts of interest.** Mayo (114) documents that its editors must disclose financial interests and that disclosure statements appear with the content. Cleveland Clinic publishes no equivalent.

### AI disclosure `[observed]`, editorial policy, under its own H3 `How we use AI`

> `Along the way, we may use artificial intelligence (AI) tools to support our work — not to replace our writers or medical reviewers.`

Four uses disclosed, verbatim: "Helping us brainstorm ideas" · "Suggesting headlines or social media copy" · "Helping us make information clear and easy to understand, whether we're writing for everyday readers or healthcare professionals" · "Summarizing background information to support our work".

Backstop: `No matter how we use AI, our content goes through the same editorial and clinical review process to make sure it's accurate, trustworthy and helpful.`

Giving AI use its own heading, enumerating four specific uses, and stating the human backstop is best-in-class disclosure practice for 2026. The third use — AI for plain-language simplification — is the one most directly relevant to a health library's reading-level target, and disclosing it invites exactly the scrutiny it should.

(Noted without editorialising: the Terms of Use prohibit using the Services to train or ground AI models, while the editorial policy discloses using AI to produce them. The two policies sit on the same domain.)

### HIPAA and Section 1557

**The Non-Discrimination and Availability notice is the substantive compliance content** `[observed]`, and it is considerably richer than Mayo's PDF-only equivalent:

- H2: `Cleveland Clinic 2025 Notice of Non-Discrimination`
- H3: `Notice of Availability of Language Assistance Services and Auxiliary Aids and Services`

Protected classes, verbatim: "race, color, culture, ethnicity, national origin (including limited English proficiency and primary language), age, disability, religion, **socioeconomic status**, sex (including but not limited to sex characteristics, intersex traits, pregnancy or related conditions, sexual orientation, and sex stereotypes), or **manner of payment**"

**`socioeconomic status`, `culture` and `manner of payment` exceed the Section 1557 statutory minimum.** `manner of payment` is the pointed one in a US hospital context — it is a commitment not to discriminate between insured and uninsured patients, stated in a civil-rights notice.

What is offered, three bullets verbatim: `Qualified interpreters (including ASL interpreter services).` · **`Information in other formats (i.e., audio, accessible electronic formats, other formats).`** · `Information written in other languages.`

**`accessible electronic formats` is the closest thing on the entire site to a digital-accessibility commitment** — and it is a Section 1557 obligation, not a WCAG claim.

Rights language: "provide, free of charge, reasonable modifications for individuals with disabilities" · "shall reasonably accommodate service animals, approved mobility devices" · **`You cannot be retaliated against for exercising these rights.`**

That last sentence is seven words and it is the one a patient needs. Rights notices routinely list entitlements without stating that asserting them is safe.

**Contact apparatus is complete** `[observed]`: `Section 1557 Coordinator`, Ombudsman Department, full postal address, phone, fax, and `1557Coordinator@ccf.org`. Interpreter dispatch line. Plus an external grievance route to HHS OCR (`OCRComplaint@hhs.gov`, phone, TDD).

**English tagline, verbatim**: `ATTENTION: Free language assistance services are available to you. Appropriate auxiliary aids and services to provide information in accessible formats are also available free of charge. Call 1-833-858-1813 (TTY: 711) or speak to your provider.`

Published in **17 languages besides English**: Spanish, French Creole, Chinese (simplified), Chinese (traditional), Vietnamese, Tagalog, French, Nepali, Portuguese, Arabic, Russian, German, Korean, Italian, Polish, Serbian, Croatian, Japanese.

Two inconsistencies `[observed]`: the page labels Haitian Creole as "French Creole" while the Notice of Privacy Practices PDF for the same language is filed as "Haitian Creole"; and the NPP is published in only 7 languages (English, Spanish, Russian, Arabic, Simplified Chinese (Mandarin), Traditional Chinese (Cantonese), Haitian Creole) against the notice's 18 — **and it mislabels written scripts as spoken dialects** (Simplified Chinese is not Mandarin; Traditional Chinese is not Cantonese).

That mislabelling matters practically: a Cantonese-speaking patient in Ohio most likely reads Traditional Chinese, and a Mandarin speaker from the mainland reads Simplified — the mapping happens to work, but the labels teach the wrong model and would misroute a Mandarin speaker from Taiwan.

### Terms of Use — recorded for corpus governance

`[observed]`, Terms of Use, last updated 05/14/2025, under prohibited uses:

- "use any robot, spider, crawler, scraper, script, or any automatic device or means to harvest, gather, access, copy, or otherwise use the materials"
- "using any portion of the Services to develop, create, train, fine tune, or ground (including through a retrieval-augmented generation (RAG) model), any large language model, foundation model, deep machine learning, generative artificial intelligence model or algorithm"
- "including or summarizing any portion of the Services in the output of any such model, algorithm, or software"
- "you must only use the Services for non-commercial purposes"

**This is the most restrictive Terms-of-Use language encountered in the corpus and it is recorded here as observed page content requiring a human decision.** See Caveats.

## T11 Help-centre architecture — the article templates

**This is the priority section.** Cleveland Clinic runs two templates, and the difference between them is more sharply drawn than Mayo's.

### Template A — Diseases & Conditions

The `Contents` jump-link rail is the template, rendered at the top of every article (and duplicated in the DOM for sticky-desktop plus inline-mobile).

**Migraine Headaches** — the fullest expression, `[observed]`:

`Overview` · `Symptoms and Causes` · `Diagnosis and Tests` · `Management and Treatment` · `Outlook / Prognosis` · `Prevention` · `Living With`

**Anxiety Disorders** — identical seven, `[observed]`.

**Type 2 Diabetes** — six, `[observed]`: `What Is Type 2 Diabetes?` · `Symptoms and Causes` · `Diagnosis and Tests` · `Management and Treatment` · `Outlook / Prognosis` · `Prevention`. **No `Living With`.**

**High Blood Pressure** (control) — five, `[observed]`: `What Is High Blood Pressure?` · `Symptoms and Causes` · `Diagnosis and Tests` · `Management and Treatment` · `Outlook / Prognosis`. **No `Prevention`, no `Living With`.**

**Conclusion: the disease template is a fixed-order menu that articles subset from, not a fixed spine.** Four sections are invariant — `Symptoms and Causes`, `Diagnosis and Tests`, `Management and Treatment`, `Outlook / Prognosis`. `Prevention` and `Living With` are optional. The Overview is optionally **renamed to a title-cased question**, `What Is <Topic>?` — a convention present in the two newer articles (T2D updated 11/25/2025, hypertension 06/23/2026) and absent from the two older ones (migraine 01/23/2024, anxiety 07/03/2024).

**Section ordering is a narrative.** `Overview → Symptoms and Causes → Diagnosis and Tests → Management and Treatment → Outlook / Prognosis → Prevention → Living With` follows the **patient's journey through the condition**, not the clinical description of it: what is it, what does it feel like and why, how will they find out, what will they do, what happens to me, can I stop it, how do I live. Mayo's sequence (114) is organised around the *disease*; Cleveland Clinic's around the *person having it*.

`Outlook / Prognosis` is the clearest instance — Mayo has no equivalent section. "What happens to me" is a question every newly diagnosed person has and most clinical templates do not have a home for.

### Template B — Symptoms

**Chest Pain** `[observed]`:

`Overview` · `Possible Causes` · `Care and Treatment` · **`When To Call the Doctor`** · **`Additional Common Questions`**

**Seven differences from the disease template:**

| Disease template | Symptom template |
|---|---|
| `Overview` or `What Is X?` | `Overview` |
| `Symptoms and Causes` | **`Possible Causes`** — no symptoms section, because the article *is* the symptom |
| `Diagnosis and Tests` | **absent** |
| `Management and Treatment` | **`Care and Treatment`** |
| `Outlook / Prognosis` | **absent** |
| `Prevention` (own H2) | folded into `Care and Treatment` as an H3 |
| `Living With` | **absent** |
| escalation is a demoted H3 in question form | **`When To Call the Doctor` is a top-level H2 with its own jump link, in imperative form** |
| — | **`Additional Common Questions`** — a named FAQ H2 unique to this template |
| `A note from Cleveland Clinic` | same |

**`Possible Causes` over `Symptoms and Causes` is exactly right.** The reader of a symptom article already has the symptom; what they lack is the explanation. And `Possible` is doing anti-self-diagnosis work in a single adjective — the list is explicitly non-exhaustive and non-diagnostic before the reader begins it. Mayo achieves the same effect with a separate bolded warning callout (114); Cleveland Clinic does it in the heading.

**The escalation promotion is the structural finding.** On a disease article, "when do I get help" is an H3 buried inside `Living With` or `Management and Treatment` and phrased as a question. On a symptom article it is:

- a **top-level H2**
- **jump-linked from the Contents rail at the top of the page**, so it is one click away before any scrolling
- phrased as an **imperative** (`When To Call the Doctor`), not a question

One click from the top of the page to the escalation guidance, for the article type read by people who do not yet know whether this is an emergency. That is the single most reusable structural decision in this file.

### Escalation design — the highest-value artefact

| Article | Heading | Level | Position | Tiers |
|---|---|---|---|---|
| **Chest pain** | `When To Call the Doctor` | **H2, jump-linked** | 4th of 5 sections | **2**, split across two H2s |
| Migraine | `When should I see a healthcare provider?` | H3 | inside `Living With` | **2** — routine + `Call 911` |
| Hypertension | `When should I see my healthcare provider?` | H3 | inside `Management and Treatment` | **3** in three sentences |
| Anxiety | `When should I see my healthcare provider?` | H3 | last H3 in `Living With` | **1**, relationship-framed |
| Type 2 diabetes | `When should I see my healthcare provider?` | H3 | last H3 in `Management and Treatment` | **1**, cadence-framed |

**Chest pain — the fully developed pattern** `[observed]`.

Tier 1, the escalation instruction itself, quoted exactly:

> `If you have chest pain that lasts longer than five minutes and doesn't go away when you rest or take medication, get immediate help. Call 911, your local emergency services number or have someone take you to the closest emergency room (ER) right away.`

Then a standalone severity line: `Cardiac chest pain can be life-threatening.`

Then a labelled list: `Chest pain can be a sign of a heart attack. Other signs of a heart attack include:` followed by six bullets.

**Structure, described abstractly:** a conditional threshold → an imperative naming **three parallel channels** (emergency number / local equivalent / someone drives you) → a one-line severity justification → a list of concurrent signs.

The three-channel construction is the reusable part. `Call 911, your local emergency services number or have someone take you to the closest emergency room` covers the US reader, the non-US reader, and the reader who cannot speak or cannot wait — in one sentence, with no branching. The phrase `your local emergency services number` recurs on the hypertension article too, so it is a house convention rather than a one-off.

**Tier 2 is deferred to the next H2**, `Additional Common Questions`, under `What should I do if I have chest pain?` — where the emergency instruction is **repeated in bold** (the only bolded running sentence in the article) and *only then* does the non-emergency route appear. The ordering within tier 2 is emergency-first, then routine. The site never leads with the softer option.

And immediately above it, the bluntest two-line exchange in the corpus:

> H3: `Is chest pain normal?`
> Answer: `No. Chest pain isn't normal.`

Five words. A question the reader is genuinely asking themselves at 2am, answered with a full stop after the first word and then restated. No hedge, no "it depends", no "many things can cause".

**Migraine** `[observed]` — two tiers, in the disease template:

> `Schedule a visit with your healthcare provider if you experience:` [three bullets: new symptoms, worsening symptoms, side effects from treatment]
> `Call 911 (or your local emergency services number) or go to an emergency department right away if you:` [three bullets]

Clean two-tier separation with distinct verbs — `Schedule a visit` for tier 1, `Call 911… or go to an emergency department right away` for tier 2. Note the parenthetical `(or your local emergency services number)` again.

**Anxiety and type 2 diabetes are single-tier and are not threshold blocks at all** `[observed]`. Anxiety's lead-in is `Your healthcare provider is your partner in your care.` — a *relationship* framing about treatment not working, with no list, no 911, no ED. T2D's is `You'll need regular appointments with your healthcare team to be sure you're on track with your T2D management plan.` — a *cadence* framing.

For both, acute risk is relocated elsewhere: anxiety's serious-risk content sits in `Outlook / Prognosis` as a complications list (including a linked suicide-recognition article); T2D's acute failure mode is described under `Complications of this condition`, far earlier in the article and separated from the escalation block.

**Pattern summary — escalation depth scales with acuity, not with template:**

- Chronic or mental-health condition → single tier, relationship or cadence framing, no numbers, no 911
- Chronic condition with an acute failure mode → **escalation splits**: routine cadence in the "when to see" block, acute thresholds relocated into symptoms/complications with bolded `Call 911`
- Acute symptom → escalation promoted to a jump-linked H2, two tiers, three named channels, **and the page CTAs swapped to emergency-care actions**

That last clause is the difference between Cleveland Clinic and everyone else in this corpus. The escalation decision propagates out of the prose and into the component layer.

### `A note from Cleveland Clinic` — the closing coda

`[observed]` — H3, sentence case, **always the final section of the article body**, present on all five articles. **It is not in the Contents jump list on any article** — a coda you arrive at, not a destination you navigate to.

Function: it drops the explanatory register and switches to direct second-person reassurance plus a single behavioural nudge. No new clinical information, no lists, no links. Three to six sentences. It consistently does some combination of: normalise the situation, name the emotional difficulty, close with encouragement.

Verbatim openers:

- Migraine: `You've probably had a headache before, but a migraine is different.`
- Anxiety: `You don't need to live with constant worry and fear.`
- T2D: `Type 2 diabetes involves constant day-to-day care and management.`
- Hypertension: `The months and years can go by fast.`

Verbatim closers: T2D — `Don't hesitate to reach out to them if you need help.` Hypertension — `But catching and treating it early can help you protect your health for years to come.` Migraine — `A healthcare provider can help you with this, so migraines don't take over your life.`

The T2D note contains the clearest statement of the block's job: **`It'll likely be very overwhelming at first.`** It names the feeling *before* offering the reassurance.

The migraine note goes further and does something no other article does — it validates the **experience of time**:

> `Even though your symptoms are temporary, the duration of a migraine can make it feel like time is moving slower and against you.`

That sentence contains no clinical content. Its entire function is to tell a reader that the thing they experienced, which they may have thought was an overreaction, is a real and recognised part of the condition. It is the strongest piece of empathetic micro-copy in this corpus.

**`A note from Cleveland Clinic` is the most transferable single component in this file.** Every article ends with the institution stepping out from behind the narration and speaking as itself, briefly, with no links and nothing to sell. It costs four sentences and it is where the `friend who's a doctor` promise from the homepage deck is actually cashed.

## T12 FAQs

**Cleveland Clinic's signature is that the FAQ is not a block — it is the heading grammar of the whole article.**

Almost every H3 in a Health Library article is a question the reader would plausibly type. Sample, all `[observed]`:

*Definitional:* `What is a migraine?` · `What is an anxiety disorder?` · `What is chest pain?` · `What does chest pain feel like?` · `What Is Type 2 Diabetes?`

*Prevalence:* `How common are migraines?` · `How common are anxiety disorders?`

*Causal:* `What causes a migraine?` · `What triggers a migraine?` · `What foods trigger migraines?` · `Are migraines hereditary?` · `What causes anxiety disorders?` · `Is Type 2 diabetes genetic?` · `What is the main cause of chest pain?`

*Experiential:* `What does a migraine feel like?` · `How often do migraines happen?` · `What are the phases of a migraine?`

*Diagnostic:* `How is a migraine diagnosed?` · `Who diagnoses a migraine?` · `How doctors diagnose this condition` (declarative — newer style)

*Treatment:* `How is a migraine treated?` · `What medications treat migraines?` · `What migraine treatments are available during pregnancy?` · `How do I deal with a migraine as it happens?`

*Prognosis and reversibility — reader-anxiety-driven:* `What's the outlook for a migraine?` · `Can Type 2 diabetes be reversed?` · `What can I expect if I have this condition?`

*Prevention:* `Can a migraine be prevented?` · `Can I prevent developing an anxiety disorder?` · `Can chest pain be prevented?`

*Self-care, in the reader's first person:* `How can I take care of myself if I have an anxiety disorder?` · `Is there anything I can do to feel better?`

*Escalation:* `When should I see a healthcare provider?` · `How do I know if my chest pain is serious?` · `Is chest pain normal?` · `What should I do if I have chest pain?`

**Three observations on the pattern:**

1. **The question is almost always answerable in the first sentence beneath it.** `Who diagnoses a migraine?` → "If you think you have a migraine, discuss your symptoms with a primary care physician (PCP) first." These are written for featured-snippet extraction as much as for human scanning, and the two goals happen to align.

2. **There is a consistent register split by person.** First-person questions (`How can I take care of myself…`, `Can I prevent…`, `Is there anything I can do to feel better?`) are reserved for **agency and self-care** sections. Second- and third-person forms are used for clinical description. The reader speaks in the heading when the heading is about what they can do.

3. **The newer articles are migrating away from question-form toward declarative noun phrases** — T2D (2025) and hypertension (2026) use `Type 2 diabetes causes`, `Risk factors`, `Complications of this condition`, `How doctors diagnose this condition`; migraine (2024), anxiety (2024) and chest pain (2023) are almost purely interrogative. **The template is mid-migration and both styles are live simultaneously.** The identical string `How doctors diagnose this condition` appears verbatim in both newer articles, which is evidence of a shared sub-head library rather than per-article authoring.

That migration is worth flagging as a likely regression. The question-form heading is the thing that makes a Cleveland Clinic article feel like an answer rather than a reference entry, and it is what serves the `Panic Googling at 2 a.m.` user the editorial policy names as the target.

**The one named FAQ block** `[observed]` is `Additional Common Questions` — an H2 exclusive to the symptom template, containing: `Is chest pain normal?` and `What should I do if I have chest pain?` It is the slot where the questions that do not fit the narrative arc get a home, and on chest pain both of its questions are escalation questions.

**A legacy block, now retired** `[observed]` — worth recording because it dates the template. Migraine (updated 01/23/2024) carries:

> H3: `What questions should I ask my healthcare provider?`
> With five bullets, verbatim: `Will I grow out of migraines?` · `What medications do you recommend?` · `How can I prevent migraines?` · `What type of migraine do I have?` · `Are my migraines considered chronic?`

**This block is absent from all four other articles**, including the two older ones. It is a legacy element of the pre-2024 template that has been retired.

Its retirement is a loss. Compare Mayo (114), which ships `Preparing for your appointment` with both `What you can do` (questions to ask) and `What to expect from your doctor` (questions you'll be asked) on every Diagnosis & treatment page. The block closes the asymmetry between an expert with seven minutes and a frightened novice, and `Will I grow out of migraines?` is exactly the question a patient would be embarrassed to ask unprompted.

**Other FAQ surfaces** `[observed]`: Virtual Visits ships a jump-linked `FAQs` H2 with seven questions including `Does my location matter when I do a virtual visit?` and `What if I've already signed up for Cleveland Clinic Express Care® Online?`; `/help` ships `Frequently Asked Questions` as a twelve-item topic-link list rather than Q&A; the Appointments page carries an unlabelled question row under `Have Questions Before Your Appointment?`

## T13 Terminology & glossary

### `healthcare provider` over `doctor`, with a deliberate exception set

| Context | Term | Evidence |
|---|---|---|
| Running body copy | `healthcare provider` | "A healthcare provider can help you manage symptoms" · "Your healthcare provider will tailor a treatment plan" · "Healthcare providers see many people with chest pain" |
| Chronic conditions | **`healthcare team`** | "regular check-ins with your healthcare team" · "support from your healthcare team" — T2D uses *team* far more than *provider* |
| Newer sub-headings | `doctors` | `How doctors diagnose this condition` (T2D **and** hypertension, identical string) |
| Symptom-template escalation H2 | `the Doctor` | `When To Call the Doctor` |
| Marketing and voice copy | `doctor` | `It's like having a friend who's a doctor` · `It's like having a doctor double-check your homework!` · `Textbooks written by and for doctors.` |
| Global nav | **`Find a Provider`** | vs. the article care rail's **`Find a Doctor and Specialists`** |

The `healthcare team` shift for chronic conditions is the thoughtful one and it appears deliberate. Type 2 diabetes care genuinely involves an endocrinologist, a dietitian, an eye doctor, a podiatrist and a pharmacist; `team` is accurate where `provider` implies a single person the patient may not have.

The `Find a Provider` / `Find a Doctor and Specialists` split between the nav layer and the care-rail layer is an unreconciled inconsistency, and it is the kind a content-design audit exists to catch.

### `biological family` — a consistent precision modifier

`[observed]` — `biological` is used wherever **heritability** is the point, plain `family` wherever **social support** is:

- Heritability: `Up to 80% of people with migraines have a first-degree biological relative with the condition.` · `Anxiety disorders tend to run in biological families.` · `Your lifetime risk of developing T2D is 40% if you have one biological parent with T2D.` · `Have a family history of Type 2 diabetes (biological parent or sibling)` — note the parenthetical doing the disambiguation · `Having a history of hypertension in your biological family`
- Social: `Your team should also include family members and other important people in your life.` · `Getting support from your family and friends is a big help, too.` · `A family member, caregiver or translator can join you.`

`migraines tend to run in biological families` rather than "run in families" is a small change that makes the sentence true for an adopted reader, a donor-conceived reader, and a reader estranged from their birth family — without drawing attention to any of them. **It is the clearest example in this corpus of inclusive language that costs one word and changes the accuracy of the claim.**

One inconsistency against the pattern `[observed]`: the anxiety diagnosis section says "if any of your family members have been diagnosed with an anxiety disorder" — unmodified `family` in a heritability context.

### Sex and gender — a link-based strategy, not a phrasing one

`[observed]` — Cleveland Clinic does **not** use "people assigned female at birth" in article body copy. Instead it keeps the short familiar noun and makes it the **anchor text of an explainer link**:

- Migraine: `[Women](…/health/articles/sex-recorded-at-birth) are more likely than men to experience a migraine.`
- Anxiety: `[Women](…/health/articles/sex-recorded-at-birth) are about twice as likely as men to have one.`
- T2D: `[Females](…/health/articles/sex-recorded-at-birth) may experience frequent vaginal yeast infections…`

Same target slug, `sex-recorded-at-birth`, three times. The pattern: **keep the readable word in the sentence, offload the nuance to a linked article.**

This is a defensible trade — "people assigned female at birth" is precise and it is also a mouthful that raises the reading level of every sentence it appears in. Offloading preserves the site's plain-language target while making the nuance one click away.

Two problems with the execution `[observed]`: the anchor text is inconsistent (`Women` vs `Females` for the same target across articles), and **the discipline is not applied outside the Health Library** — the Virtual Visits page lists "Painful urination (dysuria) in women", "UTIs… in women", "Yeast infections in women", unlinked and unglossed. The editorial policy governs the library; the service pages are outside it.

### Non-stigmatising weight and person-first language

`[observed]`, consistent and clearly policy-driven:

`Have overweight or obesity (a BMI greater than 25)` · `increasing your tendency to have overweight or obesity` · `Maintaining a weight that's healthy for you` · `Reaching and maintaining a weight that's healthy for you`

**`have overweight` rather than `are overweight`, every time.** Weight is modelled as a condition a person has, not an identity they are. And `a weight that's healthy for you` avoids naming a target at all.

Stated as policy `[documented]`, editorial policy: `We'll typically use person-first language, but we also realize that some groups embrace and prefer identity-first language.` — a policy that acknowledges its own exception, which is rarer than the policy.

### House vocabulary — the plain-word commitment, evidenced

The editorial policy claims "we also say kids, pee, poop, snot". Evidence found `[observed]`:

- `Peeing more frequently` (T2D symptoms) · `Peeing less than usual` (hypertension) — **`peeing` in a clinical symptom list**, not "urinating"
- `your food tube` as the gloss for esophagus, twice
- `belly` for abdomen: `Discomfort in your belly`
- `Sick to your stomach` for nausea
- `meds`, once: `Don't skip doses or stop taking your meds unless your provider says to.`
- `talk therapy` always glosses `psychotherapy`

**Parenthetical glossing is the house mechanism** `[observed]`, and the chest-pain causes list is its purest expression — **every single medical term carries a lay gloss**:

`Pericarditis (inflamed sac around your heart)` · `Pneumothorax (collapsed lung)` · `Gallstones (hardened digestive fluid)` · `Ulcers (sores in your stomach lining)` · `Muscle spasms in your esophagus (food tube)`

Elsewhere: `high blood sugar (hyperglycemia)` · `psychotherapy (talk therapy)` · `an acute (sudden and severe) complication` · `chronic (long-term) disease` · `millimeters of mercury (mmHg)` · `Ringing in your ears (tinnitus)` · `Too much physical activity (overexertion)` · `alcohol-induced hangover` → `migraine hangover`.

Note the direction differs from Mayo's. Mayo puts the **plain term first** and the technical term after (`narrowed blood vessels, called atherosclerosis`); Cleveland Clinic puts the **technical term first** and the gloss in parentheses (`Pericarditis (inflamed sac around your heart)`). Cleveland Clinic's order is better for a list the reader is scanning against a word a clinician used; Mayo's is better for running prose the reader is reading straight through. Both are defensible and each suits its own context.

**Inline glossary links are extremely dense** `[observed]` — effectively every clinical noun on first use links to its own Health Library article. **The library glosses itself** rather than using tooltips or a separate glossary. From the migraine article alone: nerves, blood vessels, brain, inflammation, genetics, hormones, sleep, seizure, thunderclap headache, neurologist, primary care physician, physical examination, neurological exam, blood tests, CT scan, MRI, EEG, and every named drug class and drug.

That is the structural payoff of a seven-category library: because `Drugs, Devices & Supplements`, `Diagnostics & Testing` and `Procedures` are first-class categories with their own articles, every term in a disease article has somewhere to point.

### In-flight terminology migrations `[observed]`

- T2D renames PCOS as `polyendocrine metabolic ovarian syndrome (PMOS)` while still linking to the `polycystic-ovary-syndrome-pcos` URL.
- The migraine article's H1 is `Migraine Headaches` (legacy compound, matching the slug `5005-migraine-headaches`), while the body uses `a migraine` / `migraines` throughout — and the `og:title` is a **third** string, `How To Get Rid of a Migraine`. Three titles for one article: H1, SEO `<title>` (`Migraine: What It Is, Types, Causes, Symptoms & Treatments`), and og:title.

That three-way title split is a system-wide pattern, not a migraine oddity — the SEO title differs from the H1 on every article observed. It is a deliberate SEO/UX separation, and the breadcrumb correctly uses the H1 rather than the SEO title.

## T14 Voice, tone & accessibility

### The editorial policy states the voice explicitly

`[observed]`, `/about/website/editorial-policy`, headings: `Our voice` · `Our commitment to our readers` · `Our editorial process` · `How we use AI`.

> `We're conversational and talk directly to you. That means, yes, you'll find a lot of contractions.`
> `when you read our content, it's like you're calling up your best friend — who happens to be a doctor`
> `You may not find some of what we say in the AP Stylebook, as we have our own in-house style guide, too.`

**Stated values commitments**, verbatim `[documented]`:

- **`At Cleveland Clinic, we feel that healthcare communication should do no harm.`**
- `We recognize that words influence how you experience healthcare — and the actions you take.`
- `Language can also motivate or stigmatize already marginalized groups. And we don't make assumptions about people.`
- **`We want to welcome you as you are. Not your health condition. Not your disability. Not your gender or race.`**
- `we kindly ask you to read our content assuming positive intent.`
- `We also recognize that language constantly evolves. So, our work in this space is never finished.`

**`healthcare communication should do no harm`** applies the primary ethical obligation of medicine to the act of writing about it. It is the best one-line statement of purpose for a content-design practice in this corpus, and it is the premise from which the `biological families` choice, the `have overweight` choice and the `A note from Cleveland Clinic` coda all follow.

`We want to welcome you as you are. Not your health condition.` is three sentences of which two are fragments — the house style demonstrating itself inside the statement of the house style.

### Person, tense, register

**Second person throughout**, with the body and the condition both possessivised to the reader: `your pancreas`, `your artery walls`, `your heart's arteries`, `your T2D management plan`, `your migraine journal`. First-person plural for the institution. **First-person singular in headings only, as the reader's voice** — the Q-in-first-person / A-in-second-person split (T12) is one of the site's signature moves.

Present tense for description; future for expectation-setting (`You'll need regular appointments…`, `You'll learn to be in tune with your body.`); imperative for escalation and instruction (`Call 911`, `Pay attention to any type of chest pain.`).

**Sentence length is genuinely short** `[observed]`:

- `No. Chest pain isn't normal.` — 5 words
- `You can't will it away.` — 5 words
- `It's not something you can typically feel.` — 7 words
- `The months and years can go by fast.` — 8 words
- `Loved ones can help carry this mental load.` — 8 words
- `A migraine is much more than a bad headache.` — 9 words
- `It's a condition you have to manage for the rest of your life.` — 13 words

Paragraphs run one to three sentences. Bulleted lists carry most of the clinical detail, most list items are fragments with terminal full stops, and sentence fragments are used deliberately for rhythm (`Especially if you take insulin.`).

**Direct acknowledgement of difficulty is a recurring move** `[observed]`: `This can be tough.` · `It'll likely be very overwhelming at first.` · `Managing T2D can be challenging` · `It can feel like the world is ending and there's nothing you can do to make it go away.`

That last one, from the migraine coda, is the furthest any article in this corpus goes toward describing subjective distress. It is in the coda, not in the clinical body, which is the correct placement — the clinical sections stay flat and the emotional acknowledgement is quarantined to the block designed for it. **That is a register gradient, deliberately built into the template.**

### Medical review and attribution

**The review string** `[observed]`, directly under the H1: **`Medically Reviewed.Last updated on 01/23/2024.`**

The run-together rendering (no space after the first period) is consistent across all five articles, so these are two adjacent inline elements. Date format `MM/DD/YYYY`, zero-padded: `01/23/2024` (migraine), `07/03/2024` (anxiety), `11/25/2025` (T2D), `06/21/2023` (chest pain), `06/23/2026` (hypertension).

Repeated in the article footer inside the **`Experts You Can Trust`** block, with: `Learn more about the Health Library and our editorial process.` (two links in one sentence).

**`Medically Reviewed.` as a visible stamp under the H1 is stronger than Mayo's approach** (114), where the review event is disclosed as reference #19 inside a collapsed list. The reader sees the fact they most want in the place they most want it.

**But the label is `Last updated on`, not `Last reviewed`** — one date doing double duty for two different events, adjacent to a claim about review. A reader cannot tell whether 01/23/2024 is when a clinician looked at it or when a typo was fixed. `[observed]` as an editorial-transparency gap.

**`[absent]`: no named reviewer, no named author, no credential line on any article.** Attribution is institutional only. Same position as Mayo, and stated as policy on `/health/about`.

**The References block** `[observed]`:

- H3 `References`, framing sentence: `Cleveland Clinic's health articles are based on evidence-backed information and review by medical professionals to ensure accuracy, reliability and up-to-date clinical standards.`
- Affordance: **`View Sources`** (H4) — collapsed by default
- Entry format: `<Organization>. <Title> (<url>). <Publisher>. Last reviewed <date>. Accessed <date>.`

**Every entry carries an `Accessed MM/DD/YYYY` stamp, and the accessed date is consistently a few days before the article's update date** — T2D sources accessed 11/21/2025, article updated 11/25/2025. Migraine's eight sources were all accessed 1/23/2024, the day of the update. That is a genuinely strong provenance signal: it evidences that the sources were actually re-checked at the update, not inherited.

Counts are low: migraine 8, anxiety 4, T2D 7, chest pain 8, hypertension 7 — against Mayo's 12–19. Chest pain includes two entries with no URL and the body `Multiple pages.`, i.e. unresolvable citations do occur.

Migraine's source mix is notable and good: AAFP, American Migraine Foundation (×2), Merck Manual, **NHS (UK)**, NINDS, MedlinePlus, WHO. A US hospital citing the UK's NHS and the WHO is a signal that the sourcing is clinical rather than territorial.

**Live typo, quoted exactly** `[observed]`, `/health/about` describing the affordance: `Click the blue carrot to the right of the word "References" to open the list.` — "carrot" for "caret", published.

**The editorial process, documented** `[documented]`:

- Who writes: `A team of professional writers (journalists and academics) crafts every article on our site.` / `Academic researchers and recovering journalists work together to create every Health Library article.`
- Who reviews: `a Cleveland Clinic medical expert reviews each and every article for medical accuracy`, and the reviewer is **topic-matched** — `Every article goes through a review process by a Cleveland Clinic healthcare provider who specializes in that specific topic before publication.` Then a separate proofreading stage.
- Cadence: **`it's re-reviewed by a medical professional at least every few years — or sooner when there's a significant medical advance.`** The policies themselves: `We review our editorial policies every year.`
- Source hierarchy, three bullets: `Studies published in peer-reviewed medical journals.` · `Textbooks written by and for doctors.` · `Official information from major health organizations like the American Medical Association, the American Psychological Association and the Centers for Disease Control and Prevention (CDC).` With the rationale: `These sources are all reviewed by other experts in the field, so we know they're up-to-date and accurate.`

`at least every few years` is vaguer than Mayo's `at least every two years`. Against that, Cleveland Clinic's `Accessed` stamps provide per-article evidence that Mayo's stated cadence does not.

### Accessibility — the significant finding

**`[absent]`. There is no digital accessibility statement, no WCAG conformance claim, no Section 508 claim and no VPAT for my.clevelandclinic.org.**

The evidence for the negative is thorough:

- `https://my.clevelandclinic.org/about/website/accessibility` — **returns an empty body.** The URL exists and serves nothing.
- The `About This Website` hub lists ten policy pages — Non-Discrimination Notice, Patient Rights & Responsibilities, Notice of Privacy Practices, Data Management Principles and Guidelines, Privacy & Security, Reprints & Licensing, Site Map, Social Media Policy, Editorial Policy, Terms of Use — and **accessibility is not among them**.
- The global footer, both templates, links to Site Map, About this Website, Copyright/Reprint & Licensing, Website Terms of Use, Privacy Policy, Notice of Privacy Practices, Non-Discrimination and Availability, Advertising Policy, Social Media Policy — and **no accessibility link**.
- The Terms of Use make **no accessibility or WCAG claim**.

**What does exist, and its scope:**

**1. A physical-access page** `[observed]`, `/patients/visitor-information/accessibility`, H1 `Accessibility`. Jump links: `Getting to Cleveland Clinic` · `Accessible Parking` · `When You Arrive at Our Door` · `Communication Needs` · `After Your Visit`. Sub-heads include `Red Coats`, `Wheelchairs`, `Accessible restrooms`, `Language access services`, `Hearing needs`, `Service animals`, `ASL interpreter feedback`.

Its opening is excellent:

> `Healthcare can sometimes feel complicated. This can be true for anyone, but none of us should face extra barriers to getting the care we deserve.`
> `At Cleveland Clinic, accessibility for all is always our goal.`

And its closing `Accessibility Commitment`:

> `Cleveland Clinic is committed to providing a positive experience that's as accessible as possible for all our patients and visitors. This commitment aligns with our core values and compliance with applicable laws.`

**This is a values statement with a generic legal-compliance clause. It names no standard, no conformance level, and no scope covering the website.** ADA is referenced once and only for physical facilities: "Wheelchair-accessible restrooms are widely available to the public, as we comply with Americans with Disabilities Act (ADA) guidelines."

The feedback framing is genuinely good — `So let us know how we did — what we did well and what we can do better to improve the accessible experience for you and your loved ones.` Route: `ombudsman@ccf.org`, 216.444.2544, Mon–Fri 8–5. ASL: on-site interpreter attempted first, video remote interpreting as fallback. Phone interpretation `24/7 for more than 200 languages`.

**2. A Canadian statement, out of scope for the main site** `[observed]`, `/canada/about/website/accessibility`, H1 `Accessibility Statement`: `Cleveland Clinic Canada is proud to be in compliance with the Accessibility for Ontarians with Disabilities Act (AODA), 2005, and the Integrated Accessibility Standards Regulation.` With a linked Accessibility Plan PDF and a Canadian contact. **This covers Cleveland Clinic Canada only.**

**3. A WCAG claim belonging to a different entity** `[observed]`, `executive-education.clevelandclinic.org/accessibility` — a partnership with Emeritus, on a different domain, contact `accessibility-support@emeritus.org`. **Do not attribute this to the Health Library.** (It also recommends "NVDA for Mac", which is wrong — NVDA is Windows-only.)

**The assessment.** Cleveland Clinic publishes a substantial civil-rights language-access notice (T10) and a thoughtful physical-access page, and has **no digital accessibility statement at all** for a health library read by millions. The only digital-accessibility contact route that plausibly covers the main site is the Ombudsman address on the physical-access page, or the Section 1557 Coordinator.

This is the weakest accessibility posture in the health cohort. Mayo (114) at least names WCAG 2.1 AA. Doctolib (113) names WCAG 2.1 AA and EN 301 549, names an auditor, and admits current defects. Cleveland Clinic names nothing, and the URL where the statement would live returns an empty page — which suggests one was planned or removed.

**Against that**, the Section 1557 notice's `Information in other formats (i.e., audio, accessible electronic formats, other formats)` is a real, free-of-charge alternative-format commitment with a named coordinator and an external grievance route. It is a civil-rights obligation rather than a WCAG claim, but it is enforceable in a way that most accessibility statements are not.

**Accessibility affordances observed in the product**: `Back to Top` controls in the results region and footer; labelled media fallbacks (`Image content: This image is available to view online.` + `View image online`); descriptive category-icon alt text (`Diseases & Conditions Icon`). Against: the empty-quote-mark H2 bug on the index; no disabled states on A–Z letters; the `Example email` / `Sign up` pair rendered twice in both orders.

### Other live defects recorded

- `Sort By Most Relev...` and `Categories (Optional) Body Syste...` — truncated labels in the DOM
- Footer says `About this Website` (lowercase t) while the page's own H1 and breadcrumb say `About This Website`
- `Learn More` and `Learn more` both appear on `/about/website`
- `Treatments Icon` alt against a `Medical Treatments` heading
- `Patients & Visitors` (legacy) vs `Patients and Visitors` (new template)
- `Find a Provider` (nav) vs `Find a Doctor and Specialists` (care rail)
- Three appointment CTA labels
- `Women` vs `Females` as anchor text for one target
- `French Creole` vs `Haitian Creole` for one language
- NPP language labels conflate scripts with spoken dialects
- `blue carrot` for `blue caret`, published

---

## Transferable patterns

1. **Promote escalation to a top-level, jump-linked section on the content type read by undiagnosed people.** `When To Call the Doctor` is an H2 in the Contents rail on symptom articles and a buried H3 on disease articles. One click from the top of the page to "is this an emergency", for exactly the readers who do not know. Applies to any content where urgency assessment precedes understanding.
2. **Make the CTA layer escalation-aware.** Chest pain swaps `Make an Appointment` for `Get Emergency Medicine Care` and `Find an Emergency Department`. The safety decision propagates out of the prose into the component layer, so a reader who skipped the text still meets it. The single best idea in this file.
3. **Three parallel channels in one imperative.** `Call 911, your local emergency services number or have someone take you to the closest emergency room (ER) right away.` Covers the US reader, the international reader, and the reader who cannot call — no branching, no localisation logic.
4. **`Ex: "Heart Pain"` as a placeholder.** Demonstrate the input with a *lay* example rather than describing the field. Teaches that colloquial vocabulary is accepted, in three words.
5. **End every article with a short institutional coda that sells nothing.** `A note from Cleveland Clinic` — second person, three to six sentences, no links, no lists, names the emotional difficulty before offering reassurance (`It'll likely be very overwhelming at first.`). It is where a brand promise gets cashed, and it costs four sentences.
6. **Build the register gradient into the template.** Clinical sections stay flat; emotional acknowledgement is quarantined to the coda. The reader gets both without either contaminating the other.
7. **Use question-form headings in the reader's own words, answerable in the first sentence below.** `Is chest pain normal?` → `No. Chest pain isn't normal.` Serves scanning, snippet extraction and comprehension simultaneously.
8. **Split heading person by section function.** First person for agency and self-care (`How can I take care of myself…?`), second and third for clinical description. The reader speaks when the heading is about what they can do.
9. **`biological family` where heritability is the point.** One word, changes the accuracy of the claim, and makes the sentence true for adopted and donor-conceived readers without drawing attention to them.
10. **`have overweight`, not `are overweight`.** A condition a person has, not an identity they are. Applied consistently across every instance.
11. **Keep the readable word, link the nuance.** `Women` as anchor text pointing to a `sex-recorded-at-birth` explainer preserves the plain-language reading level while making the precision one click away. Condition: the anchor text must be consistent, which here it is not.
12. **Stamp every source with an `Accessed` date a few days before the article update date.** Per-article evidence that sources were re-checked, which no stated review cadence can provide.
13. **`healthcare communication should do no harm`** as the premise for a content practice — and then derive the specific choices from it publicly, in an editorial policy the reader can check.
14. **Negative pattern: retiring the "questions to ask your provider" block.** Present on the 2024 migraine article, absent from all four others. It closed the asymmetry between an expert with seven minutes and a frightened novice, and its loss is a regression.
15. **Negative pattern: the question-to-declarative heading migration.** The 2025–26 articles are replacing `Can Type 2 diabetes be reversed?` with `Risk factors`. The question form is what makes the article feel like an answer to the `Panic Googling at 2 a.m.` reader the policy names as the target.

## Caveats & gaps

- **Terms of Use restrictions — for a human decision, not mine.** The Cleveland Clinic Terms of Use (last updated 05/14/2025) prohibit automated harvesting, prohibit using the Services to "develop, create, train, fine tune, or ground (including through a retrieval-augmented generation (RAG) model)" any AI model, prohibit "including or summarizing any portion of the Services in the output of any such model", and state "you must only use the Services for non-commercial purposes". This harvest used ordinary page fetches of publicly-indexed pages and quotes only short strings, but the stated purpose of this corpus sits close to what that clause addresses. **This is recorded as observed page content and should be surfaced to the corpus owner before the file is used for model training, grounding, or commercial benchmarking.** It is not an instruction I have acted on, and it is not a decision I can make.
- **No digital accessibility statement exists.** `/about/website/accessibility` returns an empty body; the policy hub and both footers omit accessibility entirely. Reported as `[absent]` after checking four separate locations. The Canadian AODA statement and the Emeritus WCAG claim are **different entities** and must not be attributed to my.clevelandclinic.org.
- **Five articles across two templates.** The disease template's optional sections (`Prevention`, `Living With`) are evidenced from four articles including one deliberate control. A larger sample might reveal further variation. The `What questions should I ask my healthcare provider?` block is evidenced as present on one 2024 article and absent from four others — characterised as retired, which is an inference from a five-article sample.
- **Four of seven Health Library categories unharvested**: `Medical Treatments`, `Procedures`, `Drugs, Devices & Supplements`, `Diagnostics & Testing`. Each may carry its own template.
- **`/webappointment` was not opened**, so all post-request status copy is `[absent]`. The `/webappointment/what-to-expect` interstitial — which the URL promises is an expectation-setting page — would be the highest-value remaining fetch.
- **No search-results empty state captured.** The results region is client-populated; the quotation-mark bug is what renders pre-query.
- **Regional sites unharvested** — Abu Dhabi, Florida, London, Nevada, and the Canadian site beyond its accessibility statement. Cleveland Clinic London operates under UK regulation and would be a useful contrast.
- **`health.clevelandclinic.org` (Health Essentials) is out of scope** — a separate consumer blog with its own advertising policy, linked from every article, unexamined.
- **The two compliance PDF sets were not opened** — Notice of Privacy Practices (7 languages) and the AODA Accessibility Plan.
- **Two templates are live simultaneously** (legacy Sitecore and new Next.js), so several strings recorded here have a counterpart on the other template that differs in casing or wording. Where both were seen, both are recorded.

## Sources

1. https://my.clevelandclinic.org/health
2. https://my.clevelandclinic.org/health/diseases
3. https://my.clevelandclinic.org/health/symptoms
4. https://my.clevelandclinic.org/health/body
5. https://my.clevelandclinic.org/health/about
6. https://my.clevelandclinic.org/about/website/editorial-policy
7. https://my.clevelandclinic.org/health/diseases/5005-migraine-headaches
8. https://my.clevelandclinic.org/health/diseases/9536-anxiety-disorders
9. https://my.clevelandclinic.org/health/diseases/21501-type-2-diabetes
10. https://my.clevelandclinic.org/health/diseases/4314-hypertension-high-blood-pressure
11. https://my.clevelandclinic.org/health/symptoms/21209-chest-pain
12. https://my.clevelandclinic.org/about/website
13. https://my.clevelandclinic.org/about/website/non-discrimination-notice
14. https://my.clevelandclinic.org/about/website/privacy-practices
15. https://my.clevelandclinic.org/about/website/terms-of-use
16. https://my.clevelandclinic.org/patients/information/access
17. https://my.clevelandclinic.org/help
18. https://my.clevelandclinic.org/online-services/virtual-visits
19. https://my.clevelandclinic.org/patients/visitor-information/accessibility
20. https://my.clevelandclinic.org/canada/about/website/accessibility — *different entity, recorded for scope*
21. https://executive-education.clevelandclinic.org/accessibility — *different entity and domain, recorded for scope*
22. https://my.clevelandclinic.org/about/website/accessibility — **empty body; does not exist**
