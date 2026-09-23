# 089. Uber

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Ride-hailing (global, multi-service) — two-sided marketplace spanning rides, delivery, freight, business travel |
| Primary URL | https://www.uber.com/ |
| Corpus rank | 089 |
| Benchmark strength (source list) | Pickup context and trip status |
| Locale / market observed | en-US (`/us/en/` paths); Community Guidelines served for `United States` jurisdiction |
| Platform observed | Web (desktop) — rider marketing, driver marketing, safety hub, legal hub, accessibility. **Help centre unreachable** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | California upfront-pricing carve-out for shared rides; state-varying insurance (`at least $1 million in liability insurance`, `Uber does not maintain UM/UIM for rideshare in every state`); NYC exclusions on annual driving-history reruns and on Trip Radar; WCAG 2.1 Level AA commitment; independent-contractor status asserted in legal footnotes; `Firearms Prohibition Policy`, `Zero Tolerance Policy`, `Non-Discrimination Policy`, `Service Animal Policy`, `Dangerous Driving Policy` |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 retrieved; 2 blocked |
| Harvest completeness | Partial — **`help.uber.com` is fully client-rendered and returned an empty body on both the root and a deep article URL.** The entire help-centre IA, category tree and article bodies are unreachable. Trip-state and fee content below is drawn from marketing pages, in-app screenshot alt text, and the Community Guidelines |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Rider hub | https://www.uber.com/us/en/ride/ | Booking widget, promo banner, rider FAQs |
| Rider how-it-works | https://www.uber.com/us/en/ride/how-it-works/ | 6-step rider onboarding, `Top questions from riders` |
| Driver hub | https://www.uber.com/us/en/drive/ | Requirements tabs, driver FAQs |
| Safety (company) | https://www.uber.com/us/en/safety/ | Company-level safety narrative and feature index |
| Rider safety | https://www.uber.com/us/en/ride/safety/ | Largest safety-feature-name inventory on the site |
| Driver safety | https://www.uber.com/us/en/drive/safety/ | `Safety Toolkit`, crash reporting, insurance |
| Upfront pricing | https://www.uber.com/us/en/ride/how-it-works/upfront-pricing/ | Rider pricing explainer + California footnote |
| Driver: your first trip | https://www.uber.com/us/en/drive/basics/ | Driver onboarding, ride types, ratings, lost items |
| Accessibility | https://www.uber.com/us/en/about/accessibility/ | Six principles, WCAG statement, disability resources |
| Uber WAV | https://www.uber.com/us/en/ride/uberwav/ | 3-step WAV flow + full product taxonomy carousel |
| Driver earnings | https://www.uber.com/us/en/drive/how-much-drivers-make/ | **Highest-value divergence page** — every fee framed as driver income |
| Community Guidelines | https://www.uber.com/us/en/legal/general-community-guidelines/ | Full policy text, `Last modified: 8/11/2025` |
| Driver app guide | https://www.uber.com/us/en/drive/driver-app/ | **Highest-value trip-state page** — in-app screen labels quoted in alt text |
| Airports | https://www.uber.com/us/en/airports/ | Wait-time grace periods (page oversized; content-bearing head read directly) |
| Uber Reserve | https://www.uber.com/us/en/ride/how-it-works/reserve/ | Price-lock and cancellation-fee footnotes |
| **BLOCKED** Help centre root | https://help.uber.com/ | Empty body — client-rendered shell |
| **BLOCKED** Help article | https://help.uber.com/riders/article/cancellation-fees-explained… | Empty body — confirms the whole surface is unreachable |

---

## T1 Navigation & IA labels

**The IA is organised by *what you do on the platform*, and the earn side is
nested one level down** `[observed]` (https://www.uber.com/us/en/ride/)

Global nav: `Ride` · `Earn` (→ `Drive`, `Deliver`) · `Business` · `Uber Eats` ·
`About` (→ `About us`, `Our offerings`, `How Uber works`, `Sustainability`,
`Newsroom`, `Investor relations`, `Autonomous`, `Uber Advertising`, `Merchants`,
`Blog`, `Careers`) · `More` · `EN` · `Help` · `Log in` · `Sign up`

`Earn` rather than "Drive" at top level is the notable choice: the parent label
names the *motivation*, and the two children (`Drive`, `Deliver`) name the
activity. A prospective earner self-routes on the outcome before choosing a mode.

**The audience switcher is the clearest multi-audience artefact on the site** `[observed]`

Signed-out sign-up menu: `Ride` · `Earn` · `Uber Eats` · `Business`.
Signed-in menu header `Welcome` with `Drive & deliver` · `Ride` · `Uber Eats` ·
`Uber for Business` · `Manage account` · `Sign out`.

Note the **label changes between signed-out and signed-in**: `Earn` becomes
`Drive & deliver`. Pre-commitment the label is aspirational; post-commitment it is
operational.

**Sign-in strings are written one per audience, never generically** `[observed]`

`Sign in to drive & deliver` · `Sign in to ride` ·
`Sign in to order delivery with Uber Eats` · `Sign in to your Uber for Business account`

and on the legal page, the sign-up variants:
`Sign up to drive & deliver` · `Create a rider account` ·
`Order delivery with Uber Eats` · `Sign up for Uber for Business`

Four purposes, four labels, and the *rider* variant alone uses a noun phrase
(`Create a rider account`) rather than an infinitive. Worth noting as a minor
inconsistency inside an otherwise disciplined set.

**Sub-nav register diverges sharply by audience** `[observed]`

| Rider sub-nav | Driver sub-nav |
|---|---|
| `Ride` · `Request a ride` · `Reserve a ride` · `See prices` · `Explore ride options` · `Airport rides` · `More` | `Drive` · `Sign up` · `Requirements` · `Vehicle solutions` · `Your first trip` · `Using the app` · `Earnings` · `Uber Pro` · `Safety` · `What's new` · `Contact us` · `More` |

**Rider sub-nav is verb-first task labels; driver sub-nav is noun-first topic
labels.** The rider nav reads like a transaction flow; the driver nav reads like
the contents page of a manual. This is the first and most structural instance of
the register split that runs through the entire estate.

The driver nav also carries `Contact us`, which the rider nav does not — a support
affordance promoted into navigation for one audience only.

**In-page anchor navs are the real article outlines** `[observed]`

- Driver safety: `Safety Toolkit` · `Safety features` · `Insurance` · `Uber's Community Guidelines` · `Safety tips`
- Driver earnings: `Maximize earnings` · `Trip fares` · `Track earnings` · `Fare breakdown` · `Cashing out` · `Taxes`
- Driver basics: `Car prep` · `Going online` · `Ride types` · `Trip formats` · `Airports` · `Preferences` · `Ratings`
- Driver app: `Navigating the app` · `Going online` · `Trip requests` · `Taking trips` · `Vehicle integrations`

Riders get no equivalent anchor navs on the pages inspected. The driver estate is
structured as documentation; the rider estate is structured as marketing.

**Footer** `[observed]`: `Visit Help Center` (promoted above the groupings) ·
**Company** · **Products** · **Global citizenship** (`Safety`, `Sustainability`) ·
**Travel** (`Reserve`, `Airports`, `Hotels`, `Cities`) · legal strip
`Privacy` · `Accessibility` · `Terms` · `© 2026 Uber Technologies Inc.`

Filing `Safety` under `Global citizenship` rather than under `Products` or a
support grouping is a positioning statement: safety is framed as a corporate
responsibility, not a product feature — even though the safety pages themselves
are entirely feature inventories.

**Breadcrumb** `[observed]`: `Home > Ride > Airports`.

**Help-centre IA** `[absent]` — blocked. The only recoverable structure is the
two-audience URL split: `help.uber.com/riders/…` and
`help.uber.com/driving-and-delivering/…`. Note that the driver path merges drivers
and couriers into one segment while the rider path is singular.

## T2 Value proposition & headline patterns

**The rider hero is the booking form. There is no rider headline.** `[observed]`

H1 on https://www.uber.com/us/en/ride/ is `Request a ride` — the form label
functioning as the page headline. Uber has concluded that a rider arriving on the
ride page needs a field, not an argument.

The driver hero, by contrast, is a full value proposition:

> H1 `Drive when you want, make what you need`
> Subhead `Earn on your own schedule.`

Two clauses, both about autonomy, with the earnings claim deliberately
unquantified (`what you need`, not "$X/hour"). The asymmetry is the finding: the
rider is assumed to have already decided; the driver is being persuaded.

**The deliberate headline pair** `[observed]`

| Rider | Driver |
|---|---|
| `Ride with confidence` + "The Uber platform was built with safety in mind." (`/ride/safety/`) | `Drive with confidence` + "Every trip is different—and with 24/7 support and in-app safety features designed with you in mind" (`/drive/safety/`) |

Same construction, one verb swapped. This is the only place in the estate where
Uber makes the two audiences explicitly parallel, and it is on safety — which is
also the only topic with a shared tagline (`Your safety drives us.`, used on
`/safety/`, `/ride/safety/` and `/drive/` alike).

**Other headlines** `[observed]`

Rider: `A guide for how to use Uber` · `Uber's upfront pricing, explained` ·
`Uber WAV` / "Rides in wheelchair-accessible vehicles." ·
`Lock in a little peace of mind with Reserve` ·
`Airport rides are better with Uber`

Driver: `Start earning on Uber` (eyebrow `Your first trip`) ·
`Your earnings, explained` (eyebrow `Earnings`) ·
`Your guide to Uber's Driver app` (eyebrow `Using the app`)

Company: `Our commitment to safety` · `Move freely, accessibly` ·
`Uber Community Guidelines`

**Two headline templates recur.** `X, explained` (`Uber's upfront pricing,
explained`, `Your earnings, explained`) is used on both sides for the two topics
users most distrust — pricing to riders, pay to drivers. And `Your guide to X` /
`A guide for how to X` marks the documentation pages. The comma-plus-`explained`
construction signals "this is the page where we stop selling", and it is applied
consistently.

`Move freely, accessibly` is the sharpest headline in the file — the adverb
carrying the whole accessibility commitment, appended to the company's core verb.

**Rider section headers are sensory and reassurance-led** `[observed]`:
`Smooth rides from start to finish` · `Peace of mind on every ride` ·
`Ride with friends seamlessly` · `Use the Uber app to help you travel your way` ·
`Ways people move around the world`

**Driver section headers are operational** `[observed]`:
`Preparing your car` · `Going online` · `Trip formats` · `Maximizing your earnings` ·
`Fare breakdown` · `Cashing out` · `Taxes` · `Reading trip requests` · `Taking trips`

`Cashing out` and `Taxes` as section headers on a marketing page is a striking
level of operational honesty for an acquisition surface.

## T3 CTA inventory

| CTA (verbatim) | Audience | Context / notes |
|---|---|---|
| `See prices` | Rider | Booking widget primary — repeated 6× on `/ride/`. **Uber never says `Book`** |
| `Request a ride today` | Rider | Airports |
| `Schedule for later` | Rider | The Reserve entry, phrased as a deferral not a product |
| `Sign up to ride` | Rider | |
| `Next` | Rider | WAV price estimator, Reserve hero |
| `Download the Uber app` | Rider | Plus a desktop QR variant |
| `Learn more about <product>` | Rider | **19 distinct instances** in the WAV carousel alone — `Learn more about Uber Reserve`, `…Uber Taxi`, `…UberX`, `…Uber Comfort`, `…Uber Black SUV`, etc. |
| `Get details` | Both | Rider FAQ + used ~12× as the universal driver secondary CTA |
| `Get started` | Driver | Drive hero, primary |
| `Log in` | Driver | Drive hero, secondary |
| `Download the Driver app` | Driver | Also `Download Uber's Driver app` — **apostrophe variant across three pages** |
| `Get more information` | Driver | Requirements carousel, appears twice (`To drive` / `To deliver`) |
| `See driver requirements` · `See all cities` | Driver | |
| `Submit your question` | Driver | Chat entry point, carries a `chatNodeId` parameter |
| `Go to the Help Center` | Driver | Foot of every driver FAQ block |
| `Visit Help Center` | Both | Footer, sitewide |
| `Help` | Both | Global nav |
| `Report on-trip discrimination` | Both | Accessibility page → help article |
| `Provide feedback related to platform accessibility` | Both | Accessibility page — the longest CTA on the site |
| `Visit the Public Safety Portal` | Both | Safety |
| `Review Community Guidelines` / `See Community Guidelines` / `Our Community Guidelines` | Both | **Three labels, one destination** |
| `Return to Legal Hub` | Legal | |
| `Skip to main content` | All | Present on all 15 pages |

**Register verdict.** Rider CTAs are outcome-led and permissive
(`See prices`, `Learn more about…`, `Find out more`). Driver CTAs are imperative
and task-led (`Get started`, `Get details`, `Submit your question`). And there are
**four labels for the help centre** across the estate (`Help`, `Visit Help
Center`, `Go to the Help Center`, `Submit your question`), which is the most
visible label-governance failure.

Note also that `See prices` is doing disclosure work: Uber declines to say `Book`
or `Request` on the primary widget because no price has been shown yet, and the
button promises only the estimate. That is a defensible and deliberate choice.

## T4 Onboarding & getting-started

**Rider — 6 steps, narrative and de-escalating** `[documented]`
(https://www.uber.com/us/en/ride/how-it-works/, section `How to use the Uber app`)

1. `Create an account` — "All you need is an email address and phone number."
2. `Enter your destination` — enter it in the `Where to?` box, `Confirm` pickup,
   then `tap Confirm again to be matched to a driver nearby`
3. `Meet your driver` — "You can track their arrival on the map."
4. `Check your ride` — match licence plate, car make and model, driver photo
5. `Sit back and relax` — payment happens on arrival
6. `Rate your trip`

Steps 1–4 are imperatives that require action. **Step 5 is an imperative that
requires the absence of action**, and it is placed exactly where the user's
control ends. That is the pivot of the whole rider narrative: the sequence
deliberately stops being instructional at the moment the rider becomes a
passenger. Step 4 (`Check your ride`) is a safety check presented as an ordinary
step rather than as a warning — the only place the rider is asked to verify
anything, and it is not labelled as safety.

**Rider — WAV, 3 steps** `[documented]` (https://www.uber.com/us/en/ride/uberwav/):
`1. Request` · `2. Ride` · `3. Exit the vehicle`

Single-word steps, and step 3 is `Exit the vehicle` rather than "Arrive" — a
deliberate acknowledgement that for a wheelchair user the exit *is* a step with
duration and difficulty, not an instant.

**Driver — requirements, 3 cards, tabbed by mode** `[observed]`
(https://www.uber.com/us/en/drive/, `Here's what you need to become a driver or
delivery person`)

- `Requirements`: `Meet the minimum age to drive in your city` ·
  `Have at least one year of driving experience` · `Clear a background check`
- `Documents`: `Valid driver's license` ·
  `Proof of residency in your city, state, or province` ·
  `Insurance if you plan to drive your own car`
- `Signup process`: `Submit documents and photo` ·
  `Provide information for a background check` ·
  `Find out if your car is eligible, or get a car`

The `To deliver` tab restates the same cards with different thresholds
(`If biking: be at least 18 years old`), and adds
`Submit your Social Security number for us to run a background screening`.

Note the structure: **requirements → documents → process**, i.e. eligibility
before paperwork before steps. The prospective driver can disqualify themselves at
card one without reading further, which is the humane ordering.

**Driver — in-trip flow, explicitly counted** `[documented]`
(https://www.uber.com/us/en/drive/driver-app/)

> `After accepting a trip, you'll go through 3 main stages: navigating to your
> rider, starting the trip, and ending the trip.`

Rendered as four cards: `Pickup` → `Trip start` → `Map reports` → `Dropoff`.
**The prose says three stages and the UI shows four cards** — `Map reports` is an
optional interjection, not a stage, but the count mismatch is unexplained.

## T5 Form & field labels

**Rider booking widget** `[observed]` (present on `/ride/`, `/ride/how-it-works/`,
`/upfront-pricing/`, `/uberwav/`, `/airports/`)

| Label | Notes |
|---|---|
| `Pickup location` | Full noun phrase |
| `Dropoff location` | `Dropoff` as one word, unhyphenated — consistent with the driver-side `Arrived at dropoff` |
| `Date` · `Time` · `Now` | `Now` is a value presented as a control |
| `Calendar` · `Clock` · `open` | Icon/control accessible names exposed as text |

**A different register for the same two fields on Reserve** `[observed]`:
`Where from?` and `Where to?` (https://www.uber.com/us/en/ride/how-it-works/reserve/).

Two label systems for one form: `Pickup location` / `Dropoff location` on the
marketing widget, `Where from?` / `Where to?` on Reserve and (per the prose) in
the app itself. The question form is the in-app one and is the better label —
shorter, conversational, and it survives being spoken aloud. The noun-phrase form
exists on marketing pages where the field must be self-explaining without a map.

**The keyboard instruction is unusually thorough** `[observed]`:

> `Press the down arrow key to interact with the calendar and select a date.`
> `Press the escape button to close the calendar.`

Two full sentences of AT instruction on a date picker, naming the key and the
outcome for both entry and exit. Verbose by convention, but complete — most date
pickers ship neither sentence.

**`Suggestions`** `[observed]` is the autocomplete container heading, rendering
server-side as an empty bulleted list.

**Jurisdiction and language selectors** `[observed]` (legal page):
`Select jurisdiction:` / `United States`; `Select language:` / `English`;
modal heading `Select your preferred language`.

Placeholder strings `[absent]` — not exposed in server-rendered HTML.

## T6 Trip status language — PRIORITY

**This is the centrepiece of the file. The two audiences do not share a state
vocabulary at all.**

### Driver side — a fully labelled state machine `[observed]` where noted

Captured from in-app screen labels quoted in image alt text and body copy on
https://www.uber.com/us/en/drive/driver-app/ and
https://www.uber.com/us/en/drive/basics/.

| State | Verbatim string | Evidence |
|---|---|---|
| Offline | `You're offline.` | `[observed]` — alt text of the Go-button screenshot |
| Going online | `Go` | `[observed]` — button label |
| Offer pending | `Accept` | `[observed]` — alt text, UberX offer card |
| Offer pending (broadcast) | `Match` | `[observed]` — alt text, Trip Radar offer card |
| Offer expiry | `If you don't accept or decline the offer, it will time out.` | `[documented]` |
| En route to pickup | `Pickup` | `[observed]` — section label |
| **Waiting at pickup** | `Waiting for rider` + a visible timer `1:30` | `[observed]` — alt text |
| Trip start | `Start UberX` (button) / `swipe Start` | `[observed]` + `[documented]` |
| In progress | `Trip start`; app "will begin navigating to your dropoff location" | `[documented]` |
| Arrived | `Arrived at dropoff` | `[observed]` — alt text |
| Complete | `Complete UberX` / `swipe Complete to finish your trip` | `[observed]` + `[documented]` |
| Post-trip | `Dropoff`: "prepare to accept another trip request or go offline" | `[documented]` |
| Session end | `Session summary` — "After going offline, you'll receive a summary of the time you were just online" | `[documented]` |
| Overlapping trips | `Back-to-back trips` — "Occasionally, you'll receive your next trip request before your current one ends." | `[documented]` |

Two details worth extracting. **`Start UberX` and `Complete UberX` interpolate the
product name into the button.** The driver is not starting "the trip"; they are
starting the specific product they accepted, which matters because the fee rules
(wait time, cancellation window) differ by product. The button carries the
contract. And `Waiting for rider` is paired with a **running timer** — the driver's
wait state is quantified on screen because it is a billable quantity.

### Rider side — a narrative arc and a fee schedule, with no state labels

| Moment | Verbatim string | Evidence |
|---|---|---|
| Requesting | `Request a ride` / `Confirm` / `tap Confirm again to be matched to a driver nearby` | `[documented]` |
| Matched | "you'll see your driver's picture and vehicle details" | `[documented]` (uberwav) |
| Matched (Reserve) | `Your ride is confirmed once you receive your driver details.` | `[documented]` (Reserve footnote) |
| Arriving | "You can track their arrival on the map. When they're a few minutes away, wait for them at your pickup location." | `[documented]` |
| Driver arrived | `meet your driver within 2 minutes of their arrival` | `[documented]` (airports) |
| In progress | `Sit back and relax` | `[documented]` |
| Completed | `When you arrive, payment is easy.` | `[documented]` |
| Post-trip | `Rate your trip` | `[documented]` |

**Rider-facing labels for `cancelled` and `no-show` are `[absent]` from every
reachable page.** The rider never encounters a no-show *state* on uber.com; the
concept surfaces only as a *fee*. Rider "waiting" appears only as `wait-time fees`
and `grace periods`.

**The finding, stated plainly.** The driver register is a state machine with
explicit labels, timers and swipe gestures — because the driver is operating the
system and every state has a financial consequence they must be able to see. The
rider register is a six-beat narrative that culminates in `Sit back and relax` —
because the rider is a passenger and the system is deliberately making itself
invisible. Uber has not failed to name rider states; it has decided not to. The
cost is that when something goes wrong, the rider has no vocabulary to describe
where in the trip it happened, which is exactly when they most need one.

`Your ride is confirmed once you receive your driver details.` is the one rider
string that does define a state boundary, and it exists because Reserve sells
certainty and therefore has to say when certainty begins.

## T7 Error, failure & recovery — PRIORITY

**Lost item — the cleanest register divergence in the corpus** `[observed]`

| Rider (`/ride/` FAQ) | Driver (`/drive/basics/` FAQ) |
|---|---|
| `Can I have a lost item delivered to me?` — answer routes to the Package product | `What should I do if a rider leaves something in my car?` — contact support fast; `You'll receive a return fee for your time and effort.` |

**Same event. The rider is sold a service; the driver is paid a fee.** Neither
question mentions the other party's experience. The rider's question is framed as
a purchase enquiry (`Can I have…delivered`) and does not use the word "lost" in
the answer path at all; the driver's is framed as a procedure with compensation
attached. Uber has resolved a shared failure into two unrelated transactions, and
the copy on each side is internally coherent precisely because it never
acknowledges the other.

**Driver recovery content is procedural and specific** `[observed]`
(https://www.uber.com/us/en/drive/safety/)

- `Report incidents and crashes` — in-app path given verbatim:
  `go to Help, select the relevant trip, and send a message to our Support team`
- Alternate path: `tapping the blue shield in the bottom left corner of the map,
  then choose Report a crash`, then `Let us know what happened and submit your claim.`
- FAQ titles: `What should I do if I feel unsafe during a trip?` ·
  `What should I do if I'm in a car accident?` ·
  `How can I protect myself as an Uber driver?`

The blue-shield location is given as a spatial instruction (`bottom left corner of
the map`) rather than by label alone — correct for a control a user will be
looking for under stress.

**Driver interpersonal failure** `[observed]` (`/drive/basics/`):
`What should I do if I have a bad experience with a rider?` → rate, leave
feedback, and `we'll ensure that you're not matched with a rider again if you rate
them 1 star`, then `contact Support`. The remedy is stated as an automatic system
consequence with a specific trigger, which is unusually concrete for a
behaviour-reporting flow.

**Account loss is named euphemistically and consistently** `[observed]` (legal,
driver safety): Uber never writes "ban". The phrases used are
`lose access to all or part of the Uber Marketplace Platform`,
`account deactivation`, and `turn your account inactive`. The recovery route is
offered in one sentence: "If you have lost access to your driver or delivery
person account, you can learn more about common issues and potential options
available to you here" → `/us/en/drive/safety/deactivations/`.

`potential options available to you` is doing careful work: it promises a page,
not a remedy.

**Named driver dispute types** `[observed]` — from alt text on
https://www.uber.com/us/en/drive/driver-app/, an Inbox screenshot is described as
showing `active messages about a driver fare review and a cancellation fee issue`.
Those two — **fare review** and **cancellation fee issue** — are the named
driver-side dispute categories, and `active` is their state.

**Help-article titles** `[documented]` — **caveat: these were recovered from a
WebSearch index restricted to uber.com and were NOT opened**, because
`help.uber.com` is unreachable. They are recorded as titles only.

| Rider titles | Driver titles |
|---|---|
| `Review cancellation fee` · `Cancellation fees explained` · `Am I charged for cancelling a trip?` · `Am I charged for canceling?` · `Wait time fees` · `Wait time fees and refunds` | `How rider cancellation fees are charged` · `Cancellation fee` · `How are Wait Time fees calculated?` |

The split on an identical event is exact: **the rider gets the self-directed
anxious question (`Am I charged for cancelling a trip?`); the driver gets the
third-person mechanical description (`How rider cancellation fees are charged`).**
The rider is asking about their own exposure; the driver is being taught a system.
Note also `cancelling` and `canceling` both appear in rider titles — two spellings
of one word across two articles.

**Help-article titles observed as link text on fetched pages** `[observed]`:
`I want to report a trip denial due to discrimination` ·
`I need accessibility support` ·
`I have a disability, how do I request a wait time fee refund or waiver?` ·
`Features for deaf and hard of hearing drivers` · `Using TalkBack and VoiceOver` ·
`Safety Incident Reporting Line` · `How are fares calculated?`

The three first-person accessibility titles (`I want to report…`, `I need…`,
`I have a disability, how do I…`) are the strongest article titles on the site —
first person, situation-first, and the third one states the condition before the
request, which is how the user would actually open the conversation.

**`[absent]`**: rider-facing fare-dispute content; rider-facing wrong-destination
content; a rider-facing "my driver didn't arrive" article; all in-product error
strings and validation messages.

## T8 Empty states

Three captured `[observed]`, and only one is authored copy:

- `No results` — the empty state for the `More` mega-menu search and the rider and
  driver sub-nav `More` dropdowns. Present on all 15 pages. Two words, no recovery
  suggestion, no query echo.
- `No rating yet` — the driver's pre-first-trip rating state, quoted in alt text on
  `/drive/basics/`: "Five outlined stars in a row… with the words 'No rating yet'
  to the right." Outlined rather than filled stars plus a three-word caption. This
  is the better of the two: it distinguishes *no data* from *zero*, which a
  five-star widget otherwise conflates.
- `Suggestions` followed by an empty list — an unpopulated autocomplete container
  rather than authored empty-state copy.

All in-product empty states (no trips, no earnings, no messages) `[absent]`.

## T9 Notifications & system messages

**Rider-facing notification copy quoted on public pages** `[observed]`

- Site promo banner: `Sign up now and get 30% off your first ride (up to $8 off). Terms apply.*`
- `Bike Lane Alerts` — `The app will notify you of any bicycle lanes before exiting your ride.`
- `Seat Belt Reminders` — `The app provides helpful reminders to buckle up at the start of a trip.`
- Dashcam: `riders will be notified that the trip will be recorded`
- `RideCheck` — `If the app alerts us to anything out of the ordinary, we'll reach out to provide you with the resources you need to get help.`
- Teen accounts: "you'll be notified every time they do"
- Cash trips (legal): `Both drivers and riders are notified within the app when a trip involves a cash payment.`

**Driver-facing** `[observed]`

- Ratings warning (legal): `If your ratings are approaching the minimum limit, we
  will let you know and may share information that may help you improve your ratings.`
- Practice trip: "you may see a message in your Inbox giving you the opportunity
  to try a practice trip"; the in-app tile label appears in alt text as
  `Take a riderless practice trip`
- Channels named: `We occasionally send emails, push notifications, and in-app
  messages about new features.`
- A promo notification captured in alt text: a `Weekend Quest` offering
  `$50 for 15 trips and $55 for 20 trips`

**The RideCheck sentence is the best notification copy on the site.** It states
the trigger vaguely (`anything out of the ordinary`) — necessarily, since naming
the sensors would teach people to evade them — but states Uber's own action
concretely (`we'll reach out`) and the payload precisely (`the resources you need
to get help`). Vague cause, specific effect, which is the right split when the
detection logic must stay opaque.

**The ratings warning is the driver-side equivalent and is deliberately hedged**:
`we will let you know` is a commitment; `may share information that may help` is
two hedges in five words. A deactivation warning that promises notification but
not assistance.

Verbatim push-notification bodies `[absent]`.

## T10 Disclosures & fees — PRIORITY

**The parallel corpus.** Five events, identical mechanics, opposite polarity.
This is the artefact.

### (a) Cancellation

| Driver (`/drive/how-much-drivers-make/`) | Rider (`/ride/how-it-works/reserve/`, `/airports/`) |
|---|---|
| Section header `Cancellations`; `they're charged a cancellation fee and you're paid for the inconvenience.` | Section header `Book ahead of time with flexible cancellation`; `If your plans change, cancel for free up to one hour before your scheduled pickup time.` |
| Windows stated exactly: `the time period is 2 minutes after you accept; it's 5 minutes for Uber Black and Uber SUV, and 1 hour before pickup for Reserve trips.` | Footnote ³: `Cancellation fees for Uber Reserve are higher than with on-demand.` and `You may be charged a cancellation fee if you cancel a Reserve trip, depending on the circumstances.` |
| Also a scored metric: `What is my cancellation rate?` — "the percentage of trip requests you cancel after accepting them… A lower cancellation rate helps keep trips running smoothly and may unlock higher Uber Pro status and more rewards." | Soft deflection on a card: `Plans changed? Cancellation options vary by trip—check the details in-app.` |

**Verdict.** To the driver a cancellation is simultaneously *income*
(`you're paid for the inconvenience`) and *a scored behaviour* (`cancellation
rate`, tied to `Uber Pro status`). To the rider it is a *flexibility feature*,
with the penalty demoted to footnote ³ and the exact thresholds replaced by
`depending on the circumstances` and `vary by trip—check the details in-app`.

The driver is given the precise numbers (2 min / 5 min / 1 hour); the rider is
given `up to one hour before` in the positive case and no number at all in the
negative case. **The audience that pays the fee is told less about it than the
audience that receives it.**

### (b) Wait time and no-show

| Driver | Rider |
|---|---|
| Header `Wait Time Fee`: `After you arrive at a pickup, you'll earn extra for longer wait times. Per-minute fees start if your rider hasn't entered the vehicle after 2 minutes for most trips, or 5 minutes for Uber Black and Uber SUV.` | `meet your driver within 2 minutes of their arrival to avoid wait-time fees`; `Different ride options have different grace periods.`; `For Uber Black, Uber Black SUV, Uber Premier, and Uber Premier SUV, you'll have 5 minutes.` |
| In-app state: `Waiting for rider` with a running timer | Avoidance advice: `Avoid wait-time fees by selecting the correct arrivals gate and following instructions in the app to meet your driver.` |
| | Airport Reserve variant: `meet your driver up to 45 minutes after your flight's arrival before late fees apply`; `within 60 minutes` for premium tiers |
| | Accommodation: `Riders with a disability can request a wait-time fee waiver.` |

**Verdict.** Identical thresholds, opposite polarity. Driver: `you'll earn extra`.
Rider: `to avoid wait-time fees`. One is a revenue line, the other a
penalty-avoidance instruction — and the rider version is an infinitive of purpose
(`to avoid…`), so the *entire sentence* is constructed around the fee rather than
around the meeting.

**Uber uses the words "no-show" to neither audience.** The concept is decomposed
into `wait-time fees` (rider) / `Wait Time Fee` (driver) and `cancellation fee`,
with no name for the event itself. `grace periods` is the only neutral term, and
it appears on the rider side only.

### (c) Upfront pricing and surge

| Rider (`/ride/how-it-works/upfront-pricing/`) | Driver (`/drive/how-much-drivers-make/`) |
|---|---|
| `Before you request a ride, the app shows an estimated upfront price to your destination every time—so you can sit back and enjoy the trip.*` | Header `Upfront Fares`: `In most cities, see how much you'll make and where you'll go before you accept a trip.` |
| Inputs listed: "estimated trip time and distance from origin to destination, as well as demand patterns for that route at that time"; includes "any applicable tolls, taxes, surcharges, and fees (with the exception of wait time fees)" | Inputs listed: "base fares, estimated trip lengths and durations, pickup distance, and surge pricing" |
| FAQ `How are prices calculated?`: "time and distance… subject to surcharges, tolls…, cancellation and wait times if applicable, and booking fees." | `Heatmap`: `Surge is shown in purple on the rides heatmap. Any trip you get in the purple area while surge pricing is available will include extra earnings` |

**`demand patterns` (rider) vs `surge pricing` (driver).** The same input, named
twice. The rider is told about "demand patterns for that route at that time" — a
descriptive, market-neutral phrase. The driver is told about `surge pricing` and
shown it in purple on a map.

**Uber does not explain surge to riders anywhere on the pages inspected.** A
rider-facing surge explainer is `[absent]`. The only rider-facing use of the word
is Reserve's selling point `No surges or spikes.` — **the absence is sold; the
mechanism is never described.** That is the single most consequential content
decision in this file.

Note also `Upfront Fares` (driver, title-cased, plural, a named product) vs
`upfront price` (rider, lowercase, singular, a descriptive noun). Even the casing
diverges: to the driver it is a feature with a name; to the rider it is a property
of the screen.

### (d) Tolls, surcharges, booking fees, take rate

| Driver | Rider |
|---|---|
| `Tolls`: `When your vehicle is charged a qualifying toll or surcharge during a trip, the toll amount is charged to your rider and paid to you.` | `surcharges, tolls encountered during your trip, cancellation and wait times if applicable, and booking fees` |
| `City fees`: `Fares pay for tolls, airport and other government-required charges, and other fees.` | `The cost of your trip depends on several factors, including the type of ride you request, tolls, the length/duration of the trip, and current demand.` |
| `Amount Uber keeps`: `We keep the difference between what a customer pays and what a driver earns on a trip, excluding tips, tolls, and certain fees, taxes, and surcharges.` | — |
| `Tips`: `You'll always receive 100% of your tips` | — |
| `Delayed ride guarantee`: `if a trip lasts longer than 5 minutes past the original estimated time, your fare will automatically increase` | — |

**`booking fees` is named to riders and never named to drivers.
`Amount Uber keeps` is disclosed to drivers and never to riders.** Each audience
is shown the fee the *other* audience is not told about. Neither has the full
picture, and both pages read as complete.

`Amount Uber keeps` as a section header is nonetheless a genuinely bold label —
plainer than "take rate", "service fee" or "commission", and the sentence beneath
it is a single clause with a four-item exclusion list rather than a percentage.
Disclosing the mechanism while withholding the number is a deliberate midpoint.

### (e) Legal and eligibility disclaimers `[observed]`

- California carve-out: `Uber Pool riders in California pay the price shown before
  the trip.` … "the final price is based on the driver's actual time and distance"
- Reserve price lock ¹: `Your upfront price may change due to factors such as
  adding stops, updating your destination…`
- Reserve, the hardest concession ²: `Uber doesn't guarantee that a driver will
  accept your ride request.` — on the page whose H1 is
  `Lock in a little peace of mind with Reserve`
- Promo terms: `Maximum savings of $8. Promotion expires 14 days after signup.` ·
  `Promotion does not apply to surcharges, government fees, tolls, or tips`
- Teen eligibility: `Must be at least 13 years old to hold an Uber for Teens account.`
- Sitewide hedge: `The material provided on this web page is intended for
  informational purposes only and may not be applicable in your country, region, or
  city.` and `Certain requirements and features vary by country, region, and city.`
- Safety-feature hedge: `Certain features vary by region and may be unavailable.`
- Background screening: "this background screening may include your entire adult
  history, beginning at the age of 18." · `Annual driving history reruns do not apply in NYC.`
- Insurance: `at least $1 million in liability insurance on behalf of drivers once
  a ride is accepted` · `Uber does not maintain UM/UIM for rideshare in every state.`
- Screenshot hedge: `Screenshots may differ from your in-app experience.`
- Earnings hedge: `Material provided on this page is for informational purposes
  only and does not guarantee earnings.`; heatmap footnote "it doesn't guarantee
  trips, earnings, or wait times."
- Employment status (legal footnote): `Drivers and delivery people are not agents
  (actual, ostensible, or otherwise) or employees of Uber. They are independent
  third-party providers.`
- `Trip Radar` availability: `available in most US markets, excluding NYC, Oregon,
  and Washington State.`
- WAV: `Uber WAV is only available in select markets.` and the obligation
  `Drivers are expected to accommodate riders using walkers, canes, folding
  wheelchairs, or other assistive devices.`

**`Uber doesn't guarantee that a driver will accept your ride request.` is the
most important disclosure in this set**, because it undercuts the premise of the
product it sits on. Reserve sells certainty; the footnote concedes the one thing
that cannot be guaranteed. It is correctly placed (a footnote on the page making
the claim) and correctly worded (flat, no hedging of the hedge).

## T11 Help-centre architecture

**`[absent]` — blocked.** https://help.uber.com/ and a deep article URL both
returned empty bodies. The help centre is fully client-rendered; no category tree,
article list or navigation labels are recoverable by fetch.

What is recoverable from outbound links on the marketing pages:

- The two-audience split is in the URL structure: `help.uber.com/riders/…`
  (plus `/riders/section/…`) and `help.uber.com/driving-and-delivering/…`
  (plus `/driving-and-delivering/article/…`). **Drivers and couriers share one
  path segment; riders have their own.**
- The driver chat entry point carries a `chatNodeId` parameter, exposed behind the
  CTA `Submit your question`
- Four different link labels point at it: `Help` (nav), `Visit Help Center`
  (footer), `Go to the Help Center` (driver FAQ), `Submit your question` (driver chat)

Article titles are listed in T7 with an explicit caveat about provenance.

## T12 FAQs

**The register split is visible in the question grammar itself.**

**Rider questions are overwhelmingly `Can I …?`** — permission-seeking `[observed]`

`/ride/`: `Can I have a lost item delivered to me?` · `Can I rent a car using Uber?` ·
`Can I request a ride that picks up friends in different locations?` ·
`Can I request a taxi on Uber?` · `Is there an Uber ride option for 5 people?`

`/ride/how-it-works/` (`Top questions from riders`):
`Can I schedule a ride in advance?` · `How do I request a ride for a friend?` ·
`What makes a 5-star rider, according to drivers?` ·
`Can I add extra stops to my ride?` · `How are prices calculated?`

`/uberwav/`: `Is my service animal allowed in the car with me?` ·
`Can I bring companions on an Uber WAV trip with me?` ·
`Can I request an Uber WAV trip for a family member or friend?`

`/airports/`: `How much will my airport ride cost?` ·
`What vehicles are available for airport trips?` ·
`Will all of my luggage fit in the car?` ·
`At what point after I've landed should I request a ride?` ·
`How long will my driver wait for me at the airport?`

**Driver questions are `How do I …?` / `What should I do if …?` — procedure-seeking,
plus a category riders never get: `What is my …?`** `[observed]`

`/drive/`: `Can I drive with Uber in my city?` ·
`What are the requirements to drive with Uber?` · `Is the Uber platform safe?` ·
`Do I need my own car?`

`/drive/basics/`: `How do I know when I'm ready to take my first trip?` ·
`Can I practice before taking a real trip?` ·
`How do I access my earnings after taking trips?` ·
`What should I do if I have a bad experience with a rider?` ·
`What should I do if a rider leaves something in my car?`

`/drive/how-much-drivers-make/`: `How do I view my earnings?` ·
`How do I cash out what I've earned from driving with Uber?` ·
`How can I increase my earnings as a driver?` ·
`How much of what a rider pays does Uber keep?`

`/drive/driver-app/`: `What is my acceptance rate?` · `What is my cancellation rate?` ·
`How do I find new opportunities to earn?` ·
`What devices are compatible with the Driver app?`

**`What is my acceptance rate?` and `What is my cancellation rate?` have no rider
equivalent, because riders are not scored in a way they can be asked to manage.**
The `What is my …?` shape is the grammar of a person asking about a number held
about them. It is the clearest linguistic marker of the asymmetry in the
relationship.

Note `What makes a 5-star rider, according to drivers?` — the one rider FAQ
written from the driver's point of view, and the only place on the rider estate
where the driver is given evaluative authority.

**Accordion labels as micro-IA** `[observed]`:
Driver ratings: `A 2-way system` · `High and low ratings` · `Knowing your rating` ·
`Rider unpairing` · `Ratings protection`
Accessibility: `Safety features` · `Resources for users who are blind or have low
vision` · `Traveling with a service animal` · `Features for drivers who are deaf or
hard of hearing (HOH)` · `Using wheelchairs and mobility devices` ·
`Earning on the platform` · `Learn about Uber's web accessibility strategy` ·
`Need more support?` · `Request a waiver or refund for a wait time fee`

The accessibility accordion is the only place on the site where rider-facing and
driver-facing items (`Earning on the platform`, `Features for drivers who are deaf
or hard of hearing`) sit in a single list — disability is the one topic Uber
declines to split by audience.

## T13 Terminology & glossary

**Ride products** `[observed]`, from the WAV carousel and driver basics:
`UberX` · `UberXL` · `Uber Comfort` · `Uber Black` · `Uber Black SUV` ·
`Uber Premier` · `Uber Premier SUV` · `Uber Electric` · `UberX Share` ·
`Uber WAV` · `Uber Pet` · `Uber Moto` · `Uber Taxi` · `Uber Transit` ·
`Uber Intercity` · `Hourly` · `Bikes` · `Scooters` · `Auto` · `Autonomous` ·
`Uber Reserve` · `Uber Rent` · `Uber Assist` · `Uber Car Seat` · `Uber Lite`

`Uber Green` and `Share` as standalone tier names are `[absent]` — Uber uses
`Uber Electric` and `UberX Share`, though `ubergreen` survives as a URL slug.

**Branded concepts** `[observed]`: `Uber One` · `Uber Cash` · `Uber for Business` ·
`Uber for Teens` · `Greenlight Hubs` · `Uber Pro` · `Uber Pro Card` ·
`Instant Pay` · `Earnings Hub` · `Quest` · `Boost+` · `Trip Radar` ·
`Exclusive requests` · `Destination Mode` · `Driving Insights` · `Work Hub` ·
`Opportunities` · `Women Preferences` · `Women Rider Preference` ·
`Rider Rating Preference` · `Driver Profiles` · `Switch Rider` · `Only on Uber` ·
`Delayed ride guarantee`

**`Uber Marketplace Platform`** is the legal-register name for the company,
used throughout the Community Guidelines. Three names for one entity across three
registers: `Uber` (marketing), `the Uber app` (product), `Uber Marketplace
Platform` (legal). The legal name exists so that "losing access to the platform"
can be scoped precisely (`all or part of`).

**Driver metric vocabulary, which has no rider counterpart** `[observed]`:
`acceptance rate` · `cancellation rate` · `rider unpairing` · `ratings protection` ·
`session summary` · `weekly statement` · `fare breakdown` · `Amount Uber keeps`

**Paired renamings — the sharpest terminology artefact in the corpus** `[observed]`

Three safety features have **deliberately different names on each side of the same
mechanism**:

| Mechanism | Rider name | Driver name |
|---|---|---|
| Share live trip with chosen contacts | `Share My Trip` | `Follow My Ride` |
| 4-digit code required to start the trip | `Verify Your Ride` | `PIN verification` |
| In-trip recording | `Audio Recording` / `Record Audio` | `Record My Ride` |

The pattern is consistent and it is about **whose ride it is**. The rider's
possessive attaches to the *trip* (`Share My Trip`); the driver's attaches to the
*ride as a thing they are performing* (`Follow My Ride`, `Record My Ride`). And
`Verify Your Ride` (rider — an assurance) becomes `PIN verification` (driver — a
procedure), losing the possessive entirely, because for the driver it is a step,
not a reassurance.

The practical consequence is worth flagging: a rider and a driver discussing the
same feature mid-trip do not share a word for it.

## T14 Voice, tone & accessibility

**Three registers, cleanly separated** `[observed]`

| Register | Evidence |
|---|---|
| **Rider** — second person, reassurance-led, sensory. Costs stated as what you *avoid*. | `Sit back and relax` · `Peace of mind on every ride` · `Lock in a little peace of mind` · `so you can sit back and enjoy the trip` · `to avoid wait-time fees` |
| **Driver** — second person, autonomy- and control-led, quantified. Costs stated as what you *earn*. | `Drive when you want, make what you need` · `Earn on your own schedule` · `you decide when and how often you drive` · `you'll earn extra for longer wait times` |
| **Legal** — third person, platform-neutral, with occasional first-person-plural advocacy. | `Uber Marketplace Platform` · `may result in the loss of access` — but also `Uber is an anti-racist company.` and `Uber has a no-sex rule regardless of whether you know the person or they give you their consent.` |

**The two legal outliers are the most striking strings in the harvest.**
`Uber is an anti-racist company.` and `Uber has a no-sex rule…` break the
third-person register completely: subject-verb-complement, four and six words of
content respectively, no hedging, no cross-reference. In a document otherwise
written to be enforceable, two sentences are written to be *remembered*. The
no-sex rule sentence goes further and pre-empts the two defences anyone would
offer (prior acquaintance, consent) inside the same sentence as the rule.

**The one string identical across both audiences**: `Your safety drives us.` —
used on `/safety/`, `/ride/safety/` and `/drive/` alike. Safety is the only topic
where Uber refuses to split the register.

**Accessibility statement — six named principles** `[observed]`
(https://www.uber.com/us/en/about/accessibility/)

`Independence` · `Safety` · `Dependability` · `Fairness` · `Choice` · `Compliance`

Listing `Compliance` sixth and last, after five experience principles, is the
correct ordering and an implicit statement that compliance is the floor.

- Opening claim: "we're building the world's most accessible mobility and delivery platform"
- `We proactively build, test, and resolve barriers to meet WCAG 2.1 Level AA guidelines.`
- `Uber's web and mobile platforms are accessible to VoiceOver and TalkBack.`
- Legal obligation stated as a fact about drivers, not a request:
  `By law, people earning on the Uber platform must transport riders who are
  traveling with service animals.`
- Driver-side inclusion, which most accessibility statements omit:
  `Hundreds of thousands of drivers with disabilities earn with Uber, using
  adaptive vehicles, hearing aids, and more.`
- The concrete remedy: `Riders with a disability can request a refund or waiver of
  wait time fees if their disability impacts their ability to board a vehicle
  within a few minutes of the driver's arrival`

That last one is the model. A named fee, a named condition, a named remedy, and
the condition is stated in terms of the *effect* on boarding rather than in terms
of a diagnosis or a proof requirement.

**WAV content** `[observed]` (https://www.uber.com/us/en/ride/uberwav/):
`Fast, flexible rides` — "request a ride on demand that works around your life,
not the other way around"; `Trips that fit your budget` — "The price of a WAV ride
in the Uber app is comparable to UberX, our basic ride option."; `Specialized
drivers to assist you` — every WAV driver "has completed a certification course
offered by a third party to help you enter and exit the vehicle." Carousel
one-liner: `Ride assistance for seniors and people with disabilities`.

Pricing parity stated explicitly (`comparable to UberX`) is the most useful
sentence on the page — it pre-empts the assumption that an accessible vehicle
costs more.

**Accessibility mechanics observed** `[observed]`

- `Skip to main content` (target `#main`) on all 15 pages
- The two-sentence date-picker keyboard instruction (T5)
- **Alt text quality is high and functional.** Examples:
  "A mosaic tile showing 4 people of different lived experiences… a woman walking
  through a pedestrian crosswalk with a white cane and a guide dog." App
  screenshots carry alt text that doubles as a UI transcript — which is the only
  reason the T6 driver state machine could be reconstructed at all. This is the
  best alt-text practice in the corpus to date.
- Carousel position indicators render as visible text (`1/3`, `1 / 3`) — **two
  formats of the same indicator**
- Icon accessible names exposed as text: `Chevron down`, `Chevron left small`,
  `Arrow Left`, `X small`, `Globe`, `Calendar`, `Clock`, `open`, `Play Video`

**Negative findings, recorded honestly**

- Four labels for the help centre: `Help`, `Visit Help Center`,
  `Go to the Help Center`, `Submit your question`
- Three labels for the Community Guidelines: `Review Community Guidelines`,
  `See Community Guidelines`, `Our Community Guidelines`
- `Download the Driver app` vs `Download Uber's Driver app` — apostrophe variant
  across three pages
- `cancelling` and `canceling` both appear in rider help-article titles
- `Upfront Fares` (driver, capitalised product) vs `upfront price` (rider,
  lowercase description) — the same mechanism, different grammatical status
- The driver-app page states `3 main stages` and renders four cards
- `1/3` and `1 / 3` as carousel indicators
- `No results` is the only authored empty state in server HTML, and it offers no
  recovery
- The rider is never given a name for the trip state they are in, and never given
  an explanation of surge

---

## Transferable patterns

1. **Interpolate the contract into the state button.** `Start UberX` /
   `Complete UberX` rather than "Start trip" / "Complete trip", because the fee
   rules differ by product. Where a state transition has different financial
   consequences per variant, name the variant in the control.
2. **Pair the wait state with a visible timer when the wait is billable.**
   `Waiting for rider` + `1:30`. If a duration will become money, show the duration.
   The rider side of the same moment shows neither, and that is the gap.
3. **Vague cause, specific effect.** RideCheck: `anything out of the ordinary`
   (deliberately opaque, so it cannot be gamed) → `we'll reach out to provide you
   with the resources you need to get help` (entirely concrete). Use wherever
   detection logic must stay private but the response must be trusted.
4. **State the condition before the request, in the user's first person.**
   `I have a disability, how do I request a wait time fee refund or waiver?`
   Findability and dignity in one title.
5. **Order eligibility before paperwork before process.** The driver signup cards
   run `Requirements` → `Documents` → `Signup process`, letting the reader
   disqualify themselves at card one.
6. **Let a footnote undercut the page's own claim when it must.**
   `Uber doesn't guarantee that a driver will accept your ride request.` on the
   page headed `Lock in a little peace of mind`. Flat, unhedged, correctly placed.
7. **Name the accommodation by its effect, not by proof.** The wait-time waiver is
   conditioned on the disability "impact[ing] your ability to board a vehicle
   within a few minutes" — an effect test, not a documentation test.
8. **Negative lesson — do not let the two sides of a marketplace diverge on
   thresholds.** The 2-minute and 5-minute windows are identical for both
   audiences, but the driver is given the numbers and the rider is given
   `depending on the circumstances`. The party who pays should be told at least as
   precisely as the party who is paid.
9. **Negative lesson — an unexplained mechanism will be assumed to be unfair.**
   Uber sells `No surges or spikes.` to riders and never explains surge to them.
   Selling the absence of a thing you refuse to describe teaches the user that the
   thing is indefensible.
10. **Negative lesson — do not rename a shared feature per audience.**
    `Share My Trip` / `Follow My Ride` means a rider and a driver cannot discuss
    the same control mid-trip. The register instinct is right; the consequence at
    the point of use is not.

## Caveats & gaps

- **`help.uber.com` is entirely unreachable.** Both the root and a deep article URL
  returned empty bodies (client-rendered shell). The help-centre category tree,
  article list, article bodies, and all rider and driver self-service routing are
  `[absent]` from this harvest. This was expected and is recorded rather than
  worked around.
- **Nine help-article titles in T7 come from a WebSearch index restricted to
  uber.com and were never opened.** They are recorded as titles only and are
  explicitly flagged in place. No claim in this file depends on their content.
- **All trip-state strings are reconstructed from marketing pages and from image
  alt text on `/drive/driver-app/`**, not from the app. Where a string is quoted
  from alt text it is marked `[observed]`, because the alt text is live page
  content — but it is a *description* of a screen, not the screen. A reader should
  treat `You're offline.`, `Waiting for rider`, `Arrived at dropoff` and
  `No rating yet` as high-confidence but not first-hand.
- **No rider-side state labels were found at all.** `cancelled`, `no-show`,
  `matched` and `driver arrived` are `[absent]` as rider-facing strings. It is
  possible they exist in the app; nothing on the public web shows them.
- **`/us/en/airports/` was oversized** (~83,000 chars, mostly a global airport
  link directory). The content-bearing head of the page was read directly, so the
  airport strings quoted are genuine; the remainder is a link list.
- **No rider-facing surge explainer, cancellation-fee page, or fare-dispute page
  exists on www.uber.com.** All of that content lives on the blocked help centre.
- **Locale is en-US only**, and much of the fee and insurance content is explicitly
  state-varying. The Community Guidelines were served for the `United States`
  jurisdiction; other jurisdictions have separate documents.
- **Uber Eats, Freight, Health and Business surfaces were not harvested** — only
  the rides two-sided marketplace.
- **Mobile app store listings and in-app copy not harvested.**
- The Community Guidelines carry `Last modified: 8/11/2025`; no other page in the
  harvest carries a date.

## Sources

1. https://www.uber.com/us/en/ride/
2. https://www.uber.com/us/en/ride/how-it-works/
3. https://www.uber.com/us/en/drive/
4. https://www.uber.com/us/en/safety/
5. https://www.uber.com/us/en/ride/safety/
6. https://www.uber.com/us/en/drive/safety/
7. https://www.uber.com/us/en/ride/how-it-works/upfront-pricing/
8. https://www.uber.com/us/en/drive/basics/
9. https://www.uber.com/us/en/about/accessibility/
10. https://www.uber.com/us/en/ride/uberwav/
11. https://www.uber.com/us/en/drive/how-much-drivers-make/
12. https://www.uber.com/us/en/legal/general-community-guidelines/
13. https://www.uber.com/us/en/drive/driver-app/
14. https://www.uber.com/us/en/airports/ (oversized; content-bearing head read)
15. https://www.uber.com/us/en/ride/how-it-works/reserve/

**Blocked:** https://help.uber.com/ (empty body, client-rendered) ·
https://help.uber.com/riders/article/cancellation-fees-explained (empty body)
