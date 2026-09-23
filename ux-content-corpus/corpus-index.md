# content.md — UX Content Intelligence Layer

A pattern library extracted from the public content surfaces of 200 benchmark
products across ten domains.

| | |
|---|---|
| Products | 200 (20 per domain, complete) |
| Per-product files | `products/NNN-slug.md` |
| Corpus size | ~2.21M words, ~159,800 lines |
| Evidence markers | 12,275 — 8,499 `[observed]`, 2,783 `[documented]`, 993 `[absent]` |
| Harvest completeness | 139 full · 168 partial · 26 blocked (counts overlap; many files are full on priority sections and partial elsewhere) |
| Harvest dates | 2026-09-21 / 2026-09-22 |
| Method | Public unauthenticated surfaces only. No sign-in, no account creation, no form submission, no personal data entered anywhere. |
| Schema | `_schema/EXTRACTION-SCHEMA.md` |
| Reference exemplar | `_schema/EXEMPLAR-041-wise.md` |

**Read this first:** [How to use this corpus](#how-to-use-this-corpus) ·
[What is not in it](#what-is-not-in-it) · [Rights and restrictions](#rights-and-restrictions)

---

## How to use this corpus

This is a **reference library, not a style guide**. Nothing in it is an
instruction. Every pattern below is something a specific product does, on a
specific surface, on a specific date, with the file and URL to check.

Three entry points:

1. **By problem.** Go to [The pattern library](#the-pattern-library) — twelve
   recurring content problems, each with the products that solved it well, the
   products that solved it badly, and the transfer condition.
2. **By product.** Go to [The index](#the-index) — all 200 with domain,
   sub-vertical, what each was benchmarked for, and coverage honesty.
3. **By taxonomy category.** Every product file uses the same fourteen
   sections (T1–T14), so `grep '## T7' products/*.md` gives you every
   error-and-recovery finding in the corpus at once. See
   [Taxonomy reference](#taxonomy-reference).

**Before treating any entry as precedent**, open the product file and check the
`Caveats & gaps` section. Roughly a third of the corpus is partial, and the
files say exactly where. A pattern recorded from a help-article *title* is weaker
evidence than one recorded from live UI, and the `[observed]` / `[documented]` /
`[absent]` markers tell you which you have.

---

## What is not in it

Stating the boundary plainly, because the gaps are not evenly distributed and
some of them fall exactly where you might most want evidence.

**Authenticated product UI is absent.** No file contains an observed in-product
error state, empty state, validation message, toast, or transactional
confirmation, because reaching those requires signing in. Where a file describes
one, it is `[documented]` — reconstructed from the product's own help centre.
This is the single largest systematic gap, and it is largest for the products
whose entire value is post-login: the five AI assistants (161–165) have **no
observed in-product strings at all**.

**Client-side rendering blocked a long tail of high-value surfaces.** These
returned valid HTTP responses with empty bodies. The most consequential:

| Surface | Why it matters |
|---|---|
| ~~`klarna.com/us/payments/pay-in-4/`~~ | **RECOVERED** via the browser pane, 2026-09-23. Full Pay in 4 terms, six-question FAQ, late-fee cap and six footnotes now captured in `_schema/BROWSER-SUPPLEMENTS.md`. The not-to-be-used-as-precedent flag is lifted |
| ~~`cash.app/help`~~ | **RECOVERED** via the browser pane, 2026-09-23. Help IA, ten Popular Topics and thirteen Browse categories now `[observed]`. Deeper article bodies still unharvested |
| Zalando FAQ article bodies (all domains) | Zero FAQ Q&A captured; T12 `[absent]` in full |
| `amazon.com/gp/help/**` (all nodeIds) | A-to-z Guarantee has no substantive public description |
| `help.uber.com` (all three audience hubs) | Eater fee names, tracker states, refund windows all absent |
| `healthcare.gov/screener/` | The primary eligibility entry point, linked from 6+ pages |
| `help.coinbase.com`, Robinhood support, `support.onepeloton.com`, `help.twitch.tv`, `support.atlassian.com`, `help.disneyplus.com` | Salesforce/Lightning shells |
| `duolingo.com` entirely | The gamification benchmark; help IA unharvested |
| `reddit.com` + `redditinc.com` | HTTP 403; Reddit Rules text never obtained |

**Mobile app copy is absent.** Several products in the corpus are app-first —
Things (012), Cash App (045), BeReal (151), Elevate (134), Lime (097) — and
their real UI is in an app binary, not on the web.

**Locale is mostly en-US/en-GB.** Genuine non-English capture exists for Nubank
(pt-BR), Careem (ar-AE), Doctolib (fr-FR), Gojek (id-ID), Grab (en-SG/id-ID),
Canada.ca (bilingual requirements). Everything else is anglophone, and the Wise
exemplar itself records locale bleed — a `/gb/` page serving US calculator state
and US footer disclosures.

**One deliberate non-capture.** Ada's symptom-assessment flow (107) and every
intake questionnaire in the health batch were **not started**, because starting
them means entering health data. Ada's eight advice levels are recorded as a
published count with the labels explicitly not guessed.

---

## The pattern library

Twelve recurring content problems. Each names the strongest evidence, the
counter-example, and the condition under which the pattern transfers.

### 1. Telling the user their money is somewhere they can't see it

The hardest problem in the corpus, and the one closest to PayPal's work.

**Wise (041)** names a support category `Where is my money?` — a question, with
a question mark, as top-level IA. And it writes the reconciling article for the
state that is technically true and experientially false:
`Why does it say my transfer's complete when the money hasn't arrived yet?`

**Kuda (050)** goes further and admits the limit of its own knowledge. Its
`What Happens When You Send Money` names NIBSS, explains the two-response
protocol, then states "NIBSS doesn't give us a definite response", commits to an
automatic two-hour retry, and pivots with the heading **"But it's not always
that simple."** Its help title `Pending Or 'Hanging' Transfers` puts the
Nigerian vernacular in quotes, in the title, so the user's own word finds it.

**Chime (048)** solves it by deletion: it removes `Pending` as a state and
publishes the removal as a rule — "If you don't see a deposit, Chime hasn't
received it yet — it's still with your payer." The state vocabulary shrinks and
the locus of the delay is named.

**Transfers when:** the system state and the user's lived state genuinely
diverge. Do not use it to paper over a state you could simply rename.

### 2. The three-register error split

**Stripe (026)** is the reference implementation, and it publishes the split as
literal table columns at `docs.stripe.com/declines/codes`:

`Decline code` | `Charge outcome reason` | `Seller message` | `API error message`

The insight is the *direction*. For `fraudulent`, `lost_card`, `stolen_card` and
`merchant_blacklist`, the recommended customer-facing string is a **deliberately
degraded** one — "present it in the same manner as `generic_decline`" — not a
friendlier paraphrase. Telling the cardholder the truth would tip off the
fraudster. Stripe also splits prescription from diagnosis with a separate
`advice_code` field: `do_not_try_again` / `try_again_later` / `confirm_card_data`.

**Auth0 (038)** does the same for authentication and, unusually, **documents the
reasoning inside the feature that implements it**. The tenant setting
`Use a generic response in public signup API error message` explains that it
"helps protect against user registration enumeration… such as `user_exists`" —
naming the exact code it suppresses, in the docs for the suppressor.

**Okta (040)** ships the same pair — `E0000004 Authentication failed`
(developer) vs `E0000207 The username and/or the password you entered is
incorrect.` (end user) — and **never states the rationale anywhere**. Okta owns
Auth0. Two halves of one company, one documented, one not. And
`E0000095 Recovery not allowed for unknown user.` leaks account existence anyway.

**Transfers when:** the informative message and the safe message differ. That is
every decline, every auth failure, every risk hold.

### 3. Claim, bound, personalise

**Wise (041)** never ships a speed or price claim without an adjacent qualifier
and a route to the user's own number. "Lightning fast — money typically arrives
in seconds", immediately footnoted "This is an average based on past transfer
speeds. Use the calculator to get a personalised estimate."

**Codecademy (125)** does the rigorous version: `24 hours` with the tooltip
"Average based on combined completion rates — individual pacing … may vary" —
derived from behaviour, and says so.

**Coursera (123)** does the failing version: its commitment cue is derived from
content hours, not behaviour, and where it publishes both they **diverge 4× on
one page** — a `2 months at 10 hours a week` badge against an `about 8 months`
FAQ answer.

**Typeform (177)** is the sharpest internal contradiction: its help centre states
`47%` average completion and defines the denominator in the very next sentence,
while its marketing page makes three unbounded relative claims (`3.5x more data`,
"doubling the completion rate vs. traditional forms"). The help centre is more
rigorous about Typeform's headline claim than the hero is.

**Transfers when:** a headline estimate and route-specific reality diverge —
payout timing, BNPL instalment totals, delivery windows, processing times.

### 4. Naming the state after who you're waiting on

**Ramp (052)** builds twelve bill statuses on `Waiting for <blocker>` —
`Waiting for vendor`, `Waiting for match`, `Unscheduled`, `Ready for payment` —
instead of one `Pending`. The status names the party, so the reader knows whether
to act.

**Okta (040)** renames three of eight API states for humans, the best being
`Provisioned` → **`Pending user action`** — it names whose move it is. Okta
publishes API Status → Admin Console Label → Cause side by side.

**Shopify (061)** runs four orthogonal status axes (Order / Payment /
Fulfillment / Return, 24 values), every one defined by *work remaining* rather
than by event. **Brex (053)** runs six orthogonal axes on a single expense.

**Counter-example — Zapier (193) and IFTTT (194)** independently converged on
the same defect: `Filtered` and `Applet skipped` each mean both "deliberately
stopped" and "hasn't run yet". Four of Zapier's eleven statuses push `Filtered`
downstream while merely waiting.

**Transfers when:** a single `Pending` is hiding several distinct blockers with
different user actions.

### 5. First-person confession titles

**Wise (041)**: `I sent money to the wrong person` · `I sent the wrong amount` ·
`I spelt my recipient's name wrong`. The sentence the panicking user would say.
Calm register, no "Oops!", no blame-softening.

**Basecamp (005)** applies it to *intake* rather than titles — the support form's
issue picker is written entirely in the user's first person
(`I can't access my account`, `I think something is broken`) under the line
"There are no stupid questions."

**Nubank (049)** is the most striking instance in the corpus:
**`Me Roubaram`** [They robbed me] as a homepage-level emergency destination —
first person, past tense, works without the phone, and its first action is
`Sair de tudo` [Get out of everything].

**Khan Academy (122)** shows the variant for an audience including children and
proxies: `What can I do if my student forgot their password?` — conditional
rather than confessional, and written from the *helper's* position. Most products
have no vocabulary for recovering on someone else's behalf.

**Southwest (100)** inverts it and names *itself* as agent of its own failure:
`Southwest canceled my flight. What are my options?`

**Transfers when:** the user genuinely made the error. Do **not** use first-person
confession for a system failure — that reads as blame-shifting. Use the Southwest
inversion instead.

### 6. Publishing the negative space

The best eligibility and policy content in the corpus spends as much effort on
what does *not* qualify as on what does.

**HealthCare.gov (199)** names the near-miss cases explicitly — "Divorce or legal
separation without losing coverage doesn't qualify you", "Voluntarily dropping
COBRA **doesn't** count" — and publishes `What can't I appeal?` beside
`What can I appeal?`. Its best sentence: "If you don't send the information we
need, we'll use the information we have (not what you entered on your
application) to re-check your eligibility."

**edX (124)** ships a standing library of articles whose job is to undo its own
product names: `Does earning a MicroMasters® credential guarantee admission…?`
answered with the negative in sentence one.

**Chime (048)**: "FDIC insurance protects you against losing insured funds if a
bank fails, **not against issues like fraud**", footnoted to the FDIC's own page.

**Coinbase (054)**: pass-through FDIC qualified on both real conditions —
"contingent upon Coinbase maintaining accurate records and on determinations of
the relevant federal regulator as receiver."

**Revolut (042)** names the *specific absent protections* rather than saying
"unregulated": "not regulated by the FCA and it is not protected or covered by
the Financial Ombudsman Service, or the Financial Services Compensation Scheme."

**Okta (040)**: `Deactivate and delete` renders 10 consequences × three actions
as a Yes/No matrix — the shape of the Yes column is the warning.

**Transfers when:** the user's mental model will over-generalise a protection,
an entitlement or a guarantee. Which is most of the time.

### 7. State what you are not, first

**Wise (041)** US footer: "Wise is a Money Service Business ("MSB") registered
with FinCen, **not an FDIC-insured bank**." The negation precedes the description.

**Chime (048)** ships two versions simultaneously, and the more prominent one is
worse: the formal footer gives "Chime® is a financial technology company, not a
bank. Banking services provided by The Bancorp Bank, N.A. or Stride Bank, N.A.,
Members FDIC" while the hero footnote reads "Chime is a fintech, not a bank" —
abbreviated, partner banks unnamed.

**Mercury (051)** binds the disclosure to the *word* rather than the page: a
named, versioned footnote inventory (`#footnote-business-not-a-bank-2026`) fires
on every instance of "banking", including inside customer testimonials. Best
single clause in the domain: "Deposit insurance covers the failure of an insured
bank."

**Counter-example — Kuda (050)** misnames the NDIC as "National Deposit Insurance
Commission" (it is the Nigerian Deposit Insurance **Corporation**) on its
security page and in a FAQ, with no coverage limit stated anywhere while the copy
says "all deposits"/"every deposit".

**Transfers when:** the entity is not what the category name implies — e-money,
sponsor-bank, MSB, payment institution.

### 8. Dual-format and dual-register disclosure

**Wise (041)**: `View in the regulator's standardized format` — the
user-optimised fee table is primary, the regulator-mandated format is an explicit
secondary link. Directly applicable where the compliant artefact and the
comprehensible artefact conflict (SECCI, Pay in 3, Pay Monthly).

**Noom (119)**: plain-language `Summary` blocks above each Terms section, in
second person, **leading with the least favourable fact** — "Paid plans renew on
their own unless you cancel before your next billing date… fees are generally not
refundable."

**Klarna (058)** separates authorisation from perimeter as two disclosures: the
UK footer states FCA authorisation **and then names which products fall outside
it** — "Pay in 3 instalments and Pay in 30 days agreements are not regulated by
the FCA."

**Monzo (043)** publishes 12 archived versions of its fee schedule with
future-dated changes inside the current document.

**Firefox (156)**: one URL containing two documents in two registers, joined by
an in-document escape hatch — "Lost in the details? Get back to the Firefox
privacy basics" — with per-purpose opt-out links co-located with each disclosure.

### 9. Regulation, not editorial capability, sets the disclosure floor

The cleanest natural experiment in the corpus. **Afterpay/Clearpay (059)** — one
company, two markets:

> UK hero: `late fees up to £24 per order apply, which may impact your future access to credit`
> US footer: `Late fees may apply.`

Same company, same product, same quarter. The variable is the regulator.

**Klarna (058)** shows the same shape: its well-written late-fee copy
(`up to $7.00`, capped at 25% of order value) lives in one collapsed accordion on
the *financing* page, so a Pay in 4 user never sees a number.

**Afterpay's** best artefact is the two-named-schedule pattern: `Payment Schedule`
(estimate) → `Final Payment Schedule`, which "supersedes and replaces" it once the
merchant confirms. Directly applicable to Pay in 3/4, where tax and shipping move
the instalment after the user has seen it. And `paused` (punitive, after a miss)
vs `on hold` (protective, during hardship) are two words for one account state,
correctly distinguished by cause.

**Also flagged:** Clearpay UK states on one page that a soft credit check "is
visible to other lenders" and, two answers later, that it is "not visible to
other lenders." A contradictory credit-reporting statement in regulated copy.

### 10. Writing the escalation that must not be misread

**NHS (196)** is the reference implementation and the highest-stakes pattern in
the corpus. Three care-card variants, with the urgency prefix as **visually
hidden text inside the heading**:

- `Non-urgent advice: See a GP if:`
- `Urgent advice: Ask for an urgent GP appointment or get help from NHS 111 if you have:`
- `Immediate action required: Call 999 or go to A&E now if:`

Colour carries severity for sighted users, hidden text carries it for everyone
else, and the visible imperative carries it for someone in panic. Three redundant
channels for one signal.

The NHS service manual also supplies the best eligibility-error rule anywhere:
"Do not use error messages to tell users that they are not eligible… take them to
a screen that explains why, tells them what to do next, **includes a way to leave
the transaction**."

**Cleveland Clinic (115)** propagates the escalation decision into the component
layer: on the symptom template the care rail swaps `Make an Appointment` for
`Get Emergency Medicine Care` / `Find an Emergency Department`.

**Mayo Clinic (114)** nests escalation *inside* Symptoms, before Causes —
`Overview → Symptoms → When to see a doctor → Causes`.

**Counter-examples, recorded exactly:** Mayo's strongest 911 instruction is in
its **Terms of Use in all-caps** while clinical articles carry escalation in
plain body text; chest pain is absent from Mayo's Symptoms A–Z while its symptom
URL 301s to Cough. Day One (120) ships a crisis block with the **pre-2022
helpline name and number** in an article stamped "Last updated Sep 17, 2026".
Teladoc (116), Calm (102) and Noom (119) have **no crisis signposting** on any
public consumer surface reached.

**Headspace (101)** is the positive control: its crisis directory tells you not
to use the product — "Please do not attempt to access emergency care through
Headspace Products and Services." — placed *above* a ~190-country helpline list.

### 11. Engagement mechanics and their off-switches

A clean gradient, and the corpus's main wellbeing finding.

| Product | Mechanic | Off-switch |
|---|---|---|
| Headspace (101) | `run streak` | Hide it entirely, plus human reinstatement; 3 of 5 documented reset causes exonerate the user |
| Calm (102) | Streak | **User-editable** — `Add Session` to any past date, auto-recalculates, plus a named `Streak Safety Net` |
| Oura (103) | Activity Score | `Rest Mode` removes it; its own illness detection recommends it |
| Strava (105) | Leaderboards | `Mute` — keeps stats, drops the audience |
| Memrise (131) | — | `My Activities` built explicitly as an anti-streak surface ("streaks… can feel like pressure or guilt-trips") |
| Blinkist (133) | `Weekly Goals` | The period is a **week**, user-set — a missed day breaks nothing |
| BeReal (151) | Streak | No purchasable restore, which is why the tone works: `Your next Streak is just one BeReal away.` |
| Fitbit (104) | Sleep Score | **None** — "You can't turn off your Sleep Score at this time." |

**Duolingo (121)** is the instructive case because it documents its own mechanics
by name in published design writing — "Duo's playfully passive-aggressive tone",
an explicit "we tap into 'loss aversion'" — but **the pressure that escalates
lives in the illustration, not the strings**. The widget's Duo "gets more and
more desperate as it nears midnight" while the copy stays neutral (`200 day
streak`). It therefore escapes copy review, localisation and screen readers
alike. That is a governance finding, not a tone finding.

**Low-score wording is the sharpest A/B in the corpus.** For structurally
identical bottom bands: Oura says **`Pay Attention`** (an instruction, and the
grammar break *is* the tone decision); Fitbit says **`Poor`** (a verdict). Oura's
disclaimer variants get *warmer* as the number gets more alarming.

**MyFitnessPal (110)** is the best-evidenced mitigation: a hard algorithmic
calorie floor the system refuses to compute below, and a three-tier alert table
whose lowest tier **withholds the five-week weight projection entirely** —
removing the reward rather than just adding a warning. Recorded alongside the
unresolved tension that its goals article calls exercising-to-eat-more `earn`
while its own eating-disorder article lists excessive exercise as compensatory.

### 12. Does the publisher obey its own standard?

Four data points, all negative to varying degrees. This is the corpus's most
uncomfortable cross-cutting finding.

| Publisher | Standard | Finding |
|---|---|---|
| **Twilio (027)** | Paste — voice/tone, 21 style standards, ~90-term word list | The ~1,266-row error dictionary violates it pervasively. Banned word `invalid` is the commonest title shape; six codes share "Message couldn't be delivered"; ~230 codes are copy-paste variants of four families; 1,266 identical `Learn more` links |
| **Mailchimp (183)** | Content Style Guide — one of the most influential published | **The guide contradicts itself before the site gets a chance to.** `Web Elements` says sentence case; the `TL;DR` says "Capitalize every word, including articles." Violations downstream are concentrated by surface — marketing breaks it comprehensively, help and legal largely comply — consistent with a 2023-dated guide whose owners no longer control acquisition pages |
| **Atlassian (186)** | Atlassian Design System content guidance | Its own docs break its own style guide — ~23 of 26 headings are gerunds, five `e.g.` uses, `&` in the nav — while the *product* strings mostly comply. Separately, the widely-linked `atlassian.design/content/*` URLs serve HTTP 200 with **no content and no redirect**; the guidance moved to `/foundations/content/*` |
| **GOV.UK (195)** | The GDS style guide | Thirteen self-violations recorded, and the two best are **self-reported**: the site-wide feedback banner says "Please fill in this survey" on every page despite the tone rule, and the accessibility statement lists "some pages and document attachments are not written in plain English" as its **first** accessibility failure. GOV.UK auditing itself against its own mandatory rule and publishing the failure is the best governance artefact in the corpus |

**Service NSW (200)** supplies the structural explanation: **its design system has
no content section at all**. The NSW content rules live on a different domain with
no link from the design system — and the live violations ("click" instead of
"Select", title-case headings) follow directly.

**The transferable lesson is about distribution, not authorship.** In every case
the standard is good and the failures cluster where the standard is furthest from
the authoring surface.

---

## Cross-cutting findings

### Named migrations beat unnamed ones

The corpus caught an unusual number of products mid-rename, and the ones that
named the migration are legible while the others are not.

**Khan Academy (122)** calls it `Khan Academy Reimagined` — a proper noun, so
every help article can reference the change unambiguously. **Jira (186)**
publishes a full `issue` → `work item` rename dossier: rationale, rejected
alternatives (`item/record/activity/entity/entry`), "no, admins can't choose",
Cloud-only, APIs keep `issue`.

Against that, **four of the five AI assistants** independently show the same
half-completed rename — the new name reaches banners and headings but not URLs,
slugs, help collections or comparison-table bullets. **Salesforce (185)** has
three generations of edition names live simultaneously, colliding inside one
bullet: the `Core` tier's first feature reads "Everything in **Professional
Edition** plus…" and trials at a URL ending `/free-trial/ee/`. **Grab (092)**
retired the `Grab`+noun system in the ride-tier layer while the FAQ two screens
below still says `GrabFamily`. **Lyft (090)** reached one audience only — riders
are "riders" to riders and "passengers" to drivers.

### Where the best copy goes to die

Three recurring burial sites, all of which a content designer can check for:

1. **Inside screenshots.** monday.com (010) names its statuses in alt text
   ("…columns: Ready to start, In progress, Waiting, and Done"); ClickUp (009)
   uses filename slugs. Asana (004) codes its six project-status values by colour
   **only inside screenshots carrying empty alt**. Box (015)'s
   exposure-warning strings exist only inside images with filename-derived alt.
2. **Inside collapsed accordions.** Klarna's late-fee numbers; Zalando's entire
   FAQ; Disney+'s parental-control vocabulary; five of eleven ElevenLabs pricing
   FAQ answers including "Am I charged for every generation?"
3. **Inside the wrong document.** Mercury's best deposit-insurance clause is a
   footnote; Bandcamp (160)'s `$5,000` fee drop — the most artist-favourable term
   in its pricing — appears **only** in a help article, not on the transparency
   page; Afterpay's UK-grade disclosure exists but not in the US market.

### The no-results empty state is the most common defect in the corpus

Independently found, unprompted, in: Wise (`Sorry, we couldn't find any articles
with "" in it`), Notion Marketplace (`No results for` with an empty slot),
Firefox, Audible (`Search ""` plus `No articles found` under populated lists),
SoundCloud (a stray `0`), Shazam (`Search ""`), Adobe Express
(`Your search for  did not yield any results`, ×6, with leaked i18n keys beside
it), plus `Sorry! nothing found for` inherited identically by Udemy and Scratch
from a shared vendor template. **Bandcamp is the only product found to condition
it correctly.**

It is always the same bug: interpolating a variable into a sentence without
handling the empty case. It is cheap to find and cheap to fix, and almost nobody
does.

### Accessibility: the spread is enormous and mostly undisclosed

**Best in corpus:** Oura (103) — EU-format statement enumerating ~25 of its own
WCAG failures with a remediation date and the named regulator. Zalando (079) —
WCAG 2.2 AA + EN 301 549, May 2026 external audit, six named open defects.
Deliveroo (074) — `partially conformant`, auditor named, human fallback promised.
NHS (196) — the hidden-text escalation prefix. Apple (069) — 43 accessibility
features grouped by functional **need** (`dexterity`, `comprehension`,
`attention`) rather than diagnosis, deliberately multi-categorised.

**Nothing published at all:** Strava, Shazam, SoundCloud, Bandcamp, Clue,
Cleveland Clinic (`/about/website/accessibility` returns an empty body, verified
across four locations), Pitch, Brilliant, Busuu.

**Worst live defects:** Brex (053) — alt text is CMS asset filenames site-wide
(`HP-Tile-1`…`HP-Tile-5`). Asana (004) — `[object Object]` as alt text on all 13
help-centre topic icons. Sephara (075) and Carrd (179) — `user-scalable=no`
site-wide against published WCAG claims. HubSpot (184) — the literal placeholder
`a11y text suffix` shipped as a live link's accessible name, and numeric asset
IDs on the global nav of every marketing page. Nubank (049) — `kalkalkalka`
placeholder alt text in production. Scratch (140) — the help centre's
`Accessibility` folder contains five articles and **all five are about
translation**.

**And a class of defect worth naming:** three of ten productivity products
(monday.com, Airtable, ClickUp) **cannot expose their own prices as text** —
tier cards render in client-side components producing no text layer, even in a
JS-rendering browser.

### Published helpfulness ratios

A handful of products publish their own article helpfulness scores, which is an
unusual act of transparency and a free diagnostic:

| Product | Article | Ratio |
|---|---|---|
| Zapier (193) | Glossary | 194/229 (85%) |
| Discord (149) | Warning System | 17,213/42,841 (40%) |
| Busuu (130) | Cancellation — its most-read, 3,181 votes | 33% |
| MyFitnessPal (110) | Two core-task articles | 49% and 52% |
| Zapier (193) | Flagship error article | 269/870 (31%) |
| Codecademy (125) | Refunds | 1,155/11,670 (9.9%) |
| Zapier (193) | Held runs | 1/8 |

The pattern: **glossaries score well, error and billing articles score badly.**
The articles people reach in distress are the ones rated least helpful.

### Terminology convergence is evidence

Where unrelated products independently pick the same word, that is a signal the
distinction is real rather than stylistic.

- **Todoist, Things and Craft** independently converge on a `deadline` distinct
  from a schedule date, a `cancelled` state distinct from `done`, and a `Logbook`
  for completed work.
- **Goodreads (153)** ships `Did Not Finish` as a fourth default shelf —
  `Want to Read` / `Currently Reading` / `Read` / `Did Not Finish`, the four
  tenses of the reading relationship. **Letterboxd (152)** has no abandoned state
  across 115 FAQ questions and a 12-column CSV schema, but has `Rewatch` as a
  first-class Boolean, which Goodreads lacks. The two products solved opposite
  hard cases.

And where the same word means different things, that is a trap:

- **`guest`** means three incompatible things in one batch — at Target every
  customer, at Nike a neutral peer to Member, at ASOS a state that costs £3.95
  per return and blocks exchanges.
- **`raid`** is a celebrated growth feature on Twitch and a prohibited attack on
  Discord — same word, opposite valence, same batch.
- **`Notes`** means "private message to author" on Medium and "public microblog
  feed" on Substack.
- **`Checkbox`** (Typeform, singular, = consent tick) vs **`Checkboxes`** (Tally,
  plural, = multi-select group) — a false-friend pair.

### Two 2026-specific genres

**Agent-addressed documentation.** GitHub, GitLab, Vercel, Netlify and Cloudflare
all now serve `.md` per docs page and/or an `llms.txt` index, and three ship
explicitly agent-addressed copy. Sentry (029) publishes a docs section
`Instructions for AI Coding Assistants` containing consent rules written *for the
agent* — "Never install packages… without asking the user first." Craft (013)
publishes an `llms.txt` indexing its entire 169-page help IA across 12 locales,
linked from every page.

**Vercel (023)** ships an **`Agent Prompt`** on every error page: a ready-to-paste
prompt written in the *user's* first person, for them to send to a coding agent.
The recovery affordance is a prompt rather than a button. Microsoft Copilot (165)
does the same — every diagnostic terminates in a copy-pasteable `Ask Copilot`.

**Disclosing the AI's fallibility.** The five assistants word this very
differently, and two of them **do not do it at all** on any public surface.
ChatGPT (161) converts model fallibility into a *permissible-use* rule rather
than a user-expectation statement. Copilot (165) ships a six-article curriculum
whose thesis is that fluency itself is the failure mode. Gemini (164) runs two
incompatible voices on the same day, split by org chart rather than by stakes —
help says "Gemini can hallucinate and present inaccurate information as factual"
while pricing says "Just describe it and Gemini will create it."

---

## Taxonomy reference

Every product file uses these fourteen sections. Grep across the corpus by
section to get all 200 products' findings on one problem.

| Code | Category | `grep '## T7' products/*.md` gives you… |
|---|---|---|
| T1 | Navigation & IA labels | Every help-centre category tree in the corpus |
| T2 | Value proposition & headline patterns | Hero and section-header grammar |
| T3 | CTA inventory | Every button label, with context and position |
| T4 | Onboarding & getting-started | Step naming, progress language, how-it-works |
| T5 | Form & field labels | Input labels, placeholders, hint and validation text |
| T6 | Status & state language | The state vocabularies — the richest category |
| T7 | Error, failure & recovery | Error titles, causes, and the recovery offered |
| T8 | Empty states | No-data, no-results, cleared, caught-up, first-run |
| T9 | Notifications & system messages | Toasts, banners, emails, push, enforcement notices |
| T10 | Disclosures, legal & compliance | Fee, rate, risk, eligibility, consent, regulatory |
| T11 | Help-centre architecture | Category trees and article-title grammar |
| T12 | FAQs | Questions verbatim, answers summarised, with placement |
| T13 | Terminology & glossary | Coined terms and the words they displaced |
| T14 | Voice, tone & accessibility | Register, person, reading level, a11y practice |

**Domain codes:** `PROD` productivity · `DEV` developer/infra/security ·
`FIN` financial services · `COMM` commerce/delivery · `TRAV` travel/mobility ·
`HLTH` health/wellbeing · `EDU` education · `MEDIA` entertainment/media/social ·
`AI` AI and creator · `SVC` service/business/public sector.

**Evidence markers:** `[observed]` the string appears on a public page as live UI
or content · `[documented]` the string is quoted inside a help article describing
the UI · `[absent]` looked for, not found.

---

## Rights and restrictions

**Read this before using the corpus for training, grounding or commercial
benchmarking.**

Two sources in the corpus carry terms that speak directly to this use:

- **Cleveland Clinic (115)** — Terms of Use dated 05/14/2025 prohibit automated
  harvesting, prohibit using the content to "develop, create, train, fine tune,
  or ground (including through a RAG model)" any AI model, prohibit "including or
  summarizing any portion of the Services in the output of any such model", and
  restrict use to non-commercial purposes.
- **Mayo Clinic (114)** — carries a comparable anti-scraper clause.

Both harvests used ordinary fetches of publicly indexed pages and quote only
short headings and signposting phrases. The stated purpose of this corpus
nonetheless sits close to what those clauses address. **Surfaced for a decision
rather than acted on** — if the corpus is going to be used to ground or train
anything, those two files are the ones to review with counsel, or to exclude.

**Quotation discipline applied throughout:** short functional UI strings
(CTAs, labels, status names, error titles, FAQ questions, category names) are
quoted verbatim and attributed to a source URL. FAQ answers, help-article bodies,
marketing paragraphs, legal text and clinical guidance are summarised, never
reproduced at length. No song lyrics, media content, book-summary content, or
individual users' posts, reviews or profiles were collected. No page, article or
policy was reproduced in full.

**Freshness.** Harvested 21–22 September 2026. Prices, model names, fee
schedules, fare rules, plan tiers and regulatory statements move fast — several
files already record internal contradictions and stale pages live on the sites
themselves. Re-verify anything you intend to cite as precedent.

---

## Companion documents

| File | What it is |
|---|---|
| `_schema/EXTRACTION-SCHEMA.md` | The extraction schema, scope rules and quotation rules |
| `_schema/EXEMPLAR-041-wise.md` | The reference exemplar all 200 files were built against |
| `_schema/BROWSER-SUPPLEMENTS.md` | Pages recovered through the rendering browser after `web_fetch` returned shells |

---

## The index

All 200 products. `Completeness` is the file's own honesty marker — open the file
and read `Caveats & gaps` before treating any entry as precedent.

| # | Product | Dom | Sub-vertical | Benchmarked for | Pages | Completeness | Lines | File |
|---|---|---|---|---|---|---|---|---|
| 001 | Notion | `PROD` | All-in-one workspace / wiki-database hybrid, now repositioned as an AI workspace with agents | Progressive disclosure, templates, empty states | 15 | Full for public surfaces | 595 | [001-notion.md](products/001-notion.md) |
| 002 | Linear | `PROD` | Issue tracker for software teams / product-development system, repositioned around human-plus-agent workflows | Concise labels and workflow states | 14 | Full. Unusually complete | 866 | [002-linear.md](products/002-linear.md) |
| 003 | Slack | `PROD` | Team messaging / channel-based collaboration hub, now positioned as an "AI work platform" with agents | Onboarding, notifications, recovery | 13 | Partial | 779 | [003-slack.md](products/003-slack.md) |
| 004 | Asana | `PROD` | Work management / collaborative work management (CWM), repositioned in 2026 as "Agentic Work Management" — an OS for human-agent teams | Task creation and status language | 9 | Full for the categories  | 832 | [004-asana.md](products/004-asana.md) |
| 005 | Basecamp | `PROD` | Project management for small teams and client work / opinionated all-in-one project hub (37signals) | Plain-language project organization | 12 | Full for public surfaces | 783 | [005-basecamp.md](products/005-basecamp.md) |
| 006 | Trello | `PROD` | Kanban project boards / visual work management | Board onboarding and empty states | 12 fetched successfully (2 further attempts blocked/empty) | Partial | 1019 | [006-trello.md](products/006-trello.md) |
| 007 | Airtable | `PROD` | No-code relational database / app-building platform | Structured-data guidance | 17 | Partial | 1459 | [007-airtable.md](products/007-airtable.md) |
| 008 | Coda | `PROD` | Doc-database hybrid / collaborative doc-app builder | Document-building onboarding | 12 | Partial | 1503 | [008-coda.md](products/008-coda.md) |
| 009 | ClickUp | `PROD` | All-in-one work platform / convergence suite (tasks + docs + chat + AI agents) | Feature discovery and setup | 8 | Partial | 1778 | [009-clickup.md](products/009-clickup.md) |
| 010 | monday.com | `PROD` | Work OS / CRM-adjacent multi-product work platform | Workflow templates and statuses | 9 | Partial | 1643 | [010-monday.md](products/010-monday.md) |
| 011 | Todoist | `PROD` | Personal task manager / to-do list app with light team workspace | Natural task language and feedback | 12 | Full for public surfaces | 927 | [011-todoist.md](products/011-todoist.md) |
| 012 | Things (Cultured Code) | `PROD` | GTD-influenced personal task manager, Apple-only, one-time purchase (no subscription, no web app, no collaboration) | Calm labels and low-friction capture | 11 retrieved, 4 attempted and empty | Partial, and expected to | 1041 | [012-things.md](products/012-things.md) |
| 013 | Craft | `PROD` | Block-based document editor and note app with tasks, collections, and web publishing (Notion/Obsidian competitor set) | Editor onboarding and sharing | 12 | Full, and unusually deep | 1407 | [013-craft.md](products/013-craft.md) |
| 014 | Dropbox | `PROD` | Consumer file sync and share, extending into team content management (Dash, Sign, DocSend, Replay, Backup, Transfer, Fax) | File, sync, and sharing states | 10 | Full for the two priorit | 1550 | [014-dropbox.md](products/014-dropbox.md) |
| 015 | Box | `PROD` | Enterprise content management (ECM) / "Intelligent Content Management" — regulated-industry cloud content platform with governance, e-signature, and AI-agent layers | Enterprise permission language | 9 | Full for the two priorit | 1630 | [015-box.md](products/015-box.md) |
| 016 | Loom | `PROD` | Async video messaging / screen recording | Recording setup and privacy cues | 12 | Partial | 834 | [016-loom.md](products/016-loom.md) |
| 017 | Miro | `PROD` | Collaborative whiteboard / infinite-canvas visual workspace | Collaborative onboarding and tooltips | 11 | Partial | 1227 | [017-miro.md](products/017-miro.md) |
| 018 | Figma | `PROD` | Collaborative interface design / multiplayer design platform | Permissions, collaboration, version states | 11 | Partial | 1219 | [018-figma.md](products/018-figma.md) |
| 019 | Canva | `PROD` | Consumer design / template graphics (prosumer visual suite) | Novice-friendly creation guidance | 10 | Partial | 1127 | [019-canva.md](products/019-canva.md) |
| 020 | Pitch | `PROD` | Collaborative presentation / deck workspace | Presentation onboarding and collaboration | 23 | Full for public surfaces | 1320 | [020-pitch.md](products/020-pitch.md) |
| 021 | GitHub | `DEV` | Code hosting and collaboration / AI-assisted developer platform | Action labels, status, recovery, documentation | 12 | Full for T1–T3, T6, T7,  | 789 | [021-github.md](products/021-github.md) |
| 022 | GitLab | `DEV` | Integrated DevSecOps platform (single-application CI/CD, SCM, AppSec, agentic orchestration) | Development-lifecycle terminology | 10 | Full for T1–T3, T5–T7, T | 1084 | [022-gitlab.md](products/022-gitlab.md) |
| 023 | Vercel | `DEV` | Frontend deployment platform / edge compute and agentic infrastructure | Deployment status and errors | 13 | Full for T6, T7, T13 | 927 | [023-vercel.md](products/023-vercel.md) |
| 024 | Netlify | `DEV` | Web hosting / Jamstack platform — Git-driven CI/CD, edge delivery, agent-assisted build | Deployment setup and recovery | 10 | Full for T4, T6, T7, T9, | 1070 | [024-netlify.md](products/024-netlify.md) |
| 025 | Cloudflare | `DEV` | CDN, DNS and edge security / SASE and Zero Trust / edge compute platform | Complex-product navigation and status | 11 | Full for T6 and T7 | 950 | [025-cloudflare.md](products/025-cloudflare.md) |
| 026 | Stripe | `DEV` | Payments infrastructure / PSP (payment service provider), plus billing, issuing, treasury | API documentation, onboarding, errors | 12 usable (13 attempted) | Partial | 662 | [026-stripe.md](products/026-stripe.md) |
| 027 | Twilio | `DEV` | Communications APIs (CPaaS) — messaging, voice, video, verification; plus CDP via Segment and email via SendGrid | Technical setup and recovery | 10 usable (12 attempted) | Partial | 836 | [027-twilio.md](products/027-twilio.md) |
| 028 | Postman | `DEV` | API development platform — API client, spec design, testing, mocking, monitoring, and API governance | API-workflow onboarding | 10 usable (11 attempted) | Partial | 856 | [028-postman.md](products/028-postman.md) |
| 029 | Sentry | `DEV` | Error monitoring and APM — error tracking, tracing, session replay, profiling, logs, uptime and cron monitoring, AI-assisted debugging | Issue triage and diagnostic content | 10 | Partial | 896 | [029-sentry.md](products/029-sentry.md) |
| 030 | Datadog | `DEV` | Observability and monitoring — infrastructure, APM, logs, RUM, synthetics, security (CSPM/SIEM/WAAP), incident response, on-call | Monitoring alerts and incident context | 10 | Partial | 980 | [030-datadog.md](products/030-datadog.md) |
| 031 | Supabase | `DEV` | Backend-as-a-service / managed Postgres platform (open-source Firebase alternative) | Developer onboarding and documentation | 9 | Full | 1550 | [031-supabase.md](products/031-supabase.md) |
| 032 | Render | `DEV` | Cloud application hosting (PaaS) / managed compute + Postgres, Heroku successor | Infrastructure setup and errors | 8 | Full for deploy lifecycl | 1557 | [032-render.md](products/032-render.md) |
| 033 | Railway | `DEV` | Deployment platform / usage-billed PaaS with a visual infrastructure canvas | Concise deployment guidance | 9 | Full for the deploy stat | 1653 | [033-railway.md](products/033-railway.md) |
| 034 | Heroku | `DEV` | Cloud application hosting / PaaS (legacy incumbent), Salesforce-owned | Deployment concepts and status | 12 fetched successfully (6 further URLs blocked — see Caveats) | Full for the error/conce | 981 | [034-heroku.md](products/034-heroku.md) |
| 035 | Docker | `DEV` | Containerization tooling / local developer runtime + image registry | Conceptual onboarding and troubleshooting | 11 | Full | 1417 | [035-docker.md](products/035-docker.md) |
| 036 | DigitalOcean | `DEV` | Cloud infrastructure (IaaS/PaaS) for SMB and individual developers; now repositioned as AI-native cloud / GPU + inference platform | Tutorials and task-based navigation | 11 | Partial | 500 | [036-digitalocean.md](products/036-digitalocean.md) |
| 037 | Retool | `DEV` | Internal-tool builder / low-code application platform for enterprise (now AI app-generation platform) | Builder guidance and component labels | 9 | Partial | 597 | [037-retool.md](products/037-retool.md) |
| 038 | Auth0 | `DEV` | Identity-as-a-service / customer identity and access management (CIAM), B2C + B2B SaaS, now extended to AI-agent identity | Identity setup and technical documentation | 12 | Full for the assigned fo | 734 | [038-auth0.md](products/038-auth0.md) |
| 039 | 1Password | `DEV` | Consumer and business password manager / credential and secrets management, extended to enterprise access governance ("Unified Access") and AI-agent credential brokering | Calm, clear security communication | 12 | Full for the assigned fo | 778 | [039-1password.md](products/039-1password.md) |
| 040 | Okta | `DEV` | Enterprise identity and access management (workforce IAM / IGA / PAM), with a customer-identity arm and, since the Auth0 acquisition, a two-platform portfolio | High-stakes administration guidance | 9 | Full for the assigned fo | 732 | [040-okta.md](products/040-okta.md) |
| 041 | Wise | `FIN` | Cross-border remittance / multi-currency e-money account | Fee, exchange-rate, and timing transparency | 4 | Partial | 521 | [041-wise.md](products/041-wise.md) |
| 042 | Revolut | `FIN` | Neobank / super-app (banking + FX + investing + crypto + eSIM + travel) | Action-first financial labels | 12 | Partial | 491 | [042-revolut.md](products/042-revolut.md) |
| 043 | Monzo | `FIN` | UK digital bank (full banking licence) / app-first current account | Friendly but clear financial language | 14 | Full for tone, fees, leg | 586 | [043-monzo.md](products/043-monzo.md) |
| 044 | N26 | `FIN` | EU digital bank (full German banking licence) / pan-European mobile current account | Onboarding and money movement | 13 | Partial | 654 | [044-n26.md](products/044-n26.md) |
| 045 | Cash App | `FIN` | P2P payments and stock/bitcoin brokerage (non-bank financial services platform, sponsor-bank model) | Minimal transaction language | 10 fetched + 2 search-index passes | Partial | 605 | [045-cashapp.md](products/045-cashapp.md) |
| 046 | Venmo | `FIN` | P2P payments / social payment feed + prepaid-style stored-value account | Payments, social context, privacy | 12 | Partial | 542 | [046-venmo.md](products/046-venmo.md) |
| 047 | PayPal | `FIN` | Digital wallet / online payments + consumer BNPL + dispute-resolution platform | Transaction status, recovery, disclosures | 11 | Partial | 618 | [047-paypal.md](products/047-paypal.md) |
| 048 | Chime | `FIN` | Neobank / fintech with partner banks — fee-free checking, secured credit builder, earned-wage access | Benefit-led banking onboarding | 9 (1 blocked) | Partial | 674 | [048-chime.md](products/048-chime.md) |
| 049 | Nubank | `FIN` | Neobank / digital credit card + payment account, Brazil (Pix-native) | Approachable financial language | 6 (1 blocked) | Partial | 723 | [049-nubank.md](products/049-nubank.md) |
| 050 | Kuda | `FIN` | Digital microfinance bank, Nigeria — retail current account, savings, overdraft, bill payments, US-stock investing | Clear banking onboarding | 8 | Partial | 848 | [050-kuda.md](products/050-kuda.md) |
| 051 | Mercury | `FIN` | Startup business banking (fintech / sponsor-bank neobank for businesses) | Business-banking workflows | 14 | Partial | 572 | [051-mercury.md](products/051-mercury.md) |
| 052 | Ramp | `FIN` | Corporate cards and spend management (corporate card + AP + T&E + procurement platform) | Spend controls and approvals | 16 | Full for the flagged str | 753 | [052-ramp.md](products/052-ramp.md) |
| 053 | Brex | `FIN` | Corporate cards and global expense management (T&E, bill pay, treasury for startups through enterprise) | Expense status and administration | 15 | Partial | 770 | [053-brex.md](products/053-brex.md) |
| 054 | Coinbase | `FIN` | Crypto exchange (retail + institutional), now also a broker-dealer equities, derivatives and prediction-markets venue | Risk education and transaction states | 13 | Partial | 694 | [054-coinbase.md](products/054-coinbase.md) |
| 055 | Robinhood | `FIN` | Retail brokerage (self-directed equities, options, futures, crypto, prediction markets, plus banking, cards and managed portfolios) | Progressive disclosure and investing education | 11 | Strong on the flagged st | 744 | [055-robinhood.md](products/055-robinhood.md) |
| 056 | Acorns | `FIN` | Micro-investing / round-ups — subscription robo-adviser with bundled neobank and kids' money app | Novice investing guidance | 6 | Partial | 455 | [056-acorns.md](products/056-acorns.md) |
| 057 | Betterment | `FIN` | Robo-adviser (automated investing) with cash management, self-directed brokerage, and 401(k) administration | Goals and risk explanations | 4 | Partial | 493 | [057-betterment.md](products/057-betterment.md) |
| 058 | Klarna | `FIN` | BNPL (pay-in-4 and financing) — extending into card issuing, deposit-taking, cashback, shopping search, and mobile | Payment schedules and status | 12 reachable (of 15 attempted) | Partial | 722 | [058-klarna.md](products/058-klarna.md) |
| 059 | Afterpay | `FIN` | BNPL (pay-in-4), with a secondary monthly-instalment product (`Pay Monthly`) and an in-store card | Installment expectations and timing | 12 | Partial | 959 | [059-afterpay.md](products/059-afterpay.md) |
| 060 | Lemonade | `FIN` | Insurtech — renters / homeowners / car / pet / term life, AI-first quoting and claims | Conversational quotes and claims | 5 | Partial | 823 | [060-lemonade.md](products/060-lemonade.md) |
| 061 | Shopify | `COMM` | E-commerce platform (merchant SaaS) — hosted storefront, checkout, POS, payments and fulfilment tooling | Merchant onboarding and administration | 13 reachable (3 further Polaris content URLs attempted, all redirected) | Partial | 482 | [061-shopify.md](products/061-shopify.md) |
| 062 | Etsy | `COMM` | Handmade / vintage / craft-supply marketplace (two-sided, independent-seller) | Marketplace trust and transaction states | 15 reachable (1 policy URL redirected) | Full for T6/T7/T11/T13;  | 619 | [062-etsy.md](products/062-etsy.md) |
| 063 | eBay | `COMM` | Auction and fixed-price marketplace (C2C + B2C, two-sided, with managed payments) | Listing, bidding, and purchase guidance | 10 | Full for T6/T7/T11 | 583 | [063-ebay.md](products/063-ebay.md) |
| 064 | Amazon | `COMM` | General retail marketplace (1P retail + 3P marketplace + owned logistics network) | Delivery tracking and issue recovery | 6 reachable (4 substantive), 4 blocked | Blocked | 574 | [064-amazon.md](products/064-amazon.md) |
| 065 | IKEA | `COMM` | Furniture retail (omnichannel) — large-format store network + e-commerce + assembly/installation services | Inventory, fulfillment, product information | 10 | Full for T6 | 666 | [065-ikea.md](products/065-ikea.md) |
| 066 | Warby Parker | `COMM` | DTC eyewear (vertically integrated optical retail + telehealth) | Guided shopping and home try-on | 26 (23 with server-rendered content, 3 empty/404) | Partial, and the named b | 981 | [066-warbyparker.md](products/066-warbyparker.md) |
| 067 | Allbirds | `COMM` | DTC footwear (sustainability-led) | Product choice and material explanations | 20 | Partial | 601 | [067-allbirds.md](products/067-allbirds.md) |
| 068 | Patagonia | `COMM` | Outdoor apparel (values-led); resale, repair and trade-in | Product care, repair, and brand values | 10 (8 reachable, 2 blocked) | Partial | 776 | [068-patagonia.md](products/068-patagonia.md) |
| 069 | Apple Store | `COMM` | Consumer electronics retail (first-party, configure-to-order + trade-in + lease) | Configuration and trade-in guidance | 15 (13 with server-rendered content, 1 empty, 1 auth-gated and not attempted) | Partial in one specific, | 1114 | [069-applestore.md](products/069-applestore.md) |
| 070 | Chewy | `COMM` | Pet supplies and pharmacy (retail + licensed veterinary pharmacy + telehealth + insurance) | Pet-centered purchase and service content | 21 (13 with full server-rendered content, 8 empty or SPA-shell) | Partial. The modern help | 1083 | [070-chewy.md](products/070-chewy.md) |
| 071 | Instacart | `COMM` | Grocery delivery marketplace (three-sided: customer / shopper / retailer), plus white-label commerce platform | Substitutions and delivery states | 15 reachable (3 further URLs blocked) | Partial | 526 | [071-instacart.md](products/071-instacart.md) |
| 072 | DoorDash | `COMM` | Restaurant delivery marketplace, extended to grocery, convenience and retail (three-sided: customer / Dasher / merchant, plus corporate and advertiser) | Order status and issue resolution | 22 | Full for the help centre | 581 | [072-doordash.md](products/072-doordash.md) |
| 073 | Uber Eats | `COMM` | Restaurant delivery marketplace with white-label logistics (Uber Direct); three-sided (eater / courier / merchant) inside a four-sided parent platform | Delivery status and recovery | 14 reachable, 7 blocked | Partial | 513 | [073-ubereats.md](products/073-ubereats.md) |
| 074 | Deliveroo | `COMM` | Restaurant and grocery delivery marketplace (three-sided: customer / rider / restaurant partner), plus own-operated grocery (Deliveroo HOP) and delivery-only kitchens (Editions) | Order states and support | 22 reachable, 1 blocked | Partial | 605 | [074-deliveroo.md](products/074-deliveroo.md) |
| 075 | Sephora | `COMM` | Beauty retail (omnichannel) — own e-commerce, own stores, shop-in-shop (Sephora at Kohl's), third-party delivery resale (Instacart / DoorDash / Uber Eats / Shipt), and TikTok Shop | Discovery and product-fit guidance | 24 reachable, 3 empty | Partial | 706 | [075-sephora.md](products/075-sephora.md) |
| 076 | Glossier | `COMM` | DTC cosmetics (skincare, colour cosmetics, fragrance; Shopify storefront + owned retail) | Product education and voice | 15 | Full for storefront and  | 488 | [076-glossier.md](products/076-glossier.md) |
| 077 | Nike | `COMM` | Athletic apparel and footwear (DTC + free membership programme + scarcity/launch platform) | Product selection and membership | 18 | Full for the help centre | 496 | [077-nike.md](products/077-nike.md) |
| 078 | Target | `COMM` | Mass-market omnichannel retail (big-box store network + e-commerce + named fulfilment products + paid membership + third-party marketplace) | Pickup and delivery status | 17 reached; 5 URL guesses 404'd; 1 returned an empty body | Full for fulfilment, ret | 542 | [078-target.md](products/078-target.md) |
| 079 | Zalando | `COMM` | European fashion marketplace (own-retail + partner/marketplace hybrid, 28 country storefronts, private-label portfolio, re-commerce) | Returns and sizing guidance | 16 attempted; 11 yielded content; 5 returned chrome only or an empty body | Partial | 487 | [079-zalando.md](products/079-zalando.md) |
| 080 | ASOS | `COMM` | UK/global online fashion retail (own-brand + multi-brand + marketplace "Brand Partners", app-first, subscription delivery, behaviour-tiered loyalty) | Sizing, delivery, and returns | 16 | Full for returns, refund | 579 | [080-asos.md](products/080-asos.md) |
| 081 | Airbnb | `TRAV` | Short-term rental marketplace (two-sided: guest / host / co-host) | Trust, booking, hosting, status | 20 | Near-full | 1106 | [081-airbnb.md](products/081-airbnb.md) |
| 082 | Booking.com | `TRAV` | Accommodation OTA / multi-vertical travel marketplace (stays, flights, cars, taxis, attractions) | Dense decision and availability content | 20 attempted / 10 usable | Partial | 1026 | [082-booking.md](products/082-booking.md) |
| 083 | Expedia | `TRAV` | Full-service OTA (flights, stays, cars, packages, cruises, activities) with a cross-brand loyalty layer | Itinerary management and recovery | 12 | Partial | 1213 | [083-expedia.md](products/083-expedia.md) |
| 084 | Hopper | `TRAV` | Flight price-prediction app / app-first OTA with a fintech attachment layer (fare-lock and flexibility products) | Price predictions and timing | 24 attempted / 6 fully readable + 5 partial | Blocked on the primary s | 1093 | [084-hopper.md](products/084-hopper.md) |
| 085 | Skyscanner | `TRAV` | Flight metasearch / travel search engine (redirect model — takes no booking and no payment) | Comparison and search labels | 15 attempted / 7 fully readable | Partial, but the highest | 1013 | [085-skyscanner.md](products/085-skyscanner.md) |
| 086 | KAYAK | `TRAV` | Travel metasearch (flights, stays, cars, packages, cruises) — a comparison layer that is explicitly **not** the merchant of record | Filters and fare distinctions | 18 URLs retrieved (15 distinct destinations; 3 were 301s onto already-covered pages); 5 blocked | Partial | 993 | [086-kayak.md](products/086-kayak.md) |
| 087 | Trainline | `TRAV` | UK rail ticketing / third-party rail and coach retailer (UK + 45 European markets) | Ticket choice and disruption states | 11 | Full for ticket-type and | 733 | [087-trainline.md](products/087-trainline.md) |
| 088 | Citymapper | `TRAV` | Multimodal transit navigation / urban journey planning (consumer app + `ENTERPRISE` routing data; part of Via since 2023) | Transit directions and service alerts | 14 attempted, 12 retrieved | Partial | 640 | [088-citymapper.md](products/088-citymapper.md) |
| 089 | Uber | `TRAV` | Ride-hailing (global, multi-service) — two-sided marketplace spanning rides, delivery, freight, business travel | Pickup context and trip status | 15 retrieved; 2 blocked | Partial | 981 | [089-uber.md](products/089-uber.md) |
| 090 | Lyft | `TRAV` | Ride-hailing (US and Canada) — two-sided marketplace plus bikes, scooters, healthcare and business travel | Safety and ride status | 34 retrieved; **0 blocked** | Full for the public surf | 1249 | [090-lyft.md](products/090-lyft.md) |
| 091 | Bolt | `TRAV` | Ride-hailing and micromobility super-app (Europe/Africa) | Mobility onboarding and support | 10 | Partial | 441 | [091-bolt.md](products/091-bolt.md) |
| 092 | Grab | `TRAV` | Southeast Asian super-app (ride-hailing + delivery + payments + financial services) | Multi-service navigation | 8 reachable (+2 blocked) | Partial | 565 | [092-grab.md](products/092-grab.md) |
| 093 | Gojek | `TRAV` | Indonesian super-app (motorbike ride-hailing + delivery + digital wallet + lending) | Super-app service labels | 10 | Full for T1/T13 | 561 | [093-gojek.md](products/093-gojek.md) |
| 094 | Careem | `TRAV` | MENA super-app (ride-hailing + delivery + quick commerce + licensed wallet and remittance) | Regional multi-service navigation | 13 | Full. Both locales reach | 693 | [094-careem.md](products/094-careem.md) |
| 095 | BlaBlaCar | `TRAV` | Long-distance carpooling marketplace (peer-to-peer), plus coach and rail resale | Trust and rider coordination | 8 reachable (+2 blocked/empty) | Partial | 657 | [095-blablacar.md](products/095-blablacar.md) |
| 096 | Turo | `TRAV` | Peer-to-peer car sharing (two-sided vehicle rental marketplace) | Marketplace trust and pickup guidance | 7 | Partial | 428 | [096-turo.md](products/096-turo.md) |
| 097 | Lime | `TRAV` | Shared micromobility (dockless e-scooter / e-bike) | Safety onboarding and ride states | 14 | Partial | 479 | [097-lime.md](products/097-lime.md) |
| 098 | Alaska Airlines | `TRAV` | US network airline (mid-size, oneworld member; mid-merger with Hawaiian Airlines) | Itinerary and disruption communication | 13 | Partial | 571 | [098-alaskaair.md](products/098-alaskaair.md) |
| 099 | Delta Air Lines | `TRAV` | US legacy network airline (global hub-and-spoke carrier, SkyTeam) | Trip status and self-service rebooking | 9 | Partial | 675 | [099-delta.md](products/099-delta.md) |
| 100 | Southwest Airlines | `TRAV` | US low-cost carrier (point-to-point; mid-transition to a bundled-fare, assigned-seat, bag-fee model) | Fare clarity and trip management | 8 | Partial, with one signif | 678 | [100-southwest.md](products/100-southwest.md) |
| 101 | Headspace | `HLTH` | Meditation and mental wellness (subscription app + adjacent regulated care: therapy, coaching, EAP) | Calm onboarding, tone, progress | 18 | Partial | 853 | [101-headspace.md](products/101-headspace.md) |
| 102 | Calm | `HLTH` | Sleep and relaxation / consumer meditation (plus a separate invitation-only clinical-adjacent app, Calm Health) | Emotional tone and habit guidance | 19 | Partial | 1135 | [102-calm.md](products/102-calm.md) |
| 103 | Oura | `HLTH` | Wearable sleep/recovery tracking (smart ring + subscription health-insight app) | Health-insight explanations | 16 | Good | 1212 | [103-oura.md](products/103-oura.md) |
| 104 | Fitbit | `HLTH` | Consumer fitness wearable (mid-migration into a platform health service: **Google Health**) | Metrics and goal language | 13 | Partial | 1272 | [104-fitbit.md](products/104-fitbit.md) |
| 105 | Strava | `HLTH` | Fitness social network (GPS activity tracking + public leaderboards + subscription) | Activity feedback and community cues | 15 | Good for the priority ar | 1209 | [105-strava.md](products/105-strava.md) |
| 106 | Nike Run Club | `HLTH` | Running coaching app (audio-guided coaching, run tracking, social challenges) | Coaching and motivation | 5 | Partial | 338 | [106-nikerunclub.md](products/106-nikerunclub.md) |
| 107 | Ada | `HLTH` | AI symptom assessment (regulated medical device) + consumer medical library | Symptom-assessment question design | 11 | Partial | 491 | [107-ada.md](products/107-ada.md) |
| 108 | Flo | `HLTH` | Cycle and fertility tracking (period, ovulation, pregnancy, perimenopause) + medically-reviewed health publishing | Sensitive health language | 8 | Partial | 596 | [108-flo.md](products/108-flo.md) |
| 109 | Clue | `HLTH` | Cycle tracking (privacy-led), with a large medically-reviewed reproductive-health encyclopedia | Inclusive reproductive-health language | 7 | Partial | 634 | [109-clue.md](products/109-clue.md) |
| 110 | MyFitnessPal | `HLTH` | Nutrition and calorie tracking (food logging, macro targets, meal planning) | Habit and data-entry guidance | 7 | Partial | 590 | [110-myfitnesspal.md](products/110-myfitnesspal.md) |
| 111 | Peloton | `HLTH` | Connected fitness (hardware + subscription); instructor-led on-demand class streaming | Coaching, motivation, progress | 31 | Partial | 558 | [111-peloton.md](products/111-peloton.md) |
| 112 | Zocdoc | `HLTH` | US provider search and booking (two-sided healthcare marketplace) | Provider search and booking | 38 | Partial | 628 | [112-zocdoc.md](products/112-zocdoc.md) |
| 113 | Doctolib | `HLTH` | European provider booking and practice software (patient marketplace + practitioner SaaS) | Appointments and privacy | 42 | Partial | 821 | [113-doctolib.md](products/113-doctolib.md) |
| 114 | Mayo Clinic | `HLTH` | Academic medical centre health library (consumer health-information publishing + care access) | Health-information hierarchy | 16 | Full for the priority se | 638 | [114-mayoclinic.md](products/114-mayoclinic.md) |
| 115 | Cleveland Clinic | `HLTH` | Academic medical centre health library and care navigation | Symptom and care navigation | 19 | Full for the priority se | 825 | [115-clevelandclinic.md](products/115-clevelandclinic.md) |
| 116 | Teladoc Health | `HLTH` | Telehealth (multi-specialty virtual care: urgent, primary, mental health, chronic condition management) | Care access and expectations | 10 (8 fully parsed, 2 retrieved but over size limit — see Caveats) | Partial | 620 | [116-teladoc.md](products/116-teladoc.md) |
| 117 | BetterHelp | `HLTH` | Online therapy marketplace (subscription-first, matched-provider model) | Sensitive intake and disclosures | 9 | Partial | 859 | [117-betterhelp.md](products/117-betterhelp.md) |
| 118 | Talkspace | `HLTH` | Online therapy and psychiatry (insurance-first telebehavioural health, incl. medication management and an AI guide) | Therapy matching and privacy | 12 | Partial | 913 | [118-talkspace.md](products/118-talkspace.md) |
| 119 | Noom | `HLTH` | Behavioural weight management (psychology-led coaching app + telehealth GLP-1 prescribing) | Behavior-change prompts | 9 | Partial | 785 | [119-noom.md](products/119-noom.md) |
| 120 | Day One | `HLTH` | Private journaling app (reflective writing, memory-keeping; adjacent to mental wellbeing but **not** a health service) | Reflective prompts and privacy | 9 | Partial | 885 | [120-dayone.md](products/120-dayone.md) |
| 121 | Duolingo | `EDU` | Gamified language learning (freemium mobile-first, plus math, music, chess) | Motivation, feedback, recovery | 16 (13 returned content, 3 returned empty bodies) | Partial | 488 | [121-duolingo.md](products/121-duolingo.md) |
| 122 | Khan Academy | `EDU` | K-12 non-profit learning platform (with AI tutor subscription) | Instructional scaffolding and progress | 4 | Partial | 476 | [122-khanacademy.md](products/122-khanacademy.md) |
| 123 | Coursera | `EDU` | MOOC / professional certificates and online degree marketplace (multi-sided: learners, universities, employers, governments) | Course selection and commitment cues | 13 (9 returned content, 4 blocked) | Partial. Marketing, pric | 583 | [123-coursera.md](products/123-coursera.md) |
| 124 | edX | `EDU` | MOOC / university credentials — university-founded platform (Harvard + MIT), now operated by 2U as `edX LLC` | Credential and pathway explanations | 15 (14 returned content, 1 body-blocked) | Good, with one structura | 660 | [124-edx.md](products/124-edx.md) |
| 125 | Codecademy | `EDU` | Interactive coding education — browser-based learning environment with auto-graded exercises; `Codecademy from Skillsoft` | Interactive instruction and error feedback | 14 (all returned content) | Good. Marketing, pricing | 739 | [125-codecademy.md](products/125-codecademy.md) |
| 126 | Brilliant | `EDU` | Interactive STEM learning / AI-tutored math and coding (consumer subscription + K-12 educator channel) | Concept sequencing and feedback | 15 | Partial | 540 | [126-brilliant.md](products/126-brilliant.md) |
| 127 | MasterClass | `EDU` | Celebrity-taught video courses / streaming-style learning subscription (multi-product family: MasterClass, Certificates, Executive, On Call, At Work) | Discovery and course framing | 12 | Partial | 679 | [127-masterclass.md](products/127-masterclass.md) |
| 128 | Quizlet | `EDU` | Flashcard and study-set platform / UGC study tools with AI generation (student + teacher + school channels) | Study modes and progress | 18 | Partial | 829 | [128-quizlet.md](products/128-quizlet.md) |
| 129 | Babbel | `EDU` | Subscription language learning / CEFR-aligned self-study courses with AI speaking practice (14 languages; consumer + B2B via Babbel for Business) | Lesson guidance and correction | 14 | Partial | 891 | [129-babbel.md](products/129-babbel.md) |
| 130 | Busuu | `EDU` | Language learning with community correction / CEFR-aligned courses plus peer-review social layer (14 languages; consumer + Busuu for Business + Busuu for Educators) | Level setting and feedback | 13 | Partial | 1084 | [130-busuu.md](products/130-busuu.md) |
| 131 | Memrise | `EDU` | Language learning (video-native, native-speaker clip corpus + spaced repetition + AI speaking practice) | Bite-sized practice prompts | 6 | Partial | 600 | [131-memrise.md](products/131-memrise.md) |
| 132 | Headway | `EDU` | Non-fiction book summaries / microlearning subscription app | Summary-based habit loops | 5 | Partial | 704 | [132-headway.md](products/132-headway.md) |
| 133 | Blinkist | `EDU` | Non-fiction book summaries / expert-guide subscription app (multi-format: summaries, podcasts, guides, AI) | Information hierarchy and progress | 11 | Partial | 801 | [133-blinkist.md](products/133-blinkist.md) |
| 134 | Elevate | `EDU` | Cognitive training app ("brain training") — skills-games subscription, sibling to a meditation app and a microlearning app under one parent | Performance feedback and goals | 10 | Partial | 858 | [134-elevate.md](products/134-elevate.md) |
| 135 | LinkedIn Learning | `EDU` | Professional skills video learning (enterprise L&D platform + consumer subscription), embedded in a professional social network | Course discovery and progress | 4 reachable + 3 blocked | Partial | 690 | [135-linkedinlearning.md](products/135-linkedinlearning.md) |
| 136 | FutureLearn | `EDU` | Cohort-based MOOC (UK); short-course marketplace with university partners, plus microcredentials and degree referral | Course expectations and pacing | 10 | Full for the public surf | 480 | [136-futurelearn.md](products/136-futurelearn.md) |
| 137 | Udemy | `EDU` | Open course marketplace (two-sided, open instructor enrolment) with a subscription layer and a B2B arm | Course choice and curriculum structure | 10 | Partial | 567 | [137-udemy.md](products/137-udemy.md) |
| 138 | Skillshare | `EDU` | Creative-skills subscription (all-you-can-watch membership), teacher-supplied catalogue with a project-based pedagogy and a creator marketplace attached (1-on-1 Sessions, digital products) | Project-based learning prompts | 7 | Full for the project-bri | 538 | [138-skillshare.md](products/138-skillshare.md) |
| 139 | Outschool | `EDU` | Live online classes for children (ages 1–18), marketplace model with independent educators; homeschool and public-funding channel | Parent and learner decision content | 10 | Partial | 649 | [139-outschool.md](products/139-outschool.md) |
| 140 | Scratch | `EDU` | Children's visual programming (non-profit); block-based coding tool plus a moderated creative community for ages ~8–16, operated by the Scratch Foundation with the MIT Media Lab | Child-friendly creation guidance | 9 | Partial | 749 | [140-scratch.md](products/140-scratch.md) |
| 141 | Spotify | `MEDIA` | Music streaming (ad-supported freemium + subscription audio: music, podcasts, audiobooks) | Personalization, playback, plan states | 7 | Partial | 481 | [141-spotify.md](products/141-spotify.md) |
| 142 | Netflix | `MEDIA` | Subscription video on demand (SVOD), with ad-supported tier, games, and live events | Profiles, playback, recovery | 14 | Full for T7 / T9 / T10.  | 687 | [142-netflix.md](products/142-netflix.md) |
| 143 | Disney+ | `MEDIA` | Family SVOD / bundled multi-service streaming aggregator (Disney+, Hulu, ESPN, HBO Max, NFL+) | Profiles and parental controls | 7 attempted / 4 usable | Partial | 535 | [143-disneyplus.md](products/143-disneyplus.md) |
| 144 | YouTube | `MEDIA` | User-generated video platform (two-sided: viewer + creator), with subscription tier, live, Shorts, podcasts, games and commerce | Viewer and creator states | 12 | Full for T9 | 863 | [144-youtube.md](products/144-youtube.md) |
| 145 | TikTok | `MEDIA` | Short-form video social platform (algorithmic feed, creation tools, under-13 separate experience) | Creation onboarding and safety cues | 13 attempted / 9 usable | Partial. Community Guide | 707 | [145-tiktok.md](products/145-tiktok.md) |
| 146 | Instagram | `MEDIA` | Photo/video social network (Meta family) | Creation, sharing, privacy settings | 20 URLs (13 returning usable content) | Partial | 415 | [146-instagram.md](products/146-instagram.md) |
| 147 | Reddit | `MEDIA` | Pseudonymous community forum platform with federated volunteer moderation | Community rules and moderation states | 12 URLs (10 returning usable content) | Partial | 629 | [147-reddit.md](products/147-reddit.md) |
| 148 | Pinterest | `MEDIA` | Visual discovery and saving / intent-driven inspiration engine with native commerce | Intent-driven discovery labels | 14 URLs (9 returning usable content) | Partial. `pinterest.com` | 616 | [148-pinterest.md](products/148-pinterest.md) |
| 149 | Discord | `MEDIA` | Community chat platform (voice, video and text) with a coined spatial object model | Server and channel onboarding | 13 | Full for the public surf | 948 | [149-discord.md](products/149-discord.md) |
| 150 | Twitch | `MEDIA` | Live streaming platform with creator monetisation and real-time chat moderation | Live-state and community language | 18 URLs (10 returning usable content) | Partial | 735 | [150-twitch.md](products/150-twitch.md) |
| 151 | BeReal | `MEDIA` | Daily-prompt social app / friends-only photo sharing | Concise behavioral prompts | 17 | Partial | 602 | [151-bereal.md](products/151-bereal.md) |
| 152 | Letterboxd | `MEDIA` | Film logging and review community / personal media cataloguing | Rating, list, and review microcopy | 7 | Partial | 674 | [152-letterboxd.md](products/152-letterboxd.md) |
| 153 | Goodreads | `MEDIA` | Book cataloguing and review community / social reading | Collection and social-reading states | 13 | Partial | 804 | [153-goodreads.md](products/153-goodreads.md) |
| 154 | Medium | `MEDIA` | Publishing and reading platform / member-funded editorial marketplace | Reading and publishing prompts | 12 | Partial | 818 | [154-medium.md](products/154-medium.md) |
| 155 | Substack | `MEDIA` | Newsletter publishing platform / creator-subscription media | Author and subscriber workflows | 14 | Partial | 1033 | [155-substack.md](products/155-substack.md) |
| 156 | Firefox | `MEDIA` | Web browser (non-profit, privacy-led) | Privacy and permission communication | 12 (2 blocked) | Partial | 750 | [156-firefox.md](products/156-firefox.md) |
| 157 | Audible | `MEDIA` | Audiobook subscription / spoken-word entitlement marketplace | Listening progress and membership states | 15 (1 partially blocked) | Partial | 883 | [157-audible.md](products/157-audible.md) |
| 158 | Shazam | `MEDIA` | Music recognition utility (single-interaction, audio-fingerprinting; Apple-owned) | Instant recognition feedback | 11 | Partial | 759 | [158-shazam.md](products/158-shazam.md) |
| 159 | SoundCloud | `MEDIA` | Creator-first audio platform (UGC hosting + streaming + music distribution + royalty payout) | Creator and listener states | 14 (1 blocked) | Partial | 888 | [159-soundcloud.md](products/159-soundcloud.md) |
| 160 | Bandcamp | `MEDIA` | Direct artist-to-fan music marketplace (digital + physical merch, DRM-free downloads) | Artist-support and purchase content | 12 | Partial | 877 | [160-bandcamp.md](products/160-bandcamp.md) |
| 161 | ChatGPT | `AI` | General-purpose LLM assistant / consumer conversational AI (multi-surface: web, desktop, mobile, embedded) | Prompt onboarding, tools, transparency | 11 reachable, 1 blocked | Partial | 551 | [161-chatgpt.md](products/161-chatgpt.md) |
| 162 | Claude | `AI` | General-purpose LLM assistant / agentic work assistant (task hand-off, file production, connectors) | Capability framing and project states | 8 reachable, 1 blocked | Partial | 638 | [162-claude.md](products/162-claude.md) |
| 163 | Perplexity | `AI` | AI answer engine / cited-search assistant (with an agentic "digital worker" tier) | Source-led answer experience | 25 | Partial | 773 | [163-perplexity.md](products/163-perplexity.md) |
| 164 | Google Gemini | `AI` | Multimodal LLM assistant / platform-embedded AI (consumer assistant bundled into an OS, browser, search engine and productivity suite) | Multimodal task prompts and feedback | 17 | Partial | 788 | [164-gemini.md](products/164-gemini.md) |
| 165 | Microsoft Copilot | `AI` | Enterprise-embedded AI assistant / productivity-suite copilot (chat + agents layered onto Word, Excel, PowerPoint, Outlook, Teams) | Task scaffolding across modes | 18 | Partial | 764 | [165-copilot.md](products/165-copilot.md) |
| 166 | Grammarly | `AI` | Writing assistant / inline grammar-and-style coaching (now bundled into the Superhuman platform) | Inline coaching and explanations | 14 | Full for the flagged str | 538 | [166-grammarly.md](products/166-grammarly.md) |
| 167 | Descript | `AI` | Transcript-based audio/video editor (creator tooling, generative speech) | Transcript-based editing guidance | 13 | Full for the flagged str | 567 | [167-descript.md](products/167-descript.md) |
| 168 | Runway | `AI` | Generative video (text/image-to-video foundation models, creative suite + API + robotics) | Generative-workflow prompts | 9 | Partial. Marketing, pric | 528 | [168-runway.md](products/168-runway.md) |
| 169 | Midjourney | `AI` | Generative image (prompt-driven), now also generative video; Discord-native with a web client | Generation and parameter language | 17 | Full for the flagged str | 723 | [169-midjourney.md](products/169-midjourney.md) |
| 170 | ElevenLabs | `AI` | Generative voice and TTS (voice cloning, dubbing, music, ASR, conversational voice agents) | Voice creation and consent | 11 | Full for the flagged str | 814 | [170-elevenlabs.md](products/170-elevenlabs.md) |
| 171 | Adobe Express | `AI` | Consumer design and template graphics / browser-based creative suite with generative AI | Template-led creation | 18 attempted, 16 usable | Partial | 548 | [171-adobeexpress.md](products/171-adobeexpress.md) |
| 172 | CapCut | `AI` | Consumer video editor (ByteDance) / mobile-first short-form editing suite with generative AI | Editing labels and creator onboarding | 33 attempted, 28 usable | Partial | 641 | [172-capcut.md](products/172-capcut.md) |
| 173 | VEED | `AI` | Browser-based video editor / AI-first video generation and editing for marketers and solo creators | Approachable video workflows | 19 | Partial | 525 | [173-veed.md](products/173-veed.md) |
| 174 | Riverside | `AI` | Remote recording studio / browser-based multi-track podcast and video production with local recording | Recording readiness and status | 17 | Partial | 623 | [174-riverside.md](products/174-riverside.md) |
| 175 | Webflow | `AI` | Visual web development platform / no-code site builder with CMS, hosting and a published curriculum | Complex-builder education | 26 | Partial | 694 | [175-webflow.md](products/175-webflow.md) |
| 176 | Framer | `AI` | Design-native website builder with an on-canvas AI design agent | Creation and publishing guidance | 7 | Partial | 491 | [176-framer.md](products/176-framer.md) |
| 177 | Typeform | `AI` | Conversational form builder (one-question-at-a-time), now repositioned as AI forms + GTM automation | Conversational form content | 11 | Partial | 851 | [177-typeform.md](products/177-typeform.md) |
| 178 | Tally | `AI` | Free-first, document-style form builder (Notion-like block editor) | Low-friction form-building labels | 10 | Full for the categories  | 886 | [178-tally.md](products/178-tally.md) |
| 179 | Carrd | `AI` | Single-page site builder (one-page personal sites, landing pages, link-in-bio) | Radically concise setup | 10 | Partial by nature of the | 660 | [179-carrd.md](products/179-carrd.md) |
| 180 | Ghost | `AI` | Open-source publishing platform with built-in memberships and paid subscriptions; sold both as software you host and as managed hosting (Ghost(Pro)) | Publishing and membership workflows | 11 | Good. Ghost's help centr | 926 | [180-ghost.md](products/180-ghost.md) |
| 181 | Intercom | `SVC` | Customer messaging and AI support (helpdesk + AI agent) | Support states and bot-human handoff | 11 | Partial | 803 | [181-intercom.md](products/181-intercom.md) |
| 182 | Zendesk | `SVC` | Customer service ticketing platform (helpdesk, CX suite) | Ticket status and self-service | 9 | Partial | 898 | [182-zendesk.md](products/182-zendesk.md) |
| 183 | Mailchimp | `SVC` | Email marketing and automation (SMB marketing platform; Intuit-owned) | Distinctive voice and sending guidance | 18 | Full for the published s | 552 | [183-mailchimp.md](products/183-mailchimp.md) |
| 184 | HubSpot | `SVC` | CRM and marketing platform (multi-product "customer platform" for SMB through enterprise) | Setup, CRM states, guidance | 14 | Full for record/lifecycl | 662 | [184-hubspot.md](products/184-hubspot.md) |
| 185 | Salesforce | `SVC` | Enterprise CRM platform (multi-cloud PaaS + SaaS; sales, service, marketing, commerce, data, AI agents) | Complex administration terminology | 14 (12 retrieved, 2 blocked) | Partial | 752 | [185-salesforce.md](products/185-salesforce.md) |
| 186 | Jira | `SVC` | Issue tracking and agile planning / configurable enterprise work-management | Issue and workflow states | 13 retrieved, 3 blocked | Partial | 1171 | [186-jira.md](products/186-jira.md) |
| 187 | Confluence | `SVC` | Team wiki and collaboration / knowledge management and document workspace | Templates and collaborative guidance | 10 retrieved, 2 blocked | Partial. The Confluence  | 1016 | [187-confluence.md](products/187-confluence.md) |
| 188 | Help Scout | `SVC` | SMB customer support platform / shared inbox and knowledge base | Calm support workflows | 7 (plus 1 comparator source on Zendesk) | Full for the flagged str | 975 | [188-helpscout.md](products/188-helpscout.md) |
| 189 | Front | `SVC` | Shared inbox and team email / collaborative customer-operations platform | Inbox ownership and collaboration | 12 | Full for the flagged str | 938 | [189-front.md](products/189-front.md) |
| 190 | Calendly | `SVC` | Meeting scheduling / availability and booking automation (SaaS) | Scheduling constraints and confirmation | 8 | Partial | 891 | [190-calendly.md](products/190-calendly.md) |
| 191 | DocuSign | `SVC` | E-signature and agreement management (IAM / CLM) | Agreement status and legal actions | 9 fetched successfully, 8 attempted and blocked or empty | Partial | 586 | [191-docusign.md](products/191-docusign.md) |
| 192 | Dropbox Sign | `SVC` | E-signature (standalone product inside a file-storage portfolio) | Signature guidance and status | 15 fetched successfully, 3 attempted and empty | Full for the priority se | 735 | [192-dropboxsign.md](products/192-dropboxsign.md) |
| 193 | Zapier | `SVC` | No-code automation platform (repositioning as "AI orchestration platform") | Automation mapping and errors | 10 fetched successfully | Full for the priority se | 799 | [193-zapier.md](products/193-zapier.md) |
| 194 | IFTTT | `SVC` | Consumer automation platform (smart home + social + productivity connectivity) | Trigger-action mental model | 12 fetched successfully | Full for the priority se | 722 | [194-ifttt.md](products/194-ifttt.md) |
| 195 | GOV.UK | `SVC` | UK central government service portal (single-domain transactional government) | Transactional plain language | 15 fetched successfully, 1 partial, 1 redirect chain recorded | Full for the priority se | 1223 | [195-govuk.md](products/195-govuk.md) |
| 196 | NHS (nhs.uk) | `SVC` | National health service information and services (England); publicly funded health system | High-stakes health-service content | 12 | Full for the public cont | 765 | [196-nhs.md](products/196-nhs.md) |
| 197 | Canada.ca | `SVC` | Federal government portal (bilingual) — single-domain consolidation of ~100 federal institutions | Structured public-service information | 6 reachable (2 blocked) | Partial. The Content Sty | 749 | [197-canada.md](products/197-canada.md) |
| 198 | Login.gov | `SVC` | Federal identity and authentication service (shared single sign-on + identity proofing for US government agencies) | Identity verification and recovery | 16 | Full for the public mark | 772 | [198-logingov.md](products/198-logingov.md) |
| 199 | HealthCare.gov | `SVC` | Federal health-insurance marketplace (individual and family ACA coverage; also SHOP for small business) | Eligibility and enrollment guidance | 26 | Partial. Content pages h | 940 | [199-healthcaregov.md](products/199-healthcaregov.md) |
| 200 | Service NSW | `SVC` | State government service portal (New South Wales, Australia) — single front door for state transactions | Public-service task navigation | 30 (Service NSW) + 20 (NSW Digital Design System / Digital NSW content guidance) | Full for task navigation | 1011 | [200-servicensw.md](products/200-servicensw.md) |

---

*200 products · 10 domains · harvested 21–22 September 2026 · public unauthenticated surfaces only.*
