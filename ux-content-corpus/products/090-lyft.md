# 090. Lyft

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Ride-hailing (US and Canada) — two-sided marketplace plus bikes, scooters, healthcare and business travel |
| Primary URL | https://www.lyft.com/ |
| Corpus rank | 090 |
| Benchmark strength (source list) | Safety and ride status |
| Locale / market observed | en-US, with Canadian carve-outs quoted throughout (`There are no wait time fees in Canada.`) |
| Platform observed | Web (desktop): marketing, safety hub, full multi-audience help centre at help.lyft.com |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | `CPUC ID No. TCP0032513-P` in the footer; California minimum-earnings guarantee (`At least 120% of the applicable minimum wage for booked time` + `An additional 37 cents per booked mile`); New York paid safety-education requirement; `Service Animal Policy` with a dedicated Canadian appeal route; state and provincial availability carve-outs on nearly every safety feature; `Your Privacy Choices` (CCPA) |
| Harvest date | 2026-09-21 |
| Pages inspected | 34 retrieved; **0 blocked** |
| Harvest completeness | Full for the public surface. Both www.lyft.com and help.lyft.com render server-side and were entirely readable. The only partial is the Women+ Connect FAQ, whose accordion answers are injected client-side — questions captured, answers not. All in-app ride-state strings are `[documented]` inside help articles, never `[observed]` live |

## Pages inspected

| # | Label | URL |
|---|---|---|
| 1 | Homepage | https://www.lyft.com/ |
| 2 | Rider landing | https://www.lyft.com/rider |
| 3 | Driver landing | https://www.lyft.com/driver |
| 4 | Safety overview | https://www.lyft.com/safety |
| 5 | Rider safety | https://www.lyft.com/safety/rider |
| 6 | Driver safety | https://www.lyft.com/safety/driver |
| 7 | Community Guidelines | https://www.lyft.com/safety/community-guidelines |
| 8 | Women+ Connect | https://www.lyft.com/women+ |
| 9 | Accessibility Statement | https://www.lyft.com/accessibility |
| 10 | Help centre index | https://help.lyft.com/hc/en-us |
| 11–12 | Rider / driver category trees | `/categories/2872191865-riding-with-lyft`, `/categories/4103285858-driving-with-lyft` |
| 13–14 | `Ride issues` — rider and driver | `/sections/4177377071`, `/sections/6575764617` |
| 15–16 | `Charges and fees` / `Giving a ride` | `/sections/3387177978`, `/sections/5416175501` |
| 17 | Ride types | `/sections/9369125120-ride-types` |
| 18–19 | `Safety guidelines and policies` — rider and driver | `/sections/4611287758`, `/sections/9222429287` |
| 20–21 | **Cancellation policy — rider and driver** | `/articles/115012922687…`, `/articles/115012922847…` |
| 22–23 | Ride pricing / driver pay | `/articles/115012925707`, `/articles/115013080008…` |
| 24 | Report a safety incident or citation | `/articles/115013077888…` |
| 25 | Wait time fees | `/rider/articles/4648302623-Wait-time-fees` |
| 26 | Ride types overview | `/articles/115012927427-Lyft-ride-modes-overview` |
| 27 | How to request a ride | `/articles/115013079988…` |
| 28–29 | Safety info — riders and drivers | `/articles/7229653855…`, `/articles/115012927647…` |
| 30 | WAV rides | `/articles/115013081668-wav-rides` |
| 31–32 | **Lost & found — rider and driver** | `/articles/115012922987…`, `/articles/115013079968…` |
| 33–34 | Deactivations / appeals | `/all/articles/7366276697…`, `/all/articles/5354487457…` |

Full URLs in Sources. **No page was blocked.**

---

## T1 Navigation & IA labels

**The audience switcher *is* the global nav** `[observed]`

`Driver` · `Rider` · `Business` · `Log in` · `Sign up`, plus locale toggle `EN` and
a floating `Get a ride` CTA.

`Driver` and `Rider` are sibling top-level items — no `Earn`-style parent, no
nesting. Lyft treats the two sides as peers in the IA, and the hover submenus are
near-identical shapes:

| Under `Rider` | Under `Driver` |
|---|---|
| `Cities` · `Business rides` · `Help` | `Earnings` · `Cities` · `Help` |

The only difference is `Business rides` vs `Earnings` — each audience's money
concern, in the same slot.

**Driver precedes Rider on safety, and only on safety** `[observed]`

The persistent safety sub-nav (with a `SAFETY` breadcrumb badge) reads
`Overview` · `Driver` · `Rider` · `Community Guidelines` · `Rider Verification` —
inverting the global nav's `Driver` · `Rider`… no, matching it. But note the
global footer orders the columns `Driver` / `Rider` / `Lyft`, while the global nav
also leads with `Driver`. **Lyft's IA consistently puts the driver first**, which
is unusual for a consumer marketplace and is a visible supply-side priority.

**Footer — three columns by audience, then a company column** `[observed]`

- `Driver`: `Become a Driver` · `New Driver Guide` · `Earnings` · `Cities` ·
  `Help` · `Safety` · `Application Requirements` · `Express Drive` · `Bonus` ·
  `Lyft Rewards` · `Insurance` · `Black Car Fleets` · `Driver Blog` · `Beta Program`
- `Rider`: `Sign up to ride` · `Lyft Pink` · `Cities` · `Help` · `Safety` ·
  `Business Profile` · `Rewards` · `Events` · `Airports` · `Gift Cards` · `Donate`
- `Lyft`: `Careers` · `Lyft Up` · `Business` · `Healthcare` · `Bikes` ·
  `Scooters` · `Autonomous` · `Lyft Ads` · `Venue Partnerships` · `Developers` ·
  `Lyft Blog` · `Press` · `Investor Relations`
- Legal strip: `Terms` · `Privacy` · `Accessibility Statement` ·
  `Your Privacy Choices` · `© 2026 Lyft, Inc.` · `CPUC ID No. TCP0032513-P`
- App links: `Lyft driver app` · `Lyft rider app`

The driver column has **14 items to the rider's 11**, and includes `Insurance`,
`Application Requirements` and `Beta Program` — operational concerns with no
rider equivalent. `Safety` and `Help` appear in *both* audience columns, pointing
to different destinations. The IA never asks the user to disambiguate themselves;
it duplicates the item under each audience.

**Help centre — a three-audience root plus a fourth tree** `[observed]`
(https://help.lyft.com/hc/en-us, H1 `How can we help you?`)

| Grouping | Contents |
|---|---|
| `Popular articles` | — |
| `Lyft Help` | `Driving with Lyft` · `Riding with Lyft` · `Applying to drive` |
| `Lyft Business Help` | `All Lyft Business Help` · `Portal and program admins` · `Concierge coordinators` · `Riders in business programs` |
| `All help topics` | `Profile and account` · `Using the app` · `Earnings and bonuses` · `Safety, policies, and accessibility` |

**`Applying to drive` as a third top-level audience door is the standout IA
decision.** The prospective driver is neither a driver nor a rider, has a
completely different question set (requirements, documents, application status),
and is given their own tree rather than a section inside the driver tree. Most
marketplaces bury acquisition support inside the supply-side help centre.

The `Lyft Business Help` tree adds a fourth and fifth audience
(`Portal and program admins`, `Concierge coordinators`) plus a hybrid
(`Riders in business programs`) — someone who is a rider but under an
organisation's rules.

**Audience is a URL path segment** `[observed]`: `/hc/en-us/categories/…` silently
redirects to `/hc/en-us/rider/categories/…` or `/hc/en-us/driver/categories/…`.
The routing is structural, not editorial.

**The IA skeleton is duplicated, not shared** `[observed]`. Both trees contain
sections named `Profile and account`, `Using the app`, `Ride issues` and
`Safety, policies, and accessibility` — but they resolve to **different section
IDs with different article sets**. `Ride issues` exists twice
(rider `4177377071`, driver `6575764617`) with **zero shared articles**.
`Safety guidelines and policies` exists twice with six of nine articles shared.

This is the deliberate cost Lyft has accepted: a parallel IA doubles the
maintenance surface but guarantees that no user is ever shown the other audience's
content. The one place it leaks is the shared-article problem in T11.

## T2 Value proposition & headline patterns

**The two heroes are about different things entirely** `[observed]`

| Surface | Hero |
|---|---|
| Homepage | `The world awaits` — "No matter where you're headed, we'll help you get there." |
| Rider | `One app. All the rides.` |
| Driver | `Make every day payday` |

Rider copy is **possibility-framed**; driver copy is **money-framed**. The
homepage hero (`The world awaits`) is rider-voiced despite being a dual-audience
page — the driver is addressed only in the section header
`Shift into earnings mode`.

**Section headers, rider** `[observed]`: `Places to be, people to see` ·
`Your ride, refined` · `How you get there is up to you` ·
`Choose how to ride` · `Rewards that keep rewarding` · `Rides for older adults` ·
`Got plans? We got you.` · `Your airport ride. Your way.` (repeated three times,
once per airport ride type) · `More mobility, more accessibility` ·
`The gift that always gets there on time`

**Section headers, driver** `[observed]`: `No waiting, just earning` ·
`Boost your pay with bonuses` · `Start your engines and your earnings` ·
`Give rides. Earn points. Score rewards.`

Every driver header contains a money noun or verb. Not one contains a safety word
— **the driver landing page carries zero safety messaging above the fold**, while
the rider page has a dedicated safety module headed `Got plans? We got you.`

**Safety headlines are the one place the two registers are consciously designed
against each other** `[observed]`

| Page | Headline |
|---|---|
| `/safety` | `We're committed to being the safest way to get around` |
| `/safety/rider` | `Committed to getting you there safely, every time` |
| `/safety/driver` | `We've got your back on every drive` |
| `/safety/community-guidelines` | eyebrow `Community guidelines`, H1 `How we share the ride.` |
| `/women+` | eyebrow `Women+ Connect`, H1 `Rides for women, by women` |

**Rider safety is *delivery* (`getting you there safely`); driver safety is
*alliance* (`we've got your back`).** The rider is promised an outcome; the driver
is promised a partner. That distinction is correct and load-bearing: the rider's
risk is being transported by a stranger, the driver's risk is being alone with
one. Lyft has written to each risk.

`How we share the ride.` is the best headline in the file — three words that name
the product's actual social contract, with a full stop that makes it a statement
rather than a topic.

**The always-on / customizable axis, repeated verbatim across all three safety
pages** `[observed]`

`Always-on safety to help protect you on the road` /
`…on every ride` / `…on every drive`, each paired with
`Customizable safety tools at your fingertips` /
`…that put you in control` / `…for extra peace of mind`.

One rhetorical structure, three audience-tuned variants. The move is consistent:
**Lyft does the invisible work; the user retains agency.** This is the single most
reusable framing in the safety corpus — it lets a company claim credit for
background protection without implying the user is passive.

## T3 CTA inventory

| CTA (verbatim) | Audience | Notes |
|---|---|---|
| `Get a ride` | Rider | Floating header CTA → app deeplink |
| `Sign up to ride` | Rider | Hero + mid-page + paired on `/women+` |
| `Start your journey` | Rider | ×3, once per airport ride type |
| `See our safety features` | Rider | Named destination, not `Learn more` |
| `Join Lyft Pink` / `Join now` | Rider | Two labels, one product |
| `Send a gift card` | Rider | |
| `Apply to drive` | Driver | Hero, form submit, and paired on `/women+` |
| `Learn how earning with Lyft works` | Driver | Fully specific |
| `Learn about bonuses` | Driver | |
| `Apply here` | Driver | Bare — the weakest driver CTA |
| `Get started today` / `Explore solutions` | Business | |
| `Download the rider app` / `Download the driver app` | Both | Audience named in the button |
| `Scan the QR code to download.` | Both | Instruction punctuated as a sentence |
| `Contact Us` | Both | Universal help-page footer |
| `Dispute ride fare or charges` | **Rider only** | Self-serve dispute rail |
| `Submit feedback on driver` | **Rider only** | |
| `Report an accident` · `Report a citation` | Driver | `Report a citation` is driver-only |
| `Drivers can report a safety concern here` / `Riders can report a safety concern here` | Both | **Two CTAs on one page, different ticket-form parameters** |
| `Get started` | Rider | Lost-phone flow |
| `Skip to Content` | Help centre | vs `Skip to main content` on www — see T14 |
| `Back to top` | Help centre | Repeated at each section |

**The asymmetry worth recording.** Rider help pages carry a persistent
"Get help for a ride" module with `Dispute ride fare or charges` and
`Submit feedback on driver`. **The driver equivalents have no such module** —
drivers get only the generic `Contact Us`. Riders are given self-serve dispute
rails; drivers are routed to a queue. That is a support-economics decision
rendered as a missing component, and it is visible on the public surface.

The split-audience CTA pair on the incident-reporting page
(`Drivers can report a safety concern here` / `Riders can report a safety concern
here`) is the correct handling of a shared page: rather than asking the user to
self-identify in a form, the page forks at the button and passes the audience
through as a parameter.

## T4 Onboarding & getting-started

**Rider — request a ride, 4 steps, each naming a literal control** `[documented]`
(https://help.lyft.com/hc/en-us/articles/115013079988-How-to-request-a-ride)

1. `Tap 'Search destination' and enter your drop-off location`
2. `Select your preferred ride type.`
3. `Tap 'Select Lyft'`
4. `Confirm or change your pickup location before tapping 'Confirm and request'`

Every step quotes the exact button string in single quotes. Step 4 is the
important one: it inserts a **verification beat before the irreversible action**,
and phrases it as `Confirm or change` — offering the correction path in the same
breath as the confirmation.

**Rider — request for someone else, 4 steps** `[documented]`:
`Set the rider's destination` · `Tap 'Change rider' at the top of the screen` ·
`Select a rider from your contact list` ·
`The rider will be notified a ride was sent to them`

Step 4 is not an instruction — it is a **statement of what happens to the third
party**. Telling the requester what the other person will experience, as the final
step, is a small and genuinely good pattern for any send-on-behalf-of flow.

**Driver — mark a no-show, 4 steps** `[documented]`
(https://help.lyft.com/hc/en-us/articles/115012922847…)

1. `Tap to arrive at the pickup location.`
2. `Wait for the timer to count down to 0:00 without moving from the pickup location.`
3. `Respond if the passenger contacts you.`
4. `Cancel the ride by tapping 'Passenger is no-show,' then tap 'Confirm no-show.'`

And the gate immediately after:
`Note: If you miss any of these steps, you won't be eligible for a cancel fee.`

Step 2 is the artefact: `without moving from the pickup location` is a behavioural
condition embedded in a UI instruction, because the app is measuring the driver's
position. Step 3 is an obligation with no UI at all. **This is a procedure with
eligibility consequences dressed as a how-to**, and the `Note:` makes the stakes
explicit.

**Driver — cancel a ride, 2 steps**: `Swipe up on the bottom panel.` /
`Tap 'Cancel,' and then select the option that fits your situation.`
**Rider — cancel a ride, 2 steps**: `Edit the ride` / `Tap 'Cancel ride'`

Same action, both two steps, and the rider version has no eligibility note.

**Driver onboarding has no numbered sequence.** `/driver` is a single
phone-number capture into `Apply to drive`. The steps live in the third help tree
(`Applying to drive`), with articles `How to apply to become a driver` and
`Check your application status`.

## T5 Form & field labels

**Only one input label exists on www.lyft.com** `[observed]`:
`Enter mobile phone number*` — the driver application on https://www.lyft.com/driver.
The rider has no public form at all; every rider CTA deeplinks into the app.

**In-app field and menu labels, quoted in help copy** `[documented]`

| Label | Context |
|---|---|
| `Search destination` | Rider destination entry |
| `Confirm and request` | Final request button |
| `Select Lyft` | Ride confirm |
| `Change rider` | Reassign the requester |
| `Import contacts` | |
| `Add gate details` | CTA on `the gray banner while waiting for your driver` |
| `pickup notes` | Free-text field for gate instructions |
| `Home` / `Work` | Saved address labels under `Settings` |
| `Wheelchair access` | Settings toggle |
| `Payment frequency` | Settings |
| `Add payment method` | |
| `Ride history` | Under `Account` |
| `Dispute ride charge` | `at the bottom of the screen` |
| `Support & Safety` → `Get Help` | Driver app menu path |
| `Support and Safety` → `Learning Center` | Driver app menu path — **`&` vs `and` in the same menu name across two articles** |
| `Ride Preferences` | Driver opt-out for Teen rides |
| `Driving History` tab | Driver earnings |

`Add gate details` deserves note. It is a CTA on a transient banner, with a stated
lifecycle: `This banner will disappear when the driver arrives at the gate.` Lyft
documents the *disappearance* of a UI element, which is the kind of thing users
otherwise assume they broke.

## T6 Ride status language — PRIORITY

All `[documented]` — quoted inside help articles describing app UI. Lyft's live
ride-state screens sit behind auth and no public page renders them.

### Driver side — imperative verbs the driver performs

| State | Verbatim | Source |
|---|---|---|
| Arrival | `Arrive` — "two minutes after you tap 'Arrive' in your app" | #23 |
| Pickup | `Pick up` — "the calculation starts when you tap 'Pick up.'" | #23 |
| Decline | `Manually declining a ride request by tapping the 'X' button` | #21 |
| No-show | `Passenger is no-show`, then `Confirm no-show` | #21 |
| No-show (variant) | `Passenger didn't show up`, then `Cancel ride` | #21 |
| Cancel | `Tap 'Cancel,' and then select the option that fits your situation.` | #21 |
| Queue | "the next ride in your queue is canceled" | #21 |
| Lost item | `A ride labeled 'Lost Item' means a passenger contacted you` | #32 |

**Two different no-show button strings appear in the same article** —
`Passenger is no-show` in the scheduled-rides section and
`Passenger didn't show up` in the general section. Either two surfaces or a live
inconsistency; recorded as a genuine artefact either way.

`A ride labeled 'Lost Item'` is notable: a returned item is modelled as a **ride
with a state label**, reusing the trip object rather than inventing a new one.

### Rider side — descriptive nouns for things that happen to you

| State | Verbatim | Source |
|---|---|---|
| Request | `Confirm and request` | #27 |
| Matching | `We'll match you with a driver in seconds` | #2 |
| Matched | `a driver has been matched` | #20 |
| En route | `The driver is on their way to pick you up.` | #20 |
| Arrived | `After your driver arrives.` / `your ride has arrived at the pickup location` | #20, #25 |
| Early arrival | `If a ride arrives early` | #25 |
| Waiting | `has been waiting for more than 2 minutes` | #25 |
| Scheduled window | `The driver is scheduled to arrive within the designated pickup window.` | #20 |
| Cancel | `Tap 'Cancel ride'` | #20 |
| In-ride grace | `You can cancel a ride within the first five minutes after pickup.` | #20 |
| End | `ask your driver to end the ride` | #27 |

### The register split, stated plainly

**The driver app names states as actions the driver performs
(`Arrive`, `Pick up`, `Confirm no-show`). The rider app names states as things
that happen to the rider (`a driver has been matched`, `your driver arrives`,
`your ride has arrived`).** The same physical moment — the car reaching the kerb —
is `tap 'Arrive'` to one party and `After your driver arrives.` to the other. One
is an active verb in the imperative; the other is a subordinate clause in a
sentence about a fee.

Drivers are agents of the state machine. Riders are recipients of it. And the
grammar carries the entire difference in agency without either party ever seeing
the other's wording.

**The noun asymmetry compounds it.** Rider documentation says `your driver`;
driver documentation says `your passenger` — never "your rider". Lyft has migrated
rider-facing content from `passenger` to `rider` (visible in the URL slugs: the
article rendering as `Cancel and no-show policy for riders` still lives at
`/articles/115012922687-Cancellation-policy-for-passengers`), but **the
driver-facing body copy still says `passenger` throughout.**

So: **riders are "riders" to riders, and "passengers" to drivers.** The rename
reached the audience being renamed and stopped at the boundary. Whether by design
or by incomplete migration, it is now the sharpest terminology artefact in the
corpus — the two sides of one marketplace do not use the same word for one of them.

`ride modes` → `ride types` is the same migration in progress: slugs
`Lyft-ride-modes-overview` and `sections/9880659127-ride-modes` render H1s
`Lyft ride types overview` and `Ride types`.

## T7 Error, failure & recovery — PRIORITY

**The verbatim error-condition list — the best of its kind in the corpus** `[documented]`
(#27)

> `You may receive an error message that your ride can't be requested if the following applies:`

- `Payment method needs updating`
- `Not enough funds to cover the ride cost`
- `No current drivers available in your area`
- `Your account is deleted/deactivated`
- `Connectivity issues within the app or your smartphone`

Five causes for one error, published pre-emptively, ordered from most-fixable to
least. The user who hits an opaque failure can diagnose themselves without
contacting support. Note the honesty of item 4 (`deleted/deactivated` — the app
will not tell you which) and item 5 (the fault may be the phone, not Lyft).

**Problem-article titles, by audience** `[observed]`

| Rider | Driver |
|---|---|
| `I left my phone in a vehicle` | `Picking up the wrong passenger` |
| `My driver's car photo doesn't match` | `I got a warning for too many cancels` |
| `I was charged a damage fee` | `I canceled the ride` |
| `Charged for a ride I canceled` | `How to report damage caused by passengers` |
| `Charged for a ride the driver canceled` | `Report an accident or collision` |
| `I'm unable to request a ride` | `Deactivations` |
| `Pending charges` · `Dispute a fee` · `Resolving charge issues` | `Appealing permanent deactivations` |
| `Fixing app issues` | `Express Drive maintenance and damages` |

**`Charged for a ride I canceled` and `Charged for a ride the driver canceled` are
two separate rider articles.** Splitting by *who cancelled* rather than filing one
"cancellation charges" article is exactly right — the user knows which happened,
and the remedies differ completely. The second title also quietly concedes that
being charged for a driver's cancellation is a real, documented occurrence.

`My driver's car photo doesn't match` is a safety-adjacent article filed under
ride issues rather than safety — findable where the user will look.

**Recovery framing is inverted between audiences** `[documented]`

| Rider | Driver |
|---|---|
| `We'll never charge you this amount.` (bold in source, #20) | `Note: If you miss any of these steps, you won't be eligible for a cancel fee.` (#21) |

**Riders are reassured; drivers are conditioned.** The rider's failure copy opens
with a money guarantee. The driver's opens with an eligibility gate. Same document
type, same event, opposite opening move.

**Deactivation — the driver-only failure mode** `[documented]` (#33, #34)

Warning first: `You'll receive a warning before being suspended or deactivated.`
Then a five-beat process in flat procedural voice:
`Your Lyft Driver account is flagged by a user or Lyft.` →
`The account is temporarily put on hold during review` →
`We let you know the final decision, either that you can continue driving or that
your account has been permanently deactivated.`

Reasons enumerated: `Missing driver documents` · `Background or DMV check issues` ·
`Safety concerns` · `Low ratings` ·
`Vehicle issues or vehicle doesn't meet age requirements` ·
`Fraud, such as engaging in payment fraud and/or scams, account sharing, or duplicate accounts`

**The counterweight sentence is the notable one**:
`Lyft actively reviews for suspicious or fraudulent rider reporting.` Placed
inside the deactivation article, it tells the driver that the accusation itself is
scrutinised. One sentence that materially changes how the rest of the page reads.

Appeals: `You may only request one appeal for a deactivation decision.` (bolded in
source) and `We'll keep the account deactivated if we uphold the decision.`
**`uphold` / `overturn` is legal register, used to drivers only** — nowhere in the
rider estate does Lyft adopt a quasi-judicial vocabulary.

**There is no consumer-rider deactivation article.** `Troubleshooting deactivated
rider accounts` exists only in the Business tree. Riders can be deactivated (it is
listed as an error cause in #27) but are given no public content about it.

**Driver cancel-reason inventory — the reasons Lyft supplies** `[documented]` (#21)

`You or a loved one has an emergency.` ·
`You feel unsafe completing the ride.` ·
`You've looked for your passenger, tried contacting them, and still can't see them.` ·
`Your passenger is under the age of 18 and not accompanied by an adult.` ·
`Your passenger didn't bring a car seat for their child.` ·
`There were too many passengers to fit in your vehicle.`

Six reasons, all written as **complete sentences in the driver's first person**,
covering emergency, safety, no-show, two policy violations and a capacity problem.
A reason picker written as sentences rather than labels is unusual and reads as
respectful — the driver selects a description of their situation, not a category.

Named Teen cancel reasons, quoted as literal UI strings:
`"I don't want to take a Teen ride"` · `"Teen is under 13"` ·
`"Other general Teen policy violation"`. The first is a pure preference with no
justification demanded, sitting alongside two compliance reasons.

## T8 Empty states

`[absent]` — no verbatim empty-state copy on any of the 34 pages.

The closest adjacent strings are unavailability messages rather than empty states,
and they are worth recording because Lyft handles unavailability well:

- `No current drivers available in your area` (#27)
- `If you don't see Wheelchair as a ride type, Wheelchair rides may not be available in your region.` (#30)
- `If Wheelchair rides aren't available in your area, we'll help you find local companies that provide WAV options.` (#30)
- `Wait & Save and Priority Pickups may not always be available, depending on how many drivers are nearby.` (#26)

The second and third are a matched pair: **name the absence, explain the cause,
then offer the off-platform alternative.** For an accessibility feature, routing
the user to a competitor rather than leaving them with a blank screen is the
correct and uncommon choice.

## T9 Notifications & system messages

Sparse but precise `[documented]` unless noted.

- **Smart Trip Check-In, rider**: `If we notice anything off about your ride, we'll contact you with Smart Trip Check-In to see if you need help.`
- **Smart Trip Check-In, driver**: the *identical* string on `/safety/driver` —
  one of very few places where rider and driver copy is byte-identical
- **Scheduled Check-In**: `We'll reach out after your ride and make sure you're alright.`
- **Emergency status**: `You'll be provided with real-time updates in the Lyft app with the status of your emergency request.`
- **WAV fallback**: "we'll send a text or a notification to let you know that the vehicle won't be a wheelchair-accessible vehicle"
- **Lost item, to driver**: `Lyft will notify the passenger via text and email about the lost item.`
- **Deactivation outcome**: `You'll receive confirmation of Lyft's decision via your email address on file.`
- **Driver cancel warning**: `Check the email linked to your Lyft account for more details.`
- **Gate banner, rider** `[observed]` as documented UI: `Add gate details` on
  `the gray banner`, with `This banner will disappear when the driver arrives at the gate.`
- **Site promo banner** `[observed]`: `New riders: get 50% off your first ride with code 50OFF1WB (up to $10 off). Terms apply*`
- **Rider partnership banner** `[observed]`: `Link your DoorDash account. Unlock savings with DashPass.`
- **SMS consent, driver form** `[observed]`: `Text HELP for help or STOP to cancel any time.`

`We'll reach out after your ride and make sure you're alright.` is the warmest
system-message string in the corpus. `alright` rather than "safe" or "OK" — a
word chosen for a person, not for a status field.

## T10 Disclosures & fees — PRIORITY

### Upfront pricing `[documented]` (#22)

`When you request a ride, Lyft shows an upfront price based on:` →
`Ride type and time` / `Traffic and driver availability`.
Then the bound: `This price may change if your route or destination changes.`

And a second, more specific list — `Your final price may differ if:`

- `You wait more than 10 seconds before requesting the ride`
- `You change destination or add stops`
- `Trip takes longer or shorter than estimated`
- `You add a tip`

**`You wait more than 10 seconds before requesting the ride` is the most
surprising disclosure in this file.** A ten-second quote expiry, stated plainly as
a condition the user controls. Most products would let the price silently refresh.

### Dynamic pricing — the term has been deleted

**`Prime Time` is `[absent]`.** It appears on none of the 34 pages. The mechanism
is now described only by euphemism:

- `Higher demand during rush hours, events, or bad weather may increase prices.` (#22)
- `may vary based on how busy it is` (#20, #22)
- `may vary based on demand` (#20)
- `Lock in a lower price when it's busy` (#26 — the `Wait & Save` pitch)

Compare Uber, which retains `surge pricing` for drivers and refuses to explain it
to riders. **Lyft has gone further and retired the name entirely for both
audiences.** The cause is now described (`rush hours, events, or bad weather`) but
the pricing behaviour has no name, which means a user cannot search for it, ask
about it, or recognise it as a policy. Naming a thing is a precondition for
complaining about it; unnaming it is a defensible commercial choice and a real
loss to the user.

### Fee taxonomy, defined term by term `[documented]` (#22)

| Term | Definition (verbatim) |
|---|---|
| `Base rate:` | `The amount that you pay to begin the ride based on your route, ride type, driver availability, and demand.` |
| `Tolls:` | `Covers any tolls encountered during your ride. Tolls are non-refundable.` |
| `Service fee:` | `Flat amount that varies by region.` |
| `Third-party fees:` | `Local charges such as rideshare taxes, surcharges, and airport fees.` |

Plus the justification — `The service fee helps support the Lyft Platform,
including operating costs and safety measures like insurance and background
checks.` — and the receipt promise: `Each of these fees appear on your ride receipt.`

`Service fee: Flat amount that varies by region.` is an almost-contradiction
(`flat` and `varies` in five words) that is nonetheless accurate: flat per ride,
varying by market. It reads badly and means precisely the right thing.

Justifying the service fee by naming what it buys (`insurance and background
checks`) rather than by calling it a platform fee is the reusable move — it links
a charge the rider resents to a protection the rider wants.

### Wait-time fees `[documented]` (#25)

> `Wait time fees help keep our platform running smoothly – try to be on time and
> ready to meet your ride at the pickup location.`

Trigger: `more than 2 minutes (5 minutes for Black and Black SUV)`.
Exclusions: `Lyft Access` / `Lyft Assisted` / `Car Seat rides`.
Geographic carve-out: `Note: There are no wait time fees in Canada.`
Interaction rule: `If your ride is canceled and you're charged a cancellation fee,
you won't be charged for wait time.`
Disability waiver: riders with `a valid waiver for disability` are
`exempt from wait time fees and will be refunded for previous wait time fee
charges upon request`.

The opening sentence is doing something specific: it states the *platform's*
reason for the fee, then converts it into advice to the user, in one sentence
joined by a dash. Rationale then instruction. The **retroactive refund** clause
(`refunded for previous wait time fee charges upon request`) is unusually generous
and is stated without conditions.

### Cancellation fee — the parallel corpus

| Rider (#20) — *you are charged* | Driver (#21) — *you are paid* |
|---|---|
| `More than 30 seconds after a driver accepts your ride.` | `You'll be paid a cancellation fee if a passenger cancels 1 minute or more after you've already started driving to pick them up.` |
| `More than 30 seconds after requesting a Wait and Save ride.` | Two-condition test: `The passenger's cancel window has passed.` + `You're still on track to arrive by your original estimated time of arrival.` |
| `After your driver arrives.` | Exclusion: `You won't be paid a cancellation fee if you are already giving a ride and the next ride in your queue is canceled.` |
| `3 or more rides in a 15-minute timeframe.` | |
| Justification: `These fees go towards compensating your driver for their time and gas, and may vary based on how busy it is.` | Justification: `Lyft uses cancel and no-show fees to make sure you're paid for your time and effort.` |

**One fee, two framings, two clocks.** To the rider it is a charge justified by
*the driver's costs* — `their time and gas`. To the driver it is a payment
justified by *the driver's worth* — `your time and effort`. The same person's
input is "gas" to one audience and "effort" to the other.

And the clocks do not match: the rider becomes liable at **30 seconds**; the
driver qualifies at **1 minute**. There is a 30-second band in which the rider is
charged and the driver is not paid. Neither page mentions the other's threshold.

**Lyft never tells the rider the fee is earnings; never tells the driver the fee
is a penalty.** Both statements are true, both pages are internally honest, and
neither audience can reconstruct the transaction.

### No-show fee — same treatment, different grammar

| Rider (#20) — passive, 3 items | Driver (#21) — imperative, 5 steps, gated |
|---|---|
| `You may be charged a no-show fee when your driver:` 1. `Arrived at your pickup location` 2. `Waited the required time or longer` 3. `Attempted to contact you (or you contacted them)` | `If your passenger isn't at the pickup location, you'll receive a cancel fee as long as you:` — then the five-step tap sequence, closed with `If you miss any of these steps, you won't be eligible` |

The rider version describes what the driver *did* — three past-tense facts that
establish the charge. The driver version prescribes what the driver *must do* —
five present-tense actions with a forfeiture clause. **The rider is told the
justification; the driver is told the procedure.**

### Lost-item fee — same event, inverted valence

| Rider (#31) | Driver (#32) |
|---|---|
| `A $20 return fee will be applied in-app to compensate the driver for their assistance with the return of your item.` | `Lyft values your time and effort. Drivers get paid $20 when they return a lost item to a passenger.` + `This fee is added to your earnings within 2-3 business days.` |
| Plus a liability disclaimer: "we do not procure insurance for, nor are we responsible for, personal belongings left in the car" | |

Same $20. The rider sentence leads with the charge and ends with the purpose; the
driver sentence leads with `Lyft values your time and effort` — an appreciation
statement placed *before* the number. The driver also gets the settlement timing
(`2-3 business days`); the rider gets a liability exclusion.

Privacy handling is shared and good: lost-item calls `use a third-party app so
both your phone numbers aren't visible`, and a Teen carve-out states
`For safety and privacy reasons, Teens are unable to contact drivers about lost
items directly.`

### Driver earnings disclosures `[documented]` (#23)

`In most regions, driver earnings are based on Upfront Pay.`
Rate-card components: `Base fare: the amount you earn for starting a ride` /
`Time: the amount you earn for every minute you drive` /
`Distance: the amount you earn for every mile you drive`

- Tips: `You receive 100% of your tips from passengers.` (and `You keep 100% of your tips` on the homepage — two phrasings)
- Payout: `Your earnings are automatically transferred to your bank account every Tuesday.`
- **Fee firewall**: `These fees don't impact the amount you earn, and won't be reflected in your 'Driving History' tab.`
- `Minimum fare` / `Maximum fare` defined, with
  `The Lyft app prevents passengers from requesting a ride if it would exceed the maximum fare.`
- California guarantee: `At least 120% of the applicable minimum wage for booked time.`
  plus `An additional 37 cents per booked mile.`, over `every 14 days`

The **fee firewall** sentence is the most important driver disclosure Lyft
publishes: it pre-empts the assumption that rider-side fees are deducted from
driver pay, and it names the exact screen (`'Driving History' tab`) where the
driver would otherwise go looking for them.

Notably, **Lyft does not publish a take-rate disclosure** anywhere in this
harvest. There is no equivalent of Uber's `Amount Uber keeps`. The fee firewall
sentence explains that fees do not reduce driver pay without stating what
proportion of the fare Lyft retains.

### Pending charges `[documented]` (#20, #22)

`A Lyft transaction marked as 'pending' isn't a charge.` ·
`'Pending' transactions are temporary authorizations from the Lyft app to make
sure your payment method works.` ·
"the temporary authorization will either disappear completely or show as a refund
within 5-7 business days."

Leading with the negation (`isn't a charge`) before explaining what it is, is the
correct order for a state users routinely misread as a double charge.

### Legal and eligibility disclaimers `[observed]`

- `*Availability of bikes, scooters, and ide types varies by region.` — **typo
  `ide` present on the homepage**, corrected to `ride types` on `/rider`
- `*All offerings subject to availability.`
- `*ADT is limited to the US only.`
- `*Pin Verification is only available in select markets`
- `**Video Recording is available to drivers in US regions`
- `**Audio Recording is not available in Canada regions.`
- `**Favorite a driver is only available in select markets where scheduled rides are available.`
- `While RapidSOS Live Agent is not available in Puerto Rico, the 911 feature is still available.`
- Promo T&Cs: `New users only. Limited quantity available.` · `Max savings of $10 per ride.` ·
  `VoIP phone numbers cannot be used to redeem coupons, credits, discounts, or other promotions.` ·
  `Cannot be combined with other offers.`
- Lyft Pink: `Members save an average of $23/month.` · `Cancel up to 3x/month for free` ·
  `Get picked up faster and save $3-4 per ride on average` · `Enjoy 5% off on Extra Comfort and Lyft XL rides`
- Driver SMS consent: `By providing your phone number and clicking "Apply to drive", you consent to receive text messages from Lyft.` + `Text messages may be autodialed, and data rates may apply.`

**Every safety feature carries a geographic bound**, and the bounds are asterisked
inline rather than collected in a page-foot block. `While RapidSOS Live Agent is
not available in Puerto Rico, the 911 feature is still available.` is the model:
it names the gap and then names what survives it, so the excluded user learns what
they still have rather than only what they lack.

## T11 Help-centre architecture

Two parallel trees, six sections for riders and seven for drivers, with duplicated
section *names* resolving to different section IDs.

**Rider tree — `Riding with Lyft`** `[observed]`: `Taking rides` ·
`Charges and payment methods` · `Rewards and partnerships` · `Profile and account` ·
`Using the app` · `Safety, policies, and accessibility`

**Driver tree — `Driving with Lyft`** `[observed]`: `Driving basics` ·
`Driving requirements` · `Earnings and bonuses` · `Express Drive rental program` ·
`Airport info for drivers` · `Profile and account` · `Using the app` ·
`Safety, policies, and accessibility`

The driver tree adds three sections with no rider counterpart
(`Driving requirements`, `Express Drive rental program`, `Airport info for
drivers`) and the rider tree adds one (`Rewards and partnerships`, with 14
articles, mostly credit-card and airline partnerships). **The rider's extra
section is commercial; the driver's extras are operational.**

**Article-title grammar — four shapes** `[observed]`

| Shape | Example |
|---|---|
| `How to …` | `How to request a ride` · `How to tip your driver` · `How to apply to become a driver` |
| Bare noun / gerund topic | `Charges and fees` · `Ride types` · `Deactivations` · `Acceptance rate` |
| `I <did/experienced X>` | `I left my phone in a vehicle` · `I was charged a damage fee` · `I canceled the ride` · `I got a warning for too many cancels` |
| Imperative / procedural | `Report an accident or collision` · `Set up bank and tax info` · `Protect your personal info` |

The first-person `I …` cluster is the strongest. `I got a warning for too many
cancels` is the model driver title — it names the notification the driver just
received, in the driver's words, including the colloquial clipping of
"cancellations" to `cancels`.

**Cross-audience defects recorded** `[observed]`

- `Ride issues` exists twice (rider `4177377071` / driver `6575764617`) with
  **zero shared articles** — the same section name leads to entirely different content
- `Safety guidelines and policies` exists twice with **six of nine articles
  shared**; the rider version adds `Rider policies for Lyft rides`,
  `PIN verification for riders`, `Safety info for riders`; the driver version adds
  `Safety info for drivers`, `Keeping passengers safe`, `PIN Verification`
- **One article ID, two titles**: `Sharing your ride location with friends and
  family` (rider) and `Sharing your driving location with friends and family`
  (driver) both point to article `360037644574`. The *title* is audience-tuned
  while the *body* is shared — an elegant compromise, and the only instance of it
- **Internal shorthand leaking into public URLs**: help links include
  `/click/dax-help-center` and `/click/pax-help-center` — `DAX` and `PAX` are
  internal terms for driver and passenger, visible in the href

## T12 FAQs

**Women+ Connect** `[observed]` (https://www.lyft.com/women+) — questions verbatim;
**answers are in collapsed accordions and did not render**.

| # | Question (verbatim) |
|---|---|
| 1 | How does Women+ Connect work? |
| 2 | How much will this increase the likelihood of being matched with a woman rider or driver? |
| 3 | Will women and nonbinary riders have to wait longer to get picked up if there aren't enough women drivers? |
| 4 | What if my rider/driver isn't a woman? |
| 5 | Where is this feature available today? |
| 6 | How do I update my gender? |
| 7 | For drivers: How do I turn Women+ Connect on? |
| 8 | For drivers: Is there any limit to how often I can turn it on or off? |
| 9 | What does this mean for men drivers? |

Two structural notes. **Q7 and Q8 are prefixed `For drivers:`** — audience routing
inside a question string, on a page that serves both. And Q2, Q3 and Q9 are the
sceptical questions: the *limits* of the feature, the *cost* to the people it
serves, and the *effect on the excluded group*. A feature FAQ that asks
`What does this mean for men drivers?` is pre-empting the objection rather than
waiting for it.

A second block carries the H2 `Gender FAQ, with answers from the Human Rights
Campaign`: `Is this feature inclusive of transgender people?` ·
`Is this feature inclusive of nonbinary people?` · `What about pronouns?` ·
`How will Lyft verify gender or prevent someone from falsely changing their gender?`

**Attributing the answers to a named external body in the heading itself** is the
reusable move. Lyft is not the credible voice on these four questions and says so
in the H2.

**ADT FAQ** `[documented]` (#29), answers in one clause each:
`What is ADT Emergency Help Video?` (ADT views a live phone-camera stream during
an Emergency Help request) · `Who is ADT?` (third-party security provider) ·
`Can I get help without video?` (ADT calls and stays connected without video) ·
`What happens to the recording?` (ADT stores it; Lyft cannot release it)

`Can I get help without video?` is the question a frightened user would actually
ask about a camera-based safety feature, and it is answered yes.

**Section-header questions used as FAQ** `[observed]`:
`Can I request a specific car?` (no — ride types instead) ·
`Where is Express Drive available?` · `I'm unable to request a ride` ·
`I got a warning for too many cancels` · `Why do deactivations occur?` ·
`I see a ride marked 'Lost Item'` · `Charged for a ride I canceled` ·
`What if these guidelines aren't for me?`

## T13 Terminology & glossary

**Ride types — the canonical taxonomy** `[documented]` (#26), grouped
`Economy` / `Premium` / `Other types`

| Group | Names and definitions |
|---|---|
| `Economy` | `Standard` ("Standard car for up to 4 riders.") · `Wait & Save` (`Lock in a lower price when it's busy`) · `Priority Pickup` ("Get a faster pickup at a slightly higher price.") · `Green` (EV or hybrid) |
| `Premium` | `Extra Comfort` ("newer, roomier vehicles with top-rated drivers") · `Black` (up to 4) · `Black SUV` (up to 6) · `XL` ("up to 6 passengers in vehicles with at least 7 seatbelts") · `XXL` (`4-6 checked suitcases`) |
| `Other` | `Scooter` · `Bikes` · `Car Seat` (NYC only) · `Access` (WAV) · `Lyft Assisted` · `Silver Select` (`7 minute wait time`) · `Pet rides` ("one well-behaved animal") · `Minnie Van` (Walt Disney World, "distinctive polka-dotted vehicles") |

**Every tier name states the trade-off it embodies.** `Wait & Save` is the model:
two words, both of which are the deal. `Priority Pickup` is priced
("at a slightly higher price") in its own definition. `XXL` is defined by luggage
count rather than seat count, because that is what distinguishes it from `XL`.

**`Extra Comfort` names a driver quality (`top-rated drivers`) as a product
attribute** — the only tier where the person, not the vehicle, is part of the spec.

**Two live renames, both incomplete** `[observed]`

1. `Access` → `Wheelchair`. #30 states: `We offer access to WAV rides through a
   ride type called 'Wheelchair'.` and `Note: 'Wheelchair' was formerly known as
   'Access.'` **But #26 still lists the mode as `Access`.** Two Lyft pages disagree
   on the current name of the same product, and the page that flags the rename is
   not the page that needs updating.
2. `ride modes` → `ride types`, and `passenger` → `rider` (see T6). Slugs lag H1s
   across the estate.

Recording both is useful: they show what an in-flight terminology migration
actually looks like on a live estate — the user-facing string changes first, the
URL never does, and one page out of two gets the memo.

**Safety feature names** `[observed]`: `Smart Trip Check-In` · `Scheduled Check-In` ·
`Location Sharing` · `Ride Recording` (umbrella for `Audio Recording` +
`Video Recording`) · `Pin Verification` / `PIN Verification` (**cased two ways in
one sentence**) · `Emergency Contacts` · `trusted contacts` · `Lyft Safety Hub` ·
`Get emergency help` · `Rider Verification` · `Smooth Cruiser` ·
`Community Safety Education program` · `Safety Advisory Council` ·
`Favorite a driver` · `Block a driver` · `Worry-free safety cancels` ·
`Two-way rating system` · `Safety 101` · `Learning Center` · `smart navigation`

**Programs and commercial** `[observed]`: `Lyft Pink` · `Lyft Cash` · `Lyft Pass` ·
`Lyft Cash Rewards` · `Lyft Silver` · `Lyft Teen` · `Lyft Family` ·
`Lyft Up` / `LyftUp` (**both spellings in use** — `Lyft Up` in the footer,
`Learn more about LyftUp` as a CTA) · `Lyft Rewards` · `Women+ Connect` ·
`Express Drive` · `Express Pay` · `Lyft Direct` · `Upfront Pay` · `Rate Card` ·
`Price lock` · `Round Up & Donate` · `Amp` · `Glow` · `Ride Streaks` ·
`Acceptance rate` · `Driving History` · `Waybill` · `Airport FIFO` · `Flexdrive` ·
`the Hub` · `New driver welcome kit` · `Driver accomplishment letters` ·
`Business Profile` · `Concierge`

`Driver accomplishment letters` is a quiet, excellent coinage — a document a
driver can use outside the platform (for a visa, a loan, a job), named for what it
does for them rather than for what it proves to Lyft.

**Audience nouns**: `rider` (rider-facing and marketing) · `passenger`
(driver-facing and legacy slugs) · `driver` · `DAX` / `PAX` (internal shorthand,
visible only in help-link URLs).

## T14 Voice, tone & accessibility

**Register per audience, with the gradient stated** `[observed]`

| Register | Evidence |
|---|---|
| **Rider marketing** — short, aspirational, slangy, fragments and ampersands | `Got plans? We got you.` · `Places to be, people to see` · `The world awaits` · `Your ride, refined` |
| **Driver marketing** — transactional, imperative, money-forward | `Make every day payday` · `Shift into earnings mode` · `No waiting, just earning` |
| **Safety (both)** — warm and institutional; the warmest content Lyft publishes | `Real help from real humans` · `we'll reach out after your ride and make sure you're alright` · `We've got your back on every drive` |
| **Help, rider** — neutral procedural, money reassurance first | `We'll never charge you this amount.` |
| **Help, driver** — conditional-legal, consequence-bearing | `You'll be paid… as long as you:` · `you won't be eligible` · `uphold` / `overturn` |

**The gradient runs: marketing (warm) → safety (warm + institutional) → help/rider
(neutral procedural) → help/driver (conditional, consequence-bearing).** Drivers
receive numbered procedures and eligibility gates; riders receive explanations and
refunds. Drivers get warnings, suspensions, deactivations, ratings and acceptance
rates — **riders encounter none of that vocabulary on any public page.**

**The clearest single tone artefact** `[observed]`, on the Community Guidelines:

> Section header: `What if these guidelines aren't for me?`
> Opening: `We get it. Some of these guidelines aren't for everyone.`
> Closing (repeated verbatim on four pages): `Anyone who doesn't take these
> guidelines — and Lyft's Terms of Service — seriously may be permanently removed
> from the Lyft platform.`

A casual concession and a permanent-removal warning in the same paragraph. The
soft opener earns the reader's attention for the hard close, and the hard close is
not softened at all. This is the register gradient compressed into two sentences.

The three Community Guidelines principles are stated bare and unelaborated:
`Always choose kindness` · `Put safety first` · `Do your part`.

### Accessibility

**The accessibility statement is the thinnest page in the harvest** `[observed]`
(https://www.lyft.com/accessibility). Two italicised sentences plus a date:
`Lyft strives to create an inclusive environment, which includes making our
websites accessible to all.` and a pointer to the `Accessibility Feedback Form.`
Dated `Updated date: December 10th, 2025`.

**No WCAG level. No conformance claim. No standard cited. No contact address. No
known-limitations section.** For a company whose safety content is as considered
as Lyft's, and which publishes four dedicated screen-reader help articles, the
statement page is a striking omission. Compare KAYAK (WCAG 2.2, EN 301 549,
three pillars, named testing stack) and Uber (six principles, WCAG 2.1 AA).

**But the operational accessibility content is strong** `[observed]`

Four dedicated screen-reader articles, verbatim titles:
`Using Google TalkBack to request a ride` ·
`Using VoiceOver in iOS to request a ride` ·
`Using Google TalkBack to create an account or log back in` ·
`Using VoiceOver in iOS to create an account or log back in`

Plus `Accessibility in the Lyft app and website`,
`Lyft's commitment to accessibility`, and an
`Accessibility and anti-discrimination` section in **both** audience trees.

Splitting by platform *and* by task (request a ride vs create an account) gives
four narrow articles rather than one broad one — the right call, because the
gesture sequences genuinely differ.

**WAV and disability content** `[documented]` (#25, #30)

- Enable path given as three taps: `Open the Lyft app menu` → `Tap 'Settings'` → `Tap 'Wheelchair access'`
- Available in 10 named regions, listed in full
- Fallback: `If you don't see your city listed, we'll help you find accessible
  transit nearby.` — followed by a **manually curated directory of third-party
  operators across ~40 US states, 4 Canadian provinces and Puerto Rico**
- `Read more about our foldable wheelchair policy.` — foldable devices need no special ride type
- Wait-time waiver with retroactive refunds (see T10)
- Cancellation protection if a non-WAV vehicle is dispatched:
  `If you're charged a cancellation fee, contact us using the form below.`
- Service animals: `Drivers are required by law and Lyft's policy to accommodate
  passengers with service animals even if they don't request a Pet ride`

The hand-curated competitor directory is the standout. Lyft maintains a list of
other companies' accessible-transport services, by region, on its own help page.
That is expensive content ops in service of users it cannot serve, and it is the
clearest evidence in this corpus of an accessibility commitment expressed as work
rather than as a statement.

**Accessibility mechanics** `[observed]`

- Skip links: `Skip to main content` (www.lyft.com) and `Skip to Content`
  (help.lyft.com) — **two strings across two properties**
- Help articles use a consistent `Skip to:` in-page nav plus repeated `Back to top` anchors
- **Alt text on marketing imagery is descriptive and scene-level**:
  "Smiling older woman with a yellow scarf leans into a car, holding a tote bag,
  while a man looks back at her." · "Two men smile as one helps the other, who
  uses a cane, get into a white car on a city street near a blue sign." ·
  "Lyft app screen showing route map, ride options with prices, and a highlighted
  Standard ride for $14.61."
- **Alt text is absent on every safety-page product screenshot** (`/safety`,
  `/safety/rider`, `/safety/driver`) — all UI screenshots render with empty alt.
  **The pages that explain safety features do not describe those features'
  screenshots to screen readers.** Exactly the population most likely to depend on
  the safety toolkit is least served by the page describing it.

### Negative findings, consolidated

1. `*Availability of bikes, scooters, and ide types varies by region.` — typo
   `ide` on the homepage, corrected on `/rider`
2. `Tap the shield icon on the lower left side of the screen.` vs
   `Tap the shield icon on the lower right side of the screen.` — **contradictory
   within one article** (#29), and it is the emergency-help entry point
3. `Passenger is no-show` vs `Passenger didn't show up` — two button strings for
   one action within one article
4. `Pin Verification` vs `PIN Verification` — inconsistent casing within a single sentence
5. `Access` (#26) vs `Wheelchair` (#30) — two pages name one ride type differently
6. `Lyft Up` (footer) vs `LyftUp` (CTA)
7. Duplicated sentence in #22: `You'll also still receive a ride receipt after each
   ride.` appears twice consecutively
8. `Under 'Account, select 'Ride history'` — unbalanced quote mark, **copy-pasted
   into both #20 and #22**
9. An anchor on #30 labelled `Anti-Discrimination Policies` points at the WAV
   article's own ID — a self-referential link
10. A phone number rendered as a help.lyft.com URL rather than a `tel:` link (#30)
11. `Skip to main content` vs `Skip to Content` across properties
12. `Support & Safety` vs `Support and Safety` — the same driver menu named two ways
13. Footer headings duplicate in rendered output (`## Driver` / `## Driver`) —
    likely a mobile/desktop dual-render leaking both copies
14. No consumer-rider deactivation article, despite deactivation being listed as a
    ride-request error cause

**Defect 2 is the serious one.** The left/right contradiction is in the
instruction for reaching emergency help, in the driver safety article, and both
versions appear four paragraphs apart in the same document.

## Safety content — dedicated section

### Named features, with framing and audience

| Feature | Definition (verbatim, trimmed) | Audience | Framing |
|---|---|---|---|
| `Location Sharing` | `Add your trusted contacts to your safety settings` | Both | User-initiated, opt-in |
| `Ride Recording` | `Record audio or video in the Lyft app for added security` | Both | Privacy-forward: "recordings stay private unless you choose to share them" |
| `Scheduled Check-In` | `Schedule a check-in from Lyft to confirm you got to your destination safely.` | **Rider only** | Caring, post-ride |
| `Smart Trip Check-In` | contacts you on `unusual activity, such as mid-ride cancellations or long stops` | Both | Proactive, system-initiated |
| `Pin Verification` | `Verify your rider or driver before the ride starts.` | Both | Mutual, opt-in |
| `Emergency Contacts` | `Add trusted contacts who will be notified if you're ever unable to do so yourself.` | **Driver only** | Presupposes incapacitation |
| `Favorite a driver` | "we'll try to match you with them again for future scheduled rides" | **Rider only** | Positive selection |
| `Block a driver` | `You can block a driver to ensure you'll never be matched with them again.` | **Rider only** | Negative selection |
| `Rider Verification` | "see a rider's name, verification status, rating, and profile photo before you accept" | **Driver only** | Pre-acceptance information |
| `Smooth Cruiser` | "weekly reports and real-time feedback to help drivers adopt safer driving habits" | Both | To rider: surveillance-as-benefit. To driver: coaching |
| `Worry-free safety cancels` | `your acceptance and cancellation rate won't be affected` | **Driver only** | Removes the economic penalty for acting on safety |
| `Two-way rating system` | rate `on a scale of 1–5 stars, 5 being the best` | Driver page | Mutual accountability |
| `Lyft Safety Hub` | `always just a few taps away` | Both | The container |

**Toolkit asymmetry.** Riders get six tools; drivers get four. **Riders get
curation controls over who they travel with (`Favorite a driver`, `Block a
driver`); drivers get `Emergency Contacts` — the only feature on either page that
presupposes the user may be unable to act for themselves.** The feature sets
encode the two different threat models exactly, and `Add trusted contacts who will
be notified if you're ever unable to do so yourself` is the gravest sentence in
the harvest, written for the audience that receives no safety messaging on its own
landing page.

**`Worry-free safety cancels` is the best-designed safety feature name in the
corpus.** It solves a problem the copy does not have to state: a driver who
cancels for safety reasons would otherwise be penalised on acceptance and
cancellation rate, which means the scoring system would be quietly discouraging
safe behaviour. The feature removes the penalty; the name front-loads the
reassurance (`Worry-free`) rather than the mechanism.

### Emergency assistance labels `[documented]`

- In-app CTA: `Get emergency help` — **identical string, both audiences**
- Rider entry path: `Navigate to your Safety tool in-ride panel`
- Driver entry path: `Tap the shield icon on the lower left side of the screen.`
  — contradicted four paragraphs later by `…lower right side…` (defect 2 above)
- ADT escalation: `Tap 'Get emergency help' to alert ADT. They'll call you for more
  info.` then `If you don't answer, ADT contacts 911 to provide your location details.`
- RapidSOS (Canada pilot): `Call RapidSOS` / `Text with RapidSOS`
- `ADT Emergency Help Video` — "ADT can use your phone's cameras to observe a live
  stream video when you request Emergency Help."
- Direct 911: `In an emergency, you can reach 911 right from the app.`
- **Article-top interrupt**: `If this is an emergency, call 911.` placed **above
  all other content** on the incident-reporting article and repeated at the head of
  both safety-info articles.

`If you don't answer, ADT contacts 911 to provide your location details.` is the
most important sentence on either safety page. It tells the user what happens in
the case where they *cannot* respond — the case the feature exists for — and
names the escalation without requiring any further action.

Placing `If this is an emergency, call 911.` above the fold of a reporting
article, rather than as a footnote, correctly assumes some readers have arrived
mid-crisis and are in the wrong place.

### Incident reporting `[observed]`

`Report a safety incident or citation` (shared title) ·
`Report an accident or collision` · `Report a citation` (driver-only, requires
`a photo of the front and back of your citation`) ·
`How to report damage caused by passengers` (driver-only) ·
`Submit feedback on driver` and `Dispute ride fare or charges` (rider self-serve).

Availability promise, identical in both articles:
`Our Safety Team is available 24 hours a day, 7 days a week.`
Accident definition: `Vehicle collisions` / `A vehicle striking an object or
person` / `Vehicle damage to third-party property`.

### The cleanest symmetry artefact in the corpus `[documented]`

| Rider version (#5) | Driver version (#6) |
|---|---|
| `If you rate your driver three stars or fewer and select 'safety' as a feedback reason, you won't be matched with them again.` | `If you rate your rider three stars or fewer and select 'safety' as a feedback reason, you won't be matched with them again.` |

**One sentence, subject swapped, everything else identical.** The driver version
adds `you can block a passenger anytime after your ride so you never match again.`

This is what a genuinely symmetric policy looks like in copy: the same threshold,
the same trigger, the same consequence, the same words. It is the exception that
proves how deliberate the asymmetries elsewhere are.

### Background checks and education `[observed]`

- `Every driver completes verification, background checks, and mandatory safety education before driving with Lyft.`
- `All drivers need to pass a background check before they can drive with Lyft. After that, we continue to run yearly background checks.`
- `We also constantly monitor for criminal convictions and whenever necessary, we
  deactivate drivers so they no longer drive with Lyft.` — **the bluntest sentence
  on any rider-facing safety page**, and it is blunt in the right direction: it
  states the consequence rather than the process
- `Community Safety Education program` — `All Lyft drivers are required to complete
  this program to continue giving rides.` Partner named: `It's On Us`. New York
  drivers are paid `$15 per hour or the applicable minimum wage, whichever is
  higher` for up to one hour
- Driver tutorials cover `communication techniques, de-escalation strategies, and trafficking prevention`

### Driver protective guidance `[documented]` (#29, developed with NOBLE)

`Put your safety first.` · `Stay aware and alert.` ·
`Start each ride by confirming your rider's name.` ·
`Use de-escalation techniques to support you.` ·
`Secure your vehicle and keep your valuables with you.` ·
`Keep moving between rides.` · `Park with safety in mind.`

And, critically: `trust your gut` and `Follow your instincts and leave the area`.
**Lyft explicitly authorises the driver to abandon a situation** — which, paired
with `Worry-free safety cancels` removing the scoring penalty, means the
permission and the mechanism are both in place. Copy and product agreeing is rarer
than it should be.

### Privacy framed as safety `[observed]`

| Rider (#5) | Driver (#6) |
|---|---|
| `Your driver sees a nearby pin for pickup — but never your exact address or location`; saved addresses `remain private and visible only to you` | `Your phone number stays anonymized and is never shared.` |

**Riders are protected from location exposure; drivers from contact exposure.**
Each audience is told about the disclosure risk that actually applies to them,
and neither page mentions the other's.

---

## Transferable patterns

1. **`Always-on` vs `Customizable` as the organising axis for protection.**
   Three safety pages, one structure, audience-tuned subheads. It lets a company
   claim credit for invisible work while leaving the user visibly in control. The
   most portable framing in this file.
2. **Name the tier for the trade-off, not the tier.** `Wait & Save`,
   `Priority Pickup`. Two words that are the whole deal. Compare `Standard`,
   which tells the user nothing.
3. **Publish the causes of an opaque error before it happens.** The five-item
   `You may receive an error message… if the following applies:` list turns a dead
   end into a self-diagnosis, including the honest `Connectivity issues within the
   app or your smartphone`.
4. **Put a counterweight sentence inside a punitive process.**
   `Lyft actively reviews for suspicious or fraudulent rider reporting.` inside the
   deactivation article changes how the whole page reads, at a cost of one sentence.
5. **Remove the scoring penalty for the behaviour you say you want.**
   `Worry-free safety cancels` — `your acceptance and cancellation rate won't be
   affected`. If your metrics punish the safe action, no amount of safety copy will
   produce it.
6. **Attribute the answer when you are not the credible voice.**
   `Gender FAQ, with answers from the Human Rights Campaign` — attribution in the
   heading, before the reader decides whether to trust the content.
7. **Split screen-reader guidance by platform and by task.** Four narrow articles
   (TalkBack/VoiceOver × request/sign-in) rather than one broad one, because the
   gesture sequences genuinely differ.
8. **Route the user off-platform when you cannot serve them.** The hand-curated
   WAV operator directory across ~40 states. An accessibility commitment expressed
   as maintained content rather than as a statement.
9. **Tell the user what happens when they cannot respond.**
   `If you don't answer, ADT contacts 911 to provide your location details.`
   Emergency features must document the no-response branch, because that is the
   branch they exist for.
10. **Negative lesson — do not let a rename reach one audience only.** `passenger`
    → `rider` landed in rider-facing copy and stopped at the driver boundary, so
    the two sides of the marketplace now use different words for the same person.
11. **Negative lesson — do not unname a mechanism you still operate.** Retiring
    `Prime Time` removed the user's ability to search for, ask about, or complain
    about dynamic pricing. The behaviour remains; the vocabulary does not.
12. **Negative lesson — the safety pages had no alt text on their screenshots.**
    The population most dependent on the safety toolkit is the one least served by
    the page explaining it. Audit accessibility content for accessibility.

## Caveats & gaps

- **All ride-state strings are `[documented]`, not `[observed]`.** Every entry in
  T6 is quoted inside a help article describing the app. Lyft's live ride-state UI
  sits behind auth and no public page renders it. `Arrive`, `Pick up`,
  `Confirm no-show`, `Confirm and request` are high-confidence but second-hand.
- **Women+ Connect FAQ answers were not retrieved** — accordion content is injected
  client-side. The nine questions are verbatim; no answer is recorded.
- **No empty-state copy exists on any public page.** T8 is genuinely `[absent]`,
  and the unavailability strings recorded there are a substitute, not the thing.
- **No take-rate disclosure was found.** Lyft publishes the fee firewall
  (`These fees don't impact the amount you earn`) but no equivalent of Uber's
  `Amount Uber keeps`. Looked for, not found.
- **No consumer-rider deactivation content.** Rider deactivation is named as an
  error cause but has no public article outside the Business tree.
- **`Lyft Silver` has a dedicated page (`/rider/silver`) that was not fetched.**
  Older-adult ride content in this file comes from the rider landing page and the
  ride-type taxonomy only.
- **The full 12-mode ride taxonomy appears only in the help centre.** The public
  carousel on the homepage and rider page shows five (`Wait & Save`, `Standard`,
  `Priority Pickup`, `Extra Comfort`, `XL`). `Lyft Assisted`, `Access`/`Wheelchair`
  and `Silver Select` are not merchandised on the marketing surface at all.
- **`https://help.lyft.com/hc/en-us/rider` and `/driver` are not browsable landing
  pages** — those segments exist only as redirect targets.
- **Locale is en-US.** Canadian carve-outs are quoted where Lyft states them, but
  no Canadian or French-language surface was inspected.
- **Bikes, Scooters, Healthcare, Autonomous and the Business/Concierge trees were
  not harvested** — only the core rides marketplace and safety estate.
- **Mobile app store listings and in-app copy not harvested.**
- Help articles carry no visible publication or update dates; the accessibility
  statement is the only dated page (`December 10th, 2025`).

## Sources

1. https://www.lyft.com/
2. https://www.lyft.com/rider
3. https://www.lyft.com/driver
4. https://www.lyft.com/safety
5. https://www.lyft.com/safety/rider
6. https://www.lyft.com/safety/driver
7. https://www.lyft.com/safety/community-guidelines
8. https://www.lyft.com/women+
9. https://www.lyft.com/accessibility
10. https://help.lyft.com/hc/en-us
11. https://help.lyft.com/hc/en-us/categories/2872191865-riding-with-lyft
12. https://help.lyft.com/hc/en-us/categories/4103285858-driving-with-lyft
13. https://help.lyft.com/hc/en-us/sections/4177377071-ride-issues
14. https://help.lyft.com/hc/en-us/sections/6575764617-ride-issues
15. https://help.lyft.com/hc/en-us/sections/3387177978-charges-and-fees
16. https://help.lyft.com/hc/en-us/sections/5416175501-giving-a-ride
17. https://help.lyft.com/hc/en-us/sections/9369125120-ride-types
18. https://help.lyft.com/hc/en-us/sections/4611287758-safety-guidelines-and-policies
19. https://help.lyft.com/hc/en-us/sections/9222429287-safety-guidelines-and-policies
20. https://help.lyft.com/hc/en-us/articles/115012922687-Cancellation-policy-for-passengers
21. https://help.lyft.com/hc/en-us/articles/115012922847-Cancellation-and-no-show-fee-policy-for-drivers
22. https://help.lyft.com/hc/en-us/articles/115012925707
23. https://help.lyft.com/hc/en-us/articles/115013080008-How-and-when-driver-pay-is-calculated
24. https://help.lyft.com/hc/en-us/articles/115013077888-Report-a-safety-incident-or-citation
25. https://help.lyft.com/hc/en-us/rider/articles/4648302623-Wait-time-fees
26. https://help.lyft.com/hc/en-us/articles/115012927427-Lyft-ride-modes-overview
27. https://help.lyft.com/hc/en-us/articles/115013079988-How-to-request-a-ride
28. https://help.lyft.com/hc/en-us/articles/7229653855-Safety-info-for-riders
29. https://help.lyft.com/hc/en-us/articles/115012927647-Safety-info-for-drivers
30. https://help.lyft.com/hc/en-us/articles/115013081668-wav-rides
31. https://help.lyft.com/hc/en-us/articles/115012922987-Lost-found-for-passengers
32. https://help.lyft.com/hc/en-us/articles/115013079968-Lost-found-for-drivers
33. https://help.lyft.com/hc/en-us/all/articles/7366276697-Deactivations
34. https://help.lyft.com/hc/en-us/all/articles/5354487457-Appealing-permanent-deactivations

**Blocked: none.**
