# 117. BetterHelp

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Online therapy marketplace (subscription-first, matched-provider model) |
| Primary URL | https://www.betterhelp.com/ |
| Corpus rank | 117 |
| Benchmark strength (source list) | Sensitive intake and disclosures |
| Locale / market observed | en-US primary; site offers `English / Deutsch / Français / Nederlands / Español` and per-country therapy pages (UK, FR, DE, NL, ES, AU, CA, AT) |
| Platform observed | Web (desktop), FAQ, terms, legal and crisis-resource pages |
| Auth state | Unauthenticated public surfaces only. **The intake questionnaire was not started** — see Caveats |
| Regulatory posture | **FTC:** BetterHelp was subject to a 2023 Federal Trade Commission action concerning the sharing of consumers' health data with advertising platforms; the resulting order provided for $7.8m in consumer redress and restricted disclosure of consumer health data for advertising. The company now publishes a dedicated `Consumer Health Data Privacy Policy`, a `Sharing settings` control, and an opt-in gate for advertising-partner sharing — all observed. **State licensure:** providers "registered, licensed, and credentialed (as applicable) in each jurisdiction they opt into serving"; matching is location-gated first. **US health-privacy laws:** Washington My Health My Data Act (MHMDA) and Nevada Health Data Privacy Act (NHDPA) named explicitly; a `Notice of Privacy Practices` (HIPAA-style) applies to the insurance offering via Uplift Behavioral Health, P.C. **EU/UK:** 14-day statutory withdrawal right honoured via a published `Withdrawal Form`; an `Impressum` is served on EU-facing pages; country-specific scope limits stated for AT, DE, NL, FR, ES, CH. **No Good Faith Estimate** is referenced (No Surprises Act). Owned by Teladoc Health, Inc. |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial — marketing, therapist-network, crisis, terms, health-data and accessibility surfaces captured in full. The `/faq/` index renders **questions only** (answers are client-side accordions); most answer substance was recovered from equivalent accordions on `/` and `/online-therapy/`. Intake questionnaire deliberately not entered. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.betterhelp.com/ | Hero, type-of-therapy selector, comparison table, 9-item FAQ with answers |
| Online therapy (pillar) | https://www.betterhelp.com/online-therapy/ | 5-step how-it-works, vetting criteria, 20-question FAQ **with answers**, crisis resource list, cancellation steps |
| FAQ index | https://www.betterhelp.com/faq/ | 24 questions verbatim; answers not in server HTML |
| Get Help Now (crisis) | https://www.betterhelp.com/gethelpnow/ | Full US crisis resource list + disclaimer + last-updated date |
| Terms & Conditions | https://www.betterhelp.com/terms/ | Scope disclosure, subscription/auto-renewal, matching-logic disclosure, per-country scope limits |
| Consumer Health Data Privacy Policy | https://www.betterhelp.com/health-data/ | MHMDA/NHDPA categories, sources, uses, sharing, rights |
| Find a therapist (directory) | https://www.betterhelp.com/therapists/ | Full filter taxonomy — the richest field-label artefact on the site |
| Web Accessibility | https://www.betterhelp.com/accessibility/ | Overlay-based approach, WCAG AA aspiration |
| About us | https://www.betterhelp.com/about/ | Mission framing, network credentials, social-impact numbers |

---

## T1 Navigation & IA labels `[observed]`

**Global nav is flat and short** — seven items plus two auth actions:
`Business` · `About` · `Advice` · `FAQ` · `Reviews` · `Therapist jobs` ·
`Contact`, then `Log in` and `Get started`.

Two observations. `Advice` (not "Blog", not "Resources") is the content-marketing
label — a promise of usefulness rather than a format. `Therapist jobs` puts
supply-side recruitment in the consumer nav, which is a marketplace tell.

**Footer is three-banded**, and the bands are ordered by decreasing warmth:

1. *Product/company*: `Home` · `Business` · `About` · `FAQ` · `Reviews` · `Advice` · `Careers` · `Find a Therapist` · `Online Therapy` · `Contact` · `For Therapists` · `AARP`
2. *Social*
3. *Legal/control*: `Terms & Conditions` · `Mobile Terms` · `Privacy Policy` · `Health Data` · `Sharing Settings` · `Web Accessibility` — and on some pages additionally `Impressum`, `Withdrawal Form`, `Cancel Subscription`

Three of those legal items are structurally interesting. **`Health Data` is a
top-level footer link on every page**, not a section inside the privacy policy.
**`Sharing Settings` is a control, not a document** — a JS-invoked preference
panel sitting in the legal band. **`Cancel Subscription` appears in the footer**
on the `/online-therapy/` variant, i.e. cancellation is reachable without
logging in. All three read as direct, legible responses to the 2023 FTC matter
and to auto-renewal criticism generally; recorded as observed facts, with the
regulatory context noted in the posture row rather than inferred as causation.

**Above the footer, on every page, sits a crisis line** (see T10) — it is
positioned as the *first* thing in the footer region, above the SSL badge and
above the nav bands.

**`About` has its own sub-nav**, and its members are unusual:
`About` · `Careers` · `Social impact` · `Client outcomes` · `Responsible AI`.
Publishing `Client outcomes` and `Responsible AI` as named public pages is an
accountability posture.

## T2 Value proposition & headline patterns `[observed]`

**Homepage hero is four words and an emotional claim:**

> `You deserve to be happy.`

No product noun, no mechanism, no differentiator. The differentiation is deferred
to a scale claim in the next section: `The world's largest therapy service. 100% online.`

`You deserve to be happy.` is repeated in the site's own meta description
("Get help, you deserve to be happy!") and echoed later as
`You deserve to feel better`. It is the anchor phrase. It is also an
**entitlement framing rather than a capability framing** — the claim is about the
reader's worthiness, not the service's efficacy, which sidesteps having to
qualify a clinical claim in the hero.

**Numbers are rendered as live-looking counters**, to the digit:
`487,290,649` messages/chat/audio/video sessions · `31,423` licensed therapists
ready to help · `6,687,048` people got help. The precision-to-the-unit is the
trust device; rounded forms (`31,000+`, `6 million`) are used elsewhere on the
same site, so the counters read as deliberate.

**Section headers are reassurance, stacked:**
`Professional, licensed, and vetted therapists who you can trust` ·
`How it works` · `Get matched to the best therapist for you` ·
`Communicate your way` · `Therapy when you need it` ·
`BetterHelp vs. traditional in-office therapy`

The three how-it-works headers are each **a promise about the user's agency**
(matched *for you*, *your* way, when *you* need it) — the whole value prop is
control, not clinical outcome.

**The comparison table is the real argument.** `BetterHelp vs. traditional
in-office therapy`, twelve rows, Yes/No/Unsure. It concedes one row
(`Provided by a licensed therapist` = Yes for both) and wins the other eleven.
One row is answered `Unsure` for the competitor (`Group sessions`) rather than
`No` — a small honesty signal inside a self-serving artefact.

**Pillar-page hero drops the emotion and leads with three bounded facts:**
`Online therapy with licensed therapists` — "Data-driven match with a licensed
therapist" · "Most major insurance providers in-network" · "$23 copay on average
for eligible members". Every one of the three carries a qualifier
(*data-driven*, *most*, *on average for eligible*). The hero register hardens as
the page gets closer to the transaction.

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Header (×2), FAQ foot, homepage | The default |
| `Get matched to a therapist` | Homepage body | Names the mechanism |
| `Get matched with a therapist` | FAQ page foot | **Near-duplicate of the above with a different preposition** |
| `Match with a qualified therapist` | Therapist directory foot | Third variant of one action |
| `Connect with a qualified therapist who understands you` | Pillar page | Fourth variant, longest |
| `Get matched with a therapist who *gets you*` | Pillar hero | Fifth variant, with emphasis markup |
| `Begin your healing journey today` | Pillar, after step 5 | Journey metaphor |
| `Get started today` | Pillar foot | |
| `Log in` | Header | |
| `Individual — For myself` | Hero type selector | Label + audience gloss |
| `Couples — For me and my partner` | Hero type selector | |
| `Teen — For my child` | Hero type selector | Third-person: the buyer is the parent |
| `Learn more` | Insurance asterisk | Opens a modal, not a page |
| `Gift a membership` | Gift block | |
| `More success stories` / `See more reviews` | Social proof | Two labels, one destination type |
| `More frequently asked questions` | FAQ block | |
| `View all 30,000+ therapists` | Pillar | Number in the label |
| `View Profile` | Therapist cards | |
| `Find care` | Directory filter submit | Not "Search" — an outcome verb |
| `Apply filters` / `Reset filters` | Directory modal | |
| `See more (46)` / `See more (75)` | Filter lists | Count-bearing progressive disclosure |
| `Skip to Main Content` | First in DOM | Accessibility |
| `These resources` | Crisis line, every page | The crisis link label — see T10 |
| `Keep me active` / `Log out` | Session-expiry modal | |
| `Stay on BetterHelp (individual therapy)` | Redirect modal | Parenthetical disambiguation |
| `Go to Regain.us (couples therapy)` | Redirect modal | Names the sister brand and its purpose |
| `Go to TeenCounseling.com (therapy for your child)` | Redirect modal | |
| `Confirm Termination` | Unauthenticated cancellation form | The single coldest string on the site |
| `Sharing settings` / `I agree` | Cookie consent | |

**Finding: five distinct labels for one action.** `Get matched to a therapist`,
`Get matched with a therapist`, `Match with a qualified therapist`,
`Connect with a qualified therapist who understands you`, and
`Get matched with a therapist who gets you` all initiate the same flow. This is
the clearest governance failure in the file — and it is almost certainly
deliberate landing-page A/B variation that has calcified into inconsistency.

**Counter-finding: the redirect modals are excellent.** Every option is a full
sentence with a parenthetical stating what the destination *is for*, and the
modal publishes its own keyboard escape route in body copy:
"Please use the escape key to dismiss this modal dialog" and
"Please use the tab key to go to TeenCounseling". Instructions for assistive
navigation written into visible copy, not just ARIA.

**`Confirm Termination`** deserves separate note. It is the submit label on the
unauthenticated cancellation form and it is jarringly legalistic against a site
whose hero is `You deserve to be happy.` See T10 and T14.

## T4 Onboarding & getting-started `[observed]` / `[documented]`

**Homepage: three steps, each a user-agency promise.**

1. `Get matched to the best therapist for you` — "Answer a few questions to find a licensed therapist who fits your needs and preferences — and, where available, accepts your insurance plan."
2. `Communicate your way` — text, chat, audio, or video; "the same professionalism as an in-office therapist."
3. `Therapy when you need it` — message anytime; schedule live sessions; any device.

**Pillar page: five steps, and this is the fuller artefact.**

1. `Fill out a 5-minute assessment.` — "Answer a short series of questions about your virtual care preferences and mental health to help us find the ***right therapist*** for your mental health needs."
2. `Get your monthly cost estimate.` — price stated as `$70-100/week billed monthly`, with four named variables: "location, preferences, insurance, and therapist availability".
3. `Most match with a therapist in 24-48 hours.` — with two audited-sounding figures: "96% of users matched with a therapist within 24 hours in 2024, and 91% of user preferences were met in 2025."
4. `Start therapy.` — "Weekly sessions are included in your subscription, and can range from 30-45 minutes."
5. `Get ongoing support outside of sessions.` — worksheets, goal/habit tracking, journaling, "300+ support groups, and 35+ educational classes".

Four things worth recording.

**(a) The step headings are punctuated with full stops despite being fragments** —
same convention as the Wise exemplar. **(b) Step 1 puts a duration in the step
name** (`5-minute assessment`), which is the single most effective anxiety
reducer available for an intake flow: it bounds the ask before the ask.
**(c) Step 2 is a *price* step.** Cost estimation is elevated to a named stage of
onboarding rather than appearing as a surprise at checkout. **(d) Step 3 hedges
in the heading itself** — `Most match…`, not "Match in 24-48 hours."

**Matching described as a hedge throughout.** Across pages the claim is
consistently softened: "who is likely to be a good fit" is Talkspace's
formulation, but BetterHelp's is "we can then get a better understanding of who
would be a good fit", "We have found that we are able to provide a successful
match most of the time; however, if you start the process and you feel your
therapist isn't a good fit for you, you may elect to be matched to a different
therapist." **The failure case is written into the same sentence as the claim.**

## T5 Form & field labels `[observed]` — PRIORITY

### The intake questionnaire — `[documented]`, not entered

**No questionnaire was started.** What the questionnaire asks is recorded here
only from BetterHelp's own published descriptions, across four pages:

- `Fill out a 5-minute assessment.` — "Answer a short series of questions about your virtual care preferences and mental health…" (pillar, step 1)
- "we have you answer a few questions about yourself, your experience in therapy, your current mental health, your personal preferences for a therapist, and whether you're looking for a licensed provider that's covered by insurance" (pillar FAQ)
- "The questionnaire asks about the concerns you want to work on, such as anxiety, depression, stress, relationships, or life transitions, and about preferences like therapist background or communication style." (directory FAQ)
- "If you are not sure which concern fits, a short questionnaire can help point you toward a therapist who works with your situation." (directory FAQ)

So the published field taxonomy is: **(1) about you, (2) prior therapy
experience, (3) current mental health, (4) therapist preferences, (5) insurance
status.** Notably, the marketing description leads with *preferences* and
*virtual care preferences* and mentions mental-health content second — the ask is
framed as a preference survey rather than a clinical history.

The entry point is also framed as low-commitment at the hero: the user first
picks a *type* (`Individual — For myself` / `Couples — For me and my partner` /
`Teen — For my child`), and only the `Individual` option proceeds; the other two
open a modal offering transfer to the sister sites. The first question a user
answers is therefore an easy one about *who*, not a hard one about *how you feel*.

### The therapist directory filters — `[observed]`

This is the richest observable field-label artefact and it is effectively the
intake taxonomy made visible. Five required/optional fields at the top:

| Field label (verbatim) | Notes |
|---|---|
| `State` | Required first — licensure gate before anything clinical |
| `Insurance provider (optional)` | With an explicit opt-out option: `None - I'll pay out of pocket` |
| `Expertise (optional)` | Two-tier: `Commonly selected` then `A → Z` |
| `Find care` | Submit |
| `No results` | Empty-state string on every select (see T8) |

The `Expertise` list is split into `Commonly selected` (`Depression`,
`Stress and anxiety`) and an alphabetical remainder — **surfacing the two most
common concerns above the alphabet** so the majority never has to scan.

The full filter modal exposes a far larger taxonomy, grouped:

- `Therapist identity` → `Therapist gender` (`Male` / `Female` / `Nonconforming`), `Therapist faith` (`Christian-based therapy` / `Non-religious therapist`), `Therapist race or ethnicity` (`Asian`, `Black`), `Therapist age` (`Older therapist (45+)`), `Therapist sexuality` (`LGBTQ+`)
- `Service type` → `Individual Counseling` · `Teen Counseling` · `Couples Counseling`
- `Focus area` → 75+ items including `Abandonment`, `Body image`, `Codependency`, `Domestic violence`, `Emptiness`, `Guilt and shame`, `Gender dysphoria`, `Hospice and end-of-life counseling`, `Infidelity`, `Isolation / loneliness`, `Life purpose`, `Self-harm`, `Sexual assault and abuse`, `Hearing impaired`, `Visually impaired`
- `Clinical approach` → 21 named modalities (`Acceptance and Commitment Therapy (ACT)`, `CBT`, `DBT`, `EMDR`, `Gottman Method`, `Internal Family Systems`, `Somatic Therapy`…)
- `Language` → `English` · `Spanish`

**Three design notes.** First, `Therapist identity` is a *named group* — the
product treats matching on a clinician's race, faith, gender, age and sexuality
as a legitimate, labelled user need rather than an awkward implicit one. Second,
the granularity of `Focus area` is the highest in this batch: `Emptiness` and
`Life purpose` sit beside `Domestic violence` and `Self-harm`, which means the
taxonomy accommodates both existential and acute presentations without
re-ranking them. Third, `Hearing impaired` and `Visually impaired` appear as
focus areas — i.e. disability is modelled as something a therapist specialises
in supporting.

**Counter-observation:** `Therapist race or ethnicity` offers only `Asian` and
`Black` in the visible list, and `Therapist age` offers only `Older therapist
(45+)`. These are one-sided taxonomies — there is no corresponding
`Younger therapist` or wider ethnicity set in the rendered options. Recorded as
observed; it may be availability-driven rather than a design choice.

### Other observable inputs

- Unauthenticated cancellation form: `Your email address`, submit `Confirm Termination`, with a pre-emptive explanation of why the field is needed (quoted in T10).
- `Language settings` modal: `Choose language:`, `Save`.
- Cookie consent: `Sharing settings` / `I agree`.

## T6 Status & state language `[observed]` / `[documented]`

- `Matched` is the central state: "how long until I'm matched", "Most match with a therapist in 24-48 hours", "96% of users matched with a therapist within 24 hours".
- Timing is published with an explicit variance statement: "This process can take a few hours or a few days, depending on therapist availability." — *the range is the answer*, not a single number.
- Therapist departure is a named, notified state `[documented]`: "If a Provider you have been connected with stops using the Platform at any time after you have been connected, we will send an email to notify you that your Provider is no longer on the Platform and that you have the opportunity to match with a new Provider."
- Session credits expire, stated as a state rule with a worked example `[documented]`: "any sessions (video, phone or chat) accrued but unused within a billing cycle will not roll over" — followed by a May/June arithmetic example.
- Subscription billing start is decoupled from payment: "Your subscription/billing period will run from the date you are matched", with a July 1 / July 2 worked example.
- Session expiry modal `[observed]`: `Your session is about to expire!` / "You will be logged out in [n] seconds." / `Keep me active` / `Log out`.
- Link expiry `[observed]`: `Link Expired` — "We're sorry, the link you're trying to use has expired."

**The worked-example convention is the notable pattern.** Three separate billing
and credit rules are each followed by a concrete dated example. In a subscription
product with a history of billing complaints, examples do work that policy prose
cannot.

## T7 Error, failure & recovery `[observed]`

- `Link Expired` — "We're sorry, the link you're trying to use has expired." `Close`
- `Your account recovery request has been sent` — "Your request has been successfully sent to our support team. They will respond as quickly as possible, which may take up to 1 business day." `Close`
- `Your subscription cancellation request is being processed. If your email is on file you will receive an email shortly.` `OK`
- `Oops! Something went wrong while submitting the form.` (newsletter) — the only `Oops!` on the site, and it is on the lowest-stakes form. Correct placement.
- Cancellation-form preamble, which is a *pre-emptive* error explanation rather than a post-hoc one:
  > "While we cannot legally mandate that you provide the information sought below, note that if you do not provide any information (or the information you provide is inaccurate) we will be unable to verify that you have an account with us and therefore process the cancellation you are requesting."

That preamble is doing three jobs at once: disclaiming compulsion, explaining
consequence, and pre-empting the failure. It is legally careful and cognitively
heavy — 48 words before an email field.

**The relationship-failure path is the interesting recovery case**, and BetterHelp
treats it as routine rather than as an error:
> "If you're unhappy with your therapist, click a button and get matched to another provider" (comparison table)
> "if your current provider is not the right fit for your tailored plan, there are many other licensed providers" (FAQ)
> "it is easy to switch to a different therapist after your first session for no extra cost. Successful therapy often depends heavily on provider-patient match, so don't be afraid to switch therapists if your current therapist is not helping you."

`don't be afraid to switch` is permission-granting copy aimed at a known social
inhibition. It reframes a user's discomfort as a normal feature of care.

## T8 Empty states `[observed]`

`No results` — the string used across **every** select and filter list on the
directory (State, Insurance, Expertise, Identity, Service type, Focus area,
Clinical approach, Language). One generic label, no query echo, no fallback
action, repeated a dozen times on one page. Adequate but unconsidered, and a
missed opportunity: a user who filters to zero therapists on `Therapist race or
ethnicity` + `State` receives no guidance on what to relax.

## T9 Notifications & system messages `[documented]`

Email is the named channel for the two moments that matter:
- Cancellation confirmation: "Once you have successfully canceled your service, you will receive a confirmation email from BetterHelp."
- Therapist departure: "we will send an email to notify you that your Provider is no longer on the Platform".
- Cancellation request receipt: "If your email is on file you will receive an email shortly."

**Gap:** no published notification copy for the *match* event itself — the single
most anticipated message in the product. `[absent]`

Marketing consent is disclosed inline at the newsletter field: "By submitting your
email, you agree to receive reminders and marketing communications." — reminders
and marketing bundled into one consent.

## T10 Disclosures, legal & compliance `[observed]` — PRIORITY

### Scope-of-service — what BetterHelp explicitly says it is NOT for

This is the highest-value artefact in the file. BetterHelp states its boundary in
**two registers on two surfaces**, and the difference between them is instructive.

**(a) The consumer-facing version — a four-item negative list in the homepage FAQ,
under the question `Is BetterHelp right for me?`.** After a short positive
paragraph, the answer pivots with a bolded negative and enumerates:

> "BetterHelp is **not** the right solution for you if any of the following is true:
> - You are a minor or you are under the care of a legal guardian
> - You are in an urgent crisis or an emergency situation
> - You were required to undergo therapy either by a court order or by any other authority
> - You do not have a device that can connect to the Internet or you do not have a reliable Internet connection"

Four disqualifiers: **age/guardianship, crisis, court-ordered treatment,
connectivity**. Written in second person, as complete sentences, inside the
marketing FAQ — not in the terms. This is a scope boundary a user will actually
encounter before paying.

**(b) The clinical-capability version, also consumer-facing**, under
`Can BetterHelp substitute for traditional face-to-face therapy?`:

> "However, while the service may have similar benefits, it's not capable of substituting for traditional face-to-face therapy in every case. Please note that your provider may not be able to make any official diagnosis, will not be able to fulfill a court order and will not prescribe medication."

Three capability limits — **diagnosis, court orders, prescribing** — in one
sentence. (The prescribing limit is now partly superseded on another page, which
states BetterHelp "partners with UpLift to connect members with psychiatrists…
for medication management services, when appropriate." Two pages, two positions;
recorded as an inconsistency.)

**(c) The terms version.** Broader, and it names specific conditions:

> "you understand, agree and acknowledge that they may not be the appropriate solution for everyone's needs and that they may not be appropriate for every particular situation and/or a substitute for certain mental health needs that might require in-person therapy services, such as **active withdrawal from certain substances or anorexia nervosa**."

Naming *anorexia nervosa* and *active substance withdrawal* specifically — rather
than "severe conditions" — is the strongest scope sentence in this batch. It
gives a reader with an eating disorder an unambiguous answer.

And the all-caps clause, which covers court orders and documentation:

> "THE PLATFORM IS NOT INTENDED FOR THE PROVISION OF CLINICAL DIAGNOSIS REQUIRING AN IN-PERSON EVALUATION AND YOU SHOULD NOT USE IT IF YOU NEED ANY OFFICIAL DOCUMENTATION OR APPROVALS FOR PURPOSES SUCH AS, BUT NOT LIMITED TO, COURT-ORDERED THERAPY OR EMOTIONAL SERVICE DOG CERTIFICATION."

Followed by:

> "DO NOT DISREGARD, AVOID, OR DELAY IN OBTAINING IN-PERSON CARE FROM YOUR DOCTOR OR OTHER QUALIFIED PROFESSIONAL BECAUSE OF INFORMATION OR ADVICE YOU RECEIVED THROUGH THE PLATFORM."

**Per-country scope limits** are published separately and are unusually explicit.
For Austria: services are provided by psychologists qualified in Germany who
"are not health psychologists, clinical psychologists or psychotherapists under
Austrian law… They are not allowed to diagnose or treat medical conditions,
provide psychotherapy, or provide advice or counseling beyond their scope of
practice." Switzerland, Germany/Netherlands, France and Spain each get their own
paragraph, each naming what the provider may not do and whether insurance
reimbursement is possible. For France: "Therapists working on the Platform are
not medical professionals and do not provide medical or psychiatric advice, and
are not entitled to prescribe any medicinal product."

**The practitioner-relationship disclaimer** is also explicit: "The Providers are
independent practitioners who are neither our employees nor agents nor
representatives… The Company does not directly provide Services and is not a
healthcare entity."

### Crisis signposting — recorded exactly as published

**Persistent site-wide line.** On every page inspected, immediately above the
footer link bands, in small type:

> "If you are in a crisis or any other person may be in danger - don't use this site. [These resources](https://www.betterhelp.com/gethelpnow/) can provide you with immediate help."

Placement: global footer region, first element, above the SSL badge and all nav.
Prominence: small text, no icon, no colour emphasis, no border — it is legible
but visually quiet. Link label is `These resources`, which is a weak anchor
(non-descriptive link text, an accessibility and findability issue).

**The `/gethelpnow/` page itself** opens:

> `# Get Help Now`
> "If you are in a crisis or any other person may be in danger, the following resources can provide you with immediate help."

then a country selector (`Find a country`) and, for `United States`, a labelled
list. Recorded exactly:

> **Emergency:** 911
> **Suicide & Crisis Lifeline:** 988
> **Crisis Text Line:** Text "HOME" TO 741-741
> **Essential Local And Community Services:** 211, https://www.211.org/
> **Lifeline Crisis Chat (Online Live Messaging):** 988, chat.988lifeline.org
> **LGBT Hotline:** 1-888-843-4564
> **National Council On Alcoholism & Drug Dependency Hope Line:** 1-800-622-2255
> **National Crisis Line - Anorexia And Bulimia:** 1-800-233-4357
> **National Domestic Violence Hotline:** 1-800-799-7233
> **National Eating Disorders Association (NEDA):** 866-662-1235
> **Self-Harm Hotline:** 1-800-366-8288
> **TransLifeline:** 877-565-8860
> **TREVOR Crisis Hotline:** 1-866-221-7044
> **Veterans Crisis Line:** www.veteranscrisisline.net

The page carries `Updated on *June 2, 2026*` — **a visible last-reviewed date on
a crisis resource list**, which is the single best practice recorded in this
batch. It also carries a liability disclaimer: BetterHelp "assumes no
responsibility or liability for the professional ability, reputation, or quality
of services provided by the entities or individuals listed above. Inclusion on
this list does not constitute an endorsement… The order does not imply any
ranking or evaluation." — plus an invitation to report inaccurate contact
details to a named email.

**A second, longer crisis list is repeated inline on `/online-therapy/`** under
`In need of urgent assistance?`, with slightly different membership (adds
`SAMHSA National Helpline`, `Childhelp`, `Hazing Prevention Network`,
`Physician Support Line`, `RAINN`, `BlackLine`) and a **different Veterans Crisis
Line number** (`1-800-273-8255 (and press 1)` rather than the URL-only entry on
`/gethelpnow/`). Two crisis lists, two memberships, one product. Recorded as an
observed divergence; both are reproduced above and on the pillar page exactly as
published, and neither is paraphrased here.

**In the terms**, the crisis instruction is in all caps and names the
consequence of ignoring it:

> "IF YOU ARE THINKING ABOUT SUICIDE OR IF YOU ARE CONSIDERING HARMING YOURSELF OR OTHERS OR IF YOU FEEL THAT ANY OTHER PERSON MAY BE IN ANY DANGER OR IF YOU HAVE ANY MEDICAL EMERGENCY, YOU MUST IMMEDIATELY CALL YOUR LOCAL EMERGENCY SERVICES NUMBER AND NOTIFY THE RELEVANT AUTHORITIES… THE PLATFORM IS NOT DESIGNED FOR USE IN ANY OF THE AFOREMENTIONED CASES AND THE THERAPISTS AND/OR PROVIDER CANNOT PROVIDE THE ASSISTANCE REQUIRED IN ANY OF THE AFOREMENTIONED CASES. IF YOU PROCEED TO USE THE PLATFORM NOTWITHSTANDING THIS NOTICE, YOU DO SO ENTIRELY AT YOUR OWN RISK."

### Therapist credential framing

Stated consistently and quantitatively across three pages. The vetting bar:

- "Relevant academic degree in their field (such as a master's degree, PhD, or PsyD)"
- "**Licensed mental health professional** in their state"
- "At least 3 years of experience"
- "At least 1,000 hours of hands-on experience"
- background report, "subject to periodic checks", "must complete a case study graded by a licensed clinician"
- "only **25% of therapist applicants accepted** to the platform"

Licence types are spelled out, not abbreviated-only: "licensed U.S. Psychologist
(PhD / PsyD), Licensed Marriage and Family Therapist (LMFT), Licensed Clinical
Social Worker (LCSW), Licensed Professional Counselor (LPC), Licensed Mental
Health Counselor (LMHC)".

**Publishing an acceptance rate (25%) is a selectivity claim used as a quality
proxy** — borrowed from education marketing. Worth noting as a technique, and
worth noting that it is an input metric, not an outcome metric.

### Matching-logic disclosure

Buried in the terms, and genuinely unusual — BetterHelp publishes an account of
how its matching algorithm weights inputs:

> "member/therapist matches are based several hundred different inputs weighted in a complex way. At risk of oversimplifying the complexity of the referral logic, the relative importance of the main factors are as follows: data BetterHelp considers indicative of sustained therapist/client engagement, the composite "quality" score of the Therapist based on factors such as the Therapists's reliability, punctuality, NPS and how they are rated by other users, how available the Therapist is to engage with users, the experience level of the Therapist and other factors selected as important to users such as whether the Therapist is a certain gender, age or has focuses on a certain area of expertise."

Read carefully, the **stated ordering puts platform-engagement and therapist
quality/availability scores ahead of the user's own stated preferences**, which
are listed last as "other factors". That is a material disclosure about what
"matched to the best therapist *for you*" means, and it sits in section 8 of the
terms rather than next to the marketing claim. Recorded factually.

Licensure is the hard gate before any of it: "we require every Therapist to be
experienced and registered, licensed, and credentialed (as applicable) in each
jurisdiction they opt into serving. As an initial matter, you will be matched
with one of these 'opted-in' therapists based on where you reside."

Availability is bounded honestly: "because of licensure requirements that differ
from jurisdiction to jurisdiction, not all available on our database will be
available for you to match with, or at any particular or convenient time."

### Auto-renewal, cancellation and refunds — where each sits in the flow

**Auto-renewal**, terms §8, stated plainly and early:

> "Any type of subscription you choose will continue and automatically renew until you cancel the membership. By choosing a recurring membership service, you acknowledge that such paid services have a recurring payment and you accept responsibility for all recurring charges prior to cancellation."

Billing options: "weekly, every (4) four weeks, or quarterly."
Charge timing is disclosed with its mismatch acknowledged: "you will be charged
for the subscription immediately but it may take some time before you are matched
and can begin therapy" — mitigated by starting the billing clock at match, with a
worked example.

**Cancellation**, three surfaces, in increasing order of friction:

1. *A `Cancel Subscription` link in the page footer* on `/online-therapy/` — reachable without logging in, opening a form that needs only an email address.
2. *In-product path, published in the FAQ*: "Login to your BetterHelp account… Menu > My Account > Payment Settings > **Quit therapy**." Then, separately, "Menu > My Account > Personal Information, and click on **Request Erasure**."
3. *The governing rule*: "You can cancel the subscription to the service at any time for any reason. Your membership must be canceled before it renews in order to avoid the next billing cycle."

**Note the in-product label: `Quit therapy`.** Not "Cancel subscription", not
"End membership" — the destructive action is labelled with the *clinical* act
rather than the *commercial* one. That is a loaded word to place on a button in a
mental-health product, and it sits inside `Payment Settings`. Recorded as an
observed finding.

**Note also that cancellation and data erasure are two separate steps** in
different menus, and the FAQ instructs the user to do both. A user who cancels
without the second step retains stored data.

**Refunds** are discretionary and stated as such, twice:

> "while refunds are not guaranteed, they may be offered on a case-by-case basis by contacting BetterHelp Customer Service."
> "Are you looking for a refund? BetterHelp offers refunds on a case-by-case basis."

**Statutory withdrawal right** is honoured and operationalised: "If you reside in
a country where you are legally entitled to withdraw from a consumer contract
within 14 days, you must sufficiently complete [this form] and we will honor that
request such that the contract will be reversed and you will be fully refunded."
A `Withdrawal Form` link sits in the EU-facing footer.

**Late-cancellation fee**, disclosed with a rationale rather than bare:

> "Late cancellations (within 24 hours of the session time) and missed sessions may incur a $15 fee per occurrence."

followed by an explanation that the fee protects therapist planning and earnings
— "Late cancellations and missed sessions impact your therapist's availability
and earnings". **Justifying a penalty by reference to a third human being** is a
notably effective framing.

**Price changes**: "we may need to increase prices from time to time to
accommodate inflation, increased operational costs and changes in market
conditions. As always, you will have the opportunity to cancel your subscription
at anytime if these changes are not satisfactory to you."

**Free trials**: "Once a free trial expires, the paid membership will commence
following a notice to you." — a notice is promised, unlike some competitors.

### Data-use disclosure

**Cookie consent banner, verbatim, on every page:**

> "We process personally identifiable and personal health information to conduct our business, as described in our Privacy Policy. Some data processing and sharing is required for our business to function. By clicking "I agree" we may share PII with third party advertising partners to deliver relevant ads or analytics partners to improve our services. To learn more or to opt-out go to "Sharing settings"."

This banner **names health information explicitly**, **names advertising partners
explicitly**, and **makes advertising-sharing conditional on the `I agree`
click**. Most consent banners do none of the three.

**The `Consumer Health Data Privacy Policy`** is a separate, short, plainly
structured document with five headings: *Consumer Health Data We Collect* /
*Sources* / *Purpose and Use* / *Sharing* / *Rights*. It names
`Washington's My Health My Data Act (MHMDA)` and the
`Nevada Health Data Privacy Act (NHDPA)` and enumerates ten categories of
consumer health data — including `Gender-affirming care information`,
`Reproductive or sexual health information`, `Data that identifies you seeking
health care services`, and `Any inferences of the above categories of health data
derived or extrapolated from non-health information`.

That last category — **inferences derived from non-health data** — is the one most
policies omit, and it is the category at the heart of advertising-pixel health
disclosure generally.

The sharing clause is where the opt-in is stated:

> "provided you opt in, we may Process and share some data with Third Parties for advertising purposes."

Rights are routed as three concrete links: `Access` → "Requesting a copy of my
data"; `Erasure` → "Requesting Data Erasure"; consent withdrawal → an
`opt-out instructions page`; plus a named DPO email.

**Assessment.** Read as a set, the health-data surfaces are notably more explicit
and more user-controllable than the industry norm: a footer-level `Health Data`
link, a footer-level `Sharing Settings` control, an opt-in (not opt-out) gate for
advertising sharing, and a policy that names inference data. The regulatory
history is recorded in the posture row; the *current* copy is recorded here as
observed. No causal claim is made beyond the sequence of public facts.

### Confidentiality

Handled thinly on the public surface. The FAQ index lists `Will my therapist
treat what I say as confidential?`, `How is my privacy and security protected?`
and `Can I stay anonymous?` — but these answers are accordion-collapsed and were
not retrievable. The pillar-page equivalent is vague: "The information you share
is protected by data privacy laws; for more information, please see our Privacy
Policy and terms of service." `[documented — answers not retrieved]`

`Can I stay anonymous?` as a published FAQ question is itself the artefact worth
noting: anonymity is treated as a legitimate expectation to address, not a
suspicious request.

### Pricing disclosure

Two prices are quoted throughout, always with the same qualifiers:
`$70-100/week` (billed weekly or monthly) and `$23` average copay for
insurance-eligible members. Every instance carries at least one of:

> "*For eligible members, actual cost may vary by plan, provider availability, and deductible status."
> "**Subscription pricing is based on factors such as your location, referral source, preferences, therapist availability and any applicable discounts or promotions that might apply."
> "The price range indicates the typical cost of sign up in the last 6 months."

**`referral source` as a named price variable is a significant disclosure** — it
states that the price depends on *which advertisement you arrived from*. Few
products admit this in writing.

An `Insurance availability` modal adds: "Discount offers will not apply if you
choose to use insurance." — a mutual-exclusivity rule stated before checkout.

Feature loss under insurance is also disclosed: "*When using insurance, certain
BetterHelp features may be limited or unavailable, including chat-based sessions,
groups/classes, and select self-help tools.*"

## T11 Help-centre architecture `[observed]`

There is no help centre. There is a **single flat FAQ page** of 24 questions
under one heading, `Frequently asked questions`, plus `Contact`. No categories,
no search, no article tree, no `Still need help?` routing block.

For a product of this scale that is a deliberate minimalism — self-service is
handled almost entirely by marketing-page FAQ accordions (9 on the homepage, 20
on the pillar page, 8 on the directory) rather than by a support IA. The
consequence is **duplication and drift**: the same question is answered with
different numbers and, in the prescribing case, with different positions on
different pages.

## T12 FAQs `[observed]`

### `/faq/` index — 24 questions verbatim, answers not in server HTML

| # | Question (verbatim) |
|---|---|
| 1 | What is BetterHelp? |
| 2 | Who will be helping me? |
| 3 | Who are the therapists? |
| 4 | How are the therapists verified? |
| 5 | Is BetterHelp right for me? |
| 6 | How much does it cost? |
| 7 | Can BetterHelp substitute for traditional face-to-face therapy? |
| 8 | I signed up. How long until I'm matched with a therapist? |
| 9 | How will I communicate with my therapist? |
| 10 | How does messaging work? |
| 11 | How do live chat sessions work? |
| 12 | How do live audio sessions work? |
| 13 | How do live video sessions work? |
| 14 | Can I go back and read the therapist's previous messages? |
| 15 | Is BetterHelp web accessible for disabled users? |
| 16 | How long can I use BetterHelp? |
| 17 | How do I pay for therapy? |
| 18 | Does BetterHelp accept insurance? |
| 19 | What is the role of BetterHelp.com? |
| 20 | How can I be sure this is an effective form of therapy? |
| 21 | Will my therapist treat what I say as confidential? |
| 22 | How is my privacy and security protected? |
| 23 | Can I stay anonymous? |
| 24 | How can I get started with BetterHelp? |

**Structural reading.** The ordering is: identity (1) → *who will help me* (2–4)
→ **fit and exclusion (5)** → cost (6) → **capability limits (7)** → timing (8)
→ modality (9–14, six consecutive) → accessibility (15) → duration (16) →
payment (17–18) → *what is the platform's role* (19) → efficacy (20) →
confidentiality/privacy/anonymity (21–23) → start (24).

Three things stand out. **Q5 (`Is BetterHelp right for me?`) is the fifth
question on the page and its answer is a disqualification list** — the product
tells you it may not be for you before it tells you what it costs. **Q19
(`What is the role of BetterHelp.com?`) is a self-interrogation about the
company's own position in the care relationship** — the marketplace-not-provider
distinction surfaced as a user question. And **Q15 makes accessibility a public
FAQ**, which in this corpus is rare.

Note the person shifts across the set: Q2 and Q8 are first-person-user
(`Who will be helping me?`), Q3 and Q4 are third-person about the supply side
(`Who are the therapists?`), Q5 is second-person (`right for me`). The set is
written from the user's chair throughout, which is why it works despite the
inconsistency.

### Homepage accordion — 9 questions, answers observable

Same core set, re-ordered for the funnel: `Who are the therapists?` first (trust
before anything), then `Who will be helping me?`, then `Is BetterHelp right for
me?`, then cost. The answer to Q1 leads with the licence list and the numeric
bar (3 years, 1,000 hours) before any warmth.

### Pillar page accordion — 20 questions, answers observable

Broader and more commercial. Question set includes
`How do cancellations and refunds work for online therapy plans?`,
`Can I do online therapy without a diagnosis?`,
`How often should I have online therapy sessions?`,
`Are video therapy sessions better than chat-based ones?`,
`What's the difference between online counseling and online therapy?`.

Two of these are genuinely educational rather than commercial:
**`Can I do online therapy without a diagnosis?`** answers "Yes" and removes a
gatekeeping assumption, then immediately adds the insurance caveat ("Some
insurance providers may only cover therapy if a diagnosis is given").
**`Are video therapy sessions better than chat-based ones?`** declines to
upsell — it recommends chat for people with severe social anxiety, which is
advice against the higher-engagement modality.

### Directory accordion — 8 questions

Written for search intent (`How do I find a therapist near me?`,
`What type of therapist do I need?`) but the answers do real work:
`What type of therapist do I need?` opens with "A good starting point is to name
your goals for therapy" — a *method*, not a product answer.

## T13 Terminology & glossary `[observed]`

| Term | BetterHelp's usage | The alternative it rejected |
|---|---|---|
| `matched` / `match` | The core verb and the core noun for the whole product | "assigned", "referred", "paired" |
| `therapist` | Dominant public term across all consumer surfaces | "counselor" — which survives in URLs (`/counselor_application/`), in `Individual Counseling` / `Teen Counseling` / `Couples Counseling` filter values, and in the sister-brand name |
| `Provider` | The legal/terms umbrella covering therapists *and* prescribers | "clinician" |
| `member` | The paying user | "patient" — deliberately avoided in consumer copy; `patient` appears only in `provider-patient match` and in the Uplift psychiatry context |
| `Platform` | Capitalised in terms; the thing BetterHelp actually operates | "service" — used in marketing ("the world's largest therapy service") |
| `Subscription Offering` vs `Insurance Offering` | Two formally named, legally distinct products | "plans" |
| `Quit therapy` | The in-product cancellation control | "Cancel subscription" |
| `Request Erasure` | The in-product data-deletion control | "Delete my data" |
| `Confirm Termination` | The unauthenticated cancellation submit | "Cancel my subscription" |
| `Expertise` vs `Focus area` | Two separate filter taxonomies, one broad and one granular | a single "specialties" list |
| `Therapist identity` | The named filter group for gender, faith, race, age, sexuality | left implicit |
| `Consumer health data` | The statutory term, adopted as a page name | "sensitive data" |
| `Sharing settings` | The advertising-consent control | "Cookie preferences", "Privacy settings" |
| `These resources` | The crisis-link anchor text | "Crisis resources", "Get help now" |
| `healing journey` | Used in CTA and success-story copy | "treatment", "care plan" |

**The register gap between `therapist` and `Quit therapy` is the finding.** The
warm noun is used everywhere in acquisition; the cold verb appears exactly once,
at the exit. Similarly `member` (warm, belonging) throughout, `Confirm
Termination` (contractual) at cancellation.

## T14 Voice, tone & accessibility `[observed]` — PRIORITY

**Person.** Second person for the user, uninterrupted. First-person plural for
the company in FAQs and terms ("We require every Therapist…", "we may be able to
help", "we have you answer a few questions"). The company is an agent, and
notably it uses "we" even in the disclaiming sentences ("we cannot legally
mandate…"), rather than retreating into the passive.

**Tone under emotional load — a clear three-band gradient:**

1. **Acquisition (warmest).** `You deserve to be happy.` · `You deserve to feel better` · `get matched with a therapist who gets you` · `Begin your healing journey today` · `Don't wait weeks to feel better`. Entitlement framing, direct address, one full stop doing a lot of work.
2. **Explanation (neutral, hedged).** `Most match with a therapist in 24-48 hours.` · "This process can take a few hours or a few days" · "it's not capable of substituting for traditional face-to-face therapy in every case". Every efficacy claim carries a bound. Nothing is promised absolutely.
3. **Boundary and exit (coldest, and in places legalistic).** All-caps crisis and scope clauses; `Confirm Termination`; the 48-word cancellation-form preamble; "you do so entirely at your own risk."

The gradient is correct in direction — flatter as stakes rise — but the *third*
band over-corrects. A user cancelling therapy because they cannot afford it, or
because they are unwell, meets `Confirm Termination` and a paragraph about
verification failure. The product that opened with `You deserve to be happy.`
closes with contract language. That discontinuity is the most instructive
finding in this file for a content designer.

**Permission-granting is the signature move.** Repeatedly, the copy anticipates a
social inhibition and dissolves it:
- "don't be afraid to switch therapists if your current therapist is not helping you"
- "You can use different ways at different times as you wish, based on your needs, availability, and convenience."
- "This is completely up to you." (on how long to stay in therapy)
- "if you start the process and you feel your therapist isn't a good fit for you, you may elect to be matched to a different therapist"
- `Can I stay anonymous?` treated as a normal question

**Stigma and barrier language is named explicitly**, not euphemised:
"making prohibitive cost, shame, and long waits all things of the past" — *shame*
is used as a plain noun. And the barriers are enumerated with citations to APA
and NCBI sources, which is unusual rigour for marketing copy.

**Modality neutrality is maintained under commercial pressure.** "Video, chat,
and phone therapy can all be just as effective as traditional therapy, though
certain formats or types of therapy may work better depending on your needs and
circumstances." Then a worked case *against* video for socially anxious users.
The copy is willing to route a user away from the format it says most users pick.

**Reviews are attributed with unusual specificity** — and this is a disclosure
choice as much as a tone choice. Each review carries the therapist's full name,
duration of the relationship, the presenting issues worked on, a review ID
number, and a date:
> "Review written after working with Layla Hendricks for 2 weeks on issues concerning depression, stress, anxiety, trauma and abuse, self esteem, and adhd — BetterHelp review #686949 — Date of review • October 7, 2025"

Listing a named individual's mental-health conditions alongside a review is
verifiable and builds trust; it is also a striking amount of clinical detail to
publish about a member, even unattributed. Recorded as an observed pattern with
both readings noted.

**Statistics are consistently sourced and bounded:** `72%` symptom reduction in
12 weeks, `78%` depression improvement, `75%` anxiety improvement,
`4.8 out of 5` average session rating, `4.9 out of 5` from 1.7m reviews,
`91%` of preferences met in 2025, `96%` matched within 24 hours in 2024 — with
"*Source: BetterHelp Platform Quality & Outcomes (2025). Individual experiences
may vary.*" and a linked PDF. **Note the internal inconsistency**: the homepage
says `31,423` and `6,687,048`; `/about/` says "more than 31,000" and "over 5
million"; the pillar page says `6 million` and `30,000+`. Three different figures
for two facts across three pages.

### Accessibility `[observed]`

- `Skip to Main Content` is first in the DOM on the homepage, pillar and directory.
- `Is BetterHelp web accessible for disabled users?` is a **published FAQ question** — accessibility treated as a user concern, not only a compliance artefact.
- A dedicated `Web Accessibility` page, linked in the legal footer band on every page, stating: "We are actively striving to provide equal access and opportunity for individuals with any disabilities and to deliver a web experience that is aligned with the most recent Web Content Accessibility Guidelines (WCAG) at the AA level".
- Modal dialogs publish their keyboard affordances **in visible body copy**: "Please use the escape key to dismiss this modal dialog"; "Please use the tab key to go to TeenCounseling". This helps sighted keyboard users, who are often missed.
- The image carousel exposes a visible control instruction: "Use the Pause/Play rotation button to pause or start the rotating images." — correct practice for WCAG 2.2.2.
- `Hearing impaired` and `Visually impaired` are selectable therapist focus areas, i.e. disability is a supported matching dimension.

**Substantive accessibility concerns, recorded honestly:**

- **The approach is overlay-based.** The page instructs: "BetterHelp utilizes various technologies that are meant to make our website reasonably accessible. By visiting this page our accessibility features have been enabled." with `Alt+9`, `Alt+1`, `Alt+8` shortcuts. Accessibility-overlay widgets are contested practice and are not a substitute for native remediation; the wording "reasonably accessible" is also a hedge.
- **The page asks users to disable ad-blockers**: "Please disable any ad-blocker software to ensure that this interface functions properly." Requiring a user to lower their privacy protections to obtain accessibility features is a real tension, and especially so on a site whose own consent banner concerns advertising partners.
- **Mobile users are routed to the OS, not served.** "For mobile users, we recommend using your device's native accessibility features." with links to Apple and Google. That is a deferral, not a commitment.
- **No conformance claim, no audit, no remediation timetable, no VPAT.** "aligned with" ≠ "conformant with".
- **Non-descriptive link text** in the most important place on the site: the crisis line's anchor is `These resources`.
- Many `img` elements on the homepage and directory render with empty or placeholder sources (`![Therapist](<>)`, `![](<>)`), so alt-text quality for the primary imagery could not be assessed from the retrieved markup. `[absent]`

---

## Transferable patterns

1. **Publish the disqualification list, in second person, before the price.** `Is BetterHelp right for me?` answers with four "not for you if…" bullets — minor/guardianship, crisis, court-ordered, no connectivity — and names anorexia nervosa and active substance withdrawal in the terms. Specific exclusions beat "may not be suitable for all users". Transfers to any eligibility, KYC or product-fit gate.
2. **Put a duration in the name of the ask.** `Fill out a 5-minute assessment.` bounds the commitment before the user commits. The cheapest anxiety reduction available for any long form.
3. **Make cost estimation a named onboarding step.** Step 2 of 5 is `Get your monthly cost estimate.` — price discovery as a stage, not a surprise. Directly transferable to lending, insurance and BNPL flows.
4. **Justify a penalty by naming the human it protects.** The $15 late-cancellation fee is explained by its effect on the therapist's availability and earnings. Fees framed as fairness to a named third party land better than fees framed as policy.
5. **Date the crisis list.** `Updated on June 2, 2026` on `/gethelpnow/` is the strongest single practice in this batch. Any safety-critical reference content should carry a visible last-reviewed date — and should be single-sourced, which BetterHelp's two divergent lists are not.
6. **Opt-in, not opt-out, for advertising use of health data — and say the words.** The consent banner names "personal health information" and "third party advertising partners" in plain text, and `Health Data` plus `Sharing Settings` are footer-level on every page.
7. **Anticipate the inhibition and grant permission.** "don't be afraid to switch therapists" dissolves a known social barrier. Applies wherever users under-use a legitimate right (disputes, refunds, switching providers).
8. **Negative pattern to avoid: the exit register cliff.** A product that opens with `You deserve to be happy.` should not close with `Confirm Termination`, a button called `Quit therapy` inside `Payment Settings`, and a 48-word verification disclaimer. Audit the last screen with the same care as the first.

## Caveats & gaps

- **The intake questionnaire was deliberately not started.** `/get-started/` was not entered, no assessment was begun, and no personal, health or mental-health data was submitted anywhere. Everything in T5 about the questionnaire's content is `[documented]` from BetterHelp's own public descriptions across four pages, and the actual question wording, ordering, answer formats, validation, progress indicators, and any crisis-triage or safety questions inside that flow are **unknown**. The safety-screening design of the intake — arguably the single most important content artefact in this product — is therefore unrecorded.
- **`/faq/` answers are client-rendered** and absent from server HTML; only the 24 questions are captured. Answers for Q10–Q14, Q19, Q21, Q22 and Q23 in particular — messaging mechanics, the platform's own role, confidentiality and anonymity — were not retrievable and are **not** inferred from the homepage or pillar equivalents.
- **Two divergent crisis lists** exist (`/gethelpnow/` and `/online-therapy/`) with different memberships and a different Veterans Crisis Line entry. Both are reproduced exactly as published; no attempt has been made to reconcile them, and neither should be treated as canonical without checking the live page.
- **Three different figures for network size and users helped** across `/`, `/about/` and `/online-therapy/`. All are recorded; none is treated as authoritative.
- **Prescribing position is inconsistent across pages** — the homepage FAQ says the provider "will not prescribe medication"; the pillar FAQ describes an UpLift psychiatry partnership. Both recorded.
- **Terms retrieved but only partially read.** Sections on scope, providers, per-country limits, subscription/auto-renewal, matching logic, the insurance offering and arbitration were read; privacy, IP, liability and much of the arbitration detail were not.
- **All in-product UI is inferred.** `Quit therapy`, `Request Erasure`, the therapy room, message composer, session scheduler, worksheets, groups and classes are `[documented]` at best.
- **Accessibility assessed from markup and the published statement only.** No assistive-technology testing was performed. The overlay concerns in T14 are observations about the published approach, not the results of an audit.
- **Regulatory history is recorded in the posture row from public record, not from the site.** No FTC matter is referenced anywhere on BetterHelp's own pages; the current data-control copy is recorded as observed, and the sequence of facts is stated without asserting causation.
- **Only `en-US` harvested.** Four other language surfaces and eight country pages exist and were not inspected; the per-country scope paragraphs in the terms suggest material differences in what the service may legally do in each.

## Sources

1. https://www.betterhelp.com/
2. https://www.betterhelp.com/online-therapy/
3. https://www.betterhelp.com/faq/
4. https://www.betterhelp.com/gethelpnow/
5. https://www.betterhelp.com/terms/
6. https://www.betterhelp.com/health-data/
7. https://www.betterhelp.com/therapists/
8. https://www.betterhelp.com/accessibility/
9. https://www.betterhelp.com/about/
