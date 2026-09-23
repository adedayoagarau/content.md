# 200. Service NSW

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | State government service portal (New South Wales, Australia) — single front door for state transactions |
| Primary URL | https://www.service.nsw.gov.au/ |
| Corpus rank | 200 |
| Benchmark strength (source list) | Public-service task navigation |
| Locale / market observed | en-AU (Australian English, Macquarie Dictionary as the stated authority) |
| Platform observed | Web (desktop). Plus the NSW Digital Design System (designsystem.nsw.gov.au) and the Digital NSW content guidance (digital.nsw.gov.au) that governs it. |
| Auth state | Unauthenticated public surfaces only. **No sign-in, no MyServiceNSW Account created, no transaction started, no NSW Digital ID set up, no personal or identity data entered anywhere.** |
| Regulatory posture | **Disability Discrimination Act 1992 (Cth)** is the cited legislative basis for accessibility; Digital NSW additionally names the **Fair Work Act 2009 (Cth)**, the all-of-Government **Disability Inclusion Plan**, and the Australian standard **AS EN 301 549**. Conformance claims differ by page: Service NSW claims an **audited pass against WCAG 2.1 AA** (auditor named: AccessHQ); the design system's components claim **WCAG 2.2 AA**; nsw.gov.au claims "the latest standard… at an AA level". Service NSW also cites the (superseded) **Web Accessibility National Transition Strategy** and the Commonwealth **Digital Service Standard**. Privacy statement, Terms of use, Complaints Policy and Vulnerability disclosures are published under `About us`. |
| Harvest date | 2026-09-22 |
| Pages inspected | 30 (Service NSW) + 20 (NSW Digital Design System / Digital NSW content guidance) |
| Harvest completeness | **Full** for task navigation, task-page templates and the published content standard. Three surfaces were blocked or non-existent: there is no `/transaction` index, no `/campaign/cost-of-living` hub, and **no 404 or service-unavailable copy could be captured** (both a deliberately bad URL and `/error.html` returned empty bodies). `sitemap.xml` truncated at ~453 lines, so the transaction count below is a verified floor, not a total. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.service.nsw.gov.au/ | Welcome, popular pages, topic finder, featured, business, guides |
| Find services | https://www.service.nsw.gov.au/services | The 12 categories + quick links |
| Services topics A–Z | https://www.service.nsw.gov.au/services/view-all-topics | 214 counted topic links |
| Task: Renew or upgrade a NSW driver licence | /transaction/renew-or-upgrade-a-nsw-driver-licence | Fullest instance of the task template |
| Task: Apply for a NSW Seniors Card or NSW Senior Savers Card | /transaction/apply-for-a-nsw-seniors-card-or-nsw-senior-savers-card | |
| Task: Apply for an Active and Creative Kids voucher | /transaction/apply-for-an-active-and-creative-kids-voucher | |
| Task: Claim the toll relief rebate – $50 weekly cap | /transaction/claim-the-toll-relief-cap | Only task page with an `On this page` TOC |
| Task: Check your demerit points | /transaction/check-your-demerit-points | Template deviation — no `Eligibility` |
| Task: Settle in NSW | /transaction/settle-in-nsw | Programme name used as a task title |
| Category: Driver and rider licences | /services/driver-and-rider-licences | Verb-cluster grouping headings |
| Category: Vehicle registrations | /services/vehicle-registrations | |
| Category: Concessions, rebates and assistance | /services/concessions-rebates-and-assistance | |
| Category: Births, relationships and deaths | /services/births-relationships-and-deaths | The hollowed-out category |
| MyServiceNSW Account help topics | /services/myservicensw-account | Account-recovery task titles |
| NSW Digital ID | /services/nsw-digital-id | |
| Common questions: NSW Digital ID | /common-questions/nsw-digital-id | |
| Savings Finder | /services/savings-finder | |
| Vouchers | /services/vouchers | |
| Service NSW mobile app | /services/service-nsw-mobile-app | |
| Service NSW online services | /services/service-nsw-online-services | |
| What you can report | /services/what-you-can-report | 15 `Report a…` tasks |
| Guides | /guide | |
| Guide: Data breaches | /guide/data-breaches | The only genuine FAQ set on the site |
| Guide: Moving house | /guide/guide-to-moving-house-and-changing-your-details-with-nsw-government-agencies | |
| Contact us | /contact-us | |
| About us | /about-us | |
| Performance dashboard | /performance-dashboard | Site-stated numbers |
| Accessibility | https://www.service.nsw.gov.au/accessibility | The statutory statement |
| NSW Design System | https://designsystem.nsw.gov.au/ | v3.27.0; component content rules |
| Digital NSW: Writing content | digital.nsw.gov.au/…/resources-and-guides/writing-content | Content style guide + Content 101 + Content design |
| Digital NSW: Your responsibilities (accessibility) | digital.nsw.gov.au/delivery/accessibility-and-inclusivity-toolkit/your-responsibilities | |
| — blocked — | /transaction · /campaign/cost-of-living · /error.html · digital.nsw.gov.au/…/resources/content-guide · /digital-design-system/foundations | Empty bodies |

---

## T1 Navigation & IA labels

**Caveat**: the fetch route returned only the main-content region, so the rendered header
nav bar and site footer were never in the response body, and the decoupled menu endpoint
(`/system/menu/main/linkset`) is empty. The header and footer chrome is therefore **not
quoted here** rather than guessed.

**The 12 main service categories** `[observed]`, site-stated as such —
"Our transactions are organised around 12 main services categories, by topic or service
area":

`Driving and transport` · `Concessions, rebates and assistance` ·
`Employment and industries` · `Boating, fishing, recreation and outdoors` · `Business` ·
`Emergencies and natural disasters` · `Legal and Police services` ·
`Births, relationships and deaths` · `Education and training` · `Housing and property` ·
`Health and care` · `Environment, parks and wildlife`

All twelve are noun phrases. `Legal and Police services` carries a mid-phrase capital P,
breaking the NSW sentence-case rule inside an official category name.

**The homepage renames the same categories into benefit-led phrasing** `[observed]` — two
parallel taxonomies for one set of destinations:

| Category label | Homepage label |
|---|---|
| `Business` | `Business: licences, personalised support and resources` |
| `Employment and industries` | `Worker checks, trade and industry licences and certifications` |
| `Legal and Police services` | `Firearms and security licences, legal and police services` |
| `Boating, fishing, recreation and outdoors` | `Recreational fishing licences, boat, vessel and trailer registrations` |
| `Concessions, rebates and assistance` | `Seniors, carers and pensioners` |
| `Emergencies and natural disasters` | `Help in an emergency` |
| `Housing and property` | `Property, land tax, waste and recycling` |
| `Health and care` | `Help for mental health problems, carer services` |

The homepage labels are **keyword runs naming the actual things people look for**; the
category labels are **abstract domains**. It is the same trade-off Canada.ca makes, resolved
the opposite way on each surface, and it means the scent of information breaks between the
homepage and the destination (see defects).

**Homepage section headings** `[observed]`: `Welcome to Service NSW` · `Popular pages` ·
`Community support hub` · `Find a service by topic` · `Featured services` ·
`Start or grow your business in NSW` · `Guides and resources` · `Log in`.

**Within-category grouping headings are verb clusters, not nouns** `[observed]` — the single
best IA decision on the site:

- Vehicle registrations: `Check registration or vehicle history` · `Buy, sell, transfer, change or cancel` · `Renew, register, replace` · `Vehicle inspections and safety checks` · `Fees, concessions and toll relief` · `Other registrations and permits`
- Driver licences: `Renew, replace or reissue` · `Get a licence` · `Safe driving and losing your licence` · `Interstate or overseas` · `Change or cancel` · `Access your records`

A user scanning `Renew, replace or reissue` / `Change or cancel` / `Access your records`
self-routes on **what they want to do**, not on what object they own. And
`Safe driving and losing your licence` names the punitive outcome in a browse heading
rather than hiding it.

**Second-level topic labels** `[observed]`: `Driver and rider licences`,
`Vehicle registrations`, `Notice of disposal`, `Demerits`, `Fines`, `Number plates`,
`Heavy vehicles`, `Toll relief`, `FuelCheck app`, `Active and Creative Kids voucher`,
`Energy rebates and EAPA`, `Disability assistance`, `Community services`,
`Disaster support`, `Worker checks`, `Building and construction`, `Hospitality (RSA/RCG)`,
`Fishing licences`, `Boating licences`, `Paintball`, `Hunting`, `Firearms`.

**Cross-cutting blocks** `[observed]`: `Quick links` · `More topics` · `Related information` ·
`Related transactions` · `Links` · `Documents` · `Cost of living support`.

**Persistent utility on every page** `[observed]`: `Listen` (title:
"Listen to this page using ReadSpeaker") · `Back to top` · a `Last published: <date>` stamp
(e.g. `Last published: 10 September 2026`).

A page-level **text-to-speech control on every page** is unusual and worth noting as an
accessibility affordance in the chrome rather than in a settings menu.

**Breadcrumb** `[observed]` root is always `Home`; second level is usually `Find services`.

**`About us` exposes the policy tree** `[observed]`: `Our organisation` ·
`Our leadership team` · `Our services` · `Digital capabilities for NSW Government agencies` ·
`Performance dashboard` · `News` · `Contact us`, with `Privacy statement`, `Terms of use`,
`Accessibility (Service NSW website)`, `Service NSW Complaints Policy` and
`Vulnerability disclosures` as children.

## T2 Value proposition & headline patterns

**Homepage heading** `[observed]`: `Welcome to Service NSW`. A greeting, not a claim.
The nearest thing to a value proposition is the brand line used on landing and campaign
pages: **`Making life easier`**, and on the Digital ID page the three-part
`More convenience` / `More security` / `More privacy`.

**Benefit-led register appears only on campaign surfaces** `[observed]`:
"There's help with everyday expenses." · "Cut the paperwork – just click, verify and go" ·
`Be one of the first to get a NSW Digital ID`. Everywhere else the register is flatly
procedural. The tone gradient is by surface, not by stakes.

**Directness on sensitive topics is the site's strongest tonal feature** `[observed]`:

> "You have a right to be safe. Domestic and family violence is never okay – there is no excuse. If you feel unsafe, reach out."

and

> "If you feel you are at risk of immediate danger call NSW Police 000."

Second person, unhedged, no bureaucratic distance, with the emergency number inline. A state
transaction portal writing "there is no excuse" is a deliberate editorial choice.

**Task-page standfirsts are one sentence of scope, not persuasion** `[observed]`. The
convention is to state what the transaction covers and who it is for, then move immediately
to `Eligibility`.

## T3 CTA inventory

**The primary transaction button is client-rendered and was not in the fetched HTML — but
every task page names its own button inside step 2 of its `How to` list**, so the labels are
recoverable verbatim `[observed]`:

- `Select the 'Renew or upgrade licence' button.`
- `Select the 'Apply online' button.` — used on **both** the Seniors Card and the voucher
- `Select the 'Check online' button.`
- `Select the ‘Claim online’ button.`
- `Select the ‘Book an appointment’ button.`
- `Select the 'Create your NSW Digital ID' button on this page.`

**The primary-CTA convention is `<task verb> online`** — `Apply online`, `Check online`,
`Claim online` — with the channel word doing the disambiguation. Exceptions are compound
tasks (`Renew or upgrade licence`) and appointments (`Book an appointment`).

**The instruction verb is `Select`, never `Click`** — compliant with the published NSW rule
(see T14 for where the site breaks it).

| Other CTA (verbatim) | Context |
|---|---|
| `Find out more about Small Business Advisory` / `…about toll relief` / `…about the Settle in NSW program` | Homepage promo cards — always `Find out more about <named thing>`, never bare |
| `Account login` · `Change online` · `How to apply` · `How to replace your ID` · `Book online` · `Get a fishing licence` · `How to check` · `Buying a vehicle` | Homepage utility tiles |
| `View an A to Z list of topics` | Services |
| `View all Driving and Transport` / `View all Concessions, rebates and assistance` | Category pages — title case vs sentence case in one component |
| `Browse all guides` · `Search the Service NSW website` | |
| `Get started` · `Manage and grow` · `Find resources` · `Speak to a business specialist` | Business block |
| `Find a centre` · `Find a location` · `Contact us` · `Book an appointment` · `Call TIS` | Repeated help block |
| `Claim toll relief rebate` · `Apply for a HRWL` · `Create your NSW Digital ID` · `Common questions about the NSW Digital ID` | Digital ID page |
| `Learn more` (licence holders) / `Get started` (licence checkers) | Digital Driver Licence page — the one bare `Learn more` found |
| `Download on the App Store` · `Get it on Google Play` | App page |
| `Get started with Savings Finder` · `Go to Service Seeker` · `Help with food and essentials` | Savings Finder |
| `Listen` · `Back to top` | Every page |

**Defects** `[observed]`: `Get started` points at two unrelated destinations (business
onboarding; Digital Driver Licence checker onboarding). `How to apply`, `How to check` and
`How to replace your ID` are used as **button labels** on the homepage while being **section
headings** on the destination task pages — one string doing two jobs. And `Find a centre` /
`Find a location` / `Find a Service NSW location` / `service centre locator` are four labels
for one destination.

## T4 Onboarding & getting-started

There is no product onboarding on the public surface. The equivalent is the **`How to <verb>`
numbered step list** on every task page, and the **`Guides`** content type.

**Guides** `[observed]` are cross-agency, life-event-shaped narratives that sit outside the
transaction tree — e.g.
`Guide to moving house and changing your details with NSW Government agencies` and
`Data breaches`. They exist precisely where a single transaction cannot serve the user,
and they are the site's answer to Canada.ca's `Manage life events`.

**Time and channel are disclosed before commitment** `[observed]` on task pages, via the
`What you need` section, which is always positioned *before* `How to apply` — the user
assembles documents before they start, not mid-form.

## T5 Question & form design — **PRIORITY**

Service NSW exposes no public form, so this section is built from the **published NSW
Digital Design System and Digital NSW microcopy guidance**, plus the eligibility and
`What you need` content on live task pages.

### Published form-content rules `[observed]`

- "Form labels define what the user needs to enter into the field., or what they need to select…" *(sic — `field.,`)*
- "Where the user needs to make a choice, be brief and specific."
- "Use labels on buttons and forms that are clear and easy to understand. Always aim for short, concise labels, but don't sacrifice clarity for a shorter label."
- "Use sentence case for labels." Do: `Log in`, `Sign up`, `First name`. Don't: `Log In`, `Sign Up`, `My first name is:`
- Don't "use all caps".
- Do "mark form fields as required or optional" · "use top aligned labels so forms are easier to scan and complete, including on mobile" · "keep forms to one column" · "use input constraints for fields with a defined character count, such as phone numbers and postcodes". Don't "hide helper text".

### Help text — the clearest published rules in this batch `[observed]`

- "Help text must be informative and useful. It can reduce the number of errors the user makes and reassure them by validating their actions."
- "Don't add help text where something is obvious."
- "Don't repeat what is already on the screen."
- "Use help text if data must be entered in a specific format."

Two published worked examples:
`Date of birth` — "Use the format DD/MM/YYYY."
`Medicare individual reference number` — "Number to the left of the name on your card."

The second is the transferable one: help text that tells you **where on the physical
artefact to look**, rather than what the field means. For any form asking for a number
printed on a card, document or statement, "where to find it" beats "what it is."

### Instruction text `[observed]`

"Users don't want to read long instructions on how to complete a single task." Model
example: "Answer the following questions to check your eligibility for an Owner-builder
permit."

### Mandatory-language rules `[observed]` — a three-way split

- "Use **need** — When a step is required but has no legal penalty." → "You'll need to provide a copy of your birth certificate."
- "Use **must** — When describing a legal requirement." → "You must have a valid driver licence."
- "Use **legally required / entitled / responsible** — When additional emphasis or legal clarity is needed."

Same structure as Canada.ca's `must`/`need to` split, with a third tier for explicit legal
framing.

### Button-label rules `[observed]`

- "Button labels should be an actionable description of what happens when the use selects the button." *(sic — "the use")*
- "The text should not wrap over more than one line."
- "Buttons should be used if there is an action performed. For navigating users to different pages… use a text link instead."
- Variants by role: "Brand buttons are for the page's primary user action (call to action)"; "Outlined buttons are used for secondary call to actions"; "Danger buttons… used to confirm a destructive action, such as delete".
- "make calls to action descriptive and state the intent of the action"
- No character or word limit is published.

### Live eligibility content — **the strongest live pattern on the site** `[observed]`

Four lead-in variants for the same job, across four task pages:

- `You may be eligible to renew and/or upgrade your licence online, if:` (driver licence)
- `You must be:` (Seniors Card)
- `To be eligible for the voucher, a child must be:` (voucher)
- `You may be eligible if you:` (toll relief)

Criteria are **sentence fragments that grammatically complete the lead-in**, second person,
present tense, lowercase initial, no terminal punctuation until the last item. Driver
licence, verbatim:

- "you meet the eyesight requirements"
- "you hold an eligible driver licence that will expire in 6 months or less, or expired no more than 6 months ago"
- "you're aged 17 years or over (up to 70 if your licence class is MC)"
- "your licence is not subject to any restrictions related to enforcement"
- "you've had your signature and photograph taken by TfNSW within 10.5 years before the new licence expires"

Seniors Card, verbatim: "aged 60 or over, or will be turning 60 within 3 weeks" ·
"living in NSW" · "an Australian citizen or permanent resident" ·
"not working at all or averaging 20 hours or less a week of paid work across a 12-month
period".

**Exclusions are given their own heading rather than being mixed into the list** `[observed]`:
`Reasons you may not be able to renew or upgrade online` ·
`Toll spend you cannot claim` · `Activities you cannot use the voucher for`.
Exclusion lists are also fragment-continuations: "on vehicles registered for business use" ·
"that are reimbursed by an employer" · "on suspended or closed NSW toll accounts".

This is the same decision HealthCare.gov and Canada.ca make independently — **negative
eligibility gets a heading, not a footnote** — and Service NSW executes it most cleanly,
because the heading names the *thing* excluded (`Toll spend you cannot claim`) rather than
the abstract state.

## T6 Status & state language

`[observed]` — Service NSW runs an unusually explicit availability and lifecycle vocabulary,
driven by time-boxed rebates and vouchers:

- `Voucher 1 – 2026: Available now` / `Voucher 2 – 2026: Available now`
- `Claim expires` · `Claim expired` · `Expired claim periods` · `3-month claim period opens` · `3-month claim period opened`
- `Not eligible: less than $50 weekly minimum` · `Eligible: more than $50 weekly minimum` · `Eligible: maximum weekly rebate reached`
- "we will put your claim on hold temporarily"
- "After your claim is approved you receive your payment within 10 to 15 business days."
- "Your Service NSW app will show the voucher as being used."
- "The NSW Digital ID is now in pilot."
- "If you have not received your card within 15 business days, please call us on 13 77 88."

**The `Eligible:` / `Not eligible:` prefix pattern** in the toll-relief examples is worth
noting: the state name is prefixed to the *reason*, so a scanned table row reads as a verdict
plus its cause in one string.

**Published status-label rules from the design system** `[observed]` — the most precise
status-vocabulary guidance in this batch:

- "use clear labels with short, scannable text (single words where possible)"
- **"use adjectives rather than verbs so the user doesn't think that clicking them will perform an action"**
- "place status labels as close to the element as possible"

With a published vocabulary per severity: Information — "new, coming soon"; Success —
"available, approved, completed etc"; Warning — "missing information, expiring soon etc";
Error — "expired, failed, cancelled etc"; Neutral — "inactive, not available, not provided
etc". And a boundary rule: avoid using status labels "to filter content, consider tags".

**"Use adjectives rather than verbs" for status labels** is the single most reusable
micro-rule in this file. It is the reason `Approved` works as a status and `Approve` does
not, and almost no design system states it.

## T7 Error, failure & recovery — **PRIORITY**

### Published error-message rules — Service NSW's governing standard `[observed]`

- "Error messages should tell users what's wrong and how to fix it (if appropriate)."
- **"Take responsibility when something goes wrong. 'We couldn't…' rather than 'You failed…'"**
- "Messages are polite, logical and easy for users to understand. Maintain a friendly tone and informal style as much as possible."
- "Avoid passive voice. Passive voice can sound robotic."
- "Don't use redundant words." · "Don't over-use 'please'." · "Use contractions to sound more conversational."
- **"Do not use exclamation marks."**

Published worked pairs:

| Do | Don't |
|---|---|
| "We couldn't change your password." | "Your password could not be changed" |
| "The details you entered don't match our records. Please check your ABN or ACN and try again." | "Your ABN or ACN is incorrect." |
| — | "Error!" |

The Do/Don't pair on ABN is the instructive one: the rejected version
("Your ABN or ACN is incorrect.") asserts the user is wrong; the accepted version
("The details you entered don't match our records.") asserts only a mismatch, and then gives
two actions. **Same fact, no accusation** — and it is honest, because a mismatch may be the
system's record that is stale.

**Six named message types** `[observed]`: `Important information` · `Warning` · `Error` ·
`Field validation` · `Success` · `Loading and progress`.

**In-page alert severities, with published scope rules** `[observed]`:
- Information — "use for information the user should know, but is not critical"; "don't use as feedback about the outcome of a user action."
- Success — "use to inform the user that an action was performed successfully".
- Warning — "use to warn the user of a possible negative outcome"; "provide sufficient information to avoid the problem."
- Critical — "use where a system event has failed"; "use when the user has made an error"; "don't use for field-level validation or validation summary."
- Framing rule: **"What the message communicates matters more than whether it appears after an interaction."**
- "The alerts are not dismissible." · Don't "overuse alerts as this will erode their effectiveness".

**Global alerts are defined by their intrusiveness** `[observed]`: "Global alerts are
designed to capture the attention of the user in a deliberately intrusive way. They persist
over a session but are user dismissible…" · "reserve the use of the critical alert for
circumstances which warrant it" · "Do not display in response to an action initiated by a
user interaction or system event."

**Validation ordering rule** `[observed]`, which almost no design system publishes:
"When both types appear, structure them in the order users need to interpret them:
**user feedback first, followed by contextual feedback**." Plus:
"Multiple-field forms: use the compact alert inline, immediately after the field it relates
to." and "Associate the message with its field using `aria-describedby`."

### Live failure-adjacent content `[observed]`

**No 404 or outage copy could be captured** — `/error.html`, an invented URL, `/transaction`
and `/campaign/cost-of-living` all returned empty bodies through the permitted route.
`[absent]`

The closest live recovery content is the **MyServiceNSW Account help-topic titles**, which
are a good model — the problem stated as a task:
`Fix incorrect details` · `Resolve multiple accounts` · `Leaked passwords`
And on Digital ID: `If face verification did not work` · `NSW Digital ID on lost phones or
devices`.

**Bolded negation used for anti-fraud warnings** `[observed]`:
"If you miss the call **do not** call us back on that number – it cannot receive calls." and
"We will never ask to access your computer."

**Note the inconsistency inside the published standard itself**: the rule says "Don't
over-use 'please'" and its own approved example reads "…Please check your ABN or ACN and try
again."

### Published exclusion and non-claimable content

The live task pages give their exclusion sections their own headings (see T5), and the
toll-relief page adds `Auditing and investigations` — a section telling claimants their
claims may be checked. Consequence content placed on the claim page, not in terms and
conditions.

## T8 Empty states

`[absent]`. No empty state, no-results page or zero-data surface was reachable; search
results are `Disallow`-ed in `robots.txt` and were not fetched. The design system publishes
no empty-state component in the harvested set.

**Defect adjacent to this**: **the NSW Design System publishes no error-summary component or
pattern**, despite its own forms guidance instructing designers not to substitute an in-page
alert "for field-level validation or a **validation summary**" — the thing you are told not
to replace is itself undocumented. Every shipped validation example in the design system
uses the identical generic string `This field is required`, and every success example uses
`This field has been validated`, across text, date, select, checkbox and radio. So the
published error copy directly contradicts the published error rule
("tell users what's wrong and how to fix it").

## T9 Notifications & system messages

**Alert banner format** `[observed]`: an all-caps eyebrow followed by a bold headline —
`BUSINESS SUPPORT UPDATE` · `TOLL RELIEF UPDATE` · `FOR MIGRANTS AND REFUGEES` ·
`FOR NSW RESIDENTS` · `LEARNER DRIVERS` · `RESIDENTS AGED 60+` · `VOUCHER FOR FAMILIES`.

The eyebrow does double duty as an **audience filter** (`FOR MIGRANTS AND REFUGEES`,
`RESIDENTS AGED 60+`) or a **topic filter** (`TOLL RELIEF UPDATE`), so a user can skip a
banner that is not for them without reading the headline. That is a good pattern — but
all-caps sits awkwardly beside the NSW rule "Use capital letters sparingly" and the Easy Read
rule against "text in all capitals".

**In-page notice patterns** `[observed]`: `**Note:**` used pervasively (dozens of instances)
and `### **Important information**` on the contact page.

**Loading copy** `[observed]`: `Loading time delay` — "Please be patient, the graphs may take
a few seconds to load." (performance dashboard). One of the few loading strings in the
corpus, and it apologises rather than reassures.

**Callout rules from the design system** `[observed]`:
"Callouts are text excerpts, used as a visual cue to draw attention to content." ·
"Callouts should be short, easy to scan, informative and clear." ·
Don't "add multiple callout boxes to a topic. This dilutes the importance of the callout and
distracts the user." · "Do not rely on the pictogram alone to convey meaning."

## T10 Disclosures, legal & compliance

**Accessibility statement** `[observed]`, Service NSW (`Last published: 8 July 2026`):

- The conformance claim: "AccessHQ has audited the Service NSW website (service.nsw.gov.au) and the site satisfies all Level AA success criteria of WCAG 2.1."
- The expectation: "Government websites are expected to meet Level AA of the WCAG current standard as a requirement of the Web Accessibility National Transition Strategy and the Australian Government's Digital Service Standard."
- The legislation: "Under the *Disability Discrimination Act 1992*, Australian Government agencies are required to ensure that information and services are provided in a non-discriminatory and accessible manner."
- Reporting a barrier: "If you're having trouble accessing any information or service provided by Service NSW you can contact us by: submitting an online enquiry; calling us on 13 77 88."
- Content-adjacent claims: "our content makes use of simple paragraphs and lists for enhanced readability"; "our buttons are clearly labelled"; "we use alternative text for images".

**Assessment — this is the weakest accessibility statement in the batch.** It names an
auditor, which is good; it then makes an **unqualified pass claim** with:
no audit date, no known-limitations section, no exemptions, no remediation plan, no
statement-preparation date, no review cycle, no feedback SLA, and no enforcement body. It
also cites the **wrong tier of government** — Service NSW is a NSW state agency, and the
statement grounds its obligation in requirements for "Australian Government agencies" and
the Commonwealth Digital Service Standard, while omitting the instruments Digital NSW itself
names (AS EN 301 549, the all-of-Government Disability Inclusion Plan).

Compare the NHS statement, which lists every failure against its WCAG criterion number, and
the nsw.gov.au statement, which at least discloses one exception
("we may publish documents and publications received from third parties. These third party
documents may not follow the AA level standards").

**Digital NSW's own accessibility page is materially stronger** `[observed]`:
"Accessibility is a legislative requirement in the Disability Discrimination Act 1992 (Cth)
and a policy requirement in the all-of-Government Disability Inclusion Plan" ·
"the Australian standard AS EN 301 549 Accessibility requirements for ICT products and
services" · "the current version of the Web Content Accessibility Guidelines (WCAG) to level
AA for Government websites, web content and apps."
Reporting routes are named specifically: `digital.accessibility@customerservice.nsw.gov.au`
plus a "web accessibility report form".
And it publishes a risk-acceptance clause: "If you are unable to make your content
accessible and would still like to proceed with publishing, you are accepting the risks and
responsibility…" — governance-by-explicit-acceptance, which is an unusual and honest device.

**Design-system conformance boilerplate** `[observed]`, identical on every component page:
"All components are responsive and designed to comply with WCAG 2.2 AA accessibility
standards. **Full compliance depends on using and configuring the components correctly.**"
The second sentence is the honest part.

**Metadata policy** `[observed]`: "All web pages must have meta descriptions…" ·
"Do not exceed 150 characters including spaces." · "Use verbs and active voice." ·
"Make it compelling and keyword rich."

**Anti-fraud disclosure in contact content** `[observed]`: "We may call you during business
hours to:" (with reasons listed), "We will never ask to access your computer.",
"Keeping your personal information secure is as important to us as it is to you."

## T11 Content architecture & page templates — **PRIORITY**

### The transaction inventory

| Measure | Number | How it was established |
|---|---|---|
| `/transaction/` URLs in the retrievable part of `sitemap.xml` | **155 — a verified floor** | counted in the saved sitemap fetch, which truncated at ~453 of an unknown total |
| `<url>` entries visible before truncation | 446 | of which `/services/` 52, `/guide/` 22, `/service-centre/` 26 |
| Topic links on the A–Z page | **214** (196 top-level + 18 indented) | manual count across sections A–Y |
| Top-level categories | **12** | site-stated and independently verified |
| Rebates/vouchers via Savings Finder | **"more than 70"** | site-stated on `/performance-dashboard` |
| Service centres | **"over 120 service centres across NSW"** | site-stated |

So: **at least 155 distinct transaction pages, organised under 12 categories and 214 A–Z
topic entries.** The true total is higher; it is reported as a floor rather than estimated.

### The task-page template — the most consistent in this batch

Observed spine, in order:

> `Introduction` → `Eligibility` → `What you need` → `How to <the page's own verb>` →
> [topic-specific sections] → `Links` → `Related transactions`

Instances:

| Task page | Sections, in order |
|---|---|
| `Renew or upgrade a NSW driver licence` | Introduction · Eligibility · Eyesight requirements · What you need · How to renew or upgrade online · Reasons you may not be able to renew or upgrade online · More information · Payment methods · Documents · Links · Related transactions |
| `Apply for a NSW Seniors Card…` | Introduction · Eligibility · What you need (sub: Proof of identity) · How to apply · Digital card · Links · Related transactions |
| `Apply for an Active and Creative Kids voucher` | Introduction · Eligibility · What you need · How to apply · How to use your voucher (sub: Share a voucher, Unused value) · Links · Related transactions |
| `Claim the toll relief rebate – $50 weekly cap` | On this page · Introduction · Eligibility · What you need · How to claim · Be one of the first to get a NSW Digital ID · Toll spend claim examples · Auditing and investigations · Links · Related transactions |
| `Check your demerit points` | Introduction · What you need · How to check · How demerit points work · More information · Contact |
| `Settle in NSW` | Introduction · What you need · How to book · More information · Links |

**The `How to` heading is always conjugated to the title verb** — `How to apply`,
`How to claim`, `How to check`, `How to book`, `How to renew or upgrade online`. The title
verb and the procedure heading agree, so the user's scent of information survives from the
category page through the task title to the step list. This is the cleanest template
discipline in the batch and the most directly copyable.

**Deviations, recorded** `[observed]`: `Eligibility` is omitted on `Check your demerit
points` and `Settle in NSW` (both are arguably universal, so defensible). Only one of six
pages carries an `On this page` TOC, and it is not the longest. `Check your demerit points`
ends with `Contact` — a heading used on no other task page — and omits both `Links` and
`Related transactions`.

### The three content types

`/transaction/…` — a single task, templated as above
`/services/…` — a category or topic hub, grouped by verb clusters
`/guide/…` — a cross-agency, life-event narrative for problems no single transaction solves

The `/guide/` type is the interesting one. `Guide to moving house and changing your details
with NSW Government agencies` exists because moving house touches a licence, a registration,
an electoral roll and a rates account across three agencies — i.e. the guide type is the
content answer to an org-chart problem.

## T12 FAQs

There is no global FAQ. Two distinct patterns exist, and one of them is mislabelled.

**1. `Common questions about NSW Digital ID`** `[observed]` — despite the name, its headings
are **statements, not questions**: `About digital identities` ·
`When you can use NSW Digital ID` · `NSW Digital ID and myID` ·
`Information you need to set up your NSW Digital ID` · `Access your NSW Digital ID` ·
`How your data is protected` · `Access to personal information` · `Face verification` ·
`If face verification did not work` · `NSW Digital ID on lost phones or devices`.

A page called "Common questions" containing zero questions is a defect, but the headings
themselves are good — `If face verification did not work` is exactly the right conditional
heading for a failure branch.

**2. `Data breaches` guide** `[observed]` — the only genuine question set on the site,
and notably in **first person**:

- `Who needs a replacement driver licence` *(no question mark)*
- `When will I hear from the breached company about this?`
- `If I think my driver licence may have been compromised - what can I do?`
- `What if I want to replace my driver licence as a precaution?`
- `Who will pay for a replacement driver licence?`
- `What if I have already replaced my card in the past 12 months?`
- `What information may have been compromised?`
- `What should I do to protect myself if I suspect I am a victim of fraudulent activity?`
- `What support is available to me in keeping my identity safe?`
- plus one ~35-word heading beginning `I have a suppressed address / am a victim of domestic violence…` and ending `Will Service NSW help me with this?`

The first-person register appears exactly where the user is frightened and the situation is
not their fault. `Who will pay for a replacement driver licence?` is the question a real
person asks third, and most organisations would never publish it.

**3. Inline feedback question** `[observed]`, at the foot of browse pages:
`Did you find the information you were looking for?` — with the A–Z variant
`Did you find what you were looking for?` and a third transaction-page variant
`Rate the information on the page`. Three components for one job (see defects).

## T13 Terminology & glossary

**Coined and product terms** `[observed]`: `MyServiceNSW Account` · `Business Profile` /
`Service NSW Business Profile` · `Service NSW Business Bureau` · `NSW Digital ID` ·
`NSW Digital Driver Licence` · `Digital Photo Card` · `NSW Digital Birth Certificate` ·
`NSW Photo Card` · `Savings Finder` · `Active and Creative Kids voucher` · `Toll Tracker` ·
`Green Slip Price Check` · `FuelCheck` · `Service Seeker` · `Quiet Hour` · `Settle in NSW` ·
`Be seen with a Sunflower` · `EnableNSW` · `Mobile Service Centres` ·
`Driver Testing Centres` · `Council Agencies` · `Working with Children Check (WWCC)` ·
`NDIS Worker Check` · `white card` / `General construction induction card` ·
`RSA/RCG competency card` · `Opal card` / `Gold Opal Card` · `eligible token` ·
`E-Toll tag account` · `Document Verification Service (DVS)` · `ID Support NSW` ·
`100 point identity check`.

**Published A–Z preferred terms** `[observed]`, from the NSW content style guide:
`app` not "application" · `driver licence` not "driver's licence" · `homepage` not
"home page" · `internet` not "the Internet" · `post` not "mail" · `program` not "programme" ·
`licence` (noun) / `license` (verb) · `practice` (noun) / `practise` (verb) ·
`log in` (verb) / `login` (noun or adjective) · `on-site` (adj) / `on site` (adv) ·
"Terms and conditions — Avoid T&Cs in user-facing content." ·
"website — Use portal only for authenticated, task-based services." ·
"Australian Government — Use for the national government of Australia in most user-facing
content. Use Commonwealth where legally or formally required." ·
"federal government — Avoid in favour of Australian Government…" ·
"service centre — Capitalise when part of a proper name – Blacktown Service Centre".

Authority: "We use Australian English. We follow the Macquarie Dictionary." /
"Do not apply Australian spelling to proper names or official titles."

**Plain-word substitutions** `[observed]`: "Opt for the simpler, shorter word – for example,
'use' not 'utilise'." with "buy, not purchase", "help, not assist", "about, not
approximately".

**Latin** `[observed]`: "for example instead of eg" / "that is instead of ie" /
"Write abbreviations without full stops."

**Acronyms** `[observed]`: "Write the term in full on first mention. Add the shortened form
in brackets, unless it is widely known"; don't "Spell out acronyms or initialisms that are
universally understood (for example, NSW, EFTPOS)"; article by pronunciation —
"a HECS debt", "an ABN", "an HVIS".

**Inclusive terminology — the fullest published person-first list in this batch** `[observed]`:

| Use | Not |
|---|---|
| People with disability | disabled or handicapped people |
| People with intellectual disability | intellectually disabled |
| People who are deaf or have hearing loss | unable to hear |
| People who are blind or have a vision impairment | unable to see |
| Older people or seniors | pensioners or the aged |
| Young people | youth or juveniles |
| First Australians or Aboriginal and Torres Strait Islander peoples (note the plural) | ATSI, Aborigines or Aboriginals |

Governing rules: "Mention personal characteristics only when they are directly relevant." ·
"Mention the person before anything about them." Worked pair —
Do: "If you have a trained assistance animal, you're legally entitled to take your animal
with you on NSW public transport." / Don't: "Blind and/or handicapped people who rely on
assistance animals can take their animal with them on NSW public transport."

**First Nations guidance** `[observed]`: "Aboriginals, Aborigine — these words are associated
with colonisation and assimilation and are distressing to many people" ·
"ATSI — never use the acronym ATSI as this is considered disrespectful" ·
"Indigenous should always be capitalised." ·
"While it is Australian Government practice to refer to Indigenous Australians, this is not
preferred by many First Australians." · "'First Australian' is not generally used to describe
an individual." · "Use the correct language group name if you know it." (Do: "The Ngunnawal
woman spoke first.") · "Ask people how they want to be described or how they identify where
possible."

**Gender-neutral** `[observed]`: use "them, their, theirs, they're", "police officer",
"firefighter", "chair"; avoid "policewoman", "fireman", "chairman", "workman", "businessman".
Do: "Submit your employment declaration." Don't: "Every employee should submit his employment
declaration."

**Device-neutral verb rule** `[observed]`: "Use verbs that work across desktops, mobiles and
screen readers." Do: "Select the 'Next' button." Don't: "Click the 'Next' button."

**Translation** `[observed]`: "Use a NAATI-accredited translator." / "Have a second
accredited translator review the work." / "Do not rely only on 'most spoken at home'." /
"Plain language is easier to translate and understand."

## T14 Voice, tone & accessibility — **PRIORITY (task-title grammar and the published standard)**

### Task-title grammar — the headline finding

**Of 56 task titles counted verbatim, 54 (96%) are verb-first imperatives.** The two
exceptions are `How to become a NSW Livestock Loading Scheme (NSWLLS) driver` (a "How to…"
construction) and `Fleet vehicles: bulk register with a common expiry date`
(noun-colon-verb). Across a wider ~75-title set the additional outliers are
`Locating someone's will` (gerund) and `Settle in NSW` (a programme name that happens to be
imperative).

**Verb distribution** (approximate counts across the ~75-title set):

| Verb | Count | Semantic slot |
|---|---|---|
| `Apply for` / `Apply to` | ~20 | A new entitlement. `Apply to` + infinitive for modifications (`Apply to downgrade a driver licence`) |
| `Report` | ~15 | Telling government about a third party or a hazard |
| `Change` | ~12 | Amending details on an existing record |
| `Replace` | ~6 | A lost, stolen or damaged artefact |
| `Check` | ~5 | Read-only lookup |
| `Transfer` | ~5 | Change of holder or jurisdiction |
| `Register` / `Register for` | ~5 | |
| `Renew` | ~4 | The same thing again |
| `Claim` | ~4 | **Money coming back to the customer** |
| `Cancel` | ~3 | |
| `Update` | ~3 | Competes directly with `Change` |
| `Book` / `Get` | 2 each | |
| Singletons | — | `Use`, `Order`, `Request`, `Find`, `Share`, `Access`, `Submit`, `Track`, `Opt in to`, `Dispute`, `Appeal`, `Convert`, `Manage`, `Create`, `Notify`, `Make`, `Reprint`, `Restore`, `Pay` |

**The semantic verb discipline is the single most reusable rule in this file.** Each verb
owns a distinct meaning, consistently:

> `Apply for` = new entitlement · `Claim` = money back to you · `Renew` = the same thing
> again · `Replace` = lost or damaged artefact · `Transfer` = change of holder or
> jurisdiction · `Change`/`Update` = amend details · `Check` = read-only lookup ·
> `Report` = tell government about something · `Book` = a time slot · `Pay` = money out

A user who learns the verb set can predict what a page will do before opening it. Compare a
typical commercial help centre where `Manage`, `Update`, `Edit` and `Change` are
interchangeable.

**Object conventions** `[observed]`: indefinite article + full product name
(`a NSW driver licence`, `a NSW Seniors Card or NSW Senior Savers Card`,
`an Active and Creative Kids voucher`); possessive `your` only where the object is already
owned (`Check your demerit points`, `Access your Voucher profile`, `Track your toll spend`,
`Create your NSW Digital ID`); channel qualifiers appended, never prefixed
(`Appeal a licence or registration decision online`,
`Replace a vehicle's registration certificate online`).

**Titles that break the pattern** `[observed]`:
`How to become a NSW Livestock Loading Scheme (NSWLLS) driver` · `Locating someone's will` ·
`Fleet vehicles: bulk register with a common expiry date` ·
`Change of name on a NSW Seniors Card or NSW Senior Savers Card` (nominalised, where the
sibling task uses `Change the details on…`) ·
`Notify a change of details – charitable fundraising authority` ·
`Fertility Treatment Rebate-2` (no verb at all, and a CMS artefact) ·
`Toll relief – $60 weekly cap` used as a label beside
`Claim the toll relief rebate – $50 weekly cap`.

### Published voice and tone

`[observed]` Brand persona: **`Authoritative`** · **`Transparent`** · **`Inclusive`** ·
**`Encouraging`**. The `Inclusive` definition names the grammatical mechanism:
"We are unbiased and apolitical, drawing our audience into the conversation by using active
voice and the first and second person ('we' and 'you')."

"Tone is not what you say, but how you say it."

**Three named registers, with rules** `[observed]`:
- "Use the **everyday** tone for most online content and publications." — "Use contractions ('you're' instead of 'you are')." / "Use humour sparingly, through wit rather than cheesy jokes."
- "Use the **community** tone for social media, blogs and newsletters."
- "Use the **official** tone for policies, procedures and ministerial briefings." — "Use third person ('the department', 'students', 'staff', 'teachers') in policies." / "Avoid using contractions ('won't')." / "Don't use humour as it will undermine the message."

A published register model with three named tiers, each with its own person, contraction and
humour rules, is rare and is the most operationally usable voice guidance in this batch.

**Person** `[observed]`: "We use first person (we, us) and second person (you) to speak
directly to users." · "Write as if you're having a conversation. Speak to people, not at
them." Worked pair — Do: "Let us know if you're having trouble." Don't: "Applicants having
difficulties should contact Service NSW."

**Active voice with a stated numeric target** `[observed]`: **"Aim for active voice at least
80% of the time."** Do: "You need to lodge an application." Don't: "An application will need
to be lodged by you." Exception in the official register: "Use passive voice sparingly, and
only when it provides greater clarity."

**80% is the only quantified voice target in this batch.** Whether it is measurable is
arguable; that it is stated is the point — it makes the rule reviewable.

**Length rules** `[observed]`, and they conflict (see defects):
"Aim for a maximum of around 20 words per sentence." (Content basics) ·
"Aim for an average of 20 words per sentence." (everyday tone) ·
"Break sentences over 25 words long into 2 sentences." (Grammar) ·
"Keep sentences under 25 words where possible and communicate one idea per sentence."
(Easy Read) · "Stick to one idea per paragraph" · "Limit your paragraphs to two or three
sentences." · "Use short paragraphs of around 3 sentences." ·
**"Use half the word count (or less) than conventional writing."**

**No reading-level target is published anywhere** — no grade level, no Flesch, no CEFR. The
Easy Read method actively discourages scores: "Use readability scores only as a diagnostic.
They do not assess accuracy, dignity, image meaning or whether a person can complete the
task." Same conclusion as NHS and Canada.ca, reached a third time independently.

**Headings** `[observed]`: "Use clear and unambiguous subheadings. Don't try to be clever or
humorous." · "Your first heading after your introductory text should always be H2, followed
by H3, H4 and so on." · "Don't use full stops at the end of headings." · "Use sentence case
for headings."

**Links** `[observed]`: "Make sure link text is clear and understandable without surrounding
content. Links should make sense when read out of context…" ·
"Do not use generic terms like 'click here', 'see', 'more' or 'more information'." ·
"Never use a URL for link text." · "Don't make the link text too long. Only link the main
words." · "Do not send people to a website's homepage. Make the link specific to what you
are talking about." · Don't "use the same link text for different URLs on the same page" ·
PDFs: "Use the exact name of the document as the text link, including capitalisation." /
"Add brackets around the filetype and document size, eg. 'PDF, 1234 KB' at the end of the
title." → "Download and complete Relationship Certificate Application (PDF, 123 KB)."

**No new-tab/new-window disclosure rule is published anywhere** despite the detailed PDF and
file-size conventions — a notable gap.

**Numbers, dates, times, money** `[observed]`:
"Use numerals for numbers 2 and above in text, reserving words for zero, one and when a
number begins a sentence." · "Use commas to separate thousands (1,000 and above)." ·
"Spell out ordinal numbers from first to ninth. Use numerals with suffixes for 10th and up." ·
Money — "Use decimal places only when cents are included." / "Spell out cents, million and
billion, with a space after the numeral." → `$50`, `$50.05`, `50 cents`, `$25 million` ·
"Use % symbol with no space." → `50%` ·
Dates — "Write dates in day-month-year order." / "Write the day as a numeral, the month in
full, and the year in full." → `2 September 2018`, abbreviated `2 Jul 2018`, ranges
`2018–19`, `FY 2023–24` ·
Times — "Use the 12-hour clock, followed by am or pm." / "Use a colon between hours and
minutes." / "Do not include minutes for whole hours." → `9:30 am`, `9 am` ·
Phones — "Use spaces to make phone numbers easier to read." / **"Tell users to call, not
phone."** / "For emergencies, use Triple Zero (000)." → `13 77 88`, `(02) 9286 1000`,
`+61 2 8894 1555` ·
Ages — "Use hyphens when the age describes a noun." → `16-year-old learner driver`.

**Punctuation** `[observed]`: "Use single quotation marks, not double quotation marks." ·
**"Do not use exclamation marks."** · "Do not use & in regular text unless it is part of an
official name." · "Use an Oxford comma if it helps avoid confusion." ·
"Avoid using (s) where possible. Rewrite the sentence instead." ·
"Do not hyphenate login or sign up." · Three quick-check prompts:
"Can this sentence be shorter?" / "Is the punctuation helping or distracting?" /
"Would this be easy to read aloud?"

**Lists** `[observed]`: "Limit list items to between five and seven, to hold your user's
attention." · "If there is a lead-in phrase, use a colon (not a full stop) at the end of the
phrase." · Fragments: "start each item with a lowercase letter"; "don't use a comma or
semicolon after each list item"; "don't use 'and' after the second-to-last item";
"use a full stop on the last list item." · "Don't use a numbered list within a bulleted
list." · "Use bold text sparingly. Blocks of bold text are hard to read." ·
"Don't underline text. It makes it look like a link."

**Content design** `[observed]`: "Content design uses words, structure and patterns to help
people use digital services confidently." · "Your aim should be to reduce unnecessary
information and cognitive load." · **"Use pair writing to create content side-by-side with a
subject matter expert, such as a technical writer, lawyer or policy author."** — a named
working method published inside a content standard.

**Easy Read as a distinct discipline** `[observed]`: "Easy Read is not the same as plain
language. Plain language makes text clear. Easy Read is a specialist format…" ·
"When a difficult or specialist term is necessary, make it bold the first time, explain it
immediately and use it consistently." · **"Use respectful, adult language that preserves the
person's dignity, agency and right to make decisions."** · **"Avoid assuming a support person
will read, decide or act for the person."** · "Explain percentages with a concrete expression
where useful, such as 1 in 4 people." · "Write dates in full and use the 12-hour clock with
am or pm." · "Audience testing is strongly encouraged. Treat content as a draft until people
from the intended audience have reviewed the words, images and complete task." · Body text
spec: 1.25rem/20px, line-height 2rem/32px.

The two bolded Easy Read rules are the strongest sentences in the whole NSW standard. They
are about **dignity and agency**, not readability, and they are the only place in this batch
where a content standard explicitly addresses the risk of writing past the reader to their
carer.

**Live tone observations** `[observed]`: strict second person for the customer, first-person
plural for the agency — "We welcome your questions, comments and feedback." ·
"Our staff are here to help you." · "We will never ask to access your computer." ·
"At Service NSW, a positive customer experience is our highest priority."
**No exclamation marks were found anywhere in the harvested corpus** — full compliance with
the site's own rule.

### Negative findings, recorded honestly

**Style-rule violations by the site or its own standard:**

- **"Click" is used, against the published NSW rule.** Task pages correctly say `Select the 'Apply online' button`, but the Digital ID pages say "Cut the paperwork – just **click**, verify and go" (an H2) and "verify yourself for future claims with one **click**." The app page adds a third verb: "Enter your MyServiceNSW email address and password and **press** Log in." Three interaction verbs for one action.
- **Sentence case is breached** in the official category name `Legal and Police services`, and in `View all Driving and Transport` sitting beside `View all Concessions, rebates and assistance` inside one component. Homepage alert eyebrows are all-caps.
- **Mixed straight and curly quotes** in structurally identical instruction strings: `Select the 'Apply online' button.` vs `Select the ‘Claim online’ button.`
- **Mixed dashes**: `Claim the toll relief rebate – $50 weekly cap` (en dash) vs `If I think my driver licence may have been compromised - what can I do?` (hyphen as sentence dash) vs `Fertility Treatment Rebate-2` (hyphen as version suffix).
- **`Don't over-use 'please'`** is contradicted by the guide's own approved example, which uses "Please check your ABN or ACN and try again."
- **A "Do" is filed under "Do not"** in the Microcopy help-text section: "Use help text if data must be entered in a specific format." sits under the Do-not heading.
- **High-sensitivity defect**: `Writing for inclusivity` lists "Aboriginal and/or Torres Strait Islander" and "Aboriginal and Torres Strait Islander Australians" under a **"Do not use"** heading with no rationale, contradicting the same page's own recommendation elsewhere.
- **Sentence-length target contradicts itself**: 20 words (Content basics) vs 25 words (Grammar, Easy Read), with no reconciliation.
- **Year-range rule contradicts its own example**: "Write both years in full. Shorten the second year if the first 2 digits are the same." with the example `2018–19`.
- **Published error copy contradicts the published error rule.** The rule: "specify errors inline, showing where the error occurred and what the user needs to do." Every shipped design-system example: `This field is required` — identical across text, date, select, checkbox and radio, with no fix instruction.
- **No error-summary component exists** in a design system that references "a validation summary" in its own don't-list.
- **No new-window disclosure rule** anywhere in Links guidance or the Link component.
- **Typos in live published guidance**: "what happens when the **use** selects the button"; "enter into the **field.,** or what they need to select"; "use full stops **of** titles (Mr, Dr or Mrs)"; "makes them less **noticable**"; "over use as this can cause **confuse** or create visual noise".
- **The Content design page has lost its list markup**, rendering as "Consider how you use: page structure and hierarchy headings and scannable content forms, labels and instructions error messages and help text."

**Content defects:**

- **Stale pricing that contradicts the homepage, on a more recently published page.** Homepage (published 10 Sep 2026): "Toll cap has changed to $50 a week." Savings Finder (published **14 Sep 2026**, i.e. later): `Toll relief – $60 weekly cap` and "If you spend between $60 and $400 a week on tolls you may be eligible for a rebate." The live task page says `$50`. Three numbers for one policy, and the newest page carries the wrong one.
- **A CMS artefact shipped as a public link label**: `Fertility Treatment Rebate-2`, appearing twice.
- **Broken markup in the A–Z list**: `[Births, relationships and death](…)s` — the trailing "s" falls outside the link.
- **A mislabelled link with the wrong destination**: the card titled `Service NSW website` links to `account.service.nsw.gov.au/manage/settings/nsw-digital-id`.
- **Two URLs for one task page**, both linked from the homepage and A–Z (Seniors Card).
- **`/campaign/cost-of-living` and `/transaction` do not exist**, though "Cost of living" is a live section heading on two category pages and the concept hands off to `nsw.gov.au`.
- **An entire life-event category is hollowed out.** `/services/births-relationships-and-deaths` is a Service NSW category, but every actionable task inside it — register a birth, apply for a birth/death/marriage certificate, change of name, change of sex — links off to `nsw.gov.au`. Only `NSW Digital Birth Certificate` remains a Service NSW transaction. The category promises tasks and delivers referrals.

**Navigation defects:**

- **Five different breadcrumb shapes**: `Home > Find services > Driving and transport`; `Home > Driving and transport` (skips `Find services`); `Home > Concessions, rebates and assistance > Toll relief`; `Home > NSW driver licence`; `Home > Active and Creative Kids voucher`.
- **Three different feedback components** for one job, with inconsistent option punctuation (`No. I did not find what I was looking for.` in one; `No` / `I did not find what I was looking for.` split in another; `Rate the information on the page` in a third).
- **`Apply online` is the button label for structurally different tasks**, so the CTA carries no task-specific information at the moment of commitment.
- **Homepage colloquialism vs formal title mismatch** breaks scent of information: `Renew rego` → `Renew a vehicle registration`; `Do your DKT online` → `Driver knowledge test online` (also a tautology — DKT test).
- **Noun labels mixed into imperative lists** on category pages: `Toll relief`, `Energy rebates`, `Carers guide` beside `Use the Green Slip Price Check`.
- **Twelve+ terminology collisions**, including: `Service NSW app` / `Service NSW Mobile App` / `the MyServiceNSW app`; `service centre` / `Service NSW Centre` / `Service Centre` / `Service NSW location`; `Savings Finder` / `Savings finder` / `Savings Finder tool` / `Savings Finder program`; `NSW driver licence` / `NSW Driver Licence` (both cases inside the single string `Replace a NSW Driver licence`); `Low income household rebate (energy retail customers)` and `NSW Low Income Household Rebate` **on the same page** for the same target; `Change details on a high risk work licence` beside `Update details on an RSA/RCG competency card` for the same job.

**Structural defect in the standard itself:**

- **The design system has no content section at all.** `designsystem.nsw.gov.au` has no Content or Writing entry in its navigation; `/digital-design-system/foundations` and `/foundations/content-style-guide` return empty bodies; the content guidance lives on a different domain (`digital.nsw.gov.au`) and is not linked from the design system. **A designer working inside the NSW Design System will never encounter the NSW content rules.** That is the root cause of several defects above.
- Within the content tree itself, sibling pages sit under two different path structures (`/resources/writing-content/…` and `/resources-and-guides/writing-content/…`).
- Version drift between the two design-system mirrors: v3.27.0 on one page, v3.25.2 on another, served in the same crawl; the digital.nsw mirror relabels `Methods` as `Design patterns` and lists five of six methods.

---

## Transferable patterns

1. **One verb, one meaning, enforced across the whole catalogue.** `Apply for` = new
   entitlement · `Claim` = money back · `Renew` = same thing again · `Replace` = lost
   artefact · `Transfer` = change of holder · `Check` = read-only · `Report` = tell us about
   something. 96% verb-first imperatives across 155+ tasks. A user who learns the verb set
   can predict a page's behaviour from its title. Directly applicable to any large
   self-service catalogue.
2. **Conjugate the procedure heading to the task verb.** `Claim the toll relief rebate` →
   `How to claim`; `Check your demerit points` → `How to check`. Scent of information
   survives from category label to task title to step list, for free.
3. **Group browse pages by verb cluster, not by object.** `Renew, replace or reissue` ·
   `Change or cancel` · `Access your records` · `Buy, sell, transfer, change or cancel`.
   People arrive knowing what they want to *do*, not what class of record it lives in.
4. **Write eligibility as fragments completing the lead-in, and give exclusions their own
   heading.** `You may be eligible if you:` + lowercase fragments; then
   `Toll spend you cannot claim` as a separate H2. Name the excluded *thing*, not the
   abstract state.
5. **"Use adjectives rather than verbs" for status labels**, so the user does not think the
   label is a button. `Approved`, `Expiring soon`, `Not provided` — never `Approve`.
6. **Take responsibility in the error.** "We couldn't change your password" over
   "Your password could not be changed"; "The details you entered don't match our records"
   over "Your ABN or ACN is incorrect." The second pair also happens to be *more accurate*,
   because the record may be the stale one.
7. **Order feedback by how it will be interpreted**: "user feedback first, followed by
   contextual feedback." A validation-ordering rule almost no design system publishes.
8. **Help text that says where to look on the physical artefact**: "Number to the left of the
   name on your card." For any field asking for a number printed on something, location beats
   definition.
9. **Three named tone registers with their own person, contraction and humour rules**
   (everyday / community / official) — operational rather than aspirational, and reviewable.
10. **Device-neutral interaction verbs.** "Select the 'Next' button", never "Click" — and the
    rule is justified by screen readers and touch, not by style preference.
11. **Easy Read as a distinct discipline with dignity rules, not just short-word rules.**
    "Use respectful, adult language that preserves the person's dignity, agency and right to
    make decisions" and "Avoid assuming a support person will read, decide or act for the
    person."
12. **A negative finding worth learning from: put the content standard inside the design
    system.** NSW's content rules are excellent and functionally invisible to the people
    building NSW services, because they live on a different domain with no link from the
    design system's navigation. Several of the live defects recorded above are downstream of
    exactly that.

## Caveats & gaps

- **No error, 404 or service-unavailable copy could be captured.** A deliberately bad URL, `/error.html`, `/transaction` and `/campaign/cost-of-living` all returned empty bodies through the permitted route. Failure-state copy in T7 is therefore entirely `[documented]` from the design system, not observed.
- **Header nav and site footer were never in the fetched response body.** The tool returned only the main-content region, and the decoupled menu endpoint is empty. The global chrome labels are deliberately **not quoted** rather than guessed, so T1 is built from breadcrumbs, page H1s, section headings and the `About us` tree.
- **The transaction count is a floor, not a total.** `sitemap.xml` truncated at ~453 lines across two identical fetches; there is no `Sitemap:` line in `robots.txt` and pages 2–4 of the urlset return empty. 155 `/transaction/` URLs is what was countable.
- **Search results are `Disallow`-ed in robots.txt** and were not fetched, so no search, no-results or filter copy is in this file.
- **No transaction was started, no account created, no Digital ID set up.** All in-product form labels, validation, confirmations and progress copy are `[documented]` from the design system, which publishes only generic example strings (`This field is required`) — so the *real* Service NSW form copy remains unharvested.
- **Birth, death and marriage tasks have migrated off-domain** to `nsw.gov.au`, so the life-event content that would normally be the richest source for sensitive-topic copy was largely out of scope. Only the category shell was read.
- **The Service NSW accessibility statement gives no audit date**, so the WCAG 2.1 AA pass claim cannot be dated. No VPAT or audit report is published.
- **Only six task pages of 155+ were read.** The template description is consistent across those six but is not exhaustive; business, health, housing and emergency tasks are unharvested.
- **The NSW Design System's component pages were read for content rules only**, not for their full spec. Templates, utility classes and the Figma UI kit were out of scope.
- **`Quiet Hour`, `Be seen with a Sunflower` and the accessibility-service content** were seen only as terminology and were not read as pages — they are likely the site's best inclusive-service content and remain unharvested.

## Sources

1. https://www.service.nsw.gov.au/
2. https://www.service.nsw.gov.au/services
3. https://www.service.nsw.gov.au/services/view-all-topics
4. https://www.service.nsw.gov.au/transaction/renew-or-upgrade-a-nsw-driver-licence
5. https://www.service.nsw.gov.au/transaction/apply-for-a-nsw-seniors-card-or-nsw-senior-savers-card
6. https://www.service.nsw.gov.au/transaction/apply-for-an-active-and-creative-kids-voucher
7. https://www.service.nsw.gov.au/transaction/claim-the-toll-relief-cap
8. https://www.service.nsw.gov.au/transaction/check-your-demerit-points
9. https://www.service.nsw.gov.au/transaction/settle-in-nsw
10. https://www.service.nsw.gov.au/services/driver-and-rider-licences
11. https://www.service.nsw.gov.au/services/vehicle-registrations
12. https://www.service.nsw.gov.au/services/concessions-rebates-and-assistance
13. https://www.service.nsw.gov.au/services/births-relationships-and-deaths
14. https://www.service.nsw.gov.au/services/myservicensw-account
15. https://www.service.nsw.gov.au/services/nsw-digital-id
16. https://www.service.nsw.gov.au/common-questions/nsw-digital-id
17. https://www.service.nsw.gov.au/services/savings-finder
18. https://www.service.nsw.gov.au/services/vouchers
19. https://www.service.nsw.gov.au/services/service-nsw-mobile-app
20. https://www.service.nsw.gov.au/services/service-nsw-online-services
21. https://www.service.nsw.gov.au/services/what-you-can-report
22. https://www.service.nsw.gov.au/guide
23. https://www.service.nsw.gov.au/guide/data-breaches
24. https://www.service.nsw.gov.au/guide/guide-to-moving-house-and-changing-your-details-with-nsw-government-agencies
25. https://www.service.nsw.gov.au/contact-us
26. https://www.service.nsw.gov.au/about-us
27. https://www.service.nsw.gov.au/performance-dashboard
28. https://www.service.nsw.gov.au/accessibility
29. https://designsystem.nsw.gov.au/
30. https://designsystem.nsw.gov.au/docs/content/design/guides.html
31. https://designsystem.nsw.gov.au/docs/content/methods/easy-read.html
32. https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/design-system
33. https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources-and-guides/writing-content
34. https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources-and-guides/writing-content/content-style-guide
35. https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources-and-guides/writing-content/content-101
36. https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources-and-guides/writing-content/content-design
37. https://www.digital.nsw.gov.au/delivery/accessibility-and-inclusivity-toolkit/your-responsibilities
38. https://www.nsw.gov.au/nsw-government/about-website/accessibility-statement
39. https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources/content-guide *(blocked — empty body)*
40. https://www.digital.nsw.gov.au/digital-design-system/foundations *(blocked — empty body)*
41. https://www.service.nsw.gov.au/transaction *(blocked — no such index page)*
42. https://www.service.nsw.gov.au/campaign/cost-of-living *(blocked — no such page)*
