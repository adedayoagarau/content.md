# 112. Zocdoc

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | US provider search and booking (two-sided healthcare marketplace) |
| Primary URL | https://www.zocdoc.com/ |
| Corpus rank | 112 |
| Benchmark strength (source list) | Provider search and booking |
| Locale / market observed | en-US only (help centre path is `/patient-help/en/`; no other locale offered) |
| Platform observed | Web (marketing, directory, legal), Intercom-hosted help centre, mobile-app copy quoted in help articles |
| Regulatory posture | **Zocdoc is not a covered entity and says so by omission.** HIPAA appears exactly once across all harvested pages, and it is a *carve-out*: the Consumer Health Data Privacy Policy explicitly excludes PHI and redirects the user to their provider's Notice of Privacy Practices. Zero HIPAA references in the Terms of Use. The compliance weight sits instead on three state consumer-health statutes — Washington My Health My Data Act, Nevada Consumer Health Data Privacy Act, Connecticut Data Privacy Act — collectively defined as "Consumer Health Privacy Laws". Terms disclaim medical advice, doctor-patient relationship, provider endorsement, insurance-data accuracy, and AI output. Provider vetting is disclosed (licence verification plus HHS OIG Exclusion database check). Commercial model disclosed: providers pay fees; Sponsored Results are separately labelled. In-Network Promise explicitly disclaims insurance status. |
| Harvest date | 2026-09-21 |
| Pages inspected | 38 |
| Harvest completeness | Partial — `zocdoc.com/search` is client-rendered and returns `Loading...` only, so live filter chips, sort menu, distance control and the no-results empty state were **not observable**. Filter vocabulary in T5 is reconstructed from help articles and URL parameters and is marked `[documented]`. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.zocdoc.com/ | Hero, search module labels, provider-card badges, availability strings |
| Specialty index | https://www.zocdoc.com/specialty | 66-item specialty taxonomy |
| Directory page | https://www.zocdoc.com/primary-care-doctors | Template H1 with a bolded slot, secondary browse tabs |
| About | https://www.zocdoc.com/about/ | Mission narrative, "gauntlet" framing |
| How search works | https://www.zocdoc.com/about/how-search-works | Ranking-criteria disclosure, 7-question FAQ |
| Verified reviews | https://www.zocdoc.com/about/verifiedreviews/ | Review taxonomy, moderation criteria |
| Community standards | https://www.zocdoc.com/about/communitystandards/ | Patient AND provider codes of conduct |
| Legacy FAQ | https://www.zocdoc.com/about/faq/ | Security practices, doctor-choice framing |
| Contact us | https://www.zocdoc.com/about/contactus/ | Support-hours copy, three-channel cards |
| Terms of Use | https://www.zocdoc.com/about/terms | Insurance-accuracy caveat (§5), medical disclaimers (§2, §3), vetting (§4) |
| Consumer Health Data Privacy Policy | https://www.zocdoc.com/about/consumer-health-data-privacy-policy | Rights labels, third-party categories, HIPAA carve-out |
| Help centre home | https://www.zocdoc.com/patient-help/en/ | 6 collections with counts |
| Help collections (10) | `/collections/` — My Account, Finding a Provider, Appointments (+4 sub-collections), Insurance, Reviews, About Zocdoc | Full article-title inventory |
| Help articles (~35) | `/patient-help/en/articles/…` | Booking, cancellation/no-show, insurance, video visits, intake, reviews, accessibility |
| Search results | https://www.zocdoc.com/search?… | **Blocked** — renders `Loading...` only |
| Insurance Advocacy | https://www.zocdoc.com/patient/insurance-advocacy | **Blocked** — client-rendered, header only |

---

## T1 Navigation & IA labels

**Global nav is a browse verb repeated eight ways** `[observed]`

`Browse` · `Help` · `List your practice on Zocdoc` · `Log in` · `Sign up`

The `Browse` menu expands to eight parallel entry points, all the same grammar: `Browse doctors` · `Browse practices` · `Browse hospitals` · `Browse insurances` · `Browse locations` · `Browse conditions` · `Browse procedures` · `Browse treatments`.

That list is the real IA statement. Zocdoc is telling the user there are eight legitimate mental models for "what am I looking for" — a person, an organisation, a payer, a place, a symptom, an intervention. Most directory products force one. `Browse insurances` sitting as a peer of `Browse doctors` is the US-specific one: in this market the payer is a first-class navigational object, not a filter.

The signed-out panel carries a mini value prop rather than a greeting: `Welcome to Zocdoc!` / "Book local doctors who take your insurance".

**Footer — four groupings, one of which is an invitation to defect** `[observed]`

- `Zocdoc`: `Home` · `About us` · `Press` · `Careers` · `Contact us` · `Help`
- `Discover`: `The Paper Gown: Stories for and about patients` · `Practice Resources for providers` · `Community standards` · `Data and privacy` · `Verified reviews` · `Tech Blog` (with a `New` badge)
- `Are you a top doctor or health service?`: `Try Zo, your AI Phone Assistant` (`New`) · `List your practice on Zocdoc` · `Become an EHR partner` · `Access Zocdoc for Developers` · `Learn about Zocdoc Enterprise Solutions`
- `Directories`: `Insurance Carriers` · `Top Specialties`

Note the grouping *headings* are not nouns — `Are you a top doctor or health service?` is a question addressed to a different audience, sitting inside a patient-facing footer. It self-segments rather than labelling.

**Help-centre collections carry article counts in the label** `[observed]`

`My Account` (7 articles) · `Finding a Provider` (9) · `Appointments` (18) · `Insurance` (6) · `Reviews` (3) · `About Zocdoc` (7)

Counts are shown at the top level. This is a small honesty signal — the user knows before clicking that `Reviews` is thin and `Appointments` is the substantial one. `Appointments` then splits into four sub-collections: `Making or managing appointments` (12) · `Intake forms` (1) · `Video visits` (3) · `Rescheduling or canceling appointments` (2).

**Breadcrumb grammar** `[observed]`: the first crumb is always the literal string `All Collections`, then collection, then sub-collection, then article title — `All Collections › Appointments › Making or managing appointments › How do I make an appointment?`.

**Cross-audience routing** `[observed]`: the patient help centre ends with `Are you a provider?` → `Provider Help`. Two separate help centres, explicitly bridged.

## T2 Value proposition & headline patterns

**The hero states the differentiator, not the category** `[observed]`

> H1: `Book local doctors who take your insurance`
> Subhead: `Ready to be seen? Start searching below`

`who take your insurance` is the entire proposition, and it is in the H1. The subhead is unusual: `Ready to be seen?` uses the patient's own passive construction — nobody says "I want to book a doctor", they say "I need to be seen". Picking up the patient's idiom rather than the product's is the single best line on the homepage.

**The About page names the problem as a physical obstacle course** `[observed]`

> "But from the very first step, you have to work too hard to get care. Because between you and healthcare stands a gauntlet: Outdated directories. Hold music. Insurance confusion. Waiting weeks or months to be seen. Dead ends and brick walls."

Six sentence fragments, each naming a concrete indignity. `Hold music` is doing the most work — it is specific, universally recognised, and it is not a *system* problem, it is an *experience* problem. This is how you write a category villain without naming a competitor.

The page opens on a second-person reversal: "You came here to read about us. But Zocdoc is about patients. And whoever you are, you're also a patient. Which means this is about you." It closes with `Zocdoc will always be about you.` The whole About page is structured as a refusal to talk about the company.

**Section headers carry the proof inline** `[observed]`

- `Find an in-network doctor from over 10,000 insurance plans`
- `Top-rated primary care doctors` — "90% of patients gave these primary care doctors 5 stars"
- `Dentists with the shortest wait time` — "91% of patients spent less than 30 minutes in the waiting room for these Dentists"
- `Let's get you a doc who gets you`
- `Thousands of providers. One app.`

The wait-time section is the interesting one: Zocdoc has chosen *time spent in the waiting room* as a merchandisable attribute, and it states the threshold ("less than 30 minutes") and the proportion ("91%") rather than a star rating. It converts an ambient grievance into a filterable quality signal.

`Let's get you a doc who gets you` is the register floor — `doc`, the repeated "get", first-person-plural offering to act on the user's behalf.

**Directory-page H1 is a template with a bolded slot** `[observed]`: `Book the best **Doctors** for your needs`, subhead "Browse our directory to find doctors near you who take your insurance. It's simple, secure and free." The three-adjective closer (`simple, secure and free`) covers effort, trust and cost in five words.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Find care` | Search submit, all directory pages | **Not "Search"** — the label names the outcome, not the mechanism |
| `Book online` | Provider card | |
| `See availability` | Value-prop tile | |
| `See specialties` / `See providers` | Value-prop tiles | Each tile's CTA matches its own claim |
| `Add your insurance coverage` | Insurance module, homepage | |
| `See all (1,000+)` / `See all (300+)` | Carousel overflow | **Count inside the CTA** |
| `See more top-rated Primary Care Doctors` | Below carousel | Fully specific, never a bare `See more` in the primary slot |
| `See all specialties A-Z` | Specialty strip | |
| `Learn more about our practice solutions` | Provider module | |
| `Partner with Zocdoc` | Health-systems module | |
| `Start chat` / `Get started` | /about/contactus/ | |
| `Patient` / `Provider` | Help Center card — two buttons, one card | Audience fork at the CTA |
| `Skip to main content` / `Skip to search results` | Help centre / search page | |
| `Did this answer your question?` + `Disappointed Reaction` / `Neutral Reaction` / `Smiley Reaction` | Foot of every help article | Accessible names spelled out, not emoji-only |
| `Cancel or Reschedule Appointment` | Booking email footer | `[documented]` |
| `Modify Visit` | Web, after the email link | `[documented]` — a **third** label for the same action |
| `Cancel or Reschedule` | App, appointment details | `[documented]` |
| `Prepare for Appointment` | Logged-in homepage | `[documented]` |
| `Report an issue` | Past Appointments | `[documented]` |
| `Something go wrong? Report an issue with your appointment.` | Booking + reminder email footer | `[documented]` — question-as-link-text |
| `Leave Feedback` | Account, beside a provider | `[documented]` |
| `Skip and show search results` | Guided search | `[documented]` — names both the skip and the destination |
| `Enter waiting room` / `Enable camera and microphone` | Video visit | `[documented]` |

**Two observations.** `Find care` over `Search` is the right call and it is consistent across every directory surface — the user is not performing a search, they are obtaining care.

Against that, **the cancel/reschedule action carries three different labels across three surfaces** — `Cancel or Reschedule Appointment` (email), `Modify Visit` (web), `Cancel or Reschedule` (app) — and Zocdoc has had to write a help article whose job is partly to disambiguate a *fourth* nearby button: "*Note:* The Prepare for Appointment button is for completing intake tasks like uploading insurance and will not take you to the cancel or reschedule option." A disambiguation note in a help article is a reliable sign that two labels are too close together.

## T4 Onboarding & getting-started

**Search is documented as three steps, with the third explicitly optional** `[documented]`, article 8975433:

1. "Use keywords to describe your condition, symptoms, procedure, or type of doctor."
2. "Enter where you want to see a doctor."
3. "**Optional**: Choose your insurance to find an in-network doctor."

Step 1 lists four acceptable input types in ascending medical literacy — condition, symptoms, procedure, type of doctor. The user is told they may arrive with a symptom and no idea which specialty treats it, which is the actual state of most people searching for care.

Marking step 3 `Optional` is a deliberate friction decision, and the consequence is stated honestly elsewhere: "You can search without insurance, but your search results will not display which providers are in-network or out-of-network."

**The AI variant softens the input contract further** `[documented]`, article 16309168: "Describe what you're looking for in your own words." Followed by an expectation-setting line: "AI Care Assistant may ask follow-up questions to clarify your search." The mode toggle is `AI Care Assistant` / `Classic search` — naming the non-AI path `Classic` rather than `Standard` or `Basic` is a quiet signal that it is the deprecated one.

**In-Network Promise, three bolded steps** `[observed]`:

1. `Verify your insurance.`
2. `Book in-network and attend your appointment.`
3. `If you receive an out-of-network bill, submit it to Zocdoc.`

Step 3 is a recovery step baked into the onboarding narrative — the happy path and the failure path are presented as one sequence. Most products would hide step 3 in a help article.

**Video-visit join, five numbered steps** `[observed]`: `Step 1: Prepare your device` · `Step 2: Use your video visit link` · `Step 3: Sign into the waiting room` · `Step 4: Enable your camera and microphone` · `Step 5: Wait for your provider`.

Step 5 is a step whose content is *doing nothing*. Naming waiting as a step is correct — it is the step users most often misinterpret as a failure, and it is why the article also carries "Please stay in the waiting room until your provider starts your appointment."

## T5 Form & field labels

### The search module — four labels, no more `[observed]`

Rendered identically on homepage, `/specialty` and `/primary-care-doctors`:

| Label | Field |
|---|---|
| `Search` | Specialty / condition / symptom / doctor name |
| `Location` | |
| `Insurance` | |
| `1. Insurance carrier and plan` | Step label inside the insurance picker, numbered `1.` |
| `Find care` | Submit |

The main input is labelled `Search` — a generic label above an input that accepts four different semantic types. This is the weakest string in the module, and the help centre has to do the explaining that the label does not.

The numbered `1.` inside the insurance picker implies a step 2 that never renders server-side. `[absent]` — placeholder text is injected client-side and was not retrievable.

Secondary browse tabs on directory pages: `Location` · `Insurance` · `Visit reason`.

### Insurance vocabulary is taught, not assumed `[documented]`

Article 8733187 glosses both terms inline at first use:

> "…by choosing your **carrier** (another name for your insurance company) and **plan** (the specific coverage you have with that carrier)."

This is the single most transferable line in the Zocdoc corpus. A US insurance card carries both a carrier and a plan, users routinely conflate them, and getting it wrong silently produces wrong in-network results. Zocdoc defines both nouns *in parentheses, in the sentence where the user must act on them* — not in a glossary, not in a tooltip.

Other insurance-field strings `[documented]`:
- Optional field `member ID` — "Some providers may require you to have your member ID on your Zocdoc account to book appointments with them."
- Card upload is medical-only: "(this is only available for medical insurance cards, not vision or dental)"
- Scan result framed as a guess, not a fact: "We will scan the image of your card and display your **likely** plan."
- Out-of-pocket option: `I'm paying for myself`
- Constraint stated plainly: "you can only search for and book an appointment with one insurance plan at a time."

`I'm paying for myself` over "self-pay" or "uninsured" is a good choice — it describes an action the user is taking rather than a category they belong to.

### Filters `[documented]` — described, never observed

Two help articles name the filter set in near-identical prose:
- "filter results by **preferred time of day for the appointment, specialty, gender, the type of visit (in-person or video), and more**" (8975433)
- "narrow results by **appointment time, specialty, gender, visit type, and more**" (16309168)

One verbatim filter label survives: `Video visits only` (8711850).

The `/about/how-search-works` page adds a third, differently-worded list: "filter to further refine search results based on availability, gender of doctor, and whether they see patients under age 18."

Three descriptions of the same filter rail, none matching, and only one actual label. This is what happens when filter copy lives only in the client bundle.

**URL parameters expose the machine-readable filter vocabulary** `[observed]` from homepage "See more" links: `day_filter=AnyDay` · `sort_type=Default` · `visitType=inPersonAndVirtualVisits` · `filters={"sp_top_rated":["is_highly_recommended"]}` · `filters={"sp_wait_times":["has_low_wait_times"]}` · `searchType=specialty`.

`visitType=inPersonAndVirtualVisits` confirms in-person/video is a single tri-state control, not two checkboxes.

`[absent]`: distance options, language filter, sort-menu labels, new-vs-existing-patient radio wording.

### Ranking criteria are published as four user-facing labels `[observed]`

Identical bolded labels on `/about/how-search-works` and in two help articles:

- `Visit reason:` — "(For example, a search for "heartburn" shows doctors qualified to treat that condition.)"
- `Insurance network:` — "Doctors that accept your insurance plan will be shown earlier in search results and clearly labeled as "in-network providers.""
- `Location:` — "Patients can use a map to adjust results based on their preferred location."
- `Appointment availability:` — "We prioritize doctors with availability, recognizing that patients prefer timely appointments."

Publishing ranking inputs *as labelled criteria with worked examples* is rare and directly reusable. Note the heartburn example: it demonstrates the colloquial-to-clinical mapping without making the user read about ontologies.

### Data sent to the practice at booking `[observed]`, article 8838855

`Legal first and last name` · `Date of birth` · `Sex` · `Reason for visit` · `If you are a new or existing patient` · `Phone number` · `Insurance carrier and plan`. For imaging, two more: `Your referral order or contact information for your referring physician` and `Whether you've received prior-authorization from insurance (when applicable)`. Optional: `Image of your insurance card`, `Member ID`, `Additional sex and gender information`, `Additional notes`.

Publishing the exact payload the office receives is a strong transparency pattern for any intermediary that forwards user data to a third party.

### Sex and gender options `[observed]`, article 8724688

`Assigned female at birth` · `Assigned male at birth` · `Cisgender` · `Genderfluid` · `Genderqueer` · `Intersex` · `Non-binary` · `Transgender man` · `Transgender woman` · `I'd prefer not to say` · `None of these apply to me`

Two escape hatches rather than one — `I'd prefer not to say` (declining) and `None of these apply to me` (not represented) are different states and Zocdoc models both. Most products ship only the first and thereby force people who are unrepresented to look as though they are withholding.

### Taxonomies `[observed]`

66 specialties on `/specialty`, mixing practitioner nouns (`Cardiologists`, `Podiatrists`) with facility nouns (`MRI Facilities`, `X-Ray Facilities`, `Retail Clinics`, `Urgent care`). Note `Urgent care` is the only lower-case, non-pluralised entry in the list — a live inconsistency.

`Common visit reasons` on the homepage is grouped into `Medical` · `Dental` · `Mental Health` · `Vision` and is strikingly frank: `Nexplanon removal`, `IUD insertion`, `IUD removal`, `OB-GYN emergency`, `Anxiety`, `Hair loss`, `Ozempic / Wegovy (Semaglutide) Weight Loss Drug Consultation`. Zocdoc surfaces reproductive-health and mental-health reasons on the homepage of a general marketplace, named clinically rather than euphemistically.

## T6 Status & state language

**Zocdoc says `booked`, not `confirmed`** `[documented]`, article 8839046:

> "If you reach a page that says "**Your appointment is booked**," then you're all set!"

This is the canonical success string. The vocabulary is consistent across all surfaces: `book`, `booked`, `instantly book`, `book your appointment instantly`. There is no `confirmed` state, no `pending` state and no `requested` state in any public copy.

That is a deliberate product claim, not just word choice. Zocdoc's differentiation is that the slot you pick is the slot you get, because it integrates with the practice's calendar: "Zocdoc integrates with a practice's system to display real-time availability and schedule the appointments patients book into practices' calendars." Introducing a `pending` state would undermine the proposition. The cost is that when something *does* go wrong, there is no state name for it — hence the email link `Something go wrong? Report an issue with your appointment.` doing the work a status would otherwise do.

**`no-show` is defined, not assumed** `[observed]`, article 8814211: "A failure to show up for your appointment will be considered a "**no-show**."" Defining an industry term in quotation marks at first use, in the policy article that penalises it, is correct practice.

**State vocabulary inventory** `[observed]`: `booked` · `reschedule` / `rescheduled` · `cancel` / `canceled` / `cancellation` · `no-show` · `locked` (account state) · `Verified In-Network Appointment` (a contractually defined appointment state) · `Upcoming appointment` · `Appointment Checklist` (with tasks shown "as complete").

Surface-name drift `[observed]`: the same list is `Past Appointments` on desktop and `Appointment History` on mobile — documented by Zocdoc itself in article 10859570, which is better than leaving users to discover it, but it is still two names for one object.

`[absent]`: `pending`, `requested`, `waitlist`, `completed`. None appear anywhere in public copy.

**Availability language — absolute dates, with a relative exception** `[observed]` on provider cards:

- `Next available on Mon, Sep 28` — the dominant form
- `Next available tomorrow` — used when the slot is next-day

The switch from absolute to relative at the one-day boundary is the right call, and it is the mirror image of Wise's `by Tuesday` decision (exemplar 041): Zocdoc uses absolute dates for distant slots because the user needs to check a calendar, and relative language for tomorrow because "tomorrow" is more immediate than a date. Same principle, opposite default, both correct for their magnitude.

**Provider-card badge trio** `[observed]`: `New patient appointments • Excellent wait time • Highly recommended`

Three badges covering access, efficiency and quality. `New patient appointments` is the eligibility badge that matters most in US primary care and it leads. `Excellent wait time` is the merchandised grievance from T2.

Rating render: `4.82` · `90 reviews`. A live bug: `5.00` · `1 reviews` — un-pluralised.

**Video-visit states** `[observed]`: `video visit` is the consumer noun throughout (`Telemedicine Services` / `Video Services` only inside the Terms). `virtual waiting room` / `waiting room`; "you'll be able to enter the virtual waiting room 15 minutes before your appointment time"; "Your video visit will automatically start when your provider joins the video visit." Providers offering video are marked by "a small video camera icon next to their profile image".

**Other labelled states** `[observed]`: `Sponsored` (on-result) / `Sponsored Results` (the product) · `Patient Choice` (badge) · `in-network providers` (result label) · review attributions `Verified patient`, `Initials hidden`, `Source: Partner`.

## T7 Error, failure & recovery

**The locked-account flow is the strongest recovery copy in the file** `[observed]`, article 8724705.

Three FAQs in sequence — `Why is my account locked?`, `How do I get my account unlocked?`, `My account was locked by mistake. What should I do?` — with the cause stated without euphemism: "Accounts may be locked due to frequent cancellations, no-shows, rescheduling, or a potential violation of our Community Standards."

The recovery line is: **"please contact us and we'll figure this out together."**

That is the register to steal. The user has been punished by an automated system, the punishment is named honestly, and the recovery sentence is first-person-plural and non-defensive. No "unfortunately", no "we apologise for any inconvenience", no passive voice hiding who locked the account.

**Wrongly-flagged no-show has a dedicated route** `[observed]`: "If you incorrectly received an email that you canceled or did not attend an appointment, please contact service@zocdoc.com." And a separate article title that asks the question in the user's voice: `Why did I get a notification that I didn't show up to my appointment?`

**Error copy names the constraint, not the failure** `[observed]`:

- Intake: "Make sure you complete all required fields, which are denoted with a "**Required**" tag. That is the most likely reason you are seeing this error."
- Uploads: "Only PNG and JPEG files are accepted at this time." — repeated for referral orders with a workaround: "take a screenshot instead and upload that image."
- Time-boxed action: "If you are trying to reschedule or cancel the appointment during the scheduled appointment time, you will not be able to make changes."

`at this time` in the file-type message is doing small, honest work — it marks the limitation as current rather than permanent.

**Video-visit troubleshooting is written as the user's own panic** `[observed]`, three article headings:

- `My video visit link isn't working and I'm having trouble entering the waiting room. What should I do?`
- `I'm in the waiting room and it's time for my video visit, but nothing is happening. What should I do?`
- `Where do I get the link for my video visit?`

The second is the standout. It is a long, run-on, first-person sentence that names the exact moment of maximum anxiety — the appointment time has arrived and the screen is static. The answer offers a three-step self-check and then, crucially, a threshold and a next action: "It's possible the provider is running late. Contact the provider directly if they are more than 10 minutes late."

Naming a waiting threshold (`more than 10 minutes`) converts open-ended anxiety into a bounded wait. This is the same job an "estimated arrival" does for a payment.

**Report-an-issue reasons** `[observed]`: `I received an unexpected bill` · `The provider was incorrectly listed as in-network`. Both written in the user's first person, past tense, as statements of what happened rather than as categories.

**Rejected review recovery** `[observed]`: "you will get an email letting you know, with a link you can use to edit and resubmit your feedback." Rejection ships with the repair path attached.

## T8 Empty states

`[absent]`. No zero-results copy was reachable — the search results page is client-rendered and no help article quotes a no-results string.

The nearest published near-miss is an *alternative-offered* line rather than an empty state: "If a provider doesn't accept out-of-pocket bookings, you can choose a different provider on Zocdoc." It is recorded here only to mark that it is **not** an empty state, and should not be treated as one.

This is a real gap. Provider search on a constrained filter set (specialty + insurance + video-only + this week) will return zero results frequently, and the wording of that state — whether it suggests relaxing insurance, widening the radius, or expanding the date range — is one of the highest-stakes strings in the product. It requires a browser-rendered pass.

## T9 Notifications & system messages

**The reminder schedule is published in full** `[observed]`, article 8839056:

> "Reminder emails sent seven days and the day before"
> "An SMS three hours before your appointment time"

For a virtual appointment, two additional SMS: "15 minutes before the start time" and "At the scheduled start time".

Publishing the exact cadence pre-emptively answers both "will I be reminded?" and "why am I getting so many messages?". The virtual-appointment extras are correctly justified by the format — a video visit has a join action, so the T-15 and T-0 messages carry a link, not just a reminder.

**Intake nagging is disclosed as nagging** `[observed]`: "You will receive text and email reminders **until** you complete your required Intake forms for your appointment." The `until` is honest about the mechanic.

**Proactive-contact promise** `[observed]`: "Zocdoc will also get in touch if the office needs more information, there's an issue, or your appointment needs rescheduling, and the provider may reach out directly with additional instructions for your visit."

Three named triggers plus a fourth-party caveat, in one sentence. The user learns who may contact them and why, before it happens.

**Email footer link as a question** `[observed]`: `Something go wrong? Report an issue with your appointment.` Placed in both booking and reminder emails, so the escape hatch travels with every message rather than living in the account.

**In-Network Promise marker** `[observed]`: "you'll see a grey box that says "**In-Network Promise**" in the email you receive after booking." Describing the visual treatment (`grey box`) as well as the string is unusually helpful — the user is told what to look for, not just what it says.

**SMS legal strings** `[observed]`, Terms §18.2: `STOP to cancel or HELP for help.` Opt-out keywords enumerated: `STOP`, `END`, `CANCEL`, `UNSUBSCRIBE`, `QUIT`.

## T10 Disclosures, legal & compliance

### The insurance-accuracy caveat — the key artefact

This is a genuinely hard US content problem: Zocdoc displays insurance-network data it does not own, sourced from carriers and clearinghouses, which is frequently wrong, and on which the user's financial exposure depends.

**The legal position** `[observed]`, Terms §5 `Insurance Content:` — summarised, with the load-bearing sentences quoted. Insurance Content is "intended for general reference purposes and for your convenience only", and "can change frequently and may become out of date, incomplete or inaccurate." The user must "verify and maintain accurate insurance-related Personal Data (including… verifying such Personal Data obtained by automated means from an insurance card you provide)." The closing liability line is blunt: **"we are not responsible for any inaccurate, incomplete or outdated Insurance Content"**.

**The obligation is then pushed in three directions, in three different registers** — this layered structure is the thing worth studying:

1. **Onto the provider**, publicly `[observed]`, /about/how-search-works: "**doctors are obligated to provide us with accurate and up to date insurance participation information**."
2. **Onto the user**, in the help centre `[observed]`, article 8733187: "**To see accurate in-network providers, it's important to select the correct insurance plan when searching for care on Zocdoc.**"
3. **Onto Zocdoc's own process**, as reassurance `[observed]`, same article: "While our providers are expected to keep their insurance listings accurate at all times, we have additional steps in place to ensure you see accurate results on Zocdoc."

So the same fact — this data may be wrong — is written three ways for three audiences, and the *tone* varies by surface: all-caps disclaimer in the Terms, obligation language in the transparency page, second-person instruction in the help centre. That register gradient is the transferable part.

**Scope limits are stated plainly** `[observed]`: "Zocdoc cannot verify your dental or vision insurance coverage. Check your insurance card or contact your insurance provider directly." And the real-world hedge: "many offices still require you to bring your insurance card to your appointment."

### The In-Network Promise — a commercial backstop that disclaims being one

Zocdoc's answer to its own accuracy problem is a compensation programme, and the copy around it is a careful exercise in promising something while denying it is a promise `[observed]`:

- Marketing register: "If you receive an eligible out-of-network bill after your appointment, you won't face it alone. We'll work with the practice to resolve it—or provide up to $1,000 if we can't."
- Legal register, article 16557246: "a discretionary, case-specific customer service program"; "Any payment is discretionary, case-specific, and not guaranteed."; **"This is not insurance, a warranty, or a healthcare benefit."**
- The anti-overclaim FAQ: `Does verifying my insurance mean my care is free?` → **No.**

That FAQ question is the best de-risking move in the file. Zocdoc anticipates that `Verify your insurance` → `Verified In-Network Appointment` will be read as "I won't be charged", and asks the naive question in the user's own words in order to kill it. Copays, coinsurance and deductibles are named as still applying.

Bounds published: medical only, up to $1,000 per appointment, max 2 approved payments per person per year, $1,999 aggregate annual cap, report within 60 days of the first bill and no later than 6 months after the appointment. The exclusion list is long and specific (`copays, deductibles, coinsurance, … cancellation fees, no-show fees, … laboratory, imaging, pathology, anesthesia, … prescription medication costs`). Residual responsibility is restated: "The user remains responsible for resolving and paying any amounts owed to providers."

### Cost and fee boundaries `[observed]`, article 14900960

- `Can I pay through Zocdoc?` → **No.** "Payments are made directly to the doctor's office."
- "Zocdoc doesn't manage billing between you and your doctor's office."
- "If you were charged a fee for your appointment, such as a copay, cancellation fee, or no-show fee, these charges are handled directly by the doctor's office."
- "Zocdoc shows whether a provider is in-network or out-of-network. For exact costs, contact your insurance company or the doctor's office."

Where an estimate *is* shown, its provenance and its limits are both disclosed `[observed]`, article 8733197: sourced from "an insurance clearinghouse", and "This feature is not yet available for all insurance carriers and specialities."

### Medical-advice disclaimer `[observed]` — global footer, every page

> "The content provided here and elsewhere on the Zocdoc site or mobile app is provided for general informational purposes only. It is not intended as, and Zocdoc does not provide, medical advice, diagnosis or treatment. Always contact your healthcare provider directly with any questions you may have regarding your health or specific medical advice."

Terms §2 escalates the same point into all-caps and adds the emergency route: "DO NOT USE THE SERVICES FOR EMERGENCY MEDICAL NEEDS" … "IMMEDIATELY CALL A HEALTHCARE PROFESSIONAL AND/OR 9-1-1." Terms §3 adds: "NO LICENSED MEDICAL PROFESSIONAL/PATIENT RELATIONSHIP IS CREATED WHEN YOU USE THE SERVICES OR CONTENT."

### Marketplace neutrality and the commercial model `[observed]`

Terms §4 is unusually explicit for a marketplace: "YOU ARE RESPONSIBLE FOR CHOOSING YOUR OWN HEALTHCARE PROVIDER…"; Zocdoc "does not employ, refer to, recommend, or endorse any Healthcare Providers"; and "Zocdoc is not a referral service". The commercial relationship is disclosed in the same section: "Healthcare Providers listed through the Services… may pay us fees" and "If you book an appointment with a Healthcare Provider through the Services, Zocdoc may receive a fee."

Vetting is described concretely: active licence verification plus a check against the "U.S. Department of Health and Human Services Office of the Inspector General Exclusion database" — but with the limit attached: Zocdoc "is not responsible for ensuring that information (including credentials) a Healthcare Provider provides about himself or herself is accurate or up-to-date."

**Sponsored-results firewall** `[observed]`, /about/how-search-works: "A doctor's participation or non-participation in Sponsored Results does not impact his or her ranking in the core marketplace search results." Stating the *negative* — that paying does not buy organic rank — is the claim users actually want.

### AI disclaimer `[observed]`, Terms §5

"In rare cases, AI Features may provide incomplete, incorrect, or offensive information that does not represent our views." Mirrored in §1: "Content generated by artificial intelligence is not, and is not a substitute for, an opinion, medical advice, or diagnosis or treatment."

`offensive` is an unusual admission to make in terms of service, and more honest than the standard "may produce inaccurate results".

### Cancellation and no-show policy `[observed]`, article 8814211

Structure: expectation → user responsibility → definition → consequence → **`Why?`** → three bolded rules → two reminders.

- "we expect that patients make every effort to uphold their booked appointments."
- "you are responsible for rescheduling or canceling your appointment using your Zocdoc account as soon as possible."
- Consequence: "If you reschedule, cancel appointments frequently, fail to show up, or violate our community standards, **we reserve the right to limit or terminate your use of Zocdoc's service**."
- **`Why?`** → "Last minute-changes limit other patients' ability to receive the care they need and are very disruptive to providers and their staff."
- Rules: `Reschedule if possible:` · `Give sufficient notice:` ("preferably within 24 hours of booking your appointment. Please do not cancel within 24 hours of your appointment time.") · `Don't No-Show:`

**The `Why?` heading is the artefact.** A one-word interrogative heading inside a policy article, placed immediately after the punishment, answering the question the user is actually asking. And the justification is *other patients*, not Zocdoc's business and not provider revenue. Reframing a platform rule as a social obligation between users is far more persuasive than "to protect the integrity of our marketplace".

The Community Standards page makes the same move in a different voice `[observed]`: "Only book appointments you plan to attend to respect both the provider's time and other patients seeking care." And it applies the standard symmetrically — the provider code of conduct forbids "Never charge fees that only pertain to Zocdoc users" and "Never take any unlawful or unethical actions against patients for posting reviews". Publishing both sides of the conduct contract, on one page, is the structurally honest version of a community policy.

### HIPAA and consumer-health-data law `[observed]`

**HIPAA appears once, as a carve-out**, in the Consumer Health Data Privacy Policy: "This Consumer Health Data Privacy Policy does not apply to "protected health information" ("PHI"), which is regulated by the Health Insurance Portability and Accountability Act ("HIPAA")… Please read the Notice of Privacy Practices of your health care provider to understand how your PHI can be used and disclosed."

Zero HIPAA references in the Terms of Use. The policy instead names `Connecticut Data Privacy Act`, `Nevada Consumer Health Data Privacy Act`, `Washington State My Health My Data Act`, collectively `Consumer Health Privacy Laws`.

Rights labels `[observed]`: `Access and Portability` · `Correction` · `Deletion` · `Opt-Out of Sale, Targeted Advertising, and Profiling` · `Consent` · `Nondiscrimination` · `Appeal`.

Third-party disclosure categories `[observed]`: `Service Providers` · `Healthcare Providers` · `Insurance Clearinghouse` · `Business Partners` · `Payment Processors` · `Parties to a Corporate Transaction` · `Government Agencies` · `Other Third Parties` · `Other Users and Individuals` · `The Public`.

`The Public` as a named disclosure recipient is uncomfortable and correct — reviews are public, and the policy says so in the same list as everything else rather than burying it.

Sensitive-category acknowledgement `[observed]`: coverage "may include reproductive or sexual health information". Scope note in italics: "*Consumer health data does not include information that is publicly available, de-identified, or aggregated.*"

### Security practices, written for laypeople `[observed]`, /about/faq/

The legacy FAQ answers `How do we safeguard data?` with five labelled practices — privacy and security training (including a HIPAA gloss in parentheses), strong encryption, secure storage, expert auditing, smart features — each translating a technical control into a consequence. The encryption line benchmarks against a familiar reference point: "the same standard most banks use to protect your financial information." The last category is the good one: "**Smart features**: We build features that protect data on your end, too" — automatic sign-out, password-strength requirements, account lockout after repeated failures. Security framed as *things the product does for you*, not as certifications it holds.

## T11 Help-centre architecture

```
Patients, how can we help?          /patient-help/en/
├── My Account                      7 articles
├── Finding a Provider              9 articles
├── Appointments                    18 articles
│   ├── Making or managing appointments      12
│   ├── Intake forms                          1
│   ├── Video visits                          3
│   └── Rescheduling or canceling appointments 2
├── Insurance                       6 articles
├── Reviews                         3 articles
└── About Zocdoc                    7 articles
                     ↳ sibling site: Provider Help
```

**Category naming is a mix of gerund and noun** — `Finding a Provider` is the user's activity; `Appointments`, `Insurance`, `Reviews`, `My Account` are objects. `About Zocdoc` is a company category sitting in a task-oriented tree. The gerund form is the better one and Zocdoc uses it once.

**`Rescheduling or canceling appointments` is a sub-collection containing two articles.** Given that changing an appointment is the second most common reason a user reaches this help centre, and that the locked-account penalty flows directly from it, two articles is thin. Compare Wise (exemplar 041), where `Mistakes and editing your transfer` and `Cancellations and refunds` are two separate top-level sub-sections.

**Article-title grammar — four consistent shapes**

| Shape | Examples |
|---|---|
| First-person how-to question | `How do I make an appointment?` · `How do I reset my password?` · `How do I see my past appointments on Zocdoc?` |
| Definitional question | `What is a video visit?` · `What is a referral order?` · `What is a Patient Choice provider?` |
| Yes/no capability question | `Is Zocdoc free for patients?` · `Can I call Zocdoc to help me book an appointment?` · `Does Zocdoc have accessibility features?` · `Are the appointment times I see up-to-date?` |
| Imperative / noun label | `How to report an issue with an appointment` · `Video visit troubleshooting` · `Insurance FAQs` · `Understanding charges and fees from your doctor's office` |

The dominant shape is first person — `How do I…`, `my account`, `my insurance` — around twenty titles. The **title voice is the user's, the body voice is Zocdoc's.** That split is consistent and worth naming as a rule.

Two titles ask a question the company would rather not invite: `Is Zocdoc a healthcare provider?` (answer: no) and `Are the appointment times I see up-to-date?` (answer: yes, with a mechanism). Both are trust questions promoted to the article-title layer instead of being buried.

**Every article carries a one-line deck** `[observed]`: "Learn how and when you will receive appointment reminders" · "What to look for to ensure your appointment is booked." · "Instructions for making appointments for yourself or others, and what happens next." · "How to search with insurance and find in-network doctors on Zocdoc."

Decks are second-person or gerund. `…and what happens next` is a good habit — it tells the user the article covers the aftermath, not just the action.

**Date stamps are inconsistent** `[observed]`: some absolute (`April 12, 2024`), some relative (`Updated over 3 weeks ago`, `Updated over a week ago`). Relative stamps are Intercom defaults; the mix means a user cannot tell whether an unstamped-looking article is fresh.

Articles end with `Related Articles` (5 links) and the reaction row `Did this answer your question?`.

## T12 FAQs

**Placement is the finding.** Zocdoc runs FAQ blocks in three distinct locations doing three distinct jobs:

1. **`/about/how-search-works`** — a seven-question block whose job is *algorithmic accountability*.
2. **Inside help articles** — `Insurance FAQs`, `Reviews FAQs` are article titles, so an FAQ is a leaf node of the help tree, not a marketing block.
3. **`/about/verifiedreviews/`** — a 10-question block under a `Frequently Asked Questions` heading doing *trust-in-UGC* work.

**Search-transparency FAQ** `[observed]`, verbatim:

- `How does Zocdoc search work?`
- `What factors do you take into account in search rankings?`
- `How often do search results and rankings change?`
- `How do you vet doctors before they appear in your search results?`
- `How do you ensure a provider is qualified to appear in a given search?`
- `Do you steer patients to particular doctors? For example, do you have protocols to evenly distribute appointments across all or a subset of doctors?`
- `Can doctors pay to appear more prominently in search results?`

The sixth is remarkable. Nobody asks a marketplace whether it has "protocols to evenly distribute appointments across a subset of doctors" — that is a regulator's or a journalist's question, written out in full, and answered `No`. Zocdoc is using its consumer FAQ to answer scrutiny it has presumably already received. Placing the hostile question verbatim on a public page, rather than paraphrasing it into something gentler, is the confident move.

The answers also do vocabulary work: Zocdoc discloses that it maps colloquial language to clinical specialties, illustrated with `"gyno" → "obstetrician-gynecologist"`. Publishing the slang you accept is a small kindness to users who don't know the formal word.

**Insurance FAQs** `[observed]`, verbatim: `What if I don't see my insurance listed on Zocdoc?` · `Does Zocdoc require me to upload a photo of my insurance card?` · `If I add my insurance to my account, should I still bring my card to my appointment?` · `Is my insurance card secure with Zocdoc?` · `What if I have more than one insurance plan?` · `What if I don't want to share my insurance with my provider?` · `I'm not sure if I have dental or vision insurance. Can Zocdoc help?`

Four of seven begin `What if I…` — a conditional-anxiety pattern. The last one is the best because it admits ignorance on the user's behalf ("I'm not sure if I have…") and the honest answer is no.

**Charges and fees FAQs** `[observed]`: `I was charged a no-show fee. Can Zocdoc help?` · `How much will my appointment cost?` · `How much is my copay?` · `Can I pay through Zocdoc?` · `I was charged by the doctor's office. Can Zocdoc help?`

Three of five are answered substantively **no**. Writing an FAQ block where the majority answer is "we can't help with that, here is who can" is unusual and correct — the alternative is users spending an hour discovering it themselves.

**Reviews FAQs** `[observed]`: `Why should I trust the reviews on Zocdoc?` · `Does Zocdoc only post positive reviews?` · `Does Zocdoc moderate patient reviews?` · `I submitted a review. Why hasn't it been posted yet?` · `Are there instances where you won't post my review?` · `What happens if my review is not accepted?` · `Can I edit my review?`

`Does Zocdoc only post positive reviews?` is answered "Absolutely not!" — the one exclamation mark in the harvested corpus, spent on a credibility denial.

**Non-suppression rules published** `[observed]`, /about/verifiedreviews/: "providers are prohibited from unduly influencing reviews or taking negative action against users who leave a negative review. If a provider asks you to remove or refrain from posting a critical Zocdoc Review, please contact us." Zocdoc tells the patient what the *provider* is forbidden from doing to them, and gives them a reporting route. That is protective copy, and it is rare.

**Review-guidance copy** `[observed]` — the `How can I leave a great review?` block is six labelled tips: `Keep it relevant:` · `Ask yourself:` · `Consider the length:` · `Be specific:` · `Include details:` · `Be authentic:`. The details tip is concrete in a way generic guidance never is — "whether or not the office validates parking, whether it is located close to public transportation". And `Be authentic:` now carries an AI clause: "Don't use AI to write your reviews and don't let providers tell you what to write." Two very different threats to authenticity, addressed in one sentence.

## T13 Terminology & glossary

| Term | Zocdoc's usage | The alternative it rejected |
|---|---|---|
| `doctor` / `provider` | **Both, split by surface** — `doctor` in marketing and SEO (`Book local doctors…`, `Best Doctors Near Me`), `provider` in help and policy (`Finding a Provider`, `in-network providers`) | picking one |
| `Healthcare Providers` | Capitalised defined term, Terms only | |
| `patients` | Never "users" in consumer copy | "users", "customers", "members" |
| `visit reason` | The canonical input noun; homepage section `Common visit reasons`; payload field `Reason for visit` | "chief complaint", "symptom", "service" |
| `in-network` / `out-of-network` | Hyphenated, lower case, everywhere | "covered", "participating" |
| `In-Network Promise` | Title-cased product name | "guarantee", "protection" |
| `Verified In-Network Appointment` | Contractually defined state | |
| `Zocdoc Patient Review` / `Partner Review` / `Supplemental Reviews` | Three named review provenances | one undifferentiated "review" |
| `Verified reviews` | Marketing umbrella | "authentic reviews" |
| `Patient Choice` | Provider badge | "top rated", "recommended" |
| `AI Care Assistant` ↔ `Classic search` | Two named search modes | "AI search" / "standard search" |
| `guided search` | Lower case, the pre-AI question flow | |
| `Sponsored` / `Sponsored Results` | Ad label | "promoted", "featured" |
| `Intake` | Capital-I product noun; `Intake forms`, `Appointment Checklist`, `intake tasks` | "paperwork", "forms" |
| `video visit` | Consumer term (`Telemedicine Services` in Terms only) | "telehealth", "virtual consultation" |
| `The Paper Gown` | Patient blog | "blog", "health hub" |
| `I'm paying for myself` | Out-of-pocket option | "self-pay", "uninsured" |
| `Zo` | Provider-side AI phone assistant | |

**The `doctor`/`provider` split is a deliberate register decision, not sloppiness.** `doctor` is what the user searches for and what Google indexes; `provider` is the accurate umbrella that includes dentists, therapists, nurse practitioners and imaging facilities. Zocdoc uses the user's word where acquisition happens and the correct word where precision matters. The seam shows occasionally — `How do I review a doctor I found on Zocdoc?` sits inside a system whose collection is named `Finding a Provider` — but the rule is legible.

`[absent]`: `Care Access Network` appears in the About-page link row but on no harvested page; `waitlist` appears nowhere.

## T14 Voice, tone & accessibility

**Person.** Second person to the patient in body copy, first-person plural for the company, and **first person for the patient in help-article titles**. The title voice is the user's, the body voice is Zocdoc's. This is consistent across ~40 article titles and is the clearest voice rule in the file.

**Register.** Contractions standard. Marketing voice is casually idiomatic — `Ready to be seen?`, `Let's get you a doc who gets you`, `There's more!` — and occasionally aphoristic: "We like to say patients no longer have to be a doctor to find a doctor."

**Empathy formulas recur in policy copy**, which is where they matter: "We understand that unforeseen circumstances may prevent you from attending…" · "we'll figure this out together" · "We still want to help." · "you won't face it alone." · "Don't let this stop you from leaving feedback".

The register break is sharp and deliberate: the Terms of Use flip into all-caps blocks (`YOU ARE RESPONSIBLE FOR CHOOSING YOUR OWN HEALTHCARE PROVIDER`), while the help centre stays warm. Unlike Wise (041), where tone flattens gradually as stakes rise, Zocdoc has **two registers with a hard boundary at the legal page**. The help centre carries the substantive disclosures in the warm voice; the Terms carry them again in the cold one. Users get the honest version twice, at two different reading levels.

**Mission line, stated identically in three places** `[observed]`: "Our mission at Zocdoc is to give power to the patient." Community Standards adds: "our company's No. 1 core value is "Patients First."" And that value is then used to justify a *pricing* fact — "In fact, that's why booking through Zocdoc is free for patients" — followed by a fraud warning in the same breath: "Zocdoc will also never ask you for credit card or payment information over the phone or via email."

Putting an anti-phishing warning inside a values statement is an odd adjacency, and an effective one: the user is reading about trust when they are told what a scam would look like.

**Accessibility statement** `[observed]`, article 8724669 — notable for *where it lives*:

> "The Zocdoc team strives to maintain our site, emails, blogs, and other related digital assets in accordance with WCAG 2.1 level AA of the Web Content Accessibility Guidelines (WCAG), a set of standards for digital accessibility for people with disabilities, including users of screen-reader technology."
> "If you encounter issues with digital accessibility, we welcome your feedback. Please email accessibility@zocdoc.com."

Two observations. First, it is a **help-centre article** (`Does Zocdoc have accessibility features?`), not a footer page — findable by search, but absent from the persistent navigation where most organisations put it. Second, `strives to maintain… in accordance with` is a process commitment, not a conformance claim. There is no conformance level asserted, no date of last audit, no known-limitations section, and no non-email contact route. For a healthcare-adjacent US service with ADA exposure, this is a thin statement.

**Skip links** `[observed]`: `Skip to main content` on every help-centre page; `Skip to search results` on `/search`. **The main marketing pages — homepage, `/specialty`, `/primary-care-doctors` — did not expose a skip link in fetched markup.** `[absent]` there. The help centre (a third-party Intercom product) is better instrumented than Zocdoc's own pages.

**Alt text — good in places, with two clear defects** `[observed]`

Good: "Screenshots of the Zocdoc app showing appointment times and video visits" · "QR code to download Zocdoc app" · app-store links titled `Download the Zocdoc app from the Apple App Store` · social links `Follow Zocdoc on Twitter`, `Connect with Zocdoc on LinkedIn`. Provider photos use the bare name (`Dr. Katherine Mazurek`) with no "photo of" prefix — correct.

Defects:
- **Debug-pattern alt on insurance-carrier logos**: `insurance link for 300`, `insurance link for 307`. Numeric IDs leaking into accessible names on a control that is functionally important (choosing your carrier).
- **Decorative marker leaking as literal text**: `location pin icon` renders on every provider card.
- Typos in live alt text on health-system logos: `Tufts Medial`, `Intermount Health`.
- The feedback widget is correctly done — `Disappointed Reaction` / `Neutral Reaction` / `Smiley Reaction` are spelled-out accessible names rather than emoji alone.

**Other live copy defects**: `5.00 • 1 reviews` (un-pluralised) on provider cards; `Urgent care` is the only lower-case, singular entry in a 66-item pluralised specialty list; `Past Appointments` vs `Appointment History` across platforms; three labels for cancel/reschedule.

---

## Transferable patterns

1. **Gloss the domain noun in the sentence where the user must act on it.** "your **carrier** (another name for your insurance company) and **plan** (the specific coverage you have with that carrier)". Not a tooltip, not a glossary — a parenthetical at the point of decision. Applies wherever a form asks for a term the user holds a card for but cannot name: sort code vs account number, BIC vs IBAN, merchant ID vs account ID.
2. **Put `Why?` as a heading inside a policy, immediately after the consequence — and justify by other users, not by the business.** Zocdoc's no-show policy answers "Why?" with "Last minute-changes limit other patients' ability to receive the care they need". Applies to rate limits, hold periods, and any restriction users experience as arbitrary punishment.
3. **Ask the naive over-reading question in the user's own words and kill it.** `Does verifying my insurance mean my care is free?` → No. Any time a reassuring verb (`verified`, `protected`, `guaranteed`, `covered`) is applied to something with residual user exposure, write the question the user will actually form and answer it in the FAQ.
4. **Publish ranking inputs as labelled criteria with a worked example.** Four bolded labels plus the heartburn example. Directly applicable to search relevance, fraud scoring, credit-decision explanation, and any ordered list the user suspects is rigged.
5. **Publish the exact payload you forward to a third party.** The seven-field list of what the doctor's office receives removes an entire category of anxiety for an intermediary product.
6. **Model "declining" and "not represented" as separate options.** `I'd prefer not to say` and `None of these apply to me` are different states. Shipping only the first forces unrepresented users to look as though they are withholding.
7. **Attach a threshold to an open-ended wait.** "Contact the provider directly if they are more than 10 minutes late." Converts unbounded anxiety into a bounded wait with a named next action.
8. **Recovery voice for automated punishments: name the cause, then "we'll figure this out together".** First-person-plural, non-defensive, no euphemism about why the account was locked.
9. **Publish both sides of a conduct contract on one page.** Community Standards binds providers not to charge Zocdoc-specific fees or retaliate against reviewers, in the same document that binds patients not to no-show. Symmetry is what makes the patient-facing half credible.

## Caveats & gaps

- **The search results page is blocked.** `zocdoc.com/search` is client-rendered and returns `Loading...` only. This is the most consequential gap in the file: all live filter chips, the sort menu, the distance control, the results-count string, and — critically — the **no-results empty state** are unobserved. T5's filter vocabulary is reconstructed from three non-matching help-article descriptions plus URL parameters, and is `[documented]` throughout. A browser-rendered pass is required before any Zocdoc filter string is used as precedent.
- **`/patient/insurance-advocacy` is blocked.** The "Insurance Advocacy" concept is referenced from article 8733187 but no body copy was readable. `[absent]`.
- **`/video-doctor-visits/` returned an empty body** on two attempts. Video-visit copy in this file comes from help articles, not the marketing page.
- **Placeholder text is unobtainable** — injected client-side on every form. The `Search` field's resting placeholder is likely where the four accepted input types are actually communicated to users, and it was not captured.
- **All in-product states are `[documented]`.** Booking confirmation, appointment lists, the Appointment Checklist, the waiting room, and all toast/validation copy are described in help articles and quoted in prose, never observed.
- **No empty states captured at all.** See T8.
- **Provider-side surfaces not harvested.** `/provider-help/en/`, `/business/`, and the `Zo` product pages are unexplored; the provider half of the marketplace has its own vocabulary that would sharpen the terminology analysis.
- **en-US only.** Zocdoc is US-domestic; no locale questions arise, but nothing here transfers to a market without a private-insurance network model.
- **Terms of Use is long and was parsed rather than read in full.** Sections 1–10 and 18 were extracted; the remainder is unexamined.

## Sources

1. https://www.zocdoc.com/
2. https://www.zocdoc.com/specialty
3. https://www.zocdoc.com/primary-care-doctors
4. https://www.zocdoc.com/about/
5. https://www.zocdoc.com/about/how-search-works
6. https://www.zocdoc.com/about/verifiedreviews/
7. https://www.zocdoc.com/about/communitystandards/
8. https://www.zocdoc.com/about/faq/
9. https://www.zocdoc.com/about/contactus/
10. https://www.zocdoc.com/about/terms
11. https://www.zocdoc.com/about/consumer-health-data-privacy-policy
12. https://www.zocdoc.com/patient-help/en/
13. https://www.zocdoc.com/patient-help/en/collections/6124851-my-account
14. https://www.zocdoc.com/patient-help/en/collections/7005459-finding-a-provider
15. https://www.zocdoc.com/patient-help/en/collections/6124924-appointments
16. https://www.zocdoc.com/patient-help/en/collections/7490610-making-or-managing-appointments
17. https://www.zocdoc.com/patient-help/en/collections/7490648-intake-forms
18. https://www.zocdoc.com/patient-help/en/collections/6124926-video-visits
19. https://www.zocdoc.com/patient-help/en/collections/6180473-rescheduling-or-canceling-appointments
20. https://www.zocdoc.com/patient-help/en/collections/6783241-insurance
21. https://www.zocdoc.com/patient-help/en/collections/7005461-reviews
22. https://www.zocdoc.com/patient-help/en/collections/7005452-about-zocdoc
23–37. Help articles: 8724858 · 8814211 · 8839056 · 8839046 · 8839032 · 8839050 · 8838855 · 8724718 · 8843910 · 9029012 · 10859570 · 8724711 · 8711850 · 8711864 · 8711886 · 8724732 · 8733187 · 8733217 · 8733190 · 8733197 · 14900960 · 16557288 · 16557246 · 8975433 · 8975443 · 16309168 · 11061822 · 8975442 · 8733517 · 8724654 · 8724667 · 8724669 · 8797268 · 8797272 · 8797278 · 8724688 · 8724705 (all under https://www.zocdoc.com/patient-help/en/articles/)
38. https://www.zocdoc.com/search — **blocked**
