# 087. Trainline

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | UK rail ticketing / third-party rail and coach retailer (UK + 45 European markets) |
| Primary URL | https://www.thetrainline.com/ |
| Corpus rank | 087 |
| Benchmark strength (source list) | Ticket choice and disruption states |
| Locale / market observed | en-GB (site served `English (UK)` + `Pound Sterling (GBP/£)` as selected, but rendered fares in `$` — see Caveats) |
| Platform observed | Web (desktop), marketing landing pages, Zendesk help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | National Rail Conditions of Travel; Delay Repay scheme (operator-administered); Consumer Rights Act 2015 explicitly preserved; `Passenger's Charter`; `National Rail Accredited` badge in footer; Trainline.com Limited, Company No. 3846791, VAT 791 7261 06 |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Full for ticket-type and disruption content. Partial elsewhere — help-article *bodies* opened for one article only; in-product booking, basket and ticket-wallet states are behind the search/auth boundary and are `[documented]` at best |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.thetrainline.com/ | Search form, promo banner, empty basket, savings claim + footnote, untranslated CMS keys |
| Advance tickets | https://www.thetrainline.com/trains/great-britain/ticket-types/advance-train-tickets | Richest single restriction-rule page; `Trainline Flex` block; 6-question FAQ |
| Off-Peak tickets | https://www.thetrainline.com/trains/great-britain/ticket-types/off-peak-train-tickets | Off-Peak / Super Off-Peak / Day Return distinctions; `Good to know` FAQ block |
| Help centre home | https://support.thetrainline.com/en/support/home → https://support.thetrainline.com/hc/en-gb | 7 category cards; page title is `Trainline Leisure` |
| Help: Ticket Types & Railcards | https://support.thetrainline.com/hc/en-gb/categories/5113555047839-Ticket-Types-Railcards | 3 sections; live `Travel alert` banner |
| Help: Refunds, Exchanges & Compensation | https://support.thetrainline.com/hc/en-gb/categories/5113564195615-Refunds-Exchanges-Compensation | 2 sections; a *different* `Travel alert` banner |
| Help: Travel & Disruptions | https://support.thetrainline.com/hc/en-gb/categories/5113547571871-Travel-Disruptions | 4 sections including `Accessibility & Assistance` |
| Help section: UK Tickets & Discounts | https://support.thetrainline.com/hc/en-gb/sections/5113547999263-UK-Tickets-Discounts | Full 19-article list — best single source of task phrasing |
| Help article: ticket types | https://support.thetrainline.com/hc/en-gb/articles/5124949418271-What-are-the-different-tickets-available-for-UK-trains | Only article body opened; `Why choose…?` / `Good to know:` two-column rhetoric |
| Industrial action | https://www.thetrainline.com/trains/great-britain/industrial-action | Strike guidance by ticket type; 30 operator statuses; FAQ |
| Delay Repay | https://www.thetrainline.com/trains/great-britain/delay-repay | Compensation product page, eligibility, 7-question FAQ |

---

## T1 Navigation & IA labels

**Global nav — task-first, with two commercial labels promoted to the top bar** `[observed]`

Top bar: `Railcards` · `Business` · `Basket` · `My Bookings` · `Register`
(https://www.thetrainline.com/)

`Railcards` sitting beside `Business` in the persistent top bar is a merchandising
decision, not an IA one — a discount product given the same weight as the entire
B2B audience tier.

Burger menu, five groups:
`Train and coach tickets` · `Get our app` · `Find destinations by budget` ·
`Help` · `Travel Inspiration`, then column headers
`UK trains` · `European trains` · `Train companies` · `Popular journeys`.

`Find destinations by budget` is notable: the nav label names the *constraint*
the user is planning under, not the feature (the destination is `/trip-planner`).

**Breadcrumb grammar is a hierarchy of nouns, ending in the ticket name** `[observed]`

`Home` → `Rail travel in Europe` → `Trains in Britain` → `UK Train Tickets Explained`
→ `Advance train tickets`
(https://www.thetrainline.com/trains/great-britain/ticket-types/advance-train-tickets)

Level 4 is the standout: `UK Train Tickets Explained` is a breadcrumb crumb
written as a promise rather than a category — Trainline has conceded that UK
fare rules need an explainer tier in the IA itself.

**Help centre top level — seven cards, noun-pair compounds** `[observed]`
(https://support.thetrainline.com/hc/en-gb)

| Card |
|---|
| `Contact Customer Support` |
| `Ticket Types & Railcards` |
| `Booking & Payments` |
| `Getting & Managing Tickets` |
| `Refunds, Exchanges & Compensation` |
| `Travel & Disruptions` |
| `Insurance & Extras` |

Every card except the first is an `X & Y` compound. No scope sentences — unlike
the Wise pattern, the user must self-route on two nouns alone. `Contact Customer
Support` is listed **first**, ahead of all self-service, which is the reverse of
the usual ordering and reads as a support-cost decision rather than a user one.

**Second level — sections** `[observed]`

Under `Ticket Types & Railcards`: `UK Tickets & Discounts` · `Railcards & Passes` ·
`Season Tickets`.
Under `Refunds, Exchanges & Compensation`: `Refunds & Exchanges` · `Delays & Compensation`.
Under `Travel & Disruptions`: `Live Travel & Rules` · `Onboard Services & Luggage` ·
`Accessibility & Assistance` · `International Travel`.

`Accessibility & Assistance` as a first-class help section (with exactly one
article in it) is worth recording: the IA slot exists before the content does.

**Footer groupings** `[observed]`: `Help and useful information` ·
`Train and bus companies` · `Train journeys in the UK` · `Trains and buses in Europe` ·
`Top destinations` · `Stations`. Five of six are SEO surfaces; only the first is
a user-support grouping.

**Negative finding — two help systems co-exist in the footer** `[observed]`

Every footer on www.thetrainline.com still links to legacy paths
(`/en/support/solutions/78000000017`, `/en/support/solutions/folders/78000000026`)
while the live help centre is Zendesk at `/hc/en-gb`. `Help & contact us` →
`/en/support/home` 301s to `/hc/en-gb`. The footer IA is a snapshot of a retired
help platform.

## T2 Value proposition & headline patterns

**Hero is the task, stated as an imperative with scope** `[observed]`

> `Buy train tickets for travel in the UK and Europe`
> Section header immediately below: `Search times and tickets`
(https://www.thetrainline.com/)

No slogan, no brand claim in the H1. The differentiator is deferred to a
sub-headed SEO block: `Cheap train tickets - buy in advance and save 61%*` —
number in the headline, asterisk attached in the same line.

**Claim-with-footnote pattern, applied consistently** `[observed]`

The `61%` claim carries a bounded footnote in every place it appears:
"Average savings on all fares booked at least one week before day of travel vs
Anytime fares purchased on day of travel. Subject to availability. Excludes coach."
The Advance page runs a *second*, differently-worded footnote for the same figure
("at least one day before day of travel") plus a third for First Class (`56%`).
Three footnote variants for two claims on adjacent pages — the discipline is
present but the wording is not governed.

**Product-page headlines are the ticket name, full stop** `[observed]`

`Advance train tickets` / subhead `Learn all about booking train tickets in advance`
`Off-Peak train tickets` (no subhead at all)
`Delay Repay` / subhead `Claim compensation for delays to your journey`
`UK rail strikes travel advice and booking info`

Note the register split: the marketing hero uses the product noun; the disruption
page uses a **compound noun-stack** (`travel advice and booking info`) that reads
like an internal page name. Tone flattens as the stakes rise.

**Section headers on ticket pages are user questions** `[observed]`

`What are Advance train tickets?` · `Why book train tickets in advance?` ·
`When do Advance train tickets become available?` · `How to find cheap Advance train tickets`
· `What are Super Off-Peak train tickets?` · `Can I use a Railcard for an extra discount?`

**Delay Repay hero is the only place Trainline writes a two-beat hook** `[observed]`

> `Train delayed? We'll help you get repaid.`

Problem-question then first-person-plural promise, with a coinage (`get repaid`)
built off the product name. This is the single most voiced line in the harvest.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Find cheap tickets` | Search-form submit, every page | The submit button asserts the *outcome*, not the action ("Search") |
| `Register` | Top bar | No `Sign up` anywhere — single consistent label |
| `My Bookings` | Top bar / basket drawer | Plural noun, possessive |
| `Basket` | Top bar | UK retail register; not "Cart" |
| `Skip to content` | Top of DOM, main site | |
| `Skip to main content` | Top of DOM, help centre | **Two labels for one accessibility affordance across two surfaces** |
| `Tell me more` | Homepage disruption promo | First person — the *user's* voice on a button |
| `Find your Railcard` | Homepage railcard card | Possessive; assumes one exists for you |
| `Download the app` | Homepage app card | |
| `Get the app` | Delay Repay page | Near-duplicate of the above, different page |
| `Get a link` | App banner, ticket pages | Third variant of the same action |
| `Start saving!` | Homepage, above railcard card | Only exclamation mark in the CTA set |
| `More info` | `Travel alert` banner, help centre | Bare, generic; the banner text supplies the object |
| `Find out more` | Feature cards on Delay Repay page | Bare |
| `Book a ticket` | Off-Peak page, under `Ready to book?` | **Points to `#` — a dead anchor** (observed defect) |
| `Book a ticket` | Help centre top bar | Same label, real destination (thetrainline.com) |
| `Submit a request` | Foot of help article | Under `Have more questions?` |
| `Return to top` | Foot of help article | |
| `See all 13 articles` / `See more` | Help category vs section pages | Two progressive-disclosure labels in one help centre |
| `Contact Customer Support` | Help centre, **first** category card | Human contact promoted above self-service |
| `Open Booking.com in a new tab with places to stay on your trip` | Accessible label on affiliate link | Names the third party, the behaviour *and* the purpose — best a11y string in the file |

**Observation.** Trainline ships three labels for "acquire the app"
(`Download the app`, `Get the app`, `Get a link`) and two for "read more"
(`More info`, `Find out more`), but exactly one label for registration
(`Register`) and one for search submit (`Find cheap tickets`). Governance is
tight where the money is and loose everywhere else.

## T4 Onboarding & getting-started

`[absent]` as a numbered sequence. Trainline has no "how it works" ladder on the
public surfaces inspected — the search form *is* the onboarding.

The nearest artefact is the Delay Repay three-beat under `How to use Delay Repay`
`[observed]` (https://www.thetrainline.com/trains/great-britain/delay-repay),
which is written as three unnumbered future-tense sentences rather than steps:
automatic tracking during the delay → a reminder after the journey completes →
click through to the operator's site to submit. Note the third beat quietly
discloses that **Trainline does not process the claim** — the handoff is buried
in the mechanism description rather than flagged.

## T5 Form & field labels

**The search form — the primary pre-auth form** `[observed]`
(https://www.thetrainline.com/)

| Label | Notes |
|---|---|
| `From` / `To` | Bare prepositions, no "station" noun |
| `One-way` · `Return` · `Open Return` | Journey-type radio set — `Open Return` is a *fare concept* exposed as a search mode |
| `Out` / `Return` | Date fields. `Return` is reused as both a journey type and a date label in the same form |
| `1 Adult (16+)` | Passenger summary rendered as a value, with the age rule inline in the label |
| `Add railcards` | Verb-first, plural — the discount is an additive step, not a checkbox |
| `Get up to 20% off stays with Genius` | Affiliate opt-in checkbox label |

Two things carry real weight here. First, `Open Return` in the journey-type
selector means the user meets a UK fare restriction *before* seeing any price —
the fare taxonomy leaks into the search form. Second, `1 Adult (16+)` embeds the
eligibility rule (`16+`) inside the field value, so the child/adult boundary is
disclosed at the point of selection rather than at validation.

**The reused `Return` label is a genuine ambiguity**: it is a journey type
(one-way / return / open return) and simultaneously the outbound-date field's
sibling. Nothing distinguishes them but position.

## T6 Status & state language — PRIORITY

Trainline's status vocabulary is a **ticket-validity** vocabulary rather than an
order vocabulary, and the states are legal conditions, not system states.

**Ticket type = the state.** Every fare name encodes what the ticket is *allowed
to do*, and the restriction is the state `[observed]`:

| Fare name | The state it names | Source |
|---|---|---|
| `Advance` / `Advance Single` | Bound to one train, one route, non-refundable | ticket-types article |
| `Off-Peak` | Valid only on eligible services in defined windows | off-peak page |
| `Super Off-Peak` | "an even more restricted version of Off-Peak tickets" | off-peak page |
| `Off-Peak Day Return` | Out-and-back within one day, Off-Peak only | off-peak page |
| `Off-Peak Return` / `Super Off-Peak Return` | Outward on the printed date; return within one calendar month | off-peak page |
| `Anytime Single` | "travel any time on the date shown (until 04:29 the next morning)" | ticket-types article |
| `Anytime Return` | Outward within five days, return within one month | ticket-types article |
| `Open Return` | Return leg undated | help article title |
| `Flexible` | Umbrella category used in disruption guidance | industrial action page |
| `Season` / `Flexi Season` / `Weekly` / `Monthly` / `Annual` | Period validity | footer + help |
| `First Class` / `Standard` | Class of carriage, enforced: "even if the First Class section is empty!" | off-peak page |
| `Cheapest Standard Single` / `Cheapest First Single` | Trainline's own computed result labels | help article title |

**`04:29` is the single most important string in this product.** It is the
boundary of the rail day, it appears in both the Off-Peak and Anytime rules, and
it is a state transition the user cannot see anywhere in the UI. Trainline
handles it by writing the arithmetic out longhand — a worked Wednesday/Thursday
example on the Off-Peak page rather than a rule statement.

**Live-service states** `[documented]` via help article titles
(https://support.thetrainline.com/hc/en-gb/categories/5113547571871-Travel-Disruptions):
`Live train tracking and disruption information` · `Through journeys and combined journeys`
· `Do I have enough time to transfer between trains?` · `Limited availability explained`

`Limited availability explained` is a named inventory state with its own article —
Trainline documents scarcity as a user-facing concept rather than just a badge.

**Trainline-owned journey states** `[documented]`, named as products on the
Delay Repay page: `Train Swap` ("Swap your train in a few taps"),
`Travel Forecast` ("Spot delays as they happen"), `Travel Assistant`.

## T7 Error, failure & recovery — PRIORITY

The strongest category here, and the disruption page is the artefact.

**Guidance is segmented by ticket type, not by incident type** `[observed]`
(https://www.thetrainline.com/trains/great-britain/industrial-action)

Under `General ticket guidance`, four bolded sub-blocks:
`Advance tickets` · `Flexible tickets` · `Return tickets` · `Season tickets`.

This is the reusable move. The user arrives knowing *what they bought*, not what
category of failure applies, so the recovery content is indexed on the thing in
their pocket. Every block leads with the entitlement (`fee-free refund`) before
any condition.

**`fee-free refund` is the load-bearing coinage.** It appears in every ticket
block. Trainline does not write "no admin fee" or "waived" — it fuses the
concession into a single hyphenated adjective placed before the noun, so the good
news lands first. Its negative twin, `an admin fee may apply`, is deployed only
in the reschedule path.

**Self-service is asserted before the entitlement is explained** `[observed]`

> `There's no need to get in touch and you can do this yourself online in just a few clicks.`

Note what this sentence is doing: it pre-empts the support contact, quantifies the
effort ("a few clicks"), and defers the conditions to the bullets below. It is
placed above every ticket block.

**Empathy is one sentence, then it stops** `[observed]`

> `We know how frustrating strike action is, and we're going to do everything we can to help.`

A single acknowledgement line, first person plural, no apology, no exclamation,
never repeated further down the page. The rest of the page is procedural.

**Operator status is a 30-row negative-confirmation list** `[observed]`

The page lists every UK operator individually and states the status even when
there is nothing to report. This is expensive and correct: the user searching for
"is my operator affected" gets an answer rather than an absence.

**Negative finding — the same sentence appears in three casings** `[observed]`

`No industrial action is currently planned.` (Caledonian Sleeper, and most) ·
`No Industrial action is currently planned.` (Avanti West Coast) ·
`No Industrial Action is currently planned.` (Hull Trains) ·
`No industrial action planned.` (CrossCountry — drops "is currently")

Four variants of one status string on one page. A status vocabulary that is
hand-maintained per operator rather than templated.

**Negative finding — the alert banner contradicts the page it links to** `[observed]`

On https://support.thetrainline.com/hc/en-gb/categories/5113555047839-Ticket-Types-Railcards
the `Travel alert` reads: "Industrial action will affect Saturday services on East
Midlands Railway."
On https://support.thetrainline.com/hc/en-gb/categories/5113564195615-Refunds-Exchanges-Compensation
the `Travel alert` on the same day reads: "East Midlands Railway strike action on
Sunday 30th, Monday 31st August, Wednesday 16th and Thursday 17th September."
Both link to the industrial-action page, whose H2 states
`East Midlands Railway strike action suspended for Wednesday 16 & Thursday 17 September`.

Two different banner texts on two sibling pages, both stale against the
destination. Alert copy is being written per-placement and is not invalidated
when the underlying event changes. This is the most instructive failure in the
file: the disruption *article* is excellent and the disruption *banner* is not
governed.

**Recovery article titles — first-person possessive, problem-first** `[documented]`

`My Season ticket isn't working.` (with a full stop in the title) ·
`My UK train was delayed. Can I claim compensation?` ·
`My European train was delayed. Can I claim compensation?` ·
`What happens if I miss my connection due to a delay?` ·
`Two same ticket types have different prices — why?` ·
`Refund for a cancelled train`

`Two same ticket types have different prices — why?` is ungrammatical and is the
better for it — it is the user's confusion transcribed, with the "why" stranded
after an em-dash exactly where a person would put it.

The `My X was delayed. Can I claim Y?` shape is a **two-sentence title**: the
situation, then the question. Split by geography (`UK` / `European`) because the
compensation regimes differ — the title carries the routing.

**Fine and penalty framing** `[observed]`: `Travelling at peak times could lead to
a fine.` and `Avoid breaking your journey with Advance tickets to steer clear of
additional charges!` — the second is tagged `Trainline top tip:`, which places a
penalty warning inside a friendly-advice component. Register mismatch worth flagging.

## T8 Empty states

`[observed]` — one, and it is good:

> `No tickets in your basket.`
> `Why not plan a trip?`

(Basket drawer, present on every page of https://www.thetrainline.com/)

Two-beat: flat statement of the state, then a question as the recovery prompt.
"Why not" is softer than an imperative and does not pretend the empty basket is a
problem. No illustration copy, no "Oops".

Other empty states (no search results, no bookings, no railcards) are behind the
search/auth boundary. `[absent]`

## T9 Notifications & system messages

**Persistent promo banner, page-top** `[observed]`

> `Beat the Japan Rail Pass price rise on October 1st. Book now to lock in the current rate and save!`

Urgency built from a third party's price change. Imperative + imperative +
exclamation — the most aggressive string on the site, and it sits above the H1.

**`Travel alert` — the disruption banner component** `[observed]`, help centre
only. Label + body + `More info`. See T7 for the consistency defect.

**Delay Repay notification model is described to the user** `[documented]`
(https://www.thetrainline.com/trains/great-britain/delay-repay): the page states
that after a qualifying journey completes, Trainline will remind the user "with a
push notification or email." Like Wise, Trainline explains *how it will contact
you* as public content rather than leaving it to be discovered.

**Trainline Flex block reads as an in-page upsell banner** `[observed]`

> `Sound like a no-brainer? That's because it is:`

followed by four bullets (`Book early without the "what ifs"` ·
`Full refund when cancelled in time` · `Still cheaper than most flexible fares` ·
`Perfect for trips planned in advance`). Self-answering rhetorical question, on a
page otherwise written in neutral explanatory register.

## T10 Disclosures, legal & compliance

**Restriction rules are written as consequences, not as conditions** `[observed]`

The Advance page and the ticket-types article consistently pair a rule with what
happens if you break it:

- `Advance train tickets are fixed, non-refundable tickets valid only on the train booked.`
- `Advance tickets can be used for direct routes only.` — then the exception: if the
  route says "and connections", you may break only to connect.
- On catching an earlier train: "you may have to pay additional fees, so please check
  with ticket staff at the station." (Note the hedge `may` plus a human fallback.)
- `Travelling at peak times could lead to a fine.`
- Class enforcement: "even if the First Class section is empty!"

**Refund and exchange asymmetry is stated plainly** `[observed]`

Advance Singles cannot be refunded but *can* be exchanged for a fee, same route
only. Off-Peak / Super Off-Peak / Anytime are refundable with fees. The article
routes all fee detail to one named artefact: `Tiered refund and exchange fees`.
Centralising the fee schedule in one linked article, rather than restating amounts
per ticket type, is the right call — no number is duplicated and therefore none
can drift.

**A live regulatory change is carried as a page-top warning inside the article body** `[observed]`

> `⚠️ From 1 April, refund rules are changing for certain National Rail tickets.`

with a dedicated article `Refund Rule Changes for Certain National Rail Tickets
from 1 April 2026` ranked **first** in `UK Tickets & Discounts`. Trainline uses
help-centre ordering as a policy-currency surface, and an emoji as the severity
marker in body copy.

**Delay Repay disclosures** `[observed]`
(https://www.thetrainline.com/trains/great-britain/delay-repay)

- Eligibility bounded up front: available on `Flexible` and `Advance` single-leg
  trips; **not** available in-app for open returns and Season Tickets.
- Threshold stated as a range because it is operator-dependent — "delays of 15 or
  30 minutes" — rather than picking one number and being wrong for half the network.
- The mutual-exclusion rule is given its own FAQ: abandoning the journey means
  claim a refund, not Delay Repay, **within 28 days of the ticket's expiry**.
- Statutory floor preserved explicitly: the scheme "does not in any way limit or
  exclude your legal rights under the Consumer Rights Act 2015", with a link to
  National Rail's own PDF.
- Obligation on the operator stated: under the National Rail Conditions of Travel,
  operators must offer at least one form of monetary compensation.
- Asterisked bound on the whole product: "Claims must be submitted to relevant
  operator and are subject to approval. Compensation is estimated & varies by route
  and delay."
- `What is the Passenger's Charter?` is given an FAQ slot — a regulatory artefact
  offered as a glossary entry.

**Evidence-backed persuasion, with the survey disclosed** `[observed]`: the
"why claim" section cites `47%` never claimed, `27%` unaware, an internal
`over 1 million delayed journeys` figure, and then names the methodology
("commissioned One Poll to survey 2,000 adults… 05/10/2021- 11/10/2021"). Dating a
2021 survey on a 2026 page is honest but stale.

**Season-ticket strike compensation is the hardest paragraph on the site** `[observed]`:
weekly holders who bought *after* the strike was announced get compensation only
if they actually travel and hit the Delay Repay threshold; monthly-or-longer
holders can claim 100% for cancelled days. Two different rules keyed on purchase
timing and ticket duration, both routed to the operator rather than Trainline.

## T11 Help-centre architecture

Three levels: 7 category cards → named sections → article lists.
Category names are `X & Y` noun compounds; section names are the same shape one
level down (`Refunds & Exchanges`, `Delays & Compensation`, `Live Travel & Rules`).
The grammar does not change between levels, which makes the two tiers hard to tell
apart from the breadcrumb alone.

**Article-title grammar — five shapes** `[observed]`

| Shape | Example |
|---|---|
| `What is/are …?` | `What is an Open Return ticket?` |
| `How do I …?` | `How do I apply a GroupSave discount?` |
| `Can I …?` | `Can I reserve a seat?` · `Can I upgrade to First Class?` · `Can I take my pet on the train?` |
| `My X …` (problem statement) | `My Season ticket isn't working.` |
| Bare noun / gerund | `SplitSave` · `Digital Railcards` · `Multiple tickets` · `Limited availability explained` |

The `Can I …?` cluster is unusually large. It reflects a product whose central
user question is not "how" but "am I allowed" — permission, not procedure. That is
the correct title grammar for a restriction-heavy domain and is directly
transferable to any product with eligibility rules.

**Article furniture** `[observed]`: `Articles in this section` sidebar →
`Was this article helpful?` `Yes` / `No` → `7 out of 10 found this helpful` →
`Have more questions?` `Submit a request` → `Return to top` → `Related articles`.

Publishing the raw helpfulness score (`7 out of 10`) rather than a percentage or
nothing at all is a small transparency decision most help centres avoid.

**Negative finding**: the help centre's own `<title>` is `Trainline Leisure` —
an internal business-unit name (Leisure vs Business) surfaced as the public
document title on every help page.

## T12 FAQs

Three different headings for the same component across three pages `[observed]`:
`Frequently Asked Questions` (Advance, Delay Repay) · `Good to know` (Off-Peak) ·
`FAQs` (Industrial action). The Off-Peak variant is the most interesting — it
reframes a compliance block as advice.

**Advance tickets** (https://…/advance-train-tickets), under `Frequently Asked Questions`:

| # | Question (verbatim) |
|---|---|
| 1 | What are Advance train tickets? |
| 2 | Is it cheaper to buy a train ticket in advance? |
| 3 | Where can I use an Advance ticket? |
| 4 | Can I get an earlier train with an Advance ticket? |
| 5 | Can I get an Advance train ticket refund? |
| 6 | Can I change an Advance ticket to another date or time? |

Ordering: definition → the price claim → route restriction → time restriction →
refund → exchange. **Four of six are restrictions.** Q1 duplicates a section
header higher on the same page, answered differently each time (long form above,
one-sentence below) — deliberate: the FAQ answer is the quotable form.

**Off-Peak tickets** (https://…/off-peak-train-tickets), under `Good to know`:

| # | Question (verbatim) |
|---|---|
| 1 | What are Off-Peak train tickets? |
| 2 | What is an Off-Peak Return ticket? |
| 3 | Can I buy Off-Peak train tickets on Trainline? |
| 4 | What is a Super Off-Peak Return ticket? |
| 5 | What are the conditions for Off-Peak or Super Off-Peak tickets? |
| 6 | Can I get refunds for Off-Peak and Super Off-Peak tickets? |
| 7 | Are Off-Peak tickets cheaper than Anytime tickets? |

Q2 and Q4 are a **definition pair**: Q4's answer is written as a delta on Q2
("the same as the Off-Peak Return ticket above… The only difference is"). Defining
the harder variant by diff rather than restating it is the cleanest handling of
UK fare taxonomy anywhere in this harvest.

**Delay Repay** (https://…/delay-repay), under `Frequently Asked Questions`:

| # | Question (verbatim) |
|---|---|
| 1 | When can I claim for a delayed train? |
| 2 | Will I get compensation if my train is cancelled? |
| 3 | If I abandon my journey due to disruption, should I claim Delay Repay compensation? |
| 4 | What if I miss a connection because my train's delayed? |
| 5 | Can I claim Delay Repay if I used an Oyster Card? |
| 6 | How does Delay Repay affect my rights under the Consumer Rights Act? |
| 7 | What is the Passenger's Charter? |

Q3 is the model question in this file: it names the user's *intended action*
("abandon my journey") and the answer is a flat `No` followed by the correct
alternative and its deadline. A FAQ that redirects the user away from the product
it sits on.

**Industrial action** (https://…/industrial-action), under `FAQs`: only two —
`When are the next train strikes?` and `How can I check if my train is running?`.
Both answers defer to "this page" and to the disruption page, which is honest
about a page whose content is event-driven.

## T13 Terminology & glossary

| Term | Trainline's usage | The alternative it rejected |
|---|---|---|
| `Delay Repay` | The industry scheme name, adopted as a product name and verbed in the hero (`get repaid`) | "compensation", "refund" |
| `Trainline Flex` | Named bundle: an Advance ticket plus cancellation cover | "flexible fare", "refund protection" |
| `SplitSave` | Trainline's brand for split ticketing (help centre) | `Split tickets` — used in the *nav*, so the register differs by surface |
| `Ticket Alert` / `Advance Ticket Alert` | Availability alerting product | "price watch" |
| `Best Fare Finder` | Date-flexible cheapest-fare tool | "flexible dates" |
| `Price Prediction` | Footer feature | "fare forecast" |
| `Train Swap` | Change your booked service | "amend", "rebook" |
| `Travel Forecast` | Live delay-risk view | "live status" |
| `Travel Assistant` | Guided help for refunds and changes | "chatbot", "virtual agent" |
| `Journey Planner` | Search/result surface | "search results" |
| `fee-free refund` | Compound adjective used throughout disruption copy | "no admin fee", "fee waived" |
| `Open Return` | Undated return leg — a *search mode*, not just a fare | "flexible return" |
| `Railcard` | Industry noun retained, capitalised, never glossed | "discount card" |
| `GroupSave` | Industry discount name retained | "group discount" |
| `Peak` / `Off-Peak` / `Super Off-Peak` | Capitalised as proper nouns, because they are fare-rule terms not adjectives | lowercase descriptive use |
| `Basket` | UK retail | "Cart" |
| `Register` | UK register | "Sign up" |
| `eticket` / `Mobile Tickets` / `digital tickets` | **Three labels for the delivery formats**, used inconsistently across footer, help and marketing | one governed term |
| `Passenger Assistance` | The industry service name, on the strike page | "accessibility support" |
| `Action Short of Strike` | Union term retained verbatim, unglossed | "reduced service" |

**Register split.** Marketing says `Split tickets`; the help centre says
`SplitSave`. Marketing says `digital tickets`; the footer says `Mobile Tickets`;
the strike page says `eticket bookings`. The fare vocabulary is governed tightly
(it is regulated); the Trainline-owned product vocabulary is not.

**`Action Short of Strike` is the notable un-glossed term.** It appears in the
`Before you travel` block with no explanation, followed by its consequence
("trains may be subject to short notice alterations and cancellations"). Trainline
defines it by effect rather than by definition — defensible, but the term itself
is opaque to anyone outside UK industrial relations.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first person plural for the
company and, unusually, for the *network*: `We help customers across Europe make
more than 172,000 smarter journeys every day.` On the strike page Trainline speaks
as an intermediary — "We'll keep this section updated", "we're going to do
everything we can to help" — while routing the actual remedy to the operator.

**Register gradient, clearly visible.** Marketing pages run warm and chatty:
"congratulations, you've come to the right place!", "Even more music for your
ears", "Sound like a no-brainer? That's because it is:", "Enjoy retirement by
visiting UK landmarks", `Start saving!`. The strike page and the ticket-types help
article run flat, bulleted and exclamation-free. The one leak across the boundary
is `Trainline top tip:` attached to a penalty warning on the Advance page.

**Formatting as a comprehension device** `[observed]`. The ticket-types help
article uses a fixed two-part structure per fare: `Why choose an X ticket?`
(benefits) then `Good to know:` (restrictions), with heavy inline bolding of the
operative word (`cheapest`, `Singles only`, `non-refundable`, `12 weeks before
travel`). The bolding is doing the work a table would normally do, and it means a
skim reader gets the restriction even if they skip the sentence. This is the most
portable device in the file.

**Numbers are specific and dated.** `61%`, `56%`, `12 weeks`, `24 weeks`, `04:29`,
`28 days`, `15 or 30 minutes`, `one calendar month`, `five days`, `172,000 smarter
journeys every day`, `270 rail and coach operators in 45 countries`,
`over 1 million delayed journeys`. Times are given in 24-hour format throughout,
correct for a UK rail audience.

**Accessibility content** `[observed]`

- `Skip to content` (main site) and `Skip to main content` (help centre) both first in DOM
- The affiliate link carries a full-purpose accessible label:
  `Open Booking.com in a new tab with places to stay on your trip` — states the
  destination, the new-tab behaviour and the reason
- Image alt text observed is functional rather than descriptive:
  `Trainline homepage` (logo), `Change language or currency` (icon),
  `Trainline Leisure Help Centre home page` (help logo)
- Hero photography on the Advance and Off-Peak pages carries **empty alt** —
  correct for decorative imagery
- A public help article `How to book assistance or check accessibility for disabled
  passengers` is linked from the footer of every page, and `Accessibility &
  Assistance` exists as a help section
- Language switcher offers 16 language/market pairs; help centre offers 5

**Negative findings, recorded honestly**

- Untranslated CMS string keys render as visible page text on the homepage:
  `components.subFooter.variant18` through `components.subFooter.variant21`
- The homepage carries a heading reading `Best fare finder images` — a content
  editor's internal label shipped as a public H2
- `Ready to book?` → `Book a ticket` on the Off-Peak page links to `#`
- The `Travel alert` banner is stale and inconsistent between sibling help pages
  (T7)
- `No industrial action is currently planned.` appears in four casings/wordings
- Footer links across the whole site still point at the retired help platform
- Help-centre `<title>` is the internal business-unit name `Trainline Leisure`
- Currency selector showed `Pound Sterling (GBP/£)` as selected while fare teasers
  rendered `from $54.75` / `from £11.55`-equivalents in `$` — locale mismatch
  (flagged as observed inconsistency; may be geo-detection on the harvesting
  session rather than a site defect)
- Icon labels appear duplicated in the extracted text (`BasketBasketBasket`,
  `CloseClose`, `ChevronRightChevronRight`, `Menu IconIcon opening the menu`).
  **Suspected** to be an icon `title` plus an accessible label both rendering;
  not confirmed, and possibly an artefact of text extraction rather than the page.

---

## Transferable patterns

1. **Index recovery content on what the user bought, not on what went wrong.**
   The strike page's four blocks are `Advance` / `Flexible` / `Return` / `Season`.
   The user knows their product; they do not know your incident taxonomy. Transfers
   directly to disputes, chargebacks and refund eligibility copy where entitlement
   varies by payment product.
2. **Define the harder variant as a diff on the simpler one.** `Super Off-Peak
   Return` is defined as "the same as the Off-Peak Return ticket above… The only
   difference is". Halves the reading load and makes the distinction the subject of
   the sentence. Condition: only works when the two are genuinely adjacent on the page.
3. **`Can I …?` as the dominant help-title shape for restriction-heavy products.**
   Where the real user question is permission rather than procedure, `Can I upgrade
   to First Class?` beats `Upgrading to First Class`. Applies to eligibility,
   limits, and regional-availability content.
4. **One named artefact for the whole fee schedule.** `Tiered refund and exchange
   fees` is linked from every ticket type instead of restating amounts. No number is
   duplicated, so none can drift out of sync.
5. **Fuse the concession into an adjective and put it first.** `fee-free refund`
   lands the good news before the conditions. Compare "a refund with no
   administration fee", which buries it.
6. **Write the arithmetic out, don't state the rule.** `04:29` is explained with a
   worked Wednesday-to-Thursday example rather than "valid until 04:29 the following
   day". Use where the rule crosses a boundary the user does not think in.
7. **Negative confirmation at scale.** Listing all 30 operators and saying "no
   industrial action is currently planned" for 29 of them answers the actual query.
   Expensive, correct — but templating the string is mandatory, which Trainline did
   not do.
8. **Alert banners need the same governance as articles.** Trainline's disruption
   *article* is a model and its disruption *banner* contradicts it on two sibling
   pages. If a banner is written per-placement, it will go stale per-placement.

## Caveats & gaps

- **No authenticated pass.** Booking flow, seat selection, basket with contents,
  ticket wallet, refund request flow, Delay Repay claim UI and all validation
  messages are unreachable. T5 covers the search form only.
- **Search results not observed.** Filter and sort labels on the results page —
  the surface where fare names are actually chosen between — were not harvested,
  because reaching it requires entering stations and dates into a form. This is the
  single biggest gap for T5/T6 and needs a pass that is permitted to run a search.
- **One help-article body opened.** All other help content in this file is
  captured as *titles only*, marked `[documented]`. Titles are high-signal for IA
  and task phrasing but say nothing about answer structure.
- **Split-ticket content not opened.** `SplitSave` and
  `/trains/great-britain/split-tickets` were identified but not fetched; the split
  vocabulary here comes from nav labels and one article title.
- **Railcard detail pages not opened.** Eight railcards were identified by name
  from nav and cross-links; their individual eligibility copy is unharvested.
- **Event-driven content is dated.** The industrial-action page reads
  `Last update: Friday 11th September 2026`. Everything in T7 about strikes is a
  snapshot and will not reproduce.
- **Locale uncertainty.** Fare teasers rendered in `$` while the selector showed
  GBP. Any claim in this file about UK currency presentation should be re-verified
  on a UK-geolocated session.
- **European register unharvested.** Trainline sells in 45 countries and offers 16
  languages; only en-GB was inspected. Non-UK fare vocabulary (Trenitalia, SNCF,
  Renfe fare brands) is a separate corpus.

## Sources

1. https://www.thetrainline.com/
2. https://www.thetrainline.com/trains/great-britain/ticket-types/advance-train-tickets
3. https://www.thetrainline.com/trains/great-britain/ticket-types/off-peak-train-tickets
4. https://www.thetrainline.com/trains/great-britain/industrial-action
5. https://www.thetrainline.com/trains/great-britain/delay-repay
6. https://support.thetrainline.com/en/support/home (redirects to https://support.thetrainline.com/hc/en-gb)
7. https://support.thetrainline.com/hc/en-gb/categories/5113555047839-Ticket-Types-Railcards
8. https://support.thetrainline.com/hc/en-gb/categories/5113564195615-Refunds-Exchanges-Compensation
9. https://support.thetrainline.com/hc/en-gb/categories/5113547571871-Travel-Disruptions
10. https://support.thetrainline.com/hc/en-gb/sections/5113547999263-UK-Tickets-Discounts
11. https://support.thetrainline.com/hc/en-gb/articles/5124949418271-What-are-the-different-tickets-available-for-UK-trains
